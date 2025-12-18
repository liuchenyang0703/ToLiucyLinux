---
title: Kubernetes部署Dashboard服务
icon: circle-info
order: 1
category:
  - Linux
  - kubernetes
tag:
  - Linux
  - kubernetes
  - Dashboard
  - 运维
pageview: false
date: 2025-11-11
comment: false
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

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180944136.png)
## 一、Dashboard 简介

Dashboard 是基于网页的 Kubernetes 用户界面。 你可以使用 Dashboard 将容器应用部署到 Kubernetes 集群中，也可以对容器应用排错，还能管理集群资源。 你可以使用 Dashboard 获取运行在集群中的应用的概览信息，也可以创建或者修改 Kubernetes 资源 （如 Deployment、Job、DaemonSet 等等）。 例如，你可以对 Deployment 实现弹性伸缩、发起滚动升级、重启 Pod 或者使用向导创建新的应用。

Dashboard 同时展示了 Kubernetes 集群中的资源状态信息和所有报错信息。

## 二、Dashboard与Kubernetes版本对照表

| Kubernetes | Dashboard 最低可用 | Dashboard 推荐/实测版本 | 完全支持 | 备注                             |
| ---------- | -------------- | ----------------- | ---- | ------------------------------ |
| 1.18       | v2.0.0         | v2.0.0            | ✅    |                                |
| 1.19       | v2.0.4         | v2.4.0            | ✅    |                                |
| 1.20       | v2.4.0         | v2.4.0            | ✅    |                                |
| 1.21       | v2.4.0         | v2.4.0            | ✅    |                                |
| 1.22       | v2.5.0         | v2.7.0            | ⚠️   | 功能完整，但标记“部分功能不可用”              |
| 1.23       | v2.5.0         | v2.7.0            | ⚠️   | 同上                             |
| 1.24       | v2.6.0         | v2.7.0            | ⚠️   | 同上                             |
| 1.25       | v2.7.0         | v2.7.0            | ✅    | 官方勾选“完全支持”                     |
| 1.26       | v2.7.0         | v3.0.0-alpha0     | ✅    | 可用，但 3.0.0 开始仅提供 Helm 安装       |
| 1.27       | v3.0.0         | v3.0.0            | ✅    | 需 Helm 安装，YAML 方式已废弃           |
| 1.28-1.31  | v3.1.0+        | v3.1.0 / 7.5.0+   | ✅    | 仅 Helm 提供；7.x 为 Helm chart 版本号 |

> 说明  
> 1. “⚠️”表示官方 release 注记里打 **问号**（功能可用但未全量测试）。  
> 2. 从 kubernetes**1.27 版本起** 官方只维护 **Helm 安装方式**；直接 apply YAML 需自行拉取镜像并处理证书。  
> 3. 若集群版本 ≥ 1.27，请使用 **Helm** 安装：
```bash
helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
helm install kubernetes-dashboard kubernetes-dashboard/kubernetes-dashboard \
  --create-namespace --namespace kubernetes-dashboard
```

---

这里我们的kubernetes版本是1.20.10，那么就按照2.4.0版本的Dashboard;

各版本下载连接：（下载其他版本时把v2.4.0改成需要啊下载的版本号即可）
[https://raw.githubusercontent.com/kubernetes/dashboard/v2.4.0/aio/deploy/recommended.yaml](https://raw.githubusercontent.com/kubernetes/dashboard/v2.4.0/aio/deploy/recommended.yaml)

---
## 三、部署Dashboard

```bash
# 下载yaml文件
curl -O https://raw.githubusercontent.com/kubernetes/dashboard/v2.4.0/aio/deploy/recommended.yaml

# 创建并启动Dashboard服务
kubectl apply -f recommended.yaml

#查看部署情况
[root@k8s-master packages]# kubectl get pods,svc -n kubernetes-dashboard
NAME                                             READY   STATUS    RESTARTS   AGE
pod/dashboard-metrics-scraper-5b8896d7fc-2mnw5   1/1     Running   0          20m
pod/kubernetes-dashboard-897c7599f-rbd67         1/1     Running   0          20m

NAME                                TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)    AGE
service/dashboard-metrics-scraper   ClusterIP   10.0.0.161   <none>        8000/TCP   20m
service/kubernetes-dashboard        ClusterIP   10.0.0.152   <none>        443/TCP    20m
```

pod的状态都为`Running`正常，然后需要配置远程访问才可以进行访问；
## 四、开启远程访问
dashboard `service`默认为ClusterIP，而ClusterIP只用于集群内部通信，外部是无法访问的，所以需要配置为`NodePort`，外部才能访问。

```bash
[root@k8s-master packages]# kubectl edit service  kubernetes-dashboard -n kubernetes-dashboard
service/kubernetes-dashboard edited
[root@k8s-master packages]# kubectl get svc -n kubernetes-dashboard 
NAME                        TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)         AGE
dashboard-metrics-scraper   ClusterIP   10.0.0.161   <none>        8000/TCP        25m
kubernetes-dashboard        NodePort    10.0.0.152   <none>        443:32570/TCP   25m
```

修改完之后再次查看service就会看到类型已经变成了`NodePort`，而且端口也多出来了一个，后面就是对外访问的服务端口，我们可以通过：`节点IP:32570`去访问到dashboard页面服务了；dashboard需要使用https访问，自带的证书在最新的`chrome、edge`浏览器中不受信，且界面无法手动进行确认继续。使用`firefox`访问可以在界面操作确认继续。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180944154.png)



