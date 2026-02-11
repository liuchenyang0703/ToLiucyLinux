---
title: RabbitMQ常见面试题
icon: redis
order: 1
category:
  - 面试题
tag:
  - RabbitMQ常见面试题
  - 运维
date: 2026-02-11
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1、RabbitMQ 有哪些安全机制？

*   认证：内置数据库/LDAP/HTTP
*   授权：Vhost级别权限控制
*   SSL/TLS：加密通信
*   防火墙：限制端口访问(5672/15672等)

## 2、什么是 RabbitMQ？它的核心组件是什么？

*   生产者(Producer)：发送消息的应用
*   消费者(Consumer)：接收消息的应用
*   队列(Queue)：存储消息的缓冲区
*   交换机(Exchange)：接收生产者消息并路由到队
*   绑定(Binding)：交换机和队列之间的规则连接
*   虚拟主机(Vhost)：隔离的环境单元

## 3、如何确保消息不丢失？  
生产者确认机制、消息持久化、消费者手动ACK

## 4、RabbitMQ 有哪些常见的性能瓶颈？如何解决？

*   磁盘 I/O：使用SSD，分离数据和日志磁盘
*   内存：增加内存，监控内存使用(rabbitmqctl status)
*   CPU：优化交换机类型(避免复杂路由)
*   网络：减少小消息，启用消息压缩

## 5、如何创建和管理用户权限？

*   创建用户：rabbitmqctl add\_user myuser mypassword
*   设置权限：rabbitmqctl set\_permissions -p /myvhost myuser "._" "._" ".\*"
*   设置标签(角色)：rabbitmqctl set\_user\_tags myuser administrator