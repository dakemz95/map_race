import { createStore } from 'vuex'

// Custom modules
import mapModule from './map'

export default createStore({
  modules: {
    map: mapModule,
  }
})