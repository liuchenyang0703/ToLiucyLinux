---
title: 【Linux】Shell脚本之函数的操作+实战详解（建议收藏⭐）
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - shell
  - 运维
pageview: false
date: 2024-12-18
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180959326.png)

>🍁**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>

## shell脚本函数

### 设置函数的意义
>函数是一段可以重复利用有组织的代码；可以减少代码，提高代码利用率，使脚本结构更加清晰。

###  函数的基本格式

```bash
function 函数名(){
	执行代码
	[return x]                       #使用return或exit可以显示的结束函数
}
```

```bash
函数名(){							 #函数名后面（）是没有内容的
	执行代码							 #我们执行的命令内容放在{}里面
}
```

这样只是写了函数，但是没有调用，所以执行脚本不会有输出。
### 函数的调用+实例
- 实例1
>直接写函数名

```bash
#!/bin/bash

function f1 {
	echo "函数测试"
}

f1
```

>输出结果为：
<font color=red>函数测试</font>

- 实例2
```bash
#!/bin/bash

function f1 {
	echo "函数测试"
}


f1() {
	echo "这是没有function的函数测试"
}

f1
```

>输出结果为：
<font color=red>这是没有function的函数测试</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180959771.png)

- 实例3

```bash
#!/bin/bash

function f1 {
	echo "函数测试"
}


f1() {
	echo "这是没有function的函数测试"
}

f1

f2() {
	echo "这是function的函数测试2"
}

f2
```
>输出结果为：
><font color=red>这是没有function的函数测试<br>
>这是function的函数测试2</font>

- 实例4

```bash
#!/bin/bash

function f1 {
	echo "函数测试"
}


f1() {
	echo "这是没有function的函数测试"
}

#f1

f2() {
	echo "这是function的函数测试2"
}

#f2

f3() {
	echo -e "我想输出函数的f1和f2，结果为：\n $(f1) \n $(f2)"
}
f3
```

>输出结果为：
><font color=red>我想输出函数的f1和f2，结果为：<br>
> 这是没有function的函数测试 <br>
> 这是function的函数测试2<br>
></font>

- **总结：**
> 
> 1.直接写函数中调用
> 
> 2.函数直接写函数名同名函数后一个生效
> 
> 3.调用函数一定要先定义
> 
> 4.只要先定义了调用的其他函数定义顺序无关


## 函数的返回值

return表示退出函数并返回一个退出值，脚本中可以用 $ ? 变量显示该值

> 1.函数结束就取返回值，因为$?变量只返回执行的最后一条命令的退出状态码
> 
> 2.退出状态码必须是0~255，超出时值将为除以256取余

- 实例1：通过return返回一个乘积
```bash
#!/bin/bash

function test1 {
	read -p "请输入一个数字：" num
	return $[$num*2]
}

test1

echo $?
```
>输出结果为：
><font color=red>请输入一个数字：20<br>
>40</font>

为什么会变成40呢？是因为里面写了交互式输入的数字*2，结果在$?返回值里返回。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180959410.png)

- 实例2

```bash
#!/bin/bash


sum() {
	read -p "请输入第一个数：" num1
	read -p "请输入第二个数：" num2
	echo "刚刚输入的两个数分别为：$num1 和 $num2"
	SUM=$[ $num1 + $num2 ]
	echo "两个数的和为：$SUM"
}
sum
```
结果为：

```bash
请输入第一个数：52
请输入第二个数：10
刚刚输入的两个数分别为：52 和 10
两个数的和为：62
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180959555.png)


### 函数的传参
>在Shell中，调用函数时可以向其传递参数。在函数体内部，通过 $n的形式来获取参数的值，例如：$1表示第一个参数，$2表示第二个参数…即使用位置参数来实现参数传递。

```bash
#!/bin/bash

add () {
	let sum=$1+$2
	echo $sum
}
#add（输出的数是你写的数）
add $1 $2
#函数传参【传的是位置变量】
```

结果为：24

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180959511.png)

### 函数变量的作用范围

 >1.函数在shell脚本中仅在当前shell环境中有效
> 
> 2.Shell脚本中变量默认全局有效
> 
> 3.将变量限定在函数内部使用local命令
> 
>         3.1函数内部变量通过local来实现
>     
>         3.2通过定义myfun函数，在其内部设置局部变量i
>     
>         3.3函数内部和外部分别赋值，进行结果验证。
> 
> ps：
> 
><font color=red> 全局变量代表整体可以使用
> 局部变量代表的是全局变量里面可以使用其中一部分</font>

```bash
#!/bin/bash

myfun(){
	local i 
	i=6
	echo $i
}

i=8

