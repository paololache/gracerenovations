import type { PhotoRef } from '../components/Photo'

export interface SuccessStory {
  /** Matches a project id in `projects.ts`. */
  projectId: string
  headline: string
  summary: string
  before: {
    photo: PhotoRef
    text: string
    issues: string[]
  }
  after: {
    photo: PhotoRef
    text: string
    results: string[]
  }
  process: {
    photo: PhotoRef
    steps: { title: string; text: string }[]
  }
  proposal: number
  schedule: string
  quote: { text: string; name: string }
}

export const stories: SuccessStory[] = [
  {
    projectId: 'brimfield',
    headline: 'A 1948 colonial cut into dark little rooms, opened back up to the garden.',
    summary:
      'The owners had been quoted twice before and walked away both times when the numbers moved. We gave them a range online, a fixed proposal a week after the visit, and finished $4,500 over it, all of it a skylight they asked for.',
    before: {
      photo: { id: '1517581177682-a085bb7ffb15', alt: 'Interior stripped back to brick and framing during demolition' },
      text: 'A 1970s remodel had boxed the kitchen into the middle of the house. Once the plaster came off, we found undersized joists and wiring from three different decades.',
      issues: [
        'Kitchen with no window and no view of the garden',
        'Rear wall carrying load with no proper header',
        'Mixed knob-and-tube and ungrounded wiring',
        'Original boiler at the end of its life',
      ],
    },
    after: {
      photo: { id: '1600607687939-ce8a6c25118c', alt: 'Open-plan living area with wood feature wall and large windows' },
      text: 'One open floor from front door to garden, with the kitchen moved to the back where the light is. Every system in the house is new and inspected.',
      results: [
        '14-foot opening on an engineered steel beam',
        'Kitchen moved to the garden side with a new skylight',
        'Full rewire, new plumbing and a high-efficiency boiler',
        'Family stayed in the upstairs rooms throughout',
      ],
    },
    process: {
      photo: { id: '1591588582259-e675bd2e6088', alt: 'Crew in hard hats reviewing work under scaffolding inside a gutted building' },
      steps: [
        { title: 'Structure first', text: 'Engineer on site on day three, temporary walls in, beam set in week two.' },
        { title: 'Systems in the open', text: 'Wiring, plumbing and heating all replaced while the walls were open, inspected before closing.' },
        { title: 'Phased finishes', text: 'Ground floor finished room by room so the family always had a way to the stairs.' },
      ],
    },
    proposal: 209500,
    schedule: 'Finished on the scheduled week',
    quote: {
      text: 'We had two quotes before theirs that grew every time we asked a question. Grace gave us one number and we paid it, plus the skylight we added.',
      name: 'Helen and Mark Ostrowski',
    },
  },
  {
    projectId: 'oak-street',
    headline: 'A closed galley kitchen turned into the room everyone ends up in.',
    summary:
      'A wall, a soffit full of ductwork and forty-year-old wiring stood between the owners and an island. Six weeks later they had it, and the final invoice matched the proposal to the dollar.',
    before: {
      photo: { id: '1618832515490-e181c4794a45', alt: 'Kitchen under renovation with cabinets wrapped in protective plastic' },
      text: 'The kitchen was a narrow corridor with counters on both sides. A soffit hid ductwork that had to move before the wall could come out.',
      issues: [
        'Wall between kitchen and dining room',
        'Two-prong outlets and a 60-amp subpanel',
        'Ductwork boxed into a low soffit',
        'Four feet of usable counter space',
      ],
    },
    after: {
      photo: { id: '1600585152220-90363fe7e115', alt: 'White kitchen island with oak stools and black pendant lights' },
      text: 'An island that seats four, full-height cabinets and lighting that works at night. The dining room and kitchen are now one room.',
      results: [
        'Wall removed on a flush beam, no soffit',
        'New 100-amp subpanel and dedicated circuits',
        'Island with seating for four and a prep sink',
        'Counter space up from four feet to nineteen',
      ],
    },
    process: {
      photo: { id: '1513467535987-fd81bc7d62f8', alt: 'Carpenter cutting a board with a circular saw on site' },
      steps: [
        { title: 'Temporary kitchen', text: 'Fridge, microwave and a sink set up in the dining room on day one.' },
        { title: 'Beam and ducts', text: 'Ductwork rerouted through the joists so the new beam could sit flush with the ceiling.' },
        { title: 'Cabinets by our carpenters', text: 'Cabinetry levelled and scribed in-house, counters templated the same week.' },
      ],
    },
    proposal: 34200,
    schedule: 'Two days early',
    quote: {
      text: 'The estimate they sent online was within nine hundred dollars of the final invoice. The proposal was exact.',
      name: 'Marta Ellis',
    },
  },
  {
    projectId: 'delmar',
    headline: 'A leaking tub with a soft floor, rebuilt as a walk-in shower that will outlast the house.',
    summary:
      'What started as a tile refresh became a subfloor repair once we lifted the tub. We sent photos and a priced change order the same afternoon, and still finished in three weeks.',
    before: {
      photo: { id: '1523413363574-c30aa1c2a516', alt: 'Hand pressing on a cracked and damaged plaster wall' },
      text: 'Grout had been failing for years. Water had run behind the tub surround, softening the subfloor and staining the ceiling below.',
      issues: [
        'Rotten subfloor under the tub',
        'Exhaust fan venting into the attic',
        'Cracked tile and failed grout lines',
        'Mould behind the tub surround',
      ],
    },
    after: {
      photo: { id: '1584622650111-993a426fbf0a', alt: 'Glass walk-in shower with white tile and a wood vanity' },
      text: 'A walk-in shower with a low curb, bonded waterproofing and a fan that finally vents outside. The ceiling below has stayed dry.',
      results: [
        'New subfloor and sistered joists',
        'Bonded membrane with 24-hour flood test',
        'Fan ducted through the roof',
        'Glass enclosure and floating vanity',
      ],
    },
    process: {
      photo: { id: '1504148455328-c376907d081c', alt: 'Cordless drill resting on a dusty subfloor' },
      steps: [
        { title: 'Found it, showed it', text: 'Photos of the rotten subfloor and a priced change order sent the same afternoon.' },
        { title: 'Flood test', text: 'The membrane held water for 24 hours before a single tile went on.' },
        { title: 'Clean handover', text: 'Punch list closed on the final day, with the flood-test photo in the handover pack.' },
      ],
    },
    proposal: 11500,
    schedule: 'Finished on the scheduled day',
    quote: {
      text: 'They called me into the bathroom to show me the rot themselves. No surprises on the bill, just a photo and a price.',
      name: 'Colin Mercer',
    },
  },
  {
    projectId: 'willow',
    headline: 'A 1920s craftsman with original wiring, made safe without losing its character.',
    summary:
      'The insurer wanted the knob-and-tube gone within a year. We rewired the whole house through the existing plaster where we could, kept the original trim, and came in under the proposal.',
    before: {
      photo: { id: '1572120360610-d971b9d7767c', alt: 'Older craftsman house with a covered front porch among autumn trees' },
      text: 'A handsome house with tired insides: live knob-and-tube wiring, one bathroom for five people and floors worn to the nails.',
      issues: [
        'Active knob-and-tube wiring throughout',
        'Insurance renewal conditional on a rewire',
        'One bathroom for a family of five',
        'Oak floors worn through the finish',
      ],
    },
    after: {
      photo: { id: '1600121848594-d8644e57abab', alt: 'Living room with grey sofas, built-in shelving and a pendant light' },
      text: 'Same trim, same doors, same floors, now safe and refinished. A second bathroom upstairs and a kitchen built for the family.',
      results: [
        'Whole-house rewire with a 200-amp panel',
        'Original trim removed, labelled and reinstalled',
        'Second bathroom added upstairs',
        'Floors sanded and refinished, no replacement',
      ],
    },
    process: {
      photo: { id: '1621905252507-b35492cc74b4', alt: 'Electrician in a hard hat and safety glasses on site' },
      steps: [
        { title: 'Fish, not demolish', text: 'Our electrician fished new wire through walls and floors to save the original plaster.' },
        { title: 'Trim catalogue', text: 'Every piece of trim was numbered, stored and reinstalled in its original place.' },
        { title: 'Insurance sign-off', text: 'Inspection certificates sent straight to the insurer before the deadline.' },
      ],
    },
    proposal: 128400,
    schedule: 'One week early',
    quote: {
      text: 'We were terrified of losing the character of the house. It looks the same as the day we bought it, only everything works.',
      name: 'Rosa and Ben Adeyemi',
    },
  },
  {
    projectId: 'cedar-lane',
    headline: 'A one-storey ranch lifted into a family home, while the family kept living downstairs.',
    summary:
      'Three kids and two bedrooms. Moving would have cost more than building up, so we added a full second storey with three bedrooms and a bath, weathering the roof-off weeks with a full tarp system.',
    before: {
      photo: { id: '1632759145351-1d592919f522', alt: 'Roofer standing on the roof of a single-storey brick house' },
      text: 'A solid 1960s brick ranch with no room to grow. The existing roof framing and foundation had to be checked before anything could go on top.',
      issues: [
        'Two bedrooms for a family of five',
        'Foundation never designed for a second storey',
        'Zoning height limit close to the new ridge',
        'Family could not afford to move out',
      ],
    },
    after: {
      photo: { id: '1605276374104-dee2a0ed3cd6', alt: 'Two-storey suburban family home with a garage and front lawn' },
      text: 'A full second floor that looks like it was always there, with siding and rooflines tied into the original house.',
      results: [
        'Three bedrooms and a full bath upstairs',
        'Footings reinforced after engineering review',
        'Zoning variance secured before design was final',
        'Family lived downstairs for the whole build',
      ],
    },
    process: {
      photo: { id: '1508450859948-4e04fabaa4ea', alt: 'Timber framing of an upper storey under construction' },
      steps: [
        { title: 'Zoning first', text: 'We presented to the zoning board ourselves and won the height variance in one hearing.' },
        { title: 'Roof-off in nine days', text: 'Old roof off, new floor framed and dried in under tarps in nine working days.' },
        { title: 'Tie-in', text: 'Brick and siding matched so the addition reads as one house from the street.' },
      ],
    },
    proposal: 181000,
    schedule: 'On schedule, including permits',
    quote: {
      text: 'Six months with a construction site on top of us and the kids never missed a night in their own beds.',
      name: 'Priya Raman',
    },
  },
  {
    projectId: 'maple-ridge',
    headline: 'A cramped back half of the house, doubled with a two-storey addition.',
    summary:
      'The owners needed a family room and a primary suite without giving up the garden. We built up and out on a small footprint. A late steel delivery cost us nine days, and they heard about it from us the morning we found out.',
    before: {
      photo: { id: '1503594384566-461fe158e797', alt: 'Rear gables of a white clapboard house against a blue sky' },
      text: 'A 1950s clapboard house with a narrow back porch and every bedroom sharing one hallway bath. The rear foundation was sound but shallow.',
      issues: [
        'No family room, living room doubling as a playroom',
        'Primary bedroom with no bathroom of its own',
        'Rotting rear porch on shallow piers',
        'Rear setback leaving only twelve feet to build on',
      ],
    },
    after: {
      photo: { id: '1600566753190-17f0baa2a6c3', alt: 'Modern rear addition with timber cladding and black framed glass' },
      text: 'A family room opening onto the garden, with a primary suite and bath above. Timber cladding and black glass mark the new part without fighting the old one.',
      results: [
        '520 square feet added on two floors',
        'Family room with sliding doors to the garden',
        'Primary suite with walk-in shower and closet',
        'Heating extended on its own zone',
      ],
    },
    process: {
      photo: { id: '1541888946425-d81bb19240f5', alt: 'Crew in hard hats reviewing a newly poured slab from above' },
      steps: [
        { title: 'Footings to frost depth', text: 'New footings poured below frost line and tied to the existing foundation.' },
        { title: 'Straight answers on delays', text: 'When the steel slipped nine days, we called the same morning and reworked the schedule with the owners.' },
        { title: 'One opening, one weekend', text: 'The rear wall was cut through on a Saturday so the house was open to the addition for a single day.' },
      ],
    },
    proposal: 146200,
    schedule: 'Nine days late, steel delivery',
    quote: {
      text: 'The steel was late and they told us before we could wonder. Every other number on the proposal held.',
      name: 'Julia and Andre Novak',
    },
  },
  {
    projectId: 'hawthorne',
    headline: 'A dark galley kitchen opened to the dining room, on the exact budget.',
    summary:
      'The owners wanted light and storage, not a showroom. We opened the galley to the dining room, painted the cabinetry in place of replacing it, and the final invoice matched the proposal to the dollar.',
    before: {
      photo: { id: '1556911220-bff31c812dba', alt: 'Narrow kitchen with flat white upper cabinets and a crowded counter' },
      text: 'A galley kitchen with one small window, a wall between it and the dining room, and a microwave taking up the only clear counter.',
      issues: [
        'Wall cutting the kitchen off from the dining room',
        'One window lighting the whole room',
        'Microwave and small appliances on the counter',
        'Cabinet boxes sound, doors dated and worn',
      ],
    },
    after: {
      photo: { id: '1600489000022-c2086d79f9d4', alt: 'Kitchen with charcoal lower cabinets, white tile and open shelves' },
      text: 'One bright room from the stove to the dining table. Charcoal lowers, white tile to the ceiling and open shelves where the dark uppers used to be.',
      results: [
        'Kitchen and dining room joined into one space',
        'Existing cabinet boxes kept and painted',
        'Tile run to the ceiling on the range wall',
        'Microwave built into a tall pantry unit',
      ],
    },
    process: {
      photo: { id: '1599619585752-c3edb42a414c', alt: 'Paint roller resting in a tray beside a window' },
      steps: [
        { title: 'Keep what works', text: 'Cabinet boxes checked and kept, saving about eight thousand dollars against new cabinetry.' },
        { title: 'Spray booth off site', text: 'Doors and drawer fronts sprayed in our shop so the house never smelled of paint.' },
        { title: 'Tile to the ceiling', text: 'Our tile setter ran the range wall floor to ceiling in two days.' },
      ],
    },
    proposal: 41600,
    schedule: 'Finished on the scheduled week',
    quote: {
      text: 'They talked us out of new cabinets and put the savings into the tile. We would never have thought of it.',
      name: 'Claire and Owen Lindqvist',
    },
  },
  {
    projectId: 'linden',
    headline: 'A tired primary bath, rebuilt around a freestanding tub and a warm floor.',
    summary:
      'We borrowed two feet from the hall closet to fit the tub the owners had wanted for years, added a heated floor and a double vanity, and came in under the proposal because the tile allowance was not all used.',
    before: {
      photo: { id: '1552321554-5fefe8c9ef14', alt: 'Small white bathroom with a pedestal sink and checkerboard floor' },
      text: 'A single pedestal sink, a tub-shower combination with a sliding door, and a checkerboard floor that was cold eight months of the year.',
      issues: [
        'One sink for two people',
        'No storage beyond a mirror cabinet',
        'Cold floor and a noisy fan',
        'Hall closet taking space the bath needed',
      ],
    },
    after: {
      photo: { id: '1620626011761-996317b8d101', alt: 'Freestanding white tub beside a window with plants' },
      text: 'A freestanding tub under the window, a separate shower, a double vanity and a floor that is warm on winter mornings.',
      results: [
        'Two feet borrowed from the hall closet',
        'Heated floor on its own thermostat',
        'Double vanity with drawer storage',
        'Quiet fan on a humidity sensor',
      ],
    },
    process: {
      photo: { id: '1621905251189-08b45d6a269e', alt: 'Electrician in a hard hat wiring a panel' },
      steps: [
        { title: 'Move one wall', text: 'The closet wall was moved and reframed in the first two days.' },
        { title: 'Heat before tile', text: 'Our electrician tested the floor-heating mat before and after it was set in thinset.' },
        { title: 'Credit back', text: 'Unused tile allowance was credited on the final invoice, line by line.' },
      ],
    },
    proposal: 25600,
    schedule: 'Two days early',
    quote: {
      text: 'Grace was the only one of four who showed us a finished bathroom our size with the price on it.',
      name: 'Daniel Okonkwo',
    },
  },
  {
    projectId: 'birch-hollow',
    headline: 'A 1990s kitchen walled off from the dining room, rebuilt for a family that cooks.',
    summary:
      'The owners cook for ten most weekends. We rebuilt the range wall around a proper hood, added an eight-foot island and turned a coat closet into a butler pantry, the one addition that moved the price.',
    before: {
      photo: { id: '1560185007-cde436f6a4d0', alt: 'Dining room with oak floors and pendant lights next to a closed-off kitchen' },
      text: 'The dining room was bright and the kitchen behind it was not. A microwave-hood combination vented into the cabinet above it.',
      issues: [
        'Range hood recirculating into a cabinet',
        'Kitchen walled off from the dining room',
        'Island too small to prep and seat at once',
        'Unused coat closet next to the kitchen',
      ],
    },
    after: {
      photo: { id: '1507089947368-19c1da9775ae', alt: 'White kitchen with a long island, glass pendants and a range hood' },
      text: 'A long island between the cook and the guests, a hood that vents outside and a pantry that keeps the mess out of sight.',
      results: [
        'Hood ducted outside at 600 CFM',
        'Eight-foot island with seating for five',
        'Coat closet turned into a butler pantry',
        'Dining room and kitchen now one space',
      ],
    },
    process: {
      photo: { id: '1589939705384-5185137a7f0f', alt: 'Carpenter in a hard hat cutting lumber on a job site' },
      steps: [
        { title: 'Range wall rebuilt', text: 'Wall opened, duct run through the joists and the hood framed in by our carpenters.' },
        { title: 'Pantry priced on the spot', text: 'The owners asked for the pantry in week two. We priced it the same day and held the finish date.' },
        { title: 'Island on site', text: 'The island was built and scribed in place so it sits level on an old floor.' },
      ],
    },
    proposal: 50900,
    schedule: 'Finished on the scheduled week',
    quote: {
      text: 'The pantry was our idea halfway through. We had a price the same afternoon and it did not push the finish date.',
      name: 'Sofia and Tom Harrington',
    },
  },
  {
    projectId: 'garfield',
    headline: 'A hall bath with a hidden leak, turned into the easiest room in the house to clean.',
    summary:
      'The brief was a tile refresh. Behind the old vanity we found a slow leak in the supply line. We showed the owners, priced the repair within the original contingency, and still finished in two and a half weeks.',
    before: {
      photo: { id: '1523413363574-c30aa1c2a516', alt: 'Hand pressing on a cracked and damaged plaster wall' },
      text: 'Small grout-heavy tiles, a vanity on legs that collected dust and a patch of soft plaster behind it that told us something was wrong.',
      issues: [
        'Slow supply leak behind the vanity',
        'Grout lines every four inches',
        'Floor-standing toilet and vanity hard to clean',
        'No storage for a family of four',
      ],
    },
    after: {
      photo: { id: '1631889993959-41b4e9c6e3c5', alt: 'Contemporary bathroom with large grey tiles and slatted wood panel' },
      text: 'Large-format porcelain with almost no grout, a wall-hung toilet and vanity so the floor is clear, and a slatted oak niche for everything else.',
      results: [
        'Leak repaired and supply lines replaced in PEX',
        'Large-format porcelain, a third of the grout',
        'Wall-hung toilet and vanity',
        'Oak slatted niche for storage',
      ],
    },
    process: {
      photo: { id: '1504148455328-c376907d081c', alt: 'Cordless drill resting on a dusty subfloor' },
      steps: [
        { title: 'Open, then decide', text: 'Wall opened on day one so the leak was found before any tile was bought.' },
        { title: 'Contingency, not surprise', text: 'The repair came out of the contingency already in the proposal, so the total did not change.' },
        { title: 'Carrier frames', text: 'Steel carrier frames set in the wall for the wall-hung toilet and vanity.' },
      ],
    },
    proposal: 16400,
    schedule: 'Finished on the scheduled day',
    quote: {
      text: 'They found a leak we did not know we had, and the bill still matched the proposal.',
      name: 'Nora Castellanos',
    },
  },
  {
    projectId: 'elm-terrace',
    headline: 'A timber cottage hiding its best feature under a dropped ceiling.',
    summary:
      'The owners bought a cold, low-ceilinged cottage. When the 1970s ceiling came down, we found the original beams intact. We repaired one, insulated the whole envelope and gave them back a room twice as tall.',
    before: {
      photo: { id: '1508450859948-4e04fabaa4ea', alt: 'Exposed roof timbers after a dropped ceiling was removed' },
      text: 'Low acoustic-tile ceilings, a ladder-steep loft stair and almost no insulation. Heating bills in winter were higher than the mortgage.',
      issues: [
        'Dropped ceiling hiding the original beams',
        'Loft stair too steep to carry anything up',
        'Little to no insulation in walls or roof',
        'One beam split at the bearing end',
      ],
    },
    after: {
      photo: { id: '1590725140246-20acdee442be', alt: 'Cottage interior with exposed timber beams and an open kitchen' },
      text: 'The beams are the room now. A new kitchen sits under them, the loft has a real stair and the house holds its heat.',
      results: [
        'Original beams cleaned, one repaired with steel plates',
        'Loft stair rebuilt to code',
        'Roof and walls insulated from the outside',
        'Heating bill down by about half',
      ],
    },
    process: {
      photo: { id: '1574359411659-15573a27fd0c', alt: 'Painters on ladders finishing the exterior of a house' },
      steps: [
        { title: 'Engineer on the beam', text: 'The split beam was reviewed by our engineer and plated rather than replaced.' },
        { title: 'Insulate from outside', text: 'Rigid insulation went on outside the walls so the interior timbers stayed visible.' },
        { title: 'Stair built on site', text: 'Our carpenters built the new loft stair from the same timber as the beams.' },
      ],
    },
    proposal: 94500,
    schedule: 'Finished on the scheduled week',
    quote: {
      text: 'We thought we had bought a small house. They took the ceiling down and we had a different one.',
      name: 'Elena Brandt',
    },
  },
  {
    projectId: 'pinecrest',
    headline: 'An unused back lawn turned into a glass-walled room the family lives in.',
    summary:
      'The owners had a big garden and a small living room. We poured a new slab, built a glass-walled family room onto the back and tied it in so it reads as part of the house, finishing three days early.',
    before: {
      photo: { id: '1503708928676-1cb796a0891e', alt: 'Excavator grading open ground under a cloudy sky' },
      text: 'A sloping back lawn no one used, with poor drainage that pooled water against the rear wall every spring.',
      issues: [
        'Living room too small for the family',
        'Back lawn sloping toward the house',
        'Water pooling at the rear foundation',
        'No direct way from the kitchen to the garden',
      ],
    },
    after: {
      photo: { id: '1600585154340-be6161a56a0c', alt: 'Modern house at dusk with a glass-walled ground floor facing the lawn' },
      text: 'A glass-walled family room on the garden side, a patio at the same level and water that now drains away from the house.',
      results: [
        '380 square feet of new living space',
        'Floor-to-ceiling glass on three sides',
        'Regraded lawn and new perimeter drain',
        'Kitchen opens straight to the garden',
      ],
    },
    process: {
      photo: { id: '1504307651254-35680f356dfd', alt: 'Aerial view of a crew working on a construction site' },
      steps: [
        { title: 'Drainage first', text: 'Lawn regraded and a perimeter drain laid before a single form went down.' },
        { title: 'Slab and frame', text: 'Slab poured, cured and framed in three weeks, with the glass measured off the frame.' },
        { title: 'Tie-in', text: 'Roofline and cladding matched to the house so the room looks original.' },
      ],
    },
    proposal: 72400,
    schedule: 'Three days early',
    quote: {
      text: 'Our basement used to take water every spring. Now we have a new room and a dry basement.',
      name: 'Michael and Aiko Turner',
    },
  },
]

export const storyFor = (projectId: string) => stories.find((s) => s.projectId === projectId)
