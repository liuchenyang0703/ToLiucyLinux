import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as a,c as l,a as e,b as i,d as c,e as o}from"./app-8d307529.js";const r={},m={class:"hint-container tip"},u=e("p",{class:"hint-container-title"},"友情提示",-1),v=e("strong",null,"转载须知",-1),t={href:"https://www.bilibili.com/video/BV1iq4y1u7vj?p=1&vd_source=cea816a08805c218ac4390ae9b61ae31",target:"_blank",rel:"noopener noreferrer"},g=o(`<h2 id="_1-数据库事务概述" tabindex="-1"><a class="header-anchor" href="#_1-数据库事务概述" aria-hidden="true">#</a> 1. 数据库事务概述</h2><h3 id="_1-1-存储引擎支持情况" tabindex="-1"><a class="header-anchor" href="#_1-1-存储引擎支持情况" aria-hidden="true">#</a> 1.1 存储引擎支持情况</h3><p><code>SHOW ENGINES</code> 命令来查看当前 MySQL 支持的存储引擎都有哪些，以及这些存储引擎是否支持事务。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220708124306444.png" alt="image-20220708124306444" tabindex="0" loading="lazy"><figcaption>image-20220708124306444</figcaption></figure><p>能看出在 MySQL 中，只有InnoDB 是支持事务的。</p><h3 id="_1-2-基本概念" tabindex="-1"><a class="header-anchor" href="#_1-2-基本概念" aria-hidden="true">#</a> 1.2 基本概念</h3><p>**事务：**一组逻辑操作单元，使数据从一种状态变换到另一种状态。</p><p>**事务处理的原则：**保证所有事务都作为 <code>一个工作单元</code> 来执行，即使出现了故障，都不能改变这种执行方 式。当在一个事务中执行多个操作时，要么所有的事务都被提交( <code>commit</code> )，那么这些修改就 <code>永久</code> 地保 <code>存下来</code>；要么数据库管理系统将 <code>放弃</code> 所作的所有 <code>修改</code> ，整个事务回滚( rollback )到最初状态。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 案例：AA用户给BB用户转账100
update account set money = money - 100 where name = &#39;AA&#39;;
# 服务器宕机
update account set money = money + 100 where name = &#39;BB&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-事务的acid特性" tabindex="-1"><a class="header-anchor" href="#_1-3-事务的acid特性" aria-hidden="true">#</a> 1.3 事务的ACID特性</h3><ul><li><strong>原子性（atomicity）</strong></li></ul><p>原子性是指事务是一个不可分割的工作单位，要么全部提交，要么全部失败回滚。即要么转账成功，要么转账失败，是不存在中间的状态。如果无法保证原子性会怎么样？就会出现数据不一致的情形，A账户减去100元，而B账户增加100元操作失败，系统将无故丢失100元。</p><ul><li><strong>一致性（consistency）</strong></li></ul><p>（国内很多网站上对一致性的阐述有误，具体你可以参考 Wikipedia 对Consistency的阐述）</p><p>根据定义，一致性是指事务执行前后，数据从一个 <code>合法性状态</code> 变换到另外一个 <code>合法性状态</code> 。这种状态是 <code>语义上</code> 的而不是语法上的，跟具体的业务有关。</p><p>那什么是合法的数据状态呢？满足 <code>预定的约束</code> 的状态就叫做合法的状态。通俗一点，这状态是由你自己来定义的（比如满足现实世界中的约束）。满足这个状态，数据就是一致的，不满足这个状态，数据就 是不一致的！如果事务中的某个操作失败了，系统就会自动撤销当前正在执行的事务，返回到事务操作 之前的状态。</p><p><strong>举例1</strong> A账户有200元，转账300元出去，此时A账户余额为-100元。你自然就发现此时数据是不一致的，为什么呢？因为你定义了一个状态，余额这列必须&gt;=0。</p><p><strong>举例2</strong> A账户有200元，转账50元给B账户，A账户的钱扣了，但是B账户因为各种意外，余额并没有增加。你也知道此时的数据是不一致的，为什么呢？因为你定义了一个状态，要求A+B的总余额必须不变。</p><p><strong>举例3</strong> 在数据表中我们将<code>姓名</code>字段设置为<code>唯一性约束</code>，这时当事务进行提交或者事务发生回滚的时候，如果数据表的姓名不唯一，就破坏了事务的一致性要求。</p><ul><li><strong>隔离型（isolation）：</strong></li></ul><p>事务的隔离性是指一个事务的执行<code>不能被其他事务干扰</code>，即一个事务内部的操作及使用的数据对<code>并发</code>的其他事务是隔离的，并发执行的各个事务之间不能相互干扰。</p><p>如果无法保证隔离性会怎么样？假设A账户有200元，B账户0元。A账户往B账户转账两次，每次金额为50 元，分别在两个事务中执行。如果无法保证隔离性，会出现下面的情形：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>UPDATE accounts SET money = money - 50 WHERE NAME = &#39;AA&#39;;
UPDATE accounts SET money = money + 50 WHERE NAME = &#39;BB&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220708164610193.png" alt="image-20220708164610193" tabindex="0" loading="lazy"><figcaption>image-20220708164610193</figcaption></figure><p><strong>持久性（durability）：</strong></p><p>持久性是指一个事务一旦被提交，它对数据库中数据的改变就是 永久性的 ，接下来的其他操作和数据库 故障不应该对其有任何影响。</p><p>持久性是通过 <code>事务日志</code> 来保证的。日志包括了 <code>重做日志</code> 和 <code>回滚日志</code> 。当我们通过事务对数据进行修改 的时候，首先会将数据库的变化信息记录到重做日志中，然后再对数据库中对应的行进行修改。这样做 的好处是，即使数据库系统崩溃，数据库重启后也能找到没有更新到数据库系统中的重做日志，重新执 行，从而使事务具有持久性。</p><blockquote><p>总结</p><p>ACID是事务的四大特征，在这四个特性中，原子性是基础，隔离性是手段，一致性是约束条件， 而持久性是我们的目的。</p><p>数据库事务，其实就是数据库设计者为了方便起见，把需要保证<code>原子性</code>、<code>隔离性</code>、<code>一致性</code>和<code>持久性</code>的一个或多个数据库操作称为一个事务。</p></blockquote><h3 id="_1-4-事务的状态" tabindex="-1"><a class="header-anchor" href="#_1-4-事务的状态" aria-hidden="true">#</a> 1.4 事务的状态</h3><p>我们现在知道 <code>事务</code> 是一个抽象的概念，它其实对应着一个或多个数据库操作，MySQL根据这些操作所执 行的不同阶段把 <code>事务</code> 大致划分成几个状态：</p><ul><li><p><strong>活动的（active</strong></p><p>事务对应的数据库操作正在执行过程中时，我们就说该事务处在 <code>活动的</code> 状态。</p></li><li><p><strong>部分提交的（partially committed</strong></p><p>当事务中的最后一个操作执行完成，但由于操作都在内存中执行，所造成的影响并 <code>没有刷新到磁盘</code> 时，我们就说该事务处在 <code>部分提交的</code> 状态。</p></li><li><p><strong>失败的（failed</strong></p><p>当事务处在 <code>活动的</code> 或者 部分提交的 状态时，可能遇到了某些错误（数据库自身的错误、操作系统 错误或者直接断电等）而无法继续执行，或者人为的停止当前事务的执行，我们就说该事务处在 失 败的 状态。</p></li><li><p><strong>中止的（aborted</strong></p><p>如果事务执行了一部分而变为 <code>失败的</code> 状态，那么就需要把已经修改的事务中的操作还原到事务执 行前的状态。换句话说，就是要撤销失败事务对当前数据库造成的影响。我们把这个撤销的过程称之为 <code>回滚</code> 。当 <code>回滚</code> 操作执行完毕时，也就是数据库恢复到了执行事务之前的状态，我们就说该事 务处在了 <code>中止的</code> 状态。</p><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>UPDATE accounts SET money = money - 50 WHERE NAME = &#39;AA&#39;;

UPDATE accounts SET money = money + 50 WHERE NAME = &#39;BB&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>提交的（committed</strong></p><p>当一个处在 <code>部分提交的</code> 状态的事务将修改过的数据都 <code>同步到磁盘</code> 上之后，我们就可以说该事务处在了 <code>提交的</code> 状态。</p><p>一个基本的状态转换图如下所示：</p><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220708171859055.png" alt="image-20220708171859055" style="zoom:80%;"><p>图中可见，只有当事务处于<code>提交的</code>或者<code>中止的</code>状态时，一个事务的生命周期才算是结束了。对于已经提交的事务来说，该事务对数据库所做的修改将永久生效，对于处于中止状态的事务，该事务对数据库所做的所有修改都会被回滚到没执行该事务之前的状态。</p></li></ul><h2 id="_2-如何使用事务" tabindex="-1"><a class="header-anchor" href="#_2-如何使用事务" aria-hidden="true">#</a> 2. 如何使用事务</h2><p>使用事务有两种方式，分别为 <code>显式事务</code> 和 <code>隐式事务</code> 。</p><h3 id="_2-1-显式事务" tabindex="-1"><a class="header-anchor" href="#_2-1-显式事务" aria-hidden="true">#</a> 2.1 显式事务</h3><p><strong>步骤1</strong> START TRANSACTION 或者 BEGIN ，作用是显式开启一个事务。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; BEGIN;
#或者
mysql&gt; START TRANSACTION;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>START TRANSACTION</code> 语句相较于 <code>BEGIN</code> 特别之处在于，后边能跟随几个 <code>修饰符</code> ：</p><p>① <code>READ ONLY</code> ：标识当前事务是一个 <code>只读事务</code> ，也就是属于该事务的数据库操作只能读取数据，而不能修改数据。</p><blockquote><p>补充：只读事务中只是不允许修改那些其他事务也能访问到的表中的数据，对于临时表来说（我们使用 CREATE TMEPORARY TABLE 创建的表），由于它们只能再当前会话中可见，所有只读事务其实也是可以对临时表进行增、删、改操作的。</p></blockquote><p>② <code>READ WRITE</code> ：标识当前事务是一个 <code>读写事务</code> ，也就是属于该事务的数据库操作既可以读取数据， 也可以修改数据。</p><p>③ <code>WITH CONSISTENT SNAPSHOT</code> ：启动一致性读。</p><p>比如：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>START TRANSACTION READ ONLY; # 开启一个只读事务
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>START TRANSACTION READ ONLY, WITH CONSISTENT SNAPSHOT # 开启只读事务和一致性读
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>START TRANSACTION READ WRITE, WITH CONSISTENT SNAPSHOT # 开启读写事务和一致性读
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意：</p><ul><li><code>READ ONLY</code>和<code>READ WRITE</code>是用来设置所谓的事务<code>访问模式</code>的，就是以只读还是读写的方式来访问数据库中的数据，一个事务的访问模式不能同时即设置为<code>只读</code>的也设置为<code>读写</code>的，所以不能同时把<code>READ ONLY</code>和<code>READ WRITE</code>放到<code>START TRANSACTION</code>语句后边。</li><li>如果我们不显式指定事务的访问模式，那么该事务的访问模式就是<code>读写</code>模式</li></ul><p><strong>步骤2</strong> 一系列事务中的操作（主要是DML，不含DDL）</p><p><strong>步骤3</strong> 提交事务 或 中止事务（即回滚事务）</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 提交事务。当提交事务后，对数据库的修改是永久性的。
mysql&gt; COMMIT;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 回滚事务。即撤销正在进行的所有没有提交的修改
mysql&gt; ROLLBACK;

# 将事务回滚到某个保存点。
mysql&gt; ROLLBACK TO [SAVEPOINT]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中关于SAVEPOINT相关操作有：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 在事务中创建保存点，方便后续针对保存点进行回滚。一个事务中可以存在多个保存点。
SAVEPOINT 保存点名称;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 删除某个保存点
RELEASE SAVEPOINT 保存点名称;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-隐式事务" tabindex="-1"><a class="header-anchor" href="#_2-2-隐式事务" aria-hidden="true">#</a> 2.2 隐式事务</h3><p>MySQL中有一个系统变量 <code>autocommit</code> ：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SHOW VARIABLES LIKE &#39;autocommit&#39;;
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| autocommit    |  ON   |
+---------------+-------+
1 row in set (0.01 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，如果我们想关闭这种 <code>自动提交</code> 的功能，可以使用下边两种方法之一：</p><ul><li><p>显式的的使用 <code>START TRANSACTION</code> 或者 <code>BEGIN</code> 语句开启一个事务。这样在本次事务提交或者回滚前会暂时关闭掉自动提交的功能。</p></li><li><p>把系统变量 <code>autocommit</code> 的值设置为 <code>OFF</code> ，就像这样：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET autocommit = OFF;
#或
SET autocommit = 0;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_2-3-隐式提交数据的情况" tabindex="-1"><a class="header-anchor" href="#_2-3-隐式提交数据的情况" aria-hidden="true">#</a> 2.3 隐式提交数据的情况</h3><ul><li><p>数据定义语言（Data definition language，缩写为：DDL）</p><p>数据库对象，指的就是<code>数据库、表、视图、存储过程</code>等结构。当我们<code>CREATE、ALTER、DROP</code>等语句去修改数据库对象时，就会隐式的提交前边语句所属于的事务。即：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>BEGIN;

SELECT ... # 事务中的一条语句
UPDATE ... # 事务中的一条语句
... # 事务中的其他语句

CREATE TABLE ... # 此语句会隐式的提交前边语句所属于的事务
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>隐式使用或修改mysql数据库中的表</p><p>当我们使用<code>ALTER USER</code>、<code>CREATE USER</code>、<code>DROP USER</code>、<code>GRANT</code>、<code>RENAME USER</code>、<code>REVOKE</code>、<code>SET PASSWORD</code>等语句时也会隐式的提交前边语句所属于的事务。</p></li><li><p>事务控制或关于锁定的语句</p><p>① 当我们在一个事务还没提交或者回滚时就又使用 START TRANSACTION 或者 BEGIN 语句开启了另一个事务时，会隐式的提交上一个事务。即：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>BEGIN;

SELECT ... # 事务中的一条语句
UPDATE ... # 事务中的一条语句
... # 事务中的其他语句

BEGIN; # 此语句会隐式的提交前边语句所属于的事务
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>② 当前的 autocommit 系统变量的值为 OFF ，我们手动把它调为 ON 时，也会 隐式的提交前边语句所属的事务。</p><p>③ 使用 LOCK TABLES 、 UNLOCK TABLES 等关于锁定的语句也会 隐式的提交 前边语句所属的事务。</p></li><li><p>加载数据的语句</p><p>使用<code>LOAD DATA</code>语句来批量往数据库中导入数据时，也会<code>隐式的提交</code>前边语句所属的事务。</p></li><li><p>关于MySQL复制的一些语句</p><p>使用<code>START SLAVE、STOP SLAVE、RESET SLAVE、CHANGE MASTER TO</code>等语句会隐式的提交前边语句所属的事务</p></li><li><p>其他的一些语句</p><p>使用<code>ANALYZE TABLE、CACHE INDEX、CAECK TABLE、FLUSH、LOAD INDEX INTO CACHE、OPTIMIZE TABLE、REPAIR TABLE、RESET</code>等语句也会隐式的提交前边语句所属的事务。</p></li></ul><h3 id="_2-4-使用举例1-提交与回滚" tabindex="-1"><a class="header-anchor" href="#_2-4-使用举例1-提交与回滚" aria-hidden="true">#</a> 2.4 使用举例1：提交与回滚</h3><p>我们看下在 MySQL 的默认状态下，下面这个事务最后的处理结果是什么。</p><p><strong>情况1：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE user(name varchar(20), PRIMARY KEY (name)) ENGINE=InnoDB;

BEGIN;
INSERT INTO user SELECT &#39;张三&#39;;
COMMIT;

BEGIN;
INSERT INTO user SELECT &#39;李四&#39;;
INSERT INTO user SELECT &#39;李四&#39;;
ROLLBACK;

SELECT * FROM user;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果（1 行数据）：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; commit;
Query OK, 0 rows affected (0.00 秒)

mysql&gt; BEGIN;
Query OK, 0 rows affected (0.00 秒)

mysql&gt; INSERT INTO user SELECT &#39;李四&#39;;
Query OK, 1 rows affected (0.00 秒)

mysql&gt; INSERT INTO user SELECT &#39;李四&#39;;
Duplicate entry &#39;李四&#39; for key &#39;user.PRIMARY&#39;
mysql&gt; ROLLBACK;
Query OK, 0 rows affected (0.01 秒)

mysql&gt; select * from user;
+--------+
| name   |
+--------+
| 张三    |
+--------+
1 行于数据集 (0.01 秒)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>情况2：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE user (name varchar(20), PRIMARY KEY (name)) ENGINE=InnoDB;

BEGIN;
INSERT INTO user SELECT &#39;张三&#39;;
COMMIT;

INSERT INTO user SELECT &#39;李四&#39;;
INSERT INTO user SELECT &#39;李四&#39;;
ROLLBACK;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果（2 行数据）：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT * FROM user;
+--------+
| name   |
+--------+
| 张三    |
| 李四    |
+--------+
2 行于数据集 (0.01 秒)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>情况3：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE user(name varchar(255), PRIMARY KEY (name)) ENGINE=InnoDB;

SET @@completion_type = 1;
BEGIN;
INSERT INTO user SELECT &#39;张三&#39;;
COMMIT;

INSERT INTO user SELECT &#39;李四&#39;;
INSERT INTO user SELECT &#39;李四&#39;;
ROLLBACK;

SELECT * FROM user;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果（1 行数据）：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT * FROM user;
+--------+
| name   |
+--------+
| 张三    |
+--------+
1 行于数据集 (0.01 秒)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220708201221316.png" alt="image-20220708201221316" style="float:left;"><blockquote><p>当我们设置 autocommit=0 时，不论是否采用 START TRANSACTION 或者 BEGIN 的方式来开启事 务，都需要用 COMMIT 进行提交，让事务生效，使用 ROLLBACK 对事务进行回滚。</p><p>当我们设置 autocommit=1 时，每条 SQL 语句都会自动进行提交。 不过这时，如果你采用 START TRANSACTION 或者 BEGIN 的方式来显式地开启事务，那么这个事务只有在 COMMIT 时才会生效， 在 ROLLBACK 时才会回滚。</p></blockquote><h3 id="_2-5-使用举例2-测试不支持事务的engine" tabindex="-1"><a class="header-anchor" href="#_2-5-使用举例2-测试不支持事务的engine" aria-hidden="true">#</a> 2.5 使用举例2：测试不支持事务的engine</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test1(i INT) ENGINE=InnoDB;

CREATE TABLE test2(i INT) ENGINE=MYISAM;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>针对于InnoDB表</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>BEGIN;
INSERT INTO test1 VALUES(1);
ROLLBACK;

SELECT * FROM test1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：没有数据</p><p>针对于MYISAM表：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>BEGIN;
INSERT INTO test1 VALUES(1);
ROLLBACK;

SELECT * FROM test2;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：有一条数据</p><h3 id="_2-6-使用举例3-savepoint" tabindex="-1"><a class="header-anchor" href="#_2-6-使用举例3-savepoint" aria-hidden="true">#</a> 2.6 使用举例3：SAVEPOINT</h3><p>创建表并添加数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE account(
id INT PRIMARY KEY AUTO_INCREMENT,
NAME VARCHAR(15),
balance DECIMAL(10,2)
);

INSERT INTO account(NAME,balance)
VALUES
(&#39;张三&#39;,1000),
(&#39;李四&#39;,1000);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>BEGIN;
UPDATE account SET balance = balance - 100 WHERE NAME = &#39;张三&#39;;
UPDATE account SET balance = balance - 100 WHERE NAME = &#39;张三&#39;;
SAVEPOINT s1; # 设置保存点
UPDATE account SET balance = balance + 1 WHERE NAME = &#39;张三&#39;;
ROLLBACK TO s1; # 回滚到保存点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：张三：800.00</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ROLLBACK;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果：张三：1000.00</p><h2 id="_3-事务隔离级别" tabindex="-1"><a class="header-anchor" href="#_3-事务隔离级别" aria-hidden="true">#</a> 3. 事务隔离级别</h2><p>MySQL是一个 <code>客户端／服务器</code> 架构的软件，对于同一个服务器来说，可以有若干个客户端与之连接，每 个客户端与服务器连接上之后，就可以称为一个会话（ <code>Session</code> ）。每个客户端都可以在自己的会话中 向服务器发出请求语句，一个请求语句可能是某个事务的一部分，也就是对于服务器来说可能同时处理多个事务。事务有 <code>隔离性</code> 的特性，理论上在某个事务 <code>对某个数据进行访问</code> 时，其他事务应该进行<code>排队</code> ，当该事务提交之后，其他事务才可以继续访问这个数据。但是这样对 <code>性能影响太大</code> ，我们既想保持事务的隔离性，又想让服务器在处理访问同一数据的多个事务时 <code>性能尽量高些</code> ，那就看二者如何权衡取 舍了。</p><h3 id="_3-1-数据准备" tabindex="-1"><a class="header-anchor" href="#_3-1-数据准备" aria-hidden="true">#</a> 3.1 数据准备</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE student (
    studentno INT,
    name VARCHAR(20),
    class varchar(20),
    PRIMARY KEY (studentno)
) Engine=InnoDB CHARSET=utf8;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后向这个表里插入一条数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO student VALUES(1, &#39;小谷&#39;, &#39;1班&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在表里的数据就是这样的：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; select * from student;
+-----------+--------+-------+
| studentno | name   | class |
+-----------+--------+-------+
|      1    |   小谷  | 1班   |
+-----------+--------+-------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-数据并发问题" tabindex="-1"><a class="header-anchor" href="#_3-2-数据并发问题" aria-hidden="true">#</a> 3.2 数据并发问题</h3><p>针对事务的隔离性和并发性，我们怎么做取舍呢？先看一下访问相同数据的事务在 不保证串行执行 （也 就是执行完一个再执行另一个）的情况下可能会出现哪些问题：</p><p><strong>1. 脏写（ Dirty Write ）</strong></p><p>对于两个事务 Session A、Session B，如果事务Session A <code>修改了</code> 另一个 <code>未提交</code> 事务Session B <code>修改过</code> 的数据，那就意味着发生了 <code>脏写</code>，示意图如下：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220708214453902.png" alt="image-20220708214453902" tabindex="0" loading="lazy"><figcaption>image-20220708214453902</figcaption></figure><p>Session A 和 Session B 各开启了一个事务，Sesssion B 中的事务先将studentno列为1的记录的name列更新为&#39;李四&#39;，然后Session A中的事务接着又把这条studentno列为1的记录的name列更新为&#39;张三&#39;。如果之后Session B中的事务进行了回滚，那么Session A中的更新也将不复存在，这种现象称之为脏写。这时Session A中的事务就没有效果了，明明把数据更新了，最后也提交事务了，最后看到的数据什么变化也没有。这里大家对事务的隔离性比较了解的话，会发现默认隔离级别下，上面Session A中的更新语句会处于等待状态，这里只是跟大家说明一下会出现这样的现象。</p><p><strong>2. 脏读（ Dirty Read ）</strong></p><p>对于两个事务 Session A、Session B，Session A <code>读取</code> 了已经被 Session B <code>更新</code> 但还 <code>没有被提交</code> 的字段。 之后若 Session B <code>回滚</code> ，Session A <code>读取 </code>的内容就是 <code>临时且无效</code> 的。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220708215109480.png" alt="image-20220708215109480" tabindex="0" loading="lazy"><figcaption>image-20220708215109480</figcaption></figure><p>Session A和Session B各开启了一个事务，Session B中的事务先将studentno列为1的记录的name列更新 为&#39;张三&#39;，然后Session A中的事务再去查询这条studentno为1的记录，如果读到列name的值为&#39;张三&#39;，而 Session B中的事务稍后进行了回滚，那么Session A中的事务相当于读到了一个不存在的数据，这种现象就称之为 <code>脏读</code> 。</p><p><strong>3. 不可重复读（ Non-Repeatable Read ）</strong></p><p>对于两个事务Session A、Session B，Session A <code>读取</code>了一个字段，然后 Session B <code>更新</code>了该字段。 之后 Session A <code>再次读取</code> 同一个字段， <code>值就不同</code> 了。那就意味着发生了不可重复读。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220708215626435.png" alt="image-20220708215626435" tabindex="0" loading="lazy"><figcaption>image-20220708215626435</figcaption></figure><p>我们在Session B中提交了几个 <code>隐式事务</code> （注意是隐式事务，意味着语句结束事务就提交了），这些事务 都修改了studentno列为1的记录的列name的值，每次事务提交之后，如果Session A中的事务都可以查看到最新的值，这种现象也被称之为 <code>不可重复读 </code>。</p><p><strong>4. 幻读（ Phantom ）</strong></p><p>对于两个事务Session A、Session B, Session A 从一个表中 <code>读取</code> 了一个字段, 然后 Session B 在该表中 插 入 了一些新的行。 之后, 如果 Session A <code>再次读取</code> 同一个表, 就会多出几行。那就意味着发生了<code>幻读</code>。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220708220102342.png" alt="image-20220708220102342" tabindex="0" loading="lazy"><figcaption>image-20220708220102342</figcaption></figure><p>Session A中的事务先根据条件 studentno &gt; 0这个条件查询表student，得到了name列值为&#39;张三&#39;的记录； 之后Session B中提交了一个 <code>隐式事务</code> ，该事务向表student中插入了一条新记录；之后Session A中的事务 再根据相同的条件 studentno &gt; 0查询表student，得到的结果集中包含Session B中的事务新插入的那条记 录，这种现象也被称之为 幻读 。我们把新插入的那些记录称之为 <code>幻影记录</code> 。</p><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220708220228436.png" alt="image-20220708220228436" style="float:left;"><h3 id="_3-3-sql中的四种隔离级别" tabindex="-1"><a class="header-anchor" href="#_3-3-sql中的四种隔离级别" aria-hidden="true">#</a> 3.3 SQL中的四种隔离级别</h3><p>上面介绍了几种并发事务执行过程中可能遇到的一些问题，这些问题有轻重缓急之分，我们给这些问题 按照严重性来排一下序：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>脏写 &gt; 脏读 &gt; 不可重复读 &gt; 幻读
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们愿意舍弃一部分隔离性来换取一部分性能在这里就体现在：设立一些隔离级别，隔离级别越低，并发问题发生的就越多。 <code>SQL标准</code> 中设立了4个 <code>隔离级别</code> ：</p><ul><li><code>READ UNCOMMITTED</code> ：读未提交，在该隔离级别，所有事务都可以看到其他未提交事务的执行结 果。不能避免脏读、不可重复读、幻读。</li><li><code>READ COMMITTED</code> ：读已提交，它满足了隔离的简单定义：一个事务只能看见已经提交事务所做 的改变。这是大多数数据库系统的默认隔离级别（但不是MySQL默认的）。可以避免脏读，但不可 重复读、幻读问题仍然存在。</li><li><code>REPEATABLE READ</code> ：可重复读，事务A在读到一条数据之后，此时事务B对该数据进行了修改并提 交，那么事务A再读该数据，读到的还是原来的内容。可以避免脏读、不可重复读，但幻读问题仍 然存在。这是MySQL的默认隔离级别。</li><li><code>SERIALIZABLE</code> ：可串行化，确保事务可以从一个表中读取相同的行。在这个事务持续期间，禁止 其他事务对该表执行插入、更新和删除操作。所有的并发问题都可以避免，但性能十分低下。能避 免脏读、不可重复读和幻读。</li></ul><p><code>SQL标准</code> 中规定，针对不同的隔离级别，并发事务可以发生不同严重程度的问题，具体情况如下：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220708220917267.png" alt="image-20220708220917267" tabindex="0" loading="lazy"><figcaption>image-20220708220917267</figcaption></figure><p><code>脏写 </code>怎么没涉及到？因为脏写这个问题太严重了，不论是哪种隔离级别，都不允许脏写的情况发生。</p><p>不同的隔离级别有不同的现象，并有不同的锁和并发机制，隔离级别越高，数据库的并发性能就越差，4 种事务隔离级别与并发性能的关系如下：</p><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220708220957108.png" alt="image-20220708220957108" style="zoom:80%;"><h3 id="_3-4-mysql支持的四种隔离级别" tabindex="-1"><a class="header-anchor" href="#_3-4-mysql支持的四种隔离级别" aria-hidden="true">#</a> 3.4 MySQL支持的四种隔离级别</h3><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220708221639979.png" alt="image-20220708221639979" style="float:left;"><p>MySQL的默认隔离级别为REPEATABLE READ，我们可以手动修改一下事务的隔离级别。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 查看隔离级别，MySQL 5.7.20的版本之前：
mysql&gt; SHOW VARIABLES LIKE &#39;tx_isolation&#39;;
+---------------+-----------------+
| Variable_name | Value           |
+---------------+-----------------+
| tx_isolation  | REPEATABLE-READ |
+---------------+-----------------+
1 row in set (0.00 sec)
# MySQL 5.7.20版本之后，引入transaction_isolation来替换tx_isolation

# 查看隔离级别，MySQL 5.7.20的版本及之后：
mysql&gt; SHOW VARIABLES LIKE &#39;transaction_isolation&#39;;
+-----------------------+-----------------+
| Variable_name         | Value           |
+-----------------------+-----------------+
| transaction_isolation | REPEATABLE-READ |
+-----------------------+-----------------+
1 row in set (0.02 sec)

#或者不同MySQL版本中都可以使用的：
SELECT @@transaction_isolation;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-如何设置事务的隔离级别" tabindex="-1"><a class="header-anchor" href="#_3-5-如何设置事务的隔离级别" aria-hidden="true">#</a> 3.5 如何设置事务的隔离级别</h3><p><strong>通过下面的语句修改事务的隔离级别：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET [GLOBAL|SESSION] TRANSACTION ISOLATION LEVEL 隔离级别;
#其中，隔离级别格式：
&gt; READ UNCOMMITTED
&gt; READ COMMITTED
&gt; REPEATABLE READ
&gt; SERIALIZABLE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET [GLOBAL|SESSION] TRANSACTION_ISOLATION = &#39;隔离级别&#39;
#其中，隔离级别格式：
&gt; READ-UNCOMMITTED
&gt; READ-COMMITTED
&gt; REPEATABLE-READ
&gt; SERIALIZABLE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>关于设置时使用GLOBAL或SESSION的影响：</strong></p><ul><li><p>使用 GLOBAL 关键字（在全局范围影响）：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET GLOBAL TRANSACTION ISOLATION LEVEL SERIALIZABLE;
#或
SET GLOBAL TRANSACTION_ISOLATION = &#39;SERIALIZABLE&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>则：</p><ul><li>当前已经存在的会话无效</li><li>只对执行完该语句之后产生的会话起作用</li></ul></li><li><p>使用 <code>SESSION</code> 关键字（在会话范围影响）：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
#或
SET SESSION TRANSACTION_ISOLATION = &#39;SERIALIZABLE&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>则：</p><ul><li>对当前会话的所有后续的事务有效</li><li>如果在事务之间执行，则对后续的事务有效</li><li>该语句可以在已经开启的事务中间执行，但不会影响当前正在执行的事务</li></ul></li></ul><p>如果在服务器启动时想改变事务的默认隔离级别，可以修改启动参数<code>transaction_isolation</code>的值。比如，在启动服务器时指定了<code>transaction_isolation=SERIALIZABLE</code>，那么事务的默认隔离界别就从原来的<code>REPEATABLE-READ</code>变成了<code>SERIALIZABLE</code>。</p><blockquote><p>小结：</p><p>数据库规定了多种事务隔离级别，不同隔离级别对应不同的干扰程度，隔离级别越高，数据一致性就越好，但并发性越弱。</p></blockquote><h3 id="_3-6-不同隔离级别举例" tabindex="-1"><a class="header-anchor" href="#_3-6-不同隔离级别举例" aria-hidden="true">#</a> 3.6 不同隔离级别举例</h3><p>初始化数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>TRUNCATE TABLE account;
INSERT INTO account VALUES (1,&#39;张三&#39;,&#39;100&#39;), (2,&#39;李四&#39;,&#39;0&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220708223250773.png" alt="image-20220708223250773" style="float:left;"><p><strong>演示1. 读未提交之脏读</strong></p><p>设置隔离级别为未提交读：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710193920008.png" alt="image-20220710193920008" tabindex="0" loading="lazy"><figcaption>image-20220710193920008</figcaption></figure><p>脏读就是指当前事务就在访问数据，并且对数据进行了修改，而这种修改还没有提交到数据库中，这时，另外一个事务也访问了这个数据，然后使用了这个数据。</p><p><strong>演示2：读已提交</strong></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710194440101.png" alt="image-20220710194440101" tabindex="0" loading="lazy"><figcaption>image-20220710194440101</figcaption></figure><p><strong>演示3. 不可重复读</strong></p><p>设置隔离级别为可重复读，事务的执行流程如下：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710194144826.png" alt="image-20220710194144826" tabindex="0" loading="lazy"><figcaption>image-20220710194144826</figcaption></figure><p>当我们将当前会话的隔离级别设置为可重复读的时候，当前会话可以重复读，就是每次读取的结果集都相同，而不管其他事务有没有提交。但是在可重复读的隔离级别上会出现幻读的问题。</p><p><strong>演示4：幻读</strong></p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710194042096.png" alt="image-20220710194042096" tabindex="0" loading="lazy"><figcaption>image-20220710194042096</figcaption></figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220710194612317.png" alt="image-20220710194612317" style="float:left;"><h2 id="_4-事务的常见分类" tabindex="-1"><a class="header-anchor" href="#_4-事务的常见分类" aria-hidden="true">#</a> 4. 事务的常见分类</h2><p>从事务理论的角度来看，可以把事务分为以下几种类型：</p><ul><li>扁平事务（Flat Transactions）</li><li>带有保存点的扁平事务（Flat Transactions with Savepoints）</li><li>链事务（Chained Transactions）</li><li>嵌套事务（Nested Transactions）</li><li>分布式事务（Distributed Transactions）</li></ul><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>`,163);function p(b,E){const n=d("ExternalLinkIcon");return a(),l("div",null,[e("div",m,[u,e("p",null,[v,i(": 以下所有文章整理于B站宋红康老师的《MySQL数据库入门到大牛》。"),e("a",t,[i("MySQL"),c(n)])])]),g])}const h=s(r,[["render",p],["__file","transaction-basics.html.vue"]]);export{h as default};
