## 流行工具&框架
## shell
###	什么是shell
- 在计算机科学中，Shell俗称壳，用来区别于Kernel（核），是指“提供使用者使用界面”的软件（命令解析器）。
它类似于DOS下的command和后来的cmd.exe。它接收用户命令，然后调用相应的应用程序。

### shell分类
- 图形界面shell：通过提供友好的可视化界面，调用相应应用程序，
  如windows系列操作系统，Linux系统上的图形化应用程序Unity、KDE等。
- 命令行shell：通过键盘输入特定命令的方式，调用相应的应用程序，
  如windows系统的cmd.exe、Windows PowerShell，
  Linux系统的Bourne shell ( sh)、Bourne Again shell ( bash)、zsh等
### 认识bash这个shell
- 在window系统下使用bash，需要一个软件，这个软件模拟集成了bash大部分命令。
各个 shell 的功能都差不多， Linux 默认使用 bash ，所以我们主要学习bash的使用。
### bash命令格式
命令 [-options] [参数]，如：mkdir blog   如果有<>表示必须要有这个参数,[]可选参数
查看帮助：--help是命令的一个参数,命令后面加上 --help 或者 -h , -h是--help的缩写形式 可以打开命令的一个说明，说明中有这个命令的参数的具体的解释
### bash常见命令
- pwd (Print Working Directory) 查看当前目录

- cd (Change Directory) 
   切换目录，如 cd etc
   寻找上级目录 cd ..
   在寻找目录的的时候----tab键去补全
   也可以通过 cd a/b/c 一个路径的形式去进入目录

- ls (List) 查看当前目录下内容，如 ls -al

- mkdir (Make Directory) 创建目录，如 mkdir blog

- touch 创建文件，如 touch index.html

- cat 查看文件全部内容，如 cat index.html

- rm (remove) 删除文件，如 rm index.html、rm -rf  blog(慎用-删除非空)

- rmdir (Remove Directory) 删除文件夹，只能删除空文件夹，不常用

- mv (move) 移动文件或重命名，如 mv index.html ./demo/index.html

- cp (copy) 复制文件，cp index.html ./demo/index.html

- head 查看文件前几行，如 head -5 index.html

- tail 查看文件后几行 –n，如 tail index.html、tail -n  5 index.html 

- tab 自动补全，连按两次会将所有匹配内容显示出来

- history 查看操作历史

- curl 网络请求，如curl http://www.baidu.com

## vi编辑器

### 什么是vi编辑器

- 如同Windows下的记事本，vi编辑器是Linux下的标配，通过它我们可以创建、编辑文件。
  它是一个随系统一起安装的文本编辑软件。
### 三种模式
- vi编辑器提供了3种模式，分别是命令模式、插入模式、底行模式，每种模式下用户所能进行的操作是不一样的。

### 使用vi编辑器
	a) 打开/创建文件， vi 文件路径
	b) 底行模式 :w保存，:w filenme另存为
	c) 底行模式 :q退出
	d) 底行模式 :wq保存并退出
	e) 底行模式 :e! 撤销更改，返回到上一次保存的状态
	f) 底行模式 :q! 不保存强制退出
	g) 底行模式 :set nu 设置行号
	h) 命令模式 ZZ（大写）保存并退出
	i) 命令模式 u辙销操作，可多次使用
	j) 命令模式 dd删除当前行
	k) 命令模式 yy复制当前行
	l) 命令模式 p 粘贴内容
	m) 命令模式 ctrl+f向前翻页
	n) 命令模式 ctrl+b向后翻页
	o) 命令模式 i进入编辑模式，当前光标处插入
	p) 命令模式 a进入编辑模式，当前光标后插入
	q) 命令模式 A进入编辑模式，光标移动到行尾
	r) 命令模式 o进入编辑模式，当前行下面插入新行
	s) 命令模式 O进入编辑模式，当前行上面插入新行
当我们处在编辑模式的情况下，和我们在Windows编辑器的使用相似。

### 为什么需要版本管理工具？

git、svn

### 什么是Git?
  - Git是一款源代码管理工具(版本控制工具)
    - 我们写的代码需要使用Git进行管理
  -Git是linux之父当年为了维护linux---linus之前也是手动维护合并把文件发给Linus
  - linus自己写了一个版本管理的工具（Git）

