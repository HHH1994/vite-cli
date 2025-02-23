/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue/types" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}