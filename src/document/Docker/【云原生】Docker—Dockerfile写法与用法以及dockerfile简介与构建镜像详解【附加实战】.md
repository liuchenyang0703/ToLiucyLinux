---
title: 【云原生】Docker—Dockerfile写法与用法以及dockerfile简介与构建镜像详解【附加实战】
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

## 一、dockerfile简介
### &emsp;&emsp;什么是dockerfile？
>&emsp;&emsp;Dockerfile 是一个用来构建镜像的文本文件，文本内容包含了一条条构建镜像所需的指令(Instruction)和操作命令;每一条指令构建一层镜像，因此每一条指令的内容，就是描述该层镜像应当如何构建（也就是你要执行的操作命令）。
### &emsp;&emsp;dockerfile是什么？
>- &emsp;dockerfile是纯文本文件；
>- &emsp;dockerfile是用来构建镜像的；
>- &emsp;dockerfile 用于指示 docker image build 命令自动构建Image的源代码；

**<font color=teal>dockerfile构建镜像的的格式：</font>**

```bash
docker build -t 要打的镜像名:版本号 Dockerfile路径
```
**<font color=teal>dockerfile构建镜像的的实例：</font>**

```bash
docker build -t work:v1 .
```

### &emsp;&emsp;为什么要用dockerfile？
>&emsp;&emsp;❓在dockerhub中官方提供很多镜像已经能满足我们99％的服务了,为什么还需要自定义镜像？

>&emsp;&emsp;🤔️解析：是，官方的镜像很多，同时也可以满足我们99％的服务；但是，如果有的公司要做自己的产品，那么，官网的镜像肯定是没有的，这时候就需要用到自定义镜像，而自定义镜像就是dockerfile构建成的；

>&emsp;&emsp;🥳我们可以用dockerfile自定义写需要的操作，来用dockerfile的指令来实现，最终采用<font color=red>docker build</font>来构建镜像，构建完镜像可以采用<font color=red>docker save </font>命令打成tar包，以便于日后在其他服务器上使用，也可以采用<font color=red>docker push</font>提交到私有镜像仓库或dockerhub中。


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161449838.png)
如上图所示，Dockerfile是独立于本地docker实例的一个文本文件，用于自动化地构建具有特定功能的docker镜像。

>Dockerfile镜像构建三部曲：
（1）构建Dockerfile文件；
（2）采用<font color=red>docker build</font>命令构建镜像；
（3）采用<font color=red>docker run</font>命令依据镜像运行容器实例。

###  &emsp;&emsp;Dockerfile、Docker镜像和Docker容器的关系
从应用软件开发角度来看，它们分别表示软件开发的三个阶段：

- （1）Dockerfile是软件开发的原材料；
- （2）Docker镜像是软件的交付品；
- （3）Docker容器是Docker交付镜像的实例化，代表软件的实际运行过程。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161449732.png)
> 总结：Dockerfile面向开发，Docker镜像为交付标准，Docker容器与部署、运维相关，三则相辅相成缺一不可，他们是Docker的三大基石。Docker在实际运行中，Dockerfile、Docker镜像、Docker容器三者的运作内容如下所示：

- 1、Dockerfile定义了进程需要的一切内容，包括：代码执行、文件/环境变量、依赖包、运行环境、操作系统发行版本、服务进程、内核进程等等，很多与操作系统底层相关的内容。
- 2、通过docker build指令会生成一个Docker镜像，它是为用户提供各种服务的基础；
- 3、Docker容器则是一个实例化的服务进程。

## 二、DockerFile需要注意的编写规范
>1\. # 代表注释<br>
2.指令必须要大写，后面最少需要带一个参数，最多无限制;<br>
3.执行dockerfile的时候，指令是按照从上到下的顺序执行的；<br>


## 三、Docekrfile指令解析
>**<font color=red>注意：指令全部都必须为大写，后面跟的是你要执行的操作命令</font>**

