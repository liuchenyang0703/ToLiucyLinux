import { useNow, watchImmediate } from "@vueuse/core";
import { computed, onMounted } from "vue";

import { useData } from "vuepress-theme-hope/client";

const millisecondPerDay = 1000 * 60 * 60 * 24;

/**
 *
 * @param date - The date to calculate the running time
 * @param locales - The locales of running time, `:day`, `:hour`, `:minute`, `:second` will be replaced by the corresponding value
 * @param preserveContent - Whether to preserve the original content of the footer
 *
 * @param date - 计算运行时间的日期
 * @param locales - 运行时间的本地化文字， `:day`, `:hour`, `:minute`, `:second` 会被对应的值替换
 * @param preserveContent - 是否保留页脚的原有内容
 */
export const setupRunningTimeFooter = (
  date: string | Date,
  // oxlint-disable-next-line unicorn/no-object-as-default-parameter
  locales: Record<string, string> = {
    "/": "Running time: :day days :hour hours :minute minutes :second seconds",
  },
  preserveContent = false,
): void => {
  const { routeLocale, routePath } = useData();
  const now = useNow();

  const initialTimeStamp = (
    date instanceof Date ? date : new Date(date)
  ).getTime();

  const pastedTime = computed(() => {
    const passedTime = now.value.getTime() - initialTimeStamp;
    const restDate = new Date(passedTime % millisecondPerDay);

    return {
      day: Math.floor(passedTime / millisecondPerDay),
      hour: restDate.getHours(),
      minute: restDate.getMinutes(),
      second: restDate.getSeconds(),
    };
  });

  onMounted(() => {
    watchImmediate(
      [routePath, pastedTime],
      () => {
        const footer = document.querySelector(".vp-footer") as HTMLElement;

        if (footer) {
          const { day, hour, minute, second } = pastedTime.value;
          const localeText = (locales[routeLocale.value] || locales["/"])
            .replace(":day", day.toString())
            .replace(":hour", hour.toString())
            .replace(":minute", minute.toString())
            .replace(":second", second.toString());

          // 创建一个独立的容器来放置运行时间
          let runningTimeContainer = footer.querySelector(".running-time-container") as HTMLElement;
          if (!runningTimeContainer) {
            runningTimeContainer = document.createElement("div");
            runningTimeContainer.className = "running-time-container";
            runningTimeContainer.style.textAlign = "center"; // 居中显示
            runningTimeContainer.style.marginTop = "5px"; // 减少顶部间距
            runningTimeContainer.style.marginBottom = "5px"; // 添加底部间距

            // 插入到页脚的最顶部
            footer.insertBefore(runningTimeContainer, footer.firstChild);
          }

          // 更新运行时间容器的内容
          runningTimeContainer.innerHTML = localeText;

          // 如果需要保留页脚原有内容，确保不重复插入
          if (preserveContent) {
            // 确保其他内容整体下移一层
            const otherContent = footer.querySelector(":not(.running-time-container)") as HTMLElement;
            if (otherContent) {
              otherContent.style.marginTop = "10px"; // 添加一些顶部间距
            }
          } else {
            // 清空页脚内容，只保留运行时间容器
            footer.innerHTML = runningTimeContainer.outerHTML;
          }
        }
      },
      { flush: "post" },
    );
  });
};