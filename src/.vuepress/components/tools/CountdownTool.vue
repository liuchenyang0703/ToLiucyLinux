<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

interface CountdownItem {
  id: string;
  name: string;
  target: number;
}

interface HolidayItem extends CountdownItem {
  kind: "holiday";
}

const STORAGE_KEY = "toliucylinux-custom-countdowns-v1";
const DAY = 24 * 60 * 60 * 1000;

const now = ref(0);
const ready = ref(false);
const customItems = ref<CountdownItem[]>([]);
const holidays = ref<HolidayItem[]>([]);
const nameInput = ref("");
const dateInput = ref("");
const error = ref("");
let timer: ReturnType<typeof window.setInterval> | undefined;

const pad = (value: number) => String(value).padStart(2, "0");

const toDateTimeInput = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;

const localDate = (year: number, month: number, day: number) =>
  new Date(year, month - 1, day, 0, 0, 0, 0);

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const getRemaining = (target: number) => {
  const difference = target - now.value;
  if (difference <= 0) return { ended: true, days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    ended: false,
    days: Math.floor(difference / DAY),
    hours: Math.floor((difference % DAY) / 3_600_000),
    minutes: Math.floor((difference % 3_600_000) / 60_000),
    seconds: Math.floor((difference % 60_000) / 1000),
  };
};

const sortedCustomItems = computed(() =>
  [...customItems.value].sort((left, right) => {
    const leftEnded = left.target <= now.value;
    const rightEnded = right.target <= now.value;
    if (leftEnded !== rightEnded) return leftEnded ? 1 : -1;
    return left.target - right.target;
  }),
);

const saveCustomItems = () => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customItems.value));
};

const loadCustomItems = () => {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown;
    if (!Array.isArray(stored)) return;

    customItems.value = stored.filter((item): item is CountdownItem => {
      if (!item || typeof item !== "object") return false;
      const value = item as Partial<CountdownItem>;
      return typeof value.id === "string" && typeof value.name === "string" && typeof value.target === "number";
    });
  } catch {
    customItems.value = [];
  }
};

const addCustomItem = () => {
  const name = nameInput.value.trim();
  const target = new Date(dateInput.value).getTime();

  if (!name) {
    error.value = "请输入倒计时名称。";
    return;
  }
  if (!dateInput.value || Number.isNaN(target)) {
    error.value = "请选择有效的日期和时间。";
    return;
  }
  if (target <= Date.now()) {
    error.value = "倒计时时间需要晚于当前时间。";
    return;
  }

  customItems.value.push({
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    name,
    target,
  });
  saveCustomItems();
  nameInput.value = "";
  dateInput.value = toDateTimeInput(new Date(Date.now() + DAY));
  error.value = "";
};

const removeCustomItem = (id: string) => {
  customItems.value = customItems.value.filter((item) => item.id !== id);
  saveCustomItems();
};

const lunarFormatter = new Intl.DateTimeFormat("zh-CN-u-ca-chinese", {
  month: "numeric",
  day: "numeric",
});

const findLunarDate = (year: number, lunarMonth: number, lunarDay: number) => {
  const cursor = new Date(year, 0, 1, 12);
  const end = new Date(year, 11, 31, 12);

  while (cursor <= end) {
    const parts = lunarFormatter.formatToParts(cursor);
    const month = parts.find((part) => part.type === "month")?.value;
    const day = parts.find((part) => part.type === "day")?.value;
    if (month === String(lunarMonth) && day === String(lunarDay)) {
      return localDate(cursor.getFullYear(), cursor.getMonth() + 1, cursor.getDate());
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return null;
};

const getQingmingDay = (year: number) => {
  const shortYear = year % 100;
  return Math.floor(shortYear * 0.2422 + 4.81) - Math.floor(shortYear / 4);
};

const createHolidayList = () => {
  const today = new Date();
  const todayStart = localDate(today.getFullYear(), today.getMonth() + 1, today.getDate()).getTime();
  const candidates: Array<{ name: string; date: Date | null }> = [];

  for (let year = today.getFullYear(); year <= today.getFullYear() + 2; year += 1) {
    candidates.push(
      { name: "元旦", date: localDate(year, 1, 1) },
      { name: "春节", date: findLunarDate(year, 1, 1) },
      { name: "清明节", date: localDate(year, 4, getQingmingDay(year)) },
      { name: "劳动节", date: localDate(year, 5, 1) },
      { name: "端午节", date: findLunarDate(year, 5, 5) },
      { name: "中秋节", date: findLunarDate(year, 8, 15) },
      { name: "国庆节", date: localDate(year, 10, 1) },
    );
  }

  const nextByName = new Map<string, HolidayItem>();
  candidates
    .filter((item): item is { name: string; date: Date } => Boolean(item.date) && item.date!.getTime() >= todayStart)
    .sort((left, right) => left.date.getTime() - right.date.getTime())
    .forEach(({ name, date }) => {
      if (!nextByName.has(name)) {
        nextByName.set(name, {
          id: `holiday-${name}`,
          name,
          target: date.getTime(),
          kind: "holiday",
        });
      }
    });

  holidays.value = [...nextByName.values()].sort((left, right) => left.target - right.target);
};

onMounted(() => {
  now.value = Date.now();
  dateInput.value = toDateTimeInput(new Date(now.value + DAY));
  loadCustomItems();
  createHolidayList();
  ready.value = true;
  timer = window.setInterval(() => {
    now.value = Date.now();
  }, 1000);
});

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer);
});
</script>

