export default class AMapCoordinate {
  static dimensions = ['lng', 'lat']
  static getDimensionsInfo() {
    return AMapCoordinate.dimensions
  }
  static create(ecModel) {
    const options = ecModel.getOption()
    if (!options.getAMap) {
      throw new Error('请使用 AmapEcharts#setOption 方法设置参数')
    }
    const amapCoordinate = new AMapCoordinate(options.getAMap())
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
