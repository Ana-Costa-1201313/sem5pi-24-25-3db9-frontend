import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';


export class DoorComponent extends THREE.Group {

  constructor() {
    super();

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/door/scene.gltf', (gltfScene) => {
      gltfScene.scene.scale.setScalar(0.02); 
      gltfScene.scene.position.set(20, 0, 25);
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
