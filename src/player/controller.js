import * as THREE from 'three';
import { clamp } from '../utils/math.js';

const UP = new THREE.Vector3(0, 1, 0);
const DOWN = new THREE.Vector3(0, -1, 0);
const FORWARD = new THREE.Vector3();
const RIGHT = new THREE.Vector3();
const MOVE = new THREE.Vector3();
const RAY_ORIGIN = new THREE.Vector3();

// Camera-relative WASD movement with a downward raycast for ground snapping —
// walking onto an island/bridge just works as long as its top surface is in
// groundMeshes, with no physics engine needed.
export class PlayerController {
  constructor({ model, mixer, clips, camera, keys, groundMeshes }) {
    this.model = model;
    this.mixer = mixer;
    this.clips = clips;
    this.camera = camera;
    this.keys = keys;
    this.groundMeshes = groundMeshes;

    this.speed = 4.5;
    this.turnRate = 12;

    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = 5;

    this.currentAction = null;
    this._playClip('idle', 0);
  }

  _playClip(name, fade = 0.2) {
    const next = this.clips[name];
    if (!next || this.currentAction === next) return;
    next.reset().fadeIn(fade).play();
    if (this.currentAction) this.currentAction.fadeOut(fade);
    this.currentAction = next;
  }

  // Returns the ground height under (x, z), or null if there's no ground
  // within range — used both for snapping and for cancelling a step that
  // would walk the character off the edge of an island.
  _groundHeightAt(x, z, fromY) {
    RAY_ORIGIN.set(x, fromY + 2, z);
    this.raycaster.set(RAY_ORIGIN, DOWN);
    const hits = this.raycaster.intersectObjects(this.groundMeshes, false);
    return hits.length ? hits[0].point.y : null;
  }

  update(delta) {
    const { forward, back, left, right } = this.keys;
    const moving = forward || back || left || right;

    this.camera.getWorldDirection(FORWARD);
    FORWARD.y = 0;
    FORWARD.normalize();
    RIGHT.crossVectors(FORWARD, UP);

    MOVE.set(0, 0, 0);
    if (forward) MOVE.add(FORWARD);
    if (back) MOVE.sub(FORWARD);
    if (right) MOVE.add(RIGHT);
    if (left) MOVE.sub(RIGHT);

    if (MOVE.lengthSq() > 0) {
      MOVE.normalize();
      const step = MOVE.clone().multiplyScalar(this.speed * delta);
      const nextX = this.model.position.x + step.x;
      const nextZ = this.model.position.z + step.z;
      const groundY = this._groundHeightAt(nextX, nextZ, this.model.position.y);

      if (groundY !== null) {
        this.model.position.x = nextX;
        this.model.position.z = nextZ;
        this.model.position.y = groundY;

        const targetAngle = Math.atan2(MOVE.x, MOVE.z);
        this.model.rotation.y = this._lerpAngle(
          this.model.rotation.y,
          targetAngle,
          clamp(delta * this.turnRate, 0, 1)
        );
      }
      // groundY === null means the step would walk off the edge — cancel it,
      // same effect as bumping into an invisible wall.
    }

    this._playClip(moving ? 'walk' : 'idle');
    this.mixer.update(delta);
  }

  _lerpAngle(a, b, t) {
    let diff = b - a;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    return a + diff * t;
  }
}
