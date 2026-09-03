---
title: Kubectl命令大全参数详解及示例【超全】
icon: circle-info
order: 1
category:
  - Linux
  - kubernetes
tag:
  - Linux
  - kubernetes
  - 运维
date: 2025-11-24
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



## 一、前言
### 1.1 kubectl 是什么？

kubectl 是 Kubernetes 的命令行工具，用于与 apiserver进行通信，将用户在命令行输入的命令，组织并转化为 apiserver能识别的信息，进而实现管理k8s各种资源的一种有效途径。

### 1.2 kubectl 官方文档
* kubectl 官方文档：[https://kubernetes.io/zh-cn/docs/reference/kubectl/](https://kubernetes.io/zh-cn/docs/reference/kubectl/)
* kubectl 中文命令表：[http://docs.kubernetes.org.cn/683.html](http://docs.kubernetes.org.cn/683.html)

### 1.3 kubectl 命令格式
> 根据个人习惯，我习惯于`flages`在前，`name`在后，是不影响命令运行结果的；
```bash
kubectl [command] [TYPE] [NAME] [flags]
kubectl [command] [TYPE] [flags] [NAME] 
```
其中 `command`、`TYPE`、`flags`和 `NAME` 分别是：

* `command`：指定要对一个或多个资源执行的操作，例如 `create`、`get`、`describe`、`delete`。

* `TYPE`：指定资源类型。资源类型不区分大小写， 可以指定单数、复数或缩写形式。例如最常见的：`kubectl get pods`，也可以指定多个，以`,`分割，比如`kubectl get pods,svc`；

* `flags`： 指定可选的参数。例如，可以使用 `-n` 或 `--namespace` 参数指定此`namespace`下面有哪些资源；

* `NAME`：指定资源的名称，也就类似于docker的容器名。名称区分大小写。 如果省略名称，则显示所有资源的详细信息。例如：`kubectl get pods -n kube-system`，将显示所有以`kube-system`为命名空间的资源。

---

如果需要查看更多相关命令可使用`kubectl --help`查看更多命令参数等信息。

---

### 1.4 kubectl api-resources 查看资源对象简写信息
可使用如下命令查看所有资源对象及简写信息：

```bash
kubectl api-resources
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171751704.png)

---

以下类型运行命令均为：`kubectl get [TYPE]`

| 简写     | 完整资源类型                    | 中文备注      |
| ------ | ------------------------- | --------- |
| po     | pods                      | 资源服务  |
| ns     | namespaces                | 命名空间      |
| no     | nodes                     | 节点        |
| svc    | services                  | 服务与负载均衡   |
| cm     | configmaps                | 配置文件/键值   |
| secret | secrets                   | 敏感数据，如：授权文件      |
| deploy | deployments               | 无状态应用部署   |
| sts    | statefulsets              | 有状态应用部署   |
| rs     | replicasets               | 副本集（几乎只看） |
| ds     | daemonsets                | 每个节点守护进程  |
| ing    | ingresses                 | 七层入口路由    |
| pv     | persistentvolumes         | 集群级存储卷    |
| pvc    | persistentvolumeclaims    | 用户申请存储卷   |
| sc     | storageclasses            | 动态存储类型    |
| sa     | serviceaccounts           | 服务账号      |
| hpa    | horizontalpodautoscalers  | 水平自动扩缩容   |
| cj     | cronjobs                  | 定时任务      |
| job    | jobs                      | 一次性任务     |
| crd    | customresourcedefinitions | 自定义资源定义   |


### 1.5 配置 kubectl tab自动补全

> `kubectl completion` 命令：		
> `kubectl completion <shell名>`   **# shell = bash | zsh | fish | powershell**

```bash
echo 'source  <(kubectl completion bash)' >> ~/.bashrc
```
>生效：
>1、退出ssh连接，重新连接；
> 2、或者`bash`更新环境就可以使用了。


## 二、资源查看类  

* [x] 语法

```bash
kubectl get <资源类型> [-n 命名空间] [<资源名>]
```
* [x] 高频参数


<div id="gao">高频参数</div>

* `-o wide`：查看资源详细信息，例如此pod运行再哪台机器，nodes查看操作系统、内核版本等；
* `-o yaml|json`     整份对象定义，用于备份、比对等；
* `-n`：指定命名空间`namespace`;
* `-w`：持续监控输出，用于创建pod之后持续查看状态是否正常，或node的健康状态；
* `-A`：查看所有

| 资源全称 / 简写                          | 一句话场景                                   | 示例命令（含 wide 输出）                                    |
| ---------------------------------- | --------------------------------------- | -------------------------------------------------- |
| `nodes` / `no`                     | 看 Node 节点状态、K8s 版本、OS、容器运行时             | `kubectl get no -o wide`                           |
| `componentstatuses` / `cs`         | 看控制平面组件健康（apiserver、scheduler、etcd）     | `kubectl get cs`                                   |
| `pods` / `po`                      | 看 Pod 列表、节点分布、镜像、重启次数                   | `kubectl get po -A -o wide`                        |
| `namespaces` / `ns`                | 看有哪些命名空间                                | `kubectl get ns`                                   |
| `services` / `svc`                 | 看 Service 的 ClusterIP、NodePort、端口映射     | `kubectl get svc -A -o wide`                       |
| `deployments` / `deploy`           | 看 Deployment 副本数、镜像版本                   | `kubectl get deploy -A -o wide`                    |
| `replicasets` / `rs`               | 看 ReplicaSet 由哪个 Deployment 生成          | `kubectl get rs -A -o wide`                        |
| `daemonsets` / `ds`                | 看 DaemonSet 在每个节点的调度情况                  | `kubectl get ds -A -o wide`                        |
| `statefulsets` / `sts`             | 看 StatefulSet 的 Pod 序号、PVC 绑定           | `kubectl get sts -A -o wide`                       |
| `jobs`                             | 看一次性 Job 的完成状态、成功/失败次数                  | `kubectl get jobs -A -o wide`                      |
| `cronjobs` / `cj`                  | 看定时 Job 的调度历史、下次执行时间                    | `kubectl get cj -A -o wide`                        |
| `configmaps` / `cm`                | 看配置、字典条数、创建时间                            | `kubectl get cm -A`                                |
| `secrets`                          | 看 Secret 类型（docker-registry、tls、Opaque） | `kubectl get secrets -A`                           |
| `ingresses` / `ing`                | 看 Ingress 的域名、入口类、地址                    | `kubectl get ing -A -o wide`                       |
| `networkpolicies` / `netpol`       | 看网络策略是否已关联 Pod 选择器                      | `kubectl get netpol -A`                            |
| `persistentvolumes` / `pv`         | 看集群级存储卷、容量、回收策略、状态                      | `kubectl get pv -o wide`                           |
| `persistentvolumeclaims` / `pvc`   | 看命名空间级申领、绑定 PV、容量                       | `kubectl get pvc -A -o wide`                       |
| `storageclasses` / `sc`            | 看存储类、provisioner、是否默认                   | `kubectl get sc`                                   |
| `serviceaccounts` / `sa`           | 看服务账号、是否挂载自动令牌                          | `kubectl get sa -A`                                |
| `roles`                            | 看命名空间级角色规则条数                            | `kubectl get roles -A`                             |
| `clusterroles` / `cr`              | 看集群级角色                                  | `kubectl get clusterroles`                         |
| `rolebindings` / `rb`              | 看角色绑定关系                                 | `kubectl get rolebindings -A`                      |
| `clusterrolebindings` / `crb`      | 看集群角色绑定                                 | `kubectl get clusterrolebindings`                  |
| `endpoints` / `ep`                 | 看 Service 后端 Pod IP:Port 列表             | `kubectl get ep -A`                                |
| `events` / `ev`                    | 看最近事件（Warning/Normal）                   | `kubectl get events -A --sort-by='.lastTimestamp'` |
| `horizontalpodautoscalers` / `hpa` | 看 HPA 当前/目标 CPU、副本数                     | `kubectl get hpa -A`                               |
| `poddisruptionbudgets` / `pdb`     | 看 Pod 中断预算、允许驱逐数量                       | `kubectl get pdb -A`                               |
| `leases`                           | 看组件租约（scheduler/controller 选主）          | `kubectl get leases -A`                            |
| `validatingwebhookconfigurations`  | 看校验型准入 Webhook                          | `kubectl get validatingwebhookconfigurations`      |
| `mutatingwebhookconfigurations`    | 看变更型准入 Webhook                          | `kubectl get mutatingwebhookconfigurations`        |

### 2.1 查看node节点状态

```bash
kubectl get nodes
kubectl get no
kubectl get no -o wide
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171751973.png)

### 2.2 查看控制平面组件健康状态

```bash
kubectl get componentstatuses
kubectl get cs
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171751502.png)

### 2.3 查看所有pod

```bash
kubectl get pods -A
kubectl get po -A
kubectl get pods -A -o wide
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171751438.png)

### 2.4 查看某个命名空间下的pod
```bash
kubectl get pods -n kubernetes-dashboard
kubectl get pods -n kubernetes-dashboard -o wide
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171751192.png)

### 2.5 查看有哪些命名空间

```bash
kubectl get ns
kubectl get namespaces
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171751968.png)
### 2.6 查看所有的service

```bash
kubectl get svc
kubectl get serivce
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171751784.png)

### 2.7 查看某个命名空间的配置文件
> `configmaps`一般存放配置文件，跑某一个服务的时候需要时不时更新就可以采用此种方法；
```bash
kubectl get cm -n kube-system
kubectl get configmaps -n kube-system
```

### 2.8 查看某个命名空间的授权文件
> `secrets`一般存放授权文件，这种写yaml的时候需要使用base64加密，安全一些，也可以采用`cm`，这个是明文；
```bash
kubectl get secrets -n kube-system
```
### 2.9 把 Deployment 的整份 YAML 导出到文件

```bash
kubectl get deploy -A -o yaml > deployments.yaml
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171751153.png)

### 2.10 查看某个pod的标签

```bash
kubectl get pods -n nginx nginx-deployment-64744f78dc-t9pbf --show-labels
```

### 2.11 查看标签为app=nginx的所有pod

```bash
kubectl get pods -A -l app=nginx
```

### 2.12 查看某个资源的详细信息
> 比如查看命名空间为kube-system下的 `calico-node-z56kl`  pod的详细信息，包括服务起不来也可以用此命令查看；
```bash
kubectl describe pod -n kube-system calico-node-z56kl
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171751071.png)

---

> 这里列出了一些常见的操作，更多参数可参考上面的：[高频参数](#gao)

---
### 2.13 kubectl version 打印系统版本信息

```bash
kubectl version
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171750553.png)

### 2.14 kubectl cluster-info 显示集群Master和内置服务的信息
> `kubectl cluster-info` 是“**一眼看集群入口**”的命令，无需任何参数即可输出 **控制平面地址、Dashboard、Metrics-Server、CoreDNS** 等常用端点；

* [x] 语法：
```bash
kubectl cluster-info [子命令] [全局选项]
```
* [x] 子命令及解析、示例

| 子命令 | 示例 | 解析 |
| --- | --- | --- |
| **（默认）** | `kubectl cluster-info` | 列出控制面与插件访问地址 |
| `dump` | `kubectl cluster-info dump` | 一键导出所有组件日志 + 资源配置（排障神器） |

* [x] 全局选项参数及解析、示例

| flag | 示例 | 说明 |
| --- | --- | --- |
| `-n/--namespace` | `kubectl cluster-info dump -n nginx` | 只 dump 指定命名空间 |
| `--all-namespaces` | `kubectl cluster-info dump --all-namespaces` | 全集群 dump（默认仅 kube-system） |
| `-o <路径>` | `kubectl cluster-info dump -o /tmp/dump` | 把结果写到目录（按文件分） |
| `--output-directory=<路径>` | `kubectl cluster-info dump -o /tmp/cluster-dump` | 把 dump 结果写到本地目录 |

### 2.15 kubectl api-version 列出当前系统支持的API版本信息

```bash
kubectl api-versions
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171750428.png)



## 三、资源操作类
### 3.1 kubectl create 创建
#### 3.1.1 语法

```bash
kubectl create <资源类型> [-n 命名空间] [<资源名>]
```

#### 3.1.2 子命令及参数

| 子命令                           | 作用                                    | 高频参数                                    | 示例                                                                                                                         |
| ----------------------------- | ------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `namespace` / `ns`            | 创建命名空间                                | 只需名字                                    | `kubectl create ns nginx`                                                                                                          |
| `deployment` / `deploy`       | 创建 Deployment                          | `--image`、`--replicas`、`-r`             | `kubectl create deploy nginx --image=nginx:1.25-alpine --replicas=3`                                                             |
| `service` / `svc`             | 创建 Service（4 种类型）                      | `--tcp=端口:目标端口`、`--type`                | `kubectl create svc -n nginx clusterip nginx --tcp=80:80`                                                                                 |
| `service nodeport`            | 创建 NodePort 型 Service                  | `--node-port=30080`（可选）                 | `kubectl create svc -n nginx nodeport nginx --tcp=80:80 --node-port=30080`                                                                |
| `service loadbalancer`        | 创建 LoadBalancer 型（云厂商）                 | `--tcp`                                 | `kubectl create svc loadbalancer nginx --tcp=80:80`                                                                              |
| `service externalname`        | 创建 ExternalName 型                      | `--external-name`                       | `kubectl create svc externalname foo --external-name=foo.example.com`                                                            |
| `configmap` / `cm`            | 创建配置字典                                 | `--from-literal`、`--from-file`          | `kubectl create cm app-cfg --from-literal=key1=value1 --from-file=nginx.conf`                                                    |
| `secret`                      | 创建 Secret（generic/docker-registry/tls） | `--from-literal`、 `--from-file`         | `kubectl create secret generic user --from-literal=pass=123456`                                                                  |
| `secret docker-registry`      | 创建镜像拉取密钥                               | `--docker-server`、`--docker-username`   | `kubectl create secret docker-registry regcred --docker-server=hub.example.com --docker-username=admin --docker-password=123456` |
| `secret tls`                  | 创建 TLS 证书 Secret                       | `--cert`、`--key`                        | `kubectl create secret tls example-tls --cert=tls.crt --key=tls.key`                                                             |
| `job`                         | 创建一次性 Job                              | `--image`、`--dry-run=client -o yaml`    | `kubectl create job pi --image=perl:5.34 -- perl -Mbignum=bpi -wle 'print bpi(2000)'`                                            |
| `cronjob` / `cj`              | 创建定时 Job                               | `--schedule`、`--image`                  | `kubectl create cj hello --image=busybox:1.35 --schedule="*/1 * * * *" -- echo "hello"`                                          |
| `ingress` / `ing`             | 建 Ingress（v1.19+）                     | `--class`、`--rule`                      | `kubectl create ing demo --class=nginx --rule="foo.com/*=svc:80"`                                                                |
| `role`                        | 建命名空间级角色                              | `--verb`、`--resource`                   | `kubectl create role pod-reader --verb=get,list --resource=pods`                                                                 |
| `clusterrole` / `cr`          | 创建集群级角色                                | 同上                                      | `kubectl create clusterrole pod-reader --verb=get,list --resource=pods`                                                          |
| `rolebinding` / `rb`          | 把角色绑给用户/SA                            | `--role`、`--user` / `--serviceaccount`  | `kubectl create rolebinding read-pods --role=pod-reader --user=alice`                                                            |
| `clusterrolebinding` / `crb`  | 集群级绑定                                 | 同上                                      | `kubectl create clusterrolebinding alice-view --clusterrole=view --user=alice`                                                   |
| `serviceaccount` / `sa`       | 创建服务账号                                 | 只需名字                                    | `kubectl create sa deployer`                                                                                                     |
| `quota`                       | 创建资源配额                                 | `--hard`                                | `kubectl create quota compute --hard=cpu=1,memory=1G,pods=5`                                                                     |
| `limitrange` / `limits`       | 创建默认资源限制                               | 同上                                      | `kubectl create limitrange mem-limit --default=memory=512Mi`                                                                     |
| `priorityclass` / `pc`        | 创建优先级类                                 | `--value`、`--global-default`            | `kubectl create pc high-priority --value=1000`                                                                                   |
| `poddisruptionbudget` / `pdb` | 创建 Pod 中断预算                            | `--min-available` / `--max-unavailable` | `kubectl create pdb nginx-pdb --selector=app=nginx --min-available=2`                                                            |

#### 3.1.3 实例
##### 3.1.3.1 创建一个命名空间

```bash
kubectl create ns nginx
kubectl get ns
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171750578.png)
##### 3.1.3.2 创建一个service
* service的四种网络策略

| 类型               | 集群外能否直接访问                      | 底层实现要点                                                  | 典型使用场景                        |
| ---------------- | ------------------------------ | ------------------------------------------------------- | ----------------------------- |
| **ClusterIP**    | ❌ 只能集群内                        | kube-proxy 生成一条条 iptables/IPVS 规则，目标 IP 是“虚拟 IP”(VIP)   | 微服务之间内部调用（默认类型）               |
| **NodePort**     | ✅ 能，通过任意节点 `<NodeIP>:<NodePort>` | 在 ClusterIP 基础上，再为 **每个节点** 开放同一个端口（30000–32767）        | 开发测试、小型集群临时对外                 |
| **LoadBalancer** | ✅ 能，云厂商 LB 自动分配公网 IP           | 在 NodePort 基础上，调用云 API 创建外部负载均衡器，流量先打到 LB，再转发到 NodePort | 公有云生产环境，对外提供 4 层服务            |
| **ExternalName** | ❌ 不转发流量，只做 **CNAME 重定向**       | 没有 selector、没有 endpoints；DNS 查询直接返回用户指定的外部域名            | 把集群内 DNS 请求导向外部服务（如 RDS、对象存储） |


```bash
# 创建一个service，为clusterip，集群内部访问
kubectl create svc -n nginx clusterip nginx1 --tcp=80:80
# 创建一个service,为nodeport，集群外部通过ip+nodeport端口访问:ip:30080
kubectl create svc -n nginx nodeport nginx2 --tcp=80:80 --node-port=30080
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171750708.png)

### 3.2 kubectl apply 创建

> 把「完整 `YAML/JSON` 声明」交给集群，**没有就创建，有则按字段合并更新**；多次执行结果一致（幂等）。<br> 
> **总结就是**：使用yaml文件创建资源，如果没有就自动创建；如果有，没有更新过yaml就跳过；如果有更新过yaml文件，就更新资源；

#### 3.2.1 语法

```bash
kubectl apply -f <文件/目录/URL> [常用选项]
```
> 注意，首先需要提前写好yaml文件，并确保yaml文件语法正确；
#### 3.2.2 实例
##### 3.2.2.1 单文件创建

```bash
kubectl apply -f nginx-deploment.yaml
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171750871.png)

##### 3.2.2.2 多文件创建

```bash
# 指定的目录下所有 *.yaml 都会被执行
kubectl apply -f k8s/
```
##### 3.2.2.3 远程url创建

```bash
kubectl apply -f https://k8s.io/examples/application/deployment.yaml
```

### 3.3 kubectl delete 删除
#### 3.3.1 语法

```bash
kubectl delete <资源类型> [-n 命名空间] [<资源名>]
kubectl delete <资源类型> <资源名>
kubectl delete -f <yaml文件>
```

* 温馨提示：

>  删除前都可以吧`delete`换成`get`查看，确认无误再删除对应资源，需谨慎；
#### 3.3.2 实例
##### 3.3.2.1 删除一个pod/deployment

```bash
# 删除nginx的pod，但是还是会起来一个新的服务，因为我创建的是deployment，所以删除deployment pod才会彻底消失；
kubectl delete pod -n nginx nginx-deployment-778dcdff7d-v62nv
# 删除nginx的deployment
kubectl delte deploy -n nginx nginx-deployment
```
##### 3.3.2.2 根据yaml文件删除对应资源
我们创建使用的是：`kubectl apply -f nginx-deploment.yaml`，所以删除也可以根据此yaml文件删除pod和deployment；
```bash
kubectl delete -f nginx-deploment.yaml
```
##### 3.3.2.3 根据标签来删除对应资源
```bash
# 可以先使用get来查看都有哪些是nginx的，避免误删
kubectl get all -n nginx -l app=nginx
# 确认都没用，就可以删除了；
kubectl delete all -n nginx -l app=nginx
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171750746.png)

##### 3.3.2.4 按照目录下的yaml文件递归删除

```bash
kubectl delete -f k8s/ --recursive
```
##### 3.3.2.5 删除指定命名空间
> 删除命名空间之后，该命名空间下的所有资源都会删除，请谨慎删除；
```bash
# 可以先查看此命名空间下都有哪些资源，确认不需要再进行删除
kubectl get all -n nginx
# 没有需要的就可以完全删除命名空间为nginx的资源
kubectl delete ns nginx
# 删除完之后再次执行查看确认是否删除完成
kubectl get all -n nginx
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171750560.png)

##### 3.3.2.6 强制立即删除一个pod
> 正常pod是缓慢而优雅的删除的，如果你想迫切的看到一个结果，可以选择强制立即删除;
> 就比如我修改了nginx的版本号，需要重新创建并加载新的版本，这时候可以选择直接强制立即删除现在的pod，就会立即重新创建一个pod；
> <font color=red>提示：但是强制立即删除慎用</font>
```bash
kubectl delete pod -n nginx nginx-deployment-64c9987dc7-rzdm7 --grace-period=0 --force
```

### 3.4 kubectl edit 修改

> `kubectl edit` 就像 `vi` 直接打开线上对象的“实时 YAML”，保存即生效——**无需本地文件、无需重启 Pod**，是最快的`“热修”`手段。

#### 3.4.1 语法

```bash
kubectl edit <资源类型> [-n 命名空间] <名称> 
```
#### 3.4.2 常见“可改/不可改”字段
| 随便改（即时生效） | 不可改（只能重建或换字段策略） |
|--------------------|-----------------------------------|
| 镜像版本、环境变量、资源限制、副本数、标签、注解、滚动更新策略 | `metadata.name`、`metadata.namespace`、`metadata.uid`、`spec.selector`（Deployment 等核心字段） |

#### 3.4.3 实例
##### 3.4.3.1 示例1 ：将nginx的service的clusterip模式修改为nodeport模式
```bash
# 这里是示例，因为刚刚把nginx的service删除了，所以这里需要新建一个；
kubectl create svc clusterip nginx --tcp=80:80
# 创建好之后默认网络策略是clusterip的，我们可以查看
kubectl get svc
# 修改nginx的service，把clusterip改为nodeport
kubectl edit svc nginx
# 修改成功之后会立即生效，可以再次查看
kubectl get svc
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171750468.png)

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171750092.png)

##### 3.4.3.2 示例2：将nginx默认使用镜像版本1.24更换为1.25
> 这里有两个修改：
> * 修改的`pod`：只会让当前pod生效，如果多开副本或删除自动重建版本就会恢复到1.24.0；
> * 修改的`deployment`：如果需要永久修改，那就需要修改`deployment`的版本号；可以认为`deployment`是pod的老大，即使pod被删除了，`deployment`也会自己再起来一个，版本号还是1.24.0，修改了`deployment`之后再起来新的就是1.25.0了；
```bash
# 修改nginx pod
kubectl edit pods -n nginx nginx-deployment-778dcdff7d-cghk4
# 修改nginx deployment
kubectl edit deploy -n nginx nginx-deployment
# 找到images镜像，将版本从1.24.0改为1.25.0，保存退出
# 修改完之后如何确认，可以查看nginx pod的详细信息，如下，1.24.0改为了1.25.0，并重新启动成功：
kubectl describe pods -n nginx nginx-deployment-778dcdff7d-cghk4
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171750162.png)

### 3.5 扩缩容 & 自动伸缩

#### 3.5.1 kubectl scale 手动扩缩容
##### 3.5.1.1 语法
```bash
kubectl scale <资源类型> [-n <命名空间>] <名称> --replicas=<数量>
```

| 目标                 | 命令示例                                                       | 说明                    |
| ------------------ | ---------------------------------------------------------- | --------------------- |
| 改 Deployment 副本数   | `kubectl scale deploy nginx --replicas=5`                  | 秒级扩/缩，旧 Pod 直接删或新增    |
| 改 StatefulSet 副本数  | `kubectl scale sts web --replicas=3`                       | 有序扩/缩（0..N-1 逆序）      |
| 改 ReplicaSet       | `kubectl scale rs nginx-64c9987dc7 --replicas=4`           | 一般让 Deployment 自动管理即可 |
| 改 DaemonSet（节点数固定） | 无法直接 scale，只能加/删节点或改 nodeSelector                          | 每个节点 1 副本             |


##### 3.5.1.2 实例
实例1：扩容nginx pod为两个

```bash
# 查看当前nginx有几个pod（一个）
kubectl get pods -n nginx
# 然后我们来扩容nginx的deploymen为两个
kubectl scale deployment -n nginx nginx-deployment --replicas=2
# 执行完直接使用如下命令持续查看pod有没有新增的；
kubectl get pods -n nginx -w
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171749379.png)


实例2：缩容nginx pod为一个

```bash
# 查看当前nginx有几个pod（两个）
kubectl get pods -n nginx
# 然后我们来缩容nginx的deploymen为一个
kubectl scale deployment -n nginx nginx-deployment --replicas=1
# 执行完直接使用如下命令持续查看pod有没有删除的；
kubectl get pods -n nginx -w
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171749706.png)

#### 3.5.2 自动伸缩 HPA VPA
K8s 原生提供两种维度：
* `HPA`（Horizontal Pod Autoscaler）—— 根据 CPU/内存/自定义指标 自动调整副本数
* `VPA`（Vertical Pod Autoscaler）—— **自动调容器 request/limit**（社区组件，需单独装）
##### 3.5.2.1 HPA - `kubectl autoscale`
> * `kubectl autoscale` 是 **快速创建 HPA** 的命令;
> * **前提**：Pod 必须设置 resource.requests.cpu/mem
> ![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171749624.png)
> * **注意**：这里的`cpu`和`内存`指的是pod的实际占用，可使用`kubectl top`命令查看；

常用参数：

| 参数 | 示例值 | 说明 |
|------|--------|------|
| `--min` | `2` | 最小副本数（默认 1） |
| `--max` | `10` | 最大副本数（**必填**） |
| `--cpu-percent`  | `60` | CPU 平均利用率阈值（默认 50） |
| `--memory-percent`  | `70` | **内存**平均利用率阈值（要求集群 ≥1.23 且开启 `autoscaling/v2` 支持，旧版本不可用） |
| `--name`  | `nginx-hpa` | 自定义 HPA 对象名（默认 `<deployment名>`） |
| `--dry-run`  | `client` | 空跑生成 YAML，不真正提交 |
| `--generator`  | `hpa/v2beta2` | 指定 API 版本（一般自动识别，无需手写） |
| `--namespace` / `-n`| `nginx` | 目标 Deployment 所在的命名空间 |

------------------------------------------------
**实例1：根据cpu来决定开几个副本，给 Deployment 创建 HPA：副本 1-10，cpu>60% 即扩容**


> 这里的cpu是pod的cpu，可以使用命令：`kubectl top pod -n nginx nginx-deployment-778dcdff7d-6h6bw`查看；
```bash
# 创建规则
kubectl autoscale deployment -n nginx nginx-deployment --min=1 --max=10 --cpu-percent=60
# 查看规则
kubectl get hpa -n nginx
```

**实例2：删除一个hpa规则即关闭自动伸缩**

```bash
kubectl delete hpa -n nginx nginx-deployment
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171749717.png)


**实例3：不创建规则只导出YAML文件**

```bash
kubectl autoscale deployment -n nginx nginx-deployment --min=1 --max=10 --cpu-percent=60 --dry-run=client -o yaml > nginx-hpa.yaml
```
**实例4：同时指定 CPU+内存达到多少就自动扩容（k8s版本需≥1.23 支持）**
> 根据cpu+内存来同时决定开几个副本，给 Deployment 创建 HPA：副本 1-10，cpu>50%、内存大于70% 即扩容，<font color=red>k8s版本需≥1.23 支持</font>；
```bash
kubectl autoscale deploy nginx -n nginx --min=1 --max=10 \
  --cpu-percent=50 --memory-percent=70
```
**实例5：查看所有的hpa及指定命名空间的hpa、某个hpa的详细信息**

```bash
# 查看所有的hpa规则
kubectl get hpa -A
# 查看指定nginx命名空间的hpa规则
kubectl get hpa -n nginx
# 查看nginx-deployment的hpa规则的详细信息
kubectl describe hpa -n nginx nginx-deployment
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171749222.png)

---

##### 3.5.2.2 VPA
* 1️⃣ 一键装好 VPA
```bash
# ① 国内网络 & 1.20+ 集群直接用官方脚本
git clone --depth=1 https://github.com/kubernetes/autoscaler-vertical-pod-autoscaler.git
cd autoscaler-vertical-pod-autoscaler/
export REGISTRY=registry.cn-hangzhou.aliyuncs.com/google_containers
./hack/vpa-up.sh

# ② 等 Pod 全 Ready
kubectl -n kube-system get po -l app=vpa-* -w
# 看到 3 个 Running 就继续
```

*  2️⃣ 快速体验：让 VPA 给你“算”资源
```yaml
# hamster.yaml  故意把 requests 写得很小
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hamster
spec:
  replicas: 2
  selector:
    matchLabels: {app: hamster}
  template:
    metadata:
      labels: {app: hamster}
    spec:
      containers:
      - name: hamster
        image: registry.k8s.io/ubuntu-slim:0.1
        resources:
          requests: {cpu: "10m", memory: "10Mi"}   # 故意写小
        command: ["/bin/sh"]
        args:
        - -c
        - "while true; do timeout 0.5s yes >/dev/null; sleep 0.5s; done"
---
# hamster-vpa.yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: hamster-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: hamster
  updatePolicy:
    updateMode: "Auto"        # 实时把推荐值写回 Pod
  resourcePolicy:
    containerPolicies:
    - containerName: '*'
      minAllowed: {cpu: 50m, memory: 50Mi}
      maxAllowed: {cpu: 500m, memory: 500Mi}
      controlledResources: ["cpu", "memory"]
```
```bash
kubectl apply -f hamster.yaml -f hamster-vpa.yaml
```

* 3️⃣ 看效果
```bash
# ① 实时观察推荐值
kubectl describe vpa hamster-vpa

# ② Pod 会被自动重建，requests 变成推荐值
kubectl get po -l app=hamster -o custom-columns=NAME:.metadata.name,CPU:.spec.containers[0].resources.requests.cpu,MEM:.spec.containers[0].resources.requests.memory

# ③ 关掉负载后 VPA 会再下调（10 min 周期）
```
### 3.6 kubectl set 更新
> `kubectl set` 是“命令式热修改”利器，**无需打开编辑器**即可直接改线上字段；  
> **不写 YAML**，一条命令就能改 **镜像、环境变量、资源、选择器、ServiceAccount** 等字段，**立即滚动生效**；

#### 3.6.1 语法

```bash
kubectl set <子命令> <资源类型> [-n 命名空间] <名称> <key=value>
```


#### 3.6.2 常用子命令

| 子命令 | 典型场景 | 示例（含全局参数） |
|--------|----------|---------------------|
| `image` | 滚动升级镜像（零停机） | `kubectl set image deploy -n nginx nginx-deployment nginx=nginx:1.25.0 --record` |
| `env` | 热插/更新环境变量（Pod 重建） | `kubectl set env deploy -n nginx nginx-deployment APP_VERSION=1.25.0` |
| `resources` | 在线调整 requests/limits（Pod 重建） | `kubectl set resources deploy -n nginx nginx-deployment -c nginx --requests=cpu=50m,memory=120Mi --limits=cpu=1G,memory=1G` |
| `serviceaccount` | 更换 Pod 所用 SA（滚动生效） | `kubectl set sa deploy -n nginx nginx-deployment new-sa` |
| `selector` | 仅 ReplicaSet 可用；**Deployment 禁止用** | `kubectl set selector rs -n nginx nginx-rs app=nginx:v2` |
| `subject` | 给 ClusterRoleBinding/RoleBinding 追加用户/组/SA | `kubectl set subject clusterrolebinding admin --group=devops` |

#### 3.6.3 常用全局 flag（可叠加）

| Flag | 示例 | 说明 |
|------|------|------|
| `--record` | `kubectl set image ... --record` | 把变更写进 annotation，方便 `rollout history` 查看 |
| `--dry-run=client` | `kubectl set env ... -o yaml --dry-run=client` | 空跑生成 YAML，不真正提交 |
| `--all` | `kubectl set env ... --all` | 批量修改同一命名空间下全部对象 |
| `-o yaml` | `kubectl set image ... -o yaml > new.yaml` | 导出修改后的 YAML，再 GitOps |

#### 3.6.4 实例
##### 3.6.4.1 更新镜像（最常用）
* [x] 语法：

