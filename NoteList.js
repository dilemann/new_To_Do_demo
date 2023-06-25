import Note from './Note.js';

class NoteList {
  _note = [];
  constructor(parent) {
    this.container = document.createElement('div');
    this.parent = parent;
    this.parent.append(this.container);
    this.noteInit();
  }

  addNote(item) {
    new Note(this, item);
  }

  noteInit() {
    if (localStorage.getItem('name')) {
      this._note.push(JSON.parse(localStorage.getItem('name')));
      const [item] = this._note[0];
      new Note(this, item.content, item.done);
    }
  }
}

export default NoteList;
