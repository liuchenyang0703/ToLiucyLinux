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

| 层级         | 机制          | 说明                                                        |
| :----------- | :------------ | :---------------------------------------------------------- |
| **认证**     | 内置数据库    | 默认方式，用户名/密码存储在 RabbitMQ 内部                   |
|              | LDAP/AD 集成  | 对接企业统一身份认证                                        |
|              | HTTP API 认证 | `rabbitmq-auth-backend-http` 插件                           |
|              | OAuth 2.0     | 新版支持 JWT Token 认证                                     |
| **授权**     | Vhost 隔离    | 不同业务使用独立 Vhost，权限完全隔离                        |
|              | 细粒度权限    | `configure`/`write`/`read` 三种权限分别控制                 |
| **传输安全** | SSL/TLS       | 配置证书加密 AMQP/HTTPS/MQTT 通信                           |
|              | 证书双向认证  | mTLS 验证客户端身份                                         |
| **网络安全** | 防火墙        | 限制 5672(AMQP)、15672(Management)、15674(Web STOMP) 等端口 |
|              | 网络分区策略  | 配置 `cluster_partition_handling` 防止脑裂                  |

## 2、什么是 RabbitMQ？它的核心组件是什么？

**RabbitMQ** 是基于 **AMQP 0-9-1** 协议的开源消息代理软件，采用 Erlang 编写，具有高可用、高可靠、灵活路由等特性。

**核心组件**

| 组件         | 作用       | 关键特性                                    |
| :----------- | :--------- | :------------------------------------------ |
| **Producer** | 消息生产者 | 创建消息并指定 Routing Key                  |
| **Consumer** | 消息消费者 | 订阅队列处理消息，支持 Push/Pull 模式       |
| **Queue**    | 消息队列   | FIFO 存储，可配置持久化、排他、自动删除     |
| **Exchange** | 交换机     | **核心路由组件**，决定消息如何分发到队列    |
| **Binding**  | 绑定关系   | Exchange 与 Queue 的路由规则（Binding Key） |
| **Vhost**    | 虚拟主机   | 逻辑隔离，相当于独立的 RabbitMQ 实例        |
| **Channel**  | 信道       | 轻量级连接，建立在真实 TCP 连接上的虚拟连接 |

**交换机类型（Exchange Types）**

| 类型        | 路由规则                                   | 场景               |
| :---------- | :----------------------------------------- | :----------------- |
| **Direct**  | 精确匹配 Routing Key                       | 点对点消息         |
| **Fanout**  | 广播到所有绑定队列                         | 发布/订阅          |
| **Topic**   | 模式匹配（`*` 匹配一个单词，`#` 匹配多个） | 日志分类、事件订阅 |
| **Headers** | 匹配消息 Headers                           | 多条件复杂路由     |

## 3、如何确保消息不丢失？（可靠性保障）

**三层防护机制**

```
┌─────────────────────────────────────────┐
│  第一层：生产者确认 (Producer Confirm)      │
│  - 开启 confirm 模式                      │
│  - 异步/同步等待 Broker ACK               │
├─────────────────────────────────────────┤
│  第二层：消息持久化 (Message Persistence)   │
│  - Exchange 持久化 (durable=true)         │
│  - Queue 持久化 (durable=true)            │
│  - 消息持久化 (delivery_mode=2)           │
├─────────────────────────────────────────┤
│  第三层：消费者确认 (Consumer Ack)          │
│  - 关闭 autoAck，手动确认                 │
│  - 业务处理完成后再发送 ACK               │
│  - 失败可 NACK/Requeue 或转入死信队列      │
└─────────────────────────────────────────┘
```

**代码配置示例**

```java
// 生产者确认
channel.confirmSelect();
channel.addConfirmListener(
    (deliveryTag, multiple) -> { /* 成功回调 */ },
    (deliveryTag, multiple) -> { /* 失败重发 */ }
);

// 消息持久化
AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
    .deliveryMode(2)  // 持久化
    .build();
channel.basicPublish(exchange, routingKey, props, message.getBytes());

// 消费者手动 ACK
channel.basicConsume(queue, false, (consumerTag, delivery) -> {
    try {
        processMessage(delivery.getBody());
        channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
    } catch (Exception e) {
        channel.basicNack(deliveryTag, false, true); // requeue=true 重入队
    }
}, consumerTag -> {});
```

