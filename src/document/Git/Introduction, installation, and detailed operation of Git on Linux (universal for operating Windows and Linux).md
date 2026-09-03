---
title: Linux上 Git 的简介、安装及操作详解（操作windows、linux通用）
icon: circle-info
order: 1
category:
  - Linux
  - Docker
tag:
  - Linux
  - Git
  - 运维
date: 2024-10-24
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
---

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/profile/7yu26jk3lfqxg?spm=a2c6h.12873639.article-detail.24.7f0d3622mUXOVW)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180953135.jpeg)

## 一、Git 简介

### 1.1 案例概述

&emsp;&emsp;我们知道，在公司中，一个项目通常是由一个团队来协作开发的，就比如一个项目由小红、小花、小李、小美四个人组成的团队来合作开发，有一天，小红完成了项目的一个小功能，并把它上传到了公司服务器上，但是小花觉得这个功能中的一部分代码可以优化，于是她从服务器上下载了小红的代码并对其进行修改，同时小李也从服务器上下载了该代码进行优化，那么这时候就会发生两个问题：第一，修改完成上传后，小李修改后的代码会直接覆盖掉小花修改的代码，导致小花的努力白费；第二：小李修改后发现代码出现了一个bug，想要退回到小红完成的代码版本，但是这时候小红的代码已经被覆盖掉回不去了；上面这种情况在公司项目开发的过程中是十分普遍的；所以，我们需要一个能够记录代码变化的版本控制工具来帮助我们管理代码。

### 1.2 什么是版本控制？

版本控制是一种记录文件内容变化，以便将来查阅特定版本修订情况的系统。版本控制最重要的功能是可以记录文件修改历史记录，从而让用户能够查看历史版本，方便版本切换。

>用最贴近我们的一个例子来理解，当我们在写毕业论文的时候，一般来说都会经过十几次修改才会达到导师的要求，然而在修改的过程中，我们并不知道下一次修改是否会比原论文优秀，有可能经过我们修改的反而更差，所以，我们一般不会直接在原论文上进行修改，而是会新建一个副本，对副本进行操作，到最后我们会发现，完成一篇毕业论文我们会写十几个甚至是几十个.docx文件，这就是版本控制的思想。



### 1.3 版本控制的分类

**版本控制工具可以分为两类：分布式版本控制工具 和 集中式版本控制工具。**

**集中式版本控制工具：**

> 常见的集中式版本控制工具：CVS、<font color=red>SVN(Subversion)</font>、VSs。<br>
> 集中化的版本控制系统诸如CVS、SVN等，都有一个 **单一的集中管理的服务器，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新**。多年以来，这已成为版本控制系统的标准做法。<br>
> 这种方式的好处是每个人都可以在一定程度上看到项目中的其他人正在做些什么。而管理员也可以轻松掌控每个开发者的权限（安全），并且管理一个集中化的版本控制系统，要远比在各个客户端上维护本地数据库来得轻松容易。  <br>
> 坏处是**中央服务器的单点故障**，如果服务器宕机一小时，那么在这一小时内，谁都无法提交更新，也就无法协同工作。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180953655.png)



**分布式版本控制工具：**

