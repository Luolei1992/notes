import axios from 'axios'

const url = {
  login:'/login',
  gold:'/gold',
}
// axios.defaults.headers.post['Content-Type'] = 'application/javascript; charset=GB18030';
axios.defaults.headers.get['Content-Type'] = 'text/html; charset=utf-8';

export default {
  gold(){
    return axios.get(url.gold)
  },
  login(param){
    return axios.get(url.login+'?words='+param.words)
  }
}