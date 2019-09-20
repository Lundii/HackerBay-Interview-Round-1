import express from 'express';
import authRoute from './authRoute';
import userRoute from './userRoute';

const router = express();

router.use('/auth', authRoute);
router.use('/user', userRoute);

export default router;
