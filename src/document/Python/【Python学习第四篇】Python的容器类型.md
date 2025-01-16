---
title: 【Python学习第四篇】Python的容器类型
icon: circle-info
order: 1
category:
  - Python
tag:
  - Python
pageview: false
date: 2025-04-26
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


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161324543.jpeg)





---

## 前言

> 这里写代码的工具为：PyCharm 2022.3.3 
> Python 版本为：3.8.5
> 工作平台：Windows


## 回顾上节
>  &emsp;&emsp;上一节，我们

本章我们将讲解容器类型的一些知识。
## 一、容器类型的概述
>python的容器类型主要有：字符串、元组、列表、集合、字典等。
>本节我们将的是容器的分类体系和通用特性。
## 二、容器的分类
在Python中，"容器"通常指的是可以存储多个项的数据结构。常见的Python容器类型包括以下几种：

1. <font color=blue>**列表（List）**：</font>列表是Python中最常用的容器类型之一。列表是有序的，可以包含不同类型的元素，并且可以在列表中混合和匹配各种类型的数据。
2. <font color=blue>**元组（Tuple）**：</font>元组与列表类似，但有一个重要的区别：元组是不可变的。也就是说，一旦创建了元组，就不能更改其中的元素。
3. <font color=blue>**集合（Set）**：</font>集合是一个无序的容器，用于存储唯一元素。集合的一个重要特点是它不支持索引和切片。
4. <font color=blue>**字典（Dictionary）**：</font>字典是一个无序的容器，它存储的是键值对。字典中的每个元素都由一个唯一的键和一个对应的值组成。
5. <font color=blue> **列表推导式（List Comprehension）**：</font>列表推导式是一种在一行代码中创建新列表的简洁方式。它们通常用于对列表中的每个元素进行某种操作，然后将结果作为新列表的元素返回。
6. <font color=blue>**生成器（Generator）**：</font>生成器是一种特殊类型的迭代器，用于在需要时才生成值，从而节省内存。生成器在每次迭代时只生成一个值，而不是预先生成所有值并将它们存储在内存中。
7. <font color=blue>**集合推导式（Set Comprehension）**：</font>集合推导式与列表推导式类似，但是它们创建的是集合，而不是列表。集合推导式通常用于创建包含唯一元素的集合。
8. <font color=blue>**字典推导式（Dictionary Comprehension）**：</font>字典推导式是一种在一行代码中创建新字典的简洁方式。它们通常用于对字典中的每个键值对进行某种操作，然后将结果作为新字典的元素返回。

这些容器类型各有其用途和优势，可以根据具体需求选择合适的容器类型来存储和处理数据。
## 三、拼接
两个操作数可以通过+（加号）或*（乘号）运算符完成拼接与重复拼接操作。

【示例】

```python
print('a' + 'b')	# 输出结果为：ab
print('a'+'b','a'* 3)	# 输出结果为：ab aaa
print((1,2,3) * 3)	# 输出结果为：(1, 2, 3, 1, 2, 3, 1, 2, 3)
print([]+[],[] * 4)	# 输出结果为：[] [] 
print("---"* 50)	# 输出结果为：50个---；常用于分割内容
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161325138.png)

><font color=red>提示：range对象、字典、集合由于其定义的特点，所以不支持拼接操作。</font>

如果要对一个以字符串为元素的序列（可迭代对象）进行拼接，可以使用str对象的join()方法，该方法可以支持字符串连接；

【示例】

```python
# 设置一个空字符串来连接abc
print(''.join(('a','b','c')))	# 输出结果为：abc

# 设置一个_连接符，来连接abc之间
print('_'.join(('a','b','c')))	# 输出结果为：a_b_c
# 其实设置字符串连接符在第二章也讲到了，可以使用sep的方式；
print('a','b','c',sep='_')	# 输出结果为：a_b_c

# 使用空格添加到每个字符之间（不可以使用,主动分隔符，会导致不生效）
print(' '.join(('abc def')))	# 输出结果为：a b c   d e f
print(' '.join(('abc''def')))	# 输出结果为：a b c d e f
print(' '.join(('abc','def')))	# 输出结果为：abc def

# 使用字典形式输出；以，为分隔符
print(','.join({'a':1,'b':2}))	# 输出结果为：a,b
```

>总结：就是拼接就是将字符串拼接起来，可以定义分隔符；可以使用.join方法，或者使用sep方法，但是join()方法可以支持range对象、字典、集合。

## 四、迭代
>迭代其实就是将结果以列的形式输出到页面上，最常使用的是for循环。（个人观点，如有疑问可提出，我也是刚开始学。）

- 【示例1】迭代abc

```python
for i in ["a","b","c"]:
    print(i)
