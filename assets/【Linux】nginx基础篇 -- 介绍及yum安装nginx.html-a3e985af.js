import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as r,a as n,b as s,d as a,e as i}from"./app-bccf5941.js";const o={},d=n("p",null,[s("👨‍🎓"),n("strong",null,"博主简介")],-1),p={href:"https://blog.csdn.net/liu_chen_yang?type=blog",target:"_blank",rel:"noopener noreferrer"},u=n("br",null,null,-1),m={href:"https://bbs.huaweicloud.com/community/myblog",target:"_blank",rel:"noopener noreferrer"},v=n("br",null,null,-1),g={href:"https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz",target:"_blank",rel:"noopener noreferrer"},h=n("br",null,null,-1),b=n("strong",null,"交流社区：",-1),_={href:"https://bbs.csdn.net/forums/lcy",target:"_blank",rel:"noopener noreferrer"},x=n("br",null,null,-1),k=n("br",null,null,-1),f=i('<hr><h2 id="一、nginx-介绍" tabindex="-1"><a class="header-anchor" href="#一、nginx-介绍" aria-hidden="true">#</a> 一、nginx 介绍</h2><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161335102.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_1-1-在线自动生成nginx配置文件" tabindex="-1"><a class="header-anchor" href="#_1-1-在线自动生成nginx配置文件" aria-hidden="true">#</a> 1.1 在线自动生成nginx配置文件</h3>',4),y={href:"https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN",target:"_blank",rel:"noopener noreferrer"},w=i(`<p>可以自由选择所需的应用，生成nginx配置作为参考。</p><blockquote><p>根据你的业务需求，自动生成复杂的nginx配置文件，提供你作为参考，非常好用</p></blockquote><h2 id="二、nginx企业用它干什么" tabindex="-1"><a class="header-anchor" href="#二、nginx企业用它干什么" aria-hidden="true">#</a> 二、nginx企业用它干什么</h2><blockquote><p>1.提供静态页面展示，网页服务<br> 2.提供多个网站、多个域名的网页服务</p><p>3.提供反向代理服务（结合动态应用程序）</p><p>4.提供简单资源下载服务（密码认证） ftp服务</p><p>5.用户行为分析（日志功能）</p></blockquote><h2 id="三、nginx的运行架构" tabindex="-1"><a class="header-anchor" href="#三、nginx的运行架构" aria-hidden="true">#</a> 三、nginx的运行架构</h2><blockquote><p>nginx运行后，有多少个干活的工人，多进程，调用多个cpu去解析用户的请求<br></p><p>在linux中进行多进程开发，开辟多个进程，调用多个cpu，当然也会消耗更多的机器资源，内存，cpu资源，给服务器带来更大的压力<br> 不是说进程越多，干活越快，合理的分配，才能达到最高效的处理效率<br><br> 关于nginx的优化设置，nginx默认应该启动多少个进程去工作呢？<br> 默认就是根据cpu的核数去设置进程数即可。</p></blockquote><h2 id="四、master主进程原理" tabindex="-1"><a class="header-anchor" href="#四、master主进程原理" aria-hidden="true">#</a> 四、master主进程原理</h2><p>包工头进程，管理nginx的数据，创建worker工作进程。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1. 启动时检查nginx.conf是否正确，语法是否有误；
2. 根据配置文件的参数创建、且监控worker进程的数量和状态；
3. 监听socket，接收client发起的请求，然后worker竞争抢夺链接，获胜的可以处理且响应请求。
4. 接收我们发送的管理nginx进程的信号，并且将信号通知到worker进程。
5. 如果我们发送了reload命令，则读取新配置文件，创建新的worker进程，结束旧的worker进程。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、worker工作进程原理" tabindex="-1"><a class="header-anchor" href="#五、worker工作进程原理" aria-hidden="true">#</a> 五、worker工作进程原理</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1. 实际处理client网络请求的是worker
2. master根据nginx.conf决定worker的数量
3. 有client用户请求到达时，worker之间进程竞争，获胜者和client建立连接且处理用户请求；
4. 接收用户请求后，若需要代理转发给后端，则后端处理完毕后接收处理结果，再响应给用户
5. 接收并处理master发来的进程信号，如启动、重启、重载、停止。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、nginx常用模块介绍" tabindex="-1"><a class="header-anchor" href="#六、nginx常用模块介绍" aria-hidden="true">#</a> 六、nginx常用模块介绍</h2>`,12),z={href:"https://nginx.org/en/docs/",target:"_blank",rel:"noopener noreferrer"},q=n("br",null,null,-1),C=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ngx_http_access_module		<span class="token comment"># 四层基于IP的访问控制，可以通过匹配客户端源IP地址进行限制，简单来说就是允许限制对某些客户端地址的访问。</span>
ngx_http_auth_basic_module	<span class="token comment"># 允许通过使用“HTTP 基本身份验证”协议验证用户名和密码来限制对资源的访问。</span>
ngx_http_stub_status_module	<span class="token comment"># 状态统计模块。</span>
ngx_http_gzip_module		<span class="token comment"># 文件的压缩功能，是一个使用“gzip”方法压缩响应的过滤器。这通常有助于将传输数据的大小减少一半甚至更多。</span>
ngx_http_gzip_static_module	<span class="token comment"># 静态压缩模块，允许发送带有“ ”文件扩展名的预压缩文件，.gz而不是常规文件。</span>
ngx_http_ssl_module			<span class="token comment"># 为HTTPS提供必要的支持</span>
ngx_http_rewrite_module		<span class="token comment"># 重定向功能，解析和处理rewrite请求，用于使用 PCRE 正则表达式更改请求 URI、返回重定向和有条件选择配置。</span>
ngx_http_referer_module		<span class="token comment"># 防盗链功能，用于阻止“Referer”标头字段中包含无效值的请求访问站点。</span>
ngx_http_proxy_module		<span class="token comment"># 将客户端的请求以http协议转发至指定服务器进行处理。</span>
ngx_stream_proxy_module		<span class="token comment"># tcp负载，将客户端的请求以tcp协议转发至指定服务器处理，允许通过 TCP、UDP (1.9.13) 和 UNIX 域套接字代理数据流。</span>
ngx_http_fastcgi_module		<span class="token comment"># 将客户端对php的请求以fastcgi协议转发至指定服务器理。</span>
ngx_http_uwsgi_module		<span class="token comment"># 将客户端对Python的请求以uwsgi协议转发至指定服务器处理。</span>
ngx_http_headers_module		<span class="token comment"># 允许将“Expires”和“Cache-Control”标头字段以及任意字段添加到响应标头。</span>
ngx_http_upstream_module	<span class="token comment"># 用于定义可由proxy_pass、 fastcgi_pass、 uwsgi_pass、 scgi_pass、 memcached_pa​​ss和 grpc_pass指令引用的服务器组。负载均衡模块，提供服务器分组转发、权重分配、状态监测、调度算法等高级功能。</span>
ngx_stream_upstream_module	<span class="token comment"># 用于定义可由proxy_pass 指令引用的服务器组。</span>
ngx_http_fastcgi_module		<span class="token comment"># 允许将请求传递到 FastCGI 服务器。</span>
ngx_http_flv_module			<span class="token comment"># 为 Flash 视频 (FLV) 文件提供伪流服务器端支持。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="七、nginx的安装形式" tabindex="-1"><a class="header-anchor" href="#七、nginx的安装形式" aria-hidden="true">#</a> 七、nginx的安装形式</h2><ul><li>源代码编译安装，优点： <ul><li>版本，可以获取官网最新的软件包，甚至最新测试版，都可以直接编译安装</li><li>还有稳定版本</li><li>自由定义，安装路径自由定义，</li><li>自由定义第三方插件</li><li>缺点：安装步骤繁琐，耗时太长，看你要装多少个模块，编译添加的模块多，安装的就更久</li></ul></li><li>rpm安装 <ul><li>得提前准备好nginx本身的rpm包，以及相关依赖的rpm包</li><li>用于离线安装nginx的环境</li></ul></li><li>yum安装，你会用哪些形式的仓库？ <ul><li>阿里云第三方仓库（centos-base.repo,epel.repo） <ul><li>这个其实都不靠谱。</li></ul></li><li>自建yum仓库（得提前准备好nginx本身的rpm包，以及相关依赖的rpm包）</li><li>nginx官网仓库（获取官网最新稳定版的yum源仓库） <ul><li>yum一键安装，省心省事，版本也是有一定的保障的，rpm的安全性也是有保障的</li></ul></li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>官网yum仓库
源代码编译
离线的rpm安装（yum 自建仓库）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-1-yum安装nginx" tabindex="-1"><a class="header-anchor" href="#_7-1-yum安装nginx" aria-hidden="true">#</a> 7.1 yum安装nginx</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 配置官网yum源，一键安装即可</span>

