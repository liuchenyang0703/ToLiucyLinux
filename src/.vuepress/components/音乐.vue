<template>
  <ClientOnly>
    <div class="MyMusic">
      <div class="MyMusic_Play" :class="{ hide: !IsShow }">
        <div class="close" @click="HideStatus">
          <MyIcon name="guanbi" />
        </div>

        <!-- 使用 v-show 来控制 iframe 的显示和隐藏 -->
        <div class="iframe-container" v-show="IsShow && playerReady">
          <iframe 
            :src="playerReady ? 'https://music.163.com/outchain/player?type=0&id=441731649&auto=0&height=1000' : ''" 
            frameborder="0" 
            width="100%" 
            height="100%" 
            style="pointer-events: auto; border: none; box-shadow: none;"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            ref="playerIframe">
          </iframe>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const IsShow = ref(false);        // 控制播放器的显示状态
const playerReady = ref(false);   // 控制播放器是否准备好播放
const iframeRef = ref<HTMLIFrameElement | null>(null);  // 引用 iframe 元素

// 控制播放器显示状态的函数
const SwitchStatus = () => {
  IsShow.value = !IsShow.value;
  playerReady.value = true; // 用户点击后，播放器准备播放
  // 在localStorage中存储播放器状态
  localStorage.setItem('playerStatus', 'playing');
};

// 隐藏播放器的函数（不停止播放）
const HideStatus = () => {
  IsShow.value = false; // 隐藏播放器
  // 在localStorage中存储播放器隐藏状态
  localStorage.setItem('playerStatus', 'hidden');
};

// 插入控制按钮
const InsertMenu = () => {
  const navCenterElm = document.querySelector('.vp-navbar-end');
  
  if (!navCenterElm || document.querySelector('#MyMusic_Menu')) return;

  const elm = document.createElement('div');
  elm.id = 'MyMusic_Menu';
  elm.classList.add('nav-item');
  elm.innerHTML = `<div id="MyMusic_icon" class="btnImg"></div>`;
  navCenterElm.appendChild(elm);

  const Menu = document.querySelector('#MyMusic_Menu') as HTMLElement;
  Menu.onclick = (event) => {
    SwitchStatus();
    event.stopPropagation(); // 阻止点击事件向父级传递
  };
};

// 提前加载播放器资源
onMounted(() => {
  InsertMenu();

  // 页面加载时，检查 localStorage 中的状态并恢复播放
  const playerStatus = localStorage.getItem('playerStatus');
  if (playerStatus === 'playing') {
    IsShow.value = true;
    playerReady.value = true;
  } else if (playerStatus === 'hidden') {
    IsShow.value = false;  // 隐藏播放器
    playerReady.value = true;  // 保持播放器准备好
  }

  // 页面可见性变化时，确保播放器继续播放
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      // 页面被隐藏时发送继续播放的消息
      if (iframeRef.value && iframeRef.value.contentWindow) {
        iframeRef.value.contentWindow.postMessage({ action: 'continue' }, '*');
      }
    }
  });
});
</script>

<style lang="scss">
.MyMusic {
  position: fixed;
  right: 0.5rem;
  top: 0.5rem;
  z-index: 10000;  /* 确保悬浮窗的 z-index 足够高 */
  cursor: pointer;
  user-select: none;
  background: none;  /* 去掉整个容器的背景 */
}

.MyMusic_Play {
  background-color: transparent; /* 确保播放器没有背景 */
  position: fixed;
  top: 50%;
  right: 50%;
  z-index: 9999;
  transform: translate(50%, -50%);  /* 垂直水平居中 */
  width: 100%;
  max-width: 320px;  /* 最大宽度限制 */
  height: 56vw;  /* 使用 vw 来适应宽度 */
  max-height: 430px;  /* 最大高度限制 */
  border-radius: 10px;
  overflow: hidden;
  
  /* 去掉阴影 */
  box-shadow: none;
  
  transition: 0.3s ease-out;
  opacity: 1;
  visibility: visible;

  &.hide {
    opacity: 0;
    visibility: hidden;
    transform: scale(0);
  }

  .close {
    position: absolute;
    right: 8px;
    top: 8px;
    cursor: pointer;
    font-size: 18px;
    z-index: 11;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 100px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
}

.iframe-container {
  width: 100%;
  height: 100%;
  position: relative;
  padding-bottom: 56.25%;  /* 16:9 宽高比 */
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;  /* 去掉 iframe 边框 */
    box-shadow: none;  /* 去掉 iframe 阴影 */
  }
}

#MyMusic_Menu {
  top: 1px;
  user-select: none;
  cursor: pointer;
  opacity: 0.7;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--theme-color);
  height: 1.6rem;
  width: 1.6rem;
  
  .btnImg {
    background-image: url('/beijing/playBtn.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
}
</style>