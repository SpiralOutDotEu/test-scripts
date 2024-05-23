const request = require('supertest');
const express = require('express');
const bookRoutes = require('../routes/bookRoutes');
const BookRepository = require('../repositories/bookRepository');
const UserRepository = require('../repositories/userRepository');
const Book = require('../models/Book');
const User = require('../models/User');

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);

beforeEach(() => {
  BookRepository.books.length = 0;
  UserRepository.users.length = 0;
});

test('Add a new book', async () => {
  const bookData = { id: '1', title: 'Test Book', author: 'Test Author', isbn: '1234567890' };
  const response = await request(app).post('/books').send(bookData);
  expect(response.status).toBe(201);
  expect(response.body).toEqual({ ...bookData, available: true });
});

test('Get book details by ID', async () => {
  const bookData = new Book('1', 'Test Book', 'Test Author', '1234567890');
  BookRepository.addBook(bookData);
  const response = await request(app).get('/books/1');
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ ...bookData, available: true });
});

test('Borrow a book', async () => {
  const bookData = new Book('1', 'Test Book', 'Test Author', '1234567890');
  BookRepository.addBook(bookData);
  const userData = new User('1', 'Test User');
  UserRepository.addUser(userData);

  const response = await request(app).post('/books/borrow').send({ bookId: '1', userId: '1' });
  expect(response.status).toBe(200);
  expect(response.body.available).toBe(false);
});

test('Return a borrowed book', async () => {
  const bookData = new Book('1', 'Test Book', 'Test Author', '1234567890');
  BookRepository.addBook(bookData);
  const userData = new User('1', 'Test User');
  userData.borrowedBooks.push('1');
  UserRepository.addUser(userData);
  bookData.available = false;
  BookRepository.updateBook(bookData);

  const response = await request(app).post('/books/return').send({ bookId: '1', userId: '1' });
  expect(response.status).toBe(200);
  expect(response.body.available).toBe(true);
});
