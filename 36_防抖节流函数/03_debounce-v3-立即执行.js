// 立即执行，immediate = false 默认值（不传入）
function debounce(fn, delay, immediate = false) {
  // 1.定义一个定时器, 保存上一次的定时器
  let timer = null
  let isInvoke = false // false 表示未激活。

  // 2.真正执行的函数
  const _debounce = function (...args) {
    // 取消上一次的定时器
    if (timer) clearTimeout(timer)

    // 判断是否需要立即执行
    if (immediate && !isInvoke) {
      fn.apply(this, args)
      // 标记为 true 表示, 已经立即执行过了
      isInvoke = true
    } else {
      // 延迟执行
      timer = setTimeout(() => {
        // 外部传入的真正要执行的函数
        fn.apply(this, args)
        // 完成一次周期, 重置为 false 标记, 表示还没有立即执行过, 尚未激活。
        // 过了 delay, 就是新的一轮的开始。
        isInvoke = false
      }, delay)
    }
  }
  return _debounce
}
