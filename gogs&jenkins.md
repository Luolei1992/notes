## window环境安装gogs
### 安装按照官网方式就可以
### 注意
    1. 先安装数据库，需新增数据库作为gogs数据存储
    2. 安装NSSM注册服务
    3. 配置文件（....\gogs\custom\conf）
      - 配置RUN_USER本机用户名不能乱改否则无权限操作
      - server中的地址端口改掉3000端口用的比较多避免冲突
    4.启动服务用nssm启动nssm start gogs,不要用net start gogs
    
## jenkins下载（选择Generic Java package (.war)）
### 安装：
 - 需要java环境8或者11（环境变量配置）
 - 命令行切换到jenkins文件目录下执行` java -jar jenkins.war --port:8084`可能需要等很长时间下载插件
 - 成功后localhost:8080会有提初始密码位置，复制粘贴进入jenkins，设置用户，选择推荐插件
 - docker run -p 3306:3306 --name mymysql -v /home/mysql/data:/val/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.6
 - docker run -p 5000:5000 -v /home/registry_images:/var/lib/registry -d registry
 - 启动容器 docker start <images id>
 - 启动停止 docker stop <images id>
 - ssh root@192.168.1.13
 - docker run -d  --restart=always  --name shangcheng -p 8088:8088 -v /data/vueNginx/html:/usr/share/nginx/html:rw -v /data/ vueNginx/nginx.conf:/etc/nginx/nginx.conf -v /data/ vueNginx/conf.d/default.conf:/etc/nginx/conf.d/ default.conf -v /data/vueNginx/logs:/var/log/nginx/ :rw nginx

## docker安装
### 

## nginx启动停止

```start nginx.exe      nginx -s quit```


### windows前端自动化部署整套流程启动所需环境
1. mysql
2. NSSM、gogs
3. java环境jdk、jre
4. docker(目前这台电脑不支持安装虚拟环境)、jenkins
5. nginx

