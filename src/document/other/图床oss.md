---
title: Typora+PicGo搭建博客图床
icon: circle-info
order: 5
category:
  - 其他技术
  - 工具
tag:
  - 工具
pageview: false
date: 2023-08-29
comment: false
breadcrumb: false
---


## 为什么要搭建博客图床?

以CSDN为例，我们可以选择使用大部分blog平台通用的Markdown语法进行博客创作，作为一个合格的程序狗，那么Markdown语法必然是首选。

虽然CSDN自带的编辑器已经能满足我们95%的写作需求，但是我们的图片不可能一直保存在本地吧，想要在网络中看到我们图片，那么图床就必不可少啦

在Typora在Markdown语法编辑上能给你提供更好的写作体验，那为什么一定要选择阿里云OSS，其实我最早是使用github跟gitee免费搭建的图床，但是俗话说，`便宜没好货`，github因服务器在国外，之前很长一段时间国内无法访问图片，于是便转战国内gitee，但是当时那次事故之后，gitee里面的全部图片都挂了，真的心疼，将近一万字图片就这么没了.......

所以我选择了以Typora+Picgo+图床的方式来进行博客创作,目前也是我的主力图床！

而在本地的Markdown文件.md中，图片是以“外链”这一形式存在的

Office word中，图片是直接插入docx文件里面
Markdown中，图片只是一个本地/联网的地址
也就是说，如果我们使用本地Markdown编译器（如typora）来编辑MD文件的时候，如果MD里面插入的图片的源文件被移动或者删除了，我们的MD文档里面对应的图片也无法显示出来。

同时，如果我们用本地编辑器写好了一篇博客，想把它上传到CSDN上。CSDN是无法自动转存文件里面的图片的（因为这个图片只是一个你硬盘里面的文件路径）

如果你的图片在本地上传到CSDN上，就如下这个效果 ：

> [外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img)(blog/image-20220318140612548.png)]

这时候我们就需要用**图床**来解决这个问题



## 什么是图床？

