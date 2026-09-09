<script setup lang="ts">
import { computed, useSlots } from "vue";
import { withBase } from "vuepress/client";
import AutoLink from "vuepress-theme-hope/components/base/AutoLink";
import HeroSlideDownButton from "vuepress-theme-hope/components/home/HeroSlideDownButton";
import DropTransition from "vuepress-theme-hope/components/transitions/DropTransition";
import { useData } from "vuepress-theme-hope/client";

const slots = useSlots();
const { frontmatter, siteLocale } = useData();

const info = computed(() => {
  const { heroText, tagline, heroStyle, heroFullScreen = false } = frontmatter.value;
  return {
    text: heroText ?? (siteLocale.value.title || "Hello"),
    tagline: tagline ?? siteLocale.value.description,
    style: heroStyle ?? null,
    isFullScreen: heroFullScreen,
  };
});

const image = computed(() => {
  const { heroImage, heroImageDark, heroAlt, heroImageStyle } = frontmatter.value;
  return {
    image: heroImage ? withBase(heroImage) : null,
    imageDark: heroImageDark ? withBase(heroImageDark) : null,
    style: heroImageStyle ?? null,
    alt: heroAlt ?? "",
  };
});

const bg = computed(() => {
  const { bgImage, bgImageDark, bgImageStyle } = frontmatter.value;
  return {
    image: typeof bgImage === "string" ? withBase(bgImage) : null,
    imageDark: typeof bgImageDark === "string" ? withBase(bgImageDark) : null,
    style: bgImageStyle ?? null,
  };
});

const actions = computed(() => frontmatter.value.actions ?? []);

const scrollDown = (): void => {
  window.scrollTo({
    top: window.innerHeight - (document.querySelector("[vp-navbar]")?.clientHeight ?? 0),
    behavior: "smooth",
  });
};
</script>

<template>
  <header class="vp-hero-info-wrapper" :class="{ 'hero-fullscreen': info.isFullScreen }" :style="info.style">
    <slot v-if="slots.heroBg" name="heroBg" v-bind="bg" />
    <template v-else>
      <div v-if="bg.image" class="vp-hero-mask" :class="{ light: bg.imageDark }" :style="[{ backgroundImage: `url(${bg.image})` }, bg.style]" />
      <div v-if="bg.imageDark" class="vp-hero-mask dark" :style="[{ backgroundImage: `url(${bg.imageDark})` }, bg.style]" />
    </template>

    <div class="vp-hero-info">
      <slot v-if="slots.heroLogo" name="heroLogo" v-bind="image" />
      <DropTransition v-else appear group>
        <img
          v-if="image.image"
          key="light"
          class="vp-hero-image"
          :class="{ light: image.imageDark }"
          :style="image.style"
          :src="image.image"
          :alt="image.alt"
          fetchpriority="high"
          decoding="async"
        />
        <img
          v-if="image.imageDark"
          key="dark"
          class="vp-hero-image dark"
          :style="image.style"
          :src="image.imageDark"
          :alt="image.alt"
          fetchpriority="high"
          decoding="async"
        />
      </DropTransition>

      <slot v-if="slots.heroInfo" name="heroInfo" v-bind="info" />
      <div v-else class="vp-hero-infos">
        <DropTransition v-if="info.text" appear :delay="0.04">
          <h1 id="main-title" class="vp-hero-title">{{ info.text }}</h1>
        </DropTransition>
        <DropTransition v-if="info.tagline" appear :delay="0.08">
          <div id="main-description" v-html="info.tagline" />
        </DropTransition>
        <DropTransition v-if="actions.length" appear :delay="0.12">
          <p class="vp-hero-actions">
            <AutoLink
              v-for="action in actions"
              :key="action.link"
              class="vp-hero-action no-external-link-icon"
              :class="action.type ?? 'default'"
              :config="action"
            />
          </p>
        </DropTransition>
      </div>
    </div>

    <HeroSlideDownButton v-if="info.isFullScreen" @click="scrollDown" />
  </header>
</template>

<style src="vuepress-theme-hope/styles/home/hero-info.scss" lang="scss" />
