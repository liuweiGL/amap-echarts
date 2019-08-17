/**
 * 使用高德地图自定义图层提供 `canvas` 画布
 *
 *
 * @see https://lbs.amap.com/api/javascript-api/reference/self-own-layers
 */
export default class AMapCanvas {
  canvas = null
  layer = null
  promise = null
  disposed = false
  constructor(map) {
    this.promise = new Promise((resolve, reject) => {
      try {
        AMap.plugin('AMap.CustomLayer', () => {
          if (this.disposed) {
            return
          }
          const canvas = document.createElement('canvas')
          this.layer = new AMap.CustomLayer(canvas, {
            map,
            alwaysRender: false
          })
          this.canvas = canvas
          this._setCanvasSize()
          resolve()
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  // 设备像素比
  _getPixelRatio() {
    return Math.min(2, Math.round(window.devicePixelRatio || 1))
  }

  // 设置 canvas 的 width & height
  _setCanvasSize() {
    const pixelRatio = this._getPixelRatio()
    const size = this.getMap().getSize()
    const width = size.getWidth()
    const height = size.getHeight()
    this.canvas.width = width * pixelRatio
    this.canvas.height = height * pixelRatio
    this.canvas.style.width = width + 'px'
    this.canvas.style.height = height + 'px'
  }

  ready(callback) {
    this.promise.then(callback).catch(console.error)
  }

  setRender(render) {
    this.layer.render = () => {
      this._setCanvasSize()
      render()
    }
  }

  getMap() {
    return this.layer.getMap()
  }

  getCanvas() {
    return this.canvas
  }

  dispose() {
    this.disposed = true
    if (this.layer) {
      this.layer.hide()
      this.canvas = null
      this.layer = null
    }
  }

  isDisposed() {
    return this.disposed
  }
}
