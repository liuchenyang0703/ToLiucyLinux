---
title: 【Linux】Jenkins Pipeline流水线详解及基于Jenkins流水线实现自动更新项目（实战）
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

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ac9849a85ee448d3830389d1d2646d91.jpeg)


>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---



&emsp;&emsp;之前采用Jenkins的自由风格构建的项目，每个步骤流程都要通过不同的方式设置，并且构建过程中整体流程是不可见的，无法确认每个流程花费的时间，并且问题不方便定位问题。

&emsp;&emsp;Jenkins的`Pipeline`可以让项目的发布整体流程可视化，明确执行的阶段，可以快速的定位问题。并且整个项目的生命周期可以通过一个`Jenkinsfile`文件管理，而且`Jenkinsfile`文件是可以放在项目中维护的。

所以Pipeline相对自由风格或者其他的项目风格更容易操作。

&emsp;&emsp;pipline是帮助Jenkins实现CI到CD转变的重要角色，是运行在jenkins2.X版本的核心插件，简单来说Pipline就是一套运行于Jenkins上的工作流框架，将原本独立运行于单个或者多个节点的任务连接起来，实现单个任务难以完成的复杂发布流程，从而实现单个任务很难实现的复杂流程编排和任务可视化。

## 一、Pipeline 流水线的简介

### 1.1 什么是Jenkins的流水线？

Jenkins的流水线（Pipeline）是一套插件，用于实现和集成持续交付流水线到Jenkins。流水线可以自动表达从版本控制向用户和客户获取软件的进程。具体来说，软件的每次变更（在源代码控制中提交）在被释放的路上都会经历一个复杂的过程，这个过程包括以一种可靠且可重复的方式构建软件，并通过多个测试和部署阶段来开发构建好的软件。

对Jenkins流水线的定义被写在一个文本文件中（称为Jenkinsfile），该文件可以被提交到项目的源代码控制仓库，这是“流水线即代码”的基础。将CD流水线作为应用程序的一部分，像其他代码一样进行版本化和审查。 创建 `Jenkinsfile`并提交它到源代码控制中提供了一些即时的好处:

> * 自动地为所有分支创建流水线构建过程并拉取请求。
> * 在流水线上代码复查/迭代 (以及剩余的源代码)。
> * 对流水线进行审计跟踪。
> * 该流水线的真正的源代码, 可以被项目的多个成员查看和编辑。



While定义流水线的语法, 无论是在 web UI 还是在 Jenkinsfile 中都是相同的, 通常认为在`Jenkinsfile` 中定义并检查源代码控制是最佳实践。	



### 1.2 Pipeline中几个重要概念：



> * pipeline 流水线是用户定义的一个CD流水线模型 。流水线的代码定义了整个的构建过程, 他通常包括构建, 测试和交付应用程序的阶段 。
>   `pipeline 块`是 `声明式流水线语法`的关键部分
> * Stage：阶段，一个pipeline可以划分为若干个stage，每个stage都是一个操作步骤，比如clone代码、代码编译、代码测试和代码部署，阶段是一个逻辑分组，可以跨多个node执行。
> * Node：节点，每个node都是一个jenkins节点，可以是jenkins master也可以是jenkins agent，node是执行step的具体服务器。另外, node块是 `脚本化流水线语法`的关键部分
> * Step：步骤，step是jenkins pipeline最基本的操作单元，从在服务器创建目录到构建容器镜像，由各类Jenkins插件提供实现，一个stage中可以有多个step，例如：sh “make”



### 1.3 Pipeline优势
* [x] 可持续性：jenkins的重启或者中断后不影响已经执行的`pipeline Job`
* [x] 支持暂停：pipeline可以选择停止并等待人工输入或批准后再继续执行
* [x] 可扩展：通过`groovy`的编程更容易的扩展插件
* [x] 并行执行：通过`groovy`脚本可以实现step，stage间的并行执行，和更复杂的相互依赖关系。





## 二、Pipeline流水线 简单的构建



流水线既能作为任务的本身，也能作为`Jenkinsfile`，其类似于`dockerfile`（将启动`docker`的所有命令，打包成一个文件）

Jenkins的web-ui所做的操作，也可以落地到Jenkinsfile里面，与dockerfile类似去开发

**使用流水线可以让我们的任务从ui手动操作，转换为代码化，像docker的dockerfile一样，从shell命令到配置文件，更适合大型项目，可以让团队其他开发者同时参与进来，同时也可以编辑开发Jenkinswebui不能完成的更复杂的构建逻辑，作为开发者可读性也更好。**



### 2.1 jenkinsfile 必备的五个组成部分



Jenkinsfile·有5个`必备的组成部分`

| 语法     | 解析                                         |
| :------- | :------------------------------------------- |
| pipeline | 整条流水线                                   |
| agent    | 指定执行器（也就是你要在哪台服务器上执行）   |
| stages   | 所有阶段（只有一个，下面为stage）            |
| stage    | 某一阶段（可有多个，下面为steps）            |
| steps    | 阶段内的每一步，可执行命令（可执行多条命令） |



