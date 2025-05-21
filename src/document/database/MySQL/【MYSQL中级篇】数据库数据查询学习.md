---
title: 【MYSQL中级篇】数据库数据查询学习
icon: circle-info
order: 3
category:
  - Linux
  - 数据库
tag:
  - Linux
  - 数据库
pageview: false
date: 2023-11-19 23:54:31
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/dfc7ac4d3ca04b14a86dc0b603e40e17.jpeg)




>🍁**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>

## 相关文章
|文章名|  文章地址
|--|--|
|  [【MYSQL初级篇】入门学习【增删改查-库表数据】](https://liucy.blog.csdn.net/article/details/128396592)|  [https://liucy.blog.csdn.net/article/details/128396592](https://liucy.blog.csdn.net/article/details/128396592)|
| [【MYSQL中级篇】数据库数据查询学习](https://liucy.blog.csdn.net/article/details/128717294) | [https://liucy.blog.csdn.net/article/details/128717294](https://liucy.blog.csdn.net/article/details/128717294) |
|  |  |





## 前言
>没有安装mysql的，大家可参考【 [Centos7安装Mysql5.7（超详细版）](https://liucy.blog.csdn.net/article/details/124930789)】、【[【云原生】Docker之创建并进入mysql容器](https://liucy.blog.csdn.net/article/details/126288434)】 两种方式任选其一来安装；


SQL语句  
- DDL	数据定义语言 create drop alter
- DML	数据操纵语言 update delete insert
- DQL	数据查询语言 select
- DCL	数据控制语言 grant revoke

### 排序查询
- desc	降序
- asc	升序
- limit 1	取第一行

>mysql order by排序默认为<font color=red>升序（从小到大）</font>
```bash
#排序；默认为升序
select * from 表名 order by id;（根据id排序）

#取行数
select * from 表名 limit 偏移量,行数;
```

```bash
#根据score排序，默认为升序
select * from student order by score;

#根据id排序，升序（从小到大）
select * from student order by id asc;

#根据score排序，降序（从大到小）
select * from student order by score desc;

#偏移量为2，取5行；（取第3行到第7行）
select * from student limit 2,5;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/6ff71a3845314e469bf33ee0667a750b.png)

### 分组查询

```bash
select * from 表名 group by 字段;
```

```bash
#按分数打包分组(打包相同的分数)
select * from student group by score;
```
如遇到以下报错，可了解 [https://blog.csdn.net/weixin_44013783/article/details/119422353](https://blog.csdn.net/weixin_44013783/article/details/119422353)、[https://blog.csdn.net/W_317/article/details/116723943](https://blog.csdn.net/W_317/article/details/116723943)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/d1ef12a4f71b4683aabdb37d845014f1.png)

### 去重查询

```bash
select distinct 字段 from 表名;
```

```bash
#去除相同的分数
select distinct score from student;
select distinct score as '分数' from student;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/d59478161b654075bbf949112bb40425.png)


### 聚合函数
- max()	&emsp;最大值

```bash
select max(字段) from 表名;
```

```bash
#查找最高的分数，显示姓名和分数
select name as '姓名',max(score) as '分数' from student;

+----+-------+
| 姓名 | 分数 |
+----+-------+
| 老六 | 125 |
+----+-------+
```

- min()&emsp;	最小值

```bash
select min(字段) from 表名;
```

```bash
#查找最底的分数，显示姓名、性别、年龄、分数；
select name as '姓名',sex as '性别',age as '年龄',min(score) as '分数' from student;

+-----+----+-----+-------+
| 姓名 | 性别 | 年龄 | 分数 |
+-----+----+-----+-------+
| 王五 |  男  | 15 |  100 |
+-----+----+-----+-------+
```

- sum()&emsp;	和

```bash
select sum(字段) from 表名;
```

```bash
#查询班级的总分
select sum(score) as '班级总分' from student;

+---------+
| 班级总分 |
+---------+
|  1546   |
+---------+
```

- count()	&emsp;统计

```bash
select count(字段) from 表名;
```

```bash
#统计班级有多少个人
select count(*) as '班级总人数' from student;

+----------+
| 班级总人数 |
+----------+
|    13    |
+----------+
```

- avg()&emsp;	平均数

```bash
select avg(字段) from 表名;
```

```bash
#计算班级总分的平均分
select avg(score) as '班级平均分' from student;

+----------+
| 班级平均分 |
+----------+
| 118.9231 |
+----------+
```

综合：
```bash
#统计班级的总人数、总分及平均分
select count(*) as '班级总人数',sum(score) as '班级总分',avg(score) as '班级平均分' from student;

+---------+----------+----------+
| 班级总人数 | 班级总分 | 班级平均分 |
+---------+----------+----------+
|    13    |   1546  | 118.9231 |
+---------+----------+----------+
```

- with rollup	&emsp;对聚合结果进行汇总

> 使用 with rollup，此函数是对聚合函数进行求和，注意 with rollup是对 group by 后的第一个字段，进行分组求和。

```bash
#按分数分组，并计算出各组人数、总分、平均分，在做全部统计
select count(*),sum(score),avg(score) from student group by score with rollup;
select count(*) as '各组人数',sum(score) as '各组总分',avg(score) as '各组平均分' from student group by score with rollup;

+---------+---------+----------+
| 各组人数 | 各组总分 | 各组平均分 |
+---------+---------+----------+
|       2 |     246 | 123.0000 |
|       3 |     360 | 120.0000 |
|       2 |     242 | 121.0000 |
|       2 |     200 | 100.0000 |
|       2 |     248 | 124.0000 |
|       2 |     250 | 125.0000 |
|      13 |    1546 | 118.9231 |
+---------+---------+----------+
```

- having	&emsp;&emsp;&emsp;对于聚合后的结果进行过滤，如果逻辑允许，多用where

```bash
#查询分数小于120的人
select * from student having score<120;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/6da2421525384779acac663b87c661c0.png)

- where&emsp;&emsp;&emsp;用于聚合前，having用于聚合后。

```bash
#查询性别为女的人
select * from student where sex='女';
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/64ad23fa16cf47a9adf15052864ba92d.png)
### 比较运算符查询
- 等于: =

```bash
#查询性别是男的学生
select * from student where sex='男';
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/0f87bc58f9fe4b149bbf0f5a532ac4fc.png)

- 大于: >

```bash
#查询年龄大于15的学生
select * from student where age>15;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/2cf9e050638c49eca97d2251caeb9e73.png)

- 大于等于: >=

```bash
#查询年龄大于等于15的学生
select * from student where age>=15;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ac2034d1ccdc4a5997554167294d15e0.png)

- 小于: <

```bash
#查询分数小于122的学生
select * from student where score<122;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/07c660da564940e6b885782c596311e4.png)

- 小于等于: <=

```bash
#查询分数小于等于122的学生
select * from student where score<=122;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/64aa6bdf188c4914a9daf9bdeb1c336e.png)

- 不等于: != 或 <>

```bash
#查询学生性别不是男生的
select * from student where sex!='男';
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b1b4365e31944ef88e1e33087cb328e8.png)

```bash
#查询学生性别不是女生的
select * from student where sex<>'女';
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c0a2c14e4ec8415fa255eb2b05ee16f8.png)

### 逻辑运算符查询
- and&emsp;和，要同时符合这两个条件或多个条件；

```bash
#查询学生分数高于122的男同学
select * from student where score>122 and sex='男';
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ae93199fac9d4abd849f3dae70c559a0.png)

- or&emsp;或，满足其中一个条件即可，两者都有则都输出；

```bash
#查询年龄大于18或小于20的学生
select * from student where age>18 or age<20;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/763e832d00df449b895e2a8e923bcb02.png)

- not&emsp;不，不要指定条件的数据；

```bash
#查询分数不在120到123的学生
select * from student where not (score>=120 and score<=123);
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f7ce1732f9bc4089b9a5b130f3319b96.png)
>多个条件判断想要作为一个整体的时候，可以使用<font color=red>()</font>。

