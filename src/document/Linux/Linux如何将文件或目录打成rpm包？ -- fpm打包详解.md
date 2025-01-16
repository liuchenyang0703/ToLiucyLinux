---
title: Linux如何将文件或目录打成rpm包？ -- fpm打包详解
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2024-12-19
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




## 前言

> &emsp;&emsp;最近因为遇到一个服务器受系统限制，只能上传rpm包才能使用，而我们的服务都是文件，那么怎么将文件都打成rpm包呢？？？我也是找了好几个，终于找到了一个简单好用的打包方式，下面来给大家讲解一下部署及打包、安装；



本文已`docker离线包`目录为例子，将其打成rpm包，并在新的服务器上安装；

操作系统为：Centos 7.6



## 说明 -- fpm参数及解析

* [x] fpm的功能就是将一种类型的包转换成另一种类型



- fpm支持的源类型包：

| 原类型包 | 解析                                             |
| -------- | ------------------------------------------------ |
| dir      | 将目录打包成所需要的类型用于源码编译安装的软件包 |
| rpm      | 对rpm进行转换                                    |
| gem      | 对rubygem包进行转换；                            |
| python   | 将python模块打包成相应的类型                     |



* fpm支持的目标类型包：

| 目标类型包 | 解析            |
| ---------- | --------------- |
| rpm        | 转换为rpm包     |
| deb        | 转换为deb包     |
| solari     | 转换为solaris包 |
| puppet     | 转换成pupper包  |



* fpm常用参数：

| 参数             | 参数解析                                       |
| ---------------- | ---------------------------------------------- |
| -s               | 指定源类型                                     |
| -t               | 指定目标类型，即想要制作什么包                 |
| -n               | 指定包的名字                                   |
| -v               | 指定包的版本号                                 |
| -c               | 指定打包的相对路径                             |
| -d               | 指定依赖于哪些包                               |
| -f               | 第二次包时目录下如果有同名安装包存在，则覆盖它 |
| -p               | 制作的rpm安装包存放路径，不指定就在当前目录下  |
| --post-install   | 软件包安装完成之后所要运行的脚本               |
| --post-uninstall | 软件包卸载完成之后所要运行的脚本               |
| --pre-install    | 软件包安装完成之前所要运行的脚本               |
| --pre-uninstall  | 软件包卸载完成之前所要运行的脚本               |
| --prefix         | 制作好的rpm包默认安装路径                      |



## 一、安装fpm命令

### 1.1 安装 ruby 环境

fpm 是 `ruby`语法写的一种定制 rpm 包的工具，所以安装` fpm` 之前，需要安装` ruby` 环境。

