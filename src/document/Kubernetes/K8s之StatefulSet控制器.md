---
title: K8s之StatefulSet控制器
icon: circle-info
order: 1
category:
  - Linux
  - kubernetes
tag:
  - Linux
  - kubernetes
  - 运维
date: 2026-04-03
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

## 一、StatefulSet 是什么？

StatefulSet 是 Kubernetes 中专门用于管理**有状态应用（Stateful Applications）** 的工作负载控制器（Controller）。与 Deployment 等无状态控制器不同，StatefulSet 为需要**稳定身份标识、持久化存储和有序生命周期管理**的分布式系统提供了原生支持。

### 1.1 什么是有状态应用（Stateful）？
> **定义**：应用的实例具有**独特的身份和记忆**，依赖本地持久化的数据或维护的上下文状态，不同实例处理相同输入可能产生不同结果。
> **简单理解**：就像一个有记忆的人，记得过去发生的事情，并且这些记忆会影响他未来的行为。

**核心特征**：
- **身份唯一性**：每个实例有固定 ID，集群中角色不同（主/从/分片）
- **数据持久化**：本地存储包含业务数据、配置状态或会话信息
- **拓扑敏感**：实例间存在固定的通信关系（如主从复制）
- **生命周期复杂**：扩缩容需考虑数据重分布，故障恢复需保证数据一致性

**典型例子**：
- MySQL/PostgreSQL 数据库（存储业务数据）
- Redis/Memcached 缓存（虽然数据可重建，但通常视为有状态）
- Kafka/RabbitMQ 消息队列（消息持久化）
- ZooKeeper/etcd 协调服务（维护集群元数据）
- Elasticsearch（索引数据分片）

### 1.2 什么是无状态应用（Stateless）？

> **定义**：应用的每个实例都是**完全对等且可互换**的，不依赖本地存储的任何历史信息或上下文，任何请求都可以由任意实例处理，结果完全相同。
>  **简单理解**：就像一个"金鱼记忆"的人，每3秒都忘记之前发生的事，每次都是全新的开始。

**核心特征**：
- **无本地依赖**：不保存会话、不缓存用户数据、不记录处理历史
- **即抛即用**：实例可以随时创建或销毁，用户无感知
- **水平扩展简单**：增加实例即可提升性能，无需数据同步
- **故障自愈快**：实例故障后立即重建，无需数据恢复

**典型例子**：
- Nginx/Apache 反向代理（仅转发请求）
- REST API 服务（每次请求携带完整认证信息）
- 静态资源服务器
- 函数计算（Serverless）


### 1.3 关键区别对比

| 维度 | 无状态（Stateless） | 有状态（Stateful） |
|------|---------------------|-------------------|
| **数据存储** | 不保存数据，或仅使用临时缓存（`emptyDir`） | 必须持久化数据到磁盘（数据库、日志、配置） |
| **实例身份** | 无身份，完全对等，随机命名 | 有唯一固定身份（ID、hostname、角色） |
| **请求处理** | 任意实例可处理任意请求，结果一致 | 特定请求必须由特定实例处理（如分片查询） |
| **扩缩容** | 秒级扩缩容，简单增加/减少副本数 | 需数据迁移、重新分片、集群拓扑变更 |
| **故障影响** | 实例故障=服务短暂降级，重建即可 | 实例故障=可能数据丢失，需复杂恢复流程 |
| **网络依赖** | 仅需入口负载均衡 | 需实例间直接通信（如复制、选举、心跳） |
| **K8s 控制器** | Deployment、ReplicaSet、DaemonSet | StatefulSet、Operator |
| **存储需求** | 无需 PVC，或使用共享只读存储 | 必须独立 PVC，ReadWriteOnce 模式 |
### 1.4 StatefulSet 的核心特征


1. **稳定的网络标识**：为每个 Pod 分配唯一、有序的序号（如 `web-0`, `web-1`），并提供基于 DNS 的服务发现
2. **持久化存储管理**：通过 `volumeClaimTemplates` 自动为每个 Pod 创建独立的 PVC，实现**存储与 Pod 生命周期解耦**
3. **有序生命周期管理**：严格保证 Pod 的创建、删除、扩缩容和滚动更新的顺序性
4. **优雅状态管理**：支持优雅终止（Graceful Termination）和启动后钩子（Post-start），确保状态一致性


