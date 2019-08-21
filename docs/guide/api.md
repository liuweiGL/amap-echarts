## Api

### 约定

带有 `_` 前缀的代表内部属性与方法，请勿直接调用，后期可能会发生更改。

### 静态方法

| Function | 说明 | 参数类型 |
| --- | --- | --- |
| config | 配置 `echarts` 全局属性 | [GlobalConfigs](#GlobalConfigs) |
| registerPlugin | 注册插件 | [PluginBase](#PluginBase) \| array[[PluginBase](#PluginBase)] |
| unRegisterPlugin | 注销插件 | string \| array[string]（插件名称） |

#### GlobalConfigs

全局配置项：

```ts
interface GlobalConfigs {
  theme: string | object;
  opts: {
    devicePixelRatio: number;
    renderer: 'canvas' | 'svg';
    width: number;
    height: number;
  };
}
```

### 构造函数

```ts
new AMapEcharts(map, globalConfigs);
```

### 实例方法

| Function | 说明 | 参数 |
| --- | --- | --- |
| getMap | 获取高德地图实例 | - |
| getZIndex | 获取 `echarts` 容器的层级 | - |
| setZIndex | 设置 `echarts` 容器的层级 | number |
| setOpacity | 设置 `echarts` 容器的 `opacity` | number |
| show | 显示 `echarts` 容器 | - |
| hide | 隐藏 `echarts` 容器 | - |
| getConfig | 获取实例的配置项（[InstanceConfigs](#InstanceConfigs)） | - |
| config | 配置项，目前主要用于配置插件 | [InstanceConfigs](#InstanceConfigs) |
| getOption | 获取 `setOption` 方法设置的参数 | - |
| setOption | `echarts` 的 `setOption` 方法代理 | 同 [echarts#setOption](https://echarts.baidu.com/option.html#title) |
| dispose | 销毁实例 | - |
| isDisposed | 是否已销毁 | - |

#### InstanceConfigs

实例配置项：

```ts
interface InstanceConfigs {
  // 图表绘制层配置
  zIndex: number; // 层级
  opacity: 1; // 透明度
  zooms: [0, 0]; // 图层允许缩放的范围

  // 插件配置
  ForbidAnimation: boolean;
  AutoVisible: {
    zooms: [number, number];
  };
}
```
