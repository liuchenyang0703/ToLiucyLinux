<template>
    <div class="love-timer">
        <div class="avatars">
            <div class="avatar-wrapper">
                <img src="https://liuchenyang.top/picture.jpg" alt="Avatar 1" class="avatar left-avatar" />
            </div>
            <div class="heart-container">
                <div class="heart-beat">❤️</div>
                <div class="heart-particles"></div>
            </div>
            <div class="avatar-wrapper">
                <img src="https://liuchenyang.top/picture.jpg" alt="Avatar 2" class="avatar right-avatar" />
            </div>
        </div>
        <h2 class="title-animate">我们已经在一起</h2>
        <div class="time-blocks">
            <div class="time-block">
                <span class="number">{{ timeObj.days }}</span>
                <span class="label">天</span>
            </div>
            <div class="time-block">
                <span class="number">{{ timeObj.hours }}</span>
                <span class="label">时</span>
            </div>
            <div class="time-block">
                <span class="number">{{ timeObj.minutes }}</span>
                <span class="label">分</span>
            </div>
            <div class="time-block">
                <span class="number">{{ timeObj.seconds }}</span>
                <span class="label">秒</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface TimeObject {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const startDate = new Date('2024-02-14');
const timeObj = ref<TimeObject>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
});

// 修改 intervalId 的类型定义
let intervalId: ReturnType<typeof setInterval>;

const calculateTimePassed = () => {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();

    timeObj.value = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
    };
};

onMounted(() => {
    calculateTimePassed();
    intervalId = setInterval(calculateTimePassed, 1000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<style scoped>
.love-timer {
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
}

.avatars {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
}

.avatar-wrapper {
    position: relative;
    transition: transform 0.3s ease;
}

.avatar-wrapper:hover {
    transform: scale(1.1);
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #e91e63;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(233, 30, 99, 0.3);
}

.left-avatar {
    margin-right: 30px;
}

.right-avatar {
    margin-left: 30px;
}

.heart-container {
    position: relative;
}

.heart-beat {
    font-size: 60px;
    color: #e91e63;
    animation: heartbeat 1.2s ease-in-out infinite;
    text-shadow: 0 0 20px rgba(233, 30, 99, 0.5);
}

@keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.3); }
}

.title-animate {
    color: #e91e63;
    font-size: 2em;
    margin: 20px 0;
    animation: fadeInUp 1s ease;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.time-blocks {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.time-block {
    background: linear-gradient(135deg, #ff6b6b, #e91e63);
    padding: 15px 25px;
    border-radius: 15px;
    color: white;
    display: flex;
    flex-direction: column;
    min-width: 80px;
    box-shadow: 0 4px 15px rgba(233, 30, 99, 0.2);
    transition: transform 0.3s ease;
}

.time-block:hover {
    transform: translateY(-5px);
}

.number {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 5px;
}

.label {
    font-size: 1em;
    opacity: 0.9;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .time-blocks {
        gap: 10px;
    }

    .time-block {
        padding: 10px 15px;
        min-width: 60px;
    }

    .avatar {
        width: 80px;
        height: 80px;
    }

    .heart-beat {
        font-size: 40px;
    }

    .title-animate {
        font-size: 1.5em;
    }
}
</style>