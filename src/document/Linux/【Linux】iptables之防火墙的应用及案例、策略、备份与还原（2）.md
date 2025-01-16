---
title: 【Linux】iptables之防火墙的应用及案例、策略、备份与还原（2）
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 防火墙
  - iptables
  - 运维
pageview: false
date: 2024-12-18
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180922057.png)


## 一、案例——基于 IP 和端口的防火墙控制

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180933936.png)

>实验环境：为网关、Web 服务器配置防火墙规则
需求描述：
1、为网站服务器编写入站规则
&emsp;&emsp;（1）允许接受响应本机 ping 测试请求的各种 ICMP 数据包
&emsp;&emsp;（2）允许访问本机中位于 80 端口的Web 服务，禁止访问其他端口的 TCP 请求
&emsp;&emsp;（3）允许发往本机以建立连接或与已有连接相关的各种 TCP 数据包
&emsp;&emsp;（4）禁止其他任何形式的入站访问数据


**搭建实验环境，结果如下：**

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180933887.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180933718.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180933669.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180933805.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180933110.png)


为网站服务器编写入站规则
允许接受响应本机 ping 测试请求的各种 ICMP 数据包

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180933229.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180933550.png)

禁止其他任何形式的入站访问数据

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180932138.png)



内网服务器 ping 网关测试：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180932696.png)

网关 ping 内网服务器测试：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180932844.png)

允许访问本机中位于 80 端口的 Web 服务，禁止访问其他端口的 TCP 请求

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180932617.png)


允许发往本机以建立连接或与已有连接相关的各种 TCP  数据包

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180932413.png)

保存 iptables 设置

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180932289.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180932607.png)


测试

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180932675.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180932278.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180932005.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180932521.png)


