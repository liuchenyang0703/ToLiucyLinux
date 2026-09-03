---
title: 网络常见面试题
icon: circle-info
order: 1
category:
  - 面试题
tag:
  - 网络常见面试题
  - 运维
date: 2026-02-07
isOriginal: true
pageview: true
article: false
breadcrumb: false
comment: true
---

## 1、TCP的三次握手与四次挥手
TCP的三次握手和四次挥手实质就是TCP通信的连接和断开。

三次握手：为了对每次发送的数据量进行跟踪与协商，确保数据段的发送和接收同步，根据所接收到的数据量而确认数据发送、接收完毕后何时撤消联系，并建立虚连接。

四次挥手：即终止TCP连接，就是指断开一个TCP连接时，需要客户端和服务端总共发送4个包以确认连接的断开。



![TCP三次握手、四次挥手时序图](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260218223922185.png)

**三次握手**

TCP协议位于传输层，作用是提供可靠的字节流服务，为了准确无误地将数据送达目的地，TCP协议采纳三次握手策略。

**三次握手原理：**

第1次握手：客户端发送一个带有SYN（synchronize）标志的数据包给服务端；

第2次握手：服务端接收成功后，回传一个带有SYN/ACK标志的数据包传递确认信息，表示我收到了；

第3次握手：客户端再回传一个带有ACK标志的数据包，表示我知道了，握手结束。

其中：SYN标志位数置1，表示建立TCP连接；ACK标志表示验证字段。

可通过以下趣味图解理解三次握手：

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260218224210541.png)

**三次握手过程详细说明：**

1、客户端发送建立TCP连接的请求报文，其中报文中包含seq序列号，是由发送端随机生成的，并且将报文中的SYN字段置为1，表示需要建立TCP连接。（SYN=1，seq=x，x为随机生成数值）；

2、服务端回复客户端发送的TCP连接请求报文，其中包含seq序列号，是由回复端随机生成的，并且将SYN置为1，而且会产生ACK字段，ACK字段数值是在客户端发送过来的序列号seq的基础上加1进行回复，以便客户端收到信息时，知晓自己的TCP建立请求已得到验证。（SYN=1，ACK=x+1，seq=y，y为随机生成数值）这里的ack加1可以理解为是确认和谁建立连接；

3、客户端收到服务端发送的TCP建立验证请求后，会使自己的序列号加1表示，并且再次回复ACK验证请求，在服务端发过来的seq上加1进行回复。（SYN=1，ACK=y+1，seq=x+1）。



**四次挥手**

由于TCP连接是全双工的，因此每个方向都必须单独进行关闭。这原则是当一方完成它的数据发送任务后就能发送一个FIN来终止这个方向的连接。收到一个 FIN只意味着这一方向上没有数据流动，一个TCP连接在收到一个FIN后仍能发送数据。首先进行关闭的一方将执行主动关闭，而另一方执行被动关闭。

**四次挥手原理：**

第1次挥手：客户端发送一个FIN，用来关闭客户端到服务端的数据传送，客户端进入FIN_WAIT_1状态；

第2次挥手：服务端收到FIN后，发送一个ACK给客户端，确认序号为收到序号+1（与SYN相同，一个FIN占用一个序号），服务端进入CLOSE_WAIT状态；

第3次挥手：服务端发送一个FIN，用来关闭服务端到客户端的数据传送，服务端进入LAST_ACK状态；

第4次挥手：客户端收到FIN后，客户端t进入TIME_WAIT状态，接着发送一个ACK给Server，确认序号为收到序号+1，服务端进入CLOSED状态，完成四次挥手。

其中：FIN标志位数置1，表示断开TCP连接。

可通过以下趣味图解理解四次挥手：

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260218224248546.png)

**四次挥手过程详细说明：**

1、客户端发送断开TCP连接请求的报文，其中报文中包含seq序列号，是由发送端随机生成的，并且还将报文中的FIN字段置为1，表示需要断开TCP连接。（FIN=1，seq=x，x由客户端随机生成）；

2、服务端会回复客户端发送的TCP断开请求报文，其包含seq序列号，是由回复端随机生成的，而且会产生ACK字段，ACK字段数值是在客户端发过来的seq序列号基础上加1进行回复，以便客户端收到信息时，知晓自己的TCP断开请求已经得到验证。（FIN=1，ACK=x+1，seq=y，y由服务端随机生成）；

