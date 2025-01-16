---
title: 【K8s】yaml文件格式详解及实例
icon: circle-info
order: 1
category:
  - Linux
  - kubernetes
  - Docker
tag:
  - Linux
  - kubernetes
  - Docker
  - yaml
  - 运维
pageview: false
date: 2024-12-16
comment: false
breadcrumb: false
---

>🍁**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>


## yaml简介
yaml 是专门用来写配置文件的语言，后缀名可以是.yaml或.yml都可以。

>yaml文件一般用于写dockerfile或k8s中的pod yml。

## yaml语法规则【重要】
- 大小写敏感
- 使用缩进表示层级关系（不能用Tab，只能用空格）
- 相同层级的元素左对齐
- #号表示单行注释
- 字符串可以不用引号标注
- 数组（列表）是使用 - 开头的清单形式，- 后面必须加空格
- 表示对象的 : 和表示数组（列表）的 - 后面都必须要有空格。可以使用 - 回车- 回车-回车 在一个文件里分隔多个 YAML 对象
## Yaml语法实例
### 数组（列表）实例； 短横线加空格（- ）

```bash
  - linux
  - name
  - windows
```

### Yaml 对象（字典）实例；用冒号加空格连接键和值（: ）

```bash
  Kubernetes: 
    linux: vim
    name: 张三
    windows: steam
```

### Yaml 数组 对象结合（列表中的字典）实例；短横线加空格（- ），用冒号加空格连接键和值（: ）

```bash
containers: 
- image: mysql5.7.38
  name: mysql
  restart: always
  ports: 
    - 6379:6379
  volumes: 
    - /etc/localtime:/etc/localtime
```
## Yaml格式说明与实例
### 格式说明
pod.yaml

