---
title: Linux设置永久别名alias的方法
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2024-12-19
comment: false
breadcrumb: false
---



编辑<font color=red> .bashrc</font>文件，该文件主要用于保存一些个性化的设置，如命令别名、路径等：

```bash
vim .bashrc
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191616331.png)

进入该文件里，我们要在最后一行或者最后在空出来几行来新增我们的个性化配置，如设置别名：

```bash
alias dfimage="docker run -v /var/run/docker.sock:/var/run/docker.sock --rm alpine/dfimage" 
```
比如下图👇

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191616470.png)

设置完之后，我们:wq保存并退出

> :wq

保存文件后，在执行<font color=red> source .bashrc</font>命令，使之生效。

然后自己可以去测试一下；

最后，需要我们注意的是，`.bashrc`文件是针对用户级别的个性化设置。切记切记！

如果想要全局可以放到`/etc/profile`文件里，需要用到root。