| 指令 | 功能简介 |
|--|--|
|FROM|指定构建新image是使用的基础image，通常必须是Dockerfile的第一个有效指令；定义一个基础镜像。
|LABEL|附加到image之上的元数据，键值格式；定义一些元数据。
|ENV|以键值格式设定环境变量，可被其后的指令所调用，且基于新生成的image运行的Container中也会存在这些变量。
|RUN|以FROM中定义的image为基础环境运行指令命令，生成结果将作为新image的一个镜像层，并可由后续指令所使用。RUN后跟要执行的命令。
|CMD|基于dockerfile生成的image运行的container时，CMD能够指定容器中默认运行的程序，因而其只应该定义一次。
|ENTRYPOINT|类似于CMD指令的功能，但不能被命令行指定要运行的应用程序覆盖，且与CMD共存时，CMD的内容将作为该指令中定义的程序的参数。
|WORKDIR|相当于cd切换目录的命令，如果切换的那个地方没有哪个目录，则会自动创建一个目录。
|COPY|相当于cp命令，复制主机上或者前一阶段构建结果中（需要使用--from选项）文件或目录生成新的镜像。
|ADD|与COPY指令的功能相似，但ADD传输压缩包的时候，是可以解压的。
|VOLUME|指定基于新生成的Image运行Container时期望作为volume使用的目录。
|EXPOSE|指定基于新生成的lmage运行Container时期望 暴露的端口，但实际暴露与否取决于"docker run”命令的选项，支持TCP和UDP协议。
|USER|为Dockerfile中该指令后面的RUN、CMD和ENTRYPOING指令中要运行的应用程序指定运行者身份UID，以及一个可选的GID。
|ARG|定义专用于build过程中的变量，但仅对该指标之后的调用生效，其值可由命令行选项"--build-arg"进行传递。
|ONBUILD|触发器，生效于由该Dockerfile 构建出的新l/mage被用于另一个Dockerfile中的FROM指令作为基础镜像时。
|STOPSIGNAL|用于通知Container终止的系统调用信号。
|HEALTHCHECK|定义检测容器应用的健康状态的具体方法。
|SHELL|为容器定义运行时使用的默认shel程序，Linux系统默认使用 [/bin/sh”，"-c"], Windows默认使用 [’cmd', "/S',"/C']。

## 四、常用的Dockerfile指令详解、格式与用法

**<font color=red>（必须）是写dockerfile必须有的，没有加的是（可选）的。</font>**

### 4.1 FROM（必须）
>指定一个基础镜像，必须为第一个命令。



**<font color=teal>格式</font>**
```bash
FROM 基础镜像
```

**<font color=teal>举例</font>**
>一个nvidia、cuda10.1的centos7基础镜像
```bash
FROM nvidia/cuda:10.1-cudnn7-devel-centos7
```


### 4.2 MAINTAINER
>维护者信息，可以写邮箱，编辑人等等。

**<font color=teal>格式</font>**
```bash
MAINTAINER 邮箱/名字
```

**<font color=teal>举例</font>**
>展示邮箱和名字

```bash
MAINTAINER liucy
MAINTAINER 121212@qq.com
MAINTAINER 121212@163.com
```
### 4.3 USER
>指定运行容器时的用户名或 UID，后续的 RUN 也会使用指定用户。使用USER指定用户时，可以使用用户名、UID或GID，或是两者的组合。当服务不需要管理员权限时，可以通过该命令指定运行用户。并且可以在之前创建所需要的用户
>
**<font color=teal>格式</font>**
```bash
USER 用户名
&&
USER user:group　
&&　
USER uid　　
&&
USER uid:gid　　
&&
USER user:gid　　
&&
USER uid:group
```

**<font color=teal>举例</font>**
>指定root用户
```bash
USER root
```
### 4.4 ENV（必须）
>设置环境变量
>
**<font color=teal>格式</font>**
```bash
ENV 环境变量路径
```

**<font color=teal>举例</font>**
>设置jdk1.8的环境变量
```bash
ENV JAVA_HOME=/usr/local/jdk1.8.0_333/
ENV export JRE_HOME=$JAVA_HOME/jre
ENV export CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib
ENV PATH=$JAVA_HOME/bin:$PATH
```

### 4.5 VOLUME
>用于指定持久化目录（指定此目录可以被挂载出去）

**<font color=teal>格式</font>**
```bash
VOLUME 挂载路径
```

**<font color=teal>举例</font>**
>挂载到/data目录
```bash
VOLUME ["/data"]
```

### 4.6 EXPOSE
>设置端口，EXPOSE指令是声明运行时容器提供服务端口，这只是一个声明，在运行时并不会因为这个声明应该就会开启这个端口的服务。<br>
在Dockerfile中写入这样的声明有两个好处：
是帮助镜像使用者理解这个镜像服务的守护端口，以方便配置映射；
在运行是使随机端口映射时，也就是docker run -P(大写)时，会自动随机映射EXPOSE端口。

**<font color=teal>格式</font>**
```bash
EXPOSE 端口号
```

**<font color=teal>举例</font>**
>设置一个8080端口
```bash
EXPOSE 8080
```

### 4.7 COPY
>复制文件，相当于linux命令中的cp命令；
>功能类似ADD，但是是不会自动解压文件，也不能访问网络资源

**<font color=teal>格式</font>**
```bash
COPY 源文件及路径 目标路径
```

**<font color=teal>举例</font>**
>复制一个mysql到/usr/local/下
```bash
COPY /root/mysql /usr/local/
```

### 4.8 ADD
>将本地文件添加到容器中，tar类型文件会自动解压(网络压缩资源不会被解压)，可以访问网络资源，类似wget。
>
**<font color=teal>格式</font>**
```bash
ADD 源文件及路径 目标路径
```

**<font color=teal>举例</font>**
>移动一个mysql-2-2.tar
```bash
ADD /usr/local/mysql-2-2.tar /root/
```

### 4.9 WORKDIR
>切换目录，相当于linux命令中的cd命令，切换到这个目录，进入容器时就是这个目录，所以，workdir就属于启动默认的目录。
>
**<font color=teal>格式</font>**
```bash
WORKDIR 目录名
```

**<font color=teal>举例</font>**
>设置启动就在/data/目录
```bash
WORKDIR /data/
```

### 4.10 RUN（必须）
>构建镜像时执行的命令，执行的命令就是你指定的要他干什么，使用linux命令就可以。
>
**<font color=teal>格式</font>**
```bash
RUN 要执行的命令
```

**<font color=teal>举例</font>**
>打镜像时下载一个netstat命令
```bash
RUN yum -y install net-tools
```

### 4.11 CMD
>构建镜像后调用，也就是在容器启动时才进行调用。写一次dockerfile只能出现一次CMD，而出现CMD的地方，就属于结尾，如果下面有RUN指令，则都不执行。

**<font color=teal>格式</font>**
```bash
CMD 要执行的命令
```

**<font color=teal>举例</font>**
>执行删除dockerfile（打完镜像，要删除dockerfile）
```bash
CMD rm -rf /data/dockerfile
```

## 五、docker build构建镜像

**<font color=teal>dockerfile构建镜像的的格式：</font>**

```bash
docker build -t 要打的镜像名:版本号 Dockerfile路径
```
**<font color=teal>dockerfile构建镜像的的实例：</font>**

```bash
docker build -t work:v1 .
```

## 六、【实战】docker自定义镜像

说明：


>&emsp;&emsp;此处只是测试使用，并不能用到生产中，（生产中要根据自己的情况来写），可以构建成镜像，也可以创建容器，可以进入容器查看这些文件，但是web页面访问不到，因为没有加入jar包之类的，可以自行放入一个jar包，端口设置3000，然后启动jar包就可以了去访问web页面了。

前言：
&emsp;&emsp;**<font color=red>有一点特别重要，构建镜像的时候要看好你的文件是不是这个目录，要不然打到一半会报错，说找不到文件，切记要记得放文件，在放文件的目录执行。</font>**

### 1、编写Dockerfile
```bash
#创建Dockerfile文本
vim Dockerfile
```

```bash
#设置基础镜像
FROM nvidia/cuda:10.1-cudnn7-devel-centos7
#维护者信息
MAINTAINER liucy
MAINTAINER 121212@qq.com
MAINTAINER 121212@163.com
#指定运行时的用户以及镜像的实际用户
USER root
#下载netstat命令
RUN yum -y install net-tools
#设置jdk1.8的环境
ENV JAVA_HOME=/usr/local/jdk1.8.0_333/
ENV export JRE_HOME=$JAVA_HOME/jre
ENV export CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib
ENV PATH=$JAVA_HOME/bin:$PATH
#开放一个3000端口
EXPOSE 3000
#移动并解压Grafana.tar安装包
ADD /root/Grafana.tar /home/
#复制当前目录下的所有到/data/cs/里
COPY ./ /data/home/
#设置python3.6.8环境
RUN cd /data/Python-3.6.8/ && ./configure --prefix=/root/python36 && make && make install && ln -s /root/python36/bin/python3.6 /usr/bin/python3 && ln -s /root/python36/bin/pip3 /usr/bin/pip3
#切换到/data/目录
WORKDIR /data/
#最后执行删除Dockerfile
CMD rm -rf Dockerfile
```

### 2、构建镜像

```bash
docker build -t dockerfile:v1 .
```
等待构建完成。
### 3、查看镜像

```bash
[root@cs ~]# docker images
REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE
dockerfile                 v1                 15c89s63e742      2 months ago           8.5GB
```

## 七、总结
## &emsp;&emsp;相关文章

>[【云原生】Docker—Dockerfile写法与用法以及dockerfile简介与构建镜像详解](https://blog.csdn.net/liu_chen_yang/article/details/125259992)
\--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
>[Linux中基于Docker搭建harbor私有镜像仓库（超级详细）](https://blog.csdn.net/liu_chen_yang/article/details/124623482)
>\--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
>[Docker搭建harbor私有镜像仓库（命令行模式）](https://blog.csdn.net/liu_chen_yang/article/details/124705622)
>\--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
[Docker发布/上传镜像到dockerhub&&下载/拉取镜像&&删除dockerhub镜像](https://blog.csdn.net/liu_chen_yang/article/details/124670946)
>\--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
[linux（centos）中部署docker（步骤超全，含带一些发展史和一些概念）](https://blog.csdn.net/liu_chen_yang/article/details/123842609)
>\--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
[如何从docker镜像里提取dockerfile](https://blog.csdn.net/liu_chen_yang/article/details/123203549)
>\--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

## &emsp;&emsp;相关专栏
>[《docker从入门到精通》](https://blog.csdn.net/liu_chen_yang/category_11658917.html)[《Linux从入门到精通》](https://blog.csdn.net/liu_chen_yang/category_10887074.html)可以关注专栏奥，会持续更新的。
