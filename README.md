# How React Works

基于 18.2.0 源码，解析React 工作原理

## Overview

我们接触到的 React 代码集中在两个 package 中 react 和 react-dom，其中 react 暴露了对外接口，如 [React.createElement](./articles/React.createElement.md)，[React.createRef](./articles/React.createRef.md)，[React.Component](./articles/React.Component.md)（包括 PureComponent），而 react-dom 则是提供 render 和 任务调度等功能，也就是说，react 核心代码都在 react-dom 中。

React 中 react 代码非常简单，都是提供一些 基本类型 和 工厂方法，用于创建 Component 和 Elememt，而渲染则是 交给了 react-dom，同时 react-dom 通过这层抽象，可以做到跨平台比如 web，ssr， rn等。

* [React Overview](./articles/overview.md)

我们先按照顺序，了解下 react 这个 module 提供的基本api，以及是如何实现的：

## react in React

首先看下 React 中  react 这个 package 提供的基础功能，包括如何创建 Element 以及 Component。以及 React 提供的其他的部分接口，如 lazy ，memo，createRef，createContext等等，这些接口都在 react 源码中
关于 Component 和 Element 的区别可以阅读 React 官方 Blog: [React Components, Elements, and Instances](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)，其中有一句话说明了 Components 和 Element  的关系 `Components Encapsulate Element Trees`：component 封装了 element（通过 class component render 方法 或者 直接通过 function component 返回一颗 element tree，即虚拟dom ），就是通过 React.createElement 创建这样一棵棵的 element tree 实现的。

关于 react 对外暴露的接口，可以阅读具体章节了解

* [React.createElement](./articles/React.createElement.md): 介绍 jsx -> createElement ，以及 createElement 做了什么事情
* [React.Component](./articles/React.Component.md): Component 和 PureComponent
* [React.createRef](./articles/React.createRef.md)
* [React.createContext](./articles/React.createContext.md)

## Render

* render
* setState
* forceRender
* currentTime
* expirationTime

## Task Schedule

## Commit

## Others

## Hooks
