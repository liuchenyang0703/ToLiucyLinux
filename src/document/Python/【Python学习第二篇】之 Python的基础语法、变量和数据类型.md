---
title: 【Python学习第二篇】之 Python的基础语法、变量和数据类型
icon: circle-info
order: 1
category:
  - Python
tag:
  - Python
pageview: false
date: 2025-03-12
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


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161319730.jpeg)


---
## 前言

> 这里写代码的工具为：PyCharm 2022.3.3 
> Python 版本为：3.8.5
> 工作平台：Windows

## 一、语法基础
### 1. print()输出
当然学习每一个编程的最开始就是输出“Hello Word ！”，python也不例外，下面我们用Python 的写一个输出“Hello Word ！”。

>print是一个Python内置函数，用于输出（打印）指定的对象。它可以将对象输出到控制台、文件或其他标准输出设备。在Python中，使用print语句可以将字符串、数字、变量、列表、元组等各种类型的数据输出到控制台上。
```python
print ('Hello Word !')
```
当然这个是在软件中需要些`print`，在交互式页面就不用写`print`了；

```python
#在交互式界面，也就是cmd的那种
'hello word !'
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161319557.png)

这样，在交互式界面的时候可以少打一个print，如果有良好习惯，那么就不管在哪里都加上最好；

但无论在脚本还是交互式编程中，想要看到执行过程数据，就必须加上`print ()`；比如在后面要学到的for循环中，如果想看到执行过程，就必须加上`print ()`。

当然，print () 也可以输出多个内容，我们只要在括号内将他用英文逗号`,`隔开就行；还可以在括号内的最后加一个sep，并让他等于一个字符，就可以将多个内容以sep指定的字符分隔开连接起来了。

```python
print ('hello',',','what','your','name','?')
```
输出结果为：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161319343.png)

加个分割连接符

```python
print('liu','chen','yang',sep="_")
#\n表示换行符
print('liu','chen','yang',sep="\n")
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161319782.png)
最后一行代的中的`\n`是换行的意思。如果两个print()一起执行，数据就会显示在两行上，如果不想让他显示在两行上，想让他显示在一行上，可以使用end="连接符" 来连接，连接上一行输出的值与下一行输出的值；

```python
print('zhang',end='_')
print('san')

print('liu','chen',end="_")
print('yang')
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318496.png)

可以看到，liu 和chen之间是有个空格的，因为这个只是连接上下两行的值，并不管内容的分割，如果想将空格也加一个连接符号，可以sep和end结合使用：

```python
print('liu','chen',sep=",",end="_")
print('yang')
```
输出结果为：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318147.png)


print() 总结：
- print输出以`英文逗号`作为作为多个内容分割符；
- print 括号内最后面加一个`sep="分隔符"`，是可以设置多个内容的分隔符，但仅限于一个print中；
- print 括号内最后面加一个`end="分隔符"`，是可以设置多个内容的分隔符，支持上下两行的值连接。
### 2. 代码缩进
>在Python中，代码缩进是非常重要的，因为它决定了代码块的开始和结束。Python使用缩进而不是其他语言中的大括号或关键字来定义一个代码块。在Python中，缩进通常是使用四个空格字符来表示。例如，以下代码片段是一个简单的Python函数：

```bash
while True:												# while无限循环（这里的:都必须是英文字符）
    name = input("你叫什么名字呢？ \n>>>")				# 交互式输出（\n表示换行，>>>表示换行之后下一行会输出这个）
    if name:											# 判断是否是name
        print("%s 同学,你好，欢迎学习Python呀！" %name)	# 如果是则输出欢迎语！（%s表示占位符，%name表示输出交互式的名字给到前面的占位符）
        break											# 停止循环
    else:												# 判断是否是name，如果不是
        print("请输入正确的姓名！\n%s" %('-'*30))			# 那就输出提示语！（\n表示换行，后面的数据将在下一行输出；%s表示占位符，%('-'*30)表示将该结果给前面的占位符，%('-'*30)的意思是输出'-'，*30的意思是一共输出30个'-'）
        continue										#表示返回继续问
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318896.png)



在这个例子中，缩进将 if 和 else 语句块与函数定义分隔开来。如果缩进不正确，Python解释器会抛出 IndentationError 异常。因此，正确的缩进对于Python代码来说是至关重要的。



如果缩进有问题，那么就会抛出`IndentationError`异常，例如：

```python
if True:
    print('abc')
   print('def')
```
这样就会抛出`IndentationError`异常，因为两个print都是四个空格，排在一列的；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318936.png)


### 3. 代码行
>代码行顾名思义就是一行代码，这里的行是逻辑行，而非物理行；两者的区分如下：

- 物理行：在窗口所见的一行行代码，它通过回车符或者换行符来终止一行，在嵌入式源代码中则通过“\n”终止，表示换行
- 逻辑行：表示一条语句，通过 NEWLIVE（新行）形符终止。

一般情況下，一个物理行就是一个逻辑行。当然，多个物理行也可以构成一个逻辑行，这样一条语句可以分多行显示。实现方法有如下两种。

- 1. 显式连接

