---
title: 【Docker】解决报错#WARNING_ IPv4 forwarding is disabled. Networking will not work.
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

>🍁**博主简介**
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>


## 注意事项：
>在这里强调，强制进入或者进入镜像，进入后会引起yum install和wget等不能使用

## docker创建运行指定端口的容器报错：
是警告，但这个也算是报错。
```bash
[root@localhost /]# docker run -itd --name nginx -p 80:80 -p 443:443 -v /etc/localtime:/etc/localtime nginx:latest
WARNING: IPv4 forwarding is disabled. Networking will not work.
```

## 解决方式：
### 1 第一步：添加ipv4到/usr/lib/sysctl.d/00-system.conf

>在宿主机上执行echo "net.ipv4.ip_forward=1" >>/usr/lib/sysctl.d/00-system.conf；

在执行之前可以先看一下这个配置文件；在进行追加命令到配置中；
```bash
echo "net.ipv4.ip_forward=1" >>/usr/lib/sysctl.d/00-system.conf；
```
添加完成之后查看一下；
```bash
cat /usr/lib/sysctl.d/00-system.conf；
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161510400.png)

### 2 第二步：重启network和docker服务

```bash
systemctl restart network && systemctl restart docker
```
### 3 第三步：验证问题是否解决
再次执行创建容器的命令
```bash
[root@localhost ~]# docker run -itd --name nginx -p 80:80 -p 443:443 -v /etc/localtime:/etc/localtime nginx:latest
474b88c967e10a5003182f185821acab8d8a750d675a3b3eeedcaeefeced2280
```
创建成功：

![](https://img-blog.csdnimg.cn/2f34240912854a25900f94d17dbb1d66.png)

## 问题解决❀

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161509228.jpeg)
---
---


