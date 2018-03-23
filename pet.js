// Conseguimos los elementos de la ventana
const msg = document.getElementById('msg')
const pet = document.getElementById('pet')

// Declaramos variables iniciales
var texto = "."
var state = "idle"
var animal = "panda"

// Creamos una función para refrescar la mascota
refreshPet = () => {
    msg.innerHTML = texto
    pet.src = "./public/gif/" + animal + "_" + state + ".gif"

    if(state == "idle") {
        window.setTimeout(refreshPet, 1500)
        if(texto == "...") {
            texto = "."
        } else {
            texto = texto + "."
        }
    } else if(state == "attack") {
        window.setTimeout(refreshPet, 3000 * 2)
        texto = "."
        state = "idle"
    } else if(state == "greetings") {
        window.setTimeout(refreshPet, 1850 * 3)
        texto = "."
        state = "idle"
    }

    console.log("Estado: " + state + "\nTexto: " + texto)
}

// Refrescamos la mascota cada 1.5s por defecto
window.setTimeout(refreshPet, 1500)


//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

   //\\//\\//\\//\\    //\\//\\//\\//\\    INTELIGENCIA     DE     CHAPPIE    //\\//\\//\\//\\    //\\//\\//\\//\\  

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


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
var chappie = new tmi.client(options);

// Rutina al conectarse
chappie.on("connected", function(address, port) {
    console.log("[*] Bot conectado")
    chappie.say(owner, "Chappie... estar... ¡vivo!")
})

// Rutina al leer un mensaje del chat
chappie.on("chat", function(channel, user, message, self) {
    // Comprobamos si es un comando
    if(message[0] === '!') {
        console.log("[*] Comando detectado: " + message)
        // Separamos el comando de los argumentos (si los tiene)
        var commands = message.split(" ")
        if(commands[0] == "!combate") {
            combate()
        }
        // Comprobamos si alguien ha saludado
    } else if(message.toLowerCase().includes('hola')) {
        saludar(user['display-name'])
    }
})

// Conectamos el bot al canal
chappie.connect()


//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

    //\\//\\//\\//\\    //\\//\\//\\//\\    COMANDOS     DE     CHAPPIE    //\\//\\//\\//\\    //\\//\\//\\//\\

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


saludar = (nombre) => {
    state = "greetings"
    texto = "¡Hola " + nombre + "!"
}

// -----------------------------------------------------------------------------------------------------------------

combate = () => {
    state = "attack"
    texto = "¡Combatiendo!"
}