在一个物理行的未尾添加续行符（\)。续行符后面不能附加任何代码，必须直接换行，行内也不能包含任何注释。通过续行符把多个物理行连接为一个逻辑行，其中的缩进也没有任何语法意义。

【示例 1】下面示例定义一个字符串，通过续行符把它分多行显示。

```python
hi='hello,'\
    'myname is '\
    'python!'

print(hi)
```
输出结果：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318844.png)

- 2．隐式连接

在小括号（0）、中括号（[]）、大括号 （{}）内包含多行代码，不需要添加续行符，python能够自动把它们视为一个逻辑行，在隐式连接中，行内是可以添加注释的。

【示例 2】针对示例1，也可以按如下方式编写

```python
hi=('hello, '	
    'myname is '
    'python!')

print(hi)
```
输出结果为：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318865.png)

如果多条相邻语句属于同一个代码块，可以合并在一个物理行内显示，语句之间使用分号（;）分割；
例如：

```python
while True:
    name = input("你叫什么名字呢？ \n>>>")
    if name: print("%s 同学,你好，欢迎学习Python呀！" %name);break
    else:
        print("请输入正确的姓名！\n%s" %('-'*30));continue
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318226.png)


### 4. 代码注释
- 单行注释：`#` 

```python
#输出一个hello word！
print('hello word!')

#也可以在代码行后面写注释
print('hello word!')		#输出一个hello word！
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318189.png)

- 多行注释：使用3个引号''' 和 """ 定义

```python
'''while True:
    name = input("你叫什么名字呢？ \n>>>")
    if name: print("%s 同学,你好，欢迎学习Python呀！" %name);break
    else:
        print("请输入正确的姓名！\n%s" %('-'*30));continue'''

"""while True:
    name = input("你叫什么名字呢？ \n>>>")
    if name: print("%s 同学,你好，欢迎学习Python呀！" %name);break 
    else:
        print("请输入正确的姓名！\n%s" %('-'*30));continue"""
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318057.png)

但是这个有个缺点就是可能会影响程序出错，所以，建议还是使用`#`来注释。

- `#`号多行注释：

>在 `PyCharm`  解析器中写代码，要是想注释多行，使用鼠标选中要注释的行，然后按住`ctrl+/`即可注释多行。
>相反，如果想解除注释，那么还是使用鼠标选中要注释的行，然后按住`ctrl+/`即可取消注释多行。



