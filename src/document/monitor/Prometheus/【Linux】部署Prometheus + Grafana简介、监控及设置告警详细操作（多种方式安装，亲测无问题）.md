---
title: 【Linux】部署Prometheus + Grafana简介、监控及设置告警详细操作（多种方式安装，亲测无问题）
icon: circle-info
order: 1
category:
  - Linux
  - zabbix
  - 服务器监控
tag:
  - Linux
  - zabbix
  - 服务器监控
  - 运维
pageview: false
date: 2024-12-16
comment: false
breadcrumb: false
---

>🍁**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！



## 一、环境准备
|  服务器类型	|IP地址	  |组件|
|--|--|--|
|Prometheus 服务器、agent 服务器、grafana 服务器	|172.16.11.209|Prometheus、node_exporter、Grafana
|agent 服务器|	172.16.11.220|node_exporter

> 如果有防火墙记得开启：9090（Prometheus）、9100（Exporters）、3000（Grafana）
## 二、部署 Prometheus（普罗米修斯）
### 1、Prometheus 简介
>Prometheus是由SoundCloud开发的开源监控报警系统和时序列数据库(TSDB),基于Go语言开发，是Google BorgMon监控系统的开源版本。Prometheus在2016年加入了云原生计算基金会，成为继Kubernetes之后的第二个项目。


>Prometheus是一个开源的监控系统，它可以帮助用户监控各种不同类型的系统和应用程序。Prometheus采用的是pull模型，即它定期从目标系统中拉取指标数据并存储在本地数据库中。这些指标数据可以用于生成图表、警报和报告，以帮助用户了解他们系统的运作状况和性能表现。

>Prometheus通过多种数学算法能实现强大的监控需求，原生支持**K8S服务发现**，能**监控容器**的动态变化。并且结合Grafana能绘出漂亮图形，然后使用alertmanager或Grafana实现报警。它与其他监控相比有以下主要优势：
>
>-  1>数据格式是Key/Value形式，简单、速度快；采用多维数据模型(由指标名称和键/值维集定义的timeseries)

-  2>timeseries收集是通过HTTP上的拉取（pull mode）模型进行，通过中间网关支持timeseries的推送，通过服务发现或静态配置来发现目标，监控数据的精细程度可达到秒级（数据采集精度高情况下，对磁盘消耗大，存在性能瓶颈，且不支持集群，但可以通过联邦能力进行扩展）；，

- 3>不依赖分布式存储，数据直接保存在本地，单节点是自治的，可独立运行管理，可以不需要额外的数据库配置。但是如果对历史数据有较高要求，可以结合OpenTSDB；支持分层和水平联合。

- 4> 周边插件丰富，如果对监控要求不是特别严格的话，默认的几个成品插件已经足够使用；支持多种图形和仪表板。

- 5>本身基于数学计算模型，有大量的函数可用，可以实现很复杂的监控（故学习成本高，需要有一定数学思维，独有的数学命令行很难入门）；

- 6>可以嵌入很多开源工具的内部去进行监控，数据更可信。
- 7>使用PromQL，它是一种强大而灵活的查询语言，PromQL作为Prometheus强大的查询语言，可以灵活地处理监视数据。



>Prometheus最初是由SoundCloud开发的，现在已经成为了Cloud Native Computing Foundation（CNCF）旗下的一个项目。它有很多优点，包括易于安装和配置、支持动态发现、具有高可用性和灵活的查询语言等。此外，Prometheus集成了一个强大的警报系统，可以根据用户自定义的规则进行警报通知，并支持多种通知方式，如Email、Slack和PagerDuty等。

>在现代应用程序和微服务架构的时代，Prometheus已经成为了一个被广泛采用的监控解决方案。

【Prometheus的3大局限性】

