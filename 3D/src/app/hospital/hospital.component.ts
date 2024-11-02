import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, } from '@angular/core';
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
import { thickness } from 'three/webgpu';
import InteriorWallComponent from '../interior-wall/interior-wall.component';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements AfterViewInit {

  @ViewChild('myCanvas')
  private canvasRef!: ElementRef;

  //stage properties
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

  //
  //ORBIT ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //
  private controls!: OrbitControls;
  private stats!: Stats;
  //
  //ORBIT ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //


  private getAspectRatio(): number {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  //createing the scene
  private createScene(): void {
    //scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0099ff);


    var floor = new FloorComponent();
    this.scene.add(floor);
    //var table = new TableComponent();
    //this.scene.add(table);

    //const gltfLoader = new GLTFLoader();
    //gltfLoader.load('./assets/shiba/scene.gltf', (gltfScene) => {
    //  gltfScene.scene.scale.set(10, 10, 10);
    //  gltfScene.scene.position.set(0, 10, 0);
    //  this.scene.add(gltfScene.scene);
    //});

    var shiba = new ShibaComponent();

    this.scene.add(shiba);

    var table = new TableComponent();
    this.scene.add(table);

    var human = new HumanComponent();
    this.scene.add(human);

    var door = new DoorComponent();
    //door.rotation.y = Math.PI / 9;  // Rotate 90 degrees to lay flat
    this.scene.add(door);

    var tools = new InstrumentsComponent();
    this.scene.add(tools);

    var wall = new InteriorWallComponent();
    wall.position.x = 29.5;
    wall.position.y = 15;
    wall.position.z = 25;
    wall.scale.set(20, 30, 20);
    this.scene.add(wall);

    var wall1 = new InteriorWallComponent();
    wall1.rotation.y = Math.PI/2;  // Rotate 90 degrees to lay flat
    wall1.position.set(0,0,0);
    wall1.scale.set(60, 30, 20);
    wall1.position.x = 38.6;
    wall1.position.y = 15;
    wall1.position.z = -3.2;
    this.scene.add(wall1);

    var wall2 = new InteriorWallComponent();
    wall2.rotation.y = -Math.PI/2;  // Rotate 90 degrees to lay flat
    wall2.position.set(0,0,0);
    wall2.scale.set(60, 30, 20);
    wall2.position.x = -25;
    wall2.position.y = 15;
    wall2.position.z = -3.2;
    this.scene.add(wall2);

    var wall3 = new InteriorWallComponent();
    wall3.rotation.y = -Math.PI;  // Rotate 90 degrees to lay flat
    wall3.position.set(0,0,0);
    wall3.scale.set(67.5, 30, 20);
    wall3.position.x = 6.8;
    wall3.position.y = 15;
    wall3.position.z = -31.5;
    this.scene.add(wall3);

    var wall4 = new InteriorWallComponent();
    wall4.position.x = -9.7;
    wall4.position.y = 15;
    wall4.position.z = 25;
    wall4.scale.set(33, 30, 20);
    this.scene.add(wall4);


    var wall5 = new WallComponent("./assets/textures/wall1.png", "./assets/textures/whitefloor.png");
    wall5.position.x = 13;
    wall5.position.y = 27.27;
    wall5.position.z = 25;
    wall5.scale.set(15, 5.45, 20);
    wall5.rotation.z = -Math.PI;  // Rotate 90 degrees to lay flat
    this.scene.add(wall5);




    //
    // LIGHT->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Ambient light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional light
    directionalLight.position.set(10, 10, 20);
    directionalLight.castShadow = true; // Enable shadow casting

    directionalLight.shadow.mapSize.width = 1024; // Default is 512
    directionalLight.shadow.mapSize.height = 1024; // Default is 512

    // Optional: Control the shadow camera's size
    directionalLight.shadow.camera.near = 0.5; // Default is 0.5
    directionalLight.shadow.camera.far = 50;   // Default is 500
    directionalLight.shadow.camera.left = -10;  // Default is -5
    directionalLight.shadow.camera.right = 10;   // Default is 5
    directionalLight.shadow.camera.top = 10;     // Default is 5
    directionalLight.shadow.camera.bottom = -10; // Default is -5


    this.scene.add(ambientLight);
    this.scene.add(directionalLight);

    //
    // LIGHT->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //

  }

  private render() {

    //
    //ORBIT ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //
    //this.stats.update();
    this.controls.update();
    //
    //ORBIT ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //

    //renderer
    requestAnimationFrame(() => this.render());
    //this.animateCube();
    this.renderer.render(this.scene, this.camera);
  }

  private renderScene() {

    //camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.set(20, 50, 50);

    // Ensure the camera is looking at the center of the scene
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));


    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    //
    // LIGHT->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //
    this.renderer.shadowMap.enabled = true; // Enable shadow maps
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optionally set shadow map type
    //
    // LIGHT->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //


    //
    //ORBIT ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,       // Left mouse button pans
      MIDDLE: THREE.MOUSE.DOLLY,    // Middle mouse button zooms
      RIGHT: THREE.MOUSE.ROTATE     // Right mouse button rotates (orbits)
    };
    //this.stats = new Stats();
    //document.body.appendChild(this.stats.dom);
    //
    //ORBIT ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //

    this.render();
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.renderScene();
  }
}