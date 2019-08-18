import echarts from 'echarts/lib/echarts'
import AMapEcharts from './core/amap-echarts'
import AMapCoordinate from './core/amap-coordinate'
import forBidAnimation from './plugins/forbid-animation'

// 注册坐标系
echarts.registerCoordinateSystem('amap', AMapCoordinate)

// 注册插件
AMapEcharts.register(forBidAnimation)

export default AMapEcharts
