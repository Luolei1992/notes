<template>
  <div class="home">
    <ul>
      <li v-for="(item,idx) in poolDetail" :key="idx">
        <span>{{pool[idx]}}: </span>
        <span>open:{{item[0]}} | now：{{item[6]}} | rate：{{((item[6]-item[0])/item[0]*100).toFixed(2)}}</span>
      </li>
    </ul>
    <div id="container">

    </div>
    <div id="containers">

    </div>
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
      pool:['hlsn','tcl','lixjm'],
      poolDetail:[],
      poolDetailShow:[],
      poolDetailShowTcl:[],
      linePlot:null,
      linePlotTcl:null,
      fst:true,
      data:[],
      yVal:1

    }
  },
  mounted () {
    this.next()
    this.getNow()
    this.getNows()
  },
  methods:{
    next(){
      // return
      setInterval(()=>{
        api.login().then((res)=>{
          let result = res.data.data.split(';'),dataArr=[];
          for(let i = 0;i < result.length;i++){
            let tmp = result[i].split('=')[1]
            if(tmp){
              let temp = tmp.split(',')
              temp.splice(0,1)
              dataArr.push(temp)
            }
          }
          this.poolDetail = dataArr
          let obj = {},tmpShowData=JSON.parse(JSON.stringify(this.poolDetailShow)),tmpShowDataTcl=JSON.parse(JSON.stringify(this.poolDetailShowTcl));
          if(this.fst){
            tmpShowData.push({time:1,value:Number(dataArr[0][0]),type:'hlsn'})
            tmpShowData.push({time:1,value:Number(dataArr[2][0]),type:'lxjm'})
            tmpShowDataTcl.push({time:1,value:Number(dataArr[1][0]),type:'tcl'})
            this.fst = false
          }
          // console.log()
          let y = this.yVal
          this.yVal = ++y
          tmpShowData.push({time:this.yVal,value:Number(dataArr[0][6]),type:'hlsn'})
          tmpShowData.push({time:this.yVal,value:Number(dataArr[2][6]),type:'lxjm'})
          tmpShowDataTcl.push({time:this.yVal,value:Number(dataArr[1][6]),type:'tcl'})
          this.poolDetailShow = tmpShowData
          this.poolDetailShowTcl = tmpShowDataTcl
          this.linePlot.changeData(tmpShowData)
          this.linePlotTcl.changeData(tmpShowDataTcl)
        })
      },3000)
    },
    getNow(){
      const linePlot = new Line(document.getElementById('container'), {
        // title: {
        //   visible: true,
        //   text: '折线图',
        // },
        description: {
          visible: true,
          text: '用平滑的曲线代替折线。',
        },
        // color:['#ccc'],
        data:this.poolDetailShow,
        // smooth:{
        //   spline:true,
        // },
        animation: {
          appear: {
            // animation: 'clipingWithData',
          },
        },
        xField: 'time',
        yField: 'value',
        seriesField: 'type',
        yAxis:{
          min:50
        }
      });
      linePlot.render();
      this.linePlot = linePlot
    },
    getNows(){
      const linePlotTcl = new Line(document.getElementById('containers'), {
        // title: {
        //   visible: true,
        //   text: '折线图',
        // },
        description: {
          visible: true,
          text: '用平滑的曲线代替折线。',
        },
        // color:['#ccc'],
        data:this.poolDetailShowTcl,
        // smooth:{
        //   spline:true,
        // },
        animation: {
          appear: {
            // animation: 'clipingWithData',
          },
        },
        xField: 'time',
        yField: 'value',
        seriesField: 'type',
        yAxis:{
          min:6
        }
      });
      linePlotTcl.render();
      this.linePlotTcl = linePlotTcl
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

