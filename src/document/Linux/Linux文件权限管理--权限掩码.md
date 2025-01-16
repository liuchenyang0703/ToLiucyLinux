---
title: Linux文件权限管理--权限掩码
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2024-12-20
comment: false
breadcrumb: false
---



<font color=red>r读	w写	x执行</font><br>


> <font color=blue>查看文件权限：</font>
rw-r--r--
第一组用户权限
第二组用户组权限
第三组其他用户权限
chmod	修改文件权限
chmod [选项]	“u/g/o/a+/-/=rwx”文件（u代表第一组uid，g代表第二组gid，o代表第三组其他用户权限，a代表全部（a会给每一组加一个））
r=4  w=2  x=1  -=0


> <font color=blue>文件的归属：</font>
> 属于哪个用户	属主 
> 属于哪个用户组	属组


<font color=red>语法：</font>

> chown [选项]  用户：用户组  文件名
-R	递归修改<br>
/dir1/ a.txt b.txt c.txt
chown -R root:root /dir1

> find ./ -maxdepth 1 -type f ! -name ".*" -exec chown xiaoming:xiaomimg
> { } \;
><font color=teal> 查找深度为1的名字、为.*结尾的文件再给他修改用户和用户组</font>


<font color=red>权限掩码-->默认文件和目录的权限</font>

> umask 022<br>
创建一个文件默认权限是644=666-022，目录时755=777-022




<font color=red>文件的ACL（访问控制列表）</font>

> getfacl	获取文件的ACL
setfacl	设置文件的ACL
setfacl -m 用户:权限	文件名	设置用户权限
-x	删除指定文件的ACL（setfacl -x 用户名 文件名）
-b	清空文件的ACL（setfacl -b 文件名）

默认情况，文件给定用户的ACL要考虑到ACL中的mask值

<font color=red>特殊权限：</font>
rws/s	rws/S	rwt/T
4	2	1
大小写取决于执行位是否有执行权限

<font color=red>特殊属性：</font>

> lsattr	查看特殊属性
chattr	设置特殊属性
i	不能修改不能追加
a	只可以追加，不能修改	只有root用户可以设置

<font color=green>用法：</font>

> chattr -i 文件名
>  chattr +i 文件名


