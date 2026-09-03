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
isOriginal: true
pageview: true
article: false
breadcrumb: false
comment: true
---

## 1、Prometheus 的核心组件有哪些？  
答：

*   Prometheus Server：负责数据收集、存储和查询。
*   Client Libraries：用于在应用程序中埋点，暴露指标数据。
*   Pushgateway：用于支持短生命周期任务的指标推送。
*   Exporters：将第三方系统的指标暴露给 Prometheus。
*   Alertmanager：处理警报通知和去重。

> Prometheus 采用 **Pull 模式** 采集数据，这是与其他监控系统（如 Zabbix、InfluxDB）的主要区别。

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

> **适用场景**：批处理任务、定时任务、无服务发现能力的短期任务
>
> **注意事项**：Pushgateway 不是队列，数据会持久化到磁盘，需自行清理过期指标，否则会造成数据混乱

## 6、Prometheus 的抓取（Scrape）机制是怎样的？

**答：**
- **Pull 模式**：Prometheus 主动从目标端点拉取指标数据
- **服务发现**：支持多种服务发现机制（Kubernetes、Consul、DNS、文件等）自动发现目标
- **抓取配置**：通过 `scrape_configs` 定义抓取目标、间隔、超时等参数
- **指标格式**：默认使用 OpenMetrics/Prometheus 文本格式，通过 HTTP `/metrics` 端点暴露

## 7、Prometheus 的存储机制是怎样的？

**答：**
- **本地存储**：使用自定义的 TSDB（Time Series Database）
- **存储结构**：
  - **内存**：最近 2 小时数据存储在内存中（可配置）
  - **磁盘**：数据按 2 小时块（block）压缩存储，默认保留 15 天
- **远程存储**：支持 Remote Write/Read 对接 Thanos、VictoriaMetrics、InfluxDB 等扩展长期存储

## 8、Prometheus 的四种指标类型是什么？

**答：**

| 类型          | 说明                                       | 示例                     |
| ------------- | ------------------------------------------ | ------------------------ |
| **Counter**   | 单调递增计数器，只能增加或重置为0          | http_requests_total      |
| **Gauge**     | 可增可减的瞬时值                           | cpu_usage, memory_usage  |
| **Histogram** | 采样分布，包含桶计数、总和、数量           | request_duration_seconds |
| **Summary**   | 类似 Histogram，但计算分位数（客户端计算） | request_latency_seconds  |

## 9、Counter 和 Gauge 的区别是什么？

**答：**
- **Counter**：累计值，只增不减（除非进程重启），适合统计请求总数、错误总数等
- **Gauge**：瞬时值，可增可减，适合统计温度、内存使用率、当前连接数等
- **查询差异**：Counter 通常配合 `rate()` 或 `increase()` 函数使用，Gauge 可直接查询

## 10、rate() 和 irate() 的区别是什么？

**答：**
- **`rate(range_vector)`**：计算每秒平均变化率，基于范围向量第一个和最后一个样本
  - 适合平稳变化的指标，对异常值不敏感
- **`irate(range_vector)`**：计算瞬时变化率，基于范围向量最后两个样本
  - 更灵敏，适合快速变化的指标，但可能产生尖峰

## 11、Prometheus 如何实现高可用？

**答：**
- **Server 层**：部署多个 Prometheus 实例，配置相同的抓取目标（联邦或副本）
- **Alertmanager 层**：部署 Alertmanager 集群，配置 Gossip 协议实现状态同步
- **存储层**：使用 Remote Write 写入外部存储（Thanos、VictoriaMetrics、Cortex）
- **查询层**：Thanos Query 或 VictoriaMetrics 实现全局查询视图

## 12、什么是 Recording Rule 和 Alerting Rule？

**答：**
- **Recording Rule**：预计算复杂查询，将结果存储为新的时间序列，提升查询性能
- **Alerting Rule**：定义告警条件，当条件满足时发送告警到 Alertmanager
- **配置位置**：通常放在 `prometheus.yml` 引用的规则文件中

