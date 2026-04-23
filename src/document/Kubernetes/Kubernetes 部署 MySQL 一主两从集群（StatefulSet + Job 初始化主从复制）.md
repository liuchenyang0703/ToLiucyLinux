---
title: Kubernetes 部署 MySQL 一主两从集群（StatefulSet + Job 初始化主从复制）
icon: circle-info
order: 1
category:
  - Linux
  - kubernetes
tag:
  - Linux
  - kubernetes
  - StatefulSet
  - 运维
date: 2026-04-15
pageview: true
article: true
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

## 一、准备 MySQL 集群所需 YAML 文件


> 需提前创建好命名空间：`kubectl create ns mysql`
### 1.1 创建 Headless Service 与读服务
* `vi mysql-svc.yaml`

```yaml
# 1. Headless Service - 内部通信
apiVersion: v1
kind: Service
metadata:
  name: mysql
  namespace: mysql
spec:
  clusterIP: None
  publishNotReadyAddresses: true
  selector:
    app: mysql
  ports:
  - port: 3306

---
# 2. 读 Service - 应用读请求
apiVersion: v1
kind: Service
metadata:
  name: mysql-read
  namespace: mysql
spec:
  type: ClusterIP  # 默认，自动分配IP
  selector:
    app: mysql
  ports:
  - port: 3306
```

> 为什么要创建两个 Service：
> `mysql` Headless Service 用于 StatefulSet 成员之间的稳定发现；
> `mysql-read` 用于提供统一访问入口和负载均衡能力。
> 当前示例中 `mysql-read` 会匹配所有 MySQL Pod，如需严格读写分离，还需要为主从实例增加不同标签，并让 `mysql-read` 仅选择从库。
> 对比如下：


| 功能 | 只有 Headless Service | Headless + 读 Service |
|------|----------------------|----------------------|
| **内部 Pod 互相发现** | ✅ 可以 | ✅ 可以 |
| **主从复制配置** | ✅ 可以 | ✅ 可以 |
| **写操作（必须主库）** | ✅ `mysql-0.mysql` | ✅ `mysql-0.mysql` |
| **读操作负载均衡** | ❌ 需要客户端实现 | ✅ `mysql-read` 自动均衡 |
| **运维管理** | ✅ 可以单独访问 | ✅ 可以单独访问 |
### 1.2 创建 MySQL ConfigMap
* `vi mysql-configmap.yaml`
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql-config
  namespace: mysql
data:
  # 主库配置模板
  primary.cnf: |
    [mysqld]
    # ========== 基础配置 ==========
    character-set-server=utf8mb4          # 字符集，支持emoji和中文
    collation-server=utf8mb4_unicode_ci   # 排序规则，大小写不敏感
    
    # ========== 主库特有配置 ==========
    log-bin=mysql-bin      # 开启二进制日志（主从复制的数据源，主库必须开启）
    sync_binlog=1          # 每次事务提交都刷盘（最安全，但性能略低）
    binlog_format=ROW      # 行级复制（推荐，比STATEMENT安全）
    expire_logs_days=7     # 二进制日志保留7天
    
    # ========== 动态覆盖 ==========
    server-id=0            # 会被 InitContainer 动态覆盖
    
  # 从库配置模板
  replica.cnf: |
    [mysqld]
    # ========== 基础配置 ==========
    character-set-server=utf8mb4
    collation-server=utf8mb4_unicode_ci
    
    # ========== 从库特有配置 ==========
    relay-log=mysql-relay-bin              # 中继日志（存储从主库同步来的数据）
    read_only=1                            # 只读模式（防止从库被误写）
    log_slave_updates=0                    # 不记录从库的更新到二进制日志
    
    # ========== 动态覆盖 ==========
    server-id=0                            # 会被 InitContainer 动态覆盖
