var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var cors=require('cors');
app.use(bodyParser.json()); 
app.use(cors()); // 注入cors模块解决跨域
// app.use(cors({
//     origin:['http://192.168.2.236','http://localhost'],  //指定接收的地址
//     methods:['GET','POST'],  //指定接收的请求类型
//     alloweHeaders:['Content-Type','Authorization']  //指定header
// }))
//设置跨域允许被访问
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  // res.header('Content-Type', 'application/javascript; charset=GB18030');
  res.header('Content-Type', 'application/javascript; charset=GBK');
  next();
});


// view engine setup
app.set('views',path.join(__dirname , 'views'));
app.set('Content-Type: text/html');
app.engine('.html', require('ejs').__express);  
app.set('view engine', 'html'); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
// app.use('/css',express.static('./public/stylesheets'));
// app.use('/js',express.static('./public/javascripts'));

app.use('/search',jsonParser, indexRouter);
app.use('/login',urlencodedParser, usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//钉钉消息发送
// const ChatBot = require('dingtalk-robot-sender');
// // 直接使用 webhook
// const robot = new ChatBot({
//   webhook: 'https://oapi.dingtalk.com/robot/send?access_token=e868521fa611305b4fea354af3c895286f5e7a0979e534f7112644e7b314e1dc'
// });
// 组合 baseUrl 和 accessToken 如果采用加签方式的安全设置，同时填写secret
// const robot = new ChatBot({
//   baseUrl: 'https://oapi.dingtalk.com/robot/send',
//   accessToken: 'e868521fa611305b4fea354af3c895286f5e7a0979e534f7112644e7b314e1dc',
//   secret: '',
// });
// 自定义 httpclient
// const robot = new ChatBot({
//   baseUrl: 'https://oapi.dingtalk.com/robot/send',
//   accessToken: 'e868521fa611305b4fea354af3c895286f5e7a0979e534f7112644e7b314e1dc',
//   secret: '',
//   httpclient: require('urllib')
// });
// 发送钉钉消息
// let textContent = {
//   "msgtype": "text", 
//   "text": {
//     "content": "注意：都比来了"
//   }, 
//   "at": {
//     "atMobiles": [
//       "156xxxx8827", 
//       "189xxxx8325"
//     ], 
//     "isAtAll": false
//   }
// }
// robot.send(textContent)
//   .then((res) => {
//     // TODO
//     console.log(res)
//   });



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
