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

**答：** Nginx是一个 轻量级/高性能的反向代理Web服务器，用于 HTTP、HTTPS、SMTP、POP3 和 IMAP 协议。他实现非常高效的反向代理、负载平衡，他可以处理2-3万并发连接数，官方监测能支持5万并发，现在中国使用nginx网站用户有很多，例如：新浪、网易、 腾讯等。

**核心特点：**

* 跨平台、配置简单。
* 非阻塞、高并发连接：处理 2-3 万并发连接数，官方监测能支持 5 万并发。
* 内存消耗小：开启 10 个 Nginx 才占 150M 内存。
* 成本低廉，且开源。
* 稳定性高，宕机的概率非常小。
* 内置的健康检查功能：如果有一个服务器宕机，会做一个健康检查，再发送的请求就不会发送到宕机的服务器了。重新将请求提交到其他的节点上

## 2、Nginx应用场景？

- **http服务器**：Nginx是一个http服务可以独立提供http服务。可以做网页静态服务器。
- **虚拟主机**：可以实现在一台服务器虚拟出多个网站，例如个人网站使用的虚拟机。
- **反向代理、负载均衡**：当网站的访问量达到一定程度后，单台服务器不能满足用户的请求时，需要用多台服务器集群可以使用nginx做反向代理。并且多台服务器可以平均分担负载，不会应为某台服务器负载高宕机而某台服务器闲置的情况。
- nginx 中也可以配置安全管理、比如可以使用Nginx搭建API接口网关,对每个接口服务进行拦截。

## 3、Nginx是怎么处理请求的？

```bash
server {         # 第一个Server区块开始，表示一个独立的虚拟主机站点
   listen       80； # 提供服务的端口，默认80
   server_name  localhost; # 提供服务的域名主机名
   location / { # 第一个location区块开始
     root   html; # 站点的根目录，相当于Nginx的安装目录
     index  index.html index.html;  # 默认的首页文件，多个用空格分开
} # 第一个location区块结果
```

- 首先，Nginx 在启动时，会解析配置文件，得到需要监听的端口与 IP 地址，然后在 Nginx 的 Master 进程里面先初始化好这个监控的Socket(创建 S ocket，设置 addr、reuse 等选项，绑定到指定的 ip 地址端口，再 listen 监听)。
- 然后，再 fork(一个现有进程可以调用 fork 函数创建一个新进程。由 fork 创建的新进程被称为子进程 )出多个子进程出来。
- 之后，子进程会竞争 accept 新的连接。此时，客户端就可以向 nginx 发起连接了。当客户端与nginx进行三次握手，与 nginx 建立好一个连接后。此时，某一个子进程会 accept 成功，得到这个建立好的连接的 Socket ，然后创建 nginx 对连接的封装，即 ngx_connection_t 结构体。
- 接着，设置读写事件处理函数，并添加读写事件来与客户端进行数据的交换。
- 最后，Nginx 或客户端来主动关掉连接，到此，一个连接就寿终正寝了。

## 4、Nginx 是如何实现高并发的？

如果一个 server 采用一个进程(或者线程)负责一个request的方式，那么进程数就是并发数。那么显而易见的，就是会有很多进程在等待中。等什么？最多的应该是等待网络传输。

而 Nginx 的异步非阻塞工作方式正是利用了这点等待的时间。在需要等待的时候，这些进程就空闲出来待命了。因此表现为少数几个进程就解决了大量的并发问题。

Nginx是如何利用的呢，简单来说：同样的 4 个进程，如果采用一个进程负责一个 request 的方式，那么，同时进来 4 个 request 之后，每个进程就负责其中一个，直至会话关闭。期间，如果有第 5 个request进来了。就无法及时反应了，因为 4 个进程都没干完活呢，因此，一般有个调度进程，每当新进来了一个 request ，就新开个进程来处理。

**回想下，BIO 是不是存在酱紫的问题？**

