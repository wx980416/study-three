import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resuzer.js';
import { Loop } from './systems/Loop.js';

// 这里的变量是模块范围的，不能从外部访问
let camera;
let scene;
let renderer;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const controls = createControls(camera, renderer.domElement);
    const cube = createCube();
    // const light = createLights();
    const { ambientLight, mainLight } = createLights();

    // loop.updatables.push(cube, camera);
    loop.updatables.push(controls);

    scene.add(cube, ambientLight, mainLight);

    const resizer = new Resizer(container, camera, renderer);
    // 现在循环正在运行，每当我们调整窗口大小时，都会在循环的下一次迭代中生成一个新帧。
    // 这足够快，您不会注意到任何延迟，因此我们不再需要在调整大小时手动重绘场景。
    // resizer.onResize = () => {
    //   this.render();
    // };
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