## 4、RabbitMQ 有哪些常见的性能瓶颈？如何解决？

| 瓶颈类型     | 现象                   | 解决方案                                                     |
| :----------- | :--------------------- | :----------------------------------------------------------- |
| **磁盘 I/O** | 消息堆积时写入延迟高   | SSD 替代 HDD；`RABBITMQ_MNESIA_DIR` 和日志分离到不同磁盘；开启 `queue_index_embed_msgs_below` |
| **内存**     | 内存告警，消息转存磁盘 | 增加物理内存；配置 `vm_memory_high_watermark`（默认 0.4）；使用惰性队列（Lazy Queues） |
| **CPU**      | 复杂路由计算消耗 CPU   | 避免 Topic 交换机的复杂模式；减少正则匹配；使用 Direct 替代 Topic |
| **网络**     | 小消息网络开销占比高   | 开启消息压缩；批量发送（Batch Publish）；合并小消息          |
| **连接数**   | 连接过多导致资源耗尽   | 使用连接池；一个连接多个 Channel（线程安全）；配置 `connection_max` |
| **队列长度** | 单队列消息过多         | 分片队列（Sharded Queues）；使用 Federation/Shovel 分流      |

**关键监控指标**

```bash
# 查看节点状态
rabbitmqctl status

# 查看队列堆积
rabbitmqctl list_queues name messages_ready messages_unacknowledged

# 查看内存使用
rabbitmq-diagnostics memory_breakdown
```

## 5、如何创建和管理用户权限？

* 常用命令

```bash
# ========== 用户管理 ==========
# 创建用户
rabbitmqctl add_user myuser mypassword

# 修改密码
rabbitmqctl change_password myuser newpassword

# 删除用户
rabbitmqctl delete_user myuser

# 列出用户
rabbitmqctl list_users

# ========== 权限管理 ==========
# 创建 Vhost
rabbitmqctl add_vhost /myvhost

# 设置权限 (configure write read)
rabbitmqctl set_permissions -p /myvhost myuser ".*" ".*" ".*"

# 权限正则说明：
# ".*"  = 所有资源
# "^$"  = 无权限
# "^amq.gen" = 只允许以 amq.gen 开头的资源

# 查看权限
rabbitmqctl list_permissions -p /myvhost
rabbitmqctl list_user_permissions myuser

# ========== 角色标签 ==========
rabbitmqctl set_user_tags myuser administrator

# 可选标签：
# - administrator：超级管理员，可管理所有
# - monitoring：  可查看所有连接、通道、节点信息
# - policymaker： 可管理策略和 Vhost 参数
# - management：  仅可访问管理插件
# - none：        普通用户（默认）
```

## 6、什么是死信队列（DLX）？如何配置？

**死信来源：**
- 消息被 NACK 且 `requeue=false`
- 消息 TTL 过期
- 队列达到最大长度

**配置方式：**
```java
// 声明队列时指定 DLX
Map<String, Object> args = new HashMap<>();
args.put("x-dead-letter-exchange", "dlx.exchange");
args.put("x-dead-letter-routing-key", "dlx.routing.key");
args.put("x-message-ttl", 60000);  // 消息 TTL
args.put("x-max-length", 10000);   // 队列最大长度

channel.queueDeclare("my.queue", true, false, false, args);
```

## 7、RabbitMQ 集群模式有哪些？

| 模式           | 特点                           | 适用场景             |
| :------------- | :----------------------------- | :------------------- |
| **普通集群**   | 元数据共享，队列数据单节点存储 | 非关键业务，需高吞吐 |
| **镜像队列**   | 队列数据同步到多个节点         | 高可用要求（HA）     |
| **Federation** | 跨机房/跨网络异步复制          | 异地多活，网络不稳定 |
| **Shovel**     | 主动拉取/推送消息到另一节点    | 数据迁移、跨集群同步 |

**镜像队列策略配置：**
```bash
rabbitmqctl set_policy ha-all "^" '{"ha-mode":"all","ha-sync-mode":"automatic"}'
```

## 8、如何处理消息重复消费？

