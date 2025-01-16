---
title: Linux上实现分片压缩及解压分片zip压缩包 - 及zip、unzip命令详解
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

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---



## zip命令

> zip命令的功能是用于压缩文件，解压命令为unzip。通过zip命令可以将文件打包成.zip格式的压缩包，里面会包含文件的名称、路径、创建时间、上次修改时间等等信息，与tar命令相似。



### 语法格式：

```bash
zip 参数 目标文件.zip 源文件或目录名
```

### 常用参数：

| 参数 |                           参数解析                           |
| :--: | :----------------------------------------------------------: |
|  -A  |                        自动解压缩文件                        |
|  -b  |                      设置暂存文件的目录                      |
|  -c  |                    添加注释信息到压缩文件                    |
|  -d  |                       更新压缩包内文件                       |
|  -F  |                    尝试修复损坏的压缩文件                    |
|  -h  |                         显示帮助信息                         |
|  -i  |                     仅压缩符合条件的文件                     |
|  -k  |                      使用MS-DOS兼容格式                      |
|  -l  |                   将“LF”替换成“LF+CR”字符                    |
|  -L  |                         显示版本信息                         |
|  -m  |                       压缩后删除源文件                       |
|  -n  |                  不压缩具有特定字符串的文件                  |
|  -q  |                         静默执行模式                         |
|  -r  |                      递归处理所有子文件                      |
|  -S  |                      包含系统和隐藏文件                      |
|  -s  |                        指定分卷的大小                        |
|  -t  |                    设置压缩时间为指定日期                    |
|  -T  |                   检查压缩文件是否正确无误                   |
|  -v  |                     显示执行过程详细信息                     |
|  -V  |                  保留VMS操作系统的文件属性                   |
|  -w  |                   在文件名称中加入版本编号                   |
|  -X  | 不保留过多的文件属性信息 -y 直接保存符号链接，而不是对应文件 |

### 参考示例：

- 1、将指定目录及其内全部文件都打包成zip格式压缩包文件

```bash
zip -r cs.zip cs

zip 	# 压缩命令
-r 		# 递归处理所有子文件
cs.zip	# 要压缩的文件名
cs		# 要压缩的目录
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191615619.png)



- 2、将当前工作目录内所有以.conf为后缀的文件打包

```bsah
zip -r conf.zip /etc/*.conf
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191615755.png)


- 3、更新压缩包文件中某个文件

```bash
zip -dv conf.zip /etc/locale.conf

zip			# 压缩命令
-dv			# d：更新压缩包内文件 v:查看详细信息
conf.zip			# 要压缩的文件名
/etc/locale.conf	#要更新的某个文件
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191615522.png)



- 4、检查压缩文件是否正确无误

```bash
zip -T conf.zip
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191615588.png)


## unzip命令

### 语法格式：

```bash
unzip [参数] 压缩包名
```



### 常用参数：

| 参数 |            参数解析            |
| :--: | :----------------------------: |
|  -a  |    对文本进行必要的字符转换    |
|  -b  |   不要对文本进行任何字符转换   |
|  -c  |  适当转换字符后输出解压缩结果  |
|  -C  |         严格区分大小写         |
|  -d  |     解压缩文件到指定目录中     |
|  -f  |        强制覆盖已有文件        |
|  -j  | 不处理压缩文件中原有的目录路径 |
|  -l  |      显示压缩包内文件列表      |
|  -L  |    将压缩包内文件名改为小写    |
|  -n  |     解压缩时不覆盖已有文件     |
|  -p  |          使用密码加密          |
|  -q  |          静默执行模式          |
|  -t  |        检查压缩包完整性        |
|  -v  |      显示执行过程详细信息      |
|  -x  |     跳过压缩包内的指定文件     |
|  -z  |     显示压缩包内的备注文字     |



### 参考示例：

- 1、解压zip包

```bash
unzip conf.zip 
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191615448.png)




- 2、将压缩包文件解压到指定目录中

```bash
unzip conf.zip -d /home/lcy/aaa/
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191615369.png)




- 3、测试压缩包文件是否完整，文件有无损坏

一般用于压缩完之后检测压缩包是否完整。

```bash
unzip -t conf.zip
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191615759.png)


* 4、批量解压 压缩包

```bash
for i in *.zip;do unzip $i; done
```

* 5、批量解压 压缩包并将解压的文件统一放到一个目录中
```bash
# 先创建一个要存放解压下来的文件的目录
mkdir /home/jieya

# 批量解压并指定放入的目录
for i in *.zip;do unzip $i -d /home/jieya/; done
```

## 分片压缩文件夹为zip压缩包（推荐在windows进行分片压缩）

先将目标压缩成单个的zip压缩包，再进行分片：

```bash
#先将目录打成压缩包
zip -r cs.zip cs/

#检查压缩包是否完整(ok即可)
zip -T cs.zip

#先看压缩包多大
du -sh cs.zip

#然后在根据自己要打多大一个压缩包，分片压缩zip压缩包
zip -s 130m cs.zip --out cs-data.zip

#就可以看到打的压缩包了， cs-data.z01 cs-data.z02 cs-data.zip
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191615589.png)


解析分片压缩zip压缩包命令：

> -r：递归进入子目录
>
> -T：检查压缩包是否完整
>
> -s：指定分卷的最大容量，例如130m代表130MB、10g代表10GB
>
> --out：输出的zip压缩包名
>
> cs.zip：中间压缩包，分卷前的完整压缩包

使用以上命令进行分卷压缩时，会产生多个以数字排序的zip压缩包，如：

> cs-data.z01
> cs-data.z02
> …
> cs-data.zip



总体感觉，分片压缩zip压缩包不如在windows上执行，还是推荐windows上去执行分片压缩；



## 合并分片的压缩包 并 解压分片zip压缩包

可以先合并分片压缩包，再进行解压：

```text
# 合并分片压缩包
cat cs-data.z* > cs-new.zip

# 查看刚刚合并的压缩包大小
du -sh cs-new.zip

# 检查压缩包完整性(ok即没问题)
unzip -t cs-new.zip

# 解压zip压缩包
unzip cs-new.zip
```

解析合并压缩包命令：

> \>：重定向符
>
> -t：检查压缩包完整性
>
> cs-new.zip：分片压缩包合并后的完整压缩包名称
>
> unzip：解压zip压缩包





> 小提示：
> 如果在合并完压缩包之后，检查压缩包完整性的时候发现有错；
>
> 那么可以去windows上进行分片压缩，在拿到linux上合并，linux上的分片压缩不是很好，可能在合并并解压的时候报错，所以分片压缩的话还是建议在windows上；
> 没有必须要求分片合并解压在linux上的话，最好也在windows上进行操作。