> 常见的集中式版本控制工具：<font color=red>Git</font>、 Mercurial、Bazaar、Darcs。  <br>
> 像Git这种分布式版本控制工具，**客户端提取的不是最新版本的文件快照，而是把代码仓库完整地镜像下来（本地库)**。这样任何一处协同工作用的文件发生故障，事后都可以用其他客户端的本地仓库进行恢复。因为每个客户端的每一次文件提取操作，实际上都是一次对整个文件仓库的完整备份。<br>
> 分布式的版本控制系统出现之后，解决了集中式版本控制系统的缺陷：
> 1.服务器断网的情况下也可以进行开发（因为版本控制是在本地进行的）；
> 2.每个客户端保存的也都是整个完整的项目(包含历史记录，更加安全）； <br>
>  <font color=blue>现在，大多数企业用的都是分布式版本控制，但是也有的企业用的是集中式版本控制。</font>





### 1.4 Git 分布式版本控制简介

&emsp;&emsp;Git是一种**分布式版本控制系统**，是目前世界上最先进的分布式**版本控制系统**（没有之一），是程序员在工作和学习中必须具备的技能。

Git易于学习，占地面积小，性能极快。它具有廉价的本地库，方便的暂存区域和多个工作流分支等特性。其性能优于Subversion、CVS、Perforce和 ClearCase等版本控制工具。





### 1.5 Git 的工作机制

**Git可分为三个区域：工作区、暂存区以及本地库。**

工作区：指代码所在的文件夹，我们可以通过 “git add” 命名把工作区里的代码添加到暂存区里，使得该文件被git追踪。 

暂存区：用来临时存储代码，我们可以通过 “git commit” 命名把暂存区里的代码提交到本地库里，从而生成对应的历史版本。

注：一旦把代码提交到本地库，那么代码的历史记录就会永久存在，不能被删除，即使你把代码从V1版本更新到了V2版本，然后重新add、commit，仍然是可以重从V2版本退回到V1版本的，所以骂老板的话尽量不要commit到本地库，否则就只能删库跑路了。



![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180953310.png)

### 1.6 Git 官网及中文手册地址
>Git 官网地址：[https://git-scm.com](https://git-scm.com)<br>
Git 中文手册地址：[https://git-scm.com/book/zh/v2](https://git-scm.com/book/zh/v2)
## 二、安装 Git 服务
### 2.1 初始环境

```bash
# 先查看防火墙是否开启
systemctl status firewalld

# 如果是开启的那就关闭并设置开机不自启
systemctl stop firewalld
systemctl disable firewalld

---------------------------------------------------------------

# 设置selinux为Disabled
cat /etc/selinux/config
# 设置 SELINUX=disabled

# 或者临时关闭selinux
setenforce 0
```

### 2.2 yum安装（yum、编译安装二选一）

```bash
yum -y install git
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180953165.png)
### 2.3 编译安装（yum、编译安装二选一）
> 编译安装的话是可以安装比较新的版本
> Git 安装包下载地址：[https://github.com/git/git/tags](https://github.com/git/git/tags)

①、选择要安装的版本

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180953732.png)

②、选择下载【可以直接点击下载也可以复制链接在服务器上用`wget`下载】
如果没有wget命令需要提前下载：
```bash
yum -y install wget

wget https://github.com/git/git/archive/refs/tags/v2.45.2.tar.gz
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180952250.png)

③、安装依赖
```bash
yum -y install gcc gcc-c++ curl-devel expat-devel gettext-devel openssl-devel zlib-devel wget vim
```


④、安装上面依赖会自动下载git，需要卸载git，在安装其他版本的git

```bash
git --version
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180952394.png)

```bash
yum -y remove git
```
⑤、编译安装

```bash
# 把 git 安装包上传到服务器上
# 解压 git 安装包到/usr/src下
tar xf v2.45.2.tar.gz -C /usr/src/

# 进到/usr/src/git目录下
cd /usr/src/git-2.45.2

# 编译源码
make prefix=/usr/local/git  all

# 安装 git
make prefix=/usr/local/git  install

# 进入安装路径
cd /usr/local/git
```
安装的git 路径下有三个目录

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180952775.png)

⑥、配置 git 环境变量
```bash
vim /etc/profile

# 在最后一行追加
export GIT_HOME=/usr/local/git
export PATH=$GIT_HOME/bin:$PATH

# 保存退出使其生效
source /etc/profile

# 查看git版本号
git --version
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180952578.png)

## 三、Gitee 仓库的创建
>gitee 官方地址：[https://gitee.com/](https://gitee.com/)

### 3.1 新建仓库
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180952632.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180952122.png)

### 3.2 克隆仓库

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180952053.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180952049.png)

在linux服务器上自己想在的目录下执行；

```bash
git clone https://gitee.com/liu-chenyang/linuxtest.git
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180952744.png)

---
* 克隆仓库指定分支
```bash
git clone -b blog_source --single-branch https://gitee.com/liu-chenyang/linuxtest.git
```

解释与补充  
1. `-b blog_source` 指定要检出的分支。  
2. `--single-branch` 让 Git 只下载该分支的提交历史，省流量、省时间。  
3. 克隆完本地只有 `blog_source` 分支，看不到 `main`；后续若突然需要 `main`，再执行  
```bash
git remote set-branches --add origin main  
git fetch origin main:main
```
即可把 `main` 也拉回来。

---


### 3.3 仓库里的 .gitignore 是什么

```bash
# 看查克隆的目录及隐藏文件
ll -a 
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180952167.png)

进入.gitignore文件之后发现有如下的内容：

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180952013.png)