myfun
echo $i
```

>local定义的是局部变量；
>局部变量是6；全局变量是8；所以输出的结果是<font color=red>6和8</font>
>如果吧local这行注释了，那么输出的结果就是<font color=red>6和6</font>；为什么呢？
>因为两个全局变量，在脚本中只能执行一个全局变量，且是从上往下，所以输出的只有6。
>
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180959691.png)

## * 函数的参数
### *.1 参数的用法

> 函数名称：参数1，参数2，参数3


### *.2 参数的表示方法

> `$1 $2 $3.........${10}${11}`

### *.3 参数的案例
#### *3.0 什么是阶乘？

>阶乘(factorial)是基斯顿·卡曼(Christian Kramp, 1760 – 1826)于1808年发明的运算符号。
>阶乘，也是数学里的一种术语。
> <br>
> 阶乘指从1乘以2乘以3乘以4一直乘到所要求的数。
> 
> 例如1：所要求的数是4，则阶乘式是1\*2\*3\*4，也可以是4\*3\*2\*1，得到的积是24，24就是4的阶乘。
> 例如2：所要求的数是6，则阶乘式是1\*2\*3\*……\*6，也可以是6\*5\*4\*3\*2\*1，得到的积是720，720就是6的阶乘。
> 例如3：所要求的数是n，则阶乘式是1\*2\*3\*……\*n，设得到的积是x，x就是n的阶乘。
> <br>
> 在表达阶乘时，就使用“！”来表示。如h阶乘，就表示为h!
> 
> 阶乘一般很难计算，因为积都很大。
> 
> 以下列出1至10的阶乘。
> 
> 1！=1，
> 
> 2！=2，
> 
> 3！=6，
> 
> 4！=24，
> 
> 5！=120，
> 
> 6！=720，
> 
> 7！=5040，
> 
> 8！=40320
> 
> 9！=362880
> 
> 10！=3628800
> 
> 另外，数学家定义，0！=1，所以0！=1！
> 
> 通常我们所说的阶乘是定义在自然数范围里的，<font color=red>小数没有阶乘，像0.5！，0.65！，0.777！都是错误的。</font>
> 但是，有时候我们会将Gamma函数定义为非整数的阶乘，因为当x是正整数n的时候，Gamma函数的值是n-1的阶乘。 伽玛函数（Gamma Function）
>  Γ（x)=∫e\^(-t)*t^(x-1)dt (积分下限是零上限是＋∞）(x<>0,-1,-2,-3,……)
> 运用积分的知识，我们可以证明Γ（x)＝(x-1) * Γ（x-1) 
> 所以，当x是整数n时，Γ（n) = (n-1)(n-2)……＝(n-1)!
>  这样Gamma 函数实际上就把阶乘的延拓。

#### *.3.1 求1到6的阶乘

```bash
#!/bin/bash

#求阶乘1到6的阶乘
jiecheng (){
	num=1
	for i in {1..6};do
		let num=$i*$num
		echo $num
	done
}

jiecheng
```
过程为：

```bash
1*1
1*2
1*2*3
1*2*3*4
1*2*3*4*5
1*2*3*4*5*6
```
结果为：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958207.png)




#### *.3.2 求1到6的阶乘，只输出6的阶乘
>如果想适用于4、5或其他的阶乘，可以吧1..6改为1..指定的最高数就可以算出来了。

```bash
#!/bin/bash

