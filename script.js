import Note from './Note.js';

const parent = document.querySelector('.app');
const action = document.querySelector('.action__btn');

const newNote = new Note(parent);

action.addEventListener(
  'click',
  () => new Note(parent, prompt('Geben ein Name ein'))
);
