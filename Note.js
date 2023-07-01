class Note {
  _done;
  _note = [];
  constructor(parent, name = '', done = '') {
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
    this.doneButton.addEventListener('click', (event) => {
      this.done = !this.done;
      this.changeLS(event.target);
    });

    this.editButton.addEventListener('click', () => {
      this._feldActivate();
    });

    this.saveButton.addEventListener('click', (event) => {
      this.dataSave();
      this.changeLS(event.target);
    });

    this.input.value = this.name;
    this.dataSave();
  }

  set done(item) {
    this._done = item;
    this.dataSave();
  }

  get done() {
    return this._done;
  }

  _feldActivate() {
    this.done = false;
    this.input.disabled = false;
  }

  dataSave() {
    this.input.disabled = true;

    if (this.done) this.item.classList.add('note_active');
    else this.item.classList.remove('note_active');
  }

  changeLS(item) {
    if (localStorage.getItem('list')) {
      let l = JSON.parse(localStorage.getItem('list'));
      l.forEach((element) => {
        if (element.id == item.id) {
          element.name = this.input.value;
          element.done = this._done;
        }
      });
      localStorage.setItem('list', JSON.stringify(l));
    }
  }
}

export default Note;
