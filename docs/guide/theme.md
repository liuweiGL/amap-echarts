## echarts 主题

类库内部自带了 `echarts` 官方的 [主题](https://echarts.baidu.com/download-theme.html)，使用方法：

```js
import macarons from 'amap-echarts/dist/themes/macarons';
import AMapEcharts from 'amap-echarts';

async function useAwait() {
  const ae = await AMapEcharts.init(map, macarons);
  // do something
}
```
