<template>
  <div class="page">
    <div class="search">
      新增：
      <a-select
        show-search
        :value="value"
        placeholder="input search name or code"
        style="width: 70%"
        :default-active-first-option="false"
        :show-arrow="false"
        :filter-option="false"
        :not-found-content="null"
        @search="handleSearch"
        @change="handleChange"
      >
        <a-select-option v-for="d in searchResult" :key="d.value">
          {{ d.text }}
        </a-select-option>
      </a-select>
    </div>
    <div class="line"></div>
    <a-table :columns="columns" :data-source="poolDetail" size="small" :pagination="false" :scroll="{ x: 600 }"> 
      <a slot="name" slot-scope="text">{{ text }}</a>
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
    <!-- <a-button size="small" block @click="back"> 
      Back
    </a-button> -->
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
      pool:['立讯精密','tcl','海螺水泥','中环股份','中航重科','比亚迪','牧原股份','双汇发展','伟明环保','三一重工','比音勒分'],
      // pool:['lixjm','tcl','hlsn','zhgf','zlzk','byd','mygf','shfz','wmhb','syzg'],
      searchList:['sz002475','sz000100','sh600585','sz002129','sz000157','sz002594','sz002714','sz000895','sh603568','sh600031','sz002832'],
      search:[]
    }
  },
  mounted(){
    this.searchVal()
    setInterval(()=>{
      this.getList()
    },2500)
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    handleSearch(value) {
      this.searchVal(value)
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
    searchVal(value){
      api.search({words:value||'lxjm'}).then((res)=>{
        let result = res.data.data.split(';'),dataArr=[];
        for(let i = 0;i < result.length;i++){
          let tmp = result[i].split('=')[1]
          let obj=  {key: i}
          if(tmp){
            let temp = tmp.split(',')
            temp.splice(0,1)
            obj.text = temp[2]
            obj.value = temp[2]
            dataArr.push(obj)
          }
        }
        this.searchResult = dataArr
      })
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
              if(obj.rate<-1&&obj.name=='立讯精密'){
                alert(99)
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