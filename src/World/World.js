import { createCamera } from './components/camera.js';
import { createAxesHelper, createGridHelper } from './components/helpers.js';
import { createCube } from './components/cube.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { createMeshGroup } from './components/meshGroup.js';
import { Train } from './components/Train/Train.js';
import { loadBirds } from './components/birds/birds.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resuzer.js';
import { Loop } from './systems/Loop.js';

// 这里的变量是模块范围的，不能从外部访问
let camera;
let scene;
let renderer;
let loop;
let controls;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    controls = createControls(camera, renderer.domElement);
    const cube = createCube();
    // const light = createLights();
    const { ambientLight, mainLight } = createLights();
    const meshGroup = createMeshGroup();
    const train = new Train();

    // loop.updatables.push(cube, camera);
    // loop.updatables.push(controls, meshGroup);
    loop.updatables.push(controls, train);
    scene.add(ambientLight, mainLight);
    // scene.add(cube, ambientLight, mainLight);
    // scene.add(meshGroup, ambientLight, mainLight);
    // scene.add(train, ambientLight, mainLight);

    const resizer = new Resizer(container, camera, renderer);
    // 现在循环正在运行，每当我们调整窗口大小时，都会在循环的下一次迭代中生成一个新帧。
    // 这足够快，您不会注意到任何延迟，因此我们不再需要在调整大小时手动重绘场景。
    // resizer.onResize = () => {
    //   this.render();
    // };

    scene.add(createAxesHelper(), createGridHelper());
  }

  async init() {
    // asynchronous setup here
    // load bird models
    const { parrot, flamingo, stork } = await loadBirds();

    controls.target.copy(parrot.position);

    scene.add(parrot, flamingo, stork);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
