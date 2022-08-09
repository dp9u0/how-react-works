# updateContainer

无论是 render 方法最终会走到 `updateContainer` 方法中。

[updateContainer](../react/packages/react-reconciler/src/ReactFiberReconciler.new.js)

在使用 Lane 模型之前，React 内部使用 ExpirationTime 表示任务的优先级。
