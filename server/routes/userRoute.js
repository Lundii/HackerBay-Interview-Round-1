import express from 'express';
import controllers from '../controllers';
// import { validate, loginValidation } from '../utils/validation';
import { verifyToken } from '../utils/verification';

const router = express.Router();
const { patchJson } = controllers;

// login a user
router.patch('/json-patch', verifyToken, patchJson);

export default router;
