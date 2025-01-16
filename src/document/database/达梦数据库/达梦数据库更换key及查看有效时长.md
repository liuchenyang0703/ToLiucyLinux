---
title: 达梦数据库更换key及查看有效时长
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



## 一、登录数据库，查看授权日期

```bash
# 进入数据库
cd /opt/dmdbms/bin && ./disql SYSDBA/SYSDBA@localhost:5236

# 查看授权时间
select * from v$license;
select EXPIRED_DATE from v$license;
```



## 二、更新授权key

### 2.1 备份并替换授权key

将`dm.key`移动到/opt/dmsetup/下进行替换并更新

```bash
# 先备份key
cd /opt/dmsetup
mv dm.key dm.key-bak

# 备份完之后，将新的dm.key移动到/opt/dmsetup下
mv /root/dm.key /opt/dmsetup
```



### 2.2 重启达梦数据库

```bash
# 重启
/opt/dmdbms/bin/DmServiceDMSERVER restart

# 查看数据库服务状态
/opt/dmdbms/bin/DmServiceDMSERVER status

# （runnint）则正在运行中
```





### 2.3 再次进入数据库查看授权日期是否更改

```bash
# 进入数据库
cd /opt/dmdbms/bin && ./disql SYSDBA/SYSDBA@localhost:5236

# 查看授权时间
select * from v$license;
```

