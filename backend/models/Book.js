const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
title: {
type: String,
required: true,
},
description: {
type: String,
},
price: {
type: Number,
required: true,
},
createdAt: {
type: Date,
default: Date.now,
},
image: {
type: String,
},
author: {
type: mongoose.Schema.Types.ObjectId,
ref: 'Author',
required: true,
},
});


module.exports = mongoose.model('Book', bookSchema);