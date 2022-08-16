# createUpdate

## ReactDOM.render

[ReactDOM.render](../react/packages/react-dom/src/client/ReactDOM.js#672) 调用的是 [legacyRenderSubtreeIntoContainer](../react/packages/react-dom/src/client/ReactDOM.js#540)

legacyRenderSubtreeIntoContainer:

如果是 Initial mount , Root 节点 还没有创建 需要调用 [legacyCreateRootFromDOMContainer](../react/packages/react-dom/src/client/ReactDOM.js#495) 创建 [root](../react/packages/react-dom/src/client/ReactDOM.js#537),这个过程实际上是构建下面这样一个结构：

![FiberTree](./images/FiberTree.png)

然后调用 [root.render(element)](../react/packages/react-dom/src/client/ReactDOM.js#373) 创建渲染更新任务，等待将 vdom 渲染到 `root._internalRoot.containerInfo`这个 DOM上

创建更新任务的过程 经过 方法

* [updateContainer](../react/packages/react-reconciler/src/ReactFiberReconciler.js#283)
* [updateContainerAtExpirationTime](../react/packages/react-reconciler/src/ReactFiberReconciler.js#162)
* [scheduleRootUpdate](../react/packages/react-reconciler/src/ReactFiberReconciler.js#115)

最终走到 [scheduleWork](../react/packages/react-reconciler/src/ReactFiberScheduler.js#1851)

## setState forceRender

同样类似的 [setState 和 forceRender](../react/packages/react/src/ReactBaseClasses.js) 也是 类似的[实现逻辑](../react/packages/react-reconciler/src/ReactFiberClassComponent.js)

```js
enqueueSetState(inst, payload, callback) {
  const fiber = getInstance(inst); // element._reactInternalFiber
  const currentTime = requestCurrentTime();
  const expirationTime = computeExpirationForFiber(currentTime, fiber);
  const update = createUpdate(expirationTime);
  update.payload = payload;
  if (callback !== undefined && callback !== null) {
    update.callback = callback;
  }
  flushPassiveEffects();
  enqueueUpdate(fiber, update);
  scheduleWork(fiber, expirationTime);
}
```

综上 我们得到这样一张图，接下来我们一次分析 render/setState/forceUpdate 调用的几个关键方法，看下是如何创建更新任务的

![scheduleWork](./images/scheduleWork.png)

## requestCurrentTime

[requestCurrentTime](../react/packages/react-reconciler/src/ReactFiberScheduler.js#2040)

## computeExpirationForFiber

[computeExpirationForFiber](../react/packages/react-reconciler/src/ReactFiberScheduler.js#1595)

## enqueueUpdate

[enqueueUpdate](../react/packages/react-reconciler/src/ReactUpdateQueue.js#220)

## scheduleWork

[computeExpirationForFiber](../react/packages/react-reconciler/src/ReactFiberScheduler.js#1851)