[video(video-patuXwpr-1691590686116)(type-csdn)(url-https://live.csdn.net/v/embed/318636)(image-https://video-community.csdnimg.cn/vod-84deb4/eaf90ae036be71ee91510674a2ce0102/snapshots/c3e03e5b6ec84793b6fb660c28ce39d6-00003.jpg?auth_key=4845190416-0-0-b28f17c91c3bee16d46b812bf0b52f80)(title-python多行注释与取消注释视频)]



### 5. 空字符串和空行
&emsp;&emsp;空字符表示各种不可见字符，如空格、Tab 字符、换行符等。这些空字符在逻辑行的开头具有语法意义，表示缩进。在字符串中具有实际字符的含义。但是，在其他位置，空字符没有任何语义，不会被解析，主要作用是区分不同的形符。

&emsp;&emsp;1个空字符和10 个空字符没有本质区别，都具有相同的作用：分隔两个形符。例如，abc 表示1个形符，面a b c 表示了3个形符。

&emsp;&emsp;空行表示一个只包含空格符、制表符、进纸符或者注释的逻辑行。空行将被 Python 解析器忽略，不被解析。空行的作用：分隔两段不同功能的代码块，便于代码阅读和维护。例如，西数体、类结构、类方法之国可以使用空行分隔，表示一段新代码的开始。

### 6. 形符

&emsp;&emsp;形符是各种名称、符号、字符序列或抽象概念的统称，主要包括：标识符、关键宇、保留字、运算符、分隔符、字面值、NEWLINE（新行）、INDENT（缩进）和 DEDENT（突出）。
>注意：除了行终止符外，其他空字符不是形符，而是形符之问的分界符。

- 1. 标识符

标识符就是各种有效的名称，如关键字、保留字、变量、类、西、函数、方法等。标识符的第一个字符是字母或下面线（_），其余部分由字母、数字或下画线组成。标识符的长度没有限制，对大小写敏感。

```python
交量 = "Python"  #使用汉字定义变量名
print(变量）		#引用变量，打印为 Python
```

- 2．关键字

关键字是 Python 预定义的、具有特殊功能的标识符。
使用keyword 模块的 kwlist 集合可以查看当前 Python 版本支持的关键字。例如：

```python
import keyword
print(keyword.kwlist)	#Python 3.9.0 版本支持的关键字
```

输出为：


> ['False', 'None', 'True','peg parser_ 'and', 'as', 'assert, 'async, 'await, break', class', 'continue, 'def, 'del, 'elif, 'else", 'except, 'finally for, 'from', 'global', if, import, in', 'is' 'lambda', honlocal', not', or, hass', 'raise, 'retur', 'try', 'while', 'with', 'yield']


- 3. 保留字

保留字以下画线开头或结尾，是包含特殊含义的标识符。

```python
_*：开头包含单下画线，表示模块私有名称。不会被from module import *导入。
_*_：开头和结尾包含双下面线，表示Python 预定义名称，也称魔法变量或魔术方法。
_*：开头包含双下面线，表示类的私有名称，仅在当前类中使用，不能在类外访问，也不能够被继承。
```
- 4. 运算符
>运算符就是执行各种运算的符号，例如：+、-、*、**、/、//、%、@等等。

- 5. 分隔符
>分隔符不执行运算，仅表示语法分隔的作用，如小括号（()）、中括号（[]）、大括号（{}）、逗号（,）、冒号 （:）、点号（.）、分号（;）、单引号（'）、双引号（"）、井号（#）、反斜杠（\）等等。

- 6. 字面值
>字面值表示一些内置类型的常量。字面值一旦声明，就不再变化。例如：

```python
123				#数字字面值
"python"		#字符串字面值
```

- 7. 特殊符
>NEWLINE（新行）、INDENT（缩进）和 DEDENT（突出）是3个抽象的概念，没有具休的名字，在解析时表示特定的语法标志，例加， NEWLIVE 表示一个逻辑行的结束，INDENT 我系一个缩进层级，DEDENT 表示一个缩进层级的结束。
## 二、变量
>在 Python 中，变量用于存储数据。在 Python 中，变量不需要声明，变量的数据类型是根据变量赋值时的数据类型来确定的。变量在赋值之前不需要定义或声明，直接将值赋给变量即可。

### 1、定义变量给变量赋值
- 定义变量：

```python
#一个变量赋一个值
变量 = 值
#为多个变量赋一个值
变量1 = 变量2 = 变量3.... = 值
#为多个变量赋多个值
(变量1,变量2,变量3) = (值1,值2,值3)
```
- 给变量赋值

1.1 给变量赋值数字类型不需要加引号，直接输就可以；
1.2 给变量赋值字符串类型，必须加双引号引起来，否则会报错。

```python
a = 1
b = "test"

print(a,b)
```
结果为：1 test

- 如果在`没print输出前`，变量名一样，值不一样，则计算最后的一个变量等于的值，例如：

```python
a = 1
a = "test"

print(a)
```
那么，值就是：test

- 如果在`输出了print之后`，变量名一样，值不一样，那么就会各输出各的，例如：

```python
a = 1
print(a)

a = "test"
print(a)
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318825.png)


>注意：输出值时变量不能打双引号，打了双引号他就会认为输出的是一个字符串，并不是一个变量了。

### 2、为多个变量赋一个值（多重赋值）

```python
#为多个变量赋一个值
变量1 = 变量2 = 变量3.... = 值
```
示例：

```python
a = b = c = 10

print(a)
print(b)
print(c)
```
输出的值为：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318479.png)

> 他们的值都是一样的，那么他们的id一样吗？
>  答：当然一样。

- 给多变量赋值，查看id

```python
a = b = c = 10

print(a,b,c)
print(id(a))
print(id(b))
print(id(c))


d = 20
e = 20
f = 20

print(d,e,f)
print(id(d))
print(id(e))
print(id(f))
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318285.png)


### 3、为多个变量赋多个值（多元赋值）

```python
#为多个变量赋多个值，python本质上会自动解包，所以，加括号也行，不加也行
(变量1,变量2,变量3) = (值1,值2,值3)
```
示例：

```python
(a,b,c,d) = (7,3,2023,"生日快乐！")

print(a,b,c,d)
```
输出的值为：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318579.png)



他们的id是不一样的，不一样的值，id自然也就是不一样的；

```python
(a,b,c,d) = (7,3,2023,"生日快乐！")

print(a,b,c,d)
print(id(a))
print(id(b))
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318111.png)

### 4、变量的命名

```python
规则：
	有效的标识符
	不使用关键字 或者 内置函数名
	区分大小写
规范：
	代码格式
	小写
	有意义，就比如测试写test （不能随便起名字）
	多词命名		驼峰式命名	下划线命名
```
变量名字是有效标识符，第一个字符必须是：字母或者下划线(_)，后面的字符可以由：字母、数字、下划线组成，并严格区分大小写。例如：

```python
abc = 12			# 变量名正确
ac_29 = 44			# 变量名正确
123_abc = 22		# 变量名不合法，会导致编译报错：“SyntaxError”
_12_ab = 30			# 变量名正确
```
变量名不能使用python关键字和保留字，也不建议使用python的内置函数，这样会导致内置函数被覆盖，然后报错；

```python
if = 12			# if为python的内置函数，不可以作为变量名，会导致编译报错：“SyntaxError”
print = 29		# 给print赋值是可以通过编译的，但是不能输出

