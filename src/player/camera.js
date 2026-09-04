import * as THREE from 'three';
import { smoothing } from '../utils/math.js';

const desired = new THREE.Vector3();
const lookTarget = new THREE.Vector3();

// Orbits behind the character's current facing (heading), smoothly trailing
// as they turn — so "forward" always matches whichever direction the player
// is walking, letting them navigate onto any bridge regardless of which way
// it's oriented (not just one aligned with a fixed world axis).
export class FollowCamera {
  constructor(camera, { distance = 7, height = 4, lookHeight = 1.2 } = {}) {
    this.camera = camera;
    this.distance = distance;
    this.height = height;
    this.lookHeight = lookHeight;
  }

  _desiredPosition(targetPosition, heading) {
    desired.set(
      targetPosition.x - Math.sin(heading) * this.distance,
      targetPosition.y + this.height,
      targetPosition.z - Math.cos(heading) * this.distance
    );
    return desired;
  }

  update(delta, targetPosition, heading) {
    this.camera.position.lerp(this._desiredPosition(targetPosition, heading), smoothing(0.001, delta));
    lookTarget.copy(targetPosition);
    lookTarget.y += this.lookHeight;
    this.camera.lookAt(lookTarget);
  }

  snapTo(targetPosition, heading) {
    this.camera.position.copy(this._desiredPosition(targetPosition, heading));
    lookTarget.copy(targetPosition);
    lookTarget.y += this.lookHeight;
    this.camera.lookAt(lookTarget);
  }
}
