---
title: 【Linux】firewall-cmd之防火墙简介及命令详解【附加实战⭐建议收藏！！⭐】
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 防火墙
  - 运维
pageview: false
date: 2024-12-17
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171027216.png#pic_center)
<br>
**<center><font color=red size=5>【Linux】firewall-cmd之防火墙简介及命令详解+实例</font></center>**

<br>



## 本文简介
>&emsp;&emsp;在CentOS 7中，新引入了firewalld防火墙，取代了CentOS 6之前的iptables防火墙。<br>
&emsp;&emsp;iptables用于过滤数据包，属于网络层防火墙。iptables主要是基于接口，来设置规则，从而判断网络的安全性。<br>
&emsp;&emsp;firewalld能够允许哪些服务可用，哪些端口可用等等，属于更高一层的防火墙。firewalld提供了支持网络区域所定义的网络链接以及接口安全等级的动态防火墙管理工具。它支持IPv4、IPv6防火墙设置以及以太网桥（在某些高级服务可能会用到，比如云计算）， 并且拥有两种配置模式：运行时（Runtime）模式、永久（Permanent）模式。<br>
&emsp;&emsp;firewalld和iptables都是用来管理防火墙的工具（属于用户态）来定义防火墙的各种规则功能，内部结构都指向netfilter网络过过滤子系统（属于内核态）来实现包过滤防火墙功能。
&emsp;&emsp;firewalld自身并不具备防火墙的功能，而是和iptables一样需要通过内核的netfilter来实现，也就是说firewalld和 iptables一样，他们的作用都是用于维护规则，而真正使用规则干活的是内核的netfilter，只不过firewalld和iptables的结构以及使用方法不一样罢了。<br>
&emsp;&emsp;firewall-cmd是firewalld的字符界面管理工具，firewall-config是firewalld的图形用户界面管理工具。<br>
&emsp;&emsp;<font color=red>firewalld是centos7的一大特性，最大的好处有两个：支持动态更新，不用重启服务；第二个就是加入了防火墙的“zone”概念。</font>
&emsp;&emsp;首先，将所有网络流量分为多个区域（zone），然后，根据数据包的源IP地址或传入的网络接口等条件将流量传入相应区域，同时，每个区域都定义了自己打开或者关闭的端口和服务列表。


## firewalld与iptables相比的两大好处
**firewalld与iptables相比的两大好处：**

&emsp;&emsp; 1. firewalld可以动态修改单条规则，而不需要像iptables那样，在修改了规则后必须得全部刷新才可以生效。
&emsp;&emsp; 2. firewalld在使用上要比iptables人性化很多，即使不明白“四表五链”，和对TCP/IP协议也不理解的，也可以实现大部分功能。

---
---

## firewalld配置的防火墙策略
firewalld配置的防火墙策略，<font color=red>分为：运行时（Runtime）模式、永久（Permanent）模式两种；</font>
&emsp;&emsp; 1. 默认的是运行时（Runtime）模式，配置的策略便会立即生效，但是，系统一旦重启就会失效。
&emsp;&emsp; 2. 永久生效（Permanent）模式，可以使firewalld配置永久生效，但是，此模式需要重启系统，或者手动执行firewall-cmd --reload命令，配置的策略才会立即生效。


## firewall-cmd命令详解
CentOS 7中，默认预装了firewalld、firewall-config命令，如果没有可以通过yum手动安装或更新至最新版本。

```bash
[root@firewall-cmd ~]# yum list firewalld firewall-config
[root@firewall-cmd ~]# yum -y install firewalld firewall-config
```

### 语法格式

```bash
firewall-cmd [选项 ... ]
```

