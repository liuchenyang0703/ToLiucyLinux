---
title: 【Linux】安装杀毒软件(漏洞扫描工具)ClamAV 并配置邮件告警操作指南
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

>🍁**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>

### ClamAV简介
>ClamAV是Linux操作系统一款<font color=green>免费的杀毒工具</font>，可以通过命令执行病毒库升级、查找病毒和删除病毒。<font color=green>ClamAV属于免费开源产品，支持多种平台，如：Linux/Unix、MAC OS X、Windows、OpenVMS。</font>
>&emsp;
>ClamAV是基于病毒扫描的命令行工具，但同时也有支持图形界面的ClamTK工具。
>&emsp;
>ClamAV主要用于邮件服务器扫描邮件。它有多种接口从邮件服务器扫描邮件，支持文件格式有如：ZIP、RAR、TAR、GZIP、BZIP2、HTML、DOC、PDF,、SIS CHM、RTF等等。
>&emsp;
>ClamAV可以自动升级病毒库，还可以从共享库中运行。

**clamav 有两个命令：clamdscan、clamscan：**
- clamscan 命令：通用，<font color=orange>不依赖服务</font>，命令参数较多，<font color=red>执行速度稍慢</font>
- clamdscan 命令：是一个<font color=orange>搭配clamd常驻服务</font>的扫毒工具，功能非常类似clamscan，<font color=green>执行效率较高</font>，但是可用的参数较少（因为部分功能是由 clamd 控制的）。<font color=red>不用带 -r ，默认会递归扫描子目录</font>

### ClamAV的安装
centos安装方式：
```bash
#添加扩展源
yum -y install epel-release
yum -y install clamav clamavd clamav-update
```
ubuntu安装方式：
```bash
#升级apt源
apt update
apt -y install clamav clamtk clamav-daemon clamdscan device-tree-compiler
```
### 更新病毒库
```bash
freshclam
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181438396.png)

这样就是更新成功了；

<font color=red>如遇到报错，可参考报错： </font> [clamav升级问题报错2：Can‘t query current.cvd.clamav.net](https://liucy.blog.csdn.net/article/details/129284185)

### ClamAV的使用
#### ClamAV的语法
```bash
clamscan [选项/参数/简便参数] [文件/目录]
```
#### ClamAV常用参数
|参数|简便参数|说明|
|---|---|---|
|--help|-h|显示帮助页面|
|--version|-V|查看版本号|
|--verbose |-v|查看详细信息|
|--archive verbose|-a|在扫描的存档中显示文件名|
|--recursive[=yes/no(*)]| -r|递归扫描子目录，后面需跟目录|
| --infected|-i|仅打印已感染的文件|
|--log=FILE|-l|将扫描报告保存到文件中，后面需跟文件名|
|--file-list=FILE|-f|从file扫描文件，后面需跟文件名|
|--database=FILE/DIR|-d|FILE/DIR从FILE加载病毒数据库或从DIR加载所有支持的数据库文件|
|--allmatch[=yes/no(*)]|-z|找到匹配项后继续在文件中扫描|
|--quiet||仅输出错误消息|
|--tempdir=DIRECTORY||在目录中创建临时文件|
|--leave-temps[=yes/no(*)]||不删除临时文件|
|--gen-json[=yes/no(*)] ||生成扫描文件的json描述并打印|
| --remove[=yes/no(*)]||删除受感染的文件，小心使用|
|--max-dir-recursion=num||目录深度，=5是扫描最高5层目录结束|

#### ClamAV的用法
##### 扫描病毒
```bash
#对/data/目录扫描，并将扫描的日志放到该文件中
clamscan -i -r /data/ -l ./clamav.log
```
- -i	只显示被感染的文件
- -r	扫描目录，后面需跟目录
- -l	保存日志文件的位置，后面需跟文件名

注意：上述命令仅扫描病毒，不会对病毒文件进行删除，需手动删除。目录越大扫描速度越慢。

扫描结果如下：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181438378.png)

这种的是没有病毒；<font color=red>Infected files</font> 显示0，则没有扫到病毒，1或其他则扫出了病毒。

> Known viruses	&emsp;	&emsp;&emsp;&emsp;#已知病毒
>Engine version	&emsp;&emsp;	&emsp;&emsp;#发动机版本
>Scanned directories&emsp;	&emsp;#扫描的目录
>Scanned files	&emsp;	&emsp;#扫描的文件
>Infected files&emsp;	&emsp;	&emsp;#受感染的文件
>Data scanned	&emsp;	&emsp;#扫描数据
>Data read	&emsp;&emsp;&emsp;	&emsp;#数据读取
>Time	&emsp;&emsp;&emsp;&emsp;&emsp;	&emsp;#时间
>Start Date	&emsp;&emsp;&emsp;	&emsp;#开始日期：
>End Date	&emsp;&emsp;&emsp;	&emsp;#结束日期

##### 扫描病毒并自动删除病毒

```bash
#对/data/目录扫描，并将扫描的日志放到该文件中，有病毒则自动删除
clamscan -i -r /data/ --remove=yes -l ./clamav.log
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181438883.png)

