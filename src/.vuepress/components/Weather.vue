<template>
  <div class="weather-overlay" v-if="showWeatherPanel">
    <div class="background-overlay"></div>
  </div>
  
  <div class="weather-container">
    <div 
      class="weather-toggle-button" 
      @click="toggleWeatherPanel"
    >
      ☁️
    </div>
    
    <div 
      class="weather-panel" 
      :class="{ 'weather-panel-open': showWeatherPanel }"
    >
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
          <button class="refresh-button" @click="refreshWeather">刷新</button>
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
    const showWeatherPanel = ref(false)
    const isOnline = ref(true)
    const retryCount = ref(0)
    
    // 定义不同天气的图标
    const weatherIcons = {
      '晴': 'weather/Weather_0.png',
      '多云': 'weather/Weather_1.png',
      '阴': 'weather/Weather_2.png',
      '雨': 'weather/Weather_3.png',
      '雪': 'weather/Weather_5.png',
      '雷阵雨': 'weather/Weather_4.png',
      '雨夹雪': 'weather/Weather_6.png',
      '小雨': 'weather/Weather_7.png',
      '中雨': 'weather/Weather_8.png',
      '大雨': 'weather/Weather_9.png',
      '暴雨': 'weather/Weather_10.png',
      '小雪': 'weather/Weather_14.png',
      '中雪': 'weather/Weather_15.png',
      '大雪': 'weather/Weather_16.png',
      '雾': 'weather/Weather_18.png',
      '大风': 'weather/Weather_20.png',
      '扬沙': 'weather/Weather_29.png',
      '默认': 'weather/Weather_0.png'
    }

    const currentIcon = ref(weatherIcons['默认'])

    const initWeatherData = async () => {
      error.value = ''
      loading.value = true
      retryCount.value = 0
      try {
        if (!window) throw new Error('Window is not defined') // 确保在客户端执行
        
        // 主动清除浏览器的地理位置缓存
        if (navigator.geolocation) {
          // 创建一个不可见的 iframe 来清除缓存
          const iframe = document.createElement('iframe')
          iframe.style.display = 'none'
          iframe.src = 'about:blank'
          document.body.appendChild(iframe)
          document.body.removeChild(iframe)
        }
        
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
                getWeather(result.city)
              } else {
                // 尝试使用浏览器的地理位置 API 作为后备方案
                getWeatherFromBrowserLocation()
              }
            })
          })
        })
      } catch (err) {
        console.error('获取城市信息失败:', err)
        error.value = '获取城市信息失败，请稍后再试。'
        // 尝试使用 IP 定位作为最后的后备方案
        getWeatherFromIP()
      } finally {
        loading.value = false
      }
    }

    const getWeatherFromBrowserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            getWeatherByCoordinates(latitude, longitude)
          },
          error => {
            console.error('无法获取地理位置:', error)
            error.value = '无法获取地理位置，请检查您的位置权限。'
            loading.value = false
            // 尝试使用 IP 定位
            getWeatherFromIP()
          }
        )
      } else {
        console.error('浏览器不支持地理位置 API')
        error.value = '浏览器不支持地理位置功能。'
        loading.value = false
        // 尝试使用 IP 定位
        getWeatherFromIP()
      }
    }

    const getWeatherByCoordinates = (latitude, longitude) => {
      const AMapLoader = window.AMapLoader
      AMapLoader.load({
        key: '71ed3ff64e4f2063c13e43419694436a',
        version: '2.0',
        plugins: ['AMap.Geocoder', 'AMap.Weather']
      }).then(AMap => {
        AMap.plugin(['AMap.Geocoder', 'AMap.Weather'], function () {
          const geocoder = new AMap.Geocoder()
          geocoder.getAddress({latitude, longitude}, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result.regeocode && result.regeocode.addressComponent) {
                const city = result.regeocode.addressComponent.city || result.regeocode.addressComponent.province
                getWeather(city.replace('市', ''))
              } else {
                error.value = '无法根据坐标获取城市信息，请稍后再试。'
              }
            } else {
              error.value = '无法根据坐标获取天气信息，请稍后再试。'
            }
          })
        })
      }).catch(err => {
        console.error('根据坐标获取天气失败:', err)
        error.value = '无法根据坐标获取天气信息，请稍后再试。'
      })
    }

    const getWeatherFromIP = async () => {
      try {
        const response = await fetch('https://api.ip.sb/geoip')
        const data = await response.json()
        if (data.city) {
          getWeather(data.city)
        } else {
          error.value = '无法从 IP 获取位置信息，请稍后再试。'
        }
      } catch (err) {
        console.error('IP 定位失败:', err)
        error.value = '无法从 IP 获取位置信息，请稍后再试。'
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

    const toggleWeatherPanel = () => {
      showWeatherPanel.value = !showWeatherPanel.value
      if (showWeatherPanel.value && (loading.value || error.value)) {
        initWeatherData()
      }
    }

    const refreshWeather = () => {
      initWeatherData()
    }

    // 监听网络状态变化
    const handleOnlineChange = () => {
      isOnline.value = navigator.onLine
      if (isOnline.value && showWeatherPanel.value) {
        // 网络恢复时重新获取天气数据
        initWeatherData()
      }
    }

    onMounted(() => {
      window.addEventListener('online', handleOnlineChange)
      window.addEventListener('offline', handleOnlineChange)
      initWeatherData()
      updateTimer = setInterval(initWeatherData, 300000) // 每五分钟更新一次天气数据
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
      window.removeEventListener('online', handleOnlineChange)
      window.removeEventListener('offline', handleOnlineChange)
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
      currentIcon,
      showWeatherPanel,
      toggleWeatherPanel,
      refreshWeather
    }
  }
}
</script>

<style scoped>
body {
  overflow-x: hidden;
}

.weather-container {
  position: fixed;
  right: 30px;
  top: 0;
  bottom: 0;
  z-index: 999;
  pointer-events: none;
}

.weather-toggle-button {
  position: absolute;
  right: -12px;
  top: 75%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #20a0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(32, 160, 255, 0.3);
  cursor: pointer;
  z-index: 1;
  pointer-events: auto;
  transition: box-shadow 0.3s ease;
  font-size: 20px; /* 调整字体大小以适应按钮 */
}

.weather-toggle-button:hover {
  box-shadow: 0 4px 15px rgba(32, 160, 255, 0.4);
}

.weather-panel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  transform-origin: top right;
  width: 350px;
  max-width: 90%;
  background-color: #f5f7fa;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 20px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 2;
}

.weather-panel.weather-panel-open {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  pointer-events: auto;
}

.weather-title-section {
  text-align: center;
  margin-bottom: 20px;
  padding: 10px 0 0;
  border-bottom: 1px solid #f0f0f0;
}

.weather-title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
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
  color: #333333;
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

.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(5px);
  z-index: 1;
  pointer-events: auto;
  transition: opacity 0.3s ease;
}

.refresh-button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #20a0ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.refresh-button:hover {
  background-color: #1989ea;
}
</style>