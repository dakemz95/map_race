import { computed } from "vue"
import { useStore } from "vuex"


export const useMapStore = () => {
  const store = useStore()

  return {
    // state
    map: computed( () => store.state.map.map ),
    finalPositionMarker: computed( () => store.state.map.finalPositionMarker ),
    finalPosition: computed( () => store.state.map.finalPosition ),
    bots: computed( () => store.state.map.bots ),
    raceStatus: computed( () => store.state.map.raceStatus),
    currentPosition: computed( () => store.state.map.currentPosition ),

    // getters
    isMapReady: computed( () => store.getters ),
    isFinalPositionReady: computed( () => store.getters['map/isFinalPositionReady'] ),
    isBotsReady: computed(() => store.getters['map/isBotsReady']),
    finalPositionArea: computed(() => store.getters['map/finalPositionArea']),
    firstPosition: computed( () => store.getters['map/firstPosition']),
    lastPosition: computed( () => store.getters['map/lastPosition']),
    orderedBotsList: computed( () => store.getters['map/orderedBotsList'] ),

    // actions
    getBots: () => store.dispatch('map/getBots'),
    addBot: () => store.dispatch('map/addBot'),

    // Mutations
    setMap: ( map ) => store.commit('map/setMap', map),
    setFinalPosition: ( payload ) => store.commit('map/setFinalPosition', payload),
    startRace: () => store.commit('map/startRace'),
    endRace: () => store.commit('map/endRace'),
    updatePosition: () => store.commit('map/updatePosition'),

  }
}