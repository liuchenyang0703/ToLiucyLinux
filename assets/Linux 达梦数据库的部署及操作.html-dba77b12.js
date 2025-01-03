import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as o,a as t,d as a,w as e,b as n,e as i}from"./app-bccf5941.js";const d={},u=i(`<h2 id="一、挂载并创建用户" tabindex="-1"><a class="header-anchor" href="#一、挂载并创建用户" aria-hidden="true">#</a> 一、挂载并创建用户</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 上传达梦iso镜像和key到/opt/dmsetup/下</span>
<span class="token function">mkdir</span> /opt/dmsetup/

<span class="token comment"># 创建dm目录</span>
<span class="token function">mkdir</span> /dm

<span class="token comment"># 挂载达梦iso镜像</span>
<span class="token function">mount</span> <span class="token parameter variable">-o</span> loop /opt/dmsetup/dm8_20200907_FTarm_kylin4_64_ent_8.1.1.126.iso /dm

<span class="token comment"># 创建用户组</span>
<span class="token function">groupadd</span> <span class="token parameter variable">-g</span> <span class="token number">12349</span> dinstall

<span class="token comment"># 创建dmdba用户</span>
<span class="token function">useradd</span> <span class="token parameter variable">-u</span> <span class="token number">12345</span> <span class="token parameter variable">-g</span> dinstall <span class="token parameter variable">-m</span> <span class="token parameter variable">-d</span> /home/dmdba <span class="token parameter variable">-s</span> /bin/bash dmdba

<span class="token comment"># 初始化用户密码</span>
<span class="token function">passwd</span> dmdba

<span class="token comment"># 提前创建安装目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /opt/dmdbms
<span class="token comment"># 给目录用户权限</span>
<span class="token function">chown</span> <span class="token parameter variable">-R</span> dmdba:dinstall dmdbms/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、安装达梦数据库-命令行-安装不能使用root用户" tabindex="-1"><a class="header-anchor" href="#二、安装达梦数据库-命令行-安装不能使用root用户" aria-hidden="true">#</a> 二、安装达梦数据库（命令行）（安装不能使用root用户）</h2>`,3),r=i(`<p>1）执行安装命令</p><p>在终端进入到安装程序所在文件夹，执行以下命令进行命令行安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 切换dmdba用户</span>
<span class="token function">sudo</span> dmdba

<span class="token comment"># 进入dm目录安装</span>
<span class="token builtin class-name">cd</span> /dm
./DMInstall.bin <span class="token parameter variable">-i</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）选择安装语言</p><p>根据系统配置选择相应语言，输入选项，回车进行下一步。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>请选择安装语言<span class="token punctuation">(</span>C/c:中文 E/e:英文<span class="token punctuation">)</span> <span class="token punctuation">[</span>C/c<span class="token punctuation">]</span>：C
解压安装程序<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span> 
欢迎使用达梦数据库安装程序
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),m=t("strong",null,"需要提前申请好key，并把key放到自己需要放到的目录",-1),v=i(`<p>可以选择是否输入 Key 文件路径。不输入则进入下一步安装，输入 Key 文件路径，安装程序将显示 Key 文件的详细信息，如果是合法的 Key， 文件且在有效期内，可以继续安装。如下所示：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>是否输入 Key 文件路径? <span class="token punctuation">(</span>Y/y:是 N/n:否<span class="token punctuation">)</span> <span class="token punctuation">[</span>Y/y<span class="token punctuation">]</span>：Y
请输入 Key 文件的路径地址 <span class="token punctuation">[</span>dm.key<span class="token punctuation">]</span>：/opt/dmsetup/dm.key
有效日期: <span class="token number">2020</span>-12-25
服务器颁布类型: 企业版
发布类型: 试用版
用户名称: 测试授权临时版
授权用户数: 无限制
并发连接数: 无限制
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4）输入时区</p><p>可以选择的时区信息。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>是否设置时区? <span class="token punctuation">(</span>Y/y:是 N/n:否<span class="token punctuation">)</span> <span class="token punctuation">[</span>Y/y<span class="token punctuation">]</span>：Y
设置时区:
<span class="token punctuation">[</span> <span class="token number">1</span><span class="token punctuation">]</span>: GTM-12<span class="token operator">=</span>日界线西
<span class="token punctuation">[</span> <span class="token number">2</span><span class="token punctuation">]</span>: GTM-11<span class="token operator">=</span>萨摩亚群岛
<span class="token punctuation">[</span> <span class="token number">3</span><span class="token punctuation">]</span>: GTM-10<span class="token operator">=</span>夏威夷
<span class="token punctuation">[</span> <span class="token number">4</span><span class="token punctuation">]</span>: GTM-09<span class="token operator">=</span>阿拉斯加
<span class="token punctuation">[</span> <span class="token number">5</span><span class="token punctuation">]</span>: GTM-08<span class="token operator">=</span>太平洋时间（美国和加拿大）
<span class="token punctuation">[</span> <span class="token number">6</span><span class="token punctuation">]</span>: GTM-07<span class="token operator">=</span>亚利桑那
<span class="token punctuation">[</span> <span class="token number">7</span><span class="token punctuation">]</span>: GTM-06<span class="token operator">=</span>中部时间（美国和加拿大）
<span class="token punctuation">[</span> <span class="token number">8</span><span class="token punctuation">]</span>: GTM-05<span class="token operator">=</span>东部部时间（美国和加拿大）
<span class="token punctuation">[</span> <span class="token number">9</span><span class="token punctuation">]</span>: GTM-04<span class="token operator">=</span>大西洋时间（美国和加拿大）
<span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span>: GTM-03<span class="token operator">=</span>巴西利亚
<span class="token punctuation">[</span><span class="token number">11</span><span class="token punctuation">]</span>: GTM-02<span class="token operator">=</span>中大西洋
<span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">]</span>: GTM-01<span class="token operator">=</span>亚速尔群岛
<span class="token punctuation">[</span><span class="token number">13</span><span class="token punctuation">]</span>: <span class="token assign-left variable">GTM</span><span class="token operator">=</span>格林威治标准时间
<span class="token punctuation">[</span><span class="token number">14</span><span class="token punctuation">]</span>: GTM+01<span class="token operator">=</span>萨拉热窝
<span class="token punctuation">[</span><span class="token number">15</span><span class="token punctuation">]</span>: GTM+02<span class="token operator">=</span>开罗
<span class="token punctuation">[</span><span class="token number">16</span><span class="token punctuation">]</span>: GTM+03<span class="token operator">=</span>莫斯科
<span class="token punctuation">[</span><span class="token number">17</span><span class="token punctuation">]</span>: GTM+04<span class="token operator">=</span>阿布扎比
<span class="token punctuation">[</span><span class="token number">18</span><span class="token punctuation">]</span>: GTM+05<span class="token operator">=</span>伊斯兰堡
<span class="token punctuation">[</span><span class="token number">19</span><span class="token punctuation">]</span>: GTM+06<span class="token operator">=</span>达卡
<span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">]</span>: GTM+07<span class="token operator">=</span>曼谷，河内
<span class="token punctuation">[</span><span class="token number">21</span><span class="token punctuation">]</span>: GTM+08<span class="token operator">=</span>中国标准时间
<span class="token punctuation">[</span><span class="token number">22</span><span class="token punctuation">]</span>: GTM+09<span class="token operator">=</span>汉城
<span class="token punctuation">[</span><span class="token number">23</span><span class="token punctuation">]</span>: GTM+10<span class="token operator">=</span>关岛
<span class="token punctuation">[</span><span class="token number">24</span><span class="token punctuation">]</span>: GTM+11<span class="token operator">=</span>所罗门群岛
<span class="token punctuation">[</span><span class="token number">25</span><span class="token punctuation">]</span>: GTM+12<span class="token operator">=</span>斐济
<span class="token punctuation">[</span><span class="token number">26</span><span class="token punctuation">]</span>: GTM+13<span class="token operator">=</span>努库阿勒法
<span class="token punctuation">[</span><span class="token number">27</span><span class="token punctuation">]</span>: GTM+14<span class="token operator">=</span>基里巴斯
请选择设置时区 <span class="token punctuation">[</span><span class="token number">21</span><span class="token punctuation">]</span>：21
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5）选择安装类型</p><p>数据库软件安装程序提供四种安装方式：“典型安装”、“服务器安装”、“客户端安装”和“自定义安装”，用户可根据实际情况灵活地选择。如下图所示：</p><p>  典型安装包括：服务器、客户端、驱动、用户手册、数据库服务。</p><p>  服务器安装包括：服务器、驱动、用户手册、数据库服务。</p><p>  客户端安装包括：客户端、驱动、用户手册。</p><p>  自定义安装包括：用户根据需求勾选组件，可以是服务器、客户端、驱动、用户手册、数据库服务中的任意组合。</p><p>  生产环境可以根据实际需求选择，一般情况下选择&quot;典型安装&quot;即可。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>安装类型:
<span class="token number">1</span> 典型安装
<span class="token number">2</span> 服务器
<span class="token number">3</span> 客户端
<span class="token number">4</span> 自定义
请选择安装类型的数字序号 <span class="token punctuation">[</span><span class="token number">1</span> 典型安装<span class="token punctuation">]</span>：1
所需空间: 1010M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>6）选择安装路径</p><p>输入数据库软件的安装路径 ，不输入则使用默认路径，默认值为$HOME/dmdbms(如果安装用户为 root，则默认安装目录为<code>/opt/dmdbms</code>，但不建议使用 root 系统用户来安装)。没有这个目录需要提前创建一个<code>mkdir -p /opt/dmdbms</code>；</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>请选择安装目录 <span class="token punctuation">[</span>/home/dmdba/dmdbms<span class="token punctuation">]</span>：/opt/dmdbms
可用空间: 11G
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>  注意：安装路径里的目录名由英文字母、数字和下划线等组成，不建议使用包含空格和中文字符的路径等。</p><p>7）安装小结</p><p>安装程序将打印用户之前输入的部分安装信息。如下所示：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>是否确认安装路径<span class="token punctuation">(</span>/opt/dmdbms<span class="token punctuation">)</span>? <span class="token punctuation">(</span>Y/y:是 N/n:否<span class="token punctuation">)</span> <span class="token punctuation">[</span>Y/y<span class="token punctuation">]</span>：Y
安装前小结
安装位置: /opt/dmdbms
所需空间: 1010M
可用空间: 11G
版本信息: 企业版
有效日期: <span class="token number">2020</span>-12-25
安装类型: 典型安装
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>8）安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>是否确认安装? <span class="token punctuation">(</span>Y/y:是 N/n:否<span class="token punctuation">)</span>：Y
<span class="token number">2020</span>-12-24 <span class="token number">21</span>:52:38
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 安装达梦数据库<span class="token punctuation">..</span>.
<span class="token number">2020</span>-12-24 <span class="token number">21</span>:52:39
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 安装 基础 模块<span class="token punctuation">..</span>.
<span class="token number">2020</span>-12-24 <span class="token number">21</span>:52:48
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 安装 服务器 模块<span class="token punctuation">..</span>.
<span class="token number">2020</span>-12-24 <span class="token number">21</span>:52:48
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 安装 客户端 模块<span class="token punctuation">..</span>.
<span class="token number">2020</span>-12-24 <span class="token number">21</span>:52:56
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 安装 驱动 模块<span class="token punctuation">..</span>.
<span class="token number">2020</span>-12-24 <span class="token number">21</span>:52:58
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 安装 手册 模块<span class="token punctuation">..</span>.
<span class="token number">2020</span>-12-24 <span class="token number">21</span>:53:00
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 安装 服务 模块<span class="token punctuation">..</span>.
<span class="token number">2020</span>-12-24 <span class="token number">21</span>:53:02
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 移动 ant 日志文件。
<span class="token number">2020</span>-12-24 <span class="token number">21</span>:53:03
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 安装达梦数据库完成。

请以root系统用户执行命令:
/opt/dmdbms/script/root/root_installer.sh

安装结束

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),b=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/opt/dmdbms/script/root/root_installer.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行等待，安装完成</p><p>9）注册数据库服务</p><p>当安装进度完成时将会弹出对话框，提示使用 root 系统用户执行相关命令。用户可根据对话框的说明完成相关操作，之后可关闭此对话框，点击“完成”按钮结束安装。如下所示：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>dmdba@~<span class="token punctuation">]</span><span class="token comment"># su - root</span>
密码：<span class="token operator">&lt;</span>输入密码<span class="token operator">&gt;</span>
<span class="token punctuation">[</span>root@~<span class="token punctuation">]</span><span class="token comment"># /opt/dmdbms/script/root/root_installer.sh</span>
移动 /opt/dmdbms/bin/dm_svc.conf 到/etc 目录
修改服务器权限
创建 DmAPService 服务
Created symlink from
/etc/systemd/system/multiuser.target.wants/DmAPService.service to
/usr/lib/systemd/system/DmAPService.service
创建服务<span class="token punctuation">(</span>DmAPService<span class="token punctuation">)</span>完成
启动 DmAPService 服务
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、初始化数据库实例" tabindex="-1"><a class="header-anchor" href="#三、初始化数据库实例" aria-hidden="true">#</a> 三、初始化数据库实例</h2><h3 id="_3-1-初始化过程" tabindex="-1"><a class="header-anchor" href="#_3-1-初始化过程" aria-hidden="true">#</a> 3.1 初始化过程</h3><p>初始化实例的示例如下：设置页大小（PAGE_SIZE）为 32，日志大小（LOG_SIZE）为 2048，大小写（CASE_SENSITIVE）为敏感，字符集（CHARSET）为 GB18030。</p><p>其它参数默认，如需更改其它参数，请参考《dminit 使用手册》</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 先切换到普通用户</span>
<span class="token function">su</span> dmdba

