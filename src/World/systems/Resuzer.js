class Resizer {
  constructor(container, camera, renderer) {
    // Set the camera's aspect ratio
    // zh: 设置相机的纵横比
    camera.aspect = container.clientWidth / container.clientHeight;

    // update the camera's frustum
    // zh: 调整相机视锥体
    camera.updateProjectionMatrix();

    // zh: 设置渲染器的尺寸
    renderer.setSize(container.clientWidth, container.clientHeight);

    // zh: 设置渲染器的分辨率
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}

export { Resizer };