>官方地址：[Download RubyGems | RubyGems.org | your community gem host](https://rubygems.org/pages/download)
>
>阿里源地址：[rubygems镜像_rubygems下载地址_rubygems安装教程-阿里巴巴开源镜像站](https://developer.aliyun.com/mirror/rubygems)



```bash
yum -y install ruby rubygems ruby-devel  rpm-build rpmdevtools git rubygem-json
```



### 1.2 更换 gem 源为阿里源

```bash
# 查看默认源
[root@localhost ~]# gem sources
*** CURRENT SOURCES ***

https://rubygems.org/


# 移除默认源
[root@localhost ~]# gem sources --remove https://rubygems.org/
https://rubygems.org/ removed from sources


# 添加阿里源
[root@localhost ~]# gem sources -a https://mirrors.aliyun.com/rubygems/
https://mirrors.aliyun.com/rubygems/ added to sources

# 再次查看是否更换成功
[root@localhost ~]# gem sources
*** CURRENT SOURCES ***

https://mirrors.aliyun.com/rubygems/

#可以看到已经更新成阿里源了
```

### 1.3 安装 fpm 

```bash
gem install fpm
```



如下截图，及安装成功；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191614633.png)



安装成功。



## 二、将文件打成rpm包



```bash
fpm -s dir -t rpm -n 软件名称 -v 版本号 --prefix=rpm安装的路径 ./打包文件名
```

> 注：执行fpm打包命令前，进入打包目标的上一级目录。

```bash
[root@localhost ~]# fpm -s dir -t rpm -n docker -v 1.0 --prefix=/root/docker/ nvidia-docker
Created package {:path=>"docker-1.0-1.x86_64.rpm"}
```



> -s：指定要打成rpm包的源类型，目录：-s dir
>
> -t：知道要将目录制作成什么类型的文件，-t rpm
>
> -n： 指定软件、包的名称
>
> -v： 指定该包的版本号
>
> --prefix：指定制作好的rpm包的安装路径，在新的服务器上安装会直接安装到此目录；
>
> ./：最后就是指定要打包的目录。



## 三、安装、卸载rpm包

首先要将打的rpm包上传到服务器上；

### 3.1 安装rpm包

```bash
rpm -ivh docker-1.0-1.x86_64.rpm
```



### 3.2 查找刚刚安装rpm包

```bash
rpm -qa | grep docker-1.0-1.x86_64
```



### 3.3 卸载刚刚安装的rpm包

```bash
rpm -e docker-1.0-1.x86_64
```



## 四、错误整理

### 2.1 ERROR:  Error installing fpm: 	rexml requires Ruby version >= 2.5.0.

* 报错信息：

```bash
# 安装fpm时报错
[root@localhost ~]# gem install fpm
ERROR:  Error installing fpm:
	rexml requires Ruby version >= 2.5.0.
```



* 问题分析：



此问题报错说的是`ruby` 的版本必须>=2.5.0，我们可以先看看我们的`ruby版本`

```bash
[root@localhost ~]# ruby -v
ruby 2.0.0p648 (2015-12-16) [x86_64-linux]
```

可以看到是`2.0.0版本`，所以，需要升级一下`ruby版本`；



* 问题解决：

```bash
#1. 离线安装 rvm：
# rvm 是用来管理 ruby 的，而 ruby 的其中一个“程序”叫 rubygems，也就是我们用它装 fpm 的，手动装各种库用 gem。
[root@localhost ~]# curl -sSL https://github.com/rvm/rvm/tarball/stable -o rvm-stable.tar.gz
 
#2. 解压 rvm 包：
[root@localhost ~]# tar -xzvf rvm-stable.tar.gz
 
#3. 进入解压目录，安装 rvm:
[root@localhost ~]# cd rvm-rvm-6bfc921/
[root@localhost rvm-rvm-6bfc921]# ./install --auto-dotfiles
 
#4. 重新加载 rvm：
[root@localhost rvm-rvm-6bfc921]# source /usr/local/rvm/scripts/rvm
 
#5. 查看 rvm 可安装版本：
[root@localhost rvm-rvm-6bfc921]# rvm list known
 
#6. 选择安装 ruby 2.6.3：
# 下载安装过程比较慢，请耐心等待
[root@localhost rvm-rvm-6bfc921]# rvm install 2.6.3
 
#7. 设置默认使用 ruby 版本：
[root@localhost rvm-rvm-6bfc921]# rvm use 2.6.3 --default
Using /usr/local/rvm/gems/ruby-2.6.3
[root@nginx01 rvm-rvm-6bfc921]# ruby -v
ruby 2.6.3p62 (2019-04-16 revision 67580) [x86_64-linux]
```

​    可以看到 ruby 已升级至 2.6.3。再次执行 gem install fpm -v 1.3.3，就不会再报这个错误了，一会就安装完成了。



### 2.2 /usr/share/rubygems/rubygems/core_ext/kernel_require.rb:54:in `require': cannot load such file -- json (LoadError)



* 报错信息：

```bash
[root@localhost ~]# gem install fpm
/usr/share/rubygems/rubygems/core_ext/kernel_require.rb:54:in `require': cannot load such file -- json (LoadError)
```



* 问题分析：

这个错误通常表示你的 Ruby 环境缺少一个名为 "json" 的 gem（Ruby库）。要解决这个问题，你可以按照以下步骤来修复：

1. 确保 Ruby 版本已安装：首先，请确保你的系统上已经安装了 Ruby。你可以在终端中运行以下命令来检查 Ruby 版本：

   ```
   ruby -v
   ```

   如果 Ruby 未安装或者版本较旧，建议更新到较新的版本。

2. 安装 JSON Gem：要解决这个问题，你需要安装 `json` gem。在终端中执行以下命令：

   ```
   gem install json
   ```

   这将安装 `json` gem 到你的 Ruby 环境中。

3. 检查 Gemfile：如果你的项目使用了 Gemfile 来管理 gem 依赖，确保你在 Gemfile 中有 `json` gem 的引用，并且运行 `bundle install` 来安装所需的 gem。

4. 检查 Ruby 环境：确保你的 Ruby 环境设置正确。有时，可能需要切换到正确的 Ruby 版本或环境。你可以使用工具如 RVM（Ruby Version Manager）或 rbenv 来管理不同的 Ruby 环境。

5. 检查加载路径：确保 Ruby 可以找到 `json` gem。有时，你可能需要在代码中添加 `require 'json'` 来明确指定加载这个 gem。



* 问题解决：

```bash
# 安装json
gem install json
```

即可解决。







