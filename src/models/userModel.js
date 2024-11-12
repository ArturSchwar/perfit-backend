import pool from '../config/db.js';

// Função para criar um novo usuário
export const createUser = async (name, email, hashedPassword) => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    return result;
  } finally {
    conn.release();
  }
};


// Função para buscar um usuário pelo email
export const findUserByEmail = async (email) => {
  const conn = await pool.getConnection();
  const result = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
  conn.release();
  return result[0]; // Retorna o primeiro usuário encontrado
};

// Função para buscar um usuário pelo id
export const findById = async (userId) => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query('SELECT * FROM users WHERE id = ?', [userId]);
    return result[0] || null;
  } finally {
    conn.release();
  }
};

// Função para salvar o token de redefinição de senha
export const saveResetToken = async (userId, resetToken) => {
  const conn = await pool.getConnection();
  const expirationDate = new Date(Date.now() + 3600000); // Token expira em 1 hora
  await conn.query(
    'UPDATE users SET reset_token = ?, reset_token_expiration = ? WHERE id = ?',
    [resetToken, expirationDate, userId]
  );
  conn.release();
};
