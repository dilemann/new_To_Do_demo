import Note from './Note.js';
import NoteList from './NoteList.js';

const parent = document.querySelector('.app');
const action = document.querySelector('.action__btn');

const newNotelist = new NoteList(parent);

action.addEventListener('click', () =>
  newNotelist.addNote(prompt('Geben Sie Daten ein'))
);
