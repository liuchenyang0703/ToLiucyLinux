---
title: Nginx性能优化
icon: circle-info
order: 1
category:
  - Linux
  - Nginx
tag:
  - Linux
  - Nginx
  - 运维
date: 2026-02-20
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
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


本期我来梳理一下 Nginx 性能优化的全链路方案，从**系统内核**到**应用配置**再到**架构设计**。

---

## 一、系统层优化（根基）

### 1. 文件描述符限制

```bash
# /etc/security/limits.conf
*    soft    nofile    65535
*    hard    nofile    65535

# 验证
ulimit -n
```

### 2. TCP 网络栈优化（/etc/sysctl.conf）

```bash
# 连接队列优化
net.core.somaxconn = 65535          # 全连接队列长度（默认128）
net.core.netdev_max_backlog = 65535 # 网卡队列包数

# TCP 连接复用与回收
net.ipv4.tcp_tw_reuse = 1           # 复用 TIME_WAIT 连接（客户端）
net.ipv4.tcp_tw_recycle = 0         # 已废弃，4.12+ 内核移除
net.ipv4.tcp_fin_timeout = 30       # FIN_WAIT_2 超时时间

# 保持连接优化
net.ipv4.tcp_keepalive_time = 1200  # 首次探测间隔（秒）
net.ipv4.tcp_keepalive_intvl = 15   # 探测间隔
net.ipv4.tcp_keepalive_probes = 5   # 探测次数

# 内存优化
net.core.rmem_max = 16777216        # 接收缓冲区最大值
net.core.wmem_max = 16777216        # 发送缓冲区最大值
net.ipv4.tcp_rmem = 4096 87380 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216

# 启用生效
sysctl -p
```

### 3. CPU 亲和性绑定

```nginx
worker_processes auto;               # 通常等于 CPU 核心数

# 手动绑定（8核示例）
worker_cpu_affinity 00000001 00000010 00000100 00001000 00010000 00100000 01000000 10000000;

# 或自动绑定（Nginx 1.9.10+）
worker_cpu_affinity auto;
```

---

## 二、Nginx 核心配置优化

### 1. Events 模块（并发根基）

```nginx
events {
    use epoll;                       # Linux 高性能模型（macOS 用 kqueue）
    worker_connections 65535;        # 单 Worker 最大连接数
    
    # 计算公式：max_clients = worker_processes * worker_connections / 2（HTTP 请求需要双向）
    
    multi_accept on;                 # 一次接受所有新连接（默认 off）
    accept_mutex off;                # 关闭互斥锁（多核且高并发时建议关闭，利用 EPOLLEXCLUSIVE）
    accept_mutex_delay 500ms;        # 抢锁间隔（accept_mutex on 时有效）
}
```

### 2. HTTP 基础优化

```nginx
http {
    # 文件传输优化（零拷贝三件套）
    sendfile on;                     # 内核态直接传输，跳过用户态
    tcp_nopush on;                   # 数据包累积后发送（减少网络碎片）
    tcp_nodelay on;                  # 实时发送小数据（与 nopush 不冲突，针对不同场景）
    
    # 连接保持
    keepalive_timeout 65;            # 长连接保持时间
    keepalive_requests 1000;         # 单连接最大请求数（防止内存泄漏）
    
    # 重置超时连接（避免僵尸连接占用资源）
    reset_timedout_connection on;
    
    # 客户端请求限制
    client_body_buffer_size 128k;    # 请求体缓冲区（小于此值内存存储，大于则写文件）
    client_max_body_size 50m;        # 最大上传文件大小
    client_header_buffer_size 4k;    # 请求头缓冲区
    large_client_header_buffers 4 8k; # 大请求头缓冲
    
    # 高效文件传输
    sendfile_max_chunk 512k;         # 单次 sendfile 传输最大值（防止大文件阻塞）
}
```

### 3. 压缩优化（CPU 换带宽）

```nginx
gzip on;
gzip_vary on;                        # 添加 Vary: Accept-Encoding 头
gzip_proxied any;                    # 对代理请求也压缩
gzip_comp_level 5;                   # 压缩级别 1-9（5 是性价比最佳点）
gzip_min_length 1k;                  # 小于 1KB 不压缩
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/json
    application/javascript
    application/xml+rss
    application/atom+xml
    image/svg+xml;

# Brotli 压缩（更好压缩率，需编译模块）
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/json;
```

---

## 三、静态资源优化（Nginx 强项）

