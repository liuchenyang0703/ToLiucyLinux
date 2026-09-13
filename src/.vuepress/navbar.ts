// @ts-ignore
import { navbar } from "vuepress-theme-hope";

export default navbar([
  // 主页
  // "/",
  { 
    text: "博客",
    icon: "boke",
    link: "/blog.md" 
  },
  {
    text: "文档指南",
    icon: "columns",
    link: "/document/",
  },
  {
    text: "面试题大全",
    icon: "a-061_shuben",
    link: "/interview/",
  },
  {
    text: "运维资源汇总",
    icon: "yunweiziyuanguanli",
    children: [
      {
        text: "运维工具配置",
        children: ["tools-all.md"],
      },
      {
        text: "运维服务官网",
        children: ["website-all.md"],
      },
      {
        text: "运维文库汇总",
        children: ["document-all.md"],
      },
    ],
  },
  {
    text: "在线小工具",
    icon: "gongju",
    children: [
      {
        text: "IP 查询检测",
        icon: "ip2",
        link: "tools/ip_check.md"
      },
      {
        text: "Base64 编解码",
        icon: "mima",
        link: "tools/base64.md"
      },
      {
        text: "图片格式转换",
        icon: "tupian",
        link: "tools/image-converter.md"
      },
    ],
  },
  {
    text: "网站相关",
    icon: "circle-info",
    children: [
      {
        text: "作者信息",
        children: ["person.md","honor.md"],
      },
      {
        text: "友情链接",
        children: ["friendship.md"],
      },
      {
        text: "项目更新",
        children: ["/update_history/"],
      },
      {
        text: "博客创作时间轴",
        icon: "lishi",
        children: ["/timeline/", "/category/", "/tag/", "Custom/archives.md"],
      },
      {
        text: "关于本站",
        children: ["about.md","web_submit.md"],
      },
      {
        text: "访客统计",
        icon: "gongchengshi-chengxuyuan-selected",
        link: "https://eu.umami.is/share/oTwjzYgoTuzdkVaR/liuchenyang.top",
      },
      {
        text: "赞赏",
        children: ["donate.md"],
      },
    ],
  },
  {
    text: "我的故事",
    icon: "gerenjieshao",
    children: [
      {
        text: "关于我们",
        children: ["Custom/AboutUs.md"],
      },
      {
        text: "旅游",
        children: ["Custom/travel.md"],
      },
    ],
  },
]);
