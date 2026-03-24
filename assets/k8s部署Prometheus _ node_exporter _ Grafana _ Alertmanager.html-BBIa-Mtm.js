import{_ as n,c as a,d as l,o as e}from"./app-DtK0VCbJ.js";const p={};function i(o,s){return e(),a("div",null,[...s[0]||(s[0]=[l(`<blockquote><p>👨‍🎓<strong>博主简介</strong></p><p>  🏅<a href="https://blog.csdn.net/liu_chen_yang?type=blog" target="_blank" rel="noopener noreferrer">CSDN博客专家</a><br>   🏅<a href="https://blog.csdn.net/liu_chen_yang?type=blog" target="_blank" rel="noopener noreferrer">云计算领域优质创作者</a><br>   🏅<a href="https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234" target="_blank" rel="noopener noreferrer">华为云开发者社区专家博主</a><br>   🏅<a href="https://developer.aliyun.com/profile/7yu26jk3lfqxg" target="_blank" rel="noopener noreferrer">阿里云开发者社区专家博主</a><br> 💊<strong>交流社区：</strong><a href="https://bbs.csdn.net/forums/lcy" target="_blank" rel="noopener noreferrer">运维交流社区</a> 欢迎大家的加入！<br> 🐋 希望大家多多支持，我们一起进步！😄<br> 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗</p></blockquote><hr><h2 id="一、前言" tabindex="-1"><a class="header-anchor" href="#一、前言"><span>一、前言</span></a></h2><p>需提前搭建好<code>Kubernetes</code>集群，可参考如下文章：</p><table><thead><tr><th>文章标题</th><th>文章链接</th></tr></thead><tbody><tr><td>K8s单机架构部署</td><td><a href="https://liucy.blog.csdn.net/article/details/120742911" target="_blank" rel="noopener noreferrer">https://liucy.blog.csdn.net/article/details/120742911</a></td></tr><tr><td>K8S 二进制集群搭建（一主两从）</td><td><a href="https://liucy.blog.csdn.net/article/details/151709127" target="_blank" rel="noopener noreferrer">https://liucy.blog.csdn.net/article/details/151709127</a></td></tr><tr><td>kubeadm搭建k8s高可用集群(三主两从一VIP)</td><td><a href="https://liucy.blog.csdn.net/article/details/131101217" target="_blank" rel="noopener noreferrer">https://liucy.blog.csdn.net/article/details/131101217</a></td></tr></tbody></table><ul><li>部署服务、版本、端口</li></ul><table><thead><tr><th>服务名称</th><th>版本号</th><th>开放端口</th><th>网络模式</th></tr></thead><tbody><tr><td>Prometheus</td><td>v3.7.3</td><td>9090 --&gt; 30090</td><td>NodePort</td></tr><tr><td>node_exporter</td><td>v1.10.2</td><td>9100</td><td>hostNetwork: true</td></tr><tr><td>Grafana</td><td>12.3.0</td><td>3000 --&gt; 30000</td><td>NodePort</td></tr><tr><td>Alertmanager</td><td>v0.30.0</td><td>9093</td><td>ClusterIP</td></tr><tr><td>kube-state-metrics</td><td>2.3.0</td><td>8080 --&gt; 30080</td><td>NodePort</td></tr><tr><td>cAdvisor</td><td>latest</td><td>8080</td><td>ClusterIP</td></tr></tbody></table><ul><li>需要提前创建好部署监控的命名空间（namespace）</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> create</span><span style="color:#98C379;"> namespace</span><span style="color:#98C379;"> monitoring</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="二、部署prometheus" tabindex="-1"><a class="header-anchor" href="#二、部署prometheus"><span>二、部署Prometheus</span></a></h2><h3 id="_2-1-配置prometheus配置文件-configmap" tabindex="-1"><a class="header-anchor" href="#_2-1-配置prometheus配置文件-configmap"><span>2.1 配置Prometheus配置文件 - ConfigMap</span></a></h3><ul><li><code>vi prometheus-config.yaml </code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">ConfigMap</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  labels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus-configmap</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">monitoring</span></span>
<span class="line"><span style="color:#E06C75;">  annotations</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    argocd.argoproj.io/sync-wave</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;-1&quot;</span></span>
<span class="line"><span style="color:#E06C75;">data</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  prometheus.yml</span><span style="color:#ABB2BF;">: </span><span style="color:#C678DD;">|</span></span>
<span class="line"><span style="color:#98C379;">    # 全局配置</span></span>
<span class="line"><span style="color:#98C379;">    global:</span></span>
<span class="line"><span style="color:#98C379;">      scrape_interval: 15s			# 将抓取间隔设置为每15秒一次。默认是每分钟一次。</span></span>
<span class="line"><span style="color:#98C379;">      evaluation_interval: 15s		# 每15秒评估一次规则。默认为每1分钟一次。</span></span>
<span class="line"><span style="color:#98C379;">      scrape_timeout: 10s			# scrape_timeout设置为全局默认值(10秒)</span></span>
<span class="line"><span style="color:#98C379;">    # 告警信息配置</span></span>
<span class="line"><span style="color:#98C379;">    alerting:</span></span>
<span class="line"><span style="color:#98C379;">      alertmanagers:</span></span>
<span class="line"><span style="color:#98C379;">        - static_configs:</span></span>
<span class="line"><span style="color:#98C379;">            - targets: [&#39;localhost:9093&#39;]</span></span>
<span class="line"><span style="color:#98C379;">    # 告警规则路径</span></span>
<span class="line"><span style="color:#98C379;">    rule_files:</span></span>
<span class="line"><span style="color:#98C379;">       - &quot;/etc/prometheus/rules/*_rules.yml&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">    # 抓取配置</span></span>
<span class="line"><span style="color:#98C379;">    scrape_configs:</span></span>
<span class="line"><span style="color:#98C379;">    # 1. 监控 Prometheus 自身</span></span>
<span class="line"><span style="color:#98C379;">    - job_name: &#39;prometheus&#39;</span></span>
<span class="line"><span style="color:#98C379;">      static_configs:</span></span>
<span class="line"><span style="color:#98C379;">      - targets: [&#39;localhost:9090&#39;]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-配置rbac权限认证" tabindex="-1"><a class="header-anchor" href="#_2-2-配置rbac权限认证"><span>2.2 配置RBAC权限认证</span></a></h3><blockquote><p>由于Prometheus需要访问<code>Kubernetes API</code>资源，需要配置相应的<code>RBAC</code>权限。创建<code>prometheus-rbac.yaml</code>；</p></blockquote><ul><li><code>vi prometheus-rbac.yaml</code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">ServiceAccount</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">monitoring</span></span>
<span class="line"><span style="color:#ABB2BF;">---</span></span>
<span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">ClusterRole</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus</span></span>
<span class="line"><span style="color:#E06C75;">rules</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">- </span><span style="color:#E06C75;">apiGroups</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&quot;&quot;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#E06C75;">  resources</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#98C379;">nodes</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#98C379;">nodes/proxy</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#98C379;">services</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#98C379;">endpoints</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#98C379;">pods</span></span>
<span class="line"><span style="color:#E06C75;">  verbs</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&quot;get&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;list&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;watch&quot;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#ABB2BF;">- </span><span style="color:#E06C75;">apiGroups</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#98C379;">extensions</span></span>
<span class="line"><span style="color:#E06C75;">  resources</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#98C379;">ingresses</span></span>
<span class="line"><span style="color:#E06C75;">  verbs</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&quot;get&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;list&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;watch&quot;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#ABB2BF;">- </span><span style="color:#E06C75;">apiGroups</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#98C379;">networking.k8s.io</span></span>
<span class="line"><span style="color:#E06C75;">  resources</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#98C379;">ingresses</span></span>
<span class="line"><span style="color:#E06C75;">  verbs</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&quot;get&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;list&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;watch&quot;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#ABB2BF;">- </span><span style="color:#E06C75;">apiGroups</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&quot;&quot;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#E06C75;">  resources</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#98C379;">configmaps</span></span>
<span class="line"><span style="color:#E06C75;">  verbs</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&quot;get&quot;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#ABB2BF;">- </span><span style="color:#E06C75;">nonResourceURLs</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&quot;/metrics&quot;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#E06C75;">  verbs</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&quot;get&quot;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#ABB2BF;">---</span></span>
<span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">ClusterRoleBinding</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus</span></span>
<span class="line"><span style="color:#E06C75;">roleRef</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  apiGroup</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#E06C75;">  kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">ClusterRole</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus</span></span>
<span class="line"><span style="color:#E06C75;">subjects</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">- </span><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">ServiceAccount</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">monitoring</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-配置prometheus部署yaml-deployment" tabindex="-1"><a class="header-anchor" href="#_2-3-配置prometheus部署yaml-deployment"><span>2.3 配置Prometheus部署yaml - Deployment</span></a></h3><ul><li><code>vi prometheus-deploy.yaml </code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">apps/v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Deployment</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">monitoring</span></span>
<span class="line"><span style="color:#E06C75;">  labels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus</span></span>
<span class="line"><span style="color:#E06C75;">spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  replicas</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">1</span></span>
<span class="line"><span style="color:#E06C75;">  selector</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    matchLabels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus</span></span>
<span class="line"><span style="color:#E06C75;">  template</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      labels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">        app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus</span></span>
<span class="line"><span style="color:#E06C75;">    spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      serviceAccountName</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus</span></span>
<span class="line"><span style="color:#E06C75;">      containers</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus</span></span>
<span class="line"><span style="color:#E06C75;">        image</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prom/prometheus:v3.7.3</span></span>
<span class="line"><span style="color:#E06C75;">        args</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">&#39;--config.file=/etc/prometheus/prometheus.yml&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">&#39;--storage.tsdb.path=/prometheus/data/&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">&#39;--storage.tsdb.retention.time=15d&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">&#39;--storage.tsdb.retention.size=10GB&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">&#39;--web.console.libraries=/etc/prometheus/console_libraries&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">&#39;--web.console.templates=/etc/prometheus/consoles&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">&#39;--web.enable-lifecycle&#39;</span></span>
<span class="line"><span style="color:#E06C75;">        ports</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">containerPort</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">9090</span></span>
<span class="line"><span style="color:#E06C75;">          name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">http</span></span>
<span class="line"><span style="color:#E06C75;">        volumeMounts</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus-config</span></span>
<span class="line"><span style="color:#E06C75;">          mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/etc/prometheus</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus-storage</span></span>
<span class="line"><span style="color:#E06C75;">          mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/prometheus/data</span></span>
<span class="line"><span style="color:#E06C75;">        livenessProbe</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          httpGet</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            path</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/-/healthy</span></span>
<span class="line"><span style="color:#E06C75;">            port</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">9090</span></span>
<span class="line"><span style="color:#E06C75;">          initialDelaySeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">30</span></span>
<span class="line"><span style="color:#E06C75;">          timeoutSeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">30</span></span>
<span class="line"><span style="color:#E06C75;">        readinessProbe</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          httpGet</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            path</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/-/ready</span></span>
<span class="line"><span style="color:#E06C75;">            port</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">9090</span></span>
<span class="line"><span style="color:#E06C75;">          initialDelaySeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">30</span></span>
<span class="line"><span style="color:#E06C75;">          timeoutSeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">30</span></span>
<span class="line"><span style="color:#E06C75;">      volumes</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus-config</span></span>
<span class="line"><span style="color:#E06C75;">        configMap</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus-configmap</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus-storage</span></span>
<span class="line"><span style="color:#E06C75;">        emptyDir</span><span style="color:#ABB2BF;">: {}</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">      # 如需持久化存储（生产建议），使用以下配置替换 emptyDir：{}</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">      # persistentVolumeClaim:</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">      #   claimName: prometheus-pvc</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-配置prometheus对外端口-service" tabindex="-1"><a class="header-anchor" href="#_2-4-配置prometheus对外端口-service"><span>2.4 配置Prometheus对外端口 - Service</span></a></h3><ul><li><code>vi prometheus-svc.yaml </code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Service</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">monitoring</span></span>
<span class="line"><span style="color:#E06C75;">  labels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus</span></span>
<span class="line"><span style="color:#E06C75;">spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  type</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">NodePort</span></span>
<span class="line"><span style="color:#E06C75;">  ports</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">    - </span><span style="color:#E06C75;">port</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">9090</span></span>
<span class="line"><span style="color:#E06C75;">      targetPort</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">9090</span></span>
<span class="line"><span style="color:#E06C75;">      nodePort</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">30090</span></span>
<span class="line"><span style="color:#E06C75;">      protocol</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">TCP</span></span>
<span class="line"><span style="color:#E06C75;">      name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">http</span></span>
<span class="line"><span style="color:#E06C75;">  selector</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 如需clusterip可使用以下spec配置</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#spec:</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#  type: ClusterIP</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#  ports:</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#  - port: 9090</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#    targetPort: 9090</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#    protocol: TCP</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#    name: http</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#  selector:</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#    app: prometheus</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-部署-prometheus-服务" tabindex="-1"><a class="header-anchor" href="#_2-5-部署-prometheus-服务"><span>2.5 部署 Prometheus 服务</span></a></h3><blockquote><p>将如上四个yaml文件放到服务器上，依次创建启动</p></blockquote><ul><li>部署Prometheus配置文件</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 部署Prometheus配置文件</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> prometheus-config.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看Prometheus配置文件</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> configmap</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> monitoring</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202705513.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>部署Prometheus RBAC权限认证</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 部署Prometheus RBAC权限认证</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> prometheus-rbac.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看Prometheus RBAC权限认证</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> sa</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> monitoring</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> ClusterRole</span><span style="color:#ABB2BF;"> | </span><span style="color:#61AFEF;">grep</span><span style="color:#98C379;"> prometheus</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> ClusterRoleBinding</span><span style="color:#ABB2BF;"> | </span><span style="color:#61AFEF;">grep</span><span style="color:#98C379;"> prometheus</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202702175.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>部署Prometheus服务</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 部署Prometheus服务</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> prometheus-deploy.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看Prometheus服务（需Prometheus pod的状态变为1/1则为正常状态）</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> pods</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> monitoring</span><span style="color:#D19A66;"> -o</span><span style="color:#98C379;"> wide</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为第一次需要拉取镜像所以会比较慢一些，如果不放心，或较长时间还是0/1状态，可以使用<code>kubectl describe pods -n monitoring pod名称</code> 此命令查看pod的状态日志；</p><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202629122.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>部署Prometheus service，将端口暴露出来</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 部署Prometheus Service</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> prometheus-svc.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看Prometheus Service</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> svc</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> monitoring</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202625583.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-6-页面访问验证" tabindex="-1"><a class="header-anchor" href="#_2-6-页面访问验证"><span>2.6 页面访问验证</span></a></h3><p>页面访问Prometheus web服务：<code>node ip:30090</code>，<code>node ip</code>任意节点ip就行；</p><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202623150.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>能出来页面和如图结果就没问题；</p><h2 id="三、部署node-exporter" tabindex="-1"><a class="header-anchor" href="#三、部署node-exporter"><span>三、部署node_exporter</span></a></h2><blockquote><p>使用<code>DaemonSet</code>方式部署<code>node_exporter</code>服务，因为每个节点都需要部署一个<code>node_exporter</code>服务，来提供数据抓取，所以可以采用Daemonset的方式部署；</p></blockquote><h3 id="_3-1-配置node-exporter部署yaml-daemonset" tabindex="-1"><a class="header-anchor" href="#_3-1-配置node-exporter部署yaml-daemonset"><span>3.1 配置node-exporter部署yaml - DaemonSet</span></a></h3><ul><li><code>vi node-export.yaml </code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">apps/v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">DaemonSet</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">node-exporter</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">monitoring</span></span>
<span class="line"><span style="color:#E06C75;">  labels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">node-exporter</span></span>
<span class="line"><span style="color:#E06C75;">spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  selector</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    matchLabels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">     name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">node-exporter</span></span>
<span class="line"><span style="color:#E06C75;">  template</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      labels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">        name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">node-exporter</span></span>
<span class="line"><span style="color:#E06C75;">    spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      hostPID</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span></span>
<span class="line"><span style="color:#E06C75;">      hostIPC</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span></span>
<span class="line"><span style="color:#E06C75;">      hostNetwork</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span></span>
<span class="line"><span style="color:#E06C75;">      tolerations</span><span style="color:#ABB2BF;">: 	</span><span style="color:#7F848E;font-style:italic;"># 添加容忍</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">key</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">node-role.kubernetes.io/master</span></span>
<span class="line"><span style="color:#E06C75;">          effect</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">NoSchedule</span></span>
<span class="line"><span style="color:#E06C75;">          operator</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Exists</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">key</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">node-role.kubernetes.io/control-plane</span></span>
<span class="line"><span style="color:#E06C75;">          effect</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">NoSchedule</span></span>
<span class="line"><span style="color:#E06C75;">          operator</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Exists</span></span>
<span class="line"><span style="color:#E06C75;">      containers</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">node-exporter</span></span>
<span class="line"><span style="color:#E06C75;">        image</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prom/node-exporter:v1.10.2</span></span>
<span class="line"><span style="color:#E06C75;">        imagePullPolicy</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">IfNotPresent</span></span>
<span class="line"><span style="color:#E06C75;">        ports</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">containerPort</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">9100</span></span>
<span class="line"><span style="color:#E06C75;">          name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">http</span></span>
<span class="line"><span style="color:#E06C75;">          protocol</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">TCP</span></span>
<span class="line"><span style="color:#E06C75;">        securityContext</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          privileged</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span></span>
<span class="line"><span style="color:#E06C75;">          runAsUser</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">0</span></span>
<span class="line"><span style="color:#E06C75;">        args</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">--collector.systemd</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">--collector.tcpstat</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">--collector.pressure</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">--collector.hwmon</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">--collector.mountstats</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">--collector.ntp</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">--path.procfs=/host/proc</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">--path.sysfs=/host/sys</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">--path.rootfs=/host/root</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">--collector.filesystem.fs-types-exclude=^(sys|proc|auto|cgroup|devpts|ns|au|fuse\\.lxc|mqueue)(fs|)$</span></span>
<span class="line"><span style="color:#E06C75;">        volumeMounts</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">proc</span></span>
<span class="line"><span style="color:#E06C75;">          mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/host/proc</span></span>
<span class="line"><span style="color:#E06C75;">          readOnly</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">sys</span></span>
<span class="line"><span style="color:#E06C75;">          mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/host/sys</span></span>
<span class="line"><span style="color:#E06C75;">          readOnly</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">root</span></span>
<span class="line"><span style="color:#E06C75;">          mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/host/root</span></span>
<span class="line"><span style="color:#E06C75;">          readOnly</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">systemd-private</span></span>
<span class="line"><span style="color:#E06C75;">          mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/run/systemd/private</span></span>
<span class="line"><span style="color:#E06C75;">          readOnly</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span></span>
<span class="line"><span style="color:#E06C75;">        resources</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          limits</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            cpu</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">250m</span></span>
<span class="line"><span style="color:#E06C75;">            memory</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">180Mi</span></span>
<span class="line"><span style="color:#E06C75;">          requests</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            cpu</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">102m</span></span>
<span class="line"><span style="color:#E06C75;">            memory</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">180Mi</span></span>
<span class="line"><span style="color:#E06C75;">      volumes</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">proc</span></span>
<span class="line"><span style="color:#E06C75;">        hostPath</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          path</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/proc</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">sys</span></span>
<span class="line"><span style="color:#E06C75;">        hostPath</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          path</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/sys</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">root</span></span>
<span class="line"><span style="color:#E06C75;">        hostPath</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          path</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">systemd-private</span></span>
<span class="line"><span style="color:#E06C75;">        hostPath</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          path</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/run/systemd/private</span></span>
<span class="line"><span style="color:#E06C75;">          type</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Socket</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-部署node-exporter服务" tabindex="-1"><a class="header-anchor" href="#_3-2-部署node-exporter服务"><span>3.2 部署node-exporter服务</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> node-export.yaml</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_3-3-验证node-exporter服务" tabindex="-1"><a class="header-anchor" href="#_3-3-验证node-exporter服务"><span>3.3 验证node-exporter服务</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 查看daemonset是否正确</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> ds</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> monitoring</span><span style="color:#D19A66;"> -o</span><span style="color:#98C379;"> wide</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看pod是否所有节点都部署了一个</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> pods</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> monitoring</span><span style="color:#D19A66;"> -o</span><span style="color:#98C379;"> wide</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以通过<code>NODE</code>看到，每个节点都部署了一套<code>node-exporter</code>服务；</p><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202613718.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_3-4-添加node-exporter到prometheus配置中抓取数据" tabindex="-1"><a class="header-anchor" href="#_3-4-添加node-exporter到prometheus配置中抓取数据"><span>3.4 添加node-exporter到Prometheus配置中抓取数据</span></a></h3><p>再Prometheus的configmap中追加此配置到<code>scrape_configs</code>中；</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#ABB2BF;">    - </span><span style="color:#E06C75;">job_name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;node-exporter&#39;</span></span>
<span class="line"><span style="color:#E06C75;">      kubernetes_sd_configs</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">role</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">node</span><span style="color:#7F848E;font-style:italic;">              # ← 自动发现所有节点</span></span>
<span class="line"><span style="color:#E06C75;">      relabel_configs</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">source_labels</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">__address__</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#E06C75;">        regex</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;(.*):10250&#39;</span><span style="color:#7F848E;font-style:italic;">     # Kubelet 端口</span></span>
<span class="line"><span style="color:#E06C75;">        replacement</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;\${1}:9100&#39;</span><span style="color:#7F848E;font-style:italic;"> # ← 改成 node-exporter 端口</span></span>
<span class="line"><span style="color:#E06C75;">        target_label</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">__address__</span></span>
<span class="line"><span style="color:#E06C75;">        action</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">replace</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">action</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">labelmap</span></span>
<span class="line"><span style="color:#E06C75;">        regex</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">__meta_kubernetes_node_label_(.+)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202609097.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_3-5-更新prometheus配置文件并热重载" tabindex="-1"><a class="header-anchor" href="#_3-5-更新prometheus配置文件并热重载"><span>3.5 更新prometheus配置文件并热重载</span></a></h3><ul><li>更新Prometheus配置文件</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> prometheus-config.yaml</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><blockquote><p>需等待一会，进行配置同步，可以使用<code>kubectl exec -it -n monitoring pod名称 -- sh</code>进入查看Prometheus配置文件，进行确认是否同步成功；</p></blockquote><ul><li>热重载Prometheus配置文件，使其生效</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">curl</span><span style="color:#D19A66;"> -X</span><span style="color:#98C379;"> POST</span><span style="color:#98C379;"> localhost:30090/-/reload</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_3-6-页面验证" tabindex="-1"><a class="header-anchor" href="#_3-6-页面验证"><span>3.6 页面验证</span></a></h3><blockquote><p>访问：<code>node ip:30090/targets</code></p></blockquote><p><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202547573.png" alt="" loading="lazy"><br><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202544674.png" alt="" loading="lazy"></p><p>可以发现三台node_exporter已经加上了，也支持<code>node</code>PromQL查询了；</p><h2 id="四、部署grafana" tabindex="-1"><a class="header-anchor" href="#四、部署grafana"><span>四、部署Grafana</span></a></h2><h3 id="_4-1-配置grafana配置文件-configmap" tabindex="-1"><a class="header-anchor" href="#_4-1-配置grafana配置文件-configmap"><span>4.1 配置Grafana配置文件 - ConfigMap</span></a></h3><ul><li><code>vi grafana-config.yaml</code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">ConfigMap</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana-configmap</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">monitoring</span></span>
<span class="line"><span style="color:#E06C75;">data</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  grafana.ini</span><span style="color:#ABB2BF;">: </span><span style="color:#C678DD;">|</span></span>
<span class="line"><span style="color:#98C379;">    # 应用模式</span></span>
<span class="line"><span style="color:#98C379;">    app_mode = production</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">    # 数据存储路径及时间配置</span></span>
<span class="line"><span style="color:#98C379;">    [paths]</span></span>
<span class="line"><span style="color:#98C379;">    # 明确指定数据路径（虽然默认就是 /var/lib/grafana，但建议显式配置）</span></span>
<span class="line"><span style="color:#98C379;">    data = /var/lib/grafana</span></span>
<span class="line"><span style="color:#98C379;">    # 超过给定持续时间的临时文件将被删除</span></span>
<span class="line"><span style="color:#98C379;">    temp_data_lifetime = 24h</span></span>
<span class="line"><span style="color:#98C379;">    logs = /var/lib/grafana/logs</span></span>
<span class="line"><span style="color:#98C379;">    plugins = /var/lib/grafana/plugins</span></span>
<span class="line"><span style="color:#98C379;">    provisioning = /etc/grafana/provisioning</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">    # 服务器基础配置</span></span>
<span class="line"><span style="color:#98C379;">    [server]</span></span>
<span class="line"><span style="color:#98C379;">    protocol = http</span></span>
<span class="line"><span style="color:#98C379;">    http_port = 3000</span></span>
<span class="line"><span style="color:#98C379;">    domain = localhost</span></span>
<span class="line"><span style="color:#98C379;">    enforce_domain = false</span></span>
<span class="line"><span style="color:#98C379;">    root_url = %(protocol)s://%(domain)s:%(http_port)s/</span></span>
<span class="line"><span style="color:#98C379;">    serve_from_sub_path = false</span></span>
<span class="line"><span style="color:#98C379;">    router_logging = false</span></span>
<span class="line"><span style="color:#98C379;">    static_root_path = public</span></span>
<span class="line"><span style="color:#98C379;">    enable_gzip = false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">    # 数据库配置：生产可切换为”mysql”、&quot;postgres”、“sqlite3”等</span></span>
<span class="line"><span style="color:#98C379;">    [database]</span></span>
<span class="line"><span style="color:#98C379;">    type = sqlite3                                                                                                                                    </span></span>
<span class="line"><span style="color:#98C379;">    host = 127.0.0.1:3306                                                                                                              </span></span>
<span class="line"><span style="color:#98C379;">    name = grafana                                                        </span></span>
<span class="line"><span style="color:#98C379;">    user = root  </span></span>
<span class="line"><span style="color:#98C379;">    # 如果密码包含 # 或 ;，您必须用三引号包裹。例如 &quot;&quot;&quot;#password;&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#98C379;">    password =</span></span>
<span class="line"><span style="color:#98C379;">    # 使用 URL 或前面的字段来配置数据库</span></span>
<span class="line"><span style="color:#98C379;">    # 示例：mysql://user:secret@host:port/database</span></span>
<span class="line"><span style="color:#98C379;">    url = </span></span>
<span class="line"><span style="color:#98C379;">    # 仅在运行单个 Grafana 实例时设置为 false。</span></span>
<span class="line"><span style="color:#98C379;">    high_availability = true</span></span>
<span class="line"><span style="color:#98C379;">    # 最大空闲连接设置，默认为 2</span></span>
<span class="line"><span style="color:#98C379;">    max_idle_conn = 2</span></span>
<span class="line"><span style="color:#98C379;">    # 最大连接设置，默认为 0（表示未设置）</span></span>
<span class="line"><span style="color:#98C379;">    max_open_conn = </span></span>
<span class="line"><span style="color:#98C379;">    # 连接最大生命周期默认为 14400（表示 14400 秒或 4 小时）</span></span>
<span class="line"><span style="color:#98C379;">    conn_max_lifetime = 14400</span></span>
<span class="line"><span style="color:#98C379;">    # 设置为 true 以记录 SQL 调用和执行时间。</span></span>
<span class="line"><span style="color:#98C379;">    log_queries =</span></span>
<span class="line"><span style="color:#98C379;">    # 对于 &quot;postgres&quot;，使用 &quot;disable&quot;、&quot;require&quot; 或 &quot;verify-full&quot;</span></span>
<span class="line"><span style="color:#98C379;">    # 对于 &quot;mysql&quot;，使用 &quot;true&quot;、&quot;false&quot; 或 &quot;skip-verify&quot;。</span></span>
<span class="line"><span style="color:#98C379;">    ssl_mode = disable</span></span>
<span class="line"><span style="color:#98C379;">    # 对于 &quot;postgres&quot;，使用 &quot;1&quot; 启用或 &quot;0&quot; 禁用 SNI</span></span>
<span class="line"><span style="color:#98C379;">    ssl_sni =</span></span>
<span class="line"><span style="color:#98C379;">    # 仅适用于 &quot;sqlite3&quot;，相对于 data_path 设置的路径</span></span>
<span class="line"><span style="color:#98C379;">    path = /var/lib/grafana/grafana.db</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">    # 安全配置</span></span>
<span class="line"><span style="color:#98C379;">    [security]</span></span>
<span class="line"><span style="color:#98C379;">    # 禁用首次启动 Grafana 时创建管理员用户</span></span>
<span class="line"><span style="color:#98C379;">    disable_initial_admin_creation = false</span></span>
<span class="line"><span style="color:#98C379;">    # 默认管理员用户，在启动时创建</span></span>
<span class="line"><span style="color:#98C379;">    admin_user = admin</span></span>
<span class="line"><span style="color:#98C379;">    # 默认管理员密码，可以在首次启动 Grafana 之前更改，或在个人资料设置中更改（生产不建议使用）</span></span>
<span class="line"><span style="color:#98C379;">    admin_password = admin123</span></span>
<span class="line"><span style="color:#98C379;">    # 默认管理员邮箱，在启动时创建</span></span>
<span class="line"><span style="color:#98C379;">    admin_email = admin@localhost</span></span>
<span class="line"><span style="color:#98C379;">    # 用于签名</span></span>
<span class="line"><span style="color:#98C379;">    secret_key = SW2YcwTIb9zpOOhoPsMm</span></span>
<span class="line"><span style="color:#98C379;">    # 当前用于信封加密的密钥提供程序，默认为 secret_key 指定的静态值</span></span>
<span class="line"><span style="color:#98C379;">    encryption_provider = secretKey.v1</span></span>
<span class="line"><span style="color:#98C379;">    # 禁用对暴力登录尝试的保护</span></span>
<span class="line"><span style="color:#98C379;">    disable_brute_force_login_protection = false</span></span>
<span class="line"><span style="color:#98C379;">    # 用户被锁定之前的最大失败登录尝试次数</span></span>
<span class="line"><span style="color:#98C379;">    brute_force_login_protection_max_attempts = 5</span></span>
<span class="line"><span style="color:#98C379;">    # 禁用按用户名对暴力登录尝试的保护</span></span>
<span class="line"><span style="color:#98C379;">    disable_username_login_protection = false</span></span>
<span class="line"><span style="color:#98C379;">    # 禁用按 IP 地址对暴力登录尝试的保护</span></span>
<span class="line"><span style="color:#98C379;">    disable_ip_address_login_protection = true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">    [auth.basic]</span></span>
<span class="line"><span style="color:#98C379;">    enabled = true</span></span>
<span class="line"><span style="color:#98C379;">    password_policy = false</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">    # 禁用匿名访问（安全）</span></span>
<span class="line"><span style="color:#98C379;">    [auth.anonymous]</span></span>
<span class="line"><span style="color:#98C379;">    enabled = false</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">    # 是否打开默认数据面板</span></span>
<span class="line"><span style="color:#98C379;">    [public_dashboards]</span></span>
<span class="line"><span style="color:#98C379;">    enabled = true</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">    [dashboards]</span></span>
<span class="line"><span style="color:#98C379;">    versions_to_keep = 20</span></span>
<span class="line"><span style="color:#98C379;">    min_refresh_interval = 5s</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">    [log]</span></span>
<span class="line"><span style="color:#98C379;">    mode = console</span></span>
<span class="line"><span style="color:#98C379;">    level = info</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">    # 健康检查和指标</span></span>
<span class="line"><span style="color:#98C379;">    [metrics]</span></span>
<span class="line"><span style="color:#98C379;">    enabled = true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-配置grafana持久化-pv-pvc" tabindex="-1"><a class="header-anchor" href="#_4-2-配置grafana持久化-pv-pvc"><span>4.2 配置Grafana持久化 - PV/PVC</span></a></h3><blockquote><p>这里测试，单节点直接存到指定路径下了，如果是生产，推荐使用<code>NFS</code>；</p></blockquote><ul><li><code>vi grafana-pvc.yaml</code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">PersistentVolume</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana-pv</span></span>
<span class="line"><span style="color:#E06C75;">spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  capacity</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    storage</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">20Gi</span></span>
<span class="line"><span style="color:#E06C75;">  accessModes</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">    - </span><span style="color:#98C379;">ReadWriteOnce</span></span>
<span class="line"><span style="color:#E06C75;">  hostPath</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    path</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/data/grafana-data</span><span style="color:#7F848E;font-style:italic;">  # 宿主机目录</span></span>
<span class="line"><span style="color:#E06C75;">  persistentVolumeReclaimPolicy</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Retain</span></span>
<span class="line"><span style="color:#ABB2BF;">---</span></span>
<span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">PersistentVolumeClaim</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana-pvc</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">monitoring</span></span>
<span class="line"><span style="color:#E06C75;">spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  accessModes</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">    - </span><span style="color:#98C379;">ReadWriteOnce</span></span>
<span class="line"><span style="color:#E06C75;">  resources</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    requests</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      storage</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">20Gi</span><span style="color:#7F848E;font-style:italic;">  # 根据需求调整</span></span>
<span class="line"><span style="color:#E06C75;">  volumeName</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana-pv</span><span style="color:#7F848E;font-style:italic;">  # ← 直接绑定到上面创建的 PV</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-配置grafana部署yaml-deployment" tabindex="-1"><a class="header-anchor" href="#_4-3-配置grafana部署yaml-deployment"><span>4.3 配置Grafana部署yaml - Deployment</span></a></h3><ul><li><code>vi grafana-deploy.yaml</code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">apps/v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Deployment</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">monitoring</span></span>
<span class="line"><span style="color:#E06C75;">  labels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana</span></span>
<span class="line"><span style="color:#E06C75;">spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  replicas</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">1</span></span>
<span class="line"><span style="color:#E06C75;">  selector</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    matchLabels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana</span></span>
<span class="line"><span style="color:#E06C75;">  template</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      labels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">        app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana</span></span>
<span class="line"><span style="color:#E06C75;">    spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">      # 指定部署节点，避免重启pod到其他节点上，持久化数据丢失</span></span>
<span class="line"><span style="color:#E06C75;">      nodeName</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">k8s-node1</span></span>
<span class="line"><span style="color:#E06C75;">      initContainers</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">fix-permissions</span></span>
<span class="line"><span style="color:#E06C75;">          image</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">busybox:1.36</span></span>
<span class="line"><span style="color:#E06C75;">          command</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&quot;sh&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;-c&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;chown -R 472:472 /var/lib/grafana&quot;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#E06C75;">          volumeMounts</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">            - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana-data</span></span>
<span class="line"><span style="color:#E06C75;">              mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/var/lib/grafana</span></span>
<span class="line"><span style="color:#E06C75;">          securityContext</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            runAsUser</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">0</span></span>
<span class="line"><span style="color:#E06C75;">      containers</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana</span></span>
<span class="line"><span style="color:#E06C75;">        image</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana/grafana:12.3.0</span></span>
<span class="line"><span style="color:#E06C75;">        ports</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">containerPort</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">3000</span></span>
<span class="line"><span style="color:#E06C75;">          name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">http</span></span>
<span class="line"><span style="color:#E06C75;">        volumeMounts</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana-config</span></span>
<span class="line"><span style="color:#E06C75;">          mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/etc/grafana/grafana.ini</span></span>
<span class="line"><span style="color:#E06C75;">          subPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana.ini</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana-data</span></span>
<span class="line"><span style="color:#E06C75;">          mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/var/lib/grafana</span><span style="color:#7F848E;font-style:italic;">  # Grafana 默认数据目录</span></span>
<span class="line"><span style="color:#E06C75;">        resources</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          requests</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            cpu</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">100m</span></span>
<span class="line"><span style="color:#E06C75;">            memory</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">256Mi</span></span>
<span class="line"><span style="color:#E06C75;">          limits</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            cpu</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">500m</span></span>
<span class="line"><span style="color:#E06C75;">            memory</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">512Mi</span></span>
<span class="line"><span style="color:#E06C75;">        livenessProbe</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          httpGet</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            path</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/api/health</span></span>
<span class="line"><span style="color:#E06C75;">            port</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">3000</span></span>
<span class="line"><span style="color:#E06C75;">          initialDelaySeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">30</span></span>
<span class="line"><span style="color:#E06C75;">          timeoutSeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">10</span></span>
<span class="line"><span style="color:#E06C75;">        readinessProbe</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          httpGet</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            path</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/api/health</span></span>
<span class="line"><span style="color:#E06C75;">            port</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">3000</span></span>
<span class="line"><span style="color:#E06C75;">          initialDelaySeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">10</span></span>
<span class="line"><span style="color:#E06C75;">          timeoutSeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">5</span></span>
<span class="line"><span style="color:#E06C75;">      volumes</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana-config</span></span>
<span class="line"><span style="color:#E06C75;">        configMap</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana-configmap</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana-data</span></span>
<span class="line"><span style="color:#E06C75;">        persistentVolumeClaim</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          claimName</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana-pvc</span><span style="color:#7F848E;font-style:italic;">  # 使用 PVC</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-配置grafana对外端口-service" tabindex="-1"><a class="header-anchor" href="#_4-4-配置grafana对外端口-service"><span>4.4 配置Grafana对外端口 - Service</span></a></h3><ul><li><code>vi grafana-svc.yaml</code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Service</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">monitoring</span></span>
<span class="line"><span style="color:#E06C75;">spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  type</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">NodePort</span></span>
<span class="line"><span style="color:#E06C75;">  ports</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#E06C75;">port</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">3000</span></span>
<span class="line"><span style="color:#E06C75;">    targetPort</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">3000</span></span>
<span class="line"><span style="color:#E06C75;">    nodePort</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">30000</span></span>
<span class="line"><span style="color:#E06C75;">    protocol</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">TCP</span></span>
<span class="line"><span style="color:#E06C75;">    name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">http</span></span>
<span class="line"><span style="color:#E06C75;">  selector</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">grafana</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-部署-grafana-服务" tabindex="-1"><a class="header-anchor" href="#_4-5-部署-grafana-服务"><span>4.5 部署 Grafana 服务</span></a></h3><blockquote><p>将如上四yaml文件放到服务器上，依次创建启动</p></blockquote><ul><li>部署Grafana配置文件</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 部署Grafana配置文件</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> grafana-config.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看Grafana配置文件</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> configmap</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> monitoring</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202527723.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>部署Grafana持久化PV/PVC</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 部署Grafana持久化PV/PVC</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> grafana-pvc.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看Grafana持久化PV/PVC</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> pv</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> monitoring</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> pvc</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> monitoring</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202450328.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以看到PV和PVC的状态都已经是Bound（已绑定）的状态了，所以创建pv和pvc就没问题，但还需要注意是否绑定上deployment，那么就需要部署deployment之后才能验证；</p><ul><li>部署Grafana服务</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 部署Grafana服务</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> grafana-deploy.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看Grafana服务（需Grafana pod的状态变为1/1则为正常状态）</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> pods</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> monitoring</span><span style="color:#D19A66;"> -o</span><span style="color:#98C379;"> wide</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为第一次需要拉取镜像所以会比较慢一些，如果不放心，或较长时间还是0/1状态，可以使用<code>kubectl describe pods -n monitoring pod名称</code> 此命令查看pod的状态日志；</p><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202448244.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>pod创建正常之后，我们可以看到grafana运行在了<code>k8s-node1</code>节点，那么可以登录k8s-node1服务器，去挂载的目录看一下，是否存在数据；</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># k8s-node1节点</span></span>
<span class="line"></span>
<span class="line"><span style="color:#56B6C2;">cd</span><span style="color:#98C379;"> /data/</span></span>
<span class="line"><span style="color:#56B6C2;">cd</span><span style="color:#98C379;"> grafana-data/</span></span>
<span class="line"><span style="color:#61AFEF;">ls</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202439185.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以看到数据已经存储到宿主机了，那就没问题；</p><ul><li>部署Grafana service，将端口暴露出来</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 部署Grafana Service</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> grafana-svc.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看Grafana Service</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> svc</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> monitoring</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202437420.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_4-6-页面访问验证" tabindex="-1"><a class="header-anchor" href="#_4-6-页面访问验证"><span>4.6 页面访问验证</span></a></h3><p>页面访问Grafana web服务：<code>node ip:30000</code>，<code>node ip</code>任意节点ip就行；</p><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202421543.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>输入用户名密码登录进来页面没问题就行；</p><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202419338.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p>注意（验证持久化）：可以修改个中文或者其他之后删除pod，再启动一个新的pod，看看数据是否存在，持久化是否生效；</p></blockquote><ul><li>Grafana的使用请参考：<a href="https://liucy.blog.csdn.net/article/details/155493459" target="_blank" rel="noopener noreferrer">【Linux】Prometheus + Grafana的使用</a></li><li>Grafana页面修改中文请参考：<a href="https://liucy.blog.csdn.net/article/details/131049402" target="_blank" rel="noopener noreferrer">【Linux】Prometheus + Grafana 的部署及介绍（亲测无问题）</a> <code>第6.2.4步</code>；</li></ul><h2 id="五、部署alertmanager告警" tabindex="-1"><a class="header-anchor" href="#五、部署alertmanager告警"><span>五、部署Alertmanager告警</span></a></h2><h3 id="_5-1-配置alertmanager配置文件-configmap" tabindex="-1"><a class="header-anchor" href="#_5-1-配置alertmanager配置文件-configmap"><span>5.1 配置Alertmanager配置文件 - ConfigMap</span></a></h3><ul><li><code>vi alertmanager-config.yaml</code></li></ul><blockquote><p>请注意需要修改配置中的收件人及发件人的信息；</p></blockquote><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">ConfigMap</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager-configmap</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">monitoring</span></span>
<span class="line"><span style="color:#E06C75;">data</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  alertmanager.yml</span><span style="color:#ABB2BF;">: </span><span style="color:#C678DD;">|</span></span>
<span class="line"><span style="color:#98C379;">    global:</span></span>
<span class="line"><span style="color:#98C379;">      # 全局配置</span></span>
<span class="line"><span style="color:#98C379;">      resolve_timeout: 5m  # 解析的超时时间</span></span>
<span class="line"><span style="color:#98C379;">      smtp_smarthost: &#39;smtp.163.com:465&#39;      # 邮件服务器</span></span>
<span class="line"><span style="color:#98C379;">      smtp_from: &#39;alert@example.com&#39;          # 发件人</span></span>
<span class="line"><span style="color:#98C379;">      smtp_auth_username: &#39;your-email@qq.com&#39; # 登录用户</span></span>
<span class="line"><span style="color:#98C379;">      smtp_auth_password: &#39;your-auth-code&#39;    # 授权码，不是密码！</span></span>
<span class="line"><span style="color:#98C379;">      smtp_require_tls: false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">    route:    # 将告警具体怎么发送</span></span>
<span class="line"><span style="color:#98C379;">      group_by: [&#39;alertname&#39;]  # 根据标签进行分组</span></span>
<span class="line"><span style="color:#98C379;">      group_wait: 10s          # 发送告警等待时间</span></span>
<span class="line"><span style="color:#98C379;">      group_interval: 10s      # 发送告警邮件的间隔时间</span></span>
<span class="line"><span style="color:#98C379;">      repeat_interval: 1h      # 重复的告警发送时间</span></span>
<span class="line"><span style="color:#98C379;">      receiver: &#39;email&#39;        # 接收者是谁，需和receivers中的name一致</span></span>
<span class="line"><span style="color:#98C379;">    receivers:                 # 将告警发送给谁</span></span>
<span class="line"><span style="color:#98C379;">    - name: &#39;email&#39;</span></span>
<span class="line"><span style="color:#98C379;">      email_configs:</span></span>
<span class="line"><span style="color:#98C379;">      # 接收者</span></span>
<span class="line"><span style="color:#98C379;">      - to: &#39;user1@qq.com,user2@qq.com&#39;</span></span>
<span class="line"><span style="color:#98C379;">        send_resolved: true    # 开启恢复通知</span></span>
<span class="line"><span style="color:#98C379;">        # 告警标题</span></span>
<span class="line"><span style="color:#98C379;">        headers:</span></span>
<span class="line"><span style="color:#98C379;">          Subject: &gt;</span></span>
<span class="line"><span style="color:#98C379;">            {{ if eq .Status &quot;firing&quot; }}🔥【Prometheus告警】服务器:  {{ .CommonLabels.instance  }} 发生 {{ .CommonLabels.alertname }} 故障</span></span>
<span class="line"><span style="color:#98C379;">            {{ else }}✅【Prometheus恢复】服务器: {{ .CommonLabels.instance }} 发生 {{ .CommonLabels.alertname }} 已恢复</span></span>
<span class="line"><span style="color:#98C379;">            {{ end }}</span></span>
<span class="line"><span style="color:#98C379;">        # 引入告警模板</span></span>
<span class="line"><span style="color:#98C379;">        html: &#39;{{ template &quot;email.html&quot; . }}&#39;</span></span>
<span class="line"><span style="color:#98C379;">    # 告警模板存放地址</span></span>
<span class="line"><span style="color:#98C379;">    templates:</span></span>
<span class="line"><span style="color:#98C379;">      - &#39;/etc/alertmanager/templates/email.tmpl&#39;</span></span>
<span class="line"><span style="color:#98C379;">    inhibit_rules:   # 抑制告警</span></span>
<span class="line"><span style="color:#98C379;">      - source_match:</span></span>
<span class="line"><span style="color:#98C379;">          severity: &#39;critical&#39;   # 当收到同一台机器发送的critical时候，屏蔽掉warning类型的告警</span></span>
<span class="line"><span style="color:#98C379;">        target_match:</span></span>
<span class="line"><span style="color:#98C379;">          severity: &#39;warning&#39;</span></span>
<span class="line"><span style="color:#98C379;">        equal: [&#39;alertname&#39;, &#39;severity&#39;, &#39;instance&#39;]  # 根据这些标签来定义抑制</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>vi alertmanager-templates-config.yaml</code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">ConfigMap</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager-templates-configmap</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">monitoring</span></span>
<span class="line"><span style="color:#E06C75;">data</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  email.tmpl</span><span style="color:#ABB2BF;">: </span><span style="color:#C678DD;">|</span></span>
<span class="line"><span style="color:#98C379;">    {{ define &quot;email.html&quot; }}</span></span>
<span class="line"><span style="color:#98C379;">    &lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#98C379;">    &lt;html&gt;</span></span>
<span class="line"><span style="color:#98C379;">    &lt;head&gt;</span></span>
<span class="line"><span style="color:#98C379;">        &lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">        &lt;style type=&quot;text/css&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">            body {</span></span>
<span class="line"><span style="color:#98C379;">                font-family: &#39;Helvetica Neue&#39;, Arial, sans-serif;</span></span>
<span class="line"><span style="color:#98C379;">                line-height: 1.6;</span></span>
<span class="line"><span style="color:#98C379;">                color: #333;</span></span>
<span class="line"><span style="color:#98C379;">                max-width: 700px;</span></span>
<span class="line"><span style="color:#98C379;">                margin: 0 auto;</span></span>
<span class="line"><span style="color:#98C379;">                padding: 20px;</span></span>
<span class="line"><span style="color:#98C379;">                background-color: #f9f9f9;</span></span>
<span class="line"><span style="color:#98C379;">            }</span></span>
<span class="line"><span style="color:#98C379;">            .alert-card {</span></span>
<span class="line"><span style="color:#98C379;">                border-radius: 8px;</span></span>
<span class="line"><span style="color:#98C379;">                padding: 20px;</span></span>
<span class="line"><span style="color:#98C379;">                margin-bottom: 20px;</span></span>
<span class="line"><span style="color:#98C379;">                box-shadow: 0 2px 10px rgba(0,0,0,0.1);</span></span>
<span class="line"><span style="color:#98C379;">            }</span></span>
<span class="line"><span style="color:#98C379;">            .alert-critical {</span></span>
<span class="line"><span style="color:#98C379;">                background: linear-gradient(135deg, #FFF6F6 0%, #FFEBEB 100%);</span></span>
<span class="line"><span style="color:#98C379;">                border-left: 5px solid #FF5252;</span></span>
<span class="line"><span style="color:#98C379;">            }</span></span>
<span class="line"><span style="color:#98C379;">            .alert-resolved {</span></span>
<span class="line"><span style="color:#98C379;">                background: linear-gradient(135deg, #F6FFF6 0%, #EBFFEB 100%);</span></span>
<span class="line"><span style="color:#98C379;">                border-left: 5px solid #4CAF50;</span></span>
<span class="line"><span style="color:#98C379;">            }</span></span>
<span class="line"><span style="color:#98C379;">            .alert-title {</span></span>
<span class="line"><span style="color:#98C379;">                font-size: 18px;</span></span>
<span class="line"><span style="color:#98C379;">                font-weight: bold;</span></span>
<span class="line"><span style="color:#98C379;">                margin-bottom: 15px;</span></span>
<span class="line"><span style="color:#98C379;">                display: flex;</span></span>
<span class="line"><span style="color:#98C379;">                align-items: center;</span></span>
<span class="line"><span style="color:#98C379;">            }</span></span>
<span class="line"><span style="color:#98C379;">            .alert-icon {</span></span>
<span class="line"><span style="color:#98C379;">                width: 24px;</span></span>
<span class="line"><span style="color:#98C379;">                height: 24px;</span></span>
<span class="line"><span style="color:#98C379;">                margin-right: 10px;</span></span>
<span class="line"><span style="color:#98C379;">            }</span></span>
<span class="line"><span style="color:#98C379;">            .alert-field {</span></span>
<span class="line"><span style="color:#98C379;">                margin-bottom: 8px;</span></span>
<span class="line"><span style="color:#98C379;">                display: flex;</span></span>
<span class="line"><span style="color:#98C379;">            }</span></span>
<span class="line"><span style="color:#98C379;">            .field-label {</span></span>
<span class="line"><span style="color:#98C379;">                font-weight: bold;</span></span>
<span class="line"><span style="color:#98C379;">                min-width: 80px;</span></span>
<span class="line"><span style="color:#98C379;">                color: #555;</span></span>
<span class="line"><span style="color:#98C379;">            }</span></span>
<span class="line"><span style="color:#98C379;">            .field-value {</span></span>
<span class="line"><span style="color:#98C379;">                flex: 1;</span></span>
<span class="line"><span style="color:#98C379;">            }</span></span>
<span class="line"><span style="color:#98C379;">            .timestamp {</span></span>
<span class="line"><span style="color:#98C379;">                color: #666;</span></span>
<span class="line"><span style="color:#98C379;">                font-size: 13px;</span></span>
<span class="line"><span style="color:#98C379;">                margin-top: 15px;</span></span>
<span class="line"><span style="color:#98C379;">                text-align: right;</span></span>
<span class="line"><span style="color:#98C379;">            }</span></span>
<span class="line"><span style="color:#98C379;">            .divider {</span></span>
<span class="line"><span style="color:#98C379;">                height: 1px;</span></span>
<span class="line"><span style="color:#98C379;">                background: #eee;</span></span>
<span class="line"><span style="color:#98C379;">                margin: 15px 0;</span></span>
<span class="line"><span style="color:#98C379;">            }</span></span>
<span class="line"><span style="color:#98C379;">        &lt;/style&gt;</span></span>
<span class="line"><span style="color:#98C379;">    &lt;/head&gt;</span></span>
<span class="line"><span style="color:#98C379;">    &lt;body&gt;</span></span>
<span class="line"><span style="color:#98C379;">    {{- if gt (len .Alerts.Firing) 0 -}}</span></span>
<span class="line"><span style="color:#98C379;">        &lt;div class=&quot;alert-header alert-critical&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">            </span></span>
<span class="line"><span style="color:#98C379;">        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">        {{- range $index, $alert := .Alerts -}}</span></span>
<span class="line"><span style="color:#98C379;">            &lt;div class=&quot;alert-card alert-critical&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;div class=&quot;alert-title&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">                    告警触发 - 请立即处理！</span></span>
<span class="line"><span style="color:#98C379;">                &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;div class=&quot;alert-field&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">                    &lt;span class=&quot;field-label&quot;&gt;告警名称:&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                    &lt;span class=&quot;field-value&quot;&gt;{{ .Labels.alertname }}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;div class=&quot;alert-field&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">                    &lt;span class=&quot;field-label&quot;&gt;告警级别:&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                    &lt;span class=&quot;field-value&quot;&gt;{{ .Labels.severity }}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;div class=&quot;alert-field&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">                    &lt;span class=&quot;field-label&quot;&gt;告警主机:&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                    &lt;span class=&quot;field-value&quot;&gt;{{ .Labels.instance }}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;div class=&quot;alert-field&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">                    &lt;span class=&quot;field-label&quot;&gt;告警摘要:&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                    &lt;span class=&quot;field-value&quot;&gt;{{ .Annotations.summary }}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;div class=&quot;alert-field&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">                    &lt;span class=&quot;field-label&quot;&gt;告警时间:&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                    &lt;span class=&quot;field-value&quot;&gt;{{ (.StartsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">                {{- if .Annotations.description }}</span></span>
<span class="line"><span style="color:#98C379;">                &lt;div class=&quot;divider&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;div class=&quot;alert-field&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">                    &lt;span class=&quot;field-label&quot;&gt;告警详情:&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                    &lt;span class=&quot;field-value&quot;&gt;{{ .Annotations.description }}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">                {{- end }}</span></span>
<span class="line"><span style="color:#98C379;">            &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">        {{- end }}</span></span>
<span class="line"><span style="color:#98C379;">    {{- end }}</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">    {{- if gt (len .Alerts.Resolved) 0 -}}</span></span>
<span class="line"><span style="color:#98C379;">        {{- range $index, $alert := .Alerts -}}</span></span>
<span class="line"><span style="color:#98C379;">        &lt;div class=&quot;alert-card alert-resolved&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">            &lt;div class=&quot;alert-title&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">                告警恢复通知</span></span>
<span class="line"><span style="color:#98C379;">            &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">            &lt;div class=&quot;alert-field&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;span class=&quot;field-label&quot;&gt;告警名称:&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;span class=&quot;field-value&quot;&gt;{{ .Labels.alertname }}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">            &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">            &lt;div class=&quot;alert-field&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;span class=&quot;field-label&quot;&gt;告警主机:&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;span class=&quot;field-value&quot;&gt;{{ .Labels.instance }}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">            &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">            &lt;div class=&quot;alert-field&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;span class=&quot;field-label&quot;&gt;告警摘要:&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;span class=&quot;field-value&quot;&gt;[ {{ .Annotations.summary }}] 此告警已经恢复~&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">            &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">            &lt;div class=&quot;alert-field&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;span class=&quot;field-label&quot;&gt;告警时间:&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;span class=&quot;field-value&quot;&gt;{{ (.StartsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">            &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">            &lt;div class=&quot;alert-field&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;span class=&quot;field-label&quot;&gt;恢复时间:&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;span class=&quot;field-value&quot;&gt;{{ (.EndsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">            &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">            {{- if .Annotations.description }}</span></span>
<span class="line"><span style="color:#98C379;">            &lt;div class=&quot;alert-field&quot;&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;span class=&quot;field-label&quot;&gt;告警详情:&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">                &lt;span class=&quot;field-value&quot;&gt;{{ .Annotations.description }}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#98C379;">            &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">            {{- end }}</span></span>
<span class="line"><span style="color:#98C379;">        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">        {{- end }}</span></span>
<span class="line"><span style="color:#98C379;">    {{- end }}</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">    &lt;/body&gt;</span></span>
<span class="line"><span style="color:#98C379;">    &lt;/html&gt;</span></span>
<span class="line"><span style="color:#98C379;">    {{ end }}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-配置alertmanager部署yaml-deployment" tabindex="-1"><a class="header-anchor" href="#_5-2-配置alertmanager部署yaml-deployment"><span>5.2 配置Alertmanager部署yaml - Deployment</span></a></h3><ul><li><code>vi alertmanager-deploy.yaml</code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">apps/v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Deployment</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">monitoring</span></span>
<span class="line"><span style="color:#E06C75;">  labels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager</span></span>
<span class="line"><span style="color:#E06C75;">spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  replicas</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">1</span><span style="color:#7F848E;font-style:italic;">              # 生产建议 3 个副本做高可用</span></span>
<span class="line"><span style="color:#E06C75;">  selector</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    matchLabels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager</span></span>
<span class="line"><span style="color:#E06C75;">  template</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      labels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">        app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager</span></span>
<span class="line"><span style="color:#E06C75;">    spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      containers</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager</span></span>
<span class="line"><span style="color:#E06C75;">        image</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prom/alertmanager:v0.30.0</span></span>
<span class="line"><span style="color:#E06C75;">        args</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">&#39;--config.file=/etc/alertmanager/alertmanager.yml&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">&#39;--storage.path=/alertmanager&#39;</span><span style="color:#7F848E;font-style:italic;">           # 告警状态存储</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">&#39;--web.listen-address=:9093&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">&#39;--web.external-url=http://alertmanager:9093&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">&#39;--cluster.listen-address=0.0.0.0:9094&#39;</span><span style="color:#7F848E;font-style:italic;">   # 集群通信端口（HA用）</span></span>
<span class="line"><span style="color:#ABB2BF;">          - </span><span style="color:#98C379;">&#39;--log.level=info&#39;</span></span>
<span class="line"><span style="color:#E06C75;">        ports</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">containerPort</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">9093</span></span>
<span class="line"><span style="color:#E06C75;">          name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">http</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">containerPort</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">9094</span></span>
<span class="line"><span style="color:#E06C75;">          name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">cluster</span></span>
<span class="line"><span style="color:#E06C75;">        volumeMounts</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager-config</span></span>
<span class="line"><span style="color:#E06C75;">          mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/etc/alertmanager/alertmanager.yml</span></span>
<span class="line"><span style="color:#E06C75;">          subPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager.yml</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager-templates</span></span>
<span class="line"><span style="color:#E06C75;">          mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/etc/alertmanager/templates/email.tmpl</span></span>
<span class="line"><span style="color:#E06C75;">          subPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">email.tmpl</span></span>
<span class="line"><span style="color:#E06C75;">        resources</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          requests</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            cpu</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">100m</span></span>
<span class="line"><span style="color:#E06C75;">            memory</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">256Mi</span></span>
<span class="line"><span style="color:#E06C75;">          limits</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            cpu</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">500m</span></span>
<span class="line"><span style="color:#E06C75;">            memory</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">512Mi</span></span>
<span class="line"><span style="color:#E06C75;">        livenessProbe</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          httpGet</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            path</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/-/healthy</span></span>
<span class="line"><span style="color:#E06C75;">            port</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">9093</span></span>
<span class="line"><span style="color:#E06C75;">          initialDelaySeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">30</span></span>
<span class="line"><span style="color:#E06C75;">          timeoutSeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">10</span></span>
<span class="line"><span style="color:#E06C75;">        readinessProbe</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          httpGet</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            path</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/-/ready</span></span>
<span class="line"><span style="color:#E06C75;">            port</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">9093</span></span>
<span class="line"><span style="color:#E06C75;">          initialDelaySeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">10</span></span>
<span class="line"><span style="color:#E06C75;">          timeoutSeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">5</span></span>
<span class="line"><span style="color:#E06C75;">      volumes</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager-config</span></span>
<span class="line"><span style="color:#E06C75;">        configMap</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager-configmap</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager-templates</span></span>
<span class="line"><span style="color:#E06C75;">        configMap</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager-templates-configmap</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-配置alertmanager对内端口-service" tabindex="-1"><a class="header-anchor" href="#_5-3-配置alertmanager对内端口-service"><span>5.3 配置Alertmanager对内端口 - Service</span></a></h3><ul><li><code>vi alertmanager-svc.yaml</code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Service</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">monitoring</span></span>
<span class="line"><span style="color:#E06C75;">  labels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager</span></span>
<span class="line"><span style="color:#E06C75;">spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  type</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">ClusterIP</span></span>
<span class="line"><span style="color:#E06C75;">  ports</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#E06C75;">port</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">9093</span></span>
<span class="line"><span style="color:#E06C75;">    targetPort</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">9093</span></span>
<span class="line"><span style="color:#E06C75;">    name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">http</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#E06C75;">port</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">9094</span></span>
<span class="line"><span style="color:#E06C75;">    targetPort</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">9094</span></span>
<span class="line"><span style="color:#E06C75;">    name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">cluster</span></span>
<span class="line"><span style="color:#E06C75;">  selector</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">alertmanager</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-部署-alertmanager-服务" tabindex="-1"><a class="header-anchor" href="#_5-4-部署-alertmanager-服务"><span>5.4 部署 Alertmanager 服务</span></a></h3><blockquote><p>将如上四个yaml文件放到服务器上，依次创建启动</p></blockquote><ul><li>部署Alertmanager配置文件</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 部署Alertmanager配置文件</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> alertmanager-config.yaml</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> alertmanager-templates-config.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看Alertmanager配置文件</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> configmap</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> monitoring</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202351287.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>部署Alertmanager服务</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 部署Alertmanager服务</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> alertmanager-deploy.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看Alertmanager服务（需alertmanager pod的状态变为1/1则为正常状态）</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> pods</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> monitoring</span><span style="color:#D19A66;"> -o</span><span style="color:#98C379;"> wide</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202349155.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>部署Alertmanager service，不需要暴露端口，集群内使用就行，所以采用<code>ClusterIP</code>方式</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 部署Alertmanager Service</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> alertmanager-svc.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看Alertmanager Service</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> svc</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> monitoring</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202400188.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_5-5-配置prometheus配置文件-添加alertmanager告警配置" tabindex="-1"><a class="header-anchor" href="#_5-5-配置prometheus配置文件-添加alertmanager告警配置"><span>5.5 配置Prometheus配置文件，添加Alertmanager告警配置</span></a></h3><blockquote><p>直接修改Prometheus的配置文件：<code>prometheus-config.yaml</code>，添加Alertmanager、Grafana抓取配置及Alertmanager的告警配置；</p></blockquote><blockquote><p>注意：我这里使用的域名，域名需要提前部署<code>CoreDNS</code>服务，如果需要部署CoreDNs可参考：<a href="https://liucy.blog.csdn.net/article/details/157694074" target="_blank" rel="noopener noreferrer">K8S 部署 CoreDNS 之 DNS 域名获取</a>，部署好之后你也可以使用域名了；<br> 如果没有部署<code>CoreDNS</code>服务的话，<code>alertmanager</code>的配置可以使用<code>ClusterIP:9093</code>，<code>grafana</code>的配置可以使用<code>ClusterIP:3000</code>或<code>节点IP:30000</code>；<br><code>ClusterIP</code>查看方式：<code>kubectl get svc -n monitoring</code>，找到对应的svc name及ClusterIP即可；</p></blockquote><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#7F848E;font-style:italic;">    # 告警信息配置</span></span>
<span class="line"><span style="color:#E06C75;">    alerting</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      alertmanagers</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">static_configs</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">            - </span><span style="color:#E06C75;">targets</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&#39;alertmanager.monitoring.svc.cluster.local:9093&#39;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 抓取配置</span></span>
<span class="line"><span style="color:#ABB2BF;">    - </span><span style="color:#E06C75;">job_name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;grafana&#39;</span></span>
<span class="line"><span style="color:#E06C75;">      static_configs</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">targets</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&#39;grafana.monitoring.svc.cluster.local:3000&#39;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">    - </span><span style="color:#E06C75;">job_name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;alertmanager&#39;</span></span>
<span class="line"><span style="color:#E06C75;">      static_configs</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">targets</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&#39;alertmanager.monitoring.svc.cluster.local:9093&#39;</span><span style="color:#ABB2BF;">]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202344347.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_5-6-更新prometheus配置文件并热重载" tabindex="-1"><a class="header-anchor" href="#_5-6-更新prometheus配置文件并热重载"><span>5.6 更新prometheus配置文件并热重载</span></a></h3><ul><li>更新Prometheus配置文件</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> prometheus-config.yaml</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><blockquote><p>需等待一会，进行配置同步，可以使用<code>kubectl exec -it -n monitoring pod名称 -- sh</code>进入查看Prometheus配置文件，进行确认是否同步成功；</p></blockquote><ul><li>热重载Prometheus配置文件，使其生效</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">curl</span><span style="color:#D19A66;"> -X</span><span style="color:#98C379;"> POST</span><span style="color:#98C379;"> localhost:30090/-/reload</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_5-7-页面验证" tabindex="-1"><a class="header-anchor" href="#_5-7-页面验证"><span>5.7 页面验证</span></a></h3><blockquote><p>访问：<code>node ip:30090/targets</code></p></blockquote><p><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202325887.png" alt="" loading="lazy"><br><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202324098.png" alt="" loading="lazy"></p><p>就可以看到添加的<code>Alertmanager</code>和<code>Grafana</code>的抓取指标了，那么<code>Alerts</code>还是没有的，因为还没有配置告警规则，所以，里面内容会展示 <mark>“未找到规则”</mark> ；</p><h2 id="六、部署-kube-state-metrics-cadvisor-监控k8s集群指标" tabindex="-1"><a class="header-anchor" href="#六、部署-kube-state-metrics-cadvisor-监控k8s集群指标"><span>六、部署 kube-state-metrics + CAdvisor 监控k8s集群指标</span></a></h2><h3 id="_6-1-k8s部署kube-state-metrics-cadvisor" tabindex="-1"><a class="header-anchor" href="#_6-1-k8s部署kube-state-metrics-cadvisor"><span>6.1 k8s部署kube-state-metrics + CAdvisor</span></a></h3><blockquote><p>部署可参考：<a href="https://liucy.blog.csdn.net/article/details/157395184" target="_blank" rel="noopener noreferrer">K8S部署kube-state-metrics + CAdvisor 并使用 Prometheus 监控 Kubernetes 指标</a><br> 这里我因为最开始使用的宿主机部署的Prometheus，所以用的<code>nodeport</code>的模式，这里可以切换为<code>cluster</code> ，都可以；</p></blockquote><h3 id="_6-2-prometheus-添加-k8s-集群监控目标配置" tabindex="-1"><a class="header-anchor" href="#_6-2-prometheus-添加-k8s-集群监控目标配置"><span>6.2 Prometheus 添加 K8s 集群监控目标配置</span></a></h3><blockquote><p>添加<code>kube-state-metrics</code>和<code>cadvisor</code>到Prometheus配置中；</p><ul><li><code>kube-state-metrics</code>是采用的nodeport吧端口对外暴露了30080，所以直接写<code>集群任意IP:30080</code>即可；</li><li><code>cadvisor</code>采用的是network=host模式，直接写<code>集群每台节点的ip:8088</code>即可；<br> 加<code>clusterip</code>是因为适配k8s部署的Prometheus，可直接使用域名；</li></ul></blockquote><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#ABB2BF;">    - </span><span style="color:#E06C75;">job_name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;kube-state-metrics&#39;</span></span>
<span class="line"><span style="color:#E06C75;">      static_configs</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">targets</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&#39;kube-state-metrics.monitoring.svc.cluster.local:8080&#39;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">    - </span><span style="color:#E06C75;">job_name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;cadvisor&#39;</span></span>
<span class="line"><span style="color:#E06C75;">      static_configs</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">targets</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&#39;cadvisor.monitoring.svc.cluster.local:8080&#39;</span><span style="color:#ABB2BF;">]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202157725.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_6-3-更新并重载-prometheus-配置" tabindex="-1"><a class="header-anchor" href="#_6-3-更新并重载-prometheus-配置"><span>6.3 更新并重载 Prometheus 配置</span></a></h3><ul><li>更新Prometheus配置</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> prometheus-config.yaml</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><blockquote><p>需等待一会，进行配置同步，可以使用<code>kubectl exec -it -n monitoring pod名称 -- sh</code>进入查看Prometheus配置文件，进行确认是否同步成功；</p></blockquote><ul><li>重载Prometheus配置</li></ul><blockquote><p><code>localhost</code>可换为<code>IP</code>；</p></blockquote><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">curl</span><span style="color:#D19A66;"> -X</span><span style="color:#98C379;"> POST</span><span style="color:#98C379;"> http://localhost:30090/-/reload</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_6-4-prometheus-页面查看" tabindex="-1"><a class="header-anchor" href="#_6-4-prometheus-页面查看"><span>6.4 Prometheus 页面查看</span></a></h3><blockquote><p><code>node ip:30090/targets</code></p></blockquote><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202155738.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>添加完成，检查PromQL是否支持查询k8s信息；</p><h3 id="_6-5-检查-prometheus-是否支持-kubernetes-的-promql" tabindex="-1"><a class="header-anchor" href="#_6-5-检查-prometheus-是否支持-kubernetes-的-promql"><span>6.5 检查 Prometheus 是否支持 kubernetes 的 PromQL</span></a></h3><blockquote><p>在<code>Prometheus</code>页面的<code>Query</code>输入<code>kube</code>，只要可以出现<code>kube_*</code>并可以查出来就没问题；</p></blockquote><p><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202138640.png" alt="" loading="lazy"><br><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202125019.png" alt="" loading="lazy"></p><h2 id="七、添加告警规则" tabindex="-1"><a class="header-anchor" href="#七、添加告警规则"><span>七、添加告警规则</span></a></h2><h3 id="_7-1-创建告警规则-configmap" tabindex="-1"><a class="header-anchor" href="#_7-1-创建告警规则-configmap"><span>7.1 创建告警规则 - ConfigMap</span></a></h3><ul><li><code>vi kubernetes_rules.yml</code></li></ul><blockquote><p><strong>注意：</strong><code>severity</code>参数的值建议使用英文，这里为了演示采用了中文，如果需要用中文也可以，alertmanager配置中配置路由和静默等相关<code>severity</code>请更换为对应中文；</p><ul><li>严重: <code>critical</code></li><li>警告: <code>warning</code></li></ul></blockquote><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">ConfigMap</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus-kubernetes-rules-configmap</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">monitoring</span></span>
<span class="line"><span style="color:#E06C75;">data</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  kubernetes_rules.yml</span><span style="color:#ABB2BF;">: </span><span style="color:#C678DD;">|</span></span>
<span class="line"><span style="color:#98C379;">    groups:</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">      # =========================</span></span>
<span class="line"><span style="color:#98C379;">      # 0) 基础服务状态（up）</span></span>
<span class="line"><span style="color:#98C379;">      # =========================</span></span>
<span class="line"><span style="color:#98C379;">      - name: 抓取指标服务状态</span></span>
<span class="line"><span style="color:#98C379;">        rules:</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 抓取指标服务状态</span></span>
<span class="line"><span style="color:#98C379;">            expr: up == 0</span></span>
<span class="line"><span style="color:#98C379;">            for: 5m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 严重</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &quot;IP为 {{ $labels.instance }} 的 {{ $labels.job }} 服务超过5分钟无法连接&quot;</span></span>
<span class="line"><span style="color:#98C379;">              description: &quot;IP为 {{ $labels.instance }} 的 {{ $labels.job }} 服务超过5分钟无法连接，请检查服务状态&quot;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">      # =========================</span></span>
<span class="line"><span style="color:#98C379;">      # 1) Kubernetes 核心服务（systemd）</span></span>
<span class="line"><span style="color:#98C379;">      # =========================</span></span>
<span class="line"><span style="color:#98C379;">      - name: kubernetes核心服务状态</span></span>
<span class="line"><span style="color:#98C379;">        rules:</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: docker服务宕机</span></span>
<span class="line"><span style="color:#98C379;">            expr: node_systemd_unit_state{name=&quot;docker.service&quot;,state=&quot;active&quot;} == 0</span></span>
<span class="line"><span style="color:#98C379;">            for: 1m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 严重</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &quot;IP为 {{ $labels.instance }} 的 docker 服务已停止&quot;</span></span>
<span class="line"><span style="color:#98C379;">              description: &quot;IP为 {{ $labels.instance }} 的 docker 服务当前为非激活状态，请立即检查 Docker 服务状态。&quot;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: containerd服务宕机</span></span>
<span class="line"><span style="color:#98C379;">            expr: node_systemd_unit_state{name=&quot;containerd.service&quot;,state=&quot;active&quot;} == 0</span></span>
<span class="line"><span style="color:#98C379;">            for: 1m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 严重</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &quot;IP为 {{ $labels.instance }} 的 containerd 服务已停止&quot;</span></span>
<span class="line"><span style="color:#98C379;">              description: &quot;IP为 {{ $labels.instance }} 的 containerd 服务当前为非激活状态，请立即检查 containerd 服务状态。&quot;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: etcd服务宕机</span></span>
<span class="line"><span style="color:#98C379;">            expr: node_systemd_unit_state{name=&quot;etcd.service&quot;,state=&quot;active&quot;} == 0</span></span>
<span class="line"><span style="color:#98C379;">            for: 1m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 严重</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &quot;IP为 {{ $labels.instance }} 的 etcd 服务已停止&quot;</span></span>
<span class="line"><span style="color:#98C379;">              description: &quot;IP为 {{ $labels.instance }} 的 etcd 服务当前为非激活状态，请立即检查 etcd 及集群健康，防止数据不一致或集群无法选主。&quot;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: kubeApiserver服务宕机</span></span>
<span class="line"><span style="color:#98C379;">            expr: node_systemd_unit_state{name=&quot;kube-apiserver.service&quot;,state=&quot;active&quot;} == 0</span></span>
<span class="line"><span style="color:#98C379;">            for: 1m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 严重</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &quot;IP为 {{ $labels.instance }} 的 kube-apiserver 服务已停止&quot;</span></span>
<span class="line"><span style="color:#98C379;">              description: &quot;IP为 {{ $labels.instance }} 的 kube-apiserver 服务当前为非激活状态，将导致整个集群 API 不可用，请立即排查。&quot;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: kubeControllerManager服务宕机</span></span>
<span class="line"><span style="color:#98C379;">            expr: node_systemd_unit_state{name=&quot;kube-controller-manager.service&quot;,state=&quot;active&quot;} == 0</span></span>
<span class="line"><span style="color:#98C379;">            for: 1m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 严重</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &quot;IP为 {{ $labels.instance }} 的 kube-controller-manager 服务已停止&quot;</span></span>
<span class="line"><span style="color:#98C379;">              description: &quot;IP为 {{ $labels.instance }} 的 kube-controller-manager 服务当前为非激活状态，将导致副本控制器、节点控制器等无法工作，请立即修复。&quot;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: kubeScheduler服务宕机</span></span>
<span class="line"><span style="color:#98C379;">            expr: node_systemd_unit_state{name=&quot;kube-scheduler.service&quot;,state=&quot;active&quot;} == 0</span></span>
<span class="line"><span style="color:#98C379;">            for: 1m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 严重</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &quot;IP为 {{ $labels.instance }} 的 kube-scheduler 服务已停止&quot;</span></span>
<span class="line"><span style="color:#98C379;">              description: &quot;IP为 {{ $labels.instance }} 的 kube-scheduler 服务当前为非激活状态，将导致 Pod 无法被调度到新节点，请立即检查。&quot;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: kubelet服务宕机</span></span>
<span class="line"><span style="color:#98C379;">            expr: node_systemd_unit_state{name=&quot;kubelet.service&quot;,state=&quot;active&quot;} == 0</span></span>
<span class="line"><span style="color:#98C379;">            for: 1m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 严重</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &quot;IP为 {{ $labels.instance }} 的 kubelet 服务已停止&quot;</span></span>
<span class="line"><span style="color:#98C379;">              description: &quot;IP为 {{ $labels.instance }} 的 kubelet 服务当前为非激活状态，将导致该节点 Pod 生命周期无法管理，请立即恢复 kubelet。&quot;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: kubeProxy服务宕机</span></span>
<span class="line"><span style="color:#98C379;">            expr: node_systemd_unit_state{name=&quot;kube-proxy.service&quot;,state=&quot;active&quot;} == 0</span></span>
<span class="line"><span style="color:#98C379;">            for: 1m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 严重</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &quot;IP为 {{ $labels.instance }} 的 kube-proxy 服务已停止&quot;</span></span>
<span class="line"><span style="color:#98C379;">              description: &quot;IP为 {{ $labels.instance }} 的 kube-proxy 服务当前为非激活状态，将导致该节点服务流量无法转发，请立即检查。&quot;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: chronyd服务宕机</span></span>
<span class="line"><span style="color:#98C379;">            expr: node_systemd_unit_state{name=~&quot;chronyd.service|chrony.service&quot;,state=&quot;active&quot;} == 0</span></span>
<span class="line"><span style="color:#98C379;">            for: 5m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 警告</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &quot;IP为 {{ $labels.instance }} 的时间同步服务已停止&quot;</span></span>
<span class="line"><span style="color:#98C379;">              description: &quot;时间不同步会引发证书校验、etcd 选主、日志对齐等问题，建议尽快恢复 chrony/ntp。&quot;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">      # =========================</span></span>
<span class="line"><span style="color:#98C379;">      # 2) 节点资源与容量（带当前值）</span></span>
<span class="line"><span style="color:#98C379;">      # =========================</span></span>
<span class="line"><span style="color:#98C379;">      - name: 节点资源与容量</span></span>
<span class="line"><span style="color:#98C379;">        rules:</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 节点CPU使用率过高</span></span>
<span class="line"><span style="color:#98C379;">            expr: (1 - avg by (instance) (rate(node_cpu_seconds_total{mode=&quot;idle&quot;}[5m]))) * 100 &gt; 90</span></span>
<span class="line"><span style="color:#98C379;">            for: 5m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 警告</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;IP为 {{ $labels.instance }} 的 CPU 使用率过高&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;当前CPU使用率为: {{ printf &quot;%.2f&quot; $value }}%，建议: 排查热点进程/Pod，或扩容节点资源。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 节点CPU使用率极高</span></span>
<span class="line"><span style="color:#98C379;">            expr: (1 - avg by (instance) (rate(node_cpu_seconds_total{mode=&quot;idle&quot;}[5m]))) * 100 &gt; 97</span></span>
<span class="line"><span style="color:#98C379;">            for: 5m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 严重</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;IP为 {{ $labels.instance }} 的 CPU 使用率极高&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;当前CPU使用率为: {{ printf &quot;%.2f&quot; $value }}%，建议: 立即定位热点，避免 kubelet/关键组件被拖慢。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 节点内存使用率过高</span></span>
<span class="line"><span style="color:#98C379;">            expr: (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100 &gt; 90</span></span>
<span class="line"><span style="color:#98C379;">            for: 10m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 警告</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;IP为 {{ $labels.instance }} 的内存使用率过高&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;当前内存使用率为: {{ printf &quot;%.2f&quot; $value }}%，建议: 排查内存大户进程/Pod，必要时提升内存或调整限额。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 节点内存使用率极高</span></span>
<span class="line"><span style="color:#98C379;">            expr: (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100 &gt; 97</span></span>
<span class="line"><span style="color:#98C379;">            for: 5m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 严重</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;IP为 {{ $labels.instance }} 的内存压力极高&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;当前内存使用率为: {{ printf &quot;%.2f&quot; $value }}%，建议: 高风险 OOM/驱逐，立即处理（释放内存/扩容/降载）。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 节点磁盘空间不足</span></span>
<span class="line"><span style="color:#98C379;">            expr: (1 - node_filesystem_avail_bytes{fstype!~&quot;tmpfs|overlay|squashfs|ramfs&quot;,mountpoint!=&quot;/media/cdrom&quot;} / node_filesystem_size_bytes{fstype!~&quot;tmpfs|overlay|squashfs|ramfs&quot;,mountpoint!=&quot;/media/cdrom&quot;}) * 100 &gt; 90</span></span>
<span class="line"><span style="color:#98C379;">            for: 10m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 警告</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;IP为 {{ $labels.instance }} 的磁盘使用率过高&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;告警磁盘: {{ $labels.mountpoint }}；当前使用率: {{ printf &quot;%.2f&quot; $value }}%；建议: 清理日志/容器镜像/临时文件，或扩容磁盘。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 节点磁盘空间极低</span></span>
<span class="line"><span style="color:#98C379;">            expr: (1 - node_filesystem_avail_bytes{fstype!~&quot;tmpfs|overlay|squashfs|ramfs&quot;,mountpoint!=&quot;/media/cdrom&quot;} / node_filesystem_size_bytes{fstype!~&quot;tmpfs|overlay|squashfs|ramfs&quot;,mountpoint!=&quot;/media/cdrom&quot;}) * 100 &gt; 95</span></span>
<span class="line"><span style="color:#98C379;">            for: 5m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 严重</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;IP为 {{ $labels.instance }} 的磁盘使用率极高&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;告警磁盘: {{ $labels.mountpoint }}；当前使用率: {{ printf &quot;%.2f&quot; $value }}%；建议: 立即处理，避免 kubelet/容器运行时写入失败导致节点异常。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 节点Inode不足</span></span>
<span class="line"><span style="color:#98C379;">            expr: (1 - node_filesystem_files_free{fstype!~&quot;tmpfs|overlay|squashfs|ramfs&quot;} / node_filesystem_files{fstype!~&quot;tmpfs|overlay|squashfs|ramfs&quot;}) * 100 &gt; 90</span></span>
<span class="line"><span style="color:#98C379;">            for: 10m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 警告</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;IP为 {{ $labels.instance }} 的 Inode 使用率过高&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;告警磁盘: {{ $labels.mountpoint }}；当前Inode使用率: {{ printf &quot;%.2f&quot; $value }}%；建议: 清理小文件（日志/缓存/容器层），避免创建文件失败。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 节点负载过高</span></span>
<span class="line"><span style="color:#98C379;">            expr: (node_load1 / count without(cpu, mode) (node_cpu_seconds_total{mode=&quot;idle&quot;})) &gt; 2</span></span>
<span class="line"><span style="color:#98C379;">            for: 10m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 警告</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;IP为 {{ $labels.instance }} 的系统负载过高&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;当前 Load1/CPU核数为: {{ printf &quot;%.2f&quot; $value }}；建议: 可能存在 IO/CPU 饱和，排查 top、iostat、容器限流与磁盘问题。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">      # =========================</span></span>
<span class="line"><span style="color:#98C379;">      # 3) 节点网络与系统资源（连接、句柄、错误包）</span></span>
<span class="line"><span style="color:#98C379;">      # =========================</span></span>
<span class="line"><span style="color:#98C379;">      - name: 节点网络与系统资源</span></span>
<span class="line"><span style="color:#98C379;">        rules:</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 节点网络接收错误过多</span></span>
<span class="line"><span style="color:#98C379;">            expr: rate(node_network_receive_errs_total{device!~&quot;lo|veth.*|docker.*|cni.*|flannel.*|cali.*&quot;}[5m]) &gt; 10</span></span>
<span class="line"><span style="color:#98C379;">            for: 10m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 警告</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;IP为 {{ $labels.instance }} 的网络接收错误过多&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;网卡: {{ $labels.device }}；当前每秒接收错误: {{ printf &quot;%.2f&quot; $value }}；建议: 排查物理链路/网卡驱动/丢包与交换机端口。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 节点网络发送错误过多</span></span>
<span class="line"><span style="color:#98C379;">            expr: rate(node_network_transmit_errs_total{device!~&quot;lo|veth.*|docker.*|cni.*|flannel.*|cali.*&quot;}[5m]) &gt; 10</span></span>
<span class="line"><span style="color:#98C379;">            for: 10m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 警告</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;IP为 {{ $labels.instance }} 的网络发送错误过多&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;网卡: {{ $labels.device }}；当前每秒发送错误: {{ printf &quot;%.2f&quot; $value }}；建议: 排查链路质量/拥塞/驱动与 MTU 配置。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 节点conntrack使用率过高</span></span>
<span class="line"><span style="color:#98C379;">            expr: (node_nf_conntrack_entries / node_nf_conntrack_entries_limit) * 100 &gt; 80</span></span>
<span class="line"><span style="color:#98C379;">            for: 10m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 警告</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;IP为 {{ $labels.instance }} 的 conntrack 使用率过高&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;当前使用率: {{ printf &quot;%.2f&quot; $value }}%；建议: 检查连接风暴/异常流量，必要时调大 nf_conntrack_max。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 节点文件句柄使用率过高</span></span>
<span class="line"><span style="color:#98C379;">            expr: (node_filefd_allocated / node_filefd_maximum) * 100 &gt; 80</span></span>
<span class="line"><span style="color:#98C379;">            for: 10m</span></span>
<span class="line"><span style="color:#98C379;">            labels:</span></span>
<span class="line"><span style="color:#98C379;">              severity: 警告</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;IP为 {{ $labels.instance }} 的文件句柄使用率过高&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;当前使用率: {{ printf &quot;%.2f&quot; $value }}%；建议: 排查打开文件数异常的进程/容器，必要时提升系统限制。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">      # ==================================================</span></span>
<span class="line"><span style="color:#98C379;">      # 4) Pod/容器层（需要 kube-state-metrics）</span></span>
<span class="line"><span style="color:#98C379;">      # ==================================================</span></span>
<span class="line"><span style="color:#98C379;">      - name: Pod与容器状态</span></span>
<span class="line"><span style="color:#98C379;">        rules:</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: Pod崩溃循环</span></span>
<span class="line"><span style="color:#98C379;">            expr: kube_pod_container_status_waiting_reason{reason=&quot;CrashLoopBackOff&quot;} == 1</span></span>
<span class="line"><span style="color:#98C379;">            for: 5m</span></span>
<span class="line"><span style="color:#98C379;">            labels: { severity: 严重 }</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;Pod CrashLoopBackOff&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;namespace={{ $labels.namespace }} pod={{ $labels.pod }} container={{ $labels.container }} 发生 CrashLoopBackOff。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 镜像拉取失败</span></span>
<span class="line"><span style="color:#98C379;">            expr: kube_pod_container_status_waiting_reason{reason=~&quot;ImagePullBackOff|ErrImagePull&quot;} == 1</span></span>
<span class="line"><span style="color:#98C379;">            for: 5m</span></span>
<span class="line"><span style="color:#98C379;">            labels: { severity: 严重 }</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;镜像拉取失败&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;namespace={{ $labels.namespace }} pod={{ $labels.pod }} container={{ $labels.container }} 镜像拉取失败。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: Pod频繁重启</span></span>
<span class="line"><span style="color:#98C379;">            expr: increase(kube_pod_container_status_restarts_total[30m]) &gt; 3</span></span>
<span class="line"><span style="color:#98C379;">            for: 5m</span></span>
<span class="line"><span style="color:#98C379;">            labels: { severity: 警告 }</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;Pod重启次数过多&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;namespace={{ $labels.namespace }} pod={{ $labels.pod }} container={{ $labels.container }} 30分钟内重启&gt;3次。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: Pod未就绪</span></span>
<span class="line"><span style="color:#98C379;">            expr: kube_pod_status_ready{condition=&quot;true&quot;} == 0 and kube_pod_status_phase{phase=~&quot;Running|Pending|Unknown&quot;} == 1</span></span>
<span class="line"><span style="color:#98C379;">            for: 10m</span></span>
<span class="line"><span style="color:#98C379;">            labels: { severity: 警告 }</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;Pod长时间未Ready&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;namespace={{ $labels.namespace }} pod={{ $labels.pod }} 持续10分钟未Ready，请检查探针/依赖/资源。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">      # ==================================================</span></span>
<span class="line"><span style="color:#98C379;">      # 5) Workload 层（Deployment/StatefulSet/DaemonSet）</span></span>
<span class="line"><span style="color:#98C379;">      # ==================================================</span></span>
<span class="line"><span style="color:#98C379;">      - name: Workload副本与发布</span></span>
<span class="line"><span style="color:#98C379;">        rules:</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: Deployment副本不足</span></span>
<span class="line"><span style="color:#98C379;">            expr: kube_deployment_status_replicas_available &lt; kube_deployment_spec_replicas</span></span>
<span class="line"><span style="color:#98C379;">            for: 10m</span></span>
<span class="line"><span style="color:#98C379;">            labels: { severity: 警告 }</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;Deployment副本不足&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;namespace={{ $labels.namespace }} deployment={{ $labels.deployment }} 可用副本低于期望值。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: StatefulSet副本不足</span></span>
<span class="line"><span style="color:#98C379;">            expr: kube_statefulset_status_replicas_ready &lt; kube_statefulset_spec_replicas</span></span>
<span class="line"><span style="color:#98C379;">            for: 10m</span></span>
<span class="line"><span style="color:#98C379;">            labels: { severity: 警告 }</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;StatefulSet副本不足&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;namespace={{ $labels.namespace }} statefulset={{ $labels.statefulset }} 就绪副本不足。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: DaemonSet调度异常</span></span>
<span class="line"><span style="color:#98C379;">            expr: kube_daemonset_status_number_misscheduled &gt; 0 or kube_daemonset_status_desired_number_scheduled != kube_daemonset_status_current_number_scheduled</span></span>
<span class="line"><span style="color:#98C379;">            for: 10m</span></span>
<span class="line"><span style="color:#98C379;">            labels: { severity: 警告 }</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;DaemonSet调度异常&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;namespace={{ $labels.namespace }} daemonset={{ $labels.daemonset }} 调度数量不一致或存在误调度。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">      # ==================================================</span></span>
<span class="line"><span style="color:#98C379;">      # 6) 调度与容量（Pending/资源逼近）</span></span>
<span class="line"><span style="color:#98C379;">      # ==================================================</span></span>
<span class="line"><span style="color:#98C379;">      - name: 调度与容量风险</span></span>
<span class="line"><span style="color:#98C379;">        rules:</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: Pod长时间Pending</span></span>
<span class="line"><span style="color:#98C379;">            expr: kube_pod_status_phase{phase=&quot;Pending&quot;} == 1</span></span>
<span class="line"><span style="color:#98C379;">            for: 10m</span></span>
<span class="line"><span style="color:#98C379;">            labels: { severity: 警告 }</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;Pod长时间Pending&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;namespace={{ $labels.namespace }} pod={{ $labels.pod }} Pending超过10分钟，可能资源不足或约束不满足。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 集群CPURequests接近耗尽</span></span>
<span class="line"><span style="color:#98C379;">            expr: (sum(kube_pod_container_resource_requests{resource=&quot;cpu&quot;}) / sum(kube_node_status_allocatable{resource=&quot;cpu&quot;})) * 100 &gt; 90</span></span>
<span class="line"><span style="color:#98C379;">            for: 10m</span></span>
<span class="line"><span style="color:#98C379;">            labels: { severity: 警告 }</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;集群CPU requests接近耗尽&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;当前CPU requests占比: {{ printf &quot;%.2f&quot; $value }}%，阈值: 90%，持续: 10分钟。&#39;</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">          - alert: 集群内存Requests接近耗尽</span></span>
<span class="line"><span style="color:#98C379;">            expr: (sum(kube_pod_container_resource_requests{resource=&quot;memory&quot;}) / sum(kube_node_status_allocatable{resource=&quot;memory&quot;})) * 100 &gt; 90</span></span>
<span class="line"><span style="color:#98C379;">            for: 10m</span></span>
<span class="line"><span style="color:#98C379;">            labels: { severity: 警告 }</span></span>
<span class="line"><span style="color:#98C379;">            annotations:</span></span>
<span class="line"><span style="color:#98C379;">              summary: &#39;集群内存 requests接近耗尽&#39;</span></span>
<span class="line"><span style="color:#98C379;">              description: &#39;当前内存 requests占比: {{ printf &quot;%.2f&quot; $value }}%，阈值: 90%，持续: 10分钟。&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-部署prometheus的告警规则" tabindex="-1"><a class="header-anchor" href="#_7-2-部署prometheus的告警规则"><span>7.2 部署Prometheus的告警规则</span></a></h3><ul><li>部署Prometheus的告警规则</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> kubernetes_rules.yml</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li>查看告警规则是否部署成功</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> cm</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> monitoring</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202048745.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_7-3-挂载告警规则到prometheus-deployment中" tabindex="-1"><a class="header-anchor" href="#_7-3-挂载告警规则到prometheus-deployment中"><span>7.3 挂载告警规则到Prometheus Deployment中</span></a></h3><p>修改<code>Prometheus</code>部署yaml，添加configmap挂载</p><ul><li><code>vi prometheus-deploy.yaml</code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">        volumeMounts</span><span style="color:#ABB2BF;">: </span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus-rules</span></span>
<span class="line"><span style="color:#E06C75;">          mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/etc/prometheus/rules/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">########################## 中间内容省略 ###########################</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E06C75;">      volumes</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus-rules</span></span>
<span class="line"><span style="color:#E06C75;">        configMap</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">prometheus-kubernetes-rules-configmap</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202046400.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_7-4-重新加载prometheus-deployment" tabindex="-1"><a class="header-anchor" href="#_7-4-重新加载prometheus-deployment"><span>7.4 重新加载Prometheus deployment</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> prometheus-deploy.yaml</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>等待一会，进行重启服务。。。</p><h3 id="_7-5-进入prometheus页面进行查看监控指标" tabindex="-1"><a class="header-anchor" href="#_7-5-进入prometheus页面进行查看监控指标"><span>7.5 进入Prometheus页面进行查看监控指标</span></a></h3><blockquote><p><code>node ip:30090/alerts</code>，如下可以查看到指标则没问题</p></blockquote><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202044087.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="完成" tabindex="-1"><a class="header-anchor" href="#完成"><span>完成！！！</span></a></h2>`,191)])])}const r=n(p,[["render",i]]),t=JSON.parse('{"path":"/document/monitor/Prometheus/k8s%E9%83%A8%E7%BD%B2Prometheus%20_%20node_exporter%20_%20Grafana%20_%20Alertmanager.html","title":"k8s部署Prometheus + node_exporter + Grafana + Alertmanager","lang":"zh-CN","frontmatter":{"title":"k8s部署Prometheus + node_exporter + Grafana + Alertmanager","icon":"circle-info","order":1,"category":["Linux","Prometheus","Kubernetes"],"tag":["Linux","Prometheus","Grafana","Alertmanager","node_exporter","Kubernetes","运维"],"pageview":false,"date":"2026-02-26T00:00:00.000Z","comment":false,"breadcrumb":false,"isOriginal":true,"description":"👨‍🎓博主简介 🏅CSDN博客专家 🏅云计算领域优质创作者 🏅华为云开发者社区专家博主 🏅阿里云开发者社区专家博主 💊交流社区：运维交流社区 欢迎大家的加入！ 🐋 希望大家多多支持，我们一起进步！😄 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗 一、前言 需提前搭建好Kubernetes集群，...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"k8s部署Prometheus + node_exporter + Grafana + Alertmanager\\",\\"image\\":[\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202705513.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202702175.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202629122.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202625583.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202623150.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202613718.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202609097.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202547573.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202544674.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202527723.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202450328.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202448244.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202439185.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202437420.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202421543.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202419338.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202351287.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202349155.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202400188.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202344347.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202325887.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202324098.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202157725.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202155738.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202138640.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202125019.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202048745.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202046400.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202044087.png\\"],\\"datePublished\\":\\"2026-02-26T00:00:00.000Z\\",\\"dateModified\\":\\"2026-03-01T12:55:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"𝑴𝒓.𝑳𝒊𝒖𝒄𝒚\\",\\"url\\":\\"http://liuchenyang.top\\"}]}"],["meta",{"property":"og:url","content":"http://liuchenyang.top/ToLiucyLinux/document/monitor/Prometheus/k8s%E9%83%A8%E7%BD%B2Prometheus%20_%20node_exporter%20_%20Grafana%20_%20Alertmanager.html"}],["meta",{"property":"og:site_name","content":"ToLiucyLinux"}],["meta",{"property":"og:title","content":"k8s部署Prometheus + node_exporter + Grafana + Alertmanager"}],["meta",{"property":"og:description","content":"👨‍🎓博主简介 🏅CSDN博客专家 🏅云计算领域优质创作者 🏅华为云开发者社区专家博主 🏅阿里云开发者社区专家博主 💊交流社区：运维交流社区 欢迎大家的加入！ 🐋 希望大家多多支持，我们一起进步！😄 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗 一、前言 需提前搭建好Kubernetes集群，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20260301202705513.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-03-01T12:55:16.000Z"}],["meta",{"property":"article:tag","content":"运维"}],["meta",{"property":"article:tag","content":"Kubernetes"}],["meta",{"property":"article:tag","content":"node_exporter"}],["meta",{"property":"article:tag","content":"Alertmanager"}],["meta",{"property":"article:tag","content":"Grafana"}],["meta",{"property":"article:tag","content":"Prometheus"}],["meta",{"property":"article:tag","content":"Linux"}],["meta",{"property":"article:published_time","content":"2026-02-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2026-03-01T12:55:16.000Z"}]]},"git":{"createdTime":1772369101000,"updatedTime":1772369716000,"contributors":[{"name":"liuchenyang","username":"liuchenyang","email":"2162059863@qq.com","commits":2,"url":"https://github.com/liuchenyang"}]},"readingTime":{"minutes":24,"words":7200},"filePathRelative":"document/monitor/Prometheus/k8s部署Prometheus + node_exporter + Grafana + Alertmanager.md","excerpt":"<blockquote>\\n<p>👨‍🎓<strong>博主简介</strong></p>\\n<p>  🏅<a href=\\"https://blog.csdn.net/liu_chen_yang?type=blog\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">CSDN博客专家</a><br>\\n  🏅<a href=\\"https://blog.csdn.net/liu_chen_yang?type=blog\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">云计算领域优质创作者</a><br>\\n  🏅<a href=\\"https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">华为云开发者社区专家博主</a><br>\\n  🏅<a href=\\"https://developer.aliyun.com/profile/7yu26jk3lfqxg\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">阿里云开发者社区专家博主</a><br>\\n💊<strong>交流社区：</strong><a href=\\"https://bbs.csdn.net/forums/lcy\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">运维交流社区</a> 欢迎大家的加入！<br>\\n🐋 希望大家多多支持，我们一起进步！😄<br>\\n🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗</p>\\n</blockquote>","copyright":"著作权归 Mr.Liucy 所有，本站内容遵循 MIT 协议，转载请注明出处。\\n原文链接：https://liuchenyang.top/document/monitor/Prometheus/k8s%E9%83%A8%E7%BD%B2Prometheus%20_%20node_exporter%20_%20Grafana%20_%20Alertmanager.html","autoDesc":true}');export{r as comp,t as data};
