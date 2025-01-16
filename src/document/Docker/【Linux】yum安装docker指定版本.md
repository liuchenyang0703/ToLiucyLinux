---
title: 【Linux】yum安装docker指定版本.md
icon: circle-info
order: 1
category:
  - Linux
  - Docker
tag:
  - Linux
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



## 卸载已有的docker

```bash
#查找已安装的docker包
rpm -qa | grep docker
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161457564.png)

```bash
#查找到有已安装的docker包并卸载；卸载docker-ce-cli就可以将其他都顺带卸载了；
yum remove docker-ce-cli-19.03.13-3.el7.x86_64 -y

#卸载完之后再次查一下是否还有未删除的依赖
rpm -qa | grep docker
#没有了话就说明卸载成功了。
```
## 部署指定版本docker
### 安装需要的软件驱动
- yum-utils:提供yum-config-manager功能
- device-mapper-persistent-data、lvm2是devicemapper的依赖库

```bash
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```
### 配置docker下载的yum源
>三种下载方式使用一种即可。

```bash
#直接wget下载阿里云的docker源
wget -P /etc/yum.repos.d/ https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

#使用yum-config-manager下载官方的docker源
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

#使用yum-config-manager下载阿里云的docker源
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```
### 查看yum源仓库所支持的docker版本都有哪些
```bash
[root@localhost yum.repos.d]# yum list docker-ce --showduplicates | sort -r
已加载插件：fastestmirror
可安装的软件包
 * updates: mirrors.tuna.tsinghua.edu.cn
Loading mirror speeds from cached hostfile
 * extras: mirrors.tuna.tsinghua.edu.cn
docker-ce.x86_64            3:23.0.0-1.el7                      docker-ce-stable
docker-ce.x86_64            3:20.10.9-3.el7                     docker-ce-stable
docker-ce.x86_64            3:20.10.8-3.el7                     docker-ce-stable
docker-ce.x86_64            3:20.10.7-3.el7                     docker-ce-stable
docker-ce.x86_64            3:20.10.6-3.el7                     docker-ce-stable
docker-ce.x86_64            3:20.10.5-3.el7                     docker-ce-stable
docker-ce.x86_64            3:20.10.4-3.el7                     docker-ce-stable
docker-ce.x86_64            3:20.10.3-3.el7                     docker-ce-stable
docker-ce.x86_64            3:20.10.2-3.el7                     docker-ce-stable
docker-ce.x86_64            3:20.10.23-3.el7                    docker-ce-stable
docker-ce.x86_64            3:20.10.22-3.el7                    docker-ce-stable
docker-ce.x86_64            3:20.10.21-3.el7                    docker-ce-stable
docker-ce.x86_64            3:20.10.20-3.el7                    docker-ce-stable
docker-ce.x86_64            3:20.10.19-3.el7                    docker-ce-stable
docker-ce.x86_64            3:20.10.18-3.el7                    docker-ce-stable
docker-ce.x86_64            3:20.10.17-3.el7                    docker-ce-stable
docker-ce.x86_64            3:20.10.16-3.el7                    docker-ce-stable
docker-ce.x86_64            3:20.10.15-3.el7                    docker-ce-stable
docker-ce.x86_64            3:20.10.14-3.el7                    docker-ce-stable
docker-ce.x86_64            3:20.10.1-3.el7                     docker-ce-stable
docker-ce.x86_64            3:20.10.13-3.el7                    docker-ce-stable
docker-ce.x86_64            3:20.10.12-3.el7                    docker-ce-stable
docker-ce.x86_64            3:20.10.11-3.el7                    docker-ce-stable
docker-ce.x86_64            3:20.10.10-3.el7                    docker-ce-stable
docker-ce.x86_64            3:20.10.0-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.9-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.8-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.7-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.6-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.5-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.4-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.3-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.2-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.15-3.el7                    docker-ce-stable
docker-ce.x86_64            3:19.03.14-3.el7                    docker-ce-stable
docker-ce.x86_64            3:19.03.1-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.13-3.el7                    docker-ce-stable
docker-ce.x86_64            3:19.03.12-3.el7                    docker-ce-stable
docker-ce.x86_64            3:19.03.11-3.el7                    docker-ce-stable
docker-ce.x86_64            3:19.03.10-3.el7                    docker-ce-stable
docker-ce.x86_64            3:19.03.0-3.el7                     docker-ce-stable
docker-ce.x86_64            3:18.09.9-3.el7                     docker-ce-stable
docker-ce.x86_64            3:18.09.8-3.el7                     docker-ce-stable
docker-ce.x86_64            3:18.09.7-3.el7                     docker-ce-stable
docker-ce.x86_64            3:18.09.6-3.el7                     docker-ce-stable
docker-ce.x86_64            3:18.09.5-3.el7                     docker-ce-stable
docker-ce.x86_64            3:18.09.4-3.el7                     docker-ce-stable
docker-ce.x86_64            3:18.09.3-3.el7                     docker-ce-stable
docker-ce.x86_64            3:18.09.2-3.el7                     docker-ce-stable
docker-ce.x86_64            3:18.09.1-3.el7                     docker-ce-stable
docker-ce.x86_64            3:18.09.0-3.el7                     docker-ce-stable
docker-ce.x86_64            18.06.3.ce-3.el7                    docker-ce-stable
docker-ce.x86_64            18.06.2.ce-3.el7                    docker-ce-stable
docker-ce.x86_64            18.06.1.ce-3.el7                    docker-ce-stable
docker-ce.x86_64            18.06.0.ce-3.el7                    docker-ce-stable
docker-ce.x86_64            18.03.1.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            18.03.0.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.12.1.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.12.0.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.09.1.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.09.0.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.06.2.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.06.1.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.06.0.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.03.3.ce-1.el7                    docker-ce-stable
docker-ce.x86_64            17.03.2.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.03.1.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.03.0.ce-1.el7.centos             docker-ce-stable
 * base: mirrors.bfsu.edu.cn

```
### 安装docker-ce和docker-ce-cli
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161457143.png)

>注：如果不安装docker-ce-cli或直接安装docker-ce-cli，系统会默认下载最新的版本

```bash
yum -y install docker-ce-18.09.6-3.el7 docker-ce-cli-18.09.6-3.el7
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161457326.png)

### 配置docker拉取镜像的源

```bash
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
"insecure-registries": ["0.0.0.0/0"],
"registry-mirrors": ["https://zbkz1bx2.mirror.aliyuncs.com"]
}
EOF
```
- insecure-registries：支持http方式推送镜像
- registry-mirrors：添加镜像加速器，这里添加的是阿里云个人加速器地址，也可以添加其他镜像加速器，多个使用英文逗号分开即可
### 加载并启动docker服务、设置开机自启

```bash
#加载docker配置
systemctl daemon-reload

#启动docker服务
systemctl start docker

#设置docker服务开机自启
systemctl enable docker
```

### 查看docker是否启动

```bash
systemctl status docker
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161457314.png)

### 查看docker版本

```bash
[root@localhost docker]# docker --version
Docker version 18.09.6, build 481bc77156
```


至此，安装完成，可以自行使用了；

