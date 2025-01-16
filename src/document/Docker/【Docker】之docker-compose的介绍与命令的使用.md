---
title: 【Docker】之docker-compose的介绍与命令的使用
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

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/profile/7yu26jk3lfqxg)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## docker-compose简介
### docker-compose基础概念
>docker-compose项目是docker官方的开源项目，负责实现对docker容器集群的快速编排。
>&ensp;
>Compose是用于定义和运行多容器Docker应用程序的工具。通过docker-compose，可以使用YAML文件来配置应用程序的服务。然后，使用一条命令，就可以从配置中创建并启动所有服务。如要了解更多有关docker-compose的功能，请参阅：[功能列表](https://docs.docker.com/compose/#features)。
>
>&ensp;
>
>docker-compose将所管理的容器分为三层，分别是工程（project），服务（service）以及容器（container）。
>- docker-compose运行目录下的所有文件（docker-compose.yml文件、extends文件或环境变量等）组成一个工程，如无特殊指定，工程名即为当前目录名。
>- 一个工程（project）当中，可以包含多个服务（service），每个服务中定义了容器（container）运行的镜像、参数、依赖。
>- 一个服务中可以包括多个容器实例，docker-compose并没有解决负载均衡的问题。因此需要借助其他工具实现服务发现及负载均衡，比如consul。
>&ensp;
>docker-compose的工程配置文件默认为docker-compose.yml。可以通过环境变量COMPOSE_FILE -f 参数自定义配置文件，其自定义多个有依赖关系的服务及每个人服务运行的容器。
### 为什么要用docker-compose
>使用一个Dockerfile模板文件，可以让用户很方便的定义一个单独应用容器。在工作中，经常会碰到需要多个容器相互配合来完成某项任务的情况，例如要实现一个web项目，除了web服务容器本身，往往还需要再加上后端的数据库服务容器，甚至还包括负载均衡容器等。
compose允许用户通过一个单独docker-compose.yml模板文件（YAML格式）来定义一组相关联的应用容器为一个项目（project）;
>&ensp;
>docker-compose项目由pypthon编写，调用docker服务提供的API来对容器进行管理，因此， 只要所操作的平台支持docker-API，就可以在其上利用conpose来进行编排管理。
>&ensp;
>当在宿主机启动较多的容器时，如果都是手动操作会觉得比较麻烦，而且容易出错，这个时候推荐使用 docker 单机编排工具 docker-compose,docker-compose是docker容器的一种编排服务，docker-compose是一个管理多个容器的工具，比如可以解决容器之间的依赖关系，就像启动一个web服务，就必须得先把数据库服务先启动一样，docker-compose完全可以替代docker run 一键启动容器。
>&ensp;
>简单来说：就是来管理多个容器的，定义启动顺序的，合理编排，方便管理。

github地址：[https://github.com/docker/compose](https://github.com/docker/compose)

## YAML文件格式编写及编写注意事项
<font size=5>**1、YAML文件格式**</font>

- YAML是一种标记性语言，它可以很直观的展示数据序列化格式，可读性高。
- 类似于json数据描述语言，但是语法要比json简单很多。
- YAML数据结构通过缩进来表示，连续的项目通过减号来表示，键值对用冒号分隔，数组用中括号[ ] 括起来，bash用花括号{ } 括起来。

<font size=4>**2、YAML格式的注意事项**</font>
- 不支持制表符tab键缩进，只能使用空格缩进
- 通常开头缩进2个空格
- 字符后缩进1个空格，如冒号【：】、逗号【，】、横杠【-】
- 用#号表示注释
- 如果包含特殊字符用单引号【’ '】引起来作为普通字符，如果用双引号【“ ”】表示特殊字符本身的意思，
- 布尔值必须用【“ ”】括起来
- YAML区分大小写

<font size=4>**注意：**</font>
>请严格按照YAML文件格式来写，如格式写错docker-compose启动服务时一般会报：<font color=red>ERROR: In file './nginx.yaml', service 'hostname' must be a mapping not a st</font> 这个错；解决方式就是看自己的YAML文件格式写的是否正确。
更多YAML格式及实例可参考：[yaml文件格式详解及实例](https://liucy.blog.csdn.net/article/details/129041706)

docker-compose部署文档可参考： [Linux中安装/部署docker-compose](https://liucy.blog.csdn.net/article/details/124688952)

## docker-compose的安装
### 在线安装
可参考： [Linux中安装/部署docker-compose](https://liucy.blog.csdn.net/article/details/124688952) 文档，两种在线部署方式。
其实在线安装中的第一种可作为离线安装，只要吧docker-compose下载下来，解压直接软连接就行，和接下来说的离线安装部署方式一样。
### 离线安装
在这里我就说一种docker-compose离线部署方式；

1. 下载对应的docker-compose版本

在[Github](https://github.com/docker/compose/releases)中下载对应的版本，这里我们下载1.29.2版本的吧【docker-compose-Linux-x86_64】。
如果找不到下载链接在哪，可找一台有外网的服务器下载：curl -L  "`https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
下载完成之后传到本地在上传到内网服务器中即可；

> 或者可以直接下载：[docker-compose1.29.2离线包](https://download.csdn.net/download/liu_chen_yang/89428645)

2. 将下载的服务器放到/usr/local/bin/下

```bash
mv docker-compose /usr/local/bin/
```

3. 给docker-compose添加执行权限

```bash
chmod  +x /usr/local/bin/docker-compose
```

4. 创建软连接

```bash
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

5. 验证安装是否完成
执行如下命令，如果可以正常显示版本号，则表示已经完成

```bash
docker-compose --version
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161503192.png)

安装完成。

## docker-compose常用的命令详解

运行这些命令需要结合docker-compose一起使用。

且必须要在含有docker-compose.yml文件的目录中才可以使用，不然报错。

| 命令 | 描述/详解 |
|--|--|
| build | 重新构建服务 |
| ps | 列出容器 |
|images|列出所有镜像|
| up | 创建和启动容器 |
| exec |  在容器里面执行命令|
| scale | 指定一个服务容器启动数量 |
| top | 显示正在运行的容器进程 |
| logs | 查看服务容器的输出/也就是日志 |
| down | 删除容器、网络、数据卷和镜像 |
| stop/start/restart	 | 停止/启动/重启服务 |
|pause|暂停一个服务|
|unpause|恢复暂停的一个服务
|pull|拉取服务依赖的镜像
|push|推送服务依赖的镜像

## docker-compose常用的字段详解
| 字段 | 描述/详解 |
|--|--|
| build | 指定Dockerfile文件名（要指定的Dockerfile文件需要在build标签的子级标签中用dockefile标签指定） |
| dockerfile | 构建镜像上下文路径 |
| context |可以是dockerfile路径，或者时执行git仓库的url地址  |
| images | 指定镜像 |
| command | 执行命令，会覆盖容器启动后默认执行的命令（会覆盖dockefile中的CMD指令） |
| container_name | 指定容器名称，由于容器名称是唯一的，如果指定自定义名称，则无法scale指定容器数量。 |
| deploy | 指定部署和运行服务相关配置，只能在swarm模式使用 |
| environment |  添加环境变量|
| networks |  加入网络，引用顶级networks下条目|
| network_mode | 设置容器的网络模式 |
| ports | 暴露容器端口，与-p相同，但是端口不能低于60 |
| volumes |挂载一个宿主机目录或命令卷到容器，命令卷要在顶级volumes定义卷名称  |
| volumes_from | 从另一个服务或容器挂载卷，可选参数：ro和rw（仅版本‘2’支持） |
| hostname | 在容器内设置内核参数 |
| links |  连接诶到另一个容器，- 服务名称[ : ]|
| privileged | 用来给容器root权限，注意是不安全的，true |
|restart  | 重启策略，定义是否重启容器1、no，默认策略，在容器退出时不重启容器2、on-failure，在容器非正常退出时（退出状态非0），才会重启容器3、on-failure：3 在容器非正常退出时，重启容器，最多重启3次4、always，在容器退出时总是重启容器，5、unless-stopped，在容器退出时总是重启容器，但是不考虑在Docker守护进程启动时就已经停止了的容器。
| depends_on	 | 此标签用于解决容器的依赖，启动先后问题。如启动应用容器，需要先启动数据库容器。php:depends_on:- apache- mysql |

## docker-compose常用的命令、字段详解实例

运行这些命令需要结合docker-compose一起使用。

且必须要在含有docker-compose.yml文件的目录中才可以使用，不然报错。

### docker-compose命令格式，带*的是常用的
```bash
docker-compose [-f <arg>...] [options] [COMMAND] [ARGS...]
```
命令选项如下：
- -f，–file 指定Compose模板文件，默认为docker-compose.yml，可以多次指定。
- -p，–project-name NAME指定项目名称，默认将使用所在目录名称作为项目名。
- -x-network-driver 使用Docker的可拔插网络后端特性（需要Docker 1.9+版本）
- -x-network-driver DRIVER指定网络后端的驱动，默认为bridge（需要Docker 1.9+版本）
- -verbose输出更多调试信息
- -v，–version打印版本并退出

常用的方式有：
```bash
#查看docker-compose版本
docker-compose -v

#指定docker-compose文件并启动
docker-compose -f nginx.yaml up -d
```
### 1 docker-compose -h
```bash
docker-compose -h
```
查看帮助命令（查看其余命令的使用）
### *2 docker-compose up
选项包括：
- -d 在后台运行服务容器
- –no-color 不使用颜色来区分不同的服务的控制输出
- –no-deps 不启动服务所链接的容器
- –force-recreate 强制重新创建容器，不能与–no-recreate同时使用
- –no-recreate 如果容器已经存在，则不重新创建，不能与–force-recreate同时使用
- –no-build 不自动构建缺失的服务镜像
- –build 在启动容器前构建服务镜像
- –abort-on-container-exit 停止所有容器，如果任何一个容器被停止，不能与-d同时使用
- -t, –timeout TIMEOUT 停止容器时候的超时（默认为10秒）
- –remove-orphans 删除服务中没有在compose文件中定义的容器
- –scale SERVICE=NUM 设置服务运行容器的个数，将覆盖在compose中通过scale指定的参数

如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#启动所有服务
docker-compose up

#启动所有服务，指定yaml
docker-compose -f nginx.yaml up

#启动所有服务在后台运行服务容器
docker-compose up -d

#启动所有服务，指定yaml在后台运行服务容器
docker-compose -f nginx.yaml up -d
```
### *3 docker-compose images
如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#查看所有镜像
docker-compose images

#查看所有镜像指定yaml文件
docker-compose -f nginx.yaml images
```
### *4 docker-compose ps
```bash
列出项目中目前的所有容器
docker-compose ps 

#指定查看yaml文件的容器
docker-compose -f nginx.yaml ps
```
可以将yaml名称改为docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml，就可以直接使用docker-compose ps查看所有容器，如果是其他命名，就需要使用-f 指定yaml文件。
<font color=red>最重要的必须在存放yaml文件的目录来执行。</font>
### *5 docker-compose stop
选项包括：
- -t, –timeout TIMEOUT 停止容器时候的超时（默认为10秒）

如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#停止所有服务
docker-compose stop

#停止所有服务指定yaml文件
docker-compose -f nginx.yaml stop

#停止指定服务（指定服务是在yaml文件中所写的服务）
docker-compose stop 服务名
docker-compose -f nginx.yaml stop 服务名
```
### *6 docker-compose start
如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#启动所有服务
docker-compose start

#启动所有服务指定yaml文件
docker-compose -f nginx.yaml start

#启动指定服务（指定服务是在yaml文件中所写的服务）
docker-compose start 服务名
docker-compose -f nginx.yaml start 服务名
```
### *7 docker-compose restart
如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#重启所有服务
docker-compose start

#重启所有服务指定yaml文件
docker-compose -f nginx.yaml restart

#重启指定服务（指定服务是在yaml文件中所写的服务）
docker-compose restart 服务名
docker-compose -f nginx.yaml restart 服务名
```
### *8 docker-compose down
停止和删除容器、网络、卷、镜像。
选项包括：
- –rmi type，删除镜像，类型必须是：all，删除compose文件中定义的所有镜像；local，删除镜像名为空的镜像
- -v, –volumes，删除已经在compose文件中定义的和匿名的附在容器上的数据卷
- –remove-orphans，删除服务中没有在compose中定义的容器

如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#停止并删除所有服务
docker-compose down

#停止并删除所有服务指定yaml文件
docker-compose -f nginx.yaml down
```
### *9 docker-compose logs
如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#查看服务容器的输出。默认情况下，docker-compose将对不同的服务输出使用不同的颜色来区分。可以通过–no-color来关闭颜色。
docker-compose logs

#查看服务容器的输出指定yaml文件。默认情况下，docker-compose将对不同的服务输出使用不同的颜色来区分。可以通过–no-color来关闭颜色。
docker-compose -f nginx.yaml logs
```
### *10 docker-compose top
如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#查看服务的所有进程
docker-compose top

#查看服务的所有进程指定yaml文件
docker-compose -f nginx.yaml top
```
### 11 docker-compose build
构建（重新构建）项目中的服务容器。
选项包括：
- –compress 通过gzip压缩构建上下环境
- –force-rm 删除构建过程中的临时容器
- –no-cache 构建镜像过程中不使用缓存
- –pull 始终尝试通过拉取操作来获取更新版本的镜像
- -m, –memory MEM为构建的容器设置内存大小
- –build-arg key=val为服务设置build-time变量
- 服务容器一旦构建后，将会带上一个标记名。可以随时在项目目录下运行docker-compose build来重新构建服务

如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#构建（重新构建）项目中的服务容器
docker-compose build

#构建（重新构建）项目中的服务容器指定yaml文件
docker-compose -f nginx.yaml build
```
### 12 docker-compose exec
选项包括：
- -d 分离模式，后台运行命令。
- –privileged 获取特权。
- –user USER 指定运行的用户。
- -T 禁用分配TTY，默认docker-compose exec分配TTY。
- –index=index，当一个服务拥有多个容器时，可通过该参数登陆到该服务下的任何服务，例如：docker-compose exec –index=1 web /bin/bash ，web服务中包含多个容器

如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
docker-compose exec -d –privileged

#指定yaml文件
docker-compose -f nginx.yaml exec -d –privileged
```
### 13 docker-compose scale
- 设置指定服务运行的容器个数。通过service=num的参数来设置数量，但是要注意设置端口的不能使用这个命令

如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#设置nginx服务启动两个
docker-compose scale nginx=2

#设置nginx服务启动两个指定yaml文件
docker-compose -f nginx.yaml scale nginx=2
```
### *14 docker-compose pause
如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#暂停一个服务
docker-compose pause

#暂停一个服务指定yaml文件
docker-compose -f nginx.yaml pause
```
### *15 docker-compose unpause
如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#恢复暂停的一个服务
docker-compose unpause

#恢复暂停的一个服务指定yaml文件
docker-compose -f nginx.yaml unpause
```
### 16 docker-compose pull
拉取服务依赖的镜像。
选项包括：
- –ignore-pull-failures，忽略拉取镜像过程中的错误
- –parallel，多个镜像同时拉取
- –quiet，拉取镜像过程中不打印进度信息

如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#拉取服务依赖的镜像
docker-compose pull

#拉取服务依赖的镜像指定yaml文件
docker-compose -f nginx.yaml pull

#拉取服务依赖的镜像忽略错误信息
docker-compose pull –ignore-pull-failures

#拉取服务依赖的镜像忽略错误信息指定yaml文件
docker-compose -f nginx.yaml pull –ignore-pull-failures
```
### 17 docker-compose push
选项包括：
- –ignore-push-failures 忽略推送镜像过程中的错误

如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#推送服务依赖的镜像
docker-compose push

#推送服务依赖的镜像指定yaml文件
docker-compose -f nginx.yaml push

#推送服务依赖的镜像忽略错误信息
docker-compose push –ignore-push-failures

#推送服务依赖的镜像忽略错误信息指定yaml文件
docker-compose -f nginx.yaml push –ignore-push-failures
```
### 18 docker-compose rm
删除所有（停止状态的）服务容器。
选项包括：
- –f, –force，强制直接删除，包括非停止状态的容器
- -v，删除容器所挂载的数据卷

如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#删除所有（停止状态的）服务容器
docker-compose rm

#删除所有（停止状态的）服务容器指定yaml文件
docker-compose -f nginx.yaml rm
```
### *19 dokcer-compose config 
选项包括：
- –resolve-image-digests 将镜像标签标记为摘要
- -q, –quiet 只验证配置，不输出。 当配置正确时，不输出任何内容，当文件配置错误，输出错误信息
- –services 打印服务名，一行一个
- –volumes 打印数据卷名，一行一个

也就是查看yaml文件是怎么写的；验证yaml文件是否写的正确。
如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件
```bash
#验证并查看compose文件配置
docker-compose config

#验证并查看compose文件配置并指定yaml文件
docker-compose -f nginx.yaml config
```
### docker-compose常用字段详解（yaml模板文件），带*的是常用的
>Compose允许用户通过一个docker-compose.yml模板文件（YAML 格式）来定义一组相关联的应用容器为一个项目（project）。
>Compose模板文件是一个定义服务、网络和卷的YAML文件。Compose模板文件默认路径是当前目录下的docker-compose.yml，可以使用.yml或.yaml作为文件扩展名。
>Docker-Compose标准模板文件应该包含version、services、networks 三大部分，最关键的是services和networks两个部分。
>":"后面必须加空格，"-"后面必须加空格,每个字段写完都必须加":"。

### *1 version

占据最左侧，每个yaml文件必写的；指定API版本号
```bash
version: "3"
```
### *2 services

占据最左侧，与version同列，也是每个yaml文件必写的；指定以下是服务,紧跟下面写的是该服务的名称，单独重启、启动、停止都需要写服务名称，而不是容器名称。
服务名称要与services前面空两格，不能使用tab，必须使用空格。

services格式为：
```bash
services: 

  服务名称: 
```
```bash
version: "3"
services: 

  nginx: 
```
### *3 hostname
- hostname格式为：hostname: <主机名称>

在services服务的服务名称下一行空两格来写；
```bash
version: "3"
services: 

  nginx: 
    hostname: nginx
```
### *4 container_name
- Compose的容器名称（container_name）格式是：container_name: <项目名称><服务名称><序号>

可以自定义项目名称、服务名称，但如果想完全控制容器的命名，可以使用标签指定：
需和hostname同一列；
```bash
version: "3"
services: 

  nginx: 
    hostname: nginx
    container_name: nginx
```
### *5 image
- image格式为：image: 镜像名:版本号

image是指定服务的镜像名称或镜像ID。如果镜像在本地不存在，Compose将会尝试拉取镜像。
需要与container_name同一列；
```bash
version: "3"
services: 

  nginx: 
    hostname: nginx
    container_name: nginx
	image: nginx:latest
```
### *6 ports
ports格式为：
```bash
ports:
  - "容器外端口:容器内端口"
```
ports用于映射端口的标签。
使用HOST:CONTAINER格式或者只是指定容器的端口，宿主机会随机映射端口。
```bash
version: "3"
services: 

  nginx: 
    hostname: nginx
    container_name: nginx
	image: nginx:latest
	ports: 
	  - "80:80"
```
### *7 volumes
挂载一个目录或者一个已存在的数据卷容器，可以直接使用 [HOST:CONTAINER]格式，或者使用[HOST:CONTAINER:ro]格式，后者对于容器来说，数据卷是只读的，可以有效保护宿主机的文件系统。
Compose的数据卷指定路径可以是相对路径，使用 . 或者 … 来指定相对目录。
数据卷的格式可以是下面多种形式：
和hostname、ports同列。
```bash
volumes:
  // 只是指定一个路径，Docker 会自动在创建一个数据卷（这个路径是容器内部的）。
  - /var/lib/mysql
  // 使用绝对路径挂载数据卷
  - /opt/data:/var/lib/mysql
  // 以 Compose 配置文件为中心的相对路径作为数据卷挂载到容器。
  - ./cache:/tmp/cache
  // 使用用户的相对路径（~/ 表示的目录是 /home/<用户目录>/ 或者 /root/）。
  - ~/configs:/etc/configs/:ro
  // 已经存在的命名的数据卷。
  - datavolume:/var/lib/mysql
  // 如果不使用宿主机的路径，可以指定一个volume_driver。
  - volume_driver: mydriver
```
### *8 restart
格式为：restart: always/no/on-failure/unless-stopped
设置改容器是否开机自启；
```bash
version: "3"
services: 

  nginx: 
    hostname: nginx
    container_name: nginx
	image: nginx:latest
	ports: 
	  - "80:80"
	  - 443
    restart: always
```
### 9 volumes_from
从另一个服务或容器挂载其数据卷：
```bash
version: "3"
services: 

  nginx: 
    hostname: nginx
    volumes_from:
      - service_name    
        - container_name
```
### *10 command
使用command可以覆盖容器启动后默认执行的命令。和Dockerfile中的CMD一样，执行命令。
```bash
version: "3"
services: 

  nginx: 
    hostname: nginx
	command: sh /application/start.sh
```
### 11 build
服务除了可以基于指定的镜像，还可以基于一份Dockerfile，在使用up启动时执行构建任务，构建标签是build，可以指定Dockerfile所在文件夹的路径。Compose将会利用Dockerfile自动构建镜像，然后使用镜像启动服务容器。
```bash
build: /path/to/build/dir
```
也可以是相对路径，只要上下文确定就可以读取到Dockerfile。
```bash
build: ./dir
```
设定上下文根目录，然后以该目录为准指定Dockerfile。
```bash
build:
  context: ../
  dockerfile: path/of/Dockerfile
```
build都是一个目录，如果要指定Dockerfile文件需要在build标签的子级标签中使用dockerfile标签指定。
如果同时指定image和build两个标签，那么Compose会构建镜像并且把镜像命名为image值指定的名字。
### 12 context
context选项可以是Dockerfile的文件路径，也可以是到链接到git仓库的url，当提供的值是相对路径时，被解析为相对于撰写文件的路径，此目录也是发送到Docker守护进程的context
```bash
build:
  context: ./dir
```
### 13 dockerfile
使用dockerfile文件来构建，必须指定构建路径
```bash
build: 
  context: .
  dockerfile: Dockerfile-alternate
```
### 14 depends_on
在使用Compose时，最大的好处就是少打启动命令，但一般项目容器启动的顺序是有要求的，如果直接从上到下启动容器，必然会因为容器依赖问题而启动失败。例如在没启动数据库容器的时候启动应用容器，应用容器会因为找不到数据库而退出。depends_on标签用于解决容器的依赖、启动先后的问题。
```bash
version: '2'
services:
  web:
    build: .
    depends_on:
      - db
      - redis
  redis:
    image: redis
  db:
    image: postgres
```
上述YAML文件定义的容器会先启动redis和db两个服务，最后才启动web 服务。
### 15 pid
将PID模式设置为主机PID模式，跟主机系统共享进程命名空间。容器使用pid标签将能够访问和操纵其他容器和宿主机的名称空间。
```bash
pid: "host"
```
### 16 labels
为容器添加Docker元数据（metadata）信息。例如，可以为容器添加辅助说明信息：
```bash
labels：
    com.startupteam.description: "nginx for a strtup team"
```
### 17 network_mode
设置网络模式。
```bash
network_mode: "bridge"
network_mode: "none"
network_mode: "host"
```
### 18 dns
自定义DNS服务器。可以是一个值，也可以是一个列表。
```bash
dns：8.8.8.8
dns：# development.yml
    - 8.8.8.8    
    - 9.9.9.9
```
### 19 dns_search
配置DNS搜索域。可以是一个值，也可以是一个列表。
```bash
dns_search：example.com
dns_search：
    - domain1.example.com
    - domain2.example.com
```
### 20 entrypoint
在Dockerfile中有一个指令叫做ENTRYPOINT指令，用于指定接入点。
在docker-compose.yml中可以定义接入点，覆盖Dockerfile中的定义：
```bash
entrypoint: /code/entrypoint.sh
```
### 21 env_file
在docker-compose.yml中可以定义一个专门存放变量的文件。
如果通过docker-compose -f FILE指定配置文件，则env_file中路径会使用配置文件路径。
如果有变量名称与environment指令冲突，则以后者为准。格式如下：
env_file: .env
或者根据docker-compose.yml设置多个：
```bash
env_file:
  - ./common.env
  - ./apps/web.env
  - ./opt/secrets.env
```
### 22 cap_add
增加指定容器的内核能力（capacity）。
让容器具有所有能力可以指定：
```bash
cap_add:
    - ALL
```
### 23 cap_drop
去掉指定容器的内核能力（capacity）。
去掉NET_ADMIN能力可以指定：
```bash
cap_drop:
    - NET_ADMIN
```
### 24 cgroup_parent
创建了一个cgroup组名称为cgroups_1:
```bash
cgroup_parent: cgroups_1
```
### 25 expose
暴露端口，但不映射到宿主机，只允许能被连接的服务访问。仅可以指定内部端口为参数，如下所示：
```bash
expose:
    - "3000"
    - "8000"
```
### 26 extends
基于其它模板文件进行扩展。例如，对于webapp服务定义了一个基础模板文件为common.yml：
```bash
webapp:
    build: ./webapp
    environment:
        - DEBUG=false
        - SEND_EMAILS=false
```
再编写一个新的development.yml文件，使用common.yml中的webapp服务进行扩展：
```bash
web:
    extends:
        file: common.yml
        service: webapp
    ports:
        - "8000:8000"
    links:
        - db
    environment:
        - DEBUG=true
db:
    image: mysql
```
后者会自动继承common.yml中的webapp服务及环境变量定义。
extends限制如下：
A、要避免出现循环依赖
B、extends不会继承links和volumes_from中定义的容器和数据卷资源
推荐在基础模板中只定义一些可以共享的镜像和环境变量，在扩展模板中具体指定应用变量、链接、数据卷等信息
### 27 external_links
链接到docker-compose.yaml外部的容器，可以是非docker-compose管理的外部容器。
```bash
external_links:
    - redis_1
    - project_db_1:mysql
    - project_db_1:postgresql
```
### 28 links
链接到其它服务中的容器。使用服务名称（同时作为别名），或者“服务名称:服务别名”（如 SERVICE:ALIAS），例如：
```bash
links:
    - db
    - db:database
    - redis
```
使用别名将会自动在服务容器中的/etc/hosts里创建。例如：

172.16.2.186 db
172.16.2.186 database
172.16.2.187 redis
### 29 working_dir
切换目标目录，与Dockerfile中的”WORKDIR“相同

```bash
working_dir: /application/
```

## 标准yaml文件名为：docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml
这些可以直接使用<font color=red>docker-compose 命令</font> 来执行;
如果是其他文件名，比如nginx就需要使用 <font color=green>-f</font> 来指定 <font color=red>docker-compose -f nginx.yaml 命令</font> 来执行。

## docker-compose 模板文件详写实例
三个nginx服务，访问端口分别为:[80,81,82]
### 1 创建模板yaml文件
```bash
version: "3"                #API版本

services:                   #服务
  nginx1:                   #服务名称
   hostname: nginx1          #容器内主机名称
   container_name: nginx1    #容器名
   image: nginx:latest       #要使用的镜像
   restart: always           #设置开机自启
   ports:
     - "80:80"
     - "443:443"
   volumes: 
     - /data/nginx1/conf/nginx.conf:/etc/nginx/nginx.conf
     - /data/nginx1/html:/usr/share/nginx/html
     - /data/nginx1/logs:/var/log/nginx
     - /etc/localtime:/etc/localtime

  nginx2: 
    hostname: nginx2
    container_name: nginx2
    image: nginx:latest
    restart: always
    ports:
      - "81:80"
      - "444:443"
    volumes:
     - /data/nginx2/conf/nginx.conf:/etc/nginx/nginx.conf
     - /data/nginx2/html:/usr/share/nginx/html
     - /data/nginx2/logs:/var/log/nginx
     - /etc/localtime:/etc/localtime

  nginx3:
    hostname: nginx3
    container_name: nginx3
    image: nginx:latest
    restart: always
    ports:
      - "82:80"
      - "445:443"
    volumes:
     - /data/nginx3/conf/nginx.conf:/etc/nginx/nginx.conf
     - /data/nginx3/html:/usr/share/nginx/html
     - /data/nginx3/logs:/var/log/nginx
     - /etc/localtime:/etc/localtime
```

### 2 启动nginx服务
```bash
#创建启动nginx3个服务
docker-compose up -d
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161502945.png)
### 3 访问nginx页面
通过浏览器访问nginx1，nginx2，nginx3服务:
http://127.0.0.1:80
http://127.0.0.1:81
http://127.0.0.1:82

## 重要：YAML需要注意的
1 YAML需要注意的问题就是格式问题：
ERROR: In file './nginx.yaml', service 'hostname' must be a mapping not a st
解决：查看自己的YAML文件格式是否正确；

2 ":"后面必须加空格，"-"后面必须加空格,每个字段写完都必须加":"。具体还有请看《[YAML文件格式编写及编写注意事项](https://liucy.blog.csdn.net/article/details/129082503)》

