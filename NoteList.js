import Note from './Note.js';

class NoteList {
  _noteList = [];
  constructor(parent) {
    this.container = document.createElement('div');
    this.parent = parent;
    this.parent.append(this.container);
    this.noteInit();
  }

  addNote(item) {
    const newNote = new Note(this, item);
    if (localStorage.getItem('list')) {
      this._noteList = JSON.parse(localStorage.getItem('list'));
    }
    this._noteList.push(newNote._note);
    localStorage.setItem('list', JSON.stringify(this._noteList));
  }

  noteInit() {
    if (localStorage.getItem('list')) {
      let list = JSON.parse(localStorage.getItem('list'));
      list.forEach((e) => {
        const { name, content, done } = e[0];
        new Note(this, content, done);
      });
    }
  }
}

export default NoteList;
