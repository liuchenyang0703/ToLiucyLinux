---
title: 【Linux】 shell脚本的创建及使用 《入门到实践》详解（ 建议收藏 ）
icon: circle-info
order: 1
category:
  - Linux
  - shell
tag:
  - Linux
  - shell
  - 运维
pageview: false
date: 2024-12-17
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412171030664.png)


>🍁**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>

## shell脚本简介
shell 用户与内核沟通的桥梁
### shell的分类：
- 第一类：bash sh csh
- 第二类：ksh 
### shell脚本的好处：
将命令按照一定顺序保存到文件中，统一执行
- 解决重复性的工作
- 可以避免一些低级错误
### 一些语言的脚本后缀
- perl-->.pl
- python-->.py
- php-->.php
- shell-->.sh
### 编程语言分类：
---
- 编译型 C C++	
- 解释型 python shell php
- --
- 面向对象 python java C++	
- 面向过程 shell C
- --
- 静态语言：java C	
- 动态语言：shell python
- --
- 强类型：java python		
- 弱类型：shell C
- ---
###  shell脚本的固定书写
- 创建shell脚本
```bash
#直接进入并写脚本，会自动创建
vim first.sh

#手动创建
touch first.sh
```
- #！/bin/bash-->幻数，指定解释器，在每次的shell脚本中的最顶行写
- \# 为注释符
- echo "Hello world!"	可执行代码，输出Hello world!

### 如何执行shell脚本
- bash 文件名或着sh 文件名直接执行脚本，此时不需要加执行权限（bash first.sh/sh first.sh）

```bash
bash first.sh
&&
sh first.sh
```

- 相对路径或绝对路径执行脚本，此时必须加执行权限（./first.sh）

```bash
./first.sh
```

- source执行 在当前shell下执行脚本（source first.sh）

```bash
source first.sh
```
推荐使用`sh first.sh`。

## shell脚本变量
>变量：用字符串表示一个值，用于存储值的位置，这个字符串叫变量名
>&emsp;
>定义变量：变量名=变量值&emsp;&emsp;	python=\$(ps -ef | grep -v grep | grep python | wc -l)
调用变量：$变量名	&emsp;&emsp;&emsp;&emsp;&emsp;	echo $python
删除变量：unset 变量名&emsp;&emsp;&emsp;unset &python		
&emsp;						
<font color=red>在shell调用一个未赋值的变量，不会报错，会返回空值；</font>

- 变量是临时保存在内存中
- set	查看系统所有的变量

### 变量的命名规则：
- 1.变量名要有意义。不要使用a,b,c
- 2.可以采用驼峰式命名或_隔开的方式
- 3.命名时应该避开系统的关键字
- 4.对于常量采用全部大写表示

### shell中变量的分类：
- 预定义变量 
- 位置变量
- 环境变量 
- 自定义变量

><font color=gree>预定义变量：</font>shell中预先设置好的变量，可以直接调用
>&emsp;
>举例：
>就比如我定义一个变量是查找python的进程数量
>pyj=\$(ps -ef | grep -v grep | grep python | wc -l)
>调用的时候这样调用echo <font color=red>$pyj</font>
> 

> <font color=gree>位置变量：</font>脚本传递的位置参数，默认可以使用$1-$9，不交互传参 
> - $0	保存脚本执行的路径 
> - $#	保存脚本处理的 参数个数
> - $*	保存脚本处理的所有参数，把参数作为整体进行保存 
> - $@	保存脚本处理的所有参数，把参数作为个体进行保存
> - \$\$	保存脚本的PID
> - $?	保存上一条命令执行的状态0代表成功，其他代表不成功（常用）
> - $_	保存上一条命令的参数

><font color=gree>环境变量：</font>
env	查看系统环境变量

><font color=gree>自定义变量：</font>默认直在当前shell生效，如果想在其新打开的shell下也生效，可以使用export将变量导出
export 变量名=变量值
变量名=变量值，export变量名
> 
> /etc/bashrc 
> /etc/profile
> 
> ~/.bashrc 
> ~/.bash_profile
> 
> 当打开终端时，会默认去读取系统中环境变量设置的文件 /etc/profile

## shell脚本的计算
### (( ))	只能做整数计算
>- +加 
>- -减
>-  *乘
>-   /除
> -   %余
>-    2**5二的五次方

实例：
```bash
#!/bin/bash
#加法
jia=$((1+1))
echo $jia

#减法
jian=$((5-2))
echo $jian

#乘法
cheng=$((3*3))
echo $cheng

#除法
chu=$((18/3))
echo $chu

#余数
yu=$((13%2))
echo $yu

#2的3次方
ci=$((2**5))
echo $ci
```
结果为：

