import { World } from './World/World.js';

let world;

async function main() {
  // 获取场景容器
  const container = document.querySelector('#scene-container');

  // 创建场景实例
  world = new World(container);

  // 渲染场景
  // produce a single frame (render on demand)
  // zh: 立即渲染一次场景
  // world.render();

  await world.init();

  // start the loop (produce a stream of frames)
  // zh: 开始渲染循环
  world.start();
}

document.querySelector('#render-cube-btn').addEventListener('click', () => {
  if (!world) {
    main();
  } else {
    alert('场景已渲染，请先销毁再渲染');
  }
});

main().catch((error) => console.error(error));
