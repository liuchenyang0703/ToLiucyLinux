---
title: 【Linux】中安装pip（详细教程）
icon: circle-info
order: 11
tag:
- Linux
- Python
category:
- Linux
- Python
- 运维
- pip
pageview: false
date: 2024-03-24
comment: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/7c453b5d405345618f248139a1f5798f.gif)
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
由于系统自带的pyhon中没有pip，而我们这时候恰好需要用到pip，怎么办呢？今天我就来教大家如何在linux中安装pip；

### pip下载
下载任意一个版本就可以；需要哪个版本可以选择第二种，需要哪个版本改一下版本就好了；

```bash
#pip22.2.2版本
wget https://files.pythonhosted.org/packages/4b/30/e15b806597e67057e07a5acdc135216ccbf76a5f1681a324533b61066b0b/pip-22.2.2.tar.gz

#pip1.5.4版本
wget https://pypi.python.org/packages/source/p/pip/pip-1.5.4.tar.gz

#pip9.0.1版本
wget https://pypi.python.org/packages/11/b6/abcb525026a4be042b486df43905d6893fb04f05aac21c32c638e939e447/pip-9.0.1.tar.gz
```
### pip安装
就拿9.0.1版本来做吧

```bash
#解压压缩包
tar xf pip-9.0.1.tar.gz

#进入pip-9.0.1目录
cd pip-9.0.1

#进行安装
python setup.py install
```
发现安装报错

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/07a51e072f8c4704b5dd19104ee0a5c0.png)

原因是因为：安装pip时提示setup.py中使用setuptools中的模块，但是我们开始并没有安装setuptools软件包，所以我们需要先下载并安装 setuptools！

#### 下载/安装setuptools
1、下载setuptools
```bash
#下载setuptools
wget https://pypi.python.org/packages/28/4f/889339f38da415e49cff15b21ab27becbf4c017c79fbfdeca663f5b33b36/setuptools-36.4.0.zip
```
2、解压setuptools包

```bash
unzip setuptools-36.4.0.zip

cd setuptools-36.4.0
```
3、编译setuptools

```bash
python setup.py build
```
4、开始执行setuptools安装

```bash
python setup.py install
```
Finished代表成功！

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b4c552ff2e974da280de899eff0dec0d.png)
#### 再次安装pip
>现在，setuptools已经安装好，我们再次进入pip-9.0.1目录，使用 “python setup.py install” 命令安装pip：
>

```bash
cd pip-9.0.1

python setup.py install
```
Finished代表成功！

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/e54da30de120461489c7c99747cbf1a0.png)
#### 验证pip安装是否成功

```bash
pip --version
```
能查到说明安装成功，接下来我们就可以安装自己想要的包了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/fc296ae00a5a427095878f7d7f875d88.png)
#### 测试使用pip命令安装需要的包

```bash
pip install nose
pip install virtualenv
pip install distribute
pip install runlike
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/de8771fece2a48f6b89eb475c18f18e6.png)


## 相关专栏/文章
>相关专栏：[《python基础》](https://blog.csdn.net/liu_chen_yang/category_11693372.html?spm=1001.2014.3001.5482)
>
>---
>相关文章：[centos安装python3/pip3项目所需的第三方模块（在线安装&&离线安装）](https://liucy.blog.csdn.net/article/details/124475543)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/d2fdf0e5b33d4c8fb2863a2a463b7813.jpeg)


