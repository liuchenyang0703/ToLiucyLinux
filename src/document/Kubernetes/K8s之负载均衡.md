---
title: K8s之负载均衡
icon: circle-info
order: 1
category:
  - Linux
  - kubernetes
tag:
  - Linux
  - kubernetes
  - 运维
date: 2026-05-19
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




![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211409489.png)



##  一、使用DaemontSet方式部署 nginx服务 - 用于测试
### 1.1 编写yaml文件
* `vi nginx-daemonset.yaml`
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
### 1.2 创建并部署nginx服务

```bash
# 创建并部署nginx服务
kubectl apply -f nginx-daemonset.yaml

# 查看部署的服务状态
kubectl get ds -n nginx
kubectl get pods -n nginx -o wide
```
主要检查pod的运行状态和node节点就行，每个节点跑一个`nginx pod`；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211409509.png)

### 1.3 修改nginx默认内容
> 修改nginx默认内容，便于区分是否进行负载；
> 给三个 `nginx pod`中的`index.html`添加内容，内容例如为：`This is k8s-master
`，内容需要和对应的节点相同，便于区分；

* 修改`nginx pod`中`index.html`内容
```bash
kubectl exec -n nginx nginx-daemonset-sgpzz -- sh -c 'echo "This is k8s-master" > /usr/share/nginx/html/index.html'
kubectl exec -n nginx nginx-daemonset-5chs6 -- sh -c 'echo "This is k8s-node1" > /usr/share/nginx/html/index.html'
kubectl exec -n nginx nginx-daemonset-j46k4 -- sh -c 'echo "This is k8s-node2" > /usr/share/nginx/html/index.html'
```
* 查看并确认修改成功

```bash
[root@k8s-master ~]# kubectl exec -n nginx nginx-daemonset-j46k4 -- sh -c 'cat /usr/share/nginx/html/index.html'
This is k8s-node2
[root@k8s-master ~]# kubectl exec -n nginx nginx-daemonset-5chs6 -- sh -c 'cat /usr/share/nginx/html/index.html'
This is k8s-node1
[root@k8s-master ~]# kubectl exec -n nginx nginx-daemonset-sgpzz -- sh -c 'cat /usr/share/nginx/html/index.html'
This is k8s-master
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211409826.png)

## 二、按 Service 方式进行负载
### 2.1 ClusterIP 方式进行负载
> 适用场景
> * 集群内部服务互相调用
> * 不需要外部直接访问


* 创建svc，`vim nginx-svc.yaml`
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  namespace: nginx
spec:
  type: ClusterIP
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  # 需和daemonset/deployment/StatefulSet写的一致
  selector:
    app: nginx
  # 负载均衡策略：None=轮询，ClientIP=会话保持
  sessionAffinity: None
  # 内部负载均衡由 kube-proxy 实现（iptables/ipvs 随机分发）
```
> 默认不写`sessionAffinity: None`，也会进行轮询，因为ClusterIP方式默认自带的就是`None轮询`；如果是使用会话保持，这个是需要加此配置的：`sessionAffinity: ClientIP`。

> ⚠：如果pod服务指定了`hostNetwork: true`，需要加上`dnsPolicy: ClusterFirstWithHostNet`，否则无法解析集群 DNS，那么根据域名就找不到此服务进行负载；


* 创建并运行svc

```bash
# 创建并运行svc
kubectl apply -f nginx-svc.yaml
# 检查svc运行是否正常
kubectl get svc -n nginx
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211409868.png)

* 使用`dns域名`或`svc ip`进行测试
> 注意：
> 使用的`ClusterIP`模式，仅支持`k8s集群內部`访问；
> 使用dns访问需提前安装`CoreDNS`，如果没有安装，可参考：[K8S 部署 CoreDNS 之 DNS 域名获取](https://liucy.blog.csdn.net/article/details/157694074)

先查看后端`Pod IP:Port` 列表，对比`ENDPOINTS`和`pod 的ip`是否一致，如果少一个、多个或没有则是Service selector 标签不匹配，或Pod未就绪问题；
```bash
kubectl get endpoints -n nginx nginx-service
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211409223.png)


进入任意一个pod，执行如下命令：

```bash
# svc ip方式
kubectl exec -n nginx nginx-daemonset-5chs6 -- sh -c 'curl -s http://10.0.0.6'

# 域名方式
kubectl exec -n nginx nginx-daemonset-5chs6 -- sh -c 'curl -s http://nginx-service.nginx.svc.cluster.local'
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211409036.png)

或可以使用脚本来循环跑一下，看看走的哪个节点的nginx

```bash
# svc ip方式
for i in {1..10}; do
  kubectl exec -n nginx nginx-daemonset-5chs6 -- sh -c 'curl -s http://10.0.0.6'
done

# 域名方式
for i in {1..10}; do
  kubectl exec -n nginx nginx-daemonset-5chs6 -- sh -c 'curl -s http://nginx-service.nginx.svc.cluster.local'
