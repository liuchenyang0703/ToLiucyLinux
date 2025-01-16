---
title: 【Docker】拉取镜像报错：x509_ certificate has expired or is not yet valid
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
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>



## 具体报错信息：
```bash
[root@k8d mysql]# docker pull mysql:5.7.38
Trying to pull repository docker.io/library/mysql ... 
Get https://registry-1.docker.io/v2/: x509: certificate has expired or is not yet valid
```
发现报错
><font color=red>x509: certificate has expired or is not yet valid</font> 翻译过来就是 <font color=green>x509：证书已过期或尚未生效</font>

## 问题排查：
### 时间问题排查
首先我们先看时间问题；
在docker拉取镜像时出现 x509 报错,一般都是证书问题或者系统时间问题导致，可以先执行 ​​date​​ 看一下系统时间对不对,如果服务器系统时间跟现实实际时间对不上的话，一般就是系统时间问题，同步时间即可。

#### 1 查看时间
```bash
[root@k8d mysql]# date
2023年 02月 17日 星期五 06:09:59 CST
```
确定系统时间与现在的时间对不上，估计就是这个问题了，我们来同步一下时间。
#### 2 安装同步时间工具 ntpdate
```bash
yum -y install ntpdate
```
#### 3 同步时间
安装完命令之后同步时间；
```bash
[root@k8d mysql]# ntpdate cn.pool.ntp.org
 7 Mar 10:40:40 ntpdate[6276]: step time server 120.25.115.20 offset 1571423.500135 sec
```
同步完成之后再次查看一下时间
#### 4 再次查看当前系统时间
```bash
[root@k8d mysql]# date
2023年 03月 07日 星期二 10:40:43 CST
```
同步成功，再次拉取镜像试一下
#### 5 再次拉取镜像
```bash
[root@k8d mysql]# docker pull mysql:5.7.38
Trying to pull repository docker.io/library/mysql ... 
5.7.38: Pulling from docker.io/library/mysql
66fb34780033: Pull complete 
ef4ccd63cdb4: Pull complete 
d6f28a94c51f: Pull complete 
7feea2a503b5: Pull complete 
71dd5852ecd9: Pull complete 
3da2c95cac2f: Pull complete 
af7913db289c: Pull complete 
77f552f93c12: Pull complete 
3ed53edb61ab: Pull complete 
67e1c6839f08: Pull complete 
abcdaaf08d0f: Pull complete 
Digest: sha256:bbe0e2b0a33ef5c3a983e490dcb3c1a42d623db1d5679e82f65cce3f32c8f254
Status: Downloaded newer image for docker.io/mysql:5.7.38
```
发现没有报错，拉取成功，问题解决。

如果还是有报错看第二种方法：
### 证书问题排查
证书问题需要编辑 <font color=red>​​/etc/docker/daemon.json</font> 文件，在配置文件中添加 <font color=red>​​​​"registry-mirrors":["https://docker.mirrors.ustc.edu.cn"]​​</font> 配置。

#### 编辑/etc/docker/daemon.json文件
```bash
[root@k8d mysql]# vim /etc/docker/daemon.json
{
"registry-mirrors":["https://hx983jf6.mirror.aliyuncs.com","https://docker.mirrors.ustc.edu.cn"],  //第一个是镜像加速配置
"graph":"/mnt/data"    //修改Docker默认存储路径配置
}
```
#### 更新docker/daemon.json配置
```bash
systemctl daemon-reload
```
#### 重启docker服务
```bash
systemctl restart docker
```

#### 再次拉取镜像
```bash
[root@k8d mysql]# docker pull mysql:5.7.38
Trying to pull repository docker.io/library/mysql ... 
5.7.38: Pulling from docker.io/library/mysql
66fb34780033: Pull complete 
ef4ccd63cdb4: Pull complete 
d6f28a94c51f: Pull complete 
7feea2a503b5: Pull complete 
71dd5852ecd9: Pull complete 
3da2c95cac2f: Pull complete 
af7913db289c: Pull complete 
77f552f93c12: Pull complete 
3ed53edb61ab: Pull complete 
67e1c6839f08: Pull complete 
abcdaaf08d0f: Pull complete 
Digest: sha256:bbe0e2b0a33ef5c3a983e490dcb3c1a42d623db1d5679e82f65cce3f32c8f254
Status: Downloaded newer image for docker.io/mysql:5.7.38
```
发现没有报错，拉取成功，问题解决。

## 成功解决


