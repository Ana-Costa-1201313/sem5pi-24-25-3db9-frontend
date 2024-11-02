import * as THREE from "three";
import WallComponent from "../wall/wall.component";

export default class InteriorWallComponent extends THREE.Group {
  constructor() {
    super();

    var wall = new WallComponent("./assets/textures/wall1.png", "./assets/textures/whitefloor.png");
    
    this.add(wall);



    var woodPanel = new WallComponent("./assets/textures/wood.png", "./assets/textures/wood.png");
    woodPanel.scale.set(1.001, 0.1, 1);
    woodPanel.rotation.y = -Math.PI;  // Rotate 90 degrees to lay flat

    woodPanel.position.set(0,-0.11,0.01);
    this.add(woodPanel);

  }
}
