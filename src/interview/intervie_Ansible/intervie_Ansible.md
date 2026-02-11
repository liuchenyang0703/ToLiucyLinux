---
title: Ansible常见面试题
icon: circle-info
order: 1
category:
  - 面试题
tag:
  - Ansible常见面试题
  - 运维
date: 2026-02-07
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1、Ansible常用模块及左右

答：command ping yum copy service shell file replace user group

## 2、什么是Playbooks？简答讲下

答：Playbooks 可以理解为一个编排文件，基于YAML语言编写的。用于描述远程系统实施的过程，或者描述流程中的一系列步骤。

## 3、shell模块与command模块的区别？

答：command只能识别一些简单的linux命令，shell能识别一点复杂性命令。

## 4、要对1000台机器收集内核版本，如何让ansible以面向过程的方式执行收集这些信息？

答：将其配置文件中的 forks 参数改为1就好。

## 5、如何调试 Ansible Playbook  
答：使用 --check 参数进行模拟运行

## 6、如何收集目标主机的 Facts系统信息？  
答：使用 setup 模块收集 Facts；