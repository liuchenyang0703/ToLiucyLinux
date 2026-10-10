<script setup lang="ts">
import SparkMD5 from "spark-md5";
import { computed, ref } from "vue";

type FileStatus = "waiting" | "calculating" | "done" | "error";

interface FileResult {
  id: string;
  file: File;
  name: string;
  path: string;
  size: number;
  md5: string;
  progress: number;
  status: FileStatus;
  error: string;
}

interface TreeNode {
  name: string;
  path: string;
  type: "folder" | "file";
  children: TreeNode[];
  result?: FileResult;
}

interface TreeRow extends TreeNode {
  depth: number;
}

const CHUNK_SIZE = 2 * 1024 * 1024;

const fileInput = ref<HTMLInputElement>();
const folderInput = ref<HTMLInputElement>();
const results = ref<FileResult[]>([]);
const sourceType = ref<"file" | "folder" | "">("");
const isCalculating = ref(false);
const isDragging = ref(false);
const expectedMd5 = ref("");
const copiedId = ref("");
let calculationToken = 0;

const normalizedExpectedMd5 = computed(() => expectedMd5.value.trim().toLowerCase());
const expectedMd5Valid = computed(() => !normalizedExpectedMd5.value || /^[a-f0-9]{32}$/u.test(normalizedExpectedMd5.value));
const completedCount = computed(() => results.value.filter((item) => item.status === "done").length);
const failedCount = computed(() => results.value.filter((item) => item.status === "error").length);
const totalSize = computed(() => results.value.reduce((sum, item) => sum + item.size, 0));
const matchCount = computed(() => {
  if (!expectedMd5Valid.value || !normalizedExpectedMd5.value) return 0;
  return results.value.filter((item) => item.md5 === normalizedExpectedMd5.value).length;
});

const overallProgress = computed(() => {
  if (!results.value.length) return 0;
  if (!totalSize.value) {
    return Math.round((completedCount.value / results.value.length) * 100);
  }

  const processed = results.value.reduce((sum, item) => {
    if (item.status === "done" || item.status === "error") return sum + item.size;
    return sum + item.size * (item.progress / 100);
  }, 0);
  return Math.min(100, Math.round((processed / totalSize.value) * 100));
});

const treeRows = computed<TreeRow[]>(() => {
  const root: TreeNode = { name: "", path: "", type: "folder", children: [] };

  results.value.forEach((result) => {
    const parts = result.path.split("/").filter(Boolean);
    let parent = root;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;
      const currentPath = parts.slice(0, index + 1).join("/");
      let node = parent.children.find((child) => child.name === part && child.type === (isFile ? "file" : "folder"));

      if (!node) {
        node = {
          name: part,
          path: currentPath,
          type: isFile ? "file" : "folder",
          children: [],
          result: isFile ? result : undefined,
        };
        parent.children.push(node);
      }
      parent = node;
    });
  });

  const rows: TreeRow[] = [];
  const walk = (nodes: TreeNode[], depth: number) => {
    nodes
      .sort((left, right) => {
        if (left.type !== right.type) return left.type === "folder" ? -1 : 1;
        return left.name.localeCompare(right.name, "zh-CN", { numeric: true });
      })
      .forEach((node) => {
        rows.push({ ...node, depth });
        if (node.children.length) walk(node.children, depth + 1);
      });
  };

  walk(root.children, 0);
  return rows;
});

const formatSize = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;
  return `${value.toFixed(index === 0 || value >= 100 ? 0 : value >= 10 ? 1 : 2)} ${units[index]}`;
};

const resetInputs = () => {
  if (fileInput.value) fileInput.value.value = "";
  if (folderInput.value) folderInput.value.value = "";
};

const calculateFile = async (item: FileResult, token: number) => {
  const spark = new SparkMD5.ArrayBuffer();
  const chunkCount = Math.max(1, Math.ceil(item.size / CHUNK_SIZE));
  item.status = "calculating";
  item.progress = 0;

  for (let index = 0; index < chunkCount; index += 1) {
    if (token !== calculationToken) return false;
    const start = index * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, item.size);
    const buffer = await item.file.slice(start, end).arrayBuffer();
    if (token !== calculationToken) return false;
    spark.append(buffer);
    item.progress = Math.round(((index + 1) / chunkCount) * 100);
  }

  item.md5 = spark.end();
  item.status = "done";
  return true;
};

