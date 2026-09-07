<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { RouteLink } from "vuepress/client";
import { useArticles } from "vuepress-theme-hope/blog";
import { Layout } from "vuepress-theme-hope/client";

interface ArchiveArticle {
  path: string;
  title: string;
  date: Date;
  dateKey: string;
  category: string;
}

const articleData = useArticles();
const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
const dayMs = 86_400_000;

const dateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const articles = computed<ArchiveArticle[]>(() => {
  const seen = new Set<string>();

  return articleData.value.items
    .map(({ path, info }) => {
      const date = info.date ? new Date(info.date) : new Date(Number.NaN);
      const title = info.title?.trim() || "未命名文章";
      const category = Array.isArray(info.category) ? info.category[0] : info.category;
      return { path, title, date, dateKey: dateKey(date), category: category || "文章" };
    })
    .filter((article) => {
      if (Number.isNaN(article.date.getTime())) return false;
      const key = `${article.dateKey}\u0000${article.title}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
});

const availableYears = computed(() => [...new Set(articles.value.map(({ date }) => date.getFullYear()))]);
const selectedYear = ref<number | null>(null);

watch(availableYears, (years) => {
  if (years.length && !years.includes(selectedYear.value as number)) selectedYear.value = years[0];
}, { immediate: true });

const filteredArticles = computed(() => articles.value.filter(({ date }) => date.getFullYear() === selectedYear.value));

const countByDay = computed(() => {
  const map = new Map<string, number>();
  filteredArticles.value.forEach(({ dateKey }) => map.set(dateKey, (map.get(dateKey) || 0) + 1));
  return map;
});

const calendar = computed(() => {
  const year = selectedYear.value || new Date().getFullYear();
  const start = new Date(year, 0, 1);
  start.setDate(start.getDate() - start.getDay());
  const end = new Date(year, 11, 31);
  end.setDate(end.getDate() + (6 - end.getDay()));
  const weekCount = Math.round((end.getTime() - start.getTime()) / dayMs / 7) + 1;

  const weeks = Array.from({ length: weekCount }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const date = new Date(start.getTime() + (week * 7 + day) * dayMs);
      const key = dateKey(date);
      const count = countByDay.value.get(key) || 0;
      const inYear = date.getFullYear() === year;
      return { key, count, inYear, level: count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : count <= 6 ? 3 : 4 };
    }),
  );

  const months: { label: string; column: number }[] = [];
  let previousMonth = -1;
  weeks.forEach((week, column) => {
    const date = new Date(`${week[0].key}T00:00:00`);
    const middle = new Date(date.getTime() + 3 * dayMs);
    if (middle.getFullYear() === year && middle.getMonth() !== previousMonth) {
      months.push({ label: monthNames[middle.getMonth()], column });
      previousMonth = middle.getMonth();
    }
  });

  return { weeks, months, range: `${year} 年` };
});

const archives = computed(() => {
  const years = new Map<number, Map<number, ArchiveArticle[]>>();
  filteredArticles.value.forEach((article) => {
    const year = article.date.getFullYear();
    const month = article.date.getMonth() + 1;
    if (!years.has(year)) years.set(year, new Map());
    const months = years.get(year)!;
    if (!months.has(month)) months.set(month, []);
    months.get(month)!.push(article);
  });
  return [...years].map(([year, months]) => ({
    year,
    count: [...months.values()].reduce((total, list) => total + list.length, 0),
    months: [...months].map(([month, items]) => ({ month, items })),
  }));
});
</script>

<template>
  <Layout>
    <template #default>
      <main id="main-content" class="vp-page archive-page">
        <div class="archive-shell">
          <header class="archive-title">
            <p>ARTICLE ARCHIVE</p>
            <h1>文章归档</h1>
            <span>时间留下痕迹，文字记录成长 · 共 {{ articles.length }} 篇</span>
          </header>

          <div class="archive-content">
            <div class="archive-main">
          <section class="contribution-card" :aria-label="`${selectedYear} 年文章发布日历`">
            <div class="calendar-scroll">
              <div class="calendar-inner">
                <div class="month-row" :style="{ gridTemplateColumns: `repeat(${calendar.weeks.length}, 14px)` }">
                  <span
                    v-for="month in calendar.months"
                    :key="`${month.label}-${month.column}`"
                    :style="{ gridColumn: `${month.column + 1} / span 4` }"
                  >{{ month.label }}</span>
                </div>
                <div class="calendar-body">
                  <div class="weekday-row">
                    <span v-for="day in weekdays" :key="day">{{ day }}</span>
                  </div>
                  <div class="week-grid" :style="{ gridTemplateColumns: `repeat(${calendar.weeks.length}, 14px)` }">
                    <div v-for="(week, index) in calendar.weeks" :key="index" class="week-column">
                      <span
                        v-for="day in week"
                        :key="day.key"
                        class="calendar-day"
                        :class="[day.inYear ? `level-${day.level}` : 'outside-year']"
                        :data-tip="day.inYear ? `${day.key}：${day.count} 篇文章` : undefined"
                        :aria-label="day.inYear ? `${day.key}，${day.count} 篇文章` : undefined"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="calendar-foot">
              <span>{{ calendar.range }}</span>
              <span class="legend">少 <i class="level-0" /><i class="level-1" /><i class="level-2" /><i class="level-3" /><i class="level-4" /> 多</span>
            </div>
          </section>

          <section class="archive-list" aria-label="全部文章">
            <article v-for="year in archives" :key="year.year" class="year-block">
              <header><h2>{{ year.year }}</h2><span>{{ year.count }} 篇</span></header>
              <div v-for="month in year.months" :key="month.month" class="month-block">
                <div class="month-heading"><h3>{{ month.month }}月</h3><span>{{ month.items.length }} 篇</span></div>
                <RouteLink v-for="item in month.items" :key="item.path" :to="item.path" class="article-row">
                  <time :datetime="item.dateKey">{{ String(item.date.getMonth() + 1).padStart(2, "0") }}-{{ String(item.date.getDate()).padStart(2, "0") }}</time>
                  <span class="article-name">{{ item.title }}</span>
                  <span class="article-category">{{ item.category }}</span>
                </RouteLink>
              </div>
            </article>
          </section>
            </div>

            <nav class="year-selector" aria-label="按年份筛选文章">
              <button
                v-for="year in availableYears"
                :key="year"
                type="button"
                :class="{ active: selectedYear === year }"
                :aria-pressed="selectedYear === year"
                @click="selectedYear = year"
              >
                <span>{{ year }}</span>
                <small>{{ articles.filter(({ date }) => date.getFullYear() === year).length }} 篇</small>
              </button>
            </nav>
          </div>
        </div>
      </main>
    </template>
  </Layout>
</template>

<style lang="scss">
.archive-page { box-sizing: border-box; width: 100%; max-width: none; min-height: calc(100vh - var(--navbar-height)); background: linear-gradient(145deg, rgba(64, 158, 106, 0.07), transparent 30rem); }
.theme-container.no-sidebar .vp-page.archive-page { padding: calc(var(--navbar-height) + 2rem) 1.25rem 3rem; }
.archive-shell { width: 100%; max-width: 1240px; margin-inline: auto; }
.archive-title { margin: 0 0 1.7rem; text-align: center; }
.archive-title p { margin: 0; color: var(--vp-c-accent); font-size: .72rem; font-weight: 700; letter-spacing: .2em; }
.archive-title h1 { margin: .35rem 0; font-size: clamp(2rem, 5vw, 3.2rem); border: 0; }
.archive-title span { color: var(--vp-c-text-mute); font-size: .9rem; }
.archive-content { display: grid; grid-template-columns: minmax(0, 1000px) 92px; align-items: start; justify-content: center; gap: .75rem; }
.archive-main { width: 100%; min-width: 0; }
.year-selector { position: sticky; top: calc(var(--navbar-height) + 1rem); display: flex; flex-direction: column; gap: .35rem; }
.year-selector button { display: flex; flex-direction: column; align-items: flex-start; padding: .55rem .7rem; color: var(--vp-c-text-mute); cursor: pointer; background: transparent; border: 0; border-radius: 7px; transition: color .2s, background .2s; }
.year-selector button:hover { color: var(--vp-c-accent); background: var(--vp-c-bg-alt); }
.year-selector button.active { color: #fff; background: var(--vp-c-accent); }
.year-selector button span { font-size: .88rem; font-weight: 600; }
.year-selector button small { margin-top: .1rem; font-size: .62rem; opacity: .75; }
.contribution-card, .year-block { background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); border-radius: 18px; box-shadow: 0 10px 35px rgba(24, 54, 40, .08); }
.contribution-card { padding: 1.5rem 1.5rem .9rem; }
.calendar-scroll { overflow-x: auto; padding: 2rem 0 .8rem; }
.calendar-inner { width: max-content; min-width: 910px; margin-inline: auto; }
.month-row { display: grid; column-gap: 3px; width: max-content; margin-left: 28px; color: var(--vp-c-text-mute); font-size: .7rem; line-height: 1; }
.month-row span { position: relative; box-sizing: border-box; min-width: 0; padding: 0 0 .35rem 2px; overflow: hidden; font-weight: 500; white-space: nowrap; }
.month-row span::after { position: absolute; bottom: 0; left: 0; width: 1px; height: 3px; content: ""; background: var(--vp-c-border); }
.calendar-body { display: flex; gap: 8px; margin-top: .45rem; }
.weekday-row, .week-column { display: grid; grid-template-rows: repeat(7, 13px); gap: 3px; }
.weekday-row { width: 20px; font-size: .65rem; line-height: 13px; color: var(--vp-c-text-mute); }
.weekday-row span:nth-child(even) { visibility: hidden; }
.week-grid { display: grid; flex: 1; gap: 3px; }
.calendar-day, .legend i { background: var(--vp-c-bg-alt); border-radius: 2px; }
.calendar-day { position: relative; min-width: 13px; height: 13px; }
.calendar-day.outside-year { visibility: hidden; pointer-events: none; }
.calendar-day.level-1, .legend .level-1 { background: #9be9a8; }
.calendar-day.level-2, .legend .level-2 { background: #40c463; }
.calendar-day.level-3, .legend .level-3 { background: #30a14e; }
.calendar-day.level-4, .legend .level-4 { background: #216e39; }
.calendar-day:hover { z-index: 5; outline: 2px solid var(--vp-c-accent); }
.calendar-day:hover::after { position: absolute; bottom: calc(100% + 8px); left: 50%; z-index: 10; width: max-content; padding: .4rem .55rem; color: #fff; font-size: .7rem; content: attr(data-tip); background: #20252b; border-radius: 6px; transform: translateX(-50%); pointer-events: none; }
.calendar-foot { display: flex; justify-content: space-between; color: var(--vp-c-text-mute); font-size: .72rem; }
.legend { display: flex; align-items: center; gap: 4px; }
.legend i { display: inline-block; width: 11px; height: 11px; }
.archive-list { display: grid; gap: 1.4rem; margin-top: 1.5rem; }
.year-block { overflow: hidden; }
.year-block > header { display: flex; align-items: baseline; gap: 1rem; padding: 1rem 1.4rem; background: var(--vp-c-bg-alt); border-bottom: 1px solid var(--vp-c-border); }
.year-block h2 { margin: 0; font-size: 1.8rem; border: 0; }
.year-block header span, .month-heading span { color: var(--vp-c-text-mute); font-size: .8rem; }
.month-block { padding: 0 1.4rem; }
.month-heading { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--vp-c-border); }
.month-heading h3 { margin: 1rem 0 .65rem; font-size: 1.15rem; }
.article-row { display: grid; grid-template-columns: 4rem minmax(0, 1fr) auto; align-items: center; gap: .8rem; min-height: 3rem; color: var(--vp-c-text); text-decoration: none; border-bottom: 1px dashed var(--vp-c-border); }
.article-row:last-child { border-bottom: 0; }
.article-row:hover .article-name { color: var(--vp-c-accent); transform: translateX(4px); }
.article-row time { color: var(--vp-c-text-mute); font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: .78rem; }
.article-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; transition: color .2s, transform .2s; }
.article-category { padding: .25rem .55rem; color: var(--vp-c-accent); font-size: .68rem; background: color-mix(in srgb, var(--vp-c-accent) 10%, transparent); border-radius: 6px; }
@media (max-width: 600px) {
  .theme-container.no-sidebar .vp-page.archive-page { padding: calc(var(--navbar-height) + 1rem) .7rem 2rem; }
  .contribution-card { padding-inline: .8rem; }
  .month-block { padding: 0 .9rem; }
  .article-row { grid-template-columns: 3.5rem minmax(0, 1fr); }
  .article-category { display: none; }
}
@media (max-width: 760px) {
  .archive-content { display: flex; flex-direction: column; }
  .year-selector { position: static; order: -1; flex-direction: row; width: 100%; overflow-x: auto; padding-bottom: .25rem; }
  .year-selector button { flex: 0 0 auto; min-width: 72px; align-items: center; }
}
</style>
