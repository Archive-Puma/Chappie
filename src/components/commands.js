const QUOTES = require('../components/quotes')
const CONFIG = require('../components/config')

class CMD {
  constructor () {
    this.GREETED_VIEWERS = []
  }
}

// Función para obtener una frase aleatoria
function randomQuote (category, argv) {
  let quote = QUOTES[category][Math.floor(Math.random() * (QUOTES[category].length))]
  if (argv) quote = quote.replace('$user', argv)
  quote = quote.replace('$owner', CONFIG.owner)
  return quote
}

CMD.prototype.greet = function (nombre) {
  let usuario = nombre.toLowerCase()
  // Si el viewer no ha sido saludado y no está en la lista negra ...
  if (CONFIG.blacklist.indexOf(usuario) === -1 && this.GREETED_VIEWERS.indexOf(usuario) === -1) {
    // ... lo saludamos
    console.log(randomQuote('greetings', '@' + nombre)) // FIXME: Implementar saludo
    this.GREETED_VIEWERS.push(usuario)
  }
}

module.exports = new CMD()
