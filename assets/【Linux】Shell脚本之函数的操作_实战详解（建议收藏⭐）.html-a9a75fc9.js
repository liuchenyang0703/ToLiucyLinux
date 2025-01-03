import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as p,c as u,a as n,b as s,d as a,w as t,e as i}from"./app-bccf5941.js";const r={},d=n("figure",null,[n("img",{src:"https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180959326.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),b=n("p",null,[s("🍁"),n("strong",null,"博主简介")],-1),v={href:"https://blog.csdn.net/liu_chen_yang?type=blog",target:"_blank",rel:"noopener noreferrer"},k=n("br",null,null,-1),m={href:"https://bbs.huaweicloud.com/community/myblog",target:"_blank",rel:"noopener noreferrer"},h=n("br",null,null,-1),g={href:"https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz",target:"_blank",rel:"noopener noreferrer"},f=n("br",null,null,-1),_=n("strong",null,"交流社区：",-1),y={href:"https://bbs.csdn.net/forums/lcy",target:"_blank",rel:"noopener noreferrer"},x=i(`<h2 id="shell脚本函数" tabindex="-1"><a class="header-anchor" href="#shell脚本函数" aria-hidden="true">#</a> shell脚本函数</h2><h3 id="设置函数的意义" tabindex="-1"><a class="header-anchor" href="#设置函数的意义" aria-hidden="true">#</a> 设置函数的意义</h3><blockquote><p>函数是一段可以重复利用有组织的代码；可以减少代码，提高代码利用率，使脚本结构更加清晰。</p></blockquote><h3 id="函数的基本格式" tabindex="-1"><a class="header-anchor" href="#函数的基本格式" aria-hidden="true">#</a> 函数的基本格式</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">function</span> 函数名<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	执行代码
	<span class="token punctuation">[</span>return x<span class="token punctuation">]</span>                       <span class="token comment">#使用return或exit可以显示的结束函数</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>函数名<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>							 <span class="token comment">#函数名后面（）是没有内容的</span>
	执行代码							 <span class="token comment">#我们执行的命令内容放在{}里面</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样只是写了函数，但是没有调用，所以执行脚本不会有输出。</p><h3 id="函数的调用-实例" tabindex="-1"><a class="header-anchor" href="#函数的调用-实例" aria-hidden="true">#</a> 函数的调用+实例</h3><ul><li>实例1</li></ul><blockquote><p>直接写函数名</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token keyword">function</span> <span class="token function-name function">f1</span> <span class="token punctuation">{</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;函数测试&quot;</span>
<span class="token punctuation">}</span>

f1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>输出结果为：</p></blockquote>`,12),q=i(`<ul><li>实例2</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token keyword">function</span> <span class="token function-name function">f1</span> <span class="token punctuation">{</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;函数测试&quot;</span>
<span class="token punctuation">}</span>


<span class="token function-name function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;这是没有function的函数测试&quot;</span>
<span class="token punctuation">}</span>

f1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>输出结果为：</p></blockquote>`,3),$=i(`<figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180959771.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>实例3</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token keyword">function</span> <span class="token function-name function">f1</span> <span class="token punctuation">{</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;函数测试&quot;</span>
<span class="token punctuation">}</span>


<span class="token function-name function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;这是没有function的函数测试&quot;</span>
<span class="token punctuation">}</span>

f1

<span class="token function-name function">f2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;这是function的函数测试2&quot;</span>
<span class="token punctuation">}</span>

