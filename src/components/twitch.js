/* ==================================*\
|               LIBRERÍAS              |
\* ================================= */
const TMI = require('tmi.js');
const CONFIG = require('../components/config');

/* ==================================*\
|             CONFIGURACIÓN            |
\* ================================= */
var database = String();
var clientID = String();
fetch('../settings.json').then(function (res) {
    res.json().then(function (settings) {
        // Conseguir la URL de la base de datos
        const MLAB_APIKEY = settings.MLAB_APIKEY;
        const MLAB_DOCUMENT = settings.MLAB_DOCUMENT;
        database = 'https://api.mlab.com/api/1/databases/chappie/collections/'
            .concat(CONFIG.OWNER).concat('/').concat(MLAB_DOCUMENT).concat('?apiKey=').concat(MLAB_APIKEY);
        // Conseguir el OAUTH de Twitch
        // this.TWITCH_OAUTH = settings.TWITCH_OAUTH
        // Conseguir el Client ID de Twitch
        clientID = settings.TWITCH_CLIENT_ID;
    });
}).catch(function () {
    // TODO: Implementar alerta por ausencia del archivo src/settings.json
    // alert("ES NECESARIO TENER UN ARCHIVO LLAMADO SETTINGS.JSON EN LA CARPETA SRC");
});

/* ==================================*\
|               CONEXIÓN               |
\* ================================= */
var options = {
    options: {
        debug: CONFIG.DEBUG
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: CONFIG.BOT_NAME,
        password: "oauth:epjk8hx1qtk262s8kmhmagqujo61i2" // FIXME: Twitch Oauth
    },
    // FIXME: CONFIG.OWNER debe manejar varios canales, no sólo uno
    channels: [CONFIG.OWNER, 'hekady', 'mery_soldier']
};

tmi.client.prototype.followHandler = function(self) {
    // Iniciamos un contador de viewers si no lo tiene
    if(!self._followers) self._followers = {};
    // Ejecutamos la rutina para cada canal en el que esté el cliente
    for (let channel of this.opts.channels) {
        let limit = 1;
        // Si no existe la key con el nombre del canal, lo creamos
        if(!self._followers[channel]) self._followers[channel] = -1;
        // Montamos la URL de la API de Twitch
        let kraken = `https://api.twitch.tv/kraken/channels/${channel.substring(1)}/follows?client_id=${clientID}&limit=${limit}`;
        // Realizamos una petición para ver el número de followers
        fetch(kraken).then(res => res.json().then(function(info) {
            // Si sabemos cuantos seguidores tenía antes el canal ...
            if(self._followers[channel] !== -1) {
                // Guardamos el último follower para evitar saltarnos alguno
                let last_follower = info.follows[0].user.display_name; 
                // ... comprobamos si hay nuevos followers
                limit = info._total - self._followers[channel];
                if(limit > 0) {
                    // Creamos un límite seguro para evitar errores
                    let safe_limit = 10;
                    // Reescribimos la URL
                    // FIXME: Tiene que haber formas más optimizadas de hacer esto
                    kraken = `https://api.twitch.tv/kraken/channels/${channel.substring(1)}/follows?client_id=${clientID}&limit=${limit + safe_limit}`
                    // Preguntamos de nuevo por los nuevos followers
                    fetch(kraken).then(_res => _res.json().then(function(data) {
                        let i = 0;
                        // Mostramos los nuevos followers...
                        while(i < limit + safe_limit && data.follows[i].user.display_name !== last_follower) {
                            // ... enviando un evento en el cliente
                            self.emit('follow', channel, data.follows[i].user.display_name);
                            i++;
                        }
                    }));
                }
            }
            // Actualizamos el número de followers del canal
            self._followers[channel] = info._total;
        })).catch();
    }
}

const CLIENT = new tmi.client(options);

// Creamos un intervalo de repetición para la función de los followers
setInterval(() => CLIENT.followHandler(CLIENT), CONFIG.FOLLOW_INTERVAL * 1000);

// ___________________________________________ 

/* ==================================*\
|               FUNCIONES              |
\* ================================= */
/*
function getViewers() {
    // Creamos una promesa
    return new Promise(function(resolve, reject) {
        // Usamos el API de Tmi.js => https://tmi.twitch.tv/group/user/channelname/chatters
        fetch('https://tmi.twitch.tv/group/user/'.concat(CONFIG.OWNER).concat('/chatters'))
        // Cuando tengamos los datos, los resolvemos en la respuesta más simplificados
            .then(function (res) {
                res.json().then(function (data) {
                    let viewers = [];
                    for(let viewer of data.chatters.moderators)
                        viewers.push(viewer.toLowerCase());
                        for(let viewer of data.chatters.viewers)
                        viewers.push(viewer.toLowerCase());
                    resolve(viewers);
                });
            });
    });
}

function getDatabase() {
    return new Promise(function(resolve, reject) {
        fetch(database)
            .then(function(res) {
                res.json().then(function(data) {
                    resolve(data);
                });
            }).catch(function(error) {});
    });
}

function updateDatabase(newData) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var body = '{ "$set": ' + JSON.stringify(newData) + '}';

    return new Promise(function(resolve, reject) {
        fetch(database, {
            method: 'PUT',
            headers: headers,
            body: body
        }).then(function() {
            resolve('Update!');
        }).catch(function() {
            reject('Upss');
        });
    });
}

function updateViewers() {
    getViewers().then(function(_viewers) {
        viewers = _viewers;
    }).catch();
}

function givePointsToAll() {
    getDatabase().then(function(database) {
        let data = {};
        for(let viewer of viewers) {
            if(CONFIG.POINTS_VIEW_BLACKLIST.indexOf(viewer) === -1) // Comprobamos que no esté en la lista negra
                data[viewer] = database[viewer] ? database[viewer] + CONFIG.POINTS_VIEW : CONFIG.POINTS_VIEW;
        }
        updateDatabase(data).then().catch(function(error) {});
    }).catch(function(error) {});
}
*/
/* ==================================*\
|            EVENTOS DEL BOT           |
\* ================================= */
/*
function initAllEvents() {
    setInterval(updateViewers, CONFIG.POINTS_VIEW_INTERVAL * 1000);
    setInterval(givePointsToAll, CONFIG.POINTS_VIEW_INTERVAL * 1000);
}

initAllEvents();
*/

module.exports = {
    CLIENT: CLIENT
}