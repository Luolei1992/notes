<template>
  <portal to="notification-loading">
    <div class="loading">
      <div class="modal"></div>
      <img src="../../images/loading.gif" alt="">
    </div>
  </portal>
</template>
<script>
export default {
  data(){
    return{

    }
  },

}
</script>
<style lang="less" scoped>
  .loading{
    .modal {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 1008;
      top: 0;
      left: 0;
      // background-color: transparent;
      background-color: rgba(0, 0, 0, .5);
    }
    img {
      position: fixed;
      top: 45%;
      left: 50%;
      z-index: 1009;
      transform: translateX(-50%) translateY(-50%);
      width: .6rem;
    }
  }
</style>