### 常用参数/选项
<table>
	<tr>
	    <th>选项分类</th>
	    <th>参数/选项</th>
	    <th>解析</th>  
	</tr >
	<tr >
	    <td rowspan="3" width=100px bgcolor=PowderBlue>通用选项</td>
	    <td bgcolor=PowderBlue>-h, --help</td>
	    <td bgcolor=PowderBlue>显示帮助信息</td>
	</tr>
	<tr>
	    <td bgcolor=PowderBlue>-V, --version</td>
	    <td bgcolor=PowderBlue>显示版本信息</td>
	</tr>
	<tr>
	    <td bgcolor=PowderBlue>-q, --quiet</td>
	    <td bgcolor=PowderBlue>不打印状态消息</td>
	</tr>
	<tr>
	<tr >
	    <td  rowspan="12" bgcolor=Aquamarine>状态选项</td>
	    <td bgcolor=Aquamarine>--state</td>
	    <td bgcolor=Aquamarine>显示firewalld的状态</td>
	</tr>
		<tr>
	    <td bgcolor=Aquamarine>--permanent</td>
	    <td  bgcolor=Aquamarine>设置永久的规则</td>
	</tr>
	<tr>
	    <td bgcolor=Aquamarine>--reload</td>
	    <td  bgcolor=Aquamarine>不中断服务的重新加载</td>
	</tr>
	<tr>
	    <td bgcolor=Aquamarine>--complete-reload</td>
	    <td bgcolor=Aquamarine>中断所有连接的重新加载</td>
	 </tr >
	 	<tr>
	    <td bgcolor=Aquamarine>--runtime-to-permanent</td>
	    <td bgcolor=Aquamarine>将当前防火墙的规则永久保存</td>
	 </tr >
	 <tr>
	    <td bgcolor=Aquamarine>--zone=</td>
	    <td  bgcolor=Aquamarine>指定区域</td>
	</tr>
	 <tr>
	    <td bgcolor=Aquamarine>--get-active-zone</td>
	    <td  bgcolor=Aquamarine>查看区域信息</td>
	</tr>
	 <tr>
	    <td bgcolor=Aquamarine>--get-zone-of-interface=</td>
	    <td  bgcolor=Aquamarine>查看指定接口所属区域</td>
	</tr>
	 	<tr>
	    <td bgcolor=Aquamarine>--check-config</td>
	    <td bgcolor=Aquamarine>检查配置正确性</td>
	 </tr >
	 <tr>
	    <td bgcolor=Aquamarine>--panic-on</td>
	    <td  bgcolor=Aquamarine>拒绝所有包</td>
	</tr>
		 <tr>
	    <td bgcolor=Aquamarine>--panic-off</td>
	    <td  bgcolor=Aquamarine>取消拒绝状态</td>
	</tr>	 
			 <tr>
	    <td bgcolor=Aquamarine>--query-panic</td>
	    <td  bgcolor=Aquamarine>查看是否拒绝</td>
	</tr>	 
	    <td  rowspan="2" bgcolor=Cornsilk>日志选项</td>
	    <td bgcolor=Cornsilk>--get-log-denied</td>
	    <td bgcolor=Cornsilk>获取记录被拒绝的日志</td>
	</tr>
	<tr>
	    <td bgcolor=Cornsilk>--set-log-denied=[value]</td>
	    <td bgcolor=Cornsilk>设置记录被拒绝的日志，只能为 'all','unicast','broadcast','multicast','off' 其中的一个</td>
	</tr>
</table>

### 实例
#### 1、防火墙的常规操作
1.1、查看firewalld防火墙状态

```bash
systemctl status firewalld

firewall-cmd --state  

#running是开启状态
```
1.2、开启/关闭/重启firewalld防火墙

```bash
#开启防火墙服务 
systemctl start firewalld

#关闭防火墙服务 
systemctl stop firewalld

#重启防火墙服务
systemctl restart firewalld
```

1.3、设置防火墙开机自启/禁止开机自启

```bash
#设置防火墙开机自启
systemctl enable firewalld

#设置防火墙禁止开机自启
systemctl disable firewalld
```

1.4、查看防火墙是否开机自启

```bash
systemctl is-enabled firewalld

#disabled则是开机不启动的；
```

#### 2、配置firewalld
2.1、查看firewalld防火墙的版本

```bash
firewall-cmd -V

firewall-cmd --version
```
2.2、查看服务当前状态

```bash
firewall-cmd --state

#running是开启状态
```

2.3、查看区域信息

```bash
firewall-cmd --get-active-zones
```

2.4、查看指定接口所属区域

```bash
firewall-cmd --get-zone-of-interface=eth0
```

2.5、拒绝所有包/<font color=red>取消拒绝状态</font>/<font color=busafa>查看是否拒绝</font>

```bash
# 拒绝所有包：慎用，因为拒绝所有的包的时候就连xshell都链接不上了
firewall-cmd --panic-on

# 取消拒绝状态
firewall-cmd --panic-off

# 查看是否拒绝
firewall-cmd --query-panic
```

2.6、更新防火墙规则

