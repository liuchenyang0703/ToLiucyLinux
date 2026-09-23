<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

const encoded = ref("");
const decodeInput = ref<HTMLTextAreaElement | null>(null);
const hasDecodeInput = ref(false);
const decoding = ref(false);
const resultUrl = ref("");
const sourceName = ref("");
const sourceSize = ref(0);
const resultSize = ref(0);
const resultMime = ref("");
const resultTimestamp = ref("");
const error = ref("");
const copied = ref(false);
const activePanel = ref<"encode" | "decode">("encode");
const encodeFormat = ref<"data-url" | "base64">("data-url");
const allowed = new Set(["image/jpeg", "image/png", "image/bmp", "image/webp"]);
const extensions: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/bmp": "bmp", "image/webp": "webp" };
const encodedOutput = computed(() => encodeFormat.value === "data-url" ? encoded.value : encoded.value.split(",", 2)[1] || "");
const encodedSize = computed(() => new Blob([encodedOutput.value]).size);
const sizeText = (size: number) => size < 1024 ** 2 ? `${(size / 1024).toFixed(1)} KB` : `${(size / 1024 ** 2).toFixed(2)} MB`;
const revoke = (url: string) => { if (url) URL.revokeObjectURL(url); };

const encode = (file?: File) => {
  if (!file) return;
  error.value = "";
  if (!allowed.has(file.type)) { error.value = "仅支持 JPG、JPEG、PNG、BMP 和 WebP 图片。"; return; }
  const reader = new FileReader();
  reader.onload = () => {
    encoded.value = String(reader.result || ""); sourceName.value = file.name; sourceSize.value = file.size;
  };
  reader.onerror = () => { error.value = "图片读取失败，请重新选择。"; };
  reader.readAsDataURL(file);
};

const copy = async () => {
  try { await navigator.clipboard.writeText(encodedOutput.value); copied.value = true; window.setTimeout(() => copied.value = false, 1500); }
  catch { error.value = "复制失败，请手动复制。"; }
};

const decodeInWorker = (value: string) => new Promise<{ buffer: ArrayBuffer; mime: string }>((resolve, reject) => {
  const workerSource = `
    self.onmessage = ({ data: value }) => {
      try {
        let payload = value.trim();
        let declaredMime = "";
        if (payload.startsWith("data:")) {
          const commaIndex = payload.indexOf(",");
          const match = payload.slice(0, commaIndex).match(/^data:(image\\/(?:jpeg|png|bmp|webp));base64$/i);
          if (!match) throw new Error("请输入支持的图片 Data URL。");
          declaredMime = match[1].toLowerCase();
          payload = payload.slice(commaIndex + 1);
        }
        if (/\\s/.test(payload)) payload = payload.replace(/\\s+/g, "");
        if (!payload || payload.length % 4 === 1 || !/^[A-Za-z0-9+/]*={0,2}$/.test(payload)) {
          throw new Error("Base64 编码格式不正确。");
        }

        const binary = atob(payload);
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);

        let mime = "";
        if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) mime = "image/jpeg";
        else if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) mime = "image/png";
        else if (bytes[0] === 0x42 && bytes[1] === 0x4d) mime = "image/bmp";
        else if (String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP") mime = "image/webp";
        else throw new Error("无法识别图片格式，仅支持 JPG、PNG、BMP 和 WebP。");

        if (declaredMime && declaredMime !== mime) throw new Error("Data URL 中的图片类型与实际内容不一致。");
        self.postMessage({ buffer: bytes.buffer, mime }, [bytes.buffer]);
      } catch (error) {
        self.postMessage({ error: error instanceof Error ? error.message : "Base64 解码失败。" });
      }
    };
  `;
  const workerUrl = URL.createObjectURL(new Blob([workerSource], { type: "text/javascript" }));
  const worker = new Worker(workerUrl);
  const cleanup = () => { worker.terminate(); URL.revokeObjectURL(workerUrl); };
  worker.onmessage = ({ data }: MessageEvent<{ buffer?: ArrayBuffer; mime?: string; error?: string }>) => {
    cleanup();
    if (data.error || !data.buffer || !data.mime) reject(new Error(data.error || "Base64 解码失败。"));
    else resolve({ buffer: data.buffer, mime: data.mime });
  };
  worker.onerror = () => { cleanup(); reject(new Error("Base64 解码失败。")); };
  worker.postMessage(value);
});

