---
title: Linux 日志系统详解 - 管理、审计与排障最佳实践
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 日志
  - 运维
pageview: false
date: 2022-03-21
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

## 1. 日志系统概述

> Linux 日志系统，主要记录了操作系统、内核、服务、应用等运行日志，它既是运维排障的"时光机"，也是安全审计的"证据链"，更是业务洞察的"数据油田"，所以我们要对Linux系统的日志有一定的了解，了解他是干什么的，主要存储什么日志的，就可以进一步去分析问题所在，所以是很重要的。
### 1.1 为什么需要日志系统

| 维度   | 没有日志    | 有日志               |
| ---- | ------- | ----------------- |
| 故障排查 | 盲猜，重启玄学 | 秒级定位根因            |
| 安全合规 | 口说无凭    | 满足等保/ISO 27001 审计 |
| 业务指标 | 拍脑袋决策   | UV/PV/转化率一目了然     |
| 系统健康 | 被动告警    | 主动预测磁盘、内存、流量趋势    |

## 2. 常见日志分类与路径
> 日志路径为：`/var/log/`

| 类型       | 日志名称（`Centos` / `Ubuntu`）                                                               | 说明                                         |
| -------- | ------------------------------------------------------------------ | ------------------------------------------ |
| 内核日志     | `dmesg` /  `kern.log`                                | 系统启动、硬件检测、驱动加载、内核报错 等日志                       |
| 通用系统日志   | `messages` / `syslog`                                              | 系统通用信息日志（info 级别为主）                        |
| 认证授权日志   | `secure` / `auth.log`      | SSH、sudo、su、login 成功/失败记录                  |
| 守护进程日志   | `daemon.log`                                                       | 系统后台服务（非 systemd 管理）运行状态                   |
| 邮件日志     | `maillog` / `mail.log`                                             | 邮件服务（Postfix、Sendmail）发送/接收记录 日志             |
| 引导日志     | `boot.log`                                                         | 系统本次启动过程、服务启动结果                            |
| 定时任务日志   | `cron`                                                             | crond 执行记录（任务开始/结束/报错）                     |
| 用户登录记录   | `wtmp`（成功登录）<br>`btmp`（失败登录）<br>`lastlog`（最后登录）                    | 用于如下一些命令：<br> `last`:最近登录的用户<br>`who`：当前登录的用户<br>`lastb`：最近登录失败的用户<br>`lastlog`：用户最近一次登录的信息       |
| 审计日志     | `audit/audit.log`                                                  | auditd 安全审计（权限、文件、系统调用）                    |
| 软件包日志    | `yum.log`<br>`dpkg.log`、`apt/history.log`     | 软件安装、升级、卸载记录                               |
| 容器日志     | `pods/*/0.log`（默认路径）                                               | Kubernetes 容器标准输出（通过 CNI 插件或 cri-o/docker） |
| 业务日志（示例） | `nginx/access.log`<br>`mysql/error.log`<br>`php-fpm/www-error.log` | 各应用程序自定义路径，需配合 logrotate 管理                |


## 3. 常用日志命令速查

| 场景 | 命令 |
| ---- | ---- |
| 查看全部日志 | `journalctl` |
| 最近报错详情 | `journalctl -xe` |
| 仅看 nginx 服务 | `journalctl -u nginx` |
| 本次开机日志 | `journalctl -b` |
| 近 1 小时 | `journalctl --since "1 hour ago"` |
| 磁盘占用 | `journalctl --disk-usage` |
| 实时滚动 | `journalctl -u docker -f` |
| 内核信息 | `dmesg -T` |
|最近登录失败的用户|`lastb`|
| 登录历史 | `last`  / `last -n5`|
| 查看用户最后一次登录时间 | `lastlog`  / `lastlog \| grep root`|


## 4. 日志的级别（8个）：

| 级别 | 名称      | 含义            |
| -- | ------- | ------------- |
| 0  | emerg   | 系统崩溃级，机器已不可用  |
| 1  | alert   | 必须立即处理，否则业务中断 |
| 2  | crit    | 关键资源出错，风险极高   |
| 3  | err     | 运行错误，功能受损     |
| 4  | warning | 潜在问题，需关注      |
| 5  | notice  | 正常但重要的事件      |
| 6  | info    | 一般运行信息        |
| 7  | debug   | 调试细节，排障时开启    |

## 5. 日志轮转：logrotate
> **logrotate 是 Linux 的“日志保洁员”**：  
> 按**时间**或**大小**把旧日志切成压缩包，保留指定份数，多余自动删除，并可让服务**平滑重载**继续写新日志。防止它们把磁盘撑爆。

