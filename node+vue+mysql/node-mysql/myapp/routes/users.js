var express = require('express');
var http = require('http');
var router = express.Router();

var service = require('../services/index.js');
const { json } = require('express');
/* GET users listing. */
// router.get('/', service.homeDetail);
router.get('/', function(req, res, next){
  let urls = 'https://m.weibo.cn/api/container/getIndex?containerid=100103type%3D1%26q%3D%E8%82%A1%E7%A5%A8%E7%AB%8B%E8%AE%AF%E7%B2%BE%E5%AF%86&page_type=searchall'
  let body = ''
  http.get(urls, (response) => {
    response.on('data', (data) => {
      body += data
    }).on('end', () => {
      res_data = JSON.parse(body)
      console.log(res_data.data)
    }).on('error', (error) => {
      console.log(error)
    })
  })
  res.send(body)
});

module.exports = router;
