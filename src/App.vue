<template>
  <el-amap
    :events="events"
    :zoom="zoom"
    :center="center"
    :map-style="mapStyle"
  />
</template>

<script>
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/lines'
import 'echarts/lib/chart/effectScatter'
import macarons from './libs/themes/macarons'
import AMapEcharts from './libs/index'
import countries from '@assets/data/countries'

const scatterData = []
const linesData = []

Object.keys(countries).forEach(key => {
  scatterData.push({
    name: key,
    value: countries[key]
  })

  if (key !== '中国') {
    linesData.push({
      coords: [countries[key], countries['中国']]
    })
  }
})

export default {
  name: 'App',
  data() {
    return {
      zoom: 3,
      center: countries['中国'],
      mapStyle: 'amap://styles/whitesmoke',
      events: {
        init: map => {
          this.createScatterChart(map)
        }
      }
    }
  },
  beforeDestroy() {
    if (this.ae) {
      this.ae.dispose()
      console.log('============ echarts 已销毁 ============ ')
    }
  },
  methods: {
    async createScatterChart(map) {
      this.ae = await AMapEcharts.init(map, macarons)
      this.ae.setOption({
        series: [
          {
            type: 'effectScatter',
            coordinateSystem: 'amap',
            zlevel: 1,
            symbolSize: 8,
            animation: false,
            rippleEffect: {
              period: 4,
              brushType: 'fill',
              scale: 4
            },
            label: {
              show: true,
              distance: 8,
              position: 'bottom',
              formatter: '{b}'
            },
            data: scatterData
          },
          {
            type: 'lines',
            coordinateSystem: 'amap',
            zlevel: 2,
            symbol: 'none',
            silent: true,
            animation: false,
            effect: {
              period: 4,
              show: true,
              symbol: 'triangle',
              symbolSize: 5,
              trailLength: 0.2
            },
            lineStyle: {
              width: 1,
              opacity: 1,
              curveness: 0.3
            },
            data: linesData
          }
        ]
      })
    }
  }
}
</script>
<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
