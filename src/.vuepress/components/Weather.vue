<template>
  <div class="weather-widget">
    <div class="weather-title-section">
      <div class="weather-title-container">
        <h2 class="weather-title">☁️ 天气预报</h2>
      </div>
      <p class="weather-description">实时天气信息，助您规划精彩生活，应对多变气候。</p>
    </div>
    
    <div class="mini-weather">
      <div v-if="loading" class="loading">正在获取天气信息...</div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else>
        <div class="weather-header">
          <span class="city-name">{{ weatherData.city }}</span>
          <span class="update-time">{{ updateTime }}</span>
        </div>
        <div class="weather-body">
          <div class="temperature">{{ weatherData.temperature }}℃</div>
          <div class="weather-info">
            <img 
              :src="currentIcon" 
              alt="天气图标" 
              class="weather-icon"
            >
            {{ weatherData.weather }}
          </div>
          <div class="weather-details">
            <div class="detail-item">
              <span>湿度：</span>
              <span>{{ weatherData.humidity }}%</span>
            </div>
            <div class="detail-item">
              <span>风向：</span>
              <span>{{ weatherData.windDirection }}风</span>
            </div>
            <div class="detail-item">
              <span>风力：</span>
              <span>{{ weatherData.windPower }}级</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  setup() {
    const weatherData = ref({
      city: '',
      temperature: '',
      weather: '',
      humidity: '',
      windDirection: '',
      windPower: ''
    })
    const updateTime = ref('')
    const loading = ref(true)
    const error = ref('')
    let updateTimer = null
    let timeUpdateTimer = null

    // 定义不同天气的图标
    const weatherIcons = {
      '晴': 'http://image.nmc.cn/assets/img/w/40x40/4/0.png',
      '多云': 'http://image.nmc.cn/assets/img/w/40x40/4/1.png',
      '阴': 'http://image.nmc.cn/assets/img/w/40x40/4/2.png',
      '雨': 'http://image.nmc.cn/assets/img/w/40x40/4/3.png',
      '雪': 'http://image.nmc.cn/assets/img/w/40x40/4/5.png',
      '雷阵雨': 'http://image.nmc.cn/assets/img/w/40x40/4/4.png',
      '雨夹雪': 'http://image.nmc.cn/assets/img/w/40x40/4/6.png',
      '小雨': 'http://image.nmc.cn/assets/img/w/40x40/4/7.png',
      '中雨': 'http://image.nmc.cn/assets/img/w/40x40/4/8.png',
      '大雨': 'http://image.nmc.cn/assets/img/w/40x40/4/9.png',
      '暴雨': 'http://image.nmc.cn/assets/img/w/40x40/4/10.png',
      '小雪': 'http://image.nmc.cn/assets/img/w/40x40/4/14.png',
      '中雪': 'http://image.nmc.cn/assets/img/w/40x40/4/15.png',
      '大雪': 'http://image.nmc.cn/assets/img/w/40x40/4/16.png',
      '雾': 'http://image.nmc.cn/assets/img/w/40x40/4/18.png',
      '大风': 'http://image.nmc.cn/assets/img/w/40x40/4/20.png',
      '扬沙': 'http://image.nmc.cn/assets/img/w/40x40/4/29.png',
      '默认': 'http://image.nmc.cn/assets/img/w/40x40/4/0.png'
    }

    const currentIcon = ref(weatherIcons['默认'])

    const initWeatherData = async () => {
      error.value = ''
      loading.value = true
      try {
        if (!window) throw new Error('Window is not defined') // 确保在客户端执行
        
        const AMapLoader = await import('@amap/amap-jsapi-loader')
        await AMapLoader.load({
          key: '71ed3ff64e4f2063c13e43419694436a',
          version: '2.0',
          plugins: ['AMap.CitySearch']
        }).then(AMap => {
          AMap.plugin('AMap.CitySearch', function () {
            const citySearch = new AMap.CitySearch()
            citySearch.getLocalCity((status, result) => {
              if (status === 'complete' && result.info === 'OK') {
                const city = result.city
                getWeather(city)
              } else {
                throw new Error('获取城市信息失败')
              }
            })
          })
        })
      } catch (err) {
        console.error('获取城市信息失败:', err)
        error.value = '获取城市信息失败，请稍后再试。'
      } finally {
        loading.value = false
      }
    }

    const getWeather = async (city) => {
      try {
        if (!window) throw new Error('Window is not defined') // 确保在客户端执行
        
        const AMapLoader = await import('@amap/amap-jsapi-loader')
        await AMapLoader.load({
          key: '71ed3ff64e4f2063c13e43419694436a',
          version: '2.0',
          plugins: ['AMap.Weather']
        }).then(AMap => {
          AMap.plugin('AMap.Weather', function () {
            const weather = new AMap.Weather()
            weather.getLive(city, function (err, data) {
              if (!err) {
                const now = new Date()
                const year = now.getFullYear()
                const month = (now.getMonth() + 1).toString().padStart(2, '0')
                const day = now.getDate().toString().padStart(2, '0')
                const hours = now.getHours().toString().padStart(2, '0')
                const minutes = now.getMinutes().toString().padStart(2, '0')
                const seconds = now.getSeconds().toString().padStart(2, '0')
                const timeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
                updateTime.value = timeString

                if (weatherIcons[data.weather]) {
                  currentIcon.value = weatherIcons[data.weather]
                } else {
                  currentIcon.value = weatherIcons['默认']
                }

                weatherData.value = {
                  city: data.city,
                  temperature: data.temperature,
                  weather: data.weather,
                  humidity: data.humidity,
                  windDirection: data.windDirection,
                  windPower: data.windPower
                }
              } else {
                throw new Error('获取天气数据失败')
              }
            })
          })
        })
      } catch (error) {
        console.error('获取天气数据失败：', error)
        error.value = '获取天气数据失败，请稍后再试。'
      }
    }

    onMounted(() => {
      initWeatherData()
      updateTimer = setInterval(initWeatherData, 60000) // 每分钟更新一次天气数据
      timeUpdateTimer = setInterval(() => {
        const now = new Date()
        const year = now.getFullYear()
        const month = (now.getMonth() + 1).toString().padStart(2, '0')
        const day = now.getDate().toString().padStart(2, '0')
        const hours = now.getHours().toString().padStart(2, '0')
        const minutes = now.getMinutes().toString().padStart(2, '0')
        const seconds = now.getSeconds().toString().padStart(2, '0')
        const timeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        updateTime.value = timeString
      }, 1000) // 每秒更新一次时间
    })

    onUnmounted(() => {
      if (updateTimer) {
        clearInterval(updateTimer)
      }
      if (timeUpdateTimer) {
        clearInterval(timeUpdateTimer)
      }
    })

    return {
      weatherData,
      updateTime,
      loading,
      error,
      currentIcon
    }
  }
}
</script>

<style scoped>
.weather-widget {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.weather-title-section {
  text-align: center;
  margin-bottom: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.weather-title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.weather-title-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.weather-title {
  color: #20a0ff;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.weather-description {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.mini-weather {
  font-family: 'Arial', sans-serif;
  padding: 15px;
  border-radius: 12px;
  background-color: #f5f7fa;
  color: #333333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #eaeaea;
  width: 100%;
}

.weather-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eaeaea;
}

.city-name {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
}

.update-time {
  font-size: 12px;
  color: #7f8c8d;
}

.weather-body {
  text-align: center;
  padding: 10px 0;
}

.temperature {
  font-size: 32px;
  font-weight: bold;
  margin: 5px 0;
  color: #2c3e50;
}

.weather-info {
  font-size: 16px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.weather-icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  pointer-events: none;
  user-select: none;
}

.weather-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eaeaea;
}

.detail-item {
  font-size: 14px;
  margin: 5px 0;
  color: #34495e;
}

.loading, .error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 16px;
  color: #7f8c8d;
  border-bottom: none;
  padding: 0;
}

.error {
  color: #e74c3c;
}
</style>