我们发现里面**保存的是文件的后缀，并且在这个文件内部的后缀，对应的文件，不会被上传到仓库中。**

### 3.4 仓库里的git是什么
这个.git就是我们所说的仓库，本质就是一个目录，里面保存的是本地仓库的内容，push到远端仓库的本质就是将.git仓库里的内容同步到gitee上面(gitee也有类似.git的文件，我们看不到罢了)



### 3.5 初次运行 Git 前的配置

```bash
# 配置 git 使用用户
git config --global user.name "test" 
# 配置 git 使用邮箱
git config --global user.email "test@163.com" 
# 语法高亮
git config --global color.ui true
# 查看全局配置
git config --list 
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180952605.png)

## 四、Git 的两种创建仓库
### 4.1 手动去创建仓库
手动去创建仓库，然后在进行`git init`初始化，即可使用；

### 4.2 克隆仓库
在远程仓库中创建好之后克隆仓库，不需要初始化，可以直接使用；

## 五、Git 常用命令及基础操作

* 常用命令说明

|命令参数|命令参数说明  |
|--|--|
|clone  |  克隆一个仓库到指定路径|
| init |  创建一个空的 Git 仓库或重新初始化一个已存在的仓库 |
|  add|添加文件内容到暂存区（索引）  |
|  commit| 提交暂存区内容到本地仓库（仓库） |
| push |推送代码到远程Git仓库上  |
| pull| 从远程仓库拉取内容到本地（更新本地代码）|
| log | 显示提交日志 |
|status  | 显示工作区状态（包含未提交的内容信息） |
| mv |移动或重命名一个文件、目录或符号链接  |
| rm |  从工作区和索引中删除文件|
|restore |  恢复工作区文件 |
| show | 查看当前提交内容的详细信息 |
| reset |还原历史数据或未来数据时使用，重置当前 HEAD 到指定状态  |
| tag | 给当前提交内容打标签，便于还原数据； -d 删除标签 |
|  bisect|通过二分查找定位引入 bug 的提交变更  |
| diff | 显示提交之间、提交和工作区之间等的差异 |
|grep  |输出和模式匹配的行  |
|  branch|列出、创建或删除分支 \| -d 删除分支 ； -D 强制删除分支 |
|checkout  |  切换分支|
| switch |   切换分支 |
| merge |  合并分支，合并两个或更多分支到当前分支|
|rebase  |  在另一个分支上重新应用提交|
| fetch |从另外一个版本库下载对象和引用  |

```bash
[root@localhost ~]# git --help
用法：git [-v | --version] [-h | --help] [-C <路径>] [-c <名称>=<取值>]
           [--exec-path[=<路径>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<路径>] [--work-tree=<路径>] [--namespace=<名称>]
           [--config-env=<名称>=<环境变量>] <命令> [<参数>]

这些是各种场合常见的 Git 命令：

开始一个工作区（参见：git help tutorial）
   clone     克隆仓库到一个新目录
   init      创建一个空的 Git 仓库或重新初始化一个已存在的仓库

在当前变更上工作（参见：git help everyday）
   add       添加文件内容至索引
   mv        移动或重命名一个文件、目录或符号链接
   restore   恢复工作区文件
   rm        从工作区和索引中删除文件

检查历史和状态（参见：git help revisions）
   bisect    通过二分查找定位引入 bug 的提交
   diff      显示提交之间、提交和工作区之间等的差异
   grep      输出和模式匹配的行
   log       显示提交日志
   show      显示各种类型的对象
   status    显示工作区状态

扩展、标记和调校您的历史记录
   branch    列出、创建或删除分支
   commit    记录变更到仓库
   merge     合并两个或更多开发历史
   rebase    在另一个分支上重新应用提交
   reset     重置当前 HEAD 到指定状态
   switch    切换分支
   tag       创建、列出、删除或校验一个 GPG 签名的标签对象

协同（参见：git help workflows）
   fetch     从另外一个仓库下载对象和引用
   pull      获取并整合另外的仓库或一个本地分支
   push      更新远程引用和相关的对象
```

### 5.1 [创建项目] - 创建项目目录（仓库）
```bash
mkdir linuxtest
```

### 5.2 [初始化项目] - 初始化创建的仓库

```bash
git init
```
初始化完成之后可以使用` ls -a`查看是否有`.git`目录；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180951881.png)

---

也可以直接初始化并创建仓库
```bash
git init 仓库名称
```
会自动创建目录仓库并初始化

---

> 初始化完仓库之后就可以在里面写自己的项目或数据了；
### 5.3 [修改或添加项目内容] - 在仓库中创建文件或修改文件内容并查看工作区状态
这里我把`LICENSE`和`README.en.md`删除了，并修改了`README.md`文件；
`git status `查看工作区的状态，就是进行了什么操作；

```bash
git status
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180951354.png)