> 1.**更多地展示的是趋势性的监控** 
> Prometheus作为一个基于度量的系统，不适合存储事件或者日志等，它更多地展示的是趋势性的监控。如果用户需要数据的精准性，可以考虑ELK或其他日志架构。另外，APM更适用于链路追踪的场景。
> 
> 2.**Prometheus本地存储不适合大量历史数据存储** 
> Prometheus认为只有最近的监控数据才有查询的需要，所有Prometheus本地存储的设计初衷只是保存短期（如一个月）的数据，不会针对大量的历史数据进行存储。如果需要历史数据，则建议使用Prometheus的远端存储，如OpenTSDB、M3DB等。
> 
> 
> **3.成熟度没有InfluxDB高**
>  Prometheus在集群上不论是采用联邦集群还是采用Improbable开源的Thanos等方案，都没有InfluxDB成熟度高，需要解决很多细节上的技术问题（如耗尽CPU、消耗机器资源等问题），部分互联网公司拥有海量业务，出于集群的原因会考虑对单机免费但是集群收费的InfluxDB进行自主研发。

总之，使用Prometheus一定要了解它的设计理念：它并不是为了解决大容量存储问题，TB级以上数据建议保存到远端TSDB中；它是为运行时正确的监控数据准备的，无法做到100%精准，存在由内核故障、刮擦故障等因素造成的微小误差。

>Prometheus它可使用联合模型（federation mode）进行扩展，该模型使得一个 Prometheus 服务器能够抓取另一个 Prometheus 服务器的数据。这允许创建分层拓扑，其中中央系统或更高级别的 Prometheus 服务器可以抓取已从下级实例收集的聚合数据。你可以将 Prometheus 作为后端，配置 Grafana 来提供数据可视化和仪表板功能。


**1.1 工作原理**
Prometheus直接从**目标主机**上运行的**代理程序**中抓取指标，并将收集的样本集中存储在自己服务器上（主要以拉模式为主）。也可以使用像 collectd_exporter 这样的插件**推送指标**，尽管这不是 Promethius 的默认行为，但在主机位于防火墙后面或位于安全策略禁止打开端口的某些环境中它可能很有用。另外，它可通过**HTTP协议**周期性抓取被监控组件的状态，任意组件只要提供对应的HTTP接口就可以接入监控。不需要任何SDK或者其他的集成过程。这样做**非常适合做虚拟化环境监控系统**，比如：<font color=red>VM、Docker、Kubernetes等</font>；它以给定的时间间隔从已配置的目标收集指标，评估规则表达式，显示结果，并在发现某些情况为真时触发警报。


**1.2 Prometheus的主要构成:**
1、服务端

Prometheus服务端以一个进程方式启动，如果不考虑参数和后台运行的话，只需要解压安装包之后运行==./prometheus脚本==即可启动，程序默认监听在9090端口。每次采集到的数据叫做metrics。这些采集到的数据会先存放在内存中，然后定期再写入硬盘，如果服务重新启动的话会将硬盘数据写回到内存中，所以对内存有一定消耗。Prometheus不需要重视历史数据，所以默认只会保留15天的数据。

2、客户端

Prometheus客户端分为pull和push两种方式。如果是pull形式的话则是服务端主动向客户端拉取数据，这样需要客户端上安装exporters（导出器）作为守护进程，官网上也提供了很多exporters可以下载使用，比如使用最多的node_exporters，几乎把系统自身相关数据全部采集了，非常全面，node_exporter默认监听9100端口。

如果是push形式的话客户端需要安装pushgateway插件，然后运需要运维人员用脚本把监控数据组织成键值形式提交给pushgateway，再由它提交给服务端。它适合于现有exporters无法满足需求时，自己灵活定制。

**1.3  prometheus 相关核心概念**

**a)、指标**

prometheus 所有的监控指标(Metric) 被统一定义为

```bash
<metric name >{
	<label name>=<label value>,
	 ...
	 }
```

指标名称: 说明指标的含义，例如 tcp_request_total 代表 tcp 的请求总数,指标名称必须由 字母、数值下画线或者冒号组成，符合正则表达式,如 [a-zA-Z:][a-zA-Z0-9:]*。标签(label) 则用于过滤和聚合；

**b)、数据采集**

prometheus 采用pull 方式采集监控数据，和采用push 方式采集监控数据不同，

push 方式: agent 主动上报数据，可以将采集的数据立即上报到监控中心，push 方式本地不会保存采集的数据，agent 本身是无状态的服务，master 需要维护各种agent 状态

pull 方式: master 主动拉取 agent 的数据，周期性采集，采集时间为30s 或者更长时间，
agent 本身需要一定的数据存储能力，master 只负责简单的数据拉取

**c)、数据处理**

