本文用于描述一次完整的React首次渲染的过程。不涉及大量具体源码。

### 入口

```js
ReactDOM.render(<App />, document.getElementById('root'));
```

1. 从调用栈中的执行情况，可以看到首先会处理`<App />`这部分，结果就是将`<App />`转化成一个普通的js对象，也就是`React Element`。

    涉及的主要函数包括（按调用顺序）：

    1. `createElementWithValidation`
    2. `createElement`
    3. `ReactElement`：返回一个普通对象

2. 之后会执行`ReactDOM.render()`这部分

    1. 实际执行的函数是`legacyRenderSubtreeIntoContainer()`

