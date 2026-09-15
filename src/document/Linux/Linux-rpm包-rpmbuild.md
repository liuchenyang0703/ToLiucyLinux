---
title: Linux如何将文件或目录打成rpm包？-- rpmbuild打包详解
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
date: 2024-11-12
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
---


>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/profile/7yu26jk3lfqxg)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---




## 前言

> &emsp;&emsp;最近因为遇到一个服务器受系统限制，只能上传rpm包才能使用，而我们的服务都是文件，那么怎么将文件都打成rpm包呢？？？我也是找了好几个，终于找到了一个简单好用的打包方式，下面来给大家讲解一下部署及打包、安装；

> **rpm是什么呢？**
>
> &emsp;&emsp;rpm是一种安装包的格式。就像在Windows系统上我们常见的安装包格式是exe和msi一样，在linux上常见的安装包格式是deb和rpm。一般在红帽系列的系统上，不支持deb，所以我们需要将程序打包成rpm安装。



本文已`docker离线安装包`及`python环境`两种类型文件打包为例子，将其打成rpm包，并在新的服务器上安装；

操作系统为：Centos 7.6、中科方德开发版系统

## SPEC 文件示例
<a id="click_me_jump">SPEC 文件示例</a>

```bash
Name: 	 #软件包的名称，后面可以%｛name｝的方式引用
Version: #软件实际的版本号，后面可以%｛version｝的方式引用
Release: 1%{?dist} #发布版本号
Summary: #该软件包的简单内容概要
Group: #标识软件所属的类型或组别
License: #许可授权方式，如 GPL/LGPL/GPLv2 等等
URL: # 软件获取或者官方网址、软件的主页
Source: # 源代码包，可以带多个用 Source1、Source2 等源，后面也可以用%{source1}、%{source2}引用。
Patch：#补丁源码，可使用 Patch1、Patch2 等标识多个补丁，使用%patch0或%{patch0}引用
BuildRequires: #编译关系依赖，列出编译此软件所需其他软件 rpm 二进制文件列表（无需加后缀.rpm）
Requires: #安装依赖，列出安装此软件需要先安装的 rpm 二进制文件列表；这部分软件为此软件运行所需要。
%description #软件详细说明
%prep # 预处理脚本 解压源码包、打补丁等，放在~/rpmbuild/BUILD 目录下
%pre  #安装前操作
%post #安装后处理
%preun： #卸载前操作
%postun：#卸载后操作
%build   #编译部分，开始编译源码构建包，相当于 configure 以及 make 部分
%install #开始把软件安装到虚拟的根目录中，本段是安装段，其中的命令在安装软件包时将执行，如 make install 命令、cp、mv、install 等。
%clean #清除编译和安装时生成的临时文件
%files #本段是文件段，用于定义构成软件包的文件列表，那些文件或目录会放入 rpm 中，还可定义文件存取权限，拥有者及组别。
%changelog #变更日志，本段是修改日志段。可以将软件的每次修改记录到这里，保存到发布的软件包中，以便查询之用。
#格式如下：
#第一行： * 星期月日 年 开发电子信箱 版本号。（必须*号开头，星期、月份均用英文形式的前 3 个字母，用中文会报错）
#第二行： 说明行，如修改内容等，一般以（-）减号开始，便于后续的查阅。
```


## 一、使用rpmbuild将python环境及依赖包打成rpm包



在使用 `rpmbuild` 将 Python 环境打包成 RPM 包之前，需要确保已经安装 `rpmbuild` 工具，并配置好相关的 RPM 打包环境。以下是具体的步骤和说明：

### 1.1 准备打包环境
首先，确保安装了 `rpmbuild`，可以通过以下命令安装：

```bash
sudo yum install rpm-build -y
# 安装 rpmdevtools
yum install rpmdevtools
```

`rpmdevtools`为开发者提供了极大的便利，用于制作RPM包，涵盖了从创建rpmbuild开发树、MD5验证、spec文件的生成，到解压归档文件、归档文件前后版本对比diff等一系列功能。



**创建打包文件夹**