f2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),w=n("p",null,"输出结果为：",-1),j=n("br",null,null,-1),z=i(`<ul><li>实例4</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token keyword">function</span> <span class="token function-name function">f1</span> <span class="token punctuation">{</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;函数测试&quot;</span>
<span class="token punctuation">}</span>


<span class="token function-name function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;这是没有function的函数测试&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#f1</span>

<span class="token function-name function">f2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;这是function的函数测试2&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#f2</span>

<span class="token function-name function">f3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;我想输出函数的f1和f2，结果为：<span class="token entity" title="\\n">\\n</span> <span class="token variable"><span class="token variable">$(</span>f1<span class="token variable">)</span></span> <span class="token entity" title="\\n">\\n</span> <span class="token variable"><span class="token variable">$(</span>f2<span class="token variable">)</span></span>&quot;</span>
<span class="token punctuation">}</span>
f3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),S=n("p",null,"输出结果为：",-1),L=n("br",null,null,-1),G=n("br",null,null,-1),E=n("br",null,null,-1),U=i(`<ul><li><strong>总结：</strong></li></ul><blockquote><p>1.直接写函数中调用</p><p>2.函数直接写函数名同名函数后一个生效</p><p>3.调用函数一定要先定义</p><p>4.只要先定义了调用的其他函数定义顺序无关</p></blockquote><h2 id="函数的返回值" tabindex="-1"><a class="header-anchor" href="#函数的返回值" aria-hidden="true">#</a> 函数的返回值</h2><p>return表示退出函数并返回一个退出值，脚本中可以用 $ ? 变量显示该值</p><blockquote><p>1.函数结束就取返回值，因为$?变量只返回执行的最后一条命令的退出状态码</p><p>2.退出状态码必须是0~255，超出时值将为除以256取余</p></blockquote><ul><li>实例1：通过return返回一个乘积</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token keyword">function</span> <span class="token function-name function">test1</span> <span class="token punctuation">{</span>
	<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入一个数字：&quot;</span> num
	<span class="token builtin class-name">return</span> $<span class="token punctuation">[</span><span class="token variable">$num</span>*2<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

test1

<span class="token builtin class-name">echo</span> <span class="token variable">$?</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),C=n("p",null,"输出结果为：",-1),N=n("br",null,null,-1),V=i(`<p>为什么会变成40呢？是因为里面写了交互式输入的数字*2，结果在$?返回值里返回。</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180959410.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>实例2</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>


<span class="token function-name function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入第一个数：&quot;</span> num1
	<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入第二个数：&quot;</span> num2
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;刚刚输入的两个数分别为：<span class="token variable">$num1</span> 和 <span class="token variable">$num2</span>&quot;</span>
	<span class="token assign-left variable">SUM</span><span class="token operator">=</span>$<span class="token punctuation">[</span> <span class="token variable">$num1</span> + <span class="token variable">$num2</span> <span class="token punctuation">]</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;两个数的和为：<span class="token variable">$SUM</span>&quot;</span>
<span class="token punctuation">}</span>
<span class="token function">sum</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>请输入第一个数：52
请输入第二个数：10
刚刚输入的两个数分别为：52 和 <span class="token number">10</span>
两个数的和为：62
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180959555.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="函数的传参" tabindex="-1"><a class="header-anchor" href="#函数的传参" aria-hidden="true">#</a> 函数的传参</h3><blockquote><p>在Shell中，调用函数时可以向其传递参数。在函数体内部，通过 $n的形式来获取参数的值，例如：$1表示第一个参数，$2表示第二个参数…即使用位置参数来实现参数传递。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token function-name function">add</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token builtin class-name">let</span> <span class="token assign-left variable">sum</span><span class="token operator">=</span><span class="token variable">$1</span>+<span class="token variable">$2</span>
	<span class="token builtin class-name">echo</span> <span class="token variable">$sum</span>
<span class="token punctuation">}</span>
<span class="token comment">#add（输出的数是你写的数）</span>
<span class="token function">add</span> <span class="token variable">$1</span> <span class="token variable">$2</span>
<span class="token comment">#函数传参【传的是位置变量】</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果为：24</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180959511.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="函数变量的作用范围" tabindex="-1"><a class="header-anchor" href="#函数变量的作用范围" aria-hidden="true">#</a> 函数变量的作用范围</h3>`,13),B=n("p",null,"1.函数在shell脚本中仅在当前shell环境中有效",-1),A=n("p",null,"2.Shell脚本中变量默认全局有效",-1),I=n("p",null,"3.将变量限定在函数内部使用local命令",-1),M=n("pre",null,[n("code",null,`    3.1函数内部变量通过local来实现

    3.2通过定义myfun函数，在其内部设置局部变量i

    3.3函数内部和外部分别赋值，进行结果验证。
`)],-1),F=n("p",null,"ps：",-1),K=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token function-name function">myfun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token builtin class-name">local</span> i 
	<span class="token assign-left variable">i</span><span class="token operator">=</span><span class="token number">6</span>
	<span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token punctuation">}</span>

<span class="token assign-left variable">i</span><span class="token operator">=</span><span class="token number">8</span>

myfun
<span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),T=n("br",null,null,-1),D=n("br",null,null,-1),H=n("br",null,null,-1),J=i('<figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180959691.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="函数的参数" tabindex="-1"><a class="header-anchor" href="#函数的参数" aria-hidden="true">#</a> * 函数的参数</h2><h3 id="_1-参数的用法" tabindex="-1"><a class="header-anchor" href="#_1-参数的用法" aria-hidden="true">#</a> *.1 参数的用法</h3><blockquote><p>函数名称：参数1，参数2，参数3</p></blockquote><h3 id="_2-参数的表示方法" tabindex="-1"><a class="header-anchor" href="#_2-参数的表示方法" aria-hidden="true">#</a> *.2 参数的表示方法</h3><blockquote><p><code>$1 $2 $3.........${10}${11}</code></p></blockquote><h3 id="_3-参数的案例" tabindex="-1"><a class="header-anchor" href="#_3-参数的案例" aria-hidden="true">#</a> *.3 参数的案例</h3><h4 id="_3-0-什么是阶乘" tabindex="-1"><a class="header-anchor" href="#_3-0-什么是阶乘" aria-hidden="true">#</a> *3.0 什么是阶乘？</h4>',8),O=i("<p>阶乘(factorial)是基斯顿·卡曼(Christian Kramp, 1760 – 1826)于1808年发明的运算符号。<br> 阶乘，也是数学里的一种术语。<br><br><br> 阶乘指从1乘以2乘以3乘以4一直乘到所要求的数。</p><p>例如1：所要求的数是4，则阶乘式是1*2*3*4，也可以是4*3*2*1，得到的积是24，24就是4的阶乘。<br> 例如2：所要求的数是6，则阶乘式是1*2*3*……*6，也可以是6*5*4*3*2*1，得到的积是720，720就是6的阶乘。<br> 例如3：所要求的数是n，则阶乘式是1*2*3*……*n，设得到的积是x，x就是n的阶乘。<br><br><br> 在表达阶乘时，就使用“！”来表示。如h阶乘，就表示为h!</p><p>阶乘一般很难计算，因为积都很大。</p><p>以下列出1至10的阶乘。</p><p>1！=1，</p><p>2！=2，</p><p>3！=6，</p><p>4！=24，</p><p>5！=120，</p><p>6！=720，</p><p>7！=5040，</p><p>8！=40320</p><p>9！=362880</p><p>10！=3628800</p><p>另外，数学家定义，0！=1，所以0！=1！</p>",15),P=n("br",null,null,-1),Q=n("br",null,null,-1),R=n("br",null,null,-1),W=n("br",null,null,-1),X=n("br",null,null,-1),Y=i(`<h4 id="_3-1-求1到6的阶乘" tabindex="-1"><a class="header-anchor" href="#_3-1-求1到6的阶乘" aria-hidden="true">#</a> *.3.1 求1到6的阶乘</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token comment">#求阶乘1到6的阶乘</span>
<span class="token function-name function">jiecheng</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token assign-left variable">num</span><span class="token operator">=</span><span class="token number">1</span>
	<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">6</span><span class="token punctuation">}</span><span class="token punctuation">;</span><span class="token keyword">do</span>
		<span class="token builtin class-name">let</span> <span class="token assign-left variable">num</span><span class="token operator">=</span><span class="token variable">$i</span>*<span class="token variable">$num</span>
		<span class="token builtin class-name">echo</span> <span class="token variable">$num</span>
	<span class="token keyword">done</span>
<span class="token punctuation">}</span>

jiecheng
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>过程为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>*1
<span class="token number">1</span>*2
<span class="token number">1</span>*2*3
<span class="token number">1</span>*2*3*4
<span class="token number">1</span>*2*3*4*5
<span class="token number">1</span>*2*3*4*5*6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果为：</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958207.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_3-2-求1到6的阶乘-只输出6的阶乘" tabindex="-1"><a class="header-anchor" href="#_3-2-求1到6的阶乘-只输出6的阶乘" aria-hidden="true">#</a> *.3.2 求1到6的阶乘，只输出6的阶乘</h4><blockquote><p>如果想适用于4、5或其他的阶乘，可以吧1..6改为1..指定的最高数就可以算出来了。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token function-name function">cheng</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token assign-left variable">num</span><span class="token operator">=</span><span class="token number">1</span>
	<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">6</span><span class="token punctuation">}</span><span class="token punctuation">;</span><span class="token keyword">do</span>
		<span class="token builtin class-name">let</span> <span class="token assign-left variable">num</span><span class="token operator">=</span><span class="token variable">$i</span>*<span class="token variable">$num</span>
	<span class="token keyword">done</span>
	<span class="token builtin class-name">echo</span> <span class="token variable">$num</span>
<span class="token punctuation">}</span>
cheng
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果为：</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958354.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>为什么等于720呢？看上去和*.3.1写的一模一样，其实不一样，仔细看；<br> 一个<code>echo $num</code>在for循环内，一个在for循环外；<br> 在for循环内，会每次循环都输出一次结果，而在for循环外，只会输出循环的最后一次结果，所以，该结果等于720，也就是6的阶乘。</p><h3 id="_4-判断是否为文件" tabindex="-1"><a class="header-anchor" href="#_4-判断是否为文件" aria-hidden="true">#</a> *.4 判断是否为文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">file</span><span class="token operator">=</span>/home/abc.txt
<span class="token function-name function">wen</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token variable">$file</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>  <span class="token comment">#判断是否为文件</span>
		<span class="token builtin class-name">return</span> <span class="token number">80</span>
	<span class="token keyword">else</span>
		<span class="token builtin class-name">return</span> <span class="token number">40</span>
	<span class="token keyword">fi</span>
<span class="token punctuation">}</span>
wen
<span class="token builtin class-name">echo</span> <span class="token variable">$?</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果为：</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958315.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>脚本解析：<br> 如果没有哪个文件也是会返回40的；</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958807.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_5-递归函数" tabindex="-1"><a class="header-anchor" href="#_5-递归函数" aria-hidden="true">#</a> *.5 递归函数</h3><h4 id="_5-1-递归显示var下的log里面有哪些是目录" tabindex="-1"><a class="header-anchor" href="#_5-1-递归显示var下的log里面有哪些是目录" aria-hidden="true">#</a> *.5.1 递归显示var下的log里面有哪些是目录</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#列出目录文件的列表，目录可用颜色表示（蓝色表示目录；白色表示文件）文件显示层及关系</span>
<span class="token function-name function">list</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable">$1</span>/*<span class="token punctuation">;</span><span class="token keyword">do</span>  <span class="token comment">#$1下面的所有内容</span>
                <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> <span class="token variable">$i</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>   <span class="token comment">#-d代表是目录 只要是目录的我就用蓝色显示</span>
                        <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\e">\\e</span>[34m<span class="token variable">$i</span><span class="token entity" title="\\e">\\e</span>[0m&quot;</span>
                        <span class="token comment">#标准格式【】里面的内容是表示颜色  -e表示转义字符标识</span>
                        <span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
                        list <span class="token variable">$i</span> <span class="token string">&quot; <span class="token variable">$2</span>&quot;</span>
                <span class="token keyword">else</span>
                        <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$2</span><span class="token variable">$i</span>&quot;</span>
                <span class="token keyword">fi</span>
        <span class="token keyword">done</span>
<span class="token punctuation">}</span>
list <span class="token variable">$1</span> <span class="token variable">$2</span> <span class="token comment">#调用变量</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果：</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958124.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_5-2-交互式-递归方式计算你输入的数值作为阶乘" tabindex="-1"><a class="header-anchor" href="#_5-2-交互式-递归方式计算你输入的数值作为阶乘" aria-hidden="true">#</a> *.5.2 交互式 递归方式计算你输入的数值作为阶乘</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#交互式 递归方式计算你输入的数值作为阶乘</span>
<span class="token comment">#比如我第一次输入5</span>
<span class="token function-name function">fun</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$1</span> <span class="token parameter variable">-eq</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
   		<span class="token builtin class-name">echo</span> <span class="token number">1</span>
	<span class="token keyword">else</span>
		<span class="token comment">#5不等于1执行else的 此时tp=5-1=4；res=4 此时echo为5*4</span>
		<span class="token builtin class-name">local</span> <span class="token assign-left variable">tp</span><span class="token operator">=</span>$<span class="token punctuation">[</span> <span class="token variable">$1</span> - <span class="token number">1</span> <span class="token punctuation">]</span>  <span class="token comment">#这个是局部  </span>
  		<span class="token assign-left variable">res</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>fun $tp<span class="token variable">)</span></span>  <span class="token comment">#相当于直接调用tp本身</span>
 	 	<span class="token builtin class-name">echo</span> $<span class="token punctuation">[</span> <span class="token variable">$1</span> * <span class="token variable">$res</span> <span class="token punctuation">]</span> <span class="token comment">#$1是5</span>
	<span class="token keyword">fi</span>
<span class="token punctuation">}</span>
 
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入：&quot;</span> num
<span class="token assign-left variable">res</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>fun $num<span class="token variable">)</span></span>
<span class="token builtin class-name">echo</span> <span class="token variable">$res</span>
 
 
<span class="token comment">#执行过程</span>
<span class="token comment">#fun 5 $1=5 tp=4 res=fun 4 echo 5 * 4()      5*4*3*2*1</span>
<span class="token comment">#fun 4 $1=4 tp=3 res=fun 3 echo 4 *3(fun)    4*3*2*1</span>
<span class="token comment">#fun 3 $1=3 tp=2 res=fun 2 echo 3 * 2(fun)   3*2*1</span>
<span class="token comment">#fun 2 $1=2 tp=1 res=fun 1 echo 2*1(fun)     2*1</span>
<span class="token comment">#fun 1 $1  echo 1                            1  </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果：</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958815.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果还是看不懂过程，可以使用 <code>sh -x 脚本名称</code> 来看脚本执行过程，或者是在脚本中的<code>#!/bin/bash/</code>下一行加<code>set -x</code>；就可以看到脚本执行的过程了。适合与for循环这一类的工程。</p><h2 id="如何查看脚本执行过程" tabindex="-1"><a class="header-anchor" href="#如何查看脚本执行过程" aria-hidden="true">#</a> 如何查看脚本执行过程？</h2><p>可以使用 <code>sh -x 脚本名称</code> 来看脚本执行过程，或者是在脚本中的<code>#!/bin/bash/</code>下一行加<code>set -x</code>；就可以看到脚本执行的过程了。适合与for循环这一类的工程。</p><ul><li>实例1：sh -x 脚本名称</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sh</span> <span class="token parameter variable">-x</span> 脚本名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958455.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>实例2：在脚本中的<code>#!/bin/bash/</code>下一行加<code>set -x</code></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>脚本：</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958518.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>执行：</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180958073.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="函数重点" tabindex="-1"><a class="header-anchor" href="#函数重点" aria-hidden="true">#</a> 函数重点：</h2><blockquote><p>函数返回值return，当函数中遇到return函数结束。</p><ul><li>1.只有函数被调用，函数体内的代码才会被执行；</li><li>2.区分脚本和函数的位置变量，函数体内使用函数传递的位置变量；</li><li>3.在其他脚本引用函数，需要source或.加脚本名，引用函数；</li><li>4.如果return没有指定返回值，则默认返回上一条命令的返回值。</li><li>5.函数大多数运用于case循环判断中，来写启动、停止、重启、查看状态等。</li></ul></blockquote><h3 id="举例重点5-启动脚本模板-可根据自己的jar包名称自行修改" tabindex="-1"><a class="header-anchor" href="#举例重点5-启动脚本模板-可根据自己的jar包名称自行修改" aria-hidden="true">#</a> 举例重点5：启动脚本模板（可根据自己的jar包名称自行修改）</h3>`,42),Z={href:"http://start.sh",target:"_blank",rel:"noopener noreferrer"},nn=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token assign-left variable">USAGE</span><span class="token operator">=</span><span class="token string">&quot;Usage: <span class="token variable">$0</span> [start|stop|restart|status]&quot;</span>

