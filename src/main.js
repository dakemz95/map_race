import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

// Mapbox
import mapboxgl from 'mapbox-gl'

// Styles
import '@/assets/styles/main.scss'
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFrZW16IiwiYSI6ImNreWYwcTloNjBkemEydXBsaGR1cmtjdXgifQ.HQB5LdgKaroC_zWlw3YR8g';

createApp(App).use(store).mount('#app')
