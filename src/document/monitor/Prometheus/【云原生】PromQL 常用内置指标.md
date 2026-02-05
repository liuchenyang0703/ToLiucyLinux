---
title: 【云原生】PromQL 常用内置指标
icon: circle-info
order: 1
category:
  - Linux
  - Prometheus
tag:
  - Linux
  - Prometheus
  - PromQL
  - 运维
pageview: false
date: 2026-01-04
comment: false
breadcrumb: false
isOriginal: true
---

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/profile/7yu26jk3lfqxg)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---

##  PromQL 的万能公式

* 不使用函数可以不带`()`；不是函数的例如：`数据类型、条件匹配、比较、算法、逻辑运算`；
* 使用函数必须带`()`，否则会报错；
```sql
# 单层骨架
<函数>(<指标名>{<标签过滤>}[<范围>]) <比较符> <阈值>

# 左右对比、关联骨架
<函数>(<指标名>{<标签过滤>}[<范围>]) <比较符> <阈值> <算数、逻辑、匹配运算符> <函数>(<指标名>{<标签过滤>}[<范围>]) <比较符> <阈值>

# 嵌套双层函数
<函数>(<函数>(<指标名>{<标签过滤>}[<范围>])） <比较符> <阈值>
```
各部分含义与可选值速查：

| 占位 | 可选内容 | 速记 |
|---|---|---|
| 函数 | `rate` `increase` `sum` `avg` `max` `topk` `count` … | 先聚合再算率 |
| 指标 | `node_cpu_seconds_total` `container_memory_working_set_bytes` … | _exporter 里抄 |
| 标签过滤 | `{instance="web-01",mode="user"}` `{}` 表示全要 | 精准定位 |
| 范围 | `[1m]` `[5m]` `[1h]` | 小于 2 倍 scrape_interval 会失真 |
| 比较符 | `>` `>=` `<` `<=` `==` `!=` | 告警用 `>` 最多 |
| 阈值 | `0.8` `1024*1024*1024` `80` | 单位与指标一致 |
|算数、逻辑运算符|`+` `-` `*` `/` `and` `or` `unless`| 计算常用|


**例子：**
1. **CPU 使用率 > 80%**
```sql
100 - avg(rate(node_cpu_seconds_total{mode="idle"}[1m])) * 100 > 80
```

2. **容器内存 > 2 Gi**
```sql
container_memory_working_set_bytes{name="my-app"} / 1024 / 1024 / 1024 > 2
```

3. **API QPM 环比下跌 30%**
```sql
rate(http_requests_total[1m]) < 0.7 * rate(http_requests_total[1m] offset 1h)
```

4. **1 分钟内网卡收包速率 > 50 MB/s 就报警**
```sql
rate(node_network_receive_bytes_total{device!="lo"}[1m]) > 50*1024*1024
```

> 记住顺序：**先聚合→再速率→再比较**，永远套得上！

## 一、node_exporter 常用内置指标

### 1.1 CPU · 负载 · 内存 · 进程
| 指标 | 一句话说明 | 单位 |
|---|---|---|
| `node_cpu_seconds_total` | 各核各模式累计时长	 | 秒 |
| `node_load1` / `node_load5` / `node_load15` | 1、5、15 分钟系统平均负载 |无（纯数值） |
| `node_memory_MemAvailable_bytes` | 可用内存大小 | 字节 |
| `node_memory_MemTotal_bytes` | 总内存大小 | 字节 |
|`node_memory_MemFree_bytes`|完全空闲内存（不含缓存）|字节|
| `node_memory_Cached_bytes`                | 页缓存（含 tmpfs） | 字节  |
| `node_memory_Buffers_bytes`               | 块设备缓存        | 字节  |
| `node_memory_Slab_bytes`                  | 内核 slab 占用   | 字节  |
| `node_pressure_cpu_waiting_seconds_total` | CPU 调度延迟     | 秒   |
| `node_processes` | 当前进程数 | 无 |
|`node_processes_state`     |各状态进程数量计数（R/S/Z…）|无|
| `node_processes_threads`                  | 系统线程数        | 个   |
| `node_vmstat_oom_kill`                    | OOM 杀死次数     | 次   |

### 1.2 磁盘 · 文件系统 · 描述符
| 指标 | 一句话说明 | 单位 |
|---|---|---|
| `node_filesystem_size_bytes` | 分区总大小 | 字节|
| `node_filesystem_avail_bytes` | 分区可用空间 | 字节 |
| `node_disk_read_bytes_total` | 磁盘累计读取字节	 | 字节 |
| `node_disk_write_bytes_total`              | 磁盘累计写入字节            | 字节 |
| `node_disk_io_now` | 当前磁盘 I/O 请求数	 |个|
|`node_disk_io_time_seconds_total`|磁盘繁忙累计时长|秒|
|`node_disk_io_time_weighted_seconds_total` |加权繁忙时长|秒|
| `node_pressure_io_stall_seconds_total`    | IO 阻塞累计      | 秒   |
| `node_filesystem_files_free`              | inode 剩余量    | 个   |
| `node_disk_writes_completed_total`        | 磁盘写完成次数      | 次   |
| `node_disk_reads_completed_total`         | 磁盘读完成次数      | 次   |
| `node_disk_read_time_seconds_total`       | 读耗时累计        | 秒   |
| `node_disk_write_time_seconds_total`      | 写耗时累计        | 秒   |
|`node_filefd_allocated` |已分配文件描述符个数|个|
|`node_filefd_maximum`|系统最大文件描述符数|个|
|`node_filesystem_readonly`|文件系统只读标志|无（1/0） |
| `node_disk_discards_completed_total`       | SSD TRIM/Discard 次数 | 次  |
| `node_disk_discarded_sectors_total`        | SSD 被丢弃扇区数          | 扇区 |


