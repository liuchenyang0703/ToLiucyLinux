---
title: ELK常见面试题
icon: circle-info
order: 1
category:
  - 面试题
tag:
  - ELK常见面试题
  - 运维
date: 2026-02-11
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1、什么是 ELK Stack？它的数据流转流程是怎样的？

**答：**
- **Elasticsearch**：基于 Lucene 的分布式搜索与分析引擎，负责数据存储、索引和查询。
- **Logstash**：数据收集处理管道，具备 Input-Filter-Output 三段式处理能力，负责数据解析、过滤、富化。
- **Kibana**：可视化分析平台，提供 Discover、Dashboard、Alerting 等功能。

**数据流转流程：**
```
日志源(File/Log) → Beats/Logstash(Input) → Logstash(Filter) → Elasticsearch(Index) → Kibana(Query/Visualize)
```

**补充：** 现代架构中，Beats（轻量采集器）+ Logstash（复杂处理）+ Elasticsearch + Kibana 构成 **Elastic Stack**，Logstash 不再是必选项。

## 2、Elasticsearch 集群的节点类型有哪些？各自的作用是什么？

**答：** ES 节点按角色可分为：

| 节点类型            | 职责                                    | 生产建议                                        |
| ------------------- | --------------------------------------- | ----------------------------------------------- |
| **Master-eligible** | 负责集群元数据管理、索引创建、节点发现  | 至少 3 个，配置 `node.master: true`，不存储数据 |
| **Data**            | 存储索引数据，执行 CRUD、搜索、聚合操作 | 根据数据量横向扩展，可细分 Hot/Warm/Cold        |
| **Ingest**          | 预处理文档（类似轻量级 Logstash）       | 高写入场景前置，减轻 Data 节点压力              |
| **Coordinating**    | 仅负责请求路由和结果聚合                | 高并发查询场景，配置 `node.roles: []`           |
| **ML**              | 运行机器学习作业                        | 需要专用资源，默认开启                          |

**关键配置：**
```yaml
node.roles: [ master, data, ingest ]  # 生产环境建议单角色部署
```

## 3、如何优化 Elasticsearch 的写入性能？

**答：**

**1. 批量写入（Bulk API）**
- 使用 `_bulk` 接口批量提交，每批次 5-15MB 或 1000-5000 条文档。

**2. 索引层面优化**
```json
PUT /my_index/_settings
{
  "index": {
    "refresh_interval": "-1",        // 大批量导入时临时禁用刷新
    "number_of_replicas": 0,         // 导入完成后再设置为 1
    "translog.durability": "async"   // 降低持久化频率
  }
}
```

**3. 硬件与架构**
- 使用 SSD（NVMe 优先），内存与磁盘比至少 1:24。
- 部署专用 Ingest 节点或 Client 节点分担压力。

**4. Mapping 优化**
- 禁用 `_all` 字段（ES 6.0+ 已移除），对不需要检索的字段设置 `index: false`。

## 4、什么是 Elasticsearch 的倒排索引？为什么查询快？

**答：**

**倒排索引（Inverted Index）** 是 ES 的核心数据结构，与关系型数据库的正排索引（文档→词）相反，它建立 **词项→文档列表** 的映射。

**结构示例：**
```
Term      | Document Frequency | Posting List (DocId:Position)
---------|-------------------|-------------------------------
"elk"    | 2                 | Doc1:1, Doc3:5
"stack"  | 1                 | Doc1:2
```

**查询快的原理：**
1. **Term Dictionary**：词项字典使用 **FST（Finite State Transducer）** 压缩存储，内存占用小且查询复杂度 O(1)。
2. **Term Index**：词项索引存储在内存中，快速定位到词典位置。
3. **Posting List**：文档列表使用 **Roaring Bitmap** 或 **Frame of Reference** 压缩，交集/并集运算极快。
4. **Segment 合并**：Lucene 底层采用不可变段（Segment）设计，避免锁竞争，支持并发查询。

## 5、Elasticsearch 的分片（Shard）和副本（Replica）机制？如何规划？

**答：**

