/**
 * Fiber 数据结构
 */
class Fiber {

  /**
   * 替换(alternate)
   */
  static Placement = 0b00000000000010;

  /**
   * 更新(alternate)
   */
  static Update = 0b00000000000100;

  /**
   * 删除(alternate)
   */
  static Deletion = 0b00000000001000;

  type = null;
  props = {};
  dom = null;

  effectTag = "";

  // This is a pooled version of a Fiber. Every fiber that gets updated will
  // eventually have a pair. There are cases when we can clean up pairs to save
  // memory if we need to.
  alternate = null;

  /**
   * parent fiber of this fiber
   */
  return = null;

  /**
   * first child fiber of this fiber
   */
  child = null;

  /**
   * sibling fiber of this fiber
   */
  sibling = null;
}

function createElement() { }

function render() { }

// 任务调度: 调度任务
let workInProgress = null;

function workLoop(deadline) {
  while (workInProgress && /* shouldYield() */ deadline.timeRemaining() > 1) {
    performUnitOfWork(workInProgress);
  }
  // 手动增加下调度任务
  requestIdleCallback(workLoop);
}

/**
 * 执行一个调度单元 
 * @param {Fiber} unitOfWork 
 */
function performUnitOfWork(unitOfWork) {
  updateFiber(unitOfWork);
}

/**
 * 更新一个Fiber
 * @param {Fiber} fiber 
 */
function updateFiber(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom();
  }
}

/**
 * 更新一个Fiber
 * @param {Fiber} fiber 
 */
function createDom(fiber) {
  const { type, props } = fiber;
  const dom = document.createElement(type);
  Object.keys(props).forEach(key => {
    if (key === "children") return;
    // TODO: 增加事件支持
    dom[key] = props[key];
  })
  return dom;
}

function reconcile() {

}

requestIdleCallback(workLoop)

export default {
  createElement
}

const ReactDOM = { render }

export {
  ReactDOM
}
