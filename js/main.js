/*
/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/      APP  CODE      /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
*/

// Importamos todo lo relacionado con Electron
const electron = require('electron')
const {app, BrowserWindow} = require('electron')

// Importamos otras librerias
const url = require('url')
const path = require('path')

var mascota

// Evitamos que la ventana se cierre por el recolector de basura
let window

function createWindow() {
    // Creamos la ventana
    window = new BrowserWindow({
        width: 500, height: 500,
        frame: false,
        resizable: false,
        transparent: true
    })

    // Cargamos el archivo index.html
    window.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
    }))

    // Cerramos la ventana
    window.on('closed', () => {
        window = null
    })

    // Abre las herramientas de desarrollo.
    // window.webContents.openDevTools()

    connectBot();
}

// Creamos la ventana cuando empiece el programa
app.on('ready', createWindow)

// Salir cuando todas las ventanas estén cerradas.
app.on('window-all-closed', () => {
    // En macOS es común para las aplicaciones y sus barras de menú
    // que estén activas hasta que el usuario salga explicitamente con Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

app.on('activate', () => {
    // En macOS es común volver a crear una ventana en la aplicación cuando el
    // icono del dock es clickeado y no hay otras ventanas abieras.
    if (window === null) {
      createWindow()
    }
})

/*
/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/  COMUNICATION CODE  /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
*/

/*
/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/      BOT  CODE      /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
*/

// Importamos la libreria de TMI.js
const tmi = require('tmi.js') // https://docs.tmijs.org/

// Creamos las opciones del bot
const owner = "suraei"
const options = {
    options: {
        debug: false
    },
    // Twitch IRC Server
    connection: {
        cluster: "aws",
        reconnect: true
    },
    // Bot User
    identity: {
        username: "ChappieTheBot",
        password: "oauth:epjk8hx1qtk262s8kmhmagqujo61i2"
    },
    // Twitch Channels
    channels: [ owner ]
}

// Creamos el cliente
var bot = new tmi.client(options);

// Variables
var state = "idle"

// Rutina al conectarse
bot.on("connected", function(address, port) {
    console.log("[*] Bot conectado")
    //bot.say(owner, "Chappie... estar... ¡vivo!")
})

bot.on("chat", function(channel, user, message, self) {
    if(message[0] === '!') {
        var commands = message.split(" ")
        console.log("[*] Comando detectado: " + commands)
        if(commands[0] === "!report") {
            report(user['display-name'], commands[1])
        } else if (commands[0] === "!ping") {
            bot.say(owner, "pong")
        } else if (commands[0] === "!pong") {
            bot.say(owner, "ping")
        } else if(commands[0] === "!elo") {
            elo()
        } else if(commands[0] === "!sillazo") {
            sillazo(user['display-name'], commands[1], user['subscriber'])
        }
    } else if(message.toLowerCase().includes('hola')) {
        saludar(user['display-name'])
    } else {
        console.log(message)
        texto.innerHTML = message
    }
})

function connectBot() {
    bot.connect();
}

// Exportamos el bot
exports.bot = bot

// ---------------------------------------------------------------------------------------

function report(usuario, victima) {
    var quote = [
        ' no entiende el por qué de tu report',
        ' quiere que sepas que tus preocupaciones son sus preocupaciones',
        ' está revisando tu report, pero seamos sinceros, lo va a ignorar completamente'
    ]
    if(victima == undefined) {
        bot.action(owner, quote[Math.floor(Math.random() * (quote.length))])
    } else {
        quote[quote.length] = ' pasa de tu report, ' + usuario
        quote[quote.length] = ' piensa que ' + usuario + ' no se merece ese report'
        bot.action(owner, quote[Math.floor(Math.random() * (quote.length))])
    }
}

// ---------------------------------------------------------------------------------------

function elo() {
    current_elo = 'Bronce III'
    var quote = [
        'Suraei es ' + current_elo  + ', pero juega como si fuera Madera V',
        current_elo,
        'Riot opina que es ' + current_elo,
        'Camino a Diamante, pero de momento es ' + current_elo
    ]
    bot.say(owner, quote[Math.floor(Math.random() * (quote.length))])
}

// ---------------------------------------------------------------------------------------

function sillazo(usuario, victima, isSub) {
    if(isSub) {
        if(victima == undefined) {
            bot.say(owner, "Yo no saber a quien lanzar la silla... Por favor, sé más concreto")
        } else {
            bot.say(owner, usuario + " le ha dado un sillazo a " + victima)
        }
    } else {
        bot.action(owner, " sólo da sillazos si se lo manda un sub")
    }
}

// ---------------------------------------------------------------------------------------

function ping() {
    bot.say(owner, "pong")
}

function pong() {
    bot.say(owner, "ping")
}

// ---------------------------------------------------------------------------------------

function saludar(usuario) {
    var quote = [
        'Bueno verte por aquí ' + usuario,
        'Hola ' + usuario,
        '¿Eres nuevo por aquí, ' + usuario + '? No me suenas Kappa',
        //'Buenas ' + usuario + ', espero que seas mejor viewer que @sw4t_alan',
        '¡Hola ' + usuario + '! Mi vida era vacía sin ti...',
    ]
    bot.say(owner, quote[Math.floor(Math.random() * (quote.length))])
}

// ---------------------------------------------------------------------------------------