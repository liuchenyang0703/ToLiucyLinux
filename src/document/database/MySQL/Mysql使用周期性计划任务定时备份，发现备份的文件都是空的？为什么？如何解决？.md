---
title: Mysql使用周期性计划任务定时备份，发现备份的文件都是空的？为什么？如何解决？
icon: circle-info
order: 3
category:
  - Linux
  - 数据库
tag:
  - Linux
  - 数据库
pageview: false
date: 2023-11-19 23:54:31
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f599934504f440d8872f960b2e7ee0c5.jpeg)


>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---

## 前言 / 问题说明
> 最近在做数据库备份，使用的是脚本的方式备份多个库，手动执行脚本备份是没问题的，然后就使用了周期性计划任务开始定时备份；
> 但是有一天，我说看一下备份的数据，结果一看，定时任务备份的sql文件压缩包都是4k，解压出来的...sql都是大小都是0，里面更是没有数据都是空的，这是为什么呢？

## 问题分析
### 1、首先我们分析手动执行是否成功
首先我们分析手动执行是否成功，使用的脚本，那么我们就去存放脚本的路径下执行一下脚本看看备份的是否有数据；

```bash
# 先切换到存放脚本的目录下
[root@csdn data]# cd /usr/local/mysql/data/

# 执行备份脚本
[root@csdn data]# sh back.sh 
mysqldump: [Warning] Using a password on the command line interface can be insecure.
```
脚本执行完，我们去备份数据库文件的路径下看看大小；

```bash
# 切换到备份数据库文件的路径下
[root@csdn data]# cd backup/data/
# 查看大小
[root@csdn data]# du -sh *
4.0K	20231120.sql.tgz
4.0K	20231121.sql.tgz
4.0K	20231122.sql.tgz
4.0K	20231123.sql.tgz
4.0K	20231124.sql.tgz
4.0K	20231125.sql.tgz
4.0K	20231126.sql.tgz
236K	20231127.sql.tgz
# 最后一个就是刚刚手动执行备份的了；明显和前面的不一样；
```
然后我们解压下来看

```bash
# 解压备份的库的压缩包
[root@csdn data]# tar xf 20231127.sql.tgz 
# 查看大小
[root@csdn data]# du -sh *
4.0K	20231120.sql.tgz
4.0K	20231121.sql.tgz
4.0K	20231122.sql.tgz
4.0K	20231123.sql.tgz
4.0K	20231124.sql.tgz
4.0K	20231125.sql.tgz
4.0K	20231126.sql.tgz
680K	20231127.sql
236K	20231127.sql.tgz
```
可以看到解压下来是`680K`，我们可以进去看看，是有数据的；
那么就可以排除脚本的本身问题；

### 2、我们分析定时任务中的命令写的是否正确
执行定时任务一般里面需要写绝对路径；
我的定时任务是在`/etc/crontab`下写着，我们来看看;

```bash
cat /etc/crontab
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/54e16ff4d3ed4e82b89f3e92fac17c08.png)

可以看到写的是：`0 0 */1 * * root /bin/sh /usr/local/mysql/data/back.sh`，每天备份一次，而且都写的绝对路径；
我们把他这个绝对路径拿出来试试看看执行一下是否成功？

```bash
# 定时任务中的脚本执行命令
[root@csdn data]# /bin/sh /usr/local/mysql/data/back.sh
mysqldump: [Warning] Using a password on the command line interface can be insecure.

# 然后去备份数据库的存储路径看看
[root@csdn data]# cd /usr/local/mysql/data/backup/data/

