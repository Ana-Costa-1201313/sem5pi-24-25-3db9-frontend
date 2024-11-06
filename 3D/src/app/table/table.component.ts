import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { HumanComponent } from '../human/human.component';

export class TableComponent extends THREE.Group {
  private human: HumanComponent | null = null;

  constructor(modelPath: string, humanModelPath: string) {
    super();

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(modelPath, (gltfScene) => {
      gltfScene.scene.scale.set(10, 10, 10);
      gltfScene.scene.position.set(0, 0, 0);
      gltfScene.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      this.add(gltfScene.scene);
      
      this.human = new HumanComponent(humanModelPath);
      this.human.visible = false;
      this.add(this.human);

    });
  }


  public addHuman() {
    if (this.human) {
      this.human.visible = true;
    }
  }

}
