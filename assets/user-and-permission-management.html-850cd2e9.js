import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as i,c as n,a as e,b as a,d as r,e as c}from"./app-8d307529.js";const o={},u={class:"hint-container tip"},m=e("p",{class:"hint-container-title"},"友情提示",-1),t=e("strong",null,"转载须知",-1),v={href:"https://www.bilibili.com/video/BV1iq4y1u7vj?p=1&vd_source=cea816a08805c218ac4390ae9b61ae31",target:"_blank",rel:"noopener noreferrer"},h=c(`<h2 id="_1-用户管理" tabindex="-1"><a class="header-anchor" href="#_1-用户管理" aria-hidden="true">#</a> 1. 用户管理</h2><h3 id="_1-1-登录mysql服务器" tabindex="-1"><a class="header-anchor" href="#_1-1-登录mysql服务器" aria-hidden="true">#</a> 1.1 登录MySQL服务器</h3><p>启动MySQL服务后，可以通过mysql命令来登录MySQL服务器，命令如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql –h hostname|hostIP –P port –u username –p DatabaseName –e &quot;SQL语句&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>-h参数</code>后面接主机名或者主机IP，hostname为主机，hostIP为主机IP。</li><li><code>-P参数</code>后面接MySQL服务的端口，通过该参数连接到指定的端口。MySQL服务的默认端口是3306，不使用该参数时自动连接到3306端口，port为连接的端口号。</li><li><code>-u参数</code>后面接用户名，username为用户名。</li><li><code>-p参数</code>会提示输入密码。</li><li><code>DatabaseName参数</code>指明登录到哪一个数据库中。如果没有该参数，就会直接登录到MySQL数据库中，然后可以使用USE命令来选择数据库。</li><li><code>-e参数</code>后面可以直接加SQL语句。登录MySQL服务器以后即可执行这个SQL语句，然后退出MySQL服务器。</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql -uroot -p -hlocalhost -P3306 mysql -e &quot;select host,user from user&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-2-创建用户" tabindex="-1"><a class="header-anchor" href="#_1-2-创建用户" aria-hidden="true">#</a> 1.2 创建用户</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE USER 用户名 [IDENTIFIED BY &#39;密码&#39;][,用户名 [IDENTIFIED BY &#39;密码&#39;]];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE USER zhang3 IDENTIFIED BY &#39;123123&#39;; # 默认host是 %
CREATE USER &#39;kangshifu&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;123456&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-修改用户" tabindex="-1"><a class="header-anchor" href="#_1-3-修改用户" aria-hidden="true">#</a> 1.3 修改用户</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>UPDATE mysql.user SET USER=&#39;li4&#39; WHERE USER=&#39;wang5&#39;; 
FLUSH PRIVILEGES;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-删除用户" tabindex="-1"><a class="header-anchor" href="#_1-4-删除用户" aria-hidden="true">#</a> 1.4 删除用户</h3><p><strong>方式1：使用DROP方式删除（推荐）</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP USER user[,user]…;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP USER li4 ; # 默认删除host为%的用户
DROP USER &#39;kangshifu&#39;@&#39;localhost&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方式2：使用DELETE方式删除（不推荐，有残留信息）</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELETE FROM mysql.user WHERE Host=’hostname’ AND User=’username’;
FLUSH PRIVILEGES;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-5-设置当前用户密码" tabindex="-1"><a class="header-anchor" href="#_1-5-设置当前用户密码" aria-hidden="true">#</a> 1.5 设置当前用户密码</h3><p><strong>1.</strong> <strong>使用ALTER USER命令来修改当前用户密码</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER USER USER() IDENTIFIED BY &#39;new_password&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>2.</strong> <strong>使用SET语句来修改当前用户密码</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET PASSWORD=&#39;new_password&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-6-修改其它用户密码" tabindex="-1"><a class="header-anchor" href="#_1-6-修改其它用户密码" aria-hidden="true">#</a> 1.6 修改其它用户密码</h3><p><strong>1.</strong> <strong>使用ALTER语句来修改普通用户的密码</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER USER user [IDENTIFIED BY &#39;新密码&#39;] 
[,user[IDENTIFIED BY &#39;新密码&#39;]]…;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2.</strong> <strong>使用SET命令来修改普通用户的密码</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET PASSWORD FOR &#39;username&#39;@&#39;hostname&#39;=&#39;new_password&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-权限管理" tabindex="-1"><a class="header-anchor" href="#_2-权限管理" aria-hidden="true">#</a> 2. 权限管理</h2><h3 id="_2-1-权限列表" tabindex="-1"><a class="header-anchor" href="#_2-1-权限列表" aria-hidden="true">#</a> 2.1 权限列表</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>show privileges;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>CREATE和DROP权限</code>，可以创建新的数据库和表，或删除（移掉）已有的数据库和表。如果将MySQL数据库中的DROP权限授予某用户，用户就可以删除MySQL访问权限保存的数据库。</li><li><code>SELECT、INSERT、UPDATE和DELETE权限</code>允许在一个数据库现有的表上实施操作。</li><li><code>SELECT权限</code>只有在它们真正从一个表中检索行时才被用到。</li><li><code>INDEX权限</code>允许创建或删除索引，INDEX适用于已有的表。如果具有某个表的CREATE权限，就可以在CREATE TABLE语句中包括索引定义。</li><li><code>ALTER权限</code>可以使用ALTER TABLE来更改表的结构和重新命名表。</li><li><code>CREATE ROUTINE权限</code>用来创建保存的程序（函数和程序），<code>ALTER ROUTINE权限</code>用来更改和删除保存的程序，<code>EXECUTE权限</code>用来执行保存的程序。</li><li><code>GRANT权限</code>允许授权给其他用户，可用于数据库、表和保存的程序。</li><li><code>FILE权限</code>使用户可以使用LOAD DATA INFILE和SELECT ... INTO OUTFILE语句读或写服务器上的文件，任何被授予FILE权限的用户都能读或写MySQL服务器上的任何文件（说明用户可以读任何数据库目录下的文件，因为服务器可以访问这些文件）。</li></ul><h3 id="_2-2-授予权限的原则" tabindex="-1"><a class="header-anchor" href="#_2-2-授予权限的原则" aria-hidden="true">#</a> 2.2 授予权限的原则</h3><p>权限控制主要是出于安全因素，因此需要遵循以下几个<code>经验原则</code>：</p><p>1、只授予能<code>满足需要的最小权限</code>，防止用户干坏事。比如用户只是需要查询，那就只给select权限就可以了，不要给用户赋予update、insert或者delete权限。</p><p>2、创建用户的时候<code>限制用户的登录主机</code>，一般是限制成指定IP或者内网IP段。</p><p>3、为每个用户<code>设置满足密码复杂度的密码</code>。</p><p>4、<code>定期清理不需要的用户</code>，回收权限或者删除用户。</p><h3 id="_2-3-授予权限" tabindex="-1"><a class="header-anchor" href="#_2-3-授予权限" aria-hidden="true">#</a> 2.3 授予权限</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>GRANT 权限1,权限2,…权限n ON 数据库名称.表名称 TO 用户名@用户地址 [IDENTIFIED BY ‘密码口令’];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>该权限如果发现没有该用户，则会直接新建一个用户。</li><li>给li4用户用本地命令行方式，授予atguigudb这个库下的所有表的插删改查的权限。</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>GRANT SELECT,INSERT,DELETE,UPDATE ON atguigudb.* TO li4@localhost;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>授予通过网络方式登录的joe用户 ，对所有库所有表的全部权限，密码设为123。注意这里唯独不包括grant的权限</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>GRANT ALL PRIVILEGES ON *.* TO joe@&#39;%&#39; IDENTIFIED BY &#39;123&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-4-查看权限" tabindex="-1"><a class="header-anchor" href="#_2-4-查看权限" aria-hidden="true">#</a> 2.4 查看权限</h3><ul><li>查看当前用户权限</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW GRANTS; 
# 或 
SHOW GRANTS FOR CURRENT_USER; 
# 或 
SHOW GRANTS FOR CURRENT_USER();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>查看某用户的全局权限</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW GRANTS FOR &#39;user&#39;@&#39;主机地址&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-5-收回权限" tabindex="-1"><a class="header-anchor" href="#_2-5-收回权限" aria-hidden="true">#</a> 2.5 收回权限</h3><p><strong>注意：在将用户账户从user表删除之前，应该收回相应用户的所有权限。</strong></p><ul><li>收回权限命令</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>REVOKE 权限1,权限2,…权限n ON 数据库名称.表名称 FROM 用户名@用户地址;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>举例</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#收回全库全表的所有权限 
REVOKE ALL PRIVILEGES ON *.* FROM joe@&#39;%&#39;; 
#收回mysql库下的所有表的插删改查权限 
REVOKE SELECT,INSERT,UPDATE,DELETE ON mysql.* FROM joe@localhost;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>注意：<code>须用户重新登录后才能生效</code></li></ul><h2 id="_3-角色管理" tabindex="-1"><a class="header-anchor" href="#_3-角色管理" aria-hidden="true">#</a> 3. 角色管理</h2><h3 id="_3-1-创建角色" tabindex="-1"><a class="header-anchor" href="#_3-1-创建角色" aria-hidden="true">#</a> 3.1 创建角色</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE ROLE &#39;role_name&#39;[@&#39;host_name&#39;] [,&#39;role_name&#39;[@&#39;host_name&#39;]]...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>角色名称的命名规则和用户名类似。如果<code>host_name省略，默认为%</code>，<code>role_name不可省略</code>，不可为空。</p><h3 id="_3-2-给角色赋予权限" tabindex="-1"><a class="header-anchor" href="#_3-2-给角色赋予权限" aria-hidden="true">#</a> 3.2 给角色赋予权限</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>GRANT privileges ON table_name TO &#39;role_name&#39;[@&#39;host_name&#39;];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述语句中privileges代表权限的名称，多个权限以逗号隔开。可使用SHOW语句查询权限名称</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW PRIVILEGES\\G
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-3-查看角色的权限" tabindex="-1"><a class="header-anchor" href="#_3-3-查看角色的权限" aria-hidden="true">#</a> 3.3 查看角色的权限</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW GRANTS FOR &#39;role_name&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>只要你创建了一个角色，系统就会自动给你一个“<code>USAGE</code>”权限，意思是<code>连接登录数据库的权限</code>。</p><h3 id="_3-4-回收角色的权限" tabindex="-1"><a class="header-anchor" href="#_3-4-回收角色的权限" aria-hidden="true">#</a> 3.4 回收角色的权限</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>REVOKE privileges ON tablename FROM &#39;rolename&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-5-删除角色" tabindex="-1"><a class="header-anchor" href="#_3-5-删除角色" aria-hidden="true">#</a> 3.5 删除角色</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP ROLE role [,role2]...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意，<code>如果你删除了角色，那么用户也就失去了通过这个角色所获得的所有权限</code>。</p><h3 id="_3-6-给用户赋予角色" tabindex="-1"><a class="header-anchor" href="#_3-6-给用户赋予角色" aria-hidden="true">#</a> 3.6 给用户赋予角色</h3><p>角色创建并授权后，要赋给用户并处于<code>激活状态</code>才能发挥作用。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>GRANT role [,role2,...] TO user [,user2,...];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询当前已激活的角色</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT CURRENT_ROLE();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-7-激活角色" tabindex="-1"><a class="header-anchor" href="#_3-7-激活角色" aria-hidden="true">#</a> 3.7 激活角色</h3><p><strong>方式1：使用set default role 命令激活角色</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET DEFAULT ROLE ALL TO &#39;kangshifu&#39;@&#39;localhost&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>方式2：将activate_all_roles_on_login设置为ON</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET GLOBAL activate_all_roles_on_login=ON;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这条 SQL 语句的意思是，对<code>所有角色永久激活</code>。</p><h3 id="_3-8-撤销用户的角色" tabindex="-1"><a class="header-anchor" href="#_3-8-撤销用户的角色" aria-hidden="true">#</a> 3.8 撤销用户的角色</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>REVOKE role FROM user;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-9-设置强制角色-mandatory-role" tabindex="-1"><a class="header-anchor" href="#_3-9-设置强制角色-mandatory-role" aria-hidden="true">#</a> 3.9 设置强制角色(mandatory role)</h3><p>方式1：服务启动前设置</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqld</span><span class="token punctuation">]</span></span> 
<span class="token key attr-name">mandatory_roles</span><span class="token punctuation">=</span><span class="token value attr-value">&#39;<span class="token inner-value">role1,role2@localhost,r3@%.atguigu.com</span>&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>方式2：运行时设置</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET PERSIST mandatory_roles = &#39;role1,role2@localhost,r3@%.example.com&#39;; #系统重启后仍然有效
SET GLOBAL mandatory_roles = &#39;role1,role2@localhost,r3@%.example.com&#39;; #系统重启后失效
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>`,92);function g(p,E){const s=l("ExternalLinkIcon");return i(),n("div",null,[e("div",u,[m,e("p",null,[t,a(": 以下所有文章整理于B站宋红康老师的《MySQL数据库入门到大牛》。"),e("a",v,[a("MySQL"),r(s)])])]),h])}const q=d(o,[["render",g],["__file","user-and-permission-management.html.vue"]]);export{q as default};
