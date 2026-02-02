---
title: 【Linux】Prometheus + Grafana的使用
icon: circle-info
order: 1
category:
  - Linux
  - Prometheus
  - Grafana
tag:
  - Linux
  - Prometheus
  - Grafana
  - 运维
pageview: false
date: 2026-01-20
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

## 一、 配置 Prometheus 数据源
>下面我们把 Prometheus 服务器收集的数据做为一个数据源添加到 grafana，让 grafana 可以得到 Prometheus 的数据。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020957705.png)


选择`Prometheus`

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020957542.png)

这里改成部署`prometheus`的`ip:9090`；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020957085.png)

往下拉，吧http请求改为Get请求

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020957423.png)

然后保存并测试

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020957938.png)

## 二、导入grafana监控面板 

>这里我们使用现成的模板导入即可，GitHub上面很多人开发了dashboards模板，官方社区上也有很多开源的dashboards模板，我们只需要把模板的`ID` 或者 `JSON`文件导入到`grafana`中即可；<br>
>官方模板地址：[https://grafana.com/grafana/dashboards/](https://grafana.com/grafana/dashboards/)


进入官网，往下拉，可以看到有很多模板，这里比如我们可以找`node_exporter`，可以直接搜索，也可也再`Collector Types`中选择`Node exporter` ，然后根据自己的需求选择模板；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020957549.png)

找到心仪的模板之后点进去，可以看到右边有`Copy ID` 和 `Download JSON`，自行选择就行；这里我选择复制id；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020957159.png)

复制好id之后，打开在 Grafana 页面中，找到仪表板 --> 新建 --> 导入，选择自己导入的方式，输入 ID 号、网址或者上传 JSON 文件、输入JSON都可以，点击 加载；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020957568.png)

选择刚刚创建的数据源，名称和文件夹也可以自行修改，再Import导入；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020957690.png)

就可以看到`Prometheus `的数据了；
* 也可以根据主机名选择服务器，主机名可选择的是Prometheus的`node_exporter`；
* 也可以修改刷新时间，点击`Refresh`旁边的V ，选择自动刷新的时间；
* 也可以自定义选择网卡信息，进行网卡流量监控； 

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020957215.png)

## 三、设置仪表板
首先，打开仪表板，找到要添加的模板，点进去，右上角有个编辑，点击编辑，即可进入编辑模式，然后就可以看到设置按钮；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020957506.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020957355.png)

> 这里可以进行设置或修改模板
> **概括：** 标题、描述、标签、文件夹、是否可编辑、时间、自动刷新的时间
> **注释：** 
> **变量：** 
> **链接：** 
> **版本：** 
> **权限：** 
> **JSON模型：** 

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020957660.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020957341.png)

## 四、新建仪表板 / 添加仪表板
> 这里展示添加仪表板，新建也是以此类推，不过比添加仪表板少个步骤而已；

首先，打开仪表板，找到要添加的模板，点进去，右上角有个编辑，点击编辑，即可进入编辑模式；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020956750.png)

点击添加，可添加可视化、从库导入、行、粘贴面板，以下是说明：
1. **添加可视化（Add Panel）**
   -  **说明：** 这是最常用的选项，用于在仪表板上添加一个新的可视化组件（即一个面板）。面板可以展示图表、表格、日志、仪表等，是仪表板展示数据的主要方式。你可以在面板中编写查询，选择数据源，设置图表类型，调整样式等。
   -   **使用场景：** 当你需要展示特定数据的图表或表格时，你可以添加一个新的面板，并在其中编写查询和设置可视化选项。

2. **从库导入（Import）**
   -   **说明：** Grafana 允许用户创建仪表板库，这些库可以包含一个或多个面板、变量、数据源等。通过“从库导入”功能，你可以将这些预定义的仪表板库导入到当前仪表板中。这对于快速创建仪表板或重用已有的仪表板设计非常有用。
   - **使用场景：** 如果你有一个仪表板模板或想要重用其他用户的仪表板设计，你可以从库中导入这些设计，然后根据需要进行调整。

3. **行（Add Row）**
   -   **说明：** 在 Grafana 的仪表板中，你可以将面板组织成行。选择“行”选项会在仪表板中添加一个新的行容器。你可以将多个面板拖放到同一行中，以便它们在仪表板上水平排列。这有助于更好地组织和布局仪表板。
   - **使用场景：** 当你的仪表板包含多个面板，并且你希望它们在视觉上更有条理时，你可以使用行来组织这些面板。

4. **粘贴面板（Paste Panel）**
	-  如果看到一个面板不错的话，想用这个面板再单独做一个数据展示，这时候就可以复制这个面板，然后到这里点击粘贴面板。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020956706.png)

> 这里展示为：**添加可视化**
> 比如：我现在监控网卡每秒网络带宽使用；

可视化界面展示说明：

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020956728.png)
* 进来先确定好需要做什么，查询什么内容
* 然后，选择数据源

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020956613.png)
* 选择指标，可以同时添加多个指标，这里我就选择做网卡每秒网络带宽使用，那就需要添加上行和下行流量，可以参考此文：[【云原生】Prometheus之PromQL用法详解](https://liucy.blog.csdn.net/article/details/155536019)   来写`PromQL`，或者直接可视化选择要展示的内容；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020956288.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020956023.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020956567.png)

* 自定义图标下面展示的文字，再填写指标的这块选择：`Options` - `Legend` - `Custom` - 可以使用变量，变量使用`{{device}}`这样使用；例如，吧下面的名称改为哪个网卡的每秒下载流量；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020956964.png)
* 给此表起个名字，也就是标题，这里的标题也是可以用变量的，变量写法为：`$device`，代表网卡名称；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020956038.png)