<span class="token punctuation">[</span>dmdba@~<span class="token punctuation">]</span><span class="token comment"># /opt/dmdbms/bin/dminit PATH=/opt/dmdbms/data PAGE_SIZE=32</span>
<span class="token assign-left variable">LOG_SIZE</span><span class="token operator">=</span><span class="token number">2048</span> <span class="token assign-left variable">CHARSET</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">CASE_SENSITIVE</span><span class="token operator">=</span>Y
initdb V8
db version: 0x7000a
License will expire <span class="token keyword">in</span> <span class="token number">1</span> day<span class="token punctuation">(</span>s<span class="token punctuation">)</span> on <span class="token number">2020</span>-12-25
log <span class="token function">file</span> path: /opt/dmdbms/data/DAMENG/DAMENG01.log
log <span class="token function">file</span> path: /opt/dmdbms/data/DAMENG/DAMENG02.log
<span class="token function">write</span> to <span class="token function">dir</span> <span class="token punctuation">[</span>/opt/dmdbms/data/DAMENG<span class="token punctuation">]</span>.
create dm database success. <span class="token number">2020</span>-12-24 <span class="token number">22</span>:05:38
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412301443191.png" alt="image-20240529170026112" tabindex="0" loading="lazy"><figcaption>image-20240529170026112</figcaption></figure><p>注意：实际环境中，簇大小建议选择 32，页大小选择 32K，日志大小选择 2048，字符集和大小写敏感需要和应用厂商对接后，再进行选择。</p><hr><p>遇到报错：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/opt/dmdbms/bin/dminit <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/opt/dmdbms/data <span class="token assign-left variable">PAGE_SIZE</span><span class="token operator">=</span><span class="token number">32</span>
/opt/dmdbms/bin/dminit: error <span class="token keyword">while</span> loading shared libraries: libdmnsort.so: cannot <span class="token function">open</span> shared object file: No such <span class="token function">file</span> or directory
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>解决方法（配置环境变量）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/profile
<span class="token comment"># 达梦数据库</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">DM_HOME</span><span class="token operator">=</span>/opt/dmdbms
<span class="token builtin class-name">export</span> <span class="token assign-left variable">LD_LIBRARY_PATH</span><span class="token operator">=</span><span class="token variable">$LD_LIBRARY_PATH</span><span class="token builtin class-name">:</span><span class="token variable">$DM_HOME</span>/bin

