# learn-react-inner-workings

*v16.5.2*

### 说明

为快速定位：

[react.development.js](./node_modules/react/cjs/react.development.js)

[react-dom.development.js](./node_modules/react-dom/cjs/react-dom.development.js)

为调试：

把`node_modules`下的`react`和`react-dom`中的`index.js`执行文件都改为`*.development.js`

本仓库目的：

看了一段时间，目前想完全全面掌握React的设计方式不现实，React源码的学习是个长期的过程。

目前第一阶段的目标是：

1. 熟悉React主要功能的实现路径
2. 熟悉主要函数的功能
3. 理解React主要的设计思路
4. 帮助自己写React应用时写出简洁高效的代码

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

### 参考资料

下面的资料除了第一篇都有讲渲染流程，不同作者重点讲的侧重点不同，真的是差的很大。

1. [深入理解React fiber](http://www.ayqy.net/blog/dive-into-react-fiber/)(:star::star::star::star:)

这个讲Fiber涉及的概念讲的很好，但是没有结合源码流程，对于第一次看的人来说，看到后面一头雾水。

2. [React fiber架构](https://juejin.im/post/5b7016606fb9a0099406f8de)(:star::star::star::star:)

这个讲的很好，讲流程的时候，没有讲fiber对象的创建过程，reconciliation的过程使用`setState`为例讲的。

3. [React源码全方位分析](http://www.sosout.com/2018/08/12/react-source-analysis.html)(:star::star::star:)

这个有讲到fiber对象的创建过程，后面就差强人意了。

4. [React源码速览](http://zxc0328.github.io/2017/09/28/react-16-source/)(:star::star::star::star::star:)

这个讲的非常好，啪啪啪，虽然有一部分的源码已经更新了，但依然掩盖不住作者的大神功底，逻辑很清楚。

5. [How React Works](https://www.cnblogs.com/lcllao/p/9642376.html)(:star::star::star::star::star:)

刚开始看这个，有关于首次渲染的说明，没细看，~~但感觉应该会不错~~。

什么叫不错，简直就是救我狗命的秘籍啊!!!