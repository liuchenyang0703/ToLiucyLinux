import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as i,e as s}from"./app-bccf5941.js";const d={},a=s(`<h2 id="_1、使用root用户停止服务" tabindex="-1"><a class="header-anchor" href="#_1、使用root用户停止服务" aria-hidden="true">#</a> 1、使用root用户停止服务</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">su</span> - root
systemctl stop DmServiceDMSERVER
systemctl stop DmAPService.service 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、切换到dmdba用户进行卸载程序" tabindex="-1"><a class="header-anchor" href="#_2、切换到dmdba用户进行卸载程序" aria-hidden="true">#</a> 2、切换到dmdba用户进行卸载程序</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">su</span> - dmdba
<span class="token builtin class-name">cd</span> /opt/dmdbms/
./uninstall.sh <span class="token parameter variable">-i</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>dmdba@debian:~/dmdbms$ ./uninstall.sh <span class="token parameter variable">-i</span>
请确认是否卸载达梦数据库<span class="token punctuation">(</span>/opt/dmdbms/<span class="token punctuation">)</span>? <span class="token punctuation">(</span>y/Y:是 n/N:否<span class="token punctuation">)</span>：y

是否删除dm_svc.conf配置文件? <span class="token punctuation">(</span>y/Y:是 n/N:否<span class="token punctuation">)</span>:y

正在删除所有数据库库服务
删除数据库服务DmJobMonitorService
删除数据库服务DmAPService
删除数据库服务DmAuditMonitorService
删除数据库服务DmInstanceMonitorService
删除数据库服务DmServiceDMSERVER
删除数据库服务DmServiceDMSERVER-
删除所有数据库库服务完成
正在删除数据库目录
删除bin目录
删除bin目录完成
删除bin2目录
删除bin2目录完成
删除include目录
删除include目录完成
删除desktop目录
删除desktop目录完成
删除doc目录
删除doc目录完成
删除drivers目录
删除drivers目录完成
删除jdk目录
删除jdk目录完成
删除jar目录
删除jar目录完成
删除samples目录
删除samples目录完成
删除script目录
删除script目录完成
删除tool目录
删除tool目录完成
删除web目录
删除web目录完成
删除uninstall目录
删除uninstall目录完成
删除license_en.txt文件
删除license_en.txt文件完成
删除license_zh.txt文件
删除license_zh.txt文件完成
删除uninstall.sh文件
删除uninstall.sh文件完成
删除数据库目录完成

使用root用户执行命令:
/opt/dmdbms/root_uninstaller.sh

dmdba@debian:~/dmdbms$ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、使用root用户执行清理命令" tabindex="-1"><a class="header-anchor" href="#_3、使用root用户执行清理命令" aria-hidden="true">#</a> 3、使用root用户执行清理命令</h2><p>切换到root</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">su</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/opt/dmdbms/root_uninstaller.sh
删除DmAPService服务
Removed /etc/systemd/system/multi-user.target.wants/DmAPService.service.
删除DmServiceDMSERVER服务
Removed /etc/systemd/system/multi-user.target.wants/DmServiceDMSERVER.service.
删除/etc/dm_svc.conf文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>卸载完成</p>`,10),l=[a];function v(r,c){return e(),i("div",null,l)}const u=n(d,[["render",v],["__file","Llinux 达梦数据库的卸载.html.vue"]]);export{u as default};
