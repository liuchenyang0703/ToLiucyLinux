---
title: K8S 部署 CoreDNS 之 DNS 域名获取
icon: circle-info
order: 1
category:
  - Linux
  - Docker
  - kubernetes
tag:
  - Linux
  - Docker
  - kubernetes
  - CoreDNS
  - 域名
  - 运维
date: 2026-02-04
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


## 一、CoreDNS 简介

**CoreDNS** 是 Kubernetes 集群中的**默认 DNS 服务器**，负责为集群内的 `Pod` 和 `Service` 提供域名解析服务。它是在 `Kubernetes 1.11` 版本之后取代 `kube-dns` 成为核心 DNS 组件的。


* 核心功能

| 功能 | 说明 |
|------|------|
| **Service 发现** | 将 Service 名称解析为 ClusterIP（如 `nginx.default.svc.cluster.local` → `10.96.0.1`） |
| **Pod 域名解析** | 为 Pod 提供 DNS A 记录（如 `10-244-1-5.default.pod.cluster.local`） |
| **外部域名转发** | 将无法解析的域名转发到上游 DNS（如 8.8.8.8） |
| **负载均衡** | 对同一个 Service 的多个 Endpoint 返回不同的 IP，实现轮询 |

## 二、 Kubernetes 与 CoreDNS 兼容性对照表
> 兼容性对照表对照版本来源与官方使用的`coredns.yaml`

| Kubernetes 版本 | CoreDNS 版本 | EndpointSlice 支持 | 说明                                           |
| :------------ | :--------- | :--------------- | :------------------------------------------- |
| 1.18.x        | 1.6.5      | ❌ 不支持            | 仅使用传统 Endpoints，无 EndpointSlice 功能           |
| 1.19.x        | 1.7.0      | ⚠️ Beta（可选）      | EndpointSlice 引入，默认关闭，需手动开启                  |
| 1.20.x        | 1.7.0      | ⚠️ Beta（可选）      | EndpointSlice 默认关闭，建议保持传统 Endpoints    |
| 1.21.x        | 1.8.0      | ✅ v1 稳定          | EndpointSlice 升级为 v1，CoreDNS 默认启用            |
| 1.22.x        | 1.8.0      | ✅ 默认启用           | Kubernetes 全面转向 EndpointSlice，Endpoints 逐步弃用 |
| 1.23.x        | 1.8.6      | ✅ 默认启用           | EndpointSlice 性能优化，支持更多并发 Endpoint           |
| 1.24.x        | 1.8.6      | ✅ 默认启用           | 配合 Dockershim 移除，容器运行时统一为 containerd         |
| 1.25.x        | 1.9.3      | ✅ 默认启用           | CoreDNS 新增 ready 插件健康检查改进                    |
| 1.26.x        | 1.9.3      | ✅ 默认启用           | CoreDNS 稳定性提升，修复内存泄漏问题                       |
| 1.27.x        | 1.10.1     | ✅ 默认启用           | 无重大变更，维护性更新                                  |
| 1.28.x        | 1.10.1     | ✅ 强制使用           | CoreDNS 完全移除 Endpoints 支持，仅 EndpointSlice    |
| 1.29.x        | 1.11.1     | ✅ 强制使用           | CoreDNS 插件优化，提升大规模集群性能                       |
| 1.30.x        | 1.11.1     | ✅ 强制使用           | Kubernetes 负载均衡算法优化                          |
| 1.31.x        | 1.11.1     | ✅ 强制使用           | 最新稳定版，安全性更新                                  |
| 1.32.x        | 1.11.3     | ✅ 强制使用           | CoreDNS 缓存机制优化，减少 APIServer 压力               |
| 1.33.x        | 1.12.0     | ✅ 强制使用           | CoreDNS 新增重试逻辑，提升容错能力                        |
| 1.34.x        | 1.12.1     | ✅ 强制使用           | 修复边界情况下的 DNS 解析超时问题                          |
| 1.35.x        | 1.13.1     | ✅ 强制使用           | 最新稳定版，支持 IPv6 双栈优化                           |