### 模糊查询
新增3条模糊查询要用到的数据

```bash
insert into student values (null,'张九','男',15,7.12,'北京市朝阳区某小区1号楼1单元103','zhangjiu@163.com',16839217282,122);
insert into student values (null,'张时嘉','女',17,12.12,'北京市朝阳区某小区1号楼1单元102','zhangsj@163.com',13307189235,124.5),(null,'张时依','女',17,12.12,'北京市朝阳区某小区1号楼1单元102','zhangsy@163.com',13307189236,125);
```

- like是模糊查询关键字

- %表示任意多个任意字符

- _表示一个任意字符

**例1：查询姓张的学生都有谁**

```bash
#查询姓张的学生都有谁
select name from student where name like "张%";
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/eb03bad4cc674299ab6d532d349aebed.png)

**例2：查询姓张的两个字的学生都有谁**

```bash
#查询姓张的两个字的学生都有谁
select * from student where name like "张_";
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/420af16e5f5e462496b4e045a48950eb.png)

**例3：查询三个字的学生都有谁**

```bash
#查询三个字的学生都有谁
select * from student where name like "___";
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/fe2b83875cf24204ac8e8f14a8fe5678.png)

**例4：查询手机号以16开头的学生**
```bash
#查询手机号以16开头的学生
select * from student where iphone like "16%";
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ad464092ca4543f3abc8cc8fc49b2fd5.png)

**例5：查询姓老的或是名字中带时的都有谁**

```bash
#查询姓老的或是名字中带时的都有谁
select * from student where name like "老%" or name like "%时%";
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1f29a751f46e4b3c80df6d5202bef860.png)

### 范围查询
- between .. and .. 表示在一个连续的范围内查询
- in 表示在一个非连续的范围内查询

**例1：查询生日6月01日到9月31日的学生**
```bash
#查询生日6月01日到9月31日的学生
select * from student where birthday between "6.01"and"9.31";
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/5d90106a3dbf4e4cace2fb813735969c.png)


**例2：查询地址为1单元103到109之间的男同学**

```bash
#查询地址为1单元103到109之间的男同学
select * from student where (address between "北京市朝阳区某小区1号楼1单元103"and"北京市朝阳区某小区1号楼1单元109") and sex='男';
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/87aeaf3de82947229b759427adaa9aa5.png)

**例3：查询id为1和22的两个学生**

```bash
#查询id为1和22的两个学生
select * from student where id in(1,22);
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/009e63e84e3c43aabe83a7703057b955.png)
>IN 列表项不仅支持数字，也支持字符甚至时间日期类型等，并且可以将这些不同类型的数据项混合排列而无须跟 column 的类型保持一致：
>一个 IN 只能对一个字段进行范围比对，如果要指定更多字段，可以使用 AND 或 OR 逻辑运算符：
>使用 AND 或 OR 逻辑运算符后，IN 还可以和其他如 LIKE、>=、= 等运算符一起使用。


### 空判断查询
- 判断为空使用: is null
- 判断非空使用: is not null

```bash
#查询邮件是空的学生
select * from student where email is null;
```

```bash
#查询邮件不是空的学生
select * from student where email is not null;
```

> 不能使用 where height = null 判断为空
不能使用 where height != null 判断非空
null 不等于<font color=red> 空字符串</font>

### 多表联查
新增一个表

```bash
create table body (id int(3) ZEROFILL PRIMARY KEY AUTO_INCREMENT comment'id',name varchar(255) not null comment'姓名',height varchar(255) comment'身高',weight varchar(255) not null comment'体重',heartbeat int comment'心跳/每分钟')comment='学生身体表';
```

