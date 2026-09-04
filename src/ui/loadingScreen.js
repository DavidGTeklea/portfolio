import * as THREE from 'three';

// Wires a THREE.LoadingManager to a progress bar overlay, hidden once
// everything (character model + texture) has finished loading.
export function createLoadingScreen({ overlayEl, barEl }) {
  const manager = new THREE.LoadingManager();

  manager.onProgress = (url, loaded, total) => {
    const pct = total ? Math.round((loaded / total) * 100) : 100;
    barEl.style.width = `${pct}%`;
  };

  manager.onLoad = () => {
    overlayEl.classList.add('hidden');
  };

  return manager;
}
