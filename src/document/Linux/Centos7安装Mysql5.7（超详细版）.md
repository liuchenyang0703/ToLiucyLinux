---
title: Centos7安装Mysql5.7（超详细版）
icon: circle-info
order: 3
category:
  - Linux
  - 数据库
tag:
  - Linux
  - 数据库
pageview: false
date: 2023-11-19 23:54:31
comment: false
breadcrumb: false
---

## 一、下载mysql5.7的安装包

**下载地址：[https://dev.mysql.com/downloads/mysql/5.7.html](https://dev.mysql.com/downloads/mysql/5.7.html)**

### ①、选择linux版的
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ff19a527bddc4e2e9a373c31da7c414a.png)
### ②、选择64bit，根据自己的情况来看
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/62f25ac4350c4098a65490d81ef9fa33.png)
### ③、选择下载tar包
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/82938b0cc6c445668ef80ac514a2a45a.png)
### ④、点击下载

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/362a8430e8e642b78b1f5ccf3c52393c.png)
### ⑤、等待下载完
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/8701884070d940beb15b98d0669aae19.png)
## 二、上传到服务器
>**上传到服务器有好几种方法，任意采用一种就可以。**

可以直接把tar包上传到服务器的根目录下或者自己创建的目录下也可以，一般标准的就直接放到了/usr/local/下面；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/6b1a6fb0d868435ebaffa80baf878f6b.png)

## 三、检查服务器是否安装过mysql服务
>检查服务器是否安装过mysql服务，因为以前如果安装的有mysql可能会导致安装mysql的时候冲突报错；

**检查服务器上是否安装过mysql,如果没有请忽略此步骤：**

```bash
rpm -qa | grep mysql
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/37e87efc55ab46de93786c4e142db544.png)
我们可以看到是没有安装mysql的；
**如果有mysql的话，把mysql的文件全部删除，和卸载mysql；**

```bash
#查找mysql的目录或我文件
find / -name mysql
```
## 四、卸载Centos7自带的mariadb
>一般用的centos的系统都会自带一个系统数据库，那就是mariadb，因为没有激活，只有一个安装好的mariadb-libs-5.5.60-1.el7_5.x86_64，可以把mariadb-libs-5.5.60-1.el7_5.x86_64卸载。
### ①、查找系统自带的mariadb

```bash
rpm -qa | grep mariadb
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/616911ed9b9146bfa51ae1ac980ce9f7.png)
我们可以看到是可以查到的，现在把他卸载了；
### ②、卸载系统自带的mariadb

```bash
#卸载mariadb
rpm -e --nodeps mariadb-libs-5.5.60-1.el7-5.x86_64
#卸载完查看还有没有mariadb
rpm -qa | grep mariadb
```
![卸载完查看](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/964d669507204668af2f9c363a2cb9f1.png)
这里看已经卸载了；
### ③、查看my.cnf配置文件

```bash
cat /etc/my.cnf
```
因为默认的mysql的配置文件就是在/etc/的；我们可以看到也是没有my.cnf的。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/8e8ad65c26984ba6991c07a8c60b22f0.png)
## 五、安装mysql5.7
>卸载完系统自带的mariadb之后，我们开始安装mysql；
### ①、解压上传上来的安装包

```bash
tar xf mysql-5.7.38-linux-glibc2.12-x86_64.tar
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/eb7bc8174c68498a8fa2e0e53a41e18a.png)
生成了两个压缩包，然后在解压一下mysql-5.7.38-linux-glibc2.12-x86_64.tar.gz，注意最开始下载的tar包后缀<font color=red>**不带.gz**</font>，解压下来后面会多一个后缀<font color=red>**带了一个.gz**</font>;

```bash
#解压mysql-5.7.38-linux-glibc2.12-x86_64.tar.gz
tar xf mysql-5.7.38-linux-glibc2.12-x86_64.tar.gz
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/e7c28668caf545bcb3d1c06dd145157b.png)
解压完之后可以看到生成了一个mysql-5.7.38-linux-glibc2.12-x86_64的目录；正好，我们的<font color=red>【mysql-5.7.38-linux-glibc2.12-x86_64.tar】  【mysql-test-5.7.38-linux-glibc2.12-x86_64.tar.gz】</font>这两个就可以删了，留着也没用，但是<font color=red>mysql-5.7.38-linux-glibc2.12-x86_64.tar.gz</font>这个可不能删；
```bash
#删除mysql-5.7.38-linux-glibc2.12-x86_64.tar、mysql-test-5.7.38-linux-glibc2.12-x86_64.tar.gz
[root@mysql local]# rm -rf mysql-test-5.7.38-linux-glibc2.12-x86_64.tar.gz 
[root@mysql local]# rm -rf mysql-5.7.38-linux-glibc2.12-x86_64.tar
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/0563d37831994e40bebc8f314ff991f6.png)

删除完毕之后顺便给解压下来的文件修改个名字（规范）；

```bash
#修改解压的文件名
mv mysql-5.7.38-linux-glibc2.12-x86_64 mysql
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/d79fff4a2caf40d3902889b494abcae5.png)

### ②、创建一个mysql组和用户

```bash
groupadd mysql
useradd -r -g mysql mysql
```
创建完之后可以查看一下

```bash
cat /etc/group | grep mysql
cat /etc/passwd |grep mysql
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c11f4174a9194509885818378b199650.png)
这样就是创建好了，创建好之后，我们继续下一步；
### ③、更改mysql 目录下所有文件夹所属的用户组、用户以及文件权限

```bash
#切换到/usr/local/目录下
[root@mysql local]# cd /usr/local/
#更改文件的用户组和用户
[root@mysql local]# chown -R mysql:mysql mysql
#给mysql目录下的所有文件加执行权限
[root@mysql local]# chmod -R 775 mysql
#更改完之后ll可以查看一下
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f8549a4f8a7c452382a3ad00ab155435.png)
这样就修改成功了。
### ④、把mysql/bin目录下的所有命令创建一个“快捷方式”

