---
title: Linux常见面试题
icon: circle-info
order: 1
category:
  - 面试题
tag:
  - Linux常见面试题
  - 运维
date: 2026-02-07
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1、如何看当前Linux系统有几颗物理CPU和每颗CPU的核数？  
> 答：在/proc（puoruake）/cpuinfo文件中查看

## 2、查看系统负载有哪些？后面的三个数值表示什么含义呢？  
> 答：`top、w、uptime`； 其中`load average`即`系统负载`，三个数值分别表示`一分钟、五分钟、十五分钟`内系统的平均负载，即平均任务数。

## 3、如何以交互式的方法将其文件中的所有abc字符串更换为ABC？  
> 答：`tr 或 sed`

## 4、简述下linux系统里的buffer和cache区别？  
> 答：Buffer 是对磁盘（块）数据的缓存，而 Cache 是对文件（block）数据的缓存，他们既会用在读请求中，也会用的写请求中。

## 5、如何实时查看网卡流量为多少？如何查看历史网卡流量？  
> 答：安装sysstat包，使用sar命令查看。（sar -n DEV 1 10 #一秒显示一次，一共显示10次；sar -n DEV -f /var/log/sa/sa22 #查看指定日期的流量日志）

## 6、如何查看当前系统都有哪些进程？  
> 答：ps -aux 或者ps -ef

## 7、ps 查看系统进程时，有一列为STAT， 如果当前进程的stat为Ss 表示什么含义？如果为Z表示什么含义？  
> 答：S表示正在休眠；s表示主进程；Z表示僵尸进程。

## 8、僵尸进程对系统有害吗？如何杀掉僵尸进程？  
> 答：重启服务器电脑、找到该defunct僵尸进程的父进程，将该进程的父进程杀掉（ps -ef | grep defunct\_process\_pid）

## 9、如何查看某个网卡是否连接着交换机？  
> 答：mii-tool eth0 或者 mii-tool eth1

## 10、linux下设置DNS需要修改哪个配置文件？  
> 答：（1）在文件 /etc/resolv.conf 中设置DNS；（2）在文件 /etc/sysconfig/network-scripts/ifcfg-eth0 中设置DNS

## 11、如何备份某个用户的任务计划？  
> 答：将/var/spool/cron/目录下指定用户的任务计划拷贝到备份目录cron\_bak/下即可

## 12、任务计划格式中，前面5个数字分表表示什么含义？  
> 答：依次表示：分、时、日、月、周

## 13、某个账号登陆linux后，系统会在哪些日志文件中记录相关信息？  
> 答：用户身份验证过程记录在/var/log/secure（sekuer）中，登录成功的信息记录在/var/log/wtmp。

## 14、网卡或者硬盘有问题时，可以通过使用哪个命令查看相关信息？  
> 答：使用命令dmesg

## 15、shell中什么时候会用到break和continue命令？并且这两个命令的作用是什么？  
> 答：在循环过程中，有时候需要在未达到循环结束条件时强制跳出循环，Shell使用 break 和 continue 来跳出循环。break命令 允许跳出所有循环（终止执行后面的所有循环）。continue命令 不会跳出所有循环，仅仅跳出当前符合条件的循环。

## 16、如何查看当前系统有几块盘？磁盘的使用率和磁盘io的读写使用情况用什么工具可以查看？  
> 答：lsblk 、df -Th 、iostat -xdm 1 # 一般会有个经验值，比如，ioutil要小于80%， svctm要小于2ms。

## 17、自定义解析域名的时候，我们可以编辑哪个文件？是否可以一个ip对应多个域名？是否可以一个域名对应多个ip？  
> 答：编辑 /etc/hosts ,可以一个ip对应多个域名，不可以一个域名对多个ip

## 18、有一天你突然发现公司网站访问速度变的很慢很慢，你该怎么办呢？（服务器可以登陆，提示：你可以从系统负载和网卡流量入手）  
> 答：可以从两个方面入手分析：分析系统负载，使用w命令或者uptime命令查看系统负载，如果负载很高，则使用top命令查看CPU，MEM等占用情况，要么是CPU繁忙，要么是内存不够，如果这二者都正常，再去使用sar命令分析网卡流量，分析是不是遭到了攻击。一旦分析出问题的原因，采取对应的措施解决，如决定要不要杀死一些进程，或者禁止一些访问等。

## 19、LVM新增磁盘扩容过程

> 答：
> 1. 创建物理卷并添加卷组  
> 2. 添加到逻辑卷  
> 3. 现在，逻辑卷已经扩展，你需要调整文件系统的大小以扩展逻辑卷内的空间

## 20、什么是文件句柄？

*   文件句柄是操作系统用来标识和管理打开文件的抽象概念。它是一个整数或指针，程序通过它来访问文件。
*   在 Linux/Unix 系统中，文件句柄通常是一个非负整数（文件描述符，File Descriptor）。
*   在 Windows 系统中，文件句柄是一个指针（HANDLE）。

## 21、文件描述符（File Descriptor）是什么？  
文件描述符是 Linux/Unix 系统中用于标识打开文件的整数。  
每个进程都有一个文件描述符表，用于记录打开的文件。  
标准文件描述符：

*   0：标准输入（stdin）
*   1：标准输出（stdout）
*   2：标准错误（stderr）

## 22、df -h 发现磁盘空间满了，但是任凭各个文件目录下  du -sh \* 也找不到大文件，怎么解决  
答：lsof -n | grep deleted  查看到占用的进程，通过kill -9 进程号或重启服务解决；当我们使用rm在linux上删除了大文件，但是如果有进程打开了这个大文件，却没有关闭这个文件的句柄，那么linux内核还是不会释放这个文件的磁盘空间

## 23、如何检查文件或目录是否存在？  
答：检查文件：-f；检查目录：-d；

## 24、如何在出现异常时退出shell脚本？  
答：使用 $? ，进行判断

## 25、如何调试 Shell 脚本？  
答：使用 -x 参数运行脚本，打印每条命令及其结果、

## 26、如何定义和调用函数？  
* 定义函数
```bash
green() {
  echo "Hello,$1!"
}
```
* 调用函数
```bash
green "小张"
```
```bash
sh test.sh 小张
```

## 27、grep 的常用选项有哪些？

*   \-i：忽略大小写。
*   \-v：反向匹配，输出不匹配的行。
*   \-r：递归搜索目录中的文件。
*   \-n：显示匹配行的行号。
*   \-c：统计匹配的行数。
*   \-E：支持扩展正则表达式（等同于 egrep）。

## 28、如何使用 grep 递归搜索目录？  
答：grep -r "pattern" /path/to/dir

## 29、如何使用 grep 统计匹配的行数？  
答：grep -c "pattern" file.txt

## 30、如何使用 awk 打印文件的某一列？  
答：awk '{ print $1 }' file.txt

## 31、如何使用 awk 计算某一列的总和？  
答：awk '{ sum += $1 } END { print sum }' file.txt

## 32、如何使用 awk 设置字段分隔符？  
答：awk -F':' '{ print $1 }' /etc/passwd

## 33、sed 的基本语法是什么？  
答：sed 's/old/new/' file.txt

*   s：替换命令。
*   old：被替换的内容。
*   new：替换后的内容。

## 34、如何将文件中的 "foo" 替换为 "bar"。？  
答案：sed 's/foo/bar/' file.txt

## 35、如何使用 sed 删除文件中的第 5 行内容？  
答：sed '5d' file.txt

## 36、如何使用 sed 替换文件中的所有匹配内容？  
答案：使用 g 标志 --- sed 's/foo/bar/g' file.txt

## 37、iptables 与 firewalld/nftables 有什么区别？

*   iptables：传统的 Linux 防火墙工具，直接操作内核 netfilter
*   firewalld：动态防火墙管理器，底层使用 iptables 或 nftables

## 38、iptables 有哪几个内置表？各自的作用是什么？

*   filter 表：默认表，用于数据包过滤（INPUT/OUTPUT/FORWARD）
*   nat 表：网络地址转换（PREROUTING/POSTROUTING/OUTPUT）
*   mangle 表：特殊数据包修改（所有链）
*   raw 表：连接跟踪豁免（PREROUTING/OUTPUT）
*   security 表：SELinux 相关标记（较少使用）

## 39、解释 iptables 的默认链及其数据流

*   PREROUTING：数据包进入路由决策前
*   INPUT：目标为本机的数据包
*   FORWARD：需要转发的数据包
*   OUTPUT：本机产生的数据包
*   POSTROUTING：数据包离开路由决策后

## 40、如何查看当前的 iptables 规则？

*   iptables -L -n -v # 查看 filter 表规则
*   iptables -t nat -L -n -v # 查看 nat 表规则

## 41、如何保存和恢复 iptables 规则？

*   保存规则（取决于发行版）：iptables-save > /etc/iptables.rules
*   恢复规则：iptables-restore < /etc/iptables.rules 或 service iptables save # RHEL/CentOS

## 42、如何解决 NFS 挂载失败的问题  
答：

*   检查网络连接和防火墙设置。
*   确保 NFS 服务正在运行。
*   检查 /etc/exports 文件配置是否正确。
*   查看日志文件（如 /var/log/messages 或 /var/log/syslog）。

## 43、NFS 的默认端口是什么？  
答案：

*   portmapper：111（TCP/UDP）。
*   NFS：2049（TCP/UDP）。
*   mountd：动态分配（可通过 rpcinfo -p 查看）。

## 44、NFS 与 SMB/CIFS 的区别是什么？  
答案：​

*   NFS：主要用于 Unix/Linux 系统，性能较高。
*   SMB/CIFS：主要用于 Windows 系统，支持更多功能（如文件锁定、打印服务）。

## 45、如何限制 NFS 客户端的访问？  
答案：在 /etc/exports 文件中指定允许访问的 IP 或网段。例如 /shared\_dir 192.168.1.10(rw)