### 5.4 [提交项目到暂缓区] - 将修改的文件或内容提交到暂存区

```bash
# 将修改的文件或内容提交到暂存区
git add .
# 或
git add -A

# 查看当前工作区的状态
git status 
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180951019.png)

我们发现字体变绿了，并且最后一行也没有`修改尚未加入提交（使用 "git add" 和/或 "git commit -a"）`提示了，说明已经提交到暂存区了；

>git add命令可以指定要添加的文件，只需在命令后面加上文件路径或文件名即可。例如，要添加名为"example.txt"的文件，可以使用以下命令：
>`git add example.txt`
>也可以指定一个目录来添加该目录下的所有文件，例如：
>`git add testmkdir/`
>这将添加 “testmkdir” 目录中的所有文件;

`git add .` 和 `git add -A`的区别：
> git add . 主要用于暂存当前目录的更改，而 git add -A 用于暂存工作目录下的所有更改，包括删除的文件。如果你想要一次性暂存所有更改，包括删除的文件，使用 git add -A 是一个方便的选择。如果你只想暂存当前目录的更改，或者需要更精细地控制哪些更改被暂存，可以使用 git add . 或者更具体的文件路径。
### 5.5 [提交项目到本地仓库] - 将暂存区的文件提交到本地仓库

```bash
# 将暂存区的文件提交到本地仓库，后面必须有提交日志描述，否则会报错
git commit -m '提交日志描述'

# 查看当前工作区的状态
git status 
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180951124.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180951013.png)

### 5.6 [推送项目到远程仓库] - 将本地仓库的数据提交到远程仓库（gitee）
> **推送有三种**
> * `git push`：如果本地和远程仓库分支是一样的，那么就不用写地址和分支了；
> * `git push 仓库地址 [本地分支：远程分支]`：推送指定远程仓库地址，指定分支（本地和远程）
> * `git push -f 仓库地址 [本地分支：远程分支]`：推送指定远程仓库地址，`-f `强制推送，用于远程仓库一个文件，而本地没有这个文件的时候，需要强制覆盖；<font color=red>慎用！</font>
> 
> **默认`github`仓库分支为：`main`，默认`gitee`仓库分支为：`master`，默认`本地`分支为：`master`。**
```bash
git push 
git push 仓库地址 [本地分支：远程分支]
git push -f 仓库地址 [本地分支：远程分支]
```
这里需要输入gitee的用户名密码；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180951381.png)

鉴权成功之后就会提交到远程的仓库中（gitee）；我们可以登录gitee查看刚刚推送上来的信息，是不是有改变；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180951859.png)

可以看到已经推送到gitee上了；


---

<center>总结上面几部就是最基础的创建目录到初始化到修改内容并从本地到推送到远程仓库了，下面为流程图！</center><br>


![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180951317.jpeg)

---

### 5.7 [拉取远程仓库新数据到本地] - 远程仓库更新后拉取新数据到本地（gitee）

```bash
git pull 
git pull 远程仓库地址
git pull -f 远程仓库地址
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180951016.png)

## 六、Git 的进阶操作
### 6.1 删除 Git 内的文件

命令说明：
>*  没有添加到暂存区的数据直接 rm 删除即可【就是在linux中正常的删除命令就行】。
>*  已经添加到暂存区数据：
> #将文件从 git 暂存区域的追踪列表移除(并不会删除当前工作目录内的数据文件)
> `git rm database[file]`
> #将文件数据从 git 暂存区和工作目录一起删除
> `git rm -f database[file]`

---
**git rm 及 git rm -f 的用法：**

* `git rm` 推送的文件或目录 
用于：已经提交到暂缓区，并将源文件删除的时候；

* `git rm -f`  推送的文件或目录 
用于：已经提交到暂缓区，并且源文件删除或没有删除源文件都可以，会自动删除源文件；

---

操作演示：

```bash
# 创建一个文件
[root@localhost linuxtest]# touch 123rm
# 添加到暂存区
[root@localhost linuxtest]# git add .
# 查看当前工作区状态
[root@localhost linuxtest]# git status
位于分支 master
您的分支与上游分支 'origin/master' 一致。