print(print)	# 函数被覆盖，输出就会导致编译报错：“SyntaxError”
```

变量命名原则：能够见名知意。例如，表示名称的变量可命名为 name，表示性别的变量可以命名为sex。表示学生的变量可以命名为student 等。
交量命名的一般方法是驼峰式命名法。包括如下两种形式。
（1） 小驼峰式命名法：第一个单词以小写字母开始，第二个单词的首字母大写。例如：

```python
firstName
firstSex
firstStudent
```

（2）大驼峰式命名法：每一个单词的首字母都采用大写字母。例如：

```python
FirstName
FirstSex
FirstStudent
```

也可以使用下画线（_）连接多个单词，例如：

```python
first_name
first_sex
first_student
```

【示例】下面示例演示了一个简单的购物车计算过程（命名皆为中文翻译的英文）。

```python
price = 10					# 商品价格
weight = 20					# 商品重量
money = price * weight		# 购买金额
#money -= 5					# 促销返款5元（如果看不懂这种写法那么就看下面那种吧，这种写法叫做：赋值运算符，后面会讲到，用来简化代码的）
money = money - 5			# 促销返款5元（这种就可以看出来了吧）
print(money)				# 显示实际金额，输出为 195
```


## 三、数据类型
### 1. 认识类型

> Python中的数据类型包括：
> 
> 1. Number（数字类型） - 包括整数、浮点数、复数和布尔类型
> 2. String（字符串类型）
> 3. List（列表类型）
> 4. Tuple（元组类型）
> 5. Set（集合类型）
> 6. Dictionary（字典类型）
> 

> 下面是一些常见的Python数据类型：
> 
> 1. 整数 - int
> 
> 2. 浮点数 - float
> 
> 3. 复数 - complex
> 
> 4. 布尔 - bool
> 
> 5. 字符串 - str
> 
> 6. 列表 - list
> 
> 7. 元组 - tuple
> 
> 8. 集合 - set
> 
> 9. 字典 - dict


Python 内置类型可以分为2类，具体如下。
- 标淮数据类型：如数字 (int、 noat、complex）、序列 （list、wuple、range）、文本序列 (str)、进制序列 (bytes、byicarray、memoryview）、集合（set、frozensct）、映射 （dict）、选代器、上下文管理器等。
- 其他内建类型：包括模块、类和实例、函数、方法、类型 (type）、空对象（None）、省略符对象、代码对象、布尔值、末实现对象、内部类型等。其中，内部类型包括栈帧对象、回溯对象、切片对象。
### 2. 类型检测
2.1 使用 isinstance()
 isinstance()函数能够检测一个值是否为指定类型的实例。语法格式如下： 

```python
isinstance(object,type)
```

 &emsp;&emsp;参数 object 为一个对象，参数type 为类型名（如int），或者是类型名的列表，如(int, list,float)。返回值为布尔值。

 【示例 1】下面代码检测交量n的类型。

```python
#类型检测
n = 1
print(isinstance(n,int))                    # 输出为：True
print(isinstance(n,str))                    # 输出为：False
print(isinstance(n,(str,int,float)))        # 输出为：True
print(isinstance(n,(str,list,dict)))        # 输出为：False
```


2.2  使用 type()
> typc()函数可以返回对象的类型。 

 【示例2】下面代码使用 type()函数检测几个值的类型。

```python
print(type(1))              # 输出为：<class 'int'> 数字类型
print(type(1.0))            # 输出为：<class 'float'> 浮点数
print(type('1'))            # 输出为：<class 'str'> 字符串类型
print(type(True))           # 输出为：<class 'bool'> 布尔值类型
print(type([1,3]))          # 输出为：<class 'list'> 序列
print(type({0:'2'}))        # 输出为：<class 'dict'> 字典
```
【示例3】可以通过 type() 函数返回值与类型是否相等，判断一个值的类型。

```python
num = 100
if type(num) == int:
    print("检测结果为int类型，检测正确")
else:
    print("检测结果不为int类型，可能是其他类型")
```
输出结果为：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318116.png)

>提示：isinstance() 函数要考虑继承关系，而type()函数类型则不用考虑继承关系。

【示例4】下面示例定义两个类型，创建一个A对象，再创建一个继承 A对象的B对象，使用 isinstance() 和 type()来比较 A()和 A 时，由于它们的类型都是一样的，所以都返回 True。而B对象继承 A 对象，在使用typc()函数来比较 B()和 A 时，不会考虑 B()继承自哪里，所以返回 False。

```python
class A:
    pass
class B(A):
    pass
print(isinstance(A(),A))        # 输出为；True
print(type(A())==A)             # 输出为；True
print(isinstance(B(),A))        # 输出为；True
print(type(B())==A)             # 输出为；False
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318187.png)
 >提示：如果要判断两个类型是否相同，推荐使用 isinstance()函数
## 四、数字
### 1. 认识数字

> &emsp;&emsp;在Python中，数字是一种基本的数据类型。Python中的数字可以是整数（int）、浮点数（float）或复数（complex），另外，布尔值（bool）属于整数的子类型。以下是一些有关Python数字的基本知识：
> 
> 1. 整数类型：Python可以处理任意大小的整数，包括负整数。整数类型是int。
> 
> 2. 浮点数类型：Python支持浮点数，即带有小数点的数字。浮点数类型是float。
> 
> 3. 复数类型：Python同样支持复数，即带有实部和虚部的数字。复数类型是complex。
> 
> 4. 数字运算：Python支持各种数字运算，包括加、减、乘、除、取余数等。

以下是Python中数字的一些例子：

