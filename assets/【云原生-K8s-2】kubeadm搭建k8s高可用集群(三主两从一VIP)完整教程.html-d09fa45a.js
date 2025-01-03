import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as r,c as p,a as s,b as n,d as e,w as a,e as t}from"./app-bccf5941.js";const u={},m=s("p",null,[n("🍁"),s("strong",null,"博主简介")],-1),v={href:"https://blog.csdn.net/liu_chen_yang?type=blog",target:"_blank",rel:"noopener noreferrer"},b=s("br",null,null,-1),k={href:"https://bbs.huaweicloud.com/community/myblog",target:"_blank",rel:"noopener noreferrer"},h=s("br",null,null,-1),g={href:"https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz",target:"_blank",rel:"noopener noreferrer"},_=s("br",null,null,-1),f=s("strong",null,"交流社区：",-1),y={href:"https://bbs.csdn.net/forums/lcy",target:"_blank",rel:"noopener noreferrer"},x=t(`<h2 id="kubernetes高可用集群部署" tabindex="-1"><a class="header-anchor" href="#kubernetes高可用集群部署" aria-hidden="true">#</a> Kubernetes高可用集群部署</h2><h2 id="准备工作-所有节点都要做同样的操作" tabindex="-1"><a class="header-anchor" href="#准备工作-所有节点都要做同样的操作" aria-hidden="true">#</a> 准备工作（所有节点都要做同样的操作）</h2><h3 id="服务器配置" tabindex="-1"><a class="header-anchor" href="#服务器配置" aria-hidden="true">#</a> 服务器配置</h3><table><thead><tr><th>高可用集群（三主两从一VIP）</th><th>主机名</th><th>ip地址</th><th>配置</th><th>需要用到的服务</th></tr></thead><tbody><tr><td>主</td><td>k8s-master1</td><td>172.16.11.215</td><td>2C/2G/50G</td><td>kubeadm,docker,keepalived,haproxy</td></tr><tr><td>主</td><td>k8s-master2</td><td>172.16.11.216</td><td>2C/2G/50G</td><td>kubeadm,docker,keepalived,haproxy</td></tr><tr><td>主</td><td>k8s-master3</td><td>172.16.11.217</td><td>2C/2G/50G</td><td>kubeadm,docker,keepalived,haproxy</td></tr><tr><td>从</td><td>k8s-node1</td><td>172.16.11.218</td><td>2C/2G/50G</td><td>kubeadm,docker</td></tr><tr><td>从</td><td>k8s-node2</td><td>172.16.11.219</td><td>2C/2G/50G</td><td>kubeadm,docker</td></tr><tr><td>VIP</td><td>k8s-vip</td><td>172.16.11.220</td><td>2C/1G/50G</td><td>什么都不用装</td></tr></tbody></table><h3 id="关闭防火墙" tabindex="-1"><a class="header-anchor" href="#关闭防火墙" aria-hidden="true">#</a> 关闭防火墙</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl stop firewalld <span class="token operator">&amp;&amp;</span> systemctl disable firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果在线上服务器之类的不能关闭防火墙，那就需要开启几个端口；（这里说的是k8所用到的端口）</p><ul><li>master节点:</li></ul><table><thead><tr><th>规则</th><th>端口范围</th><th>作用</th><th>使用者</th></tr></thead><tbody><tr><td>TCP</td><td>6443*</td><td>Kubernetes API server</td><td>All</td></tr><tr><td>TCP</td><td>2379-2380</td><td>etcd server client API</td><td>kube-apiserver, etcd</td></tr><tr><td>TCP</td><td>10250</td><td>Kubelet API</td><td>Self, Control plane</td></tr><tr><td>TCP</td><td>10251</td><td>kube-scheduler</td><td>Self</td></tr><tr><td>TCP</td><td>10252</td><td>kube-controller-manager</td><td>Self</td></tr></tbody></table><ul><li>node节点：</li></ul><table><thead><tr><th>规则</th><th>端口范围</th><th>作用</th><th>使用者</th></tr></thead><tbody><tr><td>TCP</td><td>10252</td><td>Kubelet API</td><td>Self, Control plane</td></tr><tr><td>TCP</td><td>30000-32767</td><td>NodePort Services**</td><td>All</td></tr></tbody></table><h3 id="关闭selinux" tabindex="-1"><a class="header-anchor" href="#关闭selinux" aria-hidden="true">#</a> 关闭selinux</h3><p>临时关闭selinux（沙河）如需永久关闭selinux需要修改为<code>sed -i &#39;s/^SELINUX=enforcing$/SELINUX=disabled/&#39; /etc/selinux/config</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#临时关闭selinux</span>
setenforce <span class="token number">0</span>

<span class="token comment">#永久关闭selinux</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^SELINUX=enforcing$/SELINUX=permissive/&#39;</span> /etc/selinux/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关闭交换分区" tabindex="-1"><a class="header-anchor" href="#关闭交换分区" aria-hidden="true">#</a> 关闭交换分区</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#临时关闭所有的交换分区</span>
swapoff <span class="token parameter variable">-a</span>

<span class="token comment">#永久关闭所有的交换分区</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;/swap/s/^\\(.*\\)$/#\\1/g&#39;</span> /etc/fstab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改六台高可用集群的主机名-每个主机限一条命令" tabindex="-1"><a class="header-anchor" href="#修改六台高可用集群的主机名-每个主机限一条命令" aria-hidden="true">#</a> 修改六台高可用集群的主机名：（每个主机限一条命令）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># hostnamectl set-hostname k8s-master1</span>
<span class="token punctuation">[</span>root@k8s-master2 ~<span class="token punctuation">]</span><span class="token comment"># hostnamectl set-hostname k8s-master2</span>
<span class="token punctuation">[</span>root@k8s-master3 ~<span class="token punctuation">]</span><span class="token comment"># hostnamectl set-hostname k8s-master3</span>
<span class="token punctuation">[</span>root@k8s-node1 ~<span class="token punctuation">]</span><span class="token comment"># hostnamectl set-hostname k8s-node1</span>
<span class="token punctuation">[</span>root@k8s-node2 ~<span class="token punctuation">]</span><span class="token comment"># hostnamectl set-hostname k8s-node2</span>
<span class="token punctuation">[</span>root@k8s-vip ~<span class="token punctuation">]</span><span class="token comment"># hostnamectl set-hostname k8s-vip</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="所有节点都添加集群ip与主机名到hosts中" tabindex="-1"><a class="header-anchor" href="#所有节点都添加集群ip与主机名到hosts中" aria-hidden="true">#</a> 所有节点都添加集群ip与主机名到hosts中：</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/hosts <span class="token operator">&lt;&lt;</span> <span class="token string">EOF 
172.16.11.215 k8s-master1
172.16.11.216 k8s-master2
172.16.11.217 k8s-master3
172.16.11.218 k8s-node1
172.16.11.219 k8s-node2
172.16.11.220 k8s-vip
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),q=t(`<h3 id="六台机器进行时间同步" tabindex="-1"><a class="header-anchor" href="#六台机器进行时间同步" aria-hidden="true">#</a> 六台机器进行时间同步</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#安裝同步时间命令</span>
yum <span class="token function">install</span> ntpdate <span class="token parameter variable">-y</span>

<span class="token comment">#同步时间</span>
ntpdate cn.pool.ntp.org

<span class="token comment">#设置定时任务每五分钟同步一次时间</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;*/5 * * * * root /usr/sbin/ntpdate cn.pool.ntp.org &amp;&gt;/dev/null&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/crontab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="特殊说明" tabindex="-1"><a class="header-anchor" href="#特殊说明" aria-hidden="true">#</a> 特殊说明:</h3>`,3),C=t(`<h3 id="六台都安装需要的一些命令" tabindex="-1"><a class="header-anchor" href="#六台都安装需要的一些命令" aria-hidden="true">#</a> 六台都安装需要的一些命令：</h3><ul><li>添加centos源并将下载地址更换为阿里云地址</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#添加centos源</span>
<span class="token function">curl</span> <span class="token parameter variable">-o</span> /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo

<span class="token comment">#将下载地址更换为阿里云地址</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;/mirrors.cloud.aliyuncs.com/d&#39;</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;/mirrors.aliyuncs.com/d&#39;</span> /etc/yum.repos.d/CentOS-Base.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>添加epel扩展源</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-o</span> /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>清除缓存</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum clean all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>重新加载源缓存</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum makecache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>升级yum并安装一些会用到的命令</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> update <span class="token operator">&amp;&amp;</span> yum <span class="token parameter variable">-y</span> <span class="token function">install</span> lrzsz <span class="token function">wget</span> conntrack ipvsadm ipset jq psmisc sysstat <span class="token function">curl</span> iptables net-tools libseccomp gcc gcc-c++ yum-utils device-mapper-persistent-data lvm2 bash-completion sshpass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装需要一些时间，就等待安装即可；</p><h3 id="调整能打开文件数大小" tabindex="-1"><a class="header-anchor" href="#调整能打开文件数大小" aria-hidden="true">#</a> 调整能打开文件数大小</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># ulimit -SHn 65535</span>

<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># cat &gt;&gt; /etc/security/limits.conf &lt;&lt; EOF </span>
* soft nofile <span class="token number">655360</span>
* hard nofile <span class="token number">131072</span>
* soft nproc <span class="token number">65535</span>
* hard nproc <span class="token number">655350</span>
* soft memlock unlimited
* hard memlock unlimited
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>补充说明:</p><blockquote><p>ulimit用于限制shell启动进程所占用的资源，支持以下各种类型的限制：所创建的内核文件的大小、进程数据块的大小、shell<br> 进程创建文件的大小、内存锁住的大小、常驻内存集的大小、打开文件描述符的数量、分配堆栈的最大大小、CPU<br> 时间、单个用户的最大线程数、Shell 进程所能使用的最大虚拟内存。同时，它支持硬资源和软资源的限制。<br> hard:严格的设定，必定不能超过这个设定的数值 soft:警告的设定，可以超过这个设定值，但是若超过则有警告信息 限制资源:</p><ul><li>core – 限制内核文件的大小</li><li>date – 最大数据大小</li><li>fsize – 最大文件大小</li><li>memlock – 最大锁定内存地址空间</li><li>nofile – 打开文件的最大数目</li><li>rss – 最大持久设置大小</li><li>stack – 最大栈大小</li><li>cpu – 以分钟为单位的最多 CPU 时间</li><li>noproc – 进程的最大数目（系统的最大进程数）</li><li>as – 地址空间限制 maxlogins – 此用户允许登录的最大数目</li></ul></blockquote><h3 id="安装配置ipvsadm" tabindex="-1"><a class="header-anchor" href="#安装配置ipvsadm" aria-hidden="true">#</a> 安装配置ipvsadm</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#安装所需的命令（上面已经全部安装了，可以不用管）</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># yum -y install ipvsadm ipset sysstat conntrack libseccomp</span>

<span class="token comment">#加载ipvs相关模块</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># modprobe -- ip_vs</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># modprobe -- ip_vs_rr</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># modprobe -- ip_vs_wrr</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># modprobe -- ip_vs_sh</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># modprobe -- nf_conntrack_ipv4</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># cat &gt; /etc/modules-load.d/ipvs.conf &lt;&lt; EOF</span>
ip_vs
ip_vs_lc
ip_vs_wlc
ip_vs_rr
ip_vs_wrr
ip_vs_lblc
ip_vs_lblcr
ip_vs_dh
ip_vs_sh
ip_vs_nq
ip_vs_sed
ip_vs_ftp
ip_vs_sh
nf_conntrack_ipv4
ip_tables
ip_set
xt_set
ipt_set
ipt_rpfilter
ipt_REJECT
ipip
EOF

<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># systemctl enable --now systemd-modules-load.service</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="高可用集群设置免密登录-在-master1-节点上操作" tabindex="-1"><a class="header-anchor" href="#高可用集群设置免密登录-在-master1-节点上操作" aria-hidden="true">#</a> 高可用集群设置免密登录（在 master1 节点上操作）</h3><blockquote><p>在<code>master1</code>节点免密钥登录其他节点，安装过程中生成配置文件和证书均在master1上操作，集群管理也在master11上操作，阿里云或者AWS上需要单独一台kubectl服务器。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#生成密钥</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># ssh-keygen -t rsa -P &#39;&#39; -f /root/.ssh/id_rsa &amp;&gt; /dev/null</span>
<span class="token comment">#循环给高可用集群进行免密设置</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># for i in k8s-master1 k8s-master2 k8s-master3 k8s-node1 k8s-node2;do sshpass -p &#39;123123&#39; ssh-copy-id -o StrictHostKeyChecking=&#39;no&#39; -i .ssh/id_rsa.pub $i;done</span>

<span class="token comment">#完成之后最好测试以下免密登录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下图就属于成功；</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161408023.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="部署-docker-所有节点都需要部署" tabindex="-1"><a class="header-anchor" href="#部署-docker-所有节点都需要部署" aria-hidden="true">#</a> 部署 docker（所有节点都需要部署）</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#安装docker所需的依赖包</span>
<span class="token punctuation">[</span>root@docker ~<span class="token punctuation">]</span><span class="token comment"># yum install -y yum-utils device-mapper-persistent-data lvm2	</span>

<span class="token comment">#添加阿里云的docker镜像地址</span>
<span class="token punctuation">[</span>root@docker ~<span class="token punctuation">]</span><span class="token comment"># sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span>
<span class="token operator">&amp;&amp;</span><span class="token comment">#或者（二选一即可）</span>
<span class="token punctuation">[</span>root@docker ~<span class="token punctuation">]</span><span class="token comment"># wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d/docker-ce.repo</span>

<span class="token comment">#更新缓存，只处理新添加的yum源缓存</span>
<span class="token punctuation">[</span>root@docker ~<span class="token punctuation">]</span><span class="token comment"># yum makecache fast</span>

<span class="token comment">#部署docker，默认安装最新版本</span>
<span class="token punctuation">[</span>root@docker ~<span class="token punctuation">]</span><span class="token comment"># yum install -y docker-ce-20.10.14 docker-ce-cli-20.10.14 containerd.io</span>

<span class="token comment">#查看安装docker版本</span>
<span class="token punctuation">[</span>root@docker ~<span class="token punctuation">]</span><span class="token comment"># docker --version(或者使用docker version)</span>
Docker version <span class="token number">20.10</span>.14, build a224086

<span class="token comment">#加载docker配置</span>
<span class="token punctuation">[</span>root@docker ~<span class="token punctuation">]</span><span class="token comment"># systemctl daemon-reload</span>
<span class="token comment">#启动docker服务并设置开机自启</span>
<span class="token punctuation">[</span>root@docker ~<span class="token punctuation">]</span><span class="token comment"># systemctl start docker &amp;&amp; systemctl enable docker</span>

<span class="token comment">#查看docker可以安装的版本，也可以自己安装指定版本，yum -y install docker-ce-19.03.12.el7</span>
<span class="token punctuation">[</span>root@docker ~<span class="token punctuation">]</span><span class="token comment"># yum list docker-ce --showduplicates | sort -r</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="给docker添加镜像加速器及cgroup并重启docker服务" tabindex="-1"><a class="header-anchor" href="#给docker添加镜像加速器及cgroup并重启docker服务" aria-hidden="true">#</a> 给docker添加镜像加速器及cgroup并重启docker服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@docker ~<span class="token punctuation">]</span><span class="token comment"># mkdir -p /etc/docker</span>
<span class="token punctuation">[</span>root@docker ~<span class="token punctuation">]</span><span class="token comment"># tee /etc/docker/daemon.json &lt;&lt;-&#39;EOF&#39;</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;registry-mirrors&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;https://mrlmpasq.mirror.aliyuncs.com&quot;</span><span class="token punctuation">]</span>,
  <span class="token string">&quot;exec-opts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;native.cgroupdriver=systemd&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
EOF
<span class="token comment">#由于新版kubelet建议使用systemd，所以可以把docker的CgroupDriver改成systemd</span>

<span class="token comment">#重新加载docker配置</span>
<span class="token punctuation">[</span>root@docker ~<span class="token punctuation">]</span><span class="token comment"># systemctl daemon-reload</span>
<span class="token comment">#重新启动docker服务</span>
<span class="token punctuation">[</span>root@docker ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker部署完成" tabindex="-1"><a class="header-anchor" href="#docker部署完成" aria-hidden="true">#</a> docker部署完成</h3><h2 id="部署-kubernetes-所有节点都要部署" tabindex="-1"><a class="header-anchor" href="#部署-kubernetes-所有节点都要部署" aria-hidden="true">#</a> 部署 kubernetes（所有节点都要部署）</h2><h3 id="配置相关的内核参数" tabindex="-1"><a class="header-anchor" href="#配置相关的内核参数" aria-hidden="true">#</a> 配置相关的内核参数</h3><p>将桥接的IPv4 流量传递到iptables 的链</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> /etc/sysctl.d/k8s.conf</span>
net.ipv4.ip_forward = 1
net.bridge.bridge-nf-call-iptables = 1
net.bridge.bridge-nf-call-ip6tables = 1
fs.may_detach_mounts = 1
vm.overcommit_memory=1
vm.panic_on_oom=0
fs.inotify.max_user_watches=89100
fs.file-max=52706963
fs.nr_open=52706963
net.netfilter.nf_conntrack_max=2310720
net.ipv4.tcp_keepalive_time = 600
net.ipv4.tcp_keepalive_probes = 3
net.ipv4.tcp_keepalive_intvl =15
net.ipv4.tcp_max_tw_buckets = 36000
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_max_orphans = 327680
net.ipv4.tcp_orphan_retries = 3
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 16384
net.ipv4.ip_conntrack_max = 65536
net.ipv4.tcp_max_syn_backlog = 16384
net.ipv4.tcp_timestamps = 0
net.core.somaxconn = 16384
EOF</span>

<span class="token comment">#让其生效</span>
<span class="token function">sysctl</span> <span class="token parameter variable">--system</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加-k8s-yum源" tabindex="-1"><a class="header-anchor" href="#添加-k8s-yum源" aria-hidden="true">#</a> 添加 k8s yum源</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@docker ~<span class="token punctuation">]</span><span class="token comment"># cat &gt; /etc/yum.repos.d/kubernetes.repo &lt;&lt; EOF</span>
<span class="token punctuation">[</span>kubernetes<span class="token punctuation">]</span>
<span class="token assign-left variable">name</span><span class="token operator">=</span>Kubernetes
<span class="token assign-left variable">baseurl</span><span class="token operator">=</span>https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
<span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">gpgcheck</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token assign-left variable">repo_gpgcheck</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token assign-left variable">gpgkey</span><span class="token operator">=</span>https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

<span class="token comment">#重新加载缓存</span>
yum makecache fast
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装-kubeadm-kubelet-kubectl" tabindex="-1"><a class="header-anchor" href="#安装-kubeadm-kubelet-kubectl" aria-hidden="true">#</a> 安装 kubeadm kubelet kubectl</h3><blockquote><p>注：安装这几个版本不要用最新的，容易出问题</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubeadm-1.20.0-0 kubelet-1.20.0-0 kubectl-1.20.0-0

<span class="token comment">#查看kubeadm版本</span>
kubeadm version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>启动kubelet并设置开机自启</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> kubelet <span class="token operator">&amp;&amp;</span> systemctl start kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="kubernetes强化tab-安装之后会tab可以补全命令及参数" tabindex="-1"><a class="header-anchor" href="#kubernetes强化tab-安装之后会tab可以补全命令及参数" aria-hidden="true">#</a> kubernetes强化tab（安装之后会tab可以补全命令及参数）</h3><ul><li>配置环境</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;source  &lt;(kubectl  completion  bash)&#39;</span> <span class="token operator">&gt;&gt;</span> ~/.bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>1、退出连接，重新连接；<br> 2、或者<code>bash</code>更新环境就可以使用了。</p></blockquote>`,43),w={id:"部署keepalived、haproxy-配置高可用-所有-主节点-部署",tabindex:"-1"},E=s("a",{class:"header-anchor",href:"#部署keepalived、haproxy-配置高可用-所有-主节点-部署","aria-hidden":"true"},"#",-1),P=s("blockquote",null,[s("p",null,[n("  这里使用高可用和负载的组件为haproxy和keepalived，如果kubernets不是高可用架构，可以不做haproxy与keepalived。如果是公有云平台部署可以选择公用云自带的负载均衡来代替haproxy和keepalived，比如阿里云的SLB,或者腾讯云的ELB("),s("code",null,"大部分公有云不支持keepalived"),n(")。如果使用的是阿里云，kubectl控制端不能放在master节点，因为阿里云SLB有回环问题，也就是说SLB代理的服务器不能反向访问这个问题，但是腾讯云修复了这个问题。")])],-1),S=s("hr",null,null,-1),I=t(`<hr><ul><li>安装 keepalived 和 haproxy</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> keepalived haproxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,3),A={id:"所有-主节点-修改haproxy配置",tabindex:"-1"},O=s("a",{class:"header-anchor",href:"#所有-主节点-修改haproxy配置","aria-hidden":"true"},"#",-1),T=t(`<blockquote><p>最后的<code>server</code>改为自己的主节点ip</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/haproxy/haproxy.cfg</span>
global
  maxconn  <span class="token number">2000</span>
  ulimit-n  <span class="token number">16384</span>
  log  <span class="token number">127.0</span>.0.1 local0 err
  stats <span class="token function">timeout</span> 30s

defaults
  log global
  mode  http
  option  httplog
  <span class="token function">timeout</span> connect <span class="token number">5000</span>
  <span class="token function">timeout</span> client  <span class="token number">50000</span>
  <span class="token function">timeout</span> server  <span class="token number">50000</span>
  <span class="token function">timeout</span> http-request 15s
  <span class="token function">timeout</span> http-keep-alive 15s

frontend monitor-in
  <span class="token builtin class-name">bind</span> *:33305
  mode http
  option httplog
  monitor-uri /monitor

frontend k8s-master
  <span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0:16443
  <span class="token builtin class-name">bind</span> <span class="token number">127.0</span>.0.1:16443
  mode tcp
  option tcplog
  tcp-request inspect-delay 5s
  default_backend k8s-master

backend k8s-master
  mode tcp
  option tcplog
  option tcp-check
  balance roundrobin
  default-server inter 10s downinter 5s rise <span class="token number">2</span> fall <span class="token number">2</span> slowstart 60s maxconn <span class="token number">250</span> maxqueue <span class="token number">256</span> weight <span class="token number">100</span>
  server k8s-master1	<span class="token number">172.16</span>.11.215:6443  check
  server k8s-master2	<span class="token number">172.16</span>.11.216:6443  check
  server k8s-master3	<span class="token number">172.16</span>.11.217:6443  check
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),j={id:"所有-主节点-配置keepalived-一个一个配置",tabindex:"-1"},D=s("a",{class:"header-anchor",href:"#所有-主节点-配置keepalived-一个一个配置","aria-hidden":"true"},"#",-1),V=t(`<ul><li>k8s-master1节点配置</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/keepalived/keepalived.conf </span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/keepalived/keepalived.conf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>需要修改的地方有：（都需要根据自己的实际数值来改）<br> ◎　interface      #网卡名称<br> ◎　mcast_src_ip    #该节点的ip<br> ◎　virtual_ipaddress   #vip地址</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">!</span> Configuration File <span class="token keyword">for</span> keepalived
global_defs <span class="token punctuation">{</span>
    router_id LVS_DEVEL
script_user root
    enable_script_security
<span class="token punctuation">}</span>
vrrp_script chk_apiserver <span class="token punctuation">{</span>
    script <span class="token string">&quot;/etc/keepalived/check_apiserver.sh&quot;</span>
    interval <span class="token number">5</span>
    weight <span class="token parameter variable">-5</span>
    fall <span class="token number">2</span>  
    rise <span class="token number">1</span>
<span class="token punctuation">}</span>
vrrp_instance VI_1 <span class="token punctuation">{</span>
    state MASTER					<span class="token comment">#高可用主1</span>
    interface eth0					<span class="token comment">#网卡名称</span>
    mcast_src_ip <span class="token number">172.16</span>.11.215		<span class="token comment">#该节点 IP</span>
    virtual_router_id <span class="token number">51</span>
    priority <span class="token number">101</span>				<span class="token comment">#设置最高级优先级</span>
    advert_int <span class="token number">2</span>
    authentication <span class="token punctuation">{</span>
        auth_type PASS
        auth_pass K8SHA_KA_AUTH
    <span class="token punctuation">}</span>
    virtual_ipaddress <span class="token punctuation">{</span>
        <span class="token number">172.16</span>.11.220			<span class="token comment">#vip地址</span>
    <span class="token punctuation">}</span>
    track_script <span class="token punctuation">{</span>
       chk_apiserver
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>k8s-master2节点配置</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master2 ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/keepalived/keepalived.conf </span>
<span class="token punctuation">[</span>root@k8s-master2 ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/keepalived/keepalived.conf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>需要修改的地方有：（都需要根据自己的实际数值来改）<br> ◎　interface      #网卡名称<br> ◎　mcast_src_ip    #该节点的ip<br> ◎　virtual_ipaddress   #vip地址</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">!</span> Configuration File <span class="token keyword">for</span> keepalived
global_defs <span class="token punctuation">{</span>
    router_id LVS_DEVEL
script_user root
    enable_script_security
<span class="token punctuation">}</span>
vrrp_script chk_apiserver <span class="token punctuation">{</span>
    script <span class="token string">&quot;/etc/keepalived/check_apiserver.sh&quot;</span>
    interval <span class="token number">5</span>
    weight <span class="token parameter variable">-5</span>
    fall <span class="token number">2</span>  
    rise <span class="token number">1</span>
<span class="token punctuation">}</span>
vrrp_instance VI_1 <span class="token punctuation">{</span>
    state BACKUP					<span class="token comment">#高可用从1</span>
    interface eth0					<span class="token comment">#网卡名称</span>
    mcast_src_ip <span class="token number">172.16</span>.11.216		<span class="token comment">#该节点 IP</span>
    virtual_router_id <span class="token number">51</span>
    priority <span class="token number">100</span>				<span class="token comment">#设置优先级</span>
    advert_int <span class="token number">2</span>
    authentication <span class="token punctuation">{</span>
        auth_type PASS
        auth_pass K8SHA_KA_AUTH
    <span class="token punctuation">}</span>
    virtual_ipaddress <span class="token punctuation">{</span>
        <span class="token number">172.16</span>.11.220			<span class="token comment">#vip地址</span>
    <span class="token punctuation">}</span>
    track_script <span class="token punctuation">{</span>
       chk_apiserver
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>k8s-master3节点配置</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master3 ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/keepalived/keepalived.conf </span>
<span class="token punctuation">[</span>root@k8s-master3 ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/keepalived/keepalived.conf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>需要修改的地方有：（都需要根据自己的实际数值来改）<br> ◎　interface      #网卡名称<br> ◎　mcast_src_ip    #该节点的ip<br> ◎　virtual_ipaddress   #vip地址</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">!</span> Configuration File <span class="token keyword">for</span> keepalived
global_defs <span class="token punctuation">{</span>
    router_id LVS_DEVEL
script_user root
    enable_script_security
<span class="token punctuation">}</span>
vrrp_script chk_apiserver <span class="token punctuation">{</span>
    script <span class="token string">&quot;/etc/keepalived/check_apiserver.sh&quot;</span>
    interval <span class="token number">5</span>
    weight <span class="token parameter variable">-5</span>
    fall <span class="token number">2</span>  
    rise <span class="token number">1</span>
<span class="token punctuation">}</span>
vrrp_instance VI_1 <span class="token punctuation">{</span>
    state BACKUP					<span class="token comment">#高可用从2</span>
    interface ens33					<span class="token comment">#网卡名称</span>
    mcast_src_ip <span class="token number">172.16</span>.11.217		<span class="token comment">#该节点 IP</span>
    virtual_router_id <span class="token number">51</span>
    priority <span class="token number">99</span>				<span class="token comment">#设置优先级</span>
    advert_int <span class="token number">2</span>
    authentication <span class="token punctuation">{</span>
        auth_type PASS
        auth_pass K8SHA_KA_AUTH
    <span class="token punctuation">}</span>
    virtual_ipaddress <span class="token punctuation">{</span>
        <span class="token number">172.16</span>.11.220			<span class="token comment">#vip地址</span>
    <span class="token punctuation">}</span>
    track_script <span class="token punctuation">{</span>
       chk_apiserver
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),N={id:"所有-主节点-编写健康检测脚本",tabindex:"-1"},F=s("a",{class:"header-anchor",href:"#所有-主节点-编写健康检测脚本","aria-hidden":"true"},"#",-1),K=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/keepalived/check_apiserver.sh </span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/keepalived/check_apiserver.sh</span>
<span class="token comment">#!/bin/bash</span>
<span class="token assign-left variable">err</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">k</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">seq</span> <span class="token number">1</span> <span class="token number">3</span><span class="token variable">)</span></span><span class="token punctuation">;</span><span class="token keyword">do</span>
    <span class="token assign-left variable">check_code</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>pgrep haproxy<span class="token variable">)</span></span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">$check_code</span> <span class="token operator">==</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">err</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">expr</span> $err + <span class="token number">1</span><span class="token variable">)</span></span>
        <span class="token function">sleep</span> <span class="token number">1</span>
        <span class="token builtin class-name">continue</span>
    <span class="token keyword">else</span>
        <span class="token assign-left variable">err</span><span class="token operator">=</span><span class="token number">0</span>
        <span class="token builtin class-name">break</span>
    <span class="token keyword">fi</span>
<span class="token keyword">done</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">$err</span> <span class="token operator">!=</span> <span class="token string">&quot;0&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;systemctl stop keepalived&quot;</span>
    /usr/bin/systemctl stop keepalived
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">else</span>
    <span class="token builtin class-name">exit</span> <span class="token number">0</span>
<span class="token keyword">fi</span>

<span class="token comment">#给监测脚本添加执行权限</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># chmod +x /etc/keepalived/check_apiserver.sh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),L={id:"所有-主节点-启动-keepalived-与-haproxy",tabindex:"-1"},M=s("a",{class:"header-anchor",href:"#所有-主节点-启动-keepalived-与-haproxy","aria-hidden":"true"},"#",-1),z=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#生效配置文件</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># systemctl daemon-reload</span>

<span class="token comment">#启动并设置开机自启haproxy</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># systemctl enable --now haproxy</span>
Created symlink from /etc/systemd/system/multi-user.target.wants/haproxy.service to /usr/lib/systemd/system/haproxy.service.

<span class="token comment">#启动并设置开机自启keepalived</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># systemctl enable --now keepalived</span>
Created symlink from /etc/systemd/system/multi-user.target.wants/keepalived.service to /usr/lib/systemd/system/keepalived.service.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),U={id:"k8s-master1主节点查看vip",tabindex:"-1"},B=s("a",{class:"header-anchor",href:"#k8s-master1主节点查看vip","aria-hidden":"true"},"#",-1),R=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看IP与vip的IP</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># hostname -I</span>
<span class="token number">172.16</span>.11.215 <span class="token number">172.16</span>.11.220 <span class="token number">172.17</span>.0.1

<span class="token comment">#测试vip的16443端口是否通</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># telnet 172.16.11.220 16443</span>
Trying <span class="token number">172.16</span>.11.220<span class="token punctuation">..</span>.
Connected to <span class="token number">172.16</span>.11.220.
Escape character is <span class="token string">&#39;^]&#39;</span><span class="token builtin class-name">.</span>
Connection closed by foreign host.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),$={id:"master节点初始化-所有-master节点-操作-有单独在-master1节点-操作的则在master1节点操作即可",tabindex:"-1"},G=s("a",{class:"header-anchor",href:"#master节点初始化-所有-master节点-操作-有单独在-master1节点-操作的则在master1节点操作即可","aria-hidden":"true"},"#",-1),H=t(`<p>k8s-master1节点创建kubeadm-config.yaml配置文件如下：当然，也可以利用命令<code>kubeadm config print init-defaults</code>生成配置文件模板，然后进行修改：</p><blockquote><p>需要自行修改的有：</p><p>◎　advertiseAddress      #自己的master1节点IP<br> ◎　name            #自己的master1节点的名称<br> ◎　certSANs         #vip地址<br> ◎　controlPlaneEndpoint    #vip地址<br> ◎　kubernetesVersion     #kubernets版本<br> ◎　podSubnet         #pod网段<br> ◎　serviceSubnet       #service网段</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># vim kubeadm-config.yaml</span>
apiVersion: kubeadm.k8s.io/v1beta2
bootstrapTokens:
- groups:
  - system:bootstrappers:kubeadm:default-node-token
  token: 7t2weq.bjbawausm0jaxury  <span class="token comment">#初始化集群使用的token</span>
  ttl: 24h0m0s    <span class="token comment">#token有效期</span>
  usages:
  - signing
  - authentication
kind: InitConfiguration
localAPIEndpoint:
  advertiseAddress: <span class="token number">172.16</span>.11.215
  bindPort: <span class="token number">6443</span>
nodeRegistration:   <span class="token comment">#集群节点的信息</span>
  criSocket: /var/run/dockershim.sock
  name: k8s-master1
  taints:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
---
apiServer:
  certSANs:
  - <span class="token number">172.16</span>.11.220
  timeoutForControlPlane: 4m0s
apiVersion: kubeadm.k8s.io/v1beta2
certificatesDir: /etc/kubernetes/pki
clusterName: kubernetes
controlPlaneEndpoint: <span class="token number">172.16</span>.11.220:16443  <span class="token comment">#连接apiserver的地址</span>
controllerManager: <span class="token punctuation">{</span><span class="token punctuation">}</span>
dns:
  type: CoreDNS
etcd:
  local:
    dataDir: /var/lib/etcd
imageRepository: registry.cn-hangzhou.aliyuncs.com/google_containers
kind: ClusterConfiguration
kubernetesVersion: v1.20.0  <span class="token comment">#与kubernets版本对应 </span>
networking:
  dnsDomain: cluster.local
  podSubnet: <span class="token number">172.16</span>.10.1/18
  serviceSubnet: <span class="token number">172.17</span>.0.1/16  <span class="token comment">#pod,service与宿主机都不在同一个网段</span>
scheduler: <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更新配置文件" tabindex="-1"><a class="header-anchor" href="#更新配置文件" aria-hidden="true">#</a> 更新配置文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm config migrate --old-config kubeadm-config.yaml --new-config new.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将new.yaml文件复制到其他master节点，之后所有Master节点提前下载镜像，可以节省初始化时间</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">scp</span> new.yaml <span class="token number">172.16</span>.11.216:/root/
<span class="token function">scp</span> new.yaml <span class="token number">172.16</span>.11.217:/root/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看需要的镜像文件" tabindex="-1"><a class="header-anchor" href="#查看需要的镜像文件" aria-hidden="true">#</a> 查看需要的镜像文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm config images list <span class="token parameter variable">--config</span> /root/new.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161408772.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="所有master节点启动" tabindex="-1"><a class="header-anchor" href="#所有master节点启动" aria-hidden="true">#</a> 所有master节点启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm config images pull <span class="token parameter variable">--config</span> /root/new.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,12),Y={id:"master1节点-初始化-初始化后生成对应的证书",tabindex:"-1"},X=s("a",{class:"header-anchor",href:"#master1节点-初始化-初始化后生成对应的证书","aria-hidden":"true"},"#",-1),W=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm init <span class="token parameter variable">--config</span> /root/new.yaml  --upload-certs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161408706.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p>说明:生成的token有效期为2个小时，如果token过期后，可以采用一下方案解决；<br> Token过期后生成新的token：<br><code>kubeadm token create --print-join-command</code><br> Master需要生成--certificate-key<br><code>kubeadm init phase upload-certs --upload-certs</code></p></blockquote>`,3),J={id:"master1节点-配置环境变量-用于访问kubernetes集群",tabindex:"-1"},Q=s("a",{class:"header-anchor",href:"#master1节点-配置环境变量-用于访问kubernetes集群","aria-hidden":"true"},"#",-1),Z=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> /root/.bashrc</span>
export KUBECONFIG=/etc/kubernetes/admin.conf
EOF</span>


<span class="token comment">#让其生效</span>
<span class="token builtin class-name">source</span> /root/.bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),nn={id:"在-master1节点-查看集群节点状态",tabindex:"-1"},sn=s("a",{class:"header-anchor",href:"#在-master1节点-查看集群节点状态","aria-hidden":"true"},"#",-1),en=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161408673.png" alt="截图" tabindex="0" loading="lazy"><figcaption>截图</figcaption></figure><p>采用初始化安装方式，所有的系统组件均以容器的方式运行并且在<code>kube-system</code>命名空间内，此时可以查看Pod状态：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get pods <span class="token parameter variable">-n</span> kube-system <span class="token parameter variable">-o</span> wide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161408375.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以看到有两个<code>READY</code>的状态是<code>0/1</code>，这个不用担心，后面节点加入之后就好了。</p><p>他是执行的时候有一个告警：<code>Warning FailedScheduling 7s (x3 over 2m7s) default-scheduler 0/1 nodes are available: 1 node(s) had taint {node.kubernetes.io/not-ready: }, that the pod didn&#39;t tolerate</code>。</p><h3 id="其他master节点加入集群-master2-和-master3-节点操作" tabindex="-1"><a class="header-anchor" href="#其他master节点加入集群-master2-和-master3-节点操作" aria-hidden="true">#</a> 其他master节点加入集群（master2 和 master3 节点操作）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master2 ~<span class="token punctuation">]</span><span class="token comment"># kubeadm join 172.16.11.220:16443 --token 7t2weq.bjbawausm0jaxury \\</span>
   --discovery-token-ca-cert-hash sha256:f370e43a5b3218b7b6094980edd4fac3b6104a272e465767d3c78dfad8c62066 <span class="token punctuation">\\</span>
   --control-plane --certificate-key 26270907ae9b940062bd9f5e4daad59e2804a4a5bdbfb61c7ebb0e6d2f5e5839
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master3 ~<span class="token punctuation">]</span><span class="token comment"># kubeadm join 172.16.11.220:16443 --token 7t2weq.bjbawausm0jaxury \\</span>
   --discovery-token-ca-cert-hash sha256:f370e43a5b3218b7b6094980edd4fac3b6104a272e465767d3c78dfad8c62066 <span class="token punctuation">\\</span>
   --control-plane --certificate-key 26270907ae9b940062bd9f5e4daad59e2804a4a5bdbfb61c7ebb0e6d2f5e5839
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161408788.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>加入成功，可以在master1上使用<code>kubectl get nods</code>来查看。</p><h3 id="node节点配置-node1-和-node2-节点操作" tabindex="-1"><a class="header-anchor" href="#node节点配置-node1-和-node2-节点操作" aria-hidden="true">#</a> Node节点配置（node1 和 node2 节点操作）</h3><p>  Node节点上主要部署公司的一些业务应用，生产环境中不建议Master节点部署系统组件之外的其他Pod，测试环境可以允许Master节点部署Pod以节省系统资源。</p><ul><li>将node节点添加到集群</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-node1 ~<span class="token punctuation">]</span><span class="token comment"># kubeadm join 172.16.11.220:16443 --token 7t2weq.bjbawausm0jaxury \\</span>
    --discovery-token-ca-cert-hash sha256:f370e43a5b3218b7b6094980edd4fac3b6104a272e465767d3c78dfad8c62066 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-node2 ~<span class="token punctuation">]</span><span class="token comment"># kubeadm join 172.16.11.220:16443 --token 7t2weq.bjbawausm0jaxury \\</span>
    --discovery-token-ca-cert-hash sha256:f370e43a5b3218b7b6094980edd4fac3b6104a272e465767d3c78dfad8c62066 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161408402.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>加入成功，可以在master1上使用<code>kubectl get nods</code>来查看。</p><ul><li>master1查看所有节点</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> <span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># kubectl get nodes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161408771.png" alt="截图" tabindex="0" loading="lazy"><figcaption>截图</figcaption></figure><p>现在的集群状态都是<code>NotReady</code>表示不可达；这是因为还没有安装网络插件，下面我们来安装一下网络插件（caclico）</p><h2 id="calico组件-只在-master1节点-操作-【网络插件-用于连接其他节点】" tabindex="-1"><a class="header-anchor" href="#calico组件-只在-master1节点-操作-【网络插件-用于连接其他节点】" aria-hidden="true">#</a> Calico组件（只在 master1节点 操作）【网络插件，用于连接其他节点】</h2><blockquote><p>  Calico是一个纯三层的协议，为OpenStack虚拟机和Docker容器提供多主机间通信。Calico不使用重叠网络比如flannel和libnetwork重叠网络驱动，它是一个纯三层的方法，使用虚拟路由代替虚拟交换，每一台虚拟路由通过BGP协议传播可达信息（路由）到剩余数据中心。</p></blockquote><h3 id="拉取安装包-安装包内包含-calico组件、metrics组件、dashboard组件" tabindex="-1"><a class="header-anchor" href="#拉取安装包-安装包内包含-calico组件、metrics组件、dashboard组件" aria-hidden="true">#</a> 拉取安装包（安装包内包含：Calico组件、Metrics组件、Dashboard组件）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/dotbalo/k8s-ha-install.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果拉取不下来，可以参考该地址下载：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#拉取完成进入该目录</span>
