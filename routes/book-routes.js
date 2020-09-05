import express from 'express';
import * as controller from '../controllers/book-controllers';
import {upload} from '../controllers/book-controllers';

const router = new express.Router();

router.get('/', controller.getAllBooks);

router.post('/', upload.single('cover'), controller.postBook);

router.get('/:book_id', controller.findBook);

router.delete('/:book_id', controller.deleteBook);

router.patch('/:book_id', controller.updateBook);

export default router;