```yaml
# Recording Rule 示例
groups:
  - name: example
    rules:
      - record: job:http_requests:rate5m
        expr: sum(rate(http_requests_total[5m])) by (job)
        
# Alerting Rule 示例
      - alert: HighRequestLatency
        expr: job:http_requests:rate5m > 100
        for: 10m
        labels:
          severity: warning
```

## 13、Prometheus 的 `up` 指标有什么作用？

**答：**
- **自动生成的指标**：每个抓取目标都会自动生成 `up` 指标
- **取值含义**：
  - `up == 1`：抓取成功，目标健康
  - `up == 0`：抓取失败，目标异常
- **常见用途**：监控目标可用性，作为最基础的存活告警

## 14、如何解决 Prometheus 单点性能瓶颈？

**答：**
- **水平扩展**：按业务/环境拆分多个 Prometheus 实例（联邦架构）
- **减少指标**：优化抓取频率、减少标签基数、丢弃无用指标
- **Recording Rule**：预计算常用查询，减少实时计算压力
- **远程存储**：将历史数据 offload 到外部存储
- **使用 Thanos/Cortex/VictoriaMetrics**：实现真正的分布式存储和查询

## 15、标签（Label）基数过高会带来什么问题？如何解决？

**答：**
- **问题**：
  - 内存占用激增（每个唯一标签组合都是一个时间序列）
  - 查询性能下降
  - 存储膨胀
- **解决方案**：
  - 避免将用户 ID、订单 ID 等高基数字段作为标签
  - 使用 `_bucket` 等聚合方式替代
  - 设置 `sample_limit` 限制单目标样本数
  - 使用 `metric_relabel_configs` 丢弃高基数标签

## 16、Prometheus 的联邦（Federation）是什么？

**答：**
- **定义**：多个 Prometheus 实例之间进行数据聚合的机制
- **用途**：
  - 实现分层架构（边缘节点 → 中心节点）
  - 跨集群聚合关键指标
- **配置**：在联邦节点配置抓取其他 Prometheus 的 `/federate` 端点

## 17、如何排查 Prometheus 抓取失败的问题？

**答：**
1. 检查目标 `up` 指标是否为 0
2. 查看 Prometheus 日志和 Targets 页面错误信息
3. 手动 `curl` 测试 `/metrics` 端点是否可达
4. 检查网络连通性和防火墙策略
5. 验证抓取配置（scrape_interval、scheme、tls_config 等）
6. 检查目标应用是否正确暴露指标

## 18、Prometheus 与 Grafana 的关系是什么？

**答：**
- **Prometheus**：负责数据采集、存储、告警规则计算
- **Grafana**：可视化工具，通过 Prometheus 数据源查询展示图表
- **关系**：Grafana 是 Prometheus 的可视化层，Prometheus 也可独立运行

## 19、什么是 ServiceMonitor（Prometheus Operator 中）？

**答：**
- **CRD 资源**：Prometheus Operator 提供的自定义资源
- **作用**：声明式定义需要监控的服务和抓取配置
- **优势**：
  - 无需修改 Prometheus 主配置
  - 应用团队自主定义监控目标
  - 支持标签选择器动态发现目标

## 20、Prometheus 的内存使用过高如何排查？

**答：**
- **查看 head series**：`prometheus_tsdb_head_series` 指标
- **分析高基数指标**：`topk(10, count by (__name__)({__name__=~".+"}))`
- **检查目标数量**：是否抓取了大量目标
- **调整参数**：
  - `--storage.tsdb.min-block-duration`
  - `--storage.tsdb.retention.time`
  - `--query.max-samples`

## 21、Prometheus 的 relabel_config 有哪些应用场景？

**答：**
- **标签重写**：修改、添加、删除标签（如统一命名规范）
- **目标过滤**：通过 `drop`/`keep`  action 筛选特定目标
- **目标替换**：使用 `replace` 修改 `__address__` 等内置标签
- **路径重写**：调整 metrics 路径（如 `__metrics_path__`）
- **常用内置标签**：`__address__`、`__scheme__`、`__metrics_path__`、`__param_<name>`

```yaml
metric_relabel_configs:
  - source_labels: [__name__]
    regex: 'go_.*'
    action: drop  # 丢弃 Go 运行时指标
```

## 22、Prometheus 的 scrape_timeout 和 scrape_interval 如何设置？

**答：**
- **scrape_interval**：抓取间隔，默认 1m
  - 高频指标：15s-30s
  - 低频指标：1m-5m
- **scrape_timeout**：单次抓取超时，必须小于 scrape_interval
  - 建议设置为 `scrape_interval` 的 80%（如 interval=30s，timeout=25s）
- **全局 vs 局部**：全局配置可被 job 级别覆盖

## 23、如何处理 Prometheus 的"查询超时"或"内存不足"问题？

**答：**
- **查询优化**：
  - 缩小时间范围
  - 使用 Recording Rule 预计算复杂查询
  - 避免高基数标签的 `group by`
- **参数调整**：
  - `--query.timeout`：查询超时时间（默认 2m）
  - `--query.max-samples`：限制最大样本数
  - `--storage.tsdb.max-block-duration`
- **硬件扩容**：增加内存、使用 SSD
- **架构优化**：拆分 Prometheus 实例，使用 Thanos 联邦查询

## 24、Prometheus 的 `__name__` 标签是什么？

**答：**
- **特殊保留标签**：代表指标名称本身
- **查询用法**：
  - `{__name__=~"http_.*"}` 匹配所有 http 开头的指标
  - `count({__name__=~".+"}) by (__name__)` 统计指标数量
- **注意**：指标名称中不能包含冒号（`:`），冒号保留给 Recording Rule 使用

## 25、什么是 Exemplar？Prometheus 如何支持链路追踪关联？

**答：**
- **Exemplar**：带有 Trace ID 的样本点，用于关联指标和分布式追踪
- **作用**：在 Grafana 中点击数据点可直接跳转到对应的 Trace（如 Jaeger）
- **要求**：
  - Prometheus 2.26+ 支持
  - 应用 SDK 需注入 Trace ID（如 OpenTelemetry）
  - Histogram 指标支持添加 Exemplar

```text
# 查看带有 exemplar 的 histogram
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))
```

## 26、Prometheus 的 WAL（Write-Ahead Log）是什么作用？

**答：**
- **作用**：保证数据持久性和崩溃恢复
- **机制**：
  - 内存中的数据先写入 WAL，再定期刷盘到 block
  - 进程崩溃后，通过 WAL 恢复未持久化的数据
- **相关参数**：
  - `--storage.tsdb.wal-compression`：启用 WAL 压缩
  - `--storage.tsdb.min-block-duration`：控制刷盘频率

## 27、如何监控 Prometheus 自身的健康状态？

**答：**
- **内置指标**：
  - `prometheus_tsdb_head_series`：内存中时间序列数量
  - `prometheus_tsdb_symbol_table_size_bytes`：符号表大小
  - `prometheus_engine_queries`：正在执行的查询数
  - `prometheus_target_scrapes_exceeded_sample_limit_total`：超限样本数
- **告警规则**：
  - 内存使用率 > 80%
  - 查询队列堆积
  - 目标抓取失败率 > 5%

## 28、Prometheus 与 Thanos 的架构差异是什么？

**答：**

| 特性     | Prometheus             | Thanos                            |
| -------- | ---------------------- | --------------------------------- |
| 存储     | 本地磁盘，默认15天     | 对象存储（S3/GCS），长期存储      |
| 高可用   | 多实例副本，数据不共享 | Sidecar + Store Gateway，全局视图 |
| 查询     | 单实例查询             | Query 组件聚合多实例数据          |
| 压缩     | 2小时 block            | Compactor 组件压缩、降采样        |
| 规则计算 | 本地执行               | Ruler 组件分布式执行              |

## 29、什么是 Prometheus 的"高基数问题"（High Cardinality）？

