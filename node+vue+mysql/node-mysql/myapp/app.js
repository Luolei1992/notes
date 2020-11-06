var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// var indexRouter = require('./routes/index');
var goldRouter = require('./routes/gold');
var usersRouter = require('./routes/users');
// var readRouter = require('./routes/read');
// var readFileRouter = require('./routes/readFile');
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
  res.header('Content-Type', 'text/html; charset=utf-8');
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
app.use('/css',express.static('./public/stylesheets'));
app.use('/js',express.static('./public/javascripts'));

app.use('/gold',urlencodedParser, goldRouter);
app.use('/login',urlencodedParser, usersRouter);
// app.use('/read',urlencodedParser, readRouter);
// app.use('/readFile',urlencodedParser, readFileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


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
