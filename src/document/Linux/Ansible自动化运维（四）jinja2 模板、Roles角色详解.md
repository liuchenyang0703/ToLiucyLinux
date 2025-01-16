---
title: Ansible自动化运维（四）jinja2 模板、Roles角色详解
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



## 一、jinjia2 模板

jinja2是Python的全功能模板引擎。在python的WEB开发中被广泛应用。

Ansible通常会使用jinja2模板来修改被管理主机的配置文件等。



### 1.1 在 Ansible 中的使用

&emsp;&emsp;使用Ansible的jinja2模板也就是使用`template` 模块，该模块和`copy` 模块一样，都是将文件复制到远端主机上去，但是区别在于，`template` 模块可以获取到文件中的变量，而copy则是原封不动的把文件内容复制过去。比如想把脚本中的变量名改成主机名，如果使用copy模块则推送过去的就是{{ ansible_fqdn }}，不变，如果使用template，则会变成对应的主机名。

<font color=red>Ansible允许jinja2模板中使用条件判断和循环，但是不允许在playbook中使用。通常jinja2模板文件的后缀为`.j2`</font>



### 1.2 jinjia2 模板语法

#### 1.2.1 基础语法

* [x] 基础语法

1)playbook文件使用template模块

2)模板文件里面变量使用{{名称}}，比如{{PORT}}或使用facts

3){{}}也可以使用表达式，比如{{ 3+5 }} {{3 in [1,2,3,4,5] }}

<font color=red>说明：{{}}中的表达式其实就是python中的表达式，可以包括比较运算，算数运算，逻辑运算，成员运行。</font>

该模板支持：

```python
字符串：使用单引号或双引号；
　　数字：整数，浮点数；
　　列表：[item1, item2, ...]
　　元组：(item1, item2, ...)
　　字典：{key1:value1, key2:value2, ...}
　　布尔型：true/false
　　算术运算：
　　　　+, -, *, /, //, %, **
　　比较操作：
　　　　==, !=, >, >=, <, <=
　　逻辑运算：
　　　　and, or, not
```

- 模板通常都是通过引用变量来运用的





* <span id="click_me_jump">【实例】</span>

1. 创建模板文件：
   首先，需要创建一个包含Jinja2模板的文件。这个文件通常包含要插入变量或表达式的位置。可以在文件中使用`{{ }}`来包裹变量或表达式。

   例如，创建一个名为 `my_template.j2` 的模板文件：

   ```jinja2
   [root@localhost jinja2]# vim my_template.j2 
   ServerName {{ hostname }}
   Listen {{ port }}
   Debug {{ debug_mode }}
   ```

2. 在Playbook中使用模板：
   在 Ansible Playbook中，可以使用`template`模块来加载模板文件并将变量传递给它。以下是一个示例Playbook：

   ```yaml
   [root@localhost jinja2]# vim jinja.yml
   ---
   - name: 使用Jinja2模板
     hosts: your_target_hosts
     vars:
       hostname: example.com
       port: 8080
       debug_mode: True
     tasks:
       - name: 生成配置文件
         template:
           src: my_template.j2
           dest: /etc/ansible/yml/jinja2/myapp.conf
   ```

   在这个示例中，我们使用了`template`模块，指定了模板文件的源 (`src`) 和目标 (`dest`)。我们还传递了变量 `hostname`、`port` 和 `debug_mode`，这些变量会在模板中替换`{{ }}`中的相应位置。

3. 运行Playbook：
   运行上述Playbook，Ansible将使用模板文件生成 `/etc/ansible/yml/jinja2/myapp.conf` 配置文件，并将模板中的`{{ }}`替换为变量的值。

```bash
# 结果值为：
ServerName example.com
Listen 8080
Debug True
```

模板文件中的`{{ }}`不仅可以包含变量，还可以包含表达式，如您所述的比较运算、算术运算、逻辑运算等。这使得您可以在模板中执行各种操作以生成需要的配置或文本。

Jinja2模板的强大之处在于它允许创建灵活和动态的配置文件，以适应不同的场景和变量值。



#### 1.2.2 流程控制



* [x] 流程控制



* 条件判断

使用`{% if %}`和`{% endif %}`块来实现条件语句。以下是一个示例：

