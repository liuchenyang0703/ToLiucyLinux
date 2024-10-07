import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as t,c as l,a as d,b as e,d as a,e as r}from"./app-8d307529.js";const v={},m={class:"hint-container tip"},c=d("p",{class:"hint-container-title"},"友情提示",-1),u=d("strong",null,"转载须知",-1),b={href:"https://www.bilibili.com/video/BV1iq4y1u7vj?p=1&vd_source=cea816a08805c218ac4390ae9b61ae31",target:"_blank",rel:"noopener noreferrer"},E=r(`<h2 id="_1-函数的理解" tabindex="-1"><a class="header-anchor" href="#_1-函数的理解" aria-hidden="true">#</a> 1. 函数的理解</h2><h3 id="_1-1-什么是函数" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是函数" aria-hidden="true">#</a> 1.1 什么是函数</h3><p>函数在计算机语言的使用中贯穿始终，函数的作用是什么呢？它可以把我们经常使用的代码封装起来，需要的时候直接调用即可。这样既<code>提高了代码效率</code>，又<code>提高了可维护性</code>。在 SQL 中我们也可以使用函数对检索出来的数据进行函数操作。使用这些函数，可以极大地<code>提高用户对数据库的管理效率</code>。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554979529525.png" alt="1554979529525" tabindex="0" loading="lazy"><figcaption>1554979529525</figcaption></figure><p>从函数定义的角度出发，我们可以将函数分成<code>内置函数</code>和<code>自定义函数</code>。在 SQL 语言中，同样也包括了内置函数和自定义函数。内置函数是系统内置的通用函数，而自定义函数是我们根据自己的需要编写的，本章及下一章讲解的是 SQL 的内置函数。</p><h3 id="_1-2-不同dbms函数的差异" tabindex="-1"><a class="header-anchor" href="#_1-2-不同dbms函数的差异" aria-hidden="true">#</a> 1.2 不同DBMS函数的差异</h3><p>我们在使用 SQL 语言的时候，不是直接和这门语言打交道，而是通过它使用不同的数据库软件，即 DBMS。<strong>DBMS 之间的差异性很大，远大于同一个语言不同版本之间的差异。<strong>实际上，只有很少的函数是被 DBMS 同时支持的。比如，大多数 DBMS 使用（||）或者（+）来做拼接符，而在 MySQL 中的字符串拼接函数为concat()。大部分 DBMS 会有自己特定的函数，这就意味着</strong>采用 SQL 函数的代码可移植性是很差的</strong>，因此在使用函数的时候需要特别注意。</p><h3 id="_1-3-mysql的内置函数及分类" tabindex="-1"><a class="header-anchor" href="#_1-3-mysql的内置函数及分类" aria-hidden="true">#</a> 1.3 MySQL的内置函数及分类</h3><p>MySQL提供了丰富的内置函数，这些函数使得数据的维护与管理更加方便，能够更好地提供数据的分析与统计功能，在一定程度上提高了开发人员进行数据分析与统计的效率。</p><p>MySQL提供的内置函数从<code>实现的功能角度</code>可以分为数值函数、字符串函数、日期和时间函数、流程控制函数、加密与解密函数、获取MySQL信息函数、聚合函数等。这里，我将这些丰富的内置函数再分为两类：<code>单行函数</code>、<code>聚合函数（或分组函数）</code>。</p><p><strong>两种SQL函数</strong></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1555433204337.png" alt="1555433204337" tabindex="0" loading="lazy"><figcaption>1555433204337</figcaption></figure><p><strong>单行函数</strong></p><ul><li>操作数据对象</li><li>接受参数返回一个结果</li><li><strong>只对一行进行变换</strong></li><li><strong>每行返回一个结果</strong></li><li>可以嵌套</li><li>参数可以是一列或一个值</li></ul><h2 id="_2-数值函数" tabindex="-1"><a class="header-anchor" href="#_2-数值函数" aria-hidden="true">#</a> 2. 数值函数</h2><h3 id="_2-1-基本函数" tabindex="-1"><a class="header-anchor" href="#_2-1-基本函数" aria-hidden="true">#</a> 2.1 基本函数</h3><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>ABS(x)</td><td>返回x的绝对值</td></tr><tr><td>SIGN(X)</td><td>返回X的符号。正数返回1，负数返回-1，0返回0</td></tr><tr><td>PI()</td><td>返回圆周率的值</td></tr><tr><td>CEIL(x)，CEILING(x)</td><td>返回大于或等于某个值的最小整数</td></tr><tr><td>FLOOR(x)</td><td>返回小于或等于某个值的最大整数</td></tr><tr><td>LEAST(e1,e2,e3…)</td><td>返回列表中的最小值</td></tr><tr><td>GREATEST(e1,e2,e3…)</td><td>返回列表中的最大值</td></tr><tr><td>MOD(x,y)</td><td>返回X除以Y后的余数</td></tr><tr><td>RAND()</td><td>返回0~1的随机值</td></tr><tr><td>RAND(x)</td><td>返回0~1的随机值，其中x的值用作种子值，相同的X值会产生相同的随机数</td></tr><tr><td>ROUND(x)</td><td>返回一个对x的值进行四舍五入后，最接近于X的整数</td></tr><tr><td>ROUND(x,y)</td><td>返回一个对x的值进行四舍五入后最接近X的值，并保留到小数点后面Y位</td></tr><tr><td>TRUNCATE(x,y)</td><td>返回数字x截断为y位小数的结果</td></tr><tr><td>SQRT(x)</td><td>返回x的平方根。当X的值为负数时，返回NULL</td></tr></tbody></table><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT ABS(-123),ABS(32),SIGN(-23),SIGN(43),PI(),CEIL(32.32),CEILING(-43.23),FLOOR(32.32),
FLOOR(-43.23),MOD(12,5)
FROM DUAL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211025162304844.png" alt="image-20211025162304844" tabindex="0" loading="lazy"><figcaption>image-20211025162304844</figcaption></figure><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT RAND(),RAND(),RAND(10),RAND(10),RAND(-1),RAND(-1)
FROM DUAL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211025162538958.png" alt="image-20211025162538958" tabindex="0" loading="lazy"><figcaption>image-20211025162538958</figcaption></figure><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT ROUND(12.33),ROUND(12.343,2),ROUND(12.324,-1),TRUNCATE(12.66,1),TRUNCATE(12.66,-1)
FROM DUAL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211025162730421.png" alt="image-20211025162730421" tabindex="0" loading="lazy"><figcaption>image-20211025162730421</figcaption></figure><h3 id="_2-2-角度与弧度互换函数" tabindex="-1"><a class="header-anchor" href="#_2-2-角度与弧度互换函数" aria-hidden="true">#</a> 2.2 角度与弧度互换函数</h3><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>RADIANS(x)</td><td>将角度转化为弧度，其中，参数x为角度值</td></tr><tr><td>DEGREES(x)</td><td>将弧度转化为角度，其中，参数x为弧度值</td></tr></tbody></table><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT RADIANS(30),RADIANS(60),RADIANS(90),DEGREES(2*PI()),DEGREES(RADIANS(90))
FROM DUAL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-三角函数" tabindex="-1"><a class="header-anchor" href="#_2-3-三角函数" aria-hidden="true">#</a> 2.3 三角函数</h3><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>SIN(x)</td><td>返回x的正弦值，其中，参数x为弧度值</td></tr><tr><td>ASIN(x)</td><td>返回x的反正弦值，即获取正弦为x的值。如果x的值不在-1到1之间，则返回NULL</td></tr><tr><td>COS(x)</td><td>返回x的余弦值，其中，参数x为弧度值</td></tr><tr><td>ACOS(x)</td><td>返回x的反余弦值，即获取余弦为x的值。如果x的值不在-1到1之间，则返回NULL</td></tr><tr><td>TAN(x)</td><td>返回x的正切值，其中，参数x为弧度值</td></tr><tr><td>ATAN(x)</td><td>返回x的反正切值，即返回正切值为x的值</td></tr><tr><td>ATAN2(m,n)</td><td>返回两个参数的反正切值</td></tr><tr><td>COT(x)</td><td>返回x的余切值，其中，X为弧度值</td></tr></tbody></table><p>举例：</p><p>ATAN2(M,N)函数返回两个参数的反正切值。<br> 与ATAN(X)函数相比，ATAN2(M,N)需要两个参数，例如有两个点point(x1,y1)和point(x2,y2)，使用ATAN(X)函数计算反正切值为ATAN((y2-y1)/(x2-x1))，使用ATAN2(M,N)计算反正切值则为ATAN2(y2-y1,x2-x1)。由使用方式可以看出，当x2-x1等于0时，ATAN(X)函数会报错，而ATAN2(M,N)函数则仍然可以计算。</p><p>ATAN2(M,N)函数的使用示例如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT SIN(RADIANS(30)),DEGREES(ASIN(1)),TAN(RADIANS(45)),DEGREES(ATAN(1)),DEGREES(ATAN2(1,1))
FROM DUAL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211025163846974.png" alt="image-20211025163846974" tabindex="0" loading="lazy"><figcaption>image-20211025163846974</figcaption></figure><h3 id="_2-4-指数与对数" tabindex="-1"><a class="header-anchor" href="#_2-4-指数与对数" aria-hidden="true">#</a> 2.4 指数与对数</h3><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>POW(x,y)，POWER(X,Y)</td><td>返回x的y次方</td></tr><tr><td>EXP(X)</td><td>返回e的X次方，其中e是一个常数，2.718281828459045</td></tr><tr><td>LN(X)，LOG(X)</td><td>返回以e为底的X的对数，当X &lt;= 0 时，返回的结果为NULL</td></tr><tr><td>LOG10(X)</td><td>返回以10为底的X的对数，当X &lt;= 0 时，返回的结果为NULL</td></tr><tr><td>LOG2(X)</td><td>返回以2为底的X的对数，当X &lt;= 0 时，返回NULL</td></tr></tbody></table><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT POW(2,5),POWER(2,4),EXP(2),LN(10),LOG10(10),LOG2(4)
    -&gt; FROM DUAL;
+----------+------------+------------------+-------------------+-----------+---------+
| POW(2,5) | POWER(2,4) | EXP(2)           | LN(10)            | LOG10(10) | LOG2(4) |
+----------+------------+------------------+-------------------+-----------+---------+
|       32 |         16 | 7.38905609893065 | 2.302585092994046 |         1 |       2 |
+----------+------------+------------------+-------------------+-----------+---------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-进制间的转换" tabindex="-1"><a class="header-anchor" href="#_2-5-进制间的转换" aria-hidden="true">#</a> 2.5 进制间的转换</h3><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>BIN(x)</td><td>返回x的二进制编码</td></tr><tr><td>HEX(x)</td><td>返回x的十六进制编码</td></tr><tr><td>OCT(x)</td><td>返回x的八进制编码</td></tr><tr><td>CONV(x,f1,f2)</td><td>返回f1进制数变成f2进制数</td></tr></tbody></table><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT BIN(10),HEX(10),OCT(10),CONV(10,2,8)
    -&gt; FROM DUAL;
+---------+---------+---------+--------------+
| BIN(10) | HEX(10) | OCT(10) | CONV(10,2,8) |
+---------+---------+---------+--------------+
| 1010    | A       | 12      | 2            |
+---------+---------+---------+--------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-字符串函数" tabindex="-1"><a class="header-anchor" href="#_3-字符串函数" aria-hidden="true">#</a> 3. 字符串函数</h2><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>ASCII(S)</td><td>返回字符串S中的第一个字符的ASCII码值</td></tr><tr><td>CHAR_LENGTH(s)</td><td>返回字符串s的字符数。作用与CHARACTER_LENGTH(s)相同</td></tr><tr><td>LENGTH(s)</td><td>返回字符串s的字节数，和字符集有关</td></tr><tr><td>CONCAT(s1,s2,......,sn)</td><td>连接s1,s2,......,sn为一个字符串</td></tr><tr><td>CONCAT_WS(x, s1,s2,......,sn)</td><td>同CONCAT(s1,s2,...)函数，但是每个字符串之间要加上x</td></tr><tr><td>INSERT(str, idx, len, replacestr)</td><td>将字符串str从第idx位置开始，len个字符长的子串替换为字符串replacestr</td></tr><tr><td>REPLACE(str, a, b)</td><td>用字符串b替换字符串str中所有出现的字符串a</td></tr><tr><td>UPPER(s) 或 UCASE(s)</td><td>将字符串s的所有字母转成大写字母</td></tr><tr><td>LOWER(s) 或LCASE(s)</td><td>将字符串s的所有字母转成小写字母</td></tr><tr><td>LEFT(str,n)</td><td>返回字符串str最左边的n个字符</td></tr><tr><td>RIGHT(str,n)</td><td>返回字符串str最右边的n个字符</td></tr><tr><td>LPAD(str, len, pad)</td><td>用字符串pad对str最左边进行填充，直到str的长度为len个字符</td></tr><tr><td>RPAD(str ,len, pad)</td><td>用字符串pad对str最右边进行填充，直到str的长度为len个字符</td></tr><tr><td>LTRIM(s)</td><td>去掉字符串s左侧的空格</td></tr><tr><td>RTRIM(s)</td><td>去掉字符串s右侧的空格</td></tr><tr><td>TRIM(s)</td><td>去掉字符串s开始与结尾的空格</td></tr><tr><td>TRIM(s1 FROM s)</td><td>去掉字符串s开始与结尾的s1</td></tr><tr><td>TRIM(LEADING s1 FROM s)</td><td>去掉字符串s开始处的s1</td></tr><tr><td>TRIM(TRAILING s1 FROM s)</td><td>去掉字符串s结尾处的s1</td></tr><tr><td>REPEAT(str, n)</td><td>返回str重复n次的结果</td></tr><tr><td>SPACE(n)</td><td>返回n个空格</td></tr><tr><td>STRCMP(s1,s2)</td><td>比较字符串s1,s2的ASCII码值的大小</td></tr><tr><td>SUBSTR(s,index,len)</td><td>返回从字符串s的index位置其len个字符，作用与SUBSTRING(s,n,len)、MID(s,n,len)相同</td></tr><tr><td>LOCATE(substr,str)</td><td>返回字符串substr在字符串str中首次出现的位置，作用于POSITION(substr IN str)、INSTR(str,substr)相同。未找到，返回0</td></tr><tr><td>ELT(m,s1,s2,…,sn)</td><td>返回指定位置的字符串，如果m=1，则返回s1，如果m=2，则返回s2，如果m=n，则返回sn</td></tr><tr><td>FIELD(s,s1,s2,…,sn)</td><td>返回字符串s在字符串列表中第一次出现的位置</td></tr><tr><td>FIND_IN_SET(s1,s2)</td><td>返回字符串s1在字符串s2中出现的位置。其中，字符串s2是一个以逗号分隔的字符串</td></tr><tr><td>REVERSE(s)</td><td>返回s反转后的字符串</td></tr><tr><td>NULLIF(value1,value2)</td><td>比较两个字符串，如果value1与value2相等，则返回NULL，否则返回value1</td></tr></tbody></table><blockquote><p>注意：MySQL中，字符串的位置是从1开始的。</p></blockquote><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT FIELD(&#39;mm&#39;,&#39;hello&#39;,&#39;msm&#39;,&#39;amma&#39;),FIND_IN_SET(&#39;mm&#39;,&#39;hello,mm,amma&#39;)
    -&gt; FROM DUAL;
+----------------------------------+-----------------------------------+
| FIELD(&#39;mm&#39;,&#39;hello&#39;,&#39;msm&#39;,&#39;amma&#39;) | FIND_IN_SET(&#39;mm&#39;,&#39;hello,mm,amma&#39;) |
+----------------------------------+-----------------------------------+
|                                0 |                                 2 |
+----------------------------------+-----------------------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT NULLIF(&#39;mysql&#39;,&#39;mysql&#39;),NULLIF(&#39;mysql&#39;, &#39;&#39;);
+-------------------------+---------------------+
| NULLIF(&#39;mysql&#39;,&#39;mysql&#39;) | NULLIF(&#39;mysql&#39;, &#39;&#39;) |
+-------------------------+---------------------+
| NULL                    | mysql               |
+-------------------------+---------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-日期和时间函数" tabindex="-1"><a class="header-anchor" href="#_4-日期和时间函数" aria-hidden="true">#</a> 4. 日期和时间函数</h2><h3 id="_4-1-获取日期、时间" tabindex="-1"><a class="header-anchor" href="#_4-1-获取日期、时间" aria-hidden="true">#</a> 4.1 获取日期、时间</h3><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td><strong>CURDATE()</strong> ，CURRENT_DATE()</td><td>返回当前日期，只包含年、月、日</td></tr><tr><td><strong>CURTIME()</strong> ， CURRENT_TIME()</td><td>返回当前时间，只包含时、分、秒</td></tr><tr><td><strong>NOW()</strong> / SYSDATE() / CURRENT_TIMESTAMP() / LOCALTIME() / LOCALTIMESTAMP()</td><td>返回当前系统日期和时间</td></tr><tr><td>UTC_DATE()</td><td>返回UTC（世界标准时间）日期</td></tr><tr><td>UTC_TIME()</td><td>返回UTC（世界标准时间）时间</td></tr></tbody></table><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT CURDATE(),CURTIME(),NOW(),SYSDATE()+0,UTC_DATE(),UTC_DATE()+0,UTC_TIME(),UTC_TIME()+0
FROM DUAL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211025193742633.png" alt="image-20211025193742633" tabindex="0" loading="lazy"><figcaption>image-20211025193742633</figcaption></figure><h3 id="_4-2-日期与时间戳的转换" tabindex="-1"><a class="header-anchor" href="#_4-2-日期与时间戳的转换" aria-hidden="true">#</a> 4.2 日期与时间戳的转换</h3><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>UNIX_TIMESTAMP()</td><td>以UNIX时间戳的形式返回当前时间。SELECT UNIX_TIMESTAMP() -&gt;1634348884</td></tr><tr><td>UNIX_TIMESTAMP(date)</td><td>将时间date以UNIX时间戳的形式返回。</td></tr><tr><td>FROM_UNIXTIME(timestamp)</td><td>将UNIX时间戳的时间转换为普通格式的时间</td></tr></tbody></table><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT UNIX_TIMESTAMP(now());
+-----------------------+
| UNIX_TIMESTAMP(now()) |
+-----------------------+
|            1576380910 |
+-----------------------+
1 row in set (0.01 sec)

mysql&gt; SELECT UNIX_TIMESTAMP(CURDATE());
+---------------------------+
| UNIX_TIMESTAMP(CURDATE()) |
+---------------------------+
|                1576339200 |
+---------------------------+
1 row in set (0.00 sec)

mysql&gt; SELECT UNIX_TIMESTAMP(CURTIME());
+---------------------------+
| UNIX_TIMESTAMP(CURTIME()) |
+---------------------------+
|                1576380969 |
+---------------------------+
1 row in set (0.00 sec)

mysql&gt; SELECT UNIX_TIMESTAMP(&#39;2011-11-11 11:11:11&#39;)
+---------------------------------------+
| UNIX_TIMESTAMP(&#39;2011-11-11 11:11:11&#39;) |
+---------------------------------------+
|                            1320981071 |
+---------------------------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT FROM_UNIXTIME(1576380910);
+---------------------------+
| FROM_UNIXTIME(1576380910) |
+---------------------------+
| 2019-12-15 11:35:10       |
+---------------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-获取月份、星期、星期数、天数等函数" tabindex="-1"><a class="header-anchor" href="#_4-3-获取月份、星期、星期数、天数等函数" aria-hidden="true">#</a> 4.3 获取月份、星期、星期数、天数等函数</h3><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>YEAR(date) / MONTH(date) / DAY(date)</td><td>返回具体的日期值</td></tr><tr><td>HOUR(time) / MINUTE(time) / SECOND(time)</td><td>返回具体的时间值</td></tr><tr><td>MONTHNAME(date)</td><td>返回月份：January，...</td></tr><tr><td>DAYNAME(date)</td><td>返回星期几：MONDAY，TUESDAY.....SUNDAY</td></tr><tr><td>WEEKDAY(date)</td><td>返回周几，注意，周1是0，周2是1，。。。周日是6</td></tr><tr><td>QUARTER(date)</td><td>返回日期对应的季度，范围为1～4</td></tr><tr><td>WEEK(date) ， WEEKOFYEAR(date)</td><td>返回一年中的第几周</td></tr><tr><td>DAYOFYEAR(date)</td><td>返回日期是一年中的第几天</td></tr><tr><td>DAYOFMONTH(date)</td><td>返回日期位于所在月份的第几天</td></tr><tr><td>DAYOFWEEK(date)</td><td>返回周几，注意：周日是1，周一是2，。。。周六是7</td></tr></tbody></table><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT YEAR(CURDATE()),MONTH(CURDATE()),DAY(CURDATE()),
HOUR(CURTIME()),MINUTE(NOW()),SECOND(SYSDATE())
FROM DUAL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211025213504115.png" alt="image-20211025213504115" tabindex="0" loading="lazy"><figcaption>image-20211025213504115</figcaption></figure><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT MONTHNAME(&#39;2021-10-26&#39;),DAYNAME(&#39;2021-10-26&#39;),WEEKDAY(&#39;2021-10-26&#39;),
QUARTER(CURDATE()),WEEK(CURDATE()),DAYOFYEAR(NOW()),
DAYOFMONTH(NOW()),DAYOFWEEK(NOW())
FROM DUAL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211025214818623.png" alt="image-20211025214818623" tabindex="0" loading="lazy"><figcaption>image-20211025214818623</figcaption></figure><h3 id="_4-4-日期的操作函数" tabindex="-1"><a class="header-anchor" href="#_4-4-日期的操作函数" aria-hidden="true">#</a> 4.4 日期的操作函数</h3><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>EXTRACT(type FROM date)</td><td>返回指定日期中特定的部分，type指定返回的值</td></tr></tbody></table><p>EXTRACT(type FROM date)函数中type的取值与含义：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308291643888.png" alt="image-20211012142639469" tabindex="0" loading="lazy"><figcaption>image-20211012142639469</figcaption></figure><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308291648071.png" alt="image-20211012142746444" tabindex="0" loading="lazy"><figcaption>image-20211012142746444</figcaption></figure><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT EXTRACT(MINUTE FROM NOW()),EXTRACT( WEEK FROM NOW()),
EXTRACT( QUARTER FROM NOW()),EXTRACT( MINUTE_SECOND FROM NOW())
FROM DUAL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-时间和秒钟转换的函数" tabindex="-1"><a class="header-anchor" href="#_4-5-时间和秒钟转换的函数" aria-hidden="true">#</a> 4.5 时间和秒钟转换的函数</h3><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>TIME_TO_SEC(time)</td><td>将 time 转化为秒并返回结果值。转化的公式为：<code>小时*3600+分钟*60+秒</code></td></tr><tr><td>SEC_TO_TIME(seconds)</td><td>将 seconds 描述转化为包含小时、分钟和秒的时间</td></tr></tbody></table><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT TIME_TO_SEC(NOW());
+--------------------+
| TIME_TO_SEC(NOW()) |
+--------------------+
|               78774 |
+--------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT SEC_TO_TIME(78774);
+--------------------+
| SEC_TO_TIME(78774) |
+--------------------+
| 21:52:54            |
+--------------------+
1 row in set (0.12 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-6-计算日期和时间的函数" tabindex="-1"><a class="header-anchor" href="#_4-6-计算日期和时间的函数" aria-hidden="true">#</a> 4.6 计算日期和时间的函数</h3><p><strong>第1组：</strong></p><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>DATE_ADD(datetime, INTERVAL expr type)，ADDDATE(date,INTERVAL expr type)</td><td>返回与给定日期时间相差INTERVAL时间段的日期时间</td></tr><tr><td>DATE_SUB(date,INTERVAL expr type)，SUBDATE(date,INTERVAL expr type)</td><td>返回与date相差INTERVAL时间间隔的日期</td></tr></tbody></table><p>上述函数中type的取值：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211012143203355.png" alt="image-20211012143203355" tabindex="0" loading="lazy"><figcaption>image-20211012143203355</figcaption></figure><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT DATE_ADD(NOW(), INTERVAL 1 DAY) AS col1,DATE_ADD(&#39;2021-10-21 23:32:12&#39;,INTERVAL 1 SECOND) AS col2,
ADDDATE(&#39;2021-10-21 23:32:12&#39;,INTERVAL 1 SECOND) AS col3,
DATE_ADD(&#39;2021-10-21 23:32:12&#39;,INTERVAL &#39;1_1&#39; MINUTE_SECOND) AS col4,
DATE_ADD(NOW(), INTERVAL -1 YEAR) AS col5, #可以是负数
DATE_ADD(NOW(), INTERVAL &#39;1_1&#39; YEAR_MONTH) AS col6 #需要单引号
FROM DUAL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT DATE_SUB(&#39;2021-01-21&#39;,INTERVAL 31 DAY) AS col1,
SUBDATE(&#39;2021-01-21&#39;,INTERVAL 31 DAY) AS col2,
DATE_SUB(&#39;2021-01-21 02:01:01&#39;,INTERVAL &#39;1 1&#39; DAY_HOUR) AS col3
FROM DUAL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第2组：</strong></p><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>ADDTIME(time1,time2)</td><td>返回time1加上time2的时间。当time2为一个数字时，代表的是<code>秒</code>，可以为负数</td></tr><tr><td>SUBTIME(time1,time2)</td><td>返回time1减去time2后的时间。当time2为一个数字时，代表的是<code>秒</code>，可以为负数</td></tr><tr><td>DATEDIFF(date1,date2)</td><td>返回date1 - date2的日期间隔天数</td></tr><tr><td>TIMEDIFF(time1, time2)</td><td>返回time1 - time2的时间间隔</td></tr><tr><td>FROM_DAYS(N)</td><td>返回从0000年1月1日起，N天以后的日期</td></tr><tr><td>TO_DAYS(date)</td><td>返回日期date距离0000年1月1日的天数</td></tr><tr><td>LAST_DAY(date)</td><td>返回date所在月份的最后一天的日期</td></tr><tr><td>MAKEDATE(year,n)</td><td>针对给定年份与所在年份中的天数返回一个日期</td></tr><tr><td>MAKETIME(hour,minute,second)</td><td>将给定的小时、分钟和秒组合成时间并返回</td></tr><tr><td>PERIOD_ADD(time,n)</td><td>返回time加上n后的时间</td></tr></tbody></table><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT ADDTIME(NOW(),20),SUBTIME(NOW(),30),SUBTIME(NOW(),&#39;1:1:3&#39;),DATEDIFF(NOW(),&#39;2021-10-01&#39;),
TIMEDIFF(NOW(),&#39;2021-10-25 22:10:10&#39;),FROM_DAYS(366),TO_DAYS(&#39;0000-12-25&#39;),
LAST_DAY(NOW()),MAKEDATE(YEAR(NOW()),12),MAKETIME(10,21,23),PERIOD_ADD(20200101010101,10)
FROM DUAL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT ADDTIME(NOW(), 50);
+---------------------+
| ADDTIME(NOW(), 50)  |
+---------------------+
| 2019-12-15 22:17:47 |
+---------------------+
1 row in set (0.00 sec)

mysql&gt; SELECT ADDTIME(NOW(), &#39;1:1:1&#39;);
+-------------------------+
| ADDTIME(NOW(), &#39;1:1:1&#39;) |
+-------------------------+
| 2019-12-15 23:18:46     |
+-------------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT SUBTIME(NOW(), &#39;1:1:1&#39;);
+-------------------------+
| SUBTIME(NOW(), &#39;1:1:1&#39;) |
+-------------------------+
| 2019-12-15 21:23:50     |
+-------------------------+
1 row in set (0.00 sec)

mysql&gt; SELECT SUBTIME(NOW(), &#39;-1:-1:-1&#39;); 
+----------------------------+
| SUBTIME(NOW(), &#39;-1:-1:-1&#39;) |
+----------------------------+
| 2019-12-15 22:25:11        |
+----------------------------+
1 row in set, 1 warning (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT FROM_DAYS(366);
+----------------+
| FROM_DAYS(366) |
+----------------+
| 0001-01-01     |
+----------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT MAKEDATE(2020,1);
+------------------+
| MAKEDATE(2020,1) |
+------------------+
| 2020-01-01       |
+------------------+
1 row in set (0.00 sec)

mysql&gt; SELECT MAKEDATE(2020,32);
+-------------------+
| MAKEDATE(2020,32) |
+-------------------+
| 2020-02-01        |
+-------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT MAKETIME(1,1,1);
+-----------------+
| MAKETIME(1,1,1) |
+-----------------+
| 01:01:01        |
+-----------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT PERIOD_ADD(20200101010101,1);
+------------------------------+
| PERIOD_ADD(20200101010101,1) |
+------------------------------+
|               20200101010102 |
+------------------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT TO_DAYS(NOW());
+----------------+
| TO_DAYS(NOW()) |
+----------------+
|          737773 |
+----------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>举例：查询 7 天内的新增用户数有多少？</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT COUNT(*) as num FROM new_user WHERE TO_DAYS(NOW())-TO_DAYS(regist_time)&lt;=7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-7-日期的格式化与解析" tabindex="-1"><a class="header-anchor" href="#_4-7-日期的格式化与解析" aria-hidden="true">#</a> 4.7 日期的格式化与解析</h3><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>DATE_FORMAT(date,fmt)</td><td>按照字符串fmt格式化日期date值</td></tr><tr><td>TIME_FORMAT(time,fmt)</td><td>按照字符串fmt格式化时间time值</td></tr><tr><td>GET_FORMAT(date_type,format_type)</td><td>返回日期字符串的显示格式</td></tr><tr><td>STR_TO_DATE(str, fmt)</td><td>按照字符串fmt对str进行解析，解析为一个日期</td></tr></tbody></table><p>上述<code>非GET_FORMAT</code>函数中fmt参数常用的格式符：</p><table><thead><tr><th>格式符</th><th>说明</th><th>格式符</th><th>说明</th></tr></thead><tbody><tr><td>%Y</td><td>4位数字表示年份</td><td>%y</td><td>表示两位数字表示年份</td></tr><tr><td>%M</td><td>月名表示月份（January,....）</td><td>%m</td><td>两位数字表示月份（01,02,03。。。）</td></tr><tr><td>%b</td><td>缩写的月名（Jan.，Feb.，....）</td><td>%c</td><td>数字表示月份（1,2,3,...）</td></tr><tr><td>%D</td><td>英文后缀表示月中的天数（1st,2nd,3rd,...）</td><td>%d</td><td>两位数字表示月中的天数(01,02...)</td></tr><tr><td>%e</td><td>数字形式表示月中的天数（1,2,3,4,5.....）</td><td></td><td></td></tr><tr><td>%H</td><td>两位数字表示小数，24小时制（01,02..）</td><td>%h和%I</td><td>两位数字表示小时，12小时制（01,02..）</td></tr><tr><td>%k</td><td>数字形式的小时，24小时制(1,2,3)</td><td>%l</td><td>数字形式表示小时，12小时制（1,2,3,4....）</td></tr><tr><td>%i</td><td>两位数字表示分钟（00,01,02）</td><td>%S和%s</td><td>两位数字表示秒(00,01,02...)</td></tr><tr><td>%W</td><td>一周中的星期名称（Sunday...）</td><td>%a</td><td>一周中的星期缩写（Sun.，Mon.,Tues.，..）</td></tr><tr><td>%w</td><td>以数字表示周中的天数(0=Sunday,1=Monday....)</td><td></td><td></td></tr><tr><td>%j</td><td>以3位数字表示年中的天数(001,002...)</td><td>%U</td><td>以数字表示年中的第几周，（1,2,3。。）其中Sunday为周中第一天</td></tr><tr><td>%u</td><td>以数字表示年中的第几周，（1,2,3。。）其中Monday为周中第一天</td><td></td><td></td></tr><tr><td>%T</td><td>24小时制</td><td>%r</td><td>12小时制</td></tr><tr><td>%p</td><td>AM或PM</td><td>%%</td><td>表示%</td></tr></tbody></table><p>GET_FORMAT函数中date_type和format_type参数取值如下：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211012145231321.png" alt="image-20211012145231321" tabindex="0" loading="lazy"><figcaption>image-20211012145231321</figcaption></figure><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT DATE_FORMAT(NOW(), &#39;%H:%i:%s&#39;);
+--------------------------------+
| DATE_FORMAT(NOW(), &#39;%H:%i:%s&#39;) |
+--------------------------------+
| 22:57:34                        |
+--------------------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT STR_TO_DATE(&#39;09/01/2009&#39;,&#39;%m/%d/%Y&#39;)
FROM DUAL;

SELECT STR_TO_DATE(&#39;20140422154706&#39;,&#39;%Y%m%d%H%i%s&#39;)
FROM DUAL;

SELECT STR_TO_DATE(&#39;2014-04-22 15:47:06&#39;,&#39;%Y-%m-%d %H:%i:%s&#39;)
FROM DUAL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT GET_FORMAT(DATE, &#39;USA&#39;);
+-------------------------+
| GET_FORMAT(DATE, &#39;USA&#39;) |
+-------------------------+
| %m.%d.%Y                |
+-------------------------+
1 row in set (0.00 sec)

SELECT DATE_FORMAT(NOW(),GET_FORMAT(DATE,&#39;USA&#39;)),
FROM DUAL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT STR_TO_DATE(&#39;2020-01-01 00:00:00&#39;,&#39;%Y-%m-%d&#39;); 
+-----------------------------------------------+
| STR_TO_DATE(&#39;2020-01-01 00:00:00&#39;,&#39;%Y-%m-%d&#39;) |
+-----------------------------------------------+
| 2020-01-01                                    |
+-----------------------------------------------+
1 row in set, 1 warning (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-流程控制函数" tabindex="-1"><a class="header-anchor" href="#_5-流程控制函数" aria-hidden="true">#</a> 5. 流程控制函数</h2><p>流程处理函数可以根据不同的条件，执行不同的处理流程，可以在SQL语句中实现不同的条件选择。MySQL中的流程处理函数主要包括IF()、IFNULL()和CASE()函数。</p><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>IF(value,value1,value2)</td><td>如果value的值为TRUE，返回value1，否则返回value2</td></tr><tr><td>IFNULL(value1, value2)</td><td>如果value1不为NULL，返回value1，否则返回value2</td></tr><tr><td>CASE WHEN 条件1 THEN 结果1 WHEN 条件2 THEN 结果2 .... [ELSE resultn] END</td><td>相当于Java的if...else if...else...</td></tr><tr><td>CASE expr WHEN 常量值1 THEN 值1 WHEN 常量值1 THEN 值1 .... [ELSE 值n] END</td><td>相当于Java的switch...case...</td></tr></tbody></table><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT IF(1 &gt; 0,&#39;正确&#39;,&#39;错误&#39;)    
-&gt;正确
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT IFNULL(null,&#39;Hello Word&#39;)
-&gt;Hello Word
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT CASE 
　　WHEN 1 &gt; 0
　　THEN &#39;1 &gt; 0&#39;
　　WHEN 2 &gt; 0
　　THEN &#39;2 &gt; 0&#39;
　　ELSE &#39;3 &gt; 0&#39;
　　END
-&gt;1 &gt; 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT CASE 1 
　　WHEN 1 THEN &#39;我是1&#39;
　　WHEN 2 THEN &#39;我是2&#39;
ELSE &#39;你是谁&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT employee_id,salary, CASE WHEN salary&gt;=15000 THEN &#39;高薪&#39; 
				  WHEN salary&gt;=10000 THEN &#39;潜力股&#39;  
				  WHEN salary&gt;=8000 THEN &#39;屌丝&#39; 
				  ELSE &#39;草根&#39; END  &quot;描述&quot;
FROM employees; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT oid,\`status\`, CASE \`status\` WHEN 1 THEN &#39;未付款&#39; 
								   WHEN 2 THEN &#39;已付款&#39; 
								   WHEN 3 THEN &#39;已发货&#39;  
								   WHEN 4 THEN &#39;确认收货&#39;  
								   ELSE &#39;无效订单&#39; END 
FROM t_order;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT CASE WHEN 1 &gt; 0 THEN &#39;yes&#39; WHEN 1 &lt;= 0 THEN &#39;no&#39; ELSE &#39;unknown&#39; END;
+---------------------------------------------------------------------+
| CASE WHEN 1 &gt; 0 THEN &#39;yes&#39; WHEN 1 &lt;= 0 THEN &#39;no&#39; ELSE &#39;unknown&#39; END |
+---------------------------------------------------------------------+
| yes                                                                  |
+---------------------------------------------------------------------+
1 row in set (0.00 sec)

mysql&gt; SELECT CASE WHEN 1 &lt; 0 THEN &#39;yes&#39; WHEN 1 = 0 THEN &#39;no&#39; ELSE &#39;unknown&#39; END;  
+--------------------------------------------------------------------+
| CASE WHEN 1 &lt; 0 THEN &#39;yes&#39; WHEN 1 = 0 THEN &#39;no&#39; ELSE &#39;unknown&#39; END |
+--------------------------------------------------------------------+
| unknown                                                             |
+--------------------------------------------------------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT CASE 1 WHEN 0 THEN 0 WHEN 1 THEN 1 ELSE -1 END;
+------------------------------------------------+
| CASE 1 WHEN 0 THEN 0 WHEN 1 THEN 1 ELSE -1 END |
+------------------------------------------------+
|                                               1 |
+------------------------------------------------+
1 row in set (0.00 sec)

mysql&gt; SELECT CASE -1 WHEN 0 THEN 0 WHEN 1 THEN 1 ELSE -1 END;
+-------------------------------------------------+
| CASE -1 WHEN 0 THEN 0 WHEN 1 THEN 1 ELSE -1 END |
+-------------------------------------------------+
|                                               -1 |
+-------------------------------------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT employee_id,12 * salary * (1 + IFNULL(commission_pct,0))
FROM employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT last_name, job_id, salary,
       CASE job_id WHEN &#39;IT_PROG&#39;  THEN  1.10*salary
                   WHEN &#39;ST_CLERK&#39; THEN  1.15*salary
                   WHEN &#39;SA_REP&#39;   THEN  1.20*salary
       			   ELSE      salary END     &quot;REVISED_SALARY&quot;
FROM   employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554980865631.png" alt="1554980865631" tabindex="0" loading="lazy"><figcaption>1554980865631</figcaption></figure><p><strong>练习：查询部门号为 10,20, 30 的员工信息, 若部门号为 10, 则打印其工资的 1.1 倍, 20 号部门, 则打印其工资的 1.2 倍, 30 号部门打印其工资的 1.3 倍数。</strong></p><h2 id="_6-加密与解密函数" tabindex="-1"><a class="header-anchor" href="#_6-加密与解密函数" aria-hidden="true">#</a> 6. 加密与解密函数</h2><p>加密与解密函数主要用于对数据库中的数据进行加密和解密处理，以防止数据被他人窃取。这些函数在保证数据库安全时非常有用。</p><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>PASSWORD(str)</td><td>返回字符串str的加密版本，41位长的字符串。加密结果<code>不可逆</code>，常用于用户的密码加密</td></tr><tr><td>MD5(str)</td><td>返回字符串str的md5加密后的值，也是一种加密方式。若参数为NULL，则会返回NULL</td></tr><tr><td>SHA(str)</td><td>从原明文密码str计算并返回加密后的密码字符串，当参数为NULL时，返回NULL。<code>SHA加密算法比MD5更加安全</code>。</td></tr><tr><td>ENCODE(value,password_seed)</td><td>返回使用password_seed作为加密密码加密value</td></tr><tr><td>DECODE(value,password_seed)</td><td>返回使用password_seed作为加密密码解密value</td></tr></tbody></table><p>可以看到，ENCODE(value,password_seed)函数与DECODE(value,password_seed)函数互为反函数。</p><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT PASSWORD(&#39;mysql&#39;), PASSWORD(NULL);
+-------------------------------------------+----------------+
| PASSWORD(&#39;mysql&#39;)                         | PASSWORD(NULL) |
+-------------------------------------------+----------------+
| *E74858DB86EBA20BC33D0AECAE8A8108C56B17FA |                |
+-------------------------------------------+----------------+
1 row in set, 1 warning (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT md5(&#39;123&#39;)
-&gt;202cb962ac59075b964b07152d234b70
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT SHA(&#39;Tom123&#39;)
-&gt;c7c506980abc31cc390a2438c90861d0f1216d50
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT ENCODE(&#39;mysql&#39;, &#39;mysql&#39;);
+--------------------------+
| ENCODE(&#39;mysql&#39;, &#39;mysql&#39;) |
+--------------------------+
| íg　¼　ìÉ                  |
+--------------------------+
1 row in set, 1 warning (0.01 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT DECODE(ENCODE(&#39;mysql&#39;,&#39;mysql&#39;),&#39;mysql&#39;);
+-----------------------------------------+
| DECODE(ENCODE(&#39;mysql&#39;,&#39;mysql&#39;),&#39;mysql&#39;) |
+-----------------------------------------+
| mysql                                   |
+-----------------------------------------+
1 row in set, 2 warnings (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-mysql信息函数" tabindex="-1"><a class="header-anchor" href="#_7-mysql信息函数" aria-hidden="true">#</a> 7. MySQL信息函数</h2><p>MySQL中内置了一些可以查询MySQL信息的函数，这些函数主要用于帮助数据库开发或运维人员更好地对数据库进行维护工作。</p><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>VERSION()</td><td>返回当前MySQL的版本号</td></tr><tr><td>CONNECTION_ID()</td><td>返回当前MySQL服务器的连接数</td></tr><tr><td>DATABASE()，SCHEMA()</td><td>返回MySQL命令行当前所在的数据库</td></tr><tr><td>USER()，CURRENT_USER()、SYSTEM_USER()，SESSION_USER()</td><td>返回当前连接MySQL的用户名，返回结果格式为“主机名@用户名”</td></tr><tr><td>CHARSET(value)</td><td>返回字符串value自变量的字符集</td></tr><tr><td>COLLATION(value)</td><td>返回字符串value的比较规则</td></tr></tbody></table><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT DATABASE();
+------------+
| DATABASE() |
+------------+
| test       |
+------------+
1 row in set (0.00 sec)

mysql&gt; SELECT DATABASE();
+------------+
| DATABASE() |
+------------+
| test       |
+------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT USER(), CURRENT_USER(), SYSTEM_USER(),SESSION_USER();
+----------------+----------------+----------------+----------------+
| USER()         | CURRENT_USER() | SYSTEM_USER()  | SESSION_USER() |
+----------------+----------------+----------------+----------------+
| root@localhost | root@localhost | root@localhost | root@localhost |
+----------------+----------------+----------------+----------------+

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT CHARSET(&#39;ABC&#39;);
+----------------+
| CHARSET(&#39;ABC&#39;) |
+----------------+
| utf8mb4        |
+----------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT COLLATION(&#39;ABC&#39;);
+--------------------+
| COLLATION(&#39;ABC&#39;)   |
+--------------------+
| utf8mb4_general_ci |
+--------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-其他函数" tabindex="-1"><a class="header-anchor" href="#_8-其他函数" aria-hidden="true">#</a> 8. 其他函数</h2><p>MySQL中有些函数无法对其进行具体的分类，但是这些函数在MySQL的开发和运维过程中也是不容忽视的。</p><table><thead><tr><th>函数</th><th>用法</th></tr></thead><tbody><tr><td>FORMAT(value,n)</td><td>返回对数字value进行格式化后的结果数据。n表示<code>四舍五入</code>后保留到小数点后n位</td></tr><tr><td>CONV(value,from,to)</td><td>将value的值进行不同进制之间的转换</td></tr><tr><td>INET_ATON(ipvalue)</td><td>将以点分隔的IP地址转化为一个数字</td></tr><tr><td>INET_NTOA(value)</td><td>将数字形式的IP地址转化为以点分隔的IP地址</td></tr><tr><td>BENCHMARK(n,expr)</td><td>将表达式expr重复执行n次。用于测试MySQL处理expr表达式所耗费的时间</td></tr><tr><td>CONVERT(value USING char_code)</td><td>将value所使用的字符编码修改为char_code</td></tr></tbody></table><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 如果n的值小于或者等于0，则只保留整数部分
mysql&gt; SELECT FORMAT(123.123, 2), FORMAT(123.523, 0), FORMAT(123.123, -2); 
+--------------------+--------------------+---------------------+
| FORMAT(123.123, 2) | FORMAT(123.523, 0) | FORMAT(123.123, -2) |
+--------------------+--------------------+---------------------+
| 123.12             | 124                | 123                 |
+--------------------+--------------------+---------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT CONV(16, 10, 2), CONV(8888,10,16), CONV(NULL, 10, 2);
+-----------------+------------------+-------------------+
| CONV(16, 10, 2) | CONV(8888,10,16) | CONV(NULL, 10, 2) |
+-----------------+------------------+-------------------+
| 10000           | 22B8             | NULL              |
+-----------------+------------------+-------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT INET_ATON(&#39;192.168.1.100&#39;);
+----------------------------+
| INET_ATON(&#39;192.168.1.100&#39;) |
+----------------------------+
|                 3232235876 |
+----------------------------+
1 row in set (0.00 sec)

# 以“192.168.1.100”为例，计算方式为192乘以256的3次方，加上168乘以256的2次方，加上1乘以256，再加上100。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT INET_NTOA(3232235876);
+-----------------------+
| INET_NTOA(3232235876) |
+-----------------------+
| 192.168.1.100         |
+-----------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT BENCHMARK(1, MD5(&#39;mysql&#39;));
+----------------------------+
| BENCHMARK(1, MD5(&#39;mysql&#39;)) |
+----------------------------+
|                          0 |
+----------------------------+
1 row in set (0.00 sec)

mysql&gt; SELECT BENCHMARK(1000000, MD5(&#39;mysql&#39;)); 
+----------------------------------+
| BENCHMARK(1000000, MD5(&#39;mysql&#39;)) |
+----------------------------------+
|                                0 |
+----------------------------------+
1 row in set (0.20 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT CHARSET(&#39;mysql&#39;), CHARSET(CONVERT(&#39;mysql&#39; USING &#39;utf8&#39;));
+------------------+----------------------------------------+
| CHARSET(&#39;mysql&#39;) | CHARSET(CONVERT(&#39;mysql&#39; USING &#39;utf8&#39;)) |
+------------------+----------------------------------------+
| utf8mb4          | utf8                                   |
+------------------+----------------------------------------+
1 row in set, 1 warning (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>`,151);function o(g,T){const i=s("ExternalLinkIcon");return t(),l("div",null,[d("div",m,[c,d("p",null,[u,e(": 以下所有文章整理于B站宋红康老师的《MySQL数据库入门到大牛》。"),d("a",b,[e("MySQL"),a(i)])])]),E])}const A=n(v,[["render",o],["__file","one-line-function.html.vue"]]);export{A as default};
