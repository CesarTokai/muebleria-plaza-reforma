import { createApp } from 'vue'
import router from './router';
import App from './App.vue'
import './components/assets/styles.css';


createApp(App).use(router).mount('#app')
