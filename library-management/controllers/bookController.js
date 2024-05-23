const BookRepository = require('../repositories/bookRepository');
const UserRepository = require('../repositories/userRepository');
const Book = require('../models/Book');

class BookController {
  static addBook(req, res) {
    const { id, title, author, isbn } = req.body;
    const book = new Book(id, title, author, isbn);
    const addedBook = BookRepository.addBook(book);
    res.status(201).send(addedBook);
  }

  static getBook(req, res) {
    const { id } = req.params;
    const book = BookRepository.getBookById(id);
    if (!book) {
      return res.status(404).send({ error: 'Book not found' });
    }
    res.send(book);
  }

  static borrowBook(req, res) {
    const { bookId, userId } = req.body;
    const book = BookRepository.getBookById(bookId);
    const user = UserRepository.getUserById(userId);
    if (!book || !user) {
      return res.status(404).send({ error: 'Book or User not found' });
    }
    if (!book.available) {
      return res.status(400).send({ error: 'Book is not available' });
    }
    book.available = false;
    user.borrowedBooks.push(bookId);
    BookRepository.updateBook(book);
    UserRepository.updateUser(user);
    res.send(book);
  }

  static returnBook(req, res) {
    const { bookId, userId } = req.body;
    const book = BookRepository.getBookById(bookId);
    const user = UserRepository.getUserById(userId);
    if (!book || !user) {
      return res.status(404).send({ error: 'Book or User not found' });
    }
    if (book.available) {
      return res.status(400).send({ error: 'Book is not borrowed' });
    }
    book.available = true;
    user.borrowedBooks = user.borrowedBooks.filter(id => id !== bookId);
    BookRepository.updateBook(book);
    UserRepository.updateUser(user);
    res.send(book);
  }
}

module.exports = BookController;