| 方案         | 实现方式                                   |
| :----------- | :----------------------------------------- |
| **幂等设计** | 数据库唯一索引、Redis SETNX、状态机校验    |
| **消息去重** | 消费端维护已处理 Message ID 的布隆过滤器   |
| **业务幂等** | 订单状态机：已支付订单再次支付直接返回成功 |

## 9、RabbitMQ 与 Kafka 的区别？

| 维度           | RabbitMQ                 | Kafka                  |
| :------------- | :----------------------- | :--------------------- |
| **设计目标**   | 通用消息队列，复杂路由   | 高吞吐日志流处理       |
| **消息模型**   | 传统队列，支持 Push/Pull | 分区日志，只支持 Pull  |
| **吞吐量**     | 万级/秒                  | 百万级/秒              |
| **消息顺序**   | 单队列有序               | 分区有序，全局无序     |
| **消息持久化** | 可选                     | 默认持久化，设计即持久 |
| **消费模式**   | 竞争消费、广播           | 消费者组模式           |
| **适用场景**   | 实时性要求高、复杂路由   | 大数据日志、流处理     |

## 10、RabbitMQ 脑裂（Network Partition）如何处理？

```bash
# 查看网络分区状态
rabbitmq-diagnostics cluster_status

# 处理策略（rabbitmq.conf）
cluster_partition_handling = ignore       # 默认，需人工处理
# 或
cluster_partition_handling = autoheal     # 自动愈合
# 或  
cluster_partition_handling = pause_minority  # 少数派暂停
# 或
cluster_partition_handling = pause_if_all_down  # 全部宕机时暂停
```

**人工恢复步骤：**

1. 停止次要分区节点：`rabbitmqctl stop_app`
2. 重置节点：`rabbitmqctl reset`
3. 重新加入集群：`rabbitmqctl join_cluster rabbit@main-node`
4. 启动应用：`rabbitmqctl start_app`

## 11、RabbitMQ 的内存告警和磁盘告警是什么？如何处理？

* [x] 内存告警（Memory Alarm）

**触发条件：** 内存使用超过 `vm_memory_high_watermark`（默认 0.4，即 40%）

**现象：** 所有连接被阻塞，无法接收新消息

**解决方案：**
```bash
# 临时调整水位线
rabbitmqctl set_vm_memory_high_watermark 0.6

# 永久配置（rabbitmq.conf）
vm_memory_high_watermark.relative = 0.6
# 或绝对值
vm_memory_high_watermark.absolute = 2GB
```

**紧急处理：**
- 增加内存
- 删除无用队列/消息
- 启用惰性队列（Lazy Queue）：消息直接存磁盘



* [x] 磁盘告警（Disk Alarm）

**触发条件：** 磁盘剩余空间低于 `disk_free_limit`（默认 50MB）

**现象：** 所有生产者被阻塞

**解决方案：**
```bash
# 查看磁盘限制
rabbitmqctl status | grep disk

# 调整配置
disk_free_limit.absolute = 1GB
# 或相对值（内存的倍数）
disk_free_limit.relative = 2.0
```

## 12、什么是惰性队列（Lazy Queue）？有什么优势？

**定义：** 消息直接写入磁盘，不保留在内存中

**开启方式：**
```java
Map<String, Object> args = new HashMap<>();
args.put("x-queue-mode", "lazy");  // 经典方式

// 或策略方式（推荐）
rabbitmqctl set_policy Lazy "^lazy\." '{"queue-mode":"lazy"}'
```

| 特性               | 普通队列           | 惰性队列                   |
| :----------------- | :----------------- | :------------------------- |
| 内存占用           | 高（尽量驻留内存） | 低（直接写磁盘）           |
| 吞吐量             | 高                 | 略低                       |
| 适用场景           | 短队列、实时性高   | 长队列、消息堆积、内存紧张 |
| 持久化消息重启恢复 | 需从磁盘加载       | 已在磁盘，恢复更快         |

**RabbitMQ 3.12+ 默认所有队列为惰性队列**

## 13、如何监控 RabbitMQ？常用指标有哪些？

* 监控方式

| 方式                   | 说明                                          |
| :--------------------- | :-------------------------------------------- |
| Management Plugin      | Web UI + HTTP API（`http://host:15672/api/`） |
| Prometheus + Grafana   | `rabbitmq_prometheus` 插件（推荐）            |
| `rabbitmq-diagnostics` | 命令行诊断工具                                |
| `rabbitmqctl`          | 基础管理命令                                  |

