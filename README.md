# How React Works

## First Of All

* 如何使用本仓库？clone 本仓库以及 gitsubmodule(react)
* 如何调试？项目基于这篇文章搭建了 [react debug 环境](https://juejin.cn/post/7126501202866470949): 修改了 react submodule的[编译脚本](./react/scripts/rollup/build.js) ，编译 react 时候可以生成 source map；构建后react，通过 yarn link 将当前仓库的 node_module 引用的 react 和 react-dom 连接到 react/build/node_module ，这样就可以debug 了

## Content

### Overview

这个系列文章，主要涉及的包有：react（react\packages\react），react-dom（react\packages\react-dom），react-reconciler（react\packages\react-reconciler），scheduler（react\packages\scheduler）。

* react：react 对外的接口基本上都由 react 包提供，如 createElement(jsx)，react Component 中的 setState 以及 生命周期函数，还有诸如 createRef 等接口
* react-dom：可以称之为渲染器，负责提供（一种）渲染功能，提供接口(符合HostConfig协议)给 reconciler。
* react-reconciler：协调器，负责接收上层的更新请求（updateContainer，scheduleUpdateOnFiber），将回调（performSyncWorkOnRoot）作为任务，调用 scheduler的unstable_scheduleCallback，添加到 任务队列中。
* scheduler：调度器，负责调度 reconciler 的回调任务

* [Overview](./articles/overview.md)
* [react 概览](./articles/package-react.md)
* [react-dom 概览](./articles/package-react-dom.md)
* [react-reconciler 概览](./articles/package-react-reconciler.md)
* [scheduler 概览](./articles/package-scheduler.md)

### React 内核

* [React启动](./articles/bootstrap.md)
* [整体流程](./articles/reconciler-workloop.md)
* [创建任务](./articles/schedule-work.md)
* [任务优先级](./articles/schedule-work-priority.md)
* [调度任务](./articles/scheduler.md)
* [执行任务](./articles/reconciler.md)
  * 初次执行
  * 对比更新
* [渲染](./articles/commit-root.md)

### 其他主题
