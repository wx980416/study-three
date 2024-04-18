import { DirectionalLight, AmbientLight, HemisphereLight } from 'three';

function createLights() {
  // Create a directional light
  // zh: 创建一个平行光
  // const light = new DirectionalLight('white', 8);
  // const ambientLight = new AmbientLight('white', 2);
  const ambientLight = new HemisphereLight(
    'white', // bright sky color
    'darkslategrey', // dim ground color
    5, // intensity
  );

  const mainLight = new DirectionalLight('white', 5);
  mainLight.position.set(10, 10, 10);

  // move the light right, up, and towards us
  // zh: 向右、上方、远离摄像机
  // light.position.set(10, 10, 10);

  // return light;
  return {
    ambientLight,
    mainLight,
  };
}

export { createLights };
