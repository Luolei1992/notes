var express = require('express');
var http = require('http');
var router = express.Router();
var request=require('request');
var service = require('../services/index.js');
const { json } = require('express');
var Iconv = require('iconv-lite');
// router.get('/', service.homeDetail);
router.get('/', function(req, res, next){
  // let urls = 'https://m.weibo.cn/api/container/getIndex?containerid=100103type%3D1%26q%3D%E8%82%A1%E7%A5%A8%E7%AB%8B%E8%AE%AF%E7%B2%BE%E5%AF%86&page_type=searchall'
  // let urls = 'https://www.easy-mock.com/mock/5abf10708966673c04832664/team_details'
  // let urls = 'https://hq.sinajs.cn/etag.php?_=1594395505536&list=gb_$inx,gb_ixic'
  // let urls = 'https://hq.sinajs.cn/etag.php?rn=1594397110558&list=gb_aapl,gb_goog,gb_baba,gb_fb,gb_amzn,gb_bidu,gb_sina,gb_jd,gb_tsla,gb_intc'
  let urls = 'http://hq.sinajs.cn/list=gb_tsla,gb_baba'

  // res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
  var e=request({url:urls,
      method:'GET',
      // headers:{'Content-Type':'text/json' }
    },function(error,response,body){
      console.log(error,response,body)
      
      res.send({'data':Iconv.decode(body, 'utf-8').toString() } );
    });
  // res.send('body')
  // res.render('index')
});

module.exports = router;