const myLibrary = [];
const backdrop = document.querySelector('.backdrop');

const addNew = document.getElementById('addNew');
addNew.addEventListener('click', popUpForm);

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  addBookToLibrary(e);
});

const formControls = document.querySelectorAll('form input');
formControls.forEach((control) => {
  control.addEventListener('input', () => {
    inputValidity(formControls);
  });
});

const submitButton = document.querySelector('button[type="submit"');
submitButton.addEventListener('click', () => {
  inputValidity(formControls);
});

// js input validation
function inputValidity(formElements) {
  formElements.forEach((element, i) => {
    if (element.validity.valueMissing) {
      switch (i) {
        case 0:
          element.setCustomValidity('DO NOT LEAVE THE TITLE EMPTY!');
          break;
        case 1:
          element.setCustomValidity('FILL IN THE AUTHOR!');
          break;
        case 2:
          element.setCustomValidity('ADD PAGE NUMBERS!');
          break;
        case 3:
          element.setCustomValidity('TELL ME IF YOU HAVE READ IT OR NOT!');
          break;
        default:
          element.setCustomValidity('Fill in the data');
      }
    } else {
      element.setCustomValidity('');
    }
  });
}

const cancel = document.querySelector('.cancel');
cancel.addEventListener('click', () => {
  form.reset();
  closeForm();
});

class Book {
  constructor(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.read}`;
  }
}

const defaultBook = new Book('Harry Potter', 'JK Rowling', '336', 'Read');
myLibrary.push(defaultBook);

displayBooks(myLibrary);

function popUpForm() {
  form.style.visibility = 'visible';
  backdrop.style.display = 'flex';
}

function closeForm() {
  form.style.visibility = 'hidden';
  backdrop.style.display = 'none';
}

function addBookToLibrary(event) {
  event.preventDefault();

  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const numPages = form.elements.numPages.value;
  const read = form.elements.read.value;

  const book = new Book(title, author, numPages, read);
  myLibrary.push(book);

  form.reset();
  closeForm();
  displayBooks(myLibrary);
}

function displayBooks(books) {
  const bookContainer = document.createElement('tr');
  bookContainer.setAttribute('data-index', books.length - 1);
  document.querySelector('tbody').appendChild(bookContainer);
  const book = books[books.length - 1];

  Object.entries(book).forEach(([key, value]) => {
    const info = document.createElement('td');
    if (key === 'read') {
      const read = document.createElement('button');
      read.textContent = value;
      info.appendChild(read);

      toggleRead(books, read);
    } else {
      info.textContent = value;
    }
    bookContainer.appendChild(info);
  });

  createRemoveButton(bookContainer, books);
}

function createRemoveButton(bookContainer, books) {
  const td = document.createElement('td');
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.setAttribute('class', 'remove');
  bookContainer.appendChild(td);
  td.appendChild(removeButton);

  removeButton.addEventListener('click', (event) => {
    const parent = event.target.parentNode.parentNode;
    parent.remove();
    books.splice(parent.getAttribute('data-index'), 1);
  });
}

function toggleRead(books, read) {
  const readButton = read;

  readButton.addEventListener('click', (event) => {
    const parent = event.target.parentNode.parentNode;
    const index = parent.getAttribute('data-index');
    if (books[index].read === 'Read') {
      books[index].read = 'Not Read';
      event.target.textContent = books[index].read;
    } else {
      books[index].read = 'Read';
      event.target.textContent = books[index].read;
    }
  });
}
