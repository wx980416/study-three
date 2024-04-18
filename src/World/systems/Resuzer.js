const setSize = (container, camera, renderer) => {
  // Set the camera's aspect ratio
  // zh: 设置相机的纵横比
  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  // zh: 调整相机视锥体
  camera.updateProjectionMatrix();

  // zh: 设置渲染器的尺寸
  renderer.setSize(container.clientWidth, container.clientHeight);

  // zh: 设置渲染器的分辨率 1.0表示设备像素比
  renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
  constructor(container, camera, renderer) {
    // set initial size on load
    setSize(container, camera, renderer);

    window.addEventListener('resize', () => {
      setSize(container, camera, renderer);
      // perform any custom actions
      this.onResize();
    });
  }

  onResize() {}
}

export { Resizer };
