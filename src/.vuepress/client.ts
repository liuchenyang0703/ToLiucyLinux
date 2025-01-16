import { defineClientConfig } from "vuepress/client";
// 将博客博主头像裁切成圆形
import "vuepress-theme-hope/presets/round-blogger-avatar.scss";
// 为所有 hr 元素添加驾驶的车图标：
import "vuepress-theme-hope/presets/hr-driving-car.scss";
// 透明导航栏
// import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";
// 雪花效果
// import { setupSnowFall } from "vuepress-theme-hope/presets/setupSnowFall.js";
// 页脚运行时间
// import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";

export default defineClientConfig({
  setup() {
    // 透明导航栏配置
    // setupTransparentNavbar({
    //   type: "blog-homepage", // 你可以根据需要选择 'homepage', 'blog-homepage', 或 'all'
    //   threshold: 50,    // 透明的临界距离
    //   light: "#000",    // 浅色模式下字体颜色
    //   dark: "#fff",     // 深色模式下字体颜色
    // });

    // 下雪效果配置
  //  setupSnowFall({
  //    count: 25,    // 雪花数量
  //    minSize: 5,   // 雪花的最小大小 (像素)
  //    maxSize: 10,  // 雪花的最大大小 (像素)
  //    speed: 1,     // 雪花的下落速度
  //  });

    // 运行时间配置
//    setupRunningTimeFooter(
//      new Date("2023-11-16"), // 站点开始运行的日期
//      {
//        "/": "ToLiucyLinux网站已运行： :day 天 :hour 小时 :minute 分钟 :second 秒 ღゝ◡╹)ノ♡",
//      },
//      true, // 是否保留页脚的原有内容
//    );
 },
});