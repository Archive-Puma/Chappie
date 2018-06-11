const electron = require('electron')
const app = electron.app

const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    // width: 400, height: 350,
    width: 600,
    height: 450,
    frame: false,
    resizable: false
  })

  mainWindow.loadURL(`file://${__dirname}/views/index.html`)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  mainWindow.removeAllListeners('close')
  mainWindow.close()
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
