<template>
  <client-only>
    <el-amap :events="events" :zoom="zoom" :center="center" :map-style="mapStyle"></el-amap>
  </client-only>
</template>

<script>
import 'echarts/lib/chart/lines'
import 'echarts/lib/chart/graph'
import 'echarts/lib/component/polar'
import AMapEcharts from 'amap-echarts'

export default {
  name: 'Lines',
  data() {
    return {
      zoom: 5,
      center: [121.4648, 31.2891],
      mapStyle: 'amap://styles/whitesmoke',
      events: {
        init: map => {
          this.createLinesChart(map)
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
    createLinesChart(map) {
      this.ae = new AMapEcharts(map)
      const data = ['a', 'b', 'c', 'd']
      const lines = [['a', 'b'], ['d', 'c'], ['c', 'b'], ['a', 'f']]
      const color = [
        '#E27471',
        '#00C8FF',
        '#E6AF15',
        '#00E3F3',
        '#CF83F4',
        '#6B81E1',
        '#00FBAE'
      ]
      // 以上为所有配置项
      let angle = {}
      for (let i = 0; i < data.length; i++) {
        angle[data[i]] = (360 / data.length) * i
      }

      // 点数据

      let nodes = []

      data.forEach((d, index) => {
        nodes.push({
          name: d,
          value: [1, angle[d]],
          itemStyle: {
            color: color[index % color.length]
          }
        })
      })
      // 线数据
      let paperDataURI =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAABtJREFUOBFjYBgFoyEwGgKjITAaAqMhQJ0QAAAGVAABSI/t9QAAAABJRU5ErkJggg=='

      let linesData = []

      lines.forEach(d => {
        linesData.push({
          coords: [[1, angle[d[0]]], [1, angle[d[1]]]]
        })
      })

      this.ae.setOption({
        title: {
          text: 'graph+lines'
        },
        polar: {},
        radiusAxis: {
          show: false
        },
        angleAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            type: 'graph',
            coordinateSystem: 'polar',
            label: {
              show: true,
              position: 'outside',
              fontSize: 14
            },
            symbol: 'image://' + paperDataURI,
            symbolSize: 80,
            symbolOffset: [0, 10],
            symbolMargin: '-30%',
            symbolRepeat: true,
            symbolPosition: 'end',
            nodes: nodes
          },
          {
            type: 'lines',
            zIndex: 999,
            coordinateSystem: 'polar',
            lineStyle: {
              color: '#a6c84c',
              width: 1,
              opacity: 0.6,
              curveness: 0.5
            },
            effect: {
              show: true,
              symbol: 'triangle',
              symbolSize: 10
            },
            data: linesData
          }
        ]
      })
    }
  }
}
</script>
