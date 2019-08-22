import echarts from 'echarts/lib/echarts'
import AMapEcharts from './core/amap-echarts'
import AMapCoordinate from './core/amap-coordinate'

// 注册坐标系
echarts.registerCoordinateSystem('amap', AMapCoordinate)

export default AMapEcharts