创建打包文件夹有两种方法：

　　　　方法一：使用命令 `rpmdev-setuptree` 来创建，但是创建的文件夹是在用户主目录（home）如果是root就是在（root）下，我们可以将rpmbuild整个文件夹拷贝到项目文件夹，这样可以方便我们项目管理。

　　　　方法二：手动的去创建文件夹，具体文件夹结构可以参考下面的目录树

```bash
# 方法一：使用命令创建
rpmdev-setuptree

# 方法二：手动创建文件夹
mkdir -p ~/rpmbuild/{BUILD,RPMS,SOURCES,SPECS,SRPMS}

# 目录树
rpmbuild
    - BUILD           // 编译临时目录
    - RPMS            // 存放 rpm 二进制包，打包后生成的 rpm 包会放在这里
    - SOURCES         // 源代码和补丁存放目录
    - SPECS           // 软件 spec 文件所在目录，放 xx.spec 文件
    - SRPMS           // 存放源代码 rpm 包（以.src.rpm 后缀命名文件），打包后生成的 srpm 包会放在这里 

# 这个会自动生成
    - BUILDROOT		  //打包过程所需文件临时存放目录（%files 部分所列文件）
```

### 1.2 创建 Python 环境的 SPEC 文件

在 `~/rpmbuild/SPECS` 目录中创建一个 `.spec` 文件，用于定义 RPM 包的相关信息，例如 `python_env.spec`。以下是一个基本的 `spec` 文件模板：

或者使用`rpmdev-newspec python_env.spec`命令创建`*.spec`模板