格式：

```jinja2
{% if EXPR %}
	执行内容
{% else %}
	执行内容
{% endif %}
```

实例：

```jinja2
{% if is_production %}
    # 生产环境配置
    DebugLevel: 0
{% else %}
    # 开发/测试环境配置
    DebugLevel: 2
{% endif %}
```

* 多条件判断

格式：

```jinja2
{% if EXPR %}
	执行内容
{% elif EXPR %}
	执行内容
{% else %}
	执行内容
{% endif %}
```

实例：

```jinja2
{% if is_production %}
	DebugLevel: 0
{% elif is_production %}
	DebugLevel: 1
{% else %}
	DebugLevel: 2
{% endif %}
```

在这个示例中，根据`is_production`变量的值，将生成不同的配置。



* 循环表达式

可以使用`{% for %}`和`{% endfor %}`块来实现循环。以下是一个示例：

格式：

```jinja2
{% for i in EXPR %}
	执行内容
{% endfor %}
```

实例：

```jinja2
{% for item in list_items %}
    - {{ item }}
{% endfor %}
```

在这个示例中，`list_items` 是一个包含多个元素的列表，模板将循环遍历列表中的每个元素并生成相应的输出。



> 说明:默认不支持`break`和`continue`的，但是可以使用ansible的扩展选项，在配置`/etc/ansible/ansible.cfg`中的132行中:
>
> `jinja2_extensions = jinja2.ext.do,jinja2.ext.i18n,jinja2.ext.loopcontrols`

 

#### 1.2.3 过滤器



* [x] 过滤器

Jinja2还支持过滤器，可以使用过滤器来对变量进行操作。例如，可以使用`default`过滤器来设置默认值：

```jinja2
{{ variable | default("default_value") }}
```

或者，您可以使用`length`过滤器来获取列表的长度：

```jinja2
The list has {{ list_items | length }} items.
```



#### 1.2.4 其他控制结构

* [x] 其他控制结构

Jinja2还支持其他控制结构，如`{% include %}`用于包含其他模板文件，以及`{% macro %}`和`{% call %}`用于定义和调用宏。

请注意，Jinja2语法和功能非常强大，支持许多高级用例，例如宏、继承、自定义过滤器等。要更深入地了解Jinja2模板的流程控制和功能，请查看Jinja2的官方文档。在Ansible中，可以将这些模板用于生成配置文件、编排任务等，以满足不同的需求和环境。



### 1.3 templates 模块

> &emsp;&emsp;template模块与copy模块的用法十分类似，只是更多用于jinja2模板的渲染，也就是模板文件中可以引用变量，实现对不同主机有定制化的配置。 



**copy与template的区别**

- copy模块不替代参数，template模块替代参数
- template的参数几乎与copy的参数完全相同



* [x] 常用参数：

|  参数  |             解析             |
| :----: | :--------------------------: |
|  src   | 指定本地jinja2模板文件的位置 |
|  dest  |     指定目标远程主机路径     |
| backup |    指定是否备份，默认值no    |
|  mode  |           设置权限           |
|  user  |           设置用户           |
| group  |          设置用户组          |

   

