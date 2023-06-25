class Note {
  _done = false;
  _note = [];
  constructor(parent, name = '', done = '') {
    this.parent = parent;
    this.name = name;
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
    this._dataSave();
    this.doneButton.addEventListener('click', () => (this.done = !this.done));

    this.editButton.addEventListener('click', () => {
      this._feldActivate();
      console.log();
    });
    this.saveButton.addEventListener('click', () => this._dataSave());
    this.input.value = this.name;
  }

  set done(item) {
    this._done = item;
    this._dataSave();
  }

  get done() {
    return this._done;
  }

  _feldActivate() {
    this.done = false;
    this.input.disabled = false;
  }

  _dataSave() {
    if (this.done) this.item.classList.add('note_active');
    else this.item.classList.remove('note_active');
    this.input.disabled = true;
    this._note = [
      {
        name: 'name',
        content: this.input.value,
        done: this._done,
      },
    ];
    localStorage.setItem('name', JSON.stringify(this._note));
  }
}

export default Note;
