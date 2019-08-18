import echarts from 'echarts/lib/echarts'

echarts.registerAction(
  {
    type: 'amapRoam',
    event: 'amapRoam',
    update: 'updateLayout'
  },
  function(payload, ecModel) {
    console.log(payload, ecModel)
  }
)
