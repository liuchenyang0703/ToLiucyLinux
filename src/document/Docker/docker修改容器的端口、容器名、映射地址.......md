---
title: docker修改容器的端口、容器名、映射地址......
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

## 1、docker修改容器名

```bash
#先查看原来的容器名
docker ps -a #查看所有的容器
#找到你要修改的容器名
docker rename 原容器名 要修改的容器名
```

## 2、docker修改修改端口、映射地址......
>下面是运行中的docker环境，因为实际环境，我们需要修改docker映射端口，现在是8088端口，我们要修改他改成8099端口。
>
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161442631.png)
### 2.1、先找容器的ID
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161442157.png)
我们可以看到b0cfb0daff30，先记住他，然后停止容器；

### 2.2、停止docker容器

```bash
docker stop abc（容器名）
```
### 2.3、停止docker

```bash
systemctl stop docker
```
### 2.4、查找配置文件
可以去修改该容器的配置有两个文件，**<font color=red>config.v2.json</font>/<font color=blue>hostconfig.json</font>**

最开始让记得那个容器id我们先去找他的文件目录，我们可以根据查找hostconfig.json配置文件，然后再看id，这里我们找到了，第一个就是，进入目录
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161442499.png)
进入到目录我们可以看到这两个文件
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161442312.png)

### 2.5、备份原有文件，如果出现问题后可以还原回去

```bash
cp -ar config.v2.json  config.v2.json-bak

cp -ar hostconfig.json hostconfig.json-bak
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161442430.png)
备份完之后，就是修改配置文件了

### 2.6、修改配置文件（hostconfig.json）
```bash
vim hostconfig.json
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161442191.png)
>我们找到8888端口，现在将他们都修改成8899，修改完之后保存退出；

想要修改网络模式，映射地址或者映射端口都可以改了，要修改容器的什么文件，都可以在这里找到，当然下面的也要修改；
### 2.7、修改配置文件（config.v2.json）

```bash
vim config.v2.json
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161442352.png)
>也是同样的将8888修改成8899，修改完之后保存退出；

### 2.8、启动docker服务

```bash
systemctl start docker
```

### 2.9、查看端口是否修改
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161444545.png)
这里看到端口已经被修改，我们就可以启动容器了

### 2.10、启动docker容器

```bash
docker start abc(容器名)
```


## 注意！！！
docker修改完映射端口后，docker的ip可能会发生变化。

