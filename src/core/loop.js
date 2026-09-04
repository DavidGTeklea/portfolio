import * as THREE from 'three';

export function createLoop(renderer, scene, camera, updateFns = []) {
  const clock = new THREE.Clock();

  function tick() {
    const delta = clock.getDelta();
    for (const fn of updateFns) fn(delta);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  return { start: () => tick() };
}