> SPEC文件详细参数可参考： [SPEC 文件示例](#click_me_jump)


```text
Name: python_env
Version: 1.0
Release: 1%{?dist}
Summary: Python Environment Package

License: YourLicense
Source0: %{name}-%{version}.tar.gz

%description
This package provides a Python environment including dependencies.

%prep
# 静默模式解压，并进入解压后的目录，常用：%setup -q

%build
# 编译过程

%install
# 安装过程
# 假设你已经将Python环境打包为.tar.gz文件，将其解压到 /opt/
tar -xzvf %{SOURCE0} -C %{buildroot}/opt/

%files
/opt/python_env/*

%changelog
* Tue Nov 12 2024 Your Name <youremail@example.com> - 1.0-1
- Initial package for Python environment
```

以下是这个 RPM SPEC 文件的配置内容的详细解析：

---



<font color=blue>**基本配置信息**</font>

- **Name**: `python_env`
  - 定义了 RPM 包的名称，这里指定为 `python_env`。

- **Version**: `1.0`
  - 指定了 RPM 包的版本号。在后续版本更新中，可以根据需要调整这个数字。

- **Release**: `1%{?dist}`
  - 定义了 RPM 包的发布版本，`1` 表示初次发布，`%{?dist}` 会自动添加当前的发布版本分发标记（如 `.el7` 表示适用于 CentOS 7）。

- **Summary**: `Python Environment Package`
  - 这是一个简短的描述，用于概括 RPM 包的内容。

- **License**: `YourLicense`
  - 指定了软件包的许可证。这里应替换为实际的许可证名称（如 `MIT`、`GPL` 等）。

- **Source0**: `%{name}-%{version}.tar.gz`
  - 定义了源代码文件的名称，通常与 SPEC 文件同名，格式为 `Name-Version.tar.gz`。`%{name}` 和 `%{version}` 会分别替换为 `python_env` 和 `1.0`，因此实际值为 `python_env-1.0.tar.gz`。


<font color=blue>**包的详细描述**</font>

- **%description**
  - 该字段提供了包的详细描述，将会显示在 RPM 的信息中。这里说明此包包含了 Python 环境及其依赖项。

<font color=blue>**构建和安装过程**</font>

- **%prep**
  - 这个部分用于准备构建环境，通常会执行一些解压缩或预处理操作。此例中，注释提到可以在此处解压环境包，但没有实际命令。

- **%build**
  - 定义了构建过程中需要执行的操作，例如编译代码。但对于不需要编译的包，这部分可以为空。

- **%install**
  - 在安装阶段中，指定了将内容安装到目标目录的操作。
  - `tar -xzvf %{SOURCE0} -C %{buildroot}/opt/python/`：将 `Source0`（即 `python_env-1.0.tar.gz`）解压到安装路径中，以便包含完整的 Python 环境。

<font color=blue>**包含的文件**</font>

- **%files**
  - 指定在安装包中包含哪些文件。
  - `/opt/python_env/*`：将 `/opt/python_env/` 中的所有内容添加到最终生成的 RPM 包中。

<font color=blue>**变更日志**</font>

- **%changelog**
  - 记录包的变更历史。每条日志包括日期、作者、版本及更新说明。在此例中：
    - 日期是 `2024 年 11 月 12 日`
    - 作者是 `Your Name <youremail@example.com>`
    - 更新描述是 "Initial package for Python environment"，表示首次打包。

这个 SPEC 文件的作用是将 Python 环境打包为一个 RPM，安装时会解压到指定目录，并可方便安装在其他系统上。

### 1.3 准备 Python 环境

可以使用 `virtualenv` 或 `venv` 来创建 Python 虚拟环境，并安装所需的库，然后将整个环境打包为 `.tar.gz` 文件，例如：

```bash
# 创建python3虚拟环境
python3 -m venv python_env【要创建的虚拟环境名称（也就是到时候打包的名称）】
# 激活python3虚拟环境
source python_env/bin/activate
# 然后就可以在虚拟环境里安装需要的东西了。
```

安装完之后，就可以退出虚拟环境打包了；

```bash
# 打包python虚拟环境格式为：包名-版本.tar.gz（版本为spec文件里写的版本）
tar -czvf python_env-1.0.tar.gz python_env
# 将打好的包移动到rpmbuild/SOURCES/下，用于打包rpm文件
mv python_env-1.0.tar.gz ~/rpmbuild/SOURCES/
```

### 1.4 构建 RPM 包
使用以下命令在 `rpmbuild` 环境中创建 RPM 包：

```bash
rpmbuild -ba ~/rpmbuild/SPECS/python_env.spec
```

执行后，生成的 RPM 包会保存在 `~/rpmbuild/RPMS/noarch/` 目录中。

`noarch`是根据你系统生成的，x86的就是`x86_64`。

### 1.5 安装、卸载 RPM 包

首先要将打的rpm包上传到服务器上；

#### 1.5.1 安装rpm包

默认安装路径是你写的SPEC文件里的路径【本文是/opt/】

```bash
rpm -ivh python_env-1.0-1.noarch.rpm
# 强制安装
rpm -ivh python_env-1.0-1.noarch.rpm --nodeps
```

#### 1.5.2 查找刚刚安装rpm包

```bash
rpm -qa | grep python_env-1.0
```

#### 1.5.3 卸载刚刚安装的rpm包

```bash
rpm -e python_env-1.0-1.x86_64
# 强制卸载
rpm -e python_env-1.0-1.x86_64 --nodeps
```



## 二、使用rpmbuild将docker离线安装包打成rpm包



在使用 `rpmbuild` 将 `docker离线安装包`打包成 RPM 文件之前，需要确保已经安装 `rpmbuild` 工具，并配置好相关的 RPM 打包环境。以下是具体的步骤和说明：

### 2.1 准备打包环境
首先，确保安装了 `rpmbuild`，可以通过以下命令安装：

```bash
sudo yum install rpm-build -y
# 安装 rpmdevtools
yum install rpmdevtools
```

`rpmdevtools`为开发者提供了极大的便利，用于制作RPM包，涵盖了从创建rpmbuild开发树、MD5验证、spec文件的生成，到解压归档文件、归档文件前后版本对比diff等一系列功能。



**创建打包文件夹**

创建打包文件夹有两种方法：

　　　　方法一：使用命令 `rpmdev-setuptree` 来创建，但是创建的文件夹是在用户主目录（home）如果是root就是在（root）下，我们可以将rpmbuild整个文件夹拷贝到项目文件夹，这样可以方便我们项目管理。

　　　　方法二：手动的去创建文件夹，具体文件夹结构可以参考下面的目录树

```bash
# 方法一：使用命令创建
rpmdev-setuptree

# 方法二：手动创建文件夹
mkdir -p ~/rpmbuild/{BUILD,RPMS,SOURCES,SPECS,SRPMS}

# 目录树
rpmbuild
    - BUILD           // 编译时用到的暂存目录
    - RPMS            // 打包后生成的 rpm 包会放在这里
    - SOURCES         // 源码压缩包
    - SPECS           // 放 xx.spec 文件
    - SRPMS           // 打包后生成的 srpm 包会放在这里 
```

### 2.2 创建 docker 安装包的 SPEC 文件

在 `~/rpmbuild/SPECS` 目录中创建一个 `.spec` 文件，用于定义 RPM 包的相关信息，例如 ` docker.spec`。以下是一个基本的 `spec` 文件模板：

或者使用`rpmdev-newspec docker.spec`命令创建`*.spec`模板
>SPEC文件详细参数可参考： [SPEC 文件示例](#click_me_jump)

```text
Name: docker
Version: 24.0.5
Release: 1%{?dist}
Summary: docker install Package

License: MIT
# 尽量不要使用中文名
Source0: %{name}%{version}.zip

%description
This install docker package.

%prep
# 这里可以解压环境包

%build
# 打包需要的构建操作可以在这里定义

%install
# 假设你已经将把docker安装包已经打好了为.zip文件，将其解压到 /opt/
unzip  %{SOURCE0} -d %{buildroot}/opt/

%files
/opt/docker24.0.5/*

%changelog
* Tue Nov 14 2024 Your Name <youremail@example.com> - 1.0-1
- Initial package for Python environment
```

### 2.3 准备 docker安装包 环境

将docker的安装包放到`rpmbuild/SOURCES/`下

```bash
# 复制过去
cp -ar docker24.0.5.zip ~/rpmbuild/SOURCES/
# 或者移动过去
mv docker24.0.5.zip ~/rpmbuild/SOURCES/
```

### 2.4 构建 RPM 包
使用以下命令在 `rpmbuild` 环境中创建 RPM 包：

```bash
rpmbuild -ba ~/rpmbuild/SPECS/docker.spec
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202609141713403.png)



执行后，生成的 RPM 包会保存在 `~/rpmbuild/RPMS/noarch/` 目录中。

`noarch`是根据你系统生成的，x86的就是`x86_64`。

### 2.5 安装、卸载 RPM 包

首先要将打的rpm包上传到服务器上；

#### 2.5.1 安装rpm包

默认安装路径是你写的SPEC文件里的路径【本文是/opt/】

```bash
rpm -ivh docker-24.0.5-1.nfs.x86_64.rpm
# 强制安装
rpm -ivh docker-24.0.5-1.nfs.x86_64.rpm --nodeps
```

#### 2.5.2 查找刚刚安装rpm包

```bash
rpm -qa | grep docker-24.0.5
```

#### 2.5.3 卸载刚刚安装的rpm包

```bash
rpm -e docker-24.0.5-1.nfs.x86_64
# 强制卸载
rpm -e docker-24.0.5-1.nfs.x86_64 --nodeps
```

## 三、相关文章

| 文章标题                                                     | 文章链接                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Linux如何将文件或目录打成rpm包？ -- fpm打包详解](https://blog.csdn.net/liu_chen_yang/article/details/134270559) | [https://blog.csdn.net/liu_chen_yang/article/details/134270559](https://blog.csdn.net/liu_chen_yang/article/details/134270559) |
| [Linux如何将文件或目录打成rpm包？-- rpmbuild打包详解](https://blog.csdn.net/liu_chen_yang/article/details/143715019)      | [https://blog.csdn.net/liu_chen_yang/article/details/143715019](https://blog.csdn.net/liu_chen_yang/article/details/143715019)                                       |

> 🐋 希望大家多多支持，我们一起进步！😄
> 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗
