import { defineClientConfig, usePageData, useSiteData } from "vuepress/client";
import {DenaroMoefyCanvas} from "../client/components/DenaroMoefyCanvas.js"


export default defineClientConfig({
  rootComponents: [DenaroMoefyCanvas],
});
