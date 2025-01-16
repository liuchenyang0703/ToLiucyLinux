---
title: Linux中安装_部署docker-compose
icon: circle-info
order: 1
category:
  - Linux
  - Docker
tag:
  - Linux
  - Docker
  - 运维
pageview: false
date: 2024-12-16
comment: false
breadcrumb: false
---

## 前提
**必须要有docker**，如果没有可以去查看：[linux（centos）中部署docker（步骤超全，含带一些发展史和一些概念）](https://blog.csdn.net/liu_chen_yang/article/details/123842609)，有安装步骤。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161445579.gif)


## 两种安装/部署方式
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161445873.gif)

### 第一种：按照官方文档下载docker-compose包来安装
#### （1）下载docker-compose
执行如下命令进行下载

```bash
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

若速度较慢，可以使用如下命令：

```bash
curl -L "https://mirror.ghproxy.com/https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

>同时这种部署方式也可作为离线部署方式：只需要将包下载下来，放到服务器中指定位置即可；
>下载地址：[docker-compose1.29.2离线包](https://download.csdn.net/download/liu_chen_yang/89428645)
#### （2）修改目录权限

```bash
chmod  +x /usr/local/bin/docker-compose
```

#### （3）创建软连接

```bash
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

#### （4）验证安装是否完成
执行如下命令，如果可以正常显示版本号，则表示已经完成

```bash
docker-compose --version
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161445141.png)

### 第二种：使用pip install 的方式安装
因为docker-compose是使用python开发的，因此可以通过pip install 的方式安装
#### （1）首先需要确保pip已经安装完成，如下
如下，表示pip为基于python3.9的版本，这里最好安装基于python3.6以上的pip

这里有安装文档：[Linux下安装Python3.6.8（超级详细）](https://blog.csdn.net/liu_chen_yang/article/details/123680594)，可以采纳。

```bash
[root@localhost ~]# pip3 --version
pip 21.2.4 from /usr/local/python3/lib/python3.9/site-packages/pip (python 3.9)
```

#### （2）升级pip的版本

```bash
python3 -m pip install --upgrade pip
```

如：

```bash
[root@localhost ~]# python3 -m pip install --upgrade pip
Looking in indexes: http://mirrors.cloud.aliyuncs.com/pypi/simple/
Requirement already satisfied: pip in /usr/local/python3/lib/python3.9/site-packages (21.2.4)
Collecting pip
  Downloading http://mirrors.cloud.aliyuncs.com/pypi/packages/a4/6d/6463d49a933f547439d6b5b98b46af8742cc03ae83543e4d7688c2420f8b/pip-21.3.1-py3-none-any.whl (1.7 MB)
     |████████████████████████████████| 1.7 MB 105 kB/s
Installing collected packages: pip
  Attempting uninstall: pip
    Found existing installation: pip 21.2.4
    Uninstalling pip-21.2.4:
      Successfully uninstalled pip-21.2.4
  WARNING: The scripts pip, pip3 and pip3.9 are installed in '/usr/local/python3/bin' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
Successfully installed pip-21.3.1
WARNING: Running pip as the 'root' user can result in broken permissions and conflicting behaviour with the system package manager. It is recommended to use a virtual environment instead: https://pip.pypa.io/warnings/venv
```

#### （3）安装docker-compose

```bash
pip3 install docker-compose
```

如下：

```bash
[root@localhost ~]# pip3 install docker-compose
Looking in indexes: http://mirrors.cloud.aliyuncs.com/pypi/simple/
Requirement already satisfied: docker-compose in /usr/local/python3/lib/python3.9/site-packages (1.29.2)
Requirement already satisfied: docker[ssh]>=5 in /usr/local/python3/lib/python3.9/site-packages (from docker-compose) (5.0.3)
Requirement already satisfied: PyYAML<6,>=3.10 in /usr/local/python3/lib/python3.9/site-packages (from docker-compose) (5.4.1)
Requirement already satisfied: jsonschema<4,>=2.5.1 in /usr/local/python3/lib/python3.9/site-packages (from docker-compose) (3.2.0)
Requirement already satisfied: python-dotenv<1,>=0.13.0 in /usr/local/python3/lib/python3.9/site-packages (from docker-compose) (0.19.1)
Requirement already satisfied: texttable<2,>=0.9.0 in /usr/local/python3/lib/python3.9/site-packages (from docker-compose) (1.6.4)
Requirement already satisfied: websocket-client<1,>=0.32.0 in /usr/local/python3/lib/python3.9/site-packages (from docker-compose) (0.59.0)
Requirement already satisfied: distro<2,>=1.5.0 in /usr/local/python3/lib/python3.9/site-packages (from docker-compose) (1.6.0)
Requirement already satisfied: docopt<1,>=0.6.1 in /usr/local/python3/lib/python3.9/site-packages (from docker-compose) (0.6.2)
Requirement already satisfied: dockerpty<1,>=0.4.1 in /usr/local/python3/lib/python3.9/site-packages (from docker-compose) (0.4.1)
Requirement already satisfied: requests<3,>=2.20.0 in /usr/local/python3/lib/python3.9/site-packages (from docker-compose) (2.26.0)
Requirement already satisfied: paramiko>=2.4.2 in /usr/local/python3/lib/python3.9/site-packages (from docker[ssh]>=5->docker-compose) (2.8.0)
Requirement already satisfied: six>=1.3.0 in /usr/local/python3/lib/python3.9/site-packages (from dockerpty<1,>=0.4.1->docker-compose) (1.16.0)
Requirement already satisfied: attrs>=17.4.0 in /usr/local/python3/lib/python3.9/site-packages (from jsonschema<4,>=2.5.1->docker-compose) (21.2.0)
Requirement already satisfied: pyrsistent>=0.14.0 in /usr/local/python3/lib/python3.9/site-packages (from jsonschema<4,>=2.5.1->docker-compose) (0.18.0)
Requirement already satisfied: setuptools in /usr/local/python3/lib/python3.9/site-packages (from jsonschema<4,>=2.5.1->docker-compose) (57.4.0)
Requirement already satisfied: urllib3<1.27,>=1.21.1 in /usr/local/python3/lib/python3.9/site-packages (from requests<3,>=2.20.0->docker-compose) (1.26.6)
Requirement already satisfied: charset-normalizer~=2.0.0 in /usr/local/python3/lib/python3.9/site-packages (from requests<3,>=2.20.0->docker-compose) (2.0.7)
Requirement already satisfied: idna<4,>=2.5 in /usr/local/python3/lib/python3.9/site-packages (from requests<3,>=2.20.0->docker-compose) (3.3)
Requirement already satisfied: certifi>=2017.4.17 in /usr/local/python3/lib/python3.9/site-packages (from requests<3,>=2.20.0->docker-compose) (2021.5.30)
Requirement already satisfied: cryptography>=2.5 in /usr/local/python3/lib/python3.9/site-packages (from paramiko>=2.4.2->docker[ssh]>=5->docker-compose) (35.0.0)
Requirement already satisfied: pynacl>=1.0.1 in /usr/local/python3/lib/python3.9/site-packages (from paramiko>=2.4.2->docker[ssh]>=5->docker-compose) (1.4.0)
Requirement already satisfied: bcrypt>=3.1.3 in /usr/local/python3/lib/python3.9/site-packages (from paramiko>=2.4.2->docker[ssh]>=5->docker-compose) (3.2.0)
Requirement already satisfied: cffi>=1.1 in /usr/local/python3/lib/python3.9/site-packages (from bcrypt>=3.1.3->paramiko>=2.4.2->docker[ssh]>=5->docker-compose) (1.15.0)
Requirement already satisfied: pycparser in /usr/local/python3/lib/python3.9/site-packages (from cffi>=1.1->bcrypt>=3.1.3->paramiko>=2.4.2->docker[ssh]>=5->docker-compose) (2.20)
WARNING: Running pip as the 'root' user can result in broken permissions and conflicting behaviour with the system package manager. It is recommended to use a virtual environment instead: https://pip.pypa.io/warnings/venv
```
#### （4）验证是否安装完成

```bash
docker-compose -version
```

如下

```bash
[root@localhost ~]# docker-compose -version
docker-compose version 1.29.2, build unknown
```
## 总结
**相关文章：**
>①、[Docker——denied: requested access to the resource is denied问题以及解决方法](https://blog.csdn.net/liu_chen_yang/article/details/124665726?spm=1001.2014.3001.5502)
>②、[Docker搭建harbor私有镜像仓库（命令行模式）](https://blog.csdn.net/liu_chen_yang/article/details/124705622)
>③、[Linux中基于Docker搭建harbor私有镜像仓库（超级详细）](https://blog.csdn.net/liu_chen_yang/article/details/124623482)🔥🔥
>④、[Docker发布/上传镜像到dockerhub&&下载/拉取镜像&&删除dockerhub镜像](https://blog.csdn.net/liu_chen_yang/article/details/124670946?spm=1001.2014.3001.5502)
>⑤、[【Docker】之docker-compose的介绍与命令的使用](https://liucy.blog.csdn.net/article/details/129082503)
