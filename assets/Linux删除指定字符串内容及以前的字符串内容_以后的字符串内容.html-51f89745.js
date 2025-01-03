import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as r,c,a as n,b as e,d as a,e as o}from"./app-bccf5941.js";const d={},t=n("p",null,[e("👨‍🎓"),n("strong",null,"博主简介")],-1),u={href:"https://blog.csdn.net/liu_chen_yang?type=blog",target:"_blank",rel:"noopener noreferrer"},p=n("br",null,null,-1),m={href:"https://bbs.huaweicloud.com/community/myblog",target:"_blank",rel:"noopener noreferrer"},b=n("br",null,null,-1),v={href:"https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz",target:"_blank",rel:"noopener noreferrer"},h=n("br",null,null,-1),_=n("strong",null,"交流社区：",-1),T={href:"https://bbs.csdn.net/forums/lcy",target:"_blank",rel:"noopener noreferrer"},k=n("br",null,null,-1),G=n("br",null,null,-1),X=o(`<hr><h2 id="内容编辑" tabindex="-1"><a class="header-anchor" href="#内容编辑" aria-hidden="true">#</a> 内容编辑</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat a.txt</span>
GeForce RTX <span class="token number">2080</span> Ti - 2733M
GeForce RTX <span class="token number">2080</span> Ti - 9282M
NVIDIA GeForce GTX <span class="token number">1080</span> Ti - 2947M
NVIDIA GeForce GTX <span class="token number">1080</span> Ti - 3098M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="前" tabindex="-1"><a class="header-anchor" href="#前" aria-hidden="true">#</a> 前</h2><h3 id="删除指定内容自身及以前所有的字符串内容" tabindex="-1"><a class="header-anchor" href="#删除指定内容自身及以前所有的字符串内容" aria-hidden="true">#</a> 删除指定内容自身及以前所有的字符串内容</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#原始内容</span>
GeForce RTX <span class="token number">2080</span> Ti - 2733M
GeForce RTX <span class="token number">2080</span> Ti - 9282M
NVIDIA GeForce GTX <span class="token number">1080</span> Ti - 2947M
NVIDIA GeForce GTX <span class="token number">1080</span> Ti - 3098M

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># sed &#39;s/.*GeForce //g&#39; a.txt</span>
RTX <span class="token number">2080</span> Ti - 2733M
RTX <span class="token number">2080</span> Ti - 9282M
GTX <span class="token number">1080</span> Ti - 2947M
GTX <span class="token number">1080</span> Ti - 3098M

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除指定内容以前所有的字符串内容不包括自身" tabindex="-1"><a class="header-anchor" href="#删除指定内容以前所有的字符串内容不包括自身" aria-hidden="true">#</a> 删除指定内容以前所有的字符串内容不包括自身</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#原始内容</span>
GeForce RTX <span class="token number">2080</span> Ti - 2733M
GeForce RTX <span class="token number">2080</span> Ti - 9282M
NVIDIA GeForce GTX <span class="token number">1080</span> Ti - 2947M
NVIDIA GeForce GTX <span class="token number">1080</span> Ti - 3098M

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># sed &#39;s/.*\\(GeFo.*\\)/\\1/g&#39; a.txt</span>
GeForce RTX <span class="token number">2080</span> Ti - 2733M
GeForce RTX <span class="token number">2080</span> Ti - 9282M
GeForce GTX <span class="token number">1080</span> Ti - 2947M
GeForce GTX <span class="token number">1080</span> Ti - 3098M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="后" tabindex="-1"><a class="header-anchor" href="#后" aria-hidden="true">#</a> 后</h2><h3 id="删除指定内容自身及以后所有的字符串内容" tabindex="-1"><a class="header-anchor" href="#删除指定内容自身及以后所有的字符串内容" aria-hidden="true">#</a> 删除指定内容自身及以后所有的字符串内容</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#原始内容</span>
GeForce RTX <span class="token number">2080</span> Ti - 2733M
GeForce RTX <span class="token number">2080</span> Ti - 9282M
NVIDIA GeForce GTX <span class="token number">1080</span> Ti - 2947M
NVIDIA GeForce GTX <span class="token number">1080</span> Ti - 3098M

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># sed &#39;s/Ti -.*//g&#39; a.txt</span>
GeForce RTX <span class="token number">2080</span> 
GeForce RTX <span class="token number">2080</span> 
NVIDIA GeForce GTX <span class="token number">1080</span> 
NVIDIA GeForce GTX <span class="token number">1080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除指定内容以后所有的字符串内容不包括自身" tabindex="-1"><a class="header-anchor" href="#删除指定内容以后所有的字符串内容不包括自身" aria-hidden="true">#</a> 删除指定内容以后所有的字符串内容不包括自身</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#原始内容</span>
GeForce RTX <span class="token number">2080</span> Ti - 2733M
GeForce RTX <span class="token number">2080</span> Ti - 9282M
NVIDIA GeForce GTX <span class="token number">1080</span> Ti - 2947M
NVIDIA GeForce GTX <span class="token number">1080</span> Ti - 3098M

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># sed &#39;s/\\(Ti\\).*/\\1/g&#39; a.txt</span>
GeForce RTX <span class="token number">2080</span> Ti
GeForce RTX <span class="token number">2080</span> Ti
NVIDIA GeForce GTX <span class="token number">1080</span> Ti
NVIDIA GeForce GTX <span class="token number">1080</span> Ti
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function g(F,I){const s=l("ExternalLinkIcon");return r(),c("div",null,[n("blockquote",null,[t,n("p",null,[e("  🏅"),n("a",u,[e("云计算领域优质创作者"),a(s)]),p,e("   🏅"),n("a",m,[e("华为云开发者社区专家博主"),a(s)]),b,e("   🏅"),n("a",v,[e("阿里云开发者社区专家博主"),a(s)]),h,e(" 💊"),_,n("a",T,[e("运维交流社区"),a(s)]),e(" 欢迎大家的加入！"),k,e(" 🐋 希望大家多多支持，我们一起进步！😄"),G,e(" 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗")])]),X])}const x=i(d,[["render",g],["__file","Linux删除指定字符串内容及以前的字符串内容_以后的字符串内容.html.vue"]]);export{x as default};
