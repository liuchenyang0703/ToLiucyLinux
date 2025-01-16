---
title: Ansible自动化运维（二）ad-hoc 模式详解
icon: circle-info
order: 1
category:
  - Linux
  - 自动化
  - Ansible
tag:
   - Linux
   - 自动化
   - Ansible
pageview: false
date: 2024-12-15
comment: false
breadcrumb: false
---


>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗



# Ansible 中的 ad-hoc 模式

Ad-hoc模式的使用场景:

* [x] 查看某个进程的信息 
* [x] 拷贝日志到本地

Ad-hoc模式的命令格式 ：

```bash
ansible 主机组名称 -m 模块 -a “具体命令”

常用选项:
-m 指定要使用的模块，不指定默认使用command模块 
-a 指定要执行的具体命令
-i  指定自定义的主机清单配置文件 
-f  一次返回几个结果
```

## 1、Ansible帮助命令

```bash
ansible-doc 		#帮助命令 
ansible-doc -l   	#列出所以的模块
ansible-doc 模块名   #查看模块的详细信息
ansible-doc 模块名 -s  #查看模块的选项使用说明
```

## 2、ad-hoc 模式执行流程

模块执行的工作流程:  

* 1.主控端命令行执行命令；

* 2.将模块拷贝到受控端；

* 3.按照模块定义的操作在受控端执行；

* 4.返回信息，删除受控端模块；

> 说明：
>
> ansible模块可以使用的前提是：主控端与受控端python版本一致，并且Ansible的模块是幂等执行的



Ansible执行命令的返回值颜色:

> <font color=feces yellow>屎黄色:执行命令成功，并且做了修改；</font>
>
> <font color=mediumseagreen>草帽绿:执行命令成功，只查看信息，没有修改</font>
>
> <font color=deeppink>玫瑰红:执行失败，报错 </font>
>
> <font color=rebeccapurple>葡萄紫:表示对命令发错的操作有警告信息</font>



比如上面，最开始的主机清单配置规则中，返回的结果就是绿色的，表示只查看，并不会做修改。

## 3、Ansible中常见的返回值

| 返回值      | 返回值含义                                                   |
| ----------- | ------------------------------------------------------------ |
| changed     | 几乎所有的Ansible模块都会返回该变量，表示模块是否对远程主机执行了修改操作 |
| failed      | 如果模块未能执行完成，将返回failed为true                     |
| msg         | 模块执行失败的原因，常见的错误如ssh连接失败                  |
| rc          | 与命令行工具相关的模块会返回rc,表示执行Linux命令的状态码     |
| stdout      | 与rc类似，返回的是标准输出的结果                             |
| stderr      | 与rc类似，返回的是标准错误的结果                             |
| backup_file | 所有存在backup选项的模块，用来返回备份文件的路径             |
| results     | 应用在playbook中存在循环的情况，返回多个结果                 |



## 4、常用模块



* 远程命令相关



```bash
1. command  	# 默认使用模块，用于远程执命令，不支持管道
2. shell   		# 远程执行命令，支持管道 
3. raw    		# ssh登录，再执行
4. script   	# 远程执行本地脚本
5. yum			# 远程安装
6. copy			# 推送文件
7. file			# 对文件操作
8. service		# 控制启动关闭服务
9. systemd   	# 控制启动关闭服务
10. cron		# 定时任务模块
11. mount		# 挂载与卸载模块
12. user/group	# 用于管理的用户创建与删除
13. unarchive	# 解压缩模块
14. get_url		# 下载文件，类似于curl
15. firewalld	# 防火墙
16. selinux		# selinux
17. setup		# 获取主机信息
18. git			# git命令模块
19. sysctl      # 控制内核
```



## 5、常用模块的用法

### 5.1 command  模块：用于远程执命令，不支持管道

* [x] command  模块：用于远程执命令，不支持管道

```bash
ansible 主机组名称 -m command -a “具体命令”
ansible 主机组名称 -a “具体命令”
# 默认为command模块
```

```bash
[root@localhost ansible]# vim /etc/ansible/hosts 
#配置要远程的地址
[web_group]
172.16.11.209
172.16.10.232

[web_group:vars]
ansible_ssh_pass='123123'

#执行：
[root@localhost ansible]# ansible web_group -a "mkdir /root/cs123"
[WARNING]: Consider using the file module with state=directory rather than running 'mkdir'.  If you need to use command because file is insufficient you can
add 'warn: false' to this command task or set 'command_warnings=False' in ansible.cfg to get rid of this message.
172.16.11.209 | CHANGED | rc=0 >>

172.16.10.232 | CHANGED | rc=0 >>
```



---

### 5.2 shell 模块：远程执行命令，支持管道 

* [x] shell 模块：远程执行命令，支持管道 

```bash
ansible 主机组名称 -m shell -a “具体命令”
```



```bash
[root@localhost ansible]# vim /etc/ansible/hosts 
#配置要远程的地址
[web_group]
172.16.11.209
172.16.10.232

[web_group:vars]
ansible_ssh_pass='123123'

#执行：
[root@localhost ansible]# ansible web_group -m shell -a "ls /home/test/"
172.16.10.232 | CHANGED | rc=0 >>
xunjian-yong.sh

# 在执行的时候多个地址是不分开的，需要仔细观看

172.16.11.209 | CHANGED | rc=0 >>
xunjian-yong.sh
```



---



### 5.3 raw 模块：ssh登录，再执行

* [x] raw 模块：ssh登录，再执行

```bash
ansible 主机组名称 -m raw -a “具体命令”
```

```bash
[root@localhost ansible]# vim /etc/ansible/hosts 
#配置要远程的地址
[web_group]
172.16.11.209
172.16.10.232

[web_group:vars]
ansible_ssh_pass='123123'

#执行：
[root@localhost ansible]# ansible web_group -m raw -a "ls /home/test/"
172.16.10.232 | CHANGED | rc=0 >>
xunjian-yong.sh
Shared connection to 172.16.10.232 closed.

172.16.11.209 | CHANGED | rc=0 >>
xunjian-yong.sh
Shared connection to 172.16.11.209 closed.
```



---



### 5.4 script 模块：远程执行本地脚本

* [x] script 模块：远程执行本地脚本

```bash
ansible 主机组名称 -m script -a "your_script_file"
```

在这个命令中，将`主机组名称`替换为您的目标主机名或组名，并将`your_script_file`替换为您要在目标主机上执行的脚本文件的本地路径。

```bash
[root@localhost ansible]# vim /etc/ansible/hosts 
#配置要远程的地址
[web_group]
172.16.11.209
172.16.10.232

[web_group:vars]
ansible_ssh_pass='123123'

#执行：
[root@localhost ansible]# ansible web_group -m script -a "/home/test/a.sh"
172.16.11.209 | CHANGED => {
    "changed": true, 
    "rc": 0, 
    "stderr": "Shared connection to 172.16.11.209 closed.\r\n", 
    "stderr_lines": [
        "Shared connection to 172.16.11.209 closed."
    ], 
    "stdout": "bin  games    lib    libexec\t    openssh-9.4p1.tar.gz  openssl-1.1.1t  share\r\netc  include  lib64  openssh-9.4p1  openssl\t\t  sbin\t\t  src\r\n", 
    "stdout_lines": [
        "bin  games    lib    libexec\t    openssh-9.4p1.tar.gz  openssl-1.1.1t  share", 
        "etc  include  lib64  openssh-9.4p1  openssl\t\t  sbin\t\t  src"
    ]
}
172.16.10.232 | CHANGED => {
    "changed": true, 
    "rc": 0, 
    "stderr": "Shared connection to 172.16.10.232 closed.\r\n", 
    "stderr_lines": [
        "Shared connection to 172.16.10.232 closed."
    ], 
    "stdout": "bin  games    lib    libexec\t    openssl\t    phpstudy  share\r\netc  include  lib64  openssh-9.3p2  openssl-1.1.1t  sbin      src\r\n", 
    "stdout_lines": [
        "bin  games    lib    libexec\t    openssl\t    phpstudy  share", 
        "etc  include  lib64  openssh-9.3p2  openssl-1.1.1t  sbin      src"
    ]
}
```

