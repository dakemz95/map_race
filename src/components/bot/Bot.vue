<template>
  <div></div>
</template>

<script>
import { onMounted, ref, watch } from "vue"
import { useMapStore } from "../../composables";

export default {
  name: 'Bot',
  props: [ 'bot' ],
  setup( props ) {
    const {
      raceStatus, map, currentPosition,// state
      firstPosition, lastPosition, // getters
      updatePosition,
    } = useMapStore()

    const interval = ref()
    const count = ref(0)
    const bot = ref(props.bot)
    const recharge = ref(0)

    function drawBot() {

      // Draw route
      map.value.addSource( `route#${bot.value.id}`, {
        'type': 'geojson',
        'data': bot.value.route
      })
      map.value.addLayer({
        id: `route#${bot.value.id}`,
        type: 'line',
        source: `route#${bot.value.id}`,
        paint: {
          
          "line-color": 'rgba(0,0,0,.6)',
          "line-width": 1,
        },
        layout: {
          "line-cap": 'round',
          "line-join": 'round'
        },
      })

      // Draw point
      map.value.addSource( `point#${bot.value.id}`, {
        'type': 'geojson',
        'data': bot.value.point
      })
      map.value.addLayer({
        id: `point#${bot.value.id}`,
        type: 'circle',
        source: `point#${bot.value.id}`,
        paint: {
          "circle-color": 'blue',
          "circle-radius": 6,
          "circle-stroke-width": 1,
          "circle-stroke-color": '#ddd',
        },
      })
    }

    function setBotColor() {

      if ( bot.value.id === firstPosition.value ) {
        map.value.setPaintProperty(`point#${bot.value.id}`, 'circle-color', 'green');
        bot.value.color = 'green'
      } else if (bot.value.id === lastPosition.value ) {
        map.value.setPaintProperty(`point#${bot.value.id}`, 'circle-color', 'red');
        bot.value.color = 'red'
      } else if ( bot.value.color !== 'yellow' ) {
        map.value.setPaintProperty(`point#${bot.value.id}`, 'circle-color', 'yellow');
        bot.value.color = 'yellow'
      }
    }

    function updatePoint( coord ) {

      bot.value.point.features[0].geometry.coordinates = coord
      bot.value.route.features[0].geometry.coordinates[0] = coord

      map.value.getSource(`point#${bot.value.id}`).setData( bot.value.point )
      map.value.getSource(`route#${bot.value.id}`).setData( bot.value.route )
      
    }

    function initBot() {
      bot.value.startTime = new Date().getTime()
      interval.value = setInterval(() => {
        let n = Math.round( Math.random() * (100 - 50) + 50 )
        let energyCost = Math.round( Math.random() * (30 - 10) + 10 )
        if ( bot.value.batery >= energyCost  ) {
          bot.value.distance = bot.value.distance - n
          bot.value.batery = bot.value.batery - energyCost
          recharge.value = 0
          count.value = count.value + n
          if ( count.value >= Math.round(bot.value.initialDistance * 1000)  ) { 
            bot.value.finishTime = new Date().getTime()
            updatePoint( bot.value.routeCoords[bot.value.routeCoords.length -1] )
            bot.value.position = currentPosition.value
            bot.value.distance = 0
            updatePosition()
            clearInterval(interval.value)
            return 
          }
  
          updatePoint( bot.value.routeCoords[count.value]   )
        } else {
          bot.value.batery = 0
          if( recharge.value >= 5 )
            bot.value.batery = 100
          recharge.value++
        }
        setBotColor()
      }, 1000)
    }

    onMounted( () => {
      drawBot()
      if ( !raceStatus.value ) return
      initBot()
    })

    watch( raceStatus, () => {
      if ( !raceStatus.value ) return
        initBot()
    })
  }
}
</script>