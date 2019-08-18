/**
 * 禁止动画效果，防止地图移动缩放时 echarts 刷新不及时
 *
 * @param {object} options 参数
 */
export default function forbidAnimation(options) {
  const { series } = options
  if (series) {
    series.forEach(item => {
      if (item.coordinateSystem === 'amap') {
        item.animation = false
      }
    })
  }
  return options
}
