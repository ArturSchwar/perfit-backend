import request from 'supertest';
import { app } from '../../index.js';
import { getConnection, closePool } from '../../config/db.js';
import { faker } from '@faker-js/faker';

jest.setTimeout(30000); // Ajusta o tempo limite

describe('Testando as rotas de usuários', () => {
  beforeAll(async () => {
    await getConnection();
  });

  afterAll(async () => {
    await closePool();
  });

  it('Deve registrar e fazer login de um novo usuário', async () => {
    const newUser = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: 'senha123'
    };

    const resRegister = await request(app).post('/api/users/register').send(newUser);
    expect(resRegister.statusCode).toBe(201);
    expect(resRegister.body.message).toBe('Usuário registrado com sucesso!');

    const resLogin = await request(app).post('/api/users/login').send({
      email: newUser.email,
      password: newUser.password
    });
    expect(resLogin.statusCode).toBe(200);
    expect(resLogin.body).toHaveProperty('message', 'Login bem-sucedido!');
  });
});