```python
# 整数类型
print("整数类型")
a = 5
b = -3
print(a)
print(b)
print("-"*50)

# 浮点数类型
print("浮点数类型")
c = 3.14
d = -2.5
print(c)
print(d)
print("-"*50)


# 复数类型
print("复数类型")
e = 2 + 3j
f = -4.5 + 2j
print(e)
print(f)
print("-"*50)

# 数字运算
print("数字运算")
x = 10
y = 3
print(x + y)
print(x - y)
print(x * y)
print(x / y)
print(x % y)

```
运行结果：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161318118.png)

所有数字类型都支持的运算

|运算| 说明 |
|--|--|
|x + y| x 和 y 的和
|x - y|x 和 y 的差
|x * y|x 和 y 的乘积
|x / y|x 和 y 的商
|x // y|x 和 y 的商数
|x % y|x/y 的余数
|-x|x 取反
|+x|x 不变
|abs(x)|x 的绝对值
|int(x)|将x转换为整数
|float(x)|将x转换为浮点数
|complex(re,im)|一个带有实部的re和虚部的im的复数。im默认为0
|c.conjugate()|复数c的共轭
|divmod(x,y)|(x // y,x % y)
|pow(x,y)|x 的 y 次幂
|x**y|x 的 y次幂
### 2. 整数

```python
# 整数类型
print("整数类型")
a = 5
b = -3
print(a)
print(b)
print("-"*50)
```
结果为：

```python
整数类型
5
-3
--------------------------------------------------
```

整数 (int）字面值有4种类型，具体如下。
（1）十进制整数，不能以0 开头，中间可以包含“_”符号，表示对数字进行分组。 
 （2）二进制整数，由0 和1组成，逢二进一，以0b 或0B 开头的数字。中间可以包含"。"符号，表示 对数字进行分组前，对数字进行分组。例如：


```python
n = 0b101 	#二进制数字
print(n)	#输出十进制数字 5
```

（3）八进制整数，由0~7组成。逢八进一，以0o或 0O开头的数字。中间可以包含”。"符号，表示对数字进行分组。例如：

```python
 n=0o23 # 八进制数字 
 print(n) # 输出十进制数字 19 -点数相 
```

（4）十六进制整数，由 0-9和a~f组成，逢十六进一，以0x 或 0X 开头的数字。中间可以包含”_”符号，表示对数字进行分组。例如：

```python
 n=0x23 #十六进制数字 
 print(n) #输出十进制数字 35 
```

整数包括正整数、0 和负整数。整数最大值仅与系统位数有关，简单说明如下。 
- 32位：maxlnt ==2**(32-1)-1。 
- 64位：maxint ==2**(64-1)-1。 

【示例】可以通过 sys.maxsize 查看系统最大整数值。

```python
import sys			# 导入sys 系统模块
print(sys.maxsize) 	# 输出 9223372036854775807
print (2** (32-1)-1)  # 输出 2147483647
```


### 3. 布尔值
>布尔值常用的两个常量对象：`True` 和 `False` ，分别表示逻辑上的真和假，不过其他的值也可以被当作假值或者真值使用。
>
>- 假值得常量：None和False。

>注意：在布尔运算中，不需要显式转换值的类型，Python 自动转换为布尔值。
> 在数字运算中，False 和True 的行为分别类似于整数0和1。
>  使用内置函数bool()可以将任意值转换为布尔值，只要该值可被解析为布尔值。

### 4. 浮点数

```python
# 浮点数类型
print("浮点数类型")
c = 3.14
d = -2.5
print(c)
print(d)
print("-"*50)
```
结果为：

```python
浮点数类型
3.14
-2.5
--------------------------------------------------
```

浮点数 （float） 通路使用C语言的double 来实现。浮点数字面值有如下两种类型。 
（1）点数浮点，常称之为小数，包括3种形式：“整型数部分.整型数部分” “.整型数部分” “整型数部分.”。 
（2）指数浮点，包括2种形式：整型数部分＋指数部分、点数浮点＋指数部分。
整型数部分和指数部分在解析时都是以 10为基数，即十进制数字，具休说明加下。
- 整型数部分：是以数字开头，中间允许包含下划线"_"，组成的整数。如 123、1_2等。下划线主要功能是对数字进行分组。
- 指数部分：使用字母e或E开头，然后跟随+或-符号，后面是整型数部分，如e+12、e-1_2等。例如：

```python
3.14 		# 标准浮点数
3.14_15_93 	# 分组小数，等效于 3.141593
10.			# 整数式小数，等效于 10
.001 		# 纯小数，等效于 0.001
```
 指数浮点也称为科学计数法。例如：

```python
0e0			# 等效于 0.0 
2.5e2 		# 等效于2.5x十的平方=250
2.5e-2 		# 等效于 2.5×十的负二平方=0.025 
```

其中 e（或 E）表示底数，其值为 10，而e（或E）后面跟随的是 10 的指数。指数是一个整型数，可以取正负值。

>提示：程序运行所在机器上浮点数的精度和内部表示法可以在 sys.float_info 中查看，例如，使用 sys.float_info.max 可以查看本地系统支持最大的浮点数。

```python
import sys                  # 导入sys 系统模块
print(sys.float_info.max)   # 输出：1.7976931348623157e+308
print(sys.float_info.min)   # 输出：2.2250738585072014e-308
#在浮点数运算中，出现精度丢失现象，因此，不建议使用浮点数进行高精度计算，例如：
print(0.2+0.4)              # 输出：0.6000000000000001
```

### 5. 复数

```python
# 复数类型
print("复数类型")
e = 2 + 3j
f = -4.5 + 2j
print(e)
print(f)
print("-"*50)
```
结果为：

```python
复数类型
(2+3j)
(-4.5+2j)
--------------------------------------------------
```
&emsp;&emsp;复数 （complex）是对普通实数系统的扩展，它表示一个实部和一个虚部的和，虚部带有一个j后缀，可以使用a+bj 表示，复数的实部a和虛部b 都是浮点型。
&emsp;&emsp;如果要从一个复数z中提取实部和虚部，可使用 z.real 和 z.imag。复数相关的操作函数与 cmath 模玦相似。 
&emsp;&emsp;复数之间的运算是实部与实部相运算，虛部与虛部相运算，然后求实部和虚部的和。例如：

```python
a = 1.56 + 1.2j
b = 1 - 1j
print(a.real)       # 输出实部：1.56
print(a.imag)       # 输出虚部：1.2
print(a-b)          # 实部相减，虚部相加，输出：0.56+2.2j
```

## 五、案例实战
>下面为结合本章的知识来提出的一些案例实战，可能会有超纲的内容，可以先大概的看一下，等到学完，我会专门整理一个所有课程案例实战的文章，供大家参考，到时候看所有案例都知道是什么意思了。
### 1. 转为字符串
#### str() 

- 使用 str() 转换：主要是转换为适合阅读的字符串

```bash
str(1)
str("string")
str([1,2,3])
str("1,2,3")
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161317325.png)

```python
print(str('abc'))
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161317043.png)

【示例1】下面示例设计自定义类Person，定义__str__()方法，返回该类实例的字符串表示，同时定义__init__()方法，初始化类型实例，最后，使用str()函数转换Person实例为字符串表示。 
```python
class Person:                              # 自定义了一个类
    def __init__(self,name,age):           # 构造函数，初始化信息
        self.name = name
        self.age = age
    def __str__(self):                      # 字符串表示函数
        return "%s今年有 %s 岁了" % (self.name,self.age)
person=Person("小张",23)             # 实例化对象
print(str(person))                  # 输出为：小张今年有23岁了
```
#### repr()
- 使用 repr()  转换：主要是转换为解析器适合阅读的字符串


```python
class python():             # 自定义了一个类，通常大写字母开头
    def __str__(self):      # 字符串表示函数
        return "Python"     # 返回一个字符串Python
    
python_cs = python()        # 实例化对象

print(str(python_cs))       # 输出字符串类型，可读的，返回：Python
print(repr(python_cs))      # 输出字符串类型，解析器可读的，返回：<__main__.python object at 0x000002DF247E8BE0>
```

```python
a = 123
print(repr(a))
```
输出结果为：123

#### eval() 
- 使用 eval() 转换：主要是可以立转为以前对象，具有执行功能

>具有执行功能，只可以在交互页面测试，如果是在解析器中的话使用 `print(eval("1+4+5")))`

```python
eval("1+4+5")
print(eval("1+4+5"))
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161317671.png)
#### chr() 

- 使用 chr() 转换：

>可以将数字转换为字符，同样的在交互式python中，如果是在解析器中的话使用 `print(chr(3))`

```python
chr(3)
chr(60)
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161317333.png)

chr(x)函数能够将一个整数转换为Unicode字。参数x可以是十进制或十六进制形式的数字，范围Unicode 字符集，例如：

```python
# 使用print在解析器中显示的比较小，我们可以使用交互式
print(chr(0*30))			# 参数为16进制，输出字符0
print(chr(90))				# 参数为十进制，输出字符Z

# 使用交互式python跑
chr(0*30)
chr(90)
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161317384.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161317794.png)
#### hex() 、bin()、oct() 函数
- 使用 hex() 、bin()、oct() 函数：

> hex(x)函数 能够将一个整数转换为十六进制字符串；
> bin(x)函数 能够将一个整数转换为二进制字符串；
> oct(x)函数 能够将一个函数转换为八进制宇符串。


【示例2】下面示例要求输入 Unicode 编码起始值和终止值，然后打印该范围内所有字符，同时使用 oct()函数和 hex()函数，显示八进制编码和十六进制编码。

```python
beg = int(input("请输入起始值："))                 # 需要输入值为数字类型，所以是int
end = int(input("请输入结束值："))                 # 需要输入值为数字类型，所以是int
print("十进制\t 八进制\t 十六进制\t 字符")           # 打印十进制、八进制、十六进制、字符；\t表示tab键，制表符。
for i in range(beg,end+1):                      # 循环输出指定的值，每次+1，比如：循环2-20，从2开始，到20结束；
    print("{}\t\t{}\t\t{}\t\t{}".format(i,oct(i),hex(i),chr(i)))        # 输出：{}表示结果，\t制表符，相当于tab键；oct转为八进制，hex转为十六进制，chr可以是十六进制，也可以是十进制。
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161317854.png)
#### 总结

