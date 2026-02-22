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

## 1、 Zabbix 分为哪三种架构？各自的适用场景是什么？

| 架构类型                | 特点                                                         | 适用场景                                         |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| **Server-Client**       | 最简单架构，Server 与 Agent 直接通信，无中间代理             | 网络简单、设备少的小型环境                       |
| **Server-Proxy-Client** | Proxy 作为中间桥梁，暂存数据后提交给 Server，Proxy 无前端不存数据 | 跨机房、跨网络的中型环境，解决网络隔离和负载分担 |
| **Master-Node-Client**  | 最复杂架构，每个 Node 是独立 Server，有独立数据库和配置，向 Master 同步 | 跨网络、跨机房、设备众多的大型分布式环境         |

**关键点**：Master-Node 架构中，Node 自身就是完整的 Server，Master 故障不影响 Node 下的监控；而 Proxy 只是数据中转，Server 故障会导致数据无法入库。

## 2、 Zabbix 主动监控和被动监控的区别？通信过程是怎样的？

**被动模式（Passive）**：
- Server 主动连接 Agent 请求数据
- 流程：`Server 建立 TCP → 发送请求 → Agent 响应 → 关闭连接`
- 缺点：Server 压力大，大量 Agent 时会出现积压和延迟

**主动模式（Active）**：
- Agent 主动连接 Server 获取监控项列表，定期推送数据
- 流程：`Agent 建立 TCP → 请求 items 列表 → Server 返回 → Agent 收集数据 → 主动提交 → 关闭连接`
- 优点：分散 Server 压力，适合大规模监控

**配置要点**：`StartAgents=0` 表示禁止被动模式；建议混合使用，部分主动部分被动。

## 3、Zabbix 由哪些核心组件组成？

| 组件                    | 功能说明                                         |
| ----------------------- | ------------------------------------------------ |
| **Zabbix Server**       | 中央处理单元，接收数据、判断触发器、发送告警     |
| **Zabbix Agent**        | 部署在被监控端的数据采集代理                     |
| **Zabbix Proxy**        | 分布式监控中介，减轻 Server 负载，处理跨网络场景 |
| **Zabbix Web**          | PHP 前端界面，提供配置管理和数据可视化           |
| **Database**            | 存储配置和历史数据（MySQL/PostgreSQL）           |
| **Zabbix Java Gateway** | 专门用于 JMX 监控 Java 应用                      |

## 4、什么是 Zabbix 模板（Template）？有什么作用？

**定义**：模板是预定义的监控项（Items）、触发器（Triggers）、图形（Graphs）、仪表盘（Screens）等的集合。

**核心作用**：
- **标准化**：批量应用到多个主机，统一监控配置
- **可维护性**：修改模板自动同步到所有关联主机
- **复用性**：支持模板继承（父子模板），避免重复配置
- **自动化**：配合自动发现（LLD）实现动态监控

## 5、什么是触发器（Trigger）？如何编写触发器表达式？

**定义**：触发器是基于监控项数据定义告警条件的逻辑表达式，状态在 OK 和 PROBLEM 之间切换。

**表达式语法**：
```
{<主机名>:<监控项键值>.<函数>(<参数>)}<操作符><阈值}
```

**常用函数**：
- `last()` - 最新值
- `avg(5m)` - 5分钟平均值
- `min(10m)` - 10分钟最小值
- `nodata(5m)` - 5分钟无数据
- `diff()` - 与上次值比较是否变化
- `timeleft(1h,,100)` - 预测多久后达到阈值

**示例**：
```bash
# CPU 负载过高
{www.zabbix.com:system.cpu.load[all,avg1].last()}>5

# 磁盘使用率超过 80%
{server:vfs.fs.size[/,pused].last()}>=80

# 夜间 CPU 高负载（0-6点）
{zabbix:system.cpu.load[all,avg1].min(5m)}>2 and {zabbix:system.cpu.load[all,avg1].time()}>000000 and {zabbix:system.cpu.load[all,avg1].time()}<060000

# 文件被修改（如 /etc/passwd）
{server:vfs.file.cksum[/etc/passwd].diff()}=1
```



