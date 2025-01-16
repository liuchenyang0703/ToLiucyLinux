---
title: 【Linux】基于 Jenkins+shell 实现更新服务所需文件 --＞两种方式：ssh_Ansible
icon: circle-info
order: 1
category:
  - Linux
  - Jenkins
  - 自动化运维
tag:
  - Linux
  - Jenkins
  - 自动化运维
  - 运维
pageview: false
date: 2024-12-24
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/018aee30d8ea4271888ad311a6a34ddd.jpeg)


>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## 前提：

* 需要安装好Jenkins

[【Linux】部署Jenkins（简介及详细教程【war包部署】）](https://liucy.blog.csdn.net/article/details/127202910)

[【Linux】Docker 搭建 Jenkins](https://liucy.blog.csdn.net/article/details/127883522)



> Jenkins专栏：[Jenkins专栏](https://blog.csdn.net/liu_chen_yang/category_12493057.html?spm=1001.2014.3001.5482)



## 一、新建一个Item

> 新建 Item --> 选择**Freestyle project** --> 自己起一个名字 -->确定



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/edf31fc760ff4b778edcf137a2aa3924.png)



## 二、增加一个构建步骤并填写构建内容



> 翻到最下面，找到 **Build Steps** --> Execute shell



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/84de0cb3953e49af92ad57da2ded9165.png)



在这里写shell脚本就行，需要执行什么和linux上执行一样的；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/998426455d79425984f47c7d5e0cad71.png)


先使用一条命令来测试一下，自己随便输入那条命令都可以；这里我写一个`ls /root/`命令；

写完之后点击`保存`；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/71be279c3b304f61861a5d0a2768776a.png)
## 三、构建一个简易的项目

保存完毕之后，点击左边的`Build Now`构建项目；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/81bcab819c8d4afd9dbabdae9b138f00.png)

这样就构建完了，我们可以查看构建日志；
直接点击构建成功的那个位置，或者后面有个小三角，在点击`控制台输出`

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/5b1d08fb5d314a1c9719fe8e8bc0becb.png)

这块就输出了刚刚执行的脚本日志了；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c2d3a533cce148f69f5d9c76c2a64b0a.png)


这样，自定义构建项目就完成了；

如果需要更改配置，可以点击上面的项目名称 --> 然后左边的配置 --> 接着给shell即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/80efef8e4d2d4a0cad8d85a0389994ce.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/60f8d38198d94e5d892dc1676fd1e83c.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/2293180a1c6c49dc98e68fdeaf272997.png)




这样完整的一个使用shell脚本自定义构建项目就完成了；这只是一个简单的列子，接下来，我们讲解：**使用Jenkins更新服务jar包**。


## 四、使用 Jenkins 更新本地的一个jar包

还是和前两部一样，先新建一个Item，在增加一个构建步骤并填写构建内容；最主要是shell脚本里的内容；

这里给大家写一个示例：

```bash
#!/bin/bash

# 本机jar包路径（路径可以自己定义）
src_jar_path="/root/a.jar"

# 远程JAR包路径（路径可以自己定义）
dest_jar_path="/home/lcy/cs/a.jar"

# 创建目标路径（没有则创建，有则跳过）
mkdir -p /home/lcy/cs/

# 备份jar包,替换jar包；先判断有没有这个文件，如果有则备份文件并复制新的文件过去；如果没有直接复制新的文件过去，并提示；
if [ -e $dest_jar_path ];then
	mv $dest_jar_path $dest_jar_path-$(date +"%Y-%m-%d")
	cp -ar $src_jar_path $dest_jar_path
else
	echo "目标路径没有这个文件"
	cp -ar $src_jar_path $dest_jar_path
fi

# 复制完之后，自己加一下启动命令即可；
```

写完之后，点击保存，并构建；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/3425b55baac74eb29bea84cf06e567d4.png)

完成之后可以查看一下服务器上有没有这个jar包了；可以看到没问题；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/a8622b95e4ed47ea8d846eb38c59d23e.png)

那么在执行一下，就会备份这个，然后在拿一个新的jar包过来；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/77c50639741d40cea789dceee44b1fd3.png)

可以看到将之前的备份了，然后有拉来一个新的jar包；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/fe8e63cd407941559fce476c9199ab58.png)

这样就实现更新操作了，不过这只是本机更新，要想其他服务器也更新我们就需要去配置；

## 	五、使用 Jenkins 更新多台服务器jar包

还是和前两部一样，先新建一个Item，在增加一个构建步骤并填写构建内容；最主要是shell脚本里的内容；

更新多台服务器和更新一台不一样，需要去链接其他的服务器，进行更新；
这里有两种方法：
* 一种是使用密钥实现要更新的服务器之间免密，在进行更新；
* 还有一种就是使用 ansible 技术实现远程登陆更新；



### 5.1 使用密钥方式对服务器之间进行免密登录设置

#### 5.1.1 首先，创建私有 SSH-Keygen密钥