const decode = async () => {
  error.value = "";
  decoding.value = true;
  try {
    const value = decodeInput.value?.value || "";
    if (!value) throw new Error("请输入 Base64 内容。");

    // 先更新按钮状态，再由 Worker 在后台完成大文本校验和解码。
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    const { buffer, mime } = await decodeInWorker(value);
    const blob = new Blob([buffer], { type: mime });
    revoke(resultUrl.value); resultUrl.value = URL.createObjectURL(blob); resultSize.value = blob.size; resultMime.value = mime; resultTimestamp.value = String(Date.now());
  } catch (exception) {
    error.value = exception instanceof Error ? exception.message : "Base64 内容无效，或不是支持的图片格式。";
  } finally {
    decoding.value = false;
  }
};
const clearEncode = () => { encoded.value = sourceName.value = ""; sourceSize.value = 0; };
const clearDecode = () => { revoke(resultUrl.value); resultUrl.value = resultMime.value = resultTimestamp.value = ""; resultSize.value = 0; hasDecodeInput.value = false; if (decodeInput.value) decodeInput.value.value = ""; };
onBeforeUnmount(() => revoke(resultUrl.value));
</script>

<template>
  <section class="tool"><header><div><small>LOCAL IMAGE BASE64 TOOL</small><h2>图片 Base64 编解码</h2><p>所有操作都在浏览器本地完成，图片不会上传服务器。</p></div><span>JPG · JPEG · PNG · BMP · WebP</span></header>
    <nav class="tool-tabs" role="tablist" aria-label="转换类型"><button type="button" role="tab" :aria-selected="activePanel === 'encode'" :class="{ active: activePanel === 'encode' }" @click="activePanel = 'encode'; error = ''">图片转 Base64</button><button type="button" role="tab" :aria-selected="activePanel === 'decode'" :class="{ active: activePanel === 'decode' }" @click="activePanel = 'decode'; error = ''">Base64 转图片</button></nav>
    <div class="panels"><article v-show="activePanel === 'encode'" role="tabpanel"><h3>图片转 Base64</h3><fieldset class="format-options"><legend>输出格式</legend><label :class="{ selected: encodeFormat === 'data-url' }"><input v-model="encodeFormat" type="radio" value="data-url">完整 Data URL</label><label :class="{ selected: encodeFormat === 'base64' }"><input v-model="encodeFormat" type="radio" value="base64">纯 Base64 字符串</label></fieldset><p class="format-rule">{{ encodeFormat === "data-url" ? "包含 data:image/…;base64, 前缀，可直接用于图片地址。" : "仅输出 Base64 编码正文，不包含格式和 MIME 类型前缀。" }}</p><label class="drop" @dragover.prevent @drop.prevent="encode($event.dataTransfer?.files[0])"><input type="file" accept="image/jpeg,image/png,image/bmp,image/webp,.jpg,.jpeg,.png,.bmp,.webp" @change="encode(($event.target as HTMLInputElement).files?.[0])"><b>{{ sourceName || "选择或拖拽图片" }}</b><small>支持 JPG、JPEG、PNG、BMP、WebP</small></label><textarea v-if="encoded" :value="encodedOutput" readonly aria-label="Base64 编码结果"/><p v-if="encoded" class="meta">原图 {{ sizeText(sourceSize) }} · 输出 {{ sizeText(encodedSize) }}</p><div class="actions"><button class="primary" :disabled="!encoded" @click="copy">{{ copied ? "已复制" : "复制 Base64" }}</button><button @click="clearEncode">清空</button></div></article>
      <article v-show="activePanel === 'decode'" role="tabpanel"><h3>Base64 转图片</h3><p class="format-rule">自动识别完整 Data URL 或纯 Base64 字符串，以及对应的图片格式。</p><textarea ref="decodeInput" placeholder="粘贴 Data URL 或纯 Base64 内容…" aria-label="待解码 Base64 内容" spellcheck="false" autocomplete="off" autocapitalize="off" @input="hasDecodeInput = Boolean(($event.target as HTMLTextAreaElement).value)"/><div class="actions"><button class="primary" :disabled="!hasDecodeInput || decoding" @click="decode">{{ decoding ? "正在解码…" : "解码图片" }}</button><button :disabled="decoding" @click="clearDecode">清空</button></div><img v-if="resultUrl" :src="resultUrl" alt="解码结果预览"><p v-if="resultUrl" class="meta">{{ resultMime }} · {{ sizeText(resultSize) }}</p><a v-if="resultUrl" :href="resultUrl" :download="`base64-image-${resultTimestamp}.${extensions[resultMime] || 'png'}`">下载图片</a></article></div><p v-if="error" class="error">{{ error }}</p>
  </section>
