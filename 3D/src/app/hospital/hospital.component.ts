import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as THREE from "three";
import FloorComponent from '../floor/floor.component';
import { TableComponent } from '../table/table.component';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { ShibaComponent } from '../shiba/shiba.component';
import { HumanComponent } from '../human/human.component';
import { DoorComponent } from '../door/door.component';
import { InstrumentsComponent } from '../instruments/instruments.component';
import WallComponent from '../wall/wall.component';
import InteriorWallComponent from '../interior-wall/interior-wall.component';
import { LampComponent } from '../lamp/lamp.component';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements AfterViewInit {
  @ViewChild('myCanvas') private canvasRef!: ElementRef;

  // Stage properties
  @Input() public cameraZ: number = 20;
  @Input() public fieldOfView: number = 30;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  //helper
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private renderer!: THREE.WebGLRenderer;
  private scene: THREE.Scene = new THREE.Scene();
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;

  private getAspectRatio(): number {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  // Creating the scene
  private createScene(): void {
    this.scene.background = new THREE.Color(0x0099ff);
    const floor = new FloorComponent();
    this.scene.add(floor);

    const shiba = new ShibaComponent();
    this.scene.add(shiba);

    const table = new TableComponent();
    this.scene.add(table);

    const human = new HumanComponent();
    this.scene.add(human);

    const door = new DoorComponent();
    this.scene.add(door);

    const lamp = new LampComponent();
    this.scene.add(lamp);

    // Add click event for the door
    window.addEventListener('click', (event) => {
      this.onDoorClick(event, door);
    });

    window.addEventListener('click', (event) => {
      this.onShibaClick(event, shiba);
    });

    // Add click event for the lamp
    window.addEventListener('click', (event) => {
      this.onLampClick(event, lamp);
    });


    const tools = new InstrumentsComponent();
    this.scene.add(tools);

    this.addWalls();

    // Setup lights
    this.setupLights();
  }

  private onDoorClick(event: MouseEvent, door: DoorComponent) {
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const intersects = raycaster.intersectObject(door.pivot, true);
    if (intersects.length > 0) {
      if (door.isOpen) {
        door.close();
      } else {
        door.open();
      }
    }
  }

  private onShibaClick(event: MouseEvent, shiba: ShibaComponent) {
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const intersects = raycaster.intersectObject(shiba, true);
    if (intersects.length > 0) {
      shiba.playClickSound();
    }
  }

  private onLampClick(event: MouseEvent, lamp: LampComponent) {
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    // Use intersectObjects to check all children of the lamp
    const intersects = raycaster.intersectObjects(lamp.children, true);
    if (intersects.length > 0) {
      lamp.toggleLight(); // Call toggleLight to turn the lamp on or off
    }
  }

  private addWalls() {
    const wall = new InteriorWallComponent();
    wall.position.set(29.5, 15, 25);
    wall.scale.set(20, 30, 20);
    this.scene.add(wall);

    const wall1 = new InteriorWallComponent();
    wall1.rotation.y = Math.PI / 2;  // Rotate 90 degrees
    wall1.position.set(38.6, 15, -3.2);
    wall1.scale.set(60, 30, 20);
    this.scene.add(wall1);

    const wall2 = new InteriorWallComponent();
    wall2.rotation.y = -Math.PI / 2;  // Rotate 90 degrees
    wall2.position.set(-25, 15, -3.2);
    wall2.scale.set(60, 30, 20);
    this.scene.add(wall2);

    const wall3 = new InteriorWallComponent();
    wall3.rotation.y = -Math.PI;  // Rotate 180 degrees
    wall3.position.set(6.8, 15, -31.5);
    wall3.scale.set(67.5, 30, 20);
    this.scene.add(wall3);

    const wall4 = new InteriorWallComponent();
    wall4.position.set(-9.7, 15, 25);
    wall4.scale.set(33, 30, 20);
    this.scene.add(wall4);

    const wall5 = new WallComponent("./assets/textures/wall1.png", "./assets/textures/whitefloor.png");
    wall5.position.set(13, 27.27, 25);
    wall5.scale.set(15, 5.45, 20);
    wall5.rotation.z = -Math.PI;  // Rotate 90 degrees
    this.scene.add(wall5);
  }

  private setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 20);
    //shadow inactive
    directionalLight.castShadow = false;

    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;

    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;

    this.scene.add(ambientLight);
    this.scene.add(directionalLight);
  }

  private render() {
    this.controls.update();
    requestAnimationFrame(() => this.render());
    this.renderer.render(this.scene, this.camera);
  }

  private renderScene() {
    const aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.set(20, 50, 50);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE
    };

    this.render();
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.renderScene();
  }
}
