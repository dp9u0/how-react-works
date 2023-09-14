# reconciler

## reconciler 全局对象

### ReactElement,Fiber,DOM

### 全局变量

#### ExecutionContext

#### double buffering

#### Lanes

##### update lane

##### render lanes

##### fiber lane

## scheduleUpdateOnFiber

同步

## performSyncWorkOnRoot

```js

```

## getNextLanes

## renderRootSync

```js

```

## prepareFreshStack

## workLoopSync

## performUnitOfWork

## beginWork

### updateXXX

1. 计算 fiber.memoizedState
2. 根据 fiber.memoizedState/fiber.type 等获取下级 ReactElement (nextChildren) 对象
   1. updateHostRoot
   2. updateClassComponent
3. 根据下级 `ReactElement (nextChildren)` 对象,调用 `reconcileChildren(current:Fiber,workInProgress:Fiber,nextChildren:ReactElement|Array<ReactElement>|any)`生成下级Fiber节点(只生成次级子节点)

#### processUpdateQueue

#### reconcileChildren

## completeUnitOfWork

## completeWork

1. 调用completeWork： 给fiber节点(tag=HostComponent, HostText)创建 DOM 实例
2. 把当前 fiber 对象的副作用队列(firstEffect和lastEffect)添加到父节点的副作用队列
3. 识别beginWork阶段设置的fiber.flags, 判断当前 fiber 是否有副作用(增,删,改), 如果有, 需要将当前 fiber 加入到父节点的effects队列, 等待commit阶段处理.

## commitRoot

异步

## ensureRootIsScheduled

## performConcurrentWorkOnRoot