<span class="token builtin class-name">cd</span> k8s-ha-install

<span class="token comment">#切换到manual-installation-v1.20.x分支</span>
<span class="token punctuation">[</span>root@k8s-master1 k8s-ha-install<span class="token punctuation">]</span><span class="token comment"># git checkout manual-installation-v1.20.x</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改相关的配置文件" tabindex="-1"><a class="header-anchor" href="#修改相关的配置文件" aria-hidden="true">#</a> 修改相关的配置文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#进入calico目录</span>
<span class="token punctuation">[</span>root@k8s-master1 k8s-ha-install<span class="token punctuation">]</span><span class="token comment"># cd calico/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意事项：</p><p>◎　需要改的就只要第一行的ip</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#将要修改的ip改为自己的ip，按照master节点顺序的改成自己的节点ip</span>
<span class="token punctuation">[</span>root@k8s-master1 calico<span class="token punctuation">]</span><span class="token comment"># sed -i &#39;s#etcd_endpoints: &quot;http://&lt;ETCD_IP&gt;:&lt;ETCD_PORT&gt;&quot;#etcd_endpoints: &quot;https://172.16.11.215:2379,https://172.16.11.216:2379,https://172.16.11.217:2379&quot;#g&#39; calico-etcd.yaml</span>

<span class="token comment">#设置临时环境变量ETCD_CA查看ca.crt文件并转化为base64格式取消换行符</span>
<span class="token punctuation">[</span>root@k8s-master1 calico<span class="token punctuation">]</span><span class="token comment"># ETCD_CA=\`cat /etc/kubernetes/pki/etcd/ca.crt | base64 | tr -d &#39;\\n&#39;\`</span>
<span class="token comment">#设置临时环境变量ETCD_CERT查看server.crt文件并转化为base64格式取消换行符</span>
<span class="token punctuation">[</span>root@k8s-master1 calico<span class="token punctuation">]</span><span class="token comment"># ETCD_CERT=\`cat /etc/kubernetes/pki/etcd/server.crt | base64 | tr -d &#39;\\n&#39;\`</span>
<span class="token comment">#设置临时环境变量ETCD_KEY查看server.key文件并转化为base64格式取消换行符</span>
<span class="token punctuation">[</span>root@k8s-master1 calico<span class="token punctuation">]</span><span class="token comment"># ETCD_KEY=\`cat /etc/kubernetes/pki/etcd/server.key | base64 | tr -d &#39;\\n&#39;\`</span>

<span class="token comment">#更换calico-etcd.yaml文件中的# etcd-key: null、# etcd-cert: null、# etcd-ca: null为指定值，临时的环境变量这这用。</span>
<span class="token punctuation">[</span>root@k8s-master1 calico<span class="token punctuation">]</span><span class="token comment"># sed -i &quot;s/# etcd-key: null/etcd-key: \${ETCD_KEY}/g; s/# etcd-cert: null/etcd-cert: \${ETCD_CERT}/g; s/# etcd-ca: null/etcd-ca: \${ETCD_CA}/g&quot; calico-etcd.yaml</span>

<span class="token comment">#更换calico-etcd.yaml文件中的etcd_ca: &quot;&quot;#、etcd_cert: &quot;&quot;、etcd_key: &quot;&quot; 为指定值</span>
<span class="token punctuation">[</span>root@k8s-master1 calico<span class="token punctuation">]</span><span class="token comment"># sed -i &#39;s#etcd_ca: &quot;&quot;#etcd_ca: &quot;/calico-secrets/etcd-ca&quot;#g; s#etcd_cert: &quot;&quot;#etcd_cert: &quot;/calico-secrets/etcd-cert&quot;#g; s#etcd_key: &quot;&quot; #etcd_key: &quot;/calico-secrets/etcd-key&quot; #g&#39; calico-etcd.yaml</span>

