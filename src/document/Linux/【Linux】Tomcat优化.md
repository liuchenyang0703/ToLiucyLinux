---
title: 【Linux】Tomcat优化
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - Tomcat
  - 运维
pageview: false
date: 2024-12-18
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180945178.jpeg)


## 1、Tomcat整体架构
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180945033.png)
&emsp;&emsp;Tomcat中最顶层的容器是Server，代表着整个服务器，从上图中可以看出，一个Server可以包含至少一个Service，用于具体提供服务。

&emsp;&emsp;Service主要包含两个部分：Connector和Container。从上图中可以看出 Tomcat 的心脏就是这两个组件，他们的作用如下：
- Connector用于处理连接相关的事情，并提供Socket与Request和Response相关的转化; 
- Container用于封装和管理Servlet，以及具体处理Request请求；

&emsp;&emsp;一个Tomcat中只有一个Server，一个Server可以包含多个Service，一个Service只有一个Container，但是可以有多个Connectors，这是因为一个服务可以有多个连接，如同时提供Http和Https链接，也可以提供向相同协议不同端口的连接,示意图如下:
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180945706.png)
&emsp;&emsp;多个Connector 和一个Container就形成了一个 Service，有了Service就可以对外提供服务了，但是Service 还要一个生存的环境，必须要有人能够给她生命、掌握其生死大权，所以整个Tomcat 的生命周期由Server控制。
&emsp;&emsp;server.xml配置文件如下:

```bash
<?xml version="1.0" encoding="UTF-8"?>
<Server port="8005" shutdown="SHUTDOWN">
  <Listener className="org.apache.catalina.startup.VersionLoggerListener" />
  <Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on" />
  <Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener" />
  <Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener" />
  <Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener" />
  <GlobalNamingResources>
    <Resource name="UserDatabase" auth="Container"
              type="org.apache.catalina.UserDatabase"
              description="User database that can be updated and saved"
              factory="org.apache.catalina.users.MemoryUserDatabaseFactory"
              pathname="conf/tomcat-users.xml" />
  </GlobalNamingResources>
  <Service name="Catalina">
    <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
    <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />
    <Engine name="Catalina" defaultHost="localhost">
      <Realm className="org.apache.catalina.realm.LockOutRealm">
        <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
               resourceName="UserDatabase"/>
      </Realm>

      <Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true">
        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log" suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />
      </Host>
    </Engine>
  </Service>
</Server>
```
&emsp;&emsp;Server标签设置的端口号为8005，shutdown=”SHUTDOWN” ，表示在8005端口监听“SHUTDOWN”命令，如果接收到了就会关闭Tomcat。一个Server有一个Service，当然还可以进行配置，一个Service有多个，Service左边的内容都属于Container的，Service下边是Connector。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180945441.png)

- Tomcat中只有一个Server，一个Server可以有多个Service，一个Service可以有多个Connector和一个Container； 
- Server掌管着整个Tomcat的生死大权； 
- Service 是对外提供服务的； 
- Connector用于接受请求并将请求封装成Request和Response来具体处理； 
- Container用于封装和管理Servlet，以及具体处理request请求；

## 2、Tomcat优化
### 2.1 JVM内存优化
&emsp;&emsp;JVM，Java虚拟机，不同设备运行Java应用程序的平台。Tomcat，Apache免费开源的web应用服务器，通过Java语言编写，换句话说：Tomcat亦是一个Java应用程序。JVM某种程度上可以被认为是一个虚拟的操作系统，它有着自己的内存模型等；一个Tomcat容器的启动，相当于在JVM中启动了一个进程。

**Tomcat与JVM关系：**
- 一个Tomcat是一个进程，其中有很多线程（线程多少与多少app无关）;
- 一个Tomcat启动一个JVM，其中可以有很多APP;
- 一个Tomcat上也可以部署多个APP，这些APP处于同一个JVM中，但不可以互相调用;

