---
title: 【云原生-k8s】kubectl top pod 报错_error_ Metrics API not available
icon: circle-info
order: 1
category:
  - Linux
  - kubernetes
  - Docker
tag:
  - Linux
  - kubernetes
  - Docker
  - 运维
pageview: false
date: 2024-12-16
comment: false
breadcrumb: false
---

>🍁**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>


## 报错详情
>查看k8s中其他节点的cpu，memory的使用率情况
```bash
[root@k8s-master ~]# kubectl top nodes
error: Metrics API not available
```

## 解决方式
### 1、下载 metrics-server-components.yaml

```bash
wget https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml -O metrics-server-components.yaml
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161404720.png)

### 2、将 metrics-server-components.yaml中的 k8s.gcr.io 更改为阿里云镜像地址

```bash
sed -i 's/registry.k8s.io\/metrics-server/registry.cn-hangzhou.aliyuncs.com\/google_containers/g' metrics-server-components.yaml
```

修改完可以看一下，有时候wget拉取的是最新的yaml而镜像源会变，就会修改不成功，导致拉取镜像失败。就比如昨天还是0.6.2今天就变成了0.6.3更新了一个新版本，而且镜像前缀也变了，就拉取不下来，找了半天才找到这个问题。


在140行，更换完之后应该是这样的：

```bash
         image: registry.cn-hangzhou.aliyuncs.com/google_containers/metrics-server:v0.6.3
```

### 3、执行 metrics-server-components.yaml

```bash
kubectl apply -f metrics-server-components.yaml
```

### 4、查看pod

```bash
kubectl get pod -A |grep me
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161404782.png)

发现是0/1，表示未启动。

有可能是镜像没有拉到，可直接下载镜像进行导入：[K8S部署metrics-server-0.6.2镜像文件及yaml文件
](https://download.csdn.net/download/liu_chen_yang/87602850)
也有一种报错如下：

####  4.1 查看 metrics-server-647596b58-fgwzg 日志

```bash
kubectl logs -n kube-system metrics-server-647596b58-fgwzg
kubectl logs -f -n kube-system metrics-server-647596b58-fgwzg
```
- -n 查看最后几行
- -f 持续查看

#### 4.2 发现报错： x509: cannot validate certificate for 172.16.11.223 because it doesn't contain any IP SANs" node="k8s-node2"

```bash
E0320 02:11:51.486654       1 scraper.go:140] "Failed to scrape node" err="Get \"https://172.16.11.221:10250/metrics/resource\": x509: cannot validate certificate for 172.16.11.221 because it doesn't contain any IP SANs" node="k8s-master"
I0320 02:12:00.517727       1 server.go:187] "Failed probe" probe="metric-storage-ready" err="no metrics to serve"
E0320 02:12:06.476898       1 scraper.go:140] "Failed to scrape node" err="Get \"https://172.16.11.222:10250/metrics/resource\": x509: cannot validate certificate for 172.16.11.222 because it doesn't contain any IP SANs" node="k8s-node1"
E0320 02:12:06.486505       1 scraper.go:140] "Failed to scrape node" err="Get \"https://172.16.11.223:10250/metrics/resource\": x509: cannot validate certificate for 172.16.11.223 because it doesn't contain any IP SANs" node="k8s-node2"
```

#### 4.3 需要修改 metrics-server-components.yaml 配置忽略CA验证
大概在140行。
```bash
vim metrics-server-components.yaml

 spec:
      containers:
      - args:
        - --cert-dir=/tmp
        - --secure-port=4443
        - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
        - --kubelet-use-node-status-port
        - --metric-resolution=15s
        - --kubelet-insecure-tls                   ###新增--kubelet-insecure-tls 就不会去验证Kubelets提供的服务证书的CA
```
#### 4.4 修改完之后重新应用 metrics-server-components.yaml

```bash
kubectl apply -f metrics-server-components.yaml
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161404774.png)

#### 4.5 再次查看pod启动状态

```bash
kubectl get pod -A |grep me
```
发现是1/1，启动成功。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161404774.png)


### 5、验证是否成功

```bash
kubectl top nodes
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161404980.png)

完成。

