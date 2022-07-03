export function throttle(fn, interval, options = {immediate: true, trail: false}) {
  let lastTime = 0;
  let timer = null;
  const { immediate, trail, callback } = options;

  const _throttle = function (...args) {
    return new Promise((resolve, reject) => {
      const nowTime = new Date().getTime();

      if (!lastTime && !immediate) lastTime = nowTime; // 没有立即执行功能时
      const remainTime = interval - (nowTime - lastTime);
      if (remainTime <= 0) {
        // 确保这个跟下面的定时器只执行其中一个
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        const result = fn.apply(this, args);
        callback && callback(result); // 回调返回返回值: 方法一
        resolve(result); // 回调返回返回值：方法二 (两个resolve只会执行到一个)
        lastTime = nowTime;
        return;
      }

      // 结束执行一次
      if (trail && !timer) {
        timer = setTimeout(() => {
          timer = null;
          const result = fn.apply(this, args);
          callback && callback(result); // 回调返回返回值: 方法一
          resolve(result); // 回调返回返回值：方法二 (两个resolve只会执行到一个)
          lastTime = !immediate ? new Date().getTime() : 0;
        }, remainTime);
      }
    });
  };

  // 取消功能
  _throttle.cancel = function () {
    timer && clearTimeout(timer);
    timer = null;
    lastTime = 0;
  };

  return _throttle;
}