### 1.3 网络
| 指标 | 一句话说明 | 单位 |
|---|---|---|
| `node_network_receive_bytes_total` |网卡累计接收量	 | 字节 |
| `node_network_transmit_bytes_total` | 网卡累计发送量	| 字节 |
| `node_network_receive_packets_total`      | 累计收包数          | 个   |
| `node_network_transmit_packets_total`     | 累计发包数           | 个   |
| `node_network_receive_errs_total`         | 接收错包累计           | 次   |
| `node_network_transmit_errs_total`    | 发送错包累计                           | 次      |
| `node_network_receive_drop_total`     | 接收丢包累计                           | 次      |
| `node_network_transmit_drop_total`    | 发送丢包累计                           | 次      |
|`node_netstat_Tcp_CurrEstab` |TCP连接数|个|
|`node_netstat_Tcp_RetransSegs`|TCP 重传段累计数 |次|
| `node_network_up` | 网卡是否在线	| 无（1/0） |
| `node_network_speed_bytes`            | 网卡协商速率（单位 byte/s，0=down/unknown） | 字节/秒   |
| `node_network_mtu_bytes`              | 接口 MTU 大小                        | 字节     |


### 1.4 systemd 服务
| 指标 | 一句话说明 | 单位 |
|---|---|---|
| `node_systemd_unit_state` | 	每个 systemd 单元在各个状态（active/failed/inactive… |无（0/1）|
| `node_systemd_system_running`             | systemd 是否运行 | 0/1 |
### 1.5 系统 · 内核
| 指标 | 一句话说明 | 单位 |
|---|---|---|
| `node_boot_time_seconds` | 系统启动时间 | 秒（Unix 时间戳） |
| `node_temperature_celsius`                | 主板/CPU 温度    | ℃   |
| `node_hwmon_fan_rpm`                      | 风扇转速         | RPM |
| `node_processes_pids_limit`                | 系统最大 PID 数             | 无   |
| `node_context_switches_total` | 上下文切换次数 |次|
| `node_forks_total` | 进程创建次数	 | 次 |



### 1.6 Exporter 自身
| 指标 | 一句话说明 | 单位 |
|---|---|---|
| `up` | 目标是否存活 |无（1/0） |
| `scrape_duration_seconds` | 单次采集耗时	 |秒 |
| `scrape_samples_scraped`                | 本次采到的样本条数               | 无      |
| `scrape_samples_post_metric_relabeling` | relabel 后剩余样本数          | 无      |
| `scrape_series_added`                   | 新增时间序列数                 | 无      |
| `node_exporter_build_info`              | node\_exporter 版本信息     | 无      |
| `prometheus_build_info` | Prometheus 版本信息 | 无 |

## 二、mysqld_exporter 常用内置指标

### 2.1 连接与线程
| 指标 | 一句话说明 | 单位 |
|---|---|---|
| `mysql_global_status_threads_connected` | 当前打开的连接数 | 个 |
| `mysql_global_status_threads_running` | 正在执行命令的线程数 | 个 |
| `mysql_global_status_connections` | 历史累计连接数 | 次 |
| `mysql_global_status_aborted_connects` | 连接失败次数 | 次 |

### 2.2 查询与命令
| 指标 | 一句话说明 | 单位 |
|---|---|---|
| `mysql_global_status_queries` | 累计 SQL 语句数 | 次 |
| `mysql_global_status_questions` | 累计发往服务器的语句数 | 次 |
| `mysql_global_status_slow_queries` | 慢查询次数 | 次 |
| `mysql_global_status_select / insert / update / delete` | 各语句累计次数 | 次 |

### 2.3 流量
| 指标 | 一句话说明 | 单位 |
|---|---|---|
| `mysql_global_status_bytes_received` | 累计接收字节数 | 字节 |
| `mysql_global_status_bytes_sent` | 累计发送字节数 | 字节 |

### 2.4 InnoDB 引擎
| 指标 | 一句话说明 | 单位 |
|---|---|---|
| `mysql_global_status_innodb_buffer_pool_pages_total` | 缓冲池总页数 | 页 |
| `mysql_global_status_innodb_buffer_pool_pages_free` | 缓冲池空闲页数 | 页 |
| `mysql_global_status_innodb_buffer_pool_pages_dirty` | 缓冲池脏页数 | 页 |
| `mysql_global_status_innodb_row_lock_waits` | 行锁等待次数 | 次 |
| `mysql_global_status_innodb_row_lock_time_avg` | 行锁平均等待时间 | 毫秒 |

### 2.5 主从复制
| 指标 | 一句话说明 | 单位 |
|---|---|---|
| `mysql_slave_lag` | 从库延迟秒数 | 秒 |
| `mysql_global_variables_server_id` | 当前节点 server_id | 无 |
| `mysql_slave_sql_running` | SQL 线程是否运行 | 1/0 |
| `mysql_slave_io_running` | IO 线程是否运行 | 1/0 |