3、服务端在回复完客户端的TCP断开请求后，不会马上进行TCP连接的断开，服务端会先确保断开前，所有传输到A的数据是否已经传输完毕，一旦确认传输数据完毕，就会将回复报文的FIN字段置1，并且产生随机seq序列号。（FIN=1，ACK=x+1，seq=z，z由服务端随机生成）；

4、客户端收到服务端的TCP断开请求后，会回复服务端的断开请求，包含随机生成的seq字段和ACK字段，ACK字段会在服务端的TCP断开请求的seq基础上加1，从而完成服务端请求的验证回复。（FIN=1，ACK=z+1，seq=h，h为客户端随机生成）

 至此TCP断开的4次挥手过程完毕。

**11种状态名词解析**

```bash
LISTEN：等待从任何远端TCP 和端口的连接请求。

SYN_SENT：发送完一个连接请求后等待一个匹配的连接请求。

SYN_RECEIVED：发送连接请求并且接收到匹配的连接请求以后等待连接请求确认。

ESTABLISHED：表示一个打开的连接，接收到的数据可以被投递给用户。连接的数据传输阶段的正常状态。

FIN_WAIT_1：等待远端TCP 的连接终止请求，或者等待之前发送的连接终止请求的确认。

FIN_WAIT_2：等待远端TCP 的连接终止请求。

CLOSE_WAIT：等待本地用户的连接终止请求。

CLOSING：等待远端TCP 的连接终止请求确认。

LAST_ACK：等待先前发送给远端TCP 的连接终止请求的确认（包括它字节的连接终止请求的确认）

TIME_WAIT：等待足够的时间过去以确保远端TCP 接收到它的连接终止请求的确认。
TIME_WAIT 两个存在的理由：
          1.可靠的实现tcp全双工连接的终止；
          2.允许老的重复分节在网络中消逝。

CLOSED：不在连接状态（这是为方便描述假想的状态，实际不存在）
```



## 2、为什么TCP是三次握手而不是两次？

防止历史重复连接初始化造成混乱，同步双方初始序列号，确认双方收发能力正常

## 3、TIME_WAIT状态的作用？

* 保证最后一个ACK能被对方收到 

* 防止已失效的连接请求报文出现在本连接中

## 4、tcp与udp的区别？

| 特性     | TCP                          | UDP                     |
| -------- | ---------------------------- | ----------------------- |
| 连接性   | 面向连接                     | 无连接                  |
| 可靠性   | 可靠传输（确认、重传、排序） | 不可靠（容易丢包）      |
| 传输效率 | 较低（头部20字节）           | 高（头部8字节）         |
| 适用场景 | HTTP/HTTPS、SSH、FTP         | DNS、视频流、游戏、VoIP |
| 资源要求 | 较多                         | 较少                    |

## 5、讲下网络7层模型OSI都有哪些？

* OSI七层模型与TCP/IP四层模型

| OSI七层    | TCP/IP四层 | 典型协议/设备         |
| ---------- | ---------- | --------------------- |
| 应用层     |            | HTTP、FTP、SSH、DNS   |
| 表示层     | 应用层     | SSL/TLS、ASCII        |
| 会话层     |            | NetBIOS、RPC          |
| 传输层     | 传输层     | TCP、UDP              |
| 网络层     | 网络层     | IP、ICMP、ARP、路由器 |
| 数据链路层 | 网络接口层 | Ethernet、MAC、交换机 |
| 物理层     |            | 网线、光纤、集线器    |



答：OSI 七层模型架构图  



![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260218224344987.png)

## 6、简述下路由的过程

路由器收到报文后，解封装到三层提取目的IP，通过最长前缀匹配查询路由表确定出接口和下一跳，重新封装二层头部后转发，同时递减TTL防止环路。



## 7、路由表的组成部分有哪些？

路由表主要由目的网络/掩码、路由协议、优先级、度量值、下一跳和出接口组成，实际转发时还会关联Flags标志，最优路由会下发到FIB表用于高速转发。

## 8、怎么查看路由表？

| 系统/厂商    | 查看路由表命令  | 查看特定协议路由             |
| :----------- | :-------------- | :--------------------------- |
| **华为/H3C** | `dis ip rout`   | `dis ip rout protocol ospf`  |
| **思科**     | `show ip route` | `show ip route ospf`         |
| **Linux**    | `ip route`      | `ip route show proto static` |
| **Windows**  | `route print`   | 需配合`findstr`过滤          |

## 9、网络配置文件

