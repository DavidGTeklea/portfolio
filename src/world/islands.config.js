// Each island's world position (x, z), shape, and decorative tree offsets
// (kept clear of landmark positions and bridge entry points). Add an entry
// here + matching entries in landmarks.config.js and bridges.config.js when
// adding a section.
export const islands = [
  {
    id: 'about',
    position: { x: 0, z: 0 },
    topRadius: 7,
    rockHeight: 4,
    grassHeight: 1,
    trees: [
      { x: -4, z: -2 },
      { x: 4, z: -2 },
      { x: -3, z: 3.5 },
    ],
  },
  {
    id: 'experience',
    position: { x: 0, z: -26 },
    topRadius: 10,
    rockHeight: 5,
    grassHeight: 1,
    trees: [
      { x: 0, z: -8 },
      { x: -8, z: 0 },
      { x: 8, z: 0 },
    ],
  },
  {
    id: 'education',
    position: { x: 26, z: 0 },
    topRadius: 7,
    rockHeight: 4,
    grassHeight: 1,
    trees: [
      { x: 3.5, z: -3.5 },
      { x: -3.5, z: 3.5 },
    ],
  },
  {
    id: 'projects',
    position: { x: -26, z: 0 },
    topRadius: 6,
    rockHeight: 4,
    grassHeight: 1,
    trees: [
      { x: -3, z: -3 },
      { x: 3, z: 3 },
    ],
  },
  {
    id: 'contact',
    position: { x: 0, z: 26 },
    topRadius: 7,
    rockHeight: 4,
    grassHeight: 1,
    trees: [
      { x: -4, z: 2 },
      { x: 4, z: 2 },
    ],
  },
];
