import request from 'supertest';
import { app } from '../../index.js';
import { getConnection, closePool } from '../../config/db.js';
import bcrypt from 'bcryptjs';
import User from '../../models/userModel.js';

jest.setTimeout(30000); // Ajusta o tempo limite

jest.mock('../../models/userModel.js'); // Mock do modelo para evitar interações reais com o banco de dados

describe('Testando o controlador de usuário', () => {
  beforeAll(async () => {
    await getConnection();
  });

  afterAll(async () => {
    await closePool();
  });

  describe('Testando a função registerUser', () => {
    it('Deve retornar 400 se o usuário já existe', async () => {
      User.findUserByEmail.mockResolvedValue({ id: 1, email: 'joao@example.com' });

      const res = await request(app)
        .post('/api/users/register')
        .send({ name: 'João', email: 'joao@example.com', password: 'senha123' });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Usuário já existe.');
    });

    it('Deve registrar um novo usuário com sucesso', async () => {
      User.findUserByEmail.mockResolvedValue(null);
      User.createUser.mockResolvedValue({ id: 1, name: 'João', email: 'joao@example.com' });

      const res = await request(app)
        .post('/api/users/register')
        .send({ name: 'João', email: 'joao@example.com', password: 'senha123' });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Usuário registrado com sucesso!');
    });
  });

  describe('Testando a função loginUser', () => {
    it('Deve retornar 401 se a senha estiver incorreta', async () => {
      const hashedPassword = await bcrypt.hash('senhaCorreta', 10);
      User.findUserByEmail.mockResolvedValue({ id: 1, email: 'joao@example.com', password: hashedPassword });
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const res = await request(app)
        .post('/api/users/login')
        .send({ email: 'joao@example.com', password: 'senhaIncorreta' });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe('Credenciais inválidas');
    });
  });
});
