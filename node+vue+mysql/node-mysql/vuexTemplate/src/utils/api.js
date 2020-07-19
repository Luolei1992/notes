import axios from 'axios'

const url = {
  dataOne:'https://m.weibo.cn/api/container/getIndex?containerid=100103type%3D1%26q%3D%E8%82%A1%E7%A5%A8%E7%AB%8B%E8%AE%AF%E7%B2%BE%E5%AF%86&page_type=searchall',
  login:'/login',
  search:'/search'
}
// axios.defaults.headers.post['Content-Type'] = 'application/javascript; charset=GB18030';
axios.defaults.headers.post['Content-Type'] = 'application/javascript; charset=GBK';

export default {
  dataOne(){
    return axios.get(url.dataOne)
  },
  login(param){
    return axios.get(url.login+'?words='+param.words)
  },
  search(param){
    return axios.get(url.search+'?words='+param.words)
    // return axios.get(url.search+'?type=&key=la&name=suggestdata_1595084911697')
  }
}