<template>
  <div class="home">
    <h1>阿里巴巴：{{ msg[0] }}</h1>
    <h1>特斯拉：{{ msg[1] }}</h1>
    <!-- <p>计算属性：</p>
    <p>是否大于10？<span class="red">{{result}}</span></p>
    <p>是否小于2？<span class="red">{{resultR}}</span></p>
    <Plus/>
    <Reduce/> -->
    <p class="next" @click="next">Next</p>
  </div>
</template>

<script>
import api from '../utils/api';
import Plus from './Plus';
import Reduce from './Reduce';
import {mapGetters} from 'vuex';
export default {
  name: 'Home',
  data(){
    return {
      msg:'',
      result:false,
      resultR:false
    }
  },
  computed:{
    ...mapGetters([
      'filterNum',
      'filterRNum'
    ])
  },
  watch:{
    filterNum:function(value){
        this.result = this.filterNum;
    },
    filterRNum:function(value){
        this.resultR = this.filterRNum;
    },
  },
  mounted () {

  },
  methods:{
    next(){
      // this.$router.push({
      //   path:'/page'
      // })
      setInterval(()=>{
        api.login().then((res)=>{
          let data = res.data.data.split('var hq_str_gb')
          let dataArr = []
          dataArr.push(data[1].substring(0,40).split(',')[1])
          dataArr.push(data[2].substring(0,40).split(',')[1])
          console.log(dataArr)
          this.msg = dataArr
        })
      },1000)
    }
  },
  components:{
    Plus,
    Reduce
  }
}
</script>

<style lang="less" scoped>
h1 {
  font-size: 28px;
  text-align: center;
  margin: 20px;
}
.home {
  padding: 15px;
}
.red {
  color: red;
}
.next {
  background-color: blue;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  height: 50px;
  line-height: 50px;
}
</style>
