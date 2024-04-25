<script setup lang="ts">
import { onMounted } from 'vue';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color('#ccc');

// 创建相机
const camera = new THREE.PerspectiveCamera();
camera.position.set(0, 5, 10);

// 添加坐标辅助线
const axesHelper = new THREE.AxesHelper(5);
axesHelper.position.set(0, 3, 0);
scene.add(axesHelper);

// 添加网格地面
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// 创建环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 创建主光源
const mainLight = new THREE.DirectionalLight('white', 2);
mainLight.position.set(10, 10, 10);
scene.add(mainLight);

// 创建立方体、材质
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 3, 0);
scene.add(cube);

// 加载模型
const loader = new GLTFLoader();

const loadBirds = async () => {
  const parrotData = await loader.loadAsync('/models/Parrot.glb');
  const model = parrotData.scene.children[0];
  model.position.set(3, 3, 0);
  scene.add(model);
};

onMounted(() => {
  loadBirds();
  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({
    antialias: false,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  const container = document.getElementById('container') as HTMLDivElement;
  container.appendChild(renderer.domElement);

  // 创建控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 开启阻尼

  // 创建动画
  const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    // 调整相机视锥体
    camera.updateProjectionMatrix();
    // 设置渲染器的尺寸
    renderer.setSize(container.clientWidth, container.clientHeight);
    // 设置渲染器的分辨率 1.0表示设备像素比
    renderer.setPixelRatio(window.devicePixelRatio);
  });
});
</script>

<template>
  <div id="container"></div>
</template>

<style scoped lang="scss"></style>
