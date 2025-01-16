---
title: 【Linux】Centos7 随机生成密码
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2024-12-17
comment: false
breadcrumb: false
---

>🍁**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>

## pwgen 生成随机密码
- 安装`pwgen`命令
```bash
yum -y install pwgen
```
- 使用方法

执行后，将输出随机密码。您可以根据需要更改密码长度和生成的密码的个数。

```bash
pwgen <密码长度>
pwgen <密码长度> <生成的密码个数>
```
- 实例

生成随机的12个字长的密码（会生成很多，可从中选取任意一个出来）
```bash
pwgen 12
```
生成随机的12个字长的密码（只生成一个）

```bash
pwgen 12 1
```

<font color=red>请注意：生成的密码应该保密，因此请不要将其存储在不安全的位置。</font>

## mkpasswd 生成随机密码（有特殊要求推荐）
- 安装`expect`命令

```bash
yum -y install expect
```
- 参数说明

|参数| 说明 |
|--|--|
|    -l| 密码的长度定义, 默认是 9
|    -d| 数字个数, 默认是 2
|    -c|   小写字符个数, 默认是 3
|    -C |  大写字符个数, 默认是 2
|    -s |特殊字符个数, 默认是  1

- 实例

随机生成密码：长度为12、数字3个、小写字符5个、大写字符为3个、特殊字符为1个。
```bash
mkpasswd -l 12 -d 3 -c 5 -C 3 -s 1
```
<font color=red>请注意：生成的密码应该保密，因此请不要将其存储在不安全的位置。</font>

## openssl 生成随机密码（高强度密码推荐）
- 简介
>在所有的类 Unix 发行版、Solaris、Mac OS X 和 Windows 中默认都用openssl这个工具来生成高强度随机密码（这个是系统自带，使用率最高）

- 使用方式

```bash
openssl rand -base64 <密码字符长度>
```
- 实例

随机生成12位的密码（推荐）
```bash
openssl rand -base64 12
```
随机生成12位的密码并进行数据校验要前12位字符串

```bash
openssl rand -base64 12 | md5sum | cut -c 1-12
```

<font color=red>请注意：生成的密码应该保密，因此请不要将其存储在不安全的位置。</font>


## /dev/urandom 生成随机密码（高强度密码推荐10位密码）
数据取于一些linux面板的安装脚本内；（小皮面板、1Panel）
```bash
< /dev/urandom tr -dc 0-9-A-Z-a-z-|head -c ${1:-10} ; echo
```
<font color=red>请注意：生成的密码应该保密，因此请不要将其存储在不安全的位置。</font>



