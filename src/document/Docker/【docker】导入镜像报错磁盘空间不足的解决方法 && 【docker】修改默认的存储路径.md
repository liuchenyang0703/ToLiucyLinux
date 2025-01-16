---
title: 【docker】导入镜像报错磁盘空间不足的解决方法 && 【docker】修改默认的存储路径
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



## 前言

安装docker时，默认的安装位置是/var/lib/docker。
可以用docker info 查看 镜像存放的目录

## 问题

```bash
docker load -i nginx.tar

#报错
no space left device
```

报错是因为该目录没有磁盘空间

## 解决方法docker修改默认的存储路径
先看看哪块有空间

```bash
df -Th
```
可以看出/data/目录下是有空间的，我们可以将docker默认存储路径改到/data/下；
当然还有一个很简便的，删除docker默认目录下的多余的文件或多余的容器、镜像来释放空间。
## 二进制安装的docker修改默认的存储路径
### 第一种，docker没有任何服务存在

这种就很好解决；
1、配置 /usr/lib/systemd/system/docker.service
```bash
vim /usr/lib/systemd/system/docker.service
```

找到ExecStart这行，将原来的注释掉，更改成如下的形式

```bash
[Service]
ExecStart=/usr/bin/dockerd  --graph=/data/docker
```
2、保存退出，重启docker

```bash
systemctl daemon-reload
systemctl restart docker
systemctl enable docker

#查看是否生效
docker info
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161517504.png)

```bash
#docker存储目录已经变了，然后再次导入镜像
docker load -i nginx.tar
#就不会报错了
```

### 第二种，docker里还有服务和数据存在

1、停止docker服务
```bash
systemctl stop docker.service
```

2、在挂载的磁盘目录下创建存放镜像目录

```bash
mkdir -p /data/docker
```
3、迁移镜像文件

```bash
mv /var/lib/docker /data/docker
```
4、配置 /usr/lib/systemd/system/docker.service

```bash
vim /usr/lib/systemd/system/docker.service
```

找到ExecStart这行，将原来的注释掉，更改成如下的形式

```bash
[Service]
ExecStart=/usr/bin/dockerd  --graph=/data/docker
```
5、保存退出，重启docker

```bash
systemctl daemon-reload
systemctl restart docker
systemctl enable docker
```
6、启动成功后，再确认之前的镜像和容器是否还在

```bash
docker images

docker ps -a
```

### 注意
由于更换了docker 目录，以前下载的镜像需要转移到新目录下，建议直接删除原来的镜像，重新下载。所以这个建议在刚开始下载docker的时候就进行修改,避免后续的问题



## yum安装的docker修改默认的存储路径

有两处地方可以修改，第一个/usr/lib/systemd/system/docker.service，第二个/etc/docker/daemon.json

### 第一种方法：修改/usr/lib/systemd/system/docker.service - --graph方式

```bash
vim /usr/lib/systemd/system/docker.service

#找到ExecStart，可以在合适的位置添加--graph=要放的路径
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161517961.png)

修改完成之后重新加载docker，并重启docker

```bash
systemctl daemon-reload
systemctl restart docker
```
然后docker info查看路径；

```bash
docker info

#找Docker Root Dir
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161517109.png)

看到修改到了自己想修改的目录，则修改成功；


### 第二种方法：修改/etc/docker/daemon.json - graph方式

```bash
#进入/etc/docker/daemon.json
vim /etc/docker/daemon.json

#可以看到里面是空的，我们自己来添加就好了，graph后面是你的路径

{
"graph": "/newpath/docker"
}
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161517428.png)

修改完成之后重新加载docker，并重启docker

```bash
systemctl daemon-reload
systemctl restart docker
```
然后docker info查看路径；

```bash
docker info

#找Docker Root Dir
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161517460.png)

看到修改到了自己想修改的目录，则修改成功；

### 第三种方法：同样修改/usr/lib/systemd/system/docker.service - --data-root方式（支持最新版docker）

```bash
vim /usr/lib/systemd/system/docker.service

#找到ExecStart，可以在合适的位置添加--data-root=要放的路径
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161517887.png)


修改完成之后重新加载docker，并重启docker

```bash
systemctl daemon-reload
systemctl restart docker
```
然后docker info查看路径；

```bash
docker info

#找Docker Root Dir
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161517122.png)

看到修改到了自己想修改的目录，则修改成功；
### 第四种方法：同样修改/etc/docker/daemon.json - data-root方式（支持最新版docker）

```bash
#进入/etc/docker/daemon.json
vim /etc/docker/daemon.json

#如果里面是空的加一个大括号和data-root就好了，graph后面是你要修改到的目标路径，如下；
#{
#"data-root": "/data/docker"
#}

#如果有其他配置，那么就按照下面的格式配置，切记添加的时候要给上面一行的结尾加一个逗号,否则会报错；graph后面是你要修改到的目标路径
{
"insecure-registries": ["0.0.0.0/0"],
"registry-mirrors": ["https://zbkz1bx2.mirror.aliyuncs.com"],
"data-root": "/data/docker"
}

```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161516690.png)


修改完成之后重新加载docker，并重启docker

```bash
systemctl daemon-reload
systemctl restart docker
```
然后docker info查看路径；

```bash
docker info

#找Docker Root Dir
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161516568.png)


看到修改到了自己想修改的目录，则修改成功；

### 注意
由于更换了docker 目录，以前下载的镜像需要转移到新目录下，建议直接删除原来的镜像，重新下载。所以这个建议在刚开始下载docker的时候就进行修改,避免后续的问题

## * 如果里面有需要的数据将/var/lib/docker移动到目录路径即可。