---
title: K8s单机架构部署
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

  这是我做了很多遍，参考很多文章得到的，为了便于大家参考和学习，我已经把每一步都整理出来了，步骤和提示都很清晰。
  后续文档有什么问题那个地方写错了，大家都可以提出来。

---


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161422510.png)


## 一、 准备工作

### 1.1 确认环境

```powershell
swapoff -a  //临时关闭swap
setenforce 0 //临时关闭selinux
```
* 永久关闭swap（需要重启服务器）

```bash
vim /etc/fstab
找到带swap的哪一行，注释掉就行；之后重启服务器永久生效。
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161422384.png)


* selinux永久关闭（需要重启服务器）

```bash
vim /etc/selinux/config
将SELINUX=改为disabled
然后重启服务器即可；
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161422269.png)







每台机器的ip和uuid不能一样

```powershell
cat /sys/class/dmi/id/product_uuid        //每台机器的uuid不能相同
ifconfig -a   //ip不能相同
```

### 1.2 开放端口
|协议  | 方向 |端口范围 | 作用 | 使用者|
|--|--|--|--|--|
| TCP |  入站|6443 | Kubernetes API服务器| 所有组件|
| TCP |入站  |2379-2380 | etcd 服务器客户端API| Kube-apiserver,etcd|
|  TCP| 入站 | 10250| Kubelet API|Kubelet自身，控制平面组件 |
| TCP |  入站| 10251|Kube-scheduler	 | Kube-scheduler自身|
|TCP  | 入站 |10252 |Kube-controller-manager	 |Kube-controller-manager自身 |
|TCP  |入站  |	8080 |kubelet |	Kubelet自身 |
| TCP |  入站| 30000-32767|Node Port服务器	 | 所有组件 |




> 端口号一定要安排明白！！！！否者会出现类似dial tcp 10.96.0.1:443: connect: no route to
> host错误，如果测试环境一直弄不好，可以关闭防火墙。ps：及其不建议。

### 1.3 允许iptables检查桥接流量（配置相关的内核参数）

```bash
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
br_netfilter
EOF
```

```bash
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
```

```bash
# 初始化	
sudo sysctl --system
```

### 1.4 添加centos源及扩展源
* 添加centos源并将下载地址更换为阿里云地址

```bash
#添加centos源
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo

#将下载地址更换为阿里云地址
sed -i -e '/mirrors.cloud.aliyuncs.com/d' -e '/mirrors.aliyuncs.com/d' /etc/yum.repos.d/CentOS-Base.repo
```
* 添加epel扩展源

```bash
curl -o /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
```
* 清除缓存

```bash
yum clean all
```
* 重新加载源缓存

```bash
yum makecache
```
* 升级yum并安装一些会用到的命令

```bash
yum -y update && yum -y install lrzsz wget ipvsadm ipset jq psmisc sysstat curl iptables net-tools libseccomp gcc gcc-c++ yum-utils device-mapper-persistent-data lvm2 bash-completion sshpass unzip
```

