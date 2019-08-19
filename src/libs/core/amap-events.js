/**
 * 事件名称，带下划线的表示内部使用
 */
const EventNames = {
  // 内部重绘监听
  __REDENER__: '__reRedener__',
  // 高德地图插件加载完毕，第一次绘制完成
  INIT: 'init',
  // 地图移动、缩放、__REDENER__ 事件导致的重绘事件
  REDENER: 'redener',
  // 调用 setOption 方法
  UPDATE: 'update',
  // 调用 dispose 方法
  DESTROY: 'destroy'
}

export default EventNames
