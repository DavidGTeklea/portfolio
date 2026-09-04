import * as THREE from 'three';

// A floating island: a tapered rock base (apex pointing down) topped with a
// flat grass cylinder. Its top face is the walkable surface used for the
// character controller's ground raycast.
export function createIsland({ topRadius = 7, rockHeight = 4, grassHeight = 1 } = {}) {
  const group = new THREE.Group();

  const rockGeometry = new THREE.ConeGeometry(topRadius * 0.9, rockHeight, 8);
  rockGeometry.rotateX(Math.PI);
  rockGeometry.translate(0, -rockHeight / 2, 0);
  const rock = new THREE.Mesh(
    rockGeometry,
    new THREE.MeshStandardMaterial({ color: 0x8a6f52, flatShading: true })
  );
  rock.receiveShadow = true;
  group.add(rock);

  const grassGeometry = new THREE.CylinderGeometry(topRadius, topRadius, grassHeight, 8);
  grassGeometry.translate(0, grassHeight / 2, 0);
  const grass = new THREE.Mesh(
    grassGeometry,
    new THREE.MeshStandardMaterial({ color: 0x63a46c, flatShading: true })
  );
  grass.receiveShadow = true;
  grass.castShadow = true;
  group.add(grass);

  return { group, topY: grassHeight, topRadius, walkable: grass };
}