* 右侧也有很多选项，比如，默认的查询结果为字节，我们可以修改单位为：`kb/s`，可以再右侧拉到下面找到单位，这里提供了很多类型的单位，可以自己选择，也可以自定义；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020956667.png)
* 达到自己想要的效果之后就可以点击右上角的保存仪表板了，直接保存，再返回数据面板就可以看到自己创建的了；也可以根据主机名、网卡名称进行自动变化；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020956148.png)
* 这里看到之后还需要点击右上角保存仪表板，这时候就可以安心的退出到主页面了；


## 五、面板的操作
### 5.1 查看
> 用于放大查看当前面板的信息；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020956791.png)
### 5.2 编辑
> 进入编辑模式，用于增加、修改、删除当前面板信息；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020956143.png)
### 5.3 分享
#### 5.3.1 共享连接
>  通过链接别人可以看到当前面板；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020956083.png)
#### 5.3.2 共享嵌入 
> 可以通过生成的iframe嵌入到html中；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020955015.png)

#### 5.3.3 共享快照
> 为了防止修改、更新错误，再更新之前可以添加快照，方便回滚

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020955100.png)
### 5.4 探索
> 查看当前面板的promql语法，并可以在这里进行测试而不影响面板本身；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020955844.png)

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020955353.png)
### 5.5 检查
#### 5.5.1 数据
> 以表视图形式查看监控的数据值

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020955979.png)

#### 5.5.2 查询
> 点击刷新，会根据当前选中的面板中配置的`PromQL`语句及主机的信息自动查询，展示为JSON结果；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020955551.png)
#### 5.5.3 面板JSON
> 当前面板的JSON数据，包含所有配置的内容；

```json
{
  "id": 186,
  "type": "timeseries",
  "title": "$device 网卡每秒网络带宽使用",
  "gridPos": {
    "x": 0,
    "y": 8,
    "h": 8,
    "w": 12
  },
  "fieldConfig": {
    "defaults": {
      "custom": {
        "drawStyle": "line",
        "lineInterpolation": "linear",
        "barAlignment": 0,
        "barWidthFactor": 0.6,
        "lineWidth": 1,
        "fillOpacity": 0,
        "gradientMode": "none",
        "spanNulls": false,
        "insertNulls": false,
        "showPoints": "auto",
        "showValues": false,
        "pointSize": 5,
        "stacking": {
          "mode": "none",
          "group": "A"
        },
        "axisPlacement": "auto",
        "axisLabel": "",
        "axisColorMode": "text",
        "axisBorderShow": false,
        "scaleDistribution": {
          "type": "linear"
        },
        "axisCenteredZero": false,
        "hideFrom": {
          "tooltip": false,
          "viz": false,
          "legend": false
        },
        "thresholdsStyle": {
          "mode": "off"
        }
      },
      "color": {
        "mode": "palette-classic"
      },
      "mappings": [],
      "thresholds": {
        "mode": "absolute",
        "steps": [
          {
            "value": null,
            "color": "green"
          },
          {
            "value": 80,
            "color": "red"
          }
        ]
      },
      "unit": "bps"
    },
    "overrides": []
  },
  "pluginVersion": "12.3.0",
  "targets": [
    {
      "refId": "A",
      "expr": "irate(node_network_receive_bytes_total{instance=~\"$node\", device=~\"$device\"}[5m]) * 8",
      "range": true,
      "instant": false,
      "datasource": {
        "type": "prometheus",
        "uid": "df5uftijpl4owd"
      },
      "editorMode": "builder",
      "legendFormat": "{{device}}_in下载"
    },
    {
      "refId": "B",
      "expr": "irate(node_network_transmit_bytes_total{instance=~'$node',device=~\"$device\"}[5m])*8",
      "range": true,
      "instant": false,
      "datasource": {
        "uid": "df5uftijpl4owd",
        "type": "prometheus"
      },
      "hide": false,
      "editorMode": "builder",
      "legendFormat": "{{device}} 网卡每秒下载流量"
    }
  ],
  "datasource": {
    "uid": "df5uftijpl4owd",
    "type": "prometheus"
  },
  "options": {
    "tooltip": {
      "mode": "single",
      "sort": "none",
      "hideZeros": false
    },
    "legend": {
      "showLegend": true,
      "displayMode": "list",
      "placement": "bottom",
      "calcs": []
    }
  }
}
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020955571.png)

### 5.6 指标深入分析
> 在 Grafana 中，“`Open in Grafana Metrics`” 是一个功能，主要用于快速跳转到与当前指标相关的详细分析页面，帮助用户更深入地查看和分析特定指标的详细数据。这个功能通常与 Prometheus、Loki 等数据源集成;

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020955018.png)


### 5.7 更多
#### 5.7.1 复制	
> 复制当前的面板，再编辑的时候可以选择粘贴面板，出现一个一样的面板

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020955090.png)

#### 5.7.2 新建警报规则
> 为此面板添加告警规则，达到设定的阈值就会给配置的邮箱或其他发送告警通知；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020955893.png)

#### 5.7.3 隐藏图例
> 会把当前面板底部的说明给隐藏掉，说明就是说这条线是干什么的这种。

* 未隐藏前

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020955160.png)

* 隐藏后

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020955019.png)


#### 5.7.4 获得帮助
> 把当前面板查询的原始数据、面板 JSON、时间区间等一次性打包，生成一个**脱敏快照**（Snapshot）。
> 可以直接下载**数据面板json数据**或**直接复制**，别人就可以通过json数据导入面板，看到当前模板的数据了，但不能进行指标等；


![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602020954442.png)





