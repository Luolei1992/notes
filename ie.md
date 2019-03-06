## ie8

- 1.获取click的event事件对象 event||window.event
- 2.少用不用原生button
- 3.圆角，阴影不支持
- 4.innerHTML获取不到需要innerText
- 5.同级下一个为相对定位一个为绝对定位，z-index不起作用，绝对定位的元素一直在上面
- 6.autofocus不支持，用js
- 7.for in循环不支持
- 8.axios在ie8下content-type设置不成功且会把headers置为null（contentType:"application/json; charset=UTF-8"）
- 9.事件监听

## firefox 43

- 1.innerText获取不到需要innerHTML
- 2.div可编辑状态下，自动换行需要加word-break:break-all
