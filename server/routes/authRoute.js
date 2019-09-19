import express from 'express';
import controllers from '../controllers';

const { login } = controllers;
const router = express.Router();

// login a user
router.post('/login', login);

export default router;