<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/yum.repos.d/nginx.repo <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
EOF</span>

<span class="token comment"># 2.清空yum源，安装最新版nginx</span>
yum clean all

yum <span class="token function">install</span> nginx <span class="token parameter variable">-y</span>

<span class="token comment"># 3.查看PATH变量</span>
<span class="token punctuation">[</span>root@iz0jlfqv8fyt7iuxoec4clz ~<span class="token punctuation">]</span><span class="token comment"># which nginx</span>
/usr/sbin/nginx
<span class="token punctuation">[</span>root@iz0jlfqv8fyt7iuxoec4clz ~<span class="token punctuation">]</span><span class="token comment"># ll /usr/sbin/nginx</span>
-rwxr-xr-x <span class="token number">1</span> root root <span class="token number">1399232</span> Apr <span class="token number">12</span> 01:22 /usr/sbin/nginx

<span class="token comment"># 4.查看nginx版本</span>
<span class="token punctuation">[</span>root@iz0jlfqv8fyt7iuxoec4clz ~<span class="token punctuation">]</span><span class="token comment"># nginx -V</span>
nginx version: nginx/1.24.0
built by gcc <span class="token number">4.8</span>.5 <span class="token number">20150623</span> <span class="token punctuation">(</span>Red Hat <span class="token number">4.8</span>.5-44<span class="token punctuation">)</span> <span class="token punctuation">(</span>GCC<span class="token punctuation">)</span> 
built with OpenSSL <span class="token number">1.0</span>.2k-fips  <span class="token number">26</span> Jan <span class="token number">2017</span>
TLS SNI support enabled
configure arguments: <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/etc/nginx --sbin-path<span class="token operator">=</span>/usr/sbin/nginx --modules-path<span class="token operator">=</span>/usr/lib64/nginx/modules --conf-path<span class="token operator">=</span>/etc/nginx/nginx.conf --error-log-path<span class="token operator">=</span>/var/log/nginx/error.log --http-log-path<span class="token operator">=</span>/var/log/nginx/access.log --pid-path<span class="token operator">=</span>/var/run/nginx.pid --lock-path<span class="token operator">=</span>/var/run/nginx.lock --http-client-body-temp-path<span class="token operator">=</span>/var/cache/nginx/client_temp --http-proxy-temp-path<span class="token operator">=</span>/var/cache/nginx/proxy_temp --http-fastcgi-temp-path<span class="token operator">=</span>/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path<span class="token operator">=</span>/var/cache/nginx/uwsgi_temp --http-scgi-temp-path<span class="token operator">=</span>/var/cache/nginx/scgi_temp <span class="token parameter variable">--user</span><span class="token operator">=</span>nginx <span class="token parameter variable">--group</span><span class="token operator">=</span>nginx --with-compat --with-file-aio --with-threads --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_mp4_module --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-mail --with-mail_ssl_module --with-stream --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module --with-cc-opt<span class="token operator">=</span><span class="token string">&#39;-O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong --param=ssp-buffer-size=4 -grecord-gcc-switches -m64 -mtune=generic -fPIC&#39;</span> --with-ld-opt<span class="token operator">=</span><span class="token string">&#39;-Wl,-z,relro -Wl,-z,now -pie&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-nginx管理命令" tabindex="-1"><a class="header-anchor" href="#_7-2-nginx管理命令" aria-hidden="true">#</a> 7.2 nginx管理命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx 		 		<span class="token comment"># 默认是直接运行启动，前提是当前机器没运行nginx	</span>
nginx <span class="token parameter variable">-t</span>  			<span class="token comment"># 检测nginx.conf语法</span>
nginx <span class="token parameter variable">-s</span> reload  	<span class="token comment"># 重新读取nginx.conf</span>
nginx <span class="token parameter variable">-s</span> stop   	<span class="token comment"># 停止nginx  kill -15 nginx</span>



