---
title: 【Linux】iptables之防火墙概述及规则匹配+实例（1）
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


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180922736.png)




<br>

## 一、防火墙的基础概念
### 1、防火墙的概念与应用
&emsp;&emsp;网络中的防火墙，是一种将内部网络和外部网络分开的方法，是一种隔离技术。防火墙在内网与外网通信时进行访问控制，依据所设置的规则对数据包作出判断，最大限度地阻止网络中的黑客破坏企业网络，从而加强企业网络安全。

### 2、包过滤的工作层次
&emsp;&emsp;主要是网络层，针对IP数据包，体现对包内的IP地址、端口等信息的处理上。

## 二、iptables的四表五链
>表中存放的是链，链中存放的是规则

**<font color=teal size=4>四表：优先级：filter<nat<mangle<raw</font>**

|  |  |
|--|--|
|raw表|确定是否对该数据包进行状态跟踪；有限级最高，设置raw是一般是为了不在iptables做数据包的链接跟踪处理，提高性能
|mangle表|为数据包设置标记；负责对数据包进行修改和追踪
|NAT表|修改数据包中的源、目标IP地址或端口；负责地址转发
|filter表|确定是否被放行该数据包（过滤)；负责包过滤（默认）


**<font color=teal size=4>链表结构关系图：</font>**

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180926677.png)


**<font color=teal size=4>五链：</font>**


|  |  | 小写|
|--|--|--|
|INPUT|处理<font color=red>入站</font>数据包|input
|OUTPUT|处理<font color=red>出站</font>数据包|output
|FORWARD|处理<font color=red>转发</font>数据包|forward
|PREROUTING|在进行<font color=red>路由选择前</font>处理数据包|prerouting
|POSTROUTING|在进行<font color=red>路由选择后</font>处理数据包|postrouting

规则链之间的顺序:
>入站: PREROUTING→INPUT &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;<font color=red>路由选择前→入站</font>
出站:OUTPUT→POSTROUTING<font color=red>&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;出站→路由选择后</font>
转发:PREROUTING→FORWARD→POSTROUTING<font color=red> &emsp;路由选择前→转发→路由选择后</font><br>
<font color=reds> 不管是路由入站还是转发，都要选择路由选择前
不管是路由出站还是转发，都要选择路由选择后</font>

## 三、iptables命令

### 1、语法结构

```bash
iptables [-t 表名] 选项&参数 [链名][匹配条件][-j 动作控制类型]
```
保存更新配置iptables

```bash
iptables-save > /etc/sysconfig/iptables
```

注意事项:
&emsp;&emsp;不指定表名时，默认指filter表
&emsp;&emsp;不指定链名时，默认指表内的所有链
&emsp;&emsp;除非设置链的默认策略，否则必须指定匹配条件
&emsp;&emsp;选项、链名、控制类型使用大写字母，其余均为小写


<font color=teal>数据包的常见控制类型/动作类型：-j</font>

|类型| 解析 |
|--|--|
|ACCEPT|允许通过
|DROP|直接丢弃，不给出任何回应
|REJECT|拒绝通过，必要时会给出提示
|LOG|记录日志信息，然后传给下一条规则继续匹配


### 2、iptables的选项参数及实例

**<font color=teal>选项及参数：</font>**
|选项&参数| 解析 |
|--|--|
|-t|	指定表，默认filter
|-A  |追加一条规则  -A 链名 [序号] 匹配条件 -j 动作
|-I  |插入一条规则  -I 链名 [序号] 匹配条件 -j 动作；默认第一行（也可以自己指定序号）
|-R | 修改规则  -R 链名 序号 匹配条件 -j 动作
|-D  |删除指定规则  -D 链名 序号 （-s <IP地址> -j <目标>）
|-P  |设置默认规则  -P 链名 动作(ACCEPT,DROP,REJECT,LOG)
|-p | 指定协议  TCP，UDP，ICMP；--sport	指定源端口	；--dport	指定目标端口
|-L|查看防火墙规则，后可以指定链 
|-F|清空防火墙规则；也可以指定清空某一个表的所有规则
|-v|以更详细的方式显示规则信息
|-n|以数字形式显示；要和-L配合看
|--line-numbers或--line|显示规则编号；要和-L配合看
|-s	|指定源地址
|-d	|指定目标地址
|-i  |指定网卡 
|-m | 指定模块，没有指定模块，默认使用与-p选项同名的模块 

