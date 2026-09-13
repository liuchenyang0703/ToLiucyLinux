<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

const encoded = ref("");
const input = ref("");
const sourceUrl = ref("");
const resultUrl = ref("");
const sourceName = ref("");
const sourceSize = ref(0);
const resultSize = ref(0);
const resultMime = ref("");
const error = ref("");
const copied = ref(false);
const allowed = new Set(["image/jpeg", "image/png", "image/bmp", "image/webp"]);
const extensions: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/bmp": "bmp", "image/webp": "webp" };
const encodedSize = computed(() => new Blob([encoded.value]).size);
const sizeText = (size: number) => size < 1024 ** 2 ? `${(size / 1024).toFixed(1)} KB` : `${(size / 1024 ** 2).toFixed(2)} MB`;
const revoke = (url: string) => { if (url) URL.revokeObjectURL(url); };

const encode = (file?: File) => {
  if (!file) return;
  error.value = "";
  if (!allowed.has(file.type)) { error.value = "仅支持 JPG、JPEG、PNG、BMP 和 WebP 图片。"; return; }
  const reader = new FileReader();
  reader.onload = () => {
    revoke(sourceUrl.value); sourceUrl.value = URL.createObjectURL(file);
    encoded.value = String(reader.result || ""); sourceName.value = file.name; sourceSize.value = file.size;
  };
  reader.onerror = () => { error.value = "图片读取失败，请重新选择。"; };
  reader.readAsDataURL(file);
};

const copy = async () => {
  try { await navigator.clipboard.writeText(encoded.value); copied.value = true; window.setTimeout(() => copied.value = false, 1500); }
  catch { error.value = "复制失败，请手动复制。"; }
};

const decode = () => {
  error.value = "";
  try {
    const value = input.value.trim().replace(/\s+/gu, "");
    const match = value.match(/^data:(image\/(?:jpeg|png|bmp|webp));base64,(.+)$/iu);
    const mime = match?.[1].toLowerCase() || "image/png";
    if (!allowed.has(mime)) throw new Error();
    const binary = atob(match?.[2] || value);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const blob = new Blob([bytes], { type: mime });
    revoke(resultUrl.value); resultUrl.value = URL.createObjectURL(blob); resultSize.value = blob.size; resultMime.value = mime;
  } catch { error.value = "Base64 内容无效，或不是支持的图片格式。"; }
};
const clearEncode = () => { revoke(sourceUrl.value); sourceUrl.value = encoded.value = sourceName.value = ""; sourceSize.value = 0; };
const clearDecode = () => { revoke(resultUrl.value); resultUrl.value = input.value = resultMime.value = ""; resultSize.value = 0; };
onBeforeUnmount(() => { revoke(sourceUrl.value); revoke(resultUrl.value); });
</script>

<template>
  <section class="tool"><header><div><small>LOCAL IMAGE BASE64 TOOL</small><h2>图片 Base64 编解码</h2><p>所有操作都在浏览器本地完成，图片不会上传服务器。</p></div><span>JPG · JPEG · PNG · BMP · WebP</span></header>
    <div class="panels"><article><h3>图片转 Base64</h3><label class="drop" @dragover.prevent @drop.prevent="encode($event.dataTransfer?.files[0])"><input type="file" accept="image/jpeg,image/png,image/bmp,image/webp,.jpg,.jpeg,.png,.bmp,.webp" @change="encode(($event.target as HTMLInputElement).files?.[0])"><b>{{ sourceName || "选择或拖拽图片" }}</b><small>支持 JPG、JPEG、PNG、BMP、WebP</small></label><img v-if="sourceUrl" :src="sourceUrl" alt="原图预览"><textarea v-if="encoded" v-model="encoded" readonly aria-label="Base64 编码结果"/><p v-if="encoded" class="meta">原图 {{ sizeText(sourceSize) }} · Base64 {{ sizeText(encodedSize) }}</p><div class="actions"><button class="primary" :disabled="!encoded" @click="copy">{{ copied ? "已复制" : "复制 Base64" }}</button><button @click="clearEncode">清空</button></div></article>
      <article><h3>Base64 转图片</h3><textarea v-model="input" placeholder="粘贴 Data URL 或纯 Base64 内容…" aria-label="待解码 Base64 内容"/><div class="actions"><button class="primary" :disabled="!input.trim()" @click="decode">解码图片</button><button @click="clearDecode">清空</button></div><img v-if="resultUrl" :src="resultUrl" alt="解码结果预览"><p v-if="resultUrl" class="meta">{{ resultMime }} · {{ sizeText(resultSize) }}</p><a v-if="resultUrl" :href="resultUrl" :download="`base64-image.${extensions[resultMime] || 'png'}`">下载图片</a></article></div><p v-if="error" class="error">{{ error }}</p>
  </section>
</template>

<style scoped lang="scss">
.tool{margin:1rem 0 2rem;padding:clamp(1rem,3vw,1.7rem);background:linear-gradient(145deg,color-mix(in srgb,var(--vp-c-accent) 7%,var(--vp-c-bg)),var(--vp-c-bg) 45%);border:1px solid var(--vp-c-border);border-radius:18px;box-shadow:0 12px 36px rgba(30,65,90,.08)}header{display:flex;justify-content:space-between;gap:1rem;margin-bottom:1.2rem}header small{color:var(--vp-c-accent);font-size:.67rem;font-weight:700;letter-spacing:.15em}header h2{margin:.2rem 0;padding:0;border:0;font-size:clamp(1.35rem,3vw,1.85rem)}header p{margin:0;color:var(--vp-c-text-mute);font-size:.82rem}header>span{align-self:flex-start;padding:.4rem .65rem;color:var(--vp-c-accent);font-size:.68rem;background:color-mix(in srgb,var(--vp-c-accent) 10%,transparent);border-radius:999px}.panels{display:grid;grid-template-columns:1fr 1fr;gap:1rem}article{display:flex;flex-direction:column;gap:.7rem;min-width:0;padding:1rem;background:var(--vp-c-bg);border:1px solid var(--vp-c-border);border-radius:14px}h3{margin:0;padding:0;border:0;font-size:1rem}.drop{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:95px;text-align:center;cursor:pointer;background:var(--vp-c-bg-alt);border:2px dashed var(--vp-c-border);border-radius:10px}.drop:hover{border-color:var(--vp-c-accent)}.drop input{position:absolute;width:1px;height:1px;opacity:0}.drop small,.meta{margin:0;color:var(--vp-c-text-mute);font-size:.68rem}article>img{box-sizing:border-box;width:100%;height:190px;margin:0;object-fit:contain;background:repeating-conic-gradient(#eee 0 25%,#fff 0 50%) 0/18px 18px;border:1px solid var(--vp-c-border);border-radius:10px}textarea{box-sizing:border-box;width:100%;min-height:210px;padding:.7rem;resize:vertical;color:var(--vp-c-text);font:12px/1.55 monospace;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:10px}.actions{display:flex;gap:.55rem}button,article>a{padding:.55rem .75rem;color:var(--vp-c-text);font:inherit;font-size:.76rem;font-weight:600;text-align:center;text-decoration:none;cursor:pointer;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:8px}.primary,article>a{color:#fff;background:var(--vp-c-accent);border-color:var(--vp-c-accent)}button:disabled{cursor:not-allowed;opacity:.5}.error{padding:.55rem .75rem;color:#d33;font-size:.8rem;background:rgba(220,50,50,.08);border-radius:8px}@media(max-width:760px){.panels{grid-template-columns:1fr}header>span{display:none}}
</style>