## 二、StatefulSet 和 Deployment 的区别


| 对比维度 | Deployment（无状态应用） | StatefulSet（有状态应用） |
|---------|------------------------|--------------------------|
| **Pod 名字** | 随机生成，如 `web-abc123`、`web-def456`<br>每次重建名字都变 | **固定序号**，如 `web-0`、`web-1`、`web-2`<br>重建后名字不变 |
| **网络身份** | 只有 IP 会变，像个"流浪汉"<br>其他 Pod 很难找到它 | **固定的网络标识**：`pod-name.service-name`<br>其他 Pod 总能找到它 |
| **数据存储** | 一般不存数据，或都用共享存储<br>Pod 挂了数据丢了无所谓 | **每人一个独立存储空间**<br>Pod 挂了数据还在，重建后自动挂载 |
| **启动顺序** | 大家一起上，谁先启动都行<br>像餐厅所有窗口同时开 | **排队启动**：0号先上，准备好后1号再上<br>像银行柜台一个一个开 |
| **关闭顺序** | 随便关，关哪个都行 | **从后往前关**：最后一个先关，依次往前<br>保证主节点最后退出 |
| **扩缩容** | 想扩就扩，想缩就缩<br>新 Pod 和老 Pod 没区别 | **按序号扩缩**：扩容从下一个序号开始<br>缩容从最大序号开始删 |
| **更新方式** | 可以一次性全更新<br>或者滚动更新，顺序无所谓 | **从后往前更新**<br>支持暂停在某个版本（partition） |
| **适用场景** | Web服务、API网关<br>前端应用、计算任务 | 数据库（MySQL、Redis）<br>消息队列（Kafka、ZooKeeper） |


### 2.1 详解：Pod 身份与网络标识

| 特性 | Deployment | StatefulSet |
|------|------------|-------------|
| **Pod 命名规则** | 随机哈希后缀<br>`nginx-7564c8f6b4-9xv5r` | 固定有序序号<br>`web-0`, `web-1`, `web-2` |
| **Hostname 稳定性** | 每次重建都变化 | 永久固定，与序号绑定 |
| **DNS 解析** | 通过 Service 解析到随机 Pod IP | 支持**直接 Pod DNS 解析**：<br>`<pod-name>.<service-name>.<namespace>.svc.cluster.local` |
| **Headless Service** | 可选，通常不需要 | **必须**，用于提供稳定网络标识 |
| **网络身份示例** | 无固定身份 | `mysql-0.mysql.default.svc.cluster.local` 始终指向 mysql-0 |

**关键差异说明**：
- **Deployment**：Service 通过 `ClusterIP` 做负载均衡，请求随机分发到后端 Pod，Pod 重建后 IP 和名称都变
- **StatefulSet**：必须配合 `clusterIP: None` 的 Headless Service，DNS 直接解析到 Pod IP，且 Pod 重建后 DNS 记录保持不变

### 2.2 详解：存储与数据管理

| 特性 | Deployment | StatefulSet |
|------|------------|-------------|
| **存储定义方式** | 在 Pod 模板中直接定义 `volumes` 或引用现有 PVC | 使用 `volumeClaimTemplates` 动态为每个 Pod 创建独立 PVC |
| **PVC 与 Pod 关系** | 多个 Pod 可共享同一个 PVC（需支持多挂载）<br>或每个 Pod 手动挂载相同 PVC | **每个 Pod 独占一个 PVC**，一对一绑定，命名规则：`<pvc-name>-<statefulset-name>-<ordinal>` |
| **数据持久性** | Pod 删除，数据可能丢失（取决于卷类型） | Pod 删除，PVC 保留，数据持久化；新 Pod 自动挂载原 PVC |
| **存储扩容** | 需手动修改 PVC | 需手动修改 PVC，或依赖 StorageClass 支持在线扩容 |
| **数据隔离性** | 低（共享存储）或手动管理 | 高（自动隔离，每个 Pod 独立存储） |

