import * as THREE from 'three';

// A straight walkable plank between two world points at a given height —
// rotated so its long (local Z) axis points from `from` toward `to`.
export function createBridge(from, to, y, width = 2.5, thickness = 0.3) {
  const dx = to.x - from.x;
  const dz = to.z - from.z;
  const length = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dx, dz);

  const geometry = new THREE.BoxGeometry(width, thickness, length);
  const material = new THREE.MeshStandardMaterial({ color: 0xa9825a, flatShading: true });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.receiveShadow = true;
  mesh.castShadow = true;

  mesh.position.set((from.x + to.x) / 2, y, (from.z + to.z) / 2);
  mesh.rotation.y = angle;

  return mesh;
}
