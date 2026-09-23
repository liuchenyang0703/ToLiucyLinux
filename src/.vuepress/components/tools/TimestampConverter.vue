<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const now = ref(0);
const timestampInput = ref("");
const dateInput = ref("");
const copied = ref("");
let timer: ReturnType<typeof window.setInterval> | undefined;

const pad = (value: number, length = 2) => String(value).padStart(length, "0");
const toLocalInput = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
const formatLocal = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`;

const timestampResult = computed(() => {
  const value = timestampInput.value.trim();
  if (!value) return { error: "请输入时间戳。", unit: "", local: "", utc: "" };
  if (!/^-?\d+$/u.test(value)) return { error: "时间戳只能包含整数。", unit: "", local: "", utc: "" };
  const number = Number(value);
  if (!Number.isSafeInteger(number)) return { error: "时间戳超出安全数值范围。", unit: "", local: "", utc: "" };
  const isMilliseconds = Math.abs(number) >= 1e12;
  const date = new Date(isMilliseconds ? number : number * 1000);
  if (Number.isNaN(date.getTime())) return { error: "时间戳无法转换为有效日期。", unit: "", local: "", utc: "" };
  return { error: "", unit: isMilliseconds ? "毫秒" : "秒", local: formatLocal(date), utc: date.toISOString() };
});

const dateResult = computed(() => {
  if (!dateInput.value) return { error: "请选择日期和时间。", seconds: "", milliseconds: "" };
  const milliseconds = new Date(dateInput.value).getTime();
  if (Number.isNaN(milliseconds)) return { error: "日期时间格式无效。", seconds: "", milliseconds: "" };
  return { error: "", seconds: String(Math.floor(milliseconds / 1000)), milliseconds: String(milliseconds) };
});

const copy = async (value: string, key: string) => {
  await navigator.clipboard.writeText(value);
  copied.value = key;
  window.setTimeout(() => { if (copied.value === key) copied.value = ""; }, 1200);
};

const useNow = () => {
  const current = new Date();
  now.value = current.getTime();
  timestampInput.value = String(Math.floor(current.getTime() / 1000));
  dateInput.value = toLocalInput(current);
};

onMounted(() => {
  useNow();
  timer = window.setInterval(() => { now.value = Date.now(); }, 1000);
});
onBeforeUnmount(() => { if (timer) window.clearInterval(timer); });
</script>

<template>
  <section class="timestamp-tool">
    <header>
      <div><small>TIMESTAMP CONVERTER</small><h2>时间戳转换工具</h2><p>时间戳与本地日期时间互转，所有操作均在浏览器本地完成。</p></div>
      <span>Unix · Local · UTC</span>
    </header>

    <div class="now-card">
      <div><small>当前秒级时间戳</small><strong>{{ Math.floor(now / 1000) }}</strong><button type="button" @click="copy(String(Math.floor(now / 1000)), 'now-seconds')">{{ copied === "now-seconds" ? "已复制" : "复制" }}</button></div>
      <div><small>当前毫秒时间戳</small><strong>{{ now }}</strong><button type="button" @click="copy(String(now), 'now-milliseconds')">{{ copied === "now-milliseconds" ? "已复制" : "复制" }}</button></div>
    </div>

    <div class="panels">
      <article>
        <h3>时间戳转日期时间</h3>
        <label><span>时间戳（自动识别秒/毫秒）</span><input v-model="timestampInput" type="text" inputmode="numeric" placeholder="例如：1760000000" autocomplete="off"></label>
        <p v-if="timestampResult.error" class="error">{{ timestampResult.error }}</p>
        <template v-else>
          <p class="detected">已识别为：{{ timestampResult.unit }}级时间戳</p>
          <div class="result"><span>本地时间</span><strong>{{ timestampResult.local }}</strong><button type="button" @click="copy(timestampResult.local, 'local')">{{ copied === "local" ? "已复制" : "复制" }}</button></div>
          <div class="result"><span>UTC 时间</span><strong>{{ timestampResult.utc }}</strong><button type="button" @click="copy(timestampResult.utc, 'utc')">{{ copied === "utc" ? "已复制" : "复制" }}</button></div>
        </template>
      </article>

      <article>
        <h3>日期时间转时间戳</h3>
        <label><span>本地日期和时间</span><input v-model="dateInput" type="datetime-local" step="1"></label>
        <p v-if="dateResult.error" class="error">{{ dateResult.error }}</p>
        <template v-else>
          <p class="detected">按照浏览器当前时区进行转换</p>
          <div class="result"><span>秒级</span><strong>{{ dateResult.seconds }}</strong><button type="button" @click="copy(dateResult.seconds, 'seconds')">{{ copied === "seconds" ? "已复制" : "复制" }}</button></div>
          <div class="result"><span>毫秒级</span><strong>{{ dateResult.milliseconds }}</strong><button type="button" @click="copy(dateResult.milliseconds, 'milliseconds')">{{ copied === "milliseconds" ? "已复制" : "复制" }}</button></div>
        </template>
      </article>
    </div>

    <button class="primary" type="button" @click="useNow">使用当前时间</button>
  </section>
</template>

<style scoped lang="scss">
.timestamp-tool{margin:1rem 0 2rem;padding:clamp(1rem,3vw,1.7rem);background:linear-gradient(145deg,color-mix(in srgb,var(--vp-c-accent) 7%,var(--vp-c-bg)),var(--vp-c-bg) 45%);border:1px solid var(--vp-c-border);border-radius:18px;box-shadow:0 12px 36px rgba(30,65,90,.08)}header{display:flex;justify-content:space-between;gap:1rem;margin-bottom:1.2rem}header small{color:var(--vp-c-accent);font-size:.67rem;font-weight:700;letter-spacing:.15em}header h2{margin:.2rem 0;padding:0;border:0;font-size:clamp(1.35rem,3vw,1.85rem)}header p{margin:0;color:var(--vp-c-text-mute);font-size:.82rem}header>span{align-self:flex-start;padding:.4rem .65rem;color:var(--vp-c-accent);font-size:.68rem;background:color-mix(in srgb,var(--vp-c-accent) 10%,transparent);border-radius:999px}.now-card{display:grid;grid-template-columns:1fr 1fr;gap:.7rem;margin-bottom:1rem}.now-card>div{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:.3rem .6rem;align-items:center;padding:.8rem;background:var(--vp-c-bg);border:1px solid var(--vp-c-border);border-radius:10px}.now-card small{grid-column:1/-1;color:var(--vp-c-text-mute);font-size:.68rem}.now-card strong{overflow:hidden;font:600 .9rem/1.4 monospace;text-overflow:ellipsis}.panels{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}article{display:flex;flex-direction:column;gap:.75rem;min-width:0;padding:1rem;background:var(--vp-c-bg);border:1px solid var(--vp-c-border);border-radius:14px}h3{margin:0;padding:0;border:0;font-size:1rem}article>label{display:flex;flex-direction:column;gap:.35rem;color:var(--vp-c-text-mute);font-size:.72rem}input{box-sizing:border-box;width:100%;height:44px;padding:0 .7rem;color:var(--vp-c-text);font:inherit;font-size:.85rem;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:8px}input:focus{outline:2px solid color-mix(in srgb,var(--vp-c-accent) 35%,transparent);border-color:var(--vp-c-accent)}.detected{margin:0;color:var(--vp-c-text-mute);font-size:.7rem}.result{display:grid;grid-template-columns:64px minmax(0,1fr) auto;align-items:center;gap:.5rem;padding:.65rem;background:var(--vp-c-bg-alt);border-radius:8px}.result span{color:var(--vp-c-accent);font-size:.72rem;font-weight:700}.result strong{overflow:hidden;font:600 .75rem/1.4 monospace;text-overflow:ellipsis;white-space:nowrap}.error{margin:0;padding:.55rem .7rem;color:#d33;font-size:.76rem;background:rgba(220,50,50,.08);border-radius:8px}button{padding:.45rem .65rem;color:var(--vp-c-text);font:inherit;font-size:.72rem;font-weight:600;cursor:pointer;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:7px}.primary{padding:.6rem .85rem;color:#fff;background:var(--vp-c-accent);border-color:var(--vp-c-accent)}@media(max-width:760px){header>span{display:none}.now-card,.panels{grid-template-columns:1fr}.result{grid-template-columns:58px minmax(0,1fr) auto}}
</style>
