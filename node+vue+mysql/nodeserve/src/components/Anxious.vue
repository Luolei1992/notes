<template>
  <div class="fstPage">
    <div class="wrapper">
      <div class="partHead">
        <h3>7项广泛性焦虑障碍量表（GAD-7）</h3>
        <p>在过去两个星期，有多少时间您被以下问题所困扰？</p>
      </div>
      <Radio :type="1"/>
      <button class="btnNext" @click="dataPartOne" :style="{opacity:true?'1':'0.5'}">下一步</button>
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
  name: "Anxious",
  data() {
    return {
      scroll: null,
      next:false,
      confirm:false,
    };
  },
  computed:{
      ...mapState({
          anxiousQuestion:state=>state.anxiousQuestion,
          userId:state=>state.userId,
      })
  },
  mounted() {
    this.checkSelected(this.anxiousQuestion)
    let id = this.userId
    api.setCookie("clear",1)
    if(id==""){
      this.$router.replace("/")
    }
  },
  watch:{
     anxiousQuestion:{
        handler:function(val){
          this.checkSelected(val)
        },
        deep:true  //对象内部的属性监听，也叫深度监听
      },
  },
  methods: {
    dataPartOne(){
      if(!this.next){
        this.confirm = true
        return
      }
      this.$router.push("/healthy")
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
  .scrollPart {
  }
  .btnNext {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 94%;
    height: .88rem;
    line-height: .88rem;
    text-align: center;
    border-radius: .44rem;
    background-color: #5B99EB;
    color: #fff;
    margin: 1.6rem 0 .7rem 0;
  }
}
</style>