```bash
kubectl set image <资源类型> [-n 命名空间] <名称> <容器名>=<新镜像>
```
* [x] 实例：
```bash
# 可以先查看最开始的镜像版本，这里我们以nginx为例，最开始版本为1.24.0版本
# 查看nginx的deployment的镜像版本配置的是多少
kubectl describe deploy -n nginx nginx-deployment  | grep -i image
# 将nginx镜像版本更改为：1.25.0
# 更新镜像：deployment类型、命名空间为：nginx，名称为nginx-deployment，容器名为：nginx，要更新的nginx版本号，如果不确定容器名是什么，可以使用kubectl describe 来查看；
kubectl set image deploy -n nginx nginx-deployment nginx=nginx:1.25.0
# 加个更新记录 --record，可通过kebuctl rollout history查看
kubectl set image deploy -n nginx nginx-deployment nginx=nginx:1.25.0 --record
# 再次确认nginx版本是否更新
kubectl describe deploy -n nginx nginx-deployment  | grep -i image
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171749360.png)

**效果**：更新成功，滚动升级，零停机；旧 ReplicaSet 缩 0，新 RS 扩到期望副本数，pod自动重新启动更新1.25版本。

 > 如果是更新错了版本想回退可以参考`kubectl rollout undo`来回退；
##### 3.6.4.2 修改环境变量（可追加/覆盖）
* [x] 语法：

```bash
kubectl set env <资源类型> [-n 命名空间] <名称> KEY=value [KEY2=value2]
```
* [x] 实例：
```bash
# 给nginx Deployment 添加一个appversion环境变量
kubectl set env deploy -n nginx nginx-deployment APP_VERSION=1.25.0
# 给nginx Deployment 添加两个环境变量：appversion和serviceversion
kubectl set env deploy -n nginx nginx-deployment APP_VERSION=1.25.0 SERVICE_VERSION=V1.2
# 查看确认，可以查看详细信息直接过滤这两个关键字即可；
kubectl describe deploy -n nginx nginx-deployment | grep -Ei "APP_VERSION|SERVICE_VERSION"
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171749483.png)

**效果**：Pod 会自动重建（滚动），`env` 字段立即生效。
 > 如果是添加错了想回退可以参考`kubectl rollout undo`来回退；

##### 3.6.4.3 调整资源限制（requests/limits）
* [x] 语法：

```bash
kubectl set resources <资源类型> [-n 命名空间] <名称> -c=<容器名> --requests=cpu=100m,memory=128Mi --limits=cpu=500m,memory=512Mi
```
* [x] 单位限制
- **CPU**：`m`（毫核）或裸数字（核）→ `1000m` / `1`  
- **内存**：`Ki`、`Mi`、`Gi`、`Ti` 等 **二进制**单位 → `1Gi`

>如果不按照规定来写，会被当成非法单位丢弃；
**口诀:**
**“CPU 写数字或 m，内存写 Mi/Gi/Ti；大写 G/M 会被丢，limits 空了就默认。”**

* [x] 实例：
```bash
# 首先查看当前的资源请求和资源上限
kubectl describe deployment -n nginx nginx-deployment | grep -iE "Limits|Requests" -A2
# 然后我们改成不一样的，资源请求cpu改为50m，memory改为120M；资源上限cpu改为1G、内存改为1G；
kubectl set resources deploy -n nginx nginx-deployment -c nginx --requests=cpu=50m,memory=120Mi --limits=cpu=1Gi,memory=1Gi --record
# 更改成功之后我们再次查看nginx deployment的资源请求和资源上限
kubectl describe deployment -n nginx nginx-deployment | grep -iE "Limits|Requests" -A2
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171749930.png)


**效果**：滚动重建 Pod，新副本使用新资源值。

 > 如果是值设置错了想回退可以参考`kubectl rollout undo`来回退；


##### 3.6.4.4 更新镜像版本但不更新当前服务只导出yaml
> 这里不做更新只做导出yaml文件
```bash
# 查看nginx的deployment的镜像版本配置的是多少
kubectl describe deploy -n nginx nginx-deployment  | grep -i image
# 把镜像版本改为1.26.0并导出yaml文件，但不能修改当前的deployment版本；
kubectl set image deploy -n nginx nginx-deployment nginx=nginx:1.26.0 --dry-run=client -o yaml > nginx-set-image.yaml
# 再次查看确认当前deployment是否被更改
kubectl describe deploy -n nginx nginx-deployment  | grep -i image
# 确认没有被更改之后，查看是否有yaml文件了，并确认yaml文件中的版本号是否是更新
ls
cat nginx-set-image.yaml | grep -i image
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171749806.png)
### 3.7 kubectl rollout 回滚
> `kubectl rollout` 专管 **`Deployment` / `DaemonSet` / `StatefulSet`** 的版本生命周期；

#### 3.7.1 语法

```bash
kubectl rollout <子命令> <资源类型> [-n 命名空间] <名称> [全局参数] 
```


#### 3.7.2 常用子命令

| 子命令       | 功能说明                       |
| --------- | -------------------------- |
| `history` | 列出资源的所有修订版本（Revision）及变更原因 |
| `undo`    | 回滚到上一个或指定修订版本              |
| `status`  | 实时显示滚动升级/回滚的完成进度           |
| `pause`   | 暂停 Deployment 滚动（可做金丝雀）    |
| `resume`  | 恢复被暂停的 Deployment 滚动       |
| `restart` | 强制触发一次新的滚动（无模板变化，仅重启 Pod）  |

#### 3.7.3 全局可选参数（适用于上面所有子命令）

| 参数                   | 说明                                      |
| -------------------- | --------------------------------------- |
| `--revision=<数字>`    | 指定历史版本号（仅 `history`/`undo` 有效）          |
| `--to-revision=<数字>` | `undo` 时精确回退到某版本                        |
| `--watch=true`       | `status` 默认持续监控；可加 `--watch=false` 只看一次 |
| `--timeout=<时长>`     | 等待滚动完成的最长时限，如 `5m`、`600s`               |
| `--dry-run=client`   | 空跑预览，不真正执行（仅 `undo`/`restart` 等支持）      |

* [x] ⚠️ 注意
- 只有 **Deployment** 默认保留 **10 个历史版本**（可调 `revisionHistoryLimit`）。  
- **DaemonSet / StatefulSet** 需显式设置 `revisionHistoryLimit > 0` 才能回滚。  
- 回滚 = **用旧 ReplicaSet 的 PodTemplate 覆盖当前模板**，Pod 会**滚动重建**。
#### 3.7.4 实例
##### 3.7.4.1 查看某个资源更新历史记录

```bash
kubectl rollout history deploy -n nginx nginx-deployment
```
例如：更新nginx镜像版本为1.26.0，并记录，再查看历史记录

```bash
# 更新nginx deployment的镜像版本为1.26.0并记录
kubectl set image deploy -n nginx nginx-deployment nginx=nginx:1.26.0 --record
# 查看nginx deployment的更新历史记录
kubectl rollout history deploy -n nginx nginx-deployment
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171749814.png)
##### 3.7.4.2 查看某个资源更新历史记录指定的一条数据

```bash
kubectl rollout history deploy -n nginx nginx-deployment --revision=5
```
例如：我要查看nginx更新记录编号为5的详细信息

```bash
# 首先查看所有的历史记录
kubectl rollout history deploy -n nginx nginx-deployment
# 可以看到最前面一列是编号，想查看编号为5的详细信息
kubectl rollout history deploy -n nginx nginx-deployment --revision=5
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171749011.png)

##### 3.7.4.3 回滚到上一个版本

```bash
kubectl rollout undo deploy -n nginx nginx-deployment
```
例如：我将nginx镜像版本升级了1.26，但是又不想升级了，想直接回退回去

```bash
# 首先，我们先查看当前nginx的版本
kubectl describe deploy -n nginx nginx-deployment | grep -i image
# 然后，我们来先将nginx镜像版本更新为1.26
kubectl set image deploy -n nginx nginx-deployment nginx=nginx:1.26.0 --record
# 再次确认nginx当前版本
kubectl describe deploy -n nginx nginx-deployment | grep -i image

# 开始回退
kubectl rollout undo deploy -n nginx nginx-deployment
# 再次确认nginx当前版本
kubectl describe deploy -n nginx nginx-deployment | grep -i image
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171748498.png)

##### 3.7.4.4 回滚到指定修订版本
```bash
kubectl rollout undo deploy -n nginx nginx-deployment --to-revision=5
```
例如：修改deployment的资源限制，修改了多次，但最后想要使用第一次修改的内容，这时候就需要指定回滚到第一个版本；

```bash
# 修改了三次资源限制，如下：
kubectl set resources deploy -n nginx nginx-deployment -c nginx --requests=cpu=100m,memory=120Mi --limits=cpu=500m,memory=800Mi --record
kubectl set resources deploy -n nginx nginx-deployment -c nginx --requests=cpu=40m,memory=80Mi --limits=cpu=300m,memory=200Mi --record
kubectl set resources deploy -n nginx nginx-deployment -c nginx --requests=cpu=100m,memory=100Mi --limits=cpu=1Gi,memory=1Gi --record
# 现在这个资源有点太大了，还是想要第一次修改的资源限制，我需要回滚到第一次
# 首先，确认当前的资源限制是多少
kubectl describe deployment -n nginx nginx-deployment | grep -iE "Limits|Requests" -A2
# 然后，查看一下历史记录
kubectl rollout history deploy -n nginx nginx-deployment
# 找到对应的编号，回滚
kubectl rollout undo deploy -n nginx nginx-deployment --to-revision=5
# 确认是否回滚成功
kubectl describe deployment -n nginx nginx-deployment | grep -iE "Limits|Requests" -A2
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171748932.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171748149.png)

##### 3.7.4.5 观察回滚进度
```bash
kubectl rollout status deploy -n nginx nginx-deployment
```
### 3.8 kubectl expose 一键创建service
> 将已经存在的一个RC、Service、Delpoyment或Pod暴露为一个新的Service，总的来说就是“命令式一键生成 Service”的快捷工具

#### 3.8.1 语法
```bash
kubectl expose <资源类型> [-n <命名空间>] <名称> \
  [--port=<SvcPort>] \
  [--target-port=<PodPort>] \
  [--type=<SvcType>] \
  [--name=<SvcName>]
```
#### 3.8.2 四种网络类型一键切换及示例

| 类型 | 命令模板 | 场景 |
| --- | --- | --- |
| **ClusterIP**（默认） | `kubectl expose deploy nginx --port=80` | 集群内微服务互访 |
| **NodePort** | `kubectl expose deploy nginx --port=80 --type=NodePort` | 开发测试、裸机对外 |
| **LoadBalancer** | `kubectl expose deploy nginx --port=80 --type=LoadBalancer` | 云厂商自动分配公网 IP |
| **Headless**（ClusterIP=None） | `kubectl expose deploy nginx --port=80 --cluster-ip=None` | StatefulSet 需稳定网络标识 |

#### 3.8.3 参数及示例

| flag | 示例 | 说明 |
| --- | --- | --- |
| `--port=<端口>` | `kubectl expose deploy xxx --port=80` | Service 对外端口 |
| `--target-port=<端口>` | `--target-port=8080` | Pod 容器内端口（可数字或名称） |
| `--type=<类型>` | `--type=NodePort` | ClusterIP/NodePort/LoadBalancer/ExternalName |
| `--cluster-ip=<IP>` | `--cluster-ip=10.96.10.10` | 手动指定虚拟 IP；设 `None` = Headless |
| `--node-port=<端口>` | `--node-port=30080` | 指定 NodePort（必须在 30000-32767） |
| `--selector=<kv>` | `--selector="app=nginx,tier=frontend"` | 手动标签选择器 |
| `--session-affinity=<模式>` | `--session-affinity=ClientIP` | 会话保持 |
| `--dry-run=client` | `kubectl expose ... --dry-run=client -o yaml` | 空跑生成 YAML |
| `-n/--namespace` | `-n prod` | 指定命名空间 |
| `--name=<名称>` | `--name=nginx-svc` | 自定义 Service 名（默认同资源名） |


---
**expost** 一句话口诀：
> **“expose 一键出 Service，四类型随 Flag 切；port 对外 target 对内，NodePort 指定端口，LoadBalancer 云公网；dry-run 导出再 GitOps。”**
---

