import ToDo from './ToDo.js';
// import User from './User.js';

const parent = document.querySelector('.app');
const action = document.querySelector('.action__btn');
const removeBtn = document.querySelector('.remove__btn');

const newToDo = new ToDo(parent);

// const newNotelist = new NoteList(parent);

action.addEventListener('click', () => {
  newToDo.addNewUser(prompt('enter User Name:'));
});

removeBtn.addEventListener('click', () => {
  newToDo.removeUser();
});
