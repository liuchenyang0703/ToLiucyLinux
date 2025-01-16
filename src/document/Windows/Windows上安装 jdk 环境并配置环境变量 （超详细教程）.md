---
title: Windows上安装 jdk 环境并配置环境变量 （超详细教程）
icon: circle-info
order: 11
tag:
- Windows
- jdk
- 运维
category:
- Windows
- Java
pageview: false
date: 2024-03-24
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


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/db79e07b492e4ef6b680d89a400afcdb.jpeg)

## 前言

> 本文主要讲解的是在windows上安装`jdk`的环境和配置环境变量；
> - jdk版本：1.8.381
> - Windows版本：win11（win10通用）

## 下载jdk1.8安装包
>官网下载地址：[jdk下载官网链接](https://www.oracle.com/java/technologies/downloads/#java8-windows)  需要登陆Oracle账号信息；<br> 
>百度网盘下载：[网盘下载地址](https://pan.baidu.com/s/1QwdhdmS1PfhtCX4MknJXYA?pwd=s9dy)


## 安装jdk1.8（新建一个纯英文目录，中文可能导致安装失败）

><font color=red>前言：建议创建英文目录，然后在英文目录创建一个`jdk1.8`目录，一个`jre1.8`目录，后面配置环境变量需要用到。</font>

等待下载完成，放到自己自定义的目录，右击以管理员方式进行安装；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/42360afe7bb040dead85065f17ae1faa.png)



然后一直下一步，到选路径的时候，选一下就可以了，路径要记住，配置环境变量的时候要用到。


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/59db495b77c145b29ec5e7b7f2b9ac99.png)

><font color=red>这里注意，安装目录需要英文目录，不可以带中文。
>建议创建英文目录，然后在英文目录创建一个`jdk1.8`目录，一个`jre1.8`目录，后面配置环境变量需要用到。</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/bca284b92cb04dda9202f4fd80a539a4.png)


安装完成之后会让你更改目标文件夹，也同样的修改到D盘就可以了；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/2e359dd919d74dbe956ca0524b4de6cd.png)

安装完成关闭即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c38ec7b9f7b448f98d7e8f97f4fe3751.png)








## 配置环境变量

>得到完整的 jdk 环境之后，需要配置 jdk 的环境变量，右击此电脑-->属性-->高级系统设置-->环境变量，打开环境变量设置窗口。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/cfdde248de514bda972735cffe6bede3.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/8a4f25f0548e49e3a5547908eedc1938.png)


>可以看到有“用户变量”与“系统变量”。二者我认为最大的区别在于 用户变量只对当前用户有效，系统变量对所有用户有效；所以我一般在变量配置在“系统变量中”即可。


- 配置“JAVA_HOME”变量，变量名为：“JAVA_HOME ”。变量值为：“`D:\IDEA\windows-jdk1.8\jdk1.8`”。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/bd129cce73b445fe9a72fc55432d5ca2.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/bdd33104c9b24c5c8c406489e1575b09.png)

- 配置“CLASSPATH”变量，变量名为：“CLASSPATH ”。变量值为：【`.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar`】；并点击确定。


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/dbafec249f114572a2549020d0c00c27.png)

- 配置“Path”变量，变量名为：“Path ”。变量值为：【`.;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin`】；并点击确定。
- 找到“Path”，点击编辑。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b4378ce61bdb4502be188abfd3700d6c.png)
- 点击新建

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/331834c33fa647f4864f944d613f7c2b.png)
- 新增变量值为：【`.;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin`】；并点击确定。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/7225c237825e4ccbbec35dd078bf6fb5.png)

>这样就配置完了，一路点击确定，直到桌面；

## 校验是否配置成功

> windows+R 输入 cmd 打开终端，输入java -version，如果输出如下图所示，则安装成功。

```bash
#查看jdk 版本
java -version
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/fce81d255d0a435fa910a5e592712593.png)


 查看配置的环境变量
一、可以再次点击 `此电脑-->属性>环境变量` 查看

二、可以在cmd终端查看

```bash
echo %JAVA_HOME%
echo %CLASSPATH%
echo %PATH%
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f51055f68dc7438c940b9f97fdbf5441.png)



>至此就配置完成了。
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗



## 相关文章：
|文章标题| 文章链接 |
|--|--|
|[Windows上安装 jdk 环境并配置环境变量 （超详细教程）](https://liucy.blog.csdn.net/article/details/132114315)  | [https://liucy.blog.csdn.net/article/details/132114315](https://liucy.blog.csdn.net/article/details/132114315) |
|[Windows上安装 Go 环境并配置环境变量 （超详细教程）](https://liucy.blog.csdn.net/article/details/132012969)|[https://liucy.blog.csdn.net/article/details/132012969](https://liucy.blog.csdn.net/article/details/132012969)|
|[Windows上安装 Python 环境并配置环境变量 （超详细教程）](https://liucy.blog.csdn.net/article/details/131808146)|[https://liucy.blog.csdn.net/article/details/131808146](https://liucy.blog.csdn.net/article/details/131808146)|
