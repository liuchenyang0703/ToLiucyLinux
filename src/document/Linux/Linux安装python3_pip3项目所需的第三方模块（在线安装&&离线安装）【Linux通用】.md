---
title: Linux安装python3_pip3项目所需的第三方模块（在线安装&&离线安装）【Linux通用】
icon: circle-info
order: 11
tag:
- Linux
- Python
category:
- Linux
- Python
- 运维
pageview: false
date: 2022-05-26
comment: false
isOriginal: true
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


## 前言
> &emsp;&emsp;一般部署项目或服务的时候需要一些python的模块，因项目要求，并没有外网，所以，只好离线下载一些需要的python模块；在这之前查阅了很多文章，但都是直接安装的，找这种离线包安装的特别困难，所以，好不容易找到了几篇，我就把这个写成一篇文章，供大家参考及使用，如有问题请留言或私信，感谢！

## 安装python3和pip3【Linux通用】
<br/>

**详细的安装教程请参考链接：[Linux下安装Python3.6.8（超级详细）](https://blog.csdn.net/liu_chen_yang/article/details/123680594)**

---

## 升级/更新pip3

```bash
pip3 install --upgrade pip
pip3 install pip -U -i https://pypi.tuna.tsinghua.edu.cn/simple
```

## 常用参数
### pip3 install 常用参数

| 参数                     | 说明        | 示例                                        |
| ---------------------- | --------- | ----------------------------------------- |
|安装||
| `install <pkg>`        | 安装模块      | `pip3 install requests`                   |
| `install <pkg>==<ver>` | 安装指定版本模块      | `pip3 install requests==2.31.0`           |
| `-r requirements.txt`  | 按文件安装依赖   | `pip3 install -r requirements.txt`        |
| `--upgrade` / `-U`     | 升级包       | `pip3 install -U pip`                     |
| `--force-reinstall`    | 强制重新安装    | `pip3 install --force-reinstall requests` |
| `--no-deps`            | 不安装依赖     | `pip3 install --no-deps pdfminer.six`     |
| `-i <url>`                | 指定安装源         | `pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple requests`    |

### pip3  download 常用参数
| 参数                        | 说明                                                     | 示例                                                                                                           |
| ------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `-d`        | 指定下载目录（默认当前目录）                                         | `pip3 download request -d ./pkgs/`                                                                           |
| `-r <requirements.txt>`   | 按 requirements 文件下载                                    | `pip3 download -r requirements.txt -d ./pipdownload/`                                                                          |
| `--platform <platform>`   | 指定平台（如 manylinux、win\_amd64），要配合 `--only-binary=:all:` | `pip3 download --platform manylinux2014_x86_64 --only-binary=:all: numpy`                                    |
| `--python-version <ver>`  | 指定目标 Python 版本                                         | `pip3 download --python-version 37 numpy`                                                                    |                                               |
| `--only-binary <pattern>` | 只下载二进制（whl）                                            | `pip3 download --only-binary=:all: numpy`                                                                    |
| `--no-binary <pattern>`   | 禁止下载二进制，强制源码包（tar.gz）                                  | `pip3 download --no-binary=:all: numpy`                                                                      |
| `--implementation <impl>` | 指定 Python 实现（如 cp, pp, ip）                             | `pip3 download --implementation cp numpy`               |
| `--no-deps`               | 不下载依赖                                                  | `pip3 download --no-deps pdfminer.six` |
| `-v`                      | 显示更多调试信息                                               | `pip3 download -v requests`          |

### pip3 其他常用参数
| 参数                        | 说明                                                     | 示例                                                                                                           |
| ------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
|卸载 / 查看||
| `uninstall <pkg>` | 卸载包      | `pip3 uninstall requests` |
| `list`            | 查看已安装包   | `pip3 list`               |
| `list --outdated` | 查看可升级包   | `pip3 list --outdated`    |
| `show <pkg>`      | 查看包信息    | `pip3 show requests`      |
| `check`           | 检查依赖是否完整 | `pip3 check`              |
|查看环境 / 版本||
| `--version` | 查看 pip 版本 | `pip3 --version`           |
| `-V`        | 同上        | `pip3 -V`                  |
| `-v / -vv`  | 增加输出详情    | `pip3 install -v requests` |
| 查看缓存信息| | |
| `cache dir`   | 查看 pip 缓存路径 | `pip3 cache dir`   |
| `cache info`  | 显示缓存信息      | `pip3 cache info`  |
| `cache purge` | 清理缓存        | `pip3 cache purge` |



## 安装项目所需的模块
<br>

### 在线安装所需模块
**<font color=teal>格式：</font>**
```bash
pip3 install 所需模块的名字
pip3 install 所需模块的名字 -i 模块镜像加速地址
```
**<font color=teal>实例一：</font>**

```bash
pip3 install numpy
pip3 install numpy -i https://pypi.tuna.tsinghua.edu.cn/simple
```

**<font color=teal>实例二（指定版本）：</font>**

>模块名==指定版本

```bash
pip3 install numpy==1.19.5 -i https://pypi.tuna.tsinghua.edu.cn/simple
```

<br>

### 下载所需模块离线安装包

#### ①、单个模块下载&&指定路径

**<font color=teal>格式：</font>**

```bash
pip3 download 模块名 -d 下载的包的存储路径
pip3 download 模块名 -i 模块镜像加速地址 -d 下载的包的存储路径
```

**<font color=teal>实例一：</font>**
```bash
pip3 download numpy -d /data/packages/
pip3 download numpy -i https://pypi.tuna.tsinghua.edu.cn/simple -d /data/packages/
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202508221620052.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202508221620163.png)


- 默认就是最新版本，如需其他指定版本可使用`==`来指定版本。

**<font color=teal>实例二（指定版本）：</font>**
```bash
pip3 download numpy==1.18.5 -d /data/packages/
pip3 download numpy==1.18.5 -i https://pypi.tuna.tsinghua.edu.cn/simple -d /data/packages/
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202508221620868.png)



