import NoteList from './NoteList.js';

export class ToDo {
  _currentUser = [];
  _users = [];
  _notes = null;
  constructor(parent) {
    this.parent = parent;
    this.container = document.createElement('div');
    this.wrapperNav = document.createElement('div');
    this.nav = document.createElement('nav');
    this.title = document.createElement('h2');
    this.form = document.createElement('form');
    this.input = document.createElement('input');
    this.buttonWrapper = document.createElement('div');
    this.button = document.createElement('button');
    this.list = document.createElement('div');

    this.actionBtn = document.querySelector('#add');

    this.container.classList.add('container');
    this.nav.classList.add('nav');
    this.form.classList.add('form');
    this.input.classList.add('form__input');
    this.input.placeholder = 'Geben Sie den Namen des neuen Falls ein';
    this.buttonWrapper.classList.add('form__btn-container');
    this.button.classList.add('form__btn');
    this.button.textContent = 'den Fall hinzufügen';
    // this.button.disabled = false;

    this.buttonWrapper.append(this.button);
    this.form.append(this.input);
    this.form.append(this.buttonWrapper);
    this.wrapperNav.append(this.nav);
    this.wrapperNav.append(this.title);
    this.container.append(this.wrapperNav);
    this.container.append(this.form);
    this.container.append(this.list);
    this.parent.append(this.container);
    if (localStorage.getItem('title')) {
      const t = JSON.parse(localStorage.getItem('title'));
      console.log(t);
      new NoteList(this, t);
    }
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this._notes) {
        this._notes.addNote(this.input.value);
        this.form.reset();
      }
    });
  }

  addNewUser(title) {
    this.list.innerHTML = '';
    this._notes = new NoteList(this, title);
    let btn = document.createElement('button');
    btn.classList.add('user__btn', 'btn');
    this.nav.append(btn);
    btn.textContent = title;
    btn.addEventListener('click', () => {
      this.currentUser = title;
    });
    localStorage.setItem('title', JSON.stringify(title));
  }

  set currentUser(title) {
    this.list.innerHTML = '';
    this._currentUser = title;
    this._notes = new NoteList(this, title);
    localStorage.setItem('title', JSON.stringify(title));
  }

  get currentUser() {
    return this._currentUser;
  }
}
