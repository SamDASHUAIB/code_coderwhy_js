function debounce(fn, delay) {
  // 1.定义一个定时器, 保存上一次的定时器
  // 闭包, debounce 函数出栈的时候, 不会被销毁
  // 实现, 第二次调用的时候, 拿到前面第一次的旧值, 做操作
  let timer = null

  // 2.真正执行的函数
  const _debounce = function () {
    // 取消上一次的定时器
    if (timer) clearTimeout(timer)
    // 延迟执行
    timer = setTimeout(() => {
      console.log(`heheheh ${this}`) // 这里的 this 是正确的
      // 外部传入的真正要执行的函数
      // 独立函数调用, this 是全局 window
      fn()
    }, delay)
  }
  return _debounce
}
/*
  限制事件频繁的发生, 减少性能的损耗。
  防抖
    延迟调用，频繁取消
    达到一定的等待时间 （delay）此间用户没有新操作触发响应回调，此时才真正调用这个函数。
    应用场景
      input 框中频繁的输入内容，搜索或者提交信息；
      频繁的点击按钮，触发某个事件
      监听浏览器的滚动事件，完成某些特定操作
  节流(固定频率触发)
    固定的时间，只响应一次事件回调。用户短时间多次操作 -> 只计一次
      监听页面的滚动事件 => 固定时间，触发一次
      鼠标移动
      用户频繁点击按钮操作
*/

// 第一次 timer 为 null => 开启定时
// 没有到时间再次触发 timer 有值 => clearTimeout, 重新计时。
// 到了时间 => 执行 fn() => 响应

/*
  基础版的问题
    没有绑定 this 为 html 元素, 导致 this 为 window 且事件对象 event 为 undefined
*/
