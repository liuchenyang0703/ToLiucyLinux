---
title: GitLab + ArgoCD 实现 Kubernetes GitOps 自动化部署
icon: circle-info
order: 1
category:
  - Linux
  - kubernetes
  - 自动化运维
tag:
  - Linux
  - kubernetes
  - ArgoCD
  - 运维
  - 自动化运维
date: 2026-10-08
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


![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017212943095.jpeg)

## 一、前言

> 此方案适用`GitLab`、`GitHub`、`Gitee`。
### 1.1 方案概述
本方案基于 ArgoCD 与 GitOps 理念，构建一套 Kubernetes 自动化持续部署（CD）方案。

核心思路是将应用部署配置以 Kubernetes 清单（Manifest）的形式存储在 Git 仓库中，由 Git 作为应用部署状态的唯一来源。ArgoCD 负责持续监听 Git 仓库中的配置变化，并自动将最新状态同步到 Kubernetes 集群，实现应用的自动化部署与状态管理。

在该方案中：

- Git 仓库负责保存 Kubernetes 应用部署清单；
- ArgoCD 负责检测配置变化并执行同步；
- Kubernetes 负责运行最终的应用实例。

通过 GitOps 的 Pull 模式，实现部署流程自动化，同时避免外部系统直接操作 Kubernetes 集群，提高部署安全性和可维护性。

### 1.2 架构概览

没有CI的话，整个自动化CD流程如下：
1. **构建镜像、进行测试、对镜像打标签并推送、修改yaml中的镜像版本（标签）**
2.  **更新清单并推送**：将新的yaml文件推送到 GitLab 仓库。
3.  **GitOps 同步**：Argo CD 监控该 Git 仓库，检测到变更后，自动将新的配置应用到 Kubernetes 集群进行重新部署。
4.  **部署完成**：集群拉取新镜像，完成应用更新。

**核心流程**：

```
手动修改：Dockerfile → 构建镜像 → 进行测试 → 没问题打标签 → 推送到镜像仓库 → 修改yaml文件镜像版本 → 代码推送
自动化：git推送 → ArgoCD 检测变更 → 自动同步更新到 Kubernetes 集群
```


### 1.3 前置条件

| 组件 | 要求 |
|------|------|
| Kubernetes 集群 | 无要求|
| GitLab 项目 | 包含`Kubernetes 部署清单（YAML）` |
| 镜像仓库 | GitLab Container Registry / AWS ECR / Harbor 等 |
|Helm|需要使用helm部署可安装|
|Git命令	|无要求|

