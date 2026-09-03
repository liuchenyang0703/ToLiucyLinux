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
isOriginal: true
pageview: true
article: false
breadcrumb: false
comment: true
---

## 1、查看当前库和表的命令

**查看当前数据库：**

```sql
SELECT DATABASE();          -- 查看当前所在库
SHOW DATABASES;             -- 查看所有数据库
USE database_name;          -- 切换数据库
```

**查看当前表：**

```sql
SHOW TABLES;                -- 查看当前库所有表
SHOW TABLES FROM db_name;   -- 查看指定库的所有表
DESC table_name;            -- 查看表结构
SHOW CREATE TABLE table_name; -- 查看建表语句
SHOW TABLE STATUS;          -- 查看表状态信息（引擎、行数等）
```

## 2、MySQL的增删查改命令（CRUD）

**增（INSERT）：**

```sql
-- 插入单条
INSERT INTO users (name, age) VALUES ('张三', 20);

-- 插入多条
INSERT INTO users (name, age) VALUES ('李四', 25), ('王五', 30);

-- 插入查询结果
INSERT INTO users_backup SELECT * FROM users WHERE age > 18;
```

**删（DELETE/TRUNCATE）：**
```sql
-- 条件删除（可回滚，记录日志）
DELETE FROM users WHERE id = 1;

-- 清空表（快速，不可回滚，不记录单行日志）
TRUNCATE TABLE users;

-- 删除表结构
DROP TABLE users;
```

**查（SELECT）：**
```sql
-- 基础查询
SELECT * FROM users WHERE age > 20 ORDER BY id DESC LIMIT 10;

-- 聚合查询
SELECT dept_id, AVG(salary) as avg_sal 
FROM employees 
GROUP BY dept_id 
HAVING avg_sal > 5000;

-- 联表查询
SELECT u.name, o.order_no 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id;
```

**改（UPDATE）：**
```sql
-- 单表更新
UPDATE users SET age = age + 1 WHERE id = 1;

-- 多表关联更新
UPDATE users u 
JOIN orders o ON u.id = o.user_id 
SET u.last_order_time = o.create_time 
WHERE o.status = 'completed';
```

## 3、索引的作用是什么？有哪些类型？

**答：** 索引是帮助MySQL高效获取数据的数据结构，主要作用是**加快查询速度**，同时也会影响写入性能（需要维护索引树）。

**索引类型详解：**

| 类型         | 说明                           | 适用场景                        |
| ------------ | ------------------------------ | ------------------------------- |
| **主键索引** | 唯一非空，每张表只有一个       | 主键列                          |
| **唯一索引** | 列值必须唯一，允许NULL         | 手机号、邮箱等唯一字段          |
| **普通索引** | 无唯一性约束                   | 频繁查询的非唯一字段            |
| **组合索引** | 多列联合索引，遵循最左前缀原则 | 多条件查询（WHERE a=1 AND b=2） |
| **全文索引** | 针对文本内容的分词索引         | 大文本搜索（MyISAM支持更好）    |
| **覆盖索引** | 查询字段都在索引中，无需回表   | 高频查询优化                    |

**索引数据结构：**
- **B+树索引**（InnoDB默认）：支持范围查询，叶子节点存储数据
- **Hash索引**：精确匹配快，不支持范围查询（Memory引擎支持）

**索引失效场景：** 
- 在索引列上使用函数或运算（`WHERE YEAR(create_time) = 2024`）
- 前导模糊查询（`LIKE '%abc'`）
- 隐式类型转换（字符串列用数字查询）
- 违反最左前缀原则（组合索引未用第一列）
- 使用`OR`条件且部分列无索引

## 4、简述下MySQL中的事务

**答：** 事务（Transaction）是数据库操作的基本逻辑单位，由一组SQL语句组成，保证这些操作**要么全部成功提交，要么全部失败回滚**，以此维护数据的完整性和一致性。

**事务的生命周期：**
```sql
START TRANSACTION;  -- 或 BEGIN
-- 执行SQL操作
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2;
-- 检查业务规则
IF (满足条件) THEN
    COMMIT;         -- 提交，永久生效
ELSE
    ROLLBACK;       -- 回滚，恢复原状
END IF;
```

**事务的使用场景：**
- 银行转账（扣款+入账必须同时成功）
- 订单创建（订单表+库存表+日志表同时更新）
- 批量数据处理（保证数据一致性）

