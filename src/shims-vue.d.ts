// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const component: ComponentOptions;
  export default component;
}

declare module 'ajv-formats';

declare module '*.json' {
  const value: any;
  export default value;
}
