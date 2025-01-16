---
title: 【Linux】之nc命令（连接与扫描指定端口、监测服务端口的使用情况）解析、详解实例、邮件告警
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2024-12-18
comment: false
breadcrumb: false
---

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## nc命令简介
>&emsp;&emsp;nc命令来自于英文词组“Net Cat”的缩写，其功能是用于扫描与连接指定端口。nc命令是一个功能丰富的网络实用工具，被誉为网络界的瑞士军刀，短小精干，功能实用。它能够基于命令行在网络上读取和写入数据，连接与扫描指定端口号，支持TCP和UDP协议，为用户提供无限潜在用途。
>&emsp;&emsp;主要用于扫描与监测指定端口。

## nc命令的安装
要有外网yum源
```bash
yum -y install nc
```
## nc命令语法格式
```bash
nc [参数] 域名/IP地址 [端口]
```

## nc命令常用参数
| | |
|--|--|
|-l |使用监听模式，管控传入的资料 
|-p |设置本地主机使用的通信端口 
|-s |设置本地主机送出数据包的IP地址 
|-u |使用UDP传输协议 
|-v |显示指令执行过程 
|-w |设置等待连线的时间 
|-z |使用0输入/输出模式，只在扫描通信端口时使用
|-n|不使用dns反向查询ip地址域名

## 参考实例（❀为重点解析）
### 扫描指定主机的8080端口（默认TCP）：
```bash
#扫描指定目标ip和端口
nc -nvv 172.16.11.210 8080

#扫描本地8080端口
nc -nvv 127.0.0.1 8080

#扫描指定目标IP和端口且输出详细信息
nc -v -z -w2 172.16.11.210 8080
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181627050.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181627937.png)




### ❀扫描指定主机的1-100端口，指定为UDP协议，扫描等待连线时间为2秒：
```bash
#扫描成功与不成功都不会输出，可使用echo $?判断是否成功
nc -u -z -w2 172.16.11.210 1-100
```
### ❀扫描指定主机的8088端口，并显示执行过程，扫描等待连线时间为2秒：
```bash
#加上-v扫描成功与不成功都会输出
nc -v -z -w2 172.16.11.210 8088
```
这是不成功的输出

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181627880.png)

这是成功输出

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181627327.png)

### 扫描指定主机的80-85端口，并显示执行过程，扫描等待连线时间为2秒：
```bash
nc -v -z -w2 172.16.11.210 80-85
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181627564.png)

### 扫描指定主机的1到65535的端口范围，只输出打开的端口（去掉-v参数即可）
```bash
nc -z -w2 172.16.11.210 1-65535
```
### ❀批量检测服务器指定端口开放情况：
>1、假如我们要监控一堆指定的IP和端口，可新建一个文件（第1列服务器IP，第2列要监控的端口）。
><font color=red>要注意：写ip和端口的文件中不能有注释不能有空行，只能是ip 端口；如果后面跟注释，会是失败，空行也会读取为失败</font>
>ip可自行写要监控的ip地址端口同意。
```bash
[root@localhost ncport]# cat ip-ports.txt

172.16.11.210 80
172.16.11.210 6379
172.16.11.210 18000
172.16.11.211 3306
172.16.11.212 10001
172.16.11.209 8099
172.16.11.210 8088
```
2、使用脚本监测判断服务端口是否开放，成功会返回0值显示ok，失败会返回1值显示fail。
借用上面一步的文件，文件内容是自己要监控的ip地址端口。
```bash
[root@localhost ncport]# cat nc-ports.sh 

#/bin/bash

# 获取执行当前脚本的路径
DIR=$(cd $(dirname $0) && pwd )

cat $DIR/ip-ports.txt | while read line;do
	nc -w 10 -z $line > /dev/null 2>&1
	if [ $? -eq 0 ];then
		echo $line:ok
	else
		echo $line:fail
	fi
done
```
3、执行脚本查看运行结果如下：
```bash
[root@localhost ncport]# sh nc-ports.sh 

172.16.11.210 80:fail
172.16.11.210 6379:fail
172.16.11.210 18000:fail
172.16.11.211 3306:fail
172.16.11.212 10001:fail
172.16.11.209 8099:fail
172.16.11.210 8088:ok
```
---
---
### 当端口不通时设置告警
#### Linux邮件告警
>(1) 先在linux上安装邮件服务，比如直接下载emil或者mutt、sendmail，这里我安装的是[【Linux】部署mailx服务及发送邮件告警](https://liucy.blog.csdn.net/article/details/129257050)
>&emsp;
(2) 修改上面的nc-ports.sh检测脚本，在显示失败fail的时候增加一行：
……………………
`echo $line :fail`
`echo "服务器 \$line 端口不通，请尽快处理！" | mail -s "【机房监控】服务器$line端口不通" mail@139.com`
……………………
>&emsp;
(3) 如果上面的接收邮箱设置为移动139邮箱，并开启接收邮件短信告知，即可实现“短信告警”的功能。
>&emsp;
(4) 也可以使用qq邮箱来发送告警
>&emsp;
(5) 如果是在公司使用要给部门或多个人发送告警的话，可以批量发送；发件人是在配置邮件服务中设置的。
……………………
修改上面的nc-ports.sh检测脚本，在最上面加一个函数变量：
mail_ALL=(邮箱1,邮箱2,邮箱3,邮箱4,邮箱5,邮箱6,邮箱7)
>&emsp;
修改上面的nc-ports.sh检测脚本，在显示失败fail的时候增加一行：
echo "服务器 \$line 端口不通，请尽快处理！" | mail -s "【机房监控】服务器$line端口不通" $mail_ALL
……………………

更改完脚本为：
```bash
[root@localhost ncport]# cat nc-ports.sh

#/bin/bash

mail_ALL=(zhangsan@qq.com,lisi@qq.com,wangwu@qq.com)

# 获取执行当前脚本的路径
DIR=$(cd $(dirname $0) && pwd )

cat $DIR/ip-ports.txt | while read line;do
	nc -w 10 -z $line > /dev/null 2>&1
	if [ $? -eq 0 ];then
		echo $line:ok
	else
		echo $line:fail
		echo "服务器 $line 端口不通，请尽快处理！" | mail -s "【机房监控】服务器$line端口不通" $mail_ALL
	fi
done
```

需要定时监控的话可以添加周期性计划任务，定时执行一下监测脚本，如果有fail就会告警发邮件；

>完整脚本地址：[shell批量检测服务端口脚本nc命令检测ip端口是否存在脚本（在linux中用于检测服务状态的）](https://download.csdn.net/download/liu_chen_yang/88351954)
#### zabbix告警
>(1) 需要上面两个脚本（ip-ports.txt、nc-ports.sh），外加一个判断脚本，如下；一个脚本只能用于监测一个端口
>&emsp;
>(2) 需要在zabbix-agent配置文件中添加执行脚本命令；UserParameter=111,sh /etc/zabbix/zabbix_agentd.d/ncports/111/111.sh'
>&emsp;
>(3) 脚本及配置添加完成之后访问zabbix页面去添加监控服务，监控项、触发器....

判断脚本如下:
```bash
[root@localhost ncport]# cat 111.sh 
#!/bin/bash

#使用哪个端口写哪个，一个脚本只能用于监测一个端口，如果监测的ip端口是ok，则返回1，如果不是ok或者是没有，则返回0。
port=$(sh /etc/zabbix/zabbix_agentd.d/ncports/nc-ports.sh | grep "172.16.10.111 2222" | awk -F ":" '{print $2}')
#echo $port

if [ '$port' == "ok" ];then
	echo "1"
else
	echo "0"
fi
```
#### windows弹窗告警
>(1) 先打开接收消息弹窗windows客户机的“Messenger”服务，设置为“启动”
>&emsp;
>(2) 利用smbclient命令来发送消息，net脚本文件如下：
```bash
[root@localhost ncport]# cat /scripts/net.sh

#!/bin/bash
#/scripts/net.sh
case "$1" in
send)
echo "$3"|smbclient -I "$2" -M `nmblookup -A "$2"|sed -e '1d' -e '3,/*/d'|cut -f2|cut -d' ' -f1`
;;
*)
echo "Usage:net send
```

#### linux邮件告警及zabbix告警的优缺点
>……………………
>
><font color=green>linux告警优点：</font>不用一个一个添加ip端口，可以直接去过滤甚至多个ip和端口不通会同一时间去告警
><font color=green>zabbix告警优点：</font>可以自己定时去监控，如果失败了会告警，如果恢复了也会告诉一声；到达监控定时的时间如果还是失败，则跳过此次告警。
>&emsp;
><font color=orange>linux告警缺点：</font>只会发送告警，不会发送恢复告警，而且必须手动写周期性计划任务定时监控，到时候没有恢复还会继续告警
><font color=orange>zabbix告警缺点：</font>zabbix告警有些吃力，就你需要监控哪个端口，必须要一个一个写到监控配置中，而且必须要用到调用脚本，如果是ok会恢复告警，如果是fail会告警，但是有时候写错了，脚本中没有找到这个ip或者端口或者端口被停止找不到，则不反回，所以就必须要多加一个脚本。还要在页面添加监控项、触发器..
>……………………
>- 推荐使用linux中邮件服务告警，然后用zabbix方式来监控邮件服务是否启动。
>- 如果zabbix服务和linux邮件服务能互相取长补短就好了。
>- 最后，根据自己的个人喜好吧，来定义用哪个告警方式。
---
---
### nc命令文件拷贝
很多时候我们都要在两个不同的终端间拷贝文件，虽然说有很多种方法，例如：FTP、Samba、Scp等等，但我们仅仅需要一次临时的快捷的连接，不仅要安装软件，还要进行登录操作，如果这样的话那么大部分的时间都会被浪费掉。
假设我们需要传输一个文件```bashtest.txt```，通过主机A发送到主机B。

发送端(A)：
```bash
nc -l 10000 < test.txt
```
- -l 监听端口,管控传入的资料 

通过nc的-l参数将主机A变为服务器，并重定向netcat的输入为文件```bashtest.txt```，也就是我们想要传输的文件，那么当任何主机成功连接到该端口，netcat就会发送```bashtest.txt```的文件内容。

接收端(B)：
```bash
nc -l 172.16.11.210 10000 > test.txt
```
- -n 不使用dns反向查询ip地址域名

使用nc命令连接主机A的10000端口，并将输出重定向到test.txt。这样，当主机B连接到主机A时，就会接收到A发来的文件内容，并保存的文件test.txt
反之也是如此，只不过将主机A与主机B的身份进行调换。顺带着，输入与输出重定向也要发生改变。

```bash
(接收端)A: nc -l 10000 > test.txt

(发送端)B: nc -n 192.168.78.128 10000 < test.txt
```
---
---
### nc命令目录传输
使用nc传输目录实际上和传输文件手法一样，只不过将目录打包为压缩文件，再使用nc将压缩文件传输过去，客户端接收后将接收到的压缩文件解压。
传输目录为test，其下有文件test.txt、test2.txt
由主机A传输到主机B

发送方(A)：
```bash
tar -zcvf - test | nc -l 10000
```
- -z 使用gzip指令处理压缩文件
- -c 创建新的压缩文件
- -v 显示指令执行过程，即详细模式
- -f 指定需要压缩的文件，即test文件夹

接收方(B)：

```bash
nc 192.168.78.128 10000 | tar -zxvf -
```
- -z 使用gzip指令处理压缩文件
- -x 从压缩文件中解压文件
- -v 详细模式
- -f 指定压缩文件

\- 代表linux中的标准输出流，将压缩后的文件直接输出到netcat中
发送端接收到通过netcat传输来的文件，再使用tar指令解压文件

---
---
### nc命令在线聊天
通过netcat实现在线聊天室也需要C/S结构，服务端监听本地端口，客户端直接连接到远程服务器端口。

服务端：
```bash
nc -l -p 10000
```
客户端：
```bash
nc 192.168.78.128 10000
```
- -l 监听模式
- -p 指定本地端口，在实际应用中可以省略

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181627329.png)

