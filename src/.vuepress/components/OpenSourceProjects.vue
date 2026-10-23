<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

type Platform = "GitHub" | "Gitee";
interface Repository {
  id: number | string; name: string; html_url: string; description: string | null;
  homepage: string | null; language: string | null; stargazers_count: number;
  forks_count: number; topics: string[]; fork: boolean; archived: boolean;
  updated_at: string; pushed_at: string; update_text?: string;
  license: { spdx_id?: string; name?: string } | null; platform: Platform;
}

const GITHUB_API = "https://api.github.com/users/liuchenyang0703/repos?per_page=100&sort=updated";
const GITEE_API = "https://gitee.com/api/v5/users/liu-chenyang/repos?type=all&sort=updated&direction=desc&page=1&per_page=100";
const CACHE_KEY = "toliucylinux-open-source-projects-v2";
const CACHE_TIME = 30 * 60 * 1000;
const repositories = ref<Repository[]>([]);
const loading = ref(true);
const error = ref("");
const keyword = ref("");
const platform = ref("ALL");
const language = ref("ALL");
const projectType = ref("ALL");
const sortBy = ref("updated");
const refreshedAt = ref("");

const formatDate = (value: string) => value ? new Intl.DateTimeFormat("zh-CN", {
  year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date(value)) : "暂无日期";
const projectMark = (name: string) => name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "").slice(0, 2).toUpperCase() || "OS";
const projectHue = (name: string) => [...name].reduce((total, character) => total + character.charCodeAt(0), 0) % 360;

const readCache = () => {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) ?? "null") as { savedAt: string; data: Repository[] } | null; }
  catch { return null; }
};

const fetchGitHub = async () => {
  const response = await fetch(GITHUB_API, { headers: { Accept: "application/vnd.github+json" } });
  if (!response.ok) throw new Error(response.status === 403 ? "GitHub API 请求次数已达上限" : `GitHub HTTP ${response.status}`);
  const data = await response.json() as Omit<Repository, "platform">[];
  if (!Array.isArray(data)) throw new Error("GitHub 返回的数据格式异常");
  return data.filter((item) => !item.archived).map((item) => ({ ...item, platform: "GitHub" as const }));
};

