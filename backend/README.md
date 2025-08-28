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
