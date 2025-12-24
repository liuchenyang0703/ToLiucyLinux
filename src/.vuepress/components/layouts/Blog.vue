<script setup lang="ts">
import { Blog } from "vuepress-theme-hope/blog";
// 必应壁纸
// import BingHeroBackground from "vuepress-theme-hope/presets/BingHeroBackground.js";
// 一言描述 - 随机
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";
</script>

<template>
  <Blog>
    <!--<template #heroBg>
        <BingHeroBackground /> 
    </template>-->
    <template #heroInfo="data">
      <HitokotoBlogHero v-bind="data" />
    </template>
  </Blog>
</template>