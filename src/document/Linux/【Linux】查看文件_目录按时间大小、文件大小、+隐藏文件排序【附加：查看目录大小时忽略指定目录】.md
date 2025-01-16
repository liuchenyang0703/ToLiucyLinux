---
title: 【Linux】查看文件_目录按时间大小、文件大小、+隐藏文件排序【附加：查看目录大小时忽略指定目录】
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 磁盘
  - 运维
pageview: false
date: 2024-12-18
comment: false
breadcrumb: false
---

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---



## ll 按大小排序
ll 按大小排序：
```bash
ls -l = ll 查看详细信息
ll -Sh  由大到小排序(可读的方式)
ll -Shr  由小到大排序(可读的方式)
```
* 参数分析：

|参数|分析结果  |
|--|--|
|  ll| 查看详细信息：相当于“ls -l”命令 |
|S  |  文件大小，由大到小排序|
| h |以人类可读方式展示  |
|r  | 倒序排列 |

* 示例1：查看日志文件大小 <font color=red>由大到小排序(可读的方式)</font>

```bash
ll -Sh
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181444130.png)
* 示例2：查看日志文件大小 <font color=red>由小到大排序(可读的方式)</font>

```bash
ll -Shr
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181444123.png)

---
## ll 按时间排序
ll 按时间排序：

```bash
ll -th	按日期由新到旧排序
ll -thr 按日期由旧到新排序
```

* 参数分析：

|参数|分析结果  |
|--|--|
|  ll| 查看详细信息：相当于“ls -l”命令 |
|t  |  日期时长，按日期由新到旧排序|
| h |以人类可读方式展示  |
|r  | 倒序排列 |

* 示例1：查看日志文件时间顺序 <font color=red>由新到旧排序(可读的方式)</font>

```bash
ll -th
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181444810.png)


* 示例2：查看日志文件时间顺序 <font color=red>由旧到新排序(可读的方式)</font>

```bash
ll -thr
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181444696.png)

---
## ls 查看隐藏文件
查看隐藏文件：

```bash
ls -a
```
正常查看文件也只能看到表面让你看到的文件，而有的时候恶意的人会利用隐藏文件来破坏你的服务器及服务信息；多数隐藏文件都是配置文件。

* 正常看到的一个目录下的文件：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181444406.png)
* 查看一个目录及以下的所有隐藏文件：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181444416.png)

明显就比正常看到的要多一些。这些以.开头的都是隐藏文件了。

---


## du 查看目录大小及排序
du 的一些常用命令：

```bash
du -h		以人类可读方式列出所有文件、目录及目录中的子文件（包含隐藏文件）
du -sh  	查看当前目录的总大小
du -sh * 	列出当前目录的各个目录、文件的大小
du -sh * | sort -h	按从小到大排序展示
du -sh * | sort -rh	按从大到小排序展示
du -sh .[^.]* *		显示当前目录下所有隐藏文件和非隐藏文件的大小
```
* 参数分析：

|du 参数|du 解析|
|--|--|
|  du | 查看当前目录所有的文件大小 |
| h |以人类可读方式展示  |
|s | 查看当前目录的总大小|
|*  |列出所有文件及目录（不包含目录下的子文件） |

|sort 参数| sort 解析|
|--|--|
| sort   |默认升序排序  |
| -r| 倒序排序|
|-h|以人类可读方式（KB,MB,GB），一般用于查看文件大小排序|


* 示例1：查看当前目录的总大小

```bash
du -sh 
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181444881.png)

* 示例2：列出当前目录的各个目录、文件的大小

```bash
du -sh *
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181444020.png)


* 示例3：列出当前目录的各个目录、文件的大小，<font color=red>按从小到大排序展示</font>

```bash
du -sh * | sort -h
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181444090.png)

* 示例4：列出当前目录的各个目录、文件的大小，<font color=red>按从大到小排序展示</font>

```bash
du -sh * | sort -rh
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181443347.png)

## du 查看目录大小及展示隐藏文件

* 显示当前目录下所有隐藏文件和非隐藏文件的大小

```bash
du -sh .[^.]* *
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181443958.png)

* [x] du -sh .[^.]* * 分析：

```bash
du -sh	查看当前目录可见的所有文件的大小
.		当前目录
[^.]	查看以.开头的文件及目录，也就是隐藏文件
* 		列出所有文件
[^.]*	列出所有以.开头的隐藏文件及目录
```
所以，执行du -sh .[^.]* * 可以查看所有文件和目录的大小（包含隐藏文件）

```bash
[root@localhost ~]# du -sh .[^.]* *
20K	.bash_history
4.0K	.bash_logout
4.0K	.bash_profile
4.0K	.bashrc
4.0K	.blacklist
76M	.cache
8.2M	.config
4.0K	.cshrc
4.0K	.dbus
4.0K	.esd_auth
12K	.gnupg
0	.groovy
4.0K	.ICEauthority
60K	.java
2.6G	.jenkins
3.9M	.local
211M	.m2
25M	.mozilla
0	.pki
4.0K	.ssh
4.0K	.tcshrc
8.0K	.viminfo
4.0K	.Xauthority
0	a
4.0K	anaconda-ks.cfg
4.0K	a.sh
173M	jdk-18.0.2.1.zip
0	公共
0	模板
0	视频
0	图片
0	文档
0	下载
0	音乐
0	桌面
```




## 附加1：du 查看目录大小忽略指定目录

```bash
du -sh /* --exclude=/media
```
* 先查看当前目录文件

```bash
[root@localhost /]# ls
application  applog  bin  boot  data  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181443914.png)

* 然后查看目录大小过滤media挂载磁盘的目录

```bash
[root@localhost /]# du -sh /* --exclude=/media
384M	/application
16K	/applog
0	/bin
117M	/boot
0	/data
0	/dev
32M	/etc
400K	/home
0	/lib
0	/lib64
0	/mnt
0	/opt
du: 无法访问"/proc/98795/task/98795/fd/4": 没有那个文件或目录
du: 无法访问"/proc/98795/task/98795/fdinfo/4": 没有那个文件或目录
du: 无法访问"/proc/98795/fd/4": 没有那个文件或目录
du: 无法访问"/proc/98795/fdinfo/4": 没有那个文件或目录
0	/proc
3.0G	/root
68M	/run
0	/sbin
0	/srv
0	/sys
6.6M	/tmp
1.8G	/usr
391M	/var
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181443380.png)
看的时候没有看到`media`目录，成功过滤掉。


---

## 附加2：du 查看目录大小忽略指定目录（多个）

```bash
du -sh * --exclude=jenkins --exclude=maven	
```
* 查看当前目录（/usr/local/）

```bash
[root@localhost local]# ls
bin  etc  games  include  jenkins  lib  lib64  libexec  maven  sbin  share  src
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181443344.png)

* 过滤掉`jenkins`和`maven`目录；

```bash
[root@localhost local]# du -sh * --exclude=jenkins --exclude=maven
0	bin
0	etc
0	games
0	include
0	lib
0	lib64
0	libexec
0	sbin
0	share
0	src
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181443948.png)

>成功过滤掉多个目录，用于查看一个目录下的子目录大小，但有的知道很大像过滤掉不看他的情况下使用。


## ❄ 相关文章
|文章名称|文章地址  |
|--|--|
|[【Linux】之【磁盘】相关的命令及解析[df、du、iostat、iotop]](https://blog.csdn.net/liu_chen_yang/article/details/125256901)  | [https://blog.csdn.net/liu_chen_yang/article/details/125256901](https://blog.csdn.net/liu_chen_yang/article/details/125256901) |
|[【Linux】查看文件/目录按时间大小、文件大小、+隐藏文件排序【附加：查看目录大小时忽略指定目录】](https://blog.csdn.net/liu_chen_yang/article/details/123070483)|[https://blog.csdn.net/liu_chen_yang/article/details/123070483](https://blog.csdn.net/liu_chen_yang/article/details/123070483)|

