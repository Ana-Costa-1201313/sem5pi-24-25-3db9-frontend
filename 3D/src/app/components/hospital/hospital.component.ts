import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Appointment } from '../../model/appointment.model';
import { AppointmentService } from '../../service/appointment.service';
import {
  doorData,
  hospitalFloorData,
  humanData,
  lampData,
  roomFloorData,
  tableData,
  wallData,
  wallWoodPanelData,
} from '../defaul-data/defaul-data.component';
import FloorComponent from '../floor/floor.component';
import RoomComponent from '../room/room.component';
import { SpriteComponent } from '../sprite/sprite.component';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
})
export class HospitalComponent implements OnInit {
  @ViewChild('myCanvas') private canvasRef!: ElementRef;
  private rooms: RoomComponent[] = [];
  apList: Appointment[] = [];

  private renderer!: THREE.WebGLRenderer;
  private scene: THREE.Scene = new THREE.Scene();
  private camera!: THREE.PerspectiveCamera;
  private camera2!: THREE.PerspectiveCamera;
  private controls1!: OrbitControls;
  private controls2!: OrbitControls;
  private activeControls!: OrbitControls;

  roomsJson: any;

  // Stage properties
  @Input() public cameraZ: number = 20;
  @Input() public fieldOfView: number = 30;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 10000;

  private toggleControl(): void {
    if (this.activeControls === this.controls1) {
      this.controls1.enabled = false; 
      this.controls2.enabled = true;  
      this.activeControls = this.controls2;
    } else {
      this.controls2.enabled = false; 
      this.controls1.enabled = true;  
      this.activeControls = this.controls1;
    }
  }

  private setupControls(): void {
    // Controls for the first camera
    this.controls1 = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls1.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE,
    };
    this.controls1.enableDamping = true;
    this.controls1.dampingFactor = 0.1;

    // Controls for the second camera
    this.controls2 = new OrbitControls(this.camera2, this.renderer.domElement);
    this.controls2.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE,
    };
    this.controls2.enableDamping = true;
    this.controls2.dampingFactor = 0.1;

    // Default active camera and controls
    this.controls1.enabled = true;
    this.controls2.enabled = false;

    this.activeControls = this.controls1;
  }

  //helper
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private getAspectRatio(): number {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  // Creating the scene
  private createScene(): void {
    this.scene.background = new THREE.Color(0x89cff0);

    var size = 0;

    if (this.roomsJson && this.roomsJson.rooms) {
      this.roomsJson.rooms.forEach((roomData: any, index: number) => {
        const isRoomOccupied = this.apList.some(
          (appointment) =>
            String(appointment.surgeryRoomNumber) === String(roomData.name)
        );

        const room = new RoomComponent(
          roomFloorData.texturePath,
          roomFloorData.floorWidth,
          roomFloorData.floorDepth,
          tableData.modelPath,
          humanData.modelPath,
          doorData.audioOpenPath,
          doorData.audioClosePath,
          doorData.modelPath,
          lampData.audioPath,
          lampData.modelPath,
          wallData.frontTexturePath,
          wallData.rearTexturePath,
          wallData.frontColor,
          wallData.rearColor,
          wallWoodPanelData.frontTexturePath,
          wallWoodPanelData.rearTexturePath,
          wallWoodPanelData.frontColor,
          wallWoodPanelData.rearColor,
          isRoomOccupied,
          roomData.name
        );

        size++;

        room.position.set(index * 85, 0, 0);
        const sprite = new SpriteComponent(room.roomName);
        sprite.position.set(index * 85, 0, 0);
        this.scene.add(sprite);

        this.scene.add(room);
        this.rooms.push(room);

        const floor3 = new FloorComponent(
          hospitalFloorData.texturePath,
          hospitalFloorData.floorWidth,
          hospitalFloorData.floorDepth
        );
        floor3.position.set(7 + 85 * index, -0.01, 0);
        this.scene.add(floor3);
      });

      setTimeout(() => {
        this.updateCamera2Position();
      }, 100);
    }

    // Setup lights
    this.setupLights();
  }

  private updateCamera2Position(): void {
    if (this.rooms.length > 0) {
      const lastRoom = this.rooms[this.rooms.length - 1];

      this.camera2.position.set(
        lastRoom.position.x + 160,
        60,
        lastRoom.position.z + 100
      );
      this.camera2.lookAt(lastRoom.position);
    }
  }

  private setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(500, 500, 500);
    //shadow inactive
    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 2000;
    directionalLight.shadow.camera.left = -500;
    directionalLight.shadow.camera.right = 500;
    directionalLight.shadow.camera.top = 500;
    directionalLight.shadow.camera.bottom = -500;

    this.scene.add(ambientLight);
    this.scene.add(directionalLight);
  }

  private render() {
    requestAnimationFrame(() => this.render());

    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.activeControls.update();

    this.renderer.setViewport(0, 0, width, height);
    this.renderer.setScissor(0, 0, width, height);
    this.renderer.setScissorTest(true);
    this.renderer.render(this.scene, this.camera);

    const smallViewportWidth = width / 4;
    const smallViewportHeight = height / 4;
    const offsetX = width - smallViewportWidth;

    this.renderer.setViewport(
      offsetX,
      0,
      smallViewportWidth,
      smallViewportHeight
    );
    this.renderer.setScissor(
      offsetX,
      0,
      smallViewportWidth,
      smallViewportHeight
    );
    this.renderer.setScissorTest(true);
    this.renderer.render(this.scene, this.camera2);
  }

  private renderScene() {
    const aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.set(-160, 60, 100);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.camera2 = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera2.position.set(100, 140, 100);
    this.camera2.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.setupControls();



    this.render();
  }

  private handleRoomClick(event: MouseEvent) {
    for (const room of this.rooms) {
      const interactionHandled = room.onRoomClick(event, this.camera);
      if (interactionHandled) {
        break;
      }
    }
  }

  constructor(private service: AppointmentService) { }

  ngOnInit(): void {


    this.service.getAppointmentList('2024-12-11').subscribe((ap) => {
      this.apList = ap;
    });

    fetch('/assets/json/rooms.json')
      .then((response) => response.json())
      .then((data) => {
        this.roomsJson = data;

        this.createScene();
        this.renderScene();
        window.addEventListener('click', (event) =>
          this.handleRoomClick(event)
        );

        window.addEventListener('keydown', (event) => {
          if (event.key === 'c') {
            this.toggleControl(); // Switch camera controls
          }
        });

      })
      .catch((error) => {
        console.error('Error loading rooms data:', error);
      });
  }
}
