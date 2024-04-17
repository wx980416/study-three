import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshPhongMaterial,
} from 'three';

function createCube() {
  const geometry = new BoxGeometry(2, 2, 2);

  // const material = new MeshBasicMaterial();
  const material = new MeshStandardMaterial({
    color: 'blue',
  });

  const cube = new Mesh(geometry, material);

  cube.position.set(0, 0, 0);
  cube.rotation.set(-0.5, -0.1, 0.8);
  cube.scale.set(1, 1, 1);

  return cube;
}

export { createCube };