> 提示：<br>
> 在较新版本的 `Chrome`或`Edge` 中访问一些未受信任的 HTTPS 页面时，会提示类似 `NET::ERR_CERT_INVALID `的错误。以往旧版本中，我们可以选择跳过得以继续访问，但是新版本的 Chrome 中并不允许继续。当出现 "您的连接不是私密" 页面时，点击高级后，并直接输入 thisisunsafe 关键字并回车。


访问地址: `https://节点IP:32570`

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180944193.png)
## 五、配置访问认证
> dashboard 支持`Token`和`Kubeconfig`两种认证方式进行登录。

### 5.1 Token认证
创建Service Account 及 ClusterRoleBinding，创建`dashboard-token.yaml`文件，内容如下：

```bash
apiVersion: v1
kind: ServiceAccount
metadata:
  name: kubernetes-admin
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: kubernetes-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: kubernetes-admin
  namespace: kubernetes-dashboard
```
创建对应的资源：`kubectl apply -f dashboard-token.yaml`

获取访问所需要的Token：

```bash
[root@k8s-master packages]# kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep kubernetes-admin | awk '{print $1}')
Name:         kubernetes-admin-token-nz8hx
Namespace:    kubernetes-dashboard
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: kubernetes-admin
              kubernetes.io/service-account.uid: 4411fd73-48b2-4913-b196-eba9cc98101e

Type:  kubernetes.io/service-account-token

Data
====
ca.crt:     1359 bytes
namespace:  20 bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhNXdYNWUwdDNJeThDWVVsU3p4WlFIeF9SLTloY1dJS3NtSEtnSG9kVFkifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJlcm5ldGVzLWFkbWluLXRva2VuLW56OGh4Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6Imt1YmVybmV0ZXMtYWRtaW4iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI0NDExZmQ3My00OGIyLTQ5MTMtYjE5Ni1lYmE5Y2M5ODEwMWUiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXJuZXRlcy1kYXNoYm9hcmQ6a3ViZXJuZXRlcy1hZG1pbiJ9.LpJhqF6JPF-HckV7Xe_1LnaP6Xx7a66uAE4voQ_yix_y_Urkt3fhmdR4TceoAdF0u2EX86oNcA5eVaP0HiUPtIpUGcfvSyoqeCXLWP7dmUtU8ZjW8gMw_RJp-PsAaS-CROEj59_TRtMMOC9IhcdCw59FipLYkB6kOjcKdDf_0m5qhiFC11COoxlsxBNZ_2dh0YSSNiOV0d7s6RerX-1JLWL-CoxC7BPsye2OATKYxj68ulN87nseRX6ONdlRRCbbfOXSYj1O34AXFz_-nS83rSorJ4N-ZXfQ05BBvOw5bZ3vk6xR8s5Ki6X3IGkfkDwV8Dik6KflIl8WS8HiLJtnPw
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180944453.png)

### 5.2 kubeconfig认证

如果是使用kubeadmin部署的集群，默认会在下面路径生成一个kubeconfig文件：`/etc/kubernetes/admin.conf`，下载该文件并编辑，在该文件将上面的toekn加入文件末尾。



```bash
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUMvakNDQWVhZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRJME1EWXhNVEUwTURJd00xb1hEVE0wTURZd09URTBNREl3TTFvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBT2RUCjFSU3FmM3JyY1V3WkRsUk5OS05vVlZEelEzNlp4OUovckNSYzR1V3Qzd0YxTitsbFlIaVA2VHdoL0s2UGd0aUEKaHBYeDdWaGRYWElKdHhVd3F2OW8vTnArdUpoOHV2eFdyY25JRDNycFJzWXFvM1ZZSlhnTEtuS1o0bkpRREZzUApCQVZQcUJvS3RhYm9qV0pjU2tTc09VVXM5TFV0VnV3aEZUdmR0ZnJ1TVNMczFjOE1naTlGWlNkTUg3UHN0NzczCkNtUFhvb0k4dlRQSWwwU0dSTU1sSGtIaGJaUDJRVU0rZ1hzUlBRdWt3NFZ4MS9aQ29lZlhjRUE2czJUQmR3MXAKMlhpN2JpdWFKei80Qm1aYWVoQk5LZE1iR1ZMR1NhL1FwRjVDOXUwdnVybEdFZWw5eldoYnFLRFVzenN3dzZxUwpId2V6MXl0UWZpYTEyK2R0V1NNQ0F3RUFBYU5aTUZjd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZNQU1CQWY4d0hRWURWUjBPQkJZRUZQZno5VzJ5UWJaZTAwT3M0ckNSbkc0c3dSV1VNQlVHQTFVZEVRUU8KTUF5Q0NtdDFZbVZ5Ym1WMFpYTXdEUVlKS29aSWh2Y05BUUVMQlFBRGdnRUJBR0w1eE1mcU5INDdERGh3Uzd0bApTMWoxZ3hKWWxDclk4M09acTF3bUF0aFlqR2wwN1FJVDJ6NGszVXlMOU5MZzBJWmlIMy93eElsVnc5V0hJYVFRCmwzK0dwMi9Fc0VuWURlWWt0Z2VySDk3M2xGWGsySEJSOWhxemRiNlNnbVd5cWRGdWpvMisrM3Vzb1dxOHJ0eHAKMUdZNU5aakxiQnA0aWs0UVYvSFYvNFRJNzF6VmYyTzd1VG5JMEZ6VlUzR214MmhDSVRzdHRFa0VVd2NCaHRhYgphUWF3NzNiZjU3MEp2bWJXSlF6dnZkMmFVQWk5MUtxQzhEUUFLMk00QUk5NDRsU2xsQlZDeXpQZUdiNnEwc3ZxCmtBaVpVZzFHYSt6d1NLdVhTdmRESm1uQ3psYnE2V2I5N29UdkVaTDJnMlJwMW5Ua1hTSU10Nk41bU1TNXVrYVMKbWVzPQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==
    server: https://172.16.11.230:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
