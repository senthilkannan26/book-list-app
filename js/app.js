// class book
class Book {
  constructor(name, author, ibm) {
    this.name = name;
    this.author = author;
    this.ibm = ibm;
  }
}

// class UI
class Ui {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(book => Ui.addBookTolist(book));
  }

  static addBookTolist(book) {
    const tablebody = document.querySelector("#table-body");

    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.ibm}</td>
    <td><a href="#!" class="delete">X</a></td>
    `;
    tablebody.appendChild(row);
  }

  static removeItemFromList(e) {
    if (e.classList.contains("delete")) {
      e.parentElement.parentElement.remove();
      Ui.alertMsg("book removed", "green");
    }
  }

  static alertMsg(mesage, color) {
    const div = document.createElement("div");
    const newText = document.createTextNode(mesage);
    div.appendChild(newText);
    div.style.backgroundColor = `${color}`;
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(() => div.remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#name").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#ibm").value = "";
  }
}

// class storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static setBooks(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBooks(ibm) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.ibm == ibm) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// class display book
document.addEventListener("DOMContentLoaded", Ui.displayBooks());
// class add book
const form = document.querySelector("#book-form");
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const author = document.querySelector("#author").value;
  const ibm = document.querySelector("#ibm").value;
  const book = new Book(name, author, ibm);

  if (name === "" || author === "" || ibm === "") {
    Ui.alertMsg("fill all the field above first", "red");
    return false;
  }
  Ui.addBookTolist(book);
  Ui.alertMsg("Book succesfully added", "green");
  Store.setBooks(book);
  Ui.clearFields();
});
// class remove book
document.querySelector("#table-body").addEventListener("click", e => {
  Ui.removeItemFromList(e.target);
  Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
});
