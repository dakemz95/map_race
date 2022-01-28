
const getters = {
  isMapReady( state ) {
    return !!state.map
  },
  isFinalPositionReady( state ) { 
    return state.finalPosition.length > 0
  },
  finalPositionArea( state ) {
    if ( !state.finalPosition ) return undefined
    const lng = state.finalPosition[0]
    const lat = state.finalPosition[1]
    return [
      {
        max : lng + 0.015,
        min : lng - 0.015
      }, 
      {
        max : lat + 0.015,
        min : lat - 0.015
      }
    ]
  },
  orderedBotsList( state ) {
    if ( state.bots.length == 0 ) return []
    return state.bots.sort( (a,b) => {
      if ( !!a.position && !!b.position ) 
        return a.position - b.position
      return a.distance - b.distance 
    })
  },
  isBotsReady( state ) {
    return state.bots.length > 0 
  },
  firstPosition( state ) {
    if ( state.bots.length < 1 ) return
    const arr = state.bots.map( bot => bot.distance )
    return state.bots.find( bot => bot.distance === Math.min( ...arr ) ).id
  },
  lastPosition( state ) {
    if ( state.bots.length < 1 ) return
    const arr = state.bots.map( bot => bot.distance )
    return state.bots.find( bot => bot.distance === Math.max( ...arr ) ).id
  },
}

export default getters