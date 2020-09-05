import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  isbn: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  released: Date,
  publisher: String,
  price: {
    type: Number,
    required: true,
  },
  rating: Number,
  cover: String,
}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema);

export default Book;
