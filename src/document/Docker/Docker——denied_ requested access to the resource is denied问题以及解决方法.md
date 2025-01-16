---
title: Docker——denied_ requested access to the resource is denied问题以及解决方法
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

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161456021.gif)

## 问题
使用<font color=red>docker push</font>推送镜像时，出现<font color=red>denied: requested access to the resource is denied</font>的报错。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161456378.png)

## 解析
&emsp;&emsp;原因和Git push代码一样，为了安全起见，在Docker Hub无法确定操作者的情况下，是无法完成push操作的。在Git中是通过配置文件SSH Keys来记住用户，那么在Docker Hub中也是通过配置文件。
&emsp;&emsp;通常在你第一次使用docker login命令登录你的Docker仓库时，会自动在你的机器上生成一个config.json的文件，目录具体位置不定。如果你是<font color=red>root用户</font>操作，一般在<font color=red>/root/.docker/config.json</font>目录。如果是<font color=red>普通用户</font>，那么可能在<font color=red>~/.docker/config.json</font>目录上。具体还是要看你<font color=red>登录的时候</font>显示的哪个目录。

>这里说一下，直接用-u参数指定登录名或者直接docker login在输入用户名密码登录都可以。

例如：↓
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161456215.png)
画红框的就是你config.json的绝对路径。


## 解决方法
&emsp;&emsp;原因知道了，解决方法其实很简单。只需要使用docker login登录即可。如果上面的目录中有config.json文件，则会更新，如果没有，则会生成一个新的。接着再使用docker push镜像就ok。下次push镜像的时候，也就不需要登录了。

登录:

```bash
[root@bogon]# docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: liuchenyang
Password: 
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```


## <font color=red>注意</font>
一定要注意自己上传的时候镜像名称对不对，还有路径对不对，我这边解决这个问题之后还是会报这个错，找了半天才找出来，还有一个问题就是给镜像打包的时候名字有问题，因为我创建了一个liblarby，上传镜像的时候就多了一层目录，所以因为名字不正确（可以查看最上面的第一张图片），才会出现相同的报错，最后，重新push一下，就ok了。（tagname是你的镜像的版本号）

```bash
docker push liuchenyang/mycentos:tagname
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161456163.png)
最后就可以看到我们的镜像存储库了。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161456033.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161456470.jpeg)

## 总结
**相关文章：**
>①、[Docker发布/上传镜像到dockerhub&&下载/拉取镜像&&删除dockerhub镜像](https://blog.csdn.net/liu_chen_yang/article/details/124670946)
>②、[Linux中安装/部署docker-compose](https://blog.csdn.net/liu_chen_yang/article/details/124688952)
>③、[Docker搭建harbor私有镜像仓库（命令行模式）](https://blog.csdn.net/liu_chen_yang/article/details/124705622)
>④、[Linux中基于Docker搭建harbor私有镜像仓库（超级详细）](https://blog.csdn.net/liu_chen_yang/article/details/124623482)🔥🔥
