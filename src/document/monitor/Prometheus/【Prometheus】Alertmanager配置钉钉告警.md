---
title: 【Prometheus】Alertmanager配置钉钉告警
icon: circle-info
order: 1
category:
  - Linux
  - Prometheus
tag:
  - Linux
  - Prometheus
  - Alertmanager
  - 运维
pageview: false
date: 2026-03-07
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

## 一、部署Alertmanager
* 二进制部署Alertmanager

> 二进制部署Alertmanager可参考：[Prometheus + Grafana + Alertmanager 实现邮件监控告警及配置告警信息](https://liucy.blog.csdn.net/article/details/156640456)

* k8s部署Alertmanager
> k8s部署Alertmanager可参考：[k8s部署Prometheus + node_exporter + Grafana + Alertmanager](https://liucy.blog.csdn.net/article/details/155443737)

## 二、部署钉钉告警所需服务
### 2.1 prometheus-webhook-dingtalk 安装包下载
进入官方下载地址：[prometheus-webhook-dingtalk](https://github.com/timonwong/prometheus-webhook-dingtalk/releases)，根据自己的平台及架构进行下载；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101548861.png)


或直接使用`wget`命令进行下载（右击包名，复制链接地址）；

```bash
wget https://github.com/timonwong/prometheus-webhook-dingtalk/releases/download/v2.1.0/prometheus-webhook-dingtalk-2.1.0.linux-amd64.tar.gz
```
### 2.2 上传并解压服务
* 上传到服务器上
* 解压到`/usr/local/alertmanager/`下，改名为：`dingtalk`（路径和名称自己可以自定义，这里放到我安装的alertmanager下）

```bash
# 解压服务包
tar xf prometheus-webhook-dingtalk-2.1.0.linux-amd64.tar.gz 

# 移动并重命名目录名为dingtalk到/usr/local/alertmanager/下
mv prometheus-webhook-dingtalk-2.1.0.linux-amd64 /usr/local/alertmanager/dingtalk
```
### 2.3 创建钉钉群聊并添加自定义机器人
> 创建群聊：手机、电脑都可以
> 创建自定义机器人：电脑（手机会提示需要进行安全配置，需使用电脑端）

* 登录钉钉
* 创建群聊

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101548887.png)
* 选择好友，群归属可以选择自己的企业，也可以创建为普通群，这里我选择的是企业内部群，可根据自己需求选择

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101548025.png)

* 创建新的群聊 --> 群设置，可以修改群聊名称及群头像，这里自选

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101548217.png)
* 往下拉找到机器人

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101548334.png)
* 添加机器人，找到自定义

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101548367.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101548199.png)

* 点击添加，可以给机器人添加名字（自定义）
* 选择加签 --> 复制加签里的内容（需要用到）

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101547188.png)
* 我已阅读并同意 --> 完成 --> 会出来一个Webhook，这个点击复制保存一下（需要用到） --> 点击完成

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101547895.png)
* 完成之后就可以看到有一个机器人了

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101547075.png)

> 请记住`加签`及`Webhook`的内容，忘记了也可以点击机器人进行查看，最好自己保存一份；


### 2.4 配置 dingtalk 配置文件

```bash
# 进入钉钉配置目录
cd /usr/local/alertmanager/dingtalk

# 复制一份配置文件
cp -ar config.example.yml config.yml
```
* 编辑配置
> 也可以直接复制下面内容到`config.yml`中；
```yaml
# 全局超时配置
timeout: 5s

## 全局模板及模板路径配置
templates:
  - contrib/templates/legacy/template.tmpl
 
# 全局默认消息格式
default_message:
  title: '{{ template "legacy.title" . }}'
  text: '{{ template "legacy.content" . }}'
 
## 钉钉机器人目标配置（核心部分）
targets:
  webhook1:
    url: <粘贴Webhook的内容>
    secret: <粘贴加签的内容>
```
也可以配置多个webhook来区分，生产或者测试；

### 2.5 启动dingtalk服务并配置开机自启
* 写systemd管理启动脚本

```bash
vim /usr/lib/systemd/system/dingtalk.service
```
具体`dingtalk.service`内容，路径根据自己的情况修改；
```bash
[Unit]
Description=Prometheus DingTalk Webhook
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/usr/local/alertmanager/dingtalk
ExecStart=/usr/local/alertmanager/dingtalk/prometheus-webhook-dingtalk \
    --config.file=/usr/local/alertmanager/dingtalk/config.yml \
    --web.listen-address=:8060
Restart=always

[Install]
WantedBy=multi-user.target   
```
*  启动dingtalk服务并配置开机自启