## 6、什么是宏（Macro）？有哪些类型？

**定义**：宏是 Zabbix 中的变量，用于在模板、触发器、动作中实现动态值。

**类型**：
- **内置宏**：如 `{HOST.NAME}`, `{ITEM.VALUE}`, `{TRIGGER.NAME}`
- **用户宏**：在模板或主机级别定义，如 `{$CPU.LOAD.WARN}`
- **自动发现宏**：LLD 中的 `{#FSNAME}`, `{#IFNAME}` 等

**应用场景**：不同主机使用相同模板但阈值不同，通过宏实现参数化配置。

## 7、 如何添加一台新主机到 Zabbix？

1. **Web 界面**：配置 → 主机 → 创建主机
2. **基础信息**：填写主机名、可见名称、选择主机组
3. **接口配置**：添加 Agent（IP+端口 10050）、SNMP、JMX 或 IPMI 接口
4. **关联模板**：选择操作系统模板（如 Template OS Linux）
5. **部署 Agent**：在被监控端安装 zabbix-agent，配置 `Server=` 和 `ServerActive=` 指向 Zabbix Server
6. **验证连通性**：使用 `zabbix_get -s <IP> -k agent.ping` 测试

## 8、如何配置自定义监控项（UserParameter）？

**步骤**：
1. **编写脚本**（如 `/usr/local/zabbix/scripts/check_service.sh`），输出格式需符合 Zabbix 要求（单行值或 JSON）
2. **配置 agent**：在 `zabbix_agentd.conf.d/` 下创建 `.conf` 文件：
   ```bash
   UserParameter=service.status[*],/usr/local/zabbix/scripts/check_service.sh $1
   ```
3. **重启 Agent**：`systemctl restart zabbix-agent`
4. **Server 端测试**：`zabbix_get -s <IP> -k service.status[nginx]`
5. **Web 界面创建**：配置 → 主机 → 监控项 → 创建，键值填写 `service.status[nginx]`

**自动发现场景**：如需监控多个服务，使用 JSON 格式返回配合 LLD（Low Level Discovery）。

## 9、Zabbix 自动发现（LLD）的工作原理？

**Low Level Discovery** 用于自动发现动态资源（磁盘分区、网卡、数据库实例等）。

**流程**：
1. **发现规则**：定义键值（如 `vfs.fs.discovery` 或自定义脚本返回 JSON）
2. **原型配置**：创建监控项原型、触发器原型、图形原型，使用宏如 `{#FSNAME}`
3. **自动创建**：Agent 返回发现结果后，自动为每个资源生成监控项

**示例**（磁盘监控）：
```json
# 发现脚本返回格式
{
  "data": [
    {"{#FSNAME}": "/", "{#FSTYPE}": "ext4"},
    {"{#FSNAME}": "/data", "{#FSTYPE}": "xfs"}
  ]
}
```

## 10、如何优化 Zabbix 性能？

| 优化维度        | 具体措施                                                     |
| --------------- | ------------------------------------------------------------ |
| **数据库优化**  | 历史表分区（Partitioning）、索引优化、定期归档、使用 SSD     |
| **Housekeeper** | 调整清理周期，避免高峰期执行；或使用外部脚本清理历史数据     |
| **Proxy 分担**  | 大规模部署使用 Proxy 分散 Server 压力，减少网络延迟          |
| **监控项调优**  | 增大更新间隔（非关键项 5m/30m）、使用主动模式、禁用不必要监控项 |
| **缓存调整**    | 增加 `CacheSize`, `HistoryCacheSize`, `TrendCacheSize`       |
| **进程数配置**  | 调整 `StartPollers`, `StartTrappers`, `StartDiscoverers` 匹配负载 |
| **存储分离**    | 历史数据存 SSD，图片和配置存普通磁盘                         |

