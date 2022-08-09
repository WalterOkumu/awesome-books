/* eslint-disable func-names */
let bookList = [];

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (event) {
    return event instanceof DOMException && (event.code === 22 || event.code === 1014 || event.name === 'QuotaExceededError' || event.name === 'NS_ERROR_DOM_QUOTA_REACHED') && (storage && storage.length !== 0);
  }
}

function updateStorage() {
  if (storageAvailable('localStorage')) {
    const { localStorage } = window;
    localStorage.setItem('bookList', JSON.stringify(bookList));
  }
}

const bookDiv = document.getElementsByClassName('book-list')[0];

function populateBook() {
  bookList.forEach((book, index) => {
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

function appendToBook() {
  const lastBookIndex = bookList.length - 1;

  const h4 = document.createElement('h4');
  h4.innerText = bookList[lastBookIndex].Title;

  const p = document.createElement('p');
  p.innerText = bookList[lastBookIndex].Author;

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

function loadFromStorage() {
  if (storageAvailable('localStorage')) {
    const { localStorage } = window;
    const bookData = JSON.parse(localStorage.getItem('bookList'));
    if (bookData !== null) {
      bookList = bookData;
      populateBook();
    }
  }
}

function addBook() {
  const bookTitle = document.getElementsByClassName('book-title')[0];
  const author = document.getElementsByClassName('author')[0];

  if (bookTitle.value === '' || author.value === '') {
    // eslint-disable-next-line no-alert
    alert('Please make sure to fill both Title & Author fields!');
  } else {
    bookList.push({
      Title: bookTitle.value,
      Author: author.value,
    });

    bookTitle.value = '';
    author.value = '';

    appendToBook();
    updateStorage();
  }
}

function clearUI() {
  bookDiv.innerText = '';
}

function removeBook(event) {
  const objectId = event.target.id;

  const newBookList = bookList.filter((book) => book.Title !== bookList[objectId].Title);

  bookList = newBookList;

  clearUI();
  updateStorage();
  populateBook();
}

window.onclick = function (event) {
  if (event.target.className === 'add-button') {
    addBook();
  } else if (event.target.className === 'remove-button') {
    removeBook(event);
  }
};

window.onload = function () {
  if (JSON.parse(localStorage.getItem('bookList')) === null) {
    updateStorage();
  } else {
    loadFromStorage();
  }
};