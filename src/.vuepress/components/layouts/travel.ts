// 旅游相册与足迹地图共用此列表。新增照片时，同时填写所在省份和经纬度即可自动点亮地图。
export interface TravelItem {
  city: string;
  image: string;
  description: string;
  province: string;
  coordinates: [number, number];
}

export const travelList: TravelItem[] = [
  { city: "北京", image: "Travel/北京.jpeg", description: "古都北京，历史与现代在这里相遇。", province: "北京市", coordinates: [116.4074, 39.9042] },
  { city: "上海", image: "Travel/上海.jpeg", description: "漫步上海，感受摩登都市的昼与夜。", province: "上海市", coordinates: [121.4737, 31.2304] },
  { city: "天津", image: "Travel/天津.jpeg", description: "海河之畔，遇见天津独特的城市风情。", province: "天津市", coordinates: [117.2000, 39.1333] },
  { city: "杭州", image: "Travel/杭州.jpeg", description: "山水杭州，一城诗意半城湖。", province: "浙江省", coordinates: [120.1551, 30.2741] },
  { city: "济南", image: "Travel/济南.jpeg", description: "泉城济南，寻访街巷里的清泉与烟火。", province: "山东省", coordinates: [117.1201, 36.6512] },
  { city: "青岛", image: "Travel/青岛.jpeg", description: "吹过海风，收藏青岛的碧海与红瓦。", province: "山东省", coordinates: [120.3826, 36.0671] },
  { city: "太原", image: "Travel/太原.jpeg", description: "走进太原，感受厚重悠长的晋阳文化。", province: "山西省", coordinates: [112.5489, 37.8706] },
  { city: "运城", image: "Travel/运城.jpeg", description: "在河东大地，遇见运城的人文与风景。", province: "山西省", coordinates: [111.0075, 35.0264] },
  { city: "芮城", image: "Travel/芮城.jpeg", description: "行至芮城，记录黄河岸边的古老故事。", province: "山西省", coordinates: [110.6942, 34.6936] },
  { city: "西安", image: "Travel/西安.jpeg", description: "长安一梦，穿行在古城墙与市井之间。", province: "陕西省", coordinates: [108.9398, 34.3416] },
  { city: "咸阳", image: "Travel/咸阳.jpeg", description: "渭水之滨，探寻咸阳深厚的历史印记。", province: "陕西省", coordinates: [108.7089, 34.3296] },
  { city: "榆林", image: "Travel/榆林.jpeg", description: "塞上榆林，感受大漠边城的辽阔。", province: "陕西省", coordinates: [109.7341, 38.2852] },
  { city: "成都", image: "Travel/成都.jpeg", description: "在成都，把日子过成悠闲的旅行。", province: "四川省", coordinates: [104.0665, 30.5728] },
  { city: "乌鲁木齐", image: "Travel/乌鲁木齐.jpeg", description: "从乌鲁木齐出发，看见天山脚下的辽阔。", province: "新疆维吾尔自治区", coordinates: [87.6168, 43.8256] },
  { city: "昌吉", image: "Travel/昌吉.jpeg", description: "走过昌吉，收藏新疆明亮而热烈的风景。", province: "新疆维吾尔自治区", coordinates: [87.3082, 44.0112] },
  { city: "博乐", image: "Travel/博乐.jpeg", description: "抵达博乐，奔赴雪山、草原与湖泊。", province: "新疆维吾尔自治区", coordinates: [82.0511, 44.8539] },
];