### 2.2 Jenkins 上创建一个 Pipeline 流水线任务

#### 2.2.1 Jenkins 上安装Blue Ocean插件

找到插件商场；

Manage Jenkins --> Plugins --> 点击Available plugins ：搜索Blue Ocean --> 点击安装



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/7922e54a0b5e418f89627cca8bb03c2e.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b1307fff15824137b0a0afe6ec6ecedf.png)



因为我这里已经安装了，就从installed里面截图了。找到`Blue Ocean`点击安装。



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/64b7b7eebc334439974b3c305f593585.png)



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/749a8c3407634b80acccbc7265583c4f.png)



等待安装完重启jenkins；重启完之后就可以在首页中的左侧看到`打开Blue Ocean`了；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/aedc44abe17f490fb049814303faae6a.png)



然后我们新建一个流水线任务；

#### 2.2.2 新建一个 Pipeline 任务

点击新建Item -- > 选中Pipeline，输入一个任务名称；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b6891318d6c9466eb821fdefe65864f6.png)



自己定义一下描述即可；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/922d184f9cca420a8cbaa846982f3f08.png)



#### 2.2.3 编辑流水线



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/9b14b31a582d4e94a57f152ba559b27d.png)



鉴于对新手不太友好，我们这里先看看，然后使用`Hello World脚本生成`；生成Groovy脚本；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/110d6fa0893d492db80381a87cd6e1d7.png)



默认会生成一个`Hello World脚本`，可以看到应用到了上面说的Jenkinsfile必备的五个组成部分；其他的就可以自行添加了，我们先来测试；

#### 2.2.4 保存并构建流水线

* 直接点击保存 --> 然后build构建



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/47f33a7f835044439907f1bad56fee5a.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c7188daf5e8a4149915f429dafb0d368.png)



点击构建的时候会在左下角的构建历史展示，如果没有刷新一下页面就可以了；直接点击进去再去找`Console Output`控制台输出或者是直接鼠标停留点击尖角号，再点击`Console Output`查看控制台输出。



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/6fba362a143d4a47a8010b702f4ef6f7.png)



SUCCESS表示执行完成，没有报错：





我们执行完也可以看一下阶段视图



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/2a11852389c34a5bb74efd3eded8b3d0.png)



这样一个简单的流水线就构建成功了，可视化我们可以点击左侧的 `打开Blue Ocean`，就可以看到刚刚执行的流程；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b358898dcccb4b98aa098c15e9555ab6.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/7acf02978b2e4139865bc505c9ecb83a.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/72429b0af8374b2bb45d442b6c38fecd.png)



这样就可以看到可视化执行过程了，当然因为这个是只有一个`stage`所以看着不是很清晰，后面我们会添加更多的`stage`，这时候的可视化过程就发挥到了他的作用了。



## 三、Pipeline流水线 声明式语法解析

可参考：

