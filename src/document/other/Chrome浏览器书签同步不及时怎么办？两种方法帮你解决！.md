---
title: Chrome浏览器书签同步不及时怎么办？两种方法帮你解决！
icon: circle-info
order: 5
category:
  - 其他技术
tag:
  - 谷歌
pageview: false
date: 2023-08-29
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



手动强制同步chrome浏览器书签有2种方法：

## 方法一：

地址栏输入：[chrome://sync-internals](chrome://sync-internals)
中间那列中下方，点击“`Request Start`”，意思是同步开启自启。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/5a939548f080f4d1300777cba08abbb9.png)

重启浏览器

如果还有问题再试试 [方法二。](#click_me_jump)




## 方法二：


<span id="click_me_jump">地址栏输入：[chrome://sync-internals](chrome://sync-internals)</span>
chrome://sync 点 `Trigger GetUpdates`
如果不行的话，重启chrome再重复以上操作，附图如下：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1e139fb8c806af1718a1222933874631.png)

>还是不行的话，就重新登录一下谷歌账号，开启同步功能。（需要开启 VPN）



## 内容参考：

>  本文内容参考与：[https://blog.csdn.net/qq_35956041/article/details/108425233](https://blog.csdn.net/qq_35956041/article/details/108425233)

