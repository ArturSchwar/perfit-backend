import { getConnection, closePool } from '../../config/db.js';
import User from '../../models/userModel.js';
import { faker } from '@faker-js/faker';

jest.setTimeout(30000); // Ajusta o tempo limite

describe('Testando o modelo de usuário', () => {
  let conn;

  beforeAll(async () => {
    conn = await getConnection();
    await conn.query('DELETE FROM users');
  });

  afterAll(async () => {
    if (conn) await conn.release();
    await closePool();
  });

  it('Deve criar um novo usuário no banco de dados', async () => {
    const newUser = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: 'senha123'
    };

    const result = await User.createUser(newUser.name, newUser.email, newUser.password);
    expect(result).toHaveProperty('insertId');
  });

  it('Deve encontrar um usuário pelo email', async () => {
    const email = 'usuario.existente@example.com';
    const existingUser = {
      name: faker.person.firstName(),
      email,
      password: 'senha123'
    };

    await User.createUser(existingUser.name, existingUser.email, existingUser.password);

    const user = await User.findUserByEmail(email);
    expect(user).toHaveProperty('email', email);
  });
});
