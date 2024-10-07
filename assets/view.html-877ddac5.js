import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as s,c as l,a as e,b as i,d as r,e as m}from"./app-8d307529.js";const t={},c={class:"hint-container tip"},v=e("p",{class:"hint-container-title"},"友情提示",-1),u=e("strong",null,"转载须知",-1),o={href:"https://www.bilibili.com/video/BV1iq4y1u7vj?p=1&vd_source=cea816a08805c218ac4390ae9b61ae31",target:"_blank",rel:"noopener noreferrer"},p=m(`<h2 id="_1-常见的数据库对象" tabindex="-1"><a class="header-anchor" href="#_1-常见的数据库对象" aria-hidden="true">#</a> 1. 常见的数据库对象</h2><table><thead><tr><th>对象</th><th>描述</th></tr></thead><tbody><tr><td>表(TABLE)</td><td>表是存储数据的逻辑单元，以行和列的形式存在，列就是字段，行就是记录</td></tr><tr><td>数据字典</td><td>就是系统表，存放数据库相关信息的表。系统表的数据通常由数据库系统维护，程序员通常不应该修改，只可查看</td></tr><tr><td>约束(CONSTRAINT)</td><td>执行数据校验的规则，用于保证数据完整性的规则</td></tr><tr><td>视图(VIEW)</td><td>一个或者多个数据表里的数据的逻辑显示，视图并不存储数据</td></tr><tr><td>索引(INDEX)</td><td>用于提高查询性能，相当于书的目录</td></tr><tr><td>存储过程(PROCEDURE)</td><td>用于完成一次完整的业务处理，没有返回值，但可通过传出参数将多个值传给调用环境</td></tr><tr><td>存储函数(FUNCTION)</td><td>用于完成一次特定的计算，具有一个返回值</td></tr><tr><td>触发器(TRIGGER)</td><td>相当于一个事件监听器，当数据库发生特定事件后，触发器被触发，完成相应的处理</td></tr></tbody></table><h2 id="_2-视图概述" tabindex="-1"><a class="header-anchor" href="#_2-视图概述" aria-hidden="true">#</a> 2. 视图概述</h2><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1555430281798.png" alt="1555430281798" tabindex="0" loading="lazy"><figcaption>1555430281798</figcaption></figure><h3 id="_2-1-为什么使用视图" tabindex="-1"><a class="header-anchor" href="#_2-1-为什么使用视图" aria-hidden="true">#</a> 2.1 为什么使用视图？</h3><p>视图一方面可以帮我们使用表的一部分而不是所有的表，另一方面也可以针对不同的用户制定不同的查询视图。比如，针对一个公司的销售人员，我们只想给他看部分数据，而某些特殊的数据，比如采购的价格，则不会提供给他。再比如，人员薪酬是个敏感的字段，那么只给某个级别以上的人员开放，其他人的查询视图中则不提供这个字段。</p><p>刚才讲的只是视图的一个使用场景，实际上视图还有很多作用。最后，我们总结视图的优点。</p><h3 id="_2-2-视图的理解" tabindex="-1"><a class="header-anchor" href="#_2-2-视图的理解" aria-hidden="true">#</a> 2.2 视图的理解</h3><ul><li><p>视图是一种<code>虚拟表</code>，本身是<code>不具有数据</code>的，占用很少的内存空间，它是 SQL 中的一个重要概念。</p></li><li><p><strong>视图建立在已有表的基础上</strong>, 视图赖以建立的这些表称为<strong>基表</strong>。</p><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211006211206990.png" alt="image-20211006211206990" style="zoom:67%;"></li><li><p>视图的创建和删除只影响视图本身，不影响对应的基表。但是当对视图中的数据进行增加、删除和修改操作时，数据表中的数据会相应地发生变化，反之亦然。</p></li><li><p>向视图提供数据内容的语句为 SELECT 语句, 可以将视图理解为<strong>存储起来的</strong> <strong>SELECT</strong> <strong>语句</strong></p><ul><li>在数据库中，视图不会保存数据，数据真正保存在数据表中。当对视图中的数据进行增加、删除和修改操作时，数据表中的数据会相应地发生变化；反之亦然。</li></ul></li><li><p>视图，是向用户提供基表数据的另一种表现形式。通常情况下，小型项目的数据库可以不使用视图，但是在大型项目中，以及数据表比较复杂的情况下，视图的价值就凸显出来了，它可以帮助我们把经常查询的结果集放到虚拟表中，提升使用效率。理解和使用起来都非常方便。</p></li></ul><h2 id="_3-创建视图" tabindex="-1"><a class="header-anchor" href="#_3-创建视图" aria-hidden="true">#</a> 3. 创建视图</h2><ul><li><strong>在</strong> <strong>CREATE VIEW</strong> <strong>语句中嵌入子查询</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE [OR REPLACE] 
[ALGORITHM = {UNDEFINED | MERGE | TEMPTABLE}] 
VIEW 视图名称 [(字段列表)]
AS 查询语句
[WITH [CASCADED|LOCAL] CHECK OPTION]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>精简版</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE VIEW 视图名称 
AS 查询语句
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-创建单表视图" tabindex="-1"><a class="header-anchor" href="#_3-1-创建单表视图" aria-hidden="true">#</a> 3.1 创建单表视图</h3><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE VIEW empvu80
AS 
SELECT  employee_id, last_name, salary
FROM    employees
WHERE   department_id = 80;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查询视图：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT *
FROM	salvu80;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/1555430882363.png" alt="1555430882363" style="zoom:80%;"><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE VIEW emp_year_salary (ename,year_salary)
AS 
SELECT ename,salary*12*(1+IFNULL(commission_pct,0))
FROM t_employee;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE VIEW salvu50
AS 
SELECT  employee_id ID_NUMBER, last_name NAME,salary*12 ANN_SALARY
FROM    employees
WHERE   department_id = 50;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明1：实际上就是我们在 SQL 查询语句的基础上封装了视图 VIEW，这样就会基于 SQL 语句的结果集形成一张虚拟表。</p><p>说明2：在创建视图时，没有在视图名后面指定字段列表，则视图中字段列表默认和SELECT语句中的字段列表一致。如果SELECT语句中给字段取了别名，那么视图中的字段名和别名相同。</p><h3 id="_3-2-创建多表联合视图" tabindex="-1"><a class="header-anchor" href="#_3-2-创建多表联合视图" aria-hidden="true">#</a> 3.2 创建多表联合视图</h3><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE VIEW empview 
AS 
SELECT employee_id emp_id,last_name NAME,department_name
FROM employees e,departments d
WHERE e.department_id = d.department_id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE VIEW emp_dept
AS 
SELECT ename,dname
FROM t_employee LEFT JOIN t_department
ON t_employee.did = t_department.did;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE VIEW	dept_sum_vu
(name, minsal, maxsal, avgsal)
AS 
SELECT d.department_name, MIN(e.salary), MAX(e.salary),AVG(e.salary)
FROM employees e, departments d
WHERE e.department_id = d.department_id 
GROUP BY  d.department_name;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>利用视图对数据进行格式化</strong></li></ul><p>我们经常需要输出某个格式的内容，比如我们想输出员工姓名和对应的部门名，对应格式为 emp_name(department_name)，就可以使用视图来完成数据格式化的操作：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE VIEW emp_depart
AS
SELECT CONCAT(last_name,&#39;(&#39;,department_name,&#39;)&#39;) AS emp_dept
FROM employees e JOIN departments d
WHERE e.department_id = d.department_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-基于视图创建视图" tabindex="-1"><a class="header-anchor" href="#_3-3-基于视图创建视图" aria-hidden="true">#</a> 3.3 基于视图创建视图</h3><p>当我们创建好一张视图之后，还可以在它的基础上继续创建视图。</p><p>举例：联合“emp_dept”视图和“emp_year_salary”视图查询员工姓名、部门名称、年薪信息创建 “emp_dept_ysalary”视图。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE VIEW emp_dept_ysalary
AS 
SELECT emp_dept.ename,dname,year_salary
FROM emp_dept INNER JOIN emp_year_salary
ON emp_dept.ename = emp_year_salary.ename;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-查看视图" tabindex="-1"><a class="header-anchor" href="#_4-查看视图" aria-hidden="true">#</a> 4. 查看视图</h2><p>语法1：查看数据库的表对象、视图对象</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW TABLES;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>语法2：查看视图的结构</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DESC / DESCRIBE 视图名称;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>语法3：查看视图的属性信息</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 查看视图信息（显示数据表的存储引擎、版本、数据行数和数据大小等）
SHOW TABLE STATUS LIKE &#39;视图名称&#39;\\G
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果显示，注释Comment为VIEW，说明该表为视图，其他的信息为NULL，说明这是一个虚表。</p><p>语法4：查看视图的详细定义信息</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW CREATE VIEW 视图名称;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-更新视图的数据" tabindex="-1"><a class="header-anchor" href="#_5-更新视图的数据" aria-hidden="true">#</a> 5. 更新视图的数据</h2><h3 id="_5-1-一般情况" tabindex="-1"><a class="header-anchor" href="#_5-1-一般情况" aria-hidden="true">#</a> 5.1 一般情况</h3><p>MySQL支持使用INSERT、UPDATE和DELETE语句对视图中的数据进行插入、更新和删除操作。当视图中的数据发生变化时，数据表中的数据也会发生变化，反之亦然。</p><p>举例：UPDATE操作</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT ename,tel FROM emp_tel WHERE ename = &#39;孙洪亮&#39;;
+---------+-------------+
| ename   | tel         |
+---------+-------------+
| 孙洪亮 	| 13789098765 |
+---------+-------------+
1 row in set (0.01 sec)

mysql&gt; UPDATE emp_tel SET tel = &#39;13789091234&#39; WHERE ename = &#39;孙洪亮&#39;;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql&gt; SELECT ename,tel FROM emp_tel WHERE ename = &#39;孙洪亮&#39;;
+---------+-------------+
| ename	  | tel         |
+---------+-------------+
| 	孙洪亮 | 13789091234 |
+---------+-------------+
1 row in set (0.00 sec)

mysql&gt; SELECT ename,tel FROM t_employee WHERE ename = &#39;孙洪亮&#39;;
+---------+-------------+
| ename   | tel         |
+---------+-------------+
| 孙洪亮 	| 13789091234 |
+---------+-------------+
1 row in set (0.00 sec)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>举例：DELETE操作</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT ename,tel FROM emp_tel WHERE ename = &#39;孙洪亮&#39;;
+---------+-------------+
| ename  	| tel           |
+---------+-------------+
| 孙洪亮 	| 13789091234 |
+---------+-------------+
1 row in set (0.00 sec)

mysql&gt; DELETE FROM emp_tel  WHERE ename = &#39;孙洪亮&#39;;
Query OK, 1 row affected (0.01 sec)

mysql&gt; SELECT ename,tel FROM emp_tel WHERE ename = &#39;孙洪亮&#39;;
Empty set (0.00 sec)

mysql&gt; SELECT ename,tel FROM t_employee WHERE ename = &#39;孙洪亮&#39;;
Empty set (0.00 sec)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-不可更新的视图" tabindex="-1"><a class="header-anchor" href="#_5-2-不可更新的视图" aria-hidden="true">#</a> 5.2 不可更新的视图</h3><p>要使视图可更新，视图中的行和底层基本表中的行之间必须存在<code>一对一</code>的关系。另外当视图定义出现如下情况时，视图不支持更新操作：</p><ul><li>在定义视图的时候指定了“ALGORITHM = TEMPTABLE”，视图将不支持INSERT和DELETE操作；</li><li>视图中不包含基表中所有被定义为非空又未指定默认值的列，视图将不支持INSERT操作；</li><li>在定义视图的SELECT语句中使用了<code>JOIN联合查询</code>，视图将不支持INSERT和DELETE操作；</li><li>在定义视图的SELECT语句后的字段列表中使用了<code>数学表达式</code>或<code>子查询</code>，视图将不支持INSERT，也不支持UPDATE使用了数学表达式、子查询的字段值；</li><li>在定义视图的SELECT语句后的字段列表中使用<code>DISTINCT</code>、<code>聚合函数</code>、<code>GROUP BY</code>、<code>HAVING</code>、<code>UNION</code>等，视图将不支持INSERT、UPDATE、DELETE；</li><li>在定义视图的SELECT语句中包含了子查询，而子查询中引用了FROM后面的表，视图将不支持INSERT、UPDATE、DELETE；</li><li>视图定义基于一个<code>不可更新视图</code>；</li><li>常量视图。</li></ul><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; CREATE OR REPLACE VIEW emp_dept
    -&gt; (ename,salary,birthday,tel,email,hiredate,dname)
    -&gt; AS SELECT ename,salary,birthday,tel,email,hiredate,dname
    -&gt; FROM t_employee INNER JOIN t_department
    -&gt; ON t_employee.did = t_department.did ;
Query OK, 0 rows affected (0.01 sec)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; INSERT INTO emp_dept(ename,salary,birthday,tel,email,hiredate,dname)
    -&gt; VALUES(&#39;张三&#39;,15000,&#39;1995-01-08&#39;,&#39;18201587896&#39;,
    -&gt; &#39;zs@atguigu.com&#39;,&#39;2022-02-14&#39;,&#39;新部门&#39;);
    
#ERROR 1393 (HY000): Can not modify more than one base table through a join view &#39;atguigu_chapter9.emp_dept&#39;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面的SQL执行结果可以看出，在定义视图的SELECT语句中使用了JOIN联合查询，视图将不支持更新操作。</p><blockquote><p>虽然可以更新视图数据，但总的来说，视图作为<code>虚拟表</code>，主要用于<code>方便查询</code>，不建议更新视图的数据。<strong>对视图数据的更改，都是通过对实际数据表里数据的操作来完成的。</strong></p></blockquote><h2 id="_6-修改、删除视图" tabindex="-1"><a class="header-anchor" href="#_6-修改、删除视图" aria-hidden="true">#</a> 6. 修改、删除视图</h2><h3 id="_6-1-修改视图" tabindex="-1"><a class="header-anchor" href="#_6-1-修改视图" aria-hidden="true">#</a> 6.1 修改视图</h3><p>方式1：使用CREATE <strong>OR REPLACE</strong> VIEW 子句<strong>修改视图</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE OR REPLACE VIEW empvu80
(id_number, name, sal, department_id)
AS 
SELECT  employee_id, first_name || &#39; &#39; || last_name, salary, department_id
FROM employees
WHERE department_id = 80;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>说明：CREATE VIEW 子句中各列的别名应和子查询中各列相对应。</p></blockquote><p>方式2：ALTER VIEW</p><p>修改视图的语法是：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER VIEW 视图名称 
AS
查询语句
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-删除视图" tabindex="-1"><a class="header-anchor" href="#_6-2-删除视图" aria-hidden="true">#</a> 6.2 删除视图</h3><ul><li><p>删除视图只是删除视图的定义，并不会删除基表的数据。</p></li><li><p>删除视图的语法是：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP VIEW IF EXISTS 视图名称;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP VIEW IF EXISTS 视图名称1,视图名称2,视图名称3,...;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP VIEW empvu80;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>说明：基于视图a、b创建了新的视图c，如果将视图a或者视图b删除，会导致视图c的查询失败。这样的视图c需要手动删除或修改，否则影响使用。</p></li></ul><h2 id="_7-总结" tabindex="-1"><a class="header-anchor" href="#_7-总结" aria-hidden="true">#</a> 7. 总结</h2><h3 id="_7-1-视图优点" tabindex="-1"><a class="header-anchor" href="#_7-1-视图优点" aria-hidden="true">#</a> 7.1 视图优点</h3><p><strong>1. 操作简单</strong></p><p>将经常使用的查询操作定义为视图，可以使开发人员不需要关心视图对应的数据表的结构、表与表之间的关联关系，也不需要关心数据表之间的业务逻辑和查询条件，而只需要简单地操作视图即可，极大简化了开发人员对数据库的操作。</p><p><strong>2. 减少数据冗余</strong></p><p>视图跟实际数据表不一样，它存储的是查询语句。所以，在使用的时候，我们要通过定义视图的查询语句来获取结果集。而视图本身不存储数据，不占用数据存储的资源，减少了数据冗余。</p><p><strong>3. 数据安全</strong></p><p>MySQL将用户对数据的<code>访问限制</code>在某些数据的结果集上，而这些数据的结果集可以使用视图来实现。用户不必直接查询或操作数据表。这也可以理解为视图具有<code>隔离性</code>。视图相当于在用户和实际的数据表之间加了一层虚拟表。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211010211744459.png" alt="image-20211010211744459" tabindex="0" loading="lazy"><figcaption>image-20211010211744459</figcaption></figure><p>同时，MySQL可以根据权限将用户对数据的访问限制在某些视图上，<strong>用户不需要查询数据表，可以直接通过视图获取数据表中的信息</strong>。这在一定程度上保障了数据表中数据的安全性。</p><p><strong>4. 适应灵活多变的需求</strong><br> 当业务系统的需求发生变化后，如果需要改动数据表的结构，则工作量相对较大，可以使用视图来减少改动的工作量。这种方式在实际工作中使用得比较多。</p><p><strong>5. 能够分解复杂的查询逻辑</strong><br> 数据库中如果存在复杂的查询逻辑，则可以将问题进行分解，创建多个视图获取数据，再将创建的多个视图结合起来，完成复杂的查询逻辑。</p><h3 id="_7-2-视图不足" tabindex="-1"><a class="header-anchor" href="#_7-2-视图不足" aria-hidden="true">#</a> 7.2 视图不足</h3><p>如果我们在实际数据表的基础上创建了视图，那么，<strong>如果实际数据表的结构变更了，我们就需要及时对相关的视图进行相应的维护</strong>。特别是嵌套的视图（就是在视图的基础上创建视图），维护会变得比较复杂，<code>可读性不好</code>，容易变成系统的潜在隐患。因为创建视图的 SQL 查询可能会对字段重命名，也可能包含复杂的逻辑，这些都会增加维护的成本。</p><p>实际项目中，如果视图过多，会导致数据库维护成本的问题。</p><p>所以，在创建视图的时候，你要结合实际项目需求，综合考虑视图的优点和不足，这样才能正确使用视图，使系统整体达到最优。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>`,90);function E(b,g){const n=d("ExternalLinkIcon");return s(),l("div",null,[e("div",c,[v,e("p",null,[u,i(": 以下所有文章整理于B站宋红康老师的《MySQL数据库入门到大牛》。"),e("a",o,[i("MySQL"),r(n)])])]),p])}const _=a(t,[["render",E],["__file","view.html.vue"]]);export{_ as default};