## 5、事务的ACID四大特性

**答：** ACID是事务的四个核心特性：

| 特性       | 英文        | 核心含义                                             | 实现机制                           |
| ---------- | ----------- | ---------------------------------------------------- | ---------------------------------- |
| **原子性** | Atomicity   | 事务是最小执行单位，不可再分，要么全成功要么全失败   | **Undo Log**（回滚日志）           |
| **一致性** | Consistency | 事务执行前后，数据库从一个合法状态变为另一个合法状态 | 约束检查+其他三大特性共同保证      |
| **隔离性** | Isolation   | 多个事务并发执行时，彼此互不干扰                     | **MVCC**（多版本并发控制）+ 锁机制 |
| **持久性** | Durability  | 事务一旦提交，数据永久保存，即使系统故障             | **Redo Log**（重做日志）+ Binlog   |

**详细解析：**
- **原子性**：通过Undo Log实现，记录修改前的数据，用于失败时回滚
- **隔离性**：通过MVCC和锁实现，避免脏读、不可重复读、幻读
- **持久性**：通过Redo Log实现WAL（Write-Ahead Logging），先写日志再刷盘

## 6、InnoDB和MyISAM存储引擎的区别

**答：** 

| 特性         | InnoDB                     | MyISAM                     |
| ------------ | -------------------------- | -------------------------- |
| **事务支持** | ✅ 支持ACID                 | ❌ 不支持                   |
| **锁粒度**   | 行级锁（高并发）           | 表级锁（并发低）           |
| **外键**     | ✅ 支持                     | ❌ 不支持                   |
| **崩溃恢复** | ✅ 支持（Redo Log）         | ❌ 不支持                   |
| **全文索引** | 5.6+支持                   | ✅ 原生支持                 |
| **存储空间** | 较高（聚簇索引）           | 较低（非聚簇索引）         |
| **适用场景** | 高并发、事务型业务（OLTP） | 读密集型、日志分析（OLAP） |

**关键区别详解：** 

**InnoDB核心优势：**
- **聚簇索引**：数据按主键顺序存储，主键查询极快
- **MVCC**：实现非阻塞读，提升并发性能
- **Buffer Pool**：缓存数据和索引，减少磁盘IO

**MyISAM适用场景：**
- 只读或读多写少的场景（如数据仓库）
- 需要全文检索且版本低于5.6时
- 表损坏后可快速修复（`REPAIR TABLE`）

**选型建议：** 除非有特殊需求（如需要压缩存储），否则**默认选择InnoDB**。

## 7、MySQL的日志类型有哪些？

**答：** MySQL有多种日志，各司其职：

| 日志类型                        | 功能描述                                    | 存储位置             | 运维场景                 |
| ------------------------------- | ------------------------------------------- | -------------------- | ------------------------ |
| **错误日志** (Error Log)        | 记录启动、运行、停止过程中的错误            | `hostname.err`       | 排查启动失败、运行异常   |
| **慢查询日志** (Slow Query Log) | 记录执行时间超过阈值的SQL                   | `hostname-slow.log`  | SQL性能优化              |
| **通用查询日志** (General Log)  | 记录所有客户端连接和SQL（生产慎用）         | `hostname.log`       | 审计、调试（性能开销大） |
| **二进制日志** (Binlog)         | 记录所有数据变更（DDL+DML），用于复制和恢复 | `binlog.000001`      | 主从复制、时间点恢复     |
| **重做日志** (Redo Log)         | InnoDB特有，记录物理页修改，崩溃恢复        | `ib_logfile0/1`      | 保证事务持久性           |
| **回滚日志** (Undo Log)         | InnoDB特有，记录数据修改前状态              | `ibdata`或独立表空间 | 事务回滚、MVCC           |
| **中继日志** (Relay Log)        | 从库特有，存储从主库接收的Binlog            | `relay-bin.000001`   | 主从复制                 |

**Redo Log vs Binlog 区别：** 
- **Redo Log**：InnoDB物理日志，记录"在某个数据页上做了什么修改"，循环写，崩溃恢复用
- **Binlog**：Server层逻辑日志，记录"原始SQL语句"，追加写，主从复制用

## 8、MySQL的隔离级别有哪些？分别解决什么问题？

**答：** SQL标准定义了4种隔离级别，MySQL默认**可重复读（Repeatable Read）**：

