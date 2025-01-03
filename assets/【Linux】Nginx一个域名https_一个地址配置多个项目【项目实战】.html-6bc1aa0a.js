import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as c,c as o,a as n,b as s,d as a,e as i}from"./app-bccf5941.js";const d={},r=n("p",null,[s("👨‍🎓"),n("strong",null,"博主简介")],-1),u={href:"https://blog.csdn.net/liu_chen_yang?type=blog",target:"_blank",rel:"noopener noreferrer"},p=n("br",null,null,-1),v={href:"https://blog.csdn.net/liu_chen_yang?type=blog",target:"_blank",rel:"noopener noreferrer"},m=n("br",null,null,-1),b={href:"https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234",target:"_blank",rel:"noopener noreferrer"},h=n("br",null,null,-1),k={href:"https://developer.aliyun.com/profile/7yu26jk3lfqxg",target:"_blank",rel:"noopener noreferrer"},_=n("br",null,null,-1),g=n("strong",null,"交流社区：",-1),x={href:"https://bbs.csdn.net/forums/lcy",target:"_blank",rel:"noopener noreferrer"},f=n("br",null,null,-1),y=n("br",null,null,-1),$=i(`<hr><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161338953.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="一个域名带https配置多个项目" tabindex="-1"><a class="header-anchor" href="#一个域名带https配置多个项目" aria-hidden="true">#</a> 一个域名带https配置多个项目</h2><p>①、首先将项目移动到html下；<br> ②、将ssl证书移动到目的地；<br> ③、然后进行nginx配置；</p><p>Nginx配置文件完整代码展示（主要在<code>server</code>段）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment">#user  root;</span>
worker_processes <span class="token number">1</span><span class="token punctuation">;</span>

events <span class="token punctuation">{</span>
  worker_connections <span class="token number">1024</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


http <span class="token punctuation">{</span>
  include mime.types<span class="token punctuation">;</span>
  default_type application/octet-stream<span class="token punctuation">;</span>

  sendfile on<span class="token punctuation">;</span>
  <span class="token comment">#tcp_nopush     on;</span>

  <span class="token comment">#keepalive_timeout  0;</span>
  keepalive_timeout <span class="token number">65</span><span class="token punctuation">;</span>

  <span class="token comment">#gzip  on;</span>

  server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name test.top www.test.top<span class="token punctuation">;</span>

    <span class="token comment"># HTTP 重定向到 HTTPS</span>
    <span class="token builtin class-name">return</span> <span class="token number">301</span> https://<span class="token variable">$host</span><span class="token variable">$request_uri</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  server <span class="token punctuation">{</span>
    listen <span class="token number">443</span> ssl<span class="token punctuation">;</span>
    server_name test.top www.test.top<span class="token punctuation">;</span>

    <span class="token comment"># SSL 配置</span>
    ssl_certificate /usr/local/nginx/conf/ssl/test.top.pem<span class="token punctuation">;</span>
    ssl_certificate_key /usr/local/nginx/conf/ssl/test.top.key<span class="token punctuation">;</span>
    ssl_protocols TLSv1.2 TLSv1.3<span class="token punctuation">;</span>
    ssl_ciphers <span class="token string">&#39;TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256&#39;</span><span class="token punctuation">;</span>
    ssl_prefer_server_ciphers on<span class="token punctuation">;</span>

    <span class="token comment"># 设置错误页面</span>
    error_page <span class="token number">404</span> /404.html<span class="token punctuation">;</span>
    error_page <span class="token number">500</span> /500.html<span class="token punctuation">;</span>

    location <span class="token operator">=</span> /404.html <span class="token punctuation">{</span>
      root /usr/local/nginx/html<span class="token punctuation">;</span>
      internal<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    location <span class="token operator">=</span> /500.html <span class="token punctuation">{</span>
      root /usr/local/nginx/html<span class="token punctuation">;</span>
      internal<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># 定义项目根目录</span>
    root /usr/local/nginx/html<span class="token punctuation">;</span>

    <span class="token comment"># 默认访问 项目1 【如果不想用项目1，也可以自定义其他项目】</span>
    location / <span class="token punctuation">{</span>
      try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /项目1/index.html<span class="token punctuation">;</span>
      <span class="token comment">#			root   html;</span>
      <span class="token comment">#			index  index.html index.htm;</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># 项目1 项目</span>
    location /项目1 <span class="token punctuation">{</span>
      <span class="token builtin class-name">alias</span> /usr/local/nginx/html/项目1<span class="token punctuation">;</span>
      try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /项目1/index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># 项目2 项目</span>
    location /项目2 <span class="token punctuation">{</span>
      <span class="token builtin class-name">alias</span> /usr/local/nginx/html/项目2<span class="token punctuation">;</span>
      try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /项目2/index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># 项目3 项目</span>
    location /项目3 <span class="token punctuation">{</span>
      <span class="token builtin class-name">alias</span> /usr/local/nginx/html/项目3<span class="token punctuation">;</span>
      try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /项目3/index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样页面访问时就可以是：<code>https://test.top/项目1/</code>、<code>https://test.top/项目2/</code>、<code>https://test.top/项目3/</code>。</p><h2 id="一个域名配置多个项目" tabindex="-1"><a class="header-anchor" href="#一个域名配置多个项目" aria-hidden="true">#</a> 一个域名配置多个项目</h2><p>①、首先将项目移动到html下；<br> ②、然后进行nginx配置；</p><p>Nginx配置文件完整代码展示（主要在<code>server</code>段）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment">#user  root;</span>
worker_processes <span class="token number">1</span><span class="token punctuation">;</span>

events <span class="token punctuation">{</span>
  worker_connections <span class="token number">1024</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


http <span class="token punctuation">{</span>
  include mime.types<span class="token punctuation">;</span>
  default_type application/octet-stream<span class="token punctuation">;</span>

  sendfile on<span class="token punctuation">;</span>
  <span class="token comment">#tcp_nopush     on;</span>

  <span class="token comment">#keepalive_timeout  0;</span>
  keepalive_timeout <span class="token number">65</span><span class="token punctuation">;</span>

  <span class="token comment">#gzip  on;</span>

  server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name test.top www.test.top<span class="token punctuation">;</span>

    <span class="token comment"># 设置错误页面</span>
    error_page <span class="token number">404</span> /404.html<span class="token punctuation">;</span>
    error_page <span class="token number">500</span> /500.html<span class="token punctuation">;</span>

    location <span class="token operator">=</span> /404.html <span class="token punctuation">{</span>
      root /usr/local/nginx/html<span class="token punctuation">;</span>
      internal<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    location <span class="token operator">=</span> /500.html <span class="token punctuation">{</span>
      root /usr/local/nginx/html<span class="token punctuation">;</span>
      internal<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># 定义项目根目录</span>
    root /usr/local/nginx/html<span class="token punctuation">;</span>

    <span class="token comment"># 默认访问 项目1 【如果不想用项目1，也可以自定义其他项目】</span>
    location / <span class="token punctuation">{</span>
      try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /项目1/index.html<span class="token punctuation">;</span>
      <span class="token comment">#			root   html;</span>
      <span class="token comment">#			index  index.html index.htm;</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># 项目1 项目</span>
    location /项目1 <span class="token punctuation">{</span>
      <span class="token builtin class-name">alias</span> /usr/local/nginx/html/项目1<span class="token punctuation">;</span>
      try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /项目1/index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># 项目2 项目</span>
    location /项目2 <span class="token punctuation">{</span>
      <span class="token builtin class-name">alias</span> /usr/local/nginx/html/项目2<span class="token punctuation">;</span>
      try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /项目2/index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># 项目3 项目</span>
    location /项目3 <span class="token punctuation">{</span>
      <span class="token builtin class-name">alias</span> /usr/local/nginx/html/项目3<span class="token punctuation">;</span>
      try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /项目3/index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样页面访问时就可以是：<code>http://test.top/项目1/</code>、<code>http://test.top/项目2/</code>、<code>http://test.top/项目3/</code>。</p><h2 id="本机地址配置多个项目" tabindex="-1"><a class="header-anchor" href="#本机地址配置多个项目" aria-hidden="true">#</a> 本机地址配置多个项目</h2><blockquote><p>本机地址配置多个项目这个其实和<code>一个域名配置多个项目</code>是一样的，只不过把<code>server_name</code>的域名换成<code>localhost</code>就行。<br><br> 具体操作如下：</p></blockquote><p>①、首先将项目移动到html下；<br> ②、然后进行nginx配置；</p><p>Nginx配置文件完整代码展示（主要在<code>server</code>段）：</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>
user root;
worker_processes 1;

events {
  worker_connections 1024;
}


http {
  include mime.types;
  default_type application/octet-stream;

  sendfile on;
  #tcp_nopush     on;

  #keepalive_timeout  0;
  keepalive_timeout 65;

  #gzip  on;

  server {
    listen 80;
    server_name localhost;

    # 设置错误页面
    error_page 404 /404.html;
    error_page 500 /500.html;

    location = /404.html {
      root /usr/local/nginx/html;
      internal;
    }

    location = /500.html {
      root /usr/local/nginx/html;
      internal;
    }

    # 定义项目根目录
    root /usr/local/nginx/html;

    # 默认访问 html/下的index.html页面
    location / {
      root html;
      index index.html index.htm;
      # 如果需要以项目1为默认页，可以把这个配置打开，上面的两个注释了就行；
      # try_files $uri $uri/ /项目1/index.html;
    }

    # 项目1 项目
    location /项目1 {
      alias /usr/local/nginx/html/项目1;
      try_files $uri $uri/ /项目1/index.html;
    }

    # 项目2 项目
    location /项目2 {
      alias /usr/local/nginx/html/项目2;
      try_files $uri $uri/ /项目2/index.html;
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样页面访问的是时候就可以是：<code>ip/项目1/</code>、<code>ip/项目2/</code>。</p>`,18),w={href:"https://tool.okcode.vip/dev/nginx-formatter",target:"_blank",rel:"noopener noreferrer"},S=n("br",null,null,-1),N=n("br",null,null,-1),L={href:"https://tool.okcode.vip/",target:"_blank",rel:"noopener noreferrer"},E=n("br",null,null,-1),q=n("br",null,null,-1),A={href:"https://download.csdn.net/download/liu_chen_yang/90123906",target:"_blank",rel:"noopener noreferrer"},C=n("h2",{id:"相关文章",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#相关文章","aria-hidden":"true"},"#"),s(" 相关文章")],-1),T=n("thead",null,[n("tr",null,[n("th",null,"文章标题"),n("th",null,"文章连接")])],-1),H=n("td",null,"【Linux】nginx基础篇 -- 介绍及yum安装nginx",-1),z={href:"https://liucy.blog.csdn.net/article/details/133928000",target:"_blank",rel:"noopener noreferrer"},D=n("td",null,"【Linux】环境下部署Nginx服务 - 二进制部署方式",-1),G={href:"https://liucy.blog.csdn.net/article/details/132145067",target:"_blank",rel:"noopener noreferrer"},M=n("td",null,"nginx配置负载均衡--实战项目（适用于轮询、加权轮询、ip_hash）",-1),V={href:"https://liucy.blog.csdn.net/article/details/133986013",target:"_blank",rel:"noopener noreferrer"},B=n("td",null,"nginx快速部署一个网站服务 + 多域名 + 多端口",-1),j={href:"https://liucy.blog.csdn.net/article/details/133986102",target:"_blank",rel:"noopener noreferrer"},I=n("td",null,"【Linux】Nginx一个域名https&一个地址配置多个项目【项目实战】",-1),P={href:"https://liucy.blog.csdn.net/article/details/144442148",target:"_blank",rel:"noopener noreferrer"},R=i('<h2 id="相关专栏" tabindex="-1"><a class="header-anchor" href="#相关专栏" aria-hidden="true">#</a> 相关专栏</h2><blockquote><div align="center"><a href="https://blog.csdn.net/liu_chen_yang/category_10887074.html">❀《Linux从入门到精通》专栏 ❀</a></div><div align="center"><a href="https://blog.csdn.net/liu_chen_yang/category_12419502.html">❀《Nginx》专栏 ❀</a></div></blockquote><blockquote><p>🐋 希望大家多多支持，我们一起进步！😄<br> 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗</p></blockquote>',3);function F(J,K){const e=t("ExternalLinkIcon");return c(),o("div",null,[n("blockquote",null,[r,n("p",null,[s("  🏅"),n("a",u,[s("CSDN博客专家"),a(e)]),p,s("   🏅"),n("a",v,[s("云计算领域优质创作者"),a(e)]),m,s("   🏅"),n("a",b,[s("华为云开发者社区专家博主"),a(e)]),h,s("   🏅"),n("a",k,[s("阿里云开发者社区专家博主"),a(e)]),_,s(" 💊"),g,n("a",x,[s("运维交流社区"),a(e)]),s(" 欢迎大家的加入！"),f,s(" 🐋 希望大家多多支持，我们一起进步！😄"),y,s(" 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗")])]),$,n("blockquote",null,[n("p",null,[s("推荐一个优化nginx配置文件的页面："),n("a",w,[s("Nginx配置文件格式化"),a(e)]),S,N,s(" 这里面还有很多格式化工具可以自己看看："),n("a",L,[s("https://tool.okcode.vip/"),a(e)]),E,q,s(" Nginx 404页面美化："),n("a",A,[s("Nginx 404页面美化"),a(e)])])]),C,n("table",null,[T,n("tbody",null,[n("tr",null,[H,n("td",null,[n("a",z,[s("https://liucy.blog.csdn.net/article/details/133928000"),a(e)])])]),n("tr",null,[D,n("td",null,[n("a",G,[s("https://liucy.blog.csdn.net/article/details/132145067"),a(e)])])]),n("tr",null,[M,n("td",null,[n("a",V,[s("https://liucy.blog.csdn.net/article/details/133986013"),a(e)])])]),n("tr",null,[B,n("td",null,[n("a",j,[s("https://liucy.blog.csdn.net/article/details/133986102"),a(e)])])]),n("tr",null,[I,n("td",null,[n("a",P,[s("https://liucy.blog.csdn.net/article/details/144442148"),a(e)])])])])]),R])}const U=l(d,[["render",F],["__file","【Linux】Nginx一个域名https_一个地址配置多个项目【项目实战】.html.vue"]]);export{U as default};
