import express from 'express';
import { registerUser, loginUser, requestPasswordReset } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { getUserProfile } from '../controllers/userController.js';

const router = express.Router();

// Rotas de autenticação
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', requestPasswordReset);

// Rotas específicas de usuário (requer autenticação)
router.get('/profile', authenticateToken, getUserProfile);

export default router;
