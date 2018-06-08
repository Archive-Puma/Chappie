 /* ==================================*\
|               LIBRERÍAS              |
\* ================================= */
const CMD = require('../components/commands');
const {CLIENT} = require('../components/twitch');

CLIENT.connect();

 /* ==================================*\
|            EVENTOS DEL CHAT          |
\* ================================= */
// Eventos de chat (nuevos mensajes)
CLIENT.on('chat', function (canal, usuario, msg, self) {
    // Evita leer sus propios mensajes
    if (self) return;
    else {
        CMD.greet(usuario['display-name']);
    }
});

CLIENT.on("cheer", function (canal, usuario, message) {
    // Do your stuff.
    console.log(usuario['display-name'] + " ha donado " + usuario['bits'] + ' con el mensaje: ' + message);
});