---
title: nginx快速部署一个网站服务 + 多域名 + 多端口
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

## 一、nginx虚拟主机，部署网站
> 都是在同一台服务器上部署

## 二、部署单域名/IP网站服务
### 1、创建一个普通用户，用户管理nginx网站服务

```bash
# 创建一个名为www的用户组
groupadd www -g 666

# 创建一个名为www的用户并添加到www的用户组中
useradd www -u 666 -g 666 -M -s /sbin/nologin

# 查看用户id
id www
#结果
uid=666(www) gid=666(www) groups=666(www)
```
### 2、修改nginx主配置文件

```bash
[root@iz0jlfqv8fyt7iuxoec4clz ~]# cat /etc/nginx/nginx.conf

user  www;		# 设置运行用户，刚刚创建的用户
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;		# include导入该目录下的*.conf配置文件
}
```
### 3、创建虚拟主机nignx子配置文件
>只需要写server{}标签即可。

```bash
# 先看conf.d下还有没有其他的*.conf结尾的，有的话先备份；
mv default.conf  default.conf-bak
# 创建虚拟主机nignx子配置文件(qqfly配置文件)
vim /etc/nginx/conf.d/qqfly.conf

# 写入如下信息，自己的根据情况自行修改（域名或ip;index.html的访问路径）
server { 
	
	listen 80;
	# nginx会匹配 域名/IP:80
	server_name 域名/IP/localhost;
	# 支持中文的参数
	charset utf-8;
	location  /  {
		# 根据root参数，填写网页根目录信息
		# 表示当你访问 http://域名:80 ，自动来这个目录下找数据
		root  /www/qqfly/;
		# 默认找 /www/qqflq/ 的名字叫做index.html的文件
		index  index.html;
	}
	
}
```
上面配置文件中配置了index.html的地址，这里可以看到是没有的，我们创建一下；
```bash
# 创建一个存放网页访问地址的目录
mkdir -p /www/qqfly/

# 创建网页静态文件，index.html qqfly.jpg  qqfly.txt
# 部署一个静态网站，最基本的提供，html，jpg，txt等静态数据；如果是其他类型的文件，nginx默认不解析，直接下载
# nginx都可以帮你去返回，解析请求
cd /www/qqfly/

# 创建静态页面index.html
cat > /www/qqfly/index.html << EOF
> <meta charset=utf-8>
> <H1>这是一个 qqfly 的测试页面；用于证明nginx一个网站部署成功了；</H1>
> EOF

# 创建一个jpg文件
wget -O qqfly.jpg https://i1.hdslb.com/bfs/archive/5edd3d62a5ca140063ef8e32a852348a422b86b6.jpg

# 创建一个txt文件
echo "qq飞车游戏很好玩！测试！" > qqfly.txt

# 修改静态文件的属主，属组
chown -R www:www /www/
```
### 4、测试nginx配置文件语法，然后启动

```bash
# 检测nginx配置中语法是否有误
nginx -t 
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161334848.png)

ok则为正常，没有错误；


- 启动nginx

```bash
# 查看nginx状态
systemctl status nginx
# 重启nginx
systemctl restart nginx
```
### 5、域名访问地址
>如果是使用的域名，那么需要在本地配置dns域名解析
分别添加二级域名，三级域名，hosts解析
``ip  三级域名 二级域名   ``

- 配置好还是访问不到？
1、可以先看看可以ping通域名吗。
2、检查你本地是否设置了代理，如果有则关闭。

### 6、IP访问地址
这里我使用的是ip地址访问，因为我的域名需要备案，申请还没下来，所以先用ip测试吧；


- 访问html资源

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161334423.png)



- 访问jpg资源

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161334458.png)


- 访问txt资源

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161334429.png)


- 如果是其他类型的文件，nginx默认不解析，会直接下载

> 直接生成静态数据，不用重启nginx，这就是磁盘上的一些静态数据
nginx的server{}虚拟主机，以及设置了，去这个目录下搜索资料<br>
>nginx默认不识别这个test.ttt格式的文件，因此直接下载了

例如：

```bash
cat > /www/qqfly/qqfly.ttt << EOF
qq飞车游戏很好玩！测试！
EOF
```
因为是静态页面，上面也说了，修改不用重启；（但是修改配置文件的话就需要重启nignx才能生效；）
页面直接访问，会让你下载；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161334698.png)

下载完打开，里面的内容就是刚刚写进去的内容；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161334131.png)

## 三、nginx的配置文件匹配
还记得上面让备份的一个nginx配置文件吗，`/etc/nginx/conf.d/default.conf`，这个里面的server_name 写的是localhost，而咱们用的是ip访问网站，所以默认会先去找`default.conf`；所以在上面给他备份了一下，然后才会去找另一个conf文件。

nginx配置会有一个先后顺序，默认按照文件名的字典顺序读取 `/etc/nginx/conf.d` 目录下的配置文件。如果需要特定的加载顺序，可以使用 `include` 指令来指定读取文件的顺序。
```bash
#先看当前有几个nginx配置文件
[root@iz0jlfqv8fyt7iuxoec4clz conf.d]# ls
default.conf-bak  qqfly.conf


