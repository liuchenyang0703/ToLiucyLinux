---
title: Ansible自动化运维（三）Playbook 模式详解
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

---




## 一、Ansible 中的 Playbook 模式

&emsp;&emsp;Playbook不同于使用单个模块操作远程服务器，Playbook的功能更加强大。如果说单个模块执行类似于Linux系统中的命令，那么Playbook就类似于shell脚本，将多个模块组合起来实现一组的操作。



`Playbook`还是会用到`ad-hoc`模式中的模块及参数，只不过`Playbook与ad-hoc`的写法不一样。

### 1.1 Playbook 的优势

* [x] 功能比`ad-hoc`更全

- [x] 能很好的控制先后执行顺序, 以及依赖关系
- [x] 语法展现更加的直观
- [x] ad-hoc无法持久使用，playbook可以持久使用



### 1.2 Playbook 的组成

`play`：一个完整的部署任务，并且必须包含以下前两项:

&emsp;&emsp;`hosts`：定义对哪些主机进程操作 

&emsp;&emsp;`tasks`：定义的是具体执行的任务

&emsp;&emsp;`become`：表示是否要以特权用户（通常是root）身份执行任务。如果设置为`yes`，则任务会以特权身份执行。

`playbook`: 由一个或多个`play`组成，一个play可以包含多个`task`任务



<font color=red>说明：`Ansible` 中的 `Playbook` 文件结尾为`.yml` 格式</font>

示例httpd.yml：安装httpd；

```yaml
---
- name: apache
  hosts: web
  become: yes
  tasks:
    - name: Install httpd Server
      yum:
        name: httpd
        state: present
```

解析：

`name`：定义一个Playbook的名称，用于标识Playbook的用途；

`hosts`：指定要在哪个主机上执行，也是写主机或主机组名，需要提前在`/etc/ansible/hosts`中配置好；

`become`：yes表示使用特权用户；

`tasks`：属于是一个任务列表，主要写具体执行什么的（可以有多个）；

&emsp;&emsp;`name`：每个任务的名称，用于描述干什么的；上述yml中则是`安装httpd服务`；

&emsp;&emsp;`yum`：表示使用哪个模块来进行操作；`模块的参数可以看ad-hoc中的，用的都是一样的，写法不一样就是；`

&emsp;&emsp;&emsp;&emsp;`name`：要安装的服务名称，我们这里是httpd：

&emsp;&emsp;&emsp;&emsp;`state`：要进行的操作，可以是安装、卸载、更新；



其实`tasks`就是Ansible的模块以YAML语法写入到playbook中。

生产环境中为了可读性与可维护性通常一个playbook中只编写一个play，如果某些主机需要执行多个play,那么可以使用include关键字在一个playbook中导入其他的playbook。 



### 1.3 Playbook 命令

格式：

```bash
ansible-playbook [选项] playbook.yml 
```

常用选项：

| 选项/参数      | 选项/参数 解析                                 |
| -------------- | ---------------------------------------------- |
| -T             | 建立SSH连接的超时时间                          |
| -i             | 指定Inventory文件                              |
| -f             | 并发执行的进程数，默认为5                      |
| - -list-hosts   | 匹配的服务器列表                               |
| - -list-tasks   | 列出任务列表                                   |
| - -step         | 每执行一个任务后停止，等待用户确认             |
| - -syntax-check | 语法检测                                       |
| - -list-tags|列出此yml文件中的所有tag标签|
|- -skip-tags|执行–skip-tags之外的标签任务|
| -C             | 检查当前这个Playbook是否会修改受控端，模拟执行 |



### 1.4 Playbook 的语法

* 权限

`remote_user`指定`playbook`运行时的用户身份，可以写在hosts下，也可以每个tasks做定义； 

`become  `该选项为布尔值，当等于yes表示以管理员身份通常与`become_method`一起使用；

`become_method`：su或sudo 
```yaml
# 指定使用哪个用户执行此任务
remote_user: root

# 是否使用特权用户
become: yes
```

* 通知与触发

`notify` 如果指定的操作执行了，会触发`handlers`的操作，指定的是handler的名称；

`handlers`和`notify`指定的名称必须相同，否则无法触发。



