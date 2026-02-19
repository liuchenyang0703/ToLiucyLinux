---
title: 防火墙常见面试题
icon: circle-info
order: 1
category:
  - 面试题
tag:
  - 防火墙常见面试题
  - 运维
date: 2026-02-19
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 一、firewalld 防火墙

### 1.1 常用防火墙命令

```bash
# 开放单个端口（永久生效）
firewall-cmd --permanent --add-port=80/tcp

# 开放多个端口（永久生效）
firewall-cmd --permanent --add-port={80/tcp,8080/tcp,443/tcp,3306/tcp}

# 重载配置（必须执行，否则不生效）
firewall-cmd --reload

# 查看防火墙运行状态
firewall-cmd --state              # 输出：running/not running

# 查看所有配置
firewall-cmd --list-all

# 仅查看开放端口
firewall-cmd --list-ports

# 端口范围开放
firewall-cmd --permanent --add-port=1000-2000/tcp

# 指定区域(zone)操作
firewall-cmd --zone=public --add-port=80/tcp        # 对public区域操作
firewall-cmd --zone=dmz --list-ports                # 查看dmz区域端口

# 临时开放（不--permanent，重启失效）
firewall-cmd --add-port=8080/tcp                    # 立即生效，重启丢失

# 关闭/删除端口
firewall-cmd --permanent --remove-port=80/tcp       # 关闭端口
firewall-cmd --reload                               # 重载生效

# 查询特定端口是否开放
firewall-cmd --query-port=80/tcp                    # 输出：yes/no
firewall-cmd --list-ports | grep 80					# 输出80/空

# 允许特定IP访问SSH
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.100" service name="ssh" accept'

# 拒绝特定IP访问
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="10.0.0.50" reject'
```



### 1.2  runtime 和 permanent 配置有什么区别？

| 类型                  | 命令               | 特点                         |
| :-------------------- | :----------------- | :--------------------------- |
| **runtime**（运行时） | 不加 `--permanent` | 立即生效，重启丢失           |
| **permanent**（永久） | 加 `--permanent`   | 需 `--reload` 生效，重启保留 |

### 1.3 如何配置端口转发（DNAT）？

```bash
# 将访问本机8080端口的流量转发到192.168.1.100:80
firewall-cmd --permanent --add-forward-port=port=8080:proto=tcp:toport=80:toaddr=192.168.1.100

# 开启IP伪装（SNAT，必须）
firewall-cmd --permanent --add-masquerade

firewall-cmd --reload

# 验证
firewall-cmd --list-forward-ports
firewall-cmd --query-masquerade
```





## 二、iptables 防火墙

### 2.1 iptables四表五链

```bash
┌─────────────────────────────────────────┐
│              四  表                     │
├─────────────────────────────────────────┤
│  filter    过滤（默认）→ INPUT/FORWARD/OUTPUT  │
│  nat       地址转换 → PREROUTING/POSTROUTING/OUTPUT │
│  mangle    修改报文 → 所有链              │
│  raw       原始处理 → PREROUTING/OUTPUT   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│              五  链                     │
├─────────────────────────────────────────┤
│  PREROUTING  → 路由前处理（DNAT/透明代理）   │
│  INPUT       → 本机接收                   │
│  FORWARD     → 转发给其他主机             │
│  OUTPUT      → 本机发出                   │
│  POSTROUTING → 路由后处理（SNAT/MASQUERADE）│
└─────────────────────────────────────────┘
```

> filter表最常用，nat表做地址转换，mangle表改报文头部。
>
> 速记口诀：**filter过滤nat转，mangle修改raw免，PREROUTING做DNAT，POSTROUTING做SNAT，INPUT进OUTPUT出，FORWARD转发中间走**

### 2.2 常用防火墙命令

* 基础命令

```bash
# 查看规则（最常用）
iptables -L -n -v              # 列表显示，数字格式，详细信息
iptables -L -n --line-numbers  # 带行号，方便删除指定规则

# 清空规则（危险操作，慎用）
iptables -F                    # 清空所有链的规则（filter表）
iptables -X                    # 删除用户自定义链
iptables -Z                    # 清空计数器

# 开放SSH端口
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# 默认拒绝（最后一条规则）
iptables -A INPUT -j DROP

# SNAT源地址转换（共享上网）
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

* 增删改查

```bash
# ===== 增加规则（-A 追加到末尾）=====
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# 插入到第一条（-I 优先于-A）
iptables -I INPUT 1 -p tcp --dport 22 -j ACCEPT

# ===== 删除规则 =====
iptables -D INPUT -p tcp --dport 80 -j ACCEPT    # 按内容删除
iptables -D INPUT 3                             # 按行号删除（推荐）

# ===== 修改规则 =====
iptables -R INPUT 1 -p tcp --dport 22 -j DROP   # 替换第1条

# ===== 清空特定链 =====
iptables -F INPUT          # 只清空INPUT链
iptables -t nat -F         # 清空nat表
```

### 2.3  什么是连接追踪（conntrack）？有什么作用？

```bash
# 查看连接追踪表
cat /proc/net/nf_conntrack
conntrack -L                    # 需安装conntrack-tools
```

| 特性     | 说明                                                         |
| :------- | :----------------------------------------------------------- |
| **作用** | 记录连接状态，实现状态防火墙                                 |
| **状态** | NEW（新建）、ESTABLISHED（已建立）、RELATED（关联）、INVALID（无效） |
| **应用** | `-m state --state ESTABLISHED,RELATED -j ACCEPT`             |
| **问题** | 高并发时 `nf_conntrack_max` 不足会导致丢包                   |

连接追踪是 iptables 实现 **状态防火墙** 的基础，比无状态防火墙（如传统ACL）更安全。

### 2.4 防火墙保存规则

```bash
iptables-save > /etc/sysconfig/iptables       # CentOS/RHEL
iptables-save > /etc/iptables/rules.v4      # Debian/Ubuntu
service iptables save  
```



### 2.5 防火墙恢复规则

```bash
iptables-restore < /etc/sysconfig/iptables       # CentOS/RHEL
iptables-restore < /etc/iptables/rules.v4      # Debian/Ubuntu
service iptables save  
```

### 2.6  如何防DDoS/CC攻击？

```bash
# 限制连接数（防CC）
iptables -A INPUT -p tcp --dport 80 -m connlimit --connlimit-above 50 -j REJECT

# 限制新建连接速率（防SYN Flood）
iptables -A INPUT -p tcp --dport 80 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT

# 防SYN Flood（配合内核参数）
iptables -A INPUT -p tcp --syn -m limit --limit 1/s --limit-burst 3 -j ACCEPT

# 防Ping Flood
iptables -A INPUT -p icmp --icmp-type echo-request -m limit --limit 1/second -j ACCEPT
iptables -A INPUT -p icmp --icmp-type echo-request -j DROP

# 封禁恶意IP
iptables -A INPUT -s 1.2.3.4 -j DROP
iptables -A INPUT -s 5.6.7.0/24 -j DROP
```

### 2.7 规则配置了但不生效，如何排查？

```bash
# 1. 确认规则存在
iptables -L -n -v --line-numbers

# 2. 确认规则顺序（iptables从上到下匹配，匹配到即停止）
# 如果有 ACCEPT 在前，后面的 DROP 可能不生效

# 3. 查看计数器（确认是否匹配到）
iptables -L -n -v | grep 80    # 看pkts和bytes是否为0

# 4. 检查默认策略
iptables -L | grep Policy

# 5. 检查NAT表（如果是端口映射）
iptables -t nat -L -n -v

# 6. 检查IP转发（如果是NAT网关）
cat /proc/sys/net/ipv4/ip_forward   # 应为1

# 7. 抓包验证
tcpdump -i eth0 port 80
tcpdump -i eth0 host 192.168.1.100

# 8. 查看内核日志
dmesg | grep iptables
tail -f /var/log/messages
```

