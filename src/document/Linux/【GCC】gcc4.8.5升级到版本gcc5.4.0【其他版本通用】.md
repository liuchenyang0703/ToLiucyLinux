---
title: 【GCC】gcc4.8.5升级到版本gcc5.4.0【其他版本通用】
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - GCC
  - 运维
pageview: false
date: 2024-12-17
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


## 一、前言
&emsp;&emsp;因为Centos7默认的是gcc4.8.5，但是有时候要用到gcc5.4，因为，我来教大家如何从gcc4.8.5升到到gcc5.4.0。
&emsp;&emsp;如果遇到<font color=red size=4>没有网络的情况下</font>，想要安装gcc，只需要一个安装包，就可以安装；
详细请看：👉[Linux中gcc4.8.5升级到gcc5.4.0用已经编译好的安装包升级（重点是不用编译安装，可以更省时）](https://blog.csdn.net/liu_chen_yang/article/details/123735242)👈
<br>

><font color=red>需要注意的是 centos系统 和 ubuntu系统的区别</font>
>
>* [x] centos系统的库放在`/lib64/`下；
>* [x] ubuntu系统的库放在`/usr/lib/x86_64-linux-gnu/`下。


## 二、GCC 5.4安装包下载



gcc安装包下载地址：
>5.4安装包下载地址：[http://ftp.gnu.org/gnu/gcc/gcc-5.4.0/gcc-5.4.0.tar.gz](http://ftp.gnu.org/gnu/gcc/gcc-5.4.0/gcc-5.4.0.tar.gz)
>其他版本安装包下载地址：[http://ftp.gnu.org/gnu/gcc/](http://ftp.gnu.org/gnu/gcc/)

可以在服务器上使用wget下载，也可以直接下载上传到服务器上；

## 三、服务器操作
### 3.1 下载所需依赖包

```bash
# 安装gcc gcc-c++ glibc-static
yum -y install gcc gcc-c++ glibc-static
# 安装bzip2
yum -y install bzip2
```

### 3.2 解压 GCC 安装包

```bash
tar -xvf gcc-5.4.0.tar.gz
```

### 3.3 下载相关的依赖和组件

```bash
#先切换到gcc5.4的目录下
cd gcc-5.4.0
#下载相关的依赖和组件
./contrib/download_prerequisites
```
如果下载不了连不到gcc官网可以去清华源根据所需下载：[https://mirrors.tuna.tsinghua.edu.cn/gnu/](https://mirrors.tuna.tsinghua.edu.cn/gnu/)

### 3.4 新建一个build目录在gcc5.4目录中用于存放编译文件

```bash
#新建一个文件夹存放编译的文件
mkdir -p build
```


### 3.5 编译、安装


**<font color=red size=4>编译安装大概是一个小时多，还请耐心等待</font>**
```bash
#创建完文件夹之后，进入文件夹
cd build
#进入之后编译，指定目录编译安装；
../configure -prefix=/ --enable-checking=release --enable-languages=c,c++ --disable-multilib 
#完了之后编译并安装，编译安装大概1个小时左右
make && make install
```
如果指定安装目录为：`/usr/local/下`

`../configure -prefix=/usr/local/ --enable-checking=release --enable-languages=c,c++ --disable-multilib `
那么编译安装完就需要手动去软连接或者复制一下libstdc++.so.6.0.21库到/lib64/下去;
`ln -s /usr/local/lib64/libstdc++.so.6.0.21 /lib64/libstdc++.so.6`



### 3.6 查看是否安装成功

**查看gcc版本：**

```bash
gcc --version
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171024264.png)
**查看库：**

```bash
strings /lib64/libstdc++.so.6 | grep GLIBC

# ubuntu系统查看方式
strings /usr/lib/x86_64-linux-gnu/libstdc++.so.6 | grep GLIBC
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171024546.png)

有这些就代表安装成功。

## 四、编译完成gcc还是显示4.8.5解决方法
>如果gcc -v查看还是4.8.5的话，先`strings /lib64/libstdc++.so.6 | grep GLIBC
`查看有没有上图这些库”GLIBCXX_3.4.21“，有的话，可以软连接一下gcc就行了，`mv /bin/gcc /bin/gcc.bak` &&`ln -s /home/gcc-5.4.0/build/gcc/xgcc /bin/gcc`，完成软连接之后就再次`gcc --version、或者gcc -v`查看版本就行，这时候就会显示5.4了。


/home/gcc-5.4.0/build/gcc/xgcc就是你在哪编译的路径。


## 五、编译完成gcc的动态库还是不对的话解决方法
> 如果编译完成遇到了gcc的动态库还是不对的话，就比如：
> 我编译了一个gcc5.4，编译完之后查动态库应该会看到`GLIBCXX 3.4.21`，但显示的还是`GLIBCXX_3.4.19`，那么这个时候呢，我们可以查询：`libstdc++.so.6*`，一般都是在编译的build里面；

```bash
find / -name libstdc++.so.6*
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171024050.png)

然后我们可以看到`gcc5.4`的对应版本是`libstdc++.so.6.0.21`，这时候我们在查询一下`libstdc++.so.6.0.21`

```bash
find / -name libstdc++.so.6.0.21
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171024656.png)

然后将这个路径的`libstdc++.so.6.0.21`复制到/lib64/改名为`libstdc++.so.6`，或者是软连接过去；（二选一）

```bash
# 先进行备份
mv /lib64/libstdc++.so.6 /lib64/libstdc++.so.6-4.8.5

# 复制过去
cp -ar /application/gcc-5.4.0/build/stage1-x86_64-unknown-linux-gnu/libstdc++-v3/src/.libs/libstdc++.so.6.0.21 /lib64/libstdc++.so.6

# 软连接过去
ln -s /application/gcc-5.4.0/build/stage1-x86_64-unknown-linux-gnu/libstdc++-v3/src/.libs/libstdc++.so.6.0.21 /lib64/libstdc++.so.6

二选一
```

放到lib64下之后我们可以通过`strings /lib64/libstdc++.so.6 | grep GLIBC`查看。
这样就可以看到`GLIBCXX 3.4.21`了。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171024350.png)

## 六、相关文章
|文章标题|文章链接  |
|--|--|
| [Linux中gcc4.8.5升级到gcc5.4.0用已经编译好的安装包升级（重点是不用编译安装，可以更省时）](https://blog.csdn.net/liu_chen_yang/article/details/123735242) | [https://blog.csdn.net/liu_chen_yang/article/details/123735242](https://blog.csdn.net/liu_chen_yang/article/details/123735242) |
|[Centos7 gcc4.8.5升级到版本gcc5.4.0](https://blog.csdn.net/liu_chen_yang/article/details/123711779)|[https://blog.csdn.net/liu_chen_yang/article/details/123711779](https://blog.csdn.net/liu_chen_yang/article/details/123711779)|

