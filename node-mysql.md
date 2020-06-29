### 一、安装
1. 下载解压,路径不要有中文，安装报错百度云qq登录下载微软常用运行库合集_2019.07.20_X64.exe安装
2. bin目录下管理员身份打开dos
3. 安装mysql服务  `mysqld --install`
4. 初始化mysql会生成随机密码  `mysqld --initialize --console`
5. 开启mysql服务   `net start mysql`
6. 登录   `mysql -u root` 随机密码
7. 密码重置   `alter user 'root'@'localhost' identified by '新密码';`
8. 环境变量配置到 bin目录下
9. 关闭服务  `net stop mysql`
10. 删除服务  `mysqld-nt -remove`
11. navicat登录mysql报错'caching_sha2_password'  `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '密码';`;

### 二、Mysql基本操作
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
### 三、node操作数据库
1. 连接数据库，可能报错
    - 执行`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'luolei1992';`
2. 
