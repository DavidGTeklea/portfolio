import * as THREE from 'three';

// Cap delta so a lag spike, alt-tab, or backgrounded tab (rAF gets throttled,
// not paused, so it can still fire after several real seconds) doesn't move
// or rotate the character by an enormous single-frame jump.
const MAX_DELTA = 0.1;

export function createLoop(renderer, scene, camera, updateFns = []) {
  const clock = new THREE.Clock();

  function tick() {
    const delta = Math.min(clock.getDelta(), MAX_DELTA);
    for (const fn of updateFns) fn(delta);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  return { start: () => tick() };
}
