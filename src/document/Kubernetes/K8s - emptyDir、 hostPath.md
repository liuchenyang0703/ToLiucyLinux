---
title: Kubernetes 非共享存储详解：emptyDir 与 hostPath 从入门到实践
icon: circle-info
order: 1
category:
  - Linux
  - kubernetes
tag:
  - Linux
  - kubernetes
  - 存储
  - 运维
pageview: false
date: 2026-08-10
comment: false
breadcrumb: false
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


![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241735786.jpeg)

## 一、前言

在Kubernetes容器编排体系中，存储管理是支撑有状态服务稳定运行的基石。根据数据是否跨节点共享，存储可大体分为**共享存储**（如NFS、CephFS、GlusterFS）与**非共享存储**两大类。共享存储适用于多Pod并发读写、数据集中管理的场景，但其依赖网络，存在性能损耗和单点故障风险；而非共享存储则将数据绑定在单个Pod或单台节点上，具有**低延迟、高吞吐、无网络开销**的优势，尤其适合缓存、临时计算、节点运维及高性能单机数据库等场景。

本文聚焦于Kubernetes内置的两种非共享存储方案——**`emptyDir`** 与 **`hostPath`**，深入剖析其实现原理、生命周期、适用边界及生产环境中的局限性，帮助大家在存储选型时做出合理决策。


## 二、存储的两大类

在Kubernetes的非共享存储体系中，原生提供的两类存储卷分别是 **临时卷（Ephemeral Volume）** 和 **宿主机卷（HostPath Volume）**。前者以 `emptyDir` 为代表，后者以 `hostPath` 为核心。两者的共同特征是数据不通过网络传输，仅存在于本地节点，但它们在生命周期、隔离性和使用场景上有着本质差异。

### 2.1 临时卷：emptyDir

`emptyDir` 是最基础的临时存储卷类型。当Pod被调度到某节点时，Kubelet会在该节点的 `/var/lib/kubelet/pods/<pod-id>/volumes/` 目录下为Pod创建一个空目录，并将其挂载至容器内的指定路径。该目录的**生命周期与Pod完全一致**——只要Pod在节点上运行，目录就存在；Pod被删除时，目录及其数据会被永久清理。若Pod内容器发生崩溃重启（非Pod删除），目录中的数据会完整保留，因为Pod本身并未销毁。

在数据隔离方面，同一个Pod内的多个容器可以同时挂载同一个 `emptyDir` 卷，实现高效的容器间数据交换（例如，主业务容器将日志写入 `/var/log`，Sidecar日志收集器读取该目录并转发至后端）。不同Pod之间的 `emptyDir` 则完全隔离，互不可见。

其典型适用场景包括：
- 应用程序运行时产生的临时缓存文件（如Nginx的 `/tmp` 目录、前端构建工具的中间产物）；
- 同一Pod内多个容器通过本地文件系统进行通信的“中转站”；
- 需利用节点本地磁盘I/O性能的短暂计算任务（如MapReduce中间结果）。

然而，`emptyDir` 的致命弱点是**数据非持久化**，一旦Pod被删除，数据便永久丢失。此外，它受限于节点的本地磁盘容量，若Pod未设置资源配额，可能因写入大量数据而填满节点磁盘，影响同一节点上的其他Pod。

### 2.2 宿主机卷：hostPath

`hostPath` 卷则将宿主机节点上的指定文件或目录直接挂载到容器内部。它跳过了Kubelet的临时目录管理，直接暴露节点的底层文件系统。这种设计使得 `hostPath` 的**生命周期与节点绑定**——只要Pod运行在该节点上，挂载路径即有效；一旦Pod因故障、缩容或调度策略变更而漂移到其他节点，数据便无法被新Pod继承。

**简单理解**：hostPath 就和 Docker 的 `-v` 绑定挂载一样，直接把宿主机目录映射到容器。但 Kubernetes 是多节点集群，Pod 如果持久化数据到 node2 的本地目录，那么当 Pod 因故障、缩容或滚动更新被重建时，调度器可能把它调度到 node1 或 node3，此时新 Pod 的容器里挂载的是新节点上的目录，**之前 node2 的数据就彻底“失联”了**。除非你额外用 nodeSelector 强行把 Pod 钉死在 node2，否则数据不会自动跟随 Pod 迁移。