<span class="token comment"># 使其生效</span>
<span class="token builtin class-name">source</span> /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>切换dmdba用户重新初始化</p><hr><h3 id="_3-2-创建实例服务" tabindex="-1"><a class="header-anchor" href="#_3-2-创建实例服务" aria-hidden="true">#</a> 3.2 创建实例服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>dmdba@~<span class="token punctuation">]</span><span class="token comment"># su - root</span>
密码：<span class="token operator">&lt;</span>输入密码<span class="token operator">&gt;</span>
<span class="token punctuation">[</span>root@~<span class="token punctuation">]</span><span class="token comment"># /opt/dmdbms/script/root/dm_service_installer.sh -t dmserver -dm_ini /opt/dmdbms/data/DAMENG/dm.ini -p DMSERVER</span>
Created symlink from
/etc/systemd/system/multi-user.target.wants/DmServiceDMSERVER.service to
/usr/lib/systemd/system/DmServiceDMSERVER.service. 创建服务<span class="token punctuation">(</span>DmServiceDMSERVER<span class="token punctuation">)</span>完成
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412301443571.png" alt="image-20240529170127531" tabindex="0" loading="lazy"><figcaption>image-20240529170127531</figcaption></figure><h3 id="_3-3-启动实例服务" tabindex="-1"><a class="header-anchor" href="#_3-3-启动实例服务" aria-hidden="true">#</a> 3.3 启动实例服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用普通用户启动实例</span>
<span class="token function">su</span> dmdba

