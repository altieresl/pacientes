# Pacientes

Este é um projeto de gerenciamento de pacientes que utiliza Spring Boot no backend e React.js no frontend.

## Requisitos

### Backend (Spring Boot)
- JDK 17+
- Maven 3.8+
- MySQL (ou outro banco de dados de sua preferência)

### Frontend (React.js)
- Node.js 18+
- Yarn ou npm

## Instalação

### 1. Clonando o repositório

```bash
git clone https://github.com/altieres/pacientes.git
cd pacientes
```

### 2. Configuração do Backend
#### 2.1 Configurar o banco de dados

 - Rode o script de criação do banco, presente no arquivo banco.sql

 - Atualize o arquivo application.properties com suas credenciais do banco de dados, localizado em src/main/resources/.



spring.datasource.url=jdbc:mysql://localhost:3306/nome_do_banco

spring.datasource.username=seu_usuario

spring.datasource.password=sua_senha

spring.jpa.hibernate.ddl-auto=update

#### 2.2 Construir e executar o projeto Spring Boot

Navegue até a pasta do backend:

```bash
cd src/main/java/com/clinica/pacientes
```

Compile e execute o projeto usando o Maven:

```bash
mvn clean install
mvn spring-boot:run
```

O backend estará disponível em http://localhost:8080.

### 3. Configuração do Frontend
#### 3.1 Instalar dependências

Navegue até a pasta do frontend:

```bash
cd pacientes_front
```

Instale as dependências usando Yarn ou npm:

```bash
yarn install
```
ou

```
bash
npm install
```

#### 3.2 Executar o projeto React

Inicie o servidor de desenvolvimento:

```bash
yarn start
```
ou
```bash
npm start
```

O frontend estará disponível em http://localhost:3000.

### 4. Rodando o Projeto

Agora, com ambos o backend e o frontend rodando, você pode acessar a aplicação via http://localhost:3000.