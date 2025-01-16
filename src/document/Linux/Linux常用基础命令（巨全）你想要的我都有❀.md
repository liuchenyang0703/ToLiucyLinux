---
title: Linux常用基础命令（巨全）你想要的我都有❀
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2024-12-19
comment: false
breadcrumb: false
---

Linux系统下，以.开头的都是隐藏文件
Linux中..表示上一级目录，.表示当前目录
长格式引导：--	引导单词
短格式引导：-	引导字母

 - \- 表示普通文件 
 <font color=gree>可执行文件 </font>	绿色	
    <font color=red>  压缩文件 </font>红色 
d	<font color=blue> 表示目录</font>		蓝色
l	<font color=wathet> 表示链接文件</font>	浅蓝色
b	<font color=yellow> 表示块设备文件</font>	黄色
c	<font color=yellow> 表示字符设备文件</font>	黄色
s	<font color=purple> 表示套接字文件</font>	紫色
p	<font color=purple> 表示管道文件</font>	紫色



绝对路径：从根目录开始写的路径叫绝对路径
相对路径：从当前目录开始写的路径相对路径



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191606981.png)

## ❀ls命令

1.ls   (list)	列出目录下的内容
| --help |  查看帮助信息列表|
|--|--|
|-a   (all)  | 查看所有内容，包括隐藏文件
 |-h (--human-readable)|以人类可读方式显示
|-l (--long)  | 以长格式显示文件信息 |
| -d | 查看目录本身 |
|-S|  由大到小排序|
|-r|由小到大排序（由旧到新）|
| -t |由新到旧  |
也可参考👉[linux命令-ll之按时间、大小顺序排列显示](https://blog.csdn.net/liu_chen_yang/article/details/123070483?spm=1001.2014.3001.5502)👈
查看帮助命令：help	man	info
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191606638.png)❀cd命令

| cd |切换目录（后面跟路径“/”）  |
|--|--|
|cd -  | 返回上一个工作目录 |
| cd .. |返回上一级目录

## ❀pwd命令

```bash
pwd	打印工作目录
```

```bash
su -root	切换到管理员命令
```

## ❀date命令

|date  |  查看系统时间和日期	(+%Y-%m-%d %H:%M:%S)|
|--|--|
| -d<字符串> | 显示字符串所指的日期与时间。字符串前后必须加上双引号； |
|-s<字符串>| 根据字符串来设置日期与时间。字符串前后必须加上双引号； |
日期格式字符串列表<br>
如果需要以指定的格式显示日期，可以使用“+”开头的字符串指定其格式

> %H 小时(以00-23来表示)。 
%I 小时(以01-12来表示)。 
%K 小时(以0-23来表示)。 
%l 小时(以0-12来表示)。 
%M 分钟(以00-59来表示)。 
%P AM或PM。 
%r 时间(含时分秒，小时以12小时AM/PM来表示)。 
%s 总秒数。起算时间为1970-01-01 00:00:00 UTC。 
%S 秒(以本地的惯用法来表示)。 
%T 时间(含时分秒，小时以24小时制来表示)。 
%X 时间(以本地的惯用法来表示)。 
%Z 市区。 
%a 星期的缩写。 
%A 星期的完整名称。 
%b 月份英文名的缩写。 
%B 月份的完整英文名称。 
%c 日期与时间。只输入date指令也会显示同样的结果。 
%d 日期(以01-31来表示)。 
%D 日期(含年月日)。 
%j 该年中的第几天。 
%m 月份(以01-12来表示)。 
%U 该年中的周数。 
%w 该周的天数，0代表周日，1代表周一，异词类推。 
%x 日期(以本地的惯用法来表示)。 
%y 年份(以00-99来表示)。 
%Y 年份(以四位数来表示)。 
%n 在显示时，插入新的一行。 
%t 在显示时，插入tab。 
MM 月份(必要) 
DD 日期(必要) 
hh 小时(必要) 
mm 分钟(必要)
ss 秒(选择性) 

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191606820.png)
## ❀创建、删除文件和目录命令

|touch	  |  创建文件或者更新文件时间戳|
|--|--|
|  stat	|查看文件信息（stat后面加文件名）  |

|mkdir|  创建一个新的目录|
|--|--|
|  -v（详细）|  为每个创建的目录打印一条消息（在mkdir后面加-v和目录名）|
| -p （父母）| 如果存在，就不会创建，如果不存在，就会创建父目录（例如：mkdir -pv dir1/dir2/dir3） |

> {1..100}	表示1到100

|rm|删除文件  |
|--|--|
|-r  | 删除目录（rm -r 目录名） |
|-f|  忽略提示，直接强制删除|


## ❀alias命令

> <font color=darkorange> alias	</font> 别名（例如：a=”rm -r“好比如rm -r）<br>
> <font color=darkorange> alias	</font> 取消别名（unalias	别名）

设置永久可参考👉[Linux设置永久别名alias的方法](https://blog.csdn.net/liu_chen_yang/article/details/123204224?spm=1001.2014.3001.5502)👈

## ❀复制、移动、重命名、查看（文件、目录）命令
|  mv |  移动或重命名 |
|--|--|
|参数|解析|
|-b|覆盖前为目标文件创建备份|
|-f |强制覆盖目标文件而不询问|
| -i |覆盖目标文件前询问用户是否确认
| -n |不要覆盖已有文件
| -u |当源文件比目标文件更新时，才执行覆盖操作
| -v |显示执行过程详细信息 |
|-Z |设置文件安全上下文|
| --help |显示帮助信息|
| --version |显示版本信息|

>  mv  原路径       目标路径<br/>
> mv 原文件名 要修改的文件名

|cp	|复制  |
|-----|--|
|  -r   |复制目录  |
|*| 匹配任意所有 |
？|匹配任意一个字符|

> cp【选项】    原路径     目标路径

|cat	| 查看文件内容 |
|----------|--|
|   -n	       | 带行号 |
| tac |查看倒过来的文件内容  |
| nl | 带行号显示文件内容，不显示空格行 |
|more	|分页（回车是一行，空格是一页，q退出）
| less	 |  可以上下查看内容|
|head	|.默认查看前十行
| tail	 | 默认看后十行 |
|  -n|指定查看几行
|  -f|持续观察查看  |

> tail -f 文件名  【一般用来持续查看文件，比如查看日志或者是启动一个程序输出的结果】
> <br><font color=blue > 简化： </font>
> tailf 文件名


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191606357.png)

## ❀find查找、wc统计命令

> find	按条件查找文件<br>
> find	查找范围（默认是当前目录） 条件

|  |  |
|--|--|
|-size  |按大小查找（例如：find / -size +1M（查找大于1M））  |
| -type |  按类型查找（例如：find / -name "*.cfg" -type f（查找名字是*.cfg的和类型为f的管道文件） ）|
| -name | 按名字查找（例如：find / -name "*.cfg"（查找名字是*.cfg的文件）） |
|-mtime +天数|   按天数查找（例如：find /application/log/ -mtime +0 -type d （查找/application/log下一天前的日志，类型为目录））
|  管道 \|  |将前一个命令的执行结果给后一个命令处理（例如：head -3 anaconda-ks.cfg | tail -1（查找anaconda-ks.cfg文件的第三行））   |

> 删除系统中所有a.txt文件 
> rm -rf $(find / -name "a.txt") 
> find / -name "a.txt" -exec  rm -rf {} \ 
> find / -name "a.txt" |xargs rm -rf

>删除/application/log/下的一天前的日志并设置为每周一删除，类型为目录
0 0 * * 1 find /application/log/ -mtime +0 -type d | xargs rm -rf


|wc	|   统计（后面直接跟文件名） |
|-----------------|--|
|   -l              | 统计行数 |
|-w|  统计单词|
|-c|统计字节|
| -m| 统计字符 |

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191606471.png)

## ❀vi/vim命令

> vi/vim 进入编辑模式



<font color=red> 编辑模式:：</font>
> 	i：在光标显示的地方直接编辑；
> I：在光标显示的行首编辑；
> a：在光标显示的后一个编辑；
> A：在光标显示的行尾编辑；
> o：在光标显示的下一行编辑；
> O：在光标显示的上一行编辑；
> s：删除光标所在的位置并进行编辑；
> S：删除光标所在的行进行编辑；

<br>

<font color=blue> 编辑模式-->Esc键-->命令模式</font>

<br>
<font color=red> 命令模式：</font>
<br>

> <font color=orange> 跳转：</font>
> gg	跳转到文件第一行
G	跳转到文件最后一行
<font color=green>数字</font> gg	跳转到指定行
home或^	跳转到行首
end或$	跳转到行尾
w	每次跳过一个单词<br>
<font color=orange>删除或剪切：</font>
dd	删除光标所在行
D	删除光标所在位置到行尾
<font color=green>数字</font> dd	删除光标所在行下指定的行数
dG	删除光标所在行到文件结束位置
x或delete	删除光标所在的字符<br>
<font color=orange>复制与粘贴：</font>
yy	复制光标所在的一行
<font color=green>数字</font>  yy	复制光标下指定的行
p	粘贴到光标的下一行
P	粘贴到光标的上一行<br>
u	撤销
ctrl+r	恢复
> 
<br>
<font color=blue>命令模式	-->  ：/？-->末行模式</font>

<br>

<font color=red> 末行模式：</font>

> /	查找 
> :w	保存（文件路径）另存为 
> :q	退出
>  :wq	保存并退出 
>  :q！	强制退出 
>  :w！	强制保存 
>  :wq！	强制保存并退出
> :r	文件路径	将另一个文件读入光标下一行
> %s#old#new#g 替换
> :%s/old/new/g 替换（加g是全部替换，old是原内容要换成new，new是要换成的内容 #代表分割; /也代表分割）
> :set number /set nu	显示行号
:set nonumber /set nonu 取消显示行号
:set nohlsearch	取消高亮显示



<font color=red> 可视模式：</font>

> ctrl+v 	可视块模式 
> shift+v/V	可视行模式 
> v	可视模式

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191605587.png)

## ❀压缩与解压缩
<font color=red> gzip与gunzip</font> 

