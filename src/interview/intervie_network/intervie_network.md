---
title: 网络常见面试题
icon: circle-info
order: 1
category:
  - 面试题
tag:
  - 网络常见面试题
  - 运维
date: 2026-02-07
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1、tcp与udp的区别？

答：他俩都是传输协议，基于连接与无连接；对系统资源的要求（TCP较多，UDP少）；TCP保证数据完整性，UDP可能丢包；

## 2、讲下网络7层模型OSI都有哪些？

答：OSI 七层模型架构图  
![](https://i-blog.csdnimg.cn/img_convert/ef61dd665ce78387e3d4ed78590dc7f8.png)

## 3、简述下路由的过程

答：当路由器收到一个报文时，会找出目的IP地址，通过目的IP与自己的路由表进行匹配，根据路由条目的指示决定出接口及下一跳IP。

## 4、路由表的组成部分有哪些？

答：目的IP、掩码、路由协议、优先级、开销，下一跳IP及下一跳出接口。

## 5、怎么查看路由表？

答：dis ip routing
