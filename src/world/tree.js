import * as THREE from 'three';

// A simple low-poly pine tree: a trunk cylinder with two stacked cone
// layers of foliage, matching the flat-shaded style of the islands.
export function createTree({ scale = 1 } = {}) {
  const group = new THREE.Group();

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.2, 1.2, 6),
    new THREE.MeshStandardMaterial({ color: 0x6b4a2f, flatShading: true })
  );
  trunk.position.y = 0.6;
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  group.add(trunk);

  const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x3f7a4f, flatShading: true });

  const lower = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.4, 7), foliageMaterial);
  lower.position.y = 1.5;
  lower.castShadow = true;
  group.add(lower);

  const upper = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.2, 7), foliageMaterial);
  upper.position.y = 2.3;
  upper.castShadow = true;
  group.add(upper);

  group.scale.setScalar(scale);
  return group;
}
