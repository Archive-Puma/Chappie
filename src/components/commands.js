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
    quote = quote.replace(new RegExp('\\$user', 'g'), '@' + argv.usuario)
    quote = quote.replace(new RegExp('\\$owner', 'g'), CONFIG.owner)
    if (argv.target) { quote = quote.replace(new RegExp('\\$target', 'g'), argv.target) }
  }
  return quote
}

Commands.prototype.greet = function (nombre) {
  let usuario = nombre.toLowerCase()
  // Si el viewer no ha sido saludado y no está en la lista negra ...
  if (CONFIG.blacklist.indexOf(usuario) === -1 && this.GREETED_VIEWERS.indexOf(usuario) === -1) {
    // ... lo saludamos
    console.log(randomQuote('greetings', { usuario: nombre })) // FIXME: Implementar saludo
    this.GREETED_VIEWERS.push(usuario)
  }
}

Commands.prototype.sillazo = function (canal, usuario, victima) {
  if (!victima) {
    CLIENT.say(canal, randomQuote('bad-target', { usuario: usuario['display-name'] }))
  } else { CLIENT.say(canal, randomQuote('sillazo', { usuario: usuario['display-name'], target: victima })) }
}

Commands.prototype.pizzear = function (canal, usuario, victima) {
  if (!victima) {
    CLIENT.say(canal, randomQuote('bad-target', { usuario: usuario['display-name'] }))
  } else { CLIENT.say(canal, randomQuote('sillazo', { target: victima })) }
}

Commands.prototype.subCommandError = function (canal, usuario) {
  CLIENT.say(canal, randomQuote('no-subscriber'), { usuario: usuario })
}

module.exports = new Commands()
