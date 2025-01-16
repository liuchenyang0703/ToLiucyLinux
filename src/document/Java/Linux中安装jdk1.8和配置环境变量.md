---
title: Linux中安装jdk1.8和配置环境变量
icon: circle-info
order: 1
category:
  - Linux
  - Java
tag:
  - Linux
  - Java
  - 运维
pageview: false
date: 2022-08-29
comment: false
breadcrumb: false
---

## 下载jak1.8安装包

>链接：https://pan.baidu.com/s/1_JcE1J_M32QRGi35XP6wlg 
提取码：nl6l


如果想要其他版本的安装包可以去官网下载:
[https://www.oracle.com/cloud/free/?source=:ow:o:s:nav::DevoGetStarted&intcmp=:ow:o:s:nav::DevoGetStarted](https://www.oracle.com/cloud/free/?source=:ow:o:s:nav::DevoGetStarted&intcmp=:ow:o:s:nav::DevoGetStarted)


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/5eab67dff62b5d7f70fb6e182002144d.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b9e573dab66a16eaf0e1db9a33077b20.png)

找到自己需要的`版本和系统`进行下载，可以使用`ctrl + F`进行搜索需要的版本；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/00e601d51550434385bf65fb6783d928.png)




下载好之后，上传到服务器上，设置环境变量就可以用了。
<br>

## 设置环境变量
下载好之后。解压`jdk-8u221-linux-x64.tar.gz`，我们会得到一个目录`jdk1.8.0_221`，然后就是<font color=red>重点记住你的jdk存放的目录，也就是绝对路径，不知道自己路径的pwd可以看一下自己现在在哪。</font>

* 配置全局环境变量

```bash
# 进入/etc/profile配置环境变量，这里我的jdk1.8在/application/目录下放着
vim /etc/profile
	JAVA_HOME=/application/jdk1.8.0_221/
	export JRE_HOME=$JAVA_HOME/jre
	export CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib
	PATH=$JAVA_HOME/bin:$PATH
#设置完之后保存退出
#让profile生效
source /etc/profile
#查看jdk版本
java -version
```

* 配置当前用户环境变量
```bash
# 进入~/.bashrc配置环境变量，这里我的jdk1.8在/application/目录下放着
vi /root/.bashrc

	JAVA_HOME=/application/jdk1.8.0_221/
	export JRE_HOME=$JAVA_HOME/jre
	export CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib
	PATH=$JAVA_HOME/bin:$PATH
#设置完之后保存退出
#让.bashrc生效
source /root/.bashrc
#查看jdk版本
java -version
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/d4af9e5887f8e53e115bffa922a83d37.png)
可以看到版本已经是jdk1.8的了，这样就算安装成功了！




