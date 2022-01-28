<template>
  <div v-for="bot in botList" :key="bot.id">
    <Bot :bot="bot" />
  </div>
  <div class="map" ref="mapElement"></div>
</template>

<script>
import { onMounted, ref, watch } from "vue"
import Mapboxgl from 'mapbox-gl'
import { useMapStore } from "@/composables"
import Bot from "../bot/Bot.vue"

export default {
  name: "Mapview",
  setup() {
    const mapElement = ref();
    const { 
      setMap, map, finalPositionMarker, bots, // State
      isBotsReady, // getters
      setFinalPosition, //mutations
    } = useMapStore();
    const botList = ref(bots)

    async function initMap() {
      if (!mapElement.value)
        return;
      await Promise.resolve();
      const newMap = new Mapboxgl.Map({
        container: mapElement.value,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-68.01423271639119, 10.175322060360898],
        zoom: 12,
      });
      setMap(newMap);
      map.value?.on("click", setInitialPos);
    }
    function setInitialPos(e) {
      const pos = [e.lngLat.lng, e.lngLat.lat];
      if (!map.value)
        return;
      // If already exist, set the new position and center the view
      if (finalPositionMarker.value) {
        finalPositionMarker.value.setLngLat(pos);
        map.value.flyTo({
          center: pos,
          zoom: 13
        });
        return setFinalPosition([pos]);
      }
      // Custom HTML element for the goal marker
      const el = document.createElement("div");
      el.className = "marker-goal";
      const marker = new Mapboxgl.Marker(el)
        .setLngLat(pos)
        .on("click", e => console.log(e))
        .addTo(map.value);
      setFinalPosition([pos, marker]);
      map.value.flyTo({
        center: pos,
        zoom: 13
      });
    }
    onMounted(() => {
      initMap();
    });

    watch( isBotsReady, newVal => {
      if ( !newVal ) return
      map.value?.off('click', setInitialPos )
    })

    return {
      mapElement,
      botList,
    };
  },
  components: { Bot }
}
</script>

<style lang="scss">
.map {
  position: fixed;
  height: 100vh;
  width: 100vw;
}

.marker {
  &-goal {
    background-size: 100%;
    width: 50px;
    aspect-ratio: 1;padding-bottom: 25px;
    background-image: url('../../assets/goal.png');
  }
}
</style>