<span class="token comment">#设置临时环境变量POD_SUBNET从kubernetes配置文件中查找自己的网关</span>
<span class="token punctuation">[</span>root@k8s-master1 calico<span class="token punctuation">]</span><span class="token comment"># POD_SUBNET=\`cat /etc/kubernetes/manifests/kube-controller-manager.yaml | grep cluster-cidr= | awk -F= &#39;{print $NF}&#39;\`</span>

<span class="token comment">#注意下面的这个步骤是把calico-etcd.yaml文件里面的CALICO_IPV4POOL_CIDR下的网段改成自己的Pod网段，并打开注释，不用手动改，会用到上面的环境变量；</span>
<span class="token punctuation">[</span>root@k8s-master1 calico<span class="token punctuation">]</span><span class="token comment"># sed -i &#39;s@# - name: CALICO_IPV4POOL_CIDR@- name: CALICO_IPV4POOL_CIDR@g; s@#   value: &quot;192.168.0.0/16&quot;@  value: &#39;&quot;\${POD_SUBNET}&quot;&#39;@g&#39; calico-etcd.yaml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建运行并查看容器状态" tabindex="-1"><a class="header-anchor" href="#创建运行并查看容器状态" aria-hidden="true">#</a> 创建运行并查看容器状态</h3><ul><li>创建并运行yaml文件</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-maste1 calico<span class="token punctuation">]</span><span class="token comment"># kubectl apply -f calico-etcd.yaml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161408959.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>查看创建的容器状态</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master1 calico<span class="token punctuation">]</span><span class="token comment"># kubectl get pods -n kube-system</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161408018.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>同时，上面提到的两个<code>coredns-54d67798b7-7w4k5</code>容器没有运行起来的问题也成功的运行起来了。目标为：<code>在 master1节点 查看集群节点状态</code>标题。</p><blockquote><p>网络组件安装完成，可以再次查看一下节点网络连接状态了。</p></blockquote><h3 id="查看节点网络连接状态" tabindex="-1"><a class="header-anchor" href="#查看节点网络连接状态" aria-hidden="true">#</a> 查看节点网络连接状态</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master1 calico<span class="token punctuation">]</span><span class="token comment"># kubectl get nodes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161408097.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以看到都连接成功了。</p><h2 id="metrics部署-只在-master1节点-操作-【用于查看其他节点的资源使用率】" tabindex="-1"><a class="header-anchor" href="#metrics部署-只在-master1节点-操作-【用于查看其他节点的资源使用率】" aria-hidden="true">#</a> Metrics部署（只在 master1节点 操作）【用于查看其他节点的资源使用率】</h2><blockquote><p>  在新版的Kubernetes中系统资源的采集均使用Metrics-server，可以通过Metrics采集节点和Pod的内存、磁盘、CPU和网络的使用率。</p></blockquote><h3 id="将master1节点的front-proxy-ca-crt复制到所有node节点" tabindex="-1"><a class="header-anchor" href="#将master1节点的front-proxy-ca-crt复制到所有node节点" aria-hidden="true">#</a> 将Master1节点的front-proxy-ca.crt复制到所有Node节点</h3><ul><li>复制到node1节点上</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># scp /etc/kubernetes/pki/front-proxy-ca.crt k8s-node1:/etc/kubernetes/pki/front-proxy-ca.crt</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>复制到node2节点上</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># scp /etc/kubernetes/pki/front-proxy-ca.crt k8s-node2:/etc/kubernetes/pki/front-proxy-ca.crt</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161408400.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="安装metrics-server" tabindex="-1"><a class="header-anchor" href="#安装metrics-server" aria-hidden="true">#</a> 安装metrics server</h3>`,56),an={href:"https://liucy.blog.csdn.net/article/details/129661466",target:"_blank",rel:"noopener noreferrer"},tn=s("br",null,null,-1),ln=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#进入上一步拉取的k8s-ha-install/metrics-server-0.4.x-kubeadm/目录</span>
<span class="token punctuation">[</span>root@k8s-master1 ~<span class="token punctuation">]</span><span class="token comment"># cd /root/k8s-ha-install/metrics-server-0.4.x-kubeadm/ </span>