<template>
  <section class="countdown-tool">
    <header class="tool-header">
      <div>
        <small>COUNTDOWN</small>
        <h2>节日倒计时</h2>
        <p>自定义重要日期，并查看中国法定节日还有多久到来。</p>
      </div>
      <span>每秒自动更新</span>
    </header>

    <section class="custom-section">
      <div class="section-title">
        <div><small>最高优先级</small><h3>我的倒计时</h3></div>
        <span>自动保存在当前浏览器</span>
      </div>

      <form class="countdown-form" @submit.prevent="addCustomItem">
        <label><span>名称</span><input v-model="nameInput" type="text" maxlength="30" placeholder="例如：项目上线" autocomplete="off"></label>
        <label><span>日期和时间</span><input v-model="dateInput" type="datetime-local" step="60"></label>
        <button type="submit">添加倒计时</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>

      <div v-if="ready && sortedCustomItems.length" class="countdown-grid custom-grid">
        <article v-for="item in sortedCustomItems" :key="item.id" class="countdown-card custom-card" :class="{ ended: getRemaining(item.target).ended }">
          <div class="card-heading"><div><span class="tag">自定义</span><h4>{{ item.name }}</h4></div><button class="delete" type="button" :aria-label="`删除${item.name}`" @click="removeCustomItem(item.id)">删除</button></div>
          <p class="target-date">{{ formatDate(item.target) }}</p>
          <p v-if="getRemaining(item.target).ended" class="finished">倒计时已结束</p>
          <div v-else class="time-blocks">
            <strong><b>{{ getRemaining(item.target).days }}</b><span>天</span></strong>
            <strong><b>{{ pad(getRemaining(item.target).hours) }}</b><span>时</span></strong>
            <strong><b>{{ pad(getRemaining(item.target).minutes) }}</b><span>分</span></strong>
            <strong><b>{{ pad(getRemaining(item.target).seconds) }}</b><span>秒</span></strong>
          </div>
        </article>
      </div>
      <div v-else-if="ready" class="empty">还没有自定义倒计时，添加后刷新浏览器也会继续保留。</div>
    </section>

    <section class="holiday-section">
      <div class="section-title">
        <div><small>自动计算</small><h3>中国节假日倒计时</h3></div>
        <span>公历 · 中国农历</span>
      </div>
      <div v-if="ready" class="countdown-grid holiday-grid">
        <article v-for="item in holidays" :key="item.id" class="countdown-card holiday-card">
          <div class="card-heading"><div><span class="tag">法定节日</span><h4>{{ item.name }}</h4></div></div>
          <p class="target-date">{{ formatDate(item.target).replace(' 00:00', '') }}</p>
          <div class="time-blocks">
            <strong><b>{{ getRemaining(item.target).days }}</b><span>天</span></strong>
            <strong><b>{{ pad(getRemaining(item.target).hours) }}</b><span>时</span></strong>
            <strong><b>{{ pad(getRemaining(item.target).minutes) }}</b><span>分</span></strong>
            <strong><b>{{ pad(getRemaining(item.target).seconds) }}</b><span>秒</span></strong>
          </div>
        </article>
      </div>
      <p class="notice">倒计时按节日当天 00:00 计算，具体放假及调休安排请以国务院公布的通知为准。</p>
    </section>
  </section>
</template>

