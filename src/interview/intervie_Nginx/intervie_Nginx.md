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

## 10、常用负载均衡算法有哪些？都是怎么实现的？

> 常用的负载均衡算法有：轮询、加权轮询、ip\_hash、最少链接、一致性哈希（第三方）、fair（第三方）、url_hash（第三方）；



**1. 轮询(默认)**

每个请求按时间顺序逐一分配到不同的后端服务器，如果后端某个服务器宕机，能自动剔除故障系统。

```nginx
upstream backserver { 
 server 192.168.0.12; 
 server 192.168.0.13; 
} 
```

**2. 加权轮询 weight**

weight的值越大，分配到的访问概率越高，主要用于后端每台服务器性能不均衡的情况下。其次是为在主从的情况下设置不同的权值，达到合理有效的地利用主机资源。

```nginx
# 权重越高，在被访问的概率越大，如上例，分别是20%，80%。
upstream backserver { 
 server 192.168.0.12 weight=2; 
 server 192.168.0.13 weight=8; 
} 
```

**3. ip_hash( IP绑定)**

每个请求按访问IP的哈希结果分配，使来自同一个IP的访客固定访问一台后端服务器，并且可以有效解决动态网页存在的session共享问题

```nginx
upstream backserver { 
 ip_hash; 
 server 192.168.0.12:88; 
 server 192.168.0.13:80; 
} 
```

**4. 最少连接**

```nginx
upstream backend {
    least_conn;  # 连接数最少的服务器优先
    server 192.168.1.10:8080;
    server 192.168.1.11:8080;
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



## 23、如何配置HTTPS/SSL？

```bash
# HTTP重定向到HTTPS
  server {
    listen 80;
    server_name test.top www.test.top;

    # HTTP 重定向到 HTTPS
    return 301 https://$server_name$request_uri;
    # 这里不需要配置local内容，会自动跳转到https，如果证书到期也会跳转，不依赖443；
  }
  
  server {
    listen 443 ssl http2;
    server_name test.top www.test.top;

    # SSL 配置
    ssl_certificate /usr/local/nginx/conf/ssl/test.top.pem;
    ssl_certificate_key /usr/local/nginx/conf/ssl/test.top.key;

    # 会话缓存
    ssl_session_cache    shared:SSL:10m;
    ssl_session_timeout  5m;

    # 协议与加密套件
    # 解决的目标主机支持RSA密钥交换、目标使用过期的TLS1.0 版协议两个漏洞
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers  on;
    ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305';

    # 安全响应头
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
        
    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 114.114.114.114 valid=300s;
    resolver_timeout 5s;

    # 设置错误页面
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;

    location = /404.html {
      root /usr/local/nginx/html;
      internal;
    }
    # 如果是自定义404需要找图片，需要加上这个；
    location /404/ {
      root /usr/local/nginx/html; 
    }

    location = /50x.html {
      root /usr/local/nginx/html;
      internal;
    }

    location / {
        # 写上项目地址
        root   html/blog_dist;
        index  index.html index.htm;
        expires 30d; # 缓存 30 天
        add_header Cache-Control "public, immutable";  # 明确缓存语义
       
        # 关键：HTML不缓存（防更新后用户看到旧版）
        location ~* \.html$ {
           expires -1;
           add_header Cache-Control "no-cache";
        }
    }
  }
}
```



## 24、如何优化Nginx性能？

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

## 25、什么是惊群效应？为什么产生惊群效应？Nginx如何解决？

* [x] 什么是惊群效应？

**惊群效应（Thundering Herd）：** 多个进程/线程同时阻塞等待同一事件，当事件发生时，所有等待者被唤醒，但只有一个能处理，其余重新阻塞，造成资源浪费。

* [x] 为什么产生惊群效应？

| 层级             | 说明                                             |
| :--------------- | :----------------------------------------------- |
| **内核早期设计** | `accept()`/`epoll_wait()` 触发时唤醒所有等待进程 |
| **多进程架构**   | Nginx多个Worker同时监听同一端口                  |
| **结果**         | 只有一个Worker成功，其他返回`EAGAIN`，重新休眠   |

* [x] Nginx如何解决？

使用`SO_REUSEPORT`

```nginx
events {
    use epoll;
}

