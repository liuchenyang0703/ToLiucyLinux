---
title: Prometheus常见面试题
icon: prometheus
order: 1
category:
  - 面试题
tag:
  - Prometheus常见面试题
  - 运维
date: 2026-02-07
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1、Prometheus 的核心组件有哪些？  
答：

*   Prometheus Server：负责数据收集、存储和查询。
*   Client Libraries：用于在应用程序中埋点，暴露指标数据。
*   Pushgateway：用于支持短生命周期任务的指标推送。
*   Exporters：将第三方系统的指标暴露给 Prometheus。
*   Alertmanager：处理警报通知和去重。

## 2、Alertmanager 的主要功能是什么？  
答；Alertmanager 负责处理 Prometheus 发送的警报，支持以下功能：

*   去重：合并相同或相似的警报。
*   分组：将相关警报合并为一个通知。
*   路由：根据规则将警报发送到不同的接收者（如邮件、Slack）。
*   静默：临时屏蔽特定警报。

## 3、Prometheus 的数据模型是什么？  
答：Prometheus 使用时间序列数据模型，每个时间序列由以下部分组成：

*   指标名称（Metric Name）：描述指标的类别（如 http\_requests\_total）。
*   标签（Labels）：键值对，用于标识时间序列的维度（如 method="GET"）。
*   时间戳（Timestamp）：数据点的时间。
*   样本值（Sample Value）：数据点的值。

## 4、Prometheus 的查询语言是什么？  
答：PromQL，用于查询和分析时间序列数据

## 5、什么是 Pushgateway？  
答：Pushgateway 用于支持短生命周期任务的指标推送。任务将指标推送到 Pushgateway，Prometheus 再从 Pushgateway 拉取数据。
