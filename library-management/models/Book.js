class Book {
  constructor(id, title, author, isbn) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.available = true;
  }
}

module.exports = Book;
