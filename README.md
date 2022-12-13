# How React Works

## First Of All

* 如何使用本仓库？clone 本仓库以及 gitsubmodule(react)
* 如何调试？项目基于这篇文章搭建了 [react debug 环境](https://juejin.cn/post/7126501202866470949): 修改了 react submodule的[编译脚本](./react/scripts/rollup/build.js) ，编译 react 时候可以生成 source map；构建后react，通过 yarn link 将当前仓库的 node_module 引用的 react 和 react-dom 连接到 react/build/node_module ，这样就可以debug 了

## Questions

带着问题看文章：

## Content

### Overview

首先从整体了解下 react 的结构和脉络，介绍 react 的源码结构以及如何

* [React Overview](./articles/overview.md)

我们接触到的 React 代码集中在两个 package 中 react 和 react-dom，其中 react 暴露了对外接口，如 [React.createElement](./articles/React.createElement.md)，[React.createRef](./articles/React.createRef.md)，[React.Component](./articles/React.Component.md)（包括 PureComponent），而 react-dom 则是提供 render 和 任务调度等功能，也就是说，react 核心代码都在 react-dom 中。

React 中 react 代码非常简单，都是提供一些 基本类型 和 工厂方法，用于创建 Component 和 Elememt，而渲染则是 交给了 react-dom，同时 react-dom 通过这层抽象，可以做到跨平台比如 web，ssr， rn等。

### api via react

按照顺序，了解下 react 这个 module 提供的基本api，以及是如何实现的：

首先看下 React 中  react 这个 package 提供的基础功能，包括如何创建 Element 以及 Component。以及 React 提供的其他的部分接口，如 lazy ，memo，createRef，createContext等等，这些接口都在 react 源码中。

关于 Component 和 Element 的区别可以阅读 React 官方 Blog: [React Components, Elements, and Instances](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)，其中有一句话说明了 Components 和 Element  的关系 `Components Encapsulate Element Trees`：component 封装了 element（通过 class component render 方法 或者 直接通过 function component 返回一颗 element tree，即虚拟dom ），就是通过 React.createElement 创建这样一棵棵的 element tree 实现的。

关于 react 对外暴露的接口，可以阅读具体章节了解

* [React.createElement](./articles/React.createElement.md): 介绍 jsx -> createElement ，以及 createElement 做了什么事情
* [React.Component](./articles/React.Component.md): Component 和 PureComponent
* [React.createRef](./articles/React.createRef.md)
* [React.createContext](./articles/React.createContext.md)

### render via react-dom

然后就是 react 的核心也就是 react-dom，部分

* [RenderEntry](./articles/entry.md): 包括 legacy 和 concurrent 两种方式的 render 入口
* [Fiber](./articles/fiber_struct.md)
* [setState/forceRender](./articles/schedule.md)
* [render](./articles/render.md)
* [diff](./articles/diff.md)
* [commit](./articles/commit.md)
* [scheduler](./articles/scheduler.md)：介绍 v17 版本中的 Lane 和 Scheduler
* [生命周期](./articles/lifecycle.md)
* [hooks](./articles/hooks.md)
* [concurrent](./articles/concurrent.md)
* [context](./articles/context.md)
* [事件](./articles/events.md)

## 手写 react

[myreact](./articles/myreact.md)

## Others Tips

TODO