| 隔离级别                        | 脏读   | 不可重复读 | 幻读       | 实现机制               |
| ------------------------------- | ------ | ---------- | ---------- | ---------------------- |
| **读未提交** (Read Uncommitted) | ❌ 允许 | ❌ 允许     | ❌ 允许     | 不加锁，直接读最新数据 |
| **读已提交** (Read Committed)   | ✅ 禁止 | ❌ 允许     | ❌ 允许     | 每次查询生成ReadView   |
| **可重复读** (Repeatable Read)  | ✅ 禁止 | ✅ 禁止     | ⚠️ 部分禁止 | 事务开始时生成ReadView |
| **串行化** (Serializable)       | ✅ 禁止 | ✅ 禁止     | ✅ 禁止     | 所有操作加排他锁       |

**并发问题解释：**
- **脏读**：读到其他事务未提交的数据
- **不可重复读**：同一事务内两次读取，数据被其他事务修改
- **幻读**：同一事务内两次查询，结果集被其他事务新增/删除行

**设置隔离级别：**
```sql
-- 查看当前隔离级别
SELECT @@transaction_isolation;

-- 设置会话隔离级别
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

**注意：** InnoDB在可重复读级别通过**间隙锁（Gap Lock）**一定程度上解决了幻读问题。

## 9、如何解决主从复制中断问题？

**答：** 主从复制中断是运维高频问题，需根据错误类型分类处理。 

**常见中断原因及排查：**

| 现象                  | 原因                                  | 解决方案                                                     |
| --------------------- | ------------------------------------- | ------------------------------------------------------------ |
| Slave_IO_Running: No  | 网络不通、server_id重复、Binlog不存在 | 检查网络`telnet master_ip 3306`；检查`server_id`唯一性；检查主库Binlog是否被清理 |
| Slave_SQL_Running: No | SQL执行错误（数据不一致、语法错误）   | 查看`Last_SQL_Error`；跳过错误或修复数据                     |
| 主从延迟大            | 大事务、从库性能差、网络带宽不足      | 拆分大事务；升级从库硬件；检查网络                           |

**具体解决命令：**

```sql
-- 1. 查看复制状态
SHOW SLAVE STATUS\G

-- 2. 跳过单个错误（位点模式，谨慎使用！）
STOP SLAVE;
SET GLOBAL SQL_SLAVE_SKIP_COUNTER = 1;  -- 跳过当前事务
START SLAVE;

-- 3. 跳过GTID错误（GTID模式）
STOP SLAVE;
SET @@SESSION.GTID_NEXT = '主库UUID:具体GTID号';  -- 指定跳过的GTID
BEGIN; COMMIT;  -- 注入空事务
SET SESSION GTID_NEXT = 'AUTOMATIC';
START SLAVE;

-- 4. 重新配置复制（数据严重不一致时）
STOP SLAVE;
RESET SLAVE ALL;  -- 8.0+ 清除复制信息
CHANGE MASTER TO 
    MASTER_HOST='master_host',
    MASTER_USER='repl_user',
    MASTER_PASSWORD='password',
    MASTER_AUTO_POSITION=1;  -- GTID模式
START SLAVE;
```

**预防措施：** 
- 使用`pt-table-checksum`定期检查数据一致性
- 设置`relay_log_recovery=1`自动恢复中继日志
- 监控`Seconds_Behind_Master`延迟指标

## 10、主库宕机后如何提升从库为新主库？

**答：** 这是MySQL高可用架构中的关键操作（Failover），需确保数据一致性。

**手动切换步骤：**

```sql
-- 步骤1：在从库确认复制状态（确保数据最新）
SHOW SLAVE STATUS\G
-- 确认Exec_Master_Log_Pos接近主库当前位置

-- 步骤2：停止从库复制并清理复制信息
STOP SLAVE;
RESET SLAVE ALL;  -- MySQL 8.0+，彻底清除复制配置

-- 步骤3：提升为独立主库
RESET MASTER;  -- 清除旧Binlog，生成新Binlog文件
SET GLOBAL read_only = OFF;  -- 开启写权限
SET GLOBAL super_read_only = OFF;

-- 步骤4：业务切换（修改应用连接池指向新主库）

-- 步骤5：如果有其他从库，需重新指向新主库
-- 在其他从库执行：
STOP SLAVE;
CHANGE MASTER TO 
    MASTER_HOST='新主库IP',
    MASTER_USER='repl',
    MASTER_PASSWORD='password',
    MASTER_AUTO_POSITION=1;
