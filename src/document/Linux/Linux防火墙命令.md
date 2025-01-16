---
title: Linux防火墙命令
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - firewalld
  - 运维
pageview: false
date: 2024-12-19
comment: false
breadcrumb: false
---

> **redhat/CentOs7关闭防火墙的命令!**

## 1、查看防火状态

>systemctl status firewalld
service  iptables status

## 2、暂时关闭防火墙

>systemctl stop firewalld
service  iptables stop

## 3、永久关闭防火墙

>systemctl disable firewalld
chkconfig iptables off

## 4、重启防火墙

>systemctl enable firewalld
service iptables restart  



