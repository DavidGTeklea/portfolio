import * as THREE from 'three';

const DOWN = new THREE.Vector3(0, -1, 0);
const RAY_ORIGIN = new THREE.Vector3();

// Tank-style controls: A/D turn the character, W/S move along whichever way
// it's currently facing. Movement never depends on the camera's orientation
// (and the camera, in turn, just trails the character's facing) — avoiding
// the feedback loop you'd get if movement were derived from a camera that
// itself derives its orientation from the character it's following.
export class PlayerController {
  constructor({ model, mixer, clips, keys, groundMeshes }) {
    this.model = model;
    this.mixer = mixer;
    this.clips = clips;
    this.keys = keys;
    this.groundMeshes = groundMeshes;

    this.speed = 4.5;
    this.turnSpeed = 2.6; // radians/sec

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

    if (left) this.model.rotation.y += this.turnSpeed * delta;
    if (right) this.model.rotation.y -= this.turnSpeed * delta;

    const moveAmount = (forward ? 1 : 0) - (back ? 1 : 0);
    const moving = moveAmount !== 0;

    if (moving) {
      const heading = this.model.rotation.y;
      const step = this.speed * delta * moveAmount;
      const nextX = this.model.position.x + Math.sin(heading) * step;
      const nextZ = this.model.position.z + Math.cos(heading) * step;
      const groundY = this._groundHeightAt(nextX, nextZ, this.model.position.y);

      if (groundY !== null) {
        this.model.position.x = nextX;
        this.model.position.z = nextZ;
        this.model.position.y = groundY;
      }
      // groundY === null means the step would walk off the edge — cancel it,
      // same effect as bumping into an invisible wall.
    }

    this._playClip(moving ? 'walk' : 'idle');
    this.mixer.update(delta);
  }
}