Nginx 不这样，每进来一个 request ，会有一个 worker 进程去处理。但不是全程的处理，处理到什么程度呢？处理到可能发生阻塞的地方，比如向上游（后端）服务器转发 request ，并等待请求返回。那么，这个处理的 worker 不会这么傻等着，他会在发送完请求后，注册一个事件：“如果 upstream 返回了，告诉我一声，我再接着干”。于是他就休息去了。此时，如果再有 request 进来，他就可以很快再按这种方式处理。而一旦上游服务器返回了，就会触发这个事件，worker 才会来接手，这个 request 才会接着往下走。

这就是为什么说，Nginx 基于事件模型。

由于 web server 的工作性质决定了每个 request 的大部份生命都是在网络传输中，实际上花费在 server 机器上的时间片不多。这是几个进程就解决高并发的秘密所在。即：

webserver 刚好属于网络 IO 密集型应用，不算是计算密集型。

异步，非阻塞，使用 epoll ，和大量细节处的优化。也正是 Nginx 之所以然的技术基石。

## 5、什么是正向代理？

一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。

客户端才能使用正向代理。

> 正向代理总结就一句话：代理端 代理的是**客户端**。
>
> **核心特征**：
>
> - 客户端**主动配置**代理，明确指定要访问的目标服务器
> - 隐藏客户端身份，服务端只看到代理IP
> - 典型场景：翻墙、公司内网代理、爬虫IP池

## 6、什么是反向代理？

反向代理（Reverse Proxy）方式，是指以代理服务器来接受 Internet上的连接请求，然后将请求，发给内部网络上的服务器并将从服务器上得到的结果返回给 Internet 上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。

> 反向代理总结就一句话：代理端 代理的是**服务端**。
>
> **核心特征**：
>
> - 部署在服务端，客户端**无感知**（以为代理就是目标）
> - 隐藏真实服务器，统一入口、负载均衡、安全防护
> - 典型场景：Nginx upstream、CDN、API网关

## 7、反向代理服务器的优点是什么?

| 优点         | 说明                                                 |
| :----------- | :--------------------------------------------------- |
| **隐藏源站** | 客户端只接触代理IP，真实服务器IP不暴露，防止直接攻击 |
| **负载均衡** | 通过upstream分发请求到多台后端，提升并发能力         |
| **安全防护** | 统一拦截恶意请求、DDoS防护、WAF（Web应用防火墙）     |
| **SSL终结**  | HTTPS证书配置在代理层，减轻后端计算压力              |
| **缓存加速** | 静态资源缓存，减少回源请求，提升响应速度             |
| **灰度发布** | 基于流量比例逐步切换新版本，降低风险                 |

## 8、如何实现反向代理？

> 使用upstream做负载均衡，再location里进行反向代理；

```nginx
upstream backend {
    server 192.168.1.10:8080 weight=5;
    server 192.168.1.11:8080 weight=5;
    server 192.168.1.12:8080 backup;      # 备用机，主节点挂掉才启用
    keepalive 32;                          # 长连接池，减少TCP握手开销
}

server {
    listen 80;
    server_name api.example.com;
    
    location / {
        # 转发到upstream组
        proxy_pass http://backend$request_uri;
        
        # WebSocket支持（你的场景如果需要）
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade; 
        proxy_set_header Connection "upgrade"; 
        
        # 透传客户端真实信息（关键！）
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 超时防护
        proxy_connect_timeout 5s;            # TCP连接超时
        proxy_send_timeout 10s;              # 发送数据超时
        proxy_read_timeout 10s;              # 接收响应超时
    }
}
```

**关键指令解析：**

- `proxy_pass`：指定后端服务器地址，也是upstream的地址；
- `proxy_set_header`：传递真实客户端信息（避免后端看到Nginx的IP）
- `proxy_connect_timeout`：与后端建立连接的超时时间



