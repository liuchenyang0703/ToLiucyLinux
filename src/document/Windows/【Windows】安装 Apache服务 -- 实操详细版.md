---
title: 【Windows】安装 Apache服务 -- 实操详细版
icon: circle-info
order: 11
tag:
- Windows
- Apache
- 运维
category:
- Windows
- Apache
pageview: false
date: 2024-03-24
comment: false
---

> >👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## 一、前言
>因为最近项目需求，需要在windows上部署一个apache服务，所以，首先，我们需要现在windows上安装apache；接下来，给大家讲解一下windows的安装步骤；

## 二、 官网下载安装包
>Apache官方下载地址：[https://httpd.apache.org/](https://httpd.apache.org/)

* 点击 `Download`

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/708d4529cb9249f9bd191b2e5e828a86.png)

* 可以根据自己的需求安装需要的版本：点击 `Files for Microsoft Windows` 下载windows版本

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/9916d8caf66042f4a95f989c22bdd3cb.png)

* 点击 `ApacheHaus` 

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b3485ac1f6724edfbbcdef01f3977aed.png)

* 点击 `Download Locations` 下的小房子下载

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/7149f9b2390048a5be7d3f3debeb8c40.png)

## 三、安装 Apache 并 配置 Apache 配置文件

### 3.1 解压 压缩包
下载完成后，放在自己需要的位置，解压压缩包；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4c1a429e557f480f9dee36002cc1d9d1.png)

### 3.2 配置 配置文件

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/5fd3ca1ff7b64eedad458c90f76cdef4.png)

找到以 `Define SRVROOT` 开头的 配置Apache安装路径；
修改Apache实际绝对安装目录，最后结尾处不能带"/"或"\"，这里${SRVROOT}指定义的SRVROOT路径变量



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/158b7c6c2369486885b5edaf52ab5df6.png)

配置完成...

## 四、启动 Apache 项目

### 4.1 检测 Apache 配置文件是否合法

* `crtl + s` 搜索 `命令提示符`  以管理员方式打开；
* 如果在d盘，先输入`d:` ，然后在使用cd 切换到apache的bin目录下，我这里是c盘，直接cd就可以；
* 进入到bin目录下，使用`httpd -t` ，检查配置文件是否合法；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/61b8de251c02414e91fbce55cc54bc7e.png)

没有问题；

### 4.2 安装 Apache 主服务
同样的： `crtl + s` 搜索 `命令提示符`  以管理员方式打开；切换到`bin` 目录，执行`httpd -k install -n 自定义的访问名`

```bash
C:\Users\user\Desktop\httpd-2.4.55-o111s-x64-vs17\Apache24\bin>httpd -k install -n apache
```
>该命令的意思是，安装Windows可托管的Apache服务，其中 “-n” 后面参数是自定义Windows服务名称，之后可使用Windows管理服务的命令来管理apache服务，如 `“net start/stop apache”`（启动 / 停止服务）。<br>
服务安装完毕后，会自动测试，若有问题，窗口会提示错误，此时请根据错误自行排查。
正常安装完毕如下图所示：


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f4f8ae211178441d90979e1917beaf9e.png)

安装成功；


### 4.3 启动 Apache 服务
#### 4.4.1 命令行启动
>需要使用管理员权限
```bash
net start apache
# 或者使用
httpd -k start -n apache
```
#### 4.4.2 可视化启动
>打开安装apache的 `bin` 目录，下面有一个 `ApacheMonitor.exe` 文件，运行即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/9ebd6fb45f5f439394533182207b00e3.png)

双击如果没反应可以看一下小窗口，就是qq、微信、那些最小化存放的地址，有一个这个标志；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/7199e05f7ac4479ca3daf2f19f312149.png)

右击 `Open Apache Monitor` 打开面板；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/0bd6d756986a4270818dc73cf99dbf21.png)

在这里面可以直接启动、停止、重启操作；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/23b25f81cad74348ae8169e1db131fdc.png)


## 五、页面访问
默认端口为80，如需要其他端口可到`httpd.conf` 配置中自行修改
`http://localhost:80`

看到如下页面，则代表安装成功。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/facc7ab23d0843afbf260c7b07fa9a10.png)


## 六、命令行其他命令操作

```bash
# 安装服务
httpd -k install -n apache

# 启动服务
net start apache
httpd -k start -n apache

# 关闭服务
net stop apache
httpd -k stop -n apache

# 重启服务
httpd -k restart -n apache

# 卸载服务
## 卸载服务时先停止
httpd -k stop -n apache
## 再卸载服务
httpd -k uninstall -n apache
```

>更多windows相关知识，可订阅：[《Windows相关技术》](https://blog.csdn.net/liu_chen_yang/category_12481542.html?spm=1001.2014.3001.5482)专栏。
