const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// GET all books
router.get('/', bookController.getBooks);

// GET single book
router.get('/:id', bookController.getBookById);

// CREATE book
router.post('/', bookController.createBook);

// UPDATE book
router.put('/:id', bookController.updateBook);

// DELETE book
router.delete('/:id', bookController.deleteBook);

module.exports = router;