[【Jenkins】Pipeline流水线语法解析全集 -- 声明式流水线](https://liucy.blog.csdn.net/article/details/136528857)

[【Jenkins】Pipeline流水线语法解析全集 -- 脚本式流水线、groovy语法](https://liucy.blog.csdn.net/article/details/136567517)



## 四、【进阶】基于Pipeline 流水线实现项目的更新

### 4.1 熟悉项目更新流程

熟悉项目更新流程：就是我们在服务器上是怎么更新的，那么我们在这就先写好更新的流程；

例如：我们更新服务里的某一个文件使用的容器方式，那么步骤就是：

> 1、复制文件到一个目录下；
>
> 2、备份之前的文件；
>
> 3、将复制的文件放到服务所需的目录下；
>
> 4、重启服务容器；
>
> 5、直接在容器外执行指定容器内命令启动服务；
>
> 6、测试（可使用脚本进行测试返回一个值，也可以自己再页面测试）



以上就是整体更新的流程了，那么我们可以写5个 -- 6个`stage`：看以下部分：

```yaml
pipeline {
    agent {
        label '224'
    }
    environment {
        Container_wai = '/home/lcy/'
        Container_nei = '/application/'
    }

    stages {
        stage('copy_file') {	// 复制文件到服务器上
            steps {
                
            }
        }
        
        stage('backup_file') {	// 备份要更新的文件
            steps {
                
            }
        }
        
        stage('mv_file') {	// 将新上传的文件复制到项目所需的路径下
            steps {
                
            }
        }
        
        stage('restart_container') {	// 重启容器
            steps {
                
            }
        }
        
        stage('start_service') {	// 启动服务
            steps {
                
            }
        }
    }
}
```



> 解析：
>
> ```yaml
> agent {
>     label '224'
> }
> ```
>  在node为224的服务器上执行此操作，224为添加node时自定义的名字，具体如何添加node，可查看：[【Jenkins】Pipeline流水线语法解析全集 -- 声明式流水线 ](https://liucy.blog.csdn.net/article/details/136528857)中的如何创建一个node节点。
>
> <br>
>
> environment：为配置的环境变量，这里我们配置的是文件上传的路径的和文件要更新的路径；
>
> 
>
> 下面就是一个大的stages下分别有多个`stage`，一个stage代表一个操作，便于排查问题；一个`stage`下有一个`steps`，steps内可以写具体要执行的操作；



大概流程写完之后，我们就可以在`steps`中写具体操作了；



### 4.2 基于上面创建的Pipeline流水线任务修改（可自行重新创建）



这里我们没有项目在git上，所以跳过git那一步，从本机往目标服务器拉取文件；

目标服务器记得做免密，一般在配置`node节点`的时候就会做免密；

```yaml
pipeline {
    agent {
        label '224'
    }
    environment {
        file_Path = '/home/lcy/'
        Container_wai = '/home/lcy/V1.0'
        Container_nei = '/application/'
        file_Name = 'cs.py'
    }

    stages {
        stage('copy_file') {
            agent {
                label 'localhost'
            }
            steps {
                script {
                    def sourcePath = "/root/${file_Name}"
                    def targetNode = '172.11.11.224'
                    sh "scp ${sourcePath} root@${targetNode}:${file_Path}/"
                    sh 'if [ $? -eq 0 ];then echo \'成功\'; else echo \'失败\'; fi'
                }
            }
        }
        
        stage('backup_file') {
            steps {
                sh "mv ${Container_wai}/${file_Name} ${Container_wai}/${file_Name}-`date +%Y-%m-%d`"
                echo "备份要更新的文件"
            }
        }
        
        stage('mv_file') {
            steps {
                sh "mv ${file_Path}/${file_Name} ${Container_wai}/ && chmod 775 ${Container_wai}/${file_Name}"
                echo '将新上传的文件复制到项目所需的路径下'
            }
        }
        
        stage('restart_container') {
            steps {
                sh "docker restart test"
                echo '重启容器'
            }
        }
        
        stage('start_service') {
            steps {
                sh "docker exec -i test /bin/bash -c 'sh start.sh'"
                echo '启动服务'
            }
            post {
                always {
                    emailext(
                        to: "********@qq.com",
                        subject: "执行成功通知: " + currentBuild.fullDisplayName,
                        body: 
                        """
                        <h2>Build Result: ${currentBuild.result}</h2> 
                        <p>Full Display Name: ${currentBuild.fullDisplayName}</p> 
                        <p>URL: ${currentBuild.absoluteUrl} </p>
                        <p>Change: ${currentBuild.changeSets}</p>
                        <p>user: </p>
                        """
                    )
                }
            }
        }
    }
}
```



解析：



![image-20240312162945962](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f627bd1c6e95f3627965e92e865fc7bb.png)





### 4.3 保存并构建流水线



![image-20240312163333547](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/dedda8e01a575c125fb4d3d97d3e95f5.png)

* 跑完也可以查看阶段视图：项目 --> 状态

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/240ff8f7b73d4d429bacde685175caab.png)




### 4.5 查看服务是否正常



![image-20240312163254879](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/a3ab9d31d7a8a99992bf20589753a7ae.png)



这个是执行完发送的邮件，具体服务是否正常，需要根据自己的服务类型去判断；也可自行添加调用，判别服务是否正常。



---

自此，流水线自动更新服务就完成了！！！



## 五、相关专栏
|专栏名称|  专栏地址|
|--|--|
| [《Jenkins》](https://blog.csdn.net/liu_chen_yang/category_12493057.html) |[https://blog.csdn.net/liu_chen_yang/category_12493057.html](https://blog.csdn.net/liu_chen_yang/category_12493057.html)  |
|  [《自动化运维》](https://blog.csdn.net/liu_chen_yang/category_12473478.html)| [https://blog.csdn.net/liu_chen_yang/category_12473478.html](https://blog.csdn.net/liu_chen_yang/category_12473478.html) |
|  [《Linux从入门到精通》](https://blog.csdn.net/liu_chen_yang/category_10887074.html)|  [https://blog.csdn.net/liu_chen_yang/category_10887074.html](https://blog.csdn.net/liu_chen_yang/category_10887074.html)|




## 六、相关文章
|文章名称|文章链接  |
|--|--|
|[【Jenkins】Pipeline流水线语法解析全集 -- 声明式流水线](https://liucy.blog.csdn.net/article/details/136528857)  |[https://liucy.blog.csdn.net/article/details/136528857](https://liucy.blog.csdn.net/article/details/136528857)  |
|[【Jenkins】Pipeline流水线语法解析全集 -- 脚本式流水线、groovy语法](https://liucy.blog.csdn.net/article/details/136567517)|[https://liucy.blog.csdn.net/article/details/136567517](https://liucy.blog.csdn.net/article/details/136567517)|
|[【Linux】Jenkins Pipeline流水线详解及基于Jenkins流水线实现自动更新项目](https://liucy.blog.csdn.net/article/details/136656568)|[https://liucy.blog.csdn.net/article/details/136656568](https://liucy.blog.csdn.net/article/details/136656568)|