const calculateAll = async (token: number) => {
  isCalculating.value = true;

  for (const item of results.value) {
    if (token !== calculationToken) return;
    try {
      const finished = await calculateFile(item, token);
      if (!finished) return;
    } catch (error) {
      item.status = "error";
      item.error = error instanceof Error ? error.message : "文件读取失败";
      item.progress = 100;
    }
  }

  if (token === calculationToken) isCalculating.value = false;
};

const loadFiles = (files: File[], type: "file" | "folder") => {
  if (!files.length) return;
  calculationToken += 1;
  const token = calculationToken;
  isCalculating.value = false;
  sourceType.value = type;
  expectedMd5.value = "";
  copiedId.value = "";

  results.value = files
    .map((file, index) => {
      const relativePath = file.webkitRelativePath || file.name;
      return {
        id: `${index}-${relativePath}-${file.size}-${file.lastModified}`,
        file,
        name: file.name,
        path: relativePath.replaceAll("\\", "/"),
        size: file.size,
        md5: "",
        progress: 0,
        status: "waiting" as FileStatus,
        error: "",
      };
    })
    .sort((left, right) => left.path.localeCompare(right.path, "zh-CN", { numeric: true }));

  resetInputs();
  void calculateAll(token);
};

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  loadFiles(Array.from(input.files ?? []), "file");
};

const onFolderChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  loadFiles(Array.from(input.files ?? []), "folder");
};

const onDrop = (event: DragEvent) => {
  isDragging.value = false;
  const files = Array.from(event.dataTransfer?.files ?? []);
  if (files.length) loadFiles(files, "file");
};

const clearResults = () => {
  calculationToken += 1;
  results.value = [];
  sourceType.value = "";
  expectedMd5.value = "";
  copiedId.value = "";
  isCalculating.value = false;
  resetInputs();
};

const writeClipboard = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
};

const copyMd5 = async (item: FileResult) => {
  if (!item.md5) return;
  await writeClipboard(item.md5);
  copiedId.value = item.id;
  window.setTimeout(() => {
    if (copiedId.value === item.id) copiedId.value = "";
  }, 1200);
};

const copyAll = async () => {
  const content = results.value
    .filter((item) => item.status === "done")
    .map((item) => `${item.md5}  ${item.path}`)
    .join("\n");
  if (!content) return;
  await writeClipboard(content);
  copiedId.value = "all";
  window.setTimeout(() => {
    if (copiedId.value === "all") copiedId.value = "";
  }, 1200);
};

