import Note from './Note.js';
import NoteList from './NoteList.js';
import { ToDo } from './ToDo.js';

const parent = document.querySelector('.app');
const action = document.querySelector('.action__btn');
const removeBtn = document.querySelector('.remove__btn');

const newToDo = new ToDo(parent);

// const newNotelist = new NoteList(parent);

action.addEventListener('click', () => {
  newToDo.addNewUser(prompt('geben User Name ein'));
});

removeBtn.addEventListener('click', () => {
  newToDo.removeUser();
});
