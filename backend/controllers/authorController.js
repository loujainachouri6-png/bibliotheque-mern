const Author = require('../models/Author');


// CREATE author
exports.createAuthor = async (req, res) => {
try {
const author = await Author.create(req.body);
res.status(201).json(author);
} catch (error) {
res.status(400).json({ message: error.message });
}
};


// GET all authors
exports.getAuthors = async (req, res) => {
try {
const authors = await Author.find().populate('books');
res.json(authors);
} catch (error) {
res.status(500).json({ message: error.message });
}
};


// GET single author
exports.getAuthorById = async (req, res) => {
try {
const author = await Author.findById(req.params.id).populate('books');
if (!author) return res.status(404).json({ message: 'Author not found' });
res.json(author);
} catch (error) {
res.status(500).json({ message: error.message });
}
};


// UPDATE author
exports.updateAuthor = async (req, res) => {
try {
const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(author);
} catch (error) {
res.status(400).json({ message: error.message });
}
};


// DELETE author
exports.deleteAuthor = async (req, res) => {
try {
await Author.findByIdAndDelete(req.params.id);
res.json({ message: 'Author deleted' });
} catch (error) {
res.status(500).json({ message: error.message });
}
};