**存储绑定示例**：
```yaml
# StatefulSet 会自动创建：
# PVC: disk-ssd-web-0 → PV: pv-001 (绑定)
# PVC: disk-ssd-web-1 → PV: pv-002 (绑定)
# 即使 web-0 被删除重建，disk-ssd-web-0 仍会重新挂载到原 PV
```

### 2.3 详解：部署与扩缩容行为

| 操作 | Deployment | StatefulSet |
|------|------------|-------------|
| **创建顺序** | **并行创建**，所有 Pod 同时启动 | **串行创建**，按序号 0→1→2→...，前一个 Ready 后才创建下一个 |
| **扩容行为** | 并行扩容，新 Pod 立即创建 | 按序号递增顺序创建，保证集群拓扑逐步扩展 |
| **缩容行为** | 随机删除 Pod | **按序号递减删除**（先删 N-1，再删 N-2...），保证有序缩减 |
| **滚动更新** | 随机替换，可设置 `maxSurge`/`maxUnavailable` | **逆序替换**（先更新 N-1，最后更新 0），可设置 `partition` 进行灰度发布 |
| **更新策略** | `RollingUpdate`（默认）、`Recreate` | `RollingUpdate`（默认）、`OnDelete`（手动删除后重建） |

**有序性意义**：
- **主从架构**：先启动主节点（0），再启动从节点（1,2...），避免从节点找不到主而崩溃
- **数据安全**：缩容时先移除高序号节点，避免破坏集群的法定人数（Quorum）
- **灰度发布**：通过 `partition` 控制只更新部分节点，如 `partition: 2` 表示只更新序号 ≥2 的 Pod


### 2.4 运维与故障处理对比

| 场景 | Deployment | StatefulSet |
|------|------------|-------------|
| **Pod 故障重建** | 立即创建新 Pod，随机命名，无状态恢复 | 按原序号重建，挂载原 PVC，自动恢复数据和身份 |
| **节点迁移** | 快速调度到新节点 | 需等待原 PVC 在目标节点可用（依赖存储拓扑） |
| **版本回滚** | `kubectl rollout undo` 快速回滚 | 需手动控制，逆序回滚，需关注数据兼容性 |
| **数据备份** | 通常无需备份 Pod 级数据 | **必须制定备份策略**，PVC 独立存在需单独管理 |
| **监控重点** | 整体吞吐量、错误率 | 单节点状态、存储容量、复制延迟、集群拓扑完整性 |


## 三、StatefulSet 的使用 - 实例
> 部署一个Nginx StatefulSet

* 先创建一个nginx的namespace

```bash
kubectl create ns nginx
```
### 3.1 检查是否有  storageclass 资源

```bash
kubectl get storageclass -A
```
如果有资源（任何都行，只要不提示`No resources found`就行），在 `nginx-StatefulSet.yaml`中的`storageClassName`请填写成有的，如果没有，可按照如下添加`storageclass`；

可地址直接安装：`kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml`

如果地址拉取不到可使用如下：
* `vi local-path-storage.yaml`

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: local-path-storage

---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: local-path-provisioner-service-account
  namespace: local-path-storage

