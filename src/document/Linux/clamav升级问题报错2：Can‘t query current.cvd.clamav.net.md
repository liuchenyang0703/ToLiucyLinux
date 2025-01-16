---
title: clamav升级问题报错2：Can‘t query current.cvd.clamav.net
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - clamav
  - 运维
pageview: false
date: 2024-12-19
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


## freshclam升级报错：
```bash
[root@clamav clamav]# freshclam
ClamAV update process started at Wed Mar  1 15:39:55 2023
WARNING: Can't query current.cvd.clamav.net
WARNING: Invalid DNS reply. Falling back to HTTP mode.
WARNING: Can't get information about database.clamav.net: Temporary failure in name resolution
WARNING: Can't download main.cvd from database.clamav.net
Trying again in 5 secs...
ClamAV update process started at Wed Mar  1 15:39:55 2023
WARNING: Can't query current.cvd.clamav.net
WARNING: Invalid DNS reply. Falling back to HTTP mode.
WARNING: Can't get information about database.clamav.net: Temporary failure in name resolution
WARNING: Can't download main.cvd from database.clamav.net
Trying again in 5 secs...
ClamAV update process started at Wed Mar  1 15:39:55 2023
WARNING: Can't query current.cvd.clamav.net
WARNING: Invalid DNS reply. Falling back to HTTP mode.
ERROR: Can't get information about database.clamav.net: Temporary failure in name resolution
ERROR: Can't download main.cvd from database.clamav.net
Giving up on database.clamav.net...
Update failed. Your network may be down or none of the mirrors listed in /opt/clamav/etc/freshclam.conf is working. Check http://www.clamav.net/support/mirror-problem for possible reasons.
```

## freshclam升级报错原因：
这个问题可能是由于网络连接问题导致的。"Can't query current.cvd.clamav.net"的错误提示表明ClamAV无法连接到病毒数据库服务器。

## 解决方式：
1 先ping以下病毒库
```bash
ping  database.clamav.net
```
可以ping通

ping  database.clamav.net 得到一个ip 如104.16.219.5 再然后改/etc/hosts这个文件。加入一行：
```bash
[root@clamav clamav]# vim /etc/hosts
104.16.219.5 database.clamav.net
```

2 重启网络：service network restart或者/etc/init.d/network restart

3 再次升级ClamAV病毒库
```bash
freshclam
```

升级成功。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191550500.png)



