[原文](https://reactjs.org/docs/reconciliation.html)

### 什么是reconciliation

当一个组件的`props`或者`state`改变，React通过比较`新返回的元素(the newly returned element)`和`之前返回的(the previously rendered one)`，来决定是否更新一个实际DOM节点。当它们不相等，React就会更新这个DOM节点。这个过程就称为`reconciliation`。 