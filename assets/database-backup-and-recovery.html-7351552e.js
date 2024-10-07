import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as d,c as a,a as e,b as i,d as r,e as u}from"./app-8d307529.js";const c={},v={class:"hint-container tip"},m=e("p",{class:"hint-container-title"},"友情提示",-1),t=e("strong",null,"转载须知",-1),o={href:"https://www.bilibili.com/video/BV1iq4y1u7vj?p=1&vd_source=cea816a08805c218ac4390ae9b61ae31",target:"_blank",rel:"noopener noreferrer"},b=u(`<h2 id="_1-物理备份与逻辑备份" tabindex="-1"><a class="header-anchor" href="#_1-物理备份与逻辑备份" aria-hidden="true">#</a> 1. 物理备份与逻辑备份</h2><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220718145936444.png" alt="image-20220718145936444" style="float:left;"><p><strong>物理备份：</strong> 备份数据文件，转储数据库物理文件到某一目录。物理备份恢复速度比较快，但占用空间比较大，MySQL中可以用 <code>xtrabackup</code> 工具来进行物理备份。</p><p><strong>逻辑备份：</strong> 对数据库对象利用工具进行导出工作，汇总入备份文件内。逻辑备份恢复速度慢，但占用空间小，更灵活。MySQL 中常用的逻辑备份工具为 <code>mysqldump</code> 。逻辑备份就是 <code>备份sql语句</code> ，在恢复的 时候执行备份的sql语句实现数据库数据的重现。</p><h2 id="_2-mysqldump实现逻辑备份" tabindex="-1"><a class="header-anchor" href="#_2-mysqldump实现逻辑备份" aria-hidden="true">#</a> 2. mysqldump实现逻辑备份</h2><p>mysqldump是MySQL提供的一个非常有用的数据库备份工具。</p><h3 id="_2-1-备份一个数据库" tabindex="-1"><a class="header-anchor" href="#_2-1-备份一个数据库" aria-hidden="true">#</a> 2.1 备份一个数据库</h3><p>mysqldump命令执行时，可以将数据库备份成一个<code>文本文件</code>，该文件中实际上包含多个<code>CREATE</code>和<code>INSERT</code>语句，使用这些语句可以重新创建表和插入数据。</p><ul><li>查出需要备份的表的结构，在文本文件中生成一个CREATE语句</li><li>将表中的所有记录转换为一条INSERT语句。</li></ul><p><strong>基本语法：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump –u 用户名称 –h 主机名称 –p密码 待备份的数据库名称[tbname, [tbname...]]&gt; 备份文件名称.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>说明： 备份的文件并非一定要求后缀名为.sql，例如后缀名为.txt的文件也是可以的。</p></blockquote><p>举例：使用root用户备份atguigu数据库：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -uroot -p atguigu&gt;atguigu.sql #备份文件存储在当前目录下
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -uroot -p atguigudb1 &gt; /var/lib/mysql/atguigu.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>备份文件剖析：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- MySQL dump 10.13 Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost Database: atguigu
-- ------------------------------------------------------
-- Server version 8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE=&#39;+00:00&#39; */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=&#39;NO_AUTO_VALUE_ON_ZERO&#39; */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: \`atguigu\`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ \`atguigu\` /*!40100 DEFAULT CHARACTER SET
utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION=&#39;N&#39; */;

USE \`atguigu\`;

--
-- Table structure for table \`student\`
--

DROP TABLE IF EXISTS \`student\`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE \`student\` (
\`studentno\` int NOT NULL,
\`name\` varchar(20) DEFAULT NULL,
\`class\` varchar(20) DEFAULT NULL,
PRIMARY KEY (\`studentno\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO \`student\` VALUES (1,&#39;张三_back&#39;,&#39;一班&#39;),(3,&#39;李四&#39;,&#39;一班&#39;),(8,&#39;王五&#39;,&#39;二班&#39;),
(15,&#39;赵六&#39;,&#39;二班&#39;),(20,&#39;钱七&#39;,&#39;&gt;三班&#39;),(22,&#39;zhang3_update&#39;,&#39;1ban&#39;),(24,&#39;wang5&#39;,&#39;2ban&#39;);
/*!40000 ALTER TABLE \`student\` ENABLE KEYS */;
UNLOCK TABLES;
        .
        .
        .
        .
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
-- Dump completed on 2022-01-07 9:58:23
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-备份全部数据库" tabindex="-1"><a class="header-anchor" href="#_2-2-备份全部数据库" aria-hidden="true">#</a> 2.2 备份全部数据库</h3><p>若想用mysqldump备份整个实例，可以使用 --all-databases 或 -A 参数：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -uroot -pxxxxxx --all-databases &gt; all_database.sql
mysqldump -uroot -pxxxxxx -A &gt; all_database.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-备份部分数据库" tabindex="-1"><a class="header-anchor" href="#_2-3-备份部分数据库" aria-hidden="true">#</a> 2.3 备份部分数据库</h3><p>使用 <code>--databases</code> 或 <code>-B</code> 参数了，该参数后面跟数据库名称，多个数据库间用空格隔开。如果指定 databases参数，备份文件中会存在创建数据库的语句，如果不指定参数，则不存在。语法如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump –u user –h host –p --databases [数据库的名称1 [数据库的名称2...]] &gt; 备份文件名称.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -uroot -p --databases atguigu atguigu12 &gt;two_database.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -uroot -p -B atguigu atguigu12 &gt; two_database.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-4-备份部分表" tabindex="-1"><a class="header-anchor" href="#_2-4-备份部分表" aria-hidden="true">#</a> 2.4 备份部分表</h3><p>比如，在表变更前做个备份。语法如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump –u user –h host –p 数据库的名称 [表名1 [表名2...]] &gt; 备份文件名称.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>举例：备份atguigu数据库下的book表</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -uroot -p atguigu book&gt; book.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>book.sql文件内容如下</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -uroot -p atguigu book&gt; book.sql^C
[root@node1 ~]# ls
kk kubekey kubekey-v1.1.1-linux-amd64.tar.gz README.md test1.sql two_database.sql
[root@node1 ~]# mysqldump -uroot -p atguigu book&gt; book.sql
Enter password:
[root@node1 ~]# ls
book.sql kk kubekey kubekey-v1.1.1-linux-amd64.tar.gz README.md test1.sql
two_database.sql
[root@node1 ~]# vi book.sql
-- MySQL dump 10.13 Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost Database: atguigu
-- ------------------------------------------------------
-- Server version 8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE=&#39;+00:00&#39; */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=&#39;NO_AUTO_VALUE_ON_ZERO&#39; */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table \`book\`
--

DROP TABLE IF EXISTS \`book\`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE \`book\` (
\`bookid\` int unsigned NOT NULL AUTO_INCREMENT,
\`card\` int unsigned NOT NULL,
\`test\` varchar(255) COLLATE utf8_bin DEFAULT NULL,
PRIMARY KEY (\`bookid\`),
KEY \`Y\` (\`card\`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table \`book\`
--

LOCK TABLES \`book\` WRITE;
/*!40000 ALTER TABLE \`book\` DISABLE KEYS */;
INSERT INTO \`book\` VALUES (1,9,NULL),(2,10,NULL),(3,4,NULL),(4,8,NULL),(5,7,NULL),
(6,10,NULL),(7,11,NULL),(8,3,NULL),(9,1,NULL),(10,17,NULL),(11,19,NULL),(12,4,NULL),
(13,1,NULL),(14,14,NULL),(15,5,NULL),(16,5,NULL),(17,8,NULL),(18,3,NULL),(19,12,NULL),
(20,11,NULL),(21,9,NULL),(22,20,NULL),(23,13,NULL),(24,3,NULL),(25,18,NULL),
(26,20,NULL),(27,5,NULL),(28,6,NULL),(29,15,NULL),(30,15,NULL),(31,12,NULL),
(32,11,NULL),(33,20,NULL),(34,5,NULL),(35,4,NULL),(36,6,NULL),(37,17,NULL),
(38,5,NULL),(39,16,NULL),(40,6,NULL),(41,18,NULL),(42,12,NULL),(43,6,NULL),
(44,12,NULL),(45,2,NULL),(46,12,NULL),(47,15,NULL),(48,17,NULL),(49,2,NULL),
(50,16,NULL),(51,13,NULL),(52,17,NULL),(53,7,NULL),(54,2,NULL),(55,9,NULL),
(56,1,NULL),(57,14,NULL),(58,7,NULL),(59,15,NULL),(60,12,NULL),(61,13,NULL),
(62,8,NULL),(63,2,NULL),(64,6,NULL),(65,2,NULL),(66,12,NULL),(67,12,NULL),(68,4,NULL),
(69,5,NULL),(70,10,NULL),(71,16,NULL),(72,8,NULL),(73,14,NULL),(74,5,NULL),
(75,4,NULL),(76,3,NULL),(77,2,NULL),(78,2,NULL),(79,2,NULL),(80,3,NULL),(81,8,NULL),
(82,14,NULL),(83,5,NULL),(84,4,NULL),(85,2,NULL),(86,20,NULL),(87,12,NULL),
(88,1,NULL),(89,8,NULL),(90,18,NULL),(91,3,NULL),(92,3,NULL),(93,6,NULL),(94,1,NULL),
(95,4,NULL),(96,17,NULL),(97,15,NULL),(98,1,NULL),(99,20,NULL),(100,15,NULL);
/*!40000 ALTER TABLE \`book\` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，book文件和备份的库文件类似。不同的是，book文件只包含book表的DROP、CREATE和 INSERT语句。</p><p>备份多张表使用下面的命令，比如备份book和account表：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#备份多张表
mysqldump -uroot -p atguigu book account &gt; 2_tables_bak.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-备份单表的部分数据" tabindex="-1"><a class="header-anchor" href="#_2-5-备份单表的部分数据" aria-hidden="true">#</a> 2.5 备份单表的部分数据</h3><p>有些时候一张表的数据量很大，我们只需要部分数据。这时就可以使用 --where 选项了。where后面附带需要满足的条件。</p><p>举例：备份student表中id小于10的数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -uroot -p atguigu student --where=&quot;id &lt; 10 &quot; &gt; student_part_id10_low_bak.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>内容如下所示，insert语句只有id小于10的部分</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>LOCK TABLES \`student\` WRITE;
/*!40000 ALTER TABLE \`student\` DISABLE KEYS */;
INSERT INTO \`student\` VALUES (1,100002,&#39;JugxTY&#39;,157,280),(2,100003,&#39;QyUcCJ&#39;,251,277),
(3,100004,&#39;lATUPp&#39;,80,404),(4,100005,&#39;BmFsXI&#39;,240,171),(5,100006,&#39;mkpSwJ&#39;,388,476),
(6,100007,&#39;ujMgwN&#39;,259,124),(7,100008,&#39;HBJTqX&#39;,429,168),(8,100009,&#39;dvQSQA&#39;,61,504),
(9,100010,&#39;HljpVJ&#39;,234,185);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-排除某些表的备份" tabindex="-1"><a class="header-anchor" href="#_2-6-排除某些表的备份" aria-hidden="true">#</a> 2.6 排除某些表的备份</h3><p>如果我们想备份某个库，但是某些表数据量很大或者与业务关联不大，这个时候可以考虑排除掉这些表，同样的，选项 <code>--ignore-table</code> 可以完成这个功能。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -uroot -p atguigu --ignore-table=atguigu.student &gt; no_stu_bak.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过如下指定判定文件中没有student表结构：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>grep &quot;student&quot; no_stu_bak.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-7-只备份结构或只备份数据" tabindex="-1"><a class="header-anchor" href="#_2-7-只备份结构或只备份数据" aria-hidden="true">#</a> 2.7 只备份结构或只备份数据</h3><p>只备份结构的话可以使用 <code>--no-data</code> 简写为 <code>-d</code> 选项；只备份数据可以使用 <code>--no-create-info</code> 简写为 <code>-t</code>选项。</p><ul><li><p>只备份结构</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -uroot -p atguigu --no-data &gt; atguigu_no_data_bak.sql
#使用grep命令，没有找到insert相关语句，表示没有数据备份。
[root@node1 ~]# grep &quot;INSERT&quot; atguigu_no_data_bak.sql
[root@node1 ~]#
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>只备份数据</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -uroot -p atguigu --no-create-info &gt; atguigu_no_create_info_bak.sql
#使用grep命令，没有找到create相关语句，表示没有数据结构。
[root@node1 ~]# grep &quot;CREATE&quot; atguigu_no_create_info_bak.sql
[root@node1 ~]#
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_2-8-备份中包含存储过程、函数、事件" tabindex="-1"><a class="header-anchor" href="#_2-8-备份中包含存储过程、函数、事件" aria-hidden="true">#</a> 2.8 备份中包含存储过程、函数、事件</h3><p>mysqldump备份默认是不包含存储过程，自定义函数及事件的。可以使用 <code>--routines</code> 或 <code>-R</code> 选项来备份存储过程及函数，使用 <code>--events</code> 或 <code>-E</code> 参数来备份事件。</p><p>举例：备份整个atguigu库，包含存储过程及事件：</p><ul><li>使用下面的SQL可以查看当前库有哪些存储过程或者函数</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SELECT SPECIFIC_NAME,ROUTINE_TYPE ,ROUTINE_SCHEMA FROM
information_schema.Routines WHERE ROUTINE_SCHEMA=&quot;atguigu&quot;;
+---------------+--------------+----------------+
| SPECIFIC_NAME | ROUTINE_TYPE | ROUTINE_SCHEMA |
+---------------+--------------+----------------+
| rand_num      | FUNCTION     | atguigu        |
| rand_string   | FUNCTION     | atguigu        |
| BatchInsert   | PROCEDURE    | atguigu        |
| insert_class  | PROCEDURE    | atguigu        |
| insert_order  | PROCEDURE    | atguigu        |
| insert_stu    | PROCEDURE    | atguigu        |
| insert_user   | PROCEDURE    | atguigu        |
| ts_insert     | PROCEDURE    | atguigu        |
+---------------+--------------+----------------+
9 rows in set (0.02 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面备份atguigu库的数据，函数以及存储过程。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -uroot -p -R -E --databases atguigu &gt; fun_atguigu_bak.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询备份文件中是否存在函数，如下所示，可以看到确实包含了函数。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>grep -C 5 &quot;rand_num&quot; fun_atguigu_bak.sql
--
--
-- Dumping routines for database &#39;atguigu&#39;
--
/*!50003 DROP FUNCTION IF EXISTS \`rand_num\` */;
/*!50003 SET @saved_cs_client = @@character_set_client */ ;
/*!50003 SET @saved_cs_results = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode = @@sql_mode */ ;
/*!50003 SET sql_mode =
&#39;ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISIO
N_BY_ZERO,NO_ENGINE_SUBSTITUTION&#39; */ ;
DELIMITER ;;
CREATE DEFINER=\`root\`@\`%\` FUNCTION \`rand_num\`(from_num BIGINT ,to_num BIGINT) RETURNS
bigint
BEGIN
DECLARE i BIGINT DEFAULT 0;
SET i = FLOOR(from_num +RAND()*(to_num - from_num+1)) ;
RETURN i;
END ;;
--
BEGIN
DECLARE i INT DEFAULT 0;
    SET autocommit = 0;
    REPEAT
    SET i = i + 1;
    INSERT INTO class ( classname,address,monitor ) VALUES
    (rand_string(8),rand_string(10),rand_num());
    UNTIL i = max_num
    END REPEAT;
    COMMIT;
END ;;
DELIMITER ;
--
BEGIN
DECLARE i INT DEFAULT 0;
    SET autocommit = 0; #设置手动提交事务
    REPEAT #循环
    SET i = i + 1; #赋值
    INSERT INTO order_test (order_id, trans_id ) VALUES
    (rand_num(1,7000000),rand_num(100000000000000000,700000000000000000));
    UNTIL i = max_num
    END REPEAT;
    COMMIT; #提交事务
END ;;
DELIMITER ;
--
BEGIN
DECLARE i INT DEFAULT 0;
    SET autocommit = 0; #设置手动提交事务
    REPEAT #循环
    SET i = i + 1; #赋值
    INSERT INTO student (stuno, name ,age ,classId ) VALUES
    ((START+i),rand_string(6),rand_num(),rand_num());
    UNTIL i = max_num
    END REPEAT;
    COMMIT; #提交事务
END ;;
DELIMITER ;
--
BEGIN
DECLARE i INT DEFAULT 0;
    SET autocommit = 0;
    REPEAT
    SET i = i + 1;
    INSERT INTO \`user\` ( name,age,sex ) VALUES (&quot;atguigu&quot;,rand_num(1,20),&quot;male&quot;);
    UNTIL i = max_num
    END REPEAT;
    COMMIT;
END ;;
DELIMITER ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-9-mysqldump常用选项" tabindex="-1"><a class="header-anchor" href="#_2-9-mysqldump常用选项" aria-hidden="true">#</a> 2.9 mysqldump常用选项</h3><p>mysqldump其他常用选项如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>--add-drop-database：在每个CREATE DATABASE语句前添加DROP DATABASE语句。

--add-drop-tables：在每个CREATE TABLE语句前添加DROP TABLE语句。

--add-locking：用LOCK TABLES和UNLOCK TABLES语句引用每个表转储。重载转储文件时插入得更快。

--all-database, -A：转储所有数据库中的所有表。与使用--database选项相同，在命令行中命名所有数据库。

--comment[=0|1]：如果设置为0，禁止转储文件中的其他信息，例如程序版本、服务器版本和主机。--skipcomments与--comments=0的结果相同。默认值为1，即包括额外信息。

--compact：产生少量输出。该选项禁用注释并启用--skip-add-drop-tables、--no-set-names、--skipdisable-keys和--skip-add-locking选项。

--compatible=name：产生与其他数据库系统或旧的MySQL服务器更兼容的输出，值可以为ansi、MySQL323、MySQL40、postgresql、oracle、mssql、db2、maxdb、no_key_options、no_table_options或者no_field_options。

--complete_insert, -c：使用包括列名的完整的INSERT语句。

--debug[=debug_options], -#[debug_options]：写调试日志。

--delete，-D：导入文本文件前清空表。

--default-character-set=charset：使用charsets默认字符集。如果没有指定，就使用utf8。

--delete--master-logs：在主复制服务器上，完成转储操作后删除二进制日志。该选项自动启用-masterdata。

--extended-insert，-e：使用包括几个VALUES列表的多行INSERT语法。这样使得转储文件更小，重载文件时可以加速插入。

--flush-logs，-F：开始转储前刷新MySQL服务器日志文件。该选项要求RELOAD权限。

--force，-f：在表转储过程中，即使出现SQL错误也继续。

--lock-all-tables，-x：对所有数据库中的所有表加锁。在整体转储过程中通过全局锁定来实现。该选项自动关闭--single-transaction和--lock-tables。

--lock-tables，-l：开始转储前锁定所有表。用READ LOCAL锁定表以允许并行插入MyISAM表。对于事务表（例如InnoDB和BDB），--single-transaction是一个更好的选项，因为它根本不需要锁定表。

--no-create-db，-n：该选项禁用CREATE DATABASE /*!32312 IF NOT EXIST*/db_name语句，如果给出--database或--all-database选项，就包含到输出中。

--no-create-info，-t：只导出数据，而不添加CREATE TABLE语句。

--no-data，-d：不写表的任何行信息，只转储表的结构。

--opt：该选项是速记，它可以快速进行转储操作并产生一个能很快装入MySQL服务器的转储文件。该选项默认开启，但可以用--skip-opt禁用。

--password[=password]，-p[password]：当连接服务器时使用的密码。

-port=port_num，-P port_num：用于连接的TCP/IP端口号。

--protocol={TCP|SOCKET|PIPE|MEMORY}：使用的连接协议。

--replace，-r –replace和--ignore：控制替换或复制唯一键值已有记录的输入记录的处理。如果指定--replace，新行替换有相同的唯一键值的已有行；如果指定--ignore，复制已有的唯一键值的输入行被跳过。如果不指定这两个选项，当发现一个复制键值时会出现一个错误，并且忽视文本文件的剩余部分。

--silent，-s：沉默模式。只有出现错误时才输出。

--socket=path，-S path：当连接localhost时使用的套接字文件（为默认主机）。

--user=user_name，-u user_name：当连接服务器时MySQL使用的用户名。

--verbose，-v：冗长模式，打印出程序操作的详细信息。

--xml，-X：产生XML输出。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行帮助命令 <code>mysqldump --help</code> ，可以获得特定版本的完整选项列表。</p><blockquote><p>提示 如果运行mysqldump没有--quick或--opt选项，mysqldump在转储结果前将整个结果集装入内 存。如果转储大数据库可能会出现问题，该选项默认启用，但可以用--skip-opt禁用。如果使用最 新版本的mysqldump程序备份数据，并用于恢复到比较旧版本的MySQL服务器中，则不要使用--opt 或-e选项。</p></blockquote><h2 id="_3-mysql命令恢复数据" tabindex="-1"><a class="header-anchor" href="#_3-mysql命令恢复数据" aria-hidden="true">#</a> 3. mysql命令恢复数据</h2><p>使用mysqldump命令将数据库中的数据备份成一个文本文件。需要恢复时，可以使用<code>mysql命令</code>来恢复备份的数据。</p><p>mysql命令可以执行备份文件中的<code>CREATE语句</code>和<code>INSERT语句</code>。通过CREATE语句来创建数据库和表。通过INSERT语句来插入备份的数据。</p><p>基本语法：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql –u root –p [dbname] &lt; backup.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，dbname参数表示数据库名称。该参数是可选参数，可以指定数据库名，也可以不指定。指定数据库名时，表示还原该数据库下的表。此时需要确保MySQL服务器中已经创建了该名的数据库。不指定数据库名，表示还原文件中所有的数据库。此时sql文件中包含有CREATE DATABASE语句，不需要MySQL服务器中已存在的这些数据库。</p><h3 id="_3-1-单库备份中恢复单库" tabindex="-1"><a class="header-anchor" href="#_3-1-单库备份中恢复单库" aria-hidden="true">#</a> 3.1 单库备份中恢复单库</h3><p>使用root用户，将之前练习中备份的atguigu.sql文件中的备份导入数据库中，命令如下：</p><p>如果备份文件中包含了创建数据库的语句，则恢复的时候不需要指定数据库名称，如下所示</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql -uroot -p &lt; atguigu.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>否则需要指定数据库名称，如下所示</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql -uroot -p atguigu4&lt; atguigu.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2-全量备份恢复" tabindex="-1"><a class="header-anchor" href="#_3-2-全量备份恢复" aria-hidden="true">#</a> 3.2 全量备份恢复</h3><p>如果我们现在有昨天的全量备份，现在想整个恢复，则可以这样操作：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql –u root –p &lt; all.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql -uroot -pxxxxxx &lt; all.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行完后，MySQL数据库中就已经恢复了all.sql文件中的所有数据库。</p><h3 id="_3-3-全量备份恢复" tabindex="-1"><a class="header-anchor" href="#_3-3-全量备份恢复" aria-hidden="true">#</a> 3.3 全量备份恢复</h3><p>可能有这样的需求，比如说我们只想恢复某一个库，但是我们有的是整个实例的备份，这个时候我们可以从全量备份中分离出单个库的备份。</p><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>sed -n &#39;/^-- Current Database: \`atguigu\`/,/^-- Current Database: \`/p&#39; all_database.sql &gt; atguigu.sql
#分离完成后我们再导入atguigu.sql即可恢复单个库
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-从单库备份中恢复单表" tabindex="-1"><a class="header-anchor" href="#_3-4-从单库备份中恢复单表" aria-hidden="true">#</a> 3.4 从单库备份中恢复单表</h3><p>这个需求还是比较常见的。比如说我们知道哪个表误操作了，那么就可以用单表恢复的方式来恢复。</p><p>举例：我们有atguigu整库的备份，但是由于class表误操作，需要单独恢复出这张表。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>cat atguigu.sql | sed -e &#39;/./{H;$!d;}&#39; -e &#39;x;/CREATE TABLE \`class\`/!d;q&#39; &gt; class_structure.sql
cat atguigu.sql | grep --ignore-case &#39;insert into \`class\`&#39; &gt; class_data.sql
#用shell语法分离出创建表的语句及插入数据的语句后 再依次导出即可完成恢复

use atguigu;
mysql&gt; source class_structure.sql;
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql&gt; source class_data.sql;
Query OK, 1 row affected (0.01 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-物理备份-直接复制整个数据库" tabindex="-1"><a class="header-anchor" href="#_4-物理备份-直接复制整个数据库" aria-hidden="true">#</a> 4. 物理备份：直接复制整个数据库</h2><p>直接将MySQL中的数据库文件复制出来。这种方法最简单，速度也最快。MySQL的数据库目录位置不一 定相同：</p><ul><li>在Windows平台下，MySQL 8.0存放数据库的目录通常默认为 “ C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Data ”或者其他用户自定义目录；</li><li>在Linux平台下，数据库目录位置通常为/var/lib/mysql/；</li><li>在MAC OSX平台下，数据库目录位置通常为“/usr/local/mysql/data”</li></ul><p>但为了保证备份的一致性。需要保证：</p><ul><li>方式1：备份前，将服务器停止。</li><li>方式2：备份前，对相关表执行 FLUSH TABLES WITH READ LOCK 操作。这样当复制数据库目录中 的文件时，允许其他客户继续查询表。同时，FLUSH TABLES语句来确保开始备份前将所有激活的索 引页写入硬盘。</li></ul><p>这种方式方便、快速，但不是最好的备份方法，因为实际情况可能 <code>不允许停止MySQL服务器</code> 或者 <code>锁住表</code> ，而且这种方法 对InnoDB存储引擎 的表不适用。对于MyISAM存储引擎的表，这样备份和还原很方便，但是还原时最好是相同版本的MySQL数据库，否则可能会存在文件类型不同的情况。</p><p>注意，物理备份完毕后，执行 UNLOCK TABLES 来结算其他客户对表的修改行为。</p><blockquote><p>说明： 在MySQL版本号中，第一个数字表示主版本号，主版本号相同的MySQL数据库文件格式相同。</p></blockquote><p>此外，还可以考虑使用相关工具实现备份。比如， <code>MySQLhotcopy</code> 工具。MySQLhotcopy是一个Perl脚本，它使用LOCK TABLES、FLUSH TABLES和cp或scp来快速备份数据库。它是备份数据库或单个表最快的途径，但它只能运行在数据库目录所在的机器上，并且只能备份MyISAM类型的表。多用于mysql5.5之前。</p><h2 id="_5-物理恢复-直接复制到数据库目录" tabindex="-1"><a class="header-anchor" href="#_5-物理恢复-直接复制到数据库目录" aria-hidden="true">#</a> 5. 物理恢复：直接复制到数据库目录</h2><p><strong>步骤：</strong></p><p>1）演示删除备份的数据库中指定表的数据</p><p>2）将备份的数据库数据拷贝到数据目录下，并重启MySQL服务器</p><p>3）查询相关表的数据是否恢复。需要使用下面的<code> chown</code> 操作。</p><p><strong>要求：</strong></p><ul><li>必须确保备份数据的数据库和待恢复的数据库服务器的主版本号相同。 <ul><li>因为只有MySQL数据库主版本号相同时，才能保证这两个MySQL数据库文件类型是相同的。</li></ul></li><li>这种方式对 <code>MyISAM类型的表比较有效</code> ，对于InnoDB类型的表则不可用。 <ul><li>因为InnoDB表的表空间不能直接复制。</li></ul></li><li>在Linux操作系统下，复制到数据库目录后，一定要将数据库的用户和组变成mysql，命令如下：</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>chown -R mysql.mysql /var/lib/mysql/dbname
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，两个mysql分别表示组和用户；“-R”参数可以改变文件夹下的所有子文件的用户和组；“dbname”参数表示数据库目录。</p><blockquote><p>提示 Linux操作系统下的权限设置非常严格。通常情况下，MySQL数据库只有root用户和mysql用户 组下的mysql用户才可以访问，因此将数据库目录复制到指定文件夹后，一定要使用chown命令将 文件夹的用户组变为mysql，将用户变为mysql。</p></blockquote><h2 id="_6-表的导出与导入" tabindex="-1"><a class="header-anchor" href="#_6-表的导出与导入" aria-hidden="true">#</a> 6. 表的导出与导入</h2><h3 id="_6-1-表的导出" tabindex="-1"><a class="header-anchor" href="#_6-1-表的导出" aria-hidden="true">#</a> 6.1 表的导出</h3><h4 id="_1-使用select-into-outfile导出文本文件" tabindex="-1"><a class="header-anchor" href="#_1-使用select-into-outfile导出文本文件" aria-hidden="true">#</a> 1. 使用SELECT…INTO OUTFILE导出文本文件</h4><p>在MySQL中，可以使用SELECT…INTO OUTFILE语句将表的内容导出成一个文本文件。</p><p><strong>举例：</strong> 使用SELECT…INTO OUTFILE将atguigu数据库中account表中的记录导出到文本文件。</p><p>（1）选择数据库atguigu，并查询account表，执行结果如下所示。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>use atguigu;
select * from account;
mysql&gt; select * from account;
+----+--------+---------+
| id | name | balance |
+----+--------+---------+
| 1 | 张三 | 90 |
| 2 | 李四 | 100 |
| 3 | 王五 | 0 |
+----+--------+---------+
3 rows in set (0.01 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（2）mysql默认对导出的目录有权限限制，也就是说使用命令行进行导出的时候，需要指定目录进行操作。</p><p>查询secure_file_priv值：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SHOW GLOBAL VARIABLES LIKE &#39;%secure%&#39;;
+--------------------------+-----------------------+
| Variable_name            | Value                 |
+--------------------------+-----------------------+
| require_secure_transport | OFF                   |
| secure_file_priv         | /var/lib/mysql-files/ |
+--------------------------+-----------------------+
2 rows in set (0.02 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220718163627669.png" alt="image-20220718163627669" style="float:left;"><p>（3）上面结果中显示，secure_file_priv变量的值为/var/lib/mysql-files/，导出目录设置为该目录，SQL语句如下。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT * FROM account INTO OUTFILE &quot;/var/lib/mysql-files/account.txt&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>（4）查看 /var/lib/mysql-files/account.txt\`文件。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>1 张三 90
2 李四 100
3 王五 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-使用mysqldump命令导出文本文件" tabindex="-1"><a class="header-anchor" href="#_2-使用mysqldump命令导出文本文件" aria-hidden="true">#</a> 2. 使用mysqldump命令导出文本文件</h4><p><strong>举例1：</strong> 使用mysqldump命令将将atguigu数据库中account表中的记录导出到文本文件：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -uroot -p -T &quot;/var/lib/mysql-files/&quot; atguigu account
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>mysqldump命令执行完毕后，在指定的目录/var/lib/mysql-files/下生成了account.sql和account.txt文件。</p><p>打开account.sql文件，其内容包含创建account表的CREATE语句。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>[root@node1 mysql-files]# cat account.sql
-- MySQL dump 10.13 Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost Database: atguigu
-- ------------------------------------------------------
-- Server version 8.0.26
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE=&#39;+00:00&#39; */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=&#39;&#39; */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table \`account\`
--

DROP TABLE IF EXISTS \`account\`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE \`account\` (
\`id\` int NOT NULL AUTO_INCREMENT,
\`name\` varchar(255) NOT NULL,
\`balance\` int NOT NULL,
PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-07 23:19:27
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开account.txt文件，其内容只包含account表中的数据。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>[root@node1 mysql-files]# cat account.txt
1 张三 90
2 李四 100
3 王五 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>举例2：</strong> 使用mysqldump将atguigu数据库中的account表导出到文本文件，使用FIELDS选项，要求字段之 间使用逗号“，”间隔，所有字符类型字段值用双引号括起来：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -uroot -p -T &quot;/var/lib/mysql-files/&quot; atguigu account --fields-terminatedby=&#39;,&#39; --fields-optionally-enclosed-by=&#39;\\&quot;&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>语句mysqldump语句执行成功之后，指定目录下会出现两个文件account.sql和account.txt。</p><p>打开account.sql文件，其内容包含创建account表的CREATE语句。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>[root@node1 mysql-files]# cat account.sql
-- MySQL dump 10.13 Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost Database: atguigu
-- ------------------------------------------------------
-- Server version 8.0.26
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE=&#39;+00:00&#39; */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=&#39;&#39; */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
--
-- Table structure for table \`account\`
--
DROP TABLE IF EXISTS \`account\`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE \`account\` (
\`id\` int NOT NULL AUTO_INCREMENT,
\`name\` varchar(255) NOT NULL,
\`balance\` int NOT NULL,
PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
-- Dump completed on 2022-01-07 23:36:39
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开account.txt文件，其内容包含创建account表的数据。从文件中可以看出，字段之间用逗号隔开，字 符类型的值被双引号括起来。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>[root@node1 mysql-files]# cat account.txt
1,&quot;张三&quot;,90
2,&quot;李四&quot;,100
3,&quot;王五&quot;,0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-使用mysql命令导出文本文件" tabindex="-1"><a class="header-anchor" href="#_3-使用mysql命令导出文本文件" aria-hidden="true">#</a> 3. 使用mysql命令导出文本文件</h4><p><strong>举例1：</strong> 使用mysql语句导出atguigu数据中account表中的记录到文本文件：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql -uroot -p --execute=&quot;SELECT * FROM account;&quot; atguigu&gt; &quot;/var/lib/mysql-files/account.txt&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打开account.txt文件，其内容包含创建account表的数据。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>[root@node1 mysql-files]# cat account.txt
id name balance
1 张三 90
2 李四 100
3 王五 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**举例2：**将atguigu数据库account表中的记录导出到文本文件，使用--veritcal参数将该条件记录分为多行显示：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql -uroot -p --vertical --execute=&quot;SELECT * FROM account;&quot; atguigu &gt; &quot;/var/lib/mysql-files/account_1.txt&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打开account_1.txt文件，其内容包含创建account表的数据。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>[root@node1 mysql-files]# cat account_1.txt
*************************** 1. row ***************************
id: 1
name: 张三
balance: 90
*************************** 2. row ***************************
id: 2
name: 李四
balance: 100
*************************** 3. row ***************************
id: 3
name: 王五
balance: 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>举例3：</strong> 将atguigu数据库account表中的记录导出到xml文件，使用--xml参数，具体语句如下。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql -uroot -p --xml --execute=&quot;SELECT * FROM account;&quot; atguigu&gt;&quot;/var/lib/mysqlfiles/account_3.xml&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>[root@node1 mysql-files]# cat account_3.xml
&lt;?xml version=&quot;1.0&quot;?&gt;
&lt;resultset statement=&quot;SELECT * FROM account&quot;
xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;&gt;
&lt;row&gt;
&lt;field name=&quot;id&quot;&gt;1&lt;/field&gt;
&lt;field name=&quot;name&quot;&gt;张三&lt;/field&gt;
&lt;field name=&quot;balance&quot;&gt;90&lt;/field&gt;
&lt;/row&gt;
&lt;row&gt;
&lt;field name=&quot;id&quot;&gt;2&lt;/field&gt;
&lt;field name=&quot;name&quot;&gt;李四&lt;/field&gt;
&lt;field name=&quot;balance&quot;&gt;100&lt;/field&gt;
&lt;/row&gt;
&lt;row&gt;
&lt;field name=&quot;id&quot;&gt;3&lt;/field&gt;
&lt;field name=&quot;name&quot;&gt;王五&lt;/field&gt;
&lt;field name=&quot;balance&quot;&gt;0&lt;/field&gt;
&lt;/row&gt;
&lt;/resultset&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：如果要将表数据导出到html文件中，可以使用 <code>--html</code> 选项。然后可以使用浏览器打开。</p><h3 id="_6-2-表的导入" tabindex="-1"><a class="header-anchor" href="#_6-2-表的导入" aria-hidden="true">#</a> 6.2 表的导入</h3><h4 id="_1-使用load-data-infile方式导入文本文件" tabindex="-1"><a class="header-anchor" href="#_1-使用load-data-infile方式导入文本文件" aria-hidden="true">#</a> 1. 使用LOAD DATA INFILE方式导入文本文件</h4><p><strong>举例1：</strong></p><p>使用SELECT...INTO OUTFILE将atguigu数据库中account表的记录导出到文本文件</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT * FROM atguigu.account INTO OUTFILE &#39;/var/lib/mysql-files/account_0.txt&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除account表中的数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELETE FROM atguigu.account;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从文本文件account.txt中恢复数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>LOAD DATA INFILE &#39;/var/lib/mysql-files/account_0.txt&#39; INTO TABLE atguigu.account;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询account表中的数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; select * from account;
+----+--------+---------+
| id | name   | balance |
+----+--------+---------+
| 1 | 张三     | 90      |
| 2 | 李四     | 100     |
| 3 | 王五     | 0       |
+----+--------+---------+
3 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>举例2：</strong> 选择数据库atguigu，使用SELECT…INTO OUTFILE将atguigu数据库account表中的记录导出到文本文件，使用FIELDS选项和LINES选项，要求字段之间使用逗号&quot;，&quot;间隔，所有字段值用双引号括起来：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT * FROM atguigu.account INTO OUTFILE &#39;/var/lib/mysql-files/account_1.txt&#39; FIELDS TERMINATED BY &#39;,&#39; ENCLOSED BY &#39;\\&quot;&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除account表中的数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELETE FROM atguigu.account;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从/var/lib/mysql-files/account.txt中导入数据到account表中：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>LOAD DATA INFILE &#39;/var/lib/mysql-files/account_1.txt&#39; INTO TABLE atguigu.account FIELDS TERMINATED BY &#39;,&#39; ENCLOSED BY &#39;\\&quot;&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询account表中的数据，具体SQL如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from account;
mysql&gt; select * from account;
+----+--------+---------+
| id | name   | balance |
+----+--------+---------+
| 1 | 张三     | 90      |
| 2 | 李四     | 100     |
| 3 | 王五     | 0       |
+----+--------+---------+
3 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-使用mysqlimport方式导入文本文件" tabindex="-1"><a class="header-anchor" href="#_2-使用mysqlimport方式导入文本文件" aria-hidden="true">#</a> 2. 使用mysqlimport方式导入文本文件</h4><p><strong>举例：</strong></p><p>导出文件account.txt，字段之间使用逗号&quot;，&quot;间隔，字段值用双引号括起来：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT * FROM atguigu.account INTO OUTFILE &#39;/var/lib/mysql-files/account.txt&#39; FIELDS TERMINATED BY &#39;,&#39; ENCLOSED BY &#39;\\&quot;&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除account表中的数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELETE FROM atguigu.account;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用mysqlimport命令将account.txt文件内容导入到数据库atguigu的account表中：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqlimport -uroot -p atguigu &#39;/var/lib/mysql-files/account.txt&#39; --fields-terminated-by=&#39;,&#39; --fields-optionally-enclosed-by=&#39;\\&quot;&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询account表中的数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from account;
mysql&gt; select * from account;
+----+--------+---------+
| id | name   | balance |
+----+--------+---------+
| 1 | 张三     | 90      |
| 2 | 李四     | 100     |
| 3 | 王五     | 0       |
+----+--------+---------+
3 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-数据库迁移" tabindex="-1"><a class="header-anchor" href="#_7-数据库迁移" aria-hidden="true">#</a> 7. 数据库迁移</h2><h3 id="_7-1-概述" tabindex="-1"><a class="header-anchor" href="#_7-1-概述" aria-hidden="true">#</a> 7.1 概述</h3><p>数据迁移（data migration）是指选择、准备、提取和转换数据，并<strong>将数据从一个计算机存储系统永久地传输到另一个计算机存储系统的过程</strong>。此外，<code> 验证迁移数据的完整性</code> 和 <code>退役原来旧的数据存储</code> ，也被认为是整个数据迁移过程的一部分。</p><p>数据库迁移的原因是多样的，包括服务器或存储设备更换、维护或升级，应用程序迁移，网站集成，灾难恢复和数据中心迁移。</p><p>根据不同的需求可能要采取不同的迁移方案，但总体来讲，MySQL 数据迁移方案大致可以分为<code>物理迁移</code>和 <code>逻辑迁移</code> 两类。通常以尽可能 <code>自动化</code> 的方式执行，从而将人力资源从繁琐的任务中解放出来。</p><h3 id="_7-2-迁移方案" tabindex="-1"><a class="header-anchor" href="#_7-2-迁移方案" aria-hidden="true">#</a> 7.2 迁移方案</h3><ul><li>物理迁移</li></ul><p>物理迁移适用于大数据量下的整体迁移。使用物理迁移方案的优点是比较快速，但需要停机迁移并且要 求 MySQL 版本及配置必须和原服务器相同，也可能引起未知问题。</p><p>物理迁移包括拷贝数据文件和使用 XtraBackup 备份工具两种。</p><p>不同服务器之间可以采用物理迁移，我们可以在新的服务器上安装好同版本的数据库软件，创建好相同目录，建议配置文件也要和原数据库相同，然后从原数据库方拷贝来数据文件及日志文件，配置好文件组权限，之后在新服务器这边使用 mysqld 命令启动数据库。</p><ul><li>逻辑迁移</li></ul><p>逻辑迁移适用范围更广，无论是 <code>部分迁移</code> 还是 <code>全量迁移</code> ，都可以使用逻辑迁移。逻辑迁移中使用最多的就是通过 mysqldump 等备份工具。</p><h3 id="_7-3-迁移注意点" tabindex="-1"><a class="header-anchor" href="#_7-3-迁移注意点" aria-hidden="true">#</a> 7.3 迁移注意点</h3><p><strong>1. 相同版本的数据库之间迁移注意点</strong></p><p>指的是在主版本号相同的MySQL数据库之间进行数据库移动。</p><p><code>方式1</code>： 因为迁移前后MySQL数据库的 <code>主版本号相同</code> ，所以可以通过复制数据库目录来实现数据库迁移，但是物理迁移方式只适用于MyISAM引擎的表。对于InnoDB表，不能用直接复制文件的方式备份数据库。</p><p><code>方式2</code>： 最常见和最安全的方式是使用 <code>mysqldump命令</code> 导出数据，然后在目标数据库服务器中使用 MySQL命令导入。</p><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#host1的机器中备份所有数据库,并将数据库迁移到名为host2的机器上
mysqldump –h host1 –uroot –p –-all-databases|
mysql –h host2 –uroot –p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述语句中，“|”符号表示管道，其作用是将mysqldump备份的文件给mysql命令；“--all-databases”表示要迁移所有的数据库。通过这种方式可以直接实现迁移。</p><p><strong>2. 不同版本的数据库之间迁移注意点</strong></p><p>例如，原来很多服务器使用5.7版本的MySQL数据库，在8.0版本推出来以后，改进了5.7版本的很多缺陷， 因此需要把数据库升级到8.0版本</p><p>旧版本与新版本的MySQL可能使用不同的默认字符集，例如有的旧版本中使用latin1作为默认字符集，而最新版本的MySQL默认字符集为utf8mb4。如果数据库中有中文数据，那么迁移过程中需要对 <code>默认字符集</code> 进行修改 ，不然可能无法正常显示数据。</p><p>高版本的MySQL数据库通常都会 <code>兼容低版本</code> ，因此可以从低版本的MySQL数据库迁移到高版本的MySQL 数据库。</p><p><strong>3. 不同数据库之间迁移注意点</strong></p><p>不同数据库之间迁移是指从其他类型的数据库迁移到MySQL数据库，或者从MySQL数据库迁移到其他类 型的数据库。这种迁移没有普适的解决方法。</p><p>迁移之前，需要了解不同数据库的架构， <code>比较它们之间的差异</code> 。不同数据库中定义相同类型的数据的 <code>关键字可能会不同</code> 。例如，MySQL中日期字段分为DATE和TIME两种，而ORACLE日期字段只有DATE；SQL Server数据库中有ntext、Image等数据类型，MySQL数据库没有这些数据类型；MySQL支持的ENUM和SET 类型，这些SQL Server数据库不支持。</p><p>另外，数据库厂商并没有完全按照SQL标准来设计数据库系统，导致不同的数据库系统的 <code>SQL语句</code> 有差别。例如，微软的SQL Server软件使用的是T-SQL语句，T-SQL中包含了非标准的SQL语句，不能和MySQL的SQL语句兼容。</p><p>不同类型数据库之间的差异造成了互相 <code>迁移的困难</code> ，这些差异其实是商业公司故意造成的技术壁垒。但 是不同类型的数据库之间的迁移并 <code>不是完全不可能</code> 。例如，可以使用<code> MyODBC</code> 实现MySQL和SQL Server之 间的迁移。MySQL官方提供的工具 <code>MySQL Migration Toolkit</code> 也可以在不同数据之间进行数据迁移。 MySQL迁移到Oracle时，需要使用mysqldump命令导出sql文件，然后， <code>手动更改</code> sql文件中的CREATE语句。</p><h3 id="_7-4-迁移小结" tabindex="-1"><a class="header-anchor" href="#_7-4-迁移小结" aria-hidden="true">#</a> 7.4 迁移小结</h3><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220718165515965.png" alt="image-20220718165515965" tabindex="0" loading="lazy"><figcaption>image-20220718165515965</figcaption></figure><h2 id="_8-删库了不敢跑-能干点啥" tabindex="-1"><a class="header-anchor" href="#_8-删库了不敢跑-能干点啥" aria-hidden="true">#</a> 8. 删库了不敢跑，能干点啥？</h2><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220718165738367.png" alt="image-20220718165738367" style="float:left;"><h3 id="_8-1-delete-误删行" tabindex="-1"><a class="header-anchor" href="#_8-1-delete-误删行" aria-hidden="true">#</a> 8.1 delete：误删行</h3><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220718165909464.png" alt="image-20220718165909464" style="float:left;"><h3 id="_8-2-truncate-drop-误删库-表" tabindex="-1"><a class="header-anchor" href="#_8-2-truncate-drop-误删库-表" aria-hidden="true">#</a> 8.2 truncate/drop ：误删库/表</h3><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220718170026929.png" alt="image-20220718170026929" style="float:left;"><h3 id="_8-3-预防使用truncate-drop误删库-表" tabindex="-1"><a class="header-anchor" href="#_8-3-预防使用truncate-drop误删库-表" aria-hidden="true">#</a> 8.3 预防使用truncate/drop误删库/表</h3><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220718170132339.png" alt="image-20220718170132339" style="float:left;"><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/img/image-20220718170215247.png" alt="image-20220718170215247" style="float:left;"><h3 id="_8-4-rm-误删mysql实例" tabindex="-1"><a class="header-anchor" href="#_8-4-rm-误删mysql实例" aria-hidden="true">#</a> 8.4 rm：误删MySQL实例</h3><p>对于一个有高可用机制的MySQL集群来说，不用担心 rm删除数据 了。只是删掉了其中某一个节点的数据的话，HA系统就会开始工作，选出一个新的主库，从而保证整个集群的正常工作。我们要做的就是在这个节点上把数据恢复回来，再接入整个集群。</p><p>但如果是恶意地把整个集群删除，那就需要考虑跨机房备份，跨城市备份。</p><figure><img src="https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202312031906036.png" alt="公众号封面" tabindex="0" loading="lazy"><figcaption>公众号封面</figcaption></figure>`,225);function E(g,L){const n=l("ExternalLinkIcon");return d(),a("div",null,[e("div",v,[m,e("p",null,[t,i(": 以下所有文章整理于B站宋红康老师的《MySQL数据库入门到大牛》。"),e("a",o,[i("MySQL"),r(n)])])]),b])}const T=s(c,[["render",E],["__file","database-backup-and-recovery.html.vue"]]);export{T as default};