```bash
[root@iptables~]# elinks 192.168.1.5
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180932825.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180932036.png)



```bash
[root@iptables~]# ftp 192.168.1.5
ftp:connect:连接超时
```

> 2、为网关服务器编写转发规则 
> &emsp;&emsp;（1）允许局域网中的主机访问 Internet 中是 Web、FTP、DNS、邮件服务
> &emsp;&emsp;（2）禁止局域网中的主机访问 web.qq.com、w.qq.com、im.qq.com 等网站，以防止通过 WebQQ 的方式进行在线聊天

**允许局域网中的主机访问Internet  中是 Web、FTP、DNS、邮件服务**


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180932015.png)

禁止局域网中的主机访问web.qq.com、w.qq.com、im.qq.com   等网站

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180931733.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180931012.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180931001.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180931116.png)

保存 iptables 规则配置

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180931339.png)

## 二、SNAT 策略
### 1、作用
作用：局域网主机共享单个公网 IP 地址接入 Internet

### 2、SNAT 策略的原理
&emsp;&emsp;源地址转换，Source Network Address Translation
&emsp;&emsp;修改数据包的源地址

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180931117.png)

### 3、企业共享上网案例

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180931043.png)

前提条件：
&emsp;&emsp;局域网各主机正确设置 IP 地址/子网掩码
&emsp;&emsp;局域网各主机正确设置默认网关地址 
&emsp;&emsp;Linux 网关支持 IP 路由转发

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180931766.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180930453.png)
![](https://img-blog.csdnimg.cn/203fe1b17f0d4d90b14d0e6c69bfb346.png#pic_center)

#### 3.1、固定的外网 IP 地址

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180930207.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180930216.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180930695.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180930370.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180930207.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180930948.png)


#### 3.2、非固定外网 IP 地址或 ADSL

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180930709.png)
## 三、DNAT 策略
### 1、DNAT 原理
&emsp;&emsp;在 Internet 环境中，通过网关服务器中正确设置 DNAT 策略可实现企业所注册的网站或域名必须对应公网 IP 地址。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180929574.png)

前提条件
&emsp;&emsp;局域网的 Web 服务器能够访问 Internet
&emsp;&emsp;网关的外网 IP 地址有正确的 DNS 解析记录
&emsp;&emsp;Linux 网关支持 IP 路由转发

#### 1.1、DNAT 转发规则 1：发内网 Web 服务

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180929930.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180929271.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180929338.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180929438.png)

#### 1.2、DNAT 转换规则 2：发布时修改目标端口
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180929002.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180929322.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180929014.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180929994.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180929749.png)



## 四、iptables 防火墙规则的备份与还原
>&emsp;&emsp;设置完防火墙规则后，可备份规则到文件中，以便日后进行还原，或以备份规则为依据编写防火墙脚本

<font color=red> &gt 为导出	&emsp;&emsp;iptables-save<br>
				&lt 为导入	&emsp;&emsp;iptables-restore</font>

### 1、导出（备份）防火墙规则

```bash
iptables-save 工具
```
**<font color=teal>语法格式：</font>**
```bash
iptables-save > 要导出的路径
```

**<font color=teal>实例：</font>**

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180929106.png)

### 2、导入（还原）防火墙规则 

```bash
iptables-restore 工具
```

**<font color=teal>语法格式：</font>**
```bash
iptables-restore < 要导入的路径
```

**<font color=teal>实例：</font>**

查看规则，现在是空的：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180929806.png)

导入规则：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180929021.png)
>&emsp;&emsp;重定向出的文件也可以是任意自定义的文件，若将规则保存到/etc/sysconfig/iptables 中，iptables 启动时自动还原规则。

## 五、企业防火墙脚本编程与规范【附加】
### 1、“网关型”防火墙脚本
好的防火墙脚本要包括以下部分：
- 定义基本变量，便于脚本的维护、重用
- 加载必要的内核模块，将频繁用到的模块载入到内核
- 调整/proc 参数，Linux 内核控制及调优
- 具体的防火墙规则，按表、链分别设置规则，包括默认策略


#### 1.1、定义基本变量便于脚本的维护、重用

```bash
#!/bin/bash
INET_IF=”eth0”
INET_IP=”192.168.1.108”
LAN_IF=”eth1”
LAN_IP=”192.168.100.1”
LAN_NET=”192.168.100.0/24”
LAN_WWW_IP=”192.168.100.100”
IPT=”/sbin/iptables”
MOD=”/sbin/modprobe”
CTL=”/sbin/sysctl”
```

#### 1.2、加载必要的内核模块将频繁用到的模块载入内核
>……
$MOD ip_tables
$MOD ip_conntrack
$MOD ipt_REJECT
$MOD ipt_LOG
$MOD ipt_iprange
$MOD xt_tcpudp
$MOD xt_state
$MOD xt_multiport
$MOD xt_mac
<font color=red>\$MOD ip_nat_ftp	&emsp;&emsp;&emsp;&emsp;&emsp;支持 FTP 访问的地址转换
$MOD ip_conntrack_ftp	&emsp;&emsp;支持 FTP 访问的连接状态跟踪</font>

#### 1.3、调整/proc 参数Linux 内核控制及调优

```bash
……
$CTL -w net.ipv4.ip_forward=1            开启路由转发功能
$CTL -w net.ipv4.default_ttl=128         默认生存周期
$CTL -w net.ipv4.icmp_echo_ignore_all=1            根本不要响应 echo 包。请不要设置为缺省，它可能在你正被利用成为 DoS 攻击的跳板时可能有用
$CTL -w net.ipv4.icmp_echo_ignore_broadcasts=1     ping 子网的子网地址，所有的机器都应该予以回应。这可能成为非常好用的拒绝服务攻击工具。设置为 1 来忽略这些子网广播消息以下配置为优化 TCP 响应能力
$CTL -w net.ipv4.tcp_syncookies=1        tcp syncookie，默认关闭
$CTL -w net.ipv4.tcp_syn_retries=3       外向 syn 握手重试次数，默认 4
$CTL -w net.ipv4.tcp_synack_retries=3    syn-ack 握手状态重试次数，默认 5，遭受 syn-flood 攻击时改为 1 或 2
$CTL -w net.ipv4.tcp_fin_timeout=60      默认 60，tcp fin 状态超时时间
$CTL -w net.ipv4.tcp_max_syn_backlog=3200     syn 队列，默认1024，> 1280 可能工作不稳定，需要修改内核源码参数
……
```

#### 1.4、具体的防火墙规则
按表、链分别设置规则，包括默认策略

>**<font color=teal>清空原有规则：</font>**
`$IPT -t filter -X`	&emsp;&emsp;<font color=red>删除 filter 表内的用户自定义的链</font>
`$IPT -t nat -X`
`$IPT -t filter -F`
`$IPT -t nat -F`<br>
**<font color=teal>设置默认策略：</font>**
`$IPT -P INPUT DROP`
`$IPT -p FORWARD DROP`
`$IPT -P OUTPUT ACCEPT`<br>
**<font color=teal>其他具体规则：</font>**
`$IPT -I INPUT -p tcp --dport 22 -j ACCEPT`
`$IPT -t nat -A POSTROUTING -s $LAN_NET -o $INET_IF -j SNAT --to-source $INET_IP`
`$IPT -t nat -A PREROUTING -i $INET_IF -d $INET_IP -p tcp --dport 80 -j DNAT --to-destination`
`$LAN_WWW_IP`

#### 1.5、实例：
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180928744.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180928143.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180928481.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180928534.png)

### 2、“主机型”防火墙脚本
- 将 OUTPUT 链的默认策略设为允许，不添加其他规则
- 将 INPUT 链的默认策略设为拒绝，只放行对 Web 服务的访问，以及响应本机访问请求的数据包


#### 2.1、定义基本变量
IPT=”/sbin/iptables”
……
#### 2.2、调整/proc 参数
……

#### 2.3、设置具体的防火墙规则
>&emsp;&emsp;1>删除自定义的链、清空已有规则
$IPT -t filter -X 
$IPT -t filter -F<br>
&emsp;&emsp;2>定义默认策略
$IPT -P INPUT DROP
$IPT -p FORWARD DROP
$IPT -P OUTPUT ACCEPT<br>
&emsp;&emsp; 3>设置 filter 表中的各种规则
$IPT -A INPUT -m multiport -p tcp --dport 22,80 -j ACCEPT
$IPT -A INPUT -m state --state ESTABLISHED,RELATED,NEW -j ACCEPT

#### 2.4、实例：
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180927032.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180927549.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180927515.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180927496.png)



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180927160.gif)


## 相关文章
>[🍎【Linux】iptables之防火墙概述及规则匹配+实例（1）](https://liucy.blog.csdn.net/article/details/125968904)
>
>---
>[🍌【Linux】iptables之防火墙的应用及案例、策略、备份与还原（2）](https://liucy.blog.csdn.net/article/details/126243322)
>
>---
>[🍐【Linux】firewall-cmd之防火墙简介及常用命令+实例](https://liucy.blog.csdn.net/article/details/126243544)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180927477.gif)