http {
    server {
        listen 80 reuseport;  # ← 关键：每个Worker独立监听端口
        listen 443 ssl http2 reuseport;
    }
}
```

## 26、如何实现限流（Rate Limiting）？

> 可以使用`漏桶`或`令牌桶`来实现；
>
> 限流一般有3种
>
> - 正常限制访问频率（正常流量）
> - 突发限制访问频率（突发流量）
> - 限制并发连接数

* 限流算法对比

| 算法                       | 模块                         | 原理                           | 特点               |
| :------------------------- | :--------------------------- | :----------------------------- | :----------------- |
| **漏桶（Leaky Bucket）**   | `ngx_http_limit_req_module`  | 固定速率处理请求，**平滑突发** | 严格限速，队列等待 |
| **令牌桶（Token Bucket）** | `ngx_http_limit_conn_module` | 固定速率产生令牌，**允许突发** | 弹性限速，瞬时峰值 |

* 漏桶限流（限制请求速率）

```nginx
http {
    # 定义限流区域：10MB内存，速率10r/s（每秒10请求）
    limit_req_zone $binary_remote_addr zone=req_zone:10m rate=10r/s;
    
    server {
        location /api/ {
            # burst=20：允许突发20个请求，前10个立即处理，后10个排队等待
            # nodelay：突发请求立即处理，不延迟（总速率仍受控）
            limit_req zone=req_zone burst=20 nodelay;	
            # limit_req zone=req_zone;           # 严格10r/s，超出的延迟处理
            # limit_req zone=req_zone nodelay;  # 超出的直接拒绝（503）
            proxy_pass http://backend;
        }
    }
}
```

* 令牌桶限流（限制并发连接数）

```nginx
http {
    # 限制单IP并发连接数
    limit_conn_zone $binary_remote_addr zone=conn_zone:10m;
    
    # 或限制虚拟主机总并发
    limit_conn_zone $server_name zone=per_server:10m;
    
    server {
        location /download/ {
            limit_conn conn_zone 5;        # 单IP最多5个并发连接
            limit_conn per_server 1000;    # 本server总并发1000
            limit_rate 500k;               # 单连接限速500KB/s
            
            proxy_pass http://backend;
        }
    }
}
```



## 27、如何实现灰度发布（A/B测试）？

> **五种常用策略**：
>
> * 基于IP地址/IP哈希
> * 基于Cookie
> * 基于Header
> * 基于权重
> * 基于Lua/OpenResty



这里举例一个最简单的就是：**基于权重**，也就是加权轮询方式；

```nginx
upstream backend {
    server 192.168.1.10:8080 weight=95;  # 旧版 95%
    server 192.168.1.20:8080 weight=5;   # 新版 5%
    
    # 健康检查（第三方模块）
    check interval=3000 rise=2 fall=3 timeout=1000 type=http;
}

server {
    location / {
        proxy_pass http://backend;
    }
}
```

## 28、如何配置跨域（CORS）？

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

## 29、常见的502/504错误原因及排查？

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

## 30、如何实现热升级（零停机升级）？

```bash
# 1. 备份旧版本
cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.old

# 2. 编译新版本Nginx
cd /usr/src/nginx-1.25.0
./configure --prefix=/usr/local/nginx --with-http_ssl_module ...（原参数）
make
# 3. 不要make install！直接复制二进制进行替换
cp objs/nginx /usr/local/nginx/sbin/nginx

# 4. 验证新版本
/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf

# 5. 向Master发送USR2信号，启动新Master
kill -USR2 `cat /usr/local/nginx/logs/nginx.pid`

# 6. 此时存在新旧两个Master及其Worker
ps -ef | grep nginx
# 会看到nginx.pid和nginx.pid.oldbin

# 7. 向旧Master发送WINCH，优雅关闭旧Worker
kill -WINCH `cat /usr/local/nginx/logs/nginx.pid.oldbin`

# 8. 验证新版本正常后，关闭旧Master
kill -QUIT `cat /usr/local/nginx/logs/nginx.pid.oldbin`

