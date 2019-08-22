## 快速上手

安装依赖：

```bash

npm install amap-echarts

# 推荐
yarn add amap-echarts

```

使用：

```js
import AMapEcharts from 'amap-echarts';

// Promise
function usePromise() {
  AMapEcharts.init(map).then(ae => {
    ae.setOption(options);
  });
}

// await
async function useAwait() {
  const ae = await AMapEcharts.init(map);
  ae.setOption(options);
}
```
