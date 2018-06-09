 /* ==================================*\
|               LIBRERÍAS              |
\* ================================= */
const PET = require('../components/pet');
const CMD = require('../components/commands');
const {CLIENT} = require('../components/twitch');

CLIENT.connect();

 /* ==================================*\
|            EVENTOS DEL CHAT          |
\* ================================= */
// Evento: Nuevo mensaje (chat)
CLIENT.on('chat', function (canal, usuario, msg, self) {
    // Evita leer sus propios mensajes
    if (self) return;
    else {
        // CMD.greet(usuario['display-name']);
    }
});

// Evento: Donación de cheers
CLIENT.on("cheer", function (canal, usuario, message) {
    // TODO: Cheer Event
    console.log(canal, usuario['display-name'] + " ha donado " + usuario['bits'] + ' con el mensaje: ' + message);
});

// Evento: Host
CLIENT.on("hosted", function (canal, usuario, viewers, autohost) {
    if(autohost) console.log(usuario, ' te tiene activo ahora mismo en el autohost. (' + viewers + ' viewers)');
    else console.log(canal, usuario, ' te ha hosteado con ' + viewers + ' viewers!');
});

// Evento: Subscripción
CLIENT.on("subscription", function (canal, usuario, metodo, message, userstate) {
    console.log(canal, usuario + ' se ha suscrito usando ' + metodo.plan);
});

// Evento: Re-Subscripción
CLIENT.on("resub", function (canal, usuario, meses, message, userstate, metodo) {
    console.log(canal, usuario + ' se ha suscrito por ' + meses + ' mes consecutivo usando ' + metodo.plan);
});

CLIENT.on("join", function (channel, usuario, self) {
    // Cuando alguien se une al chat
});

CLIENT.on("part", function (canal, usuario, self) {
    // Cuando alguien deja el chat
});








