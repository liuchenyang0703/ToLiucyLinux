---
title: Nginx常见面试题
icon: circle-info
order: 1
category:
  - 面试题
tag:
  - Nginx常见面试题
  - 运维
date: 2026-02-07
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1、什么是Nginx？它有什么特点？

**答：** Nginx是一款高性能的HTTP和反向代理服务器，也是一个IMAP/POP3/SMTP代理服务器。

**核心特点：**

- **高并发**：采用异步非阻塞事件驱动架构（epoll/kqueue），单机可支持数万并发连接
- **低内存消耗**：处理静态文件时，10,000个非活动HTTP保持连接仅占用约2.5MB内存
- **高可靠性**：支持热部署，可以在不间断服务的情况下升级可执行文件和配置文件
- **模块化设计**：丰富的第三方模块生态

## 2、Nginx与Apache的区别？

| 特性          | Nginx                   | Apache                    |
| ------------- | ----------------------- | ------------------------- |
| **架构模型**  | 事件驱动（异步非阻塞）  | 进程/线程驱动（同步阻塞） |
| **静态资源**  | 极高效                  | 一般                      |
| **动态内容**  | 需配合后端（PHP-FPM等） | 内置模块支持（mod\_php）  |
| **配置语法**  | 简洁                    | 较复杂                    |
| **内存占用**  | 低                      | 高                        |
| **.htaccess** | 不支持                  | 支持                      |
| **模块开发**  | C语言                   | C语言，文档更丰富         |

**适用场景：**

- Nginx：高并发静态服务、反向代理、负载均衡
- Apache：动态内容处理、需要.htaccess的共享主机环境

## 3、解释Nginx的Master-Worker进程模型

```bash
# 查看进程
ps -ef | grep nginx
```

```bash
Master Process (1个)
    ├── Worker Process (多个，通常等于CPU核心数)
    ├── Cache Loader (缓存加载器，启动时运行一次)
    └── Cache Manager (缓存管理器，定期清理缓存)
```

**工作流程：**

1. **Master进程**：负责读取配置、管理Worker进程、处理信号（reload/stop等）
2. **Worker进程**：实际处理HTTP请求，采用单线程+事件循环（epoll）
3. **无共享锁设计**：Worker之间通过accept_mutex或EPOLLEXCLUSIVE避免惊群效应

## 4、什么是正向代理和反向代理？

答：正向代理就是一个人发送一个请求直接就到达了目标的服务器；反方代理就是请求统一被Nginx接收，nginx反向代理服务器接收到之后，按照一定的规 则分发给了后端的业务处理服务器进行处理了

## 5、 如何实现反向代理？

```bash
upstream backend {
    server 192.168.1.10:8080 weight=5;
    server 192.168.1.11:8080 weight=5;
    server 192.168.1.12:8080 backup;  # 备用服务器
    keepalive 32;  # 长连接数
}

server {
    listen 80;
    server_name api.example.com;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 超时设置
        proxy_connect_timeout 5s;
        proxy_send_timeout 10s;
        proxy_read_timeout 10s;
    }
}
```

**关键指令解析：**

- `proxy_pass`：指定后端服务器地址
- `proxy_set_header`：传递真实客户端信息（避免后端看到Nginx的IP）
- `proxy_connect_timeout`：与后端建立连接的超时时间

## 6、常用负载均衡算法有哪些？

> 常用的有：轮询、加权轮询、ip\_hash

```bash
upstream backend {
    # 1. 轮询（默认）
    server 192.168.1.10:8080;
    server 192.168.1.11:8080;
    
    # 2. 权重轮询
    server 192.168.1.10:8080 weight=3;
    server 192.168.1.11:8080 weight=1;
    
    # 3. IP哈希（会话保持）
    ip_hash;
    
    # 4. 最少连接
    least_conn;
    
    # 5. 一致性哈希（第三方模块）
    hash $request_uri consistent;
    
    # 6. fair（第三方，按响应时间分配）
    fair;
}
```



## 7、nginx中的location主要作用是什么？

答：location就是根据用户请求的URI来执行不同的应用，也就是根据用户请求的网站URL进行匹配，匹配成功即进行相关的操作。

## 8、什么是动静分离？

答：**动静分离**是指将网站的**动态内容**和**静态内容**分开处理、部署和优化的架构策略。

| 类型         | 定义                               | 示例                                           |
| ------------ | ---------------------------------- | ---------------------------------------------- |
| **静态内容** | 不随请求变化，可直接返回的文件     | HTML、CSS、JS、图片、视频、字体                |
| **动态内容** | 需要实时计算、查询数据库生成的内容 | PHP、Java、Python、Node.js 生成的页面、API接口 |

## 9、为什么要做动静分离？

