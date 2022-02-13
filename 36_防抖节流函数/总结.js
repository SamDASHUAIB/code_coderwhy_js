/*
  防抖 & 节流 -> 限制事件的频繁发生, 减少性能的损耗。
  防抖
    延迟执行, 频繁取消
    只有达到一定的等待时间, 此间用户没有新操作触发响应, 此时才真正调用这个函数。
    有可能一次也不执行，如果用户一直触发。
    应用场景
      input 输入框频繁的输入内容，搜索或者提交信息。
      频繁的点击按钮，触发某个事件。
      监听浏览器的滚动事件，完成某些特定操作。
    功能点
      immediate 参数 => 开始时立即执行一次 添加一个 isInvoke 变量, 控制激活与否。
      this 绑定 => 正确的 this 绑定 html 元素对象, 且事件对象 event 可以正常使用，fn.apply(this, args)
      取消功能 => cancel 函数, 将返回值(函数) _debounce 当做一个对象, 添加 cancel 属性
        取消响应 + 重置自由变量
      函数具有返回值 => Promise 方案, 回调函数方案。
  节流
    每隔一段时间，触发一次回调, 期间用户多次操作, 只会触发一次响应。
    应用场景
      监听页面的滚动事件 -》固定时间，触发一次。
      鼠标移动
      用户频繁点击按钮操作
    核心
      const remainTime = interval - (nowTime - lastStartTime)
      nowTime 永远指向 当前最新时间戳
      lastStartTime 指向上一轮的 nowTime (remainTime <= 0 表示大于等于一个 interval, 需要执行一次 fn)
    功能点
      开始时, 立即执行一次。leading
        如何判断是第一次？lastTime = 0。
        填平第一次的 lastTime 和 nowTime 之间的巨大差距。
      最后，执行一次。trailing
        利用定时器。
      取消功能 重置 + 终止响应（）。
      this 绑定
*/
// 防抖函数
function debounce(fn, delay, immediate = true) {
  let timer = null
  let isInvoke = false
  const _debounce = function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    // 是否立即执行一次
    if (immediate && !isInvoke) {
      fn.apply(this, args)
      isInvoke = true
      return
    }
    timer = setTimeout(() => {
      fn.bind(this, args)
      isInvoke = false
    }, delay)
  }
  // cancel 功能
  _debounce.cancel = function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = null
    isInvoke = false
  }
  return _debounce
}
// 带返回值
function debounce(fn, delay, immediate = true) {
  let timer = null
  let isInvoke = false
  const _debounce = function (...args) {
    return new Promise((resolve, reject) => {
      if (timer) {
        clearTimeout(timer)
      }
      // 是否立即执行一次
      if (immediate && !isInvoke) {
        try {
          const result = fn.apply(this, args)
          resolve(result)
        } catch (error) {
          reject(error)
        }
        isInvoke = true
        return
      }
      timer = setTimeout(() => {
        try {
          const result = fn.apply(this, args)
          resolve(result)
        } catch (error) {
          reject(error)
        }
        isInvoke = false
      }, delay)
    })
  }
  // cancel 功能
  _debounce.cancel = function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = null
    isInvoke = false
  }
  return _debounce
}
// 回调函数方案。
function debounce(fn, delay, immediate = true, resultCallback) {
  let timer = null
  let isInvoke = false
  const _debounce = function (...args) {
    return new Promise((resolve, reject) => {
      if (timer) {
        clearTimeout(timer)
      }
      // 是否立即执行一次
      if (immediate && !isInvoke) {
        const result = fn.apply(this, args)
        resultCallback(result)
        isInvoke = true
        return
      }
      timer = setTimeout(() => {
        const result = fn.apply(this, args)
        resultCallback(result)
        isInvoke = false
      }, delay)
    })
  }
  // cancel 功能
  _debounce.cancel = function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = null
    isInvoke = false
  }
  return _debounce
}

// 节流函数
function throttle(fn, interval, options = { leading: true, trailing: false }) {
  // 记录上一次的开始时间
  let lastStartTime = 0
  const { leading, trailing } = options
  const _throttle = function (...args) {
    const nowTime = new Date().getTime()
    // nowTime 远大于 0(第一次的 lastStartTime 的值), 所以开始时默认将会执行一次。
    // leading 为 false 表示第一次无需执行, 那么需要填平 lastStartTime 和 nowTime 之间的巨大差距。
    if (!lastStartTime && !leading) lastStartTime = nowTime
    const remainTime = interval - (nowTime - lastStartTime)
    if (remainTime <= 0) {
      // 达到 interval 标准, 清除 timer 无需定时器保证 fn 的执行。
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn.apply(this, args)
      lastStartTime = nowTime
      return
    }
    // 最后，执行一次，用 计时器 来保证
    if (trailing && !timer) {
      timer = setTimeout(() => {
        timer = null // 下次才能开启定时器
        // 执行完成了, 将 lastStartTime 重置, 开启新周期
        // leading 为 false 需要填平 lastStartTime 和 nowTime 的差距
        lastStartTime = !leading ? 0 : new Date().getTime()
        fn.apply(this, args)
      }, remainTime)
    }
  }
  // 取消功能。
  _throttle.cancel = function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = null
    lastStartTime = 0
  }
  return _throttle
}
