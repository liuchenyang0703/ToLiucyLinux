---
title: 【Linux】环境下部署Nginx服务 - 二进制部署方式
icon: circle-info
order: 1
category:
  - Linux
  - Nginx
tag:
  - Linux
  - Nginx
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

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161337284.jpeg)

## 一、下载安装包
>官网下载地址：[nginx: download](https://nginx.org/en/download.html)

选择`Stable version`版本下载到本地（该版本为Linux版本），下载完成后上传到服务器上；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161337619.png)

- 或者在服务器上使用wget下载

```bash
wget https://nginx.org/download/nginx-1.24.0.tar.gz
```

## 二、部署Nginx服务
### 1、安装Nginx服务需要的依赖包

```bash
yum -y install gcc gcc-c++ zlib zlib-devel pcre-devel openssl openssl-devel 
```
离线包下载地址：[nginx1.24.0 二进制安装离线包及依赖包
](https://download.csdn.net/download/liu_chen_yang/88858078)
### 2、上传解压
（1）sz先把nginx压缩包复制到虚拟机/服务器上
（2）解压nginx压缩包：

```bash
tar xf nginx-1.24.0.tar.gz -C /usr/src/
```

（3）切换到nginx目录下：

```bash
cd /usr/src/nginx-1.24.0
```

### 3、编译安装nginx服务
指定安装路径然后编译安装
```bash
./configure --prefix=/usr/local/nginx
make
make install 

#或者使用下面这一条命令。上面的看着清晰，在哪里错了，易排查问题
./configure --prefix=/usr/local/nginx && make && make install
```

## 三、启动及确认服务是否正常
- 安装成功后，启动Nginx服务：到/usr/local/nginx/sbin目录下，启动服务：

```bash
/usr/local/nginx/sbin/nginx -c  /usr/local/nginx/conf/nginx.conf
```
- 启动成功后，查看进程

```bash
ps -ef | grep nginx
```

- 或者查看端口是否启动（默认端口为80）

```bash
netstat -anput | grep 80
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161336609.png)


确定启动之后，页面访问：ip
即可访问到页面：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161336342.png)


## 四、nginx启动、停止、重启、检测配置命令

```bash
#启动nginx服务
/usr/local/nginx/sbin/nginx
/usr/local/nginx/sbin/nginx -c  /usr/local/nginx/conf/nginx.conf

#停止nginx
/usr/local/nginx/sbin/nginx -s stop

#重启nginx
/usr/local/nginx/sbin/nginx -s reload

#检测nginx服务配置是否有误
/usr/local/nginx/sbin/nginx -t
```

## 五、常见问题
### 报错1：./configure: error: C compiler cc is not found

```bash
完整报错：
./configure: error: C compiler cc is not found
```

>原因：没有编译环境
解决：`yum -y install gcc gcc-c++`

### 报错2：./configure: error: the HTTP rewrite module requires the PCRE library.

```bash
完整报错：
./configure: error: the HTTP rewrite module requires the PCRE library.
You can either disable the module by using --without-http_rewrite_module
option, or install the PCRE library into the system, or build the PCRE library
statically from the source with nginx by using --with-pcre=<path> option.
```

> 原因：缺少pcre-devel库
> 解决：`yum -y install pcre-devel`

### 问题3：./configure: error: the HTTP gzip module requires the zlib library.

```bash
完整报错：
./configure: error: the HTTP gzip module requires the zlib library.
You can either disable the module by using --without-http_gzip_module
option, or install the zlib library into the system, or build the zlib library
statically from the source with nginx by using --with-zlib=<path> option.
```

> 原因：缺少zlib-devel
> 解决：`yum -y install zlib-devel`

## 六、nginx配置模块详解
>这里的图是二进制安装默认的配置，yum安装的与二进制安装的nginx，配置会有差异，但整体大概的说明都是一样的。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161336812.png)

主要区域讲解：


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161336242.png)




## 七、推荐一个自动生成nginx配置文件的网站
>[https://nginxconfig.io/](https://nginxconfig.io/)
>可以根据你的业务需求，自动生成负载的配置。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161335700.png)


往下面翻，就可以看到配置文件了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161335855.png)

---
>推荐一个优化nginx配置文件的页面：[Nginx配置文件格式化](https://tool.okcode.vip/dev/nginx-formatter)<br>
这里面还有很多格式化工具可以自己看看：[https://tool.okcode.vip/](https://tool.okcode.vip/)<br>
Nginx 404页面美化：[Nginx 404页面美化](https://download.csdn.net/download/liu_chen_yang/90123906)

## 八、相关文章
|文章标题| 文章连接 |
|--|--|
|【Linux】nginx基础篇 -- 介绍及yum安装nginx|[https://liucy.blog.csdn.net/article/details/133928000](https://liucy.blog.csdn.net/article/details/133928000)|
|【Linux】环境下部署Nginx服务 - 二进制部署方式 |  [https://liucy.blog.csdn.net/article/details/132145067](https://liucy.blog.csdn.net/article/details/132145067)|
|nginx配置负载均衡--实战项目（适用于轮询、加权轮询、ip_hash）|[https://liucy.blog.csdn.net/article/details/133986013](https://liucy.blog.csdn.net/article/details/133986013)|
|nginx快速部署一个网站服务 + 多域名 + 多端口 | [https://liucy.blog.csdn.net/article/details/133986102](https://liucy.blog.csdn.net/article/details/133986102) |
| 【Linux】Nginx一个域名https&一个地址配置多个项目【项目实战】|[https://liucy.blog.csdn.net/article/details/144442148](https://liucy.blog.csdn.net/article/details/144442148) |

## 九、相关专栏
><div align="center"><a href="https://blog.csdn.net/liu_chen_yang/category_10887074.html">❀《Linux从入门到精通》专栏 ❀</a></div>
><div align="center"><a href="https://blog.csdn.net/liu_chen_yang/category_12419502.html">❀《Nginx》专栏 ❀</a></div>

>🐋 希望大家多多支持，我们一起进步！😄
🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗
