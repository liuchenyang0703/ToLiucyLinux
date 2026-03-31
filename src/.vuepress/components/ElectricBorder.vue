<template>
  <div
    class="electric-border-wrapper"
    :style="wrapperStyle"
  >
    <!-- SVG 滤镜引擎 -->
    <svg class="electric-filter" width="0" height="0">
      <defs>
        <filter :id="filterId" x="-50%" y="-50%" width="200%" height="200%">
          <!-- 基础湍流噪声 -->
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01"
            numOctaves="3"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              :values="`${baseFrequency};${baseFrequency * 1.5};${baseFrequency}`"
              :dur="`${duration}s`"
              repeatCount="indefinite"
            />
          </feTurbulence>
          
          <!-- 额外的高频噪声层，增加细节 -->
          <feTurbulence
            type="turbulence"
            baseFrequency="0.05"
            numOctaves="2"
            result="noise2"
          >
            <animate
              attributeName="baseFrequency"
              values="0.05;0.08;0.05"
              :dur="`${duration * 0.7}s`"
              repeatCount="indefinite"
            />
          </feTurbulence>
          
          <!-- 合并噪声 -->
          <feMerge result="combinedNoise">
            <feMergeNode in="noise" />
            <feMergeNode in="noise2" />
          </feMerge>
          
          <!-- 位移映射 - 核心电流效果 -->
          <feDisplacementMap
            in="SourceGraphic"
            in2="combinedNoise"
            :scale="intensity"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          >
            <animate
              attributeName="scale"
              :values="`${intensity};${intensity * 1.3};${intensity}`"
              :dur="`${duration * 0.5}s`"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
          
          <!-- 发光效果 -->
          <feGaussianBlur
            v-if="glow"
            in="displaced"
            :stdDeviation="glowIntensity"
            result="blurred"
          >
            <animate
              attributeName="stdDeviation"
              :values="`${glowIntensity};${glowIntensity * 1.5};${glowIntensity}`"
              :dur="`${duration * 0.3}s`"
              repeatCount="indefinite"
            />
          </feGaussianBlur>
          
          <!-- 合并原始图形和发光 -->
          <feMerge v-if="glow">
            <feMergeNode in="blurred" />
            <feMergeNode in="displaced" />
          </feMerge>
        </filter>
      </defs>
    </svg>

    <!-- 边框层 -->
    <div
      class="electric-border"
      :style="borderStyle"
    >
      <div class="border-line top" :style="lineStyle" />
      <div class="border-line right" :style="lineStyle" />
      <div class="border-line bottom" :style="lineStyle" />
      <div class="border-line left" :style="lineStyle" />
    </div>

    <!-- 内容插槽 -->
    <div class="electric-content" :style="contentStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  // 外观配置
  color?: string
  borderWidth?: number
  borderRadius?: number
  backgroundColor?: string
  
  // 动画配置
  intensity?: number
  baseFrequency?: number
  duration?: number
  
  // 发光效果
  glow?: boolean
  glowIntensity?: number
  glowColor?: string
  
  // 尺寸
  width?: string
  height?: string
  padding?: string
  
  // 交互
  hoverEffect?: boolean
  hoverScale?: number
}

const props = withDefaults(defineProps<Props>(), {
  color: '#00d4ff',
  borderWidth: 2,
  borderRadius: 8,
  backgroundColor: 'transparent',
  intensity: 30,
  baseFrequency: 0.01,
  duration: 3,
  glow: true,
  glowIntensity: 2,
  glowColor: 'currentColor',
  width: 'auto',
  height: 'auto',
  padding: '1.5rem',
  hoverEffect: true,
  hoverScale: 1.02
})

// 生成唯一 filter ID，避免多个实例冲突
const filterId = ref(`electric-filter-${Math.random().toString(36).substr(2, 9)}`)

// 包装器样式
const wrapperStyle = computed(() => ({
  position: 'relative',
  display: 'inline-block',
  width: props.width,
  height: props.height,
  borderRadius: `${props.borderRadius}px`,
  transition: props.hoverEffect ? 'transform 0.3s ease' : undefined,
  '--electric-color': props.color,
  '--electric-glow-color': props.glowColor,
  '--hover-scale': props.hoverScale
}))

// 边框层样式
const borderStyle = computed(() => ({
  position: 'absolute',
  inset: '0',
  pointerEvents: 'none',
  filter: `url(#${filterId.value})`,
  zIndex: 1
}))

// 线条样式
const lineStyle = computed(() => ({
  position: 'absolute',
  backgroundColor: props.color,
  boxShadow: props.glow ? `0 0 ${props.glowIntensity * 2}px ${props.glowIntensity}px ${props.color}` : undefined
}))

// 内容区域样式
const contentStyle = computed(() => ({
  position: 'relative',
  zIndex: 2,
  padding: props.padding,
  backgroundColor: props.backgroundColor,
  borderRadius: `${props.borderRadius}px`,
  overflow: 'hidden'
}))
</script>

<style scoped>
.electric-border-wrapper {
  /* 基础样式 */
  box-sizing: border-box;
}

.electric-border-wrapper:hover {
  transform: scale(var(--hover-scale, 1.02));
}

/* 隐藏 SVG 但保持滤镜可用 */
.electric-filter {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

/* 边框线条定位 */
.border-line {
  will-change: transform;
}

.border-line.top {
  top: 0;
  left: 0;
  right: 0;
  height: v-bind('`${borderWidth}px`');
  transform-origin: left;
}

.border-line.right {
  top: 0;
  right: 0;
  bottom: 0;
  width: v-bind('`${borderWidth}px`');
  transform-origin: top;
}

.border-line.bottom {
  bottom: 0;
  left: 0;
  right: 0;
  height: v-bind('`${borderWidth}px`');
  transform-origin: right;
}

.border-line.left {
  top: 0;
  left: 0;
  bottom: 0;
  width: v-bind('`${borderWidth}px`');
  transform-origin: bottom;
}

/* 内容区域 */
.electric-content {
  height: 100%;
  box-sizing: border-box;
}

/* 确保子元素正常显示 */
.electric-content > * {
  position: relative;
  z-index: 2;
}
</style>