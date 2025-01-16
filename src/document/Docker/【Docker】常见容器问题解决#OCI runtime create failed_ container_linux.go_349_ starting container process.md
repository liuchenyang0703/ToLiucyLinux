---
title: 【Docker】常见容器问题解决#OCI runtime create failed_ container_linux.go_349_ starting container process
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


>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---



## 错误详情
>Creating nginx ... error
>&nbsp;
>ERROR: for nginx  Cannot start service nginx: <font color=red>OCI runtime create failed: container_linux.go:349: starting container process caused "process_linux.go:449: container init caused \"rootfs_linux.go:58</font>: mounting \\\"/data/docker-compose/nginx.conf\\\" to rootfs \\\"/var/lib/docker/overlay2/bf2df5c96248169fac877836243d3e4fe8660e5572b217e8dd5f9066b07c8c25/merged\\\" at \\\"/var/lib/docker/overlay2/bf2df5c96248169fac877836243d3e4fe8660e5572b217e8dd5f9066b07c8c25/merged/etc/nginx/nginx.conf\\\" caused \\\"not a directory\\\"\"": unknown: Are you trying to mount a directory onto a file (or vice-versa)? Check if the specified host path exists and is the expected type
>&nbsp;
>ERROR: for nginx  Cannot start service nginx: <font color=red>OCI runtime create failed: container_linux.go:349: starting container process caused "process_linux.go:449: container init caused \"rootfs_linux.go:58</font>: mounting \\\"/data/docker-compose/nginx.conf\\\" to rootfs \\\"/var/lib/docker/overlay2/bf2df5c96248169fac877836243d3e4fe8660e5572b217e8dd5f9066b07c8c25/merged\\\" at \\\"/var/lib/docker/overlay2/bf2df5c96248169fac877836243d3e4fe8660e5572b217e8dd5f9066b07c8c25/merged/etc/nginx/nginx.conf\\\" caused \\\"not a directory\\\"\"": unknown: Are you trying to mount a directory onto a file (or vice-versa)? Check if the specified host path exists and is the expected type
ERROR: Encountered errors while bringing up the project.

## 错误原因
>docker映射的文件默认是会创建目录的，但是不会创建文件，因为yaml文件种或者docker -v中有映射配置文件，所以会报错；

## 解决方法

查看yaml文件或者docker 创建命令
/data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf

找到了有一个是映射的配置文件，而容器外没有这个配置文件，所以会报错，任意添加一个这个命名的文件或者是拉取一个配置文件即可解决。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161518745.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161519111.png)


添加完或创建完文件之后再次执行就可以成功创建了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161518169.png)




