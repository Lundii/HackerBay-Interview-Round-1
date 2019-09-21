import express from 'express';
import controllers from '../controllers';
import { validate, imageUrlValidation } from '../utils/validation';
import { verifyToken } from '../utils/verification';

const router = express.Router();
const { patchJson, generateThumbnail } = controllers;

// patch a json
router.patch('/json-patch', verifyToken, patchJson);

// patch a json
router.post('/thumbnail', verifyToken, imageUrlValidation, validate, generateThumbnail);

export default router;