```bash
[root@cs ~]# sh cs.sh
2
3
9
6
1
32
```

### []只能做整数计算（和(())一样）
实例：
```bash
#!/bin/bash
abc=$[ 1 + 4 ]
echo $abc
```
结果为：

```bash
5
```

### expr	只能做整数计算（可用于判断是否为整数）
>加、减、乘、除、余、次方都可以
<font color=red>使用expr来做计算，计算单位前后都要加空格</font>
```bash
#!/bin/bash
expr 10 + 20
```
结果为：30

---

也可以用来判断以上结果是否为整数；实例：
（这个可以先看看，后面会教if判断的。）

```bash
#!/bin/bash

#交互方式输入数字
read -p "please input is number:" number

#判断是否为整数
expr 10 + $number &>/dev/null

#如果为整数就会返回0，如果不是会返回其他，并打印出来。
if [ $? -ne 0 ];then
	echo "${number}不是合法整数"
	exit 1
else
	echo "${number}是整数"
fi

```

### bc	计算器（可小数点）

```bash
echo "3+5"| bc	不交互计算=8

#2为要保留的小数点位数
echo "scale=2;3/5" | bc	保留两位小数=.60
```

### let	整数计算，与(( ))一样
原本a=10，let a++ ，在执行一次ehco $a就=11了

```bash
#!/bin/bash

a=10
let a++ 
echo $a

结果为11
```

主要用于while循环中，变量自增赋值# shell脚本的内置命令

## 内置命令
### echo
>echo 	将指定内容输出到屏幕上，通常打印变量值，默认是换行打印

echo 参数：
- -n	不换行打印
- -e	解释转义字符

（这两个用于echo之后，输出文字之前使用，例如：echo -e "\e[5;44;30mabcabc\e[0m"）

常见的转义字符：
- \a	响铃
- \n	换行
- \r	回车
- \t	水平制表符（tab）
- \v	垂直制表符
- \b	删除前一个字符

(用于输出文字内使用，例如：echo -e "123\n332"换行)

单引号和双引号的区别：

- 单引号：所见即所得（意思是：看到的是什么，输出的就是什么）；
- 双引号：可以解释$引用的变量

>$()等于 \``	优先执行里面的指令，一般用于设置变量
>pyj=\$(ps -ef | grep -v grep | grep python | wc -l)
>pyj2=\`ps -ef | grep -v grep | grep python | wc -l`

利用echo输出带颜色的内容：

```bash
#使用方法
echo -e "\e[字体控制颜色；字体背景颜色；文字颜色m 字符串\e[0m"
#实例：（输出一个闪烁的；字体背景颜色为蓝色；字体颜色为黑色的abcabc）
echo -e "\e[5;44;30mabcabc\e[0m"
#输出一个字体颜色为绿色的abcabc
echo -e "\e[32mabcabc\e[0m"
```
>常见的字体颜色：重置=0，黑色=30m，红色=31m，绿色=32m，黄色=33m，蓝色=34m，紫色=35m，青色=36，白色=37m。
>&emsp;
常见的背景颜色：重置=0，黑色=40，红色=41，绿色=42，黄色=43，蓝色=44，紫色=45，青色=46，白色=47。
>&emsp;
字体控制选项：1=高亮，2=一半亮度（暗色），3=斜体，4=下划线，5=闪烁，7=反显，8=隐藏。
>&emsp;
注:因为需要使用特殊符号，所以需要配合-e选项来识别特殊符号。

echo 注意事项：
>在使用echo命令时，如果输出内容中含有！,不可以使用双引号，只可以使用单引号，因为默认!的作用是调用历史命令记录，除非使用set +H关闭历史命令引用。
set +H	关闭历史命令引用
### read
>read命令	从标准输入读取内容

read命令参数：
- -p	打印提示
- -t	指定超时时间
- -s	不显示屏幕输入的内容（主要用于输入密码之类的）

在firest.sh中写
例如：

```bash
#提示请输入您的姓名：输入完成之后回车即可，该name变量可在其他地方调用
read -p "请输入您的姓名："  name
echo $name

#提示请输入您的姓名，五秒之内不输入就会自动退出会话，输入完成之后回车即可，该name变量可在其他地方调用
read -t 5 -p "请输入您的姓名："  name
echo $name

#提示请输入您的姓名，五秒之内不输入就会自动退出会话，输入的时候不显示你输入的内容，输入完成之后回车即可，该name变量可在其他地方调用
read -t 5 -s -p "请输入您的姓名："  name
echo $name
```

如果read后没有指定变量名，默认会将参数值传递给REPLY
##  shell脚本流程控制语句
### 条件测试（前后都要有空格）

test 条件 或 [ 条件 ]

```bash
test anaconda-ks.cfg
[ -f anaconda-ks.cfg ]
```
### 文件测试（[]前后都要有空格）
- -f	判断是否为文件

```bash
[ -f anaconda-ks.cfg ]
```

- -d	判断是否是目录

```bash
[ -d /dir1 ]
```

- -e	判断文件或目录是否存在

```bash
[ -e anaconda-ks.cfg ]
```

- -b	判断是否为设备文件
```bash
[ -b anaconda-ks.cfg ]
```
- -l	判断是否为链接文件
```bash
[ -l anaconda-ks.cfg ]
```
- -e	判断一个文件是否为空文件
```bash
[ -e anaconda-ks.cfg ]
```
### 整数测试（常用于if判断中）
- -eq	等于
- -ne	不等于
- -gt	大于
- -lt	小于
- -ge	大于等于
- -le	小于等于

(( ))	可以直接使用符号比较大小

```bash
#等于1
if [ $a -eq 1 ]

#不等于1
if [ $a -ne 1 ]

#大于1
if [ $a -gt 1 ]

#小于1
if [ $a -lt 1 ]

#大于等于1
if [ $a -ge 1 ]

#小于等于1
if [ $a -le 1 ]
```
### 字符串测试（常用于if判断中）
- ==		等于
- ！=	不等于
- -z	判断字符串是否为空

```bash
#等于“测试”
if [ "$a" == "测试" ]

#不等于“测试”
if [ "$a" != "测试" ]

#判断$a参数是否为空
if [ -z "$a" ]
```


### 逻辑关系
- &&	与/并且
- ||	或
- !	非

```bash
#判断1不等于1，成立输出0，不成立输出1
[ 1 -ne 1 ] && echo 0 || echo 1	
```

## shell中字符串操作

