﻿// Conseguimos los elementos de la ventana
const msg = document.getElementById('msg')
const pet = document.getElementById('pet')

// Constantes de las configuraciones
const owner = "suraei"
const animal = "panda"
const current_elo = 'Bronce III'
const rango_lider = "Pizza Suprema"

// Funcion para hacer descansar a la mascota
setIdle = () => {
    texto = " "
    state = "idle"
}

// Declaramos variables iniciales
var texto = undefined           // texto actual de la mascota
var state = undefined           // estado actual de la mascota
var xDelay = 1                  // repeticiones de un estado
var inCombat = false            // ¿estamos en guerra?
var last_msg = undefined        // ultimo mensaje leído
var participantes = [ ]         // participantes en los combates
var actual_lider = undefined    // lider actual

setIdle()

// Creamos una función para refrescar la mascota
refreshPet = () => {
    // Actualizamos el estado de la mascota
    var current_state = state
    msg.innerHTML = texto
    msg.classList.add("dialog")
    pet.src = "./public/gif/" + animal + "_" + state + ".gif"

    // Comprobamos si habia y se ha terminado el combate
    if(inCombat && current_state != "attack") {
        finalizarCombate();
    }

    window.clearInterval(refreshPet);
    if(state == "idle") {
        window.setTimeout(refreshPet, 1500)
        setIdle()
        msg.classList.remove("dialog")
    } else if(state == "attack") {
        window.setTimeout(refreshPet, 3000 * xDelay)
        setIdle()
    } else if(state == "greetings") {
        window.setTimeout(refreshPet, 1850 * xDelay)
        setIdle()
    }
}

// Refrescamos la mascota cada 1.5s por defecto
window.setTimeout(refreshPet, 1500)

// Funcion para elegir frase random
randomQuote = (quotes) => {
    return quotes[Math.floor(Math.random() * (quotes.length))]
}


//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

   //\\//\\//\\//\\    //\\//\\//\\//\\    INTELIGENCIA     DE     CHAPPIE    //\\//\\//\\//\\    //\\//\\//\\//\\  

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


// Importamos la libreria de TMI.js
const tmi = require('tmi.js') // https://docs.tmijs.org/

// Creamos las opciones del bot
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
    //chappie.say(owner, "Chappie... estar... ¡vivo!")
})

// Rutina al leer un mensaje del chat
chappie.on("chat", function(channel, user, message, self) {   
    // Ignoramos mensajes duplicados 
    if(last_msg != user['display-name'] + message) {

        // Comprobamos si es un comando
        if(message[0] === '!') {
            console.log("[*] Comando detectado: " + message)
            // Separamos el comando de los argumentos (si los tiene)
            var commands = message.split(" ")
            if(commands[0] == "!combate" && user['broadcaster']) {
                combate()
            } else if(commands[0] == "!elo") {
                elo()
            } else if(commands[0] == "!sillazo") {
                sillazo(user['display-name'], commands[1], user['subscriber'])
            } else if(commands[0] == "!report") {
                report(user['display-name'], commands[1])
            } else if(commands[0] == "!lider") {
                lider()
            } else if(commands[0] == "!luchar") {
                luchar(user['display-name'])
            }
    
            // Comprobamos si alguien ha saludado
        } else if(message.toLowerCase().includes('hola') || message.toLowerCase().includes('buenos dias') || message.toLowerCase().includes('buenas tardes')) {
            saludar(user['display-name'])
            // Comandos de mantenimiento
        } else if(message == "ping") {
            pong(user['display-name'])
        } else if(message == "pong") {
            ping(user['display-name'])
        }

        // Actualizamos cual ha sido el ultimo mensaje y de quien
        last_msg = user['display-name'] + message
    }
    
    /*
   
    */
})

// Conectamos el bot al canal si no está conectado ya
if(chappie.readyState() == "CLOSED") {
    chappie.connect()
}


//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

    //\\//\\//\\//\\    //\\//\\//\\//\\    COMANDOS     DE     CHAPPIE    //\\//\\//\\//\\    //\\//\\//\\//\\

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


ping = (usuario) => {
    // Rutina de mantenimiento y debug
    if(usuario.toLowerCase() != chappie.getUsername()) {
        chappie.say(owner, "ping")
    }
}

pong = (usuario) => {
    // Rutina de mantenimiento y debug
    if(usuario.toLowerCase() != chappie.getUsername()) {
        chappie.say(owner, "pong")
    }
}

// -----------------------------------------------------------------------------------------------------------------

saludar = (nombre) => {
    // Rutina para saludar
    if(nombre.toLowerCase() != chappie.getUsername()) {
        // Emociones de la mascota
        state = "greetings"
        texto = "¡Hola " + nombre + "!"
        xDelay = 3

        // Frases del bot
        var quotes = [
            'Qué bueno verte por aquí, ' + nombre,
            'Hola ' + nombre,
            '¿Eres nuevo por aquí, ' + nombre + '? No me suenas Kappa',
            '¡Hola ' + nombre + '! Mi vida era vací­a sin ti...'
        ]
        chappie.say(owner, randomQuote(quotes))
    }
}

// -----------------------------------------------------------------------------------------------------------------