> 1-9	9最大	生成文件小，速度越慢
>  gunzip=gzip -d<br>
> 压缩：gzip 原文件 文件名 
> 解压缩：gunzip 原文件 文件名

<font color=red> bzip2与bunzip2</font>

>bunzip2=bzip2 -d<br>
> 压缩：bzip2 原文件 文件名 
> 解压缩：bunzip2 原文件 文件名

<font color=red>tar的压缩与解压缩</font>
|tar	  |制作或释放归档文件|
|-------------|--|
|     -c        |  create  创建|
|-v	|显示详细信息
|-j  | 掉用bzip2压缩格式 |
|-z|掉用gzip压缩格式|
| -f | 指定归档文件 |
| -x	 |解包
|-t|	列出归档文件内容|
|  -C|指定释放归档文件的路径  |

> --exclude=“”指定排除不需要传输的文件模式 
> 比如：tar -cvzf bash.tar.gz /dir1 --exclude="*.txt"	排除所有以.txt为后缀的文件不传输<br>
><font color=blue>一般常用的压缩与解压缩</font>
>压缩：tar cvf 原文件 文件名
>解压缩：tar xvf 原文件 文件名

<font color=teal>file（压缩包名）可以查看这个文件是否是压缩包和类型</font>
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191605980.png)

## ❀grep sed awk命令以及正则表达式
<font color=red>grep：</font>

<font color=green>语法：</font>
>grep 【选项】 '内容'   文件名
>
|grep	| 以行为单位过滤 |
|------------|--|
|       -i     | 不区分大小写 |
|-v	|  取反|
|-w|以单词为单位进行过滤|
|  -B| 指定行数，过滤指定内容以及下几行 |
|-A| 指定行数，过滤指定内容以及上几行 |
|-C|指定行数，过滤指定内容以及上下各几行|
| -o | 只输出过滤的内容 |
|-c| 统计过滤的行数 |
| -n |显示行号  |





<font color=red>正则表达式：</font>

> <font color=bluye>基础正则表达式 -->grep可以直接使用</font>
$	以...结尾
^	以...开头
.	匹配任意一个字符
\-	匹配前一个字符或子表达式任意次（例如：grep "g.*d" a.txt（过滤a.txt文件中的以g开头以d结尾*可以代表有任意多个字符或没有字符））
[A-Z] [a-z] [0-9] [A-Za-z0-9]
[^a-z] 	取反

扩展正则表达式 egrep =grep -E
{n,m} 匹配前一个字符或子表达式n到m次
{n, }  匹配前一个字符或子表达式最少n次
{ ,m}  匹配前一个字符或表达式最少m次
{n} 匹配前一个字符或子表达式n次

\+ 匹配前一个字符或子表达式1次以上（*包括0+不包括，至少）
？ 匹配前一个字符或子表达式0次或1次以上
| 	或	
()	分组(例如：(g|f)ood)

\	转义，取消一个字符的特殊含义

想要查看更多的正则表达式就去👉[正则表达式（全）](https://blog.csdn.net/liu_chen_yang/article/details/123231302)👈

> 查找/root这层目录有多少个普通文件？ 
> find ./ -maxdepth 1 -type f ! -name ".*" | wc -l | ll | grep -c "^_"

<font color=red>sed：</font>

<font color=green>语法：</font>
> sed [选项] ‘[操作地址]sed内置操作’ 文件
> 
<font color=orange>常用选项</font>
|sed| 流文件处理工具 |
|--|--|
|  -n|  只输出处理的行|
|-i| 修改文件内容，编辑文件 |
|-e|指定多个sed内置操作，现在不常用，多个sed内置操作可以使用分号隔开|
| -r |  支持扩展正则表达式|

<font color=orange>操作地址</font>
|  |  |
|--|--|
|  2|	代表处理文件的第2行
|1,5	|代表处理文件的第1到5行
|1;5	|代表处理文件的第1行和第5行
|1~2	|代表指定步长为2，处理的是1,3,5…行
|2,~2	|代表处理文件的第2行开始，到2的倍数行结束。（2,~2=2,4 ;4,~4=4,8行）
|4,$	|代表处理文件第4行到最后一行
|1,+2|	代表处理文件的第1行到第1+2行，也就是1到3行

<font color=orange>内置操作</font>
|  |  |
|--|--|
|p|	打印
|a|	在指定行后追加数据
|i	|在指定行前插入行前
|d	|删除指定行
|c	|替换指定整行
|s	|替换指定字符，默认替换每行第一个字符
|g	|通常与s组合使用，替换全部指定字符
|n|	获取下一行
|y	|字符转换，类似于tr命令(正则不能使用)
|r	|将文件读入指定行后
|w|	将指定行另存为文件
|q|	结束sed操作
|N|	不会清空模式空间内的内容，将下一行追加到模式空间，两行数据以换行符



<font color=red>awk：</font>

<font color=green>语法：</font>
> awk [选项] ‘BEGIN{command}匹配模式{command}END{command}’ 文件
> 
<font color=orange>内置操作</font>
|  |  |
|--|--|
|$0	|文件的整行
|\$1~$n	|awk处理的列，以FS为分隔符
|NF	|查看一共有多少列
|$NF|	查看文件的最后一列
|NR	|表示处理的行数（一共有多少行）	外：指定输出第几行
|FNR	|表示处理当前文件的行数
|FS|	输入字段的分隔符，默认空格或制表符
|RS	|输入记录的分隔符，默认是换行
|OFS	|输出字段的分隔符，默认空格
|ORS	|输出行的分隔符，默认换行
|FILENAME|	awk处理的文件名
|PATH|	文件路径
|ARGC|	命令行参数个数
|ARGV	|命令行参数数组
|ENVIRON	|获取Linux系统中的环境变量



<font color=teal>which	文件名查找命令的绝对路径</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191605227.png)

----------------------------------------------
## ❀制作模板机

👉[制作模板机](https://blog.csdn.net/liu_chen_yang/article/details/115432904?spm=1001.2014.3001.5502)👈
```bash
#进入：
vim /etc/sysconfig/network-scripts/ifcfg-ens33
#1.网络配置  NAT
TYPE=Ethernet
BOOTPROTO=static
NAME=ens33
DEVICE=ens33
ONBOOT=yes
IPADDR=192.168.2.10
NETMASK=255.255.255.0
GATEWAY=192.168.2.1
DNS1=114.114.114.114


/etc/init.d/network restart 重启网络服务 
ip a  查看网络信息 
```

<font color=red>xshell连接慢如何解决：</font>

>进入vi /etc/ssh/sshd_config 
再找到UseDNS 吧yes改成no，前面“#”符号也要删，保存退出<br/>
重启ssh服务：
systemctl restart sshd

<font color=red>防火墙与selinux的关闭及开启和永久生效 ：</font>

查看防火墙详情请看：👉[Linux防火墙命令](https://blog.csdn.net/liu_chen_yang/article/details/123531619)👈

> systemctl stop firewalld  关闭防火墙服务
            start <br>
systemctl disable firewalld  禁止防火墙开机自启动
          enable <br>
firewall-cmd --state    查看防火墙状态		  
systemctl status firewalld<br>
systemctl is-enabled firewalld 
查看防火墙是否开机自启动  <br>
getenforce  查看selinux的状态
setenforce  设置selinux的状态  
vi /etc/selinux/config 
vi /etc/sysconfig/selinux 
SELINUX=disabled
重启系统生效

<font color=red>挂载磁盘：</font>

> 查看磁盘信息：
fdisk -l 查看<br>
创建目录：
mkdir /media/cdrom
mount /dev/sr0 /media/cdrom 挂载磁盘 <br>
df -Th 挂在完查看挂载信息

如果遇到挂载时报错：`mount: 在 /dev/sr0 上找不到媒体`
请检查ISO映像文件的连接设置；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191605133.png)


<font color=red>配置本地yum仓库：</font>

```bash
cd /etc/yum.repos.d/
mkdir bak
mv *.repo bak
```

> yum源文件存在 /etc/yum.repos.d 中<br>
> 创建一个文件(local.repo)：
vi local.repo
[local]
name=local
baseurl=file:///media/cdrom
enabled=1
gpgcheck=0

> 配置完成之后<br>
> yum clean all  清除yum缓存 
yum makecache  建立新的yum缓存 
或者直接用：yum makecache fas**t <font color=darkorange>加载未加载的缓存</font>**
**<font color=blue>安装vim和man命令：</font>** yum -y install vim man 


<font color=red>设置永久挂载：</font>

> 进入fstab：<br>
> vim /etc/fstab
/dev/sr0 /media/cdrom iso9660 defaults 0 0
第一段:挂载的设备	<font color=darkorange>（dev/sr0）</font>
第二段:挂载的目录 	<font color=darkorange>（/media/cdrom）</font>
第三段:文件系统类型 <font color=darkorange>（iso9660）</font>
第四段:挂载的参数 defaults默认参数 <font color=darkorange> （defaults ）</font>
第五段:是否使用dump备份  0不备份  1备份 <font color=darkorange>（0）</font>
第六段:是否使用fsck检测  0不检测<font color=darkorange>（0）</font>


<font color=red>注解：</font>

> 1.系统中只有一块硬盘，sda,分区sda1,sda2 ;
2.根目录是整个系统目录的顶点，/mnt也在根目录下；
3.如果知道根目录对应的是哪个硬盘分区，可以判断出
a.txt存到哪个设备上；<br>
mount /dev/sr0 /media/cdrom 
mount /dev/sdb4 /mnt

<font color=red>扩展：格式化磁盘</font>

```bash
#Cetnos6格式化磁盘
mkfd.ext4 -f /dev/[sda]
#Centos7格式化磁盘
mkfs.xfs -f /dev/[sda]
```

<br>

**<font color=teal>重启系统的命令：reboot、init 6、shutdown -r </font>**

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191605537.png)

------------------------------------------------------

## ❀软件包管理