* k8s 集群部署可参考：[K8S 二进制集群搭建（一主两从）](https://liucy.blog.csdn.net/article/details/151709127)  | [kubeadm搭建k8s集群(一主两从)完整教程及kubernetes简介](https://liucy.blog.csdn.net/article/details/130948804) | [kubeadm搭建k8s高可用集群(三主两从一VIP)完整教程](https://liucy.blog.csdn.net/article/details/131101217)
* Harbor镜像仓库部署可参考：[Linux中基于Docker搭建harbor私有镜像仓库（超级详细）](https://liucy.blog.csdn.net/article/details/124623482) | [Docker搭建harbor私有镜像仓库（命令行模式）](https://liucy.blog.csdn.net/article/details/124705622)
* Helm 部署可参考：[K8s - Helm管理工具](https://liucy.blog.csdn.net/article/details/161394380)
### 1.4 当前部署环境
|组件|版本  |
|--|--|
| kubernetes集群 |1.20.10  |
|Harbor镜像仓库|v2.15.0-e2b5ce92|
|Git|2.54.0 - windows|

### 1.5 ArgoCD - Kubernetes 版本对照表 
* argocd 官方开源地址：[https://github.com/argoproj/argo-cd](https://github.com/argoproj/argo-cd)
* argocd 官方文档：[https://argo-cd.readthedocs.io/en/stable/](https://argo-cd.readthedocs.io/en/stable/)
* argo - k8s版本官方对照表：[https://argo-cd.readthedocs.io/en/release-3.5/operator-manual/tested-kubernetes-versions/](https://argo-cd.readthedocs.io/en/release-3.5/operator-manual/tested-kubernetes-versions/)，可以根据修改argo的版本来查看官方给出的对照k8s的版本是多少，根据官方我已经列出来了。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017212955561.png)


| Argo CD Chart 版本 | Kubernetes 版本 |
|--|--|
| 3.5 | v1.36、v1.35、v1.34、v1.33 |
|3.4|v1.35、v1.34、v1.33、v1.32|
|3.3|v1.35、v1.34、v1.33、v1.32|
|3.2|v1.34, v1.33, v1.32, v1.31|
|3.1|	v1.34, v1.33, v1.32, v1.31|
|3.0|	v1.32, v1.31, v1.30, v1.29|
|2.14|	v1.31, v1.30, v1.29, v1.28|
|2.13	|v1.30、v1.29、v1.28、v1.27|
|2.12|	v1.29、v1.28、v1.27、v1.26|
|2.11|		v1.29, v1.28, v1.27, v1.26, v1.25|
|2.10|v1.28, v1.27, v1.26, v1.25|
|2.9|	v1.28, v1.27, v1.26, v1.25|
|2.8|	v1.27、v1.26、v1.25、v1.24|
|2.7|	v1.26、v1.25、v1.24、v1.23|
|2.6	|v1.24、v1.23、v1.22|
|2.5|v1.23, v1.22, v1.21|
|2.4|	v1.22, v1.21, v1.20|
|2.3|v1.21, v1.20, v1.19|
|2.2|	v1.20, v1.19, v1.18|
|2.1|v1.19, v1.18 |
|2.0|v1.18, v1.17|
|1.8|	v1.17, v1.16|

> `ArgoCD 2.5`版本及以后是我推算出来的，官方文档丢失了。
## 二、部署 Argo CD 服务
Argo CD 本身作为一个应用是运行在 `Kubernetes` 集群中，负责管理集群自身的状态。


### 2.1 yaml 方式部署
#### 2.1.1  创建命名空间并安装 Argo CD
* 创建一个 `argocd` 命名空间
```bash
kubectl create ns argocd
```
* 部署 Argo CD 的所有组件

```bash
# 部署最新版本
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# 部署指定版本（具体需要哪个版本可以进行修改版本号，当前是v2.4.0）
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v2.4.0/manifests/install.yaml
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017212957911.png)

> 一共需要拉取`3`个镜像（各版本拉取的镜像名称和版本可能都不一样，目前展示的是2.4.0版本的）：
> * `quay.io/argoproj/argocd:v2.4.0`
> * `ghcr.io/dexidp/dex:v2.30.2`
> * `redis:7.0.0-alpine`

#### 2.1.2  等待所有 Pod 启动并就绪

```bash
kubectl get pods -n argocd -o wide -w
```
等待 所有`argocd` 的 Pod 的状态变为 `Running`和`1/1`。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213007012.png)

### 2.2 Helm 方式部署

> 提前安装好`Helm`服务；

#### 2.2.1 添加 Argo CD 的 Helm 仓库并更新

```bash
# 添加 Argo CD 的 Helm 仓库
helm repo add argo https://argoproj.github.io/argo-helm

# 查看是否添加仓库成功
helm repo list

# 更新仓库
helm repo update
```
#### 2.2.2 使用 Helm 安装 Argo CD

```bash
# 创建命名空间
kubectl create ns argocd

# 查找所有的argocd版本并过滤需要安装的版本（查看Chart Version）
helm search repo argocd --versions  | grep 2.4.0

# 安装argocd（4.9.4为Chart的版本号）
helm install argocd argo/argo-cd --version=4.9.4 -n argocd --set server.insecure=true

# 安装完成进行查看
helm list -n argocd
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213009556.png)

#### 2.2.3  等待所有 Pod 启动并就绪
```bash
kubectl get pods -n argocd -o wide -w
```
等待 所有`argocd` 的 Pod 的状态变为 `Running`和`1/1`。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213018176.png)

### 2.3  获取初始管理员密码
Argo CD 安装后会自动生成一个 admin 用户的初始密码，存储在一个 Secret 中，使用如下命令获取出来。
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
```

### 2.4  访问 Argo CD UI
为了方便访问，可以将 `argocd-server` 服务类型修改为 `LoadBalancer` 或使用 `NodePort`。这里使用 `NodePort` 进行本地访问测试：
```bash
kubectl patch svc -n argocd argocd-server  -p '{"spec":{"type":"NodePort"}}'
```
* 修改完可以使用命令查看

```bash
kubectl get svc -n argocd argocd-server
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213019982.png)


然后在浏览器访问 `https://172.16.11.230:30436`（这个端口是nodeport的端口），使用用户名 `admin` 和上一步获取的密码登录。

登录上来就是这样的了；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213021879.png)

* 首次登录建议修改密码（不强制，不修改的话就是一直使用初始密码），修改的密码需大于8位数。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213157083.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213158623.png)





### 2.5 argocd CLI安装（客户端）（是否安装可选，不强制）
> 下载客户端时也需要和你安装的版本一致，否则可能导致登陆不了argocd等；
```bash
# Linux (直接下载二进制命令) - 下载最新版本
curl -sSL -o argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
# Linux (直接下载二进制命令) - 下载指定版本
curl -sSL -o argocd https://github.com/argoproj/argo-cd/releases/download/v2.4.0/argocd-linux-amd64

# 加执行权限
chmod +x argocd
# 移动到bin目录，这是一个命令
mv argocd /usr/local/bin/

# 验证安装
argocd version
```
* 常用 argocd CLI 命令

| 命令                           | 说明                |
| ------------------------------ | ------------------- |
| `argocd login <server>`        | 登录 Argo CD 服务器 |
|`argocd repo add <git address>`|添加仓库地址|
|`argocd repo list`|列出所有的仓库地址|
| `argocd app list`              | 列出所有应用        |
| `argocd app get <app-name>`    | 查看应用详情        |
| `argocd app sync <app-name>`   | 手动同步应用        |
| `argocd app create <app-name>` | 创建新应用          |
| `argocd app delete <app-name>` | 删除应用            |
| `argocd proj list`             | 列出所有项目        |
| `argocd account list`          | 列出所有账户        |

* 核心命令

```bash
# ========== 应用管理 ==========
argocd app list          # 查看所有应用
argocd app get <name>    # 查看应用详情
argocd app create <name> # 创建应用
argocd app sync <name>   # 手动同步（部署）
argocd app delete <name> # 删除应用

# ========== 项目管理 ==========
argocd proj list         # 查看所有项目
argocd proj get <name>   # 查看项目详情

# ========== 仓库管理 ==========
argocd repo list         # 查看已添加的仓库
argocd repo add <url>    # 添加 Git 仓库

# ========== 集群管理 ==========
argocd cluster list      # 查看管理的集群
argocd cluster add <ctx> # 添加外部集群
```

## 三、在GitLab上创建项目及令牌

### 3.1 创建项目
> GitLab官网地址：[https://jihulab.com/](https://jihulab.com/)
> 其他gitee也行，大同小异。

* 创建账号
* 新建项目 - 名字自定义 **（argocd）**
* 克隆项目到本地 **（windows、linux都行，需要安装git命令）**

```bash
git clone https://jihulab.com/ChenYangLiu/argocd.git
```

### 3.2 创建令牌
* 登录主页，点击头像 - 偏好设置

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213206659.png)

* 访问 - 个人访问令牌

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213237102.png)

