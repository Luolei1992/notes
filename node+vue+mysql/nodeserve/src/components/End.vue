<template>
    <div class="end">
        <div class="sucWrap">
            <img :src="type==1?error:success" alt="">
            <p class="suc">{{title}}</p>
            <p class="tip">{{msg}}</p>
            <div class="reStart" v-if="type==1" @click="goRestart">返回</div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import api from "../utils/api.js";
export default {
    name:"End",
    data(){
        return {
            type:-1,
            title:'提交成功',
            msg:'测评结果请查看最终体检报告～',
            success:require("../images/success.png"),
            error:require("../images/error.png"),
        }
    },
    computed:{
        ...mapState({
            userId:state=>state.userId
        })
    },
    created(){
        let param = this.$route.query
        if(param.type==1){
            this.title = '提交失败'
            this.msg = '请检查您的网络，稍后再次提交。'
            this.type=1
        }
    },
    mounted(){
        let id = this.userId
        if(id == ""){
            this.$router.replace("/")
        }
    },
    methods:{
        goRestart(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
    .end {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: #f5f5f5;
        .sucWrap {
            position: absolute;
            width: 100%;
            top: 1.8rem;
            text-align: center;
            p {
                color: #aaa;
            }
            .suc {
                color: #333;
                font-weight: bold;
                font-size: .32rem;
                letter-spacing: 1px;
                margin: .2rem 0;
            }
            img {
                width: 1.12rem;
            }

        }
    }
    .reStart {
        border-radius: .44rem;
        width: 3.3rem;
        height: .88rem;
        line-height: .88rem;
        margin-top: 1rem;
        display: inline-block;
        font-size: 16px;
        color: #fff;
        background-color: #5B99EB;
    }
</style>