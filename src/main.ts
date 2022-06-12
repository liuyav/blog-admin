import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import 'normalize.css/normalize.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App); // 创建vue实例

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(store); // 挂载pinia

app.use(router); // 挂载路由

app.use(ElementPlus); // 挂载ElementPlus

app.mount('#app'); // 挂载实例
