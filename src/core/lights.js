import * as THREE from 'three';

export function createLights(scene) {
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(20, 35, 15);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -55;
  sun.shadow.camera.right = 55;
  sun.shadow.camera.top = 55;
  sun.shadow.camera.bottom = -55;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 100;
  sun.shadow.bias = -0.002;
  scene.add(sun);
  scene.add(sun.target);

  const ambient = new THREE.HemisphereLight(0xbde0fe, 0x4a3f35, 1);
  scene.add(ambient);
}
