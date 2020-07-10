var express = require('express');
var router = express.Router();

var service = require('../services/index.js');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('index')
});

module.exports = router;
