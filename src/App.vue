<template>
  <el-amap :events="events" :zoom="zoom" :center="center" :map-style="mapStyle">
  </el-amap>
</template>

<script>
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/lines'
import 'echarts/lib/chart/effectScatter'
import AMapEcharts from './libs/amap-echarts'

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
      zoom: 5,
      center: [121.4648, 31.2891],
      mapStyle: 'amap://styles/whitesmoke',
      events: {
        init: map => {
          window.map = map
          const ae = new AMapEcharts(map)
          ae.setOption({
            series: [
              {
                type: 'effectScatter',
                coordinateSystem: 'amap',
                zlevel: 2,
                rippleEffect: {
                  period: 4,
                  brushType: 'fill',
                  scale: 4
                },
                symbolSize: 8,
                data: scatterData
              },
              {
                type: 'lines',
                coordinateSystem: 'amap',
                zlevel: 1,
                effect: {
                  show: true,
                  period: 6,
                  trailLength: 0.5,
                  color: '#fff',
                  symbolSize: 3
                },
                lineStyle: {
                  normal: {
                    color: 'red',
                    width: 0,
                    curveness: 0.2
                  }
                },
                data: linesData
              },
              {
                type: 'lines',
                coordinateSystem: 'amap',
                zlevel: 2,
                symbol: 'none',
                symbolSize: 10,
                effect: {
                  show: true,
                  period: 6,
                  trailLength: 0,
                  symbol: 'arrow',
                  symbolSize: 6
                },
                lineStyle: {
                  normal: {
                    color: 'red',
                    width: 1,
                    opacity: 0.6,
                    curveness: 0.2
                  }
                },
                data: linesData
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