---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: local-path-provisioner-role
  namespace: local-path-storage
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch", "create", "patch", "update", "delete"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: local-path-provisioner-role
rules:
  - apiGroups: [""]
    resources: ["nodes", "persistentvolumeclaims", "configmaps", "pods", "pods/log"]
    verbs: ["get", "list", "watch"]
  - apiGroups: [""]
    resources: ["persistentvolumes"]
    verbs: ["get", "list", "watch", "create", "patch", "update", "delete"]
  - apiGroups: [""]
    resources: ["events"]
    verbs: ["create", "patch"]
  - apiGroups: ["storage.k8s.io"]
    resources: ["storageclasses"]
    verbs: ["get", "list", "watch"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: local-path-provisioner-bind
  namespace: local-path-storage
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: local-path-provisioner-role
subjects:
  - kind: ServiceAccount
    name: local-path-provisioner-service-account
    namespace: local-path-storage

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: local-path-provisioner-bind
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: local-path-provisioner-role
subjects:
  - kind: ServiceAccount
    name: local-path-provisioner-service-account
    namespace: local-path-storage

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: local-path-provisioner
  namespace: local-path-storage
spec:
  replicas: 1
  selector:
    matchLabels:
      app: local-path-provisioner
  template:
    metadata:
      labels:
        app: local-path-provisioner
    spec:
      serviceAccountName: local-path-provisioner-service-account
      containers:
        - name: local-path-provisioner
          image: rancher/local-path-provisioner:v0.0.35
          imagePullPolicy: IfNotPresent
          command:
            - local-path-provisioner
            - --debug
            - start
            - --config
            - /etc/config/config.json
          volumeMounts:
            - name: config-volume
              mountPath: /etc/config/
          env:
            - name: POD_NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
            - name: CONFIG_MOUNT_PATH
              value: /etc/config/
      volumes:
        - name: config-volume
          configMap:
            name: local-path-config

---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local-path
provisioner: rancher.io/local-path
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Delete

---
kind: ConfigMap
apiVersion: v1
metadata:
  name: local-path-config
  namespace: local-path-storage
data:
  config.json: |-
    {
            "nodePathMap":[
            {
                    "node":"DEFAULT_PATH_FOR_NON_LISTED_NODES",
                    "paths":["/opt/local-path-provisioner"]
            }
            ]
    }
  setup: |-
    #!/bin/sh
    set -eu
    mkdir -m 0777 -p "$VOL_DIR"
  teardown: |-
    #!/bin/sh
    set -eu
    rm -rf "$VOL_DIR"
  helperPod.yaml: |-
    apiVersion: v1
    kind: Pod
    metadata:
      name: helper-pod
    spec:
      priorityClassName: system-node-critical
      tolerations:
        - key: node.kubernetes.io/disk-pressure
          operator: Exists
          effect: NoSchedule
      containers:
      - name: helper-pod
        image: busybox
        imagePullPolicy: IfNotPresent
```

在进行创建

```bash
kubectl apply -f local-path-storage.yaml
```
查看是否创建成功
```bash
kubectl get storageclass
```
看到如下内容即可

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604101504377.png)


### 3.2 创建Headless Service
Headless Service（`clusterIP: None`）会为每个 Pod 创建独立的 DNS 记录：
* `vi nginx-Headless.yaml`
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
  namespace: nginx
  labels:
    app: nginx
spec:
  type: ClusterIP
  selector:
    app: nginx
  clusterIP: None
  sessionAffinity: None
  ports:
    - name: web
      port: 80
      protocol: TCP
```

### 3.3 创建StatefulSet
* `vi nginx-StatefulSet.yaml`
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: nginx
  namespace: nginx
spec:
  serviceName: nginx
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      initContainers:
      - name: init-html
        image: busybox
        command: 
          - sh
          - -c
          - |
            # 检查是否已初始化
            if [ ! -f /mnt/html/.initialized ]; then
              echo "First boot - creating initial content"
              echo "Welcome to nginx - $(hostname) - $(date)" > /mnt/html/index.html
              echo "This is a test page" >> /mnt/html/index.html
              touch /mnt/html/.initialized  # 创建标记文件
            else
              echo "Already initialized, keeping existing content"
            fi
        volumeMounts:
        - name: www
          mountPath: /mnt/html
      containers:
      - name: nginx
        image: nginx:1.24
        imagePullPolicy: IfNotPresent
        ports:
        - name: web
          containerPort: 80
        volumeMounts:
        - name: www
          mountPath: /usr/share/nginx/html
        livenessProbe:
          initialDelaySeconds: 10
          periodSeconds: 10
          tcpSocket:
            port: 80
        readinessProbe:
          initialDelaySeconds: 10
          periodSeconds: 10
          httpGet:
            path: /
            port: 80
  volumeClaimTemplates:
  - metadata:
      name: www
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: "local-path"  # 根据storageclass集群修改
      resources:
        requests:
          storage: 1Gi
```
### 3.4 使用StatefulSet部署nginx服务
* [x] 部署nginx Headless Service

```bash
kubectl apply -f nginx-Headless.yaml
```
* 查看是否创建成功

```bash
kubectl get svc -n nginx
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604101504288.png)


