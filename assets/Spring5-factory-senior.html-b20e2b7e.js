import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,e}from"./app-8d307529.js";const t={},o=e(`<h2 id="_1-对象的生命周期" tabindex="-1"><a class="header-anchor" href="#_1-对象的生命周期" aria-hidden="true">#</a> 1. 对象的生命周期</h2><h3 id="_1-1-什么是对象的生命周期" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是对象的生命周期" aria-hidden="true">#</a> 1.1 什么是对象的生命周期</h3><p>含义：一个对象创建、存活、消亡的一个完整过程。</p><h3 id="_1-2-为什么要学习对象的生命周期" tabindex="-1"><a class="header-anchor" href="#_1-2-为什么要学习对象的生命周期" aria-hidden="true">#</a> 1.2 为什么要学习对象的生命周期</h3><p>由 <code>Spring</code> 负责对象的创建、存活、销毁，了解生命周期，有利于我们使用好Spring为我们创建的对象。</p><h3 id="_1-3-声明周期的三个阶段" tabindex="-1"><a class="header-anchor" href="#_1-3-声明周期的三个阶段" aria-hidden="true">#</a> 1.3 声明周期的三个阶段</h3><h4 id="_1-创建阶段" tabindex="-1"><a class="header-anchor" href="#_1-创建阶段" aria-hidden="true">#</a> 1. 创建阶段</h4><ul><li><p><code>scope=&quot;singleton&quot;</code></p><p>此时会在创建Spring工厂时，创建对象。</p><p>注意：如果同时设置了<code>lazy-init=&quot;true&quot;</code>，那么会在获取对象<code>ctx.getBean(&quot;&quot;)</code>时创建。</p></li><li><p><code>scope=&quot;prototype&quot;</code></p><p>Spring工厂会在获取对象时，创建对象，即调用<code>ctx.getBean(&quot;&quot;)</code>方法时创建。</p></li></ul><p>注意：如果有属性需要注入(DI)，会在创建完成时立即进行注入。</p><h4 id="_2-初始化阶段" tabindex="-1"><a class="header-anchor" href="#_2-初始化阶段" aria-hidden="true">#</a> 2. 初始化阶段</h4><p><em><strong>创建阶段完成后，Spring会调用对象的初始化方法，完成对应的初始化操作。</strong></em></p><p>程序员提供初始化方法的途径：</p><ol><li><p>实现<code>InitializingBean</code>接口：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//实现这个方法，完成初始化操作</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">afterProperitesSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>对象中提供一个普通的方法同时配置Spring配置文件：</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">myInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>细节分析：</p><ul><li><p>如果一个对象即实现InitializingBean，同时又提供的普通的初始化方法 ，顺序：</p><blockquote><ol><li>InitializingBean</li><li>普通初始化方法</li></ol></blockquote></li><li><p>注入一定发生在初始化操作的前面</p></li><li><p>什么叫做初始化操作：资源的初始化：数据库、IO、网络 …</p></li></ul></li></ol><h4 id="_3-销毁阶段" tabindex="-1"><a class="header-anchor" href="#_3-销毁阶段" aria-hidden="true">#</a> 3. 销毁阶段</h4><p><em><strong>Spring销毁对象<code>ctx.close();</code>前，会调用对象的销毁方法，完成销毁操作</strong></em></p><p>程序员定义销毁方法的途径：</p><ol><li><p>实现DisposableBean</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token keyword">throws</span> <span class="token class-name">Exception</span><span class="token punctuation">{</span>
  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>定义一个普通的销毁方法同时配置Spring配置文件：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">myDestroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token keyword">throws</span> <span class="token class-name">Exception</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">init-method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">destroy-method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>myDestroy<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><p>细节分析：</p><ul><li>销毁方法的操作只适用于 <code>scope=&quot;singleton&quot;</code></li><li>销毁操作主要指资源的释放操作，比如<code>io.close();</code> <code>connection.close();</code></li></ul><h2 id="_2-配置文件参数化" tabindex="-1"><a class="header-anchor" href="#_2-配置文件参数化" aria-hidden="true">#</a> 2. 配置文件参数化</h2><h3 id="_2-1-什么是配置文件参数化" tabindex="-1"><a class="header-anchor" href="#_2-1-什么是配置文件参数化" aria-hidden="true">#</a> 2.1 什么是配置文件参数化</h3><p>把Spring配置文件中需要经常修改的字符串信息，转移到一个更小的配置文件中。</p><blockquote><ol><li>Spring的配置文件中存在需要经常修改的字符串？<br> 存在 以数据库连接相关的参数 代表</li><li>经常变化字符串，在Spring的配置文件中，直接修改<br> 不利于项目维护(修改)</li><li>转移到一个小的配置文件(.properties)<br> 利于维护(修改)</li></ol><p>配置文件参数化：利于Spring配置文件的维护(修改)</p></blockquote><h3 id="_2-2-配置文件参数化的开发步骤" tabindex="-1"><a class="header-anchor" href="#_2-2-配置文件参数化的开发步骤" aria-hidden="true">#</a> 2.2 配置文件参数化的开发步骤:</h3><h4 id="_1-提供一个小的配置文件" tabindex="-1"><a class="header-anchor" href="#_1-提供一个小的配置文件" aria-hidden="true">#</a> 1. 提供一个小的配置文件</h4><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token comment"># 名字：随便</span>
<span class="token comment"># 放置位置：随便</span>

<span class="token key attr-name">jdbc.driverClassName</span> <span class="token punctuation">=</span> <span class="token value attr-value">com.mysql.jdbc.Driver</span>
<span class="token key attr-name">jdbc.url</span> <span class="token punctuation">=</span> <span class="token value attr-value">jdbc:mysql://localhost:3306/test?useSSL=false</span>
<span class="token key attr-name">jdbc.username</span> <span class="token punctuation">=</span> <span class="token value attr-value">root</span>
<span class="token key attr-name">jdbc.password</span> <span class="token punctuation">=</span> <span class="token value attr-value">root</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-spring的配置文件与小配置文件进行整合" tabindex="-1"><a class="header-anchor" href="#_2-spring的配置文件与小配置文件进行整合" aria-hidden="true">#</a> 2. Spring的配置文件与小配置文件进行整合</h4><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>property-placeholder</span> <span class="token attr-name">location</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>classpath:/db.properties<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-在spring配置文件中通过-key-获取小配置文件中对应的值" tabindex="-1"><a class="header-anchor" href="#_3-在spring配置文件中通过-key-获取小配置文件中对应的值" aria-hidden="true">#</a> 3. 在Spring配置文件中通过<code>\${key}</code>获取小配置文件中对应的值</h4><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291501239.png" alt="image-20200928215903162" tabindex="0" loading="lazy"><figcaption>image-20200928215903162</figcaption></figure><h2 id="_3-自定义类型转换器" tabindex="-1"><a class="header-anchor" href="#_3-自定义类型转换器" aria-hidden="true">#</a> 3. 自定义类型转换器</h2><h3 id="_1-什么是类型转换器" tabindex="-1"><a class="header-anchor" href="#_1-什么是类型转换器" aria-hidden="true">#</a> 1. 什么是类型转换器</h3><blockquote><p>Spring 提供了一种 Converter（类型转换器）的类型转换工具。在 Spring MVC 中，它的作用是在控制器方法对请求进行处理前，先获取到请求发送过来的参数，并将其转换为控制器方法指定的数据类型，然后再将转换后的参数值传递给控制器方法的形参，这样后台的控制器方法就可以正确地获取请求中携带的参数了。</p></blockquote><p>Spring MVC 框架默认提供了许多内置的类型转换器，主要包括以下几种类型。</p><h4 id="_1-1-标量转换器" tabindex="-1"><a class="header-anchor" href="#_1-1-标量转换器" aria-hidden="true">#</a> 1.1 标量转换器</h4><table><thead><tr><th>名称</th><th>作用</th></tr></thead><tbody><tr><td>StringToBooleanConverter</td><td>String 到 boolean 类型转换</td></tr><tr><td>ObjectToStringConverter</td><td>Object 到 String 转换，调用 toString 方法转换</td></tr><tr><td>StringToNumberConverterFactory</td><td>String 到数字转换（例如 Integer、Long 等）</td></tr><tr><td>NumberToNumberConverterFactory</td><td>数字子类型（基本类型）到数字类型（包装类型）转换</td></tr><tr><td>StringToCharacterConverter</td><td>String 到 Character 转换，取字符串中的第一个字符</td></tr><tr><td>NumberToCharacterConverter</td><td>数字子类型到 Character 转换</td></tr><tr><td>CharacterToNumberFactory</td><td>Character 到数字子类型转换</td></tr><tr><td>StringToEnumConverterFactory</td><td>String 到枚举类型转换，通过 Enum.valueOf 将字符串转换为需要的枚举类型</td></tr><tr><td>EnumToStringConverter</td><td>枚举类型到 String 转换，返回枚举对象的 name 值</td></tr><tr><td>StringToLocaleConverter</td><td>String 到 java.util.Locale 转换</td></tr><tr><td>PropertiesToStringConverter</td><td>java.util.Properties 到 String 转换，默认通过 ISO-8859-1 解码</td></tr><tr><td>StringToPropertiesConverter</td><td>String 到 java.util.Properties 转换，默认使用 ISO-8859-1 编码</td></tr></tbody></table><h4 id="_1-2-集合、数组相关转换器" tabindex="-1"><a class="header-anchor" href="#_1-2-集合、数组相关转换器" aria-hidden="true">#</a> 1.2 集合、数组相关转换器</h4><table><thead><tr><th>名称</th><th>作用</th></tr></thead><tbody><tr><td>ArrayToCollectionConverter</td><td>任意数组到任意集合（List、Set）转换</td></tr><tr><td>CollectionToArrayConverter</td><td>任意集合到任意数组转换</td></tr><tr><td>ArrayToArrayConverter</td><td>任意数组到任意数组转换</td></tr><tr><td>CollectionToCollectionConverter</td><td>集合之间的类型转换</td></tr><tr><td>MapToMapConverter</td><td>Map之间的类型转换</td></tr><tr><td>ArrayToStringConverter</td><td>任意数组到 String 转换</td></tr><tr><td>StringToArrayConverter</td><td>字符串到数组的转换，默认通过“，”分割，且去除字符串两边的空格（trim）</td></tr><tr><td>ArrayToObjectConverter</td><td>任意数组到 Object 的转换，如果目标类型和源类型兼容，直接返回源对象；否则返回数组的第一个元素并进行类型转换</td></tr><tr><td>ObjectToArrayConverter</td><td>Object 到单元素数组转换</td></tr><tr><td>CollectionToStringConverter</td><td>任意集合（List、Set）到 String 转换</td></tr><tr><td>StringToCollectionConverter</td><td>String 到集合（List、Set）转换，默认通过“，”分割，且去除字符串两边的空格（trim）</td></tr><tr><td>CollectionToObjectConverter</td><td>任意集合到任意 Object 的转换，如果目标类型和源类型兼容，直接返回源对象；否则返回集合的第一个元素并进行类型转换</td></tr><tr><td>ObjectToCollectionConverter</td><td>Object 到单元素集合的类型转换</td></tr></tbody></table><p>Spring MVC 对于基本类型（例如 int、long、float、double、boolean 以及 char 等）已经做好了基本类型转换。因此，通常情况下 Spring MVC 提供的这些类型转换器可以满足开发人员大多数的类型转换需求的。</p><blockquote><p>注意：在使用内置类型转换器时，请求参数输入值需要与接收参数类型相兼容，否则会报 400 错误。</p></blockquote><h3 id="_2-类型转换器的作用" tabindex="-1"><a class="header-anchor" href="#_2-类型转换器的作用" aria-hidden="true">#</a> 2. 类型转换器的作用</h3><p>Spring通过类型转换器把配置文件中字符串类型的数据，转换成对象中成员变量对应类型的数据，进而完成了注入。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291501939.png" alt="image-20200418201732220" tabindex="0" loading="lazy"><figcaption>image-20200418201732220</figcaption></figure><h3 id="_3-为什么要自定义类型转换器" tabindex="-1"><a class="header-anchor" href="#_3-为什么要自定义类型转换器" aria-hidden="true">#</a> 3. 为什么要自定义类型转换器？</h3><p>原因：实际应用中需要转换某种特定的类型，且Spring内部没有提供这种类型转换器时，需要程序员自己定义。</p><h3 id="_4-自定义类型转换器的开发步骤" tabindex="-1"><a class="header-anchor" href="#_4-自定义类型转换器的开发步骤" aria-hidden="true">#</a> 4. 自定义类型转换器的开发步骤</h3><h4 id="_4-1-实现-converter-接口" tabindex="-1"><a class="header-anchor" href="#_4-1-实现-converter-接口" aria-hidden="true">#</a> 4.1 实现 <code>Converter&lt;&gt;</code>接口</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyDateConverter</span> <span class="token keyword">implements</span> <span class="token class-name">Converter</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Date</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token comment">/*
    convert方法作用：String ---&gt;  Date
                   SimpleDateFormat sdf = new SimpleDateFormat();
                   sdf.parset(String) ---&gt; Date
    param:source 代表的是配置文件中 日期字符串 &lt;value&gt;2020-10-11&lt;/value&gt;

    return : 当把转换好的Date作为convert方法的返回值后，Spring自动的为birthday属性进行注入（赋值）

    */</span>
    <span class="token keyword">public</span> <span class="token class-name">Date</span> <span class="token function">convert</span><span class="token punctuation">(</span><span class="token class-name">String</span> source<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Date</span> date <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">SimpleDateFormat</span> sdf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            date <span class="token operator">=</span> sdf<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ParseException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> date<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-2-在spring的配置文件中进行配置" tabindex="-1"><a class="header-anchor" href="#_4-2-在spring的配置文件中进行配置" aria-hidden="true">#</a> 4.2 在Spring的配置文件中进行配置</h4><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- 创建自定义转换器对象 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>myDateConverter<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.yuziyan.converter.MyDateConverter<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>

<span class="token comment">&lt;!-- 在Spring中注册自定义的转换器 --&gt;</span>
<span class="token comment">&lt;!-- 目的：告知Spring框架，我们所创建的MyDateConverter是一个类型转换器 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>conversionService<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.springframework.context.support.ConversionServiceFactoryBean<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>converters<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>set</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ref</span> <span class="token attr-name">bean</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>myDateConverter<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>set</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- 上面两步完成之后就可以直接使用了 --&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-细节" tabindex="-1"><a class="header-anchor" href="#_5-细节" aria-hidden="true">#</a> 5. 细节</h3><h4 id="_5-1-体会依赖注入-di" tabindex="-1"><a class="header-anchor" href="#_5-1-体会依赖注入-di" aria-hidden="true">#</a> 5.1 体会依赖注入(DI)</h4><p><code>MyDateConverter</code>中的日期的格式，可以通过依赖注入的方式，由配置文件完成赋值。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyDateConverter</span> <span class="token keyword">implements</span> <span class="token class-name">Converter</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Date</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> pattern<span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPattern</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> pattern<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setPattern</span><span class="token punctuation">(</span><span class="token class-name">String</span> pattern<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>pattern <span class="token operator">=</span> pattern<span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token comment">/*
        convert方法作用：String ---&gt;  Date
                       SimpleDateFormat sdf = new SimpleDateFormat();
                       sdf.parset(String) ---&gt; Date
        param:source 代表的是配置文件中 日期字符串 &lt;value&gt;2020-10-11&lt;/value&gt;

        return : 当把转换好的Date作为convert方法的返回值后，Spring自动的为birthday属性进行注入（赋值）

        */</span>
    <span class="token keyword">public</span> <span class="token class-name">Date</span> <span class="token function">convert</span><span class="token punctuation">(</span><span class="token class-name">String</span> source<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Date</span> date <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">SimpleDateFormat</span> sdf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span>pattern<span class="token punctuation">)</span><span class="token punctuation">;</span>
            date <span class="token operator">=</span> sdf<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ParseException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> date<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span>创建自定义类型转换器对象<span class="token operator">--</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>bean id<span class="token operator">=</span><span class="token string">&quot;myDateConverter&quot;</span> <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;com.yuziyan.converter.MyDateConverter&quot;</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>property name<span class="token operator">=</span><span class="token string">&quot;pattern&quot;</span> value<span class="token operator">=</span><span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>bean<span class="token operator">&gt;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h5 id="conversionsevicefactorybean-定义id属性-值必须是-conversionservice" tabindex="-1"><a class="header-anchor" href="#conversionsevicefactorybean-定义id属性-值必须是-conversionservice" aria-hidden="true">#</a> <code>ConversionSeviceFactoryBean</code> 定义id属性，值必须是 <code>conversionService</code></h5></blockquote><h4 id="_5-2-spring框架内置日期类型的转换器" tabindex="-1"><a class="header-anchor" href="#_5-2-spring框架内置日期类型的转换器" aria-hidden="true">#</a> 5.2 Spring框架内置日期类型的转换器</h4><blockquote><p>日期格式：2020/05/01 (不支持 ：2020-05-01)</p></blockquote><h2 id="_6-后置处理bean" tabindex="-1"><a class="header-anchor" href="#_6-后置处理bean" aria-hidden="true">#</a> 6. 后置处理Bean</h2><h3 id="_6-1-beanpostprocessor的作用" tabindex="-1"><a class="header-anchor" href="#_6-1-beanpostprocessor的作用" aria-hidden="true">#</a> 6.1 BeanPostProcessor的作用：</h3><blockquote><p>对Spring工厂所创建的对象，进行再加工。</p><p>注意：BeanPostProcessor是接口</p></blockquote><h4 id="_1-beanpostprocessor" tabindex="-1"><a class="header-anchor" href="#_1-beanpostprocessor" aria-hidden="true">#</a> 1. BeanPostProcessor</h4><p><em>都是在目标对象被实例化之后，并且属性也被设置之后调用的</em></p><ul><li>postProcessBeforeInitialization <ul><li>在afterPropertiesSet或者自定义的初始化方法(使用@bean注解中的initMethod()属性或者使用xml配置)之前执行</li></ul></li><li>postProcessAfterInitialization <ul><li>在afterPropertiesSet或者自定义的初始化方法之后执行（如果是从<em>FactoryBean</em>中获取的对象，则只有这个方法会起作用，，postProcessBeforeInitialization以及afterPropertiesSet或者自定义的初始化方法都不会有作用）</li></ul></li></ul><h4 id="_2-instantiationawarebeanpostprocessor" tabindex="-1"><a class="header-anchor" href="#_2-instantiationawarebeanpostprocessor" aria-hidden="true">#</a> 2. InstantiationAwareBeanPostProcessor</h4><p>InstantiationAwareBeanPostProcessor接口继承BeanPostProcessor接口，它内部提供了3个方法，再加上BeanPostProcessor接口内部的2个方法，所以实现这个接口需要实现5个方法。InstantiationAwareBeanPostProcessor接口的主要作用在于目标对象的实例化过程中需要处理的事情，包括实例化对象的前后过程以及实例的属性设置</p><p>在org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#createBean()方法的Object bean = resolveBeforeInstantiation(beanName, mbdToUse);方法里面执行了这个后置处理器</p><ul><li>postProcessBeforeInstantiation <ul><li>在目标对象实例化之前调用，方法的返回值类型是Object，我们可以返回任何类型的值。由于这个时候目标对象还未实例化，所以这个返回值可以用来代替原本该生成的目标对象的实例(一般都是代理对象)。如果该方法的返回值代替原本该生成的目标对象，后续只有postProcessAfterInitialization方法会调用，其它方法不再调用；否则按照正常的流程走</li></ul></li><li>postProcessAfterInstantiation <ul><li>方法在目标对象实例化之后调用，这个时候对象已经被实例化，但是该实例的属性还未被设置，都是null。如果该方法返回false，会忽略属性值的设置；如果返回true，会按照正常流程设置属性值。</li></ul></li><li>postProcessPropertyValues <ul><li>方法对属性值进行修改(这个时候属性值还未被设置，但是我们可以修改原本该设置进去的属性值)。如果postProcessAfterInstantiation方法返回false，该方法不会被调用。可以在该方法内对属性值进行修改</li></ul></li><li>postProcessBeforeInitialization&amp;postProcessAfterInitialization <ul><li>父接口BeanPostProcessor的2个方法</li></ul></li></ul><h4 id="_3-smartinstantiationawarebeanpostprocessor" tabindex="-1"><a class="header-anchor" href="#_3-smartinstantiationawarebeanpostprocessor" aria-hidden="true">#</a> 3. SmartInstantiationAwareBeanPostProcessor</h4><p>智能实例化Bean后置处理器（继承InstantiationAwareBeanPostProcessor）</p><ul><li>determineCandidateConstructors <ul><li>检测Bean的构造器，可以检测出多个候选构造器(Java好像只会确定唯一的备选的构造器)</li></ul></li><li>getEarlyBeanReference <ul><li>循环引用的后置处理器，这个东西比较复杂， 获得提前暴露的bean引用。主要用于解决循环引用的问题，只有单例对象才会调用此方法</li></ul></li><li>predictBeanType <ul><li>预测bean的类型，在最后的类型转化时会用到</li></ul></li></ul><h4 id="_4-mergedbeandefinitionpostprocessor" tabindex="-1"><a class="header-anchor" href="#_4-mergedbeandefinitionpostprocessor" aria-hidden="true">#</a> 4. MergedBeanDefinitionPostProcessor</h4><ul><li>postProcessMergedBeanDefinition <ul><li>缓存bean的注入信息的后置处理器，仅仅是缓存或者干脆叫做查找更加合适，没有完成注入，注入是另外一个后置处理器的作用（不实现这个方法，也能直接调用postProcessPropertyValues完成属性值的注入）</li></ul></li></ul><h4 id="_5-destructionawarebeanpostprocessor" tabindex="-1"><a class="header-anchor" href="#_5-destructionawarebeanpostprocessor" aria-hidden="true">#</a> 5. DestructionAwareBeanPostProcessor</h4><ul><li>postProcessBeforeDestruction <ul><li>在bean实例被销毁之前被调用</li></ul></li></ul><h3 id="_6-2-后置处理bean的运行原理分析" tabindex="-1"><a class="header-anchor" href="#_6-2-后置处理bean的运行原理分析" aria-hidden="true">#</a> 6.2 后置处理Bean的运行原理分析</h3><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/202305291501381.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><blockquote><p>程序员实现BeanPostProcessor规定接口中的方法：</p><p>参数一：Spring工厂创建好的对象<br> 参数二：对象名字<br> 返回值：返回的对象会交给Spring框架<br> Object postProcessBeforeInitiallization(Object bean String beanName)<br> 作用：Spring创建完对象，并进行注入后，会运行Before方法进行加工</p><p>Object postProcessAfterInitiallization(Object bean String beanName)<br> 作用：Spring执行完对象的初始化操作后，会运行After方法进行加工</p><p>实战中：<br> 很少处理Spring的初始化操作：没有必要区分Before After。只需要实现其中的一个After方法即可<br> 注意：<br> postProcessBeforeInitiallization(){<br> return bean对象<br> }</p></blockquote><h3 id="_6-3-beanpostprocessor的开发步骤" tabindex="-1"><a class="header-anchor" href="#_6-3-beanpostprocessor的开发步骤" aria-hidden="true">#</a> 6.3 BeanPostProcessor的开发步骤</h3><h4 id="_1-实现-beanpostprocessor接口" tabindex="-1"><a class="header-anchor" href="#_1-实现-beanpostprocessor接口" aria-hidden="true">#</a> 1. 实现 BeanPostProcessor接口</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyBeanPostProcessor</span> <span class="token keyword">implements</span> <span class="token class-name">BeanPostProcessor</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">postProcessBeforeInitialization</span><span class="token punctuation">(</span><span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> bean<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">postProcessAfterInitialization</span><span class="token punctuation">(</span><span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>

        <span class="token class-name">Categroy</span> categroy <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Categroy</span><span class="token punctuation">)</span> bean<span class="token punctuation">;</span>
        categroy<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;xiaowb&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token keyword">return</span> categroy<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-spring的配置文件中进行配置" tabindex="-1"><a class="header-anchor" href="#_2-spring的配置文件中进行配置" aria-hidden="true">#</a> 2. Spring的配置文件中进行配置</h4><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>myBeanPostProcessor<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>xxx.MyBeanPostProcessor<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-beanpostprocessor细节" tabindex="-1"><a class="header-anchor" href="#_3-beanpostprocessor细节" aria-hidden="true">#</a> 3. BeanPostProcessor细节</h4><p>BeanPostProcessor会对Spring工厂中所有创建的对象进行加工。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>`,85),p=[o];function i(r,c){return a(),s("div",null,p)}const u=n(t,[["render",i],["__file","Spring5-factory-senior.html.vue"]]);export{u as default};
