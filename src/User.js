import NoteList from './NoteList';

class User {
  constructor(name) {
    this.name = name;
    this.container = document.createElement('div');
    this.noteList = new NoteList(this.container, name);
  }
}

export default User;
