## 内部流程图

附上类库内部的流程图供大家参考，方便 debug。

@flowstart
st=>start: Start
e=>end: End

para1=>parallel: new AMapEcharts(amap)

io1=>inputoutput: instance

op2=>operation: 加载高德地图的 CustomLayer 插件

cond=>condition: 加载成功？

para2=>parallel: 执行任务

op3=>operation: 触发一次更新

echarts.setOption(cachedOptions)

op4=>operation: 注册内部更新事件
instance.on('__reRender__')

para3=>parallel: instance.setOption(options)

io2=>inputoutput: cachedOptions

op5=>operation: 触发内部更新事件
instance.emit('__reRender__')

sub1=>subroutine: 事件中心


st->para1

para1(path1,right)->op2(right)->cond
cond(yes,bottom)->para2
para2(path1,right)->op3
para2(path2,bottom)->op4->sub1
cond(no,right)->e

para1(path2,bottom)->io1->para3

para3(path1,right)->io2
para3(path2,bottom)->op5->sub1

sub1->op3

@flowend