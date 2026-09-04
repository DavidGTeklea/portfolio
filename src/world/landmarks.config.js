// Each landmark's position is an (x, z) offset from its island's center.
// The loader resolves it to a world position and pairs it with ui/content.js
// by matching `id`.
export const landmarks = [
  { id: 'intro', islandId: 'about', offset: { x: 0, z: -3 }, radius: 2.5 },

  { id: 'capital-one', islandId: 'experience', offset: { x: -4, z: -4 }, radius: 2.2 },
  { id: 'ml-research', islandId: 'experience', offset: { x: 4, z: -4 }, radius: 2.2 },
  { id: 'pnc', islandId: 'experience', offset: { x: -4, z: 4 }, radius: 2.2 },
  { id: 'google', islandId: 'experience', offset: { x: 4, z: 4 }, radius: 2.2 },

  { id: 'eigendb', islandId: 'projects', offset: { x: 0, z: -2 }, radius: 2.5 },

  { id: 'georgia-tech', islandId: 'education', offset: { x: -2.5, z: -2 }, radius: 2 },
  { id: 'pitt-bs', islandId: 'education', offset: { x: 2.5, z: 2 }, radius: 2 },

  { id: 'contact', islandId: 'contact', offset: { x: 0, z: -2 }, radius: 2.5 },
];
