---
title: Zabbix5.0配置企业微信告警
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




![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161017672.jpeg)

<br>

<br>

<font color=green size=5>相关文章：</font>
>💻 zabbix的安装部署可参考：[zabbix5.0部署（超级详细）](https://liucy.blog.csdn.net/article/details/124248236)<br>
>
>---
>💻 zabbix的脚本安装部署可参考：[zabbix5.0离线脚本一键安装(包含服务端、客户端、脚本和使用说明)](https://download.csdn.net/download/liu_chen_yang/86168600)<br>
>
>---
>zabbix5.0设置企业微信告警，首先需要一个企业微信；

## 一、配置企业微信
### 1、注册企业微信
**<font color=red>&emsp;&emsp;如果需要用公司的企业微信来做告警信息的接收者，那么这个步骤就可以省略了。</font>**
>如果是在公司，监控自定义服务，需要部分的人员都能看到，哪最好就是去找公司企业微信的创建人，因为后面会用到企业ID。

没有企业微信我们可以到这里注册一个：[https://work.weixin.qq.com/](https://work.weixin.qq.com/)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161017203.png)

企业名称可填写企业、政府或组织名称

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161017732.png)

填写完成之后点击注册就可以了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161017277.png)

注册完成之后也可以邀请同事或者同学、朋友进来都可以；
注册完成后通过网页登陆企业微信（**<font color=red>因为一些操作只有页面管理能操作</font>**）

### 2、添加部门
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161017194.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161017100.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016453.png)

添加完部门看一下部门Id，后面写配置的时候要用到。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016654.png)

### 3、添加部门成员
>可以文件导入，也可以从其他部门移入，也可以自己添加成员。

我们就来自己添加吧；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016038.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016744.png)

完成之后可继续添加，也可以直接保存；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016492.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016859.png)

### 4、自建应用（用来告警通知的）

选择应用管理---->选择自建应用（支持小程序）

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016430.png)

创建应用；
>- &emsp;logo可以自己去网上查找或者自己做一个；
>- &emsp;应用名称可以自己定义，我定义的就是”zabbix监控“；
>- &emsp;应用介绍可以不填，看自己情况；
>- &emsp;可见范围，选择刚刚创建的部门即可。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016360.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016889.png)

创建成功查看
>&emsp;&emsp;要记住id，后续还需要secret，到时候查看按照步骤做就可以了。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016559.png)

点击查看Secret

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016970.png)

点击发送后在企业微信内会有信息，点击查看Secret

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016634.png)

点击前往查看；记下来，后续要用到；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016977.png)
顺便查看一下企业的ID，后续需要用到；

>&emsp;&emsp;点击我的企业--->企业信息--->最下面有一个企业ID；（这个是需要记住的，后续要使用）。


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016841.png)

## 二、配置zabbix服务端（zabbix-server）
<br>

### 1、编辑zabbix-server.conf文件进行配置

```bash
#进入zabbix_server配置文件
vim /etc/zabbix/zabbix_server.conf

#默认523行会有这条，这里是存放脚本的位置
AlertScriptsPath=/usr/lib/zabbix/alertscripts
```

### 2、安装组件requests

```bash
yum -y install python-requests
```

