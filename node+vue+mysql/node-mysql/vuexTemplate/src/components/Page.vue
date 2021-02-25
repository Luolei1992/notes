<template>
  <div class="page">
    <a-table :columns="columns" :data-source="poolDetail" size="small" :pagination="false" :scroll="{ x: 600 }"> 
      <span slot="names" slot-scope="text" :style="{'color':select.indexOf(text)<0?'#ccc':'#000'}">
        {{ text }}
      </span>
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag > 0 ? '#ccc' : '#ccc'"
        >
          {{ tag>0?'+'+tag:tag }}%
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a>Invite 一 {{ record.name }}</a>
        <a-divider type="vertical" />
        <a>Delete</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
      </span>
    </a-table>
    <div>
      <p>当前：{{goldList[0]&&goldList[0].split('\"')[1]}}</p>
      <p>最高：{{goldList[4]}}</p>
      <p>最低：{{goldList[5]}}</p>
    </div>
    <pre v-html="html">
      {{html}}
    </pre>
  </div>
</template>
<script>
import api from '../utils/api';

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    title:'name',
    fixed: 'left',
    width: 74,
    scopedSlots: { customRender: 'names' }
  },
  {
    title: 'today',
    dataIndex: 'today',
    key: 'today',
  },
  {
    title: 'new',
    key: 'new',
    dataIndex: 'new',
  },
  {
    title: 'rate',
    key: 'rate',
    dataIndex: 'rate',
    sorter: (a, b) => a.rate - b.rate,
    scopedSlots: { customRender: 'tags' }
  },
  {
    title: 'num',
    key: 'num',
    dataIndex: 'num',
    sorter: (a, b) => a.num - b.num,
  },
  {
    title: 'high',
    key: 'high',
    dataIndex: 'high',
  },
  {
    title: 'last',
    dataIndex: 'last',
    key: 'last',
  },
  {
    title: 'money',
    dataIndex: 'money',
    key: 'money',
  },
];

export default {
  name:'Page',
  data(){
    return {
      columns,
      value: '',
      searchResult:[],
      poolDetail:[],
      pool:['永辉超市','天山股份','立讯精密','歌尔股份','海螺水泥','伊利股份','比亚迪','华兰生物','中信证券','万年青','360','长电科技','华天科技'],
      searchList:['sh601933','sz000877','sz002475','sz002241','sh600585','sh600887','sz002594','sz002007','sh600030','sz000789','sh601360','sh600584','sz002185'],
      search:[],
      goldList:[],
      select:['万年青','360','长电科技','华天科技'],
      html:null
    }
  },
  mounted(){
    this.getGold()
    setInterval(()=>{
      this.getList()
      this.getGold()
    },2500)
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    getGold(){
      api.gold().then((res)=>{
        let data = res.data.data
        let tmp = data.split("=")[1].split(',').splice(0,6)
        this.goldList = tmp
        if(tmp[0]&&tmp[0].split('\"')[1]<390.5){
          alert(99)
        }
      })
    },
    handleChange(value) {
      this.value = value;
      let tmplis = JSON.parse(JSON.stringify(this.searchList))
      let tmpool = JSON.parse(JSON.stringify(this.pool))
      tmplis.push(value)
      tmpool.push(value)
      this.searchList = tmplis
      this.pool = tmpool
      this.searchVal(value)
    },
    getList(){
      let param = {
        words:this.searchList.join(',')
      }
      api.login(param).then((res)=>{
        let result = res.data.data.split(';'),dataArr=[];
          for(let i = 0;i < result.length;i++){
            let tmp = result[i].split('=')[1]
            let obj=  {key: i}
            if(tmp){
              let temp = tmp.split(',')
              temp.splice(0,1)
              obj.name = this.pool[i]
              obj.today = Number(temp[0]).toFixed(2)
              obj.new = Number(temp[2]).toFixed(2)
              obj.rate = [((temp[2]-temp[1])/temp[0]*100).toFixed(2)]
              obj.num = (temp[2]-temp[0]).toFixed(2)
              obj.high = Number(temp[3]).toFixed(2)
              obj.last = Number(temp[1]).toFixed(2)
              obj.money = (temp[8]/100000000).toFixed(2)
              if(obj.rate<-8&&obj.name=='复星医药'){
                alert(9999)
              }
              dataArr.push(obj)
            }
          }
          this.poolDetail = dataArr
      })
    }
  }
}
</script>
<style lang="less" scoped>
.page {
  padding: 30px 10px;
}
.line {
  height: 20px;
  width: 100%;
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