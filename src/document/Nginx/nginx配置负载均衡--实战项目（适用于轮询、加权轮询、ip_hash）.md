---
title: nginx配置负载均衡--实战项目（适用于轮询、加权轮询、ip_hash）
icon: circle-info
order: 1
category:
  - Linux
  - Nginx
tag:
  - Linux
  - Nginx
  - 运维
pageview: false
date: 2024-12-16
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




![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161332109.jpeg)

## 两台服务器：

| 服务器ip     | 应用（谁用） |
| ------------ | ------------ |
| 172.16.10.10 | 线上         |
| 172.16.10.20 | 研发         |



## 业务需求：

有两台服务器，一台供于线上使用（172.16.10.10），一台供于研发使用（172.16.10.20）

如果线上的服务器挂了，需要将所有请求转移到研发的机器上，以确保线上服务正常使用；

正常时间还是线上使用线上的服务器，研发用研发的服务器；只有在线上服务器挂了的时候才会使用备用的研发服务器；





## 需求实现：

> 使用nginx负载均衡来实现；`ip_hash`方式



在nginx服务器配置中添加负载：（设置负载均衡时同台服务器不同端口也可以，不同服务器，同端口也可以）

```bash
    upstream front_server{  #定义一个服务配置front_server
            ip_hash; #表示配置一个用户固定访问一台设备
            server 172.16.10.10:8080 weight=1; #第一台服务机器 设置权重值1
            server 172.16.10.20:8080 weight=2; #第二台服务机器 设置权重值2
    }
    server {
        listen       8099;	#如果有一个服务是本台的那么8080肯定会被占用，这时候我们可以改一个访问端口即可；
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
          #  root   html;
          #  index  index.html index.htm;
		proxy_pass http://front_server$request_uri;
		proxy_http_version 1.1;
		proxy_set_header Uparade $http_upgrade;
		proxy_set_header Connection "Upgrade";
		proxy_set_header Host $host;
        }
```

配置完负载之后，报错保存退出，检测`nginx`配置语法是否有误；

```bash
#检测nginx配置语法是否有误，前面路径可根据自己安装的目录来写
/usr/local/nginx/sbin/nginx -t
```

返回这个有`ok`，则nginx配置没有问题；如果有报错会显示几行报错的。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161332468.png)



检测没问题之后，重新启动nginx服务

```bash
#重启nginx服务，前面路径可根据自己安装的目录来写
/usr/local/nginx/sbin/nginx -s reload

#启动完成，检查是否启动（ps查看服务是否正常启动、netstat查看配置的端口是否正常启动）
ps -ef | grep nginx
netstat -anput | grep 8099

#完成之后就可以页面访问了。
```



> 配置好之后，这个只是配置了负载均衡，如果服务有后缀，那么自己在访问负载的`ip:prot`的时候在后面加上后缀即可。<font color=blue>例如：172.16.10.10:8099/cs/index/</font>



访问页面，持续监控两台服务的日志输出，测试即可；





##  负载均衡方式（常用的三种）：

<font color=red>轮询：</font>两台服务器会随机发送请求；

<font color=red>加权轮询：</font>两台服务器也都会随机发送请求，但是会有一个权重值，谁的权重值高，接收的请求就会比另一个多；

<font color=red>ip_hash：</font>也是会有权重值，谁的权重值越高，请求就会在最高的权重值中，只有当权重值最高的那台服务器挂了，再会去找权重值第二的服务器；（1为最高权重值）

- 轮询：

```bash
    upstream front_server{  #定义一个服务配置front_server
            server 172.16.10.10:8080; #第一台服务机器（两台服务器随机分配请求）
            server 172.16.10.20:8080; #第二台服务机器（两台服务器随机分配请求）
    }
```



- 加权轮询：

```bash
    upstream front_server{  #定义一个服务配置front_server
            server 172.16.10.10:8080 weight=5; #第一台服务机器，权重值比较高，所以大部分的请求都会在10上；
            server 172.16.10.20:8080 weight=2; #第二台服务机器，权重值比较低，所以少部分的请求会在20上；
    }
```



- ip_hash

```bash
    upstream front_server{  #定义一个服务配置front_server
            ip_hash;
            server 172.16.10.10:8080;
            server 172.16.10.20:8080;
    }
```



## 相关文章
|文章标题| 文章连接 |
|--|--|
|【Linux】nginx基础篇 -- 介绍及yum安装nginx|[https://liucy.blog.csdn.net/article/details/133928000](https://liucy.blog.csdn.net/article/details/133928000)|
|【Linux】环境下部署Nginx服务 - 二进制部署方式 |  [https://liucy.blog.csdn.net/article/details/132145067](https://liucy.blog.csdn.net/article/details/132145067)|
|nginx配置负载均衡--实战项目（适用于轮询、加权轮询、ip_hash）|[https://liucy.blog.csdn.net/article/details/133986013](https://liucy.blog.csdn.net/article/details/133986013)|
|nginx快速部署一个网站服务 + 多域名 + 多端口 | [https://liucy.blog.csdn.net/article/details/133986102](https://liucy.blog.csdn.net/article/details/133986102) |
| 【Linux】Nginx一个域名https&一个地址配置多个项目【项目实战】|[https://liucy.blog.csdn.net/article/details/144442148](https://liucy.blog.csdn.net/article/details/144442148) |

## 相关专栏
><div align="center"><a href="https://blog.csdn.net/liu_chen_yang/category_10887074.html">❀《Linux从入门到精通》专栏 ❀</a></div>
><div align="center"><a href="https://blog.csdn.net/liu_chen_yang/category_12419502.html">❀《Nginx》专栏 ❀</a></div>

>🐋 希望大家多多支持，我们一起进步！😄
🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗
