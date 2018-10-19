本文用于描述一次完整的React首次渲染的过程。不涉及大量具体源码。

#### 入口

```js
ReactDOM.render(<App />, document.getElementById('root'));
```

#### 从调用栈中的执行情况，可以看到首先会处理`<App />`这部分，结果就是将`<App />`转化成一个普通的js对象，也就是`React Element`。

  涉及的主要函数包括（按调用顺序）：

  1. `createElementWithValidation`：这个函数位于`/packages/react/src/ReactElementValidator.js`
  2. `createElement`：这个函数位于`/packages/react/src/ReactElement.js`
  3. `ReactElement`：返回一个普通对象。这个函数位于`/packages/react/src/ReactElement.js`

#### 之后会执行`ReactDOM.render()`这部分

  `legacyRenderSubtreeIntoContainer()`，这个函数位于`/packages/react-dom/src/client/ReactDOM.js`。

  这个函数可以分为三部分，执行三个重要的过程：

  1. 创建root
  2. render或renderSubtreeIntoContainer
  3. DOMRenderer.getPublicRootInstance

##### 1. 创建root

具体过程都封装在`legacyCreateRootFromDOMContainer`这个函数(位于`packages/react-dom/src/client/ReactDOM.js`)中。

这个函数做了创建了三个对象，并加工了容器

1. 创建了`ReactRoot`实例对象

  这个实例对象通过`new`的方式创建，原型上定义了`render`，`unmount`，`legacy_renderSubtreeIntoContainer`以及`createBatch`四个方法。前三个方法都涉及操控work。

  这个对象的`_internalRoot`指向下面描述的对象。

2. 创建了`FiberRoot`对象

  这个对象是字面两创建。

  目前两个看到的属性：

  - current：指向一个fiber对象

  - containerInfo：指向之前传入的真实的元素节点

3. 创建了`Fiber`对象

  这个实例由`new`的方式创建，构造函数是`FiberNode`，所有的`fiber`都是它的实例对象。

4. 创建`container`

经过`legacyCreateRootFromDOMContainer`后，`container`增加了下面的东西：
```js
container = {
    _reactRootContainer: {
        _internalRoot: {
            current: {

            }
        }
    }
}
```

##### 2. render

首次渲染走的是`render`这条路。

`render`的代码如下：

  ```js
  ReactRoot.prototype.render = function(
  children: ReactNodeList,
  callback: ?() => mixed,
  ): Work {
  const root = this._internalRoot;
  const work = new ReactWork();//.........................................................创建work
  callback = callback === undefined ? null : callback;
  if (__DEV__) {
    warnOnInvalidCallback(callback, 'render');
  }
  if (callback !== null) {
    work.then(callback);
  }
  DOMRenderer.updateContainer(children, root, null, work._onCommit);//.....................更新容器
  return work;
  };
  ```

`render`中主要执行两个部分：

  1. 创建一个`work`

  `ReactWork.prototype`上定义了两个方法：

  - `then`：用来将回调函数推入保存集合

  - `_onCommit`：用来执行上面的保存集合的所有回调函数

  2. 更新容器

  注意`DOMRenderer.updateContainer`中传入的参数

  说实话，不觉得这个函数起名叫`updateContainer`是准确的。`updateContainer`函数完成了创建优先级的任务，并将`优先级`和`fiber`一同传入`updateContainerAtExpirationTime`。

```
updateContainer
|__updateContainerAtExpirationTime
    |__scheduleRootUpdate
        |__enqueueUpdate
        |__scheduleWork
            |__scheduleWorkToRoot
            |__resetStack
            |__markPendingPriorityLevel
            |__storeInteractionsForExpirationTime
            |__requestWork
                |__performWork
```
  - `updateContainerAtExpirationTime`函数

  获取了`container.context`属性，然后继续调用`scheduleRootUpdate`函数

  - `scheduleRootUpdate`函数(/packages/react-reconciler/src/ReactFiberReconciler.js)

  创建了`update`对象，之后先调用`enqueueUpdate`函数，再调用`scheduleWork`函数

  - `enqueueUpdate`函数

  这个函数主要使用来将`update`对象插入到更新队列。queue使用了链表的结构。

  - `scheduleWork`函数

  在首次渲染阶段，`scheduleWorkToRoot`做了2项工作：

  1. 给`fiber.expirationTime`设置了过期时间1(更新了fiber实例的过期时间)
  2. 返回了`fiber.stateNode`，这个对象指向`createFiberRoot`函数创建的那个对象

  - `requestWork`函数

  这个函数判断是应该同步执行work还是异步执行work

  - 