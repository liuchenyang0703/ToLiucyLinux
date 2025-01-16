---
title: 【云原生】Docker之创建并进入mysql容器
icon: circle-info
order: 3
category:
  - Linux
  - 数据库
  - Docker
tag:
  - Linux
  - 数据库
  - Docker
pageview: false
date: 2023-11-19 23:54:31
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1d08edbca8894c2ebb94586f53c2b100.png)





## 前言
>&emsp;&emsp;本文主要讲解的是创建mysql的容器，大家都知道，在外面进入mysql都很容易，“mysql -u用户名 -p密码”就可以，但是是容器的mysql就没那么好进入了，首先还要拉取镜像，创建容器，在进入容器，然后才可以进入mysql；其实也没有那么难，而且比在宿主机装一个mysql简便了很多，也省去了很多时间，比如，宿主机上mysql还要编译，容器就不用，但是最难的一点就是如何去创建容器呢，他和普通的创建容器是不一样的，所以，今天给大家讲讲创建mysql容易，并进入、创建库和表；

## 拉取镜像

如需要哪个mysql版本可以在后面直接写，比如我需要mysql:5.7.38的，就直接拉取5.7.38的镜像；如果需要默认的mysql，那么直接拉取mysql就好，默认的应该是最新的版本；
```bash
[root@localhost ~]# docker pull mysql:5.7.38
5.7.38: Pulling from library/mysql
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
Status: Downloaded newer image for mysql:5.7.38
docker.io/library/mysql:5.7.38
```

拉取完镜像查看一下：

```bash
docker images
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c371d3805c04428e90cdeccd92266277.png)

接下来就是这一环节中最重要的一点了，创建容器；

## 创建容器
创建mysql容器，在后台启动mysql容器
- <font color=red>-it</font>   &emsp;&emsp;&emsp;&emsp;以交互形式创建容器；
- <font color=red>--name</font>&emsp;&emsp;指定了容器的名称，方便之后进入容器的命令行；
- <font color=red>-p</font> &emsp;&emsp;&emsp;&emsp;指定映射端口，如果遇到端口被占用，可以使用其他端口比如3333:3306；就可以；
- <font color=red>-e MYSQL_ROOT_PASSWORD=123123</font>&emsp;&emsp;&emsp;直接就指定了mysql的root密码；
- <font color=red>-d</font>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;表示在后台运行；
- <font color=red>mysql:3.7.38</font>&emsp;&emsp;&emsp;&emsp;代表的你用的哪个镜像
- 如果需要做数据映射，可以加个-v参数，<font color=red>-v 宿主机路径，容器内路径；</font>

>- 容器内 mysql数据文件目录: `/var/lib/mysql/`
>- 容器内 mysql配置文件目录: `/etc/mysql/`
---
需要哪个可自行选择，建议使用第三个：
&emsp;&emsp;因为第三种数据和配置文件都可以做到同步，要拿数据的话，可以直接在宿主机映射的目录拿就可以了；
```bash
docker run -it --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123123 -d mysql:5.7.38

#mysql默认版本的创建；就是最后不要:5.7.38了，其他都一样；
docker run -it --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123123 -d mysql

#加数据映射的容器创建；设置开机自启
docker run -itd --name mysql --restart=always --privileged -p 3306:3306 -v /var/lib/mysql/my.cnf:/etc/mysql/my.cnf -v /var/lib/mysql/data:/var/lib/mysql/data/ -v /etc/localtime/:/etc/localtime/ -e MYSQL_ROOT_PASSWORD=123123 mysql:5.7.38
```

这样容器就创建完成了；创建完查看一下容器；

```bash
docker ps -a
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/bd0bc9983b844a0da605a31765bf66fe.png)

## 进入mysql容器

```bash
docker exec -it mysql bash
```

### 登录mysql

```bash
mysql -uroot -p123123
```

### 创建数据库

```bash
#首先查看一下数据库
show databases;

#创建数据库
create database cs;

#再次查看是否创建成功；
show databases;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4c98cbc0c278484588bd79e14992f222.png)

### 创建表

```bash
#进入刚刚创建的库
use cs;

#查看表，里面是空的目前
show tables;

#创建表
create table biaoone(id int,name varchar(20),age int);

#查看表,现在是有一个的
show tables

#查看表机构
desc biaoone;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b0b4eea0bd244372a3321e7a06d7f534.png)

# 相关文章
>[Centos7安装Mysql5.7（超详细版）](https://liucy.blog.csdn.net/article/details/124930789)
>
>---
>[【云原生】Docker之创建并进入mysql容器](https://liucy.blog.csdn.net/article/details/126288434)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/22d86cdcfc94420a84febfc6a5b7a22a.jpeg)