### 求变量字符串长度：
- 1.echo ${#变量名}

```bash
#!/bin/bash

a=12345678
echo ${#a}
```
输出结果为：<font color=red>8</font>


- 2.echo $变量名 | wc -L

```bash
#!/bin/bash

a=12345678
echo $a | wc -L
```
输出结果为：<font color=red>8</font>


- 3.expr length $变量名

```bash
#!/bin/bash

a=12345678
expr length $a
```
输出结果为：<font color=red>8</font>
- 4.echo $变量名 | awk '{print length($0)}'

```bash
#!/bin/bash

a=12345678
echo $a | awk '{print length($0)}'
```
输出结果为：<font color=red>8</font>

### 变量字符串的截取：
- echo ${变量名:3}	截取字符串的前三个丢弃

```bash
#!/bin/bash

a=12345678
echo ${a:3}
```
结果为：<font color=red>45678</font>

- echo ${变量名:3:2}	截取字符串的前三个丢弃，后面只要两个字符串，其余都不要了

```bash
#!/bin/bash

a=AAABBBCCC123aaabbbccc
echo ${a:3:2}
```

结果为：<font color=red>BB</font>

---

- echo ${变量名#A*C}	截取字符串的第一个A到第一个C（包含C）并丢弃；从头开始，最少匹配删除

```bash
#!/bin/bash

a=AAABBBCCC123aaabbbccc
echo ${a#A*C}
```
结果为：<font color=red>CC123aaabbbccc</font>


- echo ${变量名##A*C}	截取字符串的第一个A到最后一个C（包含C）并丢弃；从头开始，最多匹配删除

```bash
#!/bin/bash

a=AAABBBCCC123aaabbbccc
echo ${a##A*C}
```

结果为：<font color=red>123aaabbbccc</font>

---
- echo ${变量名%b*c}	截取字符串的最后一个b到最后一个c（包含c）并丢弃；从结尾开始，最少匹配删除

```bash
#!/bin/bash

a=AAABBBCCC123aaabbbccc
echo ${a%b*c}
```

结果为：<font color=red>AAABBBCCC123aaabb</font>
- echo ${变量名%%C*c}	截取字符串的最第一个C到最后一个c（包含c）并丢弃；从结尾开始，最多匹配删除

```bash
#!/bin/bash

a=AAABBBCCC123aaabbbccc
echo ${a%%C*c}
```

结果为：<font color=red>AAABBB</font>

### 变量字符串的替换：
- echo ${变量名/A/a}	将变量内容匹配的第一个字符替换

echo ${变量/old/new}	
```bash
#!/bin/bash

a=AAABBBCCC123aaabbbccc
echo ${a/C/c}
```

结果为：<font color=red>AAABBBcCC123aaabbbccc</font>

- ehco ${变量名//A/a]	将变量内容匹配的所有字符替换

echo ${变量//old/new}	
```bash
#!/bin/bash

a=AAABBBCCC123aaabbbccc
echo ${a//C/c}
```

结果为：<font color=red>AAABBBccc123aaabbbccc</font>

### cut字符串切割

- -d	自定义分隔符
- -f	与-d一起使用，指定显示那个区域

```bash
echo "192.168.2.10"|cut -d "." -f 1		#结果为192
echo "192.168.2.10"|cut -d "." -f 2		#结果为168
echo "192.168.2.10"|cut -d "." -f 3		#结果为2
echo "192.168.2.10"|cut -d "." -f 4		#结果为10
```
## shell脚本数组
### 定义数组：

```bash
array=(值1 值2 值3)
```
实例：

```bash
#!/bin/bash

array=(xiaoming xiaohong xiaolan)
```
### 数组的增删改查：
#### 查：

- echo ${array[*]}或者echo ${array[@]}	打印数组中所有的值

```bash
#!/bin/bash

array=(xiaoming xiaohong xiaolan)
echo ${array[*]}
echo ${array[@]}
```
>结果为：
<font color=red>xiaoming xiaohong xiaolan
xiaoming xiaohong xiaolan</font>

- echo ${array[1]}	打印数组中指定的值

<font color=gree>注意：数组是从0开始算的；</font>

```bash
#!/bin/bash

array=(xiaoming xiaohong xiaolan)
echo ${array[0]}
echo ${array[1]}
echo ${array[2]}
```
>结果为：
<font color=red>xiaoming
xiaohong
xiaolan</font>


- echo ${#array[*]} 	求数组的长度
- echo ${#array[@]} 求数组的长度
```bash
#!/bin/bash

array=(xiaoming xiaohong xiaolan)
echo ${#array[*]}
echo ${#array[@]}
```
>结果为：
<font color=red>3
3
</font>

- echo ${#array[1]} 	求数组中的某一个字符串的长度

```bash
#!/bin/bash

array=(xiaoming xiaohong xiaolan)
echo ${#array[0]}
echo ${#array[1]}
echo ${#array[2]}
```
>结果为：
<font color=red>8
8
7</font>

#### 增：

>array[3]=xiaohuang	给指定的位置加一个值

```bash
#!/bin/bash

array=(xiaoming xiaohong xiaolan)
array[3]=xiaohuang
echo ${array[3]}
echo ${array[*]}
```
>结果为：
<font color=red>xiaohuang
xiaoming xiaohong xiaolan xiaohuang
</font>

#### 改：
>array[3]=xiaocheng	如果脚标对应位置有值，就修改；脚标可以不是数字array[脚标]

```bash
#!/bin/bash

array=(xiaoming xiaohong xiaolan)
array[2]=xiaohei
echo ${array[2]}
echo ${array[*]}
```
>结果为：
<font color=red>xiaohei
xiaoming xiaohong xiaohei
</font>
#### 删：
>unset array	删除指定数组（array数组名称）
unset array[3]	删除指定位置的值

```bash
#!/bin/bash

array=(xiaoming xiaohong xiaolan)
#修改第二个姓名
array[2]=xiaohei
#删除第三个姓名
unset array[2]
echo ${array[2]}
echo ${array[*]}
```
>结果为：
<font color=red>空
xiaoming xiaohong</font>

## 相关文章：

|文章名|文章地址 |
|:--|:--|
|[【Linux】 shell脚本的创建及使用 《入门到实践》详解[⭐建议收藏！！⭐]](https://liucy.blog.csdn.net/article/details/130111812)|[https://liucy.blog.csdn.net/article/details/130111812](https://liucy.blog.csdn.net/article/details/130111812)|
| [【Linux】Shell脚本之函数的操作+实战详解[⭐建议收藏！！⭐]](https://liucy.blog.csdn.net/article/details/130387377) |[https://liucy.blog.csdn.net/article/details/130387377](https://liucy.blog.csdn.net/article/details/130387377)  |
|[【Linux】Shell脚本之 if判断、case判断、for循环、while循环 + 实战详解[⭐建议收藏！！⭐]](https://liucy.blog.csdn.net/article/details/130387523)|[https://liucy.blog.csdn.net/article/details/130387523](https://liucy.blog.csdn.net/article/details/130387523)|
