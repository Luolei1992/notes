var mysql = require('mysql');
const {querySql} = require('../utils/index.js')

// 登录
function homeDetail(req, res, next) {
  const query = `select * from users where id=2`;
  querySql(query).then(data => {
    var result = JSON.parse(JSON.stringify(data))[0]
    res.type('html');
    res.set('Content-Type', 'text/html')
    res.render('index') 
    console.log(result,4545)
  })
  // next()
}

module.exports = {
  homeDetail
}
