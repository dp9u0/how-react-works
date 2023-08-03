# How React Works

## First Of All

* 如何使用本仓库？clone 本仓库以及 gitsubmodule(react)
* 如何调试？项目基于这篇文章搭建了 [react debug 环境](https://juejin.cn/post/7126501202866470949): 修改了 react submodule的[编译脚本](./react/scripts/rollup/build.js) ，编译 react 时候可以生成 source map；构建后react，通过 yarn link 将当前仓库的 node_module 引用的 react 和 react-dom 连接到 react/build/node_module ，这样就可以debug 了

## Content

### Overview

* [Overview](./articles/overview.md)
* [React API](./articles/react-api.md)

### React 内核

* [启动过程](./articles/init.md)
* [创建任务](./articles/schedule-work.md)
* [任务调度](./articles/scheduler.md)
* [执行任务](./articles/reconciler.md)
* [渲染](./articles/commit-root.md)

### State

### 其他主题

* Event