---
title: 【Docker】完美解决拉取镜像超时报错：ERROR：Get https://registry-1.docker.io/v2/
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
date: 2023-02-20
comment: false
breadcrumb: false
isOriginal: true
star: true
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

## 一、问题报错

docker拉取镜像时超时，拉取失败；
* docker-compose 创建拉取镜像
```bash 
ERROR: Get https://registry-1.docker.io/v2/library/nginx/manifests/latest: Get https://auth.docker.io/token?scope=repository%3Alibrary%2Fnginx%3Apull&service=registry.docker.io: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
```
* docker直接拉取镜像
```bash
Error response from daemon: Get "https://registry-1.docker.io/v2/": net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
```

**<font size=4>场景复现</font>**

* docker-compose 创建拉取镜像

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503171726999.png)

* docker直接拉取镜像

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503171726808.png)


## 二、报错原因
> &emsp;&emsp;自2024年6月6日开始，国内许多大型Docker镜像源（包括高校和云服务商提供的镜像加速服务）陆续停止服务或改为内部使用。例如，中科大、上海交大等高校的Docker镜像源均暂停了Docker Hub镜像缓存服务。
> &emsp;&emsp;那么怎么办呢？最后经过冷静思考找到了解决方案，接下来我们看看解决方案。



## 三、解决方法1 - 更换docker下载源

> &emsp;&emsp;最好的解决方法就是：**<font color=teal>寻找靠谱的镜像源，配置镜像加速；</font>** 最新的镜像加速列表可查看如下，会长期更新 [Docker加速列表 - 长期维护 ](#dockerjiasu)

> 注意：如果使用镜像源方式需要把代理的内容删除并容器docker才可使用（代理的内容是解决方法2）；

1、新建 **<font color=red>/etc/docker</font>** 目录

* 已有就不用创建了

```bash
mkdir -p /etc/docker
```


2、将镜像加速器配置添加到 **<font color=red>daemon.json </font>** 配置文件中；
>如果已经有daemon.json文件的，为了保险起见可以先备份原来的配置文件，在按照以下步骤来做，如果是新部署的docker没有就可以直接使用。

```bash
#备份已有的daemon.json
mv /etc/docker/daemon.json /etc/docker/daemon.json-bak
```
> 注意：docker的镜像加速源不一定什么时候会失效，最新的可查看步骤五，会长期更新：[Docker加速列表 - 长期维护 ](#dockerjiasu)，**PS**：现更新步骤五的时候会同步更新此镜像加速源的地址，可以直接使用；
```bash
[root@localhost docker]# sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://docker.1panel.live",
    "https://docker.hlmirror.com",
    "https://docker.jsdelivr.fyi",
    "https://dockerproxy.net",
    "https://docker.kejilion.pro",
    "https://docker.apiba.cn",
    "https://docker-0.unsee.tech",
    "https://hub.1panel.dev",
    "https://dockercf.jsdelivr.fyi",
    "https://dockertest.jsdelivr.fyi",
    "https://docker.367231.xyz",
    "https://lispy.org",
    "https://docker.xuanyuan.me",
    "https://docker.fxxk.dedyn.io",
    "https://xdark.top",
    "https://cr.laoyou.ip-ddns.com",
    "https://hub4.nat.tf"
  ]
}

EOF
```
3、重新加载配置文件+重启docker服务

```bash
#重新加载配置文件
systemctl daemon-reload

#重启docker服务
systemctl restart docker
```

9、重新拉取镜像

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503171726477.png)


问题解决。

## 四、解决方法2 - 通过代理软件
> 参考文章：[https://blog.csdn.net/2301_79849395/article/details/142829852](https://blog.csdn.net/2301_79849395/article/details/142829852)

1、演示环境
>这里是用电脑 主机 作为 代理服务器，虚拟机运行docker （欧拉系统作为linux，docker 基本环境）

2、 在 `/usr/lib/systemd/system` 目录下创建 `docker.service.d` 目录
```bash
sudo mkdir -p /usr/lib/systemd/system/docker.service.d

# 进入此目录
cd /usr/lib/systemd/system/docker.service.d
```

3、 在该目录下创建 `http-proxy.conf` 文件
```bash
sudo touch http-proxy.conf
```

4、根据自身需要添加下面的内容并替换为实际的配置，一般只需要改 HTTP_PROXY 和 HTTPS_PROXY：
```bash
vim http-proxy.conf

[Service]
Environment="HTTP_PROXY=自己的代理服务器地址"
Environment="HTTPS_PROXY=自己的代理服务器地址"
Environment="NO_PROXY=localhost,127.0.0.1,xxx.com"
```

【注】HTTP_PROXY 用于代理访问 http 请求，HTTPS_PROXY 用于代理访问 https 请求，如果想某个 IP或域名不走代理则配置到 NO_PROXY中。
通常只需要 修改 HTTP_PROXY 和 HTTPS_PROXY.
例如：==http://172.16.15.122:7890==

---

5、先查看自己的电脑的ip地址

这里用自己的windows 电脑 作为代理服务器举例子
通过 `win+r` ，在输入框汇中输入`cmd`，然后 命令窗口输入 `ipconfig` ，查看自己的 ip,假设是 ==172.16.15.122==

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503171726449.png)

6、 这里就需要打开你的`clash for windows`🐱了：

>这里🐱就需要自己去找了，需要花钱买流量；

* 6.1 在General，端口号一般都是`7890`，也可以自己修改；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503171726962.png)

 * 6.2 这里把Allow LAN（允许局域网）打开；然后把TUN MODE（TUN模式）打开，System Proxy（系统代理）打开；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503171726191.png)

