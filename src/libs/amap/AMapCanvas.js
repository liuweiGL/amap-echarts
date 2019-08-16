export default class AMapCanvas {
  canvas = null
  constructor(map) {
    const canvas = document.createElement('canvas')
    this.layer = new AMap.CustomLayer(canvas, {
      map,
      alwaysRender: false
    })
    this.canvas = canvas
    this.setCanvasSize()
  }

  // 设备像素比
  getPixelRatio() {
    return Math.min(2, Math.round(window.devicePixelRatio || 1))
  }

  // 设置 canvas 的 width & height 属性可以清理画布
  setCanvasSize() {
    const pixelRatio = this.getPixelRatio()
    const size = this.getMap().getSize()
    const width = size.getWidth()
    const height = size.getHeight()
    this.canvas.width = width * pixelRatio
    this.canvas.height = height * pixelRatio
    this.canvas.style.width = width + 'px'
    this.canvas.style.height = height + 'px'
  }

  setRender(render) {
    this.layer.render = () => {
      this.setCanvasSize()
      render()
    }
  }

  getMap() {
    return this.layer.getMap()
  }

  getCanvas() {
    return this.canvas
  }
}