<span class="token comment">#jar包进程</span>
<span class="token function-name function">jin</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">grep</span> cs.jar <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
<span class="token punctuation">}</span>

<span class="token function-name function">start</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span>jin<span class="token variable">)</span></span> <span class="token parameter variable">-ge</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
		<span class="token builtin class-name">echo</span> <span class="token string">&quot;该程序进程存在&quot;</span>
	<span class="token keyword">else</span>
		<span class="token function">java</span> <span class="token parameter variable">-jar</span> cs.jar  <span class="token operator">&gt;</span> /dev/null <span class="token operator">&amp;</span>
		<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span>jin<span class="token variable">)</span></span> <span class="token parameter variable">-ge</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
			<span class="token builtin class-name">echo</span> <span class="token string">&quot;成功启动该程序&quot;</span>
		<span class="token keyword">else</span>
			<span class="token builtin class-name">echo</span> <span class="token string">&quot;程序还未启动，请检查程序日志或者是脚本里的启动程序名称是否有误&quot;</span>
		<span class="token keyword">fi</span>
	<span class="token keyword">fi</span> 
<span class="token punctuation">}</span>

<span class="token function-name function">stop</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">grep</span> cs.jar <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{ print &quot; kill -9 &quot; $2 }&#39;</span> <span class="token operator">|</span> <span class="token function">sh</span>
	<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span>jin<span class="token variable">)</span></span> <span class="token parameter variable">-ge</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
		<span class="token builtin class-name">echo</span> <span class="token string">&quot;程序还没有停止，请检查脚本里的程序名称是否有误&quot;</span>
	<span class="token keyword">else</span>
		<span class="token builtin class-name">echo</span> <span class="token string">&quot;该程序已停止&quot;</span>
	<span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token function-name function">restart</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	stop
	start
