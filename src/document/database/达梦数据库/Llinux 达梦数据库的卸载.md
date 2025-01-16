---
title: Llinux 达梦数据库的卸载
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


## 1、使用root用户停止服务

```bash
su - root
systemctl stop DmServiceDMSERVER
systemctl stop DmAPService.service 
```

## 2、切换到dmdba用户进行卸载程序

```bash
su - dmdba
cd /opt/dmdbms/
./uninstall.sh -i
```

```bash
dmdba@debian:~/dmdbms$ ./uninstall.sh -i
请确认是否卸载达梦数据库(/opt/dmdbms/)? (y/Y:是 n/N:否)：y

是否删除dm_svc.conf配置文件? (y/Y:是 n/N:否):y

正在删除所有数据库库服务
删除数据库服务DmJobMonitorService
删除数据库服务DmAPService
删除数据库服务DmAuditMonitorService
删除数据库服务DmInstanceMonitorService
删除数据库服务DmServiceDMSERVER
删除数据库服务DmServiceDMSERVER-
删除所有数据库库服务完成
正在删除数据库目录
删除bin目录
删除bin目录完成
删除bin2目录
删除bin2目录完成
删除include目录
删除include目录完成
删除desktop目录
删除desktop目录完成
删除doc目录
删除doc目录完成
删除drivers目录
删除drivers目录完成
删除jdk目录
删除jdk目录完成
删除jar目录
删除jar目录完成
删除samples目录
删除samples目录完成
删除script目录
删除script目录完成
删除tool目录
删除tool目录完成
删除web目录
删除web目录完成
删除uninstall目录
删除uninstall目录完成
删除license_en.txt文件
删除license_en.txt文件完成
删除license_zh.txt文件
删除license_zh.txt文件完成
删除uninstall.sh文件
删除uninstall.sh文件完成
删除数据库目录完成

使用root用户执行命令:
/opt/dmdbms/root_uninstaller.sh

dmdba@debian:~/dmdbms$ 
```

## 3、使用root用户执行清理命令

切换到root

```bash
su -
```

```bash
/opt/dmdbms/root_uninstaller.sh
删除DmAPService服务
Removed /etc/systemd/system/multi-user.target.wants/DmAPService.service.
删除DmServiceDMSERVER服务
Removed /etc/systemd/system/multi-user.target.wants/DmServiceDMSERVER.service.
删除/etc/dm_svc.conf文件
```

卸载完成