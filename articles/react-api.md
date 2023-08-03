# React API

## React.createElement

### jsx vs React.createElement

React.createElement 是我们最常用但是有最陌生的 api 了，如果我们一直使用 jsx 编写 react 代码，那么基本很少使用到 createElement。那是因为 bable 将 jsx 代码自动转换为 对 React.createElement 的调用。可以通过 babel.io 查看这一转换过程：

```jsx
const App = () =>
(
  <div>
    <h1 id="title">Title</h1>
    <a href="xxx">Jump</a>
    <section>
      <p>
        Article
      </p>
      <Counter></Counter>
    </section>
  </div>
);

class Counter2 extends React.Component {
  render() {
    return (<div></div>)
  }
}

const Counter = () => (<div></div>)
```

通过 babel 转换为

```js
const App = () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
  id: "title"
}, "Title"), /*#__PURE__*/React.createElement("a", {
  href: "xxx"
}, "Jump"), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("p", null, "Article"), /*#__PURE__*/React.createElement(Counter, null)));

class Counter2 extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null);
  }
}

const Counter = () => /*#__PURE__*/React.createElement("div", null);
```

### React.createElemnet

源码参考 [ReactElement](../react/packages/react/src/ReactElement.js#348)

关于API: `function createElement(type, config, children){}`，参数：

* type 代表创建的React Element 的类型，一般有：
  * 字符串 `div` `span` 等，表示对应原生Html Element 的类型，成为 HostElement
  * `class xxxx`，就是我们写的派生自 React.Component / React.PureElement类组件
  * 方法，如 `()=>{}`，函数组件
* config : 实际为 jsx 中的 props，不过 createElement 会对 config 做处理后创建 props
* children ：可变参数，传入 children

```js
export function createElement(type, config, children) {
  // STEP: 1. config 参数校验 : ref / key; 通过 config 创建 props
  const props = {}; // 注意 这里会通过 RESERVED_PROPS 跳过 key ref __source __self
  // ... BLABLA   
  // STEP: 2. 处理 children
  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    // 如果只有一个 children 直接赋值给 props.children
    props.children = children;
  } else if (childrenLength > 1) {
    // 否则 创建 数组 复制给 props.children
    const childArray = Array(childrenLength);
  }
  // ... BLABLA 
  // STEP: 3. 默认参数
  // Resolve default props
  if (type && type.defaultProps) {
  // ... BLABLA 
  }
  // ...BLABLA
  // STEP: 4. dev 模式下的 displayname
  // ...BLABLA
  // STEP: 5. 返回 Element 实例
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}
```

返回的 ReactElement 结构如下：

```js
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner,
  };
```

关于 `$$typeof:` : 可以看到，ReactElement 中 `$$typeof` 的值为 REACT_ELEMENT_TYPE ，REACT_XXX_TYPE 是一系列 Symbol 声明（[Symbol声明](../react/packages/shared/ReactSymbols.js#14)）对于 react 提供的 createXXX ，如 forwardRef(createRef)/createPortal/createContext 都返回类似 ReactElement 结构，都有一个 `$$typeof`，在 render 阶段通过 `$$typeof` 区分 element 类型。

## React.Component

Component 和 PureComponent 代码在 [ReactBaseClasses](../react/packages/react/src/ReactBaseClasses.js) 中。

非常简单，关于生命周期等定义，在 react-dom 中，后面还会谈到。

需要注意的是  `isReactComponent` 和 `isPureReactComponent` 的定义。

### Component

```js
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};
```

```js
Component.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
```

```js
Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};
```

### PureComponent

```js
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;
```

## React.createRef

我们在使用 [React.createRef](../react/packages/react/src/ReactCreateRef.js) 和 [React.forwardRef](../react/packages/react/src/forwardRef.js) 的时候，类似于下面的例子，由于 根据之前 [React.createElement](./React.createElement.md) 中 的分析 子组件 是无法通过props 获取到 ref 的，因此 只能通过 forwardRef 将 ref 传递过来。这是如何实现的呢？其实就是简单的render 参数传递，既然 props 无法传递，那多传递要给参数不就好了？

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

## React.createContext

跟前面非常类似 都是创建一些 简单的 element like 对象，代码可以看这里 [React.createContext](../react/packages/react/src/ReactContext.js#17)
