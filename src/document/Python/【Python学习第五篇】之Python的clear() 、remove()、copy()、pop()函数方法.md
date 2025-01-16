---
title: 【Python学习第五篇】之Python的clear() 、remove()、copy()、pop()函数方法
icon: circle-info
order: 1
category:
  - Python
tag:
  - Python
pageview: false
date: 2024-12-16
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




![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161326862.jpeg)


---

## 前言

> 这里写代码的工具为：PyCharm 2022.3.3 
> Python 版本为：3.8.5
> 工作平台：Windows

## 回顾上节
> &emsp;&emsp;上一节，我们



## 一、clear() 函数方法
&emsp;&emsp;clear()函数是一个非常有用的函数，能够快速、简单地清空列表和字典的所有元素。通过使用clear()函数，我们可以重复利用列表对象、清空缓存数据等，提高代码的性能和效率。
&emsp;&emsp;但需要注意，在使用clear()函数时要谨慎操作。

&emsp;&emsp;此方法仅支持可变容器类型，比如：列表、字节数组、字典和集合。语法如下：

```python
a.clear()           # 通用语法
list.clear()        # 列表
bytearray.clear()   # 字节数组
dict.clear()        # 字典
set.clear()         # 集合
```
- 【示例1】

```python
lst=[1,2,3]
bta=bytearray(b'abc')
dct={'a':1,'b':2}
st={1,2,3}
print(lst,"\n",bta,"\n",dct,"\n",st)

print("---"*30)

lst.clear()
bta.clear()
dct.clear()
st.clear()
print(lst,"\n",bta,"\n",dct,"\n",st)
```
结果为：

```python
[1, 2, 3] 
 bytearray(b'abc') 
 {'a': 1, 'b': 2} 
 {1, 2, 3}
------------------------------------------------------------------------------------------
[] 
 bytearray(b'') 
 {} 
 set()
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161326549.png)

对于序列来说，此操作等同于del s[:] 和 s[:]=[]，但不是del s，即只清空容器里的内容，而不会将容器对象删除。
- 【示例2】

```python
print("clear()方法清空内容")
s = [1,2,3]
print(s)

s.clear()
print(s)

print("---"*30)

print("del 方法清空内容1")
s1 = [1,2,3]
print(s1)

del s1[:]
print(s1)

print("---"*30)

print("del 方法清空内容2")
s2 = [1,2,3]
print(s2)

#del s2
#print(s2)
# 对序列中的切片子序列进行clear()操作，不会对原序列起作用；

print("---"*30)

print("del 方法清空内容3")
s3 = [1,2,3]
s3 [:2].clear()
print(s3)
```
结果为：

```python
clear()方法清空内容
[1, 2, 3]
[]
------------------------------------------------------------------------------------------
del 方法清空内容1
[1, 2, 3]
[]
------------------------------------------------------------------------------------------
del 方法清空内容2
[1, 2, 3]
------------------------------------------------------------------------------------------
del 方法清空内容3
[1, 2, 3]
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161326107.png)


&emsp;&emsp;进行clear()及copy()操作是为了与不支持切片操作的可变容器（例如：字典和集合）的接口保持一致。clear()是一个原地操作。
## 二、remove() 函数方法
&emsp;&emsp;在Python中，remove() 是一个常用的列表（list）方法。其主要用途是从列表中删除指定的内容，支持列表、字节数组、集合。

以下是 `remove()` 函数的基本语法：


```python
a.remove(x)			# 通用语法
list.remove(x)		# 列表      
bytearray.remove(x) # 字节数组
set.remove(x)       # 集合
```
其中，`x` 是你想要从列表中删除的元素。

删除s中第一个等于x的项目，执行原地操作，返回值为None，不同类型的规则如下：
- [ ] 列表：传入任意对象，如果不存在会引起ValueError；
- [ ] 字节数组：只能传入整型，如果不存在会引发ValueError；
- [ ] 集合：传入任意对象（不可变），如果不存在会引发ValueError。


总结：如果元素不存在于列表中，`remove()` 会引发一个 `ValueError`。

- 【示例1】如果元素不存在于<font color=red> **列表（list）**</font> 中，remove() 会引发一个 ValueError。