删除完可以再去哪个目录看看。

##### 创建日志保存路径
后续可以将病毒扫描结果保存到/var/log/clamav/ 文件夹下。
```bash
mkdir -p /var/log/clamav/
```
扫描/home/下是否有病毒；目录越大扫描速度越慢。

```bash
clamscan -i -r /home/ -l /var/log/clamav/clamav.log
```

## 安装配置邮件服务
安装邮件服务可参考： [【Linux】部署mailx服务及发送邮件告警](https://liucy.blog.csdn.net/article/details/129257050) 

## 配置定时扫描和邮件告警
ClamAV扫描邮件告警脚本可以选择下载也可以选择直接复制，不下载的希望多一个浏览量，谢谢蟹蟹；

ClamAV扫描邮件告警脚本：[ClamAV病毒扫描之邮件告警脚本
](https://download.csdn.net/download/liu_chen_yang/87522380)

ClamAV扫描邮件告警脚本：
>ClamAV病毒扫描之邮件告警脚本，里面内容可根据自己的情况自行修改。
自行修改的内容有：
&emsp;&emsp;mail 邮件收件人
&emsp;&emsp;要扫描的路径（默认为/根目录）
&emsp;&emsp;日志存储的路径（默认为/var/log/clamav/）<br>
&emsp;&emsp;还有就是最后的if判断那边也要记得修改自己的邮件收件人，判断三个都要改。
&emsp;&emsp;如果是一个人的话，可以直接写邮箱地址；如果是多个人的话在判断后面改为$mail_A，然后把需要通知的人写到最上面的mail_A环境变量中
```bash
#!/bin/bash
freshclam   ##病毒库更新

mail_A=(mail1@qq.com,mail2@qq.com,mail3@163.com) ## 邮件收件人，可批量

# 获取当前时间（用于创建、读取日志文件）
date=`date +%Y%m%d-%H:%M:%S`

# *填写扫描路径（可根据自己的情况来自定义，默认为/根目录）
clpath="/"

# *填写要存储日志的路径（可根据自己的情况来自定义，默认为/var/log/clamav/）
clamav_log="/var/log/clamav"


# 判断是否有存储日志的目录，如果没有则先创建，为了下面的存放日志而创建
if [ -e $clamav_log ];then
        echo "有这个目录" > /dev/null
else
        echo "没有这个目录" > /dev/null
        mkdir -p $clamav_log
fi

#扫描/目录 结果打印到$clamav_log/clamav$date.log
clamscan -r -i $clpath -l $clamav_log/clamav$date.log
#删除WARING开头的内容
sed -i  '/^WARNING/d' $clamav_log/clamav$date.log
#删除第一行到第三行的内容
sed -i '1,3d' $clamav_log/clamav$date.log

##获取当前服务器ip ，可以先执行这条命令看看自己的ip对不对。
ip=`hostname -I | awk -F " " '{print $1}'`
#echo $IP

data_log=""
while read line
do
#  data_log+=$line"<br>"
  data_log+=$line"\n"
done < $clamav_log/clamav$date.log

##获取高危病毒的个数
infected_files=$(cat $clamav_log/clamav$date.log | grep "Infected files" | awk -F ": " '{print $2}')
##获取执行时的时间
scan_time=$(cat $clamav_log/clamav$date.log | grep "Start Date" | awk -F ": " '{print $2}')

data_log=${data_log/SCAN SUMMARY/扫描结果}
data_log=${data_log/Known viruses/病毒库数量}
data_log=${data_log/Engine version/引擎版本} 
data_log=${data_log/Scanned directories/已扫描目录} 
data_log=${data_log/Scanned files/已扫描文件} 
data_log=${data_log/Infected files/已发现病毒文件} 
data_log=${data_log/Total errors/错误总数}
data_log=${data_log/Data scanned/已扫描数据} 
data_log=${data_log/Data read/读取数据} 
data_log=${data_log/Time/扫描时长} 
data_log=${data_log/Start Date/开始时间} 
data_log=${data_log/End Date/结束时间} 


body="杀毒软件 ClamAV 在$scan_time   对您的服务器$ip进行了扫描，扫描的路径为：$clpath，扫描结果：暂未发现病毒！"
body2="杀毒软件 ClamAV 在$scan_time   对您的服务器$ip进行了扫描,扫描的路径为：$clpath，扫描结果：发现有$infected_files个高危病毒 ；请立即登录服务器处理！详情可见附件↓ "

log2="杀毒软件 ClamAV 在$scan_time   对您的服务器$ip进行了扫描,扫描的路径为：$clpath，扫描结果：发现有$infected_files个高危病毒 ；病毒为：\n$data_log\n请立即登录服务器处理！！！"
echo -e "$log2" > ./${ip}_clamav.txt

if [ "$infected_files" -eq "0" ];then
	echo $body | mail -s "$(echo -e "$ip \r服务器病毒处理通知-无病毒")"  mail1@qq.com
elif [ "$infected_files" -gt "0" ];then
	echo $body2 | mail -a ./${ip}_clamav.txt -s "$(echo -e "$ip \r服务器病毒处理通知-有 $infected_files 个高危病毒")"  mail1@qq.com
else
	echo $body2 | mail -s "$ip :此次查询失败，请检查日志！" mail1@qq.com
fi

#$mail_A  ##收件人地址
```

<font color=red>注：该脚本只适用于clamscan命令，并不适用于clamdscan命令。</font>



### 发送邮件告警样式演示：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181438162.png)

**显示内容：**

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181438066.png)


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181438147.png)

