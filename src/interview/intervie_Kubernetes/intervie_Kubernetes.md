---
title: Kubernetes常见面试题
icon: circle-info
order: 1
category:
  - 面试题
tag:
  - Kubernetes常见面试题
  - 运维
date: 2026-02-07
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1.说下k8s的核心组件都有哪些，并简述下他们各自的作用

答：

> Kubernetes（k8s）的核心组件可以分为**控制平面（Control Plane）组件**和**工作节点（Node）组件**两大类；

* [x] **控制平面组件（Control Plane Components）**
* etcd：分布式键值存储，保存集群状态。
*   kube-apiserver：提供 Kubernetes API，是整个集群的前端入口。
*   kube-scheduler：负责调度新创建的 Pod 到合适的工作节点上运行。
*   kube-controller-manager：运行控制器（如 Node Controller、Replication Controller）。
*   [x] **工作节点组件（Node Components）**
*   kubelet：节点上的主要代理，管理节点上的 Pod 和容器。
*   kube-proxy：负责**网络代理和负载均衡**，实现 Kubernetes Service 的通信。
*   Container Runtime：负责运行容器的软件（如 Docker、containerd）。

## 2、k8s中都有哪些对象资源？

答：

* [x] 工作负载类（Workload）

| 资源名称                  | 简称     | 作用                                              |
| ------------------------- | -------- | ------------------------------------------------- |
| **Pod**                   | `po`     | 最小部署单元，包含一个或多个紧密耦合的容器        |
| **Deployment**            | `deploy` | 声明式管理无状态应用，支持滚动更新和回滚          |
| **StatefulSet**           | `sts`    | 管理有状态应用，提供稳定的网络标识和持久存储      |
| **DaemonSet**             | `ds`     | 确保每个（或指定）节点上运行一个 Pod 副本         |
| **ReplicaSet**            | `rs`     | 维护指定数量的 Pod 副本（通常被 Deployment 管理） |
| **Job**                   | -        | 一次性任务，运行完成后即结束                      |
| **CronJob**               | `cj`     | 定时任务，按 Cron 表达式周期性执行 Job            |
| **ReplicationController** | `rc`     | 旧版副本控制器（已被 ReplicaSet/Deployment 取代） |

* [x] 服务与网络类（Service & Networking）

| 资源名称          | 简称     | 作用                                                         |
| ----------------- | -------- | ------------------------------------------------------------ |
| **Service**       | `svc`    | 为一组 Pod 提供稳定的网络访问入口（ClusterIP/NodePort/LoadBalancer/ExternalName） |
| **Ingress**       | `ing`    | 管理外部 HTTP/HTTPS 访问，提供基于域名的路由                 |
| **IngressClass**  | -        | 定义 Ingress 控制器的配置类                                  |
| **NetworkPolicy** | `netpol` | 定义 Pod 之间的网络访问策略（防火墙规则）                    |
| **EndpointSlice** | -        | 存储 Service 的后端端点信息（替代旧的 Endpoints）            |
| **Endpoints**     | `ep`     | Service 对应的后端 Pod IP:Port 列表（逐渐被 EndpointSlice 取代） |

* [x] 配置与存储类（Config & Storage）

| 资源名称                  | 简称  | 作用                                             |
| ------------------------- | ----- | ------------------------------------------------ |
| **ConfigMap**             | `cm`  | 存储非敏感的配置数据（键值对、配置文件等）       |
| **Secret**                | -     | 存储敏感数据（密码、Token、证书等），Base64 编码 |
| **PersistentVolume**      | `pv`  | 集群中的持久化存储资源（由管理员配置或动态供给） |
| **PersistentVolumeClaim** | `pvc` | Pod 对持久化存储的请求声明                       |
| **StorageClass**          | `sc`  | 定义存储的"类"，支持动态卷供给                   |
| **VolumeAttachment**      | -     | 记录存储卷的挂载状态（CSI 使用）                 |
| **CSI Driver/Node**       | -     | 容器存储接口相关资源                             |

