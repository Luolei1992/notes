<template>
  <div id="app">
    <router-view/>
    <portal-target name="notification-confirm"></portal-target>
    <portal-target name="notification-loading"></portal-target>
  </div>
</template>
<script>

export default {
  name: 'app',
    mounted(){
      (/iphone|ipod|ipad/i.test(navigator.appVersion)) && document.addEventListener('blur', (e) => {
        // 这里加了个类型判断，因为a等元素也会触发blur事件
        if(['input', 'textarea'].includes(e.target.localName)) {
          setTimeout(()=> {
            document.scrollingElement.scrollTo(0, document.scrollingElement.scrollTop);
          }, 100);
        }
      }, true)
    },
}
</script>

<style lang="less">
@import "./less/base.less";

</style>
