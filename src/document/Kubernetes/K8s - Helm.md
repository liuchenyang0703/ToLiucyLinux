---
title: K8s - Helm管理工具
icon: circle-info
order: 1
category:
  - Linux
  - kubernetes
tag:
  - Linux
  - kubernetes
  - Helm
  - 运维
pageview: false
date: 2026-7-6
comment: false
breadcrumb: false
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


## 一、简介
### 1.1 Helm是什么?
Helm 是 `Kubernetes` 的包管理工具，其作用类似于 Linux 操作系统中的 `apt`或`yum`，它通过将相关资源打包为 **Chart**，有效解决了管理大量 YAML 文件、多环境配置以及版本控制等问题，从而简化了 Kubernetes 应用的部署、管理与复用流程。

* 对于应用发布者而言，可以通过 Helm 打包应用、管理应用依赖关系、应用版本并发布应用到软件仓库。
* 对于使用者而言，使用 Helm 后不需要在编写复杂的应用部署yaml文件，可以以简单的方式在 Kubernetes 上查找、安装、升级、回滚、卸载应用程序。

Helm 是一个由 **CNCF**（云原生计算基金会）管理的毕业项目，目前是由 [Helm 开源社区](https://github.com/helm/community) 进行维护的。

**CNCF**，全称 **Cloud Native Computing Foundation**（云原生计算基金会），是一个致力于推动云原生技术普及与可持续发展的开源软件基金会。

> Helm相关官网、文档：[Helm 官网](https://helm.sh/) | [Helm 中文官网](https://helm.sh/zh/) | [Helm 官方源码](https://github.com/helm/helm) | [Helm 官方文档](https://helm.sh/docs/intro/) | [Helm 官方中文文档](https://helm.sh/zh/docs/intro/)


### 1.2 Helm 核心概念

| 概念 | 说明 | 类比（以 apt/yum 为例） |
| :--- | :--- | :--- |
| **Chart** | 一组描述 Kubernetes 应用的文件集合，包含了部署应用所需的全部模板和配置信息 。 | **软件包**（如 `.deb` 或 `.rpm` 文件） |
| **Repository** | 用于共享和分发 Chart 的仓库，你可以从中搜索和下载别人打包好的应用 。 | **软件源**（如 Ubuntu 的软件仓库） |
| **Release** | Chart 在 Kubernetes 集群中运行的一个实例。一个 Chart 可以被多次安装，生成多个不同的 Release 。 | **运行中的进程/服务** |

> 简单来说，Helm 就是在仓库中查找 Chart，然后将它以Release 的形式安装到集群中，生成一个或多个 Release。

## 二、安装 Helm 客户端
Helm V3 客户端是独立的，安装后可直接与 Kubernetes API Server 交互，无需在集群中安装 Tiller 服务端 。

### 2.1 二进制部署
二进制包下载地址：[ https://github.com/kubernetes/helm/releases](https://github.com/kubernetes/helm/releases)
3.8.0版本下载地址直达1：[https://github.com/helm/helm/releases/tag/v3.8.0](https://github.com/helm/helm/releases/tag/v3.8.0)
3.8.0版本下载地址直达2：[https://get.helm.sh/helm-v3.8.0-linux-amd64.tar.gz](https://get.helm.sh/helm-v3.8.0-linux-amd64.tar.gz)

选择对应平台，点击进行下载，或右击 [复制链接地址](https://get.helm.sh/helm-v3.8.0-linux-amd64.tar.gz) 在服务器上`curl或wget`下载。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241748128.png)

下载完成后上传到服务器上
```bash
# 解压二进制安装包
tar xf helm-v3.8.0-linux-amd64.tar.gz

# 复制 helm 二进制文件 到bin目录下
cp -ar linux-amd64/helm /usr/local/bin/

# 验证安装，确认版本号
helm version
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241748062.png)

### 2.2 官方脚本部署
使用脚本`get-helm-3`，安装的默认就是3.0最新的版本，以此类推，`get-helm-4`，安装的就是4.0最新的版本，**暂时不推荐**，因为可能会遇到和`kubernetes`版本冲突问题；
```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```
*   **验证安装**:
```bash
helm version
```

## 三、Helm 客户端的配置
### 3.1 启用命令补全

```bash
# 临时启用
source <(helm completion bash)

# 永久启用
echo 'source  <(helm completion bash)' >> ~/.bashrc
```

### 3.2 添加仓库与搜索应用
安装完成后，就可以添加公共仓库来查找需要的应用了。

```bash
# 1. 添加常用公开仓库
helm repo add bitnami https://charts.bitnami.com/bitnami  # 常用应用仓库
helm repo add stable http://mirror.azure.cn/kubernetes/charts  # 稳定版仓库
helm repo add aliyun https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts  # 阿里云仓库
helm repo add incubator https://charts.helm.sh/incubator  # 孵化版仓库
 
# 2. 更新仓库索引（获取最新 Chart 列表）
helm repo update
# 3. 查看已添加仓库
helm repo list
# 4. 删除无用仓库（如删除 incubator）
helm repo remove incubator
# 5. 搜索仓库中可安装的 Chart 【即软件包】列表（如搜索 stable 仓库的 Chart）
helm search repo stable
# 6. 在所有仓库中搜索 nginx 相关Chart
helm search repo nginx
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241746517.png)

## 四、Helm 命令及参数详解
* Helm 基础命令结构

```bash
helm [命令] [参数] [标志]
```

### 4.1 常用命令及参数详解
#### 4.1.1 helm repo - 仓库管理

```bash
# 添加仓库
helm repo add [名称] [URL]
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add stable https://charts.helm.sh/stable --force-update

# 参数说明：
# --force-update    : 强制更新已存在的仓库
# --username        : 私有仓库用户名
# --password        : 私有仓库密码
# --ca-file         : CA 证书文件
# --cert-file       : 证书文件
# --key-file        : 密钥文件

# 更新已添加所有仓库索引
helm repo update
# --fail-on-repo-not-found : 仓库不存在时报错

# 列出所有已添加的仓库
helm repo list
# -o, --output : 输出格式 (table|json|yaml)

# 删除仓库
helm repo remove [名称]

# 列出指定仓库下所有 charts
helm search repo [仓库名称]
# 在所有仓库中搜索匹配的 charts
helm search repo [软件名称]
# 指定仓库中搜索匹配的 charts
helm search repo [仓库名称/软件名称]
# 如下参数上面三条命令通用
# --versions       : 显示所有版本
helm search repo [仓库名称/软件名称] --versions
# --version        : 指定版本号或版本范围（范围必须配合--versions使用）
helm search repo [仓库名称/软件名称] --version [chart的版本号]
helm search repo [仓库名称/软件名称] --version [>=chart的版本号范围]
# -l, --devel      : 包含开发版本
helm search repo [仓库名称/软件名称] -l 
# --max-col-width  : 最大列宽
helm search repo [仓库名称/软件名称] --max-col-width 100
```
#### 4.1.2 helm search - 搜索 Chart

```bash
# 搜索中心仓库
helm search hub [软件名称]
## 搜索中心仓库中的nginx，并显示列宽为50
helm search hub nginx --max-col-width 50

# 搜索已添加的仓库
helm search repo [软件名称]|[仓库名称/软件名称]
# 示例
## 搜索bitnami仓库中所有的nginx包，并显示所有版本号
helm search repo bitnami/nginx --versions
## 搜索bitnami仓库中的nginx包，并指定版本号（chart版本号）
helm search repo bitnami/nginx --version "14.2.2"
## 搜索bitnami仓库中的nginx包，并指定版本范围（chart版本号）范围必须带--versions；
helm search repo bitnami/nginx --versions --version ">=14.0.0"
## 搜索bitnami仓库中所有的nginx包，并显示所有版本号，包含开发版本
helm search repo bitnami/nginx -l
## 搜索bitnami仓库中最新的nginx包并展示为100的列宽
helm search repo bitnami/nginx --max-col-width 100

# 参数详解：
# --versions       : 显示所有版本号
# --version        : 版本匹配（支持范围：>=1.2.3，必须配合--versions使用）
# --max-col-width  : 所搜结果展示的列宽
# -l, --devel      : 包含预发布版本（alpha, beta）
# -r, --regexp     : 使用正则表达式匹配
# --failed-parses  : 显示解析失败的条目
```
> **注意**：`helm search hub` 和 `helm search repo` 的参数不是所有通用的；
> 只有 `--output` (`-o`)、`--max-col-width` 和 `--fail-on-no-result` 这类控制输出格式和行为的参数，两者是都支持的。

* **`helm search hub` 和 `helm search repo` 的区别**：

| 对比项 | `helm search hub` | `helm search repo` |
|--------|------------------|-------------------|
| **搜索范围** | Helm Hub（中央仓库网站） | 本地已添加的仓库 |
| **是否需要网络** | ✅ 必须联网 | ✅ 必须联网（首次/更新后） |
| **是否需要添加仓库** | ❌ 不需要 | ✅ 必须已添加 |
| **结果来源** | 全球所有公共 charts | 仅你添加的仓库 |
| **是否支持版本过滤** | ❌ 不支持 | ✅ 支持 |
| **速度** | 较慢（在线API查询） | 较快（本地缓存） |
| **离线可用** | ❌ 不可用 | ✅ 可用（有缓存时） |


#### 4.1.3 helm pull - 下载 Chart
* 基本语法

```bash
helm pull [Repository/chart] [参数]
helm pull [仓库名称/软件名称] [参数]
```
*  示例
```bash
# 下载最新版本nginx chart
helm pull bitnami/nginx
# 下载指定版本的nginx并解压；（不会下载tar包，会直接解压）
# 14.2.2为chart的版本号，需要先search进行查询需要的nginx版本号所对应的chart版本号
helm pull bitnami/nginx --version 14.2.2 --untar
# 下载指定版本的nginx并解压到指定目录；（不会下载tar包，会直接解压）
helm pull bitnami/nginx --version 14.2.2 --untar --untardir /data/helm/
# 指定仓库下载nginx指定版本
helm pull nginx --repo https://charts.bitnami.com/bitnami --version 14.2.2

# 参数：
--version        # 指定版本
--untar          # 下载后解压
--untardir       # 解压目标目录（默认当前目录）
--repo           # 指定下载仓库地址
--verify         # 验证签名
--prov           # 获取 provenance 文件
```

#### 4.1.4 helm install - 安装 Chart
* 基本语法

```bash
helm install [Release] [Repository/chart] [参数]
helm install [实例名称] [仓库名称/软件名称] [参数]
```


| 位置 | 作用 | 说明 |
|------|------|------|
| `[名称]` | Release 名称 | 给这次安装起的名字，后续升级、回滚、卸载都用这个名字 |
| `[Chart]` | Chart 来源 | 告诉 Helm 去哪里找安装包 |
| `[参数]` | 配置选项 | 调整安装行为、覆盖默认配置 |

* 常见用法示例
	* 四种安装方法

```bash
# 从仓库中安装
## 在bitnami仓库中查找nginx服务包并安装，实例名称命名为：my-nginx
## Helm会去 ~/.config/helm/repositories.yaml 找到bitnami对应的URL，然后下载nginx
helm install my-nginx bitnami/nginx
helm install my-nginx bitnami/nginx --version=14.2.2

# 从本地安装（需要先使用pull下载到本地/解压）
## 安装本地下载的nginx chart压缩包,实例名称为：my-nginx-local-tar
## 常用于：分发、离线安装、从别人那里获取的Chart包
helm install my-nginx-local-tar ./nginx-14.2.2.tgz
## 安装本地下载解压的nginx chart，实例名称命名为：my-nginx-local
## 常用于：开发调试、离线安装、自定义修改后的Chart
helm install my-nginx-local ./nginx

# 从URL安装（需直接指定tgz压缩包文件）
## 自定义写的chart，比如上传到github或者是oss里，然后通过这个连接去进行下载
## Helm会先下载这个文件，然后再安装
helm install my-nginx-url https://charts.bitnami.com/bitnami/nginx-14.2.2.tgz
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241746082.png)

* 重要参数详解：

> 通过 `--set` 等参数，可以修改 Chart 中 `values.yaml` 文件的默认配置（临时修改，不会影响`values.yaml`中的值）。例如，`image` 对象下包含 `tag` 和 `repository` 两个字段。在 `helm install` 命令中，使用点符号（`.`）即可定位并设置这些字段，具体写法为 `--set image.tag=v1.0` 和 `--set image.repository=nginx`。
> Chart详情可查看：[五、Chart 详解](#chart)

```bash
# --set             : 设置值（支持多个）	
## 设置单个值：在安装的时候修改副本数
helm install my-nginx-set-1 ./nginx --set replicaCount=3
## 设置多个值：在安装的时候修改镜像仓库地址、镜像名称、镜像tag、探针检测端口
helm install my-nginx-set-2 ./nginx --set image.registry="" --set image.repository=nginx --set image.tag=1.25.0 --set containerPorts.http=80
## 修改创建完可使用：kubectl get pods -o wide 进行查看是否更改成功；
## 不需要看helm创建成功之后输出的提示，没有waring就不需要看，因为他读取的还是chart的元数据，所以使用set修改，显示的一直是元数据；

# --namespace (-n)  : 指定命名空间
# --create-namespace : 自动创建命名空间
## helm list查看的时候也需要使用-n指定命名空间或直接-A查看全部实例
helm install my-nginx-ns ./nginx -n my-nginx --create-namespace 

# --values (-f)     : 指定 values 文件（支持多个）
## 指定多个 values 文件，不会冲突，它们会按照顺序合并（后面的覆盖前面的）。
helm install my-app ./chart -f values-prod.yaml -f extra-values.yaml

# --set-string      : 强制设为字符串
helm install my-app ./chart --set-string env=production

# --set-file        : 从文件读取值
helm install my-app ./chart --set-file config=./config.yaml

# --set-json        : 使用 JSON 格式设置值
helm install my-app ./chart --set-json 'labels={"env":"prod"}' 

# --dry-run         : 模拟安装，不实际执行
# --debug           : 显示详细调试信息
helm install my-nginx-moni ./nginx --dry-run --debug

# --timeout         : 超时时间（默认 5m），一般组合使用
helm install my-nginx-timeout ./nginx --timeout 10m

# --wait            : 等待所有资源就绪
helm install my-nginx-wait ./nginx --wait --timeout 5m

# --atomic          : 安装失败时自动回滚
## 安装失败时进行回滚，成功则结束
helm install my-nginx-atomic ./nginx --set image.tag=1.25.0 --atomic
## 安装超过1分钟没有完成算是失败，进行回滚；
helm install my-nginx-atomic ./nginx --set image.tag=1.25.0 --timeout 1m --atomic

# --verify          : 验证包签名
helm install my-app ./chart --verify

# --no-hooks        : 跳过 hooks 执行
# 作用是不执行 Chart 中定义的 hooks（如 pre-install、post-install）
helm install my-app ./chart --no-hooks

# --replace         : 重新创建已删除的 release
helm install my-nginx-wait ./nginx --replace

# --disable-openapi-validation : 禁用 OpenAPI 验证
# 作用是跳过 Kubernetes API 的 OpenAPI 验证
# 适用于使用自定义 CRD、测试未正式发布的 API
helm install my-app ./chart --disable-openapi-validation
```

#### 4.1.5 helm history - 版本历史
* 基本语法

```bash
helm history [Release名称] [参数]
```

* 示例及参数详解

```bash
# 查看名为：my-nginx-set-1 的安装、更新历史记录
helm history my-nginx-set-1

# 参数：
# --max            : 最大显示行数
helm history my-nginx-set-1 --max 10

# -o, --output     : 输出格式
helm history my-nginx-set-1 -o json
```



#### 4.1.6 helm upgrade - 升级/更新
* 基本语法

```bash
helm upgrade [Release名称] [Chart] [标志]
```
* 重要参数详解：
> `upgrade`主要是更新或升级已安装的`Release`；
```bash
# --set             : 设置值（支持多个）	
## 更新名为 my-nginx-set-1 的副本数，改成2个
helm upgrade my-nginx-set-1 ./nginx --set replicaCount=2

# --install (-i)    : 如果 release 不存在则安装
helm upgrade my-nginx-install-set ./nginx -i --set replicaCount=2

# --history-max     : 保存的最大历史版本数（默认10条）
helm upgrade my-nginx-install-set ./nginx --history-max 10

# --cleanup-on-fail : 更新失败后清理新创建资源（但不会回退）
helm upgrade my-nginx-install-set ./nginx --set image.tag=test --cleanup-on-fail

# --force           : 强制更新即使有冲突
# --reset-values    : 重置为 Chart 默认 values
# --reuse-values    : 复用上一版本的 values

# 其他同 install 的参数：
# --set, -f, --dry-run, --wait, --timeout, --atomic, --debug
```
#### 4.1.7 helm rollback - 回滚
* 基本语法

```bash
helm rollback [Release名称] [history查看的版本号] [参数]
```
* 示例及参数详解

> 回滚前可以使用`helm history`查看，并确定要回滚的版本号（没有数据可以通过更新等操作制造点数据版本号）；

```bash
# 回滚到上一版本
helm rollback my-nginx-set
# 回滚 my-nginx-set 到版本 1
helm rollback my-nginx-set 1

# 参数：
# --wait            : 等待资源就绪
helm rollback my-app 2 --wait --timeout 5m

# 其他参数使用和install、upgrade相同
# --cleanup-on-fail : 失败时清理
# --force           : 强制回滚
# --recreate-pods   : 重建 Pods
# --no-hooks        : 跳过 hooks
# --dry-run         : 模拟回滚
```
#### 4.1.8 helm uninstall - 卸载
* 基本语法

```bash
helm uninstall [Release名称] [参数]
```
* 示例及参数详解

```bash
# 卸载一个Release
helm uninstall my-nginx-install-set-2
# 卸载多个Release
helm uninstall my-nginx-install-set-2 my-nginx-set-1

# --keep-history    : 保留历史记录
## 不会真正的删除，历史记录和Release还是会保留的，直接helm list也是看不到的，可以通过helm list --uninstalled看到
## 如何恢复？可以先使用history查看要恢复的版本，然后在使用rollback回退
helm uninstall my-nginx-set --keep-history

# --dry-run         : 模拟卸载
# --no-hooks        : 跳过 hooks
```
#### 4.1.9 helm list - 列出 Releases
* 基本语法

```bash
helm list [参数]
```
* 常用参数详解
```bash
# ========== 范围筛选 ==========
# --all (-a)        : 显示所有 release（包括已卸载 [保留历史记录的]）
# 只能查看当前默认命名空间的所有release（包括已卸载 [保留历史记录的]）
helm list --all
helm list -a
# --all-namespaces (-A)：显示所有命名空间的 release
helm list -A
## 查看所有命名空间及已卸载[保留历史记录的]的所有release
helm list -aA
# --namespace (-n)  : 指定命名空间
helm list -n my-nginx


# ========== 状态筛选 ==========
# --deployed        : 仅显示已部署的（默认）
helm list -A --deployed
# --failed          : 仅显示失败的
helm list -A --failed
# --pending         : 仅显示等待中的
helm list -A --pending
# --uninstalled     : 仅显示已卸载的（保留历史记录的）
helm list -A --uninstalled
# --superseded      : 仅显示已被替代的
helm list -A --superseded


# ========== 输出控制 ==========
# --max (-m)        : 限制返回数量（默认 256）
## 查看所有release包括已卸载[保留历史记录的]的并返回2条数据
helm list -A --max 2
# --offset          : 分页偏移量（配合 --max 使用）
helm list -A --max 10 --offset 20

# -q, --short       : 只显示名称
helm list -Aq

# -o, --output      : 输出格式 (table|json|yaml)
helm list -Ao json


# ========== 排序筛选 ==========
# -d, --date        : 按日期排序
helm list -Ad
# -r, --reverse     : 反向排序
helm list -Ar


# ========== 高级筛选 ==========
# --filter (-f)     : 正则表达式过滤
helm list -Af "my-nginx*"

# --selector (-l)   : 标签选择器
## 筛选带有 app=nginx 标签的 Release
helm list -aAl "app=nginx"
```
#### 4.1.10 helm status - 查看状态
* 基本语法

```bash
helm status [Release名称] [参数]
```

* 示例及参数详解

```bash
# 查看 my-nginx-set 的状态
helm status my-nginx-set

# --revision        : 查看特定版本
helm status my-nginx-set --revision 3

# --show-resources  : 显示资源清单
helm status my-nginx-set --show-resources

# -o, --output      : 输出格式 (table|json|yaml)
helm status my-nginx-set -o json
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241746744.png)

#### 4.1.11 helm get - 获取信息
* 基本语法

```bash
helm get [子命令] [Release名称] [参数]
```
* 子命令
```bash
# get all          : 获取所有信息
# 一次性获取 Release 的所有信息
helm get all my-nginx-install-set

# get hooks        : 获取 hooks
# 查看 Release 定义的 hooks（在特定时间点执行的任务，如数据库迁移）
helm get hooks my-nginx-install-set

# get manifest     : 获取生成的 K8s 资源 YAML
# 查看 Helm 根据 Chart 模板和 values 生成的最终 Kubernetes YAML 文件
helm get manifest my-nginx-install-set

# get notes        : 获取安装说明
# 获取 Chart 作者写的使用说明（就是 helm install 成功后显示的那段话）
helm get notes my-nginx-install-set

# get values       : 获取 values 配置
helm get values my-nginx-install-set
```
* 参数详解

```bash
# --revision (-r)   : 指定版本号
helm get manifest my-nginx-install-set --revision 2

# --all (-a)        : 显示所有 values（包括默认值）  - 仅对 get values 有效
helm get values my-nginx-install-set --all
# --output (-o)     : 输出格式 (table|json|yaml)
helm get values my-nginx-install-set --all -o yaml
```
#### 4.1.12 helm test - 运行测试

> 对一个已经运行的`Release`进行测试，验证其功能是否正常。测试内容由Chart开发者预定义在`templates/tests/`目录中。<br>
> **其他说明：**
> 1. **测试前提**：`Release` 必须已成功部署且状态为 `deployed`，否则无法测试。
> 2. **测试结果**：`helm test` 会启动测试 Pod，并报告其执行结果（成功/失败）。如果 Chart 未定义测试，会返回 `TEST SUITE: None`。
> 3. **自定义测试**：你可以在 Chart 的 `templates/tests/` 目录下编写测试 Pod 的 YAML 文件，定义业务验证逻辑（如连通性、接口状态等）。
> 4. **典型场景**：常用于 CI/CD 流水线，在部署后自动运行冒烟测试，验证应用是否健康可用。

* 语法

```bash
helm test [Release名称] [参数]
```
* 示例及参数详解
```bash
helm test my-nginx-install-set
helm test my-nginx-install-set --logs --timeout 5m

# 参数：
--logs        # 显示测试 Pod 日志
--timeout     # 超时时间
```

### 4.2 自定义 Chart 命令及参数详解

> 再看 `自定义 Chart 命令及参数详解` 之前，可以先了解一下Chart都有什么内容，每个文件都是干什么的：[五、Chart 详解](#chart)
#### 4.2.1 helm create - 创建 Chart
```bash
# 命令
helm create [路径/chart名称] [参数]

# 示例
## 创建一个名为test的chart，默认模板为nginx
helm create test
## 创建一个名为test2的chart，模板使用wordpress（需本地存在此模板）
helm create ./test2 --starter wordpress

# 参数：
--starter string   # 使用指定的 starter 模板
# 前提是本地的starters里必须存在这个模板
# 此参数的逻辑是：让 Helm 复制一个预先定义好的、名为 wordpress 的 Starter 模板，来生成新的 Chart 
# 如图这个模板不存在就会报错：Error: could not load /root/.local/share/helm/starters/wordpress: stat /root/.local/share/helm/starters/wordpress: no such file or directory
```
#### 4.2.2 helm dependency - 依赖管理
* 语法

```bash
helm dependency [子命令] [路径/chart名称] [参数]
```
* 子命令

| 子命令 | 命令解析 |
| :--- | :--- |
| `dependency update` | **更新依赖**：根据 `Chart.yaml` 中的声明，下载或更新依赖到 `charts/` 目录 |
| `dependency list` | **列出依赖**：显示当前 Chart 的依赖列表及其状态（`ok`/`missing`/`wrong version`） |
| `dependency build` | **重建依赖**：基于 `Chart.lock` 文件（而非 `Chart.yaml`）重建 `charts/` 目录 |


* 示例

```bash
# 添加依赖到Chart.yaml中，根据 Chart.yaml 中的声明，下载或更新依赖到 charts/ 目录 
helm dependency update./test
# 列出刚刚添加的依赖，依赖的路径一般是再chart/charts里
helm dependency list ./test

# build 与 update 的区别：
# - update：根据 Chart.yaml 拉取最新兼容版本，并更新 Chart.lock 文件
# - build：严格根据 Chart.lock 锁定的版本进行重建，用于确保环境一致性
# 日常开发使用 update 即可，build 通常在 CI/CD 流水线中使用
```

#### 4.2.3 helm template - 本地渲染模板
> helm template - 本地渲染模板并输出最终的 Kubernetes YAML 资源清单，但不会真正部署到集群。
> 简单来说就是一个类似于预览的功能，一般再自定义chart中进行调试、预览资源配置、验证values效果等可以用到。

* 语法

```bash
helm template [Release名称] [Chart路径或名称] [参数]
```
* 常用示例
```bash
# 基础用法：渲染本地 Chart
helm template my-app ./test

# 渲染时覆盖 values 配置（不会真正修改）
helm template my-app ./test --set replicaCount=3

# 使用自定义 values 文件
helm template my-app ./test -f my-values.yaml

# 只渲染特定资源（如只输出 Deployment）
helm template my-app ./test --show-only templates/deployment.yaml

# 调试模式：显示所有信息，包括渲染的变量
helm template my-app ./test --debug

# 从远程仓库渲染（需先添加仓库）
helm template my-app bitnami/nginx --set replicaCount=2
```

#### 4.2.4 helm lint - 检查 Chart
* 语法

```bash
helm lint [Chart路径或名称] [参数]
```

* 参数及示例

```bash
# 参数：
--strict      # 严格模式，警告也当作错误
--values      # 指定 values 文件验证


# 示例
helm lint ./test
helm lint ./test --strict --values prod.yaml
```

#### 4.2.5 helm verify - 验证签名
> 验证一个已打包的 Chart（.tgz 文件）的数字签名，用于确认其完整性（未被篡改）和来源（由可信方打包）。


* 语法
```bash
helm verify [CHART路径] [参数]
```

* 示例及参数详解

```bash
# 验证一个本地 Chart 包
helm verify test-0.1.0.tgz

# 指定公钥环（keyring）进行验证
helm verify test-0.1.0.tgz --keyring ~/.gnupg/pubring.gpg

# 参数：
--keyring string   # 包含公钥的 keyring 文件路径，默认是 ~/.gnupg/pubring.gpg [citation:1]
```

#### 4.2.6 helm package - 打包 Chart
> `helm package` 命令会将一个 Chart 目录打包成一个 `.tgz` 格式的压缩文件，这是 Helm Chart 的标准分发格式。
> **文件命名规则**：`{Chart名称}-{Chart版本号}.tgz`
> **包含内容**：Chart 目录下的所有文件（`Chart.yaml`、`values.yaml`、`templates/`、`charts/` 等）

* 语法

```bash
helm package [Chart路径或名称] [参数]
```
* 参数

| 参数 |参数解析  |
|--|--|
|`--destination (-d) `  | 输出目录 |
| `--version` |设置 Chart 版本  |
| `--app-version` |  设置应用版本|
| `--sign` |使用 PGP 私钥签名  |
| `--key` | 签名密钥名称|

* 示例
```bash
# 将test的Chart打包，打包格式为：{Chart名称}-{Chart版本号}.tgz
helm package ./test
# 将test的Chart打包并指定版本号然后放到指定目录
helm package ./test --version 1.2.3 -d ./output
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608241746305.png)

#### 4.2.7 helm show - 查看 Chart 信息
> 既可以查看打包好的 `.tgz` 文件，也可以查看未打包的 `Chart 目录`，还可以查看远程仓库中的 Chart；
> 核心作用是展示 Chart 的元数据、配置和文档内容。

* 语法

```bash
helm show [子命令] [Chart路径/Chart压缩包/仓库名/Chart名]
```

* 子命令

|子命令  |解析  |
|--|--|
|`show all`  |  显示所有信息（chart + values + readme）|
| `show chart` |显示 Chart.yaml 的元数据内容  |
| `show values` | 显示默认 values.yaml 配置 |
| `show readme` |  显示 README.md 文档内容|
| `show crds`  |显示 Chart 中包含的 CRD（自定义资源定义）清单|


* 示例

```bash
# 查看名为test的Chart压缩包的所有信息
helm show all output/test-1.2.3.tgz

# 查看名为test的Chart的配置 - Chart.yaml，格式化输出（进行标准排序、去除注释）
helm show chart test

# 查看名为test的Chart的values配置，全部输出包含注释
helm show values test-0.1.0.tgz

# 查看名为nginx的远程仓库的README
helm show readme bitnami/nginx

# 查看名为test的crds信息（需 Chart 内包含 crds/ 目录）
helm show crds test
```
#### 4.2.8 helm registry - 登录/登出仓库
> 用于登录或登出支持 OCI 协议的 Chart 仓库，是执行 `helm push` 或 `helm pull` 私有 Chart 前的身份认证步骤。<br>
> **存储位置**：登录成功后，凭证会被保存在操作系统的本地凭证存储中（如 Linux 的 `~/.docker/config.json`），下次执行 `helm push/pull` 时无需重复登录。

* 语法
```bash
# 登录
helm registry login [仓库地址] [参数]
# 登出
helm registry logout [仓库地址] [参数]
```

* 参数

| 参数 | 作用 |
| :--- | :--- |
| `--username` / `-u` | 指定用户名 |
| `--password` / `-p` | 指定密码（不推荐直接写在命令中，建议使用环境变量 `HELM_REGISTRY_PASSWORD`） |
| `--insecure` | 跳过 TLS 证书校验（仅适用于测试环境） |


* 示例

```bash
# 登录一个 OCI 仓库（用户名密码方式）
helm registry login oci://registry.example.com --username=admin --password=123456

# 登录时指定密码（或通过环境变量传递）
helm registry login oci://registry.example.com -u admin -p $REGISTRY_PASSWORD

# 登录时跳过 TLS 证书验证（用于测试环境）
helm registry login oci://registry.example.com --insecure

# 登出该仓库
helm registry logout oci://registry.example.com

# 登录阿里云 ACR 仓库（示例）
helm registry login oci://registry.cn-hangzhou.aliyuncs.com -u 阿里云账号

# 登录 Harbor 仓库（示例）
helm registry login oci://harbor.example.com -u admin -p Harbor12345
```


#### 4.2.9 helm push - 推送 Chart 到远程
> 主要用于将已经打好的`.tgz`包上传到一个支持 OCI 协议的远程 Chart 仓库中（比如阿里云 ACR、Harbor、Red Hat Quay 等）；
> 上传成功后，其他人或团队就可以通过 `helm pull` 或 `helm install` 从该仓库获取和使用这个 Chart 了。<br>
> 推送远程前需要进行`helm registry login`登录仓库。

* 语法
```bash
helm push [Chart压缩包] [目标仓库地址] [参数]
```

* 示例

```bash
# 将打包好的 Chart 推送到 OCI 仓库
helm push test-0.1.0.tgz oci://registry.example.com/helm-charts
```

* 重要说明

> 1. **登录要求**：在执行 `helm push` 前，需要先用 `helm registry login` 命令登录目标仓库，以完成身份认证。
> 2. **仓库格式**：目标仓库地址需使用 `oci://` 作为协议前缀。

### 4.3 helm plugin - 插件管理
> `helm plugin` 是 Helm 的**插件管理命令**，用于为 Helm CLI 添加额外功能，从而扩展其原生能力。可以将它理解为 Helm 的“**应用商店**” 或 “**扩展中心**”。

* 核心概念和用途

> Helm 插件是一种可以独立安装和卸载的扩展工具，它与 Helm CLI 无缝集成，让你能够执行原生命令之外的自定义操作。这些插件可以用任何编程语言编写，非常灵活。
> *   **扩展功能**：实现 Helm 原生不支持的工作流，例如与特定密钥管理系统的集成。
> *   **自定义协议**：允许通过 `myprotocol://` 这样的自定义协议来下载 Chart，适用于有特殊获取来源的场景。
> *   **共享与复用**：你可以将自己的插件分享给团队或社区，常见的插件可以在 GitHub 或 Artifact Hub 上找到。

* 语法

```bash
helm plugin [子命令] [插件名称或安装源] [参数]
```
* 子命令

| 子命令 | 功能 | 示例 |
| :--- | :--- | :--- |
| **`helm plugin install`** | 安装一个或多个插件。可以从 **VCS 仓库地址（如 GitHub）** 或 **本地路径** 安装。 | `helm plugin install https://github.com/example/helm-myplugin.git` |
| **`helm plugin list`** | 列出当前已安装的所有插件及其基本信息。 | `helm plugin list` |
| **`helm plugin uninstall`** | 卸载一个或多个已安装的插件。 | `helm plugin uninstall myplugin` |
| **`helm plugin update`** | 升级一个或多个已安装的插件到最新版本。 | `helm plugin update myplugin` |

* 插件的存储与结构

安装的插件默认存储在 `$(helm home)/plugins` 目录下（在 Helm v3 中，`$(helm home)` 通常指向 `~/.config/helm`）。

每个插件子目录下必须包含一个 `plugin.yaml` 文件，这是插件的核心定义文件，其中声明了插件的**名称、版本、使用说明和可执行命令**等关键信息。

* 安全提示

安装第三方插件时，请注意安全风险。一些插件（如“子进程运行时”）拥有与你执行命令的用户相同的系统访问权限。建议在安装前仔细审查插件代码，对于 Helm v4，社区也在探索使用更安全的沙箱环境（如 WASM）来运行插件。

### 4.4 helm env - 环境信息
* 命令

```bash
helm env
```
* 输出示例

```bash
HELM_BIN="helm"
HELM_CACHE_HOME="/root/.cache/helm"
HELM_CONFIG_HOME="/root/.config/helm"
HELM_DATA_HOME="/root/.local/share/helm"
HELM_DEBUG="false"
HELM_KUBEAPISERVER=""
HELM_KUBEASGROUPS=""
HELM_KUBEASUSER=""
HELM_KUBECAFILE=""
HELM_KUBECONTEXT=""
HELM_KUBETOKEN=""
HELM_MAX_HISTORY="10"
HELM_NAMESPACE="default"
HELM_PLUGINS="/root/.local/share/helm/plugins"
HELM_REGISTRY_CONFIG="/root/.config/helm/registry/config.json"
HELM_REPOSITORY_CACHE="/root/.cache/helm/repository"
HELM_REPOSITORY_CONFIG="/root/.config/helm/repositories.yaml"
```

* 主要环境变量解读

| 环境变量 | 说明 | 典型路径 |
| :--- | :--- | :--- |
| `HELM_CONFIG_HOME` | Helm 配置文件存储目录 | `~/.config/helm` |
| `HELM_DATA_HOME` | Helm 数据存储目录（插件、starter 等） | `~/.local/share/helm` |
| `HELM_CACHE_HOME` | Helm 缓存目录（仓库索引等） | `~/.cache/helm` |
| `HELM_PLUGINS` | 插件安装目录 | `~/.local/share/helm/plugins` |
| `HELM_REGISTRY_CONFIG` | OCI 仓库认证配置文件 | `~/.config/helm/registry.json` |
| `HELM_REPOSITORY_CONFIG` | 已添加仓库的配置文件 | `~/.config/helm/repositories.yaml` |
| `HELM_REPOSITORY_CACHE` | 仓库索引缓存目录 | `~/.cache/helm/repository` |
| `HELM_NAMESPACE` | 默认操作的 Kubernetes 命名空间 | `default` |
| `HELM_MAX_HISTORY` | 保存的最大 Release 历史版本数 | `10` |
| `HELM_DEBUG` | 是否开启调试模式 | `false` |
| `HELM_BURST_LIMIT` | Kubernetes 客户端突发请求限制 | `100` |







<div id="chart"> </div>

## 五、Chart 详解


> Chart 是一个包含 Kubernetes 资源模板和配置文件的目录结构，通过参数化实现应用的灵活部署。

> Chart是 资源和软件的定义文件，Charts文件里 需要 声明式的 指定 我们需要哪些软件，版本 以及需要发布的内容，它描述了一组相关的 k8s 集群资源。

### 5.1 Chart 的目录结构

```bash
my-chart/                      # Chart 根目录（名称与Chart名一致）
├── Chart.yaml                 # Chart 元数据文件（必需）
├── values.yaml                # 默认配置文件（必需）
├── values.schema.json         # values.json 校验文件（可选）
├── templates/                 # 模板目录（必需）
│   ├── NOTES.txt              # 安装后显示的说明信息（可选）
│   ├── _helpers.tpl           # 辅助函数定义（可选）
│   ├── deployment.yaml        # Deployment 模板
│   ├── service.yaml           # Service 模板
│   ├── configmap.yaml         # ConfigMap 模板
│   ├── secret.yaml            # Secret 模板
│   ├── hpa.yaml               # HPA 模板
│   ├── ingress.yaml           # Ingress 模板
│   └── tests/                 # 测试模板目录（可选）
│       └── test-connection.yaml
├── charts/                    # 子Chart依赖目录（可选）
│   ├── mysql/                 # 依赖的mysql Chart
│   └── redis/                 # 依赖的redis Chart
├── crds/                      # 自定义资源定义CRD（可选）
│   └── crd.yaml
└── templates/                 
    └── NOTES.txt              # 安装后的帮助信息
```

### 5.2 核心文件详解
#### 5.2.1 Chart.yaml - 包的身份证

```yaml
apiVersion: v2              # Chart API 版本（v1已废弃，用v2）
name: my-app                # Chart 名称（必须与目录名一致）
version: 1.2.3              # Chart 版本（语义化版本）
description: "我的应用"     # 一句话描述
type: application           # application（应用）/ library（库）
appVersion: "2.0.0"         # 实际应用的版本
icon: "https://example.com/icon.png"  # 图标URL

# 维护者信息
maintainers:
  - name: zhangsan
    email: zhangsan@example.com
    url: https://zhangsan.com

# 关键字（用于搜索）
keywords:
  - web
  - nginx

# 依赖关系（v2格式）
dependencies:
  - name: mysql
    version: "8.x.x"
    repository: "https://charts.bitnami.com/bitnami"
    condition: mysql.enabled    # 条件依赖
    tags: ["database"]           # 标签分组
    import-values:               # 导入子Chart的values
      - child: mysql
        parent: db

# 废弃版本
deprecated: false

# 家目录URL
home: "https://github.com/example/my-app"

# 源码仓库
sources:
  - "https://github.com/example/my-app"
```

**字段说明**：

| 字段 | 必需 | 说明 | 默认值 |
|------|------|------|--------|
| `apiVersion` | ✅ 必需 | Chart API 版本，v2 是 Helm 3+ 使用的 | - |
| `name` | ✅ 必需 | Chart 名称，必须与目录名一致 | - |
| `version` | ✅ 必需 | Chart 版本，遵循语义化版本规范 | - |
| `type` | ❌ 可选 | application（应用）或 library（库） | `application` |
| `description` | ❌ 可选 | 一句话描述 | - |
| `appVersion` | ❌ 可选 | 实际应用的版本 | - |
| `icon` | ❌ 可选 | 图标 URL | - |
| `maintainers` | ❌ 可选 | 维护者信息列表 | - |
| `keywords` | ❌ 可选 | 搜索关键词 | - |
| `dependencies` | ❌ 可选 | 依赖的 Chart 列表 | - |
| `deprecated` | ❌ 可选 | 是否已废弃 | `false` |
| `home` | ❌ 可选 | 项目主页 URL | - |
| `sources` | ❌ 可选 | 源码仓库地址列表 | - |
#### 5.2.2 values.yaml - 配置的默认值
这是 Chart 的**配置文件**，定义所有可配置项的默认值。

```yaml
# 副本数
replicaCount: 3

# 镜像配置
image:
  # 镜像仓库地址（可选）
  registry: docker.1ms.run
  # 镜像名称/路径
  repository: nginx
  # 镜像版本标签（指的是具体版本，比如nginx:1.24.0，那么tag就是1.24.0）
  tag: latest
  # 镜像拉取策略，和k8s是一样的，如果本地没有就从仓库拉取，本地有就用本地的
  pullPolicy: IfNotPresent

# 镜像拉取密钥
imagePullSecrets: []
nameOverride: ""
fullnameOverride: ""

# Service配置
service:
  type: ClusterIP
  port: 80
  targetPort: 8080
  annotations: {}

# Ingress配置
ingress:
  enabled: false
  className: nginx
  annotations: {}
  hosts:
    - host: chart-example.local
      paths:
        - path: /
          pathType: Prefix

# 资源配置
resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

# 节点选择器
nodeSelector: {}

# 容忍度
tolerations: []

# 亲和性
affinity: {}

# 环境变量
env:
  - name: ENVIRONMENT
    value: production

# 持久化存储
persistence:
  enabled: true
  size: 10Gi
  storageClass: standard

# Pod注解
podAnnotations: {}

# 安全上下文
securityContext: {}
```
#### 5.2.3 模板文件 (`templates/*.yaml`)

模板使用 **Go Template 语法**，加上 Helm 扩展函数。

##### 基础模板示例 - `deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "my-chart.fullname" . }}
  labels:
    {{- include "my-chart.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      {{- include "my-chart.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "my-chart.selectorLabels" . | nindent 8 }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - containerPort: 80
              name: http
          env:
            {{- toYaml .Values.env | nindent 12 }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
```

##### 模板语法速查

| 语法 | 作用 | 示例 |
|------|------|------|
| `{{ .Values.xxx }}` | 引用 values 值 | `{{ .Values.replicaCount }}` |
| `{{ .Release.Name }}` | Release 名称 | `my-app` |
| `{{ .Chart.Name }}` | Chart 名称 | `my-chart` |
| `{{ .Chart.Version }}` | Chart 版本 | `1.2.3` |
| `{{ .Namespace }}` | 命名空间 | `default` |
| `{{ include "模板名" . }}` | 引用其他模板 | `{{ include "my-chart.labels" . }}` |
| `{{- ... -}}` | 去除空格 | `{{- .Values.name -}}` |
| `{{ if .Values.enabled }}` | 条件判断 | 见下方 |
| `{{ range $i, $e := .Values.list }}` | 循环遍历 | 见下方 |
| `{{ toYaml .Values.config \| nindent 4 }}` | 转为YAML并缩进 | 见下方 |

##### 常用控制结构

```yaml
# 条件判断
{{- if .Values.persistence.enabled }}
volumeMounts:
  - name: data
    mountPath: /data
{{- end }}

# 循环遍历
{{- range .Values.env }}
- name: {{ .name }}
  value: {{ .value }}
{{- end }}

# 定义变量
{{- $fullName := include "my-chart.fullname" . -}}

# 管道操作
{{ .Values.image.tag | default "latest" | quote }}
```

#### 5.2.4 _helpers.tpl - 辅助模板

定义可复用的模板片段，避免重复代码。

```yaml
{{/*
展开 Chart 的完整名称
*/}}
{{- define "my-chart.fullname" -}}
{{- .Release.Name }}-{{ .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
定义通用标签
*/}}
{{- define "my-chart.labels" -}}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
选择器标签
*/}}
{{- define "my-chart.selectorLabels" -}}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
```

#### 5.2.5 NOTES.txt - 安装后提示

安装成功后会显示的内容，指导用户如何使用。

```text
恭喜您成功安装 {{ .Chart.Name }}！

1. 获取服务地址：
  export POD_NAME=$(kubectl get pods --namespace {{ .Release.Namespace }} -l "app.kubernetes.io/name={{ .Chart.Name }}" -o jsonpath="{.items[0].metadata.name}")
  kubectl --namespace {{ .Release.Namespace }} port-forward $POD_NAME 8080:80

2. 访问应用：
  http://localhost:8080

3. 了解更多：
  https://github.com/example/{{ .Chart.Name }}
```
### 5.3 templates 模板中可以使用的内置对象：

| 对象 | 说明 | 示例值 |
|------|------|--------|
| `.Release` | Release 相关信息 | `.Release.Name`、`.Release.Namespace` |
| `.Chart` | Chart.yaml 内容 | `.Chart.Name`、`.Chart.Version` |
| `.Values` | values.yaml + 覆盖值 | `.Values.replicaCount` |
| `.Files` | Chart 中的文件 | `.Files.Get "config.conf"` |
| `.Capabilities` | K8s 集群能力 | `.Capabilities.KubeVersion` |
| `.Template` | 模板执行信息 | `.Template.Name` |

### 5.4 依赖管理

#### 5.4.1 Chart.yaml 中声明依赖

```yaml
dependencies:
  - name: mysql
    version: "9.x.x"
    repository: "https://charts.bitnami.com/bitnami"
    condition: mysql.enabled        # 通过条件控制是否安装
    tags: ["database"]              # 通过标签分组
  
  - name: redis
    version: "16.x.x"
    repository: "https://charts.bitnami.com/bitnami"
    condition: redis.enabled
    tags: ["cache"]
```

#### 5.4.2 依赖命令

```bash
# 更新依赖（下载到 charts/ 目录）
helm dependency update ./my-chart

# 列出依赖
helm dependency list ./my-chart

# 构建依赖（从 Chart.lock 重建）
helm dependency build ./my-chart
```

### 5.5 Chart 操作步骤

#### 5.5.1 创建 Chart
```bash
# 创建一个新 Chart 模板
helm create my-chart

# 创建后自动生成标准目录结构
my-chart/
├── Chart.yaml
├── values.yaml
├── charts/
├── templates/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── hpa.yaml
│   ├── ingress.yaml
│   └── tests/
└── .helmignore
```
#### 5.5.2 自定义 Chart 内容
#### 5.5.3 调试检查
```bash
# 检查 Chart 语法
helm lint ./my-chart

# 本地渲染模板（不安装）
helm template my-release ./my-chart --debug

# 验证 values 是否符合 schema
helm install my-release ./my-chart --dry-run --debug
```
#### 5.5.4 打包安装
```bash
# 打包成 .tgz 文件
helm package ./my-chart

# Helm 在打包时会自动将 Chart 版本号添加到文件名中，格式为：
<Chart名称>-<Chart版本号>.tgz
# 输出：my-chart-1.2.3.tgz

# 安装本地 Chart
helm install my-release ./my-chart-1.2.3.tgz
```


### 5.6 Chart 版本管理

#### 5.6.1 语义化版本规范

```bash
版本格式：主版本号.次版本号.修订号
   v2.1.3
   │ │ │
   │ │ └── 修订号（bug修复，兼容）
   │ └──── 次版本号（新增功能，兼容）
   └────── 主版本号（不兼容的修改）
```

#### 5.6.2 版本约束

```yaml
# Chart.yaml 中的版本约束
dependencies:
  - name: mysql
    version: ">= 8.0.0, < 9.0.0"  # 范围约束
    repository: "https://..."

  - name: redis
    version: "^16.0.0"             # ^16.x.x（兼容16的所有版本）
    repository: "https://..."
```

### 5.7 常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| 渲染后有空行 | 模板中有多余空格 | 使用 `{{- ... -}}` 去除空格 |
| 值类型错误 | 数字被当成字符串 | 用 `--set-string` 或模板中用 `{{ .Values.xxx \| quote }}` |
| 依赖 Chart 不下载 | 没执行 update | `helm dependency update` |
| 命名冲突 | 多个 Release 用相同名称 | 使用 `{{ .Release.Name }}-{{ .Chart.Name }}` |


### 5.8 Chart 总结

| 概念 | 一句话总结 |
|------|-----------|
| **Chart** | 应用的安装包，包含模板和配置 |
| **Chart.yaml** | Chart 的身份证，记录名称、版本、依赖 |
| **values.yaml** | 可配置参数的默认值 |
| **templates/** | 存放 K8s YAML 模板，用 Go Template 语法 |
| **_helpers.tpl** | 可复用的模板片段 |
| **NOTES.txt** | 安装后的使用说明 |
| **charts/** | 存放子 Chart 依赖 |
| **条件+循环** | 实现动态生成 YAML |

**核心思想**：Chart = 模板 + 配置，通过参数化实现一份模板，多环境部署。

