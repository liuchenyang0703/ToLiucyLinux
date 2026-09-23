<script setup lang="ts">
import { computed, ref } from "vue";

const units = ["B", "KB", "MB", "GB", "TB", "PB"] as const;
const value = ref("1");
const sourceUnit = ref<(typeof units)[number]>("GB");
const base = ref<1000 | 1024>(1024);
const copiedUnit = ref("");

const numberValue = computed(() => Number(value.value));
const error = computed(() => {
  if (!value.value.trim()) return "请输入需要换算的数值。";
  if (!Number.isFinite(numberValue.value)) return "请输入有效数字。";
  if (numberValue.value < 0) return "字节大小不能为负数。";
  return "";
});

const results = computed(() => {
  if (error.value) return [];
  const bytes = numberValue.value * base.value ** units.indexOf(sourceUnit.value);
  return units.map((unit, index) => ({ unit, value: bytes / base.value ** index }));
});

const format = (number: number) => {
  if (number === 0) return "0";
  if (Math.abs(number) >= 1e15 || Math.abs(number) < 1e-8) return number.toExponential(8);
  return number.toLocaleString("zh-CN", { maximumFractionDigits: 10, useGrouping: false });
};

const copy = async (text: string, unit: string) => {
  await navigator.clipboard.writeText(text);
  copiedUnit.value = unit;
  window.setTimeout(() => { if (copiedUnit.value === unit) copiedUnit.value = ""; }, 1200);
};

const copyAll = async () => {
  const text = results.value.map((item) => `${format(item.value)} ${item.unit}`).join("\n");
  await copy(text, "all");
};

const reset = () => {
  value.value = "1";
  sourceUnit.value = "GB";
  base.value = 1024;
};
</script>

<template>
  <section class="byte-tool">
    <header>
      <div><small>BYTE UNIT CONVERTER</small><h2>字节单位换算器</h2><p>输入一个数值，即时换算为全部常用存储单位。</p></div>
      <span>B · KB · MB · GB · TB · PB</span>
    </header>

    <div class="mode" role="group" aria-label="换算进制">
      <button type="button" :class="{ active: base === 1024 }" @click="base = 1024">二进制（1024）</button>
      <button type="button" :class="{ active: base === 1000 }" @click="base = 1000">十进制（1000）</button>
    </div>

    <div class="input-row">
      <label><span>数值</span><input v-model="value" type="text" inputmode="decimal" placeholder="请输入数值" autocomplete="off"></label>
      <label><span>原始单位</span><select v-model="sourceUnit"><option v-for="unit in units" :key="unit" :value="unit">{{ unit }}</option></select></label>
    </div>

    <p class="rule">当前规则：1 {{ units[1] }} = {{ base }} {{ units[0] }}，相邻单位均按 {{ base }} 倍换算。</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-else class="results">
      <div v-for="item in results" :key="item.unit" :class="{ source: item.unit === sourceUnit }">
        <span>{{ item.unit }}</span>
        <strong>{{ format(item.value) }}</strong>
        <button type="button" @click="copy(format(item.value), item.unit)">{{ copiedUnit === item.unit ? "已复制" : "复制" }}</button>
      </div>
    </div>

    <div class="actions">
      <button class="primary" type="button" :disabled="Boolean(error)" @click="copyAll">{{ copiedUnit === "all" ? "已复制全部" : "复制全部结果" }}</button>
      <button type="button" @click="reset">重置</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.byte-tool{margin:1rem 0 2rem;padding:clamp(1rem,3vw,1.7rem);background:linear-gradient(145deg,color-mix(in srgb,var(--vp-c-accent) 7%,var(--vp-c-bg)),var(--vp-c-bg) 45%);border:1px solid var(--vp-c-border);border-radius:18px;box-shadow:0 12px 36px rgba(30,65,90,.08)}header{display:flex;justify-content:space-between;gap:1rem;margin-bottom:1.2rem}header small{color:var(--vp-c-accent);font-size:.67rem;font-weight:700;letter-spacing:.15em}header h2{margin:.2rem 0;padding:0;border:0;font-size:clamp(1.35rem,3vw,1.85rem)}header p{margin:0;color:var(--vp-c-text-mute);font-size:.82rem}header>span{align-self:flex-start;padding:.4rem .65rem;color:var(--vp-c-accent);font-size:.68rem;background:color-mix(in srgb,var(--vp-c-accent) 10%,transparent);border-radius:999px}.mode{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1rem;padding:.35rem;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:12px}.mode button{border-color:transparent}.mode button.active{color:#fff;background:var(--vp-c-accent);border-color:var(--vp-c-accent)}.input-row{display:grid;grid-template-columns:minmax(0,2fr) minmax(120px,1fr);gap:.8rem;margin-bottom:.8rem}.input-row label{display:flex;flex-direction:column;gap:.35rem;color:var(--vp-c-text-mute);font-size:.72rem}.input-row input,.input-row select{box-sizing:border-box;width:100%;height:44px;padding:0 .75rem;color:var(--vp-c-text);font:inherit;font-size:.9rem;background:var(--vp-c-bg);border:1px solid var(--vp-c-border);border-radius:9px}.input-row input:focus,.input-row select:focus{outline:2px solid color-mix(in srgb,var(--vp-c-accent) 35%,transparent);border-color:var(--vp-c-accent)}.rule{margin:.5rem 0;color:var(--vp-c-text-mute);font-size:.72rem}.results{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.65rem;margin:1rem 0}.results>div{display:grid;grid-template-columns:42px minmax(0,1fr) auto;align-items:center;gap:.65rem;padding:.75rem;background:var(--vp-c-bg);border:1px solid var(--vp-c-border);border-radius:10px}.results>div.source{border-color:var(--vp-c-accent);box-shadow:0 0 0 1px color-mix(in srgb,var(--vp-c-accent) 25%,transparent)}.results span{color:var(--vp-c-accent);font-size:.78rem;font-weight:700}.results strong{overflow:hidden;font:600 .82rem/1.4 monospace;text-overflow:ellipsis;white-space:nowrap}.results button{padding:.35rem .55rem;font-size:.7rem}.actions{display:flex;gap:.55rem}.error{padding:.6rem .75rem;color:#d33;font-size:.8rem;background:rgba(220,50,50,.08);border-radius:8px}button{padding:.6rem .8rem;color:var(--vp-c-text);font:inherit;font-size:.78rem;font-weight:600;cursor:pointer;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:8px}.primary{color:#fff;background:var(--vp-c-accent);border-color:var(--vp-c-accent)}button:disabled{cursor:not-allowed;opacity:.5}@media(max-width:640px){header>span{display:none}.input-row,.results{grid-template-columns:1fr}.results>div{grid-template-columns:42px minmax(0,1fr) auto}}
</style>
