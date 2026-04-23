---
title: k8s之镜像拉取策略
icon: circle-info
order: 1
category:
  - Linux
  - kubernetes
tag:
  - Linux
  - kubernetes
  - 运维
date: 2026-04-21
pageview: true
article: true
breadcrumb: false
isOriginal: true
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
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231435499.png)

## 一、三种镜像拉取策略

| 策略值 | 行为描述 | 适用场景 |
|--------|----------|----------|
| `Always` | **总是**从远程仓库拉取最新镜像，即使本地已存在 | 使用 `:latest` 标签或开发环境需频繁更新 |
| `IfNotPresent` | 本地**不存在**时才拉取，本地有则直接使用 | 生产环境使用固定版本标签（默认策略） |
| `Never` | **永不**拉取远程镜像，仅使用本地已存在的镜像 | 离线环境、预加载镜像、本地调试 |

## 二、策略示例
### 2.1 IfNotPresent 拉取策略
> `IfNotPresent` 拉取策略：本地不存在时才会去官方仓库拉取，本地存在时拉取本地的镜像，**也是默认的拉取策略**

* nginx deployment 示例：
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: nginx
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.25.0
        # 默认不写拉取策略也是这个
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80
```


### 2.2 Always 拉取策略
> `Always` 拉取策略：总是从镜像仓库拉取，再yaml中可以直接配置要拉取的地址，例如：`registry.cn-hangzhou.aliyuncs.com/myrepo/nginx:1.24`，就会每次运行时都要从这个仓库拉取镜像，一般拉取镜像地址为自己搭建的`harbor`仓库或`云仓库`，适用于内外网生产环境使用，确保每次拉取都是最新的镜像；

* nginx deployment 示例：
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: nginx
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.25.0
        imagePullPolicy: Always
        ports:
        - containerPort: 80
```
### 2.3 Never 拉取策略
> `Never` 拉取策略：总是从本地拉取镜像，不去远程仓库进行拉取；适用于自定义镜像及内网环境开发使用；

* nginx deployment 示例：
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: nginx
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.25.0
        imagePullPolicy: Never
        ports:
        - containerPort: 80
```


## 三、默认策略的隐式规则

K8s 会根据 **image 标签** 自动选择默认策略：

| 镜像标签 | 默认策略 |
|----------|----------|
| `:latest` 或 **无标签** | `Always` |
| 具体版本（如 `:v1.2.3`） | `IfNotPresent` |

> ⚠️ **陷阱警告**：使用 `:latest` 时，即使本地有镜像，每次创建 Pod 都会强制拉取，可能导致启动延迟或拉取失败。
> ❗ 如果是自己指定的拉取策略，会完全遵循指定的拉取策略

## 四、私有仓库镜像拉取
> 适用于`Always`和`IfNotPresent`两种策略，多数用于：`Always`策略中；


> 当镜像存储在私有仓库（如 `Harbor`、`阿里云 ACR`）时，需要配置 `imagePullSecrets`：

### 步骤 1：创建 Secret
命令行创建 docker-registry 类型的 Secret；
```bash
kubectl create secret docker-registry registry-secret \
  --docker-server=172.16.10.24 \
  --docker-username=admin \
  --docker-password=Harbor12345 \
  -n default
```
查看创建好的secret

```bash
kubectl get secret
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231435145.png)

### 步骤 2：在 Pod/Deployment 中引用
```yaml
spec:
  imagePullSecrets:
  - name: registry-secret   # 引用上面创建的 Secret
  containers:
  - name: nginx
    image: 172.16.10.24:10010/library/nginx:1.25.0
```
完整的内容：
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: nginx
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      imagePullSecrets:
        - name: registry-secret   # 引用上面创建的 Secret
      containers:
      - name: nginx
        # 镜像仓库中的镜像地址
        image: 172.16.10.24:10010/library/nginx:1.25.0
        imagePullPolicy: Always
        ports:
        - containerPort: 80
```
创建运行nginx的deployment

```bash
# yaml文件名称自定义
kubectl apply -f nginx-always.yaml
# 查看pod运行状态
kubectl get pod -n nginx
# 查看nginx pod的创建日志，是否是拉取的镜像
kubectl describe pod -n nginx nginx-deployment-5d5d699957-959kc | grep -iA10 events
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231435115.png)




### 步骤 3：配置默认 Secret（可选）
为命名空间下所有 Pod 自动添加：
```bash
kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "registry-secret"}]}' -n nginx
```

## 五、故障排查

| 现象 | 原因 | 解决 |
|------|------|------|
| ImagePullBackOff | 镜像不存在/认证失败 | 检查镜像地址、Secret、网络 |
| ErrImageNeverPull | 本地无镜像 | 节点上 docker load 导入 |
| 权限拒绝 | Secret 错误 | 检查 username/password/server |
