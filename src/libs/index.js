import echarts from 'echarts/lib/echarts'
import AMapEcharts from './core/amap-echarts'
import AMapCoordinate from './core/amap-coordinate'
import ForbidAnimation from './plugins/forbid-animation'
import AutoVisible from './plugins/auto-visible'

export { default as PluginBase, PluginType } from './plugins/base'
export { default as EventName } from './core/amap-events'

// 注册坐标系
echarts.registerCoordinateSystem('amap', AMapCoordinate)

// 注册插件
AMapEcharts.registerPlugin([new ForbidAnimation(), new AutoVisible()])

export default AMapEcharts
