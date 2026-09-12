<script setup lang="ts">
import { computed, ref, watch } from "vue";

interface ActivityDay {
  date: string;
  count: number;
}

declare const __GIT_COMMIT_ACTIVITY__: ActivityDay[];

const activity = __GIT_COMMIT_ACTIVITY__;
const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
const monthNames = Array.from({ length: 12 }, (_, index) => `${index + 1}月`);
const dayMs = 86_400_000;

const availableYears = computed(() =>
  [...new Set(activity.map(({ date }) => Number(date.slice(0, 4))))]
    .filter(Number.isFinite)
    .sort((a, b) => b - a),
);
const selectedYear = ref<number | null>(null);

watch(availableYears, (years) => {
  if (years.length && !years.includes(selectedYear.value as number)) selectedYear.value = years[0];
}, { immediate: true });

const calendar = computed(() => {
  const year = selectedYear.value ?? new Date().getFullYear();
  const counts = new Map(activity.filter(({ date }) => date.startsWith(`${year}-`)).map(({ date, count }) => [date, count]));
  const total = [...counts.values()].reduce((sum, count) => sum + count, 0);
  const start = new Date(year, 0, 1);
  start.setDate(start.getDate() - start.getDay());
  const end = new Date(year, 11, 31);
  end.setDate(end.getDate() + 6 - end.getDay());
  const weekCount = Math.round((end.getTime() - start.getTime()) / dayMs / 7) + 1;

  const weeks = Array.from({ length: weekCount }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const value = new Date(start.getTime() + (week * 7 + day) * dayMs);
      const date = `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
      const count = counts.get(date) ?? 0;
      return {
        date,
        count,
        inYear: value.getFullYear() === year,
        level: count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : count <= 6 ? 3 : 4,
      };
    }),
  );

  const months: { label: string; column: number }[] = [];
  let previousMonth = -1;
  weeks.forEach((week, column) => {
    const middle = new Date(`${week[0].date}T00:00:00`);
    middle.setDate(middle.getDate() + 3);
    if (middle.getFullYear() === year && middle.getMonth() !== previousMonth) {
      months.push({ label: monthNames[middle.getMonth()], column });
      previousMonth = middle.getMonth();
    }
  });

  return { year, total, weeks, months };
});
</script>

<template>
  <section class="git-activity" aria-label="Git 提交活跃度">
    <header class="activity-header">
      <div>
        <strong>Git 提交记录</strong>
        <span>{{ calendar.year }} 年共提交 {{ calendar.total }} 次</span>
      </div>
      <select v-if="availableYears.length > 1" v-model="selectedYear" aria-label="选择提交年份">
        <option v-for="year in availableYears" :key="year" :value="year">{{ year }} 年</option>
      </select>
    </header>

    <div v-if="activity.length" class="calendar-scroll">
      <div class="calendar-inner">
        <div class="month-row" :style="{ gridTemplateColumns: `repeat(${calendar.weeks.length}, 13px)` }">
          <span v-for="month in calendar.months" :key="`${month.label}-${month.column}`" :style="{ gridColumn: `${month.column + 1} / span 4` }">{{ month.label }}</span>
        </div>
        <div class="calendar-body">
          <div class="weekday-row"><span v-for="day in weekdays" :key="day">{{ day }}</span></div>
          <div class="week-grid" :style="{ gridTemplateColumns: `repeat(${calendar.weeks.length}, 13px)` }">
            <div v-for="(week, index) in calendar.weeks" :key="index" class="week-column">
              <span
                v-for="day in week"
                :key="day.date"
                class="calendar-day"
                :class="day.inYear ? `level-${day.level}` : 'outside-year'"
                :data-tip="day.inYear ? `${day.date}：提交 ${day.count} 次` : undefined"
                :aria-label="day.inYear ? `${day.date}，提交 ${day.count} 次` : undefined"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="empty-tip">当前构建环境未读取到 Git 提交记录</p>

    <footer class="activity-footer">
      <span>数据来自当前分支 Git 历史</span>
      <span class="legend">少<i class="level-0"/><i class="level-1"/><i class="level-2"/><i class="level-3"/><i class="level-4"/>多</span>
    </footer>
  </section>
</template>

<style scoped lang="scss">
.git-activity { margin: 1.2rem 0 2rem; padding: 1.15rem 1.25rem .85rem; overflow: hidden; background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); border-radius: 14px; box-shadow: 0 8px 28px rgba(24, 54, 40, .07); }
.activity-header, .activity-footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.activity-header div { display: flex; flex-direction: column; gap: .15rem; }
.activity-header strong { font-size: 1rem; }
.activity-header span, .activity-footer { color: var(--vp-c-text-mute); font-size: .72rem; }
.activity-header select { padding: .35rem .6rem; color: var(--vp-c-text); background: var(--vp-c-bg-alt); border: 1px solid var(--vp-c-border); border-radius: 7px; }
.calendar-scroll { overflow-x: auto; padding: 1.6rem 0 .65rem; }
.calendar-inner { width: max-content; min-width: 790px; margin-inline: auto; }
.month-row { display: grid; gap: 3px; width: max-content; margin-left: 27px; color: var(--vp-c-text-mute); font-size: .65rem; line-height: 1; }
.month-row span { min-width: 0; padding-bottom: .25rem; overflow: hidden; white-space: nowrap; }
.calendar-body { display: flex; gap: 7px; }
.weekday-row, .week-column { display: grid; grid-template-rows: repeat(7, 12px); gap: 3px; }
.weekday-row { width: 20px; color: var(--vp-c-text-mute); font-size: .6rem; line-height: 12px; }
.weekday-row span:nth-child(even) { visibility: hidden; }
.week-grid { display: grid; gap: 3px; }
.calendar-day, .legend i { background: var(--vp-c-bg-alt); border-radius: 2px; }
.calendar-day { position: relative; min-width: 12px; height: 12px; }
.outside-year { visibility: hidden; }
.level-1 { background: #9be9a8 !important; }.level-2 { background: #40c463 !important; }.level-3 { background: #30a14e !important; }.level-4 { background: #216e39 !important; }
.calendar-day:hover { z-index: 2; outline: 2px solid var(--vp-c-accent); }
.calendar-day:hover::after { position: absolute; bottom: calc(100% + 7px); left: 50%; z-index: 5; width: max-content; padding: .35rem .5rem; color: #fff; font-size: .68rem; content: attr(data-tip); background: #20252b; border-radius: 5px; transform: translateX(-50%); pointer-events: none; }
.activity-footer { margin-top: .25rem; }
.legend { display: flex; align-items: center; gap: 4px; }
.legend i { display: inline-block; width: 10px; height: 10px; }
.empty-tip { color: var(--vp-c-text-mute); font-size: .8rem; text-align: center; }
@media (max-width: 600px) { .git-activity { padding-inline: .8rem; }.activity-footer > span:first-child { display: none; } }
</style>
