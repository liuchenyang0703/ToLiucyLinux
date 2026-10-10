<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

type DecodeResult = { buffer: ArrayBuffer; mime: string; fileName: string; extension: string };

const encoded = ref("");
const decodeInput = ref<HTMLTextAreaElement | null>(null);
const hasDecodeInput = ref(false);
const decoding = ref(false);
const resultUrl = ref("");
const sourceName = ref("");
const sourceSize = ref(0);
const sourceMime = ref("");
const resultSize = ref(0);
const resultMime = ref("");
const resultFileName = ref("");
const error = ref("");
const copied = ref(false);
const activePanel = ref<"encode" | "decode">("encode");
const encodeFormat = ref<"data-url" | "base64">("data-url");

const mimeByExtension: Record<string, string> = {
  jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", bmp: "image/bmp",
  webp: "image/webp", svg: "image/svg+xml", ico: "image/x-icon", avif: "image/avif",
  tif: "image/tiff", tiff: "image/tiff", heic: "image/heic", heif: "image/heif",
  pdf: "application/pdf", ofd: "application/ofd", txt: "text/plain", csv: "text/csv", json: "application/json",
  xml: "application/xml", html: "text/html", css: "text/css", js: "text/javascript", md: "text/markdown",
  doc: "application/msword", docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel", xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint", pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  zip: "application/zip", rar: "application/vnd.rar", "7z": "application/x-7z-compressed", gz: "application/gzip",
  mp3: "audio/mpeg", wav: "audio/wav", ogg: "audio/ogg", mp4: "video/mp4", webm: "video/webm",
};
const extensionByMime = Object.entries(mimeByExtension).reduce<Record<string, string>>((map, [extension, mime]) => {
  map[mime] ||= extension;
  return map;
}, {});

const sourceExtension = (name: string) => name.toLowerCase().match(/\.([a-z0-9]+)$/)?.[1] || "";
const inferMime = (file: File) => file.type || mimeByExtension[sourceExtension(file.name)] || "application/octet-stream";
const safeFileName = (name: string) => name.replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_").trim() || "base64-file";
const encodeName = (name: string) => encodeURIComponent(name).replace(/'/g, "%27");
const encodedOutput = computed(() => {
  if (!encoded.value) return "";
  if (encodeFormat.value === "base64") return encoded.value.slice(encoded.value.indexOf(",") + 1);
  const commaIndex = encoded.value.indexOf(",");
  const metadata = encoded.value.slice(0, commaIndex).replace(/;base64$/i, `;name=${encodeName(sourceName.value)};base64`);
  return `${metadata}${encoded.value.slice(commaIndex)}`;
});
const encodedSize = computed(() => new Blob([encodedOutput.value]).size);
const isImageResult = computed(() => resultMime.value.startsWith("image/"));
const downloadName = computed(() => resultFileName.value || `base64-file.${extensionByMime[resultMime.value] || "bin"}`);
const sizeText = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 ** 2) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 ** 3) return `${(size / 1024 ** 2).toFixed(2)} MB`;
  return `${(size / 1024 ** 3).toFixed(2)} GB`;
};
const revoke = (url: string) => { if (url) URL.revokeObjectURL(url); };

const encode = (file?: File) => {
  if (!file) return;
  error.value = "";
  copied.value = false;
  const reader = new FileReader();
  reader.onload = () => {
    encoded.value = String(reader.result || "");
    sourceName.value = file.name;
    sourceSize.value = file.size;
    sourceMime.value = inferMime(file);
    if (!file.type && encoded.value.startsWith("data:application/octet-stream")) {
      encoded.value = encoded.value.replace("data:application/octet-stream", `data:${sourceMime.value}`);
    }
  };
  reader.onerror = () => { error.value = "文件读取失败，请重新选择。"; };
  reader.readAsDataURL(file);
};

const copy = async () => {
  try {
    await navigator.clipboard.writeText(encodedOutput.value);
    copied.value = true;
    window.setTimeout(() => copied.value = false, 1500);
  } catch {
    error.value = "复制失败，请手动复制。";
  }
};

