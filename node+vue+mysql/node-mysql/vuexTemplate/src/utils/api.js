import axios from 'axios'
import { param } from '../../../myapp/routes';

const url = {
  dataOne:'https://m.weibo.cn/api/container/getIndex?containerid=100103type%3D1%26q%3D%E8%82%A1%E7%A5%A8%E7%AB%8B%E8%AE%AF%E7%B2%BE%E5%AF%86&page_type=searchall',
  login:'/login',
  search:'/search',
  gold:'/gold',
  readFile:'/readFile',
}
// axios.defaults.headers.post['Content-Type'] = 'application/javascript; charset=GB18030';
axios.defaults.headers.get['Content-Type'] = 'text/html; charset=utf-8';

export default {
  dataOne(){
    return axios.get(url.dataOne)
  },
  readFile(){
    return axios.get(url.readFile)
  },
  gold(){
    return axios.get(url.gold)
  },
  login(param){
    return axios.get(url.login+'?words='+param.words)
  },
  search(param){
    return axios.get(url.search+'?words='+param.words)
  }
}