---
title: Linux下安装Python3.6.8（超级详细）
icon: circle-info
order: 11
tag:
- Linux
- Python
category:
- Linux
- Python
- 运维
pageview: false
date: 2024-03-24
comment: false
---

## 前言：
&emsp;&emsp;在Linux系统中，一般都自带的有Python，不过Linux下自带Python大都是 2.7.5版本的，如果我们想要使用python3的话，最好是再重新装一个Python3的环境，让python2和python3共存。

	特别注意：最好不要删除自带的python2.7.8，因为可能有其他地方依赖python2，直接删掉的可能会导致其他的问题。

<br>

### 下载python3.6.8的安装包
>我们要安装的是 Python 3.6.8，可以直接下载好上传到 Linux服务器中，也可以在Linux中通过 wget 命令来下载python3.6.8的安装包。



python各版本下载地址：[https://www.python.org/ftp/python/](https://www.python.org/ftp/python/)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/936e3362a6764650971c7135b71290d6.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/0f080328d5014a5ab236c7f9a8cf9830.png)

**链接下载：**
>在Linux下任意位置新建一个目录（python3），用于存放下载的安装包，接着进入python3目录下，再通过 wget 命令下载。<br>


```bash
#创建一个python3目录
mkdir /home/python3
#下载python3.6.8安装包
wget https://www.python.org/ftp/python/3.6.8/Python-3.6.8.tgz
```
下载安装包命令：wget [https://www.python.org/ftp/python/3.6.8/Python-3.6.8.tgz](https://www.python.org/ftp/python/3.6.8/Python-3.6.8.tgz)

<br>

等待下载完成⚪⚪⚪⚪⚪⚪

<br>


### 解压python3.6.8的安装包

```bash
#下载完成之后，将安装包解压到当前目录：
tar xvf Python-3.6.8.tgz
```
解压完成后，python3的目录下会出现一个python3.6.8的目录：
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1dfef90b3bb14771b1f4d305cbe0f97d.png)


<br>


### 安装依赖包
解压完成之后，就是安装编译时所需要的依赖包，避免中途出错；

```bash
yum -y install vim unzip net-tools && yum -y install wget && yum -y install bzip2 && yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel && yum -y install libglvnd-glx && yum -y install gcc gcc-c++
```
<br>

等待下载安装完成⚪⚪⚪⚪⚪⚪

<br>


### 指定python3.6.8安装路径
我们在这里最好指定一下python3的安装路径，这样当我们想要卸载python3.6.8的时候，卸载完之后，在删除这个目录，就可以彻底的删除了。就比如要删除先卸载,yum remove python3.6.8 ,肯定会残留一些删除不了的，这时候就有必要直接删除那个指定的安装目录了。


```bash
#先进入Python3目录下的Python-3.6.8目录：
cd Python-3.6.8
#指定python3安装路径：
./configure --prefix=/usr/local/python3.6
```
<br>


### 编译安装python3.6.8
&emsp;&emsp;在Python-3.6.8目录下安装，安装时分2步：第一步使用命令 make 先编译；第二步使用命令 make install 进行安装。安装时间可能有点长，请多花点耐心等待，大概就是1个小时或者3、40分钟左右。
&emsp;&emsp;如果中途不想看的话，可以直接编译安装一起跑，直接让他跑完。

```bash
#编译+安装
make && make install
```
<br>

等待编译安装完成⚪⚪⚪⚪⚪⚪

<br>


### 添加软链接
安装完成后，我们需要设置一下软链接，软链接可以简单理解为windows下的桌面快捷方式。

系统自带的 python2 中，在终端输入命令 python ，最终是指向 python2 。我们的想法是，如果使用新安装的python3.6.8版本，在终端直接输入 python3 就可以进行其交互界面。

我们先退出到 python3目录，发现安装完python3之后，其下面多了很多文件，我们进入到 bin 目录下可以看到python3的程序。



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/7d7e971db0b44974b0221a09eeaf808c.png)
在这里，我们设置软链接，直接让新安装的python3.6指向给 /usr/bin/python3 ，让 pip3 指向给/usr/bin/pip3。

```bash
#添加python3软链接：
ln -s /usr/local/python3.6/bin/python3.6 /usr/bin/python3
#添加pip3软链接：
ln -s /usr/local/python3.6/bin/pip3 /usr/bin/pip3
```

<br>

### 查看是否安装成功

```bash
python3 --version
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/2a9501a390d9470b98a558d6cd196a53.png)
就可以证明安装成功了，也可以进入python交互界面

```bash
python3
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/459fd612b5344594b30ad2db173dea75.png)
这里我们也可以看到已经安装成功，还可以输入python，然后tab、tab两下，看看有没有python3
![](https://img-blog.csdnimg.cn/032f87b57dbf41b3a0d920be6ead292d.png)
看到有python3也可以说明已经安装成功。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/d6be6717b3d34a8f9c2dff3233642d64.png)
pip3也安装完成；

## 总结
### 相关文章
>[centos安装python3/pip3项目所需的第三方模块（在线安装&&离线安装）](https://blog.csdn.net/liu_chen_yang/article/details/124475543)
