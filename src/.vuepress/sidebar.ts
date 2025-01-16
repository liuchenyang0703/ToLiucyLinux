// @ts-ignore
import { sidebar } from "vuepress-theme-hope";
import {interview} from "./interview.js";
import {document} from "./document.js";
import {update_history} from "./update_history.js";

export default sidebar({
  "/interview/": interview,
  "/document/": document,
  "/update_history/": update_history,
  // 展示侧边栏目录
  "/": [

  ],
});