```bash
# yaml格式的pod定义文件完整内容展示：
apiVersion: v1       #必选，版本号，例如v1
kind: Pod            #必选，Pod
metadata:            #必选，元数据
  name: string       #必选，Pod名称
  namespace: string  #必选，Pod所属的命名空间
  labels:            #必选，自定义标签
    app: string   	 #必选，自定义标签名字
  annotations:       #自定义注释列表
    - name: string
spec:                #必选，Pod中容器的详细定义
  restartPolicy: [Always | Never | OnFailure]	#Pod的重启策略，Always表示一旦不管以何种方式终止运行，kubelet都将重启，OnFailure表示只有Pod以非0退出码退出
  hostNetwork: true  #是否使用主机网络模式，默认为false，如果设置为true，表示使用宿主机网络；如何使用host网络模式则不需要在使用下面的ports参数了。
  containers:        #必选，Pod中容器列表
  - name: string     #必选，容器名称
    image: test:latest    #必选，容器的镜像名称
    imagePullPolicy: [Always | Never | IfNotPresent]    #获取镜像的策略 Alawys表示下载镜像 IfnotPresent表示优先使用本地镜像，否则下载镜像，Nerver表示仅使用本地镜像
    command: [string]    #必选，容器的启动命令列表，如不指定，使用打包时使用的启动命令,如需要在容器内启动就指定个top之类的持续输出。
    stdin: true			 #需要交互式进入容器必选，设置为 true 允许你能够向容器发送输入，相当于docker中的-i。
    tty: true		     #需要交互式进入容器必选，设置为 true 分配一个伪终端，相当于docker中的-t。
    args: [string]       #容器的启动命令参数列表
    workingDir: /application   #容器的工作目录
    volumeMounts:        #挂载到容器pod内部的存储卷配置
    - name: test-path    #引用pod定义的共享存储卷的名称，需用volumes[]部分定义的的卷名
      mountPath: string  #要映射到pod内的存储路径
      readOnly: boolean  #是否为只读模式
  volumes:               #在该pod上定义共享存储卷列表（pod外）
  - name: test-path      #共享存储卷名称，需要和volumeMounts的名称相同
    hostPath: 		     #类型为hostPath的存储卷，表示挂载Pod所在宿主机的目录
      path: string       #Pod所在宿主机的目录，用于挂载到pod容器内的路径
      type: Directory	 #表示挂载的是一个目录。
    ports:               	#需要暴露的端口库号列表，如果开启了hostNetwork就不需要写这个了。
    - name: test-port    	#端口号名称，自己定义就行
      containerPort: 8080	#容器需要监听的端口号
      hostPort: 8080      	#容器所在主机需要监听的端口号，默认与Container相同
      protocol: TCP   	#端口协议，支持TCP和UDP，默认TCP

----------------------------------上半部分yml文件基本配置，基本都会用到---------------------------------------------------

    env:                 #容器运行前需设置的环境变量列表
    - name: string       #环境变量名称
      value: string      #环境变量的值
    resources:           #资源限制和请求的设置
      limits:            #资源限制的设置
        cpu: string      #Cpu的限制，单位为core数，将用于docker run --cpu-shares参数
        memory: string   #内存限制，单位可以为Mib/Gib，将用于docker run --memory参数
      requests:          #资源请求的设置
        cpu: string      #Cpu请求，容器启动的初始可用数量
        memory: string   #内存清楚，容器启动的初始可用数量
    livenessProbe:       #对Pod内个容器健康检查的设置，当探测无响应几次后将自动重启该容器，检查方法有exec、httpGet和tcpSocket，对一个容器只需设置其中一种
      exec:              #对Pod容器内检查方式设置为exec方式
        command: [string]  #exec方式需要制定的命令或脚本
      httpGet:           #对Pod内个容器健康检查方法设置为HttpGet，需要制定Path、port
        path: string
        port: number
        host: string
        scheme: string
        HttpHeaders:
        - name: string
          value: string
      tcpSocket:         #对Pod内个容器健康检查方式设置为tcpSocket方式
         port: number
       initialDelaySeconds: 0   #容器启动完成后首次探测的时间，单位为秒
       timeoutSeconds: 0        #对容器健康检查探测等待响应的超时时间，单位秒，默认1秒
       periodSeconds: 0         #对容器监控检查的定期探测时间设置，单位秒，默认10秒一次
       successThreshold: 0
       failureThreshold: 0
       securityContext:
         privileged:false
    restartPolicy: [Always | Never | OnFailure]#Pod的重启策略，Always表示一旦不管以何种方式终止运行，kubelet都将重启，OnFailure表示只有Pod以非0退出码退出
    nodeSelector: obeject  #设置NodeSelector表示将该Pod调度到包含这个label的node上，以key：value的格式指定将该Pod调度到包含这个label的node上，以key：value的格式指定
    imagePullSecrets:      #Pull镜像时使用的secret名称，以key：secretkey格式指定
    - name: string
  hostNetwork: false      #是否使用主机网络模式，默认为false，如果设置为true，表示使用宿主机网络
    volumes:               #在该pod上定义共享存储卷列表
    - name: string         #共享存储卷名称（volumes类型有很多种）
      emptyDir: {}         #类型为emtyDir的存储卷，与Pod同生命周期的一个临时目录。为空值
      hostPath: 		   #类型为hostPath的存储卷，表示挂载Pod所在宿主机的目录
        path: string       #Pod所在宿主机的目录，将被用于同期中mount的目录
      secret:              #类型为secret的存储卷，挂载集群与定义的secre对象到容器内部
        scretname: string  
        items:     
        - key: string
          path: string
      configMap:           #类型为configMap的存储卷，挂载预定义的configMap对象到容器内部
        name: string
        items:
        - key: string
```
deployment.yaml

