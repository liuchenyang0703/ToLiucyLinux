---
title: MySQL5.7和MySQL8对比
icon: circle-info
order: 3
category:
  - 数据库
tag:
  - 数据库
date: 2023-11-19 23:54:31
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
---

# MySQL5.7和MySQL8对比分析

## 1.前言

大家好，我是Leo哥🫣🫣🫣，昨天有人问道：Leo哥，MySQL8安装咱也会了，绿色版，嘎嘎一顿操作，简单粗暴。能讲讲关于MySQL5.7和MySQL8之间的区别吗。于是就有了今天这篇文章。好了，话不多说让我们开始吧😎😎😎。



## 2.概览

Oracle发布新版本的MySQL时，直接从5.7.x 跳到了 8.0，可谓是一个大的版本跳跃，当然也可以从侧面反映，这里面的功能会有不少的变化，新版本的MySQL增加了不少的亮点。

总体来说，各个业务表存储引擎为InnoDB的mysql 5.7在使用语法上和mysql 8.0差别不大，官方表示 MySQL 8 要比 MySQL 5.7 快 2 倍，还带来了大量的改进和更快的性能。



## 3.MySQl8新增功能

下面我们先通过两种图来看一下关于MySQL8中**性能升级(图一)**和**Nosql文档升级(图二)**

![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311161014703.png)



![](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311161015134.png)

1. 性能： MySQL 8.0 在以下方面带来了更好的性能：读/写工作负载、IO 密集型工作负载、以及高竞争(”hot spot”热点竞争问题)工作负载。
2. NoSQL：MySQL 从 5.7 版本开始提供 NoSQL 存储功能，目前在 8.0 版本中这部分功能也得到了更大的改进。该项功能消除了对独立的 NoSQL 文档数据库的需求，而 MySQL 文档存储也为 schema-less 模式的 JSON 文档提供了多文档事务支持和完整的 ACID 合规性。
3. 窗口函数(Window Functions)：从 MySQL 8.0 开始，新增了一个叫窗口函数的概念，它可以用来实现若干新的查询方式。窗口函数与 SUM()、COUNT() 这种集合函数类似，但它不会将多行查询结果合并为一行，而是将结果放回多行当中。即窗口函数不需要 GROUP BY。
4. 隐藏索引：在 MySQL 8.0 中，索引可以被“隐藏”和“显示”。当对索引进行隐藏时，它不会被查询优化器所使用。我们可以使用这个特性用于性能调试，例如我们先隐藏一个索引，然后观察其对数据库的影响。如果数据库性能有所下降，说明这个索引是有用的，然后将其“恢复显示”即可；如果数据库性能看不出变化，说明这个索引是多余的，可以考虑删掉。
5. 降序索引：MySQL 8.0 为索引提供按降序方式进行排序的支持，在这种索引中的值也会按降序的方式进行排序。
6. 通用表表达式(Common Table Expressions CTE)：在复杂的查询中使用嵌入式表时，使用 CTE 使得查询语句更清晰。
7. UTF-8 编码：从 MySQL 8 开始，使用 utf8mb4 作为 MySQL 的默认字符集。
8. JSON：MySQL 8 大幅改进了对 JSON 的支持，添加了基于路径查询参数从 JSON 字段中抽取数据的 JSON_EXTRACT() 函数，以及用于将数据分别组合到 JSON 数组和对象中的 JSON_ARRAYAGG() 和 JSON_OBJECTAGG() 聚合函数。
9. 可靠性：InnoDB 现在支持表 DDL 的原子性，也就是 InnoDB 表上的 DDL 也可以实现事务完整性，要么失败回滚，要么成功提交，不至于出现 DDL 时部分成功的问题，此外还支持 crash-safe 特性，元数据存储在单个事务数据字典中。
10. 高可用性(High Availability)：InnoDB 集群为您的数据库提供集成的原生 HA 解决方案。



## 4.细节处理

### 4.1细节1：

比如我们在MySQL 5.7版本中全面推行GTID，所以之前的create table xxx as select * from xx的使用模式就不奏效了，进而我们建议使用：

```sql
create table xxx like xxxxx; 
 
insert into xxx select * from xxxxx; 
```

这种使用模式，而MySQL8.0带来的很多特性是在体验和性能改造方面，原来不建议使用的模式竟然可以支持了，而很多业务侧是后知后觉，原本已经培养的习惯，让我们有些凌乱。

### 4.2细节2：

在MySQL 5.7中字段名为rank是可以的，但是在8.0中因为有了窗口函数，字段名为rank就报错，顺着这个思路，其实我们一窥窗口函数。

