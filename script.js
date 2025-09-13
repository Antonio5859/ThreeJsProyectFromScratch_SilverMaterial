// Configuracion basica de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz ambiental suave
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // color, intensidad
scene.add(ambientLight);

// Luz direccional que proyecta sombras
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Crea un cubo
const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00aaff });
const material = new THREE.MeshStandardMaterial({ 
    color: 0xaaaaaa,    // Light gray base
    metalness: 1,         // No metal yet
    roughness: 0.5       // Very rough surface
    envMap: envMap
 });
const loader = new THREE.CubeTextureLoader();
const envMap = loader.load([
    'https://threejs.org/examples/textures/cube/Bridge2/posx.jpg',
    'https://threejs.org/examples/textures/cube/Bridge2/negx.jpg',
    'https://threejs.org/examples/textures/cube/Bridge2/posy.jpg',
    'https://threejs.org/examples/textures/cube/Bridge2/negy.jpg',
    'https://threejs.org/examples/textures/cube/Bridge2/posz.jpg',
    'https://threejs.org/examples/textures/cube/Bridge2/negz.jpg'
]);
scene.background = envMap;

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Animacion
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Ajusta el tamaño al cambiar la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
    renderer.setSize(window.innerWidth, window.innerHeight);