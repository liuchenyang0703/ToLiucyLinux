import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as t,a as e,b as n,d as s,w as l,e as d}from"./app-bccf5941.js";const m={},p=e("p",null,[n("👨‍🎓"),e("strong",null,"博主简介")],-1),u={href:"https://blog.csdn.net/liu_chen_yang?type=blog",target:"_blank",rel:"noopener noreferrer"},v=e("br",null,null,-1),b={href:"https://blog.csdn.net/liu_chen_yang?type=blog",target:"_blank",rel:"noopener noreferrer"},h=e("br",null,null,-1),k={href:"https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234",target:"_blank",rel:"noopener noreferrer"},g=e("br",null,null,-1),_={href:"https://developer.aliyun.com/profile/7yu26jk3lfqxg",target:"_blank",rel:"noopener noreferrer"},f=e("br",null,null,-1),x=e("strong",null,"交流社区：",-1),y={href:"https://bbs.csdn.net/forums/lcy",target:"_blank",rel:"noopener noreferrer"},q=e("br",null,null,-1),w=e("br",null,null,-1),D=e("hr",null,null,-1),A=e("h2",{id:"docker-compose简介",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#docker-compose简介","aria-hidden":"true"},"#"),n(" docker-compose简介")],-1),M=e("h3",{id:"docker-compose基础概念",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#docker-compose基础概念","aria-hidden":"true"},"#"),n(" docker-compose基础概念")],-1),L=e("br",null,null,-1),E=e("br",null,null,-1),I={href:"https://docs.docker.com/compose/#features",target:"_blank",rel:"noopener noreferrer"},C=e("p",null," ",-1),N=e("p",null,"docker-compose将所管理的容器分为三层，分别是工程（project），服务（service）以及容器（container）。",-1),Y=e("ul",null,[e("li",null,"docker-compose运行目录下的所有文件（docker-compose.yml文件、extends文件或环境变量等）组成一个工程，如无特殊指定，工程名即为当前目录名。"),e("li",null,"一个工程（project）当中，可以包含多个服务（service），每个服务中定义了容器（container）运行的镜像、参数、依赖。"),e("li",null,[n("一个服务中可以包括多个容器实例，docker-compose并没有解决负载均衡的问题。因此需要借助其他工具实现服务发现及负载均衡，比如consul。"),e("br"),n("  "),e("br"),n(" docker-compose的工程配置文件默认为docker-compose.yml。可以通过环境变量COMPOSE_FILE -f 参数自定义配置文件，其自定义多个有依赖关系的服务及每个人服务运行的容器。")])],-1),T=d('<h3 id="为什么要用docker-compose" tabindex="-1"><a class="header-anchor" href="#为什么要用docker-compose" aria-hidden="true">#</a> 为什么要用docker-compose</h3><blockquote><p>使用一个Dockerfile模板文件，可以让用户很方便的定义一个单独应用容器。在工作中，经常会碰到需要多个容器相互配合来完成某项任务的情况，例如要实现一个web项目，除了web服务容器本身，往往还需要再加上后端的数据库服务容器，甚至还包括负载均衡容器等。<br> compose允许用户通过一个单独docker-compose.yml模板文件（YAML格式）来定义一组相关联的应用容器为一个项目（project）;<br>  <br> docker-compose项目由pypthon编写，调用docker服务提供的API来对容器进行管理，因此， 只要所操作的平台支持docker-API，就可以在其上利用conpose来进行编排管理。<br>  <br> 当在宿主机启动较多的容器时，如果都是手动操作会觉得比较麻烦，而且容易出错，这个时候推荐使用 docker 单机编排工具 docker-compose,docker-compose是docker容器的一种编排服务，docker-compose是一个管理多个容器的工具，比如可以解决容器之间的依赖关系，就像启动一个web服务，就必须得先把数据库服务先启动一样，docker-compose完全可以替代docker run 一键启动容器。<br>  <br> 简单来说：就是来管理多个容器的，定义启动顺序的，合理编排，方便管理。</p></blockquote>',2),R={href:"https://github.com/docker/compose",target:"_blank",rel:"noopener noreferrer"},O=e("h2",{id:"yaml文件格式编写及编写注意事项",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#yaml文件格式编写及编写注意事项","aria-hidden":"true"},"#"),n(" YAML文件格式编写及编写注意事项")],-1),S=e("ul",null,[e("li",null,"YAML是一种标记性语言，它可以很直观的展示数据序列化格式，可读性高。"),e("li",null,"类似于json数据描述语言，但是语法要比json简单很多。"),e("li",null,"YAML数据结构通过缩进来表示，连续的项目通过减号来表示，键值对用冒号分隔，数组用中括号[ ] 括起来，bash用花括号{ } 括起来。")],-1),j=e("ul",null,[e("li",null,"不支持制表符tab键缩进，只能使用空格缩进"),e("li",null,"通常开头缩进2个空格"),e("li",null,"字符后缩进1个空格，如冒号【：】、逗号【，】、横杠【-】"),e("li",null,"用#号表示注释"),e("li",null,"如果包含特殊字符用单引号【’ '】引起来作为普通字符，如果用双引号【“ ”】表示特殊字符本身的意思，"),e("li",null,"布尔值必须用【“ ”】括起来"),e("li",null,"YAML区分大小写")],-1),P=e("br",null,null,-1),V={href:"https://liucy.blog.csdn.net/article/details/129041706",target:"_blank",rel:"noopener noreferrer"},z={href:"https://liucy.blog.csdn.net/article/details/124688952",target:"_blank",rel:"noopener noreferrer"},B=e("h2",{id:"docker-compose的安装",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#docker-compose的安装","aria-hidden":"true"},"#"),n(" docker-compose的安装")],-1),U=e("h3",{id:"在线安装",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#在线安装","aria-hidden":"true"},"#"),n(" 在线安装")],-1),G={href:"https://liucy.blog.csdn.net/article/details/124688952",target:"_blank",rel:"noopener noreferrer"},H=e("br",null,null,-1),F=e("h3",{id:"离线安装",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#离线安装","aria-hidden":"true"},"#"),n(" 离线安装")],-1),$=e("p",null,"在这里我就说一种docker-compose离线部署方式；",-1),K=e("ol",null,[e("li",null,"下载对应的docker-compose版本")],-1),W={href:"https://github.com/docker/compose/releases",target:"_blank",rel:"noopener noreferrer"},J=e("br",null,null,-1),Q=e("code",null,'https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose',-1),X=e("br",null,null,-1),Z={href:"https://download.csdn.net/download/liu_chen_yang/89428645",target:"_blank",rel:"noopener noreferrer"},ee=d(`<ol start="2"><li>将下载的服务器放到/usr/local/bin/下</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mv</span> <span class="token function">docker-compose</span> /usr/local/bin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>给docker-compose添加执行权限</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span>  +x /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4"><li>创建软连接</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/bin/docker-compose /usr/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5"><li>验证安装是否完成<br> 执行如下命令，如果可以正常显示版本号，则表示已经完成</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161503192.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>安装完成。</p><h2 id="docker-compose常用的命令详解" tabindex="-1"><a class="header-anchor" href="#docker-compose常用的命令详解" aria-hidden="true">#</a> docker-compose常用的命令详解</h2><p>运行这些命令需要结合docker-compose一起使用。</p><p>且必须要在含有docker-compose.yml文件的目录中才可以使用，不然报错。</p><table><thead><tr><th>命令</th><th>描述/详解</th></tr></thead><tbody><tr><td>build</td><td>重新构建服务</td></tr><tr><td>ps</td><td>列出容器</td></tr><tr><td>images</td><td>列出所有镜像</td></tr><tr><td>up</td><td>创建和启动容器</td></tr><tr><td>exec</td><td>在容器里面执行命令</td></tr><tr><td>scale</td><td>指定一个服务容器启动数量</td></tr><tr><td>top</td><td>显示正在运行的容器进程</td></tr><tr><td>logs</td><td>查看服务容器的输出/也就是日志</td></tr><tr><td>down</td><td>删除容器、网络、数据卷和镜像</td></tr><tr><td>stop/start/restart</td><td>停止/启动/重启服务</td></tr><tr><td>pause</td><td>暂停一个服务</td></tr><tr><td>unpause</td><td>恢复暂停的一个服务</td></tr><tr><td>pull</td><td>拉取服务依赖的镜像</td></tr><tr><td>push</td><td>推送服务依赖的镜像</td></tr></tbody></table><h2 id="docker-compose常用的字段详解" tabindex="-1"><a class="header-anchor" href="#docker-compose常用的字段详解" aria-hidden="true">#</a> docker-compose常用的字段详解</h2><table><thead><tr><th>字段</th><th>描述/详解</th></tr></thead><tbody><tr><td>build</td><td>指定Dockerfile文件名（要指定的Dockerfile文件需要在build标签的子级标签中用dockefile标签指定）</td></tr><tr><td>dockerfile</td><td>构建镜像上下文路径</td></tr><tr><td>context</td><td>可以是dockerfile路径，或者时执行git仓库的url地址</td></tr><tr><td>images</td><td>指定镜像</td></tr><tr><td>command</td><td>执行命令，会覆盖容器启动后默认执行的命令（会覆盖dockefile中的CMD指令）</td></tr><tr><td>container_name</td><td>指定容器名称，由于容器名称是唯一的，如果指定自定义名称，则无法scale指定容器数量。</td></tr><tr><td>deploy</td><td>指定部署和运行服务相关配置，只能在swarm模式使用</td></tr><tr><td>environment</td><td>添加环境变量</td></tr><tr><td>networks</td><td>加入网络，引用顶级networks下条目</td></tr><tr><td>network_mode</td><td>设置容器的网络模式</td></tr><tr><td>ports</td><td>暴露容器端口，与-p相同，但是端口不能低于60</td></tr><tr><td>volumes</td><td>挂载一个宿主机目录或命令卷到容器，命令卷要在顶级volumes定义卷名称</td></tr><tr><td>volumes_from</td><td>从另一个服务或容器挂载卷，可选参数：ro和rw（仅版本‘2’支持）</td></tr><tr><td>hostname</td><td>在容器内设置内核参数</td></tr><tr><td>links</td><td>连接诶到另一个容器，- 服务名称[ : ]</td></tr><tr><td>privileged</td><td>用来给容器root权限，注意是不安全的，true</td></tr><tr><td>restart</td><td>重启策略，定义是否重启容器1、no，默认策略，在容器退出时不重启容器2、on-failure，在容器非正常退出时（退出状态非0），才会重启容器3、on-failure：3 在容器非正常退出时，重启容器，最多重启3次4、always，在容器退出时总是重启容器，5、unless-stopped，在容器退出时总是重启容器，但是不考虑在Docker守护进程启动时就已经停止了的容器。</td></tr><tr><td>depends_on</td><td>此标签用于解决容器的依赖，启动先后问题。如启动应用容器，需要先启动数据库容器。php:depends_on:- apache- mysql</td></tr></tbody></table><h2 id="docker-compose常用的命令、字段详解实例" tabindex="-1"><a class="header-anchor" href="#docker-compose常用的命令、字段详解实例" aria-hidden="true">#</a> docker-compose常用的命令、字段详解实例</h2><p>运行这些命令需要结合docker-compose一起使用。</p><p>且必须要在含有docker-compose.yml文件的目录中才可以使用，不然报错。</p><h3 id="docker-compose命令格式-带-的是常用的" tabindex="-1"><a class="header-anchor" href="#docker-compose命令格式-带-的是常用的" aria-hidden="true">#</a> docker-compose命令格式，带*的是常用的</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token punctuation">[</span>-f <span class="token operator">&lt;</span>arg<span class="token operator">&gt;</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token punctuation">[</span>COMMAND<span class="token punctuation">]</span> <span class="token punctuation">[</span>ARGS<span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令选项如下：</p><ul><li>-f，–file 指定Compose模板文件，默认为docker-compose.yml，可以多次指定。</li><li>-p，–project-name NAME指定项目名称，默认将使用所在目录名称作为项目名。</li><li>-x-network-driver 使用Docker的可拔插网络后端特性（需要Docker 1.9+版本）</li><li>-x-network-driver DRIVER指定网络后端的驱动，默认为bridge（需要Docker 1.9+版本）</li><li>-verbose输出更多调试信息</li><li>-v，–version打印版本并退出</li></ul><p>常用的方式有：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看docker-compose版本</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-v</span>

<span class="token comment">#指定docker-compose文件并启动</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-docker-compose-h" tabindex="-1"><a class="header-anchor" href="#_1-docker-compose-h" aria-hidden="true">#</a> 1 docker-compose -h</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看帮助命令（查看其余命令的使用）</p><h3 id="_2-docker-compose-up" tabindex="-1"><a class="header-anchor" href="#_2-docker-compose-up" aria-hidden="true">#</a> *2 docker-compose up</h3><p>选项包括：</p><ul><li>-d 在后台运行服务容器</li><li>–no-color 不使用颜色来区分不同的服务的控制输出</li><li>–no-deps 不启动服务所链接的容器</li><li>–force-recreate 强制重新创建容器，不能与–no-recreate同时使用</li><li>–no-recreate 如果容器已经存在，则不重新创建，不能与–force-recreate同时使用</li><li>–no-build 不自动构建缺失的服务镜像</li><li>–build 在启动容器前构建服务镜像</li><li>–abort-on-container-exit 停止所有容器，如果任何一个容器被停止，不能与-d同时使用</li><li>-t, –timeout TIMEOUT 停止容器时候的超时（默认为10秒）</li><li>–remove-orphans 删除服务中没有在compose文件中定义的容器</li><li>–scale SERVICE=NUM 设置服务运行容器的个数，将覆盖在compose中通过scale指定的参数</li></ul><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#启动所有服务</span>
<span class="token function">docker-compose</span> up

<span class="token comment">#启动所有服务，指定yaml</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml up

<span class="token comment">#启动所有服务在后台运行服务容器</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>

<span class="token comment">#启动所有服务，指定yaml在后台运行服务容器</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-docker-compose-images" tabindex="-1"><a class="header-anchor" href="#_3-docker-compose-images" aria-hidden="true">#</a> *3 docker-compose images</h3><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看所有镜像</span>
<span class="token function">docker-compose</span> images

<span class="token comment">#查看所有镜像指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-docker-compose-ps" tabindex="-1"><a class="header-anchor" href="#_4-docker-compose-ps" aria-hidden="true">#</a> *4 docker-compose ps</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>列出项目中目前的所有容器
<span class="token function">docker-compose</span> <span class="token function">ps</span> 

<span class="token comment">#指定查看yaml文件的容器</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml <span class="token function">ps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以将yaml名称改为docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml，就可以直接使用docker-compose ps查看所有容器，如果是其他命名，就需要使用-f 指定yaml文件。</p>`,39),ne=d(`<h3 id="_5-docker-compose-stop" tabindex="-1"><a class="header-anchor" href="#_5-docker-compose-stop" aria-hidden="true">#</a> *5 docker-compose stop</h3><p>选项包括：</p><ul><li>-t, –timeout TIMEOUT 停止容器时候的超时（默认为10秒）</li></ul><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#停止所有服务</span>
<span class="token function">docker-compose</span> stop

<span class="token comment">#停止所有服务指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml stop

<span class="token comment">#停止指定服务（指定服务是在yaml文件中所写的服务）</span>
<span class="token function">docker-compose</span> stop 服务名
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml stop 服务名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-docker-compose-start" tabindex="-1"><a class="header-anchor" href="#_6-docker-compose-start" aria-hidden="true">#</a> *6 docker-compose start</h3><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#启动所有服务</span>
<span class="token function">docker-compose</span> start

<span class="token comment">#启动所有服务指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml start

<span class="token comment">#启动指定服务（指定服务是在yaml文件中所写的服务）</span>
<span class="token function">docker-compose</span> start 服务名
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml start 服务名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-docker-compose-restart" tabindex="-1"><a class="header-anchor" href="#_7-docker-compose-restart" aria-hidden="true">#</a> *7 docker-compose restart</h3><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#重启所有服务</span>
<span class="token function">docker-compose</span> start

<span class="token comment">#重启所有服务指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml restart

<span class="token comment">#重启指定服务（指定服务是在yaml文件中所写的服务）</span>
<span class="token function">docker-compose</span> restart 服务名
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml restart 服务名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-docker-compose-down" tabindex="-1"><a class="header-anchor" href="#_8-docker-compose-down" aria-hidden="true">#</a> *8 docker-compose down</h3><p>停止和删除容器、网络、卷、镜像。<br> 选项包括：</p><ul><li>–rmi type，删除镜像，类型必须是：all，删除compose文件中定义的所有镜像；local，删除镜像名为空的镜像</li><li>-v, –volumes，删除已经在compose文件中定义的和匿名的附在容器上的数据卷</li><li>–remove-orphans，删除服务中没有在compose中定义的容器</li></ul><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#停止并删除所有服务</span>
<span class="token function">docker-compose</span> down

<span class="token comment">#停止并删除所有服务指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml down
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-docker-compose-logs" tabindex="-1"><a class="header-anchor" href="#_9-docker-compose-logs" aria-hidden="true">#</a> *9 docker-compose logs</h3><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看服务容器的输出。默认情况下，docker-compose将对不同的服务输出使用不同的颜色来区分。可以通过–no-color来关闭颜色。</span>
<span class="token function">docker-compose</span> logs

<span class="token comment">#查看服务容器的输出指定yaml文件。默认情况下，docker-compose将对不同的服务输出使用不同的颜色来区分。可以通过–no-color来关闭颜色。</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml logs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-docker-compose-top" tabindex="-1"><a class="header-anchor" href="#_10-docker-compose-top" aria-hidden="true">#</a> *10 docker-compose top</h3><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看服务的所有进程</span>
<span class="token function">docker-compose</span> <span class="token function">top</span>

<span class="token comment">#查看服务的所有进程指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml <span class="token function">top</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-docker-compose-build" tabindex="-1"><a class="header-anchor" href="#_11-docker-compose-build" aria-hidden="true">#</a> 11 docker-compose build</h3><p>构建（重新构建）项目中的服务容器。<br> 选项包括：</p><ul><li>–compress 通过gzip压缩构建上下环境</li><li>–force-rm 删除构建过程中的临时容器</li><li>–no-cache 构建镜像过程中不使用缓存</li><li>–pull 始终尝试通过拉取操作来获取更新版本的镜像</li><li>-m, –memory MEM为构建的容器设置内存大小</li><li>–build-arg key=val为服务设置build-time变量</li><li>服务容器一旦构建后，将会带上一个标记名。可以随时在项目目录下运行docker-compose build来重新构建服务</li></ul><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#构建（重新构建）项目中的服务容器</span>
<span class="token function">docker-compose</span> build

<span class="token comment">#构建（重新构建）项目中的服务容器指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_12-docker-compose-exec" tabindex="-1"><a class="header-anchor" href="#_12-docker-compose-exec" aria-hidden="true">#</a> 12 docker-compose exec</h3><p>选项包括：</p><ul><li>-d 分离模式，后台运行命令。</li><li>–privileged 获取特权。</li><li>–user USER 指定运行的用户。</li><li>-T 禁用分配TTY，默认docker-compose exec分配TTY。</li><li>–index=index，当一个服务拥有多个容器时，可通过该参数登陆到该服务下的任何服务，例如：docker-compose exec –index=1 web /bin/bash ，web服务中包含多个容器</li></ul><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-d</span> –privileged

<span class="token comment">#指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml <span class="token builtin class-name">exec</span> <span class="token parameter variable">-d</span> –privileged
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_13-docker-compose-scale" tabindex="-1"><a class="header-anchor" href="#_13-docker-compose-scale" aria-hidden="true">#</a> 13 docker-compose scale</h3><ul><li>设置指定服务运行的容器个数。通过service=num的参数来设置数量，但是要注意设置端口的不能使用这个命令</li></ul><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#设置nginx服务启动两个</span>
<span class="token function">docker-compose</span> scale <span class="token assign-left variable">nginx</span><span class="token operator">=</span><span class="token number">2</span>

<span class="token comment">#设置nginx服务启动两个指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml scale <span class="token assign-left variable">nginx</span><span class="token operator">=</span><span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_14-docker-compose-pause" tabindex="-1"><a class="header-anchor" href="#_14-docker-compose-pause" aria-hidden="true">#</a> *14 docker-compose pause</h3><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#暂停一个服务</span>
<span class="token function">docker-compose</span> pause

<span class="token comment">#暂停一个服务指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml pause
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_15-docker-compose-unpause" tabindex="-1"><a class="header-anchor" href="#_15-docker-compose-unpause" aria-hidden="true">#</a> *15 docker-compose unpause</h3><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#恢复暂停的一个服务</span>
<span class="token function">docker-compose</span> unpause

<span class="token comment">#恢复暂停的一个服务指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml unpause
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_16-docker-compose-pull" tabindex="-1"><a class="header-anchor" href="#_16-docker-compose-pull" aria-hidden="true">#</a> 16 docker-compose pull</h3><p>拉取服务依赖的镜像。<br> 选项包括：</p><ul><li>–ignore-pull-failures，忽略拉取镜像过程中的错误</li><li>–parallel，多个镜像同时拉取</li><li>–quiet，拉取镜像过程中不打印进度信息</li></ul><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#拉取服务依赖的镜像</span>
<span class="token function">docker-compose</span> pull

<span class="token comment">#拉取服务依赖的镜像指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml pull

<span class="token comment">#拉取服务依赖的镜像忽略错误信息</span>
<span class="token function">docker-compose</span> pull –ignore-pull-failures

<span class="token comment">#拉取服务依赖的镜像忽略错误信息指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml pull –ignore-pull-failures
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_17-docker-compose-push" tabindex="-1"><a class="header-anchor" href="#_17-docker-compose-push" aria-hidden="true">#</a> 17 docker-compose push</h3><p>选项包括：</p><ul><li>–ignore-push-failures 忽略推送镜像过程中的错误</li></ul><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#推送服务依赖的镜像</span>
<span class="token function">docker-compose</span> push

<span class="token comment">#推送服务依赖的镜像指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml push

<span class="token comment">#推送服务依赖的镜像忽略错误信息</span>
<span class="token function">docker-compose</span> push –ignore-push-failures

<span class="token comment">#推送服务依赖的镜像忽略错误信息指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml push –ignore-push-failures
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_18-docker-compose-rm" tabindex="-1"><a class="header-anchor" href="#_18-docker-compose-rm" aria-hidden="true">#</a> 18 docker-compose rm</h3><p>删除所有（停止状态的）服务容器。<br> 选项包括：</p><ul><li>–f, –force，强制直接删除，包括非停止状态的容器</li><li>-v，删除容器所挂载的数据卷</li></ul><p>如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#删除所有（停止状态的）服务容器</span>
<span class="token function">docker-compose</span> <span class="token function">rm</span>

<span class="token comment">#删除所有（停止状态的）服务容器指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml <span class="token function">rm</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_19-dokcer-compose-config" tabindex="-1"><a class="header-anchor" href="#_19-dokcer-compose-config" aria-hidden="true">#</a> *19 dokcer-compose config</h3><p>选项包括：</p><ul><li>–resolve-image-digests 将镜像标签标记为摘要</li><li>-q, –quiet 只验证配置，不输出。 当配置正确时，不输出任何内容，当文件配置错误，输出错误信息</li><li>–services 打印服务名，一行一个</li><li>–volumes 打印数据卷名，一行一个</li></ul><p>也就是查看yaml文件是怎么写的；验证yaml文件是否写的正确。<br> 如果yaml文件名不是“docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml”，就需要使用-f指定yaml文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#验证并查看compose文件配置</span>
<span class="token function">docker-compose</span> config

<span class="token comment">#验证并查看compose文件配置并指定yaml文件</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> nginx.yaml config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose常用字段详解-yaml模板文件-带-的是常用的" tabindex="-1"><a class="header-anchor" href="#docker-compose常用字段详解-yaml模板文件-带-的是常用的" aria-hidden="true">#</a> docker-compose常用字段详解（yaml模板文件），带*的是常用的</h3><blockquote><p>Compose允许用户通过一个docker-compose.yml模板文件（YAML 格式）来定义一组相关联的应用容器为一个项目（project）。<br> Compose模板文件是一个定义服务、网络和卷的YAML文件。Compose模板文件默认路径是当前目录下的docker-compose.yml，可以使用.yml或.yaml作为文件扩展名。<br> Docker-Compose标准模板文件应该包含version、services、networks 三大部分，最关键的是services和networks两个部分。<br> &quot;:&quot;后面必须加空格，&quot;-&quot;后面必须加空格,每个字段写完都必须加&quot;:&quot;。</p></blockquote><h3 id="_1-version" tabindex="-1"><a class="header-anchor" href="#_1-version" aria-hidden="true">#</a> *1 version</h3><p>占据最左侧，每个yaml文件必写的；指定API版本号</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>version: <span class="token string">&quot;3&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-services" tabindex="-1"><a class="header-anchor" href="#_2-services" aria-hidden="true">#</a> *2 services</h3><p>占据最左侧，与version同列，也是每个yaml文件必写的；指定以下是服务,紧跟下面写的是该服务的名称，单独重启、启动、停止都需要写服务名称，而不是容器名称。<br> 服务名称要与services前面空两格，不能使用tab，必须使用空格。</p><p>services格式为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>services: 

  服务名称: 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>version: <span class="token string">&quot;3&quot;</span>
services: 

  nginx: 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-hostname" tabindex="-1"><a class="header-anchor" href="#_3-hostname" aria-hidden="true">#</a> *3 hostname</h3><ul><li>hostname格式为：hostname: &lt;主机名称&gt;</li></ul><p>在services服务的服务名称下一行空两格来写；</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>version: <span class="token string">&quot;3&quot;</span>
services: 

  nginx: 
    hostname: nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-container-name" tabindex="-1"><a class="header-anchor" href="#_4-container-name" aria-hidden="true">#</a> *4 container_name</h3><ul><li>Compose的容器名称（container_name）格式是：container_name: &lt;项目名称&gt;&lt;服务名称&gt;&lt;序号&gt;</li></ul><p>可以自定义项目名称、服务名称，但如果想完全控制容器的命名，可以使用标签指定：<br> 需和hostname同一列；</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>version: <span class="token string">&quot;3&quot;</span>
services: 

  nginx: 
    hostname: nginx
    container_name: nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-image" tabindex="-1"><a class="header-anchor" href="#_5-image" aria-hidden="true">#</a> *5 image</h3><ul><li>image格式为：image: 镜像名:版本号</li></ul><p>image是指定服务的镜像名称或镜像ID。如果镜像在本地不存在，Compose将会尝试拉取镜像。<br> 需要与container_name同一列；</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>version: <span class="token string">&quot;3&quot;</span>
services: 

  nginx: 
    hostname: nginx
    container_name: nginx
	image: nginx:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-ports" tabindex="-1"><a class="header-anchor" href="#_6-ports" aria-hidden="true">#</a> *6 ports</h3><p>ports格式为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ports:
  - <span class="token string">&quot;容器外端口:容器内端口&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>ports用于映射端口的标签。<br> 使用HOST:CONTAINER格式或者只是指定容器的端口，宿主机会随机映射端口。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>version: <span class="token string">&quot;3&quot;</span>
services: 

  nginx: 
    hostname: nginx
    container_name: nginx
	image: nginx:latest
	ports: 
	  - <span class="token string">&quot;80:80&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-volumes" tabindex="-1"><a class="header-anchor" href="#_7-volumes" aria-hidden="true">#</a> *7 volumes</h3><p>挂载一个目录或者一个已存在的数据卷容器，可以直接使用 [HOST:CONTAINER]格式，或者使用[HOST:CONTAINER:ro]格式，后者对于容器来说，数据卷是只读的，可以有效保护宿主机的文件系统。<br> Compose的数据卷指定路径可以是相对路径，使用 . 或者 … 来指定相对目录。<br> 数据卷的格式可以是下面多种形式：<br> 和hostname、ports同列。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>volumes:
  // 只是指定一个路径，Docker 会自动在创建一个数据卷（这个路径是容器内部的）。
  - /var/lib/mysql
  // 使用绝对路径挂载数据卷
  - /opt/data:/var/lib/mysql
  // 以 Compose 配置文件为中心的相对路径作为数据卷挂载到容器。
  - ./cache:/tmp/cache
  // 使用用户的相对路径（~/ 表示的目录是 /home/<span class="token operator">&lt;</span>用户目录<span class="token operator">&gt;</span>/ 或者 /root/）。
  - ~/configs:/etc/configs/:ro
  // 已经存在的命名的数据卷。
  - datavolume:/var/lib/mysql
  // 如果不使用宿主机的路径，可以指定一个volume_driver。
  - volume_driver: mydriver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-restart" tabindex="-1"><a class="header-anchor" href="#_8-restart" aria-hidden="true">#</a> *8 restart</h3><p>格式为：restart: always/no/on-failure/unless-stopped<br> 设置改容器是否开机自启；</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>version: <span class="token string">&quot;3&quot;</span>
services: 

  nginx: 
    hostname: nginx
    container_name: nginx
	image: nginx:latest
	ports: 
	  - <span class="token string">&quot;80:80&quot;</span>
	  - <span class="token number">443</span>
    restart: always
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-volumes-from" tabindex="-1"><a class="header-anchor" href="#_9-volumes-from" aria-hidden="true">#</a> 9 volumes_from</h3><p>从另一个服务或容器挂载其数据卷：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>version: <span class="token string">&quot;3&quot;</span>
services: 

  nginx: 
    hostname: nginx
    volumes_from:
      - service_name    
        - container_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-command" tabindex="-1"><a class="header-anchor" href="#_10-command" aria-hidden="true">#</a> *10 command</h3><p>使用command可以覆盖容器启动后默认执行的命令。和Dockerfile中的CMD一样，执行命令。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>version: <span class="token string">&quot;3&quot;</span>
services: 

  nginx: 
    hostname: nginx
	command: <span class="token function">sh</span> /application/start.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-build" tabindex="-1"><a class="header-anchor" href="#_11-build" aria-hidden="true">#</a> 11 build</h3><p>服务除了可以基于指定的镜像，还可以基于一份Dockerfile，在使用up启动时执行构建任务，构建标签是build，可以指定Dockerfile所在文件夹的路径。Compose将会利用Dockerfile自动构建镜像，然后使用镜像启动服务容器。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>build: /path/to/build/dir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也可以是相对路径，只要上下文确定就可以读取到Dockerfile。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>build: ./dir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>设定上下文根目录，然后以该目录为准指定Dockerfile。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>build:
  context: <span class="token punctuation">..</span>/
  dockerfile: path/of/Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>build都是一个目录，如果要指定Dockerfile文件需要在build标签的子级标签中使用dockerfile标签指定。<br> 如果同时指定image和build两个标签，那么Compose会构建镜像并且把镜像命名为image值指定的名字。</p><h3 id="_12-context" tabindex="-1"><a class="header-anchor" href="#_12-context" aria-hidden="true">#</a> 12 context</h3><p>context选项可以是Dockerfile的文件路径，也可以是到链接到git仓库的url，当提供的值是相对路径时，被解析为相对于撰写文件的路径，此目录也是发送到Docker守护进程的context</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>build:
  context: ./dir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_13-dockerfile" tabindex="-1"><a class="header-anchor" href="#_13-dockerfile" aria-hidden="true">#</a> 13 dockerfile</h3><p>使用dockerfile文件来构建，必须指定构建路径</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>build: 
  context: <span class="token builtin class-name">.</span>
  dockerfile: Dockerfile-alternate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_14-depends-on" tabindex="-1"><a class="header-anchor" href="#_14-depends-on" aria-hidden="true">#</a> 14 depends_on</h3><p>在使用Compose时，最大的好处就是少打启动命令，但一般项目容器启动的顺序是有要求的，如果直接从上到下启动容器，必然会因为容器依赖问题而启动失败。例如在没启动数据库容器的时候启动应用容器，应用容器会因为找不到数据库而退出。depends_on标签用于解决容器的依赖、启动先后的问题。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>version: <span class="token string">&#39;2&#39;</span>
services:
  web:
    build: <span class="token builtin class-name">.</span>
    depends_on:
      - db
      - redis
  redis:
    image: redis
  db:
    image: postgres
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述YAML文件定义的容器会先启动redis和db两个服务，最后才启动web 服务。</p><h3 id="_15-pid" tabindex="-1"><a class="header-anchor" href="#_15-pid" aria-hidden="true">#</a> 15 pid</h3><p>将PID模式设置为主机PID模式，跟主机系统共享进程命名空间。容器使用pid标签将能够访问和操纵其他容器和宿主机的名称空间。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pid: <span class="token string">&quot;host&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_16-labels" tabindex="-1"><a class="header-anchor" href="#_16-labels" aria-hidden="true">#</a> 16 labels</h3><p>为容器添加Docker元数据（metadata）信息。例如，可以为容器添加辅助说明信息：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>labels：
    com.startupteam.description: <span class="token string">&quot;nginx for a strtup team&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_17-network-mode" tabindex="-1"><a class="header-anchor" href="#_17-network-mode" aria-hidden="true">#</a> 17 network_mode</h3><p>设置网络模式。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>network_mode: <span class="token string">&quot;bridge&quot;</span>
network_mode: <span class="token string">&quot;none&quot;</span>
network_mode: <span class="token string">&quot;host&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_18-dns" tabindex="-1"><a class="header-anchor" href="#_18-dns" aria-hidden="true">#</a> 18 dns</h3><p>自定义DNS服务器。可以是一个值，也可以是一个列表。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>dns：8.8.8.8
dns：<span class="token comment"># development.yml</span>
    - <span class="token number">8.8</span>.8.8    
    - <span class="token number">9.9</span>.9.9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_19-dns-search" tabindex="-1"><a class="header-anchor" href="#_19-dns-search" aria-hidden="true">#</a> 19 dns_search</h3><p>配置DNS搜索域。可以是一个值，也可以是一个列表。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>dns_search：example.com
dns_search：
    - domain1.example.com
    - domain2.example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_20-entrypoint" tabindex="-1"><a class="header-anchor" href="#_20-entrypoint" aria-hidden="true">#</a> 20 entrypoint</h3><p>在Dockerfile中有一个指令叫做ENTRYPOINT指令，用于指定接入点。<br> 在docker-compose.yml中可以定义接入点，覆盖Dockerfile中的定义：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>entrypoint: /code/entrypoint.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_21-env-file" tabindex="-1"><a class="header-anchor" href="#_21-env-file" aria-hidden="true">#</a> 21 env_file</h3><p>在docker-compose.yml中可以定义一个专门存放变量的文件。<br> 如果通过docker-compose -f FILE指定配置文件，则env_file中路径会使用配置文件路径。<br> 如果有变量名称与environment指令冲突，则以后者为准。格式如下：<br> env_file: .env<br> 或者根据docker-compose.yml设置多个：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>env_file:
  - ./common.env
  - ./apps/web.env
  - ./opt/secrets.env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_22-cap-add" tabindex="-1"><a class="header-anchor" href="#_22-cap-add" aria-hidden="true">#</a> 22 cap_add</h3><p>增加指定容器的内核能力（capacity）。<br> 让容器具有所有能力可以指定：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cap_add:
    - ALL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_23-cap-drop" tabindex="-1"><a class="header-anchor" href="#_23-cap-drop" aria-hidden="true">#</a> 23 cap_drop</h3><p>去掉指定容器的内核能力（capacity）。<br> 去掉NET_ADMIN能力可以指定：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cap_drop:
    - NET_ADMIN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_24-cgroup-parent" tabindex="-1"><a class="header-anchor" href="#_24-cgroup-parent" aria-hidden="true">#</a> 24 cgroup_parent</h3><p>创建了一个cgroup组名称为cgroups_1:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cgroup_parent: cgroups_1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_25-expose" tabindex="-1"><a class="header-anchor" href="#_25-expose" aria-hidden="true">#</a> 25 expose</h3><p>暴露端口，但不映射到宿主机，只允许能被连接的服务访问。仅可以指定内部端口为参数，如下所示：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>expose:
    - <span class="token string">&quot;3000&quot;</span>
    - <span class="token string">&quot;8000&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_26-extends" tabindex="-1"><a class="header-anchor" href="#_26-extends" aria-hidden="true">#</a> 26 extends</h3><p>基于其它模板文件进行扩展。例如，对于webapp服务定义了一个基础模板文件为common.yml：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>webapp:
    build: ./webapp
    environment:
        - <span class="token assign-left variable">DEBUG</span><span class="token operator">=</span>false
        - <span class="token assign-left variable">SEND_EMAILS</span><span class="token operator">=</span>false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再编写一个新的development.yml文件，使用common.yml中的webapp服务进行扩展：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>web:
    extends:
        file: common.yml
        service: webapp
    ports:
        - <span class="token string">&quot;8000:8000&quot;</span>
    links:
        - db
    environment:
        - <span class="token assign-left variable">DEBUG</span><span class="token operator">=</span>true
db:
    image: mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后者会自动继承common.yml中的webapp服务及环境变量定义。<br> extends限制如下：<br> A、要避免出现循环依赖<br> B、extends不会继承links和volumes_from中定义的容器和数据卷资源<br> 推荐在基础模板中只定义一些可以共享的镜像和环境变量，在扩展模板中具体指定应用变量、链接、数据卷等信息</p><h3 id="_27-external-links" tabindex="-1"><a class="header-anchor" href="#_27-external-links" aria-hidden="true">#</a> 27 external_links</h3><p>链接到docker-compose.yaml外部的容器，可以是非docker-compose管理的外部容器。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>external_links:
    - redis_1
    - project_db_1:mysql
    - project_db_1:postgresql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_28-links" tabindex="-1"><a class="header-anchor" href="#_28-links" aria-hidden="true">#</a> 28 links</h3><p>链接到其它服务中的容器。使用服务名称（同时作为别名），或者“服务名称:服务别名”（如 SERVICE:ALIAS），例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>links:
    - db
    - db:database
    - redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用别名将会自动在服务容器中的/etc/hosts里创建。例如：</p><p>172.16.2.186 db<br> 172.16.2.186 database<br> 172.16.2.187 redis</p><h3 id="_29-working-dir" tabindex="-1"><a class="header-anchor" href="#_29-working-dir" aria-hidden="true">#</a> 29 working_dir</h3><p>切换目标目录，与Dockerfile中的”WORKDIR“相同</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>working_dir: /application/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="标准yaml文件名为-docker-compose-yml-docker-compose-yaml-compose-yml-compose-yaml" tabindex="-1"><a class="header-anchor" href="#标准yaml文件名为-docker-compose-yml-docker-compose-yaml-compose-yml-compose-yaml" aria-hidden="true">#</a> 标准yaml文件名为：docker-compose.yml, docker-compose.yaml, compose.yml, compose.yaml</h2>`,170),se=e("br",null,null,-1),ae=d(`<h2 id="docker-compose-模板文件详写实例" tabindex="-1"><a class="header-anchor" href="#docker-compose-模板文件详写实例" aria-hidden="true">#</a> docker-compose 模板文件详写实例</h2><p>三个nginx服务，访问端口分别为:[80,81,82]</p><h3 id="_1-创建模板yaml文件" tabindex="-1"><a class="header-anchor" href="#_1-创建模板yaml文件" aria-hidden="true">#</a> 1 创建模板yaml文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>version: <span class="token string">&quot;3&quot;</span>                <span class="token comment">#API版本</span>

services:                   <span class="token comment">#服务</span>
  nginx1:                   <span class="token comment">#服务名称</span>
   hostname: nginx1          <span class="token comment">#容器内主机名称</span>
   container_name: nginx1    <span class="token comment">#容器名</span>
   image: nginx:latest       <span class="token comment">#要使用的镜像</span>
   restart: always           <span class="token comment">#设置开机自启</span>
   ports:
     - <span class="token string">&quot;80:80&quot;</span>
     - <span class="token string">&quot;443:443&quot;</span>
   volumes: 
     - /data/nginx1/conf/nginx.conf:/etc/nginx/nginx.conf
     - /data/nginx1/html:/usr/share/nginx/html
     - /data/nginx1/logs:/var/log/nginx
     - /etc/localtime:/etc/localtime

  nginx2: 
    hostname: nginx2
    container_name: nginx2
    image: nginx:latest
    restart: always
    ports:
      - <span class="token string">&quot;81:80&quot;</span>
      - <span class="token string">&quot;444:443&quot;</span>
    volumes:
     - /data/nginx2/conf/nginx.conf:/etc/nginx/nginx.conf
     - /data/nginx2/html:/usr/share/nginx/html
     - /data/nginx2/logs:/var/log/nginx
     - /etc/localtime:/etc/localtime

  nginx3:
    hostname: nginx3
    container_name: nginx3
    image: nginx:latest
    restart: always
    ports:
      - <span class="token string">&quot;82:80&quot;</span>
      - <span class="token string">&quot;445:443&quot;</span>
    volumes:
     - /data/nginx3/conf/nginx.conf:/etc/nginx/nginx.conf
     - /data/nginx3/html:/usr/share/nginx/html
     - /data/nginx3/logs:/var/log/nginx
     - /etc/localtime:/etc/localtime
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-启动nginx服务" tabindex="-1"><a class="header-anchor" href="#_2-启动nginx服务" aria-hidden="true">#</a> 2 启动nginx服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#创建启动nginx3个服务</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161502945.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_3-访问nginx页面" tabindex="-1"><a class="header-anchor" href="#_3-访问nginx页面" aria-hidden="true">#</a> 3 访问nginx页面</h3>`,8),ie=e("br",null,null,-1),le={href:"http://127.0.0.1:80",target:"_blank",rel:"noopener noreferrer"},de=e("br",null,null,-1),oe={href:"http://127.0.0.1:81",target:"_blank",rel:"noopener noreferrer"},re=e("br",null,null,-1),ce={href:"http://127.0.0.1:82",target:"_blank",rel:"noopener noreferrer"},te=e("h2",{id:"重要-yaml需要注意的",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#重要-yaml需要注意的","aria-hidden":"true"},"#"),n(" 重要：YAML需要注意的")],-1),me=e("p",null,[n("1 YAML需要注意的问题就是格式问题："),e("br"),n(" ERROR: In file './nginx.yaml', service 'hostname' must be a mapping not a st"),e("br"),n(" 解决：查看自己的YAML文件格式是否正确；")],-1),pe={href:"https://liucy.blog.csdn.net/article/details/129082503",target:"_blank",rel:"noopener noreferrer"};function ue(ve,be){const a=o("ExternalLinkIcon"),i=o("font");return c(),t("div",null,[e("blockquote",null,[p,e("p",null,[n("  🏅"),e("a",u,[n("CSDN博客专家"),s(a)]),v,n("   🏅"),e("a",b,[n("云计算领域优质创作者"),s(a)]),h,n("   🏅"),e("a",k,[n("华为云开发者社区专家博主"),s(a)]),g,n("   🏅"),e("a",_,[n("阿里云开发者社区专家博主"),s(a)]),f,n(" 💊"),x,e("a",y,[n("运维交流社区"),s(a)]),n(" 欢迎大家的加入！"),q,n(" 🐋 希望大家多多支持，我们一起进步！😄"),w,n(" 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗")])]),D,A,M,e("blockquote",null,[e("p",null,[n("docker-compose项目是docker官方的开源项目，负责实现对docker容器集群的快速编排。"),L,n("  "),E,n(" Compose是用于定义和运行多容器Docker应用程序的工具。通过docker-compose，可以使用YAML文件来配置应用程序的服务。然后，使用一条命令，就可以从配置中创建并启动所有服务。如要了解更多有关docker-compose的功能，请参阅："),e("a",I,[n("功能列表"),s(a)]),n("。")]),C,N,Y]),T,e("p",null,[n("github地址："),e("a",R,[n("https://github.com/docker/compose"),s(a)])]),O,s(i,{size:"5"},{default:l(()=>[n("**1、YAML文件格式**")]),_:1}),S,s(i,{size:"4"},{default:l(()=>[n("**2、YAML格式的注意事项**")]),_:1}),j,s(i,{size:"4"},{default:l(()=>[n("**注意：**")]),_:1}),e("blockquote",null,[e("p",null,[n("请严格按照YAML文件格式来写，如格式写错docker-compose启动服务时一般会报："),s(i,{color:"red"},{default:l(()=>[n("ERROR: In file './nginx.yaml', service 'hostname' must be a mapping not a st")]),_:1}),n(" 这个错；解决方式就是看自己的YAML文件格式写的是否正确。"),P,n(" 更多YAML格式及实例可参考："),e("a",V,[n("yaml文件格式详解及实例"),s(a)])])]),e("p",null,[n("docker-compose部署文档可参考： "),e("a",z,[n("Linux中安装/部署docker-compose"),s(a)])]),B,U,e("p",null,[n("可参考： "),e("a",G,[n("Linux中安装/部署docker-compose"),s(a)]),n(" 文档，两种在线部署方式。"),H,n(" 其实在线安装中的第一种可作为离线安装，只要吧docker-compose下载下来，解压直接软连接就行，和接下来说的离线安装部署方式一样。")]),F,$,K,e("p",null,[n("在"),e("a",W,[n("Github"),s(a)]),n("中下载对应的版本，这里我们下载1.29.2版本的吧【docker-compose-Linux-x86_64】。"),J,n(' 如果找不到下载链接在哪，可找一台有外网的服务器下载：curl -L "'),Q,X,n(" 下载完成之后传到本地在上传到内网服务器中即可；")]),e("blockquote",null,[e("p",null,[n("或者可以直接下载："),e("a",Z,[n("docker-compose1.29.2离线包"),s(a)])])]),ee,s(i,{color:"red"},{default:l(()=>[n("最重要的必须在存放yaml文件的目录来执行。")]),_:1}),ne,e("p",null,[n("这些可以直接使用"),s(i,{color:"red"},{default:l(()=>[n("docker-compose 命令")]),_:1}),n(" 来执行;"),se,n(" 如果是其他文件名，比如nginx就需要使用 "),s(i,{color:"green"},{default:l(()=>[n("-f")]),_:1}),n(" 来指定 "),s(i,{color:"red"},{default:l(()=>[n("docker-compose -f nginx.yaml 命令")]),_:1}),n(" 来执行。")]),ae,e("p",null,[n("通过浏览器访问nginx1，nginx2，nginx3服务:"),ie,e("a",le,[n("http://127.0.0.1:80"),s(a)]),de,e("a",oe,[n("http://127.0.0.1:81"),s(a)]),re,e("a",ce,[n("http://127.0.0.1:82"),s(a)])]),te,me,e("p",null,[n('2 ":"后面必须加空格，"-"后面必须加空格,每个字段写完都必须加":"。具体还有请看《'),e("a",pe,[n("YAML文件格式编写及编写注意事项"),s(a)]),n("》")])])}const ge=r(m,[["render",ue],["__file","【Docker】之docker-compose的介绍与命令的使用.html.vue"]]);export{ge as default};
