[原文](https://github.com/reactjs/react-basic)

### React-基本原理模型
---
#### 转化(Transformation)

React的核心前提是UI的本质是将数据以不同形式投射的结果

#### 抽象(Abstraction)

UI被抽象为可用的部件，不对外显示其内部的实现细节。比如在一个函数中调用另一个。

#### 组合(Composition)

为了实现真正的可复用特性，仅仅是复用简单的片段，然后为它们创建新的容器是不够的。同时，还要把组合其他抽象部件的容器抽象出来。

作者认为组合的真正含义是合成多个抽象变成一个新的。

#### 状态(State)

一个UI并不是简单的服务器或业务逻辑状态的复制。实际上，许多状态是只存在于一个特定的数据投射，在其他UI中不存在的。

我们假设我们的数据模型不可修改。We thread functions through that can update state as a single atom at the top.

#### 缓存(Memoization)

如果我们知晓一个函数是纯函数，反复调用这个函数是很浪费的。我们可以创建一个函数的记忆版本来追踪上一个参数和上一个计算结果。使用这种方式，如果我们使用相同的值不需要再次执行。

#### 列表(Lists)

大多数UI都是某种形式的列表，然后为列表中的每个项目生成多个不同的值。 这创建了自然的层次结构。

我们可以创建一个Map拥有每一个特定item的state，来管理一个list中的每一项。

#### 连续性(Continuations)

由于众多list的存在就会出现很多相似的boilerplate，将boilerplate抽象出来。

到[这里](https://github.com/reactjs/react-basic#state-map)

