---
title: 【Linux】Centos安装mvn命令（maven）
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2024-12-17
comment: false
breadcrumb: false
---

>🍁**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>

## 一、下载maven包
- 下载有两种方法，分为：<font color=red>官网下载包</font>和<font color=red>wget直接下载</font>
### 方法一：官网下载包
- 1、登录网址查看下载源：[清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/)
- 2、搜索apache

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171026910.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171026616.png)
- 3、进入apache，找到maven并下载，可使用`ctrl+f` 搜索

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171026491.png)
- 4、点击进入选择自己所需版本，外面是大版本，里面还有小版本

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171026680.png)

- 5、我就点击最新的maven-4，进入之后在点击`4.0.0-alpha-5`，在选择 `binaries`，选择自己想要下载包格式，我选择的是zip格式

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171026672.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171026933.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171025686.png)
这是下载地址：[https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-4/4.0.0-alpha-5/binaries/](https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-4/4.0.0-alpha-5/binaries/)

- 6、下载完成之后上传到服务器上解压即可。

完了在配置环境变量，生效就可以用了，具体可以看下面操作： [配置环境变量](#huanjing)。

  


### 方法二：wget直接下载

可以复制上面找到的路径进入，然后点击自己想要下载的包的格式，右击复制连接，完成之后在linux服务器上直接使用wget下载。
这是下载地址：[https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-4/4.0.0-alpha-5/binaries/](https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-4/4.0.0-alpha-5/binaries/)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171025619.png)


```bash
#创建maven目录
mkdir -p /usr/local/maven

#进入/usr/local/maven目录
cd /usr/local/maven

#拉取maven包
wget https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-4/4.0.0-alpha-5/binaries/apache-maven-4.0.0-alpha-5-bin.zip
```

## 二、配置环境变量
- <span id="huanjing">1、解压下载的包</span>

```bash
unzip apache-maven-4.0.0-alpha-5-bin.zip
```
- 2、配置环境变量：编辑/etc/profile文件

```bash
vim /etc/profile
```
- 3、在文件中添加，注意将MAVEN_HOME的值改成自己文件夹。
```bash
MAVEN_HOME=/usr/local/maven/apache-maven-4.0.0-alpha-5
export PATH=${MAVEN_HOME}/bin:${PATH}
```
- 4、生效配置文件

```bash
source /etc/profile
```

## 三、mvn校验

```bash
mvn -v
```
当你看到如下内容，那么恭喜你成功了，如果你没有装jdk会提示你找不到jdk；报错如下下。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171025225.png)


该报错是找不多jdk，配置一个jdk即可；可参考：[Linux中安装jdk1.8和配置环境变量](https://liucy.blog.csdn.net/article/details/123706070?spm=1001.2014.3001.5502) 来配置jdk，配置完成之后再次执行以下`mvn -v`校验即可。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171025870.png)