### 3、微信报警脚本
>下载地址：[zabbix微信告警.py](https://download.csdn.net/download/liu_chen_yang/86087478)


在/usr/lib/zabbix/alertscripts目录下操作；
```bash
#进入/usr/lib/zabbix/alertscripts
cd /usr/lib/zabbix/alertscripts
#创建一个python脚本
vim weixin.py
```
复制下面的脚本粘贴上去即可；

```python
#!/usr/bin/python
#_*_coding:utf-8 _*_
 
 
import urllib,urllib2
import json
import sys
import simplejson
import base64
import hashlib
 
reload(sys)
sys.setdefaultencoding('utf-8')
 
 
def gettoken(corpid,corpsecret):
    gettoken_url = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=' + corpid + '&corpsecret=' + corpsecret
    print  gettoken_url
    try:
        token_file = urllib2.urlopen(gettoken_url)
    except urllib2.HTTPError as e:
        print e.code
        print e.read().decode("utf8")
        sys.exit()
    token_data = token_file.read().decode('utf-8')
    token_json = json.loads(token_data)
    token_json.keys()
    token = token_json['access_token']
    print(token)
    return token
 
def senddata(access_token,user,subject,content):
    with open('/usr/lib/zabbix/alertscripts/graph/bg.png',mode='rb') as f:
       png = f.read()
    png_md5 = hashlib.md5()
    png_64 = base64.b16encode(png)
    send_url = 'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=' + access_token
    send_values = {
        "touser" : "@all",   #企业号中的用户帐号，在zabbix用户Media中配置，如果配置不正常，将按部门发送。
        "toparty":"2",    #企业号中的部门id。
        "msgtype":"text", #消息类型。
        "agentid":"100035",    #企业号中的应用id。
        "text":{
            "content":subject + '\n' + content
           },
        "safe":"0"
        }
        
#    send_data = json.dumps(send_values, ensure_ascii=False)
    send_data = simplejson.dumps(send_values, ensure_ascii=False).encode('utf-8')
    send_request = urllib2.Request(send_url, send_data)
    response = json.loads(urllib2.urlopen(send_request).read())
    print str(response)
 
 
if __name__ == '__main__':
    user = str(sys.argv[1])     #zabbix传过来的第一个参数
    subject = str(sys.argv[2])  #zabbix传过来的第二个参数
    content = str(sys.argv[3])  #zabbix传过来的第三个参数
 
    corpid =  '22jsaooasbf23934'   #CorpID是企业号的标识
    corpsecret = '410Jsk8_4lvCQYmdo92-sdfafsadfasdfxzc'  #corpsecretSecret是管理组凭证密钥
    accesstoken = gettoken(corpid,corpsecret)
    senddata(accesstoken,user,subject,content)
```

注意里面要修改的地方；（上面说过了几处地方是需要注意的后面需要用到，现在就可以用到了）；

>需要修改的地方有：
><br>
>-   第40行:&emsp; "toparty":"2",    #企业部门id。
>-  第42行：&emsp;"agentid":"100035",    #企业号中的应用id。
>- 第61行：&emsp;corpid =  '22jsaooasbf23934'   #CorpID是企业号的标识
>- 第62行：&emsp;corpsecret = '410Jsk8_4lvCQYmdo92-sdfafsadfasdfxzc'  #corpsecretSecret是管理组凭证密钥

企业部门的id

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016347.png)

企业号中的应用id

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016113.png)

CorpID是企业号的标识（企业的id）

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016951.png)

管理组凭证密钥（应用的Secret，在应用管理中）
>遇到过期的话重新发送一下就可以；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161016745.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015758.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015273.png)

更换好之后，保存退出即可；

### 4、测试脚本是否可用

```bash
python /usr/lib/zabbix/alertscripts/weixin.py aaabbbccc abc 1234

{u'msgid': u'mrVtVXE39it1tWVvd57npP-C0Y8uy8F_-hstvi9e_Y0gSghmqd6IOO4SWKCTeFNyUYjV8TgdE3IXSGC3g2w_oQ', u'errcode': 0, u'errmsg': u'ok'}
```
## 三、配置zabbix web端
<br>

>因为之前我已经把监控项和触发器弄好了，所以，直接配置报警媒介类型就好了。

可以参考：[zabbix添加自定义监控项&告警（邮件）](https://liucy.blog.csdn.net/article/details/124101253)

### 1、配置报警媒介类型

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015834.png)

脚本名称一定要和alertscripts目录下放的一样；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015334.png)

完成之后外面有一个测试（zabbix5.0以及以后才有）

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015046.png)

收件人“@all”就可以

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015853.png)

如果有报错，就解决一下报错；没有的话就直接去企业微信看看能收到信息嘛
；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015688.png)

这样就是发送成功了，我们去企业微信看一下；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015420.png)

可以看到消息已经发送过来了。

使所有的告警信息都发送到企业微信的话，我们可以往下看；


### 2、配置动作
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015344.png)

名称自己起一个就好了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015069.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015809.png)

仅送到选择所有就可以：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015030.png)

恢复操作选择“通知所有参与者”就可以；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015255.png)

动作设置完成，去设置用户；

### 3、配置用户
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015262.png)

选择报警媒介--->点击添加

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015382.png)

选择weixin即可；收件人还是“@all”；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015187.png)

添加完成之后一定要点击更新；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015890.png)


### 4、测试发送告警

成功接收到告警；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161015736.png)
至此zabbix5.0配置企业微信告警就完成了。