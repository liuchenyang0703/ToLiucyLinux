---
title: 【云原生-K8s-1】kubeadm搭建k8s集群(一主两从)完整教程及kubernetes简介
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


## Kubernetes简介
>&emsp;&emsp;Kubernetes(简称:k8s) 是Google在2014年6月开源的一个容器集群管理系统，使用Go语言开发，用于管理云平台中多个主机上的容器化的应用，Kubernetes的目标是让部署容器化的应用简单并且高效,Kubernetes提供了资源调度、部署管理、服务发现、扩容缩容、监控，维护等一整套功能。

官网地址: [https://kubernetes.io](https://kubernetes.io)

### 1 kubernetes架构
>&emsp;&emsp;Kubernetes具有去中心化的架构，不会线性处理任务。它基于声明性模型运行并实现"所需状态"的概念。下面这些步骤说明了Kubernetes的基本过程:
>- 管理员创建应用程序的所需状态并将其放入清单文件manifest.yml中。
>- 使用CLI或提供的用户界面将清单文件提供给Kubernetes API Server。 Kubernetes的默认命令行工具称为kubectl。
>- Kubernetes将清单文件（描述了应用程序的期望状态）存储在称为键值存储（etcd）的数据库中。
>- Kubernetes随后在集群内的所有相关应用程序上实现所需的状态。
>- Kubernetes持续监控集群的元素，以确保应用程序的当前状态不会与所需状态有所不同。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161420964.png)

#### 1.1master节点
>&emsp;&emsp;k8s集群的管理节点，负责管理集群，提供集群的资源数据访问入口。拥有Etcd存储服务（可选），运行Api Server进程，Controller Manager服务进程及Scheduler服务进程，关联工作节点Node。
>- API Server 
>
>提供了资源对象的唯一操作入口，其他所有组件都必须通过它提供的API来操作资源数据，只有API Server与存储通信，其他模块通过API Server访问集群状态。
>- Scheduler
>
>新建立的Pod进行节点(node)选择(即分配机器)，负责集群的资源调度。组件抽离，可以方便替换成其他调度器。
>- Controller
>
>负责执行各种控制器，目前已经提供了很多控制器来保证Kubernetes的正常运行。
>- Cluster state store
>
>Kubernetes默认使用etcd作为集群整体存储，当然也可以使用其它的技术。etcd是一个简单的、分布式的、一致的key-value存储，主要被用来共享配置和服务发现。etcd提供了一个CRUD操作的REST API，以及提供了作为注册的接口，以监控指定的Node。集群的所有状态都存储在etcd实例中，并具有监控的能力，因此当etcd中的信息发生变化时，就能够快速的通知集群中相关的组件。

|控制器	| 说明 |
|------|--|
|Replication Controller	|管理维护Replication Controller，关联Replication Controller和Pod，保证Replication Controller定义的副本数
|Node Controller	|管理维护Node，定期检查Node的健康状态，标识出(失效\|未失效)的Node节点。
|Namespace Controller|	管理维护Namespace，定期清理无效的Namespace，包括Namesapce下的API对象，比如Pod、Service等。
|Service Controller	|管理维护Service，提供负载以及服务代理。
|EndPoints Controller	|管理维护Endpoints，关联Service和Pod，创建Endpoints为Service的后端，当Pod发生变化时，实时更新Endpoints。
|Service Account Controller	|管理维护Service Account，为每个Namespace创建默认的Service Account，同时为Service Account创建Service Account Secret。
|Persistent Volume Controller	|管理维护Persistent Volume和Persistent Volume Claim，为新的Persistent Volume Claim分配Persistent Volume进行绑定，为释放的Persistent Volume执行清理回收。
|DaemonSet Controller	|管理维护Daemon Set，负责创建Daemon Pod，保证指定的Node上正常的运行Daemon Pod。
|Deployment Controller	|管理维护Deployment，关联Deployment和Replication Controller，保证运行指定数量的Pod。当Deployment更新时，控制实现Replication Controller和Pod的更新。
|Job Controller	|管理维护Job，为Jod创建一次性任务Pod，保证完成Job指定完成的任务数目
|Pod Autoscaler Controller	|实现Pod的自动伸缩，定时获取监控数据，进行策略匹配，当满足条件时执行Pod的伸缩动作。