### 删除病毒方式
>方式一：扫描到病毒可以手动删除，进入病毒目录直接删除就可以；
>&emsp;
>方式二：也可以找到病毒目录，再次执行扫描病毒命令并指定病毒所在目录，`clamscan -i -r /data/ --remove=yes -l ./clamav.log` 来实现删除病毒；
### 配置定时扫描
配置定时扫描也就是设置周期性计划任务

> <font color=red>提示：</font>
> 如果是只扫描某一个路径下的，可以一天扫一次就行；
> 如果是直接扫根目录，建议一周扫一次。

```bash
vim /etc/crontab

#以用户root身份定时执行脚本，sh为执行命令，/data/----为脚本绝对路径；每天凌晨4点扫描一次
0 4 * * * root /bin/sh /data/clamav/clamav.sh

###每周日凌晨1点clamav扫描漏洞（扫描根目录推荐）
0 1 * * 7   root /bin/sh /home/clamav/clamav.sh
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181438417.png)


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181438711.png)

配置完成之后保存退出即可。

### 附加：升级ClamAV报错解决方式及相关文章
|文章名  | 文章链接🔗 |
|:--|:--|
|[clamav升级问题报错2：Can‘t query current.cvd.clamav.net](https://liucy.blog.csdn.net/article/details/129284185)  |[https://liucy.blog.csdn.net/article/details/129284185](https://liucy.blog.csdn.net/article/details/129284185)  |
|[【Linux】部署mailx服务及发送邮件告警](https://liucy.blog.csdn.net/article/details/129257050)|[https://liucy.blog.csdn.net/article/details/129257050](https://liucy.blog.csdn.net/article/details/129257050)|
|[ClamAV病毒扫描之邮件告警脚本](https://download.csdn.net/download/liu_chen_yang/87522380)|[https://download.csdn.net/download/liu_chen_yang/87522380](https://download.csdn.net/download/liu_chen_yang/87522380)|





