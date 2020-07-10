<template>
    <portal to="notification-confirm">
        <div class="modal" v-if="show"></div>
        <div class="wrapper" v-if="show" @click.stop>
            <div class="title">{{title||"温馨提示"}}</div>
            <div class="message">{{message||'还有信息没有填写，不能进入下一步哦！'}}</div>
            <div class="buttonBox" v-if="type==1">
                <span class="button okBtns" @click="confirm">{{sure||"确定"}}</span>
            </div>
            <div class="buttonBox" v-else>
                <span class="button cancelBtn" @click="cancel">{{cancle||"取消"}}</span>
                <span class="button okBtn" @click="confirm">{{sure||"确定"}}</span>
            </div>
        </div>
    </portal>
</template>
<script>
export default {
    name: "ConfirmBox",
    props: ["show","message","type","sure","cancle","title"],
    methods: {
        confirm() {
            this.$emit("confirmDialog");
        },
        cancel() {
            this.$emit("cancelDialog");
        }
    }
};
</script>
<style lang="less" scoped>
.wrapper {
    position: fixed;
    top: 45%;
    left: 50%;
    z-index: 20;
    width: 6.4rem;
    overflow: hidden;
    font-size: 16px;
    background-color: #fff;
    border-radius: 16px;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    -webkit-transition-property: opacity, -webkit-transform;
    transition-property: opacity, -webkit-transform;
    transition-property: transform, opacity;
    transition-property: transform, opacity, -webkit-transform;
}
.modal {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 18;
    top: 0;
    left: 0;
    // background-color: transparent;
    background-color: rgba(0, 0, 0, .5);
}
.title {
    height: 0.44rem;
    line-height: 0.44rem;
    font-size: 0.32rem;
    color: #333;
    width: 100%;
    text-align: center;
    padding: 0.6rem 0 0.4rem 0;
    font-weight: 800;
}
.message {
    font-size: 0.3rem;
    color: #333;
    width: 100%;
    padding: 0 .4rem 0.45rem .4rem;
    box-sizing: border-box;
}
.buttonBox {
    height: 0.88rem;
    line-height: 0.88rem;
    width: 100%;
}
.button {
    display: inline-block;
    width: 50%;
    text-align: center;
    box-sizing: border-box;
    font-size: 0.32rem;
    border-top: 1px solid #e6e6e6;
    color: #5B99EB;
}
.cancelBtn {
    border-right: 1px solid #E6E6E6;
    box-sizing: border-box;
    color: #777;
}
.okBtns {
    width: 100%;
}
</style>