```bash
#把这个写到配置文件里，路径不同，记得要修改路径
echo "export PATH=$PATH:/usr/local/mysql/bin" >> /etc/profile
#生效配置文件
source /etc/profile
```
生效之后，我们可以打出mysql，按tab补全键两下，就可以看到所有的mysql/bin下的都能出来，这样设置是相当于windows的快捷键，以便我们更好的利用；
![](https://img-blog.csdnimg.cn/9180aa5d601e4aa38fca67bc0327e0a9.png)

### ⑤、生成mysql的临时密码
```bash
#切换到mysql目录下
cd /usr/local/mysql/
#执行命令。生成临时数据库密码（还是注意路径看看是不是和你的一样）如果有 libaio.so.1: cannot open shared object file: No such file or directory报错，看下面！
mysqld --user=mysql --initialize --datadir=/usr/local/mysql/data
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/950f5895e4474efeb91ab1c08ccefaf2.png)
生成的临时密码是：<font color=red>eqypjeVdx6/d</font>

**千万要把临时密码记住，到后面修改完密码之后，就可以不用了；**
如果执行<font color=red>mysqld --user=mysql --initialize --datadir=/usr/local/mysql/data</font>报这个错；安装包即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ae44742ba61e4add94d0dc60fc354d3e.png)

```bash
yum -y install libaio*

#安装完成再次执行就好了
mysqld --user=mysql --initialize --datadir=/usr/local/mysql/data
```

### ⑥、复制启动文件到/etc/init.d/目录

```bash
cp -ar /usr/local/mysql/support-files/mysql.server /etc/init.d/mysqld
```
这个直接复制就可以了，咱们不需要改动什么，因为是按正规的流程走的，所以不需要改动；如果说，你的路径和我的不一样，就需要改完之后在复制过去了；
路径不对的，修改这几个路径在复制过去就可以，软连接的话应该也是可以的，最后还是复制过去一份；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/af4b6d55b6434747b3ed2338ca66e16f.png)

### ⑦、添加my.cnf配置文件

```bash
#首先切换到/etc/目录下
cd /etc/
#在这里创建一个mysql的配置文件my.cnf
touch my.cnf
#编辑my.cnf配置文件
```
这里我给大家整理了一份，可以照着这个修改，我这个配置文件默认是开启log-bin日志的；当然也可以自己写，去百度查也可以；👉[mysql配置文件my.cnf](https://download.csdn.net/download/liu_chen_yang/85445276?spm=1001.2014.3001.5503)👈
>要注意的都有：
>&emsp;&emsp;端口号3306，自己先看看有没有被占用，还有就是路径对不对。

给mysql的配置文件加执行权限；
```bash
chmod -R 775 /etc/my.cnf
```
### ⑧、启动mysql服务&&设置开机自启
启动之前我们先查询有没有启动过；

```bash
ps -ef|grep -v grep |grep mysql
ps -ef|grep -v grep |grep mysqld
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/6006b6c6ce2249f1aa07fb9c324a67ca.png)
**可以看到是没有进程的，然后我们启动mysql服务；**

```bash
#启动mysql服务
/etc/init.d/mysqld start
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/151aef8098a14c0489a9ae72f7b1fb6c.png)
显示这个就是启动成功了，然后我们接下来设置开机自启；

```bash
//添加服务
chkconfig --add mysqld
//显示服务列表
chkconfig --list
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/dc983ff688954582998d1fec24ef2072.png)
开机自启设置成功。
### ⑨、登录mysql&&修改mysql密码
>登录mysql ，密码就是初始化时生成的临时密码；

```bash
 mysql -uroot -p
```
在这输入密码，密码是看不到的，输入临时密码之后就可以进入mysql了；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ecf7285c695d4ecaa55ff82954d6f60a.png)
登录进来之后，我们来修改密码；

```bash
#修改密码为123456
set password for root@localhost = password('123456');
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f360414efaa44f6ea5721f3bacc8caa3.png)
这样就是密码修改成功，然后我们退出重新登录一下；

```bash
快捷键ctrl+d退出
```
再次登录：

```bash
mysql -uroot -p123456
```
就可以登录进来了；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/7be8cc97b74c409ea53fff7b8f3e3aba.png)
### ⑩、开放远程登陆&&测试本地客户端连接

```bash
#登录进来之后，切换到mysql库
use mysql;
#修改用户权限
update user set user.Host='%' where user.User='root';
#刷新权限
flush privileges;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/47638eace2ef4c3ea86cea170154993e.png)
开放远程登录这时候我们就可以用navicat、sqlyog等链接工具来连接数据库了，端口3306；自己可以测试一下，如果是直接在linux中用就不用测试了。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/086bb558cd67434eb9a0a5bb5cc6e81f.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c4fe8ba7e22f46899831b97f034051ee.png)

这样就链接成功了，就可以在里面操作增删改查库了。


## 总结
>现在centos7安装mysql5.7就完成了，本地客户端连接centos7中的mysql5.7服务端也是成功的。

## 【力荐】数据库定时备份脚本
>[mysql数据库定时备份脚本+定时删除 A-刘晨阳](https://download.csdn.net/download/liu_chen_yang/87776124?spm=1001.2101.3001.9500)
## 相关文章
>[【云原生】Docker之创建并进入mysql容器](https://liucy.blog.csdn.net/article/details/126288434)
>
>---
>[Centos7安装Mysql5.7（超详细版）](https://liucy.blog.csdn.net/article/details/124930789)