# 回滚（如果新版本有问题）
kill -HUP `cat /usr/local/nginx/logs/nginx.pid.oldbin`  # 重启旧Worker
kill -QUIT `cat /usr/local/nginx/logs/nginx.pid`        # 关闭新Master
```

## 31、Nginx与LVS、HAProxy的区别？

| 特性         | LVS                 | Nginx                  | HAProxy         |
| ------------ | ------------------- | ---------------------- | --------------- |
| **工作层级** | 四层（传输层）      | 四/七层                | 四/七层         |
| **性能**     | 最高（内核态）      | 高（用户态）           | 高（用户态）    |
| **功能**     | 纯负载均衡          | 负载均衡+Web服务器     | 专业负载均衡    |
| **健康检查** | 简单                | 较完善                 | 非常完善        |
| **会话保持** | 持久连接（ipvsadm） | ip\_hash/sticky        | cookie/源地址   |
| **SSL终止**  | 不支持              | 支持                   | 支持            |
| **典型场景** | 超大规模流量入口    | 七层流量分发、静态服务 | 数据库、TCP代理 |

## 32、如果静态资源更新了，怎么让用户获取最新版本？

**答：**

1. **文件名hash化**（推荐）：`app.v2.js` → `app.v3.js`，HTML引用新文件名
2. **Query String**：`style.css?v=20240220`（不推荐，部分CDN不缓存带参数URL）
3. **CDN刷新**：手动刷新CDN缓存（仅用于紧急更新）

## 33、动态内容里包含的静态资源路径怎么处理？

**答：**

- 使用**模板引擎**自动替换：`<img src="{{ static('images/logo.png') }}">`
- 构建时注入环境变量，区分开发和生产环境的静态域名

## 34、用户上传的图片属于动态还是静态？

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

## 35、怎么限制浏览器访问？

```nginx
server {
    location / {
        # 禁止IE浏览器访问
        if ($http_user_agent ~* "MSIE|Trident") {
            return 403 "IE浏览器不支持，请使用Chrome/Firefox/Edge";
        }
        
        # 禁止移动端访问（PC站专用）
        if ($http_user_agent ~* "Mobile|Android|iPhone|iPad") {
            return 403 "请使用PC端访问";
        }
        
        proxy_pass http://backend;
    }
}
```

**<font size=4>常见浏览器User-Agent标识</font>**

* 桌面端浏览器

| 浏览器                | 典型User-Agent关键词 | 完整示例（简化）                                             |
| :-------------------- | :------------------- | :----------------------------------------------------------- |
| **Google Chrome**     | `Chrome` `Chromium`  | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36` |
| **Mozilla Firefox**   | `Firefox` `Gecko`    | `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0` |
| **Microsoft Edge**    | `Edg`（注意无e）     | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0` |
| **Apple Safari**      | `Safari` `Version`   | `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15` |
| **Internet Explorer** | `MSIE` `Trident`     | `Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko` |
| **Opera**             | `Opera` `OPR` `OPX`  | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0` |
| **Brave**             | `Brave` `Chrome`     | `Mozilla/5.0... Chrome/120... Safari/537.36`（需检查`navigator.brave`） |
| **Vivaldi**           | `Vivaldi`            | `Mozilla/5.0... Chrome/120... Safari/537.36 Vivaldi/6.5`     |

* 移动端浏览器

| 浏览器               | 典型标识                    | 完整示例（简化）                                             |
| :------------------- | :-------------------------- | :----------------------------------------------------------- |
| **Safari (iOS)**     | `Mobile` `Safari` `Version` | `Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1` |
| **Chrome (Android)** | `Android` `Chrome` `Mobile` | `Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36` |
| **Samsung Internet** | `SamsungBrowser`            | `Mozilla/5.0 (Linux; Android 14; SAMSUNG SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36` |
| **Firefox (Mobile)** | `Firefox` `Mobile` `Fennec` | `Mozilla/5.0 (Android 14; Mobile; rv:121.0) Gecko/121.0 Firefox/121.0` |
| **Opera Mobile**     | `Opera Mobile` `OPR`        | `Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 OPR/73.0.0.0` |

* 国内主流浏览器