|<font color=darkorange>rpm</font>	  | 红帽系列操作系统 |
|--|--|
|rpm -q 包名|		查看rpm包是否安装
|rpm -qa|	列出所有已安装的rpm包
|rpm -qi 包名 |    查看rpm包的详细信息
|rpm -qpi 完整包名 |   查看未安装rpm包的详细信息
|rpm -ql  包名 |     查看rpm包生成的文件路径 
|rpm -ivh 完整包名  | 安装rpm包
|rpm -Uch 完整包名 |   升级rpm包
|rmp -v 包名	|详细信息
|rpm -h 包名|	以#显示进度条
|rpm -e 包名  |   卸载

> 在CenOs系统中，卸载gcc的软件包时，可以使用命令rpm -e gcc<br>
使用rpm命令强制卸载软件包时要加选项 --nodeps

FHS文件系统标准
第一层：定义了跟目录下的目录存放相应的文件
第二层：/usr和/var目录的划分
|<font color=darkorange>yum	</font>	  | 自动解决依赖安装rpm包|
|--|--|
|yum install  	包名|安装
|yum list|	查看所有的rpm包
|yum list installed	|已经安装的rpm包
|yum info 包名|	查看软件包的信息
|yum search 命令	|查看命令属于哪个包
|yum provides 命令|查看命令属于哪个包
|yum history	|查看yum命令的历史记录
|yum remove	包名|卸载
|yum update	包名|升级
|yum grouplist |	列出所有包组


**<font color=red>部署nginx（使用源码包部署）</font>**

tar包（源码包）