要提交的变更：
  （使用 "git restore --staged <文件>..." 以取消暂存）
	新文件：   123rm

# 删除源文件【123rm】
rm -rf 123rm
# 再次查看当前工作区的状态
[root@localhost linuxtest]# git status
位于分支 master
您的分支与上游分支 'origin/master' 一致。

要提交的变更：
  （使用 "git restore --staged <文件>..." 以取消暂存）
	新文件：   123rm

尚未暂存以备提交的变更：
  （使用 "git add/rm <文件>..." 更新要提交的内容）
  （使用 "git restore <文件>..." 丢弃工作区的改动）
	删除：     123rm

# 重置后取消暂存的变更
[root@localhost linuxtest]# git reset HEAD ./*
重置后取消暂存的变更：
D	123rm

# 再次查看当前工作区的状态
[root@localhost linuxtest]# git status
位于分支 master
您的分支与上游分支 'origin/master' 一致。

要提交的变更：
  （使用 "git restore --staged <文件>..." 以取消暂存）
	新文件：   123rm

尚未暂存以备提交的变更：
  （使用 "git add/rm <文件>..." 更新要提交的内容）
  （使用 "git restore <文件>..." 丢弃工作区的改动）
	删除：     123rm
# 删除暂存区的文件
[root@localhost linuxtest]# git rm 123rm
rm '123rm'
＃再次查看当前工作区的状态
[root@localhost linuxtest]# git status
位于分支 master
您的分支与上游分支 'origin/master' 一致。

无文件要提交，干净的工作区
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180951011.png)



### 6.2 重命名暂存区文件名
命令说明：
>
>*  没有添加到暂存区的数据直接 `mv` 改名即可【就是在linux中正常的删除命令就行】。
>* 已经添加到暂存区数据：
>通过【`git mv 源名 重命名`】，来修改暂存区的文件名，本地工作区也会一起改变。

```bash
# 创建一个文件
[root@localhost linuxtest]# touch mvtest
# 查看文件
[root@localhost linuxtest]# ls
mvtest  README.md  test
# 添加到暂存区
[root@localhost linuxtest]# git add .
# 查看当前工作区的状态
[root@localhost linuxtest]# git status 
位于分支 master
您的分支与上游分支 'origin/master' 一致。

要提交的变更：
  （使用 "git restore --staged <文件>..." 以取消暂存）
	新文件：   mvtest

# 重命名暂存区的文件名
[root@localhost linuxtest]# git mv mvtest mvtest2
# 再次查看当前工作区的状态【发现文件名已经变了】
[root@localhost linuxtest]# git status
位于分支 master
您的分支与上游分支 'origin/master' 一致。

要提交的变更：
  （使用 "git restore --staged <文件>..." 以取消暂存）
	新文件：   mvtest2
# 在看一下本地工作区的数据，也跟着变了；
[root@localhost linuxtest]# ls
mvtest2  README.md  test
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180951563.png)


### 6.3 查看 Git 提交日志（记录）

常用命令：
```bash
git log		#查看提交历史记录
git log -2 	#查看最近几条记录
git log -p -1		#-p 显示每次提交的内容差异,例如仅查看最近一次差异
git log --stat -2 	#--stat 简要显示数据增改行数，这样能够看到提交中修改过的内容，对文件添加或移动的行数，并在最后列出所有增减行的概要信息
git log --pretty=oneline		#--pretty 根据不同的格式展示提交的历史信息
git log --pretty=fuller -2		#以更详细的模式输出提交的历史记录
git log --pretty=fomat:"%h %cn" #查看当前所有提交记录的简短 SHA-1 哈希字串与提交着的姓名。
```
使用 `format` 参数来指定具体的输出格式
|格式|说明  |
|--|--|
|%s| 提交说明
|%cd| 提交日期
|%an |作者的名字
|%cn| 提交者的姓名
|%ce| 提交者的电子邮件
|%H |提交对象的完整 SHA-1 哈希字串
|%h| 提交对象的简短 SHA-1 哈希字串
|%T| 树对象的完整 SHA-1 哈希字串
|%t |树对象的简短 SHA-1 哈希字串
|%P |父对象的完整 SHA-1 哈希字串
|%p |父对象的简短 SHA-1 哈希字串
|%ad| 作者的修订时间

这些单独的参数和命令大家有时间可以自己试一下，这里就不一一介绍了。
主要咱们就看一下普通的查看`Git`提交的日志信息就行；

```bash
git log
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180951619.png)


