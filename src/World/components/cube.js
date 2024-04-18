import {
  BoxGeometry,
  SphereGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshPhongMaterial,
  MathUtils,
  TextureLoader,
} from 'three';

function createMaterial() {
  // create a texture loader.
  const textureLoader = new TextureLoader();

  // load a texture
  const texture = textureLoader.load('/assets/textures/uv-test-bw.png');
  // const texture = textureLoader.load('/assets/textures/uv-test-col.png');

  // create a "standard" material
  // const material = new MeshStandardMaterial({ color: 'purple' });
  const material = new MeshStandardMaterial({ map: texture });

  return material;
}

function createCube() {
  const geometry = new BoxGeometry(2, 2, 2);
  // const geometry = new SphereGeometry(2);

  // const material = new MeshBasicMaterial();
  const material = new createMaterial();

  const cube = new Mesh(geometry, material);

  cube.rotation.set(-0.5, -0.1, 0.8);
  // cube.position.set(0, 0, 0);
  // cube.scale.set(1, 1, 1);

  // 在不同帧率下都选择30度的旋转速度
  const radiansPerSecond = MathUtils.degToRad(30);

  // this method will be called once per frame
  // zh:   这个方法将会在每一帧被调用一次
  cube.tick = (delta) => {
    // increase the cube's rotation each frame
    // zh:   增大立方体的旋转速度
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  return cube;
}

export { createCube };
