const QUOTES = require('../components/quotes')
const CONFIG = require('../components/config')
const CLIENT = require('../components/twitch')

class Commands {
  constructor () {
    this.GREETED_VIEWERS = []
  }
}

// Función para obtener una frase aleatoria
function randomQuote (category, argv) {
  let quote = QUOTES[category][Math.floor(Math.random() * (QUOTES[category].length))]
  if (argv) {
    quote = quote.replace('$user', argv.nombre)
    if (argv.target) {
      quote = argv.target.charAt(0) === '@'
        ? quote.replace('$target', argv.target)
        : randomQuote('bad-target')
    }
  }
  quote = quote.replace('$owner', CONFIG.owner)
  return quote
}

Commands.prototype.greet = function (nombre) {
  let usuario = nombre.toLowerCase()
  // Si el viewer no ha sido saludado y no está en la lista negra ...
  if (CONFIG.blacklist.indexOf(usuario) === -1 && this.GREETED_VIEWERS.indexOf(usuario) === -1) {
    // ... lo saludamos
    console.log(randomQuote('greetings', { nombre: nombre })) // FIXME: Implementar saludo
    this.GREETED_VIEWERS.push(usuario)
  }
}

Commands.prototype.sillazo = function (canal, usuario, victima) {
  if (!usuario.badges.subscriber) {
    CLIENT.say(canal, randomQuote('no-subscriber'))
  } else {
    CLIENT.say(canal,
      victima
        ? randomQuote('sillazo', { target: victima })
        : randomQuote('sillazo-generic'))
  }
}
Commands.prototype.duelo = function (canal, usuario, victima) {
  CLIENT.say(canal,randomQuote('preduel', { nombre: usuario, target: victima}))
  CLIENT.say(canal,randomQuote('induel', {nombre: usuario, target: victima})) // TODO Solo funciona el primer target y poner aceptar y denegar y siempre gana el primero
  CLIENT.say(canal,randomQuote('postduel', {
    target: Math.floor(Math.random()*2) === 0 ? '@' + usuario : victima}))
}


module.exports = new Commands()
