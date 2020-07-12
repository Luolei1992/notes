<template>
  <div class="reduce">
    <div class="btn" @click="reduce">REDUCE</div>
    <p class="result">结果为：{{numReduce}}</p>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
  name:'Reduce',
  computed:{
    ...mapGetters([
      'filterRNum'
    ]),
    ...mapState({
      numReduce:state=>state.numReduce.numReduce
    })
  },
  methods:{
    ...mapActions([
      'reducenum'
    ]),
    reduce(){
      this.reducenum(3)
    }
  }
}
</script>
<style lang="less" scoped>
.reduce {
  width: 100%;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  padding: 10px;
  margin: 20px 0;
  .btn {
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    background-color: #f5f5f5;
  }
  .result {
    margin: 10px 0;
  }
}
</style>