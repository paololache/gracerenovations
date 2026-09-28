# Google reviews API on Google Cloud

This sets up a small HTTP function on Google Cloud (Cloud Run functions) that returns the business's real Google rating and reviews to the website. The Places API key stays in **Secret Manager**: the function reads it on the server, and the browser only ever sees the reviews.

```
Browser ──GET──▶ Cloud Run function (server/google-reviews) ──▶ Places API (New)
                     └── PLACES_API_KEY from Secret Manager
```

Time needed: about 20 minutes.

---

## 0. Before you start

You need:

- The `gcloud` CLI, logged in: `gcloud auth login`
- A Google Cloud project with billing enabled
- The Places API key already stored in Secret Manager
- The business's **verified Google Business Profile** (that is where the reviews come from)

Set these once in your terminal. Every command below uses them.

```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"            # any Cloud Run region near your visitors
export SECRET_NAME="places-api-key"    # the name of your existing secret
export SITE_ORIGINS="https://gracebuildingco.com,http://localhost:5173"

gcloud config set project "$PROJECT_ID"
```

`SITE_ORIGINS` lists the websites allowed to call the function: your live domain, plus the local dev server. Use the exact origin, with no trailing slash.

## 1. Turn on the Google Cloud services

```bash
gcloud services enable \
  places.googleapis.com \
  secretmanager.googleapis.com \
  cloudfunctions.googleapis.com \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com
```

## 2. Check the API key's restrictions

In the console, go to **APIs & Services → Credentials** and open the key that is stored in your secret.

- **API restrictions:** set it to *Restrict key*, then tick only **Places API (New)**.
- **Application restrictions:** leave it on *None*. The key is only used from the server, and Cloud Run has no fixed IP to restrict to.

Use this key for this function only. Never put it in the website's code or its `.env` files.

## 3. Check the secret

Confirm the secret exists and has an enabled version:

```bash
gcloud secrets versions list "$SECRET_NAME"
```

If you still need to create it:

```bash
printf '%s' 'PASTE_THE_API_KEY' | gcloud secrets create "$SECRET_NAME" --data-file=-
```

(`printf` without `\n` avoids storing a trailing newline in the key.)

## 4. Find the business's Place ID

This uses the key from the secret without saving it anywhere. Change the search text to the business name and town as they appear on Google Maps.

```bash
curl -s -X POST "https://places.googleapis.com/v1/places:searchText" \
  -H "Content-Type: application/json" \
  -H "X-Goog-Api-Key: $(gcloud secrets versions access latest --secret="$SECRET_NAME")" \
  -H "X-Goog-FieldMask: places.id,places.displayName,places.formattedAddress,places.userRatingCount" \
  -d '{"textQuery": "Grace Building Co, Millbrook"}'
```

Pick the result whose name, address and review count match your profile, then save its `id`:

```bash
export PLACE_ID="ChIJ..."   # the id from the result
```

You can also use Google's [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id) page.

## 5. Create a service account for the function

The function runs as its own account, and that account can read this one secret and nothing else.

```bash
gcloud iam service-accounts create reviews-fn \
  --display-name="Google reviews function"

gcloud secrets add-iam-policy-binding "$SECRET_NAME" \
  --member="serviceAccount:reviews-fn@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

## 6. Deploy the function

Run this from the repository root. The `^;^` prefix makes `;` the separator between variables, because `SITE_ORIGINS` itself contains commas.

```bash
gcloud functions deploy google-reviews \
  --gen2 \
  --runtime=nodejs22 \
  --region="$REGION" \
  --source=server/google-reviews \
  --entry-point=googleReviews \
  --trigger-http \
  --allow-unauthenticated \
  --service-account="reviews-fn@${PROJECT_ID}.iam.gserviceaccount.com" \
  --set-secrets="PLACES_API_KEY=${SECRET_NAME}:latest" \
  --set-env-vars="^;^PLACE_ID=${PLACE_ID};ALLOWED_ORIGINS=${SITE_ORIGINS}" \
  --memory=256Mi \
  --max-instances=3
```

What the flags do:

- `--allow-unauthenticated`: the website's visitors can call the function without logging in. It only returns public review data.
- `--set-secrets`: mounts the secret as the `PLACES_API_KEY` environment variable. The key never appears in the code or the deploy logs.
- `--max-instances=3`: caps how many copies can run at once, which also caps your Places API spend (see step 9).

Get the function's URL:

```bash
export REVIEWS_URL="$(gcloud functions describe google-reviews --gen2 --region="$REGION" \
  --format='value(serviceConfig.uri)')"
