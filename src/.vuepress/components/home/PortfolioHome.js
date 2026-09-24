// @ts-nocheck -- 此文件基于主题编译后的官方组件，内部别名由 VuePress 在构建时解析。
import { defineComponent, h } from "vue";
import { useFrontmatter } from "vuepress/client";

import MarkdownContent from "@theme-hope/components/base/MarkdownContent";
import PortfolioHero from "@theme-hope/components/home/PortfolioHero";
import DropTransition from "@theme-hope/components/transitions/DropTransition";

/**
 * 个人主页布局
 *
 * 基于 VuePress Theme Hope 官方 PortfolioHome 组件调整。
 * 单独放在项目内，便于修改 person.md 的布局且不受主题升级覆盖。
 */
export default defineComponent({
  name: "PortfolioHome",

  slots: Object,

  setup(_props, { slots }) {
    const frontmatter = useFrontmatter();

    return () => {
      const content = frontmatter.value.content ?? "portfolio";

      return h(
        "main",
        {
          id: "main-content",
          class: "vp-page vp-portfolio-home",
          "aria-labelledby": "main-title",
        },
        [
          h(PortfolioHero, null, slots),
          content === "none"
            ? null
            : (slots.content?.() ??
              h(
                "div",
                { class: "vp-portfolio-content-wrapper" },
                h(
                  DropTransition,
                  { appear: true, delay: 0.24 },
                  () =>
                    h(
                      MarkdownContent,
                      {
                        class: {
                          "vp-portfolio-content": content === "portfolio",
                        },
                      },
                      slots,
                    ),
                ),
              )),
        ],
      );
    };
  },
});
