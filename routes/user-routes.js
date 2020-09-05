import express from 'express';
import * as controller from '../controllers/user-controllers';

const router = new express.Router();

router.post('/register', controller.registerUser);

router.post('/login', controller.loginUser);

export default router;
