<template>
  <div class="home">
    <ul>
      <li v-for="(item,idx) in poolDetail">
        <span>{{pool[idx]}}: </span>
        <span>{{item[0]}} | {{item[1]}} | {{item[2]}} | {{item[3]}} | {{item[4]}} | {{item[5]}} | {{item[6]}}</span>
      </li>
    </ul>
    <div id="container">

    </div>
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
import { Line } from '@antv/g2plot';
const dataAll = require('../utils/data.json')
export default {
  name: 'Home',
  data(){
    return {
      msg:'',
      result:false,
      resultR:false,
      pool:['zhonghgf','wangfj','lixjm'],
      poolDetail:[],
      data:dataAll||[]
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
    this.next()
    this.getNow()
  },
  methods:{
    next(){
      // setInterval(()=>{
        api.login().then((res)=>{
          let result = res.data.data.split(';'),dataArr=[];
          for(let i = 0;i < result.length;i++){
            let tmp = result[i].split('=')[1]
            console.log(tmp)
            if(tmp){
              let temp = tmp.split(',')
              temp.splice(0,1)
              dataArr.push(temp)
            }
          }
          this.poolDetail = dataArr
          console.log(dataArr)
        })
      // },3000)
    },
    getNow(){
      let data = this.data
      const linePlot = new Line(document.getElementById('container'), {
        title: {
          visible: true,
          text: '2000 ~ 2018 年各国家 GDP 趋势对比',
        },
        description: {
          visible: true,
          text: '图形标签 (label) 位于折线尾部，用于标注整根折线，并有带有排名的含义在其中。',
        },
        padding: [20, 100, 30, 80],
        forceFit: true,
        data,
        xField: 'year',
        yField: 'gdp',
        seriesField: 'name',
        xAxis: {
          type: 'dateTime',
          label: {
            visible: true,
            autoHide: true,
          },
        },
        yAxis: {
          formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
        },
        legend: {
          visible: false,
        },
        label: {
          visible: true,
          type: 'line',
        },
        animation: {
          appear: {
            animation: 'clipingWithData',
          },
        },
        smooth: true
      });
      linePlot.render();
    }
  },
  components:{
    Plus,
    Reduce
  }
}
</script>

<style lang="less" scoped>
ul {
  margin-top: 20px;
  li {
    padding: 8px 15px;
    font-size: 12px;
  }
}
.home {
  padding: 15px;
}
.red {
  color: red;
}
.next {
  background-color: #ccc;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  height: 50px;
  line-height: 50px;
}
</style>



