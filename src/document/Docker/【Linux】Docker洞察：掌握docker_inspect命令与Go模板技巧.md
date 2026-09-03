---
title: 【Linux】Docker洞察：掌握docker_inspect命令与Go模板技巧
icon: circle-info
order: 1
category:
  - Linux
  - Docker
tag:
   - Linux
   - Docker
date: 2025-08-27
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


![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202509011604843.jpeg)



## 0️⃣ 前言

###  ① `docker inspect` 是做什么的？
> &emsp; &emsp;答：`docker inspect` 是用来查看容器/镜像/卷/网络等详细 JSON 配置的命令，比如可以查找容器的映射路径、端口、网络模式、重启模式等等；  

* `docker inspect` 参数：

| 参数             | 说明               | 示例                                                         |
| -------------- | ---------------- | ---------------------------------------------------------- |
| `-f, --format` | 用 **Go模板** 格式化输出 | `docker inspect -f '{{.NetworkSettings.IPAddress}}' nginx` |
| `--type`       | 指定对象类型（避免歧义）     | `docker inspect --type=image nginx`                        |
| `-s, --size`   | 显示容器总文件大小（仅容器）   | `docker inspect -s my_container`                           |

> 常用参数：`-f`（或 `--format`）是 Go template 的格式化参数，允许你**只提取需要的字段**，避免在一大坨 JSON 里人肉搜索，非常好用。

### ② 为什么要用 Go template ？

`docker inspect ` 输出的是整坨 JSON（几百行，看着比较繁琐），而我们只想拿其中的 1~2 个字段。
* 如果每次都用 `jq`/`grep`/`awk`，脚本里要多装一个二进制，还是比较麻烦的；
* `Go template` 直接内建在 Docker CLI 里，**零依赖**、**跨平台**、**一条命令**搞定。


<center> <font size=5> 本期我们主要讲解 docker inspect -f 的使用。 </font> </center>

---

## 1️⃣ 基本语法

```bash
docker inspect -f '<Go模板>' <对象>
```

- `<对象>` 可以是：容器名、容器 ID、镜像名/ID、卷名、网络名等等，常用的就是容器名或容器id。
- `<Go模板>` 用 **Go text/template** 语法，字段路径以 **点号** 分隔。

---

那么问题来了，我要怎么知道自己想要的数据是要用哪个`Go语法`呢？接下来我们讲解`json`如何翻译成`go`语法。

## 2️⃣ JSON → Go template 翻译法

### 📌 原始 JSON（随便选了几个参数作为参考）

```json
[
    {
        "Id": "59c88ce44ce023f......",
        "Created": "2025-07-22T03:15:24.968351115Z",
        "Path": "bash",
        "Args": [],
        "State": {
            "Status": "running",
            "Pid": 16698,
            "StartedAt": "2025-07-22T03:15:26.473607152Z",
        },
    "Name": "/my_nginx",
    "HostConfig": {
            "Binds": [
                "/home/lcy/nginx/conf/:/usr/local/nginx/conf/",
                "/home/lcy/nginx/html/:/application/nginx/html/",
                "/home/lcy/nginx/logs/:/application/nginx/logs/",
                "/etc/localtime:/etc/localtime/"
            ],
    "NetworkSettings": {
      "IPAddress": "172.17.0.2"
    },
    "Mounts": [
      {
        "Type": "bind",
        "Source": "/home/lcy/nginx/conf/",
        "Destination": "/usr/local/nginx/conf/"
      }
      {
        "Type": "bind",
        "Source": "/home/lcy/nginx/logs/",
        "Destination": "/usr/local/nginx/logs/"
      }
    ],
    "Config": {
      "Env": ["PATH=/usr/bin", "FOO=bar"]
    }
  }
]
```

### ✅ 基础：嵌套对象用点号
我们看json其实就类似与键值对那种，比如`"Id": "59c88ce44ce023f......"`，我们就可以找到键`Id`，然后给他转成Go模板的时候就可以变成`{{.Id}}`，这样`docker inspect -f '{{.Id}}' nginx`的时候就可以输出`Id`的值了。
> 拆分`{{.Id}}`解析：以`.`作为分割，`Id`为要查找内容的键，加上`{{}}`，`{{ }}` 是 Go 模板语法里的“占位符”，告诉 Docker：“把这里换成真正的值”。