```bash
# 加载systemd配置
systemctl daemon-reload
# 配置开机自启并启动服务
systemctl enable --now dingtalk.service
# 确认服务是否启动正常
systemctl status dingtalk.service
```

* 查看端口是否正常：默认监听8060端口

> 如需修改端口，可以再启动时的配置中修改`--web.listen-address=:8060`的端口；
```bash
netstat -anput | grep 8060
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101547554.png)

### 2.6 测试配置是否成功

```bash
curl -X POST http://localhost:8060/dingtalk/webhook1/send   -H "Content-Type: application/json"   -d '{"status":"firing","alerts":[{"labels":{"alertname":"Test","instance":"localhost"},"annotations":{"summary":"测试告警"}}]}'
```
出现`OK`并接收到消息就没问题；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101547071.png)


> 如果有问题可通过`journalctl -u dingtalk -f`命令来查看服务日志是否有报错；


## 三、配置 Alertmanager 添加钉钉告警
> 这里是基于我二进制部署的alertmanager的路径，可根据自己实际情况进行修改

```bash
# 进入alertmanager目录
cd /usr/local/alertmanager

# 修改alertmanager配置文件
vim /usr/local/alertmanager/alertmanager.yml
```
alertmanager 具体配置文件
```yaml
global:   # 全局的配置
  resolve_timeout: 5m  # 解析的超时时间

route:    # 将告警具体怎么发送
  group_by: ['alertname']  # 根据标签进行分组
  group_wait: 10s          # 发送告警等待时间
  group_interval: 10s      # 发送告警邮件的间隔时间
  repeat_interval: 1h      # 重复的告警发送时间
  receiver: 'dingtalk'     # 接收者是谁，需和receivers中的name一致

receivers:                 # 将告警发送给谁
- name: 'dingtalk'
  webhook_configs:
    - url: 'http://172.16.11.230:8060/dingtalk/webhook1/send'
      send_resolved: true   # 开启恢复通知
inhibit_rules:   # 抑制告警
  - source_match:
      severity: 'critical'   # 当收到同一台机器发送的critical时候，屏蔽掉warning类型的告警
    target_match:
      severity: 'warning'
    equal: ['alertname', 'severity', 'instance']  # 根据这些标签来定义抑制
```
> url中需注意：
> url路由规则：`http://<host>:<port>/dingtalk/<target_name>/send`，`target_name`为dingtalk配置中的`targets：`的 `webhook1`（可自定义的）；



![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101547043.png)

### 3.1 验证 alertmanger 配置文件

```bash
cd /usr/local/alertmanager/
./amtool check-config alertmanager.yml
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101547638.png)

### 3.2 重载alertmanager和Prometheus的配置
* 重载 alertmanager 配置

```bash
curl -lv -X POST http://localhost:9093/-/reload
```

* 重载 Prometheus 配置

```bash
curl -X POST http://localhost:9090/-/reload
```
### 3.3 通过Prometheus接口进行测试 - 模拟告警

```bash
curl -X POST http://localhost:9093/api/v2/alerts \
  -H "Content-Type: application/json" \
  -d '[{
    "labels": {
      "alertname": "TestDingTalk",
      "severity": "critical",
      "instance": "test-server-01"
    },
    "annotations": {
      "summary": "测试钉钉告警",
      "description": "这是一条测试消息，用于验证钉钉告警是否正常工作"
    },
    "startsAt": "2024-01-01T00:00:00Z"
  }]'
```
如下，正常收到信息，没问题

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101547672.png)
### 3.4 进行正常告警测试
> 需提前配置好告警规则；

* 告警测试

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101547672.png)
* 恢复告警测试

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101547325.png)


## 四、钉钉告警模板的优化

### 4.1 创建钉钉告警模板
* `vim /usr/local/alertmanager/dingtalk/contrib/templates/legacy/dingtalk.tmpl`

> 路径可以自定义

```yaml
{{ define "__subject" }}
[{{ .Status | toUpper }}{{ if eq .Status "firing" }}:{{ .Alerts.Firing | len }}{{ end }}]
{{ end }}

{{ define "__alert_list" }}{{ range . }}
---
**告警主题**: {{ .Annotations.summary }}

**告警类型**: {{ .Labels.alertname }}

**告警级别**: {{ .Labels.severity }}

**告警主机**: {{ .Labels.instance }}

**告警信息**: {{ .Annotations.description }}

**触发时间**: {{ .StartsAt.Format "2006-01-02 15:04:05" }}
{{ end }}{{ end }}

{{ define "__resolved_list" }}{{ range . }}
---
**恢复主题**: {{ .Annotations.summary }}

**告警类型**: {{ .Labels.alertname }}

**告警级别**: {{ .Labels.severity }}

**告警主机**: {{ .Labels.instance }}

**告警信息**: {{ .Annotations.description }}