&emsp;&emsp;JVM虚拟机内存分配, JVM（Java虚拟机）在执行java程序时，会把所管理的内容分配给不同的数据区域(或者叫运行时数据区)，方法区(Method Area)，虚拟机栈(VM stack)，本地方法栈（Native Method Stack）,堆(Heap)，程序计数器(Program Counter Register)等。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180945437.png)
>1.堆是虚拟机管理内存的最大一块，也是被所有线程共享的内存区域。当内存不足无法完成实例分配的时候，同时推也无法扩展的时会出现OOM<br>
2.方法区，也是线程共享的一块区域，主要存储已经被虚拟机加载的类信息、常量、及编译器编译后的代码等数据。方法区内存同样有限制，当无法扩展时会出现OOM。<br>
3.虚拟机栈,线程的私有空间。虚拟机栈在编译器存放了基本数据类型，对象引用及局部变量。在异常情况中因固定长度无法申请足够的内存会抛出OOM。<br>
4.本地方法栈与虚拟机栈发挥相似作用，虚拟机栈为执行Java方法服务，而本地方法栈则为虚拟机是要用的Native服务。<br>
5.程序计数器是唯一一个没有任何规定OOM情况的区域，是一个比较小的内存空间。每条线程都需要一个独立的程序计数器，来保证线程切换后能恢复到正确的执行位置。


>**<font color=bluesa>补充说明：</font>**
>1. JVM中的堆和栈
栈解决程序的运行问题，即程序如何执行，或者说如何处理数据；堆解决的是数据存储的问题，即数据怎么放、放在哪儿。在Java中一个线程就会相应有一个线程栈与之对应，这点很容易理解，因为不同的线程执行逻辑有所不同，因此需要一个独立的线程栈。而堆则是所有线程共享的。栈因为是运行单位，因此里面存储的信息都是跟当前线程（或程序）相关信息的。包括局部变量、程序运行状态、方法返回值等等；而堆只负责存储对象信息。<br>
>2. OOM 
OOM(Out of Memory)内存溢出，OOM发生的主要原因是，第一次物理内存被使用的时候，物理内存中其实没有分配（次页缺失），恰好系统无法释放物理内存，造成系统内存不够，导致系统会自动kill掉一些进程来释放物理内存。OOM会选择占用内存最多的进程开始杀，一直到内存足够。

### 2.2 JVM内存调整
&emsp;&emsp;在Tomcat的使用过程中，产生内存溢出的根本原因是分配给进程的内存较少，其解决方法就是通过过增加JVM栈内存来实现。（JVM通常不去调用垃圾回收器），所以服务器可以更多的关注处理WEB请求，加快访问速度。 

默认JVM虚拟机内存分配大小，可以通过管理界面的stats来查看:

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180945612.png)

增加堆栈内存可以通过修改catalina.sh文件来实现,在其首行添加:

```bash
JAVA_OPTS=" -server -Xms512m -Xmx512m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m"
说明:
Xms 堆内存的初始大小，取决于物理内存，通常一半 
Xmx 堆内存上限，取决于物理内存，通常一半 
XX:MetaspaceSize:非堆内存初始大小
XX:MaxMeatespaceSize 非堆内存上限
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180945968.png)

### 2.3 JVM相关监控（了解）
#### 2.3.1 jps
jps(JVM Process Status Tool)显示指定系统内所有的HotSpot虚拟机进程。

格式: 
```bash
jps [选项] [HostID]
```

|参数  |解析  |
|--|--|
|-l   | 输出主类全名或jar路径 |
|-q | 只输出LVMID
|-m | 输出JVM启动时传递给main()的参数
|-v |输出JVM启动时显示指定的JVM参数

直接执行jps可以看到进程信息 

```bash
[root@localhost ~]# jps
14693 Bootstrap
15529 Jps
```
jps –m -l查看启动时的详细信息，包含参数

```bash
[root@localhost ~]# jps -m -l
15569 sun.tools.jps.Jps -m -l
14693 org.apache.catalina.startup.Bootstrap start
```

#### 2.3.2 jstat
jstat(JVM statistics Monitoring)是用于监视虚拟机运行时状态信息的命令，它可以显示出虚拟机进程中的类装载、内存、垃圾收集、JIT编译等运行数据。尤其是gc情况的监控，如果老年代发生full gc，那么很可能会导致内存泄漏的可能性

格式: 

```bash
jstat [选项] 虚拟机PID  [连续输出的间隔时间]  [连续输出次数]
```
-gc垃圾回收堆的行为统计，常用命令

```bash
[root@localhost ~]# jstat -gc 14693
 S0C    S1C    S0U    S1U      EC       EU        OC         OU       MC     MU    CCSC   CCSU   YGC     YGCT    FGC    FGCT     GCT   
