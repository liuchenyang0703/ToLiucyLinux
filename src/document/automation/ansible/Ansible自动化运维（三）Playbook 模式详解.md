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
date: 2024-01-26
comment: false
breadcrumb: false
isOriginal: true
---

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/profile/7yu26jk3lfqxg)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---

## 一、Ansible 中的 Playbook 模式

&emsp;&emsp;Playbook不同于使用单个模块操作远程服务器，Playbook的功能更加强大。如果说单个模块执行类似于Linux系统中的命令，那么Playbook就类似于shell脚本，将多个模块组合起来实现一组的操作。



`Playbook`还是会用到`ad-hoc`模式中的模块及参数，只不过`Playbook与ad-hoc`的写法不一样。

### 1.1 Playbook 的优势

- [x] 功能比`ad-hoc`更全
- [x] 能很好的控制先后执行顺序, 以及依赖关系
- [x] 语法展现更加的直观
- [x] ad-hoc无法持久使用，playbook可以持久使用



### 1.2 Playbook 的组成

`play`：一个完整的部署任务，并且必须包含以下前两项:

&emsp;&emsp;`hosts`：定义对哪些主机进程操作；【如果是多个组可以使用`:`分割，例如：`123:456:789`】。

&emsp;&emsp;`tasks`：定义的是具体执行的任务

&emsp;&emsp;`become`：表示是否要以特权用户（通常是root）身份执行任务。如果设置为`yes`，则任务会以特权身份执行。

`playbook`: 由一个或多个`play`组成，一个play可以包含多个`task`任务



<font color=red>说明：`Ansible` 中的 `Playbook` 文件结尾为`.yml` 格式</font>

示例httpd.yml：安装httpd；

```yaml
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

`hosts`：指定要在哪个主机上执行，也是写主机或主机组名，需要提前在`/etc/ansible/hosts`中配置好；如果是多个组可以使用`:`分割，例如：`123:456:789`。

`become`：yes表示使用特权用户；

`tasks`：属于是一个任务列表，主要写具体执行什么的（可以有多个）；

&emsp;&emsp;`name`：每个任务的名称，用于描述干什么的；上述yml中则是`安装httpd服务`；

&emsp;&emsp;`yum`：表示使用哪个模块来进行操作；`模块的参数可以看ad-hoc中的，用的都是一样的，写法不一样就是；`

&emsp;&emsp;&emsp;&emsp;`name`：要安装的服务名称，我们这里是httpd：

&emsp;&emsp;&emsp;&emsp;`state`：要进行的操作，可以是安装、卸载、更新；



其实`tasks`就是Ansible的模块以YAML语法写入到playbook中。

生产环境中为了可读性与可维护性通常一个playbook中只编写一个play，如果某些主机需要执行多个play,那么可以使用include关键字在一个playbook中导入其他的playbook。 



### 1.3 Playbook 命令及常用参数

格式：

```bash
ansible-playbook playbook.yml [选项]
```

常用选项：
> 从上到下为使用频率从高到低。

| 选项/参数      | 选项/参数 解析                                 |
| -------------- | ---------------------------------------------- |
| -\-syntax-check | 语法检测                                       |
| -\-list-tags|列出此yml文件中的所有tag标签|
| -\-list-hosts   | 匹配的服务器列表                               |
| -\-list-tasks   | 列出任务列表                                   |
|-t|指定执行的标签（tags）|
| -T             | 建立SSH连接的超时时间                          |
| -i             | 指定Inventory文件                              |
| -f             | 并发执行的进程数，默认为5                      |
| -\-step         | 每执行一个任务后停止，等待用户确认             |
|-\-skip-tags|执行–skip-tags之外的标签任务|
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

`notify` 写在某一个任务中，如果这个任务执行了，就会触发`handlers`的操作；`notify`指定的是`handler`的name，所以`handlers`和`notify`指定的名称必须相同，否则无法触发。
`handlers`和`tasks`是同级，一般写在最后，而`notify`是写在某一个任务里的，位置并没有限制。

`handlers` 中需要`- name`指定名称，指定的名称和`notify`指定的必须是一致的；
`handlers`只会在所有的`tasks`执行完后执行，并且，即便一个`handlers`被触发多次，也只会执行一次。 `handlers`是一种特殊的`tasks`，所以他两是同级目录。

* handlers（触发事件）
```bash
notify: 触发
handlers：触发的动作
# 两者的名称一定要相同，否则无法触发。
```
**使用场景**：一般都是在修改配置文件时或是重启容器时启动服务使用。

```yaml
- name: 测试触发与动作
  hosts: web
  remote_user: root
  
  tasks:    
    - name: copyfile
      src: src=nginx.conf dest=/usr/local/nginx/conf/nginx.conf
      tags: copyfile
      notify: restart		# 触发：触发名称
        
  handlers:				# 触发动作
    - name: restart     # 触发名称
      shell: /usr/local/nginx/sbin/nginx -s reload
```

### 1.5 Playbook 中的变量

> &emsp;&emsp;变量提供了便捷的方式来管理`Ansible playbook`的每一个项目中的动态值，比如我们要更新配置，而这个目录下有很多文件，每次都需要输入长长的路径，就特别的麻烦而且也不美观，像这种需要反复使用的，我们可以将此值设置为变量，路径就可以只写一小段，会方便许多，而且看起来也很清晰。如此一来还方便维护，减少维护的成本。

* 变量的定义方式

1.通过`命令行`进行变量定义

2.在`play文件`中进行变量定义

3.通过`Inventory主机信息`文件中进行变量定义

<font color=red>变量读取的优先级为: `命令行 > playbook文件 > Inventory`文件</font>



* [x] 通过vars定义变量，也就是命令行定义变量【用的最多】


```yaml
## 安装LAMP服务
- name: LAMP
  hosts: web
  remote_user: root
  vars:
    packages_name:
      - httpd
      - mariadb-server
      - php
      - php-mysql

  tasks:
    - name: install LAMP
      yum:
         name: {{ packages_name }}
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

当变量较少时，使用`vars命令行`定义没有问题，当变量较多时，可以将变量保存到一个独立的文件中；

需要多个yml文件，一个主文件，需要调用其他yml独立文件，主要是最后运行的；其他是定义包名的yml文件。

```yaml
#定义阶段
# my_vars.yml

httpd_package: httpd
mariadb_package: mariadb-server
my_cnf: /etc/my.cnf
bendi_my: /etc/ansible/yml/mysql/conf/my.cnf


#调用阶段
# apache.yml

- name: instal apache
  hosts: web
  remote_user: root
  vars_files:
    - my_vars.yml  # 引入变量文件

  tasks:
    - name: Install httpd
      yum:
        name: {{ httpd_package }}
        state: present

    - name: Install mariadb-server
      yum:
        name: {{ mariadb_package }}
        state: present
    
    - name: update_cnf
      copy: src={{ bendi_my }} dest={{ my_cnf }} mode=0777
```

执行此yml：

```bash
# 语法校验
ansible-playbook --syntax-check apache.yml

# 执行yml
ansible-playbook apache.yml（定义的yml文件名）
```

* [x] 官方推荐定义变量方法

在Ansible项目目录下创建两个变量目录：`host_vars`、`group_vars`，目录名字必须要一致，不能做任何修改。
&emsp;&emsp;以下是详细的步骤，从设置目录结构到创建Playbook的执行：

1. **目录结构**：
   在你的Ansible项目目录下，确保设置以下目录结构：

```bas
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

在`group_vars`目录下创建一个YAML文件，例如`web-servers.yml`，并在其中定义组级别的变量，如：   `mkdir -p /etc/ansible/group_vars && vim /etc/ansible/group_vars/web-servers.yml`

```yaml
# group_vars/web-servers.yml

httpd_package: httpd
mariadb_package: mariadb-server
```

4. **主机级别变量 (`host_vars/web-server.yml`)**：

在`host_vars`目录下创建一个YAML文件，例如`web-server.yml`，并在其中定义主机级别的变量，如：  `mkdir -p /etc/ansible/host_vars && vim /etc/ansible/host_vars/web-servers.yml`

```yaml
# host_vars/web-server.yml

http_port: 80
```

5. **Playbook (`playbook.yml`)**：

创建你的Ansible Playbook，例如：

`vim /etc/ansible/playbook.yml`

```yaml
- name: Configure Web Server
  hosts: web-servers
  remote_user: root
 
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

```bash
ansible-playbook -i inventory.ini playbook.yml
```

此时，Ansible会自动加载`group_vars`和`host_vars`目录中的变量，你的Playbook将使用这些变量来配置主机。

通过这种方式，你可以更加有组织地管理变量，特别是对于多主机和多组的环境。你可以为不同的组或主机设置特定的变量，而不必在Playbook中硬编码这些值，提高了可维护性和可读性。



### 1.6 debug 模块

>Ansible 的 `debug` 模块是一个非常有用的工具，用于在 playbook 执行过程中输出变量的值或显示消息。这可以帮助你调试 playbook，确保变量的值符合预期，或者在执行过程中提供更多的上下文信息。

**<font size=4>基本用法</font>**
|参数| 作用 |
|--|--|
| `msg` | 输出的消息，可以是字符串或变量。 |
|`var`|输出变量的值。|

**<font size=4>示例</font>**

以下是一个完整的 playbook 示例，展示如何使用 `debug` 模块：

```yaml
- name: 示例 playbook
  hosts: cs
  remote_user: root
  
  tasks:
    - name: 输出简单消息
      debug:
        msg: "这是一个简单的消息"

    - name: 输出变量的值
      debug:
        var: ansible_distribution

    - name: 输出多个变量的值
      debug:
        msg: "操作系统: {{ ansible_distribution }}，版本: {{ ansible_distribution_version }}"
```
> **变量使用的注意事项：**
> - 在 `msg` 中使用变量时，需要使用双大括号 `{{ }}` 来引用变量。
> - 在 `var` 中直接指定变量名即可，不需要使用双大括号。

```yaml
- name: debug测试 
  hosts: cs
  remote_user: root
  
  tasks:
   - name: 查看root目录下的文件
     shell: ls /root
     register: root_directory_contents  # 存储命令输出

   - name: 输出的结果
     debug:
       var: root_directory_contents.stdout_lines
```

![](https://raw.githubusercontent.com/liuchenyang0703/blog-images/refs/heads/main/images/202509011602241.png)

### 1.7 Ansible 中的事实变量

> Ansible 提供了大量的事实变量（facts），这些变量包含了目标主机的各种系统信息。这些信息可以在 playbook 中使用，以实现条件执行、动态配置等高级功能。以下是一些常见的事实变量及其用途：

**<font size=4> 1. 操作系统相关变量</font>**

- **`ansible_distribution`**：操作系统的名称，例如 `CentOS`、`Ubuntu`、`Red Hat` 等。
- **`ansible_distribution_version`**：操作系统的完整版本号，例如 `7.9.2009`、`20.04` 等。
- **`ansible_distribution_major_version`**：操作系统的主版本号，例如 `7`（对于 CentOS 7.x）、`20`（对于 Ubuntu 20.x）等。
- **`ansible_os_family`**：操作系统的家族，例如 `RedHat`（包括 CentOS、Red Hat 等）、`Debian`（包括 Ubuntu 等）。
- **`ansible_distribution_release`**：操作系统的代号，例如 `focal`（对于 Ubuntu 20.04）、`buster`（对于 Debian 10）等。

**<font size=4> 2. 网络相关变量 </font>**

- **`ansible_default_ipv4`**：默认的 IPv4 地址信息。
  - **`ansible_default_ipv4.address`**：默认的 IPv4 地址。
  - **`ansible_default_ipv4.netmask`**：默认的 IPv4 子网掩码。
  - **`ansible_default_ipv4.gateway`**：默认的 IPv4 网关。
- **`ansible_default_ipv6`**：默认的 IPv6 地址信息。
  - **`ansible_default_ipv6.address`**：默认的 IPv6 地址。
  - **`ansible_default_ipv6.netmask`**：默认的 IPv6 子网掩码。
  - **`ansible_default_ipv6.gateway`**：默认的 IPv6 网关。
- **`ansible_all_ipv4_addresses`**：所有配置的 IPv4 地址列表。
- **`ansible_all_ipv6_addresses`**：所有配置的 IPv6 地址列表。
- **`ansible_hostname`**：主机名。
- **`ansible_fqdn`**：完全限定域名（FQDN）。

**<font size=4>3. 硬件相关变量</font>**

- **`ansible_processor`**：CPU 信息。
- **`ansible_processor_cores`**：每个 CPU 的核心数。
- **`ansible_processor_count`**：CPU 的数量。
- **`ansible_processor_threads_per_core`**：每个核心的线程数。
- **`ansible_processor_vcpus`**：虚拟 CPU 的数量。
- **`ansible_memory_mb`**：内存信息（以 MB 为单位）。
  - **`ansible_memory_mb.real`**：物理内存。
  - **`ansible_memory_mb.swap`**：交换内存。
- **`ansible_devices`**：存储设备信息。
- **`ansible_mounts`**：挂载点信息。

**<font size=4> 4. 文件系统相关变量</font>**

- **`ansible_filesystems`**：文件系统类型列表。
- **`ansible_mounts`**：挂载点信息。
  - **`ansible_mounts[].mount`**：挂载点路径。
  - **`ansible_mounts[].device`**：设备名称。
  - **`ansible_mounts[].fstype`**：文件系统类型。
  - **`ansible_mounts[].size_total`**：总大小（以字节为单位）。
  - **`ansible_mounts[].size_available`**：可用大小（以字节为单位）。

**<font size=4> 5. 用户和组相关变量</font>**

- **`ansible_user_id`**：当前用户的用户 ID。
- **`ansible_group_names`**：当前用户所属的组名列表。
- **`ansible_user`**：当前用户名称。

**<font size=4>6. 服务相关变量</font>**

- **`ansible_service_mgr`**：服务管理器类型，例如 `systemd`、`init` 等。

**<font size=4>7. 其他变量</font>**

- **`ansible_date_time`**：日期和时间信息。
  - **`ansible_date_time.date`**：当前日期。
  - **`ansible_date_time.time`**：当前时间。
  - **`ansible_date_time.epoch`**：当前时间的 Unix 时间戳。
  - **`ansible_date_time.timezone`**：时区。
- **`ansible_env`**：环境变量。
  - **`ansible_env.PATH`**：环境变量 `PATH` 的值。
  - **`ansible_env.HOME`**：环境变量 `HOME` 的值。

**<font size=4>示例1：查看所有事实变量</font>**

可以使用以下 playbook 查看目标主机的所有事实变量：

```yaml
- name: 查看所有事实变量
  hosts: cs
  tasks:
    - name: 查看所有事实变量
      debug:
        var: ansible_facts
```

运行这个 playbook 后，你将看到目标主机的所有事实变量及其值。

**<font size=4>示例2：使用特定事实变量</font>**

以下是一个示例，展示如何在 playbook 中使用特定的事实变量：

```yaml
- name: 根据操作系统版本安装软件
  hosts: cs
  tasks:
    - name: 安装 CentOS 7 的特定软件
      yum:
        name: my-software
        state: present
      when: ansible_distribution == "CentOS" and ansible_distribution_major_version == "7"

    - name: 安装 Ubuntu 20.04 的特定软件
      apt:
        name: my-software
        state: present
      when: ansible_distribution == "Ubuntu" and ansible_distribution_major_version == "20"

    - name: 输出默认 IPv4 地址
      debug:
        msg: "默认 IPv4 地址是 {{ ansible_default_ipv4.address }}"
```
`when`是条件判断语句，接下来我们就开始讲解条件判断。
## 二、Playbook 中的流程控制
### 2.1 条件判断

&emsp;&emsp;在所有的编程语言流程控制语句中，条件语句是必不可少的，在使用Ansible的过程中，条件判断的使用频率极其高。

例如：
* [x] 使用不同的系统的时候，可以通过判断系统来对软件包进行安装。

* [x] 在nfs和rsync安装过程中，客户端服务器不需要推送配置文件，之前我们都是写多个play，会影响效率。

* [x] 在源码安装nginx的时候，执行第二遍就无法执行了，此时我们就可以进行判断是否安装过。




<font color=red>playbook中的条件判断语句使用`when`</font>

```yaml
- name: cs条件判断
  hosts: cs
  tasks:
    - name: Install CentOS Httpd
      yum:
        name: httpd
        state: present
      when: ansible_facts['os_family'] == "RedHat"

    - name: Install Ubuntu Httpd
      apt:
        name: apache2
        state: present
      when: ansible_facts['os_family'] == "Debian"
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
- name: 测试when
  hosts: cs
  remote_user: root
  
  tasks:
  - name: createfile
    copy: content="test3" dest=/home/cs/a.txt
    when: a=='3'
  - name: createfile
    copy: content="test4" dest=/home/cs/a.txt
    when: a=='4'
```

> 如果a"3"，就将“test3”，写入到cs组下被管控机的/home/cs/a.txt中，
> 如果a"4"，就将“test4”，写入到cs组下被管控机的/home/cs/a.txt中。

执行：

```bash
# 语法校验
ansible-playbook  --syntax-check when.yml

#执行
ansible-playbook when.yml
```



### 2.2 循环
`with_items`

* [x] 1、标准循环使用场景 - 批量安装软件

```yml
[root@localhost yml]# vim with_items.yml

- name: 批量安装
  hosts: all
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

![](https://raw.githubusercontent.com/liuchenyang0703/blog-images/refs/heads/main/images/202509011602142.png)



* [x] 2、标准循环使用场景 - 批量创建用户

```yaml
[root@localhost yml]# vim item2.yml

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

![](https://raw.githubusercontent.com/liuchenyang0703/blog-images/refs/heads/main/images/202509011601373.png)

* [x] 3、循环嵌套使用场景 - 批量创建用户并给用户添加用户组

```yaml
[root@localhost yml]# vim item3.yml

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
  vars: 
    src_route: /application/cs1/
    src_route2: /application/cs2/
    dest_route: /home/cs/cs1/
    dest_route2: /home/cs/cs2/
    
  tasks:
    - name: bulk copy
      copy: src={{ item.src }} dest={{ item.dest }} mode={{ item.mode }}
      with_items:
        - {src: "{{ src_route }}a.sh", dest: "{{ dest_route }}a.sh", mode: "0777"}
        - {src: "{{ src_route2 }}tongji.sh", dest: "{{ dest_route2 }}tongji.sh", mode: "0777"}
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

- name: 忽略错误演示
  hosts: cs
  remote_user: root

  tasks: 
    - name: 使用一个未知的命令
      shell: a
      ignore_errors: yes

    - name: 创建一个文件
      file: path=/home/cs/yichang state=touch
```

代码解析：

> 如上代码，执行到`shell的a命令时`，服务器上是没有这个命令的，就会报错，报错了之后，下面的任务就不会在继续执行了；

> 我们现在添加了一个`ignore_errors: yes`，在报错没有这个命令的时候就可以跳过这个报错，继续执行下面的内容；
> 常用于备份文件等操作，因为备份文件时可能没有这个，所以需要跳过，避免中断。



### 2.4 tags 标签

&emsp;&emsp;默认情况下，Ansible在执行一个playbook时，会执行playbook中定义的所有任务；Ansible playbook中的tag标签是一种用于选择性运行特定任务或任务集的机制。通过为每个任务指定标签，可以在运行playbook时选择只运行带有特定标签的任务，而不运行其他任务。这对于控制和管理Ansible playbook的执行非常有用，特别是playbook包含许多任务时。

* [x] 1、打标签的方式

可以对一个任务打一个标签<font color=green>【比如在使用安装或复制等操作】</font>

可以对一个任务打多个标签<font color=green>【一般很少用】</font>

可以对多个任务打一个标签<font color=green>【比如在安装完查询服务状态等】</font>

* [x] 2、标签使用

`-t`：执行指定的tag标签任务

`--list-tags`：列出此yml文件中的所有tag标签

`--skip-tags`：执行--skip-tags之外的标签任务

---

**如何在运行ansible-playbook时使用标签：**

- playbook中的使用：`vim test.yml`
```yaml
- name: 更新脚本中链接并启动服务
  hosts: cs
  remote_user: root
  vars:
    route: /home/lcy/sh/
    file: test.sh
    old_url: https://liuchenyang0703.github.io/ToLiucyLinux/
    new_url: https://liuchenyang.top
    
  tasks:
    - name: stop_shell
      shell: ps -ef | grep -v grep | grep test.sh | awk '{print $2}' | xargs kill
      ignore_errors: yes
      tags: 
        - stop
        - restart

    - name: update_url
      shell: sed -i 's#{{ old_url }}#{{ new_url }}#g' {{ route }}{{ file }}
      tags: update

    - name: start_shell
      shell: |
        cd {{ route }}
        rm -rf nohup.out
        nohup sh {{ file }} > nohup.out 2>&1 &
      tags: 
        - start
        - restart  
```

这时脚本已经写完了，我们可以先查一下脚本里都有哪些标签：

```bash
[root@mail update]# ansible-playbook test.yml --list-tags

playbook: test.yml

  play #1 (cs): 更新脚本中链接并启动服务	TAGS: []
      TASK TAGS: [restart, start, stop, update]
```
可以看到有 `[restart, start, stop, update]`

- 需要停止脚本：仅运行带有`stop`标签的任务：

```bash
ansible-playbook test.yml -t stop
```
- 需要更新脚本：仅运行带`update`标签的任务

```bash
ansible-playbook test.yml -t update
```
- 需要重启脚本：运行带`restart`标签的任务
```bash
ansible-playbook test.yml -t restart
```
- 需要更新并启动服务：运行带`update和restart`标签的任务【多标签】
```bash
ansible-playbook test.yml -t "update,restart"
```


> 小总结：标签功能有助于增加Ansible playbook的可维护性，使您能够更精细地控制任务的执行。

## 三、实例：Playbook 中常用模块的实例
* [x] 1、批量备份文件

```yaml
- name: 批量备份文件
  hosts: cs
  remote_user: root
  vars: 
    route: /home/cs/

  tasks: 
    - name: backup file
      shell: mv {{ item }} {{ item }}-$(date +"%Y-%m-%d")
      with_items:
        - "{{ route }}a.sh"
        - "{{ route }}b.sh"
        - "{{ route }}c.sh"
      ignore_errors: yes
      tags: backup_file
```
执行结果为：`/home/cs/a.sh-2023-10-31`、`/home/cs/b.sh-2023-10-31`、`/home/cs/c.sh-2023-10-31`。
`ignore_errors: yes` 为：没有这个文件可能会导致报错，跳过报错继续执行，不过最后还是要返回来看，是本身就没这个文件还是怎么了，要知道为什么会报错。

* [x] 2、批量复制文件：从本地复制到其他服务器不同路径

```yaml
- name: 批量复制文件：从本地复制到其他服务器不同路径
  hosts: cs
  remote_user: root
  vars: 
    route: /etc/ansible/yml/update/
    dest1: /home/cs/
    dest2: /home/cs1/
    dest3: /home/cs2/

  tasks: 
    - name: copy file
      copy: src={{ route }}{{ item.src }} dest={{ item.dest }} mode={{ item.mode }}
      with_items:
        - {src: "a.sh", dest: "{{ dest1 }}a.sh", mode: "0777"}
        - {src: "b.sh", dest: "{{ dest2 }}b.sh", mode: "0777"}
        - {src: "cs.jar", dest: "{{ dest3 }}cs.jar", mode: "0644"}
      tags: copy_file
```
* [x] 3、更新配置文件并重启服务

```bash
- name: 更新测试服务
  hosts: cs
  remote_user: root
  vars:
    route: /home/cs/cs1/
    route_update: /home/cs/cs1/update/
    route_sh: /home/cs/cs1/sh/
    local_route: /etc/ansible/yml/cs/update/

  tasks: 
    - name: backup file
      shell: mv {{ item }} {{ item }}-$(date +"%Y-%m-%d")
      with_items:
        - "{{ route }}jdk1.8/"
        - "{{ route_update }}/redis.tar.gz"
        - "{{ route_sh }}/start.sh"
      ignore_errors: yes
      tags: backup_file

    - name: copy file
      copy: src={{ local_route }}{{ item.src }} dest={{ item.dest }} mode={{ item.mode }}
      with_items:
        - {src: "jdk1.8", dest: "{{ route }}jdk1.8", mode: "0777"}
        - {src: "update/redis.tar.gz", dest: "{{ route_update }}redis.tar.gz", mode: "0777"}
        - {src: "sh/start.sh", dest: "{{ route_sh }}start.sh", mode: "0777"}
      tags: copy_file

    - name: restart cs container
      shell: docker restart cs
      notify: start cs server
      tags: restart_cs

  handlers:
    - name: start cs server
      shell: docker exec -i cs bash -c 'sh /home/cs/cs1/sh/start.sh'
```



* [x] 4、部署apache服务并启动，中间可以自行设置tags标签。

```yaml
[root@localhost yml]# vim tags.yml

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



![](https://raw.githubusercontent.com/liuchenyang0703/blog-images/refs/heads/main/images/202509011601519.png)
## 四、相关文章
|                           文章标题                           |                           文章链接                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| [Ansible自动化运维（一）简介及部署、清单](https://liucy.blog.csdn.net/article/details/133769300) | [https://liucy.blog.csdn.net/article/details/133769300](https://liucy.blog.csdn.net/article/details/133769300) |
| [Ansible自动化运维（二）ad-hoc 模式详解](https://liucy.blog.csdn.net/article/details/133772023) | [https://liucy.blog.csdn.net/article/details/133772023](https://liucy.blog.csdn.net/article/details/133772023) |
| [Ansible自动化运维（三）Playbook 模式详解](https://liucy.blog.csdn.net/article/details/133899966) | [https://liucy.blog.csdn.net/article/details/133899966](https://liucy.blog.csdn.net/article/details/133899966) |
| [Ansible自动化运维（四）jinja2 模板、Roles角色详解](https://liucy.blog.csdn.net/article/details/133994509) | [https://liucy.blog.csdn.net/article/details/133994509](https://liucy.blog.csdn.net/article/details/133994509) |


