---
title: 【zabbix】解决zabbix在web页面显示中文乱码问题
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

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---

## 问题
>问题所在处：在web页面来添加图形，实时监控数据的时候我们一般会写中文，可是，添加完成之后发现中文是乱码，那么我们这期就来解决这个问题；图如下👇

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161014739.jpeg)
## 解决方法
1、在zabbix服务端找到<font color=red>**defines.inc.php**</font>文件；找不到的可以使用find 方法查找；

```bash
find / -name defines.inc.php
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161014607.png)

这里我们可以看到查找到了好几个，那么哪个才是正确的呢，首先先找有zabbix词的，其他都排除，还有其他带zabbix的，但是一般都是<font color=red>/usr/share/zabbix/include/defines.inc.php</font>这个目录；

2、找到这个目录进入，这里需要修改两处地方：

```bash
#进入目录
vim /usr/share/zabbix/include/defines.inc.php

#修改两处地方；
#修改一：可以查找到这个单词“ZBX_GRAPH_FONT_NAME”，默认应该是在72行；
原：define('ZBX_GRAPH_FONT_NAME',           'graphfont'); // font file name
改为：define('ZBX_GRAPH_FONT_NAME',           'zabbix'); // font file name

#修改二：可以查找到这个单词“ZBX_FONT_NAME”，默认应该是在113行；
原：define('ZBX_FONT_NAME', 'graphfont');
改为：define('ZBX_FONT_NAME', 'zabbix');
```

><font color=red>修改可以默认给定名字；但两处修改名字要一样，后面上传的图片也要修改成你定义的名字；</font>

修改一图片：
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161014912.png)

修改二图片：
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161014266.png)

3、将Windows的字体上传到服务器上并放到指定目录

首先我们现在windows上找到存放字体的地方，默认的位置在<font color=red> **C:\Windows\Fonts** </font>目录下；
找到之后我们可以找出自己想要的字体，但是为了能看懂还是选择中文较好；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161013640.png)

找到自己想要的图片，上传至服务器上，如果不知道上传到服务器哪个位置，我们可以先找到指定的目录；

这个一般就存放到<font color=red> **/usr/share/zabbix/assets/fonts/** </font>目录下；当然也可以 find 查找；

找到目录之后可以直接将选中的字体上传到这个目录，然后修改名字为<font color=red>zabbix</font>，也就是在配置文件中写的；
```bash
mv xxx.ttf zabbix.ttf
```
复制到该目录，重命名之后我们来重启服务；

4、重启服务

```bash
systemctl restart zabbix-server.service
```


## 查验
重启完服务后，登录web页面查验；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161013377.png)

这时候我们可以看到已经修改成功了；问题解决！



