---
title: docker如何在容器外执行容器内命令
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

## 前言
有时候我们想执行某个容器的某条命令，但又不想进入容器内。那该怎么办？

所以就有一种办法，我们直接在容器外执行容器内的命令，来进行一些容器内的操作。


<br>
<font color=red size=4>可以根据容器名来执行，也可以根据容器的CONTAINER ID来执行</font>


<br>

## 参考实例

- <font  color=teal>根据容器名来执行容器内的命令</font>

```bash
#查看容器名
docker ps -a
#例如nginx；-c后面是要执行的容器内的命令
sudo docker exec -it nginx /bin/bash -c 'cd /packages/detectron && python tools/train.py'
```
- <font  color=teal>根据容器名来执行容器内命令，不使用`-it`。</font>
> 这个不使用`it`，一般用于执行周期性计划任务之类的，容易遇到：<font color=red>the input device is not a TTY</font>报错；

```bash
sudo docker exec -i test /bin/bash -c 'cd /application/test && sh /application/test/start.sh’
```

- <font  color=teal>根据CONTAINER ID来执行容器内的命令</font>
```bash
#查看容器的CONTAINER ID
docker ps -a 
	DOCKER_ID=63f6f4sab243
#根据CONTAINER ID来执行容器内的命令
sudo docker exec -it $DOCKER_ID /bin/bash -c 'cd /packages/detectron && python tools/train.py'
# 或
sudo docker exec $DOCKER_ID /bin/bash -c 'cd /packages/detectron && python tools/train.py'
```



## <font color=red>注意事项：</font>

>`-it` 有可能造成命令不执行，特别是在程序调用时，确认的确需要的时候再加上-it；
>在执行周期性计划任务的时候就不要加`-it`了，把`-it`改为`-i`即可；
>如果在周期性计划任务中使用的是`-it`，会遇到：<font color=red>the input device is not a TTY</font>报错；
>
<br>


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161456196.gif)


