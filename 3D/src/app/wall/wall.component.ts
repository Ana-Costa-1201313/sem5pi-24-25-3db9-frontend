import * as THREE from "three";

export default class WallComponent extends THREE.Group {
  constructor(frontTexturePath: string, rearTexturePath: string) {
    super();

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const frontTexture = textureLoader.load(frontTexturePath);
    const rearTexture = textureLoader.load(rearTexturePath);

    // Set texture properties (optional)
    [frontTexture, rearTexture].forEach(texture => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(5, 1); // Adjust these values for desired tiling
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
    });

    // Define materials with the loaded textures
    const frontMaterial = new THREE.MeshPhongMaterial({ color: 0xa1ddfc, map: frontTexture, side: THREE.DoubleSide });
    const rearMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, map: rearTexture, side: THREE.DoubleSide });

    // Create the front face
    const frontGeometry = new THREE.PlaneGeometry(0.95, 1.0);
    const frontFace = new THREE.Mesh(frontGeometry, frontMaterial);
    frontFace.position.set(0.0, 0.0, 0.025);
    frontFace.castShadow = true;
    frontFace.receiveShadow = true;
    this.add(frontFace);

    // Create the rear face
    const rearFace = new THREE.Mesh(frontGeometry, rearMaterial);
    rearFace.rotation.y = Math.PI;
    rearFace.position.set(0.0, 0.0, -0.025);
    rearFace.castShadow = true;
    rearFace.receiveShadow = true;
    this.add(rearFace);

    // Define a single material for the other faces (you can change this if each side needs a unique texture)
    const sideMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, map: frontTexture, side: THREE.DoubleSide });

    // Create the left face
    const sideGeometry = new THREE.PlaneGeometry(0.05, 1.0);
    const leftFace = new THREE.Mesh(sideGeometry, sideMaterial);
    leftFace.position.set(-0.475, 0.0, 0.0);
    leftFace.rotation.y = Math.PI / 2;
    leftFace.castShadow = true;
    leftFace.receiveShadow = true;
    this.add(leftFace);

    // Create the right face
    const rightFace = new THREE.Mesh(sideGeometry, sideMaterial);
    rightFace.position.set(0.475, 0.0, 0.0);
    rightFace.rotation.y = -Math.PI / 2;
    rightFace.castShadow = true;
    rightFace.receiveShadow = true;
    this.add(rightFace);

    // Create the top face
    const topGeometry = new THREE.PlaneGeometry(0.95, 0.05);
    const topFace = new THREE.Mesh(topGeometry, sideMaterial);
    topFace.position.set(0.0, 0.5, 0.0);
    topFace.rotation.x = Math.PI / 2;
    topFace.castShadow = true;
    topFace.receiveShadow = true;
    this.add(topFace);

    // Create the bottom face
    const bottomFace = new THREE.Mesh(topGeometry, sideMaterial);
    bottomFace.position.set(0.0, -0.5, 0.0);
    bottomFace.rotation.x = -Math.PI / 2;
    bottomFace.castShadow = true;
    bottomFace.receiveShadow = true;
    this.add(bottomFace);
  }
}
