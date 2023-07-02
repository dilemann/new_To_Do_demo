import Note from './Note.js';

class NoteList {
  _noteList = [];
  constructor(parent) {
    this.container = document.createElement('div');
    this.parent = parent;
    this.parent.append(this.container);
    this.noteInit();
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
    localStorage.setItem('list', JSON.stringify(list));
  }

  noteInit() {
    if (localStorage.getItem('list')) {
      this._noteList = JSON.parse(localStorage.getItem('list'));
      this._noteList.forEach((element) => {
        const { name, done } = element;
        const newNote = new Note(this, name, done);
        newNote.id = element.id;
      });
    }
  }
}

export default NoteList;