>str() 	主要是转换为适合阅读的字符串
> repr()	主要是转换为解析器适合阅读的字符串
>eval() 	执行字符串代码
>  chr()	可以将数字转换为字符
>  hex(x)函数 能够将一个整数转换为十六进制字符串；
bin(x)函数 能够将一个整数转换为二进制字符串；
oct(x)函数 能够将一个函数转换为八进制宇符串。



### 2. 转为整数

#### int()
使用内置函数int()可以把数字或数字字符串转换为整数对象，语法格式如下：

```python
int(x)
int(x,base=10)
```

如果参数 x 为数字，则直接返回该数字表示的整数对象。如果没有传递参数，则返回0；
如果参数 x 不为数字，或者设置base参数，则 x 必须是字符串、bytes(字节串)、bytearray(字节数组，表示进制为base的整数字面值)。字符串 x 前面可以包含+或-，符号与数字中间不能有空格，但是字符串前后可以有空格。

- 1、 浮点数转为整数

```python
f = 1.23
i = int(f)
print(i)

#解析器输出
print(int(1.23))
#交互式界面
int(1.23)
```
输出结果都为：1

- 2、字符串转换为整数
```python
s = "123"
i = int(s)
print(i)

#解析器输出
print(int(123))
#交互式界面
int(123)
```
输出结果都为：123

>需要注意的是，将一个字符串转换为整数时，该字符串必须表示一个合法的整数，否则会抛出`ValueError`异常。例如：

```python
s = "123abc"  
i = int(s)  # 抛出 ValueError: invalid literal for int() with base 10: '123abc'
```

- 3、布尔值转换为整数

```python
b = True
i = int(b)
print(i)

#解析器输出
print(int(True))
print(int(False))
#交互式界面
int(True)
int(False)
```
输出结果为：True都为 1，False都为 0

#### ord()
- 4、使用 ord()
>ord函数是Python中的一个内置函数，用于将单个字符转换为其对应的Unicode码位。因此，如果要将整数转换为字符，可以使用chr函数。

可以将整数转换为字符，然后再次将字符转换回整数，可以使用以下代码：

```python
num = 65  # ASCII码中65对应的字符是'A'  
char = chr(num)  # 将整数转换为字符  
num_again = ord(char)  # 将字符转换回整数  
print(num_again)  # 输出：65
```
如果只是想将一个整数转换为ASCII码中的整数值，可以直接使用乘法运算。例如，ASCII码中65对应的字符是'A'，因此65乘以1等于65。

```python
num = 65  
ascii_value = num * 1  
print(ascii_value)  # 输出：65
```

### 3. 转为布尔值

#### bool()
>布尔值，参数可以为任意值，Python 的布尔逻辑是非零数字、非空字符串、非空容器等都为 `True`，而其他所有类型（包括 False、None、0、" "、()、[]、{}和浮点数的零）都为 `False`。
```python
#交互式界面
bool(1)			# 返回True
bool(2)			# 返回True
bool(0)			# 返回False
bool("0")		# 返回True
bool('2')		# 返回True
bool([1,2,3])	# 返回True

#解析器输出
print(bool(1))          # 返回True
print(bool(2))          # 返回True
print(bool(0))          # 返回False
print(bool("0"))        # 返回True
print(bool('2'))        # 返回True
print(bool([1,2,3]))    # 返回True
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161317031.png)


在 Python 中，布尔值是两种主要的值之一，它们表示逻辑真或假。你可以通过以下方法将其他类型转换为布尔值：

1. **转换为布尔**：当你使用布尔上下文（例如在 `if` 语句中）时，Python 会自动将某些类型转换为布尔。例如：


```python
x = []
if x:
    print("x is True")
else:
    print("x is False")
```
在这个例子中，Python 会将 `x` 自动转换为布尔值。因为 `x` 是空列表，所以它被转换为 `False`。

2. **使用 bool 函数**：你也可以使用 `bool` 函数来显式地将一个类型转换为布尔。例如：


```python
x = 0
y = bool(x)
print(y)  # prints: False
```
在这个例子中，`bool(x)` 将 `x` 转换为布尔值。

3. **特殊的布尔转换**：一些内置类型在 `bool` 函数下有特殊的转换规则。例如，非空字符串、非零的数字、非空的容器（如列表、字典、集合）都会被转换为 `True`。例如：


```python
x = "hello"
y = bool(x)
print(y)  # prints: True

z = []
a = bool(z) 
print(a) # prints: False
```
注意，Python 的布尔逻辑是非零数字、非空字符串、非空容器等都为 `True`，而其他所有类型（包括 False、None、0、" "、()、[]、{}和浮点数的零）都为 `False`。
### 4. 转为浮点数
#### float()
>float()函数可以把数字或者数字字符串转换为浮点数	；参数只能是数字和.点号，如果出现多个.点号，将抛出异常；

```python
#交互式界面
float(1)		# 输出结果为：1.0
float(12.34)	# 输出结果为：12.34
float("22")		# 输出结果为：22.0
float("22.22")	# 输出结果为：22.22
float(".222")	# 输出结果为：0.222

#解析器输出
print(float(1))         # 输出结果为：1.0
print(float(12.34))     # 输出结果为：12.34
print(float("22"))      # 输出结果为：22.0
print(float("22.22"))   # 输出结果为：22.22
print(float(".222"))	# 输出结果为：0.222
```
如果出现多个.点号，将抛出`ValueError`异常；

```python
float("2.3.445")
print(float("2.3.445"))
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161317589.png)



在Python中，还可以使用几种不同的方法来转换浮点数。

1. **转换为字符串**:
使用`str()`函数将浮点数转换为字符串。


```python
float_number = 3.14159
string_number = str(float_number)
print(string_number)  # 输出: "3.14159"
```
2. **从字符串转换为浮点数**:
使用`float()`函数将字符串转换为浮点数。


```python
string_number = "3.14159"
float_number = float(string_number)
print(float_number)  # 输出: 3.14159
```
3. **四舍五入为整数**:
使用`round()`函数将浮点数四舍五入为指定的位数。


```python
float_number = 3.14159
rounded_number = round(float_number, 2)  # 四舍五入到小数点后两位
print(rounded_number)  # 输出: 3.14
```
4. **转换为整数**:
使用`int()`函数将浮点数转换为整数。这将直接截断小数部分。


```python
float_number = 3.14159
integer_number = int(float_number)
print(integer_number)  # 输出: 3
```
5. **转换为复数**:
如果需要，可以将浮点数转换为复数。使用`complex()`函数。


```python
float_number = 3.14159
complex_number = complex(float_number)
print(complex_number)  # 输出: (3.14159+0j)
```
这些是在Python中进行浮点数转换的基本方法。根据你的需求选择适合的转换方法。
### 5. 转为复数
#### complex()
>complex()函数包含两个参数：
>第一个为`（实部）`：`real` 可以是`整数、浮点数或者字符串`；
>第二个为`（虚部）`：`imag` 可以是`整数或浮点数`，但不能是`字符串`。如果第一个参数为字符串，则不需要创建第二个参数。
>这里，real 和 imag 都是浮点数，分别代表实部和虚部。

```python
#交互式界面
complex(1)		# 输出为：(1+0j)；如果没有设置虚部值，那会自动使用默认的0作为虚部。
complex(1,2)	# 输出为：(1+2j)
complex("23")	# 输出为：(23+2j);字符串形式输出复数
complex("1+3j")	# 输出为：(1=3j)
complex("1.2") 	# 输出为：(1.2+0j)
complex("1.4+6j")	# 输出为：(1.4+6j)

#解析器输出
print(complex(1))		# 输出为：(1+0j)；如果没有设置虚部值，那会自动使用默认的0作为虚部。
print(complex(1,2))	# 输出为：(1+2j)
print(complex("23"))	# 输出为：(23+2j);字符串形式输出复数
print(complex("1+3j"))	# 输出为：(1=3j)
print(complex("1.2")) 	# 输出为：(1.2+0j)
print(complex("1.4+6j"))	# 输出为：(1.4+6j)
```


在Python中，复数的转换主要涉及实数和虚数的转换。复数在Python中通常用 `complex()` 函数或者字面量形式 `a+bj` 来表示，其中 `a` 和 `b` 是浮点数，表示实部和虚部。

下面是一些基本的复数转换操作：

1. 实数转换为复数：你可以通过添加一个零来将实数转换为复数。


```python
real_number = 5			#定义一个数字
complex_number = complex(real_number)	# 实例化对象输出real_number数字5转换为复数
print(complex_number)  # 输出：5+0j
```
2. 复数转换为实数：可以使用 `real` 属性来获取复数的实部。


```python
complex_number = 5+0j				# 定义复数5+0j
real_part = complex_number.real		# 返回复数的real（实部）
print(real_part)  # 输出：5.0		# 返回5.0
```
3. 复数转换为另一种形式的复数：例如，将实部和虚部分离。


```python
complex_number = 5+0j				# 定义复数5+0j
real_part = complex_number.real		# 返回复数的real（实部）
imaginary_part = complex_number.imag	# 返回复数的imag（虚部）
print(real_part, imaginary_part)  	# 输出：5.0 0.0（实部）5.0 （虚部）0.0
```
4. 将一个包含实部和虚部的元组转换为复数。（这个比较难理解，可以丢弃这个，后面会学到。）


```python
complex_number = (5, 0)		
complex_number = complex(*complex_number)
print(complex_number)  # 输出：5+0j
```
以上就是Python中进行复数转换的基本操作。


## 六、小结
> 本节主要讲了：python的基础语法的使用和如何定义变量、使用变量；还有数据类型的转换。
---
>讲到这里就完成了第二篇《Python的变量和数据类型》，接下来我还会持续输出Python学习文章，大家可以订阅我的专栏：[《python 学习》](https://blog.csdn.net/liu_chen_yang/category_11693372.html?spm=1001.2014.3001.5482)
>🐋 希望大家多多支持，我们一起进步！😄
🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗


