import Note from './Note.js';

class NoteList {
  _noteList = [];
  constructor(parent, title) {
    this.container = document.createElement('div');
    this.container.classList.add('cc');

    this.title = title;
    this.parent = parent;
    this.parent.list.append(this.container);
    this.noteInit();
    this.checkEmpty();
  }

  getNewId() {
    let max = 0;
    for (const note of this._noteList) {
      if (note.id > max) max = note.id;
    }
    return max + 1;
  }

  addNote(item) {
    const newNote = new Note(this, item);
    newNote.id = this.getNewId();
    this._noteList.push(newNote);
    this.saveLS();
  }

  saveLS() {
    let list = [];
    if (this._noteList.length > 0) {
      this._noteList.forEach((element) => {
        let obj = {
          id: element.id,
          name: element.name,
          done: element.done,
        };
        list.push(obj);
      });
    }
    localStorage.setItem(this.title, JSON.stringify(list));

    this.checkEmpty();
  }

  noteInit() {
    if (localStorage.getItem(this.title)) {
      this._noteList = JSON.parse(localStorage.getItem(this.title));
      this._noteList.forEach((element) => {
        const { name, done } = element;
        const newNote = new Note(this, name, done);
        newNote.id = element.id;
      });
    }
  }

  checkEmpty() {
    if (this._noteList.length === 0) {
      this.empty = document.createElement('div');
      this.empty.classList.add('empty__list', 'box');
      this.container.append(this.empty);
      this.empty.innerHTML = 'Liste ist leer';
    } else if (this.empty) this.empty.remove();
  }
}

export default NoteList;