### 4.3细节3：

这里顺便吐槽下airflow的表结构配置

airflow的一个表结构在MySQL 5.7中如下：

```sql
CREATE TABLE kube_resource_version 
(one_row_id BOOL NOT NULL DEFAULT true, resource_version VARCHAR(255), 
PRIMARY KEY (one_row_id), 
CONSTRAINT kube_resource_version_one_row_id CHECK (one_row_id), 
CHECK (one_row_id IN (0, 1))); 
Query OK, 0 rows affected (0.06 sec) 
在MySQL中其实会被默认转换为如下的表结构： 
CREATE TABLE `kube_resource_version` ( 
  `one_row_id` tinyint(1) NOT NULL DEFAULT '1', 
  `resource_version` varchar(255) DEFAULT NULL, 
  PRIMARY KEY (`one_row_id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8; 
1.2.3.4.5.6.7.8.9.10.11.12.
```

如果查看在线业务的实际数据如下：

```sql
mysql> select * from kube_resource_version; 
+------------+------------------+ 
| one_row_id | resource_version | 
+------------+------------------+ 
|          1 |                  | 
+------------+------------------+ 
1 row in set (0.01 sec) 
```

看起来这个boolean类型真是有些鸡肋，在数据库中已经默认使用tinyint(1)来间接转义了，但是实际上还是不对味。

带来的问题是在MySQL 5.7中可以成功创建，但是在8.0会报错：

```sql
CREATE TABLE kube_resource_version (one_row_id BOOL NOT NULL DEFAULT true, resource_version VARCHAR(255), PRIMARY KEY (one_row_id), CONSTRAINT kube_resource_version_one_row_id CHECK (one_row_id), CHECK (one_row_id IN (0, 1))); 
ERROR 3812 (HY000): An expression of non-boolean type specified to a check constraint 'kube_resource_version_one_row_id'. 
1.2.
```

而经过分析，其实8.0的报错提示更加合理，至少我觉得8.0对于数据层面的要求确实变高了。



## 5.其他差异

### 5.1 int字段类型的差异

比如下面的建表语句，在 5.7 能正常执行：

```javascript
CREATE TABLE `t1` ( 
`id` int(11) NOT NULL auto_increment,
`a` int(11) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

但是在 8.0.17 开始后的版本，执行上面的建表语句，会有如下 warnings：

```javascript
Integer display width is deprecated and will be removed in a future release.
```

在上面的建表语句中，int(11) 中的 11 表示最大显示宽度，从 MySQL 8.0.17 开始，int 类型就不推荐使用显示宽度这个属性了。因此 8.0 建议使用单独的 int 来定义整数数据类型，如下：

```javascript
CREATE TABLE `t1` ( 
`id` int NOT NULL auto_increment,
`a` int DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 5.2 创建用户和赋权差异

MySQL 5.7，可以直接使用 grant 命令，用户和赋权都能完成。

```javascript
grant select on test.* to 'test_user'@'127.0.0.1' identified by 'ddafsduGdsag';
```

8.0 版本下不 create user 的情况下执行 grant 会报如下错误：

```javascript
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'identified by 'ddafsduGdsag'' at line 1
```

因此 MySQL 8.0 如果需要创建用户并赋权，必须要先 create user，再执行 grant 命令，操作如下：

```javascript
create user 'test_user'@'127.0.0.1' identified with mysql_native_password by 'ddafsduGdsag'; 
grant select on test.* to 'test_user'@'127.0.0.1';
```



## 6.MySQL下载

最后附上MySQL5.7版本以及MySQL8版本的下载，大家按需下载吧。

**MySQL5.7：** [5.7](https://cdn.mysql.com/archives/mysql-installer/mysql-installer-community-5.7.26.0.msi)

**MySQL8：** [8](https://cdn.mysql.com//Downloads/MySQLInstaller/mysql-installer-community-8.0.25.0.msi)

## 7.参考文献

- https://www.mysql.com/cn/why-mysql/

- https://www.jianshu.com/p/bc13c572c517
- https://dev.mysql.com/doc/refman/8.0/en/nested-loop-joins.html
- https://zhuanlan.zhihu.com/p/58706113



## 8.总结

以上便是本文的全部内容，本人才疏学浅，文章有什么错误的地方，欢迎大佬们批评指正！我是**Leo**，一个在互联网行业的小白，立志成为更好的自己。

如果你想了解更多关于**Leo**，可以关注公众号-程序员Leo，后面文章会首先同步至公众号。



![ToLeoJavaer公众号 (微信搜索程序员Leo)](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311161025910.png)



