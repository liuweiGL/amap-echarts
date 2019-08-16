import echarts from 'echarts/lib/echarts'
import AMapEcharts from './AMapEcharts'
import AMapCoordinate from './AMapCoordinate'
import './AMapView'
import './AMapModel'

echarts.registerCoordinateSystem('amap', AMapCoordinate)
// Action
echarts.registerAction(
  {
    type: 'amapRoam',
    event: 'amapRoam',
    update: 'updateLayout'
  },
  function(payload, ecModel) {
    console.log(payload)
  }
)

export default AMapEcharts
