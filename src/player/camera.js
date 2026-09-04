import * as THREE from 'three';
import { smoothing } from '../utils/math.js';

const OFFSET = new THREE.Vector3(0, 4, 7);
const desired = new THREE.Vector3();
const lookTarget = new THREE.Vector3();

// Fixed world-space offset behind/above the character, smoothly eased toward
// each frame — simpler than a fully rotation-following rig and avoids camera
// whip when the character turns quickly.
export class FollowCamera {
  constructor(camera) {
    this.camera = camera;
  }

  update(delta, targetPosition) {
    desired.copy(targetPosition).add(OFFSET);
    this.camera.position.lerp(desired, smoothing(0.001, delta));
    lookTarget.copy(targetPosition);
    lookTarget.y += 1.2;
    this.camera.lookAt(lookTarget);
  }
}