17472.0 17472.0  0.0   12305.2 139776.0 107322.9  349568.0   21600.5   34048.0 32970.3 4096.0 3851.0      5    0.267   0      0.000    0.267
C即Capacity 总容量，U即Used 已使用的容量
```
-gcutil垃圾回收统计的汇总信息，以百分比的形式显示

```bash
[root@localhost ~]# jstat -gcutil 14693
  S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT   
  0.00  70.43  78.37   6.18  96.83  94.02      5    0.267     0    0.000    0.267
```

#### 2.3.3 jmap
jmap命令是用来查看当前系统中jvm进程heap dump的情况，包括对象的数量，对象所占内存的大小。因此jmap命令可以用于检查内存泄漏、对象创建不合理及销毁等问题。从而发现一些更隐蔽的性能缺陷。

格式:

```bash
jmap [选项] PID  

jmap [选项] executable core （可执行文件及核心文件）
```
选项:

```bash
-heap ：打印jvm heap的情况
-histo： 打印jvm heap的直方图。其输出信息包括类名，对象数量，对象占用大小。
-histo：live ： 同上，但是只答应存活对象的情况
-permstat： 打印permanent generation heap情况
jmap -dump:format=b,file=dumpfile.hprof <pid> 
将日志信息输出到当前路径，文件名dumpfile.hprof pid 进程号
同时也可以使用mat（一款内存分析工具）来分析jmap的dump文件。
```
#### 2.3.4 jstack
jstack用于打印出给定的java进程ID或core file或远程调试服务的Java堆栈信息。
如果java程序崩溃生成core文件，jstack工具可以用来获得core文件的java stack和native stack的信息，从而可以轻松地知道java程序是如何崩溃和在程序何处发生问题。

另外，jstack工具还可以附属到正在运行的java程序中，看到当时运行的java程序的java stack和native stack的信息, 如果现在运行的java程序呈现hung的状态，jstack是非常有用的。

格式:

```bash
jstack [选项] PID
```
在生产环境中，jstack命令帮助解决内存泄露引起的垃圾回收线程占用高CPU，以及服务线程阻塞在某个远程接口处导致无响应等问题。列出子线程的cpu占用率等情况，再对照jstack命令得到的线程号，就可以知道cpu占用高的线程执行到了那里：
ps -eL -o pid,%cpu,lwp|grep -i pid或ps -Lfp pid或ps -mp pid -o THREAD, tid, time或top -Hp pid；（通过jstack命令获取的进程号）

#### 2.3.5 jhat 
jhat(Java Heap Analysis Tool),是一个用来分析java的堆情况的命令。是java虚拟机自带的一种虚拟机堆转储快照分析工具。可以用jhat命令将dump出来的hprof文件转成html的形式，然后通过http访问可以查看堆情况。
#### 2.3.6 手动编写内存监控界面:

```bash
[root@Tomcat ~]# mkdir /usr/local/tomcat/webapps/memtest/
[root@Tomcat ~]# vim /usr/local/tomcat/webapps/memtest/meminfo.jsp
<%
Runtime rtm = Runtime.getRuntime();
long mm = rtm.maxMemory()/1024/1024;
long tm = rtm.totalMemory()/1024/1024;
long fm = rtm.freeMemory()/1024/1024;
out.println("JVM memory detail info:<br>");
out.println("MAX memory:"+mm+"MB"+"<br>");
out.println("Total memory:"+tm+"MB"+"<br>");
out.println("Free memory :"+fm+"MB"+"<br>");
out.println("Available memory can be used is :"+(mm+tm+fm)+"MB"+"<br>");
%>
```
<font color=red>访问: http://IP:8080/ memtest/meminfo.jsp</font>
除此之外还有一些图形化的监控工具JConsole和VisualVM。
#### 2.4 压缩传输
Tomcat作为一个应用服务器，也是支持 gzip 压缩功能的,可以在server.xml 配置文件中的 Connector节点中配置，来实现对指定资源类型进行压缩。

server.xml配置如下:

```bash
<Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" 
               compression="on" compressionMinSize="50" noCompressionUserAgents="gozilla, traviata" compressableMimeType="text/html,text/xml,text/javascript,text/css,text/plain"/>