<span class="token comment">#根据该目录下的yaml文件创建容器</span>
<span class="token punctuation">[</span>root@k8s-master1 metrics-server-0.4.x-kubeadm<span class="token punctuation">]</span><span class="token comment"># kubectl apply -f comp.yaml </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161408195.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="查看节点状态" tabindex="-1"><a class="header-anchor" href="#查看节点状态" aria-hidden="true">#</a> 查看节点状态</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master1 metrics-server-0.4.x-kubeadm<span class="token punctuation">]</span><span class="token comment"># kubectl  top node</span>
NAME           CPU<span class="token punctuation">(</span>cores<span class="token punctuation">)</span>   CPU%   MEMORY<span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>   MEMORY%   
k8s-master1   258m         <span class="token number">12</span>%    1125Mi          <span class="token number">65</span>%       
k8s-master2   224m         <span class="token number">11</span>%    1083Mi          <span class="token number">62</span>%       
k8s-master3   114m         <span class="token number">5</span>%     1047Mi          <span class="token number">60</span>%       
k8s-node1     61m          <span class="token number">3</span>%     860Mi           <span class="token number">50</span>%       
k8s-node2     62m          <span class="token number">3</span>%     889Mi           <span class="token number">51</span>%
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果还是top查看不到，可以查看一下<code>metrics-server</code>有没有起来，<code>kubectl get pods -n kube-system | grep metrics</code>，有问题排查之后就可以了。</p><h2 id="部署成功" tabindex="-1"><a class="header-anchor" href="#部署成功" aria-hidden="true">#</a> 部署成功！</h2>`,6);function cn(dn,on){const l=c("ExternalLinkIcon"),i=c("font"),d=c("center");return r(),p("div",null,[s("blockquote",null,[m,s("p",null,[n("  🏅"),s("a",v,[n("云计算领域优质创作者"),e(l)]),b,n("   🏅"),s("a",k,[n("华为云开发者社区专家博主"),e(l)]),h,n("   🏅"),s("a",g,[n("阿里云开发者社区专家博主"),e(l)]),_,n(" 💊"),f,s("a",y,[n("运维交流社区"),e(l)]),n(" 欢迎大家的加入！")])]),x,e(i,{color:"red"},{default:a(()=>[n("注意：ip一定要改成自己的ip，不要直接复制粘贴")]),_:1}),q,s("blockquote",null,[s("p",null,[n("如果是克隆虚拟机建议执行"),e(i,{color:"red"},{default:a(()=>[n("rm -rf /etc/udev/*")]),_:1}),n(" 保证网卡UUID不同")])]),C,s("h2",w,[E,n(" 部署keepalived、haproxy --> 配置高可用（所有 "),e(i,{color:"red"},{default:a(()=>[n("主节点")]),_:1}),n(" 部署）")]),P,S,e(d,null,{default:a(()=>[n("再次提醒，所有"),e(i,{color:"red"},{default:a(()=>[n(" 主节点")]),_:1}),n("，不是所有节点；")]),_:1}),I,s("h3",A,[O,n(" 所有 "),e(i,{color:"red"},{default:a(()=>[n("主节点")]),_:1}),n(" 修改haproxy配置")]),T,s("h3",j,[D,n(" 所有 "),e(i,{color:"red"},{default:a(()=>[n("主节点")]),_:1}),n(" 配置keepalived （一个一个配置）")]),V,s("h3",N,[F,n(" 所有 "),e(i,{color:"red"},{default:a(()=>[n("主节点")]),_:1}),n(" 编写健康检测脚本")]),K,s("h3",L,[M,n(" 所有 "),e(i,{color:"red"},{default:a(()=>[n("主节点")]),_:1}),n(" 启动 keepalived 与 haproxy")]),z,s("h3",U,[B,n(),e(i,{color:"red"},{default:a(()=>[n("k8s-master1")]),_:1}),n("主节点查看VIP")]),R,s("h2",$,[G,n(" master节点初始化（所有 "),e(i,{color:"red"},{default:a(()=>[n("master节点")]),_:1}),n(" 操作，有单独在 "),e(i,{color:"red"},{default:a(()=>[n("master1节点")]),_:1}),n(" 操作的则在master1节点操作即可）")]),H,s("h3",Y,[X,n(),e(i,{color:"red"},{default:a(()=>[n("master1节点")]),_:1}),n(" 初始化，初始化后生成对应的证书")]),W,s("h3",J,[Q,n(),e(i,{color:"red"},{default:a(()=>[n("master1节点 ")]),_:1}),n("配置环境变量，用于访问Kubernetes集群")]),Z,s("h3",nn,[sn,n(" 在 "),e(i,{color:"red"},{default:a(()=>[n("master1节点")]),_:1}),n(" 查看集群节点状态")]),en,s("p",null,[n("同时也可以参考："),s("a",an,[n("【云原生-k8s】kubectl top pod 报错:error: Metrics API not available"),tn,e(l)]),n(" 该篇文章。")]),ln])}const un=o(u,[["render",cn],["__file","【云原生-K8s-2】kubeadm搭建k8s高可用集群(三主两从一VIP)完整教程.html.vue"]]);export{un as default};
