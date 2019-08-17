# AMapEcharts

在高德地图中展示 [echarts](https://echarts.baidu.com/index.html) 图表

## Features

1. 灵活：`amap` 对象由外部传入，方便与 [vue-amap](https://elemefe.github.io/vue-amap/#/) 或者其他框架的 `amap` 组件配合使用。
2. 轻量：类库内部只是接管了高德[自定义图层](https://lbs.amap.com/api/javascript-api/reference/self-own-layers)的加载、刷新时机、经纬度转换功能，`echarts` 可按需加载。
3. ~~可扩展：提供简单的插件机制，统一处理图表 `options`、自定义 `amap` 行为~~（还没想好）。

## 快速开始

安装依赖：

```bash
npm install amap-echarts

# 推荐

yarn add amap-echarts
```

使用：

```js
import AMapEcharts from 'amap-echarts'

const ae = new AMapEcharts(amap)

ae.setOption(options)
```

## 示例

1. todo

## Api

### 实例方法

| Function   | 说明                                        |
| ---------- | ------------------------------------------- |
| setOption  | `echarts` 的 `setOption` 方法代理，异步执行 |
| dispose    | 销毁实例                                    |
| isDisposed | 是否已销毁                                  |

### 静态方法

| Function   | 说明                                        |
| ---------- | ------------------------------------------- |
| register  | 注册插件 |

> 当前阶段请勿使用，还没想好怎么支持插件。因为插件可以分两种，一种是 `setOption` 方法执行时处理 `options` 参数的，还有一种是在每次 `update` 时处理 `options` 的。目前本人使用该类库的场景比较单一，没有遇到需求，只能以后再看。


## Events

| Event  | 说明                                                  | 参数 |
| ------ | ----------------------------------------------------- | ---- |
| inited | `echarts` 实例已经初始化完毕                          | -    |
| update | 地图移动、缩放或则 `echarts` 参数发生更改导致重新渲染 | -    |

## 注意

1. 该类库内部内置了一个 `forbid-animation` 插件，会把 `series` 中的 `animation` 属性设置为 `false`，防止动画导致 `echarts` 绘制与 `amap` 绘制不同步问题。 

## TODO

1. 过滤数据，只渲染在地图视野内的数据。
2. 初次加载时地图自适应视野，以包含全部数据。

> 初次比较深入的接触 `echarts`，对图表的种类以及数据结构不太熟悉，以后再看。