> templates 模块的使用： [jinja2模板的基础用法](#click_me_jump)



### 1.4 jinja2 使用案例

比如需要实现对被控端主机安装redis服务，默认的redis服务只监听本地的127.0.0.1端口，换句话说，其他主机是不可以访问该redis服务器的，如何来解决这个问题呢？此时就可以使用jinja2的模板，在其中引用变量，使用template模块进行渲染。



> 本案例使用了：`jinja2`模板、`templates`模块、`copy`模块、`yum`模块、`shell`模块、`service`模块、`vars`定义变量、`register`变量注册、`ignore_errors`忽略错误、`tags`标签、`when`判断、`notify` 和 `handlers`通知与触发（处理程序）



* 1、创建一个自定义的Redis配置模板文件，如 `redis_conf.j2`，并在其中修改Redis绑定地址以侦听所有IP地址：

```jinja2
[root@localhost redis]# vim redis_conf.j2
bind {{ ansible_host }} 127.0.0.1
port {{ redis_port }}
protected-mode no
tcp-backlog 511
timeout 0
tcp-keepalive 300
daemonize yes
supervised no
pidfile /var/run/redis_6379.pid
loglevel notice
```

在此示例中，我们使用了 `bind {{ ansible_host }} 127.0.0.1` 来告诉Redis服务只接受本地IP连接，并使用变量 `redis_port` 来指定Redis端口。

* 2、在Ansible Playbook中，使用`template`模块加载该模板并渲染它，然后将渲染后的配置文件复制到Redis配置文件目录。以下是一个示例Playbook：

```yaml
[root@localhost redis]# vim redis.yml
---
- name: 部署Redis服务
  hosts: web
  remote_user: root
  gather_facts: no
  vars:
    redis_port: 6379  # 指定Redis端口

  tasks:
    - name: Upload yum repo
      copy: 
        src: /etc/yum.repos.d/CentOS-Base.repo
        dest: /etc/yum.repos.d
        backup: no
      tags: 
       - upload_yum
       - upload_repo
       - redis_server

    - name: Upload epel repo
      copy:
        src: /etc/yum.repos.d/epel.repo
        dest: /etc/yum.repos.d/
        backup: no
      tags: 
       - upload_epel
       - upload_repo
       - redis_server

    - name: Check redis install
      shell: /usr/bin/rpm -q redis
      register: redis_msg
      ignore_errors: yes
      tags: 
       - check_redis
       - redis_server

    - name: Install redis server
      yum: 
        name: redis
        state: present
      when: redis_msg.failed == true
      tags: 
       - install_redis
       - redis_server

    - name: Upload redis.conf
      template:
        src: redis_conf.j2
        dest: /etc/redis.conf
      notify: Restart Redis
      tags: 
       - upload_redis.conf
       - redis_server

    - name: Start Redis server
      service:
        name: redis
        state: started
        enabled: yes
      tags: 
       - start_redis
       - redis_server

    - name: Restart Redis server
      service:
        name: redis
        state: restarted
      tags:
       - restart_redis
        
    - name: Stop Redis Server
      service: 
        name: redis
        state: stopped
      tags: 
        - stop_redis
        - uninstall_redis

    - name: uninstall Redis Server
      yum: 
        name: redis
        state: absent
      tags: 
        - uninstall_redis

  handlers:
    - name: Restart Redis
      service:
        name: redis
        state: restarted
```





* 3、执行检查：

```bash
# 检查语法
[root@localhost redis]# ansible-playbook --syntax-check redis.yml 

# 列出任务列表
[root@localhost redis]# ansible-playbook --list-tasks redis.yml 

# 列出所有tags标签
[root@localhost redis]# ansible-playbook --list-tags redis.yml 
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/008b476b692c4b3394a68eabf7707c11.png)



tasks 解析：（列出`tasks`任务的时候后面也会包含`tags`标签，每个任务用的标签都有哪些）

```bash
tasks:
  Upload yum repo		 # 更新yum源
  Upload epel repo		 # 更新yum扩展源
  Check redis install	 # 检查是否安装过 redis
  Install redis server	 # 安装 redis
  Upload redis.conf		 # 更新 redis 配置文件
  Start Redis server	 # 启动 redis
  Restart Redis server	 # 重启 redis
  Stop Redis Server		 # 停止 redis
  uninstall Redis Server # 卸载 redis
```
tags 解析：（列出`tasks`任务的时候后面也会包含`tags`标签，每个任务用的标签都有哪些）

```bash
TASK TAGS: 
  upload_repo		# 更新yum源，包含：Upload yum repo，Upload epel repo
  upload_yum		# 更新yum源
  upload_epel		# 更新yum扩展源
  redis_server		# 一键安装redis，包含：Upload yum repo、Upload epel repo、Check redis install、Install redis server、Upload redis.conf、Start Redis server
  check_redis		# 检查是否安装 redis
  upload_redis.conf	# 更新 redis 配置文件
  install_redis		# 安装 redis
  restart_redis		# 重启 redis
  start_redis		# 启动 redis
  stop_redis		# 停止 redis
  uninstall_redis	# 卸载 redis
```



* 4、执行yml脚本

```bash
# 执行更新yum源
[root@localhost redis]# ansible-playbook redis.yml -t upload_repo

# 检查是否安装过 redis，会有报错说找不到，不会影响，里面有 ignore_errors 忽略错误；
[root@localhost redis]# ansible-playbook redis.yml -t check_redis

# 执行安装 redis（不能单独执行redis，会报错，因为有一个when判断需要调用上面的查询是否有redis服务）
[root@localhost redis]# ansible-playbook redis.yml -t check_redis,install_redis

# 执行更新 redis 配置文件
[root@localhost redis]# ansible-playbook redis.yml -t upload_redis.conf
# 执行完毕可以查看redis状态及redis端口是否启动，正常是都启动的；

# 执行停止 redis
[root@localhost redis]# ansible-playbook redis.yml -t stop_redis
# 执行完毕可以查看redis状态及redis端口是否启动，如果没有那就是没问题，因为这是停止；

# 执行卸载 redis
[root@localhost redis]# ansible-playbook redis.yml -t uninstall_redis
# 执行完可以使用： rpm -q redis 查看或使用 check_redis标签检查

# 执行一键安装redis
[root@localhost redis]# ansible-playbook redis.yml -t redis_server
# 执行完毕可以查看redis状态及redis端口是否启动，正常是都启动的；
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/8792d06ae0f649b4be2e18ae24eb0fac.png)





## 二、Roles 角色



> &emsp;&emsp;在Ansible中，有一个roles的概念。roles并不是指定具体的东西，而是一种规范，将复杂的Playbook分割为多个文件的机制，简化复杂的Playbook编写，并且使Playbook的复用变得简单。 

<font color=red>建议：每个roles最好只使用一个tasks这样方便调用，能够很好的做到解耦；</font>





### 2.1 Roles介绍与优势

一般情况下将roles写在 **/etc/ansible/roles** 中，也可以写在其他任意位置（写在其他位置要自己手动建立一个roles文件夹）



- 对于以上所有方式有个缺点就是无法实现同时部署web、database、keepalived等不同服务或者不同服务器组合不同的应用就需要写多个yaml文件，很难实现灵活的调用
- roles用于层次性，结构化地组织playbook。roles能够根据层次结果自动装载变量文件、tasks以及handlers等。
- 要使用roles只需要在playbook中使用include指令即可。
- 简单来讲，roles就是通过分别将变量（vars）、文件（files）、任务（tasks）、模块（modules）以及处理器（handlers）放置于单独的目录中，并且可以便捷的include它们地一种机制。
- 角色一般用于基于主机构建服务的场景中，但是也可以用于构建守护进程等场景中。



### 2.2 Roles 的目录结构

* [x] 创建一个角色目录，用于演示：

```bash
mkdir -pv /etc/ansible/roles/{nginx,mysql,httpd}/{files,templates,vars,tasks,handlers,meta,default}
```

* [x] 查看Roles的目录结构：



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c8b5d88f5fa14aa98f35ff319b596cbd.png)



* [x] 目录解析：

- `/etc/ansible/roles/`：存放roles的文件路径



- `httpd`：存放`apached`服务的yml文件
- `mysql`：存放`mysql`服务的yml文件
- `nginx`：存放`nginx`服务的yml文件



- `default`：此目录至少应该有一个名为**main.yml**的文件，用于设定默认变量；

- `files`：存储由copy或者script等模块调用的文件或者脚本；
- `handlers`：此目录中至少应该有一个名为**main.yml**的文件，用于定义各个handler；其他文件需要由main.yml进行包含调用；
- `meta`：此目录中至少应该有一个名为**main.yml**的文件，定义当前角色的特殊设定以及依赖关系，其他文件需要由**main.yml**进行包含调用；
- `tasks`：此目录中至少应该有一个名为**main.yml**的文件，用于定义各个task；其他文件需要由**main.yml**进行包含调用；
- `templates`：存储由templates模块调用的模板文件；
- `vars`：此目录至少应该有一个名为**main,yml**的文件，用于定义各个variable；其他的文件需要由**main.yml**进行包含调用；



### 2.3 ansible-galaxy 命令

ansible-galaxy命令用于管理`roles`，同时也可以在 [galaxy.ansible.com](galaxy.ansible.com) 上下载别人写好的`roles`。 



* 1、初始化roles的目录结构

```bash
[root@localhost roles]# ansible-galaxy init /etc/ansible/roles/webserver
- Role /etc/ansible/roles/webserver was created successfully
```

* 2、安装别人写好的roles

```bash
[root@localhost roles]# ansible-galaxy role install -p /etc/ansible/roles tenequm.mysql
- downloading role 'mysql', owned by tenequm
- downloading role from https://github.com/tenequm/ansible-mysql/archive/1.0.1.tar.gz
     [ERROR]: failed to download the file: <urlopen error timed out>
    [WARNING]: - tenequm.mysql was NOT installed successfully.
    ERROR! - you can use --ignore-errors to skip failed roles and finish processing the list.


# 会遇到两个报错，暂时还没找到解决方法，我们可以先使用wget去拉取，第二行downloading已经给出了地址，拉取一下；
[root@localhost roles]# wget https://github.com/tenequm/ansible-mysql/archive/1.0.1.tar.gz

# 拉取完，解压即可，解压后的名字为：ansible-mysql-1.0.1
[root@localhost roles]# tar xf 1.0.1.tar.gz 
```

拉取、解压完就可以看到roles目录下多了一个新的目录`ansible-mysql-1.0.1`，里面存放的mysql。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b535bb365889403294c59929ebde956f.png)



* 3、列出已安装的roles

```bash
[root@localhost roles]# ansible-galaxy list
# /usr/share/ansible/roles
# /etc/ansible/roles
- webserver, (unknown version)
- ansible-mysql-1.0.1, (unknown version)
[WARNING]: - the configured path /root/.ansible/roles does not exist.
```



* 4、查看指定roles的信息

```bash
[root@localhost roles]# ansible-galaxy info tenequm.mysql

Role: tenequm.mysql
        description: Simply installs MySQL 5.7 on Xenial.
        commit: b3a7139ba44a91e9568345565e861e326e9d401e
        commit_message: Added priveleges configs for users.
        created: 2023-05-08T20:18:24.338543Z
        download_count: 179
        github_branch: master
        github_repo: ansible-mysql
        github_user: tenequm
        id: 103
        modified: 2023-10-10T00:48:33.420438Z
        path: (u'/root/.ansible/roles', u'/usr/share/ansible/roles', u'/etc/ansible/roles')
        upstream_id: 17029
        username: tenequm
```



* 5、删除一个roles

> 如果是使用的wget拉取的，那么删除他的哪个roles目录就可以；

```bash
[root@localhost roles]# ansible-galaxy remove /etc/ansible/roles/tenequm.mysql
- successfully removed /etc/ansible/roles/bennojoy.mysql
```



### 2.4 使用Roles（部署nginx）

流程：

> 定义配置文件 --> 定义jinja2模板，生成配置文件用 --> 定义变量 --> 定义触发（通知已定义在配置文件中） --> 定义roles的yml文件<br>
>
> 5步<br>
>
> 检查yml语法 --> 执行roles.yml文件 --> 查看服务启动状态



* 定义配置文件：`/etc/ansible/roles/nginx/tasks/main.yml` 

```yaml
- name: install wget
	yum: name=wget state=present
	
- name: wget nginx package
	command: " wget http://nginx.org/packages/centos/7/x86_64/RPMS/nginx-1.18.0-1.el7.ngx.x86_64.rpm -O /etc/ansible/roles/nginx/files/nginx-1.18.0-1.el7.ngx.x86_64.rpm"
	
- name: cp nginx
  copy: src=nginx-1.18.0-1.el7.ngx.x86_64.rpm dest=/tmp/nginx-1.18.0-1.el7.ngx.x86_64.rpm
  
- name: install nginx
  yum: name=/tmp/nginx-1.18.0-1.el7.ngx.x86_64.rpm state=latest
  
- name: conf
  template: src=nginx.conf.j2 dest=/etc/nginx/nginx.conf
  tags: nginxconf
  notify: new conf to reload

- name: start service
  service: name=nginx state=started enabled=true
```

* 定义templates生成配置文件：`/etc/ansible/roles/nginx/templates/nginx.conf.j2`

```jinja2
user  nginx; #设置nginx服务的系统使用用户
worker_processes  {{ ansible_processor_vcpus }}; #工作进程数

error_log  /var/log/nginx/error.log warn; #nginx的错误日志
pid        /var/run/nginx.pid; #nginx启动时候的pid

events {
    worker_connections  1024; #每个进程允许的最大连接数
}

http { #http请求配置，一个http可以包含多个server

    #定义 Content-Type
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    #日志格式 此处main与access_log中的main对应
    #$remote_addr：客户端地址
    #$remote_user：http客户端请求nginx认证的用户名，默认不开启认证模块，不会记录
    #$timelocal：nginx的时间
    #$request：请求method + 路由 + http协议版本
    #status：http reponse 状态码
    #body_bytes_sent：response body的大小
    #$http_referer：referer头信息参数，表示上级页面
    #$http_user_agent：user-agent头信息参数，客户端信息
    #$http_x_forwarded_for：x-forwarded-for头信息参数
    log_format  main  '$http_user_agent' '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    #访问日志，后面的main表示使用log_format中的main格式记录到access.log中
    access_log  /var/log/nginx/access.log  main;

    #nginx的一大优势，高效率文件传输
    sendfile        on;
    #tcp_nopush     on;

    #客户端与服务端的超时时间，单位秒
    keepalive_timeout  65;

    #gzip  on;
    server { #http服务，一个server可以配置多个location
        listen       {{ nginxport }}; #服务监听端口
        server_name  localhost; #主机名、域名

        #charset koi8-r;
        #access_log  /var/log/nginx/host.access.log  main;

        location / {
            root   /usr/share/nginx/html; #页面存放目录
            index  index.html index.htm; #默认页面
        }

        #error_page  404              /404.html;

        # 将500 502 503 504的错误页面重定向到 /50x.html
        error_page   500 502 503 504  /50x.html;
        location = /50x.html { #匹配error_page指定的页面路径
            root   /usr/share/nginx/html; #页面存放的目录
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }
    include /etc/nginx/conf.d/*.conf;
}
```



* 定义变量：` /etc/ansible/roles/nginx/vars/main.yml`

```yaml
nginxport: 9999
```



* 定义触发：`/etc/ansible/roles/nginx/handlers/main.yml`

因为上面通知已经定义，所以，还需要定义一个触发；

```yaml
- name: new conf to reload
  service: name=nginx state=restarted
```



* 定义剧本文件：`/etc/ansible/roles/nginx/roles.yml`

```yaml
- hosts: web
  remote_user: root
  roles:
    - nginx
```



* 检查yml文件语法是否正确

```bash
[root@localhost nginx]# ansible-playbook --syntax-check roles.yml 

playbook: roles.yml

# 检查roles会自动去检查其他的yml文件的语法。
```



* 执行roles.yml文件

```bash
[root@localhost nginx]# ansible-playbook roles.yml
```



* 查看服务启动状态

```bash
[root@localhost nginx]# systemctl status nginx
```





![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/42915933fc834abd864aaae0884271b7.png)



### 2.5 查看 nginx 树形目录结构



```bash
tree /etc/ansible/roles/nginx
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/6dad4ece07df4963b6a7a0f806389915.png)



这里完整的一个使用Roles部署nginx服务就完成了；



## 三、相关文章
|                           文章标题                           |                           文章链接                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| [Ansible自动化运维（一）简介及部署、清单](https://liucy.blog.csdn.net/article/details/133769300) | [https://liucy.blog.csdn.net/article/details/133769300](https://liucy.blog.csdn.net/article/details/133769300) |
| [Ansible自动化运维（二）ad-hoc 模式详解](https://liucy.blog.csdn.net/article/details/133772023) | [https://liucy.blog.csdn.net/article/details/133772023](https://liucy.blog.csdn.net/article/details/133772023) |
| [Ansible自动化运维（三）Playbook 模式详解](https://liucy.blog.csdn.net/article/details/133899966) | [https://liucy.blog.csdn.net/article/details/133899966](https://liucy.blog.csdn.net/article/details/133899966) |
| [Ansible自动化运维（四）jinja2 模板、Roles角色详解](https://liucy.blog.csdn.net/article/details/133994509) | [https://liucy.blog.csdn.net/article/details/133994509](https://liucy.blog.csdn.net/article/details/133994509) |









