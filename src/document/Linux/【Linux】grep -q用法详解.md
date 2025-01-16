---
title: 【Linux】grep -q用法详解
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

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---

## grep -q 简介
>用于if逻辑判断 安静模式，不打印任何标准输出。如果有匹配的内容则立即返回状态值0。

## 用法

```bash
grep -q 参数[索要查找的内容] 文件名
```

## 实例
### 实例1

```bash
[root@localhost ~]# cat a.txt            ## 测试数据
d e j
s q u
z c b

[root@localhost ~]# grep "s" a.txt       ## 直接输出匹配结果
s q u

[root@localhost ~]# echo $?              ## 输出0表示匹配成功
0

[root@localhost ~]# grep -q "s" a.txt    ## -q选项表示静默输出

[root@localhost ~]# echo $?              ## 输出0表示匹配成功
0
```

### 实例2

```bash
[root@localhost ~]# cat a.txt            ## 测试数据
nihao 
nihaooo
hello

[root@localhost ~]# grep hello a.txt       ## 直接输出匹配结果
hello

[root@localhost ~]# echo $?              ## 输出0表示匹配成功
0

[root@localhost ~]# grep -q hello a.txt    ## -q选项表示静默输出

[root@localhost ~]# echo $?              ## 输出0表示匹配成功
0
```

```bash
#判断是否查找到hello文字，如果有则输出yes，没有则输出no;使用静默输出
[root@localhost ~]# if grep -q hello a.txt ; then echo yes;else echo no; fi 
yes

[root@localhost ~]# if grep -q word a.txt; then echo yes; else echo no; fi
no
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171025290.gif)