### 2.6 表锁
| 指标 | 一句话说明 | 单位 |
|---|---|---|
| `mysql_global_status_table_locks_immediate` | 立即获得表锁次数 | 次 |
| `mysql_global_status_table_locks_waited` | 等待表锁次数 | 次 |

### 2.7 配置与状态
| 指标 | 一句话说明 | 单位 |
|---|---|---|
| `mysql_global_variables_max_connections` | 最大连接数配置 | 个 |
| `mysql_global_variables_innodb_buffer_pool_size` | InnoDB 缓冲池大小 | 字节 |
| `mysql_global_status_uptime` | 服务运行时长 | 秒 |


> 实际指标随 MySQL 版本和 exporter 版本略有增减，可用 `http://<exporter>:9104/metrics` 现场查看。

## 三、redis_exporter 常用内置指标
下面给出 **redis_exporter v1.x** 能看到的**全部内置指标**（按功能分组，一名话说明，单位中文），共 **60+** 条，复制即可用。
### 3.1 连接与客户端
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| `redis_connected_clients` | 当前已连接客户端数 | 个 |
| `redis_client_recent_max_input_buffer` | 近期最大输入缓冲区 | 字节 |
| `redis_client_recent_max_output_buffer` | 近期最大输出缓冲区 | 字节 |
| `redis_rejected_connections_total` | 累计拒绝连接 | 次 |
| `redis_total_connections_received_total` | 累计接收连接 | 次 |

### 3.2 命令与吞吐量
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| `redis_commands_processed_total` | 累计执行命令数 | 次 |
| `redis_command_duration_seconds_total` | 各命令累计耗时 | 秒 |
| `redis_command_calls_total` | 各命令被调用次数 | 次 |
| `redis_command_failed_calls_total` | 各命令失败次数 | 次 |
| `redis_keyspace_hits_total` | key 命中次数 | 次 |
| `redis_keyspace_misses_total` | key 未命中次数 | 次 |

### 3.3 Key 生命周期
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| `redis_keys_expired_total` | 累计过期 key 数 | 次 |
| `redis_keys_evicted_total` | 累计淘汰 key 数 | 次 |
| `redis_expired_keys_per_second` | 每秒过期 key 数 | 次/秒 |
| `redis_evicted_keys_per_second` | 每秒淘汰 key 数 | 次/秒 |

### 3.4 内存与碎片
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| `redis_used_memory_bytes` | 已用内存 | 字节 |
| `redis_used_memory_human_bytes` | 已用内存（人读单位） | 字节 |
| `redis_used_memory_rss_bytes` | 进程物理内存 | 字节 |
| `redis_used_memory_peak_bytes` | 内存使用峰值 | 字节 |
| `redis_used_memory_lua_bytes` | Lua 引擎占用内存 | 字节 |
| `redis_memory_max_bytes` | 配置最大可用内存 | 字节 |
| `redis_mem_fragmentation_ratio` | 碎片率 | 倍数 |
| `redis_memory_used_overhead_bytes` | 额外开销内存 | 字节 |


### 3.5 Key 空间统计
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| `redis_key_count` | 当前 key 总数 | 个 |
| `redis_expires_key_count` | 带过期时间的 key 数 | 个 |
| `redis_avg_ttl_seconds` | 平均 TTL | 秒 |
### 3.6 持久化（RDB）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| `redis_rdb_bgsave_in_progress` | 是否正在 RDB 保存 | 1/0 |
| `redis_rdb_last_save_timestamp_seconds` | 上次 RDB 完成时间 | 秒（Unix 戳） |
| `redis_rdb_last_save_duration_seconds` | 上次 RDB 耗时 | 秒 |
| `redis_rdb_changes_since_last_save` | 自上次 RDB 以来的变更数 | 次 |

### 3.7 持久化（AOF）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| `redis_aof_enabled` | AOF 是否开启 | 1/0 |
| `redis_aof_rewrite_in_progress` | 是否正在 AOF rewrite | 1/0 |
| `redis_aof_last_rewrite_duration_seconds` | 上次 rewrite 耗时 | 秒 |
| `redis_aof_current_size_bytes` | 当前 AOF 文件大小 | 字节 |
| `redis_aof_base_size_bytes` | AOF 基础文件大小 | 字节 |
| `redis_aof_buffer_length_bytes` | AOF 缓冲区大小 | 字节 |
### 3.8 主从/复制
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| `redis_connected_slaves` | 已连接从库数 | 个 |
| `redis_master_link_up` | 主从链路是否在线 | 1/0 |
| `redis_master_last_io_seconds_ago` | 距离上次主从 I/O 间隔 | 秒 |
| `redis_master_repl_offset` | 主库复制偏移量 | 字节 |
| `redis_slave_repl_offset` | 从库复制偏移量 | 字节 |
| `redis_backlog_active` | 复制积压缓冲区是否活跃 | 1/0 |
| `redis_backlog_size_bytes` | 积压缓冲区大小 | 字节 |
### 3.9 慢日志
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| `redis_slowlog_length` | 慢日志条数 | 条 |
| `redis_slowlog_last_id` | 最新慢日志 ID | 无 |
| `redis_slowlog_max_length` | 慢日志最大保留条数 | 条 |
### 3.10 运行信息
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| `redis_uptime_in_seconds` | 服务运行时长 | 秒 |
| `redis_instance_info` | 版本、模式等标签 | 无（标签） |



