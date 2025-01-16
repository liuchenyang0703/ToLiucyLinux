---
title: 【Linux】创建多个用户报错：useradd_ Can‘t get unique subordinate UID range useradd_ can‘t create subordinate us
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



## 报错数据

```bash
useradd: Can't get unique subordinate UID range
useradd: can't create subordinate user IDs
```

## 报错原因
>这个报错是因为：这是由于在创建新用户时，系统无法为其分配唯一的用户ID范围（UID range）所导致的错误。可能是由于系统中已经存在了太多的用户，导致UID已经全部被使用完毕，没有可用的范围来分配给新用户。解决该问题的方法是需要手动为新用户分配一个可用的UID范围。可以通过修改“/etc/login.defs”文件中的“UID_MIN”和“UID_MAX”值来增加可用的UID范围。另外，也可以通过删除一些不必要的用户来释放一些UID范围。

>这个是因为需要在服务器中创建20000个用户，但是跑到了8000多个就开始报错。


## 解决方法
编辑/etc/login.defs，将以下代码追加到文件中。

```bash
[root@locahost ~]# vim /etc/login.defs
SUB_UID_MIN   100000
SUB_UID_MAX   2000000000
SUB_UID_COUNT 65536
SUB_GID_MIN   100000
SUB_GID_MAX   20000000000
SUB_GID_COUNT 65536
```

## 测试

```bash
useradd -g mailgroup -s /sbin/nologin cs
```
测试完成。

## 附加：Linux创建多个用户并设置密码及邮件系统
创建20000个用户，并设置密码，和创建mail邮件系统。

```bash
#!/bin/bash

while read username; do
        useradd -g mail -s /sbin/nologin $username
        echo 123456 | passwd --stdin $username
        mkdir -p /home/$username/mail/.imap/INBOX
        chown -R $username:mailgroup  /home/$username
done < /root/username.txt
```

```bash
#!/bin/bash

cat /root/username.txt | while read username; do
        useradd -g mail -s /sbin/nologin $username
        echo 123456 | passwd --stdin $username
        mkdir -p /home/$username/mail/.imap/INBOX
        chown -R $username:mailgroup  /home/$username
done
```



