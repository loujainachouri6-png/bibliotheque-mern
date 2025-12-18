const mongoose = require('mongoose');


const authorSchema = new mongoose.Schema({
firstName: {
type: String,
required: true,
},
lastName: {
type: String,
required: true,
},
description: {
type: String,
},
image: {
type: String, // image path
},
books: [{
type: mongoose.Schema.Types.ObjectId,
ref: 'Book',
}],
}, { timestamps: true });


module.exports = mongoose.model('Author', authorSchema);