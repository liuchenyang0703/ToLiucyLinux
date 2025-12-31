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

interface Window {
  _AMapSecurityConfig: {
    securityJsCode: string;
  };
}

// 扩展 WalinePluginOptions 类型
declare module '@waline/client' {
  interface WalinePluginOptions {
    locale?: {
      placeholder?: string;
      nickPlaceholder?: string;
      emailPlaceholder?: string;
      locationPlaceholder?: string;
      verifyPlaceholder?: string;
    };
  }
}