**分片机制：**
- **Primary Shard**：索引数据的原始分片，决定索引的最大容量（创建后不可更改）。
- **Replica Shard**：主分片的副本，提供高可用和读性能扩展。

**规划原则：**
1. **避免频繁刷盘**：单分片大小控制在 **20-50GB**，过大导致恢复慢，过小增加集群开销。
2. **分片数公式**：`分片数 = 数据节点数 × 1-3 倍`，单节点分片数不超过 20 个（堆内存 30GB 场景）。
3. **副本策略**：
   - 热数据：1 个副本（保证高可用）
   - 温/冷数据：0 个副本（节省存储）
   - 集群节点数 < 副本数时，集群状态会变为 Yellow

**查看分片分配：**
```bash
GET _cluster/allocation/explain
GET _cat/shards?v&s=index:desc
```

## 6、Kibana 如何与 Elasticsearch 集成？多集群场景如何配置？

**答：**

**基础集成：**
Kibana 通过 `kibana.yml` 配置 ES 地址：
```yaml
elasticsearch.hosts: ["http://es-node1:9200", "http://es-node2:9200"]
elasticsearch.username: "kibana_system"
elasticsearch.password: "your_password"
```

**多集群监控（Cross-Cluster Search）：**
1. **Remote Cluster 配置**：
```yaml
# elasticsearch.yml
cluster:
  remote:
    cluster_one:
      seeds: ["192.168.1.10:9300"]
```

2. **Kibana 中创建 Index Pattern** 时使用 `*:*` 或指定 `cluster_one:logstash-*` 查询远程集群。

**安全集成：** 开启 X-Pack Security 后，Kibana 需配置 TLS 证书和角色映射（Role Mapping）。

## 7、什么是 Beats？Filebeat 的 Registry 机制是什么？

**答：**

**Beats** 是轻量级数据采集器，基于 Go 语言编写，资源占用极低（CPU < 1%, 内存 < 100MB）。主要类型：
- **Filebeat**：日志文件采集（支持多行合并、背压机制）
- **Metricbeat**：系统指标（CPU/内存/磁盘）和服务指标（Redis/MySQL）
- **Packetbeat**：网络流量分析（L4/L7 协议解析）
- **Heartbeat**：Uptime 监控（ICMP/TCP/HTTP 探测）

**Filebeat Registry 机制：**
- 文件路径：`/var/lib/filebeat/registry/`
- 作用：记录每个日志文件的 **inode**、**偏移量（offset）** 和 **状态**，确保服务重启后从断点续传，避免数据丢失或重复。
- **问题排查**：若日志被清理但 inode 被复用，可能导致数据错乱，需定期清理 registry。

## 8、如何实现 ES 索引日志的归档和清理？（ILM 详解）

**答：**

**索引生命周期管理（ILM, Index Lifecycle Management）** 是官方推荐方案：

**生命周期阶段：**
```
Hot → Warm → Cold → Frozen → Delete
```

**配置示例：**
```json
PUT _ilm/policy/logs_policy
{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": {
            "max_size": "50GB",
            "max_age": "1d",
            "max_docs": 100000000
          },
          "set_priority": { "priority": 100 }
        }
      },
      "warm": {
        "min_age": "3d",
        "actions": {
          "shrink": { "number_of_shards": 1 },
          "forcemerge": { "max_num_segments": 1 },
          "allocate": { "require": { "data": "warm" } }
        }
      },
      "cold": {
        "min_age": "30d",
        "actions": {
          "freeze": {},
          "allocate": { "require": { "data": "cold" } }
        }
      },
      "delete": {
        "min_age": "90d",
        "actions": { "delete": {} }
      }
    }
  }
}
```

**关联索引模板：**
```json
PUT _index_template/logs_template
{
  "index_patterns": ["logs-*"],
  "template": {
    "settings": {
      "index.lifecycle.name": "logs_policy",
      "index.lifecycle.rollover_alias": "logs"
    }
  }
}
```

## 9、Elasticsearch 集群脑裂（Split-Brain）是什么？如何避免？

