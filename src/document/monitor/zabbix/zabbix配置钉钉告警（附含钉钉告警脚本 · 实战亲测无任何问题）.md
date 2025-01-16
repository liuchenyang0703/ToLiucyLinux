---
title: zabbix配置钉钉告警（附含钉钉告警脚本 · 实战亲测无任何问题）
icon: circle-info
order: 1
category:
  - Linux
  - zabbix
  - 服务器监控
tag:
  - Linux
  - zabbix
  - 服务器监控
  - 运维
pageview: false
date: 2024-12-16
comment: false
breadcrumb: false
---

>🍁**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>


## 钉钉上操作（钉钉告警以关键词方式告警）
### 创建钉钉群
- 登录钉钉
- 创建钉钉群

手机、电脑都可以，这里以电脑举例

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161013287.png)

这里可以自己随便选择，我选择的是内部群

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161013869.png)

邀请好友，起一个群名称就可以了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161013695.png)


创建完成。



### 添加机器人-->设置关键词


创建完成之后点击群设置

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161013245.png)

往下翻找到“机器人”

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161013639.png)

点击添加机器人

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161013421.png)

添加”机器人“-->“自定义”

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161013926.png)

点击添加

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161012927.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161012770.png)


### 生成webhook（请保管好webhook的值；后面需要用到。）

<font color=red>请保管好webhook的值；后面需要用到。</font>


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161012572.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161012936.png)


## 服务器上操作

- 配置钉钉脚本


>安装python或者python3教程可参考：[Linux下安装Python3.6.8（超级详细）](https://liucy.blog.csdn.net/article/details/123680594)、[【Linux】中安装pip（详细教程）](https://liucy.blog.csdn.net/article/details/126519415)
```bash
#将脚本写在/usr/lib/zabbix/alertscripts/目录下
[root@zabbix ~]# cd /usr/lib/zabbix/alertscripts/

##安装python或者python3
[root@zabbix alertscripts]# yum install python3
 
[root@zabbix alertscripts]# vim dingding.py
```
> 注意：这里需要提前安装好这几个python模块：`requests、json、sys、os、datetime`；
> 安装方式为：`pip3 install requests` 以此类推；
> 如遇到以下报错就是没有安装`requests模块`，就需要pip安装一下；<br>
> ![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161012035.png)
```bash
#!/usr/bin/env python
# -*- coding: utf-8 -*- 
import requests
import json
import sys
import os
import datetime
webhook = "https://oapi.dingtalk.com/robot/send?access_token=237132311231w4ru3rweehfiuqeor21o34u1923412werqwrq223"
user=sys.argv[1]
subject=sys.argv[2]
text=sys.argv[3]
data={
        "msgtype": "text",
        "text": {
                "content": "%s%s"%(subject,text)
        },
        "at": {
                "atMobiles": [
                        user
                        ],
                        "isAtAll": False
        }
}
headers = {'Content-Type': 'application/json'}
x=requests.post(url=webhook,data=json.dumps(data),headers=headers)
if os.path.exists("/usr/lib/zabbix/alertscripts/log/dingding.log"):
        f=open("/usr/lib/zabbix/alertscripts/log/dingding.log","a+")
else:
        f=open("/usr/lib/zabbix/alertscripts/log/dingding.log","w+")
f.write("\n"+"--"*30)
if x.json()["errcode"] == 0:
        f.write("\n"+str(datetime.datetime.now())+"    "+str(user)+"    "+"发送成功"+"\n"+str(text))
        f.close()
else:
        f.write("\n"+str(datetime.datetime.now())+"    "+str(user)+"    "+"发送失败"+"\n"+str(text))
        f.close()
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161012465.png)


```bash
#为脚本添加执行权限
[root@zabbix alertscripts]# chmod +x dingding.py
 
#修改脚本的属主和属组：
[root@zabbix alertscripts]# chown zabbix.zabbix dingding.py
```

- 创建日志文件：

```bash
[root@zabbix alertscripts]# mkdir -p /usr/lib/zabbix/log/
 
[root@zabbix alertscripts]# touch /usr/lib/zabbix/log/dingding.log
 
[root@zabbix alertscripts]# chown zabbix.zabbix -R /usr/lib/zabbix/log/
```

- 测试脚本是否能运行成功：

注意关键词；
```bash
#py脚本 手机号 关键词 告警信息
./dingding.py 12312312312 告警 test

```
手机号写的正确的话就可以直接@他，如果随便写的就不会输出，如下图的上（正确手机号）、下（错误手机号）

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161012679.png)

成功接收到信息，完成！

## web页面操作

 - 管理-->报警媒介类型-->创建媒体类型

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161012859.png)

```bash
{ALERT.SUBJECT}
{ALERT.MESSAGE}
{ALERT.SENDTO}
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161012980.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161012531.png)

- 配置-->动作-->创建动作

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161012192.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161012808.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161012251.png)

```bash
#告警操作内容：
##标题：
服务器:{HOST.NAME}发生: {TRIGGER.NAME}故障!
##消息内容：
告警主机:{HOST.NAME}
告警地址:{HOST.IP}
监控项目:{ITEM.NAME}
监控取值:{ITEM.LASTVALUE}
告警等级:{TRIGGER.SEVERITY}
当前状态:{TRIGGER.STATUS}
告警信息:{TRIGGER.NAME}
告警时间:{EVENT.DATE} {EVENT.TIME}
事件ID:{EVENT.ID}


#恢复操作内容
##标题：
服务器:{HOST.NAME}: {TRIGGER.NAME}已恢复!
##消息内容：
告警主机:{HOST.NAME}
告警地址:{HOST.IP}
监控项目:{ITEM.NAME}
监控取值:{ITEM.LASTVALUE}
告警等级:{TRIGGER.SEVERITY}
当前状态:{TRIGGER.STATUS}
告警信息:{TRIGGER.NAME}
告警时间:{EVENT.DATE} {EVENT.TIME}
恢复时间:{EVENT.RECOVERY.DATE} {EVENT.RECOVERY.TIME}
持续时间:{EVENT.AGE}
事件ID:{EVENT.ID}
```

操作添加：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161012952.png)

恢复操作添加：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161011878.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161011168.png)

- 个人中心-->报警媒介-->添加

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161011916.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161011637.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161011037.png)

## 钉钉接收告警信息测试
自己设置好服务器的`监控项`和`触发器`，让他告警；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161011369.png)

成功收到，完成！！！















