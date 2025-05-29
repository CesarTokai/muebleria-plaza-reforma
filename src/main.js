import { createApp } from 'vue'
import App from './App.vue'
import scrollAnimate from './directives/v-scroll-animate'
import router from './router';
import './components/assets/styles.css';


const app = createApp(App)
app.directive('scroll-animate', scrollAnimate)
app.use(router).mount('#app')
