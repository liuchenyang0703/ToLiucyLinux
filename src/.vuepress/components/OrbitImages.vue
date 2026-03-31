<template>
  <div 
    class="orbit-container"
    :style="containerStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 中心内容（可选） -->
    <div v-if="$slots.center" class="orbit-center">
      <slot name="center" />
    </div>
    
    <!-- 轨道层 -->
    <div 
      class="orbit-track"
      :style="trackStyle"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="orbit-item"
        :style="getItemStyle(index)"
        @click="handleItemClick(index)"
      >
        <div class="orbit-image-wrapper" :style="imageWrapperStyle">
          <img
            :src="image.src"
            :alt="image.alt || `Image ${index + 1}`"
            class="orbit-image"
            :style="imageStyle"
            @load="handleImageLoad(index)"
          />
          <!-- 悬停遮罩 -->
          <div v-if="showOverlay" class="orbit-overlay" :style="overlayStyle">
            <span v-if="image.title" class="orbit-title">{{ image.title }}</span>
            <span v-if="image.description" class="orbit-description">{{ image.description }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 控制按钮 -->
    <div v-if="showControls" class="orbit-controls">
      <button 
        class="orbit-btn orbit-prev" 
        @click="rotate('prev')"
        :disabled="isTransitioning"
      >
        ‹
      </button>
      <button 
        class="orbit-btn orbit-next" 
        @click="rotate('next')"
        :disabled="isTransitioning"
      >
        ›
      </button>
    </div>

    <!-- 指示器 -->
    <div v-if="showIndicators" class="orbit-indicators">
      <button
        v-for="(_, index) in images"
        :key="index"
        class="orbit-indicator"
        :class="{ active: currentIndex === index }"
        @click="goToIndex(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface ImageItem {
  src: string
  alt?: string
  title?: string
  description?: string
}

interface Props {
  images: ImageItem[]
  radius?: number
  imageSize?: number
  duration?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  pauseOnHover?: boolean
  perspective?: number
  tilt?: number
  showControls?: boolean
  showIndicators?: boolean
  showOverlay?: boolean
  direction?: 'clockwise' | 'counter-clockwise'
  startIndex?: number
  gap?: number
}

const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  radius: 300,
  imageSize: 150,
  duration: 0.8,
  autoPlay: true,
  autoPlayInterval: 3000,
  pauseOnHover: true,
  perspective: 1000,
  tilt: 0,
  showControls: true,
  showIndicators: true,
  showOverlay: true,
  direction: 'clockwise',
  startIndex: 0,
  gap: 20
})

const emit = defineEmits<{
  (e: 'click', index: number, image: ImageItem): void
  (e: 'change', index: number): void
}>()

// 状态
const currentIndex = ref(props.startIndex)
const isPaused = ref(false)
const isTransitioning = ref(false)
const loadedImages = ref<Set<number>>(new Set())
let autoPlayTimer: ReturnType<typeof setInterval> | null = null

// 计算轨道角度
const angleStep = computed(() => 360 / props.images.length)

// 容器样式
const containerStyle = computed(() => ({
  position: 'relative',
  width: `${props.radius * 2 + props.imageSize}px`,
  height: `${props.radius * 2 + props.imageSize}px`,
  margin: '0 auto',
  perspective: `${props.perspective}px`
}))

// 轨道样式
const trackStyle = computed(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 0,
  height: 0,
  transformStyle: 'preserve-3d',
  transition: `transform ${props.duration}s cubic-bezier(0.4, 0, 0.2, 1)`
}))

// 图片包装器样式
const imageWrapperStyle = computed(() => ({
  width: `${props.imageSize}px`,
  height: `${props.imageSize}px`,
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
  backgroundColor: '#1a1a1a',
  transition: 'all 0.3s ease'
}))

// 图片样式
const imageStyle = computed(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block'
}))

// 遮罩样式
const overlayStyle = computed(() => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '1rem',
  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
  color: 'white',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem'
}))