```bash
#不中断服务的重新加载
firewall-cmd --reload

#中断所有连接的重新加载
firewall-cmd --complete-reload

# 两者的区别就是第一个无需断开连接，就是firewalld特性之一动态添加规则，第二个需要断开连接，类似重启服务
```

2.7、将接口添加到区域，默认接口都在public

```bash
#将接口添加到区域，默认接口都在public
firewall-cmd --zone=public --add-interface=eth0

# 永久生效再加上 --permanent 然后reload防火墙
firewall-cmd --permanent --zone=public --add-interface=eth0
firewall-cmd --reload
```

2.8、设置默认接口区域，立即生效无需重启

```bash
#设置默认接口区域
firewall-cmd --set-default-zone=public

#立即生效无需重启
firewall-cmd --reload
```
2.9、新加一个端口到区域，使其永久生效

```bash
#新加一个端口，使其永久生效
firewall-cmd --permanent --zone=public --add-port=8088/tcp

#立即生效
firewall-cmd --reload
```
2.10、查看所有打开的端口

```bash
firewall-cmd --zone=public --list-ports

firewall-cmd --list-ports
```
2.11、删除一个不需要的已打开的端口

```bash
firewall-cmd --remove-port=3396/tcp
```

2.12、打开一个服务，类似于将端口可视化，服务需要在配置文件中添加，/etc/firewalld 目录下有services文件夹

```bash
firewall-cmd --zone=work --add-service=smtp
```

2.13、移除服务

```bash
firewall-cmd --zone=work --remove-service=smtp
```

2.14、显示支持的区域列表

```bash
firewall-cmd --get-zones
```

2.15、设置为家庭区域

```bash
firewall-cmd --set-default-zone=home
```

2.16、查看当前区域

```bash
firewall-cmd --get-active-zones
```
2.17、设置当前区域的接口

```bash
firewall-cmd --get-zone-of-interface=ens33
```
2.18、显示所有公共区域（public）

```bash
firewall-cmd --zone=public --list-all
```

2.19、临时修改网络接口（ens33）为内部区域（internal）

```bash
firewall-cmd --zone=internal --change-interface=ens33
```

2.20、永久修改网络接口ens33为内部区域（internal）

```bash
firewall-cmd --permanent --zone=internal --change-interface=ens33
```
这里主要有五个相关命令（参数）

```bash
firewall-cmd [--permanent] [--zone=zone] --list-sources
firewall-cmd [--permanent] [--zone=zone] --query-source=source[/mask]
firewall-cmd [--permanent] [--zone=zone] --add-source=source[/mask]
firewall-cmd [--zone=zone] --change-source=source[/mask]
firewall-cmd [--permanent] [--zone=zone] --remove-source=source[/mask]
```

- --list-sources：用于列出指定zone的所有绑定的source地址

- --query-source：用于查询指定zone是否跟指定source地址进行了绑定

- --add-source：用于将一个source地址绑定到指定的zone（只可绑定一次，第二次绑定到不同的zone会报错）

- --change-source：用于改变source地址所绑定的zone，如果原来没有绑定则进行绑定，这样就跟--add-source的作用一样了

- --remove-source：用于删除source地址跟zone的绑定


#### 3、服务管理
3.1、显示服务列表

>Amanda, FTP, Samba和TFTP等最重要的服务已经被FirewallD提供相应的服务，可以使用如下命令查看：

```bash
firewall-cmd --get-services
```

3.2、允许SSH服务通过

```bash
firewall-cmd --new-service=ssh
```

3.3、禁止SSH服务通过

```bash
firewall-cmd --delete-service=ssh
```

3.4、打开TCP的8080端口

```bash
firewall-cmd --enable ports=8080/tcp
```

3.5、临时允许Samba服务通过600秒

```bash
firewall-cmd --enable service=samba --timeout=600
```

3.6、显示当前服务

```bash
firewall-cmd --list-services
```

3.7、添加HTTP服务到内部区域（internal）

```bash
firewall-cmd --permanent --zone=internal --add-service=http

# 在不改变状态的条件下重新加载防火墙
firewall-cmd --reload     
```

#### 4、端口管理
>永久打开端口需要firewall-cmd --reload重新加载一下；
>临时打开就不需要了；
><font color=red>如果设置永久打开端口用了firewall-cmd --reload命令，临时打开的端口就会失效；</font>

##### 4.1、打开443/TCP端口

```bash
#打开443/TCP端口，默认就有--zone=public，所以不加也可以；
firewall-cmd --add-port=443/tcp

#查看已开放的端口
firewall-cmd --list-ports
```