* [x] 部署nginx StatefulSet
```bash
kubectl apply -f nginx-StatefulSet.yaml
```
* 查看是否创建成功

```bash
# 查看nginx pvc
kubectl get pvc -n nginx -w
# 查看nginx pod
kubectl get pod -n nginx -w
# 查看nginx StatefulSet
kubectl get sts -n nginx -o wide
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604101504994.png)



### 3.5 验证StatefulSet特性

创建完成后，可以观察到以下现象：

1. **Pod有序创建**：
```bash
[root@k8s-master StatefulSet]# kubectl  get pods -n nginx -o wide
NAME      READY   STATUS    RESTARTS   AGE     IP                NODE        NOMINATED NODE   READINESS GATES
nginx-0   1/1     Running   0          3m37s   192.168.36.94     k8s-node1   <none>           <none>
nginx-1   1/1     Running   0          3m19s   192.168.36.99     k8s-node1   <none>           <none>
nginx-2   1/1     Running   0          3m      192.168.169.143   k8s-node2   <none>           <none>
```

2. **稳定的网络标识**：
```bash
[root@k8s-master StatefulSet]# kubectl exec -n nginx nginx-0 -- hostname
nginx-0

# 通过DNS解析访问（这里需要注意，指定nginx部署的ns，要不然会报无法解析）
[root@k8s-master StatefulSet]# kubectl run -it --rm busybox --image=busybox:1.28 --restart=Never -n nginx -- nslookup nginx-0.nginx 2>/dev/null || echo "测试失败"
Server:    10.0.0.2
Address 1: 10.0.0.2 kube-dns.kube-system.svc.cluster.local

Name:      nginx-0.nginx
Address 1: 192.168.36.94 nginx-0.nginx.nginx.svc.cluster.local
```

3. **独立的持久化存储**：
```bash
# 查看自动创建的PVC
[root@k8s-master StatefulSet]# kubectl get pvc -n nginx
NAME          STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
www-nginx-0   Bound    pvc-67c250d5-3e78-4c69-a4ad-2bfacf84c54b   1Gi        RWO            local-path     5d
www-nginx-1   Bound    pvc-13f90069-60b5-4c93-86c3-76e1377b5098   1Gi        RWO            local-path     5d
www-nginx-2   Bound    pvc-2ba2e9e5-5794-4b6e-af5b-b940ccb414e1   1Gi        RWO            local-path     5d
```

4. **Pod重建后保持数据**：
```bash
# 查看nginx-0 默认的index.html数据
kubectl exec -n nginx nginx-0 -- bash -c "cat /usr/share/nginx/html/index.html"

# 在nginx-0中写入数据
kubectl exec -n nginx nginx-0 -- bash -c 'echo "Hello Nginx, Im’s nginx-0 pod !!! " > /usr/share/nginx/html/index.html'

# 查看nginx-0 修改后的index.html数据
kubectl exec -n nginx nginx-0 -- bash -c "cat /usr/share/nginx/html/index.html"

# 删除nginx-0
kubectl delete pods -n nginx nginx-0

# StatefulSet会自动重建，查看nginx-o pod是否重建
kubectl get pods -n nginx -w

# 重建成功再次查看nginx-0 pod容器里index.html里的内容
kubectl exec -n nginx nginx-0 -- bash -c "cat /usr/share/nginx/html/index.html"
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604101504149.png)


> **注意**：如果数据被覆盖为最初的数据了，可能是因为创建pod的时候会直接写入默认的配置，导致把后来修改的数据重写了。
> 这里我在创建`nginx-StatefulSet`的时候是先手动添加数据了，因为默认没有`index.html`，会导致启动失败，所以需要先写入数据才可以；并且加了个判断，如果存在这个文件那么就不会写入数据，这样就不会在重建pod的时候数据重写了。