### 3.9 kubectl label 贴/斯标签
> `kubectl label` 用来“**给 K8s 对象贴/撕标签**”，**不写 YAML** 即可实现筛选、调度、权限、滚动更新等策略；

#### 3.9.1 语法
```bash
# 贴标签
kubectl label <资源类型> [-n <ns>] <名称> <key>=<value> [falg]

# 撕标签
kubectl label <资源类型> [-n <ns>] <名称> <key>-
```

#### 3.9.2 全局选项

| flag | 示例 | 说明 |
| --- | --- | --- |
| `--overwrite` | `kubectl label pod xxx ver=v2 --overwrite` | 覆盖已存在标签 |
| `--dry-run=client` | `kubectl label ... --dry-run=client -o yaml` | 空跑生成 YAML |
|`-o yaml`|`kubectl label ... --dry-run=client -o yaml`|空跑生成 YAML |
| `-l/--selector` | `kubectl label pods -l app=nginx tier=frontend` | 批量选择器 |
| `-n/--namespace` | `kubectl label pod xxx -n prod` | 指定命名空间 |
| `--all` | `kubectl label pods --all ver=v1` | 全选（需确认） |

#### 3.9.3 实例
* 查看一个pod的标签

```bash
kubectl get pods -n nginx nginx-deployment-64744f78dc-gbtkj --show-labels
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171748226.png)

##### 3.9.3.1 给 Pod 打版本标签
> 给nginx的pod打一个version标签，记录当前版本
```bash
# 打标签
kubectl label pod -n nginx nginx-deployment-64744f78dc-gbtkj version=1.24.0

# 查看标签是否添加成功
kubectl get pods -n nginx nginx-deployment-64744f78dc-gbtkj --show-labels
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171748380.png)

##### 3.9.3.2 给node1节点添加一个到期时间标签

```bash
# 给node1节点添加一个到期时间标签
kubectl label nodes k8s-node1 expiration-time=2025-12-10

# 查看标签是否添加成功
kubectl get nodes k8s-node1 --show-labels
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171748339.png)


##### 3.9.3.3 更新标签（覆盖）
> 给刚刚的pod标签的版本更新为1.25.0
```bash
kubectl label pod -n nginx nginx-deployment-64744f78dc-gbtkj version=1.25.0 --overwrite
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171748202.png)

##### 3.9.3.4 批量打标签
> 将app=nginx的所有pod都打一个标签为version=v2

```bash
kubectl label pods -n nginx -l app=nginx version=v2
```

##### 3.9.3.5 删除标签
> 将最开始的nginx pod的version标签删除
```bash
kubectl label pod -n nginx nginx-deployment-64744f78dc-gbtkj version-
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171748786.png)

### 3.10 kubectl annotate 贴/斯注释
> `kubectl annotate` = **“给 K8s 对象贴/撕便签”**——**不用于筛选**，只存**元数据**（工具链、CI/CD、控制器自用）；  
与 `label` 区别：**annotate 更长、可隐藏、不参与 selector**；

#### 3.10.1 语法
```bash
# 贴注解
kubectl annotate <资源类型> [-n <ns>] <名称> <key>=<value> [falg]

# 撕注解
kubectl annotate <资源类型> [-n <ns>] <名称> <key>-
```
#### 3.10.2 annotate 与 label 速区别
| 维度              | label                              | annotate                         |
| --------------- | ---------------------------------- | -------------------------------- |
| **作用**          | 用于**筛选、调度、权限、策略**                  | 仅存**元数据**，不参与逻辑                  |
| **长度限制**        | ≤ 63 字符                            | ≤ 256 KB（可存大文本/JSON）             |
| **参与 selector** | ✅ 支持（`kubectl get -l`）             | ❌ 不支持                            |
| **常见用途**        | app=nginx、version=v1、tier=frontend | 构建号、校验和、变更原因、控制器私用数据             |
| **可见性**         | 默认展示（wide 列）                       | 默认隐藏（describe 末段）                |
| **命令**          | `kubectl label ... key=value`      | `kubectl annotate ... key=value` |
| **删除**          | `key-`                             | `key-`（相同语法）                     |

#### 3.10.3 查看注解（两种查看方式）

```bash
# describe 末段 Annotations 区块（如果注释多可以吧5改为更大的数）
kubectl describe deploy -n nginx nginx-deployment  | grep -A5 Annotations

# 单字段提取（脚本用）
kubectl get deploy -n nginx nginx-deployment -o jsonpath='{.metadata.annotations.kubernetes\.io/change-cause}'
```
#### 3.10.4 实例
##### 3.10.4.1 	添加一个注释
> 可以给pod、deploy等添加注释

```bash
# 给nginx的pod添加一个注释
kubectl annotate pods -n nginx nginx-deployment-64744f78dc-gbtkj test="测试annotate"

# 查看确认是否添加注释成功
kubectl describe pods -n nginx nginx-deployment-64744f78dc-gbtkj | grep -A5 Annotations
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171747532.png)
##### 3.10.4.2 覆盖一个注释

```bash
# 覆盖nginx的pod一个注释
kubectl annotate pods -n nginx nginx-deployment-64744f78dc-gbtkj test="测试annotate覆盖" --overwrite
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171747657.png)

##### 3.10.4.3 删除一个注释

```bash
# 删除nginx pod中的test注释
kubectl annotate pods -n nginx nginx-deployment-64744f78dc-gbtkj test-

# 查看确认是否删除注释成功
kubectl describe pods -n nginx nginx-deployment-64744f78dc-gbtkj | grep -A5 Annotations
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171747561.png)

* 常见参数解读

| 键 | 含义 |
| --- | --- |
| `deployment.kubernetes.io/revision` | Deployment 当前 revision 号 |
| `kubectl.kubernetes.io/last-applied-configuration` | `kubectl apply` 最后一次完整 JSON |
| `kubernetes.io/change-cause` | `--record` 或手动写的变更原因 |
| `checksum/*` | 热更新控制器（Reloader）读取的校验和 |

### 3.11 kubectl patch 部分更新资源
> `kubectl patch` = **“不动编辑器，只改局部字段”** 的速效剪刀；  支持 **3 种补丁格式**。

#### 3.11.1 语法
```bash
kubectl patch <资源类型> -n <ns> <名称> \
  --type=<patch类型> \
  -p '<补丁内容>'
```


#### 3.11.2 patch类型
| type | 适用场景 | 示例 |
| --- | --- | --- |
| **strategic**（默认） | 单字段覆盖/新增，**数组自动合并** | `-p '{"spec":{"replicas":5}}'` |
| **merge** | 与 strategic 类似，但数组**全替换** | `--type=merge -p '{"spec":{"replicas":5}}'` |
| **json**（万能） | **任意位置/多字段/数组项** | `--type='json' -p='[{"op":"replace","path":"/spec/replicas","value":5}]'` |

#### 3.11.3 op的6个动词（JSONPatch）
| op          | 含义                           | 一句话记忆       |
| ----------- | ---------------------------- | ----------- |
| **replace** | 把目标字段**整体换新值**               | 改副本、换镜像、调资源 |
| **add**     | **插入/新增**字段或数组项              | 加环境变量、挂新卷   |
| **remove**  | **删除**字段或数组项                 | 删 env、删卷    |
| **move**    | **剪切+粘贴**（改路径）               | 几乎不用        |
| **copy**    | **复制值到另一路径**                 | 几乎不用        |
| **test**    | **断言值必须等于 X**（失败则整 patch 回滚） | 脚本里做校验      |

#### 3.11.4 path路径写法速查（JSONPatch）
| 路径 | 含义 |
| --- | --- |
| `/spec/replicas` | 副本数 |
| `/spec/template/spec/containers/0/image` | 第 1 个容器镜像 |
| `/spec/template/spec/containers/0/env/-` | 在 env 数组末尾追加 |
| `/spec/template/spec/containers/0/env/0` | 数组第 1 项（下标从 0） |
| `/metadata/labels/<key>` | 标签键（含特殊字符时用 ~1 转义 /） |

#### 3.11.5 实例
```bash
# 改副本数
kubectl patch deploy -n nginx nginx-deployment --type='json' -p='[{"op":"replace","path":"/spec/replicas","value":5}]'

# 换镜像
kubectl patch deploy -n nginx nginx-deployment --type='json' -p='[{"op":"replace","path":"/spec/template/spec/containers/0/image","value":"nginx:1.27"}]'

# 插环境变量（无则加）
kubectl patch deploy -n nginx nginx-deployment --type='json' -p='[{"op":"add","path":"/spec/template/spec/containers/0/env/-","value":{"name":"CACHE_TTL","value":"3600"}}]'

# 删环境变量（按下标）
kubectl patch deploy -n nginx nginx-deployment --type='json' -p='[{"op":"remove","path":"/spec/template/spec/containers/0/env/0"}]'

# 整段替换 resources
kubectl patch deploy -n nginx nginx-deployment --type='json' -p='[{"op":"replace","path":"/spec/template/spec/containers/0/resources","value":{"requests":{"cpu":"50m","memory":"120Mi"},"limits":{"cpu":"1","memory":"1Gi"}}}]'
```
### 3.12 kubectl proxy 本地代理端口
> `kubectl proxy` 是 **“本地开发调试神器”**——  
> **不暴露 apiserver 证书、不开放集群外网**，就能在 **本机 8001/8080** 端口通过 **HTTP** 访问 **kube-apiserver 全部 REST 端点**；  

#### 3.12.1 语法
```bash
kubectl proxy [--port=<端口>] [--address=<IP>] [--accept-hosts=<正则>] [其他flag]
```
启动`kubectl proxy`默认监听：`127.0.0.1:8001`

#### 3.12.2 kubectl proxy 参数
| flag | 示例 | 说明 |
| --- | --- | --- |
| `--port=<端口>` | `--port=8080` | 监听端口（默认 8001） |
| `--address=<IP>` | `--address=0.0.0.0` | 绑定地址（默认 127.0.0.1） |
| `--accept-hosts=<正则>` | `--accept-hosts='^localhost$'` | Host 头白名单（安全） |
| `--accept-paths=<正则>` | `--accept-paths='^/api/v1/namespaces/default/.*'` | 路径白名单 |
| `--reject-methods=<列表>` | `--reject-methods=POST,PUT` | 禁用写方法（只读代理） |
| `--kubeconfig=<文件>` | `--kubeconfig=./prod.conf` | 指定 kubeconfig |
| `--request-timeout=<时长>` | `--request-timeout=30s` | 向后端 apiserver 请求超时 |

#### 3.12.3 实例
* 本机调试 API
> 默认为8001端口，启动之后可以使用`netstat -anput | grep 8001`查看确认是否启动；
```bash
# 挂后台启动 kubectl proxy
kubectl proxy &
# 浏览器输入，如果服务器没有安装浏览器可使用curl http:....访问：
http://localhost:8001/api/v1/namespaces/default/pods
http://localhost:8001/apis/apps/v1/namespaces/default/deployments
http://localhost:8001/metrics          # 需 metrics-server
http://localhost:8001/logs/kube-system/kube-apiserver-xxx.log
```
### 3.13 kubectl port-forward TCP端口映射
> `kubectl port-forward` 是“**TCP 端口映射神器**”——  
> **无需暴露 Service、不改 YAML**，就能把 **Pod/Service/Deployment** 的任意端口映射到 **本地 127.0.0.1:任意端口**，方便本地调试数据库、微服务、Dashboard 等；<br>
> 使用此服务时，需要再所有节点安装`socat`服务，安装命令：`yum install -y socat`、`apt-get update && apt-get install -y socat`；

### 3.13.1 语法
```bash
# Pod 端口 → 本地端口
kubectl port-forward [-n <ns>] <pod名> <本地端口>:<Pod端口> [其他flag]

# Service 端口 → 本地端口
kubectl port-forward [-n <ns>] svc/<服务名> <本地端口>:<Service端口> 

# Deployment 端口 → 本地端口（自动选 Pod）
kubectl port-forward [-n <ns>] deploy/<部署名> <本地端口>:<容器端口>
```

### 3.13.2 常用场景及示例

| 场景 | 示例 | 效果 |
| --- | --- | --- |
| **本地连 MySQL** | `kubectl port-forward -n mysql svc/mysql 3306:3306` | 本地 `mysql -h 127.0.0.1 -P 3306` 直连集群内 MySQL |
| **调试微服务** | `kubectl port-forward -n dev deploy/api 8080:80` | 本地 `curl http://127.0.0.1:8080/api` 调集群内 API |
| **看 Kubernetes Dashboard** | `kubectl port-forward -n kube-system svc/kubernetes-dashboard 8443:443` | 浏览器 `https://localhost:8443` 打开 Dashboard |
| **单个 Pod 调试用** | `kubectl port-forward -n nginx pod/nginx-pod 8080:80` | 本地测试该 Pod 实例 |
| **随机本地端口** | `kubectl port-forward -n redis svc/redis :6379` | 自动分配如 `49153:6379`，避免冲突 |

### 3.13.3 port-forward与 proxy 区别
| 维度       | kubectl proxy                            | kubectl port-forward                         |
| -------- | ---------------------------------------- | -------------------------------------------- |
| **协议**   | **HTTP/HTTPS** 代理                        | 纯 **TCP** 隧道                                 |
| **目标**   | 整个 **kube-apiserver** REST 端点            | **单个 Pod/Service** 的业务端口                     |
| **本地端口** | 默认 **8001**（可改）                          | 任意指定（如 3306、8080）                            |
| **证书**   | **自动携带**当前 kubeconfig，**零配置**            | 需要本地 kubeconfig，但**不暴露证书**给业务                |
| **用途**   | 调试 API、前端跨域、脚本抓集群数据                      | 本地直连集群内 **MySQL、Redis、Dashboard** 等业务端口      |
| **持久性**  | 进程关就断（临时）                                | 进程关就断（临时）                                    |
| **示例访问** | `curl http://127.0.0.1:8001/api/v1/pods` | `mysql -h 127.0.0.1 -P 3306`                 |
| **命令示例** | `kubectl proxy &`                        | `kubectl port-forward svc/mysql 3306:3306 &` |

## 四、调试 & 排障类  
### 4.1 kubectl top 实时查看 cpu/内存 用量
#### 4.1.1 语法

```bash
kubectl top [node | pod] [资源名] [flags]
```
* [x] 查询出的结果cpu、内存展示解读
>- **CPU(cores)**：毫核 (`m`)，`1000m` = 1 核  
>- **MEMORY(bytes)**：二进制单位 (`Mi/Gi`)，`1024Mi` = 1 GiB

#### 4.1.2 常用命令
| 场景             | 命令                                           |
| -------------- | -------------------------------------------- |
| 集群节点总览         | `kubectl top nodes`                          |
| 节点按 CPU 排序     | `kubectl top nodes --sort-by=cpu`            |
| 某 Pod 用量       | `kubectl top pod -n <ns> <pod名>`             |
| 某命名空间全部 Pod    | `kubectl top -n <ns> pods`                   |
| 含 Init 容器      | `kubectl top pod -n <ns> <pod> --containers` |
| 只看最近 5 条最耗 CPU | `kubectl top pods -A --sort-by=cpu \| head -5` |

#### 4.1.3 全局flag参数

| Flag                   | 示例                                  | 说明       |
| ---------------------- | ----------------------------------- | -------- |
| `--sort-by=cpu/memory` | `kubectl top pods --sort-by=memory` | 按用量排序    |
| `--containers`         | `kubectl top pod xxx --containers`  | 展开多容器    |
| `-A/--all-namespaces`  | `kubectl top pods -A`               | 全集群范围    |
| `-n <ns>`              | `kubectl top pods -n nginx`          | 指定命名空间   |
| `--no-headers`         | `kubectl top nodes --no-headers`    | 去表头，脚本友好 |


#### 4.1.4 问题解决

> 如果使用`kubectl top`输出结果为`error: Metrics API not available`，是因为没有安装`Metrics-Server`，可参考：[K8S 二进制集群搭建（一主两从）](https://liucy.blog.csdn.net/article/details/151709127)，步骤 **6.6 部署 Metrics-Server 实现 `kubectl top` 与自动伸缩** 进行安装；

| 现象 | 解决 |
| --- | --- |
| `error: Metrics API not available` | 装 Metrics-Server（国内镜像 + `--kubelet-insecure-tls`） |
| 数值全 0 | Pod 没写 `resources.requests`；top 依赖 requests 计算利用率 |
| 节点显示 `<unknown>` | 节点 kubelet 10250 被防火墙拦截；放行或加 `hostNetwork: true` |

#### 4.1.5 实例
##### 4.1.5.1 查看集群节点的资源用量并以cpu从高到低来排序

```bash
# 查看集群节点的资源用量
kubectl top nodes
# 按照cpu占用从高到低排序
kubectl top nodes --sort-by=cpu
# 也可以按照内存从高到低排序
kubectl top nodes --sort-by=memory
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171747488.png)
##### 4.1.5.2 查看某个pod的资源用量

```bash
kubectl top pod -n nginx nginx-deployment-64744f78dc-t9pbf
```
##### 4.1.5.3 查看某个命名空间下的所有pod资源用量

```bash
kubectl top pod -n kube-system
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171747623.png)
##### 4.1.5.4 查看某个命名空间下的所有pod资源用量及pod名称

```bash
kubectl top pod -n kube-system --containers
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171747641.png)
##### 4.1.5.5 查看前五名cpu和内存消耗最高的pod

```bash
# 查看所有pod，cpu占用最高的5个pod，因为还含表头所以head写6
kubectl top pods -A --sort-by=cpu --containers | head -n 6
# 查看所有pod，内存占用最高的5个pod，因为还含表头所以head写6
kubectl top pods -A --sort-by=memory --containers | head -n 6
```

##### 4.1.5.6 去表头查看前五名cpu消耗最高的pod

```bash
kubectl top pods -A --sort-by=cpu --containers --no-headers | head -n 5
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171747220.png)
### 4.2 kubectl describe 显示资源详细信息
> `kubectl describe` 是“**人类可读详情页**”专用命令，**不输出 YAML/JSON**，而是把事件、状态、条件、注解等**按段落排版**，适合**快速排障**；  

#### 4.2.1 语法
```bash
kubectl describe <资源类型> [-n <命名空间>] [<名称>] 
```
#### 4.2.2 常用场景及命令

| 场景 | 命令 |
| --- | --- |
| 看 Pod 事件 | `kubectl describe pod  -n <ns> <pod名>` |
| 看 Node 资源/条件 | `kubectl describe node <node名>` |
| 看 Deployment 滚动过程 | `kubectl describe deploy -n <ns> <deploy名> ` |
| 看 Service 端点 | `kubectl describe svc -n <ns> <svc名>` |
| 看 ConfigMap/Secret 元数据 | `kubectl describe cm -n <ns> <cm名>` |
| 看 PVC 绑定/事件 | `kubectl describe pvc -n <ns> <pvc名> ` |
| 看 Ingress 后端 | `kubectl describe ing -n <ns> <ing名>` |

#### 4.2.3 全局flag参数

| flag               | 示例                                           | 说明              |
| ------------------ | -------------------------------------------- | --------------- |
| `-n/--namespace`   | `kubectl describe pod  -n nginx xxx`           | 指定命名空间          |
| `--all-namespaces` | `kubectl describe node xxx --all-namespaces` | 跨 ns 资源（如 Node） |
| `--chunk-size=200` | `kubectl describe node xxx --chunk-size=200` | 分页拉取，大集群防超时     |

#### 4.2.4 `describe`关键段落解读

| 段落名 | 作用 |
| --- | --- |
| **Annotations/Labels** | 快速确认版本、配置哈希、变更原因 |
| **Controlled By** | 知道谁管这个对象（Deployment/StatefulSet/Job） |
| **Conditions** | 健康状态：Ready、PodScheduled、MemoryPressure... |
| **Events** | **排障黄金段**，看 FailedMount、CrashLoopBackOff、ImagePullBackOff 等错误详情 |
| **Volumes/Mounts** | 挂没挂对、Secret/ConfigMap 是否存在 |
| **Endpoints**（Service） | 看后端 Pod IP:Port 列表，空表示无 Ready  Pod |
| **Limits/Requests** | 秒查资源约束；空表示没写 requests/limits |

#### 4.2.5 实例
##### 4.2.5.1 查看某个pod的详细信息

```bash
kubectl describe pod -n nginx nginx-deployment-64744f78dc-t9pbf
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171747087.png)

##### 4.2.5.2 查看某个node的详细信息

```bash
kubectl describe nodes k8s-node1
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171746636.png)
### 4.3 kubectl logs 查看容器日志
> `kubectl logs` 专抓容器标准输出/错误流，类似于docker的`docker logs -f 容器名`，同样都是查看容器的标准输出/错误流；
> `kubectl logs` **线上排障、业务跟踪**必备，先用`kubectl describe`，再用`kubectl logs`进行排障；

#### 4.3.1 语法
```bash
kubectl logs [-n <命名空间>] <pod名> [-c <容器名>] [时间/行数/跟随选项]
```
#### 4.3.2 常用参数及示例

| flag | 示例 | 说明 |
| --- | --- | --- |
| `-n/--namespace` | `kubectl logs -n <ns> <pod>` | 指定命名空间 |
| `-c/--container` | `kubectl logs -n <ns> <pod> -c nginx` | 指定容器名（多容器时必须） |
| `--tail=<行数>` | `kubectl logs  -n <ns> <pod> --tail=100` | 从末尾开始看 N 行 |
| `--since=<时长>` | `kubectl logs  -n <ns> <pod> --since=5m` | 最近 N 分钟/小时（如 1h） |
| `--since-time=<RFC3339>` | `kubectl logs <pod> --since-time=2025-06-20T08:00:00Z` | 精确时间点之后 |
| `-f/--follow` | `kubectl logs -f  -n <ns> <pod>` | 实时 tail -f |
| `--timestamps` | `kubectl logs  -n <ns> <pod> --timestamps` | 每行带 RFC3339 时间戳 |
| `--previous` | `kubectl logs  -n <ns> <pod> --previous` | 看已退出的前容器日志 |
| `--all-containers` | `kubectl logs  -n <ns> <pod> --all-containers` | 一次性输出 Pod 内所有容器日志 |
| `--limit-bytes=<大小>` | `kubectl logs  -n <ns> <pod> --limit-bytes=1048576` | 只拉前 N 字节，防超大日志 |
| `-v=<级别>` | `kubectl logs  -n <ns> <pod> -v=6` | 调客户端详细度（0-9） |

#### 4.3.3 实例
##### 4.3.3.1 查看某个pod全部日志

