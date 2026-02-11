---
title: ELK常见面试题
icon: circle-info
order: 1
category:
  - 面试题
tag:
  - ELK常见面试题
  - 运维
date: 2026-02-011
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1、什么是 ELK Stack  
Elasticsearch：分布式搜索和分析引擎，用于存储和检索数据。  
Logstash：数据收集和处理管道，用于解析、转换和传输数据。  
Kibana：数据可视化工具，用于展示和分析 Elasticsearch 中的数据。

## 2、如何优化 Elasticsearch 的性能？  
分片和副本：合理设置分片和副本数量。  
硬件配置：使用 SSD、增加内存和 CPU。  
索引优化：定期删除旧索引，使用索引生命周期管理（ILM）。  
查询优化：避免复杂的查询，使用缓存。

## 3、什么是 Elasticsearch 的倒排索引？  
答：倒排索引是 Elasticsearch 的核心数据结构，用于快速查找包含特定词项的文档。它由词项到文档的映射组成，支持高效的全文搜索。

## 4、Kibana 如何与 Elasticsearch 集成？  
答：Kibana 通过 RESTful API 与 Elasticsearch 通信。在 Kibana 配置文件中指定 Elasticsearch 的地址

## 5、如何实现es索引日志的归档和清理？  
答：使用索引生命周期管理（ILM）自动归档和删除旧索引。或者手动删除旧索引：

## 6、什么是 Beats？  
答：Beats 是轻量级的数据收集器，用于将数据发送到 Elasticsearch 或 Logstash。常见的 Beats 包括：

*   Filebeat：收集日志文件。
*   Metricbeat：收集系统和服务指标。
*   Packetbeat：收集网络流量数据。