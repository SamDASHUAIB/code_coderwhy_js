function throttle(fn, interval, options = { leading: true, trailing: false }) {
  // 1.记录上一次的开始时间
  const { leading, trailing } = options
  let lastTime = 0

  // 2.事件触发时, 真正执行的函数
  const _throttle = function () {
    // 2.1.获取当前事件触发时的时间
    const nowTime = new Date().getTime()
    // nowTime 是一个非常大的数字，leading 为 true 下面的 remainTime 一定是 < 0 所以，第一次一定会执行。
    // 而 leading 为 false 时，lastTime - nowTime === 0 所以第一次不会执行。填平了之间的差距。
    // 如何判断是第一次？lastTime = 0
    if (!lastTime && !leading) lastTime = nowTime
    // 2.2.使用当前触发的时间和之前的时间间隔以及上一次开始的时间, 计算出还剩余多长时间需要去触发函数
    const remainTime = interval - (nowTime - lastTime)
    if (remainTime <= 0) {
      // 2.3.真正触发函数
      fn()
      // 2.4.保留上次触发的时间
      lastTime = nowTime
    }
  }

  return _throttle
}