与 `emptyDir` 不同，`hostPath` 的数据隔离性较差。若同一个节点上的多个Pod挂载了相同的宿主机目录，它们将互相读写同一份数据，这在某些场景下会带来非预期的数据冲突和安全隐患。

`hostPath` 主要用于以下有限的场景：
- **运维与监控**：Pod需要读取节点的系统日志（如 `/var/log`）、cgroup文件或内核参数（如 `/proc`、`/sys`），以实现监控代理或故障排查工具的功能；
- **网络与存储插件**：CNI网络插件（如Calico、Flannel）需要访问宿主机的网络配置目录（如 `/etc/cni/net.d`），CSI存储插件需要挂载宿主机的设备文件（如 `/dev`）；
- **本地单节点测试**：开发环境中用于快速验证持久化逻辑，但**严禁在生产环境中用于业务数据**。

`hostPath` 的风险更为突出：首先，它将Pod与特定节点强绑定，破坏了Kubernetes调度的灵活性；其次，容器内进程若拥有足够权限，可能误删或破坏宿主机关键文件，带来严重的安全隐患；最后，当节点发生故障时，数据恢复难度极大。

### 2.3 选型对比速览

| 存储类型 | 数据生命周期 | 隔离性 | 适用场景 | 生产环境建议 |
|---------|------------|--------|---------|------------|
| **emptyDir** | Pod生命周期 | 容器间可共享，Pod间隔离 | 缓存、临时计算、Sidecar通信 | 可用于临时数据，禁止持久化 |
| **hostPath** | 节点生命周期 | 弱隔离，同节点Pod可互访 | 节点运维、特权插件、单机调试 | **强烈不推荐用于业务数据** |

综上，`emptyDir` 和 `hostPath` 作为Kubernetes内置的非共享存储基元，定位明确且不可互相替代。对于生产环境而言，应严格遵循“临时数据用 `emptyDir`，节点系统数据用 `hostPath`”的原则。

当业务应用需要真正持久化存储时（如数据库、消息队列、用户上传文件等），上述两种内置卷均无法满足要求。此时应通过 **持久卷（PersistentVolume，PV）** 与 **持久卷声明（PersistentVolumeClaim，PVC）** 机制接入外部存储系统，例如云厂商提供的块存储（AWS EBS、阿里云云盘）、分布式网络文件系统（NFS、CephFS）或高性能分布式块存储（Ceph RBD）。PV/PVC 将底层存储细节与 Pod 解耦，使得存储资源能够独立于 Pod 生命周期存在，并支持动态扩容、快照备份及跨节点数据迁移，是生产环境持久化存储的标准解决方案。

## 三、存储两大类的实例展示
### 3.1 临时卷：emptyDir

* 编辑一个yaml，进行测试
`vi empty.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: emptydir-test
  namespace: default
spec:
  containers:
    - name: empty-test1
      image: nginx:1.24
      imagePullPolicy: IfNotPresent
      ports:
        - containerPort: 80
          protocol: TCP
      volumeMounts:
        - name: emptydir
          mountPath: /test1
    - name: empty-test2
      image: busybox:latest
      imagePullPolicy: IfNotPresent
      command: ["sh","-c","sleep 3600"]
      volumeMounts:
        - name: emptydir
          mountPath: /test2
  volumes:
    - name: emptydir
      emptyDir: {}
```
> 一个pod里面有两个容器，主要测一下这两个容器之间数据互通


* 创建pod

```bash
kubectl apply -f empty.yaml
```
* 查看pod状态，`READY`结果应该是`2/2`，`STATUS`应该是`Running`，这是正常启动了；

```bash
[root@k8s-master cunchu]# kubectl get pods 
NAME            READY   STATUS    RESTARTS   AGE
emptydir-test   2/2     Running   0          7s
```
* 测试写入数据

