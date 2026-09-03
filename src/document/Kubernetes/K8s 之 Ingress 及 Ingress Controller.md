---
title: K8s 之 Ingress 及 Ingress Controller
icon: circle-info
order: 1
category:
  - Linux
  - kubernetes
tag:
  - Linux
  - kubernetes
  - 运维
date: 2026-04-27
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


![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211407563.png)

## 一、Ingress 简介

>Ingress 官网地址：[https://kubernetes.github.io/ingress-nginx/](https://kubernetes.github.io/ingress-nginx/)
>Ingress 源码地址：[https://github.com/kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx)
### 1.1 什么是 Ingress
**Ingress** 是 Kubernetes 中的一种 API 对象，用于**管理从集群外部访问到集群内服务的 HTTP 和 HTTPS 路由**。

简单来说：
- **Service** 负责集群**内部**的服务发现和负载均衡
- **Ingress** 负责集群**外部**的流量入口管理
### 1.2 Ingress 用来干什么？
| 功能 | 说明 |
|------|------|
| **外部访问入口** | 提供统一的集群外部访问入口点（通常是域名或 IP） |
| **基于域名的路由** | 将不同域名（如 `api.example.com`、`www.example.com`）路由到不同服务 |
| **基于路径的路由** | 将同一域名的不同路径（如 `/api`、`/web`）路由到不同服务 |
| **SSL/TLS 终止** | 管理 HTTPS 证书，处理 TLS 加密解密 |
| **负载均衡** | 在多个后端 Pod 之间分配流量 |
| **虚拟主机** | 支持基于名称的虚拟主机 |

### 1.3  Ingress 与 Service 的其他三种暴露方式的区别

| 方式               | 类型                | 工作层级     | 暴露方式| 外部访问|生产推荐   |
| ---------------- | ----------------- | -------- | ----------- | -------- |-------- |
| **ClusterIP**    | Service           | L4 (传输层) | 仅集群内部IP或域名	|内部<br>Cluster IP 或 域名|⭐ 内部用  |
| **NodePort**     | Service           | L4 (传输层)       | 节点IP+端口|外部<br>节点IP:端口|⭐ 测试用 |
| **LoadBalancer** | Service           | L4 (传输层)       |云厂商负载均衡IP| 外部 <br>独立公网IP| ⭐⭐ 简单场景   |
| **Ingress**      | Ingress + Service | L7 (应用层) | 域名/路径路由|外部<br>域名访问|⭐⭐⭐⭐⭐ 推荐|

### 1.4 Ingress 与 Ingress Controller 的区别

|          | Ingress                | Ingress Controller          |
| -------- | ---------------------- | --------------------------- |
| **本质**   | **API 对象 / 配置声明**      | **实际运行的 Pod 程序**            |
| **类比**   | 像 `Dockerfile`（描述想要什么） | 像 `Docker Engine`（实际执行）     |
| **作用**   | 定义路由规则（域名、路径、TLS）      | 监听并执行这些规则                   |
| **存在形式** | YAML 配置文件              | 集群中运行的 Deployment/DaemonSet |
| **数量**   | 可以创建很多个（按业务划分）         | 通常 1-2 个（高可用）               |


* Ingress = 声明式配置，只是定义配置（yaml文件），不干活；类似于餐厅菜单，只写有什么菜，不做菜。
*  Ingress Controller = 执行引擎，真正的执行者；类似于餐厅厨师，看菜单做菜，并出餐。

为什么必须两者配合，如下表格：

| 只有 Ingress，没有 Controller        | 只有 Controller，没有 Ingress |
| ------------------------------- | ------------------------ |
| 配置存在但无人执行                       | 程序运行但无规则可循               |
| `kubectl get ingress` 能看到，但访问不通 | Pod 在运行，但不知道路由到哪         |
| ❌ **无效**                        | ❌ **空转**                 |

所以必须同时存在才能工作！

> `ingress-controller`并不是k8s自带的组件，实际上它只是一个统称，用户可以选择不同的`ingress-controller`来实现功能。其中由k8s官方维护的是`nginx -ingress`。所以是需要单独进行安装的。


## 二、Ingress Controller 部署

> 需要提前安装`CoreDNS`，否则 Service 名字解析会失败。
> 安装`CoreDNS`可参考：[K8S 部署 CoreDNS 之 DNS 域名获取](https://liucy.blog.csdn.net/article/details/157694074)

> **重要概念**：Ingress 本身只是一个**API 规则/配置**，需要配合 **Ingress Controller**（Ingress 控制器）才能工作。


最常用的 `Ingress Controller` 是 **NGINX Ingress Controller**：

其他流行的 Ingress Controller：
- **Traefik** - 云原生，自动服务发现
- **HAProxy Ingress** - 高性能
- **Istio Ingress Gateway** - 服务网格集成
- **AWS ALB Ingress Controller** - 云厂商原生


> 温馨提示：如果你的k8s集群版本再1.19及以下，下面内容可能不适合，具体请查看官方文档：[https://kubernetes.github.io/ingress-nginx/deploy/#running-on-kubernetes-versions-older-than-119](https://kubernetes.github.io/ingress-nginx/deploy/#running-on-kubernetes-versions-older-than-119)


### 2.1 下载 Ingress-nginx 官方yaml文件
> 因为我的`kubernetes`的版本为：`1.20.10`，所以`ingress-nginx`的版本使用：`1.3.1`；
> 找到官方说明`1.3.1`是最后一个支持`k8s 1.20-1.21`的版本了，所以我使用此版本，如果想要看自己的k8s集群支持的版本，可通过官方`controller`版本进行查询：[https://github.com/kubernetes/ingress-nginx/tags](https://github.com/kubernetes/ingress-nginx/tags)，一般再详情里都会显示的，如果没有的话可看下个版本说明；
```bash
wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.3.1/deploy/static/provider/cloud/deploy.yaml
```
下载不了的可直接使用如下yaml，也是1.3.1版本；

* `vi ingress-nginx-1.3.1.yaml`
```yaml
apiVersion: v1
kind: Namespace
metadata:
  labels:
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
  name: ingress-nginx
---
apiVersion: v1
automountServiceAccountToken: true
kind: ServiceAccount
metadata:
  labels:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx
  namespace: ingress-nginx
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    app.kubernetes.io/component: admission-webhook
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx-admission
  namespace: ingress-nginx
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  labels:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx
  namespace: ingress-nginx
rules:
- apiGroups:
  - ""
  resources:
  - namespaces
  verbs:
  - get
- apiGroups:
  - ""
  resources:
  - configmaps
  - pods
  - secrets
  - endpoints
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - services
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - networking.k8s.io
  resources:
  - ingresses
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - networking.k8s.io
  resources:
  - ingresses/status
  verbs:
  - update
- apiGroups:
  - networking.k8s.io
  resources:
  - ingressclasses
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  resourceNames:
  - ingress-controller-leader
  resources:
  - configmaps
  verbs:
  - get
  - update
- apiGroups:
  - ""
  resources:
  - configmaps
  verbs:
  - create
- apiGroups:
  - coordination.k8s.io
  resourceNames:
  - ingress-controller-leader
  resources:
  - leases
  verbs:
  - get
  - update
- apiGroups:
  - coordination.k8s.io
  resources:
  - leases
  verbs:
  - create
- apiGroups:
  - ""
  resources:
  - events
  verbs:
  - create
  - patch
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  labels:
    app.kubernetes.io/component: admission-webhook
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx-admission
  namespace: ingress-nginx
rules:
- apiGroups:
  - ""
  resources:
  - secrets
  verbs:
  - get
  - create
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  labels:
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx
rules:
- apiGroups:
  - ""
  resources:
  - configmaps
  - endpoints
  - nodes
  - pods
  - secrets
  - namespaces
  verbs:
  - list
  - watch
- apiGroups:
  - coordination.k8s.io
  resources:
  - leases
  verbs:
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - nodes
  verbs:
  - get
- apiGroups:
  - ""
  resources:
  - services
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - networking.k8s.io
  resources:
  - ingresses
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - events
  verbs:
  - create
  - patch
- apiGroups:
  - networking.k8s.io
  resources:
  - ingresses/status
  verbs:
  - update
- apiGroups:
  - networking.k8s.io
  resources:
  - ingressclasses
  verbs:
  - get
  - list
  - watch
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  labels:
    app.kubernetes.io/component: admission-webhook
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx-admission
rules:
- apiGroups:
  - admissionregistration.k8s.io
  resources:
  - validatingwebhookconfigurations
  verbs:
  - get
  - update
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  labels:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx
  namespace: ingress-nginx
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: ingress-nginx
subjects:
- kind: ServiceAccount
  name: ingress-nginx
  namespace: ingress-nginx
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  labels:
    app.kubernetes.io/component: admission-webhook
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx-admission
  namespace: ingress-nginx
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: ingress-nginx-admission
subjects:
- kind: ServiceAccount
  name: ingress-nginx-admission
  namespace: ingress-nginx
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  labels:
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: ingress-nginx
subjects:
- kind: ServiceAccount
  name: ingress-nginx
  namespace: ingress-nginx
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  labels:
    app.kubernetes.io/component: admission-webhook
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx-admission
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: ingress-nginx-admission
subjects:
- kind: ServiceAccount
  name: ingress-nginx-admission
  namespace: ingress-nginx
---
apiVersion: v1
data:
  allow-snippet-annotations: "true"
kind: ConfigMap
metadata:
  labels:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx-controller
  namespace: ingress-nginx
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx-controller
  namespace: ingress-nginx
spec:
  externalTrafficPolicy: Local
  ipFamilies:
  - IPv4
  ipFamilyPolicy: SingleStack
  ports:
  - appProtocol: http
    name: http
    port: 80
    protocol: TCP
    targetPort: http
  - appProtocol: https
    name: https
    port: 443
    protocol: TCP
    targetPort: https
  selector:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
  type: LoadBalancer
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx-controller-admission
  namespace: ingress-nginx
spec:
  ports:
  - appProtocol: https
    name: https-webhook
    port: 443
    targetPort: webhook
  selector:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
  type: ClusterIP
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx-controller
  namespace: ingress-nginx
spec:
  minReadySeconds: 0
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app.kubernetes.io/component: controller
      app.kubernetes.io/instance: ingress-nginx
      app.kubernetes.io/name: ingress-nginx
  template:
    metadata:
      labels:
        app.kubernetes.io/component: controller
        app.kubernetes.io/instance: ingress-nginx
        app.kubernetes.io/name: ingress-nginx
    spec:
      containers:
      - args:
        - /nginx-ingress-controller
        - --publish-service=$(POD_NAMESPACE)/ingress-nginx-controller
        - --election-id=ingress-controller-leader
        - --controller-class=k8s.io/ingress-nginx
        - --ingress-class=nginx
        - --configmap=$(POD_NAMESPACE)/ingress-nginx-controller
        - --validating-webhook=:8443
        - --validating-webhook-certificate=/usr/local/certificates/cert
        - --validating-webhook-key=/usr/local/certificates/key
        env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        - name: LD_PRELOAD
          value: /usr/local/lib/libmimalloc.so
        image: registry.k8s.io/ingress-nginx/controller:v1.3.1@sha256:54f7fe2c6c5a9db9a0ebf1131797109bb7a4d91f56b9b362bde2abd237dd1974
        imagePullPolicy: IfNotPresent
        lifecycle:
          preStop:
            exec:
              command:
              - /wait-shutdown
        livenessProbe:
          failureThreshold: 5
          httpGet:
            path: /healthz
            port: 10254
            scheme: HTTP
          initialDelaySeconds: 10
          periodSeconds: 10
          successThreshold: 1
          timeoutSeconds: 1
        name: controller
        ports:
        - containerPort: 80
          name: http
          protocol: TCP
        - containerPort: 443
          name: https
          protocol: TCP
        - containerPort: 8443
          name: webhook
          protocol: TCP
        readinessProbe:
          failureThreshold: 3
          httpGet:
            path: /healthz
            port: 10254
            scheme: HTTP
          initialDelaySeconds: 10
          periodSeconds: 10
          successThreshold: 1
          timeoutSeconds: 1
        resources:
          requests:
            cpu: 100m
            memory: 90Mi
        securityContext:
          allowPrivilegeEscalation: true
          capabilities:
            add:
            - NET_BIND_SERVICE
            drop:
            - ALL
          runAsUser: 101
        volumeMounts:
        - mountPath: /usr/local/certificates/
          name: webhook-cert
          readOnly: true
      dnsPolicy: ClusterFirst
      nodeSelector:
        kubernetes.io/os: linux
      serviceAccountName: ingress-nginx
      terminationGracePeriodSeconds: 300
      volumes:
      - name: webhook-cert
        secret:
          secretName: ingress-nginx-admission
---
apiVersion: batch/v1
kind: Job
metadata:
  labels:
    app.kubernetes.io/component: admission-webhook
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx-admission-create
  namespace: ingress-nginx
spec:
  template:
    metadata:
      labels:
        app.kubernetes.io/component: admission-webhook
        app.kubernetes.io/instance: ingress-nginx
        app.kubernetes.io/name: ingress-nginx
        app.kubernetes.io/part-of: ingress-nginx
        app.kubernetes.io/version: 1.3.1
      name: ingress-nginx-admission-create
    spec:
      containers:
      - args:
        - create
        - --host=ingress-nginx-controller-admission,ingress-nginx-controller-admission.$(POD_NAMESPACE).svc
        - --namespace=$(POD_NAMESPACE)
        - --secret-name=ingress-nginx-admission
        env:
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        image: registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.3.0@sha256:549e71a6ca248c5abd51cdb73dbc3083df62cf92ed5e6147c780e30f7e007a47
        imagePullPolicy: IfNotPresent
        name: create
        securityContext:
          allowPrivilegeEscalation: false
      nodeSelector:
        kubernetes.io/os: linux
      restartPolicy: OnFailure
      securityContext:
        fsGroup: 2000
        runAsNonRoot: true
        runAsUser: 2000
      serviceAccountName: ingress-nginx-admission
---
apiVersion: batch/v1
kind: Job
metadata:
  labels:
    app.kubernetes.io/component: admission-webhook
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx-admission-patch
  namespace: ingress-nginx
spec:
  template:
    metadata:
      labels:
        app.kubernetes.io/component: admission-webhook
        app.kubernetes.io/instance: ingress-nginx
        app.kubernetes.io/name: ingress-nginx
        app.kubernetes.io/part-of: ingress-nginx
        app.kubernetes.io/version: 1.3.1
      name: ingress-nginx-admission-patch
    spec:
      containers:
      - args:
        - patch
        - --webhook-name=ingress-nginx-admission
        - --namespace=$(POD_NAMESPACE)
        - --patch-mutating=false
        - --secret-name=ingress-nginx-admission
        - --patch-failure-policy=Fail
        env:
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        image: registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.3.0@sha256:549e71a6ca248c5abd51cdb73dbc3083df62cf92ed5e6147c780e30f7e007a47
        imagePullPolicy: IfNotPresent
        name: patch
        securityContext:
          allowPrivilegeEscalation: false
      nodeSelector:
        kubernetes.io/os: linux
      restartPolicy: OnFailure
      securityContext:
        fsGroup: 2000
        runAsNonRoot: true
        runAsUser: 2000
      serviceAccountName: ingress-nginx-admission
---
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  labels:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: nginx
spec:
  controller: k8s.io/ingress-nginx
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  labels:
    app.kubernetes.io/component: admission-webhook
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.3.1
  name: ingress-nginx-admission
webhooks:
- admissionReviewVersions:
  - v1
  clientConfig:
    service:
      name: ingress-nginx-controller-admission
      namespace: ingress-nginx
      path: /networking/v1/ingresses
  failurePolicy: Fail
  matchPolicy: Equivalent
  name: validate.nginx.ingress.kubernetes.io
  rules:
  - apiGroups:
    - networking.k8s.io
    apiVersions:
    - v1
    operations:
    - CREATE
    - UPDATE
    resources:
    - ingresses
  sideEffects: None
```

### 2.2 安装 Ingress-nginx 服务

```bash
kubectl apply -f ingress-nginx-1.3.1.yaml
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211408214.png)

### 2.3 验证安装

```bash
# 查看 Ingress Controller Pod
kubectl get pods -n ingress-nginx

# 查看 Ingress Class
kubectl get ingressclass

# 查看外部 IP（LoadBalancer 类型）
kubectl get svc -n ingress-nginx
```
> pod查看正常`ingress-nginx-controller`的运行状态是`1/1`，其他两个是`0/1`，因为其他两个是job，一次性任务。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211408625.png)


> 如果镜像拉取不到，可参考我已经拉取好的镜像：[ingress-nginx所需镜像](https://pan.baidu.com/s/120hIvBxyGz1JYRCCucrQpg?pwd=betm)，这个导入之后需要修改yaml中镜像的版本号，把后面的`@sha`全部删了就行，要不然镜像还是会提示拉取不到，例如：`registry.k8s.io/ingress-nginx/controller:v1.3.1@sha256:54f7fe2c6c5a9db9a0ebf1131797109bb7a4d91f56b9b362bde2abd237dd1974`改为`registry.k8s.io/ingress-nginx/controller:v1.3.1`，还有`registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.3.0@sha256:549e71a6ca248c5abd51cdb73dbc3083df62cf92ed5e6147c780e30f7e007a47`改为`registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.3.0`

---

装完之后如果没有域名，需要IP访问的话，我们需要修改`svc` `ingress-nginx-controller`的`TYPE`，默认是`LoadBalancer`暴露方式，我们可以改为`NodePort`暴露方式，如果是集群内部访问可以改为`ClusterIP`暴露方式；

* 修改`ingress-nginx-controller`的暴露方式为IP访问
```bash
kubectl patch svc ingress-nginx-controller -n ingress-nginx -p '{"spec":{"type":"NodePort"}}'
```
修改为`NodePort`方式之后，需要再检查一下负载方式，我这边看官方的yaml文件中`LoadBalancer`默认的负载方式是`Local`，虽然说修改了暴露方式，但是负载方式是没有变的，所以说还需要检查一下，如果是只需要pod本节点访问，那么就不需要改了，如果是需要集群任意节点访问，就需要修改一下负载方式为`Cluster`；

>  Cluster: 全集群负载均衡（可能跨节点转发）
>  Local: 仅转发到本节点 Pod（性能更好，但可能不均） 

```bash
# 检查当前的负载方式
kubectl get svc -n ingress-nginx ingress-nginx-controller -o yaml | grep  "externalTrafficPolicy\:"
# 如果需要集群任意ip访问，可修改为Cluster
kubectl patch svc ingress-nginx-controller -n ingress-nginx -p '{"spec":{"externalTrafficPolicy":"Cluster"}}'
```

这样修改完之后就可以通过集群任意节点IP:端口进行访问`ingress-nginx-controller`了，不过现在访问页面返回的是`404`，因为现在只部署了 `Ingress Controller`，还没有创建 `Ingress 资源` 和 `后端应用`，所以访问是404。

访问例如：`172.16.11.230:32465`，ip为集群节点中任意节点的ip，端口为`svc中ingress-nginx-controller`对外的端口。

## 三、创建 Ingress 规则
### 3.1 编写 Ingress 规则
* `vi test-ingress.yaml`
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: test-load
  namespace: default
spec:
  ingressClassName: nginx    # 对应你安装的 Controller
  # 比如现在安装的是nginx-ingress-controller，可以使用"kubectl get ingressclass"命令查看
  rules:
  - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: test-service   # 指向你的后端 Service
            port:
              number: 80		# Service 的端口
```
* 字段解析：

| 字段                                    | 值                      | 含义                             |
| :------------------------------------ | :--------------------- | :----------------------------- |
| `apiVersion`                          | `networking.k8s.io/v1` | API 版本，标准网络 API                |
| `kind`                                | `Ingress`              | 资源类型：入口路由规则                    |
| `metadata.name`                       | `test-load`            | Ingress 资源名称                   |
| `metadata.namespace`                  | `default`              | 所属命名空间                         |
| `spec.ingressClassName`               | `nginx`                | 使用 NGINX Ingress Controller 执行 |
| `spec.rules`                          | 数组                     | 路由规则列表                         |
| `rules[].http`                        | -                      | HTTP 协议规则（也可写 `https`）         |
| `rules[].http.paths`                  | 数组                     | URL 路径匹配规则                     |
| `paths[].path`                        | `/`                    | 匹配路径：`/` 开头（即所有请求）             |
| `paths[].pathType`                    | `Prefix`               | 前缀匹配模式                         |
| `paths[].backend.service.name`        | `my-service`           | 后端 Service 名称                  |
| `paths[].backend.service.port.number` | `80`                   | 后端 Service 端口                  |


---

如果想**多个项目通过路径区分**：
```yaml
      paths:
      - path: /app1
        pathType: Prefix
        backend:
          service:
            name: app1-service
            port:
              number: 80
      - path: /app2
        pathType: Prefix
        backend:
          service:
            name: app2-service
            port:
              number: 80
```

* `pathType`路径匹配类型对比

| `pathType`               | 说明                | 示例                                        |
| :----------------------- | :---------------- | :---------------------------------------- |
| `Prefix`                 | 前缀匹配              | `/api` 匹配 `/api`, `/api/v1`, `/api/users` |
| `Exact`                  | 精确匹配              | `/api` 只匹配 `/api`，不匹配 `/api/`             |
| `ImplementationSpecific` | 由具体 Controller 决定 | 依赖实现，行为不确定                                |



### 3.2 创建 Ingress 规则
```bash
kubectl apply -f test-ingress.yaml
```

### 3.3 验证 Ingress 规则是否创建成功

```bash
kubectl get ingress
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211408265.png)

## 四、创建后端服务 - nginx
### 4.1 编写 nginx-deployment yaml 文件
* `vi nginx-deployment.yaml`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: default
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
        image: nginx:1.24.0
        ports:
        - containerPort: 80
```
### 4.2 编写 nginx-service yaml 文件
* `vi nginx-svc.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: test-service        # ← Ingress 里写的名字
  namespace: default        # ← 必须和 Ingress 同一命名空间
spec:
  selector:
    app: nginx              # ← 匹配 Deployment 的 Pod 标签
  ports:
  - port: 80                # ← Ingress 里写的端口
    targetPort: 80          # ← 容器实际端口（对应 containerPort）
```
### 4.3 创建 nginx deployment 和 service

```bash
kubectl apply -f nginx-deployment.yaml
kubectl apply -f nginx-svc.yaml
```
### 4.4 检查 pod 和 svc是否创建成功

```bash
# 查看nginx deployment状态
kubectl get deploy
# 查看nginx pod的状态
kubectl get pods
# 查看nginx service的状态
kubectl get svc
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211408096.png)


## 五、检验是否 Ingrss 是否部署成功
使用`ingress-nginx-controller`访问方式访问页面：`http://172.16.11.230:32465`、`https://172.16.11.231:32483`，可以访问到nginx的主页面就没问题；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211408652.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211408281.png)


> 具体负载使用可参考：[K8s之负载均衡](https://liucy.blog.csdn.net/article/details/157737550)


## 六、常见错误排查
* 页面访问常见错误


| 错误现象                        | 原因                     | 解决                                      |
| :-------------------------- | :--------------------- | :-------------------------------------- |
| **503 Service Unavailable** | Service 无 Endpoints    | 检查 Label 是否匹配、Pod 是否运行、命名空间是否一致 |
| **404 Not Found**           | Ingress 规则不匹配          | 检查 path、host 配置                         |
| **502 Bad Gateway**         | Pod 未启动或端口错误           | 检查 Pod 状态、containerPort                 |
| **连接超时**                    | Ingress Controller 未运行 | 检查 Controller Pod、NodePort/LoadBalancer |


## 七、注意事项
### 7.1 命名空间
> `Ingress规则、后端（Deployment、DaemonSet、StatefulSet）、service`，命名空间必须一致，否则访问会报`503 Service Unavailable`错误。

### 7.2 Ingress 规则与 service 对应关系

| Ingress 字段                                 | 对应 Service 字段        | 说明                 |
| :----------------------------------------- | :------------------- | :----------------- |
| `metadata.namespace`                       | `metadata.namespace` | **必须相同**，跨命名空间无法发现 |
| `spec.rules[].backend.service.name`        | `metadata.name`      | **必须完全一致**         |
| `spec.rules[].backend.service.port.number` | `spec.ports[].port`  | Service 暴露的端口      |

* 对应关系图

```bash
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│     Ingress     │         │     Service     │         │   Pod (应用)    │
│                 │         │                 │         │                 │
│  namespace: A   │────┬───→│  namespace: A   │────┬───→│  namespace: A   │
│                 │    │    │                 │    │    │                 │
│  rules:         │    │    │  metadata:      │    │    │  labels:        │
│  - backend:     │    │    │    name: svc    │    │    │    app: nginx   │
│      service:   │────┘    │                 │    │    │                 │
│        name: svc│←────────│  spec:          │    │    │                 │
│        port:    │←────────│    ports:       │────┘    │  containers:    │
│          number:│  80     │    - port: 80   │         │  - port: 80     │
│            80   │         │      targetPort:│←────────│                 │
│                 │         │        80       │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

> **Ingress 通过 `namespace + service.name + service.port` 找到 Service，三者必须完全对应。**

> 一个`Ingress Controller`可以有多个`Ingress`规则；
> 一个`Ingress`规则可以有多个`service` - > `pod或者deployment、daemonset、statefulset`；
