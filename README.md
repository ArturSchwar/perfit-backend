# Backend do Projeto Perfit

⚠️ **Nota:** Este repositório contém **apenas o backend** do projeto **Perfit**.  
O backend está **em desenvolvimento**, mas já implementa várias funcionalidades essenciais.  
🔒 O frontend é um projeto **privado** e não está disponível publicamente.  

Este é o backend do projeto **Perfit**, desenvolvido em **Node.js** com **Express** e utilizando **MariaDB** como banco de dados. O backend lida com as APIs REST para operações de usuários, autenticação, redefinição de senha e outras funcionalidades do sistema.

## Funcionalidades

- Registro de usuários com email e senha.
- Autenticação de usuários (login).
- **Recuperação de senha por email**.
- **Perfil do usuário** para recuperação de dados do usuário.
- Integração com banco de dados **MariaDB**.
- Suporte para variáveis de ambiente sensíveis usando **dotenv**.
- Testes unitários com **Jest** e **Supertest**.

## Requisitos

Certifique-se de que você tem as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [NPM](https://www.npmjs.com/) (vem junto com o Node.js)
- [Docker](https://www.docker.com/) (opcional, mas recomendado para rodar o banco de dados MariaDB localmente)

## Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript para o backend.
- **Express**: Framework minimalista para criar servidores web.
- **MariaDB**: Banco de dados relacional.
- **Jest**: Framework de testes unitários para JavaScript.
- **Supertest**: Biblioteca para testes HTTP.
- **bcryptjs**: Para criptografia de senhas.
- **jsonwebtoken**: Para autenticação e gerenciamento de tokens JWT.
- **nodemailer**: Envio de emails para recuperação de senha.
- **dotenv**: Para o gerenciamento de variáveis de ambiente.
- **faker**: Para gerar usuario falso para o teste de criação de usuário.

## Estrutura de Pastas

```bash
backend/
├── src/
│   ├── config/           # Configurações como a conexão com o banco de dados
│   ├── controllers/      # Lógica dos controladores (ex. controle de usuários, autenticação)
│   ├── models/           # Modelos para manipulação dos dados no banco de dados
│   ├── routes/           # Definição de rotas da API
│   ├── middleware/       # Middlewares para autenticação e autorização
│   └── index.js          # Ponto de entrada do servidor
├── .env                  # Variáveis de ambiente (não comitado)
├── .gitignore            # Arquivos/pastas que devem ser ignorados pelo Git
├── package.json          # Dependências e scripts
└── README.md             # Documentação do projeto

## Configuração de Redefinição de Senha com Nodemailer

Para a funcionalidade de recuperação de senha, configure as variáveis de ambiente no arquivo `.env`:

```
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
SECRET_KEY=your-secret-key
```

## Configuração de Testes com Jest e ES Modules

Para suporte a ES Modules (`import/export`) com Jest, o projeto já inclui as configurações necessárias:

- Arquivos de configuração como **`babel.config.cjs`** e ajustes no **`index.js`** garantem que o Jest funcione corretamente com ES Modules.
- As dependências para testes serão instaladas automaticamente com `npm install`.

Essas configurações permitem que o Jest execute testes com ES Modules de forma eficiente no backend.

-----------------------------------------------------------------------------------------------------------------------------------
