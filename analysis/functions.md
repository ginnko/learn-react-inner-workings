### 函数调用栈

```
updateContainer
|_updateContainerAtExpirationTime
  |_scheduleRootUpdate
    |_enqueueUpdate
    | |_createUpdateQueue
    |_scheduleWork
      |_scheduleWorkToRoot
      |_requestWork
          |_performWork
            |_performWorkOnRoot
              |_renderRoot
              | |_createWorkInProgress
              | |_workLoop
              |   |_performUnitOfWork
              |     |_completeUnitOfWork
              |     |_beginWork
              |       |_updateClassComponent
              |       | |_constructClassInstance
              |       | |_adoptClassInstance
              |       | |_mountClassInstance
              |       | |_finishClassComponent
              |       | |_reconcileChildren
              |       |_updateHostComponent
              |       | |_reconcileChildren
              |       |   |_reconcileChildrenArray
              |       |     |_createChild
              |       |_updateHostRoot
              |         |_processUpdateQueue
              |         |_reconcileChildren
              |           |_reconcileChildFibers
              |             |_placeSingleChild
              |               |_reconcileSingleElement
              |                 |_createFiberFromElement
              |                   |_createFiber
              |_completeRoot
                |_commitRoot
                  |_prepareForCommit
                  |_commitBeforeMutationLifecycles
                  | |_commitBeforeMutationLifeCycles
                  |_commitAllHostEffects
                    |_commitPlacement
                      |_appendChildToContainer
```