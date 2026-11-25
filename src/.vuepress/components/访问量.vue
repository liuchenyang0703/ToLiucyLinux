<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

interface Counts {
    site_pv: number;
    site_uv: number;
}

const cacheKey = "toliucylinux-visitor-counts";
const counts = ref<Counts>();
const status = ref<"loading" | "ready" | "failed" | "regressed">("loading");
let cancelRequest: (() => void) | undefined;

const isCounts = (value: unknown): value is Counts => {
    if (!value || typeof value !== "object") return false;
    const { site_pv, site_uv } = value as Counts;
    return Number.isSafeInteger(site_pv) && site_pv >= 0
        && Number.isSafeInteger(site_uv) && site_uv >= 0;
};

const readCache = (): Counts | undefined => {
    try {
        const cached: unknown = JSON.parse(localStorage.getItem(cacheKey) ?? "null");
        return isCounts(cached) ? cached : undefined;
    } catch {
        return undefined;
    }
};

const loadBusuanzi = () => {
    cancelRequest?.();
    status.value = "loading";
    const script = document.createElement("script");
    const callback = `BusuanziCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const callbacks = window as unknown as Record<string, (value: unknown) => void>;
    const cleanup = () => {
        window.clearTimeout(timeout);
        script.remove();
        delete callbacks[callback];
        cancelRequest = undefined;
    };
    const fail = () => {
        cleanup();
        status.value = "failed";
    };
    const timeout = window.setTimeout(fail, 8000);
    cancelRequest = cleanup;
    callbacks[callback] = (value) => {
        if (!isCounts(value)) {
            fail();
            return;
        }
        cleanup();
        const previous = readCache() ?? counts.value;
        if (previous && (value.site_pv < previous.site_pv || value.site_uv < previous.site_uv)) {
            counts.value = previous;
            status.value = "regressed";
            console.warn("[访问量] 不蒜子返回的累计统计回落", { previous, received: value });
            return;
        }
        counts.value = value;
        status.value = "ready";
        try {
            localStorage.setItem(cacheKey, JSON.stringify(value));
        } catch {
            // The live counts remain available when storage is blocked.
        }
    };
    script.async = true;
    script.referrerPolicy = "no-referrer-when-downgrade";
    script.src = `https://busuanzi.ibruce.info/busuanzi?jsonpCallback=${callback}`;
    script.onerror = fail;
    document.head.appendChild(script);
};

onMounted(() => {
    counts.value = readCache();
    loadBusuanzi();
});

onBeforeUnmount(() => cancelRequest?.());
</script>

<template>
    <div class="panel">
        <div class="container">
            <section class="grid">
                <span v-if="counts" class="text">
                    本站总访问量
                    <span class="font-bold">{{ counts.site_pv }}</span> 次
                </span>
                <span v-else class="text" role="status">{{ status === "loading" ? "正在读取访问量…" : "访问量暂时无法读取" }}</span>
                <img
                    class="heart-image"
                    src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608251148677.GIF"
                    alt="访问量统计装饰图"
                    width="150"
                    height="150"
                />
                <span v-if="counts" class="text">
                    累计访客
                    <span class="font-bold">{{ counts.site_uv }}</span> 人
                </span>
                <span v-else aria-hidden="true"></span>
            </section>
            <div v-if="status === 'failed' || status === 'regressed'" class="retry">
                <span v-if="status === 'regressed'" role="status">统计服务返回了更低的数字，暂显示上次数据。</span>
                <span v-else-if="counts" role="status">当前显示上次读取的统计。</span>
                <button type="button" @click="loadBusuanzi">重试</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.panel {
    margin-top: 12px;
    margin-bottom: 8px;
}

.container {
    background-color: var(--vp-c-bg-soft);
    border-radius: 8px;
    width: 100%;
    min-height: 32px;
    max-width: 1152px;
    margin-left: auto;
    margin-right: auto;
}

.grid {
    font-weight: 500;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 12px;
    padding-right: 12px;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    display: grid;
}

.text {
    font-size: 0.875rem;
    line-height: 1.25rem;
}

.retry {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding-bottom: 0.75rem;
    font-size: 0.875rem;
}

.heart-image {
    display: block;
    width: min(150px, 100%);
    height: auto;
    aspect-ratio: 1 / 1;
    object-fit: contain;
}
</style>
