---
title: Windows上安装 Python 环境并配置环境变量 （超详细教程）
icon: circle-info
order: 11
tag:
- Windows
- Python
category:
- Windows
- Python
- 运维
pageview: false
date: 2024-03-24
comment: false
---

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## 下载 Python 安装包
> Python下载官网：[https://www.python.org/](https://www.python.org/)<br>
>  如需下载 python3.8.5 可直接跳转：[https://www.python.org/downloads/release/python-385/](https://www.python.org/downloads/release/python-385/)<br>
> 根据自己的版本选择下载<br>
> 通常下载的都是3.8.5，这里我做个教程，所以也选择了3.8.5版本啦！当然，教程都是通用的，照猫画虎就可以了。<br>
>Python 3.8.5 下载截图：<br>
>![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/0530e3f7c16e44f98d329de1b015a2bc.png)




## 安装 Python 服务（目录需要英文目录，不能出现中文）
>下载完成之后双击安装，<font color=red>注意：安装时自定义目录需要英文，不能包含中文，可能出现问题；</font>

* 双击安装
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4216c2fbb75344628ef4bc2be68b85b0.png)


- 双击安装，选择下面这个，可以自定义目录

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/211d7533f9ff461da27785b11dfb820f.png)


- 直接下一步

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/15f9f01505454d049ea86dd29d479272.png)


- 选择安装路径

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/026eb08435154dd5ac1ab9e8d0c46946.png)


- 点击`install`安装即可；等待安装完成点击`Close`关闭，然后配置环境变量即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/86df55ff8625493bb3b33d272e01d394.png)



## 配置 Python 环境变量
> python环境变量的配置方法：首先鼠标右键<font color=red>此电脑-->选择属性-->然后点击高级系统设置-->点击环境变量；接着点击path进行编辑，在path中添加上python的安装路径；最后点击确定。</font><br>
> 最好还是看一下文章详情！！！



![python环境变量如何配置](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/338469d2afaab5c08f449e2cb7d5932b.jpeg)



> 本教程操作环境：windows10/11系统、python3.8.5，Lenovo笔记本电脑。





**1、第一步：在我们的电脑上鼠标右键此电脑-->选择属性-->进去之后，点击高级系统设置，如下图所示：**

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/e9b0384742b94d87bdd070b03b775a45.png)




**2、第二步：进去之后，点击环境变量，如下图所示：**



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/cb38daa1dbcf437bac87a2408fa61600.png)




**3、第三步：在系统变量中有Path则点击Path选择编辑，没有Path，选择新建，<font color=red>变量名写为Path，变量值写为python.exe的路径；</font>**

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b99636079e044c2da0e344adee03ee64.png)


* 新建一个环境变量

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/19d9ea200a304cc299623d37d0f7e6df.png)



如果有，就点击Path，点击编辑：如果在一行上，就在变量值后面紧跟`;python`路径，如果是一行一行的那种就添加一行就行；
* 追加一个python的环境变量


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c74d52b4ffb74f018e4bf6ab27ad9235.png)







>这样就配置完成了，配置完成之后都点击确定；


## 校验是否配置成功


在windows上，使用快捷键 `win+r`，调出cmd窗口；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/7f8b621eae4e4913bdc97d95166ba06e.png)




执行python，如果报错大概是配置路径没有写对；



正确的是这样的；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/912996794da34854927907a22c344efd.png)


这样，就可以确认Python环境配置正确了；


## 相关文章：
|文章标题| 文章链接 |
|--|--|
|[Windows上安装 jdk 环境并配置环境变量 （超详细教程）](https://liucy.blog.csdn.net/article/details/132114315)  | [https://liucy.blog.csdn.net/article/details/132114315](https://liucy.blog.csdn.net/article/details/132114315) |
|[Windows上安装 Go 环境并配置环境变量 （超详细教程）](https://liucy.blog.csdn.net/article/details/132012969)|[https://liucy.blog.csdn.net/article/details/132012969](https://liucy.blog.csdn.net/article/details/132012969)|
|[Windows上安装 Python 环境并配置环境变量 （超详细教程）](https://liucy.blog.csdn.net/article/details/131808146)|[https://liucy.blog.csdn.net/article/details/131808146](https://liucy.blog.csdn.net/article/details/131808146)|

