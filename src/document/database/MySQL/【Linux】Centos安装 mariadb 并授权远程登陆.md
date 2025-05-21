---
title: 【Linux】Centos安装 mariadb 并授权远程登陆
icon: circle-info
order: 3
category:
  - Linux
  - 数据库
tag:
  - Linux
  - 数据库
pageview: false
date: 2023-11-19 23:54:31
comment: false
breadcrumb: false
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


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/855c9bc0e2ec444192e8cf5c5e1a8229.gif)


## 安装mariadb
```bash
#安装mariadb
yum install mariadb\* -y

#启动数据库
systemctl start mariadb
#设置开机自启
systemctl enable mariadb

#查看数据库是否启动（有进程则启动）
netstat -anput | grep 3306
```
如果要修改端口可在`/etc/my.cnf`中的`[mysqld]`下一行加一个`port=想要的端口`，然后重启服务，查看端口即可；
## 初始化mariadb

```bash
#数据库初始化操作（设置密码）
mysql_secure_installation
```

提示：如果回车没有反应，先检查mariadb是否启动。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/7acba896caf44af2b9202d7a3b26db84.png)

## 测试数据库连接并开启远程登陆
```bash
#进入mysql数据库
mysql -uroot -p密码

#设置数据库远程连接，用于使用外部软件链接数据库【Navicat、SQLyog】
grant all privileges  on *.* to root@'%' identified by "123123";
#刷新权限
flush privileges;
```
这样就可以在远程链接数据库了；


## 测试本地客户端连接（远程连接）
开放远程登录这时候我们就可以用`navicat、sqlyog`等链接工具来连接数据库了，端口3306；自己可以测试一下，如果是直接在linux中用就不用测试了。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b4b2ab1ac57c4b0fa8af2f7f39827c69.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/91efe871b6474deda61743f82c5f1af8.png)

这样就链接成功了，就可以在里面操作增删改查库了。


当然还有一种测试远程登陆方案；前提是必须可以ping通要访问某台数据库的ip；可以使用：


```bash
mysql -h IP -P端口 -u用户名 -p密码

例如：
mysql -h 172.16.10.10 -P3306 -uroot -p123123
```


## 总结
>现在centos7安装mariadb就完成了，本地客户端连接centos7中的mariadb服务端也是成功的。


## 相关文章：
|文章标题|文章地址  |
|--|--|
| [基于Linux对MySQL数据库的安全加固指南（超实用）](https://liucy.blog.csdn.net/article/details/131936739) |[https://liucy.blog.csdn.net/article/details/131936739](https://liucy.blog.csdn.net/article/details/131936739)  |
|[Centos7安装Mysql5.7（超详细版）](https://liucy.blog.csdn.net/article/details/124930789)|[https://liucy.blog.csdn.net/article/details/124930789](https://liucy.blog.csdn.net/article/details/124930789)|
|[【Linux】Centos安装mariadb并授权远程登陆](https://liucy.blog.csdn.net/article/details/132077172)|[https://liucy.blog.csdn.net/article/details/132077172](https://liucy.blog.csdn.net/article/details/132077172)|
|[【云原生】Docker之创建并进入mysql容器](https://liucy.blog.csdn.net/article/details/126288434)|[https://liucy.blog.csdn.net/article/details/126288434](https://liucy.blog.csdn.net/article/details/126288434)|