const decodeInWorker = (value: string) => new Promise<DecodeResult>((resolve, reject) => {
  const workerSource = String.raw`
    const mimeExtensions = {
      "image/jpeg":"jpg","image/png":"png","image/gif":"gif","image/bmp":"bmp","image/webp":"webp",
      "image/svg+xml":"svg","image/x-icon":"ico","image/avif":"avif","image/tiff":"tiff",
      "image/heic":"heic","image/heif":"heif","application/pdf":"pdf","application/ofd":"ofd",
      "application/zip":"zip","application/vnd.rar":"rar","application/x-7z-compressed":"7z","application/gzip":"gz",
      "application/msword":"doc","application/vnd.ms-excel":"xls","application/vnd.ms-powerpoint":"ppt",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":"docx",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"xlsx",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":"pptx",
      "text/plain":"txt","text/csv":"csv","application/json":"json","application/xml":"xml","text/html":"html",
      "audio/mpeg":"mp3","audio/wav":"wav","audio/ogg":"ogg","video/mp4":"mp4","video/webm":"webm"
    };
    const starts = (bytes, values) => values.every((value, index) => bytes[index] === value);
    const ascii = (bytes, start, length) => String.fromCharCode(...bytes.slice(start, start + length));
    const detectOle = (bytes) => {
      const directoryText = new TextDecoder("utf-16le").decode(bytes.slice(0, Math.min(bytes.length, 16 * 1024 * 1024)));
      if (directoryText.includes("WordDocument")) return ["application/msword","doc"];
      if (directoryText.includes("Workbook") || directoryText.includes("Book")) return ["application/vnd.ms-excel","xls"];
      if (directoryText.includes("PowerPoint Document")) return ["application/vnd.ms-powerpoint","ppt"];
      return ["application/vnd.ms-office","doc"];
    };
    const detectZip = (bytes) => {
      const limit = Math.min(bytes.length, 4 * 1024 * 1024);
      let text = "";
      for (let start = 0; start < limit; start += 32768) text += ascii(bytes, start, Math.min(32768, limit - start));
      if (bytes.length > limit) {
        const tailStart = Math.max(limit, bytes.length - limit);
        for (let start = tailStart; start < bytes.length; start += 32768) text += ascii(bytes, start, Math.min(32768, bytes.length - start));
      }
      const lowerText = text.toLowerCase();
      if (lowerText.includes("ofd.xml")) return ["application/ofd", "ofd"];
      if (lowerText.includes("word/")) return ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"];
      if (lowerText.includes("xl/")) return ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xlsx"];
      if (lowerText.includes("ppt/")) return ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "pptx"];
      return ["application/zip", "zip"];
    };
    const detectText = (bytes) => {
      const sample = bytes.slice(0, Math.min(bytes.length, 8192));
      if (sample.includes(0)) return null;
      try {
        const text = new TextDecoder("utf-8", { fatal: true }).decode(sample).trimStart();
        if (/^<svg[\s>]/i.test(text) || /^<\?xml[^>]*>\s*<svg[\s>]/i.test(text)) return ["image/svg+xml", "svg"];
        if (/^[\[{]/.test(text)) { try { JSON.parse(new TextDecoder().decode(bytes)); return ["application/json", "json"]; } catch {} }
        if (/^<!doctype html|^<html[\s>]/i.test(text)) return ["text/html", "html"];
        if (/^<\?xml|^<[A-Za-z_][\w:.-]*(?:\s|>)/.test(text)) return ["application/xml", "xml"];
        return ["text/plain", "txt"];
      } catch { return null; }
    };
    const detect = (bytes) => {
      if (starts(bytes,[0xff,0xd8,0xff])) return ["image/jpeg","jpg"];
      if (starts(bytes,[0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a])) return ["image/png","png"];
      if (ascii(bytes,0,6) === "GIF87a" || ascii(bytes,0,6) === "GIF89a") return ["image/gif","gif"];
      if (ascii(bytes,0,2) === "BM") return ["image/bmp","bmp"];
      if (ascii(bytes,0,4) === "RIFF" && ascii(bytes,8,4) === "WEBP") return ["image/webp","webp"];
      if (starts(bytes,[0x00,0x00,0x01,0x00])) return ["image/x-icon","ico"];
      if (ascii(bytes,4,8).includes("ftypavif")) return ["image/avif","avif"];
      if (starts(bytes,[0x49,0x49,0x2a,0x00]) || starts(bytes,[0x4d,0x4d,0x00,0x2a])) return ["image/tiff","tiff"];
      if (/ftyp(?:heic|heix|hevc|hevx|mif1)/.test(ascii(bytes,4,12))) return ["image/heic","heic"];
      if (ascii(bytes,0,5) === "%PDF-") return ["application/pdf","pdf"];
      if (starts(bytes,[0x50,0x4b,0x03,0x04]) || starts(bytes,[0x50,0x4b,0x05,0x06]) || starts(bytes,[0x50,0x4b,0x07,0x08])) return detectZip(bytes);
      if (starts(bytes,[0x52,0x61,0x72,0x21,0x1a,0x07])) return ["application/vnd.rar","rar"];
      if (starts(bytes,[0x37,0x7a,0xbc,0xaf,0x27,0x1c])) return ["application/x-7z-compressed","7z"];
      if (starts(bytes,[0x1f,0x8b])) return ["application/gzip","gz"];
      if (starts(bytes,[0xd0,0xcf,0x11,0xe0,0xa1,0xb1,0x1a,0xe1])) return detectOle(bytes);
      if (ascii(bytes,0,3) === "ID3" || starts(bytes,[0xff,0xfb]) || starts(bytes,[0xff,0xf3]) || starts(bytes,[0xff,0xf2])) return ["audio/mpeg","mp3"];
      if (ascii(bytes,0,4) === "RIFF" && ascii(bytes,8,4) === "WAVE") return ["audio/wav","wav"];
      if (ascii(bytes,0,4) === "OggS") return ["audio/ogg","ogg"];
      if (ascii(bytes,4,4) === "ftyp") return ["video/mp4","mp4"];
      if (starts(bytes,[0x1a,0x45,0xdf,0xa3])) return ["video/webm","webm"];
      return detectText(bytes) || ["application/octet-stream","bin"];
    };
    self.onmessage = ({ data: value }) => {
      try {
        let payload = value.trim();
        let declaredMime = "";
        let fileName = "";
        if (/^data:/i.test(payload)) {
          const commaIndex = payload.indexOf(",");
          if (commaIndex < 0) throw new Error("Data URL 缺少内容分隔符。 ");
          const metadata = payload.slice(5, commaIndex);
          if (!/;base64(?:;|$)/i.test(metadata)) throw new Error("请输入 Base64 格式的 Data URL。 ");
          const parts = metadata.split(";");
          declaredMime = (parts[0] || "application/octet-stream").toLowerCase();
          const namePart = parts.find((part) => /^name=/i.test(part));
          if (namePart) { try { fileName = decodeURIComponent(namePart.slice(5)); } catch {} }
          payload = payload.slice(commaIndex + 1);
        }
        if (/\s/.test(payload)) payload = payload.replace(/\s+/g, "");
        if ((!payload && !declaredMime) || payload.length % 4 === 1 || !/^[A-Za-z0-9+/]*={0,2}$/.test(payload)) throw new Error("Base64 编码格式不正确。 ");
        const binary = atob(payload);
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
        const detected = detect(bytes);
        const genericMime = !declaredMime || declaredMime === "application/octet-stream" || declaredMime === "application/zip" || declaredMime === "application/x-zip-compressed";
        const mime = genericMime ? detected[0] : declaredMime;
        const extension = mimeExtensions[mime] || detected[1] || "bin";
        self.postMessage({ buffer: bytes.buffer, mime, fileName, extension }, [bytes.buffer]);
      } catch (error) {
        self.postMessage({ error: error instanceof Error ? error.message : "Base64 解码失败。" });
      }
    };
  `;
  const workerUrl = URL.createObjectURL(new Blob([workerSource], { type: "text/javascript" }));
  const worker = new Worker(workerUrl);
  const cleanup = () => { worker.terminate(); URL.revokeObjectURL(workerUrl); };
  worker.onmessage = ({ data }: MessageEvent<Partial<DecodeResult> & { error?: string }>) => {
    cleanup();
    if (data.error || !data.buffer || !data.mime) reject(new Error(data.error || "Base64 解码失败。"));
    else resolve({ buffer: data.buffer, mime: data.mime, fileName: data.fileName || "", extension: data.extension || "bin" });
  };
  worker.onerror = () => { cleanup(); reject(new Error("Base64 解码失败。")); };
  worker.postMessage(value);
});

