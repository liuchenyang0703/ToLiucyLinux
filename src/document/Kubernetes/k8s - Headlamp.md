---
title: k8s 部署 Headlamp
icon: circle-info
order: 1
category:
  - Linux
  - kubernetes
tag:
  - Linux
  - kubernetes
  - 仪表盘
  - yaml
  - 运维
date: 2026-07-13
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


## 一、Headlamp 是什么？
>  Headlamp 是一个开源的、可扩展的 Kubernetes 图形化用户界面 (Web UI)，你可以把它看作是 Kubernetes Dashboard 的现代化、功能更强大的继任者；

> 随着官方 Dashboard 项目进入维护状态，Headlamp 由 Kubernetes SIG 持续迭代与维护，目前已成为社区中更活跃、更具前瞻性的集群管理界面方案。



简单理解：
Headlamp 就是 Kubernetes Dashboard 的下一代接班人。
与传统 Dashboard 相比，Headlamp 具备明显优势：
* 界面更现代，交互更友好
* 资源展示更清晰、信息组织更合理
* 支持插件扩展机制，能力可按需增强
* 原生支持多集群统一管理
*  社区持续活跃，版本迭代稳定

正因如此，Headlamp 正逐步成为 Kubernetes 官方推荐的图形化管理工具之一。

> 官方文档：[https://headlamp.dev/](https://headlamp.dev/)

## 二、Headlamp 的部署

部署环境：
* kubernetes集群版本：`1.20.10`
* Helm版本：`3.8.0`
### 2.1 yaml 方式部署

#### 2.1.1 获取yaml
> 可以下载官方yaml：[headlamp官方yaml](https://raw.githubusercontent.com/kubernetes-sigs/headlamp/main/kubernetes-headlamp.yaml)
> 也可以使用下面我修改过的yaml，和官方yaml对比，修改了：<font color=red>1、新增了ns；2、svc字段为NodePort暴露方式；3、所有的命名空间为`headlamp`；4、镜像版本（适配当前k8s版本）</font>

* `vim headlamp.yaml`
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: headlamp
---
apiVersion: v1
kind: Service
metadata:
  name: headlamp
  namespace: headlamp
spec:
  type: NodePort
  selector:
    k8s-app: headlamp
  ports:
    - name: headlamp
      port: 80
      targetPort: 4466
      nodePort: 32019
      protocol: TCP
---
kind: Deployment
apiVersion: apps/v1
metadata:
  name: headlamp
  namespace: headlamp
spec:
  replicas: 1
  selector:
    matchLabels:
      k8s-app: headlamp
  template:
    metadata:
      labels:
        k8s-app: headlamp
    spec:
      containers:
        - name: headlamp
          image: ghcr.io/headlamp-k8s/headlamp:v0.39.0
          args:
            - "-in-cluster"
            - "-plugins-dir=/headlamp/plugins"
          env:
            - name: HEADLAMP_CONFIG_TRACING_ENABLED
              value: "true"
            - name: HEADLAMP_CONFIG_METRICS_ENABLED
              value: "true"
            - name: HEADLAMP_CONFIG_OTLP_ENDPOINT
              value: "otel-collector:4317"
            - name: HEADLAMP_CONFIG_SERVICE_NAME
              value: "headlamp"
            - name: HEADLAMP_CONFIG_SERVICE_VERSION
              value: "latest"
          ports:
            - containerPort: 4466
              name: http
            - containerPort: 9090
              name: metrics
          readinessProbe:
            httpGet:
              scheme: HTTP
              path: /
              port: 4466
            initialDelaySeconds: 30
            timeoutSeconds: 30
          livenessProbe:
            httpGet:
              scheme: HTTP
              path: /
              port: 4466
            initialDelaySeconds: 30
            timeoutSeconds: 30
      nodeSelector:
        'kubernetes.io/os': linux
---
kind: Secret
apiVersion: v1
metadata:
  name: headlamp-admin
  namespace: headlamp
  annotations:
    kubernetes.io/service-account.name: "headlamp-admin"
type: kubernetes.io/service-account-token
```
#### 2.1.2 安装 Headlamp

* 安装 Headlamp
```bash
kubectl apply -f headlamp.yaml
```
* 检查是否创建成功

```bash
# 检查命名空间是否创建成功
kubectl get ns -A | grep headlamp
# 检查headlamp的pod是否运行正常（READY状态为1/1正常）
kubectl get pods -n headlamp -o wide
# 检查svc是否创建成功
kubectl get svc -n headlamp
# 检查secret是否创建成功
kubectl get secret -n headlamp
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241742223.png)

#### 2.1.3 创建访问 ServiceAccount 和 ClusterRoleBinding
Headlamp 需要知道以谁的身份来访问集群。我们可以创建一个管理员级别的 `ServiceAccount` 来获得完整视图（仅供初始管理和学习使用，生产环境请遵循最小权限原则）。

* 编辑 RBAC权限

`vim headlamp-rbac.yaml`

```bash
apiVersion: v1
kind: ServiceAccount
metadata:
  name: headlamp
  namespace: headlamp
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: headlamp-admin
  namespace: headlamp
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: headlamp
    namespace: headlamp
```

* 创建RBAC权限

```bash
kubectl apply -f headlamp-rbac.yaml
```
* 检查RBAC权限

```bash
# 检查ServiceAccount是否存在headlamp
kubectl get sa -n headlamp | grep -i headlamp
# 检查所有ClusterRoleBinding是否存在headlamp
kubectl get clusterrolebinding | grep headlamp
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241742350.png)

#### 2.1.4 获取Token（通用）
> <font color=red>**获取好的token，请保存好，登录 Headlamp 需要 ！！！**</font>
> <font color=red>**获取好的token，请保存好，登录 Headlamp 需要 ！！！**</font>
> <font color=red>**获取好的token，请保存好，登录 Headlamp 需要 ！！！**</font><br>
> 官方获取token文档：[https://headlamp.dev/docs/latest/installation/#create-a-service-account-token](https://headlamp.dev/docs/latest/installation/#create-a-service-account-token)


* [x]  Kubernetes v1.24版本及<font color=red>以上</font>可采用此方法来获取token
```bash
kubectl create token headlamp -n headlamp
```
> 默认失效为1小时，可以通过添加参数来延长时间：`--duration=8760h`；
> 从Secret中解码出来的Token是永不过期的；

* [x] Kubernetes v1.24版本<font color=red>以下</font>可采用此方法来获取token

```bash
# 查看secret是否存在headlamp
kubectl get secret -n headlamp | grep headlamp
# 正常情况下会有一个类似 headlamp-token-xxxxx 的 Secret。
# 如果存在可使用如下命令提取token
kubectl get secret headlamp-token-pf6nj -n headlamp -o jsonpath='{.data.token}' | base64 --decode
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241742135.png)

