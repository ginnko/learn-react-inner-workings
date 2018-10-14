# learn-react-inner-workings

*v16.5.2*

### 说明

为快速定位：

[react.development.js](./node_modules/react/cjs/react.development.js)

[react-dom.development.js](./node_modules/react-dom/cjs/react-dom.development.js)


### 代码结构

[核心功能概览](https://reactjs.org/docs/codebase-overview.html)。

1. React core：包含React的类定义和一些顶级API
2. Render：负责渲染vdom到终端
3. Reconciler：映射数据到UI


### 帮助阅读源码的tips

1. 用于调试的打包方式：

```js
yarn build core,dom –type=UMD
```

2. 在关键链路上打断点：

```
前端 View 层框架的声明周期钩子和 render 方法
```