<span class="token punctuation">}</span>

<span class="token function-name function">status</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span>jin<span class="token variable">)</span></span> <span class="token parameter variable">-ge</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
		<span class="token builtin class-name">echo</span> <span class="token string">&quot;有此进程，该服务正在运行中&quot;</span>
	<span class="token keyword">else</span>
		<span class="token builtin class-name">echo</span> <span class="token string">&quot;此进程不存在，需要启动服务的时候记得执行脚本哈！&quot;</span>
	<span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token keyword">case</span> <span class="token variable">$1</span> <span class="token keyword">in</span>
	start<span class="token punctuation">)</span>
		start
	<span class="token punctuation">;</span><span class="token punctuation">;</span>
	stop<span class="token punctuation">)</span>
		stop
	<span class="token punctuation">;</span><span class="token punctuation">;</span>
	restart<span class="token punctuation">)</span>
		restart
	<span class="token punctuation">;</span><span class="token punctuation">;</span>
	status<span class="token punctuation">)</span>
		status
	<span class="token punctuation">;</span><span class="token punctuation">;</span>
	*<span class="token punctuation">)</span>
	<span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token variable">$USAGE</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相关文章" tabindex="-1"><a class="header-anchor" href="#相关文章" aria-hidden="true">#</a> 相关文章：</h2>`,2),sn=n("thead",null,[n("tr",null,[n("th",{style:{"text-align":"left"}},"文章名"),n("th",{style:{"text-align":"left"}},"文章地址")])],-1),an={style:{"text-align":"left"}},en={href:"https://liucy.blog.csdn.net/article/details/130111812",target:"_blank",rel:"noopener noreferrer"},ln={style:{"text-align":"left"}},tn={href:"https://liucy.blog.csdn.net/article/details/130111812",target:"_blank",rel:"noopener noreferrer"},cn={style:{"text-align":"left"}},on={href:"https://liucy.blog.csdn.net/article/details/130387377",target:"_blank",rel:"noopener noreferrer"},pn={style:{"text-align":"left"}},un={href:"https://liucy.blog.csdn.net/article/details/130387377",target:"_blank",rel:"noopener noreferrer"},rn={style:{"text-align":"left"}},dn={href:"https://liucy.blog.csdn.net/article/details/130387523",target:"_blank",rel:"noopener noreferrer"},bn={style:{"text-align":"left"}},vn={href:"https://liucy.blog.csdn.net/article/details/130387523",target:"_blank",rel:"noopener noreferrer"};function kn(mn,hn){const e=c("ExternalLinkIcon"),l=c("font");return p(),u("div",null,[d,n("blockquote",null,[b,n("p",null,[s("  🏅"),n("a",v,[s("云计算领域优质创作者"),a(e)]),k,s("   🏅"),n("a",m,[s("华为云开发者社区专家博主"),a(e)]),h,s("   🏅"),n("a",g,[s("阿里云开发者社区专家博主"),a(e)]),f,s(" 💊"),_,n("a",y,[s("运维交流社区"),a(e)]),s(" 欢迎大家的加入！")])]),x,a(l,{color:"red"},{default:t(()=>[s("函数测试")]),_:1}),q,a(l,{color:"red"},{default:t(()=>[s("这是没有function的函数测试")]),_:1}),$,n("blockquote",null,[w,a(l,{color:"red"},{default:t(()=>[s("这是没有function的函数测试"),j,s(" 这是function的函数测试2")]),_:1})]),z,n("blockquote",null,[S,a(l,{color:"red"},{default:t(()=>[s("我想输出函数的f1和f2，结果为："),L,s(" 这是没有function的函数测试 "),G,s(" 这是function的函数测试2"),E]),_:1})]),U,n("blockquote",null,[C,a(l,{color:"red"},{default:t(()=>[s("请输入一个数字：20"),N,s(" 40")]),_:1})]),V,n("blockquote",null,[B,A,I,M,F,a(l,{color:"red"},{default:t(()=>[s(" 全局变量代表整体可以使用 局部变量代表的是全局变量里面可以使用其中一部分")]),_:1})]),K,n("blockquote",null,[n("p",null,[s("local定义的是局部变量；"),T,s(" 局部变量是6；全局变量是8；所以输出的结果是"),a(l,{color:"red"},{default:t(()=>[s("6和8")]),_:1}),D,s(" 如果吧local这行注释了，那么输出的结果就是"),a(l,{color:"red"},{default:t(()=>[s("6和6")]),_:1}),s("；为什么呢？"),H,s(" 因为两个全局变量，在脚本中只能执行一个全局变量，且是从上往下，所以输出的只有6。")])]),J,n("blockquote",null,[O,n("p",null,[s("通常我们所说的阶乘是定义在自然数范围里的，"),a(l,{color:"red"},{default:t(()=>[s("小数没有阶乘，像0.5！，0.65！，0.777！都是错误的。")]),_:1}),P,s(" 但是，有时候我们会将Gamma函数定义为非整数的阶乘，因为当x是正整数n的时候，Gamma函数的值是n-1的阶乘。 伽玛函数（Gamma Function）"),Q,s(" Γ（x)=∫e^(-t)*t^(x-1)dt (积分下限是零上限是＋∞）(x<>0,-1,-2,-3,……)"),R,s(" 运用积分的知识，我们可以证明Γ（x)＝(x-1) * Γ（x-1)"),W,s(" 所以，当x是整数n时，Γ（n) = (n-1)(n-2)……＝(n-1)!"),X,s(" 这样Gamma 函数实际上就把阶乘的延拓。")])]),Y,n("blockquote",null,[n("p",null,[s("使用方法：sh "),n("a",Z,[s("start.sh"),a(e)]),s(" start/stop/restart/status")])]),nn,n("table",null,[sn,n("tbody",null,[n("tr",null,[n("td",an,[n("a",en,[s("【Linux】 shell脚本的创建及使用 《入门到实践》详解[⭐建议收藏！！⭐]"),a(e)])]),n("td",ln,[n("a",tn,[s("https://liucy.blog.csdn.net/article/details/130111812"),a(e)])])]),n("tr",null,[n("td",cn,[n("a",on,[s("【Linux】Shell脚本之函数的操作+实战详解[⭐建议收藏！！⭐]"),a(e)])]),n("td",pn,[n("a",un,[s("https://liucy.blog.csdn.net/article/details/130387377"),a(e)])])]),n("tr",null,[n("td",rn,[n("a",dn,[s("【Linux】Shell脚本之 if判断、case判断、for循环、while循环 + 实战详解[⭐建议收藏！！⭐]"),a(e)])]),n("td",bn,[n("a",vn,[s("https://liucy.blog.csdn.net/article/details/130387523"),a(e)])])])])])])}const _n=o(r,[["render",kn],["__file","【Linux】Shell脚本之函数的操作_实战详解（建议收藏⭐）.html.vue"]]);export{_n as default};
