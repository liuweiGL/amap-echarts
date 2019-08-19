import AMapEcharts from '../core/amap-echarts'
import ForbidAnimation from './forbid-animation'
import AutoVisible from './auto-visible'

// 注册插件
AMapEcharts.registerPlugin([new ForbidAnimation(), new AutoVisible()])
