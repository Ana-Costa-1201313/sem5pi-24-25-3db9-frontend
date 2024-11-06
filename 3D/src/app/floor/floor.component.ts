import { model } from '@angular/core';
import * as THREE from 'three';

export default class FloorComponent extends THREE.Group {

  constructor(texturePath: string) {
    super();

    const loader = new THREE.TextureLoader();
    const texture = loader.load(texturePath);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);

    const geometry = new THREE.PlaneGeometry(64, 56);

    const material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.FrontSide, shininess: 100 });
    const floor = new THREE.Mesh(geometry, material);


    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    floor.position.set(7, 0, -3);

    this.add(floor);
  }

}