### 6.4 还原历史数据


&emsp;&emsp;Git 服务程序中有一个叫做 HEAD 的版本指针，当用户申请还原数据时，其实就是将 HEAD指针指向到某个特定的提交版本，但是因为 Git 是分布式版本控制系统，为了避免历史记录冲突，故使用了 SHA-1 计算出十六进制的哈希字串来区分每个提交版本，另外默认的 HEAD版本指针会指向到最近的一次提交版本记录，而上一个提交版本会叫 HEAD^，上上一个版本则会叫做 HEAD^^，当然一般会用 HEAD~5 来表示往上数第五个提交版本。

```bash
# 根据某个版本的hash值来还原历史数据，不保留暂存区和工作区的数据（慎用）
git reset --hard hash
# 通过git log查看历史提交的hash值，可以使用不完整的哈希值来还原历史数据；不保留暂存区和工作区的数据（慎用）
git reset --hard 3de15d4 
# 还原上一次提交的版本；不保留暂存区和工作区的数据（慎用）
git reset --hard HEAD^
# 只重置 HEAD 到指定的提交，保留暂存区和工作目录的数据。这意味着更改仍然在暂存区，可以重新提交。
git reset --soft hash
# 默认git reset就是这个；重置 HEAD 和暂存区，只保留工作目录。这意味着更改会保留在工作目录中，但不会被暂存。
git reset --mixed hash
```
<font color=red>注意：</font>
>使用 `git reset --hard  hash`时要非常小心，因为它会重置你的工作目录，使其与指定的提交完全一致，这将删除所有未提交的更改和自该提交以来的所有提交。
>如果你不确定要执行的操作或是想撤销某一个提交，可以先使用 `git reset --soft hast` 或 `git reset --mixed hash（默认）`来尝试，因为这些选项不会删除你的工作目录中的更改，而是将它们保留为未暂存的更改（也就是刚创建的样子）。
> * `git reset --soft hash` 会重置 HEAD 和索引，保留暂存区和工作目录的数据。
> * `git reset --mixed hash（默认`）会重置 HEAD 、索引和暂存区，只保留工作目录。
> 
> <font color=red>在执行任何重置操作之前，最好先备份您的工作，以防万一需要恢复更改。</font>


### 6.5 还原未来数据
><font color=blue>问：</font>什么是未来数据？
<font color=gree>答：</font>就是你还原到历史数据了，但是你后悔了，想撤销更改，并且 `git log` 已经找不到这个版本了；但你还是想要原来的数据，这时候就叫未来数据。

```bash
#查看未来历史更新点
git reflog 
```
---
**操作实例：**

* [x] 1、可以先提交一次数据

```bash
# 在工作区创建一个文件
echo "未来数据测试" >  Future_history
# 提交到暂存区
git add .
# 提交到本地仓库
git commit -m "第四次提交，测试还原未来数据"
# 推送到远程仓库
git push 
# 查看提交记录
git log
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180950675.png)

* [x] 2、还原一次历史数据

```bash
# 先查看历史提交数据
git log
# 然后根据自己的需求还原历史数据
git reset --hard 5ad19e6
# 还原之后再次提交查看一下历史记录及当前工作区的数据
git log
ls
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180950062.png)

* [x] 3、还原未来数据

```bash
# 查看未来历史数据的更新点
git reflog
# 找到自己要还原的数据hash值
# 还原未来数据
git reset --hard 6d49987
# 还原完之后在查看一下提交记录和工作区的数据
git log
ls
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180950786.png)

* [x] 4、还原未来数据完成

---
### 6.6 标签的使用（使用标签进行数据还原）
前面我们讲了`“还原历史数据”`和`“还原未来数据”`；在还原的时候我们要用到记录的哈希值，值非常的长，再有的环境下复制不了还很容易打错，接下来这个方法，我们可以给他打成一个标签，好记还不容易打错记错，有利于还原数据；

打标签的命令
```bash
git tag 要打的标签名
----------------------------------------
# 给当前提交的内容打一个名为v1.0的标签(方便快速回滚)，每次提交都可以打个 tag，方便回滚。
git tag v1.0
# 查看当前所有的标签
git tag
# 查看当前1.0的详细信息
git show v1.0
# 创建带有说明的标签,-a 指定标签名字，-m 指定说明文字
git tag v1.2 -m "version 1.2 release is test"
# 删除v1.0版本 -d 删除标签的意思
git tag -d v1.0
```
---
详细操作实例：
* [x] 1、给当前提交的内容打个标签

```bash
# 这里的v1.4，表示第一个版本第四次提交，可以根据自己需求自定义
git tag v1.4

