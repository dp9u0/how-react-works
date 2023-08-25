# 三种启动模式

React 提供三种启动模式:

* Legacy
* Blocking
* Concurrent

三种启动模式分别创建了三个对象:


* [reactDOMRoot : ReactDOMRoot](https://github.com/facebook/react/blob/v17.0.2/packages/react-dom/src/client/ReactDOMRoot.js#L62-L72) : 定义在 react-dom 中，可以理解是对 dom 容器封装，提供 render 等方法
* [_internalRoot : FiberRoot](https://github.com/facebook/react/blob/v17.0.2/packages/react-reconciler/src/ReactFiberRoot.new.js#L29-L81) : 可以理解为 Fiber Container，fiber 容器，持有 dom container( container info)
* [hostRootFiber : Fiber](https://github.com/facebook/react/blob/v17.0.2/packages/react-reconciler/src/ReactFiber.new.js#L116-L193) : 全局第一个Fiber,Fiber树根节点

## Legacy

```jsx
ReactDOM.render(<App />, document.getElementById('root'), (dom) => {}); 
```

## Blocking

```jsx
// BlockingRoot
// 1. 创建ReactDOMRoot对象
const reactDOMBlockingRoot = ReactDOM.createBlockingRoot(
  document.getElementById('root'),
);
// 2. 调用render
reactDOMBlockingRoot.render(<App />);
```

## Concurrent

```jsx
// ConcurrentRoot
// 1. 创建ReactDOMRoot对象
const reactDOMRoot = ReactDOM.createRoot(document.getElementById('root'));
// 2. 调用render
reactDOMRoot.render(<App />);
```
