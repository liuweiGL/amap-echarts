import echarts from 'echarts/lib/echarts'

/**
 * TODO: 屏幕适配
 * @see https://lbs.amap.com/api/javascript-api/reference/self-own-layers
 */
export default class AmapEcharts {
  layer = null
  echarts = null

  constructor(
    options = {
      amap: undefined,
      echarts: undefined
    }
  ) {
    const { amap, echarts } = options
    const canvas = document.createElement('canvas')
    const layer = new AMap.CanvasLayer({
      bounds: amap.map.getBounds(),
      ...amap,
      canvas
    })
    this.layer = layer
    this.init(echarts)
  }
  init(params = { theme: undefined, options: undefined }) {
    this.echarts = echarts.init(
      this.layer.getCanvas(),
      params.theme,
      params.options
    )
  }

  getEcharts() {
    return this.echarts
  }
}
