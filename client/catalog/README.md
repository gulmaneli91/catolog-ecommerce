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