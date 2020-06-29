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


