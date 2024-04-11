<script setup lang="ts">
import { onMounted } from 'vue';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x666666);

// 创建相机
const camera = new THREE.PerspectiveCamera();
camera.position.z = 10;
camera.position.y = 5;

// 添加坐标辅助线
const axesHelper = new THREE.AxesHelper(5);
// axesHelper.position.set(0, 3, 0);
scene.add(axesHelper);

// 添加网格地面
const gridHelper = new THREE.GridHelper(10, 10);
// scene.add(gridHelper);

// 创建立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// cube.position.set(0, 3, 0);
scene.add(cube);

onMounted(() => {
  // 创建渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  const container = document.getElementById('container');
  if (container) {
    container.appendChild(renderer.domElement);
  }

  // 创建控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 添加阻尼
  controls.enableDamping = true;

  // 创建动画
  const animate = () => {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    // 调用渲染
    controls.update(); // 更新控制器
    renderer.render(scene, camera);
  };
  animate();
});
</script>

<template>
  <div id="container"></div>
</template>

<style scoped lang="scss"></style>
