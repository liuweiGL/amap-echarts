<template>
  <div style="height:100vh;">
    <el-amap :events="events" :center="center"> </el-amap>
  </div>
</template>

<script>
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/lines'
import 'echarts/lib/chart/effectScatter'
import AMapEcharts from './libs/amap'

const data = {
  上海: [121.509723, 31.226187],
  东莞: [113.8953, 22.901],
  东营: [118.7073, 37.5513],
  中山: [113.4229, 22.478],
  临汾: [111.4783, 36.1615],
  临沂: [118.3118, 35.2936]
}

const scatterData = []
const linesData = []

Object.keys(data).forEach(key => {
  scatterData.push({
    name: key,
    value: data[key]
  })

  if (key !== '上海') {
    linesData.push({
      coords: [data[key], data['上海']]
    })
  }
})

export default {
  name: 'App',
  data() {
    return {
      center: [121.4648, 31.2891],
      events: {
        init: map => {
          window.map = map
          const ae = new AMapEcharts(map)
          ae.setOption({
            series: [
              //被攻击点
              {
                type: 'effectScatter',
                coordinateSystem: 'amap',
                zlevel: 2,
                rippleEffect: {
                  period: 4,
                  brushType: 'fill',
                  scale: 4
                },
                symbol: 'circle',
                symbolSize: 16,
                data: scatterData
              },
              {
                type: 'lines',
                coordinateSystem: 'amap',
                zlevel: 3,
                effect: {
                  show: true,
                  period: 4, //箭头指向速度，值越小速度越快
                  trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                  symbol: 'arrow', //箭头图标
                  symbolSize: 5 //图标大小
                },
                lineStyle: {
                  normal: {
                    width: 1, //尾迹线条宽度
                    opacity: 0, //尾迹线条透明度
                    curveness: 0.5 //尾迹线条曲直度
                  }
                },
                data: linesData
              }
            ]
          })
          // ae.setOption({
          //   xAxis: {
          //     type: 'category',
          //     boundaryGap: false,
          //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          //   },
          //   yAxis: {
          //     type: 'value'
          //   },
          //   series: [
          //     {
          //       data: [820, 932, 901, 934, 1290, 1330, 1320],
          //       type: 'line',
          //       areaStyle: {}
          //     }
          //   ]
          // })
        }
      }
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}
</style>
