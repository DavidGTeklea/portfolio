import { createScene, createCamera, createRenderer, handleResize } from './core/scene.js';
import { createLights } from './core/lights.js';
import { createLoop } from './core/loop.js';
import { createKeyboard } from './input/keyboard.js';
import { loadCharacter } from './player/character.js';
import { PlayerController } from './player/controller.js';
import { FollowCamera } from './player/camera.js';
import { buildIslands } from './world/islandLoader.js';
import { buildLandmarks } from './world/landmarks.js';
import { buildBridges } from './world/bridges.js';
import { PanelManager } from './ui/panels.js';
import { createLoadingScreen } from './ui/loadingScreen.js';
import { renderMobileFallback } from './ui/mobileFallback.js';
import { isMobileOrNarrow } from './utils/device.js';
import { islands as islandConfigs } from './world/islands.config.js';
import { landmarks as landmarkConfigs } from './world/landmarks.config.js';
import { bridges as bridgeConfigs } from './world/bridges.config.js';

if (isMobileOrNarrow()) {
  renderMobileFallback();
} else {
  await initScene();
}

async function initScene() {
  const canvas = document.getElementById('scene');
  const scene = createScene();
  const camera = createCamera();
  const renderer = createRenderer(canvas);
  handleResize(camera, renderer);
  createLights(scene);

  const { groundMeshes, islandsById } = buildIslands(scene, islandConfigs);
  const landmarks = buildLandmarks(scene, landmarkConfigs, islandsById);
  const bridgeMeshes = buildBridges(scene, bridgeConfigs, islandsById);
  groundMeshes.push(...bridgeMeshes);

  const keys = createKeyboard();

  const loadingManager = createLoadingScreen({
    overlayEl: document.getElementById('loading'),
    barEl: document.getElementById('loading-bar'),
  });

  const { model, mixer, clips } = await loadCharacter(undefined, loadingManager);
  const aboutIsland = islandsById.get('about');
  model.position.set(aboutIsland.position.x, aboutIsland.position.y, aboutIsland.position.z);
  model.rotation.y = Math.PI;
  scene.add(model);

  const controller = new PlayerController({
    model,
    mixer,
    clips,
    keys,
    groundMeshes,
  });

  const followCamera = new FollowCamera(camera);
  followCamera.snapTo(model.position, model.rotation.y);

  const panelManager = new PanelManager({
    landmarks,
    panelEl: document.getElementById('panel'),
    titleEl: document.getElementById('panel-title'),
    subtitleEl: document.getElementById('panel-subtitle'),
    bodyEl: document.getElementById('panel-body'),
    bulletsEl: document.getElementById('panel-bullets'),
    linksEl: document.getElementById('panel-links'),
  });

  const loop = createLoop(renderer, scene, camera, [
    (delta) => {
      controller.update(delta);
      followCamera.update(delta, model.position, model.rotation.y);
      panelManager.update(model.position);
    },
  ]);
  loop.start();
}
