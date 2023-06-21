import Note from './Note.js';

class NoteList {
  _noteList = [];
  constructor(parent) {
    this._noteList = [];
    this.container = document.createElement('div');
    this.form = document.createElement('form');
    this.input = document.createElement('input');
    this.parent = parent;
    this.parent.append(this.container);

    this._listInit();
  }

  add(name) {
    this.newNote = new Note(this, name);
    // this.newNote.id = this.getNewId();
  }

  _listInit() {
    if (localStorage.getItem('list')) {
      const list = JSON.parse(localStorage.getItem('list'));
      list.forEach((element) => {
        this.newNote = new Note(this, element[0].name, element[0].done);
      });
    }
  }
}

export default NoteList;
