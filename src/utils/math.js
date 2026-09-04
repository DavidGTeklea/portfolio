export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function distanceXZ(a, b) {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dz * dz);
}

// Frame-rate independent smoothing factor for lerps driven by delta time.
export function smoothing(rate, delta) {
  return 1 - Math.pow(rate, delta);
}
