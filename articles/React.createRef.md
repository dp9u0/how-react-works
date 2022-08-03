# React.createRef

我们在使用 [React.createRef](../react/packages/react/src/ReactCreateRef.js) 和 [React.forwardRef](../react/packages/react/src/ReactForwardRef.js) 的时候，类似于下面的例子，由于 根据之前 [React.createElement](./React.createElement.md) 中 的分析 子组件 是无法通过props 获取到 ref 的，因此 只能通过 forwardRef 将 ref 传递过来。这是如何实现的呢？其实就是简单的render 参数传递，既然 props 无法传递，那多传递要给参数不就好了？

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

const ref = React.createRef();
export App = () => <FancyButton ref={ref}/>
```

React.createRef 做了什么事情：

```js
export function createRef(): RefObject {
  return {
    current: null,
  };
}
```

React.forwardRef 做了什么事情：实际上创建了一个 element 类型 ，用于 Renderer 渲染时候处理

```js
export function forwardRef(render: (props ref) => ReactNode){
  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render,
  };
}
```
