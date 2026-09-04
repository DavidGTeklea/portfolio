import * as THREE from 'three';
import { createLandmarkMarker } from './landmarkMarker.js';

export function buildLandmarks(scene, configs, islandsById) {
  const built = [];

  for (const config of configs) {
    const island = islandsById.get(config.islandId);
    if (!island) continue;

    const worldPosition = new THREE.Vector3(
      island.position.x + config.offset.x,
      island.position.y,
      island.position.z + config.offset.z
    );

    const marker = createLandmarkMarker();
    marker.position.copy(worldPosition);
    scene.add(marker);

    built.push({ id: config.id, position: worldPosition, radius: config.radius });
  }

  return built;
}