```python
list = [1,2,3,4]
print(list)			# 输出:[1,2,3,4]

list.remove(3)
print(list)			# 输出:[1,2,4]

list.remove(5)
print(list)			# 输出ValueError报错
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161326504.png)

- 【示例2】如果元素不存在于 <font color=red>**字节数组（bytearray）**</font> 中，remove() 会引发一个 ValueError。

这里的字节数组（ABC）代表的是ASCII值；首先，我们需要明确一点，一个字符串如"ABC"是由字符组成的，每个字符在计算机中都有对应的ASCII值，这些ASCII值是可以被转换为二进制的。

让我们来逐个处理这些字符：

* 'A' 的ASCII值是 65，转化为二进制是 1000001。
* 'B' 的ASCII值是 66，转化为二进制是 1000010。
* 'C' 的ASCII值是 67，转化为二进制是 1000011。

所以，字符串"ABC"的二进制表示是 1000001, 1000010, 1000011。

但是，我们在字节数组中要使用的是ASCII值，所以，如果remove(65)则是删除A、remove(66)则是删除B、remove(67)则是删除C。

```python
bta = bytearray(b"ABC")
print(bta)			# 输出:(b"ABC")

bta.remove(66)
print(bta)			# 输出:(b"AC")

bta.remove(1)
print(bta)			# 输出ValueError报错
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161326551.png)



- 【示例3】如果元素不存在于 <font color=red>**集合（set）**</font> 中，remove() 会引发一个 KeyError。
```python
se = {1,2,3}
print(se)		# 输出:{1,2,3}

se.remove(2)
print(se)		# 输出:{1,3}

se.remove(4)
print(se)		# 输出:KeyError: 4
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161326636.png)

如果删除一个不存在的元素，会报错：KeyError，可以使用以下方法处理：

```python
se2 = {1,2,3}
try:
    se2.remove(5)
except KeyError:
    pass

print(se2)			# 输出结果为：{1,2,3}
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161326948.png)

解析：
>&emsp;&emsp;定义了一个集合se2，并尝试从该集合中移除元素5。
>&emsp;&emsp;如果元素5不存在于集合se2中，代码会引发一个KeyError异常，但这个异常被try/except块捕获并忽略，因此程序会继续执行，不会停止。
>&emsp;&emsp;最后，代码会打印出集合se2的内容。由于元素5不在集合se2中，所以集合se2的内容在代码执行后仍然为{1,2,3}。
>
>---
>&emsp;&emsp;try：属于一个流程控制语句，用于在运行时捕获和处理异常。**try**语句用来尝试执行一些可能会引发异常的代码，而**except**语句则用来捕获并处理这些异常。完整的格式为：try: 内容 except 异常值: 内容；
>&emsp;&emsp;所以，当你看到try和except KeyError一起使用时，这意味着代码尝试执行一些可能会引发KeyError（键错误）的操作，例如访问字典中或集合中不存在的键。如果try中的代码引发了KeyError，那么程序将跳转到相应的except块，并执行在那里的代码。
>
>---
>&emsp;&emsp;pass是一个一个空操作符，表示什么都不做；它通常用于占位或作为语法上的需要，以确保代码的完整性。
&emsp;&emsp;当程序需要包含一个语句块，但该语句块没有任何实际的操作时，可以使用pass来填充这个位置。这样做可以保持代码的语法正确性，同时避免出现语法错误。

 * 【示例4】使用循环删除列表中的所有指定元素（用于重复元素）。


