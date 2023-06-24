import Note from './Note.js';
import NoteList from './NoteList.js';

const parent = document.querySelector('.app');
const action = document.querySelector('.action__btn');

const newNote = new Note(parent);

newNote();
