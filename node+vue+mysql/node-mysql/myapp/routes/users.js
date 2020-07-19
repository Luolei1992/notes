var express = require('express');
var http = require('http');
var router = express.Router();
var request=require('request');
var service = require('../services/index.js');
// const { json } = require('express');
// router.get('/', service.homeDetail);
router.get('/', function(req, res, next){
  let words = req.query.words||'sz002475'
  let urls = 'http://hq.sinajs.cn/list='+words  //新浪自选股

  var e=request({
      url:urls,
      method:'GET',
      headers:{'Content-Type':'text/json'}
    },function(error,response,body){
      res.send({'data':body } );
      // console.log(response)
    });
  // res.send('body')
  // res.render('index')
});

module.exports = router;
