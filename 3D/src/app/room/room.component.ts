import * as THREE from "three";
import WallComponent from "../wall/wall.component";
import InteriorWallComponent from "../interior-wall/interior-wall.component";
import FloorComponent from "../floor/floor.component";
import { ShibaComponent } from "../shiba/shiba.component";
import { TableComponent } from "../table/table.component";
import { DoorComponent } from "../door/door.component";
import { LampComponent } from "../lamp/lamp.component";
import { InstrumentsComponent } from "../instruments/instruments.component";

export default class RoomComponent extends THREE.Group {

  private door: DoorComponent;
  private shiba: ShibaComponent;
  private lamp: LampComponent;
  public table: TableComponent;

  constructor() {
    super();

    const floor = new FloorComponent();
    this.add(floor);

    this.shiba = new ShibaComponent();
    this.add(this.shiba);

    this.table = new TableComponent();
    //this.table.addHuman();
    this.add(this.table);

    this.door = new DoorComponent();
    this.add(this.door);

    this.lamp = new LampComponent();
    this.add(this.lamp);

    const tools = new InstrumentsComponent();
    this.add(tools);

    this.addWalls();

  }

  public onRoomClick(event: MouseEvent, camera: THREE.PerspectiveCamera) {
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Check for door interaction
    const doorIntersects = raycaster.intersectObject(this.door.pivot, true);
    if (doorIntersects.length > 0) {
      this.door.isOpen ? this.door.close() : this.door.open();
      return true; // Stop here if door is clicked to avoid triggering other actions
    }

    // Check for shiba interaction
    const shibaIntersects = raycaster.intersectObject(this.shiba, true);
    if (shibaIntersects.length > 0) {
      this.shiba.playClickSound();
      return true;
    }

    // Check for lamp interaction
    const lampIntersects = raycaster.intersectObjects(this.lamp.children, true);
    if (lampIntersects.length > 0) {
      this.lamp.toggleLight();
      return true;
    }
    return false;
  }



  private addWalls() {
    const wall = new InteriorWallComponent();
    wall.position.set(29.5, 15, 25);
    wall.scale.set(20, 30, 20);
    this.add(wall);

    const wall1 = new InteriorWallComponent();
    wall1.rotation.y = Math.PI / 2;  // Rotate 90 degrees
    wall1.position.set(38.6, 15, -3.2);
    wall1.scale.set(60, 30, 20);
    this.add(wall1);

    const wall2 = new InteriorWallComponent();
    wall2.rotation.y = -Math.PI / 2;  // Rotate 90 degrees
    wall2.position.set(-25, 15, -3.2);
    wall2.scale.set(60, 30, 20);
    this.add(wall2);

    const wall3 = new InteriorWallComponent();
    wall3.rotation.y = -Math.PI;  // Rotate 180 degrees
    wall3.position.set(6.8, 15, -31.5);
    wall3.scale.set(67.5, 30, 20);
    this.add(wall3);

    const wall4 = new InteriorWallComponent();
    wall4.position.set(-9.7, 15, 25);
    wall4.scale.set(33, 30, 20);
    this.add(wall4);

    const wall5 = new WallComponent("./assets/textures/wall1.png", "./assets/textures/whitefloor.png");
    wall5.position.set(13, 27.27, 25);
    wall5.scale.set(15, 5.45, 20);
    wall5.rotation.z = -Math.PI;  // Rotate 90 degrees
    this.add(wall5);
  }
}
