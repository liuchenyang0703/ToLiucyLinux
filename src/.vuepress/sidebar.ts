// @ts-ignore
import { sidebar } from "vuepress-theme-hope";
import {interview} from "./interview.js";
import {document} from "./document.js";

export default sidebar({
  "/interview/": interview,
  "/document/": document,
  // 展示侧边栏目录
  "/": [

  ],
});