```bash
# 传统NetworkManager配置（CentOS/RHEL）
/etc/sysconfig/network-scripts/ifcfg-eth0

# NetworkManager连接配置
/etc/NetworkManager/system-connections/

# systemd-networkd配置
/etc/systemd/network/

# DNS配置
/etc/resolv.conf          # DNS服务器
/etc/hosts               # 本地主机名解析
/etc/nsswitch.conf       # 解析顺序配置
```

## 10、常用网络管理命令

```bash
# 查看IP地址
ip addr show              # 现代推荐
ifconfig                  # 传统（需安装net-tools）

# 路由表
ip route show
route -n

# 链路层
ip link show
ethtool eth0              # 网卡硬件信息

# 网络连接状态
ss -tuln                  # 查看监听端口（替代netstat）
netstat -tuln             # 查看网络连接

# 连通性测试
ping -c 4 8.8.8.8
traceroute 8.8.8.8        # 路由跟踪
mtr 8.8.8.8               # 综合网络诊断
```

## 11、**`ss` vs `netstat` 区别？**

- `ss`更快：直接从内核获取信息，不读取/proc文件
- `ss`功能更强：支持TCP内部状态、过滤表达式

```bash
# 查看TCP连接状态统计
ss -s

# 查看指定进程的网络连接
ss -tp | grep nginx

# 查看处于TIME_WAIT的连接
ss -tan state time-wait | wc -l
```

## 12、**`ip route` 和 `route -n` 有什么区别？**

| 对比项     | `ip route`                   | `route -n`        |
| :--------- | :--------------------------- | :---------------- |
| 工具包     | iproute2（现代）             | net-tools（传统） |
| 显示格式   | 更易读                       | 较简洁            |
| 功能丰富度 | 支持策略路由、网络命名空间等 | 基础功能          |
| 推荐度     | ⭐⭐⭐ 推荐                     | ⭐⭐ 兼容旧系统     |

## 13、 网络故障排查

* 排查流程图

```bash
问题现象
   ↓
1. 物理层检查（网线、灯、ethtool）
   ↓
2. IP配置检查（ip addr, 是否获取到IP）
   ↓
3. 网关连通性（ping网关）
   ↓
4. DNS解析（nslookup/dig域名）
   ↓
5. 上层服务（curl测试端口，telnet/nc）
   ↓
6. 抓包分析（tcpdump/wireshark）
```

* 核心排查工具

```bash
# 完整链路诊断
curl -v http://example.com    # 详细HTTP请求过程
curl -I http://example.com    # 只看响应头
curl -o /dev/null -s -w "%{http_code} %{time_total}\n" http://example.com

# DNS排查
dig +trace example.com        # 完整DNS解析过程
nslookup example.com
host example.com

# 端口连通性
nc -zv 192.168.1.1 80         # 扫描端口
telnet 192.168.1.1 80

# 抓包（重点）
tcpdump -i eth0 port 80       # 抓80端口
tcpdump -i any host 1.2.3.4   # 抓特定IP
tcpdump -w capture.pcap       # 写入文件，用Wireshark分析
```



## 14、大量TIME_WAIT状态如何解决？

```bash
# 查看当前数量
ss -tan | awk '{print $1}' | sort | uniq -c

# 优化内核参数（/etc/sysctl.conf）
net.ipv4.tcp_tw_reuse = 1        # 复用TIME_WAIT连接
net.ipv4.tcp_tw_recycle = 0      # 已废弃，不建议使用
net.ipv4.tcp_fin_timeout = 30    # 缩短FIN_WAIT_2时间
net.ipv4.tcp_max_tw_buckets = 5000  # 限制最大数量
```



## 15、高并发Web服务器优化
**Q: 如何支撑100万并发连接？**

- 调大`fs.file-max`和`nofile`限制
- 多队列网卡绑定（RSS/RPS）
- 使用`SO_REUSEPORT`多进程监听同一端口
- 考虑DPDK绕过内核协议栈

## 16、场景2：网络不通排查
**Q: 两台服务器A能ping通B，但B不能ping通A？**
- 检查B的防火墙（INPUT链）
- 检查A的防火墙（OUTPUT链）
- 检查中间设备ACL
- 检查反向路由（B到A的路由是否可达）

## 17、场景3：TCP异常
**Q: 大量CLOSE_WAIT状态原因？**
- 程序bug：收到FIN后未调用`close()`
- 检查：`ss -tan state close-wait` + `lsof -p PID`