**<font color=teal>实例：</font>**

1、-t：指定查看raw表
```bash
iptables -t raw -L
```
2、-A \\-s\\-j：追加一条规则，使192.168.2.2禁止访问

```bash
iptables -A INPUT -s 192.168.2.2 -j REJECT
```
3、-I\\-s\\-j：插入一条规则，允许访问192.168.2.2

```bash
iptables -I INPUT -s 192.168.2.2 -j ACCEPT
```
4、-R\\-s\\-j：第一条规则，修改为丢弃192.168.2.2；将第二条prot的udp改为icmp并且开放

```bash
iptables -R INPUT 1 -s 192.168.2.2 -j DROP

iptables -R INPUT 2 -p icmp -j ACCEPT
```
5、-D：删除一条指定行数的规则

```bash
iptables -D INPUT 3
```
6、-D：删除一条指定ip的规则

简单来说就是删除的时候把 `-I 或者 -A` 改为 `-D`，其他的都还和添加的一样。

```bash
iptables -D INPUT -s 192.168.2.2 -j DROP
```

7、-L：查看防火墙规则，后可以指定链 

```bash
#查看所有防火墙规则
iptables -L 

#指定链：查看入站防火墙规则
iptables -L INPUT
```

8、-F：清空防火墙规则 ；也可以指定清空某一个表的所有规则

```bash
iptables -F

iptables -t nat -F
```



9、-n：以数字形式显示；要和-L配合看

```bash
iptables -L -n
```
10、-v：已更详细的方式查看规则信息

```bash
iptables -L -n -v
```

11、--line-numbers或--line：显示规则编号；要和-L配合看

```bash
iptables -L --line-numbers

iptables -L --line
```

## 四、iptables规则的匹配类型
<br>

1、通用匹配
&emsp;&emsp;可直接使用，不依赖与其他条件或扩展
&emsp;&emsp;包括网络协议、IP地址、网络接口等条件<br>

2、隐含匹配
&emsp;&emsp;要求以特定的协议匹配作为前提
&emsp;&emsp;包含端口、TCP标记、ICMP类型等条件<br>

3、显式匹配
&emsp;&emsp;要求以“-m扩展模块”的形式明确指出类型
&emsp;&emsp;包括多端口、MAC地址、IP范围、数据包状态等条件
<br>


常用管理选项汇总表：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180925106.png)
<br>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180925035.png)

<br>

### 1、通用匹配
>常见的通用匹配条件：
&emsp;&emsp;协议匹配：-p 协议名
&emsp;&emsp;地址匹配：-s 源地址、-d 目的地址
&emsp;&emsp;接口匹配：-i 入站网卡、-o 出站网卡
#### 1.1、协议匹配

<font color=grep>协议匹配：-p 协议名</font>

**<font color=sjldiwei>允许所有的TCP协议进入</font>**
```bash
iptables -A INPUT -p tcp -j ACCEPT
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180925588.png)

**<font color=sjldiwei>删除指定协议匹配规则：</font>**

```bash
iptables -D INPUT -p tcp -j ACCEPT
```

**<font color=sjldiwei>除了icmp协议其他协议都丢弃</font>**

```bash
iptables -I FORWARD ! -p icmp -j DROP
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180925018.png)

#### 1.2、地址匹配
<font color=grep>地址匹配：-s 源地址、-d 目的地址</font>

**<font color=sjldiwei>允许访问ip地址192.168.2.2</font>**

