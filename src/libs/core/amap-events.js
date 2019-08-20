/**
 * 事件名称，带下划线的表示内部使用
 */
const EventName = {
  // 内部更新事件
  __UPDATE__: '__UPDATE__',
  // 高德地图插件加载完毕，第一次绘制完成
  INIT: 'init',
  // 地图移动、缩放的重绘事件
  RENDER: 'render',
  // 调用 setOption 方法
  UPDATE: 'update',
  // 调用 dispose 方法
  DESTROY: 'destroy'
}

export default EventName