**注意**：官方建议单台 Server 上限约 5000 台设备，超过需使用 Proxy 或 Node 架构。

## 11、Zabbix Agent 无法连接，如何排查？

**排查步骤**：
1. **服务状态**：`systemctl status zabbix-agent` 确认是否运行
2. **本地测试**：`zabbix_agentd -t agent.ping` 检查 Agent 本身是否正常
3. **网络连通**：`telnet <Agent_IP> 10050` 测试端口连通性
4. **防火墙**：检查 iptables/firewalld 是否放行 10050 端口
5. **配置检查**：
   - Agent 端：`Server=` 必须包含 Server IP，`ServerActive=` 用于主动模式
   - Server 端：主机配置中的 Agent 接口 IP 和端口是否正确
6. **日志分析**：查看 `/var/log/zabbix/zabbix_agentd.log` 和 Server 端日志
7. **SELinux**：检查是否被 SELinux 拦截，可临时 `setenforce 0` 测试

## 12、触发器频繁告警（抖动）如何解决？

**解决方案**：
1. **增加触发器 hysteresis（滞后）**：设置恢复表达式与问题表达式不同
   ```bash
   # 问题：CPU > 80%
   {host:cpu.util.last()}>80
   # 恢复：CPU < 60%（避免在 80% 附近反复触发）
   {host:cpu.util.last()}<60
   ```
2. **使用 avg() 替代 last()**：`avg(5m)` 平滑瞬时峰值
3. **调整检测周期**：增大监控项更新间隔
4. **依赖关系**：设置触发器依赖，避免父故障引发子告警风暴

## 13、Zabbix 如何实现告警升级和自动化处理？

**动作（Action）配置**：
- **条件**：触发器状态 = Problem，主机组 = Linux Servers
- **操作**：
  - 第 1 步：立即发送邮件给运维人员
  - 第 2 步：5 分钟后未恢复，发送短信给主管
  - 第 3 步：10 分钟后，执行远程命令重启服务

**远程命令**：
```bash
# 在 Agent 上执行（需开启 EnableRemoteCommands=1）
{HOST.CONN:system.run[/usr/local/bin/restart_nginx.sh]}
```

## 14、Zabbix 与 Prometheus 的对比？

| 特性         | Zabbix                   | Prometheus                  |
| ------------ | ------------------------ | --------------------------- |
| **架构**     | 集中式，支持 Pull/Push   | 纯 Pull 模式，分布式        |
| **配置**     | Web UI 配置，模板化      | YAML 文件配置，适合 GitOps  |
| **数据存储** | 关系型数据库（MySQL/PG） | 自带 TSDB，高效存储时序数据 |
| **告警**     | 内置强大的告警系统       | Alertmanager 处理告警       |
| **扩展性**   | 适合传统基础设施监控     | 适合云原生、容器监控        |
| **查询语言** | 有限的前端筛选           | PromQL 强大的多维查询       |

**选型建议**：传统 IDC 环境用 Zabbix，K8s/容器环境用 Prometheus，两者可结合使用。

## 15、监控 1000 台服务器，如何设计 Zabbix 架构？

**架构设计**：
- **分层部署**：按机房或业务线部署 3-5 个 Zabbix Proxy
- **主动模式**：Agent 使用 Active 模式，减轻 Server 压力
- **模板策略**：
  - 基础模板：CPU、内存、磁盘、网络
  - 业务模板：Nginx、MySQL、Redis 等
  - 自动发现：磁盘、网卡、MySQL 实例自动发现
- **数据库**：MySQL 主从 + 历史表分区，或使用 PostgreSQL + TimescaleDB
- **高可用**：Server 端使用 Keepalived 做 VIP 切换，数据库主从复制
