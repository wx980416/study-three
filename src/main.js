import { World } from './World/World.js';

let world;

function main() {
  // 获取场景容器
  const container = document.querySelector('#scene-container');

  // 创建场景实例
  world = new World(container);

  // 渲染场景
  world.render();
}

document.querySelector('#render-cube-btn').addEventListener('click', () => {
  if (!world) {
    main();
  } else {
    alert('场景已渲染，请先销毁再渲染');
  }
});

main();
