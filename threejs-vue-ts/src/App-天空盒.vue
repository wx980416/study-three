<template>
  <button @click="moveCamera">移动相机</button>
  <button @click="moveCube">移动物体</button>
  <div id="container">
    <!-- <nav>
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view /> -->
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui';

// 创建控制对象
const controlData = {
  rotationSpeed: 0.01,
  color: '#cccccc',
  wireframe: false,
};
// 创建实例
const gui = new dat.GUI();
const f = gui.addFolder('配置'); // 添加文件夹分隔

// 添加控制项
// f.add(controlData, 'rotationSpeed', 0, 0.1, 0.01); // 最小值，最大值，步长
f.add(controlData, 'rotationSpeed').min(0.01).max(0.1).step(0.01); // 最小值，最大值，步长
f.addColor(controlData, 'color'); // 添加颜色选择器
f.add(controlData, 'wireframe'); // 添加开关
f.domElement.id = 'gui'; // 设置样式
// 默认打开
f.open();

// 创建场景：场景是所有物体的容器
const scene = new THREE.Scene();
// 添加背景颜色
// scene.background = new THREE.Color(0x666666);

// 添加背景图片
// scene.background = new THREE.CubeTextureLoader()
//   .setPath('/')
//   .load(['01.jpg', '01.jpg', '01.jpg', '01.jpg', '01.jpg', '01.jpg']);

// 添加雾效
scene.fog = new THREE.Fog(0xcccccc, 10, 15); // 雾效是一种视觉效果，它使远处的物体变得模糊

// 创建相机：相机是用户眼睛
const camera = new THREE.PerspectiveCamera(); // 透视相机
// 调整相机位置
camera.position.z = 10; // 将相机向后移动10个单位
camera.position.y = 5; // 将相机向上移动5个单位

// 创建纹理
const texture = new THREE.TextureLoader().load('textures/02-map.jpg');

// 创建立体纹理
const cubeTexture = new THREE.CubeTextureLoader()
  .setPath('/textures/')
  .load(['04.jpg', '01.jpg', '05.jpg', '02.jpg', '06.jpg', '03.jpg']); // 右，左，上，下，前，后
// 添加背景纹理
scene.background = cubeTexture;

// 创建一个立方体：BoxGeometry 是一个立方体的几何体
// const geometry = new THREE.BoxGeometry();
// // 创建一个材质：MeshBasicMaterial是一种简单的材质，不受光照影响
// const material = new THREE.MeshBasicMaterial({
//   // color: 0x00ff00,
//   map: texture,
// });

// 创建一个球体
const geometry = new THREE.SphereGeometry(1); // 半径，水平分段数，垂直分段数
// 创建一个材质
const material = new THREE.MeshBasicMaterial({
  // color: 0x00ff00,
  envMap: cubeTexture,
});

// 创建一个立方体网格：Mesh是一个物体，它由几何体和材质组成
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 3, 0);
// 将立方体网格添加到场景中
scene.add(cube);

const moveCamera = () => {
  camera.position.z = 10;
  camera.position.y = 15;
  camera.lookAt(0, 3, 0);
};

const moveCube = () => {
  cube.position.set(3, 3, 0);
  camera.lookAt(cube.position);
};

onMounted(() => {
  // 创建渲染器：渲染器将场景和相机渲染到画布上
  const renderer = new THREE.WebGLRenderer();
  // 在页面中添加渲染器
  const container = document.getElementById('container');
  if (container) {
    container.appendChild(renderer.domElement);
    // 将 gui 添加到页面中
    container.appendChild(f.domElement);
  }

  // 设置渲染器的大小
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 添加网格地面
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);

  // 添加轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 监听事件
  controls.addEventListener('change', () => {
    // console.log('change');
  });
  // 添加阻尼
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  // 自动旋转
  controls.autoRotate = false;
  controls.autoRotateSpeed = 2.0;

  // 添加坐标轴
  const axesHelper = new THREE.AxesHelper(5);
  axesHelper.position.set(0, 3, 0);
  scene.add(axesHelper);

  // 调用渲染
  renderer.render(scene, camera);

  // 创建一个动画
  function animate() {
    requestAnimationFrame(animate); // requestAnimationFrame: 浏览器会在下一次重绘之前调用指定的回调函数
    // 使立方体网格旋转
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    cube.rotation.x += controlData.rotationSpeed;
    cube.rotation.y += controlData.rotationSpeed;
    // 修改颜色
    cube.material.color = new THREE.Color(controlData.color);
    // 修改线框
    material.wireframe = controlData.wireframe;

    // 调用渲染
    controls.update(); // 更新控制器
    renderer.render(scene, camera);
  }
  animate();
});
</script>
<style>
#gui {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
}
</style>