##### 4.2、永久打开3306/TCP端口

```bash
#永久打开3306/TCP端口，默认就有--zone=public，所以不加也可以；
firewall-cmd --permanent --add-port=3306/tcp

#在不断开的情况下重新加载
firewall-cmd --reload

#查看已开放的端口
firewall-cmd --list-ports
```

##### 4.3、查看已开放的端口（两种方式）
>两种区别就在：
>- 【--list-all】可以看的比较全面，还可以看到除了ports之外的sources、services、interfaces信息；
>- 【--list-ports】只能看到所有开放的端口

```bash
firewall-cmd --list-all

firewall-cmd --list-ports
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171027162.png)

##### 4.4、删除已开放的某个不需要的端口

```bash
firewall-cmd --remove-port=3396/tcp
```
##### 4.5、批量添加多个端口

```bash
#批量添加多个端口：53、25端口
firewall-cmd --permanent --add-port=53/tcp --add-port=25/tcp
firewall-cmd --permanent --add-port={53/tcp,25/tcp}

#在不断开的情况下重新加载
firewall-cmd --reload

#查看已开放的端口
firewall-cmd --list-ports
```
##### 4.6、批量添加某一段端口

```bash
#批量添加某一段端口,1-110
firewall-cmd --permanent --add-port=1-110/tcp

#在不断开的情况下重新加载
firewall-cmd --reload

#查看已开放的端口
firewall-cmd --list-ports
```
#### 5、IP管理
##### 5.1、限制（禁止）IP地址访问
- 限制（禁止）IP为 172.16.11.332 的地址禁止<font color=red>（reject）</font>访问22端口即禁止访问机器
```bash
#限制IP为 172.16.11.332 的地址禁止访问22端口即禁止访问机器
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="172.16.11.332" port protocol="tcp" port="22" reject"

#重新载入防火墙设置，使其生效
firewall-cmd --reload

#查看已经设置的ip规则（以下三种方式都可以查看）
firewall-cmd --zone=public --list-rich-rules
firewall-cmd --list-rich-rules
firewall-cmd --list-all
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171027549.png)

##### 5.2、解除（开放）IP地址限制
- 解除（开放）IP为 172.16.11.332 的地址开放<font color=red>（accept）</font>22端口
- 解除（开放）之前如果有限制的话必须先删掉限制才能使用此命令，否则不管用。
- 如果在公司只需要公司内部连接，可以只开放公司的ip，其他地方都连不上了就。
```bash
#解除（开放）IP为 172.16.11.332 的地址开放（accept）22端口
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="172.16.11.332" port protocol="tcp" port="22" accept"

#重新载入防火墙设置，使其生效
firewall-cmd --reload

#查看已经设置的ip规则（以下三种方式都可以查看）
firewall-cmd --zone=public --list-rich-rules
firewall-cmd --list-rich-rules
firewall-cmd --list-all
```
##### 5.3、删除限制或解除IP这条防火墙规则（以下IP地址段同）

这里需要注意一下，删除或解除ip限制的时候，`--remove-rich-rule=` 后面的参数需要和你限制ip时写的一样，否则不通过，会出现一个 `红色的Warning`。
至于怎么查看当时是怎么禁止的，可使用`firewall-cmd --list-rich-rules` 查询一下，如果多的话过滤一下你需要查询的ip即可；
删除或解除ip限制的防火墙规则语法：
```bash
firewall-cmd --permanent --remove-rich-rule="使用：firewall-cmd --list-rich-rules 查询出来已禁用的ip的内容"

例如：
[root@localhost lcy]# firewall-cmd --list-rich-rules
rule family="ipv4" source address="172.16.11.22" reject
[root@localhost lcy]# firewall-cmd --permanent --remove-rich-rule="rule family="ipv4" source address="172.16.11.22" reject"
success
[root@localhost lcy]# firewall-cmd --reload
```


```bash
#删除限制或解除IP这条防火墙规则
firewall-cmd --permanent --remove-rich-rule="rule family="ipv4" source address="172.16.11.332" port protocol="tcp" port="22" accept"

#重新载入防火墙设置，使其生效
firewall-cmd --reload

#查看已经设置的ip规则（以下三种方式都可以查看）
firewall-cmd --zone=public --list-rich-rules
firewall-cmd --list-rich-rules
firewall-cmd --list-all
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171027429.png)

##### 5.4、限制（禁止）IP地址段
- 限制（禁止）IP为 172.0.0.1/24 的地址<font color=red>（reject）</font>

```bash
#限制（禁止）IP为 172.0.0.1/24 的地址（reject）
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="172.0.0.1/24" port protocol="tcp" port="22" reject"

