---
title: 开启虚拟机出现报错：“此主机支持 Intel VT-x，但 Intel VT-x 处于禁用状态”
icon: circle-info
order: 1
category:
  - Linux
  - 虚拟化
tag:
  - Linux
  - 虚拟机
  - 运维
pageview: false
date: 2024-12-20
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


## 报错
开启虚拟机出现报错：此主机支持 Intel VT-x，但 Intel VT-x 处于禁用状态

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200958064.png)

>Intel VT-x完整名称是`Intel Virtualization Technology`，就是Intel虚拟技术，开启它可以让硬件平台同时运行多个操作系统，是虚拟机软件运行必备的技术之一，如果禁用，就会弹出“此主机支持Intel VT-x,但Intel VT-x处于禁用状态”这个提示，解决办法就是进BIOS开启Intel Virtualization Technology。

## 原因
原因是：电脑没有启用虚拟化

我们打开任务管理器，点击`“性能” ——> “CPU”`，可以看到虚拟化是处于禁用状态的

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200958232.png)

## 解决方式（这里以联想笔记本为例）

- 1、重启电脑，开机时按“Fn+F2”，会听到滴的一声，进入BIOS界面

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200958492.png)


- 2、选择`“configuration”`，找到`“intel virtual technology”`，按回车，将“Disable（关闭）” 改为“Enable（打开）”

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200958031.png)


- 3、最后按`“Fn+F10”`保存并退出，重启即可。



- 4、重启完之后，进入windows页面，还是点击`“性能” ——> “CPU”`，可以看到虚拟化已经处于启动状态了。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200958669.png)

- 5、再次打开虚拟机，启动虚拟机成功。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200958326.png)