```bash
# 插入一条
iptables -I INPUT -s 192.168.2.2 -j ACCEPT

# 追加一条
iptables -A INPUT -s 192.168.2.2 -j ACCEPT
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180925932.png)

**<font color=sjldiwei>删除指定ip规则</font>**

```bash
iptables -D INPUT -s 192.168.2.2 -j DROP
```


**<font color=sjldiwei>丢弃192.168.1.0/24网段的ip</font>**

```bash
iptables -I INPUT -s 192.168.1.0/24 -j DROP
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180925612.png)

**<font color=sjldiwei>访问地址将地址转发到目标地址“192.168.2.22”并且开放</font>**

```bash
iptables -A FORWARD -d 192.168.2.22 -j ACCEPT
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180925731.png)


#### 1.3、接口匹配
<font color=grep>接口匹配：-i 入站网卡、-o 出站网卡</font>


**<font color=sjldiwei>将eth1的网卡在入站时丢弃</font>**

```bash
iptables -I INPUT -i eth1 -j DROP
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180925828.png)

**<font color=sjldiwei>删除指定接口规则</font>**
```bash
iptables -D INPUT -i eth1 -j DRO
```

**<font color=sjldiwei>将eth1的网卡在出站时丢弃</font>**

```bash
iptables -I OUTPUT -o eth1 -j DROP
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180925759.png)


### 2、隐含匹配
> 常见的隐含匹配条件：
&emsp;&emsp;端口匹配：-p来指定，--sport 源端口、--dport目的端口
&emsp;&emsp;TCP匹配：--tcp-flags 检查范围 被设置的标记
&emsp;&emsp;ICMP匹配：--icmp-type ICMP类型

#### 2.1、端口匹配
<font color=grep>端口匹配：-p来指定，--sport 源端口、--dport目的端口</font>

**<font color=sjldiwei>将源网段设置为udp协议且目标端口为53，并开启地址转发</font>**
**<font color=sjldiwei>将目标网段设置为udp协议且源端口为53，并开启地址转发</font>**

```bash
iptables -A FORWARD -s 192.16.2.2/24 -p udp --dport 53 -j ACCEPT

iptables -A FORWARD -d 192.16.2.2/24 -p udp --sport 53 -j ACCEPT
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180925167.png)

**<font color=sjldiwei>将源网段“192.16.2.0/24”设置为tcp协议且目标端口为53，并开启地址转发</font>**
**<font color=sjldiwei>将目标网段“192.16.2.0/24”设置为tcp协议且源端口为53，并开启地址转发</font>**

```bash
iptables -A FORWARD -s 192.16.2.0/24 -p tcp --dport 53 -j ACCEPT

iptables -A FORWARD -d 192.16.2.0/24 -p tcp --sport 53 -j ACCEPT
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180925175.png)

**<font color=sjldiwei>开放TCP协议且目标端口为22，允许进入</font>**
**<font color=sjldiwei>开放TCP协议且目标端口为20-21，允许进入</font>**

```bash
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

iptables -A INPUT -p tcp --dport 20:21 -j ACCEPT
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180924375.png)


#### 2.2、TCP匹配
<font color=grep>TCP匹配：--tcp-flags 检查范围 被设置的标记</font>

**<font color=sjldiwei>指定eth1网卡，port设置为tcp协议，检查范围为SYN、RST、ACK，监测到的都丢弃</font>**

**<font color=sjldiwei>指定eth1网卡，port设置为tcp协议，除了检查范围中的SYN、RST、ACK，其他都可以进入</font>**

