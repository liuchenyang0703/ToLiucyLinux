---
title: Docker发布_上传镜像到dockerhub&&下载_拉取镜像&&删除dockerhub镜像
icon: circle-info
order: 1
category:
  - Linux
  - Docker
tag:
  - Linux
  - Docker
  - 运维
pageview: false
date: 2024-12-16
comment: false
breadcrumb: false
---

## 一、注册dockerhub

我们先去官网注册dockerhub的账号和密码，官网在下方↓
[https://hub.docker.com/](https://hub.docker.com/)
登录到这个界面。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161449105.png)

## 二、安装docker

详细的安装步骤我们可以采纳以下这个文档
[linux（centos）中部署docker（步骤超全，含带一些发展史和一些概念）](https://blog.csdn.net/liu_chen_yang/article/details/123842609)

## 三、编写一个dockerfile打成镜像或者直接pull一个镜像
### 1、编写dockerfile
编写一个dockerfile的话，我们可以写一个非常简单的dockerfile；

```bash
vim Dockerfile
```

```bash
FROM centos
```
（1）build一个镜像
```bash
docker build -f Dockerfile -t mycentos:v1 .
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161449977.png)

（2）docker images查看
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161449939.png)
这里一个镜像就打好了；

### 2、直接pull一个镜像

```bash
docker pull busybox
```
（1）docker images查看
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161449807.png)
这里一个镜像就拉好了；

## 四、修改镜像标签
**<font color=teal>格式：</font>**
```bash
docker tag 镜像名:版本 dockerhub用户名/镜像名:版本
```
**<font color=teal>实例：</font>**
```bash
#dockerfile打出来的镜像
docker tag mycentos:v1 liuchenyang/mycenos:v1

#pull直接拉取的镜像
docker tag busybox:latest liuchenyang/busybox:v1
```
改完之后就是一下这种：

```bash
root@pzg:[root]docker images
REPOSITORY                           TAG                         IMAGE ID            CREATED             SIZE
busybox                              latest                      beae173ccac6        4 months ago        1.24MB
liuchenyang/busybox                  v1                          beae173ccac6        4 months ago        1.24MB
mycentos                             v1                          5d0da3dc9764        7 months ago        231MB
liuchenyang/mycenos                  v1                          5d0da3dc9764        7 months ago        231MB
```

## 五、使用命令登录dockerhub
>&emsp;&emsp;我们在这里登录的时候可以docker login -u 用户名指定，也可以直接docker login然后输入用户名和密码；
>&emsp;&emsp;还有就是如果已经又用户登录这可以退出登<font color=red>docker logout</font>退出登录。

### 1、-u 指定用户登录
指定用户登录，直接输入密码即可；
```bash
docker login -u liuchenyang
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161450730.png)

### 2、直接docker login登录

```bash
[root@bogon]# docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: liuchenyang
Password: 
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```
这样就登录成功了，我就就开始打包镜像，推送镜像。
## 六、推送镜像到dockerhub
**<font color=teal>格式：</font>**
```bash
docker push 修改的镜像名:版本
```
**<font color=teal>实例：</font>**

dockerfile打出来的镜像：
```bash
root@hostname# docker push liuchenyang/mycenos:v1
The push refers to repository [docker.io/liuchenyang/mycenos]
74ddd0ec08fa: Mounted from library/centos 
v1: digest: sha256:a1801b843b1bfaf77c501e7a6d3f709401a1e0c83863037fa3aab063a7fdb9dc size: 529
```
docker pull拉取出来的镜像：

```bash
root@hostname# docker push liuchenyang/busybox:v1 
The push refers to repository [docker.io/liuchenyang/busybox]
01fd6df81c8e: Mounted from library/busybox 
v1: digest: sha256:62ffc2ed7554e4c6d360bce40bbcf196573dd27c4ce080641a2c59867e732dee size: 527
```
最后显示的有<font color=red>大小多少</font>则是上传成功，然而显示的<font color=red>denied: requested access to the resource is denied</font>则是报错，可以看第八条。
## 七、查看dockerhub
这时候我们登录dockerhub官网去查看：[dockerhub官网](https://hub.docker.com/)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161450911.png)
然后可以看到这时候已经上传到dockerhub中；之后下载镜像也可以直接登录dockerhub账号，然后pull镜像了。
## 八、denied: requested access to the resource is denied报错详解
如遇到此类报错，可以查看：[Docker——denied: requested access to the resource is denied问题以及解决方法](https://blog.csdn.net/liu_chen_yang/article/details/124665726?spm=1001.2014.3001.5502)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161450008.png)
## 九、拉取镜像
**<font color=teal>格式：</font>**
```bash
docker pull dockerhub的镜像名
```
**<font color=teal>实例：</font>**

```bash
root@locahost# docker pull liuchenyang/mycenos:v1
v1: Pulling from liuchenyang/mycenos
Digest: sha256:a1801b843b1bfaf77c501e7a6d3f709401a1e0c83863037fa3aab063a7fdb9dc
Status: Downloaded newer image for liuchenyang/mycenos:v1
docker.io/liuchenyang/mycenos:v1
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161450250.png)
拉取成功，后续需要修改镜像名可以通过“<font color=red>docker tag 原镜像名 要修改的镜像名</font>” 来修改。
也可以从dockerhub中查看拉取镜像的命令；
点击你想要拉取的镜像；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161450389.png)
然后选择tag，就可以看到有一个拉取镜像的命令了；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161450790.png)

## 十、删除dockerhub镜像
还是先选择要删除的镜像；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161450218.png)
然后点击settings，往下面翻就可以看到删除镜像了；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161450793.png)
然后会让你再次输入要删除的镜像，就和提示你确认是否删除是一样的，怕你误删；输入完镜像名之后再次点击delete就可以删除了；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161450686.png)
然后就可以看到只剩一个镜像了，这时就删除成功了。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161450001.png)

# 总结
**相关文章：**
>①、[Docker——denied: requested access to the resource is denied问题以及解决方法](https://blog.csdn.net/liu_chen_yang/article/details/124665726?spm=1001.2014.3001.5502)
>②、[Docker搭建harbor私有镜像仓库（命令行模式）](https://blog.csdn.net/liu_chen_yang/article/details/124705622)
>③、[Linux中基于Docker搭建harbor私有镜像仓库（超级详细）](https://blog.csdn.net/liu_chen_yang/article/details/124623482)🔥🔥
