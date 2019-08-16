import echarts from 'echarts/lib/echarts'

/**
 * options 中添加 amap 属性将触发自定义 component
 */
export default echarts.extendComponentView({
  type: 'amap',
  render() {
    console.log('render')
  }
})
