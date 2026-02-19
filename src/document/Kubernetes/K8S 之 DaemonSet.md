---
title: K8S 之 DaemonSet
icon: circle-info
order: 1
category:
  - Linux
  - kubernetes
tag:
  - Linux
  - kubernetes
  - 运维
date: 2026-02-11
pageview: true
article: false
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


## 一、DaemonSet 简介
### 1.1 DaemonSet 是什么
> DaemonSet 是 Kubernetes 的一种控制器，缩写：`DS`，确保集群内每个节点上运行且仅运行一个 Pod 副本，当有节点加入集群时， 也会为他们新增一个 Pod 。当有节点从集群移除时，这些 Pod 也会被回收。删除 DaemonSet 将会删除它创建的所有 Pod。


官方文档：[K8s中文官方文档 - DaemonSet](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/daemonset/)

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260219204615455.png)

### 1.2 DaemonSet 与 Deployment  的区别

| 特性   | DaemonSet |Deployment    | 
| ---- | ------------- | --------- |
| 调度目标 | 每个节点强制一个  |按副本数随机分布      | 
| 适用场景 | 节点级守护进程 （监控、日志、网络）  |无状态应用 无状态应用（Web、API、微服务）        | 
| 扩缩容  | 自动随节点增减   |手动调整 replicas | 

### 1.3 DaemonSet 的应用场景

* 节点日志的收集：`fluentd`、`filebeat`
* 节点监控指标采集：`node_exporter`、`cadvisor`
* 网络代理/CNI 插件：`calico`、`flannel`
* 存储守护进程：`Ceph OSD`、`GlusterFS`、`OpenEBS`、`Longhorn`
* 安全/审计代理：`Falco`、`Auditd`、`Sysdig`


### 1.4 节点污点 注意事项

从 Kubernetes 1.6 开始，**Master 节点默认排斥 DaemonSet Pod**。

**原因**：Master 节点带有 `node-role.kubernetes.io/master:NoSchedule` 污点，而 DaemonSet 创建的 Pod 默认**无此容忍度**，因此不会被调度。

**建议**：如无特殊需求（如控制面监控、API Server 指标采集），**不要将 DaemonSet Pod 调度到 Master 节点**，避免占用控制面资源。

---
**<font size=5px> 如需调度到 Master 节点</font>**

在 DaemonSet 的 Pod 模板中添加容忍度：

```yaml
tolerations:
  - key: node-role.kubernetes.io/master
    effect: NoSchedule
    operator: Exists
  # K8s 1.20+ 推荐使用 control-plane 标签
  - key: node-role.kubernetes.io/control-plane
    effect: NoSchedule
    operator: Exists
```

> ⚠️ **注意**：K8s 1.24+ 已废弃 `master` 标签，改用 `control-plane`，建议同时容忍两者以保证兼容性。

**<font size=5px> 如何判断节点有没有污点</font>**

```bash
kubectl describe node <master-node> | grep Taints
```
> 返回：
> `<none>` 节点无污点，任何 Pod 都可调度；
> `node-role.kubernetes.io/master:NoSchedule`或`node-role.kubernetes.io/control-plane:NoSchedule` 有污点，Pod 需添加对应 `容忍：tolerations` 或 去除`污点：taints` Pod才能进行调度；

* 去除污点

```bash
# 去除 master 污点（K8s 1.23 及以下）
kubectl taint node <master-node-name> node-role.kubernetes.io/master:NoSchedule-

# 去除 control-plane 污点（K8s 1.24+）
kubectl taint node <master-node-name> node-role.kubernetes.io/control-plane:NoSchedule-
```

* 恢复污点

```bash
# 重新添加 Master 污点（K8s 1.23 及以下）
kubectl taint node <master-node> node-role.kubernetes.io/master:NoSchedule

# 或 control-plane 污点（K8s 1.24+）
kubectl taint node <master-node> node-role.kubernetes.io/control-plane:NoSchedule
```

## 二、DaemonSet 举例
> 需求：再每一个节点上部署一个nginx服务；
### 2.1 写 nginx-daemonset.yaml
* `nginx-daemonset.yaml`
```yaml
apiVersion: v1
kind: Namespace
metadata: 
  name: nginx
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: nginx-daemonset
  namespace: nginx
  labels:
    app: nginx
spec:
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      hostNetwork: true
      tolerations:           # ← 添加容忍度，如果不添加，则不会再有污点的节点上部署
        - key: node-role.kubernetes.io/master
          effect: NoSchedule
          operator: Exists
        - key: node-role.kubernetes.io/control-plane
          effect: NoSchedule
          operator: Exists
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
* [x] 注意事项
	* DaemonSet 不能有 `replicas` 字段

### 2.2 启动运行

```bash
kubectl apply -f nginx-daemonset.yaml
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260219204607434.png)

### 2.3 验证

```bash
# 查看nginx pod是否每个节点都部署了一个
kubectl get pods -n nginx -o wide

# 查看DaemonSet中有没有nginx
kubectl get ds -n nginx -o wide
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260219204601496.png)

如图：可以看到三个节点都部署了nginx，那么就没问题了


* 页面访问测试；
`172.16.11.230`
`172.16.11.231`
`172.16.11.232`

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260219204558469.png)


访问没问题，成功！！！



