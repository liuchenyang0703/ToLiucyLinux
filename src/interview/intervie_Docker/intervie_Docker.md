---
title: Docker常见面试题
icon: circle-info
order: 1
category:
  - 面试题
tag:
  - Docker常见面试题
  - 运维
date: 2026-02-07
pageview: true
article: false
breadcrumb: false
isOriginal: true

---



## 1、Docker是什么？与传统虚拟机有什么区别？

| 特性         | Docker容器                 | 传统虚拟机（VM）             |
| :----------- | :------------------------- | :--------------------------- |
| **架构**     | 共享宿主机内核，轻量级隔离 | 完整操作系统，硬件虚拟化     |
| **启动速度** | **秒级**（进程启动）       | 分钟级（系统启动）           |
| **资源占用** | **MB级**，轻量             | GB级，笨重                   |
| **性能**     | **接近原生**（~100%）      | 有虚拟化开销（~70-80%）      |
| **隔离性**   | 进程级隔离（较弱）         | 系统级隔离（强）             |
| **镜像大小** | 小（只打包应用+依赖）      | 大（完整OS）                 |
| **适用场景** | 微服务、CI/CD、快速扩展    | 强隔离、多操作系统、传统应用 |

## 2、Docker的核心概念

| 概念                   | 说明                             | 类比           |
| :--------------------- | :------------------------------- | :------------- |
| **镜像（Image）**      | 只读模板，包含应用+运行环境      | 类（Class）    |
| **容器（Container）**  | 镜像的运行实例，可读写层         | 对象（Object） |
| **仓库（Repository）** | 存储和分发镜像的地方             | Git仓库        |
| **Dockerfile**         | 定义镜像构建步骤的脚本           | Makefile       |
| **卷（Volume）**       | 持久化数据存储，绕过联合文件系统 | 外挂硬盘       |

## 3、Docker使用了哪些Linux内核技术？

| 技术                        | 作用             | 说明                                  |
| :-------------------------- | :--------------- | :------------------------------------ |
| **Namespace（命名空间）**   | **资源隔离**     | PID、NET、IPC、MNT、UTS、USER、CGROUP |
| **Cgroups（控制组）**       | **资源限制**     | CPU、内存、磁盘I/O、网络带宽          |
| **UnionFS（联合文件系统）** | **分层存储**     | AUFS、Overlay2、Devicemapper          |
| **Capabilities**            | **权限控制**     | 细粒度权限，替代root                  |
| **Seccomp**                 | **系统调用过滤** | 限制容器可执行的系统调用              |

## 4、Docker网络模式有哪些？

| 模式               | 说明                                               | 适用场景                 |
| :----------------- | :------------------------------------------------- | :----------------------- |
| **bridge**（默认） | **桥接模式**：容器通过docker0网桥通信，NAT访问外网 | 单机容器互联             |
| **host**           | **主机模式**：容器共享宿主机网络栈，无隔离         | 高性能、需访问宿主机服务 |
| **none**           | **无网络模式**：仅lo接口                           | 完全隔离、自定义网络     |
| **container**      | **容器模式**：共享另一个容器的网络栈               | 边车模式（Sidecar）      |
| **自定义bridge**   | 用户创建的bridge网络，支持DNS                      | 多容器应用、Compose      |

## 5、容器隔离及限制的底层技术是什么？  

答：`cgroup` 和 `namespace` 是最重要的两种核心技术。Docker是通过Namespace实现资源隔离，通过Cgroup实现资源限制

## 6、namespace 分别对应六种资源有什么？  
答：Mount（文件系统）、UTS（主机名称）、IPC（内存）、PID（进程）、Network（网络） 和 User（用户）

## 7、Docker架构简单描述下

答：docker采用的是c/s架构。客户端向服务端发送请求，服务端负责构建、运行和分发容器。并且客户端和服务端可以运行在同一个宿主机上，客户端也可以通过socket与远程的服务端通信。

## 8、Docker 的核心组件都有什么？  
答：Docker 客户端 - Client 、Docker 服务器 - Docker daemon 、Docker 镜像 - Image、 Registry 仓库 – Registry、Docker 容器 - Container

## 9、Docker 的三大核心组件是什么？

答：镜像（Image）、容器（Container）、仓库（Repository）

## 10、创建容器的过程docker都做了哪些事情，简单描述下

```bash
用户执行: docker run nginx

    │
    ▼
┌─────────────────┐
│  1. 解析命令     │  解析镜像名、端口映射、卷挂载等参数
│  (Docker Client)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  2. 检查本地镜像 │  存在？直接跳过 : 从仓库拉取
│  (Image Check)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  3. 创建容器配置 │  生成唯一ID、设置网络/存储/资源限制
│  (Container Config)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  4. 准备文件系统 │  联合挂载：只读镜像层 + 可写容器层
│  (UnionFS)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  5. 设置隔离环境 │  Namespace: PID/Network/Mount/UTS/IPC
│  (Namespace)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  6. 配置资源限制 │  Cgroups: CPU/内存/IO限制
│  (Cgroups)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  7. 启动容器进程 │  执行 ENTRYPOINT/CMD，PID 1 启动
│  (Start Process)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  8. 接管监控     │  containerd-shim 守护，独立于 daemon
│  (Containerd-shim)
└─────────────────┘
```



