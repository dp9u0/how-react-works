# Scheduler

## unstable_scheduleCallback

也就是被 reconciler 调用的 `scheduleDeferredCallback`

```js
function unstable_scheduleCallback(callback, deprecated_options) {
  var startTime = currentEventStartTime !== -1 ? currentEventStartTime : getCurrentTime();
  // BLABLA
  var newNode = {/* blabla */};
  // Insert the new callback into the list, ordered first by expiration, then
  // by insertion. So the new callback is inserted any other callback with
  // equal expiration.
  // 

  ensureHostCallbackIsScheduled();
  var previous = next.previous;
  previous.next = next.previous = newNode;
  newNode.next = next;
  newNode.previous = previous;
  }
```

```js
function ensureHostCallbackIsScheduled() {
  if (isExecutingCallback) {
    // Don't schedule work yet; wait until the next time we yield.
    return;
  }
  requestHostCallback(flushWork, expirationTime);
}
```

requestHostCallback 是 React 对 requestIdleCallback 的 polyfill，这个方案简单来说是通过 requestAnimationFrame 在浏览器渲染一帧前，通过 `port.postMessage()` 实现将回调插入到 macro task 中，在渲染完成后执行回调。

```js
  requestHostCallback = function(callback, absoluteTimeout) {
    scheduledHostCallback = callback;
    timeoutTime = absoluteTimeout;
    if (isFlushingHostCallback || absoluteTimeout < 0) {
      // Don't wait for the next frame. Continue working ASAP, in a new event.
      // 不需要等到下一次 animationTick 直接
      port.postMessage(undefined);
    } else if (!isAnimationFrameScheduled) {
      // If rAF didn't already schedule one, we need to schedule a frame.
      // TODO: If this rAF doesn't materialize because the browser throttles, we
      // might want to still have setTimeout trigger rIC as a backup to ensure
      // that we keep performing work.
      isAnimationFrameScheduled = true;
      requestAnimationFrameWithTimeout(animationTick);
    }
  };

  cancelHostCallback = function() {
    scheduledHostCallback = null;
    isMessageEventScheduled = false;
    timeoutTime = -1;
  };
```

```js
var ANIMATION_FRAME_TIMEOUT = 100;
var rAFID;
var rAFTimeoutID;
var requestAnimationFrameWithTimeout = function(callback) {
  // schedule rAF and also a setTimeout
  rAFID = localRequestAnimationFrame(function(timestamp) {
    // cancel the setTimeout
    localClearTimeout(rAFTimeoutID);
    callback(timestamp);
  });
  rAFTimeoutID = localSetTimeout(function() {
    // cancel the requestAnimationFrame
    localCancelAnimationFrame(rAFID);
    callback(getCurrentTime());
  }, ANIMATION_FRAME_TIMEOUT);
};
```

```js
var animationTick = function(rafTime) {
  if (scheduledHostCallback !== null) {
    // Eagerly schedule the next animation callback at the beginning of the
    // frame. If the scheduler queue is not empty at the end of the frame, it
    // will continue flushing inside that callback. If the queue *is* empty,
    // then it will exit immediately. Posting the callback at the start of the
    // frame ensures it's fired within the earliest possible frame. If we
    // waited until the end of the frame to post the callback, we risk the
    // browser skipping a frame and not firing the callback until the frame
    // after that.
    requestAnimationFrameWithTimeout(animationTick);
  } else {
    // No pending work. Exit.
    isAnimationFrameScheduled = false;
    return;
  }

  var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
  if (
    nextFrameTime < activeFrameTime &&
    previousFrameTime < activeFrameTime
  ) {
    if (nextFrameTime < 8) {
      // Defensive coding. We don't support higher frame rates than 120hz.
      // If the calculated frame time gets lower than 8, it is probably a bug.
      nextFrameTime = 8;
    }
    // If one frame goes long, then the next one can be short to catch up.
    // If two frames are short in a row, then that's an indication that we
    // actually have a higher frame rate than what we're currently optimizing.
    // We adjust our heuristic dynamically accordingly. For example, if we're
    // running on 120hz display or 90hz VR display.
    // Take the max of the two in case one of them was an anomaly due to
    // missed frame deadlines.
    activeFrameTime =
      nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
  } else {
    previousFrameTime = nextFrameTime;
  }
  frameDeadline = rafTime + activeFrameTime;
  if (!isMessageEventScheduled) {
    isMessageEventScheduled = true;
    port.postMessage(undefined);
  }
};
```
