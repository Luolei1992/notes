<template>
    <portal to="notification-confirm">
        <div class="toast" v-if="toastShow">
            {{msg}}
        </div>
    </portal>
</template>
<script>
export default {
    props:['msg','toastShow'],
}
</script>
<style lang="less" scoped>
.toast {
    position: fixed;
    top: 49%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: rgba(0,0,0,0.7);
    border-radius: .1rem;
    padding: 0.1rem .2rem;
    color: #fff;
}
</style>