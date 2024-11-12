import { findById } from '../models/userModel.js';

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Obtendo o userId do middleware
    const user = await findById(userId); // Usando findById para buscar o usuário

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o perfil do usuário' });
  }
};
