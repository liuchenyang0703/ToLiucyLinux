---
title: Linux三剑客grep、sed、awk的使用、介绍及正则表达式使用、介绍
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - Linux三剑客
  - 运维
pageview: false
date: 2024-12-19
comment: false
breadcrumb: false
---

## ❀grep sed awk命令以及正则表达式


### <font color=red>grep</font>

**<font color=green>语法：</font>**
>grep 【选项】 '内容'   文件名


|grep	| 以行为单位过滤 |
|------------|--|
|       -i     | 不区分大小写 |
|-v	|  取反|
|-w|以单词为单位进行过滤|
|  -B| 指定行数，过滤指定内容以及上几行 |
|-A| 指定行数，过滤指定内容以及下几行 |
|-C|指定行数，过滤指定内容以及上下各几行|
| -o | 只输出过滤的内容 |
|-c| 统计过滤的行数 |
| -n |显示行号  |
|-q| 用于if逻辑判断      安静模式，不打印任何标准输出。如果有匹配的内容则立即返回状态值0。|
|-E|使用扩展正则

grep -q 用法

```bash
grep -q 参数[索要查找的内容] 文件名
```

用法1：
```bash
[root@localhost ~]# cat a.txt            ## 测试数据
d e j
s q u
z c b

[root@localhost ~]# grep "s" a.txt       ## 直接输出匹配结果
s q u

[root@localhost ~]# echo $?              ## 输出0表示匹配成功
0

[root@localhost ~]# grep -q "s" a.txt    ## -q选项表示静默输出

[root@localhost ~]# echo $?
0
```
用法2：
```bash
[root@localhost ~]# cat a.txt            ## 测试数据
nihao 
nihaooo
hello

[root@localhost ~]# if  grep -q hello a.txt ; then echo yes;else echo no; fi 
yes

[root@localhost ~]# if grep -q word a.txt; then echo yes; else echo no; fi
no
```

**<font color=red>正则表达式：</font>**

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


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191618506.png)

### <font color=red>sed</font>


**<font color=green>语法：</font>**
> sed [选项] ‘[操作地址]sed内置操作’ 文件

**<font color=orange>常用选项</font>**
|sed| 流文件处理工具 |
|--|--|
|  -n|  只输出处理的行|
|-i| 修改文件内容，编辑文件 |
|-e|指定多个sed内置操作，现在不常用，多个sed内置操作可以使用分号隔开|
| -r |  支持扩展正则表达式|

**<font color=orange>操作地址</font>**
|  |  |
|--|--|
|  2|	代表处理文件的第2行
|1,5	|代表处理文件的第1到5行
|1;5	|代表处理文件的第1行和第5行
|1~2	|代表指定步长为2，处理的是1,3,5…行
|2,~2	|代表处理文件的第2行开始，到2的倍数行结束。（2,~2=2,4 ;4,~4=4,8行）
|4,$	|代表处理文件第4行到最后一行
|1,+2|	代表处理文件的第1行到第1+2行，也就是1到3行

**<font color=bright magenta>举例：</font>**

> sed -n '2p' a.txt <font color=blue>**打印第二行** **(2)**</font>
sed -n '2,5p' a.txt <font color=blue>**打印第二行到第五行(2,3,4,5)** </font>
sed -n '2p;5p' a.txt <font color=blue>**打印第二行和第五行(2,5)**</font>
sed -n '3,$p' a.txt <font color=blue> **打印第三行到最后一行(3,4,5,6,7,8,9,10)**</font>
sed -n '1~2p' a.txt <font color=blue>**打印指定步长为2，所以打印的是1、3、5、7......行 (1,3,5,7,9)**</font>
sed -n '1,+2p' a.txt <font color=blue>**打印第1行到第1+2行，也就是1到3行(1,2,3)** </font>

```bash
#sed替换文本中的内容【sed -i "s/需要替换的内容/要替换成的内容/g" 要修改的文件名】
sed -i "s/123/999/g" abc.txt

#sed替换文本中的内容（变量形式）【sed -i "s/需要替换的内容/变量名/g" 要修改的文件名】
#注意：带入变量的时候“sed -i "s/123/999/g" abc.txt”这样写是不合法的，怎么解决呢？可以自定义分隔符就可以了。
sed -i "s|123|$num|g" abc.txt
```
<font color=red> 注意：带入变量的时候“sed -i "s/123/999/g" abc.txt”这样写是不合法的，怎么解决呢？可以自定义分隔符就可以了。</font>

