import express from 'express';
import { loginUser, requestPasswordReset } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';
import { registerUser, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

// Rota para registro de usuário

router.post('/register', registerUser )
// Rota para login
router.post('/login', loginUser);

// Rota para perfil do usuário (apenas autenticado)
router.get('/profile', authenticateToken, getUserProfile); 

// Rota para refresh token
router.post('/refresh-token', authenticateToken, (req, res) => {
  const newToken = jwt.sign({ userId: req.userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({ token: newToken });
});

// Rota para solicitação de redefinição de senha
router.post('/reset-password', requestPasswordReset);

export default router;
