import express from 'express';
import authRoute from './authRoute';

const router = express();

router.use('/auth', authRoute);

export default router;
