const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);
camera.position.z = 12;
camera.position.y = 0;

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const galleryGroup = new THREE.Group();
scene.add(galleryGroup);

const radius = 6;
const height = 30;
const segments = 30;

const cylinderGeometry = new THREE. CyliderGeometry(
    radius ,
    radius ,
    height,
    segments ,
    1,
    true);
const cylinderMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
});

const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
galleryGroup.add(cylinder);
const textureLoader = new THREE.TextureLoader();

function getRandomImage() {
  return Math.floor(Math.random() * 50) + 1;
}

function loadImageTexture(imageNumber) {
  return new Promise((resolve) => {
    const texture = textureLoader.load(
      `assets/img${imageNumber}.jpg`,
      (loadedTexture) => {
        loadedTexture.generateMipmaps = true;
        loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
        // loadedTexture.
        resolve(loadedTexture);
      }
    );
  });
}