**答：**

**脑裂现象：** 当 Master 节点网络故障时，集群可能分裂为多个独立集群，各自选举 Master，导致数据不一致。

**避免方案：**
1. **配置 `discovery.seed_hosts`**（ES 7.x+）或 `discovery.zen.ping.unicast.hosts`（旧版），明确集群节点列表。
2. **最小 Master 节点数**（ES 7.0+ 已内置 `voting configuration`，旧版需配置）：
```yaml
discovery.zen.minimum_master_nodes: 2  # 公式：N/2 + 1
```
3. **网络隔离防护**：使用独立网卡、绑定 `network.host` 为内网 IP，避免跨机房选举。

**故障恢复：**
```bash
# 查看当前 Master
GET _cat/master?v

# 若脑裂发生，需停掉非 Master 节点，清空 data 目录，重新加入集群
```

## 10、Logstash 性能瓶颈如何排查与优化？

**答：**

**监控指标：**
```bash
# 查看 Logstash 性能 API
curl -XGET 'localhost:9600/_node/stats/pipelines?pretty'
```
关注：`events.in`、`events.out`、`events.duration_in_millis`

**常见瓶颈与优化：**

| 瓶颈类型        | 表现        | 解决方案                                               |
| --------------- | ----------- | ------------------------------------------------------ |
| **Filter 复杂** | CPU 占用高  | 使用 Grok 预编译模式，或改用 Dissect（更快）           |
| **单线程处理**  | 吞吐量低    | 增加 `pipeline.workers`（默认 CPU 核数）               |
| **输出阻塞**    | ES 拒绝写入 | 增加 `pipeline.batch.size`（默认 125）和 `batch.delay` |
| **内存溢出**    | OOM Killed  | 限制 `pipeline.batch.size`，避免大文本字段             |

**配置优化示例：**
```yaml
pipeline:
  workers: 8              # 等于 CPU 核数
  batch:
    size: 1000            # 每批次处理事件数
    delay: 50             # 等待时间（ms）
  ordered: false          # 允许无序处理提升性能
```

## 11、Elasticsearch 查询性能慢，如何排查？

**答：**

**排查步骤：**

1. **定位慢查询：**
```bash
# 开启慢查询日志
PUT /_all/_settings
{
  "index.search.slowlog.threshold.query.warn": "10s",
  "index.search.slowlog.threshold.fetch.debug": "500ms"
}
```

2. **分析查询 DSL：**
   - 避免 `*:*` 全量扫描
   - 深度分页使用 `search_after` 替代 `from/size`（超过 10000 条）
   - 聚合查询增加 `size: 0` 减少返回数据

3. **检查集群健康：**
```bash
GET _cluster/health
GET _cat/indices?v&health=red  # 查看 Red 索引
GET _tasks?detailed=true&actions=*search*  # 查看正在执行的查询
```

4. **JVM 与系统层：**
   - 检查 `jvm.mem.heap_used_percent` 是否超过 75%（触发 FGC）
   - 使用 `iostat -x 1` 检查磁盘 I/O 等待（`%util` > 80% 说明磁盘瓶颈）

## 12、Filebeat 如何保证日志不丢失？ACK 机制是什么？

**答：**

**At-Least-Once 语义：** Filebeat 采用 **Spooler + ACK** 机制保证数据可靠传输：

1. **Harvester 读取**：每个文件独立 Harvester，实时读取新行。
2. **Spooler 缓冲**：事件进入内存队列（`queue.mem.events` 默认 4096）。
3. **Publisher 发送**：批量发送给 Output（ES/Logstash/Kafka）。
4. **ACK 确认**：收到 Output 的 ACK 后，才更新 Registry 中的 offset；若失败则重试。

**防丢失配置：**
```yaml
filebeat.inputs:
- type: log
  paths: /var/log/*.log
  close_inactive: 5m        # 文件无新内容 5 分钟后关闭句柄
  clean_inactive: 24h       # 24 小时后清理 Registry 记录
  
output.elasticsearch:
  bulk_max_size: 500
  backoff.init: 1s          # 重试间隔
  backoff.max: 60s
```

