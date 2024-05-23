const UserRepository = require('../repositories/userRepository');
const BookRepository = require('../repositories/bookRepository');
const User = require('../models/User');

class UserController {
  static addUser(req, res) {
    const { id, name } = req.body;
    const user = new User(id, name);
    const addedUser = UserRepository.addUser(user);
    res.status(201).send(addedUser);
  }

  static getUserBorrowedBooks(req, res) {
    const { id } = req.params;
    const user = UserRepository.getUserById(id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    const borrowedBooks = user.borrowedBooks.map(bookId => BookRepository.getBookById(bookId));
    res.send(borrowedBooks);
  }
}

module.exports = UserController;
