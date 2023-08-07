# React Overview

这个系列文章，主要涉及的包有：react（react\packages\react），react-dom（react\packages\react-dom），react-reconciler（react\packages\react-reconciler），scheduler（react\packages\scheduler）。

* react：react 对外的接口基本上都由 react 包提供，如 createElement(jsx)，react Component 中的 setState 以及 生命周期函数，还有诸如 createRef 等接口
* react-dom：可以称之为渲染器，负责提供（一种）渲染功能，提供接口(符合HostConfig协议)给 reconciler。
* react-reconciler：协调器，负责接收上层的更新请求（updateContainer，scheduleUpdateOnFiber），将回调（performSyncWorkOnRoot）作为任务，调用 scheduler的unstable_scheduleCallback，添加到 任务队列中。
* scheduler：调度器，负责调度 reconciler 的回调任务
