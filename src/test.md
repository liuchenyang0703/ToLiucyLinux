---
title: 测试页面
sidebar: false
---

## 一、电流边框测试
> 源数据来源于：[https://reactbits.dev/animations/electric-border](https://reactbits.dev/animations/electric-border)

<div style="padding: 2rem; display: flex; flex-direction: column; gap: 2rem; align-items: center;">

<!-- 基础用法 -->
<ElectricBorder text="基础电流边框">
  <h2 style="margin: 0; color: #00d4ff;">Electric Card</h2>
  <p>这是一个带有电流边框效果的卡片组件。</p>
</ElectricBorder>

<!-- 自定义颜色和强度 -->
<ElectricBorder 
  color="#ff006e"
  :intensity="50"
  :borderWidth="3"
  :glowIntensity="4"
  backgroundColor="rgba(255, 0, 110, 0.1)"
  width="300px"
>
  <h3 style="margin: 0 0 1rem 0; color: #ff006e;">高强度电流</h3>
  <p style="margin: 0;">更高的强度和更粗的边框，更明显的电流效果。</p>
</ElectricBorder>

<!-- 快速脉冲效果 -->
<ElectricBorder 
  color="#39ff14"
  :duration="1"
  :baseFrequency="0.02"
  :intensity="40"
  :borderRadius="16"
  width="350px"
>
  <div style="text-align: center;">
    <h3 style="margin: 0 0 0.5rem 0; color: #39ff14;">快速脉冲</h3>
    <code>duration: 1s</code>
    <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">更快的动画频率，像电路脉冲一样。</p>
  </div>
</ElectricBorder>

<!-- 无发光效果 -->
<ElectricBorder 
  color="#ffd700"
  :glow="false"
  :borderWidth="2"
  :intensity="20"
  backgroundColor="rgba(255, 215, 0, 0.05)"
  width="280px"
>
  <h3 style="margin: 0; color: #ffd700;">纯净线条</h3>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">关闭发光效果，只有电流扭曲。</p>
</ElectricBorder>

<!-- 大圆角卡片 -->
<ElectricBorder 
  color="#a855f7"
  :borderRadius="24"
  :borderWidth="2"
  :intensity="35"
  :glowIntensity="3"
  backgroundColor="rgba(168, 85, 247, 0.1)"
  width="400px"
  padding="2rem"
>
  <div style="display: flex; align-items: center; gap: 1rem;">
    <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #a855f7, #6366f1); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
      ⚡
    </div>
    <div>
      <h3 style="margin: 0; color: #a855f7;">紫色电弧</h3>
      <p style="margin: 0.25rem 0 0 0; color: #a855f7; opacity: 0.8;">大圆角设计，现代感更强</p>
    </div>
  </div>
</ElectricBorder>

</div>

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `string` | `'#00d4ff'` | 边框颜色 |
| `borderWidth` | `number` | `2` | 边框粗细(px) |
| `borderRadius` | `number` | `8` | 圆角大小(px) |
| `backgroundColor` | `string` | `'transparent'` | 内容区域背景色 |
| `intensity` | `number` | `30` | 电流扭曲强度 |
| `baseFrequency` | `number` | `0.01` | 噪声基础频率 |
| `duration` | `number` | `3` | 动画周期(秒) |
| `glow` | `boolean` | `true` | 是否启用发光效果 |
| `glowIntensity` | `number` | `2` | 发光强度 |
| `glowColor` | `string` | `'currentColor'` | 发光颜色 |
| `width` | `string` | `'auto'` | 容器宽度 |
| `height` | `string` | `'auto'` | 容器高度 |
| `padding` | `string` | `'1.5rem'` | 内容区域内边距 |
| `hoverEffect` | `boolean` | `true` | 是否启用悬停放大效果 |
| `hoverScale` | `number` | `1.02` | 悬停放大比例 |


## 二、轨道图片测试
> 源数据来源于：[https://reactbits.dev/animations/orbit-images](https://reactbits.dev/animations/orbit-images)

<div style="padding: 4rem 0; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); min-height: 100vh;">

<!-- 基础用法 -->
<OrbitImages 
  :images="[
    { src: 'https://picsum.photos/400/400?random=1', title: '图片 1', description: '描述文字' },
    { src: 'https://picsum.photos/400/400?random=2', title: '图片 2', description: '描述文字' },
    { src: 'https://picsum.photos/400/400?random=3', title: '图片 3', description: '描述文字' },
    { src: 'https://picsum.photos/400/400?random=4', title: '图片 4', description: '描述文字' },
    { src: 'https://picsum.photos/400/400?random=5', title: '图片 5', description: '描述文字' },
    { src: 'https://picsum.photos/400/400?random=6', title: '图片 6', description: '描述文字' }
  ]"
  :radius="280"
  :imageSize="140"
  :autoPlayInterval="4000"
/>

<!-- 带中心内容的配置 -->
<OrbitImages 
  :images="[
    { src: 'https://picsum.photos/300/300?random=10', alt: 'Tech' },
    { src: 'https://picsum.photos/300/300?random=11', alt: 'Design' },
    { src: 'https://picsum.photos/300/300?random=12', alt: 'Code' },
    { src: 'https://picsum.photos/300/300?random=13', alt: 'Cloud' },
    { src: 'https://picsum.photos/300/300?random=14', alt: 'AI' }
  ]"
  :radius="220"
  :imageSize="100"
  :perspective="1200"
  :tilt="-10"
  direction="counter-clockwise"
  :showIndicators="false"
