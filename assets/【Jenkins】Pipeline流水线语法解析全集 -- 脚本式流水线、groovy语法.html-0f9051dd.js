import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o,c as u,a as n,b as s,d as a,w as p,e as i}from"./app-bccf5941.js";const r={},d=n("figure",null,[n("img",{src:"https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/5cf90d2d830046058e5fa8768d5f47f4.jpeg",alt:"在这里插入图片描述",tabindex:"0",loading:"lazy"}),n("figcaption",null,"在这里插入图片描述")],-1),v=n("p",null,[s("👨‍🎓"),n("strong",null,"博主简介")],-1),m={href:"https://blog.csdn.net/liu_chen_yang?type=blog",target:"_blank",rel:"noopener noreferrer"},b=n("br",null,null,-1),k={href:"https://blog.csdn.net/liu_chen_yang?type=blog",target:"_blank",rel:"noopener noreferrer"},g=n("br",null,null,-1),h={href:"https://bbs.huaweicloud.com/community/myblog",target:"_blank",rel:"noopener noreferrer"},f=n("br",null,null,-1),y={href:"https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz",target:"_blank",rel:"noopener noreferrer"},_=n("br",null,null,-1),q=n("strong",null,"交流社区：",-1),x={href:"https://bbs.csdn.net/forums/lcy",target:"_blank",rel:"noopener noreferrer"},j=n("br",null,null,-1),$=n("br",null,null,-1),S=n("hr",null,null,-1),z=n("h2",{id:"脚本式流水线",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#脚本式流水线","aria-hidden":"true"},"#"),s(" 脚本式流水线")],-1),J=n("code",null,"groovy",-1),w=n("code",null,"script",-1),G=i('<h2 id="groovy语法" tabindex="-1"><a class="header-anchor" href="#groovy语法" aria-hidden="true">#</a> groovy语法</h2><h3 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h3><blockquote><p>和java、python一样的，（使用//）、多行（/* */）和文档注释（使用/** */）。</p></blockquote><h3 id="标识符" tabindex="-1"><a class="header-anchor" href="#标识符" aria-hidden="true">#</a> 标识符</h3><p>标识符也称为变量名；以字母、美元符号$或下划线_开始，不能以数字开始。</p><blockquote><p>以下是可用的标识符：</p><ul><li>def name</li><li>def name_age</li><li>def $name</li><li>def name2<br><br></li></ul><hr><p>以下是不可用的标识符：</p><ul><li>def name+age</li><li>def name#age</li><li>def 1name</li></ul></blockquote><h3 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h3><p>在Groovy中字符串有两种类型，一种是Java原生的java.lang.String；另一种是groovy.lang.GString，又叫<strong>插值字符串</strong>(interpolated strings)。</p><h4 id="单引号字符串-single-quoted-string" tabindex="-1"><a class="header-anchor" href="#单引号字符串-single-quoted-string" aria-hidden="true">#</a> 单引号字符串（Single quoted string）</h4>',9),E=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>def name <span class="token operator">=</span> <span class="token string">&#39;dancs&#39;</span>

println name.class <span class="token comment"># class java.lang.String</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="三单引号字符串-triple-single-quoted-string" tabindex="-1"><a class="header-anchor" href="#三单引号字符串-triple-single-quoted-string" aria-hidden="true">#</a> 三单引号字符串（Triple single quoted string）</h4><p>使用三单引号括住字符串支持多行，也是java.lang.String实例，在第一个’‘’起始处加一个反斜杠\\可以在新一行开始文本：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>def strippedFirstNewline <span class="token operator">=</span> &#39;&#39;&#39;line one

line two

line three

&#39;&#39;&#39;

<span class="token comment">// 可以写成下面这种形式，可读性更好</span>

def strippedFirstNewline <span class="token operator">=</span> &#39;&#39;&#39;\\

line one

line two

line three
&#39;&#39;&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="双引号字符串-double-quoted-string" tabindex="-1"><a class="header-anchor" href="#双引号字符串-double-quoted-string" aria-hidden="true">#</a> 双引号字符串（Double quoted string）</h4><p>如果双引号括住的字符串中没有插值表达式（interpolated expression），那它就是java.lang.String；如是有插值表达式，那它就是groovy.lang.GString：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>def normalStr <span class="token operator">=</span> <span class="token string">&quot;yjiyjige&quot;</span> <span class="token comment">// 这是一个java.lang.String</span>

def interpolatedStr <span class="token operator">=</span> <span class="token string">&quot;my name is \${normalStr}&quot;</span> <span class="token comment">// 这是一个groovy.lang.GString</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="字符串插值-string-interpolation" tabindex="-1"><a class="header-anchor" href="#字符串插值-string-interpolation" aria-hidden="true">#</a> 字符串插值（String interpolation）</h4><p>在Groovy语法中，所有的字符串字面量表示中，除了<code>单引号字符串</code>和<code>三单引号字符串</code>之外，其他形式都支持字符串插值。字符串插值，也即将占位表达式中的结果最终替换到字符串相应的位置中：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>def name <span class="token operator">=</span> &#39;<span class="token class-name">Guillaume</span>&#39; <span class="token comment">// 单引号不支持插值，定义一个变量值</span>
def greeting <span class="token operator">=</span> <span class="token string">&quot;Hello \${name}&quot;</span> <span class="token comment">// name变量的值会被替换进去</span>

print greeting<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> &#39;<span class="token class-name">Hello</span> <span class="token class-name">Guillaume</span>&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Jenkins流水线中的<code>script</code>中使用：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>pipeline <span class="token punctuation">{</span>
    agent any
    
    stages <span class="token punctuation">{</span>
        stage(&#39;script&#39;) <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                echo &quot;Scripted block&quot;
                script <span class="token punctuation">{</span>
					def name = &#39;Guillaume&#39;
					def greeting = &quot;Hello $<span class="token punctuation">{</span>name<span class="token punctuation">}</span>&quot; 
					print greeting.toString()
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果为：</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/9a4d8ef3390f48e98c1f1180b6a4ce13.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><hr><p>当使用点号表达式时，可以只用$代替\${}：</p><blockquote><p>点号表达式为：<code>变量名.字典key</code></p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//定义变量字典</span>
def person <span class="token operator">=</span> <span class="token punctuation">[</span>name<span class="token operator">:</span> &#39;<span class="token class-name">Guillaume</span>&#39;<span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">36</span><span class="token punctuation">]</span>
<span class="token comment">// 输出信息，调用变量</span>
println <span class="token string">&quot;$person.name is $person.age years old&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Jenkins流水线中的<code>script</code>中使用：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>pipeline <span class="token punctuation">{</span>
    agent any
    
    stages <span class="token punctuation">{</span>
        stage(&#39;script&#39;) <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                echo &quot;Scripted block&quot;
                script <span class="token punctuation">{</span>
					def person = <span class="token punctuation">[</span><span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;zhangsan&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">30</span><span class="token punctuation">]</span>
					println &quot;$person.name is $person.age years old&quot;
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果为：<code>zhangsan is 30 years old</code></p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/db5a0747c6da447dbf47cbdf6db42aa3.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 注意还有一种小数点值输出的方式</span>

def number <span class="token operator">=</span> <span class="token number">3.14</span>

println <span class="token string">&quot;$number.toString()&quot;</span> <span class="token comment">// 这里会报异常,因为相当于&quot;\${number.toString}()&quot;</span>

println <span class="token string">&quot;\${number.toString()}&quot;</span> <span class="token comment">// 这样就正常了</span>
<span class="token comment">// 或者直接使用变量，就不会有小数点的报错了</span>
println <span class="token string">&quot;$number&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="列表" tabindex="-1"><a class="header-anchor" href="#列表" aria-hidden="true">#</a> 列表</h3><p>默认情况下Groovy的列表使用的是java.util.ArrayList，用中括号[]括住，使用逗号分隔：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>def number <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看指定列表值" tabindex="-1"><a class="header-anchor" href="#查看指定列表值" aria-hidden="true">#</a> 查看指定列表值</h4><p>列表值是从0开始算的，输出第1个内容的时候为0；</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>def number1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
print <span class="token string">&quot;\${number1[1]}&quot;</span>
<span class="token comment">// 返回的就是：2，如果[中写的0]返回的就是1；以此类推；</span>
<span class="token comment">// 如果[中写的是4]超过了列表值，那么就返回的null。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是在Jenkins流水线的<code>script</code>下使用：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>pipeline <span class="token punctuation">{</span>
    agent any
    
    stages <span class="token punctuation">{</span>
        stage(&#39;script&#39;) <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                echo &quot;Scripted block&quot;
                script <span class="token punctuation">{</span>
					def number1 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
					print &quot;正常查看第1个列表值，结果为：$<span class="token punctuation">{</span>number1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果为：2</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/87b98d5eacdf418ca7800c646f999668.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><blockquote><p>注意：如果<code>print &quot;$number[1]&quot;</code>不是用<code>{}</code>输出，那么输出的内容将是：<code>[1, 2, 3, 4][1]</code>;</p></blockquote><hr><h4 id="查看列表值从前往后找" tabindex="-1"><a class="header-anchor" href="#查看列表值从前往后找" aria-hidden="true">#</a> 查看列表值从前往后找</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>def number2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
print <span class="token string">&quot;\${number2[-1]}&quot;</span>

<span class="token comment">// 结果为：4；[-2]就是3；以此类推。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是在Jenkins流水线的<code>script</code>下使用：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>pipeline <span class="token punctuation">{</span>
    agent any
    
    stages <span class="token punctuation">{</span>
        stage(&#39;script&#39;) <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                echo &quot;Scripted block&quot;
                script <span class="token punctuation">{</span>
					def number1 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
					print &quot;正常查看第1个列表值，结果为：$<span class="token punctuation">{</span>number1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
					
					def number2 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
					print &quot;从后往前查看第一个值，结果为：$<span class="token punctuation">{</span>number2<span class="token punctuation">[</span><span class="token number">-1</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;	
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果为：4</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/e7be6ef136ce48cc9dc0d578b00d1520.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><hr><h4 id="直接修改列表值" tabindex="-1"><a class="header-anchor" href="#直接修改列表值" aria-hidden="true">#</a> 直接修改列表值</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>def number3 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
number3<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">6</span>
print <span class="token string">&quot;\${number3[2]}&quot;</span>

<span class="token comment">// 输出结果为：6，如果选择[1]的话，那么输出的结果就还是2。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是在Jenkins流水线的<code>script</code>下使用：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>pipeline <span class="token punctuation">{</span>
    agent any
    
    stages <span class="token punctuation">{</span>
        stage(&#39;script&#39;) <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                echo &quot;Scripted block&quot;
                script <span class="token punctuation">{</span>
					def number1 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
					print &quot;正常查看第1个列表值，结果为：$<span class="token punctuation">{</span>number1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
					
					def number2 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
					print &quot;从后往前查看第一个值，结果为：$<span class="token punctuation">{</span>number2<span class="token punctuation">[</span><span class="token number">-1</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
					
					def number3 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
					number3<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> = 6
					print &quot;修改的第2个值为：$<span class="token punctuation">{</span>number3<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;	
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果为：6</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/5db4aaae829e49e88d2f36ac10ad579f.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><hr><h4 id="在列表中往后面添加一个值" tabindex="-1"><a class="header-anchor" href="#在列表中往后面添加一个值" aria-hidden="true">#</a> 在列表中往后面添加一个值</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>def number4 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
number4<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">5</span>
print <span class="token string">&quot;在最后添加一个值，结果为：\${number4[4]}&quot;</span>
<span class="token comment">// 结果为：5</span>
print <span class="token string">&quot;此列表中现在所有的结果为：$number4&quot;</span>
<span class="token comment">// 结果为：[1,2,3,4,5]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是在Jenkins流水线的<code>script</code>下使用：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>pipeline <span class="token punctuation">{</span>
    agent any
    
    stages <span class="token punctuation">{</span>
        stage(&#39;script&#39;) <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                echo &quot;Scripted block&quot;
                script <span class="token punctuation">{</span>
					def number1 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
					print &quot;正常查看第1个列表值，结果为：$<span class="token punctuation">{</span>number1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
					
					def number2 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
					print &quot;从后往前查看第一个值，结果为：$<span class="token punctuation">{</span>number2<span class="token punctuation">[</span><span class="token number">-1</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
					
					def number3 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
					number3<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> = 6
					print &quot;修改的第2个值为：$<span class="token punctuation">{</span>number3<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;	
					
					def number4 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
                    number4<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> = 5
                    print &quot;在最后添加一个值，结果为：$<span class="token punctuation">{</span>number4<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
                    print &quot;此列表中现在所有的结果为：$number4&quot;
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f161377fef0945a5b042fc2f14671b47.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><hr><h4 id="指定输出列表值" tabindex="-1"><a class="header-anchor" href="#指定输出列表值" aria-hidden="true">#</a> 指定输出列表值</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>def number5 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">]</span>
print <span class="token string">&quot;指定取出列表第1、5、9、3的值：\${number5[1,5,9,3]}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是在Jenkins流水线的<code>script</code>下使用：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>pipeline <span class="token punctuation">{</span>
    agent any
    
    stages <span class="token punctuation">{</span>
        stage(&#39;script&#39;) <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                echo &quot;Scripted block&quot;
                script <span class="token punctuation">{</span>
					def number1 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
					print &quot;正常查看第1个列表值，结果为：$<span class="token punctuation">{</span>number1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
					
					def number2 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
					print &quot;从后往前查看第一个值，结果为：$<span class="token punctuation">{</span>number2<span class="token punctuation">[</span><span class="token number">-1</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
					
					def number3 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
					number3<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> = 6
					print &quot;修改的第2个值为：$<span class="token punctuation">{</span>number3<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;	
					
					def number4 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
                    number4<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> = 5
                    print &quot;在最后添加一个值，结果为：$<span class="token punctuation">{</span>number4<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
                    print &quot;此列表中现在所有的结果为：$number4&quot;
                    
                    def number5 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">]</span>
                    print &quot;指定取出列表第1、5、9、3的值：$<span class="token punctuation">{</span>number5<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果为：[2, 6, 10, 4]</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/3155a247bce84e3bad53bffa9e1a204d.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><hr><h4 id="二维列表" tabindex="-1"><a class="header-anchor" href="#二维列表" aria-hidden="true">#</a> 二维列表</h4><p>在Groovy（以及许多其他编程语言中）中，二维列表（或称为列表的列表）是一个列表，其中的每个元素也是一个列表。换句话说，它是一个列表的嵌套结构。下面是个例子:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>def twoDimensionalList <span class="token operator">=</span> <span class="token punctuation">[</span>  
    <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>  
    <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">,</span>  
    <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">]</span>  
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单来说，在列表的基础上；用一个大的中括号，套多个中括号列表，称为二维列表。</p><p>下面是在Jenkins流水线的<code>script</code>下使用：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>pipeline <span class="token punctuation">{</span>
    agent any
    
    stages <span class="token punctuation">{</span>
        stage(&#39;script&#39;) <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                echo &quot;Scripted block&quot;
                script <span class="token punctuation">{</span>
					def number1 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
					print &quot;正常查看第1个列表值，结果为：$<span class="token punctuation">{</span>number1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
					
					def number2 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
					print &quot;从后往前查看第一个值，结果为：$<span class="token punctuation">{</span>number2<span class="token punctuation">[</span><span class="token number">-1</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
					
					def number3 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
					number3<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> = 6
					print &quot;修改的第2个值为：$<span class="token punctuation">{</span>number3<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;	
					
					def number4 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
                    number4<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> = 5
                    print &quot;在最后添加一个值，结果为：$<span class="token punctuation">{</span>number4<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
                    print &quot;此列表中现在所有的结果为：$number4&quot;
                    
                    def number5 = <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">]</span>
                    print &quot;指定取出列表第1、5、9、3的值：$<span class="token punctuation">{</span>number5<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
                    
                    def number6 = <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;壹&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;叁&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;d&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;f&#39;</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
                    print &quot;二维列表中，指定输出的值为：$<span class="token punctuation">{</span>number6<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">}</span>&quot;
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出的结果为：f</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/3645895627594850b62473943dd6abae.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><blockquote><p>解析：<br> 二维列表 列表值可以多写，但是输出的内容只能是两个值，多的话就会报错；<br> 输出的内容列表[ ] ：第一个是子列表的意思；第二个是子列表中的内容的意思；<br> 所以，第一个值是2，那我们找的就是第三个子列表，因为从0开始计算嘛；第二个值是3，那我们找的是第三个子列表中的第4个值，当然也是从0开始计算的，所以结果是f。</p></blockquote><h3 id="字典-maps" tabindex="-1"><a class="header-anchor" href="#字典-maps" aria-hidden="true">#</a> 字典（Maps）</h3><p>在<code>Groovy</code>语法中，使用中括号[]来定义字典，和<code>列表</code>一样，都是使用中括号[]，但区别为列表[]里是具体的值，而字典里是需要包含<code>key</code>和<code>value</code>，key和value之间使用冒号分隔，元素与元素之间用逗号分隔；</p><p>下面一个基本的例子：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>def people <span class="token operator">=</span> <span class="token punctuation">[</span>name<span class="token operator">:</span>&#39;zhangsan<span class="token char">&#39;,age:&#39;</span><span class="token number">18</span><span class="token char">&#39;,sex:&#39;</span>男&#39;<span class="token punctuation">,</span>height<span class="token operator">:</span><span class="token char">&#39;180&#39;</span><span class="token punctuation">]</span>
print <span class="token string">&quot;姓名为：\${people.name}，年龄为：\${people.age}，性别为：\${people.sex}，身高为：\${people.height}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是在Jenkins流水线的<code>script</code>下使用：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>pipeline <span class="token punctuation">{</span>
    agent any
    
    stages <span class="token punctuation">{</span>
        stage(&#39;script <span class="token punctuation">-</span><span class="token punctuation">-</span> Maps&#39;) <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                echo &quot;Scripted block&quot;
                script <span class="token punctuation">{</span>
					def people = <span class="token punctuation">[</span>name<span class="token punctuation">:</span><span class="token string">&#39;zhangsan&#39;</span><span class="token punctuation">,</span>age<span class="token punctuation">:</span><span class="token string">&#39;18&#39;</span><span class="token punctuation">,</span>sex<span class="token punctuation">:</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span>height<span class="token punctuation">:</span><span class="token string">&#39;180&#39;</span><span class="token punctuation">]</span>
					print &quot;姓名为：$<span class="token punctuation">{</span>people.name<span class="token punctuation">}</span>，年龄为：$<span class="token punctuation">{</span>people.age<span class="token punctuation">}</span>，性别为：$<span class="token punctuation">{</span>people.sex<span class="token punctuation">}</span>，身高为：$<span class="token punctuation">{</span>people.height<span class="token punctuation">}</span>&quot;
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出的结果为：</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1a9fdfb805c54e5886353f562f940c92.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h3 id="条件语句-if-else判断" tabindex="-1"><a class="header-anchor" href="#条件语句-if-else判断" aria-hidden="true">#</a> 条件语句 if/else判断</h3><p>pipeline脚本同其它脚本语言一样，从上至下顺序执行，它的流程控制取决于Groovy表达式，如if/else条件语句：</p><ul><li>语法：</li></ul><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>条件<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	echo <span class="token interpolation-string"><span class="token string">&quot;要输出的值&quot;</span></span>
<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
	echo <span class="token interpolation-string"><span class="token string">&quot;要输出的值2&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>script</code> 示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>pipeline <span class="token punctuation">{</span>
    agent any
    
    stages <span class="token punctuation">{</span>
        stage(&#39;script <span class="token punctuation">-</span><span class="token punctuation">-</span> if/else&#39;) <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                echo &quot;Scripted block&quot;
                script <span class="token punctuation">{</span>
					if(env.BRANCH_NAME == &#39;master&#39;)<span class="token punctuation">{</span>
					    echo &#39;I only execute on the master branch&#39;
					<span class="token punctuation">}</span>else<span class="token punctuation">{</span>
					    echo &#39;I execute elsewhere&#39;
					<span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>判断，如果是在master分支上执行的那么就输出：<code>I only execute on the master branch</code>，否则就输出：<code>I execute elsewhere</code>；</p>`,86),N={href:"http://ip:port/job/my_pipeline/pipeline-syntax/globals",target:"_blank",rel:"noopener noreferrer"},A=i(`<p>执行结果为：<code>I execute elsewhere</code>，因为我们没有开启多分支所以没有分支的说法，所以是false判断；</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/2070c2ba46324143957acc44e75751e7.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h3 id="for循环" tabindex="-1"><a class="header-anchor" href="#for循环" aria-hidden="true">#</a> for循环</h3><p>for 循环用于遍历一组值。用法和JAVA是一样的；</p><ul><li>for循环语法：</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>for<span class="token punctuation">(</span>int i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">;</span>i++<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	println <span class="token string">&quot;循环第<span class="token variable">\${i}</span>次&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在Jenkins的<code>script</code>中使用：</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>pipeline <span class="token punctuation">{</span>
    agent any
    
    stages <span class="token punctuation">{</span>
        stage(&#39;script <span class="token punctuation">-</span><span class="token punctuation">-</span> for&#39;) <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                echo &quot;Scripted block&quot;
                script <span class="token punctuation">{</span>
					for(int i = 1;i&lt;=5;i++) <span class="token punctuation">{</span>
	                    println &quot;循环第$<span class="token punctuation">{</span>i<span class="token punctuation">}</span>次&quot;;
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/8cfa0dc6de944fe5a523100bef531174.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><ul><li>进阶for循环，在Jenkins的<code>script</code>中使用：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pipeline {
    agent any
    
    stages {
        stage(&#39;script -- for&#39;) {
            steps {
                echo &quot;Scripted block&quot;
                script {
					def array = [&#39;language&#39;,&#39;mathematics&#39;,&#39;English&#39;]
					for (i = 0;i &lt; array.size();i++) {
					    echo &quot;This is \${array[i]}, The \${i}th array;&quot;
					}
                }
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果：</p><figure><img src="https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/43549d0ba9da4910a89ef682273a6d6f.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h3 id="异常处理try-catch-finally" tabindex="-1"><a class="header-anchor" href="#异常处理try-catch-finally" aria-hidden="true">#</a> 异常处理try/catch/finally</h3><p>pipeline脚本流程控制的另一种方式是Groovy的异常处理机制。当任何一个步骤因各种原因而出现异常时，都必须在Groovy中使用try/catch/finally语句块进行处理</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>pipeline <span class="token punctuation">{</span>  
    agent any  
  
    stages <span class="token punctuation">{</span>  
        stage(&#39;Example Stage with Exception Handling&#39;) <span class="token punctuation">{</span>  
            steps <span class="token punctuation">{</span>  
                script <span class="token punctuation">{</span>  
                    try <span class="token punctuation">{</span>  
                        // 尝试执行的代码块  
                        echo &quot;Trying to execute some code<span class="token punctuation">...</span>&quot;  
                        // 这里可以调用其他函数或执行可能抛出异常的步骤  
                        // 例如，模拟一个异常：  
                        throw new Exception(&quot;Something went wrong<span class="token tag">!</span>&quot;)  
                    <span class="token punctuation">}</span> catch (Exception e) <span class="token punctuation">{</span>  
                        // 捕获并处理异常  
                        <span class="token key atrule">echo &quot;Caught an exception</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>e.getMessage()<span class="token punctuation">}</span>&quot;  
                        // 可以选择标记构建为失败，或者进行其他错误处理  
                        currentBuild.result = &#39;FAILURE&#39;  
                    <span class="token punctuation">}</span> finally <span class="token punctuation">{</span>  
                        // 无论是否发生异常，都会执行的代码块  
                        echo &quot;This will always be executed<span class="token punctuation">,</span> regardless of exceptions.&quot;  
                        // 可以在这里执行清理操作或其他必要的步骤  
                    <span class="token punctuation">}</span>  
                <span class="token punctuation">}</span>  
            <span class="token punctuation">}</span>  
        <span class="token punctuation">}</span>  
    <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<code>try</code> 块包含可能会抛出异常的代码。如果 <code>try</code> 块中的代码抛出了异常，那么控制流会立即跳转到与异常类型匹配的 <code>catch</code> 块（在这个例子中是 <code>Exception</code> 类型）。在 <code>catch</code> 块中，你可以处理异常，比如记录错误消息或者设置构建的状态。</p><p>无论 <code>try</code> 块中的代码是否抛出异常，<code>finally</code> 块中的代码都会被执行。这通常用于执行清理操作，比如关闭文件句柄、释放资源等。</p><p>请注意，在 Jenkins Pipeline 脚本中，使用 <code>currentBuild.result = &#39;FAILURE&#39;</code> 可以将构建状态标记为失败。这通常在捕获到异常并希望停止构建流程时非常有用。如果 <code>finally</code> 块中的代码也可能失败，你可能还需要在 <code>finally</code> 块中进一步处理异常，以确保所有的清理工作都能正确完成。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><blockquote><p>  这一节，基本上对<code>jenkins</code>的<code>pipeline</code>脚本式流水线及groovy语法做了比较完整的介绍，在以后再看pipeline脚本时，可能还会接触到许多插件提供的函数或更多的指令，但是它们都逃不开pipeline脚本的基本结构，掌握了基础语法，后面才能更上一层楼。</p></blockquote><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献：</h2>`,22),I=n("p",null,"文章参考与：",-1),B={href:"https://zhuanlan.zhihu.com/p/618808986",target:"_blank",rel:"noopener noreferrer"},C={href:"https://zhuanlan.zhihu.com/p/662830371",target:"_blank",rel:"noopener noreferrer"},L=n("br",null,null,-1),H={href:"https://zhuanlan.zhihu.com/p/74792026",target:"_blank",rel:"noopener noreferrer"},P=n("h2",{id:"相关专栏",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#相关专栏","aria-hidden":"true"},"#"),s(" 相关专栏")],-1),T=n("thead",null,[n("tr",null,[n("th",null,"专栏名称"),n("th",null,"专栏地址")])],-1),M={href:"https://blog.csdn.net/liu_chen_yang/category_12493057.html",target:"_blank",rel:"noopener noreferrer"},V={href:"https://blog.csdn.net/liu_chen_yang/category_12493057.html",target:"_blank",rel:"noopener noreferrer"},F={href:"https://blog.csdn.net/liu_chen_yang/category_12473478.html",target:"_blank",rel:"noopener noreferrer"},R={href:"https://blog.csdn.net/liu_chen_yang/category_12473478.html",target:"_blank",rel:"noopener noreferrer"},D={href:"https://blog.csdn.net/liu_chen_yang/category_10887074.html",target:"_blank",rel:"noopener noreferrer"},U={href:"https://blog.csdn.net/liu_chen_yang/category_10887074.html",target:"_blank",rel:"noopener noreferrer"},K=n("h2",{id:"相关文章",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#相关文章","aria-hidden":"true"},"#"),s(" 相关文章")],-1),O=n("thead",null,[n("tr",null,[n("th",null,"文章名称"),n("th",null,"文章链接")])],-1),Q={href:"https://liucy.blog.csdn.net/article/details/136528857",target:"_blank",rel:"noopener noreferrer"},W={href:"https://liucy.blog.csdn.net/article/details/136528857",target:"_blank",rel:"noopener noreferrer"},X={href:"https://liucy.blog.csdn.net/article/details/136567517",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://liucy.blog.csdn.net/article/details/136567517",target:"_blank",rel:"noopener noreferrer"};function Z(nn,sn){const e=l("ExternalLinkIcon"),t=l("font");return o(),u("div",null,[d,n("blockquote",null,[v,n("p",null,[s("  🏅"),n("a",m,[s("CSDN博客专家"),a(e)]),b,s("   🏅"),n("a",k,[s("云计算领域优质创作者"),a(e)]),g,s("   🏅"),n("a",h,[s("华为云开发者社区专家博主"),a(e)]),f,s("   🏅"),n("a",y,[s("阿里云开发者社区专家博主"),a(e)]),_,s(" 💊"),q,n("a",x,[s("运维交流社区"),a(e)]),s(" 欢迎大家的加入！"),j,s(" 🐋 希望大家多多支持，我们一起进步！😄"),$,s(" 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗")])]),S,z,n("blockquote",null,[n("p",null,[s("学习脚本式流水线，我们先学"),J,s("语法；"),a(t,{color:"red"},{default:p(()=>[s("脚本式流水线都是运行在"),w,s("中的。")]),_:1})])]),G,n("p",null,[s("在Groovy中，使用单引号括住的字符串就是java.lang.String，"),a(t,{color:"red"},{default:p(()=>[s("不支持插值：")]),_:1})]),E,a(t,{color:"red"},{default:p(()=>[s("env.BRANCH_NAME")]),_:1}),s("是流水线语法中的全局变量，可在此查看全局变量都有什么："),n("a",N,[s("http://ip:port/job/my_pipeline/pipeline-syntax/globals"),a(e)]),n("blockquote",null,[n("p",null,[s("注："),a(t,{color:"red"},{default:p(()=>[s("ip:port")]),_:1}),s(" 替换为自己的ip和端口")])]),A,n("blockquote",null,[I,n("p",null,[n("a",B,[s("【Jenkins系列】-Pipeline语法全集"),a(e)])]),n("p",null,[n("a",C,[s("jenkins 原理篇——pipeline流水线 声明式语法详解"),a(e)]),L,n("a",H,[s("Jenkins扩展篇-Groovy语法简介"),a(e)])])]),P,n("table",null,[T,n("tbody",null,[n("tr",null,[n("td",null,[n("a",M,[s("《Jenkins》"),a(e)])]),n("td",null,[n("a",V,[s("https://blog.csdn.net/liu_chen_yang/category_12493057.html"),a(e)])])]),n("tr",null,[n("td",null,[n("a",F,[s("《自动化运维》"),a(e)])]),n("td",null,[n("a",R,[s("https://blog.csdn.net/liu_chen_yang/category_12473478.html"),a(e)])])]),n("tr",null,[n("td",null,[n("a",D,[s("《Linux从入门到精通》"),a(e)])]),n("td",null,[n("a",U,[s("https://blog.csdn.net/liu_chen_yang/category_10887074.html"),a(e)])])])])]),K,n("table",null,[O,n("tbody",null,[n("tr",null,[n("td",null,[n("a",Q,[s("【Jenkins】Pipeline流水线语法解析全集 -- 声明式流水线"),a(e)])]),n("td",null,[n("a",W,[s("https://liucy.blog.csdn.net/article/details/136528857"),a(e)])])]),n("tr",null,[n("td",null,[n("a",X,[s("【Jenkins】Pipeline流水线语法解析全集 -- 脚本式流水线、groovy语法"),a(e)])]),n("td",null,[n("a",Y,[s("https://liucy.blog.csdn.net/article/details/136567517"),a(e)])])])])])])}const tn=c(r,[["render",Z],["__file","【Jenkins】Pipeline流水线语法解析全集 -- 脚本式流水线、groovy语法.html.vue"]]);export{tn as default};
