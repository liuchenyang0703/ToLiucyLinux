---
title: 【新手】win10安装nodejs V16.9.0详细教程
icon: circle-info
order: 11
tag:
- Windows
- nodejs
- 运维
category:
- Windows
- nodejs
pageview: false
date: 2023-03-24
comment: false
---

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---



## 一、下载、安装

### 1、下载地址

> nodejs官网：[https://nodejs.org/](https://nodejs.org/)
>
> nodejs官网下载地址：[https://nodejs.org/download/](https://nodejs.org/download/)
>
> nodejs官网下载地址（V16.9.0直达）：[https://nodejs.org/download/release/v16.9.0/](https://nodejs.org/download/release/v16.9.0/)



* 根据自己的情况选择，我这里是`win X64位 `

![image-20240301112155985](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f7eaea13ee8b5482f048062e86d6a0b7.png)

可以看到windows有两种格式的：msi zip格式的，这两者区别是什么呢？
>`.msi`和`.zip`格式区别：
`.msi`是Windows installer开发出来的程序安装文件，它可以让你安装，修改，卸载你所安装的程序。说白了`.msi`就是Windows installer的数据包，把所有和安装文件相关的内容封装在一个包里。此外：它还包含有关安装过程自己的信息。例如：安装序列、目标文件夹路径、安装选项和控制安装过程的属性。
`.zip`是一个压缩包，解压之后即可，不需要安装。
### 2、安装nodejs



①、在自己电脑的任意位置创建一个英文目录，然后把包放进里面即可；我这里在E盘创建一个nodejs目录：`E:\nodejs`；

②、将下载的包放进来，双击`node-v16.9.0-x64.msi`运行安装；



![image-20240301113442928](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/d8eaa6eac110b820a653358d3c7638c9.png)



到这选择安装路径，这个一定要记住，后面配置环境变量的时候用到，我就安装到`E:\nodejs`下；



![image-20240301113529882](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/d9aef455c4b4bb232e1fff347bc87714.png)





直接下一步即可，默认会自动配置环境变量；



![image-20240301113703486](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4b2dc54eae8b949d61da6a42393d28a3.png)



这个中间的框勾不勾都可以，看自己情况，我没勾；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/809acf4a8f09a661ffeabec56933c21f.png)




然后安装即可；



![image-20240301113843034](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/d5ec392dbc2d4f28ca4f9514dec87781.png)

点击 Finish（完成）按钮退出安装向导，完成安装。



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/50e271680788a1077a36620e4bb22493.png)



---
### 3、验证nodejs安装是否成功
至此，node就已经安装成功了，我们来验证一下；
`win + r `打开命令行，输入`cmd`进入命令行；执行`node -v `和`npm -v`查看nodejs版本；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4ef8f3e555317a7d5cc37f1647a813d0.png)



可以看到已经成功安装了；

>如果执行`node -v `和`npm -v`没有反应的话可能就是环境变量没有配置，本文的安装默认会自动配置，但有的就不会，就需要手动配置以下，如何配置我们可以查看：[配置nodejs环境变量](#click_me_jump)；

## 二、环境配置及优化
### 1、设置npm全局模块目录和缓存目录
默认情况下全局安装某个工具或者包时是全局安装到C盘的，占用C盘空间，其实我们可以修改默认安装的路径；
我们可以先使用以下命令来看默认安装的位置；

```bash
npm config ls
```

>`prefix`就是默认安装的位置；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/385ef20d853e131028bb6c74fb97b5ab.png)

接下来我们就需要修改默认安装的路径；
#### 1.1 修改npm默认安装的路径
首先在nodejs安装的目录下创建两个目录：`node_global（npm全局模块目录）`、`node_cache（缓存）`；
创建完之后再在`node_global`目录下创建一个`node_modules`目录；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b9a349e53e9464e53ff5397f0fea73ab.png)


#### 1.2 配置环境变量

此电脑 --> 属性 --> 高级系统设置

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/bf9d4e5009a5e5332d4d21c9a59b742f.png)

