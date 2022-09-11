import express from 'express';
import verifyToken from '../middleware/verifyAuth.js';
const router = express.Router();
import { register, login, logout } from './authRoutes.js';

router
  .post('/login', login)
  .post('/register', register)
  .post('/logout', verifyToken, logout);

export default router;
