const Book = require('../models/Book');

class BookRepository {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    return book;
  }

  getBookById(id) {
    return this.books.find(b => b.id === id);
  }

  updateBook(book) {
    const index = this.books.findIndex(b => b.id === book.id);
    if (index !== -1) {
      this.books[index] = book;
    }
    return book;
  }

  getAllBooks() {
    return this.books;
  }
}

module.exports = new BookRepository();