**<font color=orange>内置操作</font>**
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

**<font color=bright magenta>举例：</font>**

> sed -i '2a abcabc' a.txt	 <font color=blue>**修改文件**</font>
sed '2a abcabc' a.txt <font color=blue>**输出一下但不修改文件**</font>
sed '3d' a.txt	 <font color=blue>**删除第三行**</font>
sed 's/abc/ABC/g' a.txt	 <font color=blue>**把a.txt中的所有abc修改成ABC**</font>
sed -n 'n,p' a.txt  <font color=blue>**(2,4,6,8,10)**</font>
sed -n 'N,p' a.txt  <font color=blue>**(1,2,3,4,5,6,7,8,9,10)**</font>
sed '3r a.txt' b.txt <font color=blue>	**把a.txt里面的数据放到b.txt的第三行的后面**</font>
sed '3,5w a.txt' b.txt	 <font color=blue>**把a.txt的第三行到第五行放到b.txt里面**</font>
sed -n '3!p' a.txt	 <font color=blue>**除了第三行其他都打印出来**</font>

在sed内置操作前加!，表示除了指定地址外，其余行执行该命令
s替换的两个特殊用法&和\1

使用正则：/字符或表达式/
想要查看更多的正则表达式就去👉[正则表达式（全）](https://blog.csdn.net/liu_chen_yang/article/details/123231302)👈

echo "http://www.baidu.com/1.mp3" | sed -r 's#(.*)//(.*)/(.*)#\2#'

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191618100.png)

### <font color=red>awk</font>

**<font color=green>语法：</font>**
> awk [选项] ‘BEGIN{command}匹配模式{command}END{command}’ 文件

**<font color=green>执行流程：</font>**

> 执行BEGIN{commands}语句块中的语句； 
> 从文件或标准输入中读取第1行； 
> 如果没有匹配模式，则执行{}中的语句；
> 若有匹配模式，则检查该整行与匹配模式是否匹配; 
> 若匹配, 则执行{}中的语句；
> 若不匹配则不执行{}中的语句,接着读取下一行；
> 重复这个过程, 直到所有行被读取完毕；
>  执行END{commands}语句块中的语句。

**<font color=green>awk格式书写：</font>**

> awk的指令一定要用单引号括起
awk的动作一定要用花括号括起
匹配模式可以是正则表达式、条件表达式或两种组合
如果模式是正则表达式要用/做分割符
多个动作之间用;号分开

**<font
 color=orange>内置操作</font>**
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

**<font color=bright magenta>awk进阶用法（内置）举例：</font>**

> awk 'END{print FILENAME}' dName.txt	 <font color=blue>**输出文件名加个END输出一个文件名，否则文件有多少行就输出多少个文件名**</font>
awk 'END {print ENVIRON["PATH"]}' dName.txt 	<font color=blue>**掉用系统中的环境变量**</font>
head -1 a.txt  | awk 'BEGIN{OFS="-"}{print $1,$2}'	 <font color=blue>**查看a.txt第一行,用内置分隔符OFS指定以-分割（1.1.1.1-11）**</font>
head -1 a.txt  | awk 'BEGIN{ORS="-"}{print $1,$2}'	 <font color=blue>**查看a.txt第一行,用内置分隔符ORS指定以-在最后面分割（1.1.1.1 11-）**</font>
awk 'length($0)==2 {print}' h.txt<font color=blue>	**如果h.txt里面有长度等于2的就输出**</font>
echo "abc123abc" | awk '{print toupper($0)}'	<font color=blue>**把abc换成ABC**</font>
echo "ABC123ABC" | awk '{print tolower($0)}'	<font color=blue>**把ABC换成abc**</font>


