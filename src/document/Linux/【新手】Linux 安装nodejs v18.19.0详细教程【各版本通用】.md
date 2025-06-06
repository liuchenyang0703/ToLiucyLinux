---
title: 【新手】Linux 安装nodejs v18.19.0详细教程【各版本通用】
icon: circle-info
order: 1
tag:
- linux
- nodejs
- 运维
category:
- linux
- nodejs
pageview: false
date: 2025-06-05
comment: false
isOriginal: true
---

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/profile/7yu26jk3lfqxg)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## 一、下载、安装

### 1、下载地址

> nodejs官网：[https://nodejs.org/](https://nodejs.org/)
>
> nodejs官网下载地址：[https://nodejs.org/download/release/](https://nodejs.org/download/release/)
>
> nodejs官网下载地址（v18.19.0直达）：[https://nodejs.org/download/release/v18.19.0/](https://nodejs.org/download/release/v18.19.0/)



* 根据自己的情况选择，我这里是选择`Linux `版本；找到`linux-x64.tar.gz`

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202506051150715.png)



>下载好之后上传到服务器上，并进行安装；


### 2、安装nodejs

```bash
# 上传到服务器上将文件解压到/usr/local/下并重命名为nodejs
tar xzf node-v18.19.0-linux-x64.tar.gz -C /usr/local/
cd /usr/local/
mv node-v18.19.0-linux-x64 nodejs
```

* 配置环境变量（在`profile`文件最后添加`export`两行）

```bash
vim /etc/profile

export NODE_HOME=/usr/local/nodejs
export PATH=$NODE_HOME/bin:$PATH
```

* 使环境变量生效

```bash
source /etc/profile
```

---
### 3、验证nodejs安装是否成功
至此，node就已经安装成功了，我们来验证一下；

```bash
# 执行node -v 和 npm -v查看nodejs版本；
node -v

npm -v
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202506051343918.png)



可以看到已经成功安装了；



## 二、环境配置及优化
### 1、设置npm全局模块目录和缓存目录
```bash
# 查看默认npu配置
npm config ls
```

接下来我们就需要修改默认安装的路径；
#### 1.1 配置 npm 默认安装全局路径

```bash
npm config set prefix '/usr/local/nodejs'

# 查看prefix配置是否配置成功
npm config get prefix
npm config ls
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202506051502262.png)



#### 1.2 创建并配置 npm 缓存目录

```bash
# 创建npm缓存路径
mkdir -p /usr/local/nodejs/lib/node_cache

# 配置npm缓存路径
npm config set cache '/usr/local/nodejs/lib/node_cache'

# 查看npm配置路径是否配置成功
npm config get cache
npm config ls
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202506051459956.png)



### 2、修改npm默认源为淘宝源

>  默认源为：`https://registry.npmjs.org`

```bash
npm config set registry https://registry.npm.taobao.org
```
即可修改成功，查看npm源是否更换：

```bash
npm config get registry
npm config ls
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202506051433147.png)

可以看到源已经更新为淘宝源。



## 三、测试验证

```bash
npm install -g pnpm
# 或直接使用--registry指定某个源下载
npm install -g cnpm pnpm --registry=https://registry.npm.taobao.org
```

* 命令解析：

|  命令|解析  |
|--|--|
|npm install  | 是安装的意思 |
|-g | 是指全局安装|
|cnpm	|是安装的包|
|--registry|是指定安装的镜像源|

如果安装时遇到此报错，是因为证书过期；可以取消ssl证书验证；

```bash
npm config set strict-ssl false
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202506051500573.png)

取消之后再次安装就可以了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202506051505918.png)

安装好之后可以在`/usr/local/nodejs/lib/node_modules`中看到；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202506051509570.png)



## 四、常见问题

### 常见报错1：ssl证书报错
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202506051510801.png)

如果安装时遇到此报错，是因为证书过期；可以取消ssl证书验证；

```bash
npm config set strict-ssl false
```

取消之后再次安装就可以了；



### 常见报错2：执行`node -v` 查看时提示glibc错

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202506051323175.png)



这是因为我用的centos系统，本身的glibc版本太低了，所以才会报这个错，可以更换操作系统或升级glibc，但升级glibc可能会给系统造成不可逆的伤害，需谨慎升级；

* [x] 推荐更换操作系统，可以使用ubuntu20.04的；
* [x] 也推荐可以使用docker，镜像用ubuntu20.04的就行（docker pull liuchenyang/ubuntu20.04）；
* [x] 也可以直接拉取我已经做好的镜像；`docker pull liuchenyang/nodejs:v18.19.0`

如果在拉取镜像失败或超时的时候可参考：[【Docker】完美解决拉取镜像超时报错：ERROR: Get https://registry-1.docker.io/v2/](https://liucy.blog.csdn.net/article/details/129085538)

---
---
>  <center>至此，nodejs就已经安装完成了！！！</center>



## 五、相关文章

| 文章标题                                | 文章链接                                                     |
| --------------------------------------- | ------------------------------------------------------------ |
| 【新手】win10安装nodejs V16.9.0详细教程【各版本通用】 | [https://blog.csdn.net/liu_chen_yang/article/details/136391598](https://blog.csdn.net/liu_chen_yang/article/details/136391598) |
| 【新手】Linux 安装nodejs v18.19.0详细教程【各版本通用】 | [https://blog.csdn.net/liu_chen_yang/article/details/148451847](https://blog.csdn.net/liu_chen_yang/article/details/148451847)|
