import NoteList from './NoteList.js';

class Note {
  _done = '';
  _key;
  _note;
  _id;
  constructor(parent, key = '', done = '') {
    this._key = key;
    this.parent = parent;
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

    this.editButton.addEventListener('click', () => this._inputActivate());

    this.saveButton.addEventListener('click', (event) => {
      this._validateAndDisableInput();
      this._modSaveListLS(event);
    });

    if (localStorage.getItem(this._key)) this._getAutoSaveLS();

    this.doneButton.addEventListener('click', (event) => {
      this.done = !this.done;
      this._modSaveListLS(event);
    });

    this.deleteButton.addEventListener('click', () => this.remove());
    this.input.addEventListener('input', () => this._autoSaveLS());

    this._autoSaveLS();
    this._autoSaveListLS();
  }

  isObjectEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  _autoSaveLS() {
    if (this._key != '') {
      this._note = [];
      this._note.push({
        name: this._key,
        done: this._done,
        val: this.input.value,
      });
      localStorage.setItem(this._key, JSON.stringify(this._note));
    }
  }

  getNewId() {
    // !!!!!!!!!!! method to get the id !!!!!!!!!
    let max = 0;
    this.parent._noteList.forEach((note) => {
      if (note[0].id > max) max = note[0].id;
    });
    // The getNewId method returns this
    return max + 1;
  }

  _autoSaveListLS() {
    this._note[0].id = this.getNewId();
    this.parent._noteList.push(this._note);
    localStorage.setItem('list', JSON.stringify(this.parent._noteList));
  }

  _modSaveListLS(event) {
    // присваиваем элементу события имя для дальнейшего сравнения
    event.target.id = this._note[0].id;

    // извлекаем лист из localstorage в наш массив this.parent._noteList
    this.parent._noteList = JSON.parse(localStorage.getItem('list'));
    // перебираем
    this.parent._noteList.forEach((item) => {
      // Найдите элемент с совпадающим именем кликнутой кнопки
      const foundIndex = item.findIndex((element) => {
        console.log(element.id);
        console.log(event.target.id);
        event.target.id === element.id;
      });
      // Обновите элемент массива
      if (foundIndex !== -1) item[foundIndex] = this._note[0];
    });
    // записываем обновлённый лист
    localStorage.setItem('list', JSON.stringify(this.parent._noteList));
    // удаляем имя, больше оно не
    event.target.removeAttribute('id');
  }

  _removeFromListLS() {
    this.parent._noteList = JSON.parse(localStorage.getItem('list'));
    let deleteIndex = -1; // Инициализируем индекс для удаления
    this.parent._noteList.forEach((item, i) => {
      if (this.isObjectEqual(item[0], this._note[0])) {
        deleteIndex = i; // Сохраняем индекс элемента для удаления
      }
    });
    if (deleteIndex !== -1) {
      this.parent._noteList = this.parent._noteList.filter(
        (value, i) => i !== deleteIndex
      );
    }
    if (this.parent._noteList.length === 0) localStorage.removeItem('list');
    else localStorage.setItem('list', JSON.stringify(this.parent._noteList));
  }

  _getAutoSaveLS() {
    let newList = JSON.parse(localStorage.getItem(this._key));
    this._done = newList[0].done;
    if (this._done === true) this.markedNote();
    else this.unmarkedNote();
    this.input.value = newList[0].val;
  }

  _inputActivate() {
    this.input.disabled = false;
    this.done = false;
    this.item.classList.add('note_border');
  }

  _validateAndDisableInput() {
    if (this.input.value == '') {
      alert('Sie können kein leeres Feld speichern!');
    } else if (this.input.value != '') {
      this.input.disabled = true;
      this.item.classList.remove('note_border');
    }
  }

  set done(value) {
    this._done = value;
    if (this._done === true && this.input.value !== '') this.markedNote();
    else if (this.input.value == '') this._done = false;
    else this.unmarkedNote();
  }

  get done() {
    return this._done;
  }

  markedNote() {
    this.item.classList.add('note_active');
    this.item.classList.remove('note_border');
    this.input.disabled = true;
    this._autoSaveLS();
  }

  unmarkedNote() {
    this.item.classList.remove('note_active');
    this._autoSaveLS();
  }

  remove() {
    const confirmation = confirm('Sind Sie sicher?');
    if (confirmation) this.item.remove();
    this._removeFromListLS();
    this._note = [];
    localStorage.removeItem(this._key);
  }
}

export default Note;
