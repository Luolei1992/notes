<template>
  <div class="plus">
    <div class="btn" @click="numplus">PLUS</div>
    <p class="result">结果为：{{numPlus}}</p>
  </div>
</template>
<script>
import { mapActions,mapState, mapGetters } from 'vuex';
export default {
  name:'Plus',
  computed: {
      ...mapState({
        numPlus: state => state.numPlus.numPlus,
        numReduce: state => state.numReduce.numReduce
      }),
      ...mapGetters([
        'filterNum'
      ])
  },
  methods:{
    ...mapActions([
      'plusnum'
    ]),
    numplus(){
      this.plusnum(2)
      console.log(this.filterNum,7878)
    }
  }
}
</script>
<style lang="less" scoped>
.plus {
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