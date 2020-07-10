<template>
  <div class="fstPage">
    <div class="wrapper">
      <div class="partHead">
        <h3>9项患者健康问卷（PHQ-9）</h3>
        <p>在过去两个星期，有多少时间您被以下问题所困扰？</p>
      </div>
      <Radio :type="2"/>
      <div class="btnWrap clearfix">
        <button class="btnBack" @click="dataPartBack">上一步</button>
        <button class="btnNext" @click="dataPartOne" :style="{opacity:true?'1':'0.5'}">下一步</button>
      </div>
    </div>
    <ConfirmBox :show="confirm" @cancelDialog="cancelDialog" @confirmDialog="confirmDialog" type="1" />
  </div>
</template>
<script>
import BScroll from "better-scroll";
import Radio from "./common/Radio";
import ConfirmBox from "./common/ConfirmBox";
import { mapGetters, mapActions, mapState } from 'vuex';
import api from "../utils/api.js";

export default {
  name: "Healthy",
  data() {
    return {
      scroll: null,
      confirm:false,
      next:false
    };
  },
  computed:{
      ...mapState({
          healthyQuestion:state=>state.healthyQuestion,
          userId:state=>state.userId,
      })
  },
  mounted() {
    this.checkSelected(this.healthyQuestion)
    let id = this.userId
    if(id == ""){
      this.$router.replace("/")
    }
  },
  watch:{
     healthyQuestion:{
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
        deep:true //对象内部的属性监听，也叫深度监听
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
      this.$router.push("/sleep")
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
    confirmDialog(){
      this.confirm = false
    },
    cancelDialog(){
      this.confirm = false
    },
  },
  components: {
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