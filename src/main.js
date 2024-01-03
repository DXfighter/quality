import { createApp } from 'vue';
import App from './App.vue';
import VueTailwindDatepicker from 'vue-tailwind-datepicker';

import './index.css';

const app = createApp(App);
app.use(VueTailwindDatepicker);
app.mount('#app');