```

> 输出结果为：
>  a
>   b
>    c<br>
>    ![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161325760.png)

- 【示例2】while迭代abc

```bash
# while语句，无限循环，在满足一定条件下会不断重复处理容器的数据
num = ['a','b','c']
# 不间断删除元素
while num:
    print(num.pop())
```
> 输出结果为：
>  c
>   b
>    a<br>
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161325760.png)

另外，列表、字典、集合的推导式都可以进行类似的迭代操作；我们可以将数据转换为一个列表和字典；

- 【示例3】

```python
num = 'abc'
[i for i in num]
# ['a','b','c']
{i:0 for i in num}
# {'a':0,'b':0,'c':0}

# 上面的过程可以附带操作后者调用函数
[print(f'哎呀！迭代{i}了')for i in num]
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161325086.png)

>不过，不建议这样操作。


## 五、原地操作
&emsp;&emsp;Python的有些方法被设计成原地操作（in-place），不返回新对象，而是直接对原对象进行修改。Python的很多可变对象都有这种机制，众多第二方库包也大量采用了这种机制。
&emsp;&emsp;以最常见的列表append()函数方法来说，他在列表的尾部追加一个元素，是一个典型的原地操作；常用于列表。

```python
a = [1,2]
b = a.append(3)
print(a)    # 结果为：[1,2,3]

print(b)    # 结果为：None

a = a.append(4)
print(a)    # 结果为：None
```
&emsp;&emsp;可以看到，他对原对象进行了修改，返回的None值，因此我们不能再用append()操作进行赋值，因为赋值的表示符号的对象为None，如果再赋值给原对象，原对象的标识符绑定的对象也会成为None。
>&emsp;&emsp;原地操作又叫就地操作。支持原地操作的函数和方法会改变对象自身的值，这种操作的好处是更加面向对象，并且可以节省一定的数据存储空间。

&emsp;&emsp;Python内部就有很多原地操作，如operator模块提供的数值计算中以i开头的函数来提供原地操作版本。例如：iadd是一个原地加法，他是add的原地操作版本，将两个字符串拼接起来；

```python
from operator import iadd
a = 'hello'
b = iadd(a,' world')
print(b,"\n",a)
```
Python的多重赋值语句，如a+b，是语法上的一个原地操作，如：

```python
a = 'hello'
a += ' world!'
print(a)
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161325739.png)



### Python中常见的内置数据类型的原地操作方法如下：
- [ ] append()，支持列表、字节数组等；
- [ ] extend()，支持列表、字节数组等；
- [ ] update()，支持字典；
- [ ] insert()，支持列表、字节数组等；
- [ ] clear()，支持列表、字典、集合；
- [ ] pop()，支持列表、字节数组、字典、集合等；
- [ ] remove()，支持列表、字节数组、集合等；
- [ ] reverse()，支持列表、字节数组等；
- [ ] sort()，支持列表等。



## 六、推导式
>&emsp;&emsp;在构造列表、集合、字典时，Python提供了名为"显示"的特殊句法，用方括号和或括号将容器的元素包裹起来，括号里的内容支持两种形式：一种是显式的写元素，并用括号分割；另一种是写for语句来迭代生产元素，可以有多个for字句和if字句。这是一个非常方便、紧凑地定义列表的方式，可以大幅减少代码量。

下面来写几个推导式构造的示例；

* 将一个可迭代对象展开，得到第一个列表

```python
tui1=[ i for i in range(5) ]
print(tui1)

# 结果为：[0, 1, 2, 3, 4]
```
为什么`[i for i in range(5)]` 的 `i` 在前面有一个呢，因为最前面的 `i` 代表输出循环的值，使用推导式的时候需要写在最前面，并且可以在一行中展示，也可以用普通的for循环方式来写；只不过结果是竖行的；

```python
for i in range(5):
    print(i)
```

* 可以处理结果

```python
tui2=['第'+str(i) for i in range(5)]
print(tui2)

# 结果为：['第0', '第1', '第2', '第3', '第4']


for i in range(5):
    print('第'+str(i))

# 结果为：
第0
第1
第2
第3
第4
```
* 可以进行条件筛选，实现取偶值

```python
tui3=[i for i in range(5) if i%2==0]
print(tui3)

# 结果为：[0, 2, 4]


for i in range(5):
    if i%2==0:
        print(i)
# 结果为：
0
2
4
```
* 拆分字符串，过滤空格，并统一转换为大写字母

```python
# he定义一个变量
# lou定义一个for循环，循环输出he变量，并将结果转换为大写，并且判断不输出为空的内容
# 输出lou变量
he="Hello Word !!!"
lou=[i.upper() for i in he if i != ' ']
print(lou)

# 结果为：['H', 'E', 'L', 'L', 'O', 'W', 'O', 'R', 'D', '!', '!', '!']