START SLAVE;
```

**GTID模式下的优雅切换：**
```sql
-- 从库执行（确保已应用所有事务）
STOP SLAVE;
-- 自动获取已执行的所有GTID
-- 直接提升为主库，无需指定Binlog位置
```

**自动化方案：** 
- **MHA**（Master High Availability）：Perl编写，成熟稳定
- **Orchestrator**：Go编写，支持Web可视化，推荐
- **MGR**（MySQL Group Replication）：MySQL官方高可用方案，自动故障转移

## 11、如何优化慢查询？

**答：** 慢查询优化是DBA核心技能，遵循"定位→分析→优化"流程。 

**优化三步曲：**

**第一步：定位慢SQL**
```sql
-- 开启慢查询日志
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;  -- 阈值2秒

-- 使用mysqldumpslow分析
mysqldumpslow -s t -t 10 /var/lib/mysql/slow.log  # 取Top10
```

**第二步：执行计划分析**
```sql
EXPLAIN SELECT * FROM orders WHERE user_id = 10086;
-- 关注字段：
-- type: 访问类型（ALL/index/range/ref/eq_ref/const，越右越好）
-- key: 实际使用的索引
-- rows: 预估扫描行数
-- Extra: Using filesort（需优化排序）, Using temporary（需优化分组）
```

**第三步：针对性优化**
- **无索引**：添加索引`ALTER TABLE orders ADD INDEX idx_user_id(user_id)`
- **索引失效**：检查隐式转换、函数使用、like '%xxx'
- **大分页**：`LIMIT 1000000,10`改为延迟关联或记录上次ID
- **多表JOIN**：确保小表驱动大表，关联字段类型一致

**深度优化工具：**
```sql
-- Show Profile分析详细耗时
SET profiling = 1;
SELECT ...;
SHOW PROFILES;
SHOW PROFILE FOR QUERY 1;  -- 查看CPU/IO耗时明细
```

## 12、如何应对百万级数据删除？

**答：** 直接`DELETE`会导致大事务、锁表、主从延迟，必须分批处理。 

**正确姿势：**
```sql
-- 方案1：分批删除（推荐）
SET AUTOCOMMIT = 0;
REPEAT
    DELETE FROM logs WHERE create_time < '2023-01-01' LIMIT 1000;
    COMMIT;
    DO SLEEP(0.5);  -- 控制压力，避免主从延迟
UNTIL ROW_COUNT() = 0 END REPEAT;

-- 方案2：创建新表交换（快速清理大量数据）
CREATE TABLE logs_new LIKE logs;
RENAME TABLE logs TO logs_old, logs_new TO logs;
DROP TABLE logs_old;  -- 后台慢慢清理
```



## 13、MySQL主从复制的原理是什么？有几种复制模式？

**答：** 主从复制（Replication）是MySQL实现高可用和读写分离的基础架构。

**复制原理（异步复制流程）：** 

```
┌─────────┐    Binlog Dump    ┌─────────┐    IO Thread    ┌─────────┐
│  Master │ ─────────────────>│  Slave  │ ───────────────>│ Relay   │
│ (Binlog)│   (推送Binlog事件) │ (IO Thread)               │  Log    │
└─────────┘                   └─────────┘                 └────┬────┘
                                                               │
                          ┌─────────┐    SQL Thread     <────┘
                          │  Data   │ <──────────────────────┘
                          │ (Apply) │
                          └─────────┘
```

**核心流程：**
1. **Master** 记录所有数据变更到 **Binlog**（二进制日志）
2. **Slave** 的 **IO Thread** 连接Master，请求Binlog并写入 **Relay Log**（中继日志）
3. **Slave** 的 **SQL Thread** 读取Relay Log，重放SQL到从库

**三种复制模式：** 

| 模式                       | 原理                                    | 特点                                   | 适用场景                 |
| -------------------------- | --------------------------------------- | -------------------------------------- | ------------------------ |
| **异步复制** (Async)       | Master不等待Slave确认，直接返回客户端   | 性能最好，但可能丢数据                 | 读多写少，容忍秒级延迟   |
| **半同步复制** (Semi-sync) | Master至少等待一个Slave收到Binlog才返回 | 平衡性能与一致性，极端情况仍可能丢数据 | 金融级应用，要求数据不丢 |
| **组复制** (MGR)           | 基于Paxos协议，多数派确认才提交         | 自动故障转移，强一致性                 | 高可用架构，自动选主     |

**半同步配置：**
```sql
-- Master端
INSTALL PLUGIN rpl_semi_sync_master SONAME 'semisync_master.so';
SET GLOBAL rpl_semi_sync_master_enabled = 1;

-- Slave端  
INSTALL PLUGIN rpl_semi_sync_slave SONAME 'semisync_slave.so';
SET GLOBAL rpl_semi_sync_slave_enabled = 1;
```

## 14、MySQL支持的复制架构有哪些？

**答：** 常见复制拓扑架构：

**1. 一主一从/一主多从**
```
Master ──> Slave1
    └────> Slave2
    └────> Slave3 (级联复制)
```
- 最简单架构，Slave用于读扩展或备份

**2. 双主复制（Master-Master）**
```
Master A <──────> Master B
```
- 两边都可读写，但需处理自增ID冲突（设置`auto_increment_offset`）
- 通常采用**Active-Passive**模式，避免同时写入

**3. 级联复制（Relay Slave）**
```
Master ──> Slave1 ──> Slave2 ──> Slave3
```
- 减轻Master压力，但会增加延迟

**4. MGR组复制（推荐）**
```
┌─────────┐      ┌─────────┐      ┌─────────┐
│ Primary │<────>│ Secondary│<────>│ Secondary│
│  (R/W)  │      │  (R/O)   │      │  (R/O)   │
└─────────┘      └─────────┘      └─────────┘
```
- 自动成员管理、自动故障转移、多主模式可选

## 15、主从延迟（Seconds_Behind_Master）过大如何排查和解决？

**答：** 主从延迟是生产环境常见问题，需分层排查。 

**排查步骤：**

```sql
-- 1. 查看延迟情况
SHOW SLAVE STATUS\G
-- 关注：Seconds_Behind_Master, Slave_SQL_Running_State

-- 2. 检查IO线程状态（网络/磁盘问题）
SHOW PROCESSLIST;  -- 查看Binlog Dump线程状态

-- 3. 检查SQL线程瓶颈
SHOW FULL PROCESSLIST;  -- 查看SQL线程是否在执行大事务
SELECT * FROM performance_schema.events_stages_current 
WHERE THREAD_ID IN (SELECT THREAD_ID FROM performance_schema.threads WHERE NAME LIKE '%slave%');
```

**常见原因及解决方案：**

| 原因           | 现象                                  | 解决方案                     |
| -------------- | ------------------------------------- | ---------------------------- |
| **大事务**     | 一次性删除/更新百万级数据             | 拆分大事务为批量小事务       |
| **从库性能差** | CPU/IO饱和，SQL线程单核跑满           | 升级从库硬件，使用多线程复制 |
| **锁冲突**     | SQL线程等待MDL锁或行锁                | 优化业务SQL，避免长事务      |
| **网络带宽**   | IO线程状态"Waiting for master update" | 扩容带宽，启用压缩传输       |
| **无主键表**   | 全表扫描更新，效率极低                | 所有表必须加主键             |

**并行复制优化（MySQL 5.7+）：**
```sql
-- 基于组提交的并行复制（5.7默认）
SET GLOBAL slave_parallel_type = 'LOGICAL_CLOCK';
SET GLOBAL slave_parallel_workers = 8;  -- 根据CPU核数设置

-- 基于WriteSet的并行复制（8.0优化，事务不冲突即可并行）
SET GLOBAL binlog_transaction_dependency_tracking = 'WRITESET';
```

## 16、MySQL常见的备份方式有哪些？如何选择？

**答：** 备份是运维生命线，需根据业务特点选择策略。 

**备份类型对比：**

| 方式           | 工具        | 原理                  | 优点                   | 缺点                   | 适用场景                |
| -------------- | ----------- | --------------------- | ---------------------- | ---------------------- | ----------------------- |
| **逻辑备份**   | mysqldump   | 导出SQL语句           | 灵活，可跨版本，可编辑 | 慢，恢复慢，锁表       | 小库（<50GB），结构备份 |
| **物理备份**   | XtraBackup  | 拷贝数据文件+Redo Log | 快，不锁表，支持热备   | 文件大，跨平台受限     | 大库，生产环境首选      |
| **快照备份**   | LVM/ZFS     | 文件系统快照          | 瞬间完成，一致性好     | 依赖存储，无法单表恢复 | 超大规模库              |
| **Binlog备份** | mysqlbinlog | 持续备份增量变更      | 支持时间点恢复(PITR)   | 需配合全量备份         | 所有方案的必要补充      |

**mysqldump关键参数：**
```bash
# 一致性备份（InnoDB，不锁表）
mysqldump --single-transaction --master-data=2 --all-databases > full_backup.sql