# 查看文件大小
[root@csdn data]# du -sh *
4.0K	20231120.sql.tgz
4.0K	20231121.sql.tgz
4.0K	20231122.sql.tgz
4.0K	20231123.sql.tgz
4.0K	20231124.sql.tgz
4.0K	20231125.sql.tgz
4.0K	20231126.sql.tgz
236K	20231127.sql.tgz
```
可以看到是没问题的，如果刚刚备份过怕没有覆盖，可以自己删除，一般备份是会直接覆盖的，而且你解压下来的文件也会默认删除；
也是同样的方法，看着备份的压缩包的大小是没问题的，解压下来看看；

```bash
[root@csdn data]# tar xf 20231127.sql.tgz 
[root@csdn data]# du -sh *
4.0K	20231120.sql.tgz
4.0K	20231121.sql.tgz
4.0K	20231122.sql.tgz
4.0K	20231123.sql.tgz
4.0K	20231124.sql.tgz
4.0K	20231125.sql.tgz
4.0K	20231126.sql.tgz
680K	20231127.sql
236K	20231127.sql.tgz
```
也是680K，可以vim进入查看一下是否有数据；经过查看是有数据的；
那么也可以排除计划任务的命令是没有问题的；哪是为什么呢？

### 3、检查crontab中的执行环境
既然确定脚本没有问题，并且手动执行能够正确备份数据，那么问题可能出在 crontab 设置或执行环境上。以下是排查的一些步骤：

* [x] 1. **检查 crontab 语法**：确保你的 crontab 语法是正确的。一个常见的错误是忘记指定正确的路径或环境变量。<font color=gree>这个是没问题的；</font>
* [x] 2. **查看 cron 日志**：很多 Linux 发行版默认并不会为 cron 任务记录日志。但如果你的系统配置了 cron 日志，那么检查 `/var/log/cron` 或 `/var/log/syslog` 中的相关条目可能会提供有用的信息。<font color=gree>这个也是没问题的。</font>
* [x] 3. **输出重定向**：确保 cron 任务没有把输出（包括错误输出）重定向到 `/dev/null` 或其他看不到的地方。为了更好地调试，可以考虑将输出重定向到一个特定的日志文件。

例如：
将定时任务改为每分钟执行一次，方便查看，加一个追加日志到执行文件中，并且把错误、非错误信息都存放到这个文件中。
```bash
* * * * * root /bin/sh /usr/local/mysql/data/back.sh >> /usr/local/mysql/data/backup/logfile.log 2>&1
```
这样，就可以查看 `logfile.log` 来检查是否有任何错误或提示信息。
* [x] 4. **环境变量**：cron 执行的环境与登录 shell 的环境可能不同。某些环境变量，如 `PATH`，可能在 cron 中并未设置，导致你的脚本中的某些命令无法找到。考虑在脚本开头定义重要的环境变量，或者在 crontab 文件中设置它们。


---
修改完crontab中的定时任务，让他将执行命令的输出 输出到指定文件中，每分钟执行一次，我们等待一分钟，去看一下指定的目录下的文件；

```bash
# 切换到指定目录
[root@csdn data]# cd /usr/local/mysql/data/backup/
# 查看输出的文件内容
[root@csdn backup]# cat logfile.log
/usr/local/mysql/data/back.sh: line 47: mysqldump: command not found
/usr/local/mysql/data/back.sh: line 47: mysqldump: command not found
/usr/local/mysql/data/back.sh: line 47: mysqldump: command not found
/usr/local/mysql/data/back.sh: line 47: mysqldump: command not found
```
可以看到都是找不到`mysqldump`命令，这就是第4种，环境变量的问题了；

### 4、发现问题，周期性计划任务中执行找不到mysqldump命令

如果在周期性计划任务执行时输出找不到 `mysqldump` 命令，那么很可能是因为 `PATH` 环境变量的问题。Cron 任务运行时的环境变量可能与你在终端中运行的环境变量不同，尤其是 `PATH` 变量。`mysqldump` 可能不在 cron 的 `PATH` 中，因此无法找到。

* **解决方法：**

①、  **查看mysqldump绝对路径**：可以通过运行 `which mysqldump` 在终端中找到它的完整路径。

```bash
[root@csdn backup]# which mysqldump
/usr/local/mysql/bin/mysqldump
```
可以看到是在`/usr/local/mysql/bin/mysqldump`，那么你可以在脚本中直接使用这个路径来调用它，而不是简单地使用 `mysqldump`。

②、 **在脚本中设置 PATH**：在脚本的开头定义 `PATH` 环境变量，确保它包含 `mysqldump` 的路径。

例如：
```bash
#!/bin/bash

# 配置添加mysqldump环境变量
PATH=/usr/local/mysql/bin/:$PATH
```

配置完之后，等待一分钟，查看输出的日志信息；

```bash
[root@csdn backup]# tailf logfile.log 
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/6ca70cc1110c481db3f14766df7df17e.png)

可以看到已经没有报错了；这个是提示，说你使用了明文密码，不影响；

看着是备份没有什么问题了，我们可以去看备份的数据；

```bash
# 切换到备份数据的目录
[root@csdn backup]# cd /usr/local/mysql/data/backup/data/
# 查看大小
[root@csdn data]# du -sh *
4.0K	20231120.sql.tgz
4.0K	20231121.sql.tgz
4.0K	20231122.sql.tgz
4.0K	20231123.sql.tgz
4.0K	20231124.sql.tgz
4.0K	20231125.sql.tgz
4.0K	20231126.sql.tgz
236K	20231127.sql.tgz
```
可以看到大小也是没问题的，然后我们解压下来看看文件数据；

```bash
# 解压备份的数据压缩包
[root@csdn data]# tar xf 20231127.sql.tgz 
# 查看大小
[root@csdn data]# du -sh *
4.0K	20231120.sql.tgz
4.0K	20231121.sql.tgz
4.0K	20231122.sql.tgz
4.0K	20231123.sql.tgz
4.0K	20231124.sql.tgz
4.0K	20231125.sql.tgz
4.0K	20231126.sql.tgz
308K	20231127.sql
236K	20231127.sql.tgz

# 查看数据
[root@csdn data]# vim 20231127.sql
```
都是有数据的，那么问题就解决了；
周期性计划任务中的输出日志，如果想删除就可以删除，不想删除也不影响，但是会占空间，也不大。

## 问题解决
> 推荐一个mysql定时备份的脚本：[mysql数据库定时备份脚本+定时删除 ](https://download.csdn.net/download/liu_chen_yang/87776124)
