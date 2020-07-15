var cors = require('cors'); 
var mysql = require('mysql');
const express = require("express");
const app = express();
app.use(cors({
  origin: ['http://192.168.2.236'],
  credentials: true
}));
//设置跨域访问
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})
// app.use('/', routes);
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(8088, () => { // 监听8088端口
	console.log('服务已启动 http://localhost:8088');
})
// var connection = mysql.createConnection({
//   host: 'http://192.168.2.236',
//   user: 'root',
//   password : 'lantone',
//   database : 'rule'
// });
 
// connection.connect();
// const query = `select * from rule where id=1`;
 
// connection.query(query, function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });
// connection.end();