/**
 * 使用高德地图自定义图层提供 `echarts` 容器
 *
 *
 * @see https://lbs.amap.com/api/javascript-api/reference/self-own-layers
 */
export default class AMapContainer {
  static init(map) {
    return new Promise((resolve, reject) => {
      try {
        AMap.plugin('AMap.CustomLayer', () => {
          const instance = new AMapContainer()
          const dom = document.createElement('div')
          instance.layer = new AMap.CustomLayer(dom, {
            map,
            zIndex: 120,
            alwaysRender: false
          })
          instance.dom = dom
          instance.resize()
          resolve(instance)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  dom = null
  layer = null
  visible = true

  resize() {
    const size = this.getMap().getSize()
    const width = size.getWidth()
    const height = size.getHeight()
    this.dom.style.width = width + 'px'
    this.dom.style.height = height + 'px'
  }

  setRender(render) {
    this.layer.render = render
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

  getDom() {
    return this.dom
  }

  dispose() {
    this.layer.hide()
    this.dom = null
    this.layer = null
  }
}