# 关键参数说明：
--single-transaction    # 开启事务保证一致性（InnoDB）
--master-data=2         # 记录Binlog位置（用于搭建从库）
--quick                 # 分块读取大表，避免内存溢出
--lock-tables           # MyISAM需要，InnoDB不需要
```

**XtraBackup（Percona出品）使用：** 
```bash
# 全量备份
xtrabackup --backup --target-dir=/backup/full --user=root --password=xxx

# 增量备份（基于上次全量）
xtrabackup --backup --target-dir=/backup/inc1 --incremental-basedir=/backup/full

# 准备恢复（应用Redo Log）
xtrabackup --prepare --apply-log-only --target-dir=/backup/full
xtrabackup --prepare --target-dir=/backup/full --incremental-dir=/backup/inc1

# 恢复（拷贝到数据目录）
xtrabackup --copy-back --target-dir=/backup/full
chown -R mysql:mysql /var/lib/mysql
```

## 17、如何设计MySQL备份策略？（RPO/RTO考量）

**答：** 备份策略需根据业务SLA设计，核心指标：

- **RPO**（Recovery Point Objective）：最多丢失多少数据（时间维度）
- **RTO**（Recovery Time Objective）：多长时间内恢复服务

**典型备份方案：**

**方案A：中小型业务（RPO<1天，RTO<4小时）**
```
周日：XtraBackup全量物理备份
周一至周六：每日凌晨mysqldump逻辑备份 + Binlog实时备份
保留策略：本地7天，异地30天
```

**方案B：金融级业务（RPO<5分钟，RTO<30分钟）**
```
每日：XtraBackup全量备份（主库）
每4小时：增量备份
实时：Binlog同步到异地（mysqlbinlog或 Canal）
异地：延迟从库（Delay Slave，1小时延迟防误删）
```

**自动化备份脚本示例：**
```bash
#!/bin/bash
# 每日全量备份 + Binlog清理
DATE=$(date +%Y%m%d)
BACKUP_DIR=/backup/mysql/$DATE
RETENTION_DAYS=7

# 全量备份
xtrabackup --backup --compress --parallel=4 --target-dir=$BACKUP_DIR

# 校验备份
xtrabackup --prepare --target-dir=$BACKUP_DIR

# 清理旧备份
find /backup/mysql -type d -mtime +$RETENTION_DAYS -exec rm -rf {} \;

# 清理过期Binlog（保留3天）
mysql -e "PURGE BINARY LOGS BEFORE DATE(NOW() - INTERVAL 3 DAY);"
```

## 18、误删数据后如何恢复？（Delete/Drop/Truncate）

**答：** 这是DBA最紧张的场景，恢复方法取决于删除类型和备份情况。 

**场景1：误DELETE（有Binlog）**
```bash
# 1. 立即冻结写入，防止Binlog被覆盖
FLUSH LOGS;

# 2. 找到误操作前的Binlog位置
mysqlbinlog --start-datetime="2024-01-15 10:00:00" \
            --stop-datetime="2024-01-15 10:30:00" \
            --base64-output=DECODE-ROWS -v \
            mysql-bin.000123 | grep -A 10 "DELETE FROM"

# 3. 生成反向SQL（使用binlog2sql工具）
python binlog2sql.py -h127.0.0.1 -P3306 -uadmin -p'admin' \
    -d testdb -t user --start-file='mysql-bin.000123' \
    --start-pos=1234 --stop-pos=5678 -B > rollback.sql

# 4. 执行回滚
mysql -f < rollback.sql
```

**场景2：误DROP TABLE（有全备+Binlog）**
```bash
# 步骤1：从全备恢复表结构
mysql < full_backup.sql  # 只恢复结构，不恢复数据

# 步骤2：从全备提取单表数据（若全备是SQL格式）
sed -n '/CREATE TABLE `user`/,/CREATE TABLE/p' full_backup.sql > user_struct.sql
sed -n '/INSERT INTO `user`/,/INSERT INTO/p' full_backup.sql > user_data.sql

