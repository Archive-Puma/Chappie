const PET = 'panda';
const PET_IMG = document.getElementById('pet');
const PET_SRC = '../resources/pets/'.concat(PET).concat('/');

var pet_state = 'idle';

PET_IMG.src = PET_SRC.concat(pet_state).concat('.gif');