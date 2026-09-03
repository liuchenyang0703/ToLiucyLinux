---
title: Enable two-factor authentication (2FA) - Github解决方案
icon: circle-info
order: 1
tag:
- Github
category:
- Github
date: 2025-03-10
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


> 最近Github出现了一个`Two-factor authentication (2FA)is required for your GitHub account`，这个是必须要弄的，如果你不开启，将在2025年4月好像就用不了，就会被限制登录。

> 为此我在网上找了很多个教程，终于找到了一个好用的，链接：[https://mp.weixin.qq.com/s/IZrUYvd32ycKFwmuNwrlwQ](https://mp.weixin.qq.com/s/IZrUYvd32ycKFwmuNwrlwQ)
>
> 他也就是原创，我这里也写一下，主要还是记录一下；



## 2FA认证启动提示



这里会提示你现在启用`2FA`认证；

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503101051499.png#pic_center)

然后，我们就会进到如下页面：

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503101024605.png#pic_center)



## 2FA认证解决版本

这里我就跳过哪些没用的话，直接开始，以下两种验证方式任选其一即可（方式2更便捷）；

### 方式一：下载谷歌插件-身份验证器

> 前提，需要用谷歌浏览器，然后下载一个身份验证器的插件，<font color=red>记得用谷歌浏览器哈（得翻墙下载，不用看，我找到就这么一个免费的）</font>

下载链接（需要翻墙）：[身份验证器插件下载链接](https://chromewebstore.google.com/detail/%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81%E5%99%A8/bhghoamapcdpbohphigoooaddinpkbai?pli=1)

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503101039826.png)



如果不会翻的，或打不开链接的小伙伴们，也可以关注`小刘Linux`公众号，回复`身份验证器`进行下载插件。

![](/assets/image/公众号.png)

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503101048108.png)

下载下来是.crx后缀的文件，直接拖动到谷歌内核的浏览器就可以安装了。

### 方式二：手机下载-TOTP身份验证器

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202504070950674.png)



### 返回Github开始2FA认证

* 点Enable 2FA now  按钮

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503101051989.png#pic_center)

* 会提示输入用户名密码登录一下

* 然后，我们就会进到如下页面：

  ![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503101024605.png)

* 打开刚刚安装的插件 或 者手机下载的`TOTP身份验证器`扫描二维码

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503101054021.png#pic_center)

> 手机下载的TOTP直接打开，点击右下角加号 - `Scan` - 扫描图上的二维码即可；

* 插件安装的会让你截图并自动扫描二维码

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503101055297.png#pic_center)

* 扫描完之后会演示一个码，吧这个验证码填到`Verify the code from the app`里；

填完之后会自动验证跳转下一步；

* 下载您的恢复代码

> 您可以使用恢复代码作为第二个因素进行身份验证，以防您无法访问设备。我们建议使用1Password、Authy或Keeper等安全密码管理器保存它们。

> **<font color=red>注意：</font>**
>
> **<font color=red>将您的恢复代码保存在安全的地方，如果您丢失了设备并且没有恢复代码，您将无法访问您的帐户。</font>**



* 点击`Download`下载，记着要保存好，如果恢复代码丢失了，就登录不了了。



![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503101059863.png)



* 点击下载完就可以再次点击`I have saved my recovery codes`就开启了2FA双重认证了。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503101101421.png)



![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202503101102239.png)





## 2FA认证解决完成



---



## 常见问题

### 1、更换设备浏览器扫描新的二维码

* 如果登录新设备不想使用浏览器插件来扫描就不用此操作，在手机上的TOTP看之前扫描的验证码登录即可；

* 如果需要更换电脑主设备（浏览器插件使用），这时候在登录的时候需要先填验证码（可以查看之前电脑或手机的验证码）或使用恢复代码来登录上；

操作步骤：登录上之后点击右上角头像 --> 选择`Settings` --> 在左侧选择`Password and authentication` --> 然后找到`Authenticator app`点击`Edit` --> 扫描新的二维码（最好手机和浏览器插件都扫描一下） --> 然后将扫描到的新的验证码填入`Verify the code from the app`中 --> 在点击save保存即可

> **注：** 以后只能使用此二维码扫描的验证码登录，即使在其他设备登录也需要使用此二维码的验证码来登录，如需更换和此操作一样（或不使用浏览器插件直接用手机TOTP查看）。
>
> **推荐：** 这里还是推荐使用手机的TOTP身份验证器扫描登录，非常的便捷；



![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202504071018222.png)



> 后续如果还会遇到什么问题我们在补充，目前这是我遇到过的一个问题；

