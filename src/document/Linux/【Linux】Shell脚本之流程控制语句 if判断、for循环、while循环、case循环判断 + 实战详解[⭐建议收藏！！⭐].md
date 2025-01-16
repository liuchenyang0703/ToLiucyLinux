---
title: 【Linux】Shell脚本之流程控制语句 if判断、for循环、while循环、case循环判断 + 实战详解[⭐建议收藏！！⭐]
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

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180954417.png)

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---

## 🍁 if 判断
### 🍁 if 判断格式：

```bash
#单条件判断
if [ 条件测试 ];then
   执行代码
fi

if [ 条件测试 ];then
   执行代码
eles
   执行代码
fi

#多条件判断
if [ 条件测试 ];then
   执行代码
elif [ 条件测试 ];then
   执行代码
eles
   执行代码
fi

#单行if判断
if [ 条件测试 ]; then 执行代码; else 执行代码; fi
```
### 🍁 if 判断实例：
#### 🍃 单条件判断实例：判断是否为整数

```bash
#!/bin/bash

read -p "please input a number:" num

expr 10 + $num &>/dev/null
if [ $? -eq 0 ];then
     echo "${num}是整数"
else
     echo "${num}不是整数"                                  
fi
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180954408.png)

#### 🍃 多条件判断实例：成绩及格否

```bash
对输入成绩做判断：
如果成绩小于60；那么
	打印不及格
如果60>=成绩<80；那么
	打印及格
如果80>=成绩<90;那么
	打印良好
如果90>=成绩<=100;那么
	打印优秀
否则
	请输入0-100的整数
结尾
```

```bash
#!/bin/bash

read -p "please input is results:" results
expr 10 + $results &>/dev/null
if [ $? -ne 0 ];then
   echo "${results}不是合法整数"
   exit 1
fi
if [ ${results} -lt 60 ];then
    echo "不及格"
elif [ ${results} -ge 60 ] && [ ${results} -lt 80 ];then
    echo "及格"
elif [ ${results} -ge 80 ] && [ ${results} -lt 90 ];then
    echo "良好"
elif [ ${results} -ge 90 ] && [ ${results} -le 100 ];then
    echo "优秀"
else
    echo "请输入0-100之间合法的整数,您输入的是：${results}"
fi
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180954060.png)
#### 🍃 单行if判断实例：判断是否有这个文件或目录

```bash
if [ ! -d "/var/lib/mysql/" ]; then echo "目录不存在"; else echo "目录存在"; fi
```
#### 🍃 单行if判断实例：判断这个目录中是否存在文件（前提是有这个目录）
```bash
if [ -z "$(ls -A /var/lib/mysql)" ]; then echo "该目录不存在文件"; else echo "该目录存在文件"; fi
```

## 🍁 for 循环
### 🍁 for 循环格式：

```bash
for 变量 in 取值列表;do
	执行代码
done

for 变量 in 取值列表
do
	执行代码
done

for (( i=1;i<20;i++ ));do
	执行代码；（表示循环20次执行代码）
done
```
取值列表中的值都将被历遍

### 🍁 for 循环实例：
#### 🍃 需求1：打印10以内的偶数-->能被2整除，除2余数为0

```bash
#!/bin/bash

#{起始数字..终止数字..步长} 默认步长为1
for i in {2..10..2};do
    echo $i
done
```
>continue	跳过当前循环
break	终止当前循环
exit	退出脚本，同时可以指定退出时的状态码


> seq [起始位置（不指定默认是1）] 终止位置
> -s	指定分隔符
> -w	补齐相同宽度

#### 🍃 需求2：循环创建文件`cs{1..100}`

```bash
#!/bin/bash

#获取脚本执行的路径
DIR=$(cd $(dirname $0) && pwd )

text=$DIR/for

[ ! -d $text ] && mkdir $text

for I in {1..100};do
        touch ${text}/cs$I
done


#其实直接用touch也可以创建，这里只为了演示
#touch cs{1..100}
#会在当前目录创建cs{1..100}文件
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180954833.png)
#### 🍃 需求3：从变量中取遍历的值

```bash
#!/bin/bash

List="file1 file2 file3"
for I in $List;do
        echo "当前文件为 ${I}"
done
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180954362.png)
#### 🍃 需求4：循环输出数组中的值

```bash
#!/bin/bash  

# 定义一个数组  
my_array=("元素1" "元素2" "元素3" "元素4" "元素5")

# 使用for循环遍历数组并输出每个元素  
for i in "${my_array[@]}";do
    echo "$i"  
done
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180954938.png)

#### 🍃 需求5：从命令中取值
```bash
#!/bin/bash

for I in $(cat /etc/passwd)
do
        echo "$I"
done
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180954493.png)
#### 🍃 需求6：for循环自增自减
##### 🍃 需求6.1：批量创建cs1-cs10用户

```bash
#!/bin/bash

for (( i=1;i<=10;i++ ));do
        useradd cs_$i
done
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180954162.png)

如果需要删除这些用户，可在脚本中把`useradd`改为`userdel -r`即可；


##### 🍃 需求6.2：输出数字 \$a自增、$b自减

```bash
#!/bin/bash

for (( a=1,b=9;a<=10;a++,b-- ));do
        echo "num is $a $b"
done
```
a的初始值为1；b的初始值为9；
a在前，所以写a最大不能>10；
a每次加1，直至加到10；b每次-1，直至a停止。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180954117.png)
##### 🍃 需求6.3：循环20次zabbix调用

```bash
#!/bin/bash

