---
title: Linux下压缩与解压缩命令大全【详解】
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 压缩
  - 运维
pageview: false
date: 2024-12-20
comment: false
breadcrumb: false
---

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/profile/7yu26jk3lfqxg)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200949835.png)




## linux常用的解压和压缩命令如下：

### .zip或.zipx

压缩文件.zip、.zipx：都可以使用`zip、unzip`命令。例如，要将目录/home/mydata压缩成一个文件mydata.zip，可以使用以下命令：

```
zip -r mydata.zip /home/mydata/
```

要解压缩.zip或.zipx文件，都可以使用`unzip`命令：

```bash
unzip mydata.zip
unzip mydata.zipx
```

`注`：下载`zip`（压缩）、`unzip`（解压缩）命令【centos为例】：

```bash
sudo yum install zip
sudo yum install unzip
```

> 更多分片信息等可查看：[Linux上实现分片压缩及解压分片zip压缩包 - 及zip、unzip命令详解](https://blog.csdn.net/liu_chen_yang/article/details/132494145)

### .rar

压缩文件.rar：例如，要将目录/home/mydata压缩成一个文件mydata.rar，可以使用以下`rar a`命令：

```bash
rar a mydata.rar /home/mydata/
```

要解压缩.rar文件，可以使用以下`unrar x`命令：

```bash
unrar x mydata.rar
```

确认压缩包文件是否损坏：

```bash
unrar t File.rar
```

`注`：`rar`命令下载，比如centos系统可以使用wget下载：

```bash
#下载rar程序包。
wget http://www.rarlab.com/rar/rarlinux-x64-5.6.0.tar.gz

#解压rar组件包。
tar -zxvf rarlinux-x64-5.6.0.tar.gz

#进入解压出的"rar"文件夹。
cd rar

#进行配置。配置成功后，就可以使用rar命令解压rar压缩包了。
make
```

### .tar

压缩文件.tar：例如，要将目录/home/mydata压缩成一个文件mydata.tar，可以使用以下`tar cvf`命令：

```bash
# v展示详细信息
tar cvf mydata.tar /home/mydata/
tar cf mydata.tar /home/mydata/
```

要解压缩.tar文件，可以使用以下`tar xvf`命令：

```bash
tar xvf mydata.tar
tar xf mydata.tar
# 指定路径
tar xf mydata.tar -C /home/a/
```

### .gz或tar.gz或.tgz

压缩文件.gz、.tar.gz或.tgz：都可以使用`tar czvf`命令压缩。例如，要将目录/home/mydata压缩成一个文件mydata.tar.gz，可以使用以下命令：

```bash
tar czvf mydata.tar.gz /home/mydata/
tar czf mydata.tar.gz /home/mydata/
```

要解压缩.gz、.tar.gz或.tgz文件，都可以使用以下`tar xzvf`命令：

```bash
tar xzvf mydata.tar.gz
tar zxf mydata.tar.gz
# 指定路径
tar zxf mydata.tar.gz -C /home/a/
```

### .Z或.tar.Z

压缩文件.Z或.tar.Z：都可以使用`tar czvf`命令压缩。例如，要将目录/home/mydata压缩成一个文件mydata.tar.Z，可以使用以下命令：

```bash
tar czvf mydata.tar.Z /home/mydata/
```

要解压缩.Z或.tar.Z文件，都可以使用以下`tar xzvf`命令：

```bash
tar xzvf mydata.tar.Z
```

### .bz或.tar.bz或.bz2或.tar.bz2

压缩文件.bz、.tar.bz或.bz2、.tar.bz2：都可以使用`tar cjvf`命令压缩。例如，要将目录/home/mydata压缩成一个文件mydata.tar.bz2，可以使用以下命令：

```bash
tar cjvf mydata.tar.bz2 /home/mydata/
```

要解压缩.bz、.tar.bz或.bz2、.tar.bz2文件，都可以使用以下`tar xjvf `命令：

```bash
tar xjvf mydata.tar.bz2
```

### .xz或tar.xz

压缩文件.xz、.tar.xz：都可以使用`tar cjvf `命令压缩。例如，要将目录/home/mydata压缩成一个文件mydata.tar.xz，可以使用以下命令：

```bash
tar cjvf mydata.tar.xz /home/mydata/
```

要解压缩.xz、.tar.xz文件，都可以使用以下`tar xjvf `命令：

```bash
tar xjvf mydata.tar.xz
```

### .lha

压缩文件.lha：例如，要将目录/home/mydata压缩成一个文件mydata.lha，可以使用以下`lha a`命令：

```bash
lha a mydata.lha /home/mydata/
```

要解压缩.lha文件，可以使用以下`lha x`命令：

```bash
lha x mydata.lha
```

`注`：如果没有lha命令，可以使用yum下载如下（需要yum扩展源）：

centos7为例，扩展源地址下载：`wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo`

```bash
sudo yum install lhasa
```

### .deb

压缩文件.deb：例如，要将软件myapp打包成一个文件myapp.deb，可以使用以下`dpkg-deb --build`命令：

```bash
dpkg-deb --build myapp
```

要安装.deb文件，可以使用以下`dpkg -i`命令：

```bash
dpkg -i myapp.deb
```

`注`：如果没有dpkg命令，可以使用yum下载如下（需要yum扩展源）：

centos7为例，扩展源地址下载：`wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo`

```bash
sudo yum install dpkg
```

### .rpm

压缩文件.rpm：例如，要将软件myapp打包成一个文件myapp.rpm，可以使用以下`rpm -ba`命令：

```bash
rpm -ba myapp.spec
```

要安装.rpm文件，可以使用以下`rpm -i`命令：

```bash
rpm -ivh myapp.rpm
```

> 或者将目录打成一个rpm包可参考：[Linux如何将文件或目录打成rpm包？ -- fpm打包详解](https://blog.csdn.net/liu_chen_yang/article/details/134270559)

### .7z

压缩文件.7z：例如，要将目录/home/mydata压缩成一个文件mydata.7z，可以使用以下`7z a`命令：

```bash
7z a mydata.7z /home/mydata/
```

要解压缩.7z文件，可以使用以下`7z x`命令：

```bash
7z x mydata.7z
```

`注`：如果没有7z命令，可以使用yum下载如下（需要yum扩展源）：

centos7为例，扩展源地址下载：`wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo`

```bash
sudo yum install p7zip
```

## 拓展总结：

在使用tar命令，去解压所有支持tar命令解压缩的类型文件时（.tar、.gz、tar.gz或.tgz、.Z、.tar.Z、.bz、.tar.bz、.bz2、.tar.bz2、.xz、tar.xz），不需要在文件名后面添加解压目录，tar命令会自动解压到当前目录。如果需要指定解压缩目录，都可以使用`-C`参数，例如：

```bash
tar xzvf file.tar.gz -C /home/a/
```

## 参考文献：

| 参考文章标题                           | 参考文章连接                                                 |
| -------------------------------------- | ------------------------------------------------------------ |
| Linux下解压和压缩命令大全（详解+案例） | [https://blog.csdn.net/Da_zhenzai/article/details/130400758](https://blog.csdn.net/Da_zhenzai/article/details/130400758) |

