const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/', UserController.addUser);
router.get('/:id/borrowed', UserController.getUserBorrowedBooks);

module.exports = router;
