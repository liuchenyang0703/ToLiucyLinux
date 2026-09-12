<script setup lang="ts">
import { ref } from "vue";

const source = ref("");
const result = ref("");
const error = ref("");
const copied = ref(false);

const toBinary = (bytes: Uint8Array): string => {
  let value = "";
  for (let index = 0; index < bytes.length; index += 0x8000)
    value += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  return value;
};

const encode = (): void => {
  error.value = "";
  result.value = btoa(toBinary(new TextEncoder().encode(source.value)));
};

const decode = (): void => {
  error.value = "";
  try {
    const normalized = source.value.trim().replaceAll(/\s+/gu, "").replaceAll("-", "+").replaceAll("_", "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const bytes = Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
    result.value = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    result.value = "";
    error.value = "无法解码：请输入有效的 Base64 文本。";
  }
};

const swap = (): void => {
  [source.value, result.value] = [result.value, source.value];
  error.value = "";
};

const clear = (): void => {
  source.value = result.value = error.value = "";
};

const copyResult = async (): Promise<void> => {
  if (!result.value) return;
  await navigator.clipboard.writeText(result.value);
  copied.value = true;
  window.setTimeout(() => { copied.value = false; }, 1500);
};
</script>

<template>
  <section class="base64-tool">
    <header>
      <div><small>LOCAL BASE64 TOOL</small><h2>Base64 文本编解码</h2><p>所有处理均在浏览器本地完成，内容不会上传。</p></div>
      <span>🔒 本地处理</span>
    </header>
    <div class="editors">
      <label><b>输入文本</b><textarea v-model="source" placeholder="输入普通文本或 Base64 内容……" spellcheck="false"/><small>{{ source.length }} 个字符</small></label>
      <label><b>处理结果</b><textarea :value="result" placeholder="结果将在这里显示" readonly spellcheck="false"/><small>{{ result.length }} 个字符</small></label>
    </div>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <div class="actions">
      <button class="primary" type="button" @click="encode">编码为 Base64</button>
      <button class="primary" type="button" @click="decode">解码为文本</button>
      <button type="button" @click="swap">交换内容</button>
      <button type="button" :disabled="!result" @click="copyResult">{{ copied ? "已复制" : "复制结果" }}</button>
      <button type="button" :disabled="!source && !result" @click="clear">清空</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.base64-tool { margin: 1rem 0 2rem; padding: clamp(1rem,3vw,1.7rem); background: linear-gradient(145deg,color-mix(in srgb,var(--vp-c-accent) 7%,var(--vp-c-bg)),var(--vp-c-bg) 45%); border: 1px solid var(--vp-c-border); border-radius: 18px; box-shadow: 0 12px 36px rgba(30,65,90,.08); }
header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; }
header small { color: var(--vp-c-accent); font-size: .67rem; font-weight: 700; letter-spacing: .16em; }
header h2 { margin: .2rem 0; padding: 0; border: 0; font-size: clamp(1.35rem,3vw,1.85rem); }
header p { margin: 0; color: var(--vp-c-text-mute); font-size: .82rem; }
header > span { flex: none; padding: .4rem .65rem; color: var(--vp-c-accent); font-size: .72rem; background: color-mix(in srgb,var(--vp-c-accent) 10%,transparent); border-radius: 999px; }
.editors { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1rem; }
label { display: flex; flex-direction: column; gap: .45rem; font-size: .82rem; }
textarea { box-sizing: border-box; width: 100%; min-height: 260px; resize: vertical; padding: .85rem 1rem; color: var(--vp-c-text); font: 14px/1.65 ui-monospace,SFMono-Regular,Consolas,monospace; background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); border-radius: 12px; outline: none; }
textarea:focus { border-color: var(--vp-c-accent); box-shadow: 0 0 0 3px color-mix(in srgb,var(--vp-c-accent) 14%,transparent); }
textarea[readonly] { background: var(--vp-c-bg-alt); }
label small { align-self: flex-end; color: var(--vp-c-text-mute); }
.error { padding: .55rem .75rem; color: #d33; font-size: .8rem; background: rgba(220,50,50,.08); border-radius: 8px; }
.actions { display: flex; flex-wrap: wrap; gap: .65rem; margin-top: 1.1rem; }
button { padding: .58rem .85rem; color: var(--vp-c-text); font: inherit; font-size: .78rem; font-weight: 600; cursor: pointer; background: var(--vp-c-bg-alt); border: 1px solid var(--vp-c-border); border-radius: 9px; }
button.primary { color: #fff; background: var(--vp-c-accent); border-color: var(--vp-c-accent); }
button:disabled { cursor: not-allowed; opacity: .45; }
@media (max-width:720px) { .editors { grid-template-columns: 1fr; } textarea { min-height: 190px; } header > span { display: none; } button { flex: 1 1 40%; } }
</style>
