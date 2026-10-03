/** Grace's own job photos, each at 640px and 1280px wide. */
import bathroom from './bathroom-640.webp'
import bathroomLarge from './bathroom-1280.webp'
import bathroom2 from './bathroom-2-640.webp'
import bathroom2Large from './bathroom-2-1280.webp'
import deck from './deck-640.webp'
import deckLarge from './deck-1280.webp'
import deck2 from './deck-2-640.webp'
import deck2Large from './deck-2-1280.webp'
import exterior from './exterior-640.webp'
import exteriorLarge from './exterior-1280.webp'
import heroKitchen from './hero-kitchen-640.webp'
import heroKitchenLarge from './hero-kitchen-1280.webp'
import kitchen from './kitchen-640.webp'
import kitchenLarge from './kitchen-1280.webp'
import painting from './painting-640.webp'
import paintingLarge from './painting-1280.webp'
import roofing from './roofing-640.webp'
import roofing2 from './roofing-2-640.webp'
import roofing2Large from './roofing-2-1280.webp'
import sunroom from './sunroom-640.webp'
import sunroomLarge from './sunroom-1280.webp'
import sunroom2 from './sunroom-2-640.webp'
import sunroom2Large from './sunroom-2-1280.webp'
import truck from './truck-logo-640.webp'
import truckLarge from './truck-logo-1280.webp'

export const localPhotos = {
  bathroom: { small: bathroom, large: bathroomLarge },
  'bathroom-2': { small: bathroom2, large: bathroom2Large },
  deck: { small: deck, large: deckLarge },
  'deck-2': { small: deck2, large: deck2Large },
  exterior: { small: exterior, large: exteriorLarge },
  'hero-kitchen': { small: heroKitchen, large: heroKitchenLarge },
  kitchen: { small: kitchen, large: kitchenLarge },
  painting: { small: painting, large: paintingLarge },
  roofing: { small: roofing, large: roofing },
  'roofing-2': { small: roofing2, large: roofing2Large },
  sunroom: { small: sunroom, large: sunroomLarge },
  'sunroom-2': { small: sunroom2, large: sunroom2Large },
  truck: { small: truck, large: truckLarge },
}

export type LocalPhoto = keyof typeof localPhotos
