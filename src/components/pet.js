class Pet {
  constructor () {
    /* Mascotas disponibles: */
    //  - panda
    //  - rabbit
    this.PET = 'panda'
    this.PET_ELEMENT = document.getElementById('pet')
    this.PET_SRC = '../resources/pets/'.concat(this.PET).concat('/')

    // Pose predeterminada: Idle
    this.state = 'idle'

    this.changeGIF()
  }
}

Pet.prototype.setState = function (state) {
  this.state = state
  this.changeGIF()
}

Pet.prototype.changeGIF = function () {
  this.PET_ELEMENT.src = this.PET_SRC.concat(this.state).concat('.gif')
}

module.exports = new Pet()
