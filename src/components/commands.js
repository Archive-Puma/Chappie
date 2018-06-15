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

module.exports = new Commands()