* [x] 身份与权限类（RBAC & Security）

| 资源名称               | 简称  | 作用                                                         |
| ---------------------- | ----- | ------------------------------------------------------------ |
| **ServiceAccount**     | `sa`  | 为 Pod 提供身份标识，用于 API 认证                           |
| **Role**               | -     | 定义命名空间级别的权限规则                                   |
| **ClusterRole**        | -     | 定义集群级别的权限规则                                       |
| **RoleBinding**        | -     | 将 Role 绑定到用户/组/ServiceAccount（命名空间级别）         |
| **ClusterRoleBinding** | -     | 将 ClusterRole 绑定到用户/组/ServiceAccount（集群级别）      |
| **PodSecurityPolicy**  | `psp` | 定义 Pod 的安全策略（已弃用，被 Pod Security Standards 替代） |
| **PodSecurityContext** | -     | 定义 Pod/容器的安全上下文（非独立资源，是字段）              |

* [x] 调度与节点类（Scheduling & Node）

| 资源名称                        | 简称     | 作用                                      |
| ------------------------------- | -------- | ----------------------------------------- |
| **Node**                        | `no`     | 集群中的工作节点（物理机或虚拟机）        |
| **Namespace**                   | `ns`     | 资源隔离的虚拟集群（如 dev、test、prod）  |
| **ResourceQuota**               | `quota`  | 限制命名空间的资源使用总量                |
| **LimitRange**                  | `limits` | 设置命名空间中 Pod/容器的默认资源限制     |
| **PriorityClass**               | `pc`     | 定义 Pod 的调度优先级                     |
| **RuntimeClass**                | -        | 定义不同的容器运行时配置                  |
| **Taint** / **Toleration**      | -        | 节点污点与 Pod 容忍度（字段，非独立资源） |
| **Affinity** / **AntiAffinity** | -        | Pod 亲和性与反亲和性（字段，非独立资源）  |

## 3、labels 的本质是什么？他的作用又是什么？

答：Label其实就一对 `key/value` ，被关联到对象上。他可以起到服务发现和集群调度的作用。

## 4、Service 在 K8s 中有哪几种类型？

答：

| 类型             | 名称          | 访问方式              | 典型使用场景                 |
| :--------------- | :------------ | :-------------------- | :--------------------------- |
| **ClusterIP**    | 集群内部 IP   | 仅集群内部访问        | 微服务内部通信、数据库服务   |
| **NodePort**     | 节点端口      | `<NodeIP>:<NodePort>` | 开发测试、简单外部访问       |
| **LoadBalancer** | 云负载均衡器  | 云厂商提供的公网 IP   | 生产环境、云平台部署         |
| **ExternalName** | 外部 DNS 别名 | 映射到外部域名        | 访问集群外服务、服务迁移过渡 |

## 5、Secret 在k8s中的作用？

答：Secret 解决了密码、token、密钥等敏感数据的配置问题，而不需要把这些敏感数据暴露到镜像或者 Pod Spec中。

PS : 只有与 apiserver 组件进行交互的 pod 才会有如下的 证书、命名空间、tekon密钥。

## 6、简述下PV 和 PVC是什么

答：PV 可以看作可用的存储资源，PVC则是对存储资源的申请需求

## 7、简述Kubernetes Replica Set 和 Replication Controller 之间有什么区别？

答：两者几乎一样，都是确保在任何给定时间运行指定数量的 Pod 副本。不同之处在于RS 使用基于集合的选择器，而 Replication Controller 使用基于权限的选择器。

## 8、一般Kubernetes是如何进行优雅的节点关机维护？

答：由于Kubernetes节点运行大量Pod，因此在进行关机维护之前，建议先使用kubectl drain将该节点的Pod进行驱逐，然后进行关机维护。

## 9、什么是 ConfigMap 和 Secret？

*   ConfigMap：用于存储非敏感的配置数据。
*   Secret：用于存储敏感数据（如密码、密钥）。

