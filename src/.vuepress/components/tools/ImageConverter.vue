<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

type Format = "image/png" | "image/jpeg" | "image/jpg" | "image/webp" | "image/bmp";
const supported = new Set(["image/png", "image/jpeg", "image/webp", "image/bmp"]);
const file = ref<File>();
const sourceUrl = ref("");
const outputUrl = ref("");
const outputSize = ref(0);
const format = ref<Format>("image/jpg");
const quality = ref(90);
const busy = ref(false);
const error = ref("");

const extension = computed(() => ({ "image/png": "png", "image/jpeg": "jpeg", "image/jpg": "jpg", "image/webp": "webp", "image/bmp": "bmp" })[format.value]);
const outputMime = computed(() => format.value === "image/jpg" ? "image/jpeg" : format.value);
const qualityEnabled = computed(() => outputMime.value === "image/jpeg" || outputMime.value === "image/webp");
const downloadName = computed(() => `${file.value?.name.replace(/\.[^.]+$/u, "") || "converted"}.${extension.value}`);
const sizeText = (size: number): string => size < 1024 ** 2 ? `${(size / 1024).toFixed(1)} KB` : `${(size / 1024 ** 2).toFixed(2)} MB`;
const revoke = (url: string): void => { if (url) URL.revokeObjectURL(url); };

const useFile = (next?: File): void => {
  error.value = "";
  if (!next) return;
  if (!supported.has(next.type)) {
    error.value = "仅支持 JPEG/JPG、PNG、BMP 和 WebP 图片，不支持 PDF、Word 等文件。";
    return;
  }
  revoke(sourceUrl.value);
  revoke(outputUrl.value);
  file.value = next;
  sourceUrl.value = URL.createObjectURL(next);
  outputUrl.value = "";
  outputSize.value = 0;
};

const loadImage = (url: string): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = reject;
  image.src = url;
});

const encodeBmp = (imageData: ImageData): Blob => {
  const { width, height, data } = imageData;
  const rowSize = Math.ceil(width * 3 / 4) * 4;
  const pixelSize = rowSize * height;
  const buffer = new ArrayBuffer(54 + pixelSize);
  const view = new DataView(buffer);
  view.setUint16(0, 0x4d42, true);
  view.setUint32(2, buffer.byteLength, true);
  view.setUint32(10, 54, true);
  view.setUint32(14, 40, true);
  view.setInt32(18, width, true);
  view.setInt32(22, height, true);
  view.setUint16(26, 1, true);
  view.setUint16(28, 24, true);
  view.setUint32(34, pixelSize, true);
  for (let y = 0; y < height; y += 1) {
    const sourceRow = height - 1 - y;
    for (let x = 0; x < width; x += 1) {
      const source = (sourceRow * width + x) * 4;
      const target = 54 + y * rowSize + x * 3;
      view.setUint8(target, data[source + 2]);
      view.setUint8(target + 1, data[source + 1]);
      view.setUint8(target + 2, data[source]);
    }
  }
  return new Blob([buffer], { type: "image/bmp" });
};

const convert = async (): Promise<void> => {
  if (!sourceUrl.value) return;
  busy.value = true;
  error.value = "";
  try {
    const image = await loadImage(sourceUrl.value);
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d");
    if (!context) throw new Error();
    if (outputMime.value === "image/jpeg" || outputMime.value === "image/bmp") {
      context.fillStyle = "#fff";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.drawImage(image, 0, 0);
    const blob = outputMime.value === "image/bmp"
      ? encodeBmp(context.getImageData(0, 0, canvas.width, canvas.height))
      : await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, outputMime.value, quality.value / 100));
    if (!blob) throw new Error();
    revoke(outputUrl.value);
    outputUrl.value = URL.createObjectURL(blob);
    outputSize.value = blob.size;
  } catch {
    error.value = "图片转换失败，请确认图片文件没有损坏。";
  } finally {
    busy.value = false;
  }
};

const clear = (): void => {
  revoke(sourceUrl.value);
  revoke(outputUrl.value);
  file.value = undefined;
  sourceUrl.value = outputUrl.value = error.value = "";
  outputSize.value = 0;
};
onBeforeUnmount(clear);
</script>

