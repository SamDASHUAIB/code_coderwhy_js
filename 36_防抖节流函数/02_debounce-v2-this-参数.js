function debounce(fn, delay) {
  // 1.定义一个定时器, 保存上一次的定时器
  let timer = null

  // 2.真正执行的函数
  const _debounce = function (...args) {
    // 取消上一次的定时器
    if (timer) clearTimeout(timer)
    // 延迟执行
    timer = setTimeout(() => {
      // 外部传入的真正要执行的函数
      fn.apply(this, args) // 绑定 this 为 触发事件的 html 元素
    }, delay)
  }

  return _debounce
}

// 浏览器调用 _debounce 的时候, 自动传入 event 参数 ...args 由此而来
