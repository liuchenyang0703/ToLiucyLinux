---
title: Linux 达梦数据库的部署及操作
icon: circle-info
order: 1
category:
  - Linux
  - 数据库
tag:
  - Linux
  - 数据库
  - 达梦数据库
  - 运维
pageview: false
date: 2024-12-30
comment: false
breadcrumb: false
---


## 一、挂载并创建用户

```bash
# 上传达梦iso镜像和key到/opt/dmsetup/下
mkdir /opt/dmsetup/

# 创建dm目录
mkdir /dm

# 挂载达梦iso镜像
mount -o loop /opt/dmsetup/dm8_20200907_FTarm_kylin4_64_ent_8.1.1.126.iso /dm

# 创建用户组
groupadd -g 12349 dinstall

# 创建dmdba用户
useradd -u 12345 -g dinstall -m -d /home/dmdba -s /bin/bash dmdba

# 初始化用户密码
passwd dmdba

# 提前创建安装目录
mkdir -p /opt/dmdbms
# 给目录用户权限
chown -R dmdba:dinstall dmdbms/
```



## 二、安装达梦数据库（命令行）（安装不能使用root用户）

> <font color=red>**注意：需要提前申请好达梦的授权（key）并把key放到自己需要放到的目录**</font>
>
> <font color=red>**注意：需要提前申请好达梦的授权（key）并把key放到自己需要放到的目录**</font>
>
> <font color=red>**注意：需要提前申请好达梦的授权（key）并把key放到自己需要放到的目录**</font>
>
> <font color=red>**需要使用普通用户来安装**</font>
>
> <font color=red>**需要使用普通用户来安装**</font>
>
> <font color=red>**需要使用普通用户来安装**</font>



1）执行安装命令

在终端进入到安装程序所在文件夹，执行以下命令进行命令行安装

```bash
# 切换dmdba用户
sudo dmdba

# 进入dm目录安装
cd /dm
./DMInstall.bin -i
```

2）选择安装语言

根据系统配置选择相应语言，输入选项，回车进行下一步。

```bash
请选择安装语言(C/c:中文 E/e:英文) [C/c]：C
解压安装程序.......... 
欢迎使用达梦数据库安装程序
```

3）验证 key 文件（<font color=red>**需要提前申请好key，并把key放到自己需要放到的目录**</font>）

可以选择是否输入 Key 文件路径。不输入则进入下一步安装，输入 Key 文件路径，安装程序将显示 Key 文件的详细信息，如果是合法的 Key， 文件且在有效期内，可以继续安装。如下所示：

```bash
是否输入 Key 文件路径? (Y/y:是 N/n:否) [Y/y]：Y
请输入 Key 文件的路径地址 [dm.key]：/opt/dmsetup/dm.key
有效日期: 2020-12-25
服务器颁布类型: 企业版
发布类型: 试用版
用户名称: 测试授权临时版
授权用户数: 无限制
并发连接数: 无限制
```

4）输入时区

可以选择的时区信息。

```bash
是否设置时区? (Y/y:是 N/n:否) [Y/y]：Y
设置时区:
[ 1]: GTM-12=日界线西
[ 2]: GTM-11=萨摩亚群岛
[ 3]: GTM-10=夏威夷
[ 4]: GTM-09=阿拉斯加
[ 5]: GTM-08=太平洋时间（美国和加拿大）
[ 6]: GTM-07=亚利桑那
[ 7]: GTM-06=中部时间（美国和加拿大）
[ 8]: GTM-05=东部部时间（美国和加拿大）
[ 9]: GTM-04=大西洋时间（美国和加拿大）
[10]: GTM-03=巴西利亚
[11]: GTM-02=中大西洋
[12]: GTM-01=亚速尔群岛
[13]: GTM=格林威治标准时间
[14]: GTM+01=萨拉热窝
[15]: GTM+02=开罗
[16]: GTM+03=莫斯科
[17]: GTM+04=阿布扎比
[18]: GTM+05=伊斯兰堡
[19]: GTM+06=达卡
[20]: GTM+07=曼谷，河内
[21]: GTM+08=中国标准时间
[22]: GTM+09=汉城
[23]: GTM+10=关岛
[24]: GTM+11=所罗门群岛
[25]: GTM+12=斐济
[26]: GTM+13=努库阿勒法
[27]: GTM+14=基里巴斯
请选择设置时区 [21]：21
```

5）选择安装类型

数据库软件安装程序提供四种安装方式：“典型安装”、“服务器安装”、“客户端安装”和“自定义安装”，用户可根据实际情况灵活地选择。如下图所示：

&emsp;&emsp;典型安装包括：服务器、客户端、驱动、用户手册、数据库服务。

&emsp;&emsp;服务器安装包括：服务器、驱动、用户手册、数据库服务。

&emsp;&emsp;客户端安装包括：客户端、驱动、用户手册。

&emsp;&emsp;自定义安装包括：用户根据需求勾选组件，可以是服务器、客户端、驱动、用户手册、数据库服务中的任意组合。

&emsp;&emsp;生产环境可以根据实际需求选择，一般情况下选择"典型安装"即可。

```bash
安装类型:
1 典型安装
2 服务器
3 客户端
4 自定义
请选择安装类型的数字序号 [1 典型安装]：1
所需空间: 1010M
```

6）选择安装路径

输入数据库软件的安装路径 ，不输入则使用默认路径，默认值为$HOME/dmdbms(如果安装用户为 root，则默认安装目录为`/opt/dmdbms`，但不建议使用 root 系统用户来安装)。没有这个目录需要提前创建一个`mkdir -p /opt/dmdbms`；

```bash
请选择安装目录 [/home/dmdba/dmdbms]：/opt/dmdbms
可用空间: 11G
```

&emsp;&emsp;注意：安装路径里的目录名由英文字母、数字和下划线等组成，不建议使用包含空格和中文字符的路径等。

7）安装小结

安装程序将打印用户之前输入的部分安装信息。如下所示：

```bash
是否确认安装路径(/opt/dmdbms)? (Y/y:是 N/n:否) [Y/y]：Y
安装前小结
安装位置: /opt/dmdbms
所需空间: 1010M
可用空间: 11G
版本信息: 企业版
有效日期: 2020-12-25
安装类型: 典型安装
```

8）安装

```bash
是否确认安装? (Y/y:是 N/n:否)：Y
2020-12-24 21:52:38
[INFO] 安装达梦数据库...
2020-12-24 21:52:39
[INFO] 安装 基础 模块...
2020-12-24 21:52:48
[INFO] 安装 服务器 模块...
2020-12-24 21:52:48
[INFO] 安装 客户端 模块...
2020-12-24 21:52:56
[INFO] 安装 驱动 模块...
2020-12-24 21:52:58
[INFO] 安装 手册 模块...
2020-12-24 21:53:00
[INFO] 安装 服务 模块...
2020-12-24 21:53:02
[INFO] 移动 ant 日志文件。
2020-12-24 21:53:03
[INFO] 安装达梦数据库完成。

请以root系统用户执行命令:
/opt/dmdbms/script/root/root_installer.sh

安装结束

```



<font color=red>提示：请以 root 系统用户执行命令:</font>

```bash
/opt/dmdbms/script/root/root_installer.sh
```

执行等待，安装完成



9）注册数据库服务

当安装进度完成时将会弹出对话框，提示使用 root 系统用户执行相关命令。用户可根据对话框的说明完成相关操作，之后可关闭此对话框，点击“完成”按钮结束安装。如下所示：

```bash
[dmdba@~]# su - root
密码：<输入密码>
[root@~]# /opt/dmdbms/script/root/root_installer.sh
移动 /opt/dmdbms/bin/dm_svc.conf 到/etc 目录
修改服务器权限
创建 DmAPService 服务
Created symlink from
/etc/systemd/system/multiuser.target.wants/DmAPService.service to
/usr/lib/systemd/system/DmAPService.service
创建服务(DmAPService)完成
启动 DmAPService 服务
```

## 三、初始化数据库实例



### 3.1 初始化过程

初始化实例的示例如下：设置页大小（PAGE_SIZE）为 32，日志大小（LOG_SIZE）为 2048，大小写（CASE_SENSITIVE）为敏感，字符集（CHARSET）为 GB18030。

其它参数默认，如需更改其它参数，请参考《dminit 使用手册》

```bash
# 先切换到普通用户
su dmdba

[dmdba@~]# /opt/dmdbms/bin/dminit PATH=/opt/dmdbms/data PAGE_SIZE=32
LOG_SIZE=2048 CHARSET=0 CASE_SENSITIVE=Y
initdb V8
db version: 0x7000a
License will expire in 1 day(s) on 2020-12-25
log file path: /opt/dmdbms/data/DAMENG/DAMENG01.log
log file path: /opt/dmdbms/data/DAMENG/DAMENG02.log
write to dir [/opt/dmdbms/data/DAMENG].
create dm database success. 2020-12-24 22:05:38
```

![image-20240529170026112](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412301443191.png)

注意：实际环境中，簇大小建议选择 32，页大小选择 32K，日志大小选择 2048，字符集和大小写敏感需要和应用厂商对接后，再进行选择。

---



遇到报错：

```bash
/opt/dmdbms/bin/dminit PATH=/opt/dmdbms/data PAGE_SIZE=32
/opt/dmdbms/bin/dminit: error while loading shared libraries: libdmnsort.so: cannot open shared object file: No such file or directory
```

解决方法（配置环境变量）：

```bash
vim /etc/profile
# 达梦数据库
export DM_HOME=/opt/dmdbms
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$DM_HOME/bin

# 使其生效
source /etc/profile
```

切换dmdba用户重新初始化

---



### 3.2 创建实例服务

```bash
[dmdba@~]# su - root
密码：<输入密码>
[root@~]# /opt/dmdbms/script/root/dm_service_installer.sh -t dmserver -dm_ini /opt/dmdbms/data/DAMENG/dm.ini -p DMSERVER
Created symlink from
/etc/systemd/system/multi-user.target.wants/DmServiceDMSERVER.service to
/usr/lib/systemd/system/DmServiceDMSERVER.service. 创建服务(DmServiceDMSERVER)完成
```

![image-20240529170127531](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412301443571.png)

### 3.3 启动实例服务

```bash
# 使用普通用户启动实例
su dmdba

[dmdba@~]# /opt/dmdbms/bin/DmServiceDMSERVER start
Starting DmServiceDMSERVER：[ OK ]
```



## 四、进入数据库

```bash
# 进入数据库（SYSDBA是默认的管理员）
cd /opt/dmdbms/bin && ./disql SYSDBA/SYSDBA@localhost:5236
```



## 五、查看数据库授权时间

```sql
# 查看授权时间
select * from v$license;
select EXPIRED_DATE from v$license;
```



## 六、创建用户并授权权限

```sql
# 创建用户
create user 名字 IDENTIFIED BY "密码";
# 授权给某个用户
grant resource,PUBLIC,vti,soi to 名字;
```



## 七、登录创建的用户

```bash
cd /opt/dmdbms/bin && ./disql 名字/密码@localhost:5236
```



## 八、创建表

```bash
CREATE TABLE "MOULD"."AUTHUSER"
(
"USERKEY" VARCHAR(255) NOT NULL,
"USERNAME" VARCHAR(255) NOT NULL,
"USERTIME" DATE NOT NULL,
"USERID" INT IDENTITY(10, 1) NOT NULL,
NOT CLUSTER PRIMARY KEY("USERID")) STORAGE(ON "MAIN", CLUSTERBTR) ;
```



## 九、删除表

```bash
DROP TABLE "MOULD"."TEMPLATES";
```



## 十、查看当前用户所有的表

```sql
SELECT table_name FROM user_tables;
```

![image-20240726161909094](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412301443798.png)



## 十一、查看表结构

```sql
desc TEMPLATES;
```

![image-20240729103024531](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202407291030882.png)



## 十二、查看数据库版本

```sql
select * from v$version;
```

![image-20240729103103260](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412301443913.png)