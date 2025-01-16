---
title: 【云原生】Docker小工具：runlike与whaler（打印容器的启动命令与导出镜像的dockerfile）
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

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161451089.jpeg)



## 前言
>&emsp;&emsp;自上次发现了一款从docker镜像里提取dockerfile的工具，今天我们又发现了两个有趣的docker小工具，其中有一个也是提取dockerfile的。


两个有趣的docker小工具：runlike与whaler
-  runlike：通过容器打印出容器的启动命令
- whaler：通过镜像导出dockerfile

## runlike：通过容器打印出容器的启动命令
### 方法一：直接通过pip方式安装
>如果没有pip可以选择先装pip；参考：[【Linux】中安装pip（详细教程）](https://liucy.blog.csdn.net/article/details/126519415?spm=1001.2014.3001.5502)
```bash
pip install runlike
```

### 方法二：通过容器方式免安装使用
>使用设置别名的方式来做，如果长期使用，可设置为永久别名；参考：[Linux设置永久别名alias的方法](https://liucy.blog.csdn.net/article/details/123204224?spm=1001.2014.3001.5502)
```bash
alias runlike="docker run --rm -v /var/run/docker.sock:/var/run/docker.sock assaflavie/runlike"
```
这种方法需要拉取镜像，自动创建容器来加载这个命令，个人感觉第一种方法比较好一些；
### 用法
```bash
runlike 容器名/容器id
runlike -p 容器名/容器id
```
<font color=red>runlike</font>打印出来的是很多在一行；例如：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161451673.png)


<font color=red>runlike -p</font> 加-p参数会给你整理一行一行整理出来，看着比较简洁；例如：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161451035.png)


## whaler：通过镜像导出dockerfile
>&emsp;&emsp;平时可能会构建很多不同的镜像，比如维护一些基础Docker镜像、想查看一些公开仓库的Docker镜像是怎么构建的，或因为长时间不维护找不到当时构建镜像的Dockerfile，或者因为网络无法查看时，能从镜像导出Dockerfile就显得很重要，这里可以通过whaler来快速的导出. 这里我们依旧不安装，通过容器化的方式使用whaler命令设置别名，便于使用；其实他和我写过的另一个命令是一样的dfimage，都是一样的效果；
>[如何从docker镜像里提取dockerfile](https://liucy.blog.csdn.net/article/details/123203549?spm=1001.2014.3001.5502)


同样的设置永久的别名可参考：[Linux设置永久别名alias的方法](https://liucy.blog.csdn.net/article/details/123204224?spm=1001.2014.3001.5502)
```bash
alias whaler="docker run -t --rm -v /var/run/docker.sock:/var/run/docker.sock:ro pegleg/whaler"
```
设置完别名就可以来从镜像中导出dockerfile了；

### 用法

```bash
whaler 镜像名/镜像id
whaler -sV=1.36 镜像名/镜像id
```
直接用whaler会报错，需要添加一个参数；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161451165.png)

这样就可以出来了，也可以重定向到一个文件中>a.txt就可以；
当然这个比较少，因为这个镜像也就只有1M，所以，不会输出很多东西，感兴趣的朋友可以去自己写一个镜像，或者去官网拉一个大一点的镜像，然后再来测试，就会有很多很多的，特别详细；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161451998.png)


## 相关文章
>文章一：[【Linux】中安装pip（详细教程）](https://liucy.blog.csdn.net/article/details/126519415?spm=1001.2014.3001.5502)
文章二：[Linux设置永久别名alias的方法](https://liucy.blog.csdn.net/article/details/123204224?spm=1001.2014.3001.5502)
文章三：[如何从docker镜像里提取dockerfile](https://liucy.blog.csdn.net/article/details/123203549?spm=1001.2014.3001.5502)
