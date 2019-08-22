import echarts from 'echarts/lib/echarts'
import AMapContainer from './amap-container'

export default class AMapEcharts {
  static init(map, theme, opts) {
    return AMapContainer.init(map).then(amapContainer => {
      return new AMapEcharts()._init(amapContainer, theme, opts)
    })
  }

  _amapContainer = null
  _echarts = null
  _cachedOptions = null

  _init(amapContainer, theme, opts) {
    const dom = amapContainer.getDom()
    this._amapContainer = amapContainer
    this._echarts = echarts.init(dom, theme, opts)
    amapContainer.setRender(this._render.bind(this))
    return this._mixin()
  }

  _mixin() {
    const regExp = /^_/
    const prototype = Object.getPrototypeOf(this)
    const instance = Object.create(this._echarts)
    Object.getOwnPropertyNames(prototype).forEach(key => {
      if (!regExp.test(key)) {
        instance[key] = prototype[key].bind(this)
      }
    })
    return instance
  }

  _render() {
    // this._echarts.resize()
    this._echarts.setOption(this._cachedOptions)
  }

  _clear() {
    this._amapContainer = null
    this._echarts = null
    this._cachedOptions = null
  }

  getContainer() {
    return this._amapContainer
  }

  resize() {
    this._amapContainer.resize()
    this._echarts.resize()
  }

  setOption(options, ...args) {
    options.getMap = () => this._amapContainer.getMap()
    this._cachedOptions = options
    this._echarts.setOption(options, ...args)
  }

  dispose() {
    this._echarts.dispose()
    this._amapContainer.dispose()
    this._clear()
  }
}
