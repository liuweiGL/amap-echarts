import EventName from '../core/amap-events'
import PluginBase, { PluginType } from './base'

/**
 * 自动显示或隐藏 `echarts` 图表
 */
export default class AutoVisible extends PluginBase {
  in(zoom, zooms) {
    return zoom >= zooms[0] && zoom < zooms[1]
  }

  getType() {
    return PluginType.INIT
  }

  apply(instance) {
    let map = instance.getMap()
    const configs = instance.getConfig()
    if (!configs || !configs.AutoVisible || !configs.AutoVisible.zooms) {
      return
    }
    const zooms = configs.AutoVisible.zooms
    const handler = () => {
      const zoom = map.getZoom()
      instance[this.in(zoom, zooms) ? 'show' : 'hide']()
    }
    // fix: 初始化时显示不在范围内的图表
    handler()
    map.on('zoomend', handler)
    instance.on(EventName.DESTROY, () => {
      map.off('zoomend', handler)
      map = null
    })
  }
}
