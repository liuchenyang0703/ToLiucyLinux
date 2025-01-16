---
title: 安装cuda报错_._cuda-installer_ error while loading shared libraries_ libxml2.so.2_ cannot open shared ob
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - GPU
  - NVIDIA
  - CUDA
  - 运维
pageview: false
date: 2024-12-20
comment: false
breadcrumb: false
---

## 在docker内安装cuda11.1时报如下错：


>./cuda-installer: error while loading shared libraries: libxml2.so.2: cannot open shared object file






## 解决方法：

```bash
#更新源
apt update

#安装libxml2插件
apt -y install libxml2
```
安装完成之后再次试一下安装cuda就可以了；
执行安装cuda的时候，如果不是root用户记得加sudo； `sudo cuda_11.1.0_455.23.05_linux.run`

Done！


