import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

// Get a reference to the container element that will hold our scene
// zh: 选择一个容器元素来容纳我们的场景
const container = document.querySelector('#scene-container');

// create a Scene
// zh: 创建一个场景
const scene = new Scene();

// Set the background color
// zh: 设置背景颜色
scene.background = new Color('skyblue');

// Create a camera
// zh: 创建一个摄像机
const fov = 35; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new PerspectiveCamera(fov, aspect, near, far);

// every object is initially created at ( 0, 0, 0 )
// zh: 每个对象在 (0, 0, 0) 位置创建
// move the camera back so we can view the scene
// zh: 将摄像机移动到远处，以便查看场景
camera.position.set(0, 0, 10);

// create a geometry
// zh: 创建几何体
const geometry = new BoxGeometry(2, 2, 2);

// create a default (white) Basic material
// zh: 创建一个默认的（白色）基本材质
const material = new MeshBasicMaterial();

// create a Mesh containing the geometry and material
// zh: 创建一个包含几何体和材质的网格
const cube = new Mesh(geometry, material);

// add the mesh to the scene
// zh: 将网格添加到场景中
scene.add(cube);

// create the renderer
// zh: 创建渲染器
const renderer = new WebGLRenderer();

// next, set the renderer to the same size as our container element
// zh: 接下来，将渲染器的大小设置为容器元素的大小
renderer.setSize(container.clientWidth, container.clientHeight);

// finally, set the pixel ratio so that our scene will look good on HiDPI displays
// zh: 最后，设置像素比率，以便在高DPI显示器上看起来很好
renderer.setPixelRatio(window.devicePixelRatio);

// add the automatically created <canvas> element to the page
// zh: 将自动创建的<canvas>元素添加到页面中
container.append(renderer.domElement);

// render, or 'create a still image', of the scene
// zh: 渲染场景，或“创建静止图像”
renderer.render(scene, camera);
