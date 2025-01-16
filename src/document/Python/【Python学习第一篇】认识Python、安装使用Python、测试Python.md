---
title: 【Python学习第一篇】认识Python、安装使用Python、测试Python
icon: circle-info
order: 1
category:
  - Python
tag:
  - Python
pageview: false
date: 2025-01-30
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


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161323934.jpeg)

---

## 学习路线

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161324137.png)

后续可能会因为其他原因打乱顺序 或 添加目录、项目；以实际的内容来说，此图仅作最初参考。

> &emsp;&emsp;Python 是一种简单易学、功能强大的编程语言，提供了高效的、高级的数据结构，能够简单有效的面向对象编程。Python 优雅的语言和动态类型，以及解释型语言的本质，使它成为多数平台上编写脚本和快速开发应用的重要语言，如人工智能、云计算、科学计算、大数据处理、自动化测试、数据分析、互联网应用等等。
## Python 的历史
>&emsp;&emsp;Python是一种高级编程语言，由Guido van Rossum在1989年创造。Guido在荷兰国家数学和计算机科学研究所（CWI）工作时，开始设计Python，并在1991年发布了第一个版本。<br>
>&emsp;&emsp;自20世纪90年代初Python语言诞生至今，它已被逐渐广泛应用于系统管理任务的处理和Web编程。<br>
&emsp;&emsp;1995年，Guido van Rossum在弗吉尼亚州的国家创新研究公司（CNRI）继续他在Python上的工作，并在那里发布了该软件的多个版本。 <br>
&emsp;&emsp;2000年五月，Guido van Rossum和Python核心开发团队转到BeOpen.com并组建了BeOpen PythonLabs团队。同年十月，BeOpen PythonLabs团队转到Digital Creations（现为Zope Corporation）。<br>
&emsp;&emsp;2001年，Python软件基金会（PSF）成立，这是一个专为拥有Python相关知识产权而创建的非营利组织。Zope Corporation是PSF的赞助成员。<br>
&emsp;&emsp;Python的创始人为荷兰人吉多·范罗苏姆（Guido van Rossum）。1989年圣诞节期间，在阿姆斯特丹，Guido为了打发圣诞节的无趣，决心开发一个新的脚本解释程序，作为ABC语言的一种继承。之所以选中单词Python（意为大蟒蛇）作为该编程语言的名字，是因为英国20世纪70年代首播的电视喜剧《蒙提·派森的飞行马戏团》（Monty Python's Flying Circus）。<br>
&emsp;&emsp;ABC是由Guido参加设计的一种教学语言。就Guido本人看来，ABC这种语言非常优美和强大，是专门为非专业程序员设计的。但是ABC语言并没有成功，究其原因，Guido认为是其非开放造成的。Guido决心在Python中避免这一错误。同时，他还想实现在ABC中闪现过但未曾实现的东西。<br>
&emsp;&emsp;就这样，Python在Guido手中诞生了。可以说，Python是从ABC发展起来，主要受到了Modula-3（另一种相当优美且强大的语言，为小型团体所设计的）的影响。并且结合了Unix shell和C的习惯。<br>
&emsp;&emsp;Python 已经成为最受欢迎的程序设计语言之一。自从2004年以后，python的使用率呈线性增长。Python 2于2000年10月16日发布，稳定版本是Python 2.7。Python 3于2008年12月3日发布，不完全兼容Python 2。2011年1月，它被TIOBE编程语言排行榜评为2010年度语言。

## Python 的语言特点
- 简单易学：Python 语法简洁、明确、简单；
- 易于维护：Python 的源代码风格清晰整齐、强制缩进，容易维护；
- 跨平台：Python 程序可以在任何安装解释器的计算机环境中执行；
- 丰富的库：Python 预压本身功能有限，其最大的优势之一是丰富的库，且在UNIX、Linux、Windows 和 Macintosh 等平台都有很好的兼容性；
- 互动模式：互动模式的支持，可以在不同的终端输入执行代码，并获得结果，实现互动测试和代码片段调式；
- 速度较快：Python的底层是用C语言写的，很多标准库和第三方库也都是用C写的，运行速度非常快；
- 免费、开源：Python是FLOSS（自由/开放源码软件）之一。使用者可以自由地发布这个软件的拷贝、阅读它的源代码、对它做改动、把它的一部分用于新的自由软件中。FLOSS是基于一个团体分享知识的概念；
- 高层语言：用Python语言编写程序的时候无需考虑诸如如何管理你的程序使用的内存一类的底层细节；
- 可移植性：由于它的开源本质，Python已经被移植在许多平台上（经过改动使它能够工作在不同平台上）。这些平台包括Linux、Windows、FreeBSD、Macintosh、Solaris、OS/2、Amiga、AROS、AS/400、BeOS、OS/390、z/OS、Palm OS、QNX、VMS、Psion、Acom RISC OS、VxWorks、PlayStation、Sharp Zaurus、Windows CE、PocketPC、Symbian以及Google基于linux开发的android平台；
- 可扩展性、可扩充性：如果需要一段关键代码运行得更快或者希望某些算法不公开，可以部分程序用C或C++编写，然后在Python程序中使用它们。
Python本身被设计为可扩充的。并非所有的特性和功能都集成到语言核心。Python提供了丰富的API和工具，以便程序员能够轻松地使用C语言、C++、Cython来编写扩充模块。Python编译器本身也可以被集成到其它需要脚本语言的程序内。因此，很多人还把Python作为一种“胶水语言”（glue language）使用。使用Python将其他语言编写的程序进行集成和封装。在Google内部的很多项目，例如Google Engine使用C++编写性能要求极高的部分，然后用Python或Java/Go调用相应的模块。《Python技术手册》的作者马特利（Alex Martelli）说：“这很难讲，不过，2004年，Python已在Google内部使用，Google 召募许多 Python 高手，但在这之前就已决定使用Python，他们的目的是 Python where we can，C++ where we must，在操控硬件的场合使用C++，在快速开发时候使用Python。”
- 可嵌入性：可以把Python嵌入C/C++程序，从而向程序用户提供脚本功能。
- 面向对象：Python既支持面向过程的编程也支持面向对象的编程。在“面向过程”的语言中，程序是由过程或仅仅是可重用代码的函数构建起来的。在“面向对象”的语言中，程序是由数据和功能组合而成的对象构建起来的。
Python是完全面向对象的语言。函数、模块、数字、字符串都是对象。并且完全支持继承、重载、派生、多继承，有益于增强源代码的复用性。Python支持重载运算符和动态类型。相对于Lisp这种传统的函数式编程语言，Python对函数式设计只提供了有限的支持。有两个标准库（functools，itertools）提供了Haskell和Standard ML中久经考验的函数式程序设计工具。
- 等等，更多可以再去百度一下。


