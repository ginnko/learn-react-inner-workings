### React Fiber Architecture

[原文地址](https://github.com/acdlite/react-fiber-architecture#structure-of-a-fiber)
---

React Fiber的目的是在动画、布局和工作场合增强它的适应性。最终要的特性是增量渲染：将渲染任务切分成小块，然后分发到多个帧上完成。

其他的特性包括：当有新的更新，可以暂停、抛弃以及重用`work`;给不同类型的更新标记优先级;new concurrency primitives。

#### React中的重要概念

##### 调和(reconciliation)

React用来比较两棵树的不同以决定那些部分应该被改变的算法。

#### 更新(update)

更新是指数据的改变，这个改变被用来渲染一个React应用。通常是执行`setState`的结果。最终导致一次重新渲染(re-render)。

React接口(React's API)设计的核心思想是将更新(update)视为会引发整个应用重新渲染。这允许开发人员声明式的推理，而不是担心如何高效地让应用从一个状态转变到另一个。

实际上，React并不会应为每次的改变而重新渲染。React做了优化，能够在保证高性能的同时创建应用重新渲染的现象。优化的过程是`调和(reconciliation)`功能的一部分。

`调和(reconciliation)`是别广泛认知的虚拟节点背后的算法。当渲染一个React应用时，描述这个应用的节点树就会生成并保存在内存中。这棵树之后被`flush`i进渲染环境，比如浏览器应用，就会被转换为一系列DOM操作。当这个树有更新，通常是通过`setState`，就会生成一棵新的树。新的树和旧的树就会进行比较计算，得出需要哪些操作来更新渲染应用。

比较算法的要点：

1. 不同类型的节点会生成完全不同的树，React不会尝试比较它们的区别，而是直接完全取代旧树。

2. 比较列表时，使用`键(keys)`，`keys`应该是稳定、可预测且唯一的。

#### 调和和渲染

DOM只是React可以进行渲染的环境之一。

之所以能支持这么多的渲染环境，是因为React的内部，调和和渲染是各自独立的阶段。调和完成了计算节点树中哪些部分需要改变的工作，渲染使用这些信息实际完成组件的更新。

#### 调度(Scheduling)

决定应该执行哪些`work`的过程

#### 更新任务(work)

任何必须执行的计算。`更新任务(Work)`通常是一次更新带来的(比如通过`setState`)。

>在一些流行的库的设计中，当有新的数据可用的时候，它们采用`推入`数据的方式来执行计算;然而，在React中，计算会被推迟到必要的时候再执行，采用`拉取`数据的方式。
>如果一些东西没有出现在屏幕上，我们可以推迟和它相关的执行逻辑。如果数据到达的比帧的速度快，我们可以合并执行更新。我们可以提升用户操作的优先级高于那些次要的
>后台操作以避免丢帧。

要点是：

1. 在一个UI中，每次更新没有必要立即执行，这样做是相当浪费的，会造成丢帧，降低用户体验;
2. 不同类型的更新有着不同等级的优先级，比如动画的更新优先于数据的存储。
3. `push`的方式要求由人来决定如何调度更新任务，`pull`的方式可以将调度更新的任务交由框架完成。

### Fiber中重要的概念

Fiber能够做到的事情：

1. 暂停一个更新任务(work)或者回到它之前的状态
2. 给不同类型的更新任务(work)指定优先级
3. 重用之前完成的更新任务(work)
4. 如果不再需要丢弃更新任务

#### fiber

为了做到上面说的这些，需要将更新任务切分成单位`work`。一个`fiber`表示一个`work`的单位部分。可以把一个fiber当作一个虚拟栈帧。

计算机追踪程序执行是使用调用栈。当一个函数执行时，一个新的栈帧就被添加到调用栈中。这个栈帧就表示这个函数执行的任务。

在处理UI的时候，问题是如果一次执行过多的任务，会引起丢帧的现象。What's more, some of that work may be unnecessary if it's superseded by a more recent update. This is where the comparison between UI components and function breaks down, because components have more specific concerns than functions in general.

借助浏览器中的`requestIdleCallback`和`requestAnimationFrame`两个API来实现调度。Fiber的目的就是自定义调用栈的执行行为，任意操控栈帧。

#### fiber结构

一个fiber就是一个纯js对象，这个对象包含了组件的信息，它的输入，输出。

一个fiber对应一个栈帧，同时也对应一个组件实例。

#### fiber的重要属性

- type：表示fiber对应的组件类型。组合组件的这个值是函数或者类，原生组件的这个值是字符串

- key：和type一起使用，在调和阶段决定一个fiber能否被重用

- child：child fiber对应组件render函数返回的值 **可以把一个child fiber当成一个尾调用函数**

- sibling： sibling fiber

- return: return fiber，可以当成是父fiber

- pendingProps & memoizedProps: 可以看作是函数的参数。一个fiber的`pendingProps`是在处理这个fiber的最开始设置的，`memoizedProps`是在结束的时候设置的。当将要传入的`pendingProps`和`memoizedProps`想等时，表明这个fiber先前的输出可以被重用，没必要再次处理。

- pendingWorkPriority：表示这个fiber的优先级

- flush：`flush`一个fiber表示将它的输出渲染到屏幕上

- work-in-progress：还没有完成处理的fiber，对应还没有返回的栈帧

- alternate：

任意时刻，一个组件实例最多有两种fiber和它对应，一种是`current， flushed fiber`，一种是`work-in-progress fiber`。

`current fiber`的`alternate`是`work-in-progress`，`work-in-progress`的`alternate`是`current fiber`。

- host component：和渲染环境有关系，浏览器中指的是`div，span`之类的，在JSX中，指小写的标签名称。

- output：每一个fiber最终都会有一个输出，但只有当`leaf nodes`是`host components`的时候，才会创建输出。之后，输出在树上传输。输出最终被传递给负责渲染的代码，渲染的代码将改变渲染进环境。输出的具体创建和更新都是由渲染代码负责的。


