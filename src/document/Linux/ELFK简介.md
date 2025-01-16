---
title: ELFK简介
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - ELFK
  - 运维
pageview: false
date: 2024-12-19
comment: false
breadcrumb: false
---

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


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191550275.jpeg)


## 前言



> &emsp;&emsp;当运维在平时工作的时候如果服务出现问题，我们一般都会查看日志去解决问题，而且有的服务不止一个日志，就需要不停的查看不同的日志，比较繁琐，而且还容易混乱思路。所以，这时候我们就需要一个可以统一收集服务的日志信息的一个应用，来缓解运维解决问题的复杂性和排查速度性。<br>
>
> &emsp;&emsp;接下来讲解的就是一个可以统一收集日志系统并可以可视化展示的服务 <font color=red>ELK </font>；





## 一、ELK 概述

### 1. ELK 诞生的背景

#### 1.1 没有ELK分析日志前

>*没有日志分析工具之前，运维工作存在哪些痛点？
>痛点1、生产出现故障后，运维需要不停的查看各种不同的日志进行分析？是不是毫无头绪？
>痛点2、项目上线出现错误，如何快速定位问题？如果后端节点过多、日志分散怎么办？
>痛点3、开发人员需要实时查看日志但又不想给服务器的登陆权限，怎么办？难道每天帮开发取日志？
>痛点4、如何在海量的日志中快速的提取我们想要的数据？比如：PV、UV、TOP10的URL？如果分析的日志数据量大，那么势必会导致查询速度慢、难度增大，最终则会导致我们无法快速的获取到想要的指标。
>痛点5、CDN公司需要不停的分析日志，那分析什么？主要分析命中率，为什么？因为我们给用户承诺的命中率是90%以上。如果没有达到90%，我们就要去分析数据为什么没有被命中、为什么没有被缓存下来。*

#### 1.2 使用ELK分析日志后

> *如上所有的痛点都可以使用日志分析系统ELK解决，通过ELK，将运维所有的服务器日志，业务系统日志都收集到一个平台下，然后提取想要的内容，比如错误信息，警告信息等，当过滤到这种信息，就马上告警，告警后，运维人员就能马上定位是哪台机器、哪个业务系统出现了问题，出现了什么问题。*



### 2. ELK 简介

> &emsp;&emsp;ELK 是一套完整的日志集中处理的技术组合，它是将`ElasticSearch`、`Logstash`、`Kilbana`三个开源的工具去配合构建的一个平台，可以完成更强大的<font color=gree>用户对日志的查询、排序、统计需求。</font>

> &emsp;&emsp;可以将我们的系统日志、网站日志、应用系统日志等各种日志进行收集、过滤、清洗，然后进行集中存放并可用于实时检索、分析；能够帮助我们更好地<font color=gree>理解数据、监控系统性能并进行故障排除。</font>