**传统架构的问题（不分离）**

```bash
用户请求 ──► Nginx ──► Tomcat/PHP ──► 返回完整页面
                    │
                    └──  Tomcat既要处理业务逻辑，又要输出CSS/图片
```

**痛点：**

- 应用服务器压力大：每个静态资源请求都经过后端语言处理
- 性能浪费：Tomcat/PHP进程本应用于业务计算，却被图片请求占用
- 并发能力低：动态语言处理静态文件效率远低于专业Web服务器
- 缓存困难：无法针对静态资源做CDN和浏览器缓存优化

## 10、如何实现动静分离？

* **方案1：目录分离（最简单）**

```bash
服务器目录结构：
/usr/share/nginx/
├── static/          # 静态文件（Nginx直接返回）
│   ├── css/
│   ├── js/
│   ├── images/
│   └── upload/
└── html/            # 动态应用（反向代理到后端）
```



```bash
server {
    listen 80;
    server_name www.example.com;
    root /usr/share/nginx/html;
    
    # 1. 静态资源：Nginx直接处理（高性能）
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
        root /usr/share/nginx/static;
        expires 30d;                    # 浏览器缓存30天
        add_header Cache-Control "public, immutable";
        access_log off;                 # 关闭日志，减少IO
    }
    
    # 2. 上传的文件（可能较大，单独优化）
    location /upload/ {
        alias /usr/share/nginx/static/upload/;
        expires 90d;
        # 限制大文件传输
        client_max_body_size 50m;
    }
    
    # 3. 动态请求：反向代理到后端
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # 4. API接口（特殊处理，不缓存）
    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_no_cache 1;               # 禁用缓存
        proxy_cache_bypass 1;
    }
}
```



* **方案2：域名分离（推荐，利于CDN）**

```bash
静态域名：static.example.com  ──►  Nginx/CDN（就近访问，强缓存）
动态域名：www.example.com     ──►  Nginx ──► 应用服务器（业务逻辑）
```

```bash
# 静态资源服务器（static.example.com）
server {
    listen 80;
    server_name static.example.com;
    root /data/static;
    
    # 跨域允许（供主站调用）
    add_header Access-Control-Allow-Origin *.example.com;
    
    # 强缓存策略
    location ~* \.(css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        # 文件名包含hash（如app.abc123.js），可永久缓存
    }
    
    location ~* \.(jpg|png|gif|webp)$ {
        expires 6M;
        add_header Vary "Accept-Encoding";
    }
    
    # 开启gzip压缩
    gzip on;
    gzip_types text/css application/javascript;
}

# 主站（www.example.com）
server {
    listen 80;
    server_name www.example.com;
    
    location / {
        proxy_pass http://backend_cluster;
    }
}
```



* **方案3：物理分离（大规模架构）**

```bash
用户请求
    │
    ├──► CDN（静态资源，全球分发）◄── 源站：Nginx-Static（对象存储OSS/S3）
    │
    └──► 负载均衡（动态请求）
              │
              ├──► Nginx-1 ──► 应用集群A（北京）
              └──► Nginx-2 ──► 应用集群B（上海）
```

```bash
# Nginx-Static（静态源站，可能对接OSS）
server {
    listen 80;
    server_name static.example.com;
    
    # 从阿里云OSS获取（回源）
    location / {
        proxy_pass http://bucket.oss-cn-beijing.aliyuncs.com;
        proxy_set_header Host bucket.oss-cn-beijing.aliyuncs.com;
        
        # 本地缓存（减少OSS回源）
        proxy_cache_path /data/cache levels=1:2 keys_zone=static:100m;
        proxy_cache static;
        proxy_cache_valid 200 302 24h;
    }
}
```





## 11、Nginx负载均衡是基于那个模块来实现的？

答：`upstream`

## 12、Nginx 的日志在那个模块下配置？

答：在 http 或 server 块中配置日志

## 13、Nginx 的 location 块有哪些匹配规则？  
答：

*   精确匹配：location = /path。
*   前缀匹配：location /path。
*   正则匹配：location ~ .php$。
*   优先顺序：精确匹配 > 前缀匹配（最长匹配） > 正则匹配。

## 14、location匹配优先级规则？

```bash
location [ = | ~ | ~* | ^~ | @ ] /uri/ { ... }
```

**匹配优先级（从高到低）：**

| 修饰符 | 名称             | 含义                                             |
| ------ | ---------------- | ------------------------------------------------ |
| `=`    | **精确匹配**     | URI 必须完全等于指定字符串                       |
| `^~`   | **前缀匹配**     | URI 以指定字符串开头，匹配成功后**停止正则匹配** |
| `~`    | **正则匹配**     | 区分大小写的正则匹配                             |
| `~*`   | **正则匹配**     | 不区分大小写的正则匹配                           |
| 无     | **普通匹配**     | 前缀匹配，但会继续检查正则                       |
| `@`    | **命名location** | 用于内部重定向，不直接响应客户端请求             |

**示例验证：**

```bash
location = /exact {           # 精确匹配 /exact
    return 200 "exact match";
}

location ^~ /static/ {        # 前缀匹配，命中后跳过正则
    root /var/www/static;
}

location ~ \.(gif|jpg|png)$ { # 正则匹配图片
    root /var/www/images;
}

location / {                  # 默认匹配
    proxy_pass http://backend;
}
```





## 15、优化 Nginx 的性能可以从哪里入手  

Nginx 性能优化主要围绕三点：**系统层**调大连接数和 TCP 参数，**配置层**开启 sendfile/keepalive/gzip 减少 IO 和传输，**架构层**加 CDN 和本地缓存分担压力。

具体操作可参考：[Nginx性能优化](../../document/Nginx/Nginx性能优化.html)

## 16、什么是 Nginx 的 rewrite 规则？  
使用 rewrite 指令实现 URL 重写；  
标志位

*   break：停止处理当前 rewrite；
*   redirect：302 临时重定向；
*   permanent：301 永久重定向；



## 17、如何配置HTTPS/SSL？

```bash
server {
    listen 443 ssl http2;
    server_name www.example.com;
    
    # 证书配置
    ssl_certificate /etc/nginx/ssl/www.example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/www.example.com.key;
    
    # 优化配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers on;
    
    # 会话缓存
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # HSTS（强制HTTPS）
    add_header Strict-Transport-Security "max-age=31536000" always;
    
    root /var/www/html;
    index index.html;
}

# HTTP重定向到HTTPS
server {
    listen 80;
    server_name www.example.com;
    return 301 https://$server_name$request_uri;
}
```



## 18、如何优化Nginx性能？

**1. 系统层面**

```bash
# /etc/sysctl.conf
# 增大文件描述符限制
fs.file-max = 65535

# TCP连接优化
net.ipv4.tcp_tw_reuse = 1        # 复用TIME_WAIT连接
net.ipv4.tcp_tw_recycle = 0      # 禁用（内核4.12+已移除）
net.ipv4.tcp_fin_timeout = 30
net.core.somaxconn = 65535       # 全连接队列长度
```

**2. Nginx配置层面**

```bash
worker_processes auto;           # 通常设为CPU核心数
worker_rlimit_nofile 65535;      # 单个worker的最大文件描述符

events {
    use epoll;                   # Linux高性能网络模型
    worker_connections 65535;    # 单个worker的最大连接数
    multi_accept on;             # 尽可能接受更多连接
}

http {
    # 文件传输优化
    sendfile on;                 # 零拷贝传输
    tcp_nopush on;               # 防止网络拥塞
    tcp_nodelay on;              # 实时发送小数据包
    
    # 压缩
    gzip on;
    gzip_types text/plain text/css application/json;
    gzip_min_length 1k;
    
    # 静态资源缓存
    open_file_cache max=1000 inactive=20s;
    open_file_cache_valid 30s;
    open_file_cache_min_uses 2;
}
```

## 19、什么是惊群效应？Nginx如何解决？

**惊群效应（Thundering Herd）：** 多个进程/线程同时阻塞等待同一事件，当事件发生时，所有等待者被唤醒，但只有一个能处理，其余重新阻塞，造成资源浪费。

**Nginx解决方案：**

- **旧版本**：使用`accept_mutex`互斥锁，只有获得锁的worker才能accept新连接
- **新版本（Linux 3.9+）**：使用`EPOLLEXCLUSIVE`标志，内核只唤醒一个等待的进程

```bash
events {
    accept_mutex on;  # 默认开启（多核且高并发时建议开启）
    accept_mutex_delay 500ms;
}
```

## 20、如何实现限流（Rate Limiting）？

```bash
# 定义限流区域
limit_req_zone $binary_remote_addr zone=req_limit:10m rate=10r/s;
limit_conn_zone $binary_remote_addr zone=conn_limit:10m;

server {
    location /api/ {
        # 漏桶算法限流：突发20个请求，延迟处理
        limit_req zone=req_limit burst=20 nodelay;
        
        # 连接数限制：单IP最多2个连接
        limit_conn conn_limit 2;
        
        proxy_pass http://backend;
    }
    
    # 白名单（不限流）
    location /health {
        limit_req off;
        return 200 "OK";
    }
}
```

**算法说明：**

- **漏桶算法（Leaky Bucket）**：请求以固定速率处理，平滑突发流量
- **令牌桶（第三方模块）**：允许一定突发，更灵活

## 21、如何实现灰度发布（A/B测试）？

