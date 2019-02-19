(function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    // var clientHeight = docEl.clientHeight
    // alert(clientWidth)
    // alert(clientHeight)
    // var W_H = 1
    var orientations = 'landscape'
    var fontSize = 16
    if (!clientWidth) return
    // W_H = clientWidth / clientHeight
    fontSize = Math.floor(clientWidth / 23)
    // if (W_H < 1) {
    //   // 竖屏
    //   if (W_H < 0.7) {
    //     // 手机
    //     fontSize = Math.floor(clientWidth / 23)
    //   } else {
    //     // 平板
    //     fontSize = Math.floor(clientWidth / 50)
    //   }
    //   orientations = 'vertical'
    // } else {
    //   // 横屏
    //   if (clientWidth <= 1204) {
    //     fontSize = Math.floor(clientWidth / 54)
    //   } else {
    //     fontSize = Math.floor(clientWidth / 23)
    //   }
    //   orientations = 'horizontal'
    // }
    docEl.style.fontSize = fontSize + 'px'
    docEl.className = orientations
  }
  recalc()
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)

  window.addEventListener('resize', function () {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      window.setTimeout(function () {
        document.activeElement.scrollIntoViewIfNeeded()
      }, 0)
    }
  })
})(document, window)
