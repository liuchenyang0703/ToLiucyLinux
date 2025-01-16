---
title: 【Docker】查看每层镜像的大小
icon: circle-info
order: 1
category:
  - Linux
  - Docker
tag:
  - Linux
  - Docker
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

## docker history image
使用：`docker history image(镜像名)`可以看到构建镜像时每条命令执行的大小

这里显示的是所有层的信息；
如果看命令不知道是哪个的时候，可根据在build镜像时的IMAGE来判断是哪个。
```bash
[root@localhost mysql]# docker history redhat-mysql
IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
cf14a9a9f753        4 days ago          /bin/sh -c #(nop)  CMD ["mysqld"]               0B                  
312a16d871a0        4 days ago          /bin/sh -c #(nop)  EXPOSE 3306                  0B                  
372e0847f04a        4 days ago          /bin/sh -c mysqld --initialize-insecure --us…   127MB               
3f40e557ffcf        4 days ago          /bin/sh -c #(nop)  ENV PATH=/opt/mysql-5.7.3…   0B                  
cec92708a0d1        4 days ago          /bin/sh -c #(nop) COPY file:c21e035f53b78962…   162B                
b904f83aa22c        4 days ago          /bin/sh -c chown -R mysql:mysql /opt/mysql-5…   2.68GB              
62c02bad85d5        4 days ago          /bin/sh -c groupadd mysql && useradd -r -g m…   359kB               
789b6d170caf        4 days ago          /bin/sh -c #(nop) ADD file:41225123e9b5895c2…   2.68GB              
978bac9547fa        4 days ago          /bin/sh -c yum install -y libaio numactl        66.1MB              
069661fe1d9a        4 days ago          /bin/sh -c #(nop)  ENV LANG=en_US.utf8          0B                  
8d7d859c98e3        5 days ago          /bin/bash                                       319MB               
9da37a681956        3 years ago                                                         2.94kB              
<missing>           3 years ago                                                         205MB               Imported from -
```

如果我只要显示CREATED BY和每层的大小，那么可以使用：`--format='{{.CreatedBy}} - {{.Size}}'`
```bash
[root@localhost mysql]# docker history --format='{{.CreatedBy}} - {{.Size}}' redhat-mysql
/bin/sh -c #(nop)  CMD ["mysqld"] - 0B
/bin/sh -c #(nop)  EXPOSE 3306 - 0B
/bin/sh -c mysqld --initialize-insecure --us… - 127MB
/bin/sh -c #(nop)  ENV PATH=/opt/mysql-5.7.3… - 0B
/bin/sh -c #(nop) COPY file:c21e035f53b78962… - 162B
/bin/sh -c chown -R mysql:mysql /opt/mysql-5… - 2.68GB
/bin/sh -c groupadd mysql && useradd -r -g m… - 359kB
/bin/sh -c #(nop) ADD file:41225123e9b5895c2… - 2.68GB
/bin/sh -c yum install -y libaio numactl - 66.1MB
/bin/sh -c #(nop)  ENV LANG=en_US.utf8 - 0B
/bin/bash - 319MB
 - 2.94kB
 - 205MB
```