| 浏览器             | 典型标识                      | 特点                                     |
| :----------------- | :---------------------------- | :--------------------------------------- |
| **微信内置浏览器** | `MicroMessenger` `WeChat`     | 必含`MicroMessenger`，区分PC版/移动版    |
| **QQ浏览器**       | `QQBrowser` `MQQBrowser`      | PC:`QQBrowser`；移动:`MQQBrowser`        |
| **UC浏览器**       | `UCBrowser` `UCWEB`           | 阿里系，移动:`UCBrowser`，老版本:`UCWEB` |
| **360安全浏览器**  | `360SE` `360EE` `Qihoo`       | `360SE`=安全版，`360EE`=极速版           |
| **360极速浏览器**  | `360EE` `Chrome`              | 双核，Chrome内核                         |
| **搜狗浏览器**     | `SogouExplorer` `SE` `MetaSr` | `MetaSr`是搜狗搜索特征                   |
| **百度浏览器**     | `BaiduBrowser` `baidubrowser` | 已停止更新，但仍存在                     |
| **猎豹浏览器**     | `LieBaoFast` `LBBROWSER`      | 金山系                                   |
| **傲游浏览器**     | `Maxthon` `MxBrowser`         | 国产老牌                                 |
| **世界之窗**       | `TheWorld`                    | 已被360收购                              |
| **2345浏览器**     | `2345Explorer` `2345chrome`   | 推广软件捆绑常见                         |
| **夸克浏览器**     | `Quark`                       | 阿里系，简洁定位                         |
| **小米浏览器**     | `MiuiBrowser` `XiaoMi`        | MIUI内置                                 |
| **华为浏览器**     | `HuaweiBrowser` `Huawei`      | 鸿蒙/EMUI内置                            |
| **OPPO浏览器**     | `HeyTapBrowser` `OPPO`        | ColorOS内置                              |
| **vivo浏览器**     | `VivoBrowser`                 | OriginOS内置                             |
| **联想浏览器**     | `Lenovo` `SLBrowser`          | 联想电脑预装                             |

## 36、怎么限制地区访问？

> 前提：需要**安装GeoIP模块和数据库**；

```nginx
http {
    geoip_country /usr/share/GeoIP/GeoIP.dat;
    
    map $geoip_country_code $allowed_country {
        default 0;
        CN 1;      # 仅允许中国
        US 1;      # 允许美国
        JP 1;      # 允许日本
    }
    
    server {
        location / {
            if ($allowed_country = 0) {
                return 403 "该地区禁止访问";
            }
            proxy_pass http://backend;
        }
    }
}
```

更多国家`ISO代码`可自行百度；

## 37、Nginx都有哪些限制方法

* 一、连接层限制

| 限制类型         | 说明                         |
| :--------------- | :--------------------------- |
| **连接数限制**   | 单IP并发连接数、总并发连接数 |
| **连接速率限制** | 每秒新建连接数               |
| **带宽限制**     | 单连接下载速度、总出口带宽   |

* 二、请求层限制

| 限制类型           | 说明                     |
| :----------------- | :----------------------- |
| **请求速率限制**   | 单IP每秒/每分钟请求数    |
| **请求并发限制**   | 单IP同时处理请求数       |
| **请求体大小限制** | 上传文件最大尺寸         |
| **请求头大小限制** | 单条Header、总Header大小 |
| **URI长度限制**    | URL最大字符数            |

* 三、应用层限制

| 限制类型         | 说明                             |
| :--------------- | :------------------------------- |
| **浏览器限制**   | User-Agent白名单/黑名单          |
| **IP地址限制**   | 单IP、IP段、地理区域             |
| **Referer限制**  | 来源页面白名单                   |
| **Cookie限制**   | 特定Cookie存在/值匹配            |
| **Token限制**    | URL参数/Header令牌验证           |
| **时间窗口限制** | 特定时段允许/拒绝访问            |
| **请求方法限制** | 允许的HTTP方法（GET/POST/PUT等） |

* 四、资源层限制

| 限制类型           | 说明                        |
| :----------------- | :-------------------------- |
| **CPU限制**        | Worker进程CPU亲和、使用上限 |
| **内存限制**       | 单连接内存占用、总内存      |
| **文件描述符限制** | 进程最大打开文件数          |
| **磁盘IO限制**     | 异步IO队列深度、磁盘带宽    |

* 五、安全层限制

| 限制类型         | 说明                           |
| :--------------- | :----------------------------- |
| **慢攻击防护**   | 慢速连接超时、慢速请求超时     |
| **畸形请求防护** | 非法字符、协议违规拦截         |
| **重试次数限制** | 后端失败重试次数、重试间隔     |
| **DNS解析限制**  | 解析超时、缓存时间、解析器数量 |

## 38、Rewrite全局变量是什么？

* 一、请求信息类

| 变量                 | 说明                                       |
| :------------------- | :----------------------------------------- |
| `$args`              | URL参数（?后的内容）                       |
| `$arg_xxx`           | 特定参数值，如`$arg_id`                    |
| `$uri`               | 当前URI（不含参数，解码后）                |
| `$request_uri`       | 完整URI（含参数，原始编码）                |
| `$request`           | 完整请求行                                 |
| `$request_method`    | 请求方法（GET/POST等）                     |
| `$request_filename`  | 请求映射的文件路径                         |
| `$request_body`      | 请求体（需开启`client_body_in_file_only`） |
| `$request_body_file` | 请求体临时文件路径                         |

