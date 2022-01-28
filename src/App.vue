<template>
  <MapView />
  <Options />
  <InfoPanel />
</template>

<script>
import MapView from "@/components/mapview/MapView.vue";
import Options from "@/components/options/Options.vue"
import InfoPanel from "./components/info-panel/InfoPanel.vue";

export default {
  name: 'App',
  components: {
    MapView,
    Options,
    InfoPanel
}
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
