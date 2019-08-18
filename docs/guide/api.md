## Api

### 实例方法

| Function   | 说明                                        |
| ---------- | ------------------------------------------- |
| setOption  | `echarts` 的 `setOption` 方法代理，异步执行 |
| dispose    | 销毁实例                                    |
| isDisposed | 是否已销毁                                  |

### 静态方法

| Function | 说明                    | 参数类型            |
| -------- | ----------------------- | ------------------- |
| register | 注册插件                | `Function`          |
| config   | 配置 `echarts` 全局属性 | [Configs](#Configs) |

#### Configs

```ts
interface Configs {
  theme: string;
  opts: {
    devicePixelRatio: number;
    renderer: 'canvas' | 'svg';
    width: number;
    height: number;
  };
}
```