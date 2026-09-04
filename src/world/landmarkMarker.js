import * as THREE from 'three';

// A simple glowing beacon (pole + gem) that marks an interactable landmark
// from a distance, so players know where to walk.
export function createLandmarkMarker() {
  const group = new THREE.Group();

  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 1.6, 6),
    new THREE.MeshStandardMaterial({ color: 0x444444, flatShading: true })
  );
  pole.position.y = 0.8;
  group.add(pole);

  const gem = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.35, 0),
    new THREE.MeshStandardMaterial({
      color: 0xffd166,
      emissive: 0xffb703,
      emissiveIntensity: 0.6,
      flatShading: true,
    })
  );
  gem.position.y = 1.8;
  group.add(gem);

  return group;
}
