var express = require('express');
var router = express.Router();
var request=require('request');
var bodyParser = require('body-parser');

router.get('/', function(req, res, next) {
  // console.log(res.query)
  let urls = 'https://hq.sinajs.cn/?_=1600743423927/&list=gds_AUTD'  //黄金
  var e=request({
    url:urls,
    method:'GET',
    headers:{'Content-Type':'application/javascript;charset=GBK'}
  },function(error,response,body){
      res.send({'data':body });
      // console.log(body,545555555555555555)
    });
});

module.exports = router;
