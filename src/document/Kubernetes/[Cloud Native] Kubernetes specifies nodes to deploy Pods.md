---
title: 【云原生】Kubernetes 指定节点部署 Pod
icon: circle-info
order: 1
category:
  - Linux
  - kubernetes
tag:
  - Linux
  - kubernetes
  - 运维
date: 2025-12-08
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


## 前言
> 在 Kubernetes 集群中，Pod 的调度默认是根据一定的规则自动分配到各个节点上。然而，在一些特定的业务场景下，我们可能需要将 Pod 部署到指定的节点上，以满足特定的资源需求或部署策略。本文将介绍如何绑定pod到指定的节点上部署及使用方法；

## 一、指定节点的几种方法

| 方法名称  | 原理 | 适用场景  | 注意事项 |
|--|--|--|--|
| **nodeName**  | 直接在 Pod 配置中指定节点名称，Pod 将被调度到该节点上。|   - 单节点部署<br>- 快速测试                                               | - 只能指定一个节点<br>- 节点不存在时 Pod 无法启动|
| **nodeSelector**  | 通过节点的标签选择目标节点，Pod 将被调度到匹配标签的节点上。| - 多节点部署<br>- 根据节点特性（如主机、自定义标签）部署 | - 标签必须预先添加到节点上<br>- 无匹配节点时 Pod 等待调度  |



**方法说明**
1. **nodeName**：最简单直接的方法，但灵活性较差，**硬亲和，在使用节点隔离时不受影响**。
2. **nodeSelector**：可通过标签选择节点，适用于多节点部署，**软亲和，在使用节点隔离时会受影响**。

根据实际需求选择合适的方法，可以灵活地实现 Pod 的调度策略。

## 二、nodeName
### 2.1 写法
```yaml
nodeName: k8s-node2
```
> 需在部署的yaml文件中，containers上面，spec下面添加指定节点名称；
> 需注意格式，yaml对格式较严格；

### 2.2 实现
#### 2.2.1 编辑 deployment 配置文件

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
      # 指定运行的节点
      nodeName: k8s-node2
      containers:
      - name: nginx
        image: nginx:1.24.0
        ports:
        - containerPort: 80
        resources:         
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "500m"
            memory: "256Mi"
```

#### 2.2.2 运行创建pod进行测试

```bash
kubectl apply -f nginx-deployment.yaml
```

#### 2.2.3 验证

```bash
kubectl get pods -n nginx -o wide
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180943957.png)
可以看到nginx服务已经在k8s-node2上启动了，证明成功了；


## 三、nodeSelector

> `nodeSelector`与 `nodeName` 不同，`nodeSelector` 是通过节点的标签（label）来选择目标节点的。这种方法更加灵活，可以将 Pod 部署到具有特定标签的单个或多个节点上。
### 3.1 写法
* 根据主机名标签来指定节点

```yaml
nodeSelector:
  kubernetes.io/hostname: k8s-node1
```
* 根据自定义标签来指定节点
> 自定义标签需先手动加入`labels`。
```yaml
nodeSelector:
  type: nginx-cluster
```
> 需在部署的yaml文件中，containers上面，spec下面添加指定节点名称；
> 需注意格式，yaml对格式较严格；

### 3.2 支持的标签类型

1. **自定义标签**：可以根据自己需求为任意节点添加任意的自定义标签。
   - 示例：`custom-label: custom-value`

2. **内置标签**：Kubernetes 自带了一些内置的标签，这些标签通常用于描述节点的属性。
   - **`kubernetes.io/hostname`**：节点的主机名（**最常用**）。
   - **`kubernetes.io/os`**：节点的操作系统类型（如 `linux` 或 `windows`）。
   - **`kubernetes.io/arch`**：节点的架构类型（如 `amd64` 或 `arm64`）。
   - **`topology.kubernetes.io/region`**：节点所在的区域。
   - **`topology.kubernetes.io/zone`**：节点所在的可用区。
   - **`node.kubernetes.io/instance-type`**：节点的实例类型（如云服务提供商的实例类型）。

3. **其他常见标签**：
   - **`disktype`**：节点的磁盘类型（如 `ssd` 或 `hdd`）。
   - **`environment`**：节点的环境类型（如 `production` 或 `staging`）。
   - **`role`**：节点的角色（如 `worker` 或 `master`）。

---
* [x] **注意事项**

1、**标签必须预先存在**：在使用 `nodeSelector` 之前，必须确保目标节点上已经添加了相应的标签。否则，Pod 无法被调度到任何节点上。
2、**标签的唯一性**：虽然 `nodeSelector` 允许使用多个键值对，但每个键只能有一个值。如果需要更复杂的匹配逻辑，可以使用 `nodeAffinity`。
3、**兼容性**：确保标签的键和值符合 Kubernetes 的标签规范（如长度限制、字符限制等）。

>查看标签是否存在，可使用如下命令查看：
```bash
# 二选一即可
kubectl describe nodes k8s-node1 | grep -iA10 labels
kubectl get nodes k8s-node2 --show-labels
```

---

### 3.3 实例
#### 3.3.1 根据主机名标签来指定节点
> 为了和上面的演示区分，这里我改成`k8s-node1`节点；
>
> *  编辑 deployment 配置文件

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
      # 指定运行的节点
      nodeSelector:
         kubernetes.io/hostname: k8s-node1
      containers:
      - name: nginx
        image: nginx:1.24.0
        ports:
        - containerPort: 80
        resources:         
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "500m"
            memory: "256Mi"
```

*  运行创建pod进行测试

```bash
kubectl apply -f nginx-deployment.yaml
```

* 验证

```bash
kubectl get pods -n nginx -o wide
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180943500.png)

可以看到nginx服务已经在`k8s-node1`上启动了，证明成功了；

#### 3.3.2 根据自定义标签来指定节点
* 首先，我们需要对想部署的节点打个标签（例如，`k8s-node1、k8s-node2`节点）

```bash
kubectl label nodes k8s-node1 k8s-node2 type=nginx-cluster
```
* 确认标签是否生效

```bash
# 查看node1、node2节点是否多了一个type类型的标签
kubectl get nodes --show-labels
# 或者查询有type=nginx-cluster标签的节点
kubectl get nodes -l type=nginx-cluster
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180943608.png)
* 成功生效之后，开始修改配置文件

> -  开3个副本，方便观察pod的节点指向
> - 使用自定义标签来指定节点
```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: nginx
  labels:
    app: nginx
spec:
  # 副本数可以多开几个
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      # 根据type=nginx-cluster标签来自定义随机节点
      nodeSelector:
         type: nginx-cluster
      containers:
      - name: nginx
        image: nginx:1.24.0
        ports:
        - containerPort: 80
        resources:         
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "500m"
            memory: "256Mi"
```
* 运行创建pod进行测试

```bash
kubectl apply -f nginx-deployment.yaml
```
* 验证

```bash
kubectl get pods -n nginx -o wide
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180943210.png)

> 这样根据自定义标签（多台node），就会随机到任意一台节点上；

## 四、总结

在 Kubernetes 中，根据实际需求选择合适的 Pod 调度方法非常重要。`nodeName` 方法简单直接，适用于将 Pod 部署到单个指定节点的场景；而 `nodeSelector` 方法则更加灵活，可以通过标签匹配将 Pod 部署到多个符合条件的节点上。在实际使用中，可以根据业务需求和集群的配置情况，选择最适合的方法来实现 Pod 的指定节点部署。

