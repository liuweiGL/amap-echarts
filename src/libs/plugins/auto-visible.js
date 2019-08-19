import EventNames from '../core/amap-events'
import PluginBase, { PluginTypes } from './base'

/**
 * 自动显示或隐藏 `echarts` 图表
 */
export default class AutoVisible extends PluginBase {
  in(zoom, zooms) {
    return zoom >= zooms[0] && zoom <= zooms[1]
  }

  getType() {
    return PluginTypes.INIT
  }

  apply(instance) {
    let map = instance.getMap()
    const configs = instance.getConfigs()
    if (!configs || !configs.AutoVisible || !configs.AutoVisible.zooms) {
      return
    }
    const zooms = configs.AutoVisible.zooms
    const handler = () => {
      const zoom = map.getZoom()
      instance[this.in(zoom, zooms) ? 'show' : 'hide']()
    }
    map.on('zoomend', handler)
    instance.on(EventNames.DESTROY, () => {
      map.off('zoomend', handler)
      map = null
    })
  }
}
