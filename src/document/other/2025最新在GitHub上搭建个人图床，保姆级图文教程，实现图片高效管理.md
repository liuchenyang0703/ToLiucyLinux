---
title: 2025最新在GitHub上搭建个人图床，保姆级图文教程，实现图片高效管理
icon: circle-info
order: 1
category:
  - github
  - 图床
tag:
  - github
  - 图床
date: 2025-11-26
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
---



> 在数字化时代，图片已成为我们日常沟通和表达的重要方式。无论是社交媒体、博客还是论坛，图片都是不可或缺的元素。然而，随着图片数量的不断增加，如何高效地存储和分享图片成为了一个难题。这时候，图床应运而生，成为解决这一问题的利器。

### <font color="purple">🌍一. 图床</font>

#### <font color="Deep purple">❄️1.什么是图床</font>

图床，顾名思义，就是存储图片的“床”。它是一种在线服务，允许用户上传、存储和分享图片。通过图床，用户可以将图片上传到云端，然后获得一个链接，可以在任何地方分享这个链接，而不需要担心图片的存储和带宽问题。

#### <font color="Deep purple">❄️2.图床能解决什么问题？ </font>
- 存储问题：个人用户或者小型网站往往没有足够的服务器空间和带宽来存储和传输大量图片。图床提供了廉价甚至免费的图片存储解决方案，让用户可以无忧地存储大量图片。
- 分享问题：图床使得图片分享变得更加简便。用户可以轻松地获得图片的链接，然后在任何地方分享这个链接，而不需要复杂的操作。这对于社交媒体、博客和论坛来说尤为重要。
- 管理问题：图床通常提供图片管理的功能，用户可以组织和管理自己的图片，方便查找和使用。一些高级的图床还提供标签、分类等功能，让用户可以更高效地管理自己的图片。
- 性能问题：图床往往拥有强大的服务器和CDN（内容分发网络），可以快速地向全球用户传输图片，提高图片的加载速度。这对于提升用户体验至关重要。
- 安全性问题：一些图床提供图片防盗链功能，保护用户的图片不被未经授权的网站盗用。这对于保护用户的知识产权非常重要。

> 下面跟随着我的脚步，在gitHub上面搭建自己的图床，并且使用 PicGo 的可视化界面配置 GitHub 图床后，你可以在 Typora 中直接粘贴截图，Typora 会自动通过 PicGo 将图片上传到你的 GitHub 仓库。这样，你和他人就可以通过访问这些链接来共享图片，确保在发送文件时图片不会丢失。 


### <font color="purple">🌍二. 在github上面创建图床</font>

关于访问github速度慢的问题,在创建图床之前,先给大家分享一个工具Watt Toolkit  安装之后直接启动就OK,这里就不过多演示.

2.1 创建仓库
- 登录 GitHub。
- 点击右上角的 “+” 号，选择 “New repository”。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261433952.png)

- 填写仓库名称，仓库描述写不写无所谓，选择仓库可见性（公开或私有）建议公开，然后点击 “Create repository”。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261436898.png)

2.2 生成token令牌
- 点击右上角的头像或照片。
- 从下拉菜单中选择 “Settings”。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261436904.png)

- 在左侧菜单中，点击 “Developer settings”。
- 在 “Developer settings” 页面中，点击 “Personal access tokens”。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261436772.png)

- 点击 “Generate new token” 按钮。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261436959.png)

- 在 “Note” 字段中，输入一个描述性名称，以便你记住这个令牌的用途。
- 选择令牌的 “Expiration” 日期。你可以选择让令牌永不过期，或者设置一个过期日期。
- 选择令牌的 “Scopes” 或权限。根据你使用令牌的目的，选择合适的权限。例如，如果你只需要访问仓库内容，可以选择 “repo” 权限。
- 下划，点击 “Generate token” 按钮。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261436373.png)

- 一旦生成令牌，你将看到令牌的明文。请立即复制并保存这个令牌到一个安全的地方。这是你唯一一次看到这个令牌的机会。
- 之后，你将无法查看这个令牌的明文，只能看到它是否仍然有效。 

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261436718.png)

>   注意:
>
>  * 个人访问令牌非常敏感，应像密码一样保护。不要将其泄露给他人，也不要将其硬编码在代码中。
>  * 如果你怀疑令牌的安全性受到了威胁，应立即在 GitHub 设置中撤销该令牌。
>  * GitHub 令牌可以用于执行与你的 GitHub 账户相关的各种操作，因此请谨慎选择令牌的权限。 

