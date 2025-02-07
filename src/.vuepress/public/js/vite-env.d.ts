// 加载所有的vue及json文件，主要是解决client.ts中的引用vue文件报错；
declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}

declare module '*.json' {
  const value: any;
  export default value;
}