```bash
# 往test1容器里的test1下创建个文件写入数据
kubectl exec emptydir-test -c empty-test1 -- bash -c 'echo "test测试emptydir" > /test1/1.txt'

# 查看test1容器里的文件是否写入数据
kubectl exec emptydir-test -c empty-test1 -- bash -c 'cat /test1/1.txt'

# 查看test2容器里的test2下的这个文件
kubectl exec emptydir-test -c empty-test2 -- sh -c 'cat /test2/1.txt'
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241735746.png)


可以看到，数据是写进来并且共享了，但也仅限一个pod中的容器之间进行共享，多个pod是无法进行数据共享的。


---

也可以在宿主机查看数据，需要去此pod所在的节点上进行查看，地址例如：`cd /var/lib/kubelet/pods/${{pod id}}/volumes/kubernetes.io~empty-dir/emptydir/`；
pod id的获取方式需要在主节点查看yaml进行获取：`kubectl get pod emptydir-test -o yaml | grep -i uid`

```bash
################# master节点执行 ################# 
# 先确认此pod是在哪个节点上运行的
kubectl get pods -o wide 

# 查看此pod的uid
kubectl get pod emptydir-test -o yaml| grep -i uid

################# node2节点执行 ################# 
# 进入运行的节点并切换到执行目录
cd /var/lib/kubelet/pods/1cf5ced0-89e3-4181-b6d2-c8b0e2e960a6/volumes/kubernetes.io~empty-dir/emptydir/

# 查看是否有1.txt文件
ls 

# 查看文件内容是否一致
cat 1.txt
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241735702.png)

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241735356.png)


---


### 3.2 宿主机卷：hostPath


* 编辑一个yaml，进行测试
`vi hostpath.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hostpath-test
  namespace: default
spec:
  terminationGracePeriodSeconds: 30
  containers:
    - name: test
      image: nginx:1.24
      imagePullPolicy: IfNotPresent
      ports:
        - containerPort: 80
          protocol: TCP
      volumeMounts:
        - name: host-test
          mountPath: /host-test
  volumes:
    - name: host-test
      hostPath: 
         path: /data/host-test  # 宿主机上的绝对路径
         type: DirectoryOrCreate  # 检查类型
```
> 容器里的路径为：`/host-test`，容器外的挂载路径为：`/data/host-test`，测试数据是否会同步到宿主机

* [x] type 常用参数解析

> 在使用 `hostPath` 时，建议明确指定 `type` 以增强防御性编程：
> * `DirectoryOrCreate`：如果宿主机上不存在此路径，K8s 会自动帮你创建一个空目录（权限为 0755）。
> * `Directory`：宿主机上必须已存在该目录，否则 Pod 启动失败。
> * `FileOrCreate`：如果宿主机不存在此文件，自动创建空文件。
> * `File`：宿主机必须存在该文件。

* 创建pod

```bash
kubectl apply -f hostpath.yaml
```
* 查看pod状态，`READY`结果应该是`1/1`，`STATUS`应该是`Running`，这是正常启动了；

```bash
[root@k8s-master cunchu]# kubectl get pods
NAME            READY   STATUS    RESTARTS   AGE
hostpath-test   1/1     Running   0          55s
```
* 测试写入数据

```bash
# 往test容器里的host-test下创建个文件写入数据
kubectl exec hostpath-test -c test -- bash -c 'echo "测试hostpath方式挂载" > /host-test/cs.txt'

# 查看test容器里的文件是否写入数据
kubectl exec hostpath-test -c test -- bash -c 'cat /host-test/cs.txt'
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241736678.png)



可以看到，数据是写进来了，然后我们再去宿主机上查看是否写入数据；

* 查看运行在哪个节点上

```bash
kubectl get pods -o wide
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241736546.png)


* 看到在`node2`节点上，去`node2`节点查看`/data/host-test`下是否有文件和数据

```bash
cd /data/host-test 
ls
cat cs.txt
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241736752.png)

## 四、结束 - 总结 - 扩展

> **总结**：本文介绍的 `emptyDir` 和 `hostPath` 是Kubernetes内置的基础存储，适用于临时缓存和节点运维等场景。但它们都无法满足Pod跨节点迁移时的数据持久化需求。

> **扩展**：在生产环境中，对于数据库、消息队列等有状态服务，应使用 **PV（持久卷）和 PVC（持久卷声明）** 机制对接后端存储（如NFS、Ceph或云厂商云盘），以实现存储资源与Pod生命周期的解耦。关于PV/PVC的详细实践，我将在后续文章中深入探讨，届时可查看文章：[Kubernetes 共享存储：PV、PVC、StorageClass 详解及使用](https://liucy.blog.csdn.net/article/details/160662805)。

