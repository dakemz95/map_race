<template>
  <div class="info-container" :data-show="isOpen" :data-race-status="raceStatus">
    <div class="info-panel">
      <transition-group name="list-complete" class="info-list" tag="div">
        <div class="info-list__element list-complete-item" v-for="bot in orderedBotsList" :key="bot.id" >
          <div :class="`title ${ bot.position === 1 ? 'first' : bot.position === 2 ? 'second' : bot.position === 3 ? 'third' : '' }`">
            <span v-if="!!bot.position" >{{ bot.position }}</span>
            <h5>{{ bot.name }}</h5>
          </div>
          <div v-if="bot.finishTime" class="time">
            {{ (( bot.finishTime - bot.startTime ) / 1000).toFixed(2) }} s
          </div>
          <div v-if="bot.distance > 0" class="distance">
            {{ bot.distance }}mts
          </div>
          <div class="batery" :style="`background-image: linear-gradient( -90deg, #5cf116 ${bot.batery}%, white ${bot.batery + 1}%)`">
            {{ bot.batery }}%
          </div>
        </div>
      </transition-group>
    </div>
  </div>
  <button class="info-toggle" @click="togglePanel" :disabled="!isBotsReady"  :data-visible="isFinalPositionReady">
    <h3>Players details</h3>
  </button>
</template>

<script>
import { ref } from "vue"
import { useMapStore } from "@/composables"

export default {
  name: 'InfoPanel',
  setup() {
    const isOpen = ref(false)
    const { 
      // bots, // State
      raceStatus, isBotsReady, orderedBotsList, isFinalPositionReady,// getters
       //mutations
    } = useMapStore();

    function togglePanel(  ) {
      isOpen.value = !isOpen.value
    }

    return {
      isFinalPositionReady,
      orderedBotsList,
      isOpen,
      raceStatus,
      isBotsReady,
      togglePanel,
    }
  }
}

</script>

<style lang="scss">

.info {

  &-container {
    position: fixed;
    top: 25px;
    right: 10px;
    left: 10px;
    transition: transform .8s;
    z-index: 5;
    width: min(calc(100% - 20px), 600px);
    max-height: calc(100% - 120px);
    transform: translateY( calc(-100% - 30px) );
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(221, 221, 221);
    padding: 1.5em 1em 1em;
    // border-left: ;
    border-radius: .5em;;
    overflow-y: scroll;

    @media (min-width: 400px){
      right: unset;
      
    }


    &[data-show="true"] {
      transform: translateY(0px);
    }
  }
  &-list {
    min-height: 100px;
    border: 1px solid #ddd;
    border-radius: .5em;

    &__element {
      padding: .5em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .batery {
        text-align: right;
        font-weight: 600;
        font-size: 1px;
        width: 80px;
        height: 20px;
        transition: background-image .2s;
        border: 1px solid #333;
        border-radius: .3em;

      }
      .title {
        display: flex;
        align-items: center;
        gap: 10px;

        span {
          color: #fff;
          background-color: #555;
          border: 1px solid #333;
          border-radius: .3em;
          padding: .2em .4em;
        }

        &.first span {
          background-color: rgb(247, 202, 20);
          border-color: rgb(148, 119, 0);
        }
        &.second span {
          background-color: rgb(108, 132, 133);
          border-color: rgb(55, 68, 68);
        }
        &.third span {
          background-color: rgb(181, 79, 20);
          border-color: rgb(112, 48, 11);
        }
      }
    }
  }

  &-toggle {
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: .5em;
    background-color: rgb(255, 255, 255);
    position: absolute;
    top: 10px;
    left: calc(10px + 1em);
    display: block;
    white-space: nowrap;
    padding: .5em 1em;
    z-index: 6;
    opacity: 0;
    transform: translateY(-100px);
    transition: 
      opacity .8s,
      transform .8s;

    &[data-visible="true"] {
      opacity: 1;
      transform: translateY(0px);
    }
  }
}

.list-complete-item {
  transition: all 0.8s ease;
  margin-right: 10px;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}

</style>