const Names = ["Adolfo","Alberto","Alejandro","Alex","Andrés","Augusto","Camilo","Carlos","César","Daniel","Darío","David","Diego","Edgar","Eduardo","Elkin","Emilio","Enrique","Esteban","Fabio","Felipe","Fernando","Fredy","Gabriel","Germán","Gonzalo","Guillermo","Gustavo","Hernán","Hernando","Hugo","Humberto","Ignacio","Iván","Jaime","Jairo","John","Jorge","José","Juan","Juan Carlos","Julián","Julio","Manuel","Marco","Mario","Mauricio","Miguel","Nicolás","Oscar","Pablo","Rafael","Rodrigo","Santiago","Sebastián","Sergio","Walter", "Adriana","Alba","Alejandra","Ana","Ana María","Andrea","Angela","Beatriz","Camila","Carolina","Catalina","Cecilia","Clara","Claudia","Cristina","Diana","Dora","Elena","Eliana","Elizabeth","Erica","Eugenia","Gabriela","Gloria","Isabel","Jennifer","Jenny","Johana","Juliana","Karen","Laura","Liliana","Lina","Lucia","Luisa","Luz","Magdalena","Manuela","Marcela","Margarita","María","Mariana","Mariela","Marisol","Martha","Milena","Mónica","Natalia","Paola","Patricia","Paula","Rosa","Sandra","Susana","Victoria","Viviana","Yenny","Yolanda"]
  .sort( () => Math.round(Math.random() * (1) ) ? 1 : -1 )

import { lineString, length, along } from "@turf/turf";

const createBot = ( id, finalPosition, area ) => {

  const pos = [finalPosition[0], finalPosition[1]]
  const [ lng, lat ] = area 
  const origin = [ 
    lng.min + Math.random() * ( lng.max - lng.min ), 
    lat.min + Math.random() * ( lat.max - lat.min ) 
  ]
  const line = lineString([ origin, pos ])
  const lineDistance = length( line, {units: 'kilometers'} )

  const distance = Math.floor(lineDistance * 1000)

  const coords = []
  
  for (let i = 0; i < lineDistance; i += lineDistance / distance) {
    const segment = along(line, i);
    coords.push(segment.geometry.coordinates);
  }


  const bot = {
    id: id,
    name: `${Names[id]}`,
    currentPosition: origin,
    initialDistance: lineDistance,
    isActive: false,
    distance,
    origin,
    batery: 100,
    routeCoords: coords,
    position: undefined,
    point: {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {
            'id': id,
            'name': `Bot#${id}`,
            'description': `<strong>Bot#${id}</strong>`
          },
          'geometry': {
            'type': 'Point',
            'coordinates': origin
          }
        }
      ]
    },
    route: {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [ origin, pos ]
          }
        }
      ]
    }
  }  

  return bot
}

export { 
  createBot 
}