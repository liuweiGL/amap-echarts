/**
 * TODO: 屏幕适配
 * @see https://lbs.amap.com/api/javascript-api/reference/self-own-layers
 */
import echarts from 'echarts/lib/echarts'
import AMapCanvas from './AMapCanvas'

export default class AmapEcharts {
  amapCanvas = null
  instance = null
  options = false

  constructor(map) {
    this.amapCanvas = new AMapCanvas(map)
    this.amapCanvas.setRender(this.render.bind(this))
  }

  render() {
    if (this.instance) {
      this.instance.dispose()
    }
    const canvas = this.amapCanvas.getCanvas()
    this.instance = echarts.init(canvas)
    this.instance.setOption(this.options)
  }

  setOption(options) {
    this.options = {
      ...options,
      getAMap: () => this.amapCanvas.getMap()
    }
  }
}
