---
title: Linux中gcc4.8.5升级到gcc5.4.0用已经编译好的安装包升级（重点是不用编译安装，可以更省时）
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - GCC
  - 运维
pageview: false
date: 2024-12-20
comment: false
breadcrumb: false
---

## 前言

&emsp;&emsp;如有遇到<font color=red size=4>没有网络的情况下</font>可以选择用这种方法来做，前提是要先下载好这个包。
还有一个是可以在<font color=blue size=4>有网的情况下</font>做的，就是编译安装；
链接地址：👉[Centos7 gcc4.8.5升级到版本gcc5.4.0](https://blog.csdn.net/liu_chen_yang/article/details/123711779?spm=1001.2014.3001.5502)👈


><font color=red>需要注意的是 centos系统 和 ubuntu系统的区别</font>
>* [x] centos系统的库放在`/lib64/`下；
>* [x] ubuntu系统的库放在`/usr/lib/x86_64-linux-gnu/`下。

## 下载安装包


**网盘地址：**
链接：https://pan.baidu.com/s/1jSV9Dzy3VvIFyh8qZ8sVpA 
提取码：aei1

## 解压安装包

```bash
unzip gcc-5.4.0-编译好的.zip
tar xf gcc-5.4.0-▒р╥ы║├╡─.tar
```
解压完会看到gcc-5.4.0这个目录
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200948747.png)

## 软连接gcc库

<font color=red>注意！！！
软连接一定要使用绝对路径，否侧会有问题；</font>

```bash
#find查找一下libstdc++.so.6.0.21的绝对路径，一定要使用绝对路径来软连接，否侧会有问题；
find / -name libstdc++.so.6.0.21
#备份一下原来的libstdc++.so.6
mv /lib64/libstdc++.so.6 /lib64/libstdc++.so.6-bak
#软连接库,查找到有三个随便选那个都可以，我选的第二个，根据你的目录来定，软连接源地址
ln -s /home/lcy/gcc-5.4.0/build/stage1-x86_64-unknown-linux-gnu/libstdc++-v3/src/.libs/libstdc++.so.6.0.21 /lib64/libstdc++.so.6
#软连接完成之后查找一下这些库
strings /lib64/libstdc++.so.6 | grep GLIBC
#能找到这些库就是成功了。
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200948161.png)

## 软连接gcc版本


```bash
#备份gcc4.8.5
mv /bin/gcc /bin/gcc-bak

#切换到gcc-5.4.0/build/gcc/目录下，根据自己的目录切换
cd /home/lcy/gcc-5.4.0/build/gcc

#添加执行权限
chmod 775 *
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200948613.png)

```bash
#我们可以看到有一个xg++和xgcc，软连接这两个任意一个就可以了；还是要注意自己的软连接源路径
ln -s /home/lcy/gcc-5.4.0/build/gcc/xgcc /bin/gcc
#软连接完成之后就可以看到版本了
gcc -v
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200948428.png)