### 分布式版本管理工具，集中式
  - git属于分布式
  - svn集中式

### git安装

### git初始化一个仓库
  - 其实就是创建了一个.git隐藏目录
  - 命令:` git init `;
    + 想在哪个目录创建.git目录，就是哪个目录打开工具然后写命令.
    + 一般是在项目的根目录执行这个命令.


### 自报家门
  - 配置用户名 : `git config user.name "testName"`
  - 配置邮箱   : `git config user.email "test@sina.com"`
  - 上面这两条命令是在设置我当前目录里面的用户名和邮箱
  - 查看配置信息: `git config --list`
  - 全局设置 :`git config --global user.name [username]`
  - 全局设置 :`git config --global user.email [email]`


### 把代码提交到仓库中
  - 1.先把代码添加到暂存区(就相当于放到仓库门口)
    + 命令:`git add 文件路径`
    + 示例:`git add ./reademe.md`
    + 可以使用`git add .`这个命令，批量把当前目录下所有修改过的文件添加到暂存区。

  - 2.把暂存区的文件提交仓库里
    + 命令: `git commit -m "注释" `
    + 示例: `git commit -m "我们添加了一个新的功能"`
    + -m 表示指定一个字符串，作为提交的说明(相当于注释);

  - 合并add 与commit 命令
    + `git commit -a -m "这是使用合并添加与提交的操作"`;
    + 这里-a参数表明把所有修改后的文件一起添加到暂存区.(只是对修改后的文件有效，对于新添加的文件没有作用)
    + 在提交到仓库里面


### 查看工作区状态
  - 命令:`git status`