> 1.解包
物理机向虚拟机传文件：
&emsp;&emsp;(1.利用U盘，挂载
&emsp;&emsp;(2.lrzsz包提供的命令
&emsp;&emsp;&emsp;rz 物理机-->虚拟机
&emsp;&emsp;&emsp;sz 虚拟机-->物理机
&emsp;&emsp;(3.xftp		大文件
2.配置
&emsp;&emsp;（1）sz先把nginx压缩包复制到虚拟机
&emsp;&emsp;（2）解压nginx压缩包：tar xf nginx-1.6.0.tar.gz -C /usr/src/
&emsp;&emsp;（3）切换到nginx目录下：cd /usr/src/nginx-1.6.0
&emsp;&emsp;（4）./configure --prefix=/usr/local/nginx && make && make install
指定安装路径然后编译在安装




> <font color=red>报错1：</font>./configure: error: C compiler cc is not found
>   没有编译环境
<font color=green>解决：</font>yum -y install gcc gcc-c++<br>
<font color=red>报错2：</font>./configure: error: the HTTP rewrite module requires the PCRE library. You can either disable the module by using --without-http_rewrite_module option, or install the PCRE library into the system, or build the PCRE library statically from the source with nginx by using --with-pcre=\<path> option. 
缺少pcre-devel库
<font color=green>解决：</font>yum -y install pcre-devel<br>
<font color=red>问题3：</font>./configure: error: the HTTP gzip module requires the zlib library. You can either disable the module by using --without-http_gzip_module option, or install the zlib library into the system, or build the zlib library statically from the source with nginx by using --with-zlib=\<path> option.   
缺少zlib-devel
<font color=green>解决：</font>yum -y install zlib-devel

<font color=teal>echo $?	通过其返回值，判断上一条命令是否执行成功（0表示执行成功；非0 表示执行失败）</font>

<font color=teal>make	编译<br>
make	install	安装</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191605702.png)

## ❀用户、用户组管理

<font color=red>超级用户</font>	root	UID=0
<font color=red>普通用户</font>	/bin/bash	  UID！=0
<font color=red>程序用户</font>	/sbin/nologin



> 在Linux系统中创建用户后，会以目录  /etc/skel/ 为模板复制文件到用户家目录<br>
/etc/passwd	存放的是用户信息
/etc/shadow	存放的是用户密码<br>
root: x :0:0:root:/root:/bin/bash
第一段：用户名
第二段：密码占位符
第三段：UID
第四段：GID
第五段：描述信息
第六段：用户家目录
第七段：用户登录的shell<br>
/bin/bash
/sbin/nologin<br>
<font color=teal>创建一个名为mysql用户，并禁止登录系统（统称：程序用户）<br>
useradd -s /sbin/nologin mysql</font><br><br>


<font color=red size=5>用户管理：</font>

**<font color=green>新增用户语法：</font>**
> useradd  [选项]  用户名


|useradd  |新增用户  |
|--|--|
|-u|	指定UID
|-g|	指定GID，用户的主要组
|-G|	指定用户的附加
|-s|	指定登录shell，默认是/bin/bash
|-M|	不创建用户家目录
|-m|	创建用户家目录
|-d|	指定用户家目录	默认家目录/home/与用户同名

<font color=teal>在创建用户时，默认会从/etc/skel目录下复制内容到用户家目录下</font>

> su  用户名		切换用户<br>
su - 用户名	系统环境变化<br>
ctrl+d或exit	退出登录

**<font color=green>修改用户信息语法：</font>**
> usermod [选项]  用户名

|usermod	| 	修改用户信息 |
|-----|--|
|-c|	修改描述字段
|-d|	修改家目录位置
|-g|	修改gid
|-u|	修改用户的uid
|-l	|修改用户名
|-s|	修改登录的shell
|-L|	锁定用户
|-U|	解锁



><font color=teal> passwd	修改或设置用户密码</font><br>
>passwd root 密码 <font color=blue>更改root的密码</font><br>
echo “123123”|passwd --stdin test 不交互设置命令，给test用户设置一个密码<br>
passwd -l
passwd -u
passwd -s


**<font color=green>删除用户语法：</font>**
> userdel [选项]  用户名


|userdel| 删除用户 |
|-------|--|
|-r|	删除用户时删除家目录


<font color=red size=5>用户组管理：</font>
|  |  |
|--|--|
|groupadd	|	添加用户组
|groupdel	|	删除用户组
|gpasswd	|	设置用户组密码
|-a |		将用户添加到一个组中


<font color=green>举例：</font>

> gpasswd -a test root	将用户test加入到root组里


> <font color=blue>查看用户信息：</font>
>/etc/passwd	存放的是用户信息<br>
><font color=blue>查看用户密码信息：</font>
>/etc/shadow	存放的是用户密码<br>
><font color=blue>查看用户组信息：</font>
>cat /etc/gshadow

主要组
附加组

<font color=red>附加命令：</font>
> id	查看用户的id和组
users	查看当前登录的用户
groups	查看用户属于哪个组
whoami	查看当前登录的用户
who	查看用户登录信息
w	查看用户登录信息


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191604769.png)

------------------------------------------------------

## ❀文件权限管理
详情请看：👉[文件权限管理--权限掩码](https://blog.csdn.net/liu_chen_yang/article/details/115432964?spm=1001.2014.3001.5502)👈
<br>
<font color=red>r读	w写	x执行</font><br>


> <font color=blue>查看文件权限：</font>
rw-r--r--
第一组用户权限
第二组用户组权限
第三组其他用户权限
chmod	修改文件权限
chmod [选项]	“u/g/o/a+/-/=rwx”文件（u代表第一组uid，g代表第二组gid，o代表第三组其他用户权限，a代表全部（a会给每一组加一个））
r=4  w=2  x=1  -=0


> <font color=blue>文件的归属：</font>
> 属于哪个用户	属主 
> 属于哪个用户组	属组


<font color=red>语法：</font>

> chown [选项]  用户：用户组  文件名
-R	递归修改<br>
/dir1/ a.txt b.txt c.txt
chown -R root:root /dir1

> find ./ -maxdepth 1 -type f ! -name ".*" -exec chown xiaoming:xiaomimg
> { } \;
><font color=teal> 查找深度为1的名字、为.*结尾的文件再给他修改用户和用户组</font>


<font color=red>权限掩码-->默认文件和目录的权限</font>

> umask 022<br>
创建一个文件默认权限是644=666-022，目录时755=777-022
> 

<font color=red>文件的ACL（访问控制列表）</font>

> getfacl	获取文件的ACL
setfacl	设置文件的ACL
setfacl -m 用户:权限	文件名	设置用户权限
-x	删除指定文件的ACL（setfacl -x 用户名 文件名）
-b	清空文件的ACL（setfacl -b 文件名）

默认情况，文件给定用户的ACL要考虑到ACL中的mask值

<font color=red>特殊权限：</font>
rws/s	rws/S	rwt/T
4	2	1
大小写取决于执行位是否有执行权限

<font color=red>特殊属性：</font>

> lsattr	查看特殊属性
chattr	设置特殊属性
i	不能修改不能追加
a	只可以追加，不能修改	只有root用户可以设置


<font color=green>用法：</font>

> chattr -i 文件名 
> chattr +i 文件名

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191604710.png)

## ❀磁盘管理

详情查看：[Linux磁盘管理](https://blog.csdn.net/liu_chen_yang/article/details/123474281)

<font color=red size=5>fdisk：</font>


磁盘管理-->块设备文件	b开头-->/dev/
对于linux系统磁盘命名：
IDE接口的硬盘为 hda hdb
SAS，SATA，SCSI接口的硬盘	sda  分区sda1 sda2  sdb

主引导记录（MBR）:位于磁盘的第一个扇区
521字节=446字节  引导程序
	记录4个分区表，每个16字节，64字节
	还有2个校验字节



|fdisk	|磁盘管理工具  |
|------------|--|
|-l	|查看所有磁盘信息
|n	|创建新分区
|d	|删除分区
|p	|列出分区表
|w|	把分区表写入硬盘并退出
|e|	扩展分区

<font color=teal>最常用的查看磁盘分区：fdisk -l</font>

MBR中只可以划分4个主分区，或者时3个主分区+1个扩展分区
扩展分区后，可以划分逻辑分区

> 1.fdisk划分分区<br>
2.创建文件系统	mkfs.xfs /dev/sdb1（划分）
&emsp;&emsp;文件系统：组织和管理文件的
&emsp;&emsp;FAT16	FAT32	exFAT	u盘使用-->不支持单个超过4G
&emsp;&emsp;NTFS	-->windows使用
<font color=red>&emsp;&emsp;ext4/ext3/ext2 -->centos6默认</font>
<font color=red>&emsp;&emsp;XFS	-->centos7默认</font>
<font color=red>&emsp;&emsp;centos6和centos7的区别：默认系统不同</font><br>
mkfs	创建文件系统
-f	强制覆盖
<br>
因为系统中主分区加扩展分区占用1-4的分区号，所以第一个逻辑分区为5

|partprobe		  |刷新分区表|
|----------------|--|


| df | 查看系统挂载信息 |
|--|--|
|-T|	显示文件系统类型
|-h|	以人类可读方式显示
|-i	|查看inode情况

<font color=teal>常用的是：df -Th	查看挂载文件</font>
<br>

<font color=red size=5>gdisk：</font>

gdisk	-->划分容量超过2T磁盘分区	GPT	128个
parted

<font color=red size=4>交换分区	swap</font>

> 作用：当内存不够时，使用交换分区代替内存；



>mkswap	创建交换分区
swapon	开启交换分区
&emsp; &emsp;  -s	查看系统中的交换分区
&emsp;  &emsp;  -p	设置优先级
&emsp; &emsp;   -a	开启所有的交换分区
swapoff	关闭交换分区 


<font color=red>查看内存：</font>

> free -m	查看内存
free 	查看系统内存使用情况
&emsp;&emsp;-m	以M为单位


<font color=red>查看文件、目录大小：</font>

> du  文件名	查看文件或目录占用磁盘大小
&emsp;&emsp;-m	-h	以人类可读方式显示
&emsp;&emsp;-m	-s	仅显示目录或文件的总计数值

------------------------------------------------------

<font color=red size=5>LVM	逻辑卷管理：</font><br><br>

<font color=blue>作用：动态调整区分大小<br>
缺点：在性能上有所降低</font><br><br>

<font color=orrages>pv  物理卷 -->直接对磁盘操作<br>
vg  卷组 -->将所有的物理卷组合<br>
lv    逻辑卷 -->在卷组中划分出一定的空间</font><br><br>

|  |  |
|--|--|
|pvcreate	|创建物理卷（pvcreate /dev/sdc1 /dev/sdd1）
|vgcreate	|创建卷组	(vgcreate 卷组名 /dev/sdc1 /dev/sdd1)
|lvcreate	|创建逻辑卷(lvcreate -L 10G -n lv0 /dev/vg0)【/dev/vg0卷组的路径】
|-L	|指定逻辑卷容量
|-n	|指定逻辑卷名字
|.....|.............................
|pvdisplay|	显示物理卷信息
|vgdisplay	|显示卷组信息
|lvdisplay|	显示逻辑卷信息
|...|....
|pvscan|	扫描物理卷
|vgscan|	扫描卷组
|lvscan|	扫描逻辑卷
|...|....
|pvremove|	删除物理卷
|vgremove|	删除卷组
|lvremove|	删除逻辑卷
|...|....
|pvchange|	修改物理卷
|vgchange|	修改卷组
|lvchange|	修改逻辑卷
|...|....
|vgextend	|扩展卷组
|lvextend|	扩展逻辑卷
|vgreduce|	缩容卷组
|lvreduce	|缩容逻辑卷

<font color=teal>xfs_growfs 路径	刷新xfs文件系统<br>
resize2fs 路径	刷新ext4文件系统</font>

------------------------------------------------------
<font color=red size=5>cache	缓存：</font>

> cache data LV	数据卷，用来缓存数据
cache metadata LV	元数据卷，用来缓存元数据
cache pool LV	缓存池，包含data+meta
cache LV		缓存卷，包含真时的LV卷+缓存池

SSD	固态硬盘
HDD	机械硬盘

<font color=red>lsblk	列出块设备信息</font>

> 创建缓存数据	lvcreate -L 10G -n cache_data /dev/vg0 /dev/sde1<br>
创建元数据	lvcreate -L 100M -n cache_meta /dev/vg0 /dev/sde1<br>
创建缓存池	lvconvert --type cache-pool --poolmetadata vg0/cache_meta vg0/cache_data<br>
把缓存池里的放到逻辑卷下：		lvconvert --type  cache --cachepool vg0/cacha_data vg0/lv0

创建一个新的文件系统：mkfs.xfs /dev/vg0/lv0
在跟目录下创建test
挂载根目录下的test：mount /dev/vg0/lv0 /test

<font color=red size=5>snapshot	快照：</font>

> -s	快照
> -L  值	要设置的大小
-n  名字	要写的名字<br>
创建快照卷：lvcreate -L 2G -s -n lv_snapshot vg0/lv0
测试快照卷速度：	dd if=/dev/sda of=/test/mbr.bak bs=512 count=1（dd测试，if源路径，of要复制到哪路径，bs一次复制多少M，count复制多少次）
		dd if=/dev/zero of=/test/mbr.bak bs=10M count=100（dd测试，if源路径，zero代表0，of要复制到哪路径，bs一次复制多少M，count复制多少次）
		<br>
在跟目录下创建/snapshot目录
挂载：mount -o nouuid /dev/vg0/lv_snapshot /snapshot/（uuid相同用-o nouuid）

<font color=teal>UUID	设备的唯一标识：<br>
blkid	查看磁盘的UUID<br>
nmcli conn show	查看网卡的UUID</font><br>

------------------------------------------------------

## ❀RAID 独立磁盘冗余阵列 数据安全性

> 硬RAID	软RAID<br>
<font color=red>RAID 0 条带模式</font>
优点：提高数据的读写速度
缺点：数据安全性低，一旦RAID中有磁盘损坏，RAID组不可用<br>
<font color=red>RAID 1	镜像模式	需要2N快盘</font>
优点：数据完全冗余（备份），安全性高（读效率相对提高）
缺点：磁盘利用率低，成本高(50%)(写性能有所降低)<br>
<font color=red>RAID 5	分布式奇偶校验模式	至少使用少3块硬盘</font>
优点：数据相对安全，允许有一块磁盘损坏（校验数据）	读性能相对有提升
缺点：如果两块盘损坏，RAID不可用，写性能相对较低（做校验数据）
使用率："[（n-1）/n]*100"<br>
RAID 10
RAID 50

软RAID实现通过mdadm
|  |  |
|--|--|
| -C|	创建一个新的RAID
|-l	|指定RAID级别
|-n	|指定使用磁盘的数量
|-x	|指定热备盘
|-S	|停止RAID设备
|-D	|输出指定RAID设备的详细信息

<font color=red>降级与重构</font>

> cat /proc/mdstat

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191604449.png)


## ❀linux系统启动流程

> 1.BIOS加电自检（BIOS基本输入输出系统）
2.MBR引导（MBR主引导）全称（ Master Boot Record）
3.GRUB菜单（可以让你选择用哪个系统内核）
4.加载内核
5.初始化进程	init（切换系统运行的级别）	systemd

<font color=teal>uname（uname -s）	显示linux内核名称【Linux】</font>
|
|-a| 输出详细信息，可以查看版本号【Linux localhost.localdomain 3.10.0-957.el7.x86_64 #1 SMP Thu Nov 8 23:39:32 UTC 2018 x86_64 x86_64 x86_64 GNU/Linux】 |
|--|--|
|-r	|显示linux操作系统内核版本号【3.10.0-957.el7.x86_64】
|-m|	显示主机的硬件名【x86_64】

<font color=red>查看系统版本：cat /etc/redhat-release</font>

> CentOs 6默认的文件系统是ext4
CentOs 7默认的文件系统是xfs
CentOs 6内核版本使用的是2.6
CentOs 7内核版本使用的是3.10

<font color=red>linux系统的运行级别</font>

> 0   关机
1   单用户（不要密码就可以进入，主要是用于做调试）
2   无网络的字符界面多用户
3   完整的字符界面多用户
4   未启用
5   图形界面
6   重启

centos 7
systemctl get-default 	查看系统默认的运行级别
systemctl set-default 级别	设置系统图默认的运行级别
multi-user.target	字符3
graphical.target	图形5

破解root用户密码
CentOS 6：e2e 空格1 回车再按b	passwd reboot
CentOS 7:

## ❀重定向
详细文章在：[Linux中的重定向以及标准输入输出、混合输出和标准错误输出](https://blog.csdn.net/liu_chen_yang/article/details/123475295)

<font color=red size=4>标准输入：</font>

在页面直接显示	 <<	（cat <<eof）[> ss，>aa，> eof，ss，aa]	
输入追加		 cat <<efo\>> /a.txt	(> asa，> asfs，> afo，> efo)[asa,asfs,afo]	
输入覆盖		 cat <<efo\> /a.txt 	

<font color=red size=4>标准输出：</font>
\>	重定向覆盖（echo "abcabcabc" > /a.txt ）[abcabcabc]
\>>	重定向追加（echo "liuchenyang" >> /a.txt）[abcabcabc   liuchenyang]

<font color=red size=4>混合输出：</font>
混合输出	
ls &>>a.txt(把ls查到的目录下所有的内容追加的a.txt文件里)

<font color=red size=4>标准错误：</font>
标准错误		
2>	（LS 2> /a.txt）[-bash: LS: 未找到命令]

<font color=green>举例：</font>
> yum -y install bind bind-utils &> /dev/null && echo "ok" || echo "not ok"<br>
(安装一个bind和bind-utils把安装时候输出的内容全部放到/dev/null,[/dev/null相当于一个回收站，输出到这里面就直接清空]然后如果安装成功就输出ok，安装失败就输出not ok)

------------------------------------------------------

## ❀周期性计划任务和任务调度

详情请看：[Linux周期性计划任务和任务调度以及举例](https://blog.csdn.net/liu_chen_yang/article/details/123476279)
<font color=red>一次性计划任务：at</font>

启动：systemctl start atd<br>
|  |  |
|--|--|
| at|	设置一次性计划任务
|atq	|查询系统中一次性任务
|atrm |	删除一次性计划任务

<font color=red>周期性计划任务：crond</font>

|  |  |
|--|--|
|crontab -e|	进入执行命令的编辑模式
|crontab -l|		查看周期性计划任务
|crontab -r|	删除周期性计划任务

设置永久的周期性计划任务：vim /etc/crontab
进入vim /etc/crontab 编辑，保存退出即可；

**<font color=red>重点：</font>**
|字段|说明  |
|--|--|
| 分 | 取值为0~59的整数 |
|时|取值为0~23的任意整数
|日|取值为1~31的任意整数
|月|取值为1~12的任意整数
|周|取值为0~6的任意整数，0代表星期日

<font color=teal>语法：</font>

> 分 时 日 月 周 用户 要执行的命令
> \* * * * * root 命令

<font color=green>举例：</font>

> <font color=blue>1.每周三清空一下/var/ftp目录</font>
0 0 * * 3 root rm -rf /var/ftp/*<br>
 <font color=blue>2.每月的第一个周一凌晨2点30对/var/www/html/进行打包</font>
30 2 1-7 * 1 root  tar -cvzf backup.tar.gz /var/www/html<br>
 <font color=blue>3.每月1日，重启一次httpd服务</font>
0 0 1 * *  root systemctl restart httpd<br>
 <font color=blue>4.每一分钟删除一个文件</font>
 \* * * * * root rm -rf /root/abc.txt<br>
 <font color=blue>5.每两分钟删除一个目录</font>
 */2 * * * * root rm -rf /appliaction/ceshi<br>
  <font color=blue>6.每2周查找目录并删除</font>
 \* * * * */2 root find / -name test -type d | xargs rm -rf

<font color=teal>补充：</font>
uid	用户的唯一标识
gid	用户组的唯一标识
uuid	设备的唯一标识
pid	进程的唯一标识


<font color=red>任务调度：</font>

```bash
&	将命令放入后台运行
jobs	查看后台任务
jobs -l	查看后台进程的pid
fg 序号	将后台任务调度到前台
ctrl+z	将前台任务暂停放到后台
bg 序号	将后台暂停的任务继续执行
ctrl+c	中断前台执行的任务
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191604758.png)

## ❀进程管理
详情请看：[Linux进程管理](https://blog.csdn.net/liu_chen_yang/article/details/123476847)

程序：存放在磁盘中的静态代码（文件）
进程：在内存中允许运行的程序，动态的状态
进程是资源调度最小的单位
线程：线程是存在在进程中的
线程（thread）是任务执行的最小单位

进程间资源隔离，线程间资源共用

<font color=red>ps命令：</font>
|ps|静态查看进程信息  |
|--|--|
|ps aux|	查看进程信息(a是all全部，u是用户，x是详细信息)
|ps elf	|详细查看进程
|ps -o	|指定内容输出
|ps -o tid	|查看线程
|ps -u	|指定用户	


<font color=teal>使用方法：</font>

>查看进程过滤出nginx的进程：
> ps -ef | grep nginx


<font color=red>netstat命令：</font>
|netstat| 	查看网络连接情况 |
|----------------|--|
|-a|	查看所有链接
|-p|	显示pid和进程名
|-u	|显示UDP
|-t	|显示TCP
|-n|	以数字形式显示
|-l	|显示处于监听状态的连接

<font color=teal>使用方法：</font>

> 查看端口，并过滤出自己想找的端口
> netstat -anput | grep 8099

<font color=red>top命令：</font>

> top	动态查看进程信息<br>
uptime	查看top第一行<br>
lscpu	查看cpu负载的核数<br>
load average: 0.00, 0.01, 0.05
系统1分钟，5分钟，15分钟平均负载<br>
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
CPU使用情况<br>
进程需要占用系统资源（cpu，内存，磁盘，网络，显卡）<br>
> CPU密集型
IO密集型<br>
>us	用户态CPU
sy	内核态CPU
ni	优先级
id	空闲的CPU
wa	等待输入输出设备的CPU
hi	硬中断
si	软中断
st	虚拟化占用CPU资源<br>
KiB Mem :   995896 total,   487280 free,   121580 used,   387036 buff/cache<br>
buff	写缓冲	解决空间问题
cache	读缓存	解决速率问题

<font color=red>renice优先级：</font>
renice	调整运行进程的优先级
<font color=teal>renice -n 优先级等级 pid	进程优先级命令/程序</font>
只有root用户可以设置负值

nice	设置进程运行时的优先级



<font color=red>linux系统中进程状态：</font>
|  |  |
|--|--|
|R|	运行中的进程
|S	|睡眠状态（可以中断）
|D|	不可中断的，通常发生在IO操作
|Z	|僵尸进程
|T	|表示停止状态
|X	|退出状态
|W|	正在换页
|<|	高优先级
|N	|低优先级
|s	|表示该进程下有子进程
|l|	多线程 
|+	|前台运行的进程


<font color=red>僵尸进程：</font>

<font color=blue>什么是僵尸进程：</font>

> 子进程结束，父进程没有回收子进程

<font color=blue>解决僵尸进程：</font>
> 1.重新启动系统
2.杀死父进程，将僵尸进程变为孤儿进程，此时孤儿进程由系统中的systemd接管，会自动清理。
<br>
kill -9 pid	<font color=daaafns>根据进程的pid强制杀死某个进程</font>

父进程派生子进程

<font color=teal>pstree	查看进程树</font>

<font color=teal>yum provides pstree	直接下载不了pstree，就可以利用这个命令找到pstree是哪个包</font>

<font color=red>结束（杀死）进程：</font>

> kill PID	杀进程
killall 进程名	根据进程名杀进程
pkill	根据条件杀进程

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191604489.png)

|kill -l	| 查看进程的所有进程 |
|-----------------|--|
|kill -1	|HUP挂起进程
|kill -2	|INT中断进程（与ctrl+c以一样）
|kill -3	|QUIT退出
|kill -9	|KILL强制杀进程
|kill -15	|TERM终止进程
|kill -18	|CONT继续进程
|kill -19|	STOP暂停进程

<font color=teal>常用的杀进程是：</font>

> kill -9 进程pid


<font color=red>pgrep命令：</font>
|pgrep	| 根据特定条件查进程 |
|---------------|--|
|-l	|根据进程名查进程的PID
|-u	|根据用户名或用户id查进程的pid

<font color=teal>pidof 进程名	根据进程查进程号</font>



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191604205.png)


## ❀用户提权
详情请看：👉[Linux su命令 – 切换用户、用户提权](https://blog.csdn.net/liu_chen_yang/article/details/123630099)👈

su	切换用户
sudo -	随用户更改环境变量

**<font color=teal> 语法格式：</font>**

>su [选项] [用户名]

**<font color=teal>  常用参数：</font>**

|  |  |
|--|--|
|-c或--command	|执行完指定的指令后，即恢复原来的身份
|-f或--fast|	适用于csh与tsch，使shell不用去读取启动文件
|-l或--login|	改变身份时，也同时变更工作目录，以及HOME,SHELL,USER,logname,此外，也会变更PATH变量
|-m,-p或--preserve-environment|	变更身份时，不要变更环境变量
|-s或--shell	|指定要执行的shell
|--help|	显示帮助信息
|--version	|显示版本信息

**<font color=teal>  参考实例：</font>**

切换到linuxcool用户，但环境变量仍然是root用户的：

>[root@linuxcool ~]# su linuxcool

切换到linuxcool用户，并改变为linuxcool用户环境变量：

>[root@linuxcool ~]# su - linuxcool  

变更帐号为 root 并传入 -f 参数给新执行的 shell：

>[root@linuxcool ~]# su root -f

**<font color=red> 用户提权：</font>**

visudo	编辑sudo配置文件
root	用户（用户不带%）
%wheel	用户组（组带%）

> sudo -i	切换到root用户


## ❀文件系统-软连接、硬链接

详情请看：👉[Linux文件系统ln-软连接、硬链接](https://blog.csdn.net/liu_chen_yang/article/details/123629283)👈

ln命令是linux系统中一个非常重要命令，英文全称是“link”，即链接的意思，它的功能是为某一个文件在另外一个位置建立一个同步的链接。 一种是hard link，又称为硬链接；另一种是symbolic link，又称为符号链接。


通俗一点理解，可以把硬链接当成源文件的副本，他和源文件一样的大小，但是事实上却不占任何空间。符号链接可以理解为类似windows一样的快捷方式。

> inode：文件元数据-->权限	归属	时间	类型·block位置
block：磁盘IO的最小单位	默认4K=8个扇区<br>
一个文件占用一个inode，至少占用一个block

目录本身就是特殊的文件
目录的block存放的是目录下文件和目录的名字

**<font color=red>硬链接与软链接（符号链接）</font>**
<font color=blue>ln</font>

> ll命令查看结果，其中-rw-------1后面有个1就是硬链接数
硬链接是文件的另一个入口
软连接类似于windows的快捷方式


**<font color=red> 硬链接与软连接的区别：</font>**

> 1.硬链接的inode号相同，软连接inode不同
>&emsp;&emsp;diff	比较两个文件是否相同（返回信息是不同，不返回信息是相同）
&emsp;&emsp;vimdiff	比较两个文件是否相同
2.删除或重命名源文件对硬链接没有影响，软连接不可用。
3.硬链接不能跨文件系统；软链接可以跨文件系统。
4.目录不能创建硬链接；目录可以创建软链接
5.创建硬链接是ln；	创建软连接是ln -s

**<font color=teal>语法格式：</font>**

>  ln [参数] [源文件或目录] [目标文件或目录]

 **<font color=teal>常用参数：</font>**

|  |  |
|--|--|
|-b	|为每个已存在的目标文件创建备份文件
|-d|	此选项允许“root”用户建立目录的硬链接
|-f|	强制创建链接，即使目标文件已经存在
|-n |把指向目录的符号链接视为一个普通文件
|-i	|交互模式，若目标文件已经存在，则提示用户确认进行覆盖
|-s	|对源文件建立符号链接，而非硬链接
|-v|	详细信息模式，输出指令的详细执行过程



**<font color=teal>参考实例：</font>**

为源文件file.txt创建硬链接file_1：

> [root@linuxcool ~ ]# ln /root/dir/file.txt ./file_1


使用ln命令的“-s”参数来创建目录的符号链接，并使用ls命令来查看链接文件的详细信息：

> [root@linuxcool ~]# ln -s dir file
[root@linuxcool ~]# ls -l
总用量 4
-rw-------. 1 root root 1138 3月  11 14:48 anaconda-ks.cfg
drwxr-xr-x. 2 root root   36 4月   3 08:47 test
lrwxrwxrwx. 1 root root    4 4月   3 08:54 file -> dir

使用ln命令的“-v”参数来输出命令的详细执行过程：

> [root@linuxcool ~]# ln -v /root/dir/file.txt ./file_1
 './file_1' => '/root/dir/file.txt'

使用ln命令的“-b”命令来创建目标文件的备份文件，并使用ls命令来查看：
> 
> [root@linuxcool ~]# ln -b /root/dir/file.txt ./file_1
[root@linuxcool ~]# ls
 anaconda-ks.cfg  file_1  file_1~  dir 



**<font color=red> 相关命令：</font>**

1.df -Th 	查看磁盘空间
2.df -Thi	查看inode情况
inode耗尽引发的故障

1.删除不用的小文件
2.备份后，重新创建文件系统

<font color=teal>tune2fs 文件路径	查看文件系统的信息<br>
dumpe2fs 文件路径	查看文件系统的信息</font><br>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191603026.png)❀日志管理

详情请看：👉[Linux中的日志管理](https://blog.csdn.net/liu_chen_yang/article/details/123630727)👈

<font color=teal>日志：记录系统中相关的信息	系统日志	程序日志</font>
>/var/log	一般都存在这里面
/var/log/messages	系统日志

从CentOs6开始，日志由系统中的rsyslog服务管理
日志存放在/var/log目录下

**<font color=red> 相关命令：</font>**

>dmesg	查看内核和硬件相关的日志<br>
last	查看用户登录的记录<br>
lastlog	查看用户最后一次登录的时间<br>
lastb	记录用户登录失败的信息<br>
logrotate	实现日志轮割

**<font color=red> 日志的级别（9个）：</font>**

|  |  |
|--|--|
|0 |  emerg		紧急（会导致主机系统不可用）
|1  |alert		警告（必须马上处理）
|2 | crit		严重（比较严重）
|3|  err		错误信息
|4 | warning	提醒（警告）
|5 | notice		注意
|6|  info		一般信息
|7| debug		程序或系统的调试信息
|8|  none		空，不记录日志


**<font color=teal> 参考实例：</font>**

> 在周期计划性任务里写（crontab -e）cp file1 file1-$(date +\%Y\%m\%d) && >
> file1【在周期计划性任务中，实现把当前目录下的file1复制一份重新创建一个叫file1-时间（注意date里面的年月日..要加转义\）然后重定向清空file1】<br>
在crontab中%是有特殊含义的，表示换的意思。如果要用的话，必须进行转义\%，如经常用的date
`+%Y%m%d`在crontab中是不会执行的，应该换成date`+\%Y\%m\%d`


**<font color=red> syslog管理：</font>**

系统的日志由服务rsyslog管理
日志集中系统:

**<font color=blue>服务端 ：</font>**
```bash

[root@nginx-1 ~]# vim /etc/rsyslog.conf 
 15 $ModLoad imudp
 16 $UDPServerRun 514

[root@nginx-1 ~]#systemctl restart rsyslog  重启服务

#先安装yum -y install net-tools配置网络要用的比如ifconfig
[root@nginx-1 ~]#netstat -anput|grep 514  

#查看是否开放514号端口的服务 
```


**<font color=blue>客户端：</font>**

```bash
#添加服务端信息
[root@nginx-2 ~]# vim /etc/rsyslog.conf
	90 *.* @192.168.2.11:514  
	* 所有的服务 . 表示以上级别 * 所有级别 
	@ 表示UDP @@ 表示TCP   服务端ip:端口 

#重启rsyslog服务
[root@nginx-2 ~]#systemctl restart rsyslog 

#测试时使用tail -f 观察服务端/var/log/messages日志的变化
[root@nginx-2 ~]#logger "123123"  产生一条日志测试 
[root@nginx-2 ~]#tailf /var/log/messages
```



>.	记录包含该等级及以上级别的信息
.=	只记录当前等级的信息
!	除了该等级都记录


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191603399.png)

## ❀网络管理
<br>

**<font color=red size=5>ifconfig命令：</font>**
<br>

详情请看：👉[Linux网络管理之ifconfig命令 – 显示或设置网络设备](https://blog.csdn.net/liu_chen_yang/article/details/123633511)👈

>ifconfig	查看或管理网络信息
ifconfig ens33	查看ens33信息
ifconfig ens33 192.168.2.100/24

**<font color=teal> 语法格式：</font>**

>ifconfig [参数]

**<font color=teal> 常用参数：</font>**

|  |  |
|--|--|
|add<地址>	|设置网络设备IPv6的IP地址
|del<地址>|删除网络设备IPv6的IP地址
|down	|关闭指定的网络设备
|up	|启动指定的网络设备
|IP地址|	指定网络设备的IP地址


**<font color=teal> 参考实例：</font>**

显示网络设备信息：

```bash
[root@linuxcool ~]# ifconfig
eth0   Link encap:Ethernet HWaddr 00:50:56:0A:0B:0C       
       inet addr:192.168.0.3 Bcast:192.168.0.255 Mask:255.255.255.0
       inet6 addr: fe80::250:56ff:fe0a:b0c/64 Scope:Link     
       UP BROADCAST RUNNING MULTICAST MTU:1500 Metric:1      
       RX packets:172220 errors:0 dropped:0 overruns:0 frame:0      
       TX packets:132379 errors:0 dropped:0 overruns:0 carrier:0 
       collisions:0 txqueuelen:1000       
       RX bytes:87101880 (83.0 MiB) TX bytes:41576123 (39.6 MiB) 
       Interrupt:185 Base address:0x2024  
lo    Link encap:Local Loopback       
      inet addr:127.0.0.1 Mask:255.0.0.0      
      inet6 addr: ::1/128 Scope:Host      
      UP LOOPBACK RUNNING MTU:16436 Metric:1      
      RX packets:2022 errors:0 dropped:0 overruns:0 frame:0      
      TX packets:2022 errors:0 dropped:0 overruns:0 carrier:0   
      collisions:0 txqueuelen:0       
      RX bytes:2459063 (2.3 MiB) 
      TX bytes:2459063 (2.3 MiB)
```

启动关闭指定网卡：

```bash
[root@linuxcool ~]# ifconfig eth0 down
[root@linuxcool ~]# ifconfig eth0 up 
```

为网卡配置和删除IPv6地址：

```bash
[root@linuxcool ~]# ifconfig eth0 add 33ffe:3240:800:1005::2/64
[root@linuxcool ~]# ifconfig eth0 del 33ffe:3240:800:1005::2/64
```

用ifconfig修改MAC地址：

```bash
[root@linuxcool ~]# ifconfig eth0 down
[root@linuxcool ~]# ifconfig eth0 hw ether 00:AA:BB:CC:DD:EE
[root@linuxcool ~]# ifconfig eth0 up
[root@linuxcool ~]# ifconfig eth1 hw ether 00:1D:1C:1D:1E 
[root@linuxcool ~]# ifconfig eth1 up
```

配置IP地址：

```bash
[root@linuxcool ~]# ifconfig eth0 192.168.1.56 
[root@linuxcool ~]# ifconfig eth0 192.168.1.56 netmask 255.255.255.0
[root@linuxcool ~]# ifconfig eth0 192.168.1.56 netmask 255.255.255.0 broadcast 192.168.1.255
```

<br>

**<font color=red size=5>ip命令：</font>**

详情请看：👉[Linux网络管理之ip命令 – 显示与操作路由](https://blog.csdn.net/liu_chen_yang/article/details/123633638)👈

>ip	网络管理命令
ip a	查看网卡信息
ip l	查看网络连接情况

**<font color=teal>语法格式：</font>**

> ip [参数]

**<font color=teal> 常用参数：</font>**

|  |  |
|--|--|
|-s|	输出更详细的信息
|-f	|强制使用指定的协议族
|-4|	指定使用的网络层协议是IPv4协议
|-6|	指定使用的网络层协议是IPv6协议
|-r|	显示主机时，不使用IP地址，而使用主机的域名


**<font color=teal>参考实例：</font>**

用ip命令显示网络设备的运行状态:

```bash
[root@linuxcool ~]# ip link list
```
使用-s参数输出更详细的信息：

```bash
[root@linuxcool ~]# ip -s link list
```

显示核心路由表：

```bash
[root@linuxcool ~]# ip route list
[root@linuxcool ~]# ip route show
```

显示邻居路由表：

```bash
[root@linuxcool ~]# ip neigh list
[root@linuxcool ~]# ip neigh show
```

<br>


**<font color=red size=5>ss命令：</font>**

详情请看：👉[Linux网络管理之ss命令– 显示活动套接字信息](https://blog.csdn.net/liu_chen_yang/article/details/123633711)👈

ss  	查看网络链接

**<font color=teal>语法格式：</font>**

>ss [参数]

**<font color=teal>常用参数：</font>**

|  |  |
|--|--|
|-n|	不解析服务名称，已数字方式显示
|-a	|显示所有套接字
|-l	|显示处于监听状态的套接字
|-o|	显示计时器信息
|-e|	显示详细的套接字信息
|-m	|显示套接字的内存使用情况
|-p	|显示使用套接字的进程
|-i	|显示内部的TCP信息
|-s	|显示套接字使用概况
|-4	|仅显示ipv4的套接字
|-6	|仅显示ipv6的套接字
|-0	|显示PACKET套接字
|-t	|只显示TCP套接字
|-u	|只显示UDP套接字
|-d|	只显示DCCP套接字
|-w	|只显示RAW套接字
|-x	|只显示 Unix套接字
|-D|将原始TCP套接字信息转储到文件


**<font color=teal> 参考实例：</font>**

显示TCP套接字：

```bash
[root@linuxcool ~]# ss -t -a 
State     Recv-Q     Send-Q     Local Address:Port     Peer Address:Port   
LISTEN    0          128        0.0.0.0:ssh            0.0.0.0:*                                
ESTAB     0          52         192.168.60.19:ssh      192.168.30.21:59321               
LISTEN    0          128        *:websm                *:*               
LISTEN    0          128        [::]:ssh               [::]:* 
```

显示UDP套接字：

```bash
[root@linuxcool ~]# ss -u -a
State     Recv-Q     Send-Q     Local Address:Port     Peer Address:Port              
UNCONN    0          0          0.0.0.0:bootpc         0.0.0.0:*                 
UNCONN    0          0          127.0.0.1:323          0.0.0.0:*                 
UNCONN    0          0          [::1]:323              [::]:*  
```

显示套接字使用概况：

```bash
[root@linuxcool ~]# ss -s
Total: 185
TCP:   4 (estab 1, closed 0, orphaned 0, timewait 0)
Transport Total     IP        IPv6
RAW       1         0         1        
UDP       3         2         1        
TCP       4         2         2        
INET      8         4         4        
FRAG      0         0         0        
```

<br>

**<font color=red size=5>netstat命令：</font>**

详情请看：👉[Linux网络管理之netstat命令– 显示网络状态](https://blog.csdn.net/liu_chen_yang/article/details/123633888)👈

>netstat	查看网络连接情况


**<font color=teal > 语法格式：</font>**

>netstat [参数]


**<font color=teal >常用参数：</font>**

|  |  |
|--|--|
|-a	|查看所有链接
|-p|	显示pid和进程名
|-u|	显示UDP
|-t|	显示TCP
|-n|	以数字形式显示
|-l	|显示处于监听状态的连接

**<font color=teal >参考实例：</font>**

显示详细的网络状况：

```bash
[root@linuxcool ~]# netstat -a
```

显示当前户籍UDP连接状况：

```bash
[root@linuxcool ~]# netstat -nu
```

显示UDP端口号的使用情况：

```bash
[root@linuxcool ~]# netstat -apu 
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address  Foreign Address  State  PID/Program name    
udp        0      0 0.0.0.0:bootpc          0.0.0.0:*      4000/dhclient       
udp        0      0 localhost:323           0.0.0.0:*      3725/chronyd        
udp6       0      0 localhost:323           [::]:*         3725/chronyd 
```

显示网卡列表：

```bash
[root@linuxcool ~]# netstat -i 
Kernel Interface table 
Iface MTU Met  RX-OK  RX-ERR  RX-DRP RX-OVR  TX-OK TX-ERR TX-DRP TX-OVR Flg 
eth0 1500   0  181864   0      0       0     141278   0     0     0    BMRU 
lo   16436  0   3362    0      0       0     3362     0     0     0    LRU
```

显示组播组的关系：

```bash
[root@linuxcool ~]# netstat -g 
IPv6/IPv4 Group Memberships Interface    
RefCnt Group 
--------------- ------ --------------------- 
lo        1   ALL-SYSTEMS.MCAST.NET 
eth0      1   ALL-SYSTEMS.MCAST.NET lo       1   ff02::1 
eth0      1   ff02::1:ff0a:b0c eth0          1   ff02::1
```


<br>

**<font color=red size=5>hostname命令：</font>**

详情请看：👉[Linux网络管理之hostname命令 – 显示和设置系统的主机名](https://blog.csdn.net/liu_chen_yang/article/details/123634089)👈

**<font color=teal> 语法格式：</font>**

>hostname [参数]

**<font color=teal> 常用参数：</font>**

|  |  |
|--|--|
|-a	|显示主机别名
|-d|	显示DNS域名
|-f	|显示FQDN名称
|-i	|显示主机的ip地址
|-s|	显示短主机名称，在第一个点处截断
|-y|	显示NIS域名


**<font color=teal> 参考实例：</font>**


查看主机名：

```bash
hostname		查看主机名
```
修改主机名：

```bash
hostname 主机名	修改主机名

#修改的主机名是临时生效的
永久生效：
1.修改配置文件
/etc/hostname
2.hostnamectl set-hostname 主机名
```
查看主机ip地址：


```bash
[root@linuxcool ~]# hostname -I	查看主机的ip地址
```

使用-a参数显示主机别名：

```bash
[root@linuxcool ~]# hostname -a
```

使用-i参数显示主机的ip地址：

```bash
[root@linuxcool ~]# hostname -i
```

使用-y参数显示NIS域名：

```bash
[root@linuxcool ~]# hostname -y
```

<br>

**<font color=red size=5>route命令：</font>**

> route	路由管理命令

详情请看：👉[Linux网络管理之route命令 – 显示并设置路由](https://blog.csdn.net/liu_chen_yang/article/details/123634136)👈


**<font color=teal>语法格式：</font>**

>route [参数]

**<font color=teal>常用参数：</font>**

|  |  |
|--|--|
|-A	|设置地址类型（ 默认IPv4）
|-C|	打印linux核心的路由缓存
|-v	|详细信息模式
|-n	|不执行DNS反向查找，直接显示数字形式的ip地址
|-e	|netstat格式显示路由表
|-net|	到一个网络的路由表
|-host	|到一个主机的路由表
|Add	|增加指定的路由记录
|Del	|删除指定的路由记录
|Target|	目的网络或目的主机
|gw|	设置默认网关
|mss	|设置TCP的最大区块长度（MSS），单位MB
|window|	指定通过路由表的TCP连接的TCP窗口大小
|dev	|路由记录所表示的网络接口

**<font color=teal> 参考实例：</font>**

显示当前路由：

```bash
[root@linuxcool ~]# route
Kernel IP routing table
Destination     Gateway      Genmask        Flags Metric Ref      Use Iface
default        _gateway      0.0.0.0         UG    100    0        0 ens192
192.168.60.0    0.0.0.0      255.255.255.0   U     100    0        0 ens192
```

添加一条路由记录：

```bash
[root@linuxcool ~]# route add -net 192.168.60.11 netmask 192.168.60.1 dev ens192

[root@linuxcool ~]# route add -net 192.168.3.0 netmask 255.255.255.0 ens33
```

删除路由记录：

```bash
[root@linuxcool ~]#  route del -net 192.168.60.11 netmask 192.168.60.1 dev ens192 

[root@linuxcool ~]# route del -net 192.168.3.0 netmask 255.255.255.0 ens33
```

添加和删除默认网关：

```bash
[root@linuxcool ~]# route add default gw 192.168.60.1
[root@linuxcool ~]# route del default gw 192.168.60.1
```

<br>

**<font color=red size=5>tcpdump命令：</font>**

详情请看：👉[Linux网络管理之tcpdump命令 – 监听网络流量](https://blog.csdn.net/liu_chen_yang/article/details/123635418)👈

**<font color=teal>语法格式：</font>**
> tcpdump [参数]

**<font color=teal>常用参数：</font>**
|  |  |
|--|--|
|-a	|尝试将网络和广播地址转换成名称
|-c<数据包数目>|	收到指定的数据包数目后，就停止进行倾倒操作
|-d	|把编译过的数据包编码转换成可阅读的格式，并倾倒到标准输出
|-dd|	把编译过的数据包编码转换成C语言的格式，并倾倒到标准输出
|-ddd	|把编译过的数据包编码转换成十进制数字的格式，并倾倒到标准输出
|-e	|在每列倾倒资料上显示连接层级的文件头
|-f|	用数字显示网际网络地址
|-F<表达文件>	|指定内含表达方式的文件
|-i<网络界面>|	使用指定的网络截面送出数据包
|-l	|使用标准输出列的缓冲区
|-n	|不把主机的网络地址转换成名字
|-N|	不列出域名
|-O|	不将数据包编码最佳化
|-p	|不让网络界面进入混杂模式
|-q	|快速输出，仅列出少数的传输协议信息
|-r<数据包文件>	|从指定的文件读取数据包数据
|-s<数据包大小>	|设置每个数据包的大小
|-S|	用绝对而非相对数值列出TCP关联数
|-t	|在每列倾倒资料上不显示时间戳记
|-tt|	在每列倾倒资料上显示未经格式化的时间戳记
|-T<数据包类型>|	强制将表达方式所指定的数据包转译成设置的数据包类型
|-v|	详细显示指令执行过程
|-vv	|更详细显示指令执行过程
|-x|	用十六进制字码列出数据包资料
|-w<数据包文件>	|把数据包数据写入指定的文件
|-i	|指定网卡
|-nn|	显示ip不显示主机名
|port	|指定端口

**<font color=teal>参考实例：</font>**


监视指定网络接口的数据包：

```bash
[root@linuxcool ~]# tcpdump -i eth1
```

监视指定主机的数据包：

```bash
[root@linuxcool ~]# tcpdump host linuxcool
```

截获主机192.168.10.10 和主机192.168.10.20 或192.168.10.30的通信:

```bash
[root@linuxcool ~]# tcpdump host 192.168.10.10 and \ (192.168.10.20 or 192.168.10.30 \)
```

抓取80端口的HTTP报文，以文本形式展示：

```bash
[root@linuxcool ~]# tcpdump -i any port 80 -A
```

<br>

**<font color=red size=5>traceroute命令：</font>**

详情请看：👉[Linux网络管理之traceroute命令 – 追踪数据包在网络上的传输时的全部路径](https://blog.csdn.net/liu_chen_yang/article/details/123638241)👈

> traceroute	跟踪路由


**<font color=teal>语法格式：</font>**
>traceroute [参数] [域名或者IP]


**<font color=teal>常用参数：</font>**
|  |  |
|--|--|
|-d	|使用Socket层级的排错功能
|-f<存活数值>|	设置第一个检测数据包的存活数值TTL的大小
|-F	|设置勿离断位
|-g<网关>	|设置来源路由网关，最多可设置8个
|-i<网络界面>|	使用指定的网络界面送出数据包
|-I|	使用ICMP回应取代UDP资料信息
|-m<存活数值>	|设置检测数据包的最大存活数值TTL的大小
|-n|	直接使用IP地址而非主机名称
|-p<通信端口>	|设置UDP传输协议的通信端口
|-r|	忽略普通的Routing Table，直接将数据包送到远端主机上
|-s<来源地址>	|设置本地主机送出数据包的IP地址
|-t<服务类型>	|设置检测数据包的TOS数值
|-v|	详细显示指令的执行过程
|-w|	设置等待远端主机回报的时间
|-x|	开启或关闭数据包的正确性检验

**<font color=teal>参考实例：</font>**
追踪本地数据包到www.linuxprobe.com的传输路径：

```bash
[root@linuxcool ~]# traceroute www.linuxprobe.com
```

跳数设置：

```bash
[root@linuxcool ~]# traceroute -m 7 www.linuxprobe.com
```

显示IP地址，不查主机名 ：

```bash
[root@linuxcool ~]# traceroute -n www.linuxprobe.com
```

把探测包的个数设置为值4：

```bash
[root@linuxcool ~]# traceroute -q 4 www.linuxprobe.com
```

把对外发探测包的等待响应时间设置为3秒：

```bash
[root@linuxcool ~]# traceroute -w 3 www.linuxprobe.com
```

<br>

**<font color=red size=5>ifup	开启网卡-激活网络接口</font>**

详情请看：👉[Linux网络管理之网卡、网络接口开关设置](https://blog.csdn.net/liu_chen_yang/article/details/123639757)👈

ifup命令用于激活指定的网络接口。ifup命令会去读取/etc/sysconfig/network-scripts/目录下的相关网络接口的配置文件，并根据配置文件的内容来激活该网络接口。

注意：网络接口名称必须是/etc/sysconfig/network-scripts/目录配置文件中设置的才可以。如果使用ifconfig命令改变了网络接口后，ifup命令就不会识别了。因为ifup命令会对比当前网络的参数与/etc/sysconfig/network-scripts/中配置文件的内容是否相符。

**<font color=teal>语法格式：</font>**
>ifup [网络接口]

**<font color=teal>参考实例：</font>**

激活网络接口eth0：

```bash
[root@linuxcool ~]# ifup eth0
```


<br>

**<font color=red size=5>ifdown	关闭网卡– 禁用网络接口</font>**


详情请看：👉[Linux网络管理之网卡、网络接口开关设置](https://blog.csdn.net/liu_chen_yang/article/details/123639757)👈

ifdown命令用于禁用指定的网络接口。该命令会去读取/etc/sysconfig/network-scripts/目录下的相关网络接口的配置文件，并根据配置文件的内容来关闭该网络接口。

注意：网络接口名称必须是/etc/sysconfig/network-scripts/目录配置文件中设置的才可以。如果使用ifconfig命令改变了网络接口后，ifdown命令就不会识别了。因为ifdown命令会对比当前网络的参数与/etc/sysconfig/network-scripts/中配置文件的内容是否相符。

**<font color=teal>语法格式：</font>**
>ifdown [网络接口]

**<font color=teal>参考实例：</font>**

禁用网络接口eth0：

```bash
[root@linuxcool ~]# ifdown eth0
```


<br>

**<font color=red size=5>arp	地址解析协议</font>**

详情请看：👉[Linux网络管理之arp命令 – 操纵系统arp缓存（地址解析协议）](https://blog.csdn.net/liu_chen_yang/article/details/123638776)👈

**<font color=teal>语法格式：</font>**
>arp [参数] [IP]

**<font color=teal>常用参数：</font>**
|  |  |
|--|--|
|-a|	显示arp缓存的所有条目，主机位可选参数
|-H|	指定arp指令使用的地址类型
|-d|	从arp缓存中删除指定主机的arp条目
|-D|	使用指定接口的硬件地址
|-e|	以linux的显示风格显示arp缓存中的条目
|-i	|指定要操作arp缓存的网络接口
|-n|	以数字方式显示arp缓存中的条目
|-v|	显示详细的arp缓存条目，包括缓存条目的统计信息
|-f|	设置主机的IP地址与MAC地址的静态映射

**<font color=teal>参考实例：</font>**

显示本机arp缓存中所有记录：

```bash
[root@linuxcool ~]# arp
Address       HWtype     HWaddress         Flags Mask          Iface    
gateway       ether      00:03:0f:81:6b:f1    C                ens160
```


以数字方式显示指定主机arp缓存条目：

```bash
[root@linuxcool ~]# arp -n 192.168.60.1
Address           HWtype  HWaddress           Flags Mask         Iface
192.168.60.1      ether   00:03:0f:81:6b:f1   C                  ens160
```

删除接口eth1上的192.168.60.1的arp表中的项：

```bash
[root@linuxcool ~]# arp -i eth1 -d 192.168.60.1
```

使用eth1的MAC地址回答eth0上的192.168.60.2的arp请求：

```bash
[root@linuxcool ~]# arp -i eth0 -Ds 192.168.60.2 eth1 pub
```

<br>


**<font color=red size=5>journalctl命令</font>**	

详情请看：👉[Linux—journalctl命令 – 查看日志](https://blog.csdn.net/liu_chen_yang/article/details/123678329)👈

>journalctl 查看所有日志

**<font color=teal>语法格式：</font>**
>  journalctl [参数]

**<font color=teal>常用参数：</font>**
|  |  |
|--|--|
|-k	|查看内核日志
|-b	|查看系统本次启动的日志
|-u	|查看指定服务的日志
|-n	|指定日志条数
|-f|追踪日志
|_PID|	根据进程id查
|-p	|根据级别查看
|- -since	|查看指定时间的日志
|- -disk-usage|	查看当前日志占用磁盘的空间的总大小


**<font color=teal>参考实例：</font>**

查看所有日志：

```bash
[root@linuxcool ~]# journalctl 
```

查看内核日志：

```bash
[root@linuxcool ~]# journalctl -k 
```

查看系统本次启动的日志：

```bash
[root@linuxcool ~]# journalctl -b 
```

查看httpd的日志：

```bash
[root@linuxcool ~]# journalctl -u httpd
```

查看最近发生的20条日志：

```bash
[root@linuxcool ~]# journalctl -n 20
```

追踪日志：

```bash
[root@linuxcool ~]# journalctl -f
```

<br>

**<font color=red size=5>nmap	网络探测工具和安全和端口扫描器</font>**

详情请看：👉[Linux—nmap、nc命令 –网络探测工具和安全和端口扫描器](https://blog.csdn.net/liu_chen_yang/article/details/123678349)👈

**<font color=teal>语法格式：</font>**
>nmap [参数]

**<font color=teal>常用参数：</font>**
|  |  |
|--|--|
|--traceroute|	扫描主机端口并跟踪路由
|-p|	扫描指定端口和端口范围
|-sP|	对目标主机进行ping扫描
|-A|	使用高级功能进行扫描
|-PE|	强制执行直接的ICMPping
|-sV	|探测服务版本信息
|-d	|增加调试信息地输出
|-PU|	发送udp ping
|-ps	|发送同步（SYN）报文

**<font color=teal>参考实例：</font>**

扫描主机并跟踪路由：

```bash
[root@linuxcool ~]# nmap --traceroute www.linuxcool.com
```

使用-p参数探测80、443端口：

```bash
[root@linuxcool ~]# nmap -p80,443 www.linuxcool.com
```

探测服务器的1-10000端口范围：

```bash
[root@linuxcool ~]# nmap -p1-10000 www.linuxcool.com
```

使用-A参数进行高级扫描：

```bash
[root@linuxcool ~]# nmap -A www.linuxcool.com
```

<br>


**<font color=red size=5>nc	端口扫描 – 设置路由</font>**

详情请看：👉[Linux—nmap、nc命令 –网络探测工具和安全和端口扫描器](https://blog.csdn.net/liu_chen_yang/article/details/123678349)👈

**<font color=teal>语法格式：</font>**
>nc [参数]

**<font color=teal>常用参数：</font>**
|  |  |
|--|--|
|-l	|使用监听模式，管控传入的资料
|-p|	设置本地主机使用的通信端口
|-s	|设置本地主机送出数据包的IP地址
|-u	|使用UDP传输协议
|-v	|显示指令执行过程
|-w	|设置等待连线的时间
|-z	|使用0输入/输出模式，只在扫描通信端口时使用

**<font color=teal>参考实例：</font>**

扫描80端口：

```bash
[root@linuxcool ~]# nc -nvv 192.168.3.1 80
```

扫描UDP端口：

```bash
[root@linuxcool ~]# nc -u -z -w2 192.168.0.1 1-1000
```

扫描TCP端口：

```bash
[root@linuxcool ~]# nc -v -z -w2 192.168.0.3 1-100
```

<br>


**<font color=red size=5>history	查看历史记录</font>**

详情请看：👉[Linux—history命令 –– 查看与操纵历史命令](https://blog.csdn.net/liu_chen_yang/article/details/123678773)👈


**<font color=teal>语法格式：</font>**
>history [参数] [目录]

**<font color=teal>常用参数：</font>**
|  |  |
|--|--|
|-a|	将当前shell会话的历史命令追加到命令历史文件中,命令历史文件是保存历史命令的配置文件
|-c|	清空当前历史命令列表
|-d|	删除历史命令列表中指定序号的命令
|-n	|从命令历史文件中读取本次Shell会话开始时没有读取的历史命令
|-r	|读取命令历史文件到当前的Shell历史命令内存缓冲区
|-s	|将指定的命令作为单独的条目加入命令历史内存缓冲区。在执行添加之前先删除命令历史内存缓冲区中最后一条命令
|-w|	把当前的shell历史命令内存缓冲区的内容写入命令历史文件
|!num|num值是执行history前面显示的行号，也称历史记录号；&emsp;	直接执行选择的命令

**<font color=teal>参考实例：</font>**

查看所有的历史记录：

```bash
[root@linuxcool ~]# history
```

显示最近的10条命令：

```bash
[root@linuxcool ~]# history 10  
```

将本次登录的命令写入历史文件中：

```bash
[root@linuxcool ~]# history -w
```

将命令历史文件中的内容读入到目前shell的history记忆中 ：

```bash
[root@linuxcool ~]# history -r  
```

将当前Shell会话的历史命令追加到命令历史文件中：

```bash
[root@linuxcool ~]# history -a  
```

清空当前历史命令列表：

```bash
[root@linuxcool ~]# history -c 
```

执行已经执行过又想执行的命令：

```bash
[root@linuxcool ~]# history
    1  ls
    2  vim a
    3  ls
    4  journalctl -d
    5  journalctl -b
[root@linuxcool ~]# !3
abc 123 lcy linux history ml ss 
dd laks 111 vi go sl sd fsg a
```
<br>


**<font color=red size=5>补充：</font>**
><font color=teal>chage -d 0 用户名	首次登录设置密码</font>



