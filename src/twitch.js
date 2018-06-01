 /* ==================================*\
|               LIBRERÍAS              |
\* ================================= */
const TMI = require('tmi.js');

 /* ==================================*\
|             CONFIGURACIÓN            |
\* ================================= */
var owner = '0nlyBree';

var viewers = [];
var viewers_greetings = [];
var viewers_ignore = [
    owner,
    "ChappieTheBot",
    "StreamElements"
];

// DATABASE (MLAB)
var mlab_api = String();
fetch('./settings.json').then(function(res) {
    res.json().then(function(settings) {
        const MLAB_APIKEY = settings.MLAB_APIKEY;
        const MLAB_DOCUMENT = settings.MLAB_DOCUMENT;
        mlab_api = 'https://api.mlab.com/api/1/databases/chappie/collections/'
            .concat(owner).concat('/').concat(MLAB_DOCUMENT).concat('?apiKey=').concat(MLAB_APIKEY);
    });
}).catch(function() {
    // TODO: Implementar alerta por ausencia del archivo src/settings.json
    // alert("ES NECESARIO TENER UN ARCHIVO LLAMADO SETTINGS.JSON EN LA CARPETA SRC");
});


// PUNTOS | MONEDA
const POINTS_NAME = "trocitos de pizza"; // Nombre de los puntos | moneda
const POINTS_VIEW = 20; // Cantidad de puntos por estar viendo el stream
const POINTS_VIEW_INTERVAL = 5; // En segundos
// Cuentas que NO recibirán puntos
var points_blacklist = [
    "ChappieTheBot",
    "StreamElements"
];

 /* ==================================*\
|               CONEXIÓN               |
\* ================================= */
var options = {
    options: {
        debug: false
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: "ChappieTheBot",
        password: 0 // FIXME: Twitch Oauth
    },
    channels: [ owner ]
};

const CLIENT = new tmi.client(options);
CLIENT.connect();

 /* ==================================*\
|               FUNCIONES              |
\* ================================= */
function getViewers() {
    // Creamos una promesa
    return new Promise(function(resolve, reject) {
        // Usamos el API de Tmi.js => https://tmi.twitch.tv/group/user/channelname/chatters
        fetch('https://tmi.twitch.tv/group/user/'.concat(owner).concat('/chatters'))
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
        fetch(mlab_api)
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
        fetch(mlab_api, {
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

 /* ==================================*\
|            EVENTOS DEL CHAT          |
\* ================================= */
// Eventos de chat (nuevos mensajes)
CLIENT.on('chat', function (canal, usuario, msg, self) {
    // Evita leer sus propios mensajes
    if (self) return;
    else {
        greetings(usuario['display-name'])
    }
});

 /* ==================================*\
|            FUNCIONALIDADES           |
\* ================================= */
function greetings(username) {
    username = username.toLowerCase();
    // Si el viewer no ha sido saludado y no está en la lista negra
    if(viewers_ignore.indexOf(username) === -1 && viewers_greetings.indexOf(username) === -1) {
        console.log(username); // TODO: Implementar saludo
        viewers_greetings.push(username);
    }
}

function givePointsToAll() {
    getDatabase().then(function(database) {
        let data = {};
        for(let viewer of viewers) {
            if(points_blacklist.indexOf(viewer) === -1) // Comprobamos que no esté en la lista negra
                data[viewer] = database[viewer] ? database[viewer] + POINTS_VIEW : POINTS_VIEW;
        }
        updateDatabase(data).then().catch(function(error) {});
    }).catch(function(error) {});
}

 /* ==================================*\
|            EVENTOS DEL BOT           |
\* ================================= */
function checkConfig() {
    owner = owner.toLowerCase();
    for(let i in points_blacklist)
        points_blacklist[i] = points_blacklist[i].toLowerCase();
    for(let i in viewers_ignore)
        viewers_ignore[i] = viewers_ignore[i].toLowerCase();
}

function initAllEvents() {
    setInterval(updateViewers, POINTS_VIEW_INTERVAL * 1000);
    setInterval(givePointsToAll, POINTS_VIEW_INTERVAL * 1000);
}

checkConfig();
initAllEvents();