---
title: 【Linux】Nginx一个域名https&一个地址配置多个项目【项目实战】
icon: circle-info
order: 1
category:
  - Linux
  - Nginx
tag:
  - Linux
  - Nginx
  - 运维
pageview: false
date: 2024-12-16
comment: false
breadcrumb: false
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


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161338953.png)



## 一个域名带https配置多个项目

①、首先将项目移动到html下；
②、将ssl证书移动到目的地；
③、然后进行nginx配置；

Nginx配置文件完整代码展示（主要在`server`段）：

```bash

#user  root;
worker_processes 1;

events {
  worker_connections 1024;
}


http {
  include mime.types;
  default_type application/octet-stream;

  sendfile on;
  #tcp_nopush     on;

  #keepalive_timeout  0;
  keepalive_timeout 65;

  #gzip  on;

  server {
    listen 80;
    server_name test.top www.test.top;

    # HTTP 重定向到 HTTPS
    return 301 https://$host$request_uri;
  }

  server {
    listen 443 ssl;
    server_name test.top www.test.top;

    # SSL 配置
    ssl_certificate /usr/local/nginx/conf/ssl/test.top.pem;
    ssl_certificate_key /usr/local/nginx/conf/ssl/test.top.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers on;

    # 设置错误页面
    error_page 404 /404.html;
    error_page 500 /500.html;

    location = /404.html {
      root /usr/local/nginx/html;
      internal;
    }

    location = /500.html {
      root /usr/local/nginx/html;
      internal;
    }

    # 定义项目根目录
    root /usr/local/nginx/html;

    # 默认访问 项目1 【如果不想用项目1，也可以自定义其他项目】
    location / {
      try_files $uri $uri/ /项目1/index.html;
      #			root   html;
      #			index  index.html index.htm;
    }

    # 项目1 项目
    location /项目1 {
      alias /usr/local/nginx/html/项目1;
      try_files $uri $uri/ /项目1/index.html;
    }

    # 项目2 项目
    location /项目2 {
      alias /usr/local/nginx/html/项目2;
      try_files $uri $uri/ /项目2/index.html;
    }

    # 项目3 项目
    location /项目3 {
      alias /usr/local/nginx/html/项目3;
      try_files $uri $uri/ /项目3/index.html;
    }
  }
}
```



这样页面访问时就可以是：`https://test.top/项目1/`、`https://test.top/项目2/`、`https://test.top/项目3/`。


## 一个域名配置多个项目
①、首先将项目移动到html下；
②、然后进行nginx配置；

Nginx配置文件完整代码展示（主要在`server`段）：

```bash

#user  root;
worker_processes 1;

events {
  worker_connections 1024;
}


http {
  include mime.types;
  default_type application/octet-stream;

  sendfile on;
  #tcp_nopush     on;

  #keepalive_timeout  0;
  keepalive_timeout 65;

  #gzip  on;

  server {
    listen 80;
    server_name test.top www.test.top;

    # 设置错误页面
    error_page 404 /404.html;
    error_page 500 /500.html;

    location = /404.html {
      root /usr/local/nginx/html;
      internal;
    }

    location = /500.html {
      root /usr/local/nginx/html;
      internal;
    }

    # 定义项目根目录
    root /usr/local/nginx/html;

    # 默认访问 项目1 【如果不想用项目1，也可以自定义其他项目】
    location / {
      try_files $uri $uri/ /项目1/index.html;
      #			root   html;
      #			index  index.html index.htm;
    }

    # 项目1 项目
    location /项目1 {
      alias /usr/local/nginx/html/项目1;
      try_files $uri $uri/ /项目1/index.html;
    }

    # 项目2 项目
    location /项目2 {
      alias /usr/local/nginx/html/项目2;
      try_files $uri $uri/ /项目2/index.html;
    }

    # 项目3 项目
    location /项目3 {
      alias /usr/local/nginx/html/项目3;
      try_files $uri $uri/ /项目3/index.html;
    }
  }
}
```



这样页面访问时就可以是：`http://test.top/项目1/`、`http://test.top/项目2/`、`http://test.top/项目3/`。


## 本机地址配置多个项目
> 本机地址配置多个项目这个其实和`一个域名配置多个项目`是一样的，只不过把`server_name`的域名换成`localhost`就行。<br>
> 具体操作如下：



①、首先将项目移动到html下；
②、然后进行nginx配置；

Nginx配置文件完整代码展示（主要在`server`段）：

```conf

user root;
worker_processes 1;

events {
  worker_connections 1024;
}


http {
  include mime.types;
  default_type application/octet-stream;

  sendfile on;
  #tcp_nopush     on;

  #keepalive_timeout  0;
  keepalive_timeout 65;

  #gzip  on;

  server {
    listen 80;
    server_name localhost;

    # 设置错误页面
    error_page 404 /404.html;
    error_page 500 /500.html;

    location = /404.html {
      root /usr/local/nginx/html;
      internal;
    }

    location = /500.html {
      root /usr/local/nginx/html;
      internal;
    }

    # 定义项目根目录
    root /usr/local/nginx/html;

    # 默认访问 html/下的index.html页面
    location / {
      root html;
      index index.html index.htm;
      # 如果需要以项目1为默认页，可以把这个配置打开，上面的两个注释了就行；
      # try_files $uri $uri/ /项目1/index.html;
    }

    # 项目1 项目
    location /项目1 {
      alias /usr/local/nginx/html/项目1;
      try_files $uri $uri/ /项目1/index.html;
    }

    # 项目2 项目
    location /项目2 {
      alias /usr/local/nginx/html/项目2;
      try_files $uri $uri/ /项目2/index.html;
    }
  }
}
```

这样页面访问的是时候就可以是：`ip/项目1/`、`ip/项目2/`。




>推荐一个优化nginx配置文件的页面：[Nginx配置文件格式化](https://tool.okcode.vip/dev/nginx-formatter)<br>
这里面还有很多格式化工具可以自己看看：[https://tool.okcode.vip/](https://tool.okcode.vip/)<br>
Nginx 404页面美化：[Nginx 404页面美化](https://download.csdn.net/download/liu_chen_yang/90123906)


## 相关文章
|文章标题| 文章连接 |
|--|--|
|【Linux】nginx基础篇 -- 介绍及yum安装nginx|[https://liucy.blog.csdn.net/article/details/133928000](https://liucy.blog.csdn.net/article/details/133928000)|
|【Linux】环境下部署Nginx服务 - 二进制部署方式 |  [https://liucy.blog.csdn.net/article/details/132145067](https://liucy.blog.csdn.net/article/details/132145067)|
|nginx配置负载均衡--实战项目（适用于轮询、加权轮询、ip_hash）|[https://liucy.blog.csdn.net/article/details/133986013](https://liucy.blog.csdn.net/article/details/133986013)|
|nginx快速部署一个网站服务 + 多域名 + 多端口 | [https://liucy.blog.csdn.net/article/details/133986102](https://liucy.blog.csdn.net/article/details/133986102) |
| 【Linux】Nginx一个域名https&一个地址配置多个项目【项目实战】|[https://liucy.blog.csdn.net/article/details/144442148](https://liucy.blog.csdn.net/article/details/144442148) |

## 相关专栏
><div align="center"><a href="https://blog.csdn.net/liu_chen_yang/category_10887074.html">❀《Linux从入门到精通》专栏 ❀</a></div>
><div align="center"><a href="https://blog.csdn.net/liu_chen_yang/category_12419502.html">❀《Nginx》专栏 ❀</a></div>

>🐋 希望大家多多支持，我们一起进步！😄
🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗
