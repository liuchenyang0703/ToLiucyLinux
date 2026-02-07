---
title: 虚拟化常见面试题
icon: circle-info
order: 1
category:
  - 面试题
tag:
  - 虚拟化常见面试题
  - 运维
date: 2026-02-07
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1、什么是虚拟化？

答：就是将一台物理机虚拟成多台虚拟机，虚拟机之间互不干扰。

## 2、常见的虚拟化软件都有哪些？

答：vmware、kvm

## 3、怎么查看当前系统是使用哪家的虚拟化？

答：lscpu

## 4、kvm的三个组件及作用

答：libvirt（用来管理虚拟机）、virt（安装和克隆虚拟机）、qemu（管理虚拟机磁盘的）

## 5、如何查看正在运行的虚拟机

答：virsh list

## 6、kvm如何进行子机的开机关机操作

virsh start centos7 开机 virsh shutdown centos7 关机

## 7、kvm的网络模式有哪几种

*   NAT模式：虚拟机通过主机的NAT网络访问外部网络。
*   桥接模式：虚拟机直接连接到物理网络，与主机在同一网络中。
*   用户模式：虚拟机通过主机的用户空间网络栈访问外部网络。
*   VLAN模式：虚拟机连接到特定的VLAN。

## 8、KVM支持哪些存储格式？

*   raw：原始格式，性能最好，但不支持快照。
*   qcow2：支持压缩、快照和动态分配空间。
*   vmdk：VMware兼容格式。
*   vdi：VirtualBox兼容格式。