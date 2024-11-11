import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';


dotenv.config();

const app = express();

// Middleware para permitir requisições do frontend
app.use(cors({
  origin: 'http://localhost:3000' // Permite requisições da origem do frontend
}));

app.use(express.json());
app.use('/api/users', userRoutes);

// Inicialize `server` como undefined e exporte o `app` condicionalmente para testes
let server;

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

export { app, server };
