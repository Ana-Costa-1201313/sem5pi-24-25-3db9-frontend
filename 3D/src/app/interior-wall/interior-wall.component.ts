import * as THREE from "three";
import WallComponent from "../wall/wall.component";

export default class InteriorWallComponent extends THREE.Group {
  constructor(
    wallFrontTexturePath: string,
    wallRearTexturePath: string,
    wallFrontColor: number,
    wallRearColor: number,
    woodPanelFrontTexturePath: string,
    woodPaneRearTexturePath: string,
    woodPanelFrontColor: number,
    woodPanelRearColor: number) {
    super();

    var wall = new WallComponent(wallFrontTexturePath, wallRearTexturePath, wallFrontColor, wallRearColor);
    this.add(wall);

    var woodPanel = new WallComponent(woodPanelFrontTexturePath, woodPaneRearTexturePath, woodPanelFrontColor, woodPanelRearColor);
    woodPanel.scale.set(1.001, 0.1, 1);
    woodPanel.rotation.y = -Math.PI;

    woodPanel.position.set(0, -0.11, 0.01);
    this.add(woodPanel);

  }
}
