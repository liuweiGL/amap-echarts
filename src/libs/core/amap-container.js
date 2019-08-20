/**
 * 使用高德地图自定义图层提供 `echarts` 容器
 *
 *
 * @see https://lbs.amap.com/api/javascript-api/reference/self-own-layers
 */
export default class AMapContainer {
  container = null
  layer = null
  promise = null
  visible = true
  disposed = false

  constructor(map) {
    this.promise = new Promise((resolve, reject) => {
      try {
        AMap.plugin('AMap.CustomLayer', () => {
          if (this.disposed) {
            return
          }
          const container = document.createElement('div')
          this.layer = new AMap.CustomLayer(container, {
            map,
            zIndex: 120,
            alwaysRender: false
          })
          this.container = container
          this._setSize()
          resolve()
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  _setSize() {
    const size = this.getMap().getSize()
    const width = size.getWidth()
    const height = size.getHeight()
    this.container.style.width = width + 'px'
    this.container.style.height = height + 'px'
  }

  ready(callback) {
    this.promise.then(callback).catch(console.error)
  }

  setRender(render) {
    this.layer.render = () => {
      this._setSize()
      render()
    }
  }

  getMap() {
    return this.layer.getMap()
  }

  getZIndex() {
    return this.layer.getzIndex()
  }

  setZIndex(zIndex) {
    this.layer.setzIndex(zIndex)
  }

  setOpacity(opacity) {
    this.layer.setOpacity(opacity)
  }

  show() {
    if (!this.visible) {
      this.visible = true
      this.layer.show()
    }
  }

  hide() {
    if (this.visible) {
      this.visible = false
      this.layer.hide()
    }
  }

  getContainer() {
    return this.container
  }

  dispose() {
    this.disposed = true
    if (this.layer) {
      this.layer.hide()
      this.container = null
      this.layer = null
    }
  }

  isDisposed() {
    return this.disposed
  }
}
