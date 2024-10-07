import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as l,c as t,a as n,b as a,d,e as o}from"./app-8d307529.js";const p={},r={class:"hint-container tip"},c=n("p",{class:"hint-container-title"},"友情提示",-1),u=n("strong",null,"转载须知",-1),m={href:"https://www.bilibili.com/video/BV1iq4y1u7vj?p=1&vd_source=cea816a08805c218ac4390ae9b61ae31",target:"_blank",rel:"noopener noreferrer"},v=o(`<p>子查询指一个查询语句嵌套在另一个查询语句内部的查询，这个特性从MySQL 4.1开始引入。</p><p>SQL 中子查询的使用大大增强了 SELECT 查询的能力，因为很多时候查询需要从结果集中获取数据，或者需要从同一个表中先计算得出一个数据结果，然后与这个数据结果（可能是某个标量，也可能是某个集合）进行比较。</p><h2 id="_1-需求分析与问题解决" tabindex="-1"><a class="header-anchor" href="#_1-需求分析与问题解决" aria-hidden="true">#</a> 1. 需求分析与问题解决</h2><h3 id="_1-1-实际问题" tabindex="-1"><a class="header-anchor" href="#_1-1-实际问题" aria-hidden="true">#</a> 1.1 实际问题</h3><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554991034688.png" alt="1554991034688" style="zoom:80%;"><p>现有解决方式：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#方式一：
SELECT salary
FROM employees
WHERE last_name = &#39;Abel&#39;;

SELECT last_name,salary
FROM employees
WHERE salary &gt; 11000;

#方式二：自连接
SELECT e2.last_name,e2.salary
FROM employees e1,employees e2
WHERE e1.last_name = &#39;Abel&#39;
AND e1.\`salary\` &lt; e2.\`salary\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#方式三：子查询
SELECT last_name,salary
FROM employees
WHERE salary &gt; (
		SELECT salary
		FROM employees
		WHERE last_name = &#39;Abel&#39;
		);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554991316599.png" alt="1554991316599" tabindex="0" loading="lazy"><figcaption>1554991316599</figcaption></figure><h3 id="_1-2-子查询的基本使用" tabindex="-1"><a class="header-anchor" href="#_1-2-子查询的基本使用" aria-hidden="true">#</a> 1.2 子查询的基本使用</h3><ul><li>子查询的基本语法结构：</li></ul><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554991054388.png" alt="1554991054388" tabindex="0" loading="lazy"><figcaption>1554991054388</figcaption></figure><ul><li>子查询（内查询）在主查询之前一次执行完成。</li><li>子查询的结果被主查询（外查询）使用 。</li><li><strong>注意事项</strong><ul><li>子查询要包含在括号内</li><li>将子查询放在比较条件的右侧</li><li>单行操作符对应单行子查询，多行操作符对应多行子查询</li></ul></li></ul><h3 id="_1-3-子查询的分类" tabindex="-1"><a class="header-anchor" href="#_1-3-子查询的分类" aria-hidden="true">#</a> 1.3 子查询的分类</h3><p><strong>分类方式1：</strong></p><p>我们按内查询的结果返回一条还是多条记录，将子查询分为<code>单行子查询</code>、<code>多行子查询</code>。</p><ul><li><p>单行子查询</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554991538719.png" alt="1554991538719" tabindex="0" loading="lazy"><figcaption>1554991538719</figcaption></figure></li><li><p>多行子查询</p></li></ul><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554991555669.png" alt="1554991555669" tabindex="0" loading="lazy"><figcaption>1554991555669</figcaption></figure><p><strong>分类方式2：</strong></p><p>我们按内查询是否被执行多次，将子查询划分为<code>相关(或关联)子查询</code>和<code>不相关(或非关联)子查询</code>。</p><p>子查询从数据表中查询了数据结果，如果这个数据结果只执行一次，然后这个数据结果作为主查询的条件进行执行，那么这样的子查询叫做不相关子查询。</p><p>同样，如果子查询需要执行多次，即采用循环的方式，先从外部查询开始，每次都传入子查询进行查询，然后再将结果反馈给外部，这种嵌套的执行方式就称为相关子查询。</p><h2 id="_2-单行子查询" tabindex="-1"><a class="header-anchor" href="#_2-单行子查询" aria-hidden="true">#</a> 2. 单行子查询</h2><h3 id="_2-1-单行比较操作符" tabindex="-1"><a class="header-anchor" href="#_2-1-单行比较操作符" aria-hidden="true">#</a> 2.1 单行比较操作符</h3><table><thead><tr><th>操作符</th><th>含义</th></tr></thead><tbody><tr><td>=</td><td>equal to</td></tr><tr><td>&gt;</td><td>greater than</td></tr><tr><td>&gt;=</td><td>greater than or equal to</td></tr><tr><td>&lt;</td><td>less than</td></tr><tr><td>&lt;=</td><td>less than or equal to</td></tr><tr><td>&lt;&gt;</td><td>not equal to</td></tr></tbody></table><h3 id="_2-2-代码示例" tabindex="-1"><a class="header-anchor" href="#_2-2-代码示例" aria-hidden="true">#</a> 2.2 代码示例</h3><p><strong>题目：查询工资大于149号员工工资的员工的信息</strong></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20210914232952626.png" alt="image-20210914232952626" tabindex="0" loading="lazy"><figcaption>image-20210914232952626</figcaption></figure><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20210914232935062.png" alt="image-20210914232935062" tabindex="0" loading="lazy"><figcaption>image-20210914232935062</figcaption></figure><p><strong>题目：返回job_id与141号员工相同，salary比143号员工多的员工姓名，job_id和工资</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> last_name<span class="token punctuation">,</span> job_id<span class="token punctuation">,</span> salary
<span class="token keyword">FROM</span>   employees
<span class="token keyword">WHERE</span>  job_id <span class="token operator">=</span>  
                <span class="token punctuation">(</span><span class="token keyword">SELECT</span> job_id
                 <span class="token keyword">FROM</span>   employees
                 <span class="token keyword">WHERE</span>  employee_id <span class="token operator">=</span> <span class="token number">141</span><span class="token punctuation">)</span>
<span class="token operator">AND</span>    salary <span class="token operator">&gt;</span>
                <span class="token punctuation">(</span><span class="token keyword">SELECT</span> salary
                 <span class="token keyword">FROM</span>   employees
                 <span class="token keyword">WHERE</span>  employee_id <span class="token operator">=</span> <span class="token number">143</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554991892770.png" alt="1554991892770" tabindex="0" loading="lazy"><figcaption>1554991892770</figcaption></figure><p><strong>题目：返回公司工资最少的员工的last_name,job_id和salary</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> last_name<span class="token punctuation">,</span> job_id<span class="token punctuation">,</span> salary
<span class="token keyword">FROM</span>   employees
<span class="token keyword">WHERE</span>  salary <span class="token operator">=</span> 
                <span class="token punctuation">(</span><span class="token keyword">SELECT</span> <span class="token function">MIN</span><span class="token punctuation">(</span>salary<span class="token punctuation">)</span>
                 <span class="token keyword">FROM</span>   employees<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554991935186.png" alt="1554991935186" tabindex="0" loading="lazy"><figcaption>1554991935186</figcaption></figure><p><strong>题目：查询与141号或174号员工的manager_id和department_id相同的其他员工的employee_id，manager_id，department_id</strong></p><p>实现方式1：不成对比较</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT  employee_id, manager_id, department_id
FROM    employees
WHERE   manager_id IN
		  (SELECT  manager_id
                   FROM    employees
                   WHERE   employee_id IN (174,141))
AND     department_id IN 
		  (SELECT  department_id
                   FROM    employees
                   WHERE   employee_id IN (174,141))
AND	employee_id NOT IN(174,141);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现方式2：成对比较</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT	employee_id, manager_id, department_id
FROM	employees
WHERE  (manager_id, department_id) IN
                      (SELECT manager_id, department_id
                       FROM   employees
                       WHERE  employee_id IN (141,174))
AND	employee_id NOT IN (141,174);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-having-中的子查询" tabindex="-1"><a class="header-anchor" href="#_2-3-having-中的子查询" aria-hidden="true">#</a> 2.3 HAVING 中的子查询</h3><ul><li>首先执行子查询。</li><li>向主查询中的HAVING 子句返回结果。</li></ul><p><strong>题目：查询最低工资大于50号部门最低工资的部门id和其最低工资</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span>   department_id<span class="token punctuation">,</span> <span class="token function">MIN</span><span class="token punctuation">(</span>salary<span class="token punctuation">)</span>
<span class="token keyword">FROM</span>     employees
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> department_id
<span class="token keyword">HAVING</span>   <span class="token function">MIN</span><span class="token punctuation">(</span>salary<span class="token punctuation">)</span> <span class="token operator">&gt;</span>
                       <span class="token punctuation">(</span><span class="token keyword">SELECT</span> <span class="token function">MIN</span><span class="token punctuation">(</span>salary<span class="token punctuation">)</span>
                        <span class="token keyword">FROM</span>   employees
                        <span class="token keyword">WHERE</span>  department_id <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-case中的子查询" tabindex="-1"><a class="header-anchor" href="#_2-4-case中的子查询" aria-hidden="true">#</a> 2.4 CASE中的子查询</h3><p>在CASE表达式中使用单列子查询：</p><p><strong>题目：显式员工的employee_id,last_name和location。其中，若员工department_id与location_id为1800的department_id相同，则location为’Canada’，其余则为’USA’。</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT employee_id, last_name,
       (CASE department_id
        WHEN
             (SELECT department_id FROM departments
	      WHERE location_id = 1800)           
        THEN &#39;Canada&#39; ELSE &#39;USA&#39; END) location
FROM   employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-子查询中的空值问题" tabindex="-1"><a class="header-anchor" href="#_2-5-子查询中的空值问题" aria-hidden="true">#</a> 2.5 子查询中的空值问题</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> last_name<span class="token punctuation">,</span> job_id
<span class="token keyword">FROM</span>   employees
<span class="token keyword">WHERE</span>  job_id <span class="token operator">=</span>
                <span class="token punctuation">(</span><span class="token keyword">SELECT</span> job_id
                 <span class="token keyword">FROM</span>   employees
                 <span class="token keyword">WHERE</span>  last_name <span class="token operator">=</span> <span class="token string">&#39;Haas&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554992067381.png" alt="1554992067381" tabindex="0" loading="lazy"><figcaption>1554992067381</figcaption></figure><blockquote><p><strong>子查询不返回任何行</strong></p></blockquote><h3 id="_2-5-非法使用子查询" tabindex="-1"><a class="header-anchor" href="#_2-5-非法使用子查询" aria-hidden="true">#</a> 2.5 非法使用子查询</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> employee_id<span class="token punctuation">,</span> last_name
<span class="token keyword">FROM</span>   employees
<span class="token keyword">WHERE</span>  salary <span class="token operator">=</span>
                <span class="token punctuation">(</span><span class="token keyword">SELECT</span>   <span class="token function">MIN</span><span class="token punctuation">(</span>salary<span class="token punctuation">)</span>
                 <span class="token keyword">FROM</span>     employees
                 <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> department_id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554992135819.png" alt="1554992135819" tabindex="0" loading="lazy"><figcaption>1554992135819</figcaption></figure><blockquote><p><strong>多行子查询使用单行比较符</strong></p></blockquote><h2 id="_3-多行子查询" tabindex="-1"><a class="header-anchor" href="#_3-多行子查询" aria-hidden="true">#</a> 3. 多行子查询</h2><ul><li>也称为集合比较子查询</li><li>内查询返回多行</li><li>使用多行比较操作符</li></ul><h3 id="_3-1-多行比较操作符" tabindex="-1"><a class="header-anchor" href="#_3-1-多行比较操作符" aria-hidden="true">#</a> 3.1 多行比较操作符</h3><table><thead><tr><th>操作符</th><th>含义</th></tr></thead><tbody><tr><td>IN</td><td>等于列表中的<strong>任意一个</strong></td></tr><tr><td>ANY</td><td>需要和单行比较操作符一起使用，和子查询返回的<strong>某一个</strong>值比较</td></tr><tr><td>ALL</td><td>需要和单行比较操作符一起使用，和子查询返回的<strong>所有</strong>值比较</td></tr><tr><td>SOME</td><td>实际上是ANY的别名，作用相同，一般常使用ANY</td></tr></tbody></table><blockquote><p>体会 ANY 和 ALL 的区别</p></blockquote><h3 id="_3-2-代码示例" tabindex="-1"><a class="header-anchor" href="#_3-2-代码示例" aria-hidden="true">#</a> 3.2 代码示例</h3><p><strong>题目：返回其它job_id中比job_id为‘IT_PROG’部门任一工资低的员工的员工号、姓名、job_id 以及salary</strong></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554992658876.png" alt="1554992658876" tabindex="0" loading="lazy"><figcaption>1554992658876</figcaption></figure><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554992664594.png" alt="1554992664594" tabindex="0" loading="lazy"><figcaption>1554992664594</figcaption></figure><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554992668429.png" alt="1554992668429" tabindex="0" loading="lazy"><figcaption>1554992668429</figcaption></figure><p><strong>题目：返回其它job_id中比job_id为‘IT_PROG’部门所有工资都低的员工的员工号、姓名、job_id以及salary</strong></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554992753654.png" alt="1554992753654" tabindex="0" loading="lazy"><figcaption>1554992753654</figcaption></figure><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554992759467.png" alt="1554992759467" tabindex="0" loading="lazy"><figcaption>1554992759467</figcaption></figure><p><strong>题目：查询平均工资最低的部门id</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#方式1：
SELECT department_id
FROM employees
GROUP BY department_id
HAVING AVG(salary) = (
			SELECT MIN(avg_sal)
			FROM (
				SELECT AVG(salary) avg_sal
				FROM employees
				GROUP BY department_id
				) dept_avg_sal
			)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#方式2：
SELECT department_id
FROM employees
GROUP BY department_id
HAVING AVG(salary) &lt;= ALL (
				SELECT AVG(salary) avg_sal
				FROM employees
				GROUP BY department_id
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-空值问题" tabindex="-1"><a class="header-anchor" href="#_3-3-空值问题" aria-hidden="true">#</a> 3.3 空值问题</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT last_name
FROM employees
WHERE employee_id NOT IN (
			SELECT manager_id
			FROM employees
			);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211027195906773.png" alt="image-20211027195906773" tabindex="0" loading="lazy"><figcaption>image-20211027195906773</figcaption></figure><h2 id="_4-相关子查询" tabindex="-1"><a class="header-anchor" href="#_4-相关子查询" aria-hidden="true">#</a> 4. 相关子查询</h2><h3 id="_4-1-相关子查询执行流程" tabindex="-1"><a class="header-anchor" href="#_4-1-相关子查询执行流程" aria-hidden="true">#</a> 4.1 相关子查询执行流程</h3><p>如果子查询的执行依赖于外部查询，通常情况下都是因为子查询中的表用到了外部的表，并进行了条件关联，因此每执行一次外部查询，子查询都要重新计算一次，这样的子查询就称之为<code>关联子查询</code>。</p><p>相关子查询按照一行接一行的顺序执行，主查询的每一行都执行一次子查询。</p><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554992898234.png" alt="1554992898234" style="zoom:80%;"><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554992925281.png" alt="1554992925281" style="zoom:80%;"><p>说明：<strong>子查询中使用主查询中的列</strong></p><h3 id="_4-2-代码示例" tabindex="-1"><a class="header-anchor" href="#_4-2-代码示例" aria-hidden="true">#</a> 4.2 代码示例</h3><p><strong>题目：查询员工中工资大于本部门平均工资的员工的last_name,salary和其department_id</strong></p><p><strong>方式一：相关子查询</strong></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554992986225.png" alt="1554992986225" tabindex="0" loading="lazy"><figcaption>1554992986225</figcaption></figure><p><strong>方式二：在 FROM 中使用子查询</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> last_name<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>e1<span class="token punctuation">.</span>department_id
<span class="token keyword">FROM</span> employees e1<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token keyword">SELECT</span> department_id<span class="token punctuation">,</span><span class="token function">AVG</span><span class="token punctuation">(</span>salary<span class="token punctuation">)</span> dept_avg_sal <span class="token keyword">FROM</span> employees <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> department_id<span class="token punctuation">)</span> e2
<span class="token keyword">WHERE</span> e1<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>department_id<span class="token punctuation">\`</span></span> <span class="token operator">=</span> e2<span class="token punctuation">.</span>department_id
<span class="token operator">AND</span> e2<span class="token punctuation">.</span>dept_avg_sal <span class="token operator">&lt;</span> e1<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>salary<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>from型的子查询：子查询是作为from的一部分，子查询要用()引起来，并且要给这个子查询取别名，<br> 把它当成一张“临时的虚拟的表”来使用。</p></blockquote><p>在ORDER BY 中使用子查询：</p><p><strong>题目：查询员工的id,salary,按照department_name 排序</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> employee_id<span class="token punctuation">,</span>salary
<span class="token keyword">FROM</span> employees e
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token punctuation">(</span>
	  <span class="token keyword">SELECT</span> department_name
	  <span class="token keyword">FROM</span> departments d
	  <span class="token keyword">WHERE</span> e<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>department_id<span class="token punctuation">\`</span></span> <span class="token operator">=</span> d<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>department_id<span class="token punctuation">\`</span></span>
	<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>题目：若employees表中employee_id与job_history表中employee_id相同的数目不小于2，输出这些相同id的员工的employee_id,last_name和其job_id</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT e.employee_id, last_name,e.job_id
FROM   employees e 
WHERE  2 &lt;= (SELECT COUNT(*)
             FROM   job_history 
             WHERE  employee_id = e.employee_id);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-exists-与-not-exists关键字" tabindex="-1"><a class="header-anchor" href="#_4-3-exists-与-not-exists关键字" aria-hidden="true">#</a> 4.3 EXISTS 与 NOT EXISTS关键字</h3><ul><li>关联子查询通常也会和 EXISTS操作符一起来使用，用来检查在子查询中是否存在满足条件的行。</li><li><strong>如果在子查询中不存在满足条件的行：</strong><ul><li>条件返回 FALSE</li><li>继续在子查询中查找</li></ul></li><li><strong>如果在子查询中存在满足条件的行：</strong><ul><li>不在子查询中继续查找</li><li>条件返回 TRUE</li></ul></li><li>NOT EXISTS关键字表示如果不存在某种条件，则返回TRUE，否则返回FALSE。</li></ul><p><strong>题目：查询公司管理者的employee_id，last_name，job_id，department_id信息</strong></p><p>方式一：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> employee_id<span class="token punctuation">,</span> last_name<span class="token punctuation">,</span> job_id<span class="token punctuation">,</span> department_id
<span class="token keyword">FROM</span>   employees e1
<span class="token keyword">WHERE</span>  <span class="token keyword">EXISTS</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span>
                 <span class="token keyword">FROM</span>   employees e2
                 <span class="token keyword">WHERE</span>  e2<span class="token punctuation">.</span>manager_id <span class="token operator">=</span> 
                        e1<span class="token punctuation">.</span>employee_id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式二：自连接</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> e1<span class="token punctuation">.</span>employee_id<span class="token punctuation">,</span> e1<span class="token punctuation">.</span>last_name<span class="token punctuation">,</span> e1<span class="token punctuation">.</span>job_id<span class="token punctuation">,</span> e1<span class="token punctuation">.</span>department_id
<span class="token keyword">FROM</span>   employees e1 <span class="token keyword">JOIN</span> employees e2
<span class="token keyword">WHERE</span> e1<span class="token punctuation">.</span>employee_id <span class="token operator">=</span> e2<span class="token punctuation">.</span>manager_id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式三：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> employee_id<span class="token punctuation">,</span>last_name<span class="token punctuation">,</span>job_id<span class="token punctuation">,</span>department_id
<span class="token keyword">FROM</span> employees
<span class="token keyword">WHERE</span> employee_id <span class="token operator">IN</span> <span class="token punctuation">(</span>
		     <span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> manager_id
		     <span class="token keyword">FROM</span> employees
		     
		     <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>题目：查询departments表中，不存在于employees表中的部门的department_id和department_name</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> department_id<span class="token punctuation">,</span> department_name
<span class="token keyword">FROM</span> departments d
<span class="token keyword">WHERE</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token punctuation">(</span><span class="token keyword">SELECT</span> <span class="token string">&#39;X&#39;</span>
                  <span class="token keyword">FROM</span>   employees
                  <span class="token keyword">WHERE</span>  department_id <span class="token operator">=</span> d<span class="token punctuation">.</span>department_id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1554993169269.png" alt="1554993169269" tabindex="0" loading="lazy"><figcaption>1554993169269</figcaption></figure><h3 id="_4-4-相关更新" tabindex="-1"><a class="header-anchor" href="#_4-4-相关更新" aria-hidden="true">#</a> 4.4 相关更新</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">UPDATE</span> table1 alias1
<span class="token keyword">SET</span>    <span class="token keyword">column</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">SELECT</span> expression
                 <span class="token keyword">FROM</span>   table2 alias2
                 <span class="token keyword">WHERE</span>  alias1<span class="token punctuation">.</span><span class="token keyword">column</span> <span class="token operator">=</span> alias2<span class="token punctuation">.</span><span class="token keyword">column</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用相关子查询依据一个表中的数据更新另一个表的数据。</p><p><strong>题目：在employees中增加一个department_name字段，数据为员工对应的部门名称</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 1）
ALTER TABLE employees
ADD(department_name VARCHAR2(14));

# 2）
UPDATE employees e
SET department_name =  (SELECT department_name 
	                       FROM   departments d
	                       WHERE  e.department_id = d.department_id);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-相关删除" tabindex="-1"><a class="header-anchor" href="#_4-4-相关删除" aria-hidden="true">#</a> 4.4 相关删除</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code> <span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> table1 alias1
 <span class="token keyword">WHERE</span> <span class="token keyword">column</span> operator <span class="token punctuation">(</span><span class="token keyword">SELECT</span> expression
                        <span class="token keyword">FROM</span>   table2 alias2
                        <span class="token keyword">WHERE</span>  alias1<span class="token punctuation">.</span><span class="token keyword">column</span> <span class="token operator">=</span> alias2<span class="token punctuation">.</span><span class="token keyword">column</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用相关子查询依据一个表中的数据删除另一个表的数据。</p><p><strong>题目：删除表employees中，其与emp_history表皆有的数据</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> employees e
<span class="token keyword">WHERE</span> employee_id <span class="token operator">in</span>  
           <span class="token punctuation">(</span><span class="token keyword">SELECT</span> employee_id
            <span class="token keyword">FROM</span>   emp_history 
            <span class="token keyword">WHERE</span>  employee_id <span class="token operator">=</span> e<span class="token punctuation">.</span>employee_id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-抛一个思考题" tabindex="-1"><a class="header-anchor" href="#_5-抛一个思考题" aria-hidden="true">#</a> 5. 抛一个思考题</h2><p>**问题：**谁的工资比Abel的高？</p><p><strong>解答：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#方式1：自连接
SELECT e2.last_name,e2.salary
FROM employees e1,employees e2
WHERE e1.last_name = &#39;Abel&#39;
AND e1.\`salary\` &lt; e2.\`salary\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#方式2：子查询
SELECT last_name,salary
FROM employees
WHERE salary &gt; (
		SELECT salary
		FROM employees
		WHERE last_name = &#39;Abel&#39;
		);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**问题：**以上两种方式有好坏之分吗？</p><p>**解答：**自连接方式好！</p><p>题目中可以使用子查询，也可以使用自连接。一般情况建议你使用自连接，因为在许多 DBMS 的处理过程中，对于自连接的处理速度要比子查询快得多。</p><p>可以这样理解：子查询实际上是通过未知表进行查询后的条件判断，而自连接是通过已知的自身数据表进行条件判断，因此在大部分 DBMS 中都对自连接处理进行了优化。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>`,126);function g(k,b){const s=i("ExternalLinkIcon");return l(),t("div",null,[n("div",r,[c,n("p",null,[u,a(": 以下所有文章整理于B站宋红康老师的《MySQL数据库入门到大牛》。"),n("a",m,[a("MySQL"),d(s)])])]),v])}const _=e(p,[["render",g],["__file","subquery.html.vue"]]);export{_ as default};
