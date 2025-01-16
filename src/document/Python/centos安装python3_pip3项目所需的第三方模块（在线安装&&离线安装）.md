---
title: centos安装python3_pip3项目所需的第三方模块（在线安装&&离线安装）
icon: circle-info
order: 11
tag:
- Linux
- Python
category:
- Linux
- Python
- 运维
pageview: false
date: 2024-03-24
comment: false
---

## 前言

&emsp;&emsp;因为项目要求，和一般部署服务的时候需要一些python的模块，然后并没有外网，所以，只好下载一些需要的python模块；在这之前查阅了很多文章，但都是直接安装的，找这种离线包安装的特别困难，所以，好不容易找到了几篇，我就把这个写成一篇文章，供大家观看，感谢！

### 安装python3和pip3
<br/>

**详细的安装教程请参考链接：[Linux下安装Python3.6.8（超级详细）](https://blog.csdn.net/liu_chen_yang/article/details/123680594)**

---

### 升级/更新pip3

```bash
pip3 install --upgrade pip
```

### 安装项目所需的模块
<br>

#### 在线安装所需模块
**<font color=teal>格式：</font>**
```bash
pip3 install 所需模块的名字
```
**<font color=teal>实例一：</font>**

```bash
pip3 install numpy
```

**<font color=teal>实例二（指定版本）：</font>**

>模块名==指定版本

```bash
pip3 install numpy==1.19.5
```

<br>

#### 离线安装/下载所需模块和离线包
##### ①、单个模块下载&&指定路径

**<font color=teal>格式：</font>**

```bash
pip3 download 模块名 -d 下载的包的存储路径
```

**<font color=teal>实例一：</font>**
```bash
pip3 download numpy -d /data/packages/
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/065a65e2d7f04562942252f528847f5e.png)
![](https://img-blog.csdnimg.cn/a8ddc3995f354fc89ba0ec158ee7cc8e.png)

- 默认就是最新版本

**<font color=teal>实例二（指定版本）：</font>**
```bash
pip3 download numpy==1.18.5 -d /data/packages/
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/3fdb968ef6684caab60a51fee70dae61.png)


##### ②、批量下载模块&&指定目录
<font size=3>**创建文件**</font>

批量下载模块，首先要创建一个文件（文件名任意）
```bash
#创建一个文件并进入
vim python-pack

#文件内可以写你想要下载的模块名，我的就下载这些；
chardet
joblib
numpy
ocrd_fork_pylsd
PyMuPDF
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/25ec97854ef54f54bea6bddadc0a23ea.png)

<font size=3>**批量下载**</font>


**<font color=teal>格式：</font>**

```bash
pip3 download -r 批量下载模块的文件名 -d 指定下载的路径
```

**<font color=teal>实例：</font>**

**<font color=red>注意自己的批量下载模块的文件的路径，也要写正确.</font>**

```bash
pip3 download -r python-pack -d /data/packages/
```
>第一次下载和我这个图片可能有一些不一样，因为我这是测试的时候已经下载过了，删除又重新下载的（会有缓存），所以，与第一次下载过程是有一些差别的，不过，没有任何影响。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/9d5a1ab710eb4c1baf0db2158ac551a4.png)
最后我们就可以看到，指定的一些模块已经下载成离线包了，就可以下载到本地拿去用了。
要是想下载指定版本的，和上面的一样，只不过是在文本里修改就好了；例如：numpy==1.18.5。

## 附加
如果安装慢，可以换成国内源：

方法一：pip install 安装包名字 -i http://pypi.doubanio.com/simple/ --trusted-host pypi.doubanio.com //豆瓣镜像网站

方法二：pip install 安装包名字 -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com //豆瓣

方法三：pip install 安装包名字 -i https://pypi.tuna.tsinghua.edu.cn/simple/ --trusted-host pypi.tuna.tsinghua.edu.cn //清华大学

方法四：pip install 安装包名字 -i http://mirrors.aliyun.com/pypi/simple  阿里云

方法五：pip install 安装包名字 -i https://pypi.mirrors.ustc.edu.cn/simple  中国科技大学

方法六：pip install 安装包名字 -i http://pypi.mirrors.ustc.edu.cn/simple  中国科学技术大学
## 总结
### 相关文章
>[Linux下安装Python3.6.8（超级详细）](https://blog.csdn.net/liu_chen_yang/article/details/123680594)
