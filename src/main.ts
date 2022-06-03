import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

const app = createApp(App); // 创建vue实例

app.use(store); // 挂载pinia

app.use(router); // 挂载路由

app.mount('#app'); // 挂载实例
