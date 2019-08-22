import VueAMap from 'vue-amap'

export default ({
  Vue,
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // 注册高德地图
  Vue.use(VueAMap)
  VueAMap.initAMapApiLoader({
    key: '2893975e83e14a62e8d1dd452ffcd4fe',
    plugin: [],
    v: '1.4.5'
  })

  Vue.config.productionTip = false
}