---

> 如果没找到关联的 Secret，就手动创建一个

```bash
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Secret
metadata:
  name: headlamp-token
  namespace: headlamp
  annotations:
    kubernetes.io/service-account.name: headlamp
type: kubernetes.io/service-account-token
EOF
```
然后从新创建的 Secret 中获取 token；

```bash
kubectl get secret headlamp-token -n headlamp -o jsonpath='{.data.token}' | base64 --decode
```
---




### 2.2 Helm 方式部署
> 需提前安装好`Helm`，没有安装的可参考：[K8s - Helm管理工具](https://liucy.blog.csdn.net/article/details/161394380)

#### 2.2.1 添加并更新 Helm 仓库
```bash
# 添加headlamp仓库
helm repo add headlamp https://kubernetes-sigs.github.io/headlamp/
# 更新仓库
helm repo update
```
#### 2.2.2 安装 Headlamp 
> 由于默认安装最新版本，我的`kubernetes`版本不支持，所以只能选择其他版本进行安装，大家可根据自己的kuberntes版本来进行对应的headlamp版本安装；

* 查看所有`headlamp`版本

```bash
helm search repo headlamp/headlamp --versions
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241742672.png)

* 找到适配自己版本的`headlamp`进行安装；

```bash
helm install headlamp headlamp/headlamp --version=0.39.0 -n headlamp --create-namespace
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241742554.png)


* 安装完成进行查看是否运行正常

```bash
# 查看 headlamp 的heml是否正常
helm list -n headlamp

# 查看 headlamp 命名空间下的pod、deployment、svc是否都运行正常
kubectl get all -n headlamp -o wide
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241742247.png)


> 可以看到都运行成功了，但是`svc`的网络模式是`ClusterIP`，是无法再外网访问到的，所以我们需要修改一下`headlamp`的`svc`的网络模式改为`NodePort`；

* 修改`headlamp`的`svc`的网络模式改为`NodePort`；

```bash
kubectl edit svc -n headlamp

