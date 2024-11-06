import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';


export class ShibaComponent extends THREE.Group {

  private audioClick: HTMLAudioElement;

  constructor(audioPath: string, modelPath: string) {
    super();

    this.audioClick = new Audio(audioPath);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(modelPath, (gltfScene) => {
      gltfScene.scene.scale.set(2, 2, 2);
      gltfScene.scene.position.set(-15, 13.8, -19);
      gltfScene.scene.rotation.y = Math.PI / 6;
      gltfScene.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      this.add(gltfScene.scene);
    });
  }

  public playClickSound() {
    this.audioClick.currentTime = 0;
    this.audioClick.play(); 
  }

}