ELK官网：[https://www.elastic.co/cn/](https://www.elastic.co/cn/)



### 3. ELK的基础组件和扩展组件

> 基础组件：Elasticsearch、Logstash、Kibana<br>
> 扩展组件：Filebeat、Fluentd



ELK 分别代表：

- E: elasticsearch 数据存储、数据搜索；

  官网下载地址：[https://www.elastic.co/cn/downloads/elasticsearch/](https://www.elastic.co/cn/downloads/elasticsearch/)

- L: logstash 数据采集、数据清洗、数据过滤；

  官网下载地址：[https://www.elastic.co/cn/downloads/logstash](https://www.elastic.co/cn/downloads/logstash)

- K: kibana 数据分析、数据展示；

  官网下载地址：[https://www.elastic.co/cn/downloads/kibana/](https://www.elastic.co/cn/downloads/kibana/)
  
- F：filebeat 收集日志数据；

  官网下载地址：[https://www.elastic.co/guide/en/beats/filebeat/index.html](https://www.elastic.co/guide/en/beats/filebeat/index.html)





#### 3.1 Elasticsearch

`Elasticsearch`：基于 `Lucene` 搜索引擎库构建，具有<font color=orange>分布式搜索、实时数据分析、高性能和高可伸缩性</font>的特点，提供了非常强大的搜索和分析引擎。

`Elasticsearch`：是一个实时的、分布式的可扩展的搜索引擎；允许进行全文、结构化搜索，它通常用于索引和搜索大容量的日志数据，也可用于搜索许多不同类型的文档。

`Elasticsearch`：可以存储和索引大规模的数据(比如日志），并提供快速的<font color=skyblue>全文搜索、条件过滤、聚合和分析功能</font>。

#### 3.2 Logstash

<font color=red> Logstash：实现了数据的收集和处理。</font>是一个可扩展的<font color=skyblue>数据收集、转换和传输工具</font>。

它可以从各种来源（如日志文件、消息队列、数据库等）收集数据，并将数据进行过滤、分析、丰富、转换为统一格式，然后发送到 `Elasticsearch` 进行存储和分析。

`Logstash` ：具有强大的插件功能，常用于日志处理。最常用的就是`输入插件`和`输出插件`，可以与各种数据源和目标进行集成；也有很强大的过滤功能，可以对数据<font color=skyblue>进行处理、过滤及转换</font>，以满足不同业务的需求。

`Logstash` ：是由 `Ruby` 语言编写，运行在 Java 虚拟机（JVM）上，是一款强大的数据处理工具， 可以实现数据传输、格式处理、格式化输出。

`Logstash`：是作为ELK流程中的第一个组件 - 主要用于收集数据、过滤重要数据。



* [x] Logstash 常用的命令：

```bash

-f：通过这个选项可以指定 Logstash 的配置文件，根据配置文件配置 Logstash 的输入、输出流

-e：从命令行中获取，输入、输出后面跟着字符串，该字符串可以被当作 Logstash 的配置（如果是空，则默认使用 stdin 作为输入，stdout 作为输出）

-t：测试配置文件是否正确，然后退出。
```



* [x] Logstash 的输入、输出流流程：



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191550269.png)

- **input：** 设置数据来源。
- **filter：** 数据处理层，可以对数据进行格式化处理、数据类型转换、数据过滤等，支持正则表达式。
- **output：** 设置输出目标，如`Elasticsearch`等；将过滤后的数据输出到`Elasticsearch`中。



#### 3.3 Kibana



<font color=red>Kibana 提供了可视化和交互式分析的界面，可通过基于浏览器的界面轻松搜索需要的数据并进行分析。</font>

`Kibana` 是一个针对`Elasticsearch`的开源<font color=gree>数据分析及可视化平台</font>，用来搜索、查看交互存储在Elasticsearch索引中的数据。

使用`Kibana`，可以通过各种图表进行高级数据分析及展示，创建自定义仪表盘来<font color=gree>展示关键指标和监控警报</font>。

`Kiabana`通常与`ElasticSearch`一起部署，Kibana 是 Elasticsearch 的一个功能强大的数据可视化Dashboard，Kibana 提供图形化的 web 界面来浏览 Elasticsearch 日志数据，可以用来汇总、分析和搜索重要数据。

* 配置简单：

`Kibana`的配置和启用非常简单，用户体验非常友好。Kibana自带Web服务器，可以快速启动运行。



* 整合数据：

`Kibana`能够更好地处理海量数据，并据此创建柱形图、折线图、散点图、直方图、饼图和地图。



* 可视化多数据源：

`Kibana`可以非常方便地把来自Logstash、Filebeat、ES-Hadoop、Beats或第三方技术的数据整合到Elasticsearch，支持的第三方技术包括Apache flume、 Fluentd 等。



* 简单数据导出： 

`Kibana`可以方便地导出感兴趣的数据及重要的数据，与其它数据集合并融合后快速建模分析，发现新结果。





#### 3.4 Filebeat

<font color=red>Filebeat 是一款轻量级的开源日志数据收集器。</font>

通常在需要<font color=blue>采集数据的客户端安装 Filebeat</font>，并指定目录与日志格式，`Filebeat` 就能快速收集数据，并发送给 `logstash` 进行解析，或是直接发给 Elasticsearch 存储。

性能上相比运行于 JVM 上的 logstash 优势明显，是对它的替代。常应用于` EFLK 架构`当中。



* `filebeat` 结合 `logstash` 的优点：

①、通过 Logstash 具有基于磁盘的自适应缓冲系统，该系统将吸收传入的吞吐量，从而减轻 Elasticsearch 持续写入数据的压力；

②、从其他数据源（例如数据库，S3对象存储或消息传递队列）中提取；

③、将数据发送到多个目的地，例如S3，HDFS（Hadoop分布式文件系统）或写入文件；

④、使用条件数据流逻辑组成更复杂的处理管道。



#### 3.5 缓存/消息队列（redis、kafka、RabbitMQ等）


可以对高并发日志数据进行<font color=orange>流量削峰和缓冲</font>，这样的缓冲可以一定程度的保护数据不丢失，还可以对整个架构进行应用解耦。

#### 3.6 Fluentd

`Fluentd`是一个流行的开源数据收集器。

由于 `logstash `太重量级的缺点，Logstash 性能低、资源消耗比较多等问题，随后就有 Fluentd 的出现。

相比较 logstash，Fluentd <font color=gree>更易用、资源消耗更少、性能更高</font>，在数据处理上更高效可靠，受到企业欢迎，成为 logstash 的一种替代方案，常应用于` EFK` 架构当中。在 Kubernetes 集群中也常使用 EFK 作为日志数据收集的方案。
在 Kubernetes 集群中一般是通过 DaemonSet 来运行 Fluentd，以便它在每个 Kubernetes 工作节点上都可以运行一个 Pod。 它通过获取容器日志文件、过滤和转换日志数据，然后将数据传递到 Elasticsearch 集群，在该集群中对其进行索引和存储。



### 4. ELK的用处

（1）日志主要包括系统日志，应用程序日志和安全日志。系统运维和开发人员可以通过日志了解服务器软硬件信息、检查配置过程中的错误及错误发生的原因。经常分析日志可以了解服务器的负荷，性能安全性，从而及时采取措施纠正错误；
（2）往往单台机器的日志我们使用`grep、awk`等工具就能基本实现简单的分析，但是当日志被分散在不同的设备或位置上储存，那么就大大的降低了排查问题的效率了。如果你管理数十上百台服务器，你还在使用依次登录每台机器的传统方法查阅日志。这样感觉很繁琐和效率低下；
（3）当务之急我们使用集中化的日志管理，例如∶开源的syslog，将所有服务器上的日志收集汇总。集中化管理日志后，日志的统计和检索又成为一件比较麻烦的事情，一般我们使用`grep、awk和wc`等Linux命令能实现检索和统计，但是对于要求更高的查询、排序和统计等要求和庞大的机器数量依然使用这样的方法难免有点力不从心；
（4）一般大型系统是一个分布式部署的架构，不同的服务模块部署在不同的服务器上，问题出现时，大部分情况需要根据问题暴露的关键信息，定位到具体的服务器和服务模块，构建一套集中式日志系统，可以提高定位问题的效率及解决的问题的效率。





### 5. ELK 基础架构/工作原理

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191550556.jpeg)



①、在所有需要收集日志的服务器上部署`Logstash`，或者先将日志进行集中化管理在日志服务器上，在日志服务器上部署 Logstash；当然日志集中管理也是个大工程，看自己的意愿吧。

②、`Logstash` 收集日志，将日志格式化并输出到 `Elasticsearch` 群集中。

③、`Elasticsearch `对格式化后的数据进行索引和存储。

④、`Kibana` 从 ES 群集中查询数据生成图表，并进行前端数据的展示。



综上所述：

<font color=red>logstash作为日志搜集器，从数据源采集数据，并对数据进行过滤，格式化处理，然后交由Elasticsearch存储，kibana在对日志进行可视化处理。</font>



---





![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191550130.png)



以上截图是多台服务进行的数据采集、过滤然后给到`Elasticsearch` 进行集中数据存储，最后`Kibana`在进行数据读取并分析、展示。





## 二、参考文献



| 文章标题                                                     | 文章地址                                                     |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [EFK日志收集系统概述](https://blog.csdn.net/qq_42267081/article/details/112938762) | [https://blog.csdn.net/qq_42267081/article/details/112938762](https://blog.csdn.net/qq_42267081/article/details/112938762) |
| [ELK日志分析系统的详细介绍与部署](https://blog.csdn.net/m0_74170357/article/details/133873054) | [https://blog.csdn.net/m0_74170357/article/details/133873054](https://blog.csdn.net/m0_74170357/article/details/133873054) |




## 三、相关文章



| 文章名称 | 文章链接 |
| :------: | :------: |
|    [ELFK简介](https://liucy.blog.csdn.net/article/details/139653744)   |        [https://liucy.blog.csdn.net/article/details/139653744](https://liucy.blog.csdn.net/article/details/139653744)     |
|     [ELFK 8.12.2 单机部署 -- docker部署方式⚽](https://liucy.blog.csdn.net/article/details/139761024)     |       [https://liucy.blog.csdn.net/article/details/139761024](https://liucy.blog.csdn.net/article/details/139761024)   |




