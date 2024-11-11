# Configuração do Banco de Dados Local com Docker

Este guia explica como configurar o banco de dados **MariaDB** localmente usando Docker, permitindo que o banco de dados do projeto seja testado e usado para desenvolvimento.

## Pré-requisitos

- Docker instalado na máquina. Baixe e instale através do site oficial: https://www.docker.com/

## Passos para Configurar o MariaDB

1. **Iniciar o Container MariaDB**
   
   Execute o seguinte comando para iniciar um container MariaDB com as configurações necessárias:

   ```
   docker run --name mariadb-local -e MYSQL_ROOT_PASSWORD=senha123 -e MYSQL_DATABASE=user_db -p 3306:3306 -d mariadb
   ```

   - `--name mariadb-local`: Define o nome do container para facilitar a referência.
   - `-e MYSQL_ROOT_PASSWORD=senha123`: Define a senha do usuário root do MariaDB.
   - `-e MYSQL_DATABASE=user_db`: Cria automaticamente o banco de dados `user_db`.
   - `-p 3306:3306`: Mapeia a porta 3306 do container para a porta 3306 do host (computador local).
   - `-d mariadb`: Define que o container será executado em modo "detach" (em segundo plano).

2. **Verificar se o Banco de Dados Está Rodando**
   
   Verifique o status do container com o comando:

   ```
   docker ps -a
   ```

   Se o container `mariadb-local` estiver em execução, o status aparecerá como `Up`. Caso contrário, verifique os logs com:

   ```
   docker logs mariadb-local
   ```

## Comandos para Acessar e Manipular o Banco de Dados

3. **Acessar o Banco de Dados no Container**
   
   Para acessar o banco de dados dentro do container e manipular dados, use:

   ```
   docker exec -it mariadb-local mariadb -u root -p
   ```

   Quando solicitado, insira a senha `senha123`.

4. **Verificar o Banco de Dados e as Tabelas**

   Depois de acessar o MariaDB, execute os seguintes comandos SQL para verificar se o banco de dados está configurado corretamente:

   - **Listar bancos de dados**:

     ```
     SHOW DATABASES;
     ```

   - **Selecionar o banco de dados `user_db`**:

     ```
     USE user_db;
     ```

   - **Listar todas as tabelas no banco `user_db`**:

     ```
     SHOW TABLES;
     ```

   - **Exibir dados na tabela `users` (caso ela já esteja criada)**:

     ```
     SELECT * FROM users;
     ```

5. **Sair do Banco de Dados**

   Para sair do MariaDB, use o comando:

   ```
   EXIT;
   ```

## Dicas para Troubleshooting

- **Erro de Conexão**: Se ocorrer um erro `ECONNREFUSED`, verifique se o container está em execução com `docker ps`.
- **Alterar Configurações**: Caso queira alterar configurações como nome do banco ou senha, pare e remova o container atual com:

  ```
  docker stop mariadb-local
  docker rm mariadb-local
  ```

  Em seguida, execute o comando `docker run` novamente com as configurações atualizadas.

## Limpeza do Ambiente

Para remover o container e liberar espaço quando não precisar mais do banco de dados, execute:

```
docker stop mariadb-local
docker rm mariadb-local
```

--------------------------------------------------------------------------------------------------------------------------------