/* global XMLHttpRequest */

const QUOTES = require('../components/quotes')
const CONFIG = require('../components/config')
const CLIENT = require('../components/twitch')

class Commands {
  constructor () {
    this.DUELS = {}
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

Commands.prototype.greet = function (canal, nombre) {
  let usuario = nombre.toLowerCase()
  // Si el viewer no ha sido saludado y no está en la lista negra ...
  if (CONFIG.blacklist.indexOf(usuario) === -1 && this.GREETED_VIEWERS.indexOf(usuario) === -1) {
    // ... lo saludamos
    CLIENT.say(canal, randomQuote('greetings', { usuario: nombre })) // FIXME: Implementar saludo
    this.GREETED_VIEWERS.push(usuario)
  }
}

Commands.prototype.followage = function (canal, author, usuario) {
  const target = usuario || author['display-name']
  const URL = `https://2g.be/twitch/following.php?user=${target}&channel=${canal.substring(1, canal.length)}&format=mwdhms`
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', URL, false) // false for synchronous request
  xmlHttp.send(null)
  let msg = xmlHttp.responseText
  if (msg.includes('has been following')) {
    msg = msg.replace('has been following', 'sigue a')
      .replace('months', 'meses')
      .replace('month', 'mes')
      .replace('day', 'día')
      .replace('hour', 'hora')
      .replace('minute', 'minuto')
      .replace('second', 'segundo')
      .replace(' for ', ' desde hace ')
  } else {
    msg = msg.replace('is not following', 'no sigue a')
  }
  CLIENT.say(canal, msg)
}

Commands.prototype.pet = function (canal, PET, skin) {
  let index = PET.AVAILABLE_PETS.indexOf(skin)
  if (index !== -1) PET.PET = PET.AVAILABLE_PETS[index]
  else {
    index = PET.AVAILABLE_PETS_ALT.indexOf(skin)
    if (index !== -1) PET.PET = PET.AVAILABLE_PETS[index]
  }

  if (index !== -1) {
    PET.refresh()
    CLIENT.say(canal, '¡Skin de Chappie actualizada!')
  } else {
    let pets = ''
    for (let pet of PET.AVAILABLE_PETS) pets += pet + ', '
    CLIENT.say(canal, 'Skins disponibles para Chappie: ' + pets.substring(0, pets.length - 2))
  }
}

Commands.prototype.sillazo = function (canal, usuario, victima) {
  if (!victima || victima[0] !== '@') {
    CLIENT.say(canal, randomQuote('bad-target', { usuario: usuario['display-name'] }))
  } else { CLIENT.say(canal, randomQuote('sillazo', { usuario: usuario['display-name'], target: victima })) }
}

Commands.prototype.subCommandError = function (canal, usuario) {
  CLIENT.say(canal, randomQuote('no-subscriber'), { usuario: usuario })
}

Commands.prototype.duel_request = function (canal, usuario, victima) {
  if (!victima || victima[0] !== '@') {
    CLIENT.say(canal, randomQuote('bad-target', { usuario: usuario['display-name'] }))
  } else {
    this.DUELS[victima.substring(1, victima.length)] = usuario['display-name']
    CLIENT.say(canal, randomQuote('preduel', { usuario: usuario['display-name'], target: victima }))
  }
}

Commands.prototype.duel_accept = function (canal, usuario) {
  if (this.DUELS[usuario['display-name']] !== undefined) {
    CLIENT.say(canal, randomQuote('induel', { usuario: usuario['display-name'], target: this.DUELS[usuario['display-name']] }))
    let that = this
    let winner = (Math.random() < 0.5) ? usuario['display-name'] : this.DUELS[usuario['display-name']]
    that.DUELS[usuario['display-name']] = undefined
    setTimeout(function () {
      CLIENT.say(canal, randomQuote('postduel', { target: winner }))
    }, 10000)
  } else {
    CLIENT.say(canal, randomQuote('noduel'))
  }
}

Commands.prototype.duel_decline = function (canal, usuario) {
  if (this.DUELS[usuario['display-name']] !== undefined) {
    CLIENT.say(canal, randomQuote('reject-duel', { usuario: usuario['display-name'] }))
    this.DUELS[usuario['display-name']] = undefined
  } else {
    CLIENT.say(canal, randomQuote('noduel'))
  }
}

Commands.prototype.animar = function (canal, usuario, victima, PET) {
  if (!victima || victima[0] !== '@') {
    CLIENT.say(canal, randomQuote('bad-target', { usuario: usuario['display-name'] }))
  } else {
    PET.setState('dance')
    setTimeout(function () {
      PET.setState('idle')
    }, 8000)
    CLIENT.say(canal, randomQuote('animar', { usuario: usuario['display-name'], target: victima }))
  }
}

Commands.prototype.bostezo = function (canal, usuario, victima) {
  if (!victima || victima[0] !== '@') {
    CLIENT.say(canal, randomQuote('bad-target', { usuario: usuario['display-name'] }))
  } else { CLIENT.say(canal, randomQuote('bostezo', { usuario: usuario['display-name'], target: victima })) }
}

module.exports = new Commands()
