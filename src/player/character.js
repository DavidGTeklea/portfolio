import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadCharacter(url = '/models/character.glb', manager) {
  const loader = new GLTFLoader(manager);

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        const mixer = new THREE.AnimationMixer(model);
        const clips = {};
        for (const clip of gltf.animations) {
          clips[clip.name] = mixer.clipAction(clip);
        }

        resolve({ model, mixer, clips });
      },
      undefined,
      reject
    );
  });
}