```python
list1 = [1, 2, 3, 2, 4, 2, 5]
element_to_remove = 2
for i in list1:
    if i == element_to_remove:
        list1.remove(i)
print(list1)  # 输出：[1, 3, 4, 5]
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161326901.png)


代码解析：
>在这个例子中，我们循环遍历列表 `list1`，如果元素等于 `element_to_remove`（即 `2`），就使用 `remove()` 方法删除它。最终，列表 `list1` 中的所有 `2` 都被删除了。

小结：
>讲解此remove方法都用到了 <font color=red>for循环和if判断和try抓取异常 </font>都属于后面的流程控制语句，现在看着有点懵，没关系，到后面学到，可以在返回来看看，这里可以做一个学习记号。

附加： 
>如果想删除 <font color=red>列表、字节数组、集合</font> 中的所有值；可直接使用<font color=red> clear() 函数方法</font> ；或者<font color=red> del切片操作</font>；
>如果想删除 <font color=red>列表、字节数组、集合</font> 中的某一个值或相等的值，可以使用 <font color=red>remove()函数方法</font> 。
>如果想按索引删除序列中的元素，可使用 <font color=red>pop()函数方法 </font>，第九小结会讲到pop()函数方法的使用。
>


## 三、copy() 函数方法

&emsp;&emsp;`copy()` 方法用于创建一个对象的浅拷贝（shallow copy）。浅拷贝是指创建一个新的对象，该对象包含原始对象中的元素的副本，但不递归复制嵌套对象的元素。这意味着原始对象和拷贝对象共享嵌套对象的引用。简单来说就是复制的意思；
&emsp;&emsp;`copy()`方法只支持容器类型，如列表、字节数组、字典、集合等。

&emsp;&emsp;`copy()` 方法通常用于复制列表、字典和其他可变对象，以便在不影响原始对象的情况下进行修改。

以下是 `copy()` 函数的基本语法：

```python
s.copy()			# 通用语法
list.copy()			# 列表      
bytearray.copy()	# 字节数组
dict.copy()			# 字典
set.copy()       	# 集合
frozenset.copy()	# 冻结集合
```

&emsp;&emsp;`copy()`函数方法不是原地操作，执行时需要将拷贝的对象赋值给一个变量。冻结集合`(frozenset)`虽然是不可变对象，但它也实现了`copy()`方法，可能是为了与set兼容。

- 【示例1】 复制列表

```python
original_list = [1, 2, 3, 4]		# 原数据
copied_list = original_list.copy()	# 对原数据进行复制

# 修改拷贝后的列表，不会影响原始列表
copied_list.append(5)   # 在复制后的数据中再加一个5
print(original_list)    # 输出原数据结果为：[1, 2, 3, 4]
print(copied_list)      # 输出复制后的数据结果为：[1, 2, 3, 4, 5]
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161326274.png)

* 【示例2】 复制字典

```python
original_dict = {'a': 1, 'b': 2, 'c': 3}	# 原数据
copied_dict = original_dict.copy()			# 对原数据进行复制

# 修改拷贝后的字典，不会影响原始字典
copied_dict['d'] = 4    # 在复制的字典中加一个d:4，不会影响原数据
copied_dict['e'] = 5	# 在复制的字典中加一个e:5，不会影响原数据
print(original_dict)    # 输出原数据结果为：{'a': 1, 'b': 2, 'c': 3}
print(copied_dict)      # 输出复制后的数据结果为：{'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5}
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161326883.png)



&emsp;&emsp;需要注意的是，`copy()` 方法仅创建原始对象的浅拷贝。如果原始对象包含嵌套的可变对象（例如列表内包含另一个列表），则拷贝后的对象仍然会共享这些嵌套对象的引用。如果需要深度拷贝（即递归地复制嵌套对象），可以使用 `copy` 模块中的 `deepcopy()` 方法。

* 【示例3】对原数据进行操作

```python
lst=[1,2,3,[4,5]]   # 原数据
print(lst)          # 输出原数据：[1, 2, 3, [4, 5]]

lst_copy=lst.copy() # 复制原数据
print(lst_copy)     # 输出复制的数据：[1, 2, 3, [4, 5]]

lst_copy.append(6)  # 对复制的数据添加一个数据
print(lst_copy)     # 输出添加后的复制的数据：[1, 2, 3, [4, 5], 6]

lst[0]=7            # 对原数据进行修改，0坐标也就是1改为7
print(lst)          # 输出原数据结果：[7, 2, 3, [4, 5]]

lst[-1] [-1]=-1     # 对原数据内部数据修改
print(lst)          # 输出原数据结果：[7, 2, 3, [4, -1]]

print(lst_copy)     # 再次输出复制后的数据；
# 输出结果为：[1, 2, 3, [4, -1], 6]
# 发现内部数据发生了变化，而第一层没有发生变化
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161326187.png)

