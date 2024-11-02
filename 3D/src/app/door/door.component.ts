import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

export class DoorComponent extends THREE.Group {
  public pivot: THREE.Group;
  public isOpen: boolean = false; 
  private targetRotationY: number = 0; 
  private rotationSpeed: number = 0.05; 

  private audioOpen: HTMLAudioElement;
  private audioClose: HTMLAudioElement;

  constructor() {
    super();

    this.pivot = new THREE.Group();
    this.add(this.pivot);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/door/scene.gltf', (gltfScene) => {
      gltfScene.scene.scale.setScalar(0.02);
      gltfScene.scene.position.set(0,0,0);
      gltfScene.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;     
          child.receiveShadow = true;
        }
      });
      this.pivot.add(gltfScene.scene);
      this.pivot.position.set(20, 0, 25);
    });

    this.audioOpen = new Audio('./assets/sounds/doorOpen.mp3');
    this.audioClose = new Audio('./assets/sounds/doorClose.mp3');

    this.animate();
  }


  public open() {
    if (!this.isOpen) {
      this.targetRotationY = Math.PI / 2; 
      this.isOpen = true; 
      this.audioOpen.currentTime = 0;
      this.audioOpen.play(); 
    }
  }


  public close() {
    if (this.isOpen) {
      this.targetRotationY = 0; 
      this.isOpen = false;
      this.audioClose.currentTime = 0; 
      this.audioClose.play();
    }
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    const deltaRotation = this.targetRotationY + this.pivot.rotation.y;

    if (Math.abs(deltaRotation) > 0.01) { 
      this.pivot.rotation.y -= deltaRotation * this.rotationSpeed; 
    }
  }
}
