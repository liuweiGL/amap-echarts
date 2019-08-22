## 介绍

在高德地图中展示 echarts 图表，当前版本 <version />。

:::tip

推荐使用 [2.x](https://liuweigl.github.io/amap-echarts/) 版本。

:::

## 它是如何工作的？

1. 使用高德地图[自定义图层](https://lbs.amap.com/api/javascript-api/reference/self-own-layers)为 `echarts` 提供绘制容器。
2. 使用高德地图 [api](https://lbs.amap.com/api/javascript-api/reference/map) 解析经纬度数据为 `px` 坐标。
3. 接管高德地图插件的引入与图层的更新事件保证 `echarts` 同步绘制。

## Features

1. 灵活：`amap` 对象由外部传入，方便与 [vue-amap](https://elemefe.github.io/vue-amap/#/) 或者其他框架的 `amap` 组件配合使用。
2. 轻量：类库内部只是接管了高德[自定义图层](https://lbs.amap.com/api/javascript-api/reference/self-own-layers)的加载、刷新时机、经纬度转换功能，`echarts` 可按需加载。
3. 可扩展：提供简单的插件机制，统一处理图表 `options`、自定义 `amap` 行为。
