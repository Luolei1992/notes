<template>
  <div class="page">
    <p></p>
    <h1>RouterPage</h1>
    <button @click="plus">加加加 <span class="red">({{numPlus}})</span></button>
    <button @click="reduce">减减减 <span class="red">({{numReduce}})</span></button>
    <p class="back" @click="back">Back</p>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name:'Page',
  data(){
    return {
      msg:'sdadsa'
    }
  },
  computed:{
    ...mapState({
      numPlus: state => state.numPlus.numPlus,
      numReduce: state => state.numReduce.numReduce
    }),
  },
  methods:{
    ...mapActions([
      'plusnum',
      'reducenum'
    ]),
    plus(){
      this.plusnum(5)
    },
    reduce(){
      this.reducenum(1)
    },
    back(){
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.page {
  padding: 15px;
}
h1 {
  font-size: 28px;
  text-align: center;
  margin: 20px;
}
button {
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 50%;
  box-sizing: border-box;
  outline: none;
  margin: 30px 0;
}
.red {
  color: red;
}
.back {
  background-color: blue;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  height: 50px;
  line-height: 50px;
}
</style>