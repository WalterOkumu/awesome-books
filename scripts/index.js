/* eslint-disable func-names */
class BookClass {
  constructor(bookList) {
    this.bookList = bookList;
  }

  storageAvailable(type) {
    let storage;
    try {
      this.storage = window[type];
      const x = '__storage_test__';
      this.storage.setItem(x, x);
      this.storage.removeItem(x);
      return true;
    } catch (event) {
      return event instanceof DOMException && (event.code === 22 || event.code === 1014 || event.name === 'QuotaExceededError' || event.name === 'NS_ERROR_DOM_QUOTA_REACHED') && (storage && storage.length !== 0);
    }
  }

  updateStorage() {
    if (this.storageAvailable('localStorage')) {
      // const localStorage = window;
      this.localStorage.setItem('bookList', JSON.stringify(this.bookList));
    }
  }

  populateBook() {
    const bookDiv = document.getElementsByClassName('book-list')[0];
    this.bookList.forEach((book, index) => {
      const h4 = document.createElement('h4');
      h4.innerText = book.Title;

      const p = document.createElement('p');
      p.innerText = book.Author;

      const hr = document.createElement('hr');

      const removeButton = document.createElement('button');
      removeButton.className = 'remove-button';
      removeButton.id = index;
      removeButton.innerText = 'Remove';

      bookDiv.appendChild(h4);
      bookDiv.appendChild(p);
      bookDiv.appendChild(removeButton);
      bookDiv.appendChild(hr);
    });
  }

  appendToBook() {
    const bookDiv = document.getElementsByClassName('book-list')[0];
    const lastBookIndex = this.bookList.length - 1;

    const h4 = document.createElement('h4');
    h4.innerText = this.bookList[lastBookIndex].Title;

    const p = document.createElement('p');
    p.innerText = this.bookList[lastBookIndex].Author;

    const hr = document.createElement('hr');

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.id = lastBookIndex;
    removeButton.innerText = 'Remove';

    bookDiv.appendChild(h4);
    bookDiv.appendChild(p);
    bookDiv.appendChild(removeButton);
    bookDiv.appendChild(hr);
  }

  loadFromStorage() {
    if (this.storageAvailable('localStorage')) {
      const { localStorage } = window;
      const bookData = JSON.parse(localStorage.getItem('bookList'));
      if (bookData !== null) {
        this.bookList = bookData;
        this.populateBook();
      }
    }
  }

  addBook() {
    const bookTitle = document.getElementsByClassName('book-title')[0];
    const author = document.getElementsByClassName('author')[0];

    if (bookTitle.value === '' || author.value === '') {
      // eslint-disable-next-line no-alert
      alert('Please make sure to fill both Title & Author fields!');
    } else {
      this.bookList.push({
        Title: bookTitle.value,
        Author: author.value,
      });

      bookTitle.value = '';
      author.value = '';

      this.appendToBook();
      this.updateStorage();
    }
  }

  removeBook(event) {
    const bookDiv = document.getElementsByClassName('book-list')[0];
    const objectId = event.target.id;

    // eslint-disable-next-line max-len
    const newBookList = this.bookList.filter((book) => book.Title !== this.bookList[objectId].Title);

    this.bookList = newBookList;

    bookDiv.innerText = '';
    this.updateStorage();
    this.populateBook();
  }
}

const BookObj = new BookClass();

window.onclick = function (event) {
  if (event.target.className === 'add-button') {
    BookObj.addBook();
  } else if (event.target.className === 'remove-button') {
    BookObj.removeBook(event);
  }
};

window.onload = function () {
  if (JSON.parse(localStorage.getItem('bookList')) === null) {
    BookObj.updateStorage();
  } else {
    BookObj.loadFromStorage();
  }
};