#### ②、批量下载模块&&指定目录

**<font size=3>创建文件</font>**

批量下载模块，首先要创建一个文件（文件名任意）
```bash
#创建一个文件并进入
vim python-pack

#文件内可以写你想要下载的模块名，我的就下载这些；
chardet
joblib
numpy
ocrd_fork_pylsd
PyMuPDF
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202508221620168.png)

**<font size=3>批量下载</font>**


**<font color=teal>格式：</font>**

```bash
pip3 download -r 批量下载模块的文件名 -d 指定下载的路径
```

**<font color=teal>实例：</font>**

**<font color=red>注意自己的批量下载模块的文件的路径，也要写正确.</font>**

```bash
pip3 download -r python-pack -d /data/packages/
```
>第一次下载和我这个图片可能有一些不一样，因为我这是测试的时候已经下载过了，删除又重新下载的（会有缓存），所以，与第一次下载过程是有一些差别的，不过，没有任何影响。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202508221620461.png)
最后我们就可以看到，指定的一些模块已经下载成离线包了，就可以下载到本地拿去用了。
要是想下载指定版本的，和上面的一样，只不过是在文本里修改就好了；例如：`numpy==1.18.5`。

## 批量下载所需模块离线安装包及批量安装【推荐使用】
以上下载方式有个缺点，就是都下载到一个目录里了，不容易区分；
所以，为了方便区分和安装，我写了个脚本大家可以参考，下载需要的模块到对应的目录里，如下：
* download.sh
```bash
#!/bin/bash

# 定义要下载的模块列表(不带版本号)
modules=(
    "pip"
    "numpy"
    "PyMuPDF"
)
# 定义要下载的模块列表(带版本号)
modules2=(
    "torch==1.8.1"
)

# 指定pip源
pip_source="https://pypi.tuna.tsinghua.edu.cn/simple"

# 遍历模块列表，下载每个模块(不带版本的)
for module in "${modules[@]}"; do
    mkdir $module
    echo "正在下载$module模块..."
    # 使用pip下载模块
    pip3 download $module -i "$pip_source" -d $module
    # wheel下载的离线包都是whl的，不会包含tar.gz的，推荐使用。
    # pip3 wheel $module -i "$pip_source" -w $module