**答：**

- **定义**：唯一时间序列数量爆炸式增长（通常 > 100万 series）
- **常见原因**：
  - 将用户 ID、IP 地址、订单号作为标签
  - 未限制的 `status_code` 标签（如包含完整错误信息）
- **危害**：内存 OOM、查询缓慢、启动变慢
- **解决**：
  - 使用 `honor_labels: false` 避免冲突
  - `sample_limit` 限制单目标样本数
  - `metric_relabel_configs` 丢弃/替换高基数标签

## 30、Prometheus Operator 中的 PrometheusRule 是什么？

**答：**
- **CRD 资源**：声明式定义告警规则和 Recording Rule
- **优势**：
  - 规则与 Prometheus 解耦，独立管理
  - 支持标签选择器自动关联到 Prometheus 实例
  - GitOps 友好，可版本控制
- **组成**：包含 `groups` -> `rules`（alert 或 record）

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: example-rules
spec:
  groups:
    - name: node
      rules:
        - alert: NodeDown
          expr: up{job="node-exporter"} == 0
          for: 5m
```

## 31、Prometheus 的 `honor_labels` 和 `honor_timestamps` 配置有什么用？

**答：**
- **honor_labels**（默认 false）：
  - `false`：Prometheus 自动添加 `exported_` 前缀解决标签冲突
  - `true`：保留目标暴露的原始标签值（适用于联邦场景）
- **honor_timestamps**（默认 true）：
  - `true`：使用目标暴露的时间戳
  - `false`：使用 Prometheus 抓取时的时间戳（解决时钟漂移问题）

## 32、如何排查"target is down"但服务正常的问题？

**答：**
排查步骤：
1. **网络层**：`curl -v http://target:port/metrics` 测试连通性
2. **认证层**：检查 `bearer_token`、`tls_config`、`basic_auth`
3. **路径层**：确认 `metrics_path` 不是 `/` 或自定义路径
4. **防火墙**：检查安全组、iptables、NetworkPolicy
5. **DNS**：使用 IP 替代 hostname 测试是否为 DNS 问题
6. **Prometheus 日志**：查看 `scrape err` 具体错误信息

## 33、Prometheus 的 `external_labels` 有什么作用？

**答：**
- **作用**：为所有发出的数据（Remote Write、Alert、联邦）添加全局标签
- **典型用途**：
  - 标识数据来源（`cluster: prod`, `region: cn-north-1`）
  - 区分多 Prometheus 实例的数据
  - Alertmanager 路由时区分来源

```yaml
global:
  external_labels:
    cluster: 'k8s-prod-01'
    replica: 'A'
```

## 34、Prometheus 的 `scrape_limit` 和 `sample_limit` 区别？

**答：**
| 配置             | 作用层级    | 说明                                         |
| ---------------- | ----------- | -------------------------------------------- |
| `scrape_limit`   | 不存在      | 没有这个配置项 ❌                             |
| `sample_limit`   | 单个 target | 限制单个目标返回的样本数，超限则整个抓取失败 |
| `scrape_configs` | 抓取配置    | 定义如何发现、抓取目标                       |
| `scrape_timeout` | 单次抓取    | 单次 HTTP 请求超时时间                       |

> 注意：没有 `scrape_limit`，只有 `sample_limit`（在 `scrape_config` 下配置）

## 35、VictoriaMetrics 与 Prometheus 的对比？

**答：**

| 维度     | Prometheus       | VictoriaMetrics         |
| -------- | ---------------- | ----------------------- |
| 架构     | 单节点（+联邦）  | 单节点或集群            |
| 存储效率 | 一般             | 高（压缩比 10:1）       |
| 查询性能 | 中等             | 高（优化过的存储引擎）  |
| 协议兼容 | 标准             | 完全兼容 Prometheus API |
| 资源占用 | 较高             | 较低                    |
| 水平扩展 | 需 Thanos/Cortex | 原生支持                |
| 适用场景 | 中小规模         | 大规模、长期存储        |