done
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211409243.png)

这样就可以清晰的看到请求到哪个节点上了；

### 2.2 NodePort 方式进行负载 
> 适用场景： 需要从集群外部访问

* 创建svc，`vim nginx-svc.yaml`
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  namespace: nginx
spec:
  type: NodePort
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      # 端口需在30000-32767
      nodePort: 30800
  selector:
    app: nginx              # 匹配 DaemonSet 的 Pod 标签
  externalTrafficPolicy: Cluster
  # Cluster: 全集群负载均衡（可能跨节点转发）
  # Local: 仅转发到本节点 Pod（性能更好，但可能不均）
```
> 默认不写`externalTrafficPolicy: Cluster`，也会进行轮询，因为NodePort方式默认自带的就是Cluster轮询；如果是使用本节点转发，这个是需要加此配置的：`externalTrafficPolicy: Local`。

* 创建并运行svc

```bash
# 创建并运行svc
kubectl apply -f nginx-svc.yaml
# 检查svc运行是否正常
kubectl get svc -n nginx
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211409264.png)

* 访问ip端口进行测试（页面或服务器访问测试都行）


```bash
for i in {1..10}; do
  kubectl exec -n nginx nginx-daemonset-lbx9p -- sh -c 'curl -s 172.16.11.230:30800'
done
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211409561.png)

这样就可以清晰的看到请求到哪个节点上了；

#### 2.2.1 externalTrafficPolicy 对比

| 策略          | 流量分配         | 源 IP 保留    | 适用场景              |
| ----------- | ------------ | ---------- | ----------------- |
| **Cluster** | 全集群 Pod 均匀分配 | ❌ SNAT 后丢失 | 需要均匀负载均衡          |
| **Local**   | 仅本节点 Pod     | ✅ 保留真实 IP  | 需要获取客户端 IP，接收可能不均 |

## 三、按 Ingress 方式进行负载
> 前提：需部署`Ingress Controller`，如果没部署的，可参考：[K8s 之 Ingress 及 Ingress Controller](https://liucy.blog.csdn.net/article/details/160253160)


> 适用场景：
> * 基于域名/路径路由
> * 需要 SSL 终止、限流、重写等高级功能

### 3.1 编写 Ingress 规则
* `vi nginx-ingress.yaml`
```bash
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx
  namespace: nginx
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
            name: nginx-service   # 指向你的后端 Service
            port:
              number: 80		# Service 的端口
```
### 3.2 编写 nginx svc
* `vi nginx-svc.yaml`
```bash
apiVersion: v1
kind: Service
metadata:
  name: nginx-service        # ← Ingress 里写的名字
  namespace: nginx        # ← 必须和 Ingress 同一命名空间
spec:
  selector:
    app: nginx              # ← 匹配 Deployment 的 Pod 标签
  ports:
  - port: 80                # ← Ingress 里写的端口
    targetPort: 80          # ← 容器实际端口（对应 containerPort）
```
### 3.3 创建 Ingress 规则和 svc

```bash
kubectl apply -f nginx-ingress.yaml
kubectl apply -f nginx-svc.yaml
```
### 3.4 检查 pod 和 svc是否创建成功

```bash
# 查看nginx daemonset状态
kubectl get ds -n nginx
# 查看nginx pod的状态
kubectl get pods -n nginx 
# 查看nginx service的状态
kubectl get svc -n nginx
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211409680.png)
### 3.5 检验是否负载成功
#### 3.5.1 页面访问
> 使用节点任意IP+`ingress-nginx-controller`访问端口访问页面：`http://172.16.11.230:32465`、`https://172.16.11.231:32483`，可以访问到`This is k8s-master`这种就算成功，访问不止有`This is k8s-master`算是负载成功；

#### 3.5.2 脚本测试负载

```bash
# 本机测试
for i in {1..10};do curl 127.0.0.1:32465; done

# 集群任意IP访问测试
for i in {1..10};do curl 172.16.11.230:32465; done

# 集群任意IP访问测试 - https
for i in {1..10};do curl -k https://172.16.11.230:32483; done
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202605211409830.png)


## 四、LoadBalancer + 云厂商 LB
> 由于没有云服务器测试条件，暂无法进行测试，如果有测试过的，可分享出来，我将添加到其中，同时也感谢您的支持！！！




## 五、三种负载均衡方式的对比总结表

| 方式 | 访问范围 | 端口范围 | 适用场景 | 是否需Controller |
|------|---------|---------|---------|-----------------|
| **ClusterIP** | 集群内部 | 任意 | 服务间调用 | 否 |
| **NodePort** | 外部访问 | 30000-32767 | 测试/小规模暴露 | 否 |
| **Ingress** | 外部访问 | 80/443（通过Controller） | 生产环境、域名路由 | 是（需部署） |