const decode = async () => {
  error.value = "";
  decoding.value = true;
  try {
    const value = decodeInput.value?.value || "";
    if (!value.trim()) throw new Error("请输入 Base64 内容。 ");
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    const { buffer, mime, fileName, extension } = await decodeInWorker(value);
    const blob = new Blob([buffer], { type: mime });
    revoke(resultUrl.value);
    resultUrl.value = URL.createObjectURL(blob);
    resultSize.value = blob.size;
    resultMime.value = mime;
    resultFileName.value = fileName ? safeFileName(fileName) : `base64-file-${Date.now()}.${extension}`;
  } catch (exception) {
    error.value = exception instanceof Error ? exception.message : "Base64 内容无效，无法还原文件。";
  } finally {
    decoding.value = false;
  }
};

const clearEncode = () => {
  encoded.value = sourceName.value = sourceMime.value = "";
  sourceSize.value = 0;
  copied.value = false;
};
const clearDecode = () => {
  revoke(resultUrl.value);
  resultUrl.value = resultMime.value = resultFileName.value = "";
  resultSize.value = 0;
  hasDecodeInput.value = false;
  if (decodeInput.value) decodeInput.value.value = "";
};
onBeforeUnmount(() => revoke(resultUrl.value));
</script>

<template>
  <section class="tool">
    <header>
      <div><small>LOCAL FILE BASE64 TOOL</small><h2>文件 Base64 编解码</h2><p>所有操作均在浏览器本地完成，文件不会上传服务器。</p></div>
      <span>图片 · 文档 · 压缩包 · 音视频</span>
    </header>
    <nav class="tool-tabs" role="tablist" aria-label="转换类型">
      <button type="button" role="tab" :aria-selected="activePanel === 'encode'" :class="{ active: activePanel === 'encode' }" @click="activePanel = 'encode'; error = ''">文件转 Base64</button>
      <button type="button" role="tab" :aria-selected="activePanel === 'decode'" :class="{ active: activePanel === 'decode' }" @click="activePanel = 'decode'; error = ''">Base64 转文件</button>
    </nav>
    <div class="panels">
      <article v-show="activePanel === 'encode'" role="tabpanel">
        <h3>文件转 Base64</h3>
        <fieldset class="format-options">
          <legend>输出格式</legend>
          <label :class="{ selected: encodeFormat === 'data-url' }"><input v-model="encodeFormat" type="radio" value="data-url">完整 Data URL</label>
          <label :class="{ selected: encodeFormat === 'base64' }"><input v-model="encodeFormat" type="radio" value="base64">纯 Base64 字符串</label>
        </fieldset>
        <p class="format-rule">{{ encodeFormat === "data-url" ? "包含 MIME 类型和原文件名，解码时可更准确地还原文件。" : "仅输出 Base64 正文，不含文件信息，解码时将根据文件头自动识别。" }}</p>
        <label class="drop" @dragover.prevent @drop.prevent="encode($event.dataTransfer?.files[0])">
          <input type="file" @change="encode(($event.target as HTMLInputElement).files?.[0])">
          <b>{{ sourceName || "选择或拖拽文件" }}</b>
          <small>支持图片、PDF、OFD、Word、Excel、ZIP、TXT 等各类文件</small>
        </label>
        <textarea v-if="encoded" :value="encodedOutput" readonly aria-label="Base64 编码结果" />
        <p v-if="encoded" class="meta">{{ sourceMime }} · 原文件 {{ sizeText(sourceSize) }} · 输出 {{ sizeText(encodedSize) }}</p>
        <div class="actions"><button class="primary" :disabled="!encoded" @click="copy">{{ copied ? "已复制" : "复制 Base64" }}</button><button @click="clearEncode">清空</button></div>
      </article>
      <article v-show="activePanel === 'decode'" role="tabpanel">
        <h3>Base64 转文件</h3>
        <p class="format-rule">自动识别完整 Data URL 或纯 Base64，支持图片、PDF、OFD、Office 文档、压缩包、文本及常见音视频格式。</p>
        <textarea ref="decodeInput" placeholder="粘贴 Data URL 或纯 Base64 内容…" aria-label="待解码 Base64 内容" spellcheck="false" autocomplete="off" autocapitalize="off" @input="hasDecodeInput = Boolean(($event.target as HTMLTextAreaElement).value)" />
        <div class="actions"><button class="primary" :disabled="!hasDecodeInput || decoding" @click="decode">{{ decoding ? "正在解码…" : "解码文件" }}</button><button :disabled="decoding" @click="clearDecode">清空</button></div>
        <img v-if="resultUrl && isImageResult" :src="resultUrl" alt="解码图片预览">
        <div v-else-if="resultUrl" class="file-result"><span>FILE</span><div><b>{{ downloadName }}</b><small>{{ resultMime }}</small></div></div>
        <p v-if="resultUrl" class="meta">{{ resultMime }} · {{ sizeText(resultSize) }}</p>
        <a v-if="resultUrl" :href="resultUrl" :download="downloadName">下载文件</a>
      </article>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </section>