<style scoped lang="scss">
.countdown-tool{margin:1rem 0 2rem;padding:clamp(1rem,3vw,1.7rem);background:linear-gradient(145deg,color-mix(in srgb,var(--vp-c-accent) 7%,var(--vp-c-bg)),var(--vp-c-bg) 45%);border:1px solid var(--vp-c-border);border-radius:18px;box-shadow:0 12px 36px rgba(30,65,90,.08)}.tool-header,.section-title{display:flex;justify-content:space-between;gap:1rem}.tool-header{margin-bottom:1.2rem}.tool-header small,.section-title small{color:var(--vp-c-accent);font-size:.67rem;font-weight:700;letter-spacing:.14em}.tool-header h2{margin:.2rem 0;padding:0;border:0;font-size:clamp(1.35rem,3vw,1.85rem)}.tool-header p{margin:0;color:var(--vp-c-text-mute);font-size:.82rem}.tool-header>span,.section-title>span{align-self:flex-start;padding:.4rem .65rem;color:var(--vp-c-accent);font-size:.68rem;background:color-mix(in srgb,var(--vp-c-accent) 10%,transparent);border-radius:999px}.custom-section,.holiday-section{padding:1rem;background:var(--vp-c-bg);border:1px solid var(--vp-c-border);border-radius:14px}.custom-section{margin-bottom:1rem;border-color:color-mix(in srgb,var(--vp-c-accent) 45%,var(--vp-c-border));box-shadow:0 8px 24px color-mix(in srgb,var(--vp-c-accent) 8%,transparent)}.section-title{align-items:center;margin-bottom:.9rem}.section-title h3{margin:.1rem 0 0;padding:0;border:0;font-size:1.05rem}.countdown-form{display:grid;grid-template-columns:minmax(140px,1fr) minmax(210px,1fr) auto;gap:.7rem;align-items:end;margin-bottom:.75rem}.countdown-form label{display:flex;flex-direction:column;gap:.35rem;color:var(--vp-c-text-mute);font-size:.72rem}.countdown-form input{box-sizing:border-box;width:100%;height:42px;padding:0 .7rem;color:var(--vp-c-text);font:inherit;font-size:.84rem;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:8px}.countdown-form input:focus{outline:2px solid color-mix(in srgb,var(--vp-c-accent) 30%,transparent);border-color:var(--vp-c-accent)}button{font:inherit;cursor:pointer}.countdown-form button{height:42px;padding:0 1rem;color:#fff;font-size:.78rem;font-weight:700;background:var(--vp-c-accent);border:1px solid var(--vp-c-accent);border-radius:8px}.error{margin:.3rem 0 .75rem;padding:.55rem .7rem;color:#d33;font-size:.75rem;background:rgba(220,50,50,.08);border-radius:8px}.countdown-grid{display:grid;gap:.75rem}.custom-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.holiday-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.countdown-card{min-width:0;padding:.85rem;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:11px}.custom-card{border-left:3px solid var(--vp-c-accent)}.custom-card.ended{opacity:.7}.card-heading{display:flex;justify-content:space-between;gap:.6rem;align-items:flex-start}.card-heading h4{margin:.2rem 0 0;font-size:.95rem}.tag{color:var(--vp-c-accent);font-size:.62rem;font-weight:700}.delete{padding:.25rem .45rem;color:var(--vp-c-text-mute);font-size:.66rem;background:transparent;border:1px solid var(--vp-c-border);border-radius:6px}.delete:hover{color:#d33;border-color:#d33}.target-date{margin:.45rem 0 .7rem;color:var(--vp-c-text-mute);font-size:.7rem}.time-blocks{display:grid;grid-template-columns:repeat(4,1fr);gap:.35rem}.time-blocks strong{display:flex;flex-direction:column;align-items:center;padding:.45rem .2rem;background:var(--vp-c-bg);border-radius:7px}.time-blocks b{color:var(--vp-c-accent);font-size:clamp(.9rem,2vw,1.15rem);font-variant-numeric:tabular-nums}.time-blocks span{margin-top:.12rem;color:var(--vp-c-text-mute);font-size:.6rem}.finished{margin:.65rem 0 0;color:var(--vp-c-text-mute);font-size:.78rem}.empty{padding:1.1rem;color:var(--vp-c-text-mute);font-size:.76rem;text-align:center;background:var(--vp-c-bg-alt);border:1px dashed var(--vp-c-border);border-radius:9px}.notice{margin:.8rem 0 0;color:var(--vp-c-text-mute);font-size:.68rem;text-align:center}@media(max-width:760px){.tool-header>span,.section-title>span{display:none}.countdown-form{grid-template-columns:1fr}.custom-grid,.holiday-grid{grid-template-columns:1fr}}@media(min-width:1100px){.holiday-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
</style>