compression="on" # 打开压缩功能
compressionMinSize="50" # 启用压缩的输出内容大小，默认为2KB
noCompressionUserAgents="gozilla, traviata" # 对于以下的浏览器，不启用压缩
compressableMimeType="text/html,text/xml,text/javascript,text/css,text/plain"　# 哪些资源类型需要压缩
```

><font color=redsal>补充说明:</font>
>&emsp;&emsp;Tomcat 的压缩是在客户端请求服务器对应资源后，从服务器端将资源文件压缩，再输出到客户端，由客户端的浏览器负责解压缩并浏览。相对于普通的浏览过程HTML、CSS、Javascript和Text，它可以节省40% 左右的流量。更为重要的是，它可以对动态生成的，包括CGI、PHP、JSP、ASP、Servlet,SHTML等输出的网页也能进行压缩，压缩效率也很高。但是，压缩会增加Tomcat的负担，因此最好采用Nginx+ Tomcat或者Apache+Tomcat方式，将压缩的任务交由Nginx/Apache去做。
#### 2.5 并发连接调优
对于tomcat的Connector并发连接设置，同样在主配置文件server.xml配置文件中的connector中设置	

```bash
<Connector port="8080" protocol="HTTP/1.1" maxThreads="600" minSpareThreads="100"maxSpareThreads="500" acceptCount="700"connectionTimeout="20000"  />
```
><font color=red>maxThreads </font>      表示最大线程数
<font color=red>minSpareThreads</font>   初始化空闲线程数
<font color=red>maxSpareThreads </font>  最大空闲线程数 
<font color=red>acceptCount</font>   监听端口队列最大数，满了之后客户请求会被拒绝（不能小于maxSpareThreads ） 
<font color=red>connectionTimeout </font>   连接超时


>**<font color=redsal>补充说明:</font>**
>&emsp;&emsp;maxThreads是Tomcat所能接受最大连接数。一般设置不要超过8000以上，如果网站访问量非常大，可以使用运行多个Tomcat实例的方法，即在一个服务器上启动多个tomcat然后做负载均衡处理。这里还需要注意的一点是，tomcat和php不同。php可以按照cpu和内存的情况去配置连接数，上万很正常。而java还需要注意jvm的参数配置。如果不注意就会因为jvm参数过小而崩溃。

对于Tomcat的共享线程池的调优设置:

```bash
<Executor name="tomcatThreadPool" namePrefix="catalina-exec-" maxThreads="500" minSpareThreads="20" maxSpareThreads="50" maxIdleTime="60000"/>
```
><font color=red>name：</font> 线程池名称，用于 Connector中指定。
<font color=red>namePrefix：</font> 所创建的每个线程的名称前缀，一个单独的线程名称为 <font color=red>namePrefix+threadNumber。</font>
<font color=red>maxThreads：</font> 池中最大线程数,默认值是200
<font color=red>minSpareThreads：</font> 线程池中最小空闲线程数（核心线程），默认值为10。
<font color=red>maxIdleTime：</font> 线程空闲时间，超过该时间后，空闲线程会被销毁，默认值为6000（1分钟），单位毫秒。
<font color=red>maxQueueSize：</font> 在被执行前最大线程排队数目，默认为Int的最大值，也就是广义的无限。除非特殊情况，这个值不需要更改，否则会有请求不会被处理的情况发生。
<font color=red>prestartminSpareThreads：</font> 启动线程池时是否启动 <font color=red>minSpareThreads</font> 部分线程。默认值为false，即不启动。
<font color=red>threadPriority：</font> 线程池中线程优先级，默认值为5，值从1到10。
<font color=red>className:</font> 线程池实现类，未指定情况下，默认实现类为<font color=red>org.apache.catalina.core.StandardThreadExecutor。</font> 如果想使用自定义线程池首先需要实现 org.apache.catalina.Executor接口。


&emsp;&emsp;Connector：外部IP连接到服务器，会有很多Connection（连接），建立、维护、管理这些连接，这就是Connector要做的事情。显然这是web服务器性能的重要指标。即可支持的每秒最大连接数。
Servlet：一个Servelet，就是一个线程一次的执行过程。比如响应doGet()，这个是在一个独立的线程中完成的。
&emsp;&emsp;当connector建立连接后，服务器会分配一个线程（可能是从线程池）去服务这个连接，即执行doGet等方法，执行完，回收线程。显然这一步是一个同步的过程，tomcat对应的是Executor。Connecotr和Executor的关系，其实可以类比Nginx的主进程和工作进程

&emsp;&emsp;实现方案一:Connector和Servlet可以共用一个线程，这种web服务方案，即为每个连接提供一个线程 Connection per thread。每次来个请求，服务器便创建一个线程（或者线程池中选择线程）由于线程不可能无限制增加，当线程比较多时，服务负载会很大。这种方式的优点是，简单，适合CPU密集型。	
&emsp;&emsp;实现方案二:Request per thread 每请求一个线程，即等到具体服务请求时，才独立分配线程方式。而这个线程通常是在线程池中分配，如果没有空闲的执行线程，那么请求会被挂起，当请求挂起的数目（即排队数）超过预设最大请求数（Tomcat中maxConnections值），服务会拒绝服务器（Service Unavailable）。Apache，Tomcat等主流实现方案都采用这种方式。 

&emsp;&emsp;方案二，实现了高并发、高吞吐。是因为第二种方案是适合常见的web服务特点，即大量的短连接（IO密集型，服务处理时间很短，大约50ms以内，但连接数很多），处理完即关闭连接。但是，当服务是批处理类的大作业服务（CPU密集型，服务处理时间很长，常需要1秒以上，但连接数少），方案二不如方案一，每连接就分配一个线程运行。
>**<font color=redsal>补充说明：</font>**<br>
**<font color=order>CPU密集型（CPU-bound）</font>**
&emsp;&emsp;CPU密集型也叫计算密集型，指的是系统的硬盘、内存性能相对CPU要好很多，此时，系统运作大部分的状况是CPU Loading 100%，CPU要读/写I/O(硬盘/内存)，I/O在很短的时间就可以完成，而CPU还有许多运算要处理，CPU Loading很高。
&emsp;&emsp;在多重程序系统中，大部份时间用来做计算、逻辑判断等CPU动作的程序称之CPU bound。例如一个计算圆周率至小数点一千位以下的程序，在执行的过程当中绝大部份时间用在三角函数和开根号的计算，便是属于CPU bound的程序。
&emsp;&emsp;CPU bound的程序一般而言CPU占用率相当高。这可能是因为任务本身不太需要访问I/O设备，也可能是因为程序是多线程实现因此屏蔽掉了等待I/O的时间。<br>
**<font color=order>IO密集型（I/O bound）</font>**
&emsp;&emsp;IO密集型指的是系统的CPU性能相对硬盘、内存要好很多，此时，系统运作，大部分的状况是CPU在等I/O (硬盘/内存) 的读/写操作，此时CPU Loading并不高。
&emsp;&emsp;I/O bound的程序一般在达到性能极限时，CPU占用率仍然较低。这可能是因为任务本身需要大量I/O操作，而pipeline做得不是很好，没有充分利用处理器能力。<br>
**<font color=order>CPU密集型 vs IO密集型</font>**
&emsp;&emsp;我们可以把任务分为计算密集型和IO密集型。
&emsp;&emsp;计算密集型任务的特点是要进行大量的计算，消耗CPU资源，比如计算圆周率、对视频进行高清解码等等，全靠CPU的运算能力。这种计算密集型任务虽然也可以用多任务完成，但是任务越多，花在任务切换的时间就越多，CPU执行任务的效率就越低，所以，要最高效地利用CPU，计算密集型任务同时进行的数量应当等于CPU的核心数。
&emsp;&emsp;计算密集型任务由于主要消耗CPU资源，因此，代码运行效率至关重要。Python这样的脚本语言运行效率很低，完全不适合计算密集型任务。对于计算密集型任务，最好用C语言编写。
&emsp;&emsp;第二种任务的类型是IO密集型，涉及到网络、磁盘IO的任务都是IO密集型任务，这类任务的特点是CPU消耗很少，任务的大部分时间都在等待IO操作完成（因为IO的速度远远低于CPU和内存的速度）。对于IO密集型任务，任务越多，CPU效率越高，但也有一个限度。常见的大部分任务都是IO密集型任务，比如Web应用。
&emsp;&emsp;IO密集型任务执行期间，99%的时间都花在IO上，花在CPU上的时间很少，因此，用运行速度极快的C语言替换用Python这样运行速度极低的脚本语言，完全无法提升运行效率。对于IO密集型任务，最合适的语言就是开发效率最高（代码量最少）的语言，脚本语言是首选，C语言最差。
&emsp;&emsp;总之，计算密集型程序适合C语言多线程，I/O密集型适合脚本语言开发的多线程。

#### 2.6 禁用DNS查询
&emsp;&emsp;当web应用程序向要记录客户端的信息时，它也会记录客户端的IP地址或者通过域名服务器查找机器名 转换为IP地址。DNS查询需要占用网络，并且包括可能从很多很远的服务器或者不起作用的服务器上去获取对应的IP的过程，这样会消耗一定的时间。修改server.xml文件中的Connector元素，修改属性enableLookups参数值: enableLookups="false"如果为true，则可以通过调用request.getRemoteHost()进行DNS查询来得到远程客户端的实际主机名，若为false则不进行DNS查询，而是返回其ip地址。
#### 2.7 IO优化
IO优化指的是调整Connector运行模式，可以参考Connector的运行模式进行调整。

#### 2.8 添加Listener
&emsp;&emsp;另一个影响Tomcat性能的因素是内存泄露。Server标签中可以配置多个Listener，其中JreMemoryLeakPreventionListener是用来预防JRE内存泄漏。此Listener只需在Server标签中配置即可，默认情况下无需配置，已经添加在 Server中。

```bash
<Listener className=”org.apache.catalina.core. JreMemoryLeakPreventionListener”>
```
>**<font color=redsal>补充说明：</font>**<br>
><font color=yellow>内存泄漏（Memory Leak）</font>
>如果程序在运行过程中不能正常回收不用的内存，那么时间一长就会导致内存增长很高，最终导致系统不可用，这种情况叫内存泄漏。通常所说的内存泄漏指的是堆内存的泄露，堆内存是指程序从堆中分配的，大小随机的，用完后必须显示释放的内存。

#### 2.9 版本号隐藏
为了避免黑客针对某些版本进行攻击，因此我们需要隐藏或者伪装 Tomcat 的版本信息。
针对该信息的显示是由一个jar包控制的，该jar包存放在 Tomcat 安装目录下的lib目录下，名称为catalina.jar。我们可以通过 jar xf 命令解压这个jar包会得到两个目录 META-INF和org ,通过修改org/apache/catalina/util/ServerInfo.properties文件中的serverinfo字段来实现来更改Tomcat的版本信息。

```bash
[root@tomcat ~]# cat org/apache/catalina/util/ServerInfo.properties |grep -v '^$|#'
server.info=Apache Tomcat/7.0.53
server.number=7.0.53.0
server.built=Mar 25 2014 06:20:16
```
当然，还有另外一种方法来实现隐藏或伪装Tomcat的版本信息，不过本质和上面一样，操作如下：

```bash
[root@tomcat ~]# cd /usr/local/tomcat8/lib
[root@ tomcat lib]# mkdir -p org/apache/catalina/util
[root@tomcat lib]# cd org/apache/catalina/util
[root@ tomcat util]# vim ServerInfo.properties
server.info=nolinux # 如果想修改成其它版本号，把这个地方的值改成其它值就行了
```
修改完毕之后，重启Tomcat即可。

## 相关文章🔅
|相关文章|链接地址  |
|--|--|
|  [【Linux】安装Tomcat以yum方式安装](https://liucy.blog.csdn.net/article/details/127006134)|[https://liucy.blog.csdn.net/article/details/127006134](https://liucy.blog.csdn.net/article/details/127006134)|
|[【Linux】Tomcat简介及二进制安装](https://liucy.blog.csdn.net/article/details/127009222)|[https://liucy.blog.csdn.net/article/details/127009222](https://liucy.blog.csdn.net/article/details/127009222)
|[【Linux】Tomcat优化](https://liucy.blog.csdn.net/article/details/127011859)|[https://liucy.blog.csdn.net/article/details/127011859](https://liucy.blog.csdn.net/article/details/127011859)|
