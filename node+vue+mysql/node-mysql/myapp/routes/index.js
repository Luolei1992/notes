var express = require('express');
var router = express.Router();
var request=require('request');
var bodyParser = require('body-parser');

router.get('/', function(req, res, next) {
  console.log(res.query)
  let words = req.query.words
  let urls = 'http://suggest3.sinajs.cn/suggest/type=&key='+words+'&name=suggestdata_1595084911697'  //新浪自选股
  var e=request({
    url:urls,
    method:'GET',
    headers:{'Content-Type':'application/javascript; charset=GBK'}
  },function(error,response,body){
      res.send({'data':body });
      // console.log(body,545555555555555555)
    });
});

module.exports = router;
