const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const geometry = new THREE.CylinderGeometry(5, 10, 10, 20);
const material = new THREE.MeshBasicMaterial({
  color: 0xf0ff00,
  wireframe: true,
});
const cylinder = new THREE.Mesh(geometry, material);

scene.add(cylinder);
camera.position.z = 10;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
  cylinder.rotation.x += 0.01;
  cylinder.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
