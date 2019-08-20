## 事件

简单的事件钩子，实例销毁时会自动解除所有事件，无需手动解绑。

| Event   | 说明                                                | 参数 |
| ------- | --------------------------------------------------- | ---- |
| init    | `echarts` 实例已经初始化完毕                        | -    |
| redener | 地图移动、缩放、 `echarts` 参数发生更改导致重新渲染 | -    |
| update  | 调用 `setOption` 方法时触发                         | -    |
| destroy | 调用 `dispose` 方法触发                             | -    |

### 使用

```js
import AMapEcharts, { EventName } from 'amap-echarts';

const ae = new AMapEcharts(map);

ae.on(EventName.INIT, function() {
  console.log('初始化完毕');
});
```