```bash
kubectl logs -n nginx nginx-deployment-64744f78dc-t9pbf
```
##### 4.3.3.2 实时查看某个pod日志

```bash
kubectl logs -f -n nginx nginx-deployment-64744f78dc-t9pbf
```
##### 4.3.3.3 实时查看pod日志并且要查看最近300行

```bash
kubectl logs -f -n kube-system calico-node-z56kl --tail=300
```
##### 4.3.3.4 查看某个pod近10分钟的日志

```bash
kubectl logs -n kube-system calico-node-z56kl --since=10m
```
##### 4.3.3.5 将某个pod的日志导出来

```bash
kubectl logs -n nginx nginx-deployment-64744f78dc-t9pbf > nginx-pod.log
```
### 4.4 kubectl exec 进入容器交互
> `kubectl exec` 是可以交互式进入容器来执行一些操作，这些操作不会影响容器外，除了映射路径；
> 和`docker exec` 是一样的，都是进入容器里进行操作；


#### 4.4.1  语法
```bash
kubectl exec -it [-n 命名空间] <pod名> -- bash
```

#### 4.4.2 实例：以交互形式进入某个pod容器内

```bash
kubectl exec -it -n nginx nginx-deployment-64744f78dc-t9pbf -- bash
```
* `exec`：远程 SSH
* `-it` ：进交互
* `--`：没 bash 换 sh

#### 4.4.3 错误信息排查
| 现象 | 解决 |
| --- | --- |
| `error: unable to upgrade connection: Forbidden` | 检查 RBAC 是否允许 `pods/exec`；给账号加 `<verb>create` 权限 |
| `OCI runtime exec failed: exec failed: unable to start container process: exec: "/bin/bash": stat /bin/bash: no such file or directory` | 镜像没 bash，换 `/bin/sh` 或 `ash` |
| `command not found` | 镜像最小化，先 `kubectl exec -it <pod> -- apk add --no-cache curl` 装工具 |
| 多容器没指定 `-c` | 加 `-c 容器名`；否则默认第 1 个容器 |
| 本地脚本参数被截断 | 命令用 `--` 分隔，例：`kubectl exec <pod> -- bash -c "echo 1; echo 2"` |
### 4.5 kubectl cp 容器内外复制文件
> `kubectl cp` 是“容器与本地互传文件”的专用命令，和`docker cp`是一样的，无需开 `ssh/sftp`；

#### 4.5.1 语法
```bash
# 本地 → 容器
kubectl cp <本地路径及文件> -n <ns> <pod>:<容器路径>

# 容器 → 本地
kubectl cp -n <ns> <pod>:<容器路径及文件> <本地路径及文件名>
```
#### 4.5.2 实例
##### 4.5.2.1 拷贝本地文件到pod中

```bash
kubectl cp a.txt -n nginx nginx-deployment-64744f78dc-t9pbf:/application/
```

> 任务：我们需要把`a.txt`文件传输到nginx 的 pod中；
```bash
# 首先需要再本地创建一个文件
touch a.txt
# 然后进入pod看看需要复制到哪，确保没有此文件
## 进入pod
kubectl exec -it -n nginx nginx-deployment-64744f78dc-t9pbf -- bash
## 进入自己的目录确认是否有这个文件
cd /application/
## 确认没有退出pod进行文件传输
exit
kubectl cp a.txt -n nginx nginx-deployment-64744f78dc-t9pbf:/application/
# 传输完成之后进入pod查看确认
kubectl exec -it -n nginx nginx-deployment-64744f78dc-t9pbf -- bash
cd /application/
ls
# 确认文件已经传进来了；
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171746577.png)

##### 4.5.2.2 拷贝本地目录到pod中


```bash
kubectl cp test -n nginx nginx-deployment-64744f78dc-t9pbf:/application/
```

> 任务：我们需要把`test`目录传输到nginx 的 pod中；
```bash
# 首先需要再本地创建一个目录
mkdir test
# 然后进入pod看看需要复制到哪，确保没有此文件
## 进入pod
kubectl exec -it -n nginx nginx-deployment-64744f78dc-t9pbf -- bash
## 进入自己的目录确认是否有这个目录
cd /application/
## 确认没有退出pod进行目录传输
exit
kubectl cp test -n nginx nginx-deployment-64744f78dc-t9pbf:/application/
# 传输完成之后进入pod查看确认
kubectl exec -it -n nginx nginx-deployment-64744f78dc-t9pbf -- bash
cd /application/
ls
# 确认文件已经传进来了；
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171746695.png)

##### 4.5.2.3 拷贝pod中文件到本地
```bash
kubectl cp -n nginx nginx-deployment-64744f78dc-t9pbf:/application/b.txt  ./b.txt
```
> 任务：我们需要pod中的`b.txt`文件传输到当前目录下；
```bash
# 首先需要进入pod
kubectl exec -it -n nginx nginx-deployment-64744f78dc-t9pbf -- bash
# 在指定目录创建文件
cd /application
touch b.txt
# 创建好之后退出pod，执行命令复制到本地
exit
kubectl cp -n nginx nginx-deployment-64744f78dc-t9pbf:/application/b.txt  ./b.txt
# 查看确认本地是否已经把文件复制出来了
ls
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171746764.png)
> 从pod中拷贝文件或目录出来的时候需要加上文件名或目录名，否则会报错；


##### 4.5.2.4 拷贝pod中目录到本地
```bash
kubectl cp -n nginx nginx-deployment-64744f78dc-t9pbf:/application/test2  ./test2
```
> 任务：我们需要pod中的`test2`目录传输到当前目录下；
```bash
# 首先需要进入pod
kubectl exec -it -n nginx nginx-deployment-64744f78dc-t9pbf -- bash
# 在指定目录创建目录
cd /application
mkdir test2
# 创建好之后退出pod，执行命令复制到本地
exit
kubectl cp -n nginx nginx-deployment-64744f78dc-t9pbf:/application/test2  ./test2
# 查看确认本地是否已经把文件复制出来了
ls
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171746708.png)
> 从pod中拷贝文件或目录出来的时候需要加上文件名或目录名，否则会报错；

### 4.6 kubectl debug 临时调试pod
> `kubectl debug` 是 **1.18+ 官方调试利器**，无需改镜像即可**临时插调试容器**、**复制 Pod 现场**、**离线抓包/查文件**；

#### 4.6.1 语法
```bash
kubectl debug -n <ns> <Pod> [调试方式] [调试镜像] [其他flag]
```
#### 4.6.2 全局参数

| flag | 示例 | 说明 |
| --- | --- | --- |
| `-i/--stdin` | `kubectl debug <pod> -i --image=alpine -- echo 1` | 保持标准输入 |
| `-t/--tty` | `kubectl debug <pod> -it --image=alpine` | 分配伪终端 |
| `-c/--container` | `kubectl debug <pod> -c sidecar -it --image=busybox` | 指定目标容器（共享 PID/网络） |
| `--target=<容器名>` | `kubectl debug <pod> --target=app -it --image=busybox` | 共享目标容器的 PID 命名空间 |
| `--copy-to=<名字>` | `kubectl debug <pod> --copy-to=debug-pod` | 生成复制 Pod 名称 |
| `--image=<镜像>` | `kubectl debug <pod> -it --image=nicolaka/netshoot` | 调试容器镜像（含工具包） |
| `--dry-run=client` | `kubectl debug <pod> --dry-run=client -o yaml` | 空跑生成 YAML |
| `--share-processes` | `kubectl debug <pod> -it --share-processes` | 强制共享 PID 命名空间（1.25+） |
| `-n/--namespace` | `kubectl debug <pod> -n prod` | 指定命名空间 |


#### 4.6.3 实例
```bash
# ① 原地插调试容器（共享网络，抓包/看文件）
kubectl debug -n nginx nginx-pod -it --image=nicolaka/netshoot

# ② 复制 Pod 改镜像调试（原 Pod 不动）
kubectl debug -n nginx nginx-pod -it --copy-to=nginx-debug --image=nginx:debug

# ③ 节点级抓包（宿主机网卡）
kubectl debug node/k8s-worker01 -it --image=nicolaka/netshoot -- tcpdump -i eth0

# ④ 共享 PID 命名空间，strace 目标进程
kubectl debug -n prod app-pod -it --image=busybox --target=app-container -- strace -p 1

# ⑤ 离线复制 Pod 不启动（只生成 YAML 审查）
kubectl debug -n nginx nginx-pod --copy-to=nginx-offline --image=busybox --dry-run=client -o yaml > offline.yaml
```

#### 4.6.4 错误信息排查

| 现象 | 解决 |
| --- | --- |
| `error: ephemeral containers are disabled` | kubelet 配置打开 `EphemeralContainers` feature gate（1.22+ 默认开启） |
| `error: container not found` | 加 `--target=容器名` 或确认容器名拼写 |
| `error: node debugging is not enabled` | kubelet 开启 `--enable-debugging-handlers=true`（默认 true） |
| 网络插件拒绝临时容器 | 给临时容器加同样 label/annotation，或换 CNI 宽松模式 |
| 调试镜像工具缺失 | 换 `nicolaka/netshoot`、`busybox:1.36` 等带工具包镜像 |
## 五、全局配置
### 5.1 查看类全局配置（Get/List/Describe 通用）

| Flag | 示例 | 一句话说明 |
|------|------|------------|
| `-o wide` | `kubectl get pods -n nginx nginx.... -o wide` | 多列宽表，看节点 IP、Pod-CIDR、镜像等 |
| `-o yaml/json` | `kubectl get deploy  -n nginx nginx-deployment  -o yaml`<br>`kubectl get deploy -n nginx nginx-deployment -o yaml > nginx-deployment.yaml` | 整份对象导出，备份/GitOps |
| `-o name` | `kubectl get pods -A -o name` | 只打印“类型/名称”，适合管道删除 |
| `-o custom-columns=` | `kubectl get pods -n nginx nginx... -o custom-columns=NAME:.metadata.name,CPU:.spec.containers[0].resources.requests.cpu` | 自定义列报表 |
| `-o jsonpath=` | `kubectl get no -o jsonpath='{.items[*].status.addresses[?(@.type=="InternalIP")].address}'` | 单字段提取，脚本最爱 |
| `--show-labels` | `kubectl get pods  -n nginx nginx... --show-labels` | 额外显示所有标签列 |
| `-A/--all-namespaces` | `kubectl get pods -A` | 全集群范围查询 |
| `-l/--selector` | `kubectl get pods -A -l app=nginx` | 标签过滤 |
| `--watch/-w` | `kubectl get pods -n nginx nginx... -w` | 持续监控变化 |




### 5.2 操作类全局配置（Create/Set/Patch/Apply/Delete/Scale 通用）

| Flag | 示例 | 一句话说明 |
|------|------|------------|
| `--dry-run=client` | `kubectl apply -f xxx.yaml --dry-run=client` | 空跑预览，不真正写集群 |
| `--dry-run=server` | `kubectl apply -f xxx.yaml --dry-run=server` | 服务端空跑，带准入校验 |
| `-o yaml/json` | `kubectl set image ... -o yaml` <br>`kubectl set image ... --dry-run=client -o yaml > -o nginx-set.yaml` | 把操作结果导出，再 GitOps |
| `--record` | `kubectl set env ... --record` | 把命令写进 change-cause，回滚可溯源 |
| `--all` | `kubectl delete po --all -n dev` | 全选当前命名空间下同类资源 |
| `--force` | `kubectl delete pod xxx --force --grace-period=0` | 强制立即删除（慎用） |
| `--grace-period=` | `kubectl delete pod xxx --grace-period=60` | 自定义优雅终止时长 |
| `--timeout=` | `kubectl wait --for=condition=ready pod --timeout=300s` | 最大等待时间 |
| `--validate` | `kubectl apply -f xxx.yaml --validate=true` | 客户端语法/模式校验 |
| `--field-manager=` | `kubectl apply -f xxx.yaml --field-manager=ci` | 字段冲突时记录操作者 |