### <font color="purple">🌍三. PicGo</font>

#### <font color="Deep purple">❄️1. PicGo介绍</font>

**一、什么是PicGo？**

PicGo 是一个开源的图片上传工具，支持多种图床服务，如七牛云、又拍云、SM.MS等。它可以帮助用户将本地图片上传到图床，并生成图片链接，方便在社交媒体、博客或论坛中分享。

**二、PicGo能解决什么问题？**
1. **图片上传**：PicGo可以快速上传本地图片到图床，节省用户手动上传的时间。
2. **图片管理**：PicGo支持图片的批量上传和管理，用户可以方便地查找和使用已上传的图片。
3. **图片链接生成**：PicGo在上传图片后，会自动生成图片链接，方便用户在各种平台上分享。
4. **图床切换**：PicGo支持多种图床服务，用户可以根据需要随时切换图床，灵活应对不同的需求。
#### <font color="Deep purple">❄️ 2. 下载与安装</font>

>  下载地址： [Github地址](https://github.com/Molunerfinn/PicGo/releases)

 笔者是选择如图所示的下载资源 
 
 ![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261436313.png)

安装之后打开，我们进行配置图床。如果出现错误，往下先看常见的错误解决方法。

#### <font color="Deep purple">❄️3. 配置图床 </font>
- 打开图床设置

- 打开Github

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261436348.png)

-  设定仓库名，实际上就是用户名+仓库名。这个仓库就是你刚刚在2.1中新建的仓库。 

-  设定分支名：就是你的仓库在哪个分支里，就填哪个分支。一般有main分支，master分支等。我这里是自己新创建的一个img分支。 

-  设定Token：就是刚刚在2.2中我们复制的Token字符串。将其填进去即可。 

-  设定存储路径，一般来说，它可以是你项目仓库中的一个文件夹。我们这里就统一设置成了img/ 

-  设置自定义域名。这个是比较关键的。我们可以用一个免费的加速域名作为我们自定义域名。 

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261436146.png)

> 那么你所设置的就应当为`https://gcore.jsdelivr.net/gh/` +你的账户名+你的仓库名@你的分支名。 
 需要注意的是，这里一定要设置成@，而不要设置成 / 我也是花了很长很长时间才搞明白。。。 
 设置成 / 以后，你会惊奇地发现，它在你的typora里面显示不了。。。 

 |cdn地址|是否需要外网|
 |--|--|
 |https://cdn.jsdelivr.net/gh/|需要|
 |https://gcore.jsdelivr.net/gh/|不需要(推荐,快一些)|
 |https://fastly.jsdelivr.net/gh/|不需要|


 | 线路                  | 首次加载  | 缓存后   |
| ------------------- | ----- | ----- |
| cdn.jsdelivr.net    | 5-7 s | 2 s   |
| gcore.jsdelivr.net  | 1.2 s | 0.3 s |
| fastly.jsdelivr.net | 1.5 s | 0.3 s |



配置完以后，就可以点击确定，然后也可以将其设置为默认图床。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261436985.png)

这样我们就可以通过PicGo来上传我们的图片,在上传的时候，一定要注意，把steam++给关了,也就是我们上面推荐的工具.

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261436628.png)

然后，我们也可以对PicGo进行一系列的设置。

比如启用时间戳，这样在多次上传同一张图片的时候就不会有问题了。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261436872.png)

#### <font color="Deep purple">❄️3.错误解决</font>

##### 问题1

1.打开Picgo，显示报错

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261436871.png)

2.解决方法直接输入：%APPDATA%picgo,直接删除data.json文件（如果觉得不安全，可以备份)

3.重启即可

##### 问题2

1.picgo报错打不开，卸载重装后发现打不开软件界面，后台进程却有进程显示和发现存在某些版本安装不成功的现象

2.解决方案：发现c盘的C:\Program Files中存在一个picgo文件目录并没有被删除，删除picgo可以正常打开界面。

##### 问题3

2.pic最新版本以后，按原来的配置无法正常上传图片，进入picgo设置-&gt;设置日志文件