```bash
iptables -I INPUT -i eth1 -p tcp --tcp-flags SYN,RST,ACK SYN -j DROP

iptables -I INPUT -i eth1 -p tcp ! --tcp-flags SYN,RST,ACK SYN -j ACCEPT
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180924464.png)


#### 2.3、ICMP匹配
<font color=grep>ICMP匹配：--icmp-type ICMP类型</font>
>常见的 icmp 类型
 &emsp;&emsp;8&emsp; Echo request——回显请求（Ping 请求）
&emsp;&emsp;0 &emsp;Echo Reply——回显应答（Ping 应答）
&emsp;&emsp;3 &emsp;错误回显

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180924694.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180924921.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180924520.png)

获取帮助：<font color=red>iptables -p icmp -h</font>

### 3、显式匹配
>常见的显式匹配条件：
&emsp;&emsp;多端口匹配：-m multiport --sports | --dports 端口列表
&emsp;&emsp;IP范围匹配：-m iprange --src-range IP范围
&emsp;&emsp;MAC地址匹配：-m mac --mac-source MAC地址
&emsp;&emsp;状态匹配：-m state --state 连接状态
#### 3.1、多端口匹配
<font color=grep>多端口匹配：-m multiport --sports | --dports 端口列表</font>

**<font color=sjldiwei>允许22、25、80、110、143端口进入并开启tcp协议</font>**

```bash
iptables -I INPUT -p tcp -m multiport --dport 22,25,80,110,143 -j ACCEPT
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180924210.png)


#### 3.2、IP范围匹配
<font color=grep>IP范围匹配：-m iprange --src-range IP范围</font>

**<font color=sjldiwei>允许192.168.1.100-192.168.1.110这个范围的ip进入并设置tcp协议</font>**

```bash
iptables -A FORWARD -p tcp -m iprange --src-range 192.168.1.100-192.168.1.110 -j ACCEPT
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180924204.png)

#### 3.3、MAC地址匹配
<font color=grep>MAC地址匹配：-m mac --mac-source MAC地址</font>

**<font color=sjldiwei>只要mac地址是00:0c:29:c2:83:32的都丢弃</font>**

```bash
iptables -A FORWARD -m mac --mac-source 00:0c:29:c2:83:32 -j DROP
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180924675.png)


#### 3.4、状态匹配
<font color=grep>状态匹配：-m state --state 连接状态</font>
>常见的连接状态：
&emsp;&emsp;NEW：新连接，与任何连接无关  
&emsp;&emsp;ESTABLISHED：响应请求或已建立连接的 
&emsp;&emsp;RELATED：与已连接有相关性的，如 FTP 数据连接



## 五、iptables 规则的删除
简单来说就是删除的时候把` -I 或者 -A `改为`-D`，其他的都还和添加的一样。
### 1、删除一条指定行数的规则

```bash
iptables -D INPUT 3
```

### 2、删除一条指定ip的规则

```bash
# 追加一条禁止ip访问规则
iptables -A INPUT -s 192.168.2.2 -j DROP

# 删除一条禁止ip访问规则
iptables -D INPUT -s 192.168.2.2 -j DROP
```

### 3、删除指定协议匹配规则

```bash
# 先添加一条指定协议同意访问
iptables -A INPUT -p tcp -j ACCEPT

# 删除一条指定协议匹配规则
iptables -D INPUT -p tcp -j ACCEPT
```

### 4、删除指定接口规则

```bash
# 先添加一条指定接口禁止访问
iptables -I INPUT -i eth1 -j DROP

# 在删除指定接口禁止访问
iptables -D INPUT -i eth1 -j DROP
```

>发现规律了吗？
简单来说就是删除的时候把` -I 或者 -A `改为`-D`，其他的都还和添加的一样。


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180924465.gif)


## 相关文章
>[🍎【Linux】iptables之防火墙概述及规则匹配+实例（1）](https://liucy.blog.csdn.net/article/details/125968904)
>
>---
>[🍌【Linux】iptables之防火墙的应用及案例、策略、备份与还原（2）](https://liucy.blog.csdn.net/article/details/126243322)
>
>---
>[🍐【Linux】firewall-cmd之防火墙简介及常用命令+实例](https://liucy.blog.csdn.net/article/details/126243544)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180923943.gif)