新增数据

```bash
insert into body values (null,'张三','177.2','140.4',99),(null,'李四','180','149.2',80),(null,'王五','167.9','141',80),(null,'老六','173','128',77),(null,'小七','159.5','90.8',89),(null,'老八','169.9','145.2',78),(null,'张九','169','120.5',82),(null,'张时嘉','168','83',79),(null,'张时依','168.3','83.4',82);
```
### 两表联查内连接
>两表联查必须加上where 表1 id=表2 id，否则查询出来会有很多重复的数据，你写了几个字段，就会查询到多少字段的重复数据；

**内连接格式：**<font color=red>**A inner join B on 条件**</font>
>**例子：**
>select * from A inner join B on 条件；
>select * from A inner join B on 条件 where 条件；
>select * from A inner join B on 条件 where 条件 having 条件；
>select * from A inner join B on 条件 order by 字段；
>select * from A inner join B on 条件 where 条件 order by 字段；
>select * from A inner join B on 条件 where 条件 having 条件 order by 字段；

**例1：查询student表姓名、性别、年龄，body表身高、体重、心跳；**
```bash
#两表联查：查询student表姓名、性别、年龄，body表身高、体重、心跳；
select student.name as '姓名',student.sex as '性别',student.age as '年龄',body.height as '身高',body.weight as '体重',body.heartbeat as '心跳/每分钟' from student,body where student.id=body.id;

#别名两表联查：查询student表姓名、性别、年龄，body表身高、体重、心跳；
select a.name as '姓名',a.sex as '性别',a.age as '年龄',b.height as '身高',b.weight as '体重',b.heartbeat as '心跳/每分钟' from student a,body b where a.id=b.id;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/91baa77494f7411c89800b9ff8e2b6ac.png)

**例2：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的学生；**

```bash
#别名两表联查：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的学生；
select a.name as '姓名',a.sex as '性别',a.age as '年龄',b.height as '身高',b.weight as '体重',b.heartbeat as '心跳/每分钟',a.score as '分数' from student a,body b where a.id=b.id having score>=122;
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/64154ab9de524641a226dfc6ada15121.png)

**例3：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的女学生；**

```bash
#别名两表联查内连接：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的女学生；
select a.name as '姓名',a.sex as '性别',a.age as '年龄',b.height as '身高',b.weight as '体重',b.heartbeat as '心跳/每分钟',a.score as '分数' from student a inner join body b on a.id=b.id where score>=122 having sex='女';
```


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/2b4e2f0d625c4dc381dc5159447bbda7.png)

**例4：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的女学生且从大到小排序；**

```bash
#别名两表联查内连接：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的女学生且从大到小排序；
select a.name as '姓名',a.sex as '性别',a.age as '年龄',b.height as '身高',b.weight as '体重',b.heartbeat as '心跳/每分钟',a.score as '分数' from student a inner join body b on a.id=b.id where score>=122 having sex='女' order by score desc;
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/02be73306a61416e8110d0a2478c59ad.png)

### 两表联查左连接
>两表联查必须加上where 表1 id=表2 id，否则查询出来会有很多重复的数据，你写了几个字段，就会查询到多少字段的重复数据；

**内连接格式：**<font color=red>**A left join B on 条件**</font>
>**例子：**
>select * from A left join B on 条件；
>select * from A left join B on 条件 where 条件；
>select * from A left join B on 条件 where 条件 having 条件；
>select * from A left  join B on 条件 order by 字段；
>select * from A left join B on 条件 where 条件 order by 字段；
>select * from A left join B on 条件 where 条件 having 条件 order by 字段；

**例1：查询student表姓名、性别、年龄，body表身高；**
```bash
#别名两表联查左连接：查询student表姓名、性别、年龄，body表身高；
select a.name as '姓名',a.sex as '性别',a.age as '年龄',b.height as '身高' from student a left join body b on a.id=b.id;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1c58424240b54854ad748b9d2297e600.png)

