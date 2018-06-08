 /* ==================================*\
|               LIBRERÍAS              |
\* ================================= */
const TMI = require('tmi.js');
const CONFIG = require('../components/config');

 /* ==================================*\
|               DATABASES              |
\* ================================= */
var database = String();
fetch('../settings.json').then(function (res) {
    res.json().then(function (settings) {
        // Conseguir la URL de la base de datos
        const MLAB_APIKEY = settings.MLAB_APIKEY;
        const MLAB_DOCUMENT = settings.MLAB_DOCUMENT;
        database = 'https://api.mlab.com/api/1/databases/chappie/collections/'
            .concat(CONFIG.OWNER).concat('/').concat(MLAB_DOCUMENT).concat('?apiKey=').concat(MLAB_APIKEY);
        // Conseguir el OAUTH de Twitch
        // this.TWITCH_OAUTH = settings.TWITCH_OAUTH
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
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: CONFIG.BOT_NAME,
        password: "oauth:epjk8hx1qtk262s8kmhmagqujo61i2" // FIXME: Twitch Oauth
    },
    channels: [ CONFIG.OWNER ]
};

const CLIENT = new tmi.client(options);

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