---
title: Linux—history命令 –– 查看与操纵历史命令
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

history命令用于显示用户以前执行过的历史命令，并且能对历史命令进行追加和删除等操作。

如果你经常使用Linux命令，那么使用history命令可以有效地提升你的效率。


## 语法格式：
>history [参数] [目录]

## 常用参数：
|  |  |
|--|--|
|-a|	将当前shell会话的历史命令追加到命令历史文件中,命令历史文件是保存历史命令的配置文件
|-c|	清空当前历史命令列表
|-d|	删除历史命令列表中指定序号的命令
|-n	|从命令历史文件中读取本次Shell会话开始时没有读取的历史命令
|-r	|读取命令历史文件到当前的Shell历史命令内存缓冲区
|-s	|将指定的命令作为单独的条目加入命令历史内存缓冲区。在执行添加之前先删除命令历史内存缓冲区中最后一条命令
|-w|	把当前的shell历史命令内存缓冲区的内容写入命令历史文件
|!num|num值是执行history前面显示的行号，也称历史记录号；&emsp;	直接执行选择的命令

## 参考实例：

查看所有的历史记录：

```bash
[root@linuxcool ~]# history
```

显示最近的10条命令：

```bash
[root@linuxcool ~]# history 10  
```

将本次登录的命令写入历史文件中：

```bash
[root@linuxcool ~]# history -w
```

将命令历史文件中的内容读入到目前shell的history记忆中 ：

```bash
[root@linuxcool ~]# history -r  
```

将当前Shell会话的历史命令追加到命令历史文件中：

```bash
[root@linuxcool ~]# history -a  
```

清空当前历史命令列表：

```bash
[root@linuxcool ~]# history -c 
```

执行已经执行过又想执行的命令：

```bash
[root@linuxcool ~]# history
    1  ls
    2  vim a
    3  ls
    4  journalctl -d
    5  journalctl -b
[root@linuxcool ~]# !3
abc 123 lcy linux history ml ss 
dd laks 111 vi go sl sd fsg a
```

