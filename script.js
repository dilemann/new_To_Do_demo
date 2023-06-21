import Note from './Note.js';
import NoteList from './NoteList.js';

const parent = document.querySelector('.app');
const action = document.querySelector('.action__btn');

const newNoteLIst = new NoteList(parent);

action.addEventListener('click', () =>
  newNoteLIst.add(prompt('Geben ein Name ein!'))
);

// const newNote = new Note(parent, 'Vova');
// newNote.inresolveNote();