**触发时间**: {{ .StartsAt.Format "2006-01-02 15:04:05" }}

**恢复时间**: {{ .EndsAt.Format "2006-01-02 15:04:05" }}
{{ end }}{{ end }}

{{ define "dingtalk.title" }}
{{ if eq .Status "firing" }}🔥【Prometheus告警】{{ .CommonLabels.alertname }}{{ else }}✅【Prometheus恢复】{{ .CommonLabels.alertname }}{{ end }}
{{ end }}

{{ define "dingtalk.content" }}
{{ if eq .Status "firing" }}🔥【Prometheus告警】{{ .CommonLabels.alertname }}{{ else }}✅【Prometheus恢复】{{ .CommonLabels.alertname }}{{ end }}
{{ if gt (len .Alerts.Firing) 0 }}
**==== 侦测到 {{ .Alerts.Firing | len }} 个故障 ====**
{{ template "__alert_list" .Alerts.Firing }}
{{ end }}

{{ if gt (len .Alerts.Resolved) 0 }}
**==== 已恢复 {{ .Alerts.Resolved | len }} 个故障 ====**
{{ template "__resolved_list" .Alerts.Resolved }}
{{ end }}
{{ end }}

{{ define "legacy.title" }}{{ template "dingtalk.title" . }}{{ end }}
{{ define "legacy.content" }}{{ template "dingtalk.content" . }}{{ end }}
```
### 4.2 修改dingtalk配置文件
* `vim /usr/local/alertmanager/dingtalk/config.yml`
```yaml
# 全局超时配置
timeout: 5s

## 全局模板及模板路径配置
templates:
  - /usr/local/alertmanager/dingtalk/contrib/templates/legacy/dingtalk.tmpl

# 全局默认消息格式
default_message:
  title: '{{ template "legacy.title" . }}'
  text: '{{ template "legacy.content" . }}'

## 钉钉机器人目标配置（核心部分）
targets:
  webhook1:
    url: <粘贴Webhook的内容>
    secret: <粘贴加签的内容>
```
> 主要修改了 **全局模板及模板路径配置** ；

### 4.3 重启dingtalk

```bash
# 重启服务
systemctl restart dingtalk.service

# 确认服务是否启动正常
systemctl status dingtalk.service
```
### 4.4 测试模板是否可用
```bash
curl -X POST http://localhost:8060/dingtalk/webhook1/send \
  -H "Content-Type: application/json" \
  -d '{
    "receiver": "dingtalk",
    "status": "resolved",
    "alerts": [
      {
        "status": "resolved",
        "labels": {
          "alertname": "TestAlert",
          "severity": "critical",
          "instance": "192.168.1.100:9100"
        },
        "annotations": {
          "summary": "节点宕机超过1分钟",
          "description": "192.168.1.100 节点无法连接"
        },
        "startsAt": "2026-02-25T10:00:00.000Z",
        "endsAt": "2026-02-25T10:05:30.000Z"
      }
    ],
    "groupLabels": {
      "alertname": "TestAlert"
    },
    "commonLabels": {
      "alertname": "TestAlert",
      "severity": "critical",
      "instance": "192.168.1.100:9100"
    },
    "commonAnnotations": {
      "summary": "节点宕机超过1分钟"
    }
  }'
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101547446.png)
### 4.5 进行正常告警测试
> 需提前配置好告警规则；

* 告警测试

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101547942.png)


* 恢复告警测试

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101546198.png)

## 五、钉钉多个群组配置
> 在`targets`中配置多个`target_name`，一个`target_name`代表的一个群聊机器人；<br>
> 比如：我创建了两个群聊，一个运维，一个开发的群
> 那么这两个群都需要添加一个机器人，然后获取到对应群聊的`Webhook`和`加签`的内容；
> 并在`targets`中配置两个`target_name`，将`Webhook`和`加签`的内容填到对应的`target_name`中；
```yaml
targets:
  webhook1:
    url: <粘贴Webhook的内容>
    secret: <粘贴加签的内容>

  development:
    url: <粘贴Webhook的内容>
    secret: <粘贴加签的内容>
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101546056.png)

> 在Alertmanager配置中写URL为：
> `http://localhost:8060/dingtalk/webhook1/send` 和 `http://localhost:8060/dingtalk/development/send`


## 六、多种通知方式同时触发

> 邮件+钉钉同时告警，主要注意的地方就是`route的receiver`和`receivers的name`要一致，一个`receivers`里可以有多个接收平台；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202603101546653.png)

> 更多不同级别的告警分配不同人或平台进行告警请参考：[Prometheus 之 Alertmanager配置说明及路由的使用](https://liucy.blog.csdn.net/article/details/158389731)；