* 二、网络连接类

| 变量                   | 说明                   |
| :--------------------- | :--------------------- |
| `$remote_addr`         | 客户端IP地址           |
| `$remote_port`         | 客户端端口             |
| `$remote_user`         | 基本认证用户名         |
| `$server_addr`         | 服务器IP地址           |
| `$server_port`         | 服务器端口             |
| `$server_name`         | 当前server_name        |
| `$server_protocol`     | 请求协议（HTTP/1.1等） |
| `$scheme`              | 协议方案（http/https） |
| `$connection`          | 连接序列号             |
| `$connection_requests` | 当前连接请求数         |

* 三、HTTP头部类

| 变量                    | 说明                             |
| :---------------------- | :------------------------------- |
| `$http_xxx`             | 任意请求头，如`$http_user_agent` |
| `$http_host`            | 请求Host头                       |
| `$http_referer`         | 来源页面                         |
| `$http_user_agent`      | 浏览器标识                       |
| `$http_cookie`          | 完整Cookie字符串                 |
| `$cookie_xxx`           | 特定Cookie值                     |
| `$http_x_forwarded_for` | 代理传递的真实IP                 |
| `$http_authorization`   | 认证信息                         |
| `$sent_http_xxx`        | 响应头（日志用）                 |

* 四、时间类

| 变量                      | 说明                 |
| :------------------------ | :------------------- |
| `$time_iso8601`           | ISO8601格式时间      |
| `$time_local`             | 本地时间（日志格式） |
| `$msec`                   | 毫秒级时间戳         |
| `$request_time`           | 请求处理总时间（秒） |
| `$upstream_response_time` | 后端响应时间         |
| `$upstream_connect_time`  | 后端连接时间         |
| `$upstream_header_time`   | 后端响应头时间       |

* 五、状态与结果类

| 变量               | 说明                                          |
| :----------------- | :-------------------------------------------- |
| `$status`          | HTTP响应状态码                                |
| `$body_bytes_sent` | 发送字节数（不含头）                          |
| `$bytes_sent`      | 总发送字节数                                  |
| `$content_length`  | 请求体长度                                    |
| `$content_type`    | 请求体类型                                    |
| `$host`            | 请求主机（优先级：Host头→server_name→匹配IP） |
| `$hostname`        | 服务器主机名                                  |
| `$nginx_version`   | Nginx版本号                                   |
| `$pid`             | Worker进程ID                                  |
| `$pipe`            | 管道请求标识（p/.）                           |

* 六、Rewrite专用变量

| 变量             | 说明                    |
| :--------------- | :---------------------- |
| `$1-$9`          | 正则捕获组              |
| `$&`             | 完整匹配字符串          |
| `$is_args`       | 存在参数为`?`，否则为空 |
| `$document_root` | 当前root值              |
| `$realpath_root` | root的绝对路径          |
| `$limit_rate`    | 当前限速值              |



## 39、Nginx 如何实现后端服务的健康检查？

方式一，利用 nginx 自带模块 `ngx_http_proxy_module` 和 `ngx_http_upstream_module` 对后端节点做健康检查。

方式二(推荐)，利用 `nginx_upstream_check_module` 模块对后端节点做健康检查。

## 40、Nginx 如何开启压缩？

> 开启nginx gzip压缩后，网页、css、js等静态资源的大小会大大的减少，从而可以节约大量的带宽，提高传输效率，给用户快的体验。虽然会消耗cpu资源，但是为了给用户更好的体验是值得的。

开启的配置如下：

```nginx
http {
  # 开启gzip
  gzip on;
 
  # 启用gzip压缩的最小文件；小于设置值的文件将不会被压缩
  gzip_min_length 1k;
 
  # gzip 压缩级别 1-10 
  gzip_comp_level 2;
 
  # 进行压缩的文件类型。
 
  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
 
  # 是否在http header中添加Vary: Accept-Encoding，建议开启
  gzip_vary on;
}
```

## 41、nginx状态码

