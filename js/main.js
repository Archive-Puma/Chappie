// Importamos todo lo relacionado con Electron
const electron = require('electron')
const {app, BrowserWindow} = require('electron')

// Importamos otras librerias
const url = require('url')
const path = require('path')


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

    // Importamos el bot
    var bot = require('./bot.js').bot

    // Conectamos el bot
    bot.connect();
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