✅ 一句话总结
> **logrotate** 就是帮你**自动打包、压缩、清理、重载**日志，防止磁盘被日志撑爆的幕后工具。
会按时间 / 大小归档、压缩、删除。

### 5.1 配置路径
| 文件 | 作用 |
|------|------|
| `/etc/logrotate.conf` | 全局“总章程” |
| `/etc/logrotate.d/xxx` | 每个服务自己的“保洁细则”<br>可以每个服务创建一个属于自己的配置。 |

### 5.2 Nginx 示例逐行解释
* 文件名：`nginx`
```bash
/var/log/nginx/*.log {     # 对哪些文件生效
    daily                  # 每天切一次（也可 weekly/monthly/size 100M）
    rotate 7               # 只留 7 份，第 8 份自动删除
    compress               # 切完后 gzip 压缩（节省 80%+ 空间）
    missingok              # 文件不存在也不报错
    notifempty             # 空文件跳过不切
    create 0640 nginx adm  # 新日志文件权限/属主/属组
    postrotate
        systemctl reload nginx   # 切完后让 nginx 重新打开日志文件
    endscript
}
```
### 5.3 Redis 二进制安装切割实例
> 区别在于重启命令。

* 文件名：`redis`

```bash
/usr/local/redis_cluster/redis_6379/logs/*.log {   
    daily                 
    rotate 7              
    compress              
    missingok             
    notifempty            
    create 0644 root root
    postrotate
         /bin/kill -USR1 `cat /usr/local/redis_cluster/redis_6379/pid/redis_6379.pid 2>/dev/null` 2>/dev/null || true
    endscript
}
```

> 解压缩需要用`gunzip`命令。

> `logrotate`命令更多详解请查看：[Linux 系统管理 : logrotate 命令详解](还没写，待定)

## 6. 安全审计日志（auditd）
- 路径：`/var/log/audit/audit.log`
- 查询示例：

| 场景                | 命令                                                 |
| ----------------- | -------------------------------------------------- |
| 所有 sudo 提权        | `ausearch -x sudo`                                 |
| 指定用户行为            | `ausearch -ua alice`                               |
| 指定文件被谁动过          | `ausearch -f /etc/passwd -i`                       |
| 一段时间内的异常          | `ausearch -ts today -k passwd_change`              |
| 按 key 关键字         | `ausearch -k webconf`                              |
| 生成汇总报表            | `aureport -x --summary`                            |
| 登录统计（btmp 范围）     | `aureport --auth --summary`                        |
| 异常事件（AVC/SELinux） | `aureport -a`                                      |
| 系统调用统计            | `aureport -s --summary`                            |
| 导出 csv            | `aureport -f --format csv -o /tmp/file_access.csv` |

> `ausearch`命令更多详解请查看：[Linux 系统管理 : ausearch  命令详解](还没写，待定)


## 7. 实际排障场景对照表

| 问题现象 | 排查命令 / 日志 |
| -------- | ---------------- |
| 服务无法启动 | `systemctl status 服务名` 或 `journalctl -u 服务名` |
| SSH 登录失败 | `cat /var/log/secure` (CentOS) / `auth.log` (Ubuntu) |
| Nginx 报错 | `cat /var/log/nginx/error.log` |
| 系统崩溃 | `journalctl --since "YYYY-MM-DD HH:MM"` |
| 定时任务未执行 | `cat /var/log/cron` 或 `journalctl -u cron` |


## 8. 日志管理最佳实践

| 建议 | 说明 |
| ---- | ---- |
| ✅ 启用 logrotate | 控制大小、备份、压缩 |
| ✅ 权限管控 | 日志中可能含密码、Token，防止越权读取 |
| ✅ 集中收集 | rsyslog → ELK / Graylog / Loki，统一检索 |
| ✅ 远程备份 | 防止本地篡改，满足合规 |
| ✅ 分级记录 | 关键服务设 `error_log warn/error` 级，减少噪音 |
| ✅ 定期清理 | 保留 7–30 天，磁盘告警前自动清理 |


## 9. 总结

| 模块 | 工具 / 文件 | 用途 |
| ---- | ----------- | ---- |
| 主日志系统 | `rsyslog` / `systemd-journald` | 采集+存储 |
| 查看命令 | `journalctl` `dmesg` `tail` `less` | 检索+排障 |
| 登录审计 | `last` `lastlog` `btmp` `wtmp` | 用户行为 |
| 轮转归档 | `logrotate` | 自动压缩+清理 |
| 安全审计 | `auditd` `auth.log` | 权限&文件事件 |