```
* 主库配置解析

| 配置项 | 含义 | 为什么这么设置 |
|--------|------|----------------|
| `character-set-server=utf8mb4` | 字符集 | 支持完整的UTF-8，包括emoji |
| `collation-server=utf8mb4_unicode_ci` | 排序规则 | 不区分大小写，更符合日常习惯 |
| `log-bin=mysql-bin` | **二进制日志** | 主从复制的数据源，主库必须开启 |
| `sync_binlog=1` | 同步刷盘 | 保证数据不丢，但每次写都要等磁盘IO |
| `binlog_format=ROW` | 行级复制 | 记录每行数据的变更，最安全可靠 |
| `expire_logs_days=7` | 日志过期 | 自动清理7天前的日志，防止磁盘占满 |

* 从库配置解析

| 配置项 | 含义 | 为什么这么设置 |
|--------|------|----------------|
| `relay-log=mysql-relay-bin` | **中继日志** | 从库接收主库的二进制日志后，先存到这里再回放 |
| `read_only=1` | **只读模式** | 防止应用程序误写入从库，保证主从数据一致 |
| `log_slave_updates=0` | 不级联记录 | 如果A→B→C链式复制，B不记录自己的变更日志，节省空间 |

### 1.3 创建 MySQL Secret
* `vi mysql-secret.yaml`
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysql-secret
  namespace: mysql
type: Opaque
data:
  # root登录密码
  # echo -n "root123" | base64
  root-password: cm9vdDEyMw==
  # 主从复制账号 repl 的密码
  # echo -n "repl123" | base64
  repl-password: cmVwbDEyMw==
```

### 1.4 创建 MySQL StatefulSet
* `vi mysql-StatefulSet.yaml`
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
  namespace: mysql
spec:
  selector:
    matchLabels:
      app: mysql
  serviceName: mysql  # 关联 Headless Service
  replicas: 3
  template:
    metadata:
      labels:
        app: mysql
    spec:
      # InitContainer：生成配置文件
      initContainers:
      - name: init-mysql
        image: mysql:5.7.38
        command:
        - bash
        - "-c"
        - |
          set -ex
          # 1. 提取 Pod 序号
          [[ $HOSTNAME =~ -([0-9]+)$ ]] || exit 1
          ordinal=${BASH_REMATCH[1]}
          
          # 2. 创建配置目录
          mkdir -p /etc/mysql/conf.d
          
          # 3. 生成 server-id（基于序号）
          echo "[mysqld]" > /etc/mysql/conf.d/server-id.cnf
          echo "server-id=$((100 + $ordinal))" >> /etc/mysql/conf.d/server-id.cnf
          
          # 4. 根据角色复制对应的配置文件
          if [[ $ordinal -eq 0 ]]; then
            # 主库配置
            echo "Configuring as MASTER (server-id=$((100 + $ordinal)))"
            cp /mnt/config-map/primary.cnf /etc/mysql/conf.d/
          else
            # 从库配置
            echo "Configuring as SLAVE (server-id=$((100 + $ordinal)))"
            cp /mnt/config-map/replica.cnf /etc/mysql/conf.d/
          fi
          
          # 5. 查看生成的配置（调试用）
          echo "=== Generated config files ==="
          cat /etc/mysql/conf.d/*.cnf
          echo "=============================="

        volumeMounts:
        - name: conf
          mountPath: /etc/mysql/conf.d
        - name: mysql-config
          mountPath: /mnt/config-map
      
      # 主容器
      containers:
      - name: mysql
        image: mysql:5.7.38
        env:
        # 测试环境可：使用空密码
        # - name: MYSQL_ALLOW_EMPTY_PASSWORD
        #   value: "1"
        # 生产环境使用 Secret
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: root-password
        - name: MYSQL_ROOT_HOST
          value: "%"  # 允许远程连接
        ports:
        - containerPort: 3306
          name: mysql
        volumeMounts:
        - name: data
          mountPath: /var/lib/mysql
          subPath: mysql
        - name: conf
          mountPath: /etc/mysql/conf.d
        # 资源限制
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        # 健康检查 - 存活探针
        livenessProbe:
          exec:
            command:
            - sh
            - -c
            - |
              mysqladmin ping -h 127.0.0.1 -p${MYSQL_ROOT_PASSWORD} 2>/dev/null
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        # 健康检查 - 就绪探针
        readinessProbe:
          exec:
            command:
            - sh
            - -c
            - |
              mysqladmin ping -h 127.0.0.1 -p${MYSQL_ROOT_PASSWORD} 2>/dev/null
          initialDelaySeconds: 15
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 5
      
      # 配置卷挂载
      volumes:
      - name: mysql-config
        configMap:
          name: mysql-config
      - name: conf
        emptyDir: {}  # 临时目录，存放生成的配置
  
  # PVC 模板
  volumeClaimTemplates:
  - metadata:
      name: data
      namespace: mysql
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: "local-path"  # 根据你的环境修改
      resources:
        requests:
          storage: 10Gi
```
### 1.5 创建 MySQL 主从复制初始化 Job
> **温馨提示：** 新增从节点时，每次都需要重新执行`mysql job`，先删除job后再运行job，job是一次性运行的；


* `vi mysql-job.yaml`
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: mysql-replication-setup
  namespace: mysql
spec:
  ttlSecondsAfterFinished: 300
  backoffLimit: 6   # 失败后最多重试 6 次，避免偶发启动时序问题
  template:
    metadata:
      labels:
        app: mysql-replication-setup
    spec:
      restartPolicy: OnFailure
      containers:
      - name: setup-replication
        image: mysql:5.7.38
        imagePullPolicy: IfNotPresent
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: root-password
        - name: MYSQL_REPL_PASSWORD   # 使用专用复制账号密码，不再复用 root
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: repl-password
        command:
        - bash
        - -c
        - |
          set -euo pipefail

          MASTER_HOST="mysql-0.mysql"

          echo "==================================="
          echo "Waiting for master to be ready..."
          echo "==================================="

          for i in $(seq 1 60); do
            if mysql -h "${MASTER_HOST}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "SELECT 1" >/dev/null 2>&1; then
              echo "Master is ready"
              break
            fi
            echo "Waiting for master... (${i}/60)"
            sleep 5
          done

          if ! mysql -h "${MASTER_HOST}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "SELECT 1" >/dev/null 2>&1; then
            echo "ERROR: master is not reachable"
            exit 1
          fi

          echo "==================================="
          echo "Create replication user on master..."
          echo "==================================="

          mysql -h "${MASTER_HOST}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "
            CREATE USER IF NOT EXISTS 'repl'@'%' IDENTIFIED BY '${MYSQL_REPL_PASSWORD}';
            GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';
            FLUSH PRIVILEGES;
          "

          echo "==================================="
          echo "Getting master status..."
          echo "==================================="

          master_status=$(mysql -h "${MASTER_HOST}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "SHOW MASTER STATUS\G" 2>/dev/null)
          master_file=$(echo "${master_status}" | awk '/File:/ {print $2}')
          master_pos=$(echo "${master_status}" | awk '/Position:/ {print $2}')

          echo "Master File: ${master_file}"
          echo "Master Position: ${master_pos}"

          if [ -z "${master_file}" ] || [ -z "${master_pos}" ]; then
            echo "ERROR: failed to get master status"
            echo "${master_status}"
            exit 1
          fi

          # 自动发现当前 mysql Headless Service 下的 Pod 数量
          # 说明：
          # 1. Headless Service 会返回当前所有 mysql Pod 的 A 记录
          # 2. StatefulSet 的 ordinal 是连续的，所以 Pod 总数 = 当前副本数
          # 3. mysql-0 固定为主库，其余 mysql-1 ~ mysql-(N-1) 视为从库
          #
          # 为避免 StatefulSet 启动过程中 DNS 记录还没完全收敛，这里做一个“稳定检测”：
          # 连续 3 次解析到相同的 Pod 数量后，认为副本数稳定
          stable_count=0
          pod_count=0
          last_count=0

          for i in $(seq 1 30); do
            current_count=$(getent ahostsv4 mysql.mysql 2>/dev/null | awk '{print $1}' | sort -u | wc -l | tr -d ' ')

            # 防御空值
            if [ -z "${current_count}" ]; then
              current_count=0
            fi

            if [ "${current_count}" -gt 0 ] && [ "${current_count}" = "${last_count}" ]; then
              stable_count=$((stable_count + 1))
            else
              stable_count=1
              last_count="${current_count}"
            fi

            if [ "${stable_count}" -ge 3 ]; then
              pod_count="${current_count}"
              break
            fi

            sleep 2
          done

          # 最终兜底
          if [ "${pod_count}" -le 1 ]; then
            pod_count=$(getent ahostsv4 mysql.mysql 2>/dev/null | awk '{print $1}' | sort -u | wc -l | tr -d ' ')
          fi

          # 如果最终只有 1 个 Pod，说明当前没有从库
          if [ -z "${pod_count}" ] || [ "${pod_count}" -le 1 ]; then
            echo "==================================="
            echo "Replication setup completed!"
            echo "Master: ${MASTER_HOST}"
            echo "Slaves:"
            echo "==================================="
            exit 0
          fi

          # 根据自动发现到的 Pod 总数，推导所有从库名称
          # 例如 pod_count=8，则从库为 mysql-1.mysql ~ mysql-7.mysql
          for ordinal in $(seq 1 $((pod_count - 1))); do
            slave="mysql-${ordinal}.mysql"

            echo "==================================="
            echo "Setting up slave: ${slave}"
            echo "==================================="

            for i in $(seq 1 60); do
              if mysql -h "${slave}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "SELECT 1" >/dev/null 2>&1; then
                echo "Slave ${slave} is ready"
                break
              fi
              echo "Waiting for ${slave}... (${i}/60)"
              sleep 5
            done

            if ! mysql -h "${slave}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "SELECT 1" >/dev/null 2>&1; then
              echo "ERROR: slave ${slave} is not reachable"
              exit 1
            fi

            mysql -h "${slave}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "
              STOP SLAVE;
              RESET SLAVE ALL;
              CHANGE MASTER TO
                MASTER_HOST='${MASTER_HOST}',
                MASTER_USER='repl',
                MASTER_PASSWORD='${MYSQL_REPL_PASSWORD}',
                MASTER_LOG_FILE='${master_file}',
                MASTER_LOG_POS=${master_pos},
                MASTER_CONNECT_RETRY=10;
              START SLAVE;
            "

            echo "Checking slave status: ${slave}"
            slave_status=$(mysql -h "${slave}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "SHOW SLAVE STATUS\G" 2>/dev/null)
            slave_io=$(echo "${slave_status}" | awk '/Slave_IO_Running:/ {print $2}')
            slave_sql=$(echo "${slave_status}" | awk '/Slave_SQL_Running:/ {print $2}')

            if [ "${slave_io}" = "Yes" ] && [ "${slave_sql}" = "Yes" ]; then
              echo "OK: ${slave} replication is RUNNING"
            else
              echo "ERROR: ${slave} replication FAILED"
              echo "${slave_status}"
              exit 1
            fi
          done

          # 新增：生成从库列表用于最终输出，保持你原来的输出格式
          SLAVES=$(for ordinal in $(seq 1 $((pod_count - 1))); do printf "mysql-%s.mysql " "${ordinal}"; done | sed 's/[[:space:]]*$//')

          echo "==================================="
          echo "Replication setup completed!"
          echo "Master: ${MASTER_HOST}"
          echo "Slaves: ${SLAVES}"
          echo "==================================="

```

## 二、部署 MySQL 主从集群

### 2.1 创建 MySQL 命名空间
```bash
kubectl create ns mysql
```
### 2.2 部署 MySQL 的svc

```bash
# 创建并部署mysql-svc网络
kubectl apply -f mysql-svc.yaml

# 查看svc资源
kubectl get svc -n mysql
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434696.png)

### 2.3 部署 MySQL 配置文件

```bash
# 部署并创建mysql配置文件
kubectl apply -f mysql-configmap.yaml

# 查看配置文件是否部署成功
kubectl get cm -n mysql
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434502.png)

### 2.4 部署 MySQL 密码

```bash
# 创建并部署mysql密码
kubectl apply -f mysql-secret.yaml

# 查看mysql的secret是否创建成功
kubectl get secret -n mysql
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434720.png)

### 2.5 部署 MySQL 集群

```bash
# 创建并部署mysql集群
kubectl apply -f mysql-StatefulSet.yaml

# 查看sts，确认mysql是否运行
kubectl get sts -n mysql -o wide
# 查看pvc，查看是否成功挂载mysql pod
kubectl get pvc -n mysql -o wide
# 查看mysql pod是否创建成功
kubectl get pods -n mysql -o wide
```
> 执行创建部署之后，首次部署时需要等待一段时间，具体取决于镜像拉取速度、节点资源和存储挂载速度。一般正常需要等待5-10分钟左右才会所有创建成功；
> 如果5-10分钟一个都没创建成功，可使用`kubectl describe pod -n mysql mysql-0`命令查看创建pod过程是否有报错，如果没报错还是没起来，可以在使用`kubectl logs -n mysql mysql-0 -f`命令查看服务日志，是否报错；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434691.png)
### 2.6 部署 MySQL 主从复制初始化 Job 

```bash
# 部署 MySQL 主从复制初始化 Job 并检测是否生效
kubectl apply -f mysql-job.yaml

# 查看job是否正常(COMPLETIONS状态为1/1正常)
kubectl get job -n mysql
# 查看对应的 Pod 是否执行完成（Pod 的 STATUS 为 Completed 表示脚本执行结束）
kubectl get pods -n mysql
# 正常返回应该是：mysql-replication-setup-xxxxx   0/1   Completed
# 如果STATUS是其他的，例如：Error / CrashLoopBackOff：说明脚本失败了、Running 很久不结束：说明卡在等待主库或从库

# 查看pod是否有有异常，看最后的Events就行
kubectl describe pods -n mysql mysql-replication-setup-64p4x | grep -iA20 Events
# 查看日志是否有报错
kubectl logs -n mysql job/mysql-replication-setup
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434282.png)

mysql 日志返回正常解析：
* 主库已就绪可连接：`Master is ready`
* 成功创建复制用户：`Create replication user on master...`
* 成功拿到主库日志名称及位置：`Master File: mysql-bin.000003`、`Master Position: 1352`
* `mysql-1` 主从复制启动成功：`replication is RUNNING`
* `mysql-2` 主从复制启动成功：`replication is RUNNING`
* Job 正常结束：`Replication setup completed!`

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434461.png)





## 三、验证主从复制是否生效

### 3.1 检查主库 binlog 状态

* 查看主库 binlog 是否开启

```bash
kubectl exec -n mysql mysql-0 -- mysql -uroot -proot123 -e "SHOW MASTER STATUS\G"
```
如图：可以看到`File: mysql-bin.00000x`和`Position: xxx`的就是开启状态；如果没有结果，说明主库 binlog 没开或没开好。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434522.png)

### 3.2 检查从库复制状态

```bash
kubectl exec -n mysql mysql-1 -- mysql -uroot -proot123 -e "SHOW SLAVE STATUS\G" | egrep "Slave_IO_Running\:|Slave_SQL_Running\:"
kubectl exec -n mysql mysql-2 -- mysql -uroot -proot123 -e "SHOW SLAVE STATUS\G" | egrep "Slave_IO_Running\:|Slave_SQL_Running\:"
```

重点看这两行是不是都是`Yes`，如果是`Yes`就没问题；

```text
Slave_IO_Running: Yes
Slave_SQL_Running: Yes
```

### 3.3 写入数据验证同步

进入主库数据库：
```bash
kubectl exec -it -n mysql mysql-0 -- mysql -uroot -proot123
```

执行sql，在主库插入一条数据：

```sql
-- 创建test数据库
CREATE DATABASE IF NOT EXISTS test;
-- 进入test库
USE test;
-- 创建t1表
CREATE TABLE IF NOT EXISTS t1 (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50));
-- 再t1表中插入内容
INSERT INTO t1(name) VALUES('hello');
-- 查看t1表中的所有内容
SELECT * FROM t1;
```

然后到从库查：

```bash
kubectl exec -n mysql mysql-1 -- mysql -uroot -proot123 -e "SELECT * FROM test.t1;"
kubectl exec -n mysql mysql-2 -- mysql -uroot -proot123 -e "SELECT * FROM test.t1;"
```

如果两个从库都能查询到 `hello`，说明主从复制链路工作正常；

## 四、总结

> 本文的主从初复制适用于全新部署的一主多从场景。
> 如果主库中已经存在业务数据，或者从库需要基于已有数据恢复，建议结合备份恢复、`mysqldump` 或 `xtrabackup` 等方式先对齐数据基线，再配置复制位点。
> 新增从节点时，每次都需要重新执行`mysql job`，先删除job后再运行job，job是一次性运行的；


## 五、附加（初）：mysql job 一主两从固定主从复制yaml
> 这个是写死的mysql-0是主，mysql-1、mysql-2是从；
> 上面的脚本是根据从来获取的，不是固定的；
> 两个都可以用，任选其一，不管是哪个，再新增从的时候都需要重新删除job，并重新执行；
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: mysql-replication-setup
  namespace: mysql
spec:
  ttlSecondsAfterFinished: 300
  backoffLimit: 6
  template:
    metadata:
      labels:
        app: mysql-replication-setup
    spec:
      restartPolicy: OnFailure
      containers:
      - name: setup-replication
        image: mysql:5.7.38
        imagePullPolicy: IfNotPresent
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: root-password
        - name: MYSQL_REPL_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: repl-password
        command:
        - bash
        - -c
        - |
          set -euo pipefail

          MASTER_HOST="mysql-0.mysql"
          SLAVES="mysql-1.mysql mysql-2.mysql"

          echo "==================================="
          echo "Waiting for master to be ready..."
          echo "==================================="

          for i in $(seq 1 60); do
            if mysql -h "${MASTER_HOST}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "SELECT 1" >/dev/null 2>&1; then
              echo "Master is ready"
              break
            fi
            echo "Waiting for master... (${i}/60)"
            sleep 5
          done

          if ! mysql -h "${MASTER_HOST}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "SELECT 1" >/dev/null 2>&1; then
            echo "ERROR: master is not reachable"
            exit 1
          fi

          echo "==================================="
          echo "Create replication user on master..."
          echo "==================================="

          mysql -h "${MASTER_HOST}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "
            CREATE USER IF NOT EXISTS 'repl'@'%' IDENTIFIED BY '${MYSQL_REPL_PASSWORD}';
            GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';
            FLUSH PRIVILEGES;
          "

          echo "==================================="
          echo "Getting master status..."
          echo "==================================="

          master_status=$(mysql -h "${MASTER_HOST}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "SHOW MASTER STATUS\G" 2>/dev/null)
          master_file=$(echo "${master_status}" | awk '/File:/ {print $2}')
          master_pos=$(echo "${master_status}" | awk '/Position:/ {print $2}')

          echo "Master File: ${master_file}"
          echo "Master Position: ${master_pos}"

          if [ -z "${master_file}" ] || [ -z "${master_pos}" ]; then
            echo "ERROR: failed to get master status"
            echo "${master_status}"
            exit 1
          fi

          for slave in ${SLAVES}; do
            echo "==================================="
            echo "Setting up slave: ${slave}"
            echo "==================================="

            for i in $(seq 1 60); do
              if mysql -h "${slave}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "SELECT 1" >/dev/null 2>&1; then
                echo "Slave ${slave} is ready"
                break
              fi
              echo "Waiting for ${slave}... (${i}/60)"
              sleep 5
            done

            if ! mysql -h "${slave}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "SELECT 1" >/dev/null 2>&1; then
              echo "ERROR: slave ${slave} is not reachable"
              exit 1
            fi

            mysql -h "${slave}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "
              STOP SLAVE;
              RESET SLAVE ALL;
              CHANGE MASTER TO
                MASTER_HOST='${MASTER_HOST}',
                MASTER_USER='repl',
                MASTER_PASSWORD='${MYSQL_REPL_PASSWORD}',
                MASTER_LOG_FILE='${master_file}',
                MASTER_LOG_POS=${master_pos},
                MASTER_CONNECT_RETRY=10;
              START SLAVE;
            "

            echo "Checking slave status: ${slave}"
            slave_status=$(mysql -h "${slave}" -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "SHOW SLAVE STATUS\G" 2>/dev/null)
            slave_io=$(echo "${slave_status}" | awk '/Slave_IO_Running:/ {print $2}')
            slave_sql=$(echo "${slave_status}" | awk '/Slave_SQL_Running:/ {print $2}')

            if [ "${slave_io}" = "Yes" ] && [ "${slave_sql}" = "Yes" ]; then
              echo "OK: ${slave} replication is RUNNING"
            else
              echo "ERROR: ${slave} replication FAILED"
              echo "${slave_status}"
              exit 1
            fi
          done

          echo "==================================="
          echo "Replication setup completed!"
          echo "Master: ${MASTER_HOST}"
          echo "Slaves: ${SLAVES}"
          echo "==================================="
```