> 如需更多，访问 `http://<redis_exporter>:9121/metrics` 即可看到实时完整列表。
## 四、nginx_exporter 常用内置指标


| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| nginx_connections_active | 当前活跃连接数 | 个 |
| nginx_connections_accepted | 已接收连接总数 | 次 |
| nginx_connections_handled | 已处理连接总数 | 次 |
| nginx_connections_reading | 正在读取请求的连接数 | 个 |
| nginx_connections_writing | 正在写响应的连接数 | 个 |
| nginx_connections_waiting | 空闲等待连接数 | 个 |
| nginx_http_requests_total | 累计 HTTP 请求数 | 次 |
| nginx_server_bytes_received | 已接收字节总数 | 字节 |
| nginx_server_bytes_sent | 已发送字节总数 | 字节 |
| nginx_up | exporter 能否连上 nginx | 1/0 |

> 如需更多，访问 `http://<nginx_exporter>:9113/metrics` 可查看完整列表。
## 五、blackbox_exporter 常用内置指标

| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| probe_success | 探测是否成功（1=成功 0=失败） | 无 |
| probe_duration_seconds | 整个探测耗时 | 秒 |
| probe_http_status_code | HTTP 响应状态码 | 无 |
| probe_http_content_length | 响应体长度 | 字节 |
| probe_http_redirects | 重定向次数 | 次 |
| probe_http_ssl | 是否使用 SSL（1=是 0=否） | 无 |
| probe_dns_lookup_time_seconds | DNS 解析耗时 | 秒 |
| probe_tcp_connection_time_seconds | TCP 连接建立耗时 | 秒 |
| probe_tls_certificate_expiry_seconds | 证书剩余有效期 | 秒 |
| probe_icmp_duration_seconds | ICMP 往返耗时 | 秒 |

> 如需更多，访问 `http://<blackbox_exporter>:9115/metrics` 可查看完整列表。
## 六、kafka_exporter 常用内置指标


| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| kafka_consumer_group_lag_sum | 消费组总 Lag 消息数 | 条 |
| kafka_consumer_group_lag_max | 消费组最大 Lag | 条 |
| kafka_topic_partitions | Topic 分区数 | 个 |
| kafka_topic_partition_current_offset | 分区当前最新偏移量 | 条 |
| kafka_topic_partition_oldest_offset | 分区最早偏移量 | 条 |
| kafka_topic_partition_in_sync_replica | 分区 ISR 数量 | 个 |
| kafka_topic_partition_leader | 分区 Leader Broker ID | 无 |
| kafka_topic_partition_leader_is_preferred | 是否首选 Leader（1=是 0=否） | 无 |
| kafka_broker_info | Broker 存活信息（标签含版本） | 1 |
| kafka_controller_active_count | 当前活跃 Controller 数 | 个 |

> 如需更多，访问 `http://<kafka_exporter>:9308/metrics` 可查看完整列表。
## 七、snmp_exporter 常用内置指标

| 指标名 | 一句话说明 | 单位 |
| --- | --- | --- |
| `snmp_up` | 本次 SNMP walk 是否成功（1=成功 0=失败） | 无 |
| `snmp_duration_seconds` | 本次 walk 总耗时 | 秒 |
| `snmp_packets_sent` | 已发 SNMP 报文数 | 次 |
| `snmp_packets_received` | 已收 SNMP 报文数 | 次 |
| `snmp_error_packets` | 出错报文数 | 次 |

> 如需更多，访问 `http://<snmp_exporter>:9116/metrics` 即可看到。

## 八、statsd_exporter 常用内置指标
> `statsd_exporter` 自身暴露的指标很少，核心是 **把 StatsD 原始计数器/计时器/仪表盘** 转成 Prometheus 格式的 **“用户自定义”** 指标，因此 **常用指标 = 你通过 StatsD 协议发过来的那些**。  

| 指标名 | 含义 | 单位 |
|---|---|---|
| `statsd_exporter_lines_total` | 累计解析的 StatsD 行数 | 次 |
| `statsd_exporter_events_total` | 累计事件数（按类型：counter/timer/gauge/histogram 等） | 次 |
| `statsd_exporter_packets_total` | 累计收到 UDP/TCP 包数 | 次 |
| `statsd_exporter_last_flush_timestamp_seconds` | 上次刷盘时间戳 | 秒 |
| `statsd_exporter_udp_read_errors_total` | UDP 读错误累计 | 次 |
| `statsd_exporter_tcp_read_errors_total` | TCP 读错误累计 | 次 |

> 如需更多，访问 `http://<statsd_exporter>:9102/metrics` 即可看到。
## 九、memcached_exporter 常用内置指标

| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| memcached_current_connections | 当前打开连接数 | 个 |
| memcached_total_connections | 历史累计连接数 | 次 |
| memcached_connections_yielded_total | 因限制被放弃的连接数 | 次 |
| memcached_current_items | 当前缓存项数 | 条 |
| memcached_total_items | 历史累计存储项数 | 条 |
| memcached_evictions_total | 被淘汰缓存项数 | 条 |
| memcached_bytes_read_total | 累计读取字节数 | 字节 |
| memcached_bytes_written_total | 累计写出字节数 | 字节 |
| memcached_limit_bytes | 最大可用内存上限 | 字节 |
| memcached_current_bytes | 已用内存大小 | 字节 |
| memcached_get_hits_total | 缓存命中次数 | 次 |
| memcached_get_misses_total | 缓存未命中次数 | 次 |
| memcached_delete_hits_total | 删除命中次数 | 次 |
| memcached_delete_misses_total | 删除未命中次数 | 次 |
| memcached_cmd_flush_total | flush 命令执行次数 | 次 |
| memcached_uptime_seconds | 服务运行时长 | 秒 |

