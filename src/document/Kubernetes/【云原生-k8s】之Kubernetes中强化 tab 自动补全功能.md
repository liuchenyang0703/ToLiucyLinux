---
title: 【云原生-k8s】之Kubernetes中强化 tab 自动补全功能
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
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## 前言

>Centos系统，默认情况下，tab键补全只能搜索主命令、补全当前文档名字。而bash-completion包则提供了tab键补充二级命令的功能，其本质是在/etc/bash-completion.d/目录下创建了相应的tab键补全策略，可以手动添加自定义的补全功能。基于这个工具，kubernetes可以做更好的tab 补全。

## 安装插件

```bash
yum -y install bash-completion
```
## 配置环境变量

```bash
echo 'source  <(kubectl  completion  bash)' >> ~/.bashrc
```

## 生效
>1、退出连接，重新连接；
2、或者`bash`更新环境就可以使用了。