## 四、StatefulSet的更新策略

StatefulSet支持两种更新策略，通过`spec.updateStrategy.type` 字段控制：

| 策略类型 | 行为 | 适用场景 |
|---------|------|----------|
| **RollingUpdate** (默认) | 按顺序从后向前滚动更新 Pod | ✅ 大多数场景 |
| **OnDelete** | 手动删除 Pod 后才更新 | ⚠️ 需要完全控制更新时机的场景 |

### 4.1 RollingUpdate 策略（默认）
#### 4.1.1 基本更新写法
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: nginx
spec:
  updateStrategy:
    type: RollingUpdate  # 默认值，可不写
  # ... 其他配置
```

**更新顺序**：
1. 从**序号最大**的 Pod 开始更新（从后向前）
2. 依次向前推进（nginx-2 → nginx-1 → nginx-0）
3. 每个 Pod 更新成功并进入 Ready 状态后，才更新下一个

**为什么从后往前？**
- 保证主节点（通常是序号0）最后更新
- 对于主从架构的应用，先更新从节点，最后更新主节点
- 减少对服务的影响



#### 4.1.2 分区更新（Partition）- **重要特性**

RollingUpdate 支持 `partition` 参数，可以**控制更新的范围**：

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: nginx
spec:
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      partition: 2  # 只更新序号 >= 2 的 Pod
  # ... 其他配置
```

**分区规则**：
- **序号 >= partition** 的 Pod 会被更新
- **序号 < partition** 的 Pod 保持旧版本

#### 4.1.3 分区更新实例：

假设有 3 个副本：nginx-0, nginx-1, nginx-2

| partition 值 | 哪些 Pod 被更新 | 哪些 Pod 保持不变 |
|-------------|----------------|------------------|
| `partition: 0` | nginx-2, nginx-1, nginx-0 (全部) | 无 |
| `partition: 1` | nginx-2, nginx-1 | nginx-0 |
| `partition: 2` | nginx-2 | nginx-0, nginx-1 |
| `partition: 3` | 无 | nginx-0, nginx-1, nginx-2 (全部) |

* [x] 场景1：金丝雀发布（Canary Release）

```yaml
# 第一步：只更新最后一个 Pod 做测试
updateStrategy:
  type: RollingUpdate
  rollingUpdate:
    partition: 2  # 只更新 nginx-2
```

测试 nginx-2 没问题后，更新其他所有的pod：

```yaml
# 第二步：更新所有 Pod
updateStrategy:
  type: RollingUpdate
  rollingUpdate:
    partition: 0  # 更新全部
```

* [x]  场景2：维护主节点不更新

```yaml
# 主节点是 nginx-0，保持不更新
updateStrategy:
  type: RollingUpdate
  rollingUpdate:
    partition: 1  # 只更新 nginx-1, nginx-2
```

* [x]  场景3：分批发布

```yaml
# 第1批：更新 30%（最后一个）更新完需测试
partition: 2

# 第2批：更新 60%（后两个）更新完需测试
partition: 1

# 第3批：更新 100%       更新完需测试
partition: 0
```
### 4.2 OnDelete 策略（手动触发）

* [x] OnDelete 策略写法
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: nginx
spec:
  updateStrategy:
    type: OnDelete  # 手动模式
  # ... 其他配置
```

* [x] 行为特点

1. **K8s 不会自动更新任何 Pod**
2. 只有当你**手动删除 Pod** 时，重建的 Pod 才会使用新配置
3. 你可以控制每个 Pod 的更新时机

* [x] 适用场景

- **数据库版本升级**：需要逐个节点手动操作，确保数据同步
- **核心业务**：需要在业务低峰期逐个更新
- **需要手动验证**：每个节点更新后都要手动验证
- **配合外部工具**：与 Ansible、Jenkins 等工具集成

* [x] 实际操作示例

```bash
# 1. 修改 StatefulSet 镜像版本（但不会立即生效）
kubectl patch sts -n nginx nginx -p '{"spec":{"template":{"spec":{"containers":[{"name":"nginx","image":"nginx:1.25"}]}}}}'

