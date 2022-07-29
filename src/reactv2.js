/**
 * 替换(alternate)
 */
const PlacementEffectTag = 0b00000000000010;

/**
 * 更新(alternate)
 */
const UpdateEffectTag = 0b00000000000100;

/**
 * 删除(alternate)
 */
const DeletionEffectTag = 0b00000000001000;

/**
 * 纯文本
 */
const TextNodeElement = '__TEXT_NODE_ELEMENT__';

/**
 * Fiber 数据结构
 */
class Fiber {

  type = null;
  props = {};
  dom = null;

  effectTag = PlacementEffectTag;

  // This is a pooled version of a Fiber. Every fiber that gets updated will
  // eventually have a pair. There are cases when we can clean up pairs to save
  // memory if we need to.
  /**
   * @type {Fiber}
   */
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

  /**
   * next effect fiber of this fiber
   */
  next = null;
}

function createElement(type, props, ...children) { }

function render(element, dom) { }

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
  reconcile(fiber, fiber.props.children);
}

/**
 * 更新一个Fiber
 * @param {Fiber} fiber 
 */
function createDom(fiber) {
  const { type, props } = fiber;
  if (type === TextNodeElement) {
    return document.createTextNode(props.text);
  }
  const dom = document.createElement(type);
  Object.keys(props).forEach(key => {
    if (key === "children") return;
    // TODO: 增加事件支持
    dom[key] = props[key];
  });
  return dom;
}

/**
 * 
 * @param {Fiber} parent 
 * @param {Fiber} children 
 */
function reconcile(parent, children) {

}

requestIdleCallback(workLoop)

export default {
  createElement
}

const ReactDOM = { render }

export {
  ReactDOM
}
