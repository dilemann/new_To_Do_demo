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
    this.input.disabled = true;
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
    this.ToDoInit();

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this._notes) {
        this._notes.addNote(this.input.value);
        this.form.reset();
      }
    });
  }

  addNewUser(title) {
    if (title) {
      this.input.disabled = false;
      let foundDuplicate = false;
      if (this._users.length !== 0) {
        this._users.forEach((user) => {
          if (user.title == title) {
            foundDuplicate = true;
          }
        });

        if (foundDuplicate) {
          alert('Gleische Name ist verboten');
          return;
        } else {
          this.list.innerHTML = '';
          this._notes = new NoteList(this, title);
          this.addNavList(title);
        }
      } else {
        this.list.innerHTML = '';
        this._notes = new NoteList(this, title);
        this.addNavList(title);
      }
    }
  }

  removeUser() {
    if (this._notes) {
      if (localStorage.getItem(this._notes.title)) {
        localStorage.removeItem(this._notes.title);
      }
      if (this._users.length > 1) {
        const users = this._users.filter(
          (num) => num.title !== this._notes.title
        );
        this._notes.container.remove();
        this._users = users;
        const actuellArr = this._users[this._users.length - 1];
        localStorage.setItem('nav-list', JSON.stringify(this._users));
        localStorage.setItem('actuell', JSON.stringify(actuellArr.title));
        this.nav.innerHTML = '';
        this._users = [];
        this.ToDoInit();
      } else {
        this._users = [];
        this.nav.innerHTML = '';
        this._notes.container.remove();
        localStorage.removeItem('nav-list');
        localStorage.removeItem('actuell');
        this.input.disabled = true;
      }
    }
  }

  addNavList(title) {
    let btn = document.createElement('button');
    btn.classList.add('user__btn', 'btn');
    this.nav.append(btn);
    btn.textContent = title;
    btn.addEventListener('click', () => {
      this.currentUser = title;
    });
    this._users.push({
      title,
      btn,
    });
    this.btnActive(title);
  }

  set currentUser(title) {
    this.list.innerHTML = '';
    this._currentUser = title;
    this._notes = new NoteList(this, title);
    this.btnActive(title);
  }

  get currentUser() {
    return this._currentUser;
  }

  ToDoInit() {
    if (localStorage.getItem('actuell') && localStorage.getItem('nav-list')) {
      this.input.disabled = false;
      console.log(1);
      const list = JSON.parse(localStorage.getItem('nav-list'));
      const actuell = JSON.parse(localStorage.getItem('actuell'));
      list.forEach((e) => this.addNavList(e.title));
      this._notes = new NoteList(this, actuell);
      this.btnActive(actuell);
    }
  }

  btnActive(title) {
    localStorage.setItem('nav-list', JSON.stringify(this._users));
    this._users.forEach((element) => {
      element.btn.classList.remove('user__btn_active');
      if (title == element.btn.textContent) {
        element.btn.classList.add('user__btn_active');
      }
    });
    localStorage.setItem('actuell', JSON.stringify(title));
  }
}