### 1. 浏览器缓存策略

```nginx
# 强缓存（文件名有 hash 的资源）
location ~* \.[a-f0-9]{8,}\.(css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;                  # 关闭日志，减少磁盘 IO
}

# 图片长期缓存
location ~* \.(jpg|jpeg|png|gif|ico|webp)$ {
    expires 6M;
    add_header Cache-Control "public";
    access_log off;
}

# 字体文件
location ~* \.(woff|woff2|ttf|otf|eot)$ {
    expires 1y;
    add_header Cache-Control "public";
    access_log off;
}

# 无 hash 的 HTML 不缓存（总是获取最新）
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header Pragma "no-cache";
}
```

### 2. 文件描述符缓存（open_file_cache）

```nginx
http {
    # 文件元数据缓存（关键优化！）
    open_file_cache max=10000 inactive=30s;  # 最多缓存 10000 个文件，30s 无访问淘汰
    open_file_cache_valid 60s;               # 每 60s 检查文件是否变化
    open_file_cache_min_uses 2;              # 至少访问 2 次才缓存
    open_file_cache_errors on;               # 缓存文件不存在等错误信息（防止重复系统调用）
}
```

**效果：** 高并发静态文件场景，减少 50%+ 的系统调用。

---

## 四、代理与负载均衡优化

### 1. 长连接池（减少 TCP 握手开销）

```nginx
upstream backend {
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
    
    keepalive 100;               # 保持 100 个空闲长连接
    keepalive_timeout 60s;       # 长连接空闲超时
    keepalive_requests 1000;     # 单连接最大请求数
}

server {
    location / {
        proxy_pass http://backend;
        
        # 启用 HTTP/1.1 以支持 keepalive
        proxy_http_version 1.1;
        proxy_set_header Connection "";  # 清空 Connection 头，使用 keepalive
        
        # 超时设置
        proxy_connect_timeout 5s;        # 连接建立超时
        proxy_send_timeout 10s;          # 发送超时
        proxy_read_timeout 30s;          # 读取响应超时
        
        # 缓冲优化（减少后端压力）
        proxy_buffering on;              # 启用代理缓冲
        proxy_buffer_size 4k;            # 响应头缓冲区
        proxy_buffers 8 4k;              # 8 个 4k 缓冲区
        proxy_busy_buffers_size 8k;      # 忙时缓冲区
        
        # 临时文件阈值（响应大于此值写磁盘）
        proxy_max_temp_file_size 1024m;
        proxy_temp_file_write_size 64k;
    }
}
```

### 2. 负载均衡算法选择

```nginx
upstream backend {
    # 轮询（默认，均分）
    server 192.168.1.10 weight=5;
    server 192.168.1.11 weight=5;
    
    # 最少连接（长连接或处理时间不均时更优）
    least_conn;
    
    # IP 哈希（会话保持，但可能导致不均衡）
    ip_hash;
    
    # 一致性哈希（第三方模块，动态增删节点影响小）
    hash $request_uri consistent;
    
    # 健康检查（第三方 nginx_upstream_check_module）
    check interval=3000 rise=2 fall=3 timeout=1000 type=http;
    check_http_send "HEAD /health HTTP/1.0\r\n\r\n";
    check_http_expect_alive http_2xx http_3xx;
}
```

---

## 五、日志与监控优化

### 1. 异步日志（减少磁盘 IO 阻塞）

```nginx
error_log /var/log/nginx/error.log warn;  # 只记录 warn 以上级别

access_log /var/log/nginx/access.log main buffer=32k flush=5s;
# buffer=32k: 缓冲区满 32KB 才写入
# flush=5s:  最多 5 秒强制刷新

# 高并发场景可完全关闭访问日志
# access_log off;
```

### 2. 条件日志（减少无用记录）

```nginx
map $status $loggable {
    ~^[23]  0;      # 2xx 3xx 不记录
    default 1;
}

access_log /var/log/nginx/access.log main if=$loggable;
```

---

## 六、SSL/TLS 优化（HTTPS 场景）

