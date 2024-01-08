import Note from './Note.js';

class NoteList {
  constructor(parent, title) {
    this._noteList = [];
    this.listContainer = document.createElement('div');
    this.listContainer.classList.add('cc');
    this.form = document.createElement('form');
    this.input = document.createElement('input');
    this.input.disabled = true;
    this.buttonWrapper = document.createElement('div');
    this.button = document.createElement('button');
    this.title = title;
    this.parent = parent;
    console.log(this.parent);

    this.form.classList.add('form');
    this.input.classList.add('form__input');
    this.input.placeholder = 'Enter the title of the new task';
    this.buttonWrapper.classList.add('form__btn-container');
    this.button.classList.add('form__btn');
    this.button.textContent = 'Add a task';

    this.buttonWrapper.append(this.button);
    this.form.append(this.input);
    this.form.reset();
    this.form.append(this.buttonWrapper);
    this.parent.append(this.form);
    this.parent.append(this.listContainer);
    this.noteInit();
    this.checkEmpty();
  }

  getNewId() {
    let max = 0;
    this._noteList.forEach((note) => {
      if (note.id > max) max = note.id;
    });
    return max + 1;
  }

  addNote(item) {
    const newNote = new Note(this, item);
    newNote.id = this.getNewId();
    this._noteList.push(newNote);
    this.saveLS();
  }

  saveLS() {
    const list = [];
    if (this._noteList.length > 0) {
      this._noteList.forEach((element) => {
        const obj = {
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
      this.listContainer.append(this.empty);
      this.empty.innerHTML = 'Liste ist leer';
    } else if (this.empty) this.empty.remove();
  }
}

export default NoteList;