> 如需更多，访问 `http://<memcached_exporter>:9150/metrics` 可查看完整列表。
## 十、consul_exporter 常用内置指标

consul_exporter 常用指标（一句话说明 + 中文单位）

| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| consul_up | exporter 能否连上 Consul | 1/0 |
| consul_raft_leader | 当前节点是否为 Leader | 1/0 |
| consul_raft_peers | 集群投票成员数 | 个 |
| consul_serf_lan_members | LAN 成员总数 | 个 |
| consul_serf_wan_members | WAN 成员总数 | 个 |
| consul_catalog_services | 注册服务总数 | 个 |
| consul_catalog_nodes | 注册节点总数 | 个 |
| consul_health_node_status | 节点健康状态（标签：node、status） | 1/0 |
| consul_health_service_status | 服务实例健康状态（标签：service、node、status） | 1/0 |
| consul_kv_keys | KV 存储 key 数量 | 个 |
| consul_acls_enabled | ACL 是否启用 | 1/0 |
| consul_raft_commit_time_seconds | 提交日志耗时（summary） | 秒 |
| consul_raft_leader_last_contact_seconds | Leader 与 Follower 最后一次通信时间 | 秒 |

> 如需更多，访问 `http://<consul_exporter>:9107/metrics` 可看完整列表。
## 十一、graphite_exporter 常用内置指标

> graphite_exporter 本身只暴露 **自身运行指标**；真正的业务指标是你通过 **Carbon 协议** 或 **HTTP `/metrics` 接口** 写进来的，名字完全由你定义。  

| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| `graphite_exporter_lines_total` | 累计解析的行数 | 次 |
| `graphite_exporter_events_total` | 累计事件数（按类型 counter/timer/gauge 等） | 次 |
| `graphite_exporter_tcp_connections_total` | 累计 TCP 连接数 | 次 |
| `graphite_exporter_last_flush_timestamp_seconds` | 上次刷盘时间戳 | 秒 |
| `graphite_exporter_errors_total` | 解析/写入错误累计 | 次 |

> 如需更多，访问 `http://<graphite_exporter >:9108/metrics` 可看完整列表。
## 十二、elasticsearch_exporter 常用内置指标
> `elasticsearch_exporter` 常用指标（按节点、集群、索引三大块整理）

### 12.1 节点层（node）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| elasticsearch_node_stats_up | exporter 能否拿到节点 stats | 1/0 |
| elasticsearch_cluster_nodes_number | 集群总节点数 | 个 |
| elasticsearch_node_stats_jvm_mem_used_bytes | 节点 JVM 已用内存 | 字节 |
| elasticsearch_node_stats_jvm_mem_max_bytes | 节点 JVM 最大内存 | 字节 |
| elasticsearch_node_stats_process_cpu_percent | 节点 CPU 使用率 | % |
| elasticsearch_node_stats_transport_rx_size_bytes | 节点级网络接收量 | 字节 |
| elasticsearch_node_stats_transport_tx_size_bytes | 节点级网络发送量 | 字节 |
| elasticsearch_node_stats_breakers_estimated_size_bytes | 熔断器估计内存 | 字节 |
### 12.2 集群层（cluster）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| elasticsearch_cluster_health_status | 集群健康状态（green=1 yellow=0.5 red=0） | 无 |
| elasticsearch_cluster_health_number_of_nodes | 健康检查返回的节点数 | 个 |
| elasticsearch_cluster_health_number_of_data_nodes | 数据节点数 | 个 |
| elasticsearch_cluster_health_active_shards | 活跃主+副本分片数 | 个 |
| elasticsearch_cluster_health_relocating_shards | 正在迁移的分片数 | 个 |
| elasticsearch_cluster_health_initializing_shards | 初始化的分片数 | 个 |
| elasticsearch_cluster_health_unassigned_shards | 未分配的分片数 | 个 |
| elasticsearch_cluster_health_pending_tasks | 待执行集群任务数 | 个 |
### 12.3 索引层（index）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| elasticsearch_indices_docs_primary | 索引主分片文档数 | 条 |
| elasticsearch_indices_docs_deleted_primary | 主分片已删除文档数 | 条 |
| elasticsearch_indices_store_size_bytes_primary | 主分片存储大小 | 字节 |
| elasticsearch_indices_indexing_index_total | 累计索引文档次数 | 次 |
| elasticsearch_indices_indexing_index_time_seconds_total | 累计索引耗时 | 秒 |
| elasticsearch_indices_search_query_total | 累计 search 次数 | 次 |
| elasticsearch_indices_search_query_time_seconds_total | 累计 search 耗时 | 秒 |
| elasticsearch_indices_refresh_total | 累计 refresh 次数 | 次 |
| elasticsearch_indices_flush_total | 累计 flush 次数 | 次 |
| elasticsearch_indices_fielddata_memory_size_bytes | fielddata 占用内存 | 字节 |
### 12.4 线程/池/缓存
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| elasticsearch_thread_pool_active_count | 各线程池活跃线程数 | 个 |
| elasticsearch_thread_pool_queue_count | 各线程池排队任务数 | 个 |
| elasticsearch_indices_segments_count | 索引段总数 | 个 |
| elasticsearch_indices_segments_memory_bytes | 段内存占用 | 字节 |


