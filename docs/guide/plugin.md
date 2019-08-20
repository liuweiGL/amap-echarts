## 插件

统一处理 `echarts` 参数、自定义 `amap` 行为。

### PluginBase（基类）

自定义插件应该继承该类。

```ts
interface PluginBase {
  getType: () => PluginType;
  apply: (instance: AMapEcharts) => void;
}
```

### PluginType（插件类型）

目前插件根据作用范围不同进行区分：

```ts
enum PluginType {
  INIT;  // 实例初始化之后调用
  REDENER; // 每个实例每次重绘时调用
  UPDATE;  // 每个实例更新参数时调用
  DESTROY; // 每个实例销毁时调用
}
```

### 自定义插件

```js
import AMapEcharts, { PluginBase, PluginType } from 'amap-echarts';

export default class PluginDemo extends PluginBase {
  getType() {
    // 实例初始化完毕之后将会调用 `apply` 方法
    return PluginType.INIT;
  }

  // instance: AMapEcharts 实例
  apply(instance) {
    const configs = instance.getConfig()
    const pluginConfig = configs ? configs['PluginDemo'] : null
    // do something
  }
}

// 使用插件
AMapEcharts.registerPlugin(new PluginDemo())
```

### 内置插件

#### forbid-animation

把 `series` 中的 `animation` 属性设置为 `false`，防止动画导致 `echarts` 绘制与 `amap` 绘制不同步问题。

属性设置：

```ts
interface InstanceConfigs {
  ForbidAnimation: boolean; // 是否进行控制

  // ...其他配置
}
```

#### auto-visible

自动控制图表是否显示或隐藏。

```ts
interface InstanceConfigs {
  AutoVisible: {
    zooms: array[number,number]; // 在指定层级范围内显示
  };

  // ...其他配置
}
```


### TODO

1. 过滤数据，只渲染在地图视野内的数据。
2. 初次加载时地图自适应视野，以包含全部数据。

> 初次比较深入的接触 `echarts`，对图表的种类以及数据结构不太熟悉，以后再看。
