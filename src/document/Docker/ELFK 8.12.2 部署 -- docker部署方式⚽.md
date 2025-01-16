---
title: ELFK 8.12.2 部署 -- docker部署方式⚽
icon: circle-info
order: 1
category:
  - Linux
  - docker
tag:
  - Linux
  - ELFK
  - 运维
pageview: false
date: 2024-12-19
comment: false
breadcrumb: false
---

>
>
>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191554918.jpeg)


## 一、ELFK的部署 -- docker部署方式⚽

### 1.  前置准备

#### 1.1 服务器信息

|      IP       | 操作系统                         | 系统配置                                 | 环境                         | 服务                                                        | 端口                               |
| :-----------: | :------------------------------- | :--------------------------------------- | ---------------------------- | :---------------------------------------------------------- | :--------------------------------- |
| 172.16.11.213 | CentOS Linux 7 (Core)<br>X86架构 | CPU：4核8线程<br>内存：16G<br>硬盘：100G | docker<br>docker-compose<br> | Elasticsearch<br>Logstash<br/>Kibana<br/>Filebeat<br/>nginx | 9200 / 9300<br>5044<br>5601<br><br>80 |

**要用到的服务包信息：**

| 软件安装包名称 | 软件版本 |              功能              |
| :------------: | :------: | :----------------------------: |
|     docker     |  24.0.5  |     容器：提供单独elfk环境     |
| docker-compose |  1.29.2  | 容器编排工具：用于同步管理elfk |
| elasticsearch  |  8.12.2  |            日志存储            |
|     kibana     |  8.12.2  |       日志数据图形化展示       |
|    logstash    |  8.12.2  |            日志处理            |
|    filebeat    |  8.12.2  |            日志采集            |
|     nginx      |  1.24.0  |           nginx服务            |



**ELFK 关系图：**



![ELFK基础架构图](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191554242.png)



#### 1.2 关闭防火墙及selinux沙盒

```bash
# 先查看防火墙是否开启
systemctl status firewalld

# 如果是开启的那就关闭并设置开机不自启
systemctl stop firewalld
systemctl disable firewalld

# 设置selinux为Disabled
cat /etc/selinux/config
# 设置 SELINUX=disabled
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191554917.png)



---



如果防火墙开启的话，需要打开的端口有：（端口可自行定义）

* Elasticsearch：`9200`、`9300`
* Kibana：`5601`
* Logstash：`5044`
* nginx：`80`
* **filebeat** 本身不监听任何端口，它是一个轻量级的日志文件收集器，用于将日志发送到Logstash或Elasticsearch。



> **注：**
>
> **9200 本地elasticsearch服务本地的端口
> 9300 是elasticsearch集群的通信端口**



#### 1.3 将ELFK镜像包上传到服务器上（也可以等在执行docker-compose时自动拉取）

在启动服务的时候默认是可以拉取ELFK镜像的，不过最近dockerhub好像国内用不了了，拉不了镜像；

而且拉镜像也慢，<font coolor=red>还需要配置docker镜像加速</font>，所以，离线镜像还是比较好的，可以提前上传到服务器上；



- E: elasticsearch 数据存储、数据搜索；

  ~~官网下载地址：[https://www.elastic.co/cn/downloads/elasticsearch/](https://www.elastic.co/cn/downloads/elasticsearch/)~~

- L: logstash 数据采集、数据清洗、数据过滤；

  ~~官网下载地址：[https://www.elastic.co/cn/downloads/logstash](https://www.elastic.co/cn/downloads/logstash)~~

- K: kibana 数据分析、数据展示；

  ~~官网下载地址：[https://www.elastic.co/cn/downloads/kibana/](https://www.elastic.co/cn/downloads/kibana/)~~

- F：filebeat 收集日志数据；

  ~~官网下载地址：[https://www.elastic.co/guide/en/beats/filebeat/index.html](https://www.elastic.co/guide/en/beats/filebeat/index.html)~~



镜像下载地址：

>  我这边目前只有：8.12.2、7.1.0版本；CSDN下载地址；
>
> 其他版本可以百度看看：



|                             包名                             |                             地址                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| [ELFK docker镜像-7.1.0版本（elasticsearch、filebeat）](https://download.csdn.net/download/liu_chen_yang/89427498) | [https://download.csdn.net/download/liu_chen_yang/89427498](https://download.csdn.net/download/liu_chen_yang/89427498) |
| [ELFK docker镜像-7.1.0版本（kibana、logstash）](https://download.csdn.net/download/liu_chen_yang/89427504) | [https://download.csdn.net/download/liu_chen_yang/89427504](https://download.csdn.net/download/liu_chen_yang/89427504) |
| [ELFK docker镜像-8.12.2版本（elasticsearch、filebeat）](https://download.csdn.net/download/liu_chen_yang/89427462) | [https://download.csdn.net/download/liu_chen_yang/89427462](https://download.csdn.net/download/liu_chen_yang/89427462) |
| [ELFK docker镜像-8.12.2版本（kibana、logsatsh）](https://download.csdn.net/download/liu_chen_yang/89427463) | [https://download.csdn.net/download/liu_chen_yang/89427463](https://download.csdn.net/download/liu_chen_yang/89427463) |

>  <font color=red>注： ELFK的四个镜像包的保持版本需一致。</font>

#### 1.4 校正时间

```bash
# 下载ntpdate命令
yum -y install ntpdate

