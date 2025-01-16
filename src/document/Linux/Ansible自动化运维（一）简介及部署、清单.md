---
title: Ansible自动化运维（一）简介及部署、清单
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



## 一、自动化运维

### 1.1 什么是自动化运维

&emsp;&emsp;自动化运维是指将日常运维的、大量的重复性工作自动化，把手工执行的工作，通过梳理分析，进行逻辑分解，借助平台或工具转为自动化操作。自动化是IT运维工作的升华，IT运维自动化不单纯是一个维护过程，更是一个管理的提升过程，是运维的更高层次，也是未来的发展趋势。

### 1.2 运维自动化解决的问题

* [x] 项目整体工作效率提升；

* [x] 减少人为误操作；
* [x] 方便信息传递，配置类信息聚合，信息链更完整；
* [x] 事务留痕，方便跟踪，追述；
* [x] 运维工作更加轻松、灵动；
* [x] 提升运维工作价值，管理更多资源，更多服务对象；

### 1.3 自动化运维分类工具

* 系统安装：<font color=red>PXE，Cobbler</font>

* 应用程序配置：<font color=red>Puppet，Ansible，Saltstack</font>

* 命令执行与控制：<font color=red>Fabric，Func，Ansible</font>

* 程序发布：<font color=red>git/svn(版本管理)，Jenkins/Gitlab-runner(持续集成)	</font>

### 1.4 自动化运维工具对比

此处只对比Puppet，Ansible，Saltstack

|                  | Puppet                                               | Saltstack                                | Ansible                                        |
| ---------------- | ---------------------------------------------------- | ---------------------------------------- | ---------------------------------------------- |
| 开发语言         | Ruby语言                                             | Python语言                               | Python语言                                     |
| 是否支持客户端   | 有                                                   | 有（salt-ssh无客户端）                   | 无                                             |
| 是否支持二次开发 | 不支持                                               | 支持                                     | 支持                                           |
| 通信加密         | 标准的SSL加密                                        | AES加密                                  | OpenSSH                                        |
| 平台支持         | AIX , BSD, HP-UX, Linux , Mac OSX , Solaris, Windows | BSD, Linux , Mac OS X , Solaris, Windows | AIX , BSD , HP-UX , Linux , Mac OS X , Solaris |
| 是否提供web UI   | 是                                                   | 是                                       | 商用提供                                       |
| 配置文件语法     | Ruby语法格式                                         | YAML                                     | YAML                                           |
| 命令行执行       | 不支持（配置实现）                                   | 支持                                     | 支持                                           |



## 二、Ansible

### 2.1 Ansible简介

&emsp;&emsp;Ansible是一款使用Python开发，模块化，依赖于ssh协议实现的自动化统一配置管理工具，自动化主要体现在Ansible集成了丰富模块以及功能组件，可以通过一个命令完成一系列的操作，进而能减少重复性的工作和维护成本，可以提高工作效率。

> 官网地址：[www.ansible.com](www.ansible.com)



### 2.2 Ansible的优势

- [x] 安装部署简单(主控端安装ansible，不需要额外安装客户端) 
- [x] 基于ssh现有协议实现的 (1.3以上)
- [x] Ansible没有守护进程，不需要启动
- [x] 日志集中在主控端，方便错误排查
- [x] 简单易用，不需要有编程基础
- [x] 通过模块实现，功能强大



### 2.3 Ansible的架构

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/29d2cf993fb4438ab17883f77714b350.png)



1、主机清单Inventory定义Ansible需要操作主机的范围

2、剧本Playbook Ansible的配置文件,将多个任务定义在剧本中，由ansible自动执行

3、核心模块Core Modules连接主机实现操作， 它依赖于具体的模块来做具体的事情

4、自定义模块Custom Modules根据自己的需求编写具体的模块

5、连接插件Connection Plugins用于连接主机 用来连接被管理端

6、插件Plugins完成模块功能的补充

<font color=red>最重要的一点是：Ansible是模块化的，它所有的操作都依赖于模块。</font>

### 2.4 Ansible模式

Ansible中有两种模式：分别是ad-hoc模式和playbook模式；

* ad-hoc：简而言之，就是“临时命令”，不会保存；

* playbook：翻译过来就是剧本，在文件中保存执行的流程；



Ansible与SaltStack对比:



> 相同点:
>
> 1.都是使用python语言开发的 
>
> 2.都具有二次开发的特性
>
> 3.执行命令都支持Ad-hoc模式  (临时命令，执行完就返回)
>
> 4.都可以通过YAML格式文件批量执行
>
> 5.返回的结果都是JSON数据，便于后续处理<br>
>
>  不同点:
>
> 1.Ansible部署更简单，没有客户端，而Saltstack有客户端；
>
> 2.Saltstack的响应速度要比Ansible更快；Ansible通过SSH协议实现，Saltstack使用了ZeroMQ实现通信;
>
> 3.Ansible更加安全，SSH加密传输
>
> 4.Saltstack对于Windows支持更友好，Ansible通过Power Shell来管理Windows 
>
> 5.Ansible维护简单，没有客户端，没有守护进程；saltstack需要有Master和minion,主机要启动一个守护进程。



### 2.5 Ansible部署

Ansible部署时直接使用阿里云的基础源与epel扩展源可以直接安装；

```bash
# 先拉取epel扩展源
wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo

# 更新yum源
yum makecache fast


# 安装Ansible
yum -y install ansible

# 查看Ansible版本
[root@localhost ~]# ansible --version

ansible 2.9.27
  config file = /etc/ansible/ansible.cfg
  configured module search path = [u'/root/.ansible/plugins/modules', u'/usr/share/ansible/plugins/modules']
  ansible python module location = /usr/lib/python2.7/site-packages/ansible
  executable location = /usr/bin/ansible
  python version = 2.7.5 (default, Aug  7 2019, 00:51:29) [GCC 4.8.5 20150623 (Red Hat 4.8.5-39)]
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c9e85ea6314c403ea2baa387df8df410.png)



#### 2.5.1 Ansible参数

* 常用参数

```bash
-m          #指定使用的模块名称，不指定默认使用command模块
-a          #使用的模块参数，模块的具体动作；指定要执行的具体命令
--syntax-check      #验证语法
```

* 不常用参数

```bash
#不常用参数
--version   #ansible版本信息
-v          #显示详细信息
-i          #主机清单文件路径，默认是在/etc/ansible/hosts
-k          #提示输入ssh密码，而不使用基于ssh的密钥认证
-C          #模拟执行测试，但不会真的执行
-T          #执行命令的超时
-f  		#一次返回几个结果
```

* ansible帮助命令

```bash
ansible-doc 		#帮助命令 
ansible-doc -l   	#列出所以的模块
ansible-doc 模块名   #查看模块的详细信息
ansible-doc 模块名 -s  #查看模块的选项使用说明
```



#### 2.5.2 Ansible主机清单

主机资产清单，用于定义被管理主机的认证信息， 例如ssh登录用户名、密码以及key相关信息。

```bash
# 查看ansible配置文件路径
[root@localhost ~]# rpm -qc ansible
/etc/ansible/ansible.cfg
/etc/ansible/hosts
```



> 主机清单位置：<font color=red>默认是/etc/ansible/hosts</font>
>
> ansible -i 指定主机清单 
>
> 在ansible配置文件ansible.cfg中指定默认的主机清单文件，文件路径：<font color=red>/etc/ansible/ansible.cfg</font>



* ansible.cfg常用配置解析

```bash
[defaults]
#inventory      = /etc/ansible/hosts      #主机列表配置文件
#library        = /usr/share/my_modules/  #库文件存放目录
#remote_tmp     = ~/.ansible/tmp          #临时py文件存放在远程主机目录
#local_tmp      = ~/.ansible/tmp          #本机的临时执行目录
#forks          = 5                       #默认并发数
#sudo_user      = root                    #默认sudo用户
#ask_sudo_pass = True                     #每次执行是否询问sudo的ssh密码
#ask_pass      = True                     #每次执行是否询问ssh密码
#remote_port    = 22                      #远程主机端口
host_key_checking = False                 #跳过检查主机指纹
log_path = /var/log/ansible.log           #ansible日志
 
#普通用户提权操作
[privilege_escalation]
#become=True
#become_method=sudo
#become_user=root
#become_ask_pass=False
```
如果不配置`host_key_checking ` 和 `log_path`，会导致报错；
不配置`host_key_checking `会导致，执行ansible命令的时候报错：
```bash
172.16.11.209 | FAILED | rc=-1 >>
Using a SSH password instead of a key is not possible because Host Key checking is enabled and sshpass does not support this.  Please add this host's fingerprint to your known_hosts file to manage this host.
```
配置 `log_path` 是为了更好的排查问题所在；


#### 2.5.3 主机清单配置规则

（在/etc/ansible/hosts中配置）

主机:

1.可以使用主机名(域名)或IP地址

2.支持主机名通配以及正则表达式

3.支持指定主机定义不同的变量，包括密码，端口号，用户等等





**1）单主机配置**

```bash
# 方式一： ip + 端口 + 用户名 + 用户密码
[root@localhost ansible]# vim /etc/ansible/hosts 
[web01]
172.16.11.209 ansible_ssh_port=22 ansible_ssh_user=root ansible_ssh_pass='123123'
[web02]
172.16.10.232 ansible_ssh_port=22 ansible_ssh_user=root ansible_ssh_pass='123123'

# 测试：ansible 主机名 -m 指定模块
[root@localhost ansible]# ansible web01 -m ping
172.16.11.209 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "ping": "pong"
}

[root@localhost ansible]# ansible web02 -m ping
172.16.10.232 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "ping": "pong"
}
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1a42e5136f524d2da8a96b6e934b568c.png)



如果遇到以下报错：



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/aa24a71963354fa0abcebea311afdf3a.png)



> 在ansible.cfg配置文件中开启这两个：（将注释注销了）
>
> host_key_checking = False                 #跳过检查主机指纹
> log_path = /var/log/ansible.log           #ansible日志



```bash
# 方式二： ip + 用户密码
[root@localhost ansible]# vim /etc/ansible/hosts 
[web01]
172.16.11.209 ansible_ssh_pass='123123'
[web02]
172.16.10.232 ansible_ssh_pass='123123'

# 测试：ansible 主机名 -m 指定模块
[root@localhost ansible]# ansible web01 -m ping
172.16.11.209 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "ping": "pong"
}
[root@localhost ansible]# ansible web02 -m ping
172.16.10.232 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "ping": "pong"
}

#没有定义用户时，默认使用当前登录用户；
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f99e4374685d49f8b8123821f9bd4667.png)





**2）多主机配置**

```bash
#IP+端口+密码
[root@localhost ansible]# vim /etc/ansible/hosts 
[web]
172.16.11.209 ansible_ssh_port=22 ansible_ssh_user=root ansible_ssh_pass='123123'
172.16.10.232 ansible_ssh_port=22 ansible_ssh_user=root ansible_ssh_pass='123123'

# 测试：ansible 主机名 -m 指定模块
[root@localhost ansible]# ansible web -m ping
172.16.10.232 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "ping": "pong"
}
172.16.11.209 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "ping": "pong"
}
```



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/913eb04c2155496897ecdc262ae34950.png)



主机组：

1.嵌套  [组名:children]

2.对组定义变量  [组名:vars]

```bash
#主机组变量+主机+密码
[root@localhost ansible]# vim /etc/ansible/hosts 
[web_group]
172.16.11.209
172.16.10.232

[web_group:vars]
ansible_ssh_pass='123123'


# 测试：ansible 主机名 -m 指定模块
[root@localhost ansible]# ansible web_group -m ping
172.16.10.232 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "ping": "pong"
}
172.16.11.209 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "ping": "pong"
}
```





```bash
#定义多组，多组嵌套

# webservers组包括两个子组[apache,nginx]
[root@localhost ansible]# vim /etc/ansible/hosts 
#定义总ip
[web_group]
172.16.11.209
172.16.10.232
172.16.10.129

#apache有两台
[apache]
172.16.11.209
172.16.10.232

#nginx有一台
[nginx]
172.16.10.129 ansible_ssh_pass='csnginx123'

#定义密码
[apache:vars]
ansible_ssh_pass='123123'

[web_group:children]
apache
nginx



# 测试：ansible 主机名 -m 指定模块
[root@localhost ansible]# ansible web_group -m ping
172.16.11.209 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "ping": "pong"
}
172.16.10.232 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "ping": "pong"
}
172.16.10.129 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "ping": "pong"
}

[root@localhost ansible]# ansible apache -m ping
172.16.11.209 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "ping": "pong"
}
172.16.10.232 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "ping": "pong"
}

[root@localhost ansible]# ansible nginx -m ping
172.16.10.129 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    }, 
    "changed": false, 
    "ping": "pong"
}
```



除了可以使用密码连接，也可以配置秘钥，实现免密登陆，此时主机配置文件中不需要指定密码

```bash
1.生成密钥对
[root@localhost ansible]# ssh-keygen
 
2.推送公钥
[root@localhost ansible]# ssh-copy-id 172.16.11.209
[root@localhost ansible]# ssh-copy-id 172.16.10.232
```

这时候配置hosts时就不需要指定密码了。


## 三、相关文章
|                           文章标题                           |                           文章链接                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| [Ansible自动化运维（一）简介及部署、清单](https://liucy.blog.csdn.net/article/details/133769300) | [https://liucy.blog.csdn.net/article/details/133769300](https://liucy.blog.csdn.net/article/details/133769300) |
| [Ansible自动化运维（二）ad-hoc 模式详解](https://liucy.blog.csdn.net/article/details/133772023) | [https://liucy.blog.csdn.net/article/details/133772023](https://liucy.blog.csdn.net/article/details/133772023) |
| [Ansible自动化运维（三）Playbook 模式详解](https://liucy.blog.csdn.net/article/details/133899966) | [https://liucy.blog.csdn.net/article/details/133899966](https://liucy.blog.csdn.net/article/details/133899966) |
| [Ansible自动化运维（四）jinja2 模板、Roles角色详解](https://liucy.blog.csdn.net/article/details/133994509) | [https://liucy.blog.csdn.net/article/details/133994509](https://liucy.blog.csdn.net/article/details/133994509) |


