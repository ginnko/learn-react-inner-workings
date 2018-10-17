# learn-react-inner-workings

*v16.5.2*

### 说明

为快速定位：

[react.development.js](./node_modules/react/cjs/react.development.js)

[react-dom.development.js](./node_modules/react-dom/cjs/react-dom.development.js)

为调试：

把`node_modules`下的`react`和`react-dom`中的`index.js`执行文件都改为`*.development.js`


### 代码结构

[核心功能概览](https://reactjs.org/docs/codebase-overview.html)。

1. React core：包含React的类定义和一些顶级API
2. Render：负责渲染vdom到终端
3. Reconciler：映射数据到UI

### 核心概念

1. 当调用`ReactDOM.render()`或是`setState()`时，会走`reconsiliation`过程，其结果就是React获悉了DOM节点树，然后`react-dom`应用在`“一套最少的变化”`来更新DOM节点。

2. reconciliation

见[这里](./terminology/reconciliation.md)


### 帮助阅读源码的tips

1. 用于调试的打包方式：

```js
yarn build core,dom –type=UMD
```

2. 在关键链路上打断点：

```
前端 View 层框架的声明周期钩子和 render 方法
```

3. 看github上的[big-picture](https://github.com/facebook/react/issues?q=is:open+is:issue+label:%22Type:+Big+Picture%22)issue

>We always discuss such improvement proposals with the community. You can find some of those discussions by the “big picture” label on the React issue tracker.
