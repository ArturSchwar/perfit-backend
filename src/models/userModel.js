import pool from '../config/db.js';

// Função para criar um novo usuário
export const createUser = async (name, email, hashedPassword) => {
  const conn = await pool.getConnection();
  const result = await conn.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );
  conn.release();
  return result;
};

// Função para buscar um usuário pelo email
export const findUserByEmail = async (email) => {
  const conn = await pool.getConnection();
  const result = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
  conn.release();
  return result[0]; // Retorna o primeiro usuário encontrado
};
