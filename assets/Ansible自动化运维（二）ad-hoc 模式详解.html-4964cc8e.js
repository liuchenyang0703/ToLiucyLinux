import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as p,c as r,a as s,b as n,d as a,w as l,e as i}from"./app-bccf5941.js";const d={},u=s("p",null,[n("👨‍🎓"),s("strong",null,"博主简介")],-1),m={href:"https://blog.csdn.net/liu_chen_yang?type=blog",target:"_blank",rel:"noopener noreferrer"},b=s("br",null,null,-1),v={href:"https://bbs.huaweicloud.com/community/myblog",target:"_blank",rel:"noopener noreferrer"},k=s("br",null,null,-1),h={href:"https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz",target:"_blank",rel:"noopener noreferrer"},g=s("br",null,null,-1),q=s("strong",null,"交流社区：",-1),_={href:"https://bbs.csdn.net/forums/lcy",target:"_blank",rel:"noopener noreferrer"},f=s("br",null,null,-1),y=s("br",null,null,-1),x=i(`<h1 id="ansible-中的-ad-hoc-模式" tabindex="-1"><a class="header-anchor" href="#ansible-中的-ad-hoc-模式" aria-hidden="true">#</a> Ansible 中的 ad-hoc 模式</h1><p>Ad-hoc模式的使用场景:</p><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-0" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-0"> 查看某个进程的信息</label></li><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-1" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-1"> 拷贝日志到本地</label></li></ul><p>Ad-hoc模式的命令格式 ：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible 主机组名称 <span class="token parameter variable">-m</span> 模块 <span class="token parameter variable">-a</span> “具体命令”

常用选项:
<span class="token parameter variable">-m</span> 指定要使用的模块，不指定默认使用command模块 
<span class="token parameter variable">-a</span> 指定要执行的具体命令
<span class="token parameter variable">-i</span>  指定自定义的主机清单配置文件 
<span class="token parameter variable">-f</span>  一次返回几个结果
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1、ansible帮助命令" tabindex="-1"><a class="header-anchor" href="#_1、ansible帮助命令" aria-hidden="true">#</a> 1、Ansible帮助命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible-doc 		<span class="token comment">#帮助命令 </span>
ansible-doc <span class="token parameter variable">-l</span>   	<span class="token comment">#列出所以的模块</span>
ansible-doc 模块名   <span class="token comment">#查看模块的详细信息</span>
ansible-doc 模块名 <span class="token parameter variable">-s</span>  <span class="token comment">#查看模块的选项使用说明</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、ad-hoc-模式执行流程" tabindex="-1"><a class="header-anchor" href="#_2、ad-hoc-模式执行流程" aria-hidden="true">#</a> 2、ad-hoc 模式执行流程</h2><p>模块执行的工作流程:</p><ul><li><p>1.主控端命令行执行命令；</p></li><li><p>2.将模块拷贝到受控端；</p></li><li><p>3.按照模块定义的操作在受控端执行；</p></li><li><p>4.返回信息，删除受控端模块；</p></li></ul><blockquote><p>说明：</p><p>ansible模块可以使用的前提是：主控端与受控端python版本一致，并且Ansible的模块是幂等执行的</p></blockquote><p>Ansible执行命令的返回值颜色:</p>`,12),w=i(`<p>比如上面，最开始的主机清单配置规则中，返回的结果就是绿色的，表示只查看，并不会做修改。</p><h2 id="_3、ansible中常见的返回值" tabindex="-1"><a class="header-anchor" href="#_3、ansible中常见的返回值" aria-hidden="true">#</a> 3、Ansible中常见的返回值</h2><table><thead><tr><th>返回值</th><th>返回值含义</th></tr></thead><tbody><tr><td>changed</td><td>几乎所有的Ansible模块都会返回该变量，表示模块是否对远程主机执行了修改操作</td></tr><tr><td>failed</td><td>如果模块未能执行完成，将返回failed为true</td></tr><tr><td>msg</td><td>模块执行失败的原因，常见的错误如ssh连接失败</td></tr><tr><td>rc</td><td>与命令行工具相关的模块会返回rc,表示执行Linux命令的状态码</td></tr><tr><td>stdout</td><td>与rc类似，返回的是标准输出的结果</td></tr><tr><td>stderr</td><td>与rc类似，返回的是标准错误的结果</td></tr><tr><td>backup_file</td><td>所有存在backup选项的模块，用来返回备份文件的路径</td></tr><tr><td>results</td><td>应用在playbook中存在循环的情况，返回多个结果</td></tr></tbody></table><h2 id="_4、常用模块" tabindex="-1"><a class="header-anchor" href="#_4、常用模块" aria-hidden="true">#</a> 4、常用模块</h2><ul><li>远程命令相关</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>. <span class="token builtin class-name">command</span>  	<span class="token comment"># 默认使用模块，用于远程执命令，不支持管道</span>
<span class="token number">2</span>. shell   		<span class="token comment"># 远程执行命令，支持管道 </span>
<span class="token number">3</span>. raw    		<span class="token comment"># ssh登录，再执行</span>
<span class="token number">4</span>. script   	<span class="token comment"># 远程执行本地脚本</span>
<span class="token number">5</span>. yum			<span class="token comment"># 远程安装</span>
<span class="token number">6</span>. copy			<span class="token comment"># 推送文件</span>
<span class="token number">7</span>. <span class="token function">file</span>			<span class="token comment"># 对文件操作</span>
<span class="token number">8</span>. <span class="token function">service</span>		<span class="token comment"># 控制启动关闭服务</span>
<span class="token number">9</span>. systemd   	<span class="token comment"># 控制启动关闭服务</span>
<span class="token number">10</span>. <span class="token function">cron</span>		<span class="token comment"># 定时任务模块</span>
<span class="token number">11</span>. <span class="token function">mount</span>		<span class="token comment"># 挂载与卸载模块</span>
<span class="token number">12</span>. user/group	<span class="token comment"># 用于管理的用户创建与删除</span>
<span class="token number">13</span>. unarchive	<span class="token comment"># 解压缩模块</span>
<span class="token number">14</span>. get_url		<span class="token comment"># 下载文件，类似于curl</span>
<span class="token number">15</span>. firewalld	<span class="token comment"># 防火墙</span>
<span class="token number">16</span>. selinux		<span class="token comment"># selinux</span>
<span class="token number">17</span>. setup		<span class="token comment"># 获取主机信息</span>
<span class="token number">18</span>. <span class="token function">git</span>			<span class="token comment"># git命令模块</span>
<span class="token number">19</span>. <span class="token function">sysctl</span>      <span class="token comment"># 控制内核</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5、常用模块的用法" tabindex="-1"><a class="header-anchor" href="#_5、常用模块的用法" aria-hidden="true">#</a> 5、常用模块的用法</h2><h3 id="_5-1-command-模块-用于远程执命令-不支持管道" tabindex="-1"><a class="header-anchor" href="#_5-1-command-模块-用于远程执命令-不支持管道" aria-hidden="true">#</a> 5.1 command 模块：用于远程执命令，不支持管道</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-2" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-2"> command 模块：用于远程执命令，不支持管道</label></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible 主机组名称 <span class="token parameter variable">-m</span> <span class="token builtin class-name">command</span> <span class="token parameter variable">-a</span> “具体命令”
ansible 主机组名称 <span class="token parameter variable">-a</span> “具体命令”
<span class="token comment"># 默认为command模块</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># vim /etc/ansible/hosts </span>
<span class="token comment">#配置要远程的地址</span>
<span class="token punctuation">[</span>web_group<span class="token punctuation">]</span>
<span class="token number">172.16</span>.11.209
<span class="token number">172.16</span>.10.232

<span class="token punctuation">[</span>web_group:vars<span class="token punctuation">]</span>
<span class="token assign-left variable">ansible_ssh_pass</span><span class="token operator">=</span><span class="token string">&#39;123123&#39;</span>

<span class="token comment">#执行：</span>
<span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># ansible web_group -a &quot;mkdir /root/cs123&quot;</span>
<span class="token punctuation">[</span>WARNING<span class="token punctuation">]</span>: Consider using the <span class="token function">file</span> module with <span class="token assign-left variable">state</span><span class="token operator">=</span>directory rather than running <span class="token string">&#39;mkdir&#39;</span><span class="token builtin class-name">.</span>  If you need to use <span class="token builtin class-name">command</span> because <span class="token function">file</span> is insufficient you can
<span class="token function">add</span> <span class="token string">&#39;warn: false&#39;</span> to this <span class="token builtin class-name">command</span> task or <span class="token builtin class-name">set</span> <span class="token string">&#39;command_warnings=False&#39;</span> <span class="token keyword">in</span> ansible.cfg to get rid of this message.
<span class="token number">172.16</span>.11.209 <span class="token operator">|</span> CHANGED <span class="token operator">|</span> <span class="token assign-left variable">rc</span><span class="token operator">=</span><span class="token number">0</span> <span class="token operator">&gt;&gt;</span>

<span class="token number">172.16</span>.10.232 <span class="token operator">|</span> CHANGED <span class="token operator">|</span> <span class="token assign-left variable">rc</span><span class="token operator">=</span><span class="token number">0</span> <span class="token operator">&gt;&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_5-2-shell-模块-远程执行命令-支持管道" tabindex="-1"><a class="header-anchor" href="#_5-2-shell-模块-远程执行命令-支持管道" aria-hidden="true">#</a> 5.2 shell 模块：远程执行命令，支持管道</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-3" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-3"> shell 模块：远程执行命令，支持管道</label></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible 主机组名称 <span class="token parameter variable">-m</span> shell <span class="token parameter variable">-a</span> “具体命令”
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># vim /etc/ansible/hosts </span>
<span class="token comment">#配置要远程的地址</span>
<span class="token punctuation">[</span>web_group<span class="token punctuation">]</span>
<span class="token number">172.16</span>.11.209
<span class="token number">172.16</span>.10.232

<span class="token punctuation">[</span>web_group:vars<span class="token punctuation">]</span>
<span class="token assign-left variable">ansible_ssh_pass</span><span class="token operator">=</span><span class="token string">&#39;123123&#39;</span>

<span class="token comment">#执行：</span>
<span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># ansible web_group -m shell -a &quot;ls /home/test/&quot;</span>
<span class="token number">172.16</span>.10.232 <span class="token operator">|</span> CHANGED <span class="token operator">|</span> <span class="token assign-left variable">rc</span><span class="token operator">=</span><span class="token number">0</span> <span class="token operator">&gt;&gt;</span>
xunjian-yong.sh

<span class="token comment"># 在执行的时候多个地址是不分开的，需要仔细观看</span>

<span class="token number">172.16</span>.11.209 <span class="token operator">|</span> CHANGED <span class="token operator">|</span> <span class="token assign-left variable">rc</span><span class="token operator">=</span><span class="token number">0</span> <span class="token operator">&gt;&gt;</span>
xunjian-yong.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_5-3-raw-模块-ssh登录-再执行" tabindex="-1"><a class="header-anchor" href="#_5-3-raw-模块-ssh登录-再执行" aria-hidden="true">#</a> 5.3 raw 模块：ssh登录，再执行</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-4" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-4"> raw 模块：ssh登录，再执行</label></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible 主机组名称 <span class="token parameter variable">-m</span> raw <span class="token parameter variable">-a</span> “具体命令”
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># vim /etc/ansible/hosts </span>
<span class="token comment">#配置要远程的地址</span>
<span class="token punctuation">[</span>web_group<span class="token punctuation">]</span>
<span class="token number">172.16</span>.11.209
<span class="token number">172.16</span>.10.232

<span class="token punctuation">[</span>web_group:vars<span class="token punctuation">]</span>
<span class="token assign-left variable">ansible_ssh_pass</span><span class="token operator">=</span><span class="token string">&#39;123123&#39;</span>

<span class="token comment">#执行：</span>
<span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># ansible web_group -m raw -a &quot;ls /home/test/&quot;</span>
<span class="token number">172.16</span>.10.232 <span class="token operator">|</span> CHANGED <span class="token operator">|</span> <span class="token assign-left variable">rc</span><span class="token operator">=</span><span class="token number">0</span> <span class="token operator">&gt;&gt;</span>
xunjian-yong.sh
Shared connection to <span class="token number">172.16</span>.10.232 closed.

<span class="token number">172.16</span>.11.209 <span class="token operator">|</span> CHANGED <span class="token operator">|</span> <span class="token assign-left variable">rc</span><span class="token operator">=</span><span class="token number">0</span> <span class="token operator">&gt;&gt;</span>
xunjian-yong.sh
Shared connection to <span class="token number">172.16</span>.11.209 closed.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_5-4-script-模块-远程执行本地脚本" tabindex="-1"><a class="header-anchor" href="#_5-4-script-模块-远程执行本地脚本" aria-hidden="true">#</a> 5.4 script 模块：远程执行本地脚本</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-5" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-5"> script 模块：远程执行本地脚本</label></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible 主机组名称 <span class="token parameter variable">-m</span> script <span class="token parameter variable">-a</span> <span class="token string">&quot;your_script_file&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个命令中，将<code>主机组名称</code>替换为您的目标主机名或组名，并将<code>your_script_file</code>替换为您要在目标主机上执行的脚本文件的本地路径。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># vim /etc/ansible/hosts </span>
<span class="token comment">#配置要远程的地址</span>
<span class="token punctuation">[</span>web_group<span class="token punctuation">]</span>
<span class="token number">172.16</span>.11.209
<span class="token number">172.16</span>.10.232

<span class="token punctuation">[</span>web_group:vars<span class="token punctuation">]</span>
<span class="token assign-left variable">ansible_ssh_pass</span><span class="token operator">=</span><span class="token string">&#39;123123&#39;</span>

<span class="token comment">#执行：</span>
<span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># ansible web_group -m script -a &quot;/home/test/a.sh&quot;</span>
<span class="token number">172.16</span>.11.209 <span class="token operator">|</span> CHANGED <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;changed&quot;</span><span class="token builtin class-name">:</span> true, 
    <span class="token string">&quot;rc&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>, 
    <span class="token string">&quot;stderr&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Shared connection to 172.16.11.209 closed.<span class="token entity" title="\\r">\\r</span><span class="token entity" title="\\n">\\n</span>&quot;</span>, 
    <span class="token string">&quot;stderr_lines&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;Shared connection to 172.16.11.209 closed.&quot;</span>
    <span class="token punctuation">]</span>, 
    <span class="token string">&quot;stdout&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;bin  games    lib    libexec<span class="token entity" title="\\t">\\t</span>    openssh-9.4p1.tar.gz  openssl-1.1.1t  share<span class="token entity" title="\\r">\\r</span><span class="token entity" title="\\n">\\n</span>etc  include  lib64  openssh-9.4p1  openssl<span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span>  sbin<span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span>  src<span class="token entity" title="\\r">\\r</span><span class="token entity" title="\\n">\\n</span>&quot;</span>, 
    <span class="token string">&quot;stdout_lines&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;bin  games    lib    libexec<span class="token entity" title="\\t">\\t</span>    openssh-9.4p1.tar.gz  openssl-1.1.1t  share&quot;</span>, 
        <span class="token string">&quot;etc  include  lib64  openssh-9.4p1  openssl<span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span>  sbin<span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span>  src&quot;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token number">172.16</span>.10.232 <span class="token operator">|</span> CHANGED <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;changed&quot;</span><span class="token builtin class-name">:</span> true, 
    <span class="token string">&quot;rc&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>, 
    <span class="token string">&quot;stderr&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Shared connection to 172.16.10.232 closed.<span class="token entity" title="\\r">\\r</span><span class="token entity" title="\\n">\\n</span>&quot;</span>, 
    <span class="token string">&quot;stderr_lines&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;Shared connection to 172.16.10.232 closed.&quot;</span>
    <span class="token punctuation">]</span>, 
    <span class="token string">&quot;stdout&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;bin  games    lib    libexec<span class="token entity" title="\\t">\\t</span>    openssl<span class="token entity" title="\\t">\\t</span>    phpstudy  share<span class="token entity" title="\\r">\\r</span><span class="token entity" title="\\n">\\n</span>etc  include  lib64  openssh-9.3p2  openssl-1.1.1t  sbin      src<span class="token entity" title="\\r">\\r</span><span class="token entity" title="\\n">\\n</span>&quot;</span>, 
    <span class="token string">&quot;stdout_lines&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;bin  games    lib    libexec<span class="token entity" title="\\t">\\t</span>    openssl<span class="token entity" title="\\t">\\t</span>    phpstudy  share&quot;</span>, 
        <span class="token string">&quot;etc  include  lib64  openssh-9.3p2  openssl-1.1.1t  sbin      src&quot;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>a.sh中内容为：<code>ls /usr/local/</code></p><p>这将在目标主机上执行<code>a.sh</code>脚本文件。</p><p>请注意，<code>script</code>模块会将脚本文件传输到目标主机，然后在目标主机上执行它。因此，确保脚本文件在控制节点上可用，并且具有可执行权限（使用<code>chmod +x</code>命令添加执行权限）。</p><p>与<code>raw</code>模块不同，<code>script</code>模块允许您在目标主机上执行本地脚本文件，而不需要手动传输脚本内容。这对于执行复杂的本地操作非常有用。</p><hr><h3 id="_5-5-yum-模块-远程安装软件" tabindex="-1"><a class="header-anchor" href="#_5-5-yum-模块-远程安装软件" aria-hidden="true">#</a> 5.5 yum 模块：远程安装软件</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-6" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-6"> yum 模块：远程安装软件</label></li></ul><p><code>name</code>=软件包的名，多个软件包逗号隔开</p><p><code>state</code>=<code>installed/present</code>安装、<code>removed/absent</code>卸载 、<code>lastest</code> 更新、<code>installed</code>列出已安装的包</p><blockquote><p>yum模块的更多使用可使用<code>ansible-doc yum</code>查看。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible 主机组名称 <span class="token parameter variable">-m</span> yum <span class="token parameter variable">-a</span> <span class="token string">&quot;name=要安装\\卸载\\更新的包名 state=是安装还是卸载还是更新&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># vim /etc/ansible/hosts </span>
<span class="token comment">#配置要安装的地址</span>
<span class="token punctuation">[</span>web_group<span class="token punctuation">]</span>
<span class="token number">172.16</span>.11.209
<span class="token number">172.16</span>.10.232

<span class="token punctuation">[</span>web_group:vars<span class="token punctuation">]</span>
<span class="token assign-left variable">ansible_ssh_pass</span><span class="token operator">=</span><span class="token string">&#39;123123&#39;</span>

<span class="token comment">#执行：</span>
<span class="token comment">#更新lrzsz命令</span>
<span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># ansible web_group -m yum -a &quot;name=lrzsz state=latest&quot;</span>
<span class="token comment">#安装tldr和netstat命令</span>
<span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># ansible web_group -m yum -a &quot;name=tldr,net-tools state=present&quot;</span>
<span class="token number">172.16</span>.10.232 <span class="token operator">|</span> SUCCESS <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;ansible_facts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;discovered_interpreter_python&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/usr/bin/python&quot;</span>
    <span class="token punctuation">}</span>, 
    <span class="token string">&quot;changed&quot;</span><span class="token builtin class-name">:</span> false, 
    <span class="token string">&quot;msg&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>, 
    <span class="token string">&quot;rc&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>, 
    <span class="token string">&quot;results&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;tldr-1.2.0-4.el7.noarch providing tldr is already installed&quot;</span>, 
        <span class="token string">&quot;net-tools-2.0-0.25.20131004git.el7.x86_64 providing net-tools is already installed&quot;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token number">172.16</span>.11.209 <span class="token operator">|</span> SUCCESS <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;ansible_facts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;discovered_interpreter_python&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/usr/bin/python&quot;</span>
    <span class="token punctuation">}</span>, 
    <span class="token string">&quot;changed&quot;</span><span class="token builtin class-name">:</span> false, 
    <span class="token string">&quot;msg&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>, 
    <span class="token string">&quot;rc&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>, 
    <span class="token string">&quot;results&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;tldr-1.2.0-4.el7.noarch providing tldr is already installed&quot;</span>, 
        <span class="token string">&quot;net-tools-2.0-0.25.20131004git.el7.x86_64 providing net-tools is already installed&quot;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_5-6-copy-模块-推送文件" tabindex="-1"><a class="header-anchor" href="#_5-6-copy-模块-推送文件" aria-hidden="true">#</a> 5.6 copy 模块：推送文件</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-7" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-7"> copy 模块：推送文件</label></li></ul><p>推送文件模块</p><p><code>src</code>= 源文件路径</p><p><code>dest</code>= 目标文件路径</p><p><code>content</code>= 指定文件内容，只有目标文件；如果文件不存在会创建</p><p><code>owner</code>= 指定属主</p><p><code>group</code>= 指定属组</p><p><code>mode</code>= 指定权限</p><p>copy 模块的更多使用可使用<code>ansible-doc copy</code>查看。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible 主机组名称 <span class="token parameter variable">-m</span> copy <span class="token parameter variable">-a</span> <span class="token string">&quot;src=文件路径及文件 dest=目录文件路径&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># vim /etc/ansible/hosts </span>
<span class="token comment">#配置要复制的地址</span>
<span class="token punctuation">[</span>web_group<span class="token punctuation">]</span>
<span class="token number">172.16</span>.11.209
<span class="token number">172.16</span>.10.232

<span class="token punctuation">[</span>web_group:vars<span class="token punctuation">]</span>
<span class="token assign-left variable">ansible_ssh_pass</span><span class="token operator">=</span><span class="token string">&#39;123123&#39;</span>

<span class="token comment">#执行：</span>
<span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># ansible web_group -m copy -a &quot;src=/root/tongji.sh dest=/home/test/&quot;</span>
<span class="token number">172.16</span>.10.232 <span class="token operator">|</span> SUCCESS <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;ansible_facts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;discovered_interpreter_python&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/usr/bin/python&quot;</span>
    <span class="token punctuation">}</span>, 
    <span class="token string">&quot;changed&quot;</span><span class="token builtin class-name">:</span> false, 
    <span class="token string">&quot;checksum&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;4eff49d9f511f76b733cf739e820f8b7d17ff3f3&quot;</span>, 
    <span class="token string">&quot;dest&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/home/test/tongji.sh&quot;</span>, 
    <span class="token string">&quot;gid&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>, 
    <span class="token string">&quot;group&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;root&quot;</span>, 
    <span class="token string">&quot;mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;0644&quot;</span>, 
    <span class="token string">&quot;owner&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;root&quot;</span>, 
    <span class="token string">&quot;path&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/home/test/tongji.sh&quot;</span>, 
    <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10156</span>, 
    <span class="token string">&quot;state&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;file&quot;</span>, 
    <span class="token string">&quot;uid&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>
<span class="token number">172.16</span>.11.209 <span class="token operator">|</span> SUCCESS <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;ansible_facts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;discovered_interpreter_python&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/usr/bin/python&quot;</span>
    <span class="token punctuation">}</span>, 
    <span class="token string">&quot;changed&quot;</span><span class="token builtin class-name">:</span> false, 
    <span class="token string">&quot;checksum&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;4eff49d9f511f76b733cf739e820f8b7d17ff3f3&quot;</span>, 
    <span class="token string">&quot;dest&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/home/test/tongji.sh&quot;</span>, 
    <span class="token string">&quot;gid&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>, 
    <span class="token string">&quot;group&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;root&quot;</span>, 
    <span class="token string">&quot;mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;0644&quot;</span>, 
    <span class="token string">&quot;owner&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;root&quot;</span>, 
    <span class="token string">&quot;path&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/home/test/tongji.sh&quot;</span>, 
    <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10156</span>, 
    <span class="token string">&quot;state&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;file&quot;</span>, 
    <span class="token string">&quot;uid&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/416afb174f78414d8773763fd6917af3.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>这时候就可以看到两台服务器上都有这个文件了，如果想要先备份在复制，后面会讲到实战；</p><hr><h3 id="_5-7-file-模块-对文件操作" tabindex="-1"><a class="header-anchor" href="#_5-7-file-模块-对文件操作" aria-hidden="true">#</a> 5.7 file 模块：对文件操作</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-8" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-8"> file 模块：对文件操作</label></li></ul><p>对文件操作，创建文件或目录、删除文件或目录、修改文件权限</p><p><code>path</code> 指定路径</p><p><code>src</code> 源文件路径</p><p><code>recurse</code> 递归授权</p><p><code>owner</code> 指定属主</p><p><code>group</code> 指定属组</p><p><code>mode</code> 指定权限</p><p><code>state</code> 指定文件的状态</p><p>  <code>directory</code>   在远端创建目录</p><p>  <code>touch</code>  在远端创建文件</p><p>  <code>link</code>  创建软连接</p><p>  <code>hard</code>  创建硬连接</p><p>  <code>absent</code>  表示删除文件或目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible 主机组名称 <span class="token parameter variable">-m</span> <span class="token function">file</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;操作内容&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># vim /etc/ansible/hosts </span>
<span class="token comment">#配置要执行的地址</span>
<span class="token punctuation">[</span>web_group<span class="token punctuation">]</span>
<span class="token number">172.16</span>.11.209
<span class="token number">172.16</span>.10.232

<span class="token punctuation">[</span>web_group:vars<span class="token punctuation">]</span>
<span class="token assign-left variable">ansible_ssh_pass</span><span class="token operator">=</span><span class="token string">&#39;123123&#39;</span>

<span class="token comment">#执行：</span>
<span class="token comment"># 创建一个目录</span>
ansible web_group <span class="token parameter variable">-m</span> <span class="token function">file</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;path=/home/cs state=directory&quot;</span>

<span class="token comment"># 创建一个文件</span>
ansible web_group <span class="token parameter variable">-m</span> <span class="token function">file</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;path=/home/cs/cs.sh state=touch&quot;</span>

<span class="token comment"># 将/home/test/tongji.sh软连接到/home/cs/下</span>
ansible web_group <span class="token parameter variable">-m</span> <span class="token function">file</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;src=/home/test/tongji.sh path=/home/cs/tongji_link.sh state=link&quot;</span>

<span class="token comment"># 创建一个文件并给予root用户和执行权限</span>
ansible web_group <span class="token parameter variable">-m</span> <span class="token function">file</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;path=/home/cs/lv.sh state=touch mode=777 owner=root group=root&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_5-8-service-模块-控制启动关闭服务" tabindex="-1"><a class="header-anchor" href="#_5-8-service-模块-控制启动关闭服务" aria-hidden="true">#</a> 5.8 service 模块：控制启动关闭服务</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-9" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-9"> service 模块：控制启动关闭服务</label></li></ul><p><code>name </code> 定义要启动服务的名称</p><p><code>state</code> 指定服务状态</p><p>  <code>started</code> 启动服务（幂等）</p><p>  <code>stopped</code> 停止服务（幂等）</p><p>  <code>restarted</code> 重启服务</p><p>  <code>reloaded</code> 重载服务</p><p><code>enabled</code> 开机自启</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible 主机组名称 <span class="token parameter variable">-m</span> <span class="token function">service</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;name=服务名称 state=服务操作 enabled=是否设置开机自启&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># vim /etc/ansible/hosts </span>
<span class="token comment">#配置要执行的地址</span>
<span class="token punctuation">[</span>web_group<span class="token punctuation">]</span>
<span class="token number">172.16</span>.11.209
<span class="token number">172.16</span>.10.232

<span class="token punctuation">[</span>web_group:vars<span class="token punctuation">]</span>
<span class="token assign-left variable">ansible_ssh_pass</span><span class="token operator">=</span><span class="token string">&#39;123123&#39;</span>

<span class="token comment">#执行：</span>
<span class="token comment"># 可以先安装一个httpd服务来测试</span>
ansible web_group <span class="token parameter variable">-m</span> yum <span class="token parameter variable">-a</span> <span class="token string">&quot;name=httpd state=present&quot;</span>

<span class="token comment"># 启动httpd服务</span>
ansible web_group <span class="token parameter variable">-m</span> <span class="token function">service</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;name=httpd state=started&quot;</span>

<span class="token comment"># 关闭httpd服务</span>
ansible web_group <span class="token parameter variable">-m</span> <span class="token function">service</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;name=httpd state=stopped&quot;</span>

<span class="token comment"># 重启httpd服务状态</span>
ansible web_group <span class="token parameter variable">-m</span> <span class="token function">service</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;name=httpd state=restarted&quot;</span>

<span class="token comment"># 设置httpd服务开机自启</span>
ansible web_group <span class="token parameter variable">-m</span> <span class="token function">service</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;name=httpd state=enabled&quot;</span>

<span class="token comment"># 重启httpd服务并设置开机自启</span>
ansible web_group <span class="token parameter variable">-m</span> <span class="token function">service</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;name=httpd state=restarted enabled=yes&quot;</span>
<span class="token comment"># 设置完可以使用命令查看是否设置了开机自启</span>
systemctl is-enabled httpd
systemctl list-unit-files <span class="token parameter variable">--type</span><span class="token operator">=</span>service <span class="token parameter variable">--state</span><span class="token operator">=</span>enabled --no-pager <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;enabled&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> httpd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_5-9-cron-模块-定时任务" tabindex="-1"><a class="header-anchor" href="#_5-9-cron-模块-定时任务" aria-hidden="true">#</a> 5.9 cron 模块：定时任务</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-10" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-10"> cron 模块：定时任务</label></li></ul><p><code>name</code> 注释说明</p><p><code>minute、hour、day、month、weekday</code>（分、时、日、月、周）</p><p><code>user</code> 指定用户</p><p><code>job</code> 操作的指令</p><p><code>state </code></p><p>  <code>present</code> 创建</p><p>  <code>absent</code> 删除</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible 主机组名称 <span class="token parameter variable">-m</span> <span class="token function">cron</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;操作内容&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># vim /etc/ansible/hosts </span>
<span class="token comment">#配置要设置的地址</span>
<span class="token punctuation">[</span>web_group<span class="token punctuation">]</span>
<span class="token number">172.16</span>.11.209
<span class="token number">172.16</span>.10.232

<span class="token punctuation">[</span>web_group:vars<span class="token punctuation">]</span>
<span class="token assign-left variable">ansible_ssh_pass</span><span class="token operator">=</span><span class="token string">&#39;123123&#39;</span>

<span class="token comment">#执行：</span>
<span class="token comment"># 直接写一个定时任务(不写执行时间，默认就是每分钟一次；不写name默认为None);不建议使用。</span>
ansible web_group <span class="token parameter variable">-m</span> <span class="token function">cron</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;job=&#39;/bin/sh /home/cs/tongji_link.sh&#39;&quot;</span>

<span class="token comment"># 查看设置的定时任务</span>
<span class="token function">crontab</span> <span class="token parameter variable">-l</span>

<span class="token comment"># 设置定时执行统计脚本（每一个小时执行一次，使用root用户）</span>
ansible web_group <span class="token parameter variable">-m</span> <span class="token function">cron</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;name=&quot;</span>每小时执行一次统计脚本<span class="token string">&quot; minute=0 hour=*/1 day=* month=* weekday=* user=root job=&#39;/bin/sh /home/cs/tongji_link.sh&#39; state=present&quot;</span>

<span class="token comment"># 删除指定的定时任务</span>
ansible web_group <span class="token parameter variable">-m</span> <span class="token function">cron</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;name=&quot;</span>每小时执行一次统计脚本<span class="token string">&quot; minute=0 hour=*/1 day=* month=* weekday=* user=root job=&#39;/bin/sh /home/cs/tongji_link.sh&#39; state=absent&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_5-10-mount-模块-用于管理设备挂载与卸载" tabindex="-1"><a class="header-anchor" href="#_5-10-mount-模块-用于管理设备挂载与卸载" aria-hidden="true">#</a> 5.10 mount 模块：用于管理设备挂载与卸载</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-11" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-11"> mount 模块：用于管理设备挂载与卸载</label></li></ul><blockquote><p>mount操作需要谨慎，一不小心会导致服务器不可使用。</p></blockquote><p><code>src </code>：指定挂载源</p><p><code>path</code>：指定挂载点 (挂载点不存在会自动创建)</p><p><code>fstype</code>：指定文件系统类型</p><p><code>opts</code>：挂载参数，默认不写为：defaults</p><p><code>dump</code>：是否备份：0表示不进行备份</p><p><code>passno</code>：文件系统检测：0表示不进行文件系统检测</p><p><code>state</code></p><p>  <code>present</code>  写入fstab，但实际没有挂载，需要重启服务器</p><p>  <code>absent</code>  取消临时挂载，并且删除fstab</p><p>  <code>mounted</code>  写入fstab，并且直接挂载了（常用）</p><p>  <code>unmounted</code>  临时取消挂载，但是没有删除fstab，重启服务器之后就会恢复（常用）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible 主机组名称 <span class="token parameter variable">-m</span> <span class="token function">mount</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;操作内容&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># vim /etc/ansible/hosts </span>
<span class="token comment">#配置要挂载的地址</span>
<span class="token punctuation">[</span>web<span class="token punctuation">]</span>
<span class="token number">172.16</span>.11.209

<span class="token punctuation">[</span>web:vars<span class="token punctuation">]</span>
<span class="token assign-left variable">ansible_ssh_pass</span><span class="token operator">=</span><span class="token string">&#39;123123&#39;</span>

<span class="token comment">#执行：</span>
<span class="token comment"># 临时取消挂载在data的/dev/sdb（常用）</span>
ansible web <span class="token parameter variable">-m</span> <span class="token function">mount</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;src=/dev/sdb path=/data/ state=unmounted&quot;</span>

<span class="token comment"># 取消挂载在data的/dev/sdb，并且直接删除fstab中的单独配置（暂时没有成功，我也不知道为什么）</span>
ansible web <span class="token parameter variable">-m</span> <span class="token function">mount</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;src=/dev/sdb path=/data/ state=absent&quot;</span>

<span class="token comment"># 添加一个挂载写入fstab，但实际没有挂载，需要重启服务器，重启完就会自动挂载上</span>
ansible web <span class="token parameter variable">-m</span> <span class="token function">mount</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;src=/dev/sdb path=/data fstype=xfs opts=defaults dump=0 passno=0 state=present&quot;</span>

<span class="token comment"># 添加一个挂载写入fstab，并且直接挂载上（常用）</span>
ansible web <span class="token parameter variable">-m</span> <span class="token function">mount</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;src=/dev/sdb path=/data fstype=xfs opts=defaults dump=0 passno=0 state=mounted&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_5-11-user-group-模块-用于管理的用户创建与删除" tabindex="-1"><a class="header-anchor" href="#_5-11-user-group-模块-用于管理的用户创建与删除" aria-hidden="true">#</a> 5.11 user/group 模块：用于管理的用户创建与删除</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-12" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-12"> user/group 模块：用于管理的用户创建与删除</label></li></ul><blockquote><p>user用于管理用户的创建与删除，相当于useradd,userdel,usermod;</p><p>group模块用于管理用户组的，相当于groupadd,groupdel等。</p></blockquote><p><code>name</code>（必需）：指定用户的用户名。</p><p><code>state</code>：指定用户账户的状态。可以是以下之一：</p><p>  <code>present</code>：创建用户（默认值）。</p><p>  <code>absent</code>：删除用户。</p><p>  <code>locked</code>：锁定用户账户。</p><p>  <code>unlocked</code>：解锁用户账户。</p><p>  <code>password</code>：仅更改用户的密码。</p><p><code>uid</code>：指定用户的用户ID（UID）</p><p><code>gid</code>： 指定用户的用户ID（GID）</p><p><code>group</code>：指定用户的初始主组。</p><p><code>groups</code>：指定用户所属的其他组。</p><p><code>home</code>：指定用户的家目录路径。</p><p><code>shell</code>：指定用户的登录 shell。</p><p><code>password</code>：指定用户的密码（已加密的密码）。</p><p><code>append</code>：如果为 <code>yes</code>，则添加用户到组而不是替换（默认为 <code>no</code>）。</p><p><code>remove</code>：如果为 <code>yes</code>，则删除用户的家目录和邮箱文件（默认为 <code>no</code>）。</p><p><code>move_home</code>：如果为 <code>yes</code>，则在更改用户的主目录时移动用户的文件（默认为 <code>no</code>）。</p><p><code>create_home</code>：如果为 <code>yes</code>，则创建用户的主目录（默认为 <code>yes</code>）。</p><p><code>update_password</code>：如果为 <code>always</code>，则始终更新密码（默认为 <code>on_create</code>）。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible 主机组名称 <span class="token parameter variable">-m</span> user <span class="token parameter variable">-a</span> <span class="token string">&quot;操作内容&quot;</span>
ansible 主机组名称 <span class="token parameter variable">-m</span> group <span class="token parameter variable">-a</span> <span class="token string">&quot;操作内容&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># vim /etc/ansible/hosts </span>
<span class="token comment">#配置要管理的地址</span>
<span class="token punctuation">[</span>web<span class="token punctuation">]</span>
<span class="token number">172.16</span>.11.209

<span class="token punctuation">[</span>web:vars<span class="token punctuation">]</span>
<span class="token assign-left variable">ansible_ssh_pass</span><span class="token operator">=</span><span class="token string">&#39;123123&#39;</span>

<span class="token comment">#执行：</span>
<span class="token comment"># 创建用户，使用 user 模块创建一个名为 johndoe 的新用户：</span>
ansible web <span class="token parameter variable">-m</span> user <span class="token parameter variable">-a</span> <span class="token string">&quot;name=johndoe state=present&quot;</span>
<span class="token comment"># 查看</span>
<span class="token function">tail</span> <span class="token parameter variable">-1</span> /etc/passwd

<span class="token comment"># 删除用户，使用 user 模块删除一个名为 johndoe 的用户：</span>
ansible web <span class="token parameter variable">-m</span> user <span class="token parameter variable">-a</span> <span class="token string">&quot;name=johndoe state=absent&quot;</span>
<span class="token comment"># 删除用户和home家目录，使用 user 模块删除一个名为 johndoe 的用户：（常用）</span>
ansible web <span class="token parameter variable">-m</span> user <span class="token parameter variable">-a</span> <span class="token string">&quot;name=johndoe remove=yes state=absent&quot;</span>
<span class="token comment"># 查看</span>
<span class="token function">tail</span> <span class="token parameter variable">-1</span> /etc/passwd

<span class="token comment"># 创建组，使用 group 模块创建一个名为 mygroup 的新组：</span>
ansible web <span class="token parameter variable">-m</span> group <span class="token parameter variable">-a</span> <span class="token string">&quot;name=mygroup state=present&quot;</span>
<span class="token comment"># 查看</span>
<span class="token function">tail</span> <span class="token parameter variable">-1</span> /etc/group

<span class="token comment"># 删除组，使用 group 模块删除一个名为 mygroup 的组：</span>
ansible web <span class="token parameter variable">-m</span> group <span class="token parameter variable">-a</span> <span class="token string">&quot;name=mygroup state=absent&quot;</span>
<span class="token comment"># 查看</span>
<span class="token function">tail</span> <span class="token parameter variable">-1</span> /etc/group

<span class="token comment"># 在将上面的用户和用户组在创建一遍；</span>
ansible web <span class="token parameter variable">-m</span> user <span class="token parameter variable">-a</span> <span class="token string">&quot;name=johndoe state=present&quot;</span>
ansible web <span class="token parameter variable">-m</span> group <span class="token parameter variable">-a</span> <span class="token string">&quot;name=mygroup state=present&quot;</span>
<span class="token comment"># 添加用户到组，使用 user 模块将用户 johndoe 添加到组 mygroup：</span>
ansible web <span class="token parameter variable">-m</span> user <span class="token parameter variable">-a</span> <span class="token string">&quot;name=johndoe group=mygroup append=yes&quot;</span>
<span class="token comment"># 查看</span>
<span class="token function">tail</span> <span class="token parameter variable">-1</span> /etc/passwd

<span class="token comment"># 从组中移除用户，使用 user 模块从组 mygroup 中移除用户 johndoe：</span>
ansible web <span class="token parameter variable">-m</span> user <span class="token parameter variable">-a</span> <span class="token string">&quot;name=johndoe groups=mygroup append=no&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里就不写加创建密码的了，因为创建密码必须要<code>哈希密码</code>；我这边用了转换成哈希的密码还是不行，不知道为啥；</p><p>这里写了一个转为<code>哈希密码</code>的py脚本，需要在<code>PyCharm</code>中运行，交互式的；</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> bcrypt

<span class="token comment"># 加密密码</span>
passwd <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请输入要加密的密码：&quot;</span><span class="token punctuation">)</span>
password <span class="token operator">=</span> passwd<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>
salt <span class="token operator">=</span> bcrypt<span class="token punctuation">.</span>gensalt<span class="token punctuation">(</span><span class="token punctuation">)</span>
hashed_password <span class="token operator">=</span> bcrypt<span class="token punctuation">.</span>hashpw<span class="token punctuation">(</span>password<span class="token punctuation">,</span> salt<span class="token punctuation">)</span>

<span class="token comment"># 输出哈希密码</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;转换后的哈希密码：&quot;</span><span class="token punctuation">,</span> hashed_password<span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 验证密码</span>
password_to_check <span class="token operator">=</span> passwd<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> bcrypt<span class="token punctuation">.</span>checkpw<span class="token punctuation">(</span>password_to_check<span class="token punctuation">,</span> hashed_password<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;密码验证成功！&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;密码验证失败！&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里还是建议如果需要加密码或者修改密码使用command、shell、raw方式去执行 <code>passwd 用户名 </code>修改；</p><hr><h3 id="_5-12-unarchive-模块-解压缩模块" tabindex="-1"><a class="header-anchor" href="#_5-12-unarchive-模块-解压缩模块" aria-hidden="true">#</a> 5.12 unarchive 模块：解压缩模块</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-13" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-13"> unarchive 解压缩模块</label></li></ul><p>解压缩模块，这个模块有两种用法：</p><blockquote><ul><li><p>1、将ansible主机上的压缩包在本地解压缩后传到远程主机上，这种情况下，copy=yes.本地解压缩,解压缩位置不是默认的目录,没找到或传完删了后传到远程主机</p></li><li><p>2、将远程主机上的某个压缩包解压缩到指定路径下。这种情况下，需要设置copy=no远程主机上面的操作,不涉及ansible服务端</p></li></ul></blockquote>`,147),j=i(`<p><code>copy</code> 默认为<code>no</code>，当copy=yes，那么拷贝的文件是从ansible主机复制到远程主机上而不是在原地解压缩，如果设置为copy=no，那么会在远程主机上寻找src源文件;</p><p><code>src</code> 源路径，可以是ansible主机上的路径，也可以是远程主机上的路径，如果是远程主机上的路径，则需要设置copy=no</p><p><code>dest</code> 指定了解压缩后文件的目标目录</p><p><code>mode</code> 设置解压缩后的文件权限，可以使用数字或符号模式，例如 <code>&quot;0644&quot;</code> 或 <code>&quot;u=rw,go=r&quot;</code>。</p><p><code>list_files</code> 默认值为no,如果设置为yes，解压同时，返回压缩包的文件列表</p><p><code>remote_src</code>：如果设置为 <code>yes</code>，则表示 <code>src</code> 参数是远程主机上的路径。</p><p><code>extra_opts</code>: 允许您指定解压缩命令的额外选项。这对于一些特定格式的存档文件非常有用。</p><p><code>creates</code>: 如果指定了此选项，只有在 <code>creates</code> 中指定的文件或目录不存在时，才会执行解压缩操作。</p><p><code>owner</code>: 设置解压缩后文件的所有者。</p><p><code>group</code>: 设置解压缩后文件的所属组。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible 主机组名称 <span class="token parameter variable">-m</span> unarchive <span class="token parameter variable">-a</span> <span class="token string">&quot;src=源路径 dest=目标路径 其他参数&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># vim /etc/ansible/hosts </span>
<span class="token comment">#配置要解压的地址</span>
<span class="token punctuation">[</span>web<span class="token punctuation">]</span>
<span class="token number">172.16</span>.11.209

<span class="token punctuation">[</span>web:vars<span class="token punctuation">]</span>
<span class="token assign-left variable">ansible_ssh_pass</span><span class="token operator">=</span><span class="token string">&#39;123123&#39;</span>

<span class="token comment">#执行：</span>
<span class="token comment"># 将jdk-8u221-linux-x64.tar.gz复制到/home/cs/下并解压</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ansible web -m unarchive -a &quot;src=/home/test/jdk-8u221-linux-x64.tar.gz dest=/home/cs/&quot;</span>
<span class="token number">172.16</span>.11.209 <span class="token operator">|</span> CHANGED <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;ansible_facts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;discovered_interpreter_python&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/usr/bin/python&quot;</span>
    <span class="token punctuation">}</span>, 
    <span class="token string">&quot;changed&quot;</span><span class="token builtin class-name">:</span> true, 
    <span class="token string">&quot;dest&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/home/cs/&quot;</span>, 
    <span class="token string">&quot;extract_results&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;cmd&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;/usr/bin/gtar&quot;</span>, 
            <span class="token string">&quot;--extract&quot;</span>, 
            <span class="token string">&quot;-C&quot;</span>, 
            <span class="token string">&quot;/home/cs/&quot;</span>, 
            <span class="token string">&quot;-z&quot;</span>, 
            <span class="token string">&quot;-f&quot;</span>, 
            <span class="token string">&quot;/root/.ansible/tmp/ansible-tmp-1697035885.77-18118-31918487585626/source&quot;</span>
        <span class="token punctuation">]</span>, 
        <span class="token string">&quot;err&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>, 
        <span class="token string">&quot;out&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>, 
        <span class="token string">&quot;rc&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>, 
    <span class="token string">&quot;gid&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>, 
    <span class="token string">&quot;group&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;root&quot;</span>, 
    <span class="token string">&quot;handler&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;TgzArchive&quot;</span>, 
    <span class="token string">&quot;mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;0755&quot;</span>, 
    <span class="token string">&quot;owner&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;root&quot;</span>, 
    <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">26</span>, 
    <span class="token string">&quot;src&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/root/.ansible/tmp/ansible-tmp-1697035885.77-18118-31918487585626/source&quot;</span>, 
    <span class="token string">&quot;state&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;directory&quot;</span>, 
    <span class="token string">&quot;uid&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_5-13-get-url-模块-下载文件" tabindex="-1"><a class="header-anchor" href="#_5-13-get-url-模块-下载文件" aria-hidden="true">#</a> 5.13 get_url 模块：下载文件</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-14" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-14"> get_url 模块：下载文件</label></li></ul><ul><li><code>url</code> (必需): 指定要下载文件的URL。这是一个必需参数。</li><li><code>dest</code> (必需): 指定文件将保存到本地目标主机上的目标路径。这是一个必需参数。</li><li><code>force</code> (可选): 如果设置为 <code>yes</code>，将强制下载文件，即使文件已经存在。默认为 <code>no</code>。</li><li><code>checksum</code> (可选): 提供要下载文件的校验和，以确保文件完整性。</li><li><code>backup</code> (可选): 如果设置为 <code>yes</code>，将在下载之前备份现有文件。默认为 <code>no</code>。</li><li><code>timeout</code> (可选): 设置下载文件的超时时间（秒）。</li><li><code>url_username</code> (可选): 如果目标URL需要身份验证，可以提供用户名。</li><li><code>url_password</code> (可选): 如果目标URL需要身份验证，可以提供密码。</li><li><code>owner</code> (可选): 设置下载后文件的所有者。</li><li><code>group</code> (可选): 设置下载后文件的所属组。</li><li><code>mode</code> (可选): 设置下载后文件的权限模式。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible 主机组名称 <span class="token parameter variable">-m</span> get_url <span class="token parameter variable">-a</span> <span class="token string">&quot;url=远程下载的url dest=目标路径 其他参数&quot;</span>
ansible web <span class="token parameter variable">-m</span> get_url <span class="token parameter variable">-a</span> <span class="token string">&quot;url=https://example.com/file.txt dest=/path/to/local/file.txt&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># vim /etc/ansible/hosts </span>
<span class="token comment">#配置要下载到的地址</span>
<span class="token punctuation">[</span>web<span class="token punctuation">]</span>
<span class="token number">172.16</span>.11.209

<span class="token punctuation">[</span>web:vars<span class="token punctuation">]</span>
<span class="token assign-left variable">ansible_ssh_pass</span><span class="token operator">=</span><span class="token string">&#39;123123&#39;</span>

<span class="token comment">#执行：</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ansible web -m get_url -a &quot;url=https://liucy.blog.csdn.net/article/details/133460612?spm=1001.2014.3001.5502 dest=/home/cs/csdn.txt&quot;</span>
<span class="token number">172.16</span>.11.209 <span class="token operator">|</span> CHANGED <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;ansible_facts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;discovered_interpreter_python&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/usr/bin/python&quot;</span>
    <span class="token punctuation">}</span>, 
    <span class="token string">&quot;changed&quot;</span><span class="token builtin class-name">:</span> true, 
    <span class="token string">&quot;checksum_dest&quot;</span><span class="token builtin class-name">:</span> null, 
    <span class="token string">&quot;checksum_src&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;263c306aaaa75ea1890f33fb846e17c47bac1a7c&quot;</span>, 
    <span class="token string">&quot;dest&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/home/cs/csdn.txt&quot;</span>, 
    <span class="token string">&quot;elapsed&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>, 
    <span class="token string">&quot;gid&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>, 
    <span class="token string">&quot;group&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;root&quot;</span>, 
    <span class="token string">&quot;md5sum&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;6337bd5bd661d45598c6402652c59e03&quot;</span>, 
    <span class="token string">&quot;mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;0644&quot;</span>, 
    <span class="token string">&quot;msg&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;OK (unknown bytes)&quot;</span>, 
    <span class="token string">&quot;owner&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;root&quot;</span>, 
    <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">244776</span>, 
    <span class="token string">&quot;src&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/root/.ansible/tmp/ansible-tmp-1697037340.77-18641-38036675583497/tmp0nw1sp&quot;</span>, 
    <span class="token string">&quot;state&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;file&quot;</span>, 
    <span class="token string">&quot;status_code&quot;</span><span class="token builtin class-name">:</span> <span class="token number">200</span>, 
    <span class="token string">&quot;uid&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>, 
    <span class="token string">&quot;url&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;https://liucy.blog.csdn.net/article/details/133460612?spm=1001.2014.3001.5502&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_5-14-setup-模块-获取主机信息" tabindex="-1"><a class="header-anchor" href="#_5-14-setup-模块-获取主机信息" aria-hidden="true">#</a> 5.14 setup 模块：获取主机信息</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-15" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-15"> setup 模块：获取主机信息</label></li></ul><p><code>setup</code> 模块不仅是一个常见的模块，而且是一个特殊的模块。它用于获取目标主机的系统信息和事实（facts），并将这些信息返回到 Ansible Playbook 中，以供后续任务使用。<code>setup</code> 模块通常不需要额外的参数，因为它会自动获取系统信息。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible web <span class="token parameter variable">-m</span> setup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>获取的信息较长，可以使用重定向到一个空文件中。</p><ul><li>常用的几个参数：</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible_all_ipv4_addresses <span class="token comment"># ipv4的所有地址</span>
ansible_all_ipv6_addresses <span class="token comment"># ipv6的所有地址</span>
ansible_date_time <span class="token comment"># 获取到控制节点时间</span>
ansible_default_ipv4 <span class="token comment"># 默认的ipv4地址</span>
ansible_distribution <span class="token comment"># 系统</span>
ansible_distribution_major_version <span class="token comment"># 系统的大版本</span>
ansible_distribution_version <span class="token comment"># 系统的版本号</span>
ansible_domain <span class="token comment">#系统所在的域</span>
ansible_env <span class="token comment">#系统的环境变量</span>
ansible_hostname <span class="token comment">#系统的主机名</span>
ansible_fqdn <span class="token comment">#系统的全名</span>
ansible_machine <span class="token comment">#系统的架构</span>
ansible_memory_mb <span class="token comment">#系统的内存信息</span>
ansible_os_family <span class="token comment"># 系统的家族</span>
ansible_pkg_mgr <span class="token comment"># 系统的包管理工具</span>
ansible_processor_cores <span class="token comment">#系统的cpu的核数(每颗)</span>
ansible_processor_count <span class="token comment">#系统cpu的颗数</span>
ansible_processor_vcpus <span class="token comment">#系统cpu的总个数=cpu的颗数*CPU的核数</span>
ansible_python <span class="token comment"># 系统上的python</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26),A={href:"https://liucy.blog.csdn.net/article/details/129041706",target:"_blank",rel:"noopener noreferrer"},C=s("h2",{id:"_6、相关文章",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_6、相关文章","aria-hidden":"true"},"#"),n(" 6、相关文章")],-1),z=s("thead",null,[s("tr",null,[s("th",{style:{"text-align":"center"}},"文章标题"),s("th",{style:{"text-align":"center"}},"文章链接")])],-1),S={style:{"text-align":"center"}},E={href:"https://liucy.blog.csdn.net/article/details/133769300",target:"_blank",rel:"noopener noreferrer"},N={style:{"text-align":"center"}},D={href:"https://liucy.blog.csdn.net/article/details/133769300",target:"_blank",rel:"noopener noreferrer"},G={style:{"text-align":"center"}},H={href:"https://liucy.blog.csdn.net/article/details/133772023",target:"_blank",rel:"noopener noreferrer"},U={style:{"text-align":"center"}},I={href:"https://liucy.blog.csdn.net/article/details/133772023",target:"_blank",rel:"noopener noreferrer"},L={style:{"text-align":"center"}},R={href:"https://liucy.blog.csdn.net/article/details/133899966",target:"_blank",rel:"noopener noreferrer"},P={style:{"text-align":"center"}},V={href:"https://liucy.blog.csdn.net/article/details/133899966",target:"_blank",rel:"noopener noreferrer"},B={style:{"text-align":"center"}},T={href:"https://liucy.blog.csdn.net/article/details/133994509",target:"_blank",rel:"noopener noreferrer"},F={style:{"text-align":"center"}},K={href:"https://liucy.blog.csdn.net/article/details/133994509",target:"_blank",rel:"noopener noreferrer"};function O(W,J){const e=o("ExternalLinkIcon"),t=o("font");return p(),r("div",null,[s("blockquote",null,[u,s("p",null,[n("  🏅"),s("a",m,[n("云计算领域优质创作者"),a(e)]),b,n("   🏅"),s("a",v,[n("华为云开发者社区专家博主"),a(e)]),k,n("   🏅"),s("a",h,[n("阿里云开发者社区专家博主"),a(e)]),g,n(" 💊"),q,s("a",_,[n("运维交流社区"),a(e)]),n(" 欢迎大家的加入！"),f,n(" 🐋 希望大家多多支持，我们一起进步！😄"),y,n(" 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗")])]),x,s("blockquote",null,[a(t,{color:"feces",yellow:""},{default:l(()=>[n("屎黄色:执行命令成功，并且做了修改；")]),_:1}),a(t,{color:"mediumseagreen"},{default:l(()=>[n("草帽绿:执行命令成功，只查看信息，没有修改")]),_:1}),a(t,{color:"deeppink"},{default:l(()=>[n("玫瑰红:执行失败，报错 ")]),_:1}),a(t,{color:"rebeccapurple"},{default:l(()=>[n("葡萄紫:表示对命令发错的操作有警告信息")]),_:1})]),w,a(t,{color:"red"},{default:l(()=>[n("tar、.tar.gz、.tar.bz2、.zip等都支持")]),_:1}),j,s("p",null,[n("至此，Ansible的ad-hoc模式就讲解完了，下面讲解的是playbook模式，因为playbook模式要使用yaml格式的语法，所以可以先去了解一下yaml语法；推荐："),s("a",A,[n("yaml文件格式详解及实例"),a(e)])]),C,s("table",null,[z,s("tbody",null,[s("tr",null,[s("td",S,[s("a",E,[n("Ansible自动化运维（一）简介及部署、清单"),a(e)])]),s("td",N,[s("a",D,[n("https://liucy.blog.csdn.net/article/details/133769300"),a(e)])])]),s("tr",null,[s("td",G,[s("a",H,[n("Ansible自动化运维（二）ad-hoc 模式详解"),a(e)])]),s("td",U,[s("a",I,[n("https://liucy.blog.csdn.net/article/details/133772023"),a(e)])])]),s("tr",null,[s("td",L,[s("a",R,[n("Ansible自动化运维（三）Playbook 模式详解"),a(e)])]),s("td",P,[s("a",V,[n("https://liucy.blog.csdn.net/article/details/133899966"),a(e)])])]),s("tr",null,[s("td",B,[s("a",T,[n("Ansible自动化运维（四）jinja2 模板、Roles角色详解"),a(e)])]),s("td",F,[s("a",K,[n("https://liucy.blog.csdn.net/article/details/133994509"),a(e)])])])])])])}const X=c(d,[["render",O],["__file","Ansible自动化运维（二）ad-hoc 模式详解.html.vue"]]);export{X as default};