prometheus 支持数据处理，主要包括 relabel 、replace、keep、drop

**d)、数据存储**

prometheus 支持本地存储和远程存储两种方式

**e)、数据查询**

prometheus 使用promQL 查询

**f)、告警**

prometheus 本身不会对报警进行处理、需要借助一个组件alertmanager ，prometheus 会配置alertmanager 地址，这样prometheus 发出的告警记录变可以发送到alertmanager 进行处理

**1.4 系统架构**

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161105856.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161105854.png)


### 2、Prometheus 部署
下载地址：[https://prometheus.io/download/](https://prometheus.io/download/)

#### 2.1 下载安装包（两种方式）
**2.1.1 直接在官网下载**

>访问下载官网：[https://prometheus.io/download/](https://prometheus.io/download/)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161105449.png)
选择版本，在哪部署选择哪个哪个，本文在linux上部署，所以，选择linux的tar包；

点击，等待下载完成，上传到服务器中；

**2.1.2 服务器上直接使用wget下载**

也是同样的先打开官网：找到自己要下载的版本；右击点击复制连接；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161105176.png)

在服务器上使用wget下载

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.44.0/prometheus-2.44.0.linux-amd64.tar.gz
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161105304.png)



等待下载完成之后，

#### 2.2 解压安装包并放到指定目录

```bash
#解压安装包
tar xf prometheus-2.44.0.linux-amd64.tar.gz

#移动到/usr/local/目录，并修改名字
mv prometheus-2.44.0.linux-amd64 /usr/local/prometheus
```
#### 2.3 修改 Prometheus 配置文件 

```bash
#进入Prometheus目录
cd /usr/local/prometheus/

#备份配置文件
cp -ar prometheus.yml prometheus.yml-bak

#修改配置文件
## 第六行添加
scrape_timeout: 10s
## 最后一行localhost改为本机的ip（其实不改也可以，为了分辨，建议修改）
 - targets: ["172.16.11.209:9090"]   
```
修改两处。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104372.png)
#### 2.4 配置系统启动文件，设置开机自启 （两种方式：推荐第一种）
**2.4.1 第一种：配置系统启动文件，启动并设置开机自启**

```bash
#进入这个文件，默认是没有的，直接进入就行
vim /usr/lib/systemd/system/prometheus.service 

#将下面的全部写进去
[Unit]
Description=Prometheus Server
Documentation=https://prometheus.io
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/prometheus/prometheus \
--config.file=/usr/local/prometheus/prometheus.yml \
--storage.tsdb.path=/usr/local/prometheus/data/ \
--storage.tsdb.retention=15d \
--web.enable-lifecycle

ExecReload=/bin/kill -HUP $MAINPID
Restart=on-failure 
[Install]
WantedBy=multi-user.target
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104696.png)

```bash
#启动
systemctl restart prometheus

#设置开机自启
systemctl enable prometheus

#查看端口是否启动9090
netstat -anput | grep 9090
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104268.png)
**2.4.2 第二种：进入解压目录，挂后台执行./prometheus**

```bash
#进入解压目录
cd /usr/local/prometheus

#挂后台执行./prometheus
./prometheus &

#查看端口是否启动
netstat -anput | grep 9090
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104436.png)

也是可以启动的，但是不好的是，不能设置开机自启，如果想要开机自启，还需要手动写一个启动服务器去执行他的命令或者周期性计划任务，所以不推荐使用方法二；<font color=red>**推荐使用第一种。**</font>

#### 2.5 页面访问

> ip:port
> 172.16.11.209:9090
> 浏览器访问：http://172.16.11.209:9090 ，访问到 Prometheus 的 Web UI 界面
点击页面的 Status -> Targets，如看到 Target 状态都为 UP，说明 Prometheus 能正常采集到数据
http://192.168.100.20:9090/metrics ，可以看到 Prometheus 采集到自己的指标数据

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104429.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104766.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104245.png)

点击graph可以查看折线图

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104331.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104972.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104066.png)

#### 2.6 服务端安装完成
>至此，Prometheus 服务端安装完成。

## 三、部署 Exporters（普罗米修斯客户端）
>Exporters 远程监控linux主机，也就是普罗米修斯客户端
>
### 1、Exporters 部署
在远程 linux 主机（客户端 agent）上安装 node_exporter 组件。
下载地址：[https://prometheus.io/download/](https://prometheus.io/download/)
#### 1.1 下载安装包（两种方式）

**1.1.1 直接在官网下载**

>访问下载官网：[https://prometheus.io/download/](https://prometheus.io/download/)

可以`ctrl+f`搜索`node_exporter`。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104399.png)

同样也是下载linux版本；点击，等待下载完成，上传到服务器中；

**1.1.2 服务器上直接使用wget下载**

也是同样的先打开官网：找到自己要下载的版本；右击点击复制连接；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104061.png)

在服务器上使用wget下载

```bash
wget https://github.com/prometheus/node_exporter/releases/download/v1.6.0/node_exporter-1.6.0.linux-amd64.tar.gz
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104963.png)

