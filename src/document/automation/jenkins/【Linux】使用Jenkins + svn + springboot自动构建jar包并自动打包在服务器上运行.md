---
title: 【Linux】使用Jenkins + svn + springboot自动构建jar包并自动打包在服务器上运行
icon: circle-info
order: 1
category:
  - Linux
  - Jenkins
  - 自动化运维
tag:
  - Linux
  - Jenkins
  - 自动化运维
  - 运维
pageview: false
date: 2024-12-24
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/03042836b51a4e5c8a528976c81340f7.jpeg)

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---

## 运行环境说明

|运行环境|运行版本  |作用|
|--|--|--|
|操作系统 | centos 7.8 | 运行Jenkins的基础环境|
|jenkins版本|2.419|用于构建项目及其他自动化|
|maven版本|3.8.6|用于构建jar包|
| jdk版本|18、1.8|18（用于运行Jenkins）、1.8（用于运行jar包）|

## 一、创建一个maven项目
### 1.1 安装必要的插件【必须】*
* maven
* git
* ssh
* svn

>一般在部署完成，访问的时候选择默认安装插件基本都会装 -- git。

点击 `Manage Jenkin `--> `Plugins（插件）` --> `Available plugins（商店）`

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/6d9d5f7622e84bf08454fb8cd0fe580b.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/709cd2b55d534d259d8a9cc59f57757e.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ae2f7b24cead4c8bb75c1b8f04c2ad89.png)

* 搜索`git` 和 `maven`  和 `ssh` 和 `svn` 进行安装；

git 和 ssh 我这里已经有了，需要更新就更新一下；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/8f81048c052a4b6e8f67554e65524264.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/57fa1028b8684b218db0681a2453ad7b.png)



maven、svn 我这里没有，就安装一下吧；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/e71e838dc35242e1ac5e0aa0446453fa.png)

安装完成之后，在新建`Item` 那块就可以看到maven了。如下↓

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/6aa5061acde04f25abd63e5476912011.png)

svn

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4f77a798aa0b4e708997e3142a58fb3c.png)



### 1.2 创建maven任务
* 新建`Item` -- > 选择maven项目，起一个任务名称。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/494890ff99564b5aaa57f7e37efa420f.png)

创建完之后，就到了这个页面

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1679f74ece2e418288e60f714c4d3ded.png)


## 二、配置maven项目

下面来讲解一下maven项目里的配置项。

### 2.1 maven项目中的配置项详解
#### 2.1.1 General

> 项目描述，可以在这块写一些项目的描述。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/26e14cdf56874c7285bafe2ea55eac0c.png)

#### 2.1.2 源码管理
>主要是拉取源码用的，这里有两种，一种是`git`，一种是`svn`方式。等下我们创建项目使用的是svn方式。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/7ec701dc62064c93a992dcc34616f453.png)

这个不仅Jenkins项目上要安装git插件，在服务器上也需要安装git。
```bash
yum -y install git
```
#### 2.1.3 构建触发器
默认勾选上的是下面的选项：Jenkins将会去寻找之前已经构建过的pom依赖（如果有之前构建过的相同的pom文件），直接使用之前的镜像，便不会再去重新的解析了

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/e1dc7d63fdaa456195952fe89ca8222b.png)




#### 2.1.4 构建环境

在这里面，勾选上对应的内容，将去做一些额外的处理，在这里保持默认的，什么都不去勾选

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/22a35d8a01ee4feebf1d0af47ba9f726.png)

这是翻译后的，可根据实际情况来使用。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ac94694518fe441aad6bd1f43dc1221b.png)



#### 2.1.5 Pre Steps（准备步骤）
准备步骤，一般会选择`Execute shell` 和 `Invoke Gradle script`。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/95bb4c4bef384df18b1b8b70adf7fc6d.png)


#### 2.1.6 Build（构建）
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4329689c98b24bb19c2ffe052a073a1b.png)


#### 2.1.7 Post Steps（发布步骤）
这个配置，说明的是：在项目构建完成之后，接下来需要做的内容

在这里，我们需要将构建完的项目，打成的包传到我们的测试服务器上，也是在这里去进行配置的