# 步骤3：应用Binlog增量（从全备时间点到现在）
mysqlbinlog --start-position=xxxx mysql-bin.000123 mysql-bin.000124 | mysql
```

**场景3：无备份，只有Binlog（极限恢复）**
```bash
# 使用工具从Binlog提取数据（如my2sql）
./my2sql -user root -password xxxx -host 127.0.0.1 -port 3306 \
    -mode repl -work-type 2sql \
    -start-file mysql-bin.000123 -stop-file mysql-bin.000125 \
    -start-datetime "2024-01-15 10:00:00" \
    -output-dir ./recovery_sql/
```

**预防措施：**
- 启用**延迟从库**（Delay Slave）：`CHANGE MASTER TO MASTER_DELAY = 3600;`
- 设置**回收站**（MySQL 8.0）：`innodb_recycle_bin`（企业版）或使用触发器实现软删除
- **权限隔离**：业务账号只给DML权限，禁止DROP/ALTER，运维操作需审批

## 19、MySQL数据迁移方案有哪些？如何做到不停机迁移？

**答：** 数据迁移是架构升级、分库分表、上云的核心场景。 

**迁移方案对比：**

| 方案             | 工具/方法               | 停机时间     | 适用场景                    |
| ---------------- | ----------------------- | ------------ | --------------------------- |
| **逻辑导出导入** | mysqldump + mysql       | 长（小时级） | 小数据量，可停机            |
| **物理文件拷贝** | XtraBackup + 拷贝       | 短（分钟级） | 同平台，大数据量            |
| **在线变更工具** | pt-online-schema-change | 无           | DDL变更（加字段/索引）      |
| **增量同步工具** | Canal/Debezium/Maxwell  | 无           | 异构同步（MySQL->Kafka/ES） |
| **官方迁移工具** | MySQL Shell Dump/Load   | 短           | MySQL 5.7->8.0升级          |

**不停机迁移标准流程（双写方案）：**

```
阶段1：数据同步
┌─────────┐         ┌─────────┐
│  Old DB │ ──────> │  New DB │  (Canal/Trigger/XtraBackup全量+增量)
│  (读写)  │         │  (只读)  │
└─────────┘         └─────────┘

阶段2：双写切换（灰度）
┌─────────┐         ┌─────────┐
│  Old DB │ <─────> │  New DB │  (业务双写，逐步切读流量)
│  (写+部分读)│       │ (部分读)  │
└─────────┘         └─────────┘

阶段3：切主
┌─────────┐         ┌─────────┐
│  Old DB │         │  New DB │  (新库变主，旧库只读保留)
│  (只读/下线)│       │  (读写)  │
└─────────┘         └─────────┘
```

**pt-online-schema-change使用（大表DDL不锁表）：** 
```bash
# 原理：创建影子表->同步增量触发器->拷贝数据->rename切换
pt-online-schema-change \
    --alter "ADD COLUMN age INT DEFAULT 0, ADD INDEX idx_age(age)" \
    --execute \
    --max-load Threads_running=50 \
    --critical-load Threads_running=80 \
    --chunk-size=1000 \
    D=testdb,t=large_table,u=root,p=password
```

**MySQL Shell逻辑升级（5.7->8.0）：**
```bash
# 导出（多线程，比mysqldump快10倍+）
mysqlsh root@127.0.0.1:3306 -- util dump-instance /backup/dump \
    --threads=8 --compression=zstd

# 导入（8.0目标库）
mysqlsh root@127.0.0.1:3308 -- util load-dump /backup/dump \
    --threads=8 --progress-file=/tmp/progress.json
```

## 20、如何搭建MySQL高可用架构？MHA vs MGR vs Orchestrator

**答：** 高可用方案选择是架构设计重点。 

**方案对比：**

| 方案                    | 架构       | 自动Failover | 数据一致性       | 复杂度 | 推荐度            |
| ----------------------- | ---------- | ------------ | ---------------- | ------ | ----------------- |
| **MHA**                 | 一主多从   | ✅ 30秒内     | 可能丢数据       | 中     | ⭐⭐⭐（传统方案）   |
| **MGR**                 | 组复制     | ✅ 自动       | 强一致（多数派） | 低     | ⭐⭐⭐⭐⭐（官方推荐） |
| **Orchestrator**        | 可视化拓扑 | ✅ 可配置     | 取决于复制模式   | 中     | ⭐⭐⭐⭐（可视化强）  |
| **ProxySQL+Keepalived** | 中间件层   | ❌ 需配合     | 依赖后端         | 高     | ⭐⭐⭐（读写分离）   |

**MGR单主模式配置（MySQL 8.0）：**
```sql
-- 所有节点执行
INSTALL PLUGIN group_replication SONAME 'group_replication.so';

