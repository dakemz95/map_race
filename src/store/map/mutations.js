
const mutations = {
  setMap( state, map ) {
    state.map = map
  },
  setFinalPosition( state, [ pos, marker ] ) {
    if ( marker ) state.finalPositionMarker = marker
    state.finalPosition = pos
  },
  setBots( state, bots ) {
    state.bots = bots    
  },
  addNewBot( state, bot ) {
    state.bots.push( bot )
  },
  startRace( state ) {
    state.raceStatus = true
  },
  endRace ( state ) {
    if ( state.bots.every( bot => !!bot.position ) ) {
      state.raceStatus = false
    }
  },
  updatePosition( state ) {
    state.currentPosition++
  }
}

export default mutations