#### 2.1.8 构建设置
这里可以配置`电子邮件通知`。比如失败，成功，都可以进行发送邮件来通知提醒。

### 2.2 配置maven项目

#### 2.2.1 服务器需要提前安装：
如果是使用git部署，服务器上也需要安装git；
* jdk1.8
* maven

* [x] jdk：根据自己的项目选择所需的jdk版本，我的项目是需要 `jdk11以上，用的是jdk18` 才可以；
如果是需要jdk1.8，并且Jenkins是按照我的部署文档部署的，那么默认就会有jdk1.8，可以使用`find / -name java` 找一下java的安装路径，将绝对路径配置到全局工具配置里就行；如果没有安装，需要安装一下；可参考：[Linux中安装jdk1.8和配置环境变量](https://blog.csdn.net/liu_chen_yang/article/details/123706070)

* [x] maven：根据自己的项目选择所需的mvn版本，我的项目是需要 `maven3.8` 才可以；
maven环境默认是没有的，也需要在服务器安装一下，可参考：[【Linux】Centos安装mvn命令（maven）](https://blog.csdn.net/liu_chen_yang/article/details/130106529)，建议使用maven3.8，下载地址：[https://pan.baidu.com/s/1drjw-sQ5JKFukamVSsLqtw?pwd=b1a0 ](https://pan.baidu.com/s/1drjw-sQ5JKFukamVSsLqtw?pwd=b1a0)




#### 2.2.2 配置全局系统配置
>Manage Jenkins --> System

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ceb042e1cee54e0d9c3ddd4f9633d31a.png)

* 配置ssh环境

> 提示：如果找不到ssh在哪，可以使用`ctrl+f`搜索一下；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/8e44a2a4ad464c37ae4526e7b2500cee.png)
#### 2.2.3 配置全局工具配置
> Manage Jenkins --> Tools

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/abe857bc77d848dcb8f65a9289f2a782.png)

* maven配置

在项目开始前，我们安装了maven，所以maven使用默认的配置就行，所以这块不用改。
如果服务器有多个maven，需要用到这时候就需要重新配置一下了，配置的时候到maven的setting.xml路径，比如`/usr/local/maven/apache-maven-3.8.6/conf/setting.xml`。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/59fb940816bd41b1b00aa26b47bd0367.png)

然后我们拉到最下面可以看到还有一个maven，这个需要配置一下；

找到Maven安装 --> 点击新增Maven --> 配置maven路径即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/131dc38156a0416d99ea122e9c58366d.png)



* jdk配置

找到JDK安装 --> 点击新增JDK --> 配置jdk路径即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b932b458ee2a4080ab323647817c990a.png)



配置完之后保存。







#### 2.2.4 先写一个描述（可写可不写）
进入刚刚创建的maven项目，选择`配置`，跳到这个页面；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/72477befb11347d3ba9bc3342e85d811.png)
#### 2.2.5 创建源码管理（svn方式）
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/8868b3c742d24f73bfbe615b7412e87d.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f0137b4e935c492f919e9fb82f27033b.png)

#### 2.2.6 保存配置
配置完之后，点击保存

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/74ca22a9813b4729a5d0fc72ebb5f4d5.png)







## 三、构建maven项目
### 3.1 build（构建）项目
保存完之后，看到左边有一个`build now`，然后点击build（构建）就可以了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/da999cab6ed04a19844157ad6311163b.png)

构建的时候可以查看构建过程，`F5` 刷新一下页面

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/95fd120ef0364e35b3089c7dc971e3ca.png)

往下拉，看到这个，点进去，然后点击控制台输出，就可以看到构建过程了。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1709a9b6f169425ca145ea6fc7a3565a.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/0de760ee47954cdaa0f0f790c44d2216.png)

### 3.2 构建完成

出现`Finished: SUCCESS` 就是构建完成了。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/673564d1e9bd48f3bf5b96f7e71e43a0.png)

同时，最上面也会变成一个绿色的对号；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/a7fe74a395124459a8b23381de0291dc.png)

构建完之后就可以在服务器上查看了，以下是存放到服务器的路径。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/aaee9b5c150f4272ad2ba2749209bba8.png)


### 3.3 构建报错总结：


#### 3.3.1 关于maven版本问题报错
如果在build的时候遇到此报错，是因为maven版本的问题；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/6f79c663519a47be915b7fef42e15729.png)

#### 3.3.2 关于jdk版本配置的问题
如果在build的时候遇到此报错，是因为jdk版本配置的问题；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/90b63e2d5b2648d4ba34ba5132a0fa07.png)



## 四、构建完自动在服务器中运行

### 4.1 在项目中配置Post Steps（发布步骤）
>这就是在build完之后，需要进行什么操作，在这里写。
>可以使用`ssh` 方式或者 `shell` 方式；
>`ssh` 和 `shell` 其实都一样，都是写命令的；
>ssh还需要配置全局变量，虽然上面已经配置了，但是我一般经常用 `shell` 方式，看自己选择吧。
>这里以 `shell` 方式举例。

首先，需要返回刚刚的项目中进行配置；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/185f8738ce7e4b62a59113a4475dae98.png)

* 找到 `Post Steps`

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/440205caa7ed43098b089acecd0d4c81.png)

* 选择执行shell，写个shell脚本（也可以使用ssh方式，自己定义）

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f65073a27e2d43c2a6d929cbda0ccaa0.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/2854c56118fe4c1aad7aa0b56945210b.png)

* shell 脚本内容

<font color=red>提示：如果要运行jar包的话，必须在脚本里添加：`BUILD_ID=DONTKILLME` 环境变量，防止执行完自动化构建jar包程序自动停止问题。</font>
```bash
#!/bin/bash

# （必须）配置一个环境变量，防止执行完自动化构建jar包程序自动停止问题
BUILD_ID=DONTKILLME

# 源jar包及路径
src_jar="/root/.jenkins/workspace/mytest_maven/target/cs.jar"
# 目标jar及包路径
dest_jar="/application/cs.jar"
# 目标jar包路径
dest_path="/application/"

# 创建目标路径
mkdir -p /application/

# 将打包完的jar包复制过去
## 先判断jar包是否存在，如果存在则备份，如果不存在，则直接复制过去运行。
if [ -e $dest_jar ];then
	echo "存在此文件，开始备份，重新复制：$(date +"%Y-%m-%d")"
	mv $dest_jar $dest_jar-$(date +"%Y-%m-%d")
    cp -ar $src_jar $dest_jar
else
	echo "目标路径没有这个文件，直接复制过去"
	cp -ar $src_jar $dest_jar
fi

cd $dest_path
# 检测jar包进程，这里直接写jar包名称，因为如果引用上面的环境变量，是路径加jar包名，如果在服务器上但启动的话，可能会找不到，所以需要直接写jar包名称。
jar_jin=$(ps -ef | grep -v grep | grep -ic cs.jar)

if [ "$jar_jin" -ge "1" ];then
	echo "检测到进程，先杀掉，后启动"
	ps -ef | grep -v grep | grep cs.jar | awk -F " " '{print $2}' | xargs kill -9
    java -jar $dest_jar --server.port=9999 >> app.log &
else
	echo "未检测到jar包进程，直接启动"
	java -jar $dest_jar --server.port=9999 >> app.log &
fi
```

配置完之后，点击保存；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/5ae3f0b933e24418be2a0b36b583ec58.png)


### 4.2 自动构建jar包并运行
* 点击构建（Build Now）

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/bc13b587eb24496091684709581ee6d8.png)
* `F5` 刷新一下，可看到最新的构建运行

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/02ab98775aa24817950fc4179c207fe2.png)


* 点击进入，查看控制台输出。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/e112d4cebf924f6abfa63bddb1f0c8c2.png)

输出`Finished: SUCCESS` 则为执行成功。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/14fe9e00aad74b87866030a7d3a21d89.png)

执行成功之后我们进入到服务器中，查看一下服务是否启动，可以查看端口是否启动或者jar包进程是否启动


```bash
ps -ef | grep cs.jar

netstat -anput | grep 9999
```
端口和jar包进程都存在，则可以去做访问页面之类的操作了。
>如果访问不到，需要确认服务是否正常启动或防火墙端口是否开启。


这样自动构建打包jar包并运行就完成了。

## 五、动构建打包jar包并运行完成