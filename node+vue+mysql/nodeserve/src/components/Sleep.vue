<template>
  <div class="fstPage">
    <div class="wrapper">
      <div class="partHead">
        <h3>阿森斯失眠量表（AIS）</h3>
        <p>在过去一个月当中，如果以下问题一周至少3次出现在您身上，就请选出您相应的自我评估结果</p>
      </div>
      <Radio :type="3"/>
      <div class="btnWrap clearfix">
        <button class="btnBack" @click="dataPartBack">上一步</button>
        <button class="btnNext" @click="dataPartOne" :style="{opacity:true?'1':'0.5'}">提交</button>
      </div>
    </div>
    <Loading v-if="loadingShow"/>
    <ConfirmBox :show="confirm" @cancelDialog="cancelDialog" @confirmDialog="confirmDialog" :type="type" :sure="btnSure" :message="message" />
  </div>
</template>
<script>
import BScroll from "better-scroll";
import Loading from "./common/Loading";
import Radio from "./common/Radio";
import ConfirmBox from "./common/ConfirmBox";
import api from "../utils/api.js";
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: "Sleep",
  data() {
    return {
      loadingShow:false,
      scroll: null,
      type: 1,
      btnSure:"",
      message:"",
      next:false,
      confirm:false,
    };
  },
  computed:{
      ...mapState({
          anxiousQuestion:state=>state.anxiousQuestion,
          healthyQuestion:state=>state.healthyQuestion,
          sleepQuestion:state=>state.sleepQuestion,
          id:state=>state.userId,
          name:state=>state.userName,
          hospitalCode:state=>state.hospitalCode,
      })
  },
  mounted() {
      this.checkSelected(this.sleepQuestion)
      if(this.id == ""){
        this.$router.replace("/")
      }
  },
  watch:{
     sleepQuestion:{
        handler:function(val,oldval){
          let numPlus = 0;
          for(let i = 0;i < val.length;i++){
            let tmp = val[i]
            if(tmp.answer){
              ++numPlus
            }
          }
          if(numPlus == val.length){
            this.next = true
          }
        },
        deep:true//对象内部的属性监听，也叫深度监听
      },
  },
  methods: {
    dataPartBack(){
      this.$router.go(-1)
    },
    dataPartOne(){
      if(!this.next){
        this.confirm = true
        return
      }
      this.check()
    },
    checkSelected(val){
      let numPlus = 0;
      for(let i = 0;i < val.length;i++){
        let tmp = val[i]
        if(tmp.answer){
          ++numPlus
        }
      }
      if(numPlus == val.length){
        this.next = true
      }
    },
    check(){
        let param = {
            "idNum": this.id,
            "patName": this.name,
            "hospitalCode": this.hospitalCode,
        }
        this.loadingShow = true
        api.check(param).then(res => {
            let data = res.data
            if(data.code==0){
                if(data.data.flag == 0){ //直接进入表单填写
                  this.saveInquire()
                }else if(data.data.flag == 1){//1：有记录
                    this.messageToggle("您已填写过本量表，如果重复提交将覆盖之前的测试结果。确定要继续吗？",2,"继续")
                }else if(data.data.flag == 2){//2：有记录并被医生审核
                    this.messageToggle("您的信息已经提交给医生，无法再次提交！")
                }
            }
        }).catch(()=>{
            this.loadingShow = false
        })
    },
    saveInquire(){
      let list1 = this.anxiousQuestion
      let list2 = this.healthyQuestion
      let list3 = this.sleepQuestion
      
      let param = {
        "detailList": list1.concat(list2,list3),
        "hospitalCode": this.hospitalCode,
        "idNum": this.id,
        "patName": this.name
      }
      api.saveInquiry(param).then(res => {
          let data = res.data
          this.loadingShow = false
          if(data.code==0){
            this.$router.push({
              path:"/end",
              query:{type:2}
            })
          }else{
            this.$router.push({
              path:"/end",
              query:{type:1}
            })
          }
      }).catch(()=>{
          this.loadingShow = false
          this.$router.push({
            path:"/end",
            query:{type:1}
          })
      })
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
        this.saveInquire()
      }
    },
    cancelDialog(){
      this.confirm = false
    },
  },
  components: {
    Loading,
    Radio,
    ConfirmBox
  }
};
</script>
<style lang="less" scoped>
.fstPage {
  .wrapper {
    height: 100%;
    width: 100%;
    position: fixed;
    background-color: #f5f5f5;
    box-sizing: border-box;
    overflow: auto;
    padding-top: 2.1rem;
  }
  .partHead {
    padding: .3rem;
    box-sizing: border-box;
    background-color: #fff;
    position: fixed;
    top: 0;
    z-index: 10;
    height: 2.1rem;
    h3 {
      color: #5B99EB;
      font-size: .36rem;
      margin-bottom: .2rem;
    }
  }
  .scrollPart {
  }
  .btnWrap {
    padding: 0 .3rem;
    box-sizing: border-box;
    text-align: center;
  }
  .btnBack {
    width: 48%;
    height: .88rem;
    line-height: .88rem;
    text-align: center;
    border-radius: .44rem;
    background-color: #f5f5f5;
    color: #5B99EB;
    border: 1px solid #5B99EB;
    margin: 1.6rem 0 .7rem 0;
    box-sizing: border-box;
    float: left;
  }
  .btnNext {
    width: 48%;
    height: .88rem;
    line-height: .88rem;
    text-align: center;
    border-radius: .44rem;
    background-color: #5B99EB;
    color: #fff;
    margin: 1.6rem 0 .7rem 0;
    float: right;
  }
}
</style>