&emsp;&emsp;不可变对象不支持通过`copy()`方法进行浅拷贝，因为没有意义，这相当于直接改变引用，如果需要深拷贝，则需要使用内置库的`copy.deepcopy()`函数；
&emsp;&emsp;关于浅拷贝和深拷贝的更多知识可查看次网站：[https://www.gairuo.com/p/python-library-copy](https://www.gairuo.com/p/python-library-copy)

* 【示例4】浅拷贝与深拷贝

>copy：浅拷贝
deepcopy：深拷贝
a.append()：修改浅对象
a.deepcopy()：修改深对象
```python
import copy

a = [1, 2, ['a', 'b']] # 原对象

b = a                  # 赋值，传引用
c = copy.copy(a)       # 浅拷贝
d = copy.deepcopy(a)   # 深拷贝

a.append(3)            # 修改浅对象a
a[2][0] = 0          # 修改深 原对象列表元素中的第一个值

print( '原内容：', a, '# 原对象修改后的值')
print( '再赋值：', b, '# 只是引用，就是原对象')
print( '浅拷贝：', c, '# 受到对象内部对象的变化，外部的不受影响')
print( '深拷贝：', d, '# 不受原对象的变化')

# 输出结果
'''
原内容： [1, 2, [0, 'b'], 3] # 原对象修改后的值
再赋值： [1, 2, [0, 'b'], 3] # 只是引用，就是原对象
浅拷贝： [1, 2, [0, 'b']] # 受到对象内部对象的变化，外部的不受影响
深拷贝： [1, 2, ['a', 'b']] # 不受原对象的变化
'''
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161326529.png)

可以用 [https://pythontutor.com/live.html](https://pythontutor.com/live.html) 进行在线测试，观看实时效果。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161326395.png)

小结：
>&emsp;&emsp;由于 Python 内部引用计数的特性，对于不可变对象，浅拷贝和深拷贝的作用是一致的，就相当于复制了一份副本，原对象内部的不可变对象的改变，不会影响到复制对象；
&emsp;&emsp;浅拷贝的拷贝。其实是拷贝了原始元素的引用（内存地址），所以当拷贝可变对象时，原对象内可变对象的对应元素的改变，会在复制对象的对应元素上，有所体现；
&emsp;&emsp;深拷贝在遇到可变对象时，又在内部做了新建了一个副本。所以，不管它内部的元素如何变化，都不会影响到原来副本的可变对象。
## 四、pop() 函数方法
&emsp;&emsp;`pop()` 方法用于从列表、字典或集合中删除并返回指定位置或键的元素（或值）。`pop()` 方法有不同的用法，具体取决于数据类型。

以下是 `pop()` 函数的基本语法：

```python
s.pop()				# 通用语法
s.pop(i)			# 通用语法2

# 其他类型的语法
list.pop(index=-1, /)			# 列表      
bytearray.pop(index=-1, /)		# 字节数组
dict.pop(k[,d])					# 字典
set.pop()       				# 集合
```
s.pop(i)的作用是在提取在i（字典是键，不能为空）位置上的项，并将其从s中移除。应用该方法时，不同类型的数据的行为如下。
- [ ] 列表和字节数组：默认删除最后一项，如果容器为空或是索引超出范围则抛出KeyError。
- [ ] 字典：删除指定的键并返回相应的值；如果找不到键，就返回默认值（如果给定），否则引发抛出KeyError。
- [ ] 集合：删除并返回任意元素值，如果集合为空，则引发抛出KeyError。

### 1. 在列表中使用 `pop()`

在列表中，`pop()` 方法通常用于删除并返回指定索引位置的元素。如果不提供索引，则默认删除并返回列表中的最后一个元素。

```python
my_list = [1, 2, 3, 4, 5]   # 定义一个列表[1, 2, 3, 4, 5]
print(my_list)              # 输出列表：[1, 2, 3, 4, 5]

# 删除并返回索引为 2 的元素（值为 3）
popped_element = my_list.pop(2)
print(popped_element)  # 输出结果为: 3
print(my_list)         # 输出结果为: [1, 2, 4, 5]

# 不写默认删除最后一个，删除并返回最后一个元素（值为 5）
popped_element = my_list.pop()
print(popped_element)  # 输出结果为: 5
print(my_list)         # 输出结果为: [1, 2, 4]
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161325954.png)



