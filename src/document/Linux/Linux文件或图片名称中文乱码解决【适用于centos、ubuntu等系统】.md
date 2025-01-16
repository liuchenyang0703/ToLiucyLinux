---
title: Linux文件或图片名称中文乱码解决【适用于centos、ubuntu等系统】
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 乱码
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
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---




## 一、乱码问题排查



### 1、要先看服务器的语言环境



```bash
# 执行locale查看当前的语言环境
locale
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200958599.png)



是`zh_CN.UTF-8`，有的服务器是 `en_US.UTF-8` 这两个都可以；



<font color=red>如果没有，就需要配置：</font>

```bash
# 方法一、修改/etc/locale.conf文件
echo "LANG=en_US.UTF-8" /etc/locale.conf
# 加载/etc/locale.conf文件，使其生效
source /etc/locale.conf



# 方法二、使用export LANG=en_US.UTF-8命令设置正确的语言环境（临时的）
export LANG=en_US.UTF-8

# 方法三、将环境变量添加到/etc/profile
echo "export LANG=en_US.UTF-8" >> /etc/profile
# 加载/etc/profile文件，使其生效
source /etc/profile
```



### 2、查看服务器是否支持中文类型



```bash
locale -a |grep "zh_CN"
```

<font color=red>如果没有的话就需要下载一个命令</font>

```bash
yum groupinstall chinese-support
```

下载完之后使用该中文包

```bash
echo "LANG=zh_CN.UTF-8" /etc/locale.conf
# 加载/etc/locale.conf文件，使其生效
source /etc/locale.conf
```



### 3、查看上传文件的工具编码类型【这里以winscp来举例】



新建一个服务器连接



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200958633.png)



添加主机名等信息，然后点高级



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200958211.png)





环境 -- > 文件名utf8编码，给开启；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200958117.png)





## 二、如果已经上传了文件需要修改文件乱码



```bash
# 安装软件(centos)
yum -y install convmv
# 安装软件(ubuntu)
apt-get update -y
apt -y install convmv

# 使用
convmv -f gbk -t utf-8 -r --notest /home/要操作的文件
convmv -f gbk -t utf-8 -r --notest 要操作的文件
```

参数：

| 参数       | 参数解析                               |
| ---------- | -------------------------------------- |
| -f         | 源编码                                 |
| -t         | 要修改的编码                           |
| -r         | 递归处理子文件夹                       |
| -i         | 交互模式（询问每一个转换，防止误操作） |
| --list     | 显示所有可用编码                       |
| --nosmart  | 如果是utf8文件，忽略                   |
| --notest   | 直接转换不测试                         |
| --replace  | 文件相同直接替换                       |
| --unescape | 可以做一下转义，比如把%20变成空格      |
| --upper    | 全部转换成大写                         |
| --lower    | 全部转换成小定                         |



---

其他：

linux下有许多方便的小工具来转换编码：

* 文本内容转换` iconv`

* 文件名转换 `convmv`





## 三、实例【centos系统】

上传的中午文件或者图片都是乱码，我们要以第二种方式，已经上传了的文件进行乱码修改；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200957579.png)



1、首先安装命令

```bash
yum -y install convmv
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200957224.png)



2、对乱码文件、目录下的所有乱码文件进行格式转换

* 对单个乱码文件进行格式转换（一般用于目录下只有单个文件或者可以复制的时候转换，乱码是打不出来的）

```bash
convmv -f gbk -t utf-8 -r --notest ?龳??????.jpg
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200957116.png)



* 对整个目录下所有的乱码文件进行格式转换

```bash
convmv -f gbk -t utf-8 -r --notest /home/lcy/cs/luanma/
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200957682.png)

格式转换完成。