* 生成令牌 - 旧版令牌

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213335697.png)
*   创建一个新令牌：
    *   **名称 (Name)**：可任意填写，例如 `argocd`。
    * **描述**：自定义（可写可不写）。
    * **到期时间**：根据自己项目时间定。
    *   **权限 (Scopes)**：勾选 `read_repository` (读取仓库) 、 `write_repository`（写仓库）、` READ API`权限。
    *   点击 **生成令牌**，**务必立即复制并保存**生成的令牌，它只显示一次。

创建完如图

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213338216.png)

## 四、配置gitlab信息并进行创建测试

### 4.1 使用 argocd CLI 配置gitlab
> 这里展示使用argocd cli配置；
> 也可以直接进入pod创建，省一步安装客户端，进入pod命令：`kubectl exec -it -n argocd argocd-server-********* -- bash`，进入pod之后从登录argocd开始就行，其他都是同样的操作；
```bash
# 1. 配置argocd-server端口转发（需要本地也可以访问到8080），需一直挂这，这边断了就访问不到argocd了。
kubectl port-forward svc/argocd-server -n argocd 8080:443

# 2. 登录 (默认用户名 admin，密码通过 kubectl 获取)
argocd login localhost:8080

# 3. 添加 Git 仓库
argocd repo add https://jihulab.com/your-org/your-repo.git --username <你的GitLab登录邮箱或用户名> --password <你的GitLab登录密码或令牌>

# 4. 使用命令查看添加的仓库
argocd repo list
```
添加完成之后也可以在`ArgoCD`页面看到；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213348374.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213349854.png)

