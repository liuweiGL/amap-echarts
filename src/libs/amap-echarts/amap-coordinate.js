export default class AmapCoordinate {
  static dimensions = ['lng', 'lat']
  static create() {
    return new AmapCoordinate()
  }

  model = null
  axisPointerEnabled = false
  dimensions = AmapCoordinate.dimensions

  update(ecModel, api) {
    console.log(ecModel, api)
  }

  dataToPoint(data) {
    const point = new AMap.LngLat(data[0], data[1])
    const px = this._amap.lngLatToContainer(point) //, this._zoom);
    return [px.x, px.y]
  }

  pointToData() {
    console.log('pointToData')
  }

  containPoint() {
    console.log('containPoint')
  }

  getDimensionsInfo() {
    console.log('getDimensionsInfo')
  }

  convertToPixel() {
    console.log('convertToPixel')
  }

  convertFromPixel() {
    console.log('convertFromPixel')
  }
}