**例2：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的学生；**

```bash
#别名两表联查左连接：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的学生；
select a.name as '姓名',a.sex as '性别',a.age as '年龄',b.height as '身高',b.weight as '体重',b.heartbeat as '心跳/每分钟',a.score as '分数' from student a left join body b on a.id=b.id where score>=122;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/386ed25fe148407f9c9b346c29b22d88.png)

**例3：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的女学生；**

```bash
#别名两表联查左连接：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的女学生；
select a.name as '姓名',a.sex as '性别',a.age as '年龄',b.height as '身高',b.weight as '体重',b.heartbeat as '心跳/每分钟',a.score as '分数' from student a left join body b on a.id=b.id where score>=122 having sex='女';
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/2f4c3cf0ce1f4af681d5cedec4eef2ad.png)

**例4：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的女学生且从大到小排序；**

```bash
#别名两表联查左连接：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的女学生且从大到小排序；
select a.name as '姓名',a.sex as '性别',a.age as '年龄',b.height as '身高',b.weight as '体重',b.heartbeat as '心跳/每分钟',a.score as '分数' from student a left join body b on a.id=b.id where score>=122 having sex='女' order by score desc;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/493fae6f353b45a980faf3232bd30194.png)

### 两表联查右连接
>两表联查必须加上where 表1 id=表2 id，否则查询出来会有很多重复的数据，你写了几个字段，就会查询到多少字段的重复数据；

**内连接格式：**<font color=red>**A right join B on 条件**</font>
>**例子：**
>select * from A right join B on 条件；
>select * from A right join B on 条件 where 条件；
>select * from A right join B on 条件 where 条件 having 条件；
>select * from A right join B on 条件 order by 字段；
>select * from A right join B on 条件 where 条件 order by 字段；
>select * from A right join B on 条件 where 条件 having 条件 order by 字段；

**例1：查询student表姓名、性别、年龄，body表身高；**

```bash
#别名两表联查右连接：查询student表姓名、性别、年龄，body表身高；
select a.name as '姓名',a.sex as '性别',a.age as '年龄',b.height as '身高' from student a right join body b on a.id=b.id;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1aae26d06244440a8c19b3b5dfc28f72.png)



**例2：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的学生；**

```bash
#别名两表联查右连接：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的学生；
select a.name as '姓名',a.sex as '性别',a.age as '年龄',b.height as '身高',b.weight as '体重',b.heartbeat as '心跳/每分钟',a.score as '分数' from student a right join body b on a.id=b.id where score>=122;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/e9ffc888fb414bd4af1dc56b1863bb8f.png)


**例3：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的女学生；**

```bash
#别名两表联查右连接：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的女学生；
select a.name as '姓名',a.sex as '性别',a.age as '年龄',b.height as '身高',b.weight as '体重',b.heartbeat as '心跳/每分钟',a.score as '分数' from student a right join body b on a.id=b.id where score>=122 having sex='女';
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/fc2f4edbc787468fb11b26d220437316.png)


**例4：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的女学生且从大到小排序；**

```bash
#别名两表联查右连接：查询student表姓名、性别、年龄、分数，body表身高、体重、心跳，并只显示成绩大于等于122的女学生且从大到小排序；
select a.name as '姓名',a.sex as '性别',a.age as '年龄',b.height as '身高',b.weight as '体重',b.heartbeat as '心跳/每分钟',a.score as '分数' from student a right join body b on a.id=b.id where score>=122 having sex='女' order by score desc;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4e29406c5e2c4f56aa23d8937d29674a.png)
### 全连接: union或union all 
**注意：**
1.两张表的数据数量必须相同
2.全连接内使用order by 没有效果，可以对连接后的结果进行排序； 
3.union会合并相同的数据；

```bash
select * from 表1 union all select * from 表2;
```

```bash
select * from student1 union all select * from student2;
```