# 复杂代码拆分开为：
he="Hello Word !!!"	# 定义了一个变量
lou=[i.upper()		# 输出的循环值，并转换为大写
     for i in he	# for循环输出he变量
     if i != ' ']	# 判断值不为空输出
print(lou)			# 输出lou变量的结果
```
* 条件分支，判断值是否为good，如果是则输出1，如果不是则输出0

```python
# 这块为什么要先写if再写for呢，因为如果不先写if的true值，在后面就会报错；
data=['good','bad','bad','good','nad']
pan=[ 1 if x=='good' else 0 for x in data]
print(pan)

# 拆开来写
data=['good','bad','bad','good','nad']  # 定义一个数组变量
for x in data:				# 需先使用for循环 循环data变量的值给到x
    if x=='good':			# 才可以使用x来判断是否等于自己想要的值
        print(1)
    else:
        print(0)
```
* 集合推导式

```python
# 循环1，4，长度为3，输出1，4的2次方，1*1\2*2\3*3 ： 结果为：1 4 9
a=[i**2 for i in range(1,4)]
print(a)

# 结果为：[1, 4, 9]


my_list=[1,2,3]		# 定义一个列表：1，2，3
for i in my_list:	# for循环输出my_list变量值
    print(i**2)		# 输出列表中的值的2次方

list2=[i**2 for i in my_list]	# 使用推导式for循环输出1-3的值的2次方
print(list2)					# 输出list2变量
```
* 利用推导式生成新的字典

```python
# i: i*10 循环1-5有4个长度，也就是循环1*10-4*10
d={i: i*10 for i in range(1,5)}
print(d)
# 结果为：{1: 10, 2: 20, 3: 30, 4: 40}


for i in range(1,5):	# 循环1-5的长度4
    print({i: i*10})	# 将结果给到i，输出新的字典
# 结果为：
{1: 10}
{2: 20}
{3: 30}
{4: 40}
```
* 如果要将两个序列对齐为对应的键值，可以借助Python的内置函数zip，示例代码如下：

```python
name=('Tom','Lucy','Sozt')	# 定义姓名列表
ages=[18,20,19]				# 定义年龄列表
na=list(zip(name,ages))		# 利用内置函数，将name和ages放在一块
print(na)					# 输出结果为：[('Tom', 18), ('Lucy', 20), ('Sozt', 19)]

xl={i:x for i,x in zip(name,ages)}
print(xl)
# 输出结果为：{'Tom': 18, 'Lucy': 20, 'Sozt': 19}
```

&emsp;&emsp;可见，如果推导式语句比较复杂，可以将代码物理换行，利用容器中的隐式拼接特性是代码更加易读、易写；
&emsp;&emsp;集合和字典的括号都是花括号，但字典必须生成的元素和键值格式的，语句执行时会自动认定为字典，而不是集合。
&emsp;&emsp;要注意的是，元组并没有推导式，在圆括号内写类似的代码生成的是一个迭代器。

## 七、collections 容器类型
&emsp;&emsp;Python的内置容器类型已经可以满足我们的日常进行数据存储和处理的需求了，但在一些特殊的场景下，需要对这些数据类型的特性进行增强。比如：让元组的每个元素有名字，方便我们像字典一样根据名称来读取数据；

&emsp;&emsp;Python标准库`collections` 模块实现了一些增强功能的容器数据类型，具体如下：
 * [ ] namedtuple()：创建命名元组子类的工厂函数；
 * [ ] deque：类似列表的容器，实现了在两端快速添加（append）和弹出（pop）；
 * [ ] ChainMap：类似字典的容器类，将多个映射集合到一个视图里面；
 * [ ] Counter：字典的子类，提供了可哈希对象的计数功能；
 * [ ] OrderedDict：字典的子类，保存了他们被添加的顺序；
 * [ ] defaultdict：字典的子类，提供了一个工厂函数，为字典查询提供了一个默认值；
 * [ ] UserDict：封装了字典的对象，简化了字典子类化；
 * [ ] UserList：封装了列表的对象，简化了列表子类化；
 * [ ] UserString：封装了字符串对象，简化了字符串子类化。

>而这些数据类型都需要先使用`import` 语句导入才可以使用。

## 八、小结
>本节主要讲了：Python内置容器类型的设计理念、体系、分类和常用操作；还有一些输出的拼接、迭代和原地操作；最主要的还是推导式的使用。
---

>讲到这里就完成了第四篇《Python的容器类型》，接下来我还会持续输出Python学习文章，大家可以订阅我的专栏：[《python 学习》](https://blog.csdn.net/liu_chen_yang/category_11693372.html?spm=1001.2014.3001.5482)
>🐋 希望大家多多支持，我们一起进步！😄
🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