```python
lst=[1,2,[3,4]]     # 定义一个列表
print(lst)          # 输出结果为：[1, 2, [3, 4]]

lst.pop(0)          # 删除第0个坐标，从0开始逐步向后，[3,4]被视为一体
print(lst)          # 输出结果为：[2, [3, 4]]

lst.pop(1)          # 删除第1个坐标，从0开始逐步向后，[3,4]被视为一体，这里不能删除2，因为在第二个里面已经删除了0，1自然就接替了0，所以，删除后面的[3,4]就是1
print(lst)          # 输出结果为：[2]
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161325159.png)



### 2. 在字典中使用 `pop()`

在字典中，`pop()` 方法用于删除并返回指定键的值。如果键不存在于字典中，并且提供了默认值，那么返回默认值，否则会引发 KeyError 异常。


```python
my_dict = {'a': 1, 'b': 2, 'c': 3}  # 定义一个字典
print(my_dict)                      # 输出字典：{'a': 1, 'b': 2, 'c': 3}

# 删除并返回键为 'b' 的值
popped_value = my_dict.pop('b')
print(popped_value)  # 输出结果为: 2
print(my_dict)       # 输出结果为: {'a': 1, 'c': 3}

# 删除并返回键为 'x' 的值（提供默认值）
popped_value = my_dict.pop('x', 0)
print(popped_value)  # 输出结果为: 0
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161325278.png)

```python
dic={'a':1,'b':2,'c':3}     # 定义一个字典
print(dic)                  # 输出字典结果：{'a': 1, 'b': 2, 'c': 3}

popped_value = dic.pop('b')   # 删除并返回键为 'b' 的值
print(popped_value)         # 输出结果为: 2
print(dic)                  # 输出结果为: {'a': 1, 'c': 3}

dic.pop('d')                # 删除并返回键为 'd' 的值，字典中没有d，则抛出KeyError
print(dic)                  # 输出结果为：抛出KeyError
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161325459.png)

### 3. 在集合中使用 `pop()`
在集合中，`pop()` 方法用于删除并返回集合中的一个随机元素。由于集合是无序的，不能预测哪个元素会被弹出。

```python
my_set = {1, 2, 3, 4, 5}    # 定义一个集合
print(my_set)               # 输出定义的集合：{1, 2, 3, 4, 5}

# 删除并返回一个随机元素
popped_element = my_set.pop()
print(popped_element)  # 输出: 随机元素，例如 1 或 2 或 3
print(my_set)          # 输出: 剩余元素组成的集合
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161325631.png)

```python
my_set = {1,2}  # 定义一个集合
print(my_set)   # 输出集合：{1, 2}

my_set.pop()    # 随机删除一个元素，那么此时里面元素就剩一个了；
my_set.pop()    # 在随机删除一个元素,这时候里面就已经没有元素了；
print(my_set)   # 输出集合：set()，这时候里面就是空的了；

my_set.pop()    # 在随机删除一个元素，因为已经是空的了，如果在删除的话就会抛出KeyError。
print(my_set)   # 输出集合：抛出KeyError
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161325536.png)


### 4. 在字节数组中使用`pop()`
默认删除最后一项，如果容器为空或是索引超出范围则抛出KeyError。

```python
bta = bytearray(b'abc')     # 定义一个字节数组
print(bta)                  # 输出结果为：bytearray(b'abc')

popped_value = bta.pop(1)   # 删除字节数组中的第一位
print(bta)                  # 输出结果为：bytearray(b'ac')
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161325695.png)

`pop()` 方法在不同的数据类型中有不同的用法，但它通常用于删除并返回一个元素，可以根据需要提供索引、键或默认值。
`pop()` 方法是一个原地操作。注意：传值时只能用位置参数，不能传关键字参数，既不能写成`index=n`这种形式。


附加： 
>如果想删除 <font color=red>列表、字节数组、集合</font> 中的所有值；可直接使用<font color=red> clear() 函数方法</font> ；或者<font color=red> del切片操作</font>；
>如果想删除 <font color=red>列表、字节数组、集合</font> 中的某一个值或相等的值，可以使用 <font color=red>remove()函数方法</font> 。
>如果想按索引删除序列中的元素，可使用 <font color=red>pop()函数方法 </font>，第九小结会讲到pop()函数方法的使用。
>



---

>讲到这里就完成了第一篇《认识Python》，接下来我还会持续输出Python学习文章，大家可以订阅我的专栏：[《python 学习》](https://blog.csdn.net/liu_chen_yang/category_11693372.html?spm=1001.2014.3001.5482)
>🐋 希望大家多多支持，我们一起进步！😄
🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗


