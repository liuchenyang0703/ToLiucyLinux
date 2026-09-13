import{C as e,F as t,i as n,w as r}from"./app-BD240ftA.js";var i=JSON.parse(`{"path":"/document/Kubernetes/Kubernetes%20%E9%83%A8%E7%BD%B2%20MySQL%20%E4%B8%80%E4%B8%BB%E4%B8%A4%E4%BB%8E%E9%9B%86%E7%BE%A4%EF%BC%88StatefulSet%20_%20Job%20%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%BB%E4%BB%8E%E5%A4%8D%E5%88%B6%EF%BC%89.html","title":"Kubernetes 部署 MySQL 一主两从集群（StatefulSet + Job 初始化主从复制）","lang":"zh-CN","frontmatter":{"title":"Kubernetes 部署 MySQL 一主两从集群（StatefulSet + Job 初始化主从复制）","icon":"circle-info","order":1,"category":["Linux","kubernetes"],"tag":["Linux","kubernetes","StatefulSet","运维"],"date":"2026-04-15T00:00:00.000Z","isOriginal":true,"pageview":true,"article":true,"breadcrumb":false,"comment":true,"description":"👨‍🎓博主简介 🏅CSDN博客专家 🏅云计算领域优质创作者 🏅华为云开发者社区专家博主 🏅阿里云开发者社区专家博主 💊交流社区：运维交流社区 欢迎大家的加入！ 🐋 希望大家多多支持，我们一起进步！😄 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗 一、准备 MySQL 集群所需 YAML 文件 ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kubernetes 部署 MySQL 一主两从集群（StatefulSet + Job 初始化主从复制）\\",\\"image\\":[\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434696.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434502.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434720.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434691.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434282.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434461.png\\",\\"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434522.png\\"],\\"datePublished\\":\\"2026-04-15T00:00:00.000Z\\",\\"dateModified\\":\\"2026-09-03T12:38:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"𝑴𝒓.𝑳𝒊𝒖𝒄𝒚\\",\\"url\\":\\"https://liuchenyang.top\\"}]}"],["meta",{"property":"og:url","content":"https://liuchenyang.top/ToLiucyLinux/document/Kubernetes/Kubernetes%20%E9%83%A8%E7%BD%B2%20MySQL%20%E4%B8%80%E4%B8%BB%E4%B8%A4%E4%BB%8E%E9%9B%86%E7%BE%A4%EF%BC%88StatefulSet%20_%20Job%20%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%BB%E4%BB%8E%E5%A4%8D%E5%88%B6%EF%BC%89.html"}],["meta",{"property":"og:site_name","content":"ToLiucyLinux"}],["meta",{"property":"og:title","content":"Kubernetes 部署 MySQL 一主两从集群（StatefulSet + Job 初始化主从复制）"}],["meta",{"property":"og:description","content":"👨‍🎓博主简介 🏅CSDN博客专家 🏅云计算领域优质创作者 🏅华为云开发者社区专家博主 🏅阿里云开发者社区专家博主 💊交流社区：运维交流社区 欢迎大家的加入！ 🐋 希望大家多多支持，我们一起进步！😄 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗 一、准备 MySQL 集群所需 YAML 文件 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434696.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-09-03T12:38:29.000Z"}],["meta",{"property":"article:tag","content":"运维"}],["meta",{"property":"article:tag","content":"StatefulSet"}],["meta",{"property":"article:tag","content":"kubernetes"}],["meta",{"property":"article:tag","content":"Linux"}],["meta",{"property":"article:published_time","content":"2026-04-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2026-09-03T12:38:29.000Z"}],["link",{"rel":"canonical","href":"https://liuchenyang.top/document/Kubernetes/Kubernetes%20%E9%83%A8%E7%BD%B2%20MySQL%20%E4%B8%80%E4%B8%BB%E4%B8%A4%E4%BB%8E%E9%9B%86%E7%BE%A4%EF%BC%88StatefulSet%20_%20Job%20%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%BB%E4%BB%8E%E5%A4%8D%E5%88%B6%EF%BC%89.html"}]]},"git":{"createdTime":1776926205000,"updatedTime":1788439109000,"contributors":[{"name":"liuchenyang","username":"liuchenyang","email":"2162059863@qq.com","commits":2,"url":"https://github.com/liuchenyang"}]},"readingTime":{"minutes":12.34,"words":3703},"filePathRelative":"document/Kubernetes/Kubernetes 部署 MySQL 一主两从集群（StatefulSet + Job 初始化主从复制）.md","excerpt":"<blockquote>\\n<p>👨‍🎓<strong>博主简介</strong></p>\\n<p>  🏅<a href=\\"https://blog.csdn.net/liu_chen_yang?type=blog\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">CSDN博客专家</a><br>\\n  🏅<a href=\\"https://blog.csdn.net/liu_chen_yang?type=blog\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">云计算领域优质创作者</a><br>\\n  🏅<a href=\\"https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">华为云开发者社区专家博主</a><br>\\n  🏅<a href=\\"https://developer.aliyun.com/profile/7yu26jk3lfqxg\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">阿里云开发者社区专家博主</a><br>\\n💊<strong>交流社区：</strong><a href=\\"https://bbs.csdn.net/forums/lcy\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">运维交流社区</a> 欢迎大家的加入！<br>\\n🐋 希望大家多多支持，我们一起进步！😄<br>\\n🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗</p>\\n</blockquote>","copyright":"著作权归 Mr.Liucy 所有，本站内容遵循 MIT 协议，转载请注明出处。\\n原文链接：https://liuchenyang.top/document/Kubernetes/Kubernetes%20%E9%83%A8%E7%BD%B2%20MySQL%20%E4%B8%80%E4%B8%BB%E4%B8%A4%E4%BB%8E%E9%9B%86%E7%BE%A4%EF%BC%88StatefulSet%20_%20Job%20%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%BB%E4%BB%8E%E5%A4%8D%E5%88%B6%EF%BC%89.html","autoDesc":true}`),a={name:`Kubernetes 部署 MySQL 一主两从集群（StatefulSet + Job 初始化主从复制）.md`};function o(n,i,a,o,s,c){return t(),e(`div`,null,[...i[0]||=[r(`<blockquote><p>👨‍🎓<strong>博主简介</strong></p><p>  🏅<a href="https://blog.csdn.net/liu_chen_yang?type=blog" target="_blank" rel="noopener noreferrer">CSDN博客专家</a><br>   🏅<a href="https://blog.csdn.net/liu_chen_yang?type=blog" target="_blank" rel="noopener noreferrer">云计算领域优质创作者</a><br>   🏅<a href="https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234" target="_blank" rel="noopener noreferrer">华为云开发者社区专家博主</a><br>   🏅<a href="https://developer.aliyun.com/profile/7yu26jk3lfqxg" target="_blank" rel="noopener noreferrer">阿里云开发者社区专家博主</a><br> 💊<strong>交流社区：</strong><a href="https://bbs.csdn.net/forums/lcy" target="_blank" rel="noopener noreferrer">运维交流社区</a> 欢迎大家的加入！<br> 🐋 希望大家多多支持，我们一起进步！😄<br> 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗</p></blockquote><hr><h2 id="一、准备-mysql-集群所需-yaml-文件" tabindex="-1"><a class="header-anchor" href="#一、准备-mysql-集群所需-yaml-文件"><span>一、准备 MySQL 集群所需 YAML 文件</span></a></h2><blockquote><p>需提前创建好命名空间：<code>kubectl create ns mysql</code></p></blockquote><h3 id="_1-1-创建-headless-service-与读服务" tabindex="-1"><a class="header-anchor" href="#_1-1-创建-headless-service-与读服务"><span>1.1 创建 Headless Service 与读服务</span></a></h3><ul><li><code>vi mysql-svc.yaml</code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#7F848E;font-style:italic;"># 1. Headless Service - 内部通信</span></span>
<span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Service</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  clusterIP</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">None</span></span>
<span class="line"><span style="color:#E06C75;">  publishNotReadyAddresses</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span></span>
<span class="line"><span style="color:#E06C75;">  selector</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">  ports</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#E06C75;">port</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">3306</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">---</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 2. 读 Service - 应用读请求</span></span>
<span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Service</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql-read</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  type</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">ClusterIP</span><span style="color:#7F848E;font-style:italic;">  # 默认，自动分配IP</span></span>
<span class="line"><span style="color:#E06C75;">  selector</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">  ports</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#E06C75;">port</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">3306</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>为什么要创建两个 Service：<br><code>mysql</code> Headless Service 用于 StatefulSet 成员之间的稳定发现；<br><code>mysql-read</code> 用于提供统一访问入口和负载均衡能力。<br> 当前示例中 <code>mysql-read</code> 会匹配所有 MySQL Pod，如需严格读写分离，还需要为主从实例增加不同标签，并让 <code>mysql-read</code> 仅选择从库。<br> 对比如下：</p></blockquote><table><thead><tr><th>功能</th><th>只有 Headless Service</th><th>Headless + 读 Service</th></tr></thead><tbody><tr><td><strong>内部 Pod 互相发现</strong></td><td>✅ 可以</td><td>✅ 可以</td></tr><tr><td><strong>主从复制配置</strong></td><td>✅ 可以</td><td>✅ 可以</td></tr><tr><td><strong>写操作（必须主库）</strong></td><td>✅ <code>mysql-0.mysql</code></td><td>✅ <code>mysql-0.mysql</code></td></tr><tr><td><strong>读操作负载均衡</strong></td><td>❌ 需要客户端实现</td><td>✅ <code>mysql-read</code> 自动均衡</td></tr><tr><td><strong>运维管理</strong></td><td>✅ 可以单独访问</td><td>✅ 可以单独访问</td></tr></tbody></table><h3 id="_1-2-创建-mysql-configmap" tabindex="-1"><a class="header-anchor" href="#_1-2-创建-mysql-configmap"><span>1.2 创建 MySQL ConfigMap</span></a></h3><ul><li><code>vi mysql-configmap.yaml</code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">ConfigMap</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql-config</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">data</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  # 主库配置模板</span></span>
<span class="line"><span style="color:#E06C75;">  primary.cnf</span><span style="color:#ABB2BF;">: </span><span style="color:#C678DD;">|</span></span>
<span class="line"><span style="color:#98C379;">    [mysqld]</span></span>
<span class="line"><span style="color:#98C379;">    # ========== 基础配置 ==========</span></span>
<span class="line"><span style="color:#98C379;">    character-set-server=utf8mb4          # 字符集，支持emoji和中文</span></span>
<span class="line"><span style="color:#98C379;">    collation-server=utf8mb4_unicode_ci   # 排序规则，大小写不敏感</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">    # ========== 主库特有配置 ==========</span></span>
<span class="line"><span style="color:#98C379;">    log-bin=mysql-bin      # 开启二进制日志（主从复制的数据源，主库必须开启）</span></span>
<span class="line"><span style="color:#98C379;">    sync_binlog=1          # 每次事务提交都刷盘（最安全，但性能略低）</span></span>
<span class="line"><span style="color:#98C379;">    binlog_format=ROW      # 行级复制（推荐，比STATEMENT安全）</span></span>
<span class="line"><span style="color:#98C379;">    expire_logs_days=7     # 二进制日志保留7天</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">    # ========== 动态覆盖 ==========</span></span>
<span class="line"><span style="color:#98C379;">    server-id=0            # 会被 InitContainer 动态覆盖</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  # 从库配置模板</span></span>
<span class="line"><span style="color:#E06C75;">  replica.cnf</span><span style="color:#ABB2BF;">: </span><span style="color:#C678DD;">|</span></span>
<span class="line"><span style="color:#98C379;">    [mysqld]</span></span>
<span class="line"><span style="color:#98C379;">    # ========== 基础配置 ==========</span></span>
<span class="line"><span style="color:#98C379;">    character-set-server=utf8mb4</span></span>
<span class="line"><span style="color:#98C379;">    collation-server=utf8mb4_unicode_ci</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">    # ========== 从库特有配置 ==========</span></span>
<span class="line"><span style="color:#98C379;">    relay-log=mysql-relay-bin              # 中继日志（存储从主库同步来的数据）</span></span>
<span class="line"><span style="color:#98C379;">    read_only=1                            # 只读模式（防止从库被误写）</span></span>
<span class="line"><span style="color:#98C379;">    log_slave_updates=0                    # 不记录从库的更新到二进制日志</span></span>
<span class="line"><span style="color:#98C379;">    </span></span>
<span class="line"><span style="color:#98C379;">    # ========== 动态覆盖 ==========</span></span>
<span class="line"><span style="color:#98C379;">    server-id=0                            # 会被 InitContainer 动态覆盖</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>主库配置解析</li></ul><table><thead><tr><th>配置项</th><th>含义</th><th>为什么这么设置</th></tr></thead><tbody><tr><td><code>character-set-server=utf8mb4</code></td><td>字符集</td><td>支持完整的UTF-8，包括emoji</td></tr><tr><td><code>collation-server=utf8mb4_unicode_ci</code></td><td>排序规则</td><td>不区分大小写，更符合日常习惯</td></tr><tr><td><code>log-bin=mysql-bin</code></td><td><strong>二进制日志</strong></td><td>主从复制的数据源，主库必须开启</td></tr><tr><td><code>sync_binlog=1</code></td><td>同步刷盘</td><td>保证数据不丢，但每次写都要等磁盘IO</td></tr><tr><td><code>binlog_format=ROW</code></td><td>行级复制</td><td>记录每行数据的变更，最安全可靠</td></tr><tr><td><code>expire_logs_days=7</code></td><td>日志过期</td><td>自动清理7天前的日志，防止磁盘占满</td></tr></tbody></table><ul><li>从库配置解析</li></ul><table><thead><tr><th>配置项</th><th>含义</th><th>为什么这么设置</th></tr></thead><tbody><tr><td><code>relay-log=mysql-relay-bin</code></td><td><strong>中继日志</strong></td><td>从库接收主库的二进制日志后，先存到这里再回放</td></tr><tr><td><code>read_only=1</code></td><td><strong>只读模式</strong></td><td>防止应用程序误写入从库，保证主从数据一致</td></tr><tr><td><code>log_slave_updates=0</code></td><td>不级联记录</td><td>如果A→B→C链式复制，B不记录自己的变更日志，节省空间</td></tr></tbody></table><h3 id="_1-3-创建-mysql-secret" tabindex="-1"><a class="header-anchor" href="#_1-3-创建-mysql-secret"><span>1.3 创建 MySQL Secret</span></a></h3><ul><li><code>vi mysql-secret.yaml</code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Secret</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql-secret</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">type</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Opaque</span></span>
<span class="line"><span style="color:#E06C75;">data</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  # root登录密码</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  # echo -n &quot;root123&quot; | base64</span></span>
<span class="line"><span style="color:#E06C75;">  root-password</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">cm9vdDEyMw==</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  # 主从复制账号 repl 的密码</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  # echo -n &quot;repl123&quot; | base64</span></span>
<span class="line"><span style="color:#E06C75;">  repl-password</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">cmVwbDEyMw==</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-创建-mysql-statefulset" tabindex="-1"><a class="header-anchor" href="#_1-4-创建-mysql-statefulset"><span>1.4 创建 MySQL StatefulSet</span></a></h3><ul><li><code>vi mysql-StatefulSet.yaml</code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">apps/v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">StatefulSet</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  selector</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    matchLabels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">  serviceName</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span><span style="color:#7F848E;font-style:italic;">  # 关联 Headless Service</span></span>
<span class="line"><span style="color:#E06C75;">  replicas</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">3</span></span>
<span class="line"><span style="color:#E06C75;">  template</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      labels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">        app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">    spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">      # InitContainer：生成配置文件</span></span>
<span class="line"><span style="color:#E06C75;">      initContainers</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">init-mysql</span></span>
<span class="line"><span style="color:#E06C75;">        image</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql:5.7.38</span></span>
<span class="line"><span style="color:#E06C75;">        command</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#98C379;">bash</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#98C379;">&quot;-c&quot;</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#C678DD;">|</span></span>
<span class="line"><span style="color:#98C379;">          set -ex</span></span>
<span class="line"><span style="color:#98C379;">          # 1. 提取 Pod 序号</span></span>
<span class="line"><span style="color:#98C379;">          [[ $HOSTNAME =~ -([0-9]+)$ ]] || exit 1</span></span>
<span class="line"><span style="color:#98C379;">          ordinal=\${BASH_REMATCH[1]}</span></span>
<span class="line"><span style="color:#98C379;">          </span></span>
<span class="line"><span style="color:#98C379;">          # 2. 创建配置目录</span></span>
<span class="line"><span style="color:#98C379;">          mkdir -p /etc/mysql/conf.d</span></span>
<span class="line"><span style="color:#98C379;">          </span></span>
<span class="line"><span style="color:#98C379;">          # 3. 生成 server-id（基于序号）</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;[mysqld]&quot; &gt; /etc/mysql/conf.d/server-id.cnf</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;server-id=$((100 + $ordinal))&quot; &gt;&gt; /etc/mysql/conf.d/server-id.cnf</span></span>
<span class="line"><span style="color:#98C379;">          </span></span>
<span class="line"><span style="color:#98C379;">          # 4. 根据角色复制对应的配置文件</span></span>
<span class="line"><span style="color:#98C379;">          if [[ $ordinal -eq 0 ]]; then</span></span>
<span class="line"><span style="color:#98C379;">            # 主库配置</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;Configuring as MASTER (server-id=$((100 + $ordinal)))&quot;</span></span>
<span class="line"><span style="color:#98C379;">            cp /mnt/config-map/primary.cnf /etc/mysql/conf.d/</span></span>
<span class="line"><span style="color:#98C379;">          else</span></span>
<span class="line"><span style="color:#98C379;">            # 从库配置</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;Configuring as SLAVE (server-id=$((100 + $ordinal)))&quot;</span></span>
<span class="line"><span style="color:#98C379;">            cp /mnt/config-map/replica.cnf /etc/mysql/conf.d/</span></span>
<span class="line"><span style="color:#98C379;">          fi</span></span>
<span class="line"><span style="color:#98C379;">          </span></span>
<span class="line"><span style="color:#98C379;">          # 5. 查看生成的配置（调试用）</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;=== Generated config files ===&quot;</span></span>
<span class="line"><span style="color:#98C379;">          cat /etc/mysql/conf.d/*.cnf</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;==============================&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E06C75;">        volumeMounts</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">conf</span></span>
<span class="line"><span style="color:#E06C75;">          mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/etc/mysql/conf.d</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql-config</span></span>
<span class="line"><span style="color:#E06C75;">          mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/mnt/config-map</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">      # 主容器</span></span>
<span class="line"><span style="color:#E06C75;">      containers</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">        image</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql:5.7.38</span></span>
<span class="line"><span style="color:#E06C75;">        env</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        # 测试环境可：使用空密码</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        # - name: MYSQL_ALLOW_EMPTY_PASSWORD</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        #   value: &quot;1&quot;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        # 生产环境使用 Secret</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">MYSQL_ROOT_PASSWORD</span></span>
<span class="line"><span style="color:#E06C75;">          valueFrom</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            secretKeyRef</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">              name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql-secret</span></span>
<span class="line"><span style="color:#E06C75;">              key</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">root-password</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">MYSQL_ROOT_HOST</span></span>
<span class="line"><span style="color:#E06C75;">          value</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;%&quot;</span><span style="color:#7F848E;font-style:italic;">  # 允许远程连接</span></span>
<span class="line"><span style="color:#E06C75;">        ports</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">containerPort</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">3306</span></span>
<span class="line"><span style="color:#E06C75;">          name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">        volumeMounts</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">data</span></span>
<span class="line"><span style="color:#E06C75;">          mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/var/lib/mysql</span></span>
<span class="line"><span style="color:#E06C75;">          subPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">conf</span></span>
<span class="line"><span style="color:#E06C75;">          mountPath</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">/etc/mysql/conf.d</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        # 资源限制</span></span>
<span class="line"><span style="color:#E06C75;">        resources</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          requests</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            memory</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;512Mi&quot;</span></span>
<span class="line"><span style="color:#E06C75;">            cpu</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;500m&quot;</span></span>
<span class="line"><span style="color:#E06C75;">          limits</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            memory</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;1Gi&quot;</span></span>
<span class="line"><span style="color:#E06C75;">            cpu</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;1000m&quot;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        # 健康检查 - 存活探针</span></span>
<span class="line"><span style="color:#E06C75;">        livenessProbe</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          exec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            command</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">            - </span><span style="color:#98C379;">sh</span></span>
<span class="line"><span style="color:#ABB2BF;">            - </span><span style="color:#98C379;">-c</span></span>
<span class="line"><span style="color:#ABB2BF;">            - </span><span style="color:#C678DD;">|</span></span>
<span class="line"><span style="color:#98C379;">              mysqladmin ping -h 127.0.0.1 -p\${MYSQL_ROOT_PASSWORD} 2&gt;/dev/null</span></span>
<span class="line"><span style="color:#E06C75;">          initialDelaySeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">30</span></span>
<span class="line"><span style="color:#E06C75;">          periodSeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">10</span></span>
<span class="line"><span style="color:#E06C75;">          timeoutSeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">5</span></span>
<span class="line"><span style="color:#E06C75;">          failureThreshold</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">3</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        # 健康检查 - 就绪探针</span></span>
<span class="line"><span style="color:#E06C75;">        readinessProbe</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          exec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            command</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">            - </span><span style="color:#98C379;">sh</span></span>
<span class="line"><span style="color:#ABB2BF;">            - </span><span style="color:#98C379;">-c</span></span>
<span class="line"><span style="color:#ABB2BF;">            - </span><span style="color:#C678DD;">|</span></span>
<span class="line"><span style="color:#98C379;">              mysqladmin ping -h 127.0.0.1 -p\${MYSQL_ROOT_PASSWORD} 2&gt;/dev/null</span></span>
<span class="line"><span style="color:#E06C75;">          initialDelaySeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">15</span></span>
<span class="line"><span style="color:#E06C75;">          periodSeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">10</span></span>
<span class="line"><span style="color:#E06C75;">          timeoutSeconds</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">5</span></span>
<span class="line"><span style="color:#E06C75;">          failureThreshold</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">5</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">      # 配置卷挂载</span></span>
<span class="line"><span style="color:#E06C75;">      volumes</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql-config</span></span>
<span class="line"><span style="color:#E06C75;">        configMap</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql-config</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">conf</span></span>
<span class="line"><span style="color:#E06C75;">        emptyDir</span><span style="color:#ABB2BF;">: {}  </span><span style="color:#7F848E;font-style:italic;"># 临时目录，存放生成的配置</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  # PVC 模板</span></span>
<span class="line"><span style="color:#E06C75;">  volumeClaimTemplates</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">  - </span><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">data</span></span>
<span class="line"><span style="color:#E06C75;">      namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">    spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      accessModes</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&quot;ReadWriteOnce&quot;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#E06C75;">      storageClassName</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;local-path&quot;</span><span style="color:#7F848E;font-style:italic;">  # 根据你的环境修改</span></span>
<span class="line"><span style="color:#E06C75;">      resources</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">        requests</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">          storage</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">10Gi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-5-创建-mysql-主从复制初始化-job" tabindex="-1"><a class="header-anchor" href="#_1-5-创建-mysql-主从复制初始化-job"><span>1.5 创建 MySQL 主从复制初始化 Job</span></a></h3><blockquote><p><strong>温馨提示：</strong> 新增从节点时，每次都需要重新执行<code>mysql job</code>，先删除job后再运行job，job是一次性运行的；</p></blockquote><ul><li><code>vi mysql-job.yaml</code></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">batch/v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Job</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql-replication-setup</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  ttlSecondsAfterFinished</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">300</span></span>
<span class="line"><span style="color:#E06C75;">  backoffLimit</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">6</span><span style="color:#7F848E;font-style:italic;">   # 失败后最多重试 6 次，避免偶发启动时序问题</span></span>
<span class="line"><span style="color:#E06C75;">  template</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      labels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">        app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql-replication-setup</span></span>
<span class="line"><span style="color:#E06C75;">    spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      restartPolicy</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">OnFailure</span></span>
<span class="line"><span style="color:#E06C75;">      containers</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">setup-replication</span></span>
<span class="line"><span style="color:#E06C75;">        image</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql:5.7.38</span></span>
<span class="line"><span style="color:#E06C75;">        imagePullPolicy</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">IfNotPresent</span></span>
<span class="line"><span style="color:#E06C75;">        env</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">MYSQL_ROOT_PASSWORD</span></span>
<span class="line"><span style="color:#E06C75;">          valueFrom</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            secretKeyRef</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">              name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql-secret</span></span>
<span class="line"><span style="color:#E06C75;">              key</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">root-password</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">MYSQL_REPL_PASSWORD</span><span style="color:#7F848E;font-style:italic;">   # 使用专用复制账号密码，不再复用 root</span></span>
<span class="line"><span style="color:#E06C75;">          valueFrom</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            secretKeyRef</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">              name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql-secret</span></span>
<span class="line"><span style="color:#E06C75;">              key</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">repl-password</span></span>
<span class="line"><span style="color:#E06C75;">        command</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#98C379;">bash</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#98C379;">-c</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#C678DD;">|</span></span>
<span class="line"><span style="color:#98C379;">          set -euo pipefail</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          MASTER_HOST=&quot;mysql-0.mysql&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Waiting for master to be ready...&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          for i in $(seq 1 60); do</span></span>
<span class="line"><span style="color:#98C379;">            if mysql -h &quot;\${MASTER_HOST}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;SELECT 1&quot; &gt;/dev/null 2&gt;&amp;1; then</span></span>
<span class="line"><span style="color:#98C379;">              echo &quot;Master is ready&quot;</span></span>
<span class="line"><span style="color:#98C379;">              break</span></span>
<span class="line"><span style="color:#98C379;">            fi</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;Waiting for master... (\${i}/60)&quot;</span></span>
<span class="line"><span style="color:#98C379;">            sleep 5</span></span>
<span class="line"><span style="color:#98C379;">          done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          if ! mysql -h &quot;\${MASTER_HOST}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;SELECT 1&quot; &gt;/dev/null 2&gt;&amp;1; then</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;ERROR: master is not reachable&quot;</span></span>
<span class="line"><span style="color:#98C379;">            exit 1</span></span>
<span class="line"><span style="color:#98C379;">          fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Create replication user on master...&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          mysql -h &quot;\${MASTER_HOST}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;</span></span>
<span class="line"><span style="color:#98C379;">            CREATE USER IF NOT EXISTS &#39;repl&#39;@&#39;%&#39; IDENTIFIED BY &#39;\${MYSQL_REPL_PASSWORD}&#39;;</span></span>
<span class="line"><span style="color:#98C379;">            GRANT REPLICATION SLAVE ON *.* TO &#39;repl&#39;@&#39;%&#39;;</span></span>
<span class="line"><span style="color:#98C379;">            FLUSH PRIVILEGES;</span></span>
<span class="line"><span style="color:#98C379;">          &quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Getting master status...&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          master_status=$(mysql -h &quot;\${MASTER_HOST}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;SHOW MASTER STATUS\\G&quot; 2&gt;/dev/null)</span></span>
<span class="line"><span style="color:#98C379;">          master_file=$(echo &quot;\${master_status}&quot; | awk &#39;/File:/ {print $2}&#39;)</span></span>
<span class="line"><span style="color:#98C379;">          master_pos=$(echo &quot;\${master_status}&quot; | awk &#39;/Position:/ {print $2}&#39;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Master File: \${master_file}&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Master Position: \${master_pos}&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          if [ -z &quot;\${master_file}&quot; ] || [ -z &quot;\${master_pos}&quot; ]; then</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;ERROR: failed to get master status&quot;</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;\${master_status}&quot;</span></span>
<span class="line"><span style="color:#98C379;">            exit 1</span></span>
<span class="line"><span style="color:#98C379;">          fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          # 自动发现当前 mysql Headless Service 下的 Pod 数量</span></span>
<span class="line"><span style="color:#98C379;">          # 说明：</span></span>
<span class="line"><span style="color:#98C379;">          # 1. Headless Service 会返回当前所有 mysql Pod 的 A 记录</span></span>
<span class="line"><span style="color:#98C379;">          # 2. StatefulSet 的 ordinal 是连续的，所以 Pod 总数 = 当前副本数</span></span>
<span class="line"><span style="color:#98C379;">          # 3. mysql-0 固定为主库，其余 mysql-1 ~ mysql-(N-1) 视为从库</span></span>
<span class="line"><span style="color:#98C379;">          #</span></span>
<span class="line"><span style="color:#98C379;">          # 为避免 StatefulSet 启动过程中 DNS 记录还没完全收敛，这里做一个“稳定检测”：</span></span>
<span class="line"><span style="color:#98C379;">          # 连续 3 次解析到相同的 Pod 数量后，认为副本数稳定</span></span>
<span class="line"><span style="color:#98C379;">          stable_count=0</span></span>
<span class="line"><span style="color:#98C379;">          pod_count=0</span></span>
<span class="line"><span style="color:#98C379;">          last_count=0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          for i in $(seq 1 30); do</span></span>
<span class="line"><span style="color:#98C379;">            current_count=$(getent ahostsv4 mysql.mysql 2&gt;/dev/null | awk &#39;{print $1}&#39; | sort -u | wc -l | tr -d &#39; &#39;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">            # 防御空值</span></span>
<span class="line"><span style="color:#98C379;">            if [ -z &quot;\${current_count}&quot; ]; then</span></span>
<span class="line"><span style="color:#98C379;">              current_count=0</span></span>
<span class="line"><span style="color:#98C379;">            fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">            if [ &quot;\${current_count}&quot; -gt 0 ] &amp;&amp; [ &quot;\${current_count}&quot; = &quot;\${last_count}&quot; ]; then</span></span>
<span class="line"><span style="color:#98C379;">              stable_count=$((stable_count + 1))</span></span>
<span class="line"><span style="color:#98C379;">            else</span></span>
<span class="line"><span style="color:#98C379;">              stable_count=1</span></span>
<span class="line"><span style="color:#98C379;">              last_count=&quot;\${current_count}&quot;</span></span>
<span class="line"><span style="color:#98C379;">            fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">            if [ &quot;\${stable_count}&quot; -ge 3 ]; then</span></span>
<span class="line"><span style="color:#98C379;">              pod_count=&quot;\${current_count}&quot;</span></span>
<span class="line"><span style="color:#98C379;">              break</span></span>
<span class="line"><span style="color:#98C379;">            fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">            sleep 2</span></span>
<span class="line"><span style="color:#98C379;">          done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          # 最终兜底</span></span>
<span class="line"><span style="color:#98C379;">          if [ &quot;\${pod_count}&quot; -le 1 ]; then</span></span>
<span class="line"><span style="color:#98C379;">            pod_count=$(getent ahostsv4 mysql.mysql 2&gt;/dev/null | awk &#39;{print $1}&#39; | sort -u | wc -l | tr -d &#39; &#39;)</span></span>
<span class="line"><span style="color:#98C379;">          fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          # 如果最终只有 1 个 Pod，说明当前没有从库</span></span>
<span class="line"><span style="color:#98C379;">          if [ -z &quot;\${pod_count}&quot; ] || [ &quot;\${pod_count}&quot; -le 1 ]; then</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;===================================&quot;</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;Replication setup completed!&quot;</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;Master: \${MASTER_HOST}&quot;</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;Slaves:&quot;</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;===================================&quot;</span></span>
<span class="line"><span style="color:#98C379;">            exit 0</span></span>
<span class="line"><span style="color:#98C379;">          fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          # 根据自动发现到的 Pod 总数，推导所有从库名称</span></span>
<span class="line"><span style="color:#98C379;">          # 例如 pod_count=8，则从库为 mysql-1.mysql ~ mysql-7.mysql</span></span>
<span class="line"><span style="color:#98C379;">          for ordinal in $(seq 1 $((pod_count - 1))); do</span></span>
<span class="line"><span style="color:#98C379;">            slave=&quot;mysql-\${ordinal}.mysql&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">            echo &quot;===================================&quot;</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;Setting up slave: \${slave}&quot;</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;===================================&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">            for i in $(seq 1 60); do</span></span>
<span class="line"><span style="color:#98C379;">              if mysql -h &quot;\${slave}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;SELECT 1&quot; &gt;/dev/null 2&gt;&amp;1; then</span></span>
<span class="line"><span style="color:#98C379;">                echo &quot;Slave \${slave} is ready&quot;</span></span>
<span class="line"><span style="color:#98C379;">                break</span></span>
<span class="line"><span style="color:#98C379;">              fi</span></span>
<span class="line"><span style="color:#98C379;">              echo &quot;Waiting for \${slave}... (\${i}/60)&quot;</span></span>
<span class="line"><span style="color:#98C379;">              sleep 5</span></span>
<span class="line"><span style="color:#98C379;">            done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">            if ! mysql -h &quot;\${slave}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;SELECT 1&quot; &gt;/dev/null 2&gt;&amp;1; then</span></span>
<span class="line"><span style="color:#98C379;">              echo &quot;ERROR: slave \${slave} is not reachable&quot;</span></span>
<span class="line"><span style="color:#98C379;">              exit 1</span></span>
<span class="line"><span style="color:#98C379;">            fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">            mysql -h &quot;\${slave}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;</span></span>
<span class="line"><span style="color:#98C379;">              STOP SLAVE;</span></span>
<span class="line"><span style="color:#98C379;">              RESET SLAVE ALL;</span></span>
<span class="line"><span style="color:#98C379;">              CHANGE MASTER TO</span></span>
<span class="line"><span style="color:#98C379;">                MASTER_HOST=&#39;\${MASTER_HOST}&#39;,</span></span>
<span class="line"><span style="color:#98C379;">                MASTER_USER=&#39;repl&#39;,</span></span>
<span class="line"><span style="color:#98C379;">                MASTER_PASSWORD=&#39;\${MYSQL_REPL_PASSWORD}&#39;,</span></span>
<span class="line"><span style="color:#98C379;">                MASTER_LOG_FILE=&#39;\${master_file}&#39;,</span></span>
<span class="line"><span style="color:#98C379;">                MASTER_LOG_POS=\${master_pos},</span></span>
<span class="line"><span style="color:#98C379;">                MASTER_CONNECT_RETRY=10;</span></span>
<span class="line"><span style="color:#98C379;">              START SLAVE;</span></span>
<span class="line"><span style="color:#98C379;">            &quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">            echo &quot;Checking slave status: \${slave}&quot;</span></span>
<span class="line"><span style="color:#98C379;">            slave_status=$(mysql -h &quot;\${slave}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;SHOW SLAVE STATUS\\G&quot; 2&gt;/dev/null)</span></span>
<span class="line"><span style="color:#98C379;">            slave_io=$(echo &quot;\${slave_status}&quot; | awk &#39;/Slave_IO_Running:/ {print $2}&#39;)</span></span>
<span class="line"><span style="color:#98C379;">            slave_sql=$(echo &quot;\${slave_status}&quot; | awk &#39;/Slave_SQL_Running:/ {print $2}&#39;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">            if [ &quot;\${slave_io}&quot; = &quot;Yes&quot; ] &amp;&amp; [ &quot;\${slave_sql}&quot; = &quot;Yes&quot; ]; then</span></span>
<span class="line"><span style="color:#98C379;">              echo &quot;OK: \${slave} replication is RUNNING&quot;</span></span>
<span class="line"><span style="color:#98C379;">            else</span></span>
<span class="line"><span style="color:#98C379;">              echo &quot;ERROR: \${slave} replication FAILED&quot;</span></span>
<span class="line"><span style="color:#98C379;">              echo &quot;\${slave_status}&quot;</span></span>
<span class="line"><span style="color:#98C379;">              exit 1</span></span>
<span class="line"><span style="color:#98C379;">            fi</span></span>
<span class="line"><span style="color:#98C379;">          done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          # 新增：生成从库列表用于最终输出，保持你原来的输出格式</span></span>
<span class="line"><span style="color:#98C379;">          SLAVES=$(for ordinal in $(seq 1 $((pod_count - 1))); do printf &quot;mysql-%s.mysql &quot; &quot;\${ordinal}&quot;; done | sed &#39;s/[[:space:]]*$//&#39;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Replication setup completed!&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Master: \${MASTER_HOST}&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Slaves: \${SLAVES}&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、部署-mysql-主从集群" tabindex="-1"><a class="header-anchor" href="#二、部署-mysql-主从集群"><span>二、部署 MySQL 主从集群</span></a></h2><h3 id="_2-1-创建-mysql-命名空间" tabindex="-1"><a class="header-anchor" href="#_2-1-创建-mysql-命名空间"><span>2.1 创建 MySQL 命名空间</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> create</span><span style="color:#98C379;"> ns</span><span style="color:#98C379;"> mysql</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_2-2-部署-mysql-的svc" tabindex="-1"><a class="header-anchor" href="#_2-2-部署-mysql-的svc"><span>2.2 部署 MySQL 的svc</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 创建并部署mysql-svc网络</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> mysql-svc.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看svc资源</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> svc</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434696.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-3-部署-mysql-配置文件" tabindex="-1"><a class="header-anchor" href="#_2-3-部署-mysql-配置文件"><span>2.3 部署 MySQL 配置文件</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 部署并创建mysql配置文件</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> mysql-configmap.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看配置文件是否部署成功</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> cm</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434502.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-4-部署-mysql-密码" tabindex="-1"><a class="header-anchor" href="#_2-4-部署-mysql-密码"><span>2.4 部署 MySQL 密码</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 创建并部署mysql密码</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> mysql-secret.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看mysql的secret是否创建成功</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> secret</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434720.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-5-部署-mysql-集群" tabindex="-1"><a class="header-anchor" href="#_2-5-部署-mysql-集群"><span>2.5 部署 MySQL 集群</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 创建并部署mysql集群</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> mysql-StatefulSet.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看sts，确认mysql是否运行</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> sts</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span><span style="color:#D19A66;"> -o</span><span style="color:#98C379;"> wide</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看pvc，查看是否成功挂载mysql pod</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> pvc</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span><span style="color:#D19A66;"> -o</span><span style="color:#98C379;"> wide</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看mysql pod是否创建成功</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> pods</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span><span style="color:#D19A66;"> -o</span><span style="color:#98C379;"> wide</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>执行创建部署之后，首次部署时需要等待一段时间，具体取决于镜像拉取速度、节点资源和存储挂载速度。一般正常需要等待5-10分钟左右才会所有创建成功；<br> 如果5-10分钟一个都没创建成功，可使用<code>kubectl describe pod -n mysql mysql-0</code>命令查看创建pod过程是否有报错，如果没报错还是没起来，可以在使用<code>kubectl logs -n mysql mysql-0 -f</code>命令查看服务日志，是否报错；</p></blockquote><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434691.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-6-部署-mysql-主从复制初始化-job" tabindex="-1"><a class="header-anchor" href="#_2-6-部署-mysql-主从复制初始化-job"><span>2.6 部署 MySQL 主从复制初始化 Job</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#7F848E;font-style:italic;"># 部署 MySQL 主从复制初始化 Job 并检测是否生效</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> apply</span><span style="color:#D19A66;"> -f</span><span style="color:#98C379;"> mysql-job.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看job是否正常(COMPLETIONS状态为1/1正常)</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> job</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看对应的 Pod 是否执行完成（Pod 的 STATUS 为 Completed 表示脚本执行结束）</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> get</span><span style="color:#98C379;"> pods</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 正常返回应该是：mysql-replication-setup-xxxxx   0/1   Completed</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 如果STATUS是其他的，例如：Error / CrashLoopBackOff：说明脚本失败了、Running 很久不结束：说明卡在等待主库或从库</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看pod是否有有异常，看最后的Events就行</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> describe</span><span style="color:#98C379;"> pods</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span><span style="color:#98C379;"> mysql-replication-setup-64p4x</span><span style="color:#ABB2BF;"> | </span><span style="color:#61AFEF;">grep</span><span style="color:#D19A66;"> -iA20</span><span style="color:#98C379;"> Events</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看日志是否有报错</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> logs</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span><span style="color:#98C379;"> job/mysql-replication-setup</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434282.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>mysql 日志返回正常解析：</p><ul><li>主库已就绪可连接：<code>Master is ready</code></li><li>成功创建复制用户：<code>Create replication user on master...</code></li><li>成功拿到主库日志名称及位置：<code>Master File: mysql-bin.000003</code>、<code>Master Position: 1352</code></li><li><code>mysql-1</code> 主从复制启动成功：<code>replication is RUNNING</code></li><li><code>mysql-2</code> 主从复制启动成功：<code>replication is RUNNING</code></li><li>Job 正常结束：<code>Replication setup completed!</code></li></ul><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434461.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="三、验证主从复制是否生效" tabindex="-1"><a class="header-anchor" href="#三、验证主从复制是否生效"><span>三、验证主从复制是否生效</span></a></h2><h3 id="_3-1-检查主库-binlog-状态" tabindex="-1"><a class="header-anchor" href="#_3-1-检查主库-binlog-状态"><span>3.1 检查主库 binlog 状态</span></a></h3><ul><li>查看主库 binlog 是否开启</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> exec</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span><span style="color:#98C379;"> mysql-0</span><span style="color:#D19A66;"> --</span><span style="color:#98C379;"> mysql</span><span style="color:#D19A66;"> -uroot</span><span style="color:#D19A66;"> -proot123</span><span style="color:#D19A66;"> -e</span><span style="color:#98C379;"> &quot;SHOW MASTER STATUS\\G&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>如图：可以看到<code>File: mysql-bin.00000x</code>和<code>Position: xxx</code>的就是开启状态；如果没有结果，说明主库 binlog 没开或没开好。</p><figure><img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202604231434522.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_3-2-检查从库复制状态" tabindex="-1"><a class="header-anchor" href="#_3-2-检查从库复制状态"><span>3.2 检查从库复制状态</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> exec</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span><span style="color:#98C379;"> mysql-1</span><span style="color:#D19A66;"> --</span><span style="color:#98C379;"> mysql</span><span style="color:#D19A66;"> -uroot</span><span style="color:#D19A66;"> -proot123</span><span style="color:#D19A66;"> -e</span><span style="color:#98C379;"> &quot;SHOW SLAVE STATUS\\G&quot;</span><span style="color:#ABB2BF;"> | </span><span style="color:#61AFEF;">egrep</span><span style="color:#98C379;"> &quot;Slave_IO_Running\\:|Slave_SQL_Running\\:&quot;</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> exec</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span><span style="color:#98C379;"> mysql-2</span><span style="color:#D19A66;"> --</span><span style="color:#98C379;"> mysql</span><span style="color:#D19A66;"> -uroot</span><span style="color:#D19A66;"> -proot123</span><span style="color:#D19A66;"> -e</span><span style="color:#98C379;"> &quot;SHOW SLAVE STATUS\\G&quot;</span><span style="color:#ABB2BF;"> | </span><span style="color:#61AFEF;">egrep</span><span style="color:#98C379;"> &quot;Slave_IO_Running\\:|Slave_SQL_Running\\:&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>重点看这两行是不是都是<code>Yes</code>，如果是<code>Yes</code>就没问题；</p><div class="language-text line-numbers-mode" data-highlighter="shiki" data-ext="text" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-text"><span class="line"><span>Slave_IO_Running: Yes</span></span>
<span class="line"><span>Slave_SQL_Running: Yes</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-写入数据验证同步" tabindex="-1"><a class="header-anchor" href="#_3-3-写入数据验证同步"><span>3.3 写入数据验证同步</span></a></h3><p>进入主库数据库：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> exec</span><span style="color:#D19A66;"> -it</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span><span style="color:#98C379;"> mysql-0</span><span style="color:#D19A66;"> --</span><span style="color:#98C379;"> mysql</span><span style="color:#D19A66;"> -uroot</span><span style="color:#D19A66;"> -proot123</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>执行sql，在主库插入一条数据：</p><div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-sql"><span class="line"><span style="color:#7F848E;font-style:italic;">-- 创建test数据库</span></span>
<span class="line"><span style="color:#C678DD;">CREATE</span><span style="color:#C678DD;"> DATABASE</span><span style="color:#61AFEF;"> IF</span><span style="color:#C678DD;"> NOT</span><span style="color:#C678DD;"> EXISTS</span><span style="color:#ABB2BF;"> test;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">-- 进入test库</span></span>
<span class="line"><span style="color:#C678DD;">USE</span><span style="color:#ABB2BF;"> test;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">-- 创建t1表</span></span>
<span class="line"><span style="color:#C678DD;">CREATE</span><span style="color:#C678DD;"> TABLE</span><span style="color:#61AFEF;"> IF</span><span style="color:#C678DD;"> NOT</span><span style="color:#C678DD;"> EXISTS</span><span style="color:#ABB2BF;"> t1 (id </span><span style="color:#C678DD;">INT</span><span style="color:#C678DD;"> PRIMARY KEY</span><span style="color:#ABB2BF;"> AUTO_INCREMENT, </span><span style="color:#C678DD;">name</span><span style="color:#C678DD;"> VARCHAR</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">50</span><span style="color:#ABB2BF;">));</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">-- 再t1表中插入内容</span></span>
<span class="line"><span style="color:#C678DD;">INSERT INTO</span><span style="color:#ABB2BF;"> t1(</span><span style="color:#C678DD;">name</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">VALUES</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;hello&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">-- 查看t1表中的所有内容</span></span>
<span class="line"><span style="color:#C678DD;">SELECT</span><span style="color:#ABB2BF;"> * </span><span style="color:#C678DD;">FROM</span><span style="color:#ABB2BF;"> t1;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后到从库查：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> exec</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span><span style="color:#98C379;"> mysql-1</span><span style="color:#D19A66;"> --</span><span style="color:#98C379;"> mysql</span><span style="color:#D19A66;"> -uroot</span><span style="color:#D19A66;"> -proot123</span><span style="color:#D19A66;"> -e</span><span style="color:#98C379;"> &quot;SELECT * FROM test.t1;&quot;</span></span>
<span class="line"><span style="color:#61AFEF;">kubectl</span><span style="color:#98C379;"> exec</span><span style="color:#D19A66;"> -n</span><span style="color:#98C379;"> mysql</span><span style="color:#98C379;"> mysql-2</span><span style="color:#D19A66;"> --</span><span style="color:#98C379;"> mysql</span><span style="color:#D19A66;"> -uroot</span><span style="color:#D19A66;"> -proot123</span><span style="color:#D19A66;"> -e</span><span style="color:#98C379;"> &quot;SELECT * FROM test.t1;&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果两个从库都能查询到 <code>hello</code>，说明主从复制链路工作正常；</p><h2 id="四、总结" tabindex="-1"><a class="header-anchor" href="#四、总结"><span>四、总结</span></a></h2><blockquote><p>本文的主从初复制适用于全新部署的一主多从场景。<br> 如果主库中已经存在业务数据，或者从库需要基于已有数据恢复，建议结合备份恢复、<code>mysqldump</code> 或 <code>xtrabackup</code> 等方式先对齐数据基线，再配置复制位点。<br> 新增从节点时，每次都需要重新执行<code>mysql job</code>，先删除job后再运行job，job是一次性运行的；</p></blockquote><h2 id="五、附加-初-mysql-job-一主两从固定主从复制yaml" tabindex="-1"><a class="header-anchor" href="#五、附加-初-mysql-job-一主两从固定主从复制yaml"><span>五、附加（初）：mysql job 一主两从固定主从复制yaml</span></a></h2><blockquote><p>这个是写死的mysql-0是主，mysql-1、mysql-2是从；<br> 上面的脚本是根据从来获取的，不是固定的；<br> 两个都可以用，任选其一，不管是哪个，再新增从的时候都需要重新删除job，并重新执行；</p></blockquote><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-yaml"><span class="line"><span style="color:#E06C75;">apiVersion</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">batch/v1</span></span>
<span class="line"><span style="color:#E06C75;">kind</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">Job</span></span>
<span class="line"><span style="color:#E06C75;">metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql-replication-setup</span></span>
<span class="line"><span style="color:#E06C75;">  namespace</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql</span></span>
<span class="line"><span style="color:#E06C75;">spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">  ttlSecondsAfterFinished</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">300</span></span>
<span class="line"><span style="color:#E06C75;">  backoffLimit</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">6</span></span>
<span class="line"><span style="color:#E06C75;">  template</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">    metadata</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      labels</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">        app</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql-replication-setup</span></span>
<span class="line"><span style="color:#E06C75;">    spec</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      restartPolicy</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">OnFailure</span></span>
<span class="line"><span style="color:#E06C75;">      containers</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">      - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">setup-replication</span></span>
<span class="line"><span style="color:#E06C75;">        image</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql:5.7.38</span></span>
<span class="line"><span style="color:#E06C75;">        imagePullPolicy</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">IfNotPresent</span></span>
<span class="line"><span style="color:#E06C75;">        env</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">MYSQL_ROOT_PASSWORD</span></span>
<span class="line"><span style="color:#E06C75;">          valueFrom</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            secretKeyRef</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">              name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql-secret</span></span>
<span class="line"><span style="color:#E06C75;">              key</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">root-password</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">MYSQL_REPL_PASSWORD</span></span>
<span class="line"><span style="color:#E06C75;">          valueFrom</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">            secretKeyRef</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">              name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">mysql-secret</span></span>
<span class="line"><span style="color:#E06C75;">              key</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">repl-password</span></span>
<span class="line"><span style="color:#E06C75;">        command</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#98C379;">bash</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#98C379;">-c</span></span>
<span class="line"><span style="color:#ABB2BF;">        - </span><span style="color:#C678DD;">|</span></span>
<span class="line"><span style="color:#98C379;">          set -euo pipefail</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          MASTER_HOST=&quot;mysql-0.mysql&quot;</span></span>
<span class="line"><span style="color:#98C379;">          SLAVES=&quot;mysql-1.mysql mysql-2.mysql&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Waiting for master to be ready...&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          for i in $(seq 1 60); do</span></span>
<span class="line"><span style="color:#98C379;">            if mysql -h &quot;\${MASTER_HOST}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;SELECT 1&quot; &gt;/dev/null 2&gt;&amp;1; then</span></span>
<span class="line"><span style="color:#98C379;">              echo &quot;Master is ready&quot;</span></span>
<span class="line"><span style="color:#98C379;">              break</span></span>
<span class="line"><span style="color:#98C379;">            fi</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;Waiting for master... (\${i}/60)&quot;</span></span>
<span class="line"><span style="color:#98C379;">            sleep 5</span></span>
<span class="line"><span style="color:#98C379;">          done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          if ! mysql -h &quot;\${MASTER_HOST}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;SELECT 1&quot; &gt;/dev/null 2&gt;&amp;1; then</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;ERROR: master is not reachable&quot;</span></span>
<span class="line"><span style="color:#98C379;">            exit 1</span></span>
<span class="line"><span style="color:#98C379;">          fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Create replication user on master...&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          mysql -h &quot;\${MASTER_HOST}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;</span></span>
<span class="line"><span style="color:#98C379;">            CREATE USER IF NOT EXISTS &#39;repl&#39;@&#39;%&#39; IDENTIFIED BY &#39;\${MYSQL_REPL_PASSWORD}&#39;;</span></span>
<span class="line"><span style="color:#98C379;">            GRANT REPLICATION SLAVE ON *.* TO &#39;repl&#39;@&#39;%&#39;;</span></span>
<span class="line"><span style="color:#98C379;">            FLUSH PRIVILEGES;</span></span>
<span class="line"><span style="color:#98C379;">          &quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Getting master status...&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          master_status=$(mysql -h &quot;\${MASTER_HOST}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;SHOW MASTER STATUS\\G&quot; 2&gt;/dev/null)</span></span>
<span class="line"><span style="color:#98C379;">          master_file=$(echo &quot;\${master_status}&quot; | awk &#39;/File:/ {print $2}&#39;)</span></span>
<span class="line"><span style="color:#98C379;">          master_pos=$(echo &quot;\${master_status}&quot; | awk &#39;/Position:/ {print $2}&#39;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Master File: \${master_file}&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Master Position: \${master_pos}&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          if [ -z &quot;\${master_file}&quot; ] || [ -z &quot;\${master_pos}&quot; ]; then</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;ERROR: failed to get master status&quot;</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;\${master_status}&quot;</span></span>
<span class="line"><span style="color:#98C379;">            exit 1</span></span>
<span class="line"><span style="color:#98C379;">          fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          for slave in \${SLAVES}; do</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;===================================&quot;</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;Setting up slave: \${slave}&quot;</span></span>
<span class="line"><span style="color:#98C379;">            echo &quot;===================================&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">            for i in $(seq 1 60); do</span></span>
<span class="line"><span style="color:#98C379;">              if mysql -h &quot;\${slave}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;SELECT 1&quot; &gt;/dev/null 2&gt;&amp;1; then</span></span>
<span class="line"><span style="color:#98C379;">                echo &quot;Slave \${slave} is ready&quot;</span></span>
<span class="line"><span style="color:#98C379;">                break</span></span>
<span class="line"><span style="color:#98C379;">              fi</span></span>
<span class="line"><span style="color:#98C379;">              echo &quot;Waiting for \${slave}... (\${i}/60)&quot;</span></span>
<span class="line"><span style="color:#98C379;">              sleep 5</span></span>
<span class="line"><span style="color:#98C379;">            done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">            if ! mysql -h &quot;\${slave}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;SELECT 1&quot; &gt;/dev/null 2&gt;&amp;1; then</span></span>
<span class="line"><span style="color:#98C379;">              echo &quot;ERROR: slave \${slave} is not reachable&quot;</span></span>
<span class="line"><span style="color:#98C379;">              exit 1</span></span>
<span class="line"><span style="color:#98C379;">            fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">            mysql -h &quot;\${slave}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;</span></span>
<span class="line"><span style="color:#98C379;">              STOP SLAVE;</span></span>
<span class="line"><span style="color:#98C379;">              RESET SLAVE ALL;</span></span>
<span class="line"><span style="color:#98C379;">              CHANGE MASTER TO</span></span>
<span class="line"><span style="color:#98C379;">                MASTER_HOST=&#39;\${MASTER_HOST}&#39;,</span></span>
<span class="line"><span style="color:#98C379;">                MASTER_USER=&#39;repl&#39;,</span></span>
<span class="line"><span style="color:#98C379;">                MASTER_PASSWORD=&#39;\${MYSQL_REPL_PASSWORD}&#39;,</span></span>
<span class="line"><span style="color:#98C379;">                MASTER_LOG_FILE=&#39;\${master_file}&#39;,</span></span>
<span class="line"><span style="color:#98C379;">                MASTER_LOG_POS=\${master_pos},</span></span>
<span class="line"><span style="color:#98C379;">                MASTER_CONNECT_RETRY=10;</span></span>
<span class="line"><span style="color:#98C379;">              START SLAVE;</span></span>
<span class="line"><span style="color:#98C379;">            &quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">            echo &quot;Checking slave status: \${slave}&quot;</span></span>
<span class="line"><span style="color:#98C379;">            slave_status=$(mysql -h &quot;\${slave}&quot; -uroot -p&quot;\${MYSQL_ROOT_PASSWORD}&quot; -e &quot;SHOW SLAVE STATUS\\G&quot; 2&gt;/dev/null)</span></span>
<span class="line"><span style="color:#98C379;">            slave_io=$(echo &quot;\${slave_status}&quot; | awk &#39;/Slave_IO_Running:/ {print $2}&#39;)</span></span>
<span class="line"><span style="color:#98C379;">            slave_sql=$(echo &quot;\${slave_status}&quot; | awk &#39;/Slave_SQL_Running:/ {print $2}&#39;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">            if [ &quot;\${slave_io}&quot; = &quot;Yes&quot; ] &amp;&amp; [ &quot;\${slave_sql}&quot; = &quot;Yes&quot; ]; then</span></span>
<span class="line"><span style="color:#98C379;">              echo &quot;OK: \${slave} replication is RUNNING&quot;</span></span>
<span class="line"><span style="color:#98C379;">            else</span></span>
<span class="line"><span style="color:#98C379;">              echo &quot;ERROR: \${slave} replication FAILED&quot;</span></span>
<span class="line"><span style="color:#98C379;">              echo &quot;\${slave_status}&quot;</span></span>
<span class="line"><span style="color:#98C379;">              exit 1</span></span>
<span class="line"><span style="color:#98C379;">            fi</span></span>
<span class="line"><span style="color:#98C379;">          done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Replication setup completed!&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Master: \${MASTER_HOST}&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;Slaves: \${SLAVES}&quot;</span></span>
<span class="line"><span style="color:#98C379;">          echo &quot;===================================&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,71)]])}var s=n(a,[[`render`,o]]);export{i as _pageData,s as default};