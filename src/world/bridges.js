import * as THREE from 'three';
import { createBridge } from './bridge.js';

// Islands are 8-sided polygons, not true circles, so their actual edge sits
// slightly inside `topRadius` except along the 4 axis-aligned directions.
// Extending each bridge this far past the nominal edge guarantees it
// overlaps the island mesh with no walkable-surface gap, regardless of the
// exact angle a player approaches from.
const OVERLAP = 2;

export function buildBridges(scene, configs, islandsById) {
  const groundMeshes = [];

  for (const { from, to } of configs) {
    const a = islandsById.get(from);
    const b = islandsById.get(to);
    if (!a || !b) continue;

    const dx = b.position.x - a.position.x;
    const dz = b.position.z - a.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const ux = dx / dist;
    const uz = dz / dist;

    const fromEdge = new THREE.Vector3(
      a.position.x + ux * (a.topRadius - OVERLAP),
      a.position.y,
      a.position.z + uz * (a.topRadius - OVERLAP)
    );
    const toEdge = new THREE.Vector3(
      b.position.x - ux * (b.topRadius - OVERLAP),
      b.position.y,
      b.position.z - uz * (b.topRadius - OVERLAP)
    );

    const bridge = createBridge(fromEdge, toEdge, a.position.y);
    scene.add(bridge);
    groundMeshes.push(bridge);
  }

  return groundMeshes;
}