a.sh中内容为：`ls /usr/local/`

这将在目标主机上执行`a.sh`脚本文件。

请注意，`script`模块会将脚本文件传输到目标主机，然后在目标主机上执行它。因此，确保脚本文件在控制节点上可用，并且具有可执行权限（使用`chmod +x`命令添加执行权限）。

与`raw`模块不同，`script`模块允许您在目标主机上执行本地脚本文件，而不需要手动传输脚本内容。这对于执行复杂的本地操作非常有用。



---

### 5.5 yum 模块：远程安装软件

- [x] yum 模块：远程安装软件

`name`=软件包的名，多个软件包逗号隔开

`state`=`installed/present`安装、`removed/absent`卸载 、`lastest` 更新、`installed`列出已安装的包

>  yum模块的更多使用可使用`ansible-doc yum`查看。

```bash
ansible 主机组名称 -m yum -a "name=要安装\卸载\更新的包名 state=是安装还是卸载还是更新"
```

```bash
[root@localhost ansible]# vim /etc/ansible/hosts 
#配置要安装的地址
[web_group]
172.16.11.209
172.16.10.232

[web_group:vars]
ansible_ssh_pass='123123'

#执行：
#更新lrzsz命令
[root@localhost ansible]# ansible web_group -m yum -a "name=lrzsz state=latest"
#安装tldr和netstat命令
[root@localhost ansible]# ansible web_group -m yum -a "name=tldr,net-tools state=present"
172.16.10.232 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "msg": "", 
    "rc": 0, 
    "results": [
        "tldr-1.2.0-4.el7.noarch providing tldr is already installed", 
        "net-tools-2.0-0.25.20131004git.el7.x86_64 providing net-tools is already installed"
    ]
}
172.16.11.209 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "msg": "", 
    "rc": 0, 
    "results": [
        "tldr-1.2.0-4.el7.noarch providing tldr is already installed", 
        "net-tools-2.0-0.25.20131004git.el7.x86_64 providing net-tools is already installed"
    ]
}
```



---



### 5.6 copy 模块：推送文件

- [x] copy 模块：推送文件

推送文件模块

`src`= 源文件路径

`dest`= 目标文件路径

`content`= 指定文件内容，只有目标文件；如果文件不存在会创建

`owner`=  指定属主

`group`=  指定属组

`mode`=   指定权限

copy 模块的更多使用可使用`ansible-doc copy`查看。

```bash
ansible 主机组名称 -m copy -a "src=文件路径及文件 dest=目录文件路径"
```

```bash
[root@localhost ansible]# vim /etc/ansible/hosts 
#配置要复制的地址
[web_group]
172.16.11.209
172.16.10.232

[web_group:vars]
ansible_ssh_pass='123123'

#执行：
[root@localhost ansible]# ansible web_group -m copy -a "src=/root/tongji.sh dest=/home/test/"
172.16.10.232 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "checksum": "4eff49d9f511f76b733cf739e820f8b7d17ff3f3", 
    "dest": "/home/test/tongji.sh", 
    "gid": 0, 
    "group": "root", 
    "mode": "0644", 
    "owner": "root", 
    "path": "/home/test/tongji.sh", 
    "size": 10156, 
    "state": "file", 
    "uid": 0
}
172.16.11.209 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "checksum": "4eff49d9f511f76b733cf739e820f8b7d17ff3f3", 
    "dest": "/home/test/tongji.sh", 
    "gid": 0, 
    "group": "root", 
    "mode": "0644", 
    "owner": "root", 
    "path": "/home/test/tongji.sh", 
    "size": 10156, 
    "state": "file", 
    "uid": 0
}
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/416afb174f78414d8773763fd6917af3.png)



这时候就可以看到两台服务器上都有这个文件了，如果想要先备份在复制，后面会讲到实战；



---



### 5.7 file 模块：对文件操作



- [x] file 模块：对文件操作

对文件操作，创建文件或目录、删除文件或目录、修改文件权限

`path`  指定路径 

`src`  源文件路径

`recurse`  递归授权

`owner`  指定属主

`group`  指定属组

`mode`   指定权限

`state` 	指定文件的状态

&emsp;&emsp;`directory` &emsp;&emsp;在远端创建目录

&emsp;&emsp;`touch`&emsp;&emsp;在远端创建文件

&emsp;&emsp;`link`&emsp;&emsp;创建软连接

&emsp;&emsp;`hard`&emsp;&emsp;创建硬连接

&emsp;&emsp;`absent`&emsp;&emsp;表示删除文件或目录

```bash
ansible 主机组名称 -m file -a "操作内容"
```

```bash
[root@localhost ansible]# vim /etc/ansible/hosts 
#配置要执行的地址
[web_group]
172.16.11.209
172.16.10.232

[web_group:vars]
ansible_ssh_pass='123123'

#执行：
# 创建一个目录
ansible web_group -m file -a "path=/home/cs state=directory"

# 创建一个文件
ansible web_group -m file -a "path=/home/cs/cs.sh state=touch"

# 将/home/test/tongji.sh软连接到/home/cs/下
ansible web_group -m file -a "src=/home/test/tongji.sh path=/home/cs/tongji_link.sh state=link"

# 创建一个文件并给予root用户和执行权限
ansible web_group -m file -a "path=/home/cs/lv.sh state=touch mode=777 owner=root group=root"
```



---

### 5.8 service 模块：控制启动关闭服务

- [x] service 模块：控制启动关闭服务

`name `   定义要启动服务的名称

`state`     指定服务状态

&emsp;&emsp;`started`&emsp;启动服务（幂等）

 &emsp;&emsp;`stopped`&emsp;停止服务（幂等）

&emsp;&emsp;`restarted`&emsp;重启服务

&emsp;&emsp;`reloaded`&emsp;重载服务

`enabled`    开机自启

```bash
ansible 主机组名称 -m service -a "name=服务名称 state=服务操作 enabled=是否设置开机自启"
```

```bash
[root@localhost ansible]# vim /etc/ansible/hosts 
#配置要执行的地址
[web_group]
172.16.11.209
172.16.10.232

[web_group:vars]
ansible_ssh_pass='123123'

#执行：
# 可以先安装一个httpd服务来测试
ansible web_group -m yum -a "name=httpd state=present"

# 启动httpd服务
ansible web_group -m service -a "name=httpd state=started"

# 关闭httpd服务
ansible web_group -m service -a "name=httpd state=stopped"

# 重启httpd服务状态
ansible web_group -m service -a "name=httpd state=restarted"

# 设置httpd服务开机自启
ansible web_group -m service -a "name=httpd state=enabled"

# 重启httpd服务并设置开机自启
ansible web_group -m service -a "name=httpd state=restarted enabled=yes"
# 设置完可以使用命令查看是否设置了开机自启
systemctl is-enabled httpd
systemctl list-unit-files --type=service --state=enabled --no-pager | grep "enabled" | grep httpd
```



---

### 5.9 cron 模块：定时任务

- [x] cron 模块：定时任务

`name` 注释说明

`minute、hour、day、month、weekday`（分、时、日、月、周）

`user`  指定用户

`job`   操作的指令  

`state  `

&emsp;&emsp;`present`  创建  

&emsp;&emsp;`absent`  删除 

```bash
ansible 主机组名称 -m cron -a "操作内容"
```

```bash
[root@localhost ansible]# vim /etc/ansible/hosts 
#配置要设置的地址
[web_group]
172.16.11.209
172.16.10.232

[web_group:vars]
ansible_ssh_pass='123123'

#执行：
# 直接写一个定时任务(不写执行时间，默认就是每分钟一次；不写name默认为None);不建议使用。
ansible web_group -m cron -a "job='/bin/sh /home/cs/tongji_link.sh'"

# 查看设置的定时任务
crontab -l

# 设置定时执行统计脚本（每一个小时执行一次，使用root用户）
ansible web_group -m cron -a "name="每小时执行一次统计脚本" minute=0 hour=*/1 day=* month=* weekday=* user=root job='/bin/sh /home/cs/tongji_link.sh' state=present"

# 删除指定的定时任务
ansible web_group -m cron -a "name="每小时执行一次统计脚本" minute=0 hour=*/1 day=* month=* weekday=* user=root job='/bin/sh /home/cs/tongji_link.sh' state=absent"
```



---

### 5.10 mount 模块：用于管理设备挂载与卸载

- [x] mount 模块：用于管理设备挂载与卸载

> mount操作需要谨慎，一不小心会导致服务器不可使用。

`src `：指定挂载源

`path`：指定挂载点 (挂载点不存在会自动创建)

`fstype`：指定文件系统类型

`opts`：挂载参数，默认不写为：defaults

`dump`：是否备份：0表示不进行备份

`passno`：文件系统检测：0表示不进行文件系统检测

`state`  

&emsp;&emsp;`present`&emsp;&emsp;写入fstab，但实际没有挂载，需要重启服务器

&emsp;&emsp;`absent`&emsp;&emsp;取消临时挂载，并且删除fstab

&emsp;&emsp;`mounted`&emsp;&emsp;写入fstab，并且直接挂载了（常用）

&emsp;&emsp;`unmounted`&emsp;&emsp;临时取消挂载，但是没有删除fstab，重启服务器之后就会恢复（常用）

```bash
ansible 主机组名称 -m mount -a "操作内容"
```

```bash
[root@localhost ansible]# vim /etc/ansible/hosts 
#配置要挂载的地址
[web]
172.16.11.209

[web:vars]
ansible_ssh_pass='123123'

#执行：
# 临时取消挂载在data的/dev/sdb（常用）
ansible web -m mount -a "src=/dev/sdb path=/data/ state=unmounted"

# 取消挂载在data的/dev/sdb，并且直接删除fstab中的单独配置（暂时没有成功，我也不知道为什么）
ansible web -m mount -a "src=/dev/sdb path=/data/ state=absent"

# 添加一个挂载写入fstab，但实际没有挂载，需要重启服务器，重启完就会自动挂载上
ansible web -m mount -a "src=/dev/sdb path=/data fstype=xfs opts=defaults dump=0 passno=0 state=present"

# 添加一个挂载写入fstab，并且直接挂载上（常用）
ansible web -m mount -a "src=/dev/sdb path=/data fstype=xfs opts=defaults dump=0 passno=0 state=mounted"
```



---

### 5.11 user/group 模块：用于管理的用户创建与删除

- [x] user/group 模块：用于管理的用户创建与删除

> user用于管理用户的创建与删除，相当于useradd,userdel,usermod;
>
> group模块用于管理用户组的，相当于groupadd,groupdel等。 

`name`（必需）：指定用户的用户名。

`state`：指定用户账户的状态。可以是以下之一：

&emsp;&emsp;`present`：创建用户（默认值）。

&emsp;&emsp;`absent`：删除用户。

&emsp;&emsp;`locked`：锁定用户账户。

&emsp;&emsp;`unlocked`：解锁用户账户。

&emsp;&emsp;`password`：仅更改用户的密码。

`uid`：指定用户的用户ID（UID）

`gid`： 指定用户的用户ID（GID）

`group`：指定用户的初始主组。

`groups`：指定用户所属的其他组。

`home`：指定用户的家目录路径。

`shell`：指定用户的登录 shell。

`password`：指定用户的密码（已加密的密码）。

`append`：如果为 `yes`，则添加用户到组而不是替换（默认为 `no`）。

`remove`：如果为 `yes`，则删除用户的家目录和邮箱文件（默认为 `no`）。

`move_home`：如果为 `yes`，则在更改用户的主目录时移动用户的文件（默认为 `no`）。

`create_home`：如果为 `yes`，则创建用户的主目录（默认为 `yes`）。

`update_password`：如果为 `always`，则始终更新密码（默认为 `on_create`）。

```bash
ansible 主机组名称 -m user -a "操作内容"
ansible 主机组名称 -m group -a "操作内容"
```

```bash
[root@localhost ansible]# vim /etc/ansible/hosts 
#配置要管理的地址
[web]
172.16.11.209

[web:vars]
ansible_ssh_pass='123123'

#执行：
# 创建用户，使用 user 模块创建一个名为 johndoe 的新用户：
ansible web -m user -a "name=johndoe state=present"
# 查看
tail -1 /etc/passwd

# 删除用户，使用 user 模块删除一个名为 johndoe 的用户：
ansible web -m user -a "name=johndoe state=absent"
# 删除用户和home家目录，使用 user 模块删除一个名为 johndoe 的用户：（常用）
ansible web -m user -a "name=johndoe remove=yes state=absent"
# 查看
tail -1 /etc/passwd

# 创建组，使用 group 模块创建一个名为 mygroup 的新组：
ansible web -m group -a "name=mygroup state=present"
# 查看
tail -1 /etc/group

# 删除组，使用 group 模块删除一个名为 mygroup 的组：
ansible web -m group -a "name=mygroup state=absent"
# 查看
tail -1 /etc/group

# 在将上面的用户和用户组在创建一遍；
ansible web -m user -a "name=johndoe state=present"
ansible web -m group -a "name=mygroup state=present"
# 添加用户到组，使用 user 模块将用户 johndoe 添加到组 mygroup：
ansible web -m user -a "name=johndoe group=mygroup append=yes"
# 查看
tail -1 /etc/passwd

# 从组中移除用户，使用 user 模块从组 mygroup 中移除用户 johndoe：
ansible web -m user -a "name=johndoe groups=mygroup append=no"
```



这里就不写加创建密码的了，因为创建密码必须要`哈希密码`；我这边用了转换成哈希的密码还是不行，不知道为啥；

这里写了一个转为`哈希密码`的py脚本，需要在`PyCharm`中运行，交互式的；

```python
import bcrypt

# 加密密码
passwd = input("请输入要加密的密码：")
password = passwd.encode('utf-8')
salt = bcrypt.gensalt()
hashed_password = bcrypt.hashpw(password, salt)

# 输出哈希密码
print("转换后的哈希密码：", hashed_password.decode('utf-8'))

# 验证密码
password_to_check = passwd.encode('utf-8')
if bcrypt.checkpw(password_to_check, hashed_password):
    print("密码验证成功！")
else:
    print("密码验证失败！")
```



这里还是建议如果需要加密码或者修改密码使用command、shell、raw方式去执行 `passwd 用户名 `修改；



---

### 5.12 unarchive 模块：解压缩模块

- [x] unarchive 解压缩模块

解压缩模块，这个模块有两种用法：

> * 1、将ansible主机上的压缩包在本地解压缩后传到远程主机上，这种情况下，copy=yes.本地解压缩,解压缩位置不是默认的目录,没找到或传完删了后传到远程主机
>
> * 2、将远程主机上的某个压缩包解压缩到指定路径下。这种情况下，需要设置copy=no远程主机上面的操作,不涉及ansible服务端



<font color=red>tar、.tar.gz、.tar.bz2、.zip等都支持</font>



`copy`  默认为`no`，当copy=yes，那么拷贝的文件是从ansible主机复制到远程主机上而不是在原地解压缩，如果设置为copy=no，那么会在远程主机上寻找src源文件;

`src`   源路径，可以是ansible主机上的路径，也可以是远程主机上的路径，如果是远程主机上的路径，则需要设置copy=no

`dest`  指定了解压缩后文件的目标目录

`mode`  设置解压缩后的文件权限，可以使用数字或符号模式，例如 `"0644"` 或 `"u=rw,go=r"`。

`list_files`	 默认值为no,如果设置为yes，解压同时，返回压缩包的文件列表

`remote_src`：如果设置为 `yes`，则表示 `src` 参数是远程主机上的路径。

`extra_opts`: 允许您指定解压缩命令的额外选项。这对于一些特定格式的存档文件非常有用。

`creates`: 如果指定了此选项，只有在 `creates` 中指定的文件或目录不存在时，才会执行解压缩操作。

`owner`: 设置解压缩后文件的所有者。

`group`: 设置解压缩后文件的所属组。

```bash
ansible 主机组名称 -m unarchive -a "src=源路径 dest=目标路径 其他参数"
```

```bash
[root@localhost ansible]# vim /etc/ansible/hosts 
#配置要解压的地址
[web]
172.16.11.209

[web:vars]
ansible_ssh_pass='123123'

#执行：
# 将jdk-8u221-linux-x64.tar.gz复制到/home/cs/下并解压
[root@localhost ~]# ansible web -m unarchive -a "src=/home/test/jdk-8u221-linux-x64.tar.gz dest=/home/cs/"
172.16.11.209 | CHANGED => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": true, 
    "dest": "/home/cs/", 
    "extract_results": {
        "cmd": [
            "/usr/bin/gtar", 
            "--extract", 
            "-C", 
            "/home/cs/", 
            "-z", 
            "-f", 
            "/root/.ansible/tmp/ansible-tmp-1697035885.77-18118-31918487585626/source"
        ], 
        "err": "", 
        "out": "", 
        "rc": 0
    }, 
    "gid": 0, 
    "group": "root", 
    "handler": "TgzArchive", 
    "mode": "0755", 
    "owner": "root", 
    "size": 26, 
    "src": "/root/.ansible/tmp/ansible-tmp-1697035885.77-18118-31918487585626/source", 
    "state": "directory", 
    "uid": 0
}
```



---



### 5.13 get_url 模块：下载文件

* [x] get_url 模块：下载文件

- `url` (必需): 指定要下载文件的URL。这是一个必需参数。
- `dest` (必需): 指定文件将保存到本地目标主机上的目标路径。这是一个必需参数。
- `force` (可选): 如果设置为 `yes`，将强制下载文件，即使文件已经存在。默认为 `no`。
- `checksum` (可选): 提供要下载文件的校验和，以确保文件完整性。
- `backup` (可选): 如果设置为 `yes`，将在下载之前备份现有文件。默认为 `no`。
- `timeout` (可选): 设置下载文件的超时时间（秒）。
- `url_username` (可选): 如果目标URL需要身份验证，可以提供用户名。
- `url_password` (可选): 如果目标URL需要身份验证，可以提供密码。
- `owner` (可选): 设置下载后文件的所有者。
- `group` (可选): 设置下载后文件的所属组。
- `mode` (可选): 设置下载后文件的权限模式。

```bash
ansible 主机组名称 -m get_url -a "url=远程下载的url dest=目标路径 其他参数"
ansible web -m get_url -a "url=https://example.com/file.txt dest=/path/to/local/file.txt"
```

```bash
[root@localhost ansible]# vim /etc/ansible/hosts 
#配置要下载到的地址
[web]
172.16.11.209

[web:vars]
ansible_ssh_pass='123123'

#执行：
[root@localhost ~]# ansible web -m get_url -a "url=https://liucy.blog.csdn.net/article/details/133460612?spm=1001.2014.3001.5502 dest=/home/cs/csdn.txt"
172.16.11.209 | CHANGED => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": true, 
    "checksum_dest": null, 
    "checksum_src": "263c306aaaa75ea1890f33fb846e17c47bac1a7c", 
    "dest": "/home/cs/csdn.txt", 
    "elapsed": 0, 
    "gid": 0, 
    "group": "root", 
    "md5sum": "6337bd5bd661d45598c6402652c59e03", 
    "mode": "0644", 
    "msg": "OK (unknown bytes)", 
    "owner": "root", 
    "size": 244776, 
    "src": "/root/.ansible/tmp/ansible-tmp-1697037340.77-18641-38036675583497/tmp0nw1sp", 
    "state": "file", 
    "status_code": 200, 
    "uid": 0, 
    "url": "https://liucy.blog.csdn.net/article/details/133460612?spm=1001.2014.3001.5502"
}
```



---



### 5.14 setup 模块：获取主机信息

* [x] setup 模块：获取主机信息

`setup` 模块不仅是一个常见的模块，而且是一个特殊的模块。它用于获取目标主机的系统信息和事实（facts），并将这些信息返回到 Ansible Playbook 中，以供后续任务使用。`setup` 模块通常不需要额外的参数，因为它会自动获取系统信息。

```bash
ansible web -m setup
```
获取的信息较长，可以使用重定向到一个空文件中。

* 常用的几个参数：
```bash
ansible_all_ipv4_addresses # ipv4的所有地址
ansible_all_ipv6_addresses # ipv6的所有地址
ansible_date_time # 获取到控制节点时间
ansible_default_ipv4 # 默认的ipv4地址
ansible_distribution # 系统
ansible_distribution_major_version # 系统的大版本
ansible_distribution_version # 系统的版本号
ansible_domain #系统所在的域
ansible_env #系统的环境变量
ansible_hostname #系统的主机名
ansible_fqdn #系统的全名
ansible_machine #系统的架构
ansible_memory_mb #系统的内存信息
ansible_os_family # 系统的家族
ansible_pkg_mgr # 系统的包管理工具
ansible_processor_cores #系统的cpu的核数(每颗)
ansible_processor_count #系统cpu的颗数
ansible_processor_vcpus #系统cpu的总个数=cpu的颗数*CPU的核数
ansible_python # 系统上的python
```







至此，Ansible的ad-hoc模式就讲解完了，下面讲解的是playbook模式，因为playbook模式要使用yaml格式的语法，所以可以先去了解一下yaml语法；推荐：[yaml文件格式详解及实例](https://liucy.blog.csdn.net/article/details/129041706)



## 6、相关文章

|                           文章标题                           |                           文章链接                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| [Ansible自动化运维（一）简介及部署、清单](https://liucy.blog.csdn.net/article/details/133769300) | [https://liucy.blog.csdn.net/article/details/133769300](https://liucy.blog.csdn.net/article/details/133769300) |
| [Ansible自动化运维（二）ad-hoc 模式详解](https://liucy.blog.csdn.net/article/details/133772023) | [https://liucy.blog.csdn.net/article/details/133772023](https://liucy.blog.csdn.net/article/details/133772023) |
| [Ansible自动化运维（三）Playbook 模式详解](https://liucy.blog.csdn.net/article/details/133899966) | [https://liucy.blog.csdn.net/article/details/133899966](https://liucy.blog.csdn.net/article/details/133899966) |
| [Ansible自动化运维（四）jinja2 模板、Roles角色详解](https://liucy.blog.csdn.net/article/details/133994509) | [https://liucy.blog.csdn.net/article/details/133994509](https://liucy.blog.csdn.net/article/details/133994509) |


