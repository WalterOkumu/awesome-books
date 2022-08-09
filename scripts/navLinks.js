/* eslint-disable func-names */
const list = document.getElementById('list-link');
const addNew = document.getElementById('add-new-link');
const contact = document.getElementById('contact-link');

const sectionList = document.getElementsByClassName('list')[0];
const sectionAddBook = document.getElementsByClassName('add-book')[0];
const sectionContact = document.getElementsByClassName('contact')[0];

function navigateList() {
  sectionList.style.display = 'block';
  sectionAddBook.style.display = 'none';
  sectionContact.style.display = 'none';
}

function navigateAddNew() {
  sectionList.style.display = 'none';
  sectionAddBook.style.display = 'block';
  sectionContact.style.display = 'none';
}

function navigateContact() {
  sectionList.style.display = 'none';
  sectionAddBook.style.display = 'none';
  sectionContact.style.display = 'block';
}

list.onclick = function () {
  navigateList();
};

addNew.onclick = function () {
  navigateAddNew();
};

contact.onclick = function () {
  navigateContact();
};