### 4.2 创建应用测试


```bash
# 1. 创建应用
argocd app create my-app \
  --repo https://jihulab.com/your-org/your-repo.git \
  --path path/to/manifests \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace default
## path指定的路径，需要提前在gitlab仓库中创建好这个目录，否则会报错;
## dest-namespace指定的是本地的命名空间，需提前创建好；

# 2. 同步应用
argocd app sync my-app

# 3. 查看应用状态
argocd app get my-app
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213446599.png)

这时候就可以在`argocd`的应用程序页面看到此服务了；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213448761.png)

## 五、基于GitOps实现自动化CD
### 5.1 准备应用部署清单（Manifests）

Argo CD 需要一个 Git 仓库来存放你的 Kubernetes 部署清单。我的项目结构应类似于以下示例：

```bash
your-application-repo/                     # 项目仓库名称
├── argocd/                                # Argo CD 自动化配置（需手动kubectl apply）
│   ├── apps/                              # Application 定义（推荐拆分）
│   │   └── argocd-applications.yaml       # ApplicationSet（主配置）
│   ├── secret/                            # 仓库认证凭证
│   │   └── argocd-repo-secret.yaml        # Git 仓库认证 Secret
│   └── README.md                          # Argo CD 配置说明
├── manifests/                             # 业务应用清单目录，项目yaml都上传到此目录
│   ├── nginx/                             # Nginx 服务清单（结合自动化配置会自动将目录作为namespace）
│   │   ├── nginx-deployment.yaml
│   │   ├── nginx-configmap.yaml
│   │   └── nginx-service.yaml
│   └── README.md                          # 服务目录使用说明
├── .gitignore                             # Git 忽略文件
└── README.md                              # 项目总说明
```
### 5.2 部署 Argo CD 应用配置（一次性操作）
> Argo CD 通过 `ApplicationSet` 资源来定义如何从 Git 仓库同步到集群中，只需要部署一次，后续所有服务的新增、更新均由 Git 仓库变更自动触发。<br>
> 部署前，如果做了**第四步**，需要删除已经添加的仓库，测试程序可以删除，也可也不删除，但是git 仓库的信息必须删除（除非是不同的仓库信息）；

#### 5.2.1 配置展示
* `argocd-sync-applications.yaml`，需要修改的有：`仓库地址`、`分支`、`项目清单目录`。

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: argocd-applications
  namespace: argocd
spec:
  generators:
  - git:
      repoURL: https://jihulab.com/your-org/your-repo.git           # git仓库地址
      revision: main             # git的分支
      directories:
      - path: manifests/*        # 项目清单目录（扫描 manifests/ 下的所有子目录）
  template:
    metadata:
      name: '{{path.basename}}'  # 使用目录名作为应用名
    spec:
      project: default
      source:
        repoURL: https://jihulab.com/your-org/your-repo.git
        targetRevision: main
        path: '{{path}}'  # 动态使用完整路径（manifests/xxx）
      destination:
        server: https://kubernetes.default.svc      # 目标集群
        namespace: '{{path.basename}}'              # 自动获取到目录作为命名空间
      syncPolicy:
        automated:  # 自动同步配置
          prune: true     # 删除Git中已移除的资源
          selfHeal: true  # 自动修复集群状态漂移，安全配置：开启后，任何对集群的手工修改都会被自动恢复为 Git 中的状态。
        syncOptions:
        - CreateNamespace=true  # 自动创建命名空间(如果分NS)
```
* `argocd-sync-secret.yaml`，需要修改的有：`仓库地址`、`用户名`、`密码`。

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: gitlab-credentials
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: repository
type: Opaque
data:
  username: Msfqwer123123oM0BxcS5jb20K			# gitlab登录用户：base64
  password: AFhlNlA4SVRWY1lHS18x1231312jkhsifhqiwerqwqerqwMDQ4N2tsbwo== # gitlab登录密码或口令：base64