#### 1.2 Node节点
>&emsp;&emsp;Node节点是工作节点监听API Server发送过来的新的工作分配；他们会执行分配给他们的工作，然后将结果报告给Kubernetes主节点。
>- Kubelet 
>
>  负责管控容器，Kubelet会从Kubernetes API Server接收Pod的创建请求，启动和停止容器，监控容器运行状态并汇报给Kubernetes API Server。
>- Container Runtime
>
>每一个Node都会运行一个Container Runtime，其负责下载镜像和运行容器。Kubernetes本身并不提供容器运行时环境，但提供了接口，可以插入所选择的容器运行时环境。kubelet使用Unix socket之上的gRPC框架与容器运行时进行通信，kubelet作为客户端，而CRI shim作为服务器。
>- kube proxy
>
 >基于一种公共访问策略（例如：负载均衡），服务提供了一种访问一群pod的途径。此方式通过创建一个虚拟的IP来实现，客户端能够访问此IP，并能够将服务透明的代理至Pod。每一个Node都会运行一个kube-proxy，kube proxy通过iptables规则引导访问至服务IP，并将重定向至正确的后端应用，通过这种方式kube-proxy提供了一个高可用的负载均衡解决方案。服务发现主要通过DNS实现。
>&emsp;&emsp;在Kubernetes中，kube proxy负责为Pod创建代理服务；引到访问至服务；并实现服务到Pod的路由和转发，以及通过应用的负载均衡。
>- Pod
>
>  运行于Node节点上，若干相关容器的组合。Pod内包含的容器运行在同一宿主机上，使用相同的网络命名空间、IP地址,同一个Pod中，端口不能重复，否则报错，能够通过localhost进行通信。Pod是Kurbernetes进行创建、调度和管理的最小单位，它提供了比容器更高层次的抽象，使得部署和管理更加灵活。一个Pod可以包含一个容器或者多个相关容器。
>&emsp;&emsp;Pod其实有两种类型：普通Pod和静态Pod，后者比较特殊，它并不存在Kubernetes的etcd存储中，而是存放在某个具体的Node上的一个具体文件中，并且只在此Node上启动。普通Pod一旦被创建，就会被放入etcd存储中，随后会被Kubernetes Master调度到摸个具体的Node上进行绑定，随后该Pod被对应的Node上的kubelet进程实例化成一组相关的Docker容器并启动起来。在默认情况下，当Pod里的某个容器停止时，Kubernetes会自动检测到这个问起并且重启这个Pod（重启Pod里的所有容器），如果Pod所在的Node宕机，则会将这个Node上的所有Pod重新调度到其他节点上。

#### 1.3 kubectl
>&emsp;&emsp; 集群管理命令行工具集，通过客户端的kubectl命令集操作，API Server响应对应的命令结果，从而达到对kubernetes集群的管理。

### 2 kubeadm
&emsp;&emsp;Kubeadm是一个工具，它提供了kubeadm init以及kubeadm join这两个命令作为快速创建kubernetes 集群的最佳实践。

&emsp;&emsp;kubeadm通过执行必要的操作来启动和运行一个最小可用的集群。kubeadm只关心启动集群，而不关心其他工作，如部署前的节点准备工作、安装各种Kubernetes Dashboard、监控解决方案以及特定云提供商的插件，这些都不属于kubeadm关注范围。

#### 2.1 kubeadm功能
- kubeadm init 启动/初始化一个 Kubernetes 主节点；
- kubeadm join 启动一个 Kubernetes 工作节点并且将其加入到集群；
- kubeadm upgrade 更新一个 Kubernetes 集群到新版本；
- kubeadm config 如果使用 v1.7.x 或者更低版本的 kubeadm 初始化集群，您需要对集群做一些配置以便使用 kubeadm upgrade 命令；
- kubeadm token 管理 kubeadm join 使用的令牌；
- kubeadm reset 还原 kubeadm init 或者 kubeadm join 对主机所做的任何更改；
- kubeadm version 打印 kubeadm 版本；
- kubeadm alpha 预览一组可用的新功能以便从社区搜集反馈。
	
## Kubernetes集群部署
## 准备工作（所有节点都要做同样的操作）
### 服务器配置
|集群（一主两从）|ip地址|主机名|配置|
|--|--|--|--|
|主|172.16.11.221|k8s-master|2C/2G/50G|
|从|172.16.11.222|k8s-node1|2C/2G/50G|
|从|172.16.11.223|k8s-node2|2C/2G/50G|

### 关闭防火墙
```bash
systemctl stop firewalld && systemctl disable firewalld
```
如果在线上服务器之类的不能关闭防火墙，那就需要开启几个端口；（这里说的是k8所用到的端口）