#重新载入防火墙设置，使其生效
firewall-cmd --reload

#查看已经设置的ip规则（以下三种方式都可以查看）
firewall-cmd --zone=public --list-rich-rules
firewall-cmd --list-rich-rules
firewall-cmd --list-all
```

##### 5.5、解除（开放）IP地址段
- 解除（开放）IP为 172.0.0.1/24 的地址<font color=red>（accept）</font>
- 解除（开放）之前如果有限制的话必须先删掉限制才能使用此命令，否则不管用。
```bash
#解除（开放）IP为 172.0.0.1/24 的地址（accept）
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="172.0.0.1/24" port protocol="tcp" port="22" accept"

#重新载入防火墙设置，使其生效
firewall-cmd --reload

#查看已经设置的ip规则（以下三种方式都可以查看）
firewall-cmd --zone=public --list-rich-rules
firewall-cmd --list-rich-rules
firewall-cmd --list-all
```

#### 6、直接模式

>&emsp;&emsp;firewalld中包含一种直接模式，使用它可以完成一些工作，工作原理是和iptables一样的，需要用到四表五连，不过，不建议大家使用，会有点绕；<br>
> 需要看四表五链的可参考：[【Linux】iptables之防火墙概述及规则匹配+实例（1）](https://liucy.blog.csdn.net/article/details/125968904)

6.1、打开TCP协议的8888端口

```bash
firewall-cmd --direct -add-rule ipv4 filter INPUT 0 -p tcp --dport 8888 -j ACCEPT

firewall-cmd --reload
```

#### 7、自定义服务管理
##### 7.1、选项

```bash
（末尾带有 [P only] 的话表示该选项除了与（--permanent）之外，不能与其他选项一同使用！）
--new-service=<服务名> 新建一个自定义服务 [P only]
--new-service-from-file=<文件名> [--name=<服务名>]
                      从文件中读取配置用以新建一个自定义服务 [P only]
--delete-service=<服务名>
                      删除一个已存在的服务 [P only]
--load-service-defaults=<服务名>
                      Load icmptype default settings [P only]
--info-service=<服务名>
                      显示该服务的相关信息
--path-service=<服务名>
                      显示该服务的文件的相关路径 [P only]
--service=<服务名> --set-description=<描述>
                      给该服务设置描述信息 [P only]
--service=<服务名> --get-description
                      显示该服务的描述信息 [P only]
--service=<服务名> --set-short=<描述>
                      给该服务设置一个简短的描述 [P only]
--service=<服务名> --get-short
                      显示该服务的简短描述 [P only]
                      
--service=<服务名> --add-port=<端口号>[-<端口号>]/<protocol>
                      给该服务添加一个新的端口(端口段) [P only]
                      
--service=<服务名> --remove-port=<端口号>[-<端口号>]/<protocol>
                      从该服务上移除一个端口(端口段) [P only]
                      
--service=<服务名> --query-port=<端口号>[-<端口号>]/<protocol>
                      查询该服务是否添加了某个端口(端口段) [P only]
                      
--service=<服务名> --get-ports
                      显示该服务添加的所有端口 [P only]
                      
--service=<服务名> --add-protocol=<protocol>
                      为该服务添加一个协议 [P only]
                      
--service=<服务名> --remove-protocol=<protocol>
                      从该服务上移除一个协议 [P only]
                      
--service=<服务名> --query-protocol=<protocol>
                      查询该服务是否添加了某个协议 [P only]
                      
--service=<服务名> --get-protocols
                      显示该服务添加的所有协议 [P only]
                      
--service=<服务名> --add-source-port=<端口号>[-<端口号>]/<protocol>
                      添加新的源端口(端口段)到该服务 [P only]
                      
--service=<服务名> --remove-source-port=<端口号>[-<端口号>]/<protocol>
                      从该服务中删除源端口(端口段) [P only]
                      
--service=<服务名> --query-source-port=<端口号>[-<端口号>]/<protocol>
                      查询该服务是否添加了某个源端口(端口段) [P only]
                      
--service=<服务名> --get-source-ports
                      显示该服务所有源端口 [P only]
                      
--service=<服务名> --add-module=<module>
                      为该服务添加一个模块 [P only]