`handlers` 中需要`- name`指定名称	，`handlers`只会在所有的`tasks`执行完后执行，并且，即便一个`handlers`被触发多次，也只会执行一次。 `handlers`是一种特殊的`tasks`。

* handlers（触发事件）
```bash
notify: 触发
handlers：触发的动作
# 两者的名称一定要相同，否则无法触发。
```
使用上场景：一般都是修改配置文件时

正常情况时handlers是不会执行的，除非触发任务，才会执行

```yaml
- hosts: web

  tasks:
  - name: installredis
    yum: name=redis
    
  - name: copyfile
    template: src=redis.conf dest=/etc/redis.conf
    tags: copyfile
    notify: restart		# 触发：触发名称
    
  - name: start
     service:
       name: redis
       state: started
       enabled: yes
    
  handlers:				# 触发动作
  - name: restart
     service:
       name: redis
       state: restarted
```

### 1.5 Playbook 中的变量

> &emsp;&emsp;变量提供了便捷的方式来管理`Ansible playbook`的每一个项目中的动态值，比如nginx-1.6.3这个软件包的版本，在其它地方或许会反复使用，那么如果将此值设置为变量，然后再在其他的playbook中调用，会方便许多。如此一来还方便维护，减少维护的成本。



* 变量的定义方式

1.通过`命令行`进行变量定义

2.在`play文件`中进行变量定义

3.通过`Inventory主机信息`文件中进行变量定义

<font color=red>变量读取的优先级为: `命令行 > playbook文件 > Inventory`文件</font>



* [x] 通过vars定义变量

```yaml
---
- name: LAMP
  hosts: web
  vars:
    packages_name:
      - httpd
      - mariadb-server
      - php
      - php-mysql

  tasks:
    - name: install LAMP
      yum:
         name: "{{packages_name}}"
         state: present
```

执行此yml：

```bash
# 语法校验
ansible-playbook --syntax-check LAMP.yml

# 执行yml
ansible-playbook LAMP.yml（定义的yml文件名）
```





* [x] 通过vars_files定义变量

当变量较少时，使用vars定义没有问题，当变量较多时，可以将变量保存到一个独立的文件中；

需要多个yml文件，一个主文件，需要调用其他yml独立文件，主要是最后运行的；其他是定义包名的yml文件。

```yaml
#定义阶段
# my_vars.yml
---
httpd_package: httpd
mariadb_package: mariadb-server


#调用阶段
# apache.yml
---
- name: apache
  hosts: web
  become: yes
  vars_files:
    - my_vars.yml  # 引入变量文件

  tasks:
    - name: Install httpd
      yum:
        name: "{{ httpd_package }}"
        state: present
      become: yes

    - name: Install mariadb-server
      yum:
        name: "{{ mariadb_package }}"
        state: present
      become: yes
```

执行此yml：

```bash
# 语法校验
ansible-playbook --syntax-check apache.yml

# 执行yml
ansible-playbook apache.yml（定义的yml文件名）
```

* [x] 官方推荐定义变量方法

之前的几种变量定义都不是很好用，比较好用的是在Ansible项目目录下创建两个变量目录：

host_vars

group_vars

目录名字一定要一致，不能做任何修改。



&emsp;&emsp;理解如何设置和使用`host_vars`和`group_vars`可以使你的Ansible管理更加灵活和有组织。以下是更详细的步骤，从设置目录结构到创建Playbook的执行：

1. **目录结构**：
   在你的Ansible项目目录下，确保设置以下目录结构：

   ```
   your_ansible_project/
   ├── group_vars/
   │   └── web-servers.yml
   ├── host_vars/
   │   └── web-server.yml
   ├── playbook.yml
   └── inventory.ini
   ```

   - `group_vars`目录用于存放组级别的变量定义。
   - `host_vars`目录用于存放主机级别的变量定义。
   - `playbook.yml`是你的Ansible Playbook。
   - `inventory.ini`是Ansible的主机清单文件，其中列出了你的主机和主机组。

2. **清单文件 (`inventory.ini`)**：
   确保在清单文件中定义了你的主机和主机组。例如：

   `vim /etc/ansible/inventory.ini`
   
   ```ini
[web-servers]
   172.16.11.209 ansible_ssh_port=22 ansible_ssh_user=root ansible_ssh_pass='123123'
   ```
   
3. **组级别变量 (`group_vars/web-servers.yml`)**：
   在`group_vars`目录下创建一个YAML文件，例如`web-servers.yml`，并在其中定义组级别的变量，如：

   `mkdir -p /etc/ansible/group_vars && vim /etc/ansible/group_vars/web-servers.yml`

   ```yaml
   # group_vars/web-servers.yml
   ---
   httpd_package: httpd
   mariadb_package: mariadb-server
   ```

4. **主机级别变量 (`host_vars/web-server.yml`)**：
   在`host_vars`目录下创建一个YAML文件，例如`web-server.yml`，并在其中定义主机级别的变量，如：

   `mkdir -p /etc/ansible/host_vars && vim /etc/ansible/host_vars/web-servers.yml`

   ```yaml
   # host_vars/web-server.yml
   ---
   http_port: 80
   ```

5. **Playbook (`playbook.yml`)**：
   创建你的Ansible Playbook，例如：

   `vim /etc/ansible/playbook.yml`

   ```yaml
   ---
   - name: Configure Web Server
     hosts: web-servers
     become: yes
   
     tasks:
       - name: Install HTTPd
         yum:
           name: "{{ httpd_package }}"
           state: present
   
       - name: Start HTTPd
         service:
           name: httpd
           state: started
   ```

6. **运行Playbook**：
   使用以下命令运行你的Playbook：

   ```bash
   ansible-playbook -i inventory.ini playbook.yml
   ```

此时，Ansible会自动加载`group_vars`和`host_vars`目录中的变量，你的Playbook将使用这些变量来配置主机。

通过这种方式，你可以更加有组织地管理变量，特别是对于多主机和多组的环境。你可以为不同的组或主机设置特定的变量，而不必在Playbook中硬编码这些值，提高了可维护性和可读性。



* [x] 命令行定义变量

ansible-playbook命令提供-e选项，用于在命令行定义变量，命令行定义变量的优先级最高。

```bash
[root@localhost yml]# cat /etc/ansible/hosts
[web]
172.16.11.209

[web:vars]
ansible_ssh_pass='123123'

# 执行：命令行定义变量
[root@localhost yml]# vim test.yml
---
- name: apache 
  hosts: web
  become: yes
  vars: 
    httpd_package:
       - httpd

  tasks:
    - name: install httpd service
      yum:
        name: "{{ httpd_package }}"
        state: present
#定义阶段
[root@ansible ~]# ansible-playbook test.yml -e "web_server=vsftpd"
```



### 1.6 变量注册

&emsp;&emsp;当anbsible的模块在运行之后，其实都会返回一些result结果，就像是执行脚本，我们有的时候需要脚本给我们一些return返回值，我们才知道，上一步是否可以执行成功，但是默认情况下，ansible的result并不会显示出来，所以，我们可以把这些返回值'存储'到变量中，这样我们就能通过'调用'对应的变量名，从而获取到这些result，这种将模块的返回值，写入到变量中的方法被称为变量注册。

```bash
[root@ansible ~]# vim register.yml
---
- hosts: web 
  tasks:
  
    - name: define a var1
      shell: "whoami"
      register: user_name

    - name: get msg 
      debug: 
        msg: "{{ user_name }}"

    - name: get stdout msg
      debug:
        msg: "{{ user_name.stdout_lines }}"
        
# 执行
[root@localhost yml]# ansible-playbook register.yml

PLAY [web] ****************************************************************************************************************************************************

TASK [Gathering Facts] ****************************************************************************************************************************************
ok: [172.16.11.209]

TASK [define a var1] ******************************************************************************************************************************************
changed: [172.16.11.209]

TASK [get msg] ************************************************************************************************************************************************
ok: [172.16.11.209] => {
    "msg": {
        "changed": true, 
        "cmd": "whoami", 
        "delta": "0:00:00.004924", 
        "end": "2023-10-12 23:21:29.231407", 
        "failed": false, 
        "rc": 0, 
        "start": "2023-10-12 23:21:29.226483", 
        "stderr": "", 
        "stderr_lines": [], 
        "stdout": "root", 
        "stdout_lines": [
            "root"
        ]
    }
}

TASK [get stdout msg] *****************************************************************************************************************************************
ok: [172.16.11.209] => {
    "msg": [
        "root"
    ]
}

PLAY RECAP ****************************************************************************************************************************************************
172.16.11.209              : ok=4    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   
```

说明:

`debug`：模块常用参数

`msg`：    #调试输出的消息

`var`:      #将某个任务执行的输出作为变量传递给debug模块，debug会直接将其打印输出

`verbosity`:    #debug的级别（默认是0级，全部显示）    



### 1.7 debug 模块：将上一步任务执行的结果打印出来

将上一步任务执行的结果打印出来，不管成功还是失败都会返回；

```yaml
---
- name: debug测试 
  hosts: all
  remote_user: root
  
  tasks:
   - name: 查看root目录下的文件
     command: ls /root
     register: root_directory_contents  # 存储命令输出

   - name: 输出的结果
     debug:
       var: root_directory_contents.stdout_lines
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/885e636225a249ddbfd6d95101b59752.png)



### 1.8 facts 缓存

&emsp;&emsp;Ansible facts是在被管理主机上通过Ansible自动采集发现的变量。facts包含每台特定的主机信息。比如：被控端的主机名、IP地址、系统版本、CPU数量、内存状态、磁盘状态等等。

* [x] facts变量的使用场景

1. 通过facts缓存检查CPU，来生成对应的nginx配置文件

2. 通过facts缓存检查主机名，生成不同的zabbix配置文件

3. 通过facts缓存检索物理机的内存大小来生成不同的mysql配置文件

可以使用setup模块查看facts变量列表:

```bash
[root@localhost yml]# ansible nginx -m setup 
172.16.11.209 | SUCCESS => {
    "ansible_facts": {
        "ansible_all_ipv4_addresses": [
            "172.17.0.1", 
            "172.16.11.209"
        ], 
        "ansible_all_ipv6_addresses": [
            "fe80::20c:29ff:feaf:dbfa"
        ], 
		   以下省略…
```

在playbook中引用facts变量：

```bash
[root@localhost ansible]# vim /etc/ansible/hosts 
[web]
172.16.11.209

[web:vars]
ansible_ssh_pass='123123'

# yml文件
[root@localhost yml]# cat facts.yml 
- hosts: web
  tasks:
    - shell: echo {{ ansible_os_family }}
      register: my_vars

    - debug: 
        var: my_vars.stdout_lines
        

# 执行
[root@localhost yml]# ansible-playbook facts.yml 

PLAY [web] ****************************************************************************************************************************************************

TASK [Gathering Facts] ****************************************************************************************************************************************
ok: [172.16.11.209]

TASK [shell] **************************************************************************************************************************************************
changed: [172.16.11.209]

TASK [debug] **************************************************************************************************************************************************
ok: [172.16.11.209] => {
    "my_vars.stdout_lines": [
        "RedHat"
    ]
}

PLAY RECAP ****************************************************************************************************************************************************
172.16.11.209              : ok=3    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   

#在playbook中，可以通过gather_facts选项控制是否收集远程主机，默认值为yes
```





## 二、Playbook 中的流程控制



### 2.1 条件

&emsp;&emsp;在所有的编程语言流程控制语句中，条件语句是必不可少的，在使用Ansible的过程中，条件判断的使用频率极其高。

例如：

* [x] 使用不同的系统的时候，可以通过判断系统来对软件包进行安装。

* [x] 在nfs和rsync安装过程中，客户端服务器不需要推送配置文件，之前我们都是写多个play，会影响效率。

* [x] 在源码安装nginx的时候，执行第二遍就无法执行了，此时我们就可以进行判断是否安装过。



<font color=red>playbook中的条件判断语句使用`when`</font>

```yaml
tasks:  #官方案例
  - name: "shut down Debian flavored systems"
    command: /sbin/shutdown -t now
    when: ansible_facts['os_family'] == "Debian"
    # note that all variables can be used directly in conditionals without double curly braces

- hosts: web_group
  tasks:
    - name: Install CentOS Httpd
      yum:
        name: httpd
        state: present
    #官方
      when: ansible_facts['os_family'] == "CentOS"
    #非官方
      when: ansible_distribution == "CentOS"

    - name: Install Ubuntu Httpd
      yum:
        name: apache2
        state: present
        when: ansible_facts['os_family'] == "Ubuntu"
```

还可以使用括号对条件进行分组

```yaml
tasks:
  - name: "shut down CentOS 6 and Debian 7 systems"
    command: /sbin/shutdown -t now
    when: (ansible_facts['distribution'] == "CentOS" and ansible_facts['distribution_major_version'] == "6") or
          (ansible_facts['distribution'] == "Debian" and ansible_facts['distribution_major_version'] == "7")
```

也可以指定多条件为列表

```bash
tasks:
  - name: "shut down CentOS 6 systems"
    command: /sbin/shutdown -t now
    when:
      - ansible_facts['distribution'] == "CentOS"
      - ansible_facts['distribution_major_version'] == "6"
```

条件运算

```bash
tasks:
  - shell: echo "only on Red Hat 6, derivatives, and later"
    when: ansible_facts['os_family'] == "RedHat" and ansible_facts['distribution_major_version ']|int >= 6
```



实例：

```yaml
[root@localhost yml]# vim when.yml
- hosts: web
  remote_user: root   #代表用root用户执行，默认是root，可以省略
  tasks:
  - name: createfile
    copy: content="test3" dest=/etc/ansible/yml/when.yml
    when: a=='3'
  - name: createfile
    copy: content="test4" dest=/etc/ansible/yml/when.yml
    when: a=='4'
```

> 如果a"3"，就将“test3”，写入到web组下被管控机的/etc/ansible/yml/when.yml中，
> 如果a"4"，就将“test4”，写入到web组下被管控机的/etc/ansible/yml/when.yml中。

执行：

```bash
# 语法校验
ansible-playbook  --syntax-check when.yml

#执行
ansible-playbook -e 'a="3"' when.yml
```



### 2.2 循环

* [x] 1、标准循环使用场景 - 批量安装软件

```yml
[root@localhost yml]# vim with_items.yml
---
- hosts: all
  remote_user: root
  tasks:
    - name: Installed packages
      yum: 
       name: "{{ item }}"
       state: present
      
      with_items:
       - wget
       - tree
       - lrzsz
```

执行：

```bash
# 语法校验
ansible-playbook --syntax-check with_items.yml

# 执行
ansible-playbook with_items.yml
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/9ebc2064addb4037b5e5b84db33b5d30.png)



* [x] 2、标准循环使用场景 - 批量创建用户

```yaml
[root@localhost yml]# vim item2.yml
---
- name: 批量创建用户
  hosts: all
  remote_user: root

  tasks:
    - name: 配置创建用户操作
      user:
        name: "{{ item }}"
        state: present

      with_items:
        - cs1
        - cs2
        - cs3
```

执行：

```bash
# 语法校验
ansible-playbook --syntax-check item2.yml

# 执行
ansible-playbook item2.yml
```

查看：

```bash
tail -3 /etc/passwd
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/bd06fcb21140445a8912e70c27d75d35.png)

* [x] 3、循环嵌套使用场景 - 批量创建用户并给用户添加用户组

```yaml
[root@localhost yml]# vim item3.yml
---
- name: 批量创建用户名及用户组
  hosts: all
  remote_user: root

  tasks: 
    - name: create group
      group: name={{ item }} state=present
      with_items:
      - group1
      - group2
      - group3

    - name: create user
      user: name={{ item.name }} group={{ item.groups }} state=present
      with_items:
      - {'name': cs1,'groups': group1}
      - {'name': cs2,'groups': group2}
      - {'name': cs3,'groups': group3}
```

执行：

```bash
# 语法校验
ansible-playbook --syntax-check item3.yml

# 执行
ansible-playbook item3.yml
```

* [x] 4、循环嵌套使用场景 - 批量删除用户及用户组

```yaml
[root@localhost yml]# vim item3_1.yml
---
- name: 批量删除用户及用户组
  hosts: all
  remote_user: root
  
  tasks: 
    - name: drop user
      user:
        name: "{{ item.name }}"
        group: "{{ item.group }}"
        remove: yes
        state: absent
      with_items:
      - {'name': cs1,'group': group1}
      - {'name': cs2,'group': group2}
      - {'name': cs3,'group': group3}

    - name: drop group
      group:
        name: "{{ item }}"
        state: absent
      with_items:
      - group1
      - group2
      - group3
```

执行：

```bash
# 语法校验
ansible-playbook --syntax-check item3_1.yml

# 执行
ansible-playbook item3_1.yml
```

* [x] 5、标准循环使用场景 - 批量拷贝多个文件

```yaml
[root@localhost yml]# vim item4.yml
- name: 批量拷贝文件
  hosts: all
  remote_user: root
  tasks:
    - name: bulk copy
      copy: src=/home/test/{{ item.src }} dest=/home/cs/{{ item.dest }} mode={{ item.mode }}
      with_items:
        - {src: "a.sh", dest: "a.sh", mode: "0777"}
        - {src: "tongji.sh", dest: "tongji.sh", mode: "0777"}
        
# -------------------------------此为分界线，上下互不相干---------------------------------    
        
- name: 批量拷贝文件到不同的路径
  hosts: all
  remote_user: root
  tasks:
    - name: bulk copy
      copy: src=/home/test/{{ item.src }} dest={{ item.dest }} mode={{ item.mode }}
      with_items:
        - {src: "a.sh", dest: "/home/cs/a.sh", mode: "0777"}
        - {src: "tongji.sh", dest: "/home/cs1/tongji.sh", mode: "0777"}
```

执行：

```bash
# 语法校验
ansible-playbook --syntax-check item4.yml

# 执行
ansible-playbook item4.yml
```



### 2.3 异常处理

默认Playbook会检查命令和模块的返回状态，如遇到错误就中断playbook的执行

加入参数: <font color=red>ignore_errors: yes</font> 	# 忽略错误

```yaml
[root@localhost yml]# cat expect.yml 
---
- name: 忽略错误演示
  hosts: all
  remote_user: root

  tasks: 
    - name: 使用一个未知的命令
      command: a
      ignore_errors: yes

    - name: 创建一个文件
      file: path=/home/cs/yichang state=touch
```

代码解析：

> 如上代码，执行到command的a命令时，服务器时没有这个命令的，就会报错，报错了之后，下面的服务就不会继续执行了；

> 我们现在添加了一个`ignore_errors: yes`，这样就可以跳过这个报错，继续执行下面的内容；



### 2.4 tags 标签

&emsp;&emsp;默认情况下，Ansible在执行一个playbook时，会执行playbook中定义的所有任务；Ansible playbook中的tag标签是一种用于选择性运行特定任务或任务集的机制。通过为每个任务指定标签，您可以在运行playbook时选择只运行带有特定标签的任务，而不运行其他任务。这对于控制和管理Ansible playbook的执行非常有用，特别是当您的playbook包含许多任务时。

* [x] 1、打标签的方式

对一个对象打一个标签

对一个对象打多个标签

对多个对象打一个标签

* [x] 2、标签使用，通过tags和任务对象进行捆绑，控制部分或者指定的task执行

`-t`：执行指定的tag标签任务

`--list-tags`：列出此yml文件中的所有tag标签

`--skip-tags`：执行--skip-tags之外的标签任务



* [x] 3、以下是tag标签的作用：

1. 选择性运行任务：可以使用`--tags`参数在运行ansible-playbook命令时指定一个或多个标签，只有带有指定标签的任务会运行。这对于在大型playbook中只运行特定任务非常有用，而不是运行整个playbook。

2. 排除任务：您可以使用`--skip-tags`参数来排除具有特定标签的任务，从而运行除带有指定标签的任务之外的所有其他任务。这对于在大型playbook中排除不需要运行的任务非常有用。
3. 组织任务：标签可以帮助您组织和分类任务。例如，您可以为配置任务添加一个`config`标签，为安装任务添加一个`install`标签，以便更容易了解每个任务的用途。
4. 文档和注释：标签还可以作为任务的文档和注释。您可以将标签用作描述任务的方式，以便其他人更容易理解每个任务的目的。

下面是一些示例，演示如何在运行ansible-playbook时使用标签：

- 仅运行带有`install`标签的任务：
  ```bash
  ansible-playbook your_playbook.yml --tags install
  ```

- 排除带有`test`标签的任务：
  ```bash
  ansible-playbook your_playbook.yml --skip-tags test
  ```

- 运行带有多个标签的任务：
  ```bash
  ansible-playbook your_playbook.yml --tags "install,config"
  ```

* 列出yml文件中所有的标签

  ```bash
  ansible-playbook your_playbook.yml --list-tags
  ```

  

标签功能有助于增加Ansible playbook的可维护性，使您能够更精细地控制任务的执行。



* [x] 4、【实例】部署apache服务并启动，中间可以自行设置tags标签。

```yaml
[root@localhost yml]# vim tags.yml
---
- name: 部署apache服务
  hosts: web
  remote_user: root
  vars:
    - http_port: 8080

  tasks:
    - name: Install Http Server
      yum:
        name: httpd
        state: present
      tags: 
        - install_httpd
        - httpd_server

    - name: configure httpd server
      copy:
        src: ./httpd.conf
        dest: /etc/httpd/conf/httpd.conf
        mode: 0777
      notify: Restart Httpd Server
      tags: 
        - config_httpd
        - httpd_server

    - name: start httpd server
      service:
        name: httpd
        state: started
        enabled: yes
      tags: start_httpd
   
    - name: stop httpd server
      service:
        name: httpd
        state: stopped
      tags: stop_httpd

    - name: uninstall httpd server
      yum:
        name: httpd
        state: absent
      tags: uninstall_httpd

  handlers:
    - name: Restart Httpd Server
      systemd:
        name: httpd
        state: restarted
```

这是一个Ansible playbook的YAML文件，用于部署Apache HTTP服务器。YAML文件解析：

1. `name: 部署apache服务`：这是整个Ansible playbook的名称或描述。
2. `hosts: web`：这指定了该playbook将在名为`web`的主机组上执行。您需要在您的Ansible inventory文件中定义主机组`web`，或者在命令行上指定主机。
3. `remote_user: root`：指定了运行任务时使用root用户身份执行。
4. `vars:`：这是一个变量部分，用于定义变量。在这里，定义了一个名为`http_port`的变量，其值为8080。
5. `tasks:`：这是实际任务部分，其中包含一系列任务，每个任务都有一个名称和相应的操作。以下是每个任务的解释：
   - 第一个任务：`Install Http Server`：这个任务使用`yum`模块来安装`httpd`软件包，确保Apache HTTP服务器已经安装在主机上。此任务有两个tags：`install_httpd`和`httpd_server`，以便后续可以选择性地运行这些任务。
   - 第二个任务：`configure httpd server`：这个任务使用`copy`模块将本地文件`httpd.conf`复制到目标主机的`/etc/httpd/conf/httpd.conf`位置，并给目标文件设置执行权限，从而配置Apache HTTP服务器。此任务有两个tags：`config_httpd`和`httpd_server`。（为什么要多余移动这个呢，因为这个配置里我们自己写的，同时也修改了httpd的端口为：8080）。`notify: Restart Httpd Server`意味着当该任务的状态发生变化时（通常是成功完成任务），它将触发名为 "Restart Httpd Server" 的处理程序`handlers`。
   - 第三个任务：`start httpd server`：这个任务使用`service`模块来启动并启用Apache HTTP服务器。此任务有一个tag：`start_httpd`。
   - 第四个任务：`stop httpd server`：停止HTTP服务器。它使用 `service` 模块将 `httpd` 服务停止。此任务有一个标签 `stop_httpd`。
   - 第五个任务：`uninstall httpd server`：卸载HTTP服务器。它使用 `yum` 模块卸载 `httpd` 软件包。此任务有一个标签 `uninstall_httpd`。
6. `handlers:`：这部分定义了处理程序，这是一些在任务中使用的命名动作，通常与通知一起使用。在这里，定义了一个名为`Restart Httpd Server`的处理程序，当`copy`任务完成后，可以通知它。此处理程序使用`systemd`模块来重新启动`httpd`服务。

这个Playbook允许您执行与Apache HTTP服务器有关的各种操作，如安装、配置、启动、停止和卸载。使用不同的标签可以选择性地运行特定任务或任务组。



---



执行：

```bash
# 查看此yml文件中的所有tags标签
[root@localhost http]# ansible-playbook tags.yml --list-tags

playbook: tags.yml

  play #1 (web): 部署apache服务	TAGS: []
      TASK TAGS: [config_httpd, httpd_server, install_httpd, start_httpd, stop_httpd, uninstall_httpd]


# 执行 install_httpd,config_httpd（安装、移动配置文件）标签；执行移动配置文件会触发处理程序，所以会自动启动服务；
[root@localhost http]# ansible-playbook tags.yml -t install_httpd,config_httpd



# 执行 uninstall_httpd（卸载httpd服务） 标签
[root@localhost http]# ansible-playbook tags.yml -t uninstall_httpd


# 执行 httpd_server 标签
[root@localhost http]# ansible-playbook tags.yml -t httpd_server
# httpd_server标签包含（Install Http Server、configure httpd server、Restart Httpd Server）
# 所以会直接执行这三个任务，也就是安装、移动配置文件(因为使用移动文件触发了处理程序notify，所以就会执行Restart Httpd Server重启服务）
# 总结就是：执行httpd_server标签，会安装服务并启动服务。


# 跳过 httpd_server,start_httpd（安装加启动，启动）标签
[root@localhost http]# ansible-playbook tags.yml --skip-tags httpd_server,start_httpd

# 执行结果为，关闭httpd服务并卸载httpd服务；因为已经跳过 httpd_server ，所以不会执行安装和启动；
```



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/95046449a23d4d99b7936dca174c5b7c.png)
## 三、Playbook 中常用的模块使用
* 批量备份文件

```yaml
    - name: backup file
      shell: mv {{ item }} {{ item }}-$(date +"%Y-%m-%d")
      with_items:
        - /home/cs/a.sh
        - /home/cs/b.sh
        - /home/cs/c.sh
      ignore_errors: yes
      tags: backup_file
```
执行结果为：/home/cs/a.sh-2023-10-31、/home/cs/b.sh-2023-10-31、/home/cs/c.sh-2023-10-31
ignore_errors: yes 为：没有这个文件可能会导致报错，跳过报错继续执行，不过最后还是要返回来看，需要单独复制。

* 批量复制文件：从本地复制到其他服务器不同路径

```yaml
    - name: copy file
      copy: src=/etc/ansible/yml/update/{{ item.src }} dest={{ item.dest }} mode={{ item.mode }}
      with_items:
        - {src: "a.sh", dest: "/data/cs/a.sh", mode: "0777"}
        - {src: "b.sh", dest: "/data/abc/b.sh", mode: "0777"}
        - {src: "cs.jar", dest: "/data/conf/cs.jar", mode: "0644"}
      tags: copy_file
```
* 批量复制文件：从其他服务器复制到其他服务器不同路径

```yaml
    - name: copy shell/file
      shell: cp -ar {{ item.src }} {{ item.dest }}
      with_items:
        - {src: "/home/test/nginx/conf/nginx.conf", dest: "/usr/local/cs/nginx/conf/nginx.conf"}
        - {src: "/home/test/nginx/conf/cs.conf", dest: "/usr/local/cs/nginx/conf/cs.conf"}
        - {src: "/home/test/nginx/src/nginx", dest: "/usr/local/cs/nginx/src/nginx"}
	  ignore_errors: yes
      tags: fugai
```
ignore_errors: yes 为：没有这个文件可能会导致报错，跳过报错继续执行，不过最后还是要返回来看，需要单独复制。
## 四、相关文章
|                           文章标题                           |                           文章链接                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| [Ansible自动化运维（一）简介及部署、清单](https://liucy.blog.csdn.net/article/details/133769300) | [https://liucy.blog.csdn.net/article/details/133769300](https://liucy.blog.csdn.net/article/details/133769300) |
| [Ansible自动化运维（二）ad-hoc 模式详解](https://liucy.blog.csdn.net/article/details/133772023) | [https://liucy.blog.csdn.net/article/details/133772023](https://liucy.blog.csdn.net/article/details/133772023) |
| [Ansible自动化运维（三）Playbook 模式详解](https://liucy.blog.csdn.net/article/details/133899966) | [https://liucy.blog.csdn.net/article/details/133899966](https://liucy.blog.csdn.net/article/details/133899966) |
| [Ansible自动化运维（四）jinja2 模板、Roles角色详解](https://liucy.blog.csdn.net/article/details/133994509) | [https://liucy.blog.csdn.net/article/details/133994509](https://liucy.blog.csdn.net/article/details/133994509) |