# 时间校正
ntpdate cn.pool.ntp.org
```

#### 1.5 本文注意事项

> <font color=red size=4x>**注意：本文出现的 IP 和 容器外的路径 请根据自己的实际情况自定义**</font><br><br><font color=red size=4x>**注意：本文出现的 IP 和 容器外的路径 请根据自己的实际情况自定义**</font><br><br><font color=red size=4x>**注意：本文出现的 IP 和 容器外的路径 请根据自己的实际情况自定义**</font>



### 2. 部署docker

* [x] 方法一：

参考部署文档：[linux（centos）中部署docker（步骤超全，含带一些发展史和一些概念）](https://blog.csdn.net/liu_chen_yang/article/details/123842609)

* [x] 方法二：

可以选择离线一键安装：[docker24.0.5离线安装包 （一键部署）](https://download.csdn.net/download/liu_chen_yang/88647183)

* [x] 方法三：

按照以下方式安装

```bash
# 安装utils工具
yum -y install yum-utils

# 安装docker扩展源工具
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 安装docker服务
yum install docker-ce docker-ce-cli containerd.io

# 设置docker开机自启并启动服务
systemctl daemon-reload
systemctl restart docker
systemctl enable docker
```



### 3. 部署docker-compose

* [x] 方法一：

参考部署文档部署：[Linux中安装/部署docker-compose](https://blog.csdn.net/liu_chen_yang/article/details/124688952)

* [x] 方法二：

可以选择离线安装：[docker-compose1.29.2离线包](https://download.csdn.net/download/liu_chen_yang/89428645)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191554716.png)



### 4. 部署ELFK

**注意事项：**
> **<font color=red size=4x>注意：本文出现的 IP 和 容器外的路径 请根据自己的实际情况自定义</font>**<br><br><font color=red size=4x>**注意：本文出现的 IP 和 容器外的路径 请根据自己的实际情况自定义**</font><br><br><font color=red size=4x>**注意：本文出现的 IP 和 容器外的路径 请根据自己的实际情况自定义**</font>
#### 4.1 创建ELFK的项目路径

```bash
mkdir -p /data/ELK
```

#### 4.2 创建ES目录及配置文件

```bash
# 创建ES目录
mkdir -p /data/ELK/elasticsearch/{plugins,config,data,logs}

# 进入es的config目录
cd /data/ELK/elasticsearch/config

# 创建es配置文件
touch es.yml

# 给所有ES目录读写执行权限
chmod 775 -R /data/ELK/elasticsearch/

# 编辑es配置文件
vi es.yml
```

```yaml
# 集群名称
cluster.name: mycluster

# 节点名称
node.name: mynode

# 网络绑定地址
network.host: 0.0.0.0

# 默认端口：9200 本地elasticsearch服务本地的端口、9300 是elasticsearch集群的通信端口
http.port: 9200
transport.port: 9300

# 开启单节点模式
node.roles: [ master, data, ingest, ml ]

# 内存限制
#bootstrap.memory_lock: true
#ES_JAVA_OPTS: "-Xms512m -Xmx512m"

# 关闭集群发现功能（单节点）
discovery.type: single-node

# --------------------------- ssl安全认证配置 ----------------------------------