* 核心监控指标

```bash
# 节点级指标
rabbitmq_uptime                    # 运行时间
rabbitmq_process_resident_memory_bytes  # 内存使用
rabbitmq_disk_space_available_bytes     # 磁盘剩余

# 队列级指标
rabbitmq_queue_messages_ready      # 就绪消息数
rabbitmq_queue_messages_unacked    # 未确认消息数
rabbitmq_queue_messages            # 总消息数
rabbitmq_queue_consumers           # 消费者数量
rabbitmq_queue_memory              # 队列内存占用

# 连接级指标
rabbitmq_connections               # 连接数
rabbitmq_channels                  # 信道数
```

* 关键告警规则

| 告警项         | 阈值建议           |
| :------------- | :----------------- |
| 内存使用率     | > 70%              |
| 磁盘剩余空间   | < 1GB 或 < 10%     |
| 单队列消息堆积 | > 10万条           |
| 消费者连接断开 | = 0 且消息持续增长 |
| 消息消费延迟   | > 5分钟            |

## 14、RabbitMQ 如何实现高可用（HA）？

- 架构方案

```
┌─────────────────────────────────────┐
│           Load Balancer             │
│         (HAProxy/Nginx)             │
└─────────────┬───────────────────────┘
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐
│ Node1 │◄┼►│ Node2 │◄┼►│ Node3 │
│Disc   │ │ │RAM    │ │ │Disc   │
└───────┘ └───────┘ └───────┘
   ▲    ╲   ▲   ╱    ▲
   └──────┴──┴──┴────┘
      镜像队列同步
```

* 配置要点

```bash
# 1. 节点类型
rabbitmqctl join_cluster rabbit@node1 --ram   # RAM节点（内存元数据）
rabbitmqctl join_cluster rabbit@node1         # Disc节点（默认，磁盘元数据）

# 2. 镜像队列策略（关键）
rabbitmqctl set_policy ha-two "^" '{"ha-mode":"exactly","ha-params":2,"ha-sync-mode":"automatic"}'

# ha-mode 选项：
# - all：同步到所有节点
# - exactly：同步到指定数量节点
# - nodes：同步到指定节点列表

# 3. 客户端连接配置（故障转移）
factory.setAutomaticRecoveryEnabled(true);    // 自动恢复
factory.setNetworkRecoveryInterval(5000);     // 重连间隔
factory.setRequestedHeartbeat(30);            // 心跳检测
```

## 15、消息 TTL 和队列 TTL 的区别？

| 类型         | 配置方式                                | 作用对象 | 使用场景                 |
| :----------- | :-------------------------------------- | :------- | :----------------------- |
| **消息 TTL** | `x-message-ttl`（队列属性）或发送时指定 | 单条消息 | 订单超时取消、验证码过期 |
| **队列 TTL** | `x-expires`                             | 整个队列 | 临时队列自动清理         |

```java
// 消息 TTL（队列级，所有消息统一过期）
args.put("x-message-ttl", 60000);  // 60秒

// 消息 TTL（单条消息）
AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
    .expiration("60000")  // 毫秒
    .build();

// 队列 TTL（队列空闲多久后自动删除）
args.put("x-expires", 1800000);  // 30分钟无访问则删除
```

**注意：** 消息 TTL 过期不一定立即删除，只有到队列头部才会被丢弃或转入死信队列

## 16、RabbitMQ 的流队列（Stream Queue）是什么？

**RabbitMQ 3.9+ 引入**，专为高吞吐、持久化、重放场景设计

- 核心特性

| 特性         | 说明                               |
| :----------- | :--------------------------------- |
| 仅追加日志   | 类似 Kafka，消息不可变             |
| 持久化优先   | 消息直接落盘，支持 GB 级 retention |
| 非破坏性消费 | 多个消费者可重复读取，支持 offset  |
| 高吞吐       | 比镜像队列高 3-5 倍                |

- 使用场景

  - 事件溯源（Event Sourcing）

  - 日志收集与分析

  - 需要消息重放（replay）的场景


```java
// 声明流队列
Map<String, Object> args = new HashMap<>();
args.put("x-queue-type", "stream");
args.put("x-max-age", "1D");        // 保留1天
args.put("x-stream-max-segment-size-bytes", 500000000);  // 段大小500MB

channel.queueDeclare("my-stream", true, false, false, args);
```

## 17、RabbitMQ 数据迁移方案

### 场景 1：单机 → 集群

```bash
# 1. 启用 shovel 插件
rabbitmq-plugins enable rabbitmq_shovel rabbitmq_shovel_management

# 2. 配置 shovel 动态迁移
rabbitmqctl set_parameter shovel my-shovel '{
  "src-uri": "amqp://user:pass@old-server",
  "src-queue": "my-queue",
  "dest-uri": "amqp://user:pass@new-cluster",
  "dest-queue": "my-queue"
}'
```

### 场景 2：跨版本升级

| 方式     | 步骤                                  | 适用          |
| :------- | :------------------------------------ | :------------ |
| 蓝绿部署 | 新集群部署 → 双写 → 切流 → 下线旧集群 | 零停机        |
| 滚动升级 | 逐节点停止 → 升级 → 重启              | 小版本升级    |
| 镜像迁移 | 新节点加入 → 同步数据 → 旧节点退出    | 集群扩容/替换 |

## 18、RabbitMQ 连接泄露如何排查？

**现象：** 连接数持续增长，最终耗尽资源

**排查命令：**
```bash
# 查看连接详情
rabbitmqctl list_connections peer_host peer_port user state channels

# 查看通道详情
rabbitmqctl list_channels connection pid consumer_count

# 查看消费者
rabbitmqctl list_consumers
```

**常见原因：**
1. **未关闭 Channel**：Channel 未 `close()`，比连接更耗资源
2. **连接未复用**：每次发送新建连接（应复用连接，多线程使用 Channel）
3. **异常未处理**：网络异常后未正确关闭资源

**最佳实践：**
```java
// 使用 try-with-resources 或 finally 确保关闭
try (Connection conn = factory.newConnection();
     Channel channel = conn.createChannel()) {
    // 发送消息
} catch (Exception e) {
    // 异常处理
}
// 或使用连接池：Spring AMQP 的 CachingConnectionFactory
```

## 19、RabbitMQ 消息积压（Backlog）如何处理？

- 紧急处理流程

```
1. 定位原因
   └── 消费者宕机？处理慢？代码 Bug？

2. 临时扩容
   └── 增加消费者实例（水平扩展）
   └── 注意：单队列只能单节点消费，需拆分队列

3. 降级方案
   └── 开启惰性队列，缓解内存压力
   └── 丢弃非关键消息（配置 x-max-length）

4. 长期优化
   └── 拆分队列，实现真正并行消费
   └── 优化消费者性能（批量处理、异步化）
```

- 跳过/丢弃堆积消息

```bash
# 清空队列（危险操作！）
rabbitmqctl purge_queue my-queue

# 或配置队列长度限制，自动丢弃头部
rabbitmqctl set_policy limit "^my-queue$" '{"max-length":10000,"overflow":"drop-head"}'
```

## 20、RabbitMQ 3.12+ 重大变化

| 特性             | 变化                                         |
| :--------------- | :------------------------------------------- |
| **默认队列类型** | 经典队列 → **仲裁队列（Quorum Queues）**     |
| **仲裁队列**     | 基于 Raft 共识算法，替代镜像队列，更高一致性 |
| **默认持久化**   | 所有队列默认惰性模式                         |
| **MQTT 5.0**     | 原生支持                                     |
| **AMQP 1.0**     | 核心支持（非插件）                           |

- 仲裁队列 vs 镜像队列

| 特性       | 镜像队列           | 仲裁队列（推荐）         |
| :--------- | :----------------- | :----------------------- |
| 一致性算法 | 异步复制           | Raft 共识                |
| 数据安全   | 可能丢失           | 强一致                   |
| 吞吐量     | 高                 | 略低                     |
| 故障恢复   | 需同步             | 自动选举 Leader          |
| 适用场景   | 高吞吐允许少量丢失 | 金融交易、订单等关键业务 |

```java
// 声明仲裁队列
Map<String, Object> args = new HashMap<>();
args.put("x-queue-type", "quorum");
args.put("x-quorum-initial-group-size", 3);  // 副本数

channel.queueDeclare("my-quorum-queue", true, false, false, args);
```