### 添加忽略文件
  - 在项目中有一些文件是不需要提交的,我们需要把它忽略掉
  - 需要在.git文件夹所在目录新建一个名为.gitignore的文件
    然后在这个文件中写上需要被忽略的文件的路径。
    示例: /css/a.css
        : /css/*.css
        : /a.html


### 比对文件差异
  - 命令: `git diff`
    + 用来比较暂存区文件内容与工作区文件内容的区别
    + 如果暂存区没有文件，就会将工作与代码与最近一次提交对比
  - 命令：`git diff --cached`
  - 对比之前某两次提交的文件的差异
    + 命令:`git diff [版本号1] [版本号2] [想比较的文件路径]`

### 查看日志
  - 命令:`git log`,可以查看每一次提交的日志
  - 命令:`git log --oneline` 表示使用简洁的形式输出提交日志


### 版本回退
  - 命令:`git reset --hard Head~1`
    + 这是将代码回退到上上一次提交时的状态
  - 命令:`git reset --hard Head~2`
    + 回退到上上上次
  - 命令:`git reset --hard Head~0`
    + 回退到上次提交时的状态,~0可以省略

  - 命令:`git reset --hard 版本号`
    + 通过每次提交时生成的版本号来回退版本

  - 通过`git reflog`命令可以查看之前所有版本切换的操作记录，可以通过这个命令得到的版本号回退到指定的版本。


### 创建分支
  - 命令:`git branch [分支名]`
    + 创建一个新分支
  - 命令:`git branch`
    + 查看当前所有的分支
  - 添加版本号：commit之后 git tag -a 0.1.3 -m “Release version 0.1.3″

### 切换分支
  - 命令:`git checkout [分支名]`
    + 切换分支后可以在切换后的分支中进行正常的操作

### 合并分支
  - 命令:`git merge [分支名]`
    + git会将指定的分支合并到当前分支.

### 删除分支
  - 命令:`git branch -d [分支名]`
    + 删除指定分支，-d参数表示要执行删除操作

### submodule的用法（每次提交前注意分支选着git branch git checkout [分支]）
  - 命令：`git submodule add -b [path] [存放的目录] [分支]`
  - 命令：`git status` 查看需要提交的文件
    > 可以看到多了两个需要提交的文件：.gitmodules和 pod-library

    > 这两个文件都需要提交到父模块

    > 要改变子模块 `cd [子模块]` `git status` `git commit -a -m 'test submodule'` `git push`

    > 提交父模块 `cd ..` `git commit -m 'update submodule'` `git pull`

    > 更新submodule另一种方式 父目录下直接`git submodule foreach git pull`
### clone带有子项目的项目
  - 采用递归参数 --recursive
    > 命令 `git clone -b [path] --recursive` 会自动下载子项目
    > 先下载父项目,进入子项目目录，再初始化子项目，`git submodule init` ，更新子项目`git submodule update`
### 删除submodule
  - 命令
  ```
    cd [子目录]
    git rm --cached [子目录]
    rm -rf [子目录]
    rm .gitmodules

    更改配置文件：vim .git/config 删除submodule的相关内容
    提交：git commit -a -m 'remove pod-library submodule'
  ```

### git提交中的冲突
  - 如果git不能自动合并分支，就会有冲突，我们需要手动解决冲突，然后再次提交

## github(node之神Tj)
[推荐网站](http://www.crx4chrome.com/)

### github与git
  - git 版本管理工具
  - github 就是一个网站，只是这个网站提供git服务器的功能

### 上传代码到git服务器(push)

 `再上传之前要把内容提交到库中`
  - 命令:`git push [远程服务器地址] [远程服务器的分支]`
     + 示例:`git push https://github.com/huoqishi/test002.git master`

  - 上传时可以使用一些简化的命令
    + 将远程服务器地址写成变量的形式
      * `git remote add [变量名]  [远程服务器地址]`
      * 示例:`git remote add origin https://github.com/huoqishi/test002.git`
      * 这样之后就可以直接使用origin来代替git push 后面写的地址了
        `git push origin master`
  - 还可以尽一步简化
    + 在push时加上-u参数，就会默认建立本地当前分支与远程指定分支的关联,下一次push时就不需要输入分支名了`git push origin`;

### 直接在网上建一个库的话
  - 想要改变网上库的内容，需要clone下来，更改后再提交

## git使用ssh方式上传代码与github
  - SSH
    SSH是一种网络协议，用于计算机之间的加密登录。
  - 对称加密&非对称加密&不可逆加密
    对称加密：一个钥匙开一把锁
    非对称加密：公钥和私钥  公钥加密 私钥解密
    不可逆加密：多用于密码的加密

###非对称加密

它的原理较为简单，我们假设有消息发送方A和消息接收方B，通过下面的几个步骤，我们就可以完成消息的加密传递：

消息发送方A在本地构建密钥对，公钥和私钥；

消息发送方A将产生的公钥发送给消息接收方B；

B向A发送数据时，通过公钥进行加密，A接收到数据后通过私钥进行解密，完成一次通信；

反之，A向B发送数据时，通过私钥对数据进行加密，B接收到数据后通过公钥进行解密。

  - git生成公钥和私钥
    + 命令:`ssh-keygen -t rsa`生成的公钥与私钥文件会在当用户目录的.ssh目录下的id_ras.
### 把代码push到服务器时需要先pull一下
  - 在pull之后如果远程的代码与本地的代码有冲突，git会先自动合并冲突，如果不能自动合并，就必需我们手动去处理冲突。

### 从服务器上pull代码到本地
  - 如果本地没有.git目录，需要先初始化一下。
  - 命令:`git pull [远程服务器地址] [远程的分支]`

### gh-pages分支-搭建博客.

  - 需要把自已博客的网页代码上传到github上的gh-pages分支
  - 然后就直接访问了
    + 访问的url形式: [github用户名].github.io/[仓库的名字]/[具体的页面]

- 流程

```
git init
git add *
git commit -m ""
git branch gh-pages
git checkout gh-pages
git push [远程服务器地址] gh-pages
```

### npm
  - 官网[https://www.npmjs.com]
  - node package manager
  - 命令:
    + 初始化:`npm init`
    + 安装指定包:`npm install jquery --save`
    + 安装指定版本包:`npm install jquery@1.11.24 --save`
    + 删除指定包:`npm remove jquery --save`
    + 下载安装package.json中dependencies属性对的文件:`npm install --production`

### browser-sync
  - 更改代码之后自动刷新浏览器
  - 需要使用npm进行全局安装:`npm install browser-sync -g`,-g表示安装到全局
  - 使用:`browser-sync start --server --files "./index.html,app.css,./css/*.css,*.*" `
  - --files参数指定要监视的文件，后面跟要监视的文件的文件路径以逗号分隔
