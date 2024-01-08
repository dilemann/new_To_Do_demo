import NoteList from './NoteList.js';

class User {
  constructor(parent, name) {
    this.name = name;
    this.parent = parent;
    console.log(this.parent);
    this.container = document.createElement('div');
    this.parent.append(this.container);
    this.noteList = new NoteList(this.container, name);
  }
}

export default User;
