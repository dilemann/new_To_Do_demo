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
    if (localStorage.getItem('list')) {
      this._noteList = JSON.parse(localStorage.getItem('list'));
    }
    newNote.id = this.getNewId();
    this._noteList.push(newNote);
    newNote.doneButton.id = newNote.id;
    newNote.saveButton.id = newNote.id;
    this.save();
  }

  save() {
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
      localStorage.setItem('list', JSON.stringify(list));
    }
  }

  noteInit() {
    if (localStorage.getItem('list')) {
      let list = JSON.parse(localStorage.getItem('list'));
      list.forEach((e) => {
        const { name, done } = e;
        const newNote = new Note(this, name, done);
        newNote.doneButton.id = e.id;
        newNote.saveButton.id = e.id;
      });
    }
  }
}

export default NoteList;
