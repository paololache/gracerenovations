// Local test with a fake Places API response. Not deployed (see .gcloudignore).
process.env.PLACES_API_KEY = 'fake'
process.env.PLACE_ID = 'ChIJtest'
process.env.ALLOWED_ORIGINS = 'http://localhost:5173'
let calls = 0
globalThis.fetch = async (url, init) => {
  calls++
  if (init.headers['X-Goog-Api-Key'] !== 'fake' || !init.headers['X-Goog-FieldMask'].includes('reviews')) throw new Error('bad headers')
  return new Response(JSON.stringify({
    displayName: { text: 'Test Place' }, rating: 4.8, userRatingCount: 113, googleMapsUri: 'https://maps.google.com/?cid=1',
    reviews: [
      { rating: 5, text: { text: 'Test review' }, relativePublishTimeDescription: '2 months ago', authorAttribution: { displayName: 'A', uri: 'https://x', photoUri: 'https://p' }, googleMapsUri: 'https://r' },
      { rating: 4, relativePublishTimeDescription: 'a year ago', authorAttribution: { displayName: 'No text' } },
    ],
  }), { status: 200 })
}
await import('./index.js')
const { getTestServer } = await import('@google-cloud/functions-framework/testing')
const server = getTestServer('googleReviews')
await new Promise((r) => server.listen(0, r))
const base = `http://localhost:${server.address().port}`
const realFetch = (await import('node:http')).request
const get = (path, headers = {}, method = 'GET') =>
  new Promise((resolve) => {
    const req = realFetch(base + path, { method, headers }, (res) => {
      let body = ''
      res.on('data', (c) => (body += c))
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }))
    })
    req.end()
  })
const a = await get('/', { Origin: 'http://localhost:5173' })
const data = JSON.parse(a.body)
console.log('status', a.status, 'cors', a.headers['access-control-allow-origin'], 'cache', a.headers['cache-control'])
console.log('rating', data.rating, 'total', data.total, 'reviews', data.reviews.length, JSON.stringify(data.reviews[0]))
const b = await get('/', { Origin: 'https://evil.example' })
console.log('other origin cors header:', b.headers['access-control-allow-origin'] ?? 'none')
const c = await get('/', {}, 'POST')
console.log('POST status', c.status, '| Places calls (cache):', calls)
server.close()