stringData:
  url: https://jihulab.com/your-org/your-repo.git
```

#### 5.2.2 部署配置到k8s集群中
* 部署
```bash
# 部署登录仓库信息
kubectl apply -f argocd-sync-secret.yaml

# 部署applicationset自动化
kubectl apply -f argocd-sync-applications.yaml
```
* 查看是否部署成功

```bash
# 查看仓库密钥（存在则正常）
kubectl  get secret -n argocd | grep gitlab

# 查看自动化程序（存在则正常）
kubectl  get applicationset -n argocd
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213727168.png)

添加完成仓库密钥之后在`ArgoCD`页面也可以看到；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213501611.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213741415.png)

现在，Argo CD 就会开始监控你的 Git 仓库，并自动将 `manifests` 目录下的 **部署清单、配置** 同步到集群中。


### 5.3 测试触发自动化部署
> 镜像需提前上传到`Harbor`中。
#### 5.3.1 拉取git仓库到本地（windows、linux都可以）
> 我是在windows上操作的，不管在哪操作都需要安装git；

```bash
git clone https://jihulab.com/your-org/your-repo.git
```
#### 5.3.2 将准备好的yaml放入要扫描的目录
* 可以在要扫描的目录新创建一个目录，这个目录会当作命名空间；
* 将准备好的yaml清单放入创建的目录中：`nginx-deployment.yaml`、`nginx-configmap.yaml`、`nginx-service.yaml`；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213754079.png)

#### 5.3.3 进行项目推送

```bash
git add .
git commit -m "部署nginx服务"
git push https://jihulab.com/your-org/your-repo.git
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213755836.png)
* 打开GitLab查看，确认推送成功

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213757985.png)
#### 5.3.4 查看是否自动部署

等一会（差不多3分钟左右开始触发，Argocd的默认检测机制，默认3分钟会去检查一次 Git 仓库是否有变更），登录Argocd页面，就可以看到有nginx服务了

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017213811040.png)

---

> 也可以先看`namespace`有没有创建，如果半天`namespace`没有创建，可能是那块有问题了。

* 命令查看nginx服务是否成功被部署：

```bash
# 查看namespace是否存在nginx
kubectl  get ns | grep nginx

# 查看cm是否存在nginx
kubectl get cm -n nginx

# 查看svc是否存在nginx
kubectl  get svc -n nginx

# 查看pod是否存在nginx
kubectl get pods -n nginx
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017214028782.png)

这里如果pod的nginx已经存在了，那么就可以直接去页面看了，至于有没有起来就是服务的问题了，我们现在只需要看有没有自动部署并且同步到`ArgoCD`中。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017214032354.png)

可以看到是部署成功的，点进去可以看到具体的nginx都部署了哪些东西；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261017214046404.png)

这样就可以看到，自动部署成功了。

#### 5.3.5 更新项目
> 更新项目就是修改yaml，然后重新推送git，到时候自动触发更新，进行更新；

## 六、其他操作
### 6.1 修改自动检测git仓库时间
1.  **编辑 `argocd-application-controller` 的 StatefulSet**：
```bash
kubectl edit statefulset -n argocd argocd-application-controller
```

2.  **在 `spec.template.spec.containers[0].args` 中找到 `--app-resync` 参数并修改它的值**：

