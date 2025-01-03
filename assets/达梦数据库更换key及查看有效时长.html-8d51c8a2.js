import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as e,e as a}from"./app-bccf5941.js";const i={},d=a(`<h2 id="一、登录数据库-查看授权日期" tabindex="-1"><a class="header-anchor" href="#一、登录数据库-查看授权日期" aria-hidden="true">#</a> 一、登录数据库，查看授权日期</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入数据库</span>
<span class="token builtin class-name">cd</span> /opt/dmdbms/bin <span class="token operator">&amp;&amp;</span> ./disql SYSDBA/SYSDBA@localhost:5236

<span class="token comment"># 查看授权时间</span>
<span class="token keyword">select</span> * from <span class="token function">v</span><span class="token variable">$license</span><span class="token punctuation">;</span>
<span class="token keyword">select</span> EXPIRED_DATE from <span class="token function">v</span><span class="token variable">$license</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、更新授权key" tabindex="-1"><a class="header-anchor" href="#二、更新授权key" aria-hidden="true">#</a> 二、更新授权key</h2><h3 id="_2-1-备份并替换授权key" tabindex="-1"><a class="header-anchor" href="#_2-1-备份并替换授权key" aria-hidden="true">#</a> 2.1 备份并替换授权key</h3><p>将<code>dm.key</code>移动到/opt/dmsetup/下进行替换并更新</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 先备份key</span>
<span class="token builtin class-name">cd</span> /opt/dmsetup
<span class="token function">mv</span> dm.key dm.key-bak

<span class="token comment"># 备份完之后，将新的dm.key移动到/opt/dmsetup下</span>
<span class="token function">mv</span> /root/dm.key /opt/dmsetup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-重启达梦数据库" tabindex="-1"><a class="header-anchor" href="#_2-2-重启达梦数据库" aria-hidden="true">#</a> 2.2 重启达梦数据库</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 重启</span>
/opt/dmdbms/bin/DmServiceDMSERVER restart

<span class="token comment"># 查看数据库服务状态</span>
/opt/dmdbms/bin/DmServiceDMSERVER status

<span class="token comment"># （runnint）则正在运行中</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-再次进入数据库查看授权日期是否更改" tabindex="-1"><a class="header-anchor" href="#_2-3-再次进入数据库查看授权日期是否更改" aria-hidden="true">#</a> 2.3 再次进入数据库查看授权日期是否更改</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入数据库</span>
<span class="token builtin class-name">cd</span> /opt/dmdbms/bin <span class="token operator">&amp;&amp;</span> ./disql SYSDBA/SYSDBA@localhost:5236

<span class="token comment"># 查看授权时间</span>
<span class="token keyword">select</span> * from <span class="token function">v</span><span class="token variable">$license</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),l=[d];function c(t,o){return n(),e("div",null,l)}const p=s(i,[["render",c],["__file","达梦数据库更换key及查看有效时长.html.vue"]]);export{p as default};
