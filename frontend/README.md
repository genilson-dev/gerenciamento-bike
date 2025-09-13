# Frontend - Sistema de Gerenciamento de Bikes

Este é o frontend do sistema de gerenciamento de bikes, desenvolvido em React com TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

- **Autenticação**: Sistema de login com JWT
- **Dashboard**: Visão geral do sistema com estatísticas
- **Gestão de Clientes**: CRUD completo de clientes
- **Gestão de Bikes**: CRUD completo de bikes com associação a clientes
- **Gestão de Produtos**: CRUD de produtos e categorias
- **Gestão de Ordens**: CRUD de ordens de serviço
- **Gestão de Músicos**: CRUD de músicos (funcionalidade específica do sistema)
- **Interface Responsiva**: Design moderno e responsivo

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca para interface de usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de CSS utilitário
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure a URL da API no arquivo `.env.local`:
```
REACT_APP_API_URL=http://localhost:3000
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Login.tsx       # Tela de login
│   ├── Dashboard.tsx   # Dashboard principal
│   ├── Layout.tsx      # Layout com sidebar
│   ├── Clients.tsx     # Gestão de clientes
│   ├── Bikes.tsx       # Gestão de bikes
│   ├── Products.tsx    # Gestão de produtos
│   ├── Orders.tsx      # Gestão de ordens
│   └── Musicians.tsx   # Gestão de músicos
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── services/           # Serviços de API
│   └── api.ts         # Configuração do Axios e serviços
├── types/             # Definições de tipos TypeScript
│   └── index.ts       # Tipos do sistema
├── App.tsx            # Componente principal
└── index.tsx          # Ponto de entrada
```

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm build` - Cria build de produção
- `npm test` - Executa os testes
- `npm eject` - Ejecta a configuração do Create React App

## 🌐 Rotas da Aplicação

- `/login` - Tela de login
- `/dashboard` - Dashboard principal
- `/clients` - Gestão de clientes
- `/bikes` - Gestão de bikes
- `/products` - Gestão de produtos
- `/orders` - Gestão de ordens
- `/musicians` - Gestão de músicos
- `/settings` - Configurações (em desenvolvimento)

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Token) para autenticação. O token é armazenado no localStorage e enviado automaticamente nas requisições.

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop
- Tablet
- Mobile

## 🎨 Design System

O design utiliza o Tailwind CSS com uma paleta de cores personalizada:
- **Primary**: Azul (#3b82f6)
- **Success**: Verde
- **Warning**: Amarelo
- **Error**: Vermelho
- **Gray**: Escalas de cinza

## 🔗 Integração com Backend

O frontend se comunica com o backend através de uma API REST. Certifique-se de que o backend esteja rodando na porta 3000 antes de iniciar o frontend.

## 📝 Próximos Passos

- [ ] Implementar testes unitários
- [ ] Adicionar validação de formulários
- [ ] Implementar notificações toast
- [ ] Adicionar relatórios e gráficos
- [ ] Implementar upload de imagens
- [ ] Adicionar filtros avançados