等待下载完成之后，

#### 1.2 解压安装包并放到指定目录

```bash
#解压安装包
tar xf node_exporter-1.6.0.linux-amd64.tar.gz

#移动到/usr/local/目录，并修改名字(名字可自行修改，只要记住这个文件夹是干什么的就行)
mv node_exporter-1.6.0.linux-amd64 /usr/local/prometheus_node
```
#### 1.3 配置系统启动文件，设置开机自启 （两种方式：推荐第一种）
**1.3.1 第一种：配置系统启动文件，启动并设置开机自启**

```bash
#进入这个文件，默认是没有的，直接进入就行
vim /usr/lib/systemd/system/node_exporter.service

#将下面的全部写进去
[Unit]
Description=node_exporter
Documentation=https://prometheus.io/
After=network.target
 
[Service]
Type=simple
ExecStart=/usr/local/prometheus_node/node_exporter \
--collector.ntp \
--collector.mountstats \
--collector.systemd \
--collector.tcpstat
 
ExecReload=/bin/kill -HUP $MAINPID
Restart=on-failure
 
[Install]
WantedBy=multi-user.target
```

```bash
#启动
systemctl restart node_exporter

#设置开机自启
systemctl enable node_exporter

#查看端口是否启动9100
netstat -anput | grep 9100
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104072.png)

**1.3.2 第二种：进入解压目录，挂后台执行./node_exporter**

```bash
#进入解压目录
cd /usr/local/prometheus_node

#挂后台执行./prometheus
./node_exporter &

#查看端口是否启动
netstat -anput | grep 9100
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104683.png)

也是可以启动的，但是不好的是，不能设置开机自启，如果想要开机自启，还需要手动写一个启动服务器去执行他的命令或者周期性计划任务，所以不推荐使用方法二；<font color=red>推荐使用第一种。</font>


#### 1.4 页面访问

> ip:port
> 172.16.11.220:9100

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104391.png)
点击`Metrics`可以查看node_exporter 在被监控端收集的监控信息：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161104749.png)

#### 1.5 客户端安装完成

### 2、修改Prometheus服务端的配置文件

>回到 Prometheus 服务端的配置文件里添加被监控机器的配置段

#### 2.1 添加客户端到服务端（分为添加单个客户端与多个客户端两部分）
**2.1.1 添加单个 客户端**

```bash
#进入prometheus的配置文件中
vim /usr/local/prometheus/prometheus.yml

#添加以下几行，到最后（格式和上面的服务端一样，因为yml文件格式要求严格，所以必须一样，否则启动会报错）
  - job_name: 'agent'
    static_configs:
      - targets: ['172.16.11.220:9100']
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161103805.png)

**2.1.2 添加多个 客户端（两种方式，暂无推荐，根据自己的需求选择）**

>给服务端也安装一个客户端，添加到服务端。

**添加方式一：使用多个命名来命名客户端的作用**

```bash
  - job_name: "agent1"
    static_configs:
      - targets: ["172.16.11.220:9100"]
  - job_name: "agent2"
    static_configs:
      - targets: ["172.16.11.209:9100"]
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161103395.png)


**添加方式二：使用单个命名来命名多个客户端的作用（两种方式，推荐使用方法二）**

**方法一：**
```bash
  - job_name: "node测试"
    static_configs:
      - targets: ["172.16.11.220:9100"]
      - targets: ["172.16.11.209:9100"]
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161103170.png)

**方法二：**
```bash
  - job_name: "node测试"
    static_configs:
      - targets: 
        - 172.16.11.220:9100
        - 172.16.11.209:9100
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161103482.png)

#### 2.2 重启服务端

```bash
systemctl restart prometheus
```
等待重启完成，刷新一下页面，如果还是没有可以清除一下缓存，试试。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161103177.png)

#### 2.3 服务端添加客户端完成

> <font color=red>注：服务端的服务器上也可以安装客户端，操作也是和安装客户端一样的哦！</font>

### 3、附加（服务端配置文件）
#### 3.1 监测 Prometheus配置文件是否正确

```bash
#进入prometheus目录
cd /usr/local/prometheus/

#执行promtool,监测配置是否正确
./promtool check config prometheus.yml
```
<font color=gree>正常状态返回：</font>

```bash
Checking prometheus.yml
 SUCCESS: prometheus.yml is valid prometheus config file syntax
```
<font color=red>失败状态返回：</font>

```bash
Checking prometheus.yml
  FAILED: parsing YAML file prometheus.yml: "172.16.11.209:9999/cs" is not a valid hostname
```
或其他错误，只有前面是<font color=red>FAILED:</font>都是有问题的，则 <font color=gree>SUCCESS:</font>就是没问题的。
#### 3.2 监测服务ip添加后缀

```bash
  - job_name: "cs"
    metrics_path: /liu/cy/
    static_configs:
      - targets: ['172.16.11.209:9999']
```

Prometheus页面显示：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161103980.png)

><font color=red>报错说明：</font>为什么会报错呢，当然，只是为了测试加后缀，随便写的，所以会报错，只是连接被拒绝，因为并没有这个服务。

### 4、实例：监控远程MySQL服务
在被客户端 agent上安装 mysqld_exporter 组件
下载地址：[https://prometheus.io/download/](https://prometheus.io/download/)

#### 4.1 下载安装包（两种方式）

**4.1.1 直接在官网下载**

>访问下载官网：[https://prometheus.io/download/](https://prometheus.io/download/)

可以`ctrl+f`搜索`mysqld_exporter`，选择要下载的版本。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161103302.png)


同样也是下载linux版本；点击，等待下载完成，上传到服务器中；

**4.1.2 服务器上直接使用wget下载**

也是同样的先打开官网：找到自己要下载的版本；右击点击复制连接；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161103646.png)


在服务器上使用wget下载

```bash
wget https://github.com/prometheus/mysqld_exporter/releases/download/v0.15.0-rc.0/mysqld_exporter-0.15.0-rc.0.linux-amd64.tar.gz
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161103020.png)


等待下载完成之后，

#### 4.2 解压安装包并放到指定目录

```bash
#解压安装包并放到/usr/local/下
tar xf mysqld_exporter-0.15.0-rc.0.linux-amd64.tar.gz -C /usr/local/

#进入/usr/local/下给重命名为：mysqld_exporter
mv mysqld_exporter-0.15.0-rc.0.linux-amd64/ mysqld_exporter
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161103467.png)

#### 4.3 安装mysql数据库，并授权 

**4.3.1 安装mysql数据库并进行用户授权**

- 第一种：新安装mariadb开始
```bash
#安装mariadb
yum install mariadb\* -y

#启动数据库
systemctl start mariadb
#设置开机自启
systemctl enable mariadb

#查看数据库是否启动（有进程则启动）
netstat -anput | grep 3306

#数据库初始化操作（设置密码）
mysql_secure_installation
```
提示：如果回车没有反应，先检查mariadb是否启动。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161103767.png)

```bash
#进入mysql数据库
mysql -uroot -p密码

#创建mysql_exporter用户并设置密码
create user 'mysql_exporter'@'localhost' identified by '123456';
#给mysql_exporter查询权限
grant select,replication client,process on *.* to 'mysql_exporter'@'localhost';
#刷新权限
flush privileges;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161103908.png)


- 第二种：已经有数据库的

```bash
#进入mysql数据库
mysql -uroot -p密码

#创建mysql_exporter用户并设置密码
create user 'mysql_exporter'@'localhost' identified by '123456';
#给mysql_exporter查询权限
grant select,replication client,process on *.* to 'mysql_exporter'@'localhost';
#刷新权限
flush privileges;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161103216.png)
#### 4.4 创建一个mysqld_exporter配置文件
>创建一个mysqld_exporter配置文件，写上连接的用户名和密码（和上面的授权的用户名和密码要对应）

```bash
vim /usr/local/mysqld_exporter/.my.cnf

[client]
user=mysql_exporter
password=123456
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161103317.png)

#### 4.5 配置系统启动文件，设置开机自启 （两种方式：推荐第二种）
**4.5.1 第一种：配置系统启动文件，启动并设置开机自启**

```bash
#进入这个文件，默认是没有的，直接进入就行
vim /usr/lib/systemd/system/mysqld_exporter.service 

#将下面的全部写进去
[Unit]
Description=mysqld_exporter
Documentation=https://prometheus.io/
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/mysqld_exporter/mysqld_exporter \
--collector.ntp \
--collector.mountstats \
--collector.systemd \
--collector.tcpstat

ExecReload=/bin/kill -HUP $MAINPID
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102788.png)


```bash
#启动
systemctl restart mysqld_exporter

#设置开机自启
systemctl enable mysqld_exporter

#查看端口是否启动9104
netstat -anput | grep 9104
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102589.png)

**4.5.2 第二种：进入解压目录，挂后台执行 mysqld_exporter**

```bash
#进入解压目录
cd /usr/local/mysqld_exporter

#挂后台执行 mysqld_exporter
nohup /usr/local/mysqld_exporter/mysqld_exporter --config.my-cnf=/usr/local/mysqld_exporter/.my.cnf &

#查看端口是否启动
netstat -anput | grep 9104
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102089.png)
#### 4.6 页面访问

> ip:port
> 172.16.11.220:9104

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102327.png)

>点击`Metrics`可以查看node_exporter 在被监控端收集的监控信息：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102763.png)


#### 4.7 客户端安装完成

#### 4.8 将 mysql 服务添加到服务端【修改Prometheus服务器的配置文件】
>回到 Prometheus 服务器的配置文件里添加被监控的 mariadb 的配置段

```bash
#进入prometheus的配置文件中
vim /usr/local/prometheus/prometheus.yml

#追加以下几行
  - job_name: "agetn-mysql"
    static_configs:
      - targets: ['172.16.11.220:9104']
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102085.png)
添加完之后，重启服务端

```bash
systemctl restart prometheus
```
等待重启完成，刷新一下页面，如果还是没有可以清除一下缓存，试试。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102149.png)

#### 4.9 添加成功！！！
## 四、部署 Grafana（可视化）
### 1、Grafana 简介
>Grafana 是一个开源的度量分析和可视化工具，可以通过将采集的数据分析，查询，然后进行可视化的展示，并能实现报警。

>Grafana是一个开源的数据可视化工具，它可以拉取各种不同的数据源并将它们呈现为漂亮而易于理解的图表。 Grafana可以用于监控和分析各种服务和应用程序的性能和状况，包括数据库、Web服务器、应用程序服务器等。Grafana具有可扩展性，可以支持许多不同的数据源和可视化库，例如Graphite、InfluxDB、Prometheus、Elasticsearch等。同时，Grafana还提供了丰富的插件和面板，帮助用户更好地理解和管理数据。

>随着公司业务的不断发展，紧接来的是业务种类的增加、服务器数量的增长、网络环境的越发复杂以及发布更加频繁，从而不可避免地带来了线上事故的增多，因此需要对服务器到应用的全方位监控，提前预警，急需一个工具来解决这个问题，而Grafana的出现完美的解决了这个问题。


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102013.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102656.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102059.png)

**主要特点**

1.grafana提供了快速灵活的可视化效果，可以让自己以任何想要的方式来可视化数据

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102774.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102500.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102009.png)

2.支持众多插件 ，使用Grafana插件可以连接自己的工具和团队，数据源插件通过 API 挂接到现有数据源中，实时呈现数据，**而无需迁移或引入数据**。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102491.png)

3.告警系统，可以在一个简单的UI中创建，管理所有警报从而轻松整合和集中所有警报。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102522.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161102194.png)




### 2、Grafana 部署
>下载地址：[Download Grafana | Grafana Labs](https://grafana.com/grafana/download)

#### 2.1 下载安装包

>官网下载地址：[Download Grafana | Grafana Labs](https://grafana.com/grafana/download)


可以选择版本和系统，我们这里就直接选择最新版：9.5.2

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101779.png)

下载推荐rpm包，点击一下，就会自动下载；或者复制一下，粘贴到服务器上也会下载。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101552.png)

等待下载完成...


如果是直接在服务器执行下载的，直接等待下载完成启动即可，如果是下载的rpm包，就需要上传到服务器上，然后使用`rpm -ivh grafana-enterprise-9.5.2-1.x86_64.rpm` 进行安装；

如果是使用的二进制离线包安装的，默认是没有系统启动配置文件的，所以我们需要加一个：
```bash
#进入这个文件，默认是没有的，直接进入就行
vim /usr/lib/systemd/system/grafana.service 

#将下面的全部写进去
[Unit]
Description=Grafana instance
After=network.target

[Service]
Type=simple
WorkingDirectory=/data/monitor/grafana/
ExecStart=/data/monitor/grafana/bin/grafana-server
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
#启动
systemctl restart grafana

#设置开机自启
systemctl enable grafana

#查看端口是否启动3000
netstat -anput | grep 3000
```

以上是二进制安装配置的系统启动文件，和启动`grafana`；

下面我们继续说使用rpm安装后启动`grafana`服务。
#### 2.2 启动 grafana 并设置开机自启

```bash
#启动grafana-server服务
systemctl start grafana-server

#设置开机自启
systemctl enable grafana-server

#查看端口（默认为3000）
netstat -natp | grep 3000
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101657.png)

#### 2.3 页面访问

> ip:port
> 172.16.11.209:3000 <br>
> <font color=red>注意：默认账号密码为：
> 账号：admin
> 密码：admin<br>
> grafana默认配置文件目录 /etc/grafana/grafana.ini</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101266.png)

**通过浏览器访问 http:// grafana 服务器 IP:3000 就到了登录界面，使用默认的 admin 用户，admin 密码就可以登陆了。**

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101791.png)

进来需要设置一个新密码

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101699.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101198.png)

#### 2.4 配置数据源
>下面我们把 Prometheus 服务器收集的数据做为一个数据源添加到 grafana，让 grafana 可以得到 Prometheus 的数据。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101742.png)

选择prometheus

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101482.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101461.png)

点击保存测试

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101526.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101505.png)

#### 2.5 导入模板

可以看到我们刚刚创建的

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101238.png)

点进去，选择：Dashboards-->从中选择任意一个模板，这里我选择第二个，点击import。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101273.png)

安装完成；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101175.png)

然后点击名称，进入可以查看模板；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101680.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101528.png)

>这里已经可以看到了，但是他只是个模板，不能展示出来，接下来，我们将自己做数据源将数据展示出来。

#### 2.6 为数据源做自定义数据展示 

点击右上角加号，再点击创建新的仪表板

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101654.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101582.png)

<a id="click_me_jump">选择刚刚添加的监控项</a>


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101422.png)


选择load1、load5、load15；一分钟、五分钟、十五分钟负载

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101784.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161101168.png)

这里写了三个条件

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161100502.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161100237.png)

点击保存

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161100291.png)

 自定义名称、点击保存；

最后在dashboard可以查看到 。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161100262.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161100976.png)

拉住想要看的这个模块右下角，可以放大；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161100451.png)

还可以点击查看，再次点击一下就恢复到默认所有；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161100555.png)

> 注：有多条数据的时候，可以在查询的键值后面加个大括号，括号里的条件表示只匹配当前的监控项。 



点击dashboard可以查看到 ；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161100640.png)



这是自定义的监控模块（监控的服务端的1、5、15分钟的平均负载），一个一个添加比较麻烦，我们可以去找一些模板；

#### 2.7 导入grafana监控面板 

>这里我们使用现成的模板导入即可，GitHub上面很多人开发了dashboards模板，官方社区上也有很多开源的dashboards模板，我们只需要把模板的`Copy ID` 或者 `Download JSON`文件导入到grafana即可，参考[官网免费的dashboards模板](https://grafana.com/grafana/dashboards/)。<br>
>官方模板地址：[https://grafana.com/grafana/dashboards/](https://grafana.com/grafana/dashboards/)


进入官网，往下拉，可以看到选择这几个，`Data Source` 选择`Prometheus`，然后搜索主机监控，或者自己定义，搜索，linux什么的都可以，根据自己的需求选择；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161053258.png)

找到心仪的模板之后点进去，可以看到右边有`Copy ID` 和 `Download JSON`，自行选择就行；这里我选择复制id，json需要下载；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161053421.png)