# 二选一，第一种可以更直观的看到yaml内容

kubectl patch svc -n headlamp headlamp -p '{"spec":{"type":"NodePort"}}'
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241742730.png)
* 修改完成之后，再次查看`headlamp的svc`，就可以看到`Port`的`80`后面多了一个`3开头`的端口，这是随机生成的对外访问的端口，这时候就可以通过`集群任意ip:32019`去访问页面了；

> 这个端口是随机生成的，或者是自己也可以指定NodePort的端口，但是需要在`30000-32767`之间；

```bash
kubectl get svc -n headlamp
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241742606.png)

#### 2.2.3 创建访问 ServiceAccount 和 ClusterRoleBinding

> 通过 Helm 部署 Headlamp 时，Chart 默认会自动创建所需的 ServiceAccount 和 RBAC 授权，我们可以通过如下命令进行查看；

```bash
kubectl get sa -n headlamp

kubectl get ClusterRoleBinding | grep headlamp
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241741883.png)

#### 2.2.4 获取Token（通用）
> <font color=red>**获取好的token，请保存好，登录 Headlamp 需要 ！！！**</font>
> <font color=red>**获取好的token，请保存好，登录 Headlamp 需要 ！！！**</font>
> <font color=red>**获取好的token，请保存好，登录 Headlamp 需要 ！！！**</font><br>
> 官方获取token文档：[https://headlamp.dev/docs/latest/installation/#create-a-service-account-token](https://headlamp.dev/docs/latest/installation/#create-a-service-account-token)


* [x]  Kubernetes v1.24版本及<font color=red>以上</font>可采用此方法来获取token
```bash
kubectl create token headlamp -n headlamp
```
> 默认失效为1小时，可以通过添加参数来延长时间：`--duration=8760h`；
> 从Secret中解码出来的Token是永不过期的；

* [x] Kubernetes v1.24版本<font color=red>以下</font>可采用此方法来获取token

```bash
# 查看secret是否存在headlamp
kubectl get secret -n headlamp | grep headlamp
# 正常情况下会有一个类似 headlamp-token-xxxxx 的 Secret。
# 如果存在可使用如下命令提取token
kubectl get secret headlamp-token-pf6nj -n headlamp -o jsonpath='{.data.token}' | base64 --decode
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241741794.png)

---

> 如果没找到关联的 Secret，就手动创建一个

```bash
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Secret
metadata:
  name: headlamp-token
  namespace: headlamp
  annotations:
    kubernetes.io/service-account.name: headlamp
type: kubernetes.io/service-account-token
EOF
```
然后从新创建的 Secret 中获取 token；

```bash
kubectl get secret headlamp-token -n headlamp -o jsonpath='{.data.token}' | base64 --decode
```
---

## 三、页面访问

### 3.1 访问页面并填写Token
> 访问页面：`任意集群IP:32019`，输入刚刚获取的token；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241741937.png)

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241741846.png)


![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241741652.png)

### 3.2 中文页面切换
> 简体中文是在0.35.0版本开始支持的

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241741997.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241741700.png)

### 3.3 功能展示
#### 3.3.1 集群

> 集群中包含以下主要功能模块：
> *   **命名空间**：显示当前集群中的所有命名空间列表。
> *   **节点**：展示集群中所有节点的资源使用情况（如CPU、内存）和状态。
> * **高级搜索**：提供类JavaScript语法的查询功能，支持通过标签（Labels）和注解（Annotations）等条件，对集群资源进行精确、快速的筛选（Beta功能）。


![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241741423.png)


#### 3.3.2 资源全景图

> *   **资源全景图**：以**分组视图**展示集群核心资源的总览，默认按 **“Workloads”、“存储”、“网络”** 等类别对资源进行分组，每个分组下显示具体资源类型（如 Deployment、DaemonSet、Service、PVC 等）及其数量/状态。该视图帮助用户快速掌握集群资源的整体分布与健康状态。


![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241741062.png)

#### 3.3.3 工作负载

> 工作负载中包含以下主要功能模块：
> *   **Pods**：显示集群中所有 Pod 的运行状态（如运行中、待处理）和数量，并可查看每个 Pod 的详细信息和日志。
> *   **Deployments**：展示 Deployment 的副本状态、更新策略和滚动更新历史，支持扩缩容和版本回滚操作。
> *   **StatefulSets**：管理有状态应用的副本数、持久化存储和有序启动/更新策略。
> *   **DaemonSets**：展示在每个节点上运行的守护进程型 Pod 的状态和覆盖情况。
> *   **ReplicaSets**：查看由 Deployment 或其他控制器管理的 Pod 副本集状态，主要用于排查历史版本问题。
> *   **Jobs**：显示一次性任务（Job）的执行状态（完成、失败、运行中），用于批处理场景。
> *   **CronJobs**：展示周期性定时任务的调度规则和执行历史，用于定期任务自动化。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241741321.png)


#### 3.3.4 存储

> 存储中包含以下主要功能模块：
> *   **持续性卷宣告**：展示集群中所有 PVC（PersistentVolumeClaim，持久化存储声明）的列表，包含其绑定的 PV、容量、访问模式和状态等信息。
> *   **持续性卷**：显示集群中所有 PV（PersistentVolume，持久化存储卷）的资源详情和状态。
> *   **存储类别**：查看和管理 StorageClass 存储类，用于定义动态存储供应的策略和参数。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241741944.png)


#### 3.3.5 网络

> 网络中包含以下主要功能模块：
> *   **Services**：展示集群中所有 Service（服务）的列表，包含类型（如 ClusterIP、NodePort）、ClusterIP、端口映射和选择器等信息。
> *   **端点**：查看 Service 后端关联的实际 Pod IP 和端口列表，用于验证服务是否正常转发流量。
> *   **Endpoint Slices**：展示 EndpointSlice 资源，用于更高效地管理大规模集群中 Service 的后端端点。
> *   **Ingresses**：管理 Ingress 资源，定义外部访问集群服务的路由规则（如域名、路径转发）。
> *   **Ingress 类别**：查看 IngressClass 资源，用于标识和选择不同的 Ingress 控制器实现。
> *   **网络策略**：管理 NetworkPolicy 资源，定义 Pod 之间的网络访问控制规则（如入站/出站流量白名单）。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241740307.png)


#### 3.3.6 网关

> 网关（Beta）中包含以下主要功能模块：
> *   **网关**：展示 Gateway 资源列表，定义流量入口的配置（如监听协议、端口）。
> *   **网关类别**：查看 GatewayClass 资源，用于定义和选择不同的 Gateway 控制器实现。
> *   **HTTP路由**：管理 HTTPRoute 资源，定义 HTTP/HTTPS 流量的路由规则（如域名匹配、路径转发）。
> *   **GRPC路由**：管理 GRPCRoute 资源，定义 gRPC 流量的路由规则。
> *   **Reference Grants**：查看 ReferenceGrant 资源，用于跨命名空间引用资源时的授权管理。
> *   **BackendTLS Policies**：管理 BackendTLSPolicy 资源，定义与后端服务建立 TLS 连接的安全策略。
> *   **BackendTrafficPolicies**：管理 BackendTrafficPolicy 资源，定义后端流量的高级策略（如负载均衡、重试）。


![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241740372.png)

#### 3.3.7 安全

> 安全中包含以下主要功能模块：
> *   **服务账户**：展示集群中所有的 ServiceAccount（服务账户）列表，用于为 Pod 提供身份认证。
> *   **角色**：查看 Role 资源，用于在命名空间级别定义操作权限（如对 Pod、Service 的增删改查）。
> *   **角色绑定**：管理 RoleBinding 资源，用于将 Role 或 ClusterRole 的权限授予特定的用户、组或 ServiceAccount。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241740692.png)


#### 3.3.8 设置

> 设置中包含以下主要功能模块：
> *   **Config Maps**：展示集群中所有的 ConfigMap（配置映射）列表，用于存储非敏感的配置数据（如环境变量、配置文件）。
> *   **Secrets**：管理 Secret 资源，用于存储敏感信息（如密码、OAuth 令牌、SSH 密钥），并以 Base64 编码形式保存。
> *   **水平Pod自动扩缩**：查看和管理 HPA（HorizontalPodAutoscaler）资源，根据 CPU 使用率或自定义指标自动调整 Pod 副本数量。
> *   **垂直Pod自动扩缩**：管理 VPA（VerticalPodAutoscaler）资源，自动调整 Pod 的 CPU 和内存请求/限制值。
> *   **Pod中断预算**：管理 PDB（PodDisruptionBudget）资源，限制在自愿性中断（如节点维护）期间同时不可用的 Pod 数量，保障应用可用性。
> *   **资源配置**：查看 ResourceQuota 资源，用于限制命名空间中计算资源（如 CPU、内存）和对象数量（如 Pod、PVC）的总用量。
> *   **限制范围**：管理 LimitRange 资源，为命名空间中的 Pod 或容器设置默认的 CPU/内存请求和限制值。
> *   **优先顺序**：查看 PriorityClass 资源，用于定义 Pod 的调度优先级，影响调度器的抢占和排序行为。
> *   **运行时刻类**：管理 RuntimeClass 资源，用于选择不同的容器运行时（如 gVisor、Kata Containers）。
> *   **租约**：查看 Lease 资源，用于分布式系统中的协调和领导者选举机制。
> *   **变更Webhook设置**：管理 MutatingWebhookConfiguration 资源，定义在资源创建/更新时进行修改操作的准入 Webhook。
> *   **验证Webhook设置**：管理 ValidatingWebhookConfiguration 资源，定义在资源创建/更新时进行验证操作的准入 Webhook。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241740879.png)

#### 3.3.9 自定义资源

> 自定义资源中包含以下主要功能模块：
> *   **实例**：按 API 组（Group）分类展示已安装的自定义资源（CRD），每个组下列出该组支持的所有资源类型（Kind）。便于按功能领域（如 cert-manager、FluxCD）进行浏览。
> *   **定义**：展示当前集群中安装的所有 CRD（CustomResourceDefinition，自定义资源定义）的完整列表。包含资源的名称、API 组和版本等信息。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241740876.png)


## 四、Headlamp 的卸载

### 4.1 YAML 方式部署卸载
#### 4.1.1 保留yaml版本

```bash
# 卸载权限
kubectl delete -f headlamp-rbac.yaml
# 卸载headlamp服务及svc等
kubectl delete -f headlamp.yaml
```

#### 4.1.2 没保留yaml版本

```bash
# 卸载headlamp的deployment
kubectl delete deploy -n headlamp headlamp
# 卸载headlamp的service
kubectl delete svc -n headlamp headlamp
# 卸载headlamp的ServiceAccount
kubectl delete sa -n headlamp headlamp
# 卸载headlamp的ClusterRoleBinding
kubectl delete clusterrolebinding headlamp-admin
# 卸载headlamp的命名空间（正常会自动清理sa、configmap、secret）
kubectl delete ns headlamp
```

### 4.2 Helm 方式部署卸载
#### 4.2.1 卸载
```bash
# helm卸载headlamp
helm uninstall -n headlamp headlamp
# 删除headlamp命名空间
kubectl delete ns headlamp
```
### 4.3 检查是否卸载干净

* helm 多一步

```bash
# 查看helm是否还存在headlamp
helm list -Aa | grep -i headlam
```
* helm、yaml方式部署通用
```bash
# 查看所有pod是否还存在headlamp
kubectl get pods -A | grep -i headlamp
# 查看所有deployment是否还存在headlamp
kubectl get deploy -A | grep -i headlamp
# 查看所有service是否还存在headlamp
kubectl get svc -A | grep -i headlamp
# 查看所有endpoints是否还存在headlamp
kubectl get endpoints -A | grep -i headlamp
# 查看所有configmap是否还存在headlamp
kubectl get cm -A | grep -i headlamp
# 查看所有secrets是否还存在headlamp
kubectl get secrets -A | grep -i headlamp
# 查看所有ServiceAccount 是否还存在headlamp
kubectl get sa -A | grep -i headlamp
# 查看所有ClusterRoleBinding是否还存在headlamp
kubectl get ClusterRoleBinding | grep -i headlamp
# 查看所有ClusterRole是否还存在headlamp
kubectl get clusterrole | grep -i headlamp
```
或者一条命令查看上面所有

```bash
kubectl get pods,deploy,svc,endpoints,cm,secrets,sa,ClusterRoleBinding,clusterrole -A | grep -i headlamp
```