git log
# git log可以看到tag
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180950380.png)

* [x] 2、在创建一个新的第五次提交

```bash
# 在当前工作区创建一个文件
echo "第五次提交，tag标签" > tag.txt
# 提交到暂存区
git add .
# 提交到本地仓库
git commit -m "第五次提交，tag标签"
# 推送到远程仓库
git push
```

* [x] 3、给本次（第五次）提交打标签

```bash
# 第五次提交改为v1.5
git tag v1.5

# git log查看
git log
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180950203.png)

可以看到已经打了两个标签了，一个`v1.4`和`v1.5`；
我们也可以给其他也打上标签；不过之前没打有些麻烦；需要先还原到哪个历史的数据，然后进行`git tag 打标签`，在还原回来未来数据，就可以；不过打不打都行，这里是进行测试，有两个就可以了；
接下来我们使用标签进行历史数据还原；

* [x] 4、利用标签还原历史数据

```bash
# 先查看提交记录；
git log 
# 我们还原到v1.4版本
[root@localhost linuxtest]# git reset --hard v1.4
HEAD 现在位于 6d49987 第四次提交，测试还原未来数据
# 还原到历史数据之后我们可以查看提交记录及本地工作区数据，来确认是否还原到了历史数据
git log
ls
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180950583.png)

还原到历史数据之后，我们再还原回未来数据；


* [x] 5、利用标签还原未来数据

```bash
# 查看未来数据日志
git reflog
# 还原到标签v1.5版本
[root@localhost linuxtest]# git reset --hard v1.5
HEAD 现在位于 91814fd 第五次提交，tag标签

# 查看提交日志，确认是否还原到未来数据
git log
ls
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180950819.png)

#### 6.6.1 删除标签

* [x] 6、在当前的提交下新创建一个tag，并把旧的删除

```bash
# 将当前提交的内容在打一个标签v1.5.1
git tag v1.5.1
# git log查看历史提交记录，或者使用git tag查看所有标签
git log 
git tag

# 删除v1.5的标签
git tag -d v1.5
# 删除完之后再次使用git log 查看历史记录或者git tag查看所有标签
git log 
git tag
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180950911.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180950391.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180950123.png)

---

简单来说就是在还原数据的时候把`哈希值`换成`tag标签`，还是很好用的，也是比较推荐的👍👍👍；
### 6.7 分支结构
&emsp;&emsp;在工作中，我们的项目开发肯定不是直接提交到master分支上的，都会在`master分支`或者`main分支`下创建一个`dev或其他小分支`，然后每个人在`dev分支下`在创建自己的分支，开发完成后合并到`dev分支上`，最后等上线代码的时候才会把`dev分支`在合并到`master分支`或`main分支`上，进行上线服务；
&emsp;&emsp;平常都会尽量保护`master分支`，使master分支保持稳定状态，`而master分支一般仅用于上线代码或者发布新版本`；平时是不能在master分支上进行修改等操作的；

---
**Git 分支图（工作中人员所在分支）：**

![Git 分支图](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180949676.png)

---
#### 6.7.1 创建分支

```bash
# 创建一个dev分支
git branch dev

# 查看当前工作区所有分支
git branch
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180949256.png)


#### 6.7.2 分支切换

切换分支两种切换方式都可以；
```bash
git checkout dev
git switch dev
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180949056.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180949826.png)


---

切换完分支之后，在当前分支进行修改，新增等操作都可以；

```bash
# 在当前工作环境中添加一个文件及内容
echo -e "Hello git\nHello word" > branch.txt

# 将新创建的文件添加到暂存区
git add .
# 提交到本地仓库
git commit -m "dev分支，第一次提交"
# 查看当前工作区的状态
git stats
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180949136.png)

```bash
# 也可以再加一个标签（看个人需求）
git tag v2.1
# 查看一下提交记录
git log -1
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180949972.png)


---

#### 6.7.3 合并分支

切换回master分支

```bash
git checkout master
```
当前查看提交记录和本地工作区是看不到在dev的操作的内容的；还需要将dev分支的代码合并到master分支上；