cheng (){
	num=1
	for i in {1..6};do
		let num=$i*$num
	done
	echo $num
}
cheng
```

结果为：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958354.png)

为什么等于720呢？看上去和*.3.1写的一模一样，其实不一样，仔细看；
一个`echo $num`在for循环内，一个在for循环外；
在for循环内，会每次循环都输出一次结果，而在for循环外，只会输出循环的最后一次结果，所以，该结果等于720，也就是6的阶乘。

### *.4 判断是否为文件

```bash
#!/bin/bash
file=/home/abc.txt
wen (){
	if [ -f $file ];then  #判断是否为文件
		return 80
	else
		return 40
	fi
}
wen
echo $?
```
结果为：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958315.png)

脚本解析：
如果没有哪个文件也是会返回40的；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958807.png)



### *.5 递归函数

#### *.5.1 递归显示var下的log里面有哪些是目录

```bash
#!/bin/bash
#列出目录文件的列表，目录可用颜色表示（蓝色表示目录；白色表示文件）文件显示层及关系
list (){
        for i in $1/*;do  #$1下面的所有内容
                if [ -d $i ];then   #-d代表是目录 只要是目录的我就用蓝色显示
                        echo -e "\e[34m$i\e[0m"
                        #标准格式【】里面的内容是表示颜色  -e表示转义字符标识
                        echo $i
                        list $i " $2"
                else
                        echo "$2$i"
                fi
        done
}
list $1 $2 #调用变量
```
执行结果：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958124.png)

#### *.5.2 交互式 递归方式计算你输入的数值作为阶乘	

```bash
#!/bin/bash
#交互式 递归方式计算你输入的数值作为阶乘
#比如我第一次输入5
fun (){
	if [ $1 -eq 1 ];then
   		echo 1
	else
		#5不等于1执行else的 此时tp=5-1=4；res=4 此时echo为5*4
		local tp=$[ $1 - 1 ]  #这个是局部  
  		res=$(fun $tp)  #相当于直接调用tp本身
 	 	echo $[ $1 * $res ] #$1是5
	fi
}
 
read -p "请输入：" num
res=$(fun $num)
echo $res
 
 
#执行过程
#fun 5 $1=5 tp=4 res=fun 4 echo 5 * 4()      5*4*3*2*1
#fun 4 $1=4 tp=3 res=fun 3 echo 4 *3(fun)    4*3*2*1
#fun 3 $1=3 tp=2 res=fun 2 echo 3 * 2(fun)   3*2*1
#fun 2 $1=2 tp=1 res=fun 1 echo 2*1(fun)     2*1
#fun 1 $1  echo 1                            1  
```
执行结果：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958815.png)

如果还是看不懂过程，可以使用 `sh -x 脚本名称` 来看脚本执行过程，或者是在脚本中的`#!/bin/bash/`下一行加`set -x`；就可以看到脚本执行的过程了。适合与for循环这一类的工程。

##  如何查看脚本执行过程？
可以使用 `sh -x 脚本名称` 来看脚本执行过程，或者是在脚本中的`#!/bin/bash/`下一行加`set -x`；就可以看到脚本执行的过程了。适合与for循环这一类的工程。
- 实例1：sh -x 脚本名称

```bash
sh -x 脚本名称
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958455.png)
- 实例2：在脚本中的`#!/bin/bash/`下一行加`set -x`

```bash
#!/bin/bash
set -x
```
脚本：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958518.png)

执行：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958073.png)


## 函数重点：
>函数返回值return，当函数中遇到return函数结束。
>- 1.只有函数被调用，函数体内的代码才会被执行；
>- 2.区分脚本和函数的位置变量，函数体内使用函数传递的位置变量；
>- 3.在其他脚本引用函数，需要source或.加脚本名，引用函数；
>- 4.如果return没有指定返回值，则默认返回上一条命令的返回值。
>- 5.函数大多数运用于case循环判断中，来写启动、停止、重启、查看状态等。

### 举例重点5：启动脚本模板（可根据自己的jar包名称自行修改）
>使用方法：sh start.sh start/stop/restart/status

```bash
#!/bin/bash

USAGE="Usage: $0 [start|stop|restart|status]"

#jar包进程
jin (){
	ps -ef | grep -v grep | grep cs.jar | wc -l
}

start (){
	if [ $(jin) -ge 1 ];then
		echo "该程序进程存在"
	else
		java -jar cs.jar  > /dev/null &
		if [ $(jin) -ge 1 ];then
			echo "成功启动该程序"
		else
			echo "程序还未启动，请检查程序日志或者是脚本里的启动程序名称是否有误"
		fi
	fi 
}

stop (){
	ps -ef | grep -v grep | grep cs.jar | awk '{ print " kill -9 " $2 }' | sh
	if [ $(jin) -ge 1 ];then
		echo "程序还没有停止，请检查脚本里的程序名称是否有误"
	else
		echo "该程序已停止"
	fi
}

restart (){
	stop
	start
}

status (){
	if [ $(jin) -ge 1 ];then
		echo "有此进程，该服务正在运行中"
	else
		echo "此进程不存在，需要启动服务的时候记得执行脚本哈！"
	fi
}

case $1 in
	start)
		start
	;;
	stop)
		stop
	;;
	restart)
		restart
	;;
	status)
		status
	;;
	*)
	echo -e $USAGE
esac
```



## 相关文章：

|文章名|文章地址 |
|:--|:--|
|[【Linux】 shell脚本的创建及使用 《入门到实践》详解[⭐建议收藏！！⭐]](https://liucy.blog.csdn.net/article/details/130111812)|[https://liucy.blog.csdn.net/article/details/130111812](https://liucy.blog.csdn.net/article/details/130111812)|
| [【Linux】Shell脚本之函数的操作+实战详解[⭐建议收藏！！⭐]](https://liucy.blog.csdn.net/article/details/130387377) |[https://liucy.blog.csdn.net/article/details/130387377](https://liucy.blog.csdn.net/article/details/130387377)  |
|[【Linux】Shell脚本之 if判断、case判断、for循环、while循环 + 实战详解[⭐建议收藏！！⭐]](https://liucy.blog.csdn.net/article/details/130387523)|[https://liucy.blog.csdn.net/article/details/130387523](https://liucy.blog.csdn.net/article/details/130387523)|



