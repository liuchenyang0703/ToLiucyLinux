---
title: 【Linux】安装OpenJDK11详细教程
icon: circle-info
order: 1
category:
  - Linux
  - Java
tag:
  - Linux
  - Java
  - 运维
pageview: false
date: 2024-12-16
comment: false
breadcrumb: false
---

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## 有外网安装（在线安装）
```bash
yum -y install java-11
```

## 无外网安装（离线安装）
### 下载离线包

下载链接：[http://jdk.java.net/archive/](http://jdk.java.net/archive/)

往下翻找到自己要下载的OpenJDK版本；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161355631.png)
### 下载完成之后上传服务器并解压
```bash
#将下载的包上传到服务器上
#将包放到/usr/local/目录
mv openjdk-11.0.2_linux-x64_bin.tar.gz /usr/local/

#进入/usr/local并解压删除压缩包
cd /usr/local/ && tar xf openjdk-11.0.2_linux-x64_bin.tar.gz && rm -rf openjdk-11.0.2_linux-x64_bin.tar.gz
```

### 添加环境变量
```bash
#添加环境变量（使用追加方式添加）
echo "export PATH=/usr/local/jdk-11.0.2/bin:$PATH" >> /etc/profile

#不放心可以查看一下环境变量
tail -1 /etc/profile

#生效环境变量
source /etc/profile
```
### 验证jdk是否安装成功
```bash
#查看jdk版本
java --version
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161355095.png)

显示JDK11，安装成功。



