---
title: Mysql常见面试题
icon: mysql
order: 1
category:
  - 面试题
tag:
  - Mysql常见面试题
  - 运维
date: 2026-02-07
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1、查看当前库和表的命令

## 2、mysql的增删查改的命令

## 3、索引的作用是什么？

答：加快查询的速度。

## 4、简述下MysQL中的事物

答：事务就是由一组SQL语句组成的，保证一组SQL语句要么全部执行成功，要么全部执行失败，以此维护数据的完整性。

## 5、事务中的四个特性都是什么？

答： (Atomicity) 原子性、(Consistency) 一致性、 (Isolation) 隔离性、 (Durability) 持久性

*   原子性（Atomicity）：事务中的操作要么全部成功，要么全部失败。
*   一致性（Consistency）：事务执行前后，数据库的状态保持一致。
*   隔离性（Isolation）：多个事务并发执行时，彼此隔离。
*   持久性（Durability）：事务提交后，数据永久保存。

## 6、InnoDB和MyISAM存储引擎的区别

答：

*   InnoDB：支持事务、行级锁和外键，适用于大多数场景。
*   MyISAM：不支持事务和行级锁，但查询性能较高，适用于读密集型场景。  
    ![](https://i-blog.csdnimg.cn/img_convert/8c7e8c864ce18e16eeb958f44388fd34.png)

## 7、MySQL 的日志类型有哪些？  
答：  
错误日志（Error Log）：记录 MySQL 运行时的错误信息。  
查询日志（General Log）：记录所有 SQL 查询。  
慢查询日志（Slow Query Log）：记录执行时间超过阈值的查询。  
二进制日志（Binary Log）：记录所有写操作，用于复制和恢复。  
重做日志（Redo Log）：InnoDB 用于崩溃恢复。

## 8、MySQL 的隔离级别有哪些？  
答：MySQL 支持以下隔离级别：

*   读未提交（Read Uncommitted）：最低级别，可能读到未提交的数据。
*   读已提交（Read Committed）：只能读到已提交的数据。
*   可重复读（Repeatable Read）：默认级别，保证同一事务中多次读取结果一致。
*   串行化（Serializable）：最高级别，完全隔离事务。
*   可以通过 SET TRANSACTION ISOLATION LEVEL 设置隔离级别。

## 9、如何解决著主从复制中断问题？  
常见原因：

*   主从数据不一致
*   网络中断
*   主库二进制日志被清理  
    解决方法：
*   跳过错误(谨慎使用)：SET GLOBAL sql\_slave\_skip\_counter = 1; START SLAVE;
*   重新配置复制：STOP SLAVE; CHANGE MASTER TO ...; START SLAVE;

## 10、主库宕机后如何提升从库为新主库？

*   确认从库数据最新
*   停止复制：STOP SLAVE;
*   重置从库：RESET SLAVE ALL; (8.0+) 或 RESET MASTER;
*   启用写入：SET GLOBAL read\_only = OFF;
*   重配其他从库指向新主库
