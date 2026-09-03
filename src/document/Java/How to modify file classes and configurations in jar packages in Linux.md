---
title: 【Linux】中如何修改jar包里的文件类及配置等内容
icon: circle-info
order: 1
category:
  - Linux
  - java
tag:
  - Linux
  - java
  - 运维
date: 2025-12-04
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
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

## 一、前言

> &emsp;&emsp;在工作中，我们有时候使用的是外网或者是云服务器又或者是vpn之类的，传输文件很慢，就比如一个jar包有300M，上传速度还有限制就很慢；但是修改的内容呢可能只是jar包里的一个class类文件或者是一个配置文件，这种小修改；开发呢修改完之后还要打jar包，打包好之后还要传输上去，如果有网络限制，特别是使用vpn的时候上传速度就会很慢，所以本次教大家如何在Linux中修改jar包的class类文件或配置文件。

## 二、常用命令解析：
> 使用`jar`命令来实现jar包或war包的替换文件；

|参数| 解析 | 常用参数组合|
|--|--|--|
| -f | 指定档案文件名 | -tvf / -xvf / -uvf |
| -v| 输出详细信息|-tvf / -xvf / -uvf  |
|-c |创建新档案 | -cf / -cvf|
|-t |列出jar包或档案的目录 | -tf /  -tvf|
| -x| 从ar包或档案中解压提取指定文件| -xf / -xvf|
| -u| 更新现有的jar包或档案| -uf / -uvf |

示例：
```bash
# 1、列出JAR文件中的所有文件和目录：
jar tvf test.jar
# 这会显示test.jar文件中包含的所有文件和目录。

# 2、解压JAR文件到当前目录下：
jar xvf test.jar
# 执行此命令后，test.jar文件中的内容将被解压到当前目录中，并按照原始的目录结构进行存储。

# 3、创建一个新的JAR文件，并将指定文件添加到其中：
jar cvf test.jar file1 file2
# 以上命令将创建一个名为test.jar的JAR文件，并将文件file1和file2添加到其中。

# 4、向已存在的JAR文件中添加文件：
jar uf test.jar file1
# 该命令向test.jar文件中添加file1文件。
```

## 三、jar包更新步骤详细解析（4步）
### 3.1 查询class类所在jar包的位置
> 使用`jar tvf jar名称 | grep 目标文件名` 查询出目标文件在 jar / war 包中的目录

比如：我们查找test.jar中的Main.class类
```bash
jar tvf test.jar | grep Main.class
```
![查询class类所在jar包的位置](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180942709.png)

### 3.2 解压jar包提取class类
> 使用`jar xvf jar名称 目标文件名(copy上面查出的全路径)` 将目标文件及所在war包中的目录解压到当前路径

> **注意：** 解压的时候可以单独创建一个目录，然后把jar包放到新创建的空目录里进行解压，避免和其他文件混乱。

比如：我们将刚刚查到的Main.class类解压下来

```bash
jar xvf test.jar Main.class
```
![解压jar包提取class类](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180942178.png)

解压完就可以看到想要替换的类被单独拉出来了，如果是多层目录的话就会出现在多层目录里，然后需要进入更深层去替换一下；

![解压jar包提取class类展示](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180942018.png)

### 3.3 替换要更新的class类
>①、上传要替换的class类到linux上
>②、替换解压下来的class类

### 3.4 将替换的class类更新到jar包中


③、使用`jar uvf jar名称 目标文件名`（和步骤（2）中的目标文件名相同） 将新目标文件替换到 jar包中

```bash
jar uvf test.jar Main.class
```
![替换class类并更新jar包](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180942272.png)

这样就可以替换成功了，替换成功之后再次运行jar包验证是否成功；

![替换后运行jar包的结果](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180942101.png)

我这里已经可以看到运行成功了，也就证明替换成功了；


## 四、更新jar包文件 - 总结

```bash
# （1）使用jar tvf jar名称 | grep 目标文件名 查询出目标文件在war包中的目录
jar tvf test.jar | grep Main.class

# （2）使用jar xvf jar名称 目标文件名(copy上面查出的全路径) 将目标文件及所在war包中的目录解压到当前路径
jar xvf test.jar Main.class

# （3）修改目标文件的内容，或者将要新的目标文件替换掉提取出来的目标文件
cp /Main.class Main.class

# （4）使用jar uvf jar名称 目标文件名（和步骤（2）中的目标文件名相同） 将新目标文件替换到 jar包中
jar uvf test.jar Main.class
```

> 更换文件不一定是class类才可以，也可以是配置文件或者是其他文件都可以；

<center>▲总结完成▲</center><br>


> 🐋 希望大家多多支持，我们一起进步！😄
🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗
