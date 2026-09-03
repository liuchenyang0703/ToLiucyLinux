---
title: 【Linux】Docker_update_深度解析：命令、常用参数与实战示例
icon: circle-info
order: 1
category:
  - Linux
  - Docker
tag:
  - Linux
  - Docker
  - 运维
date: 2025-09-09
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
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

## 1. 什么是 docker update？

> `docker update` 是一个 **运行时（runtime）** 命令，主要用来 **在线调整** 一个或多个容器的 **资源限制**及一些**容器策略**。  

## 2. 命令格式

```bash
docker update 参数 容器名称/ID
```

## 3. 常用参数

支持调整的维度及使用：
<table border="1" cellpadding="6" cellspacing="0">
  <thead>
    <tr>
      <th>维度</th>
      <th>参数</th>
      <th>作用说明</th>
      <th>使用示例</th>
    </tr>
  </thead>
  <tbody>
    <!-- CPU -->
    <tr>
      <td rowspan="2"><b>CPU</b></td>
      <td><code>--cpus</code></td>
      <td>限制容器可用 CPU 核数。</td>
      <td><code>docker update --cpus=1 容器名/ID</code></td>
    </tr>
    <tr>
      <td><code>--cpuset-cpus</code></td>
      <td>绑定容器只能在指定 CPU 核心上运行。</td>
      <td><code>docker update --cpuset-cpus=0-2,4 容器名/ID</code></td>
    </tr>
    <!-- Memory -->
    <tr>
      <td rowspan="3"><b>内存</b></td>
      <td><code>--memory, -m</code></td>
      <td>内存硬限制，支持 b、k、m、g 单位。</td>
      <td><code>docker update -m=512m 容器名/ID</code></td>
    </tr>
    <tr>
      <td><code>--memory-swap</code></td>
      <td>内存 + swap 总和，值必须 ≥ <code>--memory</code>。</td>
      <td><code>docker update --memory-swap=1g 容器名/ID</code></td>
    </tr>
    <tr>
      <td><code>--memory-reservation</code></td>
      <td>软限制；系统内存紧张时回收。</td>
      <td><code>docker update --memory-reservation=256m 容器名/ID</code></td>
    </tr>
    <!-- Block I/O -->
    <tr>
      <td rowspan="5"><b>块 I/O权重</b></td>
      <td><code>--blkio-weight</code></td>
      <td>整体 I/O 权重，范围 10–1000。</td>
      <td><code>docker update --blkio-weight=500 容器名/ID</code></td>
    </tr>
    <tr>
      <td><code>--device-read-bps</code></td>
      <td>按设备的读带宽限制（b/k/m/g）。</td>
      <td><code>docker update --device-read-bps /dev/sda:10mb 容器名/ID</code></td>
    </tr>
    <tr>
      <td><code>--device-write-bps</code></td>
      <td>按设备的写带宽限制。</td>
      <td><code>docker update --device-write-bps /dev/sda:5mb容器名/ID</code></td>
    </tr>
    <tr>
      <td><code>--device-read-iops</code></td>
      <td>按设备的读 IOPS。</td>
      <td><code>docker update --device-read-iops /dev/sda:1000 容器名/ID</code></td>
    </tr>
    <tr>
      <td><code>--device-write-iops</code></td>
      <td>按设备的写 IOPS。</td>
      <td><code>docker update --device-write-iops /dev/sda:800 容器名/ID</code></td>
    </tr>
    <!-- 进程数 -->
    <tr>
      <td><b>进程数</b></td>
      <td><code>--pids-limit</code></td>
      <td>容器内最大进程/线程数，防止 fork-bomb。</td>
      <td><code>docker update --pids-limit=100 容器名/ID</code></td>
    </tr>
    <!-- 重启策略 -->
    <tr>
      <td><b>重启策略</b></td>
      <td><code>--restart</code></td>
      <td>容器退出后的重启策略。<br>（如 no、always、unless-stopped、on-failure）<br><font color=red>需重启容器生效。</font></td>
      <td><code>docker update --restart=no 容器名/ID</code></td>
    </tr>
  </tbody>
</table>

> ⚠️ 注意：`docker update` **不支持**修改环境变量、端口映射、网络模式、挂载卷等容器启动时指定的配置。

## 4. 实战示例
> cpu、内存、磁盘IO等基本都是在`HostConfig`中，所以在验证的时候命令是：`docker inspect test -f '{{.HostConfig.要验证的信息json名称}}'`


* 初始创建容器：

```bash
docker run -itd --name test --cpus 1 --restart=always test:latest
```

### 4.1 在线扩容 CPU

```bash
# 容器创建时 1 核
# 业务高峰，临时加到 2 核
docker update --cpus 2 test
```

验证（可使用如下命令查看该容器多少核cpu）：

```bash
docker inspect test -f '{{.HostConfig.NanoCpus}}' | awk '{printf "%.2f 核\n", $1/1000000000}'
```

### 4.2 绑定到特定核心，防止干扰其他服务

```bash
docker update --cpuset-cpus 2-3 test
```
验证：

```bash
docker inspect test -f '{{.HostConfig.CpusetCpus}}'
```
### 4.3 限制内存并关闭 swap

```bash
docker update --memory 512m --memory-swap 512m test
# memory-swap 与 memory 相等 => 禁止 swap
```

验证：

```bash
docker inspect test -f '{{.HostConfig.Memory}}' | awk '{printf "%d M\n", $1/1048576}'
docker inspect test -f '{{.HostConfig.MemorySwap}}' | awk '{printf "%d M\n", $1/1048576}'
```

### 4.4 限制进程数，避免 fork bomb

```bash
docker update --pids-limit 200 test
```
验证：

```bash
docker inspect test -f '{{.HostConfig.PidsLimit}}'
```
若是返回`<nil>`，表示创建时没有设置进程数，也就是等于`无限制`。

### 4.5 修改 restart 策略（需重启容器）
> 创建容器时配置了开机自启，然而我现在新创建了个容器，需要把之前容器的开机自启关了，命令如下：
```bash
docker update --restart no test
docker restart test   # 必须重启容器才生效
```
验证：

```bash
docker inspect test -f '{{.HostConfig.RestartPolicy.Name}}'
```
## 5. 常见问题与排查

1. **更新没生效？**  
   - 必须容器处于 `running` 状态。  
   - 某些旧内核不支持 cgroup v2，组合参数可能失败。

2. **Swap 限制失败？**  
   - 宿主机需要启用 swapaccount=1（GRUB 内核参数）。  



## 6. 小结与最佳实践

- **上线前**：在 `docker run` 或编排文件里预设合理资源。  
- **运行时**：利用 `docker update` 动态调整。  
- **监控**：结合 `docker stats` 观察实际用量。  
- **批量管理**：用 Ansible、Docker SDK、shell 脚本封装 `docker update` 调用。


---

> 🐋 希望大家多多支持，我们一起进步！😄
🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