# 2. 手动删除要更新的 Pod
kubectl delete pod -n nginx nginx-2  # 先更新最后一个
## 更新完成查看版本号，确认是否更新成功
kubectl exec -n nginx nginx-2 -- nginx -v

# 3. 验证 nginx-2 没问题后
kubectl delete pod -n nginx nginx-1  # 更新中间
## 更新完成查看版本号，确认是否更新成功
kubectl exec -n nginx nginx-2 -- nginx -v

# 4. 最后更新主节点
kubectl delete pod -n nginx nginx-0
## 更新完成查看版本号，确认是否更新成功
kubectl exec -n nginx nginx-2 -- nginx -v

```


- 控制器不会自动更新Pod
- 需要**手动删除Pod**才能触发重建更新
- 适用于需要**完全控制更新时机**的场景，如核心应用的流量无损升级

### 4.3 更新策略对比
| 特性 | RollingUpdate | OnDelete |
|------|--------------|----------|
| **自动更新** | ✅ 是 | ❌ 否 |
| **更新顺序** | 从后往前 | 由你控制 |
| **分区控制** | ✅ 支持 (partition) | ❌ 不支持 |
| **回滚方式** | 重新设置 image 或 partition | 手动删除重建 |
| **适用场景** | Web服务、缓存、一般应用 | 数据库、核心应用、特殊需求 |

### 4.4 更新策略选择建议
* 选择 RollingUpdate 当：
✅ 应用无状态或能优雅处理滚动重启  
✅ 想要自动化更新  
✅ 需要金丝雀发布（配合 partition）  
✅ 更新风险较低  

* 选择 OnDelete 当：
✅ 数据库等有状态核心应用  
✅ 需要手动干预每个节点的更新  
✅ 更新风险高，需要逐个验证  
✅ 有外部编排工具（Ansible、Operator）  


## 五、StatefulSet vs. Deployment：如何选择？

| 特性 | StatefulSet | Deployment |
|------|-------------|------------|
| Pod命名 | 固定有序名称（xxx-0, xxx-1） | 随机名称（xxx-随机字符串） |
| 网络标识 | 稳定，Pod重建不变 | 变化，每次重建新IP |
| 存储 | 支持PVC模板，持久化存储 | 通常使用共享存储或临时存储 |
| 顺序控制 | 有序部署、更新、删除 | 并行操作 |
| 适用场景 | 数据库、消息队列、有状态服务 | Web服务、API网关、无状态应用 |

**选择建议**：
- 应用需要**稳定的网络标识** → 选择StatefulSet
- 应用需要**独立的持久化存储** → 选择StatefulSet
- 应用要求**有序的部署和更新** → 选择StatefulSet
- 否则，优先考虑Deployment或ReplicaSet

## 六、注意事项

1. **数据安全**：StatefulSet删除时不会自动删除PVC，需**手动清理**不再需要的存储卷，避免资源浪费

2. **Headless Service必须**：StatefulSet必须关联Headless Service才能保证网络标识的稳定性

3. **存储类选择**：根据性能需求选择合适的StorageClass，生产环境推荐使用SSD或高性能云盘

4. **备份策略**：虽然StatefulSet保证了Pod重建后的数据持久性，但仍需建立**定期备份机制**，防止数据损坏或误删除

5. **缩容谨慎**：缩容StatefulSet会导致Pod被删除，但PVC保留。如果希望彻底清理，需要手动删除对应的PVC

## 七、总结

StatefulSet是Kubernetes中管理有状态应用的核心控制器，通过**稳定的网络标识**、**独立的持久化存储**和**有序的生命周期管理**，为数据库、消息队列等有状态应用提供了完善的运行环境。掌握StatefulSet的使用，意味着你能够将更多的传统应用平滑地迁移到Kubernetes平台，充分发挥容器编排的优势。

在实际应用中，需要根据业务需求合理选择更新策略和Pod管理策略，同时注意数据安全和备份，才能构建出稳定可靠的有状态应用系统。