for (( i=1;i<=20;i++ ));do
	cs=$(zabbix_get -s 172.16.10.1 -k cs)
	echo "调用$i次！调用结果为：$cs"
	echo "------------------------------------------------------------------------"
done
```
#### 🍃 需求7：批量创建用户，密码默认为123456

```bash
#!/bin/bash

#获取脚本执行的路径
DIR=$(cd $(dirname $0) && pwd )

#创建一个用户组
groupadd mailgroup 2>/dev/null


for i in $(cat $DIR/a.txt);do
	useradd -g mailgroup -s /sbin/nologin $i 2>/dev/null
    echo 123456 | passwd --stdin $i
done
```
a.txt 中名字可以随便起;

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180954138.png)
## 🍁 while 循环

### 🍁 while 循环格式：

```bash
while [条件测试];do
	执行代码
done

while [条件测试]
do
	执行代码
done

while true;do
	执行代码（无限循环此命令，每次循环停留两秒）
	sleep 2
done
```
条件测试比如：$i -le 5
当条件成立时，执行循环，不成立，结束循环。
如果while中的条件永远成立，会一直循环，成为死循环。

### 🍁 while 循环实例：
#### 🍃 需求1：计算1到100正整数的和

```bash
#!/bin/bash

declare -i I=1

declare -i SUM=0

while [ $I -le 100 ]; do
	let SUM+=$I
	let I++
done

echo "$SUM"
```
在执行脚本时加个 `-x` 可查看执行过程

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180954153.png)

#### 🍃 需求2：批量创建用户，密码默认为123456

```bash
#!/bin/bash

#获取脚本执行的路径
DIR=$(cd $(dirname $0) && pwd )

#创建一个用户组
groupadd mailgroup 2>/dev/null


while read username; do
	useradd -g mailgroup -s /sbin/nologin $username 2>/dev/null
	echo 123456 | passwd --stdin $username
done < $DIR/username.txt
```
username.txt

```bash
lcy
cs
abc
abb
abd
abe
abf
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180953541.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180953180.png)


批量删除用户

```bash
#!/bin/bash

#获取脚本执行的路径
DIR=$(cd $(dirname $0) && pwd )

#创建一个用户组
groupadd mailgroup 2>/dev/null


cat $DIR/username.txt | while read username; do
	userdel -r $username
done
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180953193.png)
#### 🍃 需求3：提示用户输入字符，如果是小写就把字母全部变为大写，如果是quit则退出脚本

```bash
#!/bin/bash

#如果输入的不是quit则把小写字母全部换成大写字母，如果输入的是quit则退出循环，否则会一直循环；
read -p "Please enter content：" SCRIPT

while [ $SCRIPT != "quit" ]; do
	echo "$SCRIPT" | tr 'a-z' 'A-Z'
	read -p "Please enter content：" SCRIPT
done
```
字母写的小写，全部会替换为大写，数字和其他字符不会被替换；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180953156.png)
#### 🍃 需求4：无限循环执行zabbix_get调用命令

```bash
#!/bin/bash

while true;do
	cs=$(zabbix_get -s 172.16.10.1 -k cs)
	echo "结果为$cs"
	echo "----------------------------------------"
	sleep 2
done
```

## 🍁 case 循环判断
### 🍁 case 循环判断格式：

```bash
case 变量 in
       条件或值1）
	执行代码
;;
        条件或值2)
	执行代码
;;
        条件或值3）
	执行代码
;;
         *）
	执行代码
esac
```

### 🍁 case 循环判断实例：
#### 🍃 nginx服务启停脚本：函数 + case
```bash
#!/bin/bash

ngstart (){
	/usr/local/nginx/sbin/nginx
}

ngstop (){
	/usr/local/nginx/sbin/nginx -s stop
}

ngrestart (){
	/usr/local/nginx/sbin/nginx -s reload
}

ngstatus (){
	/usr/local/nginx/sbin/nginx -s status
}


#nginx服务器起停的脚本

case $1 in
    start)
        echo "启动nginx服务"
        ngstart
;;
    stop)
        echo "关闭nginx服务"
        ngstop
;;
    restart)
    	echo "重启nginx服务"
#        $0 stop
#        $0 start
		ngrestart
;;
	status)
		echo "查看nginx服务状态"
		ngstatus
;;
    *)  
        echo "USage: /etc/init.d/nginx {start|stop|restart}"
esac
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180953716.png)


>推荐一个使用case写的启动脚本，包含启动，停止及重启监测状态：[linux启动、关闭、重启jar包shell脚本 ](https://download.csdn.net/download/liu_chen_yang/87755766?spm=1001.2014.3001.5503)

## 相关文章：

|文章名|文章地址 |
|:--|:--|
|[【Linux】 shell脚本的创建及使用 《入门到实践》详解[⭐建议收藏！！⭐]](https://liucy.blog.csdn.net/article/details/130111812)|[https://liucy.blog.csdn.net/article/details/130111812](https://liucy.blog.csdn.net/article/details/130111812)|
| [【Linux】Shell脚本之函数的操作+实战详解[⭐建议收藏！！⭐]](https://liucy.blog.csdn.net/article/details/130387377) |[https://liucy.blog.csdn.net/article/details/130387377](https://liucy.blog.csdn.net/article/details/130387377)  |
|[【Linux】Shell脚本之流程控制语句 if判断、for循环、while循环、case循环判断 + 实战详解[⭐建议收藏！！⭐]](https://liucy.blog.csdn.net/article/details/130387523)|[https://liucy.blog.csdn.net/article/details/130387523](https://liucy.blog.csdn.net/article/details/130387523)|