**极端场景：** 若 Filebeat 崩溃且未收到 ACK，重启后会从上次确认的 offset 重新发送，导致重复数据（需下游 ES 用 `_id` 去重或 Logstash 做指纹去重）。

## 13、Elasticsearch 安全性如何配置？RBAC 权限模型是什么？

**答：**

**X-Pack Security 核心功能：**
1. **TLS 加密**：节点间通信（Transport Layer）和 HTTP 层启用 HTTPS。
2. **认证（Authentication）**：支持 Native Realm（本地用户）、LDAP/AD、PKI 证书。
3. **授权（Authorization）**：基于角色的访问控制（RBAC）。

**RBAC 配置示例：**
```bash
# 创建角色：只读 access_log 索引
POST _security/role/log_viewer
{
  "indices": [
    {
      "names": ["access_log-*"],
      "privileges": ["read", "view_index_metadata"]
    }
  ]
}

# 创建用户并绑定角色
POST _security/user/ops_user
{
  "password": "changeme",
  "roles": ["log_viewer", "kibana_user"],
  "full_name": "运维工程师"
}
```

**API Key 管理：**
```bash
POST _security/api_key
{
  "name": "filebeat-api-key",
  "role_descriptors": {
    "filebeat_writer": {
      "cluster": ["monitor", "read_ilm"],
      "index": [{"names": ["filebeat-*"], "privileges": ["create_doc"]}]
    }
  }
}
```

## 14、如何监控 ELK 集群本身？（Metricbeat + 监控集群）

**答：**

**方案一：Metricbeat 采集（推荐，解耦监控）**
```yaml
# metricbeat.yml
metricbeat.modules:
- module: elasticsearch
  metricsets: ["node", "node_stats", "index", "index_recovery", "shard"]
  hosts: ["http://localhost:9200"]
  xpack.enabled: true       # 开启后数据兼容 Kibana Stack Monitoring

- module: logstash
  hosts: ["localhost:9600"]

- module: kibana
  hosts: ["localhost:5601"]

output.elasticsearch:
  hosts: ["监控集群:9200"]   # 发送到独立的 Monitoring 集群
```

**方案二：内部收集（传统方式）**
```yaml
# elasticsearch.yml
xpack.monitoring.collection.enabled: true
xpack.monitoring.history.duration: 7d  # 监控数据保留 7 天
```

**关键监控指标：**
- **Cluster Status**：Green/Yellow/Red
- **JVM Heap**：持续 > 75% 需扩容
- **Indexing Rate**：写入速率（doc/s）
- **Search Latency**：查询延迟 P99
- **Disk Usage**：超过 85% 水位线（`cluster.routing.allocation.disk.watermark.high`）将停止分配分片。

## 15、实战场景：日志量每天 1TB，设计 ELK 架构

**答：**

**架构设计：**

```
[Log Source] 
    ↓
[Filebeat] × 200 台（每台 50MB/s，批量压缩）
    ↓
[Kafka Cluster]（3 Broker，Topic: log-raw，Partition: 50，保留 3 天）
    ↓
[Logstash] × 10 台（8C16G，Grok 解析， enrichment）
    ↓
[ES Hot Nodes] × 10 台（32C128G，SSD，3TB×12 盘，ILM Hot 阶段，保留 7 天）
    ↓
[ES Warm Nodes] × 5 台（16C64G，HDD，ILM Warm 阶段，压缩存储，保留 30 天）
    ↓
[ES Cold Nodes] × 3 台（8C32G，HDD，ILM Cold 阶段，冻结索引，保留 90 天）
    ↓
[Snapshot → S3/OSS]（归档存储）
```

**关键配置：**
- **索引策略**：按天滚动 `logs-2024.01.01`，单索引 50GB，10 分片 1 副本。
- **写入优化**：Logstash 开启 `pipeline.ecs_compatibility: disabled`，使用 `http_compression => true`。
- **成本控制**：冷数据使用 `searchable snapshots` 挂载到对象存储，查询时按需拉取。

