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




#### FRONT END #####

  # Catálogo E-commerce Frontend

Este projeto é um frontend desenvolvido em React para um catálogo de e-commerce, utilizando tecnologias modernas e boas práticas de desenvolvimento.

## 🚀 Tecnologias

- [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado do JavaScript
- [Vite](https://vitejs.dev/) - Build tool e dev server
- [Apollo Client](https://www.apollographql.com/docs/react/) - Cliente GraphQL
- [React Router DOM](https://reactrouter.com/) - Roteamento
- [Styled Components](https://styled-components.com/) - Estilização com CSS-in-JS

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── categories/     # Componentes relacionados a categorias
│   ├── layout/         # Componentes de layout (Header, Footer, etc)
│   └── products/       # Componentes relacionados a produtos
├── graphql/            # Queries e mutations GraphQL
│   ├── mutations/      # Mutations para modificar dados
│   └── queries/        # Queries para buscar dados
├── helpers/            # Funções auxiliares
├── lib/               # Configurações de bibliotecas
├── pages/             # Páginas da aplicação
└── styles/            # Estilos globais e componentes estilizados
```

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd catalog
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o ambiente:
- Verifique se o arquivo `src/lib/apollo.ts` está apontando para o endpoint GraphQL correto

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🌟 Funcionalidades

### Produtos
- Listagem de produtos
- Criação de novos produtos
- Edição de produtos existentes
- Visualização detalhada de produtos
- Associação com categorias

### Categorias
- Listagem de categorias
- Criação de novas categorias
- Edição de categorias existentes

### Proprietários (Owners)
- Visualização de proprietários
- Associação de produtos e categorias a proprietários

## 📱 Rotas

- `/` - Página inicial com listagem de proprietários
- `/products/create` - Criação de novo produto
- `/products/:id` - Lista de produtos de um proprietário
- `/products/:id/edit-form` - Edição de um produto específico
- `/categories/create` - Criação de nova categoria
- `/categories/:id/edit` - Edição de categoria

## 🔄 Integração com GraphQL

O projeto utiliza Apollo Client para comunicação com a API GraphQL. As queries e mutations estão organizadas em arquivos separados na pasta `graphql/`.

### Principais Operações:
- Criação de produtos e categorias
- Atualização de produtos e categorias
- Listagem de produtos por proprietário
- Listagem de categorias
- Associação entre produtos e categorias

## 🎨 Estilização

O projeto utiliza Styled Components para estilização, com componentes reutilizáveis na pasta `styles/`:
- `Button.ts` - Estilo padrão para botões
- `Container.ts` - Containers e layouts
- `TableStyles.ts` - Estilos para tabelas

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run lint` - Executa verificação de lint
- `npm run preview` - Visualiza a build de produção localmente

## ⚙️ Requisitos do Sistema

- Node.js 16+
- npm ou yarn
- Conexão com backend GraphQL

## 🚨 Notas Importantes

1. Certifique-se de que o backend GraphQL está rodando antes de iniciar o frontend
2. Verifique as variáveis de ambiente se necessário
3. Mantenha o TypeScript atualizado para melhor suporte a tipos

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