<span class="token punctuation">[</span>dmdba@~<span class="token punctuation">]</span><span class="token comment"># /opt/dmdbms/bin/DmServiceDMSERVER start</span>
Starting DmServiceDMSERVER：<span class="token punctuation">[</span> OK <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、进入数据库" tabindex="-1"><a class="header-anchor" href="#四、进入数据库" aria-hidden="true">#</a> 四、进入数据库</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入数据库（SYSDBA是默认的管理员）</span>
<span class="token builtin class-name">cd</span> /opt/dmdbms/bin <span class="token operator">&amp;&amp;</span> ./disql SYSDBA/SYSDBA@localhost:5236
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、查看数据库授权时间" tabindex="-1"><a class="header-anchor" href="#五、查看数据库授权时间" aria-hidden="true">#</a> 五、查看数据库授权时间</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># 查看授权时间</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> v$license<span class="token punctuation">;</span>
<span class="token keyword">select</span> EXPIRED_DATE <span class="token keyword">from</span> v$license<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、创建用户并授权权限" tabindex="-1"><a class="header-anchor" href="#六、创建用户并授权权限" aria-hidden="true">#</a> 六、创建用户并授权权限</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># 创建用户</span>
<span class="token keyword">create</span> <span class="token keyword">user</span> 名字 IDENTIFIED <span class="token keyword">BY</span> <span class="token string">&quot;密码&quot;</span><span class="token punctuation">;</span>
<span class="token comment"># 授权给某个用户</span>
<span class="token keyword">grant</span> resource<span class="token punctuation">,</span><span class="token keyword">PUBLIC</span><span class="token punctuation">,</span>vti<span class="token punctuation">,</span>soi <span class="token keyword">to</span> 名字<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="七、登录创建的用户" tabindex="-1"><a class="header-anchor" href="#七、登录创建的用户" aria-hidden="true">#</a> 七、登录创建的用户</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /opt/dmdbms/bin <span class="token operator">&amp;&amp;</span> ./disql 名字/密码@localhost:5236
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="八、创建表" tabindex="-1"><a class="header-anchor" href="#八、创建表" aria-hidden="true">#</a> 八、创建表</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>CREATE TABLE <span class="token string">&quot;MOULD&quot;</span><span class="token builtin class-name">.</span><span class="token string">&quot;AUTHUSER&quot;</span>
<span class="token punctuation">(</span>
<span class="token string">&quot;USERKEY&quot;</span> VARCHAR<span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> NOT NULL,
<span class="token string">&quot;USERNAME&quot;</span> VARCHAR<span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> NOT NULL,
<span class="token string">&quot;USERTIME&quot;</span> DATE NOT NULL,
<span class="token string">&quot;USERID&quot;</span> INT IDENTITY<span class="token punctuation">(</span><span class="token number">10</span>, <span class="token number">1</span><span class="token punctuation">)</span> NOT NULL,
NOT CLUSTER PRIMARY KEY<span class="token punctuation">(</span><span class="token string">&quot;USERID&quot;</span><span class="token punctuation">))</span> STORAGE<span class="token punctuation">(</span>ON <span class="token string">&quot;MAIN&quot;</span>, CLUSTERBTR<span class="token punctuation">)</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="九、删除表" tabindex="-1"><a class="header-anchor" href="#九、删除表" aria-hidden="true">#</a> 九、删除表</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DROP TABLE <span class="token string">&quot;MOULD&quot;</span><span class="token builtin class-name">.</span><span class="token string">&quot;TEMPLATES&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="十、查看当前用户所有的表" tabindex="-1"><a class="header-anchor" href="#十、查看当前用户所有的表" aria-hidden="true">#</a> 十、查看当前用户所有的表</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> table_name <span class="token keyword">FROM</span> user_tables<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412301443798.png" alt="image-20240726161909094" tabindex="0" loading="lazy"><figcaption>image-20240726161909094</figcaption></figure><h2 id="十一、查看表结构" tabindex="-1"><a class="header-anchor" href="#十一、查看表结构" aria-hidden="true">#</a> 十一、查看表结构</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">desc</span> TEMPLATES<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202407291030882.png" alt="image-20240729103024531" tabindex="0" loading="lazy"><figcaption>image-20240729103024531</figcaption></figure><h2 id="十二、查看数据库版本" tabindex="-1"><a class="header-anchor" href="#十二、查看数据库版本" aria-hidden="true">#</a> 十二、查看数据库版本</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> v$version<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412301443913.png" alt="image-20240729103103260" tabindex="0" loading="lazy"><figcaption>image-20240729103103260</figcaption></figure>`,45);function k(h,g){const s=l("font");return c(),o("div",null,[u,t("blockquote",null,[a(s,{color:"red"},{default:e(()=>[n("**注意：需要提前申请好达梦的授权（key）并把key放到自己需要放到的目录**")]),_:1}),a(s,{color:"red"},{default:e(()=>[n("**注意：需要提前申请好达梦的授权（key）并把key放到自己需要放到的目录**")]),_:1}),a(s,{color:"red"},{default:e(()=>[n("**注意：需要提前申请好达梦的授权（key）并把key放到自己需要放到的目录**")]),_:1}),a(s,{color:"red"},{default:e(()=>[n("**需要使用普通用户来安装**")]),_:1}),a(s,{color:"red"},{default:e(()=>[n("**需要使用普通用户来安装**")]),_:1}),a(s,{color:"red"},{default:e(()=>[n("**需要使用普通用户来安装**")]),_:1})]),r,t("p",null,[n("3）验证 key 文件（"),a(s,{color:"red"},{default:e(()=>[m]),_:1}),n("）")]),v,a(s,{color:"red"},{default:e(()=>[n("提示：请以 root 系统用户执行命令:")]),_:1}),b])}const y=p(d,[["render",k],["__file","Linux 达梦数据库的部署及操作.html.vue"]]);export{y as default};
