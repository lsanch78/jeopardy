import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')


fetch ("https://opentdb.com/api.php?amount=1&type=boolean")