const express = require('express');
const BookController = require('../controllers/bookController');

const router = express.Router();

router.post('/', BookController.addBook);
router.get('/:id', BookController.getBook);
router.post('/borrow', BookController.borrowBook);
router.post('/return', BookController.returnBook);

module.exports = router;