const fetchGitee = async () => {
  const response = await fetch(GITEE_API, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Gitee API HTTP ${response.status}`);
  const data = await response.json() as Record<string, any>[];
  if (!Array.isArray(data)) throw new Error("Gitee 返回的数据格式异常");
  return data.filter((item) => !item.internal).map((item): Repository => ({
    id: item.id,
    name: item.name,
    html_url: item.html_url,
    description: item.description,
    homepage: item.homepage || null,
    language: item.language || null,
    stargazers_count: Number(item.stargazers_count ?? 0),
    forks_count: Number(item.forks_count ?? 0),
    topics: Array.isArray(item.topics) ? item.topics : [],
    fork: Boolean(item.fork),
    archived: false,
    updated_at: item.updated_at || "",
    pushed_at: item.pushed_at || item.updated_at || "",
    license: item.license ? { name: item.license } : null,
    platform: "Gitee",
  }));
};

const loadProjects = async (force = false) => {
  const cached = readCache();
  if (!force && cached?.data?.length && Date.now() - new Date(cached.savedAt).getTime() < CACHE_TIME) {
    repositories.value = cached.data; refreshedAt.value = cached.savedAt; loading.value = false; return;
  }
  loading.value = true; error.value = "";
  const results = await Promise.allSettled([fetchGitHub(), fetchGitee()]);
  const successful = results.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  if (successful.length) {
    repositories.value = successful; refreshedAt.value = new Date().toISOString();
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: refreshedAt.value, data: successful }));
  } else if (cached?.data?.length) {
    repositories.value = cached.data; refreshedAt.value = cached.savedAt;
    error.value = "实时数据暂时不可用，当前显示本地缓存。";
  } else {
    error.value = results.map((result) => result.status === "rejected" ? String(result.reason?.message ?? result.reason) : "").filter(Boolean).join("；") || "项目列表读取失败";
  }
  loading.value = false;
};

const languages = computed(() => [...new Set(repositories.value.map((item) => item.language).filter(Boolean) as string[])].sort());
const totalStars = computed(() => repositories.value.reduce((total, item) => total + item.stargazers_count, 0));
const originalCount = computed(() => repositories.value.filter((item) => !item.fork).length);
const filteredProjects = computed(() => {
  const query = keyword.value.trim().toLowerCase();
  return repositories.value.filter((item) => {
    const text = `${item.name} ${item.description ?? ""} ${item.topics?.join(" ") ?? ""}`.toLowerCase();
    return (!query || text.includes(query)) && (platform.value === "ALL" || item.platform === platform.value)
      && (language.value === "ALL" || item.language === language.value)
      && (projectType.value === "ALL" || (projectType.value === "OWN" ? !item.fork : item.fork));
  }).sort((left, right) => {
    if (sortBy.value === "stars") return right.stargazers_count - left.stargazers_count;
    if (sortBy.value === "name") return left.name.localeCompare(right.name);
    return new Date(right.pushed_at || right.updated_at || 0).getTime() - new Date(left.pushed_at || left.updated_at || 0).getTime();
  });
});
onMounted(() => loadProjects());
</script>

<template>
  <section class="projects-page">
    <div class="project-stats">
      <div><strong>{{ repositories.length }}</strong><span>公开项目</span></div><div><strong>{{ originalCount }}</strong><span>原创项目</span></div>
      <div><strong>{{ repositories.length - originalCount }}</strong><span>Fork 项目</span></div><div><strong>{{ totalStars }}</strong><span>Stars</span></div>
    </div>
    <div class="project-toolbar">
      <label><span>⌕</span><input v-model="keyword" type="search" placeholder="搜索项目名称、简介或标签" /></label>
      <select v-model="platform" aria-label="代码平台"><option value="ALL">全部平台</option><option value="GitHub">GitHub</option><option value="Gitee">Gitee</option></select>
      <select v-model="language" aria-label="编程语言"><option value="ALL">全部语言</option><option v-for="item in languages" :key="item" :value="item">{{ item }}</option></select>
      <select v-model="projectType" aria-label="项目类型"><option value="ALL">全部项目</option><option value="OWN">原创项目</option><option value="FORK">Fork 项目</option></select>
      <select v-model="sortBy" aria-label="排序方式"><option value="updated">最近更新</option><option value="stars">Stars 最多</option><option value="name">名称排序</option></select>
    </div>
    <p v-if="error && repositories.length" class="data-warning">{{ error }}</p>
    <div v-if="loading && !repositories.length" class="project-skeleton"><div v-for="index in 6" :key="index" /></div>
    <div v-else-if="error && !repositories.length" class="project-empty"><strong>项目读取失败</strong><span>{{ error }}</span><button type="button" @click="loadProjects(true)">重新加载</button></div>
    <div v-else-if="filteredProjects.length" class="project-grid">
      <article v-for="repo in filteredProjects" :key="`${repo.platform}-${repo.id}`" class="project-card" :style="{ '--project-hue': projectHue(repo.name) }">
        <a class="project-cover" :href="repo.html_url" target="_blank" rel="noopener noreferrer">
          <span class="cover-pattern">&lt;/&gt;</span>
          <span class="project-avatar">{{ projectMark(repo.name) }}</span>
          <div class="badges"><span :class="['platform-badge', repo.platform.toLowerCase()]">{{ repo.platform }}</span><span v-if="repo.fork" class="fork-badge">Fork</span></div>
        </a>
        <div class="project-content">
          <h3><a :href="repo.html_url" target="_blank" rel="noopener noreferrer">{{ repo.name }} <span>↗</span></a></h3>
          <p class="description">{{ repo.description || "这个项目暂时没有填写简介。" }}</p>
          <div v-if="repo.topics?.length" class="topics"><span v-for="topic in repo.topics.slice(0, 4)" :key="topic">{{ topic }}</span></div>
          <div class="card-meta"><span v-if="repo.language"><i class="language-dot" />{{ repo.language }}</span><span>☆ {{ repo.stargazers_count }}</span><span>⑂ {{ repo.forks_count }}</span><span v-if="repo.license">{{ repo.license.spdx_id || repo.license.name }}</span></div>
          <footer><span>{{ repo.update_text ? `最近更新：${repo.update_text}` : `更新于 ${formatDate(repo.pushed_at || repo.updated_at)}` }}</span><a v-if="repo.homepage" :href="repo.homepage" target="_blank" rel="noopener noreferrer">在线预览 ↗</a></footer>
        </div>
      </article>
    </div>
    <div v-else class="project-empty">没有符合当前筛选条件的项目。</div>
    <p v-if="refreshedAt" class="update-time">项目数据读取于 {{ formatDate(refreshedAt) }}</p>
  </section>
</template>

<style scoped>
.projects-page{--line:color-mix(in srgb,var(--vp-c-text) 15%,transparent);margin:1.5rem 0}.project-empty button{padding:.7rem .9rem;border:1px solid var(--line);border-radius:10px;color:inherit;background:var(--vp-c-bg-elv);font-weight:700;cursor:pointer}
.project-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:.75rem;margin:1rem 0}.project-stats div{display:flex;flex-direction:column;padding:.9rem 1rem;border:1px solid var(--line);border-radius:13px;background:var(--vp-c-bg-elv)}.project-stats strong{color:#2563eb;font-size:1.55rem}.project-stats span{color:var(--vp-c-text-mute);font-size:.78rem}.project-toolbar{display:grid;grid-template-columns:minmax(220px,1fr) repeat(4,auto);gap:.65rem;margin-bottom:1rem}.project-toolbar label{display:flex;align-items:center;gap:.5rem;padding:0 .75rem;border:1px solid var(--line);border-radius:10px;background:var(--vp-c-bg-elv)}.project-toolbar input{width:100%;padding:.7rem 0;border:0;outline:0;color:inherit;background:transparent}.project-toolbar select{padding:0 .7rem;border:1px solid var(--line);border-radius:10px;color:inherit;background:var(--vp-c-bg-elv)}
.project-grid,.project-skeleton{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.project-card{position:relative;display:flex;min-width:0;min-height:310px;flex-direction:column;overflow:hidden;border:1px solid var(--line);border-radius:18px;background:var(--vp-c-bg-elv);box-shadow:0 8px 25px rgba(15,23,42,.08);transition:transform .25s ease,box-shadow .25s ease}.project-card:hover{transform:translateY(-6px);box-shadow:0 15px 36px rgba(15,23,42,.16)}.project-cover{position:relative;display:flex;height:112px;align-items:center;justify-content:center;overflow:hidden;color:#fff;background:linear-gradient(135deg,hsl(var(--project-hue) 72% 56%),hsl(calc(var(--project-hue) + 65) 75% 46%));text-decoration:none}.project-cover::after{position:absolute;inset:0;background:linear-gradient(135deg,transparent,rgba(255,255,255,.17));content:""}.cover-pattern{position:absolute;right:-8px;bottom:-25px;color:rgba(255,255,255,.13);font-size:4.8rem;font-weight:900;transform:rotate(-8deg)}.project-avatar{z-index:1;display:grid;width:64px;height:64px;place-items:center;border:3px solid rgba(255,255,255,.8);border-radius:50%;color:hsl(var(--project-hue) 70% 40%);background:rgba(255,255,255,.94);box-shadow:0 7px 18px rgba(0,0,0,.2);font-size:1.15rem;font-weight:900;transition:transform .45s ease}.project-card:hover .project-avatar{transform:rotate(8deg) scale(1.08)}.badges{position:absolute;z-index:2;top:.65rem;right:.65rem;display:flex;gap:.35rem}.fork-badge,.platform-badge{padding:.22rem .5rem;border:1px solid rgba(255,255,255,.34);border-radius:999px;color:#fff!important;background:rgba(15,23,42,.3)!important;backdrop-filter:blur(6px);font-size:.66rem;font-weight:800}.project-content{display:flex;min-height:174px;flex:1;flex-direction:column;padding:1rem}.project-card h3{margin:0 0 .45rem;border:0;font-size:1.02rem}.project-card h3 a,.project-card footer a{color:var(--vp-c-text);text-decoration:none}.project-card h3 a span{color:#2563eb}.description{display:-webkit-box;min-height:2.7rem;flex:1;overflow:hidden;color:var(--vp-c-text-mute);font-size:.82rem;line-height:1.55;-webkit-box-orient:vertical;-webkit-line-clamp:2}.topics{display:flex;overflow:hidden;gap:.3rem;margin-top:.55rem}.topics span{flex:0 0 auto;padding:.15rem .4rem;border-radius:999px;color:#2563eb;background:rgba(37,99,235,.09);font-size:.63rem}.card-meta{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:.7rem;color:var(--vp-c-text-mute);font-size:.72rem}.language-dot{display:inline-block;width:8px;height:8px;margin-right:.3rem;border-radius:50%;background:#f59e0b}.project-card footer{display:flex;justify-content:space-between;gap:.5rem;margin-top:.65rem;padding-top:.65rem;border-top:1px solid var(--line);color:var(--vp-c-text-mute);font-size:.68rem}.project-skeleton div{height:310px;border-radius:18px;background:linear-gradient(90deg,var(--vp-c-bg-soft),var(--vp-c-bg-alt),var(--vp-c-bg-soft));background-size:220% 100%;animation:shimmer 1.2s infinite}.project-empty{display:flex;align-items:center;flex-direction:column;gap:.7rem;padding:3rem 1rem;border:1px dashed var(--line);border-radius:14px;color:var(--vp-c-text-mute)}.data-warning{padding:.65rem .8rem;border-radius:8px;color:#9a6700;background:rgba(245,158,11,.1);font-size:.8rem}.update-time{color:var(--vp-c-text-mute);font-size:.72rem;text-align:right}.rotating{display:inline-block;animation:rotate .8s linear infinite}:global(.open-source-page .vp-page){max-width:1500px!important}:global(.open-source-page .theme-hope-content){max-width:1380px!important}@keyframes rotate{to{transform:rotate(360deg)}}@keyframes shimmer{to{background-position:-220% 0}}
@media(max-width:1100px){.project-grid,.project-skeleton{grid-template-columns:repeat(2,minmax(0,1fr))}.project-toolbar{grid-template-columns:1fr 1fr}.project-toolbar label{grid-column:1/-1}}@media(max-width:760px){.project-stats{grid-template-columns:repeat(2,1fr)}.project-grid,.project-skeleton{grid-template-columns:1fr}}
</style>
