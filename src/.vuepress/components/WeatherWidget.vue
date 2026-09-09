<template>
  <div id="tp-weather-widget"></div>
</template>

<script>
import { onBeforeUnmount, onMounted } from 'vue';

export default {
  name: 'WeatherWidget',
  setup() {
    let weatherObserver;

    onMounted(() => {
      const weatherContainer = document.getElementById('tp-weather-widget');
      const addWeatherImageAlt = () => {
        weatherContainer?.querySelectorAll('img:not([alt])').forEach((image) => {
          image.setAttribute('alt', '当前天气图标');
        });
      };

      if (weatherContainer) {
        weatherObserver = new MutationObserver(addWeatherImageAlt);
        weatherObserver.observe(weatherContainer, { childList: true, subtree: true });
        addWeatherImageAlt();
      }

      const SCRIPT_SRC = '//cdn.sencdn.com/widget2/static/js/bundle.js';

      const loadScript = () => {
        // 避免重复插入
        if (document.querySelector(`script[src*="${SCRIPT_SRC}"]`)) return;
        const d = document.createElement('script');
        d.src = SCRIPT_SRC + '?t=' + parseInt((Date.now() / 100000000).toString(), 10);
        d.charset = 'utf-8';
        d.async = true;
        const c = document.getElementsByTagName('script')[0];
        if (c && c.parentNode) c.parentNode.insertBefore(d, c);
        else document.head.appendChild(d);
      };

      // 初始化全局方法占位
      try { window.SeniverseWeatherWidgetObject = 'SeniverseWeatherWidget'; } catch (e) {}
      if (!window.SeniverseWeatherWidget) {
        window.SeniverseWeatherWidget = function() { (window.SeniverseWeatherWidget.q = window.SeniverseWeatherWidget.q || []).push(arguments); };
      }
      window.SeniverseWeatherWidget.l = +new Date();

      // 如果页面已经完成加载，立即注入脚本；否则立即尝试注入并保留 load 事件作为兜底
      if (document.readyState === 'complete') {
        loadScript();
      } else {
        loadScript();
        if (window.attachEvent) window.attachEvent('onload', loadScript);
        else window.addEventListener('load', loadScript, false);
      }

      // showWidget 会在脚本加载或可用时尝试展示，带重试逻辑
      const showWidget = () => {
        if (window.SeniverseWeatherWidget && typeof window.SeniverseWeatherWidget === 'function') {
          try {
            window.SeniverseWeatherWidget('show', {
              flavor: 'slim',
              location: 'WX4FBXXFKE4F',
              geolocation: true,
              language: 'zh-Hans',
              unit: 'c',
              theme: 'auto',
              token: 'f46f0987-ff27-47ee-a416-ae7d7692459e',
              hover: 'enabled',
              container: 'tp-weather-widget'
            });
            return true;
          } catch (e) {
            return false;
          }
        }
        return false;
      };

      if (!showWidget()) {
        let attempts = 0;
        const tid = setInterval(() => {
          attempts++;
          if (showWidget() || attempts > 20) clearInterval(tid);
        }, 500);
      }
    });

    onBeforeUnmount(() => weatherObserver?.disconnect());
    return {};
  }
};
</script>
