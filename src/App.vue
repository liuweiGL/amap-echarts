<template>
  <el-amap :events="events"></el-amap>
</template>

<script>
import 'echarts/lib/chart/lines'
import 'echarts/lib/chart/effectScatter'
import AmapEcharts from './libs/amap-echarts'

const data = {
  上海: [121.4648, 31.2891],
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
      events: {
        init: map => {
          const ae = new AmapEcharts({
            amap: {
              map
            }
          })
          ae.getEcharts().setOption({
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
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    offset: [0, -15],
                    formatter: '{b}',
                    fontSize: 16
                  }
                },
                symbol: 'circle',
                symbolSize: 16,
                data: scatterData
              },
              {
                type: 'lines',
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
                }
                // data: linesData
              }
            ]
          })
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