</template>

<style scoped lang="scss">
.tool{margin:1rem 0 2rem;padding:clamp(1rem,3vw,1.7rem);background:linear-gradient(145deg,color-mix(in srgb,var(--vp-c-accent) 7%,var(--vp-c-bg)),var(--vp-c-bg) 45%);border:1px solid var(--vp-c-border);border-radius:18px;box-shadow:0 12px 36px rgba(30,65,90,.08)}header{display:flex;justify-content:space-between;gap:1rem;margin-bottom:1.2rem}header small{color:var(--vp-c-accent);font-size:.67rem;font-weight:700;letter-spacing:.15em}header h2{margin:.2rem 0;padding:0;border:0;font-size:clamp(1.35rem,3vw,1.85rem)}header p{margin:0;color:var(--vp-c-text-mute);font-size:.82rem}header>span{align-self:flex-start;padding:.4rem .65rem;color:var(--vp-c-accent);font-size:.68rem;background:color-mix(in srgb,var(--vp-c-accent) 10%,transparent);border-radius:999px}.tool-tabs{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1rem;padding:.35rem;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:12px}.tool-tabs button{padding:.7rem 1rem;font-size:.85rem;border-color:transparent}.tool-tabs button.active{color:#fff;background:var(--vp-c-accent);border-color:var(--vp-c-accent)}.panels{display:block}article{display:flex;flex-direction:column;gap:.7rem;min-width:0;padding:1rem;background:var(--vp-c-bg);border:1px solid var(--vp-c-border);border-radius:14px}h3{margin:0;padding:0;border:0;font-size:1rem}.format-options{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;margin:0;padding:.7rem;background:color-mix(in srgb,var(--vp-c-accent) 7%,var(--vp-c-bg));border:1px solid var(--vp-c-border);border-radius:10px}.format-options legend{padding:0 .3rem;color:var(--vp-c-text-mute);font-size:.75rem}.format-options label{display:flex;align-items:center;justify-content:center;gap:.5rem;min-height:44px;padding:.25rem .5rem;color:var(--vp-c-text);font-size:.95rem;font-weight:600;cursor:pointer;background:var(--vp-c-bg);border:1px solid var(--vp-c-border);border-radius:8px}.format-options label.selected{color:var(--vp-c-accent);border-color:var(--vp-c-accent)}.format-options input{width:1rem;height:1rem;accent-color:var(--vp-c-accent)}.format-rule{margin:-.25rem 0 0;color:var(--vp-c-text-mute);font-size:.72rem}.drop{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:130px;text-align:center;cursor:pointer;background:var(--vp-c-bg-alt);border:2px dashed var(--vp-c-border);border-radius:10px}.drop:hover{border-color:var(--vp-c-accent)}.drop input{position:absolute;width:1px;height:1px;opacity:0}.drop small,.meta{margin:0;color:var(--vp-c-text-mute);font-size:.68rem}article>img{box-sizing:border-box;width:100%;height:260px;margin:0;object-fit:contain;background:repeating-conic-gradient(#eee 0 25%,#fff 0 50%) 0/18px 18px;border:1px solid var(--vp-c-border);border-radius:10px}textarea{box-sizing:border-box;width:100%;min-height:280px;padding:.7rem;resize:vertical;overflow-wrap:anywhere;white-space:pre-wrap;color:var(--vp-c-text);font:12px/1.55 monospace;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:10px}.actions{display:flex;gap:.55rem}button,article>a{padding:.55rem .75rem;color:var(--vp-c-text);font:inherit;font-size:.76rem;font-weight:600;text-align:center;text-decoration:none;cursor:pointer;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:8px}.primary,article>a{color:#fff;background:var(--vp-c-accent);border-color:var(--vp-c-accent)}button:disabled{cursor:not-allowed;opacity:.5}.error{padding:.55rem .75rem;color:#d33;font-size:.8rem;background:rgba(220,50,50,.08);border-radius:8px}@media(max-width:760px){header>span{display:none}}
</style>
