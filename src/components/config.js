// Importamos la configuración del archivo config.js
const CONFIG = JSON.parse(require('fs').readFileSync('src/config.json'))

// Formateamos todo a minúsculas
CONFIG.owner = CONFIG.owner.toLowerCase()
for (let i in CONFIG.blacklist) {
  CONFIG.blacklist[i] = CONFIG.blacklist[i].toLowerCase()
}

// Exportamos la configuración
module.exports = CONFIG

// TODO: Hacer opcionales alguno campos como "pet" -> CONFIG.pet || 'panda'
