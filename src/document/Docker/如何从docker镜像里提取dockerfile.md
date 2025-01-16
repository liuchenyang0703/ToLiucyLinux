---
title: 如何从docker镜像里提取dockerfile
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

hello，大家好，今天在玩docker的时候发现了很好用的东西，他就是用来提取镜像中的dockerfile的。这个是前者留下来的镜像，但是dockerfile被删除了，现在想知道dockerfile里面是如何写的，然后去查了查就有了新的发现——通过镜像来提取dockerfile，接下来我就把方法分享给大家。


## 从镜像中提取dockerfile的两种方法

### 1、history参数

我们可以直接用docker自带的参数来查看镜像的dockerfile，但有一点就是看的不完全，只能看到前面的一小部分；
例如：

```bash
#docker history 镜像名称:标签
docker history nginx:latest
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161442079.png)
虽然docker history命令可以看到所有历史层级的操作，但是还是需要手动去写Dockerfile，看的不是那么全，所以我们还有一个能看到非常详细的工具👇↓👇

### 2、dfimage

首先他不是一个命令，他是一个工具
dfimage是一个alpine的镜像，启动的时候，通过将docker.sock映射到容器内部来运行，通常将这个操作做成别名，让他变成一个工具（做完别名不能换新的bash，否则该别名就会消失，如果不想消失，可以做一个永久的别名，这样不管在任何地方都可以用了）

```bash
alias dfimage="docker run -v /var/run/docker.sock:/var/run/docker.sock --rm alpine/dfimage"  
 
dfimage -sV=1.36 nginx:latest 
```
我们拿nginx镜像试验下
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161442650.png)
先pull一个nginx镜像，我这里之前有，就直接用了，接着通过上面提到的命令，别名一个dfimage命令
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161442727.png)
做好别名之后，通过dfimage去生成nginx的Dockerfile，其实就是启动一个容器工具，执行完之后即删除该容器，镜像保留
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161442264.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161442426.png)
如果有报错，不能执行，估计就是缺少-sV=1.36，具体这个报错呢，暂时还没有研究，但是加上-sV=1.36就可以。

```bash
#dfimage -sV=1.36 镜像名称:标签
dfimage -sV=1.36 nginx:latest
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161442532.png)
即可看到完整的dockerfile，这个工具查看的非常的详细



### 补充：如何设置永久的别名

链接：[Linux设置永久别名alias的方法](https://blog.csdn.net/liu_chen_yang/article/details/123204224?spm=1001.2014.3001.5502)
可以参考我发布的另一篇专门设置永久别名的文章，谢谢！