如果是如下多行json嵌套内容：
```bash
    "NetworkSettings": {
      "IPAddress": "172.17.0.2"
    },
```
那这样就变成了两层，也就是说要把这两个键都输入才能查到，如果只输入最外面这层的键是拿不到数据的：`{{.NetworkSettings.IPAddress}}`，如果是三层或者四层，以此类推就行，具体可查看如下[JSON → Go 模板 的映射规则](#json)。
* <span id=“json”>JSON → Go 模板 的映射规则</span>

#### 

| JSON 片段                                                    | 模板写法                                         | 说明 / 口诀               |
| ------------------------------------------------------------ | ------------------------------------------------ | ------------------- |
| `"Name": "/my_c"`                                            | `{{.Name}}`                                      | 顶层字段直接写      |
| `"State": {"Status": "running"}`                             | `{{.State.Status}}`                              | 嵌套对象用点号      |
| `"NetworkSettings": {"Networks": {"bridge": {"IPAddress": "172.."}}}` | `{{.NetworkSettings.Networks.bridge.IPAddress}}` | 多级嵌套一路点下去      |
| `"Env": ["PATH=...", "FOO=bar"]`                             | `{{index .Env 1}}`                               | 数组/切片用 `index` |
|`"Mounts": [{ "Source": "/home/...}{ "Source": "/home/...}]`|`{{range .Mounts}}{{.Source}}{{end}}` | 遍历 map/array用`range`|
|`"Mounts": [{...}]` |`{{json .Config.Labels}}`|输出原始 JSON 字符串用`json`|
| `"HostConfig": { "Binds": [ "/home...:/usr/..."]`|`{{join .HostConfig.Binds " "}}` |拼接数组用`join “ ”`|
|`无`|`{{printf "%.2fMB" .SizeRw}}`|格式化`printf`|
|`"Name": "/nginx"`|  `{{lower .Name}}`<br>`{{upper .Name}}` | 转小写`lower` <br>转大写 `upper`|

---

以下为简单的几种转换：

| JSON                                               | Go template                      |说明|
| -------------------------------------------------- | -------------------------------- |-------------------------------- |
|`"Id": "59c88ce44ce023f......"`|`{{.Id}}`| 容器ID
|`"Created": "2025-07-22T03:15:24.968351115Z"`|`{{.Created}}`|容器创建时间
| `"State": { "Status": "running" }`                 | `{{.State.Status}}`              |容器运行状态
| `"NetworkSettings": { "IPAddress": "172.17.0.2" }` | `{{.NetworkSettings.IPAddress}}` |查看容器ip地址


### ✅ 进阶：数组 / map[键值对集合] 用 `index` 或 `range`

|数组/map| JSON                             | Go template                                 |说明|
|--| -------------------------------- | ------------------------------------------- |----------------------------------- |
|`数组`| `"HostConfig": { "Binds": [ "/home...:/usr/..."]`|列出所有：`{{.HostConfig.Binds}}`<br> 取第一个值：`{{index .HostConfig.Binds 0}}` | 查看容器映射路径
|`数组`| `"Env": ["PATH=...", "FOO=bar"]` |  取第一个值：`{{index .Config.Env 0}}`        |查看容器环境变量配置|
|`map`| `"Mounts": [{...}]`              | 遍历：`{{range .Mounts}}{{.Source}}{{end}}` |遍历多组挂载路径|

### ✅ 高级：辅助函数

| 函数 |JSON|  Go template    | 说明 |
|---|---|---|---|
| `json` |`"Mounts": [{...}]`    |`{{json .Mounts}}` | 输出原始 JSON 字符串 |
| `join`<Go模板> `"拼接内容" `|  `"HostConfig": { "Binds": [ "/home...:/usr/..."]`|`{{join .HostConfig.Binds " "}}` | 用空格拼接数组 |
| `lower` / `upper` |`"Name": "/nginx"`| `{{lower .Name}}`<br>`{{upper .Name}}` | 转小写 <br>转大写|
| `printf` |`无`| `{{printf "%.2f" .SizeRw}}` | 格式化数字 |

### ✅ 最终：组合成命令

```bash
############################ 基础 ############################
# 查看容器id
docker inspect -f '{{.Id}}' nginx
# 查看容器创建时间
docker inspect -f '{{.Created}}' nginx
# 查看运行状态
docker inspect -f '{{.State.Status}}' nginx

############################ 进阶 ############################
# 查看创建容器的映射路径
docker inspect -f '{{.HostConfig.Binds}}' nginx
# 查看创建容器的映射路径（只查看第一行）
docker inspect -f '{{index .HostConfig.Binds 0}}' nginx
# 查看容器的环境变量
docker inspect -f '{{index .Config.Env 0}}' nginx
# 遍历多组挂载路径
docker inspect -f '{{range .Mounts}}{{.Source}}{{end}}' nginx

############################ 高级 ############################
# 查看容器的挂载路径，以json格式输出
docker inspect -f '{{json .Mounts}}' nginx
# 用空格拼接挂载目录
docker inspect -f '{{join .HostConfig.Binds " "}}' nginx
# 切换容器名为小写
docker inspect -f '{{lower .Name}}' nginx
# 切换容器名为大写
docker inspect -f '{{upper .Name}}' nginx
# 格式化数字输出
docker inspect -f '{{printf "%.2f" .SizeRw}}' nginx
```

---
## 3️⃣ 常用速查表
> 使用命令嵌套使用，覆盖99%常用参数。
```bash
docker inspect -f '<Go template>' 容器名
```

| 需求                 | Go template                                                  |
| :-------------------- | :------------------------------------------------------------ |
| 容器 ID              | `{{.Id}}`                                                    |
| 容器名               | `{{.Name}}`                                                  |
|容器启动命令|`{{.Path}} {{join .Args " "}}`|
| 容器创建时间|`{{.Created}}`|
| 状态                 | `{{.State.Status}}`                                          |
| 主进程 PID           | `{{.State.Pid}}`                                             |
| 容器是否因内存不足被杀死|  `{{.State.OOMKilled}}`|
| 容器运行时的错误信息|`{{.State.Error}}` |
|容器启动时间|`{{.State.StartedAt}}`|
|容器结束时间|`{{.State.FinishedAt}}`|
|宿主机和容器之间的挂载路径|`{{.HostConfig.Binds}}`|
|容器网络模式|`{{.HostConfig.NetworkMode}}`|
|容器的重启策略|`{{.HostConfig.RestartPolicy.Name}}`|
|容器内的工作目录|`{{.GraphDriver.Data.MergedDir}}`|
| 所有挂载源路径       | `{{range .Mounts}}{{.Source}} {{end}}`                       |
|容器的主机名|`{{.Config.Hostname}}`|
|容器的环境变量|`{{.Config.Env}}`<br>`{{index .Config.Env 0}}`|
|容器使用的镜像名称|`{{.Config.Image}}`|
|容器默认的工作路径|`{{.Config.WorkingDir}}`|
| 容器端口映射 | `{{range $p,$c := .NetworkSettings.Ports}}{{$p}}->{{(index $c 0).HostPort}}{{end}}` <br>`{{.NetworkSettings.Ports}}`|
|容器 网关 地址|`{{.NetworkSettings.Gateway}}`<br>`{{range .NetworkSettings.Networks}}{{.Gateway}}{{end}}`|
| 容器 IP 地址              | `{{.NetworkSettings.IPAddress}}` <br>`{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}`  |
|容器 mac 地址|`{{.NetworkSettings.MacAddress}}`<br>`{{range .NetworkSettings.Networks}}{{.MacAddress}}{{end}}`|


* 更多简便的查询命令（[过滤]，相对与使用如上命令简单点）：

|需求| 命令 |
|:--|:--|
|查看容器：使用镜像、运行时长、容器名、<br>启动命令、容器ID、运行状态、端口映射|`docker ps -a \| grep 容器名`|
|查看容器的创建时间|`docker inspect 容器名 \| grep -i created`|
|查看容器是否因内存不足被杀死|`docker inspect 容器名 \| grep -i OOMKilled`|
|查看容器启动时间	|`docker inspect 容器名 \| grep -i StartedAt`|
|查看容器结束时间	|`docker inspect 容器名 \| grep -i FinishedAt`|
|查看容器的网络模式|`docker inspect 容器名 \| grep -i NetworkMode`|
|查看容器内的工作目录|`docker inspect  容器名 \| grep -i MergedDir`|
|查看容器外映射路径|`docker inspect 容器名 \| grep -i source`|
|查看容器的主机名|`docker inspect 容器名 \| grep -i hostname`|
|查看进入容器默认工作路径 | `docker inspect 容器名 \| grep -i WorkingDir`|
|查看容器的 IP|`docker inspect 容器名 \| grep -i ipaddress`|
|查看容器的 mac 地址|`docker inspect 容器名 \| grep -i macaddress`|
|查看容器的 网关 地址|`docker inspect 容器名 \| grep -i gateway`|




## 4️⃣ 口诀速记

> 嵌套一路点到底，数组切片 `index`，map 切片 `range`，数组或map过多用`join`连接，模板单引号包起来。