#先看第一个default.conf
[root@iz0jlfqv8fyt7iuxoec4clz conf.d]# grep -Ev '#|^$' default.conf-bak
server {
    listen       80;
    server_name  localhost;
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}



#再看第二个配置文件
[root@iz0jlfqv8fyt7iuxoec4clz conf.d]# cat qqfly.conf 

server { 
	
	listen 80;
	# nginx会匹配 域名/IP:80
	server_name 域名;
	# 支持中文的参数
	charset utf-8;
	location  /  {
		# 根据root参数，填写网页根目录信息
		# 表示当你访问 http://域名:80 ，自动来这个目录下找数据
		root  /www/qqfly/;
		# 默认找 /www/qqflq/ 的名字叫做index.html的文件
		index  index.html;
	}
	
}
```
可以看到一个写的域名，一个写的localhost；因为我们这边的域名用不了，所以，要是不备份那个`default.conf`默认的读取的就是`default.conf`这个配置文件；
如果域名是没问题的，那么直接用域名访问，就会直接去找`qqfly.conf`这个配置文件，就不会存在先后顺序什么的。

## 四、部署多域名网站服务
### 1、首先准备两个域名、index路径、nginx配置文件

|域名| nginx的index路径 | nginx的配置文件名|
|--|--|--|
| 域名1 （test1.top）| /www/test1/index.html|/etc/nginx/conf.d/test1.conf
| 域名2 （test2.top）|   /www/test1/index.html|/etc/nginx/conf.d/test2.conf

配置域名的话自己配置就可以；

### 2、创建两个域名的nginx配置文件
- test1域名
```bash
vim /etc/nginx/conf.d/test1.conf

#内容如下
server {

	listen	80;
	#域名1
	server_name	test1.top;
	# 支持中文的参数
	charset utf-8;

	location / {
		root /www/test1/;
		index index.html;
	}

}
```
- test2域名
```bash
vim /etc/nginx/conf.d/test2.conf

#内容如下
server {

	listen	80;
	#域名1
	server_name	test2.top;
	# 支持中文的参数
	charset utf-8;

	location / {
		root /www/test2/;
		index index.html;
	}

}
```
### 3、创建两个域名的index.html访问页面

- test1 的 index.html

```bash
# 创建test1和test2目录
mkdir -p /www/{test1,test2}

# 创建完之后，写入数据到test1/index.html中
cat > /www/test1/index.html << EOF
> <meta charset=utf-8>
> <H2> test1 页面测试 </H2>
> EOF
```

- test2 的 index.html

```bash
# 给test2域名写入index.html页面数据

cat > /www/test2/index.html << EOF
<meta charset=utf-8>
<H2> test2 页面测试 </H2>
EOF
```

### 4、检查nignx配置是否有误 并 重启nginx服务

```bash
# 检查nignx配置是否有误
nginx -t

# 重启nginx服务
systemctl restart nginx
```
### 5、页面访问两个域名
>test1.top
teset2.top

可以看到分别两个页面，这样多域名网站服务部署成功。

## 五、部署多端口网站服务
### 1、首先准备两个端口、index路径、nginx配置文件（一个即可）

|端口|nginx的index路径	  |nginx的配置文件名（使用同一个配置）
|--|--|--|
| 81 | /www/81/index.html	 |/etc/nginx/conf.d/port.conf
|82|/www/82/index.html	|/etc/nginx/conf.d/port.conf

### 2、创建两个port的nginx配置文件（一个配置中）

```bash
vim /etc/nginx/conf.d/port.conf