```nginx
server {
    listen 443 ssl http2;            # 启用 HTTP/2
    
    # 证书配置
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # 协议与加密套件
    ssl_protocols TLSv1.2 TLSv1.3;   # 禁用旧协议
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers on;
    
    # 会话缓存（减少握手开销）
    ssl_session_cache shared:SSL:50m;  # 50MB 共享缓存，约 20000 个会话
    ssl_session_timeout 1d;
    ssl_session_tickets off;           # 禁用 session tickets（安全性考虑）
    
    # OCSP Stapling（减少客户端验证时间）
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_trusted_certificate /path/to/chain.pem;
    
    # 证书动态加载（Nginx 1.15.9+）
    ssl_certificate_by_lua_block {
        -- 动态加载证书逻辑（OpenResty）
    }
}
```

---

## 七、架构层优化

### 1. 多级缓存架构

```
用户请求
    │
    ├──► CDN（边缘缓存，静态资源）◄── 全球 3000+ 节点
    │         命中 ──► 直接返回（< 50ms）
    │         未命中
    │            │
    ▼            ▼
[Nginx 层] ◄── 回源 ──► 浏览器缓存 / 本地代理缓存
    │
    ├──► 本地缓存（proxy_cache / fastcgi_cache）
    │         命中 ──► 返回（< 5ms）
    │         未命中
    │            │
    ▼            ▼
[应用层] ◄── 回源 ──► Redis / Memcached（数据缓存）
    │
    └──► 数据库
```

```nginx
# Nginx 本地缓存配置
proxy_cache_path /data/nginx/cache levels=1:2 keys_zone=STATIC:100m 
                 inactive=24h max_size=10g use_temp_path=off;

server {
    location / {
        proxy_cache STATIC;
        proxy_cache_valid 200 302 10m;    # 200/302 缓存 10 分钟
        proxy_cache_valid 404      1m;    # 404 缓存 1 分钟
        proxy_cache_use_stale error timeout invalid_header updating;
                                         # 后端故障时返回过期缓存
        
        proxy_cache_key "$scheme$request_method$host$request_uri";
        proxy_pass http://backend;
    }
}
```

### 2. 动态分离与专用集群

```nginx
# 静态资源服务器（专用实例，无代理逻辑）
server {
    listen 80;
    server_name static.example.com;
    root /data/static;
    
    location ~* \.(css|js|png|jpg)$ {
        expires 1y;
        access_log off;
        sendfile on;
        tcp_nopush on;
    }
}

# 动态 API 服务器（反向代理专用）
server {
    listen 80;
    server_name api.example.com;
    
    location / {
        proxy_pass http://api_backend;
        proxy_buffering off;             # 实时流式响应
        proxy_cache off;                 # API 通常不缓存
    }
}
```

---

## 八、性能测试与验证

### 1. 基准测试工具

```bash
# Apache Bench（简单测试）
ab -n 100000 -c 1000 -k http://localhost/

# wrk（现代高性能）
wrk -t12 -c400 -d30s --latency http://localhost/

# ngtcp2（HTTP/2 测试）
h2load -n100000 -c100 -m10 https://localhost/
```

### 2. 关键指标监控

```nginx
# 启用 stub_status 模块
location /nginx_status {
    stub_status on;
    allow 127.0.0.1;
    deny all;
}

# 输出示例：
Active connections: 291              # 当前活跃连接（Reading + Writing + Waiting）
server accepts handled requests
  16630948 16630948 31070465         # 总接受连接、总处理连接、总请求数
Reading: 6 Writing: 125 Waiting: 160 # 读请求头/写响应/保持连接等待
```

**健康指标：**
- `Writing` 持续高：后端响应慢或网络瓶颈
- `Waiting` 高：keepalive 生效，正常
- `Reading` 高：客户端发送数据慢

---

## 九、优化检查清单

| 层级 | 检查项 | 预期效果 |
|------|--------|----------|
| **系统** | 文件描述符 ≥ 65535 | 避免 "too many open files" |
| **系统** | TCP 连接复用启用 | 减少 TIME_WAIT 堆积 |
| **Nginx** | worker_processes = CPU 核数 | 最大化多核利用 |
| **Nginx** | sendfile + tcp_nopush + tcp_nodelay | 零拷贝传输 |
| **Nginx** | open_file_cache 启用 | 减少系统调用 50%+ |
| **Nginx** | gzip 级别 4-6 | 平衡 CPU 与带宽 |
| **代理** | upstream keepalive | 减少 TCP 握手开销 |
| **缓存** | 浏览器缓存 + CDN + Nginx 缓存 | 分层防御，减轻源站 |
| **日志** | buffer 或异步写入 | 避免磁盘 IO 阻塞 |
| **SSL** | session cache + HTTP/2 | 减少握手延迟 |