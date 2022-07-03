export function debounce(fn, delay=300, immediate = false, callback) {
  let timer = null;
  let isImmediate = false;

  const _debounce = function (...args) {
    return new Promise((resolve,reject) => {
      // 立即执行功能
      if (immediate && !isImmediate) {
        const result = fn.apply(this, args);
        callback && callback(result); // 回调返回返回值：方法一
        resolve(result) // 回调返回返回值：方法二 (两个resolve只会执行到一个)
        isImmediate = true;
      }

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        // this跟参数传入功能
        const result = fn.apply(this, args);
        callback && callback(result); // 回调返回返回值: 方法一
        console.log(result);
        resolve(result) // 回调返回返回值：方法二 (两个resolve只会执行到一个)
        timer = null;
        isImmediate = false;
      }, delay);
    });
  };

  // 取消功能
  _debounce.cancel = function () {
    timer && clearTimeout(timer);
    timer = null;
    isImmediate = false;
  };

  return _debounce;
}