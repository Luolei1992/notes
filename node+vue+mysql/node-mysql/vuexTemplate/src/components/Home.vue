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
    <p class="next" @click="next">Next</p>
  </div>
</template>

<script>
import api from '../utils/api';
import { Line } from '@antv/g2plot';
export default {
  name: 'Home',
  data(){
    return {
      msg:'',
      result:false,
      resultR:false,
      pool:['zhonghgf','wangfj','lixjm'],
      poolDetail:[],
      linePlot:null,
      data:[
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
      ]
    }
  },
  mounted () {
    // this.next()
    this.getNow()
  },
  methods:{
    next(){
      let dataUpdata = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
      ]
      dataUpdata.push({ year: '2000', value: 9 })
      this.linePlot.changeData(dataUpdata)
      return
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
      const linePlot = new Line(document.getElementById('container'), {
        title: {
          visible: true,
          text: '折线图',
        },
        description: {
          visible: true,
          text: '用平滑的曲线代替折线。',
        },
        data:this.data,
        smooth:{
          spline:true,
        },
        meta: {
          year: {
            alias:'年份',
            range: [0, 1],
          },
          value: {
            alias: '数量',
            formatter:(v)=>{return `${v}个`}
          }
        },
        animation: {
          appear: {
            animation: 'clipingWithData',
          },
        },
        xField: 'year',
        yField: 'value',
      });
      linePlot.render();
      this.linePlot = linePlot
    }
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