`图床一般是指储存图片的服务器`，有国内和国外之分。国外的图床由于有[空间距离](https://baike.baidu.com/item/空间距离/8965556?fromModule=lemma_inlink)等因素决定访问速度很慢影响图片显示速度。国内也分为单线空间、[多线空间](https://baike.baidu.com/item/多线空间/1339906?fromModule=lemma_inlink)和cdn加速三种。

**简单来说：**

在我们往typora里插入图片的时候，[PicGO](https://so.csdn.net/so/search?q=PicGO&spm=1001.2101.3001.7020)会自动上传图片到`图床`，并返回一个图片的`链接`

> 这时候你的图片就是一个**网络的链接(网址)**，不再是本地路径。
>
> 你也可以在任何有网络的地方、用任何设备访问这张图片了

即便是本地的那张图片**移动或者删除**，也不会影响图床里的这张图片

Markdown**本地文件**里面的图片也就不会失效了！



## 准备工作

### typora

`Typora`：[【中文官网】](https://typora.com.cn/)

必各位应该听很多博主安利过Typora这款软件，这里就不展开描述了。

新版本typora需要付费买断。可以考虑支持**正版**，也可以去找找**旧版本安装包**

### PicoGo

`PicGo`：[【Github地址】](https://github.com/Molunerfinn/PicGo/releases)

![image-20230525170115723](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525170115723.png)

![image-20230525170044870](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525170044870.png)



## 配置阿里云OSS

### 注册,开通对象储存

`百度搜索阿里云即可看到阿里云的官网`

![image-20230525170321335](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525170321335.png)



注册账户并实名后，进入你的`控制台`

![image-20230525170444135](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525170444135.png)

选择`对象储存`并开通

![image-20230525170511060](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525170511060.png)



### 创建bucket

在左侧选择概览，然后在右侧创建一个新的bucket





**注意：**

- Bucket名字**不能**有大写字母
- 服务器就近选择
- 图床选择`标准存储`
- 读写权限`公共读`

![image-20230525170613135](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230525170613135.png)

`创建完成后，你的bucket应该就出现在了左侧`



### 找到你的地域节点

点击你的**bucket名**

![image-20230526102332195](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230526102332195.png)



然后点击bucket下的`概览`

![image-20230526102357117](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230526102357117.png)

在`访问域名`一栏找到你的地域节点，后面会用到

如图，只需要复制`oss-cn-hangzhou`即可，不需要后面的`.aliyuncs.com`

![image-20230526102448168](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230526102448168.png)



### 找到你的Key

来到右上角，鼠标放在你的头像上，在弹出的框里选择AccessKey管理

![image-20230526102633876](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230526102633876.png)

### 阿里云账户充值

#### 收费问题

阿里云OSS的各项收费是**独立**的！

对于**图床**而言，有两种收费形式

- 以**充值的方式**使用**储存容量**以及**流量**(默认状态)
- 按年/月收费，购买一定存储包。**流量额外收费**

也就是说，即便你购买了下图的存储包，你依旧要为**访问图床的流量**付钱！

> 图床使用的是**标准型**，请勿购买其他类型

- 储存容量：0.12元/GB/月
- 图片**上传**到阿里OSS流量：免费
- **外网流出**流量(如typora访问图床图片)：闲时0.25元/GB，**忙**时0.50元/GB

仔细算算，我们图床的数据量其实很小的

> 0.12元/1GB/1个月，一年就是1.44元，**远低于40GB的9元收费！**
>
> 截图/照片以平均0.5mb/张估算，1gb可存放超过1600张图片！
>
> 数据低于6GB的情况下直接充值，以GB付费其实比**购买储存包**更加值得！

#### 注意事项

- 记得给阿里云账户充值！！别到时候欠费停用了!!(笔者建议下载一个阿里云的APP，在手机上可以随时看到你的阿里云费用情况)
- 刚开始作图床的时候，直接充值使用即可，**无需购买容量包**！

![image-20230526102944761](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230526102944761.png)

到这里，我们阿里云OSS基本配置完毕了😎

## 配置PicGo

打开picgo后，在你windows的**状态栏**里找到picgo的图标，打开picgo的主界面

![image-20230526103021975](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230526103021975.png)



### 图床设置

在图床设置里面选择`阿里云OSS`，依照以下步骤填写信息

- **设定Keyld**：填写刚刚获得的`AccessKeyID`

- **设定KeySecret**：填写`AccessKeyIDSecret`

- **设定储存空间名**：填写`bucket`名称

  这里填写的是bucket名称，不是浏览器里的域名

- **确认存储区域**：填写你的地域节点，注意复制的格式
- **指定存储路径**：其实就是自定义一个文件夹的名字，以/结尾

它会**自动**在你的bucket里面创建一个文件夹，并把图片上传进去

![image-20230526103159534](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20230526103159534.png)

**弄完之后，记得“确定”，并点击“设置为默认图床”！**



### picgo设置

在设置里打开`时间戳重命名`和`上传后自动复制URL`

> 时间戳重命名：以上传时间来重命名图片，避免同名的图片无法上传（该设置不影响本地图片名）

![image-20230526103306274](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305261033339.png)



### 配置typora

进入typora主界面，点击左上角的“文件-偏好设置”

- 择`图像`
- 插入图片时`上传图片`
- 下面的选项全勾上【更新22.03.05: 第二个`网络位置的图片`可以不勾，避免已经上传到图床的图片重复上传】
- 上传服务选择`PicGo(app)`
- PicGo路径：找到picgo的安装路径
  **不是安装包的路径！！！！**

![image-20230526103515936](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305261035054.png)

### 大功告成！

设置完毕后，我们点击`验证图片上传选项`

如果弹出以下弹窗，我们的图床就搞定了！😀

![image-20230526103605884](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305261036932.png)

最后新建一个文件，验证图片是否正常上传

日常写作的时候，我们只需要`复制`图片，在typora里面`粘贴`即可，无需拖动！

当你的图片链接显示为**阿里云的网络链接**，而不是本地路径时

![image-20230526103638933](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305261036056.png)

我们的图床就大获全胜！

今天的文章就到这里了，欢迎大家评论区留言!!!
