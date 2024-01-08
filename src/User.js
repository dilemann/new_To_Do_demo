import NoteList from './NoteList.js';

class User {
  constructor(parent, title) {
    this.title = title;
    this.parent = parent;
    this.container = document.createElement('div');
    this.parent.append(this.container);
    this.noteList = new NoteList(this.container, this.title);
  }
}

export default User;