# 81 端口配置
server {

	listen 81;
	server_name localhost;
	# 支持中文的参数
	charset utf-8;
	
	location / {
		root /www/81/;
		index index.html;
	}

}

# 82 端口配置
server {

	listen 82;
	server_name localhost;
        # 支持中文的参数
        charset utf-8;

	location / {
		root /www/82/;
		index index.html;
	}

}
```

### 3、创建两个端口的index.html页面

```bash
# 创建目录
mkdir -p /www/{81,82}

# 创建81和82的index页面测试数据
cat > /www/81/index.html << EOF
<meta charset=utf-8>
<H1>我是81，欢迎来到我的页面</H1>
EOF

cat > /www/82/index.html << EOF
<meta charset=utf-8>
<H1>我是82，欢迎来到我的页面</H1>
EOF
```

### 4、检查nignx配置是否有误 并 重启nginx服务
```bash
# 检查nignx配置是否有误
nginx -t

# 重启nginx服务
systemctl restart nginx
```

### 5、页面访问两个端口
ip:端口

- ip:81

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161333738.png)- ip:82

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161333298.png)



#### 5.1 页面访问两个端口 --> 各添加一个jpg页面

到网上随便照两张图，分别放到`/www/81/`下和`/www/82/`下；

```bash
# 81端口的图片
wget -O /www/81/81.jpg https://picnew12.photophoto.cn/20180728/81jianjunjieqizhiyishuzizitisheji-30355854_1.jpg

# 82端口的图片
wget -O /www/82/82.jpg https://img95.699pic.com/xsj/0v/2f/k8.jpg%21/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast
```

这里添加完成之后，不需要重启nginx，直接在页面访问 `ip:端口/图片名`

- 81 服务器（ip:81/81.jpg）

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161333963.png)


- 82 服务器（ip:82/82.jpg）

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161333283.png)

#### 5.2 页面访问两个端口 --> 各添加一个txt资源

```bash
echo "我又来测试了，这里是 81 的一个测试页面" > /www/81/81.txt
echo "我也又来测试了，这是是 82 的一个测试页面" > /www/82/82.txt
```
这里添加完成之后，同样也不需要重启nginx，直接在页面访问 `ip:端口/txt名`

- 81 服务器（ip:81/81.txt）

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161333787.png)


- 82 服务器（ip:82/82.txt）

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161333434.png)


### 到这里就完成了nginx部署一个网站及多个域名的网站和多个端口的网站


## 六、 相关文章
|文章标题| 文章连接 |
|--|--|
|【Linux】nginx基础篇 -- 介绍及yum安装nginx|[https://liucy.blog.csdn.net/article/details/133928000](https://liucy.blog.csdn.net/article/details/133928000)|
|【Linux】环境下部署Nginx服务 - 二进制部署方式 |  [https://liucy.blog.csdn.net/article/details/132145067](https://liucy.blog.csdn.net/article/details/132145067)|
|nginx配置负载均衡--实战项目（适用于轮询、加权轮询、ip_hash）|[https://liucy.blog.csdn.net/article/details/133986013](https://liucy.blog.csdn.net/article/details/133986013)|
|nginx快速部署一个网站服务 + 多域名 + 多端口 | [https://liucy.blog.csdn.net/article/details/133986102](https://liucy.blog.csdn.net/article/details/133986102) |
| 【Linux】Nginx一个域名https&一个地址配置多个项目【项目实战】|[https://liucy.blog.csdn.net/article/details/144442148](https://liucy.blog.csdn.net/article/details/144442148) |

## 七、相关专栏
><div align="center"><a href="https://blog.csdn.net/liu_chen_yang/category_10887074.html">❀《Linux从入门到精通》专栏 ❀</a></div>
><div align="center"><a href="https://blog.csdn.net/liu_chen_yang/category_12419502.html">❀《Nginx》专栏 ❀</a></div>

>🐋 希望大家多多支持，我们一起进步！😄
🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗
