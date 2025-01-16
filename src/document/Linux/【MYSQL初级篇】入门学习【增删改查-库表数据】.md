---
title: 【MYSQL初级篇】入门学习【增删改查-库表数据】
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
| [【MYSQL初级篇】入门学习【增删改查-库表数据】](https://liucy.blog.csdn.net/article/details/128396592)|  [https://liucy.blog.csdn.net/article/details/128396592](https://liucy.blog.csdn.net/article/details/128396592)|
| [【MYSQL中级篇】数据库数据查询学习](https://liucy.blog.csdn.net/article/details/128717294) | [https://liucy.blog.csdn.net/article/details/128717294](https://liucy.blog.csdn.net/article/details/128717294) |
|  |  |

| Column 1 | Column 2 |
|:--------:| :-------------|
| centered 文本居中 | right-aligned 文本居右 |




## 前言
>没有安装mysql的，大家可参考【 [Centos7安装Mysql5.7（超详细版）](https://liucy.blog.csdn.net/article/details/124930789)】、【[【云原生】Docker之创建并进入mysql容器](https://liucy.blog.csdn.net/article/details/126288434)】 两种方式任选其一来安装；


SQL语句  
- DDL	数据定义语言 create drop alter
- DML	数据操纵语言 update delete insert
- DQL	数据查询语言 select
- DCL	数据控制语言 grant revoke

## 数据库
### 查看数据库：

```bash
show databases;
```


### 创建数据库：

```bash
create database 库名;
```

```bash
#创建数据库并设置为utf8格式
create database cs character set utf8 ;
```

### 删除数据库：

```bash
drop database 库名;
```

## 表
### 进入某数据库

```bash
use 库名;
```
### 查看某数据库中所有的表：

```bash
show tables;
```
### 创建表：
创建学生表：id（学号）自增，主键；姓名；性别；年龄；生日；地址；邮件；手机号；成绩。
- ZEROFILL <font color=blue>int(3)的时候要是00几的话可以在int(3)后面加一个zerofill</font>
- PRIMARY KEY 		<font color=blue>主键</font>
- AUTO_INCREMENT <font color=blue>自增</font>
- default 0 <font color=blue>设置默认值</font>
- comment <font color=blue>备注</font>
```bash
create table student (id int(3) ZEROFILL PRIMARY KEY AUTO_INCREMENT comment'学号',name varchar(255) not null comment'姓名',sex char(4) not null comment'性别',age int not null comment'年龄',birthday varchar(255) comment'生日',address varchar(255) not null comment'住址',email varchar(50) comment'邮箱',iphone varchar(255) comment'手机号',score int not null comment'成绩')comment='学生表';
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b8eaffe6fe7446a5a4bb80630f801874.png)



### 删除表：

```bash
drop tables 表名;
```
## 查看表结构:

```bash
#视觉上会好很多（推荐）
desc 表名;

#查看表结构的构成语句详细
show create table 表名;

#精简查看表结构
show create table 表名\G; 
```
## 修改表结构：
### 添加字段及类型：

```bash
alter table 表名 add 字段 数据类型;[first | after 字段]
```

>first是在第一行加，after是在最后一行加，也可以指定字段在哪个字段后面加；默认追加；

```bash
#默认追加
alter table student add hobby varchar(255);

#添加一个字段在第一行
alter table student add nvpy varchar(255) first;

#添加一个字段在iphone字段后面
alter table student add npy varchar(255) after iphone;
```

### 删除字段及类型：

```bash
alter table 表名 drop 字段名;
```

```bash
#删除nvpy字段
alter table student drop nvpy;
```

### 修改字段及类型：
单个字段类型修改：

```bash
alter table 表名 modify 字段 数据类型;[first | after 字段]
```

```bash
#修改npy的字段类型为varchar(20)
alter table student modify npy varchar(20);

#修改npy的字段类型为varchar(256)；并放到第一行；
alter table student modify npy varchar(256) first;

#修改npy的字段类型为varchar(50)；并放到name的下一行；
alter table student modify npy varchar(50) after name;
```

多个字段类型修改：

```bash
alter table 表名 change 字段 新字段 数据类型;[first | after 字段]
```

```bash
#修改npy字段，改名npy为nanpy；字段类型改为int类型；
alter table student change npy nanpy int;

#修改nanpy字段，改名为nanfu；字段类型改为char(4)；并且放到第一行；
alter table student change nanpy nanfu char(4) first;

#修改nanfu字段，改名为npy；字段类型改为varchar(255)；并且放到iphone后一行；
alter table student change nanfu npy varchar(225) after iphone;
```

## 修改表名：

```bash
alter table 原表名 rename 新表名;
```

```bash
alter table student rename xuesheng;

#查看表名
show tables;
```

## 数据
### 增：

```bash
#新增一组数据
insert into 表名 values (值1,值2..);
#新增多组数据
insert into 表名 values (值1,值2..), (值1,值2..);
#新增指定多组数据
insert into 表名(字段1，字段2，...) values (值1,值2..);
```

```bash
#新增一组数据
insert into student values (null,'张三','男',15,7.12,'北京市朝阳区某小区1号楼1单元1011','zhangsan@163.com',16222817282,120);

#新增多组数据（5组）
insert into student values (null,'李四','男',18,9.02,'北京市朝阳区某小区1号楼1单元1012','lisi@163.com',1214323282,121),(null,'王五','女',18,2.9,'北京市朝阳区某小区1号楼1单元1010','wangwu@163.com',12234332296,100),(null,'老六','女',19,1.19,'北京市朝阳区某小区1号楼1单元101','laoliu@163.com',13246780092,124.5),(null,'小七','女',17,4.24,'北京市朝阳区某小区1号楼1单元109','xiaoqi@163.com',15278906648,123),(null,'老八','男',16,6.07,'北京市朝阳区某小区1号楼1单元105','laoba@163.com',18267814238,123.5);

#查询student表中所有数据
select * from student;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/3b8300e99fde4793a4931fa79292226d.png)



新增数据报错：`1366 - Incorrect string value: '\xE7\x94\xB7' for column 'sex' at row 1`
这个报错的意思的你的字符集不对，修改一下字符集为utf8即可，如果用的navicat可以直接找库右击修改，如果在linux中可以执行：`alter database cs character set utf8;`修改库的编码格式；`how variables like '%char%';`可通过查看编码格式；修改完，重启mysql，再次试一下就好了；

### 删：

```bash
#删除表中所有数据；（慎用）
delete from 表名;

#删除某表中的指定行；
delete from 表名 where 列=值;
```

```bash
#删除id为004的人（这里注意，因为我们前面的两位是默认的两个0，所以只要删除4就行，4==004）
delete from student where id=4;

#删除手机号为”13246780092“的人
delete from student where iphone="13246780092";

#查询student表中所有数据
select * from student;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4eaf195bfde2476792a060dbbdc9ad46.png)

<font color=red>注：完成之后会将数据重新添加上</font>


>附加：
>删除表主键id需要重0开始的，可执行`truncate table student;`
>&nbsp;
>注：此操作会让数据全部清除，请谨慎使用；
### 改：
代表列、代表值比如主键、手机号；具有唯一性；
```bash
update 表名 set 要修改的列=值 where 代表列=代表值;
```

```bash
#修改id=1，“张三”的住址为“北京市朝阳区某小区1号楼1单元106”
update student set address='北京市朝阳区某小区1号楼1单元106' where id=1;

#修改id=6，“王五”的性别为“男”，地址为“北京市朝阳区某小区1号楼1单元104”
update student set sex='男',address='北京市朝阳区某小区1号楼1单元104' where id=6;

#查询student表中所有数据
select * from student;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/a6b56af82d594333890d2d19a3f80215.png)

### 查：

```bash
select * from 表名;（查看所有字段的内容）
select 字段 from 表名;
```

```bash
#查询student表中所有数据
select * from student;

#查询student表中的姓名和成绩数据
select name,score from student;
select name as 姓名,score as 成绩 from student;
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/6eab0080a2554e329e40be3a0db08dd4.png)



