function debounce(fn, delay, immediate = false) {
  // 1.定义一个定时器, 保存上一次的定时器
  let timer = null
  let isInvoke = false

  // 2.真正执行的函数
  const _debounce = function (...args) {
    // 取消上一次的定时器
    if (timer) clearTimeout(timer)

    // 判断是否需要立即执行
    if (immediate && !isInvoke) {
      fn.apply(this, args)
      isInvoke = true
    } else {
      // 延迟执行
      timer = setTimeout(() => {
        // 外部传入的真正要执行的函数
        fn.apply(this, args)
        // fn 函数执行完成, 一个周期结束了, 此时将 isInvoke 和 timer 设为默认值, 开启一下个周期。
        isInvoke = false
        timer = null
      }, delay)
    }
  }

  // 封装取消功能，（一个 delay 周期内）用户点击取消，取消计时，取消响应
  // 函数也是一个对象
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    // 重置(恢复回默认值, 以待重新开始。)
    timer = null
    isInvoke = false
  }

  return _debounce
}
