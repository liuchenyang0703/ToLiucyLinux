---
title: nerdctl 部署及使用指南
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - kubernetes
  - Docker
  - nerdctl
  - container
  - 云原生
  - 运维
date: 2026-10-24
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
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


![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261024133315613.jpeg)

## 一、概述
### 1.1 nerdctl 是什么？
nerdctl 是 containerd 官方社区维护的一个 CLI 工具，定位是 **"Docker 兼容的 containerd 命令行客户端"**。简单来说，它让你能用几乎和 Docker 一模一样的命令去操作 containerd。

随着 Kubernetes 在 v1.24 版本中正式移除 `Docker`，containerd 已成为容器运行时的事实标准，而 `nerdctl` 则填补了 containerd 原生客户端 `ctr` 缺乏用户友好性的空白。

相较于 `ctr` 仅面向调试场景、命令晦涩难用的特点，nerdctl 提供了与 Docker 几乎一致的命令体验，支持 `run`、`build`、`compose`、`login` 等完整操作链，同时继承了 containerd 的命名空间机制，能够直接管理 Kubernetes 命名空间下的容器。本文将从部署、基础用法、Kubernetes 调试、Rootless 模式等维度，系统介绍 nerdctl 的实践方法。


### 1.2 nerdctl 官方
* 官方文档地址：[https://github.com/containerd/nerdctl/tree/main/docs](https://github.com/containerd/nerdctl/tree/main/docs) 这里汇集了命令参考、配置说明、IPFS、GPU 等全部官方文档。‌‌
* 官方源码地址：[https://github.com/containerd/nerdctl](https://github.com/containerd/nerdctl)
* 二进制安装包官方下载地址：[https://github.com/containerd/nerdctl/releases](https://github.com/containerd/nerdctl/releases)
## 二、nerdctl 服务部署
**操作环境：**

* 操作系统：ubuntu24.04

### 2.1 安装方式选择

> 二进制安装包官方下载地址：[https://github.com/containerd/nerdctl/releases](https://github.com/containerd/nerdctl/releases)

nerdctl 提供两种发布包：

- **`nerdctl-full-<VERSION>-linux-amd64.tar.gz`**：包含 nerdctl 及其全部依赖（containerd 、CNI、BuildKit、RootlessKit 等），适合快速搭建完整环境，默认在官方下载地址是看不到的，需要点最下面的`Show all 17 assets`才能展示出来所有的安装包，就包含此安装包；
- **`nerdctl-<VERSION>-linux-amd64.tar.gz`**：仅含 nerdctl 二进制文件，适合已有 containerd 环境的场景

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261024133319920.png)


**推荐做法**：对于大多数场景，直接下载 full 包并解压至 `/usr/local`，可一次性配齐所有工具。

我这里为空环境，只有一个操作系统，所以就拿`nerdctl-full-<VERSION>-linux-amd64.tar.gz`的包进行安装了；

### 2.2 下载并安装 nerdctl 服务
选择自己所需的版本及系统架构进行对应下载；

下载方式可使用`wget`下载或直接下载手动上传到服务器上；

```bash
# 使用wget命令下载
wget https://github.com/containerd/nerdctl/releases/download/v2.4.0/nerdctl-full-2.4.0-linux-amd64.tar.gz

# 解压到 /usr/local
tar xf nerdctl-full-2.4.0-linux-amd64.tar.gz -C /usr/local/

# 验证
nerdctl version
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261024133329909.png)

有个报错，没关系，这个是因为`containerd`服务没有启动，`nerdctl`连接不上才会报错；

---

`nerdctl-full` 二进制包解压后的目录结构可以分为四大块，下面逐一说明。

* 整体结构

```bash
./nerdctl/
├── bin/                  # 所有可执行二进制
├── lib/systemd/system/   # systemd 服务单元文件
├── libexec/cni/          # CNI 网络插件
└── share/doc/            # 文档
```

1. `bin/` —— 核心可执行文件

这是最重要的一块，包含了运行容器所需的全部二进制。按功能可分为几类：

**容器运行时与客户端**
- `containerd` —— 容器运行时守护进程（服务端，就是之前报错说没启动的那个）
- `containerd-shim-runc-v2` —— 容器进程的 shim，负责与 runc 交互
- `runc` —— 真正创建和运行容器的底层工具
- `ctr` —— containerd 自带的底层 CLI（调试用，难用）
- `nerdctl` —— 本文的主角，Docker 风格的 CLI

**镜像构建相关**
- `buildkitd` —— 镜像构建的守护进程
- `buildctl` —— BuildKit 的客户端
- `buildg` —— BuildKit 的调试工具

**Rootless 相关**
- `containerd-rootless.sh` —— Rootless 模式的启动脚本
- `containerd-rootless-setuptool.sh` —— Rootless 模式一键安装脚本
- `rootlesskit` / `rootlessctl` —— Rootless 的核心工具
- `bypass4netns` / `bypass4netnsd` —— Rootless 网络加速
- `fuse-overlayfs` / `containerd-fuse-overlayfs-grpc` —— 无 root 时的存储驱动

**其他辅助**
- `tini` —— 轻量 init 进程
- `stargz` 系列、`ctd-decoder` 等 —— 镜像加速相关（lazy pulling）
- `gomodjail`、`nerdctl.gomodjail` —— 权限隔离相关

其中很多 `buildkit-cni-*` 是**符号链接**，指向 `../libexec/cni/` 下的真实插件，方便 BuildKit 构建时调用网络。

2. `lib/systemd/system/` —— 服务单元文件

官方提供的 systemd 服务定义，默认咱们解压到`/usr/local`后就可以直接使用`systemctl`启动了：

- `containerd.service` —— containerd 的 systemd 服务
- `buildkit.service` —— BuildKit 的 systemd 服务
- `stargz-snapshotter.service` —— stargz 快照器的服务


3. `libexec/cni/` —— CNI 网络插件

容器网络的核心插件，`nerdctl run` 创建 bridge 网络时依赖它们：

- `bridge`、`host-local`、`loopback`、`portmap` 等是**最常用**的
- `bandwidth`、`firewall`、`tuning`、`vlan`、`macvlan` 等用于高级网络配置
- `LICENSE`、`README.md` 是说明文件

nerdctl 默认会在 `/opt/cni/bin` 或 `/usr/local/libexec/cni` 下查找这些插件。如果路径不对，容器可能起不来（报找不到 CNI 插件）。

4. `share/doc/` —— 文档

官方文档的离线副本，对于写文章很有参考价值：

- `nerdctl/README.md` —— nerdctl 主文档
- `nerdctl/docs/` —— 各专题文档，如 `rootless.md`、`build.md`、`compose.md`、`registry.md`、`faq.md`、`config.md` 等
- `nerdctl-full/README.md` —— full 包的说明
- `nerdctl-full/SHA256SUMS` —— 校验和


### 2.3 配置 containerd 使用 systemd cgroup

在 Kubernetes 环境中，kubelet 通常期望 containerd 使用 systemd cgroup 驱动。若未配置，可能导致 `kubeadm init` 失败或节点 NotReady：

```bash
# 生成默认配置
mkdir -p /etc/containerd
containerd config default | tee /etc/containerd/config.toml

# 将 SystemdCgroup 改为 true
sed -i 's/SystemdCgroup = false/SystemdCgroup = true/g' /etc/containerd/config.toml

# 启动 containerd 并配置开机自启
systemctl daemon-reload
systemctl enable --now containerd

# 再次确认nerdctl就看不到报错了，并且还显示了server的版本
nerdctl version
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261024133333444.png)


### 2.4 BuildKit 配置（构建镜像必需）

若使用完整包安装，BuildKit 已包含在内。启动 BuildKit 守护进程：

```bash
# 启动 buildkitd（通常在安装 full 包后已自动配置为 systemd 服务）
systemctl daemon-reload
systemctl enable --now buildkit
```

对于 Rootless 模式，需要使用专用命令安装 BuildKit，如果是使用root用户，则不需要执行：

```bash
containerd-rootless-setuptool.sh install-buildkit
```

## 三、nerdctl 的基础使用

### 3.1 核心命令

`nerdctl` 命令与 `Docker` 命令几乎一致，以下是常用命令的对照：

| Docker 命令 | nerdctl 命令 | 说明 |
|-------------|-------------|------|
| `docker run -it --rm nginx:1.24.0` | `nerdctl run -it --rm nginx:1.24.0` | 运行容器 |
| `docker pull nginx:1.24.0` | `nerdctl pull nginx:1.24.0` | 拉取镜像 |
| `docker build -t nginx:new .` | `nerdctl build -t nginx:new .` | 构建镜像（需 BuildKit） |
| `docker compose up` | `nerdctl compose up` | Compose 编排 |
| `docker login` | `nerdctl login` | 登录镜像仓库 |
| `docker ps -a` | `nerdctl ps -a` | 查看容器 |
| `docker logs -f <id>` | `nerdctl logs -f <id>` | 查看日志 |
| `docker ps -a --format "{{.Names}}"` | `nerdctl ps -a --format "{{.Names}}"` | 格式化输出容器名 |

> nerdctl 的 `--format` 支持与 Docker 相同的 Go 模板语法，常用的占位符包括 `.Names`、`.ID`、`.Image`、`.Status` 等。此外 nerdctl 还额外支持 `--format=wide` 和 `--format=json` 等预设格式。

> 更多命令可参考Docker的用法，包括 **镜像管理、容器管理、网络管理**：[【Linux】部署Docker及镜像、容器、网络管理命令详解（步骤超全，含带发展史及核心概念）](https://liucy.blog.csdn.net/article/details/123842609#Docker_166)


### 3.2 nerdctl 配置镜像加速地址
> 既然docker都需要配置了，那么 **nerdctl** 和 **docker** 是同样的道理，拉取镜像都是从dockerhub里拉取，国内是拉取不到的，所以需要采用镜像加速源的方式来拉取镜像；
> 但不同的是，配置文件位置不同，**docker** 的配置文件在：`/etc/docker/daemon.json`，**nerdctl** 的配置文件在：`/etc/containerd/config.toml`

如果没有找到`nerdctl`的配置的话应该是没有执行上面命令生成默认的配置，可使用命令：`containerd config default | tee /etc/containerd/config.toml`

* 开始配置镜像加速地址

**1. 修改主配置**

编辑 `/etc/containerd/config.toml`，把 `config_path` 从空值改成目录：

```bash
# 进入container配置文件
vim /etc/containerd/config.toml

# 找到 confing_path，默认应该在31行，然后配置是空的，修改为如下：
    [plugins.'io.containerd.cri.v1.images'.registry]
      config_path = '/etc/containerd/certs.d'
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261024133355800.png)


**2. 创建目录和文件**

```bash
mkdir -p /etc/containerd/certs.d/docker.io
vi /etc/containerd/certs.d/docker.io/hosts.toml
```
**3. 将如下配置添加到配置文件里**

> 镜像加速地址可参考（长期维护）：
> * [【Docker】完美解决拉取镜像超时报错：ERROR: Get https://registry-1.docker.io/v2/](https://liucy.blog.csdn.net/article/details/129085538)
> * [【Docker】完美解决拉取镜像超时报错：ERROR: Get https://registry-1.docker.io/v2/ -ToLiucyLinux](https://www.liuchenyang.top/document/Docker/registry-1.docker.iov2.html#%E4%B8%89%E3%80%81%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%951-%E6%9B%B4%E6%8D%A2docker%E4%B8%8B%E8%BD%BD%E6%BA%90)
> * [Docker 镜像加速地址 - 公众号标签（每个月都会更新）](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkwNzI2ODUwMg==&action=getalbum&album_id=4160135931510620166)
> <br>
> 可以按照上述任意一篇文章中的加速地址放到配置文件里进行修改，格式和Docker不一样，可参考下面写好的；

```bash
server = "https://registry-1.docker.io"

[host."https://docker.apiba.cn"]
  capabilities = ["pull", "resolve"]

[host."https://hub1.nat.tf"]
  capabilities = ["pull", "resolve"]

[host."https://docker.1panel.live"]
  capabilities = ["pull", "resolve"]

[host."https://dockerproxy.net"]
  capabilities = ["pull", "resolve"]

[host."https://hub3.nat.tf"]
  capabilities = ["pull", "resolve"]

[host."https://hub.1panel.dev"]
  capabilities = ["pull", "resolve"]

[host."https://docker.367231.xyz"]
  capabilities = ["pull", "resolve"]

[host."https://docker-registry.nmqu.com"]
  capabilities = ["pull", "resolve"]

[host."https://hub2.nat.tf"]
  capabilities = ["pull", "resolve"]

[host."https://docker.jsdelivr.fyi"]
  capabilities = ["pull", "resolve"]

[host."https://hub.rat.dev"]
  capabilities = ["pull", "resolve"]

[host."https://hub.fast360.xyz"]
  capabilities = ["pull", "resolve"]

[host."https://hub.amingg.com"]
  capabilities = ["pull", "resolve"]
```

**4. 重启并验证**

```bash
# 加载配置文件
systemctl daemon-reload
# 重启containerd服务
systemctl restart containerd
# 拉取镜像
nerdctl pull nginx:1.24.0
```


![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261024133402705.png)

> **两点提醒**
> **第一，`server` 字段的作用**：它指定回退的原始地址。当所有 `[host.*]` 都失败时，containerd 会尝试直连 `server` 指定的地址。保留 `https://registry-1.docker.io` 作为兜底是标准做法。
> **第二，地址顺序即尝试顺序**：containerd 会按 `hosts.toml` 中 `[host.*]` 出现的**从上到下**顺序依次尝试。所以建议把**实测最快、最稳定**的地址放在最前面，比如 Docker 里排第一的 `docker.apiba.cn`。如果某些地址已失效，containerd 会在超时后自动跳到下一个，但会拖慢首次拉取速度——建议定期清理失效地址。




### 	3.3 数据默认存储路径及修改数据存储路径
#### 3.3.1 数据默认存储路径

| 数据类型 | 管理组件 | 默认路径（rootful） |
|---------|---------|------------------|
| **镜像内容 (Content Store)** | containerd | `/var/lib/containerd/io.containerd.content.v1.content`  |
| **容器快照 (Snapshots)** | containerd | `/var/lib/containerd/io.containerd.snapshotter.v1.overlayfs`  |
| **运行时状态 (State)** | containerd | `/run/containerd`  |
| **nerdctl 自身元数据** | nerdctl | `/var/lib/nerdctl`  |
|**nerdctl 配置文件**|nerdctl|`/etc/containerd/config.toml`|

> `root` 目录（`/var/lib/containerd`）是持久化存储的核心，镜像和容器快照都在这里。`state` 目录（`/run/containerd`）存放运行时临时数据，**重启后会重建**，所以不要往这里放重要数据。

#### 3.3.2 修改数据存储路径

修改的主要是 containerd 的 **`root`** 字段，即数据根目录。`state` 目录一般保持默认即可。

**1. 编辑 `/etc/containerd/config.toml`**

找到顶部的 `root` 字段并修改：

```bash
version = 4
root = '/data/containerd'          # 改成你想要的新路径
state = '/run/containerd'          # 通常不动
```

**2. 停服务，迁移已有数据**

这一步是**必须的**，不能跳过：

```bash
systemctl stop containerd
mkdir -p /data/containerd
# 使用 rsync 或 cp -a 保留权限属性
cp -a /var/lib/containerd/. /data/containerd/
```

**3. 启动并验证**

```bash
systemctl daemon-reload
systemctl start containerd
nerdctl images   # 确认之前拉取的镜像还在
```

### 3.4 构建镜像

构建镜像需要 BuildKit 支持。与 Docker 不同，nerdctl build 会优先从仓库拉取基础镜像，而非直接使用本地缓存：

```bash
# 基础构建
nerdctl build -t my-app:latest .

# 构建并输出到本地目录（不生成镜像）
nerdctl build -o type=local,dest=. .
```
### 3.5 镜像仓库登录

nerdctl 支持复用 Docker 的凭据配置（`~/.docker/config.json`），也支持独立登录：

```bash
# 登录镜像仓库（将 docker login 替换为 nerdctl login）
nerdctl login -u <username> -p <password> <registry>

# 若遇到证书问题（如自签名证书），可添加 --insecure-registry
nerdctl login --insecure-registry -u <username> <registry>
```

## 四、与 Kubernetes 集成

nerdctl 的一个重要特性是支持 containerd 的命名空间机制。Kubernetes 默认使用 `k8s.io` 命名空间运行所有容器，nerdctl 可以直接操作该命名空间下的资源。

### 4.1 查看 Kubernetes 容器

```bash
# 列出 k8s.io 命名空间下的所有容器
nerdctl --namespace k8s.io ps -a
```

输出示例：
```bash
CONTAINER ID    IMAGE                                                      COMMAND                   CREATED          STATUS    PORTS    NAMES
e8793b8cca8b    registry.k8s.io/coredns/coredns:v1.9.3                     "/coredns -conf /etc…"    2 minutes ago    Up                 k8s://kube-system/coredns-787d4945fb-mfx6b/coredns
```

### 4.2 构建镜像供 Kubernetes 使用

无需推送至镜像仓库，直接在本地构建并供 kubelet 使用：

```bash
# 在 k8s.io 命名空间下构建镜像
nerdctl --namespace k8s.io build -t my-app:latest /path/to/dockerfile-dir

# 查看镜像
nerdctl --namespace k8s.io images

# 在 Pod 中引用（imagePullPolicy 需设为 Never 或 IfNotPresent）
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: my-app
    image: my-app:latest
    imagePullPolicy: Never
EOF
```

### 4.3 加载镜像归档

支持导入 `docker save` 格式或 OCI 格式的镜像归档：

```bash
nerdctl --namespace k8s.io load < /path/to/image.tar
```

## 五、Rootless 模式

Rootless 模式允许非 root 用户运行 containerd 和容器，适用于多用户开发环境或安全要求较高的场景。nerdctl 提供了 `containerd-rootless-setuptool.sh` 脚本简化配置。

### 5.1 安装 Rootless containerd

```bash
# 使用完整包中的脚本进行安装
containerd-rootless-setuptool.sh install
```

脚本会自动完成以下工作：
- 检查 RootlessKit 功能、cgroup v2、overlayfs 支持
- 创建 systemd 用户服务 `~/.config/systemd/user/containerd.service`
- 启动并启用 containerd 服务

### 5.2 使用 Rootless nerdctl

安装完成后，直接执行 nerdctl 即可，**无需手动指定 `$CONTAINERD_ADDRESS`**：

```bash
nerdctl run -it --rm alpine
```

### 5.3 管理 Rootless 服务

Rootless 模式下服务由用户级 systemd 管理：

```bash
# 控制服务
systemctl --user start|stop|restart containerd.service

# 查看状态
systemctl --user status containerd.service
```

### 5.4 开机自启动

若希望容器在用户未登录时也能运行，需启用 linger：

```bash
sudo loginctl enable-linger <username>
```

### 5.5 资源限制的约束

Rootless 模式下，`--cpus`、`--memory` 等资源限制标志需要满足以下条件才能生效：
- containerd 1.4+
- runc 1.0-rc91+
- cgroup v2
- systemd

若内核版本较低（< 5.13）或使用 SELinux，可能需要切换至 `fuse-overlayfs` snapshotter：

```bash
# 安装 fuse-overlayfs
containerd-rootless-setuptool.sh install-fuse-overlayfs

# 设置环境变量后使用
export CONTAINERD_SNAPSHOTTER=fuse-overlayfs
```

## 六、总结

nerdctl 的核心价值在于：**在不牺牲 containerd 原生能力的前提下，提供了 Docker 级别的用户体验**。对于已经从 Docker 迁移至 containerd 的 Kubernetes 环境，nerdctl 是最顺手的日常操作工具；对于希望探索 containerd 生态的开发者，nerdctl 也是比 `ctr` 更友好的入门选择。

从部署角度看，推荐直接使用 `nerdctl-full` 包一次性配齐所有依赖。在 Kubernetes 节点上，重点关注 `SystemdCgroup = true` 的配置以及 `--namespace k8s.io` 的使用习惯。Rootless 模式虽然能提升隔离性，但对内核版本和 cgroup 版本有一定要求，部署前需确认环境兼容性。