```bash
# 方式1：基于Cookie
split_clients "${http_cookie}_GRAY" $variant {
    10%     "gray";      # 10%流量到新版本
    *       "stable";    # 90%流量到稳定版
}

# 方式2：基于IP哈希
map $remote_addr $variant {
    ~^192\.168\.1\.    "gray";    # 内网IP走灰度
    default            "stable";
}

upstream stable {
    server 192.168.1.10:8080;
}

upstream gray {
    server 192.168.1.20:8080;
}

server {
    location / {
        proxy_pass http://$variant;
    }
}
```

## 22、如何配置跨域（CORS）？

```bash
server {
    location /api/ {
        # 预检请求处理
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
        
        # 实际请求
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;
        
        proxy_pass http://backend;
    }
}
```

## 23、常见的502/504错误原因及排查？

| 错误码                  | 含义                     | 常见原因                                                    | 排查方法                                         |
| ----------------------- | ------------------------ | ----------------------------------------------------------- | ------------------------------------------------ |
| **502 Bad Gateway**     | 网关错误，后端无有效响应 | 1. 后端进程崩溃<br>2. 防火墙拦截<br>3. 后端过载拒绝连接     | `netstat -anp \| grep :8080`<br>查看后端进程状态 |
| **504 Gateway Timeout** | 网关超时                 | 1. 后端处理太慢<br>2. 网络延迟<br>3. proxy\_timeout设置过短 | 检查后端日志<br>增大`proxy_read_timeout`         |

**排查命令：**

```bash
# 查看Nginx错误日志
tail -f /var/log/nginx/error.log

# 检查后端连接
curl -v http://backend:8080/health
telnet backend 8080

# 检查Nginx与后端连接状态
ss -ant | grep 8080
```

## 24、如何实现热升级（零停机升级）？

```bash
# 1. 编译新版本Nginx，替换二进制文件
cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.old
cp /path/to/new/nginx /usr/local/nginx/sbin/nginx

# 2. 向Master发送USR2信号，启动新Master
kill -USR2 `cat /usr/local/nginx/logs/nginx.pid`

# 3. 此时存在新旧两个Master及其Worker
ps -ef | grep nginx
# 会看到nginx.pid和nginx.pid.oldbin

# 4. 向旧Master发送WINCH，优雅关闭旧Worker
kill -WINCH `cat /usr/local/nginx/logs/nginx.pid.oldbin`

# 5. 验证新版本正常后，关闭旧Master
kill -QUIT `cat /usr/local/nginx/logs/nginx.pid.oldbin`

# 回滚（如果新版本有问题）
kill -HUP `cat /usr/local/nginx/logs/nginx.pid.oldbin`  # 重启旧Worker
kill -QUIT `cat /usr/local/nginx/logs/nginx.pid`        # 关闭新Master
```

## 25、Nginx与LVS、HAProxy的区别？

| 特性         | LVS                 | Nginx                  | HAProxy         |
| ------------ | ------------------- | ---------------------- | --------------- |
| **工作层级** | 四层（传输层）      | 四/七层                | 四/七层         |
| **性能**     | 最高（内核态）      | 高（用户态）           | 高（用户态）    |
| **功能**     | 纯负载均衡          | 负载均衡+Web服务器     | 专业负载均衡    |
| **健康检查** | 简单                | 较完善                 | 非常完善        |
| **会话保持** | 持久连接（ipvsadm） | ip\_hash/sticky        | cookie/源地址   |
| **SSL终止**  | 不支持              | 支持                   | 支持            |
| **典型场景** | 超大规模流量入口    | 七层流量分发、静态服务 | 数据库、TCP代理 |

## 26、如果静态资源更新了，怎么让用户获取最新版本？

**答：**

1. **文件名hash化**（推荐）：`app.v2.js` → `app.v3.js`，HTML引用新文件名
2. **Query String**：`style.css?v=20240220`（不推荐，部分CDN不缓存带参数URL）
3. **CDN刷新**：手动刷新CDN缓存（仅用于紧急更新）

## 27、动态内容里包含的静态资源路径怎么处理？

**答：**

- 使用**模板引擎**自动替换：`<img src="{{ static('images/logo.png') }}">`
- 构建时注入环境变量，区分开发和生产环境的静态域名

## 28、用户上传的图片属于动态还是静态？

**答：**

- **上传过程**是动态的（走应用服务器处理权限、格式验证）
- **访问已上传的图片**是静态的（应转移到Nginx/对象存储直接访问）

```bash
# 上传（动态）
location /upload/api {
    proxy_pass http://backend;  # 后端处理上传
}

# 访问已上传文件（静态）
location /upload/files {
    alias /data/user-uploads/;
    expires 30d;
}
```



