import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e}from"./app-8d307529.js";const i={},t=e(`<h2 id="安装宝塔面板" tabindex="-1"><a class="header-anchor" href="#安装宝塔面板" aria-hidden="true">#</a> 安装宝塔面板</h2><ol><li>执行以下命令进行安装：</li></ol><p>CentOS7/8:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">wget</span> <span class="token operator">&amp;&amp;</span> <span class="token function">wget</span> <span class="token parameter variable">-O</span> install.sh http://download.bt.cn/install/install-ubuntu.sh <span class="token operator">&amp;&amp;</span> <span class="token function">sh</span> install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Ubuntu18.04/20.04:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-O</span> install.sh http://download.bt.cn/install/install_6.0.sh <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>安装过程中会提示输入数据库密码等信息，根据提示输入即可。</li><li>安装完成后，在浏览器中输入服务器 IP 地址并访问，即可看到宝塔面板的登录界面。</li></ol><h2 id="宝塔安装软件" tabindex="-1"><a class="header-anchor" href="#宝塔安装软件" aria-hidden="true">#</a> 宝塔安装软件</h2><p>安装MySQL，傻瓜式安装，直接点点点<br> 安装之后使用远程软件连接服务器MySQL会报错</p><div class="hint-container info"><p class="hint-container-title">相关信息</p><blockquote><p>1130-host ‘..‘ is not allowed to connect to this MySql</p></blockquote><h3 id="在服务器命令行中登录mysql" tabindex="-1"><a class="header-anchor" href="#在服务器命令行中登录mysql" aria-hidden="true">#</a> 在服务器命令行中登录MySQL</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> 

use mysql<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看用户表user数据" tabindex="-1"><a class="header-anchor" href="#查看用户表user数据" aria-hidden="true">#</a> 查看用户表user数据</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">select</span> Host, User,Password from user<span class="token punctuation">;</span>      <span class="token comment">#其中Password为数据库进入密码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="修改用户表user的host" tabindex="-1"><a class="header-anchor" href="#修改用户表user的host" aria-hidden="true">#</a> 修改用户表user的host</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>update user <span class="token builtin class-name">set</span> <span class="token assign-left variable">Host</span><span class="token operator">=</span><span class="token string">&#39;%&#39;</span> where <span class="token assign-left variable">User</span><span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">;</span>
flush privileges<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样即可成功！！！</p><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>还需安装其他软件<br> Java项目管理器(下载之后随便安装一个Tomcat即可获得Java环境)<br> Redis 安装完毕之后配置 所有都可访问 0.0.0.0 以及配置Redis密码(必需)<br> Nginx 首先安装完毕 具体配置后面进一步概述</p></div></div><h2 id="运行jar部署后端" tabindex="-1"><a class="header-anchor" href="#运行jar部署后端" aria-hidden="true">#</a> 运行jar部署后端</h2><p>打包后端代码jar包<br> 熟练java项目开发的，可以直接通过InteliJ IDEA或者eclipse软件打jar包。不熟悉的有第二种方法，是若依提供的。进入下载的项目文件夹中的bin目录下，直接双击执行package.bat，它会直接在项目中生成target文件夹，里面包含以及打包好的jar包。我们要使用的是ruoyi-admin文件夹下的target里的jar包。运行package.bat需要marven环境&gt;=3.0，操作顺序如下图：<br> 然后通过下面命令进行运行jar包</p><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>我这里是/home目录下面</p></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>nohup java <span class="token operator">-</span>jar xxxxx   <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行完毕之后，可以在当前运行jar的目录，通过下面命令来看运行的控制台输出。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>tail <span class="token operator">-</span>f nohup<span class="token punctuation">.</span>out
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112127512.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>这里我们的后端就部署成功了</p></div><h2 id="填写nginx配置部署前端" tabindex="-1"><a class="header-anchor" href="#填写nginx配置部署前端" aria-hidden="true">#</a> 填写NGINX配置部署前端</h2><p>打开dos窗口，进入ruoyi-ui文件夹，并对前端代码进行打包,生成一个dist文件夹，这就是前端代码打包后的文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --unsafe-perm <span class="token parameter variable">--registry</span><span class="token operator">=</span>https://registry.npm.taobao.org
<span class="token function">npm</span> run build:prod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以进入ruoyi-ui -&gt; bin目录中 双击鼠标运行build.bat文件<br> 打包后，会生成一个dist文件夹，如图所示：<br><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112127008.png" alt="image.png" loading="lazy"><br> 我们需要通过Xftp将dist文件夹拷贝到我们购买云服务器的一个目录，我这里将其dist文件夹拷贝到home目录门，如下：<br><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112127629.png" alt="image.png" loading="lazy"></p><p><strong>到这里我们去宝塔面板配置Linux面板的NGINX配置。</strong></p><p>找到NGINX配置修改处，如图：<br><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202307112127477.png" alt="image.png" loading="lazy"></p><p><strong>填入下面的配置，前端就算是配置完毕：</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>user  www<span class="token punctuation">;</span>

worker_processes auto<span class="token punctuation">;</span>

error_log  <span class="token operator">/</span>www<span class="token operator">/</span>wwwlogs<span class="token operator">/</span>nginx_error<span class="token punctuation">.</span>log  crit<span class="token punctuation">;</span>

pid        <span class="token operator">/</span>www<span class="token operator">/</span>server<span class="token operator">/</span>nginx<span class="token operator">/</span>logs<span class="token operator">/</span>nginx<span class="token punctuation">.</span>pid<span class="token punctuation">;</span>

worker_rlimit_nofile <span class="token number">51200</span><span class="token punctuation">;</span>



events

    <span class="token punctuation">{</span>
        use epoll<span class="token punctuation">;</span>
        worker_connections <span class="token number">51200</span><span class="token punctuation">;</span>
        multi_accept on<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

http <span class="token punctuation">{</span>
    include       mime<span class="token punctuation">.</span>types<span class="token punctuation">;</span>
    default_type  application<span class="token operator">/</span>octet<span class="token operator">-</span>stream<span class="token punctuation">;</span>
    sendfile        on<span class="token punctuation">;</span>
    keepalive_timeout  <span class="token number">65</span><span class="token punctuation">;</span>
    client_max_body_size <span class="token number">100</span>m<span class="token punctuation">;</span>


    #用于tomcat反向代理<span class="token punctuation">,</span>解决nginx <span class="token number">504</span>错误

    proxy_connect_timeout <span class="token number">7200</span><span class="token punctuation">;</span> #单位秒

    proxy_send_timeout <span class="token number">7200</span><span class="token punctuation">;</span> #单位秒

    proxy_read_timeout <span class="token number">7200</span><span class="token punctuation">;</span> #单位秒

    proxy_buffer_size <span class="token number">16</span>k<span class="token punctuation">;</span>

    proxy_buffers <span class="token number">4</span> <span class="token number">64</span>k<span class="token punctuation">;</span>

    proxy_busy_buffers_size <span class="token number">128</span>k<span class="token punctuation">;</span>

    proxy_temp_file_write_size <span class="token number">128</span>k<span class="token punctuation">;</span>

    # ps<span class="token operator">:</span>以timeout结尾配置项时间要配置大点


    server <span class="token punctuation">{</span>
        listen       <span class="token number">80</span><span class="token punctuation">;</span>
        server_name  <span class="token number">110.42</span><span class="token number">.253</span><span class="token number">.238</span><span class="token punctuation">;</span>
charset utf<span class="token operator">-</span><span class="token number">8</span><span class="token punctuation">;</span>


location <span class="token operator">/</span> <span class="token punctuation">{</span>
            root   <span class="token operator">/</span>home<span class="token operator">/</span>dist<span class="token punctuation">;</span>
			try_files $uri $uri<span class="token operator">/</span> <span class="token operator">/</span>index<span class="token punctuation">.</span>html<span class="token punctuation">;</span>
            index  index<span class="token punctuation">.</span>html index<span class="token punctuation">.</span>htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

location <span class="token operator">/</span>prod<span class="token operator">-</span>api<span class="token operator">/</span> <span class="token punctuation">{</span>
        proxy_set_header <span class="token class-name">Host</span> $http_host<span class="token punctuation">;</span>
        proxy_set_header <span class="token class-name">X</span><span class="token operator">-</span><span class="token class-name">Real</span><span class="token operator">-</span><span class="token constant">IP</span> $remote_addr<span class="token punctuation">;</span>
        proxy_set_header <span class="token constant">REMOTE</span><span class="token operator">-</span><span class="token constant">HOST</span> $remote_addr<span class="token punctuation">;</span>
        proxy_set_header <span class="token class-name">X</span><span class="token operator">-</span><span class="token class-name">Forwarded</span><span class="token operator">-</span><span class="token class-name">For</span> $proxy_add_x_forwarded_for<span class="token punctuation">;</span>
        proxy_pass http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span><span class="token number">110.42</span><span class="token number">.253</span><span class="token number">.238</span><span class="token operator">:</span><span class="token number">8765</span><span class="token operator">/</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>

        error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  <span class="token operator">/</span><span class="token number">50</span>x<span class="token punctuation">.</span>html<span class="token punctuation">;</span>
        location <span class="token operator">=</span> <span class="token operator">/</span><span class="token number">50</span>x<span class="token punctuation">.</span>html <span class="token punctuation">{</span>
            root   html<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>`,27),p=[t];function l(o,c){return s(),a("div",null,p)}const u=n(i,[["render",l],["__file","native-deployment-project.html.vue"]]);export{u as default};
