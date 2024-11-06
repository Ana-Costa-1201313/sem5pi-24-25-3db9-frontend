import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';


export class InstrumentsComponent extends THREE.Group {

  constructor(modelPath: string) {
    super();

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(modelPath, (gltfScene) => {
      gltfScene.scene.scale.set(10, 10, 10);
      gltfScene.scene.position.set(0, 0, -20);

      gltfScene.scene.rotation.y = Math.PI / 2; 

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