<template>
  <section class="image-tool">
    <header><div><small>LOCAL IMAGE CONVERTER</small><h2>图片格式转换</h2><p>图片只在当前浏览器处理，不会上传服务器。</p></div><span>仅支持图片</span></header>
    <label class="drop" @dragover.prevent @drop.prevent="useFile($event.dataTransfer?.files[0])">
      <input type="file" accept="image/jpeg,image/png,image/bmp,image/webp,.jpg,.jpeg,.png,.bmp,.webp" @change="useFile(($event.target as HTMLInputElement).files?.[0])">
      <i>＋</i><b>{{ file ? "重新选择图片" : "点击选择或拖拽图片到这里" }}</b><small>支持 JPEG/JPG、PNG、BMP、WebP</small>
    </label>
    <div v-if="file" class="workspace">
      <figure><b>原始图片</b><img :src="sourceUrl" alt="原始图片预览"><figcaption>{{ file.name }} · {{ sizeText(file.size) }}</figcaption></figure>
      <div class="settings">
        <label>输出格式<select v-model="format"><option value="image/jpg">JPG</option><option value="image/jpeg">JPEG</option><option value="image/png">PNG</option><option value="image/bmp">BMP</option><option value="image/webp">WebP</option></select></label>
        <label :class="{ muted: !qualityEnabled }">图片质量：{{ quality }}%<input v-model="quality" type="range" min="10" max="100" step="5" :disabled="!qualityEnabled"></label>
        <p>JPG 下载为 .jpg，JPEG 下载为 .jpeg；透明图片转换为 JPG、JPEG 或 BMP 时自动使用白色背景。</p>
        <button class="primary" type="button" :disabled="busy" @click="convert">{{ busy ? "正在转换…" : "开始转换" }}</button>
        <button type="button" @click="clear">清空图片</button>
      </div>
      <figure><b>转换结果</b><img v-if="outputUrl" :src="outputUrl" alt="转换结果预览"><div v-else class="placeholder">等待转换</div><figcaption v-if="outputUrl">{{ downloadName }} · {{ sizeText(outputSize) }}</figcaption><a v-if="outputUrl" :href="outputUrl" :download="downloadName">下载图片</a></figure>
    </div>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
  </section>
</template>

<style scoped lang="scss">
.image-tool{margin:1rem 0 2rem;padding:clamp(1rem,3vw,1.7rem);background:linear-gradient(145deg,color-mix(in srgb,var(--vp-c-accent) 7%,var(--vp-c-bg)),var(--vp-c-bg) 45%);border:1px solid var(--vp-c-border);border-radius:18px;box-shadow:0 12px 36px rgba(30,65,90,.08)}
header{display:flex;justify-content:space-between;gap:1rem;margin-bottom:1.2rem}header small{color:var(--vp-c-accent);font-size:.67rem;font-weight:700;letter-spacing:.15em}header h2{margin:.2rem 0;padding:0;border:0;font-size:clamp(1.35rem,3vw,1.85rem)}header p{margin:0;color:var(--vp-c-text-mute);font-size:.82rem}header>span{align-self:flex-start;padding:.4rem .65rem;color:var(--vp-c-accent);font-size:.72rem;background:color-mix(in srgb,var(--vp-c-accent) 10%,transparent);border-radius:999px}
.drop{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:150px;text-align:center;cursor:pointer;background:var(--vp-c-bg-alt);border:2px dashed var(--vp-c-border);border-radius:14px}.drop:hover{border-color:var(--vp-c-accent)}.drop input{position:absolute;width:1px;height:1px;opacity:0}.drop i{display:grid;place-items:center;width:38px;height:38px;margin-bottom:.5rem;color:#fff;font-size:1.5rem;font-style:normal;background:var(--vp-c-accent);border-radius:50%}.drop small,figcaption{color:var(--vp-c-text-mute);font-size:.7rem}
.workspace{display:grid;grid-template-columns:minmax(0,1fr) 210px minmax(0,1fr);gap:1rem;margin-top:1rem}figure{display:flex;flex-direction:column;gap:.45rem;min-width:0;margin:0;font-size:.8rem}figure img,.placeholder{box-sizing:border-box;width:100%;height:260px;margin:0;object-fit:contain;background:repeating-conic-gradient(#eee 0 25%,#fff 0 50%) 0/18px 18px;border:1px solid var(--vp-c-border);border-radius:12px}.placeholder{display:grid;place-items:center;color:var(--vp-c-text-mute)}figcaption{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.settings{display:flex;flex-direction:column;gap:.8rem;padding-top:1.65rem}.settings label{display:flex;flex-direction:column;gap:.3rem;font-size:.76rem;font-weight:600}.settings p{margin:0;color:var(--vp-c-text-mute);font-size:.68rem}.muted{opacity:.5}select{padding:.48rem;color:var(--vp-c-text);background:var(--vp-c-bg);border:1px solid var(--vp-c-border);border-radius:8px}button,figure a{padding:.55rem .7rem;color:var(--vp-c-text);font:inherit;font-size:.76rem;font-weight:600;text-align:center;text-decoration:none;cursor:pointer;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:8px}.primary,figure a{color:#fff;background:var(--vp-c-accent);border-color:var(--vp-c-accent)}.error{padding:.55rem .75rem;color:#d33;font-size:.8rem;background:rgba(220,50,50,.08);border-radius:8px}
@media(max-width:850px){.workspace{grid-template-columns:1fr 1fr}.settings{grid-column:1/-1;grid-row:2;padding-top:0}}@media(max-width:540px){.workspace{grid-template-columns:1fr}.settings{grid-column:auto;grid-row:auto}figure img,.placeholder{height:200px}header>span{display:none}}
</style>