## 11、为什么 base 镜像 都很小？就比如centos在docker这里就很小，200M左右。

答：Linux系统的组成，Linux 操作系统由Bootfs（内核空间）和 Rootfs（用户空间）组成，因为对于 base 镜像来说，底层直接用宿主机的 kernel，自己只需要提供 rootfs 。

## 12、简述容器中copy-on-Write的特性

答： **读时共享，写时复制** —— 让容器既轻量启动，又保证数据隔离，是 Docker 高效的核心机制。

## 13、Dockerfile 的基本结构是什么？  

> Dockerfile由一系列指令组成，每个指令对应镜像的一层。例如:

```bash
# 基础镜像
FROM ubuntu:20.04

# 维护者信息
LABEL maintainer="admin@example.com"

# 环境变量
ENV APP_HOME=/app \
    JAVA_VERSION=11

# 工作目录
WORKDIR $APP_HOME

# 复制文件（构建上下文→镜像）
COPY target/app.jar ./

# 移动文件并解压
ADD application.tar /

# 安装依赖（合并RUN减少层数）
RUN apt-get update && \
    apt-get install -y openjdk-11-jdk && \
    rm -rf /var/lib/apt/lists/*

# 暴露端口（仅声明，不映射）
EXPOSE 8080

# 启动命令（只能有一个，可被覆盖）
ENTRYPOINT ["java", "-jar", "app.jar"]

# 默认参数（可被docker run覆盖）
CMD ["--server.port=8080"]
```



## 14、CMD 和 ENTRYPOINT 的区别是什么？

* CMD：提供默认执行的命令，可以被`docker run`参数覆盖
* ENTRYPOINT：提供固定执行的命令，不可被覆盖



同时存在时，`ENTRYPOINT`的优先级大于`CMD`；



## 15、RUN 和 CMD 的区别是什么？  
*   RUN：在构建镜像时执行命令，用于安装软件包或配置环境。
*   CMD：在容器启动时执行命令，用于定义默认的容器行为，常用于最后执行的命令或和ENTRYPOINT同时存在时作为参数。

## 16、COPY 和 ADD 的区别是什么？  
*   COPY：仅支持复制本地文件或目录到镜像中。
*   ADD：除了复制功能外，还支持自动解压和从远程 URL 下载文件。



## 17、如何查看 Docker 镜像的构建历史？  
答：使用 `docker history 镜像名称/id` 命令

## 18、如何清理未使用的 Docker 资源？  
* 删除未使用的镜像：`docker image prune -a` 
* 删除未使用的容器：`docker container prune`  
* 删除未使用的卷：`docker volume prune`

## 19、如何启动 Docker Compose 应用  
`docker-compose up -d`；

*  -d：后台运行。

## 20、如何指定 Docker Compose 文件？  
答：`docker-compose -f custom-compose.yml up -d`

## 21、如何查看 Docker Compose 应用的日志？  
答：使用 `docker-compose logs` 命令

## 22、 如何进入运行中的容器？

```bash
docker exec -it <container_id> bash
docker exec -it <container_id> sh          # 精简镜像无bash时用
```

## 23、容器资源限制

```bash
# CPU限制
docker run --cpus="1.5" nginx           # 最多使用1.5核
docker run --cpu-shares=512 nginx       # CPU份额（相对权重）

# 内存限制
docker run -m 512m --memory-swap 1g nginx  # 内存512M，交换分区1G

# IO限制
docker run --device-read-bps /dev/sda:1mb nginx  # 磁盘读取限速

# 查看资源使用
docker stats
```

## 24、Docker与Kubernetes的关系？

| 对比         | Docker                                 | Kubernetes                   |
| :----------- | :------------------------------------- | :--------------------------- |
| **定位**     | 容器运行时/单机编排                    | 容器编排平台/集群管理        |
| **管理范围** | 单机容器                               | 跨主机容器集群               |
| **功能**     | 构建、运行、管理容器                   | 调度、扩缩容、自愈、服务发现 |
| **关系**     | K8s底层使用Docker/containerd作为运行时 | 上层编排引擎                 |

**K8s替代Docker组件**：

- Docker → **containerd**（容器运行时，更轻量）
- docker-compose → **Helm/Kustomize**（应用打包）

## 25、容器重启之后数据还在吗

答：不在，可以使用`-v`参数做持久化映射到宿主机上；

## 26、容器OOM怎么办？

答：调整`-m`内存限制，优化应用内存使用，或添加Swap

## 27、Docker网络不通怎么排查？

1. 检查创建容器使用的网络模式
2. 检查端口是否存在
3. 检查服务是否启动
4. 检查防火墙是否开启此端口的白名单
