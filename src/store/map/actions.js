import { createBot } from "@/helpers/handleBot"

const actions = {
  getBots( store ) {
    const area = store.getters['finalPositionArea']
    const finalPosition = store.state.finalPosition
    const n = Math.floor( Math.random() * ( 10 - 5 ) + 5 )

    const bots = []

    for ( let i = 0; i <= n; i++ ) {
      const bot = createBot(i, finalPosition, area)
      bots.push(bot)
    }
    store.commit( 'setBots' , bots )
  },
  addBot( store ) {
    const area = store.getters['finalPositionArea']
    const finalPosition = store.state.finalPosition
    const id = store.state.bots.length

    store.commit( 'addNewBot' , createBot(id, finalPosition, area) )
  }
}

export default actions