SET GLOBAL group_replication_group_name = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
SET GLOBAL group_replication_local_address = 'node1:33061';  -- 各节点不同
SET GLOBAL group_replication_group_seeds = 'node1:33061,node2:33061,node3:33061';
SET GLOBAL group_replication_bootstrap_group = OFF;

-- 第一个节点引导组
SET GLOBAL group_replication_bootstrap_group = ON;
START GROUP_REPLICATION;
SET GLOBAL group_replication_bootstrap_group = OFF;

-- 其他节点加入
START GROUP_REPLICATION;

-- 查看成员
SELECT * FROM performance_schema.replication_group_members;
```

**Orchestrator高可用流程：**
```
1. 检测到主库宕机（ping失败+复制中断）
2. 从库中选主（延迟最小、数据最新、配置权重）
3. 提升从库：STOP SLAVE; RESET SLAVE ALL; 提升为主
4. 调用钩子脚本：修改VIP/DNS/配置中心
5. 其他从库重新指向新主
```

## 21、MySQL分库分表后如何迁移和扩容？

**答：** 分库分表是应对海量数据的终极方案，但迁移复杂度高。 

**分片策略：**

| 策略           | 算法           | 优点                 | 缺点                     |
| -------------- | -------------- | -------------------- | ------------------------ |
| **范围分片**   | 按ID/时间范围  | 扩容简单，范围查询快 | 热点问题（最新数据集中） |
| **Hash取模**   | user_id % 1024 | 分布均匀             | 扩容需迁移数据（rehash） |
| **一致性Hash** | 带虚拟节点     | 扩容只影响相邻节点   | 实现复杂，数据倾斜需调整 |
| **目录分片**   | 映射表维护     | 灵活，可动态调整     | 需维护路由表，单点风险   |

**平滑扩容方案（2倍扩容法）：**
```
原分片：0,1,2,3（mod 4）
新分片：0,1,2,3,4,5,6,7（mod 8）

迁移步骤：
1. 双写：应用同时写旧分片和新分片（新分片mod 8）
2. 迁移：脚本读取旧分片，按mod 8写入新分片
3. 校验：对比数据一致性
4. 切换：读流量切到新分片，停双写
5. 清理：下线旧分片
```

**ShardingSphere/JDBC分片配置示例：**
```yaml
spring:
  shardingsphere:
    datasource:
      names: ds0, ds1
    sharding:
      tables:
        t_order:
          actual-data-nodes: ds$->{0..1}.t_order_$->{0..1}
          table-strategy:
            inline:
              sharding-column: order_id
              algorithm-expression: t_order_$->{order_id % 2}
          database-strategy:
            inline:
              sharding-column: user_id
              algorithm-expression: ds$->{user_id % 2}
```

## 22、MySQL上云（AWS RDS/阿里云RDS）迁移注意事项

**答：** 云数据库迁移需考虑网络、权限、参数差异。 

**关键检查点：**

| 项目            | 自建MySQL      | 云RDS               | 处理方案                 |
| --------------- | -------------- | ------------------- | ------------------------ |
| **root权限**    | 完整           | 部分受限（无SUPER） | 使用`rds_superuser`角色  |
| **参数修改**    | 直接改配置文件 | 通过控制台/API      | 提前对比`show variables` |
| **Binlog格式**  | 可改           | 通常强制ROW         | 确认复制兼容性           |
| **时区设置**    | 系统时区       | 可能强制UTC         | 应用层处理或修改连接参数 |
| **性能_schema** | 可选开         | 通常强制开          | 关注性能开销             |

**DTS（数据传输服务）迁移流程：**
```
1. 结构迁移：DTS读取源库DDL，在目标库创建
2. 全量迁移：并发SELECT导出，LOAD DATA导入
3. 增量同步：模拟Slave，实时同步Binlog
4. 校验：数据一致性检查（行数+校验和）
5. 切换：修改应用连接串，停写旧库
6. 回滚：保留旧库只读48小时，确认无误后下线
```
