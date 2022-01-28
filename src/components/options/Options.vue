<template>
  <div class="opt-container" :data-visible="!isFinalPositionReady">
    <h2>
      Select a point in the map
    </h2>
  </div>
  <div class="opt-container" :data-visible="isFinalPositionReady">
    <button class="btn btn-start" @click="start" :disabled="!isBotsReady || raceStatus"> Start race </button>
    <button v-if="!isBotsReady" class="btn btn-find" @click="findBots"> Search players </button>
    <button v-else class="btn btn-add" @click="addNewBot"> New player </button>

  </div>
</template>

<script>
import { useMapStore } from "../../composables"

export default {
  name: 'Options',
  setup() { 

    const { 
      raceStatus,
      isFinalPositionReady, isBotsReady, // getters
      addBot, getBots, // actions
      startRace, // mutations
    } = useMapStore()

    function findBots () {
      getBots()
    }

    function addNewBot () {
      addBot()
    }

    function start () {
      startRace()
    }

    return {
      raceStatus,
      isFinalPositionReady,
      isBotsReady,
      findBots,
      addNewBot,
      start
    }
  }
}
</script>

<style lang="scss">

.opt-container {
  position: fixed;
  bottom: 30px;
  left: 20px;
  right: 20px;
  gap: 1.5em;
  display: flex;
  justify-content: center;
  transform: translateY(100px);
  opacity: 0;
  transition: 
    opacity .3s,
    transform .8s;

    h2 {
      padding: 1em;
      border-radius: 3em;
      font-size: 1.2em;
      background-color: rgba(164, 170, 175, 0.515);
      animation: pulse 2s linear alternate infinite;

      @media (min-width: 500px){
        font-size: 2em;
        
      }
    }
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.1);
      }
    }

  &[data-visible="true"] {
    transform: translateY(0);
    opacity: 1;
  }
}

</style>