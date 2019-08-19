import events from 'events'
import echarts from 'echarts/lib/echarts'
import _amapContainer from './amap-container'
import EventNames from './amap-events'
import PluginBase, { PluginTypes } from '../plugins/base'

/**
 * 注册插件
 * @param {*} plugin 插件
 */
const register = plugin => {
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

/**
 * 注销插件
 * @param {*} name 插件名称
 */
const unRegister = name => {
  const names = Array.isArray(name) ? name : [name]

  const _plugins = AMapEcharts._plugins

  for (const key in _plugins) {
    if (_plugins.hasOwnProperty(key)) {
      _plugins[key] = _plugins[key].filter(item => {
        return !names.includes(item.name)
      })
    }
  }
}

const config = (
  options = {
    theme: undefined,
    opts: {
      devicePixelRatio: 1,
      renderer: '',
      width: 0,
      height: 0
    }
  }
) => {
  AMapEcharts._configs = options
}

export default class AMapEcharts extends events {
  static _configs = {}
  static _plugins = {}
  static config = config
  static removePlugin = unRegister
  static registerPlugin(plugins) {
    if (Array.isArray(plugins)) {
      plugins.forEach(register)
    } else {
      register(plugins)
    }
  }

  _amapContainer = null
  _instance = null
  _cachedOptions = null
  _configs = null
  _disposed = false

  constructor(map, configs) {
    super()
    this._configs = configs
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
    this._instance.setOption(this._cachedOptions)
    this.emit(EventNames.REDENER)
  }

  _execPlugin(type) {
    const plugins = AMapEcharts._plugins[type]
    plugins && plugins.forEach(plugin => plugin.apply(this))
  }

  getConfigs() {
    return this._configs
  }

  getMap() {
    return this._amapContainer.getMap()
  }

  getzIndex() {
    return this._amapContainer.getzIndex()
  }

  setzIndex(zIndex) {
    this._amapContainer.setzIndex(zIndex)
  }

  setOpacity(opacity) {
    this._amapContainer.setOpacity(opacity)
  }

  show() {
    this._amapContainer.show()
  }

  hide() {
    this._amapContainer.hide()
  }

  getOption() {
    return this._cachedOptions
  }

  setOption(_cachedOptions) {
    this._cachedOptions = {
      ..._cachedOptions,
      getMap: () => this._amapContainer.getMap()
    }
    this._execPlugin(PluginTypes.UPDATE)
    // 触发内部重绘事件
    this.emit(EventNames.__REDENER__)
    this.emit(EventNames.UPDATE)
  }

  dispose() {
    this._disposed = true
    this._cachedOptions = null
    if (this._instance) {
      this._instance.dispose()
      this._amapContainer.dispose()
      this.removeAllListeners()
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