// 计算每个项目的位置
const getItemStyle = (index: number) => {
  const angle = (index * angleStep.value - currentIndex.value * angleStep.value) * (Math.PI / 180)
  const x = Math.sin(angle) * props.radius
  const z = Math.cos(angle) * props.radius - props.radius
  
  // 计算缩放（远处的变小）
  const scale = (z + props.radius) / (props.radius * 2) * 0.4 + 0.6
  
  // 计算透明度
  const opacity = (z + props.radius) / props.radius * 0.5 + 0.5
  
  const rotateDirection = props.direction === 'clockwise' ? 1 : -1
  
  return {
    position: 'absolute',
    width: `${props.imageSize}px`,
    height: `${props.imageSize}px`,
    left: `-${props.imageSize / 2}px`,
    top: `-${props.imageSize / 2}px`,
    transform: `
      translateX(${x}px) 
      translateZ(${z}px) 
      scale(${scale})
      rotateY(${x * 0.1 * rotateDirection}deg)
      rotateX(${props.tilt}deg)
    `,
    opacity: Math.min(opacity, 1),
    zIndex: Math.round((z + props.radius) * 10),
    transition: `all ${props.duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
    cursor: 'pointer'
  }
}

// 自动播放
const startAutoPlay = () => {
  if (!props.autoPlay || props.images.length <= 1) return
  
  stopAutoPlay()
  autoPlayTimer = setInterval(() => {
    if (!isPaused.value && !isTransitioning.value) {
      rotate('next')
    }
  }, props.autoPlayInterval)
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

// 旋转控制
const rotate = (direction: 'prev' | 'next') => {
  if (isTransitioning.value) return
  
  isTransitioning.value = true
  
  if (direction === 'next') {
    currentIndex.value = (currentIndex.value + 1) % props.images.length
  } else {
    currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
  }
  
  emit('change', currentIndex.value)
  
  setTimeout(() => {
    isTransitioning.value = false
  }, props.duration * 1000)
}

// 跳转到指定索引
const goToIndex = (index: number) => {
  if (index === currentIndex.value || isTransitioning.value) return
  
  isTransitioning.value = true
  currentIndex.value = index
  emit('change', index)
  
  setTimeout(() => {
    isTransitioning.value = false
  }, props.duration * 1000)
}

// 事件处理
const handleMouseEnter = () => {
  if (props.pauseOnHover) {
    isPaused.value = true
  }
}

const handleMouseLeave = () => {
  if (props.pauseOnHover) {
    isPaused.value = false
  }
}

const handleItemClick = (index: number) => {
  emit('click', index, props.images[index])
}

const handleImageLoad = (index: number) => {
  loadedImages.value.add(index)
}

// 键盘控制
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') {
    rotate('prev')
  } else if (e.key === 'ArrowRight') {
    rotate('next')
  }
}

onMounted(() => {
  startAutoPlay()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  stopAutoPlay()
  window.removeEventListener('keydown', handleKeydown)
})

// 监听属性变化
watch(() => props.autoPlay, (newVal) => {
  if (newVal) {
    startAutoPlay()
  } else {
    stopAutoPlay()
  }
})

watch(() => props.images.length, () => {
  currentIndex.value = 0
  startAutoPlay()
})
</script>

<style scoped>
.orbit-container {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.orbit-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  text-align: center;
}

.orbit-track {
  will-change: transform;
}

.orbit-item {
  will-change: transform, opacity;
}

.orbit-item:hover .orbit-image-wrapper {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  transform: scale(1.05);
}

.orbit-item:hover .orbit-overlay {
  opacity: 1 !important;
}

.orbit-image-wrapper {
  position: relative;
}

.orbit-image {
  pointer-events: none;
}

/* 控制按钮 */
.orbit-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 200;
}

.orbit-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 24px;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.orbit-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.1);
}

.orbit-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* 指示器 */
.orbit-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 200;
}

.orbit-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.orbit-indicator.active {
  background: white;
  transform: scale(1.3);
}

.orbit-indicator:hover {
  background: rgba(255, 255, 255, 0.6);
}

/* 文字样式 */
.orbit-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
}

.orbit-description {
  font-size: 0.75rem;
  opacity: 0.8;
  margin: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .orbit-container {
    transform: scale(0.7);
  }
  
  .orbit-btn {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
}
</style>