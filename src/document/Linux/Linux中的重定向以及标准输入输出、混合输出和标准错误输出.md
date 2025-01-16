---
title: Linux中的重定向以及标准输入输出、混合输出和标准错误输出
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2024-12-20
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



## 前言
## 重定向统计列表

<table>
	<tr>
		<th>类型</th> 
	    <th>命令</th>
	    <th>作用</th>
	</tr >
	<tr >
	    <td>标准输入重定向	</td>
	    <td>echo "123" &lt file	</td>
	    <td>将输入的数字展示到终端上。</td>
	</tr>
	<tr >
	    <td rowspan="2">标准输出重定向	</td>
	    <td>command > file	</td>
	    <td>以覆盖的方式，把 command 的正确输出结果输出到 file 文件中。</td>
	</tr>
	<tr>
	    <td>command >> file	</td>
	    <td>以追加的方式，把 command 的正确输出结果输出到 file 文件中。</td>
	</tr>
		<tr >
	    <td rowspan="2">标准错误输出重定向</td>
	    <td>command 2> file	</td>
	    <td>以覆盖的方式，把 command 的错误信息输出到 file 文件中。</td>
	</tr>
	<tr>
	    <td>command 2>> file</td>
	    <td>以追加的方式，把 command 的错误信息输出到 file 文件中。</td>
	</tr>
		<tr >
	    <td rowspan="4">正确输出和错误信息同时保存	</td>
	    <td>command > file 2>&1	</td>
	    <td>以覆盖的方式，把正确输出和错误信息同时保存到同一个文件（file）中。</td>
	</tr>
	<tr>
	    <td>command >> file 2>&1</td>
	    <td>以追加的方式，把正确输出和错误信息同时保存到同一个文件（file）中。</td>
	</tr>
		<tr>
	    <td>command >file1 2>file2	</td>
	    <td>以覆盖的方式，把正确的输出结果输出到 file1 文件中，把错误信息输出到 file2 文件中。</td>
	</tr>
		<tr>
	    <td>command >>file1 2>>file2</td>
	    <td>以追加的方式，把正确的输出结果输出到 file1 文件中，把错误信息输出到 file2 文件中。
</td>
	</tr>
</table>



## 标准输入重定向：
&emsp;&emsp;标准输入（stdin）通常是指从终端或命令行界面接收输入数据的通道。当你在终端中输入命令并按下回车键时，你的输入就会被发送到标准输入。

标准输入通常用文件描述符（file descriptor）表示，其中stdin的文件描述符为0。在程序中，你可以使用这个文件描述符来读取从标准输入传来的数据。

以下是一些与标准输入相关的常见操作：

1. 从标准输入读取一行文本：


```bash
echo "请输入您的名字："
read name
echo "您好，$name！"
```
2. 将命令的输出重定向到标准输入：

如果没有后面的文件，需要先创建：`touch a.txt`
```bash
echo "123" < a.txt
```
这将输入的内容`123`显示在终端上。



## 标准输出重定向：
&emsp;&emsp;标准输出（stdout）是指默认情况下将进程的输出结果发送到终端的通道。当你运行一个程序或命令时，它通常会将输出内容显示在终端上，这就是标准输出的作用。

- 标准输出（输出第二次则覆盖第一次的内容）
```bash
echo "abc" > a.txt


# 覆盖a.txt内容
echo "abc" > a.txt
echo "123" > a.txt
# 输入了两个文字，但是只存留了最后一个，因为>代表的是标准输入（输出第二次则覆盖第一次的内容）
```
- 标准输出（追加输出）>>

```bash
echo "123" > a.txt
echo "123123" >> a.txt

#此时，a.txt中内容为：
123
123123
```

- 使用命令查询输入到一个文件中（工作中最常用的）

```bash
ls -a > a.txt

# 输出完之后可以使用cat查看
```

## 混合输出重定向：
&emsp;&emsp;可以使用管道符号（`|`）将两个或多个命令的输出进行混合，并将结果重定向到文件或其他命令的输入。

下面是一个将两个命令的输出混合并重定向到文件的示例：


```shell
command1 | command2 > output.txt
```
在这个示例中，`command1`的输出会被作为`command2`的输入，并且它们的输出结果会被重定向到`output.txt`文件中。

如果你要将一个命令的输出同时重定向到文件和其他命令的输入，你可以使用多个重定向符号：


```shell
command > output.txt 2>&1 | command2
```
在这个示例中，`command`的输出会被重定向到`output.txt`文件中，并且标准错误输出（`stderr`）会被重定向到标准输出（`stdout`），然后再将标准输出作为`command2`的输入。


## 标准错误输出重定向：

例如：
```bash
LS > a.txt
# 默认这个会直接再也没上输入【bash: LS: command not found】，而a.txt.里是空的
# 想要将错误的信息也输出到a.txt中，我们可以使用标准错误
LS 2> a.txt
# 这样cat查看你的时候，错误信息就可以看到了。
```


**<font color=green>实例：</font>**
> yum -y install bind bind-utils &> /dev/null && echo "ok" || echo "not ok"<br>
(安装一个bind和bind-utils把安装时候输出的内容全部放到/dev/null,[/dev/null相当于一个回收站，输出到这里面就直接清空]然后如果安装成功就输出ok，安装失败就输出not ok)


## 文件描述符

|文件描述符	|文件名	  |类型|硬件|
|--|--|--|--|
| 0 |  stdin| 标准输入文件	 | 键盘 |
|  1| stdout | 标准输出文件 | 显示器 |
|  2| stderr |  标准错误输出文件| 显示器 |


实例：运行一个jar包，将jar包的日志输出到cs.logs中，错误日志输出到cserror.log中。

```bash
java -jar cs.jar > cs.log 2> cserror.log
```


## EOF的使用

1. 可以使用EOF输入多行文字显示到终端上。

```bash
[root@localhost a]# cat << EOF
> 123
> 123
> sda
> EOF

123
123
sda
```
2. EOF输入追加	

```bash
[root@localhost a]#  cat <<EOF>> c.txt
> 123
> 123
> EOF

```
3. EOF输入覆盖

```bash
[root@localhost a]# cat <<EOF> c.txt 
> 123lda
> dfasdf
> EOF
```


- 实例：

 4. 将
172.16.11.221 k8s-master
172.16.11.222 k8s-node1
172.16.11.223 k8s-node2
输出到/home/a.txt/中（追加）


```bash
cat >> /home/a.txt << EOF 
172.16.11.221 k8s-master
172.16.11.222 k8s-node1
172.16.11.223 k8s-node2
EOF
```

5. 将 a 输出到/home/a.txt/中（覆盖）


```bash
cat > /home/a.txt << EOF 
a
EOF
```
6. 双重重定向指定内容到指定文件（覆盖）

```bash
tee /home/a.txt << EOF
123
1wed
sdfa
13228
EOF
```
>双重重定向的意思是：将输出的内容，在页面上展示一下，并输出到指定的文件内容中。