> 如需更多，访问 `http://<elasticsearch_exporter>:9114/metrics` 即可看到全部指标。
## 十三、mongodb_exporter 常用内置指标

> `mongodb_exporter` 常用指标（按“实例-库-集合-集群”四层整理）
### 13.1 实例/节点层（mongodb_instance_*）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| mongodb_instance_up | exporter 能否连上实例 | 1/0 |
| mongodb_instance_uptime_seconds | 实例已运行时长 | 秒 |
| mongodb_instance_version_info | 版本信息（标签） | 无 |
| mongodb_instance_connections_current | 当前连接数 | 个 |
| mongodb_instance_connections_available | 剩余可用连接数 | 个 |
| mongodb_instance_global_lock_current_queue_total | 全局锁等待队列长度 | 个 |
| mongodb_instance_memory_resident_bytes | 常驻内存大小 | 字节 |
| mongodb_instance_memory_virtual_bytes | 虚拟内存大小 | 字节 |
| mongodb_instance_network_bytes_in_total | 累计网络入流量 | 字节 |
| mongodb_instance_network_bytes_out_total | 累计网络出流量 | 字节 |
| mongodb_instance_ops_total | 累计 CRUD 操作次数（按 op 类型） | 次 |

### 13.2 数据库层（mongodb_db_*）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| mongodb_db_data_size_bytes | 库数据占用大小 | 字节 |
| mongodb_db_index_size_bytes | 库索引占用大小 | 字节 |
| mongodb_db_collections_total | 库内集合数量 | 个 |
| mongodb_db_objects_total | 库内文档总数 | 条 |
### 13.3 集合层（mongodb_coll_*）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| mongodb_coll_size_bytes | 集合数据大小 | 字节 |
| mongodb_coll_count | 集合文档条数 | 条 |
| mongodb_coll_indexes_total | 集合索引数量 | 个 |
| mongodb_coll_index_size_bytes | 集合索引大小 | 字节 |

### 13.4 复制集层（mongodb_rs_*）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| mongodb_rs_members_total | 复制集成员总数 | 个 |
| mongodb_rs_members_alive | 存活成员数 | 个 |
| mongodb_rs_member_state | 成员状态码（1=Primary 2=Secondary） | 无 |
| mongodb_rs_member_replication_lag_seconds | 与主节点延迟差 | 秒 |
| mongodb_rs_oplog_window_seconds | Oplog 可回滚窗口 | 秒 |
### 13.5 文档/索引操作计数（按类型）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| mongodb_instance_ops_insert_total | 累计插入次数 | 次 |
| mongodb_instance_ops_query_total | 累计查询次数 | 次 |
| mongodb_instance_ops_update_total | 累计更新次数 | 次 |
| mongodb_instance_ops_delete_total | 累计删除次数 | 次 |
| mongodb_instance_ops_command_total | 累计命令次数 | 次 |


> 如需更多，访问 `http://<mongodb_exporter>:9216/metrics` 即可看到全部指标。
## 十四、postgres_exporter 常用内置指标
> `postgres_exporter` 常用指标（按“实例 / 库 / 表 / 复制”四层整理）

### 14.1 实例层（pg_up、pg_stat_*）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| pg_up | exporter 能否连上实例 | 1/0 |
| pg_postmaster_start_time_seconds | 数据库启动时间戳 | 秒（Unix） |
| pg_stat_database_numbackends | 当前活跃后端数 | 个 |
| pg_stat_bgwriter_write_time_seconds | BGWriter 累计写时间 | 秒 |
| pg_stat_bgwriter_buffers_clean_total | 后台写干净块数 | 块 |
| pg_stat_archiver_archived_count | 成功归档 WAL 文件数 | 个 |
| pg_stat_archiver_failed_count | 归档失败数 | 个 |

### 14.2 库级层（按 datname 标签）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| pg_stat_database_xact_commit_total | 库累计提交事务数 | 次 |
| pg_stat_database_xact_rollback_total | 库累计回滚事务数 | 次 |
| pg_stat_database_blks_read_total | 库累计磁盘块读取数 | 块 |
| pg_stat_database_blks_hit_total | 库累计缓冲区命中块数 | 块 |
| pg_stat_database_tup_returned_total | 库累计返回行数 | 行 |
| pg_stat_database_tup_fetched_total | 库累计抓取行数 | 行 |
| pg_stat_database_conflicts_total | 库冲突次数 | 次 |
| pg_database_size_bytes | 库大小（含所有表、索引） | 字节 |

### 14.3 表级层（按 schemaname、tablename 标签）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| pg_stat_user_tables_seq_scan_total | 表累计全表扫描次数 | 次 |
| pg_stat_user_tables_seq_tup_read_total | 全表扫描读取行数 | 行 |
| pg_stat_user_tables_idx_scan_total | 索引扫描次数 | 次 |
| pg_stat_user_tables_idx_tup_fetch_total | 索引扫描抓取行数 | 行 |
| pg_stat_user_tables_n_tup_ins_total | 累计插入行数 | 行 |
| pg_stat_user_tables_n_tup_upd_total | 累计更新行数 | 行 |
| pg_stat_user_tables_n_tup_del_total | 累计删除行数 | 行 |
| pg_stat_user_tables_n_live_tup | 表活行数（MVCC） | 行 |
| pg_stat_user_tables_n_dead_tup | 表死行数（MVCC） | 行 |
| pg_total_relation_size_bytes | 表+索引总大小 | 字节 |

### 14.4 索引层（按 indexrelname 标签）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| pg_stat_user_indexes_idx_scan_total | 该索引被扫描次数 | 次 |
| pg_stat_user_indexes_idx_tup_read_total | 通过索引读取行数 | 行 |
| pg_stat_user_indexes_idx_tup_fetch_total | 通过索引抓取行数 | 行 |

### 14.5 复制与 WAL（按 application_name、slot_name 标签）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| pg_replication_lag_seconds | 备库延迟时间 | 秒 |
| pg_replication_lag_bytes | 备库延迟字节 | 字节 |
| pg_stat_replication_write_lag_seconds | 备库写入延迟 | 秒 |
| pg_stat_replication_flush_lag_seconds | 备库刷盘延迟 | 秒 |
| pg_stat_replication_replay_lag_seconds | 备库回放延迟 | 秒 |
| pg_wal_files_total | WAL 文件数 | 个 |
| pg_wal_bytes_total | 累计 WAL 字节 | 字节 |
### 14.6 锁与后台写
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| pg_stat_activity_count | 按状态分组的后端数 | 个 |
| pg_locks_count | 各类锁数量 | 个 |
| pg_stat_bgwriter_buffers_alloc_total | 后台写分配缓冲区数 | 块 |
| pg_stat_bgwriter_checkpoint_write_time_seconds | checkpoint 写时间 | 秒 |
| pg_stat_bgwriter_checkpoint_sync_time_seconds | checkpoint 同步时间 | 秒 |

> 如需更多，访问 `http://<postgres_exporter>:9187/metrics` 即可看到全部指标。
## 十五、rabbitmq_exporter 常用内置指标
> `rabbitmq_exporter` 常用指标（按“节点/队列/交换器/连接”4 层整理）
### 15.1 集群节点层（rabbitmq_node_*）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| rabbitmq_node_up | 节点存活（1/0） | 无 |
| rabbitmq_node_mem_used_bytes | 节点已用内存 | 字节 |
| rabbitmq_node_mem_limit_bytes | 节点内存高水位 | 字节 |
| rabbitmq_node_disk_free_bytes | 节点磁盘剩余空间 | 字节 |
| rabbitmq_node_disk_free_alarm | 磁盘告警（1/0） | 无 |
| rabbitmq_node_mem_alarm | 内存告警（1/0） | 无 |
| rabbitmq_node_running | 节点是否 running | 1/0 |
| rabbitmq_node_uptime_seconds | 节点运行时长 | 秒 |
### 15.2 队列层（rabbitmq_queue_*）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| rabbitmq_queue_messages | 当前消息总数（ready+unacked） | 条 |
| rabbitmq_queue_messages_ready | 待消费消息数 | 条 |
| rabbitmq_queue_messages_unacknowledged | 未确认消息数 | 条 |
| rabbitmq_queue_memory_bytes | 队列占用内存 | 字节 |
| rabbitmq_queue_consumers | 当前消费者数 | 个 |
| rabbitmq_queue_message_bytes | 队列消息体大小 | 字节 |
| rabbitmq_queue_messages_published_total | 累计发布消息数 | 条 |
| rabbitmq_queue_messages_delivered_total | 累计投递消息数 | 条 |
| rabbitmq_queue_messages_acked_total | 累计 ack 消息数 | 条 |
| rabbitmq_queue_messages_rejected_total | 累计拒绝消息数 | 条 |

### 15.3 交换器层（rabbitmq_exchange_*）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| rabbitmq_exchange_messages_published_in_total | 进入交换器消息数 | 条 |
| rabbitmq_exchange_messages_published_out_total | 交换器发出消息数 | 条 |

### 15.4 连接与通道层（rabbitmq_connection_* / rabbitmq_channel_*）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| rabbitmq_connections_opened_total | 累计打开连接数 | 次 |
| rabbitmq_connections_closed_total | 累计关闭连接数 | 次 |
| rabbitmq_connections_running | 当前 running 连接数 | 个 |
| rabbitmq_channels_opened_total | 累计打开通道数 | 次 |
| rabbitmq_channels_closed_total | 累计关闭通道数 | 次 |
### 15.5 消息速率（自动计算）
| 指标名 | 含义 | 单位 |
| --- | --- | --- |
| rabbitmq_queue_message_publish_rate | 实时发布速率 | 条/秒 |
| rabbitmq_queue_message_deliver_rate | 实时投递速率 | 条/秒 |
| rabbitmq_queue_message_ack_rate | 实时 ack 速率 | 条/秒 |

> 如需更多，访问 `http://<rabbitmq_exporter>:9419/metrics` 即可看到全部指标。


## 十六、kubernetes 常用指标

### 16.1 容器层（cAdvisor）

> Pod / Container 资源消耗指标（K8s 核心运行指标）

