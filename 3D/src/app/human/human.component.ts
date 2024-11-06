import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';


export class HumanComponent extends THREE.Group {

  constructor(modelPath: string) {
    super();

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(modelPath, (gltfScene) => {
      const scalefactor = 1.3;
      gltfScene.scene.scale.set(0.025 * scalefactor, 0.035 * scalefactor, 0.02 * scalefactor);
      gltfScene.scene.position.set(-10, 8.5, 0);

     
      gltfScene.scene.rotation.x = -Math.PI / 2; 
      gltfScene.scene.rotation.z = -Math.PI / 2; 


      gltfScene.scene.traverse((child) => {

        if (child instanceof THREE.Mesh) {
          child.castShadow = true;     
          child.receiveShadow = true;  
        }
      });
      this.add(gltfScene.scene);
    });
  }
}
