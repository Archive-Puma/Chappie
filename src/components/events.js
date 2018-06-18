/* ==================================*\
                LIBRERÍAS
\* ================================= */
const PET = require('../components/pet') // eslint-disable-line no-unused-vars
const CLIENT = require('../components/twitch')
const COMMAND = require('../components/commands')

CLIENT.connect()

/* ==================================*\
             EVENTOS DEL CHAT
\* ================================= */
// Evento: Nuevo mensaje (chat)
CLIENT.on('chat', function (canal, usuario, msg, self) {
  // Evita leer sus propios mensajes
  if (!self) {
    // Saludamos al usuario si es su primer mensaje
    COMMAND.greet(canal, usuario['display-name'])
    // Parseamos el mensaje
    const MSG = msg.trim().split(' ')
    // Comprobamos si un comando ha sido enviado
    if (MSG[0].charAt(0) === '!') {
      // Le quitamos la exclamación
      MSG[0] = MSG[0].substring(1)
      switch (MSG[0]) {
        case 'followage': COMMAND.followage(canal, usuario, MSG[1]); break
        default:
        // Comandos sólo para subs
          if (usuario.badges.subscriber) {
            switch (MSG[0]) {
              case 'pet': COMMAND.pet(canal, PET, MSG[1]); break
              case 'sillazo': COMMAND.sillazo(canal, usuario, MSG[1]); break
              default: break
            }
          } else {
            COMMAND.subCommandError(canal, usuario['display-name'])
          }
          break
      }
    }
  }
})

// Evento: Follow (Custom)
CLIENT.on('follow', function (canal, usuario) {
  console.log(usuario + ' ha empezado a seguir a ' + canal)
})

// Evento: Donación de cheers
CLIENT.on('cheer', function (canal, usuario, message) {
  console.log(canal, usuario['display-name'] + ' ha donado ' + usuario['bits'] + ' bits con el mensaje: ' + message)
})

// Evento: Host
CLIENT.on('hosted', function (canal, usuario, viewers, autohost) {
  if (autohost) console.log(usuario, ' te tiene activo ahora mismo en el autohost. (' + viewers + ' viewers)')
  else console.log(canal, usuario, ' te ha hosteado con ' + viewers + ' viewers!')
})

// Evento: Subscripción
CLIENT.on('subscription', function (canal, usuario, metodo, message, userstate) {
  console.log(canal, usuario + ' se ha suscrito usando ' + metodo.plan, metodo)
})

// Evento: Re-Subscripción
CLIENT.on('resub', function (canal, usuario, meses, message, userstate, metodo) {
  console.log(canal, usuario + ' se ha suscrito por ' + meses + ' mes consecutivo usando ' + metodo.plan, metodo)
})

CLIENT.on('join', function (channel, usuario, self) {
  // Cuando alguien se une al chat
})

CLIENT.on('part', function (canal, usuario, self) {
  // Cuando alguien deja el chat
})