>复制好id之后，打开在 grafana 页面中，+ Create -> Import ，输入面板 ID 号或者上传 JSON 文件，点击 Load，即可导入监控面板

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052975.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052500.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052544.png)

完成，页面显示就是这样的了。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052595.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052247.png)

需要查看其他模板的话，可以点击最上面的中间的搜索；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052796.png)



#### 2.8 为已有的监控面板添加自定义监控模块展示

首先，打开已添加的模板；点击add-->visualization

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052992.png)

然后再次添加即可，添加方式和上面的一样；点击跳转到上面： [2.6 为数据源做自定义数据展示](#click_me_jump)



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052553.png)

这里可以选择形状图；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052333.png)


最后的展示

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052056.png)
#### 2.9 修改已有的模块数据

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052413.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052149.png)



### 3、实例：Grafana 图形显示 MySQL 监控数据

>**在 grafana 上修改配置文件,并下载安装 mysql 监控的 dashboard（包含相关 json 文件，这些 json 文件可以看作是开发人员开发的一个监控模板）。**

#### 3.1 修改 grafana.ini 配置文件
```bash
#进入grafana配置文件
vim /etc/grafana/grafana.ini  

#追加到最后
[dashboards.json]
enabled = true
path = /var/lib/grafana/dashboards
```
#### 3.2 克隆 dashboards 到 /var/lib/grafana/

```bash
#前提需要安装git
git clone https://github.com/percona/grafana-dashboards.git
```
如果服务器上没有`git`服务，可以访问：[https://github.com/percona/grafana-dashboards](https://github.com/percona/grafana-dashboards)
直接下载，下载完之后上传服务器解压，放到/var/lib/grafana/目录即可，git下来的与下载的zip解压下来的是一样的。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052660.png)

**将克隆的 grafana-dashboards/下的dashboards 放到 /var/lib/grafana/ 目录**

```bash
#将dashboards复制到/var/lib/grafana下
cp -ar grafana-dashboards/dashboards/ /var/lib/grafana/
#重启grafana服务端
systemctl restart grafana-server.service
#查看端口号是否启动
netstat -anput | grep 3000
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052691.png)

#### 3.3 在grafana图形化界面导入相关的json文件

将 <font color=grepp>/var/lib/grafana/dashboards/MySQL/MySQL_Instances_Overview.json </font>文件下载到本地；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052662.png)

**访问grafana页面，导入json文件**

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161052045.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161051549.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161051113.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161051841.png)

### 4、Grafana + onealert 实现服务告警

Prometheus 告警需要使用 alertmanager 这个组件，而且告警规则需要手动编写（对运维来说很不友好）。所以我这里选用 grafana+onealert 告警。注意：实现告警前需要把所有机器时间同步再检查一遍。

**登陆 [https://www.aiops.com/](https://www.aiops.com/)→注册帐户→登入后台管理**

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161051063.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161051444.png)

会有一个邮箱认证，认证一下就可以了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161051093.png)

登录上来之后，点击左侧的 智能告警平台

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161051894.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161051228.png)

然后点击下面的加号，进入编辑页面；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161051215.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161051860.png)

获取key值

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161051135.png)


下面也有配置步骤，可根据自己的版本来查看；

#### 4.1 在Grafana中配置Webhook URL

#### 4.2 填写应用名称，点击保存生成AppKey（上面已经生成）

#### 4.3 创建 contact points

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161051751.png)

URL填写名称，选择 contact points type为webhook,填写<font color=red>url:http://api.aiops.com/alert/api/event/grafana/v1/`{appKey}`/</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161051612.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161051916.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161050465.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161050032.png)

>contact points 创建完成！！！
#### 4.4 创建 Notification policies

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161050522.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161050958.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161050303.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161050761.png)

>Notification policies 创建完成！！！

#### 4.5  配置Alert rules


>Alert rules 配置完成！！！ 




