- master节点:

|规则|端口范围|作用|使用者|
|--|--|--|--|
|TCP|6443*|Kubernetes API server|All|
|TCP|2379-2380|etcd server client API|kube-apiserver, etcd|
|TCP|10250|Kubelet API|Self, Control plane|
|TCP|10251|kube-scheduler|Self|
|TCP|10252|kube-controller-manager|Self|

- node节点：

|规则|端口范围|作用|使用者|
|--|--|--|--|
|TCP|10252|Kubelet API|Self, Control plane|
|TCP|30000-32767|NodePort Services**|All|

### 关闭selinux
临时关闭selinux（沙河）如需永久关闭selinux需要修改为`sed -i 's/^SELINUX=enforcing$/SELINUX=disabled/' /etc/selinux/config`
```bash
#临时关闭selinux
setenforce 0

#永久关闭selinux
sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config
```
### 关闭交换分区
```bash
#临时关闭所有的交换分区
swapoff -a

#永久关闭所有的交换分区
sed -i '/swap/s/^\(.*\)$/#\1/g' /etc/fstab
```



### 修改三台集群的主机名：（每个主机限一条命令）
```bash
[root@k8s-master1 ~]# hostnamectl set-hostname k8s-master
[root@k8s-node1 ~]# hostnamectl set-hostname k8s-node1
[root@k8s-node2 ~]# hostnamectl set-hostname k8s-node2
```

### 所有节点都添加集群ip与主机名到hosts中：
```bash
cat >> /etc/hosts << EOF 
172.16.11.221 k8s-master
172.16.11.222 k8s-node1
172.16.11.223 k8s-node2
EOF
```
<font color=red>注意：ip一定要改成自己的ip，不要直接复制粘贴</font>

### 三台机器进行时间同步
```bash
#安裝同步时间命令
yum install ntpdate -y

#同步时间
ntpdate cn.pool.ntp.org

#设置定时任务每五分钟同步一次时间
echo "*/5 * * * * root /usr/sbin/ntpdate cn.pool.ntp.org &>/dev/null" >> /etc/crontab
```