current-context: kubernetes-admin@kubernetes
kind: Config
preferences: {}
users:
- name: kubernetes-admin
  user:
    client-certificate-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURJVENDQWdtZ0F3SUJBZ0lJWiszaHUzTDI2aGN3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TkRBMk1URXhOREF5TUROYUZ3MHlOVEEyTVRVd09EVTBNRFphTURReApGekFWQmdOVkJBb1REbk41YzNSbGJUcHRZWE4wWlhKek1Sa3dGd1lEVlFRREV4QnJkV0psY201bGRHVnpMV0ZrCmJXbHVNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQTJ5amFFSi9kSTlDcUhuL2cKWm5CZXhOTG1NTmJRNWltd1pBSnBCTzFyT3A3ZE1JN2ZXZUlvRnN4SlpDUFpodU5SSFhhK29XYjQvM0hYMGl6QgpadGVSeEJUS1F2UkxkT0x5Qnk3SXUyS0JISmJNLzA0bE16cXBlVlVycll4YmkxZjJ1YXZaUXllZjJ1S3g2b1FPCjJPTTZ6RmMwbHNuSFhjYnpOamtWc0wzdElFZXBiVDJsNlFRVDlwOEI5OWs2alBCNDgwOGVPVGRDMEpSK25rTEEKRnhhN05qK2VBU3ZaTTQwbm5qK3BRdUVBWS9SZWF6UU1sTGhRN3hVV1p4WWtJQXZ6eU51Z1ZsazR3VjVrUk1maAplODZjaERKQ05ITERqR1FDdVR0QmluY3c2QWt1RWtMRmk5cnBLL2hrYVZQdFVaekxBNjFFdnZjUzZVVGNLS1BqCnNWT3AzUUlEQVFBQm8xWXdWREFPQmdOVkhROEJBZjhFQkFNQ0JhQXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUgKQXdJd0RBWURWUjBUQVFIL0JBSXdBREFmQmdOVkhTTUVHREFXZ0JUMzgvVnRza0cyWHRORHJPS3drWnh1TE1FVgpsREFOQmdrcWhraUc5dzBCQVFzRkFBT0NBUUVBbTExNU00NGZYVjRrV0ExdEMxUE9qZWdMbnUvT1EzYVpLZmdPCkoraGpWRWdOaFUzSHgvaExDcGE4eS8zNkIvU3Fud0ZXRE0xaXpWSlhBZndDQWVZaGZIYUZmWjlHL1pFRW9PTmUKajkrZEVWMEo0KzFRWEZzNEFtUGY3bUhJbTV2b0VmSkVRL3dleWt4QTl4cmh2WUprMHhQWWdpSTFUMWJIWkVLZAo5Zjk0ZFNTdTZ4MGUrUTZwK3RwMDFId1ZQR2pEL21XTG5GSHZNOHA4ZS82cWV6VHR3QzB3RlNGb2hBMVdza2hZClVEZGJXTFlFcEN1UkZoUTFuc0V0Z1g3bDkvRndwNG41bmR0Z0JCMzVjU2FrVU9OVkYwbUpCbFpKTVZaM0VqVXoKTzRxVmFTMXlUNXlOOStDUU1tRHd4QUlNRDZPQjJGSG9ac1FaQ0tJdnZ1Mzc5ZzFMM1E9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==
    client-key-data: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb3dJQkFBS0NBUUVBMnlqYUVKL2RJOUNxSG4vZ1puQmV4TkxtTU5iUTVpbXdaQUpwQk8xck9wN2RNSTdmCldlSW9Gc3hKWkNQWmh1TlJIWGErb1diNC8zSFgwaXpCWnRlUnhCVEtRdlJMZE9MeUJ5N0l1MktCSEpiTS8wNGwKTXpxcGVWVXJyWXhiaTFmMnVhdlpReWVmMnVLeDZvUU8yT002ekZjMGxzbkhYY2J6TmprVnNMM3RJRWVwYlQybAo2UVFUOXA4Qjk5azZqUEI0ODA4ZU9UZEMwSlIrbmtMQUZ4YTdOaitlQVN2Wk00MG5uaitwUXVFQVkvUmVhelFNCmxMaFE3eFVXWnhZa0lBdnp5TnVnVmxrNHdWNWtSTWZoZTg2Y2hESkNOSExEakdRQ3VUdEJpbmN3NkFrdUVrTEYKaTlycEsvaGthVlB0VVp6TEE2MUV2dmNTNlVUY0tLUGpzVk9wM1FJREFRQUJBb0lCQUNiTFgzYUw1ZWhlR284VgprZEp3VjhZOWt2UFlRdGhMVHVjVktpUHVKd29VYnhFV2FXRU8wSXZnazZrL1UxVTJUZmlLT1lwMm9PTU84dVpJCmQ5L05qd2NIcXhvWkJuWmxhZlJ0aXFqbzhmUHVtZEVqc3lBVFpVYU9GaEk5ZzBMeVNrRnBzeWJaRDhuK1VRSXoKYURGcVg5RW1LcS82ZmVrU3U2REFrQjllTDJpRUV4SmRrL0FVRlJqRVdybkpsb1Z6Tkp6endyaVBNcUMwSlV3eAovUTh4Qjdwc3FQYWpGQzdNL0VNQ0VjeTBQcnpIamk4d1dHUUZjNGdub0FZY1VDdmFhZzdsMjExS3VSZk9YL2Z5CmpWS3Q3Z1RDR0plbXYwMkFobG1laWVlS2kyQjg4Y0dsMmhPVFNqVE1kRnBkVUh1RTJubTNSWXZXcDFVdWliclIKUlpXQlcwRUNnWUVBNlNuSTZwUlNyYWdicjJoQTlvdytJTHhkWkNVWk53YnY3RFdBbkZWU3hGWHYwNmtMTDJ3SwpmREkraWgrMTJ6M2twQXdLVzE5MkdtUXBpelhuRXhzYlRheTNJbGxCZEwvcG9UNXV5QjZnd3hwM1N2U2pNRWZ4CjMwKzZ3U2NtM1MwWU5JM2R5Q3dtbTljeFdpdFlsTm51S0dVQ3hZdFo5ZHBid2pMYjJFYThPeTBDZ1lFQThKL3kKWC9zVUEzTVhHRUd3N2dkU28ycHJILy9SUlVaSVdvY2piWUJFdWpuVVJjSS9SakYrckpITVJuZEQzMTlBdDdxMQpHV0RwS1FZMGowZkY2U1AwRWp0Tm1PZzh6c2pvOHlzREUyRHliZWkrN2g1N2FabG9hUGJkczRQOE5aQllRK1JsCkZZY2hTODU4SG5Xa2JVSWoyd2hmY09aVW1PeWZCalBFakpSdWwzRUNnWUFCOGpKV0d1VFJ4RHh1NjF6WGNmWTIKeWJ1eDBVbHpseUE3aFhyTVV6MzhtNGNENmo1SXFBc3lYQ3ovZENKTmNTZk9ZcmRYYWVXUGROU1A3K1E4MlpZUgp3T1pLYUJwT3dpZE9ERHBhZXo3MlFldEsrZDIrMG1yblpULzJ5ci9kU3JvUC9qc2lwNU91NjAzakpjZDRmcFVwClN5YUp4WTc3cVZYb3Vnbnh0UzF2QlFLQmdCYk1BSW1KWHhjSWsxcVA5clJHYTFUaUl5NFA3WUt6cXUwd3VuR0kKWW5xR09nODEzUXJJYTZqcjB6K2wwdjlacGVjQ1FHQWNKMXJrcEp3aWY2U2I3R2JCeVpOQUJXck43QXdGdWkvZQowbmtKUVBXTVc4TGdidHpxN293d1ovZW5La1djWU50T1J5Qkllc2ZqKzJVQ2pDVVhRUHVRUnRtS0tYTEwrc1lhCjFmTnhBb0dCQUoyTy9MUWZiQWt0ZlI5U2ZpQ3NhcTJKWVduWWhnNU1NVzB2YzlBeUxEdnpQeGNXUHhveVRWREgKK0lmWllhckNkdElTUzZ2NjFYamZva1VFMjhqS1N2dlVtcnhhbkp0RzZudTFTQldzczc1OXhMdlZ3Wi9zS2haaQpwcUZoRURxRXdoejVIem9TbkM2WHFtVEh2V2hPaHdsb21kM2lTY1hVWFlhSnVDMHp5N0JjCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg==
    token: eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhNXdYNWUwdDNJeThDWVVsU3p4WlFIeF9SLTloY1dJS3NtSEtnSG9kVFkifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJlcm5ldGVzLWFkbWluLXRva2VuLW56OGh4Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6Imt1YmVybmV0ZXMtYWRtaW4iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI0NDExZmQ3My00OGIyLTQ5MTMtYjE5Ni1lYmE5Y2M5ODEwMWUiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXJuZXRlcy1kYXNoYm9hcmQ6a3ViZXJuZXRlcy1hZG1pbiJ9.LpJhqF6JPF-HckV7Xe_1LnaP6Xx7a66uAE4voQ_yix_y_Urkt3fhmdR4TceoAdF0u2EX86oNcA5eVaP0HiUPtIpUGcfvSyoqeCXLWP7dmUtU8ZjW8gMw_RJp-PsAaS-CROEj59_TRtMMOC9IhcdCw59FipLYkB6kOjcKdDf_0m5qhiFC11COoxlsxBNZ_2dh0YSSNiOV0d7s6RerX-1JLWL-CoxC7BPsye2OATKYxj68ulN87nseRX6ONdlRRCbbfOXSYj1O34AXFz_-nS83rSorJ4N-ZXfQ05BBvOw5bZ3vk6xR8s5Ki6X3IGkfkDwV8Dik6KflIl8WS8HiLJtnPw
```
然后登录dashboard选择下载的kubeconfig文件即可进行登录。

---


### 5.3 这里我们使用token认证来登录

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180944063.png)

登陆进来是这样的；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180944703.png)

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180944701.png)

登录上来之后就可以进行想要的操作了；

---


> 参考文章：[https://www.cnblogs.com/lldhsds/p/18249869](https://www.cnblogs.com/lldhsds/p/18249869)
