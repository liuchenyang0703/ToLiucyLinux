import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o,c as u,a as n,b as s,d as a,w as i,e as t}from"./app-bccf5941.js";const d={},r=n("p",null,[s("👨‍🎓"),n("strong",null,"博主简介")],-1),k={href:"https://blog.csdn.net/liu_chen_yang?type=blog",target:"_blank",rel:"noopener noreferrer"},m=n("br",null,null,-1),v={href:"https://bbs.huaweicloud.com/community/myblog",target:"_blank",rel:"noopener noreferrer"},b=n("br",null,null,-1),y={href:"https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz",target:"_blank",rel:"noopener noreferrer"},h=n("br",null,null,-1),g=n("strong",null,"交流社区：",-1),_={href:"https://bbs.csdn.net/forums/lcy",target:"_blank",rel:"noopener noreferrer"},f=n("br",null,null,-1),q=n("br",null,null,-1),x=t('<hr><h2 id="一、ansible-中的-playbook-模式" tabindex="-1"><a class="header-anchor" href="#一、ansible-中的-playbook-模式" aria-hidden="true">#</a> 一、Ansible 中的 Playbook 模式</h2><p>  Playbook不同于使用单个模块操作远程服务器，Playbook的功能更加强大。如果说单个模块执行类似于Linux系统中的命令，那么Playbook就类似于shell脚本，将多个模块组合起来实现一组的操作。</p><p><code>Playbook</code>还是会用到<code>ad-hoc</code>模式中的模块及参数，只不过<code>Playbook与ad-hoc</code>的写法不一样。</p><h3 id="_1-1-playbook-的优势" tabindex="-1"><a class="header-anchor" href="#_1-1-playbook-的优势" aria-hidden="true">#</a> 1.1 Playbook 的优势</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-0" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-0"> 功能比<code>ad-hoc</code>更全</label></li></ul><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-1" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-1"> 能很好的控制先后执行顺序, 以及依赖关系</label></li><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-2" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-2"> 语法展现更加的直观</label></li><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-3" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-3"> ad-hoc无法持久使用，playbook可以持久使用</label></li></ul><h3 id="_1-2-playbook-的组成" tabindex="-1"><a class="header-anchor" href="#_1-2-playbook-的组成" aria-hidden="true">#</a> 1.2 Playbook 的组成</h3><p><code>play</code>：一个完整的部署任务，并且必须包含以下前两项:</p><p>  <code>hosts</code>：定义对哪些主机进程操作</p><p>  <code>tasks</code>：定义的是具体执行的任务</p><p>  <code>become</code>：表示是否要以特权用户（通常是root）身份执行任务。如果设置为<code>yes</code>，则任务会以特权身份执行。</p><p><code>playbook</code>: 由一个或多个<code>play</code>组成，一个play可以包含多个<code>task</code>任务</p>',13),w=t(`<p>示例httpd.yml：安装httpd；</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> apache
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> web
  <span class="token key atrule">become</span><span class="token punctuation">:</span> yes
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install httpd Server
      <span class="token key atrule">yum</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> httpd
        <span class="token key atrule">state</span><span class="token punctuation">:</span> present
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解析：</p><p><code>name</code>：定义一个Playbook的名称，用于标识Playbook的用途；</p><p><code>hosts</code>：指定要在哪个主机上执行，也是写主机或主机组名，需要提前在<code>/etc/ansible/hosts</code>中配置好；</p><p><code>become</code>：yes表示使用特权用户；</p><p><code>tasks</code>：属于是一个任务列表，主要写具体执行什么的（可以有多个）；</p><p>  <code>name</code>：每个任务的名称，用于描述干什么的；上述yml中则是<code>安装httpd服务</code>；</p><p>  <code>yum</code>：表示使用哪个模块来进行操作；<code>模块的参数可以看ad-hoc中的，用的都是一样的，写法不一样就是；</code></p><p>    <code>name</code>：要安装的服务名称，我们这里是httpd：</p><p>    <code>state</code>：要进行的操作，可以是安装、卸载、更新；</p><p>其实<code>tasks</code>就是Ansible的模块以YAML语法写入到playbook中。</p><p>生产环境中为了可读性与可维护性通常一个playbook中只编写一个play，如果某些主机需要执行多个play,那么可以使用include关键字在一个playbook中导入其他的playbook。</p><h3 id="_1-3-playbook-命令" tabindex="-1"><a class="header-anchor" href="#_1-3-playbook-命令" aria-hidden="true">#</a> 1.3 Playbook 命令</h3><p>格式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible-playbook <span class="token punctuation">[</span>选项<span class="token punctuation">]</span> playbook.yml 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>常用选项：</p><table><thead><tr><th>选项/参数</th><th>选项/参数 解析</th></tr></thead><tbody><tr><td>-T</td><td>建立SSH连接的超时时间</td></tr><tr><td>-i</td><td>指定Inventory文件</td></tr><tr><td>-f</td><td>并发执行的进程数，默认为5</td></tr><tr><td>- -list-hosts</td><td>匹配的服务器列表</td></tr><tr><td>- -list-tasks</td><td>列出任务列表</td></tr><tr><td>- -step</td><td>每执行一个任务后停止，等待用户确认</td></tr><tr><td>- -syntax-check</td><td>语法检测</td></tr><tr><td>- -list-tags</td><td>列出此yml文件中的所有tag标签</td></tr><tr><td>- -skip-tags</td><td>执行–skip-tags之外的标签任务</td></tr><tr><td>-C</td><td>检查当前这个Playbook是否会修改受控端，模拟执行</td></tr></tbody></table><h3 id="_1-4-playbook-的语法" tabindex="-1"><a class="header-anchor" href="#_1-4-playbook-的语法" aria-hidden="true">#</a> 1.4 Playbook 的语法</h3><ul><li>权限</li></ul><p><code>remote_user</code>指定<code>playbook</code>运行时的用户身份，可以写在hosts下，也可以每个tasks做定义；</p><p><code>become </code>该选项为布尔值，当等于yes表示以管理员身份通常与<code>become_method</code>一起使用；</p><p><code>become_method</code>：su或sudo</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 指定使用哪个用户执行此任务</span>
<span class="token key atrule">remote_user</span><span class="token punctuation">:</span> root

<span class="token comment"># 是否使用特权用户</span>
<span class="token key atrule">become</span><span class="token punctuation">:</span> yes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>通知与触发</li></ul><p><code>notify</code> 如果指定的操作执行了，会触发<code>handlers</code>的操作，指定的是handler的名称；</p><p><code>handlers</code>和<code>notify</code>指定的名称必须相同，否则无法触发。</p><p><code>handlers</code> 中需要<code>- name</code>指定名称 ，<code>handlers</code>只会在所有的<code>tasks</code>执行完后执行，并且，即便一个<code>handlers</code>被触发多次，也只会执行一次。 <code>handlers</code>是一种特殊的<code>tasks</code>。</p><ul><li>handlers（触发事件）</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>notify: 触发
handlers：触发的动作
<span class="token comment"># 两者的名称一定要相同，否则无法触发。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用上场景：一般都是修改配置文件时</p><p>正常情况时handlers是不会执行的，除非触发任务，才会执行</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> web

  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> installredis
    <span class="token key atrule">yum</span><span class="token punctuation">:</span> name=redis
    
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> copyfile
    <span class="token key atrule">template</span><span class="token punctuation">:</span> src=redis.conf dest=/etc/redis.conf
    <span class="token key atrule">tags</span><span class="token punctuation">:</span> copyfile
    <span class="token key atrule">notify</span><span class="token punctuation">:</span> restart		<span class="token comment"># 触发：触发名称</span>
    
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> start
     <span class="token key atrule">service</span><span class="token punctuation">:</span>
       <span class="token key atrule">name</span><span class="token punctuation">:</span> redis
       <span class="token key atrule">state</span><span class="token punctuation">:</span> started
       <span class="token key atrule">enabled</span><span class="token punctuation">:</span> yes
    
  <span class="token key atrule">handlers</span><span class="token punctuation">:</span>				<span class="token comment"># 触发动作</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> restart
     <span class="token key atrule">service</span><span class="token punctuation">:</span>
       <span class="token key atrule">name</span><span class="token punctuation">:</span> redis
       <span class="token key atrule">state</span><span class="token punctuation">:</span> restarted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-5-playbook-中的变量" tabindex="-1"><a class="header-anchor" href="#_1-5-playbook-中的变量" aria-hidden="true">#</a> 1.5 Playbook 中的变量</h3><blockquote><p>  变量提供了便捷的方式来管理<code>Ansible playbook</code>的每一个项目中的动态值，比如nginx-1.6.3这个软件包的版本，在其它地方或许会反复使用，那么如果将此值设置为变量，然后再在其他的playbook中调用，会方便许多。如此一来还方便维护，减少维护的成本。</p></blockquote><ul><li>变量的定义方式</li></ul><p>1.通过<code>命令行</code>进行变量定义</p><p>2.在<code>play文件</code>中进行变量定义</p><p>3.通过<code>Inventory主机信息</code>文件中进行变量定义</p>`,39),A=t(`<ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-4" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-4"> 通过vars定义变量</label></li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> LAMP
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> web
  <span class="token key atrule">vars</span><span class="token punctuation">:</span>
    <span class="token key atrule">packages_name</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> httpd
      <span class="token punctuation">-</span> mariadb<span class="token punctuation">-</span>server
      <span class="token punctuation">-</span> php
      <span class="token punctuation">-</span> php<span class="token punctuation">-</span>mysql

  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> install LAMP
      <span class="token key atrule">yum</span><span class="token punctuation">:</span>
         <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;{{packages_name}}&quot;</span>
         <span class="token key atrule">state</span><span class="token punctuation">:</span> present
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行此yml：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 语法校验</span>
ansible-playbook --syntax-check LAMP.yml

<span class="token comment"># 执行yml</span>
ansible-playbook LAMP.yml（定义的yml文件名）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-5" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-5"> 通过vars_files定义变量</label></li></ul><p>当变量较少时，使用vars定义没有问题，当变量较多时，可以将变量保存到一个独立的文件中；</p><p>需要多个yml文件，一个主文件，需要调用其他yml独立文件，主要是最后运行的；其他是定义包名的yml文件。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#定义阶段</span>
<span class="token comment"># my_vars.yml</span>
<span class="token punctuation">---</span>
<span class="token key atrule">httpd_package</span><span class="token punctuation">:</span> httpd
<span class="token key atrule">mariadb_package</span><span class="token punctuation">:</span> mariadb<span class="token punctuation">-</span>server


<span class="token comment">#调用阶段</span>
<span class="token comment"># apache.yml</span>
<span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> apache
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> web
  <span class="token key atrule">become</span><span class="token punctuation">:</span> yes
  <span class="token key atrule">vars_files</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> my_vars.yml  <span class="token comment"># 引入变量文件</span>

  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install httpd
      <span class="token key atrule">yum</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;{{ httpd_package }}&quot;</span>
        <span class="token key atrule">state</span><span class="token punctuation">:</span> present
      <span class="token key atrule">become</span><span class="token punctuation">:</span> yes

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install mariadb<span class="token punctuation">-</span>server
      <span class="token key atrule">yum</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;{{ mariadb_package }}&quot;</span>
        <span class="token key atrule">state</span><span class="token punctuation">:</span> present
      <span class="token key atrule">become</span><span class="token punctuation">:</span> yes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行此yml：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 语法校验</span>
ansible-playbook --syntax-check apache.yml

<span class="token comment"># 执行yml</span>
ansible-playbook apache.yml（定义的yml文件名）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-6" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-6"> 官方推荐定义变量方法</label></li></ul><p>之前的几种变量定义都不是很好用，比较好用的是在Ansible项目目录下创建两个变量目录：</p><p>host_vars</p><p>group_vars</p><p>目录名字一定要一致，不能做任何修改。</p><p>  理解如何设置和使用<code>host_vars</code>和<code>group_vars</code>可以使你的Ansible管理更加灵活和有组织。以下是更详细的步骤，从设置目录结构到创建Playbook的执行：</p><ol><li><p><strong>目录结构</strong>：<br> 在你的Ansible项目目录下，确保设置以下目录结构：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>your_ansible_project/
├── group_vars/
│   └── web-servers.yml
├── host_vars/
│   └── web-server.yml
├── playbook.yml
└── inventory.ini
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>group_vars</code>目录用于存放组级别的变量定义。</li><li><code>host_vars</code>目录用于存放主机级别的变量定义。</li><li><code>playbook.yml</code>是你的Ansible Playbook。</li><li><code>inventory.ini</code>是Ansible的主机清单文件，其中列出了你的主机和主机组。</li></ul></li><li><p><strong>清单文件 (<code>inventory.ini</code>)</strong>：<br> 确保在清单文件中定义了你的主机和主机组。例如：</p><p><code>vim /etc/ansible/inventory.ini</code></p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code></code></pre><div class="line-numbers" aria-hidden="true"></div></div></li></ol><p>[web-servers]<br> 172.16.11.209 ansible_ssh_port=22 ansible_ssh_user=root ansible_ssh_pass=&#39;123123&#39;</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
3. **组级别变量 (\`group_vars/web-servers.yml\`)**：
在\`group_vars\`目录下创建一个YAML文件，例如\`web-servers.yml\`，并在其中定义组级别的变量，如：

\`mkdir -p /etc/ansible/group_vars &amp;&amp; vim /etc/ansible/group_vars/web-servers.yml\`

\`\`\`yaml
# group_vars/web-servers.yml
---
httpd_package: httpd
mariadb_package: mariadb-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li><p><strong>主机级别变量 (<code>host_vars/web-server.yml</code>)</strong>：<br> 在<code>host_vars</code>目录下创建一个YAML文件，例如<code>web-server.yml</code>，并在其中定义主机级别的变量，如：</p><p><code>mkdir -p /etc/ansible/host_vars &amp;&amp; vim /etc/ansible/host_vars/web-servers.yml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># host_vars/web-server.yml</span>
<span class="token punctuation">---</span>
<span class="token key atrule">http_port</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Playbook (<code>playbook.yml</code>)</strong>：<br> 创建你的Ansible Playbook，例如：</p><p><code>vim /etc/ansible/playbook.yml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Configure Web Server
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> web<span class="token punctuation">-</span>servers
  <span class="token key atrule">become</span><span class="token punctuation">:</span> yes

  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install HTTPd
      <span class="token key atrule">yum</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;{{ httpd_package }}&quot;</span>
        <span class="token key atrule">state</span><span class="token punctuation">:</span> present

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Start HTTPd
      <span class="token key atrule">service</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> httpd
        <span class="token key atrule">state</span><span class="token punctuation">:</span> started
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>运行Playbook</strong>：<br> 使用以下命令运行你的Playbook：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible-playbook <span class="token parameter variable">-i</span> inventory.ini playbook.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><p>此时，Ansible会自动加载<code>group_vars</code>和<code>host_vars</code>目录中的变量，你的Playbook将使用这些变量来配置主机。</p><p>通过这种方式，你可以更加有组织地管理变量，特别是对于多主机和多组的环境。你可以为不同的组或主机设置特定的变量，而不必在Playbook中硬编码这些值，提高了可维护性和可读性。</p><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-7" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-7"> 命令行定义变量</label></li></ul><p>ansible-playbook命令提供-e选项，用于在命令行定义变量，命令行定义变量的优先级最高。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost yml<span class="token punctuation">]</span><span class="token comment"># cat /etc/ansible/hosts</span>
<span class="token punctuation">[</span>web<span class="token punctuation">]</span>
<span class="token number">172.16</span>.11.209

<span class="token punctuation">[</span>web:vars<span class="token punctuation">]</span>
<span class="token assign-left variable">ansible_ssh_pass</span><span class="token operator">=</span><span class="token string">&#39;123123&#39;</span>

<span class="token comment"># 执行：命令行定义变量</span>
<span class="token punctuation">[</span>root@localhost yml<span class="token punctuation">]</span><span class="token comment"># vim test.yml</span>
---
- name: apache 
  hosts: web
  become: <span class="token function">yes</span>
  vars: 
    httpd_package:
       - httpd

  tasks:
    - name: <span class="token function">install</span> httpd <span class="token function">service</span>
      yum:
        name: <span class="token string">&quot;{{ httpd_package }}&quot;</span>
        state: present
<span class="token comment">#定义阶段</span>
<span class="token punctuation">[</span>root@ansible ~<span class="token punctuation">]</span><span class="token comment"># ansible-playbook test.yml -e &quot;web_server=vsftpd&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-6-变量注册" tabindex="-1"><a class="header-anchor" href="#_1-6-变量注册" aria-hidden="true">#</a> 1.6 变量注册</h3><p>  当anbsible的模块在运行之后，其实都会返回一些result结果，就像是执行脚本，我们有的时候需要脚本给我们一些return返回值，我们才知道，上一步是否可以执行成功，但是默认情况下，ansible的result并不会显示出来，所以，我们可以把这些返回值&#39;存储&#39;到变量中，这样我们就能通过&#39;调用&#39;对应的变量名，从而获取到这些result，这种将模块的返回值，写入到变量中的方法被称为变量注册。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@ansible ~<span class="token punctuation">]</span><span class="token comment"># vim register.yml</span>
---
- hosts: web 
  tasks:
  
    - name: define a var1
      shell: <span class="token string">&quot;whoami&quot;</span>
      register: user_name

    - name: get msg 
      debug: 
        msg: <span class="token string">&quot;{{ user_name }}&quot;</span>

    - name: get stdout msg
      debug:
        msg: <span class="token string">&quot;{{ user_name.stdout_lines }}&quot;</span>
        
<span class="token comment"># 执行</span>
<span class="token punctuation">[</span>root@localhost yml<span class="token punctuation">]</span><span class="token comment"># ansible-playbook register.yml</span>

PLAY <span class="token punctuation">[</span>web<span class="token punctuation">]</span> ****************************************************************************************************************************************************

TASK <span class="token punctuation">[</span>Gathering Facts<span class="token punctuation">]</span> ****************************************************************************************************************************************
ok: <span class="token punctuation">[</span><span class="token number">172.16</span>.11.209<span class="token punctuation">]</span>

TASK <span class="token punctuation">[</span>define a var1<span class="token punctuation">]</span> ******************************************************************************************************************************************
changed: <span class="token punctuation">[</span><span class="token number">172.16</span>.11.209<span class="token punctuation">]</span>

TASK <span class="token punctuation">[</span>get msg<span class="token punctuation">]</span> ************************************************************************************************************************************************
ok: <span class="token punctuation">[</span><span class="token number">172.16</span>.11.209<span class="token punctuation">]</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;msg&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;changed&quot;</span><span class="token builtin class-name">:</span> true, 
        <span class="token string">&quot;cmd&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;whoami&quot;</span>, 
        <span class="token string">&quot;delta&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;0:00:00.004924&quot;</span>, 
        <span class="token string">&quot;end&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2023-10-12 23:21:29.231407&quot;</span>, 
        <span class="token string">&quot;failed&quot;</span><span class="token builtin class-name">:</span> false, 
        <span class="token string">&quot;rc&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>, 
        <span class="token string">&quot;start&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2023-10-12 23:21:29.226483&quot;</span>, 
        <span class="token string">&quot;stderr&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>, 
        <span class="token string">&quot;stderr_lines&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>, 
        <span class="token string">&quot;stdout&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;root&quot;</span>, 
        <span class="token string">&quot;stdout_lines&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;root&quot;</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

TASK <span class="token punctuation">[</span>get stdout msg<span class="token punctuation">]</span> *****************************************************************************************************************************************
ok: <span class="token punctuation">[</span><span class="token number">172.16</span>.11.209<span class="token punctuation">]</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;msg&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;root&quot;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

PLAY RECAP ****************************************************************************************************************************************************
<span class="token number">172.16</span>.11.209              <span class="token builtin class-name">:</span> <span class="token assign-left variable">ok</span><span class="token operator">=</span><span class="token number">4</span>    <span class="token assign-left variable">changed</span><span class="token operator">=</span><span class="token number">1</span>    <span class="token assign-left variable">unreachable</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">failed</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">skipped</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">rescued</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">ignored</span><span class="token operator">=</span><span class="token number">0</span>   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明:</p><p><code>debug</code>：模块常用参数</p><p><code>msg</code>： #调试输出的消息</p><p><code>var</code>: #将某个任务执行的输出作为变量传递给debug模块，debug会直接将其打印输出</p><p><code>verbosity</code>: #debug的级别（默认是0级，全部显示）</p><h3 id="_1-7-debug-模块-将上一步任务执行的结果打印出来" tabindex="-1"><a class="header-anchor" href="#_1-7-debug-模块-将上一步任务执行的结果打印出来" aria-hidden="true">#</a> 1.7 debug 模块：将上一步任务执行的结果打印出来</h3><p>将上一步任务执行的结果打印出来，不管成功还是失败都会返回；</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> debug测试 
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> all
  <span class="token key atrule">remote_user</span><span class="token punctuation">:</span> root
  
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
   <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 查看root目录下的文件
     <span class="token key atrule">command</span><span class="token punctuation">:</span> ls /root
     <span class="token key atrule">register</span><span class="token punctuation">:</span> root_directory_contents  <span class="token comment"># 存储命令输出</span>

   <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 输出的结果
     <span class="token key atrule">debug</span><span class="token punctuation">:</span>
       <span class="token key atrule">var</span><span class="token punctuation">:</span> root_directory_contents.stdout_lines
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/885e636225a249ddbfd6d95101b59752.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h3 id="_1-8-facts-缓存" tabindex="-1"><a class="header-anchor" href="#_1-8-facts-缓存" aria-hidden="true">#</a> 1.8 facts 缓存</h3><p>  Ansible facts是在被管理主机上通过Ansible自动采集发现的变量。facts包含每台特定的主机信息。比如：被控端的主机名、IP地址、系统版本、CPU数量、内存状态、磁盘状态等等。</p><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-8" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-8"> facts变量的使用场景</label></li></ul><ol><li><p>通过facts缓存检查CPU，来生成对应的nginx配置文件</p></li><li><p>通过facts缓存检查主机名，生成不同的zabbix配置文件</p></li><li><p>通过facts缓存检索物理机的内存大小来生成不同的mysql配置文件</p></li></ol><p>可以使用setup模块查看facts变量列表:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost yml<span class="token punctuation">]</span><span class="token comment"># ansible nginx -m setup </span>
<span class="token number">172.16</span>.11.209 <span class="token operator">|</span> SUCCESS <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;ansible_facts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;ansible_all_ipv4_addresses&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;172.17.0.1&quot;</span>, 
            <span class="token string">&quot;172.16.11.209&quot;</span>
        <span class="token punctuation">]</span>, 
        <span class="token string">&quot;ansible_all_ipv6_addresses&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;fe80::20c:29ff:feaf:dbfa&quot;</span>
        <span class="token punctuation">]</span>, 
		   以下省略…
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在playbook中引用facts变量：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ansible<span class="token punctuation">]</span><span class="token comment"># vim /etc/ansible/hosts </span>
<span class="token punctuation">[</span>web<span class="token punctuation">]</span>
<span class="token number">172.16</span>.11.209

<span class="token punctuation">[</span>web:vars<span class="token punctuation">]</span>
<span class="token assign-left variable">ansible_ssh_pass</span><span class="token operator">=</span><span class="token string">&#39;123123&#39;</span>

<span class="token comment"># yml文件</span>
<span class="token punctuation">[</span>root@localhost yml<span class="token punctuation">]</span><span class="token comment"># cat facts.yml </span>
- hosts: web
  tasks:
    - shell: <span class="token builtin class-name">echo</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> ansible_os_family <span class="token punctuation">}</span><span class="token punctuation">}</span>
      register: my_vars

    - debug: 
        var: my_vars.stdout_lines
        

<span class="token comment"># 执行</span>
<span class="token punctuation">[</span>root@localhost yml<span class="token punctuation">]</span><span class="token comment"># ansible-playbook facts.yml </span>

PLAY <span class="token punctuation">[</span>web<span class="token punctuation">]</span> ****************************************************************************************************************************************************

TASK <span class="token punctuation">[</span>Gathering Facts<span class="token punctuation">]</span> ****************************************************************************************************************************************
ok: <span class="token punctuation">[</span><span class="token number">172.16</span>.11.209<span class="token punctuation">]</span>

TASK <span class="token punctuation">[</span>shell<span class="token punctuation">]</span> **************************************************************************************************************************************************
changed: <span class="token punctuation">[</span><span class="token number">172.16</span>.11.209<span class="token punctuation">]</span>

TASK <span class="token punctuation">[</span>debug<span class="token punctuation">]</span> **************************************************************************************************************************************************
ok: <span class="token punctuation">[</span><span class="token number">172.16</span>.11.209<span class="token punctuation">]</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;my_vars.stdout_lines&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;RedHat&quot;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

PLAY RECAP ****************************************************************************************************************************************************
<span class="token number">172.16</span>.11.209              <span class="token builtin class-name">:</span> <span class="token assign-left variable">ok</span><span class="token operator">=</span><span class="token number">3</span>    <span class="token assign-left variable">changed</span><span class="token operator">=</span><span class="token number">1</span>    <span class="token assign-left variable">unreachable</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">failed</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">skipped</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">rescued</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">ignored</span><span class="token operator">=</span><span class="token number">0</span>   

<span class="token comment">#在playbook中，可以通过gather_facts选项控制是否收集远程主机，默认值为yes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、playbook-中的流程控制" tabindex="-1"><a class="header-anchor" href="#二、playbook-中的流程控制" aria-hidden="true">#</a> 二、Playbook 中的流程控制</h2><h3 id="_2-1-条件" tabindex="-1"><a class="header-anchor" href="#_2-1-条件" aria-hidden="true">#</a> 2.1 条件</h3><p>  在所有的编程语言流程控制语句中，条件语句是必不可少的，在使用Ansible的过程中，条件判断的使用频率极其高。</p><p>例如：</p><ul class="task-list-container"><li class="task-list-item"><p><input type="checkbox" class="task-list-item-checkbox" id="task-item-9" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-9"> 使用不同的系统的时候，可以通过判断系统来对软件包进行安装。</label></p></li><li class="task-list-item"><p><input type="checkbox" class="task-list-item-checkbox" id="task-item-10" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-10"> 在nfs和rsync安装过程中，客户端服务器不需要推送配置文件，之前我们都是写多个play，会影响效率。</label></p></li><li class="task-list-item"><p><input type="checkbox" class="task-list-item-checkbox" id="task-item-11" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-11"> 在源码安装nginx的时候，执行第二遍就无法执行了，此时我们就可以进行判断是否安装过。</label></p></li></ul>`,50),P=t(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">tasks</span><span class="token punctuation">:</span>  <span class="token comment">#官方案例</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;shut down Debian flavored systems&quot;</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> /sbin/shutdown <span class="token punctuation">-</span>t now
    <span class="token key atrule">when</span><span class="token punctuation">:</span> ansible_facts<span class="token punctuation">[</span><span class="token string">&#39;os_family&#39;</span><span class="token punctuation">]</span> == &quot;Debian&quot;
    <span class="token comment"># note that all variables can be used directly in conditionals without double curly braces</span>

<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> web_group
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install CentOS Httpd
      <span class="token key atrule">yum</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> httpd
        <span class="token key atrule">state</span><span class="token punctuation">:</span> present
    <span class="token comment">#官方</span>
      <span class="token key atrule">when</span><span class="token punctuation">:</span> ansible_facts<span class="token punctuation">[</span><span class="token string">&#39;os_family&#39;</span><span class="token punctuation">]</span> == &quot;CentOS&quot;
    <span class="token comment">#非官方</span>
      <span class="token key atrule">when</span><span class="token punctuation">:</span> ansible_distribution == &quot;CentOS&quot;

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install Ubuntu Httpd
      <span class="token key atrule">yum</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> apache2
        <span class="token key atrule">state</span><span class="token punctuation">:</span> present
        <span class="token key atrule">when</span><span class="token punctuation">:</span> ansible_facts<span class="token punctuation">[</span><span class="token string">&#39;os_family&#39;</span><span class="token punctuation">]</span> == &quot;Ubuntu&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还可以使用括号对条件进行分组</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">tasks</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;shut down CentOS 6 and Debian 7 systems&quot;</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> /sbin/shutdown <span class="token punctuation">-</span>t now
    <span class="token key atrule">when</span><span class="token punctuation">:</span> (ansible_facts<span class="token punctuation">[</span><span class="token string">&#39;distribution&#39;</span><span class="token punctuation">]</span> == &quot;CentOS&quot; and ansible_facts<span class="token punctuation">[</span><span class="token string">&#39;distribution_major_version&#39;</span><span class="token punctuation">]</span> == &quot;6&quot;) or
          (ansible_facts<span class="token punctuation">[</span><span class="token string">&#39;distribution&#39;</span><span class="token punctuation">]</span> == &quot;Debian&quot; and ansible_facts<span class="token punctuation">[</span><span class="token string">&#39;distribution_major_version&#39;</span><span class="token punctuation">]</span> == &quot;7&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以指定多条件为列表</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>tasks:
  - name: <span class="token string">&quot;shut down CentOS 6 systems&quot;</span>
    command: /sbin/shutdown <span class="token parameter variable">-t</span> now
    when:
      - ansible_facts<span class="token punctuation">[</span><span class="token string">&#39;distribution&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;CentOS&quot;</span>
      - ansible_facts<span class="token punctuation">[</span><span class="token string">&#39;distribution_major_version&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;6&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>条件运算</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>tasks:
  - shell: <span class="token builtin class-name">echo</span> <span class="token string">&quot;only on Red Hat 6, derivatives, and later&quot;</span>
    when: ansible_facts<span class="token punctuation">[</span><span class="token string">&#39;os_family&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;RedHat&quot;</span> and ansible_facts<span class="token punctuation">[</span><span class="token string">&#39;distribution_major_version &#39;</span><span class="token punctuation">]</span><span class="token operator">|</span>int <span class="token operator">&gt;=</span> <span class="token number">6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">[</span>root@localhost yml<span class="token punctuation">]</span><span class="token comment"># vim when.yml</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> web
  <span class="token key atrule">remote_user</span><span class="token punctuation">:</span> root   <span class="token comment">#代表用root用户执行，默认是root，可以省略</span>
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> createfile
    <span class="token key atrule">copy</span><span class="token punctuation">:</span> content=&quot;test3&quot; dest=/etc/ansible/yml/when.yml
    <span class="token key atrule">when</span><span class="token punctuation">:</span> a==&#39;3&#39;
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> createfile
    <span class="token key atrule">copy</span><span class="token punctuation">:</span> content=&quot;test4&quot; dest=/etc/ansible/yml/when.yml
    <span class="token key atrule">when</span><span class="token punctuation">:</span> a==&#39;4&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>如果a&quot;3&quot;，就将“test3”，写入到web组下被管控机的/etc/ansible/yml/when.yml中，<br> 如果a&quot;4&quot;，就将“test4”，写入到web组下被管控机的/etc/ansible/yml/when.yml中。</p></blockquote><p>执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 语法校验</span>
ansible-playbook  --syntax-check when.yml

<span class="token comment">#执行</span>
ansible-playbook <span class="token parameter variable">-e</span> <span class="token string">&#39;a=&quot;3&quot;&#39;</span> when.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-循环" tabindex="-1"><a class="header-anchor" href="#_2-2-循环" aria-hidden="true">#</a> 2.2 循环</h3><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-12" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-12"> 1、标准循环使用场景 - 批量安装软件</label></li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">[</span>root@localhost yml<span class="token punctuation">]</span><span class="token comment"># vim with_items.yml</span>
<span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> all
  <span class="token key atrule">remote_user</span><span class="token punctuation">:</span> root
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Installed packages
      <span class="token key atrule">yum</span><span class="token punctuation">:</span> 
       <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;{{ item }}&quot;</span>
       <span class="token key atrule">state</span><span class="token punctuation">:</span> present
      
      <span class="token key atrule">with_items</span><span class="token punctuation">:</span>
       <span class="token punctuation">-</span> wget
       <span class="token punctuation">-</span> tree
       <span class="token punctuation">-</span> lrzsz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 语法校验</span>
ansible-playbook --syntax-check with_items.yml

<span class="token comment"># 执行</span>
ansible-playbook with_items.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/9ebc2064addb4037b5e5b84db33b5d30.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-13" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-13"> 2、标准循环使用场景 - 批量创建用户</label></li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">[</span>root@localhost yml<span class="token punctuation">]</span><span class="token comment"># vim item2.yml</span>
<span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 批量创建用户
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> all
  <span class="token key atrule">remote_user</span><span class="token punctuation">:</span> root

  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 配置创建用户操作
      <span class="token key atrule">user</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;{{ item }}&quot;</span>
        <span class="token key atrule">state</span><span class="token punctuation">:</span> present

      <span class="token key atrule">with_items</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> cs1
        <span class="token punctuation">-</span> cs2
        <span class="token punctuation">-</span> cs3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 语法校验</span>
ansible-playbook --syntax-check item2.yml

<span class="token comment"># 执行</span>
ansible-playbook item2.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">tail</span> <span class="token parameter variable">-3</span> /etc/passwd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/bd06fcb21140445a8912e70c27d75d35.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-14" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-14"> 3、循环嵌套使用场景 - 批量创建用户并给用户添加用户组</label></li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">[</span>root@localhost yml<span class="token punctuation">]</span><span class="token comment"># vim item3.yml</span>
<span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 批量创建用户名及用户组
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> all
  <span class="token key atrule">remote_user</span><span class="token punctuation">:</span> root

  <span class="token key atrule">tasks</span><span class="token punctuation">:</span> 
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> create group
      <span class="token key atrule">group</span><span class="token punctuation">:</span> name=<span class="token punctuation">{</span><span class="token punctuation">{</span> item <span class="token punctuation">}</span><span class="token punctuation">}</span> state=present
      <span class="token key atrule">with_items</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> group1
      <span class="token punctuation">-</span> group2
      <span class="token punctuation">-</span> group3

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> create user
      <span class="token key atrule">user</span><span class="token punctuation">:</span> name=<span class="token punctuation">{</span><span class="token punctuation">{</span> item.name <span class="token punctuation">}</span><span class="token punctuation">}</span> group=<span class="token punctuation">{</span><span class="token punctuation">{</span> item.groups <span class="token punctuation">}</span><span class="token punctuation">}</span> state=present
      <span class="token key atrule">with_items</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">&#39;name&#39;</span><span class="token punctuation">:</span> cs1<span class="token punctuation">,</span><span class="token key atrule">&#39;groups&#39;</span><span class="token punctuation">:</span> group1<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">&#39;name&#39;</span><span class="token punctuation">:</span> cs2<span class="token punctuation">,</span><span class="token key atrule">&#39;groups&#39;</span><span class="token punctuation">:</span> group2<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">&#39;name&#39;</span><span class="token punctuation">:</span> cs3<span class="token punctuation">,</span><span class="token key atrule">&#39;groups&#39;</span><span class="token punctuation">:</span> group3<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 语法校验</span>
ansible-playbook --syntax-check item3.yml

<span class="token comment"># 执行</span>
ansible-playbook item3.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-15" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-15"> 4、循环嵌套使用场景 - 批量删除用户及用户组</label></li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">[</span>root@localhost yml<span class="token punctuation">]</span><span class="token comment"># vim item3_1.yml</span>
<span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 批量删除用户及用户组
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> all
  <span class="token key atrule">remote_user</span><span class="token punctuation">:</span> root
  
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span> 
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> drop user
      <span class="token key atrule">user</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;{{ item.name }}&quot;</span>
        <span class="token key atrule">group</span><span class="token punctuation">:</span> <span class="token string">&quot;{{ item.group }}&quot;</span>
        <span class="token key atrule">remove</span><span class="token punctuation">:</span> yes
        <span class="token key atrule">state</span><span class="token punctuation">:</span> absent
      <span class="token key atrule">with_items</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">&#39;name&#39;</span><span class="token punctuation">:</span> cs1<span class="token punctuation">,</span><span class="token key atrule">&#39;group&#39;</span><span class="token punctuation">:</span> group1<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">&#39;name&#39;</span><span class="token punctuation">:</span> cs2<span class="token punctuation">,</span><span class="token key atrule">&#39;group&#39;</span><span class="token punctuation">:</span> group2<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">&#39;name&#39;</span><span class="token punctuation">:</span> cs3<span class="token punctuation">,</span><span class="token key atrule">&#39;group&#39;</span><span class="token punctuation">:</span> group3<span class="token punctuation">}</span>

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> drop group
      <span class="token key atrule">group</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;{{ item }}&quot;</span>
        <span class="token key atrule">state</span><span class="token punctuation">:</span> absent
      <span class="token key atrule">with_items</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> group1
      <span class="token punctuation">-</span> group2
      <span class="token punctuation">-</span> group3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 语法校验</span>
ansible-playbook --syntax-check item3_1.yml

<span class="token comment"># 执行</span>
ansible-playbook item3_1.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-16" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-16"> 5、标准循环使用场景 - 批量拷贝多个文件</label></li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">[</span>root@localhost yml<span class="token punctuation">]</span><span class="token comment"># vim item4.yml</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 批量拷贝文件
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> all
  <span class="token key atrule">remote_user</span><span class="token punctuation">:</span> root
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> bulk copy
      <span class="token key atrule">copy</span><span class="token punctuation">:</span> src=/home/test/<span class="token punctuation">{</span><span class="token punctuation">{</span> item.src <span class="token punctuation">}</span><span class="token punctuation">}</span> dest=/home/cs/<span class="token punctuation">{</span><span class="token punctuation">{</span> item.dest <span class="token punctuation">}</span><span class="token punctuation">}</span> mode=<span class="token punctuation">{</span><span class="token punctuation">{</span> item.mode <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">with_items</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">src</span><span class="token punctuation">:</span> <span class="token string">&quot;a.sh&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">dest</span><span class="token punctuation">:</span> <span class="token string">&quot;a.sh&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token string">&quot;0777&quot;</span><span class="token punctuation">}</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">src</span><span class="token punctuation">:</span> <span class="token string">&quot;tongji.sh&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">dest</span><span class="token punctuation">:</span> <span class="token string">&quot;tongji.sh&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token string">&quot;0777&quot;</span><span class="token punctuation">}</span>
        
<span class="token comment"># -------------------------------此为分界线，上下互不相干---------------------------------    </span>
        
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 批量拷贝文件到不同的路径
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> all
  <span class="token key atrule">remote_user</span><span class="token punctuation">:</span> root
  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> bulk copy
      <span class="token key atrule">copy</span><span class="token punctuation">:</span> src=/home/test/<span class="token punctuation">{</span><span class="token punctuation">{</span> item.src <span class="token punctuation">}</span><span class="token punctuation">}</span> dest=<span class="token punctuation">{</span><span class="token punctuation">{</span> item.dest <span class="token punctuation">}</span><span class="token punctuation">}</span> mode=<span class="token punctuation">{</span><span class="token punctuation">{</span> item.mode <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">with_items</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">src</span><span class="token punctuation">:</span> <span class="token string">&quot;a.sh&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">dest</span><span class="token punctuation">:</span> <span class="token string">&quot;/home/cs/a.sh&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token string">&quot;0777&quot;</span><span class="token punctuation">}</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">src</span><span class="token punctuation">:</span> <span class="token string">&quot;tongji.sh&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">dest</span><span class="token punctuation">:</span> <span class="token string">&quot;/home/cs1/tongji.sh&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token string">&quot;0777&quot;</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 语法校验</span>
ansible-playbook --syntax-check item4.yml

<span class="token comment"># 执行</span>
ansible-playbook item4.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-异常处理" tabindex="-1"><a class="header-anchor" href="#_2-3-异常处理" aria-hidden="true">#</a> 2.3 异常处理</h3><p>默认Playbook会检查命令和模块的返回状态，如遇到错误就中断playbook的执行</p>`,39),S=t(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">[</span>root@localhost yml<span class="token punctuation">]</span><span class="token comment"># cat expect.yml </span>
<span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 忽略错误演示
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> all
  <span class="token key atrule">remote_user</span><span class="token punctuation">:</span> root

  <span class="token key atrule">tasks</span><span class="token punctuation">:</span> 
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 使用一个未知的命令
      <span class="token key atrule">command</span><span class="token punctuation">:</span> a
      <span class="token key atrule">ignore_errors</span><span class="token punctuation">:</span> yes

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 创建一个文件
      <span class="token key atrule">file</span><span class="token punctuation">:</span> path=/home/cs/yichang state=touch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码解析：</p><blockquote><p>如上代码，执行到command的a命令时，服务器时没有这个命令的，就会报错，报错了之后，下面的服务就不会继续执行了；</p></blockquote><blockquote><p>我们现在添加了一个<code>ignore_errors: yes</code>，这样就可以跳过这个报错，继续执行下面的内容；</p></blockquote><h3 id="_2-4-tags-标签" tabindex="-1"><a class="header-anchor" href="#_2-4-tags-标签" aria-hidden="true">#</a> 2.4 tags 标签</h3><p>  默认情况下，Ansible在执行一个playbook时，会执行playbook中定义的所有任务；Ansible playbook中的tag标签是一种用于选择性运行特定任务或任务集的机制。通过为每个任务指定标签，您可以在运行playbook时选择只运行带有特定标签的任务，而不运行其他任务。这对于控制和管理Ansible playbook的执行非常有用，特别是当您的playbook包含许多任务时。</p><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-17" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-17"> 1、打标签的方式</label></li></ul><p>对一个对象打一个标签</p><p>对一个对象打多个标签</p><p>对多个对象打一个标签</p><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-18" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-18"> 2、标签使用，通过tags和任务对象进行捆绑，控制部分或者指定的task执行</label></li></ul><p><code>-t</code>：执行指定的tag标签任务</p><p><code>--list-tags</code>：列出此yml文件中的所有tag标签</p><p><code>--skip-tags</code>：执行--skip-tags之外的标签任务</p><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-19" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-19"> 3、以下是tag标签的作用：</label></li></ul><ol><li><p>选择性运行任务：可以使用<code>--tags</code>参数在运行ansible-playbook命令时指定一个或多个标签，只有带有指定标签的任务会运行。这对于在大型playbook中只运行特定任务非常有用，而不是运行整个playbook。</p></li><li><p>排除任务：您可以使用<code>--skip-tags</code>参数来排除具有特定标签的任务，从而运行除带有指定标签的任务之外的所有其他任务。这对于在大型playbook中排除不需要运行的任务非常有用。</p></li><li><p>组织任务：标签可以帮助您组织和分类任务。例如，您可以为配置任务添加一个<code>config</code>标签，为安装任务添加一个<code>install</code>标签，以便更容易了解每个任务的用途。</p></li><li><p>文档和注释：标签还可以作为任务的文档和注释。您可以将标签用作描述任务的方式，以便其他人更容易理解每个任务的目的。</p></li></ol><p>下面是一些示例，演示如何在运行ansible-playbook时使用标签：</p><ul><li><p>仅运行带有<code>install</code>标签的任务：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible-playbook your_playbook.yml <span class="token parameter variable">--tags</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>排除带有<code>test</code>标签的任务：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible-playbook your_playbook.yml --skip-tags <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>运行带有多个标签的任务：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible-playbook your_playbook.yml <span class="token parameter variable">--tags</span> <span class="token string">&quot;install,config&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><ul><li><p>列出yml文件中所有的标签</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible-playbook your_playbook.yml --list-tags
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><p>标签功能有助于增加Ansible playbook的可维护性，使您能够更精细地控制任务的执行。</p><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-20" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-20"> 4、【实例】部署apache服务并启动，中间可以自行设置tags标签。</label></li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">[</span>root@localhost yml<span class="token punctuation">]</span><span class="token comment"># vim tags.yml</span>
<span class="token punctuation">---</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 部署apache服务
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> web
  <span class="token key atrule">remote_user</span><span class="token punctuation">:</span> root
  <span class="token key atrule">vars</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">http_port</span><span class="token punctuation">:</span> <span class="token number">8080</span>

  <span class="token key atrule">tasks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install Http Server
      <span class="token key atrule">yum</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> httpd
        <span class="token key atrule">state</span><span class="token punctuation">:</span> present
      <span class="token key atrule">tags</span><span class="token punctuation">:</span> 
        <span class="token punctuation">-</span> install_httpd
        <span class="token punctuation">-</span> httpd_server

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> configure httpd server
      <span class="token key atrule">copy</span><span class="token punctuation">:</span>
        <span class="token key atrule">src</span><span class="token punctuation">:</span> ./httpd.conf
        <span class="token key atrule">dest</span><span class="token punctuation">:</span> /etc/httpd/conf/httpd.conf
        <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token number">0777</span>
      <span class="token key atrule">notify</span><span class="token punctuation">:</span> Restart Httpd Server
      <span class="token key atrule">tags</span><span class="token punctuation">:</span> 
        <span class="token punctuation">-</span> config_httpd
        <span class="token punctuation">-</span> httpd_server

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> start httpd server
      <span class="token key atrule">service</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> httpd
        <span class="token key atrule">state</span><span class="token punctuation">:</span> started
        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> yes
      <span class="token key atrule">tags</span><span class="token punctuation">:</span> start_httpd
   
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> stop httpd server
      <span class="token key atrule">service</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> httpd
        <span class="token key atrule">state</span><span class="token punctuation">:</span> stopped
      <span class="token key atrule">tags</span><span class="token punctuation">:</span> stop_httpd

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> uninstall httpd server
      <span class="token key atrule">yum</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> httpd
        <span class="token key atrule">state</span><span class="token punctuation">:</span> absent
      <span class="token key atrule">tags</span><span class="token punctuation">:</span> uninstall_httpd

  <span class="token key atrule">handlers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Restart Httpd Server
      <span class="token key atrule">systemd</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> httpd
        <span class="token key atrule">state</span><span class="token punctuation">:</span> restarted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个Ansible playbook的YAML文件，用于部署Apache HTTP服务器。YAML文件解析：</p><ol><li><code>name: 部署apache服务</code>：这是整个Ansible playbook的名称或描述。</li><li><code>hosts: web</code>：这指定了该playbook将在名为<code>web</code>的主机组上执行。您需要在您的Ansible inventory文件中定义主机组<code>web</code>，或者在命令行上指定主机。</li><li><code>remote_user: root</code>：指定了运行任务时使用root用户身份执行。</li><li><code>vars:</code>：这是一个变量部分，用于定义变量。在这里，定义了一个名为<code>http_port</code>的变量，其值为8080。</li><li><code>tasks:</code>：这是实际任务部分，其中包含一系列任务，每个任务都有一个名称和相应的操作。以下是每个任务的解释： <ul><li>第一个任务：<code>Install Http Server</code>：这个任务使用<code>yum</code>模块来安装<code>httpd</code>软件包，确保Apache HTTP服务器已经安装在主机上。此任务有两个tags：<code>install_httpd</code>和<code>httpd_server</code>，以便后续可以选择性地运行这些任务。</li><li>第二个任务：<code>configure httpd server</code>：这个任务使用<code>copy</code>模块将本地文件<code>httpd.conf</code>复制到目标主机的<code>/etc/httpd/conf/httpd.conf</code>位置，并给目标文件设置执行权限，从而配置Apache HTTP服务器。此任务有两个tags：<code>config_httpd</code>和<code>httpd_server</code>。（为什么要多余移动这个呢，因为这个配置里我们自己写的，同时也修改了httpd的端口为：8080）。<code>notify: Restart Httpd Server</code>意味着当该任务的状态发生变化时（通常是成功完成任务），它将触发名为 &quot;Restart Httpd Server&quot; 的处理程序<code>handlers</code>。</li><li>第三个任务：<code>start httpd server</code>：这个任务使用<code>service</code>模块来启动并启用Apache HTTP服务器。此任务有一个tag：<code>start_httpd</code>。</li><li>第四个任务：<code>stop httpd server</code>：停止HTTP服务器。它使用 <code>service</code> 模块将 <code>httpd</code> 服务停止。此任务有一个标签 <code>stop_httpd</code>。</li><li>第五个任务：<code>uninstall httpd server</code>：卸载HTTP服务器。它使用 <code>yum</code> 模块卸载 <code>httpd</code> 软件包。此任务有一个标签 <code>uninstall_httpd</code>。</li></ul></li><li><code>handlers:</code>：这部分定义了处理程序，这是一些在任务中使用的命名动作，通常与通知一起使用。在这里，定义了一个名为<code>Restart Httpd Server</code>的处理程序，当<code>copy</code>任务完成后，可以通知它。此处理程序使用<code>systemd</code>模块来重新启动<code>httpd</code>服务。</li></ol><p>这个Playbook允许您执行与Apache HTTP服务器有关的各种操作，如安装、配置、启动、停止和卸载。使用不同的标签可以选择性地运行特定任务或任务组。</p><hr><p>执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看此yml文件中的所有tags标签</span>
<span class="token punctuation">[</span>root@localhost http<span class="token punctuation">]</span><span class="token comment"># ansible-playbook tags.yml --list-tags</span>

playbook: tags.yml

  play <span class="token comment">#1 (web): 部署apache服务	TAGS: []</span>
      TASK TAGS: <span class="token punctuation">[</span>config_httpd, httpd_server, install_httpd, start_httpd, stop_httpd, uninstall_httpd<span class="token punctuation">]</span>


<span class="token comment"># 执行 install_httpd,config_httpd（安装、移动配置文件）标签；执行移动配置文件会触发处理程序，所以会自动启动服务；</span>
<span class="token punctuation">[</span>root@localhost http<span class="token punctuation">]</span><span class="token comment"># ansible-playbook tags.yml -t install_httpd,config_httpd</span>



<span class="token comment"># 执行 uninstall_httpd（卸载httpd服务） 标签</span>
<span class="token punctuation">[</span>root@localhost http<span class="token punctuation">]</span><span class="token comment"># ansible-playbook tags.yml -t uninstall_httpd</span>


<span class="token comment"># 执行 httpd_server 标签</span>
<span class="token punctuation">[</span>root@localhost http<span class="token punctuation">]</span><span class="token comment"># ansible-playbook tags.yml -t httpd_server</span>
<span class="token comment"># httpd_server标签包含（Install Http Server、configure httpd server、Restart Httpd Server）</span>
<span class="token comment"># 所以会直接执行这三个任务，也就是安装、移动配置文件(因为使用移动文件触发了处理程序notify，所以就会执行Restart Httpd Server重启服务）</span>
<span class="token comment"># 总结就是：执行httpd_server标签，会安装服务并启动服务。</span>


<span class="token comment"># 跳过 httpd_server,start_httpd（安装加启动，启动）标签</span>
<span class="token punctuation">[</span>root@localhost http<span class="token punctuation">]</span><span class="token comment"># ansible-playbook tags.yml --skip-tags httpd_server,start_httpd</span>

<span class="token comment"># 执行结果为，关闭httpd服务并卸载httpd服务；因为已经跳过 httpd_server ，所以不会执行安装和启动；</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/95046449a23d4d99b7936dca174c5b7c.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h2 id="三、playbook-中常用的模块使用" tabindex="-1"><a class="header-anchor" href="#三、playbook-中常用的模块使用" aria-hidden="true">#</a> 三、Playbook 中常用的模块使用</h2><ul><li>批量备份文件</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> backup file
      <span class="token key atrule">shell</span><span class="token punctuation">:</span> mv <span class="token punctuation">{</span><span class="token punctuation">{</span> item <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> item <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>$(date +&quot;%Y<span class="token punctuation">-</span>%m<span class="token punctuation">-</span>%d&quot;)
      <span class="token key atrule">with_items</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> /home/cs/a.sh
        <span class="token punctuation">-</span> /home/cs/b.sh
        <span class="token punctuation">-</span> /home/cs/c.sh
      <span class="token key atrule">ignore_errors</span><span class="token punctuation">:</span> yes
      <span class="token key atrule">tags</span><span class="token punctuation">:</span> backup_file
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果为：/home/cs/a.sh-2023-10-31、/home/cs/b.sh-2023-10-31、/home/cs/c.sh-2023-10-31<br> ignore_errors: yes 为：没有这个文件可能会导致报错，跳过报错继续执行，不过最后还是要返回来看，需要单独复制。</p><ul><li>批量复制文件：从本地复制到其他服务器不同路径</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> copy file
      <span class="token key atrule">copy</span><span class="token punctuation">:</span> src=/etc/ansible/yml/update/<span class="token punctuation">{</span><span class="token punctuation">{</span> item.src <span class="token punctuation">}</span><span class="token punctuation">}</span> dest=<span class="token punctuation">{</span><span class="token punctuation">{</span> item.dest <span class="token punctuation">}</span><span class="token punctuation">}</span> mode=<span class="token punctuation">{</span><span class="token punctuation">{</span> item.mode <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">with_items</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">src</span><span class="token punctuation">:</span> <span class="token string">&quot;a.sh&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">dest</span><span class="token punctuation">:</span> <span class="token string">&quot;/data/cs/a.sh&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token string">&quot;0777&quot;</span><span class="token punctuation">}</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">src</span><span class="token punctuation">:</span> <span class="token string">&quot;b.sh&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">dest</span><span class="token punctuation">:</span> <span class="token string">&quot;/data/abc/b.sh&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token string">&quot;0777&quot;</span><span class="token punctuation">}</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">src</span><span class="token punctuation">:</span> <span class="token string">&quot;cs.jar&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">dest</span><span class="token punctuation">:</span> <span class="token string">&quot;/data/conf/cs.jar&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token string">&quot;0644&quot;</span><span class="token punctuation">}</span>
      <span class="token key atrule">tags</span><span class="token punctuation">:</span> copy_file
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>批量复制文件：从其他服务器复制到其他服务器不同路径</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> copy shell/file
      <span class="token key atrule">shell</span><span class="token punctuation">:</span> cp <span class="token punctuation">-</span>ar <span class="token punctuation">{</span><span class="token punctuation">{</span> item.src <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> item.dest <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">with_items</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">src</span><span class="token punctuation">:</span> <span class="token string">&quot;/home/test/nginx/conf/nginx.conf&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">dest</span><span class="token punctuation">:</span> <span class="token string">&quot;/usr/local/cs/nginx/conf/nginx.conf&quot;</span><span class="token punctuation">}</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">src</span><span class="token punctuation">:</span> <span class="token string">&quot;/home/test/nginx/conf/cs.conf&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">dest</span><span class="token punctuation">:</span> <span class="token string">&quot;/usr/local/cs/nginx/conf/cs.conf&quot;</span><span class="token punctuation">}</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">src</span><span class="token punctuation">:</span> <span class="token string">&quot;/home/test/nginx/src/nginx&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">dest</span><span class="token punctuation">:</span> <span class="token string">&quot;/usr/local/cs/nginx/src/nginx&quot;</span><span class="token punctuation">}</span>
	  <span class="token key atrule">ignore_errors</span><span class="token punctuation">:</span> yes
      <span class="token key atrule">tags</span><span class="token punctuation">:</span> fugai
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ignore_errors: yes 为：没有这个文件可能会导致报错，跳过报错继续执行，不过最后还是要返回来看，需要单独复制。</p><h2 id="四、相关文章" tabindex="-1"><a class="header-anchor" href="#四、相关文章" aria-hidden="true">#</a> 四、相关文章</h2>`,39),T=n("thead",null,[n("tr",null,[n("th",{style:{"text-align":"center"}},"文章标题"),n("th",{style:{"text-align":"center"}},"文章链接")])],-1),H={style:{"text-align":"center"}},C={href:"https://liucy.blog.csdn.net/article/details/133769300",target:"_blank",rel:"noopener noreferrer"},j={style:{"text-align":"center"}},I={href:"https://liucy.blog.csdn.net/article/details/133769300",target:"_blank",rel:"noopener noreferrer"},L={style:{"text-align":"center"}},R={href:"https://liucy.blog.csdn.net/article/details/133772023",target:"_blank",rel:"noopener noreferrer"},z={style:{"text-align":"center"}},Y={href:"https://liucy.blog.csdn.net/article/details/133772023",target:"_blank",rel:"noopener noreferrer"},M={style:{"text-align":"center"}},K={href:"https://liucy.blog.csdn.net/article/details/133899966",target:"_blank",rel:"noopener noreferrer"},O={style:{"text-align":"center"}},E={href:"https://liucy.blog.csdn.net/article/details/133899966",target:"_blank",rel:"noopener noreferrer"},U={style:{"text-align":"center"}},D={href:"https://liucy.blog.csdn.net/article/details/133994509",target:"_blank",rel:"noopener noreferrer"},G={style:{"text-align":"center"}},N={href:"https://liucy.blog.csdn.net/article/details/133994509",target:"_blank",rel:"noopener noreferrer"};function V(B,F){const e=p("ExternalLinkIcon"),l=p("font");return o(),u("div",null,[n("blockquote",null,[r,n("p",null,[s("  🏅"),n("a",k,[s("云计算领域优质创作者"),a(e)]),m,s("   🏅"),n("a",v,[s("华为云开发者社区专家博主"),a(e)]),b,s("   🏅"),n("a",y,[s("阿里云开发者社区专家博主"),a(e)]),h,s(" 💊"),g,n("a",_,[s("运维交流社区"),a(e)]),s(" 欢迎大家的加入！"),f,s(" 🐋 希望大家多多支持，我们一起进步！😄"),q,s(" 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗")])]),x,a(l,{color:"red"},{default:i(()=>[s("说明：`Ansible` 中的 `Playbook` 文件结尾为`.yml` 格式")]),_:1}),w,a(l,{color:"red"},{default:i(()=>[s("变量读取的优先级为: `命令行 > playbook文件 > Inventory`文件")]),_:1}),A,a(l,{color:"red"},{default:i(()=>[s("playbook中的条件判断语句使用`when`")]),_:1}),P,n("p",null,[s("加入参数: "),a(l,{color:"red"},{default:i(()=>[s("ignore_errors: yes")]),_:1}),s(" # 忽略错误")]),S,n("table",null,[T,n("tbody",null,[n("tr",null,[n("td",H,[n("a",C,[s("Ansible自动化运维（一）简介及部署、清单"),a(e)])]),n("td",j,[n("a",I,[s("https://liucy.blog.csdn.net/article/details/133769300"),a(e)])])]),n("tr",null,[n("td",L,[n("a",R,[s("Ansible自动化运维（二）ad-hoc 模式详解"),a(e)])]),n("td",z,[n("a",Y,[s("https://liucy.blog.csdn.net/article/details/133772023"),a(e)])])]),n("tr",null,[n("td",M,[n("a",K,[s("Ansible自动化运维（三）Playbook 模式详解"),a(e)])]),n("td",O,[n("a",E,[s("https://liucy.blog.csdn.net/article/details/133899966"),a(e)])])]),n("tr",null,[n("td",U,[n("a",D,[s("Ansible自动化运维（四）jinja2 模板、Roles角色详解"),a(e)])]),n("td",G,[n("a",N,[s("https://liucy.blog.csdn.net/article/details/133994509"),a(e)])])])])])])}const J=c(d,[["render",V],["__file","Ansible自动化运维（三）Playbook 模式详解.html.vue"]]);export{J as default};
