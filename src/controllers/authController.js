import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { createUser, findUserByEmail, saveResetToken } from "../models/userModel.js";

const secretKey = process.env.SECRET_KEY;

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Formato de e-mail inválido." });
  }

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Campos obrigatórios faltando." });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Senha deve ter pelo menos 6 caracteres." });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(name, email, hashedPassword);

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao tentar registrar o usuário:", error);
    res.status(500).json({ message: "Erro ao registrar o usuário." });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao realizar o login." });
  }
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetLink = `http://yourfrontend.com/reset-password?token=${resetToken}`;

  await saveResetToken(user.id, resetToken);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    text: `Clique no link para redefinir sua senha: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error)
      return res.status(500).json({ message: "Erro ao enviar e-mail" });
    res
      .status(200)
      .json({ message: "E-mail de recuperação enviado com sucesso" });
  });
};
