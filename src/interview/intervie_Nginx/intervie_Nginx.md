---
title: Nginx常见面试题
icon: circle-info
order: 1
category:
  - 面试题
tag:
  - Nginx常见面试题
  - 运维
date: 2026-02-07
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1、什么是正向代理和反向代理？

答：正向代理就是一个人发送一个请求直接就到达了目标的服务器；反方代理就是请求统一被Nginx接收，nginx反向代理服务器接收到之后，按照一定的规 则分发给了后端的业务处理服务器进行处理了

## 2、nginx中的location主要作用是什么？

答：location就是根据用户请求的URI来执行不同的应用，也就是根据用户请求的网站URL进行匹配，匹配成功即进行相关的操作。

## 3、什么是动静分离？

答：将动态请求和静态请求区分访问，静态由Nginx处理, 动态由PHP处理或Tomcat处理。

## 4、Nginx负载均衡是基于那个模块来实现的？

答：upstream

## 5、Nginx中负载均衡算法策略里常用的都有哪些？

答：轮询、权重、ip\_hash

## 6、Nginx 的日志在那个模块下配置？

答：在 http 或 server 块中配置日志

## 7、Nginx 的 location 块有哪些匹配规则？  
答：

*   精确匹配：location = /path。
*   前缀匹配：location /path。
*   正则匹配：location ~ .php$。
*   优先顺序：精确匹配 > 前缀匹配（最长匹配） > 正则匹配。

## 8、优化 Nginx 的性能可以从哪里入手  
答：调整工作进程数、使用高效的epoll事件模型、启用 Gzip 压缩等

## 9、什么是 Nginx 的 rewrite 规则？  
使用 rewrite 指令实现 URL 重写；  
标志位

*   break：停止处理当前 rewrite；
*   redirect：302 临时重定向；
*   permanent：301 永久重定向；
