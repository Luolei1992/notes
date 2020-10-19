var express = require('express');
var router = express.Router();
var request=require('request');
var bodyParser = require('body-parser');
const iconv = require('iconv-lite');


router.get('/', function(req, res, next) {
  // console.log(res.query)
  let urls = 'https://m.ranwen.la/files/article/93/93446/10382811.html' 
  var e=request({
    url:urls,
    method:'GET',
    headers:{'Content-Type':'text/html;charset=utf-8'}
  },function(error,response,body){
      res.send({'data':iconv.decode(body,'utf-8') });
      console.log(iconv.decode(body,'GBK'),545555555555555555)
  });
});

module.exports = router;
