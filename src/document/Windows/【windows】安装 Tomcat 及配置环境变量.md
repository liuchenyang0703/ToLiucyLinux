---
title: 【windows】安装 Tomcat 及配置环境变量
icon: circle-info
order: 11
tag:
- Windows
- Tomcat
- 运维
category:
- Windows
- Tomcat
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


## 一、前言
> 因为最近在windows上安装了一个Tomcat，因为版本比较低；而最近在扫描服务漏洞，刚好也扫描了一些windows上的服务，就扫出来了一个漏洞，所以简单点就需要更新一下版本，来解决tomcat的漏洞问题；
> 漏洞名称为：<font color=red>(CVE-2021-31805) 远程代码执行漏洞</font>，所以需要升级一下 `Tomcat` ，本次 `Tomcat` 升级到 `9.0.82` 版本 。
> 

## 二、官网下载安装包
>Tomcat官方下载地址：[https://tomcat.apache.org/](https://tomcat.apache.org/)

* 点击左侧的 Tomcat 9

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b0d4b829111d4872996c7fe48f6275e7.png)

* 找到自己需要的版本 并 根据自己的电脑位数来下载，我这里是`64位`。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/3e0e64193fdf4993ba90500d8a9e6728.png)

## 三、解压 Tomcat 压缩包

将下载的包解压到自己想要放的目录；这里我放到`桌面`下，（因为这里做一下测试，所以就直接放到桌面了），放到桌面下之后解压`apache-tomcat`压缩包；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4e6c02c5fc45435ebceb0fe64926b4d2.png)

* 可以看到以下是解压下来文件中的内容

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/52088919ed9647ef9c3f0bca744faec8.png)

## 四、配置环境变量
解压完之后，这里不需要做什么安装操作，只需要配置一下环境变量即可；

>此电脑 --> 属性 --> 高级系统设置 --> 环境变量

这里`此电脑 --> 属性 --> 高级系统设置`这块我就不展示了，大家应该都可以找到吧；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/5f8306b044574abba05a6d240334a01f.png)


系统变量 --> 新建 
变量名：`CATALINA_HOME`
变量值：`Tomcat的解压路径 `

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/66462d602d5544ac8870d184d54a8d13.png)

点击确定 --> 找到系统变量中的Path --> 编辑
添加：
><font color=red>提示：这里根据windows版本的不同，添加环境变量的path的显示可能就不一样；</font><br>
>如果path变量值是一行一行的，那么在最后一行添加：`%CATALINA_HOME%\bin`就行；<br>
>如果path变量值是在一行中，那么在最后面添加：`%CATALINA_HOME%\bin;`
>需要注意的是在一行中，在最后添加的时候需要注意前面是否有`分号;`，如果没有需要加上；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/10357496e9854395bd0351fb66343677.png)


然后一直点击确定 --> 确定 --> 确定到桌面即可；


## 五、测试是否配置成功、启动 Tomcat 服务
进入 `apache-tomcat-9.0.82/bin/`目录，右击使用管理员执行 `startup.bat` 脚本；

启动结果如下图：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/e2737dd59daa44cd9cc77cef39bac291.png)

看到启动tomcat服务有乱码问题，我们先停止脚本，解决一下乱码问题；
停止tomcat服务：执行`bin/`下的`shutdown.bat` 脚本停止；

解决乱码问题：修改tomcat文件中的conf目录下的logging.properties：`conf/logging.properties` 文件中的  `java.util.logging.ConsoleHandler.encoding`，改为`GBK`即可；

```bash
java.util.logging.ConsoleHandler.encoding = GBK
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b36fc96c523b48acaeb85439270693c4.png)

修改完之后，保存退出后再执行`startup.bat`启动tomcat脚本，会发现没有乱码问题了；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/17b5fb889244431a8d960e12cb252256.png)


到这里也就启动成功了。

## 六、页面访问
默认端口为8080

```bash
http://localhost:8080/
```

看到如下页面，则代表安装成功。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/140a6b09fa68400fb5c56b531f90f162.png)


## 七、部署完成
>更多windows相关知识，可订阅：[《Windows相关技术》](https://blog.csdn.net/liu_chen_yang/category_12481542.html?spm=1001.2014.3001.5482)专栏。
