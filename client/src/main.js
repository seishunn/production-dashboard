import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/main.scss'
import UIComponents from './plugins/ui-components.plugin';
import router from './router';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);

app.use(UIComponents);
app.use(router);
app.use(pinia);

app.mount('#app');
