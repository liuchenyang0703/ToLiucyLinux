---
title: Zabbix常见面试题
icon: zabbix
order: 1
category:
  - 面试题
tag:
  - Zabbix常见面试题
  - 运维
date: 2026-02-07
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1、zabbix分了三种架构？  
答案：  
server-client架构：也是zabbix的最简单的架构，监控机和被监控机之间不经过任何代理 ，直接由zabbix server和zabbix agentd之间进行数据交互。适用于网络比较简单，设备比较少的监控环境 。  
master-node-client架构：该架构是zabbix最复杂的监控架构，适用于跨网络、跨机房、设备较多的大型环境 。每个node同时也是一个server端，node下面可以接proxy，也可以直接接client 。node有自已的配置文件和数据库，其要做的是将配置信息和监控数据向master同步，master的故障或损坏对node其下架构的完整性。  
server-proxy-client架构：其中proxy是server、client之间沟通的一个桥梁，proxy本身没有前端，本身也并不存放数据，只是将agentd发来的数据暂时存放，然后再提交给server ；该架构经常是和master-node-client架构做比较的架构 ，一般适用跨机房、跨网络的中型网络架构的监控。

## 2、是Zabbix模板？它有什么作用？  
模板是预定义的监控项、触发器、图形等的集合；  
可以批量应用到多个主机，实现标准化监控配置；  
便于管理和维护；

## 3、如何添加一个新的主机到Zabbix监控系统中？  
通过Web界面导航到"配置"→"主机"→"创建主机"；  
填写主机名称、可见名称、所属组；  
添加接口(Agent, SNMP等)；  
关联模板；

## 4、如何优化Zabbix的性能？  
数据库优化(分区表、索引优化)；  
调整Housekeeper设置；  
使用Proxy分担负载；  
调整监控项更新间隔；  
使用主动式Agent检查；

## 5、Zabbix Agent无法连接，如何排查？  
检查Agent服务是否运行；  
检查网络连通性；  
检查防火墙设置；  
检查Zabbix Server和Agent配置文件中的Server/ServerActive参数；  
查看Agent日志；

## 6、Zabbix由哪些主要组件组成？  
Zabbix Server：Zabbix系统的中央处理单元  
Zabbix Agent：安装在监控目标上的数据采集代理  
Zabbix Proxy：分布式监控的中介节点  
Zabbix Web界面：系统管理配置和可视化的前端  
数据库(MySQL, PostgreSQL等)：存储所有监控配置和历史数据
