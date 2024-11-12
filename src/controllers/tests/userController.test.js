import request from "supertest";
import { app } from "../../index.js";
import { getConnection, closePool } from "../../config/db.js";
import { findUserByEmail, createUser } from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

jest.setTimeout(30000); // Ajusta o tempo limite para os testes

// Mock do modelo para evitar interações reais com o banco de dados
jest.mock("../../models/userModel.js");

describe("Testando o controlador de autenticação", () => {
  beforeAll(async () => {
    await getConnection();
  });

  afterAll(async () => {
    await closePool();
  });

  describe("Testando a função registerUser", () => {
    it("Deve retornar 400 se o usuário já existe", async () => {
      findUserByEmail.mockResolvedValue({ id: 1, email: "joao@example.com" });

      const res = await request(app).post("/api/users/register").send({
        name: "João",
        email: "joao@example.com",
        password: "senha123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Usuário já existe.");
    });

    it("Deve retornar 400 para e-mail em formato inválido", async () => {
      findUserByEmail.mockResolvedValue(null); // Simula que o usuário não existe

      const res = await request(app).post("/api/users/register").send({
        name: "Usuário Teste",
        email: "emailinvalido", // E-mail inválido
        password: "senha123",
      });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Formato de e-mail inválido.");
    });
    
    it("Deve retornar 400 se a senha for muito curta", async () => {
      findUserByEmail.mockResolvedValue(null); // Simula que o usuário não existe

      const res = await request(app).post("/api/users/register").send({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: "123", // Senha curta
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Senha deve ter pelo menos 6 caracteres.");
    });

    it("Deve registrar um novo usuário com sucesso", async () => {
      findUserByEmail.mockResolvedValue(null); // Simula que o usuário não existe
      createUser.mockResolvedValue({
        id: 1,
        name: "João",
        email: "joao@example.com",
      }); // Simula criação bem-sucedida

      const res = await request(app).post("/api/users/register").send({
        name: "João",
        email: "joao@example.com",
        password: "senha123",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Usuário registrado com sucesso!");
    });
  });

  describe("Testando a função loginUser", () => {
    it("Deve retornar 401 se a senha estiver incorreta", async () => {
      const hashedPassword = await bcrypt.hash("senhaCorreta", 10);
      findUserByEmail.mockResolvedValue({
        id: 1,
        email: "joao@example.com",
        password: hashedPassword,
      }); // Simula usuário existente com senha criptografada

      bcrypt.compare = jest.fn().mockResolvedValue(false); // Simula senha incorreta

      const res = await request(app)
        .post("/api/users/login")
        .send({ email: "joao@example.com", password: "senhaIncorreta" });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Credenciais inválidas");
    });

    it("Deve retornar 200 e um token se o login for bem-sucedido", async () => {
      const hashedPassword = await bcrypt.hash("senhaCorreta", 10);
      findUserByEmail.mockResolvedValue({
        id: 1,
        email: "joao@example.com",
        password: hashedPassword,
      }); // Simula usuário existente com senha correta

      bcrypt.compare = jest.fn().mockResolvedValue(true); // Simula senha correta

      const res = await request(app)
        .post("/api/users/login")
        .send({ email: "joao@example.com", password: "senhaCorreta" });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Login bem-sucedido!");
      expect(res.body).toHaveProperty("token");
    });
  });
});