## 9、Nginx负载均衡是基于那个模块来实现的？

答：`upstream`

## 10、常用负载均衡算法有哪些？

> 常用的有：轮询、加权轮询、ip\_hash、最少链接、一致性哈希；

```bash
upstream backend {
    # 1. 轮询（默认）
    server 192.168.1.10:8080;
    server 192.168.1.11:8080;
    
    # 2. 加权轮询
    server 192.168.1.10:8080 weight=3;
    server 192.168.1.11:8080 weight=1;
    
    # 3. IP哈希（会话保持）
    ip_hash;
    
    # 4. 最少连接
    least_conn;
    
    # 5. 一致性哈希（第三方模块）
    hash $request_uri consistent;
}
```



## 11、nginx中的location主要作用是什么？

答：匹配请求的URI，决定请求如何处理（转发、拒绝、重写等）。

## 12、Nginx 的 location 块有哪些匹配规则？  

答：

| 优先级 | 匹配符 | 说明             | 含义                                             | 示例                        |
| :----- | :----- | :--------------- | ------------------------------------------------ | :-------------------------- |
| 1      | `=`    | **精确匹配**     | URI 必须完全等于指定字符串                       | `location = /api`           |
| 2      | `^~`   | **前缀匹配**     | URI 以指定字符串开头，匹配成功后**停止正则匹配** | `location ^~ /static/`      |
| 3      | `~`    | **正则匹配**     | 区分大小写的正则匹配                             | `location ~ \.php$`         |
| 4      | `~*`   | **正则匹配**     | 不区分大小写的正则匹配                           | `location ~* \.(jpg\|png)$` |
| 5      | 无符号 | **普通前缀匹配** | 前缀匹配，但会继续检查正则                       | `location /api/`            |

>  优先顺序：精确匹配 > 前缀匹配（最长匹配） > 正则匹配。



**示例验证：**

```nginx
server {
    listen 80;
    server_name example.com;
    
    # 1. 精确匹配首页（加速）
    location = / {
        root /var/www/html;
        index index.html;
    }
    
    # 2. 静态资源（前缀匹配，优先于正则）
    location ^~ /static/ {
        root /var/www/static;
        expires 30d;              # 缓存30天
    }
    
    # 3. API接口（正则匹配）
    location ~ ^/api/v\d+/ {
        proxy_pass http://backend;
    }
    
    # 4. 图片防盗链（正则+条件）
    location ~* \.(gif|jpg|png)$ {
        valid_referers none blocked server_names;
        if ($invalid_referer) {
            return 403;
        }
    }
    
    # 5. 通用兜底（转发到后端）
    location / {
        proxy_pass http://frontend;
    }
}
```



## 13、解释Nginx的Master-Worker进程模型

> Nginx采用**多进程单线程**架构：**1个Master进程**管理调度，**多个Worker进程**处理请求，Worker内部使用**epoll异步非阻塞IO**。

| 进程              | 数量                     | 职责                                   | 是否处理请求 |
| :---------------- | :----------------------- | :------------------------------------- | :----------: |
| **Master**        | 1个                      | 配置加载、Worker管理、信号处理、热升级 |     ❌ 否     |
| **Worker**        | 配置决定（通常=CPU核数） | 处理HTTP请求、执行代理、读写文件       |     ✅ 是     |
| **Cache Loader**  | 1个（启动时运行）        | 加载磁盘缓存到内存                     |     ❌ 否     |
| **Cache Manager** | 1个                      | 管理缓存过期、大小限制                 |     ❌ 否     |

## 14、cookie和session区别？

**共同：**

存放用户信息。存放的形式：`key-value`格式 变量和变量内容键值对。

**区别：**