## Python 的应用范畴

>Python被广泛应用于各种领域，包括但不限于以下几个方面：
> 
> 1. Web开发：Python可以用于开发Web应用程序、后端服务器和API，常用的Python Web框架包括Django、Flask和Pyramid等。
> 
> 2. 数据科学：Python是数据科学领域的主要工具之一。Python的科学计算库NumPy、数据处理库pandas和数据可视化库Matplotlib、Seaborn等都被广泛应用于数据分析、数据挖掘和机器学习等方面。
> 
> 3. 人工智能：Python可以处理大量的数据，因此被广泛应用于人工智能领域。Python的深度学习框架包括TensorFlow、Keras和PyTorch等已成为人工智能领域的标准之一。
> 
> 4. 网络编程：Python的socket库可以用于网络编程，同时Python还有许多第三方库可以应用于网络编程，如Twisted、Asyncio、gevent等。
> 
> 5. 自动化运维：是指使用Python编程语言实现自动化功能，以提高运维效率和质量。常见的Python自动化运维场景包括：自动化部署：使用Python编写自动化脚本，实现快速、可靠的应用程序部署。监控告警：使用Python编写自动化脚本，实现监控系统的自动化警报和报警。日志分析：使用Python编写自动化脚本，快速分析日志，自动识别和处理异常日志。自动化测试：使用Python编写自动化测试脚本，提高测试效率和质量。数据处理：使用Python编写自动化脚本，实现数据的收集、处理、分析和可视化。Python自动化运维广泛应用于Linux系统的管理、容器化技术、DevOps实践等领域。
> 
> 6. 游戏开发：Python可以用于开发各种类型的游戏，包括桌面游戏、网页游戏和移动游戏等。
> 
> 总的来说，Python是一种广泛应用于各种领域的编程语言，它的简单易学、灵活性强和功能强大等特点都使得它成为了目前最受欢迎的编程语言之一。

## 如何学习 Python

>学习Python的步骤如下：
> 1. 了解Python的基础知识：学习Python的语法、基本数据类型、变量、列表、字典、函数等基础知识。
> 
> 2. 学习Python的高级特性：如迭代器、生成器、装饰器、闭包等Python独有的特性。
> 
> 3. 学习Python的标准库：Python标准库提供了丰富的库函数和模块，如re、os、time、random等，需要掌握这些模块的使用方法。
> 
> 4. 学习Python的第三方库：Python有丰富的第三方库，如numpy、scipy、pandas等，需要掌握这些库的使用方法。
> 
> 5. 实践练习：通过完成一些小项目和练习题，巩固Python的基础知识和高级特性。
> 
> 6. 参考学习资源：可以参考一些Python的书籍、视频教程和网上教程。
> 
> 7. 参加Python社区：加入Python社区，与其他Python开发者交流学习经验，获取更多的学习资源和解决问题的方法。
> 
> 总之，学习Python需要坚持不懈地学习和实践，掌握其基础知识和高级特性，才能成为一名合格的Python开发者。

## 安装使用 Python 及测试 Python
>可参考文章：[Windows上安装 Python 环境并配置环境变量 （超详细教程）](https://liucy.blog.csdn.net/article/details/131808146)
---
>讲到这里就完成了第一篇《认识Python》，接下来我将持续输出Python学习文章，大家可以关注我的专栏：[《python 学习》](https://blog.csdn.net/liu_chen_yang/category_11693372.html?spm=1001.2014.3001.5482)
>🐋 希望大家多多支持，我们一起进步！😄
🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗
