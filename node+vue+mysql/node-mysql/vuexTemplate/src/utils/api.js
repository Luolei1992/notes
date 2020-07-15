import axios from 'axios'

const url = {
  dataOne:'https://m.weibo.cn/api/container/getIndex?containerid=100103type%3D1%26q%3D%E8%82%A1%E7%A5%A8%E7%AB%8B%E8%AE%AF%E7%B2%BE%E5%AF%86&page_type=searchall',
  login:'/login'
}


export default {
  dataOne(){
    return axios.get(url.dataOne)
  },
  login(){
    return axios.get(url.login)
  }
  
}