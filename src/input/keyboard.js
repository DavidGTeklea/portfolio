const KEY_MAP = {
  KeyW: 'forward',
  ArrowUp: 'forward',
  KeyS: 'back',
  ArrowDown: 'back',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyD: 'right',
  ArrowRight: 'right',
};

export function createKeyboard() {
  const keys = { forward: false, back: false, left: false, right: false };

  window.addEventListener('keydown', (e) => {
    const action = KEY_MAP[e.code];
    if (action) keys[action] = true;
  });

  window.addEventListener('keyup', (e) => {
    const action = KEY_MAP[e.code];
    if (action) keys[action] = false;
  });

  return keys;
}
