import events from 'events'
import echarts from 'echarts/lib/echarts'
import AMapCanvas from './amap-canvas'
import EventNames from './amap-events'

/**
 * 使用插件处理 echarts 参数
 * @param {object} options 参数
 */
const process = options => {
  AMapEcharts.plugins.forEach(plugin => (options = plugin(options)))
  return options
}

export default class AMapEcharts extends events {
  static plugins = []
  static register(plugin) {
    AMapEcharts.plugins.push(plugin)
  }

  amapCanvas = null
  instance = null
  options = null
  disposed = false

  constructor(map) {
    super()
    this.amapCanvas = new AMapCanvas(map)
    this.amapCanvas.ready(() => {
      // 用户销毁的时候可能还没加载完，此处需要再次销毁
      if (this.disposed) {
        this.dispose()
      }
      this.amapCanvas.setRender(this._update.bind(this))
      this._init()
    })
  }

  _init() {
    const canvas = this.amapCanvas.getCanvas()
    this.instance = echarts.init(canvas)
    this.on(EventNames.__REDENER__, this._update.bind(this))
    this.emit(EventNames.INITED)
  }

  _update() {
    this.instance.setOption(this.options)
    this.emit(EventNames.UPDATE)
  }

  setOption(options) {
    this.options = {
      ...process(options),
      getAMap: () => this.amapCanvas.getMap()
    }
    this.emit(EventNames.__REDENER__)
  }

  dispose() {
    this.isDisposed = true
    this.options = null
    if (this.instance) {
      this.instance.dispose()
      this.amapCanvas.dispose()
      this.instance = null
      this.amapCanvas = null
    }
  }

  isDisposed() {
    return this.disposed
  }
}