# 关闭 X-Pack 安全模式
xpack.security.enabled: false
# 禁用初始化生成密码功能
xpack.security.enrollment.enabled: false
# 禁用客户端之间连接加密，如果启用，客户端（如 Kibana、Logstash、filebeat）就需要通过加密方式访问
xpack.security.http.ssl.enabled: false
# 指定ssl证书地址（开启安全模式就需要开启这个）
#xpack.security.http.ssl.keystore.path: certs/http.p12

# 禁用 Elasticsearch 节点间传输层通信的加密。
xpack.security.transport.ssl.enabled: false
# 证书的验证模式，certificate 为双向 SSL/TLS 认证（即节点间相互验证证书）
#xpack.security.transport.ssl.verification_mode: certificate
# 如果启用了ssl认证，下面两个就是配置证书和私钥的文件路径
#xpack.security.transport.ssl.keystore.path: certs/transport.p12
#xpack.security.transport.ssl.truststore.path: certs/transport.p12

# ----------------------- END SECURITY AUTO CONFIGURATION -------------------------

# 注意：在生产环境中，建议启用 SSL/TLS 加密来保护数据传输的安全性，特别是在公共或不安全的网络中。如果你选择启用 SSL/TLS，需要确保你有有效的证书和密钥库，并正确配置了密钥库和信任库的路径。在开发或测试环境中，可能会为了方便而禁用这些安全特性，但要意识到这可能会带来安全风险。
```



#### 4.3 创建Logstash目录及配置文件

```bash
# 创建logstash目录
mkdir -p /data/ELK/logstash/{conf.d,config,data,logs}

# 进入logstash的config目录
cd /data/ELK/logstash/config

# 创建logstash的yml文件
touch logstash.yml

# 编辑logstash配置文件
vim logstash.yml

