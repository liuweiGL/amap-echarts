import events from 'events'
import echarts from 'echarts/lib/echarts'
import _amapContainer from './amap-container'
import EventNames from './amap-events'
import PluginBase, { PluginTypes } from '../plugins/base'

export default class AMapEcharts extends events {
  static _configs = {}
  static _plugins = {}
  static registerPlugin(plugin) {
    if (!(plugin instanceof PluginBase)) {
      throw new Error(`plugin ${plugin.name} should inherit PluginBase`)
    }
    const type = plugin.getType()
    const _plugins = AMapEcharts._plugins
    if (_plugins[type]) {
      _plugins[type].push(plugin)
    } else {
      _plugins[type] = [plugin]
    }
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

  _amapContainer = null
  _instance = null
  _options = null
  _disposed = false

  constructor(map) {
    super()
    this._amapContainer = new _amapContainer(map)
    this._amapContainer.ready(() => {
      // 用户销毁的时候可能还没加载完，此处需要再次销毁
      if (this._disposed) {
        this.dispose()
      }
      this._init()
    })
  }

  _init() {
    const container = this._amapContainer.getContainer()
    this._instance = echarts.init(
      container,
      AMapEcharts._configs.theme,
      AMapEcharts._configs.opts
    )
    this._amapContainer.setRender(this._redener.bind(this))
    // 内部重绘事件
    this.on(EventNames.__REDENER__, this._redener.bind(this))
    this.emit(EventNames.INIT)
    this._execPlugin(PluginTypes.INIT)
  }

  _redener() {
    this._execPlugin(PluginTypes.REDENER)
    this._instance.setOption(this._options)
    this.emit(EventNames.REDENER)
  }

  _execPlugin(type) {
    const plugins = AMapEcharts._plugins[type]
    plugins && plugins.forEach(plugin => plugin.apply(this))
  }

  getMap() {
    return this._amapContainer.getMap()
  }

  getOption() {
    return this._options
  }

  setOption(_options) {
    this._options = {
      ..._options,
      getMap: () => this._amapContainer.getMap()
    }
    this._execPlugin(PluginTypes.UPDATE)
    // 触发内部重绘事件
    this.emit(EventNames.__REDENER__)
    this.emit(EventNames.UPDATE)
  }

  dispose() {
    this._disposed = true
    this._options = null
    if (this._instance) {
      this._instance.dispose()
      this._amapContainer.dispose()
      this.off(EventNames.__REDENER__)
      this._instance = null
      this._amapContainer = null
    }
    this.emit(EventNames.DESTROY)
    this._execPlugin(PluginTypes.DESTROY)
  }

  isDisposed() {
    return this._disposed
  }
}