## 二、部署docker
### 2.1 推荐安装文档及一键安装脚本
>也可以自己安装docker，推荐几个安装地址或文档：
><br>
>| 文章标题|文章链接  |
>|--|--|
>| [【Linux】yum安装docker指定版本](https://blog.csdn.net/liu_chen_yang/article/details/128934060) |  [https://blog.csdn.net/liu_chen_yang/article/details/128934060](https://blog.csdn.net/liu_chen_yang/article/details/128934060)|
>|[linux（centos）中部署docker（步骤超全，含带一些发展史和一些概念）](https://blog.csdn.net/liu_chen_yang/article/details/123842609)|[https://blog.csdn.net/liu_chen_yang/article/details/123842609](https://blog.csdn.net/liu_chen_yang/article/details/123842609)|
>|[docker&&nvidia-docker安装包 【内包含一键安装脚本】](https://download.csdn.net/download/liu_chen_yang/85965917)|[https://download.csdn.net/download/liu_chen_yang/85965917](https://download.csdn.net/download/liu_chen_yang/85965917)|
>|[docker24.0.5离线安装包 （一键部署）【内包含一键安装脚本】](https://download.csdn.net/download/liu_chen_yang/88647183)|[https://download.csdn.net/download/liu_chen_yang/88647183](https://download.csdn.net/download/liu_chen_yang/88647183)|


### 2.2 在线安装docker
在服务器上准备在线镜像源，然后添加docker的镜像源，如果之前安装过需要先卸载。

```perl
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

### 2.3 给docker添加镜像加速器及修改docker组件为systemd

```bash
[root@docker ~]# mkdir -p /etc/docker
[root@docker ~]# tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
	"https://mrlmpasq.mirror.aliyuncs.com",
	"https://docker.m.daocloud.io",
	"https://noohub.ru",
	"https://huecker.io",
	"https://dockerhub.timeweb.cloud"],
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF
#由于新版kubelet建议使用systemd，所以可以把docker的CgroupDriver改成systemd

#重新加载docker配置
[root@docker ~]# systemctl daemon-reload
#重新启动docker服务
[root@docker ~]# systemctl restart docker
```

## 三、安装部署单机 kubernetes
### 3.1 添加 kubernetes 源

```bash
cat <<EOF | sudo tee /etc/yum.repos.d/kubernetes.repo
[kubernetes] 
name=Kubernetes 
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64 
enabled=1 
gpgcheck=0 
repo_gpgcheck=0 
EOF
```
* 重新加载缓存
```bash
yum makecache fast
```

### 3.2 安装必要插件
>`kubelet`和`kubeadm`时会用到`conntrack`依赖；

```bash
yum -y install socat conntrack
```

### 3.3 安装kubeadm、kubelet、kubectl
> 注：安装这几个版本不要用最新的，容易出问题，就用文章中所显示的1.20.0就行；

```bash
# 下载命令
sudo yum install -y kubeadm-1.20.0-0 kubelet-1.20.0-0 kubectl-1.20.0-0

# 设置kubelet开机自启 --now参数意思是，不仅要设置开机自启，也要立即启动该服务
sudo systemctl enable --now kubelet 

# 查看是否安装成功
kubeadm version
kubectl version --client
kubelet --version
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161422059.png)
### 3.4 kubernetes强化tab（安装之后会tab可以补全命令及参数）
* 配置环境

```bash
echo 'source  <(kubectl  completion  bash)' >> ~/.bashrc
```
>1、退出连接，重新连接；
2、或者`bash`更新环境就可以使用了。

### 3.5 k8s拉取镜像

先查看要拉取的镜像

```bash
[root@localhost data]# kubeadm config images list
k8s.gcr.io/kube-apiserver:v1.20.15
k8s.gcr.io/kube-controller-manager:v1.20.15
k8s.gcr.io/kube-scheduler:v1.20.15
k8s.gcr.io/kube-proxy:v1.20.15
k8s.gcr.io/pause:3.2
k8s.gcr.io/etcd:3.4.13-0
k8s.gcr.io/coredns:1.7.0
```

写成脚本，版本根据自己的要求来写

```perl
vim k8s.sh

#!/bin/bash
images=(
    kube-apiserver:v1.20.15
    kube-controller-manager:v1.20.15
    kube-scheduler:v1.20.15
    kube-proxy:v1.20.15
    pause:3.2
    etcd:3.4.13-0
    coredns:1.7.0
)
for imageName in ${images[@]} ; do
	# 拉取镜像
    docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/${imageName}
    # 将镜像名称修改k8s.gcr.io/镜像
    docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/${imageName} k8s.gcr.io/${imageName}
    # 删除原来的镜像
    docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/${imageName}
done

# docker tag  k8s.gcr.io/coredns:v1.7.0 k8s.gcr.io/coredns/coredns:v1.7.0
# docker rmi k8s.gcr.io/coredns:v1.7.0
```

```bash
# 给脚本加权限
chmod -R 777 k8s.sh
# 执行脚本,默默的等待拉取
sh k8s.sh
# 完了看镜像是否拉取成功
docker images
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161422424.png)

>如果感觉拉取比较费劲，可以下载kubeadm所需的镜像和脚本：[kubeadm所需镜像包及脚本v1.20.15版本](https://download.csdn.net/download/liu_chen_yang/87587297)




### 3.6 安装启动
如果执行kubeadm init初始化k8s失败了，在下一次执行kubeadm init初始化语句之前，可以先执行`kubeadm reset`命令。这个命令的作用是重置节点，大家可以把这个命令理解为：上一次kubeadm init初始化集群操作失败了，该命令清理了之前的失败环境。

`172.16.11.214`替换为自己的master节点IP，`172.17.10.1/18`替换为自己的pod网段。

**1.	初始化服务（根据自己的ip和网段和版本来设置）**

```bash
kubeadm init --apiserver-advertise-address=172.16.11.214 --pod-network-cidr=172.17.10.1/18 --kubernetes-version=1.20.15 |tee kubeadmin-init.log
```

出现一下字样就是初始化成功


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161422176.png)

初始化完成查看一下kubelet运行状态

```bash
systemctl status kubelet
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161422020.png)


> 如遇初始化报错可根据`systemctl status kubelet` 或者 `journalctl -xeu kubelet `查看报错信息来解决。


**2.	注意**

---

> 要使非 root 用户可以运行 kubectl，请运行以下命令， 它们也是在执行 `kubeadm init` 输出的一部分：

```perl
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

---
> 或者，如果你是root 用户，则可以运行：

```perl
export KUBECONFIG=/etc/kubernetes/admin.conf
```
> 如果想重新初始化，可执行`kubeadm reset`

也可以直接给它放到环境变量中，以免关闭服务器后重新启动出现访问不到8080端口这个问题和`kubectl get nodes`找不到节点问题。

```bash
vim /etc/profile

#放到最后面
# k8s nodes 配置
export KUBECONFIG=/etc/kubernetes/admin.conf


# 保存退出
# 使其配置文件立即剩下
source /etc/profile
```
---

### 3.7 查看 nodes 节点的状态是否正常

```bash
kubectl get nodes
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161422840.png)

这时候当前节点是处于`NotReady`状态的；表示网络不可达；这是因为还没有安装网络插件，下面我们来安装一下网络插件（flannel）。
网络插件有：`caclico`和`flannel`，安装哪个都可以，下面是这两个网络插件的基础区别，可供参考；
* flannel：配置相对简单，易于部署和管理，特别适合小型或中型集群，或者对网络要求不高的环境。
* caclico：主要针对Kubernetes集群设计，功能强大，但配置可能相对复杂，需要更多的时间来理解和管理。

所以这里单机部署使用`flannel`就行；



### 3.8 安装 flannel（网络插件）

```perl
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

> 如果出现`Connecting to raw.githubusercontent.com refused`，可以执行`vi /etc/hosts`
> 在后面添加 185.199.108.133 raw.githubusercontent.com；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161422887.png)

* 添加完之后再次运行安装命令即可；

```bash
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161422987.png)


> 如果遇到下载`flannel`镜像失败，可使用此链接镜像包：[k8s网络插件 flannel v0.25.5 flannel-cni-plugin-v1.5.1-flannel1 镜像包](https://download.csdn.net/download/liu_chen_yang/89682727)


---
安装完之后可以使用命令验证flannel有没有成功：

```bash
kubectl get pods -ALL
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161422675.png)

发现 `kube-flannel-ds` Pod 处于 <font color=red>CrashLoopBackOff </font>状态时，这通常意味着 Flannel 网络插件无法正常启动。可以查看日志等信息进行排查；

1.检查 Flannel 日志：查看 Flannel Pod 的日志可以提供为什么它无法启动的线索。

```bash
kubectl logs -n kube-flannel kube-flannel-ds-<pod-name>
```
查看到了报错信息如下：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161422277.png)
> 分析日志：<br>
> **主要错误信息**：`Error registering network: failed to acquire lease: subnet "10.244.0.0/16" specified in the flannel net config doesn't contain "172.17.0.0/24" PodCIDR of the "kubernetes" node`<br>
> **错误信息分析**：这表明 Flannel 配置的网络子网 10.244.0.0/16 不包含节点 kubernetes 的 PodCIDR 172.17.0.0/24。这是不兼容的网络配置，需要修正。意思就是和部署k8s的时候网段不兼容，需要修改一下配置和在部署k8s的时候一样就行了。<br>
> 还记得我们在部署k8s时初始化服务，当时有配置ip和网段；`kubeadm init --apiserver-advertise-address=172.16.11.214 --pod-network-cidr=172.17.10.1/18 --kubernetes-version=1.20.15 |tee kubeadmin-init.log`
> 可以看到我们指定的`--pod-network-cidr=172.17.10.1/18`，但 Flannel 配置指定的是`10.244.0.0/16`,着并不匹配，我们给他换成初始化k8s时候的这个网段（ kubeadm init 命令中指定的 CIDR）就可以了；<br>
> **解决方法**：
> 修改`kube-flannel`的`configmaps`配置来解决此问题；

```bash
kubectl edit configmaps -n kube-flannel kube-flannel-cfg
```
找到网络配置这块，将他改成初始化k8s时的网段（ kubeadm init 命令中指定的 CIDR）即可：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161422940.png)

修改完之后保存退出，直接修改 ConfigMap 将自动更新 Flannel Pod，需要等待一会。

```bash
kubectl get pods -n kube-flannel
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161422928.png)

这样就可以了，就属于正常了。

---
在看一下全部的pod

```bash
kubectl get pods -ALL
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161422896.png)

都是1/1就可以了。




### 3.9 验证nodes节点状态

```perl
kubectl get nodes
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161421396.png) 

> 如果出现`Ready`则代表安装完成，master节点已经注册到了k8s。

---
因为安装了网络插件之后他是需要自动重启连接的，所以需要等待一会，安装完网络插件之后查看如果还是`NotReady`状态的话，这里也可以使用此命令持续查看更新nodes节点的状态，实时观看等待连接成功；

```bash
kubectl get nodes -w
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161421130.png)

### 3.10 部署完成 ✔
## 四、常见问题处理
### 4.1 nodes NotReady异常处理

> 如果出现NotReady，可以执行以下语句判断服务器状态。

```perl
kubectl get nodes -o yaml
```

> 以下绿色部分没有问题，红色部分异常message:docker: network plugin is not ready: cni
> config uninitialized。

 ![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161421837.png)

如果出现以上问题 查看日志。

```perl
journalctl -f -u kubelet.service
```

如果出现以下日志。

> "Error validating CNI config list" configList="{\n  \"name\":
> \"cbr0\",\n  \"cniVersion\": \"0.3.1\",\n  \"plugins\": [\n    {\n    
> \"type\": \"flannel\",\n      \"delegate\": {\n       
> \"hairpinMode\": true,\n        \"isDefaultGateway\": true\n      }\n 
> },\n    {\n      \"type\": \"portmap\",\n      \"capabilities\": {\n  
> \"portMappings\": true\n      }\n    }\n  ]\n}\n" err="[failed to find
> plugin \"flannel\" in path [/opt/cni/bin] failed to find plugin
> \"portmap\" in path [/opt/cni/bin]]"

执行以下命令即可

```perl
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

yum clean all
yum install kubernetes-cni -y
```


### 4.2 重启服务器后 k8s 节点 NotReady 异常处理

重启后查看nodes节点状态，或者其他报错

```bash
[root@kubernetes ~]# kubectl get nodes
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161421083.png)

问题解决：root用户将此行写到系统环境配置里

```bash
vim /etc/profile
加到最后面
# k8s nodes配置
export KUBECONFIG=/etc/kubernetes/admin.conf
```

再次查看如果遇到报错：
`The connection to the server 172.16.11.214:6443 was refused - did you specify the right host or port?`

```bash
[root@kubernetes ~]# kubectl get nodes
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161421695.png)


解决：关闭交换分区，等待一会（在自启容器中）

```bash
[root@kubernetes ~]# swapoff -a
[root@localhost ~]# kubectl get nodes
NAME                    STATUS   ROLES                  AGE   VERSION
localhost.localdomain   Ready    control-plane,master   21h   v1.20.0
```
或者永久关闭交换分区
* 永久关闭swap交换分区（需要重启服务器）

```bash
vim /etc/fstab
找到带swap的哪一行，注释掉就行；之后重启服务器永久生效。
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161421480.png)

重启服务器之后查看查看node节点状态

```bash
[root@localhost ~]# kubectl get nodes
NAME                    STATUS   ROLES                  AGE   VERSION
localhost.localdomain   Ready    control-plane,master   21h   v1.20.0
```



