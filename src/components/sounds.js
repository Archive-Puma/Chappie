// Clase con los sonidos necesarios para Chappie
class Sound {
    // Añadimos aquí las constantes
    constructor() {
        // Carpeta con los sonidos
        this.SOUNDS_DIR = '../resources/sounds/';
        // Pistas de audio
        // Para añadir una seguir el siguiente patrón
        // this.NOMBRE = new Audio(this.SOUNDS_DIR + 'NOMBRE.extension');
        this.BLOB = new Audio(this.SOUNDS_DIR + 'Blob.mp3');
    }

    // Funciones para reproducir los sonidos
    // Seguir el siguiente patrón a la hora de programar
    // nombre() { this.NOMBRE.play() }
    blob() { this.BLOB.play(); }
}

// Exportamos una nueva clase por defecto
module.exports = new Sound();