--service=<服务名> --remove-module=<module>
                      为该服务移除一个模块 [P only]
--service=<服务名> --query-module=<module>
                      查询该服务是否添加了某个模块 [P only]
--service=<服务名> --get-modules
                      显示该服务添加的所有模块 [P only]
--service=<服务名> --set-destination=<ipv>:<address>[/<mask>]
                      Set destination for ipv to address in service [P only]
--service=<服务名> --remove-destination=<ipv>
                      Disable destination for ipv i service [P only]
--service=<服务名> --query-destination=<ipv>:<address>[/<mask>]
                      Return whether destination ipv is set for service [P only]
--service=<服务名> --get-destinations
                      List destinations in service [P only]
```

#### 8、控制端口 / 服务

> &emsp;&emsp;可以通过两种方式控制端口的开放，一种是指定端口号另一种是指定服务名。虽然开放 http 服务就是开放了 80 端口，但是还是不能通过端口号来关闭，也就是说通过指定服务名开放的就要通过指定服务名关闭；通过指定端口号开放的就要通过指定端口号关闭。还有一个要注意的就是指定端口的时候一定要指定是什么协议，tcp 还是 udp。知道这个之后以后就不用每次先关防火墙了，可以让防火墙真正的生效。

```bash
firewall-cmd --permanent --add-service=mysql	# 设置永久开放mysql服务
firewall-cmd --add-service=mysql        # 开放mysql服务
firewall-cmd --remove-service=mysql     # 阻止mysql服务（删除）
firewall-cmd --list-services            # 查看开放的服务
firewall-cmd --list-all					# 查看开放的服务（services）

firewall-cmd --permanent --add-port=8089	# 设置永久开放8089端口
firewall-cmd --add-port=3306/tcp        # 开放通过tcp访问3306
firewall-cmd --remove-port=8090/tcp     # 阻止通过tcp访问8090（删除）
firewall-cmd --add-port=1080/udp        # 开放通过udp访问1080
firewall-cmd --list-ports               # 查看开放的端口
firewall-cmd --list-all					# 查看开放的端口（ports）
```

##### 8.1、伪装 IP

```bash
firewall-cmd --query-masquerade 	# 检查是否允许伪装IP
firewall-cmd --add-masquerade   	# 允许防火墙伪装IP
firewall-cmd --remove-masquerade	# 禁止防火墙伪装IP
```

#### 9、端口转发
>&emsp;&emsp;端口转发可以将指定地址访问指定的端口时，将流量转发至指定地址的指定端口。转发的目标如果不指定 ip 的话就，默认为本机，如果指定了 ip 却没指定端口，则默认使用来源端口。 <br>
>如果配置好端口转发之后不能用，可以检查下面两个问题：
> 1. 比如我将 80 端口转发至 8080 端口，首先检查本地的 80 端口和目标的 8080 端口是否开放监听了
> 2. 其次检查是否允许伪装 IP，没允许的话要开启伪装 IP

```bash
# 将80端口的流量转发至8080
firewall-cmd --add-forward-port=port=80:proto=tcp:toport=8080

# 将80端口的流量转发至192.168.1.12
firewall-cmd --add-forward-port=port=80:proto=tcp:toaddr=192.168.1.12

# 将80端口的流量转发至192.168.1.12的8080端口
firewall-cmd --add-forward-port=port=80:proto=tcp:toaddr=192.168.1.12:toport=8080
```

端口转发补充：
- 当我们想把某个端口隐藏起来的时候，就可以在防火墙上阻止那个端口访问，然后再开一个不规则的端口，之后配置防火墙的端口转发，将流量转发过去。
- 端口转发还可以做流量分发，一个防火墙拖着好多台运行着不同服务的机器，然后用防火墙将不同端口的流量转发至不同机器。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171027570.gif)
## 相关文章
>[🍎【Linux】iptables之防火墙概述及规则匹配+实例（1）](https://liucy.blog.csdn.net/article/details/125968904)
>
>---
>[🍌【Linux】iptables之防火墙的应用及案例、策略、备份与还原（2）](https://liucy.blog.csdn.net/article/details/126243322)
>
>---
>[🍐【Linux】firewall-cmd之防火墙简介及命令详解+实例](https://liucy.blog.csdn.net/article/details/126243544)

![](https://img-blog.csdnimg.cn/05ef3cff07b343fc851b9729d5f42749.gif#pic_center)
