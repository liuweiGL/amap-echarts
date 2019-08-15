import echarts from 'echarts/lib/echarts'
import AmapCoordinate from './amap-coordinate'
import AmapEcharts from './amap-echarts'

echarts.registerCoordinateSystem('amap', AmapCoordinate)

export default AmapEcharts
