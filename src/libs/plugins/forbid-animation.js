import PluginBase, { PluginType } from './base'

/**
 * 禁止动画效果，防止地图移动缩放时 echarts 刷新不及时
 */
export default class ForbidAnimation extends PluginBase {
  getType() {
    return PluginType.UPDATE
  }
  apply(instance) {
    const configs = instance.getConfigs()
    if (configs && configs.ForbidAnimation === false) {
      return
    }
    const { series } = instance.getOption()
    if (series) {
      series.forEach(item => {
        if (item.coordinateSystem === 'amap') {
          item.animation = false
        }
      })
    }
  }
}
