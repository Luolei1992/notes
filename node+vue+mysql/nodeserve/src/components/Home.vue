<template>
    <div class="login">
        <div class="logo">
            <img src="../images/logo.png" alt="">
            <p>精神心理体检量表</p>
        </div>
        <div class="person">
            <input class="number" v-model.trim="id" type="text" placeholder="请输入导诊单上的体检号">
            <input class="realName" v-model.trim="name" type="text" placeholder="请输入您的真实姓名">
            <button @click="checkAndSync">开始测评</button>
        </div>
        <Loading v-if="loadingShow"/>
        <Toast :toastShow="toastShow" :msg="msg"/>
        <ConfirmBox :show="confirm" @cancelDialog="cancelDialog" @confirmDialog="confirmDialog" :type="type" :sure="btnSure" :message="message" />
    </div>
</template>
<script>
import api from "../utils/api.js";
import Loading from "./common/Loading";
import Toast from "./common/Toast";
import ConfirmBox from "./common/ConfirmBox";
import {datacopy} from '../utils/datacopy.js';
import { mapActions, mapState } from 'vuex';

export default {
    data(){
        let dataStatic = JSON.parse(JSON.stringify(datacopy))
        return {
            id:'',
            name:'',
            msg:"",
            loadingShow:false,
            confirm:false,
            toastShow:false,
            message:"",
            type:"1",
            btnSure:"确定",
            hospitalCode:"邵逸夫医院",
            next:true,
            new:true,
            datalis :dataStatic
        }
    },
    created(){
        let param = this.$route.query
        this.hospitalCode = param.hospitalCode||"邵逸夫医院"
    },
    beforeRouteLeave(to, from, next){
        if(!this.id&&!this.name||(api.getCookie("clear")&&!this.next)||this.new){//点击微信自带返回问题处理
            api.setCookie("clear","")
            window.location.replace("/")
            return
        }else{
            next();
        }
    },
    methods:{
        ...mapActions([
            "setUserInfo",
            "setUserName",
            "setHospitalCode",
            'setAnxiousQuestion',
            'setHealthyQuestion',
            'setSleepQuestion'
        ]),
        checkAndSync(userInfo){
            if(!this.id){
                this.toastToggle("请输入体检号")
                return
            }else if(!this.name){
                this.toastToggle("请输入姓名")
                return
            }
            this.loadingShow = true
            this.new = false
            let param = {
                "username": this.name,
                "password": this.md5(this.id),
            }
            // api.setCookie("hospitalCode",this.hospitalCode)
            // api.setCookie("name",this.name)
            api.setCookie("id",this.id)
            this.setUserInfo(this.id||"")
            this.setUserName(this.name||"")
            this.setHospitalCode(this.hospitalCode||"")
            api.patInfoVerify(param).then(res => {
                let data = res.data
                if(data.code==0){
                    if(data.data.state){
                        // this.check()
                    }else{
                        this.messageToggle("没有匹配到您的体检信息，请确认您的信息填写无误。")
                    }
                }else{
                    this.loadingShow = false
                }
            }).catch(()=>{
                this.loadingShow = false
            })
        },
        check(){
            let param = {
                "idNum": this.id,
                "patName": this.name,
                "hospitalCode": this.hospitalCode,
            }
            api.check(param).then(res => {
                let data = res.data
                this.loadingShow = false
                if(data.code==0){
                    if(data.data.flag == 0){ //直接进入表单填写
                        this.setAnxiousQuestion(this.datalis.anxiousQuestion)
                        this.setHealthyQuestion(this.datalis.healthyQuestion)
                        this.setSleepQuestion(this.datalis.sleepQuestion)
                        this.$router.push("/anxious")
                    }else if(data.data.flag == 1){//1：有记录
                        this.messageToggle("您已填写并提交过此量表，若确定继续，将为您加载上次填写的内容。",2,"继续")
                        this.setAnxiousQuestion(data.data.gadList)
                        this.setHealthyQuestion(data.data.phqList)
                        this.setSleepQuestion(data.data.aisList)
                    }else if(data.data.flag == 2){//2：有记录并被医生审核
                        this.next = false
                        this.messageToggle("您的信息已经提交给医生，无法再次填写！")
                    }
                }
            }).catch(()=>{
                this.loadingShow = false
            })
        },
        toastToggle(msg){
            this.msg = msg
            this.toastShow = true
            let timer = setTimeout(() => {
                this.toastShow = false
                clearTimeout(timer)
            }, 1500);
        },
        messageToggle(msg,type,btnSure){
            this.loadingShow = false
            this.confirm = true
            this.type = type||1
            this.btnSure = btnSure||"确定"
            this.message = msg
        },
        confirmDialog(){
            this.confirm = false
            if(this.type == 2){
                this.$router.push("/anxious")
            }
        },
        cancelDialog(){
            this.confirm = false
        },
    },
    components:{
        Loading,
        Toast,
        ConfirmBox,
    }
}
</script>
<style lang="less" scoped>
.login {
    .logo {
        padding-top: 1rem;
        text-align: center;
        box-sizing: border-box;
        img {
            width: 2.4rem;
            padding-bottom: .6rem;
            box-sizing: border-box;
        }
        p {
            color: #333;
            font-weight: bold;
            font-size: .42rem;
        }
    }
    .person {
        padding: 1rem .76rem 0 .76rem;
        box-sizing: border-box;
        width: 100%;
        input {
            width: 100%;
            border: 1px solid #e6e6e6;
            // height: .88rem;
            // line-height: .7rem;
            border-radius: .1rem;
            padding: 0.24rem .3rem;
            box-sizing: border-box;
            margin-bottom: .4rem;
            color: #333;
        }
        button {
            width:6rem;
            height: .88rem;
            line-height: .88rem;
            background:#5B99EB;
            border-radius:.44rem;
            color: #fff;
            transform: translateX(-50%);
            position: relative;
            left: 50%;
            margin-top: 1.2rem;
            font-size: .3rem;
        }
    }
}
</style>