环境变量 --> 系统变量

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/27e801789f895789f4e9d29b125b3882.png)

在系统变量中新建一个`NODE_PATH`变量，变量值就是之前在nodejs安装路径下创建的`node_golbal`下的`node_modules`（注意：填写的是自己的路径）


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/d1bdf133ba37269333595532d212478a.png)


<span id="click_me_jump">配置nodejs环境变量：</span>
新建完点击确定，我们再找一下系统变量的`Path`；查看一下nodejs环境变量是否存在；本文是安装在`E:\nodejs`下（请根据自己的安装路径查看是否正确），正常情况在安装服务时系统默认会自动配置好的。如果没有需要自己手动配置，新建添加，值便是nodejs的安装路径；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f0d2fadd5195c704875684b98f5633b6.png)

完成之后点击确定，我们在给普通用户配置一下；
双击普通用户下的`Path`，进入编辑页新建一个变量， 值就是安装`nodejs`根路径下刚刚创建的`node_global`目录；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/e29af7d73277fdd8df6f342c604406de.png)

完成之后一直点击确定直到退出到桌面；


#### 1.3 修改缓存路径
* [x] 修改方法1：

`win + r`打开命令行，执行以下代码（后面的路径是实际刚刚新建的两个目录的路径）；

```bash
npm config set prefix "E:\nodejs\node_global"
npm config set cache "E:\nodejs\node_cache" 
```
修改完之后通过以下命令查看是否配置成功；

```bash
npm config get prefix

npm config get cache
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f07767f0c9c3529c357857459f736f5e.png)

也可以通过`npm config ls`查看路径是否修改成功；

```bash
npm config ls
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/54ecc635efb3b9432b3f52e2607c8f5e.png)

可以看到已经修改成功。

* [x] 修改方法2：

打开此电脑C盘，点击进入`用户`目录，再点击进入`user`用户（自己的用户）目录，可以看到会有一个名为`.npmrc`的文件，用记事本打开添加以下内容；当然使用第一种方法修改之后，在这里也是可以看到的；

```bash
prefix=E:\nodejs\node_global
cache=E:\nodejs\node_cache
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4f454227bb67a261dfe9f33cb6d358cb.png)

### 2、修改npm默认源为淘宝源

默认源为：`https://registry.npmjs.org`

同样的使用`win + r`打开命令行，输入以下代码：

```bash
npm config set registry https://registry.npm.taobao.org
```
即可修改成功，查看npm源是否更换：

```bash
npm config get registry
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/44f067cd493dd49cc313a9b17aa5a274.png)

可以看到源已经更新为淘宝源。

---
如果是使用指定淘宝源更新的，如下：

>将cnpm改为自己要安装的模块就行

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
命令解析：
|  命令|解析  |
|--|--|
|npm install  | 是安装的意思 |
|-g | 是指全局安装|
|cnpm	|是安装的包|
|--registry|是指定安装的镜像源|

>安装的时候尽量使用管理员安装

如果安装时遇到此报错，是因为证书过期；可以尝试取消ssl证书验证：`npm config set strict-ssl false`；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/dcf9286cfb344f63be0762769156a10e.png)

取消之后再次安装就可以了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/950145d7d1344540afd7737aba7af028.png)


## 三、测试（安装的时候记得使用管理员启动cmd窗口）

```bash
npm i @vue/cli -g
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/435370e7e3b3d715c9018c45037858e5.png)


安装完之后看自己配置的安装路径下：`E:\nodejs\node_global\node_modules`目录，可以看到多了一个`@vue`目录；

### 常见报错1：ssl证书报错
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/03faae74ec7b541f32b199cead79df4c.png)

如果遇到以上报错，这是ssl证书过期问题，可以尝试取消ssl证书验证：`npm config set strict-ssl false`；取消之后再次安装；


### 常见报错2：没有权限安装

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/9eeca0e1f701b9bf96a36e54c9560db4.png)

如果遇到此报错，是因为没有使用管理员用户运行，需要使用管理员安装；

---
---
至此，nodejs就已经安装完成了！！！





