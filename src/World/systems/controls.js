import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  controls.enableDamping = true; // zh: 开启阻尼
  // controls.listenToKeyEvents(window);
  controls.minDistance = 5;
  controls.maxDistance = 20;
  controls.tick = () => {
    controls.update();
  };

  return controls;
}

export { createControls };
