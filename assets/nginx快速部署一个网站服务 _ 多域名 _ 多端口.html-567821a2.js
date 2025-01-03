import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as o,a as n,b as s,d as e,e as i}from"./app-bccf5941.js";const d={},p=n("p",null,[s("👨‍🎓"),n("strong",null,"博主简介")],-1),r={href:"https://blog.csdn.net/liu_chen_yang?type=blog",target:"_blank",rel:"noopener noreferrer"},u=n("br",null,null,-1),v={href:"https://bbs.huaweicloud.com/community/myblog",target:"_blank",rel:"noopener noreferrer"},m=n("br",null,null,-1),b={href:"https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz",target:"_blank",rel:"noopener noreferrer"},g=n("br",null,null,-1),h=n("strong",null,"交流社区：",-1),k={href:"https://bbs.csdn.net/forums/lcy",target:"_blank",rel:"noopener noreferrer"},x=n("br",null,null,-1),f=n("br",null,null,-1),_=i(`<hr><h2 id="一、nginx虚拟主机-部署网站" tabindex="-1"><a class="header-anchor" href="#一、nginx虚拟主机-部署网站" aria-hidden="true">#</a> 一、nginx虚拟主机，部署网站</h2><blockquote><p>都是在同一台服务器上部署</p></blockquote><h2 id="二、部署单域名-ip网站服务" tabindex="-1"><a class="header-anchor" href="#二、部署单域名-ip网站服务" aria-hidden="true">#</a> 二、部署单域名/IP网站服务</h2><h3 id="_1、创建一个普通用户-用户管理nginx网站服务" tabindex="-1"><a class="header-anchor" href="#_1、创建一个普通用户-用户管理nginx网站服务" aria-hidden="true">#</a> 1、创建一个普通用户，用户管理nginx网站服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建一个名为www的用户组</span>
<span class="token function">groupadd</span> www <span class="token parameter variable">-g</span> <span class="token number">666</span>

<span class="token comment"># 创建一个名为www的用户并添加到www的用户组中</span>
<span class="token function">useradd</span> www <span class="token parameter variable">-u</span> <span class="token number">666</span> <span class="token parameter variable">-g</span> <span class="token number">666</span> <span class="token parameter variable">-M</span> <span class="token parameter variable">-s</span> /sbin/nologin

<span class="token comment"># 查看用户id</span>
<span class="token function">id</span> www
<span class="token comment">#结果</span>
<span class="token assign-left variable">uid</span><span class="token operator">=</span><span class="token number">666</span><span class="token punctuation">(</span>www<span class="token punctuation">)</span> <span class="token assign-left variable">gid</span><span class="token operator">=</span><span class="token number">666</span><span class="token punctuation">(</span>www<span class="token punctuation">)</span> <span class="token assign-left variable">groups</span><span class="token operator">=</span><span class="token number">666</span><span class="token punctuation">(</span>www<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、修改nginx主配置文件" tabindex="-1"><a class="header-anchor" href="#_2、修改nginx主配置文件" aria-hidden="true">#</a> 2、修改nginx主配置文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iz0jlfqv8fyt7iuxoec4clz ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/nginx/nginx.conf</span>

user  www<span class="token punctuation">;</span>		<span class="token comment"># 设置运行用户，刚刚创建的用户</span>
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

    include /etc/nginx/conf.d/*.conf<span class="token punctuation">;</span>		<span class="token comment"># include导入该目录下的*.conf配置文件</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、创建虚拟主机nignx子配置文件" tabindex="-1"><a class="header-anchor" href="#_3、创建虚拟主机nignx子配置文件" aria-hidden="true">#</a> 3、创建虚拟主机nignx子配置文件</h3><blockquote><p>只需要写server{}标签即可。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 先看conf.d下还有没有其他的*.conf结尾的，有的话先备份；</span>
<span class="token function">mv</span> default.conf  default.conf-bak
<span class="token comment"># 创建虚拟主机nignx子配置文件(qqfly配置文件)</span>
<span class="token function">vim</span> /etc/nginx/conf.d/qqfly.conf

<span class="token comment"># 写入如下信息，自己的根据情况自行修改（域名或ip;index.html的访问路径）</span>
server <span class="token punctuation">{</span> 
	
	listen <span class="token number">80</span><span class="token punctuation">;</span>
	<span class="token comment"># nginx会匹配 域名/IP:80</span>
	server_name 域名/IP/localhost<span class="token punctuation">;</span>
	<span class="token comment"># 支持中文的参数</span>
	charset utf-8<span class="token punctuation">;</span>
	location  /  <span class="token punctuation">{</span>
		<span class="token comment"># 根据root参数，填写网页根目录信息</span>
		<span class="token comment"># 表示当你访问 http://域名:80 ，自动来这个目录下找数据</span>
		root  /www/qqfly/<span class="token punctuation">;</span>
		<span class="token comment"># 默认找 /www/qqflq/ 的名字叫做index.html的文件</span>
		index  index.html<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面配置文件中配置了index.html的地址，这里可以看到是没有的，我们创建一下；</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建一个存放网页访问地址的目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /www/qqfly/

<span class="token comment"># 创建网页静态文件，index.html qqfly.jpg  qqfly.txt</span>
<span class="token comment"># 部署一个静态网站，最基本的提供，html，jpg，txt等静态数据；如果是其他类型的文件，nginx默认不解析，直接下载</span>
<span class="token comment"># nginx都可以帮你去返回，解析请求</span>
<span class="token builtin class-name">cd</span> /www/qqfly/

<span class="token comment"># 创建静态页面index.html</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /www/qqfly/index.html <span class="token operator">&lt;&lt;</span> EOF
<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>meta <span class="token assign-left variable">charset</span><span class="token operator">=</span>utf-<span class="token operator"><span class="token file-descriptor important">8</span>&gt;</span>
<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>H<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>这是一个 qqfly 的测试页面；用于证明nginx一个网站部署成功了；<span class="token operator">&lt;</span>/H<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>
<span class="token operator">&gt;</span> EOF

<span class="token comment"># 创建一个jpg文件</span>
<span class="token function">wget</span> <span class="token parameter variable">-O</span> qqfly.jpg https://i1.hdslb.com/bfs/archive/5edd3d62a5ca140063ef8e32a852348a422b86b6.jpg

<span class="token comment"># 创建一个txt文件</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;qq飞车游戏很好玩！测试！&quot;</span> <span class="token operator">&gt;</span> qqfly.txt

<span class="token comment"># 修改静态文件的属主，属组</span>
<span class="token function">chown</span> <span class="token parameter variable">-R</span> www:www /www/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、测试nginx配置文件语法-然后启动" tabindex="-1"><a class="header-anchor" href="#_4、测试nginx配置文件语法-然后启动" aria-hidden="true">#</a> 4、测试nginx配置文件语法，然后启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检测nginx配置中语法是否有误</span>
nginx <span class="token parameter variable">-t</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161334848.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>ok则为正常，没有错误；</p><ul><li>启动nginx</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看nginx状态</span>
systemctl status nginx
<span class="token comment"># 重启nginx</span>
systemctl restart nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5、域名访问地址" tabindex="-1"><a class="header-anchor" href="#_5、域名访问地址" aria-hidden="true">#</a> 5、域名访问地址</h3><blockquote><p>如果是使用的域名，那么需要在本地配置dns域名解析<br> 分别添加二级域名，三级域名，hosts解析<br><code>ip 三级域名 二级域名 </code></p></blockquote><ul><li>配置好还是访问不到？<br> 1、可以先看看可以ping通域名吗。<br> 2、检查你本地是否设置了代理，如果有则关闭。</li></ul><h3 id="_6、ip访问地址" tabindex="-1"><a class="header-anchor" href="#_6、ip访问地址" aria-hidden="true">#</a> 6、IP访问地址</h3><p>这里我使用的是ip地址访问，因为我的域名需要备案，申请还没下来，所以先用ip测试吧；</p><ul><li>访问html资源</li></ul><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161334423.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>访问jpg资源</li></ul><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161334458.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>访问txt资源</li></ul><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161334429.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>如果是其他类型的文件，nginx默认不解析，会直接下载</li></ul><blockquote><p>直接生成静态数据，不用重启nginx，这就是磁盘上的一些静态数据<br> nginx的server{}虚拟主机，以及设置了，去这个目录下搜索资料<br><br> nginx默认不识别这个test.ttt格式的文件，因此直接下载了</p></blockquote><p>例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> /www/qqfly/qqfly.ttt <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
qq飞车游戏很好玩！测试！
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为是静态页面，上面也说了，修改不用重启；（但是修改配置文件的话就需要重启nignx才能生效；）<br> 页面直接访问，会让你下载；</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161334698.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>下载完打开，里面的内容就是刚刚写进去的内容；</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161334131.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="三、nginx的配置文件匹配" tabindex="-1"><a class="header-anchor" href="#三、nginx的配置文件匹配" aria-hidden="true">#</a> 三、nginx的配置文件匹配</h2><p>还记得上面让备份的一个nginx配置文件吗，<code>/etc/nginx/conf.d/default.conf</code>，这个里面的server_name 写的是localhost，而咱们用的是ip访问网站，所以默认会先去找<code>default.conf</code>；所以在上面给他备份了一下，然后才会去找另一个conf文件。</p><p>nginx配置会有一个先后顺序，默认按照文件名的字典顺序读取 <code>/etc/nginx/conf.d</code> 目录下的配置文件。如果需要特定的加载顺序，可以使用 <code>include</code> 指令来指定读取文件的顺序。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#先看当前有几个nginx配置文件</span>
<span class="token punctuation">[</span>root@iz0jlfqv8fyt7iuxoec4clz conf.d<span class="token punctuation">]</span><span class="token comment"># ls</span>
default.conf-bak  qqfly.conf


<span class="token comment">#先看第一个default.conf</span>
<span class="token punctuation">[</span>root@iz0jlfqv8fyt7iuxoec4clz conf.d<span class="token punctuation">]</span><span class="token comment"># grep -Ev &#39;#|^$&#39; default.conf-bak</span>
server <span class="token punctuation">{</span>
    listen       <span class="token number">80</span><span class="token punctuation">;</span>
    server_name  localhost<span class="token punctuation">;</span>
    location / <span class="token punctuation">{</span>
        root   /usr/share/nginx/html<span class="token punctuation">;</span>
        index  index.html index.htm<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html<span class="token punctuation">;</span>
    location <span class="token operator">=</span> /50x.html <span class="token punctuation">{</span>
        root   /usr/share/nginx/html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>



<span class="token comment">#再看第二个配置文件</span>
<span class="token punctuation">[</span>root@iz0jlfqv8fyt7iuxoec4clz conf.d<span class="token punctuation">]</span><span class="token comment"># cat qqfly.conf </span>

server <span class="token punctuation">{</span> 
	
	listen <span class="token number">80</span><span class="token punctuation">;</span>
	<span class="token comment"># nginx会匹配 域名/IP:80</span>
	server_name 域名<span class="token punctuation">;</span>
	<span class="token comment"># 支持中文的参数</span>
	charset utf-8<span class="token punctuation">;</span>
	location  /  <span class="token punctuation">{</span>
		<span class="token comment"># 根据root参数，填写网页根目录信息</span>
		<span class="token comment"># 表示当你访问 http://域名:80 ，自动来这个目录下找数据</span>
		root  /www/qqfly/<span class="token punctuation">;</span>
		<span class="token comment"># 默认找 /www/qqflq/ 的名字叫做index.html的文件</span>
		index  index.html<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到一个写的域名，一个写的localhost；因为我们这边的域名用不了，所以，要是不备份那个<code>default.conf</code>默认的读取的就是<code>default.conf</code>这个配置文件；<br> 如果域名是没问题的，那么直接用域名访问，就会直接去找<code>qqfly.conf</code>这个配置文件，就不会存在先后顺序什么的。</p><h2 id="四、部署多域名网站服务" tabindex="-1"><a class="header-anchor" href="#四、部署多域名网站服务" aria-hidden="true">#</a> 四、部署多域名网站服务</h2><h3 id="_1、首先准备两个域名、index路径、nginx配置文件" tabindex="-1"><a class="header-anchor" href="#_1、首先准备两个域名、index路径、nginx配置文件" aria-hidden="true">#</a> 1、首先准备两个域名、index路径、nginx配置文件</h3><table><thead><tr><th>域名</th><th>nginx的index路径</th><th>nginx的配置文件名</th></tr></thead><tbody><tr><td>域名1 （test1.top）</td><td>/www/test1/index.html</td><td>/etc/nginx/conf.d/test1.conf</td></tr><tr><td>域名2 （test2.top）</td><td>/www/test1/index.html</td><td>/etc/nginx/conf.d/test2.conf</td></tr></tbody></table><p>配置域名的话自己配置就可以；</p><h3 id="_2、创建两个域名的nginx配置文件" tabindex="-1"><a class="header-anchor" href="#_2、创建两个域名的nginx配置文件" aria-hidden="true">#</a> 2、创建两个域名的nginx配置文件</h3><ul><li>test1域名</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/nginx/conf.d/test1.conf

<span class="token comment">#内容如下</span>
server <span class="token punctuation">{</span>

	listen	<span class="token number">80</span><span class="token punctuation">;</span>
	<span class="token comment">#域名1</span>
	server_name	test1.top<span class="token punctuation">;</span>
	<span class="token comment"># 支持中文的参数</span>
	charset utf-8<span class="token punctuation">;</span>

	location / <span class="token punctuation">{</span>
		root /www/test1/<span class="token punctuation">;</span>
		index index.html<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>test2域名</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/nginx/conf.d/test2.conf

<span class="token comment">#内容如下</span>
server <span class="token punctuation">{</span>

	listen	<span class="token number">80</span><span class="token punctuation">;</span>
	<span class="token comment">#域名1</span>
	server_name	test2.top<span class="token punctuation">;</span>
	<span class="token comment"># 支持中文的参数</span>
	charset utf-8<span class="token punctuation">;</span>

	location / <span class="token punctuation">{</span>
		root /www/test2/<span class="token punctuation">;</span>
		index index.html<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、创建两个域名的index-html访问页面" tabindex="-1"><a class="header-anchor" href="#_3、创建两个域名的index-html访问页面" aria-hidden="true">#</a> 3、创建两个域名的index.html访问页面</h3><ul><li>test1 的 index.html</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建test1和test2目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /www/<span class="token punctuation">{</span>test1,test2<span class="token punctuation">}</span>

<span class="token comment"># 创建完之后，写入数据到test1/index.html中</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /www/test1/index.html <span class="token operator">&lt;&lt;</span> EOF
<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>meta <span class="token assign-left variable">charset</span><span class="token operator">=</span>utf-<span class="token operator"><span class="token file-descriptor important">8</span>&gt;</span>
<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>H<span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span> test1 页面测试 <span class="token operator">&lt;</span>/H<span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>
<span class="token operator">&gt;</span> EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>test2 的 index.html</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 给test2域名写入index.html页面数据</span>

<span class="token function">cat</span> <span class="token operator">&gt;</span> /www/test2/index.html <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
&lt;meta charset=utf-8&gt;
&lt;H2&gt; test2 页面测试 &lt;/H2&gt;
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、检查nignx配置是否有误-并-重启nginx服务" tabindex="-1"><a class="header-anchor" href="#_4、检查nignx配置是否有误-并-重启nginx服务" aria-hidden="true">#</a> 4、检查nignx配置是否有误 并 重启nginx服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查nignx配置是否有误</span>
nginx <span class="token parameter variable">-t</span>

<span class="token comment"># 重启nginx服务</span>
systemctl restart nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5、页面访问两个域名" tabindex="-1"><a class="header-anchor" href="#_5、页面访问两个域名" aria-hidden="true">#</a> 5、页面访问两个域名</h3><blockquote><p>test1.top<br> teset2.top</p></blockquote><p>可以看到分别两个页面，这样多域名网站服务部署成功。</p><h2 id="五、部署多端口网站服务" tabindex="-1"><a class="header-anchor" href="#五、部署多端口网站服务" aria-hidden="true">#</a> 五、部署多端口网站服务</h2><h3 id="_1、首先准备两个端口、index路径、nginx配置文件-一个即可" tabindex="-1"><a class="header-anchor" href="#_1、首先准备两个端口、index路径、nginx配置文件-一个即可" aria-hidden="true">#</a> 1、首先准备两个端口、index路径、nginx配置文件（一个即可）</h3><table><thead><tr><th>端口</th><th>nginx的index路径</th><th>nginx的配置文件名（使用同一个配置）</th></tr></thead><tbody><tr><td>81</td><td>/www/81/index.html</td><td>/etc/nginx/conf.d/port.conf</td></tr><tr><td>82</td><td>/www/82/index.html</td><td>/etc/nginx/conf.d/port.conf</td></tr></tbody></table><h3 id="_2、创建两个port的nginx配置文件-一个配置中" tabindex="-1"><a class="header-anchor" href="#_2、创建两个port的nginx配置文件-一个配置中" aria-hidden="true">#</a> 2、创建两个port的nginx配置文件（一个配置中）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/nginx/conf.d/port.conf

<span class="token comment"># 81 端口配置</span>
server <span class="token punctuation">{</span>

	listen <span class="token number">81</span><span class="token punctuation">;</span>
	server_name localhost<span class="token punctuation">;</span>
	<span class="token comment"># 支持中文的参数</span>
	charset utf-8<span class="token punctuation">;</span>
	
	location / <span class="token punctuation">{</span>
		root /www/81/<span class="token punctuation">;</span>
		index index.html<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token comment"># 82 端口配置</span>
server <span class="token punctuation">{</span>

	listen <span class="token number">82</span><span class="token punctuation">;</span>
	server_name localhost<span class="token punctuation">;</span>
        <span class="token comment"># 支持中文的参数</span>
        charset utf-8<span class="token punctuation">;</span>

	location / <span class="token punctuation">{</span>
		root /www/82/<span class="token punctuation">;</span>
		index index.html<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、创建两个端口的index-html页面" tabindex="-1"><a class="header-anchor" href="#_3、创建两个端口的index-html页面" aria-hidden="true">#</a> 3、创建两个端口的index.html页面</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /www/<span class="token punctuation">{</span><span class="token number">81,82</span><span class="token punctuation">}</span>

<span class="token comment"># 创建81和82的index页面测试数据</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /www/81/index.html <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
&lt;meta charset=utf-8&gt;
&lt;H1&gt;我是81，欢迎来到我的页面&lt;/H1&gt;
EOF</span>

<span class="token function">cat</span> <span class="token operator">&gt;</span> /www/82/index.html <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
&lt;meta charset=utf-8&gt;
&lt;H1&gt;我是82，欢迎来到我的页面&lt;/H1&gt;
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、检查nignx配置是否有误-并-重启nginx服务-1" tabindex="-1"><a class="header-anchor" href="#_4、检查nignx配置是否有误-并-重启nginx服务-1" aria-hidden="true">#</a> 4、检查nignx配置是否有误 并 重启nginx服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查nignx配置是否有误</span>
nginx <span class="token parameter variable">-t</span>

<span class="token comment"># 重启nginx服务</span>
systemctl restart nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5、页面访问两个端口" tabindex="-1"><a class="header-anchor" href="#_5、页面访问两个端口" aria-hidden="true">#</a> 5、页面访问两个端口</h3><p>ip:端口</p><ul><li>ip:81</li></ul><p><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161333738.png" alt="" loading="lazy">- ip:82</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161333298.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_5-1-页面访问两个端口-各添加一个jpg页面" tabindex="-1"><a class="header-anchor" href="#_5-1-页面访问两个端口-各添加一个jpg页面" aria-hidden="true">#</a> 5.1 页面访问两个端口 --&gt; 各添加一个jpg页面</h4><p>到网上随便照两张图，分别放到<code>/www/81/</code>下和<code>/www/82/</code>下；</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 81端口的图片</span>
<span class="token function">wget</span> <span class="token parameter variable">-O</span> /www/81/81.jpg https://picnew12.photophoto.cn/20180728/81jianjunjieqizhiyishuzizitisheji-30355854_1.jpg

<span class="token comment"># 82端口的图片</span>
<span class="token function">wget</span> <span class="token parameter variable">-O</span> /www/82/82.jpg https://img95.699pic.com/xsj/0v/2f/k8.jpg%21/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里添加完成之后，不需要重启nginx，直接在页面访问 <code>ip:端口/图片名</code></p><ul><li>81 服务器（ip:81/81.jpg）</li></ul><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161333963.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>82 服务器（ip:82/82.jpg）</li></ul><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161333283.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_5-2-页面访问两个端口-各添加一个txt资源" tabindex="-1"><a class="header-anchor" href="#_5-2-页面访问两个端口-各添加一个txt资源" aria-hidden="true">#</a> 5.2 页面访问两个端口 --&gt; 各添加一个txt资源</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;我又来测试了，这里是 81 的一个测试页面&quot;</span> <span class="token operator">&gt;</span> /www/81/81.txt
<span class="token builtin class-name">echo</span> <span class="token string">&quot;我也又来测试了，这是是 82 的一个测试页面&quot;</span> <span class="token operator">&gt;</span> /www/82/82.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里添加完成之后，同样也不需要重启nginx，直接在页面访问 <code>ip:端口/txt名</code></p><ul><li>81 服务器（ip:81/81.txt）</li></ul><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161333787.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>82 服务器（ip:82/82.txt）</li></ul><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161333434.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="到这里就完成了nginx部署一个网站及多个域名的网站和多个端口的网站" tabindex="-1"><a class="header-anchor" href="#到这里就完成了nginx部署一个网站及多个域名的网站和多个端口的网站" aria-hidden="true">#</a> 到这里就完成了nginx部署一个网站及多个域名的网站和多个端口的网站</h3><h2 id="六、-相关文章" tabindex="-1"><a class="header-anchor" href="#六、-相关文章" aria-hidden="true">#</a> 六、 相关文章</h2>`,93),w=n("thead",null,[n("tr",null,[n("th",null,"文章标题"),n("th",null,"文章连接")])],-1),y=n("td",null,"【Linux】nginx基础篇 -- 介绍及yum安装nginx",-1),q={href:"https://liucy.blog.csdn.net/article/details/133928000",target:"_blank",rel:"noopener noreferrer"},j=n("td",null,"【Linux】环境下部署Nginx服务 - 二进制部署方式",-1),z={href:"https://liucy.blog.csdn.net/article/details/132145067",target:"_blank",rel:"noopener noreferrer"},E=n("td",null,"nginx配置负载均衡--实战项目（适用于轮询、加权轮询、ip_hash）",-1),O={href:"https://liucy.blog.csdn.net/article/details/133986013",target:"_blank",rel:"noopener noreferrer"},F=n("td",null,"nginx快速部署一个网站服务 + 多域名 + 多端口",-1),H={href:"https://liucy.blog.csdn.net/article/details/133986102",target:"_blank",rel:"noopener noreferrer"},$=n("td",null,"【Linux】Nginx一个域名https&一个地址配置多个项目【项目实战】",-1),L={href:"https://liucy.blog.csdn.net/article/details/144442148",target:"_blank",rel:"noopener noreferrer"},I=i('<h2 id="七、相关专栏" tabindex="-1"><a class="header-anchor" href="#七、相关专栏" aria-hidden="true">#</a> 七、相关专栏</h2><blockquote><div align="center"><a href="https://blog.csdn.net/liu_chen_yang/category_10887074.html">❀《Linux从入门到精通》专栏 ❀</a></div><div align="center"><a href="https://blog.csdn.net/liu_chen_yang/category_12419502.html">❀《Nginx》专栏 ❀</a></div></blockquote><blockquote><p>🐋 希望大家多多支持，我们一起进步！😄<br> 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗</p></blockquote>',3);function N(P,B){const a=l("ExternalLinkIcon");return c(),o("div",null,[n("blockquote",null,[p,n("p",null,[s("  🏅"),n("a",r,[s("云计算领域优质创作者"),e(a)]),u,s("   🏅"),n("a",v,[s("华为云开发者社区专家博主"),e(a)]),m,s("   🏅"),n("a",b,[s("阿里云开发者社区专家博主"),e(a)]),g,s(" 💊"),h,n("a",k,[s("运维交流社区"),e(a)]),s(" 欢迎大家的加入！"),x,s(" 🐋 希望大家多多支持，我们一起进步！😄"),f,s(" 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗")])]),_,n("table",null,[w,n("tbody",null,[n("tr",null,[y,n("td",null,[n("a",q,[s("https://liucy.blog.csdn.net/article/details/133928000"),e(a)])])]),n("tr",null,[j,n("td",null,[n("a",z,[s("https://liucy.blog.csdn.net/article/details/132145067"),e(a)])])]),n("tr",null,[E,n("td",null,[n("a",O,[s("https://liucy.blog.csdn.net/article/details/133986013"),e(a)])])]),n("tr",null,[F,n("td",null,[n("a",H,[s("https://liucy.blog.csdn.net/article/details/133986102"),e(a)])])]),n("tr",null,[$,n("td",null,[n("a",L,[s("https://liucy.blog.csdn.net/article/details/144442148"),e(a)])])])])]),I])}const C=t(d,[["render",N],["__file","nginx快速部署一个网站服务 _ 多域名 _ 多端口.html.vue"]]);export{C as default};