7、打开虚拟机，最后将配置文件内容的`IP`和`port`换成自己电脑的ip地址，port换成猫的port即可，然后保存加载配置文件，在拉取镜像即可成功；

* 修改配置ip、端口
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503171726451.png)
* 重启Docker
```bash
#重新加载配置文件
systemctl daemon-reload

#重启docker服务
systemctl restart docker
```
* 拉取镜像
```bash
docker pull liuchenyang/ubuntu20.04:latest
```

 ![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503171726422.png)


恭喜你，Docker Daemon 代理配置完成！
> 注意：开启🐱之后可能会影响你的网络，请勿使用与非法途径，谨慎使用；
> 注意：如果使用镜像源方式需要把代理的内容删除并容器docker才可使用；

## 五、Docker加速列表 - 2026.03.24 已更新 - 长期维护
><span id="dockerjiasu">Docker加速列表 - 2026.03.24 已更新 - 长期维护</span>

| 镜像加速地址                      | 是否正常使用 |
| --------------------------------- | ------------ |
| https://docker.1panel.live | 正常（超级稳定） |
| https://docker.hlmirror.com | 正常（超级稳定） |
| https://docker.jsdelivr.fyi | 正常（稳定） |
| https://dockerproxy.net | 正常（稳定） |
| https://docker.kejilion.pro | 正常（稳定） |
| https://docker.apiba.cn | 正常（稳定） |
| https://docker-0.unsee.tech | 正常（稳定） |
| https://hub.1panel.dev | 正常   |
| https://dockercf.jsdelivr.fyi | 正常 |
| https://dockertest.jsdelivr.fyi | 正常 |
| https://docker.367231.xyz | 正常 |
| https://lispy.org | 正常 |
| https://docker.xuanyuan.me | 正常 |
| https://docker.fxxk.dedyn.io | 正常 |
| https://xdark.top | 正常 |
| https://cr.laoyou.ip-ddns.com | 正常 |
| https://hub4.nat.tf | 正常 |




> 注意：如果使用镜像源方式需要把代理的内容删除并重启docker才可使用；
> 注意：如果使用镜像源方式需要把代理的内容删除并重启docker才可使用；
> 注意：如果使用镜像源方式需要把代理的内容删除并重启docker才可使用；



> 长期维护加速列表参考地址：
> * [https://www.xuxlc.cn/article/details-40.html?login=from_csdn](https://www.xuxlc.cn/article/details-40.html?login=from_csdn)
> * [https://www.5dzone.com/posts/docker-mirrors.html](https://www.5dzone.com/posts/docker-mirrors.html)