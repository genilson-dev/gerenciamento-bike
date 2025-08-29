# Gerenciamento de Bike - Backend

## Configuração do Ambiente

### Variáveis de Ambiente

Este projeto requer as seguintes variáveis de ambiente para funcionar corretamente:

1. **Crie um arquivo `.env` na raiz do projeto backend** com o seguinte conteúdo:

```env
# Configurações do JWT (OBRIGATÓRIO)
JWT_SECRET=sua_chave_secreta_muito_segura_aqui_2024

# Configurações do servidor
PORT=3001

# Configurações do banco de dados
DATABASE_URL="file:./dev.db"
```

### ⚠️ IMPORTANTE

- **JWT_SECRET**: Esta variável é **OBRIGATÓRIA** para o funcionamento da autenticação
- Sem ela, você receberá o erro: `"secretOrPrivateKey must have a value"`
- Use uma chave secreta forte e única em produção
- Nunca compartilhe ou commite o arquivo `.env` no repositório

### Como resolver o erro atual:

1. Copie o arquivo `config.env` para `.env`:
   ```bash
   cp config.env .env
   ```

2. Ou crie manualmente o arquivo `.env` com o conteúdo acima

3. Reinicie o servidor após criar o arquivo

## Instalação e Execução

```bash
# Instalar dependências
yarn install

# Executar em modo desenvolvimento
yarn dev

# Executar migrações do banco
yarn migrate

# Gerar cliente Prisma
yarn generate
```

## Estrutura do Projeto

- `src/controllers/` - Controladores da aplicação
- `src/services/` - Lógica de negócio
- `src/middlewares/` - Middlewares (incluindo autenticação)
- `src/routes/` - Definição das rotas
- `prisma/` - Configuração e migrações do banco de dados

# TopLister
[x] - Instalar todas as dependencias do projeto
[x] - Inicializar o projeto com o typescript
[x] - Criaro sistema de paginação do projeto
[x] -  Cadastrar um novo usuario
[x] -  editar um usuario
[x] -  excluir um usuario
[x] -  consultar um usuario

[x] -  logar um usuario
[x] -  autenticar rotas privadas
[x] -  mostrar os detalhes de um usuario logado
[] -  listar todas as categorias

[] -  criar uma ordem de servico
[] -  consultar ordem
[] -  adicionar itens a lista e poder retirar iten s dessa lista
[] -  listar ordens em aberto 
[] -  mostar detalhes dessa ordem
[] -  listar ordens ja encerradas
[] -  mostar detalhes dessa ordem
[] -  rascunhos - draft
[] -  finalizar uma ordem


[] -  Cadastrar um novo cliente
[] -  editar um cliente
[] -  excluir um cliente
[] -  consultar um cliente
[] -  mostrar os detalhes de cliente

[] -  Cadastrar um novo produto
[] -  editar um produto
[] -  excluir um produto
[] -  consultar um produto
[] -  mostrar os detalhes de produto

[] -  Cadastrar uma nova bike
[] -  editar uma bike
[] -  excluir uma bike
[] -  consultar uma bike
[] -  mostrar os detalhes de uma bike
