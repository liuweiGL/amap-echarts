export default class AMapCoordinate {
  static dimensions = ['lng', 'lat']
  static getDimensionsInfo() {
    return AMapCoordinate.dimensions
  }
  static create(ecModel) {
    const options = ecModel.getOption()
    if (!options.getMap) {
      return
    }
    const amapCoordinate = new AMapCoordinate(options.getMap())
    ecModel.eachSeries(seriesModel => {
      if (seriesModel.get('coordinateSystem') === 'amap') {
        seriesModel.coordinateSystem = amapCoordinate
      }
    })
  }

  map = null
  model = null
  axisPointerEnabled = false
  dimensions = AMapCoordinate.dimensions

  constructor(map) {
    this.map = map
  }

  dataToPoint(data) {
    const px = this.map.lngLatToContainer(data)
    return [px.x, px.y]
  }

  pointToData(data) {
    const lngLat = this.map.containerToLngLat({
      x: data[0],
      y: data[1]
    })
    return [lngLat.lng, lngLat.lat]
  }
}
