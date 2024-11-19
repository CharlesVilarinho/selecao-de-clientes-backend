# Projeto Backend - Gestão de Clientes

Este repositório contém o backend do sistema de gestão de clientes. Ele foi desenvolvido utilizando **Node.js**, **NestJS**, **TypeORM** e **PostgreSQL**. O objetivo deste sistema é fornecer a API para cadastro, edição e listagem de clientes.

## Pré-requisitos

- **Node.js** (v16 ou superior)
- **PostgreSQL** || **Docker** (para rodar o PostgreSQL em um container)

---

## 📦 **Instalação**

1. **Clonar o repositório Front-End**:

   ```bash
   git clone https://github.com/CharlesVilarinho/selecao-de-clientes-backend.git
   cd selecao-de-clientes-backend
   ```

2. **Instalar as dependências**:

   ```bash
   npm install
   ```

3. **A configuração do container para rodar o banco ainda não está desenvolvida**:

   ```bash
   npm run start:dev
   ```

- **.env** Configurar arquivo de acordo com a configuração do banco de dados local ou containerizado
- **PostgreSQL**

  ```sql
      CREATE TABLE clients (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      selecionado BOOLEAN NOT NULL,
      salario DECIMAL(10, 2) NOT NULL,
      empresa DECIMAL(10, 2) NOT NULL,
      created_user VARCHAR(255) NOT NULL,
      updated_user VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
      END;

      $$
      LANGUAGE plpgsql;

      CREATE TRIGGER update_clients_updated_at
      BEFORE UPDATE ON clients
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  ```

4. **Executar o ambiente de desenvolvimento**:

   ```bash
   npm run start:dev
   ```

5. **O Back-End estará disponível em**:

   ```plaintext
   http://localhost:3000
   ```

   $$

## Rotas configuradas

- **POST /clients**
  ```json
  {
    "name": "1",
    "salario": 1,
    "empresa": 1,
    "selecionado": false,
    "updated_user": "Charles",
    "created_user": "Charles"
  }
  ```
- **PUT /clients/{id}**

  ```json
  {
    "name": "Neymar",
    "salario": 12301111.23,
    "empresa": 15535513123.12,
    "selecionado": false,
    "updated_user": "Charles"
  }
  ```

- **PATCH /clients/{id}/selecionar**

  ```json
  {
    "selecionado": false
  }
  ```

- **DELETE /clients/{id}**

- **GET /clients?selecionado=false**

- **GET /clients?selecionado=true**