echo "$REVIEWS_URL"
```

## 7. Test it

```bash
curl -s "$REVIEWS_URL" | head -c 600; echo
```

You should see JSON with `rating`, `total` and a `reviews` list.

Then check that your site's origin is allowed:

```bash
curl -s -o /dev/null -D - -H "Origin: https://gracebuildingco.com" "$REVIEWS_URL" | grep -i access-control
```

It should print `access-control-allow-origin: https://gracebuildingco.com`. An origin that is not in the list gets no such header, so browsers on other sites cannot read the response.

## 8. Connect the website

In `app/.env.local` (for local development):

```bash
VITE_GOOGLE_REVIEWS_ENDPOINT=https://...the REVIEWS_URL from step 6...
```

Then restart `npm run dev`.

On your hosting provider, set the same `VITE_GOOGLE_REVIEWS_ENDPOINT` variable in its build settings and rebuild. Vite writes this value into the site when it builds, so changing it always needs a new build.

Leave `VITE_GOOGLE_MAPS_API_KEY` and `VITE_GOOGLE_PLACE_ID` empty. Those are only for the browser-only fallback, which exposes a key.

The reviews section appears on the Home and Projects pages. If the function is down or returns an error, the section hides itself.

## 9. Keep the cost under control

Place Details requests that include `reviews` are billed at Google's highest Place Details tier. See the [Places API pricing page](https://developers.google.com/maps/billing-and-pricing/pricing) for current rates and the free monthly allowance.

The function limits calls in two ways:

- **5-minute cache:** each running instance asks Google at most once every 5 minutes.
- **`--max-instances=3`:** at most 3 instances run at once. That works out to roughly 900 Places calls a day at most, however much traffic the site gets.

Also set these two limits in the console:

1. **Quota cap:** go to **APIs & Services → Places API (New) → Quotas & System Limits** and set a daily limit for Place Details requests, for example 1,000.
2. **Budget alert:** go to **Billing → Budgets & alerts** and create a budget on the project with an email alert.

## 10. Day-to-day

**Rotating the key.** Add a new secret version, then redeploy so running instances pick it up. `:latest` is only read when an instance starts.

```bash
printf '%s' 'NEW_KEY' | gcloud secrets versions add "$SECRET_NAME" --data-file=-
# re-run the deploy command from step 6
gcloud secrets versions disable 1 --secret="$SECRET_NAME"   # old version number
```

**Adding a domain.** Change `SITE_ORIGINS` and re-run the deploy command.

**Logs:**

```bash
gcloud functions logs read google-reviews --gen2 --region="$REGION" --limit=50
```

**Running the function on your machine:**

```bash
cd server/google-reviews
npm install
npm test          # offline test with a fake Google response
PLACES_API_KEY="$(gcloud secrets versions access latest --secret="$SECRET_NAME")" \
PLACE_ID="$PLACE_ID" ALLOWED_ORIGINS="http://localhost:5173" \
npm start         # real call, served on http://localhost:8080
```

## Troubleshooting

| What you see | Likely cause and fix |
|---|---|
| Deploy fails with `Permission denied on secret` | The binding in step 5 is missing, or the secret name is misspelled. Re-run step 5. |
| Deploy fails on `--allow-unauthenticated` | An organization policy (domain-restricted sharing) blocks public access. Ask your org admin for an exception for this service, or put it behind an API Gateway. |
| Deploy fails during the build step | New projects sometimes need Cloud Build permissions. Give the project's default compute service account the **Cloud Build Service Account** role, or follow the link in the error message. |
| The function returns `502` and the log says `Places API 403` | The key is not allowed to call **Places API (New)** (step 2), or that API is not enabled (step 1). |
| The function returns `502` and the log says `Places API 404` or `INVALID_ARGUMENT` | `PLACE_ID` is wrong. Repeat step 4. |
| JSON loads with `curl`, but the section never appears on the site | Your site's origin is not in `ALLOWED_ORIGINS`: check the browser console for a CORS error. Or the site was not rebuilt after setting `VITE_GOOGLE_REVIEWS_ENDPOINT`. |
| Only 5 reviews show | That is the Places API's maximum. More needs the Business Profile API (owner sign-in) or a paid reviews widget. |

## Google's display rules

The site already follows these rules. Keep them if you change the section:

- Show each review's author name, linked to their profile when Google provides a link.
- Say the reviews come from Google.
- Do not edit or shorten the review text. "Read more" collapses the text, but it must not cut any of it.
