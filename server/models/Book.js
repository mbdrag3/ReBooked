const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    required: true,
    type: String
  },
  condition: {
    required: true,
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  comment: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments',
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
