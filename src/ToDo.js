import NoteList from './NoteList.js';
import User from './User.js';

class ToDo {
  constructor(parent) {
    this._currentUser = [];
    this._users = [];
    this._notes = null;
    this.parent = parent;
    this.container = document.createElement('div');
    this.wrapperNav = document.createElement('div');
    this.nav = document.createElement('nav');
    this.header = document.createElement('h2');

    this.actionBtn = document.querySelector('#add');

    this.container.classList.add('container');
    this.nav.classList.add('nav');
    // this.button.disabled = false;

    this.wrapperNav.append(this.nav);
    this.wrapperNav.append(this.header);
    this.container.append(this.wrapperNav);
    this.parent.append(this.container);
    this.ToDoInit();
  }

  /**
   * ein neuer Benutzer wird mit dem übergebenem Titel erstellt
   * @param {string} title
   */

  addNewUser(title) {
    if (!title) return;
    const foundDuplicate = this._users.some((user) => user.name === title);
    if (foundDuplicate) {
      alert('Gleicher Name ist verboten');
    } else {
      this._notes = new User(this.container, title);
      this.addNavList(title);
      this.header.textContent = title;
    }
  }

  removeUser() {
    if (this._notes) {
      this.header.textContent = '';
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
        this.form.reset();
      }
    }
  }

  addNavList(title) {
    const btn = document.createElement('button');
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
    this.header.textContent = title;
    this.btnActive(title);
  }

  get currentUser() {
    return this._currentUser;
  }

  ToDoInit() {
    if (localStorage.getItem('actuell') && localStorage.getItem('nav-list')) {
      const list = JSON.parse(localStorage.getItem('nav-list'));
      const actuell = JSON.parse(localStorage.getItem('actuell'));
      list.forEach((e) => this.addNavList(e.title));
      this._notes = new User(this.container, actuell);
      this.btnActive(actuell);
      this.header.textContent = actuell;
    }
  }

  btnActive(title) {
    localStorage.setItem('nav-list', JSON.stringify(this._users));
    this._users.forEach((element) => {
      element.btn.classList.remove('user__btn_active');
      if (title === element.btn.textContent) {
        element.btn.classList.add('user__btn_active');
      }
    });
    localStorage.setItem('actuell', JSON.stringify(title));
  }
}

export default ToDo;