done

# 遍历模块列表，下载每个模块（带版本的）
for module2 in "${modules2[@]}";do
    qu=$(echo "$module2" | awk -F "==" '{print $1}')
    mkdir $qu
    echo "正在下载$qu模块..."
    # 使用pip下载模块
    pip3 download $module2 -i "$pip_source" -d $qu
    # wheel下载的离线包都是whl的，不会包含tar.gz的，推荐使用。
    # pip3 wheel $module2 -i "$pip_source" -w $qu
done


echo "所有模块下载完成！"
```
既然都下载了，那当然就会有批量安装脚本，如下：

* install.sh
```bash
#!/bin/bash

# 定义要安装的模块列表
modules=(
    "pip"
    "numpy"
    "PyMuPDF"
    "torch"
)

# 遍历模块列表，安装每个模块
for module in "${modules[@]}"; do
    # 进入对应目录
    cd "$module"
    # 使用pip安装模块
    echo "正在安装 $module ..."
    pip3 install *
    
    # 返回上级目录
    cd ..
done

echo "所有模块安装完成！"
```
## 附加：
### pip安装、下载国内源

> 如果安装慢，可以换成国内源：

国内源一：pip install 安装包名字 `-i http://pypi.doubanio.com/simple` 豆瓣镜像网站

国内源二：pip install 安装包名字 `-i http://pypi.douban.com/simple` 豆瓣

国内源三：pip install 安装包名字 `-i https://pypi.tuna.tsinghua.edu.cn/simple` 清华大学

国内源四：pip install 安装包名字` -i http://mirrors.aliyun.com/pypi/simple`  阿里云

国内源五：pip install 安装包名字 `-i https://pypi.mirrors.ustc.edu.cn/simple`  中国科技大学

国内源六：pip install 安装包名字 `-i http://pypi.mirrors.ustc.edu.cn/simple`  中国科学技术大学


### pip3 wheel 命令

* **作用**：为给定的“需求（requirements）”生成 **wheel 文件（.whl）**，存到本地目录，**不安装**。
* **来源**：如果是已存在的 `.whl`，会直接复制到目标目录；如果是源码包（sdist，如 `.tar.gz`），会**触发本地构建**下载成whl包。
* **场景**：准备离线包、CI 预构建缓存、加速后续安装（`pip install --no-index --find-links=...`）。

> 注意：**`pip wheel` 不能跨平台构建**（比如在 x86\_64 上为 aarch64 构建）。要给“其他平台”准备现成 wheel，请用 `pip download --platform ... --only-binary=:all:`；`pip wheel` 构建出的 wheel始终针对**当前平台/解释器**。

---

#### pip3 wheel 常用参数

| 参数                               | 作用                                    | 示例                                                                                     |
| -------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------- |
| `-w`          | 指定 wheel 输出目录                         | `pip3 wheel numpy -w numpy`                                         |
| `-i`          | 指定镜像地址                            | `pip3 wheel numpy -i https://pypi.tuna.tsinghua.edu.cn/simple`                    |
| `-r `                      | 从 requirements 文件读取依赖                 | `pip3 wheel -r requirements.txt -w wheelhouse`                                    |                                       |
| `--only-binary <pattern>`        | 只接受二进制包（避免下载/构建源码）                    | `pip3 wheel --only-binary=:all: -r req.txt`                                            |
| `--no-binary <pattern>`          | 禁止二进制包，强制源码构建                         | `pip3 wheel --no-binary=:all: mypkg`                                                   |
| `-v / -vv`                       | 输出更详细日志                               | `pip3 wheel -vv -r requirements.txt`                                                   |
| `--no-cache-dir`                 | 禁用 pip 缓存                             | `pip3 wheel --no-cache-dir -r requirements.txt`                                        |
## 总结

> 使用`pip3 wheel`下载可以把`tar.gz`的包下载为`whl`格式的，就不用担心离线安装时编译安装失败了。
### 相关文章
>[Linux下安装Python3.6.8（超级详细）](https://blog.csdn.net/liu_chen_yang/article/details/123680594)
