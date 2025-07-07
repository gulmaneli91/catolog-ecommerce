# Build Shop API

Uma API GraphQL construída com NestJS para gerenciar uma loja virtual, com sistema de autenticação, produtos, categorias e proprietários.

## Arquitetura

O projeto utiliza uma arquitetura modular baseada no framework NestJS com os seguintes componentes principais:

- **GraphQL**: API GraphQL usando `@nestjs/graphql` e Apollo Server
- **TypeORM**: ORM para PostgreSQL
- **JWT Authentication**: Autenticação usando JSON Web Tokens
- **Validation**: Validação de dados usando class-validator
- **Docker**: Containerização do banco de dados PostgreSQL

### Estrutura de Módulos

- **Auth**: Gerenciamento de autenticação e autorização
- **Product**: Gerenciamento de produtos
- **Category**: Gerenciamento de categorias
- **Owner**: Gerenciamento de proprietários/usuários

## Regras de Negócio

### Autenticação (Auth)
- Registro de novos proprietários (signUp)
- Login com email e senha (signIn)
- Autenticação via JWT
- Rotas protegidas usando Guard JWT

### Proprietários (Owner)
- Cada proprietário possui um perfil com nome, email e senha
- Proprietários podem ter múltiplos produtos e categorias
- Dois tipos de roles: ADMIN e OWNER

### Produtos (Product)
- Produtos devem estar vinculados a um proprietário
- Produtos podem ter uma categoria opcional
- Atributos obrigatórios: título, preço e estoque
- Atributos opcionais: descrição e imageUrl
- Status ativo/inativo para produtos

### Categorias (Category)
- Categorias devem estar vinculadas a um proprietário
- Podem ter múltiplos produtos associados
- Atributos obrigatórios: título
- Atributos opcionais: descrição

## Endpoints GraphQL

### Auth

\`\`\`graphql
# Mutations
mutation SignUp($input: CreateOwnerInput!) {
  signUp(input: $input) {
    id
    name
    email
    role
  }
}

mutation SignIn($input: SignInInput!) {
  signIn(input: $input) {
    ownerId
    role
    accessToken
  }
}
\`\`\`

### Products

\`\`\`graphql
# Queries
query GetProducts {
  product {
    id
    title
    description
    price
    imageUrl
    stock
    isActive
    owner {
      id
      name
    }
    category {
      id
      title
    }
  }
}

query GetProduct($id: String!) {
  product(id: $id) {
    id
    title
    description
    price
    imageUrl
    stock
    isActive
  }
}

# Mutations
mutation CreateProduct($input: CreateProductInput!) {
  createProduct(createProductInput: $input) {
    id
    title
    price
    stock
  }
}

mutation UpdateProduct($id: String!, $input: UpdateProductInput!) {
  updateProduct(id: $id, updateProductInput: $input) {
    id
    title
    price
    stock
  }
}

mutation RemoveProduct($id: String!) {
  removeProduct(id: $id)
}
\`\`\`

### Categories

\`\`\`graphql
# Queries
query GetCategories {
  category {
    id
    title
    description
    owner {
      id
      name
    }
    products {
      id
      title
    }
  }
}

query GetCategory($id: ID!) {
  category(id: $id) {
    id
    title
    description
  }
}

# Mutations
mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(createCategoryInput: $input) {
    id
    title
    description
  }
}

mutation UpdateCategory($id: String!, $input: UpdateCategoryInput!) {
  updateCategory(id: $id, updateCategoryInput: $input) {
    id
    title
    description
  }
}

mutation RemoveCategory($id: ID!) {
  removeCategory(id: $id)
}
\`\`\`

## Como Iniciar o Projeto Localmente

### Pré-requisitos

- Node.js (v18 ou superior)
- Docker e Docker Compose
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
\`\`\`bash
git clone <repository-url>
cd build-shop
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
\`\`\`env
DATABASE_URL=postgresql://user:password@localhost:5432/db
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1440m
PORT=3000
\`\`\`

4. Inicie o banco de dados PostgreSQL usando Docker:
\`\`\`bash
docker-compose up -d
\`\`\`

5. Execute a aplicação em modo desenvolvimento:
\`\`\`bash
npm run start:dev
\`\`\`

A API estará disponível em `http://localhost:3000/graphql`

### Scripts Disponíveis

- `npm run build`: Compila o projeto
- `npm run start:dev`: Inicia o servidor em modo desenvolvimento com hot-reload
- `npm run start:debug`: Inicia o servidor em modo debug
- `npm run start:prod`: Inicia o servidor em modo produção
- `npm run test`: Executa os testes unitários
- `npm run test:e2e`: Executa os testes end-to-end
- `npm run lint`: Executa o linter
- `npm run format`: Formata o código usando Prettier

## Tecnologias Utilizadas

- NestJS
- TypeScript
- GraphQL
- TypeORM
- PostgreSQL
- Docker
- Jest
- ESLint
- Prettier