### 特殊说明:
>如果是克隆虚拟机建议执行<font color=red>rm -rf /etc/udev/*</font> 保证网卡UUID不同


### 三台都安装需要的一些命令：
- 添加centos源并将下载地址更换为阿里云地址

```bash
#添加centos源
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo

#将下载地址更换为阿里云地址
sed -i -e '/mirrors.cloud.aliyuncs.com/d' -e '/mirrors.aliyuncs.com/d' /etc/yum.repos.d/CentOS-Base.repo
```
- 添加epel扩展源

```bash
curl -o /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
```
- 清除缓存

```bash
yum clean all
```
- 重新加载源缓存

```bash
yum makecache
```

- 升级yum并安装一些会用到的命令
```bash
yum -y update && yum -y install lrzsz wget conntrack ipvsadm ipset jq psmisc sysstat curl iptables net-tools libseccomp gcc gcc-c++ yum-utils device-mapper-persistent-data lvm2 bash-completion
```
安装需要一些时间，就等待安装即可；


## 部署 docker（所有节点都需要部署）
```bash
#安装docker所需的依赖包
[root@docker ~]# yum install -y yum-utils device-mapper-persistent-data lvm2	

#添加阿里云的docker镜像地址
[root@docker ~]# sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
&&#或者（二选一即可）
[root@docker ~]# wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d/docker-ce.repo

#更新缓存，只处理新添加的yum源缓存
[root@docker ~]# yum makecache fast

#部署docker，默认安装最新版本
[root@docker ~]# yum install -y docker-ce-20.10.14 docker-ce-cli-20.10.14 containerd.io

#查看安装docker版本
[root@docker ~]# docker --version(或者使用docker version)
Docker version 20.10.14, build a224086

#加载docker配置
[root@docker ~]# systemctl daemon-reload
#启动docker服务
[root@docker ~]# systemctl start docker
#设置docker服务开机自启
[root@docker ~]# systemctl enable docker

#查看docker可以安装的版本，也可以自己安装指定版本，yum -y install docker-ce-19.03.12.el7
[root@docker ~]# yum list docker-ce --showduplicates | sort -r
```

### 给docker添加镜像加速器及cgroup并重启docker服务
```bash
[root@docker ~]# mkdir -p /etc/docker
[root@docker ~]# tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://mrlmpasq.mirror.aliyuncs.com"],
  "exec-opts": ["native.cgroupdriver=systemd"]
}
EOF
#由于新版kubelet建议使用systemd，所以可以把docker的CgroupDriver改成systemd

#重新加载docker配置
[root@docker ~]# systemctl daemon-reload
#重新启动docker服务
[root@docker ~]# systemctl restart docker
```
### docker部署完成

## 部署 kubernetes（所有节点都要部署）

### 配置相关的内核参数
将桥接的IPv4 流量传递到iptables 的链
```bash
[root@docker ~]# cat <<EOF >  /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF

#让其生效
sysctl --system
```


### 添加 k8s yum源
```bash
[root@docker ~]# cat > /etc/yum.repos.d/kubernetes.repo << EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

#重新加载缓存
yum makecache fast
```

### 安装 kubeadm kubelet kubectl
>注：安装这几个版本不要用最新的，容易出问题

```bash
yum install -y kubeadm-1.20.0-0 kubelet-1.20.0-0 kubectl-1.20.0-0

#查看kubeadm版本
kubeadm version
```

- 启动kubelet并设置开机自启

```bash
systemctl enable kubelet && systemctl start kubelet
```

### kubernetes强化tab（安装之后会tab可以补全命令及参数）
- 配置环境

```bash
echo 'source  <(kubectl  completion  bash)' >> ~/.bashrc
```
>1、退出连接，重新连接；
>2、或者`bash`更新环境就可以使用了。

### 查看kubeadm使用的镜像

```bash
kubeadm config images list
```
>可以发现这里都是国外的镜像<br>
k8s.gcr.io/kube-apiserver:v1.20.15
k8s.gcr.io/kube-controller-manager:v1.20.15
k8s.gcr.io/kube-scheduler:v1.20.15
k8s.gcr.io/kube-proxy:v1.20.15
k8s.gcr.io/pause:3.2
k8s.gcr.io/etcd:3.4.13-0
k8s.gcr.io/coredns:1.7.0

- 解决国外镜像不能访问的问题，执行kubeadm.sh脚本，用于拉取镜像/打tag/删除原有镜像；

```bash
wget -O kubeadm.sh https://files.rundreams.net/sh/kubeadm.sh && sh kubeadm.sh
```

等待拉取完成。
>如果感觉拉取比较费劲，可以下载kubeadm所需的镜像和脚本：[kubeadm所需镜像包及脚本v1.20.15版本
](https://download.csdn.net/download/liu_chen_yang/87587297)


拉取完成查看镜像；

```bash
docker images
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161420231.png)


## master节点
### 初始化master节点

如果执行kubeadm init初始化k8s集群失败了，在下一次执行kubeadm init初始化语句之前，可以先执行`kubeadm reset`命令。这个命令的作用是重置节点，大家可以把这个命令理解为：上一次kubeadm init初始化集群操作失败了，该命令清理了之前的失败环境。


此命令只在master节点执行，`172.16.11.221`替换为自己的master节点IP，`172.17.10.1/18`替换为自己的pod网段。
```bash
kubeadm init --kubernetes-version=1.20.15 --apiserver-advertise-address=172.16.11.221 --pod-network-cidr=172.17.10.1/18
```

初始化成功图为下：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161420398.png)

>如遇初始化报错可根据`systemctl status kubelet` 或者 `journalctl -xeu kubelet` 查看报错信息来解。决

- 根据成功提示先执行下面内容
这些是成功图中提示的那些，要给他创建一下
```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

#查看nodes节点
kubectl get nodes

#这个时候master是处于NotReady状态的。
```
### node节点的加入
- 完成之后将刚刚初始化master节点成功后的`kubeadm join信息`复制到其他node节点进行加入。

```bash
node1：
	kubeadm join 172.16.11.221:6443 --token ckgdsy.xa5x21lsjqak2zmr \
    --discovery-token-ca-cert-hash sha256:3bc8dd07b7e88a5f7b0efa81b4ae4918abb440f93f4940c72f9b4a842d6c872b 
node2：
	kubeadm join 172.16.11.221:6443 --token ckgdsy.xa5x21lsjqak2zmr \
    --discovery-token-ca-cert-hash sha256:3bc8dd07b7e88a5f7b0efa81b4ae4918abb440f93f4940c72f9b4a842d6c872b 
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161420434.png)

node节点显示这样就是加载成功；

加载成功之后返回master节点查看集群

```bash
[root@k8s-master ~]# kubectl get nodes
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161420835.png)

现在的集群状态都是`NotReady`表示不可达；这是因为还没有安装网络插件，下面我们来安装一下`网络插件（caclico）`





### 给master节点安装Pod网络插件（calico）
>选择网络插件：[https://kubernetes.io/docs/concepts/cluster-administration/addons/](https://kubernetes.io/docs/concepts/cluster-administration/addons/)
快速开始配置：[https://projectcalico.docs.tigera.io/archive/v3.20/getting-started/clis/calicoctl/install](https://projectcalico.docs.tigera.io/archive/v3.20/getting-started/clis/calicoctl/install)
calico网络插件：[https://docs.projectcalico.org/v3.9/getting-started/kubernetes/](https://docs.projectcalico.org/v3.9/getting-started/kubernetes/)

- 在master节点安装calico
```bash
kubectl apply -f https://docs.projectcalico.org/v3.9/manifests/calico.yaml
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161420304.png)
- 确认一下calico是否安装成功

```bash
kubectl get pods --all-namespaces -w
kubectl get pods -n kube-system -w
```

### 查看节点连接状态
安装完成之后，再次返回master节点查看集群，在主节点执行命令看集群是否成功

```bash
kubectl get nodes
#或者使用加-o wide查看详细
kubectl get nodes -o wide
```
STATUS 状态为`Ready`则连接成功。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161420932.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161420435.png)


## 测试
- 写一个nginx的yaml文件

```bash
cat > pod_nginx_rs.yaml <<EOF
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx
  labels:
    tier: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      tier: frontend
  template:
    metadata:
      name: nginx
      labels:
        tier: frontend
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80
EOF
```

- 根据pod_nginx_rs.yml文件创建pod

```bash
kubectl apply -f pod_nginx_rs.yaml
```
- 查看pod

```bash
#查看所有的pod
kubectl get pods
#查看所有的pod详细信息
kubectl get pods -o wide
#查看所有的pod超级详细信息
kubectl describe pod nginx
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161420100.png)
- 通过rs将pod扩容为5个nginx服务

```bash
#将nginx服务由3个扩容为5个
kubectl scale rs nginx --replicas=5
#查看所有的pod
kubectl get pods -o wide
```
- 光有ReplicaSet是不行的，ReplicaSet不会提供服务的，需要一个Service。将它应用到集群里面去。

```bash
cat > pod_nginx_rs_svc.yaml <<EOF
apiVersion: v1
kind: Service              # 类型是service
metadata:                  
  name: nginx              # 这个service的全局唯一名称
spec:
  type: NodePort
  ports:
    - port: 80             # service提供服务的端口号
      nodePort: 30000      # 想要对外的端口
  selector:
    tier: frontend         # 把拥有{tier:labels}或者{app:labels}这个标签的pod应用到这个服务里面
EOF
```
如果不加`nodePort`也就是不指定nodeport，默认会随机输出端口，可以通过`kubectl get svc`查看；

如果需要修改端口范围，如果是按照我的方式部署的，可在：`vim /etc/kubernetes/manifests/kube-apiserver.yaml` 的第17行进行修改，默认范围是30000-32767。
- 根据 pod_nginx_rs_svc.yml 文件创建services，需对外访问

```bash
kubectl apply -f pod_nginx_rs_svc.yaml
```

- 查看services

```bash
kubectl get svc
kubectl get services
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161420085.png)


>kubectl get svc 中的 type 。
>- Cluster IP 为服务器内部使用
>- Node Port 为服务器内部外部都可以使用，可以指定端口也可以随机端口。

- 启动services之后，查看端口

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161420877.png)

端口为30000，页面访问，<font color=red>节点的ip+30000;</font>

><font color=red>节点的ip可以为主节点的ip，也可以为从节点的ip。</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161419732.png)



- 删除serviecs和pod

```bash
#删除serviecs
kubectl delete -f pod_nginx_rs_svc.yaml

#删除pod
kubectl delete -f pod_nginx_rs.yaml
```
## 完结⭕
内容主要参考与：[【云原生-K8s】kubeadm搭建k8s集群【不成功手把手教学】
](https://blog.csdn.net/u010800804/article/details/124524688?app_version=5.15.0&csdn_share_tail=%7B%22type%22:%22blog%22,%22rType%22:%22article%22,%22rId%22:%22124524688%22,%22source%22:%22liu_chen_yang%22%7D&utm_source=app)
感谢大家的观看！！！