| 分类               | 状态码 | 名称                               | 含义                    | 触发场景                          | 解决方案                                     |
| :----------------- | :----- | :--------------------------------- | :---------------------- | :-------------------------------- | :------------------------------------------- |
| **1xx 信息**       | 100    | Continue                           | 继续                    | 客户端发送Expect: 100-continue头  | 正常流程，无需处理                           |
|                    | 101    | Switching Protocols                | 切换协议                | WebSocket/HTTP2协议升级           | 正常流程                                     |
| **2xx 成功**       | 200    | OK                                 | 请求成功                | 正常响应                          | 标准成功状态                                 |
|                    | 201    | Created                            | 已创建                  | POST创建资源成功                  | 正常流程                                     |
|                    | 204    | No Content                         | 无内容                  | DELETE成功或空响应                | 正常流程                                     |
|                    | 206    | Partial Content                    | 部分内容                | 断点续传/Range请求                | 正常流程                                     |
| **3xx 重定向**     | 301    | Moved Permanently                  | 永久重定向              | URL永久变更                       | 确认重定向目标正确                           |
|                    | 302    | Found                              | 临时重定向              | 临时跳转（如登录后返回）          | 避免过多跳转链                               |
|                    | 304    | Not Modified                       | 未修改                  | 缓存有效，返回空body              | 检查Etag/Last-Modified配置                   |
|                    | 307    | Temporary Redirect                 | 临时重定向（保持方法）  | 严格保持POST方法跳转              | 比302更规范                                  |
|                    | 308    | Permanent Redirect                 | 永久重定向（保持方法）  | 严格保持POST方法跳转              | 比301更规范                                  |
| **4xx 客户端错误** | 400    | Bad Request                        | 错误请求                | 请求语法错误/参数非法             | 检查请求格式                                 |
|                    | 401    | Unauthorized                       | 未授权                  | 缺少认证信息                      | 配置auth\_basic/JWT                          |
|                    | 403    | Forbidden                          | 禁止访问                | 权限不足/IP黑名单                 | 检查location权限配置                         |
|                    | 404    | Not Found                          | 未找到                  | 文件/路由不存在                   | 检查root/alias路径                           |
|                    | 405    | Method Not Allowed                 | 方法不允许              | 使用了不允许的HTTP方法            | 检查add\_header Access-Control-Allow-Methods |
|                    | 408    | Request Timeout                    | 请求超时                | 客户端发送请求体超时              | 调整`client_body_timeout`                    |
|                    | 413    | Payload Too Large                  | 请求体过大              | 超过`client_max_body_size`        | 增大`client_max_body_size`                   |
|                    | 414    | URI Too Long                       | URI过长                 | 超过`large_client_header_buffers` | 增大缓冲区                                   |
|                    | 429    | Too Many Requests                  | 请求过多                | 触发`limit_req`限流               | 调整限流阈值或等待                           |
| **Nginx特有4xx**   | 444    | Connection Closed Without Response | 无响应关闭连接          | Nginx主动断开恶意请求             | 用于防攻击，无需处理                         |
|                    | 494    | Request Header Too Large           | 请求头过大              | 超过`large_client_header_buffers` | 增大`large_client_header_buffers 4 16k`      |
|                    | 495    | SSL Certificate Error              | SSL证书错误             | 客户端证书验证失败                | 检查`ssl_client_certificate`配置             |
|                    | 496    | SSL Certificate Required           | 需要SSL证书             | 未提供客户端证书                  | 配置`ssl_verify_client optional`             |
|                    | 497    | HTTP Request Sent to HTTPS Port    | HTTP请求发送到HTTPS端口 | 端口协议不匹配                    | `error_page 497 https://$host$request_uri`   |
|                    | 499    | Client Closed Request              | 客户端关闭请求          | 客户端主动断开连接                | 排查客户端超时/网络质量                      |
| **5xx 服务器错误** | 500    | Internal Server Error              | 内部服务器错误          | Nginx内部错误/配置错误            | 检查error\_log                               |
|                    | 502    | Bad Gateway                        | 网关错误                | 后端无法连接/崩溃                 | 检查后端进程状态、端口、防火墙               |
|                    | 503    | Service Unavailable                | 服务不可用              | 限流触发/主动维护/后端全挂        | 调整限流阈值或检查upstream                   |
|                    | 504    | Gateway Timeout                    | 网关超时                | 后端响应超时                      | 增大`proxy_read_timeout`或优化后端           |
| **Nginx特有5xx**   | 598    | Network Read Timeout Error         | 网络读取超时（非官方）  | 代理层网络超时                    | 检查网络稳定性                               |