sillazo = (usuario, victima, isSub) => {
    // Rutina para dar sillazos (sólo subs)
    if(isSub) {
        if(victima == undefined) {
            var quotes = [
                'tiene la silla, pero no sabe a quién lanzársela',
                'está tan confuso que se hirió a sí mismo',
                'está aprendiendo qué es una silla. Ten paciencia...'
                
            ]
            chappie.action(owner, randomQuote(quotes))
        } else if (victima.toLowerCase() == chappie.getUsername().toLowerCase()) {
            var quotes = [
                'no es tonto. No se va a lanzar una silla a sí mismo',
                'está tan confuso que se hirió a si mismo',
                'tiene la silla, pero no sabe a quién lanzársela',
                'no entiende por qué le mandas herirse, así que decide lanzarte el sillazo'
            ]
            chappie.action(owner, randomQuote(quotes))
        } else {
            state = "attack"
            texto = "¡Sillazo!"
            xDelay = 1
            chappie.say(owner, usuario + " le ha dado un sillazo a " + victima)
        }
    } else {
        chappie.action(owner, " sólo da sillazos si se lo manda un sub")
    }
}

// ---------------------------------------------------------------------------------------

elo = () => {
    var quotes = [
        'Suraei es ' + current_elo  + ', pero juega como si fuera Madera V',
        current_elo,
        'Riot opina que es ' + current_elo,
        'Camino a Diamante, pero de momento es ' + current_elo
    ]
    chappie.say(owner, randomQuote(quotes))
}

// ---------------------------------------------------------------------------------------

report = (usuario, victima) => {
    var quotes = [
        'no entiende el por qué de tu report',
        'quiere que sepas que tus preocupaciones son sus preocupaciones',
        'está revisando tu report, pero seamos sinceros, lo va a ignorar completamente',
        'piensa que quizás si merezca la pena reportar',
        'pasa de tu report, ' + usuario
    ]
    if(victima == undefined) {
        chappie.action(owner, randomQuote(quotes))
    } else {
        quotes[quotes.length] = 'admite que  hay que reportar a ' + victima
        quotes[quotes.length] = 'piensa que ' + victima + ' no se merece ese report'
        chappie.action(owner, randomQuote(quotes))
    }
}

// ---------------------------------------------------------------------------------------

combate = () => {
    var quotes = [
        'Cae la noche...',
        'Algo pasa...',
        'Está sucediendo...',
        'Las nubes se ciernen sobre el stream...'
    ]
    chappie.say(owner, randomQuote(quotes))

    var quotes = [
        'Notais que se os pone la piel de gallina',
        'El ambiente se nota cargado',
        'Mal momento para apartarse del teclado...',
        'La adrenalina inunda el ambiente'
    ]
    chappie.say(owner, randomQuote(quotes))

    var quotes = [
        'Encomendaros a la pizza que más ameis, porque esto no va a ser fácil',
        'Pedidle a Suraei que os bendiga y os acompañe en este duro evento',
        'El lider actual no contenta a sus fieles y eso tiene que cambiar'
    ]
    chappie.say(owner, randomQuote(quotes))

    chappie.say(owner, '¡Sólo aquellos valientes que decidan luchar podrán alzarse con la victoria!')
    chappie.say(owner, "Pon !luchar para pelear por el puesto de " + rango_lider)

    participantes = [ ]

    state = "attack"
    texto = "¡Combatiendo!"
    xDelay = 10
    inCombat = true
    chappie.followersonly(owner, 0);
}

luchar = (usuario) => {
    if(inCombat && !participantes.includes(usuario)) {
        participantes[participantes.length] = usuario
    } else if(!inCombat) {
        var quotes = [
            'Esperemos que ' + rango_lider + ' no se entere de que intentas traicionarle...',
            'Toda traición debe ser hecha a su debido tiempo, así que ten paciencia',
            'Todavia no es momento de levantarse y luchar. Disfruta de la paz mientras puedas'
        ]
        chappie.say(owner, randomQuote(quotes))
    }
}

finalizarCombate = () => {
    console.log(participantes)
    if(participantes.length == 0) {
        chappie.say(owner, "Parece que nadie tuvo valor para pelear por el título de " + rango_lider)
    } else {
        actual_lider = randomQuote(participantes)
        var quotes = [
            'Ha sido una batalla épica e intensa, pero al final parece ser que ' + actual_lider + ' se alza como ' + rango_lider + '. ¡Enhorabuena!',
            'Los libros de historia hablarán de cómo la pizza con piña inundaba el cielo, hiriendo a aquellos no tan valientes. Al final, la guerra terminó gracias a ' + actual_lider + ', quien obtuvo el título de ' + rango_lider,
            'A pesar de que ha sido un enfrentamiento duro, al final todos se postran ante ' + actual_lider + ', quien ahora es ' + rango_lider
        ]
        participantes = [ ]
        chappie.say(owner, randomQuote(quotes))
    }
    inCombat = false
    chappie.followersonlyoff(owner)
    window.setTimeout(combate, 60 * 1000 * 5)
}

lider = () => {
    if(actual_lider == undefined) {
        chappie.say(owner, "Actualmente nadie obstenta el título de " + rango_lider)
    } else {
        var quotes = [
            'Todos han de postrarse ante ' + actual_lider + ', actual ' + rango_lider,
            'El rango de ' + rango_lider + ' lo sostiene ' + actual_lider + ', actualmente',
            '¿Que quién es ' + rango_lider + '? Pues de momento lo es ' + actual_lider
        ]
        chappie.say(owner, randomQuote(quotes))
    }
}

// Combates cada 5 minutos
window.setTimeout(combate, 60 * 1000 * 5)