<span class="token comment"># systemctl去管理nginx启动之类的。</span>



<span class="token comment">#启动nginx，查看nginx状态，reload重新加载nginx配置， restart重启nginx服务，查看进程id号，关闭nginx</span>
<span class="token punctuation">[</span>root@iz0jlfqv8fyt7iuxoec4clz ~<span class="token punctuation">]</span><span class="token comment"># systemctl start nginx</span>

<span class="token punctuation">[</span>root@iz0jlfqv8fyt7iuxoec4clz ~<span class="token punctuation">]</span><span class="token comment"># systemctl status nginx</span>

<span class="token punctuation">[</span>root@iz0jlfqv8fyt7iuxoec4clz ~<span class="token punctuation">]</span><span class="token comment"># systemctl reload nginx  # worker变化，master不变</span>

<span class="token punctuation">[</span>root@iz0jlfqv8fyt7iuxoec4clz ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart nginx  # 整个nginx进程变化</span>

<span class="token punctuation">[</span>root@iz0jlfqv8fyt7iuxoec4clz ~<span class="token punctuation">]</span><span class="token comment"># systemctl stop nginx</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-yum-安装-nginx-所有默认路径" tabindex="-1"><a class="header-anchor" href="#_7-3-yum-安装-nginx-所有默认路径" aria-hidden="true">#</a> 7.3 yum 安装 nginx 所有默认路径</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iz0jlfqv8fyt7iuxoec4clz ~<span class="token punctuation">]</span><span class="token comment"># rpm -ql nginx</span>
/etc/logrotate.d/nginx
/etc/nginx
/etc/nginx/conf.d
/etc/nginx/conf.d/default.conf
/etc/nginx/fastcgi_params
/etc/nginx/mime.types
/etc/nginx/modules
/etc/nginx/nginx.conf		<span class="token comment"># nginx的配置文件路径</span>
/etc/nginx/scgi_params
/etc/nginx/uwsgi_params
/usr/lib/systemd/system/nginx-debug.service
/usr/lib/systemd/system/nginx.service
/usr/lib64/nginx
/usr/lib64/nginx/modules
/usr/libexec/initscripts/legacy-actions/nginx
/usr/libexec/initscripts/legacy-actions/nginx/check-reload
/usr/libexec/initscripts/legacy-actions/nginx/upgrade
/usr/sbin/nginx
/usr/sbin/nginx-debug
/usr/share/doc/nginx-1.24.0
/usr/share/doc/nginx-1.24.0/COPYRIGHT
/usr/share/man/man8/nginx.8.gz
/usr/share/nginx
/usr/share/nginx/html
/usr/share/nginx/html/50x.html
/usr/share/nginx/html/index.html
/var/cache/nginx
/var/log/nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-4-通过官网yum仓库默认安装的nginx-conf配置文件" tabindex="-1"><a class="header-anchor" href="#_7-4-通过官网yum仓库默认安装的nginx-conf配置文件" aria-hidden="true">#</a> 7.4 通过官网yum仓库默认安装的nginx.conf配置文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iz0jlfqv8fyt7iuxoec4clz ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/nginx/nginx.conf</span>

user  nginx<span class="token punctuation">;</span>
worker_processes  auto<span class="token punctuation">;</span>

error_log  /var/log/nginx/error.log notice<span class="token punctuation">;</span>
pid        /var/run/nginx.pid<span class="token punctuation">;</span>


events <span class="token punctuation">{</span>
    worker_connections  <span class="token number">1024</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


http <span class="token punctuation">{</span>
    include       /etc/nginx/mime.types<span class="token punctuation">;</span>
    default_type  application/octet-stream<span class="token punctuation">;</span>

    log_format  main  <span class="token string">&#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
                      <span class="token string">&#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
                      <span class="token string">&#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;</span><span class="token punctuation">;</span>

    access_log  /var/log/nginx/access.log  main<span class="token punctuation">;</span>

    sendfile        on<span class="token punctuation">;</span>
    <span class="token comment">#tcp_nopush     on;</span>

    keepalive_timeout  <span class="token number">65</span><span class="token punctuation">;</span>

    <span class="token comment">#gzip  on;</span>

    include /etc/nginx/conf.d/*.conf<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="八、nginx配置模块详解" tabindex="-1"><a class="header-anchor" href="#八、nginx配置模块详解" aria-hidden="true">#</a> 八、nginx配置模块详解</h2><blockquote><p>这里的图是二进制安装默认的配置，yum安装的与二进制安装的nginx，配置会有差异，但整体大概的说明都是一样的。</p></blockquote><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161335897.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>主要区域讲解：</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161335879.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="九、-相关文章" tabindex="-1"><a class="header-anchor" href="#九、-相关文章" aria-hidden="true">#</a> 九、 相关文章</h2>`,18),j=n("thead",null,[n("tr",null,[n("th",null,"文章标题"),n("th",null,"文章连接")])],-1),I=n("td",null,"【Linux】nginx基础篇 -- 介绍及yum安装nginx",-1),L={href:"https://liucy.blog.csdn.net/article/details/133928000",target:"_blank",rel:"noopener noreferrer"},N=n("td",null,"【Linux】环境下部署Nginx服务 - 二进制部署方式",-1),P={href:"https://liucy.blog.csdn.net/article/details/132145067",target:"_blank",rel:"noopener noreferrer"},$=n("td",null,"nginx配置负载均衡--实战项目（适用于轮询、加权轮询、ip_hash）",-1),T={href:"https://liucy.blog.csdn.net/article/details/133986013",target:"_blank",rel:"noopener noreferrer"},E=n("td",null,"nginx快速部署一个网站服务 + 多域名 + 多端口",-1),F={href:"https://liucy.blog.csdn.net/article/details/133986102",target:"_blank",rel:"noopener noreferrer"},O=n("td",null,"【Linux】Nginx一个域名https&一个地址配置多个项目【项目实战】",-1),R={href:"https://liucy.blog.csdn.net/article/details/144442148",target:"_blank",rel:"noopener noreferrer"},S=i('<h2 id="十、相关专栏" tabindex="-1"><a class="header-anchor" href="#十、相关专栏" aria-hidden="true">#</a> 十、相关专栏</h2><blockquote><div align="center"><a href="https://blog.csdn.net/liu_chen_yang/category_10887074.html">❀《Linux从入门到精通》专栏 ❀</a></div><div align="center"><a href="https://blog.csdn.net/liu_chen_yang/category_12419502.html">❀《Nginx》专栏 ❀</a></div></blockquote><blockquote><p>🐋 希望大家多多支持，我们一起进步！😄<br> 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗</p></blockquote>',3);function V(H,U){const e=l("ExternalLinkIcon");return c(),r("div",null,[n("blockquote",null,[d,n("p",null,[s("  🏅"),n("a",p,[s("云计算领域优质创作者"),a(e)]),u,s("   🏅"),n("a",m,[s("华为云开发者社区专家博主"),a(e)]),v,s("   🏅"),n("a",g,[s("阿里云开发者社区专家博主"),a(e)]),h,s(" 💊"),b,n("a",_,[s("运维交流社区"),a(e)]),s(" 欢迎大家的加入！"),x,s(" 🐋 希望大家多多支持，我们一起进步！😄"),k,s(" 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗")])]),f,n("p",null,[n("a",y,[s("https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN"),a(e)])]),w,n("blockquote",null,[n("p",null,[s("nginx常用模块官网："),n("a",z,[s("https://nginx.org/en/docs/"),a(e)]),q,s(" 下面讲解的常用模块，官网都有解析是使用方法。")])]),C,n("table",null,[j,n("tbody",null,[n("tr",null,[I,n("td",null,[n("a",L,[s("https://liucy.blog.csdn.net/article/details/133928000"),a(e)])])]),n("tr",null,[N,n("td",null,[n("a",P,[s("https://liucy.blog.csdn.net/article/details/132145067"),a(e)])])]),n("tr",null,[$,n("td",null,[n("a",T,[s("https://liucy.blog.csdn.net/article/details/133986013"),a(e)])])]),n("tr",null,[E,n("td",null,[n("a",F,[s("https://liucy.blog.csdn.net/article/details/133986102"),a(e)])])]),n("tr",null,[O,n("td",null,[n("a",R,[s("https://liucy.blog.csdn.net/article/details/144442148"),a(e)])])])])]),S])}const G=t(o,[["render",V],["__file","【Linux】nginx基础篇 -- 介绍及yum安装nginx.html.vue"]]);export{G as default};
