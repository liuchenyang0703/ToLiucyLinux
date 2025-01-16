---
title: 【Linux】Docker 搭建 Jenkins
icon: circle-info
order: 1
category:
  - Linux
  - Docker
  - Jenkins
tag:
  - Linux
  - Docker
  - Jenkins
  - 运维
pageview: false
date: 2024-12-16
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161514069.jpeg)


>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---

## 一、Jenkins到底是什么？
>&emsp;&emsp;Jenkins是一款开源 CI&CD 软件，用于自动化各种任务，包括构建、测试和部署软件。支持各种运行方式，可通过系统包、Docker 或者通过一个独立的 Java 程序。下面为项目持续集成和交互的流程图
>
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161514037.png)
## 二、持续集成、自动部署流程
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161514815.png)

>&emsp;&emsp;开发人员将代码push到gitlab中，触发jenkins的自动pull拉取代码，通过maven编译、打包，然后通过执行shell脚本使docker构建镜像并push到私服（或者阿里云）仓库，此操作完成后jenkins服务器上再执行SSH命令登录到部署服务器，docker从仓库（私服）拉取镜像，启动容器。整个操作流程完成。


## 三、使用docker部署Jenkins
### 1  安装docker服务并添加docker的镜像加速源

>首先安装docker，并且添加docker的镜像加速源；添加docker的镜像源可以加速拉取镜像；
>
docker安装的方式可参考：[linux（centos）中部署docker（步骤超全，含带一些发展史和一些概念）](https://liucy.blog.csdn.net/article/details/123842609)

更换docker的镜像源：

```bash
#切换到/etc/docker/
cd /etc/docker/

#创建daemon.json文件
touch daemon.json
#或者直接vim daemon.json
vim daemon.json

{
    "registry-mirrors":[
        "https://fdsfa43fg.mirror.aliyuncs.com"
    ]
}

#写入完成之后保存退出重新加载配置并重启docker服务
#保存退出
:wq

#重新加载配置
systemctl daemon-reload

#重启docker服务
systemctl restart docker
```

重启完可用docker info命令查看是否添加上

```bash
docker info
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161514294.png)
### 2 拉取Jenkins镜像

```bash
docker pull jenkins/jenkins
```
等待拉取即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161514701.png)

拉取完成之后查看镜像

```bash
[root@localhost docker]# docker images

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
jenkins/jenkins     latest              55860ee0cd73        10 months ago       442MB
```
### 3 创建Jenkins挂载目录并赋予权限

3.1 稍后可以将docker内的目录挂载到此目录上，方便操作容器内文件夹而不需要进入容器 

```bash
mkdir -p /var/jenkins_home
```

3.2 为挂载目录赋予权限

```bash
chmod 777 /var/jenkins_home
```
### 4 创建Jenkins容器并运行

```bash
docker run -itd --name jenkins --restart=always --network=host --privileged=true -v /var/jenkins_home/:/var/jenkins_home/ -v /etc/localtime:/etc/localtime jenkins/jenkins:latest
```

> 创建并启动一个名为Jenkins的docker容器：
> -it是以交互式创建，-d是后台执行；
> --name是让其自定义一个名字jenkins（自定义）；
> --restart是设置开机自动重启 always开机自动重启；
> --network是网络模式 host是主机模式；
> --privileged是加上这个参数容器内就会拥有和容器外一样的root权限了；
> -v是将容器中的/var/jenkins_home挂载到本机的/var/jenkins_home目录，前者为本机地址，后者为容器地址 ；
> 最后jenkins/jenkins则是本次运行使用的镜像；

### 5 页面访问jenkins

```bash
docker ps -a 
```
jenkins运行中页面访问

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161514975.png)
ip:port


**<font color=red>如：遇到页面访问不到的情况，可使用`netstat -anput | grep port` 查看端口是否被占用；</font>**

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161514335.png)

#### 5.1 解锁 Jenkins
根据提示找到jenkins的密码；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161514734.png)

```bash
[root@localhost secrets]# cat /var/jenkins_home/secrets/initialAdminPassword 
82112870c37694a46ab4f732dafsfa0019334ef0
```
将密码复制到页面上，点击继续；

#### 5.2 自定义Jenkins---安装推荐插件

可选择使用`推荐插件`或`自定义插件`；推荐使用`推荐插件`。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161514074.png)


##### 5.2.1 配置镜像加速器
插件安装失败或速度过慢，可通过配置镜像加速解决。

```bash
#停止jenkins容器
docker stop jenkins

#进入jenkins挂载的文件中
cd /var/jenkins_home/

#编辑配置文件
vim hudson.model.UpdateCenter.xml

#将url值修改为清华大学官方镜像地址
https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json

#保存退出重启容器
:wq
docker restart jenkins
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161514138.png)

#### 5.3 创建管理用户

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161514370.png)
#### 5.4 实例配置
直接保存并完成即可
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161514850.png)

#### 5.5 开始使用
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161514257.png)

## 四、Jenkins安装Github所需插件
需要安装几个必须的插件：`CloudBees Credentials` 、`GitHub API Plugin`、`SSH Credentials Plugin`、`Git client plugin`、`SCM API`、`Mailer Plugin` 、`Plain Credentials Plugin` 、`GIT plugin`、`GitHub Plugin`、`Publish Over.SSH` 、`Maven Integration`

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161514112.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161513989.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161513444.png)

## 五【附加】 github生成Token步骤
### 1 访问github并登录
github官网：[https://github.com/](https://github.com/)

登录：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161513429.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161513547.png)

### 2 配置Personal Access Token
>在对项目有写权限的用户上获取token进入github –> setting –> Developer settings –>  Personal Access Token –> Token –> Generate new token

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161513382.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161513306.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161513762.png)

>找到tokens，新建tokens并设置读、写、执行权限

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161513810.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161513378.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161513476.png)







