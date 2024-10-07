import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as l,c as a,a as e,b as d,d as t,e as r}from"./app-8d307529.js";const c={},v={class:"hint-container tip"},m=e("p",{class:"hint-container-title"},"友情提示",-1),u=e("strong",null,"转载须知",-1),o={href:"https://www.bilibili.com/video/BV1iq4y1u7vj?p=1&vd_source=cea816a08805c218ac4390ae9b61ae31",target:"_blank",rel:"noopener noreferrer"},b=r(`<h2 id="_1-mysql中的数据类型" tabindex="-1"><a class="header-anchor" href="#_1-mysql中的数据类型" aria-hidden="true">#</a> 1. MySQL中的数据类型</h2><table><thead><tr><th>类型</th><th>类型举例</th></tr></thead><tbody><tr><td>整数类型</td><td>TINYINT、SMALLINT、MEDIUMINT、INT(或INTEGER)、BIGINT</td></tr><tr><td>浮点类型</td><td>FLOAT、DOUBLE</td></tr><tr><td>定点数类型</td><td>DECIMAL</td></tr><tr><td>位类型</td><td>BIT</td></tr><tr><td>日期时间类型</td><td>YEAR、TIME、DATE、DATETIME、TIMESTAMP</td></tr><tr><td>文本字符串类型</td><td>CHAR、VARCHAR、TINYTEXT、TEXT、MEDIUMTEXT、LONGTEXT</td></tr><tr><td>枚举类型</td><td>ENUM</td></tr><tr><td>集合类型</td><td>SET</td></tr><tr><td>二进制字符串类型</td><td>BINARY、VARBINARY、TINYBLOB、BLOB、MEDIUMBLOB、LONGBLOB</td></tr><tr><td>JSON类型</td><td>JSON对象、JSON数组</td></tr><tr><td>空间数据类型</td><td>单值类型：GEOMETRY、POINT、LINESTRING、POLYGON；<br>集合类型：MULTIPOINT、MULTILINESTRING、MULTIPOLYGON、GEOMETRYCOLLECTION</td></tr></tbody></table><p>常见数据类型的属性，如下：</p><table><thead><tr><th>MySQL关键字</th><th>含义</th></tr></thead><tbody><tr><td>NULL</td><td>数据列可包含NULL值</td></tr><tr><td>NOT NULL</td><td>数据列不允许包含NULL值</td></tr><tr><td>DEFAULT</td><td>默认值</td></tr><tr><td>PRIMARY KEY</td><td>主键</td></tr><tr><td>AUTO_INCREMENT</td><td>自动递增，适用于整数类型</td></tr><tr><td>UNSIGNED</td><td>无符号</td></tr><tr><td>CHARACTER SET name</td><td>指定一个字符集</td></tr></tbody></table><h2 id="_2-整数类型" tabindex="-1"><a class="header-anchor" href="#_2-整数类型" aria-hidden="true">#</a> 2. 整数类型</h2><h3 id="_2-1-类型介绍" tabindex="-1"><a class="header-anchor" href="#_2-1-类型介绍" aria-hidden="true">#</a> 2.1 类型介绍</h3><p>整数类型一共有 5 种，包括 TINYINT、SMALLINT、MEDIUMINT、INT（INTEGER）和 BIGINT。</p><p>它们的区别如下表所示：</p><table><thead><tr><th><strong>整数类型</strong></th><th><strong>字节</strong></th><th>有符号数取值范围</th><th>无符号数取值范围</th></tr></thead><tbody><tr><td>TINYINT</td><td>1</td><td>-128~127</td><td>0~255</td></tr><tr><td>SMALLINT</td><td>2</td><td>-32768~32767</td><td>0~65535</td></tr><tr><td>MEDIUMINT</td><td>3</td><td>-8388608~8388607</td><td>0~16777215</td></tr><tr><td>INT、INTEGER</td><td>4</td><td>-2147483648~2147483647</td><td>0~4294967295</td></tr><tr><td>BIGINT</td><td>8</td><td>-9223372036854775808~9223372036854775807</td><td>0~18446744073709551615</td></tr></tbody></table><h3 id="_2-2-可选属性" tabindex="-1"><a class="header-anchor" href="#_2-2-可选属性" aria-hidden="true">#</a> 2.2 可选属性</h3><p><strong>整数类型的可选属性有三个：</strong></p><h4 id="_2-2-1-m" tabindex="-1"><a class="header-anchor" href="#_2-2-1-m" aria-hidden="true">#</a> 2.2.1 M</h4><p><code>M</code>: 表示显示宽度，M的取值范围是(0, 255)。例如，int(5)：当数据宽度小于5位的时候在数字前面需要用字符填满宽度。该项功能需要配合“<code>ZEROFILL</code>”使用，表示用“0”填满宽度，否则指定显示宽度无效。</p><p>如果设置了显示宽度，那么插入的数据宽度超过显示宽度限制，会不会截断或插入失败？</p><p>答案：不会对插入的数据有任何影响，还是按照类型的实际宽度进行保存，即<code>显示宽度与类型可以存储的值范围无关</code>。<strong>从MySQL 8.0.17开始，整数数据类型不推荐使用显示宽度属性。</strong></p><p>整型数据类型可以在定义表结构时指定所需要的显示宽度，如果不指定，则系统为每一种类型指定默认的宽度值。</p><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_int1 ( x TINYINT,　y SMALLINT,　z MEDIUMINT,　m INT,　n BIGINT );
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看表结构 （MySQL5.7中显式如下，MySQL8中不再显式范围）</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; desc test_int1;
+-------+--------------+------+-----+---------+-------+
| Field | Type         | Null | Key | Default | Extra |
+-------+--------------+------+-----+---------+-------+
|   x   | tinyint(4)   | YES  |     | NULL    |       |
| 　y   | smallint(6)  | YES  |     | NULL    |       |
| 　z   | mediumint(9) | YES  |     | NULL    |       |
| 　m   | int(11)      | YES  |     | NULL    |       |
| 　n   | bigint(20)   | YES  |     | NULL    |       |
+-------+--------------+------+-----+---------+-------+
5 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>TINYINT有符号数和无符号数的取值范围分别为-128<sub>127和0</sub>255，由于负号占了一个数字位，因此TINYINT默认的显示宽度为4。同理，其他整数类型的默认显示宽度与其有符号数的最小值的宽度相同。</p><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_int2(
f1 INT,
f2 INT(5),
f3 INT(5) ZEROFILL
)

DESC test_int2;

INSERT INTO test_int2(f1,f2,f3)
VALUES(1,123,123);

INSERT INTO test_int2(f1,f2)
VALUES(123456,123456);

INSERT INTO test_int2(f1,f2,f3)
VALUES(123456,123456,123456);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT * FROM test_int2;
+--------+--------+--------+
| f1     | f2     | f3     |
+--------+--------+--------+
|      1 |    123 |  00123 |
| 123456 | 123456 |   NULL |
| 123456 | 123456 | 123456 |
+--------+--------+--------+
3 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-2-unsigned" tabindex="-1"><a class="header-anchor" href="#_2-2-2-unsigned" aria-hidden="true">#</a> 2.2.2 UNSIGNED</h4><p><code>UNSIGNED</code>: 无符号类型（非负），所有的整数类型都有一个可选的属性UNSIGNED（无符号属性），无符号整数类型的最小取值为0。所以，如果需要在MySQL数据库中保存非负整数值时，可以将整数类型设置为无符号类型。</p><p>int类型默认显示宽度为int(11)，无符号int类型默认显示宽度为int(10)。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_int3(
f1 INT UNSIGNED
);

mysql&gt; desc test_int3;
+-------+------------------+------+-----+---------+-------+
| Field | Type             | Null | Key | Default | Extra |
+-------+------------------+------+-----+---------+-------+
| f1    | int(10) unsigned | YES  |     | NULL    |       |
+-------+------------------+------+-----+---------+-------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-3-zerofill" tabindex="-1"><a class="header-anchor" href="#_2-2-3-zerofill" aria-hidden="true">#</a> 2.2.3 ZEROFILL</h4><p><code>ZEROFILL</code>: 0填充,（如果某列是ZEROFILL，那么MySQL会自动为当前列添加UNSIGNED属性），如果指定了ZEROFILL只是表示不够M位时，用0在左边填充，如果超过M位，只要不超过数据存储范围即可。</p><p>原来，在 int(M) 中，M 的值跟 int(M) 所占多少存储空间并无任何关系。 int(3)、int(4)、int(8) 在磁盘上都是占用 4 bytes 的存储空间。也就是说，**int(M)，必须和UNSIGNED ZEROFILL一起使用才有意义。**如果整数值超过M位，就按照实际位数存储。只是无须再用字符 0 进行填充。</p><h3 id="_2-3-适用场景" tabindex="-1"><a class="header-anchor" href="#_2-3-适用场景" aria-hidden="true">#</a> 2.3 适用场景</h3><p><code>TINYINT</code>：一般用于枚举数据，比如系统设定取值范围很小且固定的场景。</p><p><code>SMALLINT</code>：可以用于较小范围的统计数据，比如统计工厂的固定资产库存数量等。</p><p><code>MEDIUMINT</code>：用于较大整数的计算，比如车站每日的客流量等。</p><p><code>INT、INTEGER</code>：取值范围足够大，一般情况下不用考虑超限问题，用得最多。比如商品编号。</p><p><code>BIGINT</code>：只有当你处理特别巨大的整数时才会用到。比如双十一的交易量、大型门户网站点击量、证券公司衍生产品持仓等。</p><h3 id="_2-4-如何选择" tabindex="-1"><a class="header-anchor" href="#_2-4-如何选择" aria-hidden="true">#</a> 2.4 如何选择？</h3><p>在评估用哪种整数类型的时候，你需要考虑<code>存储空间</code>和<code>可靠性</code>的平衡问题：一方 面，用占用字节数少的整数类型可以节省存储空间；另一方面，要是为了节省存储空间， 使用的整数类型取值范围太小，一旦遇到超出取值范围的情况，就可能引起<code>系统错误</code>，影响可靠性。</p><p>举个例子，商品编号采用的数据类型是 INT。原因就在于，客户门店中流通的商品种类较多，而且，每天都有旧商品下架，新商品上架，这样不断迭代，日积月累。</p><p>如果使用 SMALLINT 类型，虽然占用字节数比 INT 类型的整数少，但是却不能保证数据不会超出范围 65535。相反，使用 INT，就能确保有足够大的取值范围，不用担心数据超出范围影响可靠性的问题。</p><p>你要注意的是，在实际工作中，<strong>系统故障产生的成本远远超过增加几个字段存储空间所产生的成本</strong>。因此，我建议你首先确保数据不会超过取值范围，在这个前提之下，再去考虑如何节省存储空间。</p><h2 id="_3-浮点类型" tabindex="-1"><a class="header-anchor" href="#_3-浮点类型" aria-hidden="true">#</a> 3. 浮点类型</h2><h3 id="_3-1-类型介绍" tabindex="-1"><a class="header-anchor" href="#_3-1-类型介绍" aria-hidden="true">#</a> 3.1 类型介绍</h3><p>浮点数和定点数类型的特点是可以<code>处理小数</code>，你可以把整数看成小数的一个特例。因此，浮点数和定点数的使用场景，比整数大多了。 MySQL支持的浮点数类型，分别是 FLOAT、DOUBLE、REAL。</p><ul><li>FLOAT 表示单精度浮点数；</li><li>DOUBLE 表示双精度浮点数；</li></ul><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211007173312237.png" alt="image-20211007173312237" tabindex="0" loading="lazy"><figcaption>image-20211007173312237</figcaption></figure><ul><li><p>REAL默认就是 DOUBLE。如果你把 SQL 模式设定为启用“<code>REAL_AS_FLOAT</code>”，那 么，MySQL 就认为 REAL 是 FLOAT。如果要启用“REAL_AS_FLOAT”，可以通过以下 SQL 语句实现：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET sql_mode = “REAL_AS_FLOAT”;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><p>**问题1：**FLOAT 和 DOUBLE 这两种数据类型的区别是啥呢？</p><p>FLOAT 占用字节数少，取值范围小；DOUBLE 占用字节数多，取值范围也大。</p><p>**问题2：**为什么浮点数类型的无符号数取值范围，只相当于有符号数取值范围的一半，也就是只相当于有符号数取值范围大于等于零的部分呢？</p><p>MySQL 存储浮点数的格式为：<code>符号(S)</code>、<code>尾数(M)</code>和 <code>阶码(E)</code>。因此，无论有没有符号，MySQL 的浮点数都会存储表示符号的部分。因此， 所谓的无符号数取值范围，其实就是有符号数取值范围大于等于零的部分。</p><h3 id="_3-2-数据精度说明" tabindex="-1"><a class="header-anchor" href="#_3-2-数据精度说明" aria-hidden="true">#</a> 3.2 数据精度说明</h3><p>对于浮点类型，在MySQL中单精度值使用<code>4</code>个字节，双精度值使用<code>8</code>个字节。</p><ul><li><p>MySQL允许使用<code>非标准语法</code>（其他数据库未必支持，因此如果涉及到数据迁移，则最好不要这么用）：<code>FLOAT(M,D)</code>或<code>DOUBLE(M,D)</code>。这里，M称为<code>精度</code>，D称为<code>标度</code>。(M,D)中 M=整数位+小数位，D=小数位。 D&lt;=M&lt;=255，0&lt;=D&lt;=30。</p><p>例如，定义为FLOAT(5,2)的一个列可以显示为-999.99-999.99。如果超过这个范围会报错。</p></li><li><p>FLOAT和DOUBLE类型在不指定(M,D)时，默认会按照实际的精度（由实际的硬件和操作系统决定）来显示。</p></li><li><p>说明：浮点类型，也可以加<code>UNSIGNED</code>，但是不会改变数据范围，例如：FLOAT(3,2) UNSIGNED仍然只能表示0-9.99的范围。</p></li><li><p>不管是否显式设置了精度(M,D)，这里MySQL的处理方案如下：</p><ul><li><p>如果存储时，整数部分超出了范围，MySQL就会报错，不允许存这样的值</p></li><li><p>如果存储时，小数点部分若超出范围，就分以下情况：</p><ul><li>若四舍五入后，整数部分没有超出范围，则只警告，但能成功操作并四舍五入删除多余的小数位后保存。例如在FLOAT(5,2)列内插入999.009，近似结果是999.01。</li><li>若四舍五入后，整数部分超出范围，则MySQL报错，并拒绝处理。如FLOAT(5,2)列内插入999.995和-999.995都会报错。</li></ul></li></ul></li><li><p><strong>从MySQL 8.0.17开始，FLOAT(M,D) 和DOUBLE(M,D)用法在官方文档中已经明确不推荐使用</strong>，将来可能被移除。另外，关于浮点型FLOAT和DOUBLE的UNSIGNED也不推荐使用了，将来也可能被移除。</p></li><li><p>举例</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_double1(
f1 FLOAT,
f2 FLOAT(5,2),
f3 DOUBLE,
f4 DOUBLE(5,2)
);

DESC test_double1;

INSERT INTO test_double1
VALUES(123.456,123.456,123.4567,123.45);

#Out of range value for column &#39;f2&#39; at row 1
INSERT INTO test_double1
VALUES(123.456,1234.456,123.4567,123.45); 

SELECT * FROM test_double1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_3-3-精度误差说明" tabindex="-1"><a class="header-anchor" href="#_3-3-精度误差说明" aria-hidden="true">#</a> 3.3 精度误差说明</h3><p>浮点数类型有个缺陷，就是不精准。下面我来重点解释一下为什么 MySQL 的浮点数不够精准。比如，我们设计一个表，有f1这个字段，插入值分别为0.47,0.44,0.19，我们期待的运行结果是：0.47 + 0.44 + 0.19 = 1.1。而使用sum之后查询：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_double2(
f1 DOUBLE
);

INSERT INTO test_double2
VALUES(0.47),(0.44),(0.19);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT SUM(f1)
    -&gt; FROM test_double2;
+--------------------+
| SUM(f1)            |
+--------------------+
| 1.0999999999999999 |
+--------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT SUM(f1) = 1.1,1.1 = 1.1
    -&gt; FROM test_double2;
+---------------+-----------+
| SUM(f1) = 1.1 | 1.1 = 1.1 |
+---------------+-----------+
|             0 |         1 |
+---------------+-----------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查询结果是 1.0999999999999999。看到了吗？虽然误差很小，但确实有误差。 你也可以尝试把数据类型改成 FLOAT，然后运行求和查询，得到的是， 1.0999999940395355。显然，误差更大了。</p><p>那么，为什么会存在这样的误差呢？问题还是出在 MySQL 对浮点类型数据的存储方式上。</p><p>MySQL 用 4 个字节存储 FLOAT 类型数据，用 8 个字节来存储 DOUBLE 类型数据。无论哪个，都是采用二进制的方式来进行存储的。比如 9.625，用二进制来表达，就是 1001.101，或者表达成 1.001101×2^3。如果尾数不是 0 或 5（比如 9.624），你就无法用一个二进制数来精确表达。进而，就只好在取值允许的范围内进行四舍五入。</p><p>在编程中，如果用到浮点数，要特别注意误差问题，**因为浮点数是不准确的，所以我们要避免使用“=”来判断两个数是否相等。**同时，在一些对精确度要求较高的项目中，千万不要使用浮点数，不然会导致结果错误，甚至是造成不可挽回的损失。那么，MySQL 有没有精准的数据类型呢？当然有，这就是定点数类型：<code>DECIMAL</code>。</p><h2 id="_4-定点数类型" tabindex="-1"><a class="header-anchor" href="#_4-定点数类型" aria-hidden="true">#</a> 4. 定点数类型</h2><h3 id="_4-1-类型介绍" tabindex="-1"><a class="header-anchor" href="#_4-1-类型介绍" aria-hidden="true">#</a> 4.1 类型介绍</h3><ul><li><p>MySQL中的定点数类型只有 DECIMAL 一种类型。</p><table><thead><tr><th>数据类型</th><th>字节数</th><th>含义</th></tr></thead><tbody><tr><td>DECIMAL(M,D),DEC,NUMERIC</td><td>M+2字节</td><td>有效范围由M和D决定</td></tr></tbody></table><p>使用 DECIMAL(M,D) 的方式表示高精度小数。其中，M被称为精度，D被称为标度。0&lt;=M&lt;=65，0&lt;=D&lt;=30，D&lt;M。例如，定义DECIMAL（5,2）的类型，表示该列取值范围是-999.99~999.99。</p></li><li><p><strong>DECIMAL(M,D)的最大取值范围与DOUBLE类型一样</strong>，但是有效的数据范围是由M和D决定的。DECIMAL 的存储空间并不是固定的，由精度值M决定，总共占用的存储空间为M+2个字节。也就是说，在一些对精度要求不高的场景下，比起占用同样字节长度的定点数，浮点数表达的数值范围可以更大一些。</p></li><li><p>定点数在MySQL内部是以<code>字符串</code>的形式进行存储，这就决定了它一定是精准的。</p></li><li><p>当DECIMAL类型不指定精度和标度时，其默认为DECIMAL(10,0)。当数据的精度超出了定点数类型的精度范围时，则MySQL同样会进行四舍五入处理。</p></li><li><p><strong>浮点数 vs 定点数</strong></p><ul><li>浮点数相对于定点数的优点是在长度一定的情况下，浮点类型取值范围大，但是不精准，适用于需要取值范围大，又可以容忍微小误差的科学计算场景（比如计算化学、分子建模、流体动力学等）</li><li>定点数类型取值范围相对小，但是精准，没有误差，适合于对精度要求极高的场景 （比如涉及金额计算的场景）</li></ul></li><li><p>举例</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_decimal1(
f1 DECIMAL,
f2 DECIMAL(5,2)
);

DESC test_decimal1;

INSERT INTO test_decimal1(f1,f2)
VALUES(123.123,123.456);

#Out of range value for column &#39;f2&#39; at row 1
INSERT INTO test_decimal1(f2)
VALUES(1234.34);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT * FROM test_decimal1;
+------+--------+
| f1   | f2     |
+------+--------+
|  123 | 123.46 |
+------+--------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>举例</p><p>我们运行下面的语句，把test_double2表中字段“f1”的数据类型修改为 DECIMAL(5,2)：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE test_double2
MODIFY f1 DECIMAL(5,2);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们再一次运行求和语句：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT SUM(f1)
    -&gt; FROM test_double2;
+---------+
| SUM(f1) |
+---------+
|    1.10 |
+---------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT SUM(f1) = 1.1
    -&gt; FROM test_double2;
+---------------+
| SUM(f1) = 1.1 |
+---------------+
|             1 |
+---------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_4-2-开发中经验" tabindex="-1"><a class="header-anchor" href="#_4-2-开发中经验" aria-hidden="true">#</a> 4.2 开发中经验</h3><blockquote><p>“由于 DECIMAL 数据类型的精准性，在我们的项目中，除了极少数（比如商品编号）用到整数类型外，其他的数值都用的是 DECIMAL，原因就是这个项目所处的零售行业，要求精准，一分钱也不能差。 ” ——来自某项目经理</p></blockquote><h2 id="_5-位类型-bit" tabindex="-1"><a class="header-anchor" href="#_5-位类型-bit" aria-hidden="true">#</a> 5. 位类型：BIT</h2><p>BIT类型中存储的是二进制值，类似010110。</p><table><thead><tr><th>二进制字符串类型</th><th>长度</th><th>长度范围</th><th>占用空间</th></tr></thead><tbody><tr><td>BIT(M)</td><td>M</td><td>1 &lt;= M &lt;= 64</td><td>约为(M + 7)/8个字节</td></tr></tbody></table><p>BIT类型，如果没有指定(M)，默认是1位。这个1位，表示只能存1位的二进制值。这里(M)是表示二进制的位数，位数最小值为1，最大值为64。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_bit1(
f1 BIT,
f2 BIT(5),
f3 BIT(64)
);

INSERT INTO test_bit1(f1)
VALUES(1);

#Data too long for column &#39;f1&#39; at row 1
INSERT INTO test_bit1(f1)
VALUES(2);

INSERT INTO test_bit1(f2)
VALUES(23);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：在向BIT类型的字段中插入数据时，一定要确保插入的数据在BIT类型支持的范围内。</p><p>使用SELECT命令查询位字段时，可以用<code>BIN()</code>或<code>HEX()</code>函数进行读取。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT * FROM test_bit1;
+------------+------------+------------+
| f1         | f2         | f3         |
+------------+------------+------------+
| 0x01       | NULL       | NULL       |
| NULL       | 0x17       | NULL       |
+------------+------------+------------+
2 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT BIN(f2),HEX(f2)
    -&gt; FROM test_bit1;
+---------+---------+
| BIN(f2) | HEX(f2) |
+---------+---------+
| NULL    | NULL    |
| 10111   | 17      |
+---------+---------+
2 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT f2 + 0
    -&gt; FROM test_bit1;
+--------+
| f2 + 0 |
+--------+
|   NULL |
|     23 |
+--------+
2 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，使用b+0查询数据时，可以直接查询出存储的十进制数据的值。</p><h2 id="_6-日期与时间类型" tabindex="-1"><a class="header-anchor" href="#_6-日期与时间类型" aria-hidden="true">#</a> 6. 日期与时间类型</h2><p>日期与时间是重要的信息，在我们的系统中，几乎所有的数据表都用得到。原因是客户需要知道数据的时间标签，从而进行数据查询、统计和处理。</p><p>MySQL有多种表示日期和时间的数据类型，不同的版本可能有所差异，MySQL8.0版本支持的日期和时间类型主要有：YEAR类型、TIME类型、DATE类型、DATETIME类型和TIMESTAMP类型。</p><ul><li><code>YEAR</code>类型通常用来表示年</li><li><code>DATE</code>类型通常用来表示年、月、日</li><li><code>TIME</code>类型通常用来表示时、分、秒</li><li><code>DATETIME</code>类型通常用来表示年、月、日、时、分、秒</li><li><code>TIMESTAMP</code>类型通常用来表示带时区的年、月、日、时、分、秒</li></ul><table><thead><tr><th>类型</th><th>名称</th><th>字节</th><th>日期格式</th><th>最小值</th><th>最大值</th></tr></thead><tbody><tr><td>YEAR</td><td>年</td><td>1</td><td>YYYY或YY</td><td>1901</td><td>2155</td></tr><tr><td>TIME</td><td>时间</td><td>3</td><td>HH:MM:SS</td><td>-838:59:59</td><td>838:59:59</td></tr><tr><td>DATE</td><td>日期</td><td>3</td><td>YYYY-MM-DD</td><td>1000-01-01</td><td>9999-12-03</td></tr><tr><td>DATETIME</td><td>日期时间</td><td>8</td><td>YYYY-MM-DD HH:MM:SS</td><td>1000-01-01 00:00:00</td><td>9999-12-31 23:59:59</td></tr><tr><td>TIMESTAMP</td><td>日期时间</td><td>4</td><td>YYYY-MM-DD HH:MM:SS</td><td>1970-01-01 00:00:00 UTC</td><td>2038-01-19 03:14:07UTC</td></tr></tbody></table><p>可以看到，不同数据类型表示的时间内容不同、取值范围不同，而且占用的字节数也不一样，你要根据实际需要灵活选取。</p><p>为什么时间类型 TIME 的取值范围不是 -23:59:59～23:59:59 呢？原因是 MySQL 设计的 TIME 类型，不光表示一天之内的时间，而且可以用来表示一个时间间隔，这个时间间隔可以超过 24 小时。</p><h3 id="_6-1-year类型" tabindex="-1"><a class="header-anchor" href="#_6-1-year类型" aria-hidden="true">#</a> 6.1 YEAR类型</h3><p>YEAR类型用来表示年份，在所有的日期时间类型中所占用的存储空间最小，只需要<code>1个字节</code>的存储空间。</p><p>在MySQL中，YEAR有以下几种存储格式：</p><ul><li>以4位字符串或数字格式表示YEAR类型，其格式为YYYY，最小值为1901，最大值为2155。</li><li>以2位字符串格式表示YEAR类型，最小值为00，最大值为99。 <ul><li>当取值为01到69时，表示2001到2069；</li><li>当取值为70到99时，表示1970到1999；</li><li>当取值整数的0或00添加的话，那么是0000年；</li><li>当取值是日期/字符串的&#39;0&#39;添加的话，是2000年。</li></ul></li></ul><p><strong>从MySQL5.5.27开始，2位格式的YEAR已经不推荐使用</strong>。YEAR默认格式就是“YYYY”，没必要写成YEAR(4)，从MySQL 8.0.19开始，不推荐使用指定显示宽度的YEAR(4)数据类型。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_year(
f1 YEAR,
f2 YEAR(4)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; DESC test_year;
+-------+---------+------+-----+---------+-------+
| Field | Type    | Null | Key | Default | Extra |
+-------+---------+------+-----+---------+-------+
| f1    | year(4) | YES  |     | NULL    |       |
| f2    | year(4) | YES  |     | NULL    |       |
+-------+---------+------+-----+---------+-------+
2 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO test_year
VALUES(&#39;2020&#39;,&#39;2021&#39;);

mysql&gt; SELECT * FROM test_year;
+------+------+
| f1   | f2   |
+------+------+
| 2020 | 2021 |
+------+------+
1 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO test_year
VALUES(&#39;45&#39;,&#39;71&#39;);

INSERT INTO test_year
VALUES(0,&#39;0&#39;);

mysql&gt; SELECT * FROM test_year;
+------+------+
| f1   | f2   |
+------+------+
| 2020 | 2021 |
| 2045 | 1971 |
| 0000 | 2000 |
+------+------+
3 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-date类型" tabindex="-1"><a class="header-anchor" href="#_6-2-date类型" aria-hidden="true">#</a> 6.2 DATE类型</h3><p>DATE类型表示日期，没有时间部分，格式为<code>YYYY-MM-DD</code>，其中，YYYY表示年份，MM表示月份，DD表示日期。需要<code>3个字节</code>的存储空间。在向DATE类型的字段插入数据时，同样需要满足一定的格式条件。</p><ul><li>以<code>YYYY-MM-DD</code>格式或者<code>YYYYMMDD</code>格式表示的字符串日期，其最小取值为1000-01-01，最大取值为9999-12-03。YYYYMMDD格式会被转化为YYYY-MM-DD格式。</li><li>以<code>YY-MM-DD</code>格式或者<code>YYMMDD</code>格式表示的字符串日期，此格式中，年份为两位数值或字符串满足YEAR类型的格式条件为：当年份取值为00到69时，会被转化为2000到2069；当年份取值为70到99时，会被转化为1970到1999。</li><li>使用<code>CURRENT_DATE()</code>或者<code>NOW()</code>函数，会插入当前系统的日期。</li></ul><p><strong>举例：</strong></p><p>创建数据表，表中只包含一个DATE类型的字段f1。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_date1(
f1 DATE
);
Query OK, 0 rows affected (0.13 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>插入数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO test_date1
VALUES (&#39;2020-10-01&#39;), (&#39;20201001&#39;),(20201001);

INSERT INTO test_date1
VALUES (&#39;00-01-01&#39;), (&#39;000101&#39;), (&#39;69-10-01&#39;), (&#39;691001&#39;), (&#39;70-01-01&#39;), (&#39;700101&#39;), (&#39;99-01-01&#39;), (&#39;990101&#39;);

INSERT INTO test_date1
VALUES (000301), (690301), (700301), (990301); 

INSERT INTO test_date1
VALUES (CURRENT_DATE()), (NOW());

SELECT *
FROM test_date1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-time类型" tabindex="-1"><a class="header-anchor" href="#_6-3-time类型" aria-hidden="true">#</a> 6.3 TIME类型</h3><p>TIME类型用来表示时间，不包含日期部分。在MySQL中，需要<code>3个字节</code>的存储空间来存储TIME类型的数据，可以使用“HH:MM:SS”格式来表示TIME类型，其中，HH表示小时，MM表示分钟，SS表示秒。</p><p>在MySQL中，向TIME类型的字段插入数据时，也可以使用几种不同的格式。<br> （1）可以使用带有冒号的字符串，比如&#39;<code>D HH:MM:SS&#39;</code>、&#39;<code>HH:MM:SS</code>&#39;、&#39;<code>HH:MM</code>&#39;、&#39;<code>D HH:MM</code>&#39;、&#39;<code>D HH</code>&#39;或&#39;<code>SS</code>&#39;格式，都能被正确地插入TIME类型的字段中。其中D表示天，其最小值为0，最大值为34。如果使用带有D格式的字符串插入TIME类型的字段时，D会被转化为小时，计算格式为D*24+HH。当使用带有冒号并且不带D的字符串表示时间时，表示当天的时间，比如12:10表示12:10:00，而不是00:12:10。<br> （2）可以使用不带有冒号的字符串或者数字，格式为&#39;<code>HHMMSS</code>&#39;或者<code>HHMMSS</code>。如果插入一个不合法的字符串或者数字，MySQL在存储数据时，会将其自动转化为00:00:00进行存储。比如1210，MySQL会将最右边的两位解析成秒，表示00:12:10，而不是12:10:00。<br> （3）使用<code>CURRENT_TIME()</code>或者<code>NOW()</code>，会插入当前系统的时间。</p><p><strong>举例：</strong></p><p>创建数据表，表中包含一个TIME类型的字段f1。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_time1(
f1 TIME
);
Query OK, 0 rows affected (0.02 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO test_time1
VALUES(&#39;2 12:30:29&#39;), (&#39;12:35:29&#39;), (&#39;12:40&#39;), (&#39;2 12:40&#39;),(&#39;1 05&#39;), (&#39;45&#39;);

INSERT INTO test_time1
VALUES (&#39;123520&#39;), (124011),(1210);

INSERT INTO test_time1
VALUES (NOW()), (CURRENT_TIME());

SELECT * FROM test_time1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-datetime类型" tabindex="-1"><a class="header-anchor" href="#_6-4-datetime类型" aria-hidden="true">#</a> 6.4 DATETIME类型</h3><p>DATETIME类型在所有的日期时间类型中占用的存储空间最大，总共需要<code>8</code>个字节的存储空间。在格式上为DATE类型和TIME类型的组合，可以表示为<code>YYYY-MM-DD HH:MM:SS</code>，其中YYYY表示年份，MM表示月份，DD表示日期，HH表示小时，MM表示分钟，SS表示秒。</p><p>在向DATETIME类型的字段插入数据时，同样需要满足一定的格式条件。</p><ul><li>以<code>YYYY-MM-DD HH:MM:SS</code>格式或者<code>YYYYMMDDHHMMSS</code>格式的字符串插入DATETIME类型的字段时，最小值为1000-01-01 00:00:00，最大值为9999-12-03 23:59:59。 <ul><li>以YYYYMMDDHHMMSS格式的数字插入DATETIME类型的字段时，会被转化为YYYY-MM-DD HH:MM:SS格式。</li></ul></li><li>以<code>YY-MM-DD HH:MM:SS</code>格式或者<code>YYMMDDHHMMSS</code>格式的字符串插入DATETIME类型的字段时，两位数的年份规则符合YEAR类型的规则，00到69表示2000到2069；70到99表示1970到1999。</li><li>使用函数<code>CURRENT_TIMESTAMP()</code>和<code>NOW()</code>，可以向DATETIME类型的字段插入系统的当前日期和时间。</li></ul><p><strong>举例：</strong></p><p>创建数据表，表中包含一个DATETIME类型的字段dt。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_datetime1(
dt DATETIME
);
Query OK, 0 rows affected (0.02 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>插入数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO test_datetime1
VALUES (&#39;2021-01-01 06:50:30&#39;), (&#39;20210101065030&#39;);

INSERT INTO test_datetime1
VALUES (&#39;99-01-01 00:00:00&#39;), (&#39;990101000000&#39;), (&#39;20-01-01 00:00:00&#39;), (&#39;200101000000&#39;);

INSERT INTO test_datetime1
VALUES (20200101000000), (200101000000), (19990101000000), (990101000000);
 
INSERT INTO test_datetime1
VALUES (CURRENT_TIMESTAMP()), (NOW());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-5-timestamp类型" tabindex="-1"><a class="header-anchor" href="#_6-5-timestamp类型" aria-hidden="true">#</a> 6.5 TIMESTAMP类型</h3><p>TIMESTAMP类型也可以表示日期时间，其显示格式与DATETIME类型相同，都是<code>YYYY-MM-DD HH:MM:SS</code>，需要4个字节的存储空间。但是TIMESTAMP存储的时间范围比DATETIME要小很多，只能存储“1970-01-01 00:00:01 UTC”到“2038-01-19 03:14:07 UTC”之间的时间。其中，UTC表示世界统一时间，也叫作世界标准时间。</p><ul><li><strong>存储数据的时候需要对当前时间所在的时区进行转换，查询数据的时候再将时间转换回当前的时区。因此，使用TIMESTAMP存储的同一个时间值，在不同的时区查询时会显示不同的时间。</strong></li></ul><p>向TIMESTAMP类型的字段插入数据时，当插入的数据格式满足YY-MM-DD HH:MM:SS和YYMMDDHHMMSS时，两位数值的年份同样符合YEAR类型的规则条件，只不过表示的时间范围要小很多。</p><p>如果向TIMESTAMP类型的字段插入的时间超出了TIMESTAMP类型的范围，则MySQL会抛出错误信息。</p><p><strong>举例：</strong></p><p>创建数据表，表中包含一个TIMESTAMP类型的字段ts。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_timestamp1(
ts TIMESTAMP
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>插入数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO test_timestamp1
VALUES (&#39;1999-01-01 03:04:50&#39;), (&#39;19990101030405&#39;), (&#39;99-01-01 03:04:05&#39;), (&#39;990101030405&#39;);

INSERT INTO test_timestamp1
VALUES (&#39;2020@01@01@00@00@00&#39;), (&#39;20@01@01@00@00@00&#39;);

INSERT INTO test_timestamp1
VALUES (CURRENT_TIMESTAMP()), (NOW());

#Incorrect datetime value
INSERT INTO test_timestamp1
VALUES (&#39;2038-01-20 03:14:07&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>TIMESTAMP和DATETIME的区别：</strong></p><ul><li><p>TIMESTAMP存储空间比较小，表示的日期时间范围也比较小</p></li><li><p>底层存储方式不同，TIMESTAMP底层存储的是毫秒值，距离1970-1-1 0:0:0 0毫秒的毫秒值。</p></li><li><p>两个日期比较大小或日期计算时，TIMESTAMP更方便、更快。</p></li><li><p>TIMESTAMP和时区有关。TIMESTAMP会根据用户的时区不同，显示不同的结果。而DATETIME则只能反映出插入时当地的时区，其他时区的人查看数据必然会有误差的。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE temp_time(
d1 DATETIME,
d2 TIMESTAMP
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO temp_time VALUES(&#39;2021-9-2 14:45:52&#39;,&#39;2021-9-2 14:45:52&#39;);

INSERT INTO temp_time VALUES(NOW(),NOW());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT * FROM temp_time;
+---------------------+---------------------+
| d1                  | d2                  |
+---------------------+---------------------+
| 2021-09-02 14:45:52 | 2021-09-02 14:45:52 |
| 2021-11-03 17:38:17 | 2021-11-03 17:38:17 |
+---------------------+---------------------+
2 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#修改当前的时区
SET time_zone = &#39;+9:00&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT * FROM temp_time;
+---------------------+---------------------+
| d1                  | d2                  |
+---------------------+---------------------+
| 2021-09-02 14:45:52 | 2021-09-02 15:45:52 |
| 2021-11-03 17:38:17 | 2021-11-03 18:38:17 |
+---------------------+---------------------+
2 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_6-6-开发中经验" tabindex="-1"><a class="header-anchor" href="#_6-6-开发中经验" aria-hidden="true">#</a> 6.6 开发中经验</h3><p>用得最多的日期时间类型，就是 <code>DATETIME</code>。虽然 MySQL 也支持 YEAR（年）、 TIME（时间）、DATE（日期），以及 TIMESTAMP 类型，但是在实际项目中，尽量用 DATETIME 类型。因为这个数据类型包括了完整的日期和时间信息，取值范围也最大，使用起来比较方便。毕竟，如果日期时间信息分散在好几个字段，很不容易记，而且查询的时候，SQL 语句也会更加复杂。</p><p>此外，一般存注册时间、商品发布时间等，不建议使用DATETIME存储，而是使用<code>时间戳</code>，因为DATETIME虽然直观，但不便于计算。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT UNIX_TIMESTAMP();
+------------------+
| UNIX_TIMESTAMP() |
+------------------+
|       1635932762 |
+------------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-文本字符串类型" tabindex="-1"><a class="header-anchor" href="#_7-文本字符串类型" aria-hidden="true">#</a> 7. 文本字符串类型</h2><p>在实际的项目中，我们还经常遇到一种数据，就是字符串数据。</p><p>MySQL中，文本字符串总体上分为<code>CHAR</code>、<code>VARCHAR</code>、<code>TINYTEXT</code>、<code>TEXT</code>、<code>MEDIUMTEXT</code>、<code>LONGTEXT</code>、<code>ENUM</code>、<code>SET</code>等类型。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/cisyam/202308291645774.png" alt="image-20211012003508730" tabindex="0" loading="lazy"><figcaption>image-20211012003508730</figcaption></figure><h3 id="_7-1-char与varchar类型" tabindex="-1"><a class="header-anchor" href="#_7-1-char与varchar类型" aria-hidden="true">#</a> 7.1 CHAR与VARCHAR类型</h3><p>CHAR和VARCHAR类型都可以存储比较短的字符串。</p><table><thead><tr><th>字符串(文本)类型</th><th>特点</th><th>长度</th><th>长度范围</th><th>占用的存储空间</th></tr></thead><tbody><tr><td>CHAR(M)</td><td>固定长度</td><td>M</td><td>0 &lt;= M &lt;= 255</td><td>M个字节</td></tr><tr><td>VARCHAR(M)</td><td>可变长度</td><td>M</td><td>0 &lt;= M &lt;= 65535</td><td>(实际长度 + 1) 个字节</td></tr></tbody></table><p><strong>CHAR类型：</strong></p><ul><li>CHAR(M) 类型一般需要预先定义字符串长度。如果不指定(M)，则表示长度默认是1个字符。</li><li>如果保存时，数据的实际长度比CHAR类型声明的长度小，则会在<code>右侧填充</code>空格以达到指定的长度。当MySQL检索CHAR类型的数据时，CHAR类型的字段会去除尾部的空格。</li><li>定义CHAR类型字段时，声明的字段长度即为CHAR类型字段所占的存储空间的字节数。</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_char1(
c1 CHAR,
c2 CHAR(5)
);

DESC test_char1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO test_char1
VALUES(&#39;a&#39;,&#39;Tom&#39;);

SELECT c1,CONCAT(c2,&#39;***&#39;) FROM test_char1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO test_char1(c2)
VALUES(&#39;a  &#39;);

SELECT CHAR_LENGTH(c2)
FROM test_char1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>VARCHAR类型：</strong></p><ul><li>VARCHAR(M) 定义时，<code>必须指定</code>长度M，否则报错。</li><li>MySQL4.0版本以下，varchar(20)：指的是20字节，如果存放UTF8汉字时，只能存6个（每个汉字3字节） ；MySQL5.0版本以上，varchar(20)：指的是20字符。</li><li>检索VARCHAR类型的字段数据时，会保留数据尾部的空格。VARCHAR类型的字段所占用的存储空间为字符串实际长度加1个字节。</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_varchar1(
NAME VARCHAR  #错误
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#Column length too big for column &#39;NAME&#39; (max = 21845);
CREATE TABLE test_varchar2(
NAME VARCHAR(65535)  #错误
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_varchar3(
NAME VARCHAR(5)
);

INSERT INTO test_varchar3
VALUES(&#39;尚硅谷&#39;),(&#39;尚硅谷教育&#39;);

#Data too long for column &#39;NAME&#39; at row 1
INSERT INTO test_varchar3
VALUES(&#39;尚硅谷IT教育&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>哪些情况使用 CHAR 或 VARCHAR 更好</strong></p><table><thead><tr><th>类型</th><th>特点</th><th>空间上</th><th>时间上</th><th>适用场景</th></tr></thead><tbody><tr><td>CHAR(M)</td><td>固定长度</td><td>浪费存储空间</td><td>效率高</td><td>存储不大，速度要求高</td></tr><tr><td>VARCHAR(M)</td><td>可变长度</td><td>节省存储空间</td><td>效率低</td><td>非CHAR的情况</td></tr></tbody></table><p>情况1：存储很短的信息。比如门牌号码101，201……这样很短的信息应该用char，因为varchar还要占个byte用于存储信息长度，本来打算节约存储的，结果得不偿失。</p><p>情况2：固定长度的。比如使用uuid作为主键，那用char应该更合适。因为他固定长度，varchar动态根据长度的特性就消失了，而且还要占个长度信息。</p><p>情况3：十分频繁改变的column。因为varchar每次存储都要有额外的计算，得到长度等工作，如果一个非常频繁改变的，那就要有很多的精力用于计算，而这些对于char来说是不需要的。</p><p>情况4：具体存储引擎中的情况：</p><ul><li><p><code>MyISAM</code> 数据存储引擎和数据列：MyISAM数据表，最好使用固定长度(CHAR)的数据列代替可变长度(VARCHAR)的数据列。这样使得整个表静态化，从而使<code>数据检索更快</code>，用空间换时间。</p></li><li><p><code>MEMORY</code> 存储引擎和数据列：MEMORY数据表目前都使用固定长度的数据行存储，因此无论使用CHAR或VARCHAR列都没有关系，两者都是作为CHAR类型处理的。</p></li><li><p><code>InnoDB</code>存储引擎，建议使用VARCHAR类型。因为对于InnoDB数据表，内部的行存储格式并没有区分固定长度和可变长度列（所有数据行都使用指向数据列值的头指针），而且<strong>主要影响性能的因素是数据行使用的存储总量</strong>，由于char平均占用的空间多于varchar，所以除了简短并且固定长度的，其他考虑varchar。这样节省空间，对磁盘I/O和数据存储总量比较好。</p></li></ul><h3 id="_7-2-text类型" tabindex="-1"><a class="header-anchor" href="#_7-2-text类型" aria-hidden="true">#</a> 7.2 TEXT类型</h3><p>在MySQL中，TEXT用来保存文本类型的字符串，总共包含4种类型，分别为TINYTEXT、TEXT、MEDIUMTEXT 和 LONGTEXT 类型。</p><p>在向TEXT类型的字段保存和查询数据时，系统自动按照实际长度存储，不需要预先定义长度。这一点和 VARCHAR类型相同。</p><p>每种TEXT类型保存的数据长度和所占用的存储空间不同，如下：</p><table><thead><tr><th>文本字符串类型</th><th>特点</th><th>长度</th><th>长度范围</th><th>占用的存储空间</th></tr></thead><tbody><tr><td>TINYTEXT</td><td>小文本、可变长度</td><td>L</td><td>0 &lt;= L &lt;= 255</td><td>L + 2 个字节</td></tr><tr><td>TEXT</td><td>文本、可变长度</td><td>L</td><td>0 &lt;= L &lt;= 65535</td><td>L + 2 个字节</td></tr><tr><td>MEDIUMTEXT</td><td>中等文本、可变长度</td><td>L</td><td>0 &lt;= L &lt;= 16777215</td><td>L + 3 个字节</td></tr><tr><td>LONGTEXT</td><td>大文本、可变长度</td><td>L</td><td>0 &lt;= L&lt;= 4294967295（相当于4GB）</td><td>L + 4 个字节</td></tr></tbody></table><p><strong>由于实际存储的长度不确定，MySQL 不允许 TEXT 类型的字段做主键</strong>。遇到这种情况，你只能采用 CHAR(M)，或者 VARCHAR(M)。</p><p><strong>举例：</strong></p><p>创建数据表：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_text(
tx TEXT
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO test_text
VALUES(&#39;atguigu   &#39;);

SELECT CHAR_LENGTH(tx)
FROM test_text; #10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明在保存和查询数据时，并没有删除TEXT类型的数据尾部的空格。</p><p><strong>开发中经验：</strong></p><p>TEXT文本类型，可以存比较大的文本段，搜索速度稍慢，因此如果不是特别大的内容，建议使用CHAR，VARCHAR来代替。还有TEXT类型不用加默认值，加了也没用。而且text和blob类型的数据删除后容易导致“空洞”，使得文件碎片比较多，所以频繁使用的表不建议包含TEXT类型字段，建议单独分出去，单独用一个表。</p><h2 id="_8-enum类型" tabindex="-1"><a class="header-anchor" href="#_8-enum类型" aria-hidden="true">#</a> 8. ENUM类型</h2><p>ENUM类型也叫作枚举类型，ENUM类型的取值范围需要在定义字段时进行指定。设置字段值时，ENUM类型只允许从成员中选取单个值，不能一次选取多个值。</p><p>其所需要的存储空间由定义ENUM类型时指定的成员个数决定。</p><table><thead><tr><th>文本字符串类型</th><th>长度</th><th>长度范围</th><th>占用的存储空间</th></tr></thead><tbody><tr><td>ENUM</td><td>L</td><td>1 &lt;= L &lt;= 65535</td><td>1或2个字节</td></tr></tbody></table><ul><li><p>当ENUM类型包含1～255个成员时，需要1个字节的存储空间；</p></li><li><p>当ENUM类型包含256～65535个成员时，需要2个字节的存储空间。</p></li><li><p>ENUM类型的成员个数的上限为65535个。</p></li></ul><p>举例：</p><p>创建表如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_enum(
season ENUM(&#39;春&#39;,&#39;夏&#39;,&#39;秋&#39;,&#39;冬&#39;,&#39;unknow&#39;)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO test_enum
VALUES(&#39;春&#39;),(&#39;秋&#39;);

# 忽略大小写
INSERT INTO test_enum
VALUES(&#39;UNKNOW&#39;);

# 允许按照角标的方式获取指定索引位置的枚举值
INSERT INTO test_enum
VALUES(&#39;1&#39;),(3);

# Data truncated for column &#39;season&#39; at row 1
INSERT INTO test_enum
VALUES(&#39;ab&#39;);

# 当ENUM类型的字段没有声明为NOT NULL时，插入NULL也是有效的
INSERT INTO test_enum
VALUES(NULL);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-set类型" tabindex="-1"><a class="header-anchor" href="#_9-set类型" aria-hidden="true">#</a> 9. SET类型</h2><p>SET表示一个字符串对象，可以包含0个或多个成员，但成员个数的上限为<code>64</code>。设置字段值时，可以取取值范围内的 0 个或多个值。</p><p>当SET类型包含的成员个数不同时，其所占用的存储空间也是不同的，具体如下：</p><table><thead><tr><th>成员个数范围（L表示实际成员个数）</th><th>占用的存储空间</th></tr></thead><tbody><tr><td>1 &lt;= L &lt;= 8</td><td>1个字节</td></tr><tr><td>9 &lt;= L &lt;= 16</td><td>2个字节</td></tr><tr><td>17 &lt;= L &lt;= 24</td><td>3个字节</td></tr><tr><td>25 &lt;= L &lt;= 32</td><td>4个字节</td></tr><tr><td>33 &lt;= L &lt;= 64</td><td>8个字节</td></tr></tbody></table><p>SET类型在存储数据时成员个数越多，其占用的存储空间越大。注意：SET类型在选取成员时，可以一次选择多个成员，这一点与ENUM类型不同。</p><p>举例：</p><p>创建表：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_set(
s SET (&#39;A&#39;, &#39;B&#39;, &#39;C&#39;)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>向表中插入数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO test_set (s) VALUES (&#39;A&#39;), (&#39;A,B&#39;);

#插入重复的SET类型成员时，MySQL会自动删除重复的成员
INSERT INTO test_set (s) VALUES (&#39;A,B,C,A&#39;);

#向SET类型的字段插入SET成员中不存在的值时，MySQL会抛出错误。
INSERT INTO test_set (s) VALUES (&#39;A,B,C,D&#39;);

SELECT *
FROM test_set;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE temp_mul(
gender ENUM(&#39;男&#39;,&#39;女&#39;),
hobby SET(&#39;吃饭&#39;,&#39;睡觉&#39;,&#39;打豆豆&#39;,&#39;写代码&#39;)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO temp_mul VALUES(&#39;男&#39;,&#39;睡觉,打豆豆&#39;); #成功

# Data truncated for column &#39;gender&#39; at row 1
INSERT INTO temp_mul VALUES(&#39;男,女&#39;,&#39;睡觉,写代码&#39;); #失败

# Data truncated for column &#39;gender&#39; at row 1
INSERT INTO temp_mul VALUES(&#39;妖&#39;,&#39;睡觉,写代码&#39;);#失败


INSERT INTO temp_mul VALUES(&#39;男&#39;,&#39;睡觉,写代码,吃饭&#39;); #成功
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10-二进制字符串类型" tabindex="-1"><a class="header-anchor" href="#_10-二进制字符串类型" aria-hidden="true">#</a> 10. 二进制字符串类型</h2><p>MySQL中的二进制字符串类型主要存储一些二进制数据，比如可以存储图片、音频和视频等二进制数据。</p><p>MySQL中支持的二进制字符串类型主要包括BINARY、VARBINARY、TINYBLOB、BLOB、MEDIUMBLOB 和 LONGBLOB类型。</p><h4 id="binary与varbinary类型" tabindex="-1"><a class="header-anchor" href="#binary与varbinary类型" aria-hidden="true">#</a> BINARY与VARBINARY类型</h4><p>BINARY和VARBINARY类似于CHAR和VARCHAR，只是它们存储的是二进制字符串。</p><p>BINARY (M)为固定长度的二进制字符串，M表示最多能存储的字节数，取值范围是0~255个字符。如果未指定(M)，表示只能存储<code>1个字节</code>。例如BINARY (8)，表示最多能存储8个字节，如果字段值不足(M)个字节，将在右边填充&#39;\\0&#39;以补齐指定长度。</p><p>VARBINARY (M)为可变长度的二进制字符串，M表示最多能存储的字节数，总字节数不能超过行的字节长度限制65535，另外还要考虑额外字节开销，VARBINARY类型的数据除了存储数据本身外，还需要1或2个字节来存储数据的字节数。VARBINARY类型<code>必须指定(M)</code>，否则报错。</p><table><thead><tr><th>二进制字符串类型</th><th>特点</th><th>值的长度</th><th>占用空间</th></tr></thead><tbody><tr><td>BINARY(M)</td><td>固定长度</td><td>M （0 &lt;= M &lt;= 255）</td><td>M个字节</td></tr><tr><td>VARBINARY(M)</td><td>可变长度</td><td>M（0 &lt;= M &lt;= 65535）</td><td>M+1个字节</td></tr></tbody></table><p>举例：</p><p>创建表：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_binary1(
f1 BINARY,
f2 BINARY(3),
# f3 VARBINARY,
f4 VARBINARY(10)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO test_binary1(f1,f2)
VALUES(&#39;a&#39;,&#39;a&#39;);

INSERT INTO test_binary1(f1,f2)
VALUES(&#39;尚&#39;,&#39;尚&#39;);#失败
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO test_binary1(f2,f4)
VALUES(&#39;ab&#39;,&#39;ab&#39;);

mysql&gt; SELECT LENGTH(f2),LENGTH(f4)
    -&gt; FROM test_binary1;
+------------+------------+
| LENGTH(f2) | LENGTH(f4) |
+------------+------------+
|          3 |       NULL |
|          3 |          2 |
+------------+------------+
2 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="blob类型" tabindex="-1"><a class="header-anchor" href="#blob类型" aria-hidden="true">#</a> BLOB类型</h4><p>BLOB是一个<code>二进制大对象</code>，可以容纳可变数量的数据。</p><p>MySQL中的BLOB类型包括TINYBLOB、BLOB、MEDIUMBLOB和LONGBLOB 4种类型，它们可容纳值的最大长度不同。可以存储一个二进制的大对象，比如<code>图片</code>、<code>音频</code>和<code>视频</code>等。</p><p>需要注意的是，在实际工作中，往往不会在MySQL数据库中使用BLOB类型存储大对象数据，通常会将图片、音频和视频文件存储到<code>服务器的磁盘上</code>，并将图片、音频和视频的访问路径存储到MySQL中。</p><table><thead><tr><th>二进制字符串类型</th><th>值的长度</th><th>长度范围</th><th>占用空间</th></tr></thead><tbody><tr><td>TINYBLOB</td><td>L</td><td>0 &lt;= L &lt;= 255</td><td>L + 1 个字节</td></tr><tr><td>BLOB</td><td>L</td><td>0 &lt;= L &lt;= 65535（相当于64KB）</td><td>L + 2 个字节</td></tr><tr><td>MEDIUMBLOB</td><td>L</td><td>0 &lt;= L &lt;= 16777215 （相当于16MB）</td><td>L + 3 个字节</td></tr><tr><td>LONGBLOB</td><td>L</td><td>0 &lt;= L &lt;= 4294967295（相当于4GB）</td><td>L + 4 个字节</td></tr></tbody></table><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_blob1(
id INT,
img MEDIUMBLOB
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>TEXT和BLOB的使用注意事项：</strong></p><p>在使用text和blob字段类型时要注意以下几点，以便更好的发挥数据库的性能。</p><p>① BLOB和TEXT值也会引起自己的一些问题，特别是执行了大量的删除或更新操作的时候。删除这种值会在数据表中留下很大的&quot;<code>空洞</code>&quot;，以后填入这些&quot;空洞&quot;的记录可能长度不同。为了提高性能，建议定期使用 OPTIMIZE TABLE 功能对这类表进行<code>碎片整理</code>。</p><p>② 如果需要对大文本字段进行模糊查询，MySQL 提供了<code>前缀索引</code>。但是仍然要在不必要的时候避免检索大型的BLOB或TEXT值。例如，SELECT * 查询就不是很好的想法，除非你能够确定作为约束条件的WHERE子句只会找到所需要的数据行。否则，你可能毫无目的地在网络上传输大量的值。</p><p>③ 把BLOB或TEXT列<code>分离到单独的表</code>中。在某些环境中，如果把这些数据列移动到第二张数据表中，可以让你把原数据表中的数据列转换为固定长度的数据行格式，那么它就是有意义的。这会<code>减少主表中的碎片</code>，使你得到固定长度数据行的性能优势。它还使你在主数据表上运行 SELECT * 查询的时候不会通过网络传输大量的BLOB或TEXT值。</p><h2 id="_11-json-类型" tabindex="-1"><a class="header-anchor" href="#_11-json-类型" aria-hidden="true">#</a> 11. JSON 类型</h2><p>JSON（JavaScript Object Notation）是一种轻量级的<code>数据交换格式</code>。简洁和清晰的层次结构使得 JSON 成为理想的数据交换语言。它易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率。<strong>JSON 可以将 JavaScript 对象中表示的一组数据转换为字符串，然后就可以在网络或者程序之间轻松地传递这个字符串，并在需要的时候将它还原为各编程语言所支持的数据格式。</strong></p><p>在MySQL 5.7中，就已经支持JSON数据类型。在MySQL 8.x版本中，JSON类型提供了可以进行自动验证的JSON文档和优化的存储结构，使得在MySQL中存储和读取JSON类型的数据更加方便和高效。<br> 创建数据表，表中包含一个JSON类型的字段 js 。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_json(
js json

);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>向表中插入JSON数据。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO test_json (js) 
VALUES (&#39;{&quot;name&quot;:&quot;songhk&quot;, &quot;age&quot;:18, &quot;address&quot;:{&quot;province&quot;:&quot;beijing&quot;, &quot;city&quot;:&quot;beijing&quot;}}&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查询t19表中的数据。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT *
    -&gt; FROM test_json;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211104192516324.png" alt="image-20211104192516324" tabindex="0" loading="lazy"><figcaption>image-20211104192516324</figcaption></figure><p>当需要检索JSON类型的字段中数据的某个具体值时，可以使用“-&gt;”和“-&gt;&gt;”符号。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT js -&gt; &#39;$.name&#39; AS NAME,js -&gt; &#39;$.age&#39; AS age ,js -&gt; &#39;$.address.province&#39; AS province, js -&gt; &#39;$.address.city&#39; AS city
    -&gt; FROM test_json;
+----------+------+-----------+-----------+
| NAME     | age  | province  | city      |
+----------+------+-----------+-----------+
| &quot;songhk&quot; | 18   | &quot;beijing&quot; | &quot;beijing&quot; |
+----------+------+-----------+-----------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过“-&gt;”和“-&gt;&gt;”符号，从JSON字段中正确查询出了指定的JSON数据的值。</p><h2 id="_12-空间类型" tabindex="-1"><a class="header-anchor" href="#_12-空间类型" aria-hidden="true">#</a> 12. 空间类型</h2><p>MySQL 空间类型扩展支持地理特征的生成、存储和分析。这里的地理特征表示世界上具有位置的任何东西，可以是一个实体，例如一座山；可以是空间，例如一座办公楼；也可以是一个可定义的位置，例如一个十字路口等等。MySQL中使用<code>Geometry（几何）</code>来表示所有地理特征。Geometry指一个点或点的集合，代表世界上任何具有位置的事物。</p><p>MySQL的空间数据类型（Spatial Data Type）对应于OpenGIS类，包括单值类型：GEOMETRY、POINT、LINESTRING、POLYGON以及集合类型：MULTIPOINT、MULTILINESTRING、MULTIPOLYGON、GEOMETRYCOLLECTION 。</p><ul><li>Geometry是所有空间集合类型的基类，其他类型如POINT、LINESTRING、POLYGON都是Geometry的子类。 <ul><li>Point，顾名思义就是点，有一个坐标值。例如POINT(121.213342 31.234532)，POINT(30 10)，坐标值支持DECIMAL类型，经度（longitude）在前，维度（latitude）在后，用空格分隔。</li><li>LineString，线，由一系列点连接而成。如果线从头至尾没有交叉，那就是简单的（simple）；如果起点和终点重叠，那就是封闭的（closed）。例如LINESTRING(30 10,10 30,40 40)，点与点之间用逗号分隔，一个点中的经纬度用空格分隔，与POINT格式一致。</li><li>Polygon，多边形。可以是一个实心平面形，即没有内部边界，也可以有空洞，类似纽扣。最简单的就是只有一个外边界的情况，例如POLYGON((0 0,10 0,10 10, 0 10))。</li></ul></li></ul><p>下面展示几种常见的几何图形元素：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211104192912988.png" alt="image-20211104192912988" tabindex="0" loading="lazy"><figcaption>image-20211104192912988</figcaption></figure><ul><li>MultiPoint、MultiLineString、MultiPolygon、GeometryCollection 这4种类型都是集合类，是多个Point、LineString或Polygon组合而成。</li></ul><p>下面展示的是多个同类或异类几何图形元素的组合：</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20211104193330204.png" alt="image-20211104193330204" tabindex="0" loading="lazy"><figcaption>image-20211104193330204</figcaption></figure><h2 id="_13-小结及选择建议" tabindex="-1"><a class="header-anchor" href="#_13-小结及选择建议" aria-hidden="true">#</a> 13. 小结及选择建议</h2><p>在定义数据类型时，如果确定是<code>整数</code>，就用<code> INT</code>； 如果是<code>小数</code>，一定用定点数类型 <code>DECIMAL(M,D)</code>； 如果是日期与时间，就用 <code>DATETIME</code>。</p><p>这样做的好处是，首先确保你的系统不会因为数据类型定义出错。不过，凡事都是有两面的，可靠性好，并不意味着高效。比如，TEXT 虽然使用方便，但是效率不如 CHAR(M) 和 VARCHAR(M)。</p><p>关于字符串的选择，建议参考如下阿里巴巴的《Java开发手册》规范：</p><p><strong>阿里巴巴《Java开发手册》之MySQL数据库：</strong></p><ul><li>任何字段如果为非负数，必须是 UNSIGNED</li><li>【<code>强制</code>】小数类型为 DECIMAL，禁止使用 FLOAT 和 DOUBLE。 <ul><li>说明：在存储的时候，FLOAT 和 DOUBLE 都存在精度损失的问题，很可能在比较值的时候，得到不正确的结果。如果存储的数据范围超过 DECIMAL 的范围，建议将数据拆成整数和小数并分开存储。</li></ul></li><li>【<code>强制</code>】如果存储的字符串长度几乎相等，使用 CHAR 定长字符串类型。</li><li>【<code>强制</code>】VARCHAR 是可变长字符串，不预先分配存储空间，长度不要超过 5000。如果存储长度大于此值，定义字段类型为 TEXT，独立出来一张表，用主键来对应，避免影响其它字段索引效率。</li></ul><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>`,250);function E(T,p){const i=s("ExternalLinkIcon");return l(),a("div",null,[e("div",v,[m,e("p",null,[u,d(": 以下所有文章整理于B站宋红康老师的《MySQL数据库入门到大牛》。"),e("a",o,[d("MySQL"),t(i)])])]),b])}const g=n(c,[["render",E],["__file","mysql-data-types-in-detail.html.vue"]]);export{g as default};
