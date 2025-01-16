---
title: 执行shell脚本出现 $‘ _r‘ 符号导致执行失败【解决】
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - shell
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




## 问题

> &emsp;&emsp;在执行脚本的时候，我们有时候会遇到添加一个变量值，明明读到的值是0或者1，在外面执行此命令都是没问题的，而且脚本中写的判断也是没问题的，但是为什么执行的结果是没有找到0或者1呢？



## 问题的排查及原因



* 脚本示例（test.sh）：

```bash
#!/bin/bash

#获取脚本执行的路径
DIR=$(cd $(dirname $0) && pwd )

num=$(cat $DIR/peizhi.properties | egrep "^onenumber" | awk -F "=" '{print $2}')

if [ "$num" == 0 ];then
        echo -e "配置文件中\e[1;34m测试服务\e[0m\e[1;32m已打开\e[0m"
else
        echo -e "配置文件中\e[1;31m测试服务没有打开\e[0m，跳过此判断"
fi
```



* 配置文件示例（peizhi.properties）：

```bash
file=1.txt
onenumber=0
format=json
```



1、我们先分析脚本：

> 查看当前目录下的`peizhi.properties`配置文件中的以`onenumber`开头的文件；
>
> = 后面的值，如果为0，那么就输入已经打开这个配置了；如果不等于0那么就输出没有打开这个配置。

2、然后我们先在linux命令行执行此命令：` cat peizhi.properties | egrep "^onenumber" | awk -F "=" '{print $2}'`，查到的结果为：<font color=blue>0</font>，那么我们应该输出<font color=gree>“配置文件中测试服务已打开”</font>。

3、放到脚本里执行：发现直接结果是：<font color=red>“配置文件中测试服务没有打开，跳过此判断”</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201048137.png)



4、打开配置文件和脚本看看文件的格式，是不是都是`unix`的；vim 打开配置文件和脚本，执行：`:set ff`，查看此脚本或者文件的文件格式；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201048657.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201048485.png)



可以看到，脚本是没问题的，是`unix`格式的；<font color=red>但是配置文件就是`dos`格式的了；dos格式为`windows（CR LF）`了</font>，在windows上编写的shell脚本，在Linux系统中运行就会有`\r` `^M`等错误信息；

所以，两个脚本文件格式都必须为`unix`格式，查看脚本是否为unix格式，vim进入脚本编辑器，执行：`:set ff`查看脚本的文件格式；如果是dos的就是windows格式的，如果是unix就是linux格式的；dos格式的在windows回车是有一个隐藏的内容的`\r`，所以在执行脚本的时候会多出现一个`\r`。



5、然后我们再去看一下，执行脚本的过程；`sh -x test.sh`；

发现多了一个`\r`，然后导致下面的判断识别成了`0\r`与`0`不匹配了，所以输出了没有打开此测试服务；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201048985.png)





---



所以，得出的结论是：因为两个文件中的  配置文件的文件格式为<font color=red>dos格式，dos为windows模式</font>，回车会有`\r`占位符，所以，导致执行shell脚本的时候多了一个`\r`；

两种解决方法：

* [ ] 1、修改文件的文件格式
* [ ] 2、去除文件中的回车：`\r`

## 解决方法一：修改文件 文件格式

> 当我们知道是配置文件的文件类型是`dos类型`，那么我们就可以只修改配置文件的文件类型即可；



* [x] 修改文件 文件格式

1、vim 进入编辑模式

2、执行： `set ff=unix`

3、`:wq`保存退出

4、再次进入查看文件格式：`:set ff`

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201048588.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201047718.png)



5、执行脚本带详细输出

```bash
root@7b64cee30106:~# sh -x test.sh 
+++ dirname test.sh
++ cd .
++ pwd
+ DIR=/root
++ cat /root/peizhi.properties
++ grep '^onenumber'
++ awk -F = '{print $2}'
+ num=0
+ '[' 0 == 0 ']'
+ echo -e '配置文件中\e[1;34m测试服务\e[0m\e[1;32m已打开\e[0m'
配置文件中测试服务已打开
```



可以发现已经是 0 = 0 了，那么问题就解决了；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201047698.png)





## 解决方法二：去除文件类型为“dos”文件中的回车



> 当我们知道是配置文件的文件类型是`dos类型`，那么我们就只去除配置文件里的`\r`就行；



* [x] 去除文件类型为“dos”文件中的`回车\r`

```bash
sed -i "s/\r//g" peizhi.properties
```



命令解析：

```bash
sed -i：		修改配置文件 
"s/\r//g"：	将\r改为空格，文件中所有
peizhi.properties	要修改的文件名
```



* 执行脚本带详细输出

```bash
root@7b64cee30106:~# sh -x test.sh 
+++ dirname test.sh
++ cd .
++ pwd
+ DIR=/root
++ cat /root/peizhi.properties
++ grep '^onenumber'
++ awk -F = '{print $2}'
+ num=0
+ '[' 0 == 0 ']'
+ echo -e '配置文件中\e[1;34m测试服务\e[0m\e[1;32m已打开\e[0m'
配置文件中测试服务已打开
```



可以发现已经是 0 = 0 了，那么问题就解决了；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201047241.png)



---

---



**小知识：**

&emsp;&emsp;在windows上使用`notepad++`可以看到该文件的文件类型是什么；打开一个文件或者脚本在右下角可以看到。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201047102.png)