path.config: /usr/share/logstash/conf.d/*.conf
path.logs: /usr/share/logstash/logs

# 进入logstash的conf.d目录
cd /data/ELK/logstash/conf.d

# 创建logstash配置文件
touch logstash.conf

# 编辑logstash配置文件
vi logstash.conf
```

```bash
input {
  beats {
    port => 5044
    codec => "json"
  }
}

output {
    elasticsearch {
	# es的地址
      	hosts => ["http://172.16.11.213:9200"]
      	# 用户名（如果es开启了用户名密码这里就需要配置，如果没开启就不用配置）
      	#user => "elastic"
      	# 密码
      	#password => "123456"
	# 索引
      	#index => "dashu-park-error-log"
	# 类型
	#document_type => "fire"
	# 主键
	#document_id => "%{id}"
    }
# mail插件，可以用来报警发邮件
#    email {
#        port           => "25"
#        address        => "smtp.163.com"
#        username       => "123123123@163.com"
#        password       => "1231231231"
#        authentication => "plain"
#        use_tls        => false
#        from           => "123123123@qq.com"
#        subject        => "dashu-park-zone项目中有error日志信息"
#        to             => "123123123@qq.com"
#        via            => "smtp"
#        body           => "错误日志： \n  %{message} "
#    }
#  }
#  redis {
#     host => ["172.16.11.213"] #这个是标明redis服务的地址
#     port => 9001
#     codec => plain
#     db => 1 #redis中的数据库，select的对象
#     key => elk_log #redis中的键值
#     data_type => list #一般就是list和channel
#     password => DaShuRedisoRhFG9xT6kXIZl5b
#     timeout => 5
#     workers => 1
#  }
  stdout { codec => rubydebug }
}
```



#### 4.4 创建Kibana目录及配置文件

```bash
# 创建kibana目录
mkdir -p /data/ELK/kibana/

# 进入kibana目录
cd /data/ELK/kibana/

# 创建kibana配置文件
touch kibana.yml

# 编辑kibana配置文件
vi kibana.yml
```

```yaml
server.host: "0.0.0.0"
server.shutdownTimeout: "5s"
elasticsearch.hosts: [ "http://172.16.11.213:9200" ]
# 配置中文
i18n.locale: zh-CN
# 配置用户名密码（es有用户名密码的时候在开启）
#elasticsearch.username: "kibana"
#elasticsearch.password: "123456"
```



#### 4.5 创建filebeat目录及配置文件

```bash
# 创建filebeat目录
mkdir -p /data/ELK/filebeat/{config,data,logs}

# 进入filebeat/config目录
cd /data/ELK/filebeat/config

# 创建filebeat配置文件
touch filebeat.yml

# 去除filebeat组和其他用户的写入权限。
chmod go-w /data/ELK/filebeat/config/filebeat.yml

# 编辑filebeat配置文件
vi filebeat.yml
```

```yaml
#=========================== Filebeat inputs =============================

filebeat.inputs:
- type: log
  # Change to true to enable this input configuration.
  enabled: true
  
  # Paths that should be crawled and fetched. Glob based paths.
  paths:  #可以配置多个日志路径
    # 如果是docker部署，这里就是docker容器内的路径，而且需要和宿主机的路径进行映射
    - /usr/share/filebeat/logs/*.log
    #- /usr/share/filebeat/logs/info.log	
  #指定自定义字段	
  fields:							
       project: "fire"  #字段1	
       #hostName: "172.16.11.213"	  #字段2
  
  multiline:
    #多行匹配规则
    pattern: '^[[:space:]]+(at|\.{3})\b&^Caused by:'
    #将不匹配的规则的行合并在一起
    negate: true
    #合并到匹配规则的上一行末尾
    match: after


#================================ Outputs =====================================

#----------------------------- Logstash output --------------------------------
output.logstash:
  # The Logstash hosts
  hosts: ["172.16.11.213:5044"]   

  # Optional SSL. By default is off.
  # List of root certificates for HTTPS server verifications
  #ssl.certificate_authorities: ["/etc/pki/root/ca.pem"]

  # Certificate for SSL client authentication
  #ssl.certificate: "/etc/pki/client/cert.pem"

  # Client Certificate Key
  #ssl.key: "/etc/pki/client/cert.key"


#output.elasticsearch:
#  hosts: 172.16.11.213:9200
#  indices:
#    - index: "filebeat-%{+yyyy.MM.dd}"

#output.redis:
   #hosts: ["172.16.11.213:9001"]
   #password: DaShuRedisoRhFG9xT6kXIZl5b
   #key: "filebeat-redis"
   #db: 1
   #timeout: 60
   
# 控制台输出
#output.console:
  #pretty: true
  #enable: true
```



#### 4.6 导入ELFK镜像

提前导入好镜像在执行docker-compose时就不用在拉取了，而且网络不稳定也容易中断；
如果docker默认路径没空间，可参考此文章修改docker存储路径：[【docker】导入镜像报错磁盘空间不足的解决方法 && 【docker】修改默认的存储路径](https://blog.csdn.net/liu_chen_yang/article/details/124322403)

```bash
docker load -i elasticsearch.tar && docker load -i logstash.tar && docker load -i kibana.tar && docker load -i filebeat.tar
```

```bash
[root@localhost config]# docker images 
REPOSITORY                                      TAG       IMAGE ID       CREATED        SIZE
elastic/kibana                                  8.12.2    2870bdfe2474   3 months ago   1.05GB
elastic/elasticsearch                           8.12.2    c02b14250fd3   3 months ago   1.36GB
elastic/logstash                                8.12.2    341c9b96c97b   3 months ago   769MB
elastic/filebeat                                8.12.2    89c084ca559d   3 months ago   325MB
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191554234.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191554657.png)



#### 4.7 使用docker-compose启动ELFK服务



①、先创建docker-compose目录用来管理ELFK服务

```bash
# 创建docker-compose目录
mkdir -p /data/ELK/docker-compose

# 进入docker-compose目录
cd /data/ELK/docker-compose

# 创建docker-compose的yml配置文件
touch docker-compose.yml

#编辑docker-compose配置
vi docker-compose.yml
```

```yaml
version: '3'
services:
  elasticsearch:
    image: elastic/elasticsearch:8.12.2
    container_name: es
    hostname: es
    restart: always
    volumes:
      - /data/ELK/elasticsearch/config/es.yml:/usr/share/elasticsearch/config/elasticsearch.yml
      - /data/ELK/elasticsearch/plugins:/usr/share/elasticsearch/plugins
      - /data/ELK/elasticsearch/data:/usr/share/elasticsearch/data
      - /data/ELK/elasticsearch/logs:/usr/share/elasticsearch/logs
      - /etc/localtime:/etc/localtime
    ports:
      - 9200:9200
      - 9300:9300
      
  logstash:
    image: elastic/logstash:8.12.2
    container_name: logstash
    hostname: logstash
    restart: always
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "2"
    volumes:
      - /data/ELK/logstash/config/logstash.yml:/usr/share/logstash/config/logstash.yml
      - /data/ELK/logstash/conf.d/:/usr/share/logstash/conf.d/
      - /etc/localtime:/etc/localtime
    ports:
      - 5044:5044

  kibana:
    image: elastic/kibana:8.12.2
    container_name: kibana
    hostname: kibana
    restart: always
    volumes:
      - /data/ELK/kibana/kibana.yml:/usr/share/kibana/config/kibana.yml
    ports:
      - 5601:5601
      
  filebeat:
    image: elastic/filebeat:8.12.2
    container_name: filebeat
    hostname: filebeat
    restart: always
    user: root
    volumes:
      # 日志文件夹映射到容器中[作为数据源]
      - /data/ELK/filebeat/logs:/usr/share/filebeat/logs/
      # 采集日志配置映射配置文件到容器中
      - /data/ELK/filebeat/config/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
      - /etc/localtime:/etc/localtime
    # 使用主机网络模式
    network_mode: host
```

---



如果防火墙开启的话，需要打开的端口有：（端口可自行定义）

* Elasticsearch：`9200`、`9300`
* Kibana：`5601`
* Logstash：`5044`
* nginx：`80`
* **filebeat** 本身不监听任何端口，它是一个轻量级的日志文件收集器，用于将日志发送到Logstash或Elasticsearch。



> **注：**
>
> **9200 本地elasticsearch服务本地的端口
> 9300 是elasticsearch集群的通信端口**



---



②、启动ELFK服务

```bash
# 进入docker-compose.yml位置
cd /data/ELK/docker-compose/

# 启动（两种二选一）
docker-compose up -d 

docker-compose -f /data/ELK/docker-compose/docker-compose.yml up -d
```



③、查看ELFK服务状态

```bash
docker-compose ps
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191554963.png)

State状态为：`UP`或者`running`就为运行状态。

---


④、启动完ELFK都看一下这些容器的日志

启动完ELFK都看一下这些容器的日志，看看有没有报错；

```bash
# 查看es的服务日志
docker logs -f es

# 查看logstash的服务日志
docker logs -f logstash

# 查看kibana的服务日志
docker logs -f kibana

# 查看filebeat的服务日志
docker logs -f filebeat
```
如果在启动 **kibana** 时遇到以下提示内容，不用管，这个提示说的是没有配置账户令牌，不影响我们的访问及拿日志；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191554129.png)


#### 4.8 访问es、kibana地址

访问es、kibana地址，确认是否可以访问到，没有问题；

<font color=red>注意把 ip 换成自己的；</font>

* [x] es地址：[http://172.16.11.213:9200](http://172.16.11.213:9200)



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191554085.png)



* [x] kibana地址：[http://172.16.11.213:5601](http://172.16.11.213:5601)


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191553636.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191553856.png)



#### 4.9 安装并配置nginx

部署nginx可以参考：[【Linux】nginx基础篇 -- 介绍及yum安装nginx](https://blog.csdn.net/liu_chen_yang/article/details/133928000)、[【Linux】环境下部署Nginx服务 - 二进制部署方式](https://blog.csdn.net/liu_chen_yang/article/details/132145067)

这里我习惯于二进制的部署方式，那么就使用二进制部署，这里就简单写一下，具体的操作可以看二进制部署文档；

```bash
# 拉取1.24.0安装包
wget https://nginx.org/download/nginx-1.24.0.tar.gz
# 安装必要的插件依赖包
yum -y install gcc gcc-c++ zlib zlib-devel pcre-devel openssl openssl-devel 
# 解压到/usr/src下
tar xf nginx-1.24.0.tar.gz -C /usr/src/
# 进入
cd /usr/src/nginx-1.24.0
# 编译安装
./configure --prefix=/usr/local/nginx && make && make install
```

安装完成后，这里需要修改以下配置文件，把nginx的日志路径指到filebeat的logs目录下

```bash
# 进入nginx配置文件
cd /usr/local/nginx/conf/
vim nginx.conf
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191553772.png)



```bash
# 启动nginx服务
/usr/local/nginx/sbin/nginx -c  /usr/local/nginx/conf/nginx.conf

# 查看filebeat日志是否有输出，页面访问http://172.16.11.213 nginx刷新
tail -f /data/ELK/filebeat/logs/nginx_access.log
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191553824.png)





#### 4.10 获取服务日志并进行页面展示

页面访问kibana查看日志：[http://172.16.11.213:5601](http://172.16.11.213:5601)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191553390.png)



刷新nginx页面，使其产生日志，并实时监控日志



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191553145.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191553760.png)

---
<center>到此部署就完成，如果想要加一些安全性比如密码认证，可以接着看下面的内容；</center>

---





## 二、ELK8.12.2版本配置密码认证

### 1、配置 ES 开启安全验证

#### 1.1 修改 es 配置文件

```bash
# ES配置文件
vim /data/ELK/elasticsearch/config/es.yml

# 将xpack.security.enabled=false改为true启用 X-Pack 安全性：
xpack.security.enabled: true
```



#### 1.2 重启 es 容器

```bash
docker restart es
```
重启完记得再看一下es日志，看看有没有报错什么的；
```bash
docker logs -f es
```
重启完kibana会连接不到，因为开启了安全认证，kibana没有找到相关配置，所以，会连接不到，在报错，在后面我们会配置的；

#### 1.3 进入容器生成密码

```bash
# 进入容器
docker exec -it es bash

# 生成密码（自动与手动二选一）
## 自动生成密码
elasticsearch-setup-passwords auto
## 手动输入密码
elasticsearch-setup-passwords interactive 
```

这里我选择手动输入密码；手动输入密码每个用户都要输入两遍密码，一遍是输入一遍是确认密码；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191553580.png)



#### 1.4 访问 es 页面进行验证

页面访问：[http://172.16.11.213:9200](http://172.16.11.213:9200)



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191553210.png)



输入完用户名密码，就到这个页面了；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191553444.png)



### 2、配置 logstash 连接用户密码

#### 2.1 修改 logstash 配置文件

```bash
# 进入logstash配置文件
vim /data/ELK/logstash/conf.d/logstash.conf

# 在output中输入用户名密码
user => "elastic"
password => "刚刚生成或手动输入的密码"
```

xpack.monitoring.enabled: true
xpack.monitoring.elasticsearch.username: elastic
xpack.monitoring.elasticsearch.password: lcy123...



#### 2.2 重启 logstash 容器

```bash
docker restart logstash
```
重启完记得再看一下 logstash 日志，看看有没有报错什么的；
```bash
docker logs -f logstash
```

### 3、配置 kibana 连接用户密码

#### 3.1 修改 kibana 配置文件

```bash
# 进入kibana配置文件
vim /data/ELK/kibana/kibana.yml

# 在最后添加或修改（这里用户名不能用elastic，否则启动会报错，elastic是超级用户，在8.*版本里是被禁止的）
elasticsearch.username: "kibana"
elasticsearch.password: "刚刚生成或手动输入的密码"
```

#### 3.2 重启 kibana 容器

```bash
docker restart kibana
```
重启完记得再看一下 kibana 日志，看看有没有报错什么的；
```bash
docker logs -f kibana
```

这里可以把ELFK全部重启一下（两种方式二选一）记得重启完查看日志；

```bash
docker-compose restart

docker-compose -f /data/ELK/docker-compose/docker-compose.yml restart
```



#### 3.3 访问 kibana 页面进行验证



访问kibana页面：[http://172.16.11.213:5601](http://172.16.11.213:5601)



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191553253.png)



这里可以输入用户名密码，并不是非要kibana配置文件中设置的用户名密码，用哪个登录上来会没有权限，这里我们可以登录`elastic`用户，密码也是刚刚设置的密码；

登录进来，右上角就会多出一个头像等用户信息；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191552311.png)



## 三、附加：修改 ELK 认证密码

```bash
curl -H "Content-Type:application/json" -XPOST -u elastic 'http://ip:9200/_xpack/security/user/elastic/_password' -d '{ "password" : "要修改的密码" }'
```

## 四、附加：获取多台服务器日志
&emsp;&emsp;要获取多台服务器日志，那么我们就需要在要获取日志的那台服务器上部署日志收集器，也就是我们的`filebeat`服务；<font color=red>前提是，必须可以连接到、ping通部署ELFK的这台主服务器上。</font>


### 1、创建filebeat目录及配置文件

```bash
# 创建filebeat目录
mkdir -p /data/ELK/filebeat/{config,data,logs}

# 进入filebeat/config目录
cd /data/ELK/filebeat/config

# 创建filebeat配置文件
touch filebeat.yml

# 去除filebeat组和其他用户的写入权限。
chmod go-w /data/ELK/filebeat/config/filebeat.yml

# 编辑filebeat配置文件
vi filebeat.yml
```

```yaml
#=========================== Filebeat inputs =============================

filebeat.inputs:
- type: log
  # Change to true to enable this input configuration.
  enabled: true
  
  # Paths that should be crawled and fetched. Glob based paths.
  paths:  #可以配置多个日志路径
    # 如果是docker部署，这里就是docker容器内的路径，而且需要和宿主机的路径进行映射
    - /usr/share/filebeat/logs/*.log
    #- /usr/share/filebeat/logs/info.log	
  #指定自定义字段	
  fields:							
       project: "fire"  #字段1	
       #hostName: "172.16.11.213"	  #字段2
  
  multiline:
    #多行匹配规则
    pattern: '^[[:space:]]+(at|\.{3})\b&^Caused by:'
    #将不匹配的规则的行合并在一起
    negate: true
    #合并到匹配规则的上一行末尾
    match: after


#================================ Outputs =====================================

#----------------------------- Logstash output --------------------------------
output.logstash:
  # The Logstash hosts
  hosts: ["172.16.11.213:5044"]   
```

### 2、上传并导入 filebeat 镜像
```bash
 docker load -i filebeat.tar
```
### 3、使用docker-compose启动filebeat服务
①、先创建docker-compose目录用来管理 filebeat 服务

```bash
# 创建docker-compose目录
mkdir -p /data/ELK/docker-compose

# 进入docker-compose目录
cd /data/ELK/docker-compose

# 创建docker-compose的yml配置文件
touch docker-compose.yml

#编辑docker-compose配置
vi docker-compose.yml

```

```yaml
version: "3"
services:
  filebeat:
    image: elastic/filebeat:8.12.2
    container_name: filebeat
    hostname: filebeat
    restart: always
    user: root
    volumes:
      # 日志文件夹映射到容器中[作为数据源]，可以切换为自己服务的日志路径；
      - /data/ELK/filebeat/logs/:/usr/share/filebeat/logs/
      # 采集日志配置映射配置文件到容器中
      - /data/ELK/filebeat/config/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
      - /etc/localtime:/etc/localtime
    # 使用主机网络模式
    network_mode: host
```
---

如果不想用docker-compose，就要用docker的话也可以，把他转换成docker命令就行；
```bash
docker run -d --name filebeat --hostname=filebeat --restart=always --network=host -v /data/ELK/filebeat/logs/:/usr/share/filebeat/logs/ -v /data/ELK/filebeat/config/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro -v /etc/localtime:/etc/localtime elastic/filebeat:8.12.2
```
---
②、启动 filebeat 服务

```bash
# 进入docker-compose.yml位置
cd /data/ELK/docker-compose/

# 启动（两种二选一）
docker-compose up -d 

docker-compose -f /data/ELK/docker-compose/docker-compose.yml up -d
```

③、查看 filebeat 服务状态

```bash
docker-compose ps
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191552730.png)

State状态为：`UP`或者`running`就为运行状态。

---
④、启动完看一下 filebeat 容器的日志，看看有没有报错
```bash
docker logs -f filebeat
```
### 4、登录 kibana 页面查看新节点的日志
没有问题的话就可以产生一些日志，然后去**kibana**页面查看日志；
[http://172.16.11.213:5601](http://172.16.11.213:5601)


## 五、附加：kibana 页面操作

### 1、查看日志属于哪个路径下及日志名
如果要看这个日志是哪个路径的话，可以`Discover`中搜索`log.file.path`

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191552363.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191552691.png)
### 2、仪表板

仪表板可以在`Home`-->`Dashboards`创建；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191552380.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191552439.png)



## 六、相关文章

| 文章名称 | 文章链接 |
| :------: | :------: |
|    [ELFK简介](https://liucy.blog.csdn.net/article/details/139653744)   |        [https://liucy.blog.csdn.net/article/details/139653744](https://liucy.blog.csdn.net/article/details/139653744)     |
|     [ELFK 8.12.2 单机部署 -- docker部署方式⚽](https://liucy.blog.csdn.net/article/details/139761024)     |       [https://liucy.blog.csdn.net/article/details/139761024](https://liucy.blog.csdn.net/article/details/139761024)   |
