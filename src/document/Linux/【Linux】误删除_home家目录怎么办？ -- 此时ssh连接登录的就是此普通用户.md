---
title: 【Linux】误删除_home家目录怎么办？ -- 此时ssh连接登录的就是此普通用户
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

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181614803.jpeg)


>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---



## 前言 / 误删经过
>因为服务器是禁用了root的`ssh连接方式`的，所以一直都是使用普通用户登录，如果需要其他root权限操作就会提权操作或者切换root进行操作；
>突然有一天，（具体我也不知道在干啥）不小心吧/home/下的普通用户目录删了（当然，不是我操作的），导致我登录进来找不到家目录了，就变成-bash了；虽然可以登录上来，但是上面会提示一行找不到家目录，导致操作没有权限等等一些问题，所以这个问题还是要解决的；

>**<font color=red>提示：此方法仅适用于家目录没有存放任何文件的；</font>**

## ssh连接登录报错信息
报错信息为：
```bash
Could not chdir to home directory /home/test1: No such file or directory<br>
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181613552.png)

## 问题排查

此报错是因为找不到`/home/test1`这样的文件或者目录，报这个错怎么做呢？

> 首先，我们`ls /home`看一下是没有test1这个家目录。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181613003.png)

可以看到是没有的，那么可以判定是被误删或者是移动到其他地方了，导致ssh使用普通用户连接找不到家目录，才会报错。
>**问**：<font color=orange>那么，如何解决呢？</font>
>**答**：<font color=gree>其实很简单：
>&emsp;&emsp;1、如果你是开发人员，用的普通用户，可以找运维人员或者持有root用户的人员帮你在创建一个用户，把创建的哪个用户的家目录，复制一份修改一下家目录名、用户和用户组即可；
>&emsp;&emsp;2、如果自己可以直接进入root，那就在创建一个用户，把创建的哪个用户的家目录，复制一份修改一下家目录名、用户和用户组即可；<br></font>
>那么问题又来了：
>**问**：<font color=orange>为什么不直接创建一个目录呢？看着里面是个空文件？</font>
>**答**：<font color=gree>因为你看到的只是表面，家目录`ls` 看着是空文件，但事实上，它是有隐藏文件的，不仅linux上有，windows上也有隐藏文件，我们需要使用`ls -a`看一下，即可看到隐藏文件；隐藏文件一般都是一些配置，而且是必须的，如果没有这些文件，那么就算创建一个空目录也是无用的。所以，要重新创建一个用户，然后把家目录复制一份，修改一下家目录名、用户和用户组即可；</font>
>
## 解决方法
>&emsp;&emsp;解决方法其实有很多种，比如用什么命令恢复之类的，这些我没有尝试，因为这个比较简单点，而且是个空目录，所以没必要用那么复杂的工具来恢复；
&emsp;&emsp;如果家目录里有其他的文件，那么这时候就需要用到工具了。
### 1、先切换到root用户

```bash
-bash-4.2$ su -
密码：
上一次登录：四 11月 23 16:51:46 CST 2023pts/1 上
```

### 2、添加一个新用户
随便添加一个新用户

```bash
# 添加一个新用户
[root@localhost ~]# useradd test2
# 加密码
[root@localhost ~]# passwd test2
```

如果设置的有切换root免密登录，需要自己使用`visudo`去添加登录权限；

### 3、将新创建的用户的家目录复制一个出来名字为误删掉的那个

```bash
[root@localhost ~]# cd /home/
[root@localhost home]# ls
test2
[root@localhost home]# cp -ar test2/ test1
[root@localhost home]# ls
test1  test2
[root@localhost home]# 
```
这时候复制了一个，但是，还没完成；
我们看一下复制的用户、用户组所属：`ll`

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181613097.png)

可以看到都是test2，这时候我们需要修改一下目录的`用户`和`用户组`所属；

## 4、修改目录的用户和用户组所属
>前提是用户、用户组不能被删除。

```bash
# 给test1目录配置用户、用户组
[root@localhost home]# chown -R test1:test1 test1/
# 查看
[root@localhost home]# ll
总用量 0
drwx------ 2 test1 test1 62 11月 23 16:57 test1
drwx------ 2 test2 test2 62 11月 23 16:57 test2
```

可以看到设置成功了，这时候我们就可以继续使用普通用户登录了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181613665.png)

可以看到登录成功了。

## 解决完成