```bash
------Error Stack Begin------
 RequestError: Error: getaddrinfo ENOTFOUND mynote123.oss-cn-guangzhou.aliyuncs.com.aliyuncs.com
     at new RequestError (G:\Typora\PicGo\resources\app.asar\node_modules\request-promise-core\lib\errors.js:14:15)
     at Request.plumbing.callback (G:\Typora\PicGo\resources\app.asar\node_modules\request-promise-core\lib\plumbing.js:87:29)
     at Request.RP$callback [as _callback] (G:\Typora\PicGo\resources\app.asar\node_modules\request-promise-core\lib\plumbing.js:46:31)
     at self.callback (G:\Typora\PicGo\resources\app.asar\node_modules\request\request.js:185:22)
     at Request.emit (node:events:394:28)
     at Request.onRequestError (G:\Typora\PicGo\resources\app.asar\node_modules\request\request.js:877:8)
     at ClientRequest.emit (node:events:394:28)
     at TLSSocket.socketErrorListener (node:_http_client:447:9)
     at TLSSocket.emit (node:events:394:28)
     at emitErrorNT (node:internal/streams/destroy:157:8)
 -------Error Stack End------- 


```

看错误是地址无法成功访问，复制地址去ping发现也无法打开，仔细观察发现多了.aliyuncs.com

于是删除存储区域的后缀，总结是旧版本和新版本的配置有差异性造成的（之前一直使用的是2.3.0版本）。

##### 问题4

1.鼠标双击图标后根本没反应

2.解决方法，找到下面的小图标，就可以打开了

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261436418.png)

### <font color="purple">🌍 四. Typora</font>

Typora 是一款跨平台的Markdown编辑器，支持Windows、macOS和Linux操作系统。它以其简洁的界面和强大的功能，为用户提供了流畅的写作体验。Typora的最大特色是其实时预览功能，用户在编辑文本的同时，可以实时看到渲染后的效果。

#### <font color="Deep purple">❄️一. 破解版安装</font>

1.首先我们到官网下载Typora

>   https://www.typoraio.cn/ 


![](https://i-blog.csdnimg.cn/img_convert/459ee05c803a134d070ba1e099d2e1c3.png)

下划找到立即下载,下载之后按照流程安装完毕.

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261436504.png)

2.在刚刚安装的路径下找到js文件

> D:\韩顺平循序渐进学java\Typora\resources\page-dist\static\js 

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261437385.png)

如图所示,使用记事本打开.

将下面内容

> e.hasActivated=“true”==e.hasActivated， 


替换为:

>  e.hasActivated=“true”==“true”, 

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261437564.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261437815.png)

一定要保存,如果保存成功，那么修改时间会改变。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261437935.png)

现在我们就可以打开Typora,显示已激活

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261437039.png)

3.但是有的用户会提示弹窗提示需要输入许可证激活，接下来我们继续操作。

根据下面的路径中进行操作：

> D:\韩顺平循序渐进学java\Typora\resources\page-dist 


找到下图的html文件，用记事本打开

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261437669.png)

查找：

> ` /body&gt;&lt;/html&gt;` 


替换为:这里建议直接复制

>  `&lt;/body&gt;&lt;script&gt;window.onload=function(){setTimeout(()=&gt;{window.close();},5);}&lt;/script&gt;&lt;/html&gt;` 

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261437354.png)

一定一定要保存,保持成功之后修改日期会发生变化

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261437913.png)

然后去这个路径下面找到对应的代码:

> D:\韩顺平循序渐进学java\Typora\resources\locales\zh-Hans.lproj 

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261437436.png)

查找:

>   “UNREGISTERED”:“未激活”, 


修改为:

>   “UNREGISTERED”:" ", 


在这里插入图片描述

现在我们的typora,就可以直接使用,不需要激活了.

#### <font color="Deep purple">❄️二. 设置Typora实现自动上传</font>

1、首先，点击【文件】-&gt;【偏好设置】

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261437595.png)

2、再次，选择【图像】。

然后按照下图所示，插入图片时选择上传图片。然后在上传服务内选择PicGo，并选择PicGo.exe的路径。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202511261437356.png)

使用 PicGo 的可视化界面配置 GitHub 图床后，你可以在 Typora 中直接粘贴截图，Typora 会自动通过 PicGo 将图片上传到你的 GitHub 仓库。这样，你和他人就可以通过访问这些链接来共享图片，确保在发送文件时图片不会丢失。