## 10、什么是 StatefulSet？  
答案：StatefulSet 用于管理有状态应用，确保 Pod 的唯一性和持久化存储。

## 11、什么是 Service？  
答案：Service 用于定义一组 Pod 的访问策略，提供负载均衡和服务发现。

## 12、什么是 DaemonSet？  
答案：DaemonSet 用于在每个节点上运行一个 Pod 副本，通常用于日志收集或网络代理。

## 13、什么是 Ingress？  
答案：Ingress 用于管理外部访问集群服务的 HTTP/HTTPS 路由。

## 14、如何定义资源清单中的环境变量？  
![](https://i-blog.csdnimg.cn/img_convert/0ca7b33d912a6aef75d0f6180da977d2.png)

## 15、资源清单中的 apiVersion 字段有什么作用？  
答案: apiVersion 指定了 Kubernetes API 的版本，不同资源可能属于不同的 API 组。例如：  
核心 API 组：v1（如 Pod、Service）。  
扩展 API 组：apps/v1（如 Deployment）、batch/v1（如 Job）。

## 16、如何定义资源清单中的资源限制（Resource Limits）？  
答案：  
requests: 容器启动时请求的资源。  
limits: 容器资源使用的上限。

## 17、如何定义 Pod 的健康检查  
答：  
livenessProbe: 检查容器是否存活。  
readinessProbe: 检查容器是否准备好接收流量。

## 18、pod的生命周期  
pod对象自从创建开始至终止退出的时间范围称为生命周期，在这段时间中，pod会处于多种不同的状态，并执行一些操作；其中，创建主容器为必须的操作，其他可选的操作还包括运行初始化容器（init container）、容器启动后钩子（start hook）、容器的存活性探测（liveness probe）、就绪性探测（readiness probe）以及容器终止前狗子（pre stop hook）等，这些操作是否执行则取决于pod的定义。

## 19、描述 Pod 从创建到终止的完整生命周期过程  
kubectl 调用 apiserver –> etcd –> kubelet –> CRI 进行容器初始化；  
首先会先启动一个pause容器（任何pod启动时都会先pause容器）；  
init C 容器不会伴随整个pod的生命周期；如果是正常退出（0），进入main C，否则（非0），一直重启 失败；  
进入main C后有两个参数，start：在刚启动时可以允许他执行一个命令，stop：退出时也可以允许他执行一个命令；  
readiness模板：可以在main C运行的多少秒之后进行就绪检测；检测通过后，pod状态就为running，否则为failed；  
liveness模板：伴随着整个main C的生命周期，当main C里面的进程 与 liveness检测结果不一致时，就可以执行对应的命令；

## 20、Pod 生命周期有哪些主要阶段？  
Pending：Pod 已被系统接受，但容器尚未创建或运行；  
Running：Pod 已绑定到节点，所有容器已创建且至少有一个在运行；  
Succeeded：所有容器成功终止且不会重启；  
Failed：所有容器终止，且至少有一个容器以失败状态退出；  
Unknown：无法获取 Pod 状态（通常由于节点通信问题）；

## 21、Service Account的作用  
答：Service Account 用来访问 Kubernetes API，由 Kubernetes 自动创建，并且会自动挂载到 Pod的/run/secrets/kubernetes.io/serviceaccount目录中。PS : 只有与 apiserver 组件进行交互的 pod 才会有如下的 证书、命名空间、tekon密钥。  
![](https://i-blog.csdnimg.cn/img_convert/659d124bf0dcbca8139e6e2d50b26f67.png)

## 22、PV和PVC的生命周期  
![](https://i-blog.csdnimg.cn/img_convert/834e707b76bd6f6164a01cbcb25f126d.png)

## 23、PV卷都有哪些声明状态  
Available（可用）——一块空闲资源还没有被任何声明绑定  
Bound（已绑定）——卷已经被声明绑定  
Released（已释放）——声明被删除，但是资源还未被集群重新声明  
Failed（失败）——该卷的自动回收失败