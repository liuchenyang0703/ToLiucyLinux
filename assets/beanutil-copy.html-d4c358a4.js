const t=JSON.parse('{"key":"v-26afa24f","path":"/framework/springboot/beanutil-copy.html","title":"Mapstruct神器","lang":"zh-CN","frontmatter":{"title":"Mapstruct神器","icon":"circle-info","order":3,"tag":["Springboot"],"category":["Springboot"],"pageview":false,"date":"2024-03-29T14:19:10.000Z","comment":false,"description":"1.前言 在项目中，如果我们要遵循分层领域模型规约: 话，肯定避免不了在DTO、VO、BO、AO、VO、Query等实体的转换，我们通常有几种做法:\\r手动一个个字段的赋值; \\r通过反序列化的手段，必须先转成JSON字符串，再转回来; \\r使用Spring的BeanUtils，提供的克隆方法。; 想必上面这几种方式大家都使用过。但是BeanUtils底层是...","head":[["meta",{"property":"og:url","content":"http://liuchenyang.top/ToLiucyLinux/framework/springboot/beanutil-copy.html"}],["meta",{"property":"og:site_name","content":"ToLiucyLinux"}],["meta",{"property":"og:title","content":"Mapstruct神器"}],["meta",{"property":"og:description","content":"1.前言 在项目中，如果我们要遵循分层领域模型规约: 话，肯定避免不了在DTO、VO、BO、AO、VO、Query等实体的转换，我们通常有几种做法:\\r手动一个个字段的赋值; \\r通过反序列化的手段，必须先转成JSON字符串，再转回来; \\r使用Spring的BeanUtils，提供的克隆方法。; 想必上面这几种方式大家都使用过。但是BeanUtils底层是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"Liucy"}],["meta",{"property":"article:tag","content":"Springboot"}],["meta",{"property":"article:published_time","content":"2024-03-29T14:19:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mapstruct神器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-29T14:19:10.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Liucy\\",\\"url\\":\\"http://liuchenyang.top\\"}]}"]]},"headers":[{"level":2,"title":"1.前言","slug":"_1-前言","link":"#_1-前言","children":[]},{"level":2,"title":"2.什么是DTO、DO、BO、AO、VO、Query","slug":"_2-什么是dto、do、bo、ao、vo、query","link":"#_2-什么是dto、do、bo、ao、vo、query","children":[{"level":3,"title":"2.1 DTO","slug":"_2-1-dto","link":"#_2-1-dto","children":[]},{"level":3,"title":"2.2 DO","slug":"_2-2-do","link":"#_2-2-do","children":[]},{"level":3,"title":"2.3 BO","slug":"_2-3-bo","link":"#_2-3-bo","children":[]},{"level":3,"title":"2.4 AO","slug":"_2-4-ao","link":"#_2-4-ao","children":[]},{"level":3,"title":"2.5 VO","slug":"_2-5-vo","link":"#_2-5-vo","children":[]},{"level":3,"title":"2.6 Query","slug":"_2-6-query","link":"#_2-6-query","children":[]},{"level":3,"title":"2.7 示例代码","slug":"_2-7-示例代码","link":"#_2-7-示例代码","children":[]}]},{"level":2,"title":"3.mapstruct的作用","slug":"_3-mapstruct的作用","link":"#_3-mapstruct的作用","children":[]},{"level":2,"title":"4.mapstruct哪点比BeanUtils好？","slug":"_4-mapstruct哪点比beanutils好","link":"#_4-mapstruct哪点比beanutils好","children":[]},{"level":2,"title":"5.SpringBoot整合mapstruct","slug":"_5-springboot整合mapstruct","link":"#_5-springboot整合mapstruct","children":[{"level":3,"title":"5.1 引入pom依赖","slug":"_5-1-引入pom依赖","link":"#_5-1-引入pom依赖","children":[]},{"level":3,"title":"5.2 创建 DO、VO","slug":"_5-2-创建-do、vo","link":"#_5-2-创建-do、vo","children":[]},{"level":3,"title":"5.3 创建转换器接口","slug":"_5-3-创建转换器接口","link":"#_5-3-创建转换器接口","children":[]},{"level":3,"title":"5.4 进行测试","slug":"_5-4-进行测试","link":"#_5-4-进行测试","children":[]}]},{"level":2,"title":"6.mapstruct其他操作","slug":"_6-mapstruct其他操作","link":"#_6-mapstruct其他操作","children":[{"level":3,"title":"6.1 不同字段映射","slug":"_6-1-不同字段映射","link":"#_6-1-不同字段映射","children":[]},{"level":3,"title":"6.2 @Mappings注解","slug":"_6-2-mappings注解","link":"#_6-2-mappings注解","children":[]},{"level":3,"title":"6.3 List转换","slug":"_6-3-list转换","link":"#_6-3-list转换","children":[]},{"level":3,"title":"6.4 Spring依赖注入","slug":"_6-4-spring依赖注入","link":"#_6-4-spring依赖注入","children":[]}]},{"level":2,"title":"7.MapStruct的IDEA插件","slug":"_7-mapstruct的idea插件","link":"#_7-mapstruct的idea插件","children":[]},{"level":2,"title":"8.总结","slug":"_8-总结","link":"#_8-总结","children":[]}],"git":{},"readingTime":{"minutes":8.37,"words":2512},"filePathRelative":"framework/springboot/beanutil-copy.md","localizedDate":"2024年3月29日","copyright":{"author":"LiucyLinux(LiucyLinux.cn)","license":"MIT"},"autoDesc":true}');export{t as data};