合并dev代码到master分支

```bash
git merge dev
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180949681.png)

```bash
# 查看提交记录
git log -2

# 查看当前工作区有没有多出新文件
ls
cat branch.txt
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180949897.png)


这样合并分支就成功了，检查没问题就可以提交到远程仓库了；

```bash
git push
```
#### 6.7.4 删除分支
上面咱们创建了一个`dev分支`，现在已经将`dev分支`的内容已经和master分支合并了，所以，删除dev分支也就不会影响什么，也不会失去任何东西了；

* 删除分支的命令
```bash
# 删除分支
git branch -d 分支名称

# 查看所有包含未合并工作的分支
git branch --no-merged
```

* 操作实例：
```bash
# 先看看有没有没有合并的工作分支
[root@localhost linuxtest]# git branch --no-merged
# 查看所有分支，带*的表示当前所在分支
[root@localhost linuxtest]# git branch
  dev
* master
# 然后我们要删除dev分支
[root@localhost linuxtest]# git branch -d dev
已删除分支 dev（曾为 233eb48）。
# 删除完分支之后再次查看所有分支（可以看到只剩master分支了，dev分支删除了）
[root@localhost linuxtest]# git branch
* master
```
>如果想要删除的分支上还有工作内容，而且并不想要哪些内容，可以使用`-D`参数强制删除。


![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180949962.png)



---


## 七、【实例1】 创建项目到推送到 gitee 上流程
### 7.1 项目初始化
在项目的目录，也就是要推到github或者gitee上的目录下，进行git初始化；
```bash
git init 
```

### 7.2 修改文件内容或文件、目录
修改完成之后推送到暂存区
### 7.3 将项目推送到暂存区
```bash
git add .
git add -A
```

### 7.4 将项目提交到本地仓库

```bash
git commit -m "提交的说明"
```

### 7.5 将项目推送到gitee上
①、打开gitee，**提前创建好仓库**；

②、创建好仓库之后，点击克隆下载，复制https的git地址；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180949923.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180949541.png)

③、在服务器或windows上执行推送指定仓库；
> `git push 远程仓库地址 分支`；
> 如果分支都是master，则可以只需要写一个master分支就行；
> 如果分支不一样，需要使用`本地分支:远程分支`来指定；
```bash
# gitee 默认分支是master
git push https://gitee.com/liu-chenyang/linuxtest.git master
```


推送流程：

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180949882.jpeg)

## 八、【实例2】 创建项目到推送到 github 上流程
### 8.1 项目初始化
在项目的目录，也就是要推到github或者gitee上的目录下，进行git初始化；
```bash
git init 
```

### 8.2 修改文件内容或文件、目录
修改完成之后推送到暂存区
### 8.3 将项目推送到暂存区

```bash
git add .
```
### 8.4 将项目提交到本地仓库

```bash
git commit -m "提交的说明"
```

### 8.5 将项目推送到 github 上
①、打开github，**提前创建好仓库**；

②、创建好仓库之后，点击克隆下载，点击`Code`复制`https`的链接：`https://github.com/liuchenyang0703/test.git`；

③、在服务器或windows上执行推送指定仓库；
> `git push 远程仓库地址 本地分支:远程分支`；
> 如果分支都是master，则可以只需要写一个master分支就行；
> 如果分支不一样，需要使用`本地分支:远程分支`来指定；

```bash
# 直接推送
git push 
# 推送到远程指定仓库,github默认分支是main
git push https://github.com/liuchenyang0703/test.git master:main
# 强制推送到远程指定仓库
git push -f https://github.com/liuchenyang0703/test.git master:main
```

推送流程：

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180949778.jpeg)

## 九、特此声明：参考文献

|                         参考文章标题（一、三参考）                         |                         参考文章链接（一、三参考）                         |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| [Git 的介绍、安装及其基本操作 - 野猪佩奇`](https://coder-yzpq.blog.csdn.net/article/details/125503875) | [https://coder-yzpq.blog.csdn.net/article/details/125503875](https://coder-yzpq.blog.csdn.net/article/details/125503875) |
|         [【Linux】Linux下git的使用 - 椿融雪](https://blog.csdn.net/qq_67582098/article/details/132110230)                                                     | [https://blog.csdn.net/qq_67582098/article/details/132110230](https://blog.csdn.net/qq_67582098/article/details/132110230)                     |


>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗
