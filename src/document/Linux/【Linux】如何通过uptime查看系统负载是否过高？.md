---
title: 【Linux】如何通过uptime查看系统负载是否过高？
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2025-09-24 15:45:41
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



## 1. 什么是负载（load average）？

- **定义**：单位时间内处于 **可运行（R）** 或 **不可中断睡眠（D）** 状态的 **平均任务数**。
- **来源**：内核统计，用户态通过 `/proc/loadavg` 读取。
- **三个值**依次代表 **1 分钟、5 分钟、15 分钟** 的采样结果。
- 可通过：`uptime`、`top`、`htop` 等命令查看。

```bash
[root@k8s-node1 a]# uptime
 17:16:23 up 49 days, 6:35, 4 users, load average: 1.04, 1.37, 1.65
```

## 2. 快速判断负载是否过高公式

```text
饱和度 = loadavg / 逻辑 CPU 核数
```

获取CPU核数（以下命令都可）：

```bash
nproc               
grep -c ^processor /proc/cpuinfo
lscpu | grep -i cpu\(s\)\: | awk '{print $2}'
```

例如：


```bash
- cpu核数：32
- loadavg：6.21

# 计算（保留一位即可，第二位可四舍五入）
6.21/32=0.2
# 0.2，属于非常空闲的状态
```

| 饱和度区间 | 经验含义 | 建议 |
|------------|----------|------|
| < 0.5 | 空闲 | 资源充足 |
| 0.5–0.7 | 健康 | 正常业务 |
| 0.7–1.0 | 繁忙 | 有排队，可接受 |
| 1.0–1.5 | 重载 | **需要观察** |
| > 1.5 | 过载 | **立即排查** |

> 对 **延迟敏感** 服务（API、游戏）可把红线降到 **0.7**。

---
## 3. 一条命令判断当前状态
* [x] ①、写个脚本来获取当前负载的百分比
* load_check.sh
```bash
#!/bin/bash
cores=$(nproc)
read one five fifteen < /proc/loadavg
sat1=$(awk -v c="$cores" -v l="$one"     'BEGIN{printf "%.0f%%",l/c*100}')
sat5=$(awk -v c="$cores" -v l="$five"    'BEGIN{printf "%.0f%%",l/c*100}')
sat15=$(awk -v c="$cores" -v l="$fifteen" 'BEGIN{printf "%.0f%%",l/c*100}')
printf "CPU饱和度：\n1 min\t5 min\t15 min\n%s\t%s\t%s\n" "$sat1" "$sat5" "$sat15"
```

* [x] ②、配置别名
> 别名可以根据自己的喜好去自定义，定义之前请确保不要和命令冲突；

```bash
alias load="sh /路径/load_check.sh"
```

* [x] ③、并写到`~/.bashrc`配置里

```bash
vim ~/.bashrc
# 在最后一行追加
alias load="sh /路径/load_check.sh"

# 保存退出
# source使其生效
sorce ~/.bashrc
```

* [x] ④、执行别名进行测试

```bash
[root@localhost ~]# load
CPU饱和度：
1 min	5 min	15 min
1%	1%	2%
```

就可以很明显的看到负载的饱和度，再结合上面的饱和度表，来判断是否过载；

## 4. 场景举例

> **例 1**：4 核机器 load=6  
> 饱和度 = 6/4 = **150 %(1.5)** → **过载**，需进一步排查。
> &emsp; &emsp; &emsp; &emsp; &emsp;&emsp;↑&emsp;&emsp;&emsp;↑
> &emsp; &emsp; &emsp; &emsp; &emsp;百分比&emsp;小数点

> **例 2**：64 核机器 load=32  
> 饱和度 = 32/64 = **50 %(0.5)** → **健康**，但需确认是否 IO 等待。

> **例 3**：64 核机器 load=12
> 饱和度 = 12/64 = **18 %(0.18)** → **空闲**，不用管，资源很充足。
---
## 5. 如何肉眼来判断负载是否过高？

* [x] 1、首先需要记住此服务器的核心数
```bash
nproc
```
例：回显 `32` 心里就记住 **≈30** 这条线。

* [x] 2、把 uptime 输出切成三档 **肉眼标尺**

```bash
load average: 6.21, 7.50, 9.00
               ↑     ↑      ↑
             1min  5min   15min
```
- **小于核数一半** → 空闲（32 核看 16）  
- **接近核数** → 满载（32 核看 30~35）  
- **明显超过核数** → 过载（>40 就红）

所以 6.21 远 < 16，**秒判空闲**。


* [x] 3、口诀总结
> **load 数字小于核数一半 → 空；**  
> **接近核数 → 满；**  
> **远超核数 → 爆。**



## 6. 负载高 ≠ 问题定界，可以继续进行深挖排查是什么导致的

| 工具 | 看啥 |
|------|------|
| `top` / `htop` | 按 `1` 展开每核，观察 **CPU 是否跑满**<br>或者top `P`，查看哪个cpu占用最高。 |
| `iostat -x 1` | 看 **%util / await**，确认 **磁盘 IO 瓶颈**<br>`utils`大于80磁盘io过高 <br>`await`对**SSD**而言，1--2就很大了，但对机械盘大于10明显感觉卡|
| `vmstat 1` | 观察 **r 列（运行队列）** 与 **b 列（阻塞队列）**<br>**`r`正在运行 + 等待 CPU 的任务数(长期) > 核数 = cpu很堵**<br>**`b`处于不可中断睡眠（D 状态）的任务数 > 0 = 达到了磁盘/网络 IO 瓶颈**|


---
