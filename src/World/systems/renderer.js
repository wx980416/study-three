import { WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer();

  // turn on the physically correct lighting model
  // zh: 开启物理正确的光照模型
  renderer.physicallyCorrectLights = true;

  return renderer;
}

export { createRenderer };
