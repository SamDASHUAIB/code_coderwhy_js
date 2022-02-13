function throttle(fn, interval, options = { leading: true, trailing: false }) {
  // 1.记录上一次的开始时间
  const { leading, trailing } = options
  let lastTime = 0
  let timer = null

  // 2.事件触发时, 真正执行的函数
  const _throttle = function () {
    // 2.1.获取当前事件触发时的时间
    const nowTime = new Date().getTime()
    // leading 实现的核心, 如何判断是刚开始呢? (第一次) 特征 lastTime === 0
    // 填平 lastTime 和 nowTime 之间的巨大差距。
    if (!lastTime && !leading) lastTime = nowTime

    // 2.2.使用当前触发的时间和之前的时间间隔以及上一次开始的时间, 计算出还剩余多长事件需要去触发函数
    const remainTime = interval - (nowTime - lastTime)
    // 达到间隔, 完成一个周期, timer 重置
    if (remainTime <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      // 2.3.真正触发函数
      fn()
      // 2.4.保留上次触发的时间
      lastTime = nowTime
      return
    }
    // 最后一次 且没有达到间隔。timer 此时是没有值的为 null。
    // 只需要一个 timer
    if (trailing && !timer) {
      timer = setTimeout(() => {
        // 由定时器管理的执行, 需要重置。下一周期，才能开启定时器。
        timer = null
        // 重新开始的情况。(抛弃过往) new Date().getTime()
        lastTime = !leading ? 0 : new Date().getTime()
        fn()
      }, remainTime)
    }
  }

  return _throttle
}

/*
  防抖
    重新计时, 频繁点击。
*/
