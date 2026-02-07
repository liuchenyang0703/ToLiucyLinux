---
title: Git常见面试题
icon: circle-info
order: 1
category:
  - 面试题
tag:
  - Git常见面试题
  - 运维
date: 2026-02-07
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1、Git 的基本工作流程是怎样的？

*   修改工作目录中的文件
*   将更改暂存 (git add)
*   提交更改到本地仓库 (git commit)
*   推送到远程仓库 (git push)

## 2、如何创建一个新的 Git 仓库？

*   初始化新仓库：git init
*   克隆现有仓库：git clone

## 3、解释 .git 目录下的重要文件和目录

*   HEAD：当前所在分支或提交
*   config：仓库配置
*   objects/：Git 对象存储（提交、树、blob）
*   refs/：引用（分支和标签）
*   hooks/：客户端和服务端钩子脚本
*   index：暂存区信息

## 4、如何查看当前仓库的状态？  
git status

## 5、如何撤销最后一次提交？

*   保留更改在工作目录：git reset --soft HEAD~1
*   完全删除提交（慎用）：git reset --hard HEAD~1

## 6、如何创建和切换分支？

*   创建分支：git branch
*   切换分支：git checkout
*   创建并切换分支（一步完成）：git checkout -b