| 维度         | **Cookie**              | **Session**                     |
| :----------- | :---------------------- | :------------------------------ |
| **存储位置** | **客户端**（浏览器）    | **服务端**（Redis/内存/数据库） |
| **存储内容** | 小文本（4KB左右）       | 任意对象（用户数据、权限等）    |
| **安全性**   | **低**（易被篡改/盗取） | **高**（数据不暴露）            |
| **生命周期** | 可设置过期时间/会话级   | 默认30分钟无活动过期            |
| **性能影响** | 每次请求携带，增加带宽  | 服务端存储，增加内存/IO         |
| **跨域支持** | 可配置Domain/Path       | 依赖Cookie传递SessionID         |



## 15、为什么 Nginx 不使用多线程？

> Nginx采用**多进程+单线程+异步非阻塞IO**，避免线程切换开销和锁竞争，实现**高并发、高稳定、热部署**。



**核心原因对比**

| 维度           | **Nginx（多进程单线程）**                        | **Apache（多线程/多进程）** |
| :------------- | :----------------------------------------------- | :-------------------------- |
| **上下文切换** | 进程切换开销大，但Worker少（=CPU核数），切换极少 | 线程切换频繁，消耗CPU       |
| **锁竞争**     | **无锁编程**，共享内存用原子操作                 | 多线程需加锁，阻塞等待      |
| **内存占用**   | Worker独立地址空间，内存隔离                     | 线程共享内存，一个崩溃全崩  |
| **编程复杂度** | 单线程逻辑简单，无并发Bug                        | 需处理死锁、竞态条件        |
| **热升级**     | **平滑重启**，新旧Worker共存                     | 复杂或需停机                |
| **CPU亲和性**  | Worker绑定核心，缓存命中率高                     | 线程调度由系统决定          |



## 16、Nginx与Apache的区别？

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

## 17、什么是动静分离？

答：**动静分离**是指将网站的**动态内容**和**静态内容**分开处理、部署和优化的架构策略。

| 类型         | 定义                               | 示例                                           |
| ------------ | ---------------------------------- | ---------------------------------------------- |
| **静态内容** | 不随请求变化，可直接返回的文件     | HTML、CSS、JS、图片、视频、字体                |
| **动态内容** | 需要实时计算、查询数据库生成的内容 | PHP、Java、Python、Node.js 生成的页面、API接口 |

## 18、为什么要做动静分离？

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

## 19、如何实现动静分离？

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

## 20、什么叫 CDN 服务？

> **CDN（内容分发网络）**——通过**遍布全球的边缘节点**，将网站内容**缓存到用户就近服务器**，实现**低延迟、高并发、减轻源站压力**。



## 21、优化 Nginx 的性能可以从哪里入手  

Nginx 性能优化主要围绕三点：**系统层**调大连接数和 TCP 参数，**配置层**开启 sendfile/keepalive/gzip 减少 IO 和传输，**架构层**加 CDN 和本地缓存分担压力。

具体操作可参考：[Nginx性能优化](../../document/Nginx/Nginx性能优化.html)

## 22、什么是 Nginx 的 rewrite 规则？  

* [x] rewrite是什么？

> 基于正则表达式**重写URL**，实现**页面跳转、伪静态、域名统一、SEO优化**等功能。 

* [x] 核心语法：

```bash
rewrite regex replacement [flag];
```

| 参数          | 说明               |
| :------------ | :----------------- |
| `regex`       | 正则匹配规则       |
| `replacement` | 替换后的URL        |
| `flag`        | 控制行为（关键！） |

* [x] 标志位：

| flag                | 含义                             | 场景                |
| :------------------ | :------------------------------- | :------------------ |
| **last**            | 默认，重写后**重新匹配location** | 内部跳转，不改变URL |
| **break**           | 重写后**停止匹配**，直接处理     | 内部跳转，防循环    |
| **redirect**        | **302临时重定向**（HTTP跳转）    | 临时变更URL         |
| **permanent**       | **301永久重定向**（HTTP跳转）    | SEO权重转移         |
| **rewrite\_log on** | 记录重写日志（调试用）           | 排查规则问题        |



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



