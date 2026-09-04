import * as THREE from 'three';
import { createBridge } from './bridge.js';

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
      a.position.x + ux * a.topRadius,
      a.position.y,
      a.position.z + uz * a.topRadius
    );
    const toEdge = new THREE.Vector3(
      b.position.x - ux * b.topRadius,
      b.position.y,
      b.position.z - uz * b.topRadius
    );

    const bridge = createBridge(fromEdge, toEdge, a.position.y);
    scene.add(bridge);
    groundMeshes.push(bridge);
  }

  return groundMeshes;
}