### 5.3 日志与调试类全局配置

| Flag | 示例 | 一句话说明 |
|------|------|------------|
| `--tail=` | `kubectl logs nginx-pod --tail=100` | 只看末尾 N 行 |
| `--since=` | `kubectl logs nginx-pod --since=5m` | 最近 N 分钟日志 |
| `--follow/-f` | `kubectl logs -f nginx-pod` | 实时 tail |
| `--all-containers` | `kubectl logs nginx-pod --all-containers` | 多容器一起输出 |
| `--previous` | `kubectl logs nginx-pod --previous` | 看已崩溃的前一个容器日志 |
| `--timestamps` | `kubectl logs nginx-pod --timestamps` | 带时间戳 |
| `-c/--container` | `kubectl logs nginx-pod -c sidecar` | 指定容器名 |
| `-v=<级别>` | `kubectl get no -v=6` | 调整客户端日志详细度（0-9） |
| `--alsologtostderr` | `kubectl apply -f xxx.yaml --alsologtostderr` | 把客户端日志也打到终端 |


### 5.4 一句话速记
**“查看用 `-o` 家族，操作靠 `--dry-run --record --all`，日志靠 `--tail --since -f`，调试再加 `-v`。”**


## 六、集群管理类
### 6.1 kubectl config 修改kubeconfig文件
> `kubectl config` 是“**kubeconfig 文件管家**”——**不碰集群**，只管理 `~/.kube/config`（或其他自定义文件）里的 **集群、用户、上下文** 三要素；

#### 6.1.1 语法
```bash
kubectl config [子命令] [选项]
```
默认操作文件：`~/.kube/config`（可通过 `--kubeconfig` 或 `KUBECONFIG` 环境变量换文件）
#### 6.1.2 常用子命令及示例

| 子命令 | 一句话功能 | 示例 |
| --- | --- | --- |
| `view` | 打印当前 kubeconfig 全文 | `kubectl config view` |
| `current-context` | 查看当前在哪个集群 | `kubectl config current-context` |
| `get-contexts` | 列出所有上下文 | `kubectl config get-contexts` |
| `use-context` | 切换上下文（多集群秒切） | `kubectl config use-context prod` |
| `set-context` | 修改/新建上下文 | `kubectl config set-context prod --cluster=prod --user=admin` |
| `get-clusters` | 列出所有集群 | `kubectl config get-clusters` |
| `set-cluster` | 新建/修改集群地址 | `kubectl config set-cluster prod --server=https://10.0.0.1:6443` |
| `set-credentials` | 新建/修改用户凭证 | `kubectl config set-credentials admin --token=<token>` |
#### 6.1.3 全局选项参数及示例
| flag | 示例 | 说明 |
| --- | --- | --- |
| `--kubeconfig=<文件>` | `kubectl config view --kubeconfig=./prod.conf` | 操作指定 config 文件 |
| `--merge` | `kubectl config view --merge` | 合并多个 KUBECONFIG 文件（默认 true） |
| `--raw` | `kubectl config view --raw` | 输出原始证书/私钥（不 base64） |
| `--minify` | `kubectl config view --minify` | 只打印当前上下文相关部分（精简） |


### 6.2 kubectl cordon 节点隔离
> `kubectl cordon` 是“**节点隔离**”命令——  
> **禁止新 Pod 再调度到指定节点**，但**不影响已运行 Pod**；常用于 **计划维护、故障排查、滚动升级前清场**。

#### 6.2.1 语法
```bash
kubectl cordon <节点名>
```
> 一般用于计划维护节点前进行隔离	，防止新的pod进入此节点；
>  `kubectl cordon k8s-node2`    # 创建k8s-node2节点隔离
> `kubectl get nodes` # 查看node节点状态，会出现一个 `SchedulingDisabled`，说明节点隔离设置成功。

#### 6.2.2 实例

```bash
# 写nginx-deployment.yaml，测试可以直接指定节点来测试
## nodeSelector为软亲和，nodeName为硬亲和；
spec:
  replicas: 1
  template:
    spec:
      nodeSelector:          # 软亲和，受 cordon 影响
        kubernetes.io/hostname: k8s-node2

# 启动创建nginx pod
kubectl apply -f nginx-deployment.yaml
# 查看pod确认正常运行
kubectl get pods -n nginx -o wde

# 创建k8s-node2节点隔离
kubectl cordon k8s-node2
# 查看node节点状态，会出现一个 SchedulingDisabled
kubectl get nodes

# 将nginx deployment的副本数改为2
kubectl scale deployment -n nginx nginx-deployment --replicas=2
# 再次查看pod运行是否正常
kubectl get pods -n nginx -o wide
# 发现pod没有正常启动，可以查看pod运行日志
kubectl describe pods -n nginx nginx-deployment-5b8747b9c8-fj525 | grep -A10 Events
# 在运行日志中发现了Warning，这个信息说的是1个节点不可调度，2个节点与Pod的节点关联不匹配。
# 因为我们配置的是node2节点，而node2已经做了节点隔离，所以不可调度，那么新的pod就起不来了。
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171746500.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171746411.png)

### 6.3 kubectl drain 节点驱逐

> `kubectl drain` 是“**节点清场**”命令：  
> **先 `cordon` 关闸门 → 再驱逐所有可驱逐 Pod → 让节点干干净净**，方便 **维护、升级、换盘、内核更新等**；  

#### 6.3.1 语法
```bash
kubectl drain <节点名> \
  [--ignore-daemonsets] \
  [--delete-emptydir-data] \
  [--force] \
  [--grace-period=<秒>] \
  [--timeout=<时长>] \
  [--dry-run=client]
```
| 参数                       | 作用                                                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `--ignore-daemonsets`    | 无视 DaemonSet 的 Pod，否则 calico-node、kube-proxy 等会阻塞。                                                                   |
| `--delete-emptydir-data` | 强制删除使用 `emptyDir` 的 Pod（本地临时盘），数据会丢。                                                                                 |
| `--force`                | 节点上如果有“裸 Pod”（不受 RS/Deployment 管理）也一起踢掉。                                                                             |
| `--grace-period=<秒>`     | 给 Pod 多少秒优雅退出，默认 30 s；设 0 表示立即杀。                                                                                     |
| `--timeout=<时长>`         | 等待所有 Pod 被驱逐的总时限，例如 `5m`、`600s`，超时就失败。                                                                               |
| `--dry-run=client`       | 只本地模拟，不真正驱逐，用来预览会动哪些 Pod。                                                                                            |


#### 6.3.2 实例
* 首先，确认node2节点都有哪些pod

```bash
kubectl get pods -A -o wide | grep k8s-node2
kubectl get pods -A --field-selector spec.nodeName=k8s-node2
```
* 在驱逐之前可以先空跑预览一下，不真正执行，确认没问题再进行驱逐，避免出问题

```bash
kubectl drain k8s-node2 --ignore-daemonsets --delete-emptydir-data --dry-run=client	
```
| 参数                       | 含义                          | 为什么默认不让删                                                                               |
| ------------------------ | --------------------------- | -------------------------------------------------------------------------------------- |
| `--ignore-daemonsets`    | **忽略 DaemonSet 管理的 Pod**    | DaemonSet 保证每个节点都要跑一个副本，删掉它控制器会立即重建，默认认为“删了也白删”，所以干脆不让删，除非手动加开关告诉 kubectl “我就不要了，你继续”。 |
| `--delete-emptydir-data` | **强制删除使用 `emptyDir` 的 Pod** | `emptyDir` 是把数据写到节点本地磁盘，Pod 一走数据就丢；默认怕你把有状态数据误删，于是先拦住，必须显式声明“我接受丢数据”才放行。    |
|`--dry-run=client`|**全局参数**，空跑预览，不真正执行。| 在进行驱逐前，可以空跑一下，避免在驱逐时出现问题|


* 确认没问题进行驱逐

```bash
kubectl drain k8s-node2 --ignore-daemonsets --delete-emptydir-data
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171745657.png)

#### 6.3.3 驱逐行为速览（为什么会被驱逐？）

| 类型 | 默认是否驱 | 说明 |
| --- | --- | --- |
| **ReplicaSet/Deployment Pod** | ✅ | 控制器会在其他节点重建 |
| **StatefulSet Pod** | ✅ | 按序号逆序重建（需足够节点） |
| **DaemonSet Pod** | ❌ | 默认不驱（节点级守护进程） |
| **Static Pod** | ❌ | kubelet 本地管理，无法驱 |
| **Pod with PDB** | ❌ | 违反 PDB 会卡住，需手动确认 |
| **emptyDir Pod** | ❌ | 默认不驱（数据丢失），加 `--delete-emptydir-data` 强制 |

---

#### 6.3.4 问题排查

| 现象 | 解决 |
| --- | --- |
| `error: cannot delete Pods with local storage (emptyDir)` | 加 `--delete-emptydir-data` |
| `error: cannot delete Pods that declare PDB` | 先 `kubectl delete pdb <pdb名>` 或增加副本 |
| `error: timeout` | 加 `--timeout=10m` 或检查 Pod 是否卡住 Terminating |
| `error: pod not evicted` | Pod 无控制器，手动 `kubectl delete pod <name>` |
| 想 **只预览** | 加 `--dry-run=client` |

### 6.4 kubectl uncordon 节点恢复

> `kubectl uncordon` 是 **“重新打开节点闸门”**——  
> **取消 `SchedulingDisabled` 标记**，让新 Pod 可以再次调度到该节点；  
> **不驱逐、不重启、不改配置**，只做**状态位翻转**；常用于 **维护/升级/换盘结束后**，让节点重新投入使用。
#### 6.4.1 语法
```bash
kubectl uncordon <节点名>
```
#### 6.4.2 实例

```bash
# 查看node节点确认被隔离
kubectl get nodes

# 进行节点恢复
kubectl uncordon k8s-node2

# 再次查看node节点是否恢复隔离
kubectl get nodes
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512171743055.png)


#### 6.4.3 完整维护三连

|维护三联|说明  |
|--|--|
| `kubectl cordon`|  节点隔离（关闸门）|
|`kubectl drain`  | 节点驱逐（清场） |
| `kubectl uncordon` |  节点恢复（开闸门）|

```bash
# 1. 隔离节点
kubectl cordon k8s-node2

# 2. 驱逐业务 Pod（优雅清场）
kubectl drain k8s-node2--ignore-daemonsets --delete-emptydir-data

# 3. 维护操作（换磁盘、升级 kubelet、内存扩容...）

# 4. 解除隔离，重新投入使用
kubectl uncordon k8s-node2
```

#### 6.4.4 一句话口诀
>**“cordon 关闸门，不赶旧 Pod；维护前先 `cordon`，再 `drain` 清场，完事 `uncordon` 重新开门。”**



## 七、结尾
> 如果还有其他的或者文中有错的，欢迎大家提出，我这里进行修改

>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