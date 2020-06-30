import axios from 'axios';
const qs = require('qs');

const urls = {
  // patInfoVerify:'/api/register',//注册
  patInfoVerify:'/api/login',//登录
  // patInfoVerify:'/pe/his/patInfoVerify',//his校验
  check:'/pe/inquiryInfo/check',//填写校验
  saveInquiry:'/pe/inquiryInfo/saveInquiry',//保存
}

export default {
  patInfoVerify(params){
    return axios.post(urls.patInfoVerify,params)
  },
  check(params){
    return axios.post(urls.check,params)
  },
  saveInquiry(params){
    return axios.post(urls.saveInquiry,params)
  },
  setCookie(name,value){
      let Days = 30;
      let exp = new Date();
      exp.setTime(exp.getTime() + Days*24*60*60*1000);
      document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
  },

  //读取cookies
  getCookie(name){
      let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  
      if(arr=document.cookie.match(reg))
  
          return unescape(arr[2]);
      else
          return null;
  },
  //删除cookies
  delCookie(name){
      let exp = new Date();
      exp.setTime(exp.getTime() - 1);
      let cval=getCookie(name);
      if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
  },
  getUrlArgObject(parm){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else if (q != null) {
      return decodeURIComponent(q[2]);
    } else {
      return null;
    }
  }
}


