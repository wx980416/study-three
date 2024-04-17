import { DirectionalLight, PointLight } from 'three';

function createLights() {
  // Create a directional light
  // zh: 创建一个平行光
  const light = new DirectionalLight('white', 8);

  // move the light right, up, and towards us
  // zh: 向右、上方、远离摄像机
  light.position.set(10, 10, 10);

  return light;
}

export { createLights };
