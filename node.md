## 一、node版本管理工具nvm
1. 下载地址：https://github.com/coreybutler/nvm-windows/releases
2. 命令
    - nvm list 安装的node版本
    - nvm install <node版本号>
    - nvm use <node版本号>

## 二、node遵循的是commonJs规范
```
function add (a,b){
    return a+b
}
function mul (a,b){
    return a*b
}
module.exports = {//导出module.export
    add,
    mul
}
```
```
const {add,mul} = require('./b.js') //导入require
const _ = require('lodash')  //引用npm包

let num = add(10,20)
let num2 = mul(10,20)
console.log(num,num2)

const arr = _.concat([1,2],3)
console.log(arr)   //[1,2,3]
```

## 三、debugger调试
-- 直接vscode调试

## 四、常用知识
- pm2进城守候，服务挂掉自动重启
- CPU和内存优化和扩展（用stream写日志，redis存session）

## 五、http-概述
1. DNS解析，建立TCP（传输协议）连接，发送http请求
2. server接收到http请求，处理并返回
3. 客户端接收到返回的数据，处理数据（渲染页面执行js。。）
4. https默认端口443 http默认端口80

## 六、处理get/post请求
1. get请求
    - get请求，即客户端向server端获取数据
    - 通过querystring来传递数据，如a.html?a=1&b=2
    - 浏览器直接访问，就发送get请求
2. post请求
    - post请求，即客户端向server端传递数据
    - 通过post data传递数据
    - 浏览器无法直接模拟，需要用到js或者postman

## 七、环境搭建
1. 安装：
    - cnpm install nodemon cross-env --save-dev (nodemon启动工具，cross-env能跨平台地设置及使用环境变量)
2. 设置启动项(npm run dev)
    ```
    "scripts": {
        "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js"
    }
    ```
3. 获取当前环境(测试环境，生产环境...)
    ```
    process.env.NODE_ENV  //通过获取的环境来改变配置，线上线下环境配置等
    ```

## 八、接口开发
 > 后续补充实例
## 九、Mysql基本操作
1. 新建数据库，工具栏圆柱+，点击新建
2. 显示所有数据库  `show databases;`
3. 建表，右击数据库展开的tables选择创建表
4. 建表选项 
    - pk：主键不可重复
    - nn：不能为空
    - AI：自动增加
    - default：默认值
5. 数据类型限制
    - int：整型
    - varchar(20):字符串20个字符
    - longtext：4个g大小
    - bigint(20):可存储20位整数
6. 操作表
    - `use [表名];` //选择表明
    - `show tables;`  //显示所有表
    - `-- show tables;`//双短横线为注释
    - `select version();`//查询mysql版本
    - 插入数据(增)
    > `insert into users (username,`password`,realname) values ('zhangsan','123','张三');`//插入一条数据
    - 查询(查)
    > `select * from users;`//查询所有(尽量不用*避免性能问题)
    > `select id,username from users`
    > `select * from users where username='zhangsan' and `password`='123';`
    > `select * from users where username='zhangsan' or `password`='123';`
    > `select * from users where username like '%zhang%';`//模糊查询
    > `select * from users where `password` like '%1%' order by id (desc);`//默认正序（desc为倒序）
    - 更新(改)
    > `update users set realname='李四2' where username='lisi';`//可能报错
    > `SET SQL_SAFE_UPDATES=0;`//执行解决问题
    - 删除(删)
    > `delete from users where username='lisi';`//后面注意加上where条件否者会全部删除，不可恢复
    > `update users set state='0' where username='lisi';`//软删除，标记状态为0,可恢复数据
    > ``
## 十、node操作数据库
1. 连接数据库，可能报错
    - 执行`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'luolei1992';`
2. 