```bash
apiVersion: extensions/v1beta1   #接口版本
kind: Deployment                 #接口类型
metadata:
  name: cango-demo               #Deployment名称
  namespace: cango-prd           #命名空间
  labels:
    app: cango-demo              #标签
spec:
  replicas: 3
  strategy:
    rollingUpdate:          #由于replicas为3,则整个升级,pod个数在2-4个之间
      maxSurge: 1           #滚动升级时会先启动1个pod
      maxUnavailable: 1     #滚动升级时允许的最大Unavailable的pod个数
  template:         
    metadata:
      labels:
        app: cango-demo     #模板名称必填
    sepc:                   #定义容器模板，该模板可以包含多个容器
      containers:                                                                   
        - name: cango-demo                                                              #镜像名称
          image: swr.cn-east-2.myhuaweicloud.com/cango-prd/cango-demo:0.0.1-SNAPSHOT    #镜像地址
          command: [ "/bin/sh","-c","cat /etc/config/path/to/special-key" ]             #启动命令
          args:                                                                         #启动参数
            - '-storage.local.retention=$(STORAGE_RETENTION)'
            - '-storage.local.memory-chunks=$(STORAGE_MEMORY_CHUNKS)'
            - '-config.file=/etc/prometheus/prometheus.yml'
            - '-alertmanager.url=http://alertmanager:9093/alertmanager'
            - '-web.external-url=$(EXTERNAL_URL)'
#如果command和args均没有写，那么用Docker默认的配置。
#如果command写了，但args没有写，那么Docker默认的配置会被忽略而且仅仅执行.yaml文件的command（不带任何参数的）。
#如果command没写，但args写了，那么Docker默认配置的ENTRYPOINT的命令行会被执行，但是调用的参数是.yaml中的args。
#如果如果command和args都写了，那么Docker默认的配置被忽略，使用.yaml的配置。
          imagePullPolicy: IfNotPresent  #如果不存在则拉取
          livenessProbe:       #表示container是否处于live状态。如果LivenessProbe失败，LivenessProbe将会通知kubelet对应的container不健康了。随后kubelet将kill掉
            httpGet:
              path: /health    #如果没有心跳检测接口就为/
              port: 8080
              scheme: HTTP
            initialDelaySeconds: 60 #启动后延时多久开始运行检测
            timeoutSeconds: 5
            successThreshold: 1
            failureThreshold: 5
          readinessProbe:
            httpGet:
              path: /health     #如果没有心跳检测接口就为/
              port: 8080
              scheme: HTTP
            initialDelaySeconds: 30 ##启动后延时多久开始运行检测
            timeoutSeconds: 5
            successThreshold: 1
            failureThreshold: 5
          resources:              ##CPU内存限制
            requests:
              cpu: 2
              memory: 2048Mi
            limits:
              cpu: 2
              memory: 2048Mi
          env:                    ##通过环境变量的方式，直接传递pod=自定义Linux OS环境变量
            - name: LOCAL_KEY     #本地Key
              value: value
            - name: CONFIG_MAP_KEY  #局策略可使用configMap的配置Key，
              valueFrom:
                configMapKeyRef:
                  name: special-config   #configmap中找到name为special-config
                  key: special.type      #找到name为special-config里data下的key
          ports:
            - name: http
              containerPort: 8080   #对service暴露端口
          volumeMounts:             #挂载volumes中定义的磁盘
          - name: log-cache
            mount: /tmp/log
          - name: sdb               #普通用法，该卷跟随容器销毁，挂载一个目录
            mountPath: /data/media    
          - name: nfs-client-root    #直接挂载硬方法，如挂载下面的nfs目录到/mnt/nfs
            mountPath: /mnt/nfs
          - name: example-volume-config  #高级用法第1种，将ConfigMap的log-script,backup-script分别挂载到/etc/config目录下的一个相对路径path/to/...下
            mountPath: /etc/config       
          - name: rbd-pvc                #高级用法第2种，挂载PVC(PresistentVolumeClaim)
#使用volume将ConfigMap作为文件或目录直接挂载，其中每一个key-value键值对都会生成一个文件，key为文件名，value为内容
  volumes:  # 定义磁盘给上面volumeMounts挂载
  - name: log-cache
    emptyDir: {}
  - name: sdb  #挂载宿主机上面的目录
    hostPath:
      path: /any/path/it/will/be/replaced
  - name: example-volume-config  # 供ConfigMap文件内容到指定路径使用
    configMap:
      name: example-volume-config  #ConfigMap中名称
      items:
      - key: log-script           #ConfigMap中的Key
        path: path/to/log-script  #指定目录下的一个相对路径path/to/log-script
      - key: backup-script        #ConfigMap中的Key
        path: path/to/backup-script  #指定目录下的一个相对路径path/to/backup-script
  - name: nfs-client-root         #供挂载NFS存储类型
    nfs:
      server: 10.42.0.55          #NFS服务器地址
      path: /opt/public           #showmount -e 看一下路径
  - name: rbd-pvc                 #挂载PVC磁盘
    persistentVolumeClaim:
      claimName: rbd-pvc1         #挂载已经申请的pvc磁盘
```
services.yaml

```bash
apiVersion: v1
kind: Service
matadata:                                #元数据
  name: string                           #service的名称
  namespace: string                      #命名空间
  labels:                                #自定义标签属性列表
    - name: string
  annotations:                           #自定义注解属性列表
    - name: string
spec:                                    #详细描述
  selector: []                           #label selector配置，将选择具有label标签的Pod作为管理
                                         #范围
  type: string                           #service的类型，指定service的访问方式，默认为
                                         #clusterIp
  clusterIP: string                      #虚拟服务地址
  sessionAffinity: string                #是否支持session
  ports:                                 #service需要暴露的端?列表
  - name: string                         #端口名称
    protocol: string                     #端口协议，支持TCP和UDP，默认TCP
    port: int                            #服务监听的端口号
    targetPort: int                      #需要转发到后端Pod的端口号
    nodePort: int                        #当type = NodePort时，指定映射到物理机的端口号
  status:                                #当spce.type=LoadBalancer时，设置外部负载均衡器的地址
    loadBalancer:                        #外部负载均衡器
      ingress:                           #外部负载均衡器
        ip: string                       #外部负载均衡器的Ip地址值
        hostname: string                 #外部负载均衡器的主机名
```
job.yaml

```bash
apiVersion: batch/v1
kind: Job
metadata:
  name: job-demo
spec:
  template:
    metadata:
      name: job-demo
    spec:
      restartPolicy: Never  #Job的RestartPolicy仅支持Never和OnFailure两种，不支持Always，我们知道Job就相当于来执行一个批处理任务，执行完就结束了
      containers:
      - name: counter
        image: busybox
        command:
        - "bin/sh"
        - "-c"
        - "for i in 9 8 7 6 5 4 3 2 1; do echo $i; done
```
Cronjob.yaml
>CronJob其实就是在Job的基础上加上了时间调度，我们可以：在给定的时间点运行一个任务，也可以周期性地在给定时间点运行。这个实际上和我们Linux中的crontab就非常类似了。一个CronJob对象其实就对应中crontab文件中的任务，它根据配置的时间格式周期性地运行一个Job，格式和crontab也是一样的。

```bash
#crontab的格式如下：
#分时日月周要运行的命令第1列分钟0～59 第2列时0～23）第3列日1～31 第4列月1～12 第5列周0～7（0和7表示星期天）第6列要运行的命令
apiVersion: batch/v2alpha1
kind: CronJob
metadata:
  name: cronjob-demo
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
          - name: hello
            image: busybox
            args:
            - "bin/sh"
            - "-c"
            - "for i in 9 8 7 6 5 4 3 2 1; do echo $i; done"
```
>我们这里的Kind是CronJob了，要注意的是.spec.schedule字段是必须填写的，用来指定任务运行的周期，格式就和crontab一样，另外一个字段是.spec.jobTemplate, 用来指定需要运行的任务，格式当然和Job是一致的。还有一些值得我们关注的字段.spec.successfulJobsHistoryLimit和.spec.failedJobsHistoryLimit，表示历史限制，是可选的字段。它们指定了可以保留多少完成和失败的Job，默认没有限制，所有成功和失败的Job都会被保留。然后，当运行一个Cron Job时，Job可以很快就堆积很多，所以一般推荐设置这两个字段的值。如果设置限制的值为 0，那么相关类型的Job完成后将不会被保留。

### 实例
cs.yaml

```bash
apiVersion: v1  #API版本号，用于迭代我们的更新版本
kind: Pod       #资源对象的类型，有pod，Node，Job，Service
metadata:       #资源元数据，标记对象，方便管理
  name: hll-pod #给pod起名称
  labels:       #给pod打标签，方便找
    env: demo   #注入容器内的环境变量
    owner: feifei
spec:           #资源规格，pod内容器相关信息
  replicas: 1   #副本数量
  selector:     #标签选择器
    matchLabels:
      app: web

  template:     #pod模板
    metadata:   #pod元数据
      labels:   #给pod打标签，方便找
        app: web
  spec:         #pod规格
    containers:   #容器配置
    - image: nll:v1    #运行容器镜像
      name: nll              #容器名称
      ports:                 #端口号
        - containerPort: 80    #容器端口号
        - 8090:8221            #容器内服务映射端口
      volumes:                 #容器持久化
        - /etc/localtime:/etc/localtime         #容器内服务映射路径
      restart: always          #重启容器直接重启服务
```
k8s yaml文件创建和删除

```bash
kubectl apply -f cs.yml
kubectl delete -f cs.yml
```

