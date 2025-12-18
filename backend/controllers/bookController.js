const Book = require('../models/Book');
const Author = require('../models/Author');


// CREATE book
exports.createBook = async (req, res) => {
try {
const book = await Book.create(req.body);
await Author.findByIdAndUpdate(book.author, { $push: { books: book._id } });
res.status(201).json(book);
} catch (error) {
res.status(400).json({ message: error.message });
}
};


// GET all books
exports.getBooks = async (req, res) => {
try {
const books = await Book.find().populate('author');
res.json(books);
} catch (error) {
res.status(500).json({ message: error.message });
}
};


// GET single book
exports.getBookById = async (req, res) => {
try {
const book = await Book.findById(req.params.id).populate('author');
if (!book) return res.status(404).json({ message: 'Book not found' });
res.json(book);
} catch (error) {
res.status(500).json({ message: error.message });
}
};


// UPDATE book
exports.updateBook = async (req, res) => {
try {
const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(book);
} catch (error) {
res.status(400).json({ message: error.message });
}
};


// DELETE book
exports.deleteBook = async (req, res) => {
try {
await Book.findByIdAndDelete(req.params.id);
res.json({ message: 'Book deleted' });
} catch (error) {
res.status(500).json({ message: error.message });
}
};