# Fiber

## performWork

requestWork 会将 performAsyncWork 交给 Scheduler 调度： `scheduleDeferredCallback(performAsyncWork, {timeout});` 或者同步执行 `performSyncWork`,这两个方法都会最终调用 `performWork`  

这个方法又两个参数:minExpirationTime 用于控制本次执行，需要执行哪些 root 的渲染工作（minExpirationTime <= nextFlushedExpirationTime）

另外一个参数：isYieldy用于控制本次执行是否可以中断

```js
function performWork(minExpirationTime: ExpirationTime, isYieldy: boolean) {
  // Keep working on roots until there's no more work, or until there's a higher
  // priority event.
  findHighestPriorityRoot();

  if (isYieldy) {
    recomputeCurrentRendererTime();
    currentSchedulerTime = currentRendererTime;

    if (enableUserTimingAPI) {
      const didExpire = nextFlushedExpirationTime > currentRendererTime;
      const timeout = expirationTimeToMs(nextFlushedExpirationTime);
      stopRequestCallbackTimer(didExpire, timeout);
    }

    while (
      nextFlushedRoot !== null &&
      nextFlushedExpirationTime !== NoWork &&
      minExpirationTime <= nextFlushedExpirationTime &&
      !(didYield && currentRendererTime > nextFlushedExpirationTime)
    ) {
      performWorkOnRoot(
        nextFlushedRoot,
        nextFlushedExpirationTime,
        currentRendererTime > nextFlushedExpirationTime,
      );
      findHighestPriorityRoot();
      recomputeCurrentRendererTime();
      currentSchedulerTime = currentRendererTime;
    }
  } else {
    while (
      nextFlushedRoot !== null &&
      nextFlushedExpirationTime !== NoWork &&
      minExpirationTime <= nextFlushedExpirationTime
    ) {
      performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, false);
      findHighestPriorityRoot();
    }
  }
}
```
