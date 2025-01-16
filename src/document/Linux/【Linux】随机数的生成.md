---
title: 【Linux】随机数的生成
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2024-12-18
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181612672.png)
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
## 生成随机数：默认为(0-32767)
```bash
echo $RANDOM
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181612388.png)

## 生成指定区间随机数：随机生成1-50之间的数

```bash
echo $((RANDOM%50+1))
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181612281.png)

## 随机生成时间戳秒和纳秒加密运算

```bash
date +%s%N | md5sum
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181612888.png)

## 生成一个随机字符指定10个在使用md5sum校验

```bash
head -c 10 /dev/random |md5sum
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181612845.png)

/dev/random是什么？

> /dev/random是一个随机数生成器设备文件，用于生成高质量的随机数。它通过收集系统上的环境噪声（例如硬件噪声，磁盘活动等）来产生随机数。由于它只在系统上有足够的环境噪声时才能生成随机数，因此/dev/random生成的随机数是高质量的。<br/>
>  
> 但是，/dev/random的主要缺点是，如果系统上的环境噪声不足，则会导致生成随机数的速度变慢，有时甚至会完全停止。这可能会导致某些应用程序无法正常工作，因为它们需要大量的随机数。

## 生成随机的UUID
UUID，通用识别唯一码。
让分布式系统的所有元素有唯一的辨识信息。
```bash
uuidgen
cat /proc/sys/kernel/random/uuid
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181611270.png)

## 加密算法
md5	报文摘要算法-->校验文件的完整性
md5sum 【文件名】

```bash
echo "123" | md5sum
```

CRC	循环冗余校验码-->sksum
echo "123" | sksum

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181611223.png)

## 相关文章
|文章名称|文章连接  |
|--|--|
[【Linux】Centos7 随机生成密码](https://liucy.blog.csdn.net/article/details/129922682)|[https://liucy.blog.csdn.net/article/details/129922682](https://liucy.blog.csdn.net/article/details/129922682)
|[【Linux】随机数的生成](https://liucy.blog.csdn.net/article/details/130387463)|[https://liucy.blog.csdn.net/article/details/130387463](https://liucy.blog.csdn.net/article/details/130387463)|


