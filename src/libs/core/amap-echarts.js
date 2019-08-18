import events from 'events'
import echarts from 'echarts/lib/echarts'
import AMapContainer from './amap-container'
import EventNames from './amap-events'

/**
 * 使用插件处理 echarts 参数
 * @param {object} options 参数
 */
const process = options => {
  AMapEcharts._plugins.forEach(plugin => (options = plugin(options)))
  return options
}

export default class AMapEcharts extends events {
  static _configs = {}
  static _plugins = []
  static register(plugin) {
    AMapEcharts._plugins.push(plugin)
  }
  static config(
    options = {
      theme: undefined,
      opts: {
        devicePixelRatio: 1,
        renderer: '',
        width: 0,
        height: 0
      }
    }
  ) {
    AMapEcharts._configs = options
  }

  amapContainer = null
  instance = null
  options = null
  disposed = false

  constructor(map) {
    super()
    this.amapContainer = new AMapContainer(map)
    this.amapContainer.ready(() => {
      // 用户销毁的时候可能还没加载完，此处需要再次销毁
      if (this.disposed) {
        this.dispose()
      }
      this.amapContainer.setRender(this._update.bind(this))
      this._init()
    })
  }

  _init() {
    const container = this.amapContainer.getContainer()
    this.instance = echarts.init(
      container,
      AMapEcharts._configs.theme,
      AMapEcharts._configs.opts
    )
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
      getAMap: () => this.amapContainer.getMap()
    }
    this.emit(EventNames.__REDENER__)
  }

  dispose() {
    this.isDisposed = true
    this.options = null
    if (this.instance) {
      this.instance.dispose()
      this.amapContainer.dispose()
      this.instance = null
      this.amapContainer = null
    }
  }

  isDisposed() {
    return this.disposed
  }
}