||  |
|-------------|--|
|      getline	       | 获取下一行 |
|split("字符串","数组名称","分隔符")	|按指定分隔符将字符串切割为数组
|length("字符串")	|求字符串长度
|sub("原字符","替换字符","字符串")	|默认替换一次，返回的是替换次数，该字符串内容 发生变化
|gsub		|		全局替换
|-F|	指定分隔符
|toupper|	小写换大写
|tolower|大写换小写
<br>

**<font color=bright magenta>举例：</font>**

> awk -F ":" 'END {print NR}' /etc/passwd	<font color=blue>**打印一共有多少行**</font>
>  awk -F ":" 'NR\==3{print}' /etc/passwd	<font color=blue>**打印第三行** </font>
>  awk -F ":" 'NR\==3 {print $2}'/etc/passwd	<font color=blue>**打印第三行第二段，以：为分隔符** </font>
>  awk 'NR<=3 {print }' /etc/passwd	<font color=blue>**打印前三行**</font>
>  awk 'NR\==3||NR==5 {print }' /etc/passwd	<font color=blue>**打印第三行和第五行**</font>

**<font color=red>时间函数：</font><font color=orange>**strftime()时间	systime()时间戳**</font>**

> awk 'BEGIN {print strftime()}'	<font color=blue> **输出年月日时分秒（四 3月  3 09:35:34 CST 2022）** </font>
>awk 'BEGIN {print strftime("%Y")}'<font color=blue> **输出年（2022）** </font>
>awk 'BEGIN {print strftime("%F")}'<font color=blue>  **输出年月日（2022-03-03）**</font>
> awk 'BEGIN {print strftime("%T")}'	<font color=blue> **输出时分秒（09:36:16）**</font>
>  awk 'BEGIN {print systime()}'	<font color=blue> **输出时间戳（1646271406）**</font>


**<font color=red>awk运算： </font>**

> echo a | awk '{print 1/3}'	<font color=blue> **小数 （0.33333）**</font>
> echo a | awk 'print int(1/3)'	<font color=blue>**整数（0）**</font>
> echo a | awk '{print int (1/3*100)}' **<font color=blue>向小数点后面移两位（33）</font>**

**<font color=red>占位符：</font>**
|  |  |
|--|--|
|%f	|输出小数
|%d|	输出整数
|%s|	输出字符串

**<font color=red>字符串格式化输出：</font>**

> echo a | awk '{printf "使用率为%.2f\n",(1/3)}'	**<font color=blue>输出(使用率为0.33) </font>**
> echo a | awk '{printf "使用率为%d\n",(1/3)}'	**<font color=blue>输出(使用率为0)  </font>**
>  echo a | awk '{printf "使用率为%s\n","xiaoming"}'	**<font color=blue>输出(使用率为xiaoming) </font>**


**<font color=red>查看内存占用率：</font>**

> free -m | awk 'NR==2 {printf  "当前使用率是%d%\n",int($3/$2*100)"%"}'	<font color=blue>**输出（当前使用率是12%）**</font>

**<font color=red>awk之if判断：</font>**

> awk '{if ($1=="识别完成") {print 1} else {print 0}}'
**<font color=blue>如果$1的值等于识别完成这四个字，就输出1，否则输出0；</font>**

**<font color=red>awk扩展正则：</font>**

> awk '$3~/^41/ {print $1,$2,$3}' b.txt	**<font color=blue>取第三行以41开头的输出姓，名，编号 </font>**
> 
> awk '$2~/^(D|X)/ {print $1,$2}' b.txt	**<font color=blue>取第二行以D或者X开头的名输出姓，名 </font>**
> 
> awk '/^\[\^#]/ {print $3}' /etc/fstab	**<font color=blue>取消以#号开头的行打印输出第三行 </font>**

想要查看更多的正则表达式就去👉[正则表达式（全）](https://blog.csdn.net/liu_chen_yang/article/details/123231302)👈


```bash
awk 'BEGIN{FS=":";print "ARGC="ARGC;for(k in ARGV) {print k"="ARGV[k]; }}' /etc/passwd

awk 'BEGIN{print ENVIRON["PATH"];}' /etc/passwd

awk 'BEGIN{OFMT="%.3f";print 2/3,123.11111111;}' /etc/passwd

awk '{tmp=$0;getline;print tmp"="$0}' test.txt
```