| 指标名                                      | 来源       | 含义            | 单位    |
| ---------------------------------------- | -------- | ------------- | ----- |
| container_cpu_usage_seconds_total        | cAdvisor | 容器 CPU 使用时间累计 | 秒     |
| container_cpu_system_seconds_total       | cAdvisor | 内核态 CPU 使用时间  | 秒     |
| container_cpu_user_seconds_total         | cAdvisor | 用户态 CPU 使用时间  | 秒     |
| container_memory_usage_bytes             | cAdvisor | 容器内存使用量       | bytes |
| container_memory_working_set_bytes       | cAdvisor | 实际工作集内存       | bytes |
| container_memory_rss                     | cAdvisor | RSS 内存        | bytes |
| container_memory_cache                   | cAdvisor | page cache    | bytes |
| container_fs_usage_bytes                 | cAdvisor | 容器磁盘使用量       | bytes |
| container_fs_reads_bytes_total           | cAdvisor | 容器磁盘读取        | bytes |
| container_fs_writes_bytes_total          | cAdvisor | 容器磁盘写入        | bytes |
| container_network_receive_bytes_total    | cAdvisor | 容器接收流量        | bytes |
| container_network_transmit_bytes_total   | cAdvisor | 容器发送流量        | bytes |
| container_network_receive_packets_total  | cAdvisor | 接收包数          | 个     |
| container_network_transmit_packets_total | cAdvisor | 发送包数          | 个     |
| container_start_time_seconds             | cAdvisor | 容器启动时间        | 秒     |
| container_last_seen                      | cAdvisor | 最近采集时间        | 时间戳   |

### 16.2 K8s 对象状态（kube-state-metrics）

> 不是资源消耗，而是**Kubernetes 状态信息**

#### 16.2.1 Pod 相关

| 指标名                                               | 来源                 | 含义                      | 单位    |
| ------------------------------------------------- | ------------------ | ----------------------- | ----- |
| kube_pod_info                                     | kube-state-metrics | Pod 基本信息                | 无     |
| kube_pod_status_phase                             | kube-state-metrics | Pod 状态（Running/Pending） | 枚举    |
| kube_pod_status_ready                             | kube-state-metrics | Pod Ready 状态            | 布尔    |
| kube_pod_container_status_restarts_total          | kube-state-metrics | 容器重启次数                  | 次     |
| kube_pod_container_status_running                 | kube-state-metrics | 容器运行状态                  | 布尔    |
| kube_pod_container_resource_requests_cpu_cores    | kube-state-metrics | CPU 请求值                 | 核     |
| kube_pod_container_resource_limits_cpu_cores      | kube-state-metrics | CPU 限制值                 | 核     |
| kube_pod_container_resource_requests_memory_bytes | kube-state-metrics | 内存请求值                   | bytes |
| kube_pod_container_resource_limits_memory_bytes   | kube-state-metrics | 内存限制值                   | bytes |


#### 16.2.2 Node 相关

| 指标名                                       | 来源                 | 含义          | 单位    |
| ----------------------------------------- | ------------------ | ----------- | ----- |
| kube_node_info                            | kube-state-metrics | 节点信息        | 无     |
| kube_node_status_condition                | kube-state-metrics | 节点 Ready 状态 | 布尔    |
| kube_node_status_capacity_cpu_cores       | kube-state-metrics | CPU 总容量     | 核     |
| kube_node_status_capacity_memory_bytes    | kube-state-metrics | 内存总容量       | bytes |
| kube_node_status_allocatable_cpu_cores    | kube-state-metrics | 可分配 CPU     | 核     |
| kube_node_status_allocatable_memory_bytes | kube-state-metrics | 可分配内存       | bytes |


#### 16.2.3 Deployment / ReplicaSet

| 指标名                                         | 来源                 | 含义    | 单位 |
| ------------------------------------------- | ------------------ | ----- | -- |
| kube_deployment_spec_replicas               | kube-state-metrics | 期望副本数 | 个  |
| kube_deployment_status_replicas             | kube-state-metrics | 当前副本数 | 个  |
| kube_deployment_status_replicas_available   | kube-state-metrics | 可用副本  | 个  |
| kube_deployment_status_replicas_unavailable | kube-state-metrics | 不可用副本 | 个  |


#### 16.2.4 StatefulSet

| 指标名                                    | 来源                 | 含义       | 单位 |
| -------------------------------------- | ------------------ | -------- | -- |
| kube_statefulset_replicas              | kube-state-metrics | 副本数      | 个  |
| kube_statefulset_status_replicas_ready | kube-state-metrics | Ready 副本 | 个  |



#### 16.2.5 PVC / PV

| 指标名                                                        | 来源                 | 含义       | 单位    |
| ---------------------------------------------------------- | ------------------ | -------- | ----- |
| kube_persistentvolume_capacity_bytes                       | kube-state-metrics | PV 容量    | bytes |
| kube_persistentvolumeclaim_resource_requests_storage_bytes | kube-state-metrics | PVC 请求存储 | bytes |
| kube_persistentvolume_status_phase                         | kube-state-metrics | PV 状态    | 枚举    |
| kube_persistentvolumeclaim_status_phase                    | kube-state-metrics | PVC 状态   | 枚举    |



## 十七、其他说明
> 如果本文有错误的地方或其他缺少没有写的欢迎大家反馈，我会更新到文章里；
