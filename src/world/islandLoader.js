import * as THREE from 'three';
import { createIsland } from './island.js';
import { createTree } from './tree.js';

export function buildIslands(scene, configs) {
  const groundMeshes = [];
  const islandsById = new Map();

  for (const config of configs) {
    const { group, topY, topRadius, walkable } = createIsland(config);
    group.position.set(config.position.x, 0, config.position.z);
    scene.add(group);

    for (const tree of config.trees ?? []) {
      const treeMesh = createTree();
      treeMesh.position.set(config.position.x + tree.x, topY, config.position.z + tree.z);
      scene.add(treeMesh);
    }

    groundMeshes.push(walkable);
    islandsById.set(config.id, {
      position: new THREE.Vector3(config.position.x, topY, config.position.z),
      topRadius,
    });
  }

  return { groundMeshes, islandsById };
}
