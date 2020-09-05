import Book from '../model/book';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname));
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    fileFilter(file, cb);
  },
});

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.json({message: err});
  }
};

const postBook = async (req, res) => {
  const book = new Book({
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    released: req.body.released,
    price: req.body.price,
    rating: req.body.rating,
    cover: req.file.path,
  });
  try {
    const saveBook = await book.save();
    res.json(saveBook);
  } catch (err) {
    res.json({message: err});
  }
};

const findBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.book_id);
    res.json(book);
  } catch (err) {
    res.json({message: err});
  }
};

const deleteBook = async (req, res) => {
  try {
    const removeBook = await Book.deleteOne({_id: req.params.book_id});
    res.json(removeBook);
  } catch (err) {
    res.json({message: err});
  }
};

const updateBook = async (req, res) => {
  try {
    const updateBook = await Book.updateOne(
        {_id: req.params.book_id},
        {$set: {
          isbn: req.body.isbn,
          title: req.body.title,
          author: req.body.author,
          publisher: req.body.publisher,
          released: req.body.released,
          price: req.body.price,
        }});
    res.json(updateBook);
  } catch (err) {
    res.json({message: err});
  }
};

export {getAllBooks, postBook, findBook, updateBook, deleteBook};
