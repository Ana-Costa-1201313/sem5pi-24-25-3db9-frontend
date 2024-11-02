import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';


export class TableComponent extends THREE.Group {

  constructor() {
    super();

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/table/scene.gltf', (gltfScene) => {
      gltfScene.scene.scale.set(10, 10, 10);
      gltfScene.scene.position.set(0, 0, 0);
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
