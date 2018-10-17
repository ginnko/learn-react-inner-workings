本文用于描述一次完整的React首次渲染的过程。不涉及大量具体源码。

### 入口

```js
ReactDOM.render(<App />, document.getElementById('root'));
```

1. 从调用栈中的执行情况，可以看到首先会处理`<App />`这部分，结果就是将`<App />`转化成一个普通的js对象，也就是`React Element`。

    涉及的主要函数包括（按调用顺序）：

    1. `createElementWithValidation`：这个函数位于`/packages/react/src/ReactElementValidator.js`
    2. `createElement`：这个函数位于`/packages/react/src/ReactElement.js`
    3. `ReactElement`：返回一个普通对象。这个函数位于`/packages/react/src/ReactElement.js`

2. 之后会执行`ReactDOM.render()`这部分

    1. 实际执行的函数是`legacyRenderSubtreeIntoContainer()`，这个函数位于`/packages/react-dom/src/client/ReactDOM.js`。这个函数实际会做下面的事：
        1. 创建一个root对象，它的`_inernalRoot`属性是一个对象(这个对象也有好多特殊的属性)，这个对象的`current`属性是一个`Fiber`对象。这个root对象的原型上定义了一个`legacy_renderSubtreeIntoContainer`方法，这个方法会创建一个work对象。
    2. 上面的函数会调用

