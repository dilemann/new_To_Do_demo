class Note {
  constructor(parent, name = '', done = '') {
    this._done = done;
    this._note = [];
    this.parent = parent;
    this.name = name;
    this._done = done;
    this.item = document.createElement('div');
    this.buttonContainer = document.createElement('div');
    this.doneButton = document.createElement('button');
    this.editButton = document.createElement('button');
    this.saveButton = document.createElement('button');
    this.deleteButton = document.createElement('button');
    this.input = document.createElement('input');
    this.input.disabled = true;
    this.writeField = document.createElement('span');
    // add a class
    this.item.classList.add('note', 'box');
    this.input.classList.add('inputStyle');
    this.buttonContainer.classList.add('container__btn');
    this.editButton.classList.add('note__edit__btn', 'btn');
    this.saveButton.classList.add('note__save__btn', 'btn');
    this.doneButton.classList.add('note__done__btn', 'btn');
    this.deleteButton.classList.add('note__remove__btn', 'btn');
    this.writeField.classList.add('note__write');

    this.doneButton.textContent = 'Erledigt';
    this.editButton.textContent = 'Edit';
    this.saveButton.textContent = 'Save';
    this.deleteButton.textContent = 'Löschen';

    // add to parent
    this.parent.container.append(this.item);
    this.item.append(this.input);
    this.item.append(this.writeField);
    this.item.append(this.buttonContainer);
    this.buttonContainer.append(this.editButton);
    this.buttonContainer.append(this.saveButton);
    this.buttonContainer.append(this.doneButton);
    this.buttonContainer.append(this.deleteButton);
    this.deleteButton.addEventListener('click', () => this.delete());
    this.doneButton.addEventListener('click', () => {
      this.done = !this.done;
      this.modifyLS();
    });

    this.editButton.addEventListener('click', () => {
      this._feldActivate();
    });

    this.saveButton.addEventListener('click', () => {
      this._feldDEActivate();
      this.modifyLS();
    });

    this.input.value = this.name;
    this.noteStatus();
  }

  set done(item) {
    this._done = item;
    this._feldDEActivate();
    this.noteStatus();
  }

  get done() {
    return this._done;
  }

  _feldActivate() {
    this.done = false;
    this.input.disabled = false;
    this.item.classList.add('note_border');
  }

  _feldDEActivate() {
    this.input.disabled = true;
    this.item.classList.remove('note_border');
  }

  noteStatus() {
    if (this.done) this.item.classList.add('note_active');
    else this.item.classList.remove('note_active');
  }

  modifyLS() {
    if (localStorage.getItem(this.parent.title)) {
      const list = JSON.parse(localStorage.getItem(this.parent.title));
      list.forEach((element) => {
        if (element.id === this.id) {
          element.name = this.input.value;
          element.done = this._done;
        }
      });
      localStorage.setItem(this.parent.title, JSON.stringify(list));
    }
  }

  delete() {
    this.parent._noteList.splice(this.id - 1, 1);
    this.parent._noteList.forEach((element) => (element.id = 0));
    this.parent._noteList.forEach(
      (element) => (element.id = this.parent.getNewId())
    );
    this.parent.saveLS();
    this.item.remove();
  }
}

export default Note;