> 镜像拉取地址：[https://hub.docker.com/r/coredns/coredns/tags](https://hub.docker.com/r/coredns/coredns/tags)
> `docker pull coredns/coredns:1.7.0`

## 三、CoreDNS 部署
> 说明：`CoreDNS` 通常以 **Deployment** 方式部署在 `kube-system` 命名空间；

### 3.1 获取CoreDNS部署yaml及修改

CoreDNS配置可以在Kubernetes官方源码地址找`coredns.yaml.base`，一般存放地址在源码的`cluster/addons/dns/coredns/coredns.yaml.base`，官方源码地址：[https://github.com/kubernetes/kubernetes](https://github.com/kubernetes/kubernetes)，可根据自己的Kubernetes版本找对应tag的`coredns.yaml.base`，例如我的kubernetes版本是1.20.10，那就找tag的v1.20.10版本：[https://github.com/kubernetes/kubernetes/tree/v1.20.10](https://github.com/kubernetes/kubernetes/tree/v1.20.10)，然后再里面搜索：`coredns.yaml.base`，进行下载修改即可；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602051653631.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602051653460.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602051653045.png)




* 这里展示的是kubernetes的1.20.10版本的配置，如需其他版本可根据上面方法到官方源码获取
* `coredns.yaml`
```yaml
# 为 CoreDNS Pod 提供身份认证，用于访问 kube-apiserver 获取 Service/Pod 信息。
apiVersion: v1
kind: ServiceAccount		# 服务账户
metadata:
  name: coredns
  namespace: kube-system
  labels:
      kubernetes.io/cluster-service: "true"			# 标识集群核心服务
      addonmanager.kubernetes.io/mode: Reconcile	# Addon Manager 管理策略
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole			# 集群角色权限
metadata:
  labels:
    kubernetes.io/bootstrapping: rbac-defaults
    addonmanager.kubernetes.io/mode: Reconcile
  name: system:coredns
rules:
- apiGroups:
  - ""
  resources:					# 核心 DNS 资源
  - endpoints
  - services
  - pods
  - namespaces
  verbs:						# 只读监听
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - nodes
  verbs:
  - get
---
# 将 coredns ServiceAccount 绑定到 system:coredns ClusterRole。
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding		# 角色绑定
metadata:
  annotations:
    rbac.authorization.kubernetes.io/autoupdate: "true"
  labels:
    kubernetes.io/bootstrapping: rbac-defaults
    addonmanager.kubernetes.io/mode: EnsureExists
  name: system:coredns
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:coredns
subjects:
- kind: ServiceAccount
  name: coredns
  namespace: kube-system
---
apiVersion: v1
kind: ConfigMap		# 核心配置
metadata:
  name: coredns
  namespace: kube-system
  labels:
      addonmanager.kubernetes.io/mode: EnsureExists
data:
  Corefile: |
    .:53 {
        errors
        health {
            lameduck 5s
        }
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
            pods insecure
            fallthrough in-addr.arpa ip6.arpa
            ttl 30
        }
        prometheus :9153
        forward . /etc/resolv.conf {
            max_concurrent 1000
        }
        cache 30
        loop
        reload
        loadbalance
    }
---
apiVersion: apps/v1
kind: Deployment			# 主应用
metadata:
  name: coredns
  namespace: kube-system
  labels:
    k8s-app: kube-dns
    kubernetes.io/cluster-service: "true"
    addonmanager.kubernetes.io/mode: Reconcile
    kubernetes.io/name: "CoreDNS"
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1				# 滚动更新时最多 1 个不可用
  selector:
    matchLabels:
      k8s-app: kube-dns
  template:
    metadata:
      labels:
        k8s-app: kube-dns
    spec:
      securityContext:
        seccompProfile:
          type: RuntimeDefault
      priorityClassName: system-cluster-critical	# 最高优先级（防止被驱逐）
      serviceAccountName: coredns
      affinity:										# 反亲和性：尽量分散到不同节点
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                  - key: k8s-app
                    operator: In
                    values: ["kube-dns"]
              topologyKey: kubernetes.io/hostname
      tolerations:									# 容忍 master 节点污点
        - key: "CriticalAddonsOnly"
          operator: "Exists"
      nodeSelector:
        kubernetes.io/os: linux
      containers:
      - name: coredns
        image: coredns/coredns:1.7.0		# 指定使用镜像
        imagePullPolicy: IfNotPresent		# 指定配置文件
        resources:
          limits:
            memory: 170Mi
          requests:
            cpu: 100m
            memory: 70Mi
        args: [ "-conf", "/etc/coredns/Corefile" ]
        volumeMounts:
        - name: config-volume
          mountPath: /etc/coredns
          readOnly: true
        ports:
        - containerPort: 53
          name: dns					# UDP DNS 查询
          protocol: UDP
        - containerPort: 53
          name: dns-tcp				# TCP DNS 查询（区域传输/大响应）
          protocol: TCP
        - containerPort: 9153
          name: metrics				# Prometheus 监控
          protocol: TCP
        livenessProbe:				# 存活检查（不健康则重启）
          httpGet:
            path: /health
            port: 8080
            scheme: HTTP
          initialDelaySeconds: 60
          timeoutSeconds: 5
          successThreshold: 1
          failureThreshold: 5
        readinessProbe:				# 就绪检查（未就绪则从 Service 摘除）
          httpGet:
            path: /ready
            port: 8181
            scheme: HTTP
        securityContext:			# 安全加固
          allowPrivilegeEscalation: false		# 禁止提权
          capabilities:
            add:
            - NET_BIND_SERVICE		# 仅需绑定低位端口权限
            drop:
            - all					# 丢弃其他所有能力
          readOnlyRootFilesystem: true	# 根文件系统只读
      dnsPolicy: Default
      volumes:
        - name: config-volume
          configMap:
            name: coredns
            items:
            - key: Corefile
              path: Corefile
---
apiVersion: v1
kind: Service		# 集群 DNS 入口
metadata:
  name: kube-dns
  namespace: kube-system
  annotations:
    prometheus.io/port: "9153"
    prometheus.io/scrape: "true"
  labels:
    k8s-app: kube-dns
    kubernetes.io/cluster-service: "true"
    addonmanager.kubernetes.io/mode: Reconcile
    kubernetes.io/name: "CoreDNS"
spec:
  selector:
    k8s-app: kube-dns		# 关联 CoreDNS Pod
  clusterIP: 10.0.0.2 		# 占位符，如 10.0.0.2
  ports:
  - name: dns
    port: 53
    protocol: UDP
  - name: dns-tcp
    port: 53
    protocol: TCP
  - name: metrics
    port: 9153			# 供 Prometheus 采集监控数据
    protocol: TCP
```
此配置我已替换，如需新的请访问官方源码新下载：[https://github.com/kubernetes/kubernetes](https://github.com/kubernetes/kubernetes)


需替换内容有：
| 占位符                      | 典型值             | 说明                          |
| ------------------------ | --------------- | --------------------------- |
| `__DNS__DOMAIN__`        | `cluster.local` | 集群根域名                       |
| `__DNS__SERVER__`        | `10.0.0.2`    | CoreDNS Service 的 ClusterIP |
| `__DNS__MEMORY__LIMIT__` | `170Mi`         | 内存限制                        |
|`image`|`coredns/coredns:1.7.0`|请更换和kubernetes匹配的coredns镜像版本<br>自带的镜像地址拉取不到，可以换为`coredns/coredns:1.7.0`|

 `__DNS__DOMAIN__`和`__DNS__SERVER__`需要和你的`kubelet`配置文件中的`clusterDomain`和`clusterDNS`一致；

查看kubelet配置yaml，如果是参考的我的[K8S 二进制集群搭建（一主两从）](https://blog.csdn.net/liu_chen_yang/article/details/151709127)，那么他是再`/opt/kubernetes/cfg/kubelet-config.yml`里；如果是其他方式部署可查找`kubelet`的`config.yaml`或`config.yml`或`kubelet.yaml`；

>为什么要和kebelet配置的内容一致？
> **核心原因**：kubelet 负责 Pod 的 DNS 配置
> 在 Kubernetes 架构中，kubelet 是节点代理，负责创建和管理 Pod。当 kubelet 创建 Pod 时，会自动为其配置网络，包括写入 `/etc/resolv.conf` 文件，如需查看 `/etc/resolv.conf`需进入创建的pod中查看。



### 3.2 启动部署CoreDNS

```bash
kubectl apply -f coredns.yaml
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602051652982.png)



创建成功查看之后，查看pod运行是否正常

```bash
# 查看 CoreDNS Pod（命令二选一都可以）
kubectl get pods -n kube-system coredns-77f6587445-m9hrc -o wide
kubectl get pods -n kube-system -l k8s-app=kube-dns -o wide

# 查看 CoreDNS Service（集群 DNS 入口）
kubectl get svc -n kube-system kube-dns
```
* pod运行说明
`coredns-77f6587445-m9hrc`需替换为自己的pod名称，`-o wide`可以查看具体在哪个节点上跑着；
创建之后需等待一会，因为拉镜像也需要时间，或者可以提前吧镜像上传上来，下载不了可访问百度网盘链接 [k8s1.20.10集群所需包](https://pan.baidu.com/s/1JH4wZ8F4qokgBdD1cZ0RPA?pwd=k8s1) 找到coredns镜像进行下载并上传load到节点上；
READY结果为`1/1`即为成功运行；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602051652276.png)


如果运行有问题可通过`kubectl describe pod -n kube-system coredns-77f6587445-m9hrc` 或 `kubectl logs -n kube-system coredns-77f6587445-m9hrc` 查看pod日志和服务日志来找到问题并解决问题；
**注意**：`coredns-77f6587445-m9hrc`需替换为自己的pod名称。

### 3.3 验证CoreDNS是否生效
> 注意：`-- nslookup` 的`kubernetes.default`获取的是svc中的`name`.`namespace`，具体可看 <font color=blue>五、Service DNS 命名规则</font>

* [x] 内部域名解析

```bash
kubectl run -it --rm debug --image=busybox:1.28 --restart=Never -- nslookup kubernetes.default 2>/dev/null || echo "测试失败"
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602051652171.png)


* 验证结果分析：


| 输出                                                           | 含义              | 状态             |
| :----------------------------------------------------------- | :-------------- | :------------- |
| `Server: 10.0.0.2`                                           | Pod 使用的 DNS 服务器 | ✅ 指向 CoreDNS   |
| `Address 1: 10.0.0.2 kube-dns.kube-system.svc.cluster.local` | 反向解析成功          | ✅ CoreDNS 正常工作 |
| `Name: kubernetes.default`                                   | 查询成功            | ✅              |
| `Address 1: 10.0.0.1 kubernetes.default.svc.cluster.local`   | 返回正确 IP         | ✅ 完全正常         |

* [x] 跨命名空间解析

```bash
kubectl run -it --rm debug --image=busybox:1.28 --restart=Never -- nslookup kube-dns.kube-system 2>/dev/null || echo "测试失败"
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602051652226.png)
* 验证结果分析：

| 查询                     | 结果                                       | 状态          |
| :--------------------- | :--------------------------------------- | :---------- |
| `kube-dns.kube-system` | `10.0.0.2`                               | ✅ 跨命名空间解析成功 |
| 反向解析 `10.0.0.2`        | `kube-dns.kube-system.svc.cluster.local` | ✅ PTR 记录正常  |


* [x] 外部域名解析

```bash
kubectl run -it --rm debug --image=busybox:1.28 --restart=Never -- nslookup baidu.com 2>/dev/null || echo "测试失败"
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602051652751.png)

* 验证结果分析：

| 输出                           | 含义        | 状态     |
| :--------------------------- | :-------- | :----- |
| `Name: baidu.com`            | 查询成功      | ✅      |
| `Address 1: 124.237.177.164` | 返回多个 A 记录 | ✅ 负载均衡 |
| `Address 2: 111.63.65.247`   | 多个 IP 地址  | ✅      |
| `Address 3: 110.242.74.102`  | 百度 CDN 节点 | ✅      |


---

> 三种都成功，代表没问题，CoreDNS配置完成；
## 四、Pod 的 DNS 配置

Pod 创建时，Kubernetes 会自动配置 `/etc/resolv.conf`，但这个配置不是宿主机的，是创建的pod中的配置；


```bash
# 在任意 Pod 内查看
cat /etc/resolv.conf

# 典型输出：
nameserver 10.0.0.2       # CoreDNS Service 的 ClusterIP
search default.svc.cluster.local svc.cluster.local cluster.local
options ndots:5
```

**关键字段说明：**
- `nameserver`：CoreDNS 的 ClusterIP（由 `kube-dns` Service 提供）
- `search`：DNS 搜索域，简写时可自动补全
- `ndots:5`：域名中点数小于 5 时，依次尝试 search 域


## 五、Service DNS 域名命名规则
> Kubernetes Service 的域名遵循固定的 DNS 命名规则，如下：

```bash
<service-name>.<namespace>.svc.<cluster-domain>
│              │          │   │
│              │          │   └── 集群域名（默认 cluster.local）
│              │          └────── svc 固定后缀（表示 Service）
│              └───────────────── 命名空间
└──────────────────────────────── Service 名称
```
例如：

```bash
kubernetes.default.svc.cluster.local
```

* 验证 DNS 是否正常工作

> 需要验证其他DNS可替换`-- nslookup`后的`kubernetes.default`即可；
```bash
kubectl run -it --rm debug --image=busybox:1.28 --restart=Never -- nslookup kubernetes.default 2>/dev/null || echo "测试失败"
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602051652044.png)


* 验证结果分析：


| 输出                                                           | 含义              | 状态             |
| :----------------------------------------------------------- | :-------------- | :------------- |
| `Server: 10.0.0.2`                                           | Pod 使用的 DNS 服务器 | ✅ 指向 CoreDNS   |
| `Address 1: 10.0.0.2 kube-dns.kube-system.svc.cluster.local` | 反向解析成功          | ✅ CoreDNS 正常工作 |
| `Name: kubernetes.default`                                   | 查询成功            | ✅              |
| `Address 1: 10.0.0.1 kubernetes.default.svc.cluster.local`   | 返回正确 IP         | ✅ 完全正常         |