const exportResults = () => {
  const content = results.value
    .filter((item) => item.status === "done")
    .map((item) => `${item.md5}  ${item.path}`)
    .join("\n");
  if (!content) return;

  const blob = new Blob([`${content}\n`], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  const timestamp = new Date().toISOString().replaceAll(/[-:TZ.]/gu, "").slice(0, 14);
  link.href = URL.createObjectURL(blob);
  link.download = `md5-results-${timestamp}.txt`;
  link.click();
  URL.revokeObjectURL(link.href);
};
</script>

<template>
  <section class="md5-tool">
    <header class="tool-header">
      <div>
        <small>LOCAL FILE HASH</small>
        <h2>MD5 校验工具</h2>
        <p>本地分块计算文件 MD5，支持文件夹目录树展示。</p>
      </div>
      <span>文件不会上传</span>
    </header>

    <div
      class="upload-zone"
      :class="{ dragging: isDragging }"
      @dragenter.prevent="isDragging = true"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
    >
      <div class="upload-icon" aria-hidden="true">#</div>
      <div class="upload-copy">
        <h3>选择需要计算的内容</h3>
        <p>可以拖入文件，也可以通过按钮选择多个文件或完整文件夹。</p>
      </div>
      <div class="upload-actions">
        <button type="button" class="primary" @click="fileInput?.click()">选择文件</button>
        <button type="button" @click="folderInput?.click()">选择文件夹</button>
      </div>
      <input ref="fileInput" class="hidden-input" type="file" multiple @change="onFileChange">
      <input ref="folderInput" class="hidden-input" type="file" multiple webkitdirectory directory @change="onFolderChange">
    </div>

    <template v-if="results.length">
      <section class="summary-panel">
        <div class="summary-main">
          <div><small>{{ sourceType === "folder" ? "文件夹内容" : "已选择文件" }}</small><strong>{{ results.length }}</strong><span>个文件</span></div>
          <div><small>总大小</small><strong>{{ formatSize(totalSize) }}</strong></div>
          <div><small>计算进度</small><strong>{{ overallProgress }}%</strong><span>{{ completedCount }}/{{ results.length }}</span></div>
        </div>
        <div class="progress-track"><span :style="{ width: `${overallProgress}%` }"></span></div>
      </section>

      <section class="verify-panel">
        <label>
          <span>目标 MD5（可选，用于对比校验）</span>
          <input v-model="expectedMd5" type="text" maxlength="32" spellcheck="false" placeholder="输入 32 位 MD5 值">
        </label>
        <p v-if="!expectedMd5Valid" class="verify-message invalid">请输入由数字和 a-f 组成的 32 位 MD5。</p>
        <p v-else-if="normalizedExpectedMd5 && completedCount" class="verify-message" :class="matchCount ? 'matched' : 'unmatched'">
          {{ matchCount ? `已找到 ${matchCount} 个 MD5 匹配的文件` : "当前已完成文件中没有匹配项" }}
        </p>
      </section>

      <section class="result-panel">
        <div class="result-header">
          <div><small>FILE TREE</small><h3>文件校验结果</h3></div>
          <div class="result-actions">
            <button type="button" :disabled="!completedCount" @click="copyAll">{{ copiedId === "all" ? "已复制" : "复制全部" }}</button>
            <button type="button" :disabled="!completedCount" @click="exportResults">导出结果</button>
            <button type="button" class="danger" @click="clearResults">清空</button>
          </div>
        </div>

        <div class="tree-list">
          <div
            v-for="row in treeRows"
            :key="`${row.type}-${row.path}`"
            class="tree-row"
            :class="[row.type, { matched: row.result?.md5 && row.result.md5 === normalizedExpectedMd5 }]"
            :style="{ '--tree-depth': row.depth }"
          >
            <template v-if="row.type === 'folder'">
              <span class="node-icon folder-icon" aria-hidden="true"></span>
              <strong class="node-name">{{ row.name }}</strong>
            </template>
            <template v-else-if="row.result">
              <span class="node-icon file-icon" aria-hidden="true"></span>
              <span class="node-name" :title="row.result.path">{{ row.name }}</span>
              <span class="file-size">{{ formatSize(row.result.size) }}</span>
              <span v-if="row.result.status === 'waiting'" class="status waiting">等待计算</span>
              <span v-else-if="row.result.status === 'calculating'" class="status calculating">计算中 {{ row.result.progress }}%</span>
              <span v-else-if="row.result.status === 'error'" class="status error" :title="row.result.error">读取失败</span>
              <code v-else class="md5-value">{{ row.result.md5 }}</code>
              <span v-if="row.result.md5 && normalizedExpectedMd5 && row.result.md5 === normalizedExpectedMd5" class="match-badge">匹配</span>
              <button v-if="row.result.md5" type="button" class="copy-button" @click="copyMd5(row.result)">{{ copiedId === row.result.id ? "已复制" : "复制" }}</button>
            </template>
          </div>
        </div>

        <p v-if="failedCount" class="failed-tip">有 {{ failedCount }} 个文件读取失败，请重新选择后再试。</p>
        <p v-else-if="isCalculating" class="calculating-tip">正在依次计算文件，请保持当前页面开启。</p>
      </section>
    </template>
  </section>
</template>

<style scoped lang="scss">
.md5-tool{margin:1rem 0 2rem;padding:clamp(1rem,3vw,1.7rem);background:linear-gradient(145deg,color-mix(in srgb,var(--vp-c-accent) 7%,var(--vp-c-bg)),var(--vp-c-bg) 45%);border:1px solid var(--vp-c-border);border-radius:18px;box-shadow:0 12px 36px rgba(30,65,90,.08)}.tool-header{display:flex;justify-content:space-between;gap:1rem;margin-bottom:1.2rem}.tool-header small,.result-header small{color:var(--vp-c-accent);font-size:.67rem;font-weight:700;letter-spacing:.15em}.tool-header h2{margin:.2rem 0;padding:0;border:0;font-size:clamp(1.35rem,3vw,1.85rem)}.tool-header p{margin:0;color:var(--vp-c-text-mute);font-size:.82rem}.tool-header>span{align-self:flex-start;padding:.4rem .65rem;color:var(--vp-c-accent);font-size:.68rem;background:color-mix(in srgb,var(--vp-c-accent) 10%,transparent);border-radius:999px}.upload-zone{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:1rem;align-items:center;padding:1.15rem;background:var(--vp-c-bg);border:1px dashed color-mix(in srgb,var(--vp-c-accent) 48%,var(--vp-c-border));border-radius:14px;transition:.2s ease}.upload-zone.dragging{background:color-mix(in srgb,var(--vp-c-accent) 8%,var(--vp-c-bg));border-color:var(--vp-c-accent);transform:scale(1.005)}.upload-icon{display:grid;place-items:center;width:48px;height:48px;color:#fff;font-size:1.35rem;font-weight:800;background:linear-gradient(135deg,var(--vp-c-accent),color-mix(in srgb,var(--vp-c-accent) 58%,#9f7aea));border-radius:13px;box-shadow:0 8px 18px color-mix(in srgb,var(--vp-c-accent) 22%,transparent)}.upload-copy h3{margin:0 0 .25rem;padding:0;border:0;font-size:1rem}.upload-copy p{margin:0;color:var(--vp-c-text-mute);font-size:.72rem}.upload-actions{display:flex;gap:.5rem}.upload-actions button,.result-actions button{padding:.5rem .72rem;color:var(--vp-c-text);font:inherit;font-size:.72rem;font-weight:650;cursor:pointer;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:8px}.upload-actions .primary{color:#fff;background:var(--vp-c-accent);border-color:var(--vp-c-accent)}.hidden-input{display:none}.summary-panel,.verify-panel,.result-panel{margin-top:1rem;padding:1rem;background:var(--vp-c-bg);border:1px solid var(--vp-c-border);border-radius:14px}.summary-main{display:grid;grid-template-columns:repeat(3,1fr);gap:.7rem}.summary-main>div{display:flex;gap:.35rem;align-items:baseline;min-width:0;padding:.6rem .7rem;background:var(--vp-c-bg-alt);border-radius:9px}.summary-main small{margin-right:auto;color:var(--vp-c-text-mute);font-size:.67rem}.summary-main strong{font-size:.95rem}.summary-main span{color:var(--vp-c-text-mute);font-size:.65rem}.progress-track{overflow:hidden;height:6px;margin-top:.75rem;background:var(--vp-c-bg-alt);border-radius:99px}.progress-track span{display:block;height:100%;background:linear-gradient(90deg,var(--vp-c-accent),color-mix(in srgb,var(--vp-c-accent) 55%,#66d9c4));border-radius:inherit;transition:width .2s ease}.verify-panel{display:flex;gap:1rem;align-items:flex-end}.verify-panel label{display:flex;flex:1;flex-direction:column;gap:.35rem;color:var(--vp-c-text-mute);font-size:.7rem}.verify-panel input{box-sizing:border-box;width:100%;height:42px;padding:0 .75rem;color:var(--vp-c-text);font:600 .8rem/1.4 monospace;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:8px}.verify-panel input:focus{outline:2px solid color-mix(in srgb,var(--vp-c-accent) 30%,transparent);border-color:var(--vp-c-accent)}.verify-message{min-width:180px;margin:0;padding:.58rem .7rem;font-size:.7rem;border-radius:8px}.verify-message.invalid,.verify-message.unmatched{color:#d33;background:rgba(220,50,50,.08)}.verify-message.matched{color:#17834a;background:rgba(35,170,95,.1)}.result-header{display:flex;justify-content:space-between;gap:1rem;align-items:center;margin-bottom:.8rem}.result-header h3{margin:.12rem 0 0;padding:0;border:0;font-size:1rem}.result-actions{display:flex;gap:.45rem}.result-actions button:disabled{cursor:not-allowed;opacity:.5}.result-actions .danger{color:#d33}.tree-list{overflow:hidden;border:1px solid var(--vp-c-border);border-radius:10px}.tree-row{--indent:calc(var(--tree-depth) * 20px);position:relative;display:flex;gap:.55rem;align-items:center;min-height:42px;padding:.45rem .65rem .45rem calc(.65rem + var(--indent));border-bottom:1px solid color-mix(in srgb,var(--vp-c-border) 65%,transparent)}.tree-row:last-child{border-bottom:0}.tree-row::before{content:"";position:absolute;top:0;bottom:0;left:calc(.82rem + var(--indent) - 12px);width:1px;background:color-mix(in srgb,var(--vp-c-border) 70%,transparent)}.tree-row.folder{background:color-mix(in srgb,var(--vp-c-accent) 4%,var(--vp-c-bg-alt))}.tree-row.file.matched{background:rgba(35,170,95,.07)}.node-icon{position:relative;z-index:1;flex:0 0 auto;width:17px;height:17px}.folder-icon{background:color-mix(in srgb,#f2b84b 72%,var(--vp-c-bg));border-radius:3px 3px 4px 4px}.folder-icon::before{content:"";position:absolute;top:-3px;left:1px;width:8px;height:4px;background:inherit;border-radius:3px 3px 0 0}.file-icon{box-sizing:border-box;background:var(--vp-c-bg);border:1px solid color-mix(in srgb,var(--vp-c-accent) 38%,var(--vp-c-border));border-radius:3px}.file-icon::after{content:"";position:absolute;right:2px;bottom:3px;left:2px;height:1px;background:var(--vp-c-border);box-shadow:0 -3px var(--vp-c-border)}.node-name{overflow:hidden;min-width:90px;font-size:.76rem;text-overflow:ellipsis;white-space:nowrap}.folder .node-name{font-weight:700}.file-size{flex:0 0 auto;color:var(--vp-c-text-mute);font-size:.62rem}.status{margin-left:auto;font-size:.67rem}.status.waiting{color:var(--vp-c-text-mute)}.status.calculating{color:var(--vp-c-accent)}.status.error{color:#d33}.md5-value{overflow:hidden;margin-left:auto;padding:.22rem .4rem;color:var(--vp-c-text);font-size:.68rem;text-overflow:ellipsis;white-space:nowrap;background:var(--vp-c-bg-alt);border-radius:5px;user-select:all}.match-badge{padding:.2rem .38rem;color:#17834a;font-size:.6rem;font-weight:700;background:rgba(35,170,95,.1);border-radius:99px}.copy-button{flex:0 0 auto;padding:.3rem .45rem;color:var(--vp-c-accent);font:inherit;font-size:.65rem;font-weight:650;cursor:pointer;background:transparent;border:1px solid color-mix(in srgb,var(--vp-c-accent) 30%,var(--vp-c-border));border-radius:6px}.failed-tip,.calculating-tip{margin:.75rem 0 0;color:var(--vp-c-text-mute);font-size:.68rem;text-align:center}.failed-tip{color:#d33}@media(max-width:760px){.tool-header>span{display:none}.upload-zone{grid-template-columns:auto minmax(0,1fr)}.upload-actions{grid-column:1/-1}.upload-actions button{flex:1}.summary-main{grid-template-columns:1fr}.verify-panel{align-items:stretch;flex-direction:column}.verify-message{min-width:0}.result-header{align-items:flex-start;flex-direction:column}.result-actions{width:100%}.result-actions button{flex:1}.tree-row.file{flex-wrap:wrap}.node-name{flex:1}.md5-value{order:5;width:calc(100% - var(--indent) - 32px);margin-left:22px}.copy-button,.match-badge{order:6}}@media(max-width:430px){.md5-tool{padding:.8rem}.upload-zone{grid-template-columns:1fr;text-align:center}.upload-icon{margin:auto}.upload-actions{flex-direction:column}.tree-row{padding-right:.45rem}.file-size{display:none}}
</style>
