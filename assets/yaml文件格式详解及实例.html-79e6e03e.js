import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as t,a as n,b as s,d as a,e as o}from"./app-bccf5941.js";const m={},d=n("p",null,[s("🍁"),n("strong",null,"博主简介")],-1),r={href:"https://blog.csdn.net/liu_chen_yang?type=blog",target:"_blank",rel:"noopener noreferrer"},p=n("br",null,null,-1),v={href:"https://bbs.huaweicloud.com/community/myblog",target:"_blank",rel:"noopener noreferrer"},u=n("br",null,null,-1),b={href:"https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz",target:"_blank",rel:"noopener noreferrer"},k=n("br",null,null,-1),h=n("strong",null,"交流社区：",-1),g={href:"https://bbs.csdn.net/forums/lcy",target:"_blank",rel:"noopener noreferrer"},y=o(`<h2 id="yaml简介" tabindex="-1"><a class="header-anchor" href="#yaml简介" aria-hidden="true">#</a> yaml简介</h2><p>yaml 是专门用来写配置文件的语言，后缀名可以是.yaml或.yml都可以。</p><blockquote><p>yaml文件一般用于写dockerfile或k8s中的pod yml。</p></blockquote><h2 id="yaml语法规则【重要】" tabindex="-1"><a class="header-anchor" href="#yaml语法规则【重要】" aria-hidden="true">#</a> yaml语法规则【重要】</h2><ul><li>大小写敏感</li><li>使用缩进表示层级关系（不能用Tab，只能用空格）</li><li>相同层级的元素左对齐</li><li>#号表示单行注释</li><li>字符串可以不用引号标注</li><li>数组（列表）是使用 - 开头的清单形式，- 后面必须加空格</li><li>表示对象的 : 和表示数组（列表）的 - 后面都必须要有空格。可以使用 - 回车- 回车-回车 在一个文件里分隔多个 YAML 对象</li></ul><h2 id="yaml语法实例" tabindex="-1"><a class="header-anchor" href="#yaml语法实例" aria-hidden="true">#</a> Yaml语法实例</h2><h3 id="数组-列表-实例-短横线加空格" tabindex="-1"><a class="header-anchor" href="#数组-列表-实例-短横线加空格" aria-hidden="true">#</a> 数组（列表）实例； 短横线加空格（- ）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  - linux
  - name
  - windows
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="yaml-对象-字典-实例-用冒号加空格连接键和值" tabindex="-1"><a class="header-anchor" href="#yaml-对象-字典-实例-用冒号加空格连接键和值" aria-hidden="true">#</a> Yaml 对象（字典）实例；用冒号加空格连接键和值（: ）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  Kubernetes: 
    linux: <span class="token function">vim</span>
    name: 张三
    windows: steam
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="yaml-数组-对象结合-列表中的字典-实例-短横线加空格-用冒号加空格连接键和值" tabindex="-1"><a class="header-anchor" href="#yaml-数组-对象结合-列表中的字典-实例-短横线加空格-用冒号加空格连接键和值" aria-hidden="true">#</a> Yaml 数组 对象结合（列表中的字典）实例；短横线加空格（- ），用冒号加空格连接键和值（: ）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>containers: 
- image: mysql5.7.38
  name: mysql
  restart: always
  ports: 
    - <span class="token number">6379</span>:6379
  volumes: 
    - /etc/localtime:/etc/localtime
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="yaml格式说明与实例" tabindex="-1"><a class="header-anchor" href="#yaml格式说明与实例" aria-hidden="true">#</a> Yaml格式说明与实例</h2><h3 id="格式说明" tabindex="-1"><a class="header-anchor" href="#格式说明" aria-hidden="true">#</a> 格式说明</h3><p>pod.yaml</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># yaml格式的pod定义文件完整内容展示：</span>
apiVersion: v1       <span class="token comment">#必选，版本号，例如v1</span>
kind: Pod            <span class="token comment">#必选，Pod</span>
metadata:            <span class="token comment">#必选，元数据</span>
  name: string       <span class="token comment">#必选，Pod名称</span>
  namespace: string  <span class="token comment">#必选，Pod所属的命名空间</span>
  labels:            <span class="token comment">#必选，自定义标签</span>
    app: string   	 <span class="token comment">#必选，自定义标签名字</span>
  annotations:       <span class="token comment">#自定义注释列表</span>
    - name: string
spec:                <span class="token comment">#必选，Pod中容器的详细定义</span>
  restartPolicy: <span class="token punctuation">[</span>Always <span class="token operator">|</span> Never <span class="token operator">|</span> OnFailure<span class="token punctuation">]</span>	<span class="token comment">#Pod的重启策略，Always表示一旦不管以何种方式终止运行，kubelet都将重启，OnFailure表示只有Pod以非0退出码退出</span>
  hostNetwork: <span class="token boolean">true</span>  <span class="token comment">#是否使用主机网络模式，默认为false，如果设置为true，表示使用宿主机网络；如何使用host网络模式则不需要在使用下面的ports参数了。</span>
  containers:        <span class="token comment">#必选，Pod中容器列表</span>
  - name: string     <span class="token comment">#必选，容器名称</span>
    image: test:latest    <span class="token comment">#必选，容器的镜像名称</span>
    imagePullPolicy: <span class="token punctuation">[</span>Always <span class="token operator">|</span> Never <span class="token operator">|</span> IfNotPresent<span class="token punctuation">]</span>    <span class="token comment">#获取镜像的策略 Alawys表示下载镜像 IfnotPresent表示优先使用本地镜像，否则下载镜像，Nerver表示仅使用本地镜像</span>
    command: <span class="token punctuation">[</span>string<span class="token punctuation">]</span>    <span class="token comment">#必选，容器的启动命令列表，如不指定，使用打包时使用的启动命令,如需要在容器内启动就指定个top之类的持续输出。</span>
    stdin: <span class="token boolean">true</span>			 <span class="token comment">#需要交互式进入容器必选，设置为 true 允许你能够向容器发送输入，相当于docker中的-i。</span>
    tty: <span class="token boolean">true</span>		     <span class="token comment">#需要交互式进入容器必选，设置为 true 分配一个伪终端，相当于docker中的-t。</span>
    args: <span class="token punctuation">[</span>string<span class="token punctuation">]</span>       <span class="token comment">#容器的启动命令参数列表</span>
    workingDir: /application   <span class="token comment">#容器的工作目录</span>
    volumeMounts:        <span class="token comment">#挂载到容器pod内部的存储卷配置</span>
    - name: test-path    <span class="token comment">#引用pod定义的共享存储卷的名称，需用volumes[]部分定义的的卷名</span>
      mountPath: string  <span class="token comment">#要映射到pod内的存储路径</span>
      readOnly: boolean  <span class="token comment">#是否为只读模式</span>
  volumes:               <span class="token comment">#在该pod上定义共享存储卷列表（pod外）</span>
  - name: test-path      <span class="token comment">#共享存储卷名称，需要和volumeMounts的名称相同</span>
    hostPath: 		     <span class="token comment">#类型为hostPath的存储卷，表示挂载Pod所在宿主机的目录</span>
      path: string       <span class="token comment">#Pod所在宿主机的目录，用于挂载到pod容器内的路径</span>
      type: Directory	 <span class="token comment">#表示挂载的是一个目录。</span>
    ports:               	<span class="token comment">#需要暴露的端口库号列表，如果开启了hostNetwork就不需要写这个了。</span>
    - name: test-port    	<span class="token comment">#端口号名称，自己定义就行</span>
      containerPort: <span class="token number">8080</span>	<span class="token comment">#容器需要监听的端口号</span>
      hostPort: <span class="token number">8080</span>      	<span class="token comment">#容器所在主机需要监听的端口号，默认与Container相同</span>
      protocol: TCP   	<span class="token comment">#端口协议，支持TCP和UDP，默认TCP</span>

----------------------------------上半部分yml文件基本配置，基本都会用到---------------------------------------------------

    env:                 <span class="token comment">#容器运行前需设置的环境变量列表</span>
    - name: string       <span class="token comment">#环境变量名称</span>
      value: string      <span class="token comment">#环境变量的值</span>
    resources:           <span class="token comment">#资源限制和请求的设置</span>
      limits:            <span class="token comment">#资源限制的设置</span>
        cpu: string      <span class="token comment">#Cpu的限制，单位为core数，将用于docker run --cpu-shares参数</span>
        memory: string   <span class="token comment">#内存限制，单位可以为Mib/Gib，将用于docker run --memory参数</span>
      requests:          <span class="token comment">#资源请求的设置</span>
        cpu: string      <span class="token comment">#Cpu请求，容器启动的初始可用数量</span>
        memory: string   <span class="token comment">#内存清楚，容器启动的初始可用数量</span>
    livenessProbe:       <span class="token comment">#对Pod内个容器健康检查的设置，当探测无响应几次后将自动重启该容器，检查方法有exec、httpGet和tcpSocket，对一个容器只需设置其中一种</span>
      exec:              <span class="token comment">#对Pod容器内检查方式设置为exec方式</span>
        command: <span class="token punctuation">[</span>string<span class="token punctuation">]</span>  <span class="token comment">#exec方式需要制定的命令或脚本</span>
      httpGet:           <span class="token comment">#对Pod内个容器健康检查方法设置为HttpGet，需要制定Path、port</span>
        path: string
        port: number
        host: string
        scheme: string
        HttpHeaders:
        - name: string
          value: string
      tcpSocket:         <span class="token comment">#对Pod内个容器健康检查方式设置为tcpSocket方式</span>
         port: number
       initialDelaySeconds: <span class="token number">0</span>   <span class="token comment">#容器启动完成后首次探测的时间，单位为秒</span>
       timeoutSeconds: <span class="token number">0</span>        <span class="token comment">#对容器健康检查探测等待响应的超时时间，单位秒，默认1秒</span>
       periodSeconds: <span class="token number">0</span>         <span class="token comment">#对容器监控检查的定期探测时间设置，单位秒，默认10秒一次</span>
       successThreshold: <span class="token number">0</span>
       failureThreshold: <span class="token number">0</span>
       securityContext:
         privileged:false
    restartPolicy: <span class="token punctuation">[</span>Always <span class="token operator">|</span> Never <span class="token operator">|</span> OnFailure<span class="token punctuation">]</span><span class="token comment">#Pod的重启策略，Always表示一旦不管以何种方式终止运行，kubelet都将重启，OnFailure表示只有Pod以非0退出码退出</span>
    nodeSelector: obeject  <span class="token comment">#设置NodeSelector表示将该Pod调度到包含这个label的node上，以key：value的格式指定将该Pod调度到包含这个label的node上，以key：value的格式指定</span>
    imagePullSecrets:      <span class="token comment">#Pull镜像时使用的secret名称，以key：secretkey格式指定</span>
    - name: string
  hostNetwork: <span class="token boolean">false</span>      <span class="token comment">#是否使用主机网络模式，默认为false，如果设置为true，表示使用宿主机网络</span>
    volumes:               <span class="token comment">#在该pod上定义共享存储卷列表</span>
    - name: string         <span class="token comment">#共享存储卷名称（volumes类型有很多种）</span>
      emptyDir: <span class="token punctuation">{</span><span class="token punctuation">}</span>         <span class="token comment">#类型为emtyDir的存储卷，与Pod同生命周期的一个临时目录。为空值</span>
      hostPath: 		   <span class="token comment">#类型为hostPath的存储卷，表示挂载Pod所在宿主机的目录</span>
        path: string       <span class="token comment">#Pod所在宿主机的目录，将被用于同期中mount的目录</span>
      secret:              <span class="token comment">#类型为secret的存储卷，挂载集群与定义的secre对象到容器内部</span>
        scretname: string  
        items:     
        - key: string
          path: string
      configMap:           <span class="token comment">#类型为configMap的存储卷，挂载预定义的configMap对象到容器内部</span>
        name: string
        items:
        - key: string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>deployment.yaml</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: extensions/v1beta1   <span class="token comment">#接口版本</span>
kind: Deployment                 <span class="token comment">#接口类型</span>
metadata:
  name: cango-demo               <span class="token comment">#Deployment名称</span>
  namespace: cango-prd           <span class="token comment">#命名空间</span>
  labels:
    app: cango-demo              <span class="token comment">#标签</span>
spec:
  replicas: <span class="token number">3</span>
  strategy:
    rollingUpdate:          <span class="token comment">#由于replicas为3,则整个升级,pod个数在2-4个之间</span>
      maxSurge: <span class="token number">1</span>           <span class="token comment">#滚动升级时会先启动1个pod</span>
      maxUnavailable: <span class="token number">1</span>     <span class="token comment">#滚动升级时允许的最大Unavailable的pod个数</span>
  template:         
    metadata:
      labels:
        app: cango-demo     <span class="token comment">#模板名称必填</span>
    sepc:                   <span class="token comment">#定义容器模板，该模板可以包含多个容器</span>
      containers:                                                                   
        - name: cango-demo                                                              <span class="token comment">#镜像名称</span>
          image: swr.cn-east-2.myhuaweicloud.com/cango-prd/cango-demo:0.0.1-SNAPSHOT    <span class="token comment">#镜像地址</span>
          command: <span class="token punctuation">[</span> <span class="token string">&quot;/bin/sh&quot;</span>,<span class="token string">&quot;-c&quot;</span>,<span class="token string">&quot;cat /etc/config/path/to/special-key&quot;</span> <span class="token punctuation">]</span>             <span class="token comment">#启动命令</span>
          args:                                                                         <span class="token comment">#启动参数</span>
            - <span class="token string">&#39;-storage.local.retention=$(STORAGE_RETENTION)&#39;</span>
            - <span class="token string">&#39;-storage.local.memory-chunks=$(STORAGE_MEMORY_CHUNKS)&#39;</span>
            - <span class="token string">&#39;-config.file=/etc/prometheus/prometheus.yml&#39;</span>
            - <span class="token string">&#39;-alertmanager.url=http://alertmanager:9093/alertmanager&#39;</span>
            - <span class="token string">&#39;-web.external-url=$(EXTERNAL_URL)&#39;</span>
<span class="token comment">#如果command和args均没有写，那么用Docker默认的配置。</span>
<span class="token comment">#如果command写了，但args没有写，那么Docker默认的配置会被忽略而且仅仅执行.yaml文件的command（不带任何参数的）。</span>
<span class="token comment">#如果command没写，但args写了，那么Docker默认配置的ENTRYPOINT的命令行会被执行，但是调用的参数是.yaml中的args。</span>
<span class="token comment">#如果如果command和args都写了，那么Docker默认的配置被忽略，使用.yaml的配置。</span>
          imagePullPolicy: IfNotPresent  <span class="token comment">#如果不存在则拉取</span>
          livenessProbe:       <span class="token comment">#表示container是否处于live状态。如果LivenessProbe失败，LivenessProbe将会通知kubelet对应的container不健康了。随后kubelet将kill掉</span>
            httpGet:
              path: /health    <span class="token comment">#如果没有心跳检测接口就为/</span>
              port: <span class="token number">8080</span>
              scheme: HTTP
            initialDelaySeconds: <span class="token number">60</span> <span class="token comment">#启动后延时多久开始运行检测</span>
            timeoutSeconds: <span class="token number">5</span>
            successThreshold: <span class="token number">1</span>
            failureThreshold: <span class="token number">5</span>
          readinessProbe:
            httpGet:
              path: /health     <span class="token comment">#如果没有心跳检测接口就为/</span>
              port: <span class="token number">8080</span>
              scheme: HTTP
            initialDelaySeconds: <span class="token number">30</span> <span class="token comment">##启动后延时多久开始运行检测</span>
            timeoutSeconds: <span class="token number">5</span>
            successThreshold: <span class="token number">1</span>
            failureThreshold: <span class="token number">5</span>
          resources:              <span class="token comment">##CPU内存限制</span>
            requests:
              cpu: <span class="token number">2</span>
              memory: 2048Mi
            limits:
              cpu: <span class="token number">2</span>
              memory: 2048Mi
          env:                    <span class="token comment">##通过环境变量的方式，直接传递pod=自定义Linux OS环境变量</span>
            - name: LOCAL_KEY     <span class="token comment">#本地Key</span>
              value: value
            - name: CONFIG_MAP_KEY  <span class="token comment">#局策略可使用configMap的配置Key，</span>
              valueFrom:
                configMapKeyRef:
                  name: special-config   <span class="token comment">#configmap中找到name为special-config</span>
                  key: special.type      <span class="token comment">#找到name为special-config里data下的key</span>
          ports:
            - name: http
              containerPort: <span class="token number">8080</span>   <span class="token comment">#对service暴露端口</span>
          volumeMounts:             <span class="token comment">#挂载volumes中定义的磁盘</span>
          - name: log-cache
            mount: /tmp/log
          - name: sdb               <span class="token comment">#普通用法，该卷跟随容器销毁，挂载一个目录</span>
            mountPath: /data/media    
          - name: nfs-client-root    <span class="token comment">#直接挂载硬方法，如挂载下面的nfs目录到/mnt/nfs</span>
            mountPath: /mnt/nfs
          - name: example-volume-config  <span class="token comment">#高级用法第1种，将ConfigMap的log-script,backup-script分别挂载到/etc/config目录下的一个相对路径path/to/...下</span>
            mountPath: /etc/config       
          - name: rbd-pvc                <span class="token comment">#高级用法第2种，挂载PVC(PresistentVolumeClaim)</span>
<span class="token comment">#使用volume将ConfigMap作为文件或目录直接挂载，其中每一个key-value键值对都会生成一个文件，key为文件名，value为内容</span>
  volumes:  <span class="token comment"># 定义磁盘给上面volumeMounts挂载</span>
  - name: log-cache
    emptyDir: <span class="token punctuation">{</span><span class="token punctuation">}</span>
  - name: sdb  <span class="token comment">#挂载宿主机上面的目录</span>
    hostPath:
      path: /any/path/it/will/be/replaced
  - name: example-volume-config  <span class="token comment"># 供ConfigMap文件内容到指定路径使用</span>
    configMap:
      name: example-volume-config  <span class="token comment">#ConfigMap中名称</span>
      items:
      - key: log-script           <span class="token comment">#ConfigMap中的Key</span>
        path: path/to/log-script  <span class="token comment">#指定目录下的一个相对路径path/to/log-script</span>
      - key: backup-script        <span class="token comment">#ConfigMap中的Key</span>
        path: path/to/backup-script  <span class="token comment">#指定目录下的一个相对路径path/to/backup-script</span>
  - name: nfs-client-root         <span class="token comment">#供挂载NFS存储类型</span>
    nfs:
      server: <span class="token number">10.42</span>.0.55          <span class="token comment">#NFS服务器地址</span>
      path: /opt/public           <span class="token comment">#showmount -e 看一下路径</span>
  - name: rbd-pvc                 <span class="token comment">#挂载PVC磁盘</span>
    persistentVolumeClaim:
      claimName: rbd-pvc1         <span class="token comment">#挂载已经申请的pvc磁盘</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>services.yaml</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: v1
kind: Service
matadata:                                <span class="token comment">#元数据</span>
  name: string                           <span class="token comment">#service的名称</span>
  namespace: string                      <span class="token comment">#命名空间</span>
  labels:                                <span class="token comment">#自定义标签属性列表</span>
    - name: string
  annotations:                           <span class="token comment">#自定义注解属性列表</span>
    - name: string
spec:                                    <span class="token comment">#详细描述</span>
  selector: <span class="token punctuation">[</span><span class="token punctuation">]</span>                           <span class="token comment">#label selector配置，将选择具有label标签的Pod作为管理</span>
                                         <span class="token comment">#范围</span>
  type: string                           <span class="token comment">#service的类型，指定service的访问方式，默认为</span>
                                         <span class="token comment">#clusterIp</span>
  clusterIP: string                      <span class="token comment">#虚拟服务地址</span>
  sessionAffinity: string                <span class="token comment">#是否支持session</span>
  ports:                                 <span class="token comment">#service需要暴露的端?列表</span>
  - name: string                         <span class="token comment">#端口名称</span>
    protocol: string                     <span class="token comment">#端口协议，支持TCP和UDP，默认TCP</span>
    port: int                            <span class="token comment">#服务监听的端口号</span>
    targetPort: int                      <span class="token comment">#需要转发到后端Pod的端口号</span>
    nodePort: int                        <span class="token comment">#当type = NodePort时，指定映射到物理机的端口号</span>
  status:                                <span class="token comment">#当spce.type=LoadBalancer时，设置外部负载均衡器的地址</span>
    loadBalancer:                        <span class="token comment">#外部负载均衡器</span>
      ingress:                           <span class="token comment">#外部负载均衡器</span>
        ip: string                       <span class="token comment">#外部负载均衡器的Ip地址值</span>
        hostname: string                 <span class="token comment">#外部负载均衡器的主机名</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>job.yaml</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: batch/v1
kind: Job
metadata:
  name: job-demo
spec:
  template:
    metadata:
      name: job-demo
    spec:
      restartPolicy: Never  <span class="token comment">#Job的RestartPolicy仅支持Never和OnFailure两种，不支持Always，我们知道Job就相当于来执行一个批处理任务，执行完就结束了</span>
      containers:
      - name: counter
        image: busybox
        command:
        - <span class="token string">&quot;bin/sh&quot;</span>
        - <span class="token string">&quot;-c&quot;</span>
        - &quot;for <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token number">9</span> <span class="token number">8</span> <span class="token number">7</span> <span class="token number">6</span> <span class="token number">5</span> <span class="token number">4</span> <span class="token number">3</span> <span class="token number">2</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token variable">$i</span><span class="token punctuation">;</span> <span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Cronjob.yaml</p><blockquote><p>CronJob其实就是在Job的基础上加上了时间调度，我们可以：在给定的时间点运行一个任务，也可以周期性地在给定时间点运行。这个实际上和我们Linux中的crontab就非常类似了。一个CronJob对象其实就对应中crontab文件中的任务，它根据配置的时间格式周期性地运行一个Job，格式和crontab也是一样的。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#crontab的格式如下：</span>
<span class="token comment">#分时日月周要运行的命令第1列分钟0～59 第2列时0～23）第3列日1～31 第4列月1～12 第5列周0～7（0和7表示星期天）第6列要运行的命令</span>
apiVersion: batch/v2alpha1
kind: CronJob
metadata:
  name: cronjob-demo
spec:
  schedule: <span class="token string">&quot;*/1 * * * *&quot;</span>
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
          - name: hello
            image: busybox
            args:
            - <span class="token string">&quot;bin/sh&quot;</span>
            - <span class="token string">&quot;-c&quot;</span>
            - <span class="token string">&quot;for i in 9 8 7 6 5 4 3 2 1; do echo <span class="token variable">$i</span>; done&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>我们这里的Kind是CronJob了，要注意的是.spec.schedule字段是必须填写的，用来指定任务运行的周期，格式就和crontab一样，另外一个字段是.spec.jobTemplate, 用来指定需要运行的任务，格式当然和Job是一致的。还有一些值得我们关注的字段.spec.successfulJobsHistoryLimit和.spec.failedJobsHistoryLimit，表示历史限制，是可选的字段。它们指定了可以保留多少完成和失败的Job，默认没有限制，所有成功和失败的Job都会被保留。然后，当运行一个Cron Job时，Job可以很快就堆积很多，所以一般推荐设置这两个字段的值。如果设置限制的值为 0，那么相关类型的Job完成后将不会被保留。</p></blockquote><h3 id="实例" tabindex="-1"><a class="header-anchor" href="#实例" aria-hidden="true">#</a> 实例</h3><p>cs.yaml</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: v1  <span class="token comment">#API版本号，用于迭代我们的更新版本</span>
kind: Pod       <span class="token comment">#资源对象的类型，有pod，Node，Job，Service</span>
metadata:       <span class="token comment">#资源元数据，标记对象，方便管理</span>
  name: hll-pod <span class="token comment">#给pod起名称</span>
  labels:       <span class="token comment">#给pod打标签，方便找</span>
    env: demo   <span class="token comment">#注入容器内的环境变量</span>
    owner: feifei
spec:           <span class="token comment">#资源规格，pod内容器相关信息</span>
  replicas: <span class="token number">1</span>   <span class="token comment">#副本数量</span>
  selector:     <span class="token comment">#标签选择器</span>
    matchLabels:
      app: web

  template:     <span class="token comment">#pod模板</span>
    metadata:   <span class="token comment">#pod元数据</span>
      labels:   <span class="token comment">#给pod打标签，方便找</span>
        app: web
  spec:         <span class="token comment">#pod规格</span>
    containers:   <span class="token comment">#容器配置</span>
    - image: nll:v1    <span class="token comment">#运行容器镜像</span>
      name: nll              <span class="token comment">#容器名称</span>
      ports:                 <span class="token comment">#端口号</span>
        - containerPort: <span class="token number">80</span>    <span class="token comment">#容器端口号</span>
        - <span class="token number">8090</span>:8221            <span class="token comment">#容器内服务映射端口</span>
      volumes:                 <span class="token comment">#容器持久化</span>
        - /etc/localtime:/etc/localtime         <span class="token comment">#容器内服务映射路径</span>
      restart: always          <span class="token comment">#重启容器直接重启服务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>k8s yaml文件创建和删除</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> cs.yml
kubectl delete <span class="token parameter variable">-f</span> cs.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,31);function f(P,_){const e=l("ExternalLinkIcon");return c(),t("div",null,[n("blockquote",null,[d,n("p",null,[s("  🏅"),n("a",r,[s("云计算领域优质创作者"),a(e)]),p,s("   🏅"),n("a",v,[s("华为云开发者社区专家博主"),a(e)]),u,s("   🏅"),n("a",b,[s("阿里云开发者社区专家博主"),a(e)]),k,s(" 💊"),h,n("a",g,[s("运维交流社区"),a(e)]),s(" 欢迎大家的加入！")])]),y])}const C=i(m,[["render",f],["__file","yaml文件格式详解及实例.html.vue"]]);export{C as default};
