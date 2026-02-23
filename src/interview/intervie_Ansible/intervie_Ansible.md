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

## 1、Ansible常用模块及作用

**核心模块：**

- **command**：执行简单命令（默认模块），不支持管道、重定向和变量
- **shell**：执行复杂shell命令，支持管道、重定向、变量引用
- **copy**：复制文件到远程主机，支持备份、权限设置
- **template**：基于Jinja2模板复制文件，支持变量替换
- **file**：管理文件属性（权限、属主、属组、状态）
- **yum/apt**：包管理，安装、卸载、更新软件包
- **service/systemd**：管理系统服务（启动、停止、重启、开机自启）
- **user/group**：管理用户和组
- **ping**：测试主机连通性
- **setup**：收集目标主机Facts信息
- **fetch**：从远程主机拉取文件到本地
- **lineinfile/replace**：修改文件内容，替换特定行或字符串
- **unarchive**：解压文件，支持远程解压或本地解压后上传
- **git**：从Git仓库克隆代码
- **cron**：管理定时任务
- **mount**：管理挂载点
- **debug**：调试输出，打印变量信息

## 2、什么是Playbooks？简单讲下

Playbooks是Ansible的配置、部署和编排语言，使用**YAML格式**编写。

**核心组成：**
- **Hosts**：目标主机或主机组
- **Variables**：变量定义
- **Tasks**：具体执行的任务列表
- **Handlers**：触发器，由notify调用，用于服务重启等操作
- **Roles**：角色，用于代码复用和结构化组织

**执行特点：** 幂等性（多次执行结果一致）、声明式（描述期望状态）

## 3、shell模块与command模块的区别？

| 特性         | command模块                      | shell模块            |
| ------------ | -------------------------------- | -------------------- |
| **默认模块** | 是（可省略 `-m command`）        | 否                   |
| **执行环境** | 直接执行，不经过shell            | 通过 `/bin/sh` 执行  |
| **特殊字符** | 不支持 `>`, `>>`, `\|`, `;`, `&` | 完全支持             |
| **环境变量** | 不支持 `$HOME`, `$PATH` 等       | 支持                 |
| **安全性**   | 更高，避免shell注入              | 较低，需小心处理变量 |
| **适用场景** | 简单命令，如 `ls`, `cat`         | 复杂命令，管道、脚本 |

**最佳实践：** 能用command就不用shell，避免安全风险。

## 4、要对1000台机器收集内核版本，如何让Ansible以面向过程的方式执行收集这些信息？

**答案：将配置文件中的 `forks` 参数改为 1**

```bash
# ansible.cfg 配置
[defaults]
forks = 1  # 默认是5，改为1表示串行执行
```

**补充说明：**
- **forks参数**：控制并发数，默认5台同时执行
- **面向过程（串行）**：`forks=1` 确保一台执行完再执行下一台
- **动态库存**：1000台机器建议使用动态库存（Dynamic Inventory）配合标签分组
- **优化建议**：大量机器收集信息时，建议使用 `ansible-pull` 模式或 facts缓存

**收集内核版本的Playbook示例：**
```yaml
- hosts: all
  gather_facts: yes
  tasks:
    - name: 收集内核版本
      debug:
        msg: "Kernel: {{ ansible_kernel }}"
```

## 5、如何调试 Ansible Playbook？

**常用调试方法：**

1. **语法检查**
   ```bash
   ansible-playbook playbook.yml --syntax-check
   ```

2. **模拟运行（Dry Run）**
   ```bash
   ansible-playbook playbook.yml --check  # 不实际执行，预测变更
   ansible-playbook playbook.yml --check --diff  # 显示具体差异
   ```

3. **单步调试**
   ```bash
   ansible-playbook playbook.yml --step  # 每个任务前暂停确认
   ```

4. **限制主机范围**
   ```bash
   ansible-playbook playbook.yml --limit host1  # 只在特定主机测试
   ```

5. **详细输出**
   ```bash
   ansible-playbook playbook.yml -v    # 详细
   ansible-playbook playbook.yml -vv   # 更详细
   ansible-playbook playbook.yml -vvv  # 调试级（显示SSH命令）
   ansible-playbook playbook.yml -vvvv # 连接级（显示完整交互）
   ```

6. **使用debug模块**
   ```yaml
   - debug:
       var: variable_name  # 打印变量值
   - debug:
       msg: "Current value is {{ variable_name }}"
   ```

## 6、如何收集目标主机的 Facts 系统信息？

**方法一：使用 setup 模块（Ad-hoc）**
```bash
# 收集所有facts
ansible all -m setup

# 收集特定信息
ansible all -m setup -a "filter=ansible_*_mb"

# 收集网络信息
ansible all -m setup -a "filter=ansible_default_ipv4"
```

**方法二：Playbook中自动收集（默认开启）**
```yaml
- hosts: all
  gather_facts: yes  # 默认开启，可显式声明
  tasks:
    - debug:
        var: ansible_facts  # 查看所有facts
```

**方法三：使用缓存优化（针对大量主机）**
```ini
# ansible.cfg
[defaults]
gathering = smart
fact_caching = jsonfile
fact_caching_connection = /tmp/ansible_facts_cache
fact_caching_timeout = 3600
```

**常用 Facts 变量：**
- `ansible_hostname`：主机名
- `ansible_distribution`：发行版（CentOS/Ubuntu等）
- `ansible_distribution_version`：系统版本
- `ansible_kernel`：内核版本
- `ansible_default_ipv4.address`：默认IP地址
- `ansible_memtotal_mb`：内存总量
- `ansible_processor_vcpus`：CPU核数

## 7、Ansible 的 Roles 目录结构是什么？

```
roles/
├── nginx/
│   ├── tasks/          # 主任务列表（main.yml）
│   ├── handlers/       # 触发器（main.yml）
│   ├── templates/      # Jinja2模板文件
│   ├── files/          # 静态文件
│   ├── vars/           # 变量（优先级高）
│   ├── defaults/       # 默认变量（优先级低）
│   ├── meta/           # 依赖关系
│   └── library/        # 自定义模块
```

## 8、Ansible 如何处理幂等性？
- 大部分模块天然支持幂等性（如yum、copy、file）
- 通过状态检查（如creates、removes参数）避免重复执行
- command/shell模块需手动实现（使用creates文件标记）

## 9、Ansible 与 Puppet/Chef/SaltStack 的区别？
| 特性     | Ansible            | Puppet           | Chef     | SaltStack    |
| -------- | ------------------ | ---------------- | -------- | ------------ |
| 架构     | 无Agent（SSH）     | C/S架构          | C/S架构  | C/S或SSH     |
| 语言     | YAML               | DSL              | Ruby     | YAML/Python  |
| 学习曲线 | 低                 | 高               | 高       | 中           |
| 执行速度 | 中等               | 快               | 快       | 快           |
| 适用场景 | 中小规模、临时任务 | 大规模、严格管控 | 复杂配置 | 大规模、实时 |

## 10、什么是 Ansible Galaxy？
Ansible官方角色仓库，用于分享和下载社区编写的Roles：
```bash
# 安装角色
ansible-galaxy install geerlingguy.nginx

# 从requirements.yml安装
ansible-galaxy install -r requirements.yml
```

