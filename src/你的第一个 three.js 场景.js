// 从 three.js 中导入类
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
// cn: 选择一个容器元素来容纳我们的场景
const container = document.querySelector('#scene-container');

// create a Scene
// cn: 创建一个场景
const scene = new Scene();

// Set the background color
// cn: 设置背景颜色
scene.background = new Color('#000000');

// Create a camera
// cn: 创建一个摄像机
const fov = 35; // AKA Field of View  视野：相机的视野有多宽，以度为单位。
const aspect = container.clientWidth / container.clientHeight; // 纵横比：场景的宽度与高度的比率。
const near = 0.1; // the near clipping plane 近剪裁平面：任何比这更靠近相机的东西都是不可见的。
const far = 100; // the far clipping plane 远剪裁平面：任何比这更远离相机的东西都是不可见的。

const camera = new PerspectiveCamera(fov, aspect, near, far);

// every object is initially created at ( 0, 0, 0 )
// cn: 每个对象在 (0, 0, 0) 位置创建
// move the camera back so we can view the scene
// cn: 将摄像机移动到远处，以便查看场景
camera.position.set(0, 0, 10);
// 也可以单独设置
// camera.position.y = 10

// create a geometry
// cn: 创建几何体
const geometry = new BoxGeometry(2, 2, 2);

// create a default (white) Basic material
// cn: 创建一个默认的（白色）基本材质
const material = new MeshBasicMaterial();

// create a Mesh containing the geometry and material
// cn: 创建一个包含几何体和材质的网格
const cube = new Mesh(geometry, material);

// add the mesh to the scene
// cn: 将网格添加到场景中
scene.add(cube);

// create the renderer
// cn: 创建渲染器
const renderer = new WebGLRenderer();

// next, set the renderer to the same size as our container element
// cn: 接下来，将渲染器的大小设置为容器元素的大小
renderer.setSize(container.clientWidth, container.clientHeight);

// finally, set the pixel ratio so that our scene will look good on HiDPI displays
// cn: 最后，设置像素比率，以便在高DPI显示器上看起来很好
renderer.setPixelRatio(window.devicePixelRatio);

// add the automatically created <canvas> element to the page
// cn: 将自动创建的<canvas>元素添加到页面中
container.append(renderer.domElement);

// render, or 'create a still image', of the scene
// cn: 渲染场景，或“创建静止图像”
renderer.render(scene, camera);
