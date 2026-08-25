<script setup lang="ts"></script>

<template>
    <div class="panel">
        <div class="container">
            <section class="grid">
                <span class="text">
                    本站总访问量
                    <span id="busuanzi_value_site_pv" class="font-bold">--</span> 次
                </span>
                <img src="https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202608251148677.GIF" alt="heart" width="150" height="150" />
                <span class="text">
                    您是第
                    <span id="busuanzi_value_site_uv" class="font-bold">--</span> 位访问者
                </span>
            </section>
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
</style>