import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);

  camera.position.set(0, 0, 10);

  camera.tick = (delta) => {
    // if (camera.position.z < 20) {
    //   camera.position.z += 0.1;
    // }
  };

  return camera;
}

export { createCamera };
