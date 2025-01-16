---
title: 麒麟V10 arm 编译安装 gcc9.3环境
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 操作系统
  - ARM
  - 运维
pageview: false
date: 2024-12-19
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


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201049085.png)
## 一、前言需求：
>在麒麟V10 arm64架构的服务器上需要使用到gcc9.3，但麒麟V10自带的gcc版本是7.3，麒麟系统自带的sp1和sp2源，默认的gcc版本都是7.3，所以需要升级到gcc9.3才能使用；


麒麟V10 系统默认安装的文件版本地址：[http://update.cs2c.com.cn:8080/NS/V10/](http://update.cs2c.com.cn:8080/NS/V10/)



## 二、GCC 9.3安装包下载



gcc安装包下载地址：
> 9.3安装包下载地址：[https://ftp.gnu.org/gnu/gcc/gcc-9.3.0/gcc-9.3.0.tar.gz](https://ftp.gnu.org/gnu/gcc/gcc-9.3.0/gcc-9.3.0.tar.gz)
> 其他版本安装包下载地址：[http://ftp.gnu.org/gnu/gcc/](http://ftp.gnu.org/gnu/gcc/)

可以在服务器上使用wget下载，也可以直接下载上传到服务器上；


## 三、服务器操作
### 3.1 下载所需依赖包
```bash
# 安装gcc gcc-c++ glibc-static make
yum -y install gcc gcc-c++ glibc-static make
# 安装bzip2
yum -y install bzip2
```
### 3.2 解压 GCC 安装包

```bash
tar xf gcc-9.3.0.tar.gz
```
### 3.3 下载相关的依赖和组件

```bash
#先切换到gcc9.3的目录下
cd gcc-9.3.0
#下载相关的依赖和组件
./contrib/download_prerequisites
```

如果执行：`./contrib/download_prerequisites`此操作报错：`error: Cannot download gmp-6.1.0.tar.bz2 from ftp://gcc.gnu.org/pub/gcc/infrastructure/`，那么就手动下载一下（使用清华大学源手动下载）：

```bash
# 下载gmp-6.1.0
wget https://mirrors.tuna.tsinghua.edu.cn/gnu/gmp/gmp-6.1.0.tar.xz
# 解压
tar -xvf gmp-6.1.0.tar.xz
# 重命名
mv gmp-6.1.0 gmp
 
wget https://mirrors.tuna.tsinghua.edu.cn/gnu/mpfr/mpfr-3.1.4.tar.gz
tar -xvf mpfr-3.1.4.tar.gz
mv mpfr-3.1.4 mpfr
 
wget https://mirrors.tuna.tsinghua.edu.cn/gnu/mpc/mpc-1.0.3.tar.gz
tar -xvf mpc-1.0.3.tar.gz
mv mpc-1.0.3 mpc
```

### 3.4 新建一个build目录在gcc9.3.0目录中用于存放编译文件

```bash
mkdir build
```
### 3.5 编译、安装

```bash
#创建完文件夹之后，进入文件夹
cd build
#进入之后编译，指定目录编译安装；
../configure -prefix=/usr/local/ --enable-checking=release --enable-languages=c,c++ --disable-multilib 
#完了之后编译并安装，编译安装需要好几个小时，还请耐心等待！
make -j4 
make install
```

 **<font color=red size=4>编译安装需要好几个小时，具体没有测试过，还请耐心等待！</font>**

---

 附：编译参数说明：【参数说明来源于：[https://blog.csdn.net/LG_15011399296/article/details/127634103](https://blog.csdn.net/LG_15011399296/article/details/127634103)】

--prefix=/usr/local/ 指定安装路径

--enable-bootstrap 这里引用网上一些文献对该参数的解释：用第一次编译生成的程序进行第二次编译，然后用再次生成的程序进行第三次编译，并且检查比较第二次和第三次结果的正确性，也就是进行冗余的编译检查工作。 非交叉编译环境下，默认已经将该值设为 enable，可以不用显示指定；交叉编译环境下，需要显示将其值设为 disable。

--enable-checking=release 以软件发布版的标准来对编译时生成的代码进行一致性检查；设置该选项为 enable并不会改变编译器生成的二进制结果，但是会导致编译的时间增加；该选项仅支持gcc编译器； 总体而言，对于上面这个选项，机器的硬件配置较低，以及不愿等待太久编译时间的童鞋，可以设置为 disable；但是这会增加产生未预期的错误的风险，所以应该慎用。 可以同时设置 --disable-bootstrap 与 --disable-checking，这对编译过程的提速很有帮助。

--enable-threads=posix 顾名思义，启用posix标准的线程支持 ，要让程序能在符合POSIX规范的linux发布版上正确运行，就应该启用该选项，取决于宿主或目标操作系统的类型，其它可用值有：aix，dec，solaris，win32等，如果你是其它的类UNIX系统，就需要设置相应的值。

--enable-languages=c,c++ 支持的高级语言类型和运行时库，可以设置的所有语言包括 ada,c,c++,Fortran,java,objc,obj-c++,GO 等语言。这里只开启了c和c++,因为支持的语言越多，就需要安装越多的相应静态与动态库，还有五花八门的依赖库，这会让管理变得困难，体积也会变得庞大。

--disable-multilib 如果你的操作系统是32位，默认就已经设置为 disable，这意味着gcc仅能生成32位的可执行程序；如果你的操作系统是64位，默认就已经设置为 enable，这意味着用gcc编译其它源文件时可以通过 -m32 选项来决定是否生成32位机器代码。如果在64位系统上，要禁止生成32位代码， 设置 --disable-multilib。

--enable-gather-detailed-mem-stats 允许收集详细的内存使用信息，如果设置该参数为 enable，则将来编译好的gcc可执行程序，可以通过 -fmem-report 选项来输出编译其它程序时的实时内存使用情况。

--with-long-double-128 指定 long double 类型为128位（16字节！）；设置为 without，则 long double类型将为64位（8字节），这将与普通的 double 类型一样。 基于 Glib 2.4以上版本编译时，默认已经是128位。

---
### 3.6 查看是否安装成功
**查看gcc版本：**

```bash
gcc -v
```
如果显示还是`7.3`的话，那就需要手动软连接一下gcc版本；

```bash
# 可以find先查一下xgcc
[root@e2cdbc5ea620 build]# find / -name xgcc
/usr/local/gcc-9.3.0/build/prev-gcc/xgcc
/usr/local/gcc-9.3.0/build/stage1-gcc/xgcc
/usr/local/gcc-9.3.0/build/gcc/xgcc

# 可以看到有一个xgcc是在build下的gcc下的，将这个软连接到/bin下就行了
mv /bin/gcc /bin/gcc.bak 
ln -s /usr/local/gcc-9.3.0/build/gcc/xgcc /bin/gcc
```
完成软连接之后就再次`gcc --version`、或者`gcc -v`查看版本就行，这时候就会显示9.3了。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201048399.png)

* **查看gcc9.3的动态库**

```bash
strings /lib64/libstdc++.so.6 | grep GLIBC
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201048589.png)

发现动态库还是7.3的，这时候也需要手动去软连接一下库；

```bash
# 查一下所有libstdc++.so.6的库，看看最新的是哪个
[root@e2cdbc5ea620 build]# find / -name libstdc++.so.6.*
/usr/lib64/libstdc++.so.6.0.24
/usr/local/gcc-9.3.0/build/stage1-aarch64-unknown-linux-gnu/libstdc++-v3/src/.libs/libstdc++.so.6.0.28
/usr/local/gcc-9.3.0/build/aarch64-unknown-linux-gnu/libstdc++-v3/src/.libs/libstdc++.so.6.0.28
/usr/local/gcc-9.3.0/build/prev-aarch64-unknown-linux-gnu/libstdc++-v3/src/.libs/libstdc++.so.6.0.28

# 可以看到都在编译的路径下[三选一就行]，也是先备份，在软连接到/lib64下
mv /lib64/libstdc++.so.6 /lib64/libstdc++.so.6-7.3
ln -s /usr/local/gcc-9.3.0/build/stage1-aarch64-unknown-linux-gnu/libstdc++-v3/src/.libs/libstdc++.so.6.0.28 /lib64/libstdc++.so.6

# 软连接完成之后在查一下动态库
strings /lib64/libstdc++.so.6 | grep GLIBC
```
可以看到有`GLIBCXX_3.4.28`就算是成功了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201048763.png)

### 3.7 安装成功




## 四、参考文献
| 参考文章标题 |参考文章链接🔗  |
|--|--|
| [麒麟V10编译安装GCC9.3](https://blog.csdn.net/LG_15011399296/article/details/127634103)| [https://blog.csdn.net/LG_15011399296/article/details/127634103](https://blog.csdn.net/LG_15011399296/article/details/127634103)


## 五、相关文章
|文章标题|文章链接🔗  |
|--|--|
| [Linux中gcc4.8.5升级到gcc5.4.0用已经编译好的安装包升级（重点是不用编译安装，可以更省时）](https://blog.csdn.net/liu_chen_yang/article/details/123735242) | [https://blog.csdn.net/liu_chen_yang/article/details/123735242](https://blog.csdn.net/liu_chen_yang/article/details/123735242) |
|[Centos7 gcc4.8.5升级到版本gcc5.4.0](https://blog.csdn.net/liu_chen_yang/article/details/123711779)|[https://blog.csdn.net/liu_chen_yang/article/details/123711779](https://blog.csdn.net/liu_chen_yang/article/details/123711779)|

