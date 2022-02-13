function throttle(fn, interval, options) {
  // 1.记录上一次的开始时间
  // 新的 lastStartTime 就是旧的 nowTime
  // 自由变量, 保存状态。
  let lastStartTime = 0

  // 2.事件触发时, 真正执行的函数
  const _throttle = function () {
    // 2.1.获取当前事件触发时的时间
    const nowTime = new Date().getTime()

    // 2.2.使用当前触发的时间和之前的时间间隔以及上一次开始的时间, 计算出还剩余多长事件需要去触发函数
    // nowTime 是一个非常大数字，必定大于 interval 所以，第一次一定会执行。
    const remainTime = interval - (nowTime - lastStartTime)
    if (remainTime <= 0) {
      // 2.3.真正触发函数
      fn()
      // 2.4.保留上次触发的时间
      lastStartTime = nowTime
    }
  }

  return _throttle
}
