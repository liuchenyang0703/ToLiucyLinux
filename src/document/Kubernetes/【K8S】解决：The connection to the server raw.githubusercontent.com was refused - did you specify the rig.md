---
title: 【K8S】解决：The connection to the server raw.githubusercontent.com was refused - did you specify the rig
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

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## 问题：
我在部署k8s的时候因为需要下载网络插件（flannel），才能让nodes节点通信；但很不幸的是下载不到报错：
在执行下载：

```bash
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```
出现报错：
`The connection to the server raw.githubusercontent.com was refused - did you specify the right host or port?`

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161403079.png)

## 问题原因：

> 与服务器raw.githubusercontent.com的连接被拒绝-您指定了正确的主机或端口吗？

简单来说就是访问不到这个地址，网络问题。


## 解决方法：
访问此地址通过域名查询真实地址IP：[https://www.ipaddress.com/](https://www.ipaddress.com/)，此网站需要使用v**或其他工具；

访问往下拉：
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161403154.png)

点击进去，输入`raw.githubusercontent.com`域名，点击查找；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161403131.jpeg)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161403771.jpeg)

* 将查询到的域名和ip写到服务器里的`/etc/hosts`文件中；

```bash
sudo vim /etc/hosts

# 在后面追加输入
185.199.108.133  raw.githubusercontent.com
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161403164.png)

* 添加完之后再次运行安装命令即可；

```bash
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161402113.png)


> 如果遇到下载`flannel`镜像失败，可使用此链接镜像包：[k8s网络插件 flannel v0.25.5 flannel-cni-plugin-v1.5.1-flannel1 镜像包](https://download.csdn.net/download/liu_chen_yang/89682727)


查看nodes节点状态
```bash
kubectl get nodes
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161402894.png)

Ready连接成功；

---
因为安装了网络插件之后他是需要自动重启连接的，所以需要等待一会，安装完网络插件之后查看如果还是`NotReady`状态的话，这里也可以使用此命令持续查看更新nodes节点的状态，实时观看等待连接成功；

```bash
kubectl get nodes -w
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161402060.png)

><center>问题解决！！！</center>
