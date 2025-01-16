---
title: Docker搭建harbor私有镜像仓库（命令行模式）
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

##  一、安装docker
这是安装docker的步骤，可以参考；
[linux（centos）中部署docker（步骤超全，含带一些发展史和一些概念）](https://blog.csdn.net/liu_chen_yang/article/details/123842609)
启动docker和设置开机自启

```bash
#启动daemon-reload
systemctl daemon-reload

#启动docker
systemctl start docker

#设置开机自启
systemctl enabel docker
```
## 二、搭建harbor镜像仓库
>拉取Registry私有镜像仓库，在我们本地搭建一个内网的仓库，避免将一些私密项目暴露在公网，引发不必要的风险
### 1、下载Registry镜像

```bash
docker pull registry
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161459324.png)
### 2、运行Registry镜像并查看

```bash
docker run -d --name registry -p 5000:5000 -v /storage/registry:/tmp/registry registry
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161459908.png)

### 3、查看镜像仓库中的所有镜像
```bash
curl http://127.0.0.1:5000/v2/_catalog
```
下图返回的json数据代表有一个仓库，因为我做测试的时候上传了一个镜像。（busybox）
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161459771.png)

## 三、配置仓库可直接通过http方式访问
>docker默认是传输方式使用https协议，我们手头上没有https证书，所以此处不配置https证书，直接设置可信源，使我们内网可以通过http方式访问
### 1、修改vim /etc/docker/daemon.json,添加以下内容
没有daemon.json文件的话，新建一个就好。

```bash
    "insecure-registries" :[ 
         "your-server-ip:5000"
    ]
```
因为我这是已经有了哪个文件，而且里面还有别的，所以，到时候一定要看好格式；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161459734.png)

### 2、重新加载、重启docker、启动镜像

```bash
#重新加载
systemctl daemon-reload
#重启docker
systemctl restart docker
#启动registry容器
docker start registry
```
## 四、上传镜像至仓库
### 1、查看所有镜像

```bash
[root@localhost ~]# docker images
REPOSITORY                                  TAG                 IMAGE ID            CREATED             SIZE
mycentos                                    0.0.1               ce509ec398c1        2 days ago          231MB
```
### 2、给要上传的镜像tag打个标签(修改镜像名)

**<font color=teal>格式：</font>**

```bash
docker tag 镜像名:版本 you-ip:端口/镜像名:版本
```
**<font color=teal>实例：</font>**
```bash
docker tag mycentos:0.0.1 127.0.0.1:5000/mycentos:v1
```
### 3、推送镜像到harbor仓库
**<font color=teal>格式：</font>**
```bash
docker push 修改的镜像名
```
**<font color=teal>实例：</font>**

```bash
[root@localhost ~]# docker push 127.0.0.1:5000/mycentos:v1
The push refers to repository [127.0.0.1:5000/mycentos]
74ddd0ec08fa: Pushed 
v1: digest: sha256:d8217a445d79fb6325eb26a651d2a7a1ceb7f53c44d82cd7bb9e8fd2bdb384a9 size: 529
```
这样表示拉取成功。
### 4、验证是否推送成功

```bash
[root@localhost ~]# curl http://127.0.0.1:5000/v2/_catalog
{"repositories":["busybox","mycentos"]}
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161458234.png)
这里我们可以看到，多了一个mycentos，这样就是推送成功了，mycentos镜像就已经上传上来了。
## 五、本地拉取镜像
**<font color=teal>格式：</font>**
```bash
docker pull 上传时修改的镜像名
```
**<font color=teal>实例：</font>**
```bash
[root@localhost ~]# docker pull 127.0.0.1:5000/mycentos:v1
v1: Pulling from mycentos
a1d0c7532777: Already exists 
Digest: sha256:d8217a445d79fb6325eb26a651d2a7a1ceb7f53c44d82cd7bb9e8fd2bdb384a9
Status: Downloaded newer image for 127.0.0.1:5000/mycentos:v1
127.0.0.1:5000/mycentos:v1
```
**查看镜像，我们就可以看到已经拉取了。（刚刚的镜像已经删除这是重新从harbor镜像仓库拉的）**
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161458496.png)
 **要想改回原来的名字，我们可以给他打标签；**

**<font color=teal>格式：</font>**
```bash
docker tag 上传时修改的镜像名 现在想改回去的镜像名:版本
```
**<font color=teal>实例：</font>**
```bash
docker tag 127.0.0.1:5000/mycentos:v1 mycentos:v1
```
这样就改回来了。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161458538.png)

## 六、客户端（另一台服务器）拉取镜像
另一台客户机也需要docker是前提，注意要配置http方式访问，然后访问下载镜像。
### 1、1. 修改vim /etc/docker/daemon.json添加以下内容
your-server-ip——你服务端的ip

```bash
{ 
    "insecure-registries" :[
     	"your-server-ip:5000"
     ] 
}
```
### 2、重新加载、重启docker

```bash
#重新加载
systemctl daemon-reload
#重启docker
systemctl restart docker
```
### 3、拉取镜像
ip要服务端设置的ip，我那边后来有设置了一个同网段的ip，所以现在才可以访问到；
```bash
docker pull 192.168.2.22:5000/registry:v1
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161458194.png)
这里就可以看到我们已经拉取成功了。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161458763.gif)

## 七、总结
**相关文章：**
>①、[Docker——denied: requested access to the resource is denied问题以及解决方法](https://blog.csdn.net/liu_chen_yang/article/details/124665726?spm=1001.2014.3001.5502)
>②、[Linux中安装/部署docker-compose](https://blog.csdn.net/liu_chen_yang/article/details/124688952)
>③、[Linux中基于Docker搭建harbor私有镜像仓库（超级详细）](https://blog.csdn.net/liu_chen_yang/article/details/124623482)🔥🔥
>④、[Docker发布/上传镜像到dockerhub&&下载/拉取镜像&&删除dockerhub镜像](https://blog.csdn.net/liu_chen_yang/article/details/124670946?spm=1001.2014.3001.5502)