```bash
ssh-keygen -t rsa
```
一直回车即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/06a04bf950fd4ea985de3a3868e9cce9.png)
#### 5.1.2 上传 SSH 密钥
从服务器 172.16.10.232 使用 SSH，并在服务器 172.16.10.224 的 root 的 .ssh 目录下上传新生成的公钥（id_rsa.pub），文件名为`authorized_keys`。

给本地和其他电脑都上传上公钥；

```bash
ssh-copy-id root@172.16.10.232
ssh-copy-id root@172.16.10.224
```
需要输入服务器密码，都输入一下即可；

#### 5.1.3 测试几台服务器传文件是否需要密码
```bash
scp jdk-18.0.2.1.zip root@172.16.10.232:/home/lcy/cs/
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c7987d5fff094dbb9b11cf3ec8eefca4.png)

可以看到是不需要的；所以免密就成功了；

#### 5.1.4 设置Jenkins 中的shell脚本，实现多台服务器更新操作
还是和前两部一样，先新建一个Item，在增加一个构建步骤并填写构建内容；最主要是shell脚本里的内容；

这里我给大家写一下我的执行的内容（示例）；

```bash
#!/bin/bash

# 服务器列表（这里写的是ip地址）
servers=("server1" "server2" "server3")

# 本机jar包路径（路径可以自己定义）
src_jar_path="/root/a.jar"

# 远程JAR包路径（路径可以自己定义）
dest_jar_path="/home/lcy/cs/a.jar"

# 创建目标路径（没有则创建，有则跳过）
mkdir -p /home/lcy/cs/


# 循环远程执行命令
for server in "${servers[@]}"; do
# 备份jar包,替换jar包；先判断有没有这个文件，如果有则备份文件并复制新的文件过去；如果没有直接复制新的文件过去，并提示；
	if [ -e $dest_jar_path ];then
		ssh root@$server "mv $dest_jar_path $dest_jar_path-$(date +"%Y-%m-%d")"
		scp $src_jar_path root@$server:$dest_jar_path
	else
		echo "目标路径没有这个文件"
		scp $src_jar_path root@$server:$dest_jar_path
	fi
done

# 复制完之后，自己加一下启动命令即可；
```
写完shell之后，点击构建；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4631168c36b64fd7998c6ef96d0490ad.png)

构建完成，查看其他服务器是否上传成功，如果成功了，那么就没问题了，我这里是测试了两台，都上传了，成功了。

### 5.2 使用 Ansible 服务实现对服务器之间进行操作
更多Ansible服务的信息请参考：[Ansible自动化运维（二）ad-hoc 模式详解](https://liucy.blog.csdn.net/article/details/133772023)
#### 5.2.1 首先，需要安装 Ansible服务

```bash
yum -y install ansible
```
#### 5.2.2 配置 Ansible的hosts

```bash
[root@localhost cs]# cat /etc/ansible/hosts
# 在最后追加服务器信息如下：

[server1]
172.16.10.*** ansible_ssh_port=22 ansible_ssh_user=root ansible_ssh_pass='******'

[server2]
172.16.10.*** ansible_ssh_port=22 ansible_ssh_user=root ansible_ssh_pass='******'
```
更多Ansible服务的信息请参考：[Ansible自动化运维（二）ad-hoc 模式详解](https://liucy.blog.csdn.net/article/details/133772023)

这样Ansible的配置就完成了，这里我们使用ad-hoc模式就行；

#### 5.2.3 测试服务器之间是否互通

```bash
ansible server1 -m shell -a "ls /root/"
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/e669232a194f4369a29ba9b823574ed6.png)

可以查到，没问题。

#### 5.3.4 设置Jenkins 中的shell脚本，实现多台服务器更新操作
还是和前两部一样，先新建一个Item，在增加一个构建步骤并填写构建内容；最主要是shell脚本里的内容；

这里我给大家写一下我的执行的内容（示例）；

```bash
#!/bin/bash

# 服务器列表（这里写的是ansible中配置的主机组名）
servers=("server1" "server2")

# 本机jar路径（路径可以自己定义）
src_jar_path="/root/a.jar"

# 远程JAR包路径（路径可以自己定义）
dest_jar_path="/home/lcy/cs/a.jar"

# 创建目标路径（没有则创建，有则跳过）
mkdir -p /home/lcy/cs/

# 循环远程执行命令
for server in "${servers[@]}";do
# 备份jar包,替换jar包；先判断有没有这个文件，如果有则备份文件并复制新的文件过去；如果没有直接复制新的文件过去，并提示；
	if [ -e $dest_jar_path ];then
			ansible $server -m shell -a "mv $dest_jar_path $dest_jar_path-$(date +"%Y-%m-%d");"
	        ansible $server -m copy -a "src=$src_jar_path dest=$dest_jar_path"
    else
    		echo "没有这个文件，没有必要备份";
			ansible $server -m copy -a "src=$src_jar_path dest=$dest_jar_path"
	fi
done

# 复制完之后，自己加一下启动命令即可；
```
写完shell之后，点击构建；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/3243a5e0d4134da984ae842163cabc22.png)



构建完成，查看其他服务器是否上传成功，如果成功了，那么就没问题了，我这里是测试了两台，都上传了，成功了。


## 六、成功实现文件更新