```yaml
spec:
  containers:
  - command:
    - argocd-application-controller
    - --status-processors
    - "20"
    - --operation-processors
    - "10"
    - --app-resync
    - "180"			# 修改为自己想要调整的秒数。
```

修改完成保存退出，等待自动重启测试即可。
### 6.2 卸载Argo CD服务
> 卸载 Argo CD 的所有组件，卸载方式取决于部署方式。

* yaml方式

```bash
# 卸载最新版本
kubectl delete -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# 卸载指定版本（具体需要哪个版本可以进行修改版本号，当前是v2.4.0）
kubectl delete -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v2.4.0/manifests/install.yaml
```

* helm方式

```bash
helm uninstall -n argocd argocd
```



## 七、CI 建议
要使用CI，可以通过几种方式：
1. **shell脚本**：实现自动构建镜像、打标签、推送镜像、修改yaml、提交git
2. **Jenkins**：需单独部署`Jenkins`服务（实现步骤上述一致）
3. **GitLab CI Runner**：需单独部署`GitLab CI Runne` 服务（实现步骤上述一致）
4. **argo-workflows**：需单独部署维护一套`argo-wroflows`服务（实现步骤上述一致）

> **个人看点**：正常测试的时候肯定是手动构建镜像并测试，测试好没问题之后才开始进行推送 ，所以构建镜像这一步看自己需求，需不需要存在。



shell脚本如下：

> 脚本中需要修改的有：
> * 镜像仓库的地址、用户名、密码
> * git仓库的地址、用户名、密码

> 需要交互的有：
> * 镜像名称、标签
> * yaml地址

> 脚本可能有不是很完善的功能，请不要直接再**生产**环境使用。

```bash
#!/bin/bash

############################################################
# ArgoCD GitOps 自动发布脚本
#
# 功能：
# 1. 构建Docker镜像
# 2. 镜像Tag处理
# 3. 推送Harbor
# 4. 修改Kubernetes Deployment YAML镜像版本
# 5. 提交Git仓库
#
# 使用方式：
#   chmod +x deploy.sh
#   ./deploy.sh
#
############################################################

set -euo pipefail

########################
# 颜色输出
########################
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_separator() {
    echo "================================================"
}

########################
# 全局变量配置
########################

# Harbor配置
HARBOR_SERVER="${HARBOR_SERVER:-172.16.11.230:10010}"
HARBOR_PROJECT="${HARBOR_PROJECT:-library}"
HARBOR_USER="${HARBOR_USER:-admin}"
HARBOR_PASSWORD="${HARBOR_PASSWORD:-Harbor12345}"

# Git配置
GIT_REPOSITORY="${GIT_REPOSITORY:-http://git.example.com/demo/k8s-yaml.git}"
GIT_PATH="${GIT_PATH:-/opt/k8s-yaml}"
GIT_BRANCH="${GIT_BRANCH:-main}"

# YAML目录（可由用户输入）
YAML_PATH=""

# 镜像信息
IMAGE_NAME=""
IMAGE_TAG=""
HARBOR_IMAGE=""

# Deployment文件
DEPLOY_FILE=""


########################
# 基础检查
########################
check_command() {
    if ! command -v "$1" >/dev/null 2>&1; then
        log_error "未找到 $1 命令，请先安装"
        exit 1
    fi
}

check_environment() {
    print_separator
    log_info "开始检查环境..."
    
    check_command docker
    check_command git
    
    # 检查Docker是否运行
    if ! docker info >/dev/null 2>&1; then
        log_error "Docker服务未运行"
        exit 1
    fi
    
    log_success "环境检查完成"
}


########################
# 输入镜像信息
########################
get_image_info() {
    print_separator
    log_info "请输入镜像信息"
    
    while [[ -z "$IMAGE_NAME" ]]; do
        read -p "请输入镜像名称（例如：demo-service）: " IMAGE_NAME
        if [[ -z "$IMAGE_NAME" ]]; then
            log_warn "镜像名称不能为空，请重新输入"
        fi
    done
    
    while [[ -z "$IMAGE_TAG" ]]; do
        read -p "请输入镜像版本Tag（例如：v1.0.0）: " IMAGE_TAG
        if [[ -z "$IMAGE_TAG" ]]; then
            log_warn "镜像版本不能为空，请重新输入"
        fi
    done
    
    HARBOR_IMAGE="${HARBOR_SERVER}/${HARBOR_PROJECT}/${IMAGE_NAME}:${IMAGE_TAG}"
    
    echo ""
    log_info "最终镜像地址: ${HARBOR_IMAGE}"
}


########################
# Docker构建镜像
########################
build_image() {
    print_separator
    log_info "开始构建镜像..."
    
    if [[ ! -f "Dockerfile" ]]; then
        log_error "当前目录未找到Dockerfile"
        exit 1
    fi
    
    if docker build -t "${HARBOR_IMAGE}" .; then
        log_success "镜像构建成功"
    else
        log_error "镜像构建失败"
        exit 1
    fi
}


########################
# 登录Harbor
########################
harbor_login() {
    print_separator
    log_info "登录Harbor: ${HARBOR_SERVER}"
    
    if echo "${HARBOR_PASSWORD}" | docker login \
        "${HARBOR_SERVER}" \
        -u "${HARBOR_USER}" \
        --password-stdin >/dev/null 2>&1; then
        log_success "Harbor登录成功"
    else
        log_error "Harbor登录失败，请检查用户名和密码"
        exit 1
    fi
}


########################
# 推送镜像
########################
push_image() {
    print_separator
    log_info "开始推送镜像..."
    
    if docker push "${HARBOR_IMAGE}"; then
        log_success "镜像推送完成"
    else
        log_error "镜像推送失败"
        exit 1
    fi
}


########################
# 获取YAML目录
########################
get_yaml_path() {
    print_separator
    
    while [[ -z "$YAML_PATH" ]]; do
        read -p "请输入YAML目录（例如：manifests/demo）: " YAML_PATH
        if [[ -z "$YAML_PATH" ]]; then
            log_warn "YAML目录不能为空，请重新输入"
        fi
    done
    
    # 处理相对路径
    if [[ ! "$YAML_PATH" = /* ]]; then
        YAML_PATH="${GIT_PATH}/${YAML_PATH}"
    fi
    
    if [[ ! -d "${YAML_PATH}" ]]; then
        log_error "YAML目录不存在: ${YAML_PATH}"
        exit 1
    fi
    
    log_info "YAML目录: ${YAML_PATH}"
}


########################
# 查找并修改Deployment
########################
modify_deployment() {
    print_separator
    log_info "查找Deployment..."
    
    # 使用临时文件存储查找结果（兼容性更好的方式）
    local temp_file=$(mktemp)
    grep -rl "kind: Deployment" "${YAML_PATH}" 2>/dev/null > "$temp_file" || true
    
    # 读取到数组
    DEPLOY_FILES=()
    while IFS= read -r file; do
        if [[ -n "$file" ]]; then
            DEPLOY_FILES+=("$file")
        fi
    done < "$temp_file"
    
    rm -f "$temp_file"
    
    local count=${#DEPLOY_FILES[@]}
    
    if [[ $count -eq 0 ]]; then
        log_error "在 ${YAML_PATH} 中未找到任何Deployment"
        exit 1
    fi
    
    if [[ $count -eq 1 ]]; then
        DEPLOY_FILE="${DEPLOY_FILES[0]}"
        log_info "找到Deployment: ${DEPLOY_FILE}"
    else
        log_warn "发现多个Deployment:"
        for i in "${!DEPLOY_FILES[@]}"; do
            echo "  [$((i+1))] ${DEPLOY_FILES[$i]}"
        done
        
        local selection
        while true; do
            read -p "请选择Deployment编号 [1-${count}]: " selection
            if [[ "$selection" =~ ^[0-9]+$ ]] && \
               [[ $selection -ge 1 ]] && \
               [[ $selection -le $count ]]; then
                DEPLOY_FILE="${DEPLOY_FILES[$((selection-1))]}"
                break
            else
                log_warn "无效选择，请输入 1-${count} 之间的数字"
            fi
        done
    fi
    
    # 备份并修改
    log_info "修改文件: ${DEPLOY_FILE}"
    
    # 创建备份
    cp "${DEPLOY_FILE}" "${DEPLOY_FILE}.bak"
    log_info "已创建备份: ${DEPLOY_FILE}.bak"
    
    # 替换镜像（使用更精确的匹配）
    if sed -i "s#image: .*#image: ${HARBOR_IMAGE}#g" "${DEPLOY_FILE}"; then
        log_success "YAML修改完成"
    else
        log_error "YAML修改失败"
        # 恢复备份
        cp "${DEPLOY_FILE}.bak" "${DEPLOY_FILE}"
        exit 1
    fi
    
    # 显示修改结果
    echo ""
    log_info "修改后的镜像配置:"
    grep "image:" "${DEPLOY_FILE}" | head -5
}


########################
# Git处理
########################
handle_git() {
    print_separator
    log_info "开始Git处理..."
    
    # 检查或克隆仓库
    if [[ ! -d "${GIT_PATH}/.git" ]]; then
        log_warn "Git目录不存在或不是Git仓库: ${GIT_PATH}"
        read -p "是否重新克隆仓库? (yes/no): " confirm
        if [[ "$confirm" != "yes" ]]; then
            log_info "取消操作"
            exit 0
        fi
        
        # 备份旧目录
        if [[ -d "${GIT_PATH}" ]]; then
            mv "${GIT_PATH}" "${GIT_PATH}.bak.$(date +%Y%m%d%H%M%S)"
        fi
        
        log_info "克隆仓库: ${GIT_REPOSITORY}"
        if git clone "${GIT_REPOSITORY}" "${GIT_PATH}"; then
            log_success "仓库克隆成功"
        else
            log_error "仓库克隆失败"
            exit 1
        fi
    fi
    
    # 切换到工作目录
    cd "${GIT_PATH}" || exit 1
    
    # 拉取最新代码
    log_info "拉取最新代码..."
    git pull origin "${GIT_BRANCH}" 2>/dev/null || log_warn "拉取失败，继续执行"
    
    # 显示状态
    echo ""
    log_info "Git当前状态:"
    git status --short
    
    # 查看改动
    echo ""
    log_info "文件变更:"
    if ! git diff --stat; then
        log_info "无文件变更"
    fi
    
    # 确认提交
    echo ""
    read -p "是否提交并推送Git? (yes/no): " CONFIRM
    if [[ "${CONFIRM}" != "yes" ]]; then
        log_info "取消提交，操作结束"
        exit 0
    fi
    
    # 提交代码
    log_info "提交代码..."
    git add .
    
    if git commit -m "chore: update image to ${HARBOR_IMAGE}"; then
        log_success "提交成功"
    else
        log_warn "没有需要提交的变更"
    fi
    
    # 推送代码
    log_info "推送代码到远程仓库..."
    if git push origin "${GIT_BRANCH}"; then
        log_success "Git推送成功"
    else
        log_error "Git推送失败"
        exit 1
    fi
}


########################
# 显示总结信息
########################
show_summary() {
    print_separator
    log_success "发布流程完成！"
    echo ""
    log_info "部署信息:"
    echo "  - 镜像地址: ${HARBOR_IMAGE}"
    echo "  - YAML文件: ${DEPLOY_FILE:-未指定}"
    echo "  - Git仓库: ${GIT_PATH}"
    echo "  - Git分支: ${GIT_BRANCH}"
    echo ""
    log_info "等待ArgoCD自动同步..."
    print_separator
}


########################
# 主函数
########################
main() {
    # 显示欢迎信息
    print_separator
    echo "  ArgoCD GitOps 自动发布脚本 v1.0"
    print_separator
    
    # 执行流程
    check_environment
    get_image_info
    build_image
    harbor_login
    push_image
    get_yaml_path
    modify_deployment
    handle_git
    show_summary
}

# 捕获Ctrl+C
trap 'echo ""; log_warn "用户取消操作"; exit 0' INT

# 执行主函数
main "$@"
```