>
  <template #center>
    <div style="color: white; text-align: center;">
      <h2 style="margin: 0; font-size: 2rem; background: linear-gradient(90deg, #00d4ff, #7b2cbf); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">技术栈</h2>
      <p style="margin: 0.5rem 0 0 0; opacity: 0.7; font-size: 0.9rem;">环绕展示</p>
    </div>
  </template>
</OrbitImages>

<!-- 大尺寸展示 -->
<OrbitImages 
  :images="[
    { src: 'https://picsum.photos/500/500?random=20', title: '项目 A' },
    { src: 'https://picsum.photos/500/500?random=21', title: '项目 B' },
    { src: 'https://picsum.photos/500/500?random=22', title: '项目 C' },
    { src: 'https://picsum.photos/500/500?random=23', title: '项目 D' }
  ]"
  :radius="350"
  :imageSize="180"
  :duration="1"
  :perspective="800"
  :showControls="true"
  :showOverlay="true"
  style="margin: 3rem 0;"
/>

</div>

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `images` | `ImageItem[]` | `[]` | 图片数组，每项包含 src/alt/title/description |
| `radius` | `number` | `300` | 轨道半径(px) |
| `imageSize` | `number` | `150` | 图片尺寸(px) |
| `duration` | `number` | `0.8` | 过渡动画时间(秒) |
| `autoPlay` | `boolean` | `true` | 是否自动播放 |
| `autoPlayInterval` | `number` | `3000` | 自动播放间隔(ms) |
| `pauseOnHover` | `boolean` | `true` | 悬停时暂停 |
| `perspective` | `number` | `1000` | 3D 透视距离 |
| `tilt` | `number` | `0` | 轨道倾斜角度 |
| `showControls` | `boolean` | `true` | 显示左右控制按钮 |
| `showIndicators` | `boolean` | `true` | 显示底部指示器 |
| `showOverlay` | `boolean` | `true` | 显示悬停遮罩信息 |
| `direction` | `'clockwise' \| 'counter-clockwise'` | `'clockwise'` | 旋转方向 |
| `startIndex` | `number` | `0` | 起始索引 |

### 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| `click` | `(index, image)` | 点击图片时触发 |
| `change` | `(index)` | 当前索引变化时触发 |

