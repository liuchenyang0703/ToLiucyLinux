---
title: 【Linux】切换内核版本（Centos）
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2024-12-18
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


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181357950.png)


## 1.查看服务器已安装的所有内核版本

```bash
awk -F\' '$1=="menuentry " {print i++ " : " $2}' /etc/grub2.cfg
```

>0 : CentOS Linux (3.10.0-1160.83.1.el7.x86_64) 7 (Core)
1 : CentOS Linux (3.10.0-1160.80.1.el7.x86_64) 7 (Core)
2 : CentOS Linux (3.10.0-1127.el7.x86_64) 7 (Core)
3 : CentOS Linux (3.10.0-1160.83.1.el7.x86_64.debug) 7 (Core)
4 : CentOS Linux (3.10.0-1160.80.1.el7.x86_64.debug) 7 (Core)
5 : CentOS Linux (0-rescue-0e5781d77781441b97290d7bad5663e2) 7 (Core)


## 2.修改版本配置

```bash
vi /etc/default/grub
```

```bash
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR="$(sed 's, release .*$,,g' /etc/system-release)"
GRUB_DEFAULT=3
GRUB_DISABLE_SUBMENU=true
GRUB_TERMINAL_OUTPUT="console"
GRUB_CMDLINE_LINUX="crashkernel=auto rhgb quiet intel_iommu=on iommu=pt"
GRUB_DISABLE_RECOVERY="true"
```


将配置文件中的`GRUB_DEFAULT`的值改为上面查看的对应值ID，根据自己的所需修改；我这里要改为`CentOS Linux (3.10.0-1160.80.1.el7.x86_64) 7 (Core)`则修改为：

```bash
GRUB_DEFAULT=1
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181357876.png)



## 3.编译配置

```bash
grub2-mkconfig -o /boot/grub2/grub.cfg
```

## 4.重启系统
编译完成之后需要重新系统方则生效

```bash
reboot
```

## 5.重启后查看内核版本
等待重启完成命令查看当前内核版本

```bash
uname -a
uname -r
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181356462.png)



完成版本切换。




![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181356922.jpeg)