</template>

<style scoped lang="scss">
.tool{margin:1rem 0 2rem;padding:clamp(1rem,3vw,1.7rem);background:linear-gradient(145deg,color-mix(in srgb,var(--vp-c-accent) 7%,var(--vp-c-bg)),var(--vp-c-bg) 45%);border:1px solid var(--vp-c-border);border-radius:18px;box-shadow:0 12px 36px rgba(30,65,90,.08)}header{display:flex;justify-content:space-between;gap:1rem;margin-bottom:1.2rem}header small{color:var(--vp-c-accent);font-size:.67rem;font-weight:700;letter-spacing:.15em}header h2{margin:.2rem 0;padding:0;border:0;font-size:clamp(1.35rem,3vw,1.85rem)}header p{margin:0;color:var(--vp-c-text-mute);font-size:.82rem}header>span{align-self:flex-start;padding:.4rem .65rem;color:var(--vp-c-accent);font-size:.68rem;background:color-mix(in srgb,var(--vp-c-accent) 10%,transparent);border-radius:999px}.tool-tabs{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1rem;padding:.35rem;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:12px}.tool-tabs button{padding:.7rem 1rem;font-size:.85rem;border-color:transparent}.tool-tabs button.active{color:#fff;background:var(--vp-c-accent);border-color:var(--vp-c-accent)}.panels{display:block}article{display:flex;flex-direction:column;gap:.7rem;min-width:0;padding:1rem;background:var(--vp-c-bg);border:1px solid var(--vp-c-border);border-radius:14px}h3{margin:0;padding:0;border:0;font-size:1rem}.format-options{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;margin:0;padding:.7rem;background:color-mix(in srgb,var(--vp-c-accent) 7%,var(--vp-c-bg));border:1px solid var(--vp-c-border);border-radius:10px}.format-options legend{padding:0 .3rem;color:var(--vp-c-text-mute);font-size:.75rem}.format-options label{display:flex;align-items:center;justify-content:center;gap:.5rem;min-height:44px;padding:.25rem .5rem;color:var(--vp-c-text);font-size:.95rem;font-weight:600;cursor:pointer;background:var(--vp-c-bg);border:1px solid var(--vp-c-border);border-radius:8px}.format-options label.selected{color:var(--vp-c-accent);border-color:var(--vp-c-accent)}.format-options input{width:1rem;height:1rem;accent-color:var(--vp-c-accent)}.format-rule{margin:-.25rem 0 0;color:var(--vp-c-text-mute);font-size:.72rem}.drop{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:130px;text-align:center;cursor:pointer;background:var(--vp-c-bg-alt);border:2px dashed var(--vp-c-border);border-radius:10px}.drop:hover{border-color:var(--vp-c-accent)}.drop input{position:absolute;width:1px;height:1px;opacity:0}.drop small,.meta,.file-result small{margin:0;color:var(--vp-c-text-mute);font-size:.68rem}article>img{box-sizing:border-box;width:100%;height:260px;margin:0;object-fit:contain;background:repeating-conic-gradient(#eee 0 25%,#fff 0 50%) 0/18px 18px;border:1px solid var(--vp-c-border);border-radius:10px}.file-result{display:flex;align-items:center;gap:.8rem;padding:1rem;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:10px}.file-result>span{display:grid;place-items:center;width:48px;height:48px;color:#fff;font-size:.68rem;font-weight:800;background:var(--vp-c-accent);border-radius:10px}.file-result div{display:flex;flex-direction:column;min-width:0}.file-result b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}textarea{box-sizing:border-box;width:100%;min-height:280px;padding:.7rem;resize:vertical;overflow-wrap:anywhere;white-space:pre-wrap;color:var(--vp-c-text);font:12px/1.55 monospace;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:10px}.actions{display:flex;gap:.55rem}button,article>a{padding:.55rem .75rem;color:var(--vp-c-text);font:inherit;font-size:.76rem;font-weight:600;text-align:center;text-decoration:none;cursor:pointer;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:8px}.primary,article>a{color:#fff;background:var(--vp-c-accent);border-color:var(--vp-c-accent)}button:disabled{cursor:not-allowed;opacity:.5}.error{padding:.55rem .75rem;color:#d33;font-size:.8rem;background:rgba(220,50,50,.08);border-radius:8px}@media(max-width:760px){header>span{display:none}.format-options{grid-template-columns:1fr}}
</style>
