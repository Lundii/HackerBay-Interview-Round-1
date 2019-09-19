import express from 'express';
import controllers from '../controllers';
import { validate, loginValidation } from '../utils/validation';

const { login } = controllers;
const router = express.Router();

// login a user
router.